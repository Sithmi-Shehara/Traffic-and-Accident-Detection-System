# 🚀 Quick Start Guide

## Step-by-Step Setup (5 Minutes)

### 1️⃣ Install Prerequisites

**Node.js:**
- Download from: https://nodejs.org/ (Choose LTS version)
- Verify installation: Open terminal and type `node --version`

**MongoDB:**
- **Option A - Local:** Download from https://www.mongodb.com/try/download/community
- **Option B - Cloud (Easier):** Sign up free at https://www.mongodb.com/cloud/atlas

### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

### 3️⃣ Configure Environment

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

**Edit `.env` file:**
- For **Local MongoDB:** Keep `MONGO_URI=mongodb://localhost:27017/citizen-appeal-system`
- For **MongoDB Atlas:** Replace with your connection string
- Change `JWT_SECRET` to any random string (e.g., `my-secret-key-123`)

### 4️⃣ Start MongoDB

**If using Local MongoDB:**
- **Windows:** Open new terminal and run `mongod`
- **Mac/Linux:** Run `sudo systemctl start mongod` or `mongod`

**If using MongoDB Atlas:** Skip this step!

### 5️⃣ Start Backend Server

```bash
npm run dev
```

You should see:
```
MongoDB Connected: ...
Server running in development mode on port 5000
```

### 6️⃣ Test It Works

Open browser: http://localhost:5000/api/health

You should see: `{"success":true,"message":"Server is running"}`

## ✅ Done!

Your backend is now running on **http://localhost:5000**

## 📝 Next: Connect Frontend

Update your React frontend to call:
- `http://localhost:5000/api/auth/register`
- `http://localhost:5000/api/auth/login`
- `http://localhost:5000/api/appeals`

## 🆘 Having Issues?

1. **Port 5000 already in use?** Change `PORT=5001` in `.env`
2. **MongoDB connection error?** Check your `MONGO_URI` in `.env`
3. **Module not found?** Run `npm install` again

See `README.md` for detailed troubleshooting.

