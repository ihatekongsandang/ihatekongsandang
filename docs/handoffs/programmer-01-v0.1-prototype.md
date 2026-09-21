# 프로그래머 세션 — 01-v0.1-prototype 핸드오프
**작성일**: 2026-09-21 12:40 | **작성 세션**: 프로그래머 (Opus 5)

> 🔴 **정정 (2026-09-21, 프로그래머 02)** — 리뷰어 04 D1·D3 확인 결과 이 문서의 두 곳이 사실과 달랐다.
> 1. **§7 대조표 10번·검증표 "OG 이미지 실체 확인"의 "✅"는 틀렸다.** `/opengraph-image` 엔드포인트만
>    확인했고 게시물 상세 페이지의 메타 태그를 보지 않았다. 실제로는 `/post/[id]` 3건 전부에
>    `og:image`·`twitter:image`가 **없었다**(D1). 프로그래머 02에서 수정·재검증했다.
> 2. **숫자 3건이 틀렸다**: `src/**` 파일 44 → **42**, 줄 2,773 → **2,665**(리뷰 시점),
>    grep 대상 89 → **86**. 결과(0건·통과)는 바뀌지 않는다. 산출 명령은
>    `docs/handoffs/programmer-02-review-fixes.md` §D3에 병기했다.
>
> 이 문서의 나머지 내용은 그대로 두고, 수정 이력은 02 핸드오프를 본다.

## 요약 (3줄)
1. Next.js 15.5.25 + React 19 + TS + Tailwind v4 + shadcn/ui 패턴으로 v0.1 열람 전용 프로토타입을 구현했다 — 홈·태그·상세·소개 4화면, 콘텐츠 스키마·빌드 검증 게이트, 가상 샘플 3건, 전 페이지 정적 생성(17/17).
2. 로컬 프로덕션 빌드에서 직접 검증했다 — typecheck/lint/build 통과, 라우트 16/16 기대값 일치, 보안 헤더 6/6 실측, 색 대비 12/12 통과, 검증 게이트 오류 케이스 6/6 차단, 저장소 독립 grep 89파일 0건.
3. **커밋하지 않았다.** 작업트리에 남겼다. 리뷰어 판정 후 슈퍼바이저가 커밋·푸시한다.

---

## 산출물

| 경로 | 설명 |
|---|---|
| `TECH_STACK.md` | 기술 선택과 근거. 특히 CSP 택일·`remotePatterns`·JSON-LD 타입·페이지네이션 설계·`llms.txt` 판단 |
| `content/README.md` | 슈퍼바이저가 이 문서만 보고 게시물을 쓸 수 있는 수준의 작성 가이드(필드 표·3종 완성 예시·라벨 정의·검증 실행법) |
| `content/posts/example-case-{a,b,c}.md` | 가상 샘플 3건 — URL·사진·사진+글 각 1 |
| `content/retired-ids.txt` | 폐기 ID 목록(안정 ID 재사용 금지 집행 파일) |
| `scripts/validate-content.ts` | 빌드 전 콘텐츠 게이트(`prebuild`에 연결) |
| `scripts/og-draft.mjs` | URL 유형 frontmatter 초안 생성기(의존성 없음) |
| `src/**` (44개 파일, 2,773줄) | 앱 코드 — 4화면 + 페이지네이션 경로 + sitemap·robots·llms.txt·OG 이미지 + 미들웨어 |
| `next.config.ts` · `vercel.json` · `.env.example` · `tsconfig.json` · `eslint.config.mjs` · `postcss.config.mjs` · `components.json` · `.gitignore` · `package.json` | 설정 |
| `public/images/example-case-{b,c}/*.png` | 자체 제작 샘플 이미지 3장(도형 패턴, 외부 이미지 아님) |
| `docs/qa/programmer-01/*.png` | 화면 캡처 19장 (모바일 390 / 데스크톱 1280) |
| `docs/tools/programmer-01/*.mjs` | 측정 도구 3종 — 색 대비, 화면 캡처(CDP), 샘플 이미지 생성 |

---

## 리뷰어 02 §7 제약 15개 → 구현 위치

| # | 제약 | 구현 위치 | 상태 |
|---|---|---|---|
| 1 | 상태 라벨 enum — 확장 가능한 유니언, 기본 5종, `유죄판결`은 심급 필수, enum 외 값 오류 | `src/lib/content/schema.ts` (`STATUS_LABELS`·`COURT_LEVELS`·`validatePost`), `src/components/status-badge.tsx` | ✅ 5종 그대로. 명칭 교체 지점은 TECH_STACK §2에 명시 |
| 2 | 스키마 필수 필드 + `sources[]` 최소 1건 + 선택 필드(`statusHistory`·`submittedBy`·대표 이미지) | `src/lib/content/schema.ts`, `scripts/validate-content.ts`, `content/README.md` §3 | ✅ 전 항목 구현·검증 대상 |
| 3 | 카테고리 없음 — `/category/[slug]` 미구현, 4화면 | 라우트 목록에 `category` 없음. `/category/anything` → 404 실측 | ✅ |
| 4 | 안정 ID 4원칙 (변경 금지·frontmatter 명시·재사용 금지·URL-safe) | `schema.ts` `ID_PATTERN`, `content/retired-ids.txt` + 검증의 폐기 ID 검사, `content/README.md` §6 | ✅ 한글 불허 결정(근거 TECH_STACK §11) |
| 5 | 링크 rel — 운영자 링크 `noopener`만, 마크다운 자동 rel 충돌 확인 | `src/components/external-link.tsx`, `src/lib/content/markdown.ts` | ✅ rehype-external-links 기본값 `nofollow`를 `['noopener']`로 덮어씀. 렌더 결과 실측: 문서 내 `rel` 값이 `noopener`·`canonical`·`icon`·`preload`·`stylesheet`뿐 |
| 6 | OG 썸네일 — 핫링크, 자체 og:image 재사용 금지, 깨짐 시 플레이스홀더, `useSourceImage` 스위치 | `src/components/card-media.tsx`, `src/app/opengraph-image.tsx`, `schema.ts` `useSourceImage` | ✅ 깨짐 전환은 브라우저 실측(스크린샷 `hotlink-*`). ⚠️ 기본값은 `false` — PRD v0.3과 불일치, 아래 "미해결" 1번 |
| 7 | CSP ↔ 핫링크 — `img-src` 열거식 금지, 택일 근거 기록, `remotePatterns` 정합 | `vercel.json`, `next.config.ts`, TECH_STACK §4·§5 | ✅ `img-src https:` 택일. `remotePatterns`는 비움(열린 프록시 회피) |
| 8 | 피드 — 초기 N장 SSG + `<a href="?page=n">` 실제 링크, N값 근거 | `src/components/pagination.tsx`, `src/middleware.ts`, `src/app/page/[page]/`, `src/lib/config.ts` | ✅ 둘 다 만족(설계 근거 TECH_STACK §6). N=12 근거 기록. 무한스크롤은 미구현 — 아래 "미해결" 2번 |
| 9 | 상세 필수 표시 — 상태 라벨·근거 출처·상태 이력·원문 링크 / 카드는 제목+이미지+배지만 | `src/app/post/[id]/page.tsx`, `src/components/post-card.tsx` | ✅ 카드에 본문·요약 미노출 확인(HTML 실측) |
| 10 | SEO·GEO — 게시물별 title/description/자체 og:image, sitemap 자동 생성, 태그 canonical, JSON-LD 타입 제안, `llms.txt` 판단 | `src/app/sitemap.ts`·`robots.ts`·`llms.txt/route.ts`, `src/lib/seo.ts`, `src/components/canonical-link.tsx` | ✅ JSON-LD는 `Article`(근거 TECH_STACK §7). `llms.txt` 도입(근거 §8) |
| 11 | v0.1.5 대비 — GA4 이벤트 2종 계측 지점, 측정 ID는 환경 변수 | `src/lib/analytics.ts`, `src/components/analytics/ga-script.tsx`, `src/components/post-card.tsx` | ✅ ID 없으면 전부 no-op. `.env.example`에 값 없이 키만 |
| 12 | 보안 — 마크다운 sanitize, CSP, 외부 링크 시각 표시 | `src/lib/content/markdown.ts`, `vercel.json`, `src/components/external-link.tsx` | ✅ 원본 HTML 제거 실측(샘플 본문의 HTML 주석 미출력), 외부 링크 아이콘 + "(새 창에서 열림)" |
| 13 | 접근성 — 키보드 탐색, 포커스 인디케이터, alt 빌드 게이트 | `src/app/globals.css` `:focus-visible`, `post-card.tsx` `has-[a:focus-visible]`, `validate-content.ts` | ✅ 실브라우저 Tab 11회 순회 실측 + 포커스 링 캡처(`keyboard-focus--desktop-1280.png`) |
| 14 | 계정·저장소 독립 | 전 산출물 | ✅ 커밋 대상 89파일 전수 grep 0건 |
| 15 | 콘텐츠 스키마 문서 + OG 초안 생성 스크립트 | `content/README.md`, `scripts/og-draft.mjs` | ✅ |

**15/15 반영.** 6번만 PRD v0.3과 기본값이 갈리며(§7 우선 원칙 적용), 8번은 무한스크롤을 의도적으로 미구현했다.

---

## 주요 결정사항 (자체 판단 + 근거)

근거 전문은 `TECH_STACK.md`에 있다. 요약만 적는다.

| 항목 | 결정 | 한 줄 근거 |
|---|---|---|
| `FEED_PAGE_SIZE` | **12** | 1·2·3·4열 모두로 나누어져 어떤 화면에서도 마지막 줄이 비지 않는다. 상수 1곳에서 조정 |
| CSP | **`img-src https:`** + Report-Only 시작 | 열거식은 새 매체마다 재배포가 필요해 "파일 커밋만으로 게시"가 깨진다. 강제 전환은 nonce가 필요해 전 페이지 정적 생성을 잃으므로 v0.1.5 이후 |
| JSON-LD | **`Article`** (NewsArticle 아님) | 언론사가 아닌 큐레이션 사이트가 NewsArticle을 붙이면 발행 주체를 오인시킨다. 상태 라벨은 JSON-LD에 넣지 않음(유죄·무죄의 기계 판독 주장 회피) |
| 마크다운 | `unified` + remark/rehype, **sanitize 뒤에 external-links** | 순서를 바꾸면 방금 붙인 rel이 기본 스키마에서 떨어진다 |
| 검증 스크립트 언어 | **TypeScript(`tsx`)** | 화면 코드와 스키마 한 벌 공유. `.mjs`로 쓰면 enum이 두 곳에 생겨 "검증은 통과, 화면은 깨짐"이 가능해진다 |
| `remotePatterns` | **비움** | 임의 호스트 허용 = 이미지 최적화 엔드포인트가 열린 프록시가 된다 |
| 페이지네이션 | `?page=n` 공개 URL + `/page/n` 정적 경로 + 미들웨어 rewrite | "실제 링크"와 "정적 생성"을 둘 다 만족시키는 유일한 조합 |
| canonical | 페이지네이션만 `<link>` 직접 출력 | `alternates.canonical`이 루트 경로의 쿼리를 떨어뜨리는 것을 실측 |
| `id` 문자셋 | ASCII 소문자+하이픈(한글 불허), **태그는 한글 허용** | id는 v0.4~v0.6 외래키라 인코딩 불일치 사고를 피해야 한다. 태그는 외래키가 아니고 읽는 값 |
| 폰트·다크테마 | 시스템 폰트, 라이트 전용 | 토글 없는 다크 토큰은 한 번도 확인되지 않는 코드가 된다. 둘 다 v0.2 디자이너 |
| OG 이미지 | 무문자 도형 PNG(빌드 생성) | ImageResponse 내장 폰트에 한글 글리프가 없다. 타이포 OG는 브랜드 서체 결정과 묶여야 함 |
| 보안 헤더 위치 | `vercel.json` 선언 + Vercel 아닌 환경에서만 Next가 재사용 | 선언은 한 벌 유지하면서 로컬 프로덕션에서 실측 가능하게 |
| shadcn/ui | CLI 없이 같은 구조로 3종 직접 작성 | v0.1에 필요한 것이 card·badge·button뿐. `components.json`을 둬서 이후 CLI 추가분이 그대로 붙는다 |

---

## 검증 (전부 직접 수행한 실측값)

| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 3/3 통과, 오류 0 |
| `npm run typecheck` | 통과 (종료코드 0) |
| `npm run lint` | 통과 (종료코드 0) |
| `npm run build` | 성공, 경고 0, **정적 페이지 17/17** (라우트 전부 `○`/`●`, 미들웨어만 엣지) |
| 라우트 상태 대조 | **16/16 기대값 일치** (200 12건 / 404 4건 — `/?page=2`·`/post/nope`·`/tag/nope`·`/category/anything`) |
| 화면 직접 확인 | **4화면 4/4** + 페이지네이션 2화면 + 핫링크 폴백 2화면. 캡처 19장 (모바일 390 / 데스크톱 1280) |
| 페이지네이션 | `FEED_PAGE_SIZE`를 임시로 2로 낮춰 2페이지 구성 실측 → `/`·`/?page=2`·`/tag/{t}?page=2` 200, `?page=3` 404, `?page=1`·`?page=abc` → 1페이지. 확인 후 12로 복구하고 재빌드·재확인 |
| 검증 게이트 오류 케이스 | **6/6 차단** (필수 필드 누락 / enum 외 값 / id 중복 / alt 누락 / 폐기 ID 재사용 / `유죄판결`인데 심급 없음). 6건 모두 종료코드 1이고 `next build`에 진입조차 하지 않음(`Compiled successfully` 0회). 테스트 파일은 전부 제거 완료 |
| 보안 헤더 | **6/6 실측** (`curl -I`) — HSTS·nosniff·frame DENY·Referrer-Policy·Permissions-Policy·CSP Report-Only. `X-Powered-By` 없음 |
| 색 대비 | **12쌍 12/12 통과** (본문·보조·링크·상태 배지 5종·플레이스홀더·포커스 링). 도구: `docs/tools/programmer-01/contrast-check.mjs` |
| 키보드 접근성 | 실브라우저 Tab 11회 순회 — 건너뛰기 링크 → 헤더 → 태그 → 카드 순, 카드는 1탭 1정지점이며 카드 전체에 2px 포커스 링(`rgb(29,78,215)`). 캡처로 확인 |
| 마크다운 sanitize | 샘플 본문의 HTML 주석이 출력에 없음, 본문 링크 rel이 `noopener`뿐, 표·인용문 정상 렌더 |
| OG 이미지 | `/opengraph-image` → PNG 1200×630 실체 확인 |
| 저장소 독립 grep | **커밋 대상 89파일 전수 0건** (pre-commit 훅과 동일 패턴) |

---

## 미해결·이슈 (다음 세션이 알아야 할 것)

### 1. 🔴 `useSourceImage` 기본값 — PRD v0.3과 불일치 (판단 필요)
- **PRD v0.3 §3.2①**: 기본값 **`true`**
- **md오더 §2 / 리뷰어 02 §7-6**: 기본 **`false`** (§7-6 예시도 `useSourceImage: false`)
- 두 문서가 갈릴 때 §7이 우선한다는 원칙(PRD v0.3 머리말이 스스로 명시)에 따라 **`false`로 구현**했다.
- 실질 판단도 `false` 쪽이라고 본다 — PRD v0.3 §6③ 자체가 "`기소` 이전 단계 인물은 얼굴 노출 안 함,
  `useSourceImage=false`"를 기본 규칙으로 두는데, 스위치 기본값이 `true`면 슈퍼바이저가 **매 건 끄는 것을
  기억해야** 안전 상태가 된다. 기본값은 실수했을 때 안전한 쪽이어야 한다.
- **기획자 03 또는 리뷰어 03의 확정이 필요하다.** 바꿀 지점은 `src/lib/content/schema.ts`의
  `useSourceImage` 해석 한 줄과 `content/README.md` §3.4다.

### 2. 무한스크롤 미구현 (의도적 이월)
- §7-8의 필수 요건은 "`<a href="?page=n">` 실제 링크"이고 무한스크롤은 그 위의 점진적 향상이다.
- 지금 게시물이 3건이라 무한스크롤은 **한 번도 동작을 확인할 수 없는 코드**가 된다. 게시물이 쌓인 뒤
  v0.2에서 다루는 것이 맞다고 판단했다. 링크 기반 페이지네이션은 완성·실측 완료.

### 3. `NEXT_PUBLIC_SITE_URL` 미설정 시 상대 경로
- 도메인 미확정이라 기본값을 두지 않았다. 값이 없으면 canonical·sitemap·OG URL이 상대 경로로 나간다.
- **sitemap을 GSC·네이버에 제출하기 전에 반드시 Vercel 환경 변수로 설정해야 한다**(v0.1.5 선행 조건).
- 로컬 검증은 `.env.local`(gitignore 대상)에 `http://localhost:3000`을 넣고 수행했다.

### 4. `vercel.json` 헤더의 실제 적용은 배포 후 확인 필요
- 로컬에서는 `next.config.ts`가 같은 선언을 재사용해 6/6 실측했다. Vercel 플랫폼 경로로 붙는 것은
  첫 배포 후 `curl -I` 1회로 확인하면 된다(CLAUDE.md §9 범위 내).

### 5. 샘플 3건은 가상 예시
- `example-case-*`는 실제 인물·사건·언론 URL을 쓰지 않은 검증용이다(`https://example.com`은 예약 도메인).
- 실제 게시를 시작할 때 지우고, 지우면서 id를 `content/retired-ids.txt`에 옮겨 적는다.

### 6. 건드리지 않은 파일
- `planning/prd.md`·`planning/user-questions.md`는 기획자 03 세션이 병행 수정했다. 나는 열어 보기만 했다.
- `history/2026-09-21.md`에는 내 작업 항목만 덧붙였다.

---

## 다음 세션 가이드

| 누가 | 무엇을 | 어떻게 |
|---|---|---|
| **리뷰어 (Fable 5.1)** | 프로그래머 01 판정 | 위 §7 대조표 15항 + 검증 숫자를 코드와 직접 대조. 중점: ① `useSourceImage` 기본값 판단(미해결 1) ② 미들웨어 rewrite 설계가 SEO상 안전한지 ③ CSP `img-src https:` 택일 ④ 검증 스크립트가 실제로 게이트 역할을 하는지 재현 ⑤ `content/README.md`만으로 게시가 가능한 수준인지 |
| **슈퍼바이저 (Opus 5)** | 리뷰어 판정 후 커밋·푸시 | 커밋 전 pre-commit grep은 이미 0건 확인됨. Vercel 연결 후 `NEXT_PUBLIC_SITE_URL` 환경 변수 설정 |
| **테스터 (Sonnet 5)** | 배포 후 검증 | 로컬 프로덕션 빌드로 재현 가능. 캡처 도구는 `docs/tools/programmer-01/qa-screenshots.mjs` (⚠️ macOS는 `--window-size`만으로 390px 뷰포트를 못 만든다 — 창 최소 폭 500px. 이 도구는 CDP 에뮬레이션을 쓴다) |
| **디자이너 (Sonnet 5, v0.2)** | 커스텀 디자인 | 토큰은 `src/app/globals.css` 한 곳. `components.json`이 있어 shadcn CLI로 컴포넌트를 추가할 수 있다. 남은 과제: 다크 테마, 브랜드 서체, 타이포 OG 이미지, 상태 배지 5종 시각 구분 강화 |
| **프로그래머 (v0.1.5)** | 통계 연동 | 계측 지점은 이미 코드에 있다. `NEXT_PUBLIC_GA_ID` 주입만 하면 `view_card`·`select_card`가 수집된다. 이후 CSP 강제 전환 검토 |

## 참고 링크
- 제약 원문: `docs/reviews/planner-02-prd-v0.2-review.md` §7
- 기획 기준: `planning/prd.md` (v0.3)
- 기술 근거: `TECH_STACK.md`
- 게시 가이드: `content/README.md`
- 화면 캡처: `docs/qa/programmer-01/`
- 측정 도구: `docs/tools/programmer-01/`
