# 리뷰어 15 — 출처 재확인 로그 (요약 전용)

> 작성: 리뷰어 (Opus 5.5) · 2026-10-12. 조회 시각 UTC 2026-10-12T02:58Z~03:03Z (KST 11:58~12:03).
> 🔴 제3자 원문은 저장하지 않았다. 응답은 세션 임시 폴더에만 받았다가 삭제했고, 여기에는 상태 코드·바이트 수·항목 수·조항 짧은 인용만 남긴다.
> User-Agent: robots·RSS 조회는 `ihatekongsandang-review/0.1`, 약관 페이지는 `Mozilla/5.0 (ihatekongsandang-review)`. 출처당 1~4회.

## 1. robots.txt (13건 + 리다이렉트·비www 2건 = 15건 요청)

| 출처 | HTTP | 바이트 | 확인 내용 | 기획서와 일치 |
|---|---|---|---|---|
| jcs.mil.kr | 200 | 105 | `User-agent:*` `Disallow: /` + `Allow: /$`, `/medcmd/index.do`, `/afp/index.do`, `/cic/index.do` | 일치 |
| mnd.go.kr | 200 | 55 | `Disallow: /` + `Allow: /$`, `/mnd/index.do` | 일치 |
| unikorea.go.kr (www·비www 동일) | 200 | 188 | `Disallow: /web/minister/bbs/`, `/search/front/`, `/web/*/file/`, `/*?*`, `Crawl-delay: 5` | 일치 |
| nis.go.kr | 200 | 385 | Yeti·Googlebot·Googlebot-Image에만 일부 Allow, `User-agent: *` `Disallow: /` | 일치 |
| yna.co.kr | 200 | 5,332 | `User-agent: *` `Allow:/`, `/rss/`·`/northkorea/` 차단 규칙 없음. **추가 확인**: AI 에이전트 34종(GPTBot·ChatGPT-User·ClaudeBot·anthropic-ai·Claude-Web·PerplexityBot·Google-Extended 등) 개별 `Disallow: /` | 일반 허용은 일치. AI 봇 차단 목록은 기획서에 없음 |
| 38north.org | 200 | 173 | Yoast 블록 `User-agent: *` `Disallow:`(전면 허용) | 일치 |
| nknews.org | 200 | 132 | `/wp-admin/`·`/wp-includes/`·`/news_clipping/`·`/aggregator/`·`/*.pdf$`만 차단 | 일치 |
| rfa.org | 301 → 200 | 600 | `/arc/outboundfeeds/english/robots.txt`로 리다이렉트. 언어별 `/search/?query=`·`story_archive`만 차단 | 일치(리다이렉트는 기획서에 없음) |
| war.gov | 403 | 379 | 엣지 차단(Access Denied) | 일치 |
| defense.gov | 403 | 383 | 엣지 차단 | 일치 |
| usfk.mil | 403 | 380 | 엣지 차단 | 일치 |
| dvidshub.net | 502 | 932 | 오류 응답 | 일치(여전히 502) |
| kcnawatch.org | — | 0 | 이름 해석 실패(curl "Resolving timed out", Python `gethostbyname` errno 8). 같은 시점 www.yna.co.kr·example.com은 정상 해석 → 이 도메인만 해석 불가 | 일치. 원인(차단 여부)은 확인 필요 |

## 2. RSS (5건 요청 + 리다이렉트 추적 2건)

| 피드 | HTTP | 최종 URL | 바이트 | 항목 | 최신~최고 pubDate | description 최대 길이 |
|---|---|---|---|---|---|---|
| 통일부 `bbs_0000000000000164` | 200 | 동일 | 32,214 | 10 | 2026-10-02 ~ 2026-08-28 | 2,258자 |
| 연합뉴스 `/rss/northkorea.xml` | 200 | 동일 | 73,934 | 90 | 2026-10-12 11:47 KST ~ 2026-10-05 | 98자 |
| 38 North `/feed/` | 200 | 동일 | 140,305 | 8 | 2026-10-07 ~ 2026-09-21 | 430자 |
| RFA 한국어 `/korean/rss2.xml` | **301** → 200 | `/arc/outboundfeeds/korean/rss/` | 263,951 | 30 | 2026-10-11 ~ 2026-09-24 | 115자 |
| 미 국방부 RSS.ashx | **301** → 200 | `www.war.gov/DesktopModules/ArticleCS/RSS.ashx?...` | 10,352 | 10 | 2026-10-09 ~ 2026-10-06 | 285자 |

- 🔴 통일부 피드 채널 정보: `<title>주요소식</title>`, `<description>주요소식의 최신 글</description>`. 최근 10건 제목은 MOU 체결·기념행사·장관 면담·학술회의·간담회·포럼 등 부처 행사·동정이며 **보도자료 게시판이 아니다**.
- 🔴 연합뉴스 피드 채널 `<copyright>`: "저작권자(c) 연합뉴스, 무단 전재-재배포, AI 학습 및 활용 금지" (피드 자체에 포함).
- RFA·38 North·통일부·미 국방부 피드에는 `<copyright>` 요소 없음.

## 3. 약관·정책·API 페이지 (10건 요청)

| 페이지 | HTTP | 바이트 | 해당 조항(짧은 인용) |
|---|---|---|---|
| yna `/rss/index` | 200 | 86,684 | "연합뉴스는 비상업적 블로그와 개인적인 용도로만 연합뉴스 RSS 피드를 사용하는 것을 허용합니다." / "사전 서면 허가 없이 RSS 서비스를 상업적으로 이용하는 것을 금지합니다." |
| yna `/policy/copyright` | 200 | 51,468 | 4항 "사전 서면 허가 없이 연합뉴스 정보를 전자장치를 이용하여 저장 또는 배포할 수 없습니다." / 5항 "…영리 목적의 정보 재판매 서비스나 비영리 목적의 정보서비스를 할 수 없습니다." / 2항(계약 사용자) "인공지능(AI)의 학습이나 인공지능 서비스에 사용하는 등 허가된 목적 이외에…이용할 수 없습니다." |
| yna `/policy/ai-usage-guidelines` | 200 | 52,517 | 연합뉴스 기자·편집자용 내부 준칙(제3자 이용 조건 아님) — 판단 근거에서 제외 |
| yna 홈 | 200 | 187,199 | 정책 링크 위치 확인용(저작권·AI 활용 준칙·RSS 링크) |
| RFA terms (`/about/info/terms-of-use.html` → `/english/about/terms-of-use/`) | 200 | 123,963 | Permitted Purposes = "personal, non-commercial, general information and educational purposes" / RSS 절 "You may display, excerpt from, and link to RSS Feeds solely for the Permitted Purposes, provided that…" + "RFA News Headlines" 표기 / 금지 절 "use any robot, script, spider, or other automatic device… for any purpose, including monitoring or copying" / "Last Modified: September 13, 2023" — 기획서 인용과 일치 |
| NK News terms | 200 | 111,275 | "last updated on Thursday, January 29, 2026" / "may not be accessed, copied, scraped, indexed, aggregated, analyzed, summarized, transformed, or otherwise processed by: automated systems, bots, crawlers…" — 기획서 인용과 일치 |
| 38north.org `/terms-of-use/` | 404 | 43,371 | 약관 페이지 없음 → **확인 필요 유지** (기사 하단 저작권 표기 "Copyright © 2009-2026."만 확인, 기획자 저장 파일에서 확인 — 추가 요청 없음) |
| 38 North 운영 기관 약관 페이지 | 403 | 5,466 | 차단 → 확인 필요 |
| data.go.kr `15079284` (통일부 보도자료 조회 서비스) | 200 | 204,881 | 비용부과 "무료", 이용허락범위 "제한 없음", 업데이트 "실시간", 개발계정 트래픽 "10,000" — 기획서 확인 필요 8번(무료 여부)을 이 API에 한해 해소 |
| korea.kr 공지 `newsId=132038885` | 200 | 120,569 | 기획자 저장본에서 "중단일시: 2026. 7. 1.(수) … 중단사유: 콘텐츠 저작권 등 권리 보호에 따른 제공방식 변경" 확인, 라이브 페이지 200 확인 — 기획서와 일치 |

## 4. 키워드 사전 시뮬레이션 (요청 없음 — 2절 응답 재사용)

도구: `docs/tools/reviewer-15/keyword-sim.py` (기획서 §3.1 사전·제외어·공백 제거 부분 문자열·영문 단어 경계 그대로).

| 피드 | 항목 | 제목 매칭 | 요약에서만 매칭 | 제외어로 제거 | 제목 매칭 키워드 |
|---|---|---|---|---|---|
| 통일부 | 10 | **0** | 2 | 0 | — |
| 연합뉴스 | 90 | 19 | 20 | 0 | 미사일 10·DMZ 8·도발 4·공산당 1·해킹 1·북한군 1 (중복 계수) |
| 38 North | 8 | **0** | 0 | 0 | — |
| RFA 한국어 | 30 | **0** | 6 | 0 | — |
| 미 국방부(미채택) | 10 | 0 | 0 | 0 | — |

- 놓친 사례(제목 기준 요지): 38 North "핵 현상 유지의 위험", "드론 기지 확장 가능성", "핵 신호 속 미국 메시지 변화" / RFA "핵보유국 지위", "IT 노동자 조직 여성 공작원", "MDL 이남 지뢰 매설", "해외 파견자 망명 시도". 사전에 `nuclear`(단독)·`drone`·핵보유국·공작원·지뢰·MDL·망명이 없다.
- 오탐 사례: 연합뉴스 "中공산당, 축하 꽃바구니"(공산당), "국회 DMZ 출입 불승인"(DMZ — 안보 사안이긴 하나 정책 공방).

## 5. 클러스터 규칙 실측 (요청 없음)

- 제목 글자 2-그램 자카드: 연합뉴스×RFA 교차 최댓값 **0.286** → 임계값 0.5에서 다매체 묶음 0건.
- 연합뉴스 내부 4,005쌍 중 0.5 이상 12쌍(같은 기사의 "(종합)" 갱신본 등).

## 6. 게시물 출처 도메인 재현 (요청 없음)

- `content/posts/*.md` **182건**(슈퍼바이저 집계 181건 이후 업로더가 1건 추가 — `2026-10-04-rnwndhk-panmunjom-usb-lawsuit`, 커밋 db5b3c4).
- 등장 게시물 수: mnd.go.kr 0 · jcs.mil.kr 0 · unikorea.go.kr 0 · nis.go.kr 0 · defense.gov 0 · war.gov 0 · usfk.mil 0 · 38north.org 0 · rfa.org 0 · nknews.org 0 · yna.co.kr 0 · kcna 0 · **korea.kr 1**(`2026-09-28-solsol-mexico-17-agreements`, `type: 기타`) → 슈퍼바이저 실측 재현.
- `sources[].type` 전수: 언론 527 · **기타 13**(law.go.kr 5·instagram 2·korea.kr 1·justice.gov 1·youtube 1·music.apple.com 1·peoplepower21 1·lfind.kr 1).
- 참고: "연합뉴스" 표기 출처 중 4건이 포털 URL(m.news.nate.com 3·v.daum.net 1) — PRD §5.4 원 매체 URL 원칙과 어긋남(본 리뷰 범위 밖, 슈퍼바이저 참고).

## 7. 실행 환경 확인

- `/usr/bin/python3` = **Python 3.9.6**(Xcode 개발자 도구 경유). 표준 `urllib.request`로 HTTPS 조회 정상(200, 1.08초).
- `man launchd.plist`: `WorkingDirectory`는 선택 키("chdir(2) to this directory before running the job"), 미지정 시 기본값은 매뉴얼에 명시 없음. `StartInterval`은 "system is asleep… that interval will be missed".

## 8. 저장소 독립 grep

- 대상: 기획서·check-log·핸드오프·트리거 4건 + 원본 응답 21건. 패턴: 홈 디렉터리명·홈 절대경로 접두·사용자 계정 문자열·다른 서비스명 목록.
- 기획 문서 4건 **0건**. 원본 응답 10건에서 일치가 나왔으나 전부 제3자 페이지의 일반 단어(facebook·rulebook·quantitative·quantities·포털 메뉴 "전자책")로 위반 아님.
