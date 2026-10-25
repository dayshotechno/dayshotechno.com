// Generates the 1200x630 Open-Graph card.
// Run: npm run make:og   (regenerate whenever the hero photo or the copy changes)
//
// The card is the site's first screen in miniature: the crowd photo cut at the
// shoulders, the name underneath in red, one line saying what this is. It is laid out
// as HTML with the self-hosted Space Grotesk and photographed by an installed Chrome
// in headless mode, because SVG text through sharp cannot use the site's typeface.
// Needs Chrome or Edge; set CHROME_PATH if it is not in a standard location.
//
// Writes to both the source folder and public/, because prepare-assets.js needs the
// gitignored photo folders and cannot run from a bare clone.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const W = 1200;
const H = 630;

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));

if (!CHROME) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");

const font = (w) =>
  pathToFileURL(resolve(`node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-${w}-normal.woff2`)).href;
const photo = pathToFileURL(resolve("public/assets/hero_wide@1440.webp")).href;

const html = `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: SG; font-weight: 400; src: url(${font(400)}); }
  @font-face { font-family: SG; font-weight: 700; src: url(${font(700)}); }
  * { margin: 0; box-sizing: border-box; }
  body { width: ${W}px; height: ${H}px; background: #050505; color: #e6e6e6; font-family: SG; overflow: hidden; }
  .photo { height: 290px; background: url(${photo}) 50% 100% / cover; filter: grayscale(1) contrast(1.18) brightness(.92); }
  .name { margin: 2px 40px 0; font-size: 306px; font-weight: 700; line-height: .74; letter-spacing: -.055em; color: #ff2a2a; white-space: nowrap; }
  .row { position: absolute; left: 48px; right: 48px; bottom: 34px; display: flex; justify-content: space-between; align-items: baseline; font-size: 30px; letter-spacing: -.01em; }
  .row span:last-child { color: #a6a6a6; font-size: 26px; }
</style>
<div class="photo"></div>
<div class="name">DAY SHO</div>
<div class="row"><span>Schranz DJ · Graz · Resident at Café Stockwerk</span><span>dayshotechno.com</span></div>`;

const dir = mkdtempSync(join(tmpdir(), "og-"));
const page = join(dir, "card.html");
const shot = join(dir, "card.png");
writeFileSync(page, html);

execFileSync(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--allow-file-access-from-files",
  "--force-device-scale-factor=1",
  `--window-size=${W},${H}`,
  "--virtual-time-budget=3000",
  `--screenshot=${shot}`,
  pathToFileURL(page).href,
]);

const OUT = "assets/og-image.jpg";
const OUT_PUBLIC = "public/assets/og-image.jpg";

await sharp(shot).resize(W, H, { fit: "cover", position: "top" }).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT_PUBLIC);
if (existsSync("assets")) copyFileSync(OUT_PUBLIC, OUT);
console.log(`og-image.jpg written (${W}x${H})`);
