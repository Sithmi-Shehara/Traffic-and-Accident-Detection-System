# 📥 Simple Installation Guide for Beginners

This guide will help you install ONLY the software you need to run your backend.

---

## ✅ Software You Must Install

You need to install **2 things**:

1. **Node.js** (Required)
2. **MongoDB** (Choose one option)

---

## 1️⃣ Install Node.js

### What is it?
Node.js lets you run JavaScript on your computer (needed for the backend).

### Download Link
👉 **https://nodejs.org/**

### How to Install:
1. Click the link above
2. You'll see two green buttons - click the **LEFT one** that says **"LTS"** (it's recommended)
3. The file will download (something like `node-v20.x.x-x64.msi`)
4. Double-click the downloaded file
5. Click "Next" through all the steps (keep default settings)
6. Click "Install"
7. Wait for it to finish
8. Click "Finish"

### ✅ How to Check if Installation is Successful:

1. Open **VS Code**
2. In VS Code, click **Terminal** → **New Terminal** (or press `Ctrl + `` ` `)
3. Type this command and press Enter:
   ```bash
   node --version
   ```
4. You should see something like: `v20.11.0` (any version number is good!)
5. Also type this and press Enter:
   ```bash
   npm --version
   ```
6. You should see something like: `10.2.4` (any version number is good!)

**✅ If you see version numbers, Node.js is installed correctly!**

---

## 2️⃣ Install MongoDB

You have **2 options**. Choose the **EASIER one** (Option B - Cloud):

### Option A: Install MongoDB on Your Computer (Local)

#### What is it?
MongoDB is a database that stores your data on your computer.

#### Download Link
👉 **https://www.mongodb.com/try/download/community**

#### How to Install:
1. Click the link above
2. Select:
   - **Version:** Latest (or 7.0)
   - **Platform:** Windows (or your OS)
   - **Package:** MSI (Windows) or TGZ (Mac/Linux)
3. Click "Download"
4. Double-click the downloaded file
5. Click "Next" through the installation
6. **Important:** When asked, check "Install MongoDB as a Service" ✅
7. Click "Install"
8. Wait for it to finish
9. Click "Finish"

#### ✅ How to Check if Installation is Successful:

1. Open **VS Code Terminal** (Terminal → New Terminal)
2. Type this command and press Enter:
   ```bash
   mongod --version
   ```
3. You should see version information like: `db version v7.0.x`

**✅ If you see version info, MongoDB is installed correctly!**

---

### Option B: Use MongoDB Atlas (Cloud - FREE & EASIER) ⭐ RECOMMENDED

#### What is it?
MongoDB Atlas is MongoDB in the cloud. You don't need to install anything!

#### How to Set Up (5 minutes):

1. **Sign Up:**
   - Go to: **https://www.mongodb.com/cloud/atlas/register**
   - Click "Try Free"
   - Fill in your email and password
   - Click "Sign Up"

2. **Create a Free Cluster:**
   - After signing up, you'll see "Create a deployment"
   - Choose **"M0 FREE"** (it's free forever)
   - Click "Create"
   - Wait 1-2 minutes for it to create

3. **Create Database User:**
   - Click "Database Access" (left menu)
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin` (or any name)
   - Password: Create a strong password (save it!)
   - Click "Add User"

4. **Allow Network Access:**
   - Click "Network Access" (left menu)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String:**
   - Click "Database" (left menu)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/...`)
   - **Save this string!** You'll need it later

#### ✅ How to Check if Setup is Successful:

If you completed all 5 steps above and have your connection string, you're done! ✅

**No installation needed - it's all in the cloud!**

---

## 🎯 Quick Checklist

After installation, check these in VS Code Terminal:

- [ ] `node --version` → Shows version number ✅
- [ ] `npm --version` → Shows version number ✅
- [ ] MongoDB installed OR Atlas account created ✅

---

## 🆘 Troubleshooting

### "node is not recognized" or "npm is not recognized"
- **Solution:** Restart VS Code after installing Node.js
- If still not working, restart your computer

### "mongod is not recognized"
- **Solution:** Make sure you installed MongoDB (Option A)
- Or use MongoDB Atlas (Option B) - no installation needed!

### Can't find Terminal in VS Code?
- Press `Ctrl + `` ` ` (backtick key, usually above Tab)
- Or go to: **View** → **Terminal**

---

## ✅ You're Done!

Once you have:
- ✅ Node.js installed (checked with `node --version`)
- ✅ npm installed (checked with `npm --version`)
- ✅ MongoDB installed OR Atlas account set up

**You're ready to run the backend!** 🎉

Next step: Follow the **BACKEND_SETUP_GUIDE.md** to configure and run your backend.

---

## 📝 Summary

**What to Install:**
1. Node.js → https://nodejs.org/ (Click LTS button)
2. MongoDB → Choose one:
   - Local: https://www.mongodb.com/try/download/community
   - Cloud (Easier): https://www.mongodb.com/cloud/atlas/register

**How to Check:**
- Open VS Code Terminal (`Ctrl + `` ` `)
- Type: `node --version` (should show version)
- Type: `npm --version` (should show version)
- For MongoDB: `mongod --version` (if local) OR have Atlas connection string (if cloud)

That's it! 🎉

