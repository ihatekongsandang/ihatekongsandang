#!/usr/bin/env bash
# 프로그래머 13 — P4·P6·P11 빌드 통합 검사.
#
# 저장소 밖 임시 폴더에 작업 트리를 복사하고(node_modules는 심볼릭 링크, .git·.next 제외)
# `fixtures/`의 news·public 픽스처 게시물(+영어본)을 그 복사본의 content에만 넣어 프로덕션 빌드를 한 뒤,
# `p11-build-check.mjs`로 빌드 결과(HTML·sitemap.xml·RSC)를 검사한다. 저장소의 content·public·.next는 건드리지 않는다.
#
# 사용(저장소 루트): bash docs/tools/programmer-13/p11-build-check.sh [--serve]
#   --serve: 검사 뒤 그 빌드를 127.0.0.1:3213에 띄워 `figcaption-a11y.mjs`(실브라우저 대비·링크 이름·화면)를 돌린다.
set -euo pipefail
ROOT=$(pwd)
TOOL="$ROOT/docs/tools/programmer-13"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
DEST="$WORK/repo"
mkdir -p "$DEST"
rsync -a --exclude node_modules --exclude .next --exclude .git --exclude .env.local "$ROOT/" "$DEST/"
ln -s "$ROOT/node_modules" "$DEST/node_modules"
cp "$TOOL"/fixtures/posts/*.md "$DEST/content/posts/"
cp "$TOOL"/fixtures/posts-en/*.md "$DEST/content/posts-en/"
# public 픽스처 이미지: 저장소에 이미 있는 자체 이미지 하나를 복사본 안에서만 그 경로로 복사한다.
mkdir -p "$DEST/public/images/zz-fixture-public-image"
FIRST_IMAGE=$(find "$ROOT/public/images" -name '*.jpg' -print -quit)
cp "$FIRST_IMAGE" "$DEST/public/images/zz-fixture-public-image/thumb.jpg"
cd "$DEST"
echo "== 픽스처 포함 빌드 (게시물 $(ls content/posts | wc -l | tr -d ' ')건 · 영어본 $(ls content/posts-en | wc -l | tr -d ' ')건)"
NEXT_PUBLIC_SITE_URL=https://site.example.com npm run build > "$WORK/build.txt" 2>&1 || { tail -40 "$WORK/build.txt"; exit 1; }
grep -E "검사 파일|대표 이미지 종류|✅ 검증 통과|Generating static pages" "$WORK/build.txt" | sed 's/\x1b\[[0-9;]*m//g'
node "$TOOL/p11-build-check.mjs" "$DEST/.next/server/app"
if [ "${1:-}" = "--serve" ]; then
  npx next start -p 3213 > "$WORK/start.txt" 2>&1 &
  SERVER=$!
  trap 'kill $SERVER 2>/dev/null; rm -rf "$WORK"' EXIT
  for _ in $(seq 1 60); do curl -s -o /dev/null http://127.0.0.1:3213/ && break; sleep 1; done
  cd "$ROOT"
  node "$TOOL/figcaption-a11y.mjs" http://127.0.0.1:3213 "$TOOL/screens-figcaption"
fi
