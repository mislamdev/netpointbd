# Net Point BD - Next.js Website

This is a Next.js conversion of the Net Point BD HTML website. The website provides information about internet services, packages, and connectivity solutions in Bogura, Bangladesh.

## Features

- ✅ Server-side rendering with Next.js App Router
- ✅ TypeScript support
- ✅ Responsive design (preserved from original HTML)
- ✅ All original CSS and JavaScript libraries included
- ✅ SEO optimized
- ✅ Fast page transitions

## 📚 Documentation

Comprehensive documentation is available in the **[docs](./docs/)** folder:
- [INDEX.md](./docs/INDEX.md) - Complete index of all documentation organized by category
- Setup guides, deployment instructions, fix documentation, and more

Quick links:
- **[Quick Start Guide](./docs/QUICKSTART.md)** - Get started quickly
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deploy to production
- **[GitHub Pages Setup](./docs/GITHUB_PAGES_FIX.md)** - Deploy to GitHub Pages

## Project Structure

```
netpoint-nextjs/
├── app/
│   ├── layout.tsx          # Main layout with Header and Footer
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── packages/           # Packages page
│   ├── home-internet/      # Home internet page
│   ├── corporate/          # Corporate page
│   ├── coverage/           # Coverage area page
│   ├── products/           # Products page
│   ├── pay-bill/           # Pay bill page
│   ├── notice-board/       # Notice board page
│   └── services/           # Services pages
├── components/
│   ├── Header.tsx          # Header component
│   ├── Footer.tsx          # Footer component
│   └── Scripts.tsx         # JavaScript libraries loader
├── public/
│   └── assets/             # All static assets (CSS, JS, images, fonts)
├── docs/                   # 📚 Documentation folder
│   ├── INDEX.md            # Documentation index
│   └── *.md                # All project documentation
├── next.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

### Installation

1. Navigate to the project directory:
```bash
cd netpoint-nextjs
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

After building, start the production server:

```bash
npm start
```

## Pages

- **Home** (`/`) - Main landing page with services overview
- **About** (`/about`) - Information about Net Point BD
- **Contact** (`/contact`) - Contact form and information
- **Packages** (`/packages`) - Internet packages (Home, Corporate, Government)
- **Home Internet** (`/home-internet`) - Home internet solutions
- **Corporate** (`/corporate`) - Corporate internet solutions
- **Coverage** (`/coverage`) - Service coverage areas in Bogura
- **Products** (`/products`) - Networking products
- **Pay Bill** (`/pay-bill`) - Online bill payment
- **Notice Board** (`/notice-board`) - Latest announcements
- **Services** (`/services`) - Additional services

## Technologies Used

- **Next.js 16** - React framework for production
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Bootstrap 5** - CSS framework (from original site)
- **Owl Carousel** - Carousel slider
- **jQuery** - JavaScript library (from original site)
- Various plugins (meanmenu, magnific-popup, jarallax, etc.)

## Design Preservation

All original design elements have been preserved:
- Original CSS files are used as-is
- JavaScript libraries and custom scripts maintained
- Images and assets copied from original HTML version
- Layout and styling remain identical to the HTML version

## Performance Optimizations

- Image optimization with Next.js Image component (can be implemented)
- Server-side rendering for faster initial page loads
- Automatic code splitting
- Optimized asset loading with Script component

## Notes

- The original HTML structure and design have been carefully converted to React components
- All external links and payment gateways are maintained
- The website uses the original CSS and JavaScript libraries to ensure design consistency
- TypeScript provides type safety while maintaining the original functionality

## License

© 2026 Net Point BD. All Rights Reserved.

## Support

For any issues or questions:
- Phone: 01923315047 (WhatsApp)
- Support: 09638 102 102
- Email: info@netpoint.com.bd
