# **1. PRODUCT OVERVIEW**

The product enables users to input natural language prompts (e.g., “korean minimal fit, size M, under 1500”) and receive 2–6 curated outfits composed of purchasable products from Amazon and Flipkart, with outbound affiliate checkout links.

Our app turns natural language style requests into complete, shoppable outfits. Instead of scrolling through endless product grids on Amazon or Flipkart, users simply describe the vibe they want — like “korean minimal fit, size M, under 1500” — and the app returns curated outfits they can purchase immediately through affiliate links.

---

# **2. GOALS & NON-GOALS**

### **2.1 Goals**

MVP must:

1. Ingest user natural language.
2. Parse intent using LLM into structured JSON.
3. Query Amazon & Flipkart for item candidates.
4. Assemble full outfits (top + bottom + optional shoes/accessories).
5. Score and rank outfits via embeddings + LLM scoring.
6. Display products with outbound affiliate purchase links.
7. Respond within **≤ 7 seconds** average latency.

### **2.2 Non-Goals**

MVP will NOT support:

- In-app checkout
- User accounts / profiles / size storage
- Creator boards
- Wardrobe uploads
- International retailers
- Admin panel
- Social features

---

# **3. USER STORIES & FLOWS**

### **3.1 Primary User Story**

“As a fashion consumer, I want to type the vibe I want, and instantly get complete outfits I can buy.”

### **3.2 User Flow (UI-level)**

```
Landing → Prompt Input → Backend Processing → Outfit Cards → Outbound Links → Purchase on Marketplace
```

### **3.3 Detailed Sequence**

1. User visits web app.
2. Types natural language prompt.
3. Frontend sends POST to /api/query.
4. Backend calls ML microservice for parsing.
5. Backend fetches product candidates (Amazon + Flipkart).
6. Backend calls ML microservice for planning + scoring.
7. Backend returns structured outfits.
8. UI renders outfits and outbound affiliate links.

---

# **4. FUNCTIONAL REQUIREMENTS**

### **4.1 Input Requirements**

MVP must accept:

- Aesthetic (korean, y2k, minimal, vintage, streetwear…)
- Optional budget (numeric)
- Optional size (S/M/L/XL)
- Optional gender
- Optional occasion (“party”, “date”, “office”, etc.)

### **4.2 Output Requirements**

System must output:

- 2–6 “Outfit Objects”
- Each outfit includes:

  - Categories (top, bottom, optional shoes/accessories)
  - Product images
  - Titles
  - Prices
  - Affiliate links
  - Marketplace name
  - Total calculated price
  - Aesthetic label

Example:

```
{
 "aesthetic":"korean minimal",
 "items":[{...},{...}],
 "total_price":1420,
 "links": { "top": "...", "bottom":"..." }
}
```

### **4.3 Performance**

- p95 latency: ≤ 7 seconds
- Uptime target: 99%
- Product fetch TTL cache: 1–12 hrs

---

# **5. SYSTEM ARCHITECTURE**

### **5.1 High-Level Diagram**

```
[Web Frontend]
     ↓
[Backend API (Node.js)]
     ↓         ↘
[ML Microservice] → [PostgreSQL + pgvector]
     ↓ (parallel)
[Marketplace Adapters]
     ↓
[Amazon / Flipkart]
```

**Note**: Marketplace fetching runs in parallel with LLM planning to reduce latency.

### **5.2 Service Breakdown**

1. **Frontend (Next.js)**

- Prompt page
- Outfit listing page
- Static landing page

2. **Backend API (Node.js + NestJS)**
   Responsibilities:

- Auth (none MVP)
- NLP service orchestration
- Product retrieval pipeline
- Outfit scoring orchestration
- Response formatting

3. **ML Microservice (Python + FastAPI)**
   Responsibilities:

- Prompt → structured JSON parsing (LLM)
- Aesthetic → outfit schema planning (LLM)
- Embedding scoring (CLIP / OpenCLIP)
- Outfit coherence scoring (LLM)
- Ranking & curation

4. **PostgreSQL with pgvector Extension**
   Single database stores:

- Product metadata
- Affiliate links
- Image embeddings (vector)
- Text embeddings (vector)
- Brand/style tags
- Query logs (optional)

5. **Cache (Redis)**
   Used for:

- TTL caching product results
- Popular prompt pattern caching
- Session management
- Message queue (BullMQ) for background jobs

---

# **6. TECH STACK DECISIONS**

### **6.1 Monorepo Setup**

- **Monorepo Tool**: **Turborepo**
- **Package Manager**: **npm workspaces**
- **Shared Packages**: TypeScript types, utilities, constants
- **Benefits**: Type safety across services, atomic deployments, single source of truth

### **6.2 Frontend**

- Framework: **Next.js 14 (App Router)**
- Language: **TypeScript**
- Styling: **TailwindCSS**
- UI Lib: **HeadlessUI / Radix**
- Deployment: **Vercel**
- Features: SSR, ISR for landing pages, streaming responses

### **6.3 Backend API**

- Runtime: **Node.js 20 + TypeScript**
- Framework: **NestJS**
- HTTP: **REST**
- Queue: **BullMQ (Redis-backed)**
- Deployment: **Railway**

### **6.4 ML Microservice**

- Language: **Python 3.11**
- Framework: **FastAPI**
- Embeddings: **OpenCLIP / CLIP-ViT**
- LLM Strategy:
  - Parsing: **GPT-4o-mini** (cost-effective)
  - Planning: **GPT-4o-mini**
  - Scoring: **Claude 3 Haiku** (better ranking)
- Deployment: **Railway / Modal**

### **6.5 Storage**

- **PostgreSQL 15** with **pgvector extension**
  - Product metadata + embeddings in one DB
  - ACID transactions
  - Simpler ops than separate vector DB
- **Redis 7**
  - Caching layer
  - Message queue backend
  - Session storage (future)

### **6.6 Automation**

- CI/CD: **GitHub Actions**
- Containerization: **Docker + Docker Compose (local dev)**
- Observability: **Sentry (errors) + Structured logging**
- Feature Flags: **Vercel Feature Flags** (A/B testing)

---

# **7. DATA INGESTION & MARKETPLACE ADAPTERS**

### **7.1 Sources**

- **Amazon India**
- **Flipkart India**

### **7.2 Retrieval Method**

Hybrid approach:

1. Affiliate APIs (where available)
2. Search endpoints
3. HTML scraping (fallback)

### **7.3 Adapter Interface**

Each marketplace adapter must implement:

```
interface MarketplaceAdapter {
  search(query: SearchQuery): Promise<ProductResult[]>
  getDetails(productId: string): Promise<ProductDetail>
  generateAffiliateLink(productUrl: string): string
}
```

### **7.4 ProductResult Schema**

```
{
 "id": string,
 "title": string,
 "price": number,
 "image": string,
 "productUrl": string,
 "affiliateUrl": string,
 "sizes": ["S","M","L"],
 "category": string
}
```

---

# **8. ML & ALGORITHMS (MODE C)**

### **8.1 Step 1 — Prompt Parsing (LLM)**

Input:

```
"need korean minimal outfit size M under 1500"
```

Output JSON:

```
{
 "aesthetic": "korean minimal",
 "budget": 1500,
 "size": "M",
 "gender": "unisex",
 "occasion": null,
 "categories": ["top","bottom"]
}
```

### **8.2 Step 2 — Planning (LLM)**

LLM generates schema:

```
["oversized t-shirt", "straight pants", "white sneakers"]
```

### **8.3 Step 3 — Retrieval (Backend)**

Backend fetches 10–40 candidates/category.

### **8.4 Step 4 — Embedding Scoring**

Compute:

- image → embedding
- text → embedding

Calculate:

- style similarity
- color cohesion
- silhouette match

### **8.5 Step 5 — LLM Coherence & Ranking**

LLM scores outfits 1–10.

LLM scoring prompt sample:

```
Given the 'korean minimal' aesthetic and the following items,
score from 1-10 based on color coherence, silhouette matching,
and trend alignment:
...
```

Final sorted list returned to backend.

---

# **9. API DESIGN**

### **9.1 POST /api/query**

#### **Request**

```
{
 "prompt": "korean minimal fit size M under 1500"
}
```

#### **Response**

```
{
 "outfits":[
   {
    "aesthetic":"korean minimal",
    "totalPrice":1398,
    "items":[
      { "category":"top", "title":"...", "image":"...", "price":499, "url":"..." },
      { "category":"bottom", "title":"...", "image":"...", "price":899, "url":"..." }
    ]
   }
 ]
}
```

---

# **10. FRONTEND SPEC**

### **Pages**

- `/` — Landing
- `/search` — Prompt input + results

### **Components**

- PromptInput
- OutfitCard
- ItemCard
- MarketplaceBadge

### **Interactions**

- Enter prompt → call /api/query
- Show loading skeleton
- Render outfit list
- On click → redirect to affiliate URL

---

# **11. MONOREPO FOLDER STRUCTURE**

```
fashiondeck/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   └── lib/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── marketplace/
│   │   │   │   ├── outfit/
│   │   │   │   ├── query/
│   │   │   │   └── ml/
│   │   │   ├── common/
│   │   │   └── config/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── ml-service/             # FastAPI ML service
│       ├── app/
│       │   ├── main.py
│       │   ├── routes/
│       │   ├── services/
│       │   ├── embeddings/
│       │   └── prompts/
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   ├── types/                  # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── outfit.ts
│   │   │   ├── product.ts
│   │   │   └── query.ts
│   │   └── package.json
│   │
│   └── utils/                  # Shared utilities
│       ├── src/
│       └── package.json
│
├── package.json                # Root package.json
├── turbo.json                  # Turborepo config
├── docker-compose.yml          # Local dev environment
└── .github/
    └── workflows/
        └── deploy.yml          # CI/CD pipeline
```

### **11.1 Shared Types Package**

```typescript
// packages/types/src/outfit.ts
export interface Outfit {
  aesthetic: string;
  totalPrice: number;
  items: ProductItem[];
}

export interface ProductItem {
  category: "top" | "bottom" | "shoes" | "accessories";
  title: string;
  price: number;
  image: string;
  url: string;
  affiliateUrl: string;
  marketplace: "amazon" | "flipkart";
}
```

Used across frontend, backend, and ML service for type safety.

---

# **13. DATABASE SCHEMAS**

### **products**

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marketplace VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  sizes JSONB,
  category VARCHAR(50) NOT NULL,
  image_url TEXT,
  image_embedding vector(512),  -- pgvector
  text_embedding vector(512),   -- pgvector
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON products USING ivfflat (image_embedding vector_cosine_ops);
CREATE INDEX ON products USING ivfflat (text_embedding vector_cosine_ops);
```

**Note**: Using pgvector eliminates need for separate vector database.

---

# **14. DEPLOYMENT ARCHITECTURE**

### **14.1 Platform Mapping**

| Service     | Platform | Config                                   |
| ----------- | -------- | ---------------------------------------- |
| Frontend    | Vercel   | Root Dir: `apps/web`                     |
| Backend API | Railway  | Dockerfile: `apps/api/Dockerfile`        |
| ML Service  | Railway  | Dockerfile: `apps/ml-service/Dockerfile` |
| PostgreSQL  | Railway  | Managed PostgreSQL + pgvector            |
| Redis       | Railway  | Managed Redis                            |

### **14.2 CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-web:
    if: contains(github.event.head_commit.modified, 'apps/web')
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          working-directory: apps/web

  deploy-api:
    if: contains(github.event.head_commit.modified, 'apps/api')
    runs-on: ubuntu-latest
    steps:
      - uses: bervProject/railway-deploy@main
        with:
          service: api
```

### **14.3 Local Development**

```yaml
# docker-compose.yml
services:
  postgres:
    image: ankane/pgvector:latest
    environment:
      POSTGRES_DB: fashiondeck
      POSTGRES_PASSWORD: dev
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build: ./apps/api
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis

  ml-service:
    build: ./apps/ml-service
    ports:
      - "8000:8000"
```

**Start entire stack**: `docker-compose up`

---

# **15. PERFORMANCE OPTIMIZATIONS**

### **15.1 Parallel Processing**

```
User Prompt → LLM Parse (500ms)
                ↓
              [PARALLEL]
                ↙     ↘
    LLM Plan (1s)   Pre-fetch Popular (2s)
                ↘     ↙
              Combine (0ms)
                ↓
          Score & Rank (1.5s)
                ↓
            Response (total: ~4s)
```

### **15.2 Caching Strategy**

1. **Product Cache**: 6-hour TTL for product metadata
2. **Prompt Pattern Cache**: Embed prompts, cache similar queries
   - "korean minimal M 1500" ≈ "korean minimalist medium ₹1500"
3. **Aesthetic Embeddings**: Pre-compute common aesthetics

### **15.3 Streaming Responses**

Frontend receives outfits progressively:

- First outfit: 3s
- Remaining outfits: stream as ready
- Perceived latency: 50% faster

---

# **16. RISK & MITIGATION**

| Risk                     | Mitigation                          |
| ------------------------ | ----------------------------------- |
| Amazon HTML changes      | Adapter abstraction + monitoring    |
| Latency >7s              | Parallel pipelines + streaming      |
| LLM hallucination        | JSON validation + structured output |
| No results within budget | Relax constraints gracefully        |
| LLM costs too high       | Tiered LLM strategy + caching       |
| Monorepo build times     | Turborepo caching + smart CI/CD     |
