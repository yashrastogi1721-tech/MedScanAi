# api.py
import os
import io
import base64
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Query
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, models
import matplotlib.cm as cm

# --------------------
# Config
# --------------------
MODEL_PATH = "models/best_model.pth"   # ensure this file exists in repo
IMG_SIZE = 224

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# --------------------
# Load model and classes
# --------------------
# default classes (if not saved in checkpoint)
DEFAULT_CLASSES = ["NORMAL", "PNEUMONIA"]

# build model architecture (must match training)
def build_model(n_classes):
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, n_classes)
    return model

MODEL = None
CLASSES = DEFAULT_CLASSES

if os.path.exists(MODEL_PATH):
    ckpt = torch.load(MODEL_PATH, map_location="cpu")
    CLASSES = ckpt.get("classes", DEFAULT_CLASSES)
    MODEL = build_model(len(CLASSES))
    MODEL.load_state_dict(ckpt["model_state_dict"])
    MODEL.to(device)
    MODEL.eval()
    print("Loaded model:", MODEL_PATH, "classes:", CLASSES)
else:
    # start with uninitialized model to avoid crash; predictions will return error
    MODEL = build_model(len(CLASSES))
    MODEL.to(device)
    MODEL.eval()
    print("WARNING: model file not found at", MODEL_PATH)

# --------------------
# Transforms (same as training)
# --------------------
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# --------------------
# FastAPI app
# --------------------
app = FastAPI(title="Chest X-ray Analyzer (Demo)")

@app.get("/")
def read_root():
    return {"status": "ok", "model_loaded": os.path.exists(MODEL_PATH), "device": str(device)}

# --------------------
# Utility: run prediction
# --------------------
def predict_image_tensor(tensor: torch.Tensor):
    """tensor: [1,C,H,W] on device"""
    with torch.no_grad():
        logits = MODEL(tensor)
        probs = F.softmax(logits, dim=1)[0].cpu().numpy()
        pred_idx = int(logits.argmax(dim=1).item())
    return pred_idx, float(probs[pred_idx]), probs

# --------------------
# Utility: simple Grad-CAM implementation (no external lib)
# --------------------
def compute_gradcam(inp_tensor: torch.Tensor, target_layer):
    """
    inp_tensor: input tensor on device [1,C,H,W]
    target_layer: a module (e.g., MODEL.features[-1])
    Returns: cam (HxW numpy, values 0..1), predicted_class_index
    """
    activations = []
    gradients = []

    def forward_hook(module, input, output):
        activations.append(output)  # tensor
    # prefer full backward hook if available
    if hasattr(target_layer, "register_full_backward_hook"):
        def backward_hook(module, grad_input, grad_output):
            gradients.append(grad_output[0])
        fh = target_layer.register_forward_hook(forward_hook)
        bh = target_layer.register_full_backward_hook(backward_hook)
    else:
        # fallback
        def backward_hook(module, grad_input, grad_output):
            gradients.append(grad_output[0])
        fh = target_layer.register_forward_hook(forward_hook)
        try:
            bh = target_layer.register_backward_hook(backward_hook)
        except Exception:
            bh = target_layer.register_full_backward_hook(backward_hook)

    # forward
    MODEL.zero_grad()
    out = MODEL(inp_tensor)
    pred_idx = int(out.argmax(dim=1).item())
    score = out[0, pred_idx]
    # backward
    score.backward(retain_graph=True)

    if len(activations) == 0 or len(gradients) == 0:
        # cleanup hooks
        try:
            fh.remove()
            bh.remove()
        except Exception:
            pass
        raise RuntimeError("Grad-CAM hooks did not capture activations/gradients")

    act = activations[0].detach()       # [1, C, h, w]
    grad = gradients[0].detach()        # [1, C, h, w]
    # global average pooling on gradients
    weights = grad.mean(dim=(2,3), keepdim=True)  # [1,C,1,1]
    cam = (weights * act).sum(dim=1, keepdim=True)  # [1,1,h,w]
    cam = F.relu(cam)
    cam = cam.squeeze().cpu().numpy()  # h,w

    # normalize to 0..1
    cam = cam - cam.min()
    cam = cam / (cam.max() + 1e-8)

    # cleanup hooks
    try:
        fh.remove()
        bh.remove()
    except Exception:
        pass

    return cam, pred_idx

# --------------------
# Utility: overlay heatmap on PIL image and return data-url JPEG
# --------------------
def overlay_heatmap_on_pil(pil_img: Image.Image, cam: np.ndarray, alpha: float = 0.5):
    # cam is HxW in 0..1, resize to image size
    H, W = pil_img.size[1], pil_img.size[0]  # note: PIL size is (W,H)
    cam_resized = Image.fromarray(np.uint8(cam*255)).resize((pil_img.size[0], pil_img.size[1]), resample=Image.BILINEAR)
    cam_arr = np.array(cam_resized) / 255.0    # HxW float

    # apply a colormap (jet)
    cmap = cm.get_cmap("jet")
    colored = cmap(cam_arr)[:, :, :3]  # HxWx3 float 0..1
    colored = np.uint8(colored * 255)

    heatmap_img = Image.fromarray(colored).convert("RGB")

    # blend
    blended = Image.blend(pil_img.convert("RGB"), heatmap_img, alpha=alpha)

    # encode as JPEG data URL
    buffer = io.BytesIO()
    blended.save(buffer, format="JPEG", quality=90)
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    data_url = f"data:image/jpeg;base64,{b64}"
    return data_url

# --------------------
# /predict endpoint
# --------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...), heatmap: Optional[bool] = Query(True)):
    """
    Upload an X-ray image (jpg/png). Returns prediction and confidence.
    If heatmap=true (default) returns a base64 data URL of Grad-CAM overlay as 'heatmap'.
    """
    if not os.path.exists(MODEL_PATH):
        return JSONResponse({"error": "Model file not found on server."}, status_code=500)

    try:
        contents = await file.read()
        pil = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception as e:
        return JSONResponse({"error": "Invalid image file."}, status_code=400)

    # preprocess
    inp = transform(pil).unsqueeze(0).to(device)

    # predict
    try:
        pred_idx, confidence, probs = predict_image_tensor(inp)
        label = CLASSES[pred_idx]
    except Exception as e:
        return JSONResponse({"error": f"Prediction error: {str(e)}"}, status_code=500)

    result = {"prediction": label, "confidence": round(float(confidence), 4)}

    # compute grad-cam if requested
    if heatmap:
        try:
            # choose a target layer; EfficientNet-B0: model.features[-1] is a good candidate
            try:
                target_layer = MODEL.features[-1]
            except Exception:
                # fallback to a deep conv layer
                target_layer = MODEL.features[len(MODEL.features) - 1]
            cam, cam_pred_idx = compute_gradcam(inp, target_layer)
            # overlay on original pil
            data_url = overlay_heatmap_on_pil(pil.resize((IMG_SIZE, IMG_SIZE)), cam, alpha=0.5)
            result["heatmap"] = data_url
        except Exception as e:
            # don't fail on heatmap errors
            result["heatmap_error"] = str(e)

    return result
