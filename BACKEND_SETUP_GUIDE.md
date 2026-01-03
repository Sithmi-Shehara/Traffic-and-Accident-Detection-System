# 🎯 Complete Backend Setup Guide

## ✅ What Has Been Created

Your complete MERN backend is now ready! Here's what was built:

### 📁 Folder Structure
```
server/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # User registration & login logic
│   └── appealController.js # Appeal creation & management logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User database model
│   └── Appeal.js          # Appeal database model
├── routes/
│   ├── authRoutes.js      # Authentication endpoints
│   └── appealRoutes.js    # Appeal endpoints
├── uploads/               # Folder for uploaded files
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Backend dependencies
├── server.js             # Main server file
├── README.md             # Detailed documentation
└── QUICK_START.md        # Quick setup guide
```

### 🔌 API Endpoints Created

#### Authentication APIs
1. **POST** `/api/auth/register` - Register new user
2. **POST** `/api/auth/login` - Login user (returns JWT token)
3. **GET** `/api/auth/me` - Get current user info (protected)

#### Appeal APIs
1. **POST** `/api/appeals` - Create new appeal (protected)
2. **GET** `/api/appeals` - Get all appeals for logged-in user (protected)
3. **GET** `/api/appeals/:id` - Get single appeal by ID (protected)
4. **GET** `/api/appeals/admin/all` - Get all appeals (admin only)
5. **PUT** `/api/appeals/:id/status` - Update appeal status (admin only)

---

## 📦 What You Need to INSTALL

### 1. Node.js (Required)
- **Download:** https://nodejs.org/
- **Choose:** LTS version (recommended)
- **Verify:** Open terminal and type `node --version`
- **Should show:** v14.x.x or higher

### 2. MongoDB (Choose One Option)

#### Option A: Local MongoDB (Recommended for Learning)
- **Download:** https://www.mongodb.com/try/download/community
- **Install:** Follow installation wizard
- **Verify:** Open terminal and type `mongod --version`

#### Option B: MongoDB Atlas (Cloud - Free & Easier)
- **Sign up:** https://www.mongodb.com/cloud/atlas
- **Create:** Free cluster (M0 - Free tier)
- **Get:** Connection string from Atlas dashboard
- **No installation needed!**

### 3. npm (Comes with Node.js)
- Automatically installed with Node.js
- **Verify:** Type `npm --version`

---

## 🚀 How to RUN the Backend (Step by Step)

### Step 1: Open Terminal/Command Prompt
- **Windows:** Press `Win + R`, type `cmd`, press Enter
- **Mac:** Press `Cmd + Space`, type `Terminal`, press Enter

### Step 2: Navigate to Server Folder
```bash
cd "D:\Citizen Appeal System_Github\Traffic-and-Accident-Detection-System\server"
```

### Step 3: Install Dependencies
```bash
npm install
```
**Wait for:** "added X packages" message

### Step 4: Create Environment File

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

### Step 5: Configure Environment Variables

Open the `.env` file in a text editor and update:

**For Local MongoDB:**
```
MONGO_URI=mongodb://localhost:27017/citizen-appeal-system
```

**For MongoDB Atlas:**
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/citizen-appeal-system?retryWrites=true&w=majority
```
*(Replace with your actual Atlas connection string)*

**Change JWT Secret:**
```
JWT_SECRET=my-super-secret-key-change-this-12345
```
*(Use any random string - keep it secret!)*

### Step 6: Start MongoDB

**If using Local MongoDB:**

**Windows:**
- Open a NEW terminal window
- Type: `mongod`
- Keep this window open

**Mac/Linux:**
```bash
sudo systemctl start mongod
# OR
mongod
```

**If using MongoDB Atlas:** Skip this step! ✅

### Step 7: Start the Backend Server

**Development mode (auto-restarts on changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### Step 8: Verify It's Working

You should see:
```
MongoDB Connected: localhost:27017
Server running in development mode on port 5000
```

**Test in browser:**
- Open: http://localhost:5000/api/health
- Should see: `{"success":true,"message":"Server is running"}`

---

## 🧪 Testing the APIs

### Option 1: Using Postman
1. Download Postman: https://www.postman.com/downloads/
2. Create a new request
3. Test endpoints (see examples below)

### Option 2: Using Thunder Client (VS Code Extension)
1. Install "Thunder Client" extension in VS Code
2. Create requests directly in VS Code

### Example API Calls

#### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "nicNumber": "123456789V",
  "drivingLicense": "DL123456",
  "email": "john@example.com",
  "mobileNumber": "0771234567",
  "password": "password123"
}
```

#### 2. Login User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response will include a `token` - save this!**

#### 3. Create Appeal
```
POST http://localhost:5000/api/appeals
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data

violationId: "VIOL-001"
appealReason: "incorrect-speed-limit"
description: "The speed limit sign was not visible"
evidence: [upload file]
```

---

## 🔗 Connecting Frontend to Backend

### Update Your React Frontend

1. **Create API configuration file** (`src/config/api.js`):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export default API_BASE_URL;
```

2. **Update LoginPage.js** to call backend:
```javascript
import API_BASE_URL from '../config/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

3. **Update RegisterPage.js** similarly

4. **Update SubmitAppeal.js** to use FormData for file uploads

---

## 🆘 Troubleshooting

### Problem: "Cannot find module"
**Solution:** Run `npm install` again in the server folder

### Problem: "MongoDB connection error"
**Solutions:**
- Check if MongoDB is running (if local)
- Verify `MONGO_URI` in `.env` file
- For Atlas: Check your IP is whitelisted
- For Atlas: Verify username/password in connection string

### Problem: "Port 5000 already in use"
**Solution:** Change `PORT=5001` in `.env` file

### Problem: "EADDRINUSE: address already in use"
**Solution:** 
- Close other applications using port 5000
- Or change port in `.env`

### Problem: "JWT_SECRET is required"
**Solution:** Make sure `.env` file exists and has `JWT_SECRET` set

---

## 📚 Key Files Explained

- **server.js** - Main entry point, sets up Express server
- **models/User.js** - Defines user database schema
- **models/Appeal.js** - Defines appeal database schema
- **controllers/** - Contains business logic for each feature
- **routes/** - Defines API endpoints
- **middleware/auth.js** - Protects routes with JWT authentication
- **config/db.js** - Connects to MongoDB database

---

## ✅ Checklist

Before running, make sure:
- [ ] Node.js is installed
- [ ] MongoDB is installed/running OR Atlas account is set up
- [ ] `npm install` completed successfully
- [ ] `.env` file created and configured
- [ ] `uploads/` folder exists (already created)
- [ ] MongoDB is running (if using local)

---

## 🎉 You're All Set!

Your backend is ready to use. Start the server with `npm run dev` and begin testing!

For detailed information, see:
- **QUICK_START.md** - Fast setup guide
- **README.md** - Complete documentation

---

## 💡 Next Steps

1. ✅ Backend is ready
2. 🔄 Connect React frontend to backend APIs
3. 🧪 Test all endpoints
4. 🎨 Update frontend to use real API data
5. 🚀 Deploy when ready!

