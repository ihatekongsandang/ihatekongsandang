#!/bin/sh
# 리뷰어 07 — 단일 스키마 게이트 오류 케이스 재현 (프로젝트 루트에서 실행)
#   sh docs/tools/reviewer-07/gate-cases.sh
# 임시 파일을 content/posts/에 만들고 `npm run validate:content` 종료코드·오류 메시지를 기록한 뒤 즉시 지운다.
# retired-ids.txt는 백업 후 원복. 실행 전후 `git status`가 같아야 한다.
# 케이스 7(폐기 ID를 검증 스크립트 없이 `npx next build`로 직행)은 별도 절차(README 참조).
set -u
P=content/posts
BAK=$(mktemp)
cp content/retired-ids.txt "$BAK"
run() {
  name="$1"; expect="$2"
  out=$(npm run validate:content 2>&1); code=$?
  err=$(printf '%s' "$out" | grep -E '✗|·' | grep -vE '^\s*$' | head -3 | tr '\n' ' ')
  if [ "$code" = "$expect" ]; then mark="OK"; else mark="MISMATCH"; fi
  printf '[%s] exit=%s (기대 %s) %s | %s\n' "$name" "$code" "$expect" "$mark" "$err"
}
URLBASE='publishedAt: 2026-09-01
sourceType: url
attribution: 테스트
sourceUrl: "https://example.com/t"'
PHOTOBASE='publishedAt: 2026-09-01
sourceType: photo
attribution: 테스트'
SRC='sources:
  - type: 언론
    name: 테스트
    url: "https://example.com/t"
    date: 2026-09-01'
IMG='images:
  - src: /images/example-case-b/scene-01.png
    alt: 테스트 이미지'

# ── 프로그래머 03 핸드오프 7케이스 중 검증기 케이스 6건 (7은 별도) ──
printf -- "---\nid: zz-g1\ntitle: t\ndescription: d\nstatus: 의혹\n%s\n---\n" "$URLBASE" > $P/zz-g1.md; run "1 status 잔존" 1; rm $P/zz-g1.md
printf -- "---\nid: zz-g2\ntitle: t\ndescription: d\nkind: statement\nstatementType: 발언\n%s\n---\n" "$URLBASE" > $P/zz-g2.md; run "2 kind·statementType 잔존" 1; rm $P/zz-g2.md
printf -- "---\nid: zz-g3\ntitle: t\ndescription: d\n%s\n%s\n---\n" "$PHOTOBASE" "$IMG" > $P/zz-g3.md; run "3 photo + sources 0" 1; rm $P/zz-g3.md
printf -- "---\nid: zz-g4\ntitle: t\n%s\n---\n" "$URLBASE" > $P/zz-g4.md; run "4 description 누락" 1; rm $P/zz-g4.md
printf -- "---\nid: example-case-b\ntitle: t\ndescription: d\n%s\n---\n" "$URLBASE" > $P/zz-g5.md; run "5 id 중복" 1; rm $P/zz-g5.md
printf -- "---\nid: zz-g6\ntitle: t\ndescription: d\n%s\n%s\nimages:\n  - src: /images/example-case-b/scene-01.png\n---\n" "$PHOTOBASE" "$SRC" > $P/zz-g6.md; run "6 alt 누락" 1; rm $P/zz-g6.md
echo "zz-retired-x" >> content/retired-ids.txt
printf -- "---\nid: zz-retired-x\ntitle: t\ndescription: d\n%s\n---\n" "$URLBASE" > $P/zz-g7.md; run "7a 폐기 ID (검증 스크립트)" 1; rm $P/zz-g7.md
cp "$BAK" content/retired-ids.txt
# ── 리뷰어 추가 케이스 ──
printf -- "---\nid: zz-g8\ntitle: t\ndescription: d\ncourtLevel: 1심\nstatusHistory:\n  - date: 2026-08-01\n    from: 의혹\n    to: 수사중\n%s\n---\n" "$URLBASE" > $P/zz-g8.md; run "8 courtLevel·statusHistory 잔존" 1; rm $P/zz-g8.md
printf -- "---\nid: zz-g9\ntitle: t\ndescription: d\ncloseureReasonTypo: x\nclosureReason: 무혐의\nclosureNote: n\npriorVerdict: p\n%s\n---\n" "$URLBASE" > $P/zz-g9.md; run "9 closureReason·closureNote·priorVerdict 잔존 (PRD §3.3은 오류 요구)" 1; rm $P/zz-g9.md
printf -- "---\nid: zz-g10\ntitle: t\ndescription: d\nspeaker:\n  name: 홍길동\n  publicFigure: true\n%s\n---\n" "$URLBASE" > $P/zz-g10.md; run "10 speaker.publicFigure (경고만 기대·통과)" 0; rm $P/zz-g10.md
printf -- "---\nid: zz-g11\ntitle: t\ndescription: d\nspeaker:\n  affiliation: 소속만\n%s\n---\n" "$URLBASE" > $P/zz-g11.md; run "11 speaker.name 누락" 1; rm $P/zz-g11.md
printf -- "---\nid: zz-g12\ntitle: t\ndescription: d\nsources: []\n%s\n---\n" "$URLBASE" > $P/zz-g12.md; run "12 url + sources 0 (통과 기대)" 0; rm $P/zz-g12.md
printf -- "---\nid: zz-g13\ntitle: t\ndescription: d\n%s\nsources:\n  - type: SNS\n    name: n\n    url: \"https://example.com\"\n    date: 2026-09-01\n---\n" "$URLBASE" > $P/zz-g13.md; run "13 sources.type 허용 외(SNS)" 1; rm $P/zz-g13.md
printf -- "---\nid: zz-g14\ntitle: t\ndescription: d\npublishedAt: 2026-09-01\nsourceType: photo_text\nattribution: a\n%s\n%s\n---\n" "$SRC" "$IMG" > $P/zz-g14.md; run "14 photo_text 본문 없음" 1; rm $P/zz-g14.md
printf -- "---\nid: zz-g15\ntitle: t\ndescription: d\nsourceType: url\npublishedAt: 2026-09-01\nattribution: a\n---\n" > $P/zz-g15.md; run "15 url + sourceUrl 누락" 1; rm $P/zz-g15.md
printf -- "---\nid: zz-g16\ntitle: t\ndescription: d\n%s\nspeaker: { name: \"@acct\", affiliation: 스레드 이용자 }\nog: { title: \"\", description: \"\", image: \"\", siteName: Threads }\nsources:\n  - { type: 언론, name: n, url: https://example.com/a, date: 2026-08-06 }\ntags: [태그a, 국방]\n---\n" "$URLBASE" > $P/zz-g16.md; run "16 초안 flow-style YAML (통과 기대)" 0; rm $P/zz-g16.md
printf -- "---\nid: zz-g17\ntitle: t\ndescription: d\n%s\n---\n\n<script>alert(1)</script>\n" "$URLBASE" > $P/zz-g17.md; run "17 본문 script" 1; rm $P/zz-g17.md
rm -f "$BAK"
echo "정리 확인:"; ls $P; git status --porcelain content/ | grep -v 'M content' || true
