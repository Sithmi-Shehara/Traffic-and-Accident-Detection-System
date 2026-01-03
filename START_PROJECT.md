# 🚀 How to Start Your Project (Simple Steps)

Follow these steps **in order** to see your frontend and connect it to the backend.

---

## 📋 Step 1: Start Backend (Terminal 1)

### What to do:
1. Open **VS Code**
2. Press `Ctrl + `` ` ` (backtick key) to open terminal
3. Type these commands **one by one**:

```bash
cd server
```

```bash
npm run dev
```

### ✅ What you should see:
```
MongoDB Connected: localhost:27017
Server running in development mode on port 5000
```

**✅ Backend is running!** Keep this terminal open.

---

## 📋 Step 2: Start Frontend (Terminal 2)

### What to do:
1. In VS Code, click **Terminal** → **New Terminal** (to open a second terminal)
2. Type this command:

```bash
npm start
```

### ✅ What you should see:
```
Compiled successfully!
You can now view citizen-appeal-system in the browser.
  Local:            http://localhost:3000
```

**✅ Frontend is running!** Your browser should open automatically.

---

## 📋 Step 3: Check Both Are Running

You should have **2 terminals open**:

**Terminal 1 (Backend):**
- Shows: "Server running on port 5000"

**Terminal 2 (Frontend):**
- Shows: "Compiled successfully"
- Browser opens to: `http://localhost:3000`

**✅ Both are running!**

---

## 📋 Step 4: Test It Works

### Test Backend:
1. Open browser
2. Go to: `http://localhost:5000/api/health`
3. You should see: `{"success":true,"message":"Server is running"}`

### Test Frontend:
1. Your browser should already be at: `http://localhost:3000`
2. You should see your landing page

**✅ Everything is working!**

---

## 🧪 Step 5: Try Registration

1. Go to: `http://localhost:3000/register`
2. Fill in the form:
   - Full Name: Test User
   - NIC Number: 123456789V
   - Driving License: DL123456
   - Email: test@example.com
   - Mobile Number: 0771234567
   - Password: password123
   - Confirm Password: password123
3. Click "Register"

**What happens:**
- Data goes to backend
- Backend saves to MongoDB
- You get redirected to login page

---

## 🧪 Step 6: Try Login

1. Go to: `http://localhost:3000/login`
2. Enter:
   - **Email:** test@example.com (use email, not username!)
   - **Password:** password123
3. Click "Login"

**What happens:**
- Frontend sends login to backend
- Backend checks MongoDB
- You get a token and redirected to dashboard

---

## 🆘 Common Problems

### Problem: "Cannot find module"
**Fix:** In Terminal 1, type: `cd server` then `npm install`

### Problem: "Port 5000 already in use"
**Fix:** Close other programs using port 5000, or change port in `server/.env`

### Problem: "Port 3000 already in use"
**Fix:** Close other React apps, or press `Y` when asked to use different port

### Problem: "MongoDB connection error"
**Fix:** 
- If using local MongoDB: Open new terminal and type `mongod`
- If using Atlas: Check your connection string in `server/.env`

### Problem: Frontend shows blank page
**Fix:** 
- Check Terminal 2 for errors
- Refresh the page (F5)
- Make sure you're at `http://localhost:3000`

---

## ✅ Quick Checklist

Before testing:
- [ ] Backend terminal shows "Server running on port 5000"
- [ ] Frontend terminal shows "Compiled successfully"
- [ ] Browser is open to `http://localhost:3000`
- [ ] MongoDB is running (if using local) OR Atlas is set up

---

## 📝 Remember

**Always start in this order:**
1. ✅ Backend first (`cd server` → `npm run dev`)
2. ✅ Frontend second (`npm start`)

**Keep both terminals open!**

---

## 🎉 You're Done!

Your frontend and backend are connected! Try registering and logging in to see it work with MongoDB.

**Need help?** Check `CONNECT_FRONTEND_BACKEND.md` for detailed troubleshooting.

