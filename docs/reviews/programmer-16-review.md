# 리뷰 36 — 프로그래머 16(C3·C4·C5 / C11) 커밋 전 게이트

**작성일**: 2026-11-09 | **작성 세션**: 리뷰어 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`) · 하위 에이전트
**오더**: `instructions/reviewer/processed/36-programmer-16-review.md` · **도구**: `docs/tools/reviewer-36/`

> git 쓰기 0. 빌드 0(`next build`·`npm run build` 안 함). 코드·문서 수정 0 — 쓴 파일은 이 리뷰·트리거·`docs/tools/reviewer-36/`뿐.
> `next start -p 3916`는 기존 `.next`(BUILD_ID 22:37, 이후 바뀐 src·content·scripts·next.config 파일 0개)로 띄웠고, 확인 후 종료했다(포트 3916 LISTEN 0 확인).

## 판정
**조건부 승인 — P1 0 · P2 1 · P3 5.**
- **커밋 단위 A(C3·C4·C5)는 승인한다.** 지금 커밋해도 된다.
- **커밋 단위 B(C11)는 P2-1을 고친 뒤 커밋하기를 권한다.** 지금 목록이 0건이라 B를 그대로 배포해도 생기는 리다이렉트는 0개다(직접 확인). 그래서 슈퍼바이저가 B를 먼저 커밋하고 프로그래머 16-1에서 고치는 순서도 허용한다. 다만 **업로더 02(#1 이전)는 P2-1을 고치고 리뷰를 거친 뒤에만** 한다.

## 1. 커밋 범위 (확인 1)
- `git diff`로 A 9개·B 8개 파일 diff를 전부 읽었다. A와 B가 겹치는 파일은 0개다.
- `content/posts*`·`public/` 변경 0(`git status --short content public` = `content/README.md` M · `content/moved-ids.txt` 신규뿐).
- 목록 밖 변경: `history/2026-10-01.md`·`history/2026-11-05.md`(M)는 다른 세션이 남긴 기록이다(프로그래머 16과 무관, P3-5). 미추적 파일(tester-01·designer-03/05 screens·planner-07·programmer-14 screens·`instructions/tester/processed/01-…`)도 이 오더와 상관없다. 이 파일들을 A·B에 쓸어 넣지 않는다.
- 오더 이동: `instructions/programmer/16-…` D + `processed/16-…` 신규(같은 파일).

## 2. C4 소개 문구 (확인 2)
| 검사 | 결과 |
|---|---|
| `c4-copy-compare.py`: TSX 소스에서 항목별 글자를 뽑아 계획 §2.2 ko·en 문안과 대조. 기대값은 문서에서 읽는다 | **36/36** — ko 9항목·en 9항목 글자 같음, 리뷰 34 §2.4 ko 6줄·en 6줄이 계획 문안에 글자 그대로 있음, ko 굵게 조각 7개 같음, en 절 제목, en 새 절 굽은 따옴표 0, 약관 ko·en `git diff` 0 |
| 양성 대조(임시 사본에 글자 변형) | 실제로 넣은 변형 3개를 **3/3** 잡음(`c4-copy-compare-positive-control.txt`) |
| 사실 대조 `c4-fact-count.mjs` | 게시물 209 · 대표 이미지 206(전부 self, validate 출력 `self 206 · public 0 · news 0`) · 캡션 "원문"으로 시작 139 · 그 밖 67 · 이미지 없음 3 · 갤러리 0 |
| 서버 응답(`serve-check.sh`, script 태그 뺀 화면 HTML) | `/about` "썸네일" 1회(SNS 줄의 "이미지(썸네일)"뿐) · "정리하기로 했으며" 1 · "현재 쓰는 사진은" 1 · `/en/about` 절 제목 1 · `id="copyright"` 1 · "thumbnail" 0. 상세 안내문 ko "메타 정보(제목·요약)" · en "original (title and summary)" |

사실과 어긋나는 문장은 없다. `kind: news` 0건이지만 언론 줄은 "언론 기사의 사진을 **쓰는 글**은 …"이라 조건 문장이다(리뷰 34 P2-2 정정 그대로). 공공누리 줄에는 "(현재 쓰는 사진은 없습니다)"가 붙어 있다. "SNS … 상당수"는 206건 중 139건, "일부 글 … 카드 이미지"는 67건으로 맞다. 영어 "If a post has no image…" 줄은 §2.4에는 없지만 계획 §2.2 en에 있고, 계획이 남긴 이유를 적어 두었다. 소스가 계획 §2.2와 같다.

## 3. C3 "주제" (확인 3)
- v0.9 §1 표 8행이 diff에 모두 들어 있다(i18n ko·en, `/tags` TITLE·aria·빈 상태, `/tag/[slug]` 설명, 페이지 2 이상 설명·lead·JSON-LD, llms.txt).
- 누락 0: `src` 전체에서 주석이 아닌 "태그"는 2줄뿐이다. 둘 다 HTML 태그를 뜻하는 검증 오류 메시지(schema.ts·translation.ts)라 화면 문구가 아니다. 서버 `/tags` 화면 HTML의 "태그"도 0회다.
- 과치환 0: URL(`/tag/`·`/tags`)·frontmatter `tags`·식별자(`getAllTags`·`tagRail` 등)·`#${tag}` 표기는 그대로다. content 원문 오치환 0은 프로그래머 seo-parity 802/802로 확인했다(도구 출력 확인).
- **결정 1(`/tags` 문장 2개 추가 변경): 타당하다.** §1 원칙이 "화면·메타 통일"이고, 두 문장이 h1 "전체 주제" 바로 옆과 `<meta description>`이다. 남겼으면 한 화면에 두 낱말이 섞였다.
- 결정 2(영어 `Topics`가 화면에 안 나옴): 코드로 확인했다. 영어 상세는 태그 절을 그리지 않는다. 사전 값만 바뀐다.

## 4. C5 이동 경로 (확인 4)
`-mx-[15px] px-[15px]` + `min-w-11 min-h-11` + 구분자 `pointer-events-none`을 코드로 판단했다.
- 터치 상자: 글자 폭 + 30px와 44px 중 큰 값이다(ko 44×44, en 68.3×44). 44px 기준을 지킨다.
- 겹침: 다음 형제는 상자 오른쪽 끝에서 15px 안쪽(= 글자 끝)부터 시작한다. 구분자(`mx-1.5`)는 상자 오른쪽 padding 위에 놓인다. `pointer-events-none`이라 그 자리를 눌러도 홈 링크로 간다. 현재 쪽 글자("게시물"·`#태그`)는 상자 오른쪽 끝보다 약 3px 뒤에서 시작하므로 링크와 겹치지 않는다.
- 레이아웃: 음수 margin이 padding을 정확히 상쇄해 글자·h1 정렬 차가 0이다. 가로 넘침도 없다(프로그래머 실측 21/21, 출력 확인).
- 포커스 표시: 전역 `:focus-visible`(2px, offset 2px)이 상자를 따른다. 360·390폭에서는 상자 왼쪽이 x=1이라 외곽선 왼쪽 변(x≈-3~-1)이 화면 밖으로 나간다. 위·오른쪽·아래 변은 보인다 → P3-2.
- **결정 4는 승인한다.** 시각 간격만 줄이고 44px를 지키라는 §2.3 결정에 맞는다.

## 5. C11 id 이전 (확인 5)
| 항목 | 확인 방법 | 결과 |
|---|---|---|
| 308 | `movedIdRedirects`가 `permanent: true`만 쓰고 `statusCode`는 쓰지 않음 | ✅ |
| Vercel 조건 밖 | `next.config.ts` diff: `redirects`가 `...(runningOnVercel ? …)` 밖 최상위 키 | ✅ (프로그래머 VERCEL=1·없음 manifest 4/4는 출력 확인) |
| 영어 분기 | `readTranslationIds`(frontmatter id) 기준 + 로더·검증 스크립트에서 `translationMismatchErrors`로 번역 맵과 대조 | ✅ 결정 5 승인 |
| 검증 a~h + i | 코드 읽음 + 단위 재실행 | a·b·c·g는 `parseMovedIds`(next.config에서도 던짐), d·e·f·h·i는 `checkMovedIds`(검증 스크립트·로더 공통). **f에 결함 1건 → P2-1** |
| `ID_PATTERN` export | schema.ts diff, moved-ids.ts가 import | ✅ |
| 빈 목록 → 리다이렉트 0 | `c11-edge-checks.ts` 실제 저장소 0건·규칙 0, `.next/routes-manifest.json` redirects = Next 내장 끝 슬래시 규칙 1개뿐, validate 출력 "0건 · 규칙 0개 · 오류 0개" | ✅ |
| 루프·체인·자기 자신 | 자기(c), 2단·3단 순환, 사슬(g) 직접 재현 | ✅ 모두 막힘. 두 옛 id → 같은 새 id는 허용(정상) |
| retired-ids 충돌 | 새 id가 retired → [f], 옛 id가 retired에 없음 → [d] 재현 | ✅ |
| 결정 7(h 정규식) | `/post/${from}(?![A-Za-z0-9_-])` — 상대·`/en/`·절대 주소를 모두 잡고, 더 긴 id는 잡지 않음. id는 `ID_PATTERN`을 통과한 값만 와서 정규식 특수 문자가 없다 | ✅ |
| 결정 9(메타데이터 3곳 허용) | 리다이렉트 규칙 자체라 응답으로 나가는 파일이 아니다. 계획 §1.4 "라우트 매니페스트의 리다이렉트 규칙은 제외"와 같다 | ✅ 승인 |
| README §6-1·id 행·§8 행 | diff 읽음. 절차 5단계·형식·검증 표(a~h + 옛 이미지 폴더)·"비공인 실명 금지" 한 줄 | ✅ |
| 단위·돌연변이 재실행 | `unit-checks.ts` **46/46**, `mutation-check.sh` **16/16** | ✅ 수치 일치 |
| typecheck | `npx tsc --noEmit` exit 0 | ✅ |
| lint(변경 파일 15개 + 리뷰 도구) | 0 errors · 0 warnings | ✅ |
| `validate:content` | 418건 통과 · moved 0건 · 오류 0 | ✅ |
| `retired-ids.ts` `root` 인자 | 기본값이 `process.cwd()`라 기존 호출의 동작은 같다 | ✅ (빈 줄 2개, P3-4) |

빌드·픽스처 서버 시험(`build-fail.sh`·`fixture-build.sh`·`vercel-env-check.sh`)은 빌드가 필요해 다시 돌리지 않았다. 출력 파일만 읽었다(26/26 · 45/45 · 4/4, 양성 대조 27 FAIL).

## 6. 서버 응답 (확인 6) — `serve-check.sh` 19/19
`/about`·`/en/about`·`/tags` 200 · 다른 게시물 200 · 없는 id ko·en 404 · `/tags` `<title>`·h1 "전체 주제", aria "주제 목록", "태그" 0. #1 현 주소 ko·en 200이다(이번 오더는 옮기지 않으므로 리다이렉트가 없는 것이 맞다). 끝 슬래시는 Next 내장 308이다.

## 7. 저장소 독립 (확인 7)
대상 112개(코드·README·moved-ids 17 + 핸드오프·트리거·프로그래머 오더·리뷰 오더 4 + `docs/tools/programmer-16/` 전체 + `docs/tools/reviewer-36/` 전체. 글자 파일 82 · 그림 등 30).
- 지정 grep('홍보물' 줄 제외): **2줄 / 1개 파일**(`docs/tools/programmer-16/word-grep.sh` 5·20행). 홈 경로 검출용 정규식 글자이고 실제 경로나 계정명은 아니다 → P3-3. pre-commit 훅 PATTERN에는 이 글자가 없어 대상 파일의 훅 PATTERN 일치는 0이다.
- 옛 #1 id: **0** · 이름 로마자 조각: **0**. 값은 `content/posts` 파일명에서 읽어 대조만 했고 어느 파일에도 옮겨 쓰지 않았다. 양성 대조: 파일명 목록에서 1/1.
- 리뷰 도구·출력에 절대 경로·임시 경로 0.

## 결함 목록
### P2
**P2-1 — 검증 f가 "새 id 게시물이 있다"를 파일명으로도 인정한다 → 없는 주소로 보내는 규칙이 통과한다.**
`checkMovedIds`의 `ctx.koIds`는 frontmatter `id`와 **파일명**을 합친 집합이다(`idsAndFiles`). 이 집합은 e(옛 id가 남아 있는지)에는 맞다(결정 8). 그런데 f(`!ctx.koIds.has(to)`)도 같은 집합을 쓴다. 재현(`c11-edge-checks.ts` 5번): `content/posts/zz-new.md`의 frontmatter `id`가 `zz-new-typo`이고 `moved-ids.txt`에 `zz-old zz-new`가 있으면 `collectMovedIdErrors` 오류가 **0개**다. 실제 게시물 주소는 `/post/zz-new-typo`인데 리다이렉트는 `/post/zz-new`(404)로 간다. 파일명≠id는 검증에서 경고뿐이라 빌드도 통과한다. 업로더 02의 절차 1("파일 이동 + frontmatter id 고치기")에서 id를 잘못 치면 그대로 생기는 사고다. 계획 §1.5 f의 "새 id를 **쓰는** 게시물"(= frontmatter id)과도 다르다.
- 고칠 것: f는 frontmatter `id` 집합만 본다(e용 집합과 나눈다). 단위 시험에 "파일명만 새 id" 사례 1건을 추가하고, 돌연변이 시험에도 반영한다.
- 시점: 업로더 02 전 필수. B 커밋 전에 고치기를 권한다.

### P3
- **P3-1** `next.config`의 `readTranslationIds`가 목록이 0건이어도 매번 `posts-en` 209개 frontmatter를 읽는다. 게다가 try/catch가 없다. `npx next build`를 직접 치면 영어본 YAML이 깨졌을 때 파일 이름 없는 YAML 오류로 설정 단계에서 멈춘다(재현: 던짐 true). 빌드는 여전히 실패하므로 정확성 문제는 아니다. `moved.size === 0`이면 바로 빈 집합을 돌려주고, 파싱 오류는 `idsAndFiles`처럼 건너뛰기를 권한다. `npm run build`에서는 prebuild 검증이 먼저 파일 이름과 함께 알린다(임시 사본에서 확인).
- **P3-2** 이동 경로 홈 링크의 포커스 외곽선 왼쪽 변이 360·390폭에서 화면 밖(x≈-3~-1)으로 나간다. 나머지 세 변은 보여 2.4.7(AA)은 지킨다. 핸드오프 미해결 3과 함께 디자이너가 확인한다(예: `outline-offset`을 줄이거나 음수 margin을 줄이기).
- **P3-3** `docs/tools/programmer-16/word-grep.sh`에 홈 경로 검출용 글자가 들어 있어 슈퍼바이저의 커밋 전 grep(지정 패턴)에 2줄이 걸린다. 훅에는 걸리지 않는다. '홍보물'처럼 알려진 오탐으로 넘길지, 글자를 나눠 적게(예: 변수 이어 붙이기) 할지 슈퍼바이저가 정한다. 트리거의 "훅 패턴 0"은 훅 기준으로는 맞다.
- **P3-4** `src/lib/content/retired-ids.ts` import 뒤에 빈 줄이 2개다(상수를 지운 자리). 동작과 lint에는 영향이 없다.
- **P3-5** 작업 트리의 `history/2026-10-01.md`·`history/2026-11-05.md` 수정은 이 오더 밖이다(다른 세션 기록). A·B에 넣지 말고 슈퍼바이저가 따로 판단한다.

## 커밋 단위 경로
**A (C3·C4·C5) — 9개, 승인**
- `src/lib/i18n.ts`
- `src/app/(ko)/tags/page.tsx`
- `src/app/(ko)/tag/[slug]/page.tsx`
- `src/app/(ko)/tag/[slug]/page/[page]/page.tsx`
- `src/app/llms.txt/route.ts`
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `src/components/post-detail.tsx`
- `src/components/feed-view.tsx`

**B (C11) — 8개 + 기록, P2-1 수정 후 권장**
- `src/lib/content/moved-ids.ts`(신규) · `content/moved-ids.txt`(신규) · `next.config.ts` · `scripts/validate-content.ts` · `src/lib/content/load.ts` · `src/lib/content/retired-ids.ts` · `src/lib/content/schema.ts` · `content/README.md`
- 기록: `docs/tools/programmer-16/`(전체) · `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md` · `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md` · `instructions/programmer/16-copy-terms-breadcrumb-moved-ids.md`(삭제) + `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`(신규) · `history/2026-11-09.md`
- 리뷰: `docs/reviews/programmer-16-review.md` · `docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md` · `docs/tools/reviewer-36/`(전체) · `instructions/reviewer/processed/36-programmer-16-review.md`(신규, 원래 자리는 미추적이라 삭제 항목 없음)
- B를 P2-1 수정 뒤로 미루면, 기록·리뷰 파일은 A 커밋에 넣어도 된다(코드와 겹치지 않는다).

## 리뷰 도구 (`docs/tools/reviewer-36/`)
| 파일 | 결과 |
|---|---|
| `c4-copy-compare.py` → `c4-copy-compare-output.txt` · `c4-copy-compare-positive-control.txt` | 36/36 · 양성 3/3 |
| `c4-fact-count.mjs` → `c4-fact-count-output.txt` | 209·206·139·67·3 |
| `c11-edge-checks.ts` → `c11-edge-checks-output.txt` | 13 PASS + P2-1 재현 1 FAIL(의도된 관찰) + NOTE 2 |
| `serve-check.sh` → `serve-check-output.txt` | 19/19 |
| `rerun-unit-checks-output.txt` · `rerun-mutation-check-output.txt` · `typecheck-output.txt` | 46/46 · 16/16 · exit 0 |
