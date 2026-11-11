# 업로더 28 완료 — 인물 없는 자료사진(A-2) 묶음 3

- 작성: 2026-11-11 · 반공-업로더 (Opus 5.5) · 오더 `instructions/uploader/processed/28-a2-archive-photo-batch-3.md`
- 결과: **성공 13건**(사진 9장, 새 원본 7장 — 28-1에서 `wendmag` 1건 되돌림). 목표 건수는 없었다. 이미지 없는 게시물 158건을 11월 → 10월 → 9월 → 그 이전 순서로 모두 훑었고, 허용 라이선스 안에서 대상이 맞는 것만 넣었다. open 이미지는 19건에서 32건으로 늘었다(28-1 반영).
- 출처 한정: 업로더 27과 같다(CC BY 2.0/3.0/4.0 버전 명시 · CC0 1.0 · 기증 CC BY 4.0). 퍼블릭 도메인·CC BY-SA·공공누리는 쓰지 않았고, 후보만 `docs/qa/uploader-28-candidates.md`에 적었다.
- 빌드·git 쓰기 없음. `src/`·설정 수정 없음. `gotdemcatch`·`attendkdz` 파일은 건드리지 않았다.

## 선행 문서 검토
업로더 27 오더와 그 선행 문서 전부 · 리뷰 70 트리거(P2 tessa 판정: 게시물 장소 ≠ 사진 장소면 불가, P3-2 국회 항공 연작 쏠림, P3-1 원 Flickr 없어진 파일, P3-3·P3-4 경계 사례 기록) · 업로더 27 트리거(실패 사유·참고 후보)

## 국회 사진 분산 (리뷰 70 P3-2)
- 항공 연작이 아닌 **지상·건물 높이 사진 2장**을 새로 썼다: Q1 국회의사당 정면(2014, 원 페이지 촬영 장소 표기 "건물 11층 옥상" — 건물 높이 사진)과 Q2 국회의원회관(2015, 도로 건너편 지상 촬영). 6건에 썼고, 28-1 뒤에는 5건이 쓴다(Q2 2건).
- 항공 연작은 아직 안 쓴 원본 06T00302(R) 1건만 썼다. 이미 쓴 연작(62222·62224·62226·62227)은 이번에 더 쓰지 않았다.
- 국회 사진은 open 33건 중 18건이다. 그중 항공 연작은 12건에서 나머지 6건은 지상 사진이며, 항공 연작 비중은 11/20에서 12/33으로 줄었다.

## 사진 9장
| 키 | 원 페이지 | 라이선스·버전 | 확인 위치·문구 | 저작자 구분 | 촬영 | 저장 해상도 | 용량(B) | 사람 확인 | 메타데이터 처리 | 사용(누적) |
|---|---|---|---|---|---|---|---|---|---|---|
| Q1 | https://data.si.re.kr/node/48322 (05T01004Dc8000, 대상지 국회의사당) | CC BY 4.0 | 상세 하단 CC BY 4.0 배지 링크(`licenses/by/4.0`) + 같은 서비스 공통 저작권 표기방법 안내 문구(시범·27과 같음) | 기관(서울특별시) | 2014/10 | 900×601(원본 그대로) | 166,804 | 오른쪽 아래 정문 앞 보도에 점 크기 인물 몇 명(얼굴 식별 불가, 1% 미만) | 원본에 EXIF·XMP·IPTC 없음 | 3 |
| Q2 | https://data.si.re.kr/node/48323 (05T01101Dc2000, 국회의원회관·제2국회의원회관·국회의사당) | CC BY 4.0 | Q1과 같음 | 기관 | 2015/1 | 900×601 | 225,800 | 사람 없음(도로의 차량만) | 원본에 메타데이터 없음 | 3 |
| R | https://data.si.re.kr/node/62223 (06T00302Dc12000, 국회의사당·헌정기념관) | CC BY 4.0 | Q1과 같음 | 기관 | 2020/02 | 900×618 | 276,616 | 사람 없음(차량만) | EXIF BodySerialNumber·GPS, XMP 일련번호·드론 위치·SelfData 제거, Copyright 유지 | 1 |
| L | https://data.si.re.kr/node/60732 (06O02305Dc22000, 법조단지) | CC BY 4.0 | 27과 같음 | 기관 | 2020/06 | 900×671 | 326,485 | 사람 없음 | 27과 같음. 저장 파일이 27 사용분과 SHA-256 같음 | 3 |
| N | https://data.si.re.kr/node/60734 (06O02307Dc72000, 법조단지 — 세부대상지 서울고등법원·서울중앙지방법원·서울법원종합청사) | CC BY 4.0 | Q1과 같음 | 기관 | 2020/06 | 900×672 | 342,520 | 사람 없음(높은 곳 촬영, 차량만) | R과 같은 필드 제거, Copyright 유지 | 2 |
| D | https://data.si.re.kr/node/60607 (06O00702Dc82000, 대법원) | CC BY 4.0 | 시범과 같음 | 기관 | 2020/06 | 900×618 | 292,590 | 사람 없음 | 시범(26-1)과 같음. 저장 파일이 시범 사용분과 SHA-256 같음 | 2 |
| X | https://data.si.re.kr/node/47222 (05O00802Dc8000, 검찰청 — 세부대상지 대검찰청·대법원·서울고등법원·서울중앙지방검찰청) | CC BY 4.0 | Q1과 같음 | 기관 | 2015/2 | 900×675 | 195,582 | 옥상에 점 크기 인물 2명(식별 불가, 1% 미만) | 원본에 메타데이터 없음 | 1 |
| S | 위키미디어 공용 `File:Signboard_of_Supreme_prosecutors_office_20261002_112214_HDR.jpg` | CC BY 4.0 | 라이선스 틀 `{{self|cc-by-4.0}}`, 출처 `{{own}}`(본인 촬영), 설명 "공소청 현판" | 개인(본인 촬영) | 2026-10-02 | 4624×3468 → 1280×960(위키미디어 축소본, 리사이즈만) | 536,764 | 사람 없음(현판과 돌기둥) | 축소본에 EXIF·XMP·IPTC 없음 | 1 |
| W | 위키미디어 공용 `File:Wonsan_waterfront_(2937890043).jpg` | CC BY 2.0 | 라이선스 틀 `{{cc-by-2.0}}` + 분류 "Flickr images reviewed by FlickreviewR"(Flickr 원 출처 검증) | 개인(Flickr 원 게시자 = Author 항목) | 2008-09-29 | 3648×2430 → 1280×853(위키미디어 축소본) | 224,263 | 물가 산책로에 흐린 점 크기 보행자 약 4명(얼굴 안 보임, 1% 미만) | 축소본에 메타데이터 없음 | 1 |
- 재업로드 아님: S는 업로더 본인 촬영. W는 Flickr 원 게시자의 사진을 옮긴 파일이고 FlickreviewR 검증 분류가 있다. 원 Flickr 페이지는 이번에 열지 않았다(리뷰 70 P3-1 기준으로는 검증 틀로 충분하다). 나머지 7장은 기관 자체 서비스의 원 저작물이다. 공유마당에서 옮긴 위키미디어 DMZ 사진은 재업로드라 뺐다.
- 서울연구데이터서비스 2014~2015년 사진(Q1·Q2·X)도 상세 페이지에 CC BY 4.0 배지가 있음을 노드마다 직접 확인했다(`photos/` 폴더 옛 연작).
- 워터마크·로고·덧씌운 글자: 9장 모두 없다(직접 열람). 대법원 정면 지상 사진(60610 등)과 서울중앙지검 지상 사진(60735)은 울타리에 현수막이 있어 쓰지 않았다(글자를 일부 읽을 수 있음).
- 10년 이상(현재 모습 문구 붙임): Q1(2014) · Q2(2015) · X(2015) · W(2008).
- 메타데이터: 26-1·27과 같은 방식(재인코딩 없이 해당 필드만 제거)이다. 9장 모두 처리 전후 압축 데이터·디코딩 픽셀 SHA-256이 같고, 개인정보성 필드(Artist·XPAuthor·GPS·일련번호·소유자명·MakerNote·dc:creator·By-line 등)는 0이다. 남은 필드는 이름만 적는다. R·L·N·D에는 EXIF(Copyright 포함 촬영 설정 태그), XMP(드론 자세·상대 고도), IPTC가 남아 있고, Q1·Q2·X·S·W에는 EXIF·XMP·IPTC가 없다. 값은 기록하지 않았다.

## 건별 기록
| # | id | 고른 이유(§4.5-3·5 점검) | 사진 | 바꾼 파일:줄 ko / en · 저장 | 결과 |
|---|---|---|---|---|---|
| 1 | `2026-08-12-citynewsmeme-parksangyong-oath-refusal` | 국회 국정조사 청문회 증인 선서 거부 → 국회가 업무 무대. 제목은 증인 행동 전달형이고 국회 비난이 아님 | Q1 | ko 이미지 블록(og: 바로 앞) / en `imageAlt`·`imageCaption`(description 바로 뒤) · `public/images/{id}/thumb.jpg` | 성공 |
| 2 | `2026-08-25-nowandhere-625-constitution-question` | 국회 예결위 질의·총리 답변(본문에 "국회 예산결산특별위원회") → 국회 | Q1 | 같음 | 성공 |
| 3 | `2026-09-29-osj17x-hankiho-president-instruction` | 국방위 긴급 현안질의(본문 명시) → 국회. 비판 대상은 대통령 지시 여부이지 국회가 아님 | Q1 | 같음 | 성공 |
| 4 | `2026-09-16-hagonolza-country-insult-bill` | 국회의원 대표 발의 형법 개정안(본문에 "정부안이 아니라 국회의원 발의안") → 국회 법안 게시물. 🟡 경계: 게시자가 법안을 비판(리뷰 70 #10·#11과 같은 유형, 제목은 물음표 사실 확인형) | Q2 | 같음 | 성공 |
| 5 | `2026-10-05-wendmag-cio-investigation-scope` | 법사위 소속 의원들의 개정안 추진(초안 단계) → 국회 법안 게시물. 🟡 경계: #4와 같은 유형(제목은 물음표형) | Q2 | 같음 | 성공 |
| 6 | `2026-09-22-emong-nk-contact-law` | 의원 발의 남북교류협력법 개정안 → 국회 법안 게시물. 제목은 사실 전달형 | Q2 | 같음 | 성공 |
| 7 | `2026-09-28-nakyungwon-mine-report-deletion` | 국회 기자회견(본문 명시) → 국회. 비판 대상은 군 보고서 삭제 경위 | R | 같음 | 성공 |
| 8 | `2026-08-06-owloffreedom-707-commander-sentencing` | 서울중앙지법 형사합의부 결심·선고(본문 명시) → 재판이 열린 법원 | L | 같음 | 성공 |
| 9 | `2026-09-24-sewodream-nk-agent-private-detective` | 서울중앙지법 형사합의21부 1심 선고(본문 명시) → 재판이 열린 법원 | N | 같음 | 성공 |
| 10 | `2026-09-16-idontknowpolitics-2023-warrant-dismissed` | 서울중앙지법 영장전담 판사의 영장 기각(본문 명시) → 그 법원. 제목은 검찰 주장과 기각 사실을 함께 전하는 형식이고 법원 비난이 아님 | N | 같음 | 성공 |
| 11 | `2026-09-17-idontknowpolitics-sergeant-leak-china` | 대법원 2부 징역 4년 확정(본문 명시) → 대법원 | D | 같음 | 성공 |
| 12 | `2026-09-30-20hoon-prosecution-abolition-victim-guide` | 검찰청 폐지·공소청 출범 안내 카드 → 공소청 현판이 주제와 일치. 사진은 출범일(10-02) 촬영으로 게시물(09-30)보다 뒤지만 caption에 "이 사건 당시 사진이 아닙니다" | S | 같음 | 성공 |
| 13 | `2026-09-21-kimmoonsoo-prosecution-abolition` | "서울 서초구 대검찰청 앞" 기자회견(본문 명시) → 세부대상지에 대검찰청이 있는 서초동 법조타운 사진. caption은 "대검찰청 일대"로 적음(사진 속 개별 건물은 특정하지 않음) | X | 같음 | 성공 |
| 14 | `2026-10-29-khan-nk-srbm-launch-wonsan` | 합참 발표 "원산 일대서 발사"(본문 명시) → 원산 시가지 해안. caption에 "발사 지점도 아닙니다" 명시(§4.5-3 특정 지점 규칙). 비난 대상 기관 없음 | W | 같음 | 성공 |

- 공통: `kind: open`, caption `자료사진: {대상}({연도}) — 이 사건 당시 사진이 아닙니다.`(+ 지점 아님·현재 모습 문장), `retrievedAt: 2026-11-11`, `faceNote: 얼굴 없음(자료사진·{대상})`. en에는 `imageAlt`·`imageCaption`(Archive photo: …)을 넣었다. caption 길이는 ko 38~75자, en 80~156자로 모두 160자 이내다. 저작자 표기는 frontmatter `creditName`에만 있다.
- 본문 문장과 `updatedAt`은 바꾸지 않았다.
- 같은 원본 3건 한도(26·27 사용분 포함): Q1 3 · Q2 3(28-1 뒤 2) · L 3(27의 2 + 이번 1) · N 2 · D 2(시범 1 + 이번 1) · R 1 · X 1 · S 1 · W 1. 모두 3건 이하다.

## 실패·제외 (이번에 검토한 대상)
| id | 대상 | 사유 |
|---|---|---|
| `2026-09-30-2pro-unc-armistice-violation` | 판문점·DMZ | 허용 라이선스 JSA 사진은 군인이 크게 보여 인물 조건 불가. DMZ 사진 E는 3건 한도 |
| DMZ 사건 게시물 5건(`wikipost-dmz-injury-rumor`·`rekor-dmz-dispute`·`shindawit-nisi-mine-summary`·`centrism-dmz-summary`·`shindawit-nk-mdl-50-crossings`) | DMZ 풍경 | 새 허용 후보는 양구 을지전망대 철책 사진(CC BY 2.0, 2008)뿐이다. 사건은 서부전선이라 리뷰 70 P2 기준(장소 불일치)으로 불가. `jeichi-nk-mdl-crossing`은 "동부전선 침범 ≠ 서부전선 폭발"이 주제라 더더욱 불가 |
| `2026-09-28-quickpolitics-song-yeonpyeong-bomb-remark` | 연평도 | 허용 라이선스 사진은 2010년 포격 사흘 뒤 미군 촬영 피해 현장 사진이라 사건 당시 현장처럼 읽힐 위험이 있음(§4.5-5). 검증 분류 없는 파일도 있음 |
| `2026-10-28-donga-nk-submarine-infiltration-drills` | 남포 | 허용 라이선스는 무관한 사진이나 레이더 위성 영상뿐 |
| `2026-09-28-themove-hongkong-umbrella-12th` | 홍콩 애드미럴티 | 허용 라이선스 후보 없음(BY-SA만 있음) |
| `2026-09-28-solsol-mexico-17-agreements` · `2026-09-26-neveragain-mexico-tariff-visit` · `2026-09-26-newsbanhana-lee-kexpo-mexico` | 멕시코 | 정상회담·박람회 장소가 게시물·출처에 구체적으로 적혀 있지 않음(추정 금지) |
| `2026-10-12-minkyuhantv-german-spy-chief` | 독일 BND | 허용 라이선스 없음(CC BY-SA 3.0 DE 지역판뿐). 썸네일 주장과 기관 건물이 결합할 위험도 있음 |
| `2026-09-17-hagonolza-changwon-spy-indictment` | 창원지법 | 세 검색처 모두 없음 |
| `2026-09-14-kimminsoo-spy-law-enforcement` · `2026-07-28-jeichi-amendment-term-claim` · `2026-07-04-idontknowpolitics-2018-freedom-deletion` | 국회 | 업무 무대가 국회로 특정되지 않음(시행 게시물·헌법 조문 해설·장소 미기재 의총). 국회 사진 쏠림도 고려해 보류 |
| `2026-10-12-conpoli88-parkjiwon-nk-remittance-nis` | 대법원·국정원 | 인물 경력이 주제라 기관 사진과 결합하면 인물 비난 사진처럼 읽힐 위험 |
| 청와대·통일부·국방부·합참·경찰 등 기관 게시물 | 각 기관 | 서울연구데이터서비스 청와대 사진은 CC BY 4.0이지만, 해당 게시물은 제목이 대통령·정부 결정을 비판하는 형식이라 §4.5-5로 뺐다(`toktok`·`alaska`·`kimmeengeon`·`light-committee`). 국방부·합참·국정원은 허용 사진 없음 |
| 집회·행진 게시물(`geonwoo-hongdae-march`·`geonwoo-gwangju-rally`·10-03·10-04 광화문) | 거리·광장 | 집회 독려·인원 주장과 결합할 위험(편집 정책) |
| 민주노총·청주·충북 간첩 사건 게시물 | 대법원 | 27과 같은 판단(대법원은 부차) |
| 나머지 이미지 없는 게시물(인물 발언·통계·법안 일반·온라인 주장 등) | — | 장소·기관 대상이 없어 A-2 사진을 붙일 근거가 없음 |

## 참고 후보 (다음 묶음용)
- 파일: **`docs/qa/uploader-28-candidates.md`**. 저장소 반영이나 사진 내려받기는 하지 않았다. 저작자 이름은 적지 않았다.
- 대상 25곳, 게시물 52건, 위키미디어 파일 59건(파일 URL·라이선스 틀 이름·해상도·촬영일). 대상 일치·인물 여부는 파일 이름으로 1차 분류만 했고, 쓰기 전에 개별 확인이 필요하다.

| 대상 | 게시물 수 | PD | BY-SA | 공공누리 1 |
|---|---|---|---|---|
| 국방부 청사 | 3 | 0 | 0 | 0 |
| 합동참모본부 | 4 | 0 | 0 | 0 |
| 청와대 | 4 | 0 | 6 | 0 |
| 광화문광장(재구조화 뒤) | 1 | 0 | 2 | 1 |
| 경찰대학 | 1 | 0 | 0 | 0 |
| 정부과천청사 | 1 | 0 | 6 | 0 |
| 파주 북한군 묘지 | 1 | 0 | 2 | 0 |
| 강화 주문도 | 1 | 0 | 0 | 0 |
| 판문점 공동경비구역 | 1 | 0 | 1 | 0 |
| 비무장지대 철책 | 5 | 3 | 1 | 0 |
| 홍콩 애드미럴티 | 1 | 0 | 6 | 0 |
| 멕시코 국립궁전 | 2 | 0 | 2 | 0 |
| 북한 남포 | 1 | 0 | 2 | 0 |
| 창원지방법원 | 1 | 0 | 0 | 0 |
| 국가정보원 | 2 | 0 | 0 | 0 |
| 독일 BND 본부 | 1 | 0 | 6(3.0 DE 지역판) | 0 |
| 미국 NGA 본부 | 1 | 2 | 0 | 0 |
| 정부서울청사 | 4 | 0 | 1 | 0 |
| 해병대 | 1 | 0 | 0 | 0 |
| 육군훈련소 | 1 | 0 | 1 | 0 |
| 새울원전 | 1 | 0 | 0 | 1 |
| 경기도청 | 3 | 0 | 1 | 0 |
| 서울 올림픽공원 | 1 | 0 | 6 | 0 |
| 정부세종청사 | 3 | 0 | 6 | 0 |
| (그 밖의 0건: 합참과 같은 검색 결과 0 대상 포함) | | | | |
- 판단 메모: BY-SA를 허용해도 국방부·합참·국정원·경찰대 게시물은 거의 채워지지 않는다(대상이 맞는 사진이 없음). 늘어날 곳은 청와대·정부청사·광화문·올림픽공원 정도이고, 청와대·통일부 게시물은 §4.5-5 점검이 함께 필요하다.

## 검증
- `npm run validate:content`: **R=0**(오류 0), 경고 22건으로 작업 전과 같다. 대상 14개 id의 경고는 0건이다(작업 전에도 0). `대표 이미지 종류: open 33`(19 + 14), 검사한 이미지 alt 52 → 66.
- 작업 전 경고 목록과 작업 뒤 경고 목록의 차이는 "검사한 이미지 alt" 줄 하나뿐이다.

## 소요 시간
- 실측: 오더 작성(22:51, 히스토리 기준)부터 트리거 작성(23:12)까지 약 20분.

## git status --short (전체, 작업 시점)
- 이번 오더 변경: 위 14개 ko·en 게시물, `public/images/` 14개 폴더, `docs/qa/uploader-28-candidates.md`, 이 트리거, 오더 이동. 그 밖의 줄은 이전 작업분이거나 다른 세션의 미커밋 파일이다.
```
 M content/posts-en/2026-08-06-owloffreedom-707-commander-sentencing.md
 M content/posts-en/2026-08-12-citynewsmeme-parksangyong-oath-refusal.md
 M content/posts-en/2026-08-25-nowandhere-625-constitution-question.md
 M content/posts-en/2026-09-16-hagonolza-country-insult-bill.md
 M content/posts-en/2026-09-16-idontknowpolitics-2023-warrant-dismissed.md
 M content/posts-en/2026-09-17-idontknowpolitics-sergeant-leak-china.md
 M content/posts-en/2026-09-21-kimmoonsoo-prosecution-abolition.md
 M content/posts-en/2026-09-22-emong-nk-contact-law.md
 M content/posts-en/2026-09-24-sewodream-nk-agent-private-detective.md
 M content/posts-en/2026-09-28-nakyungwon-mine-report-deletion.md
 M content/posts-en/2026-09-29-osj17x-hankiho-president-instruction.md
 M content/posts-en/2026-09-30-20hoon-prosecution-abolition-victim-guide.md
 M content/posts-en/2026-10-05-wendmag-cio-investigation-scope.md
 M content/posts-en/2026-10-09-gotdemcatch-lee-five-trials-suspended.md
 M content/posts-en/2026-10-29-khan-nk-srbm-launch-wonsan.md
 M content/posts/2026-08-06-owloffreedom-707-commander-sentencing.md
 M content/posts/2026-08-12-citynewsmeme-parksangyong-oath-refusal.md
 M content/posts/2026-08-25-nowandhere-625-constitution-question.md
 M content/posts/2026-09-16-hagonolza-country-insult-bill.md
 M content/posts/2026-09-16-idontknowpolitics-2023-warrant-dismissed.md
 M content/posts/2026-09-17-idontknowpolitics-sergeant-leak-china.md
 M content/posts/2026-09-21-kimmoonsoo-prosecution-abolition.md
 M content/posts/2026-09-22-emong-nk-contact-law.md
 M content/posts/2026-09-24-sewodream-nk-agent-private-detective.md
 M content/posts/2026-09-28-nakyungwon-mine-report-deletion.md
 M content/posts/2026-09-29-osj17x-hankiho-president-instruction.md
 M content/posts/2026-09-30-20hoon-prosecution-abolition-victim-guide.md
 M content/posts/2026-10-05-wendmag-cio-investigation-scope.md
 M content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md
 M content/posts/2026-10-29-khan-nk-srbm-launch-wonsan.md
 M docs/supervisor/drafts/2026-09-28-held-recheck.md
 M docs/triggers/uploader-27-a2-archive-photo-batch-2-COMPLETE.md
 M history/2026-10-01.md
 M history/2026-11-05.md
 M history/2026-11-09.md
 M history/2026-11-10.md
 M history/2026-11-11.md
 M planning/card-image-policy.md
 M planning/card-image-uploader-steps.md
 M planning/prd.md
?? content/posts-en/2026-11-10-attendkdz-police-university-abolition-review.md
?? content/posts/2026-11-10-attendkdz-police-university-abolition-review.md
?? docs/handoffs/tester-01-deployed-image-loading.md
?? docs/qa/tester-01/
?? docs/qa/uploader-28-candidates.md
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
?? docs/triggers/planner-20-image-max-license-scope-COMPLETE.md
?? docs/triggers/poster-2026-10-09-gotdemcatch-lee-five-trials-suspended-merge-DfhVryWha8y-COMPLETE.md
?? docs/triggers/poster-2026-11-10-attendkdz-police-university-abolition-review-COMPLETE.md
?? docs/triggers/poster-hold-czchurch-DfbpZ-zSDVk-COMPLETE.md
?? docs/triggers/poster-hold-rightrightgogo-DfjY-mHE1Fg-COMPLETE.md
?? docs/triggers/reviewer-71-planner-20-review-COMPLETE.md
?? docs/triggers/tester-01-deployed-image-loading-COMPLETE.md
?? docs/triggers/uploader-28-a2-archive-photo-batch-3-COMPLETE.md
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
?? instructions/planner/processed/20-image-max-license-scope.md
?? instructions/programmer/20-image-license-expand.md
?? instructions/reviewer/processed/71-planner-20-review.md
?? instructions/tester/processed/01-deployed-image-loading.md
?? instructions/uploader/processed/28-a2-archive-photo-batch-3.md
?? public/images/2026-08-06-owloffreedom-707-commander-sentencing/
?? public/images/2026-08-12-citynewsmeme-parksangyong-oath-refusal/
?? public/images/2026-08-25-nowandhere-625-constitution-question/
?? public/images/2026-09-16-hagonolza-country-insult-bill/
?? public/images/2026-09-16-idontknowpolitics-2023-warrant-dismissed/
?? public/images/2026-09-17-idontknowpolitics-sergeant-leak-china/
?? public/images/2026-09-21-kimmoonsoo-prosecution-abolition/
?? public/images/2026-09-22-emong-nk-contact-law/
?? public/images/2026-09-24-sewodream-nk-agent-private-detective/
?? public/images/2026-09-28-nakyungwon-mine-report-deletion/
?? public/images/2026-09-29-osj17x-hankiho-president-instruction/
?? public/images/2026-09-30-20hoon-prosecution-abolition-victim-guide/
?? public/images/2026-10-05-wendmag-cio-investigation-scope/
?? public/images/2026-10-29-khan-nk-srbm-launch-wonsan/
```

## 28-1
- 2026-11-11 23:16 리뷰어 72 반영.
  - P2-1: `2026-10-05-wendmag-cio-investigation-scope`의 사진 Q2를 되돌렸다. 제목이 비판하는 대상이 사진 속 기관 자체라 정책 §4.5-5에 걸린다.
    - ko image 블록과 en `imageAlt`·`imageCaption`을 파일 편집으로 지웠다(git 쓰기 없음).
    - `public/images/2026-10-05-wendmag-cio-investigation-scope/`를 rm으로 지웠다.
    - 두 파일은 `git diff` 0줄로 HEAD와 같다. `git status --short`에도 wendmag 줄이 없다.
  - P3-1: Q1 촬영 장소를 원 페이지 표기("건물 11층 옥상")대로 고쳤다.
  - P3-3: W 보행자 수를 약 4명으로 고쳤다.
- 검증: validate R=0(실패 0), 경고 22, `대표 이미지 종류: open 32`.
- 최종 결과: 성공 13건, 사진 9장. Q2 사용 2건, 국회 사진 17/32, 그중 항공 연작 12건.
