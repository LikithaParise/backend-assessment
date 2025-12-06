# API Request Examples

Ready-to-use API request examples for quick testing. Copy and paste these into your REST client.

---

## 🔑 Authentication Endpoints

### 1. Register a New User

**Request:**
```http
POST http://localhost:3000/auth/register HTTP/1.1
Content-Type: application/json

{
  "email": "alice@example.com",
  "name": "Alice Johnson",
  "password": "secure123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "name": "Alice Johnson",
    "password": "secure123"
  }'
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "email": "alice@example.com",
    "name": "Alice Johnson",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Login User

**Request:**
```http
POST http://localhost:3000/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "secure123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "secure123"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwic3ViIjoiZjQ3YWMxMGItNThjYy00MzcyLWE1NjctMGUwMmIyYzNkNDc5IiwibmFtZSI6IkFsaWNlIEpvaG5zb24iLCJpYXQiOjE3MDUzMjA2MDAsImV4cCI6MTcwNTQwNzAwMH0.XYZ123ABC",
  "user": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "email": "alice@example.com",
    "name": "Alice Johnson"
  }
}
```

> **💡 Important:** Copy the `access_token` value. You'll need it for all subsequent requests!

---

## 👤 User Management Endpoints

> **⚠️ Note:** All user endpoints require authentication. Include the Bearer token in the Authorization header.

### 3. Get All Users

**Request:**
```http
GET http://localhost:3000/users HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**cURL:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "email": "alice@example.com",
      "name": "Alice Johnson",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 4. Get User by ID

**Request:**
```http
GET http://localhost:3000/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**cURL:**
```bash
curl -X GET http://localhost:3000/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "User retrieved successfully",
  "data": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "email": "alice@example.com",
    "name": "Alice Johnson",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 5. Update User

**Request:**
```http
PATCH http://localhost:3000/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json

{
  "name": "Alice Smith"
}
```

**cURL:**
```bash
curl -X PATCH http://localhost:3000/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith"
  }'
```

**Expected Response (200):**
```json
{
  "message": "User updated successfully",
  "data": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "email": "alice@example.com",
    "name": "Alice Smith",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### 6. Delete User

**Request:**
```http
DELETE http://localhost:3000/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

## 📝 Task Management Endpoints

> **⚠️ Note:** All task endpoints require authentication.

### 7. Create a Task

**Request:**
```http
POST http://localhost:3000/tasks HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json

{
  "title": "Complete Backend Assessment",
  "description": "Build a comprehensive NestJS API with PostgreSQL, TypeORM, and JWT authentication",
  "status": "TODO"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete Backend Assessment",
    "description": "Build a comprehensive NestJS API with PostgreSQL, TypeORM, and JWT authentication",
    "status": "TODO"
  }'
```

**Expected Response (201):**
```json
{
  "message": "Task created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "title": "Complete Backend Assessment",
    "description": "Build a comprehensive NestJS API with PostgreSQL, TypeORM, and JWT authentication",
    "status": "TODO",
    "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "createdAt": "2024-01-15T10:40:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}
```

**Valid Status Values:**
- `TODO`
- `IN_PROGRESS`
- `DONE`

---

### 8. Get All Tasks

**Request:**
```http
GET http://localhost:3000/tasks HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**cURL:**
```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
      "title": "Complete Backend Assessment",
      "description": "Build a comprehensive NestJS API with PostgreSQL, TypeORM, and JWT authentication",
      "status": "TODO",
      "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "createdAt": "2024-01-15T10:40:00.000Z",
      "updatedAt": "2024-01-15T10:40:00.000Z"
    }
  ]
}
```

---

### 9. Get Task by ID

**Request:**
```http
GET http://localhost:3000/tasks/a1b2c3d4-e5f6-4789-a012-3456789abcde HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**cURL:**
```bash
curl -X GET http://localhost:3000/tasks/a1b2c3d4-e5f6-4789-a012-3456789abcde \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "Task retrieved successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "title": "Complete Backend Assessment",
    "description": "Build a comprehensive NestJS API with PostgreSQL, TypeORM, and JWT authentication",
    "status": "TODO",
    "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "createdAt": "2024-01-15T10:40:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}
```

---

### 10. Update Task

**Request:**
```http
PATCH http://localhost:3000/tasks/a1b2c3d4-e5f6-4789-a012-3456789abcde HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

**cURL:**
```bash
curl -X PATCH http://localhost:3000/tasks/a1b2c3d4-e5f6-4789-a012-3456789abcde \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_PROGRESS"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Task updated successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "title": "Complete Backend Assessment",
    "description": "Build a comprehensive NestJS API with PostgreSQL, TypeORM, and JWT authentication",
    "status": "IN_PROGRESS",
    "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "createdAt": "2024-01-15T10:40:00.000Z",
    "updatedAt": "2024-01-15T10:45:00.000Z"
  }
}
```

**Update Multiple Fields:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description here",
  "status": "DONE"
}
```

---

### 11. Delete Task

**Request:**
```http
DELETE http://localhost:3000/tasks/a1b2c3d4-e5f6-4789-a012-3456789abcde HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/tasks/a1b2c3d4-e5f6-4789-a012-3456789abcde \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 📊 Complete Test Scenario

Here's a complete workflow to test all functionality:

```bash
# 1. Register a user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'

# 2. Login and get token
TOKEN=$(curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' | jq -r '.access_token')

echo "Token: $TOKEN"

# 3. Create a task
TASK_ID=$(curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task for demonstration",
    "status": "TODO"
  }' | jq -r '.data.id')

echo "Task ID: $TASK_ID"

# 4. Get all tasks
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer $TOKEN"

# 5. Update task status
curl -X PATCH "http://localhost:3000/tasks/$TASK_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DONE"
  }'

# 6. Delete task
curl -X DELETE "http://localhost:3000/tasks/$TASK_ID" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ❌ Error Response Examples

### 400 Bad Request - Validation Error
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

### 401 Unauthorized - Invalid Credentials
```json
{
  "statusCode": 401,
  "message": "Invalid email or password"
}
```

### 401 Unauthorized - Missing/Invalid Token
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden - Access Denied
```json
{
  "statusCode": 403,
  "message": "You do not have permission to update this task"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Task with ID xyz not found"
}
```

### 409 Conflict - Duplicate Entry
```json
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## 🎯 Quick Test Commands

### Register + Login + Create Task (All in One)
```bash
#!/bin/bash

# Set base URL
BASE_URL="http://localhost:3000"

# Register
echo "1. Registering user..."
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "name": "Demo User",
    "password": "demo123"
  }'

echo -e "\n\n2. Logging in..."
# Login and extract token
TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "demo123"
  }' | jq -r '.access_token')

echo "Token received: ${TOKEN:0:20}..."

echo -e "\n\n3. Creating task..."
# Create task
curl -X POST $BASE_URL/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task",
    "description": "This is my first task created via API",
    "status": "TODO"
  }'

echo -e "\n\n4. Getting all tasks..."
# Get all tasks
curl -X GET $BASE_URL/tasks \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n\nDone!"
```

Save this as `test-api.sh`, make it executable (`chmod +x test-api.sh`), and run it!

---

## 📱 Mobile/Frontend Integration

### JavaScript/TypeScript Fetch Example

```typescript
// Base configuration
const API_BASE_URL = 'http://localhost:3000';
let authToken: string | null = null;

// Register user
async function registerUser(email: string, name: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, password }),
  });
  
  return await response.json();
}

// Login user
async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  authToken = data.access_token;
  return data;
}

// Create task
async function createTask(title: string, description: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ title, description, status }),
  });
  
  return await response.json();
}

// Get all tasks
async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  
  return await response.json();
}
```

---

## 🔄 Pagination Example (Future Enhancement)

While the current API doesn't implement pagination, here's how you might call it if it did:

```http
GET http://localhost:3000/tasks?page=1&limit=10 HTTP/1.1
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

---

**Happy Testing! 🚀**

For more detailed testing instructions, see `TESTING_GUIDE.md`.
