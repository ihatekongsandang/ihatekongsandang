# 리뷰 31 — 프로그래머 13(카드 이미지 스키마·크레딧) + 14(반응형 개편) 묶음

**작성일**: 2026-11-09 15:29 | **작성 세션**: 리뷰어 (Opus 5.5 · 모델 ID `claude-opus-5-5`) | **오더**: `instructions/reviewer/processed/31-programmer-13-14-image-responsive-review.md` | **도구**: `docs/tools/reviewer-31/`

## 0. 판정

**조건부 승인. 커밋 전에 P1 1건을 고쳐야 한다.**
- 13(스키마·검증·figcaption·P6·P7·P9·P11)은 정책 P1~P4·P6·P7·P9·P11과 리뷰 30 §4-2 완화책에 모두 맞는다. 결함은 P3뿐이다.
- 14는 범위 1~16과 D1~D7을 소스에서 하나씩 확인했다. 실측 16항목은 프로그래머 출력과 글자 단위로 같게 재현됐다.
- **P1-1**: 1024~1439px에서 화면 높이가 보조 열보다 낮으면(1024×768, 1280×800 등) 상세 보조 열(sticky) 안의 공유 버튼·태그 칩에 Tab 포커스가 가도 화면 밖에 있다. WCAG 2.2 AA 2.4.7·2.4.11 위반이다. 프로그래머 측정 도구는 이 경우를 잡지 못한다(40단계·fixed 요소만 보고 화면 밖 판정이 없음).

| 등급 | 건수 |
|---|---|
| P1 | 1 |
| P2 | 0 |
| P3 | 9 |

## 1. 재현 숫자 (빌드 없이 기존 `.next` + `next start -p 3931`)

`.next/BUILD_ID`는 15:06:59에 만들어졌다. 그 뒤 수정된 src·scripts·content·public 파일은 0개다(`find -newer`). 끝난 뒤 서버와 Chrome 잔존은 0이다.

| 항목 | 프로그래머 | 리뷰어 재현 | 비고 |
|---|---|---|---|
| 수치 목표 16항목(42조합·리플로우 66·Tab 159) | 미달 0 | **미달 0, `compare-output.md` diff 0** | 외부 요청 0 |
| a11y-e2e | 184/184 | **180/184** | FAIL 4 = GA share 이벤트. 이 `.next`는 측정 ID 없는 최종 빌드라 gtag가 없다. GA 더미 빌드는 빌드 금지라 재현 불가 → **확인 필요**. 공유 컴포넌트 diff는 클래스·제목 표시뿐이고 `trackEvent` 호출·`analytics.ts`는 바뀌지 않았다(소스 확인). 나머지 180줄 라벨은 같다 |
| copy-exact | 38/38 | **38/38**(출력 diff 0) | |
| 13 단위 | 104/104 | **104/104** | |
| 핫링크 경로 | 10/10 | **10/10** | |
| programmer-05·06 단위 | 53·35 | **53·35** | |
| 콘텐츠 검증 | 207 통과 | **207 통과, self 207 · public 0 · news 0** | 기존 207건 그대로 통과 |
| typecheck / 전체 lint | 0 / 0 errors | **0 / 0 errors(16 warnings, 전부 기존 docs/tools)** | |
| 빌드 HTML `data-credit`·`referrerpolicy` | 0·0 | **0·0** | og:image 792개 전부 자체 주소 |
| 포커스 전수(리뷰어 도구) | — | 90조합·정지점 5,402: 완전 가림 0(건너뛰기 링크 90건은 오탐 확인), 일부 가림 16(AAA 참고), **화면 밖 = P1-1** | |
| 재현하지 못한 것 | | 픽스처 빌드 22·브라우저 figcaption 52·seo-parity 799·clean-clone-gate | 모두 빌드가 필요하다. 소스 확인만 했다(§2) |

## 2. 13 코드 정확성

| 정책·완화책 | 구현 | 판정 |
|---|---|---|
| P1 필드 7개 | `PostImage`에 `kind`·`creditName`·`creditNameEn`·`sourcePageUrl`·`license`·`retrievedAt`·`faceNote` | ✅ |
| news만 https src | news는 `isHttpsUrl`만 받는다. self·public은 `/images/` 경로만 받는다(외부 https면 거부, 경계 사례로 확인) | ✅ |
| 포털 거부(src·sourcePageUrl 둘 다) | `PORTAL_HOSTS` 9개 + 하위 도메인. 끝 점·대문자도 정규화된다 | ✅ (목록 보강 P3-1) |
| `sourcePageUrl ∈ sources[]` | 앞뒤 공백만 무시하고 글자 그대로 대조한다. 그 출처의 type이 `언론`이어야 한다. 끝 슬래시만 달라도 거부된다 | ✅ 보수적이고 정책 B-1 문언에 맞다 |
| public: kogl-1만, kogl-3 오류 | 그대로다. 대문자 `KOGL-1`도 거부된다 | ✅ |
| faceNote 필수(리뷰 30 수정표 #3) | public·news 필수, 공백만 있으면 거부 | ✅ |
| 기존 207건(kind 없음) | 생략하면 self. 207건 통과 | ✅ |
| public·news는 `url` 유형 대표 이미지에만(결정 1) | `images[]`·사진 유형이면 오류 | ✅ 승인. 갤러리는 next/image를 거치고 크레딧이 없으므로 L1·L4 완화책에 맞다 |
| P3 news → remote, alt = image.alt, credit | 그대로다 | ✅ |
| P4 figcaption | ko `사진: {creditName}` / en `Photo: {creditNameEn}`. 링크는 `ExternalLink`(`target=_blank rel="noopener"` + sr-only "새 창에서 열림", `min-h-11`). public은 `(공공누리 제1유형)`과 공식 문구 요지를 붙인다. 카드에는 크레딧이 없다 | ✅ |
| P6 `<img>` 직접·referrerpolicy 불변 | `card-media.tsx`가 `<img>`를 직접 쓰고 `referrerpolicy` 속성은 0이다. `next.config`·`vercel.json`은 diff에 없다 | ✅ |
| P7 CSP | 변경 없음. Report-Only라는 사실은 프로그래머 보고대로다 | ✅ |
| P9 비차단 스크립트 | `check:hotlinks`는 prebuild와 분리돼 있고 종료 코드는 항상 0이다. Referer는 사이트 출처만 보낸다(결정 9) | ✅ 결정 9 승인. 브라우저 동작을 재현할 뿐 우회가 아니다 |
| P11 OG·JSON-LD·sitemap | `seo.ts`·`sitemap.ts`·메타 생성 파일이 diff에 없다. `seo.ts`에는 `image` 키 자체가 없다. 빌드 og:image는 전부 자체 주소다 | ✅ 픽스처 빌드는 미재현(빌드 금지) |

## 3. 14 구현 충실도

- **범위 1~16**: `globals.css` 토큰 값은 tokens.md §1과 같다(#82828a·#71717a·#f4f4f5·612/561·56·52). 2~15는 diff를 직접 읽어 확인했고 16은 13에서 처리됐다. 17(D5)과 새 라우트(D6)는 없다. git status 기준 새 `src/app` 파일은 0개다.
- **D1** <1024 하단 전폭 띠 `--banner-h` 52px + 부제 + safe-area, 푸터 여백, `scroll-padding-bottom` 68px. ≥1024는 세로 탭. 닫기 없음. **D2** "다음 페이지 N / M" + 쪽 번호. 이동은 전부 `<a href>`이고 비활성 이전·다음은 링크가 아닌 span이다. **D3** 영어 부제는 md 이상에서만 헤더에 있고 미만에서는 h1 둘째 줄로 간다(화면 확인). **D4** 카드에 크레딧이 없다. **D7** 카드·상세 유형 배지가 없다. **U2** 다크 없음, **U5** 시스템 폰트.
- **유지 기능**: 갱신 표시(태그 360 화면에 "11/08 갱신")·Korean only(e2e 라벨)·대체 전환(`useEffect` naturalWidth 검사 + onError 유지)·약관/소개 문구(copy-exact 38, 소개·약관 diff는 className만 바뀜)·SEO(메타 파일 무변경)·공유·GA(소스 무변경, e2e GA 4건은 미재현).
- **화면 Read 확인 10장**: ko 홈 360·768·1280, ko 상세 360·360 전체·1280, ko 태그 360, ko 소개 1280, en 홈 360, en 상세 360. 홈 360 전체 화면도 열어 쪽 이동·푸터를 봤다. P1-1 화면 1024×768도 열었다. 72장 중 나머지 62장은 열지 않았다. 대신 수치는 전수 측정으로 재현했다.

## 4. 프로그래머 결정 판정

| # | 결정 | 판정 |
|---|---|---|
| 13-1 | public·news를 `url` 유형 `image`로 제한 | 승인 |
| 13-2 | 글자 그대로 대조 + `언론` type | 승인 |
| 13-3 | 포털 목록 9개 | 승인. 보강은 P3-1 |
| 13-9 | 점검 Referer = 사이트 출처 | 승인 |
| 14-1 | lint 규칙(아래 §5) | 승인 |
| 14-2 | **날짜 전체 표기 유지** | **승인.** 목업 "11/08"은 연도가 없어 2019·2024년 재조명 게시물이 섞인 피드에서 시점을 오인시킨다. 360에서도 한 줄이고 16항목 모두 통과한다. 축약을 원하면 디자이너 오더로 다룬다(사용자 결정 불필요) |
| 14-3 | **현재 언어 표시 없음(상대 언어 링크 하나)** | **승인.** WCAG가 요구하는 항목이 아니다. 링크에 `lang`·`hrefLang`이 있고 문서 `lang`이 맞다. 홈·소개 `aria-current`도 AA 요구가 아니다. 개선 후보로만 남긴다 |
| 14-4 | 대표 이미지 없는 상세는 사진 자리 생략 | 승인 |
| 14-5 | 미리보기에서 이미지 제거 | 승인. 안내문 "썸네일" 낱말은 P3-6(기획) |
| 14-6 | 영어 원문 링크 위치 | 승인 |
| 14-7 | **"주제" 대 "전체 태그"** | **고칠 것(P3-5, 차단 아님).** 레일 끝 칩 "전체 주제 N개"를 누르면 h1이 "전체 태그"인 `/tags`로 간다. 태그 화면은 "이 주제로…", 상세 보조 열은 "태그"라 한 흐름 안에서 용어가 갈린다. 기획자가 한 낱말로 정한다. 권고는 화면 낱말을 "주제"로 통일하고 URL `/tag`는 유지하는 것이다. 사용자 결정까지는 필요 없다 |
| 14-8 | 태그 피드 머리 건수 문장 | 승인(메타 불변) |
| 14-9 | 크레딧 링크 문구 = 목업 | 승인 |
| 14-10 | `.reading-page` CSS 적용 | 승인 |
| 14-11 | 칩 안쪽 포커스 링 | 승인 |
| 14-12 | 레일 `relative`(넘침 1,187px 수정) | 승인. 리플로우 0/66 재현 |
| 14-13 | `ui/card.tsx` 미사용 보관 | 승인. 참조 0건이다. 정리는 별도 작은 오더로 한다 |
| e2e | 공유 위치 검사 1종 갱신 | 승인(보강안 상세 순서와 일치) |
| 13 도구 | 기대값(`data-credit`·링크 문구) 갱신 | 승인. 항목 수 104가 같다 |

## 5. lint 규칙

`files: ['docs/tools/**']`에서 `react-hooks/rules-of-hooks`만 끈다. `--print-config` 결과는 `src/components/post-detail.tsx` = 2(error 유지), `docs/tools/designer-04-A/build.mjs` = 0이다. `src/`에는 영향이 없다. 근거(SVG `use()` 오인)도 타당하다. **승인.**

## 6. 접근성

- **배너 포커스 가림(2.4.11)**: 9화면 × 5폭 × 앞/뒤 전 정지점 5,402에서 배너·헤더에 완전히 가린 경우는 0이다. 360·320에서 앞으로 Tab할 때 카드 제목이 띠에 일부 겹치는 경우가 16건 있다(AAA 2.4.12 참고, AA 통과).
- `scroll-padding-top` 72·bottom 68을 적용했다. 터치 44px 미만은 0이고 리플로우 320 넘침은 0이다(재현).
- **읽기 순서**: 상세 DOM은 이동 경로 → 제목 → 요약 → 메타 → 원문 이동 → 안내 → 사진 → 본문 → 미리보기 → aside(배경 보도·공유·태그) → 정정 안내다. lg에서는 aside가 오른쪽 열 위에 오지만 DOM이 본문 다음이라 화면 읽기 순서와 맞는다. 배너는 DOM 끝(푸터 뒤)에 있다. 피드는 h1 → 소개 → 레일 → "최신 게시물" → 카드 → 쪽 이동 → 푸터로, 화면 순서와 같다.
- **P1-1**(아래).

## 7. 결함

### P1-1 상세 보조 열 sticky — 포커스가 화면 밖 (WCAG 2.4.7·2.4.11, 차단)
- **재현**: `probe-sticky-output.txt`, `screens/post-1024x768-tag-focus.png`. 보조 열 높이는 793px(1024)·747px(1280)이다. 화면 밖 포커스는 1024×768에서 7/17, 1280×800에서 5/17(칩 44px 중 17px만 보임), 1024×600·1280×600에서 8/16이다. 1440×900은 0이다. 브라우저가 스크롤해도 sticky 열은 같은 자리에 붙어 있어 칩이 내려오지 않는다.
- **원인**: `post-detail.tsx` aside의 `lg:sticky lg:top-[calc(var(--header-h)+24px)]`가 열 높이 > 화면 높이인 경우를 고려하지 않았다.
- **수정안**(택1, 프로그래머):
  - (권장) 화면 높이가 충분할 때만 sticky를 건다. 예: `lg:[@media(min-height:60rem)]:sticky`. 값은 보조 열 최대 높이 + 헤더 + 여백 이상으로 실측해 정한다.
  - 또는 sticky를 뺀다.
  - 열 자체를 `max-h` + `overflow-y:auto`로 만드는 안은 중첩 스크롤이 생겨 권하지 않는다.
- **수정 후 검증**:
  - `node docs/tools/reviewer-31/probe-sticky.mjs`에서 5개 크기 모두 화면 밖 0
  - `focus-full.mjs`에서 화면 밖 0
  - measure 16항목 재실행
- 배경 보도 출처가 많은 게시물일수록 열이 길어진다. 207건 중 최대 높이 게시물로 확인할 것.

### P3 (차단 아님)
1. 포털 목록이 단축·집계 주소를 놓친다. `naver.me`, `news.kakao.com`, `news.google.com`, `msn.com`이 포털로 걸리지 않는다(현재 content 0건). 목록에 넣을지는 기획 확인이 필요하다.
2. news `src`에 `https://localhost`·사설 IP·HTML 문서 주소가 통과한다. 업로더 실수 방지용으로 사설 주소를 거부하고 `check:hotlinks`에서 `content-type: image/*`를 확인하라고 권한다.
3. `retrievedAt`에 미래 날짜가 통과한다(빌드일 이후면 경고 권장).
4. `translation.ts`: `localizePost`의 JSDoc이 새 함수 `withoutCaption` 위로 밀려 고아 주석이 됐다. 주석 위치만 옮기면 된다.
5. "주제"·"전체 태그"·"태그" 용어 혼재(결정 14-7) → 기획.
6. 원문 미리보기 안내문의 "썸네일" 낱말이 이미지 제거 후 사실과 다르다(13 미해결 4 잔여) → 기획 문구.
7. 쪽 이동 비활성 `<span aria-disabled="true">`: 역할 없는 요소의 aria-disabled는 무의미하다. sr-only 문구로 이미 전달되니 속성을 빼도 된다.
8. 이동 경로 "홈 ›" 사이 간격이 넓다. `min-w-11` 때문에 링크 상자가 44px이다(360·1280 화면). 시각 문제만 있다.
9. 프로그래머 13·14 `word-grep.sh` 본문에 홈 경로 검사 패턴 문자열이 들어 있다. pre-commit 훅 패턴에는 안 걸리지만(훅 패턴 검사 0건) 슈퍼바이저의 확장 grep에는 2건 걸린다. 패턴을 쪼개 쓰는 등 정리하라고 권한다. 이미 커밋된 `docs/tools`에는 같은 문자열이 0건이다.
- 도구 메모: programmer-14 `measure.mjs` Tab 탐침은 sticky와 화면 밖을 판정하지 않는다. 다음 측정부터 `focus-full.mjs` 방식을 함께 쓸 것.

## 8. 저장소 독립·보안

- diff(src·scripts·package.json·eslint)는 금지어 0, pre-commit 훅 패턴은 커밋 대상 13개 경로 전부 0이다.
- 이 리뷰 도구 폴더는 0이다. 출력 경로를 상대경로로 고쳤고 게시물 제목 오탐 1건은 괄호로 처리했다(README).
- 외부 요청은 0(측정)이다. 비밀값 0: diff에서 키·토큰 문자열 0, GA ID 0.

## 9. 사용자 결정 필요
- 없음. 14-7 용어와 P3-1 목록은 기획 확인 사항이다.
- 이미지 정책 U1~U5(공인 범위 등)는 이번 코드와 무관하게 계속 미결이다. 업로더 투입 전에 정해야 한다(리뷰 30).

## 10. 커밋 대상 경로(최종 — P1-1 수정 후)
- **코드**:
  - `src/lib/content/schema.ts` · `src/lib/content/translation.ts` · `src/lib/i18n.ts` · `src/lib/floating-banner.ts` · `src/app/globals.css`
  - `src/components/{site-header,english-site-heading,page-frame,site-footer,floating-banner,feed-view,tag-nav,post-grid,post-card,card-media,pagination,post-detail,share-buttons,source-list}.tsx`
  - `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` · `src/app/(ko)/terms/page.tsx` · `src/app/(en)/en/terms/page.tsx` · `src/app/(ko)/tags/page.tsx`
  - `scripts/check-hotlinks.ts` · `scripts/validate-content.ts` · `package.json` · `eslint.config.mjs`
- **도구·문서**: `docs/tools/programmer-13/` · `docs/tools/programmer-14/` · `docs/tools/reviewer-31/`
- **핸드오프·트리거·오더**:
  - 핸드오프·트리거: `docs/handoffs/programmer-13-card-image-schema-credit.md` · `docs/handoffs/programmer-14-responsive-redesign-implement.md` · `docs/triggers/programmer-13-card-image-schema-credit-COMPLETE.md` · `docs/triggers/programmer-14-responsive-redesign-implement-COMPLETE.md`
  - 오더: `instructions/programmer/processed/13-card-image-schema-credit.md` · `instructions/programmer/processed/14-responsive-redesign-implement.md`
- **리뷰 산출물**: `docs/reviews/programmer-13-14-image-responsive-review.md` · `docs/triggers/reviewer-31-programmer-13-14-image-responsive-review-COMPLETE.md` · `instructions/reviewer/processed/31-programmer-13-14-image-responsive-review.md`
- `history/2026-11-09.md`
- P1-1 수정 커밋에는 수정 프로그래머의 도구·출력을 더한다. 수정 후 리뷰어 재확인(`probe-sticky`·`focus-full`)과 a11y-e2e GA 4건 재현(GA 더미 빌드)을 거친 뒤 커밋한다.
