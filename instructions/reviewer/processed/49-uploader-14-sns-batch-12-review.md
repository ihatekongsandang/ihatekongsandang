# 리뷰어 49 — 업로더 14 SNS 저장본 묶음 12 커밋 전 게이트 (건별)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 하위 에이전트(opus)
B(언론 사진 핫링크) 절차의 첫 실제 적용이라 10건을 건별로 본다.

## 선행 문서
- `docs/triggers/uploader-14-sns-image-batch-12-COMPLETE.md`, 오더 `instructions/uploader/processed/14-sns-image-batch-12.md`
- `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `content/README.md` §3.6

## 확인할 것
1. ② 2건(minkyuhan-dmz-delay-questions 한국경제 · yukdaejeon-nisi-nk-mine 서울신문, 둘 다 9/26 합참 제공 DMZ 장면): 이미지 직접 받아 보고 같은 사건·시점, 얼굴·글자·워터마크, src = 기사 og:image, sourcePageUrl ∈ sources[], caption·credit(원문 HTML 꺾쇠 크레딧 포함)·faceNote·영어 alt/caption. 그리고 ③ 8건의 근거 기사 og:image를 모두 직접 받아 놓친 ② 여부 확인 — 업로더가 열지 못한 2장(서울경제 404, 문화일보 0바이트)은 기사 본문 사진으로라도 확인.
2. guide §4-1 "판단 선례"와 리뷰어 38~48 기준 일관성, 업로더 트리거 기록 정확성. 같은 DMZ 장면을 쓰는 게시물이 5건이 되는데 피드에서 같은 사진이 반복되는 문제가 정책상 허용 범위인지 의견. 본문 "원문 …" 정리 5건이 지시어만 고친 것인지.
3. ③ 8건: ko·en image 관련 필드 완전 삭제, 남은 필드 없음. 단계 0 판정이 저장 이미지와 맞는지 HEAD 이미지를 `git show HEAD:public/images/<id>/thumb.jpg`로 꺼내 직접 확인.
4. 10건 모두(본문 정리 5건 제외 diff 0): 본문·frontmatter의 다른 변경 없음(diff), `public/images/<id>/` 삭제, 참조 0. 저장본 수 20 재현(`count-self-images.mjs`), `npm run validate:content`, `npm run check:hotlinks`.
5. 저장소 독립 grep(대상 경로 + 트리거·오더).

## 금지
git 쓰기·빌드·npm install·대상 수정 금지(지적만). 받은 이미지는 scratch/임시 폴더에만, 저장소에 넣지 않는다. 비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-49-uploader-14-sns-batch-12-review-COMPLETE.md`(건별 표 포함): 실제 모델 ID, 판정(건별 + 전체), 결함, 수치, 커밋 경로 목록(삭제 포함). 도구는 `docs/tools/reviewer-49/`(.ts는 typecheck·lint 통과해야 함, `any` 금지). 오더는 `processed/`로.
