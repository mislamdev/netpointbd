# Admin Backend — Index

A lightweight admin dashboard and JSON-file backend for the Net Point BD marketing site.

## Start here

- [PLAN.md](./PLAN.md) — original design plan
- [SETUP.md](./SETUP.md) — first-time local setup, environment variables, and the `seed:admin` flow
- [AUTH.md](./AUTH.md) — admin users, roles, JWT cookie
- [DATA-MODEL.md](./DATA-MODEL.md) — every JSON file's shape and how it maps to the public site

## Deployment

Three supported targets, pick one:

- [DEPLOY-VPS.md](./DEPLOY-VPS.md) — recommended for the lightweight JSON path (Ubuntu + Nginx + PM2 + LetsEncrypt)
- [DEPLOY-CPANEL.md](./DEPLOY-CPANEL.md) — shared hosting with cPanel's Node.js App feature
- [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) — opt-in adapter for Vercel KV / Turso (the JSON files in `/data` will **not** persist on Vercel serverless)

## Operational notes

- [MIGRATION.md](./MIGRATION.md) — what was moved out of inline arrays into JSON
