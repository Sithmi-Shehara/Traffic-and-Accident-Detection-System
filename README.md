# 🚦Number Plate Detection in Adverse Weather Conditions

**Repository: Traffic-and-Accident-Detection-System**

##### Branch: Number-Plate-Detection


### 📖 Overview
This module identifies vehicles involved in traffic violations by accurately extracting license plate numbers from CCTV frames/clips using EasyOCR. It is designed to maintain strong OCR performance under adverse real-world conditions such as blur, noise, low light, fog, glare, and tilted camera angles. It also supports tampered/fake plate detection and enables real-time alerting for both vehicle owners and traffic authorities.

The component forms the core enforcement link of the overall system, bridging violation detection with law enforcement by ensuring reliable vehicle identification, fraud prevention, and instant notification.

### ✨Key Features
- Accurate license plate recognition even under adverse conditions
- Clear measurement of OCR accuracy at different distortion levels (30%, 50%, 80%)

- Identification of unreadable thresholds for blurred or noisy plates

- Detection of tampered or fraudulent license plates

- Real-time notifications to both citizens (owners) and authorities

- Vehicle verification against registration database

- Image preprocessing for enhanced OCR performance

## ⚙️How It Works
#### 📥Input from Detection Module
The component receives image frames or short video clips of violating vehicles from the real-time detection module. These inputs contain the vehicle and its visible license plate.

#### 🎯Dataset Preparation and Adverse Condition Simulation
A clean number plate dataset is first collected and labeled. To simulate real-world conditions, artificial effects such as blur, noise, low light, fog, and glare are applied at 30%, 50%, and 80% intensity levels. This helps the system learn how OCR performance changes as image quality degrades.

#### 🤖OCR Model Training and Testing (Evaluation Focus)
Baseline OCR testing is done using EasyOCR, followed by improved performance with enhanced preprocessing. The model is evaluated to determine:

- OCR accuracy at each distortion level

- The percentage at which number plates become unreadable

#### 🔧Image Preprocessing for Better Accuracy
Before OCR is applied, preprocessing techniques such as deblurring, noise reduction, brightness and contrast enhancement, and tilt correction are used.

#### 🔍License Plate Recognition and Verification
EasyOCR extracts the license plate number from the processed image. The recognized plate is checked against a vehicle registration database to retrieve vehicle and owner details such as vehicle type, model, and registered plate category.

#### ⚠️Tampered Plate Detection
The system compares the detected vehicle type with the registered plate type. If a mismatch is found (for example, a motorcycle plate used on a car), the plate is flagged as tampered or fake.

#### 📲Real-Time Notifications 

- Owner notification (SMS): Twilio SMS

- Authority alerts: Webhook (POST to authority backend/dashboard endpoint)

Optional: Email fallback for redundancy

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
git checkout Number-Plate-Detection
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

## 🧪Testing
- OCR works on clear plates

- OCR works under blur/noise/low light/fog/glare/tilt

- Preprocessing improves recognition (before vs after)

- Plate verification returns correct DB details

- Tampered plates are flagged correctly

- Owner SMS alert triggers correctly (if enabled)

- Authority alert includes evidence reference and tamper status



## ⚠️Known Limitations
- OCR depends on CCTV resolution and plate visibility (occlusion/extreme glare may reduce accuracy)

- Beyond certain distortion thresholds, plates become unreadable (tracked via evaluation)

- Tamper detection currently relies on mismatch logic and can be improved with additional signals


## 📈Future Enhancements
- Multi-frame aggregation from video clips to improve OCR accuracy

- Fine-tuning OCR for local plate formats and fonts

- Enhanced tamper detection (font spacing, holograms, reflectivity cues)

- Scalable alerting via message queues (RabbitMQ/Kafka)

- Authority dashboard analytics and reporting

## 📄License

This project is part of a Research Project year 4.

## 👥Contributors
Wathsalavi K H S - IT22305596


- Development Team

---

© 2024 City Traffic Department. All rights reserved.


































