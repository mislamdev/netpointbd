# Setup

## Requirements

- Node.js 20+ (CI uses 24.13.0)
- npm 10+

## Local dev

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The public site works without any extra configuration because the JSON files in `/data` are checked in.

## Environment variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `JWT_SECRET` | **yes in prod** | none | A long random string used to sign admin session cookies. At least 16 chars. Generate one with `openssl rand -base64 48`. |
| `NEXT_PUBLIC_BASE_PATH` | no | empty | Path prefix for assets. Leave empty unless you serve the site from a sub-path. |
| `STORAGE_DRIVER` | no | `json` | Set to `vercel` only if you wire up the Vercel adapter in `lib/db.vercel.ts`. |

Create a `.env` file (gitignored) for local development:

```env
JWT_SECRET=replace-me-with-48-chars-of-randomness-12345
```

## Create the first admin

```bash
npm run seed:admin
```

You'll be prompted for a username, password, and role. Subsequent admins can be added from `/admin/users` after the first one logs in.

## Production build

```bash
npm run build
npm start
```

`npm start` now works (it didn't before — the site is no longer `output: 'export'`). It runs the Next.js server on port 3000 by default; set `PORT` to override.

## Cache

In-memory cache TTL: 60 s. After admin saves, the relevant JSON file's cache is invalidated automatically. The "Clear cache" button in the admin sidebar invalidates everything.

## Daily workflow

1. Log in at <https://yourdomain.com/admin/login>.
2. Edit a section. Save. The public site reflects the change on the next request (or instantly if you also click "Clear cache").
