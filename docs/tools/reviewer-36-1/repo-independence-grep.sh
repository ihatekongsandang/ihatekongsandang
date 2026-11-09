#!/usr/bin/env bash
# 리뷰어 36-1 — 커밋 B 경로 전체 + 리뷰 36-1 산출물 저장소 독립 grep. 검색식은 파일에 적지 않고 환경 변수 PAT로 받는다.
# 사용(저장소 루트): PAT='<슈퍼바이저 지정 패턴>' bash docs/tools/reviewer-36-1/repo-independence-grep.sh
# ① PAT(grep -aE, '홍보물' 줄은 오탐 제외) — 줄 수·파일 수만 출력 ② 옛 #1 id(content/posts 파일명에서 읽음) ③ 그 id의 이름 로마자 토큰(대소문자 무시)
set -uo pipefail
: "${PAT:?PAT 환경 변수가 필요하다}"
PATHS=(
  src/lib/content/moved-ids.ts content/moved-ids.txt next.config.ts scripts/validate-content.ts src/lib/content/load.ts
  src/lib/content/retired-ids.ts src/lib/content/schema.ts content/README.md
  docs/tools/programmer-16 docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md
  instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md
  docs/reviews/programmer-16-review.md docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md docs/tools/reviewer-36 instructions/reviewer/processed/36-programmer-16-review.md
  docs/tools/programmer-16-1 docs/handoffs/programmer-16-1-review-36-fixes.md docs/triggers/programmer-16-1-review-36-fixes-COMPLETE.md
  instructions/programmer/processed/16-1-review-36-fixes.md
  history/2026-11-09.md
  docs/tools/reviewer-36-1 docs/triggers/reviewer-36-1-programmer-16-1-recheck-COMPLETE.md
  instructions/reviewer/36-1-programmer-16-1-recheck.md instructions/reviewer/processed/36-1-programmer-16-1-recheck.md
)
FILES=()
missing=0
for p in "${PATHS[@]}"; do
  if [ -d "$p" ]; then while IFS= read -r f; do FILES+=("$f"); done < <(find "$p" -type f | sort)
  elif [ -f "$p" ]; then FILES+=("$p")
  else missing=$((missing+1)); echo "  (없음) $p"; fi
done
text=0; for f in "${FILES[@]}"; do file -b --mime "$f" | grep -q '^text/' && text=$((text+1)); done
echo "대상 파일 ${#FILES[@]}개(글자 ${text} · 그 밖 $(( ${#FILES[@]} - text ))) · 목록에 있으나 없는 경로 ${missing}개"
lines=0; nf=0
for f in "${FILES[@]}"; do n=$(grep -aE "$PAT" "$f" | grep -v '홍보물' | wc -l | tr -d ' '); [ "$n" -gt 0 ] && { nf=$((nf+1)); echo "    $f: ${n}줄"; }; lines=$((lines+n)); done
echo "① 지정 패턴('홍보물' 줄 제외): ${lines}줄 / ${nf}개 파일"
hp=$(grep -aE "$PAT" "${FILES[@]}" | grep -c '홍보물'); echo "   (제외한 '홍보물' 줄: ${hp})"
OLD=$(ls content/posts | grep -E -- '-sentencing\.md$' | grep -E '^2026-08-06-' | sed 's/\.md$//')
cnt=$(printf '%s\n' "$OLD" | grep -c .)
echo "옛 #1 id 후보 파일: ${cnt}개"
ROM=$(printf '%s' "$OLD" | awk -F- '{print $5}')
echo "로마자 토큰 길이: ${#ROM}자"
c2=0; c3=0
for f in "${FILES[@]}"; do grep -aqF -- "$OLD" "$f" && { c2=$((c2+1)); echo "    ② $f"; }; grep -aqiF -- "$ROM" "$f" && { c3=$((c3+1)); echo "    ③ $f"; }; done
echo "② 옛 #1 id 일치 파일: ${c2}"
echo "③ 이름 로마자 토큰 일치 파일: ${c3}"
echo "양성 대조: content/posts 파일명 목록에서 ② $(ls content/posts | grep -cF -- "$OLD") · ③ $(ls content/posts | grep -ciF -- "$ROM")"
