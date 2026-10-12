# 리뷰 — 프로그래머 07 · gate-staged-a11y-seo
**작성일**: 2026-10-12 09:20 | **리뷰어**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/processed/14-programmer-07-gate-staged-a11y-seo.md`
**대상**: 핸드오프 `docs/handoffs/programmer-07-gate-staged-a11y-seo.md` · 코드 6개 파일 · `docs/tools/programmer-07/` · 테스터 01 산출물
**도구·로그**: `docs/tools/reviewer-14/` (README에 스크래치 구성과 로그 표)

## 0. 판정

| 대상 | 판정 |
|---|---|
| **프로그래머 07 (커밋 대상 10개 경로)** | ✅ **승인 — 커밋 가능.** P1·P2 결함 0건, P3 4건(커밋을 막지 않음). 조건 1: 10개 경로를 **한 커밋에 함께** 넣는다(§1-4). 조건 2: 배포 후 Vercel에서 `tsconfigPath`가 적용됐는지 확인한다(핸드오프 미해결 1 유지) |
| **테스터 01 산출물 (6개 경로)** | 🟡 **P2 1건 — 정정 후 커밋.** 요약의 "2,268장"은 근거가 없는 수다(본문 표 합계는 284장). "미재현" 판정도 리뷰 12의 재현 조건을 시험하지 않은 범위로 좁혀 적어야 한다(§5). 독립 grep은 0건이고 코드 영향도 없다. 프로그래머 커밋을 막지 않는다 |

요약
- 게이트 `--staged`를 사용자 저장소의 미커밋 상태 68개를 그대로 재현한 스크래치 clone에서 돌렸다. 스테이징 43과 제외 25를 합하면 원본 상태와 **정확히 같다**(겹침 0, 빠짐 0). 업로더·테스터·기획자 파일이 모두 제외 목록에 찍혔다. 결과는 exit 0이고, 스테이징한 타입 오류는 exit 2·`✅` 0줄이다.
- 핸드오프 이후 HEAD가 96커밋 앞섰다(전부 콘텐츠·`docs/supervisor`, 코드 변경 0). 그래서 **현재 콘텐츠(한국어·영어본 각 181)** 로 다시 셌다: HTML **700/700**이 의도한 변경 외에 같다. Korean only 변형 AX는 **624/624**(Korean only 30/30)이고, 음성 대조(HEAD 코드)는 30건 모두 실패한다. 핸들 22/22, validate 출력 77줄은 바이트 동일이다.
- 판단 3건: (a) 이메일 경계 확장 — **수용**. (b) 영어 `alternateName` 4개 — **수용**, 효과는 사실상 0이다. (c) 빌드 경고 1줄 — **수용**, 조치는 필요 없다(§4).

---

## 1. 코드 리뷰 (diff 6개 파일)

핸드오프(10/01 14:34) 이후 이 6개 파일의 수정 시각은 10/01 14:19~14:20 그대로다. `git diff 1e494d4..HEAD`에서 콘텐츠·이미지·`history`가 아닌 경로는 `docs/supervisor/drafts/…` 1개뿐이다 → 리뷰 대상 코드는 핸드오프 시점과 같다.

| 파일 | 확인 | 판정 |
|---|---|---|
| `tsconfig.build.json` | `extends ./tsconfig.json` + `exclude: ["node_modules","docs"]`. `tsc --showConfig` 실측: `plugins: [{name:"next"}]`·`paths` 상속, 대상 77파일 중 `docs/` **0**(루트는 83 중 6), `scripts/` 1개 포함 | ✅ |
| `next.config.ts` | `typescript.tsconfigPath`. 빌드 로그에 `Using tsconfig file: tsconfig.build.json` 3줄. 빌드 뒤 `tsconfig.json`·`tsconfig.build.json` 바이트 불변(`cmp`) | ✅ |
| `src/components/post-card.tsx` | `aria-describedby`는 `koreanOnly`일 때만 값이 있다(`undefined`면 속성이 빠진다 — 실데이터 HTML에 0개). 배지는 링크 밖 `CardFooter`에 있다. `PostCard` 사용처는 `post-grid.tsx` 1곳이고, 피드 "더 보기"는 다음 페이지로 가는 링크라(카드를 이어 붙이지 않음) 한 문서에 같은 게시물은 1번만 나온다 → id 중복 경로 없음(AX 실측 16페이지 중복 0) | ✅ |
| `src/lib/content/translation.ts` | `handlesIn`의 사용처는 `attribution` 비교(원본↔영어본) 1곳뿐이고, 양쪽에 같은 함수를 쓴다. export는 도구 검사용이다 | ✅ (판단 a는 §4) |
| `src/lib/config.ts` | `SITE.alternateName` · `EN_SUBTITLE` 상수화(출력 동일 — §3 HTML 전수) · `SITE_EN.alternateName`을 `SITE`에서 만든다 | ✅ (판단 b는 §4) |
| `src/lib/seo.ts` | `websiteJsonLd`에 `alternateName` 1줄. 실측 결과 WebSite 블록에만 들어가고, 다른 `@type`에는 0개다 | ✅ |

### 1-4. 🔴 커밋 단위 조건 (실측)
HEAD 코드에 `docs/tools/programmer-07`만 더해 빌드하면 **exit 1**이다(`results/base-real-build-FAIL-with-p07-tools.log`).
`handle-checks.ts`가 이번에 새로 export한 `handlesIn`을 import하는데, `tsconfig.build.json`이 없으면 Next 빌드가 `docs/`까지 타입 검사하기 때문이다. 06-1 사고와 같은 경로다.
→ **10개 경로를 한 커밋에 넣는다.** 일부만 커밋하면 게이트(`--staged`)가 잡지만, 처음부터 함께 넣는다.

---

## 2. 게이트 스크립트 `docs/tools/programmer-07/clean-clone-gate.sh`

### 2-1. 직접 실행 (전부 스크래치 clone, 사용자 저장소의 인덱스·작업 트리 변경 없음)
스크래치: HEAD `2296e89` clone에 사용자 저장소의 미커밋 파일 **68개**(수정 6 · 미추적 62, `-uall`)를 복사했다. clone의 `git status`는 원본과 diff 0줄이다. 여기에 핸드오프의 10개 경로만 `git add` 했다.

| # | 상황 | 결과 |
|---|---|---|
| 양성 | 10개 경로 스테이징 → `--staged` | 스테이징 **43**(A 38 · M 5) · 제외 **25**(미스테이징 `history/2026-10-01.md` 1 · 미추적 24) · 포함 1102 = 꺼낸 1102 · typecheck 0 · lint 0 errors / 3 warnings(기존 3건) · validate 362/362 · 정적 708/708 · **exit 0** |
| 집합 대조 | 스테이징 ∪ 제외 vs 원본 상태 68 | 차이 **0**, 교집합 **0**. 스테이징 43 = 커밋 대상 10경로를 펼친 43파일과 같다 |
| 음성 | `src/reviewer14-negative.ts`(TS2322) 스테이징 → `--staged` | **exit 2** · `✅` **0줄** · 임시 폴더 삭제됨 |
| exit 3 | 심볼릭 링크 스테이징(인덱스 1103 / `find -type f` 1102) | **exit 3**, npm 단계 전에 멈춘다 |
| `--head` | 시험 커밋 뒤 | **exit 0** · 제외 목록 출력 정상 |
| Ctrl-C | 프로세스 그룹에 SIGINT | 임시 폴더 **삭제됨** |

- 핸드오프는 스테이징 40개라고 했다. 지금은 43개다. 늘어난 3개는 게이트 실행 **뒤에** 저장한 로그(`gate-final-staged.log`·`gate-final-head.log`·`typecheck-worktree.log`)이고, 핸드오프 본문에도 그렇게 적혀 있다. 수는 맞다.
- 제외 목록에는 테스터 01 산출물, history 10/02~10/12, 기획자 07 오더, `docs/tools/planner-07/`(기획자가 작업 중), 리뷰어 14 오더가 정확히 찍혔다.

### 2-2. 로직 검토
- `set -euo pipefail`: 단계마다 명령을 한 줄씩 두어 `&&` 함정을 피했다. 음성 실측에서 typecheck 실패 → exit 2로 전파되고 뒤 단계와 `✅`가 없다. `--worktree`의 `| while` 안 `cp` 실패도 `pipefail`로 전파된다(코드 확인).
- `trap 'rm -rf "$WORK"' EXIT`는 직접 만든 폴더에만 걸린다. 인자로 폴더를 주면 남는다(이번 B~D 빌드에 이 동작을 썼다). 실패·Ctrl-C에서 지워지는 것을 실측했다.
- `checkout-index --all`은 인덱스 내용만 꺼낸다. `git diff`·`checkout-index`(‑u 없음)는 인덱스를 쓰지 않는다.

### 2-3. P3 (커밋을 막지 않음)
| # | 내용 | 근거 |
|---|---|---|
| P3-1 | 폴더를 먼저 주면(`gate.sh <폴더> --head`) 모드 인자가 **조용히 무시되고** `--staged`로 돈다. 커밋 직후라면 인덱스가 HEAD와 같아서 검사 대상은 같지만, 머리줄의 모드 표시가 사용자 의도와 다르다. 남는 인자는 거부(exit 64)하면 된다 | `results/gate-arg-order.log` |
| P3-2 | `--worktree`의 exit 3 검사는 두 수를 모두 `find`로 같은 폴더에서 세서 **항상 같다**(무의미한 검사). `git ls-files --cached --others --exclude-standard`에서 삭제된 파일을 뺀 수와 비교해야 의미가 있다 | 스크립트 92·98행 |
| P3-3 | 스크립트 PID 하나에만 SIGTERM을 보내면 고아가 된 `npm ci`가 계속 써서 빈 폴더 뼈대(0B)가 남는다. 터미널 Ctrl-C(그룹 신호)에서는 깨끗하다. 실사용 영향은 거의 없다 | `results/sig-TERM.log` · `sig-INT-pgrp.log` |
| P3-4 | `docs/tools/programmer-07/README.md` 결과 표에 `validate-before.log`가 있는데 `results/`에는 그 파일이 **없다**(`validate-after.log`·`validate-diff.log`만 있음). 동일성 결론은 `validate-diff.log`와 리뷰어 재실측(77줄 바이트 동일)으로 뒷받침된다 | `ls results/` |
- 참고: 심볼릭 링크가 커밋되면 `--staged`는 exit 3으로 **막는 쪽으로** 틀린다(안전한 방향). 현재 추적 파일 1,064개는 모두 `100644`이다.
- 참고: detached HEAD 저장소에서 `--head`를 쓰면 git 안내문이 찍히고 "푸시 대상" 줄이 없다. 실제 저장소는 `main`이고 upstream은 `origin/main`이라 해당 없다.

---

## 3. 재실측 (현재 콘텐츠 기준 — 한국어 181 · 영어본 181, HEAD 2296e89)

| 항목 | 핸드오프 | 리뷰어 재실측 |
|---|---|---|
| **B** 도구 타입 오류 | typecheck 2 / build 0 | typecheck **2** / build **0**(`tsconfig.build.json` 3줄) |
| **B** `src` 타입 오류 | build 1 | build **1**(`Failed to compile`) |
| **C** Korean only AX(변형) | 491/491 · Korean only 21/21 | 다른 변형(30장 제거)으로 리뷰어 도구 **624/624** · Korean only **30/30**, 16페이지·181카드, 페이지 id 중복 0, `aria-describedby` 대상 각 1개, 링크 이름에 "Korean only" 섞이지 않음, Korean only 링크는 `/post/{id}`·`hreflang=ko`·`lang=ko` |
| **C** 음성 | HEAD 코드 63 실패 | HEAD 코드 + 같은 변형 → **30 실패**(30장 전부 AX 설명 없음) |
| **C** 실데이터 | Korean only 0 | 영어본 181/181 → C 속성 **0개**(HTML 전수) |
| **D** 단위·실데이터 | 22/22 · 284파일 차이 0 | `handle-checks.ts` **22/22** · 실데이터 **362**파일 옛/새 차이 0 · 영어본 핸들 경고 0. 리뷰어 모서리 **27/27** |
| **D** validate 출력 | 77줄 동일 | HEAD 코드 ↔ 작업 코드 **77줄 바이트 동일**(362파일, exit 0/0) |
| **E** HTML 전수 | 544/544 | **700/700**(한국어·404 502 · 영어 198). JSON-LD **2,054블록** 모두 파싱, 페이지마다 WebSite 1개, alternateName 기대값 일치 700, WebSite 밖 alternateName 0. `.rsc` **700/700**, body/meta/json **729** 바이트 동일, 파일 2,162 누락·추가 0 |
| **E** 변형 빌드 | 523/523 | 670/670 · C 속성 60 = 30 × 2(영어 쪽에만) |
| 비교 도구 음성 | 4건 잡음 | 리뷰어 도구 5종 변조 **5/5** 잡음 |

- 리뷰어 비교 도구(`build-diff.mjs`)는 프로그래머 도구와 따로 만들었다. 정규화에서 두 가지를 실측으로 확인했다. ① 클라이언트 참조 행의 청크 목록은 빌드마다 다른 청크 그룹을 고를 수 있다(같은 `FloatingBannerLink`를 기준은 `(en)/layout`, 작업은 `(ko)/layout` 청크로 참조했다). ② `alternateName`만큼 페이로드가 길어져 RSC push 조각이 1개 느는 페이지가 있다. 그래서 둘 다 정규화했다. 내용 비교는 JSON-LD 객체 단위와 RSC 문자열 단위로 따로 한다.
- 서버 `.js` 33개 중 21개는 내용이 다르다. 코드(config·post-card)가 번들에 들어가므로 예상한 차이이고, 판정에서는 뺐다.

---

## 4. 판단 요청 3건

### (a) 핸들 정규식 이메일 경계를 오더보다 넓힌 것 — ✅ 수용
- 넓힌 경계 때문에 오더 문구("앞 글자가 영숫자면 제외")와 결과가 달라지는 입력은 **3종**이다(`results/handle-edge.log`). `john_@example.com`(이메일, 넓힌 쪽이 맞다), `출처.@abc`·`출처-@abc`(핸들인데 놓친다).
- 실데이터 attribution 362개에 든 `@` **360개는 모두 바로 앞이 공백**이다(리뷰어 집계). 그래서 놓치는 경우가 실데이터에는 0건이다.
- 놓치더라도 오탐 경고가 생기지 않고, 그 핸들의 누락·추가 검사만 빠진다. 비교는 양쪽에 같은 함수를 쓴다. 이메일 오탐을 막는 이득이 더 크다.
- 참고(이전부터 같음): `Threads@abc`처럼 영숫자에 바로 붙은 핸들은 오더 문구대로 해도 놓친다. 표기 관례("플랫폼명 공백 @핸들")가 지켜지는 한 문제없다.

### (b) 영어 `alternateName` 4개 값 — ✅ 수용 (검색 효과는 사실상 0, 손해도 없음)
- Google 사이트 이름 문서(developers.google.com/search/docs/appearance/site-names, 2026-10-12 확인)에는 이렇게 적혀 있다. "WebSite structured data must be on the home page", "**does not support site names at the subdirectory level**", "Avoid using a generic name". → `/en`은 서브디렉터리라 이 블록이 Google 사이트 이름에 쓰이지 않는다. 브랜드 검색 보조의 본체는 한국어 홈의 `["공산당이 싫어요","ihatekongsandang"]`이다(핸드오프 판단과 같다).
- `Korea Politics & Security Brief` 단독 값은 Google 기준으로 일반명에 가까워서, 도메인 홈에 있었더라도 사이트 이름으로 뽑힐 가능성이 낮다. 다만 이 값은 슈퍼바이저가 확정한 부제 그대로이고 새 문구가 아니다. `/en`에 있어서 Google 사이트 이름과도 무관하다. JSON-LD를 읽는 다른 소비자(LLM 등)에게는 영어 페이지의 설명적 별칭 정도로 읽힌다 → **유지해도 되고, 빼도 잃는 것이 없다. 바꿀 필요는 없다.**
- 나머지 3개(`공산당이싫어요`·`공산당이 싫어요`·`ihatekongsandang`)는 실제 브랜드 표기 변형이라 적절하다.

### (c) B로 새로 생긴 Next 빌드 경고 1줄 — ✅ 수용, 조치 불필요
- 기준↔작업 빌드 로그 비교(`results/build-warning-diff.log`): 늘어난 줄은 `Using tsconfig file: tsconfig.build.json` 3줄과 안내 1줄("Your tsconfig.json extends another configuration… cannot add the Next.js TypeScript plugin automatically")뿐이다.
- `tsc --showConfig` 실측 결과, 빌드용 설정에도 `plugins: [{"name":"next"}]`가 **상속돼 있다**. 안내문은 Next가 extends 파일에 자동으로 쓸 수 없다는 뜻일 뿐이고, 실효 설정에는 빠진 것이 없다. 편집기는 루트 `tsconfig.json`을 쓴다. 빌드 출력은 §3대로 의도한 변경 외에 같다.

---

## 5. 테스터 01 산출물 간이 확인 — 🟡 P2 1건

| 확인 | 결과 |
|---|---|
| "2,268장" | 🔴 **근거 없는 수.** `results.md` §1·§2 표는 한국어 142 + 영어 142 = **284장**(페이지마다 카드 수 = `<img>` 수 = 로드 수)이다. 2,268은 표나 다른 기록 어디에서도 나오지 않는다. 핸드오프·트리거·results 요약 3곳에 같은 수가 있다 |
| 2,268(→284) 대비 `/_next/image` 161건 | 문서에 **차이 설명이 없다.** "161건 전수 200/304"는 `read_network_requests`에 **잡힌 요청** 기준이다. 로드된 284장보다 적으니 "모든 이미지 요청이 200/304"라는 근거는 되지 못한다. 왜 적게 잡혔는지(캡처 범위·브라우저 캐시 등)는 **확인 필요**. 이미지가 다 떴다는 근거는 `naturalWidth>0` 284/284뿐이다 |
| "미재현" 판정 범위 | 리뷰 12의 재현 조건은 "**캐시가 빈 서버**에 이미지 요청을 보내고 **최적화 중(400ms)에 끊은 뒤** 재요청"이다(`reviewer-12/results/image-hang-repro.log`). 테스터 §3은 "각 navigate 호출이 페이지 로드 완료까지 대기 — 이미지 요청을 끊지 않고 완료"라고 적었다. 즉 **트리거를 시험하지 않았다.** 데이터가 뒷받침하는 결론은 "배포 도메인, 데스크톱 1280px, 휠 스크롤 조건에서 피드 이미지 284/284 로드"까지다. "배포 도메인 멈춤 재현 여부"는 **확인 필요**로 적어야 맞다(모바일 390px 미측정도 이미 확인 필요로 적혀 있다) |
| `?page=N` 측정 경로 | 유효하다 — `src/middleware.ts`가 `/?page=n`·`/en?page=n`을 정적 `/page/n`·`/en/page/n`으로 rewrite한다. 12페이지째 10장도 142건 기준 페이지네이션과 맞다 |
| 스크린샷 jpg | 사이트 화면만 있다(계정·브라우저 UI 노출 없음, 리뷰어가 직접 봄) |
| 독립 grep | 6개 파일 **0건**(바이너리 포함 `grep -a`) |

**권고**: 테스터(Sonnet 5) 정정 오더로 ① 2,268 → 표 기준 284로 고치거나 출처를 대고, ② 161건의 범위를 "캡처된 요청"으로 명시하고, ③ 판정을 위 범위로 좁힌다. 그 뒤 6개 경로를 커밋한다. 이번 프로그래머 커밋과는 독립이다.
(실사용 영향 판단: 평소 열람에서 이미지가 뜨지 않는 증상은 관찰되지 않았다. 긴급도는 낮다.)

---

## 6. 독립 grep (저장소 독립 원칙)

pre-commit 훅 패턴에 홈 디렉터리명, 임시·사용자 폴더 절대경로, 사용자의 다른 프로젝트명 여러 종을 더한 패턴으로 검사했다(패턴 자체는 산출물에 적지 않는다).
| 대상 | 파일 수 | 결과 |
|---|---|---|
| 프로그래머 07 커밋 대상(10경로를 펼친 파일 + 코드 diff `+`줄) | 43 | **0건** |
| 테스터 01 산출물 | 6 | **0건** |
| 리뷰어 14 산출물(보고서 · 트리거 · 오더 · `docs/tools/reviewer-14/` 전체) | §7 목록 | **0건**(작성 후 재검사) |

---

## 7. 커밋 대상 최종 목록

### ✅ 이번 커밋 (프로그래머 07 + 리뷰어 14) — 🔴 한 커밋에 함께
```
next.config.ts
tsconfig.build.json
src/components/post-card.tsx
src/lib/config.ts
src/lib/seo.ts
src/lib/content/translation.ts
docs/tools/programmer-07
docs/handoffs/programmer-07-gate-staged-a11y-seo.md
docs/triggers/programmer-07-gate-staged-a11y-seo-COMPLETE.md
instructions/programmer/processed/07-gate-staged-a11y-seo.md
docs/reviews/programmer-07-gate-staged-a11y-seo-review.md
docs/tools/reviewer-14
docs/triggers/reviewer-14-programmer-07-gate-staged-a11y-seo-COMPLETE.md
instructions/reviewer/processed/14-programmer-07-gate-staged-a11y-seo.md
```
- 리뷰어 오더 원본 `instructions/reviewer/14-…md`는 미추적이었다 → 삭제 항목은 없다.
- `docs/tools/reviewer-14`에는 `.mjs` 3개가 있다. 루트 typecheck 대상은 아니지만 작업 트리 `npm run typecheck` exit 0, `eslint` 0건이다.
- 커밋 뒤 절차(핸드오프와 같다): `bash docs/tools/programmer-07/clean-clone-gate.sh`(모드 인자를 **맨 앞에** — P3-1) → 스테이징 목록이 위 14경로를 펼친 파일과 같은지, 제외 목록에 업로더·기획자·테스터 파일만 있는지 확인 → exit 0 → 커밋 → `--head` exit 0 → 푸시 → Vercel `success` + 빌드 로그 `Using tsconfig file: tsconfig.build.json` 확인 → 메인 `curl` 1회로 `alternateName` 확인.

### 🟡 보류 — 테스터 01 (정정 후 커밋, §5)
```
docs/handoffs/tester-01-deployed-image-loading.md
docs/qa/tester-01
docs/tools/tester-01
docs/triggers/tester-01-deployed-image-loading-COMPLETE.md
instructions/tester/processed/01-deployed-image-loading.md
```

### 제외 (이 리뷰 대상 아님)
`history/*`(슈퍼바이저 판단) · `content/`·`public/images/`(업로더) · `instructions/planner/07-…`·`docs/tools/planner-07/`(기획자 진행 중) · `docs/triggers/supervisor-2026-10-12-…`

---

## 8. 미해결·다음 액션
1. Vercel `tsconfigPath` 적용 여부 — 배포 후 확인(슈퍼바이저).
2. 게이트 P3-1~P3-4 — 다음 프로그래머 오더에 묶어 처리를 권고한다(급하지 않음).
3. 테스터 01 정정(§5) — 테스터 오더. 배포 도메인에서 리뷰 12 트리거를 시험하려면 요청을 의도적으로 끊어야 한다. 이는 오더 §3의 "자동 대량 요청 금지"와 충돌하므로, 시험할지는 슈퍼바이저·사용자가 정한다.
