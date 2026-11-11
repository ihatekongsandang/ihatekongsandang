# reviewer-75 — 업로더 30 검토 (자료사진 A-2 묶음 5, 17건) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-12 · 하위 에이전트 · 검토만(파일 수정·git 쓰기·빌드 0, `validate:content` 실행만)
- 오더: `instructions/reviewer/processed/75-uploader-30-review.md`(이동). 오더 산출물 칸의 `…-uploader-28-…`은 오타로 보고, 지시받은 이름(`…-uploader-30-…`)으로 만들었다.
- 기준: 정책 §4.5(3a·3b·5·6·7·11), guide §4-1, `content/README.md` §3.6, 리뷰 70·72·74
- 수정한 파일: 이 트리거뿐. 원본 내려받기·대조·메타데이터 검사는 저장소 밖 scratch에서 했다. 사진 저작자 이름·계정명은 이 기록에 쓰지 않는다.
- 대상 아님(검토·커밋 경로 제외): `gotdemcatch`·`attendkdz`·`donga`·`wendmag`

## 판정: 🟡 **조건부 통과** — P1 0 · P2 1 · P3 5
- **커밋 가능 5건**:
  - 청와대 2건: `toktok`·`alaska`
  - 경찰청 2건: `ego-police`·`yeong573`
  - DMZ 광역 1건: `shindawit-nk-mdl-50`
- **DMZ 철책 12건은 불가**(P2-1). 이번 커밋에서 이미지 추가분을 빼야 한다. 이미지 줄만 추가된 변경이라, 빼면 HEAD와 같아진다.
- **결정적 근거**:
  - 공유마당 원 페이지 5곳 모두 **키워드 칸에 "강원도·철원"**이 있다. 업로더가 "상세 본문 grep 0건"이라 적은 것과 다르다.
  - 사고 게시물의 사고 지점은 본문 기준 "경기 파주 25사단 관할 서부전선"이다.

## ① DMZ 철책 광역 풍경 5장 → 13건
### 1-1. 구역 특정 여부 — ❌ 원 페이지가 구역(철원)을 특정함
- 공유마당 상세 5곳(wrtSn 13320619·620·621·627·631)을 직접 받아 HTML을 확인했다.
  - `<!-- 태그정보 -->` → `<h3 class="section-title">키워드</h3>` 아래 목록 첫 두 항목이 **`강원도`·`철원`**이다. 5곳 모두 같다.
  - 키워드는 저작물마다 다르다. 2700~2702에는 `군인`·`총`이 있고, 2708·2712에는 없다. 따라서 사이트 전체의 공통 목록이 아니라 **저작물별 메타데이터**다.
- 요약정보(사진 설명)와 저작물명("DMZ 27xx")에는 구역이 없다. 위키미디어 사본의 설명과 분류("Demilitarized Zone of South Korea")에도 없다.
- 그러나 **`sourcePageUrl`이 가리키는 원 페이지**가 구역을 특정한다. 오더 ①이 정한 기준은 "사진 설명·원 페이지·분류에 구역 특정이 없을 것"(리뷰 74 도라 기준)이다.
  - 상세 크레딧의 [원 페이지] 링크를 누르면 독자가 "강원도 철원"을 보게 된다.
  - 따라서 §4.5-3a (나)의 "구역을 특정하지 않는 광역 풍경"이 아니다.
  - 파주(서부전선) 게시물에 쓰면 (다) "사진 설명이 다른 구역을 명시한 사진(철원 게시물에 파주 철책)"과 같은 구조다. 방향만 반대다.

### 1-2. 게시물별 범위 판정 (본문을 직접 grep)
| 게시물 | 범위 | 사진 | 판정 |
|---|---|---|---|
| `2026-09-20-nowandhere-mdl-mine-briefing-reel` | 지점(25사단 사고 — 합참 브리핑) | 2700 | ❌ (다) 다른 구역 |
| `2026-09-21-centrism-dmz-summary` | 지점(같은 사고) | 2708 | ❌ |
| `2026-09-21-oreunboy-dmz-mine-explosion` | 지점(25사단, "서부전선") | 2701 | ❌ |
| `2026-09-23-jeichi-nk-mdl-crossing` | 구역 둘(동부전선 침범·"경기 파주 25사단 관할 서부전선" 폭발) | 2700 | ❌ 철원은 둘 다 아님 |
| `2026-09-26-rekor-dmz-dispute` | 지점(같은 사고를 둘러싼 공방) | 2708 | ❌ |
| `2026-09-26-wikipost-dmz-injury-rumor` | 지점 | 2701 | ❌ |
| `2026-09-27-shindawit-nisi-mine-summary` | 지점 | 2712 | ❌ |
| `2026-09-28-todayissuepicks-dmz-hand-pick-escape` | 지점 | 2702 | ❌ |
| `2026-09-29-finf-jcs-terrain-change-year` | 지점(같은 사고 지역의 매설 흔적) | 2712 | ❌ |
| `2026-09-29-nowandhere-defense-minister-nk-responsibility` | 지점(같은 사고) | 2702 | ❌ |
| `2026-09-30-2pro-unc-armistice-violation` | 지점(같은 사고 — 유엔사 판단) | 2708 | ❌ |
| `2026-10-01-rekor-15div-mine-field` | 구역(본문 "15사단은 강원 철원·화천 일대 중부전선") | 2700 | ❌ **보류**(애매→불가). 설명 이유는 아래 |
| `2026-09-30-shindawit-nk-mdl-50-crossings` | **광역**(제목 "北, 8~9월 MDL 50회 침범", 국방정보본부 전 전선 평가) | 2701 | ✅ (가) 광역 게시물. DMZ 안 철원 풍경은 §4.5-3 기본 규칙의 같은 대상 |

- `rekor-15div`를 보류한 이유:
  - 사진(철원)이 게시물 구역(철원·화천)과 겹친다. 그러나 철원에는 다른 사단 구간도 있어, 사진이 15사단 구간인지 확인되지 않는다.
  - (나)의 문언상 구역 게시물에는 "광역 풍경만" 쓸 수 있다. 같은 구역 사진의 허용 여부는 리뷰 74 P3-4에서 기획자 확인을 기다리는 중이다.
  - 따라서 이번에는 뺀다. P3-4가 "구역 게시물에는 같은 구역 사진도 가능"으로 정리되고 사진이 15사단 구간임이 확인되면 다시 본다.
- `shindawit-nk-mdl-50`의 caption은 3a (나) 형식("이 사건 지점·당시 사진이 아닙니다")이다. 광역 게시물은 기본 형식이 원칙이지만, 이 문장도 사실이라 결함은 아니다.

### 1-3. 그 밖의 ① 항목 (12건을 빼도 기록으로 남김)
- **사진**: 5장을 Read로 열었고, 2708·2712는 원본 3024×2016을 4등분해 1:1로 확인했다.
  - 사람 0, 군복 0, 초소·GP·감시장비 0. 2712 철책 모서리의 작은 흰 판은 1:1로도 글자가 읽히지 않는다.
  - (라) 기준으로는 문제없다. 순찰로는 장비·표지가 아니다.
- **철책 종류**: 요약정보가 "비무장지대 … 철책"으로 종류를 밝힌다. 사진도 경계 철책 모양(Y자 지주·윤형 철조망)이다 → 종류 일치 ✅
- **6건·인접**: 아래 3절. 한도 위반은 0이다.
  - **반복 노출 위험은 실재했다.** 서로 다른 원본이지만 같은 연작의 철책 사진이 피드 133·134, 185·186·188에 붙어 있다. 61~81 구간 20칸 안에도 5장이 몰린다. 업로더가 적은 "184·187 3칸"보다 실제로 더 붙어 있다.
  - 12건을 빼면 이 위험은 사라진다.

## ② 공유마당 저작물 ↔ 위키미디어 사본 — ✅ 같은 저작물·같은 이용조건·무변형
- **이용조건**:
  - 공유마당 5곳 모두 "{저작자}의 "DMZ 27xx" 은 CC BY 라이선스로 제공됩니다" 문구가 있다. 페이지 안 `creativecommons.org/licenses/by/4.0` 링크가 버전을 밝힌다(버전 위계 ②).
  - 저작(권)자는 개인이고, 출처는 한국저작권위원회다.
  - 위키미디어 사본 5장의 파일 정보는 `{{cc-by-4.0}}`이고, source가 각 공유마당 주소다. 같은 저작물·같은 버전이다 ✅
- **크레딧**: `sourcePageUrl`은 공유마당 원 페이지(wrtSn)이고 `sourceSiteName: "공유마당"`이다 ✅. 위키미디어 사본은 전달 경로일 뿐 크레딧에 나오지 않는다.
- **동일성** — 공유마당 미리보기(1120×746)를 직접 받아 대조했다:
  - EXIF DateTimeOriginal·카메라가 위키미디어 원본(3024×2016)과 5장 모두 같다.
  - 위키미디어 원본을 1120×746으로 줄여 미리보기와 비교하면 채널 평균 차이가 2.1~3.6이다(리샘플·재압축 수준). 다른 미리보기와 비교하면 49~68이다 → 같은 사진임이 판별된다.
  - 가로세로비는 1.500 대 1.501로 **자르기가 없다**. 평균 차이가 고르게 작아 **색 변형도 없다**.
- **저장본**: 5장 모두 위키미디어 1920px 축소본과 **디코딩 픽셀이 같다**(차이 0). 메타데이터만 다르다.
- 🔶 **P3-1**: 2708은 공유마당 창작년도가 "2022-09-04"다. 그러나 EXIF DateTimeOriginal은 **2009-12-16**이고, 2022-09-04는 포토샵 편집 일시다(DateTime·Software).
  - 우리 caption "(2022)"는 실제 촬영연도와 다르고, 10년 이상 전 사진에 붙여야 할 "현재 모습과 다를 수 있습니다."도 빠졌다.
  - 12건 제외로 지금은 쓰이지 않는다. 다시 쓸 때는 기획자 판단(창작년도 항목 대 EXIF 촬영일)이 필요하다.

## ③ 청와대 본관 2022 → `toktok`·`alaska` — ✅ 허용 (P3-3 문구 권고)
- **라이선스**: `File:Blue_House_Seoul_3.jpg` 원문을 열었다.
  - `{{self|cc-by-sa-4.0}}`, `{{own}}`, 2022-12-07이다. API 값은 "CC BY-SA 4.0"이다.
  - Quality image 틀이 있고 삭제·침해 틀은 없다 ✅
- **원본 대조**: 저장본은 위키미디어 1920px 축소본과 **바이트가 같다**(8000×2680 → 1920×643, 자르기 없음).
- **얼굴 재측정**: 원본 8000×2680에서 관람객 구역을 잘라 6배로 키우고 10px 격자를 그어 쟀다.
  - 정면 보행자 4명의 이마~턱은 약 22~24px이다. 24 / 2680 = **0.9%**로 업로더 값과 같고 1% 미만이다 ✅
  - 마스크를 써서 이목구비 일부가 가려져 있다. 오른쪽 가까운 2명은 뒷모습이다.
  - 다만 상한 1%에 가까워 여유가 적다. 정책에 1% 근처 재측정 규칙은 없으므로 허용한다.
- **§4.5-5 (나)**:
  - `toktok` "이 대통령, SNS에 '대외비' 표시 문건 게시 **논란** — 野 "…", 청와대 "…문제없다"": 양쪽 주장을 인용한 **논란 보도형**이다. 청와대 자체의 위법·부정을 단정하지 않는다 ✅
  - `alaska` "…"청와대 음소거"·"불의의 사고" **비판 나와**, 군은 사과 촉구했지만 상응조치는 미공개로 **보도**":
    - 비판 주체를 밝힌 **출처 인용형**이다. 대상도 위법·부정·비리가 아니라 대응 태도다.
    - 정책 예시의 단정(「○○부, 자료 은폐」)이나 암시(「○○부는 왜 숨기나」)에 해당하지 않는다 ✅
    - 두 건 중 경계에 더 가깝다. 업로더 28 후보 목록의 "직접 비판 형식" 표시는 문형상 인용형이라 허용으로 판단한다.
  - 같은 대상: 제목이 청와대(대통령 집무 청사)를 직접 말한다 ✅
- **인접**: 같은 원본 2건이 피드 62·74로 간격 12다(기준 5 이상) ✅
- 🔶 **P3-3**: 사진은 2022년 **일반 개방기**의 관람객 모습이다. 게시물 시점에는 청와대가 다시 대통령 집무 청사로 쓰인다(두 제목 모두 "청와대"가 발언 주체).
  - 건물은 같지만 앞마당 모습(관람객 통행)이 지금과 다를 수 있다.
  - 정책 §4.5-4의 "현재 모습과 다를 수 있으면" 조건에 해당한다고 보고, ko·en caption 끝에 `현재 모습과 다를 수 있습니다.` / `It may differ from how it looks today.`를 붙이기를 권한다.
  - 대상 줄: ko 각 파일 14줄 `caption`, en 각 6줄 `imageCaption`

## ④ 경찰청 본관 2017 → `ego-police`·`yeong573` — ✅ 허용 (P3-2 caption 정정)
- **라이선스**: `File:Korean_National_Police_Agency_Building05.jpg` 원문을 열었다.
  - `{{self|cc-by-sa-4.0}}`, `{{own}}`, 2017-04-02이다.
  - 설명은 "대한민국 경찰청. 서울 서대문구 통일로 97"이고, 분류는 Korean National Police Agency Headquarters다 ✅
- **원본 대조**: 저장본은 1920px 축소본과 **바이트가 같다**.
- **사람**: 원본 1933×2091 오른쪽 아래를 2배로 키워 봤다.
  - 보행자 2명 모두 **뒷모습**이다(뒤통수만 보이고 사복). 직위가 드러나는 복장이 아니다 ✅
  - 그 밖의 사람은 없다(버스 창 안도 읽히지 않음).
- **§4.5-5 (나)**:
  - `yeong573` ""경찰 보디캠 1만4천 대, 중국산을 대만산으로 둔갑?" — 박상웅 의원 국정감사 추궁과 경찰청장 직무대행 답변":
    - 물음표 문구는 의원 질의를 따옴표로 인용한 것이다. 뒤에 "추궁과 … 답변"을 그대로 전하는 **사실 전달형**이다 ✅
    - 제목만 떼어 보면 암시에 가깝다. 따옴표와 질의자·답변자 명시로 인용형이 성립한다고 판단한다.
  - `ego-police` ""검찰공화국은 정치인이, 경찰공화국은 일반인이 피해" — … 경찰 권한 집중 우려": 제도 비판 인용이다. 경찰청의 위법 단정이 아니다 ✅
  - 군·경찰 작전 비판 단서: 사진에 초소·장비·경찰 복장이 없다. 건물 간판과 표장은 같은 기관의 외관 일부다 ✅
- **인접**: 피드 25·180으로 간격 155다 ✅
- 🔶 **P3-2**:
  - ko caption "자료사진: **서울 경찰청** 본관(2017)"은 서울특별시경찰청(별개 기관, 종로구)으로 읽힐 수 있다. `content/posts/2026-09-22-ego-police-republic-concern.md:14`와 `content/posts/2026-10-13-yeong573-police-bodycam-china.md`의 caption 줄이 대상이다.
    - 수정안: `자료사진: 경찰청 본관(서울 서대문구, 2017) — 이 사건 당시 사진이 아닙니다.`
    - en은 "Korean National Police Agency headquarters, Seoul"이라 문제없다.
  - (참고) 사진 아래쪽 관광버스에 민간 여행사 상호가 크게 읽힌다. 덧씌운 글자가 아니라 피사체라 §4.5-7 위반은 아니다. 다만 보디캠 납품 의혹 게시물에 무관한 상호가 보이므로, 다른 경찰청 사진을 찾으면 바꾸기를 권한다(필수 아님).

## ⑤ 국방부 Flickr 덧씌운 글자 · "정책을 바꾸면 풀리는 것"
- **덧씌운 글자**:
  - 위키미디어 "Photographs by the Republic of Korea Armed Forces" 분류에서 DMZ 사진 1장("2013. 1 육군 15사단 DMZ 수색작전", Flickr 사본)을 받아 열었다.
  - 오른쪽 아래에 **"Photo by {촬영자} / {블로그 주소}"가 인쇄돼 있다** → §4.5-7 "덧씌운 글자·다른 저작권자 표기" 불가다. 업로더 판정에 동의한다.
  - CC BY-SA는 자르기도 금지(§4.5-2 표)라 글자를 지워 쓸 수도 없다.
  - 업로더가 적은 "이용 제한 문구 0"은 이번에 계정 페이지를 열지 않아 재확인하지 않았다. 판정에는 영향이 없다.
- **R5(국회·법조 6건)**:
  - 리뷰 72 P3-2는 **권고**(대상마다 서로 다른 사진 3장 확보, §4.5-6 ③)였다. 금지 규정이 아니므로 정책을 바꿀 필요는 없다.
  - 다음 묶음에서 건별로 §4.5-3 같은 대상을 따지면 된다. 대법원 판결이면 대법원, 지법 판결이면 그 지법이다. 창원지법·청주 사건에 대법원 사진을 쓰면 불가다.
- **R10(GOP·해안·섬 3건)**:
  - "GOP 철책 = 남방한계선 철책"은 기획자가 출처를 달아 명문화할 수 있는 사안이다.
  - 그러나 **해안 철책·섬은 종류가 달라** 같이 묶으면 안 된다.
  - 또 이번 철책 5장은 원 페이지가 철원을 특정하므로, 명문화해도 철원이 아닌 구역 게시물에는 쓸 수 없다.
- **R7(장소가 출처에 없는 7건)**:
  - 장소 확인용 보도·공식 발표 1건을 트리거와 `sources[]`에 더하는 조건이면 찬성한다(§6 출처 기반 원칙과 맞다).
  - 출처 없이 "아마 그 장소"로 고르는 것은 불가다.
- **추가 제안(기획자)** — §4.5-3a에 다음을 명문화하기를 권한다:
  - "원 페이지의 키워드·태그·분류에 구역이 있으면 구역 특정으로 본다"(이번 P2-1)
  - "창작년도와 EXIF 촬영일이 다르면 어느 쪽을 caption 연도로 쓰는가"(P3-1)

## 1. 라이선스 (직접 열람)
| 키 | 원 페이지 | 확인 | 결과 |
|---|---|---|---|
| DA~DE | 공유마당 wrtSn 13320619 · 620 · 621 · 627 · 631 | 이용조건 문구 "CC BY 라이선스로 제공", `licenses/by/4.0` 링크, 저작(권)자 개인(작품 2,050건 등록 작가 본인 등록), 출처 한국저작권위원회, 창작년도 2009-12-14/15/15/2022-09-04/2009-12-15. 키워드 **강원도·철원** | 라이선스 ✅ · 3a ❌ |
| 사본 | `File:DMZ_2700.jpg`~`DMZ_2712.jpg` 원문·API | `{{cc-by-4.0}}`, source=공유마당 주소, 분류 1개 | ✅ |
| BH | `File:Blue_House_Seoul_3.jpg` | self cc-by-sa-4.0, own, 2022-12-07 | ✅ |
| KN | `File:Korean_National_Police_Agency_Building05.jpg` | self cc-by-sa-4.0, own, 2017-04-02 | ✅ |
| (참고) | 15사단 DMZ 수색작전 Flickr 사본 1장 | 덧씌운 글자 확인 | §4.5-7 불가 |

## 2. 사진·메타데이터 (17건 = 고유 7장)
- 해시: 2700 ×3, 2701 ×3, 2702 ×2, 2708 ×3, 2712 ×2, BH ×2, KN ×2 = 17이다. 폴더마다 `thumb.jpg` 1개뿐이다.
- 짧은 변: 1280(DMZ) · 643(BH) · 1920(KN)으로 모두 400px 이상이다. 워터마크·덧씌운 글자 0, 공사 중 0.
- **메타데이터**(태그 이름·바이트 위치만 확인, 값은 옮기지 않음):
  - DMZ 5장에는 EXIF Copyright(저작자 고지, 크레딧과 같은 성격)와 YCbCrPositioning 2개만 남았다. 2708에는 ICC 프로필이 더 있다.
  - BH에는 ICC만, KN에는 메타데이터가 없다.
  - Artist·By-line·GPS·일련번호·XPAuthor·CameraOwner·`dc:creator`·XMP·IPTC 모두 0이다.
  - KN 파일의 "GPS" 바이트 1건은 SOS 뒤 압축 데이터 안의 우연한 값이다(마커 구조로 확인).

## 3. 같은 원본 6건·인접 5건 (작업 트리 전수, 210건, `publishedAt` 내림차순·같은 날 id 오름차순)
- 49311 ×5(최소 간격 5) · 62226 ×3 · 60732 ×3 · 2700 ×3(59) · 2708 ×3(53) · 62227 ×3 · 2701 ×3(54) · 62584 ×2 · KN ×2(155) · BH ×2(12) · 2712 ×2(67) · 2702 ×2(85) · 나머지 2회 이하
- 6건 초과 0, 5칸 미만 0 → 업로더 표와 같다.
  - 내 위치값은 업로더보다 1씩 크다. 미추적 `attendkdz`가 피드 1위라서이고, 간격은 같다.
- **P2-1 반영 뒤**: 2700·2702·2708·2712 사용 0, 2701 사용 1(`shindawit-nk-mdl-50`)이다. 이미지 있는 게시물은 90건에서 78건이 된다.
- 국회·법조: 이번 묶음에서 늘지 않았다(R5 보류).

## 4·5. 게시물 적합성·frontmatter
- 17건 모두 ko +15줄(image 블록), en +2줄(`imageAlt`·`imageCaption`)이다.
  - `title`·`description`·`publishedAt`·`updatedAt`·본문 변경 0 → `updatedAt` 규칙에 맞다.
- 필수 필드: `kind: open`·`creditName`·`creditNameEn`·`sourcePageUrl`·`sourceSiteName`·`license`(버전 포함)·`licenseUrl`·`workTitle`·`workYear`·`faceNote`·`retrievedAt: 2026-11-12` ✅
- caption:
  - `자료사진:` 접두 ✅. 10년 이상(2009) 문구 ✅. 2017(9년 7개월)은 문구가 없어도 된다 ✅
  - 길이: ko 최대 약 70자, en 90~134자로 160자 이내다.
  - 위 P3-1·P3-2·P3-3은 문구 정확성 문제다.
- 기관 자체가 의혹 대상인 경우는 ③·④의 (나) 판정대로 허용이다. 비공공 조직 건물은 0이다.

## 6. validate
- `npm run validate:content`: **실패 0**, 경고 **22건**.
  - 대상 id에 걸린 경고는 `centrism`(description 166자)·`nowandhere-defense-minister`(168자) 2건이다. 둘 다 HEAD 때부터 있던 description 길이 경고이고 이미지 경고가 아니다.
  - 이미지 형식·재사용·인접 경고 0. 집계는 `public 1 · open 56 · news 33`이다.

## 7. 운영 기록·저장소 독립
- 업로더 30 트리거·오더·이 오더에서 사진 저작자 개인 이름(공유마당 저작(권)자, 위키미디어 2장의 저작자 값)을 대조했다 → **0**.
- 실명·옛 id·다른 서비스명·계정·홈·임시 절대경로 0이다. 업로더 트리거에는 "대한민국 국군" 계정 표시명이 있는데, 이는 기관 이름이라 문제없다.
- 업로더 트리거의 사실 오류(P3-4):
  - "상세 본문을 철원 … grep 0건": 실제로는 키워드 칸 5/5에 있다.
  - "184(DA)·187(DB) 3칸": 실제로는 185·186·188(업로더 기준 184·185·187)이다.

## P 목록
- **P2-1 DMZ 철책 12건 이미지 불가 → 이번 커밋에서 제외**
  - 근거: 원 페이지 키워드 "강원도·철원"(1-1). 사고 지점은 파주 서부전선, 15사단은 보류(1-2).
  - 수정안: 각 ko image 블록 15줄과 en 2줄(아래 줄 범위)을 되돌리고, `public/images/{id}/` 폴더를 지운다. 이미지 추가분만 있었으므로 되돌리면 HEAD와 같다.
    - `content/posts/2026-09-20-nowandhere-mdl-mine-briefing-reel.md:13-27` · en `:5-6`
    - `content/posts/2026-09-21-centrism-dmz-summary.md:13-27` · en `:5-6`
    - `content/posts/2026-09-21-oreunboy-dmz-mine-explosion.md:13-27` · en `:5-6`
    - `content/posts/2026-09-23-jeichi-nk-mdl-crossing.md:10-24` · en `:5-6`
    - `content/posts/2026-09-26-rekor-dmz-dispute.md:11-25` · en `:5-6`
    - `content/posts/2026-09-26-wikipost-dmz-injury-rumor.md:10-24` · en `:5-6`
    - `content/posts/2026-09-27-shindawit-nisi-mine-summary.md:10-24` · en `:5-6`
    - `content/posts/2026-09-28-todayissuepicks-dmz-hand-pick-escape.md:10-24` · en `:5-6`
    - `content/posts/2026-09-29-finf-jcs-terrain-change-year.md:10-24` · en `:5-6`
    - `content/posts/2026-09-29-nowandhere-defense-minister-nk-responsibility.md:10-24` · en `:5-6`
    - `content/posts/2026-09-30-2pro-unc-armistice-violation.md:10-24` · en `:5-6`
    - `content/posts/2026-10-01-rekor-15div-mine-field.md:10-24` · en `:5-6`
  - 대안:
    - 원 페이지(설명·제목·키워드·분류) 어디에도 구역이 없는 철책 사진을 찾는다.
    - 또는 기획자가 "키워드는 구역 특정이 아니다"로 정하면, 그때 12건을 다시 판정한다. 그 경우에도 1-3의 반복 노출 문제는 따로 다뤄야 한다.
- **P3-1 2708 창작년도(2022, 편집일) ↔ EXIF 촬영일 2009**: 다시 쓸 때 caption 연도와 "현재 모습" 문구를 정한다(기획자).
- **P3-2 경찰청 caption "서울 경찰청"**: 서울특별시경찰청과 헷갈린다. 수정안은 `경찰청 본관(서울 서대문구, 2017)`이다(`ego-police`·`yeong573` ko caption 줄). 커밋 전에 고치기를 권한다.
- **P3-3 청와대 2022 개방기 사진**: ko·en caption에 "현재 모습과 다를 수 있습니다." / "It may differ from how it looks today." 추가를 권한다(`toktok`·`alaska`).
- **P3-4 업로더 트리거 검증 기록 오류**: 키워드 칸 누락(구역 검사 방법의 빈틈)과 인접 위치가 틀렸다.
  - 다음 업로더 지침에 "공유마당은 키워드 칸까지 확인"을 넣는다.
- **P3-5 정책 명문화 요청(기획자)**:
  - 3a 구역 특정 범위에 키워드·태그·분류를 포함하는가
  - 리뷰 74 P3-4(구역 게시물의 같은 구역 사진)
  - R10 GOP와 남방한계선을 같게 볼지(해안·섬 제외)
  - R7 장소 확인 출처 1건 추가 허용

## 직접 연 URL
- `https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn={13320619·13320620·13320621·13320627·13320631}&menuNo=200018` + 각 미리보기 `…/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=…&thumbSe=b_tbumb…`
- `https://commons.wikimedia.org/w/index.php?title=File:{DMZ_2700·2701·2702·2708·2712·Blue_House_Seoul_3·Korean_National_Police_Agency_Building05}.jpg&action=raw` 와 같은 7개의 `w/api.php?…prop=imageinfo`(url·size·sha1·extmetadata, 1920px 축소본) → `upload.wikimedia.org` 원본과 1920px 축소본
- Commons 검색 API(`intitle:"DMZ 27xx"`, `incategory:"Photographs_by_the_Republic_of_Korea_Armed_Forces" DMZ`)와 15사단 DMZ 수색작전 사본 1장(1200px)

## 최종 커밋 경로 (P2-1 처리 뒤)
게시물(ko·en):
- `content/posts/2026-09-30-toktok-lee-classified-doc-sns.md` · `content/posts-en/2026-09-30-toktok-lee-classified-doc-sns.md`
- `content/posts/2026-10-02-alaska-lng-vs-dmz-mine-response.md` · `content/posts-en/2026-10-02-alaska-lng-vs-dmz-mine-response.md`
- `content/posts/2026-09-22-ego-police-republic-concern.md` · `content/posts-en/2026-09-22-ego-police-republic-concern.md`
- `content/posts/2026-10-13-yeong573-police-bodycam-china.md` · `content/posts-en/2026-10-13-yeong573-police-bodycam-china.md`
- `content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md` · `content/posts-en/2026-09-30-shindawit-nk-mdl-50-crossings.md`

이미지 폴더:
- `public/images/2026-09-30-toktok-lee-classified-doc-sns/`
- `public/images/2026-10-02-alaska-lng-vs-dmz-mine-response/`
- `public/images/2026-09-22-ego-police-republic-concern/`
- `public/images/2026-10-13-yeong573-police-bodycam-china/`
- `public/images/2026-09-30-shindawit-nk-mdl-50-crossings/`

기록:
- `docs/triggers/uploader-30-a2-batch-5-max-sweep-COMPLETE.md`
- `instructions/uploader/processed/30-a2-batch-5-max-sweep.md`
- `docs/triggers/reviewer-75-uploader-30-review-COMPLETE.md`
- `instructions/reviewer/processed/75-uploader-30-review.md`

뺄 것 — git status와 대조:
- P2-1 12건의 ko·en `M` 24개와 `public/images/` `??` 폴더 12개
- `gotdemcatch` 2파일과 그 poster 트리거, `attendkdz` 2파일과 그 poster 트리거
- `docs/supervisor/drafts/…`, poster-hold 트리거 2개, tester-01 관련(핸드오프·qa·tools·트리거·processed 오더), `docs/tools/{designer-03,designer-05,planner-07,programmer-14,reviewer-31}/…`, `history/*`
