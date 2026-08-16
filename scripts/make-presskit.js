// Stages the press kit into build/presskit/, ready to be zipped.
// Run via: npm run presskit  (stages, then zips with PowerShell's Compress-Archive)
//
// Real photography only. The AI-generated studio frames used on the site are
// deliberately absent — nothing an editor pulls out of this archive is synthetic.
import sharp from "sharp";
import { mkdir, rm, copyFile, readdir } from "node:fs/promises";

const STAGE = "build/presskit";
const VEC = "Neuer Ordner/Vector";

// [source, output name] — sources are used at their native resolution, no upscaling.
const PHOTOS = [
  ["assets/NEW_PRESSPICS/IMG_3383_industrial.png", "press_01"],
  ["assets/NEW_PRESSPICS/presse3_industrial.png", "press_02"],
  ["assets/NEW_PRESSPICS/IMG_3346_industrial.png", "press_03"],
  ["assets/NEW_PRESSPICS/IMG_5367.PNG", "press_04"],
  ["New_website_pics/press_02_front(1).jpg", "press_05"],
  ["New_website_pics/Picture (95 of 196).JPEG", "press_06"],
];

await rm(STAGE, { recursive: true, force: true });
await mkdir(`${STAGE}/photos_jpeg`, { recursive: true });
await mkdir(`${STAGE}/photos_webp`, { recursive: true });
await mkdir(`${STAGE}/logo_pack`, { recursive: true });

const manifest = [];

for (const [src, name] of PHOTOS) {
  const meta = await sharp(src).metadata();
  await sharp(src).jpeg({ quality: 92 }).toFile(`${STAGE}/photos_jpeg/${name}.jpg`);
  await sharp(src).webp({ quality: 90 }).toFile(`${STAGE}/photos_webp/${name}.webp`);
  manifest.push(`${name}  ${meta.width}x${meta.height}`);
}

// Vectors first — they are what press actually needs for print.
for (const f of (await readdir(VEC)).filter((f) => f.endsWith(".svg") || f.endsWith(".ai"))) {
  await copyFile(`${VEC}/${f}`, `${STAGE}/logo_pack/${f}`);
}

await copyFile("public/downloads/rider.txt", `${STAGE}/rider.txt`);

console.log("Staged -> " + STAGE);
console.log(manifest.join("\n"));
