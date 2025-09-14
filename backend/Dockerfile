# Use a valid PyTorch base image with CPU and Python 3.9
FROM pytorch/pytorch:1.13.1-cpu-py3.9

# Set working directory
WORKDIR /app

# Install git (needed for Grad-CAM)
RUN apt-get update && apt-get install -y git

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run app
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
