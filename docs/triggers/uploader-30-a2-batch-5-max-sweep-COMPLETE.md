# 업로더 30 — 자료사진 A-2 묶음 5 (남은 게시물 전수 재탐색) — 완료 트리거

- 담당: 반공-업로더 (Opus 5.5) · 2026-11-12 08:15
- 오더: `instructions/uploader/processed/30-a2-batch-5-max-sweep.md`
- 선행 검토: 업로더 29 오더·트리거(29-1 포함), 리뷰 74 트리거(P2-1 남포 판정·P2-2 도라전망대·P3-2·P3-3), 정책 §4.5, guide §4-1 "A-2 확대", `content/README.md` §3.6, 업로더 28 후보 목록

---

## 0. 요약
- **전수**: 이미지 없는 게시물 **137건**(커밋 69c11a1 기준 210건 중)을 한 건씩 판정했다. 표 행 수 137 = 대상 수 137(스크립트로 누락 0 확인).
- **채택 17건**(사진 7장): 이미지 있는 게시물이 73건에서 **90건**이 된다.
  - 비무장지대 철책 일반 풍경 5장 → 13건
  - 청와대 본관(리뷰 74 P3-3 재측정으로 허용) → 2건
  - 경찰청 본관(같은 재측정) → 2건
- 검증: `npm run validate:content` **R=0**, 경고 **22건**(업로더 29 뒤와 같은 파일 목록, diff 0). 대상 17개 id에 새 경고는 0이다(형식·인접·재사용 경고 0). 집계는 open 56 · public 1 · news 33.
- git 쓰기·빌드·`src/` 수정 0. `gotdemcatch`·`attendkdz`·`donga`·`wendmag`은 건드리지 않았다.

## 1. 다시 판정한 것 (리뷰 74 P3-3)
| 대상 | 다시 잰 방법 | 결과 |
|---|---|---|
| 청와대 본관 2022(`File:Blue_House_Seoul_3.jpg`, CC BY-SA 4.0) | 원본 8000×2680을 1:1로 자르고, 정면 방문객 얼굴 3개를 4배 확대해 10px 격자로 이마~턱을 셈 | 최대 약 **24px**(나머지 약 20·21px) / 짧은 변 2680 = **0.9%** → 1% 미만이라 ✅ 허용. faceNote에 값 기록 |
| 경찰청 본관 2017(`File:Korean_National_Police_Agency_Building05.jpg`, CC BY-SA 4.0) | 원본 1933×2091 아래쪽을 2배 확대 | 보행자 2명 모두 **뒷모습**(뒤통수만 보임, 직위 복장 아님) → 크기와 상관없이 ✅ 허용 |
| 국방부 Flickr("대한민국 국군" 계정, CC BY-SA 2.0) | 원 Flickr 사진 페이지와 계정 소개를 직접 열어 Korea.net식 "보도·공익 목적만" 문구가 있는지 확인 | 페이지 라이선스는 `creativecommons.org/licenses/by-sa/2.0` 하나이고, 이용 제한 문구는 0이다(설명은 사진 설명뿐). **이용 조건은 문제없다.** 그러나 확인한 비무장지대 사진 8장 모두 **사진 위에 "Republic of Korea Ministry of National Defense / Photo by … / flickr 주소"가 인쇄돼 있다** → §4.5-7 "덧씌운 글자·다른 저작권자 표기" 불가. 15사단 휴전선 전경(2011)도 같은 인쇄가 있고 초소가 보인다. **0장** |
| 정부서울청사 2022년 이후 사진(P3-2) | 위키미디어 "Government Complex Seoul"·"정부서울청사" 재검색, 서울연구원 | 새 후보 0(결과는 2014 사진·행사 인물·공공누리 야경(원 페이지 404)). **교체 없음** — 지금 5회 사용을 유지 |

## 2. 채택 사진 (7장)
| 키 | 대상 | 라이선스 · 직접 본 위치 | 저작자 구분 | 촬영 | 쓰인 게시물(피드 위치) |
|---|---|---|---|---|---|
| DA | 비무장지대 철책(DMZ 2700) | CC BY 4.0 — 공유마당 상세 이용조건 문구 "…은 CC BY 라이선스로 제공됩니다" + 배지 링크 `creativecommons.org/licenses/by/4.0`(버전 위계 ②) | 개인(출처: 한국저작권위원회) | 2009-12-14 | rekor-15div(60) · jeichi-nk-mdl(125) · nowandhere-mdl-mine(184) |
| DB | 같은 연작(DMZ 2701) | 같음 | 개인 | 2009-12-15 | shindawit-nk-mdl-50(71) · wikipost-dmz(133) · oreunboy(187) |
| DC | 같은 연작(DMZ 2702) | 같음 | 개인 | 2009-12-15 | nowandhere-defense-minister(80) · todayissuepicks(165) |
| DD | 같은 연작(DMZ 2708) | 같음 | 개인 | 2022-09-04 | 2pro-unc(66) · rekor-dmz-dispute(132) · centrism(185) |
| DE | 같은 연작(DMZ 2712) | 같음 | 개인 | 2009-12-15 | finf-jcs(75) · shindawit-nisi(142) |
| BH | 청와대 본관 | CC BY-SA 4.0 — 파일 정보 `{{self\|cc-by-sa-4.0}}`, source `{{own}}` | 개인 | 2022-12-07 | toktok(73) · alaska(61) |
| KN | 경찰청 본관(서울 서대문구 통일로 97) | CC BY-SA 4.0 — 파일 정보 `{{self\|cc-by-sa-4.0}}`, `{{own}}` | 개인 | 2017-04-02 | yeong573-bodycam(24) · ego-police(179) |

- **3a 판정(리뷰 74 도라 기준 적용)**: 공유마당 상세 페이지를 직접 열어 확인했다.
  - 2700·2701·2702·2708·2712의 요약정보(예: "비무장지대에 어지러울 정도로 빽빽한 철책과 철조망들을 촬영한 사진이다")와 저작물명에 **구역 이름이 없다.** 상세 본문을 철원·파주·고성·양구·화천·연천·김포·강화·인제·강원·경기·○○전선·판문점·도라·임진으로 grep한 결과 0건이다.
  - 위키미디어 사본의 분류도 "Demilitarized Zone of South Korea" 하나뿐이다.
  - 같은 연작의 2711은 상세 본문에 "강원"이 있어 뺐다. 2735·2741·2742는 설명이 "강원도 철원"이고 군인이 나와 뺐다.
  - 2706·2707은 원본 1:1에서 능선 위 **초소(감시탑·막사)**가 보여 뺐다(§4.5-3a 라).
- **caption**: ② 광역 풍경 형식이다. ko "자료사진: 비무장지대 철책 일반 풍경(2009) — 이 사건 지점·당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다."(2022본은 끝 문장 없음), en "Archive photo: general view of the DMZ fence (…) — not the location or time of this event. …".
- **군 판단 비판 게시물**(finf-jcs, centrism 등): 사진에 초소·장비·군인 표지가 없다(철책과 지형만). 원본 1:1로 확인했다.
- **15사단 게시물**(rekor-15div): 사진 설명에 구역이 없는 광역 풍경이다(리뷰 74 "그 구역이거나 광역" 충족).
- **재사용·인접**: 원본마다 2~3회다(상한 6). 같은 원본 사이 최소 간격은 DA 59·DB 54·DC 85·DD 53·DE 67·BH 12·KN 155칸이다(기준 5). validate 인접 경고 0.
  - 비슷해 보이는 2700·2701·2702가 붙지 않게 2708·2712를 사이사이에 배치했다. 다만 184(DA)와 187(DB)은 3칸 차이로 비슷한 철책 사진이 이어진다(원본이 달라 규칙 위반은 아님, 🔶 참고).
- **파일**: 공유마당 다운로드는 이용 동의 절차가 있어 하지 않았다. 같은 저작물을 위키미디어 공용에 올린 사본(파일 정보 source가 해당 공유마당 주소)을 받았다. 라이선스·저작자·sourcePageUrl은 공유마당 원 페이지 기준이다.
  - 🔶 위키미디어 사본과 공유마당 원본이 바이트까지 같은지는 확인하지 못했다(확인 필요). 리뷰어가 공유마당 미리보기와 대조해 주기를 요청한다.
- 메타데이터: 7장 모두 다시 인코딩하지 않고 지웠다. 스캔 데이터와 픽셀이 같고(SHA-256), 개인정보 필드는 0이다. DE의 IPTC 바이트는 스캔 데이터 안의 우연한 값이다(APP13 없음). 저장 파일 17개와 준비본의 해시 불일치는 0이다.

## 3. 검색 기록 (이번에 새로 한 것)
- 위키미디어 분류 탐색:
  - "Photographs by the Republic of Korea Armed Forces"(4,690장 → 철책·DMZ·지뢰·경계 키워드 208장)
  - "Demilitarized Zone of South Korea"(188장 → 구역·인물 키워드 제외 뒤 60장 검토)
- 위키미디어 검색 20여 회:
  - 국방부·합참·국정원·경찰청·정부서울청사·감사원·서울시교육청·EBS·국민연금공단·연평도·주문도·창원지법·경기도청 신청사·NGA·강동군병원·육군훈련소·해병대사령부·금남로·DMZ 풍경 3종
- 공유마당 원 페이지 13건, 서울연구원 검색(감사원·교육청·KBS·EBS·국민연금 등)
- 미 국방부(DVIDS) 계열 PD: DMZ 지뢰 경고판 등(2025)은 미 해군 직무 촬영 표시(ID-USMil)가 있다. 하지만 게시물과 맞는 대상은 "지뢰 경고판"뿐이다. 지뢰 사건 게시물에 쓰면 그 지뢰밭처럼 읽혀 채택하지 않았다(3b ⑤ 취지).
- 연평도: "Yeonpyeong island.jpg"(CC BY 2.0)는 2010-11-26 촬영으로, 포격 직후 같은 날짜라 "이 사건 당시 사진이 아닙니다"를 쓸 수 없다. Flickr 검증 틀도 없다.

## 4. 게시물별 판정 (137건)
| 게시물(2026- 생략) | 판정 | 사유 | 어떤 정책을 바꾸면 풀리는가 |
|---|---|---|---|
| `07-01-amhaengeosa-lee-nk-military-remark` | ❌ R1 | 방중 간담회 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `07-04-idontknowpolitics-2018-freedom-deletion` | ❌ R3 | 정당 의총 번복 비판 — 비공공 조직(정당) | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `07-05-idontknowpolitics-kctu-appeal` | ❌ R5 | 대법원 판결 | P3-2 쏠림 기준만 풀면 국회·대법원 기존 사진으로 바로 가능(재사용 6건·인접 5칸 안) |
| `07-14-kasamo7-cnn-surprise-attack-article` | ❌ R1 | 기사 존재 여부 확인 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `07-19-amhaengeosa-kctu-itaewon-directive` | ❌ R5 | 판결 | P3-2 쏠림 기준만 풀면 국회·대법원 기존 사진으로 바로 가능(재사용 6건·인접 5칸 안) |
| `07-22-geonwoo-kimminsoo-defense` | ❌ R1 | 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `07-24-firstincome-seoul-edu-unification-textbook` | ❌ R2 | 서울시교육청 본청 — 검색 결과는 교육지원청·도서관·행사 인물뿐 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `07-24-korealive-singer-moreugo` | ❌ R1 | 노래 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `07-25-idontknowpolitics-cheongju-spy-directives` | ❌ R5 | 판결·지령문 | P3-2 쏠림 기준만 풀면 국회·대법원 기존 사진으로 바로 가능(재사용 6건·인접 5칸 안) |
| `07-28-geonwoo-ebs-video-removal` | ❌ R2 | EBS 사옥 — 후보 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `07-28-jeichi-amendment-term-claim` | ❌ R1 | 헌법 조항 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `08-03-pagememo-nk-prosecution-reform-directive` | ❌ R1 | 공소장 보도 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `08-24-dictatorshipnono-jeju-missing-false-closure` | ❌ R3 | 경찰관 위법이 주제 — 경찰 청사 사진 결합 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `08-28-koreatruthnews-jeju-nk-aid-dual-contract` | ❌ R3 | 제주도 "위장 지원" 인용 — 지자체 위법 암시 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `08-29-idontknowpolitics-martial-law-nk-policy` | ❌ R1 | 정책 정리 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-03-taekyu-statistics-audit-probe` | ❌ R2 | 감사원 청사 — 후보 0(서울연구원 결과는 북촌 일대) | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `09-08-sonit-criminal-record-card` | ❌ R1 | 전과 기록 카드 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-09-pagememo-unmanned-vehicle-budget-cut` | ❌ R2 | 3b 아리온스멧 — 위키미디어 검색 3회 후보 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `09-10-ansanheart-academy-merger` | ❌ R4 | 3군 사관학교 통합 | "비교 게시물에 한쪽 대상 사진" 허용 규정 신설 |
| `09-10-geonwoo-jeongyulseong-song-contest` | ❌ R1 | 방송 대회 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-12-nowmagazine-postpartum-vs-nk-infant` | ❌ R2 | 경기도청 — 광교 신청사(2022~) 사진 0, 옛 청사만 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `09-12-peoplepower7-civic-group-head-dp-card` | ❌ R1 | 인물 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-13-geonwoo-518-list-disclosure-citizen` | ❌ R1 | 시민 요구 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-13-geonwoo-gwangju-rally` | ❌ R7 | "광주 도심"만 적혀 거리 미상(금남로 사진은 있음) · R8 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| `09-13-geonwoo-professor-2023-remark` | ❌ R1 | 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-13-idontknowpolitics-kangdong-hospital` | ❌ R2 | 평양 강동군병원 — 후보 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `09-13-sonit-625-book-ban-claim` | ❌ R1 | 도서 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-14-kimminsoo-spy-law-enforcement` | ❌ R1 | 법 시행 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-15-bbang630-518-armored-vehicle-claim` | ❌ R5 | 판결 | P3-2 쏠림 기준만 풀면 국회·대법원 기존 사진으로 바로 가능(재사용 6건·인접 5칸 안) |
| `09-15-jindam-choo-resignation-petition` | ❌ R2 | 경기도청 — 위와 같음 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `09-17-hagonolza-changwon-spy-indictment` | ❌ R5 | 창원지법 — 후보 0이기도 함 | P3-2 쏠림 기준만 풀면 국회·대법원 기존 사진으로 바로 가능(재사용 6건·인접 5칸 안) |
| `09-17-rekor-light-committee-disclosure` | ❌ R1 | 대통령 직속 위원회 — 청사가 청와대인지 불명 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-18-bluenews-jeju-organ-transplant-rumor` | ❌ R1 | 제도 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-19-geonwoo-hongdae-march` | ❌ R7 | "홍대 거리" 지점 미상 · R8 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| `09-20-hagonolza-constitution-amendment-points` | ❌ R1 | 개헌 쟁점 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-20-hanmibro-academy-merger-cards` | ❌ R4 | 3군 사관학교 | "비교 게시물에 한쪽 대상 사진" 허용 규정 신설 |
| `09-20-kimeunhye-jeonse-reel` | ❌ R1 | 정책 비판 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-20-nowandhere-mdl-mine-briefing-reel` | ✅ DA | — | — |
| `09-20-nowmagazine-alpha-phone` | ❌ R1 | 정당 정책 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-20-shindawit-foreign-unemployment-benefits` | ❌ R2 | 고용노동부 — 세종청사 동 식별 사진 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `09-21-centrism-dmz-summary` | ✅ DD | — | — |
| `09-21-dotori-nk-medical-equipment` | ❌ R4 | 대북 지원 vs 장병 지원 | "비교 게시물에 한쪽 대상 사진" 허용 규정 신설 |
| `09-21-leeprenotion-assembly-holiday-bonus` | ❌ R3 | 의원 자신의 이익 비판(리뷰 72 P2-1) | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-21-oreunboy-dmz-mine-explosion` | ✅ DB | — | — |
| `09-22-ego-police-republic-concern` | ✅ KN | — | — |
| `09-22-lotuslantern-25div-death` | ❌ R3 | 장교 사망 사건과 결합 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-22-peoplepower7-hyegyeonggung-claim` | ❌ R1 | 인물 의혹 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-22-taekyu-ppp-rally-report` | ❌ R8 | 정당 행사 현장 | A-2를 집회 게시물에 허용(빈 장소 사진의 인원 왜곡 위험 — 권하지 않음) |
| `09-23-jeichi-nk-mdl-crossing` | ✅ DA | — | — |
| `09-23-shindawit-army-lecture-trump` | ❌ R9 | 육군훈련소 정문 사진에 군복 근무자, 나머지 후보는 훈련병 인물 | 해당 조건을 고친 다른 사진이 나오면 됨 |
| `09-24-hagonolza-kctu-itaewon-claim` | ❌ R1 | 지령 내용 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-24-hagonolza-lawyer-spy-remark` | ❌ R1 | SNS 글 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-24-politicscrush-main-enemy-politicians` | ❌ R1 | 발언 모음 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-25-lawyer-nk-pow-ukraine` | ❌ R1 | 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-26-ccpoutkorea-ocsc-overseas-police` | ❌ R3 | 민간 업소 의혹(비공공) | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-26-neveragain-mexico-tariff-visit` | ❌ R7 | 회담 장소 미기재 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| `09-26-newsbanhana-lee-kexpo-mexico` | ❌ R7 | 행사장 미기재 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| `09-26-nonjeomjikjin-dmz-marine-corporal-standard` | ❌ R4 | DMZ 폭발 vs 채상병 사건 | "비교 게시물에 한쪽 대상 사진" 허용 규정 신설 |
| `09-26-rekor-dmz-dispute` | ✅ DD | — | — |
| `09-26-wikipost-dmz-injury-rumor` | ✅ DB | — | — |
| `09-27-ccpoutkorea-china-threat-survey` | ❌ R1 | 여론조사 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-27-geonwoo-corporate-card-whistleblower` | ❌ R3 | 경기도 법인카드 의혹 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-27-geonwoo-farmland-survey` | ❌ R1 | 농지 일반 — 특정 장소 없음 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-27-leejinsook-lee-parents-grave-farmland` | ❌ R3 | 개인 묘소(사생활) | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-27-minjoojuhee-trial-resume-challenge` | ❌ R1 | 1인 시위 챌린지 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-27-news1min-cpi-31st` | ❌ R2 | 국민권익위 — 세종청사 동 식별 사진 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `09-27-rekor-former-25div-commander` | ❌ R1 | 인물 보도 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-27-shindawit-nisi-mine-summary` | ✅ DE | — | — |
| `09-28-drumtong119-jinsungjoon-nsl-past` | ❌ R1 | 인물 과거 판결 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-28-firstincome-kctu-spy-case-summary` | ❌ R5 | 판결 정리 | P3-2 쏠림 기준만 풀면 국회·대법원 기존 사진으로 바로 가능(재사용 6건·인접 5칸 안) |
| `09-28-geonwoo-farmland-bank-expansion` | ❌ R1 | 예산 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-28-geonwoo-state-system-decade` | ❌ R1 | 연표 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-28-kimjanggyeom-hanjunho-kbs-complaint` | ❌ R1 | 고발이 주제(KBS는 대상 아님) | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-28-kimmeengeon-farmland-communism` | ❌ R3 | 청와대 사진과 "공산주의" 인용 결합, 담당 기관 불명 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-28-ljm-unc-request-refused` | ❌ R1 | 발언 출처 확인이 주제 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-28-parkchoongkwon-dp-mine-remarks` | ❌ R1 | 발언 모음(목함지뢰 사진은 3b ⑤·기종 미확정) | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-28-peoplepower7-yuk-youngsoo-east-german-docs` | ❌ R1 | 외교문서 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-28-quickpolitics-song-yeonpyeong-bomb-remark` | ❌ R9 | 연평도 사진(CC BY 2.0)은 포격 직후 2010-11-26 촬영으로 사건 시기와 겹치고 Flickr 검증 틀 없음 | 해당 조건을 고친 다른 사진이 나오면 됨 |
| `09-28-rekor-chinese-crime-tourism` | ❌ R3 | 지역 풍경과 범죄 결합 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-28-shindawit-pla-fighter-wiretap` | ❌ R6 | 기종 미특정 | 3b를 "종류" 단위(전투기 일반 등)로 넓히거나 ⑤ 사건 장면 제한 완화 — 오인 위험 큼 |
| `09-28-solsol-mexico-17-agreements` | ❌ R7 | 회담 장소 미기재 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| `09-28-sonit-nk-aid-vs-elderly-support` | ❌ R4 | 두 예산 비교 | "비교 게시물에 한쪽 대상 사진" 허용 규정 신설 |
| `09-28-todayissuepicks-dmz-hand-pick-escape` | ✅ DC | — | — |
| `09-29-finf-jcs-terrain-change-year` | ✅ DE | — | — |
| `09-29-finf-jinsungjoon-mine-intent` | ❌ R1 | 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-29-leejinsook-assassins-film-distortion` | ❌ R1 | 영화 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-29-momamour-westsea-vs-dmz-comparison` | ❌ R4 | 서해 피격 vs DMZ | "비교 게시물에 한쪽 대상 사진" 허용 규정 신설 |
| `09-29-nowandhere-defense-minister-nk-responsibility` | ✅ DC | — | — |
| `09-29-rekor-hypertension-diabetes-support-cut` | ❌ R1 | 본문에 담당 부처 이름 없음 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-29-rightmeet-mine-word-press-guideline` | ❌ R1 | 보도 용어가 주제 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-29-shindawit-cxmt-samsung-threat` | ❌ R3 | 중국 기업 의혹(비공공) | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-30-2pro-unc-armistice-violation` | ✅ DD | — | — |
| `09-30-kimeunhye-farmland-china-solar` | ❌ R1 | 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-30-monarch-former-ambassador-church-claims` | ❌ R1 | 주장 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `09-30-shindawit-nk-mdl-50-crossings` | ✅ DB | — | — |
| `09-30-taekyu-assassins-film-fund-china` | ❌ R3 | "문체부는 왜 침묵하나" 암시형 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `09-30-toktok-lee-classified-doc-sns` | ✅ BH | — | — |
| `10-01-ntdkorea-jeju-falungong-rally-chinese` | ❌ R8 | 집회 현장 | A-2를 집회 게시물에 허용(빈 장소 사진의 인원 왜곡 위험 — 권하지 않음) |
| `10-01-rekor-15div-mine-field` | ✅ DA | — | — |
| `10-01-swingmag-gov24-hacking` | ❌ R1 | 온라인 서비스 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-02-alaska-lng-vs-dmz-mine-response` | ✅ BH | — | — |
| `10-03-oct3-gwanghwamun-rally-scale` | ❌ R8 | 집회 인원 | A-2를 집회 게시물에 허용(빈 장소 사진의 인원 왜곡 위험 — 권하지 않음) |
| `10-04-ycherish-oct3-rally-media` | ❌ R8 | 집회 인원 | A-2를 집회 게시물에 허용(빈 장소 사진의 인원 왜곡 위험 — 권하지 않음) |
| `10-05-issueradar-nsc-cyber-sanctions-clash` | ❌ R7 | NSC 회의 장소 미기재 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| `10-05-jeichi-front-corps-unloaded-guard` | ❌ R10 | 전방 경계근무 — 비무장지대 철책 사진과 종류 일치를 설명으로 확인 못 함 | "철책 종류 일치" 요건을 "DMZ 남방한계선·GOP 동일 취급"으로 명문화하면 비무장지대 철책 사진으로 풀림 |
| `10-05-shindawit-core-tech-leak-china-92` | ❌ R1 | 통계 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-05-wendmag-cio-investigation-scope` | ❌ X0 | wendmag | —(오더 지시로 손대지 않음) |
| `10-07-geonwoovibes-defector-repatriation-claim` | ❌ R3 | 통일부 부정 암시 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| `10-07-gotdemcatch-kimminseok-chief-justice-resign` | ❌ X0 | gotdemcatch | —(오더 지시로 손대지 않음) |
| `10-07-rinha-chosun-column-chongryon-visit` | ❌ R1 | 칼럼 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-08-ansanheart-daejangdong-recording-2025` | ❌ R1 | 녹취 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-08-focusone-ganghwa-drifting-mine` | ❌ R10 | 강화 주문도 해안 — 후보 0 | "철책 종류 일치" 요건을 "DMZ 남방한계선·GOP 동일 취급"으로 명문화하면 비무장지대 철책 사진으로 풀림 |
| `10-08-peoplepower7-ukraine-korea-oil-claim` | ❌ R1 | 주제는 한국 정부 관련 주장 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-08-shindawit-nis-chief-nga-visit-report` | ❌ R9 | NGA 새 본부 사진은 짧은 변 366px, 옛 본부는 2012 전 모습 | 해당 조건을 고친 다른 사진이 나오면 됨 |
| `10-08-shindawit-us-nis-cyber-group-excluded` | ❌ R2 | 국정원 외관 — 후보 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `10-09-gotdemcatch-lee-five-trials-suspended` | ❌ X0 | gotdemcatch | —(오더 지시로 손대지 않음) |
| `10-09-themovemag-chinese-residents-1m` | ❌ R1 | 통계 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-10-insighteye-china-korean-heritage-24` | ❌ R1 | 보고서 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-10-news1min-nps-foreigner-late-payment` | ❌ R2 | 국민연금공단 본부 — 후보 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `10-10-ribonpig-gyeonggi-childcare-budget` | ❌ R2 | 경기도청 — 위와 같음 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `10-10-rocketissue-kei-poll-korea-defense` | ❌ R1 | 여론조사 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-12-conpoli88-parkjiwon-nk-remittance-nis` | ❌ R2 | 국정원 — 후보 0(R3 소지도 있음) | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `10-13-brieftag-kadiz-data-withheld` | ❌ R6 | 중국 전투기 기종 미특정, 합참 청사 후보 0 | 3b를 "종류" 단위(전투기 일반 등)로 넓히거나 ⑤ 사건 장면 제한 완화 — 오인 위험 큼 |
| `10-13-yeong573-police-bodycam-china` | ✅ KN | — | — |
| `10-14-2pro-nk-slcm-not-announced` | ❌ R6 | 제목이 발사 장면(3b ⑤) | 3b를 "종류" 단위(전투기 일반 등)로 넓히거나 ⑤ 사건 장면 제한 완화 — 오인 위험 큼 |
| `10-14-gotdemcatch-safety-drill-poster-insignia` | ❌ X0 | gotdemcatch | —(오더 지시로 손대지 않음) |
| `10-14-knn-fake-mnd-chinese-recruit-poster` | ❌ R2 | 국방부 청사 — 2009 사진뿐, 2022 뒤 용도 변경으로 현재 모습 판단 불가 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `10-18-wikipost-equal-pay-equal-work-roadmap` | ❌ R2 | 고용노동부 — 세종청사 동 식별 사진 0 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| `10-20-monarchreport25-lee-kim-held-back-2025` | ❌ R1 | 인터뷰 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `10-28-donga-nk-submarine-infiltration-drills` | ❌ X0 | donga(리뷰 74 P2-1) | —(오더 지시로 손대지 않음) |
| `11-01-eodguri-war-term-extension-claim` | ❌ R1 | 유튜브 주장 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `11-03-happenbosu-lee-kimilsung-remark-2024` | ❌ R1 | 발언 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| `11-03-idaenamright-youth-sns-limit-review` | ❌ R7 | 국무회의 장소 미기재 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| `11-03-wikipost-marine-officer-kimjongun-photo` | ❌ R9 | 해병대사령부 사진은 미군 방문 행사 인물뿐 | 해당 조건을 고친 다른 사진이 나오면 됨 |
| `11-08-politicscrush-daejinyeon-kimjongun-welcome-2019` | ❌ R9 | 광화문광장 재구조화 뒤 사진: 공공누리 야경은 원 페이지 404, 나머지는 옛 모습·공사 가림막 | 해당 조건을 고친 다른 사진이 나오면 됨 |
| `11-08-tessa-gop-fence-animal-judgment` | ❌ R10 | 철원 GOP 철책 — 종류 일치 확인 불가, 철원 꿩 사진은 조롱 결합(29) | "철책 종류 일치" 요건을 "DMZ 남방한계선·GOP 동일 취급"으로 명문화하면 비무장지대 철책 사진으로 풀림 |
| `11-10-attendkdz-police-university-abolition-review` | ❌ X0 | attendkdz | —(오더 지시로 손대지 않음) |

## 5. 사유 종류별 집계
| 코드 | 사유 | 건수 | 풀리는 정책(요약) |
|---|---|---|---|
| 채택 | — | 17 | — |
| X0 | 오더상 제외 파일 | 6 | —(오더 지시로 손대지 않음) |
| R1 | 사진으로 보일 장소·기관·장비가 없음(발언·논평·SNS·통계·제도·작품) | 52 | "주제 상징 자료사진"(정당·제도·지도·문서 등 일반 사진) 허용 규정 신설 — 현재 §4.5-3은 같은 장소·기관만 |
| R2 | 대상 장소·기관은 있으나 허용 라이선스 후보 0(검색함) | 15 | 공공누리 제2~4유형 또는 CC BY-NC 허용, 또는 기관에 이용 허락 요청(사진 직접 받기) |
| R3 | §4.5-5 단정·결합 위험(비공공 조직 의혹·위법 암시·사망·범죄 결합·의원 이익 비판) | 13 | §4.5-5 (가)·(나) 완화 — 다만 낙인 위험이 커서 권하지 않음 |
| R4 | 대상이 둘 이상인 비교·대비 게시물 | 6 | "비교 게시물에 한쪽 대상 사진" 허용 규정 신설 |
| R5 | 국회·법조 대상(리뷰 72 P3-2 쏠림으로 이번 범위 뒤로 미룸) | 6 | P3-2 쏠림 기준만 풀면 국회·대법원 기존 사진으로 바로 가능(재사용 6건·인접 5칸 안) |
| R6 | 장비 3b 조건 불충족(기종 미특정·사건 장면·기종 미확정) | 3 | 3b를 "종류" 단위(전투기 일반 등)로 넓히거나 ⑤ 사건 장면 제한 완화 — 오인 위험 큼 |
| R7 | 장소가 출처에 없음(회담·회의·행진 장소 미기재) | 7 | 출처 밖 자료로 장소 확인을 허용(장소 확인용 출처 1건 추가) |
| R8 | 사람·인원이 본질인 집회·행사 게시물 | 4 | A-2를 집회 게시물에 허용(빈 장소 사진의 인원 왜곡 위험 — 권하지 않음) |
| R9 | 후보는 있으나 사진 조건 불충족(인물·옛 모습·해상도·사건 직후 사진·검증 틀 없음) | 5 | 개별(비고 참조) |
| R10 | 3a 종류·구역 불일치(GOP·해안·섬 — 사진 설명으로 종류·구역 일치 확인 불가) | 3 | "철책 종류 일치" 요건을 "DMZ 남방한계선·GOP 동일 취급"으로 명문화하면 비무장지대 철책 사진으로 풀림 |
- 합계 137 = 대상 137.
- **다음 결정 자료(건수 순)**:
  - ① R1 52건은 "주제 상징 자료사진" 규정이 생기지 않는 한 풀리지 않는다.
  - ② R2 15건은 공공누리 2~4유형이나 기관에 직접 허락을 받아야 풀린다.
  - ③ R3 13건은 정책상 낙인 위험이라 그대로 두기를 권한다.
  - ④ R7 7건은 출처 밖 장소 확인을 허용하면 풀린다(멕시코 2건은 국립궁전 사진 후보가 이미 있음).
  - ⑤ R5 6건은 P3-2 쏠림 기준만 정하면 기존 국회·대법원 사진으로 바로 가능하다.
  - ⑥ R10 3건은 "DMZ 남방한계선·GOP 철책 동일 취급"을 명문화하면 이번 철책 사진으로 풀린다.

## 6. `git status --short` (이번 작업분)
- `M` content/posts/·content/posts-en/ 각 17개: nowandhere-mdl-mine · centrism · oreunboy · ego-police · jeichi-nk-mdl · rekor-dmz-dispute · wikipost-dmz · shindawit-nisi · todayissuepicks · finf-jcs · nowandhere-defense-minister · 2pro-unc · shindawit-nk-mdl-50 · toktok · rekor-15div · alaska · yeong573
- `??` public/images/ 위 17개 id 폴더(각 thumb.jpg)
- `??` 이 트리거, `M` history/2026-11-12.md, 오더 이동(`instructions/uploader/30-…` → `processed/`)
- 그 밖의 줄(gotdemcatch 2개 `M`, attendkdz 2개 `??`, 다른 담당 문서·history)은 이번 작업 전부터 있던 것이고 건드리지 않았다.

## 7. 금지 사항
- git 쓰기·빌드·`src/` 수정 0. 사람이 나오는 사진 0(점 크기 0.9%·뒷모습만).
- 이 트리거와 history에 사진 저작자 이름·실명·옛 id·다른 서비스명·계정·홈 경로 0(저작자는 개인/기관 구분만 적음).

## 30-1 (리뷰 75 반영 — 2026-11-12 08:27)

### 0. 결과
- 업로더 30의 최종 적용은 **5건**이다(17건에서 DMZ 철책 12건을 뺌). 이미지 있는 게시물은 **78건**이다.
- validate **R=0**, 경고 **22건**(목록 diff 0). 대상 id(남은 5건 + 되돌린 12건)의 새 경고는 0이다. 집계는 open 44 · public 1 · news 33.

### 1. P2-1 DMZ 철책 12건 되돌림
- 대상: nowandhere-mdl-mine · centrism · oreunboy · jeichi-nk-mdl · rekor-dmz-dispute · wikipost-dmz · shindawit-nisi · todayissuepicks · finf-jcs · nowandhere-defense-minister · 2pro-unc · rekor-15div
- ko image 블록, en `imageAlt`·`imageCaption` 2줄, `public/images/{id}/` 폴더 12개를 직접 지웠다. git 명령은 쓰지 않았다.
- `git status --short`에 12건의 줄이 0개다(HEAD와 같음).
- `shindawit-nk-mdl-50`(광역, DB = DMZ 2701)은 리뷰어 판단대로 유지한다. 2701은 1회만 쓰이고, 2700·2702·2708·2712는 0회다.
- **4절 표의 이 12행은 판정이 ✅에서 ❌로 바뀐다.** 사유는 다음과 같다. 사진의 공유마당 원 페이지 키워드 칸이 "강원도·철원"으로 구역을 특정하는데, 게시물 사고 지점은 파주 서부전선이다. 15사단 건은 리뷰 74 P3-4 결정 대기다.
  - 풀리는 정책: 기획자가 "키워드는 구역 특정이 아님"으로 정하거나, 원 페이지(설명·제목·키워드·분류) 어디에도 구역이 없는 철책 사진을 찾으면 된다.
- 5절 집계 정정: 채택 17 → **5**, 위 사유(3a 원 페이지 키워드 구역 불일치) **12건** 추가. 나머지 코드 건수는 그대로다.

### 2. P3-2 경찰청 caption
- `ego-police`·`yeong573`:
  - ko: "자료사진: 서울 경찰청 본관(2017) — …" → "자료사진: **경찰청 본관(서울 서대문구, 2017)** — 이 사건 당시 사진이 아닙니다."
  - en: "Korean National Police Agency headquarters, Seoul (2017)" → "**Korean National Police Agency headquarters (Seodaemun-gu, Seoul, 2017)**"
  - 서울특별시경찰청과 헷갈리지 않게 했다.

### 3. P3-3 청와대 caption
- `toktok`·`alaska`의 ko·en 끝에 "현재 모습과 다를 수 있습니다." / "It may differ from how it looks today."를 붙였다(2022 일반 개방기 사진).
- ① 형식(` — 이 사건 당시 사진이 아닙니다.`)은 유지했고, validate 형식 경고 0이다.

### 4. P3-4 기록 오류 정정
- **키워드 칸 누락**: 2절의 "상세 본문을 철원·파주…로 grep한 결과 0건"은 **틀렸다.**
  - 내 검사는 '상세정보' 글자 뒤 8,000자만 봤다. 그래서 페이지 뒤쪽 `<!-- 태그정보 -->` 아래 **키워드 목록**(5곳 모두 첫 두 항목이 `강원도`·`철원`)을 보지 못했다. 태그 추출 정규식도 이 목록 형식에 맞지 않아 0건이 나왔다.
  - 앞으로 공유마당은 상세정보와 **키워드·태그 칸 전체**를 확인한다(HTML 전체에서 구역 이름을 grep하고 키워드 목록을 따로 뽑는다).
- **인접 위치값**: 내 피드 위치값은 리뷰어 값보다 1씩 작다. 위치를 0부터 셌기 때문이다(간격은 같음). "184(DA)·187(DB) 3칸"은 실제 배치로는 184(DA)·185(DD)·187(DB)이라 비슷한 철책 사진 3장이 4칸 안에 몰려 있었다. 이번 되돌림으로 해당 사항이 없어졌다.
- **청와대·경찰청 피드 위치**: 73·61 → 74·62, 24·179 → 25·180(리뷰어 기준)으로 정정한다. 간격은 12·155로 같다.

### 5. `git status --short` (업로더 30·30-1 관련분)
- `M` content/posts·posts-en 각 5개: shindawit-nk-mdl-50 · toktok · alaska · ego-police · yeong573
- `??` public/images/ 5개 폴더(위 5개 id)
- `??` 이 트리거, `M` history/2026-11-12.md, 오더는 `processed/`에 있음
- DMZ 12건의 줄은 없다. gotdemcatch·attendkdz 등 그 밖의 줄은 이번 작업 전부터 있던 것이다.

### 6. 금지 사항
- git 쓰기·빌드·`src/` 수정 0. 저작자 이름·실명·옛 id는 이 절에 없다.
