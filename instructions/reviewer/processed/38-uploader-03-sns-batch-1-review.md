# 리뷰어 38 — 업로더 03 SNS 저장본 묶음 1 커밋 전 게이트 (건별)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 하위 에이전트(opus)
B(언론 사진 핫링크) 절차의 첫 실제 적용이라 10건을 건별로 본다.

## 선행 문서
- `docs/triggers/uploader-03-sns-image-batch-1-COMPLETE.md`, 오더 `instructions/uploader/processed/03-sns-image-batch-1.md`
- `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `content/README.md` §3.6

## 확인할 것
1. ② 3건(minkyuhan·issue365·facteye): 이미지 URL을 직접 받아(curl, 200·image/*) 내려받아 **직접 보고** — 같은 사건·시점, 얼굴이 공인의 공적 활동인지, 자막·로고·워터마크, 비공인·미성년자 얼굴 없음. `sourcePageUrl`이 `sources[]`의 그 기사이고 기사 페이지 og:image와 같은지. caption·creditName(사진 원 저작자 표기 포함)·creditNameEn·faceNote·retrievedAt 형식, 영어 imageAlt·imageCaption 정확성·단정 표현 없음.
2. 업로더 판단 요청: (가) #1 pagememo ③ 판단 타당성 (나) #9 facteye 9/26 조사 장면 vs 9/28 브리핑 — 같은 사건으로 볼지.
3. ③ 7건: ko·en image 관련 필드 완전 삭제, 남은 필드 없음. 단계 0 판정(비공인 얼굴 2건)이 저장 이미지와 맞는지 HEAD 이미지를 `git show HEAD:public/images/<id>/thumb.jpg`로 꺼내 직접 확인.
4. 10건 모두: 본문·frontmatter의 다른 변경 없음(diff), `public/images/<id>/` 삭제, 참조 0. 저장본 수 129 재현(`count-self-images.mjs`), `npm run validate:content`, `npm run check:hotlinks`.
5. 저장소 독립 grep(대상 경로 + 트리거·오더).

## 금지
git 쓰기·빌드·npm install·대상 수정 금지(지적만). 받은 이미지는 scratch/임시 폴더에만, 저장소에 넣지 않는다. 비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-38-uploader-03-sns-batch-1-review-COMPLETE.md`(건별 표 포함): 실제 모델 ID, 판정(건별 + 전체), 결함, 수치, 커밋 경로 목록(삭제 포함). 도구는 `docs/tools/reviewer-38/`(.ts는 typecheck·lint 통과해야 함, `any` 금지). 오더는 `processed/`로.
