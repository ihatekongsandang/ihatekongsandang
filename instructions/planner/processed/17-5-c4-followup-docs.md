# 기획자 17-5 — C4 후속 문서 정리 (프로그래머 17 반영)

담당: 기획자(Sonnet) · 문서만 · 커밋 금지

## 배경
프로그래머 17이 소개 페이지 ko·en에서 SNS 저장 이미지 `<li>`를 지웠다(빌드·렌더 통과, 미커밋). 트리거: `docs/triggers/programmer-17-about-sns-stored-line-remove-COMPLETE.md` "미해결" 1·2.

## 할 일
1. `planning/q1-redirect-q2-sns-image-plan.md` §2.2 ko·en 확정 문안에서 SNS 줄을 빼고, 빼낸 줄은 "프로그래머 17(2026-11-10)로 삭제 — 저장본 0건" 기록으로 남긴다(문안 목록은 현재 화면과 글자 그대로 일치하게). §3.4 완료 조건 ③을 "오더 발행·실행(프로그래머 17), 커밋 대기"로 갱신. 문서 머리 변경 기록에 17-5 한 줄.
2. `content/README.md` 195행 "`self`(운영자 제작·SNS 원문 이미지 저장본)" — 저장본 0건 사실에 맞게 고친다(운영자 제작 카드). 다른 줄은 바꾸지 않는다.
3. `planning/v0.9-copy-and-code-list.md` 등 C4 문안을 옮겨 적은 다른 기획 문서가 있으면 grep으로 찾아 같은 표시만 한다.

## 🔴 금지
- `src/`·설정·`content/posts*` 수정 금지, git 쓰기 금지. 다른 서비스명·계정·홈 절대경로·비공인 실명·옛 id 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/planner-17-5-c4-followup-docs-COMPLETE.md` — 바꾼 파일:줄(전후), grep 결과.
- 끝나면 이 오더를 `instructions/planner/processed/`로 옮긴다.
