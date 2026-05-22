#!/usr/bin/env bash
# Downloads real Unsplash photos (same as the live site uses).
#   npm run images:download
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/fetch-photos.mjs
