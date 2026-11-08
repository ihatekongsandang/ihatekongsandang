# 01 — 공유 버튼 (가): 링크 복사·X·스레드

> 대상 화면: `src/app/(ko)/post/[id]/page.tsx` → `src/components/post-detail.tsx` (영어는 같은 컴포넌트를 `locale="en"`로 공유)
> 수용 기준: `planning/news-format-v0.2-scope.md` §2.3
> 외부 SDK·외부 스크립트 금지(오더 제약) — 전부 `<a href>` web intent 링크 + 클립보드 API(`navigator.clipboard`)만 쓴다.

## 1. 배치

### 위치 — 헤더 블록 바로 다음, 본문/원문 미리보기 앞

`post-detail.tsx`의 현재 구조:

```
<header>
  …Badge 행 → h1 → (언어 전환 링크) → description → dl(게시/갱신/출처) → postNotice 안내 박스
</header>
<section>원문 미리보기 또는 사진</section>
```

공유 버튼 바를 **`</header>` 바로 뒤, 원문 미리보기/사진 `<section>` 바로 앞**에 독립된 `<section>`으로 넣는다.

**근거**: 이 사이트 독자(P1 검색 유입·P2 관심사 커뮤니티, PRD §2)는 제목+요약만 보고도 공유 여부를 결정하는 경우가 많다(카드 자체가 "제목+이미지"뿐이라 상세의 제목·요약이 사실상 카드의 연장). 공유 동작을 "원문 확인"·"사진 갤러리"보다 먼저 두면, 이미지가 없거나 긴 본문을 읽지 않고도 바로 공유할 수 있다. 본문 아래(교정 안내 근처)에 두는 대안도 검토했으나, 그 경우 이미지·갤러리·본문을 전부 스크롤해야 공유 버튼이 나와 모바일 이탈 지점에서 기회를 놓친다(PRD "엄지 도달 영역" 원칙과도 어긋남). 하나의 자리만 두어 범위를 늘리지 않는다(바닥에 중복 배치하지 않음).

### 마크업 스켈레톤

```tsx
<section aria-labelledby="share-heading" className="space-y-3">
  <h2 id="share-heading" className="sr-only">{dict.shareHeading}</h2>
  <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-start">
    {/* 링크 복사 버튼 */}
    {/* X 버튼 */}
    {/* 스레드 버튼 */}
  </div>
  <p role="status" aria-live="polite" className="sr-only">{statusMessage}</p>
</section>
```

- `h2`는 `sr-only`로 둔다(시각적으로는 버튼 3개가 "공유" 영역임이 자명하고, 상세 페이지에 이미 `source-preview-heading`·`photos-heading` 같은 유사 패턴이 있다 — `sr-only` 처리된 섹션 제목도 기존 관례).
- **모바일(<640px, `sm` 미만)**: `grid grid-cols-3 gap-2` — 3개 버튼이 폭을 3등분해 꽉 채운다(엄지로 어디를 눌러도 됨, 터치 영역 최대화).
- **데스크톱(≥640px)**: `sm:flex sm:flex-wrap` — 버튼이 내용 너비만큼만 차지하고 왼쪽부터 나란히 선다(좌측 정렬, 헤더의 다른 좌측 정렬 요소와 리듬 일치).

## 2. 버튼 3종 — 라벨·아이콘·intent URL

### 2.0 아이콘 선택 근거 (🔴 중요 — lucide에 X/스레드 브랜드 아이콘 없음)

`node_modules/lucide-react`(v0.545.0) 확인 결과:
- `twitter.js` 아이콘은 **옛 새 로고**다(리브랜딩 전). X 로고가 아니라서 쓰지 않는다.
- `x.js` 아이콘은 두 대각선으로 된 **닫기(×) 모양**이다. "닫기" 버튼으로 오인될 수 있어 쓰지 않는다.
- **스레드 브랜드 아이콘 자체가 lucide에 없다.**

→ **X·스레드 버튼은 아이콘 없이 텍스트 레이블만 쓴다.** "담백하게" 톤과도 맞고, 틀린/옛 브랜드 아이콘을 쓰는 것보다 안전하다. **링크 복사**는 브랜드가 아닌 기능 아이콘이라 `Link2`(lucide, `link-2`)를 쓴다 — 복사 성공 시 `Check`, 실패 시 `CopyX`로 바꾼다(전부 lucide 기존 아이콘, 추가 설치 불필요).

### 2.1 링크 복사

```tsx
<button
  type="button"
  onClick={handleCopy}
  aria-label={dict.shareCopyLink}
  className={cn(buttonVariants({ variant: 'outline' }), 'h-11 min-w-0 flex-1 sm:flex-none sm:px-4')}
>
  {copyState === 'success' ? (
    <Check aria-hidden="true" className="size-4" />
  ) : copyState === 'error' ? (
    <CopyX aria-hidden="true" className="size-4" />
  ) : (
    <Link2 aria-hidden="true" className="size-4" />
  )}
  <span>
    {copyState === 'success' ? dict.shareCopied : copyState === 'error' ? dict.shareCopyFailed : dict.shareCopyLink}
  </span>
</button>
```

- 동작: `navigator.clipboard.writeText(absoluteUrl(postPath(locale, post.id)))`.
  - **성공**: 아이콘 `Check`, 라벨 `dict.shareCopied`("복사됨"/"Copied")로 2초간 전환 후 원상복구. 동시에 `role="status" aria-live="polite"` 영역에 `dict.shareCopiedAnnounce`를 2초간 채운다.
  - **실패**(클립보드 API 미지원·권한 거부·비보안 컨텍스트): 아이콘 `CopyX`, 라벨 `dict.shareCopyFailed`("복사 실패"/"Copy failed")로 2초간 전환, `aria-live` 영역에 `dict.shareCopyFailedAnnounce`(주소를 직접 선택해 복사해 달라는 안내)를 채운다. **`alert()`를 쓰지 않는다**(오더 제약 — alert 피드백 금지).
  - 타이머는 각 클릭마다 초기화(연타 시 마지막 클릭 기준 2초).
- `h-11`(44px) — WCAG 2.2 AA 2.5.8 권장 터치 영역. 모바일은 `flex-1`로 그리드 칸을 채우고, 데스크톱은 `sm:flex-none sm:px-4`로 내용 너비만 차지.

### 2.2 X

```tsx
<a
  href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(absoluteUrl(postPath(locale, post.id)))}`}
  target="_blank"
  rel="noopener"
  aria-label={dict.shareX}
  onClick={() => trackEvent(GA_EVENTS.share, { method: 'x', content_type: 'post', item_id: post.id })}
  className={cn(buttonVariants({ variant: 'outline' }), 'h-11 min-w-0 flex-1 justify-center sm:flex-none sm:px-4')}
>
  <span>{dict.shareX}</span>
</a>
```

- 🔴 **엔드포인트 정정**: 오더 원문은 `https://x.com/intent/post?...`라고 썼으나, **공식 문서(`docs.x.com/x-for-websites/web-intents/overview`, `docs.x.com/x-for-websites/post-button/guides/web-intent`, 2026-11-08 WebFetch 직접 확인)의 실제 경로는 `https://x.com/intent/tweet`**이다. `intent/post`는 존재하지 않는다.
- 지원 파라미터(공식 문서 확인): `text`(URL 인코딩)·`url`(URL 인코딩, t.co로 단축)·`hashtags`·`via`·`related`·`in_reply_to`. 이번 구현은 `text`(게시물 제목)·`url`(게시물 절대 URL)만 쓴다. `via`·`related`는 **생략**한다 — 이 사이트의 전용 X 계정이 아직 없다(🔴 계정 분리 원칙, 생기면 별도 오더로 추가 검토).
- 글자 수 제약(공식 문서): `text`+`hashtags`+`via`+`url`(단축 후) 합이 280자를 넘으면 사용자가 게시 전 직접 줄여야 한다. 해시태그를 안 써서 여유가 있고, 게시물 제목은 기존에도 카드·meta title로 쓰이는 짧은 문장이라 별도 길이 제한 로직은 두지 않는다.
- `rel="noopener"`만 쓴다(`noreferrer` 불필요 — PRD §5.1의 탭내빙 방지 근거와 동일 논리. 이 링크는 "큐레이션 원문"이 아니라 공유 대상(X)으로 가는 것이라 §5.1의 원문 링크 rel 정책 표 대상이 아니지만, 보안 목적은 같다).

### 2.3 스레드(Threads)

```tsx
<a
  href={`https://www.threads.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(absoluteUrl(postPath(locale, post.id)))}`}
  target="_blank"
  rel="noopener"
  aria-label={dict.shareThreads}
  onClick={() => trackEvent(GA_EVENTS.share, { method: 'threads', content_type: 'post', item_id: post.id })}
  className={cn(buttonVariants({ variant: 'outline' }), 'h-11 min-w-0 flex-1 justify-center sm:flex-none sm:px-4')}
>
  <span>{dict.shareThreads}</span>
</a>
```

- 🔴 **도메인 정정**: 오더 원문은 `https://www.threads.net/intent/post?...`라고 썼으나, **공식 문서(Meta for Developers, `developers.facebook.com/documentation/threads/threads-web-intents`, 2026-11-08 WebFetch 직접 확인)의 현재 엔드포인트는 `https://www.threads.com/intent/post`**다(`.net`이 아니라 `.com`). `threads.net`은 과거 호스트로, 리다이렉트 여부는 공식 문서로 확인되지 않아 신뢰하지 않는다.
- 지원 파라미터(공식 문서 확인): `text`·`url`·`tag`(주제 태그, 최대 50자, 줄바꿈·탭·`.`·`&` 불가)·`reply_control`·`reply_post_shortcode`·`quote_post_shortcode`. 이번 구현은 `text`(제목)·`url`(절대 URL)만 쓴다. `tag`는 태그 체계(v0.1 보류, PRD §4.2)와 섞일 수 있어 쓰지 않는다.

## 3. 상태 — 디자인 토큰

| 상태 | 처리 |
|---|---|
| 기본 | `buttonVariants({ variant: 'outline' })` 그대로(테두리 `--border`, 배경 `--background`) |
| hover | `buttonVariants`가 이미 처리(`hover:bg-surface-strong`) — 추가 지정 불필요 |
| focus-visible | 전역 규칙(`globals.css` `:focus-visible`)이 `<a>`·`<button>`에 자동 적용된다(2px solid `--ring`, offset 2px) — 추가 지정 불필요 |
| 복사됨(링크 복사만) | 아이콘 `Check` + 라벨 `dict.shareCopied`, 2초 후 기본으로 복귀 |
| 복사 실패(링크 복사만) | 아이콘 `CopyX` + 라벨 `dict.shareCopyFailed`, 2초 후 기본으로 복귀 |

새 색·새 variant를 만들지 않는다. `buttonVariants`에 이미 있는 `outline`만 쓴다 — 전역 버튼 일관성 유지(리뷰어 중점 "브랜드 일관성"에 부합).

## 4. 번역 사전 추가 (`src/lib/i18n.ts` `Dictionary`)

```ts
shareHeading: string
shareCopyLink: string
shareCopied: string
shareCopyFailed: string
shareCopiedAnnounce: string
shareCopyFailedAnnounce: string
shareX: string
shareThreads: string
```

| 키 | ko | en |
|---|---|---|
| `shareHeading` | 공유 | Share |
| `shareCopyLink` | 링크 복사 | Copy link |
| `shareCopied` | 복사됨 | Copied |
| `shareCopyFailed` | 복사 실패 | Copy failed |
| `shareCopiedAnnounce` | 링크가 복사되었습니다. | Link copied. |
| `shareCopyFailedAnnounce` | 복사에 실패했습니다. 주소창에서 직접 복사해 주세요. | Copy failed. Please copy the address manually. |
| `shareX` | X에 공유 | Share on X |
| `shareThreads` | 스레드에 공유 | Share on Threads |

## 5. 접근성(WCAG 2.2 AA) 점검

| 항목 | 결과 |
|---|---|
| 레이블 | 3개 버튼 모두 보이는 텍스트 레이블 = 접근성 이름(아이콘 단독 버튼 없음) |
| 대비(텍스트) | `--foreground` on `--background` = **17.7:1**(상대휘도 계산, sRGB) — AA(4.5:1) 통과 |
| 대비(테두리, 비텍스트) | `--border`(#e4e4e7) on `--background`(#ffffff) = **1.27:1** — WCAG 1.4.11(3:1) 미달. **기존 `buttonVariants` outline 전역 스타일**이 이미 이 값을 쓰며(예: "원문 기사로 이동" 버튼), 이번에 새로 만든 결함이 아니다. 전역 컴포넌트 수정은 이 오더 범위 밖(`src/` 수정 금지) — 포커스 링·레이블·hover 배경 변화로 식별성을 보완한다. 전역 버튼 테두리 대비 개선은 별도 디자인 오더로 제안 |
| 포커스 표시 | `:focus-visible` 2px solid `--ring`(#1d4ed8), offset 2px. `--ring` vs `--background` 대비 **6.70:1** — 통과 |
| 터치 영역 | `h-11`(44px) — 24px 이상(필수)·44px(권장) 모두 충족 |
| `aria-live` | 복사 성공/실패 안내를 `role="status" aria-live="polite"`로 전달. `alert()`·`confirm()` 미사용(오더 제약 준수) |
| 키보드 동작 | `<button>`·`<a>` 네이티브 요소만 써서 Tab·Enter/Space로 기본 동작 보장. 커스텀 `onKeyDown` 불필요 |

## 6. GA4 이벤트 제안

PRD §7(v0.5 공유 수단)·scope §2.5가 요구하는 "공유 버튼 클릭 이벤트(수단별 구분)"에 맞춰, **GA4 공식 추천 이벤트 `share`**(Google Analytics 문서, 2026-11-08 WebFetch 직접 확인: 파라미터 `method`·`content_type`·`item_id`)를 그대로 쓴다.

```ts
// src/lib/analytics.ts GA_EVENTS에 추가
share: 'share',
```

```ts
trackEvent(GA_EVENTS.share, { method: 'copy_link' | 'x' | 'threads', content_type: 'post', item_id: post.id })
```

기존 `viewCard`/`selectCard`가 `post_id`를 쓰던 것과 다르게 `item_id`를 쓰는 이유: `share` 이벤트는 GA4가 자체 정의한 추천 이벤트라 파라미터명이 고정돼 있다(`post_id`로 바꾸면 GA4 표준 리포트가 인식하지 못한다). 링크 복사는 `method: 'copy_link'`로 구분한다(X 인텐트는 `via` 없이도 플랫폼이 명확해 `method: 'x'` 그대로 충분).

이 이벤트 계측은 **코드 구현**(프로그래머 영역)이라 이 오더가 직접 넣지는 않지만, 구현 시 그대로 쓸 수 있게 이름·파라미터를 확정해 둔다.

## 7. 목업

`mockup-share-buttons.html` — 모바일(375px)·데스크톱(960px) 프레임에 상세 페이지 헤더 요약 + 공유 버튼 바를 배치하고, 버튼 3종의 기본/hover/focus/복사됨/복사실패 상태를 스와치로 나열했다. 실제 토큰 값(`globals.css`)을 그대로 복사해 썼다.
