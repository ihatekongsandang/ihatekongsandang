# 완료 트리거 — 리뷰어 (Opus 5.5) · 31-programmer-13-14-image-responsive-review

**완료일**: 2026-11-09 15:29 | **모델 ID**: claude-opus-5-5 | **리뷰**: `docs/reviews/programmer-13-14-image-responsive-review.md` | **도구**: `docs/tools/reviewer-31/`
빌드·의존성 설치·git 쓰기·대상 수정 없음. 기존 `.next`(소스보다 새것 확인)를 `next start -p 3931`로 띄워 쟀다. 서버·Chrome 잔존 0.

## 판정
**조건부 승인 — P1 1건 수정 후 커밋.** P1 1 · P2 0 · P3 9.
- 13: 정책 P1~P4·P6·P7·P9·P11과 리뷰 30 완화책에 전부 맞는다.
- 14: 범위 1~16·D1~D7 반영, 실측 16항목 재현(출력 diff 0).

## 재현 숫자
- 수치 16항목 미달 0(`compare-output.md` 프로그래머와 동일) · 외부 요청 0
- a11y-e2e 180/184 — FAIL 4는 전부 GA share 이벤트. 이 `.next`에 측정 ID가 없어서다. GA 더미 빌드가 필요해 재현하지 못했다(확인 필요). 나머지 라벨 180줄은 같다
- copy-exact 38/38 · 13 단위 104/104 · 핫링크 10/10 · 05 단위 53/53 · 06 단위 35/35 · 콘텐츠 207 통과(self 207)
- typecheck 0 · 전체 lint 0 errors
- 포커스 전수 90조합·정지점 5,402: 완전 가림 0, 일부 가림 16(AAA 참고), 화면 밖은 P1-1
- 미재현(빌드 필요): 픽스처 빌드 22, 브라우저 figcaption 52, seo-parity 799, clean-clone-gate

## 결함
- **P1-1 (차단)**:
  - 증상: 상세 보조 열 `lg:sticky`의 높이(793/747px)가 화면보다 크면 공유·태그 칩 포커스가 화면 밖에 간다. 1024×768 7/17, 1280×800 5/17, 600 높이 8/16, 1440×900 0이다. WCAG 2.4.7·2.4.11 위반이다.
  - 근거: `probe-sticky-output.txt`, `screens/post-1024x768-tag-focus.png`.
- P3:
  1. 포털 목록이 naver.me·news.kakao.com·news.google.com·msn.com을 놓친다(content 0건).
  2. news src에 localhost·사설 IP·HTML 주소가 통과한다.
  3. 미래 retrievedAt이 통과한다.
  4. translation.ts JSDoc 위치.
  5. "주제"/"전체 태그"/"태그" 용어가 섞여 있다.
  6. 미리보기 안내문에 "썸네일" 낱말이 남아 있다.
  7. 비활성 span에 aria-disabled가 붙어 있다.
  8. 이동 경로 "홈 ›" 간격이 넓다.
  9. 13·14 `word-grep.sh` 본문에 홈 경로 검사 패턴 문자열이 있다(훅 패턴 0, 확장 grep 2건).

## 차단 항목과 수정안
- P1-1 → 프로그래머 수정. sticky를 화면 높이 조건으로만 건다(예: `lg:[@media(min-height:60rem)]:sticky`, 값은 최장 보조 열로 실측) 또는 sticky를 뺀다.
- 검증:
  - `node docs/tools/reviewer-31/probe-sticky.mjs <url>` 5개 크기 모두 0
  - `focus-full.mjs` 화면 밖 0
  - measure 16항목 재실행
  - GA 더미 빌드 a11y-e2e 184/184
- 리뷰어가 재확인한 뒤 커밋한다.

## 프로그래머 결정
- 13-1·2·3·9 승인
- 14-1(lint) 승인
- 14-2 날짜 전체 표기 승인
- 14-3 현재 언어 표시 없음 승인(AA 요구 아님)
- 14-7 "주제" 대 "전체 태그"는 고칠 것(P3, 기획이 한 낱말로 정함, 차단 아님)
- 나머지 4~6·8~13·e2e 변경·13 도구 기대값 승인

## lint 규칙
`docs/tools/**`에서 `react-hooks/rules-of-hooks`만 끈다. src는 error 유지(`--print-config` 확인). 승인.

## 사용자 결정 필요
- 없음(14-7 용어·P3-1 목록은 기획 확인).
- 이미지 정책 U1~U5는 계속 미결이다. 업로더 투입 전에 정해야 한다.

## 커밋 대상 경로(13·14·리뷰 산출물)
- 코드:
  - `src/lib/content/schema.ts` · `src/lib/content/translation.ts` · `src/lib/i18n.ts` · `src/lib/floating-banner.ts` · `src/app/globals.css`
  - `src/components/{site-header,english-site-heading,page-frame,site-footer,floating-banner,feed-view,tag-nav,post-grid,post-card,card-media,pagination,post-detail,share-buttons,source-list}.tsx`
  - `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` · `src/app/(ko)/terms/page.tsx` · `src/app/(en)/en/terms/page.tsx` · `src/app/(ko)/tags/page.tsx`
  - `scripts/check-hotlinks.ts` · `scripts/validate-content.ts` · `package.json` · `eslint.config.mjs`
- 도구: `docs/tools/programmer-13/` · `docs/tools/programmer-14/` · `docs/tools/reviewer-31/`
- 핸드오프·트리거:
  - `docs/handoffs/programmer-13-card-image-schema-credit.md` · `docs/handoffs/programmer-14-responsive-redesign-implement.md`
  - `docs/triggers/programmer-13-card-image-schema-credit-COMPLETE.md` · `docs/triggers/programmer-14-responsive-redesign-implement-COMPLETE.md`
- 오더: `instructions/programmer/processed/13-card-image-schema-credit.md` · `instructions/programmer/processed/14-responsive-redesign-implement.md`
- 리뷰: `docs/reviews/programmer-13-14-image-responsive-review.md` · `docs/triggers/reviewer-31-programmer-13-14-image-responsive-review-COMPLETE.md` · `instructions/reviewer/processed/31-programmer-13-14-image-responsive-review.md`
- `history/2026-11-09.md`
- P1-1 수정분은 수정 오더 산출물을 더해 함께 커밋한다.
