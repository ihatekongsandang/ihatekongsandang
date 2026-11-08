# 리뷰: 디자이너 02 — 뉴스형 v0.2 시안(공유 버튼·약관 페이지·소개 문구·푸터·카드 갱신 표시)

**리뷰어**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/25-designer-02-news-format-v0.2-review.md` | **작성**: 2026-11-08 23:28

**대상**: `design/news-format-v0.2/` 8파일(README, 01~05 사양, 목업 HTML 2), `docs/handoffs/designer-02-news-format-v0.2-share-terms.md`, `docs/triggers/designer-02-news-format-v0.2-share-terms-COMPLETE.md`
**선행 검토**: 디자이너 오더 02, `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/prd.md` v0.7(§0.5·§11), 리뷰 24, `docs/user-tasks.md` §5(4c), history 23:06(4c·5a). 코드: `post-card.tsx`, `post-detail.tsx`, `site-footer.tsx`, `ui/badge.tsx`, `ui/button.tsx`, `ui/card.tsx`, about ko/en, `lib/config.ts`, `lib/i18n.ts`, `lib/analytics.ts`, `lib/content/view.ts`, `app/globals.css`, `next.config.ts`, `node_modules/lucide-react`(0.545.0)
**외부 확인(WebFetch)**: X 공식 문서 2건, Threads(Meta) 공식 문서 1건, W3C WCAG 2.2 Understanding 1.4.11, GA4 추천 이벤트 `share`. 라이브 `/about` 1회(canonical 확인)
**측정 도구** (`docs/tools/reviewer-25/`)
- `contrast.py` + `contrast-output.txt` — `globals.css` 토큰에서 대비 10쌍 재계산
- `x-title-length.py` + `x-title-length-output.txt` — 게시물 제목 412개(ko 206·en 206)를 X intent에 넣었을 때의 가중 글자 수 전수 측정

---

## 1. 판정

### 🟠 조건부 승인 — 01·03·04는 착수 가능, 05는 2곳 고친 뒤, 02는 공개 방식 결정 뒤

intent URL 정정 두 건은 **공식 문서와 정확히 일치**한다(§3). 토큰·클래스·아이콘·헬퍼가 모두 실재해 시안 그대로 구현할 수 있다(§7). UI 문구에 D6 자칭 표현은 0건이다.

착수 전에 걸리는 것은 두 가지다.
- 카드 갱신 표시가 scope 수용 기준("텍스트, 배지·아이콘 아님")과 반대로 `Badge`를 쓴다(P2-1). 스크린리더 문구를 `span`의 `aria-label`로 줘서 읽히지 않을 수 있다(P2-2).
- 약관 페이지 공개 보류 제안이 사용자 결정 4c 문언("`/about`·`/terms`에 '연락 창구 준비 중' 표시")과 맞지 않는다. 이것은 디자이너 결함이 아니라 PRD §0.5가 4c 뒤에 갱신되지 않은 데서 생긴 충돌이다. 슈퍼바이저가 정한다(§8).

| 구분 | 건수 |
|---|---|
| 🔴 P1 | 0 |
| 🟠 P2 | 2 |
| 🟡 P3 | 11 |
| scope 수용 기준 23개 | ✅ 17 · 🟡 부분 4 · ❌ 1 · 해당 없음(디자인 범위 밖) 1 |
| intent URL | X `x.com/intent/tweet` ✅ · 스레드 `www.threads.com/intent/post` ✅ |
| 대비 재계산 | 디자이너 값과 일치(소수 둘째 자리 반올림 차이 1건) |
| D6 자칭 표현 | 시안 8파일 grep 0 ✅ |
| 저장소 독립 | 위반 0(대상 10파일 + 본 리뷰 산출물) |

---

## 2. scope 수용 기준 전수 대조 (23개)

| § | 수용 기준 | 시안 | 판정 |
|---|---|---|---|
| 2.1-1 | `/about`에 D1 전문 | 03 §1.1 — `SITE.description` 자리(헤더 문단)에 그대로 | ✅ |
| 2.1-2 | `/en/about` 동등 영어 문구 | 03 §1.2 — 위치만 정함, **영어 문구 없음**, 번역 담당 미지정 | 🟡 → P3-8 |
| 2.1-3 | `SITE(_EN).description` 갱신·160자 | 한국어 D1 126자 ✅, 영어는 문구가 없어 확인 불가 | 🟡 |
| 2.1-4 | "등록된" 대상 분리 | D1 원문 그대로 | ✅ |
| 2.2-1 | ko/en 존재 + `/about`에서 상호 링크 | 02 §2 terms→about 링크만 있음. **about→terms 링크 마크업이 03에 없음** | 🟡 → P3-9 |
| 2.2-2 | 6개 항목 | 02 §2 Section 6개 | ✅ |
| 2.2-3 | 연락 경로 임의 채움 금지 | 02 §3.1 이메일 제거, "준비 중" 박스(4c 반영) | ✅ (scope 문언은 4c 전 상태 — P3-11) |
| 2.2-4 | "지체 없이"·3영업일 구분 | 문안 원문 유지 | ✅ |
| 2.2-5 | 법적 효과 보장 문장 없음 | 없음. 단 디자이너가 문안 밖 문장 2개를 더함(P3-8) | ✅ |
| 2.2-6 | meta title·description·canonical | 02 §2 — `/about` 패턴으로 프로그래머 위임 | ✅ |
| 2.3-1 | 상세 ko/en 3종, 카카오 없음 | 01 §1·§2 | ✅ |
| 2.3-2 | 서버 상태 불필요 | intent `<a>` + Clipboard API | ✅ |
| 2.3-3 | 클릭 시 GA4 | 01 §6 `share` | ✅ |
| 2.3-4 | 레이블·키보드 | 네이티브 `<a>`·`<button>`, 텍스트 레이블. 복사 버튼 이름·표시 텍스트 불일치(P3-1) | 🟡 |
| 2.3-5 | 올바른 게시물 URL | `absoluteUrl(postPath(locale, id))`. 운영은 절대 URL(라이브 canonical `https://ihatekongsandang.vercel.app/about` 확인). 환경변수가 없으면 상대 경로가 됨(P3-3) | ✅ |
| 2.4-1 | **텍스트(배지·아이콘 아님)** | 05 §2.2 — **`Badge` 사용**(테두리·배경 있는 알약 모양) | ❌ → P2-1 |
| 2.4-2 | 기준 일수 = 사용자 확정값 | 7일(5a) | ✅ (경계 정의 P3-5) |
| 2.4-3 | 정렬은 `publishedAt` | 05 §4 | ✅ |
| 2.4-4 | 상세 갱신 이력과 충돌 없음 | 05 §4. 상세 "갱신 이력 한 줄" 미구현을 코드로 확인함(`post-detail.tsx`는 `updatedAt` 날짜만) | ✅ |
| 2.5-1 | 수단별 공유 이벤트 | `method: copy_link·x·threads` | ✅ |
| 2.5-2 | 네이밍 정합 | GA4 추천 이벤트 `share`의 `method`·`content_type`·`item_id`(공식 문서 확인)를 따라 `post_id` 대신 `item_id` — 이유 타당 | ✅ |
| 2.5-3 | 내부 트래픽 필터 확인 | GA 콘솔 작업이라 디자인 범위 밖 | 해당 없음 |
| 2.6-1 | 푸터 링크 `site-footer.tsx` | 04 — 26행 `aboutPath` 링크 옆 "·" | ✅ |

집계: ✅ 17 · 🟡 4(2.1-2·2.1-3·2.2-1·2.3-4) · ❌ 1(2.4-1) · 해당 없음 1(2.5-3) = 23.

---

## 3. intent URL 정정 검증 (임무 2)

| 항목 | 공식 문서(2026-11-08 리뷰어 WebFetch) | 시안 | 판정 |
|---|---|---|---|
| X 엔드포인트 | `docs.x.com/x-for-websites/post-button/guides/web-intent`: `https://x.com/intent/tweet`. overview 문서에도 `intent/post` 경로는 없다(tweet·retweet·like·user·follow만) | `https://x.com/intent/tweet` | ✅ — 오더의 `intent/post`는 오류 |
| X 파라미터 | `text`(UTF-8, URL-encoded), `url`(URL-encoded, t.co 단축), `hashtags`, `via`, `related`, `in_reply_to`. 합계 280자 | `text`·`url`만, `encodeURIComponent` | ✅ (길이 P3-2) |
| 스레드 엔드포인트 | Meta 문서: "The URL format is https://www.threads.com/intent/post." `threads.net`은 언급 없음 | `https://www.threads.com/intent/post` | ✅ — 오더의 `threads.net`은 오류 |
| 스레드 파라미터 | `text`·`url`·`tag`·`reply_control`·`reply_post_shortcode`·`quote_post_shortcode`. "All parameter values should be encoded using percent-encoding" | `text`·`url`만, `encodeURIComponent` | ✅ |

`encodeURIComponent`는 퍼센트 인코딩 요구를 충족한다.

## 4. 접근성 (임무 3)

### 4.1 대비 재현 (`contrast-output.txt`)
| 쌍 | 디자이너 | 재계산 |
|---|---|---|
| foreground / background | 17.7 | 17.72 |
| muted-foreground / background | 7.75 | 7.73 |
| link / background | 6.70 | 6.70 |
| ring / background(포커스) | 6.70 | 6.70 |
| border / background(outline 테두리) | 1.27 | 1.27 |
| foreground / surface-strong(Badge 글자) | "17:1대" | 16.12 |
| ring / surface-strong(hover 위 포커스) | — | 6.10 |

수치는 맞다. README "확인 필요" 표의 "포커스 링(17.7:1 상당)"은 같은 문서 접근성 표(6.70)와 다르다(P3-4).

### 4.2 1.27:1을 범위 밖으로 둔 판단 — **판단은 적절, 분류는 틀림**
- W3C Understanding 1.4.11(User Interface Components › Boundaries): 텍스트가 있는 버튼은 "a border or other indication of the overall boundary of the hit area is not required"이다. 테두리 대비는 "only required when there is no other visual way to identify the presence of the control"일 때만 요구된다.
- 공유 버튼 3개는 모두 보이는 텍스트 레이블이 있다. 그래서 테두리 1.27:1은 **1.4.11 위반이 아니다**(권장 미충족). 전역 outline 버튼과 일관성을 지키려고 이번 범위 밖에 둔 판단은 맞다. 다만 시안·트리거·README가 "WCAG 1.4.11 미달"이라고 적은 것은 고쳐야 한다(P3-4). 포커스 표시는 별도로 3:1이 필요한데 6.70·6.10으로 통과한다.

### 4.3 그 밖
- 터치 영역: `h-11` 44px ✅. 푸터 인라인 링크는 2.5.8 예외(인라인) ✅.
- `aria-live`: `role="status" aria-live="polite"` sr-only 영역이 처음부터 DOM에 있다 ✅. `alert()` 미사용 ✅.
- 복사 버튼: `aria-label={dict.shareCopyLink}`가 고정이라, 복사 성공·실패 2초 동안 보이는 텍스트("복사됨"/"복사 실패")가 접근성 이름에 들어가지 않는다 → 2.5.3 Label in Name(A) 불일치(P3-1).
- 갱신 표시 스크린리더 문구: P2-2.

## 5. 갱신 7일 판정 — SSG 한계와 구현 선택지 (임무 4)

**데이터**: `updatedAt`은 `YYYY-MM-DD`(시각 없음, `content/README.md` 80행). 판정할 수는 있다. 단 카드가 받는 `PostCardView`(`src/lib/content/view.ts`)에는 지금 `updatedAt`이 없어 필드를 더해야 한다(P3-6).

**빌드 구조**: `next.config.ts`에 `output: 'export'`가 없다. Vercel의 Next 런타임 배포이고, 라우트는 `generateStaticParams` + `dynamicParams = false` SSG다. 빌드는 커밋·푸시할 때만 돈다. 갱신 커밋 자체가 빌드를 일으키므로 **켜지는 시점은 정확하다.** 문제는 **꺼지는 시점**이다. 다음 배포가 없으면 7일이 지나도 표시가 남는다. 다만 표시 자체에 날짜("11/04 갱신")가 있어 오래 남아도 독자를 속이지는 않는다.

| 선택지 | 방식 | 장점 | 단점 |
|---|---|---|---|
| A 빌드 시점 기준(시안 기본안) | 서버에서 판정, 정적 HTML에 고정 | 가장 단순, 레이아웃 변화 없음 | 조용한 기간에 7일을 넘겨 남는다(날짜가 보여 오해는 적음) |
| B 정기 재배포 | Vercel **Deploy Hook**을 매일 호출(Vercel Cron은 함수를 부르는 기능이라 그것만으로는 재빌드되지 않음 — 시안 §3 2안 표현 정정, P3-7) | 정확도 일 단위 | 빌드 시간 사용·훅 비밀값 관리, 실패 감시 필요. Hobby 요금제 한도는 **확인 필요** |
| C 클라이언트 계산 | `useEffect`에서 브라우저 날짜로 판정 | 실제 날짜 기준, 인프라 불필요 | `post-card.tsx`는 `'use client'`여도 SSG 때 서버에서 미리 렌더된다. 렌더 중에 `Date.now()`로 계산하면 하이드레이션 불일치가 난다 → 반드시 `useEffect`. 하이드레이션 전에는 표시가 없다(같은 줄 짧은 글자라 레이아웃 이동은 작음) |
| D ISR(시안에 없음) | 피드·태그 라우트에 `export const revalidate = 86400` | 재배포 없이 하루 단위 갱신, 코드 1줄 | ISR 사용량·과금 한도 **확인 필요**. 정적 HTML 캐시 동작을 프로그래머가 실측해야 함 |

- **권고**: 기본은 A로 착수한다. 정확도가 필요하면 C를 쓴다(새 계정·비용 없음). B·D는 비용·한도를 확인한 뒤에만 고른다.
- **사용자 결정 필요 여부**: A·C는 **불필요**(프로그래머 판단). B·D는 비용·외부 설정이 생기므로 그것을 고를 때만 사용자 확인.
- 공통 주의(P3-5): "7일 동안"의 경계(갱신일 포함 7일 = 차이 0~6일 / 시안의 "≤ 7"은 8일)와 기준 시간대를 정한다. `updatedAt`은 한국 날짜이므로 "오늘"도 `Asia/Seoul` 기준이어야 한다. `Date.UTC` 비교만 하면 KST 00~09시에 하루 밀린다.

## 6. D6 편집 제약 (임무 5)
- 시안 8파일에서 `기자|속보|본지|편집국|바이라인|reporter|breaking|newsroom|byline` grep → **0건** ✅.
- "보도 정리" 성격은 D1 문구("모아 정리하는", "직접 취재하지 않고")와 약관 §1·§2·§6으로 드러난다 ✅. 공유 버튼 레이블("X에 공유" 등)·갱신 표기도 중립이다.

## 7. 구현 가능성 (임무 6)

| 요소 | 실재 여부 |
|---|---|
| `buttonVariants({ variant: 'outline' })` | `ui/button.tsx` 9행 `border-border bg-background hover:bg-surface-strong` ✅ |
| `Badge` | `ui/badge.tsx`, 중립 1종 ✅(단 P2-1로 갱신 표시에는 쓰지 않음) |
| 점선 박스 `rounded-[var(--radius-card)] border border-dashed` | `post-detail.tsx` 144행·`post-grid.tsx` 9행 ✅ |
| lucide `Link2`·`Check`·`CopyX` | `node_modules/lucide-react`(0.545.0) `link-2.js`·`check.js`·`copy-x.js` ✅ |
| `localePrefix`·`aboutPath`·`postPath`·`EN_MONTHS`·`formatDate` | `lib/i18n.ts` 195·204·208·212·218행 ✅. `termsPath`는 새로 만듦 |
| `GA_EVENTS`·`trackEvent` | `lib/analytics.ts` 10·27행 ✅. `share` 키 추가 |
| `focus-visible` 전역 규칙 | `globals.css` 65~69행 ✅ |
| `PostCardView.updatedAt` | ❌ 없음 → 추가 필요(P3-6) |
| 다크 모드 | `globals.css`에 없음 — 라이트 토큰만 검증하면 됨 |

외부 스크립트 0(목업 HTML도 `<script>`·외부 `src`·`href`·`@import` 0) ✅.

---

## 8. 결함

### 🟠 P2
| # | 위치 | 내용 | 수정 지시 |
|---|---|---|---|
| P2-1 | 05 §2.1·§2.2, 목업 ②~④ | scope 2.4-1은 "**텍스트**(배지·아이콘 아님)"이고, 근거인 기획서 §3.3도 "배지·아이콘이 아닌 짧은 글자"다. 디자이너 오더도 "작은 'MM/DD 갱신' 글자"라고 했다. 그런데 시안은 테두리·배경 있는 `Badge`(알약)를 쓴다. 카드에 "상태 배지"처럼 보이는 요소를 다시 들이는 것이라, 상태 라벨 폐지 원칙과의 거리도 좁힌다 | `CardFooter`의 기존 `sourceType` `<span>`과 같은 평문으로 바꾼다: `<span aria-hidden="true">·</span><span><time dateTime={updatedAt}>11/04 갱신</time></span>`(색·테두리·배경 없음, `text-xs text-muted-foreground` 상속 — 대비 7.73:1). 목업도 맞춘다 |
| P2-2 | 05 §2.4 `<Badge aria-label=…>` | `Badge`는 `<span>`(역할 generic)이다. ARIA 1.2는 generic 역할에 `aria-label` 이름 붙이기를 금지하고, 스크린리더가 읽지 않는 경우가 있다. 그러면 축약 표기 "11/04"만 읽히거나 전체 날짜가 전달되지 않는다 | 보이는 축약은 `aria-hidden="true"`로 두고 옆에 `<span className="sr-only">{renewedSr(fullDate)}</span>`를 둔다. 또는 보이는 글자를 그대로 읽게 하고 `<time dateTime>`만 유지한다 |

### 🟡 P3
| # | 위치 | 내용 |
|---|---|---|
| P3-1 | 01 §2.1 | 복사 버튼 `aria-label` 고정 → 상태 문구와 이름 불일치(2.5.3). `aria-label`을 빼면 보이는 텍스트가 곧 이름이 된다. X·스레드 링크의 `aria-label`도 보이는 텍스트와 같아서 필요 없다 |
| P3-2 | 01 §2.2 "제목은 짧아 길이 로직 불필요" | `x-title-length-output.txt`: 영어 제목 **206개 중 24개**가 제목 + URL(23) 가중치로 280을 넘는다(최대 350). 한국어는 0개(최대 215). 영어 피드는 `text`를 잘라 넣거나(예: 250 가중치에서 "…") 제목 없이 `url`만 넘긴다 |
| P3-3 | 01 §2.1~2.3 | `absoluteUrl`은 `NEXT_PUBLIC_SITE_URL`이 없으면 상대 경로를 돌려준다(`config.ts` 70~81행). 운영은 설정돼 있지만, 미리보기·로컬에서는 복사·intent가 깨진다. 클라이언트에서는 `window.location.origin`을 대체값으로 쓴다 |
| P3-4 | README·01 §5·트리거 | 1.27:1을 "WCAG 1.4.11 미달"이라 적었다 → "텍스트 버튼이라 1.4.11 요구 대상 아님(경계 표시는 권장)"으로 고친다(§4.2). README "포커스 링(17.7:1 상당)"은 6.70:1로 고친다 |
| P3-5 | 05 §1 "≤ 7일", `Date.UTC` 비교 | 경계(갱신일 포함 7일인지)와 기준 시간대(Asia/Seoul)를 명시한다(§5) |
| P3-6 | 05 §2.1 | `PostCardView`에 `updatedAt`이 없다 — `view.ts` 필드 추가를 구현 항목에 적는다 |
| P3-7 | 05 §3 2안 | "Vercel Cron으로 재빌드"는 Deploy Hook 호출이 있어야 성립한다. ISR(D안) 선택지도 빠졌다(§5 표) |
| P3-8 | 02 §2 헤더 소개 문장, 02 §3.1 "아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다.", 03 §2.2 "연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다.", 03 §1.2 영어 D1 | 문안 담당(기획자)이 쓰지 않은 문장을 디자이너가 더했다. 특히 "처리 기준은 확정 뒤부터 적용"은 운영 정책의 내용이다. 문구 자체에 문제는 없지만 문안 원본(`terms-page-copy.md`)에 반영하고 누가 확정했는지 남겨야 한다. 영어 D1 번역 담당도 정한다 |
| P3-9 | 03 | scope 2.2-1 "`/about`에서 상호 링크" — about→terms 링크 마크업·위치가 없다(02 §6이 "나중에 켠다"고만 함). 위치를 정한다(예: 정정·삭제 요청 절 끝) |
| P3-10 | 01 §2.2·2.3 | `target="_blank"` 새 창을 알리는 문구가 없다(권장 사항). 필요하면 sr-only "(새 창)"을 붙인다 |
| P3-11 | `planning/prd.md` §0.5·§11, `planning/news-format-v0.2-scope.md` 2.2-3·2.4·§4 | 4c·5a 결정 뒤에도 "연락 경로 미정·약관 공개 안 함", "(확인 후)", "현재 `contactEmail` 그대로 쓰거나"로 남아 있다(디자이너 결함 아님). 다음 기획 손질 때 갱신한다(history 23:06 슈퍼바이저 메모와 같음) |

## 9. 사용자 결정 필요 / 슈퍼바이저 판단
1. **약관 페이지 공개 방식(슈퍼바이저 판단, 필요하면 사용자 확인)** — 4c 문언은 "`/about`·`/terms`에 '연락 창구 준비 중' 표시"다. `/terms`를 준비 중 상태로 공개하는 것을 전제로 읽힌다. 반면 PRD §0.5(4c 이전 문장)와 시안 02 §6·04 §4는 "연락 경로 확정까지 공개 보류"다. 둘 중 하나로 정한다. 지금 공개하면 처리 기준을 지킬 경로가 없다는 점(리뷰 24 §7)을 "준비 중" 문장으로 드러내게 된다. 보류하면 D2 "지금 신설"이 연락 경로 확정까지 미뤄진다.
2. 갱신 7일 방식 — A·C면 사용자 결정이 필요 없다. B(정기 재배포)·D(ISR)를 고를 때만 비용·한도를 사용자에게 확인한다.

## 10. 프로그래머 착수 조건
- **지금 착수 가능**: 01 공유 버튼(P3-1·P3-2·P3-3 함께 반영), 03 `/about`·`/en/about` 연락처 박스 교체(`contact@example.invalid` 제거 — 라이브 결함 수정, 선행 조건 없음), 03 D1을 `SITE.description`에 적용(한국어). 04 푸터 링크는 코드만 준비하고, 노출 여부는 §9-1 결정을 따른다.
- **고친 뒤 착수**: 05 카드 갱신 — P2-1(평문)·P2-2(sr-only)를 반영한다. 디자이너 수정 또는 슈퍼바이저가 이 리뷰 지시를 오더에 직접 옮긴다. 방식은 A로 시작한다(§5).
- **결정 뒤 착수**: 02 약관 페이지 라우팅·사이트맵·about→terms 링크(§9-1). 영어 D1 문구는 번역 담당이 정해진 뒤에 넣는다(P3-8).

## 11. 커밋 대상 경로
디자이너 02 산출물(🟠 조건부 — P2 2건은 시안 수정 또는 프로그래머 오더 반영. 시안 원본을 고치지 않고 커밋한다면 오더에 "리뷰 25 P2-1·P2-2 우선"을 명시)
- `design/news-format-v0.2/README.md`
- `design/news-format-v0.2/01-share-buttons.md`
- `design/news-format-v0.2/02-terms-page.md`
- `design/news-format-v0.2/03-about-intro-contact.md`
- `design/news-format-v0.2/04-footer-terms-link.md`
- `design/news-format-v0.2/05-post-card-renewal-badge.md`
- `design/news-format-v0.2/mockup-share-buttons.html`
- `design/news-format-v0.2/mockup-post-card-renewal.html`
- `docs/handoffs/designer-02-news-format-v0.2-share-terms.md`
- `docs/triggers/designer-02-news-format-v0.2-share-terms-COMPLETE.md`
- `instructions/designer/processed/02-news-format-v0.2-share-terms.md`

리뷰어 25
- `docs/reviews/designer-02-news-format-v0.2-share-terms-review.md`
- `docs/tools/reviewer-25/contrast.py`, `contrast-output.txt`, `x-title-length.py`, `x-title-length-output.txt`
- `docs/triggers/reviewer-25-designer-02-news-format-v0.2-review-COMPLETE.md`
- `instructions/reviewer/processed/25-designer-02-news-format-v0.2-review.md`(이동)

(참고: `git status`상 `docs/user-tasks.md` 수정분(4c 기록)은 슈퍼바이저 영역이다. `history/2026-10-02~10-27`이 미추적으로 보이는 점과 tester-01·planner-07 미추적 파일은 이번 범위 밖이다. 경로 지정 커밋을 권장한다.)
