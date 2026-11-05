#!/bin/bash
# 리뷰어 18 — 10/15~11/04 업로더 처리 기록 전수 집계 (저장소 루트에서 실행)
H=docs/supervisor/drafts/2026-09-28-held-recheck.md
echo "[held-recheck 블록 — 검토일(괄호 안 마지막 날짜) 2026-10-15~11-04]"
grep -n '^### ' "$H" | while IFS= read -r L; do
  D=$(echo "$L" | grep -oE '2026-1[01]-[0-9]{2}' | tail -1)
  [[ -n "$D" && "$D" > "2026-10-14" && "$D" < "2026-11-05" ]] && echo "$D | $L"
done > /tmp/r18-blocks.txt
cat /tmp/r18-blocks.txt
echo "--- 종류별 블록 수"
for K in '게시 불가' '보류' '병합' '갱신'; do printf '%s: ' "$K"; grep -c "### ${K}" /tmp/r18-blocks.txt; done
echo
echo "[신규 게시 — content/posts 파일 추가 커밋, 2026-10-15~11-04]"
git log --since=2026-10-15T00:00 --until=2026-11-05T00:00 --diff-filter=A --name-only --format='%h %ad' --date=format:'%m-%d' -- content/posts/ | grep 'content/posts' | tee /tmp/r18-new.txt
printf '신규: '; wc -l < /tmp/r18-new.txt
echo
echo "[history 수집 실패 보류(캡처 대기) — held-recheck 미기록]"
python3 docs/tools/reviewer-18/collect-fail.py
