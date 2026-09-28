# md오더: 리뷰어 (Opus 5.5) - 09-programmer-04-1-recheck

**작성일**: 2026-09-28 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 09
**세션**: 08을 처리한 세션에서 이어서 해도 된다(새 세션도 가능).
**검토 대상**: 프로그래머 04-1 — 리뷰어 08 D1(포커스 가림) 수정 + R1·R2·R3 반영. 🔴 이 판정 전에 커밋·배포하지 않는다.

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5). 04-1 수정분이 D1을 해소했는지, 서버 컴포넌트 분리(R2·R3)로 회귀가 없는지 **실측으로** 재검증한다. 코드 수정 금지. 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- 본인 보고서: `docs/reviews/programmer-04-floating-banner-review.md`
- 핸드오프: `docs/handoffs/programmer-04-1-floating-banner-focus-fix.md` (및 04 핸드오프의 "04-1에서 정정" 표기)
- 변경 코드(미커밋): `src/lib/floating-banner.ts` · `src/app/layout.tsx` · `src/components/floating-banner.tsx` · `src/components/floating-banner-link.tsx`(신규) — 04 변경분 전체 포함 최종 상태
- 도구: `docs/tools/reviewer-08/` · `docs/tools/programmer-04-1/` · 증거 `docs/qa/programmer-04-1/`

## 검토 항목
1. **D1 재측정**: `review-qa.mjs focus` 전수 — 완전 가림 0 확인(일부 가림 수도 기록). `enabled:false`일 때 `<html>`에 scroll-padding 클래스가 남지 않는지.
2. **R2·R3**: on/off 빌드 모두 클라이언트 JS 청크에 배너 문구·주소 0, `config.ts`가 배너 경로로 클라이언트에 실리지 않는지, 번들 크기 변화.
3. **서버/클라이언트 분리 회귀**: 링크 속성(href·target·rel·aria-label) 135/135, GA 클릭·Enter 1건, 키보드 순서·포커스 링, CLS 0, 하이드레이션 경고 0.
4. **빌드 게이트**: validate · typecheck · lint · build.
5. **geometry** 8,079회 실패 0 재확인(또는 표본이 아닌 동일 전수).
6. **R1 정정 수치** 확인.
7. **저장소 독립 grep** 0.

## 산출물 · 핸드오프
- 리뷰 보고서: `docs/reviews/programmer-04-1-floating-banner-focus-fix-review.md` (판정 + 재실측 숫자 + 커밋 가능 여부)
- 🔴 트리거: `docs/triggers/reviewer-09-programmer-04-1-recheck-COMPLETE.md` (필수)
- 이 오더를 `instructions/reviewer/processed/`로 이동 · history 기록

## 완료 보고 양식
```
📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 09-programmer-04-1-recheck
- 판정 · D1 재측정 · 회귀 결과 · 커밋 가능 여부
```
