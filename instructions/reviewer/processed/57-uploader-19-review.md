# 리뷰어 57 — 업로더 19·19-1(비공인 실명 3차) + 사용자 URL 병합 1건 검토

담당: 리뷰어(Opus 5.5) · 빌드 없음(validate만) · 커밋 금지

## 대상
1. `docs/triggers/uploader-19-nonpublic-name-3-COMPLETE.md` 전체(1~10절)와 그 작업 트리 변경
2. `docs/triggers/poster-merge-wikipost_mag-DfUjVLUuRxo-COMPLETE.md`(2026-11-04 게시물 병합)
3. 기준: `instructions/uploader/processed/19-nonpublic-name-3.md`, `docs/poster/guide.md` §2·§4·§4-1, `planning/prd.md` §6③, `planning/card-image-policy.md` §3.1·§3.1-1·§3.7

## 슈퍼바이저 결정(19-1, 2026-11-10)
- P077 대령 → 이니셜(guide §2 "대령 이하 군인"은 사건 당사자로 한정하지 않음, 병합 건 중령 이니셜과 일관). P158 이니셜 유지. P089 성+계급 태그 삭제·계정 별칭 태그 유지. rekor-dmz 발언자 정정은 사실 정정이라 updatedAt·정정 블록 허용.

## 확인할 것
1. 22명 판정 각각: 근거 URL을 직접 열어 직위·계급·조문이 맞는지(샘플 금지, 22명 전수). 공인 판정의 직위 문구가 본문에 맞게 들어갔는지, 추가 출처 형식.
2. P105 id 이전: README §6-1 절차, moved/retired txt, 옛 id 0건(`content/` txt 제외·`src/`·`public/`·`scripts/`·`next.config.ts`·`vercel.json`), 내부 링크.
3. P077·P158 이니셜: 게시물 ko·en 전체(제목·설명·speaker·alt·본문·태그·출처 name) 이름 0. P158 카드 이미지 직접 열어 글자 판독.
4. 태그: 사람 이름 태그 전수 삭제가 맞는지, 공인 이름 태그는 남았는지, 사라진 `/tag/` 주소 목록.
5. 문서 잔존: 리뷰어 56 7절 14파일 + 미추적 history 5줄 이름 0. 이번에 이니셜이 된 인물(P077·P158·P105)의 `content/` 밖 추적 파일 잔존.
6. rekor-dmz 정정: 출처 2건을 열어 발언자·직위가 맞는지, 정정 블록·updatedAt 형식이 guide와 맞는지.
7. 병합 건: 서두 문장·이니셜·updatedAt 미변경·이미지 미저장이 guide 병합 규칙과 맞는지.
8. 표기 변경만인 게시물의 updatedAt 변경 0(rekor 제외), `npm run validate:content` 통과.
9. **리뷰어 파일 정정**: `docs/tools/reviewer-52/judgement-table-masked.tsv`의 P020·P087 행을 (가) G1으로 고친다(리뷰어 54 P3-5·56 P3-3). 이번 22명 판정도 같은 표에 반영할지는 판단해 적는다.
10. 산출물(트리거·오더·history)에 비공인 실명·예외 인물 이름·옛 id·홈 경로·다른 서비스명 0.

## 🔴 금지
- git add·commit·push, 빌드, `src/` 수정 금지(작업 트리에 프로그래머 17의 `src/app/**/about` 변경이 동시에 생길 수 있음 — 판정 대상 아님).
- 트리거에 실명·옛 id 금지(P번호·초성).

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-57-uploader-19-review-COMPLETE.md` — 판정(통과/조건부/반려), P1~P3, **커밋할 경로 전체 목록**(업로더 19·19-1·병합·리뷰어 57 산출물, 미추적 history는 별도 표시), 검증 결과.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
