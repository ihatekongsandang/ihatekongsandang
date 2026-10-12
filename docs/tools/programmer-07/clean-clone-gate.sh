#!/usr/bin/env bash
# 프로그래머 07 — 커밋 전·푸시 전 깨끗한 복제본 게이트 (06-1 게이트의 후속판).
#
# 사용 (저장소 루트에서):
#   bash docs/tools/programmer-07/clean-clone-gate.sh [--staged|--head|--worktree] [작업 폴더]
#
#   --staged   (기본값) git 인덱스에 스테이징된 내용 그대로 = "지금 커밋하면 Vercel이 받을 트리".
#              미스테이징 변경·미추적 파일은 넣지 않는다(작업 폴더를 같이 쓰는 다른 세션의 작성 중 파일이 섞이지 않게).
#   --head     커밋 뒤·푸시 전. HEAD 커밋을 깨끗하게 clone 해서 검사한다(스테이징·작업 트리 모두 무관).
#   --worktree 06-1 동작 그대로 — 추적 파일 + .gitignore에 걸리지 않는 미추적 파일의 작업 트리 내용.
#
#   작업 폴더를 주지 않으면 mktemp -d 로 만들고 끝날 때 지운다(성공·실패 모두). 작업 폴더를 주면 남긴다.
#
# 순서: 대상 트리 꺼내기 → 모드·포함 파일 수·제외 경로 출력 → node_modules·.next·.env.local 없이
#       `npm ci` → typecheck → lint → build(`prebuild`의 validate 포함).
# Vercel과 같게 VERCEL=1 · CI=1 · NEXT_PUBLIC_SITE_URL/GA_ID(더미 값)를 채운다.
# 한 단계라도 실패하면 0이 아닌 값으로 끝나고, 마지막 "✅ … 게이트 통과" 줄이 찍히지 않는다.
set -euo pipefail

MODE=staged
case "${1:-}" in
  --staged | --head | --worktree)
    MODE=${1#--}
    shift
    ;;
  -*)
    echo "알 수 없는 옵션: $1 (--staged | --head | --worktree)" >&2
    exit 64
    ;;
esac

ROOT=$(git rev-parse --show-toplevel)
if [ -n "${1:-}" ]; then
  WORK=$1
  mkdir -p "$WORK"
else
  WORK=$(mktemp -d)
  # 실행 1회에 node_modules 포함 약 900MB가 남는다(리뷰 13 P3-1) — 직접 만든 폴더만 지운다.
  trap 'rm -rf "$WORK"' EXIT
fi
DEST="$WORK/repo"
rm -rf "$DEST"
mkdir -p "$DEST"
cd "$ROOT"

# 제외 경로 목록은 "슈퍼바이저가 눈으로 섞임 여부를 확인"하기 위한 것이다 — 줄마다 상태 기호와 경로.
print_list() {
  local title=$1
  local body=$2
  local count=0
  if [ -n "$body" ]; then
    count=$(printf '%s\n' "$body" | wc -l | tr -d ' ')
  fi
  echo "$title: ${count}개"
  if [ -n "$body" ]; then
    printf '%s\n' "$body" | sed 's/^/    /'
  fi
}

UNTRACKED=$(git ls-files --others --exclude-standard)
UNSTAGED=$(git diff --name-status)
STAGED=$(git diff --cached --name-status)

echo "── 게이트 모드: --$MODE · HEAD $(git rev-parse --short HEAD) ($(git log -1 --format=%s | cut -c1-60))"
case "$MODE" in
  staged)
    # 인덱스의 모든 항목을 그 내용 그대로 꺼낸다(작업 트리 파일을 읽지 않는다).
    git checkout-index --all --prefix="$DEST/"
    INCLUDED=$(git ls-files | wc -l | tr -d ' ')
    print_list "HEAD 대비 스테이징된 변경(이번 커밋에 들어감)" "$STAGED"
    print_list "제외 — 미스테이징 변경(작업 트리에만 있음)" "$UNSTAGED"
    print_list "제외 — 미추적 파일" "$UNTRACKED"
    ;;
  head)
    git clone --quiet --no-hardlinks "$ROOT" "$DEST"
    git -C "$DEST" checkout --quiet --detach "$(git rev-parse HEAD)"
    INCLUDED=$(git -C "$DEST" ls-files | wc -l | tr -d ' ')
    if UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null); then
      echo "푸시 대상: $UPSTREAM 보다 앞선 커밋 $(git rev-list --count "$UPSTREAM..HEAD")개"
      git log --format='    %h %s' "$UPSTREAM..HEAD" | cut -c1-100
    fi
    print_list "제외 — 스테이징만 되고 커밋 안 됨" "$STAGED"
    print_list "제외 — 미스테이징 변경" "$UNSTAGED"
    print_list "제외 — 미추적 파일" "$UNTRACKED"
    ;;
  worktree)
    git ls-files -z --cached --others --exclude-standard | while IFS= read -r -d '' f; do
      [ -e "$f" ] || continue # 작업 트리에서 삭제된 추적 파일은 커밋에도 없다
      mkdir -p "$DEST/$(dirname "$f")"
      cp -p "$f" "$DEST/$f"
    done
    INCLUDED=$(cd "$DEST" && find . -type f | wc -l | tr -d ' ')
    print_list "포함 — 미추적 파일(작업 트리 그대로)" "$UNTRACKED"
    print_list "포함 — 미스테이징 변경(작업 트리 그대로)" "$UNSTAGED"
    ;;
esac

ON_DISK=$(cd "$DEST" && find . -path ./.git -prune -o -type f -print | wc -l | tr -d ' ')
echo "포함 파일 수: $INCLUDED (꺼낸 파일 $ON_DISK) → $DEST"
if [ "$INCLUDED" != "$ON_DISK" ]; then
  echo "🔴 포함 파일 수와 꺼낸 파일 수가 다르다" >&2
  exit 3
fi

cd "$DEST"
npm ci --no-audit --no-fund --cache "$WORK/npm-cache" >/dev/null
export VERCEL=1 CI=1 NEXT_PUBLIC_SITE_URL=https://example.invalid NEXT_PUBLIC_GA_ID=G-TEST000000
# `cmd && echo` 형태는 set -e 가 실패를 무시한다 — 명령을 한 줄씩 둔다.
npm run -s typecheck
echo "✅ typecheck"
npm run -s lint
echo "✅ lint"
npm run build
echo "✅ build(validate 포함)"
echo "✅ 깨끗한 복제본 게이트 통과 (--$MODE)"
