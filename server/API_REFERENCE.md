# API Reference - Real-World Backend

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "nicNumber": "123456789V",
  "drivingLicense": "DL123456",
  "email": "john@example.com",
  "mobileNumber": "0771234567",
  "password": "password123"
}
```

**Validation Rules:**
- Full name: 3-100 chars, must have first and last name
- NIC: 9 digits + V/X or 12 digits
- Driving license: 8-15 chars, letters + numbers
- Mobile: 0XX-XXXXXXX or +94XX-XXXXXXX
- Email: Valid email format
- Password: Min 8 chars, must have letter + number

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please login to continue.",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "citizen"
    }
  }
}
```

**Errors:**
- `400` - Validation failed
- `409` - Duplicate identity (NIC, DL, or email already exists)

---

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "citizen"
    }
  }
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `423` - Account locked (5 failed attempts)

---

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "nicNumber": "123456789V",
      "drivingLicense": "DL123456",
      "mobileNumber": "0771234567",
      "role": "citizen",
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  }
}
```

---

## Appeal Endpoints (Citizen)

### Create Appeal
```http
POST /api/appeals
Authorization: Bearer <token>
Content-Type: multipart/form-data

violationId: VIOL123456
appealReason: wrong-vehicle
description: This is a detailed description with at least five words explaining why this appeal should be considered...
evidence: [file] (required for wrong-vehicle, emergency-situation, technical-error)
```

**Validation Rules:**
- Violation ID: 8-20 alphanumeric characters
- Appeal reason: Must be from allowed list
- Description: Min 50 chars, min 5 words
- Evidence: Required for wrong-vehicle, emergency-situation, technical-error
- File: Max 5MB, images (JPEG, PNG, GIF) or PDF

**Response:**
```json
{
  "success": true,
  "message": "Appeal submitted successfully. It will be reviewed by an administrator.",
  "data": {
    "appeal": {
      "id": "appeal_id",
      "violationId": "VIOL123456",
      "appealReason": "wrong-vehicle",
      "status": "pending",
      "submittedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Errors:**
- `400` - Validation failed or missing evidence
- `409` - Duplicate appeal for same violation

---

### Get My Appeals
```http
GET /api/appeals?status=pending&page=1&limit=10
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): pending, under-review, approved, rejected
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 10,
  "page": 1,
  "pages": 2,
  "data": {
    "appeals": [
      {
        "id": "appeal_id",
        "violationId": "VIOL123456",
        "appealReason": "wrong-vehicle",
        "status": "pending",
        "submittedAt": "2024-01-15T10:30:00.000Z",
        "userId": {
          "fullName": "John Doe",
          "email": "john@example.com"
        }
      }
    ]
  }
}
```

---

### Get Appeal Details
```http
GET /api/appeals/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "appeal": {
      "id": "appeal_id",
      "violationId": "VIOL123456",
      "appealReason": "wrong-vehicle",
      "description": "Full description...",
      "status": "under-review",
      "evidenceUrl": "/uploads/evidence-1234567890.png",
      "statusHistory": [
        {
          "status": "pending",
          "changedBy": {
            "fullName": "John Doe",
            "email": "john@example.com"
          },
          "changedAt": "2024-01-15T10:30:00.000Z",
          "notes": null,
          "reason": "initial_submission"
        }
      ],
      "userId": {
        "fullName": "John Doe",
        "email": "john@example.com",
        "nicNumber": "123456789V"
      },
      "reviewedBy": null,
      "reviewedAt": null,
      "adminNotes": null,
      "submittedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Errors:**
- `403` - Not authorized (citizens can only see own appeals)
- `404` - Appeal not found

---

## Appeal Endpoints (Admin)

### Get All Appeals
```http
GET /api/appeals/admin/all?status=pending&appealReason=wrong-vehicle&page=1&limit=20&sortBy=createdAt&sortOrder=desc
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status` (optional): pending, under-review, approved, rejected
- `appealReason` (optional): Filter by appeal reason
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): Field to sort by (default: createdAt)
- `sortOrder` (optional): asc or desc (default: desc)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": {
    "appeals": [...]
  }
}
```

---

### Get Appeal Statistics
```http
GET /api/appeals/admin/statistics?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `startDate` (optional): Start date (ISO format)
- `endDate` (optional): End date (ISO format)

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total": 100,
      "pending": 20,
      "underReview": 15,
      "approved": 50,
      "rejected": 15,
      "approvalRate": "76.92%"
    },
    "byReason": [
      {
        "_id": "wrong-vehicle",
        "count": 30
      }
    ],
    "byStatus": [
      {
        "_id": "pending",
        "count": 20
      }
    ],
    "recentAppeals": [...]
  }
}
```

---

### Update Appeal Status
```http
PUT /api/appeals/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "rejected",
  "adminNotes": "Insufficient evidence provided. Please provide clearer documentation."
}
```

**Status Workflow:**
- `pending` → `under-review`
- `under-review` → `approved` or `rejected`

**Validation Rules:**
- Cannot skip statuses
- Cannot change finalized appeals (approved/rejected)
- Rejection requires admin notes (min 10 chars)
- Admin cannot review own appeals

**Response:**
```json
{
  "success": true,
  "message": "Appeal status updated to rejected",
  "data": {
    "appeal": {
      "id": "appeal_id",
      "violationId": "VIOL123456",
      "status": "rejected",
      "reviewedBy": "admin_id",
      "reviewedAt": "2024-01-15T11:00:00.000Z",
      "adminNotes": "Insufficient evidence provided..."
    }
  }
}
```

**Errors:**
- `400` - Invalid status transition or missing notes for rejection
- `403` - Cannot review own appeal
- `404` - Appeal not found

---

## Notification Endpoints

### Get My Notifications
```http
GET /api/notifications?status=unread&page=1&limit=20
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): unread, read
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 10,
  "unreadCount": 3,
  "page": 1,
  "pages": 1,
  "data": {
    "notifications": [
      {
        "id": "notification_id",
        "type": "status-change",
        "title": "Appeal Under Review",
        "message": "Your appeal for violation VIOL123456 is now under review by an administrator.",
        "status": "unread",
        "appealId": {
          "violationId": "VIOL123456",
          "status": "under-review"
        },
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

### Mark Notification as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read",
  "data": {
    "notification": {
      "id": "notification_id",
      "status": "read",
      "readAt": "2024-01-15T11:00:00.000Z"
    }
  }
}
```

---

### Mark All Notifications as Read
```http
PUT /api/notifications/read-all
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "5 notifications marked as read",
  "data": {
    "updatedCount": 5
  }
}
```

---

## Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": {
    "field": "Field-specific error"
  }
}
```

**Common Status Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `423` - Locked (account locked)
- `500` - Internal Server Error

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <jwt_token>
```

Tokens are returned on registration and login, and expire after 30 days.

---

## Real-World Rules Enforced

1. **One account per citizen** - NIC, DL, email must be unique
2. **No duplicate appeals** - Same violation cannot be appealed twice
3. **Evidence requirements** - Certain reasons require evidence
4. **Status workflow** - Must follow proper status transitions
5. **No self-review** - Admins cannot review own appeals
6. **Rejection justification** - Rejections require admin notes
7. **Account lockout** - 5 failed attempts locks account for 2 hours

---

## Testing Tips

1. **Test validation** - Try invalid formats to see error messages
2. **Test duplicates** - Try registering with existing NIC/DL/email
3. **Test workflow** - Try invalid status transitions
4. **Test authorization** - Try accessing other users' appeals
5. **Test lockout** - Try 5 failed logins to see lockout

---

## Support

For issues or questions, refer to:
- `REAL_WORLD_UPGRADES.md` - Detailed upgrade documentation
- `BACKEND_UPGRADE_SUMMARY.md` - Summary of changes


