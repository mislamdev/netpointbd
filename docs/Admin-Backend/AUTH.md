# Authentication

## Storage

- File: `data/users.json`.
- Shape: `[{ id, username, passwordHash, role, createdAt, lastLogin }]`.
- `passwordHash` is a bcrypt hash (`bcryptjs`, 10 rounds).
- `role` is either `admin` or `editor`.

## Roles

| Action | admin | editor |
|---|---|---|
| Sign in to `/admin` | yes | yes |
| Edit services / packages / products / coverage / notices / settings | yes | yes |
| Manage users (`/admin/users`, `/api/users/*`) | yes | **no** |
| Clear cache | yes | yes |

`middleware.ts` enforces that `/admin/*` and `/api/*` (except `/api/auth/*`) require a valid session. Per-route handlers do the finer-grained role check.

## Session

- JWT signed with `HS256` and a secret from `JWT_SECRET`.
- Stored in an httpOnly cookie named `np_admin_session`.
- Lifetime: 8 hours.
- `secure` flag is on when `NODE_ENV=production`.

## Creating the first admin

```bash
npm run seed:admin
```

Adding more users: sign in as an admin, go to **Admin users**, click **+ Add user**.

## Login flow

1. Browser posts `{username, password}` to `/api/auth/login`.
2. Server bcrypt-compares and signs a JWT, sets the cookie.
3. Subsequent requests send the cookie; `middleware.ts` verifies it.
4. Logout posts to `/api/auth/logout`, which clears the cookie.

## Reset a password

From the admin Users page, click **Reset password** on a row and enter a new one. Or, for the first admin, re-run `npm run seed:admin` (it refuses to overwrite an existing username; create a new admin and delete the old one from the UI).
