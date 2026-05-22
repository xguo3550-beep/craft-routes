#!/usr/bin/env bash
# Download real photo covers into public/images/workshops (run on your Mac).
# Uses Pexels (free license) — do NOT scrape Airbnb (copyright + hotlink blocks).
#
#   bash scripts/download-workshop-images.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/workshops"
mkdir -p "$OUT"
P="auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop"

download() {
  local slug="$1" url="$2"
  echo "→ $slug"
  curl -fsSL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
    -H "Referer: https://www.pexels.com/" \
    -L "$url" -o "$OUT/${slug}.jpg"
}

# Thematic, travel / experience style (Pexels)
download "bai-ethnic-tie-dye" "https://images.pexels.com/photos/62902/pexels-photo-62902.jpeg?${P}"
download "erhai-cycling-pottery" "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?${P}"
download "sichuan-hotpot-cooking" "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?${P}"
download "shuimo-painting-pandas" "https://images.pexels.com/photos/33109/pexels-photo-33109.jpeg?${P}"
download "tea-ceremony-mount-emei" "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?${P}"
download "nuodeng-salt-well-hike" "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?${P}"
download "default-experience" "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?${P}"
download "dali-experience" "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?${P}"
download "sichuan-experience" "https://images.pexels.com/photos/699544/pexels-photo-699544.jpeg?${P}"
download "cafe-cats" "https://images.pexels.com/photos/2071874/pexels-photo-2071874.jpeg?${P}"

echo "Done — restart dev server. Covers load from /public/images/workshops/"
