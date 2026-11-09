#!/usr/bin/env bash
# 프로그래머 15 — C2: caption이 없는 public·news 게시물(또는 imageCaption 없는 영어본)이 있으면 `npm run build`가 실패하는지 확인한다.
#
# 사례마다 작업 트리를 저장소 밖 임시 폴더에 새로 복사하고(node_modules 링크, .git·.next·.env.local 제외)
# `fixtures-fail/`의 픽스처 하나(+ 필요한 영어본)만 넣어 실제 `npm run build`(prebuild = validate:content)를 돌린다.
# 기대: 종료 코드 ≠ 0, 기대 오류 문장 1줄 이상, 그 복사본에 `.next` 빌드 결과(BUILD_ID) 없음. 대조로 정상 픽스처(caption 있음)는 검증 통과.
# 저장소의 content·.next는 건드리지 않는다. 사용(저장소 루트): bash docs/tools/programmer-15/build-fail.sh
set -uo pipefail
ROOT=$(pwd)
P13="$ROOT/docs/tools/programmer-13"
FX="$ROOT/docs/tools/programmer-15/fixtures-fail"
PASS=0
FAIL=0
result() { if [ "$1" = ok ]; then PASS=$((PASS + 1)); echo "PASS  $2"; else FAIL=$((FAIL + 1)); echo "FAIL  $2"; fi; }

run_case() {
  local label=$1 post=$2 en=$3 expect=$4 want_exit=$5
  local work
  work=$(mktemp -d)
  mkdir -p "$work/repo"
  rsync -a --exclude node_modules --exclude .next --exclude .git --exclude .env.local "$ROOT/" "$work/repo/"
  ln -s "$ROOT/node_modules" "$work/repo/node_modules"
  cp "$post" "$work/repo/content/posts/"
  [ -n "$en" ] && cp "$en" "$work/repo/content/posts-en/"
  mkdir -p "$work/repo/public/images/zz-fixture-public-image"
  cp "$(find "$ROOT/public/images" -name '*.jpg' -print -quit)" "$work/repo/public/images/zz-fixture-public-image/thumb.jpg"
  local code
  if [ "$want_exit" = fail ]; then
    (cd "$work/repo" && NEXT_PUBLIC_SITE_URL=https://site.example.com npm run build > "$work/out.txt" 2>&1)
  else
    (cd "$work/repo" && npm run -s validate:content > "$work/out.txt" 2>&1)
  fi
  code=$?
  local hits
  hits=$(sed 's/\x1b\[[0-9;]*m//g' "$work/out.txt" | grep -cF -- "$expect")
  echo "== $label: 종료 코드 ${code} · 기대 문장 ${hits}줄"
  sed 's/\x1b\[[0-9;]*m//g' "$work/out.txt" | grep -F -- "$expect" | head -2 | sed 's/^/    /'
  if [ "$want_exit" = fail ]; then
    [ "$code" -ne 0 ] && result ok "$label: npm run build 실패(종료 코드 ${code})" || result no "$label: npm run build가 성공함"
    [ "$hits" -ge 1 ] && result ok "$label: 오류 문장 출력" || result no "$label: 기대 오류 문장 없음"
    [ ! -f "$work/repo/.next/BUILD_ID" ] && result ok "$label: 빌드 결과(.next/BUILD_ID) 없음 — prebuild에서 멈춤" || result no "$label: .next/BUILD_ID가 생김"
  else
    [ "$code" -eq 0 ] && result ok "$label: 검증 통과(종료 코드 0)" || result no "$label: 검증 실패(종료 코드 ${code})"
    [ "$hits" -ge 1 ] && result ok "$label: 기대 문장 출력" || result no "$label: 기대 문장 없음"
  fi
  rm -rf "$work"
}

run_case "news caption 없음" "$FX/posts/zz-fixture-news-image.md" "" "image.caption: kind \`news\`이면 필수입니다" fail
run_case "public caption 빈 문자열" "$FX/posts/zz-fixture-public-image.md" "" "image.caption: kind \`public\`이면 필수입니다" fail
run_case "영어본 imageCaption 없음(원본 news caption 있음)" "$P13/fixtures/posts/zz-fixture-news-image.md" "$FX/posts-en/zz-fixture-news-image.md" "imageCaption: 한국어 원본에 image.caption이 있으므로 필수입니다" fail
run_case "대조: 정상 픽스처(caption·imageCaption 있음)" "$P13/fixtures/posts/zz-fixture-news-image.md" "$P13/fixtures/posts-en/zz-fixture-news-image.md" "✅ 검증 통과" pass
echo
echo "합계 $((PASS + FAIL))건 · PASS $PASS · FAIL $FAIL"
[ "$FAIL" -eq 0 ]
