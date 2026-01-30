# Quick Start Guide

## Getting Started with Net Point BD Next.js Website

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Navigate to the project folder:**
   ```bash
   cd netpoint-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode (with hot reload)
```bash
npm run dev
```
Then open http://localhost:3000 in your browser.

#### Production Build
```bash
npm run build
npm start
```

### Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

### File Structure Overview

```
netpoint-nextjs/
├── app/                    # All pages and routes
│   ├── layout.tsx         # Main layout (Header + Footer)
│   ├── page.tsx           # Home page (/)
│   ├── about/             # About page (/about)
│   ├── contact/           # Contact page (/contact)
│   ├── packages/          # Packages page (/packages)
│   └── ...                # Other pages
├── components/            # Reusable components
│   ├── Header.tsx        # Site header & navigation
│   ├── Footer.tsx        # Site footer
│   └── Scripts.tsx       # JavaScript libraries
├── public/               # Static assets
│   └── assets/          # CSS, JS, images, fonts
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

### Making Changes

#### Editing Pages
1. Navigate to `app/[page-name]/page.tsx`
2. Edit the content
3. Save - changes appear automatically in dev mode

#### Editing Header/Footer
1. Open `components/Header.tsx` or `components/Footer.tsx`
2. Make changes
3. Save - updates reflect across all pages

#### Adding New Pages
1. Create folder: `app/new-page/`
2. Add file: `app/new-page/page.tsx`
3. Add content:
   ```tsx
   export default function NewPage() {
     return (
       <div>Your content here</div>
     );
   }
   ```
4. Access at: http://localhost:3000/new-page

#### Modifying Styles
- Main CSS: `public/assets/css/style.css`
- Responsive: `public/assets/css/responsive.css`
- Custom changes can be added to these files

### Deployment

#### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project at https://vercel.com
3. Deploy automatically

#### Deploy to Netlify
1. Push code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

#### Export Static Site
Add to `next.config.js`:
```javascript
output: 'export'
```
Then run:
```bash
npm run build
```
Output in `out/` folder

### Common Issues & Solutions

#### Port 3000 Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

#### Images Not Loading
- Ensure images are in `public/assets/img/`
- Use path: `/assets/img/your-image.jpg`

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Tips
1. Use Next.js Image component for optimization
2. Enable caching for static assets
3. Consider lazy loading for images
4. Monitor bundle size

### Need Help?

- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Support**: Contact Net Point BD technical team
- **Issues**: Check CONVERSION_SUMMARY.md

### Development Workflow

```
1. Start dev server (npm run dev)
2. Make changes to files
3. View changes in browser (auto-reload)
4. Test on different devices/browsers
5. Build for production (npm run build)
6. Deploy
```

---

**Happy Coding! 🚀**

For detailed information, see README.md and CONVERSION_SUMMARY.md
