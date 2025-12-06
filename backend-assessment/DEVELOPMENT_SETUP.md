# Development Setup Guide

Complete guide for setting up the development environment from scratch.

## Table of Contents
1. [Prerequisites Installation](#prerequisites-installation)
2. [PostgreSQL Setup](#postgresql-setup)
3. [Project Setup](#project-setup)
4. [IDE Configuration](#ide-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites Installation

### 1. Install Node.js

**Windows:**
1. Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)
2. Run the installer
3. Verify installation:
   ```bash
   node --version  # Should show v16+ or v18+
   npm --version   # Should show 8.x or higher
   ```

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### 2. Install PostgreSQL

**Windows:**
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Remember the password you set for the `postgres` user!
4. Default port is 5432
5. Install pgAdmin (comes with installer) for GUI management

**macOS:**
```bash
# Using Homebrew
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14

# Or start manually
pg_ctl -D /usr/local/var/postgres start
```

**Linux (Ubuntu/Debian):**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user
sudo -i -u postgres
```

**Verify PostgreSQL Installation:**
```bash
psql --version  # Should show PostgreSQL 12+ or higher
```

### 3. Install Git

**Windows:**
- Download from [git-scm.com](https://git-scm.com/)
- Run installer (use default settings)

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git
```

**Verify:**
```bash
git --version
```

### 4. Install a Code Editor

Recommended: **Visual Studio Code**
- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Install these extensions:
  - ESLint
  - Prettier
  - TypeScript Hero
  - REST Client (optional, for testing)

---

## PostgreSQL Setup

### 1. Access PostgreSQL

**Windows:**
- Use pgAdmin (installed with PostgreSQL)
- Or use psql from Command Prompt:
  ```bash
  psql -U postgres
  ```

**macOS/Linux:**
```bash
# Connect as postgres user
sudo -u postgres psql

# Or if you set up a user account
psql -U your_username
```

### 2. Create Database

```sql
-- Create the database
CREATE DATABASE backend_assessment;

-- Verify it was created
\l

-- Connect to it
\c backend_assessment

-- Exit
\q
```

### 3. Create User (Optional but Recommended)

```sql
-- Create a new user
CREATE USER backend_dev WITH PASSWORD 'dev_password_123';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE backend_assessment TO backend_dev;

-- Grant schema permissions
\c backend_assessment
GRANT ALL ON SCHEMA public TO backend_dev;
```

### 4. Test Connection

```bash
# Test with psql
psql -U postgres -d backend_assessment -h localhost -p 5432

# If using custom user
psql -U backend_dev -d backend_assessment -h localhost -p 5432
```

If you can connect successfully, you're ready!

---

## Project Setup

### 1. Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/yourusername/backend-assessment.git

# Navigate to project
cd backend-assessment
```

### 2. Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - NestJS core packages
# - TypeORM and PostgreSQL driver
# - JWT and Passport for authentication
# - Validation packages
# - Testing frameworks
```

**Expected output:** Should complete without errors, might show some warnings (that's okay).

### 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Open .env in your editor
code .env  # If using VS Code
# or
nano .env  # On Linux/macOS
# or
notepad .env  # On Windows
```

**Update these values:**
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres  # Or your custom user
DATABASE_PASSWORD=your_actual_password_here  # IMPORTANT!
DATABASE_NAME=backend_assessment

JWT_SECRET=generate-a-random-secret-here  # See below for generation
JWT_EXPIRATION=1d

PORT=3000
```

**Generate JWT Secret:**
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Online (not recommended for production)
# Use a password generator to create a 64-character random string
```

### 4. Verify Configuration

```bash
# Run a build to check for TypeScript errors
npm run build

# Should complete with:
# ✔ Successfully compiled X files with Typescript
```

### 5. Start the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# You should see:
# [Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
# [Nest] 12345  - 01/15/2024, 10:00:01 AM     LOG [InstanceLoader] AppModule dependencies initialized
# ...
# 🚀 Application is running on: http://localhost:3000
```

**Troubleshooting startup:**
- **Port in use:** Change PORT in .env
- **Database connection failed:** Check credentials in .env
- **Module not found:** Run `npm install` again

### 6. Verify Database Tables

```bash
# Connect to PostgreSQL
psql -U postgres -d backend_assessment

# List tables
\dt

# You should see:
#              List of relations
#  Schema |     Name      | Type  |  Owner
# --------+---------------+-------+----------
#  public | users         | table | postgres
#  public | tasks         | table | postgres
```

### 7. Run Tests

```bash
# Run all unit tests
npm run test

# Should show:
# PASS  src/users/users.service.spec.ts
# PASS  src/tasks/tasks.service.spec.ts
# PASS  src/auth/auth.service.spec.ts
#
# Test Suites: 3 passed, 3 total
# Tests:       XX passed, XX total

# Run with coverage
npm run test:cov

# Coverage report will be in coverage/lcov-report/index.html
```

---

## IDE Configuration

### Visual Studio Code Setup

**1. Install Extensions:**
- ESLint: Linting JavaScript/TypeScript
- Prettier: Code formatting
- TypeScript Hero: Import management
- REST Client: Test APIs directly in VS Code

**2. Create `.vscode/settings.json`:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

**3. Create `.vscode/launch.json` for debugging:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NestJS",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:debug"],
      "console": "integratedTerminal",
      "restart": true,
      "protocol": "inspector",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

**4. Create `.vscode/tasks.json`:**
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: start:dev",
      "type": "npm",
      "script": "start:dev",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

---

## Development Workflow

### Daily Development

```bash
# 1. Start the day
git pull origin main  # Get latest changes
npm install           # Update dependencies if needed
npm run start:dev     # Start development server

# 2. Make changes
# Edit files in src/

# 3. Test your changes
# API automatically reloads on file save

# 4. Run tests
npm run test          # Unit tests
npm run test:cov      # With coverage

# 5. Commit changes
git add .
git commit -m "feat: add feature description"
git push origin main
```

### Creating New Modules

```bash
# Generate a new module
nest generate module products
nest generate controller products
nest generate service products

# Generate a complete resource
nest generate resource products
```

### Database Changes

When you modify entities:
1. Change the entity file
2. Save the file
3. Application auto-reloads
4. TypeORM synchronize creates/updates tables

**⚠️ Warning:** Set `synchronize: false` in production!

---

## Troubleshooting

### Common Issues

#### 1. "Cannot connect to database"

**Check PostgreSQL is running:**
```bash
# Windows (Services)
services.msc  # Look for "postgresql" service

# macOS
brew services list
# or
pg_ctl status

# Linux
sudo systemctl status postgresql
```

**Start PostgreSQL:**
```bash
# macOS
brew services start postgresql@14

# Linux
sudo systemctl start postgresql
```

**Verify credentials:**
```bash
psql -U postgres -d backend_assessment -h localhost -p 5432
# Enter your password
```

#### 2. "Port 3000 already in use"

```bash
# Option 1: Change port in .env
PORT=3001

# Option 2: Find and kill the process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

#### 3. "Module not found" errors

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. TypeScript compilation errors

```bash
# Clean build
rm -rf dist
npm run build
```

#### 5. Tests failing

```bash
# Clear Jest cache
npm run test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
```

#### 6. Git issues

```bash
# Reset local changes
git reset --hard origin/main

# Clean untracked files
git clean -fd
```

---

## Best Practices

### 1. Environment Variables
- Never commit `.env` file
- Always use `.env.example` as template
- Use different values for dev/prod

### 2. Git Commits
- Use meaningful commit messages
- Commit frequently
- Follow convention: `feat:`, `fix:`, `docs:`, `test:`

### 3. Code Style
- Run `npm run lint` before committing
- Use Prettier for formatting
- Follow NestJS naming conventions

### 4. Testing
- Write tests for new features
- Maintain >80% coverage
- Run tests before pushing

### 5. Database
- Back up data before major changes
- Use migrations in production
- Never use `synchronize: true` in production

---

## Additional Tools

### Optional but Useful

**1. Postman or Insomnia**
- For API testing
- Download from official websites

**2. pgAdmin**
- GUI for PostgreSQL
- Comes with PostgreSQL installer

**3. Docker (Advanced)**
```bash
# Run PostgreSQL in Docker
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=dev123 \
  -e POSTGRES_DB=backend_assessment \
  -p 5432:5432 \
  -d postgres:14
```

**4. NestJS CLI globally**
```bash
npm install -g @nestjs/cli
```

---

## Next Steps

1. ✅ Complete this setup
2. 📖 Read the main `README.md`
3. 🧪 Follow the `TESTING_GUIDE.md`
4. 📋 Review `SUBMISSION_CHECKLIST.md`

---

## Support

If you encounter issues:
1. Check the error message carefully
2. Search in this guide
3. Check official docs:
   - [NestJS](https://docs.nestjs.com/)
   - [TypeORM](https://typeorm.io/)
   - [PostgreSQL](https://www.postgresql.org/docs/)

---

**You're all set! Happy coding! 🚀**
