#!/usr/bin/env bash
# 프로그래머 16 — unit-checks.ts 양성 대조(돌연변이). moved-ids.ts의 규칙을 하나씩 끈 사본을 저장소 밖 임시 폴더에 만들고
# 같은 unit-checks.ts를 돌려 FAIL이 1건 이상 나오는지 본다(나오지 않으면 그 규칙을 시험이 잡지 못한다는 뜻).
# 사용(저장소 루트): bash docs/tools/programmer-16/mutation-check.sh
set -uo pipefail
ROOT=$(pwd)
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
MUTS=(
  "a 토큰 수|if (tokens.length !== 2) {|if (false) {"
  "b id 형식|if (!ID_PATTERN.test(id)) {|if (false) {"
  "c 자기 이동|if (from === to) {|if (false) {"
  "g 옛 id 중복|if (first !== undefined) {|if (false) {"
  "g 사슬|if (chained !== undefined) {|if (false) {"
  "d retired 등록|if (!ctx.retired.has(from)) {|if (false) {"
  "e 옛 게시물 남음|ctx.enIds.has(from) \|\| ctx.enFileNames|false \|\| ctx.enFileNames"  # 프로그래머 16-1: e 조건식이 바뀌어 치환 글자만 맞춤
  "f 새 게시물 없음|if (!ctx.koIds.has(to)) {|if (false) {"
  "f 새 id 폐기|if (ctx.retired.has(to)) {|if (false) {"
  "h 링크|if (link.test(file.text)) {|if (false) {"
  "h 절대 주소|new RegExp(\`/post/\${from}(?![A-Za-z0-9_-])\`)|new RegExp(\`(?:^\|[^A-Za-z0-9_-])(?:/en)?/post/\${from}(?![A-Za-z0-9_-])\`)"
  "i 이미지 참조|if (imageRef.test(file.text)) {|if (false) {"
  "i 이미지 폴더|if (ctx.imageDirExists(from)) {|if (false) {"
  "영어 분기|destination: translationIds.has(to) ? |destination: false ? "
  "번역 불일치|if (translationIds.has(to) !== validated.has(to)) {|if (false) {"
  "형식 오류 시 던짐|if (errors.length > 0) throw new Error|if (false) throw new Error"
)
total=0; caught=0
for m in "${MUTS[@]}"; do
  IFS='|' read -r name from to <<< "$(printf '%s' "$m" | sed 's/\\|/\x01/g')"
  from=$(printf '%s' "$from" | tr '\001' '|'); to=$(printf '%s' "$to" | tr '\001' '|')
  T="$WORK/t$total"; mkdir -p "$T/src/lib/content" "$T/docs/tools/programmer-16"
  cp "$ROOT"/src/lib/content/{moved-ids,retired-ids,schema}.ts "$T/src/lib/content/"; cp "$ROOT/src/lib/i18n.ts" "$T/src/lib/"
  cp "$ROOT/docs/tools/programmer-16/unit-checks.ts" "$T/docs/tools/programmer-16/"
  ln -s "$ROOT/node_modules" "$T/node_modules"
  FROM="$from" TO="$to" node -e '
    const fs=require("fs"); const f=process.argv[1]; const s=fs.readFileSync(f,"utf8");
    const n=s.split(process.env.FROM).length-1; if(n!==1){console.error("치환 대상 "+n+"곳: "+process.env.FROM);process.exit(3)}
    fs.writeFileSync(f,s.replace(process.env.FROM,process.env.TO))' "$T/src/lib/content/moved-ids.ts" || { echo "ERROR  $name — 치환 실패"; total=$((total+1)); continue; }
  out=$(npx tsx "$T/docs/tools/programmer-16/unit-checks.ts" 2>&1); fails=$(printf '%s\n' "$out" | grep -c '^FAIL')
  total=$((total+1)); [ "$fails" -gt 0 ] && caught=$((caught+1))
  echo "$([ "$fails" -gt 0 ] && echo 검출 || echo 놓침)  $name — FAIL ${fails}건 · 예: $(printf '%s\n' "$out" | grep -m1 '^FAIL' | cut -c1-110)"
done
echo "돌연변이 ${total}개 중 검출 ${caught}개"
[ "$caught" -eq "$total" ]
