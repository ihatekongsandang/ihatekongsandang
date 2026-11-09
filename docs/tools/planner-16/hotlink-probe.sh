#!/bin/bash
# 기획자 16: 인스타그램 임베드가 내주는 이미지 주소를 외부 Referer로 요청해 응답 코드·만료 표식을 기록한다.
# 사용: bash docs/tools/planner-16/hotlink-probe.sh <작업폴더(저장소 밖)> <게시물코드>...
# 요청 사이 2초 간격. UA는 "Mozilla/5.0" 그대로(guide §3). 받은 파일은 작업폴더에만 두고 데이터로만 다룬다.
# 주의: 이미지 주소는 서명된 임시 주소다 — 작업폴더 밖(저장소 안)에 복사하지 않는다.
set -u
dir="$1"; shift
mkdir -p "$dir"
for code in "$@"; do
  page="$dir/ig-$code.html"
  curl -sL -A "Mozilla/5.0" -m 20 -o "$page" -w "$code embed http=%{http_code} size=%{size_download}\n" "https://www.instagram.com/p/$code/embed/captioned/"
  sleep 2
  url=$(grep -o '<img[^>]*EmbeddedMediaImage[^>]*>' "$page" | grep -o 'src="[^"]*"' | head -1 | sed 's/^src="//;s/"$//;s/&amp;/\&/g')
  [ -z "$url" ] && { echo "$code: 이미지 주소 없음"; continue; }
  printf '%s\n' "$url" > "$dir/url-$code.txt"
  oe=$(printf '%s' "$url" | sed -nE 's/.*[?&]oe=([0-9A-Fa-f]+).*/\1/p')
  [ -n "$oe" ] && echo "$code: 호스트=$(printf '%s' "$url" | sed -E 's#https?://([^/]+)/.*#\1#') 만료표식 oe=$oe -> $(date -u -r $((16#$oe)) +%FT%TZ)"
  curl -s -A "Mozilla/5.0" -e "https://example.org/" -m 20 -D "$dir/hdr-$code.txt" -o "$dir/img-$code.bin" -w "$code image(외부 Referer) http=%{http_code} ct=%{content_type} size=%{size_download}\n" "$url"
  sleep 2
done
