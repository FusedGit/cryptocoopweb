# Cryptocoop Landing Page

A stunning one-page website built with Next.js 14, showcasing the Cryptocoop Telegram Mini App - a truly free crypto exchange platform.

## Features

- 🎨 **Dark, Modern Design** - Minimalist black and white theme with cyan accents
- ✨ **Stunning Animations** - LaserFlow effects, ASCII text animations, and smooth scroll animations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Performance Optimized** - Lazy-loaded Three.js components and optimized rendering
- 🎭 **Interactive Elements** - Parallax effects, hover states, and animated counters

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D graphics for LaserFlow and ASCII effects

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx           # Main landing page
├── globals.css        # Global styles
└── loading.tsx        # Loading state

components/
├── sections/          # Page sections
│   ├── Hero.tsx       # Hero with LaserFlow & ASCII
│   ├── Stats.tsx      # Statistics with animated counters
│   ├── AppShowcase.tsx # iPhone mockup showcase
│   ├── Features.tsx   # Feature grid
│   ├── Trust.tsx      # Credibility section
│   └── CTA.tsx        # Call-to-action & footer
├── ui/                # UI components
│   ├── LaserFlow.tsx  # 3D laser effect
│   ├── ASCIIText.tsx  # ASCII text animation
│   └── button.tsx     # Button component
└── AnimatedSection.tsx # Scroll animation wrapper

public/assets/         # Images and assets
```

## Customization

### Update Telegram Link

Edit the CTA link in `components/sections/CTA.tsx`:

```tsx
<a href="https://t.me/YOUR_BOT_USERNAME" target="_blank" rel="noopener noreferrer">
```

### Add Your Assets

Place your assets in the `public/assets/` folder:
- Logo: `public/logo.svg` or `public/logo.png`
- App screenshots: `public/assets/app-screen-*.png`
- iPhone mockup: `public/assets/iphone-mockup.png`

### Customize Colors

The color scheme is defined in `app/globals.css` under the `.dark` class:
- Background: Pure black (`oklch(0 0 0)`)
- Foreground: White (`oklch(1 0 0)`)
- Primary/Accent: Cyan (`oklch(0.75 0.15 195)`)

### Modify Stats

Update the stats in `components/sections/Stats.tsx`:

```tsx
<AnimatedNumber value={28000} suffix="+" />
```

## Performance Tips

1. **Three.js Components** are already lazy-loaded with `dynamic()` imports
2. **Images** should be optimized as WebP format
3. **Fonts** are loaded with `display: 'swap'` for better performance
4. **Animations** use GPU-accelerated transforms

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2024 Cryptocoop. All rights reserved.

## Support

For questions or support, contact us through Telegram or visit our website.
