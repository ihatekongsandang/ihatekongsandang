# md오더: 기획자 (Sonnet 5) - 06-prd-v0.6

**작성일**: 2026-09-21 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 06
**세션**: 05를 처리한 세션에서 이어서 해도 된다.

---

## 자격·역할 (Required)
기획자 (Sonnet 5). 사용자 결정 **"사건 상태 라벨 폐지"** 를 PRD v0.6에 반영 — 단일 게시물 스키마로 단순화. 권한 밖·대전제·저장소 독립 원칙 동일.

## 선행 검토 문서 (Required)
- `CLAUDE.md` 🔴 개정본(확정 결정 표 "상태 라벨 폐지·단일 스키마", 핵심 축 6 개정)
- `planning/prd.md` v0.5, `docs/handoffs/planner-05-prd-v0.5.md`
- `instructions/programmer/03-statement-kind.md`(개정본 — 프로그래머가 구현 중인 스키마와 정합 유지)
- `docs/reviews/planner-04-prd-v0.4-review.md` K1(공인 예외 지위 기준 — 라벨 무관하므로 유지)
- 리뷰어 06 보고서가 나와 있으면(`docs/triggers/reviewer-06-*`) (a)(b) 판정 반영

## 임무 — PRD v0.6
1. **삭제**: §3.1 상태 라벨·`courtLevel`·`closureReason`·`closureNote`·`priorVerdict`·`statusHistory[]` 행, §3.4 `kind` 2원화 전체, §4.4 배지 체계, §6①(라벨 표·M2 택일·복수 인물 규칙 중 라벨 의존부)·§6③의 라벨 단계 매핑·§6⑥(상태 전이 규칙) 전체, §9·§11 DoD의 라벨 언급. 버전 이력에 "사용자 지시로 라벨 폐지" 명기.
2. **단일 스키마** (§3): 필수 `id`·`title`·`description`·`publishedAt`·`sourceType`·출처 표기 / 유형별 필드 / `sources[]` 선택(url 유형은 `sourceUrl` 있으면 0건 허용, photo·photo_text는 최소 1건) / 선택 `speaker`·`tags`·`image`·`useSourceImage`(false). 카드 = 제목+이미지만. 상세 = 요약·원문 링크·출처 목록("배경 보도")·발언자·태그·"원문 제목/요약(출처 인용)" 라벨.
3. **§6 재구성**: ① 허용 출처(§6② 유지) ② 인용문 표기·단정 금지(§6④ 유지·강화 — 라벨이 없으므로 요약 문장이 사실 확인 단계를 담아야 함: "~로 보도됨 / ~로 기소된 것으로 보도됨 / ~ 무죄 판결을 받은 것으로 보도됨" 예시 표) ③ 실명·얼굴 규칙을 라벨 없이 재정의(공인=지위 기준 실명·얼굴 언론 표기 따름 / 비공인=운영자 문구 이니셜·얼굴 비노출·`useSourceImage=false`) ④ 정정·삭제 요청 절차(유지, "라벨 변경" 문구 제거 → "요약·출처 수정/비공개") ⑤ 사건 진행 시 갱신: 라벨 대신 **요약 문장·출처 갱신 + 상세에 갱신 이력 한 줄**.
4. §5.2 사진만 전달·§5.4 SNS 인용은 유지. §0.5 확정 표·미결 표 정리. `user-questions.md` 갱신(라벨 관련 항목 종결).
5. 핸드오프에 "삭제 절 목록"과 "프로그래머 03 스키마와 대조표".

## 산출물·핸드오프
`planning/prd.md` v0.6 · `planning/user-questions.md` / `docs/handoffs/planner-06-prd-v0.6.md` · `docs/triggers/planner-06-prd-v0.6-COMPLETE.md`(🔴 필수) · processed/ · history

## 완료 보고 양식
```
📋 작업 완료 보고 — 기획자 (Sonnet 5) · 06-prd-v0.6
- 삭제 절 목록 · 단일 스키마 표 · §6 재구성 요약 · 프로그래머 03 대조 · 미해결
```
