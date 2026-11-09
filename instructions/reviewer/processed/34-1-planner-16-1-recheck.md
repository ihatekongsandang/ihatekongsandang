# 리뷰어 34-1 — 기획자 16-1 재확인 (커밋 전 게이트)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-09 · 실행: 하위 에이전트(opus, 빌드 없음)

## 대상
- `docs/triggers/planner-16-1-review-34-fixes-q3a-COMPLETE.md`(먼저 읽기)
- `planning/q1-redirect-q2-sns-image-plan.md`, `planning/v0.9-copy-and-code-list.md`
- `docs/tools/planner-16/`(sns-image-batches.tsv, make-batches.mjs, batches-output.txt)
- 기준: `docs/reviews/planner-16-q1-q2-plan-review.md`(§2.4 정정 문안, P2-1~4, §8 P3)

## 확인할 것
1. P2-1: moved-ids 예시가 모두 주석인지.
2. P2-2·P2-3: 계획 §2.2·v0.9 §2.2 문안이 리뷰 §2.4와 글자 그대로 같은지(스크립트 대조). 영어 절 제목·남긴 줄이 사실과 어긋나지 않는지.
3. P2-4: 리뷰가 지목한 11건이 모두 묶음 1·2에 있는지 직접 대조. TSV 139행·id 139·묶음 합 139, 옛 TSV(git HEAD에 없으면 batches-output.txt·리뷰 도구 기록)와 id 집합 동일.
4. Q3=a 기록이 문서 전체에서 모순 없이 반영됐는지("사용자 확인 필요"로 남은 곳 없는지).
5. 저장소 독립 grep: 슈퍼바이저 커밋 게이트와 같은 패턴 + 홈 디렉터리명 + 옛 #1 id 문자열 → 대상 파일·트리거 0건.

## 금지
git·빌드·npm·코드 수정 금지. 대상 문서도 고치지 말고 지적만. 저장소 독립·비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-34-1-planner-16-1-recheck-COMPLETE.md`: 작성 세션·실제 모델 ID, 판정(승인/조건부/반려), P1~P3 결함, 확인한 사실(수치), 커밋 대상 경로. 리뷰 본문은 트리거에 함께 써도 된다. 도구는 `docs/tools/reviewer-34-1/`. 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
