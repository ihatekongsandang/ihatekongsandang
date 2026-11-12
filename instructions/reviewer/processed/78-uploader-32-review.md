# 리뷰 78 — 업로더 32(리뷰 77 후속 정리) 검토

담당: 반공-리뷰어 · 빌드 없음(`npm run validate:content`만 허용) · 수정·커밋 금지

## 대상
- `docs/triggers/uploader-32-review-77-followups-COMPLETE.md` §6 경로(콘텐츠 ko·en 4개)
- 오더 `instructions/uploader/processed/32-review-77-followups.md`, 리뷰 77 트리거 P3-1·2·5·6

## 점검
1. shindawit caption이 리뷰 77 수정안과 같고 형식 경고가 없는지, `updatedAt`이 바뀌지 않았는지.
2. firstincome alt(ko·en)가 사진과 맞는지(사진을 Read로 연다).
3. issueradar ❌와 idaenamright 되돌림이 타당한지. 파일 변경이 0인지 확인한다.
4. validate R=0·경고 22, 다른 파일 변경 0(작업 트리의 gotdemcatch·attendkdz는 대상 아님).
5. 저장소 독립·민감정보 grep.

## 🔴 금지
- 파일 수정, git 쓰기, 빌드. 트리거에 저작자 이름·비공개 실명·옛 id·다른 서비스명·계정·홈 경로를 쓰지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-78-uploader-32-review-COMPLETE.md`(판정·P 목록·최종 커밋 경로). 끝나면 오더를 processed/로 옮긴다.
