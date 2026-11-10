# 리뷰어 61 — 자체 제작 카드 묶음 2(업로더 22) 검토

담당: 리뷰어(Opus 5.5) · 빌드 없음(validate만) · 커밋 금지

## 대상
- `docs/triggers/poster-image-67-2-COMPLETE.md`, 작업 트리 변경(게시물 12개 ko·en, `public/images/` 12개 삭제), 시범 트리거 `docs/triggers/poster-image-67-1-COMPLETE.md` 보완분
- 기준: `instructions/uploader/processed/22-self-card-67-batch-2.md`, guide §4-1, 정책 §3·§5, 업로더 지침 단계 1~4·2-1, 묶음 게이트 체크 항목(지침 단계 4)

## 확인할 것 (12건 전수 — 샘플 금지)
1. ② 3건(#29·#31·#58): og:image를 직접 받아 원본으로 확인 — 사진 설명 원문, 4a, 제외 11항, 인물 3분류·원경(사람이 있으면 직접 잼), 공인 판정(§3.1, #58은 1a 북한 지도자 공식 일정·국영매체 사진의 사용 제한 표기·근거 언론 기사 이미지 여부), 의혹 사안 여부. `image` 필드·faceNote·caption·alt, en `imageAlt`·`imageCaption`, `license` 없음, 사진 기자 이름 0.
2. ③ 9건: 건마다 기록된 불가 사유 중 하나 이상을 원문 HTML·사진으로 직접 확인. 대체 카드 처리(이미지 필드·en 문구·옛 파일 삭제)가 선례와 같은지.
3. **0번 보완·정정**: 시범 트리거 1절의 #8·#17 정정 표시와 이번 실제 시도 기록이 맞는지(시범 때 "시도했다"는 기록이 사실이 아니었음 — 정정 문구가 명확한지).
4. 옛 자체 카드 12개 삭제 후 참조 없는 이미지 0·깨진 참조 0, 남은 자체 카드 50 재집계. 본문 "자체 제작" 문장, `updatedAt` 규칙, validate, 핫링크 200.
5. 산출물에 비공인 실명·사진 기자 이름·옛 id·다른 서비스명·홈 경로 0.

## 🔴 금지
- git 쓰기·빌드·`src/` 수정 금지. 받은 사진은 저장소 밖 임시 폴더에만.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-61-poster-image-67-2-review-COMPLETE.md` — 판정, 건별 확인 결과, P1~P3, 커밋 경로 목록, 다음 묶음 크기에 대한 의견(선택).
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
