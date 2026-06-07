# Deploy — cPanel Node.js App

For shared hosting that exposes the cPanel "Setup Node.js App" feature. The JSON file path works as long as the cPanel filesystem is persistent.

## 0. Prerequisites

- A cPanel account with Node.js App support (most modern cPanel hosts).
- SSH access is recommended but not strictly required — you can upload via the cPanel File Manager.

## 1. Upload the project

Either `git clone` over SSH, or upload a tarball via the File Manager. Put the project in a folder like `~/netpointbd` outside `public_html`:

```bash
cd ~
git clone https://github.com/<your-org>/netpointbd.git netpointbd
cd netpointbd
npm ci
npm run build
```

## 2. Create the Node.js application

In cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
|---|---|
| Node.js version | 20 or newer |
| Application mode | Production |
| Application root | `netpointbd` |
| Application URL | the domain or subdomain that should serve the app |
| Application startup file | `server.js` *(see step 3)* |
| Passenger log file | default |

Click **Create**.

## 3. Add a `server.js` entry point (only if cPanel needs one)

cPanel's Node.js App usually uses Phusion Passenger, which can start a Next.js standalone server. Add this minimal `server.js` at the project root:

```js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
```

## 4. Environment variables

In the same Setup Node.js App screen, scroll to **Environment variables** and add:

| Name | Value |
|---|---|
| `JWT_SECRET` | a long random string (use `openssl rand -base64 48`) |
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_BASE_PATH` | *(leave empty unless serving from a sub-path)* |

## 5. Create the first admin

Open SSH (or use cPanel's Terminal) and run:

```bash
cd ~/netpointbd
npm run seed:admin
```

## 6. Restart the application

In Setup Node.js App, click **Restart** for the application. The app is now live at the URL you chose.

## 7. Persisting data and uploads

`data/` and `public/uploads/` are inside the project root, which cPanel keeps across deploys as long as you don't delete the folder. After a fresh upload, you may need to `mkdir -p public/uploads` once (the `.gitkeep` is checked in so it should be present, but if you did a clean upload without the `.gitkeep` it will be missing — `mkdir` is harmless).

## 8. Backups

In cPanel → **Backup**, schedule a partial backup that includes `netpointbd/data/` and `netpointbd/public/uploads/`.

## Caveats

- Some cPanels limit the Node.js process to a small amount of RAM. The admin UI is lightweight; the public site has 13 service pages, a packages tabs page, and the rest, all rendered from JSON — should be fine.
- If you can't run `npm ci` from SSH, build the project on your local machine (`npm run build`), then upload the built output **plus** `data/`, `public/`, `.env`, and `node_modules/`. Slower, but works.
