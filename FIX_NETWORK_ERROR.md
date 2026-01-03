# 🔧 Fix: Network Error When Registering

## 🎯 The Problem

You're seeing: **"Network error. Please check if backend is running"**

This means your frontend can't connect to your backend.

---

## ✅ Solution: Step-by-Step Fix

### Step 1: Check if Backend is Running

**Look at Terminal 1** (where you ran `npm run dev`)

**You should see:**
```
MongoDB Connected: localhost:27017
Server running in development mode on port 5000
```

**If you DON'T see this:**
1. Go to Terminal 1
2. Type: `cd server`
3. Type: `npm run dev`
4. Wait for the message above

---

### Step 2: Test Backend in Browser

1. Open your browser
2. Go to: **http://localhost:5000/api/health**
3. **What happens?**

**✅ If you see:** `{"success":true,"message":"Server is running"}`
- Backend is working! Continue to Step 3

**❌ If you see:** "This site can't be reached" or error
- Backend is NOT running
- Go back to Step 1
- Check Terminal 1 for error messages

---

### Step 3: Check .env File

I just created the `.env` file for you! But you need to configure it:

1. In VS Code, open `server/.env`
2. **If using Local MongoDB:**
   - Keep: `MONGO_URI=mongodb://localhost:27017/citizen-appeal-system`
   - Make sure MongoDB is running (type `mongod` in new terminal)

3. **If using MongoDB Atlas (Cloud):**
   - Replace the MONGO_URI line with your Atlas connection string
   - Example: `MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/citizen-appeal-system`

4. **Change JWT_SECRET:**
   - Change `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345`
   - To any random string, like: `JWT_SECRET=my-secret-key-12345`

5. **Save the file** (Ctrl + S)

---

### Step 4: Restart Backend

After changing `.env`, you MUST restart the backend:

1. In Terminal 1, press **Ctrl + C** to stop backend
2. Type: `npm run dev` again
3. Wait for: "Server running on port 5000"

---

### Step 5: Try Registering Again

1. Go to: **http://localhost:3000/register**
2. Fill in the form
3. Click "Register"

**It should work now!** ✅

---

## 🆘 Still Getting Error?

### Check These:

1. **Backend Terminal Shows Errors?**
   - Look for RED text in Terminal 1
   - Common: "MongoDB connection error"
   - Fix: Start MongoDB or check Atlas connection

2. **Port 5000 Already in Use?**
   - Error: "EADDRINUSE"
   - Fix: Close other programs or change PORT in `.env` to `5001`

3. **Missing Dependencies?**
   - Error: "Cannot find module"
   - Fix: In Terminal 1, type: `cd server` then `npm install`

4. **Browser Console Errors?**
   - Press F12 in browser
   - Click "Console" tab
   - Look for red errors
   - Share the error message

---

## ✅ Quick Checklist

Before trying to register:

- [ ] Terminal 1: "Server running on port 5000" ✅
- [ ] Browser: `http://localhost:5000/api/health` works ✅
- [ ] `.env` file exists in `server/` folder ✅
- [ ] MongoDB is running (if local) OR Atlas is configured ✅
- [ ] Frontend is running on `http://localhost:3000` ✅

---

## 📝 What I Just Did

I created the `.env` file for you in the `server/` folder. Now you need to:

1. ✅ Open `server/.env` in VS Code
2. ✅ Update `MONGO_URI` (if using Atlas)
3. ✅ Update `JWT_SECRET` to any random string
4. ✅ Save the file
5. ✅ Restart backend (Ctrl + C, then `npm run dev`)

---

## 🎯 Most Likely Issue

**The backend is probably not running!**

**Fix:**
1. Open Terminal 1
2. Make sure you're in `server` folder: `cd server`
3. Type: `npm run dev`
4. Wait for: "Server running on port 5000"
5. Try registering again

---

**Try these steps and let me know what happens!** 🚀



