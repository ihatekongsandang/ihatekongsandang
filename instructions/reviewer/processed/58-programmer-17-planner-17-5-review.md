# 리뷰어 58 — 프로그래머 17(소개 SNS 줄 삭제) + 기획자 17-5 검토

담당: 리뷰어(Opus 5.5) · 빌드 1회 허용(다른 창 빌드 없음 확인 후) · 커밋 금지

## 대상
- `docs/triggers/programmer-17-about-sns-stored-line-remove-COMPLETE.md`·핸드오프·`docs/tools/programmer-17/`, `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`
- `docs/triggers/planner-17-5-c4-followup-docs-COMPLETE.md`, `planning/q1-redirect-q2-sns-image-plan.md`, `planning/v0.9-copy-and-code-list.md`, `content/README.md` 195행

## 확인할 것
1. src diff가 SNS `<li>` 2개 삭제뿐인지(다른 글자 변화 0), 앞뒤 목록 구조·JSX 정상.
2. 저장본 0건이 사실인지: `content/` 전체에서 SNS 원 게시물 저장 이미지(caption "원문 …" + `/images/…`) 0건 재확인.
3. 기획 §2.2 문안 = 현재 화면 글자 그대로인지(ko·en), §3.4 ③ 상태, README 195행이 사실과 맞는지.
4. 방문자에게 보이는 다른 곳(약관·llms.txt·메타·안내문)에 "SNS 이미지 저장" 취지 문장 0.
5. 검증: typecheck·lint·`npm run build`·`/about`·`/en/about` 렌더(목록 4개, 옛 문구 0), `programmer-17/copy-exact-about.py` 재실행. 작업 트리에 업로더 19 미커밋 변경(content·public/images)이 섞여 있으니, 커밋은 경로를 나눠 할 수 있게 **이 오더 대상 경로만의 커밋 목록**을 따로 적는다.
6. 산출물에 다른 서비스명·계정·홈 절대경로·비공인 실명·옛 id 0.

## 🔴 금지
- git add·commit·push, src·설정 수정 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-58-programmer-17-review-COMPLETE.md` — 판정, P1~P3, 커밋 경로 목록, 검증 결과.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
