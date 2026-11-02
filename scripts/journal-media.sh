#!/usr/bin/env bash
# Usage: scripts/journal-media.sh <project> <month-slug> <image-or-video>...
# Converts images to WebP (max 800 px wide, 1400 px for names containing "wide")
# and videos to H.264 faststart MP4, into public/<project>/blog/<month-slug>/.
# Prints a `photo("name", width, height, ...)` stub for each file.
set -euo pipefail

cd "$(dirname "$0")/.."
project="$1"; month="$2"; shift 2
out="public/$project/blog/$month"
mkdir -p "$out"

for source in "$@"; do
  file="$(basename "$source")"
  name="$(printf '%s' "${file%.*}" | tr '[:upper:] _' '[:lower:]--')"
  case "${file##*.}" in
    mp4|mov|MP4|MOV)
      ffmpeg -hide_banner -loglevel error -y -i "$source" -map 0:v:0 -an -vf 'fps=30,scale=720:-2' \
        -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart "$out/$name.mp4"
      ffmpeg -hide_banner -loglevel error -y -ss 0.1 -i "$source" -frames:v 1 -vf 'scale=720:-2' -update 1 "$out/$name-poster.png"
      cwebp -quiet -q 82 "$out/$name-poster.png" -o "$out/$name-poster.webp" && rm "$out/$name-poster.png"
      echo "video  $name  ->  $out/$name.mp4 + $out/$name-poster.webp";;
    *)
      width=800; [[ "$name" == *wide* ]] && width=1400
      cwebp -quiet -q 82 -resize "$width" 0 -metadata none "$source" -o "$out/$name.webp"
      w=$(sips -g pixelWidth "$out/$name.webp" | awk '/pixelWidth/ {print $2}')
      h=$(sips -g pixelHeight "$out/$name.webp" | awk '/pixelHeight/ {print $2}')
      echo "photo(\"$name\", $w, $h, \"ALT\", \"CAPTION\"),";;
  esac
done
