#!/usr/bin/env bash
# 프로그래머 15 — 픽스처 포함 빌드로 C1(사진 설명 표시)·C7(깨짐 시 숨김)을 확인한다.
#
# 저장소 밖 임시 폴더에 작업 트리를 복사하고(node_modules는 심볼릭 링크, .git·.next·.env.local 제외)
# `docs/tools/programmer-13/fixtures/`의 news·public 픽스처 게시물(+영어본, 프로그래머 15에서 caption·imageCaption 추가)을
# 그 복사본의 content에만 넣어 프로덕션 빌드를 한 뒤 검사한다. 저장소의 content·public·.next는 건드리지 않는다.
#   1) programmer-13/p11-build-check.mjs  — 기존 P4·P6·P11 검사(OG·JSON-LD·sitemap에 픽스처 이미지 0 등)
#   2) programmer-15/caption-build-check.mjs — 사진 설명이 나오는 곳·나오지 않는 곳 전수
#   3) --serve: 그 빌드를 127.0.0.1:3215에 띄워 programmer-15/caption-browser.mjs(실브라우저)
#
# 사용(저장소 루트): bash docs/tools/programmer-15/fixture-build.sh [--serve]
set -euo pipefail
ROOT=$(pwd)
P13="$ROOT/docs/tools/programmer-13"
TOOL="$ROOT/docs/tools/programmer-15"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
DEST="$WORK/repo"
mkdir -p "$DEST"
rsync -a --exclude node_modules --exclude .next --exclude .git --exclude .env.local "$ROOT/" "$DEST/"
ln -s "$ROOT/node_modules" "$DEST/node_modules"
cp "$P13"/fixtures/posts/*.md "$DEST/content/posts/"
cp "$P13"/fixtures/posts-en/*.md "$DEST/content/posts-en/"
mkdir -p "$DEST/public/images/zz-fixture-public-image"
FIRST_IMAGE=$(find "$ROOT/public/images" -name '*.jpg' -print -quit)
cp "$FIRST_IMAGE" "$DEST/public/images/zz-fixture-public-image/thumb.jpg"
cd "$DEST"
echo "== 픽스처 포함 빌드 (게시물 $(ls content/posts | wc -l | tr -d ' ')건 · 영어본 $(ls content/posts-en | wc -l | tr -d ' ')건)"
NEXT_PUBLIC_SITE_URL=https://site.example.com npm run build > "$WORK/build.txt" 2>&1 || { tail -40 "$WORK/build.txt"; exit 1; }
grep -E "검사 파일|대표 이미지 종류|✅ 검증 통과|Generating static pages \(" "$WORK/build.txt" | sed 's/\x1b\[[0-9;]*m//g' | grep -v "Generating static pages ([0-9]*/[0-9]*) *$" || true
echo "== 1) programmer-13 p11-build-check"
node "$P13/p11-build-check.mjs" "$DEST/.next/server/app"
echo "== 2) programmer-15 caption-build-check"
node "$TOOL/caption-build-check.mjs" "$DEST/.next/server/app"
if [ "${1:-}" = "--serve" ]; then
  npx next start -p 3215 > "$WORK/start.txt" 2>&1 &
  SERVER=$!
  trap 'kill $SERVER 2>/dev/null; rm -rf "$WORK"' EXIT
  for _ in $(seq 1 60); do curl -s -o /dev/null http://127.0.0.1:3215/ && break; sleep 1; done
  cd "$ROOT"
  echo "== 3) programmer-15 caption-browser"
  node "$TOOL/caption-browser.mjs" http://127.0.0.1:3215 "$TOOL/screens"
fi
