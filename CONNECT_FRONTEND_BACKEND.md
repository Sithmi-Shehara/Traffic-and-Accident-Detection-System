# 🔗 Connect Frontend and Backend - Step by Step Guide

This guide will help you:
1. Start your frontend (React app)
2. Start your backend (Node.js server)
3. Connect them together
4. Make them work with MongoDB

---

## 📋 Step 1: Start the Backend Server

### 1.1 Open VS Code Terminal

1. In VS Code, press `Ctrl + `` ` ` (backtick key) to open terminal
2. Or click: **Terminal** → **New Terminal**

### 1.2 Navigate to Server Folder

In the terminal, type:
```bash
cd server
```

### 1.3 Check if .env file exists

Type:
```bash
dir .env
```

**If you see "File not found":**
1. Type: `copy .env.example .env`
2. Open the `.env` file in VS Code
3. Update `MONGO_URI` with your MongoDB connection string
4. Update `JWT_SECRET` to any random string

### 1.4 Start MongoDB (if using local MongoDB)

**Open a NEW terminal** (Terminal → New Terminal) and type:
```bash
mongod
```
**Keep this terminal open!** (Don't close it)

**If using MongoDB Atlas (cloud):** Skip this step! ✅

### 1.5 Start the Backend

Go back to the first terminal (where you typed `cd server`), and type:
```bash
npm run dev
```

**You should see:**
```
MongoDB Connected: localhost:27017
Server running in development mode on port 5000
```

**✅ Backend is running!** Keep this terminal open.

---

## 📋 Step 2: Start the Frontend (React App)

### 2.1 Open a NEW Terminal

1. Click **Terminal** → **New Terminal** (or press `Ctrl + Shift + `` ` `)
2. **Important:** This should be a different terminal from the backend

### 2.2 Navigate to Project Root

In the NEW terminal, type:
```bash
cd ..
```

This takes you back to the main project folder.

### 2.3 Start the Frontend

Type:
```bash
npm start
```

**You should see:**
```
Compiled successfully!
You can now view citizen-appeal-system in the browser.
  Local:            http://localhost:3000
```

**✅ Frontend is running!** Your browser should open automatically to `http://localhost:3000`

---

## 📋 Step 3: Verify Both Are Running

You should now have **2 terminals open**:

**Terminal 1 (Backend):**
```
Server running in development mode on port 5000
```

**Terminal 2 (Frontend):**
```
Compiled successfully!
Local: http://localhost:3000
```

**✅ Both are running!**

---

## 📋 Step 4: Test the Connection

### 4.1 Test Backend

Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{"success":true,"message":"Server is running"}
```

### 4.2 Test Frontend

Your frontend should be at:
```
http://localhost:3000
```

You should see your landing page.

---

## 📋 Step 5: Connect Frontend to Backend

The code has been updated for you! Here's what was changed:

### What Was Updated:

1. ✅ Created `src/config/api.js` - API configuration
2. ✅ Created `src/utils/auth.js` - Helper functions for authentication
3. ✅ Updated `LoginPage.js` - Now connects to backend
4. ✅ Updated `RegisterPage.js` - Now connects to backend
5. ✅ Updated `SubmitAppeal.js` - Now connects to backend

### How It Works:

- **Frontend** (React) runs on `http://localhost:3000`
- **Backend** (Node.js) runs on `http://localhost:5000`
- **MongoDB** stores all your data
- When you register/login, frontend sends data to backend
- Backend saves data to MongoDB
- Backend sends response back to frontend

---

## 🧪 Step 6: Test Registration

1. Go to: `http://localhost:3000/register`
2. Fill in the form:
   - Full Name: John Doe
   - NIC Number: 123456789V
   - Driving License: DL123456
   - Email: john@example.com
   - Mobile Number: 0771234567
   - Password: password123
   - Confirm Password: password123
3. Click "Register"

**What should happen:**
- Form submits to backend
- Backend saves user to MongoDB
- You get redirected to login page
- Check backend terminal - you should see the request

---

## 🧪 Step 7: Test Login

1. Go to: `http://localhost:3000/login`
2. Enter:
   - Email: john@example.com (use email, not username!)
   - Password: password123
3. Click "Login"

**What should happen:**
- Frontend sends login request to backend
- Backend checks MongoDB for user
- Backend returns a token
- Token is saved in browser
- You get redirected to dashboard

---

## 🧪 Step 8: Test Appeal Submission

1. Make sure you're logged in
2. Go to: `http://localhost:3000/submit-appeal`
3. Fill in the form:
   - Violation ID: VIOL-001
   - Appeal Reason: Select one
   - Description: Test appeal
   - Upload a file (optional)
4. Check the declaration checkbox
5. Click "Submit Appeal"

**What should happen:**
- Appeal is sent to backend
- Backend saves appeal to MongoDB
- You get redirected to dashboard

---

## 🆘 Troubleshooting

### Problem: "Cannot GET /"
**Solution:** Make sure backend is running on port 5000

### Problem: "Network Error" or "Failed to fetch"
**Solutions:**
- Check if backend is running (Terminal 1)
- Check if backend shows: "Server running on port 5000"
- Make sure you're using `http://localhost:5000` (not https)

### Problem: "MongoDB connection error"
**Solutions:**
- If using local MongoDB: Make sure `mongod` is running
- If using Atlas: Check your connection string in `.env` file
- Check backend terminal for error messages

### Problem: Frontend shows blank page
**Solution:**
- Check frontend terminal for errors
- Make sure you're at `http://localhost:3000`
- Try refreshing the page

### Problem: "Port 3000 already in use"
**Solution:**
- Close other React apps
- Or change port: Create `.env` file in project root with `PORT=3001`

### Problem: "Port 5000 already in use"
**Solution:**
- Close other Node.js apps
- Or change port in `server/.env` file: `PORT=5001`
- Then update `src/config/api.js` to use port 5001

---

## ✅ Checklist

Before testing, make sure:
- [ ] Backend is running (Terminal 1 shows "Server running on port 5000")
- [ ] Frontend is running (Terminal 2 shows "Compiled successfully")
- [ ] MongoDB is running (if using local) OR Atlas connection is set up
- [ ] `.env` file exists in `server/` folder
- [ ] Browser is open to `http://localhost:3000`

---

## 🎯 Summary

**What You Need Running:**
1. ✅ Backend server (`npm run dev` in server folder)
2. ✅ Frontend React app (`npm start` in project root)
3. ✅ MongoDB (local `mongod` OR Atlas cloud)

**How They Connect:**
- Frontend (port 3000) → Calls → Backend (port 5000) → Saves to → MongoDB

**Files Updated:**
- `src/config/api.js` - Backend URL
- `src/utils/auth.js` - Authentication helpers
- `src/pages/LoginPage.js` - Login API call
- `src/pages/RegisterPage.js` - Register API call
- `src/pages/SubmitAppeal.js` - Appeal API call

---

## 🎉 You're Done!

Your frontend and backend are now connected! Try registering a user and see the data save to MongoDB.

**Next Steps:**
- Test all the features
- Check MongoDB to see your data
- Update other pages to use real API data

---

## 💡 Tips

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check terminal output** - Errors will show there
3. **Use browser console** - Press F12 to see frontend errors
4. **Check Network tab** - In browser DevTools, see API calls

---

## 📝 Quick Reference

**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
npm start
```

**Backend URL:** `http://localhost:5000`
**Frontend URL:** `http://localhost:3000`

