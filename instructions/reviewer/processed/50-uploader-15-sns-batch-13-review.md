# 리뷰어 50 — 업로더 15 SNS 저장본 묶음 13 커밋 전 게이트 (건별)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 하위 에이전트(opus)
B(언론 사진 핫링크) 절차의 첫 실제 적용이라 10건을 건별로 본다.

## 선행 문서
- `docs/triggers/uploader-15-sns-image-batch-13-COMPLETE.md`, 오더 `instructions/uploader/processed/15-sns-image-batch-13.md`
- `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `content/README.md` §3.6

## 확인할 것
1. ② 1건(yuyongweon-mdl-disclosure 경인일보 9/21): 이미지 직접 받아 보고 같은 사건·시점, 얼굴·글자·워터마크, src = 기사 og:image, sourcePageUrl ∈ sources[], caption·credit(원문 HTML 꺾쇠 포함)·faceNote·영어 alt/caption. 🔴 수어 통역사 정면 얼굴을 3b(공식 행사 통역)로 허용한 판단 — 기자회견 수어 통역이 3b 범위인지, 이전 묶음(국회방송 수어 통역 캡처 불가)과 일관한지. 그리고 ③ 9건의 근거 기사 og:image를 모두 직접 받아 놓친 ② 여부 확인.
2. guide §4-1 "판단 선례"(같은 장면 3건 규칙 포함)와 리뷰어 38~49 기준 일관성, 업로더 트리거 기록 정확성. 업로더 확인 요청: 특별검사가 정책 §3.1 공인 범위표에 없는 문제 — 공수처법 등 앵커 법령으로 판단 근거 제안. 본문 "원문 썸네일" 정리 3건이 지시어만 고친 것인지.
3. ③ 9건: ko·en image 관련 필드 완전 삭제, 남은 필드 없음. 단계 0 판정이 저장 이미지와 맞는지 HEAD 이미지를 `git show HEAD:public/images/<id>/thumb.jpg`로 꺼내 직접 확인.
4. 10건 모두(본문 정리 5건 제외 diff 0): 본문·frontmatter의 다른 변경 없음(diff), `public/images/<id>/` 삭제, 참조 0. 저장본 수 10 재현(`count-self-images.mjs`), `npm run validate:content`, `npm run check:hotlinks`.
5. 저장소 독립 grep(대상 경로 + 트리거·오더).

## 금지
git 쓰기·빌드·npm install·대상 수정 금지(지적만). 받은 이미지는 scratch/임시 폴더에만, 저장소에 넣지 않는다. 비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-50-uploader-15-sns-batch-13-review-COMPLETE.md`(건별 표 포함): 실제 모델 ID, 판정(건별 + 전체), 결함, 수치, 커밋 경로 목록(삭제 포함). 도구는 `docs/tools/reviewer-50/`(.ts는 typecheck·lint 통과해야 함, `any` 금지). 오더는 `processed/`로.
