# 리뷰어 40 — 업로더 05 SNS 저장본 묶음 3 커밋 전 게이트 (건별)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 하위 에이전트(opus)
B(언론 사진 핫링크) 절차의 첫 실제 적용이라 10건을 건별로 본다.

## 선행 문서
- `docs/triggers/uploader-05-sns-image-batch-3-COMPLETE.md`, 오더 `instructions/uploader/processed/05-sns-image-batch-3.md`
- `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `content/README.md` §3.6

## 확인할 것
1. ② 0건 — 업로더가 거른 후보 사진 중 쓸 수 있었던 것이 있는지 표본이 아니라 9건 모두 근거 기사 og:image를 직접 받아 확인(놓친 ② 여부). 특히 #2 계급 미확인 인물을 비공인으로 본 판단, 장관 사진 291px 판정.
2. guide §4-1 "판단 선례"와 리뷰어 38·39 기준에 맞는지. #9 본문 한 줄 수정(ko 53행·en 25행)이 사실 변경 없이 가리킬 대상만 고친 것인지, updatedAt 유지 타당성.
3. ③ 9건: ko·en image 관련 필드 완전 삭제, 남은 필드 없음. 단계 0 판정이 저장 이미지와 맞는지 HEAD 이미지를 `git show HEAD:public/images/<id>/thumb.jpg`로 꺼내 직접 확인.
4. 9건 모두: 본문·frontmatter의 다른 변경 없음(diff), `public/images/<id>/` 삭제, 참조 0. 저장본 수 110 재현(`count-self-images.mjs`), `npm run validate:content`, `npm run check:hotlinks`.
5. 저장소 독립 grep(대상 경로 + 트리거·오더 + `docs/poster/guide.md`).
6. 슈퍼바이저가 고친 `docs/poster/guide.md` §4-1 "판단 선례" 5줄·핫링크 HEAD 주의 1줄(git diff)이 리뷰어 38·39 트리거 결론과 맞는지.

## 금지
git 쓰기·빌드·npm install·대상 수정 금지(지적만). 받은 이미지는 scratch/임시 폴더에만, 저장소에 넣지 않는다. 비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-40-uploader-05-sns-batch-3-review-COMPLETE.md`(건별 표 포함): 실제 모델 ID, 판정(건별 + 전체), 결함, 수치, 커밋 경로 목록(삭제 포함). 도구는 `docs/tools/reviewer-40/`(.ts는 typecheck·lint 통과해야 함, `any` 금지). 오더는 `processed/`로.
