# DODOMA SME MANAGEMENT SUITE
## Complete System Specification & Development Documentation

**Version:** 1.0  
**Date:** September 2026  
**Author:** Master-Bry (Brayan Hawald Ngowi)  
**Status:** Ready for Development

---

## TABLE OF CONTENTS

1. Executive Summary
2. Market Analysis & Opportunity
3. Product Vision & Scope
4. System Architecture
5. Database Schema
6. Core Features Breakdown
7. API Specification
8. Technology Stack
9. Development Roadmap
10. Deployment & Infrastructure
11. Security & Compliance
12. Pricing & Go-to-Market Strategy

---

## 1. EXECUTIVE SUMMARY

### Project Overview
**Dodoma SME Management Suite** is a cloud-based, integrated business management platform designed for small and medium enterprises (SMEs) in the Dodoma region with limited digital infrastructure.

**Target Market:** Retail shops, restaurants, pharmacies, salons, clinics in Dodoma  
**Revenue Model:** SaaS subscription (3-tier pricing)  
**Market Entry:** 2026 Q4  
**Year 1 Target:** 500-800 paying customers  

### Key Market Opportunity

- **Total Addressable Market (TAM):** 15,000+ registered SMEs in Dodoma
- **Serviceable Market (SAM):** 5,000+ retail/service businesses
- **Current Digital Penetration:** <5% use integrated management tools
- **Cost of Manual Operations:** SMEs lose 10-15% revenue through inventory shrinkage, payment errors, operational inefficiency

**Value Proposition:** TZS 25,000-50,000/month (USD 10-20) affordable solution that consolidates POS, inventory, accounting, and CRM in one platform.

### Competitive Advantages

1. **Local Market Knowledge** - Dodoma-based founder with deep understanding of local business needs
2. **Language Support** - Swahili-first interface (critical for SME adoption)
3. **Affordability** - 10-20x cheaper than national competitors
4. **Mobile-First & Offline** - Works with unreliable connectivity (essential for Tanzania)
5. **Community-Centric** - Relationships with local business associations and accountants

---

## 2. MARKET ANALYSIS & OPPORTUNITY

### Market Sizing

| Metric | Value |
|--------|-------|
| Total Addressable Market (TAM) | 15,000+ registered SMEs in Dodoma |
| Serviceable Market (SAM) | 5,000+ retail/service/hospitality businesses |
| Current Digital Penetration | <5% have integrated management tools |
| Manual Record-Keeping Prevalence | ~85% (spreadsheets, paper ledgers) |
| Year 1 Customer Target | 500-800 businesses (10-15% SAM penetration) |
| Average Deal Size (Professional Tier) | TZS 50,000/month (~$20 USD) |
| Year 1 Revenue Potential | TZS 300M-480M (~USD 120K-192K) |

### Competitive Landscape

**Current Competitors:**
- Manual ledgers & spreadsheets (70% of market)
- POS-only systems (hardware-based, no integration) - 20%
- Expensive national solutions (TZS 150K+/month) - <5%
- No mobile-first, offline-capable, affordable competitor in Dodoma - 0%

**Competitive Moat:**
- Local presence and relationships
- Swahili language support
- Offline-first architecture (critical advantage)
- 5-10x cost advantage over alternatives

### Addressable Problem

**Current State Inefficiencies:**

1. **Inventory Shrinkage:** Manual counting → 5-10% loss
2. **Payment Reconciliation:** Cash/mobile money discrepancies → 2-5% loss
3. **Duplicated Records:** Spreadsheet errors and redundancy → 3-7% loss
4. **Decision Delays:** No real-time data → poor purchasing/pricing decisions
5. **Tax Compliance:** Manual records not audit-ready → penalties
6. **Staff Accountability:** No activity logs → cash/inventory theft

**Solution Impact:**
- Reduce shrinkage by 60-80%
- Real-time inventory visibility
- Automated reconciliation
- Tax-ready reporting
- Staff accountability through audit trails
- Better business decisions through analytics

---

## 3. PRODUCT VISION & SCOPE

### MVP (Phase 1) - Core Modules

#### A. Point of Sale (POS)
- Product search by name/barcode
- Fast checkout (cart management)
- Multiple payment methods (cash, M-Pesa, Airtel Money, Tigo Pesa)
- Discount management (percentage, fixed amount)
- Receipt printing & SMS delivery
- Shift management (open/close shifts, cashier tracking)
- Offline mode with automatic sync

#### B. Inventory Management
- Real-time stock tracking per product
- Automatic stock deduction on sales
- Low-stock alerts (configurable thresholds)
- Manual stock adjustments (with audit logging)
- Supplier management (contact, purchase orders)
- Bulk product import via CSV
- Barcode generation

#### C. Sales Analytics
- Daily/weekly/monthly sales dashboard
- Revenue trends & top-selling items
- Sales by category
- Top customers (by frequency, spend)
- Date range filtering
- PDF export & scheduled email reports

#### D. Basic Accounting
- Income statement (Revenue - COGS - Expenses = Profit)
- Expense categorization (rent, utilities, supplies, other)
- Daily cash flow tracking
- Monthly profit/loss reports
- Tax-ready report generation

#### E. Customer Management
- Customer directory (name, phone, email)
- Purchase history per customer
- Loyalty points system (earn on purchase, redeem for discounts)
- Customer insights (top buyers, repeat frequency)

#### F. User Management
- Multi-user access (up to 5 users on Professional tier)
- Role-based access control (Admin, Manager, Cashier)
- Activity logging (audit trail of all actions)
- Login tracking & session management

### Phase 2 Features (Months 4-6)

- Mobile Money Integration (M-Pesa, Airtel Money APIs with webhooks)
- Advanced CRM (customer segments, SMS campaigns)
- Accounting Enhancements (bank reconciliation, profit margin by product)
- PDF Report Scheduling & Email Delivery
- Mobile App (React Native - iOS/Android)
- WhatsApp Integration (receipt delivery, reminders)

### Phase 3 Features (Months 7-12)

- Multi-branch Support (manage multiple store locations)
- Advanced Analytics (predictive inventory, sales forecasting)
- Employee Management (payroll integration, attendance)
- Supplier Portal (for collaborative ordering)
- API Access (for third-party integrations)
- Business Intelligence Dashboard

---

## 4. SYSTEM ARCHITECTURE

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend Layer                              │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │  Web Dashboard   │  │  Mobile App      │                     │
│  │  (React)         │  │  (React Native)  │                     │
│  └──────────────────┘  └──────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   API Gateway Layer                             │
│  (JWT Auth, Rate Limiting, Request Validation)                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              Microservices/API Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Auth Service │  │ Sales Service│  │ Inventory    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Accounting   │  │ Customer Mgmt│  │ Reports      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ PostgreSQL   │  │ Redis Cache  │  │ TimescaleDB  │
│ (OLTP)       │  │ (Sessions)   │  │ (Analytics)  │
└──────────────┘  └──────────────┘  └──────────────┘
                              ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Message Queue│  │ File Storage │  │ S3 Backups   │
│ (RabbitMQ)   │  │ (MinIO)      │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Core Components

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend Web | React 18, TypeScript, Redux Toolkit, Tailwind CSS | Web dashboard, analytics, admin panel |
| Frontend Mobile | React Native / Flutter | Offline POS, inventory management |
| API Gateway | Nginx, Kong (optional) | Reverse proxy, rate limiting, load balancing |
| Backend API | Node.js + Express OR Python + FastAPI | REST API endpoints, business logic |
| Database | PostgreSQL 14+ | Primary OLTP database (sales, inventory, users) |
| Time-Series DB | TimescaleDB | Analytics, historical data, reporting |
| Cache Layer | Redis | Session management, rate limiting, real-time data |
| Message Queue | RabbitMQ or Bull | Async reporting, PDF generation, SMS delivery |
| File Storage | MinIO or AWS S3 | Receipts, invoices, backups |
| Monitoring | Prometheus + Grafana | Metrics, alerting, performance monitoring |
| Logging | ELK Stack or Loki | Centralized logging, error tracking |

---

## 5. DATABASE SCHEMA

### Core Tables & Relationships

#### Table: businesses
```
- id (UUID, PK)
- business_name (VARCHAR 255)
- business_type (ENUM: retail, restaurant, pharmacy, salon, clinic)
- owner_name (VARCHAR 255)
- phone (VARCHAR 20)
- email (VARCHAR 255)
- city (VARCHAR 100, default: Dodoma)
- region (VARCHAR 100)
- api_key (VARCHAR 255, unique)
- subscription_tier (ENUM: basic, professional, enterprise)
- subscription_start_date (TIMESTAMP)
- subscription_end_date (TIMESTAMP)
- is_active (BOOLEAN, default: true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Table: users
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- email (VARCHAR 255, unique per business)
- password_hash (VARCHAR 255)
- name (VARCHAR 255)
- phone (VARCHAR 20, optional)
- role (ENUM: admin, manager, cashier)
- is_active (BOOLEAN, default: true)
- last_login (TIMESTAMP)
- login_count (INTEGER, default: 0)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- UNIQUE(business_id, email)
```

#### Table: products
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- product_name (VARCHAR 255)
- sku (VARCHAR 100)
- barcode (VARCHAR 100, nullable)
- category (VARCHAR 100)
- description (TEXT, optional)
- cost_price (DECIMAL 10,2)
- selling_price (DECIMAL 10,2)
- quantity_in_stock (INTEGER)
- reorder_level (INTEGER)
- reorder_quantity (INTEGER)
- supplier_id (UUID, FK → suppliers, nullable)
- image_url (VARCHAR 255, nullable)
- is_active (BOOLEAN, default: true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Table: sales
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- user_id (UUID, FK → users)
- customer_id (UUID, FK → customers, nullable)
- total_amount (DECIMAL 12,2)
- discount_amount (DECIMAL 10,2, default: 0)
- discount_percentage (DECIMAL 5,2, default: 0)
- payment_method (ENUM: cash, mpesa, airtel, tigo, credit)
- payment_status (ENUM: completed, pending, failed)
- sale_date (TIMESTAMP)
- receipt_number (VARCHAR 100, unique per business)
- notes (TEXT, optional)
- is_refunded (BOOLEAN, default: false)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- INDEX(business_id, sale_date)
- INDEX(customer_id)
```

#### Table: sale_items
```
- id (UUID, PK)
- sale_id (UUID, FK → sales)
- product_id (UUID, FK → products)
- quantity (INTEGER)
- unit_price (DECIMAL 10,2)
- line_total (DECIMAL 12,2)
- discount_applied (DECIMAL 10,2, default: 0)
- created_at (TIMESTAMP)
```

#### Table: customers
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- customer_name (VARCHAR 255)
- phone (VARCHAR 20, nullable)
- email (VARCHAR 255, nullable)
- customer_type (ENUM: walk-in, regular, vip)
- total_spent (DECIMAL 12,2, default: 0)
- total_purchases (INTEGER, default: 0)
- last_purchase_date (TIMESTAMP, nullable)
- loyalty_points (INTEGER, default: 0)
- notes (TEXT, optional)
- is_active (BOOLEAN, default: true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- UNIQUE(business_id, phone)
```

#### Table: expenses
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- category (ENUM: rent, utilities, supplies, salaries, other)
- description (VARCHAR 500)
- amount (DECIMAL 10,2)
- expense_date (DATE)
- user_id (UUID, FK → users)
- payment_method (VARCHAR 50)
- receipt_file_url (VARCHAR 255, optional)
- is_reconciled (BOOLEAN, default: false)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- INDEX(business_id, expense_date)
```

#### Table: inventory_adjustments
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- product_id (UUID, FK → products)
- adjustment_type (ENUM: add, remove, correction)
- quantity_before (INTEGER)
- quantity_after (INTEGER)
- reason (VARCHAR 255)
- user_id (UUID, FK → users)
- created_at (TIMESTAMP)
```

#### Table: suppliers
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- supplier_name (VARCHAR 255)
- contact_person (VARCHAR 255, optional)
- phone (VARCHAR 20)
- email (VARCHAR 255, optional)
- address (TEXT)
- city (VARCHAR 100)
- payment_terms (VARCHAR 255, optional)
- is_active (BOOLEAN, default: true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Table: audit_logs
```
- id (UUID, PK)
- business_id (UUID, FK → businesses)
- user_id (UUID, FK → users)
- action (VARCHAR 255)
- resource_type (VARCHAR 50)
- resource_id (VARCHAR 255)
- changes (JSONB)
- ip_address (VARCHAR 45)
- user_agent (TEXT)
- created_at (TIMESTAMP)
- INDEX(business_id, created_at)
```

---

## 6. CORE FEATURES BREAKDOWN

### Feature 1: Point of Sale (POS)

**User Flow:**
1. Cashier logs in → selects business location
2. Searches for products by name, SKU, or barcode
3. Adds items to cart (quantity adjustment)
4. Applies discounts (if authorized)
5. Selects payment method (cash/mobile money)
6. Confirms sale → system deducts inventory
7. Generates receipt (print/SMS/email)
8. Shift closes with reconciliation

**Key Capabilities:**
- Search optimization (autocomplete, barcode scanning)
- Cart persistence (if browser closes)
- Quick discount buttons (10%, 15%, 20%)
- Split payments (pay part cash, part mobile money)
- Voiding/returns (with reason logging)
- Offline mode (SQLite sync when online)

**Technical Notes:**
- Response time target: <200ms for search
- Barcode scanning via device camera or input field
- Receipt printing via thermal printer API or web print
- Offline data stored in IndexedDB (web) or SQLite (mobile)

---

### Feature 2: Inventory Management

**Capabilities:**
1. **Stock Tracking** - Real-time quantity by product, location
2. **Low Stock Alerts** - Configurable thresholds, email/SMS notifications
3. **Stock Adjustments** - Manual add/remove with audit logging
4. **Bulk Import** - CSV upload for product initialization
5. **Supplier Management** - Track supplier contacts, lead times
6. **Purchase Orders** - Create, track, receive shipments
7. **Stock Aging** - Identify slow-moving items

**Key Reports:**
- Current inventory value (FIFO/LIFO costing)
- Stock movement (by period)
- Supplier performance (delivery, quality)
- Dead stock (products not sold in 90 days)

---

### Feature 3: Sales Analytics & Reporting

**Dashboard Widgets:**
- Total Revenue (today/week/month/custom)
- Average Transaction Value
- Number of Transactions
- Top 5 Selling Products
- Sales by Category (pie chart)
- Sales by Payment Method
- Customer Count & Repeat Rate

**Reports:**
- Daily Sales Summary
- Weekly Performance Comparison
- Monthly Revenue Trend
- Top Customers (by spend, frequency)
- Product Performance (quantity sold, revenue)
- Payment Method Breakdown
- Custom Date Range Reports

**Export Options:**
- PDF (formatted for printing)
- Excel (for accountant review)
- CSV (for data analysis)
- Email delivery (scheduled daily/weekly/monthly)

---

### Feature 4: Accounting & Financials

**Core Reports:**
1. **Income Statement (P&L)**
   - Revenue (from sales)
   - Cost of Goods Sold (COGS)
   - Gross Profit (Revenue - COGS)
   - Operating Expenses (rent, utilities, supplies)
   - Net Profit (Gross Profit - Operating Expenses)

2. **Cash Flow Statement**
   - Opening Cash Balance
   - Cash Inflows (sales, loans)
   - Cash Outflows (expenses, payables)
   - Closing Cash Balance

3. **Balance Sheet (simplified)**
   - Assets (cash, inventory)
   - Liabilities (supplier debt)
   - Equity (owner's capital)

4. **Tax-Ready Reports**
   - Sales by VAT status (VAT-able vs exempt)
   - Expense documentation
   - Receipt register (for tax audit)

**Integration Points:**
- Bank account connection (future phase)
- Accountant access (read-only via link)
- Tax authority export format (TRA-compliant)

---

### Feature 5: Customer Relationship Management

**Capabilities:**
1. **Customer Directory**
   - Searchable customer profiles
   - Purchase history
   - Total spend tracking
   - Contact preferences (SMS, email)

2. **Loyalty Program**
   - Points earned on purchase (configurable rate, e.g., 1 point per TZS 1000)
   - Redemption rules (e.g., 100 points = TZS 5000 discount)
   - Tier system (regular, silver, gold)
   - Birthday/anniversary rewards

3. **Customer Segmentation**
   - By total spend (high-value, regular, low-value)
   - By frequency (frequent, occasional, at-risk)
   - By product preference (category analysis)

4. **Engagement**
   - SMS campaigns (promotions, announcements)
   - Email campaigns (future phase)
   - WhatsApp integration (send receipts, reminders)

**Business Impact:**
- Repeat customer rate tracking
- Customer lifetime value (CLV) calculation
- Churn prediction (identify at-risk customers)
- Personalized discounts/offers

---

### Feature 6: User Management & Access Control

**Roles & Permissions:**

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: user management, settings, all reports |
| **Manager** | POS, inventory, reports, cannot modify settings |
| **Cashier** | POS only, limited reporting (shift summary) |

**Security Features:**
- Password complexity requirements (8+ characters, mixed case)
- Password expiration (90 days)
- Failed login lockout (5 attempts, 15 min lockout)
- Session timeout (30 minutes inactivity)
- Two-factor authentication (optional, future phase)

**Audit Trail:**
- Log all user actions (create, read, update, delete)
- Track login/logout times
- Record IP address and device info
- Alert on suspicious activity (bulk deletions, after-hours access)

---

## 7. API SPECIFICATION

### Authentication

**JWT Token Flow:**
1. POST /auth/login → returns access_token (30 days) + refresh_token (90 days)
2. Access token sent in Authorization header: `Bearer {token}`
3. Refresh token used to issue new access_token before expiry
4. Token revocation on logout

**Example Login Request:**
```json
POST /auth/login
{
  "email": "cashier@shop.co.tz",
  "password": "SecurePass123",
  "business_id": "550e8400-e29b-41d4-a716-446655440000"
}

Response (200):
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 2592000,
  "user": {
    "id": "...",
    "name": "Ahmed Cashier",
    "role": "cashier",
    "business_id": "..."
  }
}
```

### Core Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout (invalidate token)
- `POST /auth/register` - Business/user registration

#### Point of Sale
- `POST /sales` - Create sale transaction
- `GET /sales?startDate=&endDate=` - Fetch sales (filtered)
- `GET /sales/{id}` - Get sale details
- `POST /sales/{id}/refund` - Refund sale
- `GET /sales/{id}/receipt` - Generate receipt PDF

#### Inventory
- `POST /products` - Create product
- `GET /products` - List products (paginated)
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product (price, stock)
- `DELETE /products/{id}` - Soft delete product
- `POST /inventory/adjust` - Adjust stock (add/remove)
- `GET /inventory/low-stock` - Get low-stock alerts
- `POST /products/bulk-import` - CSV bulk upload

#### Customers
- `POST /customers` - Create customer
- `GET /customers` - List customers
- `GET /customers/{id}` - Get customer details
- `PUT /customers/{id}` - Update customer
- `GET /customers/{id}/purchases` - Get purchase history
- `POST /customers/{id}/loyalty-points` - Add loyalty points
- `GET /loyalty/redemptions` - Track point redemptions

#### Accounting
- `GET /reports/income-statement?month=&year=` - P&L report
- `GET /reports/cash-flow?month=&year=` - Cash flow report
- `POST /expenses` - Record expense
- `GET /expenses?category=rent` - Filter expenses
- `GET /reports/profit-margin` - Profit margin analysis

#### Analytics & Reporting
- `GET /reports/dashboard` - Dashboard summary metrics
- `GET /reports/sales-summary?dateRange=week` - Sales summary
- `GET /reports/top-products?limit=10` - Top 10 products
- `GET /reports/customer-insights` - Customer analysis
- `POST /reports/schedule-email` - Schedule report delivery
- `GET /reports/{id}/export` - Export report (PDF/Excel/CSV)

#### Users & Settings
- `GET /users` - List users (admin only)
- `POST /users` - Create new user (admin)
- `PUT /users/{id}` - Update user permissions
- `DELETE /users/{id}` - Deactivate user (soft delete)
- `GET /settings` - Get business settings
- `PUT /settings` - Update settings (admin)

---

## 8. TECHNOLOGY STACK

### Frontend

**Web Dashboard:**
- Framework: React 18 (with TypeScript)
- State Management: Redux Toolkit + Redux Query
- Styling: Tailwind CSS
- UI Components: Headless UI / Radix UI
- Charts: Recharts (analytics/reports)
- Forms: React Hook Form + Zod (validation)
- HTTP Client: Axios / React Query
- Build Tool: Vite (faster than Create React App)
- Testing: Vitest + React Testing Library

**Mobile App:**
- Framework: React Native or Flutter
- Offline Database: SQLite (via expo-sqlite)
- State: Redux (React Native) or Riverpod (Flutter)
- Native Bridge: Custom sync engine for offline→online

### Backend

**API Server:**
- Runtime: Node.js 18+ LTS
- Framework: Express.js (lightweight, fast startup)
- Language: TypeScript (type safety)
- ORM: TypeORM or Prisma (database abstraction)
- Validation: Zod / Joi
- Authentication: JWT + Passport.js
- Logging: Winston / Pino
- Testing: Jest + Supertest

**Alternative Stack (if Python preferred):**
- Framework: FastAPI (async, fast, type hints)
- ORM: SQLAlchemy or Tortoise ORM
- Async: asyncio (built-in)
- Validation: Pydantic

### Database & Storage

**Primary Database:**
- PostgreSQL 14+ (ACID compliance, JSON support, TimescaleDB extension)
- Connection Pool: pgBouncer
- Backup Strategy: WAL archiving to S3, daily snapshots

**Time-Series Analytics:**
- TimescaleDB (PostgreSQL extension for time-series data)
- Retention: 12 months for raw data, 3 years aggregated

**Cache Layer:**
- Redis 7+ (session storage, rate limiting, real-time updates)
- Connection Pool: redis-conn-pool
- TTL: 1 hour (sessions), 24 hours (cache)

**File Storage:**
- MinIO (S3-compatible, self-hosted) for MVP
- AWS S3 (future phase, if scaling to multiple regions)
- Backup retention: 30 days minimum

**Search (Future Phase):**
- Elasticsearch (for advanced product search)
- Meilisearch (simpler, open-source alternative)

### Message Queue & Async Jobs

- **Message Broker:** RabbitMQ or Bull (Node.js-friendly)
- **Job Queue:** Bull (Redis-backed) for async tasks
  - PDF generation (reports, receipts)
  - Email delivery (scheduled reports)
  - SMS delivery (M-Pesa confirmations, alerts)
  - Data aggregation (nightly analytics)

### Infrastructure & DevOps

**Containerization:**
- Docker (images for API, web, database)
- Docker Compose (local development)
- Docker Registry: DockerHub or GitHub Container Registry

**Orchestration (MVP):**
- Docker Compose (single server)
- Future: Kubernetes (when scaling)

**Cloud Hosting:**
- DigitalOcean Droplets (USD 12-15/month for MVP)
- Alternative: Linode or AWS Lightsail
- Region: Frankfurt or London (closest to Tanzania)

**Reverse Proxy & Load Balancing:**
- Nginx (HTTP/2, gzip compression, static asset caching)
- SSL/TLS: Let's Encrypt (free, auto-renewal)

**CDN (Future):**
- Cloudflare (free tier for DNS, caching, DDoS protection)

**CI/CD Pipeline:**
- GitHub Actions (integrated with GitHub)
- Pipeline Steps:
  1. Lint & format check (ESLint, Prettier)
  2. Unit tests (Jest/pytest)
  3. Integration tests (Supertest)
  4. Build Docker image
  5. Push to registry
  6. Deploy to staging
  7. Smoke tests
  8. Deploy to production

**Monitoring & Observability:**
- **Metrics:** Prometheus + Grafana
- **Logs:** ELK Stack (Elasticsearch, Logstash, Kibana) or Loki
- **Error Tracking:** Sentry
- **Uptime Monitoring:** Pingdom / Uptime Robot
- **Performance:** New Relic or Datadog (optional)

**Backup & Disaster Recovery:**
- Daily PostgreSQL backups to S3
- Backup retention: 30 days minimum, 1 backup per month long-term
- Recovery time objective (RTO): 4 hours
- Recovery point objective (RPO): 1 day

### External Integrations

**Payment Gateways:**
- M-Pesa: Safaricom API (USSD pop-up, callback notifications)
- Airtel Money: Airtel API
- Tigo Pesa: Tigo API
- All via REST webhooks for confirmation

**SMS Provider:**
- Africastalking or Twilio (SMS delivery for receipts, alerts)

**Email Service:**
- SendGrid or Mailgun (scheduled report delivery)

---

## 9. DEVELOPMENT ROADMAP

### Phase 1: MVP (Months 1-3) - "Get Product Market Fit"

**Sprint 1 (Weeks 1-2): Foundation**
- Database schema design & setup (PostgreSQL)
- API skeleton (Express/FastAPI, JWT auth)
- User authentication (login, password reset)
- Role-based access control setup
- Deployment pipeline (Docker, GitHub Actions)

**Sprint 2 (Weeks 3-4): Core POS**
- Product model & CRUD operations
- Shopping cart logic
- Basic sales transaction API
- Stock deduction on purchase
- Receipt generation (text format)

**Sprint 3 (Weeks 5-6): Frontend Web**
- React project setup (Vite + Tailwind)
- Login/dashboard page
- POS interface (product search, cart, checkout)
- Basic inventory list

**Sprint 4 (Weeks 7-8): Reports & Refinement**
- Daily sales summary endpoint
- Dashboard metrics API
- Web dashboard implementation
- Testing (unit tests for core logic)
- Deployment to staging

**Sprint 5 (Weeks 9-12): Bug Fixes & Beta**
- User testing with 5-10 beta customers
- Bug fixes based on feedback
- Mobile responsive design
- Security hardening (rate limiting, input validation)
- Production deployment

**MVP Deliverables:**
- Web dashboard (login, POS, inventory, basic reports)
- REST API with auth
- PostgreSQL database
- Docker deployment
- 5-10 beta customers on board

**Success Metrics:**
- API response time <200ms
- 99% transaction success rate
- <5 critical bugs post-launch
- Beta customers reporting ease of use

---

### Phase 2: Core Features & Mobile (Months 4-6) - "Expand & Monetize"

**Sprint 1 (Weeks 13-16): Mobile Money**
- M-Pesa API integration (initiate payment, webhook confirmation)
- Airtel Money API integration
- Payment status tracking
- Receipt via SMS on transaction completion
- Testing with actual M-Pesa/Airtel accounts

**Sprint 2 (Weeks 17-20): Customer Management**
- Customer creation/update endpoints
- Purchase history tracking
- Loyalty points system (earn/redeem)
- Customer search & segmentation
- Web UI for customer directory

**Sprint 3 (Weeks 21-24): Advanced Accounting**
- Income statement calculation (revenue - COGS - expenses)
- Expense tracking & categorization
- Cash flow statement
- Profit margin per product
- Monthly financial reports (PDF export)
- Email scheduling for reports

**Sprint 4 (Weeks 25-26): Mobile App (Partial)**
- React Native setup
- Offline POS interface (SQLite sync)
- Basic inventory viewing
- Shift reconciliation

**Phase 2 Deliverables:**
- Mobile money integration (M-Pesa, Airtel)
- Full CRM module
- Accounting module with financial reports
- Mobile app (beta, offline POS)
- 50-100 paying customers

**Success Metrics:**
- Mobile money transactions: 30% of total sales
- Customer retention rate: >90% monthly
- Financial reports generated: 500+ per month
- Mobile app downloads: 100+

---

### Phase 3: Advanced & Scale (Months 7-12) - "Diversify & Grow"

**Sprint 1 (Weeks 27-32): Analytics & BI**
- Advanced analytics dashboard
- Inventory forecasting (simple moving average)
- Sales trend analysis
- Customer behavior insights
- Data export (Excel, CSV)

**Sprint 2 (Weeks 33-36): Multi-Branch**
- Support for multiple business locations
- Consolidated reporting across branches
- Branch-level permission management
- Inventory transfer between branches

**Sprint 3 (Weeks 37-40): Employee Management**
- Employee directory
- Payroll tracking (basic)
- Shift scheduling
- Attendance records
- Performance metrics (sales per cashier)

**Sprint 4 (Weeks 41-44): Supplier Portal & Automation**
- Supplier login (view orders, delivery tracking)
- Purchase order workflow (create, approve, receive)
- Supplier performance dashboard
- Automated low-stock purchase orders (future AI enhancement)

**Sprint 5 (Weeks 45-48): WhatsApp & Scaling**
- WhatsApp Business API integration
- Receipt delivery via WhatsApp
- Promotional message broadcasts
- Customer feedback collection via WhatsApp
- Kubernetes setup for multi-server deployment

**Phase 3 Deliverables:**
- Advanced analytics dashboard
- Multi-branch support
- Employee payroll module
- Supplier portal
- WhatsApp integration
- Kubernetes deployment
- 200-300 paying customers

**Success Metrics:**
- NPS (Net Promoter Score): >50
- Churn rate: <5% per month
- Monthly Recurring Revenue (MRR): TZS 10M-15M (~USD 4K-6K)
- Feature adoption rate: >70% for new modules

---

## 10. DEPLOYMENT & INFRASTRUCTURE

### MVP Deployment Architecture (Phase 1)

```
┌────────────────────────────────────────────┐
│   DigitalOcean Droplet (Ubuntu 22.04)      │
│   2GB RAM, 2 vCPU, 50GB SSD - USD 12/mo    │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │   Docker Container Orchestration    │   │
│  │                                    │   │
│  │  ┌──────────────┐  ┌────────────┐ │   │
│  │  │  Nginx (443) │→ │  API (80)  │ │   │
│  │  └──────────────┘  └────────────┘ │   │
│  │       ↑                    ↓       │   │
│  │       │            ┌────────────┐ │   │
│  │       └───────────→│ PostgreSQL │ │   │
│  │                    └────────────┘ │   │
│  │                                    │   │
│  │       ┌──────────────────────────┐ │   │
│  │       │   Redis (Cache/Queue)    │ │   │
│  │       └──────────────────────────┘ │   │
│  │                                    │   │
│  │  ┌────────────────────────────────┐ │  │
│  │  │  Web (React) - Static Files    │ │  │
│  │  └────────────────────────────────┘ │  │
│  │                                    │   │
│  └────────────────────────────────────┘   │
│                                            │
│  External:                                 │
│  - Let's Encrypt SSL certificate          │
│  - S3 for backups (external)              │
│  - SendGrid for email (optional)          │
└────────────────────────────────────────────┘
```

### Deployment Steps

**1. Server Setup (1 hour)**
```bash
# SSH into DigitalOcean droplet
ssh root@droplet_ip

# Update system
apt-get update && apt-get upgrade -y

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com | sh
curl -L https://github.com/docker/compose/releases/download/latest/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install nginx (for SSL termination)
apt-get install -y nginx certbot python3-certbot-nginx

# Create application directory
mkdir -p /opt/dodoma-sme && cd /opt/dodoma-sme
```

**2. Clone & Setup Repository (30 min)**
```bash
# Clone from GitHub
git clone https://github.com/master-bry/dodoma-sme-suite.git .

# Create .env file
cp .env.example .env
# Edit .env with:
# - DATABASE_URL
# - JWT_SECRET
# - API_KEY
# - REDIS_URL
# - NODE_ENV=production
```

**3. Build & Deploy with Docker Compose (30 min)**
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Run database migrations
docker-compose exec api npm run migrate

# Seed demo data (optional)
docker-compose exec api npm run seed
```

**4. SSL Certificate Setup (15 min)**
```bash
# Obtain Let's Encrypt certificate
certbot certonly --standalone -d api.dodoma-sme.app -d app.dodoma-sme.app

# Configure Nginx as reverse proxy (in /etc/nginx/sites-available/dodoma-sme)
# Proxy API requests to Docker container port 3000
# Serve React static files from /opt/dodoma-sme/web/build

# Restart Nginx
systemctl restart nginx
```

**5. Backup Setup (10 min)**
```bash
# Create S3 bucket on AWS or Wasabi (S3-compatible, cheaper)
# Schedule PostgreSQL backup via cron
# Add to /etc/cron.d/dodoma-sme:
# 0 2 * * * root /opt/dodoma-sme/backup.sh

# backup.sh contents:
#!/bin/bash
BACKUP_FILE="dodoma-sme-$(date +%Y%m%d).sql.gz"
docker-compose exec -T postgres pg_dump -U dodoma_user dodoma_db | gzip > /backups/$BACKUP_FILE
# Upload to S3
aws s3 cp /backups/$BACKUP_FILE s3://dodoma-sme-backups/
# Keep only last 30 days
find /backups -name "*.sql.gz" -mtime +30 -delete
```

**6. Monitoring Setup (20 min)**
```bash
# Add Prometheus + Grafana containers to docker-compose
# or use DigitalOcean's built-in monitoring
# Set alerts for:
# - CPU > 80%
# - Memory > 85%
# - Disk > 90%
# - API response time > 500ms
# - Error rate > 1%
```

### Scaling (Phase 2+)

**When to Scale:**
- Single server handles ~500-1000 concurrent users
- At 100+ paying customers, start planning multi-server setup
- Each server tier uses same Docker image

**Scaling Steps:**
1. **Database Scaling:** Add read replicas for reporting queries
2. **API Scaling:** Spin up additional API containers on new servers
3. **Load Balancing:** Nginx load balancer in front of API servers
4. **Kubernetes:** Migrate to Kubernetes for automatic scaling (when 50+ employees)

---

## 11. SECURITY & COMPLIANCE

### Data Protection

**Encryption at Rest:**
- PostgreSQL encrypted volumes (LUKS encryption on Linux)
- S3 backups encrypted with AES-256
- Sensitive fields (passwords, API keys): encrypted using `bcryptjs`

**Encryption in Transit:**
- TLS 1.3 for all API communication
- HSTS header (strict-transport-security)
- Certificate pinning (optional, for mobile app)

**Access Control:**
- Role-Based Access Control (RBAC)
  - Admin: full access to all features
  - Manager: POS, inventory, reports, cannot modify settings
  - Cashier: POS only
- Row-Level Security (RLS) for multi-tenant data isolation
  - Each user only sees data for their business
  - Enforced at database level (PostgreSQL RLS)

**Session Management:**
- JWT tokens: 30-day validity
- Refresh tokens: 90-day validity
- Automatic logout on inactive (30 minutes)
- Prevent concurrent logins from different IPs
- Clear sessions on password change

**Password Security:**
- Minimum 8 characters, mixed case, numbers, special characters
- Password expiry: 90 days
- Password history: cannot reuse last 5 passwords
- Bcrypt hashing with salt (10 rounds)

**Authentication:**
- Two-Factor Authentication (2FA) - optional, for admin/manager
- Email verification on registration
- Security questions (optional backup method)
- Account lockout: 5 failed attempts → 15 min lockout

### Input Validation & Sanitization

**Frontend:**
- HTML form validation (required, length, format)
- Type checking via TypeScript

**Backend:**
- Schema validation: Zod or Joi
  - All inputs validated against schema
  - Type coercion disabled (no auto-conversion)
  - Whitelist of allowed values for enums
- SQL injection prevention: Parameterized queries (ORM)
- XSS prevention: HTML escaping on output
- CSRF tokens: SameSite cookies

**Example Validation (Zod):**
```typescript
const SaleSchema = z.object({
  customer_id: z.string().uuid().optional(),
  total_amount: z.number().positive(),
  payment_method: z.enum(['cash', 'mpesa', 'airtel']),
  discount_percentage: z.number().min(0).max(100),
});
```

### Rate Limiting

- API Rate Limit: 100 requests per minute per IP (configurable per user)
- Login attempts: Max 5 per 15 minutes (per email)
- SMS delivery: Max 10 per minute per customer (abuse prevention)
- Export operations: Max 5 concurrent exports per business

**Implementation:** Redis-backed rate limiter (express-rate-limit or custom)

### Audit Logging

**What Gets Logged:**
- User login/logout (timestamp, IP, user agent)
- Data changes (create, update, delete)
  - What changed (before/after values)
  - Who changed it (user_id)
  - When it was changed (timestamp)
  - Why (reason, if provided)
- Permission changes
- Admin actions (user creation, settings changes)
- Failed security attempts (failed login, invalid token)

**Retention:** 12 months minimum (compliance requirement)

**Query Example:**
```sql
SELECT * FROM audit_logs 
WHERE business_id = $1 
AND created_at >= NOW() - INTERVAL '30 days'
AND action = 'UPDATE'
ORDER BY created_at DESC;
```

### Compliance

**Tanzania Privacy Act:**
- Data localization: Customer data stored in Tanzania or safe harbor country
- User consent: Privacy policy acceptance on signup
- Data access: Users can request their data (export JSON)
- Data deletion: Users can request account deletion (purge within 30 days)
- Third-party access: Document all integrations (M-Pesa, email provider)

**Tax Authority (TRA):**
- Sales records: Retain per TRA requirements (5 years)
- Export format: Tax-ready reports (compatible with TRA audits)
- Reporting: Quarterly VAT reports (if applicable)

**PCI-DSS (if accepting card payments):**
- Do NOT store card details (use payment gateway)
- Tokenization: Store only payment token
- Audit certification: Annual or as needed

**Data Privacy:**
- Privacy policy (published on website)
- Terms of service (users accept before use)
- Cookie policy (if using tracking cookies)
- GDPR compliance (if ever serving EU customers)

### Vulnerability Management

**Security Testing:**
- OWASP Top 10 checklist (annually)
- Dependency scanning: Snyk or GitHub Dependabot (weekly)
- Code review: All PRs reviewed before merge
- Penetration testing: Quarterly (after Phase 2)
- Vulnerability disclosure program (future)

**Incident Response:**
- Security incident log (internal tracking)
- Incident escalation process
- Customer notification within 48 hours (if data breach)
- Post-incident review (root cause analysis)

---

## 12. PRICING & GO-TO-MARKET STRATEGY

### Subscription Pricing Model

**Three-Tier Structure:**

| Feature | Basic | Professional | Enterprise |
|---------|-------|--------------|------------|
| **Monthly Price (TZS)** | 25,000 | 50,000 | 100,000 |
| **Monthly Price (USD)** | $10 | $20 | $40 |
| **Users Allowed** | 1 | 5 | Unlimited |
| **Locations** | 1 | 1 | Unlimited |
| **POS** | ✓ | ✓ | ✓ |
| **Inventory** | ✓ | ✓ | ✓ |
| **Sales Reports** | ✓ | ✓ | ✓ |
| **Customers/Loyalty** | - | ✓ | ✓ |
| **Accounting Module** | - | ✓ | ✓ |
| **Mobile Money Integration** | - | ✓ | ✓ |
| **Multi-Branch** | - | - | ✓ |
| **API Access** | - | - | ✓ |
| **SMS Alerts** | - | ✓ | ✓ |
| **Email Reports** | - | ✓ | ✓ |
| **Support Priority** | Email | Email | Phone/Email |
| **Training** | Self-serve videos | Basic training | Onboarding session |

### Pricing Rationale

- **Basic:** Minimum viable offering for small vendors (market entry)
- **Professional:** Core value-add (customers, accounting, mobile money) - target segment
- **Enterprise:** Scale features (multi-branch, API, priority support) for growth
- **Price Point:** 5-10x cheaper than competitors (TZS 150K+ for national solutions)

### Financial Projections - Year 1

**Assumptions:**
- 10% monthly growth (first 6 months), then 5% (months 7-12)
- Mix: 50% Basic, 35% Professional, 15% Enterprise
- 5% monthly churn (voluntary cancellations)

**Projections:**

| Month | Customers | MRR (TZS) | MRR (USD) | Operating Costs | Profit/Loss |
|-------|-----------|-----------|-----------|-----------------|------------|
| 1 | 10 | 500K | $200 | 1.5M | -1M |
| 2 | 15 | 750K | $300 | 1.5M | -750K |
| 3 | 22 | 1.1M | $440 | 1.5M | -400K |
| 4 | 32 | 1.6M | $640 | 1.5M | 100K |
| 5 | 45 | 2.25M | $900 | 1.5M | 750K |
| 6 | 65 | 3.25M | $1.3K | 1.75M | 1.5M |
| 7 | 85 | 4.25M | $1.7K | 1.75M | 2.5M |
| 8 | 110 | 5.5M | $2.2K | 2M | 3.5M |
| 9 | 140 | 7M | $2.8K | 2M | 5M |
| 10 | 175 | 8.75M | $3.5K | 2.25M | 6.5M |
| 11 | 215 | 10.75M | $4.3K | 2.25M | 8.5M |
| 12 | 260 | 13M | $5.2K | 2.5M | 10.5M |

**Year 1 Summary:**
- End-of-year customers: 260+
- Annual Revenue (sum of MRR): ~TZS 58M (~USD 23K)
- Annual Operating Costs: ~TZS 21M (~USD 8.4K)
- Net Profit (Year 1): ~TZS 37M (~USD 14.6K)

**Break-even:** Month 3-4 (positive cash flow)

### Go-to-Market Strategy

#### Phase 1: Bootstrap & Beta (Months 1-3)

**Target Customer Profile:**
- Retail shops (clothing, electronics, general goods)
- Restaurants & cafes
- Pharmacies
- Salons & hair shops
- Clinics

**Acquisition Channels:**
1. **Founder's Network:**
   - Contacts from Mayocoo Co. Ltd
   - University of Dodoma alumni network
   - Personal relationships with shop owners
   - Target: 10-15 beta customers at 50% discount (TZS 12.5K-25K/month)

2. **Direct Outreach:**
   - Walk into retail shops, pitch value proposition
   - Offer 30-day free trial
   - One-on-one training sessions
   - Success metrics: Close 1 customer per 10 visits

3. **Community Events:**
   - Dodoma Chamber of Commerce meetings
   - Business association gatherings
   - Trade shows (if available)

**Marketing Materials:**
- Simple 1-page flyer (Swahili + English)
- WhatsApp business template with features
- YouTube demo video (5-10 min, showing POS flow)
- Website: dodoma-sme.app (single landing page initially)

**Success Metrics:**
- 10-20 beta customers signed up
- Product-market fit validated (NPS >30)
- Customer retention >80% (churn <20%)
- Feedback incorporated into Phase 2

#### Phase 2: Paid Acquisition (Months 4-9)

**Channels (Priority Order):**

1. **Partnerships (highest ROI):**
   - Accountants & bookkeepers in Dodoma
     - Offer affiliate commission: 3 months free per referral
     - Create partner portal (tracking referrals, payouts)
   - Consultants & business advisors
   - Supplier associations (e.g., retail suppliers who can recommend to shop owners)

2. **Digital Marketing (lower cost):**
   - Facebook Ads
     - Target: Males & females, 25-60, Dodoma region
     - Budget: TZS 50K/week (~$20)
     - Message: "Manage your shop from a phone"
   - WhatsApp Business (list on WhatsApp Business Directory)
   - Google My Business (local search visibility)

3. **Content Marketing:**
   - Blog posts (tips for small business owners)
     - "5 Ways to Reduce Inventory Shrinkage"
     - "How to Track Customer Spending"
     - "Price Optimization for Retail Shops"
   - Weekly WhatsApp tips (for subscribers)

4. **Events & Sponsorships:**
   - Sponsor local business association events
   - Host 1-day workshops ("Digital Business Management for SMEs")
   - Free demo sessions at community centers

**Sales Funnel:**
```
Landing Page (10K visits) 
  ↓ 5% conversion
Email Signup (500 signups)
  ↓ 20% conversion
Free Trial (100 trials)
  ↓ 40% conversion
Paid Customers (40)
```

**Customer Acquisition Cost (CAC):**
- Partnerships: TZS 0 (commission-based)
- Digital ads: TZS 50K per customer (budget / customers acquired)
- Average CAC (Year 1): ~TZS 30K (~$12)
- CAC payback period: 1-2 months (very healthy)

#### Phase 3: Regional Expansion (Months 10-12)

**Adjacent Markets:**
- Iringa Region (150km south)
- Mbeya Region (400km south)
- Similar demographics, SME base

**Strategy:**
- Hire 1-2 regional sales representatives (commission-based)
- Partner with local accounting firms in each region
- Replicate successful Dodoma playbook
- Target: 100+ new customers by year-end

---

### Customer Retention Strategy

**Churn Reduction Tactics:**

1. **Onboarding Program (Day 1-7):**
   - Personalized setup call (30 min)
   - Product walkthrough video
   - Checklist: complete profile, add products, first sale
   - Check-in email on Day 3

2. **Support & Education:**
   - 24/5 email support (respond within 24 hours)
   - WhatsApp support group (community help)
   - Monthly webinars on new features
   - Video tutorials (Swahili language)

3. **Engagement:**
   - Monthly email newsletter (business tips, new features)
   - Usage-based alerts ("You haven't recorded a sale in 5 days - need help?")
   - Customer success reviews (quarterly, for Professional+ customers)

4. **Feedback Loop:**
   - Monthly satisfaction survey (1-question NPS)
   - Feature request voting (customers vote on next features)
   - Beta program (invite top customers to test new features)

5. **Win-back Campaign:**
   - If customer cancels, offer 50% discount for 3 months
   - Root cause analysis (why they left?)
   - Re-engagement email series (5-email campaign)

**Target Metrics:**
- Monthly churn rate: <5% (industry benchmark ~3-7%)
- Net Retention Rate (NRR): >100% (upgrades offset cancellations)
- Customer Lifetime Value (CLV): TZS 600K+ (60+ months at Professional tier)

---

## IMPLEMENTATION ROADMAP SUMMARY

**Timeline to First Customer (Week 1-6):**
1. Week 1: Market validation (interviews with 20 shop owners)
2. Week 2-3: Tech setup (dev environment, database, API skeleton)
3. Week 4: MVP core features (POS, inventory, basic dashboard)
4. Week 5: Testing & refinement
5. Week 6: Beta launch with 5-10 friends

**Timeline to Break-Even (Month 3-4):**
- Reach 20-30 paying customers
- Monthly recurring revenue: ~TZS 1.5M-2M
- Operating costs: ~TZS 1.5M
- Small profit starting Month 4

**Timeline to Scale (Month 12):**
- 250+ customers across Dodoma & nearby regions
- Annual revenue: ~TZS 60M
- Team: yourself (CEO/CTO) + 1 part-time support person
- Profitability: Monthly profit TZS 10-15M (USD 4K-6K)

---

## TECHNOLOGY DECISIONS & RATIONALE

### Why Node.js + Express?

**Pros:**
- Fast startup & deployment (no compilation)
- Large ecosystem (npm packages)
- JavaScript/TypeScript everywhere (frontend & backend)
- Real-time capabilities (WebSocket support)
- Excellent for API development
- Cost-effective (lower memory footprint)

**Cons:**
- Single-threaded (need clustering for CPU-intensive work)
- Less mature than Django/Rails for large applications

**Verdict:** Best for MVP/startup. If data processing becomes bottleneck in Phase 3, add Python workers for heavy lifting.

### Why PostgreSQL?

**Pros:**
- Open-source, no licensing costs
- ACID compliance (critical for financial data)
- TimescaleDB extension (time-series data without additional DB)
- JSON support (flexible schemas)
- Row-Level Security (built-in multi-tenancy)
- Excellent documentation

**Cons:**
- Requires server maintenance (vs managed DB)
- Steeper learning curve than MySQL

**Verdict:** Perfect for Tanzania-based deployment. DigitalOcean offers managed PostgreSQL if we want to avoid maintenance.

### Why React for Web, React Native for Mobile?

**Web - React:**
- Industry standard (largest ecosystem)
- Reusable component library
- TypeScript support
- Excellent developer tools

**Mobile - React Native:**
- Code sharing between iOS & Android
- Faster development than native
- Access to native APIs
- Growing ecosystem

**Alternative:** Flutter (Dart) - even faster development, slightly better performance. Choose based on team expertise.

### Why DigitalOcean for Hosting?

**Comparison Table:**

| Provider | Price/mo | Reliability | TZ Support | Docs | Verdict |
|----------|----------|-------------|-----------|------|---------|
| DigitalOcean | $12-15 | 99.99% | Good | Excellent | Best |
| Linode | $12-15 | 99.9% | Good | Good | Alternative |
| AWS Lightsail | $15-20 | 99.99% | Excellent | Extensive | Too complex for MVP |
| Google Cloud | $20-30 | 99.99% | Excellent | Extensive | Too complex for MVP |
| Hetzner | $5-10 | 99.5% | Limited | German-primary | Too risky |

**Decision:** DigitalOcean for MVP. Simple, affordable, Tanzania-friendly, excellent documentation.

---

## RISKS & MITIGATION

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Offline sync bugs | Medium | High | Extensive testing, version control |
| Database corruption | Low | Critical | Daily backups, replication |
| API downtime | Medium | High | Monitoring, auto-recovery, status page |
| Mobile money integration failures | Medium | High | Test with actual M-Pesa/Airtel accounts |

### Market Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Low customer adoption | Medium | Critical | Early validation, MVP feedback loops |
| Competitor enters market | Low | Medium | Build moat via customer relationships |
| Economic downturn | Low | High | Flexible pricing, free tier option |
| Price sensitivity (TZS 50K too high) | Medium | High | Validate pricing with customers, have Basic tier |

### Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Founder burnout | Medium | High | Hire support person by Month 6 |
| Data breach | Low | Critical | Security audits, encryption, compliance |
| Key person dependency | High | Medium | Document processes, knowledge transfer |

---

## SUCCESS METRICS & KPIs

### Business Metrics

- **Monthly Recurring Revenue (MRR):** Target TZS 13M by year-end
- **Customer Acquisition Cost (CAC):** Target <TZS 30K (payback <2 months)
- **Monthly Churn Rate:** Target <5%
- **Net Retention Rate (NRR):** Target >100% (upgrades offset cancellations)
- **Customer Lifetime Value (CLV):** Target TZS 600K+

### Product Metrics

- **Daily Active Users (DAU):** Track % of customers using product daily
- **Feature Adoption:** % of customers using Accounting, Customers modules
- **API Response Time:** Target <200ms (p95)
- **System Uptime:** Target 99.9% (43min downtime/month max)
- **Error Rate:** Target <0.1% (1 error per 1000 requests)

### Customer Metrics

- **Net Promoter Score (NPS):** Target >50 (excellent)
- **Customer Satisfaction (CSAT):** Target >4.5/5
- **Support Response Time:** Target <24 hours
- **Time-to-Value:** Target customers make first sale <1 day

---

## CONCLUSION

**Dodoma SME Management Suite** is a high-potential, bootstrappable business opportunity with:

1. **Clear Market Need:** 85% of Dodoma SMEs use manual systems; 10-15% cost reduction is compelling
2. **Achievable MVP:** 3-month development timeline is realistic
3. **Strong Unit Economics:** CAC ~TZS 30K, CLV ~TZS 600K, payback <2 months
4. **Sustainable Growth:** Multiple customer acquisition channels, low churn through service quality
5. **Competitive Advantage:** Local presence, Swahili support, offline-first design

**Path to Success:**
- Months 1-3: Build MVP, get 10-20 beta customers, validate market fit
- Months 4-6: Add core features (mobile money, CRM, accounting), grow to 50-100 customers
- Months 7-12: Advanced features, regional expansion, reach 250+ customers and profitability

**Resources Required:**
- Development time: 12-16 weeks (as solo developer or small team)
- Hosting/Infrastructure: ~TZS 200K/month (~$80)
- Tools/Services: ~TZS 300K/month (~$120)
- Total bootstrap budget: ~TZS 10M (~$4K) for first year

This documentation provides everything needed to start building. Begin with market validation (Week 1), then technical implementation (Weeks 2-16).

---

**Document Prepared By:** Brayan Hawald Ngowi (Master-Bry)  
**Qualification:** BSc Software Engineering, University of Dodoma  
**Experience:** Backend Infrastructure Lead (UNICEF/UDOM), Mayocoo Co. Ltd  
**GitHub:** github.com/master-bry | **Portfolio:** master-bry.vercel.app

---

**END OF SPECIFICATION**
