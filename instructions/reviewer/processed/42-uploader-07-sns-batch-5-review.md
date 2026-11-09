# 리뷰어 42 — 업로더 07 SNS 저장본 묶음 5 커밋 전 게이트 (건별)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 하위 에이전트(opus)
B(언론 사진 핫링크) 절차의 첫 실제 적용이라 10건을 건별로 본다.

## 선행 문서
- `docs/triggers/uploader-07-sns-image-batch-5-COMPLETE.md`, 오더 `instructions/uploader/processed/07-sns-image-batch-5.md`
- `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `content/README.md` §3.6

## 확인할 것
1. ② 2건(hagonolza-opcon 파이낸셜뉴스 · 2pro-sign-removal 한국일보): 이미지 직접 받아 보고 같은 사건·시점, 얼굴·글자·워터마크, src = 기사 og:image, sourcePageUrl ∈ sources[], caption·credit·faceNote·영어 alt/caption. 그리고 ③ 8건의 근거 기사 og:image를 모두 직접 받아 놓친 ② 여부 확인.
2. guide §4-1 "판단 선례"와 리뷰어 38~41 기준 일관성. 업로더 트리거 불가 사유가 실제 이미지·본문과 맞는지(P2-1 세 번째 재발 여부 — 특히 계급·간판 글자). 업로더 요청: 같은 사건 사진에서 안쪽 인물(보좌진·직원·기자) 얼굴이 식별될 때 "원경"으로 허용할 범위 — 정책 §3·§5.3 근거로 기준 문안 제안.
3. ③ 9건: ko·en image 관련 필드 완전 삭제, 남은 필드 없음. 단계 0 판정이 저장 이미지와 맞는지 HEAD 이미지를 `git show HEAD:public/images/<id>/thumb.jpg`로 꺼내 직접 확인.
4. 10건 모두: 본문·frontmatter의 다른 변경 없음(diff), `public/images/<id>/` 삭제, 참조 0. 저장본 수 90 재현(`count-self-images.mjs`), `npm run validate:content`, `npm run check:hotlinks`.
5. 저장소 독립 grep(대상 경로 + 트리거·오더).

## 금지
git 쓰기·빌드·npm install·대상 수정 금지(지적만). 받은 이미지는 scratch/임시 폴더에만, 저장소에 넣지 않는다. 비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-42-uploader-07-sns-batch-5-review-COMPLETE.md`(건별 표 포함): 실제 모델 ID, 판정(건별 + 전체), 결함, 수치, 커밋 경로 목록(삭제 포함). 도구는 `docs/tools/reviewer-42/`(.ts는 typecheck·lint 통과해야 함, `any` 금지). 오더는 `processed/`로.
