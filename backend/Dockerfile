# Use a valid PyTorch image with CPU support
FROM pytorch/pytorch:1.13.1-cpu

# Set working directory
WORKDIR /app

# Install git for Grad-CAM
RUN apt-get update && apt-get install -y git

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI app
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
