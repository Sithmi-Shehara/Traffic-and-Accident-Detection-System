# 🚦Traffic Violation Detection System

**Repository: Traffic-and-Accident-Detection-System**

##### Branch: Violation-Detection


### 📝 Overview
The Traffic Violations Detection Module is a core component of the research project focused on improving road safety and traffic law enforcement using computer vision and deep learning techniques.
This module automatically detects traffic violations from CCTV camera feeds installed at road intersections and road-side locations.

The system currently focuses on two major types of violations:

- Seat Belt Violation Detection

- Traffic Signal (Red-Light) Violation Detection

By automating violation detection, the system reduces the need for manual monitoring, improves accuracy, and supports authorities in enforcing traffic regulations more efficiently.




### ⭐Key Features
- Real-time traffic violation detection using CCTV camera feeds

- Automatic detection of seat belt usage by drivers

- Detection of red-light violations at traffic intersections

- Supports evidence-based enforcement through visual data

- Scalable design suitable for smart traffic management systems

## 🧩Modules Description
#### ✅Seat Belt Detection Module
- Detects whether a driver is wearing a seat belt while driving

- Uses video or image feeds captured from traffic surveillance cameras

- Classifies seat belt presence using a trained machine learning model

- Helps improve road safety and reduce injury risks in accidents

#### 🚥Traffic Signal & Red-Light Violation Detection Module
- Detects vehicles violating traffic signals at intersections

- Monitors traffic signal states (red, green)

- Tracks vehicle movement relative to the stop line

- Identifies vehicles crossing the stop line during a red signal

- Supports traffic law enforcement and congestion management
















## ⚙️How the System Works
CCTV cameras capture live video streams or images from traffic intersections

Video frames are extracted and pre-processed
#### ✅Seat Belt Module

- Seat belt presence is classified

#### 🚥Red-Light Violation Module
- Traffic signal state is detected

- Vehicle position is tracked

- Stop line crossing during red signal is identified

- Detected violations are recorded and flagged for further action



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
git checkout Violation-Detection
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
- The system is tested using recorded CCTV footage and real-world traffic images

- Multiple lighting and traffic conditions are used for validation

- Accuracy is evaluated based on:

                Correct detection of seat belt usage

                Correct identification of red-light violations

- Performance metrics such as precision and detection accuracy are analyzed



## ⚠️Known Limitations
- Performance may reduce under poor lighting or bad weather conditions

- Occlusion of drivers or seat belts can affect detection accuracy

- Variations in camera angles and resolution may impact results

- Real-time processing requires sufficient computational resources

- Complex traffic scenarios may cause occasional false detections


## 📈Future Enhancements
- Integration of additional traffic violations (helmet detection, lane violations, speeding)

- Improved accuracy using larger and more diverse datasets

- Support for real-time alerts and automated fine generation

- Integration with traffic management and police databases

- Optimization for edge devices and low-power systems

- Use of multi-camera tracking for better vehicle identification

## 📄License

This project is part of a Research Project year 4.

## 👥Contributors
Pushpamal K P N - IT22561916


- Development Team

---

© 2024 City Traffic Department. All rights reserved.


































