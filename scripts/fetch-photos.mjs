#!/usr/bin/env node
/**
 * Download real cover photos into public/images/workshops/
 * Run on your Mac (needs internet):
 *   npm run images:download
 * Then add to .env.local:
 *   USE_LOCAL_WORKSHOP_IMAGES=true
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/images/workshops");

const PHOTO_PARAMS = "auto=format&fit=crop&w=1200&h=900&q=85";

const PHOTOS = {
  "bai-ethnic-tie-dye": `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?${PHOTO_PARAMS}`,
  "erhai-cycling-pottery": `https://images.unsplash.com/photo-1470071459605-3b5ec3a8b698?${PHOTO_PARAMS}`,
  "tea-ceremony-mount-emei": `https://images.unsplash.com/photo-1556671047-1351529b6bf1?${PHOTO_PARAMS}`,
  "chengdu-tea-house-afternoon": `https://images.unsplash.com/photo-1544787219-cba4b4f3c313?${PHOTO_PARAMS}`,
  "nuodeng-salt-well-hike": `https://images.unsplash.com/photo-1508804185779-d106f582f903?${PHOTO_PARAMS}`,
  "shuimo-painting-pandas": `https://images.unsplash.com/photo-1563492065599-3520f775eeed?${PHOTO_PARAMS}`,
  "sichuan-hotpot-cooking": `https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?${PHOTO_PARAMS}`,
  "cafe-cats": `https://images.unsplash.com/photo-1514887279491-afe06896c428?${PHOTO_PARAMS}`,
  "dali-experience": `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${PHOTO_PARAMS}`,
  "sichuan-experience": `https://images.unsplash.com/photo-1528360983277-f83d811b5e8?${PHOTO_PARAMS}`,
  "default-experience": `https://images.unsplash.com/photo-1508804185779-d106f582f903?${PHOTO_PARAMS}`,
};

fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
let fail = 0;

for (const [slug, url] of Object.entries(PHOTOS)) {
  process.stdout.write(`→ ${slug} … `);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ElsewhereChina/1.0 (photo download)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10_000) throw new Error("file too small");
    fs.writeFileSync(path.join(OUT, `${slug}.jpg`), buf);
    console.log(`✓ ${Math.round(buf.length / 1024)} KB`);
    ok++;
  } catch (e) {
    console.log(`✗ ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} saved, ${fail} failed.`);
if (ok > 0) {
  console.log("\nAdd to .env.local:\n  USE_LOCAL_WORKSHOP_IMAGES=true");
  console.log("Then restart: npm run dev");
}
