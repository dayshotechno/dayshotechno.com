// Generates a branded 1200x630 Open-Graph image: DAY SHO wordmark centered on black.
// Run: npm run make:og   (regenerate whenever the wordmark changes)
const sharp = require("sharp");

const W = 1200, H = 630;
const SRC = "assets/day-sho-wordmark.png";
const OUT = "assets/og-image.jpg";

(async () => {
  const logo = await sharp(SRC).resize({ height: 470 }).png().toBuffer();
  await sharp({ create: { width: W, height: H, channels: 3, background: { r: 0, g: 0, b: 0 } } })
    .composite([{ input: logo, gravity: "center" }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(OUT);
  console.log("OG image written ->", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
