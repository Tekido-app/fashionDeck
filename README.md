# FashionDeck

> AI-powered fashion outfit recommendation platform

FashionDeck enables users to input natural language prompts (e.g., "korean minimal fit, size M, under ₹1500") and receive 2–6 curated outfits composed of purchasable products from Amazon and Flipkart, with outbound affiliate checkout links.

## 🏗️ Architecture

This is a **monorepo** managed by [Turborepo](https://turbo.build/) with the following structure:

```
fashiondeck/
├── apps/
│   ├── web/              # Next.js 14 frontend (App Router)
│   ├── api/              # NestJS backend API
│   └── ml-service/       # FastAPI ML microservice (Python)
├── packages/
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utilities
├── package.json          # Root package.json with workspaces
├── turbo.json            # Turborepo configuration
└── docker-compose.yml    # Local development environment
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: NestJS, TypeScript, PostgreSQL, Redis
- **ML Service**: FastAPI, Python 3.11, OpenCLIP, GPT-4o-mini, Claude 3 Haiku
- **Database**: PostgreSQL 15 with pgvector extension
- **Cache**: Redis 7
- **Monorepo**: Turborepo with npm workspaces

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Python** 3.11 (for ML service)
- **Docker** & **Docker Compose** (for local development)
- **Git**

## 🚀 Getting Started

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

Create `.env` files for each service:

```bash
# Backend API (.env in apps/api/)
cp apps/api/.env.example apps/api/.env

# ML Service (.env in apps/ml-service/)
cp apps/ml-service/.env.example apps/ml-service/.env

# Frontend (.env.local in apps/web/)
cp apps/web/.env.example apps/web/.env.local
```

Fill in the required environment variables (API keys, database URLs, etc.).

### 4. Start Local Development Environment

Using Docker Compose (recommended):

```bash
docker-compose up
```

This will start:
- PostgreSQL with pgvector (port 5432)
- Redis (port 6379)
- Backend API (port 3001)
- ML Service (port 8000)

### 5. Run Development Servers

In separate terminals:

```bash
# Start all services in development mode
npm run dev

# Or start individual services:
npm run dev --filter=@fashiondeck/web      # Frontend only
npm run dev --filter=@fashiondeck/api      # Backend only
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **ML Service**: http://localhost:8000/docs (FastAPI auto-generated docs)

## 📦 Available Scripts

From the root directory:

```bash
npm run dev          # Start all services in development mode
npm run build        # Build all services
npm run test         # Run tests for all services
npm run lint         # Lint all services
npm run clean        # Clean all build artifacts and node_modules
npm run format       # Format code with Prettier
```

## 🏃 Development Workflow

1. **Make changes** to any service (web, api, ml-service) or shared package (types, utils)
2. **Turborepo** automatically detects changes and rebuilds affected packages
3. **Hot reload** is enabled for all services during development
4. **Type safety** is enforced across all TypeScript services

## 📚 Documentation

- [PRD.md](./PRD.md) - Product Requirements Document
- [Tasks.md](./Tasks.md) - Development task breakdown
- [Prompts.md](./Prompts.md) - AI assistant execution prompts

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific service
npm run test --filter=@fashiondeck/api
```

## 🚢 Deployment

- **Frontend**: Vercel
- **Backend API**: Railway
- **ML Service**: Railway
- **Database**: Railway (PostgreSQL with pgvector)
- **Cache**: Railway (Redis)

See deployment documentation in each service's README.

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ by the FashionDeck Team**
