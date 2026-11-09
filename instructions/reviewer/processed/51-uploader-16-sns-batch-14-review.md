# 리뷰어 51 — 업로더 16 SNS 저장본 묶음 14(마지막) + 비공인 실명 1건 커밋 전 게이트 (건별)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 하위 에이전트(opus)
B(언론 사진 핫링크) 절차의 첫 실제 적용이라 10건을 건별로 본다.

## 선행 문서
- `docs/triggers/uploader-16-sns-image-batch-14-COMPLETE.md`, 오더 `instructions/uploader/processed/16-sns-image-batch-14.md`
- `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `content/README.md` §3.6

## 확인할 것
1. ② 1건(kimsohee-ppp-seven-pledges 이투데이 9/8): 이미지 직접 받아 보고 같은 사건·시점, 얼굴·글자·워터마크, src = 기사 og:image, sourcePageUrl ∈ sources[], caption·credit(원문 HTML 꺾쇠 포함)·faceNote·영어 alt/caption·인명 표기. 그리고 ③ 9건의 근거 기사 og:image를 모두 직접 받아 놓친 ② 여부 확인.
2. guide §4-1 판단 선례와 리뷰어 38~50 기준 일관성, 업로더 트리거 기록 정확성. 🔴 추가 1 공익제보자 이니셜화(`2026-09-27-geonwoo-corporate-card-whistleblower` ko·en): ko·en·태그·출처 name·alt·caption 전체 실명(한글·로마자) 0 — git HEAD에서 실명을 확인해 대조만 하고 산출물에 쓰지 말 것. 사실 변경 없음(diff 전수). 영어 이니셜(C)과 ko 초성(ㅈ)이 다른 문제 — #1 게시물 선례(ㄱ씨 ↔ K)와 맞춰 판단. 대명사 제거·"after Lee took office" 수정이 뜻을 바꾸지 않았는지. 🔴 추가 2 완료 조건: SNS 원문 저장본 0, `public/images/` 참조 없는 파일 0 — 직접 재현. `.gitkeep` 처리 의견.
3. ③ 9건: ko·en image 관련 필드 완전 삭제, 남은 필드 없음. 단계 0 판정이 저장 이미지와 맞는지 HEAD 이미지를 `git show HEAD:public/images/<id>/thumb.jpg`로 꺼내 직접 확인.
4. 10건 + 추가 1건 모두(본문 정리 5건 제외 diff 0): 본문·frontmatter의 다른 변경 없음(diff), `public/images/<id>/` 삭제, 참조 0. 저장본 수 0 재현(`count-self-images.mjs`), `npm run validate:content`, `npm run check:hotlinks`.
5. 저장소 독립 grep(대상 경로 + 트리거·오더).

## 금지
git 쓰기·빌드·npm install·대상 수정 금지(지적만). 받은 이미지는 scratch/임시 폴더에만, 저장소에 넣지 않는다. 비공인 실명 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-51-uploader-16-sns-batch-14-review-COMPLETE.md`(건별 표 포함): 실제 모델 ID, 판정(건별 + 전체), 결함, 수치, 커밋 경로 목록(삭제 포함). 도구는 `docs/tools/reviewer-51/`(.ts는 typecheck·lint 통과해야 함, `any` 금지). 오더는 `processed/`로.
