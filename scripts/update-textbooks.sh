#!/usr/bin/env bash
# Downloads textbook PDFs from Google Drive, and if any changed:
# commits, pushes, builds, and deploys the affected apps.
#
# Usage:
#   ./scripts/update-textbooks.sh          # check & update
#   ./scripts/update-textbooks.sh --dry    # check only, no commit/deploy

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DRY_RUN=false
[ "${1:-}" = "--dry" ] && DRY_RUN=true

LOG="$ROOT/scripts/.textbook-update.log"

log() {
  local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $*"
  echo "$msg"
  echo "$msg" >> "$LOG"
}

# format: app_name|local_path|google_drive_file_id
BOOKS="
nahw-navigator|public/textbooks/as-sugra.pdf|14t0lqM8w8QpHOBQLVDuxpwiqwQwxDq1C
nahw-navigator|public/textbooks/al-wusta.pdf|1juaVBJTUNrNkDx-vq2WANBfkqNghC0FM
nahw-navigator|public/textbooks/al-kubra.pdf|1II8dgGKfXvNtWlGcFtAEdxhPoBaQLwP0
nahw-navigator|public/textbooks/fstu-arabic.pdf|1dzueIyuTw9jW4k0Jzt4sb3Sk6cAVQ0T2
nahw-navigator|public/textbooks/fstu-nahw.pdf|1BdY0tAvoaKvJVUhmMQn09bxLh0fAXO03
sarf-exercises|public/textbook.pdf|19kCNLtds9ggGQCXoVLkf0AbE444q3OYB
fstu-exercises|public/textbook.pdf|1dzueIyuTw9jW4k0Jzt4sb3Sk6cAVQ0T2
"

updated_apps=""
updated_files=""
updated_count=0
failed_count=0

log "--- Checking textbooks ---"

for entry in $BOOKS; do
  app=$(echo "$entry" | cut -d'|' -f1)
  rel_path=$(echo "$entry" | cut -d'|' -f2)
  file_id=$(echo "$entry" | cut -d'|' -f3)
  target="$ROOT/apps/$app/$rel_path"
  label="$app: $(basename "$rel_path" .pdf)"
  tmp=$(mktemp)

  printf "  %-40s " "$label"

  if ! curl -sL "https://drive.google.com/uc?export=download&confirm=t&id=$file_id" -o "$tmp" 2>/dev/null; then
    echo "FAILED (download error)"
    rm -f "$tmp"
    failed_count=$((failed_count + 1))
    continue
  fi

  if ! head -c 5 "$tmp" | grep -q '%PDF'; then
    echo "FAILED (not a valid PDF)"
    rm -f "$tmp"
    failed_count=$((failed_count + 1))
    continue
  fi

  if [ -f "$target" ]; then
    old_hash=$(shasum -a 256 "$target" | cut -d' ' -f1)
    new_hash=$(shasum -a 256 "$tmp" | cut -d' ' -f1)

    if [ "$old_hash" = "$new_hash" ]; then
      echo "up to date"
      rm -f "$tmp"
      continue
    fi

    old_size=$(wc -c < "$target" | tr -d ' ')
    new_size=$(wc -c < "$tmp" | tr -d ' ')
    echo "UPDATED (${old_size} -> ${new_size} bytes)"
    log "  Updated: $label"
  else
    new_size=$(wc -c < "$tmp" | tr -d ' ')
    echo "NEW (${new_size} bytes)"
    log "  New: $label"
  fi

  if [ "$DRY_RUN" = false ]; then
    mkdir -p "$(dirname "$target")"
    mv "$tmp" "$target"
  else
    rm -f "$tmp"
  fi

  updated_files="$updated_files apps/$app/$rel_path"
  # Track unique app names
  case " $updated_apps " in
    *" $app "*) ;;
    *) updated_apps="$updated_apps $app" ;;
  esac
  updated_count=$((updated_count + 1))
done

echo ""

if [ $updated_count -eq 0 ]; then
  if [ $failed_count -gt 0 ]; then
    log "No updates. $failed_count download(s) failed."
  else
    log "All textbooks are up to date."
  fi
  exit 0
fi

log "$updated_count textbook(s) updated in:$updated_apps"

if [ "$DRY_RUN" = true ]; then
  echo "(dry run — no commit/deploy)"
  exit 0
fi

# Commit and push
cd "$ROOT"
log "Committing..."
git add $updated_files
git commit -m "chore: update textbook PDFs from Google Drive

Updated:$updated_apps"

log "Pushing..."
git push

# Build and deploy affected apps
for app in $updated_apps; do
  log "Building $app..."
  if npx turbo build --filter="@arabtools/$app" 2>&1 | tail -3; then
    log "Deploying $app..."
    bash "$ROOT/scripts/deploy.sh" "$app"
  else
    log "Build failed for $app, skipping deploy"
  fi
done

log "--- Done ---"
