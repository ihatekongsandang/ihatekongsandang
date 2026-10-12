# 프로그래머 세션 — 07-gate-staged-a11y-seo 핸드오프
**작성일**: 2026-10-01 14:34 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
- **A 게이트**: `docs/tools/programmer-07/clean-clone-gate.sh`는 기본값이 `--staged`다. git 인덱스 내용만 꺼내 검사하고, 필요하면 `--head`(HEAD clone)·`--worktree`(06-1 동작)를 쓴다. 실행하면 모드·포함 파일 수·스테이징 목록·**제외 목록**을 먼저 출력하고, 직접 만든 임시 폴더는 끝날 때(실패 포함) `trap`으로 지운다. 스크래치 복제본에서 양성 2·음성 3(+대비 2)을 실측했고 모두 기대대로 나왔다.
- **B 빌드 전용 tsconfig**: `tsconfig.build.json`(`docs` 제외)과 `next.config.ts`의 `typescript.tsconfigPath`를 추가했다. 도구에 타입 오류가 있을 때 build는 exit 0, 루트 `npm run typecheck`는 exit 2였다. `src`에 타입 오류가 있으면 build는 여전히 exit 1로 막힌다. 도구 tsx 6/6 exit 0.
- **C·D·E**: Korean only 배지를 `aria-describedby`로 연결했다(AX 491/491, Korean only 21/21). 핸들 정규식은 끝 마침표와 이메일을 제외한다(22/22, 실데이터 284파일 차이 0). WebSite JSON-LD에 `alternateName`을 추가했다. 빌드 출력 전수 비교에서 E·C를 걷어 내면 HTML 544/544·`.rsc` 544/544가 같다.

## 🔴 커밋 대상 파일 (슈퍼바이저가 그대로 `git add <경로>`)
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
```
- `docs/tools/programmer-07`은 폴더 통째로 넣는다(스크립트 6 + README + `results/` 로그).
- 오더 원본 `instructions/programmer/07-…md`는 **미추적 상태에서 옮겼다**. 그래서 삭제 항목이 없고, processed 파일 하나만 추가하면 된다.
- `history/2026-10-01.md`: 슈퍼바이저 기록과 함께 미커밋 상태이고, 내 줄은 맨 끝에 append만 했다. 커밋 여부와 시점은 슈퍼바이저가 정한다.
- **넣지 않는 것**: `instructions/tester/01-…`(슈퍼바이저 오더), `content/`·`public/images/`(업로더). 이번 작업은 이 두 경로를 수정하지 않았다.
- 위 10개 경로를 HEAD 복제본에 그대로 스테이징하고 새 게이트를 돌린 최종 결과는 아래 "최종 게이트"에 있다.

## 산출물
| 경로 | 설명 |
|---|---|
| `docs/tools/programmer-07/clean-clone-gate.sh` | 새 게이트(`--staged` 기본 · `--head` · `--worktree`) |
| `docs/tools/programmer-07/handle-checks.ts` · `html-diff.mjs` · `a11y-describedby.mjs` · `jsonld-website.mjs` · `build-variants.sh` | 검증 도구 |
| `docs/tools/programmer-07/README.md` · `results/` | 사용법, 결과 로그 표 |
| `tsconfig.build.json` · `next.config.ts` | B |
| `src/components/post-card.tsx` | C — 링크 `aria-describedby`, 배지 `id="korean-only-{id}"` |
| `src/lib/content/translation.ts` | D — `handlesIn` 정규식 경계, 도구가 검사할 수 있게 export |
| `src/lib/config.ts` · `src/lib/seo.ts` | E — `SITE.alternateName` · `SITE_EN.alternateName` → `websiteJsonLd` |

## A. 게이트 (리뷰 13 P2-1·P3-1·P3-2)
| 항목 | 구현 |
|---|---|
| `--staged`(기본) | `git checkout-index --all --prefix=…`로 **인덱스 내용**을 꺼낸다. 작업 트리 파일은 읽지 않는다. 포함 수 = `git ls-files` 수 = 꺼낸 파일 수(다르면 exit 3) |
| `--head` | `git clone --no-hardlinks` → `checkout --detach <HEAD sha>`. upstream이 있으면 "푸시 대상 커밋 N개" 목록도 출력한다 |
| `--worktree` | 06-1 동작 그대로(추적 + 무시되지 않는 미추적, 작업 트리 내용) |
| 시작 출력 | 모드 · HEAD · 스테이징된 변경(`--name-status`) · **제외 — 미스테이징 변경 / 미추적 파일**(`--head`는 "스테이징만 되고 커밋 안 됨"도 함께) · 포함 파일 수 |
| P3-1 | 작업 폴더를 주지 않으면 `mktemp -d` 후 `trap 'rm -rf' EXIT`. 이번 7회 실행 뒤 임시 폴더 7개가 모두 없어진 것을 `ls`로 확인했다(실패한 회차 포함). 작업 폴더를 인자로 주면 지우지 않는다 |
| P3-2 | 주석 순서를 실제 순서(typecheck → lint → build(validate))로 고쳤다 |
| 기타 | `set -euo pipefail` · 알 수 없는 옵션은 exit 64 · 기존 `programmer-06-1/clean-clone-gate.sh`는 **수정하지 않았다** |

검증(전부 스크래치 clone. **사용자 저장소의 인덱스와 작업 트리는 건드리지 않았다**):
| # | 상황 | 결과 |
|---|---|---|
| 양성 | HEAD 그대로 `--staged` / `--head` | 944파일 · exit 0 / exit 0 |
| 음성 ① | 타입 오류 파일 스테이징 → `--staged` | TS2322 · **exit 2** · `✅` 0줄 |
| 음성 ①-b (추가) | 인덱스에는 오류, 작업 트리에서는 고침 → `--staged` | **exit 2**. 작업 트리가 아니라 인덱스를 본다는 증거 |
| 음성 ② | 같은 파일을 미추적으로만 둠 → `--staged` | **exit 0**, 제외 목록에 `src/gate-negative.ts` 표시 |
| 대비 (추가) | 같은 상태에서 `--worktree` | exit 2(미추적까지 넣는 06-1 동작) |
| 음성 ③ | 오류를 커밋하고 작업 트리는 고침 → `--head` | **exit 2** · `✅` 0줄 |

## B. 빌드 전용 tsconfig
- `tsconfig.build.json`의 내용은 `{"extends":"./tsconfig.json","exclude":["node_modules","docs"]}`다. `exclude`는 상속 시 합쳐지지 않고 바뀌므로 `node_modules`를 다시 적었다. `include`는 루트 값을 그대로 쓴다.
- `next.config.ts`: `typescript: { tsconfigPath: 'tsconfig.build.json' }`. 주석에 근거(06-1 사고)와 루트를 바꾸지 않는 이유를 적었다.
- 작업 빌드 로그마다 `Using tsconfig file: tsconfig.build.json`이 3회 찍혔고, 기준 빌드에서는 0회였다. 빌드 뒤 `tsconfig.json`·`tsconfig.build.json`은 바뀌지 않았다(`cmp`·`git diff`).
- `b-tsconfig-build-split.log`: 리뷰어 12 도구 수정을 되돌린 사본에서 `npm run typecheck` **exit 2**(TS18048 5건), `VERCEL=1 CI=1 npm run build` **exit 0**(정적 552/552)이었다. `src/gate-negative.ts`에 타입 오류를 넣으면 build는 **exit 1**(`Failed to compile`)이었다.
- 도구 tsx는 **6종 6/6 exit 0**이다: `programmer-05/unit-checks.ts` 53/53, `programmer-05-1/unit-checks.tsx` 25/25, `programmer-06/unit-checks.tsx` 35/35, `reviewer-11`·`reviewer-12` attribution-edge, `programmer-07/handle-checks.ts` 22/22. 저장소 작업 트리에서 실행했다.
- ⚠️ 빌드에 쓰이는 Next 15 경고 "Your tsconfig.json extends another configuration… cannot add the Next.js TypeScript plugin automatically"가 새로 찍힌다. 플러그인은 루트 `tsconfig.json`에 이미 있다(편집기용). 빌드 결과에는 영향이 없다(HTML 전수 동일).
- **Vercel 실제 환경에서 `tsconfigPath`가 적용되는지는 로컬로 알 수 없다. 배포 후 확인이 필요하다**(Vercel 빌드 로그에 `Using tsconfig file: tsconfig.build.json`이 나오는지).

## C. Korean only → `aria-describedby` (리뷰 12 P2-1)
- 링크에 `aria-describedby="korean-only-{post.id}"`를 달고, 배지 `<span>`에 같은 `id`를 줬다. 배지는 전처럼 링크 **밖**(`CardFooter`)에 있어서 `lang="ko"` 링크 안에 영어 문구가 들어가지 않는다. 탭 정지점은 1개다. 한국어 카드와 영어본 카드는 속성 없이 이전과 같다.
- id 규칙: 게시물 id는 스키마에서 `^[a-z0-9]+(?:-[a-z0-9]+)*$`로 검증된다. 한 피드 페이지에 같은 게시물은 한 번만 나온다. `useId`를 쓰지 않은 이유는 HTML에서 무엇을 가리키는지 읽히고 렌더마다 같아서다.
- **실데이터에는 Korean only 카드가 0장**이다(한국어 141 = 영어본 141, 빌드 시점). 그래서 영어본을 이름순으로 7개마다 하나씩 뺀 **스크래치 변형 콘텐츠**(Korean only 21장)로 실측했다.
  - `a11y-describedby-var.log`: 12페이지 · 141카드 · Korean only **21/21**(기대 21). 링크 AX 이름은 제목 그대로, AX 설명은 "Korean only"였다. 대상 1개 · 카드 안 · 링크 밖 · 실효 언어 en · 페이지 id 중복 0 → **491/491**
  - 음성: HEAD 코드에 같은 콘텐츠 → **63 실패**(21×3), exit 1
  - 실데이터 작업 빌드: Korean only 0, 영어본 카드 141장 모두 설명·속성 없음 → **449/449**
  - 회귀: 리뷰어 12 `a11y-cards.mjs`(읽기 순서·배지가 AX 마지막·링크 밖) **597/597**

## D. 핸들 정규식 (리뷰 12 P2-2)
- `/(?<![A-Za-z0-9._%+-])@[A-Za-z0-9._]*[A-Za-z0-9_]/g`: 끝 글자에서 `.`을 제외한다. `@` 바로 앞이 **이메일 로컬 파트 문자**(영숫자 `.` `_` `%` `+` `-`)면 핸들로 보지 않는다.
  - 오더 문구는 "앞 글자가 영숫자면"이었다. 하지만 `john_@example.com`처럼 로컬 파트가 `_`·`.`·`+`·`-`로 끝나는 이메일도 막아야 해서 범위를 넓혔다(단위 검사에 포함). 공백·괄호·한글 뒤나 문자열 맨 앞의 `@`는 그대로 핸들이다.
- 단위 검사: 오더의 모서리 4종(`@2.pro.official.`→`@2.pro.official`, `editor@example.com`→없음, `(@a_b)`→`@a_b`, `@a.b`→`@a.b`)에 12종을 더해 16종, validateTranslation 경유 4종(마침표·이메일 경고 0, 누락·추가 경고 유지)을 확인했다.
- 실데이터 전수(저장소 작업 트리, 한국어 142·영어본 142): attribution 284개 전부에서 옛 정규식과 새 정규식의 결과 차이가 **0**이다. 영어본 142건을 그대로 validateTranslation에 넣었을 때 핸들 경고는 **0**이다 → `handle-checks.log` **22/22**
- 기존 경고와의 차이: 같은 콘텐츠 스냅샷에서 HEAD 코드와 작업 코드로 `validate:content`를 돌렸다. 출력 **77줄이 전부 같다**(`validate-diff.log`).
- 리뷰어 12 도구의 관찰 출력에서 "핸들 뒤 마침표"·"이메일 주소 포함"의 잘못된 경고가 사라졌다(`tsx-reviewer-12-attribution-edge.log`). 그 도구의 실데이터 오탐 검사(종료 코드)는 그대로 0이다.
- `content/README.md`는 고치지 않았다. 기존 문구 "계정 핸들(`@…`)이 빠짐 · 원본에 없는 핸들이 들어감"이 지금 동작과도 맞고, 이번 가동 지시가 `content/` 수정을 금지했기 때문이다.

## E. WebSite JSON-LD `alternateName`
- 값은 `config.ts`에서 관리한다. 한국어 `SITE.alternateName = ['공산당이 싫어요', 'ihatekongsandang']`는 오더 지정값이다.
- 영어 `SITE_EN.alternateName = ['공산당이싫어요', '공산당이 싫어요', 'Korea Politics & Security Brief', 'ihatekongsandang']`는 **판단값**이다.
  근거: 영어 사이트명은 "한국어 이름 + 괄호 영문 부제" 한 덩어리다(슈퍼바이저 확정, 프로그래머 05 §5). 그래서 그 구성 요소를 각각 별칭으로 뒀다. 한국어 이름 단독은 영어 머리글·바닥글도 `nameKo`로 따로 그린다. 여기에 한국어 띄어쓰기 표기, 괄호를 뺀 영문 부제, 슬러그를 더했다. 새 문구는 만들지 않았다. 값은 `SITE.name`·`SITE.alternateName`·`EN_SUBTITLE`에서 만든다. `EN_SUBTITLE`은 기존 `name`·`subtitle` 문자열을 상수로 뺀 것으로, 출력은 같다(HTML 전수 동일).
- `websiteJsonLd`에서 `name` 바로 다음에 `alternateName`을 둔다. 이 JSON-LD는 레이아웃(`(ko)`·`(en)`)과 `global-not-found`가 내므로 **모든 페이지**에 들어간다. `AboutPage`·`CollectionPage`의 `isPartOf` WebSite에는 넣지 않았다.
- 실측(`jsonld-website-work-real.log`): 한국어·영어 메인 WebSite 블록 전문이 로그에 있다. HTML 544개의 JSON-LD **1,599블록이 모두 파싱**되고, WebSite alternateName은 한국어·404 **390**, 영어 **154**에서 기대값과 같다. 같은 검사를 기준 빌드에 돌리면 546건 실패(음성).
- 출력 차이 = 이 항목만(`html-diff-base-real-vs-work-real.log`): 작업 쪽에서 언어별 기대 문자열 `"alternateName":[…],`(파일마다 정확히 1회, WebSite `name` 다음 위치)와 C 속성만 걷어 냈을 때 결과는 다음과 같다. **HTML 544/544 동일**(한국어·404 390 · 영어 154), HTML 속 RSC 544 동일, `.rsc` 544/544 동일, `.body`(sitemap·robots·llms.txt·OG 이미지·아이콘) 6/6 · `.meta` 550/550 · `.json` 17/17 바이트 동일, 누락·추가 0. 실데이터에서 Korean only 속성은 0개다.
- Google 사이트 이름은 도메인 홈 기준으로 정해지므로, `/en`의 alternateName이 실제 검색 표시에 쓰일지는 **확인 필요**다. 한국어 홈 값이 브랜드 검색 보조의 본체다.

## 최종 게이트 (커밋 대상 10개 경로를 스테이징한 HEAD 복제본)
HEAD `1e494d4`(업로더 커밋 반영)를 스크래치에 clone했다. 위 10개 경로를 저장소 작업 트리에서 복사해 `git add`하고, 업로더가 작성 중인 상황을 흉내 내려고 **검증에 실패하는 미추적 초안** `content/posts/zz-draft-simulated.md`를 함께 두었다.
| 단계 | 결과 | 로그 |
|---|---|---|
| `--staged` | 스테이징 변경 **40개**(A 35 · M 5 — 위 10개 경로 그대로), 제외 = 미추적 초안 1개, 포함 982 · typecheck 0 · lint 0 errors / 3 warnings(기존과 같은 3건) · validate 284/284 · `tsconfig.build.json` 사용 · 정적 554/554 · **exit 0** | `results/gate-final-staged.log` |
| 시험 커밋 → `--head` | 푸시 대상 1커밋, 제외 = 미추적 초안 1개, 포함 982 · 같은 결과 · **exit 0** | `results/gate-final-head.log` |
- 산출물을 모두 넣은 뒤 **저장소 작업 트리에서** `npm run typecheck` exit 0(`results/typecheck-worktree.log`, `docs/tools/programmer-07/handle-checks.ts` 포함) · `eslint docs/tools/programmer-07 src next.config.ts` exit 0.
- 두 실행의 임시 폴더는 모두 지워졌다. 이 두 로그와 README 갱신은 게이트 실행 **뒤에** 저장했다(`.log`·`.md`라 빌드 결과에 영향 없음).

## 미해결·이슈
1. **Vercel `tsconfigPath` 적용 여부는 배포 후 확인이 필요하다**(B). 커밋·푸시 뒤 Vercel 빌드 로그 또는 배포 성공 여부로 본다.
2. 빌드 추적 흔들림(관찰): 변형 콘텐츠 첫 기준 빌드에서 `sitemap.xml/route.js.nft.json`의 추적 목록에 콘텐츠 263개가 들어갔다. 같은 조건으로 다시 빌드하자 작업 빌드와 같아졌다(55개). HEAD 코드 빌드에서 일어난 일이라 이번 변경과는 무관하다. sitemap은 정적 프리렌더(`.body` 동일)라 서비스 출력에도 영향이 없다. 원인은 조사하지 않았다(**확인 필요**).
3. 빌드 경고 1줄이 늘었다(B, Next TS 플러그인 자동 추가 불가 안내). 무해하지만 리뷰어 판단 대상이다.
4. 실데이터 Korean only 카드가 0장이라, 배포 사이트에서는 C의 효과가 당장 보이지 않는다. 영어본이 없는 게시물이 생기면 그때부터 적용된다.
5. 06-1 게이트(`programmer-06-1/clean-clone-gate.sh`)는 그대로 남아 있다. 앞으로는 07 게이트를 쓴다. 06-1 스크립트를 지울지는 슈퍼바이저가 판단한다.

## 다음 세션 가이드
- **리뷰어 (Opus 5.5)**: 코드 diff 6개 파일을 확인한다. `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree`를 돌리거나, 스크래치 clone에 커밋 대상만 스테이징하고 `--staged`를 돌린다. `results/` 로그를 대조한다. 판단할 점: D 이메일 경계를 오더보다 넓힌 것, E 영어 alternateName 4개 값, B 빌드 경고 1줄.
- **슈퍼바이저**: 리뷰어 승인 → 위 10개 경로 `git add` → `bash docs/tools/programmer-07/clean-clone-gate.sh` exit 0과 제외 목록 확인 → 커밋 → `--head` exit 0 → 푸시 → Vercel 배포 `success` 확인, 가능하면 빌드 로그에서 `tsconfig.build.json`을 확인 → 배포 메인 `curl` 1회로 `alternateName`을 확인한다.

## 참고 링크
- 오더: `instructions/programmer/processed/07-gate-staged-a11y-seo.md`
- 리뷰 13: `docs/reviews/programmer-06-1-vercel-build-failure-review.md` · 리뷰 12: `docs/reviews/programmer-06-english-feed-all-cards-review.md`
