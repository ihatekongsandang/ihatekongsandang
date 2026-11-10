# poster-image-67-3 — 자체 제작 카드 묶음 3 (11건) — COMPLETE

- 담당: 반공-업로더 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11
- 오더: `instructions/uploader/processed/23-self-card-67-batch-3.md`(이동)
- 선행 문서: 묶음 2와 같음(CLAUDE.md, guide §2·§4·§4-1, 정책 전체(§3.6 C1 표 다시 읽음), 지침 단계 1~4·2-1, post-recheck·image-recheck tsv, 시범·묶음 2 트리거).
- 빌드 0, git add·commit·push 0, `src/`·설정 수정 0. 사진은 저장하지 않았다(핫링크). 판정용 사본은 저장소 밖 임시 폴더에만 받았고 끝난 뒤 지웠다.
- 🕒 **소요 시간**: 시스템 시계 기준 08:07 착수 → 08:14 validate → 트리거 작성. 시범·묶음 2처럼 시계값이 실제 작업량보다 짧게 찍혔을 수 있어, 숫자는 시계 그대로 적는다.

## 0. 묶음 2 트리거 보완 (리뷰어 61 P3-1)
- `docs/triggers/poster-image-67-2-COMPLETE.md` 2절 #50 행에 정정 표시를 더했다. 원래 문장("사진 설명 원문 HTML에서 찾지 못함")은 그대로 두었다.
- 정정 내용: 조선일보는 사진 설명을 HTML 태그가 아니라 스크립트 JSON의 `"caption"` 값에 둔다. 10/12 기사를 다시 받아 원문을 읽었다(경찰청장 직무대행의 국정감사 답변 장면, 출처 뉴스1. 이름은 기록에서 뺐다). 9/22 사진 설명도 확인했다. 결과 ③은 그대로다(불가 사유는 그대로 유지).

## 1. 고른 11건과 이유
- 대상: 남은 자체 카드 50건 가운데 `reviewer_2an`이 `B`·`B 재수집`·"정책 결정 필요"(1a로 해소)인 행.
- 시범·묶음 2 트리거의 후보 표에 있는 기사는 다시 받지 않았다. 이번에는 다른 원 매체 기사를 새로 찾았다.
- `없음`·`없음(권고)` 22건은 넣지 않았다(오더 3번).
- **의혹 사안도 넣었다**(#18·#25·#44·#54·#66). 정책 §3.6 C1 표대로 처리했다.
  - 사진 속 공인이 의혹 당사자가 아니면 1행을 쓴다.
  - 당사자 본인이면 2행을 쓴다.
  - 결과가 보도된 경우에는 결과 한 문장을 넣는다.
- #21·#20·#26·#43은 "조사 동의"(B) 행이다. 묶음 1·2에서 다루지 않았다.

| tsv | id | reviewer_2an | 고른 이유 |
|---|---|---|---|
| #5 | `2026-09-15-bbang630-518-armored-vehicle-claim` | B | 조사 동의 행, 다른 원 매체 탐색 |
| #15 | `2026-10-01-ntdkorea-jeju-falungong-rally-chinese` | B 재수집 | 포털 주소 대신 원 매체 재수집 |
| #18 | `2026-10-04-rnwndhk-panmunjom-usb-lawsuit` | 정책 결정 필요 | 북한 지도자 1a 확정으로 해소, 근거 언론 og:image |
| #20 | `2026-10-05-issueradar-nsc-cyber-sanctions-clash` | B | 공인(장관) 후보 |
| #21 | `2026-10-05-jeichi-front-corps-unloaded-guard` | B | 조사 동의 |
| #25 | `2026-10-07-geonwoovibes-defector-repatriation-claim` | B | 공인(통일부 장관) 국감 사진, C1 2행 |
| #26 | `2026-10-07-gotdemcatch-kimminseok-chief-justice-resign` | B | 조사 동의 |
| #43 | `2026-10-10-sisabrieffing-life-sentence-parole` | B | 신원 확인 해소 행 |
| #44 | `2026-10-11-knn-joojinwoo-taereung-golf` | B | 공인(국회의원) 기자회견, C1 1행 |
| #54 | `2026-10-14-wikipost-dp-shincheonji-members` | B | 공인(당 대표) 당일 일정, C1 1행 |
| #66 | `2026-11-05-dduddd-kimtaekyu-expulsion-resolution` | B | 신원 확인 해소 행 |

## 2. 건별 판정

원경 측정값은 Vision 얼굴 상자(얼굴 높이의 하한)로 쟀고, 눈으로도 확인했다. 사진 설명의 사진 기자 이름은 "…기자"로 줄였다.

| tsv | 선택 기사 · 이미지 | 사진 설명 | 인물 판정 · 원경 | 제외 11항 · 4a | 결과 | 바꾼 파일:줄 |
|---|---|---|---|---|---|---|
| #18 | 한국일보 2024-05-21 `https://www.hankookilbo.com/news/article/A2024052121490001831` · `https://newsimg.hankookilbo.com/2024/05/21/214ed322-9d32-4da3-9608-666857d8f7b7.jpg` (640×504) | "문재인 전 대통령과 김정은 북한 국무위원장이 2018년 4월 27일 판문점 남측 지역 도보다리 위에서 담소를 나누고 있다. 판문점=…기자" | (가) 퇴직 대통령(§3.1)·북한 지도자(1a), Vision 얼굴 둘 다 50px(정면 아님). (다) 뒤 다리·산책로 3명, 얼굴 최대 약 5px/504 = **약 1%** | 워터마크·덧씌운 글자 없음, 사용 제한 표기 없음, 짧은 변 504(8항 통과). **4a**: 고발 사안이 다루는 USB 전달이 보도된 2018-04-27 정상회담 일정의 사진. 의혹 당사자 본인 → **C1 2행 + 결과 문장**("2025년 검찰 각하가 보도된 사건입니다." 게시물 출처 펜앤마이크 각하 보도 기준). 157자 | **②** | ko `…panmunjom-usb-lawsuit.md:10-19`(image 블록)·`:46`(문장) · en `:5-6`·`:11` |
| #25 | 파이낸셜뉴스 2026-10-07 `https://www.fnnews.com/news/202610071459195472` · `https://image.fnnews.com/resource/media/image/2026/10/07/202610071238451240_e.jpg` (1200×785) | "정동영 통일부 장관이 7일 서울 종로구 남북회담본부에서 열린 통일부 국정감사에서 통일부 관계자와 이야기를 나누고 있다. 뉴시스" | (가) 중앙행정기관 정무직(장관). (나) 사진 설명이 밝힌 통일부 관계자(3b). (다) 뒤 1명은 장관 머리에 가려 정수리·뒷머리만 보이고(흐림), 왼쪽 끝 1명은 뒷머리. 보이는 얼굴 없음 | 워터마크 없음, 사용 제한 없음, 1200×785. **4a**: 게시물이 다루는 10/7 통일부 국정감사 그 일정. 의혹이 장관이 이끄는 부처를 향하므로 **C1 2행**. 149자 | **②** | ko `…defector-repatriation-claim.md:13-22`·`:50` · en `:5-6`·`:12` |
| #44 | 세계일보 2026-10-11 `https://www.segye.com/newsView/20261011510752` · `https://www.segye.com/content/image/2026/10/11/20261011510838.jpg` (1200×865) | "국민의힘 주진우 의원이 11일 국회 소통관에서 기자회견을 열고 \"…태릉 cc에서 황제 골프를 쳤다\"고 주장하고 있다. 연합뉴스" | (가) 현직 국회의원 단독(Vision 171px). 손에 든 판은 현장의 실물 자료로, 판 속 차량 옆 2명은 뒷모습이며 얼굴은 최대 약 5px/865 = **약 0.6%** | 덧씌운 글자 없음(판 글자는 현장 실물), 사용 제한 없음. **4a**: 의혹 제기 기자회견 그 장면. 의혹 당사자가 아님 → **C1 1행**. 같은 날 다른 후보: 뉴스핌 400×300·의원실 제공(8항), 오마이뉴스 3000×2132(같은 연합뉴스 사진 — 세계일보본을 선택했고 오마이뉴스본은 판정하지 않음) | **②** | ko `…joojinwoo-taereung-golf.md:13-22`·`:45` · en `:5-6`·`:12` |
| #54 | 서울신문 2026-10-14 `https://www.seoul.co.kr/news/politics/2026/10/14/20261014500087` · `https://img.seoul.co.kr//img/upload/2026/10/14/SSC_20261014112519_O2.jpg` (1200×764) | "더불어민주당 김민석 대표가 14일 국회에서 열린 최고위원회의에 참석하고 있다. 2026.10.14 연합뉴스" | (가) 당 대표(퇴직 정무직) 단독(Vision 212px, 옆모습). 다른 인물 없음(벽은 그림자) | 워터마크 없음, 사용 제한 없음, 1200×764. **4a**: 게시물 속 발언이 나온 10/14 최고위원회의 그 일정. 의혹 당사자가 아님 → **C1 1행** | **②** | ko `…dp-shincheonji-members.md:10-19`·`:42` · en `:5-6`·`:11` |
| #5 | 서울신문 2024(보고회) · 한겨레 2021 · 서울신문 2022 | 서울신문 2024: 보고회 장면 · 한겨레: 2021년 사진 | 서울신문 2024: 헤드테이블 (다) 얼굴 약 4~5%(재측정 구간, 경계라 불가) · 한겨레: (다) 얼굴 큼 | 서울신문 2022 og:image가 매체 공유 로고(사진 아님) · 한겨레 2021 사진은 게시물 사안과 다른 일정(4a) | **③** | ko image 블록 삭제(현재 og 앞 `:9` 이후) · en imageAlt·imageCaption 2줄 삭제 (문장 수정 대상 없음) |
| #15 | 노컷뉴스(원 매체 재수집) | 기록 생략(워터마크로 판정 종료) | — | 오른쪽 아래 "NOCUTNEWS" 워터마크 | **③** | ko image 블록 삭제 · `:48` 문장 · en 2줄 삭제 · `:9` |
| #20 | 검색: 10/1 NSC 상임위 회의 사진 | 찾은 사진은 모두 8월 등 다른 일정 | — | 10/1 회의 자체 사진을 찾지 못함(4a) | **③** | ko image 블록 삭제 · `:45` · en 2줄 삭제 · `:9` |
| #21 | 검색: 10/5 보도 관련 현장 사진 | — | — | 해당 일정 사진을 찾지 못함(4a) | **③** | ko image 블록 삭제 · `:37` · en 2줄 삭제 · `:9` |
| #26 | 발언 출처가 민주당 유튜브 방송 | — | — | 발언 일정이 방송 출연이라 그 장면의 보도사진이 없음(4a). 방송 화면은 로고·자막 때문에 쓸 수 없음 | **③** | ko image 블록 삭제 · `:35` · en 2줄 삭제 · `:10` |
| #43 | 파이낸셜뉴스 10/8 · 경향신문 10/8 · 데일리안 | FN·경향: 10/8 법무부 국정감사 사진 | FN·경향: (다) 얼굴 약 11~17% | FN·경향: (다) 5% 이상 · 데일리안: 사진 설명 없음(2-1) | **③** | ko image 블록 삭제 · `:28` · en 2줄 삭제 · `:9` |
| #66 | 오마이뉴스 · 더팩트 · 아이뉴스24 | 기록 생략(아래 사유로 판정 종료) | 더팩트: (다) 얼굴 Vision 21px/427 = **4.9%**(4.5~5% 구간, 하한값이라 실제는 더 큼 → 불가) | 오마이뉴스: 워터마크 · 아이뉴스24 580×341(8항) | **③** | ko image 블록 삭제 · `:32` · en 2줄 삭제 · `:9` |

- **실명**: caption·alt·faceNote에 나오는 사람은 퇴직 대통령·북한 지도자·장관·국회의원·당 대표뿐이다(모두 공인). 통일부 관계자는 직위로만 적었다. 사진 기자 이름은 어느 파일에도 넣지 않았다.
- **본문 문장**: "…대신 자체 제작 카드를 썼습니다"와 "we used a card made by this site" 계열 문장 10곳을 고쳤다(ko 10곳, en 10곳). 새 문장은 "…은/는 쓰지 않았습니다"와 "we did not use the original …"이다. #5에는 해당 문장이 없다.
  - 사실 내용은 같아 `updatedAt`은 바꾸지 않았다(선례: 묶음 1·2).
  - 11건 ko·en에 "자체 제작"이나 "made by this site"가 남은 곳은 0이다.
- `license` 없음. `sourcePageUrl` 4/4가 `sources[]` url과 같은 글자.
- 줄 번호는 수정 뒤 파일 기준이다. ③은 image 블록이 사라져 줄이 당겨졌다.

## 3. 삭제한 파일 (`rm`·`rmdir`) — 11개 폴더
`public/images/` 아래 다음 폴더의 `thumb.jpg`와 폴더: `2026-10-04-rnwndhk-panmunjom-usb-lawsuit` · `2026-10-07-geonwoovibes-defector-repatriation-claim` · `2026-10-11-knn-joojinwoo-taereung-golf` · `2026-10-14-wikipost-dp-shincheonji-members` · `2026-09-15-bbang630-518-armored-vehicle-claim` · `2026-10-01-ntdkorea-jeju-falungong-rally-chinese` · `2026-10-05-issueradar-nsc-cyber-sanctions-clash` · `2026-10-05-jeichi-front-corps-unloaded-guard` · `2026-10-07-gotdemcatch-kimminseok-chief-justice-resign` · `2026-10-10-sisabrieffing-life-sentence-parole` · `2026-11-05-dduddd-kimtaekyu-expulsion-resolution`
- **남은 자체 카드 재집계: 39**. 이미지 파일 39개, `src: /images/` 참조 게시물 39건, validate의 "self 39"가 서로 같다. 참조 없는 이미지 0.

## 4. 검증
- `npm run validate:content` → 418건 통과·실패 0, "✅ 검증 통과". 대표 이미지 종류: self 39 · news 34.
  - 경고는 22개로, 작업 전과 같은 수다.
  - 대상 11건에 걸린 경고는 0이다.
- 핫링크 4/4가 200(`image/jpeg`)을 돌려줬다.
- **결과: ② 4건 · ③ 7건**(11건). ③의 대표 사유:
  - 그 일정의 사진이 없거나 다른 일정의 사진만 있음(4a): 4건(#20·#21·#26 + #5 일부)
  - 워터마크: 2건(#15·#66)
  - (다) 얼굴 5% 이상 또는 경계: 2건(#43·#5)
- 다음 묶음 판단 자료: 남은 39건 중 22건은 `없음` 계열이다. 나머지 B 계열 17건도 같은 이유(4a·워터마크·8항)로 ③이 많을 것으로 본다. 다만 **이건 예상이고, 확인한 값이 아니다.**

## 5. `git status --short` 전체 (이 트리거 작성 직전)
```
 M content/posts-en/2026-09-15-bbang630-518-armored-vehicle-claim.md
 M content/posts-en/2026-10-01-ntdkorea-jeju-falungong-rally-chinese.md
 M content/posts-en/2026-10-04-rnwndhk-panmunjom-usb-lawsuit.md
 M content/posts-en/2026-10-05-issueradar-nsc-cyber-sanctions-clash.md
 M content/posts-en/2026-10-05-jeichi-front-corps-unloaded-guard.md
 M content/posts-en/2026-10-07-geonwoovibes-defector-repatriation-claim.md
 M content/posts-en/2026-10-07-gotdemcatch-kimminseok-chief-justice-resign.md
 M content/posts-en/2026-10-10-sisabrieffing-life-sentence-parole.md
 M content/posts-en/2026-10-11-knn-joojinwoo-taereung-golf.md
 M content/posts-en/2026-10-14-wikipost-dp-shincheonji-members.md
 M content/posts-en/2026-11-05-dduddd-kimtaekyu-expulsion-resolution.md
 M content/posts/2026-09-15-bbang630-518-armored-vehicle-claim.md
 M content/posts/2026-10-01-ntdkorea-jeju-falungong-rally-chinese.md
 M content/posts/2026-10-04-rnwndhk-panmunjom-usb-lawsuit.md
 M content/posts/2026-10-05-issueradar-nsc-cyber-sanctions-clash.md
 M content/posts/2026-10-05-jeichi-front-corps-unloaded-guard.md
 M content/posts/2026-10-07-geonwoovibes-defector-repatriation-claim.md
 M content/posts/2026-10-07-gotdemcatch-kimminseok-chief-justice-resign.md
 M content/posts/2026-10-10-sisabrieffing-life-sentence-parole.md
 M content/posts/2026-10-11-knn-joojinwoo-taereung-golf.md
 M content/posts/2026-10-14-wikipost-dp-shincheonji-members.md
 M content/posts/2026-11-05-dduddd-kimtaekyu-expulsion-resolution.md
 M docs/triggers/poster-image-67-2-COMPLETE.md
 M history/2026-10-01.md
 M history/2026-11-05.md
 M history/2026-11-09.md
 M history/2026-11-10.md
 M history/2026-11-11.md
 D public/images/2026-09-15-bbang630-518-armored-vehicle-claim/thumb.jpg
 D public/images/2026-10-01-ntdkorea-jeju-falungong-rally-chinese/thumb.jpg
 D public/images/2026-10-04-rnwndhk-panmunjom-usb-lawsuit/thumb.jpg
 D public/images/2026-10-05-issueradar-nsc-cyber-sanctions-clash/thumb.jpg
 D public/images/2026-10-05-jeichi-front-corps-unloaded-guard/thumb.jpg
 D public/images/2026-10-07-geonwoovibes-defector-repatriation-claim/thumb.jpg
 D public/images/2026-10-07-gotdemcatch-kimminseok-chief-justice-resign/thumb.jpg
 D public/images/2026-10-10-sisabrieffing-life-sentence-parole/thumb.jpg
 D public/images/2026-10-11-knn-joojinwoo-taereung-golf/thumb.jpg
 D public/images/2026-10-14-wikipost-dp-shincheonji-members/thumb.jpg
 D public/images/2026-11-05-dduddd-kimtaekyu-expulsion-resolution/thumb.jpg
?? docs/handoffs/tester-01-deployed-image-loading.md
?? docs/qa/tester-01/
?? docs/tools/designer-03/screens/
?? docs/tools/designer-05/screens/
?? docs/tools/designer-05/sheets/
?? docs/tools/planner-07/38north_article.html
?? docs/tools/planner-07/38north_rss.xml
?? "docs/tools/planner-07/datago_\352\265\255\352\260\200\354\240\225\353\263\264\354\233\220\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? "docs/tools/planner-07/datago_\352\265\255\353\260\251\353\266\200\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? "docs/tools/planner-07/datago_\355\225\251\353\217\231\354\260\270\353\252\250\353\263\270\353\266\200\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? docs/tools/planner-07/dod_rss.xml
?? docs/tools/planner-07/jcs_afp.html
?? docs/tools/planner-07/jcs_main.html
?? docs/tools/planner-07/jcs_root.html
?? docs/tools/planner-07/korea_rss_list.html
?? docs/tools/planner-07/korea_rss_notice.html
?? docs/tools/planner-07/mnd_main.html
?? docs/tools/planner-07/mnd_root.html
?? docs/tools/planner-07/mnd_rss.xml
?? docs/tools/planner-07/nknews_article.html
?? docs/tools/planner-07/nknews_rss.xml
?? docs/tools/planner-07/rfa_rss.xml
?? docs/tools/planner-07/unikorea_openapi.html
?? docs/tools/planner-07/unikorea_rss.xml
?? docs/tools/planner-07/usfk_root.html
?? docs/tools/planner-07/yna_nk_rss.xml
?? docs/tools/programmer-14/screens-e2e/
?? docs/tools/programmer-14/screens/
?? docs/tools/reviewer-31/screens-e2e/
?? docs/tools/reviewer-31/screens/
?? docs/tools/tester-01/
?? docs/triggers/tester-01-deployed-image-loading-COMPLETE.md
?? history/2026-10-02.md
?? history/2026-10-03.md
?? history/2026-10-04.md
?? history/2026-10-05.md
?? history/2026-10-06.md
?? history/2026-10-07.md
?? history/2026-10-08.md
?? history/2026-10-09.md
?? history/2026-10-10.md
?? history/2026-10-11.md
?? history/2026-10-12.md
?? history/2026-10-13.md
?? history/2026-10-14.md
?? history/2026-10-15.md
?? history/2026-10-19.md
?? history/2026-10-20.md
?? history/2026-10-21.md
?? history/2026-10-22.md
?? history/2026-10-25.md
?? history/2026-10-27.md
?? history/2026-10-29.md
?? history/2026-10-30.md
?? history/2026-11-01.md
?? history/2026-11-02.md
?? history/2026-11-03.md
?? history/2026-11-04.md
?? history/2026-11-06.md
?? history/2026-11-08.md
?? instructions/tester/processed/01-deployed-image-loading.md
?? instructions/uploader/23-self-card-67-batch-3.md
```

- 이 트리거 파일(`?? docs/triggers/poster-image-67-3-COMPLETE.md`)과 오더 이동(`instructions/uploader/` → `processed/`)은 위 목록 뒤에 생긴다.

## 23-1 리뷰어 62 조건부 통과 후속 (2026-11-11)

- 지시: 반공-슈퍼바이저 업로더 23-1. 근거는 `docs/triggers/reviewer-62-poster-image-67-3-review-COMPLETE.md`이다.
- 시스템 시계로 08:21에 시작했다. 빌드·커밋 0, `src/`·설정 수정 0.

### 1) P2-1 #25 → ③으로 돌림
- 게시물 `sources[]` 언론 4건을 모두 다시 받아 판정했다. 쓸 수 있는 사진은 없었다.

| 출처 기사 | og:image | 판정 |
|---|---|---|
| 데일리안 `https://www.dailian.co.kr/news/view/1699092/` | `https://cdnimage.dailian.co.kr/news/202610/news_1791362113538_1699092_m_1.jpg` 700×344 | 짧은 변 344(8항) |
| 뉴데일리 `https://www.newdaily.co.kr/site/data/html/2026/10/07/2026100700279.html` | `https://image.newdaily.co.kr/site/data/img/2026/10/07/2026100700279_0.jpg` 899×620 | 장관 옆 왼쪽 인물(신원 미확인 (다))이 옆얼굴로 크게 나온다(머리 높이가 화면 높이의 3분의 1 이상, 눈으로 확인). 원경 기준을 넘는다(9항). 사진 설명도 HTML에서 찾지 못했다 |
| 파이낸셜뉴스 `https://www.fnnews.com/news/202610071459195472` | 리뷰어 62 P2-1 대상 사진 | 의혹 대상 부처 직원이 정면 34%로 나와 3b 조건을 확인할 수 없다 |
| 뉴시스 `https://www.newsis.com/view/NISX20261007_0003817534` | `https://img1.newsis.com/2026/02/19/NISI20260219_0021177190_web.jpg` 720×313 | 2026년 2월 자료사진(4a), 짧은 변 313(8항) |

- **참고 후보**(쓰지 않음): 아이뉴스24 `https://www.inews24.com/v/2012880`. 본문에 10/7 국감의 '탈북민 북송 회유' 공방이 실려 있다.
  - og:image `https://image.inews24.com/v1/542b0080a1a8cd.jpg`(1280×887)는 장관 단독 사진이다. 사진 설명: "정동영 통일부 장관이 7일 서울 종로구 남북회담본부에서 열린 외교통일위원회 국정감사에서 기관 보고를 하고 있다. 2026.10.7 [사진=연합뉴스]".
  - Vision 얼굴은 1개(279px)다. 오른쪽 아래 끝에 뒷머리 일부가 보인다. 사용 제한 표기는 없다.
  - 이 기사는 게시물 `sources[]`에 없다. 지침 단계 2의 1번("그 게시물 `sources[]`의 언론 기사에서 고른다")에 따라 쓰지 않았다.
  - **출처를 새로 더해 사진을 쓸지는 슈퍼바이저 판단 사항**이다. 더하기로 하면 `sources[]` 1건 추가와 ② 블록을 다시 넣는다.
  - ✅ **슈퍼바이저 결정**: ③ 유지. 사진을 쓰려는 목적만으로 출처를 늘리지 않는다(지침 단계 2). 아이뉴스24는 참고 후보 기록으로만 남긴다. 규칙 변경 여부는 나중에 기획 정리 때 따로 검토한다.
- 바꾼 파일(③ 선례와 같은 방식):
  - ko `content/posts/2026-10-07-geonwoovibes-defector-repatriation-claim.md`: `image:` 블록 10줄(옛 13~22행)을 삭제했다. 본문 문장은 지금 `:40`이고 그대로 두었다.
  - en `content/posts-en/…:5-6`: `imageAlt`·`imageCaption`을 삭제했다. 문장은 지금 `:10`이고 그대로 두었다.
  - 옛 카드 파일은 23에서 이미 지웠다.
- 의혹 대상 조직 소속 확인(리뷰어 권고): 이 건으로 이번 묶음의 ② 가운데 **의혹 대상 조직의 비공인이 나오는 사진은 0**이 됐다. #18·#44·#54에는 비공인 배석자가 나오지 않는다.

### 2) P3-1 #18 결과 문장
- ko `content/posts/2026-10-04-rnwndhk-panmunjom-usb-lawsuit.md:14`
  - 전: "…김정은 국무위원장이 담소하는 모습(…). 2025년 검찰 각하가 보도된 사건입니다. …"
  - 후: "…김정은 위원장이 담소하는 모습(…). **2025년 불기소(각하) 결정이 보도된 사건입니다.** …"
  - 정책 §3.6 문구로 맞췄다. 160자를 넘지 않도록 직함을 "국무위원장"에서 "위원장"으로 줄였다. 지금 **160자**다.
- en `content/posts-en/…:6`
  - 전: "The prosecution reportedly dismissed the complaint in 2025."
  - 후: "Prosecutors reportedly decided in 2025 not to indict, dismissing the complaint."
- `updatedAt`은 바꾸지 않았다. 사실 내용이 같은 문구 정리다.

### 3) P3-2 #43 후보 기사 주소 (다시 받아 확인)

| 기사 | og:image | 판정 |
|---|---|---|
| 파이낸셜뉴스 `https://www.fnnews.com/news/202610090053124102` | `https://image.fnnews.com/resource/media/image/2026/10/09/202610090052475821_e.jpg` 1200×800 | 사진 설명: 법무부 장관 직무대행(차관)이 10/8 법사위 국감에서 답변하는 장면(뉴시스, 기자 이름 생략). Vision 얼굴 4개: 230 · 207 · 135 · 91 px / 800. 사진 설명이 지목한 주인공 외의 (다)는 최대 207/800 = **25.9%**, 그다음 135/800 = **16.9%**(9항) |
| 경향신문 `https://khan.co.kr/article/202610081420001` | `https://img.khan.co.kr/news/2026/10/08/news-p.v1.20261008.6c30043390f740d4b4bb8fc5ff8fd45f_P1.jpg` 1200×801 | Vision 얼굴 3개: 237 · 134 · 123 px / 801. 주인공 외 (다) 134/801 = **16.7%**, 123/801 = **15.4%**(9항) |
| 데일리안 `https://www.dailian.co.kr/news/view/1699698/` | `https://cdnimage.dailian.co.kr/news/202610/news_1791446570884_1699606_m_1.jpg` 700×467 | 사진 설명 없음(단계 2 4번 "캡션이 없는 인물 사진은 쓰지 않는다") |

- 23 트리거 2절의 "(다) 얼굴 약 11~17%"는 정정한다. 다시 잰 값은 FN 16.9~25.9%, 경향 15.4~16.7%다. 결과 ③은 그대로다.
- #20·#21·#26은 23 트리거 2절과 리뷰어 62 2절의 출처 기사 확인이 근거이고, 이번에 새로 검색하지 않았다.
  - 23 작업 때 쓴 검색어: #20 "10월 1일 NSC 상임위 회의 사진" 계열, #21 "10월 5일 빈총 경계 보도 사진" 계열.

### 4) P3-3 #5 서울신문 2024 원경 재측정 — ⚠️ 판정 사유 바뀜, 결과는 ③ 확정(명패 비공인 실명)
- 23 작업 때 두 번째 측정은 **하지 않았다**. "경계라 불가"는 측정 절차를 마치지 않은 판정이었다.
- 앞 값을 보지 않고 사진을 다시 받아 두 방법으로 쟀다. 사진: `https://www.seoul.co.kr/news/society/2024/06/24/20240624500223` → `https://img.seoul.co.kr//img/upload/2024/06/24/SSC_20240624205952_O2.jpg`(730×461).
  - 사진 설명: "24일 오후 서울 중구 5·18민주화운동 진상규명조사위원회 대강당에서 종합보고서 대국민 보고회가 열렸다.연합뉴스 제공"
  - 이름이 지목된 사람이 없어 모든 인물이 (다)다.

| 인물 | 측정 1 (Vision 상자, 하한) | 측정 2 (눈금 자, 이마 머리선~턱) |
|---|---|---|
| 헤드테이블 왼쪽 | 20 px / 461 = **4.3%** | 약 186~206행, 20~21 px = **4.3~4.6%** |
| 헤드테이블 가운데 | 검출 안 됨 | 약 187~208행, 약 21 px = **4.6%** |
| 연단 발표자 | 검출 안 됨 | 약 149~165행, 16 px = **3.5%** |
| 왼쪽 촬영자 | — | 옆모습, 카메라에 가려짐(허용) |
| 앞줄 청중 | — | 뒷모습(허용) |

- **두 번 모두 5% 미만**이다. 따라서 23의 불가 사유("(다) 경계라 불가")는 **성립하지 않는다**.
- 나머지 항목:
  - 8항: 짧은 변 461로 통과.
  - 사용 제한 없음(일반 고지만 있음).
  - 워터마크 없음.
  - 4a: 본문 `:41`이 2024년 종합보고서를 다룬다. 그 보고회 사진이다.
  - 11항: 현수막 글자는 행사명이라 대상이 아니다.
- **새로 확인한 문제**: 사진 아래쪽 명패의 이름 글자를 730px 원본에서 읽을 수 있다. 뒷모습 청중 앞의 명패다.
  - 사진 설명·기사로 직위를 확인하지 못한 비공인 (다) 인물과 실명이 이미지 안에서 묶인다.
  - 정책 §5.3 11항은 명패 글자를 "단정형 자막"에서 빼지만, 비공인 실명이 명패로 드러나는 경우는 정책에 명시된 규칙이 없다(편집 원칙: "사적 개인 … 옮기지 않는다").
  - 규칙이 없는 부분이라 추측해 넣지 않고 **③을 유지(보류)** 했다.
- **슈퍼바이저 판단 요청**: 원경 (다) 앞 명패의 비공인 이름이 읽히는 사진을 허용할지 정해 주세요. 허용하면 #5를 ②로 바꾸겠다.
  - 사진 설명은 1행이나 얼굴 없음 행이 아니다. 인물이 원경뿐이므로 "{일시·장소}, {행사}가 열린 모습(원 기사 사진 설명 기준)" 꼴로 쓴다.
- ✅ **슈퍼바이저 결정**: **③ 확정(명패 비공인 실명)**. 사진 속 명패에서 비공인의 실명이 읽히면 비공인 실명 노출에 해당한다(guide §2). 원경 사유가 없어졌어도 불가이고, 애매하면 쓰지 않는다는 원칙과도 맞다.
- 이번에 #5 파일은 바꾸지 않았다(이미 ③ 상태).

### 검증
- `npm run validate:content` → 418/418 통과, "✅ 검증 통과". 대표 이미지 종류는 self 39 · news **33**이다(#25가 news에서 빠짐).
  - 경고 22개(변화 없음). 대상 파일 경고 0.
- 남은 자체 카드 39(변화 없음). #25 폴더는 23에서 이미 지웠다.
- 23 결과 수정: **② 3건(#18·#44·#54) · ③ 8건**(#25 추가). #5는 ③ 확정(명패 비공인 실명), #25는 ③ 유지(슈퍼바이저 결정).

### `git status --short` 증분 (23 트리거 5절 목록 대비)
- 새로 생긴 줄:
  - `?? docs/triggers/poster-image-67-3-COMPLETE.md`(23 트리거)
  - `?? docs/triggers/reviewer-62-poster-image-67-3-review-COMPLETE.md`(리뷰어 62)
  - `?? instructions/reviewer/processed/62-poster-image-67-3-review.md`(리뷰어 62)
- `?? instructions/uploader/23-self-card-67-batch-3.md` → `?? instructions/uploader/processed/23-self-card-67-batch-3.md`(오더 이동)
- 23-1에서 바꾼 4개 파일(#18 ko·en, #25 ko·en)은 이미 ` M`이라 줄 수 변화가 없다.

### 슈퍼바이저 결정 반영 (23-1 판단 요청 2건)
- #25 ③ 유지, #5 ③ 확정(명패 비공인 실명). 위 1)·4)절과 검증 절에 반영했다.
- 콘텐츠 파일은 더 바꾸지 않았다. 그래서 validate를 다시 돌리지 않았다(마지막 결과: 418/418 통과, 경고 22, self 39 · news 33).
