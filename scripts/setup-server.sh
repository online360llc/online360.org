#!/usr/bin/env bash
set -euo pipefail

APP_NAME="online360"
APP_DIR="/srv/apps/online360"
APP_PORT="3009"
APP_HOST="online360.org"

# ── 1. nvm + Node ──────────
export NVM_DIR="$HOME/.nvm"
if [ ! -f "$NVM_DIR/nvm.sh" ]; then
  echo "==> Installing nvm and Node LTS"
  curl -fsSL "https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh" | bash
  . "$NVM_DIR/nvm.sh"
  nvm install --lts && nvm alias default --lts
else
  . "$NVM_DIR/nvm.sh"
  echo "==> nvm already installed (Node $(node -v))"
fi

# ── 2. PM2 ──────────────────────────────────────────────────
if ! command -v pm2 &>/dev/null; then
  echo "==> Installing PM2"
  npm install -g pm2
else
  echo "==> PM2 already installed"
fi

# ── 3. App directories ────────────────────────────────────────────────────────
echo "==> Creating ${APP_DIR}"
if [ ! -d /srv/apps ] || [ ! -w /srv/apps ]; then
  sudo mkdir -p /srv/apps
  sudo chown "$USER:$USER" /srv/apps
fi
mkdir -p "${APP_DIR}/releases" "${APP_DIR}/shared/data"
chmod 750 "${APP_DIR}/shared"

# ── 4. runtime.env ────
RUNTIME_ENV="${APP_DIR}/shared/runtime.env"
if [ ! -f "$RUNTIME_ENV" ]; then
  echo "==> Writing ${RUNTIME_ENV}"
  install -m 600 /dev/null "$RUNTIME_ENV"
  cat > "$RUNTIME_ENV" <<EOF
PORT=${APP_PORT}
DATA_DIR=${APP_DIR}/shared/data
APP_URL=https://${APP_HOST}
NODE_ENV=production
EOF
else
  echo "==> ${RUNTIME_ENV} already exists, skipping"
fi

# ── 5. Caddy route (host ${APP_HOST} → 127.0.0.1:${APP_PORT}) ────────────────
CADDYFILE="/etc/caddy/Caddyfile"
if ! sudo -n true 2>/dev/null && ! [ -t 0 ]; then
  echo "==> Skipping Caddy update (sudo needs a password and no TTY available)."
  echo "    Run interactively instead:  ssh -t online360 'bash -s' < scripts/setup-server.sh"
  echo "    Or add this block manually inside the :8080 { } block of ${CADDYFILE}:"
  cat <<EOF

    @online360 host ${APP_HOST}
    handle @online360 {
        reverse_proxy 127.0.0.1:${APP_PORT}
    }

EOF
  echo "    then: sudo caddy validate --config ${CADDYFILE} && sudo systemctl reload caddy"
elif grep -q "$APP_HOST" "$CADDYFILE" 2>/dev/null; then
  echo "==> Caddy already routes ${APP_HOST}, skipping"
else
  echo "==> Adding ${APP_HOST} to ${CADDYFILE}"
  sudo cp "$CADDYFILE" "${CADDYFILE}.bak.online360"
  sudo awk -v host="$APP_HOST" -v port="$APP_PORT" '
    !inserted && /^[[:space:]]*handle[[:space:]]*\{[[:space:]]*$/ {
      print "    @online360 host " host
      print "    handle @online360 {"
      print "        reverse_proxy 127.0.0.1:" port
      print "    }"
      print ""
      inserted=1
    }
    { print }
  ' "$CADDYFILE" | sudo tee "${CADDYFILE}.online360.new" > /dev/null
  if sudo caddy validate --config "${CADDYFILE}.online360.new" >/dev/null 2>&1; then
    sudo mv "${CADDYFILE}.online360.new" "$CADDYFILE"
    sudo systemctl reload caddy
    echo "    Caddy updated and reloaded"
  else
    sudo rm -f "${CADDYFILE}.online360.new"
    echo "    !! Generated Caddyfile failed validation — add manually"
  fi
fi

echo "Bootstrap complete for online360."
