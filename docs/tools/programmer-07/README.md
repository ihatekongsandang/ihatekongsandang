# 프로그래머 07 — 도구·결과

| 파일 | 용도 | 실행 (저장소 루트) |
|---|---|---|
| `clean-clone-gate.sh` | 🔴 **커밋 전·푸시 전 게이트(06-1 게이트 후속판)**. `--staged`(기본) · `--head` · `--worktree` | `bash docs/tools/programmer-07/clean-clone-gate.sh [--staged\|--head\|--worktree] [작업 폴더]` |
| `handle-checks.ts` | D 핸들 정규식 모서리 16 + validateTranslation 경유 4 + 실데이터 전수 2 | `npx tsx docs/tools/programmer-07/handle-checks.ts` |
| `build-variants.sh` | 기준(HEAD)↔작업 빌드 4종(실데이터·Korean only 변형)을 한 폴더에서 차례로 생성 | `bash docs/tools/programmer-07/build-variants.sh <스크래치 폴더>` |
| `html-diff.mjs` | 빌드 출력 전수 비교: HTML(JSON-LD 포함)·HTML 속 RSC·`.rsc`·`.body`·`.meta`·`.json`. 의도한 E·C만 걷어 내면 같아야 한다 | `node docs/tools/programmer-07/html-diff.mjs <기준 app> <작업 app>` |
| `a11y-describedby.mjs` | C 영어 피드 전 페이지 AX 트리 — Korean only 링크 설명 전수 | `node docs/tools/programmer-07/a11y-describedby.mjs <baseUrl> <콘텐츠 폴더>` |
| `jsonld-website.mjs` | E 메인 WebSite JSON-LD 출력 + HTML 전수 JSON-LD 파싱·alternateName 일치 | `node docs/tools/programmer-07/jsonld-website.mjs <app 폴더>` |

## 게이트 사용법 (슈퍼바이저)
1. 리뷰어 판정 뒤 커밋 대상만 `git add <경로>` (`git add -A` 금지 — 업로더와 인덱스 공유).
2. `bash docs/tools/programmer-07/clean-clone-gate.sh` (= `--staged`). 첫 줄들에서 **스테이징된 변경 목록**이 내 커밋 대상과 같은지,
   **제외 목록**(미스테이징·미추적)에 업로더 작성 중 파일이 들어 있는지 확인. 마지막 줄 `✅ 깨끗한 복제본 게이트 통과 (--staged)` + exit 0.
3. 커밋 → `bash docs/tools/programmer-07/clean-clone-gate.sh --head` → exit 0 → 푸시.
   (`--head`는 HEAD 커밋 자체를 clone 하므로 그 사이 업로더가 커밋한 내용까지 포함된다 — "푸시 대상" 목록으로 확인.)
- 작업 폴더를 주지 않으면 임시 폴더를 만들고 끝날 때(실패 포함) 지운다. 실행 1회 2~3분, 패키지를 새로 받는다.

## 결과 (`results/`, 경로는 `$SCRATCH`·`$TMPDIR`·`$HOME`으로 치환)
| 로그 | 내용 | 결과 |
|---|---|---|
| `gate-positive-staged.log` | HEAD 복제본, 스테이징 없음 `--staged` | 944파일 · exit 0 |
| `gate-positive-head.log` | 같은 복제본 `--head` | 944파일 · exit 0 |
| `gate-negative1-staged-error.log` | 타입 오류 파일 **스테이징** → `--staged` | TS2322 · exit 2 · ✅ 0줄 |
| `gate-negative1b-staged-error-worktree-fixed.log` | 인덱스=오류, 작업 트리=고침(미스테이징) → `--staged` | 인덱스 내용으로 검사 · exit 2 · ✅ 0줄 · 제외 목록에 `M src/gate-negative.ts` |
| `gate-negative2-untracked-only.log` | 같은 오류 파일 **미추적만** → `--staged` | 통과 exit 0 · 제외 목록에 `src/gate-negative.ts` |
| `gate-contrast-worktree-untracked.log` | 같은 상태 `--worktree`(대비) | 미추적 포함 → exit 2 |
| `gate-negative3-head-commit-error.log` | 오류를 커밋(작업 트리는 고침) → `--head` | exit 2 · ✅ 0줄 |
| `gate-final-staged.log` · `gate-final-head.log` | HEAD `1e494d4` 복제본에 커밋 대상 10개 경로 스테이징(+검증 실패하는 미추적 초안) → `--staged`, 시험 커밋 → `--head` | 스테이징 40 · 제외 1 · 포함 982 · 둘 다 exit 0 |
| `build-variants.log` | 빌드 4종 | 전부 exit 0 (HTML 544 · 523) |
| `html-diff-base-real-vs-work-real.log` | 실데이터 기준↔작업 | HTML 544/544(한국어·404 390 · 영어 154) · RSC 544 · `.rsc` 544/544 · body 6 · meta 550 · json 17 · 실패 0 |
| `html-diff-base-var2-vs-work-var.log` | Korean only 21장 변형 | HTML 523/523 · Korean only 연결 21 · 실패 0 |
| `html-diff-base-var-vs-work-var.log` | 같은 변형, 첫 기준 빌드 | `sitemap.xml/route.js.nft.json` 1건만 다름 — 기준(HEAD 코드) 빌드의 추적 목록이 그 회차에만 콘텐츠 263개를 담음. 같은 조건 재빌드(`base-var2`)는 작업과 동일 → 빌드 추적의 회차 간 흔들림, 이번 변경과 무관 |
| `html-diff-tool-negative.log` | 비교 도구 음성 대조(본문·alternateName·aria·`.rsc` 변조 4건) | 4건 모두 잡음 · exit 1 |
| `a11y-describedby-var.log` | 변형 빌드 AX — 12페이지 · 141카드 · Korean only 21 | 491/491 |
| `a11y-describedby-real.log` | 실데이터 빌드 AX — Korean only 0(영어본 141/141) | 449/449 |
| `a11y-describedby-NEGATIVE-head-code.log` | HEAD 코드 + 변형 | 63 실패(21×3) · exit 1 |
| `reviewer12-a11y-cards-work-var.log` | 리뷰어 12 기존 AX 검사(읽기 순서·배지 위치) 회귀 | 597/597 |
| `jsonld-website-work-real.log` | 메인 JSON-LD 2종 출력 · HTML 544 · JSON-LD 1,599블록 파싱 | 실패 0 |
| `jsonld-website-NEGATIVE-base-real.log` | 기준 빌드에 같은 검사 | 546 실패 · exit 1 |
| `b-tsconfig-build-split.log` | B: 도구 타입 오류 → typecheck exit 2 · build exit 0 / `src` 타입 오류 → build exit 1 | 기대대로 |
| `tsx-tools.log` | 도구 tsx 6종(기존 5 + 이번 1) | 6/6 exit 0 |
| `tsx-reviewer-12-attribution-edge.log` | 리뷰어 12 도구 현재 출력 — "핸들 뒤 마침표"·"이메일" 관찰의 잘못된 경고가 사라짐 | exit 0 |
| `validate-diff.log` · `validate-before.log` · `validate-after.log` | 같은 콘텐츠 스냅샷(한국어 142·영어본 142)에서 HEAD 코드 ↔ 작업 코드 `validate:content` | 77줄 전부 동일 |
| `handle-checks.log` | D 단위·실데이터 | 22/22 · 실데이터 284파일 옛/새 차이 0 · 영어본 핸들 경고 0 |
| `typecheck-worktree.log` | 산출물을 모두 넣은 뒤 **저장소 작업 트리에서** `npm run typecheck`(리뷰 13 제안 2) | exit 0 |
