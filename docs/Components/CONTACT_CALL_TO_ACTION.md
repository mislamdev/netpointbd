# ContactCallToAction Component - Documentation

## Overview

The `ContactCallToAction` component is a reusable call-to-action section that encourages users to contact Net Point BD for internet connection in Bogura. This component has been extracted from multiple pages to follow the DRY (Don't Repeat Yourself) principle.

---

## Component Details

### Location
`components/ContactCallToAction.tsx`

### Purpose
Displays a prominent call-to-action section with:
- Eye-catching icon
- Heading: "Looking for Internet Connection in Bogura?"
- Descriptive text about the service
- Two action buttons: "Contact Now" and "Call Now"

---

## Usage

### Basic Usage

Simply import and use the component in any page:

```tsx
import ContactCallToAction from '@/components/ContactCallToAction';

export default function YourPage() {
  return (
    <>
      {/* Your page content */}
      
      <ContactCallToAction />
    </>
  );
}
```

---

## Pages Using This Component

The `ContactCallToAction` component is currently used in **5 pages**:

1. **Home Page** (`app/page.tsx`)
2. **About Page** (`app/about/page.tsx`)
3. **Products Page** (`app/products/page.tsx`)
4. **Notice Board Page** (`app/notice-board/page.tsx`)
5. **Coverage Page** (`app/coverage/page.tsx`)

---

## Component Structure

```tsx
<section className="subscribe-area pb-100">
  <div className="container">
    <div className="subscribe-bg">
      <div className="row">
        <div className="col-lg-8 col-sm-7">
          {/* Icon, Heading, Description */}
        </div>
        <div className="col-lg-4 col-sm-4">
          {/* Action Buttons */}
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Features

### Content
- **Icon:** WiFi call icon (`call-for-witi.svg`)
- **Heading:** "Looking for Internet Connection in Bogura?"
- **Description:** Service promise and call-to-action text
- **Contact Button:** Links to `/contact` page
- **Call Button:** Direct phone link to `+8809649315047`

### Styling
- **Section:** `subscribe-area pb-100` - Bottom padding
- **Background:** `subscribe-bg` - Custom background styling
- **Responsive:** 
  - Desktop: Content and buttons side-by-side
  - Mobile/Tablet: Stacked layout
- **Button Spacing:** 10px margin between buttons

### Accessibility
- Proper `alt` text on images
- Lazy loading for images
- Semantic HTML structure
- Mobile-friendly button layout

---

## Benefits of This Component

### Code Reusability
✅ **Single source of truth** - Update once, affects all pages  
✅ **Consistent design** - Same appearance everywhere  
✅ **Easy maintenance** - No need to update multiple files  

### Performance
✅ **Bundle optimization** - Component loaded once  
✅ **Lazy loading** - Images optimized for performance  
✅ **Smaller bundle** - Reduced code duplication  

### Development
✅ **DRY principle** - Don't Repeat Yourself  
✅ **Easy to test** - Single component to test  
✅ **Simple updates** - Change content in one place  

---

## Customization

### Changing Content

To modify the content, edit `components/ContactCallToAction.tsx`:

```tsx
// Change heading
<h2>Your New Heading</h2>

// Change description
<p>Your new description text</p>

// Change phone number
<a href="tel:+88YOURNUMBER" className="default-btn">
  <span>Call Now</span>
</a>
```

### Styling Variations

You can add props for different variations:

```tsx
// Example with variant prop
export default function ContactCallToAction({ variant = 'default' }) {
  const bgClass = variant === 'dark' ? 'bg-dark' : '';
  
  return (
    <section className={`subscribe-area pb-100 ${bgClass}`}>
      {/* ... */}
    </section>
  );
}
```

---

## File Structure

```
components/
└── ContactCallToAction.tsx     → The reusable component

app/
├── page.tsx                    → Uses <ContactCallToAction />
├── about/
│   └── page.tsx               → Uses <ContactCallToAction />
├── products/
│   └── page.tsx               → Uses <ContactCallToAction />
├── notice-board/
│   └── page.tsx               → Uses <ContactCallToAction />
└── coverage/
    └── page.tsx               → Uses <ContactCallToAction />
```

---

## Before vs After

### Before (Duplicated Code)
```tsx
// In every page:
<section className="subscribe-area ptb-100 bg-color">
  <div className="container">
    <div className="subscribe-bg">
      {/* 30+ lines of duplicated code */}
    </div>
  </div>
</section>
```

**Issues:**
- ❌ Code duplicated in 5 files
- ❌ Hard to maintain consistency
- ❌ Updates require changing multiple files
- ❌ Larger bundle size

### After (Reusable Component)
```tsx
// In every page:
<ContactCallToAction />
```

**Benefits:**
- ✅ Single line import
- ✅ Consistent across all pages
- ✅ Update once, affects all
- ✅ Smaller bundle size

---

## Technical Details

### Dependencies
- `@/lib/utils` - For `getAssetPath()` function
- No external libraries required
- Uses standard React/Next.js

### Props
Currently accepts no props (simple implementation)

Future enhancement could include:
- `variant` - For different color schemes
- `title` - Custom heading
- `description` - Custom description
- `phone` - Custom phone number

---

## Code Example

### Complete Component Code

```tsx
import { getAssetPath } from '@/lib/utils';

export default function ContactCallToAction() {
  return (
    <section className="subscribe-area pb-100">
      <div className="container">
        <div className="subscribe-bg">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-8 col-sm-7">
              <div className="subscribe-content">
                <img 
                  src={getAssetPath('/assets/img/icon/call-for-witi.svg')} 
                  alt="Contact Net Point BD" 
                  width="80" 
                  height="60" 
                  loading="lazy" 
                />
                <h2>Looking for Internet Connection in Bogura?</h2>
                <p>
                  Contact with Net Point BD now and get your superfast internet 
                  connection within a day. We are here to assist you for your 
                  internet connection.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-4">
              <div className="text-center text-lg-end">
                <a href="/contact" className="default-btn" style={{ marginRight: '10px' }}>
                  <span>Contact Now</span>
                </a>
                <a href="tel:+8809649315047" className="default-btn">
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Usage in Page

```tsx
'use client';

import PageTitle from '@/components/PageTitle';
import ContactCallToAction from '@/components/ContactCallToAction';

export default function YourPage() {
  return (
    <>
      <PageTitle title="Your Page Title" />
      
      {/* Your page content */}
      
      <ContactCallToAction />
    </>
  );
}
```

---

## Testing

### Manual Testing
1. Visit each page that uses the component
2. Verify the section displays correctly
3. Test "Contact Now" button → Should go to `/contact`
4. Test "Call Now" button → Should open phone dialer
5. Test responsive design on different screen sizes

### Automated Testing (Future)
```tsx
// Example test
import { render, screen } from '@testing-library/react';
import ContactCallToAction from '@/components/ContactCallToAction';

test('renders contact section', () => {
  render(<ContactCallToAction />);
  expect(screen.getByText(/Looking for Internet Connection/i)).toBeInTheDocument();
});
```

---

## Build Status

✅ **Build Successful**
- All 26 pages compiled successfully
- No TypeScript errors
- No unused imports
- Component working across all 5 pages

---

## Future Enhancements

### Possible Improvements
1. **Add Props** - Make heading/description customizable
2. **Variants** - Different color schemes (light/dark)
3. **Analytics** - Track button clicks
4. **A/B Testing** - Test different call-to-actions
5. **Animation** - Add entrance animations
6. **i18n** - Multi-language support

### Example with Props
```tsx
interface ContactCallToActionProps {
  title?: string;
  description?: string;
  phone?: string;
  variant?: 'light' | 'dark';
}

export default function ContactCallToAction({
  title = "Looking for Internet Connection in Bogura?",
  description = "Contact with Net Point BD now...",
  phone = "+8809649315047",
  variant = 'light'
}: ContactCallToActionProps) {
  // Component implementation
}
```

---

## Summary

**Component Created:** `ContactCallToAction.tsx`  
**Pages Updated:** 5 pages  
**Lines Saved:** ~150 lines of duplicated code removed  
**Maintenance:** Now update 1 file instead of 5  
**Build Status:** ✅ Successful  

**Benefits:**
- ✅ Reusable across all pages
- ✅ Consistent design
- ✅ Easy to maintain
- ✅ Better code organization
- ✅ Smaller bundle size

---

*Created: January 31, 2026*  
*Component Version: 1.0*
