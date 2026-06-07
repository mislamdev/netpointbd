# Deploy — VPS (Ubuntu 22.04 / 24.04)

The lightweight JSON path. JSON files in `/data` and uploaded images in `/public/uploads` are persisted on disk.

## 0. What you need

- A VPS with a public IP and a DNS A-record pointing at it.
- A non-root `sudo` user.
- Node 20+ installed (use [nvm](https://github.com/nvm-sh/nvm) or the [NodeSource](https://github.com/nodesource/distributions) packages).

## 1. Install system packages

```bash
sudo apt update
sudo apt install -y nginx git
```

## 2. Clone the repo and install deps

```bash
sudo mkdir -p /var/www/netpoint
sudo chown $USER:$USER /var/www/netpoint
git clone https://github.com/<your-org>/netpointbd.git /var/www/netpoint
cd /var/www/netpoint
npm ci
```

## 3. Configure environment

```bash
sudo nano /var/www/netpoint/.env
```

```env
JWT_SECRET=<paste 48+ chars from `openssl rand -base64 48`>
NODE_ENV=production
```

```bash
sudo chown -R $USER:$USER /var/www/netpoint/.env
chmod 600 /var/www/netpoint/.env
```

## 4. Build

```bash
npm run build
```

## 5. Create the first admin

```bash
npm run seed:admin
```

## 6. Run with PM2

```bash
sudo npm install -g pm2
pm2 start npm --name netpoint -- start
pm2 save
pm2 startup systemd   # follow the printed command
```

`pm2 startup` will print a `sudo` command — run it.

## 7. Nginx reverse proxy

```bash
sudo nano /etc/nginx/sites-available/netpoint
```

```nginx
server {
  server_name yourdomain.com www.yourdomain.com;

  client_max_body_size 10M;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }

  location /uploads/ {
    alias /var/www/netpoint/public/uploads/;
    expires 7d;
    access_log off;
  }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/netpoint /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 8. HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will edit the Nginx config and reload. The certificate auto-renews via a systemd timer.

## 9. Persist `/data` and `/public/uploads` between deploys

When you `git pull && npm ci && npm run build` on the next deploy, the `/data` and `/public/uploads` directories in the project root are **not** touched (they're gitignored or only contain `.gitkeep`). Just make sure the deploying user owns them.

## 10. Backups

Add a daily cron job that copies `/var/www/netpoint/data` and `/var/www/netpoint/public/uploads` somewhere safe:

```bash
0 3 * * * tar czf /backup/netpoint-$(date +\%F).tgz -C /var/www/netpoint data public/uploads
```

## 11. Logs

```bash
pm2 logs netpoint
```

## 12. Restart after deploy

```bash
cd /var/www/netpoint
git pull
npm ci
npm run build
pm2 restart netpoint
```

`/data` and `/public/uploads` are preserved across this sequence.
