#!/usr/bin/env bash
# 프로그래머 16 — 옮긴 id 검증이 실제 빌드를 세우는지(시험표 7의 "빌드 실패").
# 사례마다 작업 트리 사본(저장소 밖 임시 폴더) + 정상 픽스처(fixtures/)에 위반 하나만 더하고 두 가지로 빌드한다.
#   ① npm run build      — prebuild의 validate:content가 막는다
#   ② npx next build     — 검증을 건너뛴 직접 빌드. next.config(형식 a·b·c·g) 또는 로더(d·e·f·h·i)가 막는다
# 기대: 둘 다 종료 코드 ≠ 0, 출력에 규칙 표지 [x], .next/BUILD_ID 없음. "정상" 사례는 둘 다 통과(종료 0, BUILD_ID 있음).
# 사용(저장소 루트): bash docs/tools/programmer-16/build-fail.sh
set -uo pipefail
ROOT=$(pwd)
FIX="$ROOT/docs/tools/programmer-16/fixtures"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

prepare() {
  DEST="$WORK/repo"
  rm -rf "$DEST"; mkdir -p "$DEST"
  rsync -a --exclude node_modules --exclude .next --exclude .git --exclude .env.local --exclude docs --exclude history "$ROOT/" "$DEST/"
  ln -s "$ROOT/node_modules" "$DEST/node_modules"
  cp "$FIX"/posts/*.md "$DEST/content/posts/"; cp "$FIX"/posts-en/*.md "$DEST/content/posts-en/"
  cp "$FIX/moved-ids.txt" "$DEST/content/moved-ids.txt"; cat "$FIX/retired-append.txt" >> "$DEST/content/retired-ids.txt"
}

# 이름|규칙 표지|위반 만들기(사본 루트에서 실행할 셸)
CASES=(
  "정상(대조)|-|true"
  "a 토큰 1개|[a]|echo 'zz-fixture-old-c' >> content/moved-ids.txt"
  "b 대문자 id|[b]|echo 'Zz-fixture-old-c zz-fixture-moved-a' >> content/moved-ids.txt"
  "c 옛=새|[c]|echo 'zz-fixture-moved-a zz-fixture-moved-a' >> content/moved-ids.txt"
  "d retired 미등록|[d]|echo 'zz-fixture-old-c zz-fixture-moved-a' >> content/moved-ids.txt"
  "e 옛 id 게시물 남음|[e]|sed 's/^id: zz-fixture-moved-b$/id: zz-fixture-old-a/' content/posts/zz-fixture-moved-b.md > content/posts/zz-fixture-old-a.md"
  "f 새 id 게시물 없음|[f]|echo 'zz-fixture-old-c zz-fixture-missing' >> content/moved-ids.txt && echo zz-fixture-old-c >> content/retired-ids.txt"
  "g 옛 id 중복|[g]|echo 'zz-fixture-old-a zz-fixture-moved-b' >> content/moved-ids.txt"
  "g 사슬|[g]|echo 'zz-fixture-old-c zz-fixture-old-a' >> content/moved-ids.txt && echo zz-fixture-old-c >> content/retired-ids.txt"
  "h 한국어 본문 링크|[h]|printf '\n[옛 글](/post/zz-fixture-old-a)\n' >> content/posts/zz-fixture-moved-b.md"
  "h 영어본 절대 주소|[h]|printf '\nSee https://site.example.com/en/post/zz-fixture-old-a for more.\n' >> content/posts-en/zz-fixture-moved-a.md"
  "i 옛 이미지 폴더|[i]|mkdir -p public/images/zz-fixture-old-a && cp \"\$(find public/images -name '*.jpg' -print -quit)\" public/images/zz-fixture-old-a/thumb.jpg"
  "i 옛 이미지 경로 참조|[i]|printf '\n(사진 위치 메모: /images/zz-fixture-old-a/thumb.jpg)\n' >> content/posts/zz-fixture-moved-b.md"
)
total=0; ok=0
for c in "${CASES[@]}"; do
  IFS='|' read -r name tag setup <<< "$c"
  for mode in npm direct; do
    prepare
    ( cd "$DEST" && eval "$setup" ) || { echo "ERROR  $name — 위반 만들기 실패"; continue; }
    if [ "$mode" = npm ]; then cmd="npm run build"; else cmd="npx next build"; fi
    ( cd "$DEST" && NEXT_PUBLIC_SITE_URL=https://site.example.com NEXT_PUBLIC_GA_ID= $cmd > "$WORK/out.txt" 2>&1 ); code=$?
    built=$([ -f "$DEST/.next/BUILD_ID" ] && echo 있음 || echo 없음)
    total=$((total+1))
    if [ "$tag" = "-" ]; then
      pass=$([ $code -eq 0 ] && [ "$built" = 있음 ] && echo 1 || echo 0); seen="-"
    else
      seen=$(grep -F -c "$tag" "$WORK/out.txt")
      pass=$([ $code -ne 0 ] && [ "$built" = 없음 ] && [ "$seen" -gt 0 ] && echo 1 || echo 0)
    fi
    [ "$pass" = 1 ] && ok=$((ok+1))
    msg=$(grep -F -m1 "$tag" "$WORK/out.txt" | sed 's/\x1b\[[0-9;]*m//g' | sed 's/^ *//' | cut -c1-120)
    echo "$([ "$pass" = 1 ] && echo PASS || echo FAIL)  $name · $cmd — 종료 $code · BUILD_ID $built · 표지 ${tag} ${seen}회${msg:+ · $msg}"
  done
done
echo "합계 ${total}건 · PASS ${ok} · FAIL $((total-ok))"
[ "$ok" -eq "$total" ]
