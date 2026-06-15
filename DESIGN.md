# KoujiCloud — System Design Architecture

## Japanese Manufacturing SaaS ERP

---

## 1. HIGH-LEVEL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
│                                                                       │
│   Next.js Web App          Mobile Browser         Admin Panel        │
│   (React + Tailwind)       (Responsive)           (Super Admin)      │
└────────────────┬──────────────────┬──────────────────┬──────────────┘
                 │                  │                  │
                 └──────────────────┼──────────────────┘
                                    │ HTTPS / REST API
                    ┌───────────────▼───────────────────┐
                    │          API GATEWAY                │
                    │   Rate Limiting (100 req/min)       │
                    │   CORS Configuration                │
                    │   SSL Termination                   │
                    └───────────────┬───────────────────┘
                                    │
                    ┌───────────────▼───────────────────┐
                    │       NestJS Application            │
                    │                                     │
                    │  ┌─────────────────────────────┐   │
                    │  │     Global Middleware         │   │
                    │  │  - TenantMiddleware           │   │
                    │  │  - LoggingInterceptor         │   │
                    │  │  - TransformInterceptor       │   │
                    │  └─────────────────────────────┘   │
                    │                                     │
                    │  ┌─────────────────────────────┐   │
                    │  │     Guards Layer              │   │
                    │  │  - JwtAuthGuard               │   │
                    │  │  - RolesGuard                 │   │
                    │  │  - TenantGuard                │   │
                    │  └─────────────────────────────┘   │
                    │                                     │
                    │  ┌─────────────────────────────┐   │
                    │  │     Business Modules          │   │
                    │  │  Auth | Tenants | Users       │   │
                    │  │  Companies | Orders | Sales   │   │
                    │  │  Invoices | AR | AP           │   │
                    │  │  Inventory | DailyReports     │   │
                    │  │  Payments | Dashboard         │   │
                    │  └─────────────────────────────┘   │
                    └───────────────┬───────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
┌─────────▼────────┐   ┌───────────▼────────┐   ┌──────────▼──────┐
│   PostgreSQL      │   │      Redis           │   │  Cloudflare R2   │
│   (Primary DB)    │   │  (Cache/Sessions)    │   │  (File Storage)  │
│   Row Level Sec.  │   │  Rate Limiting       │   │  PDF Storage     │
│   Multi-tenant    │   │  Job Queues          │   │  Attachments     │
└──────────────────┘   └────────────────────┘   └─────────────────┘
```

---

## 2. MULTI-TENANCY ARCHITECTURE

### Strategy: Row-Level Multi-Tenancy + PostgreSQL RLS

```
┌─────────────────────────────────────────────────────────────────┐
│                    TENANT ISOLATION LAYERS                       │
│                                                                   │
│  Layer 1: JWT Token                                              │
│    → Every request carries tenantId in JWT payload               │
│    → Extracted by TenantMiddleware on every request              │
│                                                                   │
│  Layer 2: Prisma Middleware                                      │
│    → Automatically injects WHERE tenant_id = X                   │
│    → All queries scoped to current tenant                        │
│    → Applied to: findMany, findFirst, create, update, delete     │
│                                                                   │
│  Layer 3: PostgreSQL Row Level Security                          │
│    → Database-level enforcement                                  │
│    → Even if app bug exists, DB won't leak data                  │
│    → SET LOCAL app.tenant_id = 'uuid' per transaction            │
│                                                                   │
│  Layer 4: API Validation                                         │
│    → IDs validated against tenant ownership                      │
│    → Cross-tenant access returns 404 (not 403)                   │
└─────────────────────────────────────────────────────────────────┘

Request Flow:
  POST /api/orders
    → JWT Verified (userId, tenantId, role)
    → TenantMiddleware: sets cls.tenantId
    → JwtAuthGuard: validates token
    → RolesGuard: checks permission
    → OrdersController: handles request
    → OrdersService: calls Prisma
    → PrismaMiddleware: auto-injects tenant_id
    → PostgreSQL RLS: enforces at DB level
    → Response
```

---

## 3. DATABASE SCHEMA DESIGN

### Naming Conventions

- Tables: snake_case, plural (orders, invoices, companies)
- All tables: id (UUID), tenant_id (UUID), created_at, updated_at, deleted_at
- Foreign keys: {table_singular}\_id

### Core Tables Relationship

```
tenants (1) ──────────────────── (*) users
   │
   └─── (*) companies (取引先マスタ)
   │         │
   │         ├── (*) quotations (見積書) ──── (*) quotation_items
   │         │         │
   │         │         └── converts to →
   │         │
   │         ├── (*) orders (受注入力) ────── (*) order_papers
   │         │         │                 ├─── (*) order_prints
   │         │         │                 └─── (*) order_special_finishes
   │         │         │
   │         │         ├── (*) sales (売上入力) ──── (*) sales_allocations
   │         │         │         │
   │         │         │         ├── (*) delivery_notes ── (*) delivery_items
   │         │         │         └── (*) invoices ──────── (*) invoice_items
   │         │         │                   │
   │         │         │                   └── (*) ar_payments ── (*) ar_applications
   │         │         │
   │         │         └── (*) purchases (納品仕入) ──── AP chain
   │         │
   │         └── (*) ar_ledger (売掛管理)
   │             (*) ap_ledger (買掛管理)
   │
   ├── (*) employees (従業員マスタ)
   │         └── (*) daily_reports ──── (*) daily_report_items
   │         └── (*) alcohol_checks
   │         └── (*) approval_requests
   │
   ├── (*) machines (機械マスタ)
   ├── (*) inventory (在庫管理)
   └── (*) consumables (消耗品マスタ)
             └── (*) consumable_orders
```

---

## 4. API DESIGN

### URL Structure

```
Base: /api/v1/

Auth:
  POST   /api/v1/auth/register
  POST   /api/v1/auth/login
  POST   /api/v1/auth/refresh
  POST   /api/v1/auth/logout

Tenants:
  POST   /api/v1/tenants              Create tenant (super admin)
  GET    /api/v1/tenants/me           Get my tenant
  PATCH  /api/v1/tenants/me          Update tenant settings

Users:
  GET    /api/v1/users                List users
  POST   /api/v1/users/invite         Invite user
  PATCH  /api/v1/users/:id            Update user
  DELETE /api/v1/users/:id            Deactivate user

Companies (取引先マスタ):
  GET    /api/v1/companies
  POST   /api/v1/companies
  GET    /api/v1/companies/:id
  PATCH  /api/v1/companies/:id
  DELETE /api/v1/companies/:id
  GET    /api/v1/companies/:id/balance

Orders (受注入力):
  GET    /api/v1/orders
  POST   /api/v1/orders
  GET    /api/v1/orders/:id
  PATCH  /api/v1/orders/:id
  PATCH  /api/v1/orders/:id/status
  GET    /api/v1/orders/stats

Sales (売上入力):
  GET    /api/v1/sales
  POST   /api/v1/sales
  GET    /api/v1/sales/:id
  PATCH  /api/v1/sales/:id
  GET    /api/v1/sales/by-closing-date/:date

Invoices (請求書管理):
  GET    /api/v1/invoices
  POST   /api/v1/invoices
  GET    /api/v1/invoices/:id
  POST   /api/v1/invoices/batch        Batch by closing date
  GET    /api/v1/invoices/:id/pdf
  POST   /api/v1/invoices/:id/send
  POST   /api/v1/invoices/:id/payment

AR (売掛管理):
  GET    /api/v1/ar
  GET    /api/v1/ar/aging              AR aging report
  GET    /api/v1/ar/by-closing/:date   By closing date
  POST   /api/v1/ar/payment            Record payment

Inventory (在庫管理):
  GET    /api/v1/inventory
  GET    /api/v1/inventory/alerts       Low stock
  POST   /api/v1/inventory/adjust       Manual adjustment
  GET    /api/v1/inventory/movements

Dashboard:
  GET    /api/v1/dashboard/summary
  GET    /api/v1/dashboard/ar-aging
  GET    /api/v1/dashboard/sales-trend
```

### Standard Response Format

```typescript
// Success List
{
  data: T[],
  meta: { total: number, page: number, limit: number, totalPages: number }
}

// Success Single
{ data: T }

// Error
{
  statusCode: number,
  message: string,
  errors?: { field: string, message: string }[]
}
```

---

## 5. AUTHENTICATION FLOW

```
Registration:
  POST /auth/register
    → Validate email unique
    → Create tenant record
    → Create user (role: admin)
    → Hash password (bcrypt)
    → Send verification email
    → Return tokens

Login:
  POST /auth/login
    → Validate email/password
    → Check tenant active
    → Generate access token (15min)
    → Generate refresh token (7days)
    → Store refresh token hash in DB
    → Return both tokens

Token Refresh:
  POST /auth/refresh
    → Validate refresh token
    → Check not revoked
    → Issue new access token
    → Rotate refresh token

JWT Payload:
  {
    sub: userId,
    tenantId: tenantId,
    role: 'admin' | 'manager' | 'staff' | 'readonly',
    email: email,
    iat: issuedAt,
    exp: expiry
  }
```

---

## 6. ROLE & PERMISSION MATRIX

```
Role        | Companies | Orders | Sales | Invoices | AR/AP | Settings
────────────┼──────────┼───────┼───────┼──────────┼───────┼─────────
super_admin | CRUD      | CRUD  | CRUD  | CRUD     | CRUD  | CRUD
admin       | CRUD      | CRUD  | CRUD  | CRUD     | CRUD  | CRUD
manager     | CRUD      | CRUD  | CRUD  | CR       | R     | R
staff       | CR        | CRUD  | CRUD  | CR       | R     | -
readonly    | R         | R     | R     | R        | R     | -
```

---

## 7. MODULE STRUCTURE (NestJS)

```
Each module follows this pattern:
  module.ts          → NestJS module definition
  controller.ts      → Route handlers, Swagger docs
  service.ts         → Business logic
  dto/
    create-X.dto.ts  → Input validation (class-validator)
    update-X.dto.ts  → Partial of create DTO
    query-X.dto.ts   → Filter/pagination params
  entities/
    X.entity.ts      → TypeScript type for DB model
```

---

## 8. JAPANESE BUSINESS LOGIC LAYER

```
Tax Calculation Service:
  calculateTax(amount, rate) → FLOOR(amount * rate)
  splitByTaxRate(items) → { amount10, tax10, amount8, tax8, exempt, outOfScope }

Closing Date Service:
  getClosingPeriod(closingDay, referenceDate) → { start: Date, end: Date }
  getNextPaymentDate(closingDay, paymentTerms) → Date

AR/AP Update Service:
  updateArBalance(tenantId, customerId, yearMonth) → void
  rolloverArMonth(tenantId, yearMonth) → void

Invoice Generation Service:
  batchGenerateInvoices(tenantId, closingDay) → Invoice[]
  validateInvoiceCompliance(invoice) → ValidationResult

Zengin Data Service:
  generateZenginFile(payments) → string (fixed-length bank transfer format)
```
