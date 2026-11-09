#!/bin/sh
# 프로그래머 15 — 이 세션이 바꾸거나 만든 파일 전체에 저장소 독립 패턴 grep(+ 화면 문구 파일은 D6 자칭 금지어 9종) + 홈 절대경로.
# 실행(저장소 루트): sh docs/tools/programmer-15/word-grep.sh
# 저장소 독립 패턴은 로컬 pre-commit 훅 파일에서 읽는다(이 파일에 다른 서비스명을 적지 않기 위해). git 명령은 쓰지 않는다.
PAT=$(sed -n "s/^PATTERN='\(.*\)'$/\1/p" .git/hooks/pre-commit)
[ -n "$PAT" ] || { echo "FAIL 훅 패턴 읽기 실패"; exit 1; }
FILES='src/lib/content/schema.ts
src/components/card-media.tsx
src/components/post-detail.tsx
content/README.md
docs/tools/reviewer-32/validate-examples.ts
docs/tools/programmer-13/unit-checks.tsx
docs/tools/programmer-13/p11-build-check.mjs
docs/tools/programmer-13/hotlink-cases.mjs
docs/tools/programmer-13/figcaption-a11y.mjs
docs/tools/programmer-13/fixtures/posts/zz-fixture-news-image.md
docs/tools/programmer-13/fixtures/posts/zz-fixture-public-image.md
docs/tools/programmer-13/fixtures/posts-en/zz-fixture-news-image.md
docs/tools/programmer-13/fixtures/posts-en/zz-fixture-public-image.md
docs/tools/programmer-14-1/unit-checks.ts
docs/handoffs/programmer-15-image-caption-display-validation.md
docs/triggers/programmer-15-image-caption-display-validation-COMPLETE.md
instructions/programmer/processed/15-image-caption-display-validation.md'
total=0
for f in $FILES; do
  n=$(grep -Eic -- "$PAT" "$f")
  total=$((total + n))
  printf '%s\t저장소독립\t%s\n' "$f" "$n"
done
t=$(grep -rEic -- "$PAT" docs/tools/programmer-15 | awk -F: '{s+=$NF} END{print s+0}')
printf 'docs/tools/programmer-15/*(텍스트 파일 전부)\t저장소독립\t합계=%s\n' "$t"
# history는 이 세션 append 블록(마지막 "## [17:40] 프로그래머 15" 이후)만 본다.
hb=$(sed -n '/^## \[17:40\] 프로그래머 15/,$p' history/2026-11-09.md | grep -Eic -- "$PAT")
printf 'history/2026-11-09.md(이 세션 블록)\t저장소독립\t%s\n' "$hb"
for f in src/components/post-detail.tsx src/components/card-media.tsx; do
  for w in 기자 속보 본지 편집국 바이라인 reporter breaking newsroom byline; do
    printf '%s\t%s\t%s\n' "$f" "$w" "$(grep -ic -- "$w" "$f")"
  done
done
# 홈 절대경로 패턴은 글자를 나눠 조합한다 — 이 파일 자체가 확장 grep에 걸리지 않게(프로그래머 14-1 방식).
HOMEPAT="/U""sers/|/h""ome/"
h=$(grep -rEc "$HOMEPAT" docs/tools/programmer-15 src scripts content/README.md docs/handoffs/programmer-15-image-caption-display-validation.md docs/triggers/programmer-15-image-caption-display-validation-COMPLETE.md | awk -F: '{s+=$NF} END{print s+0}')
printf 'programmer-15·src·scripts·README·핸드오프·트리거\t홈 절대경로\t합계=%s\n' "$h"
printf '양성 대조(.git/hooks/pre-commit)\t%s\n' "$(grep -Eic -- "$PAT" .git/hooks/pre-commit)"
printf '홈 경로 패턴 양성 대조(조합 문자열)\t%s\n' "$(printf '%s\n' "/U""sers/x/y" | grep -Ec "$HOMEPAT")"
printf '변경 파일 합계\t%s\n' "$total"
