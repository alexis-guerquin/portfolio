#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Keep the original recordings; generate web-friendly versions and previews.
for source in public/focus-train/*.mov public/pocha/*.mov; do
  output="${source%.mov}"
  ffmpeg -hide_banner -loglevel error -y -i "$source" \
    -map 0:v:0 -an -vf 'fps=30,scale=720:-2' \
    -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
    -movflags +faststart "${output}.mp4"
  ffmpeg -hide_banner -loglevel error -y -ss 0.1 -i "$source" \
    -frames:v 1 -vf 'scale=480:-2' -q:v 3 -update 1 \
    "${output}-poster.jpg"
done
