from flask import Flask, request, jsonify, send_file
from ultralytics import YOLO
import cv2
import numpy as np
import os
from werkzeug.utils import secure_filename
import easyocr

# ----------------- CONFIG -------------------
MODEL_PATH = "license_plate_detector.pt"
UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("Loading YOLO model...")
model = YOLO(MODEL_PATH)
print("Model loaded!")

print("Loading OCR...")
reader = easyocr.Reader(['en'], gpu=False)  #Set True if GPU available
print("OCR Ready!")
# --------------------------------------------

app = Flask(__name__)


@app.route("/detect-plate", methods=["POST"])
def detect_plate():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded!"}), 400

    file = request.files["image"]
    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(input_path)

    # Read Image
    img = cv2.imread(input_path)

    # Run YOLO model
    results = model(img)

    if len(results[0].boxes) == 0:
        return jsonify({
            "plate_detected": False,
            "message": "No number plate detected."
        })

    detected_plates = []
    output_filename = "annotated_" + filename
    output_path = os.path.join(OUTPUT_FOLDER, output_filename)

    for box in results[0].boxes.xyxy:
        x1, y1, x2, y2 = map(int, box)
        plate_crop = img[y1:y2, x1:x2]

        # OCR on cropped plate
        text = reader.readtext(plate_crop, detail=0, paragraph=False)
        plate_text = "".join(text).replace(" ", "")

        detected_plates.append({
            "bbox": [x1, y1, x2, y2],
            "plate_number": plate_text
        })

        # Draw bounding box
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, plate_text, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    # Save annotated image
    cv2.imwrite(output_path, img)

    return jsonify({
        "plate_detected": True,
        "plates": detected_plates,
        "annotated_image_url": "/download/" + output_filename
    })


@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    path = os.path.join(OUTPUT_FOLDER, filename)
    return send_file(path, as_attachment=True)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Number Plate Recognition API Running"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
