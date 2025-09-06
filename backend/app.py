# backend/api.py
import io
import base64
import traceback
from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import numpy as np
import torch
import torch.nn.functional as F
from torchvision import transforms, models
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
import uvicorn
import os

# ----------------- Config -----------------
MODEL_PATH = os.environ.get("MODEL_PATH", "models/best_model.pth")
IMG_SIZE = int(os.environ.get("IMG_SIZE", 224))
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# ------------------------------------------

app = FastAPI(title="Chest X-ray Analyzer API (demo)")

# allow frontend dev origin (change in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper response model
class PredictResponse(BaseModel):
    label: str
    probability: float
    heatmap_data_url: str

# Global model container
MODEL = None
CLASSES = ["NORMAL", "PNEUMONIA"]

def load_model(path=MODEL_PATH):
    global MODEL, CLASSES
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found at {path}")
    ckpt = torch.load(path, map_location=DEVICE)
    # build model same as during training
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
    in_f = model.classifier[1].in_features
    n_classes = len(ckpt.get("classes", CLASSES))
    model.classifier[1] = torch.nn.Linear(in_f, n_classes)
    model.load_state_dict(ckpt["model_state_dict"])
    model.to(DEVICE).eval()
    MODEL = model
    CLASSES = ckpt.get("classes", CLASSES)
    print("Model loaded. Classes:", CLASSES)

# transforms (must match training)
val_tfm = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

@app.on_event("startup")
def startup_event():
    try:
        load_model()
    except Exception as e:
        print("Warning: model failed to load at startup:", e)
        # don't crash; let endpoint return error if called

@app.get("/health")
def health():
    return {"status": "ok", "device": str(DEVICE)}

@app.post("/predict", response_model=PredictResponse)
async def predict(file: UploadFile = File(...)):
    """
    Accepts an image file (jpg/png). Returns predicted label, probability and Grad-CAM heatmap as a base64 data URL.
    """
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    # read image bytes and open
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image file")

    # preprocess input for model
    input_tensor = val_tfm(img).unsqueeze(0).to(DEVICE)

    # forward pass
    with torch.no_grad():
        logits = MODEL(input_tensor)
        probs = F.softmax(logits, dim=1)[0].cpu().numpy()
        pred_idx = int(logits.argmax(dim=1).item())
        label = CLASSES[pred_idx]
        probability = float(probs[pred_idx])

    # Grad-CAM
    try:
        # choose appropriate target layer for EfficientNet-B0
        try:
            target_layers = [MODEL.features[-1]]
        except Exception:
            target_layers = [MODEL.features[6]]

        cam = GradCAM(model=MODEL, target_layers=target_layers)
        targets = [ClassifierOutputTarget(pred_idx)]
        grayscale_cam = cam(input_tensor=input_tensor, targets=targets)[0]  # HxW [0..1]

        # prepare overlay image (resize original to IMG_SIZE)
        rgb_img = np.array(img.resize((IMG_SIZE, IMG_SIZE))).astype(np.float32) / 255.0
        visualization = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)

        # encode overlay to base64 jpeg
        is_success, buffer = cv2_imencode_jpg(visualization)
        if not is_success:
            raise RuntimeError("Failed to encode heatmap image")
        heatmap_b64 = base64.b64encode(buffer).decode("utf-8")
        data_url = f"data:image/jpeg;base64,{heatmap_b64}"

    except Exception as e:
        # if gradcam fails, still return prediction with empty heatmap
        print("Grad-CAM error:", e)
        data_url = ""

    return PredictResponse(label=label, probability=probability, heatmap_data_url=data_url)


def cv2_imencode_jpg(np_img):
    """
    Helper to encode numpy image (RGB) to JPEG bytes via cv2.imencode.
    Returns (success_flag, bytes)
    """
    try:
        import cv2
        # convert RGB -> BGR for cv2
        bgr = cv2.cvtColor(np_img.astype(np.uint8), cv2.COLOR_RGB2BGR)
        success, enc = cv2.imencode(".jpg", bgr, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        return bool(success), enc.tobytes()
    except Exception as e:
        # fallback using PIL
        try:
            from io import BytesIO
            pil = Image.fromarray(np_img.astype(np.uint8))
            buf = BytesIO()
            pil.save(buf, format="JPEG", quality=90)
            return True, buf.getvalue()
        except Exception as e2:
            print("Fallback encoding failed:", e2)
            return False, b""

if __name__ == "__main__":
    # for local dev
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
