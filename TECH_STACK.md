# TECH_STACK — v0.1 프로토타입

**작성**: 프로그래머 (Opus 5) · 2026-09-21 | **대상 버전**: v0.1 열람 전용 프로토타입

선택한 것과 **왜 그것인지**를 적는다. 다음 담당자가 같은 판단을 다시 하지 않게 하는 것이 목적이다.

---

## 1. 버전 고정 목록

패키지는 전부 **정확한 버전으로 고정**했다(캐럿 없음). 빌드가 어제와 다르게 도는 상황을 만들지 않기 위해서다.

| 구분 | 패키지 | 버전 | 비고 |
|---|---|---|---|
| 프레임워크 | `next` | 15.5.25 | 사용자 확정 스택이 Next.js 15. 조회 시점 최신은 16.3.5였으나 **15 계열 최신**을 택했다 |
| UI | `react` / `react-dom` | 19.3.0 | |
| 언어 | `typescript` | 5.9.3 | 최신은 7.0.2였으나 `eslint-config-next@15`·Next 15가 검증한 조합이 5.x라 5 계열 최신을 택했다 |
| 스타일 | `tailwindcss` + `@tailwindcss/postcss` | 4.3.3 | v4의 CSS-first 설정. `tailwind.config.js` 없이 `globals.css`의 `@theme`로 토큰을 정의한다 |
| 컴포넌트 | shadcn/ui 패턴 | — | `components.json`을 두고 `card`·`badge`·`button` 3종을 같은 구조로 직접 작성했다. shadcn/ui는 원래 복사해 쓰는 방식이고, v0.1에 필요한 것이 3종뿐이라 CLI 없이 시작했다. 이후 CLI로 컴포넌트를 추가해도 그대로 붙는다 |
| 아이콘 | `lucide-react` | 0.545.0 | shadcn 기본 아이콘 세트 |
| frontmatter | `gray-matter` | 4.0.3 | |
| 마크다운 | `unified` + `remark-parse`/`remark-gfm`/`remark-rehype` + `rehype-sanitize`/`rehype-external-links`/`rehype-stringify` | 아래 §3 | |
| 스크립트 실행 | `tsx` | 4.23.15 | 검증 스크립트를 TypeScript로 쓰기 위한 devDependency |
| 린트 | `eslint` 9.39.5 + `eslint-config-next` 15.5.25 | | flat config |

Node는 `engines`에 `>=20.9.0`으로 명시했다(Next 15 요구 사항). 로컬 검증은 Node 24.14.0에서 했다.

---

## 2. 콘텐츠 검증을 TypeScript로 쓴 이유

`scripts/validate-content.ts`는 `tsx`로 실행하고, 화면 코드와 **같은 스키마 파일**
(`src/lib/content/schema.ts`)을 import한다.

대안은 검증 스크립트를 순수 `.mjs`로 쓰는 것이었는데, 그러면 상태 라벨 enum·필수 필드 목록이
스크립트와 화면 코드 두 곳에 생긴다. 라벨 명칭은 기획에서 아직 바뀔 수 있는 값이라
(리뷰어 02 §7-1: "확장 가능한 문자열 유니언으로 잡고 확정값이 오면 값만 교체")
두 벌로 갈라지면 "검증은 통과하는데 화면은 깨지는" 상태가 만들어진다.
`tsx` 하나를 devDependency로 받는 비용이 그보다 싸다고 판단했다.

라벨을 바꿀 때 손댈 곳은 `src/lib/content/schema.ts`의 `STATUS_LABELS` 배열과
`STATUS_DEFINITIONS`, 그리고 `src/components/status-badge.tsx`의 색 매핑 세 군데다.

---

## 3. 마크다운 파이프라인과 sanitize

```
remark-parse → remark-gfm → remark-rehype → rehype-sanitize → rehype-external-links → rehype-stringify
```

- `remark-rehype`를 **`allowDangerousHtml` 없이** 통과시켜 원본 HTML을 통째로 버린다.
- 그 위에 `rehype-sanitize`(GitHub 기본 스키마)를 한 번 더 건다.
- **순서가 중요하다.** `rehype-external-links`를 sanitize보다 **뒤**에 둔다. 앞에 두면
  방금 붙인 `target`·`rel`이 기본 스키마에서 떨어져 나간다.
- `rehype-external-links`의 기본 `rel`은 `nofollow`다. 이 프로젝트의 링크 정책과 정반대이므로
  **명시적으로 `['noopener']`로 덮어썼다**(리뷰어 02 §7-5가 지적한 "마크다운 렌더러 자동 rel 충돌" 지점).
- 본문에 `<script>`·`<iframe>` 류가 있으면 렌더 전에 **검증에서 먼저 오류**로 막는다.

---

## 4. 이미지 — 핫링크와 `remotePatterns`

| 이미지 | 처리 |
|---|---|
| 저장소 보유 (`public/images/**`) | `next/image`로 최적화 |
| 원문 OG 썸네일 (핫링크) | 최적화를 거치지 않는 `<img>` |

`remotePatterns`를 **비워 두었다.** 원문 썸네일의 호스트는 게시물마다 달라서 허용하려면
`hostname: '**'`를 열어야 하는데, 그러면 이 사이트의 이미지 최적화 엔드포인트가
**아무나 임의의 외부 이미지를 리사이즈시킬 수 있는 열린 프록시**가 된다. 정적 사이트에서
유일하게 돈과 대역폭을 쓰는 지점을 제3자에게 여는 셈이라 택하지 않았다.
원문 썸네일은 미리보기 용도라 최적화 이득도 크지 않다.

**깨진 핫링크 자동 전환**(§7-6 요구)은 클라이언트에서 처리한다(`src/components/card-media.tsx`).
여기에 함정이 하나 있어 적어 둔다 — 정적 HTML이라 **이미지 로드 실패가 하이드레이션보다 먼저 끝나고,
그 경우 `onError`는 React가 핸들러를 붙기 전에 이미 지나가 버린다.** `onError`만 달면 깨진 썸네일이
그대로 남는다(실제로 그렇게 나왔고 스크린샷으로 확인했다). 그래서 마운트 시점에
`img.complete && img.naturalWidth === 0`을 직접 확인하는 경로를 함께 둔다.

---

## 5. CSP — `img-src`를 열거식으로 만들지 않았다

리뷰어 02 §7-7·P3이 제시한 두 선택지 중 **`img-src https:`** 를 택했다.

- 열거식 화이트리스트는 게시물마다 새 매체가 등장할 때 CSP를 다시 배포해야 해서,
  "파일 커밋만으로 게시"라는 파이프라인이 깨진다.
- 나머지 선택지인 패스스루 프록시는 서버 코드가 생기고(정적 사이트 전제가 흔들린다)
  §4에서 피한 열린 프록시 문제가 그대로 돌아온다.
- 대신 **스크립트·프레임은 엄격하게** 묶었다: `object-src 'none'`, `frame-src 'none'`,
  `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`.

지금은 **Report-Only**다. `script-src`에 `'unsafe-inline'`이 필요한데(Next의 하이드레이션 부트스트랩),
이것을 없애려면 요청마다 nonce를 발급해야 하고 그러면 모든 페이지가 정적 생성에서 빠진다.
v0.1은 전 페이지 정적이 더 중요해 Report-Only로 시작한다.
**v0.1.5에서 GA를 붙인 뒤** 실제 위반 리포트를 보고 강제로 올리는 것을 다음 과제로 남긴다.

⚠️ **지금은 위반 리포트를 모으는 경로가 없다.** `vercel.json`에 `Reporting-Endpoints`·`report-to`·
`report-uri`를 두지 않았으므로, 위반은 **그 페이지를 연 사람의 브라우저 devtools 콘솔에만** 남고
운영자에게 도달하지 않는다. 즉 v0.1 단계에서 위반을 확인하는 방법은 **배포본을 직접 열어
devtools 콘솔을 수동으로 보는 것뿐**이다.
수집 경로(`Reporting-Endpoints` 헤더 + 수집 엔드포인트 — 외부 무료 서비스 또는 자체 route) 추가는
**v0.1.5 과제**로 등록한다. 그것이 없는 상태에서 "리포트를 보고 강제로 올린다"는 계획은 실행할 수 없다.

### 헤더 선언을 한 곳에만 둔 방법

보안 헤더의 선언은 `vercel.json` 한 곳에 있다. 다만 `next start`로 도는 로컬 프로덕션 빌드에는
Vercel이 없어서 헤더가 붙지 않고, 그러면 **헤더를 실측할 방법이 사라진다**(CLAUDE.md §9는 측정을
로컬 프로덕션 빌드에서 하라고 정하고 있다). 그래서 `next.config.ts`가 `vercel.json`을 읽어
**Vercel이 아닌 환경에서만** 같은 헤더를 적용한다. 선언은 한 벌이고, 로컬에서 `curl -I`로 확인되며,
Vercel에서는 플랫폼이 적용하므로 중복되지 않는다.

---

## 6. 페이지네이션 — `?page=n`과 정적 생성을 둘 다 지킨 방법

요구가 두 개인데 App Router에서 정면으로 충돌한다.

- (a) "더 보기"는 크롤러가 따라갈 수 있는 **실제 `<a href="?page=n">`** 여야 한다(§7-8).
- (b) 초기 N장은 **정적 생성(SSG)** 이어야 한다.

App Router에서 `searchParams`를 읽는 페이지는 정적 생성 대상에서 빠지므로, `/`가 `?page=`를
직접 읽으면 (b)가 깨진다. 그래서 이렇게 나눴다.

```
공개·링크되는 URL : /?page=2          ← 크롤러가 보는 주소
내부 정적 경로     : /page/2           ← 빌드 시 생성, 어디에서도 링크하지 않음
src/middleware.ts  : /?page=2 → /page/2 rewrite (주소는 그대로)
```

- 태그 피드도 같은 방식이다: `/tag/{slug}?page=2` → `/tag/{slug}/page/2`.
- `?page=1`은 쿼리를 떼어 기본 경로를 보여준다(중복 URL 방지). 숫자가 아니면 1페이지로 처리한다.
- `/page/**`는 `robots.txt`에서 `Disallow`하고 `sitemap.xml`에도 넣지 않는다. canonical은
  공개 URL(`/?page=2`)을 가리키므로 정본은 하나뿐이다.
- 결과: 19개 라우트가 전부 정적(`○`/`●`)으로 생성된다. 미들웨어만 엣지에서 돈다.

### canonical에 쓴 우회

`metadata.alternates.canonical`은 pathname이 `/`인 URL을 오리진으로 정규화하면서
**쿼리스트링을 떨어뜨린다**(실측: `/?page=2` → `http://host`). 그러면 2페이지가 1페이지와 같은
정본을 선언하게 된다. 페이지네이션 경로만 `src/components/canonical-link.tsx`로
`<link rel="canonical">`을 직접 내보낸다. 나머지 페이지는 `alternates.canonical`을 그대로 쓴다.

### `FEED_PAGE_SIZE = 12`

`src/lib/config.ts` 한 곳에 있다. 12를 고른 이유는 그리드가 1·2·3·4열로 바뀌는데
12가 넷 모두로 나누어져 **어떤 화면에서도 마지막 줄이 비지 않기** 때문이다.
게시 빈도·볼륨이 미정이라(사용자 답변 11) 실제 축적량을 보고 이 상수만 조정하면 된다.

> 무한스크롤은 v0.1에 넣지 않았다. "더 보기" 링크가 필수 요건이고 무한스크롤은 그 위에 얹는
> 점진적 향상인데, 지금 게시물이 3건이라 **동작을 한 번도 확인할 수 없는 코드**가 된다.
> 게시물이 쌓인 뒤 v0.2에서 다루는 것이 맞다고 판단했다.

---

## 7. JSON-LD — `NewsArticle`이 아니라 `Article`

| 페이지 | 타입 |
|---|---|
| 전역 | `WebSite` (+ `Organization` publisher) |
| `/`, `/tag/[slug]` | `CollectionPage` + `ItemList` |
| `/post/[id]` | `Article` + `BreadcrumbList` |
| `/about` | `AboutPage` |

`NewsArticle`은 뉴스 조직의 자체 취재물을 전제하는 타입이다. 이 사이트는 언론사가 아니라
타 매체 보도를 인용·정리하는 큐레이션 소식지이므로, `NewsArticle`을 붙이면 발행 주체를
오인시킨다 — 소재가 특정인 관련 의혹이라 그 오인의 대가가 크다.
구조화 데이터의 이득(제목·요약·날짜·출처)은 일반 `Article`로도 그대로 얻고,
근거 출처는 `citation`으로 명시한다.

🔴 **상태 라벨은 JSON-LD에 넣지 않았다.** 유죄·무죄에 관한 기계 판독 가능한 주장이 되는 것을
피하기 위해서다. 라벨은 사람이 읽는 화면과 `llms.txt`에만 둔다.

---

## 8. `llms.txt` — 도입

`/llms.txt`를 빌드 시 콘텐츠에서 자동 생성한다.

핵심 축 3(AI 검색 최적화)의 목표가 "LLM이 정확히 인용하게 만드는 것"인데, 이 사이트에서 가장
잘못 인용될 위험이 큰 정보가 **상태 라벨의 의미**다(기소를 유죄로 요약하는 종류의 오인).
그 정의와 인용 규칙을 기계가 읽는 평문으로 한 번 더 못 박는 비용이 정적 파일 하나이고,
콘텐츠에서 자동 생성되므로 관리 부담도 없다.

---

## 9. OG 이미지 — 무문자 도형

`src/app/opengraph-image.tsx`가 `next/og`로 1200×630 PNG를 빌드 시 생성한다.
원문 썸네일은 이 사이트 명의 공유 미리보기로 **재사용하지 않는다**(§7-6).

문자를 넣지 않았다. `ImageResponse`의 내장 폰트에 한글 글리프가 없어 한글을 그리면 두부가 되고,
한글 서체 파일을 저장소에 넣는 것은 브랜드 서체 결정(v0.2 디자이너)과 묶여야 할 사안이기 때문이다.
v0.1은 상태 라벨 5종의 색을 쓴 도형으로 두고, 타이포 OG는 v0.2 과제로 남긴다.

---

## 10. 폰트·테마

- **웹폰트 없음.** 시스템 한글 폰트 스택을 쓴다. 담백한 톤에 맞고 추가 네트워크 요청·CLS·
  빌드 시점 폰트 다운로드 의존성이 전혀 없다. 브랜드 서체는 v0.2 디자이너 결정 항목이다.
- **다크 테마 없음.** 토글이 없는 상태에서 다크 토큰만 넣으면 **한 번도 확인되지 않은 코드**가
  남는다. `color-scheme: light`를 명시하고 v0.2로 넘긴다.
- 색 대비는 `docs/tools/programmer-01/contrast-check.mjs`로 실측한다 — 12쌍 전부 4.5:1 이상 통과.

---

## 11. 안정 ID — 문자셋과 폐기 목록

- `id`는 **소문자 영숫자 + 하이픈**만 허용한다(한글 불허). 한글 id는 URL에서 퍼센트 인코딩되어
  공유 링크 가독성·검색 콘솔 보고서 가독성이 떨어지고, v0.4~v0.6에서 이 값이 DB 키·localStorage
  키로 들어갈 때 인코딩 불일치 사고가 나기 쉽다.
- **태그는 한글을 허용한다.** 태그는 외래키가 아니고 읽는 사람에게 의미가 있는 값이라
  `/tag/예시사건`처럼 주소에 그대로 드러나는 편이 낫다고 판단했다.
- **폐기 ID 재사용 금지**(§7-4)는 `content/retired-ids.txt` 파일로 집행한다. 게시물을 내릴 때
  id를 이 파일에 한 줄 추가하면, 이후 같은 id를 쓴 게시물은 빌드에서 막힌다.

---

## 12. GA4 계측 지점 (v0.1.5 대비)

- `src/lib/analytics.ts` — `NEXT_PUBLIC_GA_ID`가 비어 있으면 **전부 no-op**이다.
- `src/components/analytics/ga-script.tsx` — 측정 ID가 없으면 스크립트 자체를 넣지 않는다.
- 이벤트 2종: `view_card`(IntersectionObserver, 노출 50%에서 1회) / `select_card`(카드 클릭).
  CTR의 분모·분자가 모두 있어야 §10 KPI를 산출할 수 있다.
- 측정 ID는 환경 변수로만 주입한다. `.env.example`에 자리만 있고 값은 커밋하지 않는다.
- ⚠️ CSP를 강제로 올릴 때 `script-src`·`connect-src`에 googletagmanager·google-analytics를
  허용해야 한다(`vercel.json`에 이미 들어 있다).

---

## 13. 환경 변수

| 변수 | 필요 시점 | 없으면 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 배포 도메인 확정 후 | canonical·sitemap·OG URL이 상대 경로로 나간다. **sitemap 제출 전 반드시 설정해야 한다** |
| `NEXT_PUBLIC_GA_ID` | v0.1.5 | GA 스크립트·이벤트가 통째로 비활성 |

둘 다 Vercel 프로젝트 환경 변수로 넣는다. `.env*.local`은 `.gitignore`에 있다.

---

## 14. 남은 판단 (다음 담당자용)

- **이미지 호스팅**: v0.1은 `public/images/`로 시작한다. 게시물·이미지가 늘어 저장소가 무거워지면
  R2 전환을 검토한다(`docs/user-tasks.md` 4번). 지금 판단할 데이터가 없다.
- **무한스크롤**: 위 §6.
- **다크 테마·브랜드 서체·타이포 OG**: v0.2 디자이너.
- **CSP 강제 전환**: v0.1.5 이후.
