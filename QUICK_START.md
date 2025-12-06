

## Step 1: Clone and Install (1 minute)

```bash
# Clone the repository
git clone <your-repo-url>
cd backend-assessment

# Install dependencies
npm install
```

## Step 2: Database Setup (2 minutes)

### Create PostgreSQL Database

**Option A: Using psql command line**
```bash
psql -U postgres
```

Then run:
```sql
CREATE DATABASE backend_assessment;
\q
```

**Option B: Using pgAdmin**
1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" → "Database"
4. Name it `backend_assessment`
5. Click "Save"

## Step 3: Configure Environment (1 minute)

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and update your PostgreSQL credentials:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_actual_password_here
DATABASE_NAME=backend_assessment

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRATION=1d

PORT=3000
```

**Important:** Replace `your_actual_password_here` with your PostgreSQL password!

## Step 4: Run the Application (1 minute)

```bash
npm run start:dev
```

You should see:
```
🚀 Application is running on: http://localhost:3000
```

## Step 5: Test the API (1 minute)

### Quick Test with cURL

**Register a user:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Copy the `access_token` from the response and use it in the next request:

**Get all users:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

## ✅ You're All Set!

Your API is now running. Here's what you can do next:

1. **Read the full API documentation:** Check `README.md`
2. **Test all endpoints:** Use `TESTING_GUIDE.md`
3. **Run unit tests:** `npm run test`
4. **View test coverage:** `npm run test:cov`

## 🔥 Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solution:** 
- Check PostgreSQL is running: `sudo service postgresql status` (Linux) or check Services (Windows)
- Verify your .env credentials are correct
- Make sure the database `backend_assessment` exists

### Issue: "Port 3000 is already in use"
**Solution:** 
- Change the PORT in your .env file to 3001 or another available port
- Or kill the process using port 3000

### Issue: "Module not found" errors
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tests failing
**Solution:** 
```bash
# Make sure dependencies are installed
npm install

# Try running specific test
npm run test -- users.service.spec.ts
```

## 📚 Available Scripts

```bash
# Development
npm run start:dev      # Run with hot reload

# Production
npm run build          # Build the project
npm run start:prod     # Run production build

# Testing
npm run test           # Run unit tests
npm run test:cov       # Run tests with coverage
npm run test:watch     # Run tests in watch mode

# Code Quality
npm run lint           # Check code style
npm run format         # Format code
```


