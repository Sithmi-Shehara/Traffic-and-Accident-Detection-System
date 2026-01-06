# 🚦 Citizen Appeal Management System

🎯 A professional **web-based frontend application** for the **Traffic Violation and Accident Detection System**, built using **React**.

This system enables **citizens to submit and track traffic violation appeals** while allowing **administrators to review, manage, and make decisions** through a modern, responsive web interface.

---

## ✨ Features

### 👤 Citizen Features
- 🏠 **Landing Page** – Informative homepage with *How It Works* section  
- 📝 **User Registration** – Complete registration form with validation  
- 🔐 **User Login** – Secure login interface  
- 📊 **Citizen Dashboard** – View appeal statistics and recent appeals  
- 📤 **Submit Appeal** – Submit new appeals with evidence upload  
- 🔄 **Appeal Status Tracking** – Step-by-step appeal progress visualization  
- 📄 **Violation Details** – View detailed traffic violation information  

---

### 🛡️ Admin Features
- 📈 **Admin Dashboard** – Overview of all appeals with statistics & charts  
- 🧠 **Appeal Review** – Review appeals with ML confidence scores and make decisions  

---

## 🛠️ Technology Stack
- ⚛️ **React 18.2.0** – Frontend framework  
- 🔀 **React Router DOM 6.20.0** – Routing & navigation  
- 🎨 **CSS3** – Custom styling with professional blue theme  
- 🔤 **Public Sans Font** – Clean & professional typography  

---

## 🚀 Installation

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd Traffic-and-Accident-Detection-System
2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm start


🌐 The application will open at:
User Dashboard Frontend:-http://localhost:3000
Admin Dashboard Frontend:-http://localhost:3000/Login

🌐 Backend Runs at:
User Dashboard Backend:- npm run dev
Admin Dashboard Backend:-npm create-admin

📁 Project Structure
src/
├── components/
│   ├── Header.js              # Top navigation header
│   ├── Header.css
│   ├── Footer.js              # Professional web footer
│   └── Footer.css
├── pages/
│   ├── LandingPage.js         # Public landing page
│   ├── LoginPage.js           # User login
│   ├── RegisterPage.js        # User registration
│   ├── CitizenDashboard.js    # Citizen dashboard
│   ├── SubmitAppeal.js        # Submit appeal form
│   ├── AppealStatus.js        # Appeal status tracking
│   ├── ViolationDetails.js    # Violation details view
│   ├── AdminDashboard.js      # Admin dashboard
│   └── AppealReview.js        # Admin appeal review
├── App.js                     # Main app component with routing
├── App.css                    # Global styles & theme variables
├── index.js                   # Entry point
└── index.css                  # Base styles

🎨 Color Theme

The application uses a professional blue color palette:

🔵 Primary Blue: #1280ED

🔹 Primary Blue Dark: #0A73D9

🔹 Secondary Blue: #E8EDF2

⚫ Text Primary: #0D141C

⚪ Text Secondary: #4D7399

🤍 Background White: #FFFFFF

🌫️ Background Light: #F7FAFC

▫️ Border Color: #CFDBE8

✅ Success Green: #088738

🧭 Routes

/ – Landing page

/login – User login

/register – User registration

/dashboard – Citizen dashboard

/submit-appeal – Submit new appeal

/appeal-status/:id – View appeal status

/violation-details/:id – View violation details

/admin/dashboard – Admin dashboard

/admin/appeal-review/:id – Admin appeal review

🧪 Development
📦 Available Scripts

npm start – Runs the app in development mode

npm build – Builds the app for production

npm test – Launches the test runner

🎯 Design Highlights

Clean & modern web interface

Professional top navigation header

Comprehensive footer with links & contact details

Fully responsive design (desktop-first)

Card-based layouts with shadows & borders

Intuitive navigation & user-friendly forms

🔮 Future Enhancements

Backend API integration

Authentication & authorization

Real-time update enhancements

Analytics & reporting

Model training for future predictions

📄 License

This project is part of a Year 4 Research Project.

👩‍💻 Contributors

Shehara I.G.D.S – IT22338334

Development Team

© 2024 City Traffic Department. All rights reserved.
