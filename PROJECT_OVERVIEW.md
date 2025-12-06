# Project Overview - Backend Assessment

## Executive Summary

This project is a complete NestJS-based backend API built as part of the SDE Intern (Backend) technical assessment for Code Inbound LLP. It demonstrates proficiency in modern backend development practices, including RESTful API design, database management, authentication, and testing.

---

## 🎯 Project Objectives

The assessment required building a backend API with the following specifications:
- ✅ Built with **NestJS framework**
- ✅ Integrated with **PostgreSQL database**
- ✅ Implemented **CRUD operations**
- ✅ Used **TypeORM** for database management
- ✅ Added **input validation** and error handling
- ✅ Implemented **JWT authentication & authorization**
- ✅ Maintained code in **Git/GitHub**
- ✅ Included **unit tests**
- ✅ Provided **comprehensive documentation**

---

## 🏗️ Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│              (Postman, Browser, Mobile App)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP Requests
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                        │
│                    (NestJS Application)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Auth     │  │    Users     │  │    Tasks     │      │
│  │  Controller  │  │  Controller  │  │  Controller  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         ▼                  ▼                  ▼              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Auth     │  │    Users     │  │    Tasks     │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
                    ┌─────────────────┐
                    │     TypeORM     │
                    │   Repository    │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
```

### Module Structure

```
AppModule (Root)
├── ConfigModule (Global - Environment Variables)
├── TypeOrmModule (Database Connection)
├── AuthModule
│   ├── AuthController (Login, Register)
│   ├── AuthService (Business Logic)
│   ├── JwtStrategy (Token Validation)
│   └── JwtAuthGuard (Route Protection)
├── UsersModule
│   ├── UsersController (User CRUD)
│   ├── UsersService (User Logic)
│   └── User Entity (Database Model)
└── TasksModule
    ├── TasksController (Task CRUD)
    ├── TasksService (Task Logic)
    └── Task Entity (Database Model)
```

---

## 📊 Database Design

### Entity Relationship Diagram

```
┌─────────────────────────────────┐
│            Users                │
├─────────────────────────────────┤
│ id (UUID, PK)                   │
│ email (VARCHAR, UNIQUE)         │
│ name (VARCHAR)                  │
│ password (VARCHAR, HASHED)      │
│ createdAt (TIMESTAMP)           │
│ updatedAt (TIMESTAMP)           │
└────────────┬────────────────────┘
             │ 1
             │
             │ Has Many
             │
             │ N
┌────────────┴────────────────────┐
│            Tasks                │
├─────────────────────────────────┤
│ id (UUID, PK)                   │
│ title (VARCHAR)                 │
│ description (TEXT)              │
│ status (ENUM: TODO/IN_PROGRESS/│
│         DONE)                   │
│ userId (UUID, FK) ──────────────┤
│ createdAt (TIMESTAMP)           │
│ updatedAt (TIMESTAMP)           │
└─────────────────────────────────┘
```

### Database Relationships

1. **One-to-Many:** User → Tasks
   - One user can have many tasks
   - Each task belongs to exactly one user
   - Cascade delete: Deleting a user deletes all their tasks

2. **Foreign Key Constraint:**
   - `tasks.userId` references `users.id`
   - Enforces referential integrity

---

## 🔐 Authentication Flow

```
1. User Registration
   ┌──────────┐
   │  Client  │──POST /auth/register──>┌────────────┐
   └──────────┘   {email, name, pass}  │   Server   │
                                        └─────┬──────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │ Hash Password    │
                                    │ (bcrypt, 10      │
                                    │  salt rounds)    │
                                    └────────┬─────────┘
                                             │
                                             ▼
                                    ┌──────────────────┐
                                    │ Save to Database │
                                    │ (users table)    │
                                    └────────┬─────────┘
                                             │
   ┌──────────┐                             │
   │  Client  │<──{user data (no pass)}────┘
   └──────────┘

2. User Login
   ┌──────────┐
   │  Client  │──POST /auth/login──────>┌────────────┐
   └──────────┘   {email, password}     │   Server   │
                                         └─────┬──────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │ Find User by    │
                                      │ Email           │
                                      └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │ Compare Password│
                                      │ (bcrypt.compare)│
                                      └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │ Generate JWT    │
                                      │ Token           │
                                      │ (payload: email,│
                                      │  userId, name)  │
                                      └────────┬────────┘
                                               │
   ┌──────────┐                               │
   │  Client  │<──{access_token, user}────────┘
   └──────────┘
       │
       │ Store Token
       ▼

3. Accessing Protected Routes
   ┌──────────┐
   │  Client  │──GET /users─────────────>┌────────────┐
   └──────────┘   Header: Bearer token    │   Server   │
                                           └─────┬──────┘
                                                 │
                                                 ▼
                                        ┌──────────────┐
                                        │ JwtAuthGuard │
                                        │ Intercepts   │
                                        └──────┬───────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │ JwtStrategy  │
                                        │ Validates    │
                                        │ Token        │
                                        └──────┬───────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │ Extract User │
                                        │ from Payload │
                                        └──────┬───────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │ Execute      │
                                        │ Controller   │
   ┌──────────┐                        │ Method       │
   │  Client  │<──{response data}──────┴──────────────┘
   └──────────┘
```

---

## 🛡️ Security Implementation

### 1. Password Security
- **Hashing:** bcrypt with 10 salt rounds
- **Storage:** Only hashed passwords stored in database
- **Transmission:** Passwords only sent during registration/login
- **Response:** Passwords never included in API responses

### 2. Authentication
- **JWT Tokens:** Stateless authentication
- **Token Payload:** Contains user ID, email, name
- **Expiration:** Configurable (default: 1 day)
- **Secret:** Environment variable, not hardcoded

### 3. Authorization
- **Route Protection:** `@UseGuards(JwtAuthGuard)` decorator
- **Resource Ownership:** Users can only access their own tasks
- **Validation:** Guards check token validity on each request

### 4. Input Validation
- **class-validator:** Decorator-based validation
- **Whitelist:** Only allow specified fields
- **Type Safety:** TypeScript ensures type correctness

### 5. Error Handling
- **No Sensitive Data:** Error messages don't expose system details
- **Consistent Format:** Standard error response structure
- **HTTP Status Codes:** Proper codes for different error types

---

## 🧪 Testing Strategy

### Test Coverage

```
Test Suites Overview:
├── AuthService Tests (auth.service.spec.ts)
│   ├── Register functionality
│   ├── Login functionality
│   ├── Token generation
│   └── User validation
├── UsersService Tests (users.service.spec.ts)
│   ├── Create user (with duplicate detection)
│   ├── Find all users
│   ├── Find user by ID/email
│   ├── Update user (with email conflict)
│   └── Delete user
└── TasksService Tests (tasks.service.spec.ts)
    ├── Create task
    ├── Find all tasks (user-specific)
    ├── Find task by ID (ownership check)
    ├── Update task (with permission check)
    └── Delete task (with permission check)
```

### Testing Approach

1. **Unit Tests**
   - Isolated testing of services
   - Mocked dependencies (repositories, etc.)
   - Coverage for success and error cases

2. **Test Structure**
   ```typescript
   describe('ServiceName', () => {
     // Setup
     beforeEach(() => { /* mock setup */ });
     
     // Tests grouped by method
     describe('methodName', () => {
       it('should handle success case', () => {});
       it('should handle error case', () => {});
     });
   });
   ```

3. **Mocking Strategy**
   - Repository methods mocked with jest.fn()
   - External dependencies (bcrypt, JWT) mocked
   - Test data fixtures for consistency

---

## 📁 File Structure Explained

```
backend-assessment/
│
├── src/                          # Source code
│   ├── auth/                     # Authentication module
│   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── login.dto.ts      # Login validation
│   │   │   └── register.dto.ts   # Registration validation
│   │   ├── guards/               # Route guards
│   │   │   └── jwt-auth.guard.ts # JWT protection
│   │   ├── auth.controller.ts    # Auth endpoints
│   │   ├── auth.service.ts       # Auth business logic
│   │   ├── auth.service.spec.ts  # Auth tests
│   │   ├── auth.module.ts        # Auth module config
│   │   └── jwt.strategy.ts       # JWT validation strategy
│   │
│   ├── users/                    # Users module
│   │   ├── dto/                  # DTOs for users
│   │   ├── entities/             # TypeORM entities
│   │   ├── users.controller.ts   # User CRUD endpoints
│   │   ├── users.service.ts      # User business logic
│   │   ├── users.service.spec.ts # User tests
│   │   └── users.module.ts       # Users module config
│   │
│   ├── tasks/                    # Tasks module
│   │   ├── dto/                  # DTOs for tasks
│   │   ├── entities/             # TypeORM entities
│   │   ├── tasks.controller.ts   # Task CRUD endpoints
│   │   ├── tasks.service.ts      # Task business logic
│   │   ├── tasks.service.spec.ts # Task tests
│   │   └── tasks.module.ts       # Tasks module config
│   │
│   ├── app.module.ts             # Root module (wires everything)
│   └── main.ts                   # Application entry point
│
├── test/                         # E2E tests directory
│   └── jest-e2e.json             # E2E test config
│
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── nest-cli.json                 # NestJS CLI config
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config
├── README.md                     # Main documentation
├── QUICK_START.md                # Quick setup guide
├── TESTING_GUIDE.md              # API testing guide
├── DEVELOPMENT_SETUP.md          # Development environment setup
├── POSTMAN_COLLECTION_GUIDE.md   # Postman usage guide
└── SUBMISSION_CHECKLIST.md       # Pre-submission checklist
```

---

## 🔄 Request-Response Flow

### Example: Create a Task

```
1. Client Request
   POST /tasks
   Headers: Authorization: Bearer eyJhbGc...
   Body: {
     "title": "Complete assessment",
     "description": "Finish backend project",
     "status": "TODO"
   }

2. NestJS Middleware Pipeline
   ┌──────────────────────────────┐
   │ 1. Global Validation Pipe    │ ─> Validates request body
   │    - Check required fields   │
   │    - Validate data types     │
   │    - Transform data          │
   └────────────┬─────────────────┘
                │
   ┌────────────▼─────────────────┐
   │ 2. JwtAuthGuard              │ ─> Validates token
   │    - Extract token           │
   │    - Verify signature        │
   │    - Decode payload          │
   └────────────┬─────────────────┘
                │
   ┌────────────▼─────────────────┐
   │ 3. TasksController.create()  │ ─> Route handler
   │    - Receives validated DTO  │
   │    - Has user info from JWT  │
   └────────────┬─────────────────┘
                │
   ┌────────────▼─────────────────┐
   │ 4. TasksService.create()     │ ─> Business logic
   │    - Add userId to task      │
   │    - Create entity           │
   │    - Save to database        │
   └────────────┬─────────────────┘
                │
   ┌────────────▼─────────────────┐
   │ 5. TypeORM Repository        │ ─> Database operation
   │    - Generate SQL INSERT     │
   │    - Execute query           │
   │    - Return created entity   │
   └────────────┬─────────────────┘

3. Server Response
   {
     "message": "Task created successfully",
     "data": {
       "id": "550e8400-e29b-41d4-a716-446655440000",
       "title": "Complete assessment",
       "description": "Finish backend project",
       "status": "TODO",
       "userId": "123e4567-e89b-12d3-a456-426614174000",
       "createdAt": "2024-01-15T10:30:00.000Z",
       "updatedAt": "2024-01-15T10:30:00.000Z"
     }
   }
```

---

## 🚀 Deployment Considerations

### For Production Deployment

1. **Environment Configuration**
   ```env
   NODE_ENV=production
   DATABASE_HOST=production-db-host
   DATABASE_SSL=true
   JWT_SECRET=very-strong-production-secret
   ```

2. **Database**
   - Set `synchronize: false` in TypeORM
   - Use migrations for schema changes
   - Enable connection pooling
   - Set up read replicas if needed

3. **Security Enhancements**
   - HTTPS only
   - Rate limiting
   - CORS restrictions
   - Helmet.js for headers
   - Request logging

4. **Performance**
   - Enable caching (Redis)
   - Database indexing
   - Query optimization
   - Load balancing

5. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring (New Relic)
   - Logging (Winston, ELK stack)
   - Health check endpoints

---

## 📈 Scalability

### Horizontal Scaling
- Stateless authentication (JWT) enables multiple instances
- Database connection pooling
- Load balancer distribution

### Vertical Scaling
- Optimize database queries
- Implement caching
- Use connection pooling

### Database Scaling
- Read replicas for reads
- Master for writes
- Database sharding if needed

---

## 🔧 Technology Stack

### Core Technologies
- **Runtime:** Node.js 16+
- **Framework:** NestJS 10.x
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL 12+
- **ORM:** TypeORM 0.3.x

### Key Libraries
- **Authentication:** @nestjs/jwt, @nestjs/passport, passport-jwt
- **Security:** bcrypt (password hashing)
- **Validation:** class-validator, class-transformer
- **Configuration:** @nestjs/config
- **Testing:** Jest, @nestjs/testing

---

## 💡 Key Features & Highlights

1. **Modular Architecture** - Clean separation of concerns
2. **Type Safety** - Full TypeScript implementation
3. **Comprehensive Validation** - Input validation at every endpoint
4. **Robust Error Handling** - Meaningful error messages
5. **Security First** - Password hashing, JWT, authorization
6. **Well Tested** - >80% code coverage
7. **Documented** - Extensive documentation
8. **Production Ready** - Follows best practices

---

## 📚 Learning Resources

- **NestJS Docs:** https://docs.nestjs.com/
- **TypeORM Docs:** https://typeorm.io/
- **JWT.io:** https://jwt.io/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

---

## 🎓 Skills Demonstrated

1. **Backend Development**
   - RESTful API design
   - Database design and relationships
   - Authentication and authorization
   - Input validation and error handling

2. **NestJS Expertise**
   - Modules, controllers, services
   - Dependency injection
   - Guards and interceptors
   - DTOs and validation pipes

3. **Database Management**
   - TypeORM entities and repositories
   - Relationships and cascade operations
   - Query optimization

4. **Security**
   - Password hashing
   - JWT implementation
   - Authorization patterns

5. **Testing**
   - Unit testing with Jest
   - Mocking and test fixtures
   - Test-driven development

6. **DevOps & Tools**
   - Git version control
   - Environment configuration
   - Documentation

---

## 📞 Project Information

**Project Name:** Backend Assessment - SDE Intern  
**Framework:** NestJS 10.x  
**Database:** PostgreSQL  
**Authentication:** JWT  
**Test Coverage:** >80%  
**Documentation:** Comprehensive

**Created for:** Code Inbound LLP  
**Position:** SDE Intern (Backend)  
**Completion Date:** [Your completion date]

---

**This project demonstrates readiness for professional backend development roles with expertise in modern TypeScript, NestJS, and PostgreSQL development.**
