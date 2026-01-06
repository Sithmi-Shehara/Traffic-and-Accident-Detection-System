# 🚑 Accident Severity Assessment & Emergency Alerts Modul

## 📝 Overview
The **Accident Severity Assessment & Emergency Alerts module** detects road accidents from CCTV camera feeds, classifies the accident severity (**Low / Medium / High**), detects post-accident hazards (e.g., fire), and triggers **real-time emergency notifications** to relevant authorities.

This module is designed to work **without physical sensors** and relies only on existing traffic camera footage and AI-based video analysis.

---

## 🎯 Objectives
- Detect road accidents automatically using CCTV video
- Estimate vehicle speed and identify abnormal motion patterns
- Classify accident severity into **Low / Medium / High**
- Detect hazards such as **fire** after accidents
- Trigger automated emergency alerts quickly and reliably

---

## ✨ Key Features
- Real-time accident detection from CCTV streams
- Vehicle detection and tracking across frames
- Vehicle speed estimation using camera calibration
- Severity classification: **Low / Medium / High**
- Fire/hazard detection for post-accident risk assessment
- Automated alert workflow (SMS / WhatsApp / Email / Voice)
- Escalation mechanism if alerts are not acknowledged
- Offline SMS fallback for low-connectivity areas
- Secure logging of accident details (timestamp + location)

---

## ⚙️ How It Works (Pipeline)
1. **CCTV Input** → continuous video feed
2. **Frame Extraction & Preprocessing**
3. **Vehicle Detection & Tracking**
4. **Speed Estimation**
5. **Accident Detection**
   - sudden overlap/collision patterns  
   - sharp speed drop + abnormal motion
6. **Severity Classification**
   - Low / Medium / High
7. **Fire / Hazard Detection**
8. **Emergency Alerts**
   - notify police / hospital / emergency contacts  
9. **Store Logs & Alerts for Review**

---

## 🧪 Testing Strategy
- Tested using recorded CCTV accident footage and real-world accident clips
- Validated under multiple conditions:
  - day/night
  - rain/fog
  - heavy traffic
  - different camera angles
- Evaluation based on:
  - accident detection accuracy
  - severity classification correctness (Low/Medium/High)
  - fire/hazard detection correctness (when applicable)
  - response time (detection → notification)
  - alert delivery and escalation reliability

---

## 📋 Prerequisites
- Node.js (v16 or higher)
- npm (or yarn)
- MongoDB (if your backend stores logs in DB)

---

## 🛠️ Installation
```bash
git clone https://github.com/Sithmi-Shehara/Traffic-and-Accident-Detection-System.git
cd Traffic-and-Accident-Detection-System
git checkout "Severity-Assessment&-Emergency-Alert"
