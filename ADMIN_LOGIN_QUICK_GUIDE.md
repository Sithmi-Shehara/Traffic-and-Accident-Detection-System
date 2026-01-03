# Quick Guide: Login as Admin

## 🚀 Fastest Method (2 Minutes)

### Step 1: Create Admin Account

**Option A: Using Script (Easiest)**
```bash
cd server
npm run create-admin
```

**Option B: Using MongoDB**
1. Register a user at: http://localhost:3000/register
2. Open MongoDB Compass or shell
3. Find the user in `users` collection
4. Change `role` from `"citizen"` to `"admin"`

### Step 2: Login

1. Go to: http://localhost:3000/login
2. Enter:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Click "Login"
4. ✅ You'll be redirected to: http://localhost:3000/admin/dashboard

---

## 📋 Default Admin Credentials (After Running Script)

```
Email: admin@example.com
Password: admin123
```

---

## 🔍 Verify Admin Account

### Check in MongoDB:
```javascript
db.users.findOne({ email: "admin@example.com" })
```

Should show: `"role": "admin"`

---

## ❌ Troubleshooting

### "Access denied. Admin privileges required."
→ User role is not "admin" in database
→ Update role in MongoDB (see Step 1, Option B)

### Redirected to citizen dashboard
→ Login page updated - restart frontend:
```bash
# Stop frontend (Ctrl + C)
npm start
```

### Cannot see admin dashboard
→ Check URL: http://localhost:3000/admin/dashboard
→ Make sure you're logged in
→ Check browser console for errors

---

## 📚 Full Guide

See `HOW_TO_LOGIN_AS_ADMIN.md` for detailed instructions.


