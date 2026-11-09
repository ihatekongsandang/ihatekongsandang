# uploader-06-sns-image-batch-4 — COMPLETE

- 담당: 반공-업로더 · 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/06-sns-image-batch-4.md` (묶음 4 = TSV batch 4, 10건 — 오더 목록과 TSV 일치 확인)
- 기준: guide §4-1 "판단 선례"(314d76c 갱신본) — 특히 **후보 og:image는 모두 직접 열어 보고 크기는 받은 파일에서 잼**(리뷰 40). 근거 기사 og:image **26장 전부**를 저장소 밖 임시 폴더에 받아 한 장씩 눈으로 확인했고, 크기는 `sips`로 받은 파일에서 측정했다. 아래 불가 사유의 "보이는 것"은 이미지를 직접 본 내용이다.
- 결과: **② 1건 · ③ 9건** · SNS 원문 저장본 **110 → 100**(`count-self-images.mjs` 중간 TSV: self 167 − 자체 제작 67 = 100)
- git add·commit·push·빌드 하지 않음.

## 건별 표
| # | id | 단계 0(저장 이미지 직접 열람) | 결과 | 후보 og:image — 직접 본 내용 · 받은 파일 크기 · 판정 | 핫링크 | 지운 파일 |
|---|---|---|---|---|---|---|
| 1 | 2026-09-17-idontknowpolitics-sergeant-leak-china | 군복 차림 뒷손에 수갑을 찬 연출 사진(얼굴 없음) — 10항 성격 | ③ | 서울신문: 군모·군복 뒷모습 인물과 철책을 그린 **일러스트**(설명 "서울신문DB") 900×600 → 4항 그래픽·4a · 파이낸셜뉴스: 5만원권 지폐 다발을 내미는 손 **스톡형 사진** + 매체 **워터마크**(설명 "파이낸셜뉴스DB", 2023 업로드) 1024×682 → 4·6항·워터마크 | — | public/images/2026-09-17-idontknowpolitics-sergeant-leak-china/thumb.jpg(+폴더) |
| 2 | 2026-09-27-ccpoutkorea-china-threat-survey | 문어·중국 국기·군중 **삽화** + 문구, 실사 얼굴 없음 | ③ | 중앙일보: 대통령과 중국 국가주석이 붉은 배경 앞에 선 사진(설명 "1월 5일 베이징 인민대회당 공식환영식") 882×568 → 여론조사 게시물과 **다른 일정**(4a) · SP뉴스: 매체 **로고** 이미지 200×200 → 4·8항 | — | public/images/2026-09-27-ccpoutkorea-china-threat-survey/thumb.jpg(+폴더) |
| 3 | 2026-09-23-jeichi-nk-mdl-crossing | 북한군·폭발 장면 **AI풍 연출 삽화** + 단정 자막 | ③ | MBC: 철조망 너머 산 능선 사진(페이지 표기 "자료사진") 1280×720 → 4a · 한국일보: 접경 너머 산과 들판 원경 사진(설명이 한미일 훈련 관련 문장으로, MDL 침범 장면·시점을 밝히지 않음) 1440×960 → 4a | — | public/images/2026-09-23-jeichi-nk-mdl-crossing/thumb.jpg(+폴더) |
| 4 | 2026-09-28-drumtong119-jinsungjoon-nsl-past | 철책·군화 **AI풍 삽화** + 자막 | ③ | 조선일보: 칼럼 필자 **흑백 증명사진**(비공인) 500×262 → 2·8항 · 머니투데이: 국방위원장 등이 군화를 들어 보는 9/28 전방 방문 사진 + **MT 워터마크** 1200×837 → 워터마크·다른 일정 · 더퍼블릭: 위원장 상반신(설명 "18일 … 회의에 참석하기 위해 이동") 600×416 → 이동 중 사진·다른 일정 · 유튜브: 채널A 로고·"현장영상"·큰 자막 썸네일 1280×720 → 4·11항 · 경향 10/28: 위원장석 발언 사진(설명 "국회사진기자단", 일시·장소 없음) 1200×800 → 4a · 경향 10/31: 위원장 발언 사진(설명 "연합뉴스", 일시 없음) 720×480 → 4a. 제목이 과거 판결을 소환하는 비난형이라 다른 일정 사진은 불가 | — | public/images/2026-09-28-drumtong119-jinsungjoon-nsl-past/thumb.jpg(+폴더) |
| 5 | 2026-09-28-pagememo-jcs-interim-result | 나무 상자 지뢰 **AI풍 삽화**, 얼굴 없음 | **②** | **동아일보 9/28 og:image** — 수풀 비탈의 헬멧 쓴 장병 뒷모습 흐린 영상 프레임 1600×900, 워터마크·글자 없음. 사진 설명(img alt, og:image와 같은 파일명 `134747560.1.jpg` 확인): "합동참모본부와 유엔군사령부 군사정전위원회가 26일 서부전선 비무장지대(DMZ) 지뢰 추정 폭발 사고 합동조사에 앞서 사전 점검을 위해 현장 기동로 확보 및 작전환경을 조사하고 있다. (사진=합참 제공) 2026.09.26." · 오마이뉴스 후보(9/28 브리핑하는 합참 차장, 3000×1938)는 사진 설명·본문에 계급이 없어 guide 선례(직위·계급 추정 금지)에 따라 쓰지 않음 | GET 200 image/jpeg · HEAD 200 · check:hotlinks OK | public/images/2026-09-28-pagememo-jcs-interim-result/thumb.jpg(+폴더) |
| 6 | 2026-09-28-shindawit-pla-fighter-wiretap | 헤드폰 쓴 인물 뒷모습 + 전투기 **연출 합성** + 문구 | ③ | 서울경제: 역광 속 국정원 깃발 사진(설명 "연합뉴스"뿐, 일시 없음) 860×573 → 4a · 노컷뉴스: 캠프 험프리스 군용 차량과 장병 원경(설명에 일시 없음) 710×456 → 4a | — | public/images/2026-09-28-shindawit-pla-fighter-wiretap/thumb.jpg(+폴더) |
| 7 | 2026-09-29-shindawit-cxmt-samsung-threat | 인물·로고 **AI 연출 이미지**(가짜 인물) + 인용 자막 | ③ | 중앙일보: 붉은 배경에 인물 그림이 든 반도체 칩을 손으로 집는 **일러스트** 1280×720 → 4항 · SBS: 로고·"자막뉴스"·큰 자막 썸네일 1280×720 → 4·11항 | — | public/images/2026-09-29-shindawit-cxmt-samsung-threat/thumb.jpg(+폴더) |
| 8 | 2026-10-08-shindawit-us-nis-cyber-group-excluded | 국정원 유리문 원장(院章) 사진 + 문구, 얼굴 없음 | ③ | 동아일보: 국정원장이 복도를 걷는 사진(설명 "회의가 끝난 후 이동") + **동아일보 워터마크** 1600×1219 → 이동 중 사진·워터마크 · 뉴시스: 국정원 유리문 원장 + **NEWSIS 워터마크**(설명 "2023년 11월 1일") 720×457 → 워터마크·4a · 헤럴드경제: 8월 도하훈련 장갑차·성조기 800×491 → 다른 일정 · 조선일보: 두 인물 얼굴을 붙인 합성(사진 설명 확인 불가) 1200×630 → 4·9항 · 펜앤마이크: 정당 현판 300×169 → 8항 | — | public/images/2026-10-08-shindawit-us-nis-cyber-group-excluded/thumb.jpg(+폴더) |
| 9 | 2026-10-03-rekor-saeul-nuclear-drone | 원전 돔 사진 + 문구·계정 로고, 얼굴 없음 | ③ | MBN: 원전·철책 화면에 "단독" 자막·MBN 로고·"500m 이내" 그래픽·**"AI 생성 영상" 표기** 640×360 → 4·11항·3.4(AI 생성) | — | public/images/2026-10-03-rekor-saeul-nuclear-drone/thumb.jpg(+폴더) |
| 10 | 2026-09-18-bluenews-jeju-organ-transplant-rumor | 돌하르방 사진 + 문구·계정 로고, 얼굴 없음 | ③ | 단비뉴스: "대체로 사실 아님" 계기판 **그래픽** 600×338 → 4·8항 · 주간경향: 야자수 농장의 경찰 감식 현장(설명이 다른 사망 사건) 660×429 → 다른 사건·피해자 사안 | — | public/images/2026-09-18-bluenews-jeju-organ-transplant-rumor/thumb.jpg(+폴더) |

### ② 1건 점검 (#5)
- 같은 사건·당시(4a): 게시물은 9/21 DMZ 폭발 사고의 9/28 합참 중간조사 발표를 다룬다. 사진은 그 사고 합동조사에 앞선 9/26 현장 사전 점검 장면이고 설명이 촬영일·목적을 밝힌다. 묶음 1 #9(같은 장면, 파이낸셜뉴스 기사)를 리뷰 38이 같은 기준으로 허용했다. caption은 "9월 26일 … 조사하는 장면"으로 적어 브리핑 당일 사진으로 오인될 문구 없음(ko 116자).
- 제외 11항: 얼굴 없음 · 로고·그래픽·SNS/기사 캡처 아님(기관 제공 영상 장면) · 사용 제한 표기 없음 · 짧은 변 900px(받은 파일) · 글자·워터마크 없음.
- frontmatter: `kind: news` · `src` = og:image · `sourcePageUrl` = `sources[].url` 글자 그대로(동아 주소, 01에서 포털을 바꾼 그 주소) · `creditName: 합참 제공` / `Joint Chiefs of Staff`(묶음 1과 같은 표기) · `retrievedAt: 2026-11-10` · `license` 없음.

## 영어본
- ② 1건: `imageAlt`·`imageCaption` 새 사진 기준으로 교체. ③ 9건: 삭제.
- 10건 ko·en 본문에 사이트 이미지를 가리키는 문장 0(grep "이미지의·위 사진·The image·photo above" 계열).

## updatedAt
- 10건 모두 변경 없음(이미지 필드만).

## 검증
- `npm run validate:content`: ✅ R=0. 대상 id 경고 1건은 **기존 description 길이 경고**(cxmt 170자 — 01 때부터 있던 것, description 미변경).
- `npm run check:hotlinks`: 점검 6건 · 정상 6건 · 깨짐 0건(#5 HEAD 200 image/jpeg).
- `/images/<id>/` 참조 0 · `public/images/<id>/` 폴더 10개 삭제 · `git diff --cached` 비어 있음.

## 바뀐 경로 (커밋 대상 30)
- 수정 20: `content/posts/{10 id}.md` · `content/posts-en/{10 id}.md`
- 삭제 10: `public/images/{10 id}/thumb.jpg`
- 문서: 이 트리거 · `instructions/uploader/processed/06-sns-image-batch-4.md`(이동)

## 리뷰어 참고
1. 26장을 직접 보고 적은 사유다. 사진 설명 글자만 보고 적은 칸은 없다(설명을 인용한 곳은 "설명 …"으로 표시).
2. #5 오마이뉴스 브리핑 사진은 직위("합참 차장")만 있고 계급 표기가 없어 쓰지 않았다. 직위가 법령상 장성급인 경우를 공인으로 볼지는 정책 판단 사항으로 남긴다.
