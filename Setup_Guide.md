# 🚗 Number Plate Detection & Recognition API



### 📖 Overview
This project is a Flask-based REST API for automatic vehicle number plate detection and recognition using YOLO (Ultralytics) for object detection and EasyOCR for text extraction.

The system accepts an image, detects number plates, extracts the plate number text, and returns both the detected data and an annotated image




### ✨Key Features
📷 Upload an image via API

🔍 Detect number plates using YOLOv8

🔤 Extract plate numbers using EasyOCR

🖼️ Save and return annotated images

⚡ REST API built with Flask

💻 Runs on CPU (GPU optional)

## ⚙️Technologies Used
- Python 3.10+

- Flask

- Ultralytics YOLO

- OpenCV

- EasyOCR

- PyTorch

- Werkzeug








## 📋Prerequisites
Before running the project, make sure you have:


- Python installed
 👉 Download: https://www.python.org/downloads/



### 🚀 Setup Instructions (Windows)

**Create Virtual Environment**
```bash
python -m venv venv
```
**Activate Virtual Environment**
```bash
venv\Scripts\activate
    - you shoulde see: (venv)
```

**Install Required Packages**
```bash
pip install flask ultralytics opencv-python easyocr Werkzeug torch
    - ⏳ First-time installation may take a few minutes (PyTorch & OCR models).
```

**Running the Application**
```bash
python app.py

## Expected Console Output
Loading YOLO model...
Model loaded!
Loading OCR...
OCR Ready!
 * Running on http://127.0.0.1:5000

```













### 🌐 API Endpoints

**Health Check**
###### GET/

```bash
{
  "status": "Number Plate Recognition API Running"
}

```

##### Detect Number Plate
###### POST /detect-plate
```bash
| Key   | Type | Description   |
| ----- | ---- | ------------- |
| image | File | Vehicle image |


## Response (Success)
{
  "plate_detected": true,
  "plates": [
    {
      "bbox": [x1, y1, x2, y2],
      "plate_number": "ABC1234"
    }
  ],
  "annotated_image_url": "/download/annotated_image.jpg"
}


```













## 🧠 How the System Works
- Image is uploaded via API

- YOLO model detects number plate bounding boxes

- Each plate region is cropped

- EasyOCR extracts text from the plate

- Results are drawn on the image

- JSON response + annotated image returned



## 🧪 Sample Test (Using Postman)
- Method: POST

- URL: http://127.0.0.1:5000/detect-plate

- Body → form-data → Key: image → Select image file




## 📄License

This project is part of a Research Project year 4.

## 👨‍🎓 Author
Wathsalavi K H S - IT22305596
SLIIT – Y4 S2


- Development Team

---

© 2024 City Traffic Department. All rights reserved.


































