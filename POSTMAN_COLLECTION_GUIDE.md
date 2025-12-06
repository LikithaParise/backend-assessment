# Postman Collection Guide

This guide will help you set up a Postman collection to test all API endpoints efficiently.

## Setting Up Postman Collection

### Step 1: Create Environment Variables

1. Click on "Environments" in Postman (top right corner)
2. Click "+" to create a new environment
3. Name it "Backend Assessment - Dev"
4. Add these variables:

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| `baseUrl` | `http://localhost:3000` | `http://localhost:3000` |
| `token` | (leave empty) | (leave empty) |
| `userId` | (leave empty) | (leave empty) |
| `taskId` | (leave empty) | (leave empty) |

5. Click "Save"
6. Select this environment from the dropdown (top right)

### Step 2: Create Collection Structure

Create a new collection called "Backend Assessment API" with these folders:

```
Backend Assessment API/
├── 1. Authentication/
│   ├── Register User
│   └── Login User
├── 2. Users/
│   ├── Get All Users
│   ├── Get User by ID
│   ├── Get My Profile
│   ├── Update User
│   └── Delete User
└── 3. Tasks/
    ├── Create Task
    ├── Get All Tasks
    ├── Get Task by ID
    ├── Update Task
    └── Delete Task
```

## Request Details

### 1. Authentication

#### Register User
- **Method:** `POST`
- **URL:** `{{baseUrl}}/auth/register`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "john.doe@example.com",
    "name": "John Doe",
    "password": "password123"
  }
  ```
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  if (response.user && response.user.id) {
      pm.environment.set("userId", response.user.id);
  }
  
  pm.test("Status code is 201", () => {
      pm.response.to.have.status(201);
  });
  
  pm.test("User has id", () => {
      pm.expect(response.user).to.have.property('id');
  });
  
  pm.test("Password not in response", () => {
      pm.expect(response.user).to.not.have.property('password');
  });
  ```

#### Login User
- **Method:** `POST`
- **URL:** `{{baseUrl}}/auth/login`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  // Save token and userId to environment
  if (response.access_token) {
      pm.environment.set("token", response.access_token);
      console.log("✅ Token saved to environment");
  }
  
  if (response.user && response.user.id) {
      pm.environment.set("userId", response.user.id);
      console.log("✅ User ID saved to environment");
  }
  
  // Tests
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("Response has access_token", () => {
      pm.expect(response).to.have.property('access_token');
  });
  
  pm.test("Token is not empty", () => {
      pm.expect(response.access_token).to.not.be.empty;
  });
  
  pm.test("Response has user object", () => {
      pm.expect(response).to.have.property('user');
  });
  ```

---

### 2. Users

**Important:** For all user endpoints, add Authorization header:
- Go to "Authorization" tab
- Type: "Bearer Token"
- Token: `{{token}}`

#### Get All Users
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users`
- **Authorization:** Bearer `{{token}}`
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("Response has data array", () => {
      pm.expect(response.data).to.be.an('array');
  });
  
  pm.test("Users don't have passwords", () => {
      if (response.data.length > 0) {
          pm.expect(response.data[0]).to.not.have.property('password');
      }
  });
  ```

#### Get User by ID
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users/{{userId}}`
- **Authorization:** Bearer `{{token}}`
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("Response has user data", () => {
      pm.expect(response.data).to.have.property('id');
      pm.expect(response.data).to.have.property('email');
      pm.expect(response.data).to.have.property('name');
  });
  ```

#### Get My Profile
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users/profile/me`
- **Authorization:** Bearer `{{token}}`
- **Tests Tab:**
  ```javascript
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  ```

#### Update User
- **Method:** `PATCH`
- **URL:** `{{baseUrl}}/users/{{userId}}`
- **Authorization:** Bearer `{{token}}`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "John Smith"
  }
  ```
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("User was updated", () => {
      pm.expect(response.message).to.include('updated');
  });
  ```

#### Delete User
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/users/{{userId}}`
- **Authorization:** Bearer `{{token}}`
- **Tests Tab:**
  ```javascript
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("User was deleted", () => {
      const response = pm.response.json();
      pm.expect(response.message).to.include('deleted');
  });
  ```

---

### 3. Tasks

**Important:** For all task endpoints, add Authorization header:
- Authorization: Bearer `{{token}}`

#### Create Task
- **Method:** `POST`
- **URL:** `{{baseUrl}}/tasks`
- **Authorization:** Bearer `{{token}}`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "title": "Complete Backend Assessment",
    "description": "Build a NestJS API with PostgreSQL and JWT authentication",
    "status": "TODO"
  }
  ```
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  // Save task ID for later use
  if (response.data && response.data.id) {
      pm.environment.set("taskId", response.data.id);
      console.log("✅ Task ID saved:", response.data.id);
  }
  
  pm.test("Status code is 200 or 201", () => {
      pm.expect(pm.response.code).to.be.oneOf([200, 201]);
  });
  
  pm.test("Task was created", () => {
      pm.expect(response.data).to.have.property('id');
      pm.expect(response.data).to.have.property('title');
  });
  
  pm.test("Task belongs to user", () => {
      pm.expect(response.data.userId).to.equal(pm.environment.get("userId"));
  });
  ```

#### Get All Tasks
- **Method:** `GET`
- **URL:** `{{baseUrl}}/tasks`
- **Authorization:** Bearer `{{token}}`
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("Response has tasks array", () => {
      pm.expect(response.data).to.be.an('array');
  });
  
  pm.test("Tasks belong to current user", () => {
      const currentUserId = pm.environment.get("userId");
      response.data.forEach(task => {
          pm.expect(task.userId).to.equal(currentUserId);
      });
  });
  ```

#### Get Task by ID
- **Method:** `GET`
- **URL:** `{{baseUrl}}/tasks/{{taskId}}`
- **Authorization:** Bearer `{{token}}`
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("Task has required fields", () => {
      pm.expect(response.data).to.have.property('id');
      pm.expect(response.data).to.have.property('title');
      pm.expect(response.data).to.have.property('description');
      pm.expect(response.data).to.have.property('status');
  });
  ```

#### Update Task
- **Method:** `PATCH`
- **URL:** `{{baseUrl}}/tasks/{{taskId}}`
- **Authorization:** Bearer `{{token}}`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "status": "IN_PROGRESS"
  }
  ```
- **Tests Tab:**
  ```javascript
  const response = pm.response.json();
  
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("Task was updated", () => {
      pm.expect(response.message).to.include('updated');
  });
  
  pm.test("Status was changed", () => {
      pm.expect(response.data.status).to.equal('IN_PROGRESS');
  });
  ```

#### Delete Task
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/tasks/{{taskId}}`
- **Authorization:** Bearer `{{token}}`
- **Tests Tab:**
  ```javascript
  pm.test("Status code is 200", () => {
      pm.response.to.have.status(200);
  });
  
  pm.test("Task was deleted", () => {
      const response = pm.response.json();
      pm.expect(response.message).to.include('deleted');
  });
  ```

---

## Pre-request Scripts

### Collection-level Pre-request Script

Add this to the collection's "Pre-request Scripts" tab to automatically refresh expired tokens:

```javascript
// Check if token exists and log it
const token = pm.environment.get("token");
if (token) {
    console.log("🔑 Using token:", token.substring(0, 20) + "...");
} else {
    console.log("⚠️ No token found. Please login first.");
}
```

---

## Running the Collection

### Option 1: Manual Testing
1. Click on each request
2. Click "Send"
3. Check the response

### Option 2: Collection Runner
1. Click on the collection
2. Click "Run"
3. Select all requests
4. Click "Run Backend Assessment API"
5. View the results

### Option 3: Automated Testing Order

Run requests in this order:
1. Register User
2. Login User (token auto-saved)
3. Get All Users
4. Get User by ID
5. Create Task (task ID auto-saved)
6. Get All Tasks
7. Get Task by ID
8. Update Task
9. Update User
10. Delete Task
11. Delete User (optional, at the end)

---

## Test Different Scenarios

### Scenario 1: Multiple Users
```javascript
// In Tests tab of Register User, add:
pm.globals.set("user1Token", pm.response.json().access_token);
```

Then create another user and save as `user2Token`.

### Scenario 2: Error Testing

Create separate folders for error tests:

**Invalid Login:**
```json
{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```
Expected: 401 Unauthorized

**Invalid Task Creation:**
```json
{
  "title": "AB",
  "description": "Short"
}
```
Expected: 400 Bad Request

**Unauthorized Access:**
- Don't include Authorization header
- Expected: 401 Unauthorized

---

## Export and Share

1. Click on collection "..." menu
2. Click "Export"
3. Choose "Collection v2.1"
4. Save as `Backend-Assessment-API.postman_collection.json`
5. Share with team or include in repository

---

## Tips for Efficient Testing

1. **Use Folders:** Organize by feature (Auth, Users, Tasks)
2. **Use Variables:** Leverage `{{baseUrl}}`, `{{token}}`, etc.
3. **Save Examples:** Save successful responses as examples
4. **Pre-request Scripts:** Auto-generate test data
5. **Collection Variables:** Store common values
6. **Test Scripts:** Validate responses automatically
7. **Console Logs:** Debug with `console.log()`

---

## Troubleshooting

**Issue:** "Could not get any response"
- Solution: Make sure the application is running (`npm run start:dev`)

**Issue:** "401 Unauthorized"
- Solution: Login again to get a fresh token

**Issue:** "404 Not Found" for /users/:id
- Solution: Check that the userId variable is set correctly

**Issue:** Token expired
- Solution: Run the Login request again

---

## Advanced Features

### Dynamic Variables

Use Postman's dynamic variables in your requests:

```json
{
  "email": "{{$randomEmail}}",
  "name": "{{$randomFullName}}",
  "password": "{{$randomPassword}}"
}
```

### Chain Requests

Use the "Send Request" feature in Tests:

```javascript
// After creating a task, get all tasks
pm.sendRequest({
    url: pm.environment.get("baseUrl") + "/tasks",
    method: "GET",
    header: {
        "Authorization": "Bearer " + pm.environment.get("token")
    }
}, (err, response) => {
    console.log("Tasks:", response.json());
});
```

---

**Happy Testing with Postman! 🚀**
