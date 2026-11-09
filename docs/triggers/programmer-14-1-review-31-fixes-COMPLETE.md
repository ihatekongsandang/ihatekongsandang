# 완료 트리거 — 프로그래머 (Opus 5.5) · 14-1-review-31-fixes

**완료일**: 2026-11-09 15:59 | **모델 ID**: claude-opus-5-5 | **오더**: `instructions/programmer/processed/14-1-review-31-fixes.md` | **핸드오프**: `docs/handoffs/programmer-14-1-review-31-fixes.md` | **도구**: `docs/tools/programmer-14-1/`
content·planning·design 수정 없음. P3-5·6·8 손대지 않음. 새 의존성 없음. git 명령 사용 없음(게이트 스크립트 내부 제외). 빌드는 이 세션만 했고, 마지막 빌드는 일반 빌드다(GA 더미 ID 0건).

## 수정 전 → 후
| 항목 | 전 | 후 |
|---|---|---|
| 🔴 P1-1 상세 보조 열 | `lg:sticky` — 1024×768 7/17·1024×600 8/16·1280×800 5/17·1280×600 8/16 화면 밖, focus-full 화면 밖 3 | **sticky 제거** — probe-sticky 5개 크기 **0**(대진연 게시물 + 보조 열 최장 1,672px 게시물 둘 다), focus-full 5,402정지점 **화면 밖 0** |
| P3-1 포털 | 9개 | 13개(+ naver.me·news.kakao.com·news.google.com·msn.com) |
| P3-2 news src | localhost·사설 IP·HTML 주소 통과 | 로컬 이름·IPv4/IPv6 사설·루프백·링크 로컬·문서 확장자 거부 |
| P3-3 retrievedAt | 미래 통과 | 오늘(서울) 이후 오류 |
| P3-4 JSDoc | `withoutCaption` 위(고아) | `localizePost` 위 |
| P3-7 비활성 쪽 이동 | `<span aria-disabled>` 2곳 | 속성 제거(sr-only 문구 유지) |
| P3-9 grep 스크립트 | 패턴 문자열 직접 기재 | 조합(`HOMEPAT`) + 양성 대조, 옛 핸드오프 표기 1곳 `$HOME`으로 |

sticky 기준값 근거: 보조 열 높이 전수 828건(ko·en × 207 × 1024·1280) 최대 1,672 · 중앙값 814 · 90% 1,092px → 기준 높이 ≥1,776px 필요 → 제거(핸드오프 결정 1).

## 검증 숫자
- 새 규칙 단위 **64/64**(양성 대조 6 FAIL 검출)
- 수치 16항목 **미달 0**(compare 표가 programmer-14와 diff 0)
- GA 더미 빌드 a11y-e2e **184/184**(GA share 4 포함, 라벨 14와 같음)
- 13 도구: 단위 **104/104** · 픽스처 빌드 **22/22** · 브라우저 **52/52** · 핫링크 **10/10**(테스트 주소를 `img.example.test` + DNS 프리로드로 바꾼 뒤)
- 05 **53/53** · 06 **35/35**
- copy-exact **38/38** · 소개·약관 글자 **4/4** · seo-parity **799/799**(head 메타 23,344·JSON-LD 2,324·.body 6)
- typecheck 0 · 전체 lint **0 errors** · clean-clone-gate `--worktree` **통과** · 최종 일반 빌드 검증 414·정적 801/801
- 저장소 독립: 훅 패턴 0(도구·src·scripts) · 확장 grep 잔여 5 = 오더 파일 1 + 일반 낱말 "홍보(물)" 오탐 4(content·history, 수정 금지 영역)

## 🔴 리뷰어 재확인 대상
P1-1(sticky 제거 판단 — 핸드오프 결정 1) · P3-3 오류 처리(결정 2) · 확장 grep 오탐 처리(결정 4)

## 커밋 대상 경로 (13 + 14 + 14-1 합본)
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

**14-1 추가**
- `src/components/post-detail.tsx` · `src/components/pagination.tsx` · `src/lib/content/schema.ts` · `src/lib/content/translation.ts` (위 코드 목록에 이미 있음 — 14-1 변경 포함)
- `docs/tools/programmer-13/hotlink-cases.mjs`·`hotlink-cases-output.txt`(14-1 갱신) · `docs/tools/programmer-13/dns-map-test.mjs`(신규) · `docs/tools/programmer-13/word-grep.sh`·`word-grep-output.txt`
- `docs/tools/programmer-14/word-grep.sh`·`word-grep-output.txt`
- `docs/handoffs/programmer-02-review-fixes.md`(홈 경로 표기 1줄)
- `docs/tools/programmer-14-1/` (README.md · aside-height-all.mjs·.json · probe-sticky-output.txt · probe-sticky-longest.mjs·-output.txt · focus-full.mjs·-output.json · shot-sticky.mjs · screens/ 2장 · unit-checks.ts·-output.txt · measure.mjs·measure-output.json · compare.mjs·compare-output.md · a11y-e2e.mjs·-output.txt · screens-e2e/ 18장 · p13-unit-checks-output.txt · p13-p11-build-check-output.txt · p13-hotlink-cases-output.txt · regression-unit-output.txt · copy-exact-check-output.txt · copy-text-parity-output.txt · seo-parity-output.txt · typecheck-output.txt · lint-output.txt · gate-worktree.log · build-output.txt · build-output-ga-dummy.txt · extended-grep-output.txt)
- `docs/handoffs/programmer-14-1-review-31-fixes.md` · `docs/triggers/programmer-14-1-review-31-fixes-COMPLETE.md`
- `instructions/programmer/processed/14-1-review-31-fixes.md`
