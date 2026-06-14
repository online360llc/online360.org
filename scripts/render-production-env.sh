#!/usr/bin/env bash
set -euo pipefail

OUTPUT_PATH="${1:?output path required}"

install -m 600 /dev/null "$OUTPUT_PATH"

append_env() {
  local name="$1"
  local value="${!name:-}"
  [ -z "$value" ] && return
  local escaped
  printf -v escaped '%q' "$value"
  printf '%s=%s\n' "$name" "$escaped" >> "$OUTPUT_PATH"
}

# SMTP Configuration
append_env SMTP_HOST
append_env SMTP_PORT
append_env SMTP_SECURE
append_env SMTP_USER
append_env SMTP_PASSWORD
append_env SMTP_FROM
append_env SMTP_REPLY_TO

echo "Rendered $(grep -c '=' "$OUTPUT_PATH" || true) env vars to $OUTPUT_PATH"
