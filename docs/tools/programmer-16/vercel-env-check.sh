#!/usr/bin/env bash
# 프로그래머 16 — redirects가 Vercel 조건(`VERCEL=1`) 밖에 있는지 빌드 산출물로 확인한다(리뷰 34 P3-3).
# 픽스처 사본(fixture-build.sh와 같은 구성)을 VERCEL=1과 VERCEL 없음으로 각각 빌드하고 `.next/routes-manifest.json`을 비교한다.
# 기대: 두 빌드 모두 사용자 리다이렉트 4개(308)가 같다. headers는 VERCEL 없음에서만 있고 VERCEL=1에서는 0개(기존 설계 그대로).
# 사용(저장소 루트): bash docs/tools/programmer-16/vercel-env-check.sh
set -euo pipefail
ROOT=$(pwd)
FIX="$ROOT/docs/tools/programmer-16/fixtures"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
for env in local vercel; do
  DEST="$WORK/$env"
  mkdir -p "$DEST"
  rsync -a --exclude node_modules --exclude .next --exclude .git --exclude .env.local --exclude docs --exclude history "$ROOT/" "$DEST/"
  ln -s "$ROOT/node_modules" "$DEST/node_modules"
  cp "$FIX"/posts/*.md "$DEST/content/posts/"; cp "$FIX"/posts-en/*.md "$DEST/content/posts-en/"
  cp "$FIX/moved-ids.txt" "$DEST/content/moved-ids.txt"; cat "$FIX/retired-append.txt" >> "$DEST/content/retired-ids.txt"
  if [ $env = vercel ]; then
    (cd "$DEST" && VERCEL=1 NEXT_PUBLIC_SITE_URL=https://site.example.com NEXT_PUBLIC_GA_ID= npx next build > "$WORK/$env.txt" 2>&1)
  else
    (cd "$DEST" && env -u VERCEL NEXT_PUBLIC_SITE_URL=https://site.example.com NEXT_PUBLIC_GA_ID= npx next build > "$WORK/$env.txt" 2>&1)
  fi
done
node -e '
const [a, b] = process.argv.slice(1).map((p) => require(p))
const user = (m) => m.redirects.filter((r) => !r.internal).map((r) => [r.source, r.destination, r.statusCode])
const ua = user(a), ub = user(b)
let fail = 0
const check = (label, ok, d = "") => { if (!ok) fail++; console.log(`${ok ? "PASS" : "FAIL"}  ${label}${d ? " — " + d : ""}`) }
check("VERCEL 없음: 사용자 리다이렉트 4개 · 308", ua.length === 4 && ua.every((r) => r[2] === 308), JSON.stringify(ua))
check("VERCEL=1: 사용자 리다이렉트 4개 · 308", ub.length === 4 && ub.every((r) => r[2] === 308), JSON.stringify(ub))
check("두 환경의 리다이렉트 규칙이 같다", JSON.stringify(ua) === JSON.stringify(ub))
check(`headers: VERCEL 없음 ${a.headers.length}개(>0) · VERCEL=1 ${b.headers.length}개(0) — 기존 설계 유지`, a.headers.length > 0 && b.headers.length === 0)
console.log(`합계 4건 · PASS ${4 - fail} · FAIL ${fail}`)
process.exit(fail ? 1 : 0)
' "$WORK/local/.next/routes-manifest.json" "$WORK/vercel/.next/routes-manifest.json"
