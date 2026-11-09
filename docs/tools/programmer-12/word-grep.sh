#!/bin/sh
# 프로그래머 12 — 변경 파일의 D6 자칭 금지어 9종(리뷰어 26 목록)과 저장소 독립 패턴 grep.
# 실행(저장소 루트): sh docs/tools/programmer-12/word-grep.sh
# 저장소 독립 패턴은 로컬 pre-commit 훅에서 읽는다(이 파일에 다른 서비스명을 적지 않기 위해).
# 대상: 파일 전체 + `git diff -U0` 추가 줄. 추가로 docs/tools/programmer-12/ 산출물에 저장소 독립 패턴을 grep한다.
FILES='src/app/(ko)/terms/page.tsx
src/app/(en)/en/terms/page.tsx
src/app/(ko)/about/page.tsx
src/app/(en)/en/about/page.tsx
src/lib/config.ts'
PAT=$(sed -n "s/^PATTERN='\(.*\)'$/\1/p" .git/hooks/pre-commit)
[ -n "$PAT" ] || { echo "FAIL 훅 패턴 읽기 실패"; exit 1; }
total=0
echo "$FILES" | while IFS= read -r f; do
  for w in 기자 속보 본지 편집국 바이라인 reporter breaking newsroom byline; do
    a=$(grep -ic -- "$w" "$f"); d=$(git diff -U0 -- "$f" | grep -E '^\+' | grep -vE '^\+\+\+' | grep -ic -- "$w")
    printf '%s\t%s\t파일=%s\tdiff추가=%s\n' "$f" "$w" "$a" "$d"
  done
  i=$(grep -Eic -- "$PAT" "$f"); di=$(git diff -U0 -- "$f" | grep -E '^\+' | grep -vE '^\+\+\+' | grep -Eic -- "$PAT")
  printf '%s\t저장소독립\t파일=%s\tdiff추가=%s\n' "$f" "$i" "$di"
done
t=$(grep -rEic -- "$PAT" docs/tools/programmer-12 | awk -F: '{s+=$NF} END{print s+0}')
printf 'docs/tools/programmer-12/*\t저장소독립\t합계=%s\n' "$t"
