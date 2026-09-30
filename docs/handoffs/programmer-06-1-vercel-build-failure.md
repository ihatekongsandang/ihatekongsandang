# 프로그래머 세션 — 06-1-vercel-build-failure 핸드오프
**작성일**: 2026-09-30 14:25 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
- `f50ee73` 배포 실패는 **깨끗한 복제본에서 재현**했다. 커밋에 함께 들어간 리뷰어 12 도구 `docs/tools/reviewer-12/attribution-edge.tsx`의 **TS18048 타입 오류 5건** 때문에 `next build`의 "Linting and checking validity of types" 단계에서 실패한다(루트 `tsconfig.json`의 `include: **/*.tsx`가 `docs/tools/**`까지 포함한다).
- 수정은 도구 파일 한 곳에 **2줄 추가**(게시물 0건일 때 throw, 타입 좁히기)뿐이다. 운영 코드(`src`·`content`·설정)는 바꾸지 않았다. 수정 후 깨끗한 복제본 3종(`f50ee73`+수정, 기준선, 배포 대상 HEAD `0316fca`+수정)이 모두 build·typecheck·lint를 통과했다. 한국어·404 HTML은 364/364, 영어 HTML은 18/18이 기준선과 같다.
- 재발 방지로 **커밋 전 깨끗한 복제본 게이트** `docs/tools/programmer-06-1/clean-clone-gate.sh`를 만들었다. 음성 대조(수정 되돌림)에서 exit 2로 오류 5건을 잡았고, 양성 대조에서는 통과했다.

## 원인 (증거)
| 항목 | 내용 | 증거 |
|---|---|---|
| 재현 | `git clone` → `f50ee73` → `npm ci` → `VERCEL=1 CI=1 NEXT_PUBLIC_SITE_URL=… NEXT_PUBLIC_GA_ID=…` `npm run build` → validate 135/135 통과 뒤 `Failed to compile.` `./docs/tools/reviewer-12/attribution-edge.tsx:38:11 Type error: 'original' is possibly 'undefined'.` | `docs/tools/programmer-06-1/results/build-f50ee73-clean-clone-FAIL.log` |
| 작업 트리도 동일 | 수정 전 작업 트리 `npx tsc --noEmit`에서 같은 파일 오류 5건(38·40·45·45·46행). 다른 파일 오류는 0 | `results/typecheck-worktree-before-fix.log` |
| 오류 내용 | `const sample = posts.find(…) ?? posts[0]`: `noUncheckedIndexedAccess: true` 때문에 `posts[0]`의 타입이 `Post \| undefined`가 되고, `sample`·`original`(기본값 `sample`)을 쓰는 곳 5곳이 오류 | 파일 33~46행 |
| 게이트를 빠져나간 경위 | 도구 파일 수정 시각은 13:22이다. 리뷰어 12의 typecheck·build는 **리뷰 시작 때 떠 둔 스크래치 사본**(리뷰 보고서 10~13행 "작업 트리 rsync")에서 돌았고, 저장된 `reviewer-12/results/typecheck.log`(13:49 저장)도 그 사본의 결과다. 프로그래머 06의 게이트는 이 파일이 생기기 전에 끝났다. 그래서 **이 파일이 들어간 빌드는 커밋 전에 한 번도 없었다** | 파일 시각 `stat`, `docs/reviews/programmer-06-english-feed-all-cards-review.md` §머리말 |
| 과거 도구 `.tsx`는 왜 괜찮았나 | `programmer-05-1`·`programmer-06`·`reviewer-11`의 `.tsx`도 똑같이 빌드 타입 검사 대상이다. 다만 타입 오류가 없어서 통과했다(이번 복제본 빌드에서도 통과) | `results/typecheck-*.log` |
| Vercel 실제 로그 | **확인 필요.** `npx vercel inspect …` 실행 결과는 "Logged out"이었다(로컬 npm 캐시 권한 오류는 별도 캐시로 우회). 로그인은 사용자 계정 작업이라 하지 않았다. 원인은 운영과 같은 조건(`VERCEL=1`·`CI=1`·환경 변수 채움)의 깨끗한 복제본에서 같은 단계 실패로 재현했고, 수정 후 같은 조건에서 통과한 것으로 확인했다 | — |

## 수정
| 파일 | 변경 |
|---|---|
| `docs/tools/reviewer-12/attribution-edge.tsx` | `noSpeaker` 다음에 `if (!sample \|\| !noSpeaker) throw new Error(…)` + 주석 1줄. 게시물이 있으면 동작이 같다(아래 검증) |

그 밖의 운영 코드·설정·콘텐츠 변경은 0건이다(`git diff --stat`: 1 file, 2 insertions). 패치는 `results/fix.patch`에 있다.

### 검토했다가 버린 안 — 루트 `tsconfig.json`의 `exclude`에 `"docs"` 추가
- 장점: 도구 파일이 앞으로 운영 빌드를 막지 못한다.
- **실측한 부작용**: 도구별 `tsconfig.json`이 루트를 `extends`하므로 `exclude`까지 상속한다. 그러면 `tsx --tsconfig docs/tools/…`가 도구 파일에 `jsx: react-jsx`를 적용하지 못해, `programmer-05-1`·`programmer-06`·`reviewer-11`의 `.tsx` 3종이 `ReferenceError: React is not defined`로 실패했다(exit 1). 되돌린 뒤에는 5종 모두 exit 0이었다.
- 그래서 "최소 수정" 원칙에 따라 되돌렸다. 채택하려면 도구 `tsconfig` 4개에 `include`·`exclude` 재정의가 함께 필요하다. 구조를 바꾸는 결정이므로 슈퍼바이저·리뷰어 판단에 맡긴다.

## 검증
| 항목 | 결과 | 로그 (`docs/tools/programmer-06-1/results/`) |
|---|---|---|
| 깨끗한 복제본 빌드 `f50ee73` + 수정 | validate 135/135 · 정적 390 · build exit 0 | `build-f50ee73-fix.log` |
| 깨끗한 복제본 빌드 — 배포 대상 HEAD `0316fca` + 수정 | validate 135/135 · 정적 390 · build exit 0 | `build-head.log` |
| 기준선 = `f50ee73`에서 문제 파일만 제거(06 의도 출력) | build exit 0 | `build-base.log` |
| typecheck (3종) | 0 | `typecheck-*.log` |
| lint (3종) | 0 errors · warning 3 — 06 `lint.log`와 같은 3건 | `lint-*.log` |
| HTML 전수 (기준선 ↔ `f50ee73`+수정, `programmer-06/html-diff.mjs` 정규화) | 382/382 · 한국어·404 **364/364 동일** · 영어 18/18 동일 · 누락·추가 0 · exit 0 | `html-diff-base-vs-f50fix.log` |
| 기존 도구 실행 (작업 트리, 수정 후) | `reviewer-12`·`reviewer-11` attribution-edge, `programmer-06`·`programmer-05-1`·`programmer-05` unit-checks 5/5 exit 0 | — |
| 리뷰어 12 도구 출력 불변 | 수정 후 출력 = 커밋된 `reviewer-12/results/attribution-edge.log`와 바이트 동일 | `reviewer-12-tool-output-diff.log` |
| 게이트 양성 (작업 트리) | 복사 752파일 → typecheck·lint·build 통과, exit 0 | `gate-positive.log` |
| 게이트 음성 (수정 되돌림) | TS18048 5건 · exit 2 (확인 후 수정 재적용, `git diff` 1 file 2 insertions) | `gate-negative-fix-reverted.log` |
| 독립 grep (pre-commit 패턴 + 홈 경로) | 변경·신규 파일 0 | 아래 참고 |

## 재발 방지
1. **커밋 전 깨끗한 복제본 게이트**: 커밋 직전(리뷰어 판정 뒤, 리뷰어 도구까지 작업 트리에 모두 들어온 상태)에 슈퍼바이저가 다음을 실행한다.
   `bash docs/tools/programmer-06-1/clean-clone-gate.sh`
   추적 파일과 `.gitignore`에 걸리지 않는 미추적 파일, 곧 **커밋될 집합**만 새 폴더로 복사한다. 그 뒤 `node_modules`·`.next`·`.env.local` 없이 `npm ci` → typecheck → lint → build(validate 포함)를 Vercel 조건(`VERCEL=1`·`CI=1`·더미 환경 변수)으로 돌린다. 한 단계라도 실패하면 0이 아닌 값으로 끝난다. 소요는 2~3분이다.
   - 스크립트를 만드는 도중 `cmd && echo` 형태에서 `set -e`가 실패를 무시하는 버그를 음성 대조로 찾아 고쳤다(명령을 한 줄씩 둠).
2. **리뷰어·테스터 도구 작성 규칙**(제안): `docs/tools/**`의 `.ts/.tsx`는 운영 빌드 타입 검사 대상이다. 도구를 새로 쓰거나 고쳤으면 저장소 작업 트리에서 `npm run typecheck`를 다시 돌린 뒤 보고한다. 스크래치 사본의 결과로 대신하지 않는다. `instructions/README.md` 반영 여부는 슈퍼바이저가 판단한다.
3. (선택) 위 "버린 안"처럼 구조로 분리하는 방법: 루트 `exclude`에 `docs`를 넣고, 도구 `tsconfig`마다 `include`·`exclude`를 재정의한다.

## 산출물
| 경로 | 설명 |
|---|---|
| `docs/tools/reviewer-12/attribution-edge.tsx` | 타입 좁히기 2줄(빌드 실패 원인 수정) |
| `docs/tools/programmer-06-1/clean-clone-gate.sh` | 커밋 전 깨끗한 복제본 게이트 |
| `docs/tools/programmer-06-1/results/` | 재현 실패 로그 · 복제본 3종 build/typecheck/lint · HTML 전수 비교 · 게이트 양성/음성 · 패치 (스크래치·홈 경로는 `$SCRATCH`·`$HOME`로 치환) |
| `docs/triggers/programmer-06-1-vercel-build-failure-COMPLETE.md` | 완료 트리거 |

## 미해결·이슈
- Vercel 실제 배포 로그는 **확인하지 못했다**(CLI 로그아웃 상태). 커밋·푸시 뒤 배포가 `success`인지 슈퍼바이저가 확인해야 한다.
- 이 PC의 `~/.npm` 캐시 소유권 문제로 기본 `npx`가 새 패키지를 받지 못한다(`sudo chown -R 501:20 ~/.npm` 안내가 나옴). 이번에는 `npm_config_cache`를 스크래치로 바꿔 우회했다. 사용자 작업 대상인지는 슈퍼바이저가 판단한다.
- 리뷰어 12 P2-3(`/_next/image` 멈춤 배포 확인)은 배포가 성공해야 확인할 수 있다.

## 다음 세션 가이드
- **리뷰어 (Opus 5.5)**: 간이 확인. `git diff`(1 file, 2 insertions)를 읽고, `bash docs/tools/programmer-06-1/clean-clone-gate.sh`를 한 번 돌리고, `docs/tools/programmer-06-1/**`로 독립 grep을 한다.
- **슈퍼바이저**: 리뷰어 승인 뒤 게이트를 다시 실행하고 → 커밋·푸시 → Vercel 배포 `success` 확인 → `/en`이 전체 카드(Korean only 포함)를 노출하는지 `curl` 1~2회로 반영 확인.

## 참고 링크
- 오더: `instructions/programmer/processed/06-1-vercel-build-failure.md`
- 원 작업: `docs/handoffs/programmer-06-english-feed-all-cards.md` · `docs/reviews/programmer-06-english-feed-all-cards-review.md`
