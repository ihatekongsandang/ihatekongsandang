#!/bin/sh
# 프로그래머 14 — 변경 파일 전체에 저장소 독립 패턴(pre-commit 훅에서 읽음) + D6 자칭 금지어 9종, 이 도구 폴더·홈 절대경로 grep.
# 실행(저장소 루트): sh docs/tools/programmer-14/word-grep.sh   (git 명령 안 씀)
PAT=$(sed -n "s/^PATTERN='\(.*\)'$/\1/p" .git/hooks/pre-commit)
[ -n "$PAT" ] || { echo "FAIL 훅 패턴 읽기 실패"; exit 1; }
FILES='src/app/globals.css
src/components/site-header.tsx
src/components/english-site-heading.tsx
src/components/page-frame.tsx
src/components/floating-banner.tsx
src/lib/floating-banner.ts
src/components/site-footer.tsx
src/components/feed-view.tsx
src/components/tag-nav.tsx
src/components/post-grid.tsx
src/components/post-card.tsx
src/components/card-media.tsx
src/components/pagination.tsx
src/components/post-detail.tsx
src/components/share-buttons.tsx
src/components/source-list.tsx
src/lib/i18n.ts
src/app/(ko)/about/page.tsx
src/app/(en)/en/about/page.tsx
src/app/(ko)/terms/page.tsx
src/app/(en)/en/terms/page.tsx
src/app/(ko)/tags/page.tsx
eslint.config.mjs'
n=0
echo "$FILES" | while IFS= read -r f; do
  i=$(grep -Eic -- "$PAT" "$f")
  w=0
  for x in 기자 속보 본지 편집국 바이라인 reporter breaking newsroom byline; do c=$(grep -ic -- "$x" "$f"); w=$((w + c)); done
  printf '%s\t저장소독립=%s\tD6금지어=%s\n' "$f" "$i" "$w"
done
printf '변경 파일 수\t%s\n' "$(echo "$FILES" | wc -l | tr -d ' ')"
t=$(grep -rEic --exclude=*.png -- "$PAT" docs/tools/programmer-14 | awk -F: '{s+=$NF} END{print s+0}')
printf 'docs/tools/programmer-14/*\t저장소독립 합계=%s\n' "$t"
# 홈 절대경로 패턴은 글자를 나눠 조합한다 — 이 파일 자체가 저장소 확장 grep에 걸리지 않게(리뷰 31 P3-9, 프로그래머 14-1).
HOMEPAT="/U""sers/|/h""ome/"
h=$(grep -rEc --exclude=*.png "$HOMEPAT" docs/tools/programmer-14 docs/tools/programmer-13 src scripts | awk -F: '{s+=$NF} END{print s+0}')
printf 'programmer-13·14 도구 · src · scripts\t홈 절대경로 합계=%s\n' "$h"
printf '양성 대조(.git/hooks/pre-commit)\t%s\n' "$(grep -Eic -- "$PAT" .git/hooks/pre-commit)"
printf '홈 경로 패턴 양성 대조(조합 문자열)\t%s\n' "$(printf '%s\n' "/U""sers/x/y" | grep -Ec "$HOMEPAT")"
