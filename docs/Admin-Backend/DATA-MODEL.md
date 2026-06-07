# Data model

All content is in `data/*.json`. Every file is keyed by section. Adding a new entry to the admin UI creates a row with a random `id` (UUID v4) and the file is atomically written.

## Files

| File | Shape | Edited by |
|---|---|---|
| `services.json` | keyed by 13 service slugs → `{pageTitle, pageDescription, items[]}` | `/admin/services/[slug]` |
| `packages.json` | `{ home, corporate, government }` each with `{title, plans[]}` | `/admin/packages` |
| `products.json` | array of products | `/admin/products` |
| `coverage.json` | array of areas | `/admin/coverage` |
| `notices.json` | array of notices | `/admin/notices` |
| `settings.json` | `{contact, notification, home, about, homeInternet, corporate, footer}` | `/admin/settings` |
| `users.json` | array of admin users | `/admin/users` |

## `services.json`

Keyed by one of the 13 supported slugs (defined in `lib/types.ts`):

```
live-tv, ftp-server, torrent, bangla-library, song-zone, newspaper, jobs,
gov-websites, education, court-of-law, online-shop-point, all-type-tickets, emergency-service
```

Each value:

```ts
{
  pageTitle: string,
  pageDescription: string,
  items: [
    { id: string, name: string, url: string, image: string }
  ]
}
```

- `url` must be a full URL or an absolute path (`/...`).
- `image` is `/assets/...` for static images or `/uploads/...` for admin uploads.

## `packages.json`

```ts
{
  home:      { title: string, plans: PackagePlan[] },
  corporate: { title: string, plans: PackagePlan[] },
  government:{ title: string, plans: PackagePlan[] },
}

PackagePlan = {
  id: string,
  name: string,
  price: number,        // 0 = "Custom"
  currency: string,     // "৳"
  unit: string,         // "/Month"
  features: string[],
  order: number,        // ascending
}
```

The public `/packages` page shows all three tabs; `/home-internet` shows only `home`; `/corporate` shows only `corporate`.

## `products.json`

```ts
{ id, name, price, image, alt, order }
```

## `coverage.json`

```ts
{ id, name, coords: string /* "lat,lng" or "" */, order }
```

Empty `coords` renders a card with a disabled link.

## `notices.json`

```ts
{ id, date: "YYYY-MM-DD", title, fileUrl: string }
```

`fileUrl` empty = "no attachment".

## `settings.json`

```ts
{
  contact: {
    phones: [{label, number}],   // label "WhatsApp" and "Support" are special-cased in the header
    emails: string[],
    address: string,
    social: { facebook, youtube, linkedin, twitter }   // each "" hides the icon
  },
  notification: {
    enabled: boolean,
    type: "info" | "warning" | "success" | "danger",
    text: string,
    link: string | null
  },
  home: {
    hero: { title, subtitle, ctaLabel, ctaHref },
    noticeboard: string,
    stats: [{label, value}],
    features: [{icon, title, text}]   // icon: flaticon class name
  },
  about:        { title, body, mission },
  homeInternet: { title, body },
  corporate:    { title, body },
  footer:       { companyBlurb }
}
```

The home page is rendered from `home.hero`, `home.features`. The about/home-internet/corporate pages use the matching `body` for the meta description.

## `users.json`

```ts
{ id, username, passwordHash, role: "admin" | "editor", createdAt, lastLogin }
```

`passwordHash` is bcrypt. Don't edit by hand.
