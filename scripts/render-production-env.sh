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

# Add app-specific secrets here if needed in the future
# append_env SOME_SECRET_KEY

echo "Rendered $(grep -c '=' "$OUTPUT_PATH" || true) env vars to $OUTPUT_PATH"
