# Traffic and Accident Detection System — Number Plate Detection (OCR + Tamper Detection)

**Repository:** `Traffic-and-Accident-Detection-System`  
**Branch:** `Number-Plate-Detection`

This module identifies vehicles involved in traffic violations by accurately extracting **license plate numbers from CCTV frames/clips** using **EasyOCR**. It is designed to maintain strong OCR performance under adverse real-world conditions such as **blur, noise, low light, fog, glare, and tilted camera angles**. It also supports **tampered/fake plate detection** and enables **real-time alerting** for both **vehicle owners** and **traffic authorities**.

---

## Overview

The Number Plate Detection component bridges violation detection and enforcement by:
- Receiving frames/clips from a real-time detection pipeline
- Enhancing images using preprocessing
- Extracting plate text using OCR (EasyOCR)
- Verifying plate details via a database
- Detecting plate tampering/fraud
- Triggering notifications for faster enforcement

---

## Key Features

### Robust OCR Under Adverse Conditions
Designed to recognize plates under:
- Blur
- Noise
- Low light
- Fog
- Glare
- Tilted camera angles

### Adverse Condition Simulation for Evaluation
- Uses a clean labeled dataset
- Applies synthetic distortions at **30% / 50% / 80%** intensity
- Measures OCR performance degradation and identifies unreadable thresholds

### OCR with EasyOCR
- Plate number extracted using **EasyOCR**
- Supports logging OCR confidence/quality per sample

### Image Preprocessing Pipeline
Improves plate readability via:
- Deblurring
- Noise reduction
- Brightness/contrast enhancement
- Tilt/perspective correction

### Plate Verification
- Checks recognized plate number against a registration database to retrieve:
  - vehicle type
  - vehicle model
  - registered plate category/type
  - owner reference details (for notification)

### Tampered/Fake Plate Detection
- Flags mismatches between detected vehicle type and registered plate category/type  
  *(e.g., motorcycle plate used on a car)*

### Real-Time Notifications (Recommended Implementation)
Since the alerting mechanism is not finalized yet, the recommended approach is:
- **Owner notification (SMS):** **Twilio SMS** (reliable and fast)
- **Authority alerts:** **Webhook-based alerts** (POST to an authority service/dashboard endpoint)
- Optional redundancy: email fallback for authorities (SendGrid/SMTP)

> Implement notifications behind a provider interface so you can swap Twilio/webhooks later without rewriting the core pipeline.

---

## How the Component Works

1. **Input from Detection Module**  
   Receives image frames or short video clips of violating vehicles from the real-time detection module.

2. **Dataset Preparation & Adverse Condition Simulation**  
   A clean dataset is collected and labeled. Distortions are applied at **30% / 50% / 80%** intensity to simulate CCTV conditions.

3. **OCR Training/Testing (Evaluation Focus)**  
   Baseline OCR is performed using EasyOCR, followed by improvements through preprocessing. Evaluation determines:
   - OCR accuracy per distortion type and level
   - the distortion threshold where plates become unreadable

4. **Image Preprocessing**  
   Enhances frames prior to OCR using deblur/denoise/contrast/tilt correction.

5. **Plate Recognition & Verification**  
   Plate text is extracted via EasyOCR and verified against the registration database.

6. **Tampered Plate Detection**  
   Detects mismatch between detected vehicle type and registered plate category/type.

7. **Real-Time Notifications**  
   - Owners receive SMS (plate, vehicle model, time, location)
   - Authorities receive alerts (violation details, evidence reference, tamper status)

---

## Key Outcomes

- Accurate license plate recognition under adverse conditions
- Measured OCR performance across distortion levels
- Identification of unreadable thresholds
- Detection of tampered/fraudulent plates
- Real-time communication with owners and authorities

---

## Contribution to the Overall System

This component forms the **core enforcement link** of the system. It ensures reliable vehicle identification and fraud prevention, enabling automated law enforcement with better transparency, reliability, and faster response times.

---

## ⚙️ Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) — https://nodejs.org/
- **MongoDB** — https://www.mongodb.com/try/download/community
- **npm** or **yarn** package manager

---

## 📦 Installation

### 1) Clone the repository

```bash
git clone <repository-url>
cd Traffic-and-Accident-Detection-System
git checkout Number-Plate-Detection

---

2) Install Backend Dependencies
cd backend
npm install

3) Install Frontend Dependencies
cd ../frontend
npm install

⚙️ Configuration
Backend Setup
1) Create Environment File

Create a .env file in the backend directory:

MONGODB_URI=mongodb://localhost:27017/traffic_violation
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production_123456789
PORT=5000


Note: Keep JWT_SECRET private and replace it for production deployments.

2) Start MongoDB
# On macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# Or start manually
mongod --dbpath /usr/local/var/mongodb

Frontend Setup
1) Create Environment File

Create a .env file in the frontend directory:

REACT_APP_API_URL=http://localhost:5001/api

🎯 Running the Application
Development Mode
1) Start the Backend Server
cd backend
npm run dev


Backend runs at: http://localhost:5001

2) Start the Frontend Development Server
cd frontend
npm start


Frontend runs at: http://localhost:3000

Production Build
1) Build the Frontend
cd frontend
npm run build

2) Start Backend in Production
cd backend
npm start

Recommended Evaluation Metrics (For Presentation)

OCR Accuracy (%)

Clean dataset

Each distortion type at 30% / 50% / 80%

Unreadable Threshold per distortion type

Tamper Detection Accuracy

false positives / false negatives

Latency

frame received → OCR → verification → notification

Suggested Project Structure (Module View)
backend/
├── services/
│   ├── ocr/                       # EasyOCR integration service (if used via API)
│   ├── preprocessing/             # Deblur/denoise/enhance/tilt correction
│   ├── verification/              # DB lookup and validation
│   ├── tamper-detection/          # Mismatch detection logic
│   └── notifications/             # Twilio + Webhook (recommended)
frontend/
├── src/
│   ├── pages/                     # UI pages
│   ├── components/                # Reusable UI components
│   └── services/                  # API client layer (fetch/axios)


(Update this section if your actual structure differs.)

Testing (Recommended)
Manual Test Checklist (Marking Panel Friendly)

 OCR works on clear plates

 OCR works under blur/noise/low light/fog/glare/tilt

 Preprocessing improves recognition (before vs after)

 Plate verification returns correct DB details

 Tampered plates are flagged correctly

 Owner SMS alert triggers correctly (if enabled)

 Authority alert includes evidence reference and tamper status

Known Limitations

OCR depends on CCTV resolution and plate visibility (occlusion/extreme glare may reduce accuracy)

Beyond certain distortion thresholds, plates become unreadable (tracked via evaluation)

Tamper detection currently relies on mismatch logic and can be improved with additional signals

Future Enhancements

Multi-frame aggregation from video clips to improve OCR accuracy

Fine-tuning OCR for local plate formats and fonts

Enhanced tamper detection (font spacing, holograms, reflectivity cues)

Scalable alerting via message queues (RabbitMQ/Kafka)

Authority dashboard analytics and reporting

License

This project is part of a Year 4 Research Project.

Contributors

Development Team
© 2024–2026. All rights reserved.
