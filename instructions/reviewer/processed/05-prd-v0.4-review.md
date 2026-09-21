# md오더: 리뷰어 (Fable 5.1) - 05-prd-v0.4-review

**작성일**: 2026-09-21 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 05
**세션**: 🔴 새 세션 — 리뷰어 03 판정값의 반영 결과 판정(이해충돌 회피). 리뷰어 04(코드)와 병행 가능, 서로 독립.
**범위**: PRD v0.4 문서만. 코드는 리뷰어 04.

---

## 자격·역할 (Required)
리뷰어 (Fable 5.1). PRD v0.4 게이트 판정. 산출물 직접 수정 금지. CLAUDE.md 대전제 + 🔴 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- `CLAUDE.md`(핵심 축 6·확정 결정 표 — "사진만 받은 경우" 행 추가됨), `docs/supervisor/photo-post-workflow.md`(신규 플레이북), `history/2026-09-21.md`
- 리뷰어 03 보고서 `docs/reviews/planner-03-prd-v0.3-review.md`(§2 M1~M4·§3·§4 Q1~Q6·§6 q1~q6·§9·§10)
- 기획자 04 오더 `instructions/planner/processed/04-prd-v0.4.md`
- 검토 대상: `planning/prd.md` v0.4 · `planning/user-questions.md` · `docs/handoffs/planner-04-prd-v0.4.md`
- 비교: `git diff HEAD -- planning/`

## 임무
1. **반영 대조 전수** — M1~M4(4)+Q1~Q6(6)+q1~q6(6) = **16항목** (a)위치 (b)충족 (c)신규 결함.
2. **🔴 §6① 5종 라벨 최종 배타성·완전성** — M2 택일(기소 정의 확장+병기)이 리뷰어 03 §3 12사례를 전부 덮는가. 새 정의로 오히려 생기는 모호 사례(예: 1심 무죄 → 검찰 항소 포기 = 종결? / 일부 유죄 + 일부 무죄 상소 중 = ?). "확정" 두 축 혼합(q2) 설명이 운영자가 값을 고를 수 있는 수준인가.
3. **M3 `closureReason`** — 요구사항이 프로그래머 구현 가능 수준인지(enum 값·부연 필드). ⚠️ 슈퍼바이저 결정: **M3는 PRD가 우선, 프로그래머 02가 코드 반영**(현재 코드는 자유 형식 note). 이 결정의 타당성도 판정.
4. **§6③ 실명 규칙 5단계 완전 매핑 + Q1(확정 판결에서만 실명)** — 헌법 27④와 정합, 공인 예외·얼굴 적용(q3) 모호성.
5. **신규 플레이북 정합** — `docs/supervisor/photo-post-workflow.md`가 PRD §5·§6과 충돌하는 곳이 있는지(특히 "보도 화면 캡처 = 전재" 이월 항목). PRD에 반영해야 할 규칙 목록 → 기획자 05 인계.
6. 교차참조·카테고리 잔존·저장소 독립 grep·핸드오프 형식.

판정: 승인 / 조건부 승인 / 재작업. 근거 파일·절·인용문. 대조 N/16.

## 산출물 (Required)
- `docs/reviews/planner-04-prd-v0.4-review.md` — 판정 + 16항목 표 + 라벨 사례 판정 + 기획자 05 인계 목록(플레이북 규칙화 포함)

## 핸드오프 (Required)
- `docs/handoffs/reviewer-05-prd-v0.4-review.md`
- `docs/triggers/reviewer-05-prd-v0.4-review-COMPLETE.md` — 🔴 반드시 생성
- 본 파일 → processed/, history 기록

## 완료 보고 양식
```
📋 리뷰 완료 보고 — 리뷰어 (Fable 5.1) · 05-prd-v0.4-review
- 판정 · 대조 N/16 · 결함 N · 권고 N · 라벨 사례 판정 · 기획자 05 인계 N건
- 보고서·핸드오프·트리거 경로
```
