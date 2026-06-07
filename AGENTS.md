# AGENTS.md

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript 5.9.
- Static site: `next.config.js` has `output: 'export'` and `images.unoptimized: true`. Build output is `out/`. No API routes, no SSR, no server actions.
- Path alias `@/*` -> `./*` (`tsconfig.json:26`).
- No test framework, no Prettier, no Husky, no `.eslintrc`. `npm run lint` runs default `next lint`.

## Commands
- `npm install` — install deps. CI uses `npm ci` on Node 24.13.0 (`.github/workflows/nextjs.yml`).
- `npm run dev` — dev server on http://localhost:3000.
- `npm run build` — static export to `out/`.
- `npm start` — does NOT work. There is no Node server because of `output: 'export'`. Preview locally with `npx serve out` (or any static host).
- `npm run lint` — default Next ESLint. No `tsc` script; typecheck is implicit via `next build`.

## Architecture / wiring
- `app/layout.tsx` is the single place that injects `Header`, `Footer`, and `<Scripts>`. Every route inherits them.
- `components/Scripts.tsx` loads jQuery (`beforeInteractive`), then Bootstrap, Owl Carousel, jarallax, nice-select, WOW, odometer, etc. (`afterInteractive`) via `next/script`, and re-initializes jQuery plugins on every route change (`usePathname()`).
- All pages in `app/**/page.tsx` are `'use client'` because they call jQuery from `useEffect` to wire plugins (jarallax, odometer, tabs, owl-carousel). Do not downgrade to server components — plugin wiring breaks.
- Reusable pieces: `components/PageTitle.tsx` (standard page banner, supports `style="centered"`), `components/ContactCallToAction.tsx` (standard "Looking for Internet" CTA), `components/Header.tsx` / `Footer.tsx`.
- Static assets live in `public/assets/{css,js,img,fonts}`. They are the original HTML assets, kept verbatim.

## Asset paths (read before adding any image or script)
- In `.tsx`/`.ts`: `import { getAssetPath } from '@/lib/utils'` and use `src={getAssetPath('/assets/img/foo.png')}` (also for `style={{ backgroundImage: \`url(${getAssetPath(...)})\` }}`).
- In `app/layout.tsx` `<link>` tags and `components/Scripts.tsx` `<Script src>`: inline `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/...` — these are string literals, not imports.
- `lib/utils.ts` is the single source of truth for the runtime base path. The build-time `basePath` in `next.config.js` is intentionally empty; CI injects the real one (see Deployment).
- CSS files in `public/assets/css/*.css` use relative URLs that Next rewrites at build time. Do not hand-edit them.
- Hardcoding `/assets/...` works locally but breaks on GitHub Pages. Always go through `getAssetPath()` or `NEXT_PUBLIC_BASE_PATH`.

## Deployment
- `.github/workflows/nextjs.yml` runs on push to `main`. It uses `actions/configure-pages@v5` with `static_site_generator: next`, which auto-injects `basePath=/<repo-name>` and disables image optimization at build time. Artifact `./out` is deployed via `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`.
- The `basePath` value in `next.config.js` is intentionally empty for local dev. Do not hardcode `/netpointbd` here.
- Human-facing setup, deploy, and historical bug-fix details live in `docs/INDEX.md` (especially `docs/Setup-and-Deployment/QUICKSTART.md` and `docs/Images-and-Assets/GITHUB_PAGES_FIX.md`). Some pages are out of sync with the current code (e.g. older guide values of `basePath`, the docs suggest `npm start` works, and the QUICKSTART says Node 18.x — CI uses 24.13.0). Trust `next.config.js`, `lib/utils.ts`, and the workflow file over prose.

## Gotchas
- `images.unoptimized: true` means `<Image>` from `next/image` is equivalent to `<img>`. The codebase uses plain `<img width height loading="lazy">` — follow that pattern.
- `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comments appear in several files. `@typescript-eslint/eslint-plugin` is not in `devDependencies`, so the directives are inert — treat them as documentation only. (Adding the plugin is not required; they exist to silence a rule that is not currently enforced.)
- `next.config.js` is CommonJS (`module.exports = nextConfig`). Do not convert to ESM unless you also rename to `.mjs`.
- Adding a page: create `app/<route>/page.tsx` with a default-exported client component. Add a nav entry in `components/Header.tsx` (note: `Services` is a dropdown there, not a route) and, if relevant, a footer link in `components/Footer.tsx`.
- `npm start` exits / errors for this repo because there is no server. Prefer `npx serve out` after `npm run build`.
- `.next/` and `out/` are gitignored and regenerated. There is no `next-env.d.ts` checked in (also gitignored).
