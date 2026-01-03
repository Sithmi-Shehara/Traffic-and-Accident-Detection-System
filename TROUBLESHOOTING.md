# 🔧 Troubleshooting: "Network Error" When Registering

If you see "Network error. Please check if backend is running", follow these steps:

---

## ✅ Step 1: Check if Backend is Running

### What to check:
1. Look at your **Terminal 1** (where you ran `npm run dev`)
2. You should see: `Server running in development mode on port 5000`

### If you DON'T see this:
**The backend is NOT running!**

**Fix:**
1. Go to Terminal 1
2. Make sure you're in the `server` folder: `cd server`
3. Type: `npm run dev`
4. Wait for: "Server running on port 5000"

---

## ✅ Step 2: Check for Error Messages

Look at Terminal 1 for any RED error messages.

### Common Errors:

#### Error: "Cannot find module 'dotenv'"
**Fix:**
```bash
cd server
npm install
```

#### Error: "MongoDB connection error"
**Fix:**
- If using local MongoDB: Open new terminal and type `mongod`
- If using Atlas: Check your connection string in `server/.env`

#### Error: "EADDRINUSE: address already in use"
**Fix:**
- Port 5000 is already in use
- Close other programs using port 5000
- Or change port in `server/.env` to `PORT=5001`

---

## ✅ Step 3: Check if .env File Exists

### What to check:
1. In VS Code, look in the `server` folder
2. Do you see a file called `.env`?

### If you DON'T see `.env`:
**Fix:**
1. Open terminal
2. Type: `cd server`
3. Type: `copy .env.example .env` (Windows) or `cp .env.example .env` (Mac/Linux)
4. Open the `.env` file
5. Make sure it has:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/citizen-appeal-system
   JWT_SECRET=your-secret-key-here
   ```

---

## ✅ Step 4: Test Backend Directly

### Test if backend is working:
1. Open your browser
2. Go to: `http://localhost:5000/api/health`
3. You should see: `{"success":true,"message":"Server is running"}`

### If you see an error:
- Backend is NOT running correctly
- Check Terminal 1 for error messages
- Make sure MongoDB is running (if using local)

### If you see the success message:
- Backend IS working!
- The problem is with the frontend connection
- Continue to Step 5

---

## ✅ Step 5: Check Frontend API URL

### What to check:
1. Open `src/config/api.js` in VS Code
2. It should say: `http://localhost:5000/api`

### If it's different:
**Fix:** Change it to: `http://localhost:5000/api`

---

## ✅ Step 6: Check Browser Console

### What to do:
1. Open your browser
2. Press `F12` to open Developer Tools
3. Click the **Console** tab
4. Try to register again
5. Look for RED error messages

### Common errors you might see:

#### "Failed to fetch" or "NetworkError"
- Backend is not running
- Go back to Step 1

#### "CORS error"
- Backend CORS is not configured (but it should be)
- Check if backend is running

#### "404 Not Found"
- Backend URL is wrong
- Check `src/config/api.js`

---

## ✅ Step 7: Restart Everything

Sometimes a simple restart fixes everything:

### Step 7.1: Stop Backend
1. Go to Terminal 1 (backend)
2. Press `Ctrl + C` to stop it

### Step 7.2: Stop Frontend
1. Go to Terminal 2 (frontend)
2. Press `Ctrl + C` to stop it

### Step 7.3: Start Backend Again
1. Terminal 1: `cd server`
2. Terminal 1: `npm run dev`
3. Wait for: "Server running on port 5000"

### Step 7.4: Start Frontend Again
1. Terminal 2: `npm start`
2. Wait for: "Compiled successfully"

### Step 7.5: Try Registering Again
1. Go to: `http://localhost:3000/register`
2. Fill the form and submit

---

## 🎯 Quick Checklist

Before trying to register, make sure:

- [ ] Terminal 1 shows: "Server running on port 5000"
- [ ] Terminal 2 shows: "Compiled successfully"
- [ ] Browser shows: `http://localhost:3000`
- [ ] `http://localhost:5000/api/health` works in browser
- [ ] `.env` file exists in `server/` folder
- [ ] MongoDB is running (if using local) OR Atlas is configured

---

## 🆘 Still Not Working?

### Try these:

1. **Check if port 5000 is available:**
   - Close ALL terminals
   - Close VS Code
   - Restart VS Code
   - Try again

2. **Check Windows Firewall:**
   - Sometimes Windows blocks the connection
   - Try disabling firewall temporarily to test

3. **Check if backend dependencies are installed:**
   ```bash
   cd server
   npm install
   ```

4. **Check if frontend dependencies are installed:**
   ```bash
   npm install
   ```

---

## 📝 Common Solutions Summary

| Problem | Solution |
|---------|----------|
| Backend not running | `cd server` → `npm run dev` |
| Missing .env file | `copy .env.example .env` in server folder |
| MongoDB error | Start MongoDB or check Atlas connection |
| Port 5000 in use | Change PORT in .env or close other apps |
| Module not found | Run `npm install` in server folder |

---

## ✅ Success!

When it works, you should see:
- Registration form submits successfully
- You get redirected to login page
- No error messages in browser or terminal

Good luck! 🎉



