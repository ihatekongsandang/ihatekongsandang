# reviewer-57 — 업로더 19·19-1(비공인 실명 3차) + 사용자 URL 병합 1건 검토 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10 · 실행: 하위 에이전트
- 오더: `instructions/reviewer/processed/57-uploader-19-review.md`(이동)
- 읽은 것
  - 업로더 19 트리거 1~10절 전체와 업로더 19 오더, 병합 트리거
  - guide §1(병합)·§2·§4, PRD §6③, 정책 §3.1·§3.7, `content/README.md` `updatedAt` 행
  - 리뷰어 52 판정표, 리뷰어 56 트리거
  - `git diff`(HEAD a9effe1 기준) 콘텐츠 전체를 단어 단위로 읽었다.
- 법령 원문 조회(현행): 공수처법 제2조, 정부조직법 제36조, 해양경찰법 제11조, 경찰공무원법 제3조·제7조
- 하지 않은 것: 빌드, git add·commit·push·rm·checkout, `src/` 수정 모두 0이다.
  - 고친 파일은 오더 9항의 `docs/tools/reviewer-52/judgement-table-masked.tsv` 하나다.
  - 새로 만든 것은 `docs/tools/reviewer-57/` 3개, 이 트리거, 오더 이동이다.
- 판정 대상에서 뺀 변경(목록만): `src/app/(ko)/about/page.tsx`·`src/app/(en)/en/about/page.tsx`와 프로그래머 17 산출물, 기획 17-5 변경(`content/README.md`·`planning/q1-…`·`planning/v0.9-…`, 그 트리거·오더), 리뷰어 58 오더.
- 이 트리거에는 비공인 실명, 예외 인물 이름, 옛 id 문자열을 쓰지 않았다. 기사 HTML과 이름 패턴은 저장소 밖 임시 폴더에만 있다.

## 판정: ✅ 통과 — 커밋 가능 (P1 0 · P2 0 · P3 3)

---

## 1. 22명 판정 — 전수 확인, 22/22 맞음
근거 기사 21건을 모두 직접 받아 본문에서 해당 문구를 읽었다(21/21 HTTP 200). 법령은 원문을 조회했다. 이름은 ○로 가렸다.

| P | 업로더 판정 | 직접 확인한 근거 | 조문 | 본문 반영 | 결과 |
|---|---|---|---|---|---|
| P033 | 공인 | 파이낸셜뉴스 2026-09-27: "2022년부터 2년간 병무청장을 역임" | 정부조직법 제36조④ "청장은 정무직" → 사목(퇴직자 포함) | "(전 병무청장)" / en 같음 | ✅ |
| P077 | 19-1: 이니셜 | 세계일보 2026-10-27: "○○○ 합참 공보실장(해군 대령)" | 대령 = 비공인 표 | 두 게시물 ko·en에 "공보실장 ㅈ씨"·"J" | ✅(슈퍼바이저 결정대로) |
| P123 | 공인 | 헤럴드경제 2025-09-30: "제45대 합참의장으로 취임한 ○○○ 공군 대장" | 너목 | "(공군 대장)" 2게시물 ko·en | ✅ |
| P135 | 공인 | 뉴시스 2026-10-05 사진 설명: "합참 정보분석처장 ○○○ 육군 준장" | 너목 | "(육군 준장)" | ✅ |
| P026 | 공인 | 시사뉴스 2025-07-22: "21일 ○○○ 고용노동부 장관 … 임명안을 재가" | 사목 | "(같은 달 고용노동부 장관 임명)" 2게시물. 청문회가 2025년 7월이라 "같은 달"이 맞다 | ✅ |
| P052 | 공인 | 서울신문 2018-08-05(기존 출처): "바른미래당 ○○○ 전 의원" | 나목(퇴직자) | "전 국회의원(당시 … 후보)" | ✅ |
| P062 | 공인 | SBS Biz 2026-09-18: "○○○ 대법관 임명안 재가 … 현 정부 첫 대법관" | 다목 | "(9월 18일 대법관 임명)" | ✅ |
| P069 | 공인·id 유지 | YTN 2026-08-31: "판사 출신 민주당 재선 의원" | 나목 | "(더불어민주당 의원)" 등 2게시물 | ✅ |
| P080 | 공인·id 유지 | 파이낸셜뉴스(뉴스1) 2026-09-21(기존 출처): "○○○ 전 고용노동부 장관" | 사목 | "전 고용노동부 장관(전 국민의힘 대선 후보)" | ✅ |
| P086 | 공인 | 데일리안 2017-03-28: "바른정당 대선 후보로 ○○○ 의원이 28일 선출" | 나목 | "(당시 바른정당 국회의원)" | ✅ |
| P215 | 공인 | 더팩트 2018-03-14: "○○○ 더불어민주당 의원은" | 나목 | "(더불어민주당 국회의원)" | ✅ |
| P216 | 공인 | 서울신문 2018-06-09: 사진 설명 "○○○ 자유한국당 의원", 본문 "의원직 사퇴하라" | 나목 | "(국회의원)" | ✅ |
| P182 | 공인 | 국방부 장관(출처 제목에만 나옴). 판정표의 다른 행·게시물에서 (가) | 사목 | 변경 없음 | ✅ |
| P039 | 공인 | YTN 2026-07-02: "○○○ 더불어민주당 원내대변인 … ○○○ 의원입니다" | 나목 | "(더불어민주당 의원)" | ✅ |
| P075 | 비공인·예외 ① 유지 | 세계일보 2026-06-26(기존 출처): 대통령이 "'시민운동가' ○○○" 위원장 지명. 정무직 여부는 보도에서도 확인할 수 없음 | — | 직함 이미 있음. 게시물이 그 위원회의 공개성을 다루고 위원장 지명·위촉이라는 공개 활동을 실명 보도로 인용 → 예외 ①과 맞는다. 형사 절차 서술 없음 | ✅ |
| P091 | 공인 | 파이낸셜뉴스 2026-07-12: "○○○ 더불어민주당 의원 … 재선인 ○ 의원" | 나목 | "(국회의원)" 2게시물 | ✅ |
| P105 | 비공인·예외 불가 → 핸들만·id 이전 | 출처 3건(아시아경제·파이낸셜뉴스·디지털타임스)을 다시 받아 이 인물 이름(한글·로마자)을 검색: 3/3 0회 → 예외 ①의 "출처가 실명 보도" 요건 불충족 | — | 2절 | ✅ |
| P110 | 공인 | YTN 2026-01-21 출연자란: "○○○ 전 더불어민주당 의원" | 나목(퇴직자) | "(전 국회의원)" | ✅ |
| P121 | 공인 | 해양경찰법 제11조① "해양경찰청장은 치안총감으로 보한다", 경찰공무원법 제3조(치안총감이 최상위 계급)·제7조①(해양경찰청장 추천 임용 — 해양경찰도 이 법의 경찰공무원) | 하목 "경무관 이상 경찰공무원"(퇴직자 포함) | 변경 없음. 1심 무죄는 같은 문장에 있다(PRD §6③ 명확화) | ✅ |
| P158 | 확인 불가 → 이니셜 | 당헌상 대표 지위를 확인할 수 없고, 출처에 실명 보도가 없어 예외 ① 불충족 | — | 3절 | ✅(19-1 유지) |
| P171 | 비공인·예외 ① 유지 | 뉴시스 2024-01-19(기존 출처): "○○○ 국민의힘 대변인은 이날 오후 논평" | — | 비의원 정당 대변인의 본인 논평을 다루는 줄 → 예외 ① | ✅ |
| P160 | 공인 | 파이낸셜뉴스(뉴스1) 2026-09-02: "○○○ 경남경찰청장을 치안정감으로 승진시켜 경찰청 차장으로 임명", "경찰청장 직무대행을 맡게 된" | 하목 | "(경찰청 차장·치안정감)" | ✅ |

- **추가 출처 형식**: 새로 들어간 `sources[]` 항목은 모두 `type: 언론` · `name: 매체 — 기사 제목 그대로` · `url` · `date` 순서로 기존 항목과 같다. `date`는 각 기사 메타(`article:published_time`/`datePublished`)와 맞췄다. 확인한 것은 13게시물의 16항목이고 rekor 3항목을 포함한다.
- **직위 문구**: 넣은 괄호는 모두 기사 표현의 범위 안이다. 조사는 맞고, 영어본은 같은 자리에 같은 뜻으로 들어갔다.

## 2. P105 id 이전 — ✅
- `docs/tools/reviewer-56/id-move-check.mjs`를 다시 돌렸다. `moved-ids.txt` 9줄 모두 통과했다. 13행은 이번 건이고 결과는 retired·옛 id 0·옛 이미지 폴더 없음·ko/en `id` 일치다. 출력은 `docs/tools/reviewer-57/id-move-check-output.txt`에 있다.
- 옛 id 0건 범위: `content/`(두 txt 제외)·`src/`·`public/`·`scripts/`·`next.config.ts`·`vercel.json`.
- txt 형식은 선례와 같다. 각 1줄이고 파일 끝에 붙였다.
- 내부 링크 2곳(ko·en `2026-10-07-gotdemcatch-…`)은 새 id로 바뀌었다. validate h도 통과했다.
- ko·en 새 파일의 `publishedAt`·`translatedAt`은 HEAD 옛 파일과 같다.
- 바뀐 줄은 ko 2·3·4·8행, en 2·3·5행이다. `speaker` 필드는 원래 없다.

## 3. P077·P158 이니셜, P158 이미지 — ✅
- 이름 패턴(전체 이름·성 단독·로마자)으로 다시 찾았다. 두 인물 모두 게시물 418개와 추적·미추적 텍스트 2,008개에서 **0회**다.
  - P077: 2게시물 ko·en 4파일. id·태그·이미지에도 없다.
  - P158: 제목·설명·speaker·alt·본문·태그(삭제), en 설명·imageAlt·본문.
- `public/images/2026-10-12-hagonolza-equal-earth-dokdo/thumb.jpg`를 직접 열었다. 1200×675이고 글자는 아래와 같다(줄 구분 `/`).
  - 세계지도 이퀄어스 한국어판에서 독도 삭제 / — 제작자 "한·일 대사관과 협의" vs 외교부 "사실 아냐" / 반크가 만들어 6월 공식 등재한 한국어판 지도, 10월 독도 빠져 / 외교부: 일본과 삭제 협의·동의한 사실 전혀 없어, 시정 요구 / 원문이 전한 비대위원장 ㅇ씨 "탄핵감" 발언은 보도로 미확인 / 공산당이싫어요 자체 제작 이미지
  - 실명 0, ko `image.alt`와 같다. "보도로 미확인" 유보 표현도 유지됐다.

## 4. 태그 — ✅
- ko 게시물 209개의 고유 태그 316개를 모두 뽑아 사람 이름 태그를 하나씩 대조했다. 영어본에는 `tags`가 없다.
- **지운 7줄(6종)**: P024·P059(2게시물)·P041·P054·P158·P089. 지운 뒤 같은 태그를 쓰는 게시물은 0이다.
- **사라진 `/tag/` 주소 6개**: `/tag/` + P024·P059·P041·P054·P158·P089 태그 문자열이다. 이름이 들어 있어 여기에는 적지 않는다(`git diff -- content/posts`의 `-  - …` 7줄로 확인 가능).
  - 리다이렉트가 없어 옛 태그 주소는 404가 된다.
  - 태그 주소는 사이트맵이 빌드 때 다시 만든다.
- **남은 이름 태그 41개 = 공인 40 + 사건 별칭 1**: 하나씩 확인했다.
  - 공인 40은 대통령·전 대통령, 총리·장관·대통령실·국정원장, 국회의원·정당 지도부, 단체장, 대법원장·검사, 외국 정상, 북한 지도자, 대통령 배우자다. 이번 1절의 공인(P080)과 P087도 들어 있다.
  - 사건 별칭 1은 익명 계정 사건명이고, 슈퍼바이저 결정대로 유지했다.
  - 41개 모두 판정표 (가) 또는 이번 1절 공인이다. 비공인·예외 인물 태그는 0이다.
- P089 성+계급 태그 삭제와 계정 별칭 태그 유지는 19-1 결정과 같다.

## 5. 문서 잔존 — ✅
- 리뷰어 56 7절의 추적 14파일과 미추적 history 5줄(10-08:34·36, 10-11:21·38, 10-12:3)을 다시 검사했다. 1·2·3차 인물 이름은 **0회**다. 10-12:52(P158)도 함께 정리됐다.
- P077·P158·P105의 `content/` 밖 추적 파일도 0회다.
- 고친 문서 19파일의 diff를 직접 읽었다.
  - 표기표·검토표 행은 이니셜이나 "핸들로 표기"로 바뀌었고 기록의 뜻은 남았다.
  - `data.json`은 JSON으로 읽힌다. `gen.py`는 구문 분석을 통과했다.
- 남은 것(오탐·기록)
  - P146 성이 든 **유튜브 채널명** 3줄: 게시물 2줄 + 다른 트리거 1줄. 출처 채널 표기라 결함이 아니다(리뷰어 54 P3-4 참고와 같다).
  - 다른 낱말·다른 인물에 걸린 오탐 4줄
  - #6·P105 옛 id 속 로마자 이름이 측정 기록 문서에 남아 있다. P105는 추적 16파일과 미추적 1파일(프로그래머 17 로그)이다 → P3-2.

## 6. rekor-dmz 정정 — ✅
- 경향신문 2026-09-26과 파이낸셜뉴스 2026-09-26(기존 출처)을 직접 열었다.
  - 두 기사 모두 수석대변인 서면 브리핑은 "국민의힘이 안보를 정쟁의 도구로 삼는 행태가 도를 넘어서고 있다"로 전한다.
  - "정부와 군은 북한이 매설한 지뢰일 가능성을 배제한 적이 없다 … 모든 가능성을 열어놓고 조사하고 있다"는 경향신문이 "○○○ **원내대변인**도 … 서면브리핑에서"로 전한다.
  - 따라서 정정 내용이 맞다.
- 원내대변인 직위: 오마이뉴스 2026-06-04 "… ○○○ 아산을 당선(보궐 선거 국회의원 당선)"을 직접 확인했다 → 나목, 공인.
- 형식
  - ko는 `updatedAt: 2026-11-10`(`publishedAt` 다음 줄)을 넣었다. README의 "`updatedAt` = 내용을 고친 날"과 맞다.
  - 정정 블록은 `> 🔁 **정정 (2026-11-10)**: …`이다. 선례 `2026-09-28-2pro-jcs-interim-claim`의 `> 🔁 **정정 (날짜)**:` 형식과 같다.
  - en은 `translatedAt: 2026-11-10`과 `> 🔁 **Correction (2026-11-10)**` 블록을 넣었다. "번역 이후 갱신" 경고가 나지 않는다.
- 제목·설명은 발언자를 "민주당"으로만 적어 정정할 곳이 없다.

## 7. 병합 건 — ✅
- 원문 릴스의 embed 캡션을 직접 받아 읽었다(HTTP 200). 같은 회견에서 같은 중령(9공수특전여단 소속이라고 밝힘)이 읽은 성명 전문이 맞다.
- guide §1 병합 양식과 맞다: 서두 1문장(계정 링크 + "별도 게시물 대신 여기에 함께 적습니다") + 차이점("성명 속 정부 비판 표현은 발언자의 의견이라 요약에 옮기지 않았습니다").
- 인물은 기존대로 ko ㅇ씨·en Y다. `updatedAt`·`translatedAt`은 바뀌지 않았다. 이미지 저장 0, 카드 변경 0, 새 출처 0(새 보도 없음).

## 8. updatedAt·validate — ✅
- 콘텐츠 diff에서 날짜 필드가 바뀐 것은 rekor ko `updatedAt` 추가와 en `translatedAt` 두 줄뿐이다. P105의 `-publishedAt`·`-translatedAt`은 옛 파일 삭제분이고, 새 파일 값은 같다.
- `npm run validate:content`: ✅ 418/418, 오류 0, 옮긴 id 9 · 리다이렉트 18. 경고 22개는 리뷰어 56 때와 목록이 같다(새 경고 0).

## 9. 리뷰어 판정표 정정 — ✅ 반영함
- `docs/tools/reviewer-52/judgement-table-masked.tsv`를 고쳤다(221행 그대로, 24행 수정). 바뀐 행의 P·초성·판정·분류는 `docs/tools/reviewer-57/judgement-table-changes.txt`에 있다.
  - **P020 → 가 G1**: 전 국회의원 17대, 나목. 리뷰어 54 3절.
  - **P087 → 가 G1**: 전 국회의원·전 장관, 나목·사목. 리뷰어 56 3절.
  - **이번 22명도 반영했다.** 판정표가 이니셜 전환 작업의 기준표로 계속 쓰이므로, 기사·법령으로 확정된 결과를 남겨야 다음 오더가 옛 (다) 판정을 다시 쓰지 않는다.
    - 공인 17 → 가: G1·G4·G5·G6, 경찰은 새 분류 **G12 "경무관 이상 경찰(하목)"**
    - P077 → 나 N1
    - P075·P171 → 나 N2(예외 ①)
    - P105 → 나 N2(예외 불가)
    - P158 → 다 D3 유지(이니셜)
    - P160은 같은 이름의 다른 사람과 행을 나눠 쓰므로 해당 파일 예외 칸만 가:G12로 고쳤다.
- 각 행 근거 칸 끝에 "(리뷰어 57 정정 2026-11-10)"을 붙였다. 이름은 쓰지 않았다.

## 10. 산출물 — ✅
- 업로더 19 트리거, 병합 트리거, 업로더 19 오더, `history/2026-11-10.md`, 이 리뷰 오더, 판정표를 검사했다.
  - 비공인 실명 0, 예외 인물 이름 0, 옛 id 0, 홈 경로 0.
  - 저장소 독립 패턴(pre-commit 훅과 같은 것) 0.
- 저장소 독립 검사를 콘텐츠·문서 diff 추가 줄 전체(`src/` 제외)와 새 게시물 2개에도 했다 → 0건.
- 이 트리거와 `docs/tools/reviewer-57/`도 같은 패턴으로 검사했다 → 0건.

---

## 결함·권고

### P1 — 0 · P2 — 0

### P3 — 3건 (모두 선택·후속)
- **P3-1** P105의 계정 핸들(attribution `@…`) 자체에 이 인물 이름의 로마자가 들어 있다. "계정명만 표기" 규칙(CLAUDE.md)상 허용되고 D6 처리와도 같아 결함은 아니다. 다만 "예외 불가 비공인"인데 핸들로 이름이 드러나므로, 핸들도 가릴지는 사용자·슈퍼바이저가 정할 일로 올린다.
- **P3-2** P105 옛 id(로마자 이름 포함)가 기록 문서에 남아 있다. 추적 16파일과 미추적 `docs/tools/programmer-17/gate-worktree.log` 1개다. 리뷰어 54 P3-6·56 P3-4와 같은 처리(기록 유지)다.
- **P3-3** `docs/tools/designer-04-B/data.json`의 태그 집계 배열에 이번에 지운 예외 인물 태그 5종(P024·P059·P041·P054·P089)이 그대로 있다. 업로더는 비공인 2종만 지웠다. 시안용 스냅숏이고 시안 10개에는 이 태그가 나오지 않는다(확인함). 그래도 태그 규칙과 맞추려면 같은 방식으로 지운다.

---

## 커밋할 경로 전체

**업로더 19·19-1 — 콘텐츠**
- `content/moved-ids.txt`, `content/retired-ids.txt`
- 삭제 2: ` D content/posts/…`·` D content/posts-en/…` (P105 옛 id — 경로를 적지 않음. `git add -A content/posts content/posts-en`이면 잡힌다)
- 새 2: `content/posts/2026-09-28-instagram-chief-justice-audit-witness.md`, `content/posts-en/2026-09-28-instagram-chief-justice-audit-witness.md`
- 수정 ko 26: `content/posts/` 아래
  - `2026-07-04-idontknowpolitics-2018-freedom-deletion`
  - `2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract`
  - `2026-08-29-idontknowpolitics-martial-law-nk-policy`
  - `2026-09-10-ansanheart-academy-merger`
  - `2026-09-10-freedominnovation-nec-bill`
  - `2026-09-10-geonwoo-jeongyulseong-song-contest`
  - `2026-09-13-geonwoo-brother-hospitalization-case`
  - `2026-09-13-geonwoo-professor-2023-remark`
  - `2026-09-14-yongkeun-justice-hearing-lee-trial`
  - `2026-09-15-joojinwoo-kimseungwon-hearing`
  - `2026-09-20-nowandhere-mdl-mine-briefing-reel`
  - `2026-09-21-kimmoonsoo-prosecution-abolition`
  - `2026-09-24-politicscrush-main-enemy-politicians`
  - `2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard`
  - `2026-09-26-rekor-dmz-dispute`
  - `2026-09-28-kimjanggyeom-hanjunho-kbs-complaint`
  - `2026-09-28-parkchoongkwon-dp-mine-remarks`
  - `2026-09-29-osj17x-hankiho-president-instruction`
  - `2026-09-30-2pro-unc-armistice-violation`
  - `2026-09-30-shindawit-nk-mdl-50-crossings`
  - `2026-10-05-shindawit-mdl-south-minefields-20m`
  - `2026-10-07-gotdemcatch-kimminseok-chief-justice-resign`
  - `2026-10-08-shindawit-us-nis-cyber-group-excluded`
  - `2026-10-12-hagonolza-equal-earth-dokdo`
  - `2026-10-13-yeong573-police-bodycam-china`
  - `2026-11-04-leejinsook-martial-law-soldiers-presser`(병합 포함)
  - 위 26개는 모두 `.md`다. P105 새 파일은 위에 따로 적었다.
- 수정 en 21: `content/posts-en/` 아래, ko 26개에서 `2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract`·`2026-09-10-geonwoo-jeongyulseong-song-contest`·`2026-09-13-geonwoo-professor-2023-remark`·`2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard`·`2026-09-30-2pro-unc-armistice-violation`(태그만 바뀐 ko 5개)을 뺀 같은 이름 21개. `git status`의 ` M content/posts-en/` 21줄과 같다.
- 이미지: `public/images/2026-10-12-hagonolza-equal-earth-dokdo/thumb.jpg`

**업로더 19·19-1 — 문서**
- `docs/handoffs/translator-01-english-batch-1.md`, `docs/handoffs/translator-02-english-batch-2-opus.md`
- `docs/reviews/card-image-policy-legal-review.md`, `docs/reviews/programmer-03-remove-status-label-review.md`
- `docs/supervisor/drafts/2026-09-21-nowandhere-mdl-mine-reel.md`, `docs/supervisor/drafts/2026-09-28-held-recheck.md`
- `docs/tools/designer-04-B/data.json`, `docs/tools/reviewer-07/approved-posts/2026-09-20-nowandhere-mdl-mine-briefing-reel.md`
- `docs/tools/reviewer-14/results/{gate-arg-order,gate-exit3-symlink,gate-negative-staged-type-error,gate-staged-10paths,sig-INT-pgrp,sig-TERM}.log`
- `docs/tools/reviewer-24/forbidden-terms-output.txt`, `docs/tools/reviewer-26/x-truncation-audit-output.txt`
- `docs/tools/reviewer-30/gen.py`, `docs/tools/reviewer-30/image-recheck.tsv`, `docs/tools/reviewer-30/post-recheck.tsv`
- 기록: `docs/triggers/uploader-19-nonpublic-name-3-COMPLETE.md`, `instructions/uploader/processed/19-nonpublic-name-3.md`

**병합(사용자 URL)**
- `docs/triggers/poster-merge-wikipost_mag-DfUjVLUuRxo-COMPLETE.md`. 콘텐츠 2파일(`2026-11-04-leejinsook-…` ko·en)은 위 목록에 있다.

**리뷰어 57**
- 이 트리거, `docs/tools/reviewer-57/`(3개), `docs/tools/reviewer-52/judgement-table-masked.tsv`, `instructions/reviewer/processed/57-uploader-19-review.md`

**미추적 history (별도 — 업로더 19가 고친 것)**
- `history/2026-10-08.md`, `history/2026-10-11.md`, `history/2026-10-12.md`
- 다른 미추적 history와 함께 넣을지는 슈퍼바이저가 정한다. 세 파일 모두 1·2·3차 인물 이름이 0이다.

**슈퍼바이저 영역(판정 대상 아님)**: `history/2026-11-10.md` ` M`(여러 세션 기록이 섞여 있음), `history/2026-10-01.md`·`2026-11-05.md`·`2026-11-09.md` ` M`(다른 세션).

**넣지 않을 것(다른 작업)**: `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`, `docs/tools/programmer-17/`, 프로그래머 17 핸드오프·트리거·오더, `content/README.md`·`planning/q1-redirect-q2-sns-image-plan.md`·`planning/v0.9-copy-and-code-list.md`(기획 17-5), 기획 17-5 트리거·오더, `instructions/reviewer/58-…`, 테스터 01 산출물, `docs/tools/planner-07/` 등 미추적 저장본.

## 도구 (`docs/tools/reviewer-57/`)
| 파일 | 내용 |
|---|---|
| `name-residual-scan-output.txt` | `docs/tools/reviewer-54/name-residual-scan.mjs`를 1·2·3차 + P077·P158·P105 패턴(저장소 밖)으로 다시 돌린 결과(오탐 표기 포함) |
| `id-move-check-output.txt` | `docs/tools/reviewer-56/id-move-check.mjs` 결과(9/9 통과) |
| `judgement-table-changes.txt` | 판정표 정정 24행의 P·초성·판정·분류 |

## 수치
- 22/22명 판정 확인. 근거 기사 21건 + P105 출처 3건 + 병합 원문 1건, 모두 HTTP 200. 법령 4개 법률 6개 조문.
- 태그 316종 전수 대조: 삭제 6종(7줄), 유지 41.
- 이름 검사 텍스트 2,008개(게시물 418/418) → 비공인 이름 0(오탐·채널명 제외).
- moved-ids 9/9, validate 418/418, 새 경고 0.
