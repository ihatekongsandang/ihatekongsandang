# 리뷰어 53 — 기획자 17 정책 개정 검증 (원경 b안 · 특검 공인 · 후속 정리)

담당: 리뷰어 (Opus, 하위 에이전트) · 빌드 없음 · 문서 리뷰만

## 검증 대상
- 기획자 17 오더: `instructions/planner/processed/17-wongyeong-b-special-prosecutor-policy.md`
- 트리거: `docs/triggers/planner-17-wongyeong-b-special-prosecutor-policy-COMPLETE.md`
- 바뀐 파일: `planning/card-image-policy.md`, `planning/card-image-uploader-steps.md`, `planning/prd.md`, `planning/q1-redirect-q2-sns-image-plan.md` (`git diff -- planning/`로 전체 변경 확인)
- 기준: 리뷰어 42 제안 `docs/triggers/reviewer-42-uploader-07-sns-batch-5-review-COMPLETE.md` "원경 허용 기준 제안" 1~6항, 사용자 결정(원경 b안 채택·특별검사·특별검사보 공인, 2026-11-10)

## 확인할 것
1. 오더 할 일 1~4 전부 반영됐는지(항목별 ✅/❌).
2. 리뷰 42 제안 1~6항이 뜻을 바꾸지 않고 옮겨졌는지. 특히 경계 ±1%p 처리(결과적으로 4% 미만만 허용)가 정책 §3.3·§3.4·§5.3-2·uploader-steps에서 같은 말로 일관되게 적혔는지.
3. 정책 안에 남은 충돌: 원경·뒷모습·흐림 허용 vs 직위 미확인 인물 불가(§5.3-9) — 다른 절(§0·§2·§3.4·§4·§6·§7)에 옛 문구가 남아 서로 어긋나지 않는지 전체 grep.
4. 특별검사 행: 근거 법률명·조문을 `mcp__korean-law__search_law`·`get_law_text`(ToolSearch로 불러 쓰기)로 실제 확인해 정확한 법률명을 제시. 정책 §11 "확인 필요"로 남긴 항목을 해결할 수 있으면 문안 제안.
5. §3.1-1 인사청문 후보자 문장의 "기획자 해석" 부분이 사용자 결정·기존 guide §4-1 선례(보수 처리)와 충돌하지 않는지.
6. §3.6 "결과가 보도된 재판" 행이 리뷰 44 사례(확정 보도 미확인 시 "확정" 금지)와 맞는지.
7. 대체 카드 재검토 추정(③ 117건, 얼굴·신원 사유만 약 8건): 트리거 표의 8건을 업로더 트리거 원문과 대조해 표본이 아니라 117건 전부에서 셌는지, 빠진 건이 없는지 직접 다시 센다.
8. 트리거가 제안한 guide §4-1 반영 문안 7건의 타당성(슈퍼바이저가 반영할지 판단용).
9. 저장소 독립 grep(다른 서비스명·계정·홈 절대경로)·비공인 실명·기자 바이라인 0건.

## 🔴 금지
- git add·commit·push·rm·checkout 금지. 파일 수정 금지(산출물 제외). 빌드 금지.
- 비공인 실명·다른 서비스명·계정명·홈 디렉터리 절대경로를 산출물에 쓰지 않는다. 도구가 필요하면 `.mjs`로 `docs/tools/reviewer-53/`.
- 같은 시각 리뷰어 52가 `content/`·문서 실명 검사 중 — 그 작업과 겹치는 실명 검사는 하지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-53-planner-17-policy-review-COMPLETE.md` — 판정(통과/조건부/반려), 결함 P1·P2·P3(파일:줄, 고칠 문안), 7번 재집계 결과, 8번 반영 권장 여부.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
