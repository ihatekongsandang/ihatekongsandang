# 리뷰 27 — 기획자 11 · v0.2 결정 동기화 문서 게이트

**작성일**: 2026-11-09 | **작성 세션**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/processed/27-planner-11-v0.2-decisions-sync-review.md`
> 🔴 저장소 독립 원칙 준수. 경로는 저장소 기준 상대경로다. 대상 파일 수정 없음, git 쓰기·빌드 없음.

## 0. 판정

**조건부 승인.** P1 0건 · P2 1건 · P3 7건.
- 커밋 조건: **P2-1(PRD §0.5 76행의 낡은 "카드 갱신 미결정" 메모) 한 줄을 기획자가 고친 뒤 커밋.** 슈퍼바이저가 그 행을 Read로 확인하면 되고 재리뷰는 필요 없다. P3-1·P3-7은 같은 손질 때 함께 고치기를 권한다(커밋 차단은 아님).
- 코드 반영 문구 8건: **8/8 승인**(원안 그대로 3건, 수정 승인 5건). 최종 전문은 §3.
- 법령 확인(임무 4): 한국 법령 조회 도구로 원문을 확인했다. 뉴스통신사업자는 **등록**이다. 방송사업자는 대부분 **허가**이고, 방송채널사용사업자만 등록·신고·승인으로 나뉜다. 그래서 D1의 "등록된 매체"는 방송사업자에게 문자 그대로 맞지는 않는다. 풀이 문장은 이 차이를 밝히도록 고쳐서 승인한다(§4).

## 읽은 문서
- 대상: `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md`, `planning/v0.2-post-release-sync.md`, `git diff -- planning/`(prd·scope·terms-page-copy, 3 files +89 −20)
- 오더: `instructions/planner/processed/11-v0.2-decisions-sync.md`
- 리뷰 25 P3-8·P3-11(`docs/reviews/designer-02-news-format-v0.2-share-terms-review.md`), 리뷰 26 P3-2~P3-5(`docs/reviews/programmer-11-news-format-v0.2-implement-review.md`), `planning/en-d1-reconfirm.md`
- 배포 소스(읽기만): `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`, `src/app/(ko)/terms/page.tsx`, `src/app/(en)/en/terms/page.tsx`, `src/lib/config.ts`, `src/lib/i18n.ts`, `src/components/post-detail.tsx`, `src/lib/content/renewal.ts`, `src/lib/share.ts`, `docs/user-tasks.md` §5, `history/2026-11-08.md`(23:06 4c·5a)
- `git log`: ba699e3 = 2026-11-09 08:20 +0900 "v0.2 뉴스형 전환…"

---

## 1. 임무 1 — 사실 정합 (PRD v0.8·scope)

| 확인 | 근거(직접 확인) | 판정 |
|---|---|---|
| 4c 기록: `contactEmail` `null` + "연락 창구 준비 중" (ko/en about·terms) | `src/lib/config.ts` 29행 `contactEmail: null`, 네 페이지 모두 `ContactPendingNotice` 분기 | ✅ |
| 4c 날짜 2026-11-08, 배포 2026-11-09 | history 11-08 23:06, ba699e3 커밋 시각 | ✅ |
| 5a "갱신 후 7일" ↔ "0~6일(당일=1일째)" | `renewal.ts` 2·8·15행(`RENEWAL_DAYS = 7`, 0~6 표시) | ✅ |
| 빌드 시점·Asia/Seoul(UTC+9 고정)·평문 "MM/DD 갱신"/"Updated Nov 4"·SR "최근 갱신: 날짜" | `renewal.ts` 4~10·17행, `i18n.ts` 148·269~274행 | ✅ |
| X 256 = 280 − 1 − 23, 넘으면 `text` 없이 url만 | `src/lib/share.ts` 11·13·37행 | ✅ |
| 영어 D1 = 기획자 10 확정본 | `config.ts` `SITE_EN.aboutIntro` = `en-d1-reconfirm.md` §4 글자 일치 | ✅ |
| 약관 경로 `/terms`·`/en/terms` 확정 | 두 페이지 `canonical` | ✅ |
| **사용자 결정 ↔ 슈퍼바이저 판단 구분** | PRD §0.5: 4c·5a는 "확정" 표, 나머지 4건은 "슈퍼바이저 판단 반영 — 사용자 결정이 아니라…" 별도 표. v0.8 이력 행·scope 2.2-3·2.4도 출처를 따로 적음 | ✅ |
| 미결 표에 "연락 창구 확정(사용자)"만 신규로 남김 | PRD §0.5 미결 표, scope §4 | ✅ |
| PRD 안의 낡은 문언 | **76행** "카드 "갱신" 표시 추가 여부는 **사용자가 아직 결정하지 않았다**(아래 미결 표, P2-2)" — 바로 위 5a 행과 정면으로 어긋나고, 미결 표에는 그 항목이 이미 없다 | ❌ **P2-1** |
| 〃 | 366행 "운영 정책 페이지(`/terms` 제안, §4.1)", scope §1 표 2행 "신규 경로(제안 `/terms`·`/en/terms`)" — 확정된 경로를 아직 "제안"이라 부른다 | ⚠️ P3-1 |

그 밖에 PRD 22행("본 PRD는 §4.1에 제안 경로만 적었다")은 v0.7 작성 당시 메모라서 그대로 둬도 된다.

## 2. 임무 2 — P3-8 대조 재현

도구: `docs/tools/reviewer-27/terms-copy-reproduce.py`(저장소 루트에서 `python3 -I docs/tools/reviewer-27/terms-copy-reproduce.py`).
- 정방향: 문안의 문장을 배포 소스에서 찾는다. 제목, `>` 기획 메모, 작성 이력 메모 `(09-1 …)`·`(Added/Fixed 09-1 …)`는 뺐다. 양쪽을 정규화(JSX 태그·엔티티·`**`·공백 제거)한 뒤 부분 문자열로 비교했다.
- 역방향: 배포 JSX의 텍스트 노드를 문장으로 쪼개 문안에 없는 것을 뽑는다.

| 항목 | 기획자 주장 | 재현 |
|---|---|---|
| ko 문안 문장 | 29/29 일치 | **29/29, 누락·불일치 0** ✅ |
| en 문안 문장 | 29/29 일치 | **29/29, 누락·불일치 0** ✅ |
| 문안 밖 문장(약관, 화면 제목·링크 제외) | §A A1~A4, §B B1·B2 | ko: A1, A3, "연락 창구 준비 중입니다."·"확정되면 이 페이지를 갱신합니다."(=B1). en: A2, A4, "This page will be updated once it's finalized."(=B2), 메일 분기의 "Email"(=B3). **기록과 빠짐없이 일치** ✅ |
| A5·A6(about) | about 정정 절 끝에 있음 | ko·en about 소스에서 글자 일치 확인 ✅ |
| §B 10건 | — | B1~B10을 소스와 하나씩 대조했다. 절 제목에 번호 없음(B5), "소개로 돌아가기/Back to About"(B7), 메타 description(B8, `SITE.name`·`SITE_EN.name` 보간), `contactEmail` 분기(B3) 모두 사실이다 ✅ |

참고: 처음 돌렸을 때 en이 28로 나왔다. 영어 분할기가 `**`로 시작하는 문장(`**If it is confirmed…`)을 나누지 못한 탓이다. 분할 규칙을 고친 뒤 29가 나왔다. 수치가 맞지 않은 원인은 도구에 있었고, 기획자 수치는 맞다.

## 3. 임무 3 — 코드 반영 8건 문구 게이트

D6 자칭 금지: 8건 모두 주어가 "운영자"나 "this site/we"이고, 언론사·기자·인터넷신문이라 자칭하는 표현은 없다 ✅. 법적 효과를 보장하는 문장도 새로 생기지 않는다 ✅.

| # | 파일 | 판정 | 사유 |
|---|---|---|---|
| 1 | `src/app/(ko)/terms/page.tsx` | **수정 승인** | 절 이름(`정정·삭제 요청 방법과 처리 기준`)과 "위"(correction 절이 anonymous 절보다 앞에 있음)는 소스와 맞다. 다만 이 약관은 「」를 **법령명**(「신문 등의 진흥에 관한 법률」 등)에만 쓴다. 그래서 절 이름은 ‘’로 감싸야 법령으로 읽히지 않는다(about의 &lsquo;배경 보도&rsquo;와 같은 관례). P3-5 |
| 2 | `src/app/(en)/en/terms/page.tsx` | **원안 승인** | 절 제목이 소스 h2와 글자 단위로 일치한다. 따옴표는 `&ldquo;`·`&rdquo;`로 쓴다 |
| 3 | `src/app/(ko)/about/page.tsx` | **원안 승인** | 약관 A3과 같은 문장이다. about의 3영업일·이미지 대체 목록이 "처리 기준"에 해당하고, 끝 문장도 "처리 기준과 운영 원칙 전문은…"이라 이 용어로 이어진다. 독자에게 불리하지 않다. 경로가 없는 동안 지킬 수 없는 약속을 바로잡는 것이다 |
| 4 | `src/app/(en)/en/about/page.tsx` | **원안 승인** | 약관 A4와 같은 문장이다. #3과 의미가 같다 |
| 5 | `src/app/(ko)/terms/page.tsx` | **수정 승인** | 원안의 둘째 문장 "메타 정보(제목·요약)가 고치지 않은 원문 그대로임을 **밝히고** … 나올 수 있습니다"는 주어와 서술어가 맞지 않는다(메타 정보가 무언가를 "밝힐" 수는 없다). P3-2. 화면 라벨 "원문 미리보기"(`i18n.ts` 121행)를 그대로 쓰도록 고쳤다 |
| 6 | `src/app/(en)/en/terms/page.tsx` | **수정 승인** | 화면 라벨 "Original post preview"(`i18n.ts` 188행)로 이름을 맞췄다. ko 수정안과 같은 뜻이 되도록 "with a note saying so"를 더했다 |
| 7 | `src/app/(ko)/terms/page.tsx` | **수정 승인** | 법령 확인 결과(§4)를 반영한다. 매체마다 절차(등록·허가·승인 등)가 다르다는 사실을 밝힌다 |
| 8 | `src/app/(en)/en/terms/page.tsx` | **수정 승인** | 원안은 About 문구를 "registered under the Act on the Promotion of Newspapers and related laws"로 인용했다. 실제 `SITE_EN.aboutIntro`는 "outlets registered under **Korea's** Act on the Promotion of Newspapers and related laws"이므로 인용이 원문과 다르다(P3-3). 인용을 실제 문구로 고치고 #7과 같은 절차 문장을 더했다 |

### 3.1 🔴 P3-5(#5·#6) 약관 약속 완화 — 독자 불리 여부와 고지 방식

- **무엇이 완화되나**: "기사 요약이나 본문을 그대로 옮기지 않는다"는 약속이 "운영자가 쓰는 요약·본문에는 옮기지 않는다"로 좁아진다. 상세 "원문 미리보기"에 원문 `og.description`이 그대로 나오는 것을 허용하는 예외가 생긴다.
- **독자에게 불리한가**: **실질적으로 불리하지 않다고 판단한다.** 정정·삭제 절차, 출처 링크, 단정 금지 같은 독자 쪽 약속은 그대로다. 완화의 영향은 저작권자 쪽(원문 메타 인용 범위)에 닿는다. 그런데 그 범위는 이미 소개 "인용·저작권"("원문의 메타 정보(제목·요약·썸네일)만 인용"), 상세 `sourcePreviewNote`, PRD §5.1이 공개한 내용이다. 이번 변경으로 약관이 다른 공개 문서와 같은 말을 하게 된다. 원문을 그대로 실을 때는 같은 자리에 "원문 요약(출처 인용)" 라벨(`post-detail.tsx` 182~192행 `figcaption`+`blockquote`)과 "운영자가 고쳐 쓰지 않은 원문 그대로" 안내가 늘 함께 나온다. 독자가 운영자 요약으로 오인할 길은 막혀 있다.
- **소급 문제**: `og.description`을 쓴 게시물은 **0/207**이다(리뷰어 재측정: frontmatter `og:` 블록 207개를 파싱한 결과 키는 `siteName` 207·`title` 1·`description` 0). 지금까지 옛 약속을 어긴 게시물은 없다.
- **고지 방식**: 미리보기 자리의 라벨과 안내문은 독자 고지로 **충분하다**. 다만 약관 페이지에 개정일 표기가 없어 약속이 바뀐 사실이 남지 않는다 → **P3-6**(권장, 선택 9번째 항목, 슈퍼바이저 판단).
- **운영 조건**: #5·#6이 배포되기 전에는 게시물에 `og.description`을 넣지 말 것(지금 관행 유지). 프로그래머 반영 오더에서 0/207을 다시 재고 반영한다.

### 3.2 승인된 최종 문구 전문 (프로그래머 오더 입력)

인용부호는 기존 파일 관례대로 `&ldquo;`/`&rdquo;`/`&lsquo;`/`&rsquo;` 엔티티로 쓴다. 굵게 표시 범위는 현행 `<strong className="font-semibold">`를 따른다.

**#1 `src/app/(ko)/terms/page.tsx` — `anonymous` 절 마지막 문장**
- 현행: 운영자와의 연락은 위 4항의 연락 경로를 통해서만 가능합니다.
- 변경: 운영자와의 연락은 위 ‘정정·삭제 요청 방법과 처리 기준’ 절의 연락 경로를 통해서만 가능합니다.
- 선택: 절 이름에 `#correction` 링크(`text-link underline underline-offset-2`)를 걸지는 프로그래머가 판단한다.

**#2 `src/app/(en)/en/terms/page.tsx` — `anonymous` 절 마지막 문장**
- 현행: The only way to reach the operator is through the contact channel in Section 4.
- 변경: The only way to reach the operator is through the contact channel in the “How to request a correction or removal, and how we handle it” section above.
- 선택: #1과 같다.

**#3 `src/app/(ko)/about/page.tsx` — `correction` 절, `contactEmail`이 `null`인 분기(`<ContactPendingNotice>` 아래, Fragment, `text-xs text-muted-foreground`)**
- 현행: (없음)
- 추가: 아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다.

**#4 `src/app/(en)/en/about/page.tsx` — 같은 분기**
- 현행: (없음)
- 추가: The handling standards below apply once the contact channel is finalized.

**#5 `src/app/(ko)/terms/page.tsx` — `sourcing` 절 셋째 `<li>`**
- 현행: 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **기사 요약이나 본문을 그대로 옮기지 않습니다**.
- 변경: 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **운영자가 쓰는 요약과 본문에는 기사 요약이나 본문을 그대로 옮기지 않습니다**. 다만 상세 페이지의 ‘원문 미리보기’에는 원문이 공개한 메타 정보(제목·요약)가 인용 표시와 함께 고치지 않은 그대로 나올 수 있으며, 그 사실을 같은 자리에 밝혀 둡니다.

**#6 `src/app/(en)/en/terms/page.tsx` — `sourcing` 절 셋째 `<li>`**
- 현행: Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **we never copy a news article's summary or body text**.
- 변경: Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **the summaries and text we write never copy a news article's summary or body text**. The “Original post preview” box on a post page may show the title and summary the source itself published, unedited and labeled as quoted, with a note saying so.

**#7 `src/app/(ko)/terms/page.tsx` — `sourcing` 절 둘째 `<li>` 끝("…단독 근거로 쓰지 않습니다." 뒤)에 덧붙임**
- 추가: 소개 문구의 “신문법 등에 따라 등록된 매체”는 위 기준 전체를 줄여 부른 표현입니다. 매체 종류에 따라 근거 법령과 절차(등록·허가·승인 등)가 다르며, 근거 법령은 위에 적은 대로입니다.

**#8 `src/app/(en)/en/terms/page.tsx` — `sourcing` 절 둘째 `<li>` 끝("…not used as a sole basis." 뒤)에 덧붙임**
- 추가: The phrase “outlets registered under Korea's Act on the Promotion of Newspapers and related laws” in the About intro is shorthand for this whole standard. The legal basis and procedure (registration, license, approval, etc.) differ by type of outlet; the governing laws are as named above.

영어 의미 동등: #2↔#1, #4↔#3, #6↔#5, #8↔#7 모두 동등하다 ✅. #8의 인용은 `SITE_EN.aboutIntro`와 글자 단위로 일치해야 한다. 반영 후 `docs/tools/programmer-11-1/copy-exact-check.py` 방식으로 대조한다.

## 4. 임무 4 — D1 "등록된" 풀이와 법령 확인

도구: 한국 법령 조회 MCP(`search_law`·`get_law_text`, 조회일 2026-11-09, 현행본).

| 법령 | 조문 원문 요지 | 지위 |
|---|---|---|
| 「뉴스통신 진흥에 관한 법률」(법령ID 009529, 시행 2025-10-01) | 제2조 3호: "뉴스통신사업자"란 뉴스통신사업을 하기 위하여 **제8조에 따라 등록한 자**로서 뉴스통신을 경영하는 법인. 제8조①: 문화체육관광부장관에게 **등록**하여야 한다 | **등록** |
| 「방송법」(법령ID 000794, 시행 2026-04-21) | 제2조 3호 가~마목·제9조: 지상파·종합유선·위성·공동체라디오방송사업자는 **허가**(①②⑪). 방송채널사용사업자는 ⑤에 따라 TV는 **등록**, 라디오·데이터·VOD는 **신고**, 종합편성·보도전문편성·홈쇼핑은 **승인**. 외국 위성 관련은 승인(⑥⑧) | **허가 중심, 일부 등록·신고·승인** |
| 「방송법」 시행예정 개정(2026-10-20 공포, 시행 2027-04-21) | 제9조 문언이 현행과 같다(조회 확인) | 변동 없음 |
| 「신문 등의 진흥에 관한 법률」(법령ID 001604) | 제9조①: 신문·인터넷신문·인터넷뉴스서비스는 시·도지사에게 **등록** | 등록 |

**판정**
- 약관 §3 현행("뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로") 은 법령과 맞다 ✅. 방송법 제2조 3호에 "방송사업자" 정의가 실제로 있다.
- D1 "신문법 등에 따라 **등록된** 매체": 신문·인터넷신문·뉴스통신에는 맞다. **방송사업자 대부분(지상파·종합유선·위성)은 등록이 아니라 허가**라서 문자 그대로는 맞지 않는다. 기획자는 "확인 필요"로 남겨 두었고, 이번 확인으로 그 긴장이 실제로 있음이 드러났다.
- 기획자 풀이 원안("이 기준 전체를 줄여 부른 표현이며, 매체 종류별 근거 법령은 위에 적은 대로")은 틀린 단정이 없어 **법령과 모순되지는 않는다**. 다만 "등록" 일괄 표현이 부정확하다는 점은 독자에게 드러나지 않는다. 그래서 "절차(등록·허가·승인 등)가 다르다"를 밝히도록 고쳐 승인한다(#7·#8). 매체별 지위를 하나하나 단정하지 않고 "등"으로 신고까지 포함하므로 약관의 "확인 필요" 문체와도 맞는다.
- D1 문구 자체: 사용자 확정문이다. 리뷰어가 고칠 문구가 아니다. 풀이 문장으로 정확성을 약관에서 맡게 하는 기획자 권장안 1을 지지한다. 사용자에게는 위 사실을 알리는 것으로 충분하다(§6).
- 참고(범위 밖, 기록만): 약관·about의 "미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다"에서 "미등록"은 허가 사업자를 포함하지 않는 것처럼 읽힐 수 있다. 지금 문맥(1인 미디어와 나란히 놓임)에서는 오독 위험이 낮아 결함으로 잡지 않는다. 다음 약관 손질 때 "근거 법령상 지위가 없는 매체" 같은 표현을 검토하면 된다.

## 5. 임무 5 — 저장소 독립

오더가 정한 금지어 패턴(홈 디렉터리 절대경로·계정명·다른 서비스명 4종)으로 `grep -nE`를 아래 파일에 돌렸다.
- 대상: `planning/prd.md`, `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/v0.2-post-release-sync.md`, `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md`, `instructions/planner/processed/11-v0.2-decisions-sync.md`, `docs/tools/reviewer-27/*`
- 결과: **0건**. `git diff -- planning/`의 추가 줄도 0건이다 ✅.

## 결함 목록

| # | 등급 | 위치 | 내용 | 조치 |
|---|---|---|---|---|
| P2-1 | P2 | `planning/prd.md` 76행 | 5a 확정 직후에 "카드 갱신 표시 추가 여부는 사용자가 아직 결정하지 않았다(아래 미결 표)"가 남아 있다. 사용자 결정 기록이 자기모순이다(임무 1 핵심) | 기획자: 행 삭제 또는 "5a로 확정(2026-11-08)"으로 교체. **커밋 전 필수** |
| P3-1 | P3 | PRD 366행, scope §1 표 2행 | 확정 경로 `/terms`를 아직 "제안"이라 부른다 | 기획자: 같은 손질 때 "확정"으로 |
| P3-2 | P3 | sync §4.2 ko 변경안 | 주어와 서술어 불일치("메타 정보가 … 밝히고") | §3.2 #5 문구로 대체(승인) |
| P3-3 | P3 | sync §5·§6 #8 en | About 인용이 실제 `aboutIntro`와 다르다("outlets", "Korea's" 빠짐) | §3.2 #8 문구로 대체(승인) |
| P3-4 | P3 | sync §5 D1 풀이 | 법령 확인 결과(방송사업자 허가 중심)를 드러내지 않는다 | §3.2 #7·#8 문구로 대체(승인) |
| P3-5 | P3 | sync §3 ko 변경안 | 약관에서 법령명 전용인 「」로 절 이름을 감쌌다 | §3.2 #1 ‘’ 문구(승인) |
| P3-6 | P3 | 약관 ko/en | 약속을 완화하는데 개정일 표기가 없다 | 권장(선택): 약관 끝 "소개로 돌아가기" 위에 "최종 개정: YYYY-MM-DD" / "Last updated: YYYY-MM-DD" 한 줄. 넣을지는 슈퍼바이저가 판단(9번째 항목) |
| P3-7 | P3 | 문서 정리 | `terms-page-copy.md` §C C2 "§4-2" → "§4.2". sync §5·§8과 트리거의 "뉴스통신사·방송사업자 지위 확인 필요"는 본 리뷰 §4로 해소됐다. PRD §0.5 "슈퍼바이저 판단 반영 (오더 11·…)"은 기획자 오더 11과 헷갈리니 "프로그래머 오더 11"로 | 기획자: 같은 손질 때. 문안 확정(§C 환원)은 프로그래머 반영 때 본 리뷰 §3.2 문구로 |

## 6. 사용자 결정 필요

1. 🔴 **연락 창구 확정**(기존 미결, `docs/user-tasks.md` §5). 신규 아님.
2. 신규 필수 결정 없음. **알림만** 한다: D1의 "등록된 매체"는 방송사(허가)에 문자 그대로 맞지 않는다. 약관 풀이 문장(#7·#8)으로 보완한다. D1 문구 자체를 바꾸고 싶을 때만 sync §5 선택지 3을 사용자 결정으로 올린다(리뷰어는 권장하지 않음).
3. 슈퍼바이저 판단 1건: P3-6 개정일 표기를 넣을지.

## 7. 커밋 대상 경로 (P2-1 수정 후)
- `planning/prd.md`, `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/v0.2-post-release-sync.md`
- `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md`, `instructions/planner/processed/11-v0.2-decisions-sync.md`
- `docs/reviews/planner-11-v0.2-decisions-sync-review.md`, `docs/tools/reviewer-27/terms-copy-reproduce.py`
- `docs/triggers/reviewer-27-planner-11-v0.2-decisions-sync-review-COMPLETE.md`, `instructions/reviewer/processed/27-planner-11-v0.2-decisions-sync-review.md`
- `history/2026-11-09.md`
