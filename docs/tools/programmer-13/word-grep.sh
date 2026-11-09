#!/bin/sh
# 프로그래머 13 — 변경·신규 파일 전체에 저장소 독립 패턴 grep(+ 화면 문구가 바뀐 파일은 D6 자칭 금지어 9종).
# 실행(저장소 루트): sh docs/tools/programmer-13/word-grep.sh
# 저장소 독립 패턴은 로컬 pre-commit 훅 파일에서 읽는다(이 파일에 다른 서비스명을 적지 않기 위해). git 명령은 쓰지 않는다.
PAT=$(sed -n "s/^PATTERN='\(.*\)'$/\1/p" .git/hooks/pre-commit)
[ -n "$PAT" ] || { echo "FAIL 훅 패턴 읽기 실패"; exit 1; }
FILES='src/lib/content/schema.ts
src/lib/content/translation.ts
src/lib/i18n.ts
src/components/post-detail.tsx
scripts/check-hotlinks.ts
scripts/validate-content.ts
package.json'
echo "$FILES" | while IFS= read -r f; do
  printf '%s\t저장소독립\t%s\n' "$f" "$(grep -Eic -- "$PAT" "$f")"
done
for f in src/lib/i18n.ts src/components/post-detail.tsx; do
  for w in 기자 속보 본지 편집국 바이라인 reporter breaking newsroom byline; do
    printf '%s\t%s\t%s\n' "$f" "$w" "$(grep -ic -- "$w" "$f")"
  done
done
t=$(grep -rEic -- "$PAT" docs/tools/programmer-13 | awk -F: '{s+=$NF} END{print s+0}')
printf 'docs/tools/programmer-13/*\t저장소독립\t합계=%s\n' "$t"
# 홈 디렉터리 절대경로
# 홈 절대경로 패턴은 글자를 나눠 조합한다 — 이 파일 자체가 저장소 확장 grep에 걸리지 않게(리뷰 31 P3-9, 프로그래머 14-1).
HOMEPAT="/U""sers/|/h""ome/"
h=$(grep -rEc "$HOMEPAT" docs/tools/programmer-13 src scripts | awk -F: '{s+=$NF} END{print s+0}')
printf 'docs/tools/programmer-13 · src · scripts\t홈 절대경로\t합계=%s\n' "$h"
# 양성 대조: 훅 파일 자체에는 패턴이 걸려야 한다
printf '양성 대조(.git/hooks/pre-commit)\t%s\n' "$(grep -Eic -- "$PAT" .git/hooks/pre-commit)"
printf '홈 경로 패턴 양성 대조(조합 문자열)\t%s\n' "$(printf '%s\n' "/U""sers/x/y" | grep -Ec "$HOMEPAT")"
