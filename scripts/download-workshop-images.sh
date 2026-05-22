#!/usr/bin/env bash
# Run once on your Mac to save photos into the repo (optional, for offline / China CDN issues):
#   bash scripts/download-workshop-images.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/workshops"
mkdir -p "$OUT"

download() {
  local slug="$1" url="$2"
  echo "→ $slug"
  curl -fsSL -A "Mozilla/5.0" -L "$url" -o "$OUT/${slug}.jpg"
}

download "bai-ethnic-tie-dye" "https://images.pexels.com/photos/3991881/pexels-photo-3991881.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop"
download "erhai-cycling-pottery" "https://images.pexels.com/photos/128460/pexels-photo-128460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop"
download "sichuan-hotpot-cooking" "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop"
download "shuimo-painting-pandas" "https://images.pexels.com/photos/3310694/pexels-photo-3310694.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop"
download "tea-ceremony-mount-emei" "https://images.pexels.com/photos/6527375/pexels-photo-6527375.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop"
download "nuodeng-salt-well-hike" "https://images.pexels.com/photos/4170746/pexels-photo-4170746.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop"

echo "Done. Set USE_LOCAL_WORKSHOP_IMAGES=true in .env.local to prefer these files."
