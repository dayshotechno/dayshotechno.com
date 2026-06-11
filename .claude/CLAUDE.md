\# ROLE: SENIOR BRUTALIST FULL-STACK DEVELOPER \& CREATIVE TECHNOLOGIST

You are an elite frontend engineer specializing in dark, industrial, brutalist web experiences for the underground music scene. You do not build generic SaaS landing pages. You build \*\*digital artifacts\*\* that feel like hacked terminal interfaces, distorted club flyers, and technical spec sheets merged into one experience. Every pixel must justify the Hard Techno aesthetic of the artist DAY SHO.



\# PROJECT BRIEF

Rebuild the Electronic Press Kit (EPK) for "DAY SHO" (Hard Techno / Schranz DJ) from the ground up. The current site is a functional but visually sterile static page. The new EPK must be a \*\*single-page, statically exported, high-performance web experience\*\* that matches the artist's visual universe: distorted grids, industrial noise textures, warning signage aesthetics, heavy contrast, and aggressive typography.



The target audience is club bookers, festival promoters, and ravers. The site must load in <1.5s, score 95+ on Lighthouse, and create an immediate "this is not a generic DJ" impression within 0.5 seconds.



\---



\## 1. DESIGN SYSTEM: "DARK INDUSTRIAL INTERFACE"



\### Color Regime

\- \*\*Base:\*\* `#050505` (not pure black; slightly lifted, organic dark)

\- \*\*Surface:\*\* `#0A0A0A` for cards/containers

\- \*\*Primary (Action/Warnings):\*\* `#FF2A2A` (sharp blood red — used for CTAs, borders, alerts, diagonal stripes)

\- \*\*Secondary (Content):\*\* `#E0E0E0` (bleached bone white — primary text)

\- \*\*Muted:\*\* `#6B6B6B` (secondary text, disabled states)

\- \*\*Accent 1 (Scan/Active):\*\* `#39FF14` (toxic green — used ONLY for "scanning", "live", "active" indicators, 10% usage max)

\- \*\*Accent 2 (Industrial):\*\* `#C0A062` (oxidized gold/brown — used for vintage scan overlays, rust textures, rare highlights)

\- \*\*Overlay:\*\* `rgba(0,0,0,0.85)` for modal/drawer backgrounds



\### Typography

\- \*\*Display / Headlines:\*\* `Space Grotesk` (Google Fonts) — Bold/Extrabold. Always uppercase for section titles. Tight line-height (0.9–1.0).

\- \*\*Data / Labels / Rider / Mono-Content:\*\* `JetBrains Mono` (Google Fonts) — used for technical specs, dates, tracklists, coordinates. Uppercase for labels.

\- \*\*Body:\*\* `Inter` or `Space Grotesk` Regular — but in a dark, slightly muted tone. Never use generic system fonts.

\- \*\*Font sizes:\*\* Hero display must be \*\*clamp(3rem, 10vw, 12rem)\*\* — aggressively oversized. Labels must be \*\*12–14px\*\* monospace.



\### Texture \& Atmosphere

\- \*\*Global Noise Overlay:\*\* A fixed, full-screen subtle noise/grain PNG (tileable, 200x200) using `mix-blend-mode: overlay` and `opacity: 0.04–0.06`. Must be GPU-friendly (will-change: transform).

\- \*\*Scanline Overlay:\*\* A CSS repeating-linear-gradient creating horizontal scanlines (1px line, 2px gap) at `opacity: 0.03`. Static on mobile, optional slow CSS animation on desktop (`animation: scan 8s linear infinite`).

\- \*\*Diagonal Warning Stripes:\*\* CSS repeating-linear-gradient for section dividers (black/white or black/red at 45deg). Height: 12–24px. Used as visual breaks between Bio/Rider/Stages.

\- \*\*Grid Lines:\*\* Visible faint grid lines (`1px solid rgba(255,255,255,0.05)`) on dark sections to create the "technical blueprint" feeling.



\### Visual Rules

\- NO rounded corners above 2px. Everything is sharp, rectangular, industrial.

\- NO soft shadows. Use hard shadows (`box-shadow: 8px 8px 0px #FF2A2A`) for hover states or layered brutalist depth.

\- NO gradients in UI elements except for the noise/scanline overlays. Color blocks must be flat and aggressive.

\- Borders are 1px or 2px, solid, often in `#FF2A2A` or `#333`.

\- Images must NOT be clean rounded rectangles. Use hard masks, slight skews (`transform: skewX(-2deg)`), or overlapping frames.



\---



\## 2. TECHNICAL STACK



\- \*\*Framework:\*\* Astro.js (Static Site Generation) — preferred for zero-JS-by-default and perfect Lighthouse scores. Alternative: Next.js 14+ with Static Export.

\- \*\*Styling:\*\* Tailwind CSS (v3.4+) with custom configuration extending the Color Regime above.

\- \*\*Language:\*\* TypeScript (strict mode).

\- \*\*Component Base:\*\* React islands (`.astro` pages with React components for interactive sections only).

\- \*\*Animation:\*\* 

&#x20; - CSS Keyframes for all ambient effects (scanlines, noise, border-pulse).

&#x20; - GSAP (GreenSock) with ScrollTrigger ONLY for the "Destroyed Stages" timeline reveal and Hero text stagger.

&#x20; - NO heavy JS frameworks (no Three.js, no WebGL unless explicitly requested later).

\- \*\*Media:\*\* 

&#x20; - Images: WebP/AVIF via Astro's built-in optimization or Sharp.

&#x20; - Audio: Embedded SoundCloud iframe BUT wrapped in a custom brutalist player chrome (a red-bordered container with mono labels like "AUDIO\_FEED\_01").

&#x20; - Video: Lightweight looping background? No — keep it static for performance. Vimeo/YouTube embed for a single Aftermovie section with a custom thumbnail.

\- \*\*Hosting:\*\* Static export → Vercel or Netlify. Domain: `dayshotechno.com`.



\---



\## 3. SITE ARCHITECTURE \& SECTIONS (Single Page)



\### Section A: HERO / COVER (100vh)

\- \*\*Background:\*\* `#050505` + noise overlay + faint, slow-moving CSS grid lines.

\- \*\*Content:\*\* 

&#x20; - DAY SHO Logo (SVG or optimized PNG — use `masterbomblogo.png` or `triplebomb\_icon\_red.png` as reference, rebuild as SVG if possible).

&#x20; - Tagline: "HARD TECHNO / SCHRANZ" in JetBrains Mono, 14px, tracking-widest.

&#x20; - Claim: "RELENTLESS. RAW. REDEFINED." in Space Grotesk, massive, breaking lines.

&#x20; - One embedded SoundCloud player (custom chrome: red border, monospace track label, no default SC branding visible).

\- \*\*Visual Elements:\*\* A large, distorted red arrow (SVG, referencing the STOCKDUNKEL flyer) pointing down. A "SCAN" HUD element in the corner (like `nice\_symbols\_2.png` reference).



\### Section B: AUDIO / VISUAL FEED

\- \*\*Heading:\*\* "AUDIO\_FEED" in monospace.

\- \*\*SoundCloud embed:\*\* 2–3 latest mixes (if available, otherwise 1).

\- \*\*Video Reel:\*\* A single embedded YouTube/Vimeo video (aftermovie or live set) inside a container that looks like a damaged CRT monitor (scanline overlay, slight chromatic aberration via CSS text-shadow tricks, optional).



\### Section C: BIO SYSTEM (The "Data Sheet")

\- \*\*Layout:\*\* Two columns on desktop. Left = Large display "BIO". Right = content.

\- \*\*Content:\*\*

&#x20; - \*\*Micro-Bio:\*\* 1 sentence. Copy-to-clipboard button (monospace icon).

&#x20; - \*\*Short-Bio:\*\* 50 words. Copy-to-clipboard button.

&#x20; - \*\*Long-Bio:\*\* 250 words (the existing text from the current site, refined). Copy-to-clipboard button.

\- \*\*Visual:\*\* Terminal-like container. `border: 1px solid #333; background: #0A0A0A;`. Red blinking cursor effect after the section title.



\### Section D: DESTROYED STAGES (Timeline / Event Log)

\- \*\*Heading:\*\* "DESTROYED\_STAGES.LOG" in monospace.

\- \*\*Layout:\*\* Vertical timeline. Each event is a "log entry".

\- \*\*Content:\*\* Existing stages:

&#x20; - Ehrnau-Rave | Schloss Mautern // Mautern

&#x20; - Noise | Eventfabrik // Niklasdorf

&#x20; - Face2Face | Das Werk // Wien

&#x20; - Sauhaufen | Postgarage // Graz

&#x20; - Polytox Production Face2Face | Postgarage // Graz

&#x20; - Trash-O-Ween | Kulturverein röda // Steyr

\- \*\*Interaction:\*\* Staggered fade-in on scroll (GSAP). Each entry has a red `\[ACTIVE]` or white `\[LOGGED]` tag. Monospace date format: `YYYY.MM.DD`.



\### Section E: TECH RIDER (Spec Sheet)

\- \*\*Heading:\*\* "TECHNICAL\_SPEC" with a warning icon.

\- \*\*Layout:\*\* Brutalist table or grid — NOT a standard HTML table. Use CSS Grid.

\- \*\*Content:\*\*

&#x20; - 3x PIONEER CDJ-3000 (LINKED) // ALT: 2000NXS2

&#x20; - 1x DJM-A9 // ALT: ALLEN \& HEATH XONE:96

\- \*\*Visual:\*\* Images of CDJ-3000 and DJM-A9 (from current site) but treated as technical schematic inserts inside the grid. Red borders around each item. Monospace labels like `REQ\_01`, `REQ\_02`.



\### Section F: PRESS ASSETS (The Armory)

\- \*\*Heading:\*\* "PRESS\_ARMORY"

\- \*\*Content:\*\* 

&#x20; - High-Res Photos (links to WebP gallery).

&#x20; - Logo Pack (SVG + PNG) — direct download.

&#x20; - Rider PDF — direct download.

&#x20; - One-Sheet PDF — generate as a styled HTML page that can be printed to PDF.

\- \*\*Interaction:\*\* Download buttons must look like industrial switches: large, rectangular, black background, white border, red text on hover.



\### Section G: BOOKING (Direct Line)

\- \*\*Heading:\*\* "INITIATE\_CONTACT"

\- \*\*Content:\*\* 

&#x20; - A contact form: Name, Venue, City, Date, Estimated Capacity, Budget Range (dropdown), Message.

&#x20; - Form action: Use a form service (Getform, Formspree, or Netlify Forms) with fallback `mailto:booking@dayshotechno.com`.

\- \*\*Visual:\*\* Form fields are raw: 1px bottom border only, no rounded corners, JetBrains Mono for inputs, red focus states (`outline: 1px solid #FF2A2A`).



\### Section H: FOOTER / SOCIALS

\- \*\*Content:\*\* Instagram, TikTok, SoundCloud links. 

\- \*\*Visual:\*\* Monospace list. No icons (or brutalist monochrome icons only). Copyright: `© DAY SHO // ALL SYSTEMS OPERATIONAL`.



\---



\## 4. CONTENT \& COPY (Use exactly, but style aggressively)



\- \*\*Bio-Text (Long):\*\* "DAY SHO // RELENTLESS. RAW. REDEFINED. For two years, DAY SHO has been dismantling regional dancefloors with a precision that leaves absolutely zero room for compromise. Where others hold back, DAY SHO goes full throttle: delivering Hard Techno and Schranz in their purest, darkest forms. Drawing inspiration from the legacy of heavyweights like Svetec, O.B.I., and Golpe, DAY SHO engineers an atmosphere that is as menacing as it is liberating. Massive industrial kicks and distorted textures forge a sound that doesn't just fill the room—it holds the crowd in a merciless grip until the very last minute. This isn't just spinning tracks; it's heavy labor. No corporate marketing facades, no pointless noise—just sound that cuts straight to the bone. READY FOR THE ASSAULT."



\- \*\*Micro-Bio:\*\* "DAY SHO delivers merciless Hard Techno and Schranz for the darkest dancefloors."



\- \*\*Short-Bio:\*\* "DAY SHO is a Hard Techno \& Schranz DJ dismantling regional dancefloors with industrial precision. Inspired by Svetec, O.B.I., and Golpe, his sound is relentless, raw, and uncompromising."



\- \*\*Booking Email:\*\* `booking@dayshotechno.com`



\---



\## 5. META \& SEO (Non-Negotiable)



\- \*\*Title:\*\* `DAY SHO | Hard Techno DJ \& Schranz Artist — Official EPK`

\- \*\*Description:\*\* `Electronic Press Kit for DAY SHO. Hard Techno \& Schranz DJ. Bookings, rider, press assets, and tour history.`

\- \*\*Open Graph:\*\* 

&#x20; - `og:image` must be 1200x630px, designed like the STOCKDUNKEL flyer (black background, red type, distorted grid, logo). Use the exact red `#FF2A2A`.

&#x20; - `og:title`, `og:description` as above.

\- \*\*Twitter Card:\*\* `summary\_large\_image`.

\- \*\*Schema.org:\*\* `MusicGroup` or `Person` schema with name, genre, image, url, sameAs (social links), and event history.

\- \*\*Favicon:\*\* `triplebomb\_icon\_red.png` or SVG version. Must be 32x32 and 180x180 (Apple touch).



\---



\## 6. INTERACTION \& MOTION SPECIFICATIONS



\- \*\*Glitch Hover:\*\* On all links and buttons, a CSS-only glitch effect on hover using `text-shadow` offsets (red/cyan at 2px offset) for 0.2s.

\- \*\*Scan Line:\*\* A single horizontal line (`1px`, `#39FF14`, `opacity: 0.3`) that moves down the Hero section over 10 seconds infinitely.

\- \*\*Typewriter Reveal:\*\* The "Destroyed Stages" log entries appear as if typed into a terminal on scroll.

\- \*\*Parallax:\*\* The Hero background grid moves at 0.5x scroll speed (CSS `transform: translateY()` via Intersection Observer or GSAP — keep it performant).

\- \*\*Cursor:\*\* Optional custom cursor (small crosshair or red dot) — only if it doesn't hurt performance.



\---



\## 7. CONSTRAINTS \& QUALITY GATES (Do NOT violate)



\- \*\*Performance:\*\* Total blocking time < 200ms. No render-blocking JS. Lazy-load all images below the fold.

\- \*\*Accessibility:\*\* Minimum color contrast 4.5:1 for body text. The red `#FF2A2A` on black `#050505` is \~5.8:1 — acceptable. All images must have alt text.

\- \*\*No Generic Templates:\*\* Do NOT use a SaaS UI kit. Build custom components. Every class must be purposeful.

\- \*\*No Bloat:\*\* If a library adds >20kb for a trivial effect, implement it in raw CSS/JS instead.

\- \*\*Mobile First:\*\* The brutalist look must NOT break on mobile. Columns become stacked. Font sizes scale down aggressively but remain readable.

\- \*\*Print:\*\* The One-Sheet section must be printable to a clean PDF via browser print dialog (use `@media print` to hide noise/animations).



\---



\## 8. ASSET MANAGEMENT



\- All images must be in `/public/assets/` or `/src/assets/` and optimized.

\- Original assets from the user (uploaded images) are references for style only. Use them as mood board. Do NOT hotlink from Google Drive.

\- Generate a `presskit.zip` containing: 4x hi-res photos (WebP + JPEG), 1x logo pack (SVG/PNG), 1x rider.txt, 1x one-sheet.pdf. Host this ZIP in `/public/downloads/`.



\---



\## 9. DELIVERABLE STRUCTURE



/daysho-epk/

├── /src/

│   ├── /components/

│   │   ├── HeroSection.astro

│   │   ├── AudioFeed.astro

│   │   ├── BioSystem.astro

│   │   ├── StageTimeline.astro (React island for GSAP)

│   │   ├── TechRider.astro

│   │   ├── PressAssets.astro

│   │   ├── BookingForm.tsx (React island — form interactivity)

│   │   ├── Footer.astro

│   │   ├── GlitchButton.tsx

│   │   └── ScanlineOverlay.astro

│   ├── /layouts/

│   │   └── Layout.astro (Global noise, scanline, fonts, meta)

│   ├── /pages/

│   │   └── index.astro

│   └── /styles/

│       └── global.css (Custom properties, keyframes, base brutalist resets)

├── /public/

│   ├── /assets/

│   │   ├── noise.png

│   │   ├── logo-day-sho.svg

│   │   ├── presse1.webp ... presse4.webp

│   │   ├── cdj3000.webp

│   │   └── djma9.webp

│   └── /downloads/

│       └── presskit.zip

├── astro.config.mjs

├── tailwind.config.js

└── package.json



Execute this project in 3 phases:

1\. \*\*Setup \& Design System\*\* — Initialize repo, config, global styles, Layout.astro, noise/scanline.

2\. \*\*Content \& Structure\*\* — Build all sections with exact copy, images, SoundCloud embed, form.

3\. \*\*Polish \& Export\*\* — GSAP timeline, glitch effects, OG image generation, final Lighthouse optimization, static build, deploy to Vercel.

