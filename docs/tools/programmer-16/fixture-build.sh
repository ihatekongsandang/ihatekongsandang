#!/usr/bin/env bash
# 프로그래머 16 — C11 옮긴 id 리다이렉트를 픽스처 포함 프로덕션 빌드로 시험한다(시험표 1~6·8~10, 7은 unit-checks.ts).
#
# 저장소 밖 임시 폴더에 작업 트리를 복사하고(node_modules는 심볼릭 링크, .git·.next·.env.local 제외)
# docs/tools/programmer-16/fixtures/의 게시물 2건(+영어본 1건)·moved-ids.txt·retired-ids 추가 줄을 그 사본에만 넣는다.
# 저장소의 content·public·.next는 건드리지 않는다. 사이트 주소는 예시 도메인으로 고정한다.
# 결과: 사본 빌드 → 127.0.0.1:3216에서 `next start` → curl -I 기록 + redirect-check.mjs
#
# 사용(저장소 루트): bash docs/tools/programmer-16/fixture-build.sh
set -euo pipefail
ROOT=$(pwd)
TOOL="$ROOT/docs/tools/programmer-16"
FIX="$TOOL/fixtures"
SITE=https://site.example.com
PORT=3216
WORK=$(mktemp -d)
SERVER=""
cleanup() { [ -n "$SERVER" ] && kill "$SERVER" 2>/dev/null; rm -rf "$WORK"; }
trap cleanup EXIT
DEST="$WORK/repo"
mkdir -p "$DEST"
rsync -a --exclude node_modules --exclude .next --exclude .git --exclude .env.local --exclude docs --exclude history "$ROOT/" "$DEST/"
ln -s "$ROOT/node_modules" "$DEST/node_modules"
cp "$FIX"/posts/*.md "$DEST/content/posts/"
cp "$FIX"/posts-en/*.md "$DEST/content/posts-en/"
cp "$FIX/moved-ids.txt" "$DEST/content/moved-ids.txt"
cat "$FIX/retired-append.txt" >> "$DEST/content/retired-ids.txt"
cd "$DEST"
echo "== 픽스처 포함 빌드 (게시물 $(ls content/posts | wc -l | tr -d ' ')건 · 영어본 $(ls content/posts-en | wc -l | tr -d ' ')건 · moved-ids 실제 줄 $(grep -cv '^\s*\(#\|$\)' content/moved-ids.txt)개)"
NEXT_PUBLIC_SITE_URL=$SITE NEXT_PUBLIC_GA_ID= npm run build > "$WORK/build.txt" 2>&1 || { tail -40 "$WORK/build.txt"; exit 1; }
grep -E "검사 파일|옮긴 id 목록|✅ 검증 통과|Generating static pages \([0-9]+/[0-9]+\)$" "$WORK/build.txt" | sed 's/\x1b\[[0-9;]*m//g' | tail -4 || true
npx next start -p $PORT > "$WORK/start.txt" 2>&1 &
SERVER=$!
for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 1; done
echo "== curl -I (첫 응답 머리만, 따라가지 않음)"
for p in /post/zz-fixture-old-a /en/post/zz-fixture-old-a /post/zz-fixture-old-b /en/post/zz-fixture-old-b \
         "/post/zz-fixture-old-a?utm_source=x" /post/zz-fixture-old-a/ /post/zz-fixture-moved-a /post/zz-fixture-nothing; do
  echo "-- curl -I $p"
  curl -s -I "http://127.0.0.1:$PORT$p" | tr -d '\r' | grep -i -E "^(HTTP/|location:)" || true
done
echo "== redirect-check"
node "$TOOL/redirect-check.mjs" "http://127.0.0.1:$PORT" "$DEST" "$SITE"
