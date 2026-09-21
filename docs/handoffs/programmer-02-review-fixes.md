# 프로그래머 세션 — 02-review-fixes 핸드오프
**작성일**: 2026-09-21 15:30 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
1. 리뷰어 04 결함 D1·D2와 권고 상 R1·R2·R3을 반영하고, D3(보고 숫자)을 산출 명령과 함께 정정했다.
2. R2를 확인하는 과정에서 **내가 01에서 문서화한 `og:draft` 사용 명령이 실제로는 동작하지 않는다는 것**을 발견해 함께 고쳤다(아래 §추가 수정 2건). 검증은 전부 직접 실행했고 출력 원문을 그대로 실었다.
3. 🔴 **커밋하지 않았다.** 작업트리에 남겼다. 슈퍼바이저가 확인 명령으로 검증하고 첫 커밋·푸시한다.

---

## 바꾼 파일

| 파일 | 무엇을 |
|---|---|
| `src/app/post/[id]/page.tsx` | **D1** — `generateMetadata`에 `ResolvingMetadata` 인자 추가, `openGraph.images`에 상위 이미지 상속 |
| `next.config.ts` | **D2** — `import.meta.dirname` → `fileURLToPath(new URL('.', import.meta.url))` |
| `src/lib/content/markdown.ts` | **R1** — sanitize 스키마에서 `img` 태그 제거(`bodySchema`) |
| `src/app/globals.css` | **R1** — `.post-body img` 규칙 삭제("본문에 이미지를 써도 된다"는 신호 제거) |
| `src/lib/content/schema.ts` | **R1** — 본문 마크다운 이미지 경고 추가 / **추가 수정 2** — `og.image` 빈 값을 '없음'으로 처리 |
| `scripts/og-draft.mjs` | **R2** — `title`·`description` 빈 값 + TODO, 안내 문구 옵트인 능동형 / **추가 수정 1·2** — 사용법 `--silent` 명시, `sources[].type` 비움 |
| `content/README.md` | **R1** §2 본문 이미지 금지 / **R2** §1 초안 설명 / **R6 이월** §5 "PRD §6③ 최신본 참조" / **추가 수정 1** §1 명령 정정 / §8 표에 경고 행 |
| `TECH_STACK.md` | **R3** — §5에 "위반 리포트 수집 경로 없음 · devtools 수동 확인 · `report-to`는 v0.1.5 과제" |
| `docs/handoffs/programmer-01-v0.1-prototype.md` | **D3** — 문서 머리에 정정 주석(og:image "✅" 오보 + 숫자 3건) |
| `docs/qa/programmer-02/*.png` (신규 4장) | 수정 후 화면 재확인. **R11 권고대로 대표 4장으로 제한**(01은 19장 3.5 MB → 02는 4장 952 KB) |

> 이번 세션에서 `planning/prd.md`·`CLAUDE.md`·`PROJECT_STATUS.md`·`instructions/planner/`·`docs/supervisor/`는
> 건드리지 않았다(다른 세션이 병행 수정 중). `tsconfig.tsbuildinfo`·`.next`·`.env.local`은 `.gitignore` 대상이며
> `git status`에 노출되지 않는 것을 확인했다.

---

## 반영 표

| 항목 | 처리 | 확인 방법 |
|---|---|---|
| **D1** 게시물 상세에 `og:image`·`twitter:image` 없음 | 반영 | 아래 §확인 명령 1 — 3/3 통과 + 이미지 URL을 따라가 실제 PNG까지 확인 |
| **D2** `engines.node` ↔ `import.meta.dirname` 불일치 | 반영 | 아래 §확인 명령 2 |
| **R1** 본문 마크다운 이미지 핫링크 우회 | 반영 | 아래 §확인 명령 3 — 리뷰어 픽스처 렌더 `<img>` 0 |
| **R2** `og-draft`가 원문 헤드라인을 `title`에 복사 | 반영 | 아래 §확인 명령 4 |
| **R3** CSP Report-Only 보고 채널 없음 | 반영(문서) | `TECH_STACK.md` §5 |
| **D3** 핸드오프 숫자 | 정정 | 아래 §D3 |
| **R6** README 실명 규칙 | "PRD §6③ 최신본 참조" 한 줄만(지시대로) | `content/README.md` §5 |
| **R6 본체**(`closureReason`·`priorVerdict`)·**R4**(retired 검사 공유) | **구현 안 함** — PRD v0.5 확정 후 프로그래머 03 | — |

---

## 확인 명령 (출력 원문 그대로)

로컬 프로덕션: `npm run build && npx next start -p 3000` (`.env.local`에 `NEXT_PUBLIC_SITE_URL=http://localhost:3000`)

### 1. D1 — `og:image` · `twitter:image`

```
$ curl -s http://localhost:3000/post/example-case-a | grep -c 'property="og:image"'
1
$ curl -s http://localhost:3000/post/example-case-a | grep -c 'twitter:image'
2
$ curl -s http://localhost:3000/post/example-case-b | grep -c 'property="og:image"'
1
$ curl -s http://localhost:3000/post/example-case-b | grep -c 'twitter:image'
2
$ curl -s http://localhost:3000/post/example-case-c | grep -c 'property="og:image"'
1
$ curl -s http://localhost:3000/post/example-case-c | grep -c 'twitter:image'
2
```

실제 태그(3건 동일):

```
<meta property="og:image:alt" content="공산당이싫어요 — 간첩 행위·간첩 의혹을 출처와 상태로 정리하는 카드형 소식지"
<meta property="og:image:type" content="image/png"
<meta property="og:image" content="http://localhost:3000/opengraph-image?a59e9178c911b23c"
<meta property="og:image:width" content="1200"
<meta property="og:image:height" content="630"
<meta name="twitter:card" content="summary_large_image"
<meta name="twitter:image" content="http://localhost:3000/opengraph-image?a59e9178c911b23c"
<meta name="twitter:image:width" content="1200"
<meta name="twitter:image:height" content="630"
```

🔴 **01에서 지적받은 것(엔드포인트만 보고 보고)을 반복하지 않기 위해, 페이지에 적힌 URL을 그대로 따라가 실제 이미지인지까지 확인했다.**

```
/post/example-case-a → http://localhost:3000/opengraph-image?a59e9178c911b23c
   HTTP 200 · content-type image/png · 8119 bytes
   file: PNG image data, 1200 x 630, 8-bit/color RGBA, non-interlaced
/post/example-case-b → http://localhost:3000/opengraph-image?a59e9178c911b23c
   HTTP 200 · content-type image/png · 8119 bytes
   file: PNG image data, 1200 x 630, 8-bit/color RGBA, non-interlaced
/post/example-case-c → http://localhost:3000/opengraph-image?a59e9178c911b23c
   HTTP 200 · content-type image/png · 8119 bytes
   file: PNG image data, 1200 x 630, 8-bit/color RGBA, non-interlaced
```

또한 페이지 자체가 정상 렌더되는지 실브라우저로 확인했다 — `docs/qa/programmer-02/post-url--{mobile-390,desktop-1280}.png`.

### 2. D2 — Node 호환

`import.meta.dirname`(Node 20.11.0+) 대신 버전 제약이 없는 `fileURLToPath(new URL('.', import.meta.url))`를 썼다.
`engines.node`는 `">=20.9.0"` 그대로 두었다 — 이제 그 값이 사실과 맞는다(Next 15.5의 요구는 `>= 20.0.0`, `node_modules/next/package.json` 확인).

```
$ node -e "const {fileURLToPath}=require('node:url'); console.log(fileURLToPath(new URL('.', 'file://'+process.cwd()+'/next.config.ts')))"
/Users/…/ihatekongsandang/          ← 프로젝트 루트로 정확히 계산됨(경로는 마스킹)

$ npm run build
 ✓ Compiled successfully in 3.7s
 ✓ Generating static pages (17/17)
```

⚠️ **Node 20.9 실환경은 띄워 보지 않았다.** 다만 이 수정은 버전 게이트가 걸린 API를 **제거**한 것이라 재현 테스트가 아니라 구성으로 문제를 없앴다.

### 3. R1 — 본문 마크다운 이미지 차단

리뷰어 04의 픽스처를 그대로 투입해 렌더했다.

```
$ cp docs/tools/reviewer-04/fixture-sanitize.md content/posts/zz-sanitize.md
$ npm run build && npx next start -p 3000
$ curl -s http://localhost:3000/post/zz-sanitize | grep -c "<img"
0
```

렌더된 본문 전문:

```html
<p>문단 REVIEWER_P_MARKER 시작.</p>
<p>굵게</p>
<p>REVIEWER_RAW_ANCHOR</p>
<p><a>REVIEWER_JS_LINK</a></p>
<p><a>REVIEWER_DATA_LINK</a></p>
<p><a href="https://example.com/md-external" rel="noopener" target="_blank">REVIEWER_MD_EXTERNAL<span><span class="sr-only"> (새 창에서 열림)</span></span></a></p>
<p><a href="/about">REVIEWER_MD_INTERNAL</a></p>
<p></p>
<p><code>inline code REVIEWER_CODE</code></p>
```

마커 잔존 검사:

```
REVIEWER_HTML_COMMENT_MARKER: 없음
REVIEWER_ONERROR: 없음
REVIEWER_ONMOUSEOVER: 없음
REVIEWER_RAW_ANCHOR: 발견   ← 원본 HTML 앵커의 '텍스트'만 남음(태그는 제거, href 없음)
REVIEWER_JS: 발견           ← 링크 '텍스트'(REVIEWER_JS_LINK). href는 제거되어 <a>에 href 없음
REVIEWER_DATA: 발견         ← 위와 동일
REVIEWER_MD_IMAGE_ALT: 없음 ← 마크다운 이미지가 alt까지 통째로 사라짐
REVIEWER_STYLE_DIV: 없음
<img 태그 수: 0
onerror= 수: 0
```

검증 스크립트도 조용히 사라지지 않게 경고를 낸다:

```
🟡 zz-sanitize.md
   · 본문의 마크다운 이미지(`![설명](주소)`)는 화면에 나오지 않습니다 — 사진은 frontmatter `images[]`로 넣으세요(alt 검증·대체 이미지 전환이 거기에만 걸립니다).
```

> 경고(오류 아님)로 둔 이유: 게이트 의미를 바꾸지 않으면서, 이미지가 사라진 원인을 작성자가 바로 알 수 있게 하려는 것.
> 픽스처는 확인 후 제거했다(`ls content/posts/` → `example-case-{a,b,c}.md` 3건).
>
> 부수 확인: `rehype-sanitize` 기본 스키마의 `img` 허용 속성은 `["ariaDescribedBy","ariaLabel","ariaLabelledBy","longDesc","src"]`로 **`alt`가 아예 없다.** 통과시켰다면 대체 텍스트 없는 이미지가 됐을 것이다.

### 4. R2 — `og-draft` 산출물

```
$ npm run --silent og:draft -- http://localhost:3000/post/example-case-c
---
id: example-case-c   # 확정 후 변경 금지. 소문자 영숫자와 하이픈만.
title: ''            # TODO 운영자가 인용형으로 쓴다 (예: "…로 기소된 것으로 보도됨"). 원문 제목 복사 금지.
description: ''      # TODO 운영자가 1~2문장 요약을 쓴다. 원문 문장을 그대로 복제하지 않는다.
publishedAt: 2026-09-21
status:            # 의혹 | 수사중 | 기소 | 유죄판결 | 종결  ← 사람이 판단해 채운다
sourceType: url
attribution: "localhost"
sources:
  - type:         # TODO 언론 | 수사기관 | 법원 | 기타 ← 허용 출처인지 사람이 확인해 고른다
    name: "localhost"
    url: "http://localhost:3000/post/example-case-c"
    date: 2026-09-21
tags: []
sourceUrl: "http://localhost:3000/post/example-case-c"
useSourceImage: false   # 원문 썸네일을 미리보기로 쓸 때만 true. 얼굴이 식별되면 false로 둔다.
og:
  title: "예시 사건 C — 1심에서 유죄 판결이 선고된 것으로 보도됨"
  description: "가상의 예시 게시물입니다. 예시 사건 C가 의혹 제기에서 1심 유죄 판결까지 어떤 단계를 거쳤는지 출처와 함께 정리했습니다."
  image: "http://localhost:3000/opengraph-image?a59e9178c911b23c"
  siteName: "localhost"
---

── 다음 할 일 (사람이 해야 하는 판단) ──
1. title·description을 직접 쓴다. 비워서 내보냈고, 비면 빌드가 막힌다.
   원문 헤드라인을 그대로 옮기지 않는다 — "…로 보도됨"·"…라는 의혹이 제기됨" 같은 인용형으로 쓴다.
   (원문 제목·요약은 og.title·og.description에 그대로 보존되며 상세에 "출처 인용"으로 표시된다.)
2. status(상태 라벨)와 sources(근거 출처)를 확인해 채운다. 둘 다 비면 빌드가 막힌다.
3. useSourceImage는 false로 나간다. 원문 썸네일을 카드에 쓰려면 og.image 주소를 브라우저로 직접 열어
   확인하고, 인물의 얼굴이 식별되지 않을 때만 true로 켠다. 판단이 애매하면 false로 둔다.
4. content/posts/<id>.md 로 저장한 뒤 `npm run validate:content` 를 돌린다.
```

"빈 값은 검증이 막는다"를 말로만 두지 않고 **초안을 그대로 저장해 실제로 막히는지** 확인했다:

```
$ npm run --silent og:draft -- https://example.com/ > content/posts/zz-draft-check.md
$ npm run --silent validate:content
🔴 zz-draft-check.md
   ✗ title: 필수입니다.
   ✗ description: 필수입니다(메타 description·AI 인용에 쓰입니다).
   ✗ status: 다음 5종 중 하나여야 합니다 — 의혹 / 수사중 / 기소 / 유죄판결 / 종결. (받은 값: null)
   ✗ sources[0].type: 언론 / 수사기관 / 법원 / 기타 중 하나여야 합니다. (받은 값: null)
```

`useSourceImage` fail-closed(리뷰어 케이스 10)도 회귀 확인했다:

```
$ (useSourceImage: true, og.image 없음)      → ✗ useSourceImage: true로 두려면 og.image(원문 썸네일 URL)가 있어야 합니다.
$ (useSourceImage: true, og.image: "")       → ✗ useSourceImage: true로 두려면 og.image(원문 썸네일 URL)가 있어야 합니다.
```

### 5. 전체 재실행

```
$ npm run validate:content
검사 파일 3건 · 통과 3건 · 실패 0건 (오류 0개)
고유 id 3개 · 폐기 id 목록 0개
유형별: url 1 · photo 1 · photo_text 1
상태별: 기소 1 · 의혹 1 · 유죄판결 1
검사한 이미지 alt 3개
✅ 검증 통과

$ npm run typecheck        → 종료코드 0 (출력 없음)

$ npm run lint
/…/docs/tools/reviewer-04/keyboard-tab.mjs
  36:7  warning  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions
✖ 1 problem (0 errors, 1 warning)      ← 종료코드 0

$ npm run build
 ✓ Compiled successfully in 3.7s
 ✓ Generating static pages (17/17)     ← 경고 0
```

> ⚠️ lint 경고 1건은 **리뷰어 04의 측정 도구 파일**에서 나온다(내 산출물이 아니고, 리뷰 이후 추가된 파일이다).
> 다른 담당자의 산출물을 고치지 않았고, 경고를 숨기려고 eslint ignore를 넣지도 않았다. 처리는 슈퍼바이저 판단에 맡긴다.

라우트·헤더 회귀:

```
라우트 상태 대조 16/16 일치 (200 12건 / 404 4건 — /?page=2, /post/nope, /tag/nope, /category/anything)
보안 헤더 6/6 적용
본문 외부 링크 rel: <a href="https://example.com/press/example-case-c-verdict" rel="noopener" target="_blank">
```

### 6. 저장소 독립 grep

검사 패턴은 `.git/hooks/pre-commit`의 `PATTERN` 변수를 그대로 썼다
(패턴 문자열 자체가 금지어 목록이라 여기에 옮겨 적지 않는다 — 옮겨 적으면 이 문서가 훅에 걸린다).

```
$ PATTERN=$(sed -n "s/^PATTERN='\(.*\)'$/\1/p" .git/hooks/pre-commit)
$ { git ls-files --others --exclude-standard; git diff --name-only; } | sort -u \
    | tr '\n' '\0' | xargs -0 grep -InE "$PATTERN"
→ 출력 없음 (위반 0건) · 검사 대상 97개 파일 (핸드오프·트리거·history 기록 후 최종 실행)
```

---

## D3 — 숫자 정정 (산출 명령 병기)

| 항목 | 01 핸드오프 | 리뷰어 04 실측 | 02 시점 실측 | 산출 명령 |
|---|---|---|---|---|
| `src/**` 파일 수 | 44 ❌ | 42 | **42** | `find src -type f \| wc -l` |
| `src/**` 줄 수(전 파일) | 2,773 ❌ | 2,665 | **2,700** | `find src -type f -exec cat {} + \| wc -l` |
| `src/**` 줄 수(ts·tsx·css) | — | 2,659 | **2,694** | `find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) -exec cat {} + \| wc -l` |
| 독립 grep 대상 | 89 ❌ | 86 | **97** | `{ git ls-files --others --exclude-standard; git diff --name-only; } \| sort -u \| wc -l` |

- 줄 수 2,665 → 2,700(+35)은 이번 수정에서 추가한 주석·코드 때문이다.
- grep 대상 86 → 97(+11)은 이번 세션 산출물(`docs/qa/programmer-02/` PNG 4장 + 핸드오프·트리거)과
  다른 세션 산출물이 작업트리에 들어왔기 때문이다(검사 대상이 늘어난 것이지 내 코드 파일이 그만큼 는 것이 아니다).
- 01 핸드오프 머리에 정정 주석을 달았다.

---

## 추가 수정 2건 (오더에 없었지만 R2 검증 중 발견)

### 추가 1. 🔴 `og:draft` 사용 명령이 실제로는 동작하지 않았다

01에서 내가 `content/README.md` §1에 적은 명령을 **한 번도 실행해 보지 않고** 문서화했고, 실제로 돌려 보니 깨진다.

```
$ npm run og:draft -- <URL> > content/posts/x.md     ← README에 적혀 있던 명령
$ head -6 content/posts/x.md
(빈 줄)
> ihatekongsandang@0.1.0 og:draft
> node scripts/og-draft.mjs <URL>
(빈 줄)
---
id: …
```

npm의 실행 배너가 stdout으로 나가 파일 맨 앞에 섞이고, 첫 줄이 `---`가 아니게 되어 frontmatter가 통째로 깨진다.
그 파일을 실제로 게시물로 넣어 보면:

```
🔴 zz-banner-check.md
   ✗ id: 필수입니다. 파일명에서 자동 유추하지 않으므로 frontmatter에 반드시 적으세요.
   ✗ title: 필수입니다.
   ✗ description: 필수입니다(메타 description·AI 인용에 쓰입니다).
```

→ `npm run --silent og:draft -- <URL> > 파일` 로 정정했고(`node scripts/og-draft.mjs <URL> > 파일`도 안내),
정정한 명령으로 다시 생성해 **첫 줄이 `---`인 것과 의도한 4개 필드만 막히는 것**을 확인했다.
`scripts/og-draft.mjs` 헤더 주석에도 같은 내용을 적었다.

### 추가 2. `sources[].type` 게이트 + `og.image` 빈 값 처리

- 리뷰어 R2는 "`status`·`sources`처럼 사람 판단을 강제(빈 값은 검증이 막는다)"를 전제로 쓰였는데,
  **실제 `og-draft`는 `sources`를 `type: 언론`까지 채워서 내보내고 있었다** — 즉 빌드가 막지 못했고,
  내 01 README의 "`sources`는 비워서 내보낸다"는 설명도 사실과 달랐다.
  R2의 취지대로 `sources[].type`만 비워 사람이 고르게 했다(`name`·`url`·`date`는 기계가 아는 값이라 유지).
- 그 결과 OG 이미지가 없는 사이트의 초안에서 `og.image: ""`가 오류로 막히는 것이 드러났다.
  빈 문자열은 "추출 실패 = 없음"이므로 `schema.ts`에서 **값이 있을 때만** https 여부를 따지도록 고쳤다.
  나머지 필드가 쓰는 `asTrimmedString` 규칙과 같아졌다. fail-closed 동작은 위 §4에서 회귀 확인했다.

---

## 미해결·이슈

1. **이월(구현 금지 지시대로 손대지 않음)** — R6 `closureReason`·`priorVerdict` 필드, README §3.4·§4·§5 갱신,
   R4(폐기 ID 검사를 `load.ts`와 공유). PRD v0.5 K3 확정 후 **프로그래머 03**.
2. **🔴 소재 확장(2026-09-21)이 코드 문구에 아직 반영되지 않았다.** `CLAUDE.md`가 소재를 "정치·시사 이슈
   큐레이션 전반"으로 넓히고 게시물을 ①형사 사건 ②발언·논평 두 종류로 나눴는데, 코드의 사이트 문구
   (`src/lib/config.ts`의 `SITE.tagline`·`SITE.description`)와 `/about`·`llms.txt`는 여전히 "간첩 행위·간첩 의혹"만
   말한다. 그 문구가 `og:image:alt`·meta description·JSON-LD까지 그대로 나간다. 문구와 ②유형 스키마는
   기획(PRD v0.5) 확정 사항이므로 이번에 임의로 바꾸지 않았다. **프로그래머 03 범위로 등록 필요.**
3. **lint 경고 1건** — `docs/tools/reviewer-04/keyboard-tab.mjs`(리뷰어 산출물). 위 §5 참조.
4. **Node 20.9 실환경 미검증** — 위 §2 참조. 버전 게이트 API를 제거한 것이지 20.9를 띄워 재현한 것은 아니다.
5. **배포 후 확인은 그대로 남아 있다** — 리뷰어 04 §7의 2건(Vercel 플랫폼 헤더, `NEXT_PUBLIC_SITE_URL`
   절대 URL). 특히 §7-2는 D1 수정이 반영됐는지와 절대 URL 여부를 한 번에 본다.
6. **`npm audit` high 1(R5)** — 이번 세션에서 다루지 않았다(리뷰어 판정: 배포 차단 사유 아님).

---

## 다음 세션 가이드

| 누가 | 무엇을 |
|---|---|
| **슈퍼바이저 (Opus 5)** | 위 §확인 명령을 직접 재실행해 검증 → 첫 커밋·푸시 → Vercel 연결 시 `NEXT_PUBLIC_SITE_URL` 환경 변수 설정 → 배포 직후 리뷰어 04 §7의 `curl` 2회 |
| **기획자 05 (Sonnet 5)** | PRD v0.5 — K3 `closureReason` enum, 발언·논평 게시물 스키마·유형 배지, 실명 규칙(§6③) 확정. 위 미해결 2번의 사이트 문구 방향도 함께 |
| **프로그래머 03 (Opus 5)** | PRD v0.5 확정 후 — R6 필드 + README §3.4·§4·§5, R4 공유, 소재 확장에 따른 `SITE` 문구·②유형 렌더 |

## 참고 링크
- 리뷰 원문: `docs/reviews/programmer-01-v0.1-prototype-review.md`
- 이전 핸드오프: `docs/handoffs/programmer-01-v0.1-prototype.md` (머리에 정정 주석)
- 리뷰어 도구: `docs/tools/reviewer-04/`
- 이번 캡처: `docs/qa/programmer-02/` (4장)
