# GitHub Pages Asset Loading Fix

## Problem
After deploying to GitHub Pages, CSS, JS, images, and fonts were not loading because Next.js was generating paths that didn't account for the repository base path (`/netpointbd`).

## Solution Implemented

### 1. Updated `next.config.js`
Added configuration for GitHub Pages deployment:
```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',              // Static export for GitHub Pages
  basePath: '/netpointbd',       // Repository name
  assetPrefix: '/netpointbd/',   // Prefix for all assets
  images: {
    unoptimized: true,           // GitHub Pages doesn't support Next.js image optimization
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/netpointbd',  // Environment variable for runtime
  },
}
```

### 2. Created Utility Function
Created `/lib/utils.ts` with a helper function to handle asset paths:
```typescript
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}
```

### 3. Updated All Components and Pages
- **app/layout.tsx**: Updated all CSS and favicon links to use `process.env.NEXT_PUBLIC_BASE_PATH`
- **components/Scripts.tsx**: Updated all JavaScript file paths
- **components/Header.tsx**: Updated logo and image paths using `getAssetPath()`
- **components/Footer.tsx**: Updated logo path
- **All page files**: Updated all `<img>` tags to use `getAssetPath()` function

### 4. Files Modified
- ✅ next.config.js
- ✅ app/layout.tsx
- ✅ components/Header.tsx
- ✅ components/Footer.tsx
- ✅ components/Scripts.tsx
- ✅ app/page.tsx (Home)
- ✅ app/about/page.tsx
- ✅ app/corporate/page.tsx
- ✅ app/coverage/page.tsx
- ✅ app/home-internet/page.tsx
- ✅ app/notice-board/page.tsx
- ✅ app/packages/page.tsx
- ✅ app/pay-bill/page.tsx
- ✅ app/products/page.tsx
- ✅ app/services/torrent/page.tsx

## How It Works

### Before (Broken on GitHub Pages):
```html
<img src="/assets/img/logo.svg" />
```
This would try to load from: `https://username.github.io/assets/img/logo.svg` ❌

### After (Works on GitHub Pages):
```jsx
<img src={getAssetPath('/assets/img/logo.svg')} />
```
This loads from: `https://username.github.io/netpointbd/assets/img/logo.svg` ✅

## Deployment Steps

### 1. Build the Project
```bash
npm run build
```
This will create an `out/` directory with your static site.

### 2. Commit and Push Changes
```bash
git add .
git commit -m "Fix asset loading for GitHub Pages deployment"
git push origin main
```

### 3. Verify GitHub Pages Settings
Go to your repository settings and ensure:
- Pages is enabled
- Source is set to deploy from GitHub Actions (if using the workflow)
- The site is published from the correct branch

### 4. Check the Deployment
Once the GitHub Actions workflow completes, visit:
```
https://mislamdev.github.io/netpointbd/
```

All CSS, JS, images, and fonts should now load correctly!

## Local Development

The site will still work locally because:
- The `getAssetPath()` function checks for `process.env.NEXT_PUBLIC_BASE_PATH`
- If it's empty (local dev), it just returns the path as-is
- The `basePath` in next.config.js is only applied during build

To test locally with the base path:
```bash
npm run build
npx serve out
```

## Troubleshooting

### If assets still don't load:
1. Check the browser console for 404 errors
2. Verify the paths in the network tab
3. Ensure the `out/` directory contains the `assets/` folder
4. Check that GitHub Pages is serving from the correct branch/folder

### If you change the repository name:
Update the `basePath` and `assetPrefix` in `next.config.js` to match the new repository name.

## CSS Background Images
CSS files in `public/assets/css/` use relative URLs (e.g., `url(../img/banner.jpg)`) which work correctly with the basePath configuration. No changes needed for CSS files.

## Notes
- All asset paths must use the `getAssetPath()` utility or `process.env.NEXT_PUBLIC_BASE_PATH`
- Never use hardcoded paths like `/assets/...` directly in JSX
- The `public/` folder contents are copied to the `out/` directory during build
- Font files referenced in CSS work automatically with relative paths
