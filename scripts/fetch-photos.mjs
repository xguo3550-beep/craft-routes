#!/usr/bin/env node
/**
 * Download real cover photos into public/images/workshops/
 *   npm run images:download
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/images/workshops");
const P = "auto=format&fit=crop&w=1200&h=900&q=80";

const PHOTOS = {
  "bai-ethnic-tie-dye": `https://images.unsplash.com/photo-1615485924169-f27c8fe9c187?${P}`,
  "erhai-cycling-pottery": `https://images.unsplash.com/photo-1565194669956-38fb0b7a9c1e?${P}`,
  "tea-ceremony-mount-emei": `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${P}`,
  "chengdu-tea-house-afternoon": `https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?${P}`,
  "nuodeng-salt-well-hike": `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?${P}`,
  "shuimo-painting-pandas": `https://images.unsplash.com/photo-1563492065599-3520f775eeed?${P}`,
  "sichuan-hotpot-cooking": `https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?${P}`,
  "cafe-cats": `https://images.unsplash.com/photo-1514887279491-afe06896c428?${P}`,
  "dali-experience": `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${P}`,
  "sichuan-experience": `https://images.unsplash.com/photo-1528360983277-f83d811b5e8?${P}`,
  "default-experience": `https://images.unsplash.com/photo-1508804185779-d106f582f903?${P}`,
};

fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
for (const [slug, url] of Object.entries(PHOTOS)) {
  process.stdout.write(`→ ${slug} … `);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ElsewhereChina/1.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10_000) throw new Error("too small");
    fs.writeFileSync(path.join(OUT, `${slug}.jpg`), buf);
    console.log(`✓ ${Math.round(buf.length / 1024)} KB`);
    ok++;
  } catch (e) {
    console.log(`✗ ${e.message}`);
  }
}

console.log(`\n${ok}/${Object.keys(PHOTOS).length} saved. Add USE_LOCAL_WORKSHOP_IMAGES=true to .env.local`);
