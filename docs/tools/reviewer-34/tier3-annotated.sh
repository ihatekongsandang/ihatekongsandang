#!/usr/bin/env bash
# 리뷰어 34: 묶음 배정 TSV에서 Tier 3(일반)으로 분류됐지만 caption에 위험 표기(자막·문구 불일치·
# 뉴스 표기·다른 시점 장면·제3자 글 캡처)가 있는 행을 뽑는다. 저장소 루트에서 실행.
awk -F'\t' 'NR>1 && $2=="T3" && $6 ~ /자막|문구|긴급속보|뉴스|장면으로 소개|캡처/ {print $1"\t"$2"\t"$4"\t"$6}' docs/tools/planner-16/sns-image-batches.tsv
