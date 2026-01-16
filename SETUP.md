# FashionDeck Local Development Setup

This guide will help you set up the FashionDeck development environment on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** >= 20.0.0
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** >= 10.0.0
   - Comes with Node.js
   - Verify: `npm --version`

3. **Python** 3.11
   - Download from: https://www.python.org/downloads/
   - Verify: `python --version` or `python3 --version`

4. **Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop
   - Verify: `docker --version` and `docker-compose --version`

5. **Git**
   - Download from: https://git-scm.com/
   - Verify: `git --version`

### Required API Keys

You'll need API keys for the following services:

1. **OpenAI** (for GPT-4o-mini)
   - Sign up at: https://platform.openai.com/
   - Get API key from: https://platform.openai.com/api-keys

2. **Anthropic** (for Claude 3 Haiku)
   - Sign up at: https://www.anthropic.com/
   - Get API key from: https://console.anthropic.com/

3. **Amazon Affiliate Program** (optional for MVP testing)
   - Sign up at: https://affiliate.amazon.in/

4. **Flipkart Affiliate Program** (optional for MVP testing)
   - Sign up at: https://affiliate.flipkart.com/

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd FashionDeck
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (apps and packages).

### 3. Set Up Environment Variables

Copy the example environment files and fill in your API keys:

```bash
# Root environment variables
cp .env.example .env

# Frontend environment variables
cp apps/web/.env.example apps/web/.env.local

# Backend API environment variables
cp apps/api/.env.example apps/api/.env

# ML Service environment variables
cp apps/ml-service/.env.example apps/ml-service/.env
```

**Important:** Edit each `.env` file and add your actual API keys!

### 4. Start Docker Services

Start PostgreSQL and Redis using Docker Compose:

```bash
docker-compose up -d
```

This will start:

- **PostgreSQL** with pgvector extension on port 5432
- **Redis** on port 6379

Verify services are running:

```bash
docker-compose ps
```

You should see both services with status "Up".

### 5. Verify Database Connection

Test PostgreSQL connection:

```bash
docker exec -it fashiondeck-postgres psql -U fashiondeck -d fashiondeck -c "SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';"
```

Expected output:

```
 extname | extversion
---------+------------
 vector  | 0.5.1
```

Test Redis connection:

```bash
docker exec -it fashiondeck-redis redis-cli ping
```

Expected output: `PONG`

### 6. Build Shared Packages

Build the shared TypeScript packages:

```bash
npm run build --filter=@fashiondeck/types
npm run build --filter=@fashiondeck/utils
```

### 7. Start Development Servers

Once the individual apps are implemented, you can start them:

```bash
# Start all services (when implemented)
npm run dev

# Or start individual services:
npm run dev --filter=@fashiondeck/web      # Frontend (port 3000)
npm run dev --filter=@fashiondeck/api      # Backend (port 3001)

# For ML service (Python), run from apps/ml-service:
cd apps/ml-service
uvicorn app.main:app --reload --port 8000
```

---

## 🔧 Development Workflow

### Project Structure

```
FashionDeck/
├── apps/
│   ├── web/              # Next.js frontend (port 3000)
│   ├── api/              # NestJS backend (port 3001)
│   └── ml-service/       # FastAPI ML service (port 8000)
├── packages/
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utilities
├── scripts/              # Database and utility scripts
├── docker-compose.yml    # Docker services configuration
└── .env                  # Environment variables
```

### Available Scripts

From the root directory:

```bash
npm run dev          # Start all services in development mode
npm run build        # Build all services
npm run test         # Run tests for all services
npm run lint         # Lint all services
npm run clean        # Clean all build artifacts
npm run format       # Format code with Prettier
```

### Making Changes

1. **Edit code** in any service (web, api, ml-service) or shared package
2. **Turborepo** automatically detects changes and rebuilds affected packages
3. **Hot reload** is enabled for all services during development
4. **Type safety** is enforced across all TypeScript services

---

## 🐛 Troubleshooting

### Docker Issues

**Problem:** Docker services won't start

```bash
# Check Docker is running
docker info

# Check for port conflicts
netstat -ano | findstr :5432
netstat -ano | findstr :6379

# Stop and remove all containers
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build
```

**Problem:** PostgreSQL connection refused

```bash
# Check PostgreSQL logs
docker logs fashiondeck-postgres

# Restart PostgreSQL
docker-compose restart postgres
```

**Problem:** Redis connection refused

```bash
# Check Redis logs
docker logs fashiondeck-redis

# Restart Redis
docker-compose restart redis
```

### Node.js Issues

**Problem:** `npm install` fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Build fails with TypeScript errors

```bash
# Clean Turborepo cache
npx turbo clean

# Rebuild shared packages
npm run build --filter=@fashiondeck/types
npm run build --filter=@fashiondeck/utils
```

### Python Issues

**Problem:** Python dependencies won't install

```bash
# Create virtual environment
cd apps/ml-service
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Problem:** CLIP model download fails

```bash
# Set model cache directory
export MODEL_CACHE_DIR=/path/to/cache

# Download model manually
python -c "import clip; clip.load('ViT-B/32')"
```

### Environment Variable Issues

**Problem:** API keys not working

1. Verify `.env` files exist in correct locations
2. Check for typos in API key names
3. Ensure no trailing spaces in API key values
4. Restart services after changing environment variables

### Port Conflicts

**Problem:** Port already in use

```bash
# Find process using port (Windows)
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in .env file
PORT=3002
```

---

## 📊 Monitoring Services

### Check Service Health

```bash
# PostgreSQL
docker exec -it fashiondeck-postgres pg_isready -U fashiondeck

# Redis
docker exec -it fashiondeck-redis redis-cli ping

# Backend API (when running)
curl http://localhost:3001/health

# ML Service (when running)
curl http://localhost:8000/health
```

### View Logs

```bash
# All Docker services
docker-compose logs -f

# Specific service
docker-compose logs -f postgres
docker-compose logs -f redis

# Node.js services (when running)
# Logs appear in terminal where you ran npm run dev
```

### Database Management

```bash
# Connect to PostgreSQL
docker exec -it fashiondeck-postgres psql -U fashiondeck -d fashiondeck

# Common PostgreSQL commands:
\dt              # List tables
\d+ products     # Describe products table
\q               # Quit

# Connect to Redis
docker exec -it fashiondeck-redis redis-cli

# Common Redis commands:
KEYS *           # List all keys
GET key_name     # Get value
FLUSHALL         # Clear all data (use with caution!)
```

---

## 🧹 Cleanup

### Stop Services

```bash
# Stop Docker services (keeps data)
docker-compose stop

# Stop and remove containers (keeps data volumes)
docker-compose down

# Stop and remove everything including volumes (DELETES ALL DATA)
docker-compose down -v
```

### Clean Build Artifacts

```bash
# Clean all build outputs
npm run clean

# Remove node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Clean Docker images
docker system prune -a
```

---

## 📚 Next Steps

Once your environment is set up:

1. **Phase 2:** Set up database migrations (see Tasks.md)
2. **Phase 3:** Implement NestJS backend API
3. **Phase 4:** Implement FastAPI ML service
4. **Phase 5:** Implement Next.js frontend

Refer to `Tasks.md` for the complete development roadmap.

---

## 🆘 Getting Help

- Check `README.md` for project overview
- Review `PRD.md` for product requirements
- See `Tasks.md` for development tasks
- Check `Prompts.md` for AI assistant guidance

For issues or questions, contact the development team.

---

**Happy Coding! 🚀**
