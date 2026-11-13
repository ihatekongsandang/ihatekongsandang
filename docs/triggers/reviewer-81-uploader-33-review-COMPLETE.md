# reviewer-81 — 업로더 33(§4.5-3e 2건 + 국회 06T003 연작 정리) 검토 — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-13 · 하위 에이전트
- 한 일: 검토만 했다. 파일 수정·git 쓰기·빌드는 하지 않았고 `validate:content`만 실행했다.
- 오더: `instructions/reviewer/processed/81-uploader-33-review.md`(이동)
- 기준: 정책 §4.5(개정 23·23-1 — 3e, 6 ⑤ 연작 = 같은 대상지 촬영 묶음), §4.5-4(caption 연도·옛 모습), guide §4-1, 리뷰 80
- 수정한 파일: 이 트리거뿐. 원본은 저장소 밖 scratch에서 받았다. 사진 저작자 이름·계정명은 쓰지 않는다.
- 대상 아님: 작업 트리의 `gotdemcatch`·`attendkdz` 변경, `docs/supervisor/drafts/…`(다른 세션)

## 판정: ✅ **통과** — P1 0 · P2 0 · P3 3
- farmland ✅, hagonolza ❌ 판정 타당, 06T003 교체 3건 ✅, validate R=0·경고 22·새 경고 0이다.
- P3는 모두 선택 수정이다. 커밋을 막지 않는다.

## 1. farmland — `2026-09-28-geonwoo-farmland-bank-expansion` ✅ (§4.5-3e)
### 1-1. 라이선스·원본
- `File:Government_Complex_Sejong_20190611_06.jpg`의 원문(`action=raw`)과 API를 열었다.
  - 설명 "정부세종청사 5동 농림축산식품부의 모습", `{{own}}`, `{{self|cc-by-sa-3.0}}`다.
  - API는 LicenseShortName "CC BY-SA 3.0", LicenseUrl `creativecommons.org/licenses/by-sa/3.0`이다.
  - 삭제·침해 틀은 없다 ✅
- 저작자: 파일 정보 author 칸이 `creditName`과 일치한다(본인 촬영) ✅. 이름은 frontmatter에만 있다.
- 촬영일: EXIF DateTimeOriginal 2019-06-09 = 페이지 date → caption 2019, `workYear` 2019 ✅
  - 파일 제목의 "20190611"은 업로드 묶음 표기다. 영향 없다.
- 원본 대조: 원본 6000×4000을 1920×1280으로 줄이면 저장본과 채널 평균 차이 1.5~2.8이다(리샘플 수준).
  - 가로세로비가 같아 **자르기·색 변형이 없다** ✅. 1920px 축소본과도 같은 구도다.
- 메타데이터: 저장본은 EXIF 0, XMP 0, IPTC 0, COM 0(JFIF만)이다 ✅. 원본에 Copyright 필드는 없었다(업로더 기록과 같다).

### 1-2. 사진 (Read + 원본 1:1 하단 좌·우 확인)
- 사람·얼굴 0명이다. 울타리 안 놀이시설에도 사람이 없다 ✅
- 덧씌운 글자·워터마크 0, 짧은 변 1280이다 ✅
- 외벽 간판 "농림축산식품부"와 "5동-3"은 실물 표지라 §4.5-7 대상이 아니다.
- **울타리의 '해양수산부' 표지**(정부 상징 + 글자 판, 원본 하단 왼쪽 약 1/3 지점):
  - 지붕 간판 "농림축산식품부"가 화면 위쪽에 더 크게 읽히고, caption이 "농림축산식품부 청사"로 대상을 밝힌다. 다른 기관 건물로 오해될 위험은 낮다.
  - 사진 시점에는 5동을 두 부처가 함께 썼고, 지금은 사정이 다르다고 보도됐다. "현재 모습과 다를 수 있습니다."가 이 차이를 덮는다 ✅
  - 카드에는 caption이 없지만 표지가 작고 아래쪽에 있다. 제목(농지·농지은행)과 해수부가 결합할 여지도 없다. 허용한다.
  - 다만 alt에 이 표지가 빠져 있다(P3-2, 선택).

### 1-3. §4.5-3e 조건 대조 (본문 인용)
| 조건 | 근거(게시물 줄) | 판정 |
|---|---|---|
| ① 법·제도·예산·행정 조치 | 제목 "농지 전수조사와 농지은행 예산 확대 비판" — 주제가 예산·행정 조치다 | ✅ |
| ② 제목·요약 + 본문 2곳 | 요약 :4 "2027년 농식품부 예산안" · 본문 :57 "농식품부 2027년 예산안(22조2215억원)에서" — 약칭 같은 기관 | ✅ |
| ③ 관계 문장 | :57 "농식품부 2027년 예산안 … 관련 예산은 … 4540억원 증가한 것으로 보도됨" → 편성 관계를 글자로 적음 | ✅ |
| ④ 주 담당 1곳 | 농식품부. :58 한국농어촌공사(농지은행)는 매수 청구 창구로, 예산 편성 주체와 동등하지 않다 | ✅ |
| ⑤ 청사 특정 | 원 페이지 설명 "정부세종청사 5동 농림축산식품부" + 지붕 간판 | ✅ |
| ⑥ §4.5 사진 조건 | 라이선스·사람 0·1280px·첫 사용·caption 연도 | ✅ |
| 제외 대상 | 정당·인물 발언 아님(:59 장동혁 대표 발언은 보도 한 줄이고 주제가 아님). 당사자형(위법·제재) 아님. "개인 SNS 글"은 정책이 효과 칸에서 이 게시물(농지은행 예산)을 ✅로 센 것과 같이, SNS 출처 게시물 전체가 아니라 SNS 주장 진위 자체가 주제인 경우로 읽는다 | ✅ |
| §4.5-5·오도 방지 | 제목은 정책 비판 인용형이다. 기관의 위법·부정 단정이 아니고, 기관이 발표 주체로 읽히지 않는다. caption에 "입장·행위를 뜻하지 않습니다"가 있다 | ✅ |

### 1-4. caption·영어
- ko :14 "자료사진: 농림축산식품부 청사(2019) — 이 사건 당시 사진이 아닙니다. 농지은행 관련 예산 편성은 이 기관 소관입니다. 이 기관의 입장·행위를 뜻하지 않습니다. 현재 모습과 다를 수 있습니다." — §4.5-3e 형식 순서 그대로다 ✅
- en(159자, 160 이내 ✅) "Archive photo: Farm Ministry (2019) — … Budget is its job. Not the agency's position. It may differ from how it looks today."
  - "Farm Ministry"는 뜻은 통한다. 그러나 정책 예시 형식 `{agency} building`과 다르고, 국내 영어 매체의 통용 약칭은 "Agriculture Ministry"다.
  - "Budget is its job."은 어느 예산인지가 빠져 모호하다(P3-1).
- `updatedAt` 변화 없음(diff에 이미지 2줄·15줄 추가만) ✅

## 2. hagonolza — `2026-09-20-hagonolza-constitution-amendment-points` ❌ 판정 타당
- 본문의 "국회" 8회는 모두 개헌 **내용**(국회 권한 강화)이다. 심의·의결 관계를 적은 유일한 문장은 "5월 7일 본회의 표결은 … 불성립"인데, 기관 이름이 없다 → ③ 미충족. 업로더 판정이 맞다 ✅
- 추가로, 고쳐도 남는 문제가 둘 있다.
  - ④ **주 담당 1곳이 애매하다.** 대통령 제시(:52), 여야 6당 발의(:53), 국회 표결, 총리 답변이 함께 나온다.
  - **오도 위험**: 제목에 "국회 권한 강화"가 있어, 국회 사진과 결합하면 국회가 스스로 권한 강화를 추진하는 것처럼 읽힐 수 있다(카드에는 caption이 없다).
  - 그래서 "본회의 → 국회 본회의"로 고치더라도 ❌가 맞다고 본다.
- **의견(사실 보완 여부)**:
  - 출처 MBC 리포트(직접 열람)는 "**국회 본회의** 첫 안건으로 상정된 대한민국 헌법 개정안"으로 적었다. 따라서 "국회 본회의"로 적는 것 자체는 출처 표현 그대로라 사실 보완으로 볼 수 있다.
  - 그러나 이미지 규칙을 맞추려는 목적의 본문 수정은 슈퍼바이저 판단대로 하지 않는 것이 맞다. 위 ④·오도 위험 때문에 고쳐도 사진을 붙일 근거가 되지 않는다.
  - 사실 보완만을 위해 고친다면 이미지와 무관하게 별도로 하고, 그 경우 `content/README.md`의 `updatedAt` 규칙을 따른다.
- 게시물 파일은 바뀌지 않았다(git status에 없음) ✅

## 3. 06T003 교체 3건 ✅
| 게시물 | 새 원본(원 페이지 직접 열람) | 원본 대조 | 사람 | caption |
|---|---|---|---|---|
| `2026-09-15-joojinwoo-kimseungwon-hearing` | node/48515 · 05T05708Ba4053 · 촬영 2015/4 · 양화대교 여의 하류 · 대상지 국회의사당 · `licenses/by/4.0/deed.ko` | 원 사이트 표시본(`/photos/05T05708Ba4053.jpg`)과 **SHA-256 동일**, 900×600 | 0(Read로 확인, 물 위 부표만) | 2015 → 10년 이상 → 현재 모습 문구 ✅ |
| `2026-09-27-hoon2-jeonhyunhee-land-lease` | node/43192 · 04T00301db4000 · 촬영 2010/4 · 대상지 국회의사당 · 같은 CC BY 4.0 링크 | 원 사이트 표시본과 **SHA-256 동일**, 900×600 | 0(앞마당 주차 차량만) | 2010 → 현재 모습 문구 ✅ |
| `2026-09-28-instagram-chief-justice-audit-witness` | node/62584 · 06T05004Dc40053 · 2020/10 | 커밋된 `2026-11-04-leejinsook-…` 저장본과 **SHA-256 동일**(리뷰 74에서 대조 완료) | 0 | ko caption은 기존 "(2020) — 이 사건 당시 사진이 아닙니다." 그대로이고 62584도 2020이라 맞다 ✅ |

- 메타데이터:
  - 48515·43192 저장본은 EXIF·XMP·IPTC 0, 인코더 주석 1개다.
  - 62584는 기존 커밋분과 같은 파일이다. 기관 Copyright·촬영 설정·IPTC 날짜·키워드만 있고 개인정보 필드는 0이다(리뷰 74 확인과 같다) ✅
- alt는 새 사진에 보이는 것으로 고쳐졌다(ko·en). `updatedAt`은 3건 모두 diff에 없다 ✅. en caption 연도도 ko와 같다.
- **집계 — 직접 다시 셈**(작업 트리 211건, `publishedAt` 내림차순·같은 날 id 오름차순, 서울연구데이터서비스 국회 사진):

| 연작(촬영 묶음) | 사용 | 피드 위치 | 최소 간격 |
|---|---|---|---|
| 06T003 | **8** (≤8 ✅) | 15·72·80·91·108·113·157·179 | **5** (108→113) ✅ 경계값 |
| 05T010 | 3 | 1·83·206 | 82 |
| 06T050 | 3 | 10·152·205 | 53 |
| 05T057 | 1 | 111 | — |
| 04T003 | 1 | 138 | — |
| 05T011(의원회관, 대상지 별도) | 2 | 182·191 | 9 |

- 같은 원본 최대 사용 3건(48322·62584) ✅
- 국회의사당 A-2 16건, 서로 다른 원본 **9장** ≥ max(3, 6) ✅
- 업로더 표와 숫자가 모두 같다.
- 참고: 108·111·113은 서로 다른 연작이라 규칙 위반이 아니다. 다만 피드 6칸 안에 국회 사진 세 장이 보인다(P3-3).

## 4. validate
- `npm run validate:content`: **R=0**, 실패 0, 경고 **22건**(직전과 같다)이다.
- 대상 4개 id에 걸린 경고는 0이다(새 경고 0). 집계는 `public 1 · open 54 · news 33`, 211건이다.

## 5. 저장소 독립·민감정보
- 업로더 33 트리거, 업로더 오더(processed), 이 오더, 이 트리거에서 다음을 대조했다: 위키미디어 파일 정보의 저작자 표기(사용자명·표시명·분류의 이름 3종), 홈·임시 경로, 사용자 계정.
- 결과는 0이다. 다른 서비스명·옛 id도 0이다.

## P 목록 (모두 선택)
- **P3-1 farmland 영어 caption 표현**
  - 위치: `content/posts-en/2026-09-28-geonwoo-farmland-bank-expansion.md:6`
  - 수정안(159자): `Archive photo: Agriculture Ministry (2019) — not taken at the time of this event. It drafts this budget. Not its stance. It may differ from how it looks today.`
  - "Farm Ministry"를 국내 영어 매체 통용 약칭으로 바꾸고, 어느 예산인지 알 수 있게 한다.
- **P3-2 farmland alt에 울타리 표지 누락**
  - 위치: ko :13, en :5
  - 사진에 보이는 '해양수산부' 울타리 표지를 적으면 alt 원칙("보이는 것만")에 더 맞다.
  - 예: `'농림축산식품부' 글자가 걸린 곡선형 유리 외벽 청사와 앞쪽 나무들, 울타리의 '해양수산부' 표지`
  - 오해 위험은 caption이 이미 덮으므로 선택이다.
- **P3-3 국회 사진의 피드 근접(규칙 밖)**
  - 108(06T003)·111(05T057)·113(06T003)이 서로 다른 연작이라 규칙 위반은 아니다. 다만 피드 6칸 안에 국회 사진 세 장이 보인다.
  - 06T003의 최소 간격도 정확히 5칸 경계값이다. 새 게시물이 이 구간(9월 14~16일)에 들어오면 깨질 수 있다.
  - 다음 국회 사진 작업 때 업로더가 이 구간을 다시 센다.

## 직접 연 URL
- `https://commons.wikimedia.org/w/index.php?title=File:Government_Complex_Sejong_20190611_06.jpg&action=raw`와 같은 파일의 `w/api.php?…prop=imageinfo`(extmetadata·1920px) → `upload.wikimedia.org` 원본·1920px 축소본
- `https://data.si.re.kr/node/48515` · `/node/43192`와 각 표시본 `/sites/default/files/photos/{05T05708Ba4053,04T00301db4000}.jpg`
- `https://imnews.imbc.com/replay/2026/nwdesk/article/6820749_37004.html`(hagonolza 출처, "국회 본회의" 표현 확인)

## 최종 커밋 경로
- `content/posts/2026-09-28-geonwoo-farmland-bank-expansion.md` · `content/posts-en/2026-09-28-geonwoo-farmland-bank-expansion.md` · `public/images/2026-09-28-geonwoo-farmland-bank-expansion/thumb.jpg`
- `content/posts/2026-09-15-joojinwoo-kimseungwon-hearing.md` · `content/posts-en/2026-09-15-joojinwoo-kimseungwon-hearing.md` · `public/images/2026-09-15-joojinwoo-kimseungwon-hearing/thumb.jpg`
- `content/posts/2026-09-27-hoon2-jeonhyunhee-land-lease.md` · `content/posts-en/2026-09-27-hoon2-jeonhyunhee-land-lease.md` · `public/images/2026-09-27-hoon2-jeonhyunhee-land-lease/thumb.jpg`
- `content/posts/2026-09-28-instagram-chief-justice-audit-witness.md` · `content/posts-en/2026-09-28-instagram-chief-justice-audit-witness.md` · `public/images/2026-09-28-instagram-chief-justice-audit-witness/thumb.jpg`
- `docs/triggers/uploader-33-topic-agency-and-series-cleanup-COMPLETE.md`
- `instructions/uploader/33-topic-agency-and-series-cleanup.md`(삭제로 표시됨) + `instructions/uploader/processed/33-topic-agency-and-series-cleanup.md`(이동)
- `docs/triggers/reviewer-81-uploader-33-review-COMPLETE.md` · `instructions/reviewer/processed/81-uploader-33-review.md`
- 제외:
  - `gotdemcatch`·`attendkdz` 파일과 그 poster 트리거
  - `docs/supervisor/drafts/2026-09-28-held-recheck.md`, poster-hold 트리거 2개
  - tester-01 관련 파일, `docs/tools/planner-07/…`, `history/*`(업로더 항목은 슈퍼바이저가 기존 방식대로 판단)
