#!/usr/bin/env bash
# 프로그래머 06-1 — 커밋 전 깨끗한 복제본 게이트.
#
# 사용: bash docs/tools/programmer-06-1/clean-clone-gate.sh [작업 폴더]
#   (작업 폴더 기본값: mktemp -d. 저장소 루트에서 실행)
#
# 작업 트리에서 "커밋될 파일"(추적 파일 + .gitignore에 걸리지 않는 미추적 파일)만 새 폴더로 복사하고,
# node_modules·.next·.env.local 없이 `npm ci` → validate → typecheck → lint → build를 돌린다.
# Vercel과 같게 VERCEL=1 · CI=1 · NEXT_PUBLIC_SITE_URL/GA_ID(더미 값)를 채운다.
# 스크래치 사본·기존 .next·로컬 전용 파일에 가려 운영 빌드만 깨지는 경우를 잡기 위한 것이다
# (06-1 원인: 리뷰 도중 추가된 docs/tools/**/*.tsx 가 어떤 게이트에도 들어가지 않은 채 커밋됨).
set -eu
ROOT=$(git rev-parse --show-toplevel)
WORK=${1:-$(mktemp -d)}
DEST="$WORK/repo"
rm -rf "$DEST" && mkdir -p "$DEST"
cd "$ROOT"
git ls-files -z --cached --others --exclude-standard | while IFS= read -r -d '' f; do
  [ -e "$f" ] || continue # 작업 트리에서 삭제된 추적 파일은 커밋에도 없다
  mkdir -p "$DEST/$(dirname "$f")" && cp -p "$f" "$DEST/$f"
done
cd "$DEST"
echo "복사 파일 수: $(find . -type f | wc -l | tr -d ' ') → $DEST"
npm ci --no-audit --no-fund --cache "$WORK/npm-cache" >/dev/null
export VERCEL=1 CI=1 NEXT_PUBLIC_SITE_URL=https://example.invalid NEXT_PUBLIC_GA_ID=G-TEST000000
# `cmd && echo` 형태는 set -e 가 실패를 무시한다 — 명령을 한 줄씩 둔다.
npm run -s typecheck
echo "✅ typecheck"
npm run -s lint
echo "✅ lint"
npm run build
echo "✅ build(validate 포함)"
echo "✅ 깨끗한 복제본 게이트 통과"
