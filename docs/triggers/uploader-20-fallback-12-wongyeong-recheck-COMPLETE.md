# uploader-20 — 대체 카드 12건 원경 5% 기준 재검토 — COMPLETE

- 담당: 반공-업로더 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/20-fallback-12-wongyeong-recheck.md`(이동)
- 입력: 기획자 17 트리거 "기존 대체 카드 재검토 범위 제안" 12건 표 + 리뷰어 53 §7(빠진 4건·후보 보완), 각 건의 업로더 03~16 트리거 ③ 행.
- 선행 문서: CLAUDE.md, guide §4·§4-1, 정책 §3.1·§3.1-1·§3.3·§3.4·§3.5·§3.6, 업로더 지침 단계 1~4·2-1.
- 빌드 0, git add·commit·push 0, `src/`·설정 수정 0. 사진은 저장소에 저장하지 않았다(핫링크). 판정용 사본은 저장소 밖 임시 폴더에만 받았고 끝난 뒤 지웠다.

## 측정 방법 (단계 2-1)
- 각 기사를 다시 받아 og:image·`article:published_time`·사진 설명(figcaption 또는 이미지 alt)을 원문 HTML에서 읽었다. og:image는 받은 그대로의 해상도로 `sips`로 짧은 변을 쟀다.
- 얼굴 찾기: macOS Vision 얼굴 검출로 위치·박스를 먼저 찾고(박스는 눈썹 위~턱이라 실제 이마~턱보다 작다 → **하한값**으로만 씀), 판정에 쓰는 얼굴은 원본 픽셀 좌표 눈금을 붙인 잘라낸 그림으로 **이마(헤어라인)~턱**을 직접 읽었다. 확대한 것은 보기용이고 값은 원본 좌표다.
- 검출이 0인 사진(위에서 찍은 전경 등)은 영역을 나눠 눈으로 훑고 정면에 가까운 얼굴을 골라 쟀다.

## 12건 결과

| 묶음-#(오더) | id | 후보 사진(기사·크기) | 원경 측정(가장 큰 (다) 정면 얼굴 / 짧은 변) | 다른 사유 | 결과 | 바꾼 파일:줄 |
|---|---|---|---|---|---|---|
| 6-#10 (u08) | `2026-07-20-yoonsanghyun-special-counsel-filibuster` | ① 이투데이 7/20 1199×724 · ② **파이낸셜뉴스 7/20 1200×697** | ① 의장석 뒤 3명(사진 설명·본문에 신원 없음 → (다)): 오른쪽 인물 이마~턱 약 63px/724 = **8.7%**(Vision 하한 48·49·43px도 모두 5.9% 이상) → 불가 · ② 본회의장 전경, 사진 설명 "윤상현 국민의힘 의원이 … 필리버스터에 돌입하자 더불어민주당 의원들이 퇴장"(주인공 1명 지목 + 나머지는 총칭 → (다)). 정면에 가까운 얼굴 최대: 가운데 안경 쓴 인물 약 18px(x≈470·y≈457~474), 가운데 위 안경 인물 약 20px(y≈392~412), 왼쪽 가장자리 옆얼굴 약 21px → **약 21px/697 = 3.0%**(4.5% 미만, 1회 측정). 앞줄 가까운 사람은 모두 뒷모습. ②초점: 특정인을 보여 주는 사진이 아닌 전경 ③사진 설명 개별 지목 없음 | ② 사진: 워터마크 없음(눈으로 확인), 사용 제한 표기 없음(일반 고지 "무단전재-재배포 금지"만), 4a 같은 날·같은 본회의, 짧은 변 697px, 자막·로고·그래픽 없음, 다른 게시물 사용 0건 | **② (뉴스 사진)** | ko `content/posts/2026-07-20-yoonsanghyun-special-counsel-filibuster.md:13~23` `image` 블록 신설 · en `content/posts-en/…:5·6` `imageAlt`·`imageCaption` 신설 |
| 9-#7 (u11) | `2026-09-21-kimmoonsoo-prosecution-abolition` | 파이낸셜뉴스 9/21 1200×675 · 세계일보 9/21 1200×720 | 주인공(전 고용노동부 장관 — 업로더 19에서 공인 확인)은 풀렸으나, 파이낸셜: 손팻말 든 참석자(사진 설명 "변호사 모임" 총칭, 개인 신원 없음) 정면 이마~턱 46px/675 = **6.8%** → 불가 · 세계일보: 참석자 Vision 하한만 59~143px/720 = 8.2~19.9% → 불가 | — | ③ 유지 | 없음 |
| 11-#9 (u13) | `2026-09-28-geonwoo-farmland-bank-expansion` | 이투데이 9/22 1199×689 (+이데일리 9/1, 시사미래 9/22) | 사진 설명은 장관 1명만 지목. 나머지 6명은 명패 이름 글자는 보이나 직위 글자는 원본 해상도에서 판독 불가, 사진 설명·본문에 배석자 확인 없음 → (나) 불성립 → (다). 오른쪽 끝 인물 이마~턱 56px/689 = **8.1%**, 화면 앞줄 중심 → 불가 | 이데일리: 사진 설명 촬영 일시 없음(4a, 재확인 유지) · 시사미래: 사진 설명 없음(캡션 없는 인물 사진, 재확인 유지) | ③ 유지 | 없음 |
| 13-#5 (u15, 단계 0) | `2026-09-10-freedominnovation-nec-bill` | 데일리안 10/29 1200×829 | 특별검사(공인)는 풀렸으나 둘레 신원 미확인 인물 Vision 하한 169·141·92px/829 = 11~20% → 불가(9항) | 다른 후보 7건의 기록 사유(워터마크·4a 자료사진·날짜 없음)는 이번 개정과 무관 — 그대로 | ③ 유지 | 없음 |
| 14-#10 (u16) | `2026-07-24-firstincome-seoul-edu-unification-textbook` | 서울신문 7/24 1200×638 (+서울Pn 2022) | 취재진(사진 설명에 없음 → (다)) Vision 하한 58px/638 = **9.1%** → 불가 | 서울Pn og:image가 매체 공유 로고(`go_share.png`) → 4항 그대로 | ③ 유지 | 없음 |
| 2-#8 (u04) | `2026-09-26-neveragain-mexico-tariff-visit` | 파이낸셜뉴스 9/24 1200×800 (+서울신문 9/24) | 사진 설명은 대통령·여사만 지목. 대통령 오른쪽에서 함께 걷는 인물(신원 미확인, 화면 중심) 약 60px/800, 의장대 장병 Vision 하한 51~59px = 6.4~7.4% → 불가 | 서울신문: 사진 설명 "[공동취재 제공. 재판매 및 DB 금지]" → 7항 그대로 | ③ 유지 | 없음 |
| 3-#9 (u05) | `2026-10-03-oct3-gwanghwamun-rally-scale` | 한국일보 10/3 1440×773 (+문화·세계 10/3, 주간경향 10/3) | 한국일보: 사진 설명 "숭례문 앞 … 국민행동대회에서 참석자들이 구호"(같은 집회 확인 — 4a는 충족). 앞줄 참석자(손팻말에 "당원협의회") 정면 얼굴 약 70px/773 ≈ 9% · 군중이 주 피사체(②위반) → 불가. 단정형 손팻말("…OUT") 가득 — 결합 위험 | 문화·세계: 사진 설명 "보신각 인근 … 가자지구 … 규탄 집중집회" → 다른 집회(4a), 세계는 짧은 변 375px(8항) · 주간경향: 당원(비공인) 정면 Vision 하한 45px/585 = 7.7% | ③ 유지 | 없음 |
| 11-#8 (u13, 단계 0) | `2026-09-28-firstincome-kctu-spy-case-summary` | 세계일보 2024-11-24 680×459 · 조선일보 2025-09-25 1200×630 (+뉴스1·경향·오마이뉴스) | 세계일보: 발표자는 사진 설명이 직위·이름으로 지목(검사 — 공인), 뒤 인물(신원 미확인) Vision 하한 59px/459 = **12.9%** → 불가 · 조선일보: 사진 설명 "국가정보원과 경찰청이 … 2023년 1월 18일 … 압수수색 영장을 집행"(기관 총칭) — 요원들이 화면 중심(②위반), 모자 챙~턱(이마 가림) 32px/630 = 5.1% 이상 → 불가 | 뉴스1: 359×246(8항)·2019년 파일 · 경향: 사진 설명 시점 없음(4a) · 오마이뉴스: 다른 재판 사진(4a) — 모두 그대로 | ③ 유지 | 없음 |
| 1-#5 (u03) | `2026-09-16-hagonolza-country-insult-bill` | 세계일보 2025-11-07 1200×720 (+YTN 2025-11-06) | 세계일보: 사진 설명 "지난 달 3일 … 동대문역 인근 … 정부 규탄 집회" → 게시물(법안 발의)과 다른 일정(**4a**) + 참가자 정면 Vision 하한 103px/720 = 14.3% | YTN: 원문 HTML에 사진 설명 없음(캡션 없는 인물 사진) 그대로 | ③ 유지 | 없음 |
| 3-#7 (u05) | `2026-09-17-rekor-light-committee-disclosure` | 뉴시스 3/10 720×480 (+뉴데일리 9/17·뉴시스 7/17·세계일보·아시아경제) | 뉴시스 3/10: og:image 경로가 2025-03-18 파일 → 위원회 사안과 다른 시점(**4a**) + 참가자 정면 Vision 하한 78px/480 = 16% | 뉴데일리·뉴시스 7/17: 대통령 사진 + 비난형 제목(결합 위험)·다른 일정 그대로 · 세계일보 150×200(8항) · 아시아경제 몽골 순방(다른 사건) | ③ 유지 | 없음 |
| 5-#10 (u07) | `2026-09-29-leejinsook-assassins-film-distortion` | 한국일보 9/29 1440×960 (+헤럴드 9/28·매일 9/28) | 관람객은 없음/뒷모습이나, 사진 설명 "영화관에 걸린 … 포스터" — 포스터 속 배우(비공인) 얼굴 Vision 하한 193~219px/960 = 20~23% → 불가(비공인 얼굴은 원경 대상이 아니고 크기도 초과) | 헤럴드: 포스터(4항) · 매일: og:image가 시사회 사진(감독·배우 비공인, 9/8 다른 일정) | ③ 유지 | 없음 |
| 13-#8 (u15) | `2026-09-20-hanmibro-academy-merger-cards` | 한국일보 7/8 1440×960 (+서울신문 7/8·뉴스1·세계·한경TV·뉴스핌) | 한국일보: 군중이 화면 전체(②위반), 앞줄 왼쪽 아래 인물 이마~턱 50px/960 = **5.2%** → 5% 이상 불가 | 서울신문: 아래 가운데 "서울신문" 워터마크(눈으로 확인)·연단 발언자 신원 없음 · 뉴스1 날짜 없음(4a) · 세계 다른 일정(4a) · 한경TV 워터마크·날짜 없음 · 뉴스핌 400×204(8항) — 모두 그대로 | ③ 유지 | 없음 |

## 집계
- **② 1건**(6-#10) · **③ 유지 11건**. 12/12 전수 판정. 기획자 17이 매긴 가능성(중 4·중~높음 1·낮음~중 1·낮음 6)과 비교하면 "중"이던 9-#7·13-#5와 "중~높음"이던 11-#9도 ③이다. 세 건 모두 주인공 쪽 사유는 풀렸지만, 둘레 인물 얼굴이 6.8~20%로 커서 원경 기준을 넘는다.
- 재측정 구간(4.5% 이상 5% 미만)에 든 값은 없다. 13-#8의 5.2%와 11-#8 조선일보의 5.1%(이마 가림, 실제는 더 큼)는 5% 이상이라 재측정 없이 불가다.

## ② 건 세부 (6-#10)
- `image`: `kind: news` · `src` 파이낸셜뉴스 og:image(https, 핫링크 HTTP 200 `image/jpeg` 확인) · `creditName: 뉴스1`/`creditNameEn: News1`(사진 설명의 크레딧, 사진 기자 이름은 넣지 않음) · `sourcePageUrl`은 `sources[]`의 파이낸셜뉴스 url과 같은 글자 · `retrievedAt: 2026-11-10` · `license` 없음.
- `faceNote`: "현직 국회의원 — 본회의 무제한토론 발언·의원 퇴장(총칭) — 원 기사 사진 설명; 원경 인물 50명 이상(얼굴 최대 약 21 px / 짧은 변 697 px)". 화면의 사람을 한 명씩 세지는 않았다. 수가 많아 "50명 이상"으로 적었고, 이 수는 눈으로 봐도 분명하다.
- `caption`: 사진 설명 기준 "2026년 7월 20일 국회 본회의장, 국민의힘 윤상현 의원이 무제한토론(필리버스터)을 시작하자 더불어민주당 의원들이 퇴장하는 모습(원 기사 사진 설명 기준)." — 의혹 사안이 아니라 2행 고정 문구는 넣지 않았다(선례와 같음).
- 영어본 `imageAlt`·`imageCaption` 신설(이전에 이미지 없던 건이라 옛 "made by this site" 문구 없음).
- 옛 자체 카드 파일: 묶음 6에서 이미 삭제돼 없음(`public/images/`에 해당 폴더 0). 본문에 "자체 제작 카드" 문장 없음 → 본문 수정 없음. 이미지 추가만이라 `updatedAt` 변경 없음(단계 3 규칙).

## 검증
- `npm run validate:content` → R=0, "✅ 검증 통과". 경고 22개(작업 전과 같은 수, 해당 id 경고 0).
- 핫링크: ② 1건 `https://image.fnnews.com/…/202607201856300790_e.jpg` → 200 `image/jpeg`.
- 이 트리거·오더에 비공인 실명·사진 기자 이름·옛 id·다른 서비스명·홈 경로 없음(grep 확인).

## `git status --short` 전체
```
 M content/posts-en/2026-07-20-yoonsanghyun-special-counsel-filibuster.md
 M content/posts/2026-07-20-yoonsanghyun-special-counsel-filibuster.md
 M history/2026-10-01.md
 M history/2026-11-05.md
 M history/2026-11-09.md
 M history/2026-11-10.md
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
?? instructions/uploader/20-fallback-12-wongyeong-recheck.md
```
- 위 목록은 트리거 작성 시점의 것이다. 그 뒤 오더를 `processed/`로 옮겨 `instructions/uploader/20-fallback-12-wongyeong-recheck.md` 줄이 `instructions/uploader/processed/20-fallback-12-wongyeong-recheck.md`로 바뀌었다(그 밖의 변경 없음).
