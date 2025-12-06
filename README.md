# Backend Assessment - SDE Intern (Backend)

A comprehensive NestJS-based REST API with PostgreSQL, TypeORM, JWT authentication, and complete test coverage. Built as part of the technical assessment for Code Inbound LLP.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## 🚀 Features

- ✅ **CRUD Operations** - Complete Create, Read, Update, Delete functionality for Users and Tasks
- ✅ **JWT Authentication & Authorization** - Secure token-based authentication system
- ✅ **Input Validation** - Comprehensive validation using class-validator and class-transformer
- ✅ **Error Handling** - Proper error handling with meaningful error messages
- ✅ **PostgreSQL with TypeORM** - Database management with TypeORM ORM
- ✅ **Unit Tests** - Comprehensive test coverage for all services
- ✅ **Clean Architecture** - Well-structured, maintainable, and scalable code
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Security** - Password hashing with bcrypt, JWT tokens, and protected routes
- ✅ **Relationship Management** - User-Task relationship with foreign keys

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/backend-assessment.git
   cd backend-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=backend_assessment

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=1d

# Application Port
PORT=3000
```

**Important:** Replace `your_password` and `JWT_SECRET` with your actual values.

## 🗄️ Database Setup

1. **Create PostgreSQL Database**
   ```bash
   psql -U postgres
   ```

   ```sql
   CREATE DATABASE backend_assessment;
   \q
   ```

2. **Database Tables** will be created automatically when you run the application (TypeORM synchronization is enabled in development).

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The application will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### User Endpoints (Protected)

> **Note:** All user endpoints require Bearer token authentication.
> Add header: `Authorization: Bearer <your_access_token>`

#### 3. Get All Users
```http
GET /users
Authorization: Bearer <access_token>
```

#### 4. Get User by ID
```http
GET /users/:id
Authorization: Bearer <access_token>
```

#### 5. Update User
```http
PATCH /users/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### 6. Delete User
```http
DELETE /users/:id
Authorization: Bearer <access_token>
```

#### 7. Get Current User Profile
```http
GET /users/profile/me
Authorization: Bearer <access_token>
```

### Task Endpoints (Protected)

> **Note:** All task endpoints require Bearer token authentication.

#### 8. Create Task
```http
POST /tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Complete Backend Assessment",
  "description": "Build a NestJS API with PostgreSQL and JWT authentication",
  "status": "TODO"
}
```

**Status Options:** `TODO`, `IN_PROGRESS`, `DONE`

#### 9. Get All Tasks
```http
GET /tasks
Authorization: Bearer <access_token>
```

#### 10. Get Task by ID
```http
GET /tasks/:id
Authorization: Bearer <access_token>
```

#### 11. Update Task
```http
PATCH /tasks/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Task Title",
  "status": "IN_PROGRESS"
}
```

#### 12. Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <access_token>
```

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
```

### Run Tests with Coverage
```bash
npm run test:cov
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage Report
After running `npm run test:cov`, open `coverage/lcov-report/index.html` in your browser to view the detailed coverage report.

## 📁 Project Structure

```
backend-assessment/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts
│   │   └── jwt.strategy.ts
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── users.service.spec.ts
│   ├── tasks/
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts
│   │   │   └── update-task.dto.ts
│   │   ├── entities/
│   │   │   └── task.entity.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.module.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.service.spec.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── .env
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Technologies Used

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[TypeORM](https://typeorm.io/)** - ORM for TypeScript and JavaScript
- **[JWT](https://jwt.io/)** - JSON Web Tokens for authentication
- **[Passport](http://www.passportjs.org/)** - Authentication middleware
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[class-validator](https://github.com/typestack/class-validator)** - Decorator-based validation
- **[class-transformer](https://github.com/typestack/class-transformer)** - Object transformation
- **[Jest](https://jestjs.io/)** - Testing framework

## 🔒 Security Features

1. **Password Hashing** - All passwords are hashed using bcrypt with salt rounds of 10
2. **JWT Authentication** - Stateless authentication using JSON Web Tokens
3. **Protected Routes** - Sensitive endpoints are protected with JWT guards
4. **Input Validation** - All inputs are validated using class-validator decorators
5. **Error Handling** - Proper error messages without exposing sensitive information
6. **Authorization** - Users can only access and modify their own resources (tasks)

## 📝 Key Implementation Highlights

### 1. **Validation**
- Email format validation
- Password minimum length enforcement
- Required field validation
- Custom error messages

### 2. **Error Handling**
- NotFoundException for missing resources
- ConflictException for duplicate entries
- ForbiddenException for unauthorized access
- UnauthorizedException for invalid credentials
- InternalServerErrorException for server errors

### 3. **Database Relationships**
- One-to-Many relationship between Users and Tasks
- Cascade delete (when a user is deleted, their tasks are also deleted)
- Foreign key constraints

### 4. **Authentication Flow**
1. User registers with email, name, and password
2. Password is hashed and stored securely
3. User logs in with credentials
4. JWT token is generated and returned
5. Token is used for subsequent requests
6. Token is validated on each protected route

### 5. **Testing Strategy**
- Unit tests for all services
- Mocked dependencies for isolation
- Test coverage for success and error cases
- Proper test cleanup with beforeEach hooks

## 🚀 Deployment Considerations

For production deployment:

1. Set `synchronize: false` in TypeORM config
2. Use environment-specific configuration files
3. Set strong JWT secret
4. Enable HTTPS
5. Add rate limiting
6. Add logging (Winston/Pino)
7. Add API documentation (Swagger)
8. Set up proper CORS policies
9. Use connection pooling for database
10. Add health check endpoints


This project is created for assessment purposes for Code Inbound LLP.


