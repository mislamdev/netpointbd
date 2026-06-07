# Admin Backend Plan — Net Point BD

A lightweight admin dashboard and JSON-file backend for managing the Net Point BD marketing site. Replaces the current hard-coded data with a CMS-style editor, while keeping the site deployable to a VPS, cPanel Node.js, or Vercel.

---

## Goals

- Single Next.js 16 codebase that serves the public site, an admin dashboard at `/admin`, and a JSON REST API at `/api/*`.
- Storage layer: JSON files in `/data` (default, "lightweight" path). Opt-in `STORAGE_DRIVER=vercel` swaps in Vercel KV / Turso for Vercel deployments.
- Cache: 60 s in-memory TTL per file + content-hash invalidation. "Clear cache" button in admin; auto-invalidated on every write.
- Auth: multiple admin accounts in `data/users.json`, `bcryptjs`-hashed passwords, JWT in httpOnly cookie.
- Free-form page text: plain inputs and textareas (no WYSIWYG).
- Image upload: `POST /api/upload` writes to `public/uploads/`.
- Three deploy guides: VPS (Ubuntu + Nginx + PM2 + LetsEncrypt), cPanel NodeJS, Vercel.

## What the admin can edit

| Section | Editable in admin |
|---|---|
| 13 service sub-pages | Add/edit/delete `{name, url, image}` cards per service; per-service page title and description |
| Internet packages | Add/edit/delete plans in Home / Corporate / Government tabs (name, price, currency, features list) |
| Products | Add/edit/delete products (name, price, image) |
| Coverage areas | Add/edit/delete areas with optional Google Maps coords |
| Notice board | Add/edit/delete notices (date, title, optional PDF/file URL) |
| Contact info | Phones, emails, address, social links (Facebook/YouTube/LinkedIn/Twitter) |
| Site-wide notification | Enable/disable banner; type (info/warning/success); text; optional link |
| Free-form page text | Home hero, About, Home Internet, Corporate, Footer blurb |

## Data files (default JSON driver)

- `/data/services.json` (keyed by 13 slugs)
- `/data/packages.json` (3 tabs)
- `/data/products.json` (array)
- `/data/coverage.json` (array)
- `/data/notices.json` (array)
- `/data/settings.json` (contact + notification + per-page text)
- `/data/users.json` (admin accounts)
- `/public/uploads/` (user-uploaded images, gitignored)

## Architecture

```
/app
  /(public)                          public marketing site
    page.tsx                         home (data-driven)
    layout.tsx                       header/footer/notification banner
    packages/page.tsx
    products/page.tsx
    coverage/page.tsx
    notice-board/page.tsx
    contact/page.tsx
    about/page.tsx
    home-internet/page.tsx
    corporate/page.tsx
    pay-bill/page.tsx
    services/[slug]/page.tsx         consolidates 13 sub-pages
  /admin
    login/page.tsx
    page.tsx                         dashboard home
    services/page.tsx
    services/[slug]/page.tsx
    packages/page.tsx
    products/page.tsx
    coverage/page.tsx
    notices/page.tsx
    pages/page.tsx
    settings/page.tsx
    users/page.tsx
  /api
    auth/{login,logout,me}/route.ts
    services/[slug]/route.ts
    packages/route.ts
    products/[id]/route.ts
    coverage/[id]/route.ts
    notices/[id]/route.ts
    pages/[key]/route.ts
    settings/route.ts
    users/[id]/route.ts
    upload/route.ts
    revalidate/route.ts
/lib
  auth.ts                            JWT + bcrypt
  db.ts                              JSON file CRUD (default driver)
  db.vercel.ts                       KV/Turso adapter (opt-in)
  cache.ts                           in-memory + content-hash cache
  lock.ts                            per-file async mutex
  schemas.ts                         zod schemas for every section
  types.ts                           shared types
  rbac.ts                            admin/editor role checks
/middleware.ts                       protects /admin and /api/*
/docs/Admin-Backend/
  INDEX.md
  DATA-MODEL.md
  AUTH.md
  SETUP.md
  DEPLOY-VPS.md
  DEPLOY-CPANEL.md
  DEPLOY-VERCEL.md
  MIGRATION.md
```

## Dependencies (all small)

- `bcryptjs` — password hashing
- `jose` — JWT (Edge-runtime safe)
- `zod` — request validation
- `proper-lockfile` — per-file mutex for concurrent JSON writes
- `clsx` — admin UI class merging
- No Tailwind, no UI lib, no DB.

## Build order

1. Strip `output: 'export'`, `basePath`, `assetPrefix` from `next.config.js`. Update CI workflow.
2. Add `lib/*` (db, auth, cache, lock, schemas, types, rbac).
3. Add `data/*.json` seeded from current hard-coded arrays via `scripts/seed-from-current.ts`.
4. Add `/api/*` routes.
5. Add `middleware.ts` for auth.
6. Add `/admin/*` UI.
7. Refactor public pages to read from JSON; consolidate 13 service files into one dynamic route.
8. Add `components/NotificationBanner.tsx`; wire layout/header/footer to settings.
9. Add `scripts/seed-admin.ts` to create the first admin.
10. Write all `/docs/Admin-Backend/*` guides.
11. Manual smoke test end-to-end.
