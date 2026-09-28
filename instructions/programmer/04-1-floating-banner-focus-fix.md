# md오더: 프로그래머 (Opus 5) - 04-1-floating-banner-focus-fix

**작성일**: 2026-09-28 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 04-1
**세션**: 04를 처리한 세션에서 이어서 해도 된다(새 세션도 가능).
**근거**: 리뷰어 08 판정 🟡 조건부 승인 — 확정 결함 D1. 수정·재실측 전 커밋 불가.

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 04 변경분(미커밋 작업 트리)에 리뷰어 08 결함·권고를 반영한다. 🔴 커밋 금지(리뷰어 재검증 후 슈퍼바이저). 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- `docs/reviews/programmer-04-floating-banner-review.md` (🔴 전문)
- `docs/handoffs/programmer-04-floating-banner.md`
- 리뷰어 도구: `docs/tools/reviewer-08/` (`review-qa.mjs focus` 등) · 증거 `docs/qa/reviewer-08/`

## 임무

### 1. D1 (필수) — 모바일 포커스 가림(WCAG 2.4.11) 해소
- `<1024px`에서 문서 스크롤 컨테이너(`html`)에 `scroll-padding-bottom: calc(5.5rem + env(safe-area-inset-bottom))`를 준다(푸터 여백과 같은 값).
- `FLOATING_BANNER.enabled`일 때만 적용한다 — 기존 `FLOATING_BANNER_GUTTER` 패턴과 같은 방식. `enabled:false`면 이 클래스도 HTML에 남지 않아야 한다.

### 2. R1 (필수) — 핸드오프 수치 정정
- 데스크톱 탭 높이 296px → 실측 256px, 헤더 겹침 한계 410px → 370px. 04 핸드오프를 고치지 말고 04-1 핸드오프에 정정 표로 적는다(04 핸드오프에는 "04-1에서 정정" 한 줄만 추가).

### 3. R2·R3 (진행) — 서버 컴포넌트 분리
- 배너 본체는 서버 컴포넌트로 렌더하고, GA 클릭 전송만 작은 클라이언트 컴포넌트로 분리(href는 props로 전달).
- 목표: `enabled:false` 빌드에서 배너 문구·주소가 클라이언트 JS 청크에 남지 않을 것, `config.ts` 전체가 클라이언트 청크에 들어가지 않을 것.
- 분리로 동작(클릭 이벤트 1건·키보드·포커스 링·CLS 0)이 바뀌면 안 된다.

### 4. 재실측 (전부 숫자로)
- validate · typecheck · lint · build
- 리뷰어 `review-qa.mjs focus` — 🔴 **완전 가림 0**(일부 가림 수도 기록)
- 04 `geometry` 8,079회 실패 0 · `behavior` 31/31 · `static-check on/off` 135/135(또는 게시물 증가 시 최신 수) · `ga` 3/3 · `contrast-check` 8/8
- `enabled:false` 빌드에서 클라이언트 JS 청크에 배너 문구·주소 grep 0
- 번들 크기(루트 layout 청크 gzip) 04 대비 변화
- 390px 캡처 재촬영(홈 top/bottom)
- 저장소 독립 grep 0

## 산출물 · 핸드오프
- 코드: `src/**` · 캡처 `docs/qa/programmer-04-1/` · 도구 수정 시 `docs/tools/programmer-04-1/`
- 핸드오프: `docs/handoffs/programmer-04-1-floating-banner-focus-fix.md` (변경 파일 표 · D1/R1/R2/R3 처리 결과 · 재실측 숫자 · 미해결)
- 🔴 트리거: `docs/triggers/programmer-04-1-floating-banner-focus-fix-COMPLETE.md` (필수)
- 이 오더를 `instructions/programmer/processed/`로 이동 · history 기록
- **커밋 금지**

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 04-1-floating-banner-focus-fix
- D1 focus 완전 가림 N→0 · R1 · R2/R3 · 재실측 숫자 · 미해결
```
