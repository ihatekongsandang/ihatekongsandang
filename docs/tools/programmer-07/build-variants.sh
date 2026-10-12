#!/usr/bin/env bash
# 프로그래머 07 — 기준(HEAD) ↔ 작업 빌드 4종을 같은 폴더에서 차례로 만들어 `.next/server/app`을 보관한다.
#
# 사용: bash docs/tools/programmer-07/build-variants.sh <스크래치 폴더>   (저장소 루트에서)
#
#   <스크래치>/bw            HEAD를 clone한 빌드 폴더(npm ci 1회). 모듈 경로가 같아야 RSC까지 비교할 수 있어 한 폴더를 돌려 쓴다.
#   <스크래치>/out/base-real  HEAD 코드 + HEAD 콘텐츠
#   <스크래치>/out/work-real  작업 코드 + HEAD 콘텐츠
#   <스크래치>/out/base-var   HEAD 코드 + 영어본 일부를 뺀 콘텐츠(Korean only 카드가 생기게 — 실데이터는 영어본이 전부 있어 0장)
#   <스크래치>/out/work-var   작업 코드 + 같은 콘텐츠. 이 빌드는 .next를 그대로 두어 `next start`로 AX 실측에 쓴다.
#   각 빌드 로그는 <스크래치>/out/*.log
#
# 작업 코드 = 아래 CHANGED 목록의 파일을 저장소 작업 트리에서 복사. 콘텐츠는 저장소 작업 트리의 content/를 쓰지 않는다(HEAD 그대로).
set -euo pipefail
S=${1:?스크래치 폴더를 주세요}
ROOT=$(git rev-parse --show-toplevel)
CHANGED=(next.config.ts tsconfig.build.json src/components/post-card.tsx src/lib/config.ts src/lib/seo.ts src/lib/content/translation.ts)
W="$S/bw"
OUT="$S/out"
rm -rf "$W" "$OUT"
mkdir -p "$OUT"
git clone --quiet "$ROOT" "$W"
git -C "$W" checkout --quiet --detach "$(git -C "$ROOT" rev-parse HEAD)"
echo "HEAD $(git -C "$W" rev-parse --short HEAD)"
cd "$W"
npm ci --no-audit --no-fund --cache "$S/npm-cache" >/dev/null
export NEXT_PUBLIC_SITE_URL=https://example.invalid NEXT_TELEMETRY_DISABLED=1

build() {
  local name=$1
  rm -rf .next
  npm run build >"$OUT/$name.log" 2>&1
  echo "$name build exit=0 · HTML $(find .next/server/app -name '*.html' | wc -l | tr -d ' ')개"
  cp -R .next/server/app "$OUT/$name"
}

use_head_code() { git checkout --quiet HEAD -- next.config.ts src && rm -f tsconfig.build.json; }
use_work_code() { for f in "${CHANGED[@]}"; do cp "$ROOT/$f" "$W/$f"; done; }
# 영어본을 이름순으로 7개마다 하나씩 뺀다(0·7·14…번째) — 피드 여러 페이지에 Korean only 카드가 흩어지게.
use_var_content() {
  git checkout --quiet HEAD -- content
  local i=0
  for f in $(ls content/posts-en/*.md | grep -v README | sort); do
    if [ $((i % 7)) -eq 0 ]; then rm "$f"; fi
    i=$((i + 1))
  done
  echo "변형 콘텐츠: 영어본 $(ls content/posts-en/*.md | grep -vc README)건 / 한국어 $(ls content/posts/*.md | grep -vc README)건"
}
use_real_content() { git checkout --quiet HEAD -- content; }

use_head_code; use_real_content; build base-real
use_work_code; build work-real
use_head_code; use_var_content; build base-var
use_work_code; build work-var
git -C "$W" status --porcelain | sed 's/^/  작업 폴더 변경: /'
