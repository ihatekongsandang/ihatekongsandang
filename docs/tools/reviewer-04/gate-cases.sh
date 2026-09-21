#!/bin/sh
# 리뷰어 04 — 콘텐츠 검증 게이트 오류 케이스 재현 스크립트 (프로젝트 루트에서 실행)
#   sh docs/tools/reviewer-04/gate-cases.sh
# 임시 파일을 content/posts/에 만들고 `npm run validate:content`의 종료코드를 기록한 뒤 즉시 지운다.
# retired-ids.txt는 백업 후 원복한다. 실행 전후 `git status`가 같아야 한다.
set -u
P=content/posts
BAK=$(mktemp)
cp content/retired-ids.txt "$BAK"
run() {
  name="$1"
  out=$(npm run validate:content 2>&1); code=$?
  err=$(printf '%s' "$out" | grep -E '✗' | head -2 | tr '\n' ' ')
  printf '[%s] exit=%s | %s\n' "$name" "$code" "$err"
}
BASE='publishedAt: 2026-09-01
sourceType: url
attribution: 테스트
sources:
  - type: 언론
    name: 테스트
    url: "https://example.com/t"
    date: 2026-09-01
sourceUrl: "https://example.com/t"'

printf -- "---\nid: zz-test-1\ndescription: d\nstatus: 의혹\n%s\n---\n" "$BASE" > $P/zz-test-1.md; run "1 필수 누락(title)"; rm $P/zz-test-1.md
printf -- "---\nid: zz-test-2\ntitle: t\ndescription: d\nstatus: 확정\n%s\n---\n" "$BASE" > $P/zz-test-2.md; run "2 enum 외(status: 확정)"; rm $P/zz-test-2.md
printf -- "---\nid: example-case-a\ntitle: t\ndescription: d\nstatus: 의혹\n%s\n---\n" "$BASE" > $P/zz-test-3.md; run "3 id 중복"; rm $P/zz-test-3.md
printf -- "---\nid: zz-test-4\ntitle: t\ndescription: d\nstatus: 의혹\npublishedAt: 2026-09-01\nsourceType: photo\nattribution: a\nsources:\n  - type: 언론\n    name: n\n    url: \"https://example.com/t\"\n    date: 2026-09-01\nimages:\n  - src: /images/example-case-b/scene-01.png\n---\n" > $P/zz-test-4.md; run "4 alt 누락"; rm $P/zz-test-4.md
echo "zz-retired-id" >> content/retired-ids.txt
printf -- "---\nid: zz-retired-id\ntitle: t\ndescription: d\nstatus: 의혹\n%s\n---\n" "$BASE" > $P/zz-test-5.md; run "5 폐기 ID 재사용"; rm $P/zz-test-5.md
cp "$BAK" content/retired-ids.txt
printf -- "---\nid: zz-test-6\ntitle: t\ndescription: d\nstatus: 유죄판결\n%s\n---\n" "$BASE" > $P/zz-test-6.md; run "6 유죄판결 심급 누락"; rm $P/zz-test-6.md
printf -- "---\nid: zz-test-7\ntitle: t\ndescription: d\nstatus: 의혹\npublishedAt: 2026-09-01\nsourceType: url\nattribution: a\nsources: []\nsourceUrl: \"https://example.com/t\"\n---\n" > $P/zz-test-7.md; run "7 sources 0건"; rm $P/zz-test-7.md
printf -- "---\nid: zz-test-8\ntitle: t\ndescription: d\nstatus: 의혹\n%s\n---\n\n<script>alert(1)</script>\n" "$BASE" > $P/zz-test-8.md; run "8 본문 script"; rm $P/zz-test-8.md
printf -- "---\nid: zz-test-9\ntitle: t\ndescription: d\nstatus: 기소\nstatusHistory:\n  - date: 2026-08-01\n    from: 의혹\n    to: 수사중\n%s\n---\n" "$BASE" > $P/zz-test-9.md; run "9 statusHistory 마지막 to≠status"; rm $P/zz-test-9.md
printf -- "---\nid: zz-test-10\ntitle: t\ndescription: d\nstatus: 의혹\nuseSourceImage: true\n%s\n---\n" "$BASE" > $P/zz-test-10.md; run "10 useSourceImage true + og.image 없음"; rm $P/zz-test-10.md
printf -- "---\nid: zz-test-11\ntitle: t\ndescription: d\nstatus: 의혹\n%s\nog:\n  image: \"http://example.com/x.png\"\n---\n" "$BASE" > $P/zz-test-11.md; run "11 og.image http"; rm $P/zz-test-11.md
printf -- "---\nid: ZZ_Test\ntitle: t\ndescription: d\nstatus: 의혹\n%s\n---\n" "$BASE" > $P/zz-test-12.md; run "12 id 대문자/언더스코어"; rm $P/zz-test-12.md
printf -- "---\nid: zz-test-13\ntitle: t\ndescription: d\nstatus: 의혹\ncourtLevel: 1심\n%s\n---\n" "$BASE" > $P/zz-test-13.md; run "13 의혹 + courtLevel"; rm $P/zz-test-13.md
printf -- "---\nid: zz-test-14\ntitle: t\ndescription: d\nstatus: 유죄판결\ncourtLevel: 1심\nstatusHistory:\n  - date: 2026-08-01\n    from: 유죄판결\n    to: 기소\n  - date: 2026-08-02\n    from: 기소\n    to: 유죄판결\n%s\n---\n" "$BASE" > $P/zz-test-14.md; run "14 역방향 전이 허용(통과 기대)"; rm $P/zz-test-14.md
printf -- "---\nid: zz-test-15\ntitle: t\ndescription: d\nstatus: 종결\nclosureReason: 무혐의\n%s\n---\n" "$BASE" > $P/zz-test-15.md; run "15 미지 필드(경고만, 통과 기대)"; rm $P/zz-test-15.md
printf -- "---\nid: zz-test-16\ntitle: t\ndescription: d\nstatus: 의혹\npublishedAt: 2026-09-01\nsourceType: photo\nattribution: a\nsources:\n  - type: 언론\n    name: n\n    url: \"https://example.com/t\"\n    date: 2026-09-01\nimages:\n  - src: /images/nope/x.png\n    alt: a\n---\n" > $P/zz-test-16.md; run "16 이미지 파일 부재"; rm $P/zz-test-16.md
printf -- "---\nid: zz-test-17\ntitle: t\ndescription: d\nstatus: 의혹\npublishedAt: 2026-09-01\nsourceType: photo\nattribution: a\nsources:\n  - type: 언론\n    name: n\n    url: \"https://example.com/t\"\n    date: 2026-09-01\nimages:\n  - src: /images/../../etc/passwd\n    alt: a\n---\n" > $P/zz-test-17.md; run "17 이미지 경로 ../"; rm $P/zz-test-17.md
printf -- "---\nid: zz-test-18\ntitle: t\ndescription: d\nstatus: 의혹\n%s\n---\n\n<img src=x onerror=alert(1)>\n" "$BASE" > $P/zz-test-18.md; run "18 본문 img onerror(검증 통과 → sanitize 몫)"; rm $P/zz-test-18.md
rm -f "$BAK"
echo "정리 확인:"; ls $P
