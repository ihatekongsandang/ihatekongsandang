# 리뷰 보고서 — 프로그래머 01 · v0.1 프로토타입 (코드 리뷰)

**리뷰어**: 리뷰어 (Fable 5.1) · **md오더**: `instructions/reviewer/processed/04-programmer-01-code-review.md` · **일시**: 2026-09-21 13:10
**대상**: 작업트리 미커밋 코드 전체 — `src/**` 42파일 · `scripts/` 2 · `content/` 5 · 설정 9 · `TECH_STACK.md` · `content/README.md` · `docs/qa/programmer-01/` 19 · `docs/tools/programmer-01/` 3
**기준**: 리뷰어 02 §7 제약 15항 + 리뷰어 03 §8 인계 10항 = 25항 · PRD v0.3(HEAD 622ea3f) · CLAUDE.md 대전제·저장소 독립 원칙
**읽은 파일**: 커밋 대상 텍스트 64/64 (PNG 22장은 grep 대상 아님, 캡처 19장 중 4장 열람) + `docs/tools/programmer-01/*.mjs` 3/3 + `.git/hooks/pre-commit`

---

## 0. 판정

### 🟡 조건부 승인 — 아래 필수 수정 2건(D1·D2)을 프로그래머가 고친 뒤 커밋·푸시한다

| 구분 | 수 | 내용 |
|---|---|---|
| 결함 (필수 수정) | **2** | D1 게시물 상세 3/3에 `og:image`·`twitter:image` 없음 (§7-10 미충족) · D2 `engines.node >=20.9.0`인데 `import.meta.dirname`(Node ≥20.11) 사용 |
| 보고 정확도 지적 | 1 | D3 핸드오프 숫자 3건 불일치(44파일→42, 2,773줄→2,665, 89파일→86) |
| 권고 상 | 3 | R1 본문 마크다운 이미지 핫링크가 `alt`·`useSourceImage` 게이트를 우회 · R2 `og-draft`가 원문 헤드라인을 `title`에 그대로 복사(카드·h1에 "출처 인용" 라벨 없이 노출) · R3 CSP Report-Only에 `report-to` 없음 |
| 권고 중 | 3 | R4 폐기 ID 검사가 2차 게이트(`load.ts`)에 없음 · R5 `npm audit` high 1(next 15 동봉 postcss 8.4.31, 빌드 시점 한정) · R6 README §5 실명 규칙이 PRD v0.3 문구(M1 공백) — v0.4 확정 후 갱신 필요 |
| 권고 하 | 5 | R7~R11 |
| 25항 대조 | **25/25 확인** — 충족 23 · 부분 2(§7-10 og:image → D1, §8-5 기본값 → 판정으로 종결) |
| `useSourceImage` 기본값 | **`false` 확정** (§3) |

**재현 결과 요약(전부 직접 실측)**: `npm ci` 437패키지 5s · validate 3/3 exit 0 · typecheck exit 0 · lint exit 0 · build exit 0 경고 0 정적 17/17 · 라우트 27건 기대값 일치 · 게이트 오류 케이스 **6/6 차단 + 추가 12건**(차단 9·의도된 통과 3) · 잘못된 게시물로 `npm run build` → exit 1, `next build` 미진입("Creating an optimized" 0회) · 보안 헤더 **6/6** + `X-Powered-By` 없음 · `rel` 전수 9페이지 = `canonical`·`icon`·`noopener`(12)·`preload`·`stylesheet`뿐, `target=_blank`인데 `rel` 없는 앵커 0 · 색 대비 12/12(+리뷰어 추가 6쌍 통과) · 키보드 Tab 16회 순서·포커스 링 실측 · 페이지네이션(임시 `FEED_PAGE_SIZE=2`, 5건) `/?page=2`·`?page=3` 200 canonical 정확, `?page=4` 404 · sanitize 12벡터 전부 무해화 · 깨진 핫링크 → 플레이스홀더 전환(브라우저 캡처) · 저장소 독립 grep 텍스트 64/64 **0건** · 커밋되면 안 되는 파일 0.

---

## 1. 재현 검증 (프로그래머 숫자 vs 리뷰어 실측)

| 항목 | 프로그래머 보고 | 리뷰어 실측 | 일치 |
|---|---|---|---|
| `npm ci` | — | Node v24.14.0 / npm 최신, 437 packages, exit 0 | — |
| `validate:content` | 3/3 | 3건 통과·실패 0·오류 0, exit 0 | ✅ |
| `typecheck` / `lint` | 통과 | exit 0 / exit 0 | ✅ |
| `build` | 경고 0, 정적 17/17 | `rm -rf .next` 후 exit 0, "warn" 0회, `Generating static pages (17/17)`, 라우트 전부 ○/●, 미들웨어 34.3 kB | ✅ |
| First Load JS | — | `/` 123 kB · `/post/[id]` 113 kB · `/about` 106 kB · 공유 103 kB | 정적 사이트로 적정 |
| 라우트 상태 | 16/16 | **27/27** — 200: `/`·`/about`·post 3·tag 4·`/?page=1`·`/?page=abc`·`/?page=0`·`/sitemap.xml`·`/robots.txt`·`/llms.txt`·`/opengraph-image`·`/icon.svg` / 404: `/?page=2`·`/page/2`·`/page/1`·`/post/nope`·`/tag/nope`·`/category/anything`·`/category/x`·`/tag/예시사건?page=2`·`/post/%2e%2e/about` | ✅ |
| 보안 헤더 | 6/6 | HSTS `max-age=63072000; includeSubDomains` · nosniff · `X-Frame-Options: DENY` · `Referrer-Policy: strict-origin-when-cross-origin` · Permissions-Policy 8항목 · CSP-Report-Only. `/`·`/post/*`·`/_next/static/*.js` 모두 동일. `X-Powered-By` 없음 | ✅ |
| 게이트 오류 케이스 | 6/6 차단 | 6/6 exit 1 (아래 §1.1) + 추가 12건 | ✅ |
| 빌드 차단 | `Compiled successfully` 0회 | 잘못된 게시물 1건 두고 `npm run build` → exit 1, `Creating an optimized production build` 0회 | ✅ |
| 색 대비 | 12/12 | 도구 재실행 12/12 PASS(최저 6.70:1) + 리뷰어 추가 6쌍(활성 태그 17.72 · 태그 카운트 7.03 · 포커스 링/카드 표면 6.42 등) 전부 ≥4.5 | ✅ |
| 키보드 | Tab 11회 | Tab 16회(5건 상태): 건너뛰기 → 로고 → 홈 → 소개 → 태그 4 → 카드(1탭 1정지점, 카드 outline `solid 2px rgb(29,78,215)`) → 더 보기 → 다음 → 푸터 → 순환. 모든 정지점 outline 2px | ✅ |
| 화면 | 19장 | 프로그래머 도구로 10장 재캡처(390/1280) + 핫링크 4장. 모바일 1열·데스크톱 3열(게시물 3건) 확인. 4장 직접 열람 | ✅ |
| 저장소 독립 grep | 89파일 0건 | 커밋 대상 86파일(텍스트 64 grep, PNG 22 제외) 0건 · `package-lock.json` 0건 · 홈 디렉터리 절대경로(macOS·Linux 패턴) 0건 | ✅(파일 수만 상이 → D3) |
| `git status` 금지 파일 | 없음 | `.env.local`·`.next`·`node_modules`·`*.tsbuildinfo`·`next-env.d.ts` 모두 gitignore로 제외 확인 | ✅ |
| `npm audit` | (보고 없음) | moderate 1 + **high 1** — `next@15.5.25`가 동봉한 `postcss@8.4.31`(sourceMappingURL 경로 조작·파일 노출·`</style>` XSS). 최상위 postcss는 8.5.28로 안전. 수정은 next 16(major)뿐 | → R5 |

### 1.1 검증 게이트 재현 (도구: `docs/tools/reviewer-04/gate-cases.sh`)

| # | 케이스 | exit | 오류 메시지(발췌) |
|---|---|---|---|
| 1 | 필수 누락(`title`) | 1 | `title: 필수입니다.` |
| 2 | enum 외(`status: 확정`) | 1 | `status: 다음 5종 중 하나여야 합니다 — 의혹 / 수사중 / 기소 / 유죄판결 / 종결. (받은 값: 확정)` |
| 3 | id 중복(`example-case-a`) | 1 | `id \`example-case-a\`가 example-case-a.md와 중복됩니다.` |
| 4 | alt 누락 | 1 | `images[0].alt: 필수입니다(WCAG 2.2 AA 1.1.1).` |
| 5 | 폐기 ID 재사용 | 1 | `… content/retired-ids.txt에 등록된 폐기 ID입니다.` |
| 6 | 유죄판결 심급 누락 | 1 | `courtLevel: status가 \`유죄판결\`이면 필수입니다` |
| 7 | `sources: []` | 1 | `sources: 최소 1건 필요합니다` |
| 8 | 본문 `<script>` | 1 | `본문에 스크립트·프레임 태그를 넣을 수 없습니다` |
| 9 | `statusHistory` 마지막 `to` ≠ `status` | 1 | 차단 |
| 10 | `useSourceImage: true` + `og.image` 없음 | 1 | 차단 (fail-closed) |
| 11 | `og.image` http | 1 | `og.image: https URL이어야 합니다` |
| 12 | id `ZZ_Test` | 1 | 차단 |
| 13 | `의혹` + `courtLevel` | 1 | 차단 |
| 14 | 역방향 전이 `유죄판결→기소→유죄판결` | **0** | 의도된 통과 — §8-1 "순방향 강제 안 함" 충족(M2·Q6 흡수 가능) |
| 15 | `종결` + 미지 필드 `closureReason` | **0** | 의도된 통과(경고만) — M3 하위 필드 추가 시 기존 파일이 깨지지 않음 |
| 16 | 이미지 파일 부재 | 1 | `images[0].src: 파일이 없습니다` |
| 17 | 이미지 경로 `/images/../../etc/passwd` | 1 | 차단 |
| 18 | 본문 `<img onerror>` | **0** | 검증은 통과(정규식은 script/iframe/object/embed만) → 렌더 sanitize에서 제거됨(§1.2) |

### 1.2 sanitize 실측 (임시 게시물 `zz-sanitize`, 렌더 HTML 대조)

| 입력 | 출력 |
|---|---|
| `<!-- 주석 -->` | 제거 |
| `<img src=x onerror=…>` | 제거 (`onerror` 0회) |
| `<b onmouseover=…>굵게</b>` | 태그 제거, 텍스트 `굵게`만 |
| 원본 HTML `<a target=_blank>` | 태그 제거, 텍스트만 |
| `[x](javascript:…)` / `[x](data:…)` | `<a>` href 제거(빈 앵커) |
| `[x](https://…)` | `<a href target="_blank" rel="noopener">` + `<span class="sr-only"> (새 창에서 열림)</span>` |
| `[x](/about)` | `<a href="/about">` (rel 없음, 정상) |
| `<div style=…>` | 제거 (`style=` 0회) |
| `![alt](https://…png)` | **`<img src="https://…" alt="…">` 그대로 출력** → R1 |

### 1.3 페이지네이션 실측 (임시 `FEED_PAGE_SIZE=2`, 5건, 원복 후 `cmp` 바이트 동일 확인)

| URL | 상태 | canonical | 카드 수 |
|---|---|---|---|
| `/` "더 보기" | `href="/?page=2"` 실제 링크 | — | 2 |
| `/?page=2` | 200 | `…/?page=2` (1개) | 2 |
| `/?page=3` | 200 | `…/?page=3` | 1 |
| `/?page=4` | 404 | — | 0 |
| `/page/2` (내부 경로 직접) | 200 | `…/?page=2` | 2 |
| `/tag/예시사건?page=2` | 200 | `…/tag/예시사건?page=2` | 2 |
| `/tag/예시사건?page=3` | 404 | — | — |
| `/?page=1`·`?page=abc`·`?page=0`·`?utm_source=a&page=1` | 200 | `…/` (1페이지 정본) | — |
| sitemap 내 `/page/` | 0건 · robots `Disallow: /page/`·`/tag/*/page/` | | |

빌드 시 `/page/2`·`/page/3` 정적 생성 22/22 확인. 2페이지 이전/다음 링크: `href="/"`·`href="/?page=3"`.

### 1.4 핫링크 폴백 실측
임시 게시물(`useSourceImage: true`, 존재하지 않는 https 이미지)로 빌드 → HTML에는 `<img src="https://…does-not-exist…png" loading="eager">`가 나가고, 헤드리스 Chrome 캡처에서 카드(1280)·상세(390) 모두 **"이미지 없음" 플레이스홀더로 전환**됨. `card-media.tsx` L40~44의 마운트 시점 `naturalWidth` 검사 경로가 동작한다.

---

## 2. 제약 대조 25항 (코드 1:1)

### 2.1 리뷰어 02 §7 15항

| # | 제약 | 코드 위치·실측 | 판정 |
|---|---|---|---|
| 1 | 상태 라벨 enum 확장 가능·5종·유죄판결 심급 필수·enum 외 오류 | `src/lib/content/schema.ts` L12 `STATUS_LABELS` as const 5종(CLAUDE.md L80과 글자 일치) · L16 `COURT_LEVELS` · L253~267 검증 · 케이스 2·6·13 차단 | ✅ |
| 2 | 필수 필드 + `sources[]`≥1 + 선택(`statusHistory`·`submittedBy`·대표 이미지) | L217~449 전 필드 검증 · `sources` L283 · `statusHistory` L346 · `submittedBy` L451 · `image` L389 선택 · 케이스 1·4·7 차단 | ✅ |
| 3 | 카테고리 없음·4화면 | 라우트 표에 `category` 없음, `/category/*` 404 실측. 화면: `/`·`/tag/[slug]`·`/post/[id]`·`/about` | ✅ |
| 4 | 안정 ID 4원칙 | `ID_PATTERN` L107(소문자 영숫자·하이픈) · frontmatter 명시 강제 L219 · `content/retired-ids.txt` + `scripts/validate-content.ts` L28~36·L83 · 케이스 5·12 차단 | ✅ (R4 참조) |
| 5 | 링크 rel — 운영자 링크 `noopener`만, 마크다운 자동 rel 충돌 확인 | `external-link.tsx` L21 · `post/[id]/page.tsx` L142 · `markdown.ts` L28~31 `rel: ['noopener']`(기본 nofollow 덮어씀) · 렌더 rel 전수: `noopener` 12건, nofollow/ugc/noreferrer 0 | ✅ |
| 6 | OG 썸네일 — 핫링크·자체 og:image 재사용 금지·깨짐 시 플레이스홀더·`useSourceImage` 스위치 | `schema.ts` L416(https만)·L433·L499~506 `resolveCardMedia` · `card-media.tsx` · `opengraph-image.tsx`(무문자 도형 1200×630 실측) · 폴백 §1.4 실측 | ✅ 기본값은 §3 판정 |
| 7 | CSP ↔ 핫링크 정합, 열거식 금지, `remotePatterns` 정합 | `vercel.json` L21 `img-src 'self' data: https:` · `next.config.ts` L37 `remotePatterns: []` · `/_next/image?url=https://…` → **400**(열린 프록시 아님), 로컬 이미지 → 200 · TECH_STACK §4·§5 근거 | ✅ |
| 8 | 초기 N장 SSG + `<a href="?page=n">` 실제 링크 + N 근거 | `pagination.tsx` L30 `Link href=pageHref` → `href="/?page=2"` 실측 · `config.ts` L23 `FEED_PAGE_SIZE = 12` 근거 주석 · §1.3 | ✅ 무한스크롤 이월(§4-⑤) |
| 9 | 상세 필수 표시 / 카드는 제목+이미지+배지만 | 상세: `StatusBadge`·`SourceList`·`StatusHistory`·원문 CTA(`post/[id]/page.tsx` L68·L169·L170·L138) · 카드 HTML에 description 문자열 0회 실측 | ✅ |
| 10 | SEO·GEO — 게시물별 title/description/**자체 og:image** · sitemap · 태그 canonical · JSON-LD 타입 · `llms.txt` | title/description ✅ · sitemap 9 URL ✅ · 태그 canonical ✅ · JSON-LD `Article`+`citation` ✅ · `llms.txt` ✅ · **og:image: `/`·`/about`·tag 4 = 있음, `/post/*` 3/3 = 없음** | 🔴 부분 → **D1** |
| 11 | GA4 이벤트 2종 계측 지점, 측정 ID 환경 변수 | `analytics.ts` L10~15 `view_card`/`select_card` · `post-card.tsx` L30~47·L60 · `ga-script.tsx` L10 ID 없으면 null · 빌드 HTML `googletagmanager` 0회(ID 비어 있음) · `.env.example` 값 없음 | ✅ |
| 12 | 보안 — sanitize·CSP·외부 링크 시각 표시 | §1.2 12벡터 · CSP §1 · `external-link.tsx` 아이콘(`aria-hidden` svg 5/5) + sr-only 문구 | ✅ |
| 13 | 접근성 — 키보드·포커스·alt 게이트 | `globals.css` L85 `:focus-visible` 2px · `post-card.tsx` L52 `has-[a:focus-visible]` · Tab 16회 실측 · 케이스 4 | ✅ |
| 14 | 계정·저장소 독립 | 텍스트 64/64 grep 0건, 절대경로 0건, `next.config.ts` L7 `import.meta.dirname`으로 경로 계산(문자열 없음) | ✅ (D2 참조) |
| 15 | `content/README.md` + OG 초안 스크립트 | README 276행: 필드 표·5종 라벨·`sources`·`statusHistory`·`useSourceImage`·예시 3종·검증 표 · `scripts/og-draft.mjs` 의존성 0 | ✅ (R2·R6 참조) |

### 2.2 리뷰어 03 §8 10항

| # | 확인 항목 | 실측 | 판정 |
|---|---|---|---|
| 1 | 5종 명칭 글자 일치 · 심급 필수 · 확장 구조(순방향 강제 X) | `STATUS_LABELS` = CLAUDE.md L80 5종 동일 · 케이스 6 · 케이스 14(역방향 통과)·15(미지 필드 경고만) | ✅ |
| 2 | 대표 이미지 필수 아님 — `example-case-a.md`(이미지 없음) 빌드 통과 | validate 3/3·build 17/17, 홈·상세에 플레이스홀더 `role="img"` 1회씩 실측. URL 유형은 `images` 요구 없음(`schema.ts` L436~442는 photo/photo_text만) | ✅ |
| 3 | `sources[]`≥1 + 유형 enum | L24 `SOURCE_KINDS` 4종 · L283 · 케이스 7 | ✅ |
| 4 | `statusHistory[]` 존재(빈 배열 허용) + 상세 표시 | L346 선택 · `status-history.tsx` · `example-case-c` 상세에 3건 역순 표시 캡처 | ✅ |
| 5 | `useSourceImage` 기본값 · `false` → 플레이스홀더 · 자체 og:image | 기본 `false`(L409) → §3 판정 · `false` 시 placeholder 실측 · og:image는 자체 PNG(단 상세는 D1) | ✅/D1 |
| 6 | 상세 "원문 제목/요약(출처 인용)" 라벨 | `post/[id]/page.tsx` L119·L125 · 상세 HTML에 각 1회 | ✅ (R2 참조) |
| 7 | CSP `img-src` 택일 + `remotePatterns` 정합 기록 | `TECH_STACK.md` §4·§5 존재·근거 기록 | ✅ |
| 8 | `content/README.md` 수준 | 5종·`courtLevel`·`sources`·`useSourceImage`·`statusHistory`·예시·검증 표 모두 기술. 종결 사유는 "본문이나 note에"(README L163) — M3 확정 후 갱신 필요 | ✅ (R6) |
| 9 | `retired-ids.txt` 구현 | 케이스 5 차단. 단 `load.ts` 2차 게이트에는 없음 | ✅ (R4) |
| 10 | 예시 3건 — 라벨 값·`sources`·실명 규칙·실존 지칭 없음 | status `기소`/`의혹`/`유죄판결·1심` · sources 2/1/3건 · 인물명 없음(사건 A/B/C) · URL 전부 `https://example.com/…`(예약 도메인) · 이미지는 도형 PNG 3장(`make-sample-images.mjs`로 생성) | ✅ |

---

## 3. 🔴 판정 — `useSourceImage` 기본값 = **`false`**

| 근거 | 내용 |
|---|---|
| 1. 우선순위 | PRD v0.3 머리말이 "§7과 어긋나면 §7 우선"을 스스로 명시. §7-6 예시가 `useSourceImage: false`. 프로그래머의 `false` 구현은 규칙대로다 |
| 2. 실패 비용의 비대칭 | 기본 `true`(옵트아웃): 슈퍼바이저가 끄는 것을 잊으면 `의혹`·`수사중` 단계 인물의 얼굴이 카드에 노출된다 — §6③이 막으려는 바로 그 리스크이고, 검증 스크립트는 이 실수를 잡을 수 없다(썸네일 내용은 기계가 모른다). 기본 `false`(옵트인): 켜는 것을 잊으면 플레이스홀더 카드가 나올 뿐이며 화면에서 즉시 보이고 나중에 고쳐도 피해가 없다 |
| 3. 운영 현실성 | 슈퍼바이저는 이미 **매 게시물에서 `status`와 `sources`를 사람이 판단해 채워야만** 빌드가 된다(`og-draft`가 비워 내보냄). 썸네일 URL도 같은 초안에 `og.image`로 찍혀 나오므로 "열어 보고 얼굴이 없으면 `true`로 켠다"는 판단 1회가 추가될 뿐이다. 매 건 사람 판단이 전제인 파이프라인에서 이 비용은 한계적이다 |
| 4. fail-closed 보강 | `true`인데 `og.image`가 없으면 빌드 차단(케이스 10). `og.image`는 https만(케이스 11). 스위치 자체가 안전하게 닫힌다 |
| 5. "카드 = 제목 + 이미지" 확정과의 정합 | 사용자 확정 문구는 "이미지 없는 게시물은 플레이스홀더로 카드 형태 유지"를 포함한다. URL 카드가 기본 플레이스홀더인 것은 확정 위반이 아니라 확정이 예정한 상태다. 시각 밀도가 아쉬운 것은 **플레이스홀더의 디자인 문제**(v0.2 디자이너: "이미지 없음" 대신 사이트 표식으로)이지 안전 기본값을 뒤집을 이유가 아니다 |

**후속 지시**
- 기획자 04: PRD §3.2① L151 "기본값 `true`" → **`false`** 로 정정, §6③ "기본 규칙"과 문구 정합.
- 프로그래머 02: `scripts/og-draft.mjs` L159 "다음 할 일 2"를 "og.image URL을 브라우저로 열어 확인하고 **얼굴이 식별되지 않으면 `useSourceImage: true`로 켠다**"로 바꿔 옵트인 절차를 능동형으로.
- 디자이너(v0.2): URL 카드 플레이스홀더를 브랜드 표식 형태로.

---

## 4. 프로그래머 자체 결정 13건 검토

| # | 결정 | 리뷰어 판정 · 근거 |
|---|---|---|
| ① | `?page=n` 공개 URL + `/page/n` 정적 경로 + 미들웨어 rewrite | **안전.** §1.3 실측: 모든 변형에서 canonical 1개·정확, `/page/n`은 robots Disallow + sitemap 제외 + 어디서도 링크 안 함, `?page=1/abc/0`은 1페이지 정본으로 수렴. 크롤러가 보는 URL과 정본이 일치한다. 주의 1건: `/tag/{slug}/?page=1`(후행 슬래시)은 308 리다이렉트 — Next 기본 동작, 문제 없음 |
| ② | CSP `img-src https:` + `remotePatterns` 비움 | **타당.** 열린 프록시 차단 실측(400). 핫링크 `<img>`는 최적화 미경유·`loading=lazy`·폴백 동작. 성능 비용은 카드 썸네일 1장 원본 크기 — 기본값 `false`라 실제 노출 빈도 낮음. 보안 측면에서 `img-src https:`는 스크립트 실행 면과 무관 |
| ③ | JSON-LD `Article`(+`citation`), 상태 라벨 미포함 | **타당.** 큐레이션 사이트가 `NewsArticle`을 쓰면 발행 주체 오인. 라벨을 구조화 데이터에서 뺀 판단도 정책 취지에 맞음. 개선(R9): `image`(자체 OG) 추가 권장 |
| ④ | 검증 스크립트 TS(`tsx`) | **타당.** 스키마 단일 원천이 실측으로 확인됨(케이스 전부 `schema.ts` 메시지). `tsx`는 devDependency, 런타임 번들 무관 |
| ⑤ | 무한스크롤 v0.2 이월 | **승인(조건부).** §7-8이 링크를 필수·무한스크롤을 점진적 향상으로 규정했고 링크는 완성됐다. 다만 "무한스크롤+더보기 하이브리드"는 **사용자 확정 사항**(CLAUDE.md 확정 표)이므로 삭제가 아니라 이월이어야 한다 — 슈퍼바이저가 `design/backlog.md`(또는 PROJECT_STATUS)에 v0.2 항목으로 등록할 것 |
| ⑥ | `FEED_PAGE_SIZE = 12` | 타당(1·2·3·4열 공약수). 상수 1곳 |
| ⑦ | canonical: 페이지네이션만 `<link>` 직접 출력 | 타당. 실측으로 `alternates.canonical`의 쿼리 탈락을 우회했고 중복 canonical 0 |
| ⑧ | id ASCII·태그 한글 허용 | 타당. 태그 경로 `generateStaticParams` 원문 전달로 한글 경로 4/4 200 |
| ⑨ | 웹폰트·다크 테마 없음 | 타당(v0.2 디자이너). `color-scheme: light` 명시 |
| ⑩ | OG 이미지 무문자 도형 | 타당(한글 글리프). 1200×630 PNG 8,119B 실측 |
| ⑪ | 헤더 선언 `vercel.json` 단일 + 로컬만 Next 재사용 | 타당. `process.env.VERCEL === '1'` 분기. **배포 직후 `curl -I` 1회로 플랫폼 적용 확인 필요**(§7) |
| ⑫ | shadcn CLI 없이 3종 직접 작성 | 타당. `components.json` 존재 |
| ⑬ | `NEXT_PUBLIC_SITE_URL` 기본값 없음 | 타당하나 **sitemap 제출 전 필수 설정**. 값이 없으면 canonical·sitemap·og:url이 상대 경로 → GSC 제출 불가. `docs/user-tasks.md` Vercel 항목에 환경 변수 단계를 추가할 것(슈퍼바이저) |

---

## 5. 결함 (필수 수정 — 프로그래머 02)

### D1 (중) 게시물 상세 `/post/[id]`에 `og:image`·`twitter:image`가 없다
- **실측**: 9페이지 HTML grep — `/`·`/about`·`/tag/*` 4건에는 `<meta property="og:image" content="…/opengraph-image?a59e…">`·`og:image:width/height/alt`·`twitter:image` 존재. **`/post/example-case-{a,b,c}` 3/3에 `og:image`·`twitter:image` 태그 0개**(`og:title`·`og:description`·`og:url`·`og:type=article`·`twitter:card`만 있음).
- **원인**: `src/app/post/[id]/page.tsx` L36~43 `generateMetadata`가 `openGraph` 객체를 새로 반환하면서 `images`를 넣지 않았다. Next 메타데이터는 `openGraph`를 깊은 병합하지 않으므로 루트 `opengraph-image.tsx`가 만든 이미지가 게시물 경로에서 떨어진다. `twitter`는 `openGraph.images`에서 파생되므로 함께 사라진다.
- **영향**: §7-10 "게시물별 자체 og:image" 미충족. 공유 URL은 게시물 상세이므로 SNS·메신저 미리보기에 이미지가 없다 — 사용자 확정 유입 경로(공유 URL)의 핵심 표면. 핸드오프 §7-10 "✅"·검증표 "OG 이미지 실체 확인"은 `/opengraph-image` 엔드포인트만 확인한 것이라 **보고가 부정확**하다.
- **수정안**(Next 공식 패턴, 3줄):
  ```ts
  export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
    …
    const parentImages = (await parent).openGraph?.images ?? []
    return { …, openGraph: { …, images: parentImages } }
  }
  ```
  또는 `images: ['/opengraph-image']`. 수정 후 확인 명령: `curl -s http://localhost:3000/post/example-case-a | grep -c 'property="og:image"'` → 1 이상, `twitter:image` 동일.

### D2 (경미) `package.json` `engines.node ">=20.9.0"` ↔ `next.config.ts` L7 `import.meta.dirname`
- `import.meta.dirname`은 Node **20.11.0 / 21.2.0**에서 추가됐다. 선언된 최소 버전 20.9·20.10에서는 `undefined`가 되어 `path.join(undefined, 'vercel.json')`이 TypeError로 **빌드 시작 자체가 실패**한다. Vercel 기본 Node(22)에서는 재현되지 않지만 `engines`는 사실과 달라선 안 된다.
- **수정안**: `"node": ">=20.11.0"` 으로 올리거나, `fileURLToPath(new URL('.', import.meta.url))`로 계산(경로 문자열 없이 독립 원칙 유지).

### D3 (보고 정확도) 핸드오프 숫자 불일치 — 코드 결함 아님, 기록
| 항목 | 핸드오프 | 실측 |
|---|---|---|
| `src/**` 파일 수 | 44 | **42** (`find src -type f`) |
| `src/**` 줄 수 | 2,773 | **2,665** (전 파일) / 2,659 (ts·tsx·css) |
| 저장소 독립 grep 대상 | 89파일 | **86** (리뷰 시작 시점 `git ls-files --others --exclude-standard` + 수정 1) |
결과(0건·통과)에는 영향 없으나 "전수 = 숫자 증명" 원칙상 다음 핸드오프부터 산출 명령을 함께 적을 것.

---

## 6. 권고

### 상
- **R1 본문 마크다운 이미지 핫링크 우회** — `![alt](https://…)`가 `rehype-sanitize` 기본 스키마를 통과해 `<img src="https://…">`로 렌더된다(§1.2). 이 경로는 `images[]`의 alt 게이트·`useSourceImage` 정책·깨짐 폴백을 전부 우회하고, `.post-body img` 스타일까지 준비돼 있어 "쓰라는" 신호로 읽힌다. 사진은 `images[]`로만 넣는 것이 정책이므로 **sanitize 스키마에서 `img`를 제거**하거나(권장, `markdown.ts` `rehypeSanitize` 옵션에 `tagNames`에서 `img` 제외), 검증 정규식에 `!\[` 패턴을 추가해 차단할 것. `content/README.md` §2에 "본문 이미지 금지, `images[]` 사용" 1문장 추가.
- **R2 `og-draft`가 원문 헤드라인을 `title`에 복사** — `scripts/og-draft.mjs` L125 `title: ogTitle`, L126 `description: ogDescription`. 그대로 저장하면 사이트 h1·카드 제목·`<title>`·meta description·JSON-LD headline이 원문과 **글자 그대로 동일**해지고, 카드·h1에는 "출처 인용" 라벨이 없다(라벨은 상세의 `og.*` 상자에만). §6③의 인용 예외는 `og.title`에만 성립하는데 기본 산출물은 `title`에도 실명 헤드라인을 흘려보낸다. **수정안**: `title: ""  # TODO 운영자가 인용형으로 작성(예: "…로 보도됨")`·`description: ""`로 비워 내보내 `status`·`sources`처럼 사람 판단을 강제(빈 값은 검증이 막는다). README §1·§5에 반영.
- **R3 CSP Report-Only에 보고 채널 없음** — `vercel.json` L21에 `report-to`/`report-uri`가 없어 위반은 방문자 devtools 콘솔에만 남는다. TECH_STACK §5 "실제 위반 리포트를 보고 강제로 올린다"는 계획을 실행할 수집 경로가 없다. v0.1.5(GA 연동)에서 `Reporting-Endpoints` 헤더 + 수집 엔드포인트(외부 무료 서비스 또는 자체 route) 추가를 과제로 등록. 지금은 배포 후 devtools로 수동 확인이라고 TECH_STACK에 정직하게 적을 것.

### 중
- **R4 폐기 ID 검사가 2차 게이트에 없음** — `load.ts` L34~61은 "검증을 건너뛴 빌드가 통과하지 못하게" 스키마 검증·중복 id를 재검사하지만 `retired-ids.txt`는 `scripts/validate-content.ts`에서만 읽는다. `npx next build`를 직접 치면 폐기 ID가 통과한다. `readRetiredIds`를 `src/lib/content/`로 옮겨 두 곳에서 공유.
- **R5 `npm audit` high 1** — `next@15.5.25` 동봉 `postcss@8.4.31`(GHSA 4건: sourceMappingURL 경로 조작·`.map` 노출·`</style>` XSS). 전부 **빌드 시점**에 신뢰되지 않은 CSS/소스맵을 처리할 때의 문제이고, 이 저장소는 자체 CSS만 빌드하며 런타임에 postcss가 없다 → 배포 차단 사유 아님. 수정은 next 16(major)뿐이므로 v0.1.5 이후 Next 15.x 패치 릴리스 여부를 재확인. `docs/user-tasks.md` 또는 TECH_STACK §14에 기록.
- **R6 README 실명 규칙·종결 사유가 PRD v0.3 문구** — `content/README.md` L179~183(의혹·수사중만 이니셜 → 리뷰어 03 M1: `유죄판결` 외 4단계 이니셜로 확정 예정)·L163(종결 사유를 본문/note에 → M3: 하위 필드 신설 예정). 기획자 04 PRD v0.4 커밋 후 프로그래머 02가 README §4·§5·§3.4와 `schema.ts`(`종결` 사유 필드·`기소` 병기 필드)를 함께 갱신. **지금은 결함 아님** — 프로그래머는 착수 시점 문서를 따랐다.

### 하
- **R7** 라벨→색 매핑 중복: `about/page.tsx` L67~77이 `status-badge.tsx` L4~10 `TONE_BY_STATUS`와 같은 표를 삼항으로 다시 쓴다. TECH_STACK §2 "바꿀 곳 세 군데"는 실제로 다섯 군데(+about, +`opengraph-image.tsx` `BARS`, +`globals.css` 토큰). `TONE_BY_STATUS`를 export해 재사용.
- **R8** `site-footer.tsx` L7 `text-[#3f3f46]` 하드코딩 — 토큰(`--muted-foreground` 또는 신규)으로. 디자이너 v0.2 토큰 교체 시 누락 지점.
- **R9** JSON-LD `Article`에 `image` 없음 — 자체 OG PNG 절대 URL을 넣으면 리치 결과 권장 필드 충족(D1과 함께).
- **R10** `source-list.tsx` L15·`status-history.tsx` L20 React key가 `url-date`·`date-from-to` 조합 — 같은 날 같은 URL 2건이면 충돌 경고. index 병기.
- **R11** `docs/qa/programmer-01/` PNG 19장 3.5 MB가 커밋 대상 — 허용하되, 이후 QA 캡처는 대표 4장 이내로 제한하거나 커밋 제외를 검토(저장소 비대화).

---

## 7. 배포 직후 슈퍼바이저 확인 항목 (CLAUDE.md §9 — `curl` 1~2회)

1. `curl -sI https://<배포 도메인>/ | grep -iE 'strict-transport|x-content-type|x-frame|referrer-policy|permissions-policy|content-security'` → 6줄. Vercel 경로에서 `vercel.json` 헤더가 붙는지(로컬은 `next.config.ts` 경유였음).
2. `curl -s https://<배포 도메인>/post/example-case-a | grep -oE 'property="og:image" content="[^"]*"'` → D1 수정 반영 + `NEXT_PUBLIC_SITE_URL` 설정으로 **절대 URL**인지. 상대 경로면 환경 변수 미설정.
- 위 2회로 끝. 성능·화면 측정은 로컬 프로덕션에서(테스터).

---

## 8. 프로그래머 02 지시안 (슈퍼바이저 md오더 초안)

```
## 필수 (리뷰어 04 결함 D1·D2) — 수정 후 슈퍼바이저 확인 명령 통과 시 커밋·푸시 (리뷰어 재호출 불필요)
1. src/app/post/[id]/page.tsx generateMetadata: openGraph.images에 루트 opengraph-image 상속(parent.openGraph.images) 또는 '/opengraph-image' 명시.
   확인: 로컬 프로덕션에서 curl /post/example-case-a → og:image·twitter:image 각 1개 이상.
2. package.json engines.node ">=20.11.0" (또는 next.config.ts를 fileURLToPath 방식으로). 확인: npm run build 통과.
## 함께 (권고 상 R1·R2·R3, 판정 §3)
3. markdown.ts sanitize 스키마에서 img 제거 + README §2 "본문 이미지 금지" 1문장. 확인: fixture-sanitize.md 렌더에 <img> 0.
4. og-draft.mjs: title/description 빈 값 + TODO 주석, "다음 할 일 2"를 옵트인 능동형으로. README §1·§5 반영.
5. TECH_STACK §5에 "Report-Only 위반은 현재 devtools 수동 확인, report-to는 v0.1.5 과제" 명시.
## 이월 (PRD v0.4 커밋 후 별도 오더)
6. R6 — schema.ts 종결 사유·기소 병기 필드 + README §3.4·§4·§5 갱신 + retired 검사 공유(R4).
## 검증 보고: 읽은/바꾼 파일 목록 + 위 확인 명령 출력 원문 + 저장소 독립 grep 0건. 산출 명령 병기(D3).
```

---

## 9. 리뷰어 자체 한계·확인 필요
- 배포 도메인이 없어 Vercel 플랫폼 헤더·`NEXT_PUBLIC_SITE_URL` 절대 URL은 미확인 → §7로 이월.
- 실기기(iOS Safari·Android Chrome) 렌더는 미확인. 헤드리스 Chrome 390/1280 에뮬레이션만.
- Lighthouse 점수는 측정하지 않았다(테스터 영역). 정적 생성·First Load 103~123 kB만 확인.
- `import.meta.dirname` 도입 버전(Node 20.11.0)은 Node 공식 변경 이력 기준이며, 20.9 환경을 직접 띄워 재현하지는 않았다.
- PRD는 HEAD(v0.3, 622ea3f)를 기준으로 대조했다. 작업트리의 `planning/prd.md`는 기획자 04가 v0.4로 수정 중(미커밋)이라 판정 근거로 쓰지 않았다.
- 산출물은 한 글자도 수정하지 않았다. 실험을 위한 임시 변경(`config.ts` 상수·임시 게시물 2건)은 전부 원복했고 `cmp`·`git status`·`ls content/posts`로 확인했다.
