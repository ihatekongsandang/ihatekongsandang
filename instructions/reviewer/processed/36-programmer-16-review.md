# 리뷰어 36 — 프로그래머 16 커밋 전 게이트 (C3·C4·C5 / C11)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-09 · 실행: 하위 에이전트(opus)

## 선행 문서
- `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md`, `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md`, `docs/tools/programmer-16/`
- 오더 `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`
- 기준: `docs/reviews/planner-16-q1-q2-plan-review.md` §2.4, `planning/q1-redirect-q2-sns-image-plan.md` §1·§2.2, `planning/v0.9-copy-and-code-list.md`, `docs/triggers/reviewer-34-1-planner-16-1-recheck-COMPLETE.md`

## 확인할 것
1. 커밋 단위 A 9개·B 8개 파일의 `git diff` 전부 읽기. A·B 겹침 0, 목록 밖 변경 없음(`content/posts*`·`public/` 변경 0).
2. C4 ko·en 소개 문구가 §2.4 / 계획 §2.2와 글자 그대로 같은지(스크립트 대조). 사실과 어긋나는 문장 없는지(현재 `kind: news` 0건 등). 약관 글자 변화 0.
3. C3: "주제" 통일 누락·과치환. URL·frontmatter `tags`·식별자 유지. 핸드오프 결정 1(/tags 문장 2개 추가 변경) 타당성.
4. C5: 결정 4(이동 경로 음수 margin) — 44px 터치 영역·겹침·포커스 표시 문제 없는지 코드로 판단.
5. C11: 308·Vercel 조건 밖·영어 분기·검증 a~h(+옛 이미지 폴더)·`ID_PATTERN` export·빈 목록일 때 리다이렉트 0. 리다이렉트 루프·체인·자기 자신 이동·retired-ids 충돌 방지 확인. README 절.
6. 가능하면 기존 `.next`로 `npx next start -p 3916`만 띄워 `/about`·`/en/about`·`/tags` 응답과 존재하지 않는 옛 주소 404를 curl로 확인(빌드 금지, 끝나면 서버 종료).
7. 저장소 독립 grep: 대상 17개 파일 + 도구·핸드오프·트리거.

## 금지
git 쓰기·`npm run build`·`next build`·npm install 금지. 코드 수정 금지(지적만). 저장소 독립·비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/reviews/programmer-16-review.md`(본문) + `docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md`: 실제 모델 ID, 판정, P1~P3, 확인한 수치, 커밋 A·B 경로 목록(도구·핸드오프·트리거·오더 포함). 도구는 `docs/tools/reviewer-36/`. 끝나면 이 오더를 `instructions/reviewer/processed/`로.
