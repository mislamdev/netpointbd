# Migration — what was moved out of inline arrays

The previous codebase had every content list hard-coded as a const array at the top of each `app/**/page.tsx`. After this refactor, those arrays live in JSON files and the pages read them at request time.

| Old location | New location |
|---|---|
| `app/services/live-tv/page.tsx` → `liveTVServices` | `data/services.json` → `live-tv.items` |
| `app/services/ftp-server/page.tsx` → `ftpServers` | `data/services.json` → `ftp-server.items` |
| `app/services/torrent/page.tsx` → (single item) | `data/services.json` → `torrent.items` |
| `app/services/bangla-library/page.tsx` → `libraries` | `data/services.json` → `bangla-library.items` |
| `app/services/song-zone/page.tsx` → `musicServices` | `data/services.json` → `song-zone.items` |
| `app/services/newspaper/page.tsx` → `newspapers` | `data/services.json` → `newspaper.items` |
| `app/services/jobs/page.tsx` → `jobSites` | `data/services.json` → `jobs.items` |
| `app/services/gov-websites/page.tsx` → `govWebsites` | `data/services.json` → `gov-websites.items` |
| `app/services/education/page.tsx` → `educationSites` | `data/services.json` → `education.items` |
| `app/services/court-of-law/page.tsx` → `legalSites` | `data/services.json` → `court-of-law.items` |
| `app/services/online-shop-point/page.tsx` → `shoppingSites` | `data/services.json` → `online-shop-point.items` |
| `app/services/all-type-tickets/page.tsx` → `ticketSites` | `data/services.json` → `all-type-tickets.items` |
| `app/services/emergency-service/page.tsx` → `emergencyServices` | `data/services.json` → `emergency-service.items` |
| `app/services/{slug}/page.tsx` (13 files) | **one** `app/services/[slug]/page.tsx` |
| `app/packages/page.tsx` → 3 inline tab blocks | `data/packages.json` |
| `app/home-internet/page.tsx` → 6 inline plans | `data/packages.json` → `home.plans` |
| `app/corporate/page.tsx` → 1 inline plan | `data/packages.json` → `corporate.plans` |
| `app/products/page.tsx` → `products` | `data/products.json` |
| `app/coverage/page.tsx` → `areas` | `data/coverage.json` |
| `app/notice-board/page.tsx` (empty tbody) | `data/notices.json` (empty array) |
| `app/contact/page.tsx` → hard-coded phone, email, address | `data/settings.json` → `contact` |
| `app/page.tsx` → hard-coded hero/features tabs | `data/settings.json` → `home` |
| `app/about/page.tsx` → static text | `data/settings.json` → `about` |
| `components/Header.tsx` → hard-coded phone/email/social | `data/settings.json` → `contact` |
| `components/Footer.tsx` → hard-coded blurb, address, social | `data/settings.json` → `footer` + `contact` |

## Image path convention

In the old code, each image path was wrapped in `getAssetPath(...)` at module evaluation time. After the migration, image paths are stored **without** the `getAssetPath(...)` wrapper. They are stored as raw `/assets/...` or `/uploads/...` strings. The pages and admin UI call `getAssetPath()` at render time, which still works the same way.

## Behavior preserved

The 13 service URLs are unchanged. There is now a single `app/services/[slug]/page.tsx` that handles all 13. The header dropdown still lists them by name; the names are static, not data-driven.

## The 13 old service sub-folders

Removed and replaced by `app/services/[slug]/page.tsx`:

```
app/services/{live-tv,ftp-server,torrent,bangla-library,song-zone,newspaper,
              jobs,gov-websites,education,court-of-law,online-shop-point,
              all-type-tickets,emergency-service}/page.tsx  →  deleted
app/services/[slug]/page.tsx                                →  new
```
