# 업로더 29 — 자료사진 A-2 묶음 4 (확대 라이선스) — 완료 트리거

- 담당: 반공-업로더 (Opus 5.5)
- 오더: `instructions/uploader/29-a2-batch-4-expanded-licenses.md`
- 상태: **1단계 완료 (2026-11-12 07:40)** · **2단계 완료 (2026-11-12 07:41)** — 신호: 프로그래머 20 배포(eab97de, Vercel success)
- 선행 검토: 정책 §4.5 전체(-2·-3a·-3b·-4·-5·-6·-7·-11·-12·-14), guide §4-1 "A-2 확대" 9줄, 업로더 지침 단계 2-2, 리뷰 72 P2-1·P3-2, `docs/qa/uploader-28-candidates.md`

---

## 1단계

### 0. 요약
- **채택 8장 → 게시물 12건**(예상). 국회·법조 사진은 0장이고, 리뷰 72 P3-2(기관 쏠림)에 따라 국회·법조 게시물은 이번 묶음에서 보지 않았다.
- 🔴 1단계에서는 `content/`·`public/`을 고치지 않았다. 원본, 리사이즈본, 메타데이터를 정리한 파일과 frontmatter 초안은 저장소 밖 작업 공간에만 있다. 초안에는 사진 저작자 이름이 들어 있어 이 트리거에는 옮기지 않았다.
- 라이선스별 장수: CC BY 4.0 2(서울연구원, 지금 범위 안) · CC0 1 · CC BY-SA 4.0 2 · CC BY-SA 3.0 1 · CC BY-SA 2.0 1 · 공공누리 제1유형 A-2(`kind: public`) 1.
  - 프로그래머 20 배포 전에 올릴 수 있는 것: P1·P3(CC BY 4.0), P8(CC0) — 6건.
  - 배포 뒤에만 올릴 수 있는 것: P2·P4·P5·P6(BY-SA), P7(public A-2) — 6건.

### 1. 채택 사진 (8장)

| 키 | 대상 | 라이선스 | 라이선스를 직접 본 위치 · 문구 | 저작자 구분 | 재업로드 아님 근거 | 크기(준비본) | 촬영 |
|---|---|---|---|---|---|---|---|
| P1 | 정부서울청사(본관·별관, 높은 곳에서) | CC BY 4.0 | data.si.re.kr/node/49311 상세 페이지의 `creativecommons.org/licenses/by/4.0` 링크(묶음 1~3과 같은 위치) | 기관(서울연구원) | 기관 자체 아카이브 원 페이지 | 900×600 | 2014-10 |
| P2 | 정부과천청사 전경 | CC BY-SA 4.0 | 위키미디어 파일 정보 라이선스 항목 `{{self\|cc-by-sa-4.0}}` | 개인 | source `{{own}}` | 1920×1280 | 2025-09-21 |
| P3 | 서울 올림픽공원 세계평화의문 | CC BY 4.0 | data.si.re.kr/node/61971 `creativecommons.org/licenses/by/4.0` 링크 | 기관(서울연구원) | 기관 원 페이지 | 900×600 | 2020-06 |
| P4 | 파주 북한군 묘지 | CC BY-SA 4.0 | 파일 정보 `{{self\|cc-by-sa-4.0}}`, 분류 "Military Cemetery for North Korean Soldiers" | 개인 | `{{own}}` | 1600×1200 | 2024-10-12 |
| P5 | 북한 남포항 제2부두 | CC BY-SA 2.0 | 파일 정보 `{{cc-by-sa-2.0}}` + 검증 틀 `FlickreviewR/reviewed-pass`(2013-05-24, cc-by-sa-2.0) | 개인 | Flickr 원 게시자 계정 = 파일 정보 저작자(검증 틀이 일치 확인) | 1504×1000 | 2008-06-10 |
| P6 | 홍콩 애드미럴티 하코트로드 | CC BY-SA 3.0 | 파일 정보 `{{self\|cc-by-sa-3.0}}` | 개인 | `{{own}}` | 1920×1440 | 2016-02-17(EXIF 기준) |
| P7 | 새울원자력발전소 1·2호기 | 공공누리 제1유형 | 한수원 누리집 게시물(nttNo=45112, 제목 "새울 1,2호기", 작성일 2022-07-06) 하단 "본 저작물은 "공공누리" 제 1유형 : 출처표시 조건에 따라 이용 할 수 있습니다." + 마크 대체 텍스트 "OPEN 출처표시 - 공공누리 공공저작물 자유이용허락" | 기관(한국수력원자력) | 기관 원 페이지에서 직접 받음(위키미디어 사본 아님) | 1600×1151 | 촬영 연도 미상(페이지 작성일만 있음) |
| P8 | 독일 연방정보국(BND) 본부 | CC0 1.0 | 파일 정보 `{{self\|cc-zero}}` | 개인 | `{{own}}` | 1920×1440 | 2026-03-23 |

- 리사이즈: P1·P3·P4·P5는 원본 그대로이고, P2·P6·P8은 위키미디어가 제공하는 1920px 축소본이다. P7은 원본 2061px를 1600px로 줄여 한 번 다시 인코딩했다. 자르기, 색 보정, 덧씌우기는 하지 않았다.
- 메타데이터: 묶음 3과 같은 도구로 다시 인코딩하지 않고 지웠다(Artist·GPS·일련번호 등, 값은 기록하지 않음). 8장 모두 스캔 데이터와 디코딩 픽셀이 SHA-256 기준으로 같고, 남은 개인정보 필드는 0이다. P7은 IPTC 바이트열 검사에 걸렸는데, 위치를 보니 스캔 데이터 안의 우연한 바이트였다(APP13 세그먼트 없음).

### 2. 게시물별 채택 표 (12건)

| # | 게시물 | 사진 | 같은 대상 근거 | §4.5-5 판단 | 인물(원본 해상도) | 피드 위치 |
|---|---|---|---|---|---|---|
| 1 | `2026-09-10-brieftag-nk-contact-reports-china` | P1 | 통일부 = 정부서울청사(통일부 누리집 하단 "세종대로 209(세종로)"·"정부서울청사") | 사실 전달형(장관의 지침 폐기) ✅ | 원경 점 크기, 얼굴 약 2px / 600px | 196 |
| 2 | `2026-09-11-currentwaves-nk-hr-report-classified` | P1 | 같음 | 제목 "오락가락 비판"은 정책 변경 비판이고 위법·부정을 단정·암시하지 않음 ✅ | 같음 | 100 |
| 3 | `2026-09-15-choice-nk-budget-undecided` | P1 | 본문이 통일부 예산·집행을 다룸 | 사실 전달형 ✅ | 같음 | 107 |
| 4 | `2026-09-16-sisabriefing-nk-budget` | P1 | 같음 | 사실 전달형 ✅ | 같음 | 112 |
| 5 | `2026-09-18-newssnap-chung-no-kaesong-lawsuit` | P1 | 통일부 장관 결정 | 사실 전달형 ✅ | 같음 | 16 |
| 6 | `2026-10-10-sisabrieffing-life-sentence-parole` | P2 | 법무부 = 정부과천청사 1동(법무부 누리집 "경기도 과천시 관문로 47 정부과천청사 법무부(1동)") | 사실 전달형(가석방 통계·법무부 답변) ✅ | 원경 점 크기, 얼굴 약 5px / 6752px | — |
| 7 | `2026-10-07-swingmag-fake-police-protest-sentence` | P3 | 사건 장소 "올림픽공원 개표소 인근" — 공원 일반 모습이고 caption에 "사건이 일어난 지점도 아닙니다" | 사진 속 기관 없음 ✅ | 원경 2명, 얼굴 약 4px / 600px | — |
| 8 | `2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial` | P4 | 사건 장소 = 파주 북한군 묘지(묘역 사진, 단체 시설 아님) | 주최 단체의 건물·표지 없음 ✅ | 사람 없음 | — |
| 9 | `2026-10-28-donga-nk-submarine-infiltration-drills` | P5 | 3a: 게시물 범위 "남포 등"(구역), 사진 남포항(같은 구역), caption은 지점·당시 형식 | 북한 훈련 보도라 사진 속 기관 비판이 아님. 군 초소·장비 표지 없음(화물선·크레인) ✅ | 사람 보이지 않음 | — |
| 10 | `2026-09-28-themove-hongkong-umbrella-12th` | P6 | 본문 "센트럴·애드미럴티 일대를 점거" — 점거가 일어난 장소 | 사진 속 기관 없음 ✅ | 뒷모습 보행자 2명(얼굴 안 보임, 직위 복장 아님) | — |
| 11 | `2026-10-03-rekor-saeul-nuclear-drone` | P7 | 사건 장소 = 새울원전(울타리 500m 안 드론 접근) | 공공기관이고 제목은 보도 인용 사실 전달형 ✅ | 사람 없음 | — |
| 12 | `2026-10-12-minkyuhantv-german-spy-chief` | P8 | 게시물이 다루는 기관 = 독일 연방정보국 | 혐의 대상은 퇴임한 전 국장 개인이고 기관 자체의 위법을 단정하지 않음. 🔶 **슈퍼바이저 확인 요청**: 제목 인용구에 "국정원장"이 있어 카드만 보면 한국 기관으로 읽힐 수 있음(caption에 BND 명시) | 원경 2명, 얼굴 최대 약 18px / 3000px | — |

- **재사용**: P1만 5회 쓰인다(상한 6). P1은 4~5번째 사용이므로 정책 §4.5-6 ①에 따라 같은 대상의 다른 허용 사진을 이번에 찾아봤다. 결과는 아래와 같고, 쓸 수 있는 것이 없었다.
  - 서울연구원 node 49309: 별관(외교부 동)만 나와 통일부 건물이 아님.
  - node 49310과 위키미디어 "Government Complex Seoul Main Building"(같은 원본): 앞쪽 보행자가 크게 나옴.
  - 공용 "Nightview of the Gwanghwamun Square 2024"(공공누리): 원 페이지가 404여서 마크를 직접 보지 못함.
  - 나머지 7장은 각 1회 쓰인다.
- **피드 인접**(메인 피드 `publishedAt` 내림차순, 같은 날은 id 오름차순, 2026-11-12 기준 210건): P1을 쓰는 5건의 위치는 16·100·107·112·196이다. 가장 가까운 간격은 107→112의 5칸으로 기준(5칸 이상)을 겨우 넘는다. 🔶 2단계 전에 새 게시물이 들어와 순서가 바뀌면 다시 계산한다(5칸 미만이면 #3과 #4 중 하나를 뺀다).
- **caption 길이**: ko 38~68자, en 88~147자로 모두 160자 이내다.

### 3. 불가·보류 (대상 순서: 청와대 → 정부청사 → 광화문 → 판문점·DMZ → 외국 공관·기관 → 장비)

| 대상 · 후보 | 판정 | 이유 |
|---|---|---|
| 청와대 — Korea.net Flickr 4장·"CheongWaDae 14"(CC BY-SA 2.0) | ❌ | 파일 설명에 "보도 혹은 공익목적으로 사용"·"부분 복제…변조…다른 이미지에 통합…금지" 조건이 있어 CC BY-SA 2.0 표시와 모순됨 → 정책 §4.5-2 "라이선스 표시가 서로 모순되는 건" 제외. 같은 계정의 광화문(20220806)·올림픽공원(April 2022)도 같은 이유로 제외 |
| 청와대 — "Blue House Seoul 3"(CC BY-SA 4.0, 2022) | ❌ | 원본 8000×2680에서 오른쪽 방문객들이 정면이고 얼굴이 짧은 변의 약 1% 안팎이라 1% 미만을 확인할 수 없음(애매하면 불가) |
| 청와대 — 서울연구원 "청와대앞길" 2020(node 63781·63786·63783) | ❌ | 경찰 버스("POLICE")가 화면 대부분을 차지함. 63783은 제복 근무자가 있고, 본관인지도 식별되지 않음 |
| 청와대 게시물 4건(toktok·alaska·kimmeengeon·rekor-light) | — | 쓸 수 있는 사진이 없음. kimmeengeon·rekor-light는 대상이 청와대 건물인지도 불명확 |
| 정부서울청사 — 위 P1 대안 | ❌ | 위 재사용 줄 참조 |
| 정부서울청사 — `geonwoovibes-defector-repatriation-claim` | ❌ | 제목이 "통일부…북송 회유한다는 제보"로 부정을 암시함(§4.5-5 (나), 애매하면 불가) |
| 정부세종청사(20190611 02 등, CC BY-SA 3.0) | ❌ | 대상 게시물 3건 가운데 hypertension은 본문에 부처 이름이 없고, equal-pay·cpi는 부처 건물(동)을 사진 설명으로 확인할 수 없음 |
| 과천청사 2015(1·2·3번) | ❌ | 설명에 "저작권 퍼블릭 도메인"이라고 적혀 있어 BY-SA 4.0 틀과 모순됨(1·2·3). 11·12번은 2025 전경(P2)으로 대체 |
| 광화문광장 — 2018 plaza(재구조화 전·천막), 2023 "from Square"(공사 가림막), Square 4·seoul(광장이 대상 아님), 공공누리 야경 2024(원 페이지 404) | ❌ | 옛 모습·공사 중·대상 불일치·마크 직접 확인 불가 |
| 광화문 집회 인원 게시물 2건 | — | 28 메모대로 대상 아님(빈 광장 사진이 인원 판단을 왜곡함) |
| 판문점 국기(BY-SA 2.0) → `2pro-unc-armistice-violation` | ❌ | 게시물 사건 장소는 서부전선 MDL 이남이고 판문점이 아님(리뷰 70 P2) |
| DMZ — 도라전망대 CC0(이미 3건) 4~5번째 후보(wikipost·shindawit-nisi 등) | 🔶 보류 | 정책 §4.5-3a (나): 지점 게시물(25사단 폭발 지점)에는 "구역을 특정하지 않는 광역 풍경"만 쓸 수 있는데, 이 사진은 설명이 "파주 도라전망대"로 구역을 특정함. 게시물 본문에는 "서부전선"만 있고 파주는 없음 → 새 기준으로는 불가. 🔶 **기존 3건(oreunboy·todayissuepicks·rekor-15div)도 새 기준에 맞는지 리뷰어 재판정을 요청한다**(이번에는 고치지 않음) |
| DMZ — 공유마당 계열 "DMZ 2735·2741·2742"(CC BY 4.0) | ❌ | 무장 군인이 주피사체 |
| DMZ — "DMZ 2732"(철원 철책·꿩) → `tessa-gop-fence-animal-judgment` | ❌ | "군이 '동물'로 판단" 비판 게시물에 동물 사진을 붙이면 조롱으로 읽힘. GOP 철책과 비무장지대 철책의 종류 일치도 사진 설명만으로는 확인되지 않음 |
| DMZ — 1968 미 정부(PD-USGov) 3장·1960~70년대 목책 | ❌ | 옛 모습(§4.5-4·7) |
| DMZ — 국방부 Flickr "2012년 전선에 서다" | ❌ | 대부분 군인이 나오고, Korea.net과 같은 정부 계정 조건이 있을 수 있어 열지 않음(확인 필요) |
| 북한군 묘지 2019(일본어 파일명) | ❌ | 2024본(P4)이 더 최근이고, 묘비 이름 글자가 읽힘 |
| 남포 2번째 사진 | ❌ | 작업자 여러 명 |
| 육군훈련소 연무대 정문 | ❌ | 오른쪽에 군복 근무자 |
| 경찰청 본관 2017(CC BY-SA 4.0) → `yeong573-police-bodycam-china` | ❌ | 아래쪽 보행자 2명이 정면이고 얼굴이 짧은 변의 약 1% 안팎(애매하면 불가). 2006·2009본은 17~20년 전 |
| 국방부(MND ROK 2009) | ❌ | 17년 전이고 2022 뒤 용산 청사의 용도가 바뀌어 현재 모습을 판단할 수 없음 |
| 경기도청(촬영 미상) | ❌ | 2022 광교 이전 전 옛 청사 |
| 홍콩 2011·2019본 | ❌ | 2011본은 광고판에 모델 얼굴, 2019본은 보행자 |
| 미국 NGA 본부 | ❌ | 2011본은 짧은 변 366px, 옛 본부는 2012 전 모습, 새 검색 결과는 행사 인물 사진뿐 |
| 독일 BND — CC BY-SA 3.0 DE 6장 | ❌ | 지역판(독일판)이라 불가. CC0 2026본(P8)으로 대체 |
| 국정원·국방부 청사·합참 | — | 허용 라이선스 후보 0(28과 같음, 이번에 국방부·합참·국정원 영문 검색 3회를 더 함) |
| 장비 3b — `pagememo-unmanned-vehicle-budget-cut`(아리온스멧) | — | 위키미디어 검색 3회에서 후보 0 |
| 장비 3b — `2pro-nk-slcm-not-announced` | ❌ | 제목이 발사 장면을 전함(§4.5-3b ⑤) |
| 장비 3b — 목함지뢰(`parkchoongkwon-dp-mine-remarks` 등) | ❌ | 게시물이 지뢰 폭발 사건 자체를 다뤄 ⑤ 취지(같은 기종 사진이 그 사건 사진으로 읽힘)에 걸림 |
| 멕시코 국립궁전 | — | 회담 장소가 게시물·출처에 없음(28과 같음) |

### 4. 2단계에서 할 일 (신호 뒤)
1. 프로그래머 20 배포를 확인한다. BY-SA `license` 값, public A-2, `workTitle`·`workYear`, "(변경 없음·크기 조정 외)" 표시가 있는지 본다.
2. 피드 위치를 다시 계산한다(P1의 #3과 #4 간격).
3. 12건의 ko `image` 블록과 en `imageAlt`·`imageCaption`을 넣고, `public/images/{id}/thumb.jpg`에 저장한다(저장소 밖 준비본을 그대로 복사).
4. `npm run validate:content`를 돌린다. R=0이고 대상 id의 새 경고가 0이어야 한다. `git status --short` 전체를 기록한다.
5. 🔶 슈퍼바이저 판단을 반영한다: #12(BND) 채택 여부와 DMZ 도라 사진 기존 3건의 재판정.

### 5. 금지 사항 준수
- git 쓰기, 빌드, `src/` 수정 모두 0. `content/`·`public/` 수정 0(1단계).
- 이 트리거에는 사진 저작자 이름, 실명, 옛 id, 다른 서비스명, 계정, 홈 경로를 쓰지 않았다. 저작자는 개인/기관 구분만 적었다.
- `gotdemcatch`·`attendkdz`·`wendmag` 파일은 건드리지 않았다.

## 2단계

### 0. 결과
- **12건에 반영**했다(1단계 표 그대로, 슈퍼바이저 "2단계 시작" 신호를 받아 바로 진행). ko는 `image` 블록을 `og:` 앞에, en은 `imageAlt`·`imageCaption`을 `description` 바로 뒤에 넣었다. 이미지는 `public/images/{id}/thumb.jpg`에 저장했다.
  - 저장 파일 12개는 저장소 밖 준비본과 SHA-256이 같다(불일치 0).
  - `retrievedAt`은 2026-11-12다.
  - 표시 형식은 `content/README.md` §3.6을 따랐다: BY-SA는 license 값만 적고, 표시 문구는 코드가 붙인다. P7은 `kind: public` A-2이고 `workYear`가 없어 caption에 "촬영 연도 미상"을 넣었다.
- 서울연구원 사진(P1·P3)의 `creditName`·`licenseUrl`은 묶음 1~3과 같게 맞췄다(서울특별시, `…/by/4.0/deed.ko`).
- caption을 바꾼 곳:
  - P5(남포)는 정책 §4.5-3a에 따라 ② 광역 풍경 형식으로 바꿨다. ko는 "자료사진: 북한 남포 일반 풍경(2008) — 이 사건 지점·당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.", en은 "Archive photo: general view of Nampo, North Korea (2008) — …"이다.
  - P3(올림픽공원)의 en caption은 처음에 형식 경고가 나서 "— not taken at the time of this event. It was not taken at the event location either."로 고쳤다.

### 1. 함께 처리한 경고 2건 (리뷰 73 P3-4)
- ① `2026-08-25-nowandhere-625-constitution-question`의 사진을 node 48322에서 **node 62584**(한강 건너편에서 본 국회의사당, 2020, 지상 촬영)로 바꿨다. `2026-08-12-citynewsmeme-parksangyong-oath-refusal`(피드 204)과 붙어 있던(203) 문제를 해소한 것이다.
  - 62584는 이번으로 2회 쓰인다(피드 8·203).
  - 이미지 블록과 en `imageAlt`·`imageCaption`을 62584 기준으로 바꾸고 `thumb.jpg`도 교체했다(기존 게시물과 같은 파일).
  - 48322는 3회에서 2회로 줄었다.
- ② `posts-en/2026-10-29-khan-nk-srbm-launch-wonsan`: "— not taken at the time of this event, nor the launch site." → "— not taken at the time of this event. It is not the launch site either."(ko "발사 지점도 아닙니다"와 대응).

### 2. 검증
- `npm run validate:content`: **R=0(오류 0)**, 경고 **22건**.
  - 경고 22건은 묶음 3 뒤 기록과 파일 목록이 같고(diff 0), 모두 기존 description 길이 경고다.
  - 대상 13개 id(12건 + nowandhere)와 Wonsan에 이미지 관련 경고는 0건이다. 인접·형식 경고도 0건이다.
  - `2026-09-10-brieftag-nk-contact-reports-china`의 description 163자 경고는 이번 작업 전부터 있던 것이다.
- 대표 이미지 집계: public 1 · open 43 · news 33(자료사진 open 32 → 43, public A-2 1 추가).
- P1 피드 간격(16·100·107·112·196)을 다시 확인했다. 인접 경고 0이며, 최소 간격은 5칸이다.
- `git status --short`(내 변경분):
  - `M` content/posts/·posts-en/ 각 13개: 12건 + nowandhere. 영어본은 Wonsan 1개가 더 있다.
  - `M` public/images/2026-08-25-nowandhere-625-constitution-question/thumb.jpg
  - `??` public/images/ 12개 폴더: brieftag·currentwaves·choice·sisabriefing-nk-budget·newssnap·themove·rekor-saeul·swingmag·seoulmediatv·sisabrieffing·minkyuhantv·donga
  - `??` 이 트리거, `M` history/2026-11-12.md
  - 그 밖의 `M`·`??`(gotdemcatch·attendkdz, 다른 담당 트리거·history 등)는 이번 작업 전부터 있던 것이고 건드리지 않았다.

### 3. 남은 판단 (슈퍼바이저)
- 🔶 #12 BND(P8): 카드에는 caption이 없고 제목 인용구에 "국정원장"이 있다. 빼야 한다면 `image` 블록·en 2줄·폴더만 지우면 된다.
- 🔶 DMZ 도라전망대 사진 기존 3건이 정책 §4.5-3a (나)에 맞는지 리뷰어 재판정이 필요하다(1단계 3절).
- P1 4~5번째 사용의 대안 탐색 기록은 1단계 2절에 있다.

### 4. 금지 사항
- git 쓰기·빌드·`src/` 수정 0. gotdemcatch·attendkdz·wendmag 파일은 건드리지 않았다.
- 사진 저작자 이름·실명·옛 id·다른 서비스명·홈 경로는 이 트리거와 history에 없다. 개인 저작자 이름이 트리거·history에 0건임을 grep으로 확인했다.

## 29-1 (리뷰 74 반영 — 2026-11-12 07:53)

### 0. 결과
- 업로더 29의 최종 적용은 **11건**이다(12건에서 `donga` 1건을 뺌). 사진은 7장 쓰였다(남포 P5 제외).
- 이미 커밋된 도라전망대 사진 3건은 **대체 카드로 되돌렸다.** 대신 쓸 광역 DMZ 사진은 찾지 못했다(아래 2).
- validate **R=0**, 경고 **22건**(업로더 29 2단계와 같은 파일 목록, diff 0). 대상 id의 이미지 경고는 0이다. 대표 이미지 집계는 public 1 · open 39 · news 33이다.

### 1. P2-1 `2026-10-28-donga-nk-submarine-infiltration-drills` 되돌림
- ko `image` 블록과 en `imageAlt`·`imageCaption` 2줄을 직접 지웠고, `public/images/…/` 폴더를 지웠다. git checkout은 쓰지 않았다.
- `git diff --stat`은 0줄(HEAD와 같음)이고, `git status --short`에도 donga 줄이 없다.

### 2. P2-2 도라전망대 3건 → 대체 카드
- 지운 게시물: `2026-09-21-oreunboy-dmz-mine-explosion` · `2026-09-28-todayissuepicks-dmz-hand-pick-escape` · `2026-10-01-rekor-15div-mine-field`. 각각 ko image 블록과 en 2줄을 지우고 `public/images/{id}/` 폴더를 지웠다. git에서는 `M` 6개, `D` thumb.jpg 3개로 보인다.
- 대신 쓸 사진을 다시 찾았다(이번에 위키미디어에서 3회 더 검색: "Korean Demilitarized Zone landscape"·"DMZ Korea view"·"demilitarized zone Korea panorama").
  - 설명이 "Demilitarized Zone (DMZ), South Korea"뿐인 2024년 연작 4장(CC BY-SA 4.0, 본인 촬영):
    - 02·03·04는 원 페이지 분류가 "Dora Observatory"·"Demilitarized Zone in Paju"라 구역이 드러난다. 상세 크레딧의 원 페이지에서 보이므로 불가다.
    - 01은 숫자가 적힌 붉은 군 표지판이 주피사체다(§4.5-3a 라, 군 작전 게시물). 불가다.
  - "DMZ view from North Korea"(2019)는 분류가 "Joint Security Area"다(구역 명시). 불가다.
  - 그 밖의 결과는 도라전망대·임진각(파주), 철원, 경원선, 군인 사진뿐이다.
  - 그래서 세 게시물 모두 대체 카드로 둔다. 15사단 게시물에 맞는 그 구역 사진도 찾지 못했다.
- 이 정리로 도라전망대 CC0 원본은 사용 0건이 됐다.

### 3. P3-1 Wonsan 영어 caption 길이
- 리뷰어 수정안(`…— not taken at the time of this event or at the launch site. …`)을 그대로 넣었더니 validate가 **A-2 형식 경고를 냈다.** 검증기는 ` — not taken at the time of this event.` 마침표까지를 찾는다.
- 그래서 형식을 지키면서 160자 안에 드는 문안으로 바꿨다(151자): `Archive photo: Wonsan waterfront, North Korea (2008) — not taken at the time of this event. Not the launch site. It may differ from how it looks today.` ko "발사 지점도 아닙니다"에 대응한다.

### 4. `git status --short` (업로더 29·29-1 관련분)
- `M` content/posts·posts-en 각 12개: 업로더 29의 11건 + nowandhere. 영어본은 Wonsan 1개가 더 있다.
- `M` content/posts·posts-en 각 3개: oreunboy·todayissuepicks·rekor-15div.
- `M` public/images/2026-08-25-nowandhere-625-constitution-question/thumb.jpg
- `D` public/images/{oreunboy·todayissuepicks·rekor-15div}/thumb.jpg
- `??` public/images/ 11개 폴더: brieftag·currentwaves·choice·sisabriefing-nk-budget·newssnap·themove·rekor-saeul·swingmag·seoulmediatv·sisabrieffing·minkyuhantv
- `??` 이 트리거, `M` history/2026-11-12.md
- **donga 줄 없음.** gotdemcatch·attendkdz 등 그 밖의 줄은 이번 작업 전부터 있던 것이다.

### 5. 금지 사항
- git 쓰기·빌드·`src/` 수정 0. 저작자 이름·실명·옛 id·다른 서비스명·홈 경로는 이 절에 없다.
