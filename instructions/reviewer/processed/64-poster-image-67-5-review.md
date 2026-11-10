# 리뷰어 64 — 자체 제작 카드 마무리 묶음 5(업로더 25) 검토

담당: 리뷰어(Opus 5.5) · 빌드 없음(validate만) · 커밋 금지

## 대상
- `docs/triggers/poster-image-67-5-COMPLETE.md`, 작업 트리 변경(게시물 29개 ko·en, `public/images/` 29개 삭제)
- 기준: `instructions/uploader/processed/25-self-card-67-batch-5-final.md`, guide §4-1, 정책 §3·§5, 업로더 지침 단계 1~4·2-1, 묶음 게이트 체크 항목(지침 단계 4)

## 확인할 것 (29건 전수 — 샘플 금지)
1. B 6건(#32·#33·#36·#37·#42·#56) ③: 건마다 불가 사유 하나 이상을 원문·사진으로 직접 확인, 지난 묶음 선례 4개 준수.
2. 이미지 없음 23건 일괄 ③: 23건 각각이 tsv `없음`·`없음(권고)`·지침 단계 1 이미지 없음(#48)·tsv 밖 1건인지 대조(목록 전수). #1·#67 지침 점검 결과와 1~3차 실명 정리와 충돌 없는지.
3. 처리 방식 전수: ko `image` 블록 삭제, en `imageAlt`·`imageCaption` 삭제, 옛 파일 삭제, 본문 "자체 제작 카드" 문장 0, `updatedAt` 규칙. 다른 필드·본문이 실수로 지워지지 않았는지(diff 줄 수 대조).
4. **마무리**: `content/posts*`에서 `image.src`가 `/images/…`인 게시물 0, `public/images/`에 `.gitkeep` 외 파일 0, 깨진 참조 0, validate(self 0 · news 33).
5. **사이트 문구 영향**(보고만): 자체 카드 0이 되어 사실과 달라지는 방문자 문구(소개 ko·en "일부 글은 … 만든 카드 이미지를 씁니다", 약관·안내문·llms.txt 등)와 내부 문서(README·정책·기획 §3.4 완료 조건)의 위치를 grep으로 찾아 목록화.
6. 산출물에 비공인 실명·사진 기자 이름·옛 id·다른 서비스명·홈 경로 0.

## 🔴 금지
- git 쓰기·빌드·`src/` 수정 금지. 받은 사진은 저장소 밖 임시 폴더에만.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-64-poster-image-67-5-review-COMPLETE.md` — 판정, 건별 확인 결과, P1~P3, 커밋 경로 목록, 다음 묶음 크기에 대한 의견(선택).
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
