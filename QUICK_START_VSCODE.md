# Quick Start Guide - VS Code

## 🚀 Fast Setup (5 Minutes)

### Step 1: Open Project
```bash
# In VS Code terminal or Command Prompt
cd "D:\Citizen Appeal System_Github\Traffic-and-Accident-Detection-System"
code .
```

### Step 2: Install Dependencies

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
# In new terminal (Ctrl + Shift + `)
npm install
```

### Step 3: Configure Environment

Create `server/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/citizen-appeal-system
JWT_SECRET=your-secret-key-change-this
PORT=5000
NODE_ENV=development
```

### Step 4: Start MongoDB
```bash
# If using local MongoDB
mongod
```

### Step 5: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### Step 6: Open Browser
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

---

## ✅ Verify It's Working

1. **Backend Health Check:**
   - Open: http://localhost:5000/api/health
   - Should see: `{"success":true,"message":"Server is running"}`

2. **Frontend:**
   - Open: http://localhost:3000
   - Should see landing page

---

## 📋 Complete Flow Test

### 1. Register a Citizen
- Go to: http://localhost:3000/register
- Fill form and submit
- Should redirect to login

### 2. Login as Citizen
- Go to: http://localhost:3000/login
- Login with registered credentials
- Should redirect to dashboard

### 3. Submit an Appeal
- Go to: http://localhost:3000/submit-appeal
- Fill form (violation ID, reason, description)
- Upload evidence if required
- Submit appeal

### 4. Create Admin Account
- Register another user
- Manually change role to "admin" in MongoDB:
  ```javascript
  db.users.updateOne(
    { email: "admin@example.com" },
    { $set: { role: "admin" } }
  )
  ```

### 5. Login as Admin
- Login with admin credentials
- Go to: http://localhost:3000/admin/dashboard
- Should see all appeals including the one you just submitted

---

## 🔍 How Appeals Appear on Admin Dashboard

### Step-by-Step Flow:

1. **Citizen Submits Appeal**
   - Frontend: `POST /api/appeals`
   - Backend saves to MongoDB with status: `"pending"`

2. **Admin Opens Dashboard**
   - Frontend: `GET /api/appeals/admin/statistics` (for stats)
   - Frontend: `GET /api/appeals/admin/all` (for appeals list)

3. **Backend Returns Appeals**
   - Queries MongoDB for all appeals
   - Filters by status if requested
   - Populates user information
   - Returns JSON response

4. **Frontend Displays**
   - Shows statistics (total, pending, approved, rejected)
   - Lists all appeals with details
   - Allows filtering by status
   - Click appeal to review

5. **Admin Reviews**
   - Click "Review" button
   - Navigate to review page
   - View full details and evidence
   - Update status (approve/reject)

---

## 🛠️ VS Code Tips

### Multiple Terminals
- **Split Terminal:** Right-click terminal tab → Split Terminal
- **New Terminal:** Click `+` button or `Ctrl + Shift + ``

### Useful Extensions
- **ES7+ React snippets** - Code snippets
- **Prettier** - Code formatting
- **Thunder Client** - API testing
- **MongoDB for VS Code** - Database management

### Keyboard Shortcuts
- `Ctrl + `` - Toggle terminal
- `Ctrl + Shift + E` - Focus file explorer
- `Ctrl + P` - Quick file open
- `Ctrl + F` - Search in file
- `Ctrl + Shift + F` - Search in all files

---

## 🐛 Common Issues

### Port Already in Use
```bash
# Change port in server/.env
PORT=5001

# Update frontend src/config/api.js
const API_BASE_URL = 'http://localhost:5001/api';
```

### MongoDB Not Running
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in .env
```

### Module Not Found
```bash
# Reinstall dependencies
cd server && npm install
cd .. && npm install
```

### CORS Error
- Check if backend is running
- Verify API_BASE_URL in frontend
- Check backend CORS settings (already enabled)

---

## 📚 Documentation Files

- `APPEAL_FLOW_EXPLANATION.md` - Detailed flow explanation
- `VSCODE_SETUP_GUIDE.md` - Complete setup guide
- `server/API_REFERENCE.md` - API documentation
- `server/REAL_WORLD_UPGRADES.md` - Backend upgrades

---

## 🎯 Next Steps

1. ✅ System is running
2. ✅ Test citizen registration and appeal submission
3. ✅ Test admin dashboard
4. ✅ Review appeal and update status
5. ✅ Check notifications

---

**Both servers must be running simultaneously!**

Backend: `http://localhost:5000`
Frontend: `http://localhost:3000`


