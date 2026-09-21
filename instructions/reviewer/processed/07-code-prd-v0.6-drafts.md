# md오더: 리뷰어 (Fable 5.1) - 07-code-prd-v0.6-drafts

**작성일**: 2026-09-21 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 07
**세션**: 🔴 새 세션. **🔴 이 판정이 두 번째 배포 + 첫 실제 게시 게이트다.**
**범위 3개(한 보고서)**: A. 프로그래머 03 코드(작업트리 미커밋) · B. PRD v0.6 문서 · C. 슈퍼바이저 초안(게시 전 최종 확인)

---

## 자격·역할 (Required)
리뷰어 (Fable 5.1). 판정 권한. 산출물 직접 수정 금지. 대전제 + 🔴 저장소 독립 원칙 + 배포 도메인 접근 최소화(코드 검증은 로컬 빌드, 배포 도메인 curl은 최대 2회).

## 선행 검토 문서 (Required)
- `CLAUDE.md` 🔴 최신(라벨 폐지·단일 스키마·일반인 계정 게시 허용), `history/2026-09-21.md`
- A: `instructions/programmer/processed/03-statement-kind.md`(개정본) · `docs/handoffs/programmer-03-remove-status-label.md` · 코드 전체(`git status` 작업트리) · `docs/qa/programmer-03/` · 리뷰어 04 보고서 §7 제약·§6 권고(R4·R6 이월분)
- B: `instructions/planner/processed/06-prd-v0.6.md`(🔴 17:25 추가 절 포함 — 기획자 06은 17:20 완료라 **추가 절 미반영 가능성**) · `docs/handoffs/planner-06-prd-v0.6.md` · `planning/prd.md` v0.6 · 리뷰어 06 보고서 `docs/reviews/planner-05-prd-v0.5-review.md`(J1~J7·G·§7 중 라벨 무관 항목)
- C: `docs/supervisor/drafts/*.md`(v2 2건 + 있으면 3번째) · 프로그래머 03 핸드오프 "초안 2건 변환 frontmatter" · 리뷰어 06 §4 초안 판정(수정 지시 6+7건)

## 임무

### A. 코드 (프로그래머 03)
1. 재현: `npm ci` → validate/typecheck/lint/build, 로컬 프로덕션 4화면·라우트 회귀·헤더·og:image, 게이트 오류 7케이스 재현, 검증 메타태그 env 2상태, 렌더 HTML 라벨 문자열 잔존 0, 독립 grep.
2. 프로그래머 판단 항목 4건 판정: ① 카드에 날짜·유형 푸터를 남긴 것("제목+이미지만" 원안과 충돌?) ② `url` 유형 `sources` 0건 허용의 편집 정책 안전성 ③ 폐지 필드 오류 범위 ④ `/about`·`llms.txt` 문구의 단정 금지·소재 확장 정합.
3. 리뷰어 06 §7 제약 14항 중 라벨 무관 항목 코드 대조. R6 이월분 처리 여부.

### B. PRD v0.6
4. 삭제 절 목록 실재 확인(라벨·kind·closureReason·statusHistory 잔존 grep 0) · 단일 스키마 표 ↔ 코드 `schema.ts` 1:1 · §6 5단계가 라벨 없이 명예훼손 리스크를 낮추는 데 충분한가(리뷰어 06 추가 절 (a)(b)에 대한 판정을 여기서 내릴 것) · J1·J2(허용)·J4·J5·J6·J7·G 라벨 무관분 반영 여부(미반영이면 기획자 07 인계 목록) · 교차참조·독립 grep.

### C. 초안 게시 전 최종 확인 (🔴 게시 게이트)
5. 초안 v2 2건 + (있으면) 3번째가 리뷰어 06 §4 수정 지시를 전부 반영했는지 항목별 대조. 프로그래머 03 변환 frontmatter가 초안 v2와 일치하는지(변환은 v1 기준이었을 수 있음 — 차이 목록). 출처 URL 전부 직접 열어 원 매체·일자·인용 사실 재확인. 한국경제TV 방송사업자 여부 판정 또는 대체 출처 지시. 각 초안에 **"게시 가능 / 수정 후 가능 / 불가"** 판정 + 최종 frontmatter(리뷰어가 승인하는 버전)를 보고서에 전문 기재 — 슈퍼바이저는 그것을 그대로 게시한다.

### 판정
A·B·C 각각 승인/조건부/재작업. C는 초안별.

## 산출물
- `docs/reviews/programmer-03-remove-status-label-review.md`(A + C) · `docs/reviews/planner-06-prd-v0.6-review.md`(B) — 두 파일. 도구는 `docs/tools/reviewer-07/`.

## 핸드오프
`docs/handoffs/reviewer-07-code-prd-v0.6-drafts.md` · `docs/triggers/reviewer-07-code-prd-v0.6-drafts-COMPLETE.md`(🔴 필수) · processed/ · history

## 완료 보고 양식
```
📋 리뷰 완료 보고 — 리뷰어 (Fable 5.1) · 07-code-prd-v0.6-drafts
- A 코드 판정 · B PRD 판정 · C 초안별 판정(게시 가능 N/N)
- 재현 숫자 · 결함 · 권고 · 보고서 2개 경로
```
