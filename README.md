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

###  Clone the repository

git clone <repository-url>
cd Traffic-and-Accident-Detection-System
git checkout Number-Plate-Detection

---
## 📦 Install Backend Dependencies

cd backend
npm install

---
## 📦 Install Frontend Dependencies

cd ../frontend
npm install

---

## ⚙️ Configuration

###  Backend Setup

git clone <repository-url>
cd Traffic-and-Accident-Detection-System
git checkout Number-Plate-Detection



