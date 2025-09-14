# Use a valid PyTorch base image
FROM pytorch/pytorch:2.1.0-cpu

# Set working directory
WORKDIR /app

# Install git (needed for Grad-CAM)
RUN apt-get update && apt-get install -y git

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Expose port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
