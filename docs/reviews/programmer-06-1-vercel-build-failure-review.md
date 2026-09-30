# 리뷰 보고서 — 프로그래머 06-1 · Vercel 배포 실패 수정 (간이 확인)

**작성일**: 2026-09-30 14:40 | **작성 세션**: 리뷰어 (Opus 5.5)
**md오더**: `instructions/reviewer/processed/13-programmer-06-1-hotfix-check.md`
**검토 대상**: 미커밋 작업 트리. 수정 1개 파일(`docs/tools/reviewer-12/attribution-edge.tsx` 2줄 추가), 게이트 스크립트 `docs/tools/programmer-06-1/clean-clone-gate.sh`, 결과 로그 16개, 핸드오프·트리거·오더 이동
**선행 검토**: CLAUDE.md, 06-1 오더(processed), 핸드오프, 트리거, `git diff`, 결과 로그(음성·양성 게이트)
**코드 수정**: 0건 · **커밋**: 0건. 게이트와 실험은 모두 스크래치 사본에서 했다. 작업 트리는 리뷰 전과 후 모두 `git diff --stat` 3 files(도구 1 · history · 오더 삭제)로 같다.
**리뷰어 산출물**: 이 보고서, `docs/tools/reviewer-13/`(README + 결과 로그 3~4개, `.ts/.tsx` 없음), 트리거, 오더 이동, history

> ⚠️ **원인 제공자 명시**: 배포를 막은 `attribution-edge.tsx`는 리뷰어 12의 산출물이다. 리뷰어 12는 typecheck를 도구를 만들기 전에 떠 둔 스크래치 사본에서 돌렸고, 저장소 작업 트리에서는 다시 돌리지 않았다. 이번 결함은 리뷰어 쪽 절차 누락에서 나왔다. 그래서 아래 §5 제안 2(도구 작성 규칙)에 동의하고, 이번 리뷰부터 그 규칙을 적용했다(§4).

---

## 판정: ✅ 승인 — 커밋 가능

- 원인 진단(도구 `.tsx`가 루트 `tsconfig` `include: **/*.tsx`에 걸려 `next build` 타입 검사에서 TS18048 5건)은 음성 대조로 **직접 재현했다**. 수정을 되돌린 사본에서 게이트를 돌리면 같은 5건이 나오고 exit 2로 끝난다.
- 수정(2줄 타입 좁히기)을 넣은 현재 작업 트리는 깨끗한 복제본 게이트를 **두 번 모두 exit 0**으로 통과했다. 두 번째 실행은 리뷰 산출물을 모두 넣은 뒤에 했다.
- 운영 코드(`src`·`content`·`scripts`·`public`·설정·lock) 변경은 **0건**이다.
- 확정 결함은 없다. 게이트 운용에 관한 P2 1건과 P3 2건을 남긴다. 셋 다 커밋을 막지 않는다.

---

## 1. 게이트 실행 결과 (현재 작업 트리 그대로, 직접 실행)

| 회차 | 시점 | 복사 파일 | typecheck | lint | validate | build | exit | 로그 |
|---|---|---|---|---|---|---|---|---|
| 1 | 리뷰 산출물 넣기 전 | **757** | 0 오류 | 0 errors · warnings 3 | 135/135(한국어 129 · 영어본 6) · 실패 0 | 정적 **390/390** | **0** | `docs/tools/reviewer-13/results/gate-run1.log` |
| 2 | 리뷰 산출물·트리거·오더 이동·history까지 넣은 뒤 | **764** | 0 오류 | 0 errors · warnings 3(같은 3건) | 135/135 · 실패 0 | 정적 **390/390** | **0** | `docs/tools/reviewer-13/results/gate-run2.log` |

- **복사 수 대조 (2회차)**: 스크립트와 같은 규칙으로 따로 센 기대값 764와 같다. 1회차보다 늘어난 7개는 오더 이동(삭제 1 · processed 1)과 리뷰어 산출물이다. `gate-run2.log` 자신은 실행 뒤에 저장했으므로 2회차 복사본에 들어 있지 않다. `.md`·`.log`라 빌드 결과에는 영향이 없다.
- **복사 수 대조 (1회차)**: 추적 738 − 작업 트리에서 삭제한 추적 파일 1(`instructions/programmer/06-1-…md`) + 미추적·비무시 20 = **757**. 스크립트 출력과 같다. 프로그래머 양성 로그의 752는 그때 아직 없던 핸드오프·트리거·결과 로그만큼 적은 값이다.
- lint 경고 3건은 모두 `@typescript-eslint/no-unused-expressions`다. 프로그래머 06 `lint.log`에 있던 경고와 같은 3건이다(`reviewer-04/keyboard-tab.mjs` 1, `reviewer-10/html-same.mjs` 2).
- validate의 🟡 1건(`2026-07-12-…supervisory-bill.md`)은 기존 경고라 실패로 세지 않는다.

## 2. 게이트 스크립트 검토

| 항목 | 결과 | 근거 |
|---|---|---|
| 커밋될 파일 집합만 복사하는가 | ✅ `git ls-files --cached --others --exclude-standard`에서 작업 트리에 없는 파일은 뺀다. `.env.local`·`.next`·`node_modules`는 `.gitignore`(12·5·2행)에 걸려 빠진다 | `git check-ignore -v`, 757 대조 |
| 실패 시 0이 아닌 값으로 끝나는가 | ✅ **직접 1회 음성 대조**: 사본에서 `fix.patch`를 되돌리고 게이트를 실행하니 TS18048 5건(38·40·45·45·46행)과 **exit 2**가 나왔다. `✅` 줄은 하나도 찍히지 않았다 | `results/gate-negative-fix-reverted.log` |
| `set -e` 우회 버그 | ✅ 단계마다 명령을 한 줄에 하나씩 둔다. `cmd && echo` 형태가 없다. 복사 루프 안의 `mkdir && cp`는 마지막 명령이 실패하면 `set -e`가 걸리고, 파이프라인 종료 코드가 `while`(서브셸) 값이라 상위 셸도 멈춘다 | 코드 18~21행 |
| Vercel 조건 | ✅ `VERCEL=1` · `CI=1` · `NEXT_PUBLIC_SITE_URL`·`NEXT_PUBLIC_GA_ID` 더미 값. `prebuild`로 validate도 돈다 | 25행, `package.json` |
| 저장소 독립 원칙 | ✅ 홈 경로·계정명 하드코딩 없음. 경로는 `git rev-parse`와 `mktemp -d`로만 정한다 | 독립 grep(§3) |

### P2-1 (운용) — 게이트는 "작업 트리 전체"를 보고, 실제 커밋은 보지 않는다
- 게이트는 **미추적 파일까지** 복사한다. 슈퍼바이저가 일부 파일만 `git add`하거나 새 파일을 빠뜨리고 커밋하면, 게이트는 통과하는데 Vercel에는 그 파일이 없어서 실패할 수 있다. 반대로 커밋에서 뺀 도구 파일이 게이트만 깨뜨릴 수도 있다.
- 이번 06-1 원인(작업 트리에는 있고 검사를 안 거친 파일이 커밋에 들어감)은 잡는다. 그러나 "커밋에 안 들어간 파일" 쪽은 잡지 못한다.
- **권고**(어느 하나): ① 커밋 직전에 `git add -A`로 전부 스테이징하고, 게이트를 돌린 뒤 `git status --porcelain`이 비었는지 확인한다(부분 커밋 금지). ② **커밋 뒤, 푸시 전**에 `git clone . "$tmp"`로 받은 HEAD에서 같은 단계를 돌린다. Vercel이 보는 것과 정확히 같다. 스크립트에 이런 모드를 더하는 일은 프로그래머 오더 대상이다.

### P3-1 — 임시 폴더를 지우지 않는다
실행 1회에 약 **883MB**가 남는다(`node_modules` 포함, 실측). 기본값이 `mktemp -d`라 OS가 정리하지만, 자주 돌리면 쌓인다. `trap 'rm -rf "$WORK"' EXIT`를 넣을지(인자로 폴더를 줬을 때는 남기기) 검토하면 된다.

### P3-2 — 주석과 실제 순서가 다르다
8행 주석은 "validate → typecheck → lint → build"라고 적었다. 실제로는 typecheck → lint → build(`prebuild`의 validate) 순서다. 동작에는 영향이 없다.

## 3. 운영 코드 변경 · 독립 grep

- `git diff --name-only -- src content scripts public package.json package-lock.json tsconfig.json next.config.* eslint.config.*` → **0줄**
- `git diff --stat`: `docs/tools/reviewer-12/attribution-edge.tsx` +2, `history/2026-09-30.md` +5, 오더 원본 삭제 −34(processed로 이동). 수정 내용은 `fix.patch`와 같고, 게시물이 있으면 도구 동작이 같다(핸드오프의 출력 바이트 동일 로그).
- 독립 grep: pre-commit 패턴에 홈 디렉터리명과 임시 폴더·사용자 폴더 절대경로 패턴을 더해 검사했다. 대상은 변경·신규 파일 **22개**(수정 2 + 미추적 20)이고 결과는 **0건**이다. 리뷰어 13 산출물은 같은 패턴으로 10개 파일(보고서·트리거·오더·history·`reviewer-13` 6개)을 검사해 **0건**이다. 로그 안의 스크래치·홈 경로는 `$SCRATCH`·`$HOME`으로 바꿨다.

## 4. 리뷰어 본인 산출물 typecheck (저장소 작업 트리에서)

- 이번 리뷰어 산출물에는 `.ts/.tsx` 파일이 **없다**(`docs/tools/reviewer-13/`은 `README.md`와 `.log`뿐이다).
- 그래도 오더 4에 따라 산출물을 모두 넣은 뒤 **저장소 작업 트리에서** `npm run typecheck`를 돌렸다 → **exit 0**, 오류 0(`docs/tools/reviewer-13/results/typecheck-worktree.log`). 스크래치 결과로 대신하지 않았다.

## 5. 재발 방지 제안 의견

### 제안 1 (커밋 전 깨끗한 복제본 게이트) — ✅ 채택 권고, 단 P2-1 운용 조건 포함
### 제안 2 (도구 작성 규칙: 도구를 쓰거나 고치면 저장소 작업 트리에서 `npm run typecheck` 재실행) — ✅ 채택 권고
- 리뷰어 12의 실패를 그대로 막는 규칙이다. `instructions/README.md`의 리뷰어·테스터·프로그래머 공통 완료 조건에 넣기를 권고한다. 문구 예: "`docs/tools/**`에 `.ts/.tsx`를 만들거나 고쳤으면 보고 직전에 저장소 작업 트리에서 `npm run typecheck` exit 0을 확인하고 로그를 남긴다."
- 규칙만으로는 사람이 빠뜨릴 수 있다. 그래서 제안 1(기계 게이트)과 **함께** 두어야 한다.

### 제안 3 (`tsconfig` 구조 분리) — 🟡 조건부 권고: 프로그래머 안이 아니라 **빌드 전용 tsconfig** 방식으로
프로그래머가 버린 안(루트 `exclude`에 `docs` 추가)은 도구 `tsconfig` 4개가 `exclude`를 상속해서 깨진다. 이 부작용은 핸드오프 기록대로다. 그 대신 **루트는 그대로 두고 빌드만 분리하는 안**을 스크래치(수정을 되돌린 = 버그가 있는 사본)에서 실측했다.

| 구성 | 실측 결과 |
|---|---|
| `tsconfig.build.json` = `{"extends":"./tsconfig.json","exclude":["node_modules","docs"]}` + `next.config.ts`의 `typescript: { tsconfigPath: "tsconfig.build.json" }` | `VERCEL=1 CI=1` `npm run build` → **exit 0**, 정적 390/390. 도구 타입 오류가 있어도 **배포가 막히지 않는다** |
| 같은 사본에서 `npm run typecheck`(루트 `tsconfig`) | **exit 2**, TS18048 5건. 도구 타입 오류는 **여전히 게이트에서 잡힌다** |
| 도구 `tsx` 4종(`programmer-05-1`·`programmer-06` unit-checks, `reviewer-11`·`reviewer-12` attribution-edge) | 모두 **exit 0**. 루트를 바꾸지 않았으니 도구 `tsconfig`에 영향이 없다 |

로그: `docs/tools/reviewer-13/results/alt-tsconfig-build-split.log`

- **장점**: 운영 배포가 도구 파일 때문에 막히는 경로가 구조적으로 없어진다. 도구 타입 검사(`npm run typecheck`·게이트)는 그대로 유지된다.
- **비용·주의**: 운영 설정 파일 2개(`next.config.ts`·새 `tsconfig.build.json`)가 바뀌므로 정식 프로그래머 오더 → 리뷰 대상이다. 이번 핫픽스에 섞지 **않는다**. 또 이 안을 쓰면 도구 오류가 배포를 막지 않으므로, 도구를 검사하는 곳은 제안 1·2만 남는다. 그래서 제안 1·2가 먼저다.
- 실측하지 않은 부분: Vercel 실제 환경에서 `tsconfigPath`가 적용되는지는 **확인 필요**다. 로컬에서 `VERCEL=1` 조건으로만 확인했다. 채택하면 첫 배포에서 확인해야 한다.

## 6. 커밋 대상 (슈퍼바이저)

- 06-1: `docs/tools/reviewer-12/attribution-edge.tsx`, `docs/tools/programmer-06-1/**`, 핸드오프, 트리거, `instructions/programmer/`(원본 삭제 + processed)
- 리뷰어 13: 이 보고서, `docs/tools/reviewer-13/**`, 트리거, `instructions/reviewer/`(원본 삭제 + processed), `history/2026-09-30.md`
- 절차: 전부 스테이징(`git add -A`) → 게이트 재실행 exit 0 → `git status --porcelain` 빈 것 확인 → 커밋·푸시 → Vercel 배포 `success` 확인 → `/en` 반영 `curl` 1~2회. Vercel 실제 로그는 아직 **확인 필요**(CLI 로그아웃)다.
- 🔴 리뷰어는 커밋하지 않았다.
