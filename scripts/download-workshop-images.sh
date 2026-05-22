#!/usr/bin/env bash
# Real photos for workshop covers. Run on your Mac (needs network + ImageMagick):
#   npm run images:download
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/workshops"
mkdir -p "$OUT"
UA="ElsewhereChina/1.0 (contact@example.com)"
W="1280"

try_download() {
  local slug="$1" url="$2"
  echo "→ $slug"
  if curl -fsSL -A "$UA" -L "$url" -o "$OUT/${slug}.jpg"; then
    if command -v convert >/dev/null 2>&1; then
      convert "$OUT/${slug}.jpg" -resize 1200x900^ -gravity center -extent 1200x900 -quality 88 "$OUT/${slug}.jpg"
    fi
    echo "  ✓ saved"
    return 0
  fi
  echo "  ✗ failed"
  return 1
}

# Wikimedia Commons — CC / public domain (Southwest China themes)
try_download "bai-ethnic-tie-dye" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Tie-dyed_cloth.jpg/${W}px-Tie-dyed_cloth.jpg" \
  || try_download "bai-ethnic-tie-dye" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/%E5%A4%A7%E7%90%86%E5%96%9C%E6%B4%B2%E6%89%8E%E6%9F%93%E6%9F%93%E7%BC%B8.jpg/${W}px-%E5%A4%A7%E7%90%86%E5%96%9C%E6%B4%B2%E6%89%8E%E6%9F%93%E6%9F%93%E7%BC%B8.jpg" \
  || true

try_download "erhai-cycling-pottery" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Erhai_Lake_and_Cangshan_Mountain%2C_Dali%2C_Yunnan%2C_China.jpg/${W}px-Erhai_Lake_and_Cangshan_Mountain%2C_Dali%2C_Yunnan%2C_China.jpg" \
  || true

try_download "tea-ceremony-mount-emei" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Tea_picking_in_China.jpg/${W}px-Tea_picking_in_China.jpg" \
  || try_download "tea-ceremony-mount-emei" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chinese_tea_ceremony.jpg/${W}px-Chinese_tea_ceremony.jpg" \
  || true

try_download "chengdu-tea-house-afternoon" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chinese_tea_ceremony.jpg/${W}px-Chinese_tea_ceremony.jpg" \
  || true

try_download "nuodeng-salt-well-hike" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Yunnan_countryside.jpg/${W}px-Yunnan_countryside.jpg" \
  || true

try_download "shuimo-painting-pandas" \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Panda_chengdu.jpg/${W}px-Panda_chengdu.jpg" \
  || true

# Pexels fallbacks (free license)
PEX="auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop"
pexels() {
  local slug="$1" id="$2"
  curl -fsSL -A "$UA" -H "Referer: https://www.pexels.com/" \
    -L "https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?${PEX}" \
    -o "$OUT/${slug}.jpg" 2>/dev/null && echo "  ✓ pexels $slug" || true
}

pexels "erhai-cycling-pottery" "1365425"
pexels "sichuan-hotpot-cooking" "725991"
pexels "dali-experience" "2387873"
pexels "sichuan-experience" "699544"
pexels "cafe-cats" "2071874"
pexels "default-experience" "3278215"

if [[ -f "$OUT/tea-ceremony-mount-emei.jpg" && ! -s "$OUT/chengdu-tea-house-afternoon.jpg" ]]; then
  cp "$OUT/tea-ceremony-mount-emei.jpg" "$OUT/chengdu-tea-house-afternoon.jpg"
fi

echo ""
echo "Finished. Missing files? Run: npm run images:generate"
