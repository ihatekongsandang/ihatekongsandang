# 완료 트리거 — 리뷰어 (Opus 5.5) · 31-1-programmer-14-1-recheck

**완료일**: 2026-11-09 16:23 | **모델 ID**: claude-opus-5-5 | **리뷰**: `docs/reviews/programmer-14-1-review-31-recheck.md` | **도구**: `docs/tools/reviewer-31-1/`
빌드·의존성 설치·git 쓰기·대상 수정은 하지 않았다. 기존 일반 빌드 `.next`(소스보다 새것 확인)를 `next start -p 3932`로 띄워 쟀다. 서버·Chrome 잔존은 0이다.

## 판정
**승인 — 커밋 조건 1건(P2-1).** P1 0 · P2 1 · P3 1(새 관찰, 차단 아님).
- P1-1 해소. sticky 제거 판단(결정 1)을 승인한다.
- P3-3 오류 처리(결정 2)를 승인한다. 시간이 지나도 기존 게시물이 깨지지 않고, 서울 기준이다.
- 13 핫링크 테스트 도메인(`img.example.test` + 테스트 전용 DNS 프리로드)을 승인한다.

## 재현 숫자
- probe-sticky 5크기 화면 밖 0(대진연·최장 게시물 둘 다)
- 추가 전수: 414쪽 × 2크기, 보조 열 요소 6,468건 화면 밖 0. 최장 게시물 Tab 완주 17/17 × 5크기, 화면 밖 0
- focus-full 90조합·5,402정지점 화면 밖 0. 완전 가림 90은 건너뛰기 링크, 일부 가림 16
- 수치 16항목 미달 0(compare diff 0)
- a11y-e2e 180/184(일반 빌드, FAIL 4 = GA share). GA 4건 PASS는 프로그래머 기록으로 확인했다
- 단위 64/64 · 104/104 · 53/53 · 35/35 · 핫링크 10/10 · 콘텐츠 207 통과 · copy-exact 38/38 · typecheck 0 · 전체 lint 0 errors

## 남은 결함
- **P2-1 (커밋 조건)**: `instructions/programmer/processed/14-1-review-31-fixes.md` 25행에 확장 grep 패턴이 글자 그대로 있다. 계정명과 홈 경로 접두어가 들어 있다. 훅에는 안 걸린다. 슈퍼바이저가 그 줄을 패턴 없이 고친 뒤 커밋할 것.
- P3-N1: news src 거부 목록에서 IPv4 매핑 IPv6와 CGNAT 100.64/10이 빠져 있다. 차단 아님, 다음 스키마 작업 때 넣는다.
- 디자인 확인(차단 아님): 1024 이상 긴 글에서 보조 열 아래가 빈다 → 디자이너.

## grep 잔여 판정 (5건)
- 오더 파일 1건(위 파일): **오탐 아님**. 이 파일만 고친 뒤 커밋한다(P2-1).
- 일반 낱말 "홍보(물)" 4건(content 3·`history/2026-10-15.md` 1): **오탐**이고 모두 커밋 대상이 아니다. 차단하지 않는다. 확장 grep에서 "홍"이 바로 앞에 붙은 경우만 예외로 둘 것을 권한다.
- 리뷰 31-1 산출물: 0건.

## 커밋 대상 경로 최종 목록 (50행, `docs/tools/reviewer-31-1/commit-targets.txt`)
- 코드:
  - `src/lib/content/{schema,translation}.ts` · `src/lib/i18n.ts` · `src/lib/floating-banner.ts` · `src/app/globals.css`
  - `src/components/{site-header,english-site-heading,page-frame,site-footer,floating-banner,feed-view,tag-nav,post-grid,post-card,card-media,pagination,post-detail,share-buttons,source-list}.tsx`
  - `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` · `src/app/(ko)/terms/page.tsx` · `src/app/(en)/en/terms/page.tsx` · `src/app/(ko)/tags/page.tsx`
  - `scripts/check-hotlinks.ts` · `scripts/validate-content.ts` · `package.json` · `eslint.config.mjs`
- 도구: `docs/tools/programmer-13/` · `docs/tools/programmer-14/` · `docs/tools/programmer-14-1/` · `docs/tools/reviewer-31/` · `docs/tools/reviewer-31-1/`
- 핸드오프: `docs/handoffs/programmer-02-review-fixes.md` · `docs/handoffs/programmer-13-card-image-schema-credit.md` · `docs/handoffs/programmer-14-responsive-redesign-implement.md` · `docs/handoffs/programmer-14-1-review-31-fixes.md`
- 트리거: `docs/triggers/programmer-13-card-image-schema-credit-COMPLETE.md` · `docs/triggers/programmer-14-responsive-redesign-implement-COMPLETE.md` · `docs/triggers/programmer-14-1-review-31-fixes-COMPLETE.md`
- 오더: `instructions/programmer/processed/13-card-image-schema-credit.md` · `instructions/programmer/processed/14-responsive-redesign-implement.md` · `instructions/programmer/processed/14-1-review-31-fixes.md`(🔴 P2-1 수정 후)
- 리뷰 31: `docs/reviews/programmer-13-14-image-responsive-review.md` · `docs/triggers/reviewer-31-programmer-13-14-image-responsive-review-COMPLETE.md` · `instructions/reviewer/processed/31-programmer-13-14-image-responsive-review.md`
- 리뷰 31-1: `docs/reviews/programmer-14-1-review-31-recheck.md` · `docs/triggers/reviewer-31-1-programmer-14-1-recheck-COMPLETE.md` · `instructions/reviewer/processed/31-1-programmer-14-1-recheck.md`
- `history/2026-11-09.md`
- 범위 밖이라 넣지 않은 미커밋 파일: 디자이너 03~05, 기획자 13·14, 리뷰 30, 테스터 01, `planning/card-image-policy.md`, 다른 날짜 history. 슈퍼바이저가 따로 판단한다.
