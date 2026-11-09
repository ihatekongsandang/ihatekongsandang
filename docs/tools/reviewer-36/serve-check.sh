#!/usr/bin/env bash
# 리뷰 36: 기존 .next(일반 빌드)를 next start -p 3916 으로 띄운 상태에서 실행. 빌드하지 않는다.
# 사용: bash docs/tools/reviewer-36/serve-check.sh http://127.0.0.1:3916
B="${1:-http://127.0.0.1:3916}"
pass=0; fail=0
chk() { if [ "$2" = "$3" ]; then echo "PASS  $1 ($2)"; pass=$((pass+1)); else echo "FAIL  $1 (받음 $2 · 기대 $3)"; fail=$((fail+1)); fi; }
code() { curl -s -o /dev/null -w '%{http_code}' "$B$1"; }
chk "/about 200" "$(code /about)" 200
chk "/en/about 200" "$(code /en/about)" 200
chk "/tags 200" "$(code /tags)" 200
FIRST_ID=$(ls content/posts | head -1 | sed 's/\.md$//')
chk "/post/<첫 게시물> 200" "$(code /post/$FIRST_ID)" 200
chk "/post/zz-no-such-id 404" "$(code /post/zz-no-such-id)" 404
chk "/en/post/zz-no-such-id 404" "$(code /en/post/zz-no-such-id)" 404
# 옛 #1 id(git 이력 HEAD~ 기준 retired-ids 에 있는 값)를 파일에 쓰지 않고 읽어 대조
OLD=$(grep -v '^#' content/retired-ids.txt | sed 's/#.*//' | awk 'NF' | grep -- '-sentencing$' | head -1)
if [ -n "$OLD" ]; then
  chk "옛 #1 /post/<옛> 지금 404(이전 전)" "$(code /post/$OLD)" 404
else
  # 아직 retired-ids 에 없으면 현 게시물로 살아 있다 — 이번 오더는 옮기지 않는다
  N=$(ls content/posts | grep -c -- '-sentencing\.md$')
  echo "NOTE  retired-ids 에 *-sentencing 없음 → #1 은 아직 이전 전(게시물 파일 *-sentencing.md ${N}개)"
  LIVE=$(ls content/posts | grep -- '-sentencing\.md$' | head -1 | sed 's/\.md$//')
  chk "#1 현 주소(이전 전) 200 · 리다이렉트 없음" "$(code /post/$LIVE)" 200
  chk "#1 현 영어 주소 200" "$(code /en/post/$LIVE)" 200
fi
# 화면 HTML만 센다: <script>…</script>(RSC 조각에 같은 글자가 한 번 더 들어 있다)를 지운 뒤 센다
strip() { perl -0pe 's#<script\b[^>]*>.*?</script>##gs'; }
H=$(curl -s "$B/about" | strip); E=$(curl -s "$B/en/about" | strip); T=$(curl -s "$B/tags" | strip)
c() { printf '%s' "$1" | grep -o "$2" | wc -l | tr -d ' '; }
chk "/about 썸네일 낱말 1회(SNS 줄 '이미지(썸네일)'뿐)" "$(c "$H" '썸네일')" 1
chk "/about '정리하기로 했으며' 1회" "$(c "$H" '정리하기로 했으며')" 1
chk "/about '현재 쓰는 사진은' 1회" "$(c "$H" '현재 쓰는 사진은')" 1
chk "/en/about 절 제목 1회" "$(c "$E" 'Quotes, images and copyright')" 1
chk "/en/about id=copyright 1회" "$(c "$E" 'id="copyright"')" 1
chk "/en/about 'thumbnail' 0회" "$(c "$E" 'thumbnail')" 0
chk "/tags <title> 전체 주제" "$(printf '%s' "$T" | grep -o '<title>[^<]*</title>' | grep -c '전체 주제')" 1
chk "/tags h1 전체 주제" "$(printf '%s' "$T" | grep -o '<h1[^>]*>[^<]*</h1>' | grep -c '전체 주제')" 1
chk "/tags aria-label 주제 목록" "$(c "$T" 'aria-label="주제 목록"')" 1
chk "/tags '태그' 0회" "$(c "$T" '태그')" 0
R=$(curl -s -o /dev/null -w '%{http_code}' -I "$B/post/$FIRST_ID/")
chk "끝 슬래시 /post/<id>/ → 308(내장 규칙)" "$R" 308
echo "합계 $((pass+fail))건 · PASS $pass · FAIL $fail"
