# 완료 트리거 — 업로더 01: 포털 출처 원 매체 교체 + #1 게시물 이니셜화

**작성**: 2026-11-09 | **작성 세션**: 반공-업로더 (Opus 5.5) | **오더**: `instructions/uploader/processed/01-portal-source-replace-and-post1-initials.md`
**상태**: 작업 완료 · 🔴 **커밋하지 않음**(git add·commit·push 안 함 — 리뷰어 게이트 후 슈퍼바이저 커밋). 빌드하지 않음(validate만).

## 1. 결과 요약
| 항목 | 결과 |
|---|---|
| 포털 주소 | 46개 파일 59건 → **59건 모두 원 매체 주소로 교체**. 못 바꾼 건 **0** |
| 남은 포털 주소 | `grep -rnE 'v\.daum\.net|news\.nate\.com' content/` → **0** |
| 허용 출처 0이 될 8개 파일 | **8개 모두 원 매체 기사 확보** → 허용 출처 0이 되는 파일 없음, 보고 대상 없음 |
| 67건 대상 18개 파일 | 18개 모두 포함·처리 |
| `http://` | 교체 후 `url`에 http:// **0건**(원 매체가 https 지원 — 오마이뉴스 2006·2018, 파이낸셜뉴스, 아이뉴스24 포함) |
| #1 게시물 | 이니셜화 완료(§4 아래) |
| validate | **R=0**, "✅ 검증 통과". 🟡 경고 22건 중 이번 변경 47개 id 해당은 **1건**(아래 §5 — 기존 경고, 이번 변경과 무관) |
| `updatedAt` | #1만 2026-11-09로 변경. 나머지 45개는 포털 교체만이라 **바꾸지 않음**(§4.4) |

## 2. 확인 방법
- 포털 페이지를 받아 원 매체명·제목·게재 시각을 읽었다(네이트는 `class="author"` 블록, 다음은 `og:site_name`).
- 원 매체 주소는 구글 뉴스 RSS(+주소 해석)·네이버 뉴스 검색·매체 사이트 검색으로 찾았다. MBN 1건은 기사 번호를 이분 탐색해 찾았다.
- **모든 새 주소를 `curl -A "Mozilla/5.0"`로 직접 열어 HTTP 200**, `og:title`이 포털 제목과 같은지, `article:published_time`(KST 환산)이 `date`와 같은지 확인했다.
- 원 기사 HTML은 저장소 밖 임시 폴더에만 두었다.

## 3. 8개 파일 결과 (허용 출처 0 위험 파일)
| 파일 | 결과 |
|---|---|
| 2026-09-18-newssnap-chung-no-kaesong-lawsuit | 3건 모두 확보(연합뉴스TV `yonhapnewstv.co.kr` · YTN · 뉴스1) |
| 2026-09-24-hagonolza-kimgyeri-spy-remark | 확보(아이뉴스24 https). `name`의 제목 문구가 실제 기사 제목과 달라 실제 제목으로 고침. 본문 3문장은 기사 본문에서 모두 확인(6/12 형사합의36부 징역 30년, 13일 페이스북 "제가 울었던 것은…", 대공수사권·방첩사 개편·드론사 폐지 비판). ⚠️ 본문 "국정원 대공수사권 **이관**"은 기사 표현이 "대공수사권 **조정**" — 문구 수정은 본문 편집(updatedAt)이라 하지 않았다. 슈퍼바이저 판단 |
| 2026-10-07-yeong573-parkchoongkwon-filibuster-2025 | 2건 확보(YTN · 파이낸셜뉴스 https). 2025-09-28 원문 남아 있음 |
| 2026-10-12-conpoli88-parkjiwon-nk-remittance-nis | 2건 확보(오마이뉴스 2006-09-28 `CNTN_CD=A0000363204` https · 중앙일보 2020-07-07 `article/23818787`) |
| 2026-10-14-2pro-nk-slcm-not-announced | 3건 확보(뉴스1 · 머니투데이 · 뉴시스) |
| 2026-10-14-gotdemcatch-safety-drill-poster-insignia | 확보(KBS `ncd=8686068`) |
| 2026-10-18-wikipost-equal-pay-equal-work-roadmap | 2건 확보(한겨레 · KBS) |
| 2026-10-23-eodguri-kimyonghyun-drone-appeal | 2건 확보(연합뉴스 · 국민일보). 국민일보 페이지 게재일이 **2026-10-17 00:01**(지면 기사)이라 `date` 10-16 → **10-17** |

## 4. #1 게시물 변경 요약 (`2026-08-06-owloffreedom-kimhyuntae-sentencing`, 🔴 id·파일명 그대로)
- **제목·description**: 중심 인물 → "전 707특임단장 ㄱ씨".
- **본문**: 중심 인물 9곳 → "전 707특임단장 ㄱ씨"/"ㄱ씨"(직함이 같은 문장에 있을 때만 "ㄱ씨"). 전 정보사 계획처장(대령·1심 무죄) → "전 정보사 계획처장 ㄱ씨". 준장 2인·전 국방부 조사본부장(소장)은 실명 유지(§4.2).
- **출처 `name` 3건 → 중립 요지**(원 기사 3건을 열어 확인):
  - 주간경향 — 707특임단장 징역 18년 구형(내란 결심공판)
  - 머니투데이 — 707특임단장 1심 징역 12년 선고
  - **중앙일보** — 군 간부 7명 내란 중요임무종사 1심 선고, 계엄 인식이 유무죄 갈랐다는 분석
  - ⚠️ 세 번째 출처는 기존 `name`이 "네이트(경향신문)"였지만 **실제 원 매체는 중앙일보**(네이트 기사 상단 매체 표기·기사 말미 기자 이메일 도메인 joongang.co.kr, 중앙일보 `article/25456782` 제목·게재 시각 일치). 그래서 계획 문서 안의 "경향신문 —" 대신 "중앙일보 —"로 썼다. 기사에서 "군 간부 7인 선고", 전 국방부 조사본부장(소장)·전 정보사 계획처장(대령) 무죄를 직접 확인.
- **태그** 중심 인물 실명 태그 삭제(비상계엄·내란재판 유지).
- **`image` 블록 삭제 + `public/images/{id}/thumb.jpg` 삭제**(폴더도 비어 삭제).
- **"자체 제작 카드" 문장**: 첫 문단의 "…요약이어서 원문 이미지 대신 자체 제작 카드를 썼습니다"에서 카드 부분만 지우고 "…요약입니다."로 남김(첫 장 문구가 보도로 확인되지 않는다는 사실 기록은 유지).
- **갱신 이력**: `updatedAt` 2026-10-11 → 2026-11-09, 본문 끝에 "> 🔁 **갱신 (2026-11-09)**: …실명 → 이니셜, 출처 이름 요지화, 카드 이미지 내림" 한 줄.
- **영어본**: 같은 방식으로 수정. `imageAlt`·`imageCaption` 삭제, `translatedAt` 2026-11-09, 한글 실명 괄호 2곳 삭제, description 157자, 끝에 "🔁 Update (2026-11-09)" 한 줄. 성별 대명사·Mr/Ms grep 0.
  - ⚠️ **계획 안("Mr. K")과 다르게 "K"로 썼다.** 이유: 영어본 성별 표현 금지 규칙(Mr/Ms 포함)과 충돌하고, 기존 영어본 이니셜 관례도 "A"처럼 호칭 없이 쓴다(`2026-09-17-idontknowpolitics-sergeant-leak-china`). 두 사람 구분은 항상 직함을 앞에 붙여서 한다("the former 707th commander K", "former Defense Intelligence Command planning chief K"). "Mr. K"가 필요하면 슈퍼바이저가 지시.
- 남는 실명: id·파일명(로마자)만. 주소 변경은 리다이렉트 코드 배포 뒤 별도 오더.

## 5. 그 밖에 발견한 것 (슈퍼바이저 판단)
1. **출처 이름과 실제 주소가 다른 매체를 가리키던 건**(원 매체 기준으로 바로잡음)
   - `2026-09-28-2pro-jcs-interim-claim`·`2026-09-28-pagememo-jcs-interim-result`: `name`은 "동아일보 — [속보]…"인데 포털 주소는 **한겨레** 다른 기사였다. `name`(과 pagememo 본문 "동아일보를 원 보도로")에 맞춰 **동아일보 원 기사** `donga.com/…/20260928/134747559/1`("[속보]합참 "DMZ 폭발, 북한군 지뢰 가능성 매우 높아"")로 교체.
   - `2026-10-07-geonwoovibes-defector-repatriation-claim`: "네이트(연합뉴스)"였지만 실제 매체는 **뉴시스** → 뉴시스로.
   - `2026-09-10-freedominnovation-nec-bill` 데일리안: `name` 제목 문구가 실제 기사 제목과 달라 실제 제목으로.
2. 🟡 `2026-09-29-shindawit-cxmt-samsung-threat` — "description 170자" 경고. **이번 변경 전부터 있던 경고**(이번에는 출처 1줄만 바꿈). description 수정은 문구 편집이라 하지 않았다.
3. `date`: 국민일보 1건만 변경(10-16→10-17). 조선일보 2건(2023-08-26, 2026-10-05)은 `og`의 `published_time`이 전날로 나오지만 조선일보 `display_date`(KST)가 기존 값과 같아 **유지**.
4. 영어본 출처: 영어본은 `sources`를 갖지 않고 한국어 원본에서 가져온다(`src/lib/content/translation.ts` 4~5행 주석, `content/posts-en/`에 `sources:` 0개). 빌드 금지라 화면 렌더링은 확인하지 않았다 — **배포 후 /en/post에서 확인 필요**.

## 6. 파일별 교체 전 → 후 (59건, 67건 대상 먼저 · "8" = 허용 출처 0 위험 파일)
| 파일 | 대상 | 전 | 후 | name·date 변경 |
|---|---|---|---|---|
| `2026-08-06-owloffreedom-kimhyuntae-sentencing` | 67 | https://m.news.nate.com/view/20260827n26801 | https://www.joongang.co.kr/article/25456782 | name: 네이트(경향신문) → 중앙일보, 제목은 중립 요지로(§4) |
| `2026-09-10-geonwoo-jeongyulseong-song-contest` | 67 | https://v.daum.net/v/20230826030226919 | https://www.chosun.com/politics/assembly/2023/08/26/MI54FIKA75FG3FTUGP7H6ANSFQ/ | name: 다음 → 조선일보 |
| `2026-09-10-geonwoo-jeongyulseong-song-contest` | 67 | http://v.daum.net/v/20180202153304020 | https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0002399256 | — |
| `2026-09-15-bbang630-518-armored-vehicle-claim` | 67 | https://m.news.nate.com/view/20260212n30680 | https://www.hani.co.kr/arti/area/honam/1244750.html | name: 네이트 뉴스 → 한겨레 |
| `2026-09-18-newssnap-chung-no-kaesong-lawsuit` | 67 · 8 | https://v.daum.net/v/20260918054551606 | https://www.yonhapnewstv.co.kr/news/MYH202609180544049R6 | — |
| `2026-09-18-newssnap-chung-no-kaesong-lawsuit` | 67 · 8 | https://v.daum.net/v/20260916104207103 | https://www.ytn.co.kr/_ln/0103_202609161039512408 | — |
| `2026-09-18-newssnap-chung-no-kaesong-lawsuit` | 67 · 8 | https://v.daum.net/v/20260916103552751 | https://www.news1.kr/society/court-prosecution/6292203 | — |
| `2026-09-29-momamour-westsea-vs-dmz-comparison` | 67 | https://v.daum.net/v/20251227112350572 | https://www.donga.com/news/Society/article/all/20251227/133046419/1 | name: 다음 → 동아일보 (제목 문구도 원 기사 제목으로) |
| `2026-09-30-monarch-morsetan-church-claims` | 67 | https://v.daum.net/v/yWzv84tsyD | https://www.dt.co.kr/article/12013822 | name: 다음뉴스 → 디지털타임스 |
| `2026-09-30-monarch-morsetan-church-claims` | 67 | https://news.nate.com/view/20260422n31424 | https://www.segye.com/newsView/20260422515649 | name: 네이트 → 세계일보 (제목 문구도 원 기사 제목으로) |
| `2026-10-01-ntdkorea-jeju-falungong-rally-chinese` | 67 | https://m.news.nate.com/view/20260604n33394 | https://jeju.nocutnews.co.kr/news/6528222 | — |
| `2026-10-05-jeichi-front-corps-unloaded-guard` | 67 | https://v.daum.net/v/20261005050215231 | https://www.chosun.com/politics/diplomacy-defense/2026/10/05/J6FKIDWSDRHNPKF3LUH5N45HHQ/ | — |
| `2026-10-05-wendmag-cio-investigation-scope` | 67 | https://v.daum.net/v/20261005014258535 | https://www.donga.com/news/Politics/article/all/20261004/134784602/2 | — |
| `2026-10-07-geonwoovibes-defector-repatriation-claim` | 67 | https://m.news.nate.com/view/20261007n25807 | https://www.newsis.com/view/NISX20261007_0003817534 | name: 네이트(연합뉴스) → 뉴시스 |
| `2026-10-07-yeong573-parkchoongkwon-filibuster-2025` | 67 · 8 | https://v.daum.net/v/20250928212834954 | https://www.ytn.co.kr/_ln/0101_202509282151027434 | — |
| `2026-10-07-yeong573-parkchoongkwon-filibuster-2025` | 67 · 8 | https://v.daum.net/v/20250928202225003 | https://www.fnnews.com/news/202509281610229382 | — |
| `2026-10-09-themovemag-chinese-residents-1m` | 67 | https://m.news.nate.com/view/20260920n01425 | https://www.hankyung.com/article/202609195257i | name: 네이트(한국경제) → 한국경제 |
| `2026-10-10-news1min-nps-foreigner-late-payment` | 67 | https://m.news.nate.com/view/20260902n26058 | https://www.sedaily.com/article/20086361 | name: 네이트(서울경제) → 서울경제 |
| `2026-10-12-conpoli88-parkjiwon-nk-remittance-nis` | 67 · 8 | http://v.daum.net/v/20060928151810637 | https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0000363204 | — |
| `2026-10-12-conpoli88-parkjiwon-nk-remittance-nis` | 67 · 8 | https://v.daum.net/v/20200707050100278 | https://www.joongang.co.kr/article/23818787 | — |
| `2026-10-14-2pro-nk-slcm-not-announced` | 67 · 8 | https://v.daum.net/v/20261015065158539 | https://www.news1.kr/nk/military/6320482 | — |
| `2026-10-14-2pro-nk-slcm-not-announced` | 67 · 8 | https://v.daum.net/v/20261015070011774 | https://www.mt.co.kr/politics/2026/10/15/2026101506483061036 | — |
| `2026-10-14-2pro-nk-slcm-not-announced` | 67 · 8 | https://v.daum.net/v/20261015063658237 | https://www.newsis.com/view/NISX20261015_0003826470 | — |
| `2026-10-14-gotdemcatch-safety-drill-poster-insignia` | 67 · 8 | https://v.daum.net/v/20261014213013603 | https://news.kbs.co.kr/news/pc/view/view.do?ncd=8686068 | — |
| `2026-10-18-wikipost-equal-pay-equal-work-roadmap` | 67 · 8 | https://v.daum.net/v/20261018174127644 | https://www.hani.co.kr/arti/society/labor/1282923.html | — |
| `2026-10-18-wikipost-equal-pay-equal-work-roadmap` | 67 · 8 | https://v.daum.net/v/20261018170039484 | https://news.kbs.co.kr/news/pc/view/view.do?ncd=8688426 | — |
| `2026-10-23-eodguri-kimyonghyun-drone-appeal` | 67 · 8 | https://v.daum.net/v/20261016185920138 | https://www.yna.co.kr/view/AKR20261016079552004 | — |
| `2026-10-23-eodguri-kimyonghyun-drone-appeal` | 67 · 8 | https://v.daum.net/v/20261016190241202 | https://www.kmib.co.kr/article/20261016500608 | date 2026-10-16→2026-10-17 |
| `2026-07-25-idontknowpolitics-cheongju-spy-directives` | — | https://v.daum.net/v/20250911113347098 | https://www.mt.co.kr/society/2025/09/11/2025091111092297055 | name: 다음(뉴스) → 머니투데이 |
| `2026-08-12-citynewsmeme-parksangyong-oath-refusal` | — | https://m.news.nate.com/view/20260529n28443 | https://news.jtbc.co.kr/article/NB12300551 | name: 네이트 뉴스 → JTBC |
| `2026-08-24-dictatorshipnono-jeju-missing-false-closure` | — | https://m.news.nate.com/view/20260831n19845 | https://news.tf.co.kr/read/national/2359887.htm | — |
| `2026-09-10-currentwaves-pm-amendment-slip` | — | https://m.news.nate.com/view/20260909n32663 | https://www.donga.com/news/Politics/article/all/20260909/134637243/2 | — |
| `2026-09-10-freedominnovation-nec-bill` | — | https://v.daum.net/v/20261015121814439 | https://www.newsis.com/view/NISX20261015_0003827250 | — |
| `2026-09-10-freedominnovation-nec-bill` | — | https://v.daum.net/v/20261029021113097 | https://www.dailian.co.kr/news/view/1707697 | name: 데일리안 → 데일리안 (제목 문구도 원 기사 제목으로) |
| `2026-09-11-currentwaves-nk-hr-report-classified` | — | https://m.news.nate.com/view/20260908n29513 | https://www.donga.com/news/Politics/article/all/20260908/134628104/1 | — |
| `2026-09-12-nowmagazine-postpartum-vs-nk-infant` | — | https://m.news.nate.com/view/20260911n19090 | https://www.yna.co.kr/view/AKR20260911094400061 | — |
| `2026-09-14-kimminsoo-spy-law-enforcement` | — | https://m.news.nate.com/view/20260226n35666 | https://www.newsis.com/view/NISX20260226_0003528202 | name: 네이트 뉴스 → 뉴시스 |
| `2026-09-15-joojinwoo-kimseungwon-hearing` | — | https://m.news.nate.com/view/20260915n33937 | https://news.jtbc.co.kr/article/NB12318497 | — |
| `2026-09-15-joojinwoo-kimseungwon-hearing` | — | https://m.news.nate.com/view/20260919n05628 | https://www.mt.co.kr/politics/2026/09/19/2026091911152217503 | — |
| `2026-09-17-hagonolza-changwon-spy-indictment` | — | https://m.news.nate.com/view/20260908n31253 | https://www.hankyung.com/article/2026090819457 | — |
| `2026-09-18-dailybite-judicial-independence` | — | https://m.news.nate.com/view/20260918n17068 | https://www.ajunews.com/view/20260918123717584 | name: 李대통령, 대법관 재제청 갈등에 "기관 독립성 부여 이유 생각해야 → 아주경제 |
| `2026-09-20-nowmagazine-alpha-phone` | — | https://m.news.nate.com/view/20260918n21668 | https://news.jtbc.co.kr/article/NB12319040 | — |
| `2026-09-20-shindawit-foreign-unemployment-benefits` | — | https://v.daum.net/v/1NKfoPoMXs | https://www.news1.kr/economy/employment-labor/6205612 | — |
| `2026-09-22-taekyu-chief-justice-refusal` | — | https://m.news.nate.com/view/20260918n17068 | https://www.ajunews.com/view/20260918123717584 | name: 李대통령, 대법관 재제청 갈등에 "기관 독립성 부여 이유 생각해야 → 아주경제 |
| `2026-09-24-hagonolza-kimgyeri-spy-remark` | — · 8 | https://v.daum.net/v/20260614172500895 | https://www.inews24.com/view/1976340 | name: 아이뉴스24 → 아이뉴스24 (제목 문구도 원 기사 제목으로) |
| `2026-09-25-kimkyelee-nk-pow-ukraine` | — | https://v.daum.net/v/20260925105654856 | https://www.yna.co.kr/view/AKR20260925021100504 | name: 다음(연합뉴스) → 연합뉴스 |
| `2026-09-27-ccpoutkorea-china-threat-survey` | — | https://v.daum.net/v/20260810050301630 | https://www.joongang.co.kr/article/25452022 | name: 다음(중앙일보) → 중앙일보 |
| `2026-09-27-geonwoo-corporate-card-whistleblower` | — | https://news.nate.com/view/20260202n28722 | https://www.news1.kr/local/gyeonggi/6059368 | name: 네이트 뉴스 → 뉴스1 |
| `2026-09-27-hoon2-jeonhyunhee-land-lease` | — | https://m.news.nate.com/view/20260921n14745 | https://www.mbn.co.kr/news/politics/5220564 | — |
| `2026-09-27-news1min-cpi-31st` | — | https://m.news.nate.com/view/20260210n28472 | https://www.yonhapnewstv.co.kr/news/AKR20260210154809vn3 | — |
| `2026-09-28-2pro-jcs-interim-claim` | — | https://v.daum.net/v/20260928204631882 | https://www.donga.com/news/Politics/article/all/20260928/134747559/1 | — |
| `2026-09-28-boxplus-2019-forced-repatriation` | — | https://m.news.nate.com/view/20260617n29637 | https://www.news1.kr/society/court-prosecution/6200515 | name: 네이트 뉴스 → 뉴스1 |
| `2026-09-28-drumtong119-jinsungjoon-nsl-past` | — | https://m.news.nate.com/view/20260830n16873 | https://www.chosun.com/opinion/taepyeongro/2026/08/30/5M7H22DZWNFFZITUTHBWAHX6M4/ | name: 조선일보(네이트) → 조선일보 |
| `2026-09-28-firstincome-kctu-spy-case-summary` | — | https://v.daum.net/v/20261022121733058 | https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0003277665 | — |
| `2026-09-28-firstincome-kctu-spy-case-summary` | — | https://v.daum.net/v/20250925103139086 | https://www.chosun.com/national/court_law/2025/09/25/P2PCAQBXVZDFLAZKR2JM6CMKGY/ | — |
| `2026-09-28-pagememo-jcs-interim-result` | — | https://v.daum.net/v/20260928204631882 | https://www.donga.com/news/Politics/article/all/20260928/134747559/1 | — |
| `2026-09-28-rekor-chinese-crime-tourism` | — | https://m.news.nate.com/view/20260911n28377 | https://www.ytn.co.kr/_ln/0115_202609111809286458 | name: 경북 → YTN (제목 문구도 원 기사 제목으로) |
| `2026-09-28-themove-hongkong-umbrella-12th` | — | https://m.news.nate.com/view/20260902n29185 | https://www.yna.co.kr/view/AKR20260902146200083 | name: 네이트 뉴스 → 연합뉴스 |
| `2026-09-29-shindawit-cxmt-samsung-threat` | — | https://v.daum.net/v/20260929050257952 | https://www.joongang.co.kr/article/25465442 | name: 다음(중앙일보) → 중앙일보 |
## 7. 커밋 대상 경로 (48개 — 슈퍼바이저 커밋용)
- `content/posts/` 46개: 아래 `git diff --name-only content/posts` 목록 그대로
- `content/posts-en/2026-08-06-owloffreedom-kimhyuntae-sentencing.md`
- `public/images/2026-08-06-owloffreedom-kimhyuntae-sentencing/thumb.jpg` (삭제)
- `docs/triggers/uploader-01-portal-source-replace-COMPLETE.md` (이 파일)
- `instructions/uploader/01-portal-source-replace-and-post1-initials.md` → `instructions/uploader/processed/` (이동)
- ⚠️ 작업 트리에 다른 세션의 수정(`docs/poster/guide.md`, `planning/v0.9-copy-and-code-list.md`, `history/*`)이 함께 있다. 경로 지정 커밋 필수.

```
content/posts/2026-07-25-idontknowpolitics-cheongju-spy-directives.md
content/posts/2026-08-06-owloffreedom-kimhyuntae-sentencing.md
content/posts/2026-08-12-citynewsmeme-parksangyong-oath-refusal.md
content/posts/2026-08-24-dictatorshipnono-jeju-missing-false-closure.md
content/posts/2026-09-10-currentwaves-pm-amendment-slip.md
content/posts/2026-09-10-freedominnovation-nec-bill.md
content/posts/2026-09-10-geonwoo-jeongyulseong-song-contest.md
content/posts/2026-09-11-currentwaves-nk-hr-report-classified.md
content/posts/2026-09-12-nowmagazine-postpartum-vs-nk-infant.md
content/posts/2026-09-14-kimminsoo-spy-law-enforcement.md
content/posts/2026-09-15-bbang630-518-armored-vehicle-claim.md
content/posts/2026-09-15-joojinwoo-kimseungwon-hearing.md
content/posts/2026-09-17-hagonolza-changwon-spy-indictment.md
content/posts/2026-09-18-dailybite-judicial-independence.md
content/posts/2026-09-18-newssnap-chung-no-kaesong-lawsuit.md
content/posts/2026-09-20-nowmagazine-alpha-phone.md
content/posts/2026-09-20-shindawit-foreign-unemployment-benefits.md
content/posts/2026-09-22-taekyu-chief-justice-refusal.md
content/posts/2026-09-24-hagonolza-kimgyeri-spy-remark.md
content/posts/2026-09-25-kimkyelee-nk-pow-ukraine.md
content/posts/2026-09-27-ccpoutkorea-china-threat-survey.md
content/posts/2026-09-27-geonwoo-corporate-card-whistleblower.md
content/posts/2026-09-27-hoon2-jeonhyunhee-land-lease.md
content/posts/2026-09-27-news1min-cpi-31st.md
content/posts/2026-09-28-2pro-jcs-interim-claim.md
content/posts/2026-09-28-boxplus-2019-forced-repatriation.md
content/posts/2026-09-28-drumtong119-jinsungjoon-nsl-past.md
content/posts/2026-09-28-firstincome-kctu-spy-case-summary.md
content/posts/2026-09-28-pagememo-jcs-interim-result.md
content/posts/2026-09-28-rekor-chinese-crime-tourism.md
content/posts/2026-09-28-themove-hongkong-umbrella-12th.md
content/posts/2026-09-29-momamour-westsea-vs-dmz-comparison.md
content/posts/2026-09-29-shindawit-cxmt-samsung-threat.md
content/posts/2026-09-30-monarch-morsetan-church-claims.md
content/posts/2026-10-01-ntdkorea-jeju-falungong-rally-chinese.md
content/posts/2026-10-05-jeichi-front-corps-unloaded-guard.md
content/posts/2026-10-05-wendmag-cio-investigation-scope.md
content/posts/2026-10-07-geonwoovibes-defector-repatriation-claim.md
content/posts/2026-10-07-yeong573-parkchoongkwon-filibuster-2025.md
content/posts/2026-10-09-themovemag-chinese-residents-1m.md
content/posts/2026-10-10-news1min-nps-foreigner-late-payment.md
content/posts/2026-10-12-conpoli88-parkjiwon-nk-remittance-nis.md
content/posts/2026-10-14-2pro-nk-slcm-not-announced.md
content/posts/2026-10-14-gotdemcatch-safety-drill-poster-insignia.md
content/posts/2026-10-18-wikipost-equal-pay-equal-work-roadmap.md
content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md
```
