# Deployment Guide

## Deploying Net Point BD Next.js Website

This guide covers various deployment options for your Next.js website.

---

## Option 1: Vercel (Recommended) ⭐

Vercel is the company behind Next.js and offers the best integration.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Configuration** (automatic)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Custom Domain
1. Go to Project Settings > Domains
2. Add your domain: `netpoint.com.bd`
3. Update DNS records as instructed

**Benefits:**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on push
- ✅ Preview deployments for PRs

---

## Option 2: Netlify

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     ```
     Build command: npm run build
     Publish directory: .next
     ```

3. **Add netlify.toml** (optional)
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

---

## Option 3: Traditional VPS/Server

### Requirements:
- Node.js 18+ installed
- Process manager (PM2 recommended)
- Nginx (for reverse proxy)

### Steps:

1. **Upload Files to Server**
   ```bash
   scp -r netpoint-nextjs user@your-server:/var/www/
   ```

2. **Install Dependencies**
   ```bash
   cd /var/www/netpoint-nextjs
   npm install
   npm run build
   ```

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Start Application**
   ```bash
   pm2 start npm --name "netpoint" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   Create `/etc/nginx/sites-available/netpoint`:
   ```nginx
   server {
       listen 80;
       server_name netpoint.com.bd www.netpoint.com.bd;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable Site**
   ```bash
   ln -s /etc/nginx/sites-available/netpoint /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

7. **SSL Certificate** (Let's Encrypt)
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d netpoint.com.bd -d www.netpoint.com.bd
   ```

---

## Option 4: Static Export

Export as static HTML files for traditional hosting.

### Steps:

1. **Update next.config.js**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   
   module.exports = nextConfig
   ```

2. **Build Static Site**
   ```bash
   npm run build
   ```

3. **Deploy Output**
   - Files will be in `out/` folder
   - Upload to any static hosting (shared hosting, cPanel, etc.)
   - Point web server to `out/` directory

**Note:** Some features won't work in static export:
- No API routes
- No server-side rendering
- No dynamic routing with fallback

---

## Option 5: Docker Deployment

### Dockerfile

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  netpoint:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### Deploy:
```bash
docker-compose up -d
```

---

## Environment Variables

Create `.env.local` for environment-specific settings:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://netpoint.com.bd
NEXT_PUBLIC_API_URL=https://api.netpoint.com.bd

# Analytics (optional)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# Contact Form (if using API)
CONTACT_EMAIL=info@netpoint.com.bd
```

---

## Pre-Deployment Checklist

### ✅ Before Deploying:

- [ ] Test all pages locally
- [ ] Verify all links work
- [ ] Check responsive design
- [ ] Test contact forms
- [ ] Verify payment gateway links
- [ ] Check image loading
- [ ] Test on multiple browsers
- [ ] Run production build locally
- [ ] Update meta tags/SEO
- [ ] Configure environment variables
- [ ] Set up error tracking (optional)
- [ ] Configure analytics (optional)

### Build Test:
```bash
npm run build
npm start
# Visit http://localhost:3000
```

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit your domain
- [ ] Test all pages
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate
- [ ] Test forms and interactions

### 2. Performance Testing
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

### 3. SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt
- [ ] Check meta tags
- [ ] Test social media sharing

### 4. Monitoring (Optional)
- Set up uptime monitoring
- Configure error tracking (Sentry)
- Add analytics (Google Analytics)

---

## Updating the Site

### For Git-based deployments (Vercel/Netlify):
```bash
# Make changes
git add .
git commit -m "Description of changes"
git push
# Automatic deployment triggers
```

### For Server deployment:
```bash
# SSH to server
cd /var/www/netpoint-nextjs
git pull
npm install
npm run build
pm2 restart netpoint
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Change port
PORT=3001 npm start
```

### 502 Bad Gateway
- Check if Node.js process is running
- Verify Nginx configuration
- Check firewall settings

### Slow Performance
- Enable Gzip compression
- Configure caching headers
- Use CDN for assets
- Optimize images

---

## Backup Strategy

### What to Backup:
1. Source code (Git repository)
2. Environment variables
3. Database (if any)
4. Uploaded files/assets

### Automated Backup Script:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf netpoint-backup-$DATE.tar.gz /var/www/netpoint-nextjs
# Upload to backup server or cloud storage
```

---

## Cost Comparison

| Platform | Free Tier | Paid Plans | Custom Domain | SSL |
|----------|-----------|------------|---------------|-----|
| Vercel | Yes | From $20/mo | Yes | Free |
| Netlify | Yes | From $19/mo | Yes | Free |
| VPS | No | From $5/mo | Yes | Free (Let's Encrypt) |
| Shared Hosting | No | From $3/mo | Usually included | Varies |

---

## Support & Help

### Resources:
- Next.js Documentation: https://nextjs.org/docs
- Vercel Support: https://vercel.com/support
- Community Forums: https://github.com/vercel/next.js/discussions

### Need Help?
Contact Net Point BD technical team:
- Email: info@netpoint.com.bd
- Phone: 01923315047

---

**Ready to deploy! 🚀**

Choose the option that best fits your needs and follow the steps above.
