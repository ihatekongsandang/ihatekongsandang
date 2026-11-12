# 리뷰 77 — 업로더 31(자료사진 A-2 묶음 6) 검토

담당: 반공-리뷰어 · 빌드 없음(`npm run validate:content`만 허용) · 수정·커밋 금지(지적만)

## 대상
- `docs/triggers/uploader-31-a2-batch-6-place-fence-court-COMPLETE.md` §11 경로 전부(ko·en 각 12건, `public/images/` 9개)
- 오더: `instructions/uploader/processed/31-a2-batch-6-place-fence-court.md`
- 기준: `planning/card-image-policy.md` §4.5(개정 21·21-1), 업로더 지침 단계 2-2, guide §4-1 "A-2 확대" 10~14줄, 리뷰 76 트리거

## 점검 항목
1. **채택 8건**: 라이선스 원 페이지를 직접 열어 업로더 기록과 대조한다. 공유마당은 키워드·태그 칸까지 본다. 사진을 Read로 열어 사람·얼굴·덧씌운 글자·초소·감시장비가 없는지 확인하고, caption 형식(ko·en)과 연도 규칙을 본다. 같은 원본 재사용 6건, 피드 인접 5칸(연작 포함), 대상별 하한도 확인한다.
2. **장소 확인 출처 2건**(neveragain·newsbanhana): 추가 출처가 기관 발표 또는 원 매체 기사이고 행사명·날짜가 일치하며 장소를 글자로 적었는지 확인한다. `sources[]` 추가, `updatedAt` 불변, caption 끝 문구도 본다. newsbanhana는 WTC 사진이 행사장 건물과 같은지 확인한다.
3. **법원 3건**(kctu-appeal·cheongju·firstincome): 제목·요약이 지목한 법원이 대법원인지, 미확정이면 결과 문구가 있는지 확인한다.
4. **재판 caption 보정 4건**: 미확정 판단 근거, ko·en 문구, en 160자 이내인지. eodguri 사진 교체가 정당한지(새 사진 라이선스·대상 일치).
5. **❌ 6건 판정**이 정책과 맞는지(과하게 보수적인 것은 없는지).
6. **업로더 판단 요청 4건**에 권고를 적는다.
   - ① tessa 게시물은 구역 게시물인가, 지점 게시물인가(파주 판정과의 일관성)
   - ② 서울연구데이터서비스 연작을 대상지 묶음으로 본 해석. 넓게 보면 cheongju를 되돌려야 하는지
   - ③ eodguri 교체
   - ④ `shindawit-nk-mdl-50` caption에 구역(철원)이 빠진 문제
7. `npm run validate:content`: R=0이어야 하고, 경고 22건이 업로더 30-1 뒤와 같은지 확인한다.
8. **저장소 독립·민감정보**: 트리거와 변경분에 사진 저작자 이름(frontmatter `creditName` 제외)·비공개 실명·옛 id·다른 서비스명·계정·홈 디렉터리 절대경로가 없는지 grep한다. 이미지 EXIF에 개인정보성 필드가 남지 않았는지 본다.

## 🔴 금지
- 파일 수정, git 쓰기, 빌드.
- 트리거에 사진 저작자 이름·비공개 실명·옛 id·다른 서비스명·계정·홈 디렉터리 절대경로를 쓰지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-77-uploader-31-review-COMPLETE.md`. 판정, P1~P3(파일:줄 · 수정안), 판단 요청 4건 권고, 최종 커밋 경로를 적는다.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
