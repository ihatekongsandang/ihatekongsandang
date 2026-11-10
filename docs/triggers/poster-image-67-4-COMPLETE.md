# poster-image-67-4 — 자체 제작 카드 묶음 4 (10건) — COMPLETE

- 담당: 반공-업로더 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11
- 오더: `instructions/uploader/processed/24-self-card-67-batch-4.md`(이동)
- 선행 문서: 묶음 3과 같다(CLAUDE.md, guide §2·§4·§4-1, 정책 전체 — §5.1 4a 판정 순서 1~3 다시 읽음, 지침 단계 1~4·2-1, post-recheck·image-recheck tsv, 시범·묶음 2·3 트리거).
- 묶음 3 선례 4가지를 적용했다.
  - 명패 비공인 실명이 보이면 불가.
  - 사진은 `sources[]`에서만 고른다.
  - 의혹 대상 조직의 비공인이 정면으로 크게 나오면 불가.
  - 4.5~5%는 재측정한다.
- 빌드 0, git add·commit·push 0, `src/`·설정 수정 0. 사진은 저장하지 않았다(핫링크). 판정용 사본은 저장소 밖 임시 폴더에만 받았고 끝난 뒤 지웠다.
- 🕒 **소요 시간**: 시스템 시계 기준 08:30 착수 → 08:33 validate → 트리거 작성. 기사 23건의 og:image·사진 설명을 받아 판정했다. 시계값이 실제 작업량보다 짧게 찍혔을 수 있어, 숫자는 시계 그대로 적는다.

## 1. 고른 10건과 이유
- 남은 자체 카드 39건 중 `reviewer_2an`이 B 계열인 행은 **17건**이다(#9·#11·#22·#24·#28·#32·#33·#34·#35·#36·#37·#38·#42·#48·#56·#57·#61). 나머지 22건은 `없음`·`없음(권고)`이라 넣지 않았다.
- 고른 기준은 두 가지다.
  - 지난 세 트리거에 없던 행: #11·#34·#35·#38·#57·#61.
  - 지난번에 걸렀어도 시도하지 않은 `sources[]` 기사가 남은 행: #9·#22·#24·#28.
  - 지난 세 트리거의 후보 기사(#9 아시아경제, #22 데일리대구경북뉴스, #24 한국일보, #28 파이낸셜뉴스)는 다시 받지 않았다.
- 넣지 않은 B 계열 7건:
  - #32: `sources[]` 3건을 시범에서 모두 시도했다.
  - #56: 2건을 시범에서 모두 시도했다.
  - #33: 남은 출처가 영문 1건뿐이다.
  - #48: tsv "정책 결정 필요 — 현행 문언상 불가"(외국 전직 공직자 체포 사안)다.
  - #36·#37·#42: 다음 묶음으로 남겼다.

| tsv | id | reviewer_2an | 고른 이유 |
|---|---|---|---|
| #9 | `2026-09-24-sewodream-nk-agent-private-detective` | B(교체) | 시도하지 않은 한국경제 기사 |
| #11 | `2026-09-26-ccpoutkorea-ocsc-overseas-police` | B | 2022 사건 당시 장소 사진(정책 §5.1 4a 3번 "조사 #11 해석") |
| #22 | `2026-10-05-shindawit-core-tech-leak-china-92` | B | 시도하지 않은 매일경제·더퍼블릭 |
| #24 | `2026-10-05-wendmag-cio-investigation-scope` | B(교체) | 시도하지 않은 동아일보 |
| #28 | `2026-10-07-swingmag-fake-police-protest-sentence` | B(교체) | 시도하지 않은 서울경제·서울신문·SBS |
| #34 | `2026-10-08-peoplepower7-ukraine-korea-oil-claim` | B | 출처 4건 미시도 |
| #35 | `2026-10-08-shindawit-nis-chief-nga-visit-report` | B | 공인(국정원장) 후보, 출처 3건 미시도 |
| #38 | `2026-10-10-insighteye-china-korean-heritage-24` | B 조건부 | 출처 2건 미시도(그래픽 표 판단) |
| #57 | `2026-10-23-eodguri-kimyonghyun-drone-appeal` | B 재수집 | 원 매체 2건(연합뉴스·국민일보) |
| #61 | `2026-10-29-news1-china-53-vessels-taiwan-warning` | B | 출처 2건 미시도 |

## 2. 건별 판정

사진 설명의 사진 기자 이름과 비공인 이름은 기록에서 뺐다. 원경 측정은 Vision 얼굴 상자(하한)로 하고 눈금 자로 다시 쟀다.

| tsv | 선택 기사 · 이미지 | 사진 설명 | 인물 판정 · 원경 | 제외 11항 · 4a | 결과 | 바꾼 파일:줄 |
|---|---|---|---|---|---|---|
| #11 | 세계일보 2023-01-03 `https://www.segye.com/newsView/20230103513230` · `https://www.segye.com/content/image/2023/01/03/20230103514414.jpg` (680×408) | "지난 2022년 12월 31일 중국이 해외에서 운영하는 비밀경찰서의 국내 거점으로 지목된 서울의 한 중식당 2층 사무실 모습. 연합뉴스" | 장소 사진. (다) 1명이 유리문 안쪽에 옆모습으로 서 있다. Vision 검출 0, 눈금 자로 211~219행, 약 8px/408 = **2.0%**(원경). 정면으로 크게 나오는 의혹 대상 조직 인물은 없다(선례 3 해당 없음). 현판에는 단체 이름만 있고 사람 이름은 없다(선례 1 해당 없음) | 워터마크·덧씌운 글자 없음. 사용 제한 표기 없음(본문 확인). 짧은 변 408(8항 통과). **4a**: 촬영 시점 근거는 사진 설명 "지난 2022년 12월 31일"이다. 게시물이 다루는 사건(2022년 12월 의혹 보도·12/29 기자회견·2023년 1월 정부 조사, 본문 `:44-46`)과 같은 시기다. 정책 §5.1 4a 3번(같은 장소 옛 사진은 그 사건이 그때 일어난 경우만)에 맞다. 사진 설명은 **얼굴 없음(장소) 행**을 썼다. 원문의 "지목된"은 "의혹이 제기된"으로 바꿔 단정하지 않았다(66자) | **②** | ko `…ocsc-overseas-police.md:10-19`(image 블록)·`:41`(문장) · en `:5-6`·`:11` |
| #9 | 한국경제 `https://www.hankyung.com/article/2026090556787` | "사진은 기사 내용과 관련 없음. /사진=게티이미지뱅크" | — | 스톡 사진(4항·4a) | **③** | ko image 블록 삭제 · `:28` · en 2줄 삭제 · `:9` |
| #22 | 매일경제 `https://www.mk.co.kr/article/12168241` · 더퍼블릭 `https://www.thepublic.kr/news/articleView.html?idxno=321229` | 매일경제: "기사 이해를 돕기 위한 AI 이미지. [챗GPT]" · 더퍼블릭: 사진 설명 없음 | 매일경제: 생성 이미지 속 인물 · 더퍼블릭: 반도체 칩을 든 장갑 손 | 매일경제: AI 생성 이미지(4항 — 보도사진 아님) · 더퍼블릭: 600×400, 사진 설명·크레딧 없는 스톡형 사진(4항, 촬영 시점 없음 4a) | **③** | ko 블록 삭제 · `:32` · en 2줄 삭제 · `:9` |
| #24 | 동아일보 `https://www.donga.com/news/Politics/article/all/20261004/134784602/2` | — | — | og:image가 "여권 구상 고위공직자범죄수사처 개편 방향" 표 그래픽(4항 글자 중심 그래픽) | **③** | ko 블록 삭제 · `:27` · en 2줄 삭제 · `:9` |
| #28 | 서울경제 `https://m.sedaily.com/article/20098603` · 서울신문 `https://www.seoul.co.kr/news/society/2026/10/07/20261007500082` · SBS `https://news.sbs.co.kr/news/endPage.do?news_id=N1008787201` | 서울경제: "올림픽공원 핸드볼경기장 시위 현장. 연합뉴스"(파일명 2026-07-27) · 서울신문: "… 조롱과 욕설을 들은 현직 경찰관. 스레드 캡처" | 서울경제: 시위 참가자 다수 · 서울신문: 피해 경찰관 | 서울경제: 사진 설명에 촬영 시점 없음, 군중 얼굴(4a·9항) · 서울신문: SNS 캡처·조롱 피해자(4·10항) · SBS: 방송 썸네일, 채널 로고·단정 자막 "줄줄이 '징역형'"(11항) | **③** | ko 블록 삭제 · `:36` · en 2줄 삭제 · `:9` |
| #34 | 경향신문 `https://www.khan.co.kr/article/202610071751001/` · 서울신문 `https://www.seoul.co.kr/news/international/2026/10/07/20261007500001` · 서울평양뉴스 `https://www.spnews.co.kr/news/articleView.html?idxno=111427` · Kyiv Independent `https://kyivindependent.com/south-korea-shipping-fuel-to-russia-via-sanctioned-vessels-media-reports/` | 경향(이미지 alt): 우크라이나 대통령이 10/6 키이우 2차대전 학살 희생자 추모식에 참석, AFP연합뉴스 · 서울신문: "인공지능 도구로 생성한 자료사진" · 서울평양: "대형 벌크선(사진=선사)" · Kyiv: 2024-08-08 블라디보스토크 항(Getty) | 경향: 외국 정상(1a)과 주변 (다) 6명, Vision 72~119px/800 = 9~15% | 경향: 게시물 사안(한국 비판 발언)과 다른 일정(4a), (다) 5% 이상(9항) · 서울신문: AI 생성 이미지(4항) · 서울평양: 600×284(8항)·업체 제공 자료사진 · Kyiv: 2024 사진(4a)·스톡 | **③** | ko 블록 삭제 · `:37` · en 2줄 삭제 · `:9` |
| #35 | 조선일보 `https://www.chosun.com/politics/assembly/2026/10/08/5AE3GKIUJFFHXFSFLDN43UH7L4/` · 오마이뉴스 `https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0003273631` · 뉴스핌 `https://www.newspim.com/news/view/20261007001628` | 조선(JSON caption): "국가정보원장이 지난 5월 7일 … 국회 정보위원회 전체회의에 출석해있다 … /국회사진기자단" · 오마이: "국정원장이 지난 9월 30일 국회 정보위 전체회의를 마치고 퇴장" · 뉴스핌: 10/7 통일부 국감에서 질의하는 다른 의원 | 조선: 국정원장 + (다) 정면 171px/630 = 27% · 오마이: 국정원장 단독 | 조선: 5월 사진(4a)·(다) 5% 이상 · 오마이: 9/30 다른 일정(4a — 게시물 사안은 10/7~8 보도된 방문 거부) · 뉴스핌: 400×267(8항)·다른 인물·다른 일정 | **③** | ko 블록 삭제 · `:32` · en 2줄 삭제 · `:9` |
| #38 | 이데일리 `https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=07320966645610952` · 동포세계신문 `https://www.ekw.co.kr/news/articleView.html?idxno=20938` | 이데일리: og:image 사진 설명 없음 · 동포세계: "… 국가급 비물질문화유산 지정 현황 … / 자료=의원실·국가유산청" | — | 둘 다 표 그래픽(이데일리 "중국 국가급 비물질 문화유산 등재현황" 1280×1169, 동포세계 600×516). 4항 글자 중심 그래픽(지도 예외 아님) | **③** | ko 블록 삭제 · `:27` · en 2줄 삭제 · `:9` |
| #57 | 연합뉴스 `https://www.yna.co.kr/view/AKR20261016079552004` · 국민일보 `https://www.kmib.co.kr/article/20261016500608` | 연합: "윤석열 전 대통령(왼쪽)과 김용현 전 국방부 장관 [연합뉴스 자료사진]" | 연합: 두 사람 얼굴 합성 자료사진 | 연합: 자료사진·합성(4a·4항). 본문의 6/12 1심 사진은 "[서울중앙지법 제공. 재판매 및 DB 금지]"이고 og:image도 아니다(7항) · 국민일보 222×227(8항) | **③** | ko 블록 삭제 · 본문 문장 대상 없음 · en 2줄 삭제 |
| #61 | 뉴스1 `https://www.news1.kr/world/northeast-asia/6336414` · 서울신문 `https://www.seoul.co.kr/news/international/china/2026/10/29/20261029500205` | 뉴스1: "대만 … 국가안전회의 비서장 엑스(X) 갈무리" · 서울신문 og:image(파일 2025-12-07): 중국 항모 전단 4월 훈련, 중국군망 캡처 | — | 뉴스1: SNS 캡처(4항) · 서울신문: 다른 시점 자료사진(4a)·외국 군 매체 캡처 | **③** | ko 블록 삭제 · 본문 문장 대상 없음 · en 2줄 삭제 |

- **선례 적용 확인**
  - 명패 비공인 실명: 대상 0. #11 현판은 단체 이름이다.
  - `sources[]` 밖 사진: 쓰지 않았고 참고 후보도 없다.
  - 의혹 대상 조직의 비공인 정면: #11은 옆모습 2.0%라 해당 없다.
  - 4.5~5% 구간: 대상 0.
- **본문 문장**: "…원문 이미지 대신 (양측 입장을 함께 담은) 자체 제작 카드를 썼습니다"와 영어 대응 문장을 8건 고쳤다(ko 8곳, en 8곳). 새 문장은 "…원문 이미지는 쓰지 않았습니다"와 "we did not use the original image"다. #57·#61에는 해당 문장이 없다.
  - 사실 내용이 같아 `updatedAt`은 바꾸지 않았다.
  - 10건 ko·en에 "자체 제작"이나 "made by this site"가 남은 곳은 0이다.
- `license` 없음. `sourcePageUrl` 1/1이 `sources[]` url과 같은 글자. 비공인 실명·사진 기자 이름은 caption·alt·faceNote·트리거에 0.
- 줄 번호는 수정 뒤 파일 기준이다.

## 3. 삭제한 파일 (`rm`·`rmdir`) — 10개 폴더
`public/images/` 아래 다음 폴더의 `thumb.jpg`와 폴더: `2026-09-26-ccpoutkorea-ocsc-overseas-police` · `2026-09-24-sewodream-nk-agent-private-detective` · `2026-10-05-shindawit-core-tech-leak-china-92` · `2026-10-05-wendmag-cio-investigation-scope` · `2026-10-07-swingmag-fake-police-protest-sentence` · `2026-10-08-peoplepower7-ukraine-korea-oil-claim` · `2026-10-08-shindawit-nis-chief-nga-visit-report` · `2026-10-10-insighteye-china-korean-heritage-24` · `2026-10-23-eodguri-kimyonghyun-drone-appeal` · `2026-10-29-news1-china-53-vessels-taiwan-warning`
- **남은 자체 카드 재집계: 29**. 이미지 파일 29개, `src: /images/` 참조 게시물 29건, validate의 "self 29"가 서로 같다.
  - 참조 없는 이미지는 0이다.
  - 게시물 안 깨진 참조도 0이다. 집계 스크립트가 잡은 6건은 `content/README.md`의 예시 문구였다.

## 4. 검증
- `npm run validate:content` → 418/418 통과, "✅ 검증 통과". 대표 이미지 종류: self 29 · news 34.
  - 경고는 22개로, 작업 전과 같은 수다.
  - 대상 10건에 걸린 경고는 0이다.
- 핫링크 1/1이 200(`image/jpeg`)을 돌려줬다.
- **결과: ② 1건 · ③ 9건**(10건). ③의 대표 사유(건 기준, 한 건에 사유가 여럿이면 대표 하나):
  - AI·스톡·표 그래픽: 4건(#9·#22·#24·#38)
  - 다른 일정이나 자료사진(4a): 3건(#34·#35·#57)
  - SNS 캡처·방송 자막: 2건(#28·#61)
- **남은 B 계열: 7건**(#32·#33·#36·#37·#42·#48·#56).
  - 이미 모든 출처를 시도한 것이 2건(#32·#56)이다.
  - 출처가 1건 남은 것이 1건(#33)이다.
  - 정책상 현행 불가 표기가 1건(#48)이다.
  - 아직 시도하지 않은 것은 3건(#36·#37·#42)이다.
  - 다음 묶음은 이 7건과 `없음` 22건의 일괄 전환을 함께 보는 편이 맞다고 본다. 이건 판단이고 확인한 값이 아니다.

## 5. `git status --short` 전체 (이 트리거 작성 직전)
```
 M content/posts-en/2026-09-24-sewodream-nk-agent-private-detective.md
 M content/posts-en/2026-09-26-ccpoutkorea-ocsc-overseas-police.md
 M content/posts-en/2026-10-05-shindawit-core-tech-leak-china-92.md
 M content/posts-en/2026-10-05-wendmag-cio-investigation-scope.md
 M content/posts-en/2026-10-07-swingmag-fake-police-protest-sentence.md
 M content/posts-en/2026-10-08-peoplepower7-ukraine-korea-oil-claim.md
 M content/posts-en/2026-10-08-shindawit-nis-chief-nga-visit-report.md
 M content/posts-en/2026-10-10-insighteye-china-korean-heritage-24.md
 M content/posts-en/2026-10-23-eodguri-kimyonghyun-drone-appeal.md
 M content/posts-en/2026-10-29-news1-china-53-vessels-taiwan-warning.md
 M content/posts/2026-09-24-sewodream-nk-agent-private-detective.md
 M content/posts/2026-09-26-ccpoutkorea-ocsc-overseas-police.md
 M content/posts/2026-10-05-shindawit-core-tech-leak-china-92.md
 M content/posts/2026-10-05-wendmag-cio-investigation-scope.md
 M content/posts/2026-10-07-swingmag-fake-police-protest-sentence.md
 M content/posts/2026-10-08-peoplepower7-ukraine-korea-oil-claim.md
 M content/posts/2026-10-08-shindawit-nis-chief-nga-visit-report.md
 M content/posts/2026-10-10-insighteye-china-korean-heritage-24.md
 M content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md
 M content/posts/2026-10-29-news1-china-53-vessels-taiwan-warning.md
 M history/2026-10-01.md
 M history/2026-11-05.md
 M history/2026-11-09.md
 M history/2026-11-10.md
 M history/2026-11-11.md
 D public/images/2026-09-24-sewodream-nk-agent-private-detective/thumb.jpg
 D public/images/2026-09-26-ccpoutkorea-ocsc-overseas-police/thumb.jpg
 D public/images/2026-10-05-shindawit-core-tech-leak-china-92/thumb.jpg
 D public/images/2026-10-05-wendmag-cio-investigation-scope/thumb.jpg
 D public/images/2026-10-07-swingmag-fake-police-protest-sentence/thumb.jpg
 D public/images/2026-10-08-peoplepower7-ukraine-korea-oil-claim/thumb.jpg
 D public/images/2026-10-08-shindawit-nis-chief-nga-visit-report/thumb.jpg
 D public/images/2026-10-10-insighteye-china-korean-heritage-24/thumb.jpg
 D public/images/2026-10-23-eodguri-kimyonghyun-drone-appeal/thumb.jpg
 D public/images/2026-10-29-news1-china-53-vessels-taiwan-warning/thumb.jpg
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
?? instructions/uploader/24-self-card-67-batch-4.md
```

- 이 트리거 파일과 오더 이동(`instructions/uploader/24-…` → `processed/`)은 위 목록 뒤에 생긴다.

## 24-1 리뷰어 63 P2-1 후속 (2026-11-11)

- 지시: 반공-슈퍼바이저 업로더 24-1. 시스템 시계로 08:38에 시작했다. 빌드·커밋 0, `src/`·설정 수정 0.
- **#11 `2026-09-26-ccpoutkorea-ocsc-overseas-police` → ③으로 돌림.**
  - 사유(리뷰어 63 P2-1, 슈퍼바이저 결정): 사진 현판에 비공인 민간 단체 이름이 여러 개 읽힌다. 의혹의 결과 보도도 없어 낙인 위험이 있다.
  - 묶음 3의 명패 선례를 **현판·간판까지 넓혀** 적용한다. 2절 "선례 적용 확인"의 "#11 현판은 단체 이름" 판단은 이 결정으로 뒤집힌다.
- 바꾼 파일(#25와 같은 방식):
  - ko `content/posts/2026-09-26-ccpoutkorea-ocsc-overseas-police.md`: `image:` 블록 10줄(옛 10~19행)을 삭제했다. 본문 문장은 지금 `:31`이고 그대로 두었다("원문 이미지는 쓰지 않았습니다"는 여전히 사실이다).
  - en `content/posts-en/…`: `imageAlt`·`imageCaption`(옛 `:5-6`)을 삭제했다. 문장은 지금 `:9`이고 그대로 두었다.
  - 옛 카드 파일은 24에서 이미 지웠다. 남은 자체 카드는 29건 그대로다(폴더 29).
- 검증: `npm run validate:content` → 418/418 통과, "✅ 검증 통과". 대표 이미지 종류는 self 29 · news **33**이다(#11이 news에서 빠짐).
  - 경고 22개(변화 없음).
- 24 결과 수정: **② 0건 · ③ 10건**.
- **남은 B 계열 정정: 6건**(#32·#33·#36·#37·#42·#56). 4절의 "7건"은 틀렸다. #48은 지침 단계 1에서 이미 "이미지 없음"으로 정한 건이라 B 계열에서 뺀다(슈퍼바이저 확인).
- `git status --short` 증분: 새 줄은 이 트리거 파일(`?? docs/triggers/poster-image-67-4-COMPLETE.md`)과 오더 이동(`?? instructions/uploader/processed/24-self-card-67-batch-4.md`, 원래 `instructions/uploader/24-…` 줄은 사라짐)이다. 그밖에 리뷰어 63 산출물이 생겼다. #11 ko·en은 이미 ` M`이라 줄 수 변화가 없다.
