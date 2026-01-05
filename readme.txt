raffic Violation Detection API
📖 Overview

This project is a Flask-based REST API for detecting traffic violations (offences) from images and videos using YOLO (Ultralytics).

The system analyzes uploaded media, identifies vehicles with traffic offences (such as vehicle with offense, no-helmet, number plate, etc.), saves annotated outputs, and returns structured JSON results for further processing or reporting.

✨ Key Features

📷 Upload images for traffic violation detection
🎥 Upload videos for frame-by-frame offence analysis
🚗 Detect vehicles and traffic violations using YOLO
📊 Frame-wise violation statistics
🖼️ Save annotated images & videos
⚡ REST API built using Flask
💻 Runs on CPU (GPU optional)

⚙️ Technologies Used

Python 3.10+

Flask

Ultralytics YOLO

OpenCV

PyTorch

NumPy

Werkzeug

📋 Prerequisites

Before running the project, ensure you have:

Python installed
👉 Download: https://www.python.org/downloads/

Basic knowledge of REST APIs (Postman recommended)
🚀 Setup Instructions (Windows)
1️⃣ Create Virtual Environment
py -m venv venv

2️⃣ Activate Virtual Environment
venv\Scripts\activate


✅ You should see:

(venv)

3️⃣ Install Required Packages
pip install flask ultralytics opencv-python-headless numpy torch


⏳ First-time installation may take a few minutes (YOLO & PyTorch models).

4️⃣ Run the Application
python app.py

✅ Expected Console Output
Creating new Ultralytics Settings file
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000

🌐 API Endpoints
🔹 Health Check

GET /

Response
{
  "status": "Traffic Violation Detection API Running"
}

🔹 Detect Traffic Violation (Image)

POST /detect/image
Request (form-data)
| Key   | Type | Description         |
| ----- | ---- | -------------       |
| image | File | Traffic Light image |

Response (Success)
{
  "violation_detected": true,
  "classes_found": ["vehicle with offense"],
  "image_url": "http://127.0.0.1:5000/outputs/processed_1700000000.jpg"
}

Detect Traffic Violation (Video)

POST /detect_video

Request (form-data)
| Key   | Type | Description         |
| ----- | ---- | -------------       |
| video | File | Traffic Light video |

Response (Success)
{
  "message": "Inference complete",
  "output_video_path": "output/detections/traffic_video.mp4",
  "total_frames": 540,
  "frame_data": [
    {
      "frame_index": 189,
      "detections": {
        "Number_plate": 1,
        "vehicle with offense": 1
      }
    }
  ]
}
🧠 How the System Works

Image or video is uploaded via API

YOLO detects vehicles and offence-related classes

Bounding boxes are drawn on detected objects

Violations are counted per frame (for video)

Annotated media is saved to disk

JSON response is returned to the client
🧪 Sample Test (Using Postman)
Image Detection

Method: POST

URL:

http://127.0.0.1:5000/detect/image


Body → form-data

Key: image

Value: upload image file

Video Detection

Method: POST

URL:

http://127.0.0.1:5000/detect_video


Body → form-data

Key: file

Value: upload video file
📁 Output Structure
output/
└── detections/
    └── processed_video.mp4
outputs/
└── processed_image.jpg

⚠️ Notes

Offence detection is model-based, not rule-based

Accuracy depends on training data quality

Large videos may return large JSON responses

Flask development server is not recommended for production

📄 License

This project is part of a Year 4 Research Project.

👨‍🎓 Author

PUSHPAMAL K P N
IT22561916
SLIIT – Y4 S2

© 2024 City Traffic Department. All rights reserved.