# Project Memory - DAYSHOTECHNO.COM

## Current State
Electronic Press Kit (EPK) for hard techno DJ "DAY SHO", rebuilt 2026-06 as a statically
generated Astro site per the brief in `.claude/CLAUDE.md` ("Dark Industrial Interface"
design system). Single-page EPK plus legal pages and a printable one-sheet.

**Technology Stack:**
- Astro 5 (static output), TypeScript strict
- Tailwind CSS 3.4 via @astrojs/tailwind (custom color regime in tailwind.config.js)
- React 19 island: only `BookingForm.tsx` (client:visible)
- GSAP + ScrollTrigger: hero stagger + DESTROYED_STAGES log reveal only
- Google Fonts: Space Grotesk (display/body) + JetBrains Mono (data/labels)

**Pages:**
- `/` — single-page EPK: Hero, AUDIO_FEED, BIO, DESTROYED_STAGES.LOG, TECHNICAL_SPEC, PRESS_ARMORY, INITIATE_CONTACT, Footer
- `/impressum`, `/datenschutz` — Austrian legal pages (German)
- `/one-sheet` — printable one-pager (@media print → clean black-on-white)
- `/downloads/rider.txt`, `/downloads/presskit.zip`

## Architectural Decisions (The "Why")
1. **Astro static output** — mandated by CLAUDE.md; zero-JS-by-default for Lighthouse 95+.
2. **SoundCloud click-to-load facade** (`SoundCloudPlayer.astro`) — third-party iframe only
   loads after user click: performance + GDPR (documented in /datenschutz).
3. **Booking form = mailto composer** — static hosting, no backend. `BookingForm.tsx`
   builds a structured mailto to booking@dayshotechno.com. Swap in a Formspree/Getform
   endpoint later if desired.
4. **Color named `void`, not `base`** — a Tailwind color named `base` makes `text-base`
   (font-size) emit a color instead. Don't rename it back.
5. **GSAP initial states set via JS, not CSS** — content must be visible without JS;
   `gsap.fromTo` hides elements only once JS runs.
6. **Source assets stay in `/assets` + `/day_sho_logo`** (day_sho_logo is gitignored);
   `npm run assets` (scripts/prepare-assets.js) builds optimized copies into
   `/public/assets` (webp gear shots, noise.png, favicons). Re-run after asset changes.
7. **No real event dates exist** — stage log uses LOG_01..06 ids instead of fabricated
   YYYY.MM.DD dates. Add real dates if the artist supplies them.

## Deployment
- GitHub Pages via `.github/workflows/deploy.yml` (withastro/action → deploy-pages).
- ONE-TIME MANUAL STEP: repo Settings → Pages → Source = "GitHub Actions"
  (was branch-based serving the old static root files).
- CNAME lives in `/public/CNAME` so it lands in the build artifact.

## Context Debt
- presskit.zip (~14 MB) is committed binary in /public/downloads — regenerate manually
  when photos/logos change (see git history for the Compress-Archive command).
- One-sheet "PDF" relies on browser print; no generated .pdf file in the zip.
- Stage log has no dates; schema.org events have no startDate.

---
*Last updated: 2026-06-11 (Astro rebuild)*
