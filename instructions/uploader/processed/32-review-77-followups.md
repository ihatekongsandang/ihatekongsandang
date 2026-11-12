# 업로더 32 — 리뷰 77 후속 정리(소규모)

담당: 반공-업로더 · 빌드 없음(`npm run validate:content`만) · 커밋 금지(슈퍼바이저가 리뷰 후 커밋)

## 배경
- 사용자 지시(2026-11-13): 권장안 "1+2" 가운데 2(리뷰 77 후속 정리).
- 근거: `docs/triggers/reviewer-77-uploader-31-review-COMPLETE.md` P3-1·P3-2·P3-5·P3-6

## 할 일
1. **P3-1** `2026-09-30-shindawit-nk-mdl-50-crossings`의 caption을 구역을 적은 기본 형식으로 고친다. `updatedAt`은 바꾸지 않는다.
   - ko: `자료사진: 강원 철원 비무장지대 철책(2009) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.`
   - en: `Archive photo: DMZ fence in Cheorwon, Gangwon (2009) — not taken at the time of this event. It may differ from how it looks today.`
   - 형식 경고가 나면 정책 §4.5 형식에 맞게 다듬고 트리거에 적는다.
2. **P3-5** `2026-10-05-issueradar-nsc-cyber-sanctions-clash`: 원 매체 원문이나 청와대(대통령실) 공식 브리핑에서 NSC 회의 장소가 글자로 적혀 있는지 다시 찾는다(§4.5-3c). 찾으면 청와대 본관 사진으로 이미지를 붙이고, `sources[]` 추가, caption 끝 출처 문구, §4.5-5 제목 단정 여부를 확인한다. 못 찾으면 ❌로 두고 시도한 URL을 적는다.
3. **P3-2·P3-6**(선택): `firstincome` 사진의 alt, `idaenamright` caption의 "청와대 본관" 표기를 리뷰 77 권고대로 더 정확하게 고친다. 사실을 확인하지 못하면 고치지 않는다.
4. `npm run validate:content`: R=0이어야 하고, 경고 목록이 업로더 31 뒤와 diff 0이어야 한다.

## 🔴 금지
- git 쓰기, `src/`·`scripts/` 수정, 빌드. `gotdemcatch`·`attendkdz`·`donga`·`wendmag`은 건드리지 않는다.
- 오더·트리거에 사진 저작자 이름·비공개 실명·옛 id·다른 서비스명·계정·홈 디렉터리 절대경로를 쓰지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/uploader-32-review-77-followups-COMPLETE.md`. 건별 결과, validate 결과, 최종 커밋 경로를 적는다.
- 끝나면 이 오더를 `instructions/uploader/processed/`로 옮긴다.
