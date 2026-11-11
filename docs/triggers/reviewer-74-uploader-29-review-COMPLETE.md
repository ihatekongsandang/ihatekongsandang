# reviewer-74 — 업로더 29 검토 (자료사진 A-2 묶음 4, 확대 라이선스 12건 + 경고 2건 처리) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-12 · 하위 에이전트 · 검토만(파일 수정·git 쓰기·빌드 0)
- 오더: `instructions/reviewer/processed/74-uploader-29-review.md`(이동). 오더 산출물 칸의 파일명 `…-uploader-28-…`은 오타로 보고, 지시받은 이름(`…-uploader-29-…`)으로 만들었다.
- 기준: 정책 §4.5(9dab545 — 3a·3b·5·6·14), `content/README.md` §3.6(eab97de), 리뷰 70·72
- 수정한 파일: 이 트리거뿐. 원본 내려받기와 메타데이터 검사는 저장소 밖 scratch에서만 했다. 이 기록에는 사진 저작자 이름·Flickr 계정명을 쓰지 않는다.

## 판정: 🟡 **조건부 통과** — P1 0 · P2 2 · P3 4
- **새 12건 중 11건 통과**, 경고 처리 2건(nowandhere 교체·Wonsan 영어 caption)도 통과다.
- **#9 `donga` 남포 1건은 불가**(P2-1). 이 게시물의 이미지만 빼면 커밋할 수 있다.
- **이미 커밋된 도라전망대 3건은 새 기준 §4.5-3a에 맞지 않아 되돌려야 한다**(P2-2, 별도 오더). 이번 커밋을 막지는 않는다.

## 핵심 판정
### ① BND 사진(`2026-10-12-minkyuhantv-german-spy-chief`) — ✅ 허용
- **같은 대상**(§4.5-3): 게시물이 다루는 기관이 독일 연방정보국이고, 사진도 BND 본부다(파일 설명 "Zentrale des Bundesnachrichtendienstes (BND) … Berlin-Mitte", 분류 "Headquarters of the Bundesnachrichtendienst").
- **국정원 오인 위험**: 제목 앞 인용구가 "간첩 잡는 국정원장이…"이지만, 같은 제목 뒤가 곧바로 "**독일 전 연방정보국장** ㅎ씨"라고 밝힌다. 사진 속 울타리 현수막에도 "**BND**" 글자가 읽힌다. 카드만 봐도 독일 기관임이 드러나므로 오인 위험은 낮다.
- **§4.5-5 (나)**: 혐의 대상은 퇴임한 전 국장 개인이고, 제목은 SNS 주장을 인용한 뒤 바로잡는 사실 확인형이다. 국가기관 건물 외관 허용 조건에 맞다.
- 사람: 울타리 앞 보행자 1명과 입구 쪽 1명. 원본(4000×3000) 기준 얼굴 약 18px / 3000 = 0.6%로 1% 미만이다 ✅

### ② 이미 커밋된 도라전망대 3건 — ❌ 새 기준에 맞지 않음 → 되돌리기 권고
| 게시물 | 게시물 범위 | 사진 | 판정 |
|---|---|---|---|
| `2026-09-21-oreunboy-dmz-mine-explosion` | **지점**(25사단 수색작전 중 지뢰 폭발 지점, 본문 "서부전선") | 파일 제목·설명 "Dora Observatory"(파주 — 구역 명시), 우리 caption도 "파주 도라전망대에서 본…" | ❌ §4.5-3a (나): 지점 게시물에는 **구역을 특정하지 않는 광역 풍경만** 쓸 수 있다. 25사단 사고 지점이 파주 구역 안인지는 보도로 확인되지 않는다. 상세 크레딧에 저작물명 "…from the Dora Observatory…"가 그대로 나오므로 caption만 바꿔서는 고칠 수 없다 |
| `2026-09-28-todayissuepicks-dmz-hand-pick-escape` | 지점(같은 사고) | 같음 | ❌ 같은 사유 |
| `2026-10-01-rekor-15div-mine-field` | **구역**(중부전선 15사단 지역) | 같음 | ❌ (나)에 더해 **(다) 사진 설명이 다른 구역(파주·서부)을 명시** — 리뷰 70 tessa와 같은 유형 |

- **되돌릴 목록**(별도 업로더 오더 — image 블록, en 2줄, 폴더 삭제 또는 광역 풍경 사진으로 교체):
  - `content/posts/2026-09-21-oreunboy-dmz-mine-explosion.md` · `content/posts-en/…` · `public/images/2026-09-21-oreunboy-dmz-mine-explosion/`
  - `content/posts/2026-09-28-todayissuepicks-dmz-hand-pick-escape.md` · `content/posts-en/…` · `public/images/2026-09-28-todayissuepicks-dmz-hand-pick-escape/`
  - `content/posts/2026-10-01-rekor-15div-mine-field.md` · `content/posts-en/…` · `public/images/2026-10-01-rekor-15div-mine-field/`
- 세 건 모두 caption이 옛 형식("이 사건 당시 사진이 아닙니다. 사건이 일어난 지점도 아닙니다")이고, 3a의 새 형식("이 사건 지점·당시 사진이 아닙니다")도 아니다. 교체할 때는 "DMZ 철책" 같은 **구역 없는 광역 풍경**만 쓴다.

### ③ 정부서울청사 5건(통일부 게시물, P1 = `data.si.re.kr/node/49311`)
- **같은 대상**: 원 페이지 대상지 "정부종합청사", 세부대상지에 정부종합청사·외교부. 통일부 소재지가 정부서울청사다(업로더 근거) ✅
- **§4.5-5 (나)** 5건의 제목:
  - `brieftag` "…장관, 2023년 '접촉 제한 지침' 폐기" — 결정 전달 ✅
  - `currentwaves` "…3급 비밀로 비공개 — 정권마다 공개·비공개 오락가락 비판" — 정책 변경 비판이고, 정책 예시 「○○부 자료 비공개 논란 보도」 수준이다. 위법·부정의 단정·암시가 아니다 ✅
  - `choice` · `sisabriefing` 예산 집행 '미정' — 수치 전달 ✅
  - `newssnap` "…'손해배상 소송 제기하지 않겠다'" — 결정 전달 ✅
- **같은 원본 상한**: 5건으로 6건 한도 안이다. 4~6번째 사용의 대안 탐색 기록(49309·49310·공용 야경)도 있다 ✅
- **인접 간격**(직접 계산, `publishedAt` 내림차순·같은 날 id 오름차순, 미추적 게시물 포함 210건): 17·101·108·113·197로, 최소 간격 **5**다. 정책 "5건 이상 떨어져"를 **겨우** 충족한다. 업로더 위치 16·100·…은 미추적 1건 차이로 하나씩 밀린 값이고, 간격은 같다.
  - 새 게시물이 108~113 사이에 들어가면 깨질 수 있다. 커밋 직전에 `validate:content` 인접 경고가 0인지 다시 본다.
- **사진**: 광장에 보행자 수십 명이 있지만 모두 점 크기다(얼굴 약 2px / 600 = 0.3%). 2014년 사진이라 2022년 재구조화 전의 광장 배치가 보인다. 대상인 청사 건물은 그대로이고 "현재 모습과 다를 수 있습니다."가 붙어 있다 → 허용(P3-2)

### ④ 업로더가 뺀 후보 — 대체로 타당, 일부는 과하게 보수적
- **타당한 것**:
  - Korea.net 계정 사진 — 파일 설명의 "보도·공익 목적 한정·변조 금지"가 CC BY-SA와 모순 → §4.5-2 "모순 표시" 제외 규정 그대로
  - 과천 2015 PD/BY-SA 모순, BND 독일 지역판, 판문점(다른 구역), 도라 4·5번째(3a), DMZ 2732(조롱 결합), 세종청사(부처 동 미확인)
- **과하게 보수적인 것**(P3-3):
  - 청와대 "Blue House Seoul 3"·경찰청 본관 2017: "얼굴 약 1% 안팎"을 이유로 뺐다. 원본 해상도에서 **px로 재 보면** 판정이 갈릴 수 있다. 1% 미만이면 허용, 1% 이상이면 불가다. 단 경찰청은 `yeong573-police-bodycam` 게시물의 §4.5-5 판단도 함께 필요하다.
  - 국방부 Flickr "2012년 전선에 서다": "조건이 있을 수 있어 열지 않음"으로 남겼다. 열어서 조건을 확인해야 한다.

## 그 밖 건별 판정
| # | id | 사진 | 같은 대상 | 결합·5항 | 판정 |
|---|---|---|---|---|---|
| 1~5 | 통일부 5건 | P1 | ③ | ③ | ✅ |
| 6 | `2026-10-10-sisabrieffing-life-sentence-parole` | P2 정부과천청사 2025 | 법무부 소재지(업로더가 법무부 누리집 주소 "정부과천청사 법무부(1동)" 확인). caption은 "정부과천청사"로 특정 동을 단정하지 않는다 | 통계·답변 전달 | ✅ |
| 7 | `2026-10-07-swingmag-fake-police-protest-sentence` | P3 세계평화의문 | 원 페이지 대상지 "평화의광장(올림픽공원)" — 게시물 장소 "올림픽공원 개표소 인근"과 같은 공원(§4.5-3 기본 규칙의 같은 장소). "지점도 아닙니다" 명시 | 기관 없음 | ✅ |
| 8 | `2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial` | P4 묘역 2024 | 사건 장소 그 자체. 묘비 글자는 원본 해상도에서 읽히지 않음(§5.3-12 문제 없음) | 주최 단체 시설·표지 없음 | ✅ |
| 9 | `2026-10-28-donga-nk-submarine-infiltration-drills` | P5 남포항 화물선 | 같은 도시(남포) | ❌ P2-1 | ❌ |
| 10 | `2026-09-28-themove-hongkong-umbrella-12th` | P6 하코트로드 2016 | 점거가 일어난 도로 그 자체 | 기관 없음. 보행자는 뒷모습(직위 복장 아님) | ✅ |
| 11 | `2026-10-03-rekor-saeul-nuclear-drone` | P7 새울 1·2호기(public A-2) | 사건 장소. 한수원 게시물 원 페이지에서 공공누리 제1유형 문구·마크 대체 텍스트를 직접 확인 | 공공기관 (나), 보도 인용 사실 전달형. 초소·경비 장비 표지 없음(§4.5-5 끝 문장 문제 없음) | ✅ |
| 12 | `2026-10-12-minkyuhantv-german-spy-chief` | P8 BND | ① | ① | ✅ |
| 경고① | `2026-08-25-nowandhere-625-constitution-question` | 62584 국회(2020, 당산철교) | 국회 예결위 → 국회 | — | ✅ 교체 후 62584는 2건(9·204) |
| 경고② | `content/posts-en/2026-10-29-khan-nk-srbm-launch-wonsan.md` | — | — | — | ✅ 문구 대응. 단 길이 P3-1 |

## 1. 라이선스 (원 페이지 직접 열람)
| 키 | 원 페이지 | 확인 | 결과 |
|---|---|---|---|
| P1 | `data.si.re.kr/node/49311` | 05W10503Dc7000, 2014/10, 대상지 정부종합청사, CC BY 4.0 배지, 기관 | ✅ |
| P2 | `File:Government_Complex_Gwacheon.jpg` | `{{self|cc-by-sa-4.0}}`, `{{own}}`, 2025-09-21, API "CC BY-SA 4.0" | ✅ |
| P3 | `data.si.re.kr/node/61971` | 06R03707Ac20000, 2020/06, 평화의광장(올림픽공원)·세계평화의문, CC BY 4.0 | ✅ |
| P4 | `File:Cemetery_2_graves_looking_north.jpg` | `{{self|cc-by-sa-4.0}}`, `{{own}}`, 2024-10-12, 분류 Military Cemetery for North Korean Soldiers | ✅ |
| P5 | `File:Dock_No._2._Nampo,_North_Korea.jpg` | `{{cc-by-sa-2.0}}` + FlickreviewR reviewed-pass(2013-05-24), **원 Flickr 지금도 BY-SA 2.0**(`licenses/by-sa/2.0/`) | ✅(라이선스) |
| P6 | `File:Harcourt_Road,_Admiralty,_Hong_Kong.jpg` | `{{self|cc-by-sa-3.0}}`, `{{own}}`, 날짜는 EXIF 기준 2016-02-17 | ✅ |
| P7 | `www.khnp.co.kr/main/selectBbsNttView.do?key=2278&bbsNo=25&nttNo=45112` | 제목 "새울 1,2호기", 작성일 2022-07-06, "본 저작물은 "공공누리" 제 1유형 : 출처표시 조건에 따라 이용 할 수 있습니다.", 마크 alt "OPEN 출처표시 - 공공누리 공공저작물 자유이용허락" | ✅ |
| P8 | `File:Berlin_20260323_Headquarters_of_the_Bundesnachrichtendienst_01.jpg` | `{{self|cc-zero}}`, `{{own}}`, API "CC0" | ✅ |
| 62584 | `data.si.re.kr/node/62584` | 06T05004Dc40053, 2020/10, 당산철교, 대상지 국회의사당, CC BY 4.0 | ✅ |
- 모든 위키미디어 파일에 삭제·저작권 침해 틀이 없다. CC BY-SA·CC0는 정책 표의 허용 값이다.

## 2. 사진 (고유 8장 + 교체본 Read로 직접 열람 · 원본 대조)
- 해시: P1 ×5, 나머지 각 ×1.
- **원본 대조**:
  - 디코딩 픽셀 동일: P1·P3·62584(서비스 표시본), P2·P8(위키미디어 1920px 축소본과 **바이트 동일**), P4·P5(원본), P6(1920px 축소본)
  - P7: 원본 2061×1482 → 1600×1151로 줄였다. 가로세로비 1.3907 → 1.3901로 **자르기 없음**, 리사이즈 뒤 평균 화소 차이 1.33(재인코딩 수준)이다. 공공누리 제1유형이라 변경 허용이다.
- **사람**: P1 광장 점 크기 다수(0.3%), P2 원경 점 크기, P3 중앙 2명(얼굴 약 4px / 600 = 0.7%), P4·P7 없음, P5 부두에 점 크기 작업자 1~2명(업로더 "보이지 않음" — 1% 미만이라 판정 영향 없음), P6 뒷모습 보행자, P8 0.6% → 모두 기준 안이다.
- **품질·표시**: 군경 복장·초소·감시장비 없음. 짧은 변 581~1440px. 워터마크·덧씌운 글자 없음. 공사 중인 대상 없음(P2 오른쪽의 행사 무대 구조물은 대상 밖).
- **메타데이터**(태그 이름·바이트 패턴만 확인, 값은 옮기지 않음):
  - 13개 파일 모두 Artist·XPAuthor·MakerNote·UserComment·CameraOwnerName·BodySerialNumber·GPS·`dji:Gps*`·`SelfData`·`dc:creator`·By-line **0**(바이트 검색 0)
  - 남은 것: Copyright(서울 기관 고지, P4는 빈 값), 촬영 설정 태그(P5 56개 — 개인 필드 없음), 드론 자세, ICC 프로필(P8), 인코더 주석

## 3. 같은 원본 6건 한도·인접 5건 (커밋분 포함, 작업 트리 전수)
- 49311 ×5(최소 간격 5) · 62226 ×3(25) · 60732 ×3(81) · 도라 ×3(22) · 62227 ×3(36) · 62222 ×2 · 48322 ×2(123) · 62224 ×2 · 60734 ×2 · 60607 ×2 · 48323 ×2(9) · 62584 ×2(195) · 나머지 1
- 6건 초과 0, 5칸 미만 0 → 업로더 표와 맞다.
- 국회·법조 쏠림은 이번 묶음에서 새로 늘지 않았다(국회 사진은 교체 1건뿐). 대신 정부서울청사 1장이 5회 쓰여 새 쏠림이 생겼다(P3-2).

## 4·5. frontmatter·validate
- 새 12건: ko +15줄(P7 public은 +12줄 — `sourceSiteName`·`licenseUrl`·`workYear` 없음, public A-2 형식), en +2줄. `title`·`description`·`publishedAt`·`updatedAt`·본문 변경 0.
- nowandhere: ko ±6줄, en ±2줄로 이미지 필드만 바뀌었다. Wonsan: en ±1줄.
- caption:
  - 기본 형식, 10년 이상 문구(P1 2014·P5 2008·P6 2016-02 — 2026-11 기준 10년 9개월), P7 연도 미상 문구 모두 맞다.
  - P5는 3a 새 형식이다.
  - en 길이 89~148자(새 12건). Wonsan en은 **164자**(P3-1).
- `npm run validate:content` **R=0**, 경고 22건(대상 id 이미지 경고 0). `public 1 · open 43 · news 33`.

## 6. 운영 기록·저장소 독립
- 업로더 29 트리거·오더·이 오더에서 위키미디어 5장의 개인 저작자 표기(frontmatter 값)와 P5 Flickr 계정 경로를 대조했다 → **0**.
- 다른 서비스명·계정·홈·임시 절대경로 0, 옛 id 0.

## P 목록
- **P2-1 #9 `donga` 남포 사진 불가**
  - 제목이 "잠수정·**공작모선**으로 대남 해상 침투 훈련"이다. 사진은 **화물선 한 척이 주피사체**인 부두 사진이다(북한 국기가 그려진 연돌).
  - 카드에는 caption이 없어 이 실재 선박이 "공작모선"으로 읽힐 위험이 크다. 3b ⑤의 취지(같은 종류 장비가 그 사건 장비로 읽힘)와 §4.5-5 결합 위험에 해당하고, 애매하면 불가다. 3a의 "일반 풍경" 성격과도 거리가 멀다.
  - 수정안: 아래 셋을 지운다. 남포 시가지·항만 원경처럼 특정 선박이 주피사체가 아닌 사진이 있으면 다음 묶음에서 다시 본다.
    - `content/posts/2026-10-28-donga-nk-submarine-infiltration-drills.md` image 블록 15줄
    - `content/posts-en/…` 2줄
    - `public/images/2026-10-28-donga-nk-submarine-infiltration-drills/`
- **P2-2 커밋된 도라전망대 3건 되돌리기**(②의 목록). 별도 업로더 오더로 처리하고 리뷰어가 확인한다. 이번 커밋을 막지는 않는다.
- **P3-1 Wonsan 영어 caption 164자**(`content/posts-en/2026-10-29-khan-nk-srbm-launch-wonsan.md` imageCaption): 정책 §4.5-4 "160자 이내"를 넘는다(검증기는 영어 길이를 보지 않는다).
  - 수정안(151자): `Archive photo: Wonsan waterfront, North Korea (2008) — not taken at the time of this event or at the launch site. It may differ from how it looks today.`
- **P3-2 정부서울청사 1장 5회·2014년 광장 배치**: 허용 범위 안이지만, 최소 간격 5(턱걸이)이고 옛 광장 배치가 보인다. 2022년 이후 청사 사진(공공누리·CC)을 찾으면 4·5번째 사용분부터 바꾸기를 권한다.
- **P3-3 제외 판정의 정밀화**: "얼굴 약 1% 안팎"이라 뺀 2건(청와대 Blue House 3·경찰청 2017)은 원본 해상도에서 px로 재서 판정한다. 열지 않은 국방부 Flickr는 열어서 조건을 확인한다. 사용자 지시("최대한")를 생각하면 "애매"를 실측으로 줄이는 것이 맞다.
- **P3-4 정책 문구 확인 요청(기획자)**: §4.5-3a 첫 문장은 "게시물 범위와 **같거나** 그보다 넓은 쪽"이다. 그런데 (나)는 "구역·지점 게시물에는 광역 풍경**만**"이라 적혀, **같은 구역 사진을 구역 게시물에 쓰는 경우**(원산 일대 → 원산 시가지, 남포 등 → 남포)가 허용되는지 문언이 서로 어긋난다. 이번에는 첫 문장과 §4.5-3 기본 규칙(같은 장소)에 따라 허용으로 판정했다. (나)를 "지점 게시물에는 광역 풍경만, 구역 게시물에는 같은 구역 또는 광역"으로 고치기를 권한다.

## 직접 연 URL
- `https://data.si.re.kr/node/49311` · `/node/61971` · `/node/62584`(+ 각 표시본 이미지)
- `https://commons.wikimedia.org/w/index.php?title=File:{이름}&action=raw` — `Government_Complex_Gwacheon.jpg` · `Cemetery_2_graves_looking_north.jpg` · `Dock_No._2._Nampo,_North_Korea.jpg` · `Harcourt_Road,_Admiralty,_Hong_Kong.jpg` · `Berlin_20260323_Headquarters_of_the_Bundesnachrichtendienst_01.jpg`
- 같은 5개의 `commons.wikimedia.org/w/api.php?…prop=imageinfo&iiprop=url|size|extmetadata` → `upload.wikimedia.org`의 원본·1920px 축소본(대조용으로 내려받음)
- `https://www.khnp.co.kr/main/selectBbsNttView.do?key=2278&bbsNo=25&nttNo=45112` 와 그 첨부 이미지 `/DATA/bbs/25/20240516012910692_fYvQ.jpg`
- P5 원 Flickr 사진 페이지(계정 경로는 기록하지 않음, 200·BY-SA 2.0)
- (참고) 도라전망대 파일은 리뷰 70에서 연 위키 원문(`File:North_Korea_from_the_Dora_Observatory,_December_2018.jpg`)

## 최종 커밋 경로 (P2-1 처리 뒤 — `donga`·`gotdemcatch`·`attendkdz` 제외)
게시물(ko·en):
- `content/posts/2026-09-10-brieftag-nk-contact-reports-china.md` · `content/posts-en/…`
- `content/posts/2026-09-11-currentwaves-nk-hr-report-classified.md` · `content/posts-en/…`
- `content/posts/2026-09-15-choice-nk-budget-undecided.md` · `content/posts-en/…`
- `content/posts/2026-09-16-sisabriefing-nk-budget.md` · `content/posts-en/…`
- `content/posts/2026-09-18-newssnap-chung-no-kaesong-lawsuit.md` · `content/posts-en/…`
- `content/posts/2026-10-10-sisabrieffing-life-sentence-parole.md` · `content/posts-en/…`
- `content/posts/2026-10-07-swingmag-fake-police-protest-sentence.md` · `content/posts-en/…`
- `content/posts/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md` · `content/posts-en/…`
- `content/posts/2026-09-28-themove-hongkong-umbrella-12th.md` · `content/posts-en/…`
- `content/posts/2026-10-03-rekor-saeul-nuclear-drone.md` · `content/posts-en/…`
- `content/posts/2026-10-12-minkyuhantv-german-spy-chief.md` · `content/posts-en/…`
- `content/posts/2026-08-25-nowandhere-625-constitution-question.md` · `content/posts-en/…`
- `content/posts-en/2026-10-29-khan-nk-srbm-launch-wonsan.md`(P3-1 반영 권장)

이미지:
- 새 폴더 11개:
  - `public/images/2026-09-10-brieftag-nk-contact-reports-china/`
  - `public/images/2026-09-11-currentwaves-nk-hr-report-classified/`
  - `public/images/2026-09-15-choice-nk-budget-undecided/`
  - `public/images/2026-09-16-sisabriefing-nk-budget/`
  - `public/images/2026-09-18-newssnap-chung-no-kaesong-lawsuit/`
  - `public/images/2026-10-10-sisabrieffing-life-sentence-parole/`
  - `public/images/2026-10-07-swingmag-fake-police-protest-sentence/`
  - `public/images/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial/`
  - `public/images/2026-09-28-themove-hongkong-umbrella-12th/`
  - `public/images/2026-10-03-rekor-saeul-nuclear-drone/`
  - `public/images/2026-10-12-minkyuhantv-german-spy-chief/`
- 수정: `public/images/2026-08-25-nowandhere-625-constitution-question/thumb.jpg`

기록:
- `docs/triggers/uploader-29-a2-batch-4-expanded-licenses-COMPLETE.md`
- `instructions/uploader/processed/29-a2-batch-4-expanded-licenses.md`
- `docs/triggers/reviewer-74-uploader-29-review-COMPLETE.md`
- `instructions/reviewer/processed/74-uploader-29-review.md`

뺄 것 — git status와 대조:
- `donga` 2파일·폴더(P2-1을 처리하면 HEAD와 같아진다)
- `gotdemcatch` 2파일과 그 poster 트리거, `attendkdz` 2파일과 그 poster 트리거
- `docs/supervisor/drafts/…`, poster-hold 트리거 2개, tester-01 관련 파일, `docs/tools/planner-07/…`, `history/*`
