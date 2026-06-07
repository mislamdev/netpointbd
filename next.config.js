/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No `output: 'export'` — this app is now a real Node server.
  // - Local dev: `npm run dev`
  // - VPS/cPanel: `npm run build && npm start`
  // - Vercel: auto-detected, no extra config
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
