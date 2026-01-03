# Step-by-Step: How a Citizen-Submitted Appeal Appears on Admin Dashboard

## Complete Flow Diagram

```
Citizen Submits Appeal
    ↓
Frontend (React) → POST /api/appeals
    ↓
Backend Validates & Saves to MongoDB
    ↓
Appeal Status: "pending"
    ↓
Admin Dashboard Fetches Appeals
    ↓
Admin Sees Appeal in Dashboard
    ↓
Admin Reviews & Updates Status
    ↓
Citizen Gets Notification
```

---

## Detailed Step-by-Step Process

### **STEP 1: Citizen Submits an Appeal**

**Location:** `src/pages/SubmitAppeal.js`

**What Happens:**
1. Citizen fills out the appeal form:
   - Violation ID (e.g., "VIOL123456")
   - Appeal Reason (e.g., "wrong-vehicle")
   - Description (minimum 50 characters, 5 words)
   - Evidence file (if required)

2. Frontend validates the form:
   - Checks all required fields
   - Validates description length
   - Checks if evidence is required for the selected reason

3. Frontend sends POST request:
   ```javascript
   POST http://localhost:5000/api/appeals
   Headers: {
     Authorization: Bearer <citizen_jwt_token>
   }
   Body: FormData {
     violationId: "VIOL123456",
     appealReason: "wrong-vehicle",
     description: "Detailed description...",
     evidence: <file>
   }
   ```

---

### **STEP 2: Backend Receives and Validates**

**Location:** `server/controllers/appealController.js` → `createAppeal()`

**What Happens:**
1. **Authentication Check:**
   - Middleware verifies JWT token
   - Extracts user ID from token

2. **Input Validation:**
   - Validates violation ID format (8-20 alphanumeric)
   - Validates appeal reason (must be from allowed list)
   - Validates description (min 50 chars, 5 words)
   - Checks if evidence is required for the reason

3. **Duplicate Check:**
   - Checks if user already submitted appeal for same violation ID
   - Prevents duplicate submissions

4. **File Upload:**
   - Saves evidence file to `server/uploads/` folder
   - Stores file path in database

5. **Database Save:**
   - Creates appeal document in MongoDB:
     ```javascript
     {
       violationId: "VIOL123456",
       userId: <citizen_user_id>,
       appealReason: "wrong-vehicle",
       description: "Detailed description...",
       evidence: "uploads/evidence-1234567890.png",
       status: "pending",  // Initial status
       statusHistory: [{
         status: "pending",
         changedBy: <citizen_user_id>,
         changedAt: <timestamp>,
         reason: "initial_submission"
       }],
       submittedAt: <timestamp>,
       createdAt: <timestamp>
     }
     ```

6. **Audit Logging:**
   - Logs appeal creation in `AuditLog` collection
   - Records IP address and user agent

7. **Response:**
   - Returns success response with appeal ID
   - Status: 201 Created

---

### **STEP 3: Appeal Stored in MongoDB**

**Location:** MongoDB Database → `appeals` collection

**What Happens:**
- Appeal document is saved with status: `"pending"`
- Appeal is immediately available for admin queries
- Status history entry is created automatically

**Database Structure:**
```javascript
{
  _id: ObjectId("..."),
  violationId: "VIOL123456",
  userId: ObjectId("citizen_id"),
  appealReason: "wrong-vehicle",
  description: "Detailed description...",
  evidence: "uploads/evidence-1234567890.png",
  status: "pending",
  statusHistory: [...],
  submittedAt: ISODate("2024-01-15T10:30:00Z"),
  createdAt: ISODate("2024-01-15T10:30:00Z")
}
```

---

### **STEP 4: Admin Dashboard Loads**

**Location:** `src/pages/AdminDashboard.js`

**What Happens:**
1. Admin navigates to `/admin/dashboard`
2. Component mounts and calls `useEffect()`
3. Frontend makes API call:
   ```javascript
   GET http://localhost:5000/api/appeals/admin/all?status=pending&page=1&limit=20
   Headers: {
     Authorization: Bearer <admin_jwt_token>
   }
   ```

---

### **STEP 5: Backend Fetches Appeals for Admin**

**Location:** `server/controllers/appealController.js` → `getAllAppeals()`

**What Happens:**
1. **Authentication & Authorization:**
   - Middleware verifies JWT token
   - Checks if user role is "admin"
   - Rejects if not admin (403 Forbidden)

2. **Query Building:**
   - Builds MongoDB query based on filters:
     - Status filter (if provided)
     - Appeal reason filter (if provided)
   - Default: Returns all appeals

3. **Database Query:**
   ```javascript
   Appeal.find(query)
     .sort({ createdAt: -1 })  // Newest first
     .skip((page - 1) * limit)
     .limit(limit)
     .populate('userId', 'fullName email nicNumber mobileNumber')
     .populate('reviewedBy', 'fullName email')
   ```

4. **Response:**
   ```json
   {
     "success": true,
     "count": 5,
     "total": 20,
     "page": 1,
     "pages": 2,
     "data": {
       "appeals": [
         {
           "_id": "appeal_id",
           "violationId": "VIOL123456",
           "appealReason": "wrong-vehicle",
           "description": "Detailed description...",
           "status": "pending",
           "submittedAt": "2024-01-15T10:30:00.000Z",
           "userId": {
             "_id": "citizen_id",
             "fullName": "John Doe",
             "email": "john@example.com",
             "nicNumber": "123456789V",
             "mobileNumber": "0771234567"
           },
           "reviewedBy": null,
           "reviewedAt": null
         }
       ]
     }
   }
   ```

---

### **STEP 6: Frontend Displays Appeals**

**Location:** `src/pages/AdminDashboard.js`

**What Happens:**
1. Frontend receives API response
2. Updates component state with appeals data
3. Renders appeals in the dashboard:
   - Shows appeal list with details
   - Displays statistics (total, pending, approved, rejected)
   - Shows filters (status, appeal reason)
   - Displays pagination

4. **Admin Can:**
   - View all appeals
   - Filter by status (pending, under-review, approved, rejected)
   - Filter by appeal reason
   - Click on appeal to review details
   - Update appeal status

---

### **STEP 7: Admin Reviews Appeal**

**Location:** `src/pages/AppealReview.js`

**What Happens:**
1. Admin clicks on an appeal
2. Frontend fetches appeal details:
   ```javascript
   GET http://localhost:5000/api/appeals/:id
   Headers: {
     Authorization: Bearer <admin_jwt_token>
   }
   ```

3. Backend returns full appeal details:
   - Appeal information
   - Citizen information
   - Evidence file URL
   - Status history
   - Admin notes (if any)

4. Admin reviews:
   - Reads description
   - Views evidence
   - Makes decision

---

### **STEP 8: Admin Updates Appeal Status**

**Location:** `src/pages/AppealReview.js` → Status Update

**What Happens:**
1. Admin clicks "Approve" or "Reject"
2. Frontend sends PUT request:
   ```javascript
   PUT http://localhost:5000/api/appeals/:id/status
   Headers: {
     Authorization: Bearer <admin_jwt_token>,
     Content-Type: application/json
   }
   Body: {
     status: "approved",  // or "rejected"
     adminNotes: "Appeal approved based on evidence provided"
   }
   ```

3. **Backend Validates:**
   - Checks admin authorization
   - Validates status transition (workflow rules)
   - Prevents self-review (admin cannot review own appeals)
   - Requires admin notes for rejections

4. **Backend Updates:**
   - Updates appeal status
   - Adds entry to status history
   - Records reviewer and timestamp
   - Saves admin notes

5. **Notification:**
   - Creates notification for citizen
   - Citizen will see notification on next login

6. **Audit Log:**
   - Logs status change action
   - Records who, when, and what changed

---

## Real-World Rules Enforced

### ✅ **Duplicate Prevention**
- Same violation ID cannot be appealed twice by same user
- Checked before saving appeal

### ✅ **Evidence Requirements**
- Certain appeal reasons require evidence:
  - `wrong-vehicle` → Evidence required
  - `emergency-situation` → Evidence required
  - `technical-error` → Evidence required

### ✅ **Status Workflow**
- Valid transitions only:
  - `pending` → `under-review`
  - `under-review` → `approved` or `rejected`
- Cannot skip statuses
- Finalized appeals cannot be changed

### ✅ **Authorization**
- Citizens can only see their own appeals
- Admins can see all appeals
- Admin cannot review own appeals

### ✅ **Audit Trail**
- Every action is logged
- Status history tracks all changes
- IP address and user agent recorded

---

## Data Flow Summary

```
┌─────────────────┐
│  Citizen        │
│  Submits Appeal │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Frontend       │
│  Validates Form │
└────────┬────────┘
         │
         ▼ POST /api/appeals
┌─────────────────┐
│  Backend        │
│  Validates      │
│  Saves to DB    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  MongoDB        │
│  Stores Appeal  │
│  Status: pending│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Admin Dashboard│
│  Fetches Appeals│
└────────┬────────┘
         │
         ▼ GET /api/appeals/admin/all
┌─────────────────┐
│  Backend        │
│  Returns Appeals│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Admin Dashboard│
│  Displays Appeals│
└─────────────────┘
```

---

## Key API Endpoints Used

1. **Citizen Submits Appeal:**
   - `POST /api/appeals` (Citizen)

2. **Admin Views All Appeals:**
   - `GET /api/appeals/admin/all` (Admin)

3. **Admin Views Single Appeal:**
   - `GET /api/appeals/:id` (Admin)

4. **Admin Updates Status:**
   - `PUT /api/appeals/:id/status` (Admin)

5. **Get Statistics:**
   - `GET /api/appeals/admin/statistics` (Admin)

---

## Timeline Example

**10:00 AM** - Citizen submits appeal
- Appeal saved with status: `pending`
- Audit log created

**10:01 AM** - Admin opens dashboard
- Dashboard fetches all appeals
- New appeal appears in "Pending Appeals" section

**10:05 AM** - Admin reviews appeal
- Clicks on appeal to view details
- Reviews evidence and description

**10:10 AM** - Admin updates status
- Changes status to `under-review`
- Status history updated
- Notification created for citizen

**10:15 AM** - Admin makes decision
- Changes status to `approved`
- Adds admin notes
- Notification sent to citizen

---

## Next Steps After Implementation

1. **Update AdminDashboard.js** to fetch real data
2. **Update AppealReview.js** to use real API
3. **Add real-time updates** (optional - WebSocket)
4. **Add email notifications** (optional)
5. **Add filtering and search** (enhancement)


