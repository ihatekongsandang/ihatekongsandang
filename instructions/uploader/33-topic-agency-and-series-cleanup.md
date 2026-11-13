# 업로더 33 — 주제 담당 기관 자료사진(§4.5-3e) 2건 + 국회 06T003 연작 정리

담당: 반공-업로더 · 빌드 없음(`npm run validate:content`만) · 커밋 금지(슈퍼바이저가 리뷰 후 커밋)

## 배경
- 사용자 승인(2026-11-13): 주제 관련 자료사진을 좁게 허용하는 안(정책 §4.5-3e, 기획 23·23-1, 리뷰 80).
- 리뷰 79 P3-4·리뷰 80: 국회 06T003 연작(node 62222~62227)이 11건 사용으로 상한 8건을 넘고, 피드 인접 5칸 미만인 곳이 있다.

## 선행
- `planning/card-image-policy.md` §4.5(개정 23·23-1 — 3a 판정 순서, 3e, 6 ⑤ 연작), 업로더 지침 단계 2-2-1 ⑨·⑩
- `docs/triggers/planner-23-topic-agency-rule-and-kogl3-scope-COMPLETE.md`(대상 2건 지침, "23-1 후속")
- `docs/triggers/reviewer-80-planner-23-review-COMPLETE.md`(06T003 재집계·정리안), `docs/triggers/reviewer-79-poster-taekyu-review-COMPLETE.md` P3-4
- guide §4-1 "A-2 확대" 15~19줄

## 할 일
1. **§4.5-3e 대상 2건**
   - `2026-09-20-hagonolza-constitution-amendment-points`: 국회의사당 사진을 쓴다. 06T003 연작은 쓰지 않는다. node 62584 또는 48322(4번째 사용 — §4.5-6 ①·⑦ 확인) 중에서 고른다. 판정 전에 기관 이름이 나온 위치와 횟수, 담당 관계 문장 원문, 피드 5칸 이웃, 사용 현황을 트리거에 적는다. caption은 §4.5-3e 형식(ko·en 160자 이내)으로 쓴다.
   - `2026-09-28-geonwoo-farmland-bank-expansion`: 농림축산식품부 청사(정부세종청사 해당 동) 사진을 찾는다. 동을 특정할 수 있고 허용 라이선스인 사진만 쓴다. 못 찾으면 ❌로 두고 시도한 곳을 적는다.
2. **06T003 연작 정리**: 리뷰 80 정리안대로, 연작 사용 게시물 3건의 사진을 다른 국회 원본으로 바꾼다. 교체 대상에 joojinwoo(피드 110)를 넣어 붙어 있는 두 곳을 함께 푼다. 바꾼 뒤 연작 8건 이내, 5칸 간격, 같은 원본 6건 이하, 국회 대상 하한을 모두 다시 세어 트리거에 적는다. 교체 게시물의 caption 연도와 `updatedAt` 규칙은 지침을 따른다(이미지 교체만이면 `updatedAt`은 바꾸지 않는다).
3. `npm run validate:content`: R=0, 새 경고 0.

## 🔴 금지
- git 쓰기, `src/`·`scripts/` 수정, 빌드. `gotdemcatch`·`attendkdz`·`donga`·`wendmag`은 건드리지 않는다.
- 오더·트리거에 사진 저작자 이름·비공개 실명·옛 id·다른 서비스명·계정·홈 디렉터리 절대경로를 쓰지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/uploader-33-topic-agency-and-series-cleanup-COMPLETE.md`(건별 판정, 교체 전후 집계, validate, 최종 커밋 경로). 끝나면 이 오더를 processed/로 옮기고 반공-슈퍼바이저에 SendMessage로 알린다.
