from flask import Flask, request, jsonify, send_from_directory, url_for, render_template
from ultralytics import YOLO
import cv2
import time
import os
from werkzeug.utils import secure_filename
import requests
import json
import numpy as np
import base64
import pymysql
from pymysql.cursors import DictCursor


app = Flask(__name__)

# ---------------- CONFIG ----------------
# IMPORTANT: Put this in your environment, NOT in code:
#   export PLATE_API_KEY="..."
PLATE_API_KEY = "48a7bf19312a5f29eda58723ddf4b1d45a204492"
PLATE_API_URL = "https://api.platerecognizer.com/v1/plate-reader/"

CRASH_MODEL_PATH = os.getenv("CRASH_MODEL_PATH", "crash_model.pt")
SEATBELT_MODEL_PATH = os.getenv("SEATBELT_MODEL_PATH", "seatbelt_model.pt")
HELMET_MODEL_PATH = os.getenv("HELMET_MODEL_PATH", "helmet_model.pt")

# For traffic violation detection (generic COCO model)
TRAFFIC_MODEL_PATH = os.getenv("TRAFFIC_MODEL_PATH", "yolov8n.pt")

UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")
OUTPUT_FOLDER = os.getenv("OUTPUT_FOLDER", "outputs")

FRAME_SKIP = int(os.getenv("FRAME_SKIP", "10"))
MAX_IMAGES = int(os.getenv("MAX_IMAGES", "3"))
STOP_AFTER_FIRST_PLATE = os.getenv("STOP_AFTER_FIRST_PLATE", "false").lower() == "true"

# Traffic violation tuning (red-light crossing) 
TV_FRAME_SKIP = int(os.getenv("TV_FRAME_SKIP", "2"))
STOP_BAND_TOP_RATIO = float(os.getenv("STOP_BAND_TOP_RATIO", "0.50"))
STOP_BAND_BOTTOM_RATIO = float(os.getenv("STOP_BAND_BOTTOM_RATIO", "0.60"))
TL_ROI_Y_MAX_RATIO = float(os.getenv("TL_ROI_Y_MAX_RATIO", "0.30"))
TL_ROI_X_MIN_RATIO = float(os.getenv("TL_ROI_X_MIN_RATIO", "0.60"))
TL_PIXEL_THRESHOLD = int(os.getenv("TL_PIXEL_THRESHOLD", "80"))

# Webcam saving behavior (NEW)
WEBCAM_SAVE_ENABLED = os.getenv("WEBCAM_SAVE_ENABLED", "true").lower() == "true"
WEBCAM_COOLDOWN_SECONDS = float(os.getenv("WEBCAM_COOLDOWN_SECONDS", "5.0"))
WEBCAM_MAX_SAVES_PER_REQUEST = int(os.getenv("WEBCAM_MAX_SAVES_PER_REQUEST", "3"))

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("Loading crash, seatbelt & helmet models...")
crash_model = YOLO(CRASH_MODEL_PATH)
seatbelt_model = YOLO(SEATBELT_MODEL_PATH)
helmet_model = YOLO(HELMET_MODEL_PATH)
print("Loading traffic model...")
traffic_model = YOLO(TRAFFIC_MODEL_PATH)
print("Models loaded!")

# ---------------- MYSQL CONFIG ----------------
MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_DB = os.getenv("MYSQL_DB", "traffic_db")


def get_mysql_conn():
    return pymysql.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB,
        charset="utf8mb4",
        cursorclass=DictCursor,
        autocommit=True,
    )


def insert_violation(
    violation_type,
    number_plate=None,
    image_url=None,
    image_filename=None,
    source_endpoint=None,
    meta=None,
):
    """
    Inserts one row into MySQL.
    meta should be a dict (will be JSON-encoded).
    """
    try:
        conn = get_mysql_conn()
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO violations
                  (violation_type, number_plate, image_url, image_filename, source_endpoint, meta)
                VALUES
                  (%s, %s, %s, %s, %s, %s)
                """,
                (
                    violation_type,
                    number_plate,
                    image_url,
                    image_filename,
                    source_endpoint,
                    json.dumps(meta) if meta is not None else None,
                ),
            )
        conn.close()
    except Exception as e:
        # Don’t crash your API if DB insert fails; log it.
        print("DB insert error:", e)


def send_to_plate_api(image_path):
    try:
        with open(image_path, "rb") as img_file:
            response = requests.post(
                PLATE_API_URL,
                files={"upload": img_file},
                headers={"Authorization": f"Token {PLATE_API_KEY}"},
                timeout=20,
            )

        if response.status_code not in (200, 201):
            print(response.text)
            return None

        payload = response.json()
        results = payload.get("results", [])
        if not results:
            return None

        plate_number = results[0].get("plate")
        if plate_number:
            return plate_number.upper()

        return None

    except Exception as e:
        print("PlateRecognizer Error:", e)
        return None


def process_violation_video(cap, model, violation_classes, max_images=MAX_IMAGES):
    saved_images = []
    detected_plates = set()
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % FRAME_SKIP != 0:
            continue

        results = model(frame, verbose=False)
        result = results[0]

        detected_names = (
            [model.names[int(cls)] for cls in result.boxes.cls.tolist()]
            if result.boxes is not None
            else []
        )

        if any(cls in violation_classes for cls in detected_names):
            if len(saved_images) >= max_images:
                break

            timestamp = int(time.time() * 1000)
            filename = f"violation_{timestamp}.jpg"
            save_path = os.path.join(OUTPUT_FOLDER, filename)

            cv2.imwrite(save_path, frame)
            saved_images.append(filename)

            plate_number = send_to_plate_api(save_path)
            if plate_number:
                detected_plates.add(plate_number)
                if STOP_AFTER_FIRST_PLATE:
                    break

    cap.release()
    return saved_images, sorted(detected_plates)


def detect_traffic_light(frame):
    h, w, _ = frame.shape

    roi = frame[0:int(h * TL_ROI_Y_MAX_RATIO), int(w * TL_ROI_X_MIN_RATIO) : w]
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)

    red1 = cv2.inRange(hsv, (0, 120, 120), (10, 255, 255))
    red2 = cv2.inRange(hsv, (170, 120, 120), (180, 255, 255))
    red_mask = red1 + red2

    yellow_mask = cv2.inRange(hsv, (20, 120, 120), (35, 255, 255))
    green_mask = cv2.inRange(hsv, (40, 70, 70), (90, 255, 255))

    red_pixels = cv2.countNonZero(red_mask)
    yellow_pixels = cv2.countNonZero(yellow_mask)
    green_pixels = cv2.countNonZero(green_mask)

    if red_pixels > TL_PIXEL_THRESHOLD:
        return "red"
    elif yellow_pixels > TL_PIXEL_THRESHOLD:
        return "yellow"
    elif green_pixels > TL_PIXEL_THRESHOLD:
        return "green"
    else:
        return "unknown"


def process_traffic_violation_video(cap, max_images=MAX_IMAGES):
    saved_images = []
    detected_plates = set()

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) or 0
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) or 0

    stop_region_top = int(height * STOP_BAND_TOP_RATIO)
    stop_region_bottom = int(height * STOP_BAND_BOTTOM_RATIO)

    vehicle_classes = {"bicycle", "car", "motorcycle", "bus", "truck"}

    vehicle_memory = {}
    violated_ids = set()

    frame_id = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_id += 1
        if frame_id % TV_FRAME_SKIP != 0:
            continue

        raw_frame = frame.copy()
        traffic_state = detect_traffic_light(frame)

        results = traffic_model(frame, verbose=False)[0]
        if results.boxes is None:
            continue

        if len(saved_images) >= max_images:
            break

        for box in results.boxes:
            cls = int(box.cls[0])
            label = traffic_model.names.get(cls, str(cls))

            if label not in vehicle_classes:
                continue

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            cx = int((x1 + x2) / 2)
            cy = int((y1 + y2) / 2)

            vehicle_id = f"{cx}_{label}"
            prev_y = vehicle_memory.get(vehicle_id, None)

            inside_band = (stop_region_top <= cy <= stop_region_bottom)

            if prev_y is not None:
                crossed_into_band = (prev_y < stop_region_top and cy >= stop_region_top)

                # Violation: vehicle crosses into stop band while light is red
                if (
                    crossed_into_band
                    and inside_band
                    and traffic_state == "red"
                    and vehicle_id not in violated_ids
                ):
                    violated_ids.add(vehicle_id)

                    timestamp = int(time.time() * 1000)
                    filename = f"traffic_violation_{timestamp}.jpg"
                    save_path = os.path.join(OUTPUT_FOLDER, filename)

                    # Save a crop around the vehicle (with padding)
                    pad = 15
                    crop = raw_frame[
                        max(0, y1 - pad) : min(height, y2 + pad),
                        max(0, x1 - pad) : min(width, x2 + pad),
                    ]

                    if crop.size > 0:
                        cv2.imwrite(save_path, crop)
                        saved_images.append(filename)

                        plate_number = send_to_plate_api(save_path)
                        if plate_number:
                            detected_plates.add(plate_number)
                            if STOP_AFTER_FIRST_PLATE:
                                cap.release()
                                return saved_images, sorted(detected_plates)

            vehicle_memory[vehicle_id] = cy

    cap.release()
    return saved_images, sorted(detected_plates)


# ---------------- WEBCAM HELPERS (NEW)  ----------------
_webcam_last_saved_at = {
    "crash": 0.0,
    "seatbelt": 0.0,
    "helmet": 0.0,
}


def _webcam_should_save(violation_type: str) -> bool:
    """
    Cooldown so we don't save + insert DB on every single frame.
    """
    if not WEBCAM_SAVE_ENABLED:
        return False

    now = time.time()
    last = _webcam_last_saved_at.get(violation_type, 0.0)
    if (now - last) >= WEBCAM_COOLDOWN_SECONDS:
        _webcam_last_saved_at[violation_type] = now
        return True
    return False


def _save_frame_send_plate_and_insert(frame, violation_type: str, detected_classes, source_endpoint="/webcam-frame"):
    """
    Save frame -> call plate API -> insert DB row.
    Returns a dict describing saved record.
    """
    timestamp = int(time.time() * 1000)
    filename = f"webcam_{violation_type}_{timestamp}.jpg"
    save_path = os.path.join(OUTPUT_FOLDER, filename)

    ok = cv2.imwrite(save_path, frame)
    if not ok:
        return {"error": "Failed to save image"}

    image_url = url_for("download_file", filename=filename, _external=True)

    plate_number = send_to_plate_api(save_path)

    insert_violation(
        violation_type=violation_type,
        number_plate=plate_number,
        image_url=image_url,
        image_filename=filename,
        source_endpoint=source_endpoint,
        meta={
            "mode": "webcam",
            "detected_classes": detected_classes,
        },
    )

    return {
        "image_filename": filename,
        "image_url": image_url,
        "number_plate": plate_number,
    }


@app.route("/detect-crash", methods=["POST"])
def detect_crash():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded!"}), 400

    file = request.files["video"]
    filename = secure_filename(file.filename)
    video_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(video_path)

    cap = cv2.VideoCapture(video_path)

    crash_classes = ["accident", "crash"]  # update to match your crash_model.names
    saved_images, detected_plates = process_violation_video(cap, crash_model, crash_classes)

    image_urls = [url_for("download_file", filename=f, _external=True) for f in saved_images]

    plate_for_row = detected_plates[0] if detected_plates else None
    for f, u in zip(saved_images, image_urls):
        insert_violation(
            violation_type="crash",
            number_plate=plate_for_row,
            image_url=u,
            image_filename=f,
            source_endpoint="/detect-crash",
            meta={"detected_plates": detected_plates},
        )

    return jsonify(
        {
            "crash_detected": len(saved_images) > 0,
            "images_sent": len(saved_images),
            "saved_images": image_urls,
            "detected_plates": detected_plates,
        }
    )


@app.route("/detect/video", methods=["POST"])
def detect_seatbelt_video():
    if "video" not in request.files:
        return jsonify({"error": "No video file part"}), 400

    file = request.files["video"]
    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    cap = cv2.VideoCapture(path)

    violation_classes = [
        "Driver_not_wearing_seatbelt",
        "passenger_not_wearing_seatbelt",
        "vehicle with offense",
    ]

    saved_images, detected_plates = process_violation_video(cap, seatbelt_model, violation_classes)

    image_urls = [url_for("download_file", filename=f, _external=True) for f in saved_images]

    plate_for_row = detected_plates[0] if detected_plates else None
    for f, u in zip(saved_images, image_urls):
        insert_violation(
            violation_type="seatbelt",
            number_plate=plate_for_row,
            image_url=u,
            image_filename=f,
            source_endpoint="/detect/video",
            meta={"detected_plates": detected_plates},
        )

    return jsonify(
        {
            "violation_detected": len(saved_images) > 0,
            "images_sent": len(saved_images),
            "saved_images": image_urls,
            "detected_plates": detected_plates,
        }
    )


@app.route("/detect-helmet", methods=["POST"])
def detect_helmet_video():
    if "video" not in request.files:
        return jsonify({"error": "No video file part"}), 400

    file = request.files["video"]
    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    cap = cv2.VideoCapture(path)

    helmet_violation_classes = ["without helmet"]

    saved_images, detected_plates = process_violation_video(cap, helmet_model, helmet_violation_classes)

    image_urls = [url_for("download_file", filename=f, _external=True) for f in saved_images]

    plate_for_row = detected_plates[0] if detected_plates else None
    for f, u in zip(saved_images, image_urls):
        insert_violation(
            violation_type="helmet",
            number_plate=plate_for_row,
            image_url=u,
            image_filename=f,
            source_endpoint="/detect-helmet",
            meta={"detected_plates": detected_plates},
        )

    return jsonify(
        {
            "helmet_violation_detected": len(saved_images) > 0,
            "images_sent": len(saved_images),
            "saved_images": image_urls,
            "detected_plates": detected_plates,
        }
    )


@app.route("/detect-traffic-violation", methods=["POST"])
def detect_traffic_violation():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded!"}), 400

    file = request.files["video"]
    filename = secure_filename(file.filename)
    video_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(video_path)

    cap = cv2.VideoCapture(video_path)
    saved_images, detected_plates = process_traffic_violation_video(cap)

    image_urls = [url_for("download_file", filename=f, _external=True) for f in saved_images]

    plate_for_row = detected_plates[0] if detected_plates else None
    for f, u in zip(saved_images, image_urls):
        insert_violation(
            violation_type="traffic_violation",
            number_plate=plate_for_row,
            image_url=u,
            image_filename=f,
            source_endpoint="/detect-traffic-violation",
            meta={"detected_plates": detected_plates},
        )

    return jsonify(
        {
            "traffic_violation_detected": len(saved_images) > 0,
            "images_sent": len(saved_images),
            "saved_images": image_urls,
            "detected_plates": detected_plates,
        }
    )


@app.route("/webcam-frame", methods=["POST"])
def webcam_frame():
    """
    Browser sends a JPEG frame as base64.
    We run all models on that single frame and return combined results.
    NEW: If a violation is detected, we also save an image, call plate API,
    and insert into DB (with cooldown to avoid flooding).
    """
    data = request.get_json(silent=True) or {}
    frame_b64 = data.get("frame")
    if not frame_b64:
        return jsonify({"error": "Missing 'frame' (base64 jpeg)"}), 400

    # Optional client control: { "save": true/false }
    save_requested = bool(data.get("save", True))

     # Strip optional prefix: data:image/jpeg;base64,...
    if "," in frame_b64:
        frame_b64 = frame_b64.split(",", 1)[1]

    try:
        jpg_bytes = base64.b64decode(frame_b64)
        np_arr = np.frombuffer(jpg_bytes, dtype=np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({"error": "Failed to decode image"}), 400
    except Exception as e:
        return jsonify({"error": f"Decode error: {e}"}), 400

    out = {
        "crash": {"detected": False, "classes": [], "saved": []},
        "seatbelt": {"detected": False, "classes": [], "saved": []},
        "helmet": {"detected": False, "classes": [], "saved": []},
        "traffic_light": {"state": "unknown"},
        "traffic_violation": {"detected": False, "note": "red-light crossing needs motion tracking"},
    }

    saved_count = 0

    # Crash 
    try:
        r = crash_model(frame, verbose=False)[0]
        names = [crash_model.names[int(c)] for c in r.boxes.cls.tolist()] if r.boxes is not None else []
        out["crash"]["classes"] = names
        out["crash"]["detected"] = any(n in ["accident", "crash"] for n in names)

        if (
            save_requested
            and out["crash"]["detected"]
            and _webcam_should_save("crash")
            and saved_count < WEBCAM_MAX_SAVES_PER_REQUEST
        ):
            out["crash"]["saved"].append(_save_frame_send_plate_and_insert(frame, "crash", names))
            saved_count += 1
    except Exception as e:
        out["crash"]["error"] = str(e)

    # Seatbelt
    try:
        r = seatbelt_model(frame, verbose=False)[0]
        names = [seatbelt_model.names[int(c)] for c in r.boxes.cls.tolist()] if r.boxes is not None else []
        out["seatbelt"]["classes"] = names
        out["seatbelt"]["detected"] = any(
            n in [
                "Driver_not_wearing_seatbelt",
                "passenger_not_wearing_seatbelt",
                "vehicle with offense",
            ]
            for n in names
        )

        if (
            save_requested
            and out["seatbelt"]["detected"]
            and _webcam_should_save("seatbelt")
            and saved_count < WEBCAM_MAX_SAVES_PER_REQUEST
        ):
            out["seatbelt"]["saved"].append(_save_frame_send_plate_and_insert(frame, "seatbelt", names))
            saved_count += 1
    except Exception as e:
        out["seatbelt"]["error"] = str(e)

    # Helmet
    try:
        r = helmet_model(frame, verbose=False)[0]
        names = [helmet_model.names[int(c)] for c in r.boxes.cls.tolist()] if r.boxes is not None else []
        out["helmet"]["classes"] = names
        out["helmet"]["detected"] = any(n in ["without helmet"] for n in names)

        if (
            save_requested
            and out["helmet"]["detected"]
            and _webcam_should_save("helmet")
            and saved_count < WEBCAM_MAX_SAVES_PER_REQUEST
        ):
            out["helmet"]["saved"].append(_save_frame_send_plate_and_insert(frame, "helmet", names))
            saved_count += 1
    except Exception as e:
        out["helmet"]["error"] = str(e)

    # Traffic light state (single frame)
    try:
        out["traffic_light"]["state"] = detect_traffic_light(frame)
    except Exception as e:
        out["traffic_light"]["error"] = str(e)

    return jsonify(out), 200


@app.route("/webcam")
def webcam_page():
    return render_template("webcam.html")


@app.route("/outputs/<filename>")
def download_file(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)


@app.route("/")
def home():
    return jsonify({"status": "Traffic Violation API Running"})


if __name__ == "__main__":
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=debug)