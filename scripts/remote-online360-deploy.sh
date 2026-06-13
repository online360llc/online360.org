#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME:?APP_NAME is required}"
APP_DIR="${APP_DIR:-/srv/apps/online360}"
APP_PORT="${APP_PORT:-3009}"
SHARED_DIR="${SHARED_DIR:-${APP_DIR}/shared}"
SHA="${1:?commit SHA required}"
ARCHIVE="${2:-/tmp/${APP_NAME}-${SHA}.tar.gz}"
RELEASE_DIR="${APP_DIR}/releases/${SHA}"
RELEASE_ENV="${RELEASE_DIR}/.env.production"

[ -f "$ARCHIVE" ] || { echo "Missing archive: $ARCHIVE" >&2; exit 1; }
[ -f "$SHARED_DIR/runtime.env" ] || { echo "Missing runtime.env — run setup-server.sh first" >&2; exit 1; }

export NVM_DIR="$HOME/.nvm"
[ -f "$NVM_DIR/nvm.sh" ] || { echo "nvm not found" >&2; exit 1; }
. "$NVM_DIR/nvm.sh"

mkdir -p "$SHARED_DIR/data"
mkdir -p "$RELEASE_DIR"
tar --warning=no-unknown-keyword -xzf "$ARCHIVE" -C "$RELEASE_DIR"

cat "$SHARED_DIR/runtime.env" > "$RELEASE_ENV"
[ -f "$SHARED_DIR/app.env" ] && { printf '\n'; cat "$SHARED_DIR/app.env"; } >> "$RELEASE_ENV"
chmod 600 "$RELEASE_ENV"

cd "$RELEASE_DIR"
set -a; source "$RELEASE_ENV"; set +a

npm ci --include=dev

# Seed database if it's new (SQLite)
if [ ! -f "$SHARED_DIR/data/online360.db" ]; then
  echo "Database not found, seeding..."
  npm run seed
fi

npm run build
npm prune --omit=dev

ln -sfn "$RELEASE_DIR" "${APP_DIR}/current"

if pm2 describe "$APP_NAME" &>/dev/null; then
  pm2 restart "$APP_NAME" --update-env
else
  PORT="$APP_PORT" pm2 start npm --name "$APP_NAME" --cwd "${APP_DIR}/current" -- start
fi
pm2 save

for i in $(seq 1 15); do
  curl -sf -o /dev/null "http://127.0.0.1:${APP_PORT}/" && { echo "Health check passed"; break; }
  [ "$i" -eq 15 ] && { echo "Failed health check on ${APP_PORT}" >&2; pm2 logs "$APP_NAME" --lines 30 --nostream; exit 1; }
  sleep 2
done

rm -f "$ARCHIVE"
find "${APP_DIR}/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
  | sort -rn | awk 'NR>5{print $2}' | xargs -r rm -rf
echo "Deployed ${APP_NAME} @ ${SHA}"
