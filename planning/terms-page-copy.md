# 이용약관·운영 정책 페이지 문안 (ko/en)

> 작성: 기획자 (Sonnet 5) · md오더 09 | 작성일: 2026-11-08
> 🆕 **2026-11-09 동기화(기획자 11, 리뷰 25 P3-8)**: 이 문안은 v0.2에 배포됐다(커밋 ba699e3). 디자이너·프로그래머가 문안 밖에서 더한 문장과 배포 문구가 문안과 다른 곳을 문서 맨 아래 §A~§C에 기록했다. 아래 한국어·English 원문 자체는 문안 확정본 그대로 두었다. 개정 문구 안은 `planning/v0.2-post-release-sync.md`(§3~§5)에 있다.
> 🆕 **2026-11-09 본문 동기화(기획자 12, 리뷰 28 P3-2)**: 아래 한국어·English 본문을 배포된 개정 문구(커밋 8a6f4d3, 리뷰 27·28 승인)로 바꿨다. 옛 문장 4개(#1·#2·#5·#6), 덧붙임 2개(#7·#8), 개정일 줄(#9)을 반영했고 §C는 처리 완료 기록으로 바꿨다. **아포스트로피 표기 규칙은 §C 머리에 있다**(이 문서의 곧은 `'`는 `&rsquo;`를 뜻한다).
> 🔴 저장소 독립 원칙: 다른 서비스명·계정명·홈 디렉터리 절대경로를 쓰지 않는다.
> 근거: `planning/news-format-conversion.md` §1.0·§1.3·D2·D6, PRD v0.7 §6④·⑥
> ⚠️ **법적 효과를 보장하는 표현은 쓰지 않는다.** 아래 문안은 모두 "확인 필요" 전제를 유지하며, "~이다"처럼 단정하지 않고 "~로 운영한다"·"~에 따라 조치한다"처럼 운영 사실을 서술하는 형태로만 썼다.
> 🆕 **(v0.8 갱신)** 아래 "연락 경로 확정값 없음" 메모는 작성 당시(2026-11-08) 상태다. 사용자 결정 4c로 배포 화면은 `contact@example.invalid`를 제거하고 "연락 창구 준비 중"을 보인다(`contactEmail`은 `null`). 상세는 §B.
> 🔴 **연락 경로는 확정값이 없다** — `src/lib/config.ts`의 현재 `contactEmail`은 `contact@example.invalid`로, `/about` 페이지에도 "확정 전 임시 주소"라고 이미 표시돼 있다(코드 확인, 2026-11-08). 이 문서는 새 계정·메일을 임의로 만들지 않고 **"사용자 결정 필요"**로 남긴다. 사용자가 실제 연락처를 정하면 이 페이지의 해당 자리만 교체한다.

---

## 페이지 위치·제목 (확정 — 프로그래머 11 구현, 아래 §B10)

- 경로(확정): `/terms`(한국어), `/en/terms`(영어) — PRD §4.1과 동일.
- 제목(확정): "이용약관·운영 정책" / "Terms and Operating Policy"
- 개정일 줄(확정, #9): 제목 아래 첫 줄 작은 글씨 `최종 개정: 2026-11-09` / `Last updated: 2026-11-09`. 날짜는 `src/lib/config.ts`의 `termsLastUpdated` 한 상수를 ko·en이 함께 쓰며(Asia/Seoul), 약관 문구를 고칠 때마다 갱신한다.
- `/about`·`/en/about` 하단에 이 페이지로 가는 링크를 추가하는 것을 전제로 썼다(상호 참조).

---

## 한국어 문안

### 1. 운영 목적

이 사이트는 정책 비판·정치인 발언·논평·안보 현안 등 정치·시사 이슈를 공개된 보도와 자료에서 골라 카드형으로 정리해 보여주는 소식지입니다. 운영자가 직접 취재하지 않고, 이미 공표된 보도·발표·판결을 모아 정리하는 것이 이 사이트가 하는 일입니다.

### 2. 직접 취재하지 않음

이 사이트의 모든 게시물은 **이미 공개된 보도·공식 발표·판결을 출처로** 작성합니다. 운영자가 현장을 취재하거나 독자적으로 사실을 확인해 보도를 생산하지 않습니다. 게시물의 요약·제목은 출처가 보도한 내용을 벗어나지 않도록 작성하며, 출처가 확인해 주지 않은 내용은 요약에 넣지 않습니다. (09-1 수정 — 리뷰 24 P3-5) 정치인·공직자 등의 발언·게시물을 소개하는 경우에는 원문 링크와 함께, 그 내용을 뒷받침하거나 배경이 되는 보도를 "배경 보도"로 함께 표시합니다.

### 3. 출처 원칙

- 근거로 삼는 출처는 언론사 보도, 수사기관(검찰·경찰·국가정보원 등)의 공식 발표·보도자료, 공개된 법원 판결문입니다.
- 언론사는 「신문 등의 진흥에 관한 법률」에 따라 **등록된 신문·인터넷신문**(제2조 1호·2호 정의 충족)을 기준으로 보고, 뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다(09-1 수정 — 리뷰 24 P3-1: 뉴스통신사·방송사업자를 신문법 등록 대상으로 쓴 것은 오기였습니다). 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다. 소개 문구의 “신문법 등에 따라 등록된 매체”는 위 기준 전체를 줄여 부른 표현입니다. 매체 종류에 따라 근거 법령과 절차(등록·허가·승인 등)가 다르며, 근거 법령은 위에 적은 대로입니다.
- 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **운영자가 쓰는 요약과 본문에는 기사 요약이나 본문을 그대로 옮기지 않습니다**(09-1 수정 — 리뷰 24 P3-6: "제목·요약만 인용"은 기사의 요약을 그대로 옮긴다는 뜻으로 읽힐 수 있어 고쳤습니다). 다만 상세 페이지의 ‘원문 미리보기’에는 원문이 공개한 메타 정보(제목·요약)가 인용 표시와 함께 고치지 않은 그대로 나올 수 있으며, 그 사실을 같은 자리에 밝혀 둡니다.
- 제목과 요약은 단정하지 않고 인용하는 형태로 씁니다("~로 보도됨"·"~라는 의혹이 제기됨" 등).

### 4. 정정·삭제 요청 방법과 처리 기준

사실과 다른 내용이 있거나, 원문 이미지 사용 중단, 게시물 삭제를 요청하려면 아래 연락 경로로 알려주시기 바랍니다.

> 🔴 **연락 경로: 사용자 결정 필요** (현재 `/about` 페이지의 이메일은 확정 전 임시 주소입니다. 실제 연락처가 정해지면 이 자리를 교체합니다.)

**처리 기준** (두 기준을 구분해 둡니다):
- **서비스 기준**(이 사이트가 스스로 정한 운영 기준): 접수 후 **영업일 3일 이내에 1차 답변**을 드립니다. 법에서 정한 기한이 아니라 이 사이트가 스스로 정한 기준입니다.
- **"지체 없이" 조치**: 요청 내용을 확인한 뒤에는 **지체 없이** 필요한 조치(게시물 수정, 비공개, 이미지 교체 등)를 취합니다. 권리 침해 여부 판단이 어렵거나 다툼이 예상되는 경우에는 임시로 접근을 제한하는 조치를 할 수 있습니다. (09-1 추가 — 리뷰 24 P3-3) 이 임시 제한은 **최대 30일**을 운영 기준으로 두고, 그 안에 계속 제한할지·조치를 끝낼지를 정합니다.
- 위 절차는 이 사이트가 **자율적으로 운영하는 정책**입니다. 관련 법령(정보통신망법 제44조의2 등)이 이 사이트에 적용되는지는 **확인 필요** 상태이며, 적용 여부와 무관하게 이 절차를 운영합니다. (09-1 추가 — 리뷰 24 P3-2) **적용되는 것으로 확인되면, 그 법령이 정한 절차(정보통신망법 제44조의2, 해당하는 경우 언론중재법 제14조·제17조의2)를 따릅니다.**

### 5. 익명 운영과 연락 경로

이 사이트는 운영자의 실명·소속·직함을 공개하지 않고 **익명으로 운영**합니다. 회원 가입·댓글·후원 기능이 없습니다. (09-1 수정 — 리뷰 24 P3-4) 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계되고 정정·삭제 요청 시 보내주신 연락처(이메일 등)는 응답 목적으로만 씁니다. 이 설명이 개인정보보호법상 요구되는 고지를 전부 충족하는지는 **확인 필요**입니다. 운영자와의 연락은 위 ‘정정·삭제 요청 방법과 처리 기준’ 절의 연락 경로를 통해서만 가능합니다.

### 6. 게시물 성격

이 사이트의 게시물은 **보도를 모아 정리한 것**입니다. 이 표현은 이 사이트가 「신문 등의 진흥에 관한 법률」상 인터넷신문·인터넷뉴스서비스 등에 해당하는지와는 무관하며(09-1 수정 — 리뷰 24 P3-7: 신문법에는 "언론"이라는 정의가 없습니다 — "언론" 정의는 「언론중재 및 피해구제 등에 관한 법률」 제2조 1호에 있습니다), 운영자가 자신의 게시물을 어떤 성격으로 규정하는지를 설명하는 것일 뿐 법적 성격을 정하는 것은 아닙니다.

---

## English copy

### 1. What this site does

This site collects publicly reported political and current-affairs stories (policy criticism, politicians' statements, commentary, security developments, etc.) and presents them as cards. We do not do our own reporting — what we do is gather and organize stories that have already been published.

### 2. We do not do our own reporting

Every post on this site is written from **sources that have already been published**: news reports, official announcements, or court rulings. We do not go into the field or independently verify facts to produce new reporting. Titles and summaries stay within what the source actually reported, and we leave out anything the source doesn't confirm. (Added 09-1 — review 24 P3-5) When we cover a statement or post by a politician or public official, we link to the original and also list, as "background reporting," any coverage that supports or gives context for it.

### 3. Sourcing principles

- We rely on: news coverage, official announcements or press releases from investigative authorities (e.g., the prosecution, police, National Intelligence Service), and published court rulings.
- "News outlet" means a newspaper or internet newspaper **registered** under Korea's Act on the Promotion of Newspapers (meeting Article 2, items 1–2), a news agency under the Act on the Promotion of News Agencies, or a broadcaster under the Broadcasting Act (fixed 09-1 — review 24 P3-1: news agencies and broadcasters are not registered under the Newspapers Act). Unregistered outlets, independent media, and YouTube channels are not used as a sole basis. The phrase “outlets registered under Korea's Act on the Promotion of Newspapers and related laws” in the About intro is shorthand for this whole standard. The legal basis and procedure (registration, license, approval, etc.) differ by type of outlet; the governing laws are as named above.
- Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **the summaries and text we write never copy a news article's summary or body text** (fixed 09-1 — review 24 P3-6: "only titles and short summaries" could be read as copying the article's own summary). The “Original post preview” box on a post page may show the title and summary the source itself published, unedited and labeled as quoted, with a note saying so.
- Titles and summaries are written as quotations, not assertions (e.g., "reportedly ...", "allegedly ...").

### 4. How to request a correction or removal, and how we handle it

If something is inaccurate, or you want us to stop using an image from the original, or you want a post removed, please contact us below.

> 🔴 **Contact channel: pending a decision.** (The email currently shown on the `/about` page is a temporary placeholder. This section will be updated once a real contact address is decided.)

**Two separate standards:**
- **Our own service standard**: we send a first reply within **3 business days** of receiving a request. This is our own standard, not a legal deadline.
- **"Without delay"**: once we've reviewed a request, we take the necessary action (correcting the post, unpublishing it, replacing an image, etc.) **without delay**. If it's hard to judge whether a right has been infringed, or a dispute seems likely, we may temporarily restrict access while we look into it. (Added 09-1 — review 24 P3-3) Any such temporary restriction follows an operating cap of **at most 30 days**, within which we decide whether to keep it or resolve it.
- This process is a **self-adopted operating policy**. Whether specific Korean statutes (e.g., Article 44-2 of the Act on Promotion of Information and Communications Network Utilization and Information Protection, etc.) apply to this site is **still being confirmed**; we run this process regardless of that determination. (Added 09-1 — review 24 P3-2) **If it is confirmed that a statute applies, we follow the procedure it sets out** (Article 44-2 of that Act, and Articles 14 and 17-2 of the Act on Press Arbitration and Remedies, etc. for Damage Caused by Press Reports, where applicable).

### 5. Anonymous operation and contact

This site is run **anonymously** — we don't disclose the operator's real name, affiliation, or title. There's no sign-up, no comments, and no donations. (Fixed 09-1 — review 24 P3-4) We don't collect personal information for things like sign-up or payment, but visit statistics are collected via GA4, and any contact details (e.g., an email address) you send with a correction or removal request are used only to respond to you. Whether this description fully meets what Korea's personal-data-protection law requires is **still being confirmed**. The only way to reach the operator is through the contact channel in the “How to request a correction or removal, and how we handle it” section above.

### 6. What kind of content this is

Posts on this site are **summaries of already-published reporting**. This description doesn't determine whether the site counts as an internet newspaper or internet news service under Korea's Act on the Promotion of Newspapers (fixed 09-1 — review 24 P3-7: that Act has no definition of "press"; "press" is defined in Article 2, item 1 of the Act on Press Arbitration and Remedies, etc.) — it's simply how we describe what we do, not a legal classification.

---

## 배포 후 대조 기록 (v0.8, 2026-11-09 기획자 11 — 리뷰 25 P3-8)

> 대조 방법: 배포 소스 `src/app/(ko)/terms/page.tsx`, `src/app/(en)/en/terms/page.tsx`, `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`, `src/lib/config.ts`를 읽기만 했다. 위 한국어·English 원문의 작성 이력 메모를 뺀 문장 각 29개를 배포 소스에서 정규화(JSX 태그·HTML 엔티티·공백 제거) 후 부분 문자열 일치로 검사해 **누락 0건·불일치 0건**을 확인했다(ko 29/29, en 29/29). 아래는 그 밖의 차이다.

### §A. 문안 밖에서 더해진 문장 원문 기록 (확정자 명시)

프로그래머 11 핸드오프 결정 3의 "문안 밖 문장 4개"와 슈퍼바이저 판단 문장을 원문으로 기록한다. 리뷰 26 §5.2가 의미·보장 표현 여부를 통과시켰다. **이후 이 문장들은 문안의 일부로 본다.**

| # | 문장(배포 원문) | 위치 | 작성자 | 확정 근거 |
|---|---|---|---|---|
| A1 | 이 페이지는 이 사이트가 어떻게 운영되는지, 어떤 출처를 쓰는지, 문제가 있을 때 어떻게 연락하는지를 안내합니다. | 약관(ko) 제목 아래 | 디자이너 02 (시안 02 §2) → 프로그래머 11 구현 | 리뷰 26 §5.2 #1 통과. 중립 안내문, 보장 표현 없음 |
| A2 | This page explains how this site is run, which sources it uses, and how to reach us if there is a problem. | 약관(en) 제목 아래 | 프로그래머 11 (A1의 번역) | 리뷰 26 §5.2 #2 통과, 의미 동등 |
| A3 | 아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다. | 약관(ko) §4, 준비 중 상자 아래, `contactEmail`이 `null`일 때만 | 디자이너 02 (시안 02 §3.1) | **슈퍼바이저 판단**(오더 11 판단 1, "약관은 지금 공개 — 처리 기준은 연락 창구가 확정된 뒤부터 적용") |
| A4 | The handling standards below apply once the contact channel is finalized. | 약관(en) §4, 같은 조건 | 프로그래머 11 (A3의 번역) | 리뷰 26 §5.2 #3 통과, 의미 동등 |
| A5 | 처리 기준과 운영 원칙 전문은 이용약관·운영 정책에서 볼 수 있습니다. (링크 문구: "이용약관·운영 정책") | `/about` 정정·삭제 절 끝 | 프로그래머 11 (리뷰 25 P3-9 위치) | 리뷰 26 §5.2 #4 통과 |
| A6 | For the full handling standards and operating principles, see the Terms and Operating Policy. | `/en/about` 같은 자리 | 프로그래머 11 | 리뷰 26 §5.2 #4 통과 |

⚠️ A3·A4는 **운영 정책의 내용**(처리 기준 적용 시점)이다. 문안 원본에 두지 않으면 사용자가 연락 창구를 정한 뒤 문장이 빠지는 조건(`contactEmail`이 설정되면 사라짐)을 놓칠 수 있어 여기 적는다.

### §B. 배포 문구와 문안이 다른 곳 전부

| # | 대상 | 문안 | 배포 | 성격 |
|---|---|---|---|---|
| B1 | 약관(ko) §4 연락 경로 | 🔴 "연락 경로: 사용자 결정 필요"(기획 메모 상자, 화면 문구 아님) | 준비 중 상자: "연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다." | 사용자 결정 4c 반영. 상자 문구는 시안 02·03 |
| B2 | 약관(en) §4 연락 경로 | "Contact channel: pending a decision. (The email currently shown on the `/about` page is a temporary placeholder. …)" | "Contact channel: pending a decision. This page will be updated once it's finalized." | 4c 반영. 괄호 속 임시 주소 설명은 임시 주소 제거로 불필요 |
| B3 | 약관(ko·en) §4 | (없음) | `contactEmail`이 설정되면 준비 중 상자 대신 "이메일 {주소}" / "Email {address}" 상자 | 프로그래머 11의 조건 분기. 문안에 없음 |
| B4 | 약관(ko·en) §4 | (없음) | §A의 A3·A4 문장(`contactEmail`이 `null`일 때만) | 슈퍼바이저 판단 |
| B5 | 약관(ko·en) 절 제목 | "1. 운영 목적" … "6. 게시물 성격" / "1. What this site does" … | 번호 없는 제목("운영 목적" … "게시물 성격") | 시안 02 구조. **§5 본문의 "위 4항"/"Section 4"가 화면에서 가리킬 곳이 없는 원인** → 개정 안은 `planning/v0.2-post-release-sync.md` §3 |
| B6 | 약관(ko·en) 맨 위 | (없음) | 페이지 제목 아래 소개 문장(§A의 A1·A2) | 디자이너·프로그래머 |
| B7 | 약관(ko·en) 맨 아래 | (없음) | "소개로 돌아가기" / "Back to About" 링크 | 시안 02 §2 |
| B8 | 약관 메타 | (없음, "제목(제안)"만) | ko description "공산당이싫어요의 운영 목적, 출처 원칙, 정정·삭제 요청 처리 기준, 익명 운영과 게시물 성격을 안내합니다." / en description "What 공산당이싫어요 (Korea Politics & Security Brief) does, its sourcing principles, how correction and removal requests are handled, and how the site is run." | 프로그래머 11. 메타 문구는 문안 범위 밖이라 승인 대상이 아니었다 — 이 기록으로 확인 완료 |
| B9 | 작성 이력 메모 | "(09-1 수정 — 리뷰 24 …)"·"(Added/Fixed 09-1 …)" | 모두 뺌 | 의도된 차이(화면 문구 아님) |
| B10 | 경로·제목 | "제안, 확정 아님" `/terms`·`/en/terms` | 그대로 확정 | 프로그래머 11 구현 |

### §C. 개정 처리 완료 (2026-11-09 기획자 12 — 배포 커밋 8a6f4d3, 리뷰 27 승인 문구 → 리뷰 28 승인)

🔴 **아포스트로피 표기 규칙**: 문안·개정 기록 표의 곧은 `'`는 `&rsquo;`(’)를 뜻한다. 영문 소개 문구(`SITE_EN.aboutIntro`)를 **인용**하는 곳만 곧은 `'`(`&apos;`) 그대로 쓴다(#8의 `Korea's` 인용). 인용부호 관례는 `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;`.

아래 9건은 모두 위 한국어·English 본문에 반영됐고 배포 소스와 글자 단위로 같다(리뷰 28 대조 38/38). 본문 반영일 2026-11-09, 배포 커밋 8a6f4d3. 자세한 위치·옛 문구 대조는 `planning/v0.2-post-release-sync.md` §6.

| # | 대상 | 반영 원문 | 근거 | 배포 커밋 |
|---|---|---|---|---|
| #1 ko | §5 마지막 문장 "위 4항" | 운영자와의 연락은 위 ‘정정·삭제 요청 방법과 처리 기준’ 절의 연락 경로를 통해서만 가능합니다. (`#correction` 링크는 넣지 않음 — 리뷰 28 §2-3 승인) | 리뷰 26 P3-4 → 리뷰 27 | 8a6f4d3 |
| #2 en | §5 마지막 문장 "Section 4" | The only way to reach the operator is through the contact channel in the “How to request a correction or removal, and how we handle it” section above. | 리뷰 26 P3-4 → 리뷰 27 | 8a6f4d3 |
| #5 ko | §3 셋째 항목 | 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **운영자가 쓰는 요약과 본문에는 기사 요약이나 본문을 그대로 옮기지 않습니다**. 다만 상세 페이지의 ‘원문 미리보기’에는 원문이 공개한 메타 정보(제목·요약)가 인용 표시와 함께 고치지 않은 그대로 나올 수 있으며, 그 사실을 같은 자리에 밝혀 둡니다. | 리뷰 26 P3-5 → 리뷰 27 · 리뷰 28 §2-1(완화 유지, 고지 위치 코드 확인) | 8a6f4d3 |
| #6 en | §3 셋째 항목 | Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **the summaries and text we write never copy a news article's summary or body text**. The “Original post preview” box on a post page may show the title and summary the source itself published, unedited and labeled as quoted, with a note saying so. | 같음. ⚠️ 위 규칙대로 `article's`의 `'`는 `&rsquo;`다. **배포는 `&apos;`(곧은 `'`)라 1자 다르다**(리뷰 28 P3-1) — 아래 §D | 8a6f4d3(1자 차이 있음) |
| #7 ko | §3 둘째 항목 끝에 덧붙임 | 소개 문구의 “신문법 등에 따라 등록된 매체”는 위 기준 전체를 줄여 부른 표현입니다. 매체 종류에 따라 근거 법령과 절차(등록·허가·승인 등)가 다르며, 근거 법령은 위에 적은 대로입니다. | 리뷰 26 D1 "신문법 등"과의 관계 → 리뷰 27 | 8a6f4d3 |
| #8 en | §3 둘째 항목 끝에 덧붙임 | The phrase “outlets registered under Korea's Act on the Promotion of Newspapers and related laws” in the About intro is shorthand for this whole standard. The legal basis and procedure (registration, license, approval, etc.) differ by type of outlet; the governing laws are as named above. | 같음. 인용이라 곧은 `'`(`SITE_EN.aboutIntro`와 글자 일치, 규칙의 예외) | 8a6f4d3 |
| #9 ko·en | 제목 아래 첫 줄(작은 글씨) — 위 "페이지 위치·제목" | ko: 최종 개정: 2026-11-09 / en: Last updated: 2026-11-09 | 슈퍼바이저 판단(리뷰 27 P3-6) · 리뷰 28 §2-4(날짜 상수·`<time>` 일치, `dateModified` 미추가 승인) | 8a6f4d3 |

#1·#2는 링크 없는 평문이고, #5·#6 문장은 리뷰 28이 "고지 위치(같은 미리보기 상자 안 안내)"까지 코드와 맞는다고 확인했다.

### §D. 대기 항목 (다음 약관 코드 오더 — 기획자 12 처리 후)

| # | 항목 | 내용 |
|---|---|---|
| D1 | #6 아포스트로피 1자 되돌리기 | `src/app/(en)/en/terms/page.tsx`의 `article&apos;s`를 `article&rsquo;s`로(위 §C 규칙, 리뷰 28 P3-1). 뜻·법적 효과 없는 표기 차이. 그 오더가 약관 문구를 바꾸므로 `src/lib/config.ts`의 `termsLastUpdated`도 함께 갱신 |
| D2 | 검증 도구 날짜 상수 | `termsLastUpdated`가 검증 도구 2종(`copy-exact-check.py`, `a11y-e2e.mjs`)에 고정값으로 들어 있다(리뷰 28 P3-3). D1 오더 때 도구가 상수를 읽게 바꾸는 것을 권장(선택) |

관련 about 단서 2건(#3·#4: "아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다." / "The handling standards below apply once the contact channel is finalized.")은 약관이 아니라 `/about`·`/en/about` 문구이며 sync §6에 있다.
