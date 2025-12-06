# API Testing Guide with Postman/Thunder Client

This guide will help you test all the API endpoints using Postman or Thunder Client.

## Setup

1. **Base URL**: `http://localhost:3000`
2. **Content-Type**: `application/json` (for all requests with body)

## Testing Flow

### Step 1: Register a New User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-here",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Step 2: Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "john.doe@example.com",
    "name": "John Doe"
  }
}
```

**IMPORTANT:** Copy the `access_token` value. You'll need it for all subsequent requests.

### Step 3: Set Authorization Header

For all protected endpoints, add this header:
```
Authorization: Bearer <your_access_token>
```

Replace `<your_access_token>` with the token you received from login.

---

## User Endpoints (Protected)

### Get All Users

**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Expected Response (200):**
```json
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "email": "john.doe@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get User by ID

**Endpoint:** `GET /users/:id`

Replace `:id` with actual user UUID.

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Expected Response (200):**
```json
{
  "message": "User retrieved successfully",
  "data": {
    "id": "uuid",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update User

**Endpoint:** `PATCH /users/:id`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Request Body:**
```json
{
  "name": "John Updated Doe"
}
```

**Expected Response (200):**
```json
{
  "message": "User updated successfully",
  "data": {
    "id": "uuid",
    "email": "john.doe@example.com",
    "name": "John Updated Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Delete User

**Endpoint:** `DELETE /users/:id`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Expected Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

### Get Current User Profile

**Endpoint:** `GET /users/profile/me`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Expected Response (200):**
```json
{
  "message": "Profile retrieved successfully",
  "data": {
    "id": "uuid",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Task Endpoints (Protected)

### Create Task

**Endpoint:** `POST /tasks`

**Headers:**
```
Authorization: Bearer <your_access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete Backend Assessment",
  "description": "Build a comprehensive NestJS API with all required features",
  "status": "TODO"
}
```

**Status Options:** `TODO`, `IN_PROGRESS`, `DONE`

**Expected Response (201):**
```json
{
  "message": "Task created successfully",
  "data": {
    "id": "task-uuid",
    "title": "Complete Backend Assessment",
    "description": "Build a comprehensive NestJS API with all required features",
    "status": "TODO",
    "userId": "user-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Tasks

**Endpoint:** `GET /tasks`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Expected Response (200):**
```json
{
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "task-uuid",
      "title": "Complete Backend Assessment",
      "description": "Build a comprehensive NestJS API with all required features",
      "status": "TODO",
      "userId": "user-uuid",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Task by ID

**Endpoint:** `GET /tasks/:id`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Expected Response (200):**
```json
{
  "message": "Task retrieved successfully",
  "data": {
    "id": "task-uuid",
    "title": "Complete Backend Assessment",
    "description": "Build a comprehensive NestJS API with all required features",
    "status": "TODO",
    "userId": "user-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Task

**Endpoint:** `PATCH /tasks/:id`

**Headers:**
```
Authorization: Bearer <your_access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "title": "Complete Backend Assessment - Updated"
}
```

**Expected Response (200):**
```json
{
  "message": "Task updated successfully",
  "data": {
    "id": "task-uuid",
    "title": "Complete Backend Assessment - Updated",
    "description": "Build a comprehensive NestJS API with all required features",
    "status": "IN_PROGRESS",
    "userId": "user-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Expected Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request (Validation Error)
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "You do not have permission to update this task",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User with ID xyz not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

---

## Quick Testing Script

Here's a complete testing flow:

1. **Register User** → Save the user ID
2. **Login** → Save the access token
3. **Get All Users** (with token)
4. **Create Task** (with token) → Save task ID
5. **Get All Tasks** (with token)
6. **Update Task** (with token and task ID)
7. **Get Single Task** (with token and task ID)
8. **Delete Task** (with token and task ID)
9. **Update User** (with token and user ID)
10. **Delete User** (with token and user ID)

---

## Tips for Postman/Thunder Client

### Postman Environment Variables
Create environment variables for easier testing:
- `base_url`: `http://localhost:3000`
- `token`: (set after login)
- `user_id`: (set after registration)
- `task_id`: (set after creating task)

Use them in requests like: `{{base_url}}/users/{{user_id}}`

### Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create a new request
3. Set the method and URL
4. Add headers in the "Headers" tab
5. Add body in the "Body" tab (select JSON)

### Authorization Setup in Postman
1. Go to "Authorization" tab
2. Select "Bearer Token" type
3. Paste your token

---

## Common Issues

### Issue: "Unauthorized" Error
**Solution:** Make sure you're including the Bearer token in the Authorization header.

### Issue: "User not found" after login
**Solution:** Register a new user first, or use correct credentials.

### Issue: "Forbidden" when updating/deleting task
**Solution:** You can only modify your own tasks. Make sure you're using tasks created by your logged-in user.

### Issue: Connection refused
**Solution:** Make sure the server is running (`npm run start:dev`) and PostgreSQL is running.

---

**Happy Testing! 🚀**
