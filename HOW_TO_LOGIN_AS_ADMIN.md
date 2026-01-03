# How to Login as Admin - Step-by-Step Guide

## Problem
You cannot see the admin dashboard because:
1. Admin accounts are not created through the registration form (default role is "citizen")
2. Login page redirects all users to citizen dashboard
3. You need to manually create an admin account or change an existing user's role

---

## Solution: Three Methods to Create Admin Account

### Method 1: Create Admin via MongoDB (Easiest) ⭐ RECOMMENDED

#### Step 1: Register a Regular User
1. Go to: http://localhost:3000/register
2. Fill in the registration form:
   - Full Name: Admin User
   - NIC Number: 123456789V
   - Driving License: DL123456
   - Email: admin@example.com
   - Mobile Number: 0771234567
   - Password: admin123
3. Click "Register"
4. Note: You'll be redirected to login page

#### Step 2: Connect to MongoDB

**Option A: Using MongoDB Compass (GUI)**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `citizen-appeal-system`
4. Go to `users` collection
5. Find the user you just created (search by email: `admin@example.com`)
6. Click on the document
7. Click "Edit Document"
8. Find the `role` field
9. Change value from `"citizen"` to `"admin"`
10. Click "Update"

**Option B: Using MongoDB Shell (Command Line)**
1. Open Command Prompt or Terminal
2. Connect to MongoDB:
   ```bash
   mongo
   ```
   Or if using newer MongoDB:
   ```bash
   mongosh
   ```
3. Select database:
   ```javascript
   use citizen-appeal-system
   ```
4. Update user role:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```
5. Verify the change:
   ```javascript
   db.users.findOne({ email: "admin@example.com" })
   ```
   Should show: `"role": "admin"`

**Option C: Using VS Code MongoDB Extension**
1. Install "MongoDB for VS Code" extension
2. Connect to MongoDB
3. Navigate to `citizen-appeal-system` → `users`
4. Find user document
5. Edit `role` field to `"admin"`
6. Save

---

### Method 2: Create Admin via Registration Script

Create a script to register an admin directly:

#### Step 1: Create Script File
Create `server/scripts/createAdmin.js`:

```javascript
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists. Updating role...');
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin role updated successfully!');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      fullName: 'Admin User',
      nicNumber: '123456789V',
      drivingLicense: 'DL123456',
      email: 'admin@example.com',
      mobileNumber: '0771234567',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Admin created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
```

#### Step 2: Run the Script
```bash
cd server
node scripts/createAdmin.js
```

---

### Method 3: Create Admin via API (Using Postman/Thunder Client)

#### Step 1: Register User First
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "Admin User",
  "nicNumber": "123456789V",
  "drivingLicense": "DL123456",
  "email": "admin@example.com",
  "mobileNumber": "0771234567",
  "password": "admin123"
}
```

#### Step 2: Update Role via MongoDB (same as Method 1, Step 2)

---

## Step 3: Login as Admin

### After Creating Admin Account:

1. **Go to Login Page:**
   - Open: http://localhost:3000/login

2. **Enter Credentials:**
   - Email: `admin@example.com`
   - Password: `admin123` (or the password you set)

3. **Click "Login"**

4. **You Should Be Redirected:**
   - ✅ If you're admin → `/admin/dashboard`
   - ✅ If you're citizen → `/dashboard`

---

## Step 4: Access Admin Dashboard

### Direct URL Access:
- http://localhost:3000/admin/dashboard

### From Navigation:
- After login, you should see "Dashboard" link in header
- Click it to go to admin dashboard

---

## Troubleshooting

### Issue 1: Still Redirected to Citizen Dashboard

**Problem:** Login page doesn't check user role

**Solution:** The login page has been updated to check role. Make sure:
1. You've updated `src/pages/LoginPage.js` (already done)
2. Restart frontend server:
   ```bash
   # Stop frontend (Ctrl + C)
   npm start
   ```

### Issue 2: "Access denied. Admin privileges required."

**Problem:** User role is not "admin" in database

**Solution:**
1. Verify role in MongoDB:
   ```javascript
   db.users.findOne({ email: "admin@example.com" })
   ```
2. Should show: `"role": "admin"`
3. If not, update it (see Method 1)

### Issue 3: Cannot Find User in MongoDB

**Problem:** User not created or wrong database

**Solution:**
1. Check database name in `.env`: `MONGO_URI=mongodb://localhost:27017/citizen-appeal-system`
2. List all users:
   ```javascript
   db.users.find().pretty()
   ```
3. Check if user exists with different email

### Issue 4: Admin Dashboard Shows "Access denied"

**Problem:** Backend API requires admin role

**Solution:**
1. Check browser console for errors
2. Verify JWT token is valid
3. Check backend logs for error messages
4. Verify user role in database is exactly `"admin"` (lowercase)

### Issue 5: Dashboard is Empty

**Problem:** No appeals in database yet

**Solution:**
1. This is normal if no appeals have been submitted
2. Create a test appeal as a citizen first
3. Then login as admin to see it

---

## Quick Verification Checklist

- [ ] User exists in MongoDB `users` collection
- [ ] User `role` field is set to `"admin"` (lowercase, in quotes)
- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 3000
- [ ] You can login successfully
- [ ] After login, you're redirected to `/admin/dashboard`
- [ ] Admin dashboard loads without errors

---

## Testing Admin Access

### Test 1: Login and Check Redirect
1. Login with admin credentials
2. Should redirect to `/admin/dashboard` (not `/dashboard`)
3. URL should show: `http://localhost:3000/admin/dashboard`

### Test 2: Access Admin API
1. Get your JWT token from browser localStorage
2. Test API endpoint:
   ```bash
   curl http://localhost:5000/api/appeals/admin/all \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```
3. Should return appeals list (or empty array if no appeals)

### Test 3: Check User Role
1. After login, check browser console
2. Token should contain user info
3. Or call: `GET /api/auth/me` to see user role

---

## Example: Complete Setup

### 1. Register User
```
Email: admin@example.com
Password: admin123
```

### 2. Update Role in MongoDB
```javascript
use citizen-appeal-system
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### 3. Login
```
URL: http://localhost:3000/login
Email: admin@example.com
Password: admin123
```

### 4. Access Dashboard
```
URL: http://localhost:3000/admin/dashboard
```

---

## Security Note

⚠️ **Important:** In production, you should:
- Use stronger passwords
- Create admin accounts through secure admin panel
- Never expose admin creation endpoints publicly
- Use environment variables for admin emails
- Implement proper role management system

---

## Summary

**Quick Steps:**
1. ✅ Register a user normally
2. ✅ Update role to "admin" in MongoDB
3. ✅ Login with that user
4. ✅ You'll be redirected to admin dashboard

**The login page now automatically redirects admins to `/admin/dashboard` and citizens to `/dashboard`.**

---

## Still Having Issues?

1. **Check Backend Logs:**
   - Look at terminal where backend is running
   - Check for error messages

2. **Check Browser Console:**
   - Press F12
   - Look at Console tab for errors
   - Check Network tab for API calls

3. **Verify Database:**
   ```javascript
   db.users.find({ role: "admin" }).pretty()
   ```

4. **Test API Directly:**
   - Use Postman or Thunder Client
   - Test `/api/auth/me` endpoint
   - Should return user with `role: "admin"`


