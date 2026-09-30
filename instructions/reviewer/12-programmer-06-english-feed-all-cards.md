# md오더: 리뷰어 (Opus 5.5) - 12-programmer-06-english-feed-all-cards

**작성일**: 2026-09-30 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 12
**세션**: 새 세션 권장.
**대상**: 프로그래머 06 — 영어 피드 전체 카드 노출 + 리뷰 11 후속(P2-A·B·C) (미커밋 작업 트리)

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5). 프로그래머 06 변경분을 코드 리뷰하고 직접 재실측해 **승인 / 조건부 승인 / 반려**를 판정한다. 코드 직접 수정 금지 · 🔴 커밋 금지. 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- 오더: `instructions/programmer/processed/06-english-feed-all-cards.md`
- 핸드오프: `docs/handoffs/programmer-06-english-feed-all-cards.md` (재실측 명령·미해결 1~6)
- 트리거: `docs/triggers/programmer-06-english-feed-all-cards-COMPLETE.md`
- 이전 리뷰: `docs/reviews/programmer-05-english-pages-review.md`, `docs/reviews/programmer-05-1-english-pages-fix-review.md`
- 캡처: `docs/qa/programmer-06/`

## 임무

### 1. 재실측 (핸드오프 §다음 세션 가이드 명령 기준, 숫자를 직접 확인)
- validate · typecheck · lint · build — 정적 380 → 390(영어 피드 2~11페이지) 대조
- 한국어·404 HTML 전수 동일(364/364) · RSC/엄격 비교(차이가 `en.html`뿐인지)
- 피드 대조(`feed-parity`): 영어 피드 전체 페이지의 카드 수·순서·링크가 한국어 피드와 일치, 영어본 있는 글 → `/en/post/…`, 없는 글 → `/post/…`
- `static-i18n` 전수 · `en-qa checks` · GA 스크래치 검사 · 404 렌더 · 규칙 검사
- 커버리지는 숫자로(검사 수 = 전체 규모 대조). 샘플 갈음 금지.

### 2. 코드 리뷰 중점
- `Korean only` 카드 접근성: 링크 `lang`·`hrefLang`, 이미지 alt `lang`, 배지 위치·명도 대비, 스크린리더 읽기 순서
- JSON-LD ItemList URL 규칙(영어본 없는 글 → `/post/{id}`)
- 한국어 출력 불변(HTML·RSC)
- P2-A·P2-B 경고 규칙과 문구, P2-C 그룹 404 robots 한 가지로 정리됐는지
- 확정 문구 `Posts marked "Korean only" have not been translated yet and open in Korean.` 글자 그대로인지
- 핸드오프 미해결 1(`/_next/image` 멈춤 재현) — 판단과 테스터 권고 여부
- 독립 grep 0건

## 산출물 · 핸드오프
- 리뷰: `docs/reviews/programmer-06-english-feed-all-cards-review.md` (판정 · 재실측 숫자 · 지적사항 P0~P2 · 커밋 대상 파일 목록)
- 필요 시 도구: `docs/tools/reviewer-12/`
- 🔴 트리거: `docs/triggers/reviewer-12-programmer-06-english-feed-all-cards-COMPLETE.md` (필수)
- 이 오더를 `instructions/reviewer/processed/`로 이동 · history 기록
- **커밋 금지**

## 완료 보고 양식
```
📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 12-programmer-06-english-feed-all-cards
- 판정 · 재실측 숫자 · 지적사항(P0/P1/P2) · 후속 과제
```
