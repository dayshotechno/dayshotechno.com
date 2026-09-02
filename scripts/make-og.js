// Generates the 1200x630 Open-Graph card.
// Run: npm run make:og   (regenerate whenever the wordmark or the press shot changes)
//
// Was CommonJS (`require`) in a package with "type": "module", so it threw
// ReferenceError on every run and the OG image could not be rebuilt. ESM now.
//
// The old card was the wordmark centred on black: no photo, no genre, no city. A link
// dropped into a promoter group showed a logo and nothing else. This one carries the
// four things that decide whether someone opens it — face, name, genre, availability —
// in the site's own colour regime.
//
// Writes to both the source folder and public/, because prepare-assets.js (which used
// to do the copy) needs the gitignored photo folders and cannot run from a bare clone.
import sharp from "sharp";
import { copyFile } from "node:fs/promises";

const W = 1200;
const H = 630;

const BASE = "#050505";
const SIGNAL = "#FF2A2A";
const INK = "#E0E0E0";
const DIM = "#8A8A8A";

// The PNG wordmark carries an opaque black box (corner pixels are 0,0,0,255) that
// shows as a rectangle against the #050505 ground. This SVG cut is the same mark with
// the background rect already stripped by prepare-assets.js.
const WORDMARK = "public/assets/logo-day-sho.svg";
const PORTRAIT = "public/assets/press_06.webp";
const OUT = "assets/og-image.jpg";
const OUT_PUBLIC = "public/assets/og-image.jpg";

// Photo occupies the right third and dissolves into the page on its left edge — the
// same treatment as the hero figure, so the card reads as part of the site.
const PHOTO_X = 620;
const PHOTO_W = W - PHOTO_X;

async function portrait() {
  const img = sharp(PORTRAIT)
    .resize(PHOTO_W, H, { fit: "cover", position: sharp.strategy.attention })
    .grayscale()
    .linear(1.12, -10)
    .ensureAlpha();

  const fade = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO_W}" height="${H}">
       <defs>
         <linearGradient id="f" x1="0" x2="1" y1="0" y2="0">
           <stop offset="0" stop-color="#000"/>
           <stop offset="0.45" stop-color="#fff"/>
         </linearGradient>
       </defs>
       <rect width="${PHOTO_W}" height="${H}" fill="url(#f)"/>
     </svg>`
  );

  return img
    .composite([{ input: fade, blend: "dest-in" }])
    .png()
    .toBuffer();
}

// Stripes, corner brackets and type in one overlay so nothing can drift out of register.
const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <defs>
       <pattern id="warn" width="24" height="24" patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)">
         <rect width="24" height="24" fill="${BASE}"/>
         <rect width="12" height="24" fill="${SIGNAL}"/>
       </pattern>
     </defs>

     <path d="M44 44 h56 M44 44 v56" stroke="${SIGNAL}" stroke-width="4" fill="none"/>
     <path d="M1156 568 h-56 M1156 568 v-56" stroke="${SIGNAL}" stroke-width="4" fill="none"/>

     <rect x="80" y="380" width="150" height="5" fill="${SIGNAL}"/>

     <text x="80" y="450" fill="${INK}" font-size="30" letter-spacing="3.5"
           font-family="Consolas, DejaVu Sans Mono, monospace">SCHRANZ / HARD TECHNO</text>
     <text x="80" y="496" fill="${DIM}" font-size="21" letter-spacing="3"
           font-family="Consolas, DejaVu Sans Mono, monospace">GRAZ / AT — BOOKING OPEN</text>

     <rect x="0" y="612" width="${W}" height="18" fill="url(#warn)"/>
   </svg>`
);

const mark = await sharp(WORDMARK).resize({ height: 230 }).png().toBuffer();

await sharp({ create: { width: W, height: H, channels: 3, background: BASE } })
  .composite([
    { input: await portrait(), left: PHOTO_X, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: mark, left: 80, top: 110 },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(OUT);

await copyFile(OUT, OUT_PUBLIC);

console.log("OG image written ->", OUT, "and", OUT_PUBLIC);
