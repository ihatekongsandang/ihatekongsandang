# poster-image-67-5 — 자체 제작 카드 마무리 묶음 5 (B 6건 + 이미지 없음 23건) — COMPLETE

- 담당: 반공-업로더 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11
- 오더: `instructions/uploader/processed/25-self-card-67-batch-5-final.md`(이동)
- 선행 문서: 묶음 4와 같다.
  - CLAUDE.md, guide §2·§4·§4-1, 정책 전체(§5.1 4a 판정 순서).
  - 지침 단계 1(해석표·"정책 결정 필요" 해소표·"#1 게시물과 #67")·단계 2~4.
  - post-recheck tsv, 시범·묶음 2~4 트리거.
- 선례(묶음 3·4)를 적용했다.
  - 명패·현판·간판으로 비공인 실명이나 의혹 대상 단체명이 읽히면 불가.
  - 사진은 `sources[]`에서만 고른다.
  - 의혹 대상 조직 비공인 정면 불가.
  - 4.5~5%는 재측정.
- 빌드 0, git add·commit·push 0, `src/`·설정 수정 0. 사진은 저장하지 않았다. 판정용 사본은 저장소 밖 임시 폴더에만 받았고 끝난 뒤 지웠다.
- 🕒 **소요 시간**: 시스템 시계 기준 08:41 착수 → 08:44 validate → 트리거 작성. B 4건의 기사 15건 og:image·사진 설명을 받아 판정했다(#33 1 · #36 6 · #37 5 · #42 3). 시계값이 실제 작업량보다 짧게 찍혔을 수 있어, 숫자는 시계 그대로 적는다.

## 0. 대상 다시 세기
- 작업 전 `image.src`가 `/images/…`인 게시물(ko)은 **29건**, `public/images/` 폴더도 29개였다(1:1).
- 29건의 구성:
  - B 계열 6건: #32·#33·#36·#37·#42·#56.
  - 이미지 없음 23건: tsv `없음` 20건, `없음(권고)` 1건(#67), #48(지침 단계 1 해소표에서 "이미지 없음"), tsv 밖 1건(`2026-09-30-2pro-unc-armistice-violation`).
  - 리뷰어 63 P3 숫자와 같다.
- id 대조: tsv 옛 id는 `content/moved-ids.txt`로 새 id에 맞췄다. 이 트리거에는 새 id만 쓴다.

## 1. B 6건 판정
- 지난 네 트리거에서 걸러낸 후보 기사는 다시 받지 않았다.
- 예외는 #37 한국경제 10/5 1건이다. 시범에서 받았는데 이번에 실수로 다시 받았고, 결과는 시범과 같다(아래 표에 표시).

| tsv | id | 받은 기사 · 이미지 | 사진 설명 | 판정(제외 11항 · 4a) | 결과 | 바꾼 파일:줄 |
|---|---|---|---|---|---|---|
| #32 | `2026-10-08-focusone-ganghwa-drifting-mine` | 새로 받을 기사 없음. `sources[]` 3건(한국경제·아주경제·강원도민일보)을 시범에서 모두 판정했다 | — | 시범 사유: 다른 탐색 작업·다른 브리핑(4a) · 800×374(8항) | **③** | B1 |
| #56 | `2026-10-20-monarchreport25-lee-kim-held-back-2025` | 새로 받을 기사 없음. `sources[]` 2건(한국일보·경향)을 시범에서 모두 판정했다 | — | 시범 사유: 인터뷰 날짜 서술이 엇갈림(판정 불가) · 신원 미확인 배석 인물 정면 약 6%(9항) | **③** | B6 |
| #33 | `2026-10-08-monarch-us-congress-ccp-influence-korea` | Washington Times 2026-07-23 (`sources[]` 마지막 1건) | — | 페이지가 봇 확인 화면으로 **HTTP 403**을 돌려 받지 못했다. 우회하지 않았다. 사진을 보지 못해 사건 당시 사진인지 판정할 수 없다(정책 §5.1 "판정하지 못하면 불가"). 이 기사는 7/23 법안 보도이고, 게시물 사안은 9/30 서한이다. 나머지 3건은 시범에서 불가 | **③** | B2 |
| #36 | `2026-10-09-gotdemcatch-lee-five-trials-suspended` | 법률신문 `https://www.lawtimes.co.kr/news/articleView.html?idxno=209958` (600×400) · 머니투데이 `https://www.mt.co.kr/society/2025/06/11/2025061115275792669` (1200×743) · 경향 `https://www.khan.co.kr/article/202607311109001` (1179×823) · 연합뉴스 `https://www.yna.co.kr/view/AKR20260714087100004` (1200×800) · 동아 2021 `https://www.donga.com/news/article/all/20210704/107782915/1` (560×400) · 동아 2026 `https://www.donga.com/news/Society/article/all/20261005/134788391/1` (1600×1066) | 법률신문 "이재명 대통령" · 머니투데이 "9일 … 헌법재판소 전경 /사진=뉴시스" · 경향 사진 설명 없음(파일명 2026-06-02) · 연합 "… 14일 청와대에서 열린 국무회의에 입장하고 있다. 2026.7.14" · 동아 2021 "© News1 DB" · 동아 2026 "… 전 경기도 평화부지사가 14일 … 청문회에서 발언 … 2026.4.14" | 법률신문: 촬영 시점·장소 없음(4a 1번) · 머니투데이: 헌재 전경, 게시물 사안(재판 중단)과 다른 대상(4a) · 경향: 사진 설명 없음(단계 2) · 연합: 국무회의 입장, 다른 일정(4a), 배석자 정면 Vision 100~112px/800 = 12~14%(9항) · 동아 2021: DB 자료사진(4a) · 동아 2026: 다른 인물(퇴직 지방 부지사 — §3.1 공인 범위 밖), 다른 일정(4a) | **③** | B3 |
| #37 | `2026-10-09-themovemag-chinese-residents-1m` | 한국경제 10/5 `https://www.hankyung.com/article/2026100537571`(⚠️ 시범에서 받은 기사) · 한국경제 2025-10-16 `https://www.hankyung.com/article/202510163861i` · 한국경제 2026-09-20 `https://www.hankyung.com/article/202609195257i` · 한국경제 2026-05-29 `https://www.hankyung.com/article/202605296099i` · 매일신문 `https://www.imaeil.com/page/view/2026052719294363138` | 한경 10/5: 대림동 상점가 거리(시점 없음) · 한경 2025: "… 보건복지부 장관이 지난 14일 국회 … 국정감사에서 … 답변 /사진=뉴스1" · 한경 9/20: "사진=뉴스1"(시점·장소 없음) · 한경 5/29: 사진 설명 없음 · 매일: "자료사진 연합뉴스" | 한경 10/5: 시범과 같다(장소 사진 시점 없음, 4a) · 한경 2025: 다른 사안의 국감 장면(4a) · 한경 9/20: 촬영 시점 없음(4a 1·2번) · 한경 5/29: 사진 설명 없음 · 매일: 자료사진(4a)·523×334(8항) | **③** | B4 |
| #42 | `2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial` | 프리진뉴스 `https://www.freezinenews.com/news/articleView.html?idxno=30445` (og 300×180) · 펜앤마이크 `https://www.pennmike.com/news/articleView.html?idxno=129303` (og 300×293) · 뉴시스 2019 `https://www.newsis.com/view/NISX20190329_0000604058` (640×480) | 프리진: "… 집회 참가자들이 … 태극기를 흔들고 있다. ⓒ 독자 제공" · 펜앤: "10일 파주시 … 인민군 묘역 추모제. [온라인 커뮤니티 캡처]" · 뉴시스: og 사진 설명 없음(2019 기사) | 프리진: 300×180(8항)·권리자 "독자 제공"(tsv 조건 미충족) · 펜앤: 300×293(8항)·온라인 커뮤니티 캡처(4항) · 뉴시스: 2019년 다른 행사(4a). tsv `B 조건부` 조건(권리자 확인·옛 사진 아님) 미충족 → 지침상 이미지 없음 | **③** | B5 |

- B 6건 결과: **② 0건 · ③ 6건**. 쓰지 않은 출처 밖 참고 후보는 없다.
- "바꾼 파일:줄" B1~B6:
  - B1 `2026-10-08-focusone-ganghwa-drifting-mine`: ko image 블록 삭제 · `:33` · en 2줄 삭제 · `:9`
  - B2 `2026-10-08-monarch-us-congress-ccp-influence-korea`: ko image 블록 삭제 · `:35` · en 2줄 삭제 · `:9`
  - B3 `2026-10-09-gotdemcatch-lee-five-trials-suspended`: ko image 블록 삭제 · `:44` · en 2줄 삭제 · `:9`
  - B4 `2026-10-09-themovemag-chinese-residents-1m`: ko image 블록 삭제 · `:40` · en 2줄 삭제 · `:9`
  - B5 `2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial`: ko image 블록 삭제 · `:33` · en 2줄 삭제 · `:9`
  - B6 `2026-10-20-monarchreport25-lee-kim-held-back-2025`: ko image 블록 삭제 · `:31` · en 2줄 삭제 · `:10`

## 2. 이미지 없음 23건 일괄 ③

사진 판정 없이 대체 카드로 바꿨다(오더 2번).

| tsv | id | tsv 값 | 근거(지침 조항) | 바꾼 파일:줄 |
|---|---|---|---|---|
| #2 | `2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:31` · en 2줄 삭제 · `:9` |
| #4 | `2026-09-13-geonwoo-518-list-disclosure-citizen` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · en 2줄 삭제 · 문장 대상 없음 |
| #7 | `2026-09-22-emong-nk-contact-law` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · en 2줄 삭제 · 문장 대상 없음 |
| #13 | `2026-09-29-momamour-westsea-vs-dmz-comparison` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · en 2줄 삭제 · 문장 대상 없음 |
| — | `2026-09-30-2pro-unc-armistice-violation` | tsv 밖 | tsv 67행 밖(텍스트 게시물, 본문 "첨부 이미지 없음"). 사진 판정 없이 대체 카드(오더 2번) | ko image 블록 삭제 · en 2줄 삭제 · 문장 대상 없음 |
| #14 | `2026-09-30-monarch-former-ambassador-church-claims` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:34` · en 2줄 삭제 · `:9` |
| #19 | `2026-10-04-ycherish-oct3-rally-media` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:37` · en 2줄 삭제 · `:9` |
| #27 | `2026-10-07-rinha-chosun-column-chongryon-visit` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:31` · en 2줄 삭제 · `:10` |
| #30 | `2026-10-08-ansanheart-daejangdong-recording-2025` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:27` · en 2줄 삭제 · `:9` |
| #39 | `2026-10-10-news1min-nps-foreigner-late-payment` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:34` · en 2줄 삭제 · `:10` |
| #40 | `2026-10-10-ribonpig-gyeonggi-childcare-budget` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:32` · en 2줄 삭제 · `:9` |
| #41 | `2026-10-10-rocketissue-kei-poll-korea-defense` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:27` · en 2줄 삭제 · `:9` |
| #45 | `2026-10-12-conpoli88-parkjiwon-nk-remittance-nis` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:30` · en 2줄 삭제 · `:10` |
| #48 | `2026-10-12-minkyuhantv-german-spy-chief` | 정책 결정 필요 | 지침 단계 1 "정책 결정 필요" 해소표: 1a에서 제외(피의자) → 이미지 없음 | ko image 블록 삭제 · `:32` · en 2줄 삭제 · `:9` |
| #49 | `2026-10-13-brieftag-kadiz-data-withheld` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:29` · en 2줄 삭제 · `:9` |
| #51 | `2026-10-14-2pro-nk-slcm-not-announced` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:32` · en 2줄 삭제 · `:9` |
| #53 | `2026-10-14-knn-fake-mnd-chinese-recruit-poster` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:28` · en 2줄 삭제 · `:9` |
| #59 | `2026-10-28-donga-nk-submarine-infiltration-drills` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · en 2줄 삭제 · 문장 대상 없음 |
| #60 | `2026-10-29-khan-nk-srbm-launch-wonsan` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · en 2줄 삭제 · 문장 대상 없음 |
| #62 | `2026-11-01-eodguri-war-term-extension-claim` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:25` · en 2줄 삭제 · `:9` |
| #64 | `2026-11-03-wikipost-marine-officer-kimjongun-photo` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:23` · en 2줄 삭제 · `:9` |
| #65 | `2026-11-04-leejinsook-martial-law-soldiers-presser` | 없음 | 지침 단계 1 해석표 `없음` → 이미지 없음 | ko image 블록 삭제 · `:30` · en 2줄 삭제 · `:12` |
| #67 | `2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019` | 없음(권고) | 지침 단계 1 해석표 `없음(권고)` → 이미지 없음. #67 별도 점검 아래 | ko image 블록 삭제 · `:31` · en 2줄 삭제 · `:9` |

### #1·#67 점검 (지침 단계 1 "#1 게시물과 #67")
- **#1** `2026-08-06-owloffreedom-707-commander-sentencing`(id는 1~3차 실명 정리에서 이미 옮김)
  - 지금 `image:` 블록 0, `public/images/` 폴더 0이다. 이번 29건에 들어 있지 않다(이미 이미지 없음).
  - 본문의 대령(1심 무죄) 인물은 이니셜 "ㄱ씨"로 11곳 쓰여 있다.
  - tsv 메모의 실명은 ko·en 모두 0곳이다.
  - 출처 `name` 3건은 중립 요지다(직위만, 실명 없음).
  - `updatedAt: 2026-11-09`는 이전 정리 때 값이다. 이번에 #1 파일은 바꾸지 않았다. **충돌 없음.**
- **#67** `2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019`(tsv `없음(권고)`: 비공인 단체 구성원)
  - 이번 diff는 ko `image:` 블록 4줄 삭제, `:31` 문장 1곳("…원문 이미지 대신 자체 제작 카드를 썼습니다" → "…원문 이미지는 쓰지 않았습니다"), en 2줄 삭제와 문장 1곳뿐이다.
  - 실명이나 이니셜 처리된 부분은 건드리지 않았다. **충돌 없음.**
- **#48**은 tsv `정책 결정 필요`지만, 지침 단계 1 해소표가 "1a에서 제외(피의자) → 이미지 없음"으로 정했다(슈퍼바이저 24-1 확인). 사진을 판정하지 않았다.

### 본문 문장
- "…자체 제작 카드를 썼습니다"와 "we used a card made by this site" 계열 문장을 **23건** 고쳤다(B 6 + 없음 17, ko 23곳 · en 23곳).
  - 새 문장은 "…은/는 쓰지 않았습니다"와 "we did not use the original …"이다.
  - 문장이 "…요약에 옮기지 않았습니다. 자체 제작 카드를 썼습니다."처럼 따로 서 있던 1건(`2026-11-04-leejinsook-martial-law-soldiers-presser`)은 그 문장만 지웠다. en의 "We used a card made by this site."도 지웠다.
- 문장이 없는 6건은 그대로 두었다: `geonwoo-518-list-disclosure-citizen`, `emong-nk-contact-law`, `momamour-westsea-vs-dmz-comparison`(기존 "옮기지 않았습니다"는 카드 문장 아님), `2pro-unc-armistice-violation`, `donga-nk-submarine-infiltration-drills`, `khan-nk-srbm-launch-wonsan`.
- 사실 내용이 같아 `updatedAt`은 바꾸지 않았다(선례 묶음 1~4).
- 29건 ko·en에 "자체 제작"이나 "made by this site"가 남은 곳은 0이다(스크립트 assert).

## 3. 삭제한 파일 (`rm`·`rmdir`) — 29개 폴더
- `public/images/` 아래 남아 있던 폴더 29개 전부를 지웠다. 각 폴더의 파일은 `thumb.jpg` 1개였다.
- 폴더 이름은 위 1·2절의 id 29개와 같다. `git status` ` D public/images/…/thumb.jpg` 29줄로 확인했다.

## 4. 마무리 확인 (직접 셈)
- `content/posts`·`content/posts-en`에서 `/images/`를 가리키는 줄: **0**. 자체 카드 0.
- `public/images/` 안 파일: `.gitkeep` 1개뿐이다. 그 밖의 파일은 **0**, 폴더 0.
- 참조 없는 이미지 0, 깨진 참조 0. `content/README.md`의 예시 문구는 게시물이 아니라 제외했다.
- 보고할 예외 없음.

## 5. 검증
- `npm run validate:content` → 418/418 통과, "✅ 검증 통과".
  - 대표 이미지 종류: **self 0** · public 0 · news 33. 검사한 이미지 alt 33개.
  - 경고는 22개로, 작업 전과 같은 수다.
- 핫링크: 이번 ② 0건이라 해당 없음.
- 결과: **② 0 · ③ 29**. 67건 전체 결과:
  - 시범 ② 4·③ 1, 묶음 2 ② 3·③ 9, 묶음 3 ② 3·③ 8, 묶음 4 ② 0·③ 10, 묶음 5 ② 0·③ 29.
  - news 33은 67건 사업 이전의 news 이미지를 포함한 전체 수다.

## 6. `git status --short` 전체 (이 트리거 작성 직전)
```
 M content/posts-en/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md
 M content/posts-en/2026-09-13-geonwoo-518-list-disclosure-citizen.md
 M content/posts-en/2026-09-22-emong-nk-contact-law.md
 M content/posts-en/2026-09-29-momamour-westsea-vs-dmz-comparison.md
 M content/posts-en/2026-09-30-2pro-unc-armistice-violation.md
 M content/posts-en/2026-09-30-monarch-former-ambassador-church-claims.md
 M content/posts-en/2026-10-04-ycherish-oct3-rally-media.md
 M content/posts-en/2026-10-07-rinha-chosun-column-chongryon-visit.md
 M content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md
 M content/posts-en/2026-10-08-focusone-ganghwa-drifting-mine.md
 M content/posts-en/2026-10-08-monarch-us-congress-ccp-influence-korea.md
 M content/posts-en/2026-10-09-gotdemcatch-lee-five-trials-suspended.md
 M content/posts-en/2026-10-09-themovemag-chinese-residents-1m.md
 M content/posts-en/2026-10-10-news1min-nps-foreigner-late-payment.md
 M content/posts-en/2026-10-10-ribonpig-gyeonggi-childcare-budget.md
 M content/posts-en/2026-10-10-rocketissue-kei-poll-korea-defense.md
 M content/posts-en/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md
 M content/posts-en/2026-10-12-conpoli88-parkjiwon-nk-remittance-nis.md
 M content/posts-en/2026-10-12-minkyuhantv-german-spy-chief.md
 M content/posts-en/2026-10-13-brieftag-kadiz-data-withheld.md
 M content/posts-en/2026-10-14-2pro-nk-slcm-not-announced.md
 M content/posts-en/2026-10-14-knn-fake-mnd-chinese-recruit-poster.md
 M content/posts-en/2026-10-20-monarchreport25-lee-kim-held-back-2025.md
 M content/posts-en/2026-10-28-donga-nk-submarine-infiltration-drills.md
 M content/posts-en/2026-10-29-khan-nk-srbm-launch-wonsan.md
 M content/posts-en/2026-11-01-eodguri-war-term-extension-claim.md
 M content/posts-en/2026-11-03-wikipost-marine-officer-kimjongun-photo.md
 M content/posts-en/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M content/posts-en/2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019.md
 M content/posts/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md
 M content/posts/2026-09-13-geonwoo-518-list-disclosure-citizen.md
 M content/posts/2026-09-22-emong-nk-contact-law.md
 M content/posts/2026-09-29-momamour-westsea-vs-dmz-comparison.md
 M content/posts/2026-09-30-2pro-unc-armistice-violation.md
 M content/posts/2026-09-30-monarch-former-ambassador-church-claims.md
 M content/posts/2026-10-04-ycherish-oct3-rally-media.md
 M content/posts/2026-10-07-rinha-chosun-column-chongryon-visit.md
 M content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md
 M content/posts/2026-10-08-focusone-ganghwa-drifting-mine.md
 M content/posts/2026-10-08-monarch-us-congress-ccp-influence-korea.md
 M content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md
 M content/posts/2026-10-09-themovemag-chinese-residents-1m.md
 M content/posts/2026-10-10-news1min-nps-foreigner-late-payment.md
 M content/posts/2026-10-10-ribonpig-gyeonggi-childcare-budget.md
 M content/posts/2026-10-10-rocketissue-kei-poll-korea-defense.md
 M content/posts/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md
 M content/posts/2026-10-12-conpoli88-parkjiwon-nk-remittance-nis.md
 M content/posts/2026-10-12-minkyuhantv-german-spy-chief.md
 M content/posts/2026-10-13-brieftag-kadiz-data-withheld.md
 M content/posts/2026-10-14-2pro-nk-slcm-not-announced.md
 M content/posts/2026-10-14-knn-fake-mnd-chinese-recruit-poster.md
 M content/posts/2026-10-20-monarchreport25-lee-kim-held-back-2025.md
 M content/posts/2026-10-28-donga-nk-submarine-infiltration-drills.md
 M content/posts/2026-10-29-khan-nk-srbm-launch-wonsan.md
 M content/posts/2026-11-01-eodguri-war-term-extension-claim.md
 M content/posts/2026-11-03-wikipost-marine-officer-kimjongun-photo.md
 M content/posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M content/posts/2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019.md
 M history/2026-10-01.md
 M history/2026-11-05.md
 M history/2026-11-09.md
 M history/2026-11-10.md
 M history/2026-11-11.md
 D public/images/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract/thumb.jpg
 D public/images/2026-09-13-geonwoo-518-list-disclosure-citizen/thumb.jpg
 D public/images/2026-09-22-emong-nk-contact-law/thumb.jpg
 D public/images/2026-09-29-momamour-westsea-vs-dmz-comparison/thumb.jpg
 D public/images/2026-09-30-2pro-unc-armistice-violation/thumb.jpg
 D public/images/2026-09-30-monarch-former-ambassador-church-claims/thumb.jpg
 D public/images/2026-10-04-ycherish-oct3-rally-media/thumb.jpg
 D public/images/2026-10-07-rinha-chosun-column-chongryon-visit/thumb.jpg
 D public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg
 D public/images/2026-10-08-focusone-ganghwa-drifting-mine/thumb.jpg
 D public/images/2026-10-08-monarch-us-congress-ccp-influence-korea/thumb.jpg
 D public/images/2026-10-09-gotdemcatch-lee-five-trials-suspended/thumb.jpg
 D public/images/2026-10-09-themovemag-chinese-residents-1m/thumb.jpg
 D public/images/2026-10-10-news1min-nps-foreigner-late-payment/thumb.jpg
 D public/images/2026-10-10-ribonpig-gyeonggi-childcare-budget/thumb.jpg
 D public/images/2026-10-10-rocketissue-kei-poll-korea-defense/thumb.jpg
 D public/images/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial/thumb.jpg
 D public/images/2026-10-12-conpoli88-parkjiwon-nk-remittance-nis/thumb.jpg
 D public/images/2026-10-12-minkyuhantv-german-spy-chief/thumb.jpg
 D public/images/2026-10-13-brieftag-kadiz-data-withheld/thumb.jpg
 D public/images/2026-10-14-2pro-nk-slcm-not-announced/thumb.jpg
 D public/images/2026-10-14-knn-fake-mnd-chinese-recruit-poster/thumb.jpg
 D public/images/2026-10-20-monarchreport25-lee-kim-held-back-2025/thumb.jpg
 D public/images/2026-10-28-donga-nk-submarine-infiltration-drills/thumb.jpg
 D public/images/2026-10-29-khan-nk-srbm-launch-wonsan/thumb.jpg
 D public/images/2026-11-01-eodguri-war-term-extension-claim/thumb.jpg
 D public/images/2026-11-03-wikipost-marine-officer-kimjongun-photo/thumb.jpg
 D public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg
 D public/images/2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019/thumb.jpg
?? docs/handoffs/tester-01-deployed-image-loading.md
?? docs/qa/tester-01/
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
?? docs/triggers/tester-01-deployed-image-loading-COMPLETE.md
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
?? instructions/tester/processed/01-deployed-image-loading.md
?? instructions/uploader/25-self-card-67-batch-5-final.md
```

- 이 트리거 파일과 오더 이동(`instructions/uploader/25-…` → `processed/`)은 위 목록 뒤에 생긴다.
