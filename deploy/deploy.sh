#!/usr/bin/env bash
# Deploy on the server:  ./deploy/deploy.sh            (all sites)
#                        ./deploy/deploy.sh youth      (one site: main | youth | training | media)
# Each site is built and restarted on its own, so one can be updated without touching the others.
set -euo pipefail
cd "$(dirname "$0")/.."

SITES=("${@:-main youth training media}")
read -r -a SITES <<<"${SITES[*]}"

git pull --ff-only
set -a; [ -f deploy/.env.production ] && . deploy/.env.production; set +a   # NEXT_PUBLIC_URL_* are baked in at build
npm ci

for site in "${SITES[@]}"; do
  echo "==> building $site"
  npm run build -w "@ros/$site"
  if pm2 describe "ros-$site" >/dev/null 2>&1; then pm2 reload "ros-$site"; else pm2 start deploy/ecosystem.config.cjs --only "ros-$site"; fi
done
pm2 save
echo "done: ${SITES[*]}"
