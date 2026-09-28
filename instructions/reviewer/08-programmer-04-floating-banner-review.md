# md오더: 리뷰어 (Opus 5.5) - 08-programmer-04-floating-banner-review

**작성일**: 2026-09-28 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 08
**세션**: 새 세션.
**검토 대상**: 프로그래머 04 — 전 페이지 우측 플로팅 배너(외부 캠페인 링크). 🔴 이 판정 전에 커밋·배포하지 않는다.

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5). 프로그래머 04 변경분의 코드 품질·접근성·레이아웃 회귀·보안을 **실측으로** 판정한다. 결함은 확정/권고로 나누고, 확정 결함이 있으면 수정 오더가 필요하다고 명시한다. 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- `CLAUDE.md` · `PROJECT_STATUS.md` · `history/2026-09-28.md`
- 오더: `instructions/programmer/processed/04-floating-banner.md`
- 핸드오프: `docs/handoffs/programmer-04-floating-banner.md` (🔴 개정 — 사용자 지시로 닫기 버튼 제거. 오더 §1의 닫기 사양은 폐기됐다. 이 점은 결함으로 보지 않는다)
- 변경 코드(미커밋 작업 트리): `src/lib/config.ts` · `src/lib/floating-banner.ts` · `src/components/floating-banner.tsx` · `src/lib/analytics.ts` · `src/app/layout.tsx` · `src/components/site-footer.tsx`
- 측정 도구: `docs/tools/programmer-04/` · 캡처: `docs/qa/programmer-04/`

## 사용자 확정 사항 (판정 대상 아님)
- 배너를 건다는 결정 자체, 링크 대상, 문구 "이재명 재판재개 촉구 국민 서명운동 / 외부 사이트로 이동합니다", 닫기 버튼 없음.
  → 정책 적합성 의견은 "참고"로만 적고 결함으로 올리지 않는다.

## 검토 항목
1. **빌드 게이트**: validate · typecheck · lint · build 직접 재실행, 숫자 기록.
2. **링크 속성**: 정적 HTML 전수에서 href(https·추적 파라미터 없음)·`target`·`rel="noopener nofollow"` 재확인 (`static-check.mjs on`).
3. **`enabled:false` 경로**: 배너·여백 클래스가 함께 사라지는지 (`static-check.mjs off` 또는 동등 방법). 확인 후 원복·diff 0 확인.
4. **레이아웃 회귀**: 320·390·768·1023·1024·1100·1231·1232·1280·1440 폭에서 본문·페이지네이션·푸터와 겹침, 가로 스크롤, CLS. 프로그래머 기하 검사 기준(가로 비겹침)이 타당한지 판단.
5. **접근성**: 랜드마크·링크 이름(WCAG 2.5.3)·키보드 순서·포커스 표시 대비. 🔴 핸드오프 미해결 3 **포커스 가림(WCAG 2.4.11)** 을 모바일 폭에서 실측하고, 결함이면 보완 방향(예: `scroll-padding-bottom`)을 제시.
6. **보안·성능**: 외부 요청 추가 여부, CSP(`vercel.json`) 영향, 클라이언트 번들 증가.
7. **GA 이벤트**: `floating_banner_click` 1회 전송, GA 미설정 시 무오류.
8. **저장소 독립 grep**: 변경 파일·도구·캡처·핸드오프 0건.

## 산출물 · 핸드오프
- 리뷰 보고서: `docs/reviews/programmer-04-floating-banner-review.md` (판정: 승인 / 조건부 승인 / 반려 + 확정 결함 표 + 권고 표 + 재실측 숫자)
- 🔴 트리거: `docs/triggers/reviewer-08-programmer-04-floating-banner-review-COMPLETE.md` (필수)
- 이 오더를 `instructions/reviewer/processed/`로 이동 · history 기록
- 코드 수정 금지(판정만).

## 완료 보고 양식
```
📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 08-programmer-04-floating-banner-review
- 판정 · 확정 결함 N · 권고 N · 재실측 숫자 · 커밋 가능 여부
```
