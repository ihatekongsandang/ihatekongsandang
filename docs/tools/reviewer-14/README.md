# 리뷰어 14 — 프로그래머 07 재실측 도구·로그

모든 시험은 스크래치 복제본에서 했다. 사용자 저장소의 인덱스와 작업 트리는 바꾸지 않았다(이 폴더를 새로 만든 것만 예외).
로그 속 경로는 `$SCRATCH`(스크래치)·`$TMPDIR`·`$HOME`으로 바꿨다.

## 스크래치 구성
- `stage/`: HEAD `2296e89`를 clone한 뒤, 사용자 저장소의 미커밋 파일 68개(수정 6 · 미추적 62, `git status -uall` 기준)를 그대로 복사했다. clone의 `git status`는 원본과 같다(diff 0줄).
  그 위에서 핸드오프의 커밋 대상 10개 경로만 `git add` 했다. 결과는 43파일(A 38 · M 5)이다.
- `g-staged/repo`: 게이트를 `--staged <폴더>`로 돌려 남긴 인덱스 추출본이다(`node_modules` 포함). 아래 B·C·D 빌드도 모두 이 폴더에서 차례로 만들었다.
  빌드 환경은 게이트와 같다: `VERCEL=1 CI=1 NEXT_PUBLIC_SITE_URL=https://example.invalid NEXT_PUBLIC_GA_ID=G-TEST000000`.
- 기준 빌드: 같은 폴더에서 코드 5개 파일을 HEAD 내용으로 되돌리고, `tsconfig.build.json`과 `docs/tools/programmer-07`을 뺀 뒤 빌드했다.
- Korean only 변형: 영어본을 이름순으로 정렬해 **3번째부터 6개마다 하나씩**(3·9·15…) 30건을 뺐다(한국어 181 · 영어본 151).
  프로그래머 07의 변형(0번째부터 7개마다)과 일부러 다르게 골랐다.

## 도구
| 파일 | 용도 | 실행 (저장소 루트) |
|---|---|---|
| `build-diff.mjs` | 기준↔작업 `.next/server/app` 전수 비교. JSON-LD는 객체 단위로 보고 `alternateName`만 뺀 뒤 비교한다. 마크업은 C 속성만 걷어 내고, RSC는 alternateName 직렬화 1회만 걷어 낸다. `.body`·`.meta`·`.json`은 바이트 비교. `DIFF_CONTEXT=1`이면 차이 지점을 출력한다 | `node docs/tools/reviewer-14/build-diff.mjs <기준 app> <작업 app> <기준 BUILD_ID> <작업 BUILD_ID>` |
| `a11y-korean-only.mjs` | 영어 피드 전 페이지에서 카드 링크 DOM 노드마다 `Accessibility.getPartialAXTree`로 AX 이름과 설명을 직접 받는다(목록 순서로 짝짓지 않는다). Chrome 실행에는 `programmer-04/cdp.mjs`를 쓴다 | `node docs/tools/reviewer-14/a11y-korean-only.mjs <baseUrl> <콘텐츠 폴더>` |
| `handle-edge.mjs` | `handlesIn` 모서리 27종 + 오더 문구(앞 글자가 영숫자일 때만 제외)와 결과가 다른 입력 추출 | `npx tsx docs/tools/reviewer-14/handle-edge.mjs` |

`.mjs`라 루트 typecheck 대상이 아니다. 그래도 저장소 작업 트리에서 `npm run typecheck`를 돌렸고 exit 0이었다(`results/typecheck-worktree.log`). `eslint docs/tools/reviewer-14`는 문제 0건이다.

## 결과 (`results/`)
| 로그 | 내용 | 결과 |
|---|---|---|
| `gate-staged-10paths.log` | 10개 경로만 스테이징하고 `--staged` 실행 | 스테이징 43 · 제외 25(미스테이징 1 · 미추적 24) · 포함 1102 · typecheck 0 · lint 0 errors/3 warnings · validate 362/362 · 정적 708/708 · **exit 0** |
| `gate-negative-staged-type-error.log` | `src/reviewer14-negative.ts`(TS2322)를 스테이징하고 `--staged` 실행 | **exit 2** · `✅` 0줄 · 임시 폴더 삭제됨 |
| `gate-exit3-symlink.log` | 심볼릭 링크를 스테이징(인덱스 1103, `find -type f` 1102) | **exit 3**. 수 검증이 동작한다. 저장소 추적 파일 1,064개는 모두 `100644`이고 링크는 0개다 |
| `gate-arg-order.log` | `clean-clone-gate.sh <폴더> --head` | 첫 줄이 `--staged`다 → 폴더를 먼저 주면 모드 인자가 조용히 무시된다(P3) |
| `gate-head-after-test-commit.log` | 스크래치 시험 커밋 뒤 `--head` 실행 | **exit 0** · 포함 1102 |
| `sig-INT-pgrp.log` | 프로세스 그룹에 SIGINT(터미널 Ctrl-C와 같은 상황) | 3초 뒤 임시 폴더 **삭제됨** |
| `sig-TERM.log` | 스크립트 PID 하나에만 SIGTERM | 빈 폴더 뼈대(0B)가 남았다. 고아가 된 `npm ci`가 계속 썼기 때문이다(P3 관찰). 남은 폴더는 리뷰어가 지웠다 |
| `b-tsconfig-split.log` | B: 도구 타입 오류 / `src` 타입 오류 | 도구 오류: typecheck **2** · build **0**(`tsconfig.build.json` 3줄). `src` 오류: build **1** |
| `base-real-build-FAIL-with-p07-tools.log` | HEAD 코드에 `docs/tools/programmer-07`만 더한 빌드 | **exit 1** — `handle-checks.ts`가 export되지 않은 `handlesIn`을 import한다. 10개 경로를 **한 커밋에** 넣어야 하는 근거다 |
| `tsconfig-build-effective.json` | `tsc -p tsconfig.build.json --showConfig` | `plugins: next` 상속 · `paths` 상속 · 대상 파일 77개 중 `docs/` 0개(루트는 83개 중 6개) |
| `build-warning-diff.log` | 기준↔작업 빌드 로그(경고·안내 줄) | 늘어난 것은 `Using tsconfig file` 3줄과 TS 플러그인 안내 1줄뿐이다 |
| `build-diff-real.log` | 실데이터(한국어·영어본 각 181) 기준↔작업 | 파일 2,162 · HTML **700/700**(한국어·404 502 · 영어 198) · JSON-LD 2,054블록 파싱 · `.rsc` 700 · body/meta/json 729 · C 속성 0 · **실패 0** |
| `build-diff-var.log` | Korean only 30장 변형 | HTML 670/670 · C 속성 60(= 30 × 2, 영어 쪽만) · **실패 0** |
| `build-diff-tool-negative.log` | 비교 도구 음성(본문 · alternateName 값 · 한국어 쪽 aria · `.rsc` · `.meta` 변조 5종) | 5/5 잡음 · exit 1 |
| `jsonld-website-main.log` | 한국어·영어 메인 WebSite JSON-LD 전문 | — |
| `a11y-work-var.log` | 작업 코드 + 변형 — 16페이지 · 181카드 · Korean only 30 | **624/624** |
| `a11y-NEGATIVE-head-code-var.log` | HEAD 코드 + 같은 변형 | **30 실패**(Korean only 30장 전부 AX 설명 없음) · exit 1 |
| `p07-handle-checks-rerun.log` | 프로그래머 07 `handle-checks.ts`를 현재 콘텐츠로 다시 실행 | **22/22** · 실데이터 362파일 옛/새 차이 0 |
| `handle-edge.log` | 리뷰어 모서리 27종 | 27/27 · 오더 문구와 결과가 다른 입력 3종 |
| `validate-head-vs-work.log` | HEAD 코드 ↔ 작업 코드 `validate:content`(콘텐츠 HEAD 2296e89) | 77줄 바이트 동일 |
| `typecheck-worktree.log` | 저장소 작업 트리 `npm run typecheck` | exit 0 |
