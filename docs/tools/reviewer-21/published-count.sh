#!/bin/sh
# 리뷰어 21 — content/posts/ 한국어 원본(*.en.md 제외) 전수의 publishedAt·updatedAt 일자 분포 (2026-10-15 이후)
# 실행: 저장소 루트에서 sh docs/tools/reviewer-21/published-count.sh
total=0
for f in content/posts/*.md; do
  case "$f" in *.en.md) continue;; esac
  total=$((total+1))
done
echo "한국어 원본 파일 수: $total"
echo "[publishedAt >= 2026-10-15]"
for f in content/posts/*.md; do case "$f" in *.en.md) continue;; esac; grep -m1 '^publishedAt:' "$f"; done | awk '{print $2}' | awk '$1>="2026-10-15"' | sort | uniq -c
echo "[updatedAt >= 2026-10-15]"
for f in content/posts/*.md; do case "$f" in *.en.md) continue;; esac; grep -m1 '^updatedAt:' "$f"; done | awk '{print $2}' | awk '$1>="2026-10-15"' | sort | uniq -c
echo "[publishedAt 형식] 시각 포함(T 또는 :) 개수:"
for f in content/posts/*.md; do case "$f" in *.en.md) continue;; esac; grep -m1 '^publishedAt:' "$f"; done | awk '{print $2}' | grep -c '[T:]'
