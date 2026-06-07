# Deploy — Vercel (with caveats)

> **TL;DR**: The default storage layer is JSON files in `/data`. Vercel serverless functions have an **ephemeral filesystem** — those files will not survive a cold start. To deploy on Vercel you must either:
>
> 1. Skip Vercel and use a VPS or cPanel. See [DEPLOY-VPS.md](./DEPLOY-VPS.md).
> 2. Implement the Vercel adapter in `lib/db.vercel.ts` (instructions below) so content is persisted to Vercel KV, Turso, or another durable backend. The admin UI does not change.

This document covers option 2.

## How the storage switch works

`lib/db.ts` checks `process.env.STORAGE_DRIVER`. If it's `vercel`, the API routes and admin pages should call `vercelRead` / `vercelWrite` from `lib/db.vercel.ts` instead of the JSON file helpers.

The `lib/db.vercel.ts` file in the repo is a stub that throws. You must implement it.

## Option A — Vercel KV (Redis)

1. In the Vercel dashboard for the project, open **Storage** → **Create** → **KV**.
2. Accept the defaults; Vercel adds the `KV_*` env vars automatically.
3. Install the client:
   ```bash
   npm install @vercel/kv
   ```
4. Replace `lib/db.vercel.ts` with:
   ```ts
   import { kv } from "@vercel/kv";
   import type { JsonFile } from "./types";

   const KEY: Record<JsonFile, string> = {
     services: "np:services",
     packages: "np:packages",
     products: "np:products",
     coverage: "np:coverage",
     notices:  "np:notices",
     settings: "np:settings",
     users:    "np:users",
   };

   export async function vercelRead<T>(file: JsonFile): Promise<T | null> {
     const v = await kv.get<T>(KEY[file]);
     return v ?? null;
   }

   export async function vercelWrite<T>(file: JsonFile, data: T): Promise<void> {
     await kv.set(KEY[file], data);
   }
   ```
5. Add a one-time seed step that reads each `data/*.json` from the repo (committed at build time) and writes it to KV on first deploy. See "Seeding KV" below.
6. Set `STORAGE_DRIVER=vercel` in Vercel project env vars.

## Option B — Turso (libSQL)

1. Create a Turso database and grab a token.
2. Install the client:
   ```bash
   npm install @libsql/client
   ```
3. Set `TURSO_URL` and `TURSO_TOKEN` env vars.
4. In `lib/db.vercel.ts` (or a new `lib/db.turso.ts`), create one table per file with a single `id` primary key and a `data` JSON column. Map `JsonFile` → table name.

## Seeding KV / Turso on first deploy

You have two options:

- **Manual**: run a one-time script (`npx tsx scripts/seed-kv.ts`) locally with the Vercel env vars exported.
- **Build-time**: add a `scripts/prebuild.ts` that calls the read-helper to upsert seed data when KV is empty.

## Uploads

`public/uploads/` is also ephemeral on Vercel. You must move uploads to:

- Vercel Blob (`@vercel/blob`) — recommended
- An S3-compatible bucket
- Cloudinary

Update `app/api/upload/route.ts` to call the appropriate SDK. The admin UI does not need to change — it just posts to `/api/upload` and reads back `{ url }`.

## Why this is the "opt-in" path

- The repo is designed for self-hosting first. The default `lib/db.ts` (JSON files) is the smallest possible moving part.
- The Vercel adapter is intentionally a stub so the team can pick the right backend (KV vs. Turso vs. Blob vs. S3) at deploy time without coupling it to the rest of the code.
- For "real" production with multiple users, **Vercel KV + Vercel Blob** is a 10-line change and the only path on Vercel.
