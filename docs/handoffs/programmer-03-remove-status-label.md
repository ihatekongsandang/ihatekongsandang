# 프로그래머 세션 — 03-remove-status-label 핸드오프
**작성일**: 2026-09-21 18:10 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
1. 사건 상태 라벨(`status`·`courtLevel`·`statusHistory`)과 상태 배지를 **코드·스키마·문서·샘플에서 전부 제거**하고 단일 게시물 스키마로 만들었다. 게시물 종류 구분(`kind`·`statementType`)도 두지 않는다 — 옛 필드가 남아 있으면 빌드가 막힌다.
2. 소재 확장 문구(정치·시사 전반) 반영, 검색엔진 검증 메타태그 env 추가, 폐기 ID 검사 공유(R4)까지 함께 처리했다. 초안 2건을 새 스키마로 변환해 **빌드·렌더를 실측**했다(캡처 8장).
3. 🔴 **커밋하지 않았다.** 초안 2건도 검증 후 제거했다 — 게시는 슈퍼바이저 몫이며, 변환된 frontmatter 전문은 아래 §초안 2건에 그대로 실었다.

---

## 제거 표

| 제거 대상 | 어디에 있었나 | 어떻게 됐나 |
|---|---|---|
| `status` (의혹/수사중/기소/유죄판결/종결) | `schema.ts` `STATUS_LABELS`·`STATUS_DEFINITIONS`, 검증, 샘플 3건 | 필드 삭제. 남아 있으면 **오류** |
| `courtLevel` (1심/2심/확정) | `schema.ts`, 검증 | 필드 삭제. 남아 있으면 **오류** |
| `statusHistory[]` | `schema.ts`, `status-history.tsx`, 상세 페이지 | 필드·컴포넌트 삭제. 남아 있으면 **오류** |
| `kind`·`statementType` | (초안에만 있던 가칭 필드) | 스키마에 두지 않음. 남아 있으면 **오류** |
| 상태 배지 컴포넌트 | `src/components/status-badge.tsx` | **파일 삭제** |
| 상태 이력 컴포넌트 | `src/components/status-history.tsx` | **파일 삭제** |
| 배지 색 variant 5종 | `ui/badge.tsx` `tone`(doubt/investigating/indicted/convicted/closed) | variant 전부 삭제, 중립 1종만 남김 |
| 상태 색 토큰 15개 | `globals.css` `--status-*-bg/fg/border` | 삭제 |
| 카드의 상태 배지 | `post-card.tsx`, `view.ts` `PostCardView.status`·`courtLevel` | 삭제 |
| 상세의 상태 배지·이력·라벨 정의 상자 | `post/[id]/page.tsx` | 삭제 → 출처 안내 문장으로 교체 |
| 상태별 통계 | `validate-content.ts` 요약 출력 | "배경 보도 출처 / 발언자 표기" 집계로 교체 |
| `status` 프롬프트 | `scripts/og-draft.mjs` | 삭제 |
| 상태 라벨 절 | `content/README.md` §3.3·§4·§8 | §3.3 → `speaker`, §4 → "사실 확인 단계는 어떻게 전달하는가"로 교체 |
| `/about` 상태 라벨 정의 절 | `about/page.tsx` | 삭제 → 출처 정책·표기 원칙으로 재작성 |
| `llms.txt` 상태 라벨 절 | `llms.txt/route.ts` | 삭제 → 인용 주의사항으로 교체 |

### 새로 생긴 것

| 항목 | 내용 |
|---|---|
| `speaker { name, affiliation? }` | 선택 필드. 발언·논평을 정리한 글에서 누구의 말인지. 상세 상단 배지 + `llms.txt`에 표시 |
| `sources[]` 유형별 규칙 | `photo`·`photo_text`는 **최소 1건 필수**(원문 링크가 없어 유일한 근거), `url`은 **0건 허용**(`sourceUrl` 자체가 근거) |
| `src/lib/content/retired-ids.ts` | 폐기 ID 검사를 **검증 스크립트와 `load.ts`가 공유**(리뷰어 04 R4) |
| `NEXT_PUBLIC_GSC_VERIFICATION`·`NEXT_PUBLIC_NAVER_VERIFICATION` | `<head>` 검증 메타태그. 값 없으면 미출력 |

---

## 검증 (전부 직접 실행)

### 1. 전체 재실행

```
$ npm run validate:content
검사 파일 3건 · 통과 3건 · 실패 0건 (오류 0개)
고유 id 3개 · 폐기 id 목록 0개
유형별: url 1 · photo 1 · photo_text 1
배경 보도 출처: 6건 · 발언자 표기: 0건
검사한 이미지 alt 3개
✅ 검증 통과

$ npm run typecheck      → 종료코드 0 (출력 없음)
$ npm run lint           → 0 errors, 1 warning
$ npm run build
 ✓ Compiled successfully in 3.7s
 ✓ Generating static pages (17/17)      ← 경고 0
```

> lint 경고 1건은 `docs/tools/reviewer-04/keyboard-tab.mjs`(리뷰어 산출물). 02 때와 같고 내 코드가 아니라 손대지 않았다.

### 2. 게이트 오류 케이스 — 7/7 차단

```
──── 케이스 1 — 폐지된 status 필드 잔존 ────
종료코드=1 · next build 진입=0회
   ✗ status: 사건 상태 라벨은 폐지되었습니다. 이 줄을 지우고, 사실 확인 단계는 description 문장과 sources[]로 전달하세요.

──── 케이스 2 — 폐지된 kind·statementType 잔존 ────
종료코드=1 · next build 진입=0회
   ✗ kind: 게시물 종류 구분(형사 사건/발언·논평)은 두지 않습니다 — 단일 스키마입니다. 이 줄을 지우세요.
   ✗ statementType: 발언/논평 구분 필드는 두지 않습니다. 이 줄을 지우세요.

──── 케이스 3 — photo 유형인데 배경 보도 0건 ────
종료코드=1 · next build 진입=0회
   ✗ sources: sourceType이 `photo`이면 최소 1건 필요합니다 — 원문 링크가 없으므로 출처가 유일한 근거입니다.

──── 케이스 4 — 필수 필드(description) 누락 ────
종료코드=1 · next build 진입=0회
   ✗ description: 필수입니다(메타 description·AI 인용에 쓰입니다).

──── 케이스 5 — id 중복 ────
종료코드=1 · next build 진입=0회
   ✗ id `example-case-b`가 example-case-b.md와 중복됩니다. 안정 ID는 게시물마다 하나여야 합니다.

──── 케이스 6 — 이미지 alt 누락 ────
종료코드=1 · next build 진입=0회
   ✗ images[0].alt: 필수입니다(WCAG 2.2 AA 1.1.1). 이미지를 설명하는 문장을 쓰세요.

──── 케이스 7 — 폐기 ID 재사용 (검증 스크립트를 건너뛴 npx next build) ────
종료코드=1
  - id `example-case-a`는 content/retired-ids.txt에 등록된 폐기 ID입니다. 재사용하면 과거 반응·댓글 데이터가 잘못 연결됩니다.
```

케이스 7이 R4의 확인이다 — 예전에는 `npx next build`를 직접 치면 폐기 ID가 통과했는데, 이제 2차 게이트(`load.ts`)도 같은 함수를 쓴다.

**통과해야 하는 케이스**도 확인했다 — `url` 유형에서 `sources` 0건:

```
zz-ok 의 sources 블록 수: 0
검사 파일 6건 · 통과 6건 · 실패 0건 (오류 0개)
✅ 검증 통과
```

### 3. 검색엔진 검증 메타태그

```
──── 값이 있을 때 ────
<meta name="google-site-verification" content="test-gsc-token-value"
<meta name="naver-site-verification" content="test-naver-token-value"

──── 값이 없을 때 ────
verification 메타 태그 수: 0

──── public/ 파일 보존 확인 ────
public/google327acae7b08ebffd.html
public/naver67b2b45ea951e8e891d41348c0878938.html
/google327acae7b08ebffd.html                   200
/naver67b2b45ea951e8e891d41348c0878938.html    200
```

🔴 `public/google*.html`·`naver*.html`은 삭제하지 않았고 200으로 응답한다. 메타태그 방식은 **병행 수단**이다.

### 4. 라우트 회귀 — 16/16

```
✅ /                                            200    ✅ /sitemap.xml        200
✅ /about                                       200    ✅ /robots.txt         200
✅ /post/example-case-{a,b,c}                   200    ✅ /llms.txt           200
✅ /tag/%EC%98%88%EC%8B%9C%EC%82%AC%EA%B1%B4    200    ✅ /opengraph-image    200
✅ /google327acae7b08ebffd.html                 200    ✅ /icon.svg           200
✅ /naver67b2b45ea951e8e891d41348c0878938.html  200
✅ /?page=2  404   ✅ /post/nope  404   ✅ /category/anything  404
통과 16 · 실패 0
```

회귀 확인(02에서 고친 것이 살아 있는지):

```
og:image: 1개 · twitter:image: 2개   ← D1 유지
보안 헤더: 6개                        ← 유지
```

상태 라벨 문자열 잔존 검사 — 렌더된 HTML에서 `사실 확인 단계: ` / `상태 라벨` / `유죄판결 ·`:

```
  /                      0건
  /about                 0건
  /post/example-case-c   0건
  /llms.txt              0건
```

### 5. 저장소 독립 grep

패턴은 `.git/hooks/pre-commit`의 `PATTERN` 변수를 그대로 썼다(패턴 문자열 자체가 금지어라 옮겨 적지 않는다).

```
$ PATTERN=$(sed -n "s/^PATTERN='\(.*\)'$/\1/p" .git/hooks/pre-commit)
$ { git ls-files --others --exclude-standard; git diff --name-only; } | sort -u \
    | tr '\n' '\0' | xargs -0 grep -InE "$PATTERN"
→ 출력 없음 (위반 0건) · 검사 대상 41개 파일
```

### 6. 산출 숫자

| 항목 | 값 | 산출 명령 |
|---|---|---|
| `src/**` 파일 수 | 41 (42 → `status-badge`·`status-history` 삭제, `retired-ids.ts` 추가) | `find src -type f \| wc -l` |
| `src/**` 줄 수 | 2,649 | `find src -type f -exec cat {} + \| wc -l` |
| 커밋 대상 파일 | 41 (수정 29 · 삭제 3 · 신규 12 — 다른 세션 산출물 포함) | `git status --porcelain \| wc -l` |
| QA 캡처 | 8장 (`docs/qa/programmer-03/`) | — |

---

## 초안 2건 — 변환한 frontmatter 전문

🔴 **슈퍼바이저는 아래를 그대로 `content/posts/<id>.md`로 저장하면 된다.** 검증·빌드·렌더를 이미 통과한 내용이다
(확인 후 제거했다 — 게시 시점은 슈퍼바이저가 정한다).
초안 원문의 `kind`·`statementType`은 **스키마에 없으므로 제거**했고, 초안의 제목·요약 문장은 한 글자도 바꾸지 않았다.
초안에 없던 `attribution`(필수)만 원문 플랫폼명으로 채웠다.

### ① `content/posts/2026-09-20-kimeunhye-jeonse-reel.md`

```yaml
---
id: 2026-09-20-kimeunhye-jeonse-reel
title: 김은혜 의원 "집값은 못 잡고 국민만 잡아요" — 전세 시장 비판 릴스
description: 국민의힘 김은혜 의원이 9월 20일 인스타그램 릴스에서 정부 부동산 정책이 전세 시장을 무너뜨렸다고 비판함. 서울 전세 매물 급감을 근거로 "부동산 정치"라고 지적해 온 연장선(아시아경제·뉴스핌 보도).
publishedAt: 2026-09-21
sourceType: url
attribution: Instagram
speaker:
  name: 김은혜
  affiliation: 국민의힘 국회의원(분당을)
sourceUrl: https://www.instagram.com/reel/DdiCDc6hRYT/
useSourceImage: false
og:
  siteName: Instagram
sources:
  - type: 언론
    name: 아시아경제
    url: https://view.asiae.co.kr/article/2026090911281946643
    date: 2026-09-09
  - type: 언론
    name: 뉴스핌
    url: https://www.newspim.com/news/view/20260724001133
    date: 2026-07-24
tags:
  - 부동산정책
  - 전세
  - 김은혜
---
```

### ② `content/posts/2026-09-20-hanmibro-academy-merger-cards.md`

```yaml
---
id: 2026-09-20-hanmibro-academy-merger-cards
title: 사관학교 통합 논란 — 역대 참모총장 46명 반대 입장문·여론 58% 반대·9·19 총궐기까지 카드 정리 (스레드 @hanmibro)
description: 스레드 이용자 @hanmibro가 육·해·공군 사관학교 통합 논란을 카드 9장으로 정리한 게시물. 역대 참모총장 46명의 반대 입장문(8월 6일, 연합뉴스), 한국갤럽 통합 반대 58%(8월 28일), 9월 19일 총궐기대회(뉴스핌)는 보도로 확인됨. 원문은 의견 포함.
publishedAt: 2026-09-21
sourceType: url
attribution: Threads
speaker:
  name: "@hanmibro"
  affiliation: 스레드 이용자
sourceUrl: https://www.threads.com/share/BAXQCT4yuH/
useSourceImage: false
og:
  siteName: Threads
sources:
  - type: 언론
    name: 연합뉴스(다음 전재)
    url: https://v.daum.net/v/5wveKmsAun
    date: 2026-08-06
  - type: 언론
    name: 한국경제TV
    url: https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=A202608280464
    date: 2026-08-28
  - type: 언론
    name: 뉴스핌
    url: https://www.newspim.com/news/view/20260919000121
    date: 2026-09-19
tags:
  - 사관학교통합
  - 국방
  - 여론조사
---
```

### 초안 2건 투입 시 실측

```
$ npm run validate:content
검사 파일 5건 · 통과 5건 · 실패 0건 (오류 0개)
유형별: url 3 · photo 1 · photo_text 1
배경 보도 출처: 11건 · 발언자 표기: 2건
✅ 검증 통과

$ npm run build
 ✓ Generating static pages (25/25)
   /post/2026-09-20-hanmibro-academy-merger-cards
   /post/2026-09-20-kimeunhye-jeonse-reel

라우트: /post/2026-09-20-kimeunhye-jeonse-reel           200
        /post/2026-09-20-hanmibro-academy-merger-cards  200
```

캡처 8장: `docs/qa/programmer-03/` — `feed`·`draft-reel`·`draft-threads`·`about` × 390/1280.
화면에서 직접 확인한 것: 발언자 배지(`김은혜 · 국민의힘 국회의원(분당을)`, `@hanmibro · 스레드 이용자`),
"배경 보도" 목록 2건·3건, 상태 배지 없음, 카드는 제목+이미지(플레이스홀더), 새 푸터 문구.

---

## 자체 결정 (근거)

| 결정 | 근거 |
|---|---|
| **폐지 필드를 경고가 아니라 오류로** (`status`·`courtLevel`·`statusHistory`·`kind`·`statementType`) | 오더의 "옛 파일 잔존 방지" 지시. 경고면 조용히 무시되어 옛 파일이 그대로 산다. 메시지에 **무엇으로 대체하는지**를 적어 슈퍼바이저가 바로 고칠 수 있게 했다 |
| **`kind`·`statementType`도 오류 목록에 포함** | 초안 2건이 그 필드를 쓰고 있다. 슈퍼바이저가 초안을 그대로 복사하면 조용히 무시되는 대신 "이 줄을 지우세요"가 뜬다 |
| **`sources`를 `url` 유형에서 0건 허용** | 오더 지시. SNS 게시물은 배경 보도가 늘 있지 않고, 원문 링크 자체가 근거다. 반대로 사진 게시물은 원문 링크가 없어 1건을 유지했다 |
| **`speaker.publicFigure`는 구현 안 함** | 오더가 `speaker{name, affiliation}`로 범위를 정했고, `publicFigure`는 §6③ 실명 규칙(PRD v0.6에서 재정리 예정)에 매인 값이다. 초안에서 빼고 변환했다. 모르는 하위 필드는 경고로 알린다 |
| **카드에 날짜·유형 표시는 유지** | 오더 문구는 "카드 = 제목 + 이미지(플레이스홀더)만"이지만, 이 문장의 맥락은 **상태 배지 제거**다. 날짜·유형 푸터는 01에서 만들어 리뷰어 04가 검토한 요소이고 이번 오더에 제거 지시가 없다 — 지시받지 않은 제거는 하지 않았다. **리뷰어가 제거를 원하면 `post-card.tsx`의 `CardFooter` 한 블록만 지우면 된다** |
| **상세의 "원문 미리보기" 상자를 조건부로** | 인용할 것(썸네일·원문 제목·원문 요약)이 하나도 없으면 상자를 그리지 않는다. SNS는 OG 메타를 비공개로 두는 경우가 많아, 초안 2건 모두 상세 화면의 큰 면적이 **빈 플레이스홀더**로 채워지는 것을 캡처로 확인하고 고쳤다. 원문 이동 버튼은 항상 남는다 |
| **`site-footer.tsx`의 하드코딩 색 → 토큰** | 리뷰어 04 R8(하 권고). 어차피 같은 줄의 문구를 바꾸고 있었다. `#3f3f46` → `--muted-foreground`(#52525b), 대비 7.41:1로 이미 실측된 값 |
| **샘플 3건의 id는 그대로** | `example-case-*`의 "case"가 의미를 잃었지만 안정 ID 원칙상 바꾸지 않는다. 실제 게시 시작 때 정리한다 |

---

## 미해결·이슈

1. **PRD가 아직 v0.5(상태 라벨 기준)다.** `planning/prd.md` §3.1·§3.4·§6①③⑤⑥이 폐지된 라벨을 전제로 쓰여 있다.
   기획자 06(PRD v0.6)이 정리할 범위이고, 이번 구현은 CLAUDE.md 개정본 + 오더를 따랐다.
   `content/README.md` §5는 "실명 규칙은 PRD §6③ 최신본을 본다"로 연결해 두었다.
2. **`speaker.publicFigure`** — 위 자체 결정 참조. PRD v0.6에서 실명 규칙이 확정되면 필요 여부를 다시 판단해야 한다.
3. **초안 2건의 게시 가능 여부는 판정하지 않았다.** 초안 2번(`@hanmibro`)은 슈퍼바이저가 "비공인 개인의 사적 SNS
   발언" 정책 확인이 필요하다고 적어 두었다(리뷰어 판정 대상). 나는 **스키마 변환과 렌더 검증만** 했다.
4. **lint 경고 1건** — `docs/tools/reviewer-04/keyboard-tab.mjs`(리뷰어 산출물).
5. **배포 후 확인** — 리뷰어 04 §7의 2건(Vercel 플랫폼 헤더, `NEXT_PUBLIC_SITE_URL` 절대 URL)은 그대로 남아 있다.

---

## 다음 세션 가이드

| 누가 | 무엇을 |
|---|---|
| **리뷰어 07 (Fable 5.1)** | 제거 표 15항 + 게이트 7/7 재현. 중점: ① 카드 날짜·유형 유지 판단(위 자체 결정) ② `url` 유형 `sources` 0건 허용이 편집 정책상 안전한지 ③ 폐지 필드를 오류로 막는 범위 ④ `/about`·`llms.txt` 새 문구가 소재 확장·단정 금지에 맞는지 |
| **슈퍼바이저 (Opus 5)** | 리뷰어 판정 후 커밋·푸시 → 위 §초안 2건 frontmatter를 `content/posts/`로 저장해 첫 게시 → Vercel 환경 변수에 `NEXT_PUBLIC_GSC_VERIFICATION`·`NEXT_PUBLIC_NAVER_VERIFICATION`을 넣을지 선택(현재 `public/*.html` 방식으로 이미 확인 완료) |
| **기획자 06 (Sonnet 5)** | PRD v0.6 — §3·§6에서 상태 라벨 의존 부분 삭제, 실명 규칙(§6③)을 라벨 없이 재정리 |

## 참고 링크
- 오더: `instructions/programmer/processed/03-statement-kind.md`
- 기준: `CLAUDE.md`(개정본) · `planning/prd.md` v0.5(라벨 무관 부분만)
- 이전 핸드오프: `docs/handoffs/programmer-02-review-fixes.md`
- 캡처: `docs/qa/programmer-03/` (8장)
