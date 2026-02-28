#!/usr/bin/env bash
set -euo pipefail

# Load env variables
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

if [ -f "$ROOT_DIR/.env" ]; then
  export $(grep -v '^#' "$ROOT_DIR/.env" | xargs)
fi

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] || [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  echo "Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set in .env"
  exit 1
fi

# App name → Cloudflare project name mapping (all follow cstools-<app> pattern)
get_project_name() {
  echo "cstools-$1"
}

# All known apps
ALL_APPS="hub algo-viz dsa-drills system-design complexity-atlas ddia networking leetcode-guide"

deploy_app() {
  local app=$1
  local project
  project=$(get_project_name "$app")
  local dist="$ROOT_DIR/apps/$app/dist"
  if [ ! -d "$dist" ]; then
    echo "SKIP $app (no dist/ — run 'npm run build' first)"
    return 1
  fi
  echo -n "Deploying $app... "
  local output
  output=$(npx wrangler pages deploy "$dist" --project-name="$project" --commit-dirty=true 2>&1)
  if echo "$output" | grep -q "Deployment complete"; then
    local url
    url=$(echo "$output" | grep -oE 'https://[^ ]+\.pages\.dev')
    echo "OK $url"
  else
    echo "FAILED"
    echo "$output" | tail -5
    return 1
  fi
}

# Main
if [ $# -eq 0 ]; then
  echo "Deploying all apps..."
  succeeded=0
  failed=0
  for app in $ALL_APPS; do
    if deploy_app "$app"; then
      ((succeeded++))
    else
      ((failed++))
    fi
  done
  echo ""
  echo "Done: $succeeded succeeded, $failed failed"
else
  for app in "$@"; do
    deploy_app "$app"
  done
fi
