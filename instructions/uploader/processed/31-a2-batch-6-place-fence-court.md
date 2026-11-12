# 업로더 31 — 자료사진 A-2 묶음 6 (장소 확인 출처·경계 철책·법원·3a 재판정)

담당: 반공-업로더 · 빌드 없음(`npm run validate:content`만) · 커밋 금지(슈퍼바이저가 리뷰 후 커밋)

## 배경
- 사용자 승인(2026-11-12): 장소 확인 출처 1건 추가, GOP·남방한계선 철책 같은 대상, 국회·법원 쏠림 기준.
- 정책은 기획 21·21-1과 리뷰 76에서 정했다. 지금 이미지 있는 게시물은 78/210건이다.

## 선행
- `planning/card-image-policy.md` §4.5(개정 21 반영본 — 3a·3c·3d·4·5·6), `planning/card-image-uploader-steps.md` 단계 2-2
- `docs/triggers/planner-21-image-place-fence-court-policy-COMPLETE.md` §9·§10(판정 지침 표)·21-1 후속
- `docs/triggers/reviewer-76-planner-21-review-COMPLETE.md`(P2-1·P3-4·P3-6)
- `docs/poster/guide.md` §4-1 "A-2 확대"
- 업로더 30 트리거·리뷰 75 트리거(공유마당 키워드·태그 칸까지 확인)

## 할 일
1. 기획 21 트리거 §10 표의 게시물을 한 건씩 판정한다. 판정 전에 피드 5칸 이내 이웃과 같은 대상 사진 사용 현황을 적는다.
   - R7 장소 확인 5건, R10 철책 2건(`jeichi-front`·`tessa`), 3a 재판정 `rekor-15div`, R5 법원 6건, 정부서울청사 4·5번째(`16`·`18`) 교체 시도
   - 장소 확인 출처는 기관 발표 또는 원 매체 기사만 쓴다. 행사 이름과 날짜가 일치하고 장소를 글자로 적어야 한다. `sources[]`에 더하고 `updatedAt`은 바꾸지 않는다. caption 끝은 보도면 `장소는 {매체} 보도 기준입니다.`, 기관 발표면 `장소는 {기관} 발표 기준입니다.`로 쓴다.
   - `rekor-15div` caption은 "철원"으로 쓰고 15사단을 적지 않는다(리뷰 76 P3-6).
   - 애매하면 불가로 둔다. 유지되는 ❌(집회 2·강화 1·DMZ 지점 11)는 다시 다루지 않는다.
2. **탐색 목표**: 대법원 청사 사진 2종 이상 추가, 서울법원종합청사 1종 이상 추가(리뷰 76 P3-4), 멕시코 국립궁전 1종 추가. 라이선스는 원 페이지에서 직접 확인하고 위치·문구를 트리거에 적는다.
3. **기존 게시물 caption 보정(리뷰 76 P2-1)**: 아래 4건은 재판 중이거나 확정되지 않았다. ko caption 끝에 `재판 결과를 뜻하지 않습니다.`를, en caption에는 정책 §4.5 영어 문구를 붙인다. `updatedAt`은 그대로 둔다. 확정 여부는 본문·출처로 다시 확인하고, 확정이면 고치지 않고 이유를 적는다.
   - `2026-07-28-geonwoo-yoon-final-statement-australia`
   - `2026-08-06-owloffreedom-707-commander-sentencing`
   - `2026-09-24-sewodream-nk-agent-private-detective`
   - `2026-10-23-eodguri-kimyonghyun-drone-appeal`
4. 사진 처리는 업로더 지침 단계 2-2를 따른다. EXIF 개인정보성 필드를 지우고, 크기 조정·형식 변환만 한다. 덧씌운 글자가 있는 사진은 쓰지 않는다.
5. `npm run validate:content`: R=0이어야 한다. 경고 목록을 업로더 30 뒤와 diff해서 새 경고 0을 확인한다.

## 🔴 금지
- git 쓰기, `src/`·`scripts/` 수정, 빌드.
- `gotdemcatch`·`attendkdz`·`donga`·`wendmag` 게시물은 건드리지 않는다.
- 오더·트리거에 사진 저작자 이름·비공개 실명·옛 id·다른 서비스명·계정·홈 디렉터리 절대경로를 쓰지 않는다(저작자 이름은 frontmatter `creditName`에만).

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/uploader-31-a2-batch-6-place-fence-court-COMPLETE.md`. 건별 판정 표, 채택 사진(라이선스 위치·문구·촬영연도), 장소 확인 출처 URL, caption 보정 4건, validate 결과, 최종 커밋 경로 목록을 적는다.
- 끝나면 이 오더를 `instructions/uploader/processed/`로 옮긴다.
