#!/usr/bin/env bash
# Saves curated covers into the repo (run on your Mac):
#   bash scripts/download-workshop-images.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/workshops"
mkdir -p "$OUT"
P="auto=format&fit=crop&w=1200&h=900&q=85"

download() {
  local slug="$1" url="$2"
  echo "→ $slug"
  curl -fsSL -A "Mozilla/5.0" -L "$url" -o "$OUT/${slug}.jpg"
}

download "bai-ethnic-tie-dye" "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?${P}"
download "erhai-cycling-pottery" "https://images.unsplash.com/photo-1470071459605-3b5ec3a8b698?${P}"
download "sichuan-hotpot-cooking" "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?${P}"
download "shuimo-painting-pandas" "https://images.unsplash.com/photo-1563492065599-3520f775eeed?${P}"
download "tea-ceremony-mount-emei" "https://images.unsplash.com/photo-1571930171630-aa5e01b390c2?${P}"
download "nuodeng-salt-well-hike" "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?${P}"

echo "Done. Add to .env.local: USE_LOCAL_WORKSHOP_IMAGES=true"
