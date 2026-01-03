# VS Code Setup Guide - Traffic and Accident Detection System

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ MongoDB installed or MongoDB Atlas account
- ✅ VS Code installed
- ✅ Git (optional, for version control)

---

## Step 1: Open Project in VS Code

### Option A: Open Existing Folder
1. Open VS Code
2. Click **File** → **Open Folder**
3. Navigate to your project folder:
   ```
   D:\Citizen Appeal System_Github\Traffic-and-Accident-Detection-System
   ```
4. Click **Select Folder**

### Option B: Open from Terminal
1. Open Command Prompt or PowerShell
2. Navigate to project folder:
   ```bash
   cd "D:\Citizen Appeal System_Github\Traffic-and-Accident-Detection-System"
   ```
3. Open in VS Code:
   ```bash
   code .
   ```

---

## Step 2: Install Dependencies

### Install Backend Dependencies

1. **Open Terminal in VS Code:**
   - Press `Ctrl + `` (backtick) or
   - Click **Terminal** → **New Terminal**

2. **Navigate to server folder:**
   ```bash
   cd server
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

   This installs:
   - express
   - mongoose
   - bcryptjs
   - jsonwebtoken
   - dotenv
   - cors
   - multer

### Install Frontend Dependencies

1. **Open a NEW terminal** (keep backend terminal open):
   - Click **Terminal** → **New Terminal** (or press `Ctrl + Shift + ``)

2. **Navigate to root folder:**
   ```bash
   cd ..
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

   This installs:
   - react
   - react-dom
   - react-router-dom
   - react-scripts

---

## Step 3: Configure Environment Variables

### Backend Configuration

1. **Navigate to server folder in VS Code:**
   - Open `server` folder in file explorer

2. **Create `.env` file:**
   - Right-click in `server` folder
   - Select **New File**
   - Name it: `.env`

3. **Add environment variables:**
   ```env
   # MongoDB Connection
   # For Local MongoDB:
   MONGO_URI=mongodb://localhost:27017/citizen-appeal-system
   
   # For MongoDB Atlas (Cloud):
   # MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/citizen-appeal-system?retryWrites=true&w=majority
   
   # JWT Secret (Change this to a random string!)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Server Port
   PORT=5000
   
   # Environment
   NODE_ENV=development
   ```

4. **Save the file** (`Ctrl + S`)

---

## Step 4: Set Up MongoDB

### Option A: Local MongoDB

1. **Start MongoDB service:**
   - Windows: Open Command Prompt as Administrator
   ```bash
   mongod
   ```
   - Or start MongoDB service from Services

2. **Verify MongoDB is running:**
   - Should see: `MongoDB Connected: localhost:27017`

### Option B: MongoDB Atlas (Cloud)

1. **Sign up at:** https://www.mongodb.com/cloud/atlas
2. **Create a free cluster**
3. **Get connection string**
4. **Update `.env` file** with Atlas connection string
5. **Whitelist your IP** in Atlas dashboard

---

## Step 5: Create Required Folders

1. **Create uploads folder:**
   - In VS Code, navigate to `server` folder
   - Right-click → **New Folder**
   - Name it: `uploads`

   Or use terminal:
   ```bash
   cd server
   mkdir uploads
   ```

---

## Step 6: Run the Application

### Terminal Setup

You need **TWO terminals** running simultaneously:

#### Terminal 1: Backend Server

1. **Open Terminal 1:**
   - Click **Terminal** → **New Terminal**
   - Or press `Ctrl + ``

2. **Navigate to server folder:**
   ```bash
   cd server
   ```

3. **Start backend:**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

4. **Expected output:**
   ```
   MongoDB Connected: localhost:27017
   Server running in development mode on port 5000
   ```

#### Terminal 2: Frontend Server

1. **Open Terminal 2:**
   - Click **Terminal** → **New Terminal** (or split terminal)
   - Or press `Ctrl + Shift + ``

2. **Navigate to root folder:**
   ```bash
   cd ..
   ```
   (or if already in root, skip this)

3. **Start frontend:**
   ```bash
   npm start
   ```

4. **Expected output:**
   ```
   Compiled successfully!
   
   You can now view citizen-appeal-system in the browser.
   
   Local:            http://localhost:3000
   On Your Network:  http://192.168.x.x:3000
   ```

---

## Step 7: Verify Everything Works

### Test Backend

1. **Open browser:**
   - Go to: `http://localhost:5000/api/health`

2. **Expected response:**
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

### Test Frontend

1. **Open browser:**
   - Go to: `http://localhost:3000`

2. **Expected:**
   - Landing page loads
   - No console errors

---

## Step 8: VS Code Extensions (Recommended)

Install these helpful extensions:

1. **ES7+ React/Redux/React-Native snippets**
   - Extension ID: `dsznajder.es7-react-js-snippets`

2. **Prettier - Code formatter**
   - Extension ID: `esbenp.prettier-vscode`

3. **ESLint**
   - Extension ID: `dbaeumer.vscode-eslint`

4. **MongoDB for VS Code**
   - Extension ID: `mongodb.mongodb-vscode`

5. **Thunder Client** (API testing)
   - Extension ID: `rangav.vscode-thunder-client`

### How to Install Extensions:

1. Click **Extensions** icon (left sidebar) or press `Ctrl + Shift + X`
2. Search for extension name
3. Click **Install**

---

## Step 9: Configure VS Code Settings (Optional)

### Create `.vscode/settings.json`

1. **Create `.vscode` folder** in project root
2. **Create `settings.json` file:**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "files.exclude": {
       "**/node_modules": true,
       "**/.git": true
     }
   }
   ```

---

## Step 10: Running the Complete System

### Quick Start Script

Create a script to run both servers:

1. **Create `start.bat` (Windows):**
   ```batch
   @echo off
   echo Starting Backend Server...
   start "Backend" cmd /k "cd server && npm run dev"
   timeout /t 3
   echo Starting Frontend Server...
   start "Frontend" cmd /k "npm start"
   echo Both servers starting...
   pause
   ```

2. **Double-click `start.bat`** to start both servers

### Manual Start (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

---

## Troubleshooting

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Change `PORT` in `server/.env` to different port (e.g., `5001`)
2. Update `src/config/api.js` to match:
   ```javascript
   const API_BASE_URL = 'http://localhost:5001/api';
   ```

### MongoDB Connection Error

**Error:** `MongoDB connection failed`

**Solutions:**
1. **Check if MongoDB is running:**
   ```bash
   mongod --version
   ```

2. **Check connection string in `.env`**

3. **For Atlas:** Check IP whitelist

### Module Not Found

**Error:** `Cannot find module 'xxx'`

**Solution:**
```bash
# Backend
cd server
npm install

# Frontend
cd ..
npm install
```

### CORS Error

**Error:** `CORS policy blocked`

**Solution:**
- Backend already has CORS enabled
- Check if backend is running on correct port
- Verify API_BASE_URL in frontend

---

## VS Code Tips

### 1. **Split Terminal**
- Right-click terminal tab → **Split Terminal**
- Or press `Ctrl + \`

### 2. **Multiple Terminals**
- Click **+** button in terminal panel
- Or press `Ctrl + Shift + ``

### 3. **Integrated Terminal**
- Press `` Ctrl + `` `` to toggle terminal
- Press `Ctrl + J` to toggle bottom panel

### 4. **File Explorer**
- Press `Ctrl + Shift + E` to focus file explorer
- Right-click files for context menu

### 5. **Search**
- Press `Ctrl + Shift + F` for global search
- Press `Ctrl + F` for file search

---

## Project Structure in VS Code

```
Traffic-and-Accident-Detection-System/
├── server/                    # Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── .env                   # Environment variables
│   └── server.js              # Main server file
├── src/                       # Frontend
│   ├── components/
│   ├── pages/
│   ├── config/
│   └── utils/
├── public/
├── package.json
└── README.md
```

---

## Next Steps

1. ✅ Backend and Frontend are running
2. ✅ Test registration: `http://localhost:3000/register`
3. ✅ Test login: `http://localhost:3000/login`
4. ✅ Test appeal submission: `http://localhost:3000/submit-appeal`
5. ✅ Test admin dashboard: `http://localhost:3000/admin/dashboard`

---

## Summary

**To run the system:**

1. **Terminal 1:**
   ```bash
   cd server
   npm run dev
   ```

2. **Terminal 2:**
   ```bash
   npm start
   ```

3. **Open browser:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api/health`

**Both servers must be running simultaneously!**

---

## Need Help?

- Check `TROUBLESHOOTING.md` for common issues
- Check `server/README.md` for backend details
- Check `CONNECT_FRONTEND_BACKEND.md` for connection setup


