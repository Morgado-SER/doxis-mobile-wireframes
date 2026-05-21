/**
 * export-screens.js
 * Screenshots every wireframe screen and saves as JPEG.
 * Run: node export-screens.js
 * Requires: npx puppeteer (downloaded automatically on first run)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3456';
const OUT_DIR  = path.join(__dirname, 'screens-export');

const SCREENS = [
  { file: 'index',                    label: '00-index' },
  { file: 'screens/01-state-a',       label: '01-state-a' },
  { file: 'screens/02-state-a-qr',    label: '02-state-a-qr' },
  { file: 'screens/03-state-a-qr-error', label: '03-state-a-qr-error' },
  { file: 'screens/04-state-b',       label: '04-state-b' },
  { file: 'screens/05-state-c',       label: '05-state-c' },
  { file: 'screens/06-tenant',        label: '06-tenant' },
  { file: 'screens/07-auth-style',    label: '07-auth-style' },
  { file: 'screens/08-credentials',   label: '08-credentials' },
  { file: 'screens/09-sso',           label: '09-sso' },
  { file: 'screens/10-loading',       label: '10-loading' },
  { file: 'screens/11-role',          label: '11-role' },
  { file: 'screens/12-home',          label: '12-home' },
];

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page    = await browser.newPage();

  // Wide viewport so the layout renders in its two-column form
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  for (const screen of SCREENS) {
    const url = `${BASE_URL}/${screen.file}.html`;
    console.log(`→ ${screen.label}`);

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait a tick for animations/fonts to settle
    await new Promise(r => setTimeout(r, 400));

    let clip;

    if (screen.label === '00-index') {
      // Full-page screenshot for the hub
      const body = await page.$('body');
      const box  = await body.boundingBox();
      clip = { x: 0, y: 0, width: box.width, height: box.height };
    } else {
      // Crop to just the device frame — clean for Figma
      const device = await page.$('.device');
      if (!device) {
        console.warn(`  ⚠ .device not found on ${url}, skipping`);
        continue;
      }
      clip = await device.boundingBox();
      // Add a small amount of padding around the device
      const pad = 24;
      clip = {
        x:      clip.x - pad,
        y:      clip.y - pad,
        width:  clip.width  + pad * 2,
        height: clip.height + pad * 2,
      };
    }

    const outPath = path.join(OUT_DIR, `${screen.label}.jpg`);
    await page.screenshot({
      path:    outPath,
      type:    'jpeg',
      quality: 95,
      clip,
    });

    console.log(`  ✓ saved ${screen.label}.jpg`);
  }

  await browser.close();
  console.log(`\nDone — ${SCREENS.length} JPEGs in: ${OUT_DIR}`);
})();
