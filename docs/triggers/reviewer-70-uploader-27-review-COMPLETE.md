# reviewer-70 — 업로더 27 검토 (인물 없는 자료사진 A-2 묶음 2, 12건) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11 · 하위 에이전트 · 검토만(파일 수정·git 쓰기 0, 빌드 없음)
- 오더: `instructions/reviewer/processed/70-uploader-27-review.md`(이동). 참고: 리뷰 69 트리거
- 대상: 업로더 27 트리거, 게시물 12쌍, `public/images/{id}/` 12개. 🔴 `2026-10-09-gotdemcatch-lee-five-trials-suspended`는 지시대로 검토하지 않았고 커밋 경로에서도 뺐다.
- 수정한 파일: 이 트리거뿐. 원본 내려받기와 메타데이터 검사는 저장소 밖 scratch에서만 했다.
- 이 기록에는 사진 저작자 개인 이름·Flickr 계정명을 쓰지 않는다(저작자는 "개인/기관"으로만 적음).

## 판정: 🟡 **조건부 통과** — P1 0 · P2 1 · P3 4
- **11건 통과.**
- **1건(#12 `tessa`)은 불가**(P2-1). 그 게시물의 이미지를 빼면(대체 카드) 나머지 11건을 커밋할 수 있다.

## 0. 경계 사례 4건 판정
| 사례 | 판정 | 근거 |
|---|---|---|
| #12 `2026-11-08-tessa-gop-fence-animal-judgment` — 파주 임진각 민통선 철책 사진을 철원 GOP 철책 사건에 사용 | ❌ **불가** | ① **대상이 다르다**: 게시물 주제는 **GOP 철책**(전방 경계 철책)이고, 사진은 **민간인출입통제선 철책 + 초소 + 임진강 철교**다. 철책 종류도 지역(파주 ↔ 철원)도 다르다. 정책 §4.5-3의 "다른 지점의 풍경은 불가"에 해당하고, 특정 지점 예외는 "DMZ 일반 풍경"에 한한 것이라 이 경우에 맞지 않는다. ② **결합 위험**(§4.5-5): 제목이 "군이 광망 절단 경보를 '동물에 의한 절단'으로 판단"이라는 군 판단 비판이다. 군 초소·철책 사진이 붙으면 그 현장 사진처럼 읽힌다. ③ 업로더도 "애매하면 불가에 가깝다"고 적었다 → §4.5-3 "애매하면 불가" |
| #5 `2026-10-29-news1-china-53-vessels-taiwan-warning` — 국가안전회의 비서장 발표, 사진은 총통부 | ✅ **허용** | 대만 국가안전회의는 총통부와 **같은 건물에서 함께 집무**한다(중국어 위키백과 국가안전회의 항목 정보 상자: 주소 = 총통부 주소, 비고 "與總統府合署辦公"). 그래서 발표 장소를 몰라도 **그 기관의 건물**이다. 제목은 중국 함정 위협 경고 — 총통부·NSC가 비난 대상이 아니다 |
| #10 `2026-09-10-freedominnovation-nec-bill` — 법안 발의 비판 게시물, 국회 사진 | ✅ **허용(경계 기록 유지)** | 비판 대상은 특정 정당 의원들의 발의다. 국회는 업무 무대(§4.5-3 예시 "국회 법안 게시물 → 국회의사당")다. 제목은 발의 사실을 따옴표로 전하는 형식이고 국회의 위법을 단정하지 않는다. 리뷰 69 P3-4 선례와 같다 |
| #11 `2026-07-12-judypia-real-estate-supervisory-bill` — 법안 반대 릴스, 국회 사진 | ✅ **허용(경계 기록 유지)** | 제목은 "반대 릴스 — 원안 철회 후 … 재발의"로 사실 전달형이다. "사찰법" 표현은 설명(description) 속 게시자 주장 인용일 뿐 제목에 없다. 국회는 업무 무대 |

- **외국 건물**: #4 미국 의회 의사당 — 게시물은 미 하원 중국특위 위원장 서한과 상·하원 군사위 요구를 다룬다. 업무 무대인 같은 기관이고, 제목의 비판 대상은 한국의 대중 행보다(의회 아님) → ✅. #5는 위와 같다.
- **Flickr 이전 파일 검증 틀**(파일 페이지 위키 원문을 직접 확인):
  - G 총통부: `{{cc-by-2.0}}` + `{{FlickreviewR|status=passed|…}}`. 원 Flickr 페이지를 직접 열어 보니 **지금도 CC BY 2.0**(라이선스 링크 `creativecommons.org/licenses/by/2.0/`)이다 ✅
  - M 임진각: `{{cc-by-2.0}}` + `{{flickrreview|…|2013-02-08}}`(이전 도구가 이전할 때 원 라이선스를 기록한 검토 틀). 원 Flickr 페이지는 **지금 404**라 원 라이선스를 다시 볼 수 없다. CC 라이선스는 철회할 수 없어 2013년 검토 기록으로 충분하다고 본다. 다만 #12가 불가라 이번에는 쓰이지 않는다(P3-1 기록)
- **같은 원본 3건 한도**: a339b3b 사용분을 포함해 작업 트리 전체 open 20건의 `sourcePageUrl`을 직접 셌다.
  - 서울 사진: 62226 → 3 · 62227 → 3 · 62222 → 2 · 62224 → 2 · 60732 → 2 · 62584 → 1 · 60607 → 1
  - 위키미디어: E(도라전망대) → 3 · F → 1 · G → 1 · M → 1
  - **모두 3건 이하**이고 업로더 표와 맞다. #12를 빼면 M은 0건이 된다.

## 1. 라이선스 (원 페이지 직접 열람)
| 키 | 원 페이지 | 확인한 것 | 결과 |
|---|---|---|---|
| E | 위키미디어 `File:North_Korea_from_the_Dora_Observatory,_December_2018.jpg` | 위키 원문 `{{self|cc-zero}}`, `source={{own}}`(본인 촬영), API 라이선스 "CC0". 삭제·저작권 침해 틀 없음 | ✅ CC0 1.0 |
| F | `File:United_States_Capitol_(2024).jpg` | `{{self|cc-by-4.0}}`, `{{own}}`, API "CC BY 4.0", 원본 4608×3456 | ✅ CC BY 4.0 |
| G | `File:Presidential_office_building_(Taipei,_Taiwan_2017)_(38638559425).jpg` | `{{cc-by-2.0}}`, FlickreviewR passed, Author = Flickr 원 게시자(개인), 원 Flickr 지금도 CC BY 2.0 | ✅ CC BY 2.0 |
| M | `File:Civilian_Control_Line,_Imjingak,_Paju,_South_Korea_(3162648972).jpg` | `{{cc-by-2.0}}`, flickrreview 2013, Author = Flickr 원 게시자(개인), 원 Flickr 404 | ✅(기록상) — #12 불가로 미사용 |
| J | `https://data.si.re.kr/node/62222` | 통합코드 06T00301Dc22000, 촬영 2020/02, 대상지 국회의사당, CC BY 4.0 배지 링크(`licenses/by/4.0/deed.ko`) + 저작권 표기방법 안내(리뷰 69가 글자로 확인한 같은 서비스 공통 문구) | ✅ CC BY 4.0, 기관 |
| K | `https://data.si.re.kr/node/62224` | 06T00303Dc22000, 2020/02, 국회의사당, 같은 배지 | ✅ |
| L | `https://data.si.re.kr/node/60732` | 06O02305Dc22000, 2020/06, 대상지 법조단지, 세부대상지에 서울고등법원·서울중앙지방법원·서울법원종합청사, 같은 배지 | ✅ |

## 2. 사진 (저장 파일 12개 모두 Read로 직접 열람 + 원본 대조)
- 같은 사진끼리 SHA-256이 같다: E 3개·J 2개·K 2개·L 2개. 그래서 고유 사진은 7장이다. 12개 파일은 모두 열었다.
- **원본 대조**:
  - E·F·M: 저장 파일이 위키미디어 원본(E)·축소본(F 1280px·M 960px)과 **바이트까지 동일**
  - G: 디코딩 픽셀이 원본과 **동일**(메타데이터만 다름)
  - J·K·L: 서비스 표시본(`/sites/default/files/photos6/{코드}.jpg`, 900px)과 디코딩 픽셀 **동일**
  - → 변형은 없다(리사이즈는 원 사이트의 축소본을 쓴 것뿐)
- **사람**:
  - E·J·K·L·M: 사람 없음(차량·새만)
  - F: 2층 발코니에 점 크기 인물 2명(얼굴 몇 px / 짧은 변 960 → 1% 미만) ✅
  - G: 건물 앞 도로에 차량만 있다. 사람은 있더라도 점 크기라 1% 미만이다 ✅
  - 군인·경찰 복장 없음. M 초소에도 사람 없음
- **공사 중·옛 모습**: 없음. 짧은 변 560~960px로 모두 400px 이상. 워터마크·로고·덧씌운 글자 없음. G의 가로등 현수막은 글자를 읽을 수 없다.
- **메타데이터**(값은 옮기지 않고 태그 이름만 확인, 저장소 밖 스크립트):
  - 저장 파일 12개 모두 EXIF Artist·XPAuthor·MakerNote·UserComment·CameraOwnerName·BodySerialNumber·GPS IFD **0**, XMP `dc:creator`·`aux:SerialNumber`·`dji:Gps*`·`dji:SelfData` **0**, IPTC By-line(2:80)·위치 항목 **0**
  - 원본 G에는 Artist·MakerNote·UserComment·GPS가, J 원본에는 BodySerialNumber·GPS·`aux:SerialNumber`·`dji:GpsLatitude/Longitude`·`dji:SelfData`가 있었고, 저장본에서는 지워졌다(업로더 기록과 일치)
  - 남은 것:
    - EXIF Copyright(G·J·K·L): 저작권 고지라 CC BY "고지 유지" 취지에 맞는다. 형식 점검 결과 이메일·긴 숫자열·주소 없음
    - J·K·L의 XMP `drone-dji:Flight*/Gimbal*/RelativeAltitude`(기체 자세·상대 고도): 위치·개인 식별 정보가 아니라 허용
    - IPTC 2:25·2:55·2:60·2:62·2:63(키워드·날짜·시각)
    - COM 1개(바이너리 74B, 이메일·전화번호 형태 없음)

## 3. 반복 위험
- 같은 원본 한도는 지켰다(위 0절). 그러나 **국회의사당 자료사진이 open 20건 중 11건**이다(a339b3b 7 + 이번 J·K 4). 모두 같은 항공 연작이라 피드에서 비슷한 사진이 반복돼 보일 위험이 있다(P3-2).

## 4. 게시물 적합성 (건별)
| # | id | 사진 | 같은 대상 | 결합 위험 | 판정 |
|---|---|---|---|---|---|
| 1 | `2026-10-01-rekor-15div-mine-field` | E | DMZ 지뢰 위협 보도 → DMZ 일반 풍경, caption에 "사건이 일어난 지점도 아닙니다"(§4.5-3 특정 지점 규칙) | 비난 대상 기관 사진 아님 | ✅ |
| 2 | `2026-09-21-oreunboy-dmz-mine-explosion` | E | 서부전선 DMZ 사고 → DMZ 일반 풍경, 지점 아님 명시 | 부상자 등 사람 없음 | ✅ |
| 3 | `2026-09-28-todayissuepicks-dmz-hand-pick-escape` | E | 같음 | 같음 | ✅ |
| 4 | `2026-10-08-monarch-us-congress-ccp-influence-korea` | F | 미 의회 서한·요구 → 미국 의회 의사당 | 없음 | ✅ |
| 5 | `2026-10-29-news1-china-53-vessels-taiwan-warning` | G | 국가안전회의(총통부 합동 집무) → 총통부 | 없음 | ✅ |
| 6 | `2026-10-23-eodguri-kimyonghyun-drone-appeal` | L | 본문 "서울고법 형사1부" 항소심 → 서울법원종합청사(재판이 열린 법원, §4.5-5 허용) | 법원은 비난 대상 아님 | ✅ |
| 7 | `2026-07-28-geonwoo-yoon-final-statement-australia` | L | 본문 "서울중앙지법 형사합의22부" → 같은 청사 | 같음 | ✅ |
| 8 | `2026-09-15-joojinwoo-kimseungwon-hearing` | J | 국회 인사청문회 → 국회(업무 무대). 사진에 사람 없음(§3.1-1 후보자 사진 문제 없음) | 국회 비난형 아님 | ✅ |
| 9 | `2026-09-29-limjongdeuk-dmz-operation-criticism` | J | 국방위 질의 → 국회 | 비판 대상은 군 작전 | ✅ |
| 10 | `2026-09-10-freedominnovation-nec-bill` | K | 법안 발의 → 국회 | 0절 | ✅(경계) |
| 11 | `2026-07-12-judypia-real-estate-supervisory-bill` | K | 법안 → 국회 | 0절 | ✅(경계) |
| 12 | `2026-11-08-tessa-gop-fence-animal-judgment` | M | ❌ 다른 철책·다른 지역 | ❌ 군 판단 비판 + 군 초소 사진 | ❌ P2-1 |

## 5. frontmatter (ko·en 12쌍 diff 직접 확인)
- 각 ko 파일 +15줄(image 블록만), en 파일 +2줄(`imageAlt`·`imageCaption`만), 삭제 0. `title`·`description`·`updatedAt`·본문 변경 **0**(이미지 추가만이라 `updatedAt`을 바꾸지 않는 규칙과 맞다).
- 필드: `kind: open`·`src`·`alt`·`caption`·`creditName`·`creditNameEn`·`sourcePageUrl`·`sourceSiteName`·`license`·`licenseUrl`(CC 버전 경로 일치)·`workTitle`·`workYear`·`retrievedAt: 2026-11-11`·`faceNote: 얼굴 없음(자료사진·…)` 모두 있다.
- caption 형식 `자료사진: …(연도) — 이 사건 당시 사진이 아닙니다.`는 12건 모두 맞다. 10년 이상인 M(2008)에만 "현재 모습과 다를 수 있습니다." 문구가 있다(나머지는 2017~2024년). 길이는 ko 38~90자, en 81~159자(160자 이내).
- alt는 사진에 보이는 것만 적었고, 인물·의혹 서술이 없다.

## 6. validate
- `npm run validate:content` **R=0**, 경고 22건. 대상 12건 중 경고는 judypia(description 166자)·geonwoo-yoon(165자) 2건뿐이고 둘 다 작업 전부터 있던 것이다. 이미지 관련 경고(A-2 caption·연도·같은 원본·400px) **0**. `대표 이미지 종류: open 20`(8 + 12).

## 7. 운영 기록·저장소 독립
- 업로더 27 트리거·업로더 오더·이 오더에 사진 저작자 개인 이름(frontmatter `creditName` 개인 값 4개와 대조)·Flickr 계정 ID **0**. 저작자는 "개인/기관" 구분만 적혀 있다 ✅
- 같은 세 파일과 이 트리거: 다른 서비스명·계정·홈 경로·시스템 임시 절대경로 **0**, 옛 id(`moved-ids.txt` HEAD) **0**.

## P 목록
- **P2-1 #12 `tessa` 이미지 불가**(0절)
  - 수정안: 아래 셋을 지워 대체 카드로 되돌린다. 커밋 경로에서도 뺀다.
    - `content/posts/2026-11-08-tessa-gop-fence-animal-judgment.md` 13~27행(image 블록)
    - `content/posts-en/2026-11-08-tessa-gop-fence-animal-judgment.md` 5~6행(`imageAlt`·`imageCaption`)
    - `public/images/2026-11-08-tessa-gop-fence-animal-judgment/` 폴더
  - 업로더 27 트리거의 결과는 "성공 11"로 정정한다(트리거 기록 — 업로더나 슈퍼바이저 판단).
- **P3-1 원 Flickr가 사라진 이전 파일**: M처럼 원 Flickr 페이지가 404인 파일은 위키미디어의 이전 당시 검토 틀(flickrreview·FlickreviewR passed)을 근거로 삼는다.
  - 업로더 지침 단계 2-2에 다음을 적어 두기를 권한다: "원 Flickr가 없어졌으면 그 사실과 검토 틀 날짜를 트리거에 적는다. 검토 틀이 없으면 불가."
- **P3-2 국회의사당 사진 편중**: open 20건 중 11건이 같은 항공 연작이다.
  - 다음 묶음에서 국회 게시물은 남은 연작(06T00302·06T00304)이나 다른 각도·지상 사진을 먼저 찾는다. 그래도 같은 연작뿐이면 대체 카드도 고려한다.
  - 같은 연작 전체를 한 원본처럼 보는 피드 반복 기준(예: "같은 대상 같은 연작 n건")을 기획자에게 정해 달라고 권한다.
- **P3-3 총통부 판단 근거 기록**: #5의 허용 근거(국가안전회의·총통부 합동 집무)를 업로더 트리거 #5 행에 한 줄 보충하기를 권한다. 경계 표시 "발표 장소 미확인"만으로는 다음 검토자가 같은 조사를 반복해야 한다.
- **P3-4 경계 사례 기준 문서화**: "기관의 결정·법안을 비판하는 게시물 + 그 기관 건물 사진"이 리뷰 69 #6과 이번 #10·#11로 세 번째 허용이 됐다. 정책 §4.5-5에 다음 한 줄을 넣기를 권한다(기획자, 슈퍼바이저 판단 표기). "제목이 사실 전달형이면 허용, 기관의 위법·부정을 단정하는 제목이면 불가."

## 직접 연 URL
- `https://commons.wikimedia.org/w/index.php?title=File:North_Korea_from_the_Dora_Observatory,_December_2018.jpg&action=raw`(그리고 같은 방식으로 `United_States_Capitol_(2024).jpg`·`Presidential_office_building_(Taipei,_Taiwan_2017)_(38638559425).jpg`·`Civilian_Control_Line,_Imjingak,_Paju,_South_Korea_(3162648972).jpg`)
- `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=size|extmetadata|url&titles=…`(위 4개, 원본·축소본 주소와 라이선스)
- `https://upload.wikimedia.org/…`(E·G 원본, F 1280px·M 960px 축소본 — 대조용으로 내려받음)
- `https://www.flickr.com/photos/…/38638559425/`(G 원 Flickr — CC BY 2.0 확인), `https://www.flickr.com/photos/…/3162648972/`(M 원 Flickr — 404). 계정 경로는 기록하지 않는다
- `https://data.si.re.kr/node/62222` · `/node/62224` · `/node/60732`, 그리고 `https://data.si.re.kr/sites/default/files/photos6/06T00301Dc22000.jpg` · `06T00303Dc22000.jpg` · `06O02305Dc22000.jpg`
- `https://zh.wikipedia.org/w/index.php?title=國家安全會議_(中華民國)&action=raw`(국가안전회의 주소·총통부 합동 집무)

## 최종 커밋 경로 (gotdemcatch 제외 · P2-1 처리 뒤 — tessa 제외 11건)
게시물 ko·en 11쌍:
- `content/posts/2026-07-12-judypia-real-estate-supervisory-bill.md` · `content/posts-en/2026-07-12-judypia-real-estate-supervisory-bill.md`
- `content/posts/2026-07-28-geonwoo-yoon-final-statement-australia.md` · `content/posts-en/…`(같은 이름)
- `content/posts/2026-09-10-freedominnovation-nec-bill.md` · `content/posts-en/…`
- `content/posts/2026-09-15-joojinwoo-kimseungwon-hearing.md` · `content/posts-en/…`
- `content/posts/2026-09-21-oreunboy-dmz-mine-explosion.md` · `content/posts-en/…`
- `content/posts/2026-09-28-todayissuepicks-dmz-hand-pick-escape.md` · `content/posts-en/…`
- `content/posts/2026-09-29-limjongdeuk-dmz-operation-criticism.md` · `content/posts-en/…`
- `content/posts/2026-10-01-rekor-15div-mine-field.md` · `content/posts-en/…`
- `content/posts/2026-10-08-monarch-us-congress-ccp-influence-korea.md` · `content/posts-en/…`
- `content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md` · `content/posts-en/…`
- `content/posts/2026-10-29-news1-china-53-vessels-taiwan-warning.md` · `content/posts-en/…`

이미지 폴더 11개:
- `public/images/2026-07-12-judypia-real-estate-supervisory-bill/`
- `public/images/2026-07-28-geonwoo-yoon-final-statement-australia/`
- `public/images/2026-09-10-freedominnovation-nec-bill/`
- `public/images/2026-09-15-joojinwoo-kimseungwon-hearing/`
- `public/images/2026-09-21-oreunboy-dmz-mine-explosion/`
- `public/images/2026-09-28-todayissuepicks-dmz-hand-pick-escape/`
- `public/images/2026-09-29-limjongdeuk-dmz-operation-criticism/`
- `public/images/2026-10-01-rekor-15div-mine-field/`
- `public/images/2026-10-08-monarch-us-congress-ccp-influence-korea/`
- `public/images/2026-10-23-eodguri-kimyonghyun-drone-appeal/`
- `public/images/2026-10-29-news1-china-53-vessels-taiwan-warning/`

기록:
- `docs/triggers/uploader-27-a2-archive-photo-batch-2-COMPLETE.md`
- `instructions/uploader/processed/27-a2-archive-photo-batch-2.md`
- `docs/triggers/reviewer-70-uploader-27-review-COMPLETE.md`
- `instructions/reviewer/processed/70-uploader-27-review.md`

뺄 것:
- `2026-10-09-gotdemcatch-…`와 그 poster 트리거
- `tessa` 2파일·폴더(P2-1을 처리하면 HEAD와 같아진다)
- 다른 세션의 미추적 게시물·poster 트리거
- `docs/supervisor/drafts/…`
- `history/*`(슈퍼바이저 판단)
