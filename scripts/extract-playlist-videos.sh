#!/usr/bin/env bash
# extract-playlist-videos.sh
# Extracts all video URLs from @AlQalamInstitute YouTube playlists into structured JSON.
# Requires: yt-dlp, jq

set -uo pipefail

YT_DLP="/opt/homebrew/bin/yt-dlp"
CHANNEL_PLAYLISTS_URL="https://www.youtube.com/@AlQalamInstitute/playlists"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_DIR="$REPO_ROOT/data/playlists"

# Known playlists from docs/course-viewer-urls.md (may be unlisted)
KNOWN_PLAYLISTS=(
  "PLzn0qdi6JpdtYROmDjASD8rHQm7kowfLi"
  "PLzn0qdi6JpdsVT-ifoh8k7M1WOgrENMxL"
  "PLzn0qdi6JpdtSwrn6_pARHYcxsdLzzTN1"
  "PLzn0qdi6JpdtQWS7sMqf1Dn_NHoEldir7"
)

# --- Helpers ---

log() { echo "[$(date '+%H:%M:%S')] $*"; }

# --- Step 1: Discover playlists from channel ---

log "Scanning channel for public playlists..."
CHANNEL_PLAYLIST_IDS=()

while IFS= read -r line; do
  pid=$(echo "$line" | jq -r '.id // empty' 2>/dev/null)
  if [[ -n "$pid" ]]; then
    CHANNEL_PLAYLIST_IDS+=("$pid")
  fi
done < <("$YT_DLP" --flat-playlist --dump-json "$CHANNEL_PLAYLISTS_URL" 2>/dev/null || true)

log "Found ${#CHANNEL_PLAYLIST_IDS[@]} playlists from channel."

# --- Step 2: Merge known playlists and deduplicate ---

ALL_IDS=()

is_seen() {
  local needle="$1"
  if [[ ${#ALL_IDS[@]} -eq 0 ]]; then
    return 1
  fi
  for item in "${ALL_IDS[@]}"; do
    [[ "$item" == "$needle" ]] && return 0
  done
  return 1
}

for pid in "${CHANNEL_PLAYLIST_IDS[@]}"; do
  if ! is_seen "$pid"; then
    ALL_IDS+=("$pid")
  fi
done

for pid in "${KNOWN_PLAYLISTS[@]}"; do
  if ! is_seen "$pid"; then
    ALL_IDS+=("$pid")
    log "Added known (possibly unlisted) playlist: $pid"
  fi
done

log "Total unique playlists to process: ${#ALL_IDS[@]}"

# --- Step 3: Extract videos from each playlist ---

mkdir -p "$OUTPUT_DIR"

PROCESSED=0
SKIPPED=0

for pid in "${ALL_IDS[@]}"; do
  PLAYLIST_URL="https://www.youtube.com/playlist?list=$pid"
  log "Processing playlist $pid ..."

  # Write raw yt-dlp output to a temp file to avoid shell variable size limits
  TMPFILE=$(mktemp)
  "$YT_DLP" --flat-playlist --dump-json "$PLAYLIST_URL" > "$TMPFILE" 2>/dev/null || true

  if [[ ! -s "$TMPFILE" ]]; then
    log "  WARNING: No data returned for $pid — skipping."
    rm -f "$TMPFILE"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Extract playlist title from the first entry
  PLAYLIST_TITLE=$(head -1 "$TMPFILE" | jq -r '.playlist_title // "Unknown"' 2>/dev/null || echo "Unknown")
  EXTRACTED_AT=$(date -u '+%Y-%m-%dT%H:%M:%SZ')

  # Build the complete playlist JSON in one jq pass:
  # - slurp all entries
  # - transform each into our format with sequential index
  if ! jq -s --arg pid "$pid" \
    --arg title "$PLAYLIST_TITLE" \
    --arg url "$PLAYLIST_URL" \
    --arg ts "$EXTRACTED_AT" \
    '{
      playlistId: $pid,
      playlistTitle: $title,
      playlistUrl: $url,
      extractedAt: $ts,
      videoCount: length,
      videos: [to_entries[] | {
        index: (.key + 1),
        videoId: (.value.id // ""),
        title: (.value.title // ""),
        url: ("https://www.youtube.com/watch?v=" + (.value.id // "")),
        duration: (.value.duration // 0)
      }]
    }' "$TMPFILE" > "$OUTPUT_DIR/$pid.json" 2>/dev/null; then
    log "  WARNING: jq failed for $pid — skipping."
    rm -f "$TMPFILE" "$OUTPUT_DIR/$pid.json"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  VIDEO_COUNT=$(jq '.videoCount' "$OUTPUT_DIR/$pid.json")
  rm -f "$TMPFILE"

  log "  Saved $VIDEO_COUNT videos → $OUTPUT_DIR/$pid.json"
  PROCESSED=$((PROCESSED + 1))
done

# --- Step 4: Generate index.json manifest ---

log "Building index.json manifest..."

# Collect manifest from all written JSON files (excluding index.json itself)
MANIFEST=$(
  for f in "$OUTPUT_DIR"/PL*.json; do
    [[ -f "$f" ]] || continue
    jq '{
      playlistId: .playlistId,
      playlistTitle: .playlistTitle,
      playlistUrl: .playlistUrl,
      videoCount: .videoCount
    }' "$f"
  done | jq -s 'sort_by(.playlistTitle)'
)

TOTAL_PLAYLISTS=$(echo "$MANIFEST" | jq 'length')
TOTAL_VIDEOS=$(echo "$MANIFEST" | jq '[.[].videoCount] | add // 0')

jq -n \
  --arg ts "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" \
  --argjson playlists "$MANIFEST" \
  --argjson totalPlaylists "$TOTAL_PLAYLISTS" \
  --argjson totalVideos "$TOTAL_VIDEOS" \
  '{
    extractedAt: $ts,
    totalPlaylists: $totalPlaylists,
    totalVideos: $totalVideos,
    playlists: $playlists
  }' > "$OUTPUT_DIR/index.json"

log "Manifest written → $OUTPUT_DIR/index.json"
log "Done! $PROCESSED playlists processed, $SKIPPED skipped, $TOTAL_VIDEOS total videos."
