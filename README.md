🚦 Traffic Violation and Accident Detection System

Repository: Traffic-and-Accident-Detection-System

📝 Overview

The Traffic Violation and Accident Detection System is a smart traffic enforcement and monitoring platform designed to improve road safety using computer vision, deep learning, and real-time data processing.

The system analyzes CCTV camera feeds from road intersections and roadside locations to automatically detect traffic violations, identify vehicles, assess accident severity, and enable transparent communication between citizens and authorities.

This project integrates AI-powered backend modules with a modern web-based frontend system to provide an end-to-end smart traffic management solution.

🧩 Core System Components
🚥 1. Traffic Violation Detection Module

Detects traffic rule violations directly from CCTV feeds.

Key Features

Real-time seat belt violation detection

Red-light violation detection

Vehicle tracking relative to stop lines

Evidence-based enforcement using captured frames

🔢 2. Number Plate Detection in Adverse Weather Conditions

Identifies violating vehicles under challenging conditions.

Key Features

License plate recognition under blur, fog, noise, glare, and low light

OCR accuracy evaluation under distortion levels

Tampered plate detection

Vehicle verification via registration database

Real-time alerts to owners and authorities

🚑 3. Accident Severity Assessment & Emergency Alerts

Automatically detects accidents and triggers emergency alerts.

Key Features

Accident detection from CCTV feeds

Vehicle speed estimation

Severity classification (Low / Medium / High)

Fire and hazard detection

Automated alerts via SMS, WhatsApp, Email, and Voice

Escalation mechanisms and offline SMS fallback

🌐 4. Citizen Appeal Management System 

Fullstack Web Application – Developed by Shehara I.G.D.S

A professional React-based web frontend that allows citizens to submit and track traffic violation appeals and enables administrators to review, approve, or reject appeals transparently.

This component improves citizen transparency, accountability, and trust in the automated traffic enforcement system.

✨ Features
👤 Citizen Features

Landing page with How It Works section

User registration with validation

Secure login system

Citizen dashboard with appeal statistics

Submit appeals with evidence upload

Step-by-step appeal status tracking

View detailed violation information

🛡️ Admin Features

Admin dashboard with appeal statistics

Review appeals with ML confidence scores

Approve or reject appeals

🛠️ Technology Stack (Frontend)

React 18.2.0

React Router DOM 6.20.0

CSS3 (custom professional blue theme)

Public Sans Font

🎨 UI & Design Highlights

Clean and modern web interface

Responsive design (desktop-first, mobile-friendly)

Card-based layouts with shadows

Professional blue color scheme

Intuitive navigation and user-friendly forms

🚀 Installation & Setup
📋 Prerequisites

Node.js (v16 or higher)

MongoDB

npm or yarn

🔧 Backend Setup
cd backend
npm install
npm run dev


Create .env file:

MONGODB_URI=mongodb://localhost:27017/traffic_violation
JWT_SECRET=your_secret_key
PORT=5000

🌐 Frontend Setup
cd frontend
npm install
npm start


User Dashboard runs at: http://localhost:3000
Frontend run by:- npm start
Backend run by:- npm run dev
Admin Dashboard runs at: http://localhost:3000/Login
Run by:- npm run create-admin

🧪 Testing Strategy

CCTV footage testing under multiple conditions

OCR accuracy comparison before/after preprocessing

Accident severity classification validation

Alert delivery and escalation testing

⚠️ Known Limitations

Performance depends on CCTV resolution

Extreme weather may reduce OCR accuracy

High computational resources required for real-time processing

📈 Future Enhancements

Automated fine generation

Authority analytics dashboard

Real-time WebSocket updates

Mobile application integration

Advanced tamper detection

📄 License

This project is part of a Year 4 Research Project.

👥 Contributors

Wathsalavi K H S – IT22305596

Pushpamal K P N – IT22561916

Rashmi B G R – IT22052360

Shehara I.G.D.S – IT22338334

(Development Team)

© 2024 City Traffic Department. All rights reserved.
