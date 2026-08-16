// Builds /public/assets from the source material in /assets, /day_sho_logo and /Neuer Ordner/Vector.
// Run: npm run assets  (idempotent — safe to re-run after source changes)
import sharp from "sharp";
import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
import crypto from "node:crypto";

const OUT = "public/assets";
const VEC = "Neuer Ordner/Vector";

async function noise() {
  // 200x200 tileable noise for the global overlay.
  // ponytail: quantised to 16 grey levels before encoding — random 8-bit noise is
  // incompressible and produced a 59 kB PNG; 16 levels look identical at opacity 0.05.
  const size = 200;
  const buf = Buffer.alloc(size * size);
  crypto.randomFillSync(buf);
  for (let i = 0; i < buf.length; i++) buf[i] = buf[i] & 0xf0;
  await sharp(buf, { raw: { width: size, height: size, channels: 1 } })
    .png({ compressionLevel: 9, palette: true, colours: 16 })
    .toFile(`${OUT}/noise.png`);
}

async function favicons() {
  const src = "day_sho_logo/ICON/.png/triplebomb_icon_red.png";
  await sharp(src).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${OUT}/favicon-32.png`);
  await sharp(src).resize(180, 180, { fit: "contain", background: { r: 5, g: 5, b: 5, alpha: 1 } }).png().toFile(`${OUT}/apple-touch-icon.png`);
}

async function gear() {
  for (const name of ["cdj3000", "djma9", "cdj2000nx2", "xone96"]) {
    await sharp(`assets/${name}.png`).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${OUT}/${name}.webp`);
  }
}

// Press set — REAL photography only. This is what ships in presskit.zip and what
// press may publish. Keep AI-generated frames out of this list (see webOnly below).
const PRESS = [
  ["assets/NEW_PRESSPICS/IMG_3383_industrial.png", "press_01"],
  ["assets/NEW_PRESSPICS/presse3_industrial.png", "press_02"],
  ["assets/NEW_PRESSPICS/IMG_3346_industrial.png", "press_03"],
  ["assets/NEW_PRESSPICS/IMG_5367.PNG", "press_04"],
  ["New_website_pics/press_02_front(1).jpg", "press_05"],
  ["New_website_pics/Picture (95 of 196).JPEG", "press_06"],
];

// Site-only imagery. The two flux frames are AI-generated extensions of the press_05
// studio session — used as layout elements on the page, never offered as press assets.
const WEB_ONLY = [
  ["New_website_pics/flux-2-dev_a_exact_same_person_as.jpeg", "studio_side"],
  ["New_website_pics/flux-2-dev_a_exact_same_person_as(1).jpeg", "studio_walk"],
];

// Emitted dimensions are written to src/data/images.json so markup never hard-codes a
// width/height. Sources vary from 880px to 4400px wide and `withoutEnlargement` means
// the output size is not predictable from the requested width.
const dims = {};

async function emit(src, name, width, quality) {
  const info = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(`${OUT}/${name}.webp`);
  dims[name] = { w: info.width, h: info.height };
}

async function photos() {
  for (const [src, name] of PRESS) await emit(src, name, 1400, 82);
  for (const [src, name] of WEB_ONLY) await emit(src, name, 1200, 80);
  // Narrow cut of the hero figure — it is the LCP element on mobile.
  await emit("New_website_pics/press_02_front(1).jpg", "press_05@700", 700, 78);
}

async function logos() {
  // Both cuts get their background rect stripped so they sit on whatever is behind
  // them: the master is white+red (screen), the inverted one black+red (paper).
  const strip = (svg) => svg.replace(/<rect[^>]*\/?>/, "");

  const master = await readFile(`${VEC}/DAY_SHO_bomblogo_MASTER_black_BACKGROUND.svg`, "utf8");
  await writeFile(`${OUT}/logo-day-sho.svg`, strip(master), "utf8");

  const inverted = await readFile(`${VEC}/DAY_SHO_bomblogo_inverted_white_BACKGROUND.svg`, "utf8");
  await writeFile(`${OUT}/logo-day-sho-ink.svg`, strip(inverted), "utf8");

  await copyFile(`${VEC}/bombicon.svg`, `${OUT}/bombicon.svg`);
  await copyFile(`${VEC}/DAY_SHO_bombicon_signalred.svg`, `${OUT}/triplebomb.svg`);
  await copyFile("assets/bomb-cue.png", `${OUT}/bomb-cue.png`);
  await copyFile("day_sho_logo/ICON/.png/triplebomb_icon_red.png", `${OUT}/triplebomb_icon_red.png`);
  await copyFile("assets/og-image.jpg", `${OUT}/og-image.jpg`);
}

async function video() {
  await copyFile("assets/desktop-loop.mp4", `${OUT}/desktop-loop.mp4`);
  await copyFile("assets/mobile-loop.mp4", `${OUT}/mobile-loop.mp4`);
}

await mkdir(OUT, { recursive: true });
await Promise.all([noise(), favicons(), gear(), photos(), logos(), video()]);

await mkdir("src/data", { recursive: true });
await writeFile("src/data/images.json", JSON.stringify(dims, null, 2) + "\n", "utf8");

console.log("Assets prepared ->", OUT);
console.table(dims);
