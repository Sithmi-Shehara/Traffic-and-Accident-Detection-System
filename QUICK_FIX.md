# 🚨 Quick Fix: Network Error When Registering

## ⚡ Fast Solution (Try This First!)

### Step 1: Check Backend Terminal

Look at the terminal where you ran `npm run dev` (Terminal 1).

**Do you see this?**
```
Server running in development mode on port 5000
```

**If NO:**
1. Go to that terminal
2. Type: `cd server`
3. Type: `npm run dev`
4. Wait for the message above

---

### Step 2: Test Backend in Browser

1. Open your browser
2. Go to: `http://localhost:5000/api/health`
3. **What do you see?**

**If you see:** `{"success":true,"message":"Server is running"}`
- ✅ Backend is working!
- Problem is somewhere else (see Step 3)

**If you see:** "This site can't be reached" or "ERR_CONNECTION_REFUSED"
- ❌ Backend is NOT running!
- Go back to Step 1

---

### Step 3: Check .env File

1. In VS Code, open the `server` folder
2. Do you see a file called `.env`?

**If NO:**
1. Open terminal
2. Type: `cd server`
3. Type: `copy .env.example .env`
4. Open the `.env` file
5. Make sure it looks like this:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/citizen-appeal-system
JWT_SECRET=my-secret-key-12345
```

**If using MongoDB Atlas:**
- Replace `MONGO_URI` with your Atlas connection string

---

### Step 4: Restart Everything

1. **Stop Backend:** In Terminal 1, press `Ctrl + C`
2. **Stop Frontend:** In Terminal 2, press `Ctrl + C`
3. **Start Backend:** Terminal 1 → `cd server` → `npm run dev`
4. **Start Frontend:** Terminal 2 → `npm start`
5. **Try registering again**

---

## 🎯 Most Common Issues

### Issue 1: Backend Not Started
**Symptom:** "Network error" message
**Fix:** Make sure you see "Server running on port 5000" in terminal

### Issue 2: Missing .env File
**Symptom:** Backend crashes or won't start
**Fix:** Create `.env` file from `.env.example`

### Issue 3: MongoDB Not Running
**Symptom:** Backend shows "MongoDB connection error"
**Fix:** 
- Local MongoDB: Run `mongod` in new terminal
- Atlas: Check connection string in `.env`

### Issue 4: Wrong Port
**Symptom:** Backend runs on different port
**Fix:** Check `PORT=5000` in `server/.env` file

---

## ✅ Success Checklist

Before trying to register, verify:

- [ ] Terminal 1: "Server running on port 5000" ✅
- [ ] Terminal 2: "Compiled successfully" ✅
- [ ] Browser: `http://localhost:5000/api/health` works ✅
- [ ] `.env` file exists in `server/` folder ✅
- [ ] MongoDB is running (if local) OR Atlas is configured ✅

---

## 🆘 Still Not Working?

1. **Check browser console:**
   - Press `F12`
   - Click "Console" tab
   - Look for red error messages
   - Try registering again
   - Copy the error message

2. **Check backend terminal:**
   - Look for any red error messages
   - Copy the error message

3. **Share the error messages** and I'll help you fix it!

---

## 📝 Quick Commands Reference

```bash
# Start Backend
cd server
npm run dev

# Start Frontend (in different terminal)
npm start

# Test Backend
# Open browser: http://localhost:5000/api/health

# Create .env file (if missing)
cd server
copy .env.example .env
```

---

**Remember:** Backend MUST be running before frontend can connect to it! 🚀



