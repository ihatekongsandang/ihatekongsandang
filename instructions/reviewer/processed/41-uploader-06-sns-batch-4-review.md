# 리뷰어 41 — 업로더 06 SNS 저장본 묶음 4 커밋 전 게이트 (건별)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 하위 에이전트(opus)
B(언론 사진 핫링크) 절차의 첫 실제 적용이라 10건을 건별로 본다.

## 선행 문서
- `docs/triggers/uploader-06-sns-image-batch-4-COMPLETE.md`, 오더 `instructions/uploader/processed/06-sns-image-batch-4.md`
- `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `content/README.md` §3.6

## 확인할 것
1. ② 1건(pagememo-jcs-interim-result 동아일보): 이미지 직접 받아 보고 같은 사건·시점, 얼굴·글자·워터마크, src = 기사 og:image, sourcePageUrl ∈ sources[], caption·credit·faceNote·영어 alt/caption. 그리고 ③ 9건의 근거 기사 og:image를 모두 직접 받아 놓친 ② 여부 확인.
2. guide §4-1 "판단 선례"와 리뷰어 38·39·40 기준 일관성. 업로더 트리거 불가 사유가 실제 이미지와 맞는지(리뷰 40 P2-1 재발 여부). 업로더 참고: 직위(합참 차장)만 있고 계급 표기가 없는 인물 — 법령상 장성급 직위면 공인으로 볼 수 있는지 정책 §3.1 기준 판단(기준 제안만, 이번 결과는 그대로 두어도 되는지).
3. ③ 9건: ko·en image 관련 필드 완전 삭제, 남은 필드 없음. 단계 0 판정이 저장 이미지와 맞는지 HEAD 이미지를 `git show HEAD:public/images/<id>/thumb.jpg`로 꺼내 직접 확인.
4. 10건 모두: 본문·frontmatter의 다른 변경 없음(diff), `public/images/<id>/` 삭제, 참조 0. 저장본 수 100 재현(`count-self-images.mjs`), `npm run validate:content`, `npm run check:hotlinks`.
5. 저장소 독립 grep(대상 경로 + 트리거·오더).

## 금지
git 쓰기·빌드·npm install·대상 수정 금지(지적만). 받은 이미지는 scratch/임시 폴더에만, 저장소에 넣지 않는다. 비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-41-uploader-06-sns-batch-4-review-COMPLETE.md`(건별 표 포함): 실제 모델 ID, 판정(건별 + 전체), 결함, 수치, 커밋 경로 목록(삭제 포함). 도구는 `docs/tools/reviewer-41/`(.ts는 typecheck·lint 통과해야 함, `any` 금지). 오더는 `processed/`로.
