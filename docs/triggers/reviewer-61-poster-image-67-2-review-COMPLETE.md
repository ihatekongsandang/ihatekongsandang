# reviewer-61 — 자체 제작 카드 묶음 2(업로더 22) 검토 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11 · 실행: 하위 에이전트
- 오더: `instructions/reviewer/processed/61-poster-image-67-2-review.md`(이동)
- 읽은 것: 업로더 22 오더·트리거 전체, 시범 트리거 보완 diff, 콘텐츠 diff(ko·en 24파일), 정책 §3.1·1a(북한 지도자·대사 공식 일정, 북한 사진은 근거 언론 og:image·출처 표기·사용 제한 확인), 지침 단계 1~4
- 금지 사항 준수: 빌드·git 쓰기·`src/` 수정 0, 콘텐츠 수정 0
- 받은 기사 HTML 13건·사진 13장은 저장소 밖 임시 폴더에만 두었다. 측정에는 `docs/tools/reviewer-59/faces.swift`·`meta.py`를 다시 썼다.

## 판정: ✅ 통과 — 커밋 가능 (P1 0 · P2 0 · P3 1)

---

## 1. ② 3건 — 3/3 직접 확인, 모두 맞음

| tsv · id | 원본(직접 받음) | 사진 설명(원문 HTML) | 인물·원경 | 제외 11항 · 4a | 필드 |
|---|---|---|---|---|---|
| #29 `2026-10-07-yeong573-parkchoongkwon-filibuster-2025` | 파이낸셜뉴스 2025-09-28 og:image = `image.src`, **1200×800**, 200 `image/jpeg` | "○○○ 국민의힘 의원이 28일 … 본회의에서 국회법 개정안에 대한 필리버스터를 하고 있다. 뉴스1" | (가) 현직 의원(발언대, 양쪽 현장 전광판 "무제한토론 ○○○ 의원"). (다) 의장석·단상 인물은 눈으로 봐도 머리가 약 10 px 안팎이라 5% 미만이다(Vision 검출 0). 앞줄 2명은 뒷모습 | 워터마크·덧씌운 글자 없음(전광판은 현장 실물). 기사 HTML의 제한 문구는 일반 고지("무단전재-재배포 금지")뿐. **4a** 같은 날 같은 필리버스터. 의혹 사안 아님 | `faceNote` "원경 인물 8명(얼굴 최대 약 8 px / 짧은 변 800 px)" §3.5 형식 ✅. credit 뉴스1 ✅. en 교체 ✅ |
| #31 `2026-10-08-finf-un-first-committee-mine-clash` | 머니투데이 10/9 og:image(매체 CDN 리사이즈 주소 그대로) = `image.src`, **1200×898**, 200 `image/jpeg` | "○○○ 주유엔한국대표부 대사가 8일(현지시간) 미국 뉴욕 유엔본부에서 열린 회의에서 발언하고 있다. /유엔 웹TV 캡처" | (가) 대사(1a — 공식 일정 회의 발언), 현장 명패 "REPUBLIC OF KOREA". Vision 1명뿐. 왼쪽 인물은 몸통만, 오른쪽 인물은 손만 보여 얼굴이 없다 | 유엔 웹TV 화면이지만 방송 로고·자막·덧씌운 글자가 없다(눈으로 확인). 사용 제한 0. 짧은 변 898. **4a** 10/8 제1위원회 같은 장면 | `faceNote` "원경 인물 2명(뒷모습·옆모습·흐림 — 정면 없음)" 형식 ✅. credit 유엔 웹TV(사진 설명 출처) ✅. en ✅ |
| #58 `2026-10-24-khan-nk-third-company-commanders-conference` | 동아일보 10/24 og:image = `image.src`, **1507×1000**, 200 `image/jpeg` | "북한 노동당 기관지 노동신문은 24일 '조선인민군 제3차 중대장대회가 10월 22일과 23일 수도 평양에서 진행됐다'고 보도했다. … 김정은 총비서가 참석해 대회를 주재했다. 평양 노동신문=뉴스1" | (가) 북한 지도자 단독(1a, 공식 일정). Vision 1명 | 근거 언론 기사의 og:image이고 북한 매체 원본이 아니다. 사진 설명의 출처 "노동신문"이 `creditName`에 반영됐다. 기사 HTML에 "국내에서만"·"재배포 금지"·"DB 금지"·"For Use Only" 표기가 0이다(7항 통과). 워터마크·로고 없음(눈으로 확인). **4a** 같은 대회 | `faceNote` 형식 ✅. en ✅. 본문에 카드 문장이 원래 없었다 |

- 3건 모두 `license` 0, 사진 기자 이름 0, 비공인 실명 0. `sourcePageUrl` 3/3이 `sources[]`와 같다(validate f).

## 2. ③ 9건 — 9/9 사유 직접 확인, 처리 선례대로

| tsv · id | 직접 확인한 불가 사유 |
|---|---|
| #3 `…jeongyulseong-song-contest` | 펜앤드마이크 og:image **300×200**(8항). 디지털타임스 **540×291**(8항) |
| #6 `…chung-no-kaesong-lawsuit` | 뉴스1 사진 설명 "… 남북공동연락사무소가 폭파된 채 방치된 모습. **2021.1.4**" → 자료사진(4a) |
| #8 `…25div-death` | 한국일보 9/21 사진 설명 "… **8일** 경기도 파주시 접경지역에서 바라본 서부전선 DMZ … 방벽" → 9/21 사고와 다른 날(4a) |
| #12 `…mexico-17-agreements` | 파이낸셜포스트 og:image **300×205**(8항). 서울신문 "재판매 및 DB 금지"는 업로더 20에서 리뷰어 59가 같은 기사로 확인했다 |
| #17 `…alaska-lng-vs-dmz-mine-response` | 아주경제 9/30 og:image **640×381**(8항). 사진 설명 "합참 작전본부장이 30일 …" |
| #50 `…police-bodycam-china` | 조선일보 10/12: Vision에서 주인공 외 (다) 얼굴 박스가 137·134·125 px / 630 = 20~22%다. 초점 밖이지만 알아볼 수 있는 정도라 "흐림"으로 보기 어렵다. 사진 설명이 주인공만 지목하므로 배석자 확인이 없어 (나)가 성립하지 않는다(업로더 20 11-#9 선례) → 불가. 9/22 보디캠 비교는 글자 설명 중심 그래픽 |
| #52 `…safety-drill-poster-insignia` | KBS og:image(1920×1080)에 "KBS 1" 채널 로고·"뉴스라인 W" 프로그램 로고·수어 통역 화면이 있다(눈으로 확인) |
| #55 `…equal-pay-equal-work-roadmap` | KBS og:image **640×360**(8항) |
| #63 `…lee-kimilsung-remark-2024` | 뉴시스 og:image 오른쪽 아래에 "NEWSIS" 워터마크가 있다(눈으로 확인) |

- 9건 모두 ko `image:` 블록 0, en `imageAlt`·`imageCaption` 0, 옛 파일 삭제. 정책 302행("B도 불가면 새 대체 카드, 이미지 필드 없음")과 시범 #16 처리와 같다.

## 3. 시범 트리거 보완·정정 — ✅ 명확함
- 1절 본문에 "⚠️ 정정(2026-11-11) … **#8·#17은 시범 때 실제로 시도하지 않았다.** 묶음 2(업로더 22)에서 두 건을 실제로 시도해 … 사유를 더했다"가 들어갔다.
  - 처음 기록이 사실이 아니었다는 점, 언제·어디서 실제로 시도했는지가 분명하다.
  - 원래 문장을 지우지 않고 정정 표시로 남겨 기록 이력도 남는다.
- 더한 두 줄의 사유를 이번 묶음 2절에서 원문으로 확인했다. #8은 한국일보 "8일" 사진, #17은 아주경제 640×381이다. 업로더 22 트리거 0절과도 맞다.

## 4. 옛 파일·본문·updatedAt·validate·핫링크 — ✅
- 삭제 12개는 `git status` ` D` 12줄과 같다.
- 남은 자체 카드 **50**: `public/images/` 폴더 50 = `src: /images/` 참조 게시물 50. 참조 없는 폴더 0, 깨진 참조 0. validate "self 50 · news 30"도 같다.
- 12건 ko·en에 "자체 제작"·"텍스트 카드"·"made by this site" 0.
- 바뀐 본문 문장은 "…은/는 쓰지 않았습니다"다. 사실이 같아 `updatedAt`을 바꾸지 않은 것은 선례(업로더 04·05, 시범 묶음 1)와 같다. diff에 날짜 필드·`license` 변경 0.
- `npm run validate:content` R=0, 418/418. 경고 22개는 리뷰어 57·60 때 목록과 같다. #12 description 181자는 이전부터 있던 경고다.
- 핫링크 3/3 200.

## 5. 산출물 — ✅
- 확인한 파일: 업로더 22 트리거·오더, 시범 트리거 보완분, `history/2026-11-11.md`, 콘텐츠 24파일.
- 결과: 비공인 실명 0(1~3차 이름 패턴), 사진 기자 이름 0, 옛 id 0, 홈 경로 0, 저장소 독립 패턴 0.
  - 나오는 이름은 공인(국회의원·대사·북한 지도자·경찰청장 직무대행)뿐이다.
- 이 트리거도 같은 패턴으로 검사했다 → 0건.

---

## 결함·권고

### P1 — 0 · P2 — 0

### P3 — 1건
- **P3-1** 업로더 트리거 2절 #50 행에 "10/12: … 사진 설명 원문 HTML에서 찾지 못함"이라고 적혀 있다. 그러나 조선일보 페이지의 JSON에 사진 설명이 있다("경찰청장 직무대행이 12일 … 국정감사에서 … 답변하고 있다. /뉴스1"). 이 설명도 주인공만 지목하므로 결과(③)는 그대로다. 다음 묶음 입력이 되는 기록이므로 "사진 설명 있음(주인공만 지목) — 배경 (다) 20%대로 불가"로 고치기를 권한다. 조선일보는 사진 설명이 HTML 태그가 아니라 스크립트 JSON의 `"caption"` 값에 있다.

## 다음 묶음 크기 의견
- 묶음 2는 12건 중 ②가 3건(25%)이었다. 주된 불가 사유는 8항(작은 og:image)·방송 화면·4a다.
- 남은 50건 중 B 계열은 줄고, `없음`·`없음(권고)` 22건은 따로 일괄 처리할 예정이다. 다음 B 묶음도 **10~12건**이면 적당하다.
- 다만 원 매체 og:image가 작은 매체(8항)는 같은 기사의 다른 매체판을 먼저 찾도록 하면 통과율이 오를 것이다.

## 커밋할 경로
- 업로더 22
  - `content/posts/` ko 12개(`.md`): `2026-09-10-geonwoo-jeongyulseong-song-contest`, `2026-09-18-newssnap-chung-no-kaesong-lawsuit`, `2026-09-22-lotuslantern-25div-death`, `2026-09-28-solsol-mexico-17-agreements`, `2026-10-02-alaska-lng-vs-dmz-mine-response`, `2026-10-07-yeong573-parkchoongkwon-filibuster-2025`, `2026-10-08-finf-un-first-committee-mine-clash`, `2026-10-13-yeong573-police-bodycam-china`, `2026-10-14-gotdemcatch-safety-drill-poster-insignia`, `2026-10-18-wikipost-equal-pay-equal-work-roadmap`, `2026-10-24-khan-nk-third-company-commanders-conference`, `2026-11-03-happenbosu-lee-kimilsung-remark-2024`
  - `content/posts-en/` 같은 이름 12개
  - 삭제 12: `public/images/{위 12개 id}/thumb.jpg`(`git add -A public/images`)
  - `docs/triggers/poster-image-67-1-COMPLETE.md`(보완·정정), `docs/triggers/poster-image-67-2-COMPLETE.md`, `instructions/uploader/processed/22-self-card-67-batch-2.md`
- 리뷰어 61: 이 트리거, `instructions/reviewer/processed/61-poster-image-67-2-review.md`
- 슈퍼바이저 영역(판정 대상 아님): `history/2026-11-11.md` 외 ` M` history 4개
- 넣지 않을 것: `instructions/tester/processed/01-…`, 테스터 01 산출물, 미추적 history·`docs/tools/planner-07/`·screens 폴더

## 수치
- ② 3/3, ③ 9/9 확인. 기사 HTML 13건·사진 13장 직접 열람(모두 HTTP 200).
- 자체 카드 50 = 폴더 50 = 참조 50.
- validate 418/418 통과.
