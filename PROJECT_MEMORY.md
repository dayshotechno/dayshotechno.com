# Project Memory - DAYSHOTECHNO.COM

## Current State
Static presskit website for hard techno DJ "DAY SHO". Single-page HTML (index.html) with two supporting legal pages (impressum.html, datenschutz.html). No build system, no package manager, no backend. Assets include high-resolution press photos and equipment images.

**Technology Stack:**
- HTML5 with semantic markup and accessibility features (skip link, ARIA labels)
- Tailwind CSS via CDN (v3) for utility-first styling
- Google Fonts (Oswald) for typography
- Vanilla JavaScript for interactivity (no frameworks)
- Static hosting (Git-based deployment assumed)

**Key Features:**
- Dark industrial aesthetic with red accent color (#dc2626)
- Responsive design (mobile-first via Tailwind)
- Interactive elements: image gallery with preview, custom cursor (desktop), scroll‑reveal animations, glitch hover effects
- Embedded SoundCloud player
- Legal pages (Impressum, Datenschutz) following German requirements
- Open Graph and Twitter meta tags for social sharing

## Architectural Decisions (The "Why")
1. **Tailwind via CDN** – Chosen for rapid prototyping and consistent styling without a build step. The project’s visual complexity (grids, hover states, responsive breakpoints) is well‑served by utility classes, and the CDN keeps the setup simple.

2. **No build toolchain** – The site is purely presentational; no compilation, bundling, or minification is required. This eliminates tooling overhead and simplifies maintenance. All assets are served as‑is.

3. **Vanilla JavaScript** – Interactivity (image gallery, cursor, scroll detection) is lightweight and specific; a framework would add unnecessary weight. Event‑driven custom scripts keep the footprint minimal.

4. **Inline CSS for complex effects** – Glitch animations, custom cursor, and scroll‑reveal transitions are defined in a `<style>` block within index.html. This ensures the critical visual behavior loads with the page and avoids extra HTTP requests.

5. **Asset organization** – All images reside in `/assets/`. Legal pages are also placed in `/assets/` (unconventional) to keep the root directory clean. This reflects a flat structure suited for static hosting.

6. **Accessibility and semantics** – Skip‑to‑content link, proper heading hierarchy, `aria‑hidden` on decorative elements, and focus styles show a conscious effort toward inclusive design.

7. **German language (de)** – The target audience is German‑speaking promoters and fans, hence content and legal pages are in German.

## Next Steps
1. **Performance audit** – Optimize image delivery (serve WebP/AVIF, implement lazy‑loading beyond native `loading="lazy"`).
2. **SEO enhancement** – Add structured data (JSON‑LD) for artist/music events, improve meta descriptions.
3. **Analytics integration** – Consider adding a privacy‑friendly tracking solution (e.g., Plausible) to measure traffic.
4. **Contact form** – Replace static mailto link with a simple, secure form (could be hosted via a serverless function).
5. **Asset pipeline** – If the site grows, introduce a lightweight build step (e.g., Vite) to bundle CSS/JS, minify HTML, and optimize images.

## Context Debt
- **Images are high‑resolution JPEGs/PNGs** – No compression or modern formats; page weight could be reduced significantly.
- **Legal pages in `/assets/`** – This breaks conventional expectations (usually placed in root). Consider moving them to root or a `/legal/` subdirectory for clarity.
- **Inline CSS and JavaScript** – While acceptable for a single page, scaling would benefit from separation (external CSS/JS files) and modularization.
- **No version control for third‑party CDNs** – Tailwind and Google Fonts are pinned to “latest”; a version‑locked URL would guarantee stability.
- **Custom cursor only on desktop (`md:cursor-none`)** – The cursor behavior may conflict with some assistive technologies; consider adding a toggle or respecting `prefers‑reduced‑motion`.

---
*Last updated: 2026‑03‑01 (initial analysis)*