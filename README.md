# Traffic and Accident Detection System
Research Project year 4

**Repository: Traffic-and-Accident-Detection-System**



### 📝 Overview
The Traffic and Accident Detection System is a smart traffic enforcement and monitoring platform designed to improve road safety using computer vision, deep learning, and real-time data processing.

The system analyzes CCTV camera feeds from road intersections and road-side locations to automatically detect traffic violations and accurately identify violating vehicles. It minimizes manual monitoring, improves enforcement accuracy, and enables real-time alerts to both vehicle owners and traffic authorities.

This project consists of two major integrated components:

- 🚦 Traffic Violation Detection Module

- 🔢 Number Plate Detection in Adverse Weather Conditions Module

- 🚑 Accident Severity Assessment & Emergency Alerts Module

Together, these components form a complete enforcement pipeline—from violation detection to vehicle identification and notification.



## 🧩 System Components
#### 🚥 1. Traffic Violation Detection Module

This module focuses on detecting traffic rule violations directly from CCTV feeds.

##### Key Focus Areas

Seat Belt Violation Detection

Traffic Signal (Red-Light) Violation Detection

##### ✨ Key Features

- Real-time traffic violation detection using CCTV feeds

- Automatic detection of seat belt usage by drivers

- Detection of red-light violations at intersections

- Vehicle movement tracking relative to stop lines

- Evidence-based enforcement using captured frames

- Scalable architecture for smart traffic systems

##### ⚙️ How It Works

- CCTV cameras capture live video streams

- Video frames are extracted and preprocessed

- Seat Belt Module

    - Detects and classifies seat belt usage

- Red-Light Violation Module

    - Detects traffic signal state

    - Tracks vehicle position

    - Flags vehicles crossing the stop line during a red signal

- Detected violations are stored for further processing


#### 🔢 2. Number Plate Detection in Adverse Weather Conditions

This module serves as the core enforcement link, identifying vehicles involved in detected violations.

##### ✨ Key Features

- Accurate license plate recognition under:

     - Blur

     - Noise

     - Low light

    - Fog

    - Glare

    - Tilted camera angles

- OCR accuracy evaluation at 30%, 50%, and 80% distortion levels

- Detection of unreadable thresholds

- Tampered or fraudulent plate detection

- Vehicle verification via registration database

- Real-time alerts to owners and authorities

- Image preprocessing to enhance OCR performance

##### ⚙️ How It Works

- Receives vehicle images/clips from the Violation Detection Module

- Applies simulated adverse conditions for evaluation

- Preprocesses images (deblurring, noise removal, brightness correction, tilt correction)

- Extracts license plate numbers using EasyOCR

- Verifies extracted plates against vehicle registration data

- Flags mismatched vehicle–plate combinations as tampered

- Triggers real-time notifications

##### 📲 Notifications

- Owner Alerts: SMS (Twilio)

- Authority Alerts: Webhook POST to authority backend/dashboard

- Email fallback


#### 🚑 3. Accident Severity Assessment & Emergency Alerts Module

This module focuses on automatic detection of road accidents, severity classification, and real-time emergency alerting using CCTV camera feeds and AI-based analysis.

##### Key Focus Areas

Accident Detection from CCTV Feeds

Vehicle Speed Estimation

Accident Severity Classification (Low / Medium / High)

Fire Detection after Accidents

Automated Emergency Alerts

##### ✨ Key Features

- Real-time accident detection using CCTV video streams

- AI-based vehicle detection and movement tracking

- Vehicle speed estimation using camera calibration

- Severity classification into Low, Medium, and High levels

- Fire and hazard detection for post-accident risk assessment

- Automated multi-channel alerts (SMS, WhatsApp, Email, Voice)

- Escalation mechanism if alerts are not acknowledged

- Offline SMS fallback for low-connectivity areas

- Secure logging of accident details with timestamp and location

##### ⚙️ How It Works

- CCTV cameras capture continuous traffic video streams

- Video frames are extracted and preprocessed

- Vehicle Tracking Module

  - Detects and tracks vehicles across frames to monitor motion patterns

- Vehicle Speed Estimation Module

  - Calculates displacement between frames

  - Converts pixel distance to real-world distance using camera calibration

  - Estimates vehicle speed in real time

- Accident Detection Module

  - Detects collisions based on sudden vehicle overlaps

  - Identifies sharp speed drops and abnormal motion patterns

- Severity Classification Module

  - Evaluates accident severity using speed and collision behavior

  - Categorizes accidents as Low, Medium, or High severity

- Fire Detection Module

  - Detects fire/hazard regions in frames

  - Estimates fire size for risk assessment

- Emergency Alert Module

  - Triggers automated alerts to hospitals, police, and emergency contacts

  - Sends alerts via SMS, WhatsApp, Email, and Voice Calls

- Detected accidents and alerts are stored for further analysis and review



























## 📋Prerequisites
Before running this application, make sure you have the following installed:

- Node.js (v16 or higher) https://nodejs.org/

- MongoDB - Download Community Edition https://www.mongodb.com/try/download/community

- npm or yarn package manager

### 🛠️Installation


**Clone the Repository**
```bash
git clone <repository-url>
cd Traffic-and-Accident-Detection-System
git checkout <Branch Name>
```
**Install Backend Dependencies**
```bash
cd backend
npm install
```

**Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### 🔧Configuration

**Backend Setup**
###### Create Environment File
Create a .env file in the backend directory:
```bash
MONGODB_URI=mongodb://localhost:27017/traffic_violation
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production_123456789
PORT=5000
```

###### Start MongoDB
```bash
# On macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# Or start manually
mongod --dbpath /usr/local/var/mongodb

```
**Frontend Setup**
###### Create Environment File
Create a .env file in the frontend directory:
```bash
REACT_APP_API_URL=http://localhost:5001/api
```
---

## 🚀Running the Application
**Start the Backend Server**
```
cd backend
npm run dev
- Backend runs at: http://localhost:5001
```
---
**Start the Frontend Development Server**
```
cd frontend
npm start
- Frontend runs at: http://localhost:3000
```
---

## 📋 Production Build
**Build the Frontend**
```
cd frontend
npm run build
```
---
**Start Backend in Production**
```
cd backend
npm start
```
---

## 🧪 Testing Strategy
#### Traffic Violation Detection

- Tested using recorded CCTV footage and real-world images

- Validated under multiple lighting and traffic conditions

- Evaluation based on:

    - Correct seat belt detection

    - Correct red-light violation detection

    - Precision and detection accuracy

#### Number Plate Detection

- OCR tested on clear and distorted plates

- Accuracy comparison before vs after preprocessing

- Verification against registration database

- Tampered plate detection validation

- Notification delivery testing


#### Accident Severity Assessment & Emergency Alerts
- Accident Severity Assessment & Emergency Alerts

- Tested using recorded CCTV accident footage and real-world accident clips

- Validated under multiple conditions (day/night, rain/fog, heavy traffic, different camera angles)

- Evaluation based on:

   - Correct accident detection accuracy

   - Correct severity classification (Low / Medium / High)

   - Correct fire/hazard detection (when applicable)

   - Alert response time (detection → notification)

   - Successful alert delivery and escalation reliability


## ⚠️Known Limitations
- Performance depends on CCTV resolution and visibility

- Extreme glare, occlusion, or very low resolution may reduce accuracy

- OCR fails beyond certain distortion thresholds

- Tamper detection currently relies on rule-based mismatch logic

- Real-time processing requires sufficient computational resources


## 📈Future Enhancements
- Multi-frame aggregation for improved OCR accuracy

- Fine-tuning OCR for local plate formats and fonts

- Advanced tamper detection (font spacing, holograms, reflectivity)

- Additional violation types (helmet detection, speeding, lane violations)

- Automated fine generation

- Authority analytics dashboard and reporting

- Message queue–based alerting (RabbitMQ/Kafka)

- Edge-device optimization and multi-camera tracking

## 📄License

This project is  Research Project year 4.

## 👥Contributors
Wathsalavi K H S - IT22305596
Pushpamal K P N - IT22561916
Rashmi B G R - IT22052360


- Development Team

---

© 2024 City Traffic Department. All rights reserved.


































