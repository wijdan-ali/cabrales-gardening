# 🌿 Cabrales Gardening Website

A modern, premium-quality website for **Cabrales Gardening**, a professional gardening and landscaping business based in Moreno Valley, CA.

![Cabrales Gardening](https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&h=600&fit=crop)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Performance](#-performance)
- [Accessibility](#-accessibility)
- [License](#-license)

## ✨ Features

### Design & UI
- **Modern, premium aesthetic** inspired by professional landscaping websites
- **Responsive design** optimized for all devices (iPhone 13 Pro @ 390px, iPad @ 768px, Desktop @ 1440px+)
- **Sophisticated animations** using Intersection Observer API
- **CSS Custom Properties** for easy theming and consistency
- **BEM naming convention** for maintainable CSS

### Sections
1. **Top Bar** - Contact information and social media links
2. **Navigation** - Sticky header with mobile hamburger menu
3. **Hero Section** - Full-screen hero with parallax background
4. **Stats Section** - Animated counters showing company achievements
5. **Logo Strip** - Infinite scrolling brand marquee
6. **Services** - Grid of service cards with hover effects
7. **About** - Company story with creative image composition
8. **Gallery** - Filterable portfolio with lightbox
9. **Testimonials** - Auto-scrolling testimonial carousel
10. **Blog** - Latest articles and gardening tips
11. **Contact** - Form with validation and contact information
12. **Footer** - Comprehensive footer with quick links

### Interactive Features
- ⚡ Smooth scroll navigation
- 🎯 Scroll-triggered animations
- 📊 Stats counter animation
- 🖼️ Gallery filtering & lightbox
- ♾️ Infinite testimonials scroll
- ✅ Form validation with feedback
- ⬆️ Back-to-top button
- 📱 Mobile-first responsive design

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **Google Fonts** - Poppins, Inter, Montserrat

## 📁 Project Structure

```
cabrales-gardening/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles (organized by component)
├── js/
│   └── script.js       # All JavaScript functionality
├── images/             # Image assets (placeholder for now)
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Quick Start

1. **Clone or download** the project
2. **Open `index.html`** in your browser

That's it! No build tools, no dependencies, no setup required.

### Local Development

For the best development experience with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Using VS Code Live Server

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Customization

### Colors

All colors are defined as CSS custom properties in `css/styles.css`:

```css
:root {
    /* Primary Colors */
    --color-primary-dark: #1a4d2e;    /* Deep forest green */
    --color-primary: #2d5016;          /* Rich dark green */
    --color-primary-light: #7cb342;    /* Vibrant leaf green */
    --color-primary-lighter: #c5e1a5;  /* Light lime green */
    --color-primary-pale: #e8f5e9;     /* Soft mint */
    
    /* Neutral Colors */
    --color-white: #ffffff;
    --color-off-white: #fafafa;
    --color-text: #4a4a4a;
    --color-heading: #2c2c2c;
}
```

### Typography

Font families and sizes are also customizable:

```css
:root {
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Inter', sans-serif;
    
    --fs-hero: clamp(2.5rem, 5vw, 4.5rem);
    --fs-h1: clamp(2.25rem, 4vw, 3.5rem);
    --fs-h2: clamp(2rem, 3.5vw, 3rem);
    /* ... etc */
}
```

### Contact Information

Update the following in `index.html`:
- Phone number: `(909) 641-1849`
- Email: `info@cabralesgardening.com`
- Address: `15555 Gorrion, Moreno Valley, CA 92561`

### Images

Replace the Unsplash placeholder URLs with your own images. Current images are loaded from:

```
https://images.unsplash.com/...
```

For production, download and optimize images locally.

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari | iOS 13+ |
| Chrome Mobile | Android 8+ |

### CSS Features Used
- CSS Grid & Flexbox
- CSS Custom Properties
- CSS Animations & Transitions
- `clamp()` for fluid typography
- `backdrop-filter` for glassmorphism effects

### JavaScript Features Used
- ES6+ syntax (arrow functions, destructuring, etc.)
- Intersection Observer API
- RequestAnimationFrame
- Event delegation

## ⚡ Performance

### Optimizations Included
- **Lazy loading** for images below the fold
- **Debounced scroll events** using RequestAnimationFrame
- **CSS-only animations** where possible
- **Efficient selectors** with BEM methodology
- **Minimal JavaScript** - no external libraries

### Recommendations for Production
1. Minify CSS and JavaScript
2. Compress images (WebP format recommended)
3. Add critical CSS inline
4. Implement proper caching headers
5. Use a CDN for static assets

## ♿ Accessibility

### Features
- **Semantic HTML5** structure
- **ARIA labels** for interactive elements
- **Focus indicators** for keyboard navigation
- **Skip to content** link
- **Color contrast** meeting WCAG AA standards
- **Reduced motion** support via `prefers-reduced-motion`

### Testing
Test with:
- Keyboard navigation (Tab, Enter, Escape)
- Screen readers (VoiceOver, NVDA)
- Browser accessibility tools

## 📱 Responsive Breakpoints

```css
/* Large Desktop */
@media (min-width: 1440px) { }

/* Desktop */
@media (max-width: 1439px) { }

/* Tablet */
@media (max-width: 1023px) { }

/* Mobile Large */
@media (max-width: 767px) { }

/* Mobile Small (iPhone 13 Pro) */
@media (max-width: 479px) { }
```

## 🔧 Form Handling

The contact form includes:
- Real-time validation
- Phone number auto-formatting
- Character counter for message
- Success/error states
- Loading indicator

**Note:** The form currently simulates submission. For production:
1. Connect to a backend API
2. Or use a service like Formspree, Netlify Forms, etc.

## 📄 License

This project is created for Cabrales Gardening. All rights reserved.

---

## 🤝 Contact

**Cabrales Gardening**
- 📍 15555 Gorrion, Moreno Valley, CA 92561
- 📞 (909) 641-1849
- 📧 info@cabralesgardening.com

---

*Built with ❤️ for Moreno Valley*
