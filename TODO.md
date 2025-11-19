# Clean Homepage Implementation Guide

## 🎯 Overview

This is a **complete redesign** of the Nara.ai homepage following the SmartNest-inspired clean, single-page design philosophy.

### Key Features:
✅ **Ultra clean, no-scroll design** - Everything fits in one viewport  
✅ **iPhone mockup center** - Live Nara.ai preview with animations  
✅ **Navigation menu** - Quick access to all modules  
✅ **Single CTA focus** - "Try Nara.ai" button redirects to fullscreen chat  
✅ **Fully responsive** - Mobile, tablet, desktop optimized  
✅ **Modern animations** - Framer Motion powered interactions  

---

## 📁 Files Created

### Components
```
components/homepage/
├── HomeHeader.tsx          - Navigation header with menu links
├── HeadlineBlock.tsx       - Left: Main headline + CTA button
├── PhoneMockupLive.tsx     - Center: iPhone with Nara preview
├── SocialProofCard.tsx     - Right: User stats and testimonials
└── MobileMenu.tsx          - Mobile navigation drawer
```

### Pages
```
app/
└── page-new.tsx            - New clean homepage (replace existing page.tsx)
```

### Documentation
```
HOMEPAGE_SPEC.md            - Detailed design specification
HOMEPAGE_IMPLEMENTATION.md  - This file
```

---

## 🚀 Installation Steps

### Step 1: Verify Dependencies

Ensure you have these installed:

```bash
# Check package.json for these dependencies
npm list framer-motion
npm list lucide-react
npm list next
```

If missing, install:

```bash
npm install framer-motion lucide-react
```

### Step 2: Copy Files to Your Project

All component files are ready in `/home/claude/components/homepage/` and page file in `/home/claude/app/page-new.tsx`.

Copy them to your project:

```bash
# From your project root
mkdir -p components/homepage
mkdir -p app

# Copy components
cp /path/to/components/homepage/*.tsx ./components/homepage/

# Copy new page
cp /path/to/app/page-new.tsx ./app/page-new.tsx
```

### Step 3: Backup and Replace

```bash
# Backup your current homepage
mv app/page.tsx app/page-old-backup.tsx

# Activate new homepage
mv app/page-new.tsx app/page.tsx
```

### Step 4: Add Fonts (Recommended)

Add Playfair Display for serif headlines:

**Update `app/layout.tsx`:**

```typescript
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Update `tailwind.config.ts`:**

```typescript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
};
```

---

## 🔧 Configuration

### 1. Navigation Links

Edit menu items in `components/homepage/HomeHeader.tsx`:

```typescript
const navLinks = [
  { label: 'Museum', href: '/museum', icon: Building2 },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'Loka', href: '/learn/loka', icon: UtensilsCrossed },
  { label: 'Symphony', href: '/learn/symphony', icon: Music },
  { label: 'Verse', href: '/learn/verse', icon: BookText },
  { label: 'Aksara', href: '/learn/aksara', icon: Languages },
  { label: 'Pola', href: '/learn/pola', icon: Palette },
];
```

**Add/Remove Links:**
```typescript
// Add new link
{ label: 'New Module', href: '/new-module', icon: Star },

// Remove a link
// Just delete or comment out the unwanted line
```

### 2. CTA Button Action

Both the CTA button and iPhone mockup redirect to fullscreen chat.

**In `HeadlineBlock.tsx` (line ~13):**
```typescript
const handleCTA = () => {
  router.push('/chat/fullscreen'); // Change this route
};
```

**In `PhoneMockupLive.tsx` (line ~8):**
```typescript
const handlePhoneClick = () => {
  router.push('/chat/fullscreen'); // Change this route
};
```

### 3. Replace Nara Avatar

Replace placeholder with actual Nara avatar/Live2D model.

**In `PhoneMockupLive.tsx` (around line 70-75):**

```typescript
// Current placeholder:
<div className="absolute inset-0 flex items-center justify-center">
  <Sparkles className="w-16 h-16 text-white" strokeWidth={1.5} />
</div>

// Replace with image:
<img 
  src="/images/nara-avatar.png" 
  alt="Nara Avatar"
  className="w-full h-full object-cover"
/>

// Or integrate Live2D:
<Live2DModel
  modelPath="/models/nara.model3.json"
  width={128}
  height={128}
/>
```

### 4. Update Social Proof Stats

**In `SocialProofCard.tsx` (around line 30):**

```typescript
// Update these values
{ icon: Users, label: 'Active Users', value: '10K+' },
{ icon: TrendingUp, label: 'Daily Conversations', value: '50K+' },
{ icon: Star, label: 'Satisfaction Rate', value: '95%' },
```

---

## 🎨 Customization

### Colors

**Option 1: Update in each component**

Search for color values and replace:
- `#FF7A5C` → Your primary color
- `#C2410C` → Your secondary color

**Option 2: Create design tokens file (Recommended)**

Create `lib/design-tokens.ts`:

```typescript
export const colors = {
  primary: {
    main: '#FF7A5C',
    dark: '#C2410C',
    light: '#FB923C',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #C2410C 0%, #FF7A5C 100%)',
  },
};
```

Then import and use:

```typescript
import { colors } from '@/lib/design-tokens';

// In component:
style={{ background: colors.gradient.primary }}
```

### Typography

Adjust font sizes in components:

```typescript
// Headline sizes in HeadlineBlock.tsx
<span className="text-7xl">  // Change to text-6xl, text-8xl, etc.
<span className="text-4xl">  // Change to text-3xl, text-5xl, etc.
```

### Spacing

Adjust padding and gaps:

```typescript
// In app/page.tsx
<div className="px-8 lg:px-12">  // Horizontal padding
<div className="gap-8 lg:gap-16"> // Grid gaps
```

### Animations

Modify animation parameters:

```typescript
// Speed
transition={{ duration: 0.6 }} // Faster: 0.3, Slower: 1.0

// Delay
transition={{ delay: 0.2 }}

// Easing
transition={{ ease: 'easeOut' }} // or 'easeIn', 'easeInOut', 'linear'
```

---

## 📱 Responsive Behavior

### Desktop (1024px+)
✅ Three-column grid layout  
✅ Navigation menu horizontal  
✅ Full iPhone mockup (300px)  
✅ All content visible without scroll  

### Tablet (768px - 1023px)
✅ Two-column layout  
✅ Headline and CTA stacked  
✅ iPhone mockup scaled to 85%  
✅ Social proof card visible  

### Mobile (< 768px)
✅ Single column stack  
✅ Mobile menu drawer (hamburger)  
✅ iPhone mockup 280px width  
✅ Compact social proof at bottom  
✅ CTA button full width  

---

## 🎭 Component Interactions

### HomeHeader
| Element | Interaction | Result |
|---------|-------------|--------|
| Logo | Click | Navigate to home |
| Logo | Hover | Scale 1.05 |
| Nav Link | Hover | Underline slides in |
| Nav Link | Click | Navigate to module |
| Mobile Menu Button | Click | Open drawer |

### HeadlineBlock
| Element | Interaction | Result |
|---------|-------------|--------|
| Headline | Load | Fade in from left |
| CTA Button | Hover | Arrow slides right, shadow grows |
| CTA Button | Click | Navigate to `/chat/fullscreen` |
| Feature Pills | Load | Stagger fade in |

### PhoneMockupLive
| Element | Interaction | Result |
|---------|-------------|--------|
| Entire Phone | Click | Navigate to `/chat/fullscreen` |
| Phone | Hover | Lift 8px, shadow increases |
| Phone | Hover | "Tap to start" hint appears |
| Nara Avatar | Always | Pulse rings animate |
| Status Dot | Always | Pulsing green dot |

### SocialProofCard
| Element | Interaction | Result |
|---------|-------------|--------|
| Avatars | Load | Stagger animation |
| Stats Cards | Load | Slide in from right |
| Stats Cards | Hover | Background lightens |

---

## 🔍 Testing Checklist

### ✅ Functionality
- [ ] All navigation links work correctly
- [ ] CTA button redirects to fullscreen chat
- [ ] iPhone mockup is clickable
- [ ] Mobile menu opens and closes smoothly
- [ ] Profile button is accessible
- [ ] All icons render correctly
- [ ] Animations trigger on page load

### 📱 Responsive
- [ ] Test on iPhone SE (375px width)
- [ ] Test on iPhone Pro (390px width)
- [ ] Test on iPad (768px width)
- [ ] Test on iPad Pro (1024px width)
- [ ] Test on Desktop (1440px width)
- [ ] Test on Large screens (1920px+ width)
- [ ] Mobile menu works on small screens
- [ ] No horizontal scroll on any device

### 🎨 Animations
- [ ] Page load animations trigger correctly
- [ ] Hover states work on all interactive elements
- [ ] Nara avatar pulse animation loops smoothly
- [ ] No animation jank (maintain 60fps)
- [ ] Transitions are smooth (200-300ms)
- [ ] CTA button arrow slides on hover
- [ ] iPhone lifts on hover

### ♿ Accessibility
- [ ] All buttons have aria-labels
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus indicators visible (blue/coral ring)
- [ ] Alt text for all images
- [ ] Contrast ratios meet WCAG AA
- [ ] Screen reader can navigate menu
- [ ] Mobile menu closes with Escape key

### ⚡ Performance
- [ ] Initial load < 2 seconds
- [ ] No layout shifts (CLS < 0.1)
- [ ] Smooth animations (60fps)
- [ ] Images optimized (Next.js Image)
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 95

---

## 🐛 Troubleshooting

### Issue: Framer Motion not working

**Error:** `Cannot find module 'framer-motion'`

**Solution:**
```bash
npm install framer-motion
# or
yarn add framer-motion
```

### Issue: Fonts not loading

**Error:** Headlines not using serif font

**Solution:**
1. Check `app/layout.tsx` has font imports
2. Verify Tailwind config has font-serif
3. Clear `.next` cache: `rm -rf .next && npm run dev`

### Issue: Components not found

**Error:** `Module not found: Can't resolve '@/components/homepage/...'`

**Solution:**
1. Check `tsconfig.json` has path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```
2. Verify files are in correct directory
3. Restart dev server

### Issue: Mobile menu not opening

**Error:** Button clicks but nothing happens

**Solution:**
1. Check `'use client'` at top of `HomeHeader.tsx`
2. Verify `useState` is imported
3. Check `MobileMenu.tsx` is in same directory
4. Inspect console for errors

### Issue: Gradient text not showing

**Error:** Headline text is black, not gradient

**Solution:**
1. Add webkit prefixes:
```typescript
style={{
  background: 'linear-gradient(135deg, #C2410C 0%, #FF7A5C 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}}
```
2. Test in Chrome/Safari (better webkit support)

### Issue: iPhone mockup not clickable

**Error:** Click does nothing

**Solution:**
1. Verify `cursor-pointer` class is on phone div
2. Check `onClick={handlePhoneClick}` is present
3. Verify router is imported: `import { useRouter } from 'next/navigation'`
4. Check `'use client'` directive at top

### Issue: Animations lag

**Error:** Animations choppy, not 60fps

**Solution:**
1. Use GPU-accelerated properties (transform, opacity)
2. Avoid animating layout properties (width, height, top, left)
3. Use `will-change` on animated elements:
```typescript
className="will-change-transform"
```
4. Reduce animation complexity
5. Check browser DevTools Performance tab

---

## 🎯 Next Steps

### Immediate (Today)
1. ✅ Copy files to your project
2. ✅ Test on localhost
3. ✅ Verify all links work
4. ✅ Check responsive on mobile

### Short-term (This Week)
5. Replace placeholder avatar with actual Nara image/Live2D
6. Update navigation links to match your routes
7. Customize colors if needed
8. Add your actual user stats
9. Test on multiple browsers

### Medium-term (Next Week)
10. Add analytics tracking (Google Analytics, Mixpanel)
11. Implement proper auth/profile page
12. Add SEO meta tags
13. Optimize images for production
14. Test with real users

### Long-term (This Month)
15. A/B test different CTA copy
16. Monitor conversion rates
17. Gather user feedback
18. Iterate based on data
19. Add more module pages

---

## 📚 Additional Resources

### Documentation
- [Framer Motion Docs](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Utility CSS
- [Next.js Docs](https://nextjs.org/docs) - React framework
- [Lucide Icons](https://lucide.dev/) - Icon library

### Design
- [Dribbble - Landing Page Inspiration](https://dribbble.com/tags/landing-page)
- [Awwwards - Web Design](https://www.awwwards.com/)
- [Figma Community Files](https://www.figma.com/community)

### Performance
- [Web Vitals](https://web.dev/vitals/) - Core metrics
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditing
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🤝 Support

### If you encounter issues:

1. **Check console errors** - Open browser DevTools (F12)
2. **Verify file paths** - Ensure components are in correct directories
3. **Test dependencies** - Run `npm list` to check installations
4. **Clear cache** - Delete `.next` folder and restart
5. **Check Node version** - Ensure Node.js 16+ is installed

### Common Questions:

**Q: Can I use this with Pages Router?**  
A: This is built for App Router (Next.js 13+). For Pages Router, you'll need to adapt the routing and 'use client' directives.

**Q: Can I use a different animation library?**  
A: Yes! Replace Framer Motion imports with your preferred library (React Spring, GSAP, etc.).

**Q: How do I add more navigation links?**  
A: Edit the `navLinks` array in `HomeHeader.tsx` and add your new items.

**Q: Can I change the layout to 2 columns?**  
A: Yes, in `app/page.tsx`, change `lg:grid-cols-[1fr_auto_1fr]` to `lg:grid-cols-2` and adjust accordingly.

---

## 📊 Design Specifications

### Layout
- **Max Width:** 1440px
- **Header Height:** 72px
- **iPhone Width:** 300px
- **iPhone Height:** 600px
- **Grid Gap:** 64px (desktop), 32px (mobile)

### Colors
```
Primary: #FF7A5C (Coral)
Secondary: #C2410C (Terracotta)
Background: #FAFAFA (Warm Gray)
Text: #0F0F0F (Near Black)
```

### Typography
```
Display: Playfair Display (Serif), 72px, Italic
Heading: Inter, 36px, Semibold
Body: Inter, 18px, Regular
Button: Inter, 16px, Semibold
```

### Spacing
```
XS: 4px
SM: 8px
MD: 16px
LG: 24px
XL: 32px
2XL: 48px
3XL: 64px
```

---

**Created:** 2025-11-19  
**Design Reference:** SmartNest-inspired clean aesthetic  
**Version:** 1.0  
**Status:** Ready for production ✅
