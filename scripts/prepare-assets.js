// Builds /public/assets from the source material in /assets and /day_sho_logo.
// Run: npm run assets  (idempotent — safe to re-run after source changes)
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import crypto from "node:crypto";

const OUT = "public/assets";

async function noise() {
  // 200x200 tileable grayscale noise for the global overlay
  const size = 200;
  const buf = Buffer.alloc(size * size);
  crypto.randomFillSync(buf);
  await sharp(buf, { raw: { width: size, height: size, channels: 1 } })
    .png({ compressionLevel: 9 })
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

async function photos() {
  for (let i = 1; i <= 4; i++) {
    await copyFile(`assets/presse${i}.webp`, `${OUT}/presse${i}.webp`);
  }
}

async function logos() {
  await copyFile("assets/day-sho-wordmark.png", `${OUT}/day-sho-wordmark.png`);
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
console.log("Assets prepared ->", OUT);
