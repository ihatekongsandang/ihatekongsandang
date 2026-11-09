#!/bin/bash
# 리뷰 35 — pairs.tsv의 옛 포털 주소·새 원 매체 주소 59쌍을 모두 받는다(요청 간격 1.5초).
# 사용: bash fetch_all.sh <pairs.tsv> <out_dir>   (out_dir은 저장소 밖 임시 폴더)
set -u
pairs="$1"; out="$2"; mkdir -p "$out/html"
log="$out/fetch.tsv"; printf 'no\tkind\tcode\tredirects\teffective_url\tbytes\n' > "$log"
tail -n +2 "$pairs" | while IFS=$'\t' read -r no file old new type name date; do
  for kind in new old; do
    if [ "$kind" = new ]; then u="$new"; else u="$old"; fi
    f="$out/html/${no}-${kind}.html"
    r=$(curl -sS -L --max-time 30 -A "Mozilla/5.0" -o "$f" -w '%{http_code}\t%{num_redirects}\t%{url_effective}\t%{size_download}' "$u" 2>>"$out/curl-err.txt")
    printf '%s\t%s\t%s\n' "$no" "$kind" "$r" >> "$log"
    sleep 1.5
  done
done
echo done
