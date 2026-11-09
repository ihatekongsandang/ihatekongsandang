# 완료 트리거 — 프로그래머 (Opus 5.5) · 14-responsive-redesign-implement

**완료일**: 2026-11-09 15:10 | **모델 ID**: claude-opus-5-5 (오더 표기 Opus 5) | **오더**: `instructions/programmer/processed/14-responsive-redesign-implement.md` | **핸드오프**: `docs/handoffs/programmer-14-responsive-redesign-implement.md` | **도구**: `docs/tools/programmer-14/`
content·public/images·planning·guide·design 수정 없음. 소개·약관 문구 변경 없음(글자 비교 4/4). 새 의존성 없음. git 명령 사용 없음(게이트 스크립트 내부 제외). 빌드는 이 세션만 했다.

## 구현 범위 표 1~16
| # | 파일 | 상태 |
|---|---|---|
| 1 | `globals.css` 토큰·keep-all·본문 17/1.75·612px | ✅ |
| 2 | `site-header`·`english-site-heading` 한 줄 56px·44px·영어 부제 768 미만 h1로(D3) | ✅ |
| 3 | `feed-view` h1 한 줄·소개 `<details>` 접힘·"최신 게시물" 줄 | ✅ |
| 4 | `tag-nav` 가로 스크롤 레일·44px·끝 페이드·"전체 주제 N개"·현재 칩 | ✅ |
| 5 | `post-grid` base 1열 가로형 / md 2열 / lg 3열, 4열 제거 | ✅ |
| 6 | `post-card` 가로↔세로형·제목 3줄+`title`·"링크" 삭제(D7)·갱신·Korean only 유지 (`ui/card.tsx`는 미사용으로 남김 — 핸드오프 결정 13) | ✅ |
| 7 | `card-media` 새 대체 카드·깨짐 시 같은 카드·news alt=image.alt | ✅ |
| 8 | `pagination` "다음 페이지 N / M" + 쪽 번호, 전부 `<a href>`(D2) | ✅ |
| 9 | `post-detail` 순서 재배치·lg 2열 sticky·사진 1회·figcaption | ✅ |
| 10 | `share-buttons` 보조 열·lg 1열, 기능 그대로 | ✅ |
| 11 | `source-list` 행 44·종류 표지 12px | ✅ |
| 12 | `floating-banner`·`lib/floating-banner` <1024 하단 띠 52px + 푸터 여백 + scroll-padding-bottom, ≥1024 현행(D1) | ✅ |
| 13 | `site-footer` 링크 44·md 가로 | ✅ |
| 14 | 태그 페이지 이동 경로·h1·건수 문장·현재 칩(`FeedView`에서 처리) | ✅ |
| 15 | 소개·약관 ko/en 읽기 체계(`.reading-page`) | ✅ |
| 16 | 스키마(`image.kind` 등) | ✅ 프로그래머 13 (저작물명 필드는 기획 결정 대기) |
| 17 | (D5 제외) | 범위 밖 |

## 수치 목표 실측 대비표 (`compare-output.md`, 6화면 × 7폭 = 42조합 · 리플로우 66 · Tab 159)
| 항목 | 목표 | 보강안(목업 측정) | 실제 구현(로컬 next start) | 판정 |
|---|---|---|---|---|
| 360×740 첫 화면 카드(고정 요소에 안 가림) | ≥4, 첫 카드 y ≤300 | 4장, y=247 | 4장, y=247 | ✅ |
| 홈 머리 높이 360 | ≤240 | 190 | 190 | ✅ |
| 영어 헤더 360 | ≤64 | 57 | 57 | ✅ |
| 같은 행 카드 높이 편차(홈·영어·태그 × 7폭 최대) | 0 또는 줄 제한 | 0px | 0px | ✅ |
| 상세 ko 글자/줄 768·1024·1280 | 32~45 | 42.7 · 42.7 · 42.7 | 42.7 · 42.7 · 42.7 | ✅ |
| 상세 en 글자/줄 768·1280 | 60~75 | 61.6 · 61.6 | 61.6 · 61.6 | ✅ |
| 소개 ko 글자/줄 768·1280 | 32~45 | 44 · 44 | 42.1 · 42.1 | ✅ |
| 상세 ko 글자/줄 360(참고) | —(9개 시안 공통 한계) | 21.9 | 21.9 | — |
| 390×844 "원문 기사로 이동" | 844 안, 안 가림 | y=457, 안 가림 | y=465~517, 안 가림 | ✅ |
| 44px 미만 터치(문장 속 링크 제외) — 6화면 × 7폭 | 0 | 0 | 0 | ✅ |
| 12px 이하 글자 비율 홈 360 | ≤10% | 0% | 1% | ✅ |
| 12px 이하 글자 비율 상세 360 | (참고) | 0.4% | 1.1% | — |
| 글자 대비 4.5:1 미달 | 0 | 0 / 2424 | 0 / 2569 | ✅ |
| 컨트롤 경계 대비 최소 | ≥3:1 | 1.27 | 3.81 | ✅ |
| 가로 넘침(320~1440 리플로우 66조합) | 0 | 0 / 77 | 0 / 66 | ✅ |
| Tab 포커스 표시 없음 / 고정 요소에 완전히 가림 | 0 · 0 | 0/159 · 0 | 0/159 · 0 | ✅ |
| 외부 요청 | 0 | — | 0 | ✅ |
| 폭별 열 768·834·1024·1280·1440(카드 폭) | 2·2·3·3·3 | 2(340px) · 2(373px) · 3(285px) · 3(336px) · 3(336px) | 2(340px) · 2(373px) · 3(285px) · 3(336px) · 3(336px) | ✅ |
| 태그 페이지 360 첫 화면 카드 | (참고) | 3장(y=276) | 3장(y=268) | — |
| 상세 스크롤 중 고정 위/아래 360 | (참고) | 57/52 | 57/52 | — |

## 회귀 숫자
- a11y-e2e **184/184** (13 대비 바뀐 라벨 4줄 = 공유 위치 검사 1종 × 2폭 × 상세 2, 근거 핸드오프 §회귀)
- copy-exact(programmer-12) **38/38** · 소개·약관 `<main>` 글자 비교 **4/4 같음**
- 메타·JSON-LD·사이트맵(`seo-parity`): **799/799 같음** — head 메타 23,344 · JSON-LD 2,324 · .body 6, 양성 대조 3/3
- 프로그래머 13 도구: 단위 **104/104** · 픽스처 빌드 **22/22** · 브라우저 figcaption **52/52** · 핫링크 경로 **10/10**
- programmer-05 단위 **53/53** · programmer-06 단위 **35/35**
- typecheck exit 0 · `npm run lint` 전체 **0 errors**(16 warnings 기존 도구) · build 검증 414·경고 22·정적 801/801 · **clean-clone-gate `--worktree` ✅ 통과**
- 화면 72장(ko/en × 홈·상세·태그·소개·약관 × 360·768·1024·1280, 첫 화면+전체 — 영어 태그 페이지는 없음) + e2e 화면 18장
- 저장소 독립 패턴·D6 금지어: 변경 파일 23개 0 · 도구 폴더 0 · 홈 절대경로 0

## 추가 임무 0 처리
**방법 2(docs/tools 전체 일관 규칙)**를 택했다. `eslint.config.mjs`에 `files: ['docs/tools/**']` → `react-hooks/rules-of-hooks: 'off'` 하나만 넣었다.
- 원인: 오류 7건은 디자이너 도구의 SVG 문자열 함수 `use()`를 훅으로 오인한 것이다.
- 범위: Node 스크립트 전체에 같은 기준을 적용한다. 다른 규칙은 그대로 둔다. `src/`는 넣지 않았다.
- 결과: 전체 lint 0 errors, `--worktree` 게이트 통과.

## 🔴 리뷰어 게이트 대상 (13·14 묶음)
- 추가 임무 0 규칙 범위
- 핸드오프 결정 2~13
- e2e 위치 검사 변경
- 13 도구 기대값 변경: figcaption `data-credit`, 링크 문구
- 13 트리거의 게이트 대상 전부

## 커밋 대상 경로 (13 + 14 합본)
**코드**
- `src/lib/content/schema.ts` · `src/lib/content/translation.ts` · `src/lib/i18n.ts`
- `src/app/globals.css`
- `src/components/{site-header,english-site-heading,page-frame,site-footer,floating-banner,feed-view,tag-nav,post-grid,post-card,card-media,pagination,post-detail,share-buttons,source-list}.tsx`
- `src/lib/floating-banner.ts`
- `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` · `src/app/(ko)/terms/page.tsx` · `src/app/(en)/en/terms/page.tsx` · `src/app/(ko)/tags/page.tsx`
- `scripts/check-hotlinks.ts`(신규) · `scripts/validate-content.ts` · `package.json` · `eslint.config.mjs`

**도구·문서**
- `docs/tools/programmer-13/` (13 트리거 목록 + 14에서 갱신한 `unit-checks.tsx`·`p11-build-check.mjs`·`figcaption-a11y.mjs`·`p11-build-check-output.txt`·`screens-figcaption/`)
- `docs/tools/programmer-14/` (README.md · measure.mjs · measure-output.json · compare.mjs · compare-output.md · shots.mjs · screens/ 72장 · a11y-e2e.mjs · a11y-e2e-output.txt · screens-e2e/ 18장 · copy-exact-check-output.txt · copy-text-parity.py · copy-text-parity-output.txt · seo-parity.mjs · seo-parity-output.txt · p13-unit-checks-output.txt · p13-p11-build-check-output.txt · regression-unit-output.txt · typecheck-output.txt · lint-output.txt · gate-worktree.log · build-output.txt · build-output-ga-dummy.txt · word-grep.sh · word-grep-output.txt)
- `docs/handoffs/programmer-13-card-image-schema-credit.md` · `docs/handoffs/programmer-14-responsive-redesign-implement.md`
- `docs/triggers/programmer-13-card-image-schema-credit-COMPLETE.md` · `docs/triggers/programmer-14-responsive-redesign-implement-COMPLETE.md`
- `instructions/programmer/processed/13-card-image-schema-credit.md` · `instructions/programmer/processed/14-responsive-redesign-implement.md`
- `history/2026-11-09.md`
