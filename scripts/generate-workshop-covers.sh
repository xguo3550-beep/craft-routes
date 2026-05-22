#!/usr/bin/env bash
# Editorial cover art when photos cannot be downloaded (offline-safe).
#   npm run images:generate
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/workshops"
TMP="$ROOT/scripts/.cover-tmp"
mkdir -p "$OUT" "$TMP"

make_svg() {
  local slug="$1" file="$TMP/${slug}.svg"
  case "$slug" in
    bai-ethnic-tie-dye)
      cat > "$file" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a1628"/>
      <stop offset="50%" style="stop-color:#1e4a6e"/>
      <stop offset="100%" style="stop-color:#4a7ba7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#g)"/>
  <g fill="none" stroke="#a8d4f0" stroke-width="1.2" opacity="0.55">
    <path d="M0 450 Q200 200 400 450 T800 450 T1200 450"/>
    <path d="M0 520 Q250 280 500 520 T1000 520"/>
    <path d="M0 380 Q180 120 360 380 T720 380 T1080 380"/>
  </g>
  <circle cx="900" cy="200" r="120" fill="#e8f4fc" opacity="0.08"/>
</svg>
SVG
      ;;
    tea-ceremony-mount-emei|chengdu-tea-house-afternoon)
      cat > "$file" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="g" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1a2f1a"/>
      <stop offset="100%" style="stop-color:#5a8f6a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#g)"/>
  <ellipse cx="600" cy="700" rx="500" ry="80" fill="#0d1a0d" opacity="0.4"/>
  <path d="M200 700 Q400 400 600 500 T1000 650" fill="none" stroke="#c8e6c9" stroke-width="2" opacity="0.35"/>
  <circle cx="300" cy="250" r="8" fill="#f5f5dc" opacity="0.6"/>
  <circle cx="450" cy="180" r="6" fill="#f5f5dc" opacity="0.5"/>
</svg>
SVG
      ;;
    erhai-cycling-pottery)
      cat > "$file" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" style="stop-color:#6ba3c7"/>
      <stop offset="60%" style="stop-color:#9ec9e0"/>
      <stop offset="100%" style="stop-color:#5c6b4a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#sky)"/>
  <ellipse cx="600" cy="620" rx="700" ry="120" fill="#3d5a3d" opacity="0.7"/>
  <ellipse cx="600" cy="580" rx="550" ry="60" fill="#7ab8d4" opacity="0.5"/>
</svg>
SVG
      ;;
    nuodeng-salt-well-hike)
      cat > "$file" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#8b7355"/>
      <stop offset="100%" style="stop-color:#3d3228"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#g)"/>
  <polygon points="0,500 200,350 400,420 600,300 800,380 1000,280 1200,400 1200,900 0,900" fill="#2a2218" opacity="0.6"/>
</svg>
SVG
      ;;
    cafe-cats)
      cat > "$file" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="#3d2c3e"/>
  <rect x="80" y="120" width="400" height="500" rx="8" fill="#5c4a5e" opacity="0.8"/>
  <circle cx="700" cy="400" r="150" fill="#c9a0b8" opacity="0.25"/>
</svg>
SVG
      ;;
    *)
      cat > "$file" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5c4033"/>
      <stop offset="100%" style="stop-color:#d4a574"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#g)"/>
</svg>
SVG
      ;;
  esac
  echo "$file"
}

LABELS=(
  "bai-ethnic-tie-dye|Bai Indigo"
  "tea-ceremony-mount-emei|Mountain Tea"
  "erhai-cycling-pottery|Erhai · Clay"
  "chengdu-tea-house-afternoon|Teahouse"
  "nuodeng-salt-well-hike|Nuodeng"
  "shuimo-painting-pandas|Ink & Bamboo"
  "sichuan-hotpot-cooking|Sichuan"
  "dali-experience|Dali"
  "sichuan-experience|Sichuan"
  "cafe-cats|Old Town"
  "default-experience|Elsewhere China"
)

for entry in "${LABELS[@]}"; do
  slug="${entry%%|*}"
  label="${entry##*|}"
  echo "→ $slug"
  svg="$(make_svg "$slug")"
  convert -background none "$svg" \
    \( -size 1200x300 gradient:'rgba(0,0,0,0)-rgba(0,0,0,0.55)' \) \
    -gravity south -composite \
    -fill '#faf8f5' -gravity SouthWest -pointsize 40 -font Helvetica-Bold -annotate +48+72 "$label" \
    -quality 90 "$OUT/${slug}.jpg"
done

rm -rf "$TMP"
echo "Done — $OUT"
