# 리뷰어 36-1 — 프로그래머 16-1 재확인 (커밋 B 전 게이트)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-09 · 실행: 하위 에이전트(opus)

## 선행 문서
- `docs/reviews/programmer-16-review.md`, `docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md`
- `docs/triggers/programmer-16-1-review-36-fixes-COMPLETE.md`, `docs/handoffs/programmer-16-1-review-36-fixes.md`, `docs/tools/programmer-16-1/`
- 오더 `instructions/programmer/processed/16-1-review-36-fixes.md`

## 확인할 것
1. 커밋 B 8개 파일 diff 전체(HEAD 6f0f941 대비). P2-1(f는 frontmatter id만)·P3-1(0건이면 영어본 미독, YAML 오류에 파일명, gray-matter 캐시 회피)·P3-3·P3-4 반영 확인. 새 회귀 없는지.
2. 단위·돌연변이 시험을 직접 다시 돌려 수치 재현(빌드 금지라 빌드 실패·픽스처·Vercel 시험은 출력 파일만 읽음). typecheck·lint 직접.
3. 리뷰 36 재현 시험(`docs/tools/reviewer-36/`)을 다시 돌려 P2-1 재현이 PASS로 바뀌었는지.
4. programmer-16 도구 3개 수정이 시험의 뜻을 바꾸지 않았는지.
5. 저장소 독립 grep: 커밋 B 경로 목록 전체(트리거 40행 이하) + 이 리뷰 산출물.

## 금지
git 쓰기·`npm run build`·`next build`·npm install 금지. 코드 수정 금지. 저장소 독립·비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-36-1-programmer-16-1-recheck-COMPLETE.md`: 실제 모델 ID, 판정, 결함, 수치, 커밋 B 경로 확정 목록. 도구는 `docs/tools/reviewer-36-1/`. 오더는 `processed/`로.
