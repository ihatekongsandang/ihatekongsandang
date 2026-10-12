# 07 security-feed-collector 출처 확인 로그

> 확인 시각은 모두 UTC(2026-10-11 23:5x~2026-10-12 00:0x, KST 2026-10-12 08:5x~09:0x). 실제 curl 응답·검색 결과를 그대로 기록한다. 대량 요청 금지 원칙에 따라 출처별 2~3회 이내로 조회했다.

## 1. 합동참모본부 (jcs.mil.kr)
2026-10-11T23:56:33Z — robots.txt:
```
User-agent:*
Disallow: /
Allow: /$
Allow: /medcmd/index.do
Allow: /afp/index.do
Allow: /cic/index.do
```
- `/afp/index.do` 실제 열람(2026-10-12T00:03Z, HTTP 200) → `<title>국방출판지원단</title>` — 보도자료와 무관한 페이지. **보도자료 영역은 robots.txt상 Disallow: / 에 걸려 크롤링 불허로 확인.**
- RSS 추정 URL(`/rss.do`) → HTTP 404. 메인 페이지(`https://www.jcs.mil.kr/`, HTTP 200) `<head>`에 RSS `<link>` 태그 없음(grep 결과 0건) → **RSS 없음 확인**.

## 2. 국방부 (mnd.go.kr)
2026-10-11T23:56:41Z — robots.txt:
```
User-agent:*
Disallow: /
Allow: /$
Allow: /mnd/index.do
```
- 보도자료 영역은 robots.txt상 크롤링 불허로 확인.
- 자체 RSS(`/rss.do`) → HTTP 404. 메인 페이지(`https://www.mnd.go.kr/`, HTTP 200) `<head>`에 RSS 링크 없음 → **자체 RSS 없음 확인**.
- 정책브리핑(korea.kr) 경유 부처별 RSS가 과거 존재(`deptCode=A00005`가 국방부)했으나, korea.kr 공지(`https://www.korea.kr/etc/noticeView.do?newsId=132038885`, 2026-10-12 확인) 원문: "정책브리핑 RSS 서비스가 아래와 같이 제공 중단됩니다. ㅇ 중단일시: 2026. 7. 1.(수) ㅇ 중단대상: 정책브리핑 RSS 서비스 ㅇ 중단사유: 콘텐츠 저작권 등 권리 보호에 따른 제공방식 변경" → **2026-07-01부로 전면 폐지 확인**. 추정 URL `https://www.korea.kr/rss/dept_mnd.xml`도 HTTP 404로 재확인됨.
- data.go.kr "국방부 보도자료" Open API 존재 여부: 검색 결과·포털 검색 페이지(JS 렌더링으로 curl에서 본문 미노출)로는 확인 불가 → **확인 필요**.

## 3. 통일부 (unikorea.go.kr)
2026-10-11T23:56:41Z — robots.txt:
```
User-agent: *
Disallow:
Disallow: /web/minister/bbs/
Disallow: /search/front/
Disallow: /web/*/file/
Disallow: /*?*
Crawl-delay: 5
Sitemap: https://www.unikorea.go.kr/sitemap.xml
```
- 전반적으로 크롤링 허용(Crawl-delay 5초 준수 전제). `/web/minister/bbs/`(장관 동정 등)·검색·파일 경로만 제외.
- 자체 RSS 실제 동작 확인(2026-10-12T00:00Z): `https://unikorea.go.kr/web/unikorea/rss/bbs_0000000000000164` → HTTP 200, `application/xml`, 32,214 bytes, `<title>주요소식</title>` + 실제 기사 항목 확인됨.
- 공공데이터포털 Open API 실제 존재 확인(2026-10-12T00:00Z): `https://www.data.go.kr/data/15079284/openapi.do` → HTTP 200, `<title>통일부_통일부 보도자료 조회 서비스 | 공공데이터포털</title>`, "활용신청" 버튼 확인(이용 시 API 키 발급 필요).

## 4. 국가정보원 (nis.go.kr)
2026-10-11T23:56:41Z — robots.txt:
```
User-agent: Yeti
User-agent: Googlebot
User-agent: Googlebot-Image
Allow: /$
Allow: /CM
Allow: /AF
Allow: /ID
Disallow: /GD
(일부 Allow 경로 생략)

User-agent: *
Disallow: /
```
- **일반 자동화 클라이언트(`User-agent: *`)는 전체 차단으로 명시 확인.** 네이버(Yeti)·구글 등 지정된 검색엔진 봇에만 일부 경로 허용 — 이 프로젝트의 수집 스크립트는 이 예외에 해당하지 않음.
- RSS 추정 URL(`/rss.do`) → HTTP 404.
- data.go.kr "국가정보원 보도자료" Open API 존재 여부: 검색·포털 페이지(JS 렌더링)로 확인 불가 → **확인 필요**.

## 5. 미 국방부 — War Department / war.gov (舊 Department of Defense / defense.gov)
2026-10-11T23:59Z:
- `robots.txt` 직접 조회 시 Akamai WAF가 반환하는 "Access Denied"(HTTP 403, Edge reference 포함) — curl 요청 자체가 엣지 단계에서 차단됨. User-Agent를 바꿔 1회 더 시도해도 동일 → **robots.txt 내용 확인 불가(확인 필요)**.
- 반면 RSS 엔드포인트는 실제로 열림: `https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?max=10&ContentType=1&Site=945` → HTTP 200, `text/xml`, 10,352 bytes. 응답 내 `<title>Department of War News Feed</title>`, `<link>https://www.war.gov/News/News-Stories/</link>` — **2026년 현재 부처명이 "Department of War"(war.gov)로 변경되어 있음을 실측으로 확인**(기존 통념상 "Department of Defense/defense.gov"와 다름 — 추측이 아니라 RSS 응답 원문 기준).
- 이용약관(ToS)은 WAF 차단으로 열람 실패 → **확인 필요**.

## 6. 주한미군 (usfk.mil)
2026-10-11T23:59Z:
- 홈페이지(`https://www.usfk.mil/`)조차 curl 단순 요청에 **HTTP 403**(Akamai WAF, Edge reference 포함) — 단순 HTTP 클라이언트의 접근 자체가 차단됨. `robots.txt`도 동일하게 차단.
- 대안으로 미군 보도자료 공식 배포 채널인 DVIDS(`dvidshub.net`) 확인 시도 → `robots.txt` 요청이 HTTP 502(CloudFront 오류) — **확인 필요**(일시적 오류인지 여부 재확인 안 함, 대량 요청 금지 원칙상 1회만 재시도 후 보류).

## 7. 연합뉴스 북한 섹션 (yna.co.kr)
2026-10-12T00:00Z — robots.txt(발췌):
```
User-agent: *
Allow:/
Disallow: /*?*cp=
Disallow: /view/AEN* ... (외국어판 기사 코드 다수)
Disallow: /search/, /did/, /program/, /web/ 등
Disallow: /view/AKR2015... 등 개별 기사 다수(정정·삭제 건으로 추정)
Sitemap: https://www.yna.co.kr/news-sitemap3.xml 등
```
- 일반 크롤링은 기본 허용(`Allow:/`), 북한 섹션(`/northkorea/`)·`/rss/` 경로를 막는 규칙 없음.
- 자체 RSS 실제 동작 확인: `https://www.yna.co.kr/rss/northkorea.xml` → HTTP 200, `application/xml`, 68,962 bytes, `<title>연합뉴스 북한 최신기사</title>`.
- 별도 저작권 고지(검색 결과 인용, 2026-10-12 검색 확인) 원문: "연합뉴스 콘텐츠를 사전허가 없이 전재·방송하거나 무단으로 복사·배포·판매·전시·개작·AI 학습 및 활용할 경우 민·형사상 책임이 따를 수 있습니다." → **제목·URL·날짜만 비공개 내부 큐에 보관(본문 비저장, 재배포 아님)하는 이번 설계는 통상적인 RSS 소비 범위로 보이나, 완전한 법적 안전판이라고 확정할 근거는 없음 — 확인 필요(법률 자문 성격)**.

## 8. 38 North (38north.org)
2026-10-12T00:00Z — robots.txt:
```
# START YOAST BLOCK
User-agent: *
Disallow:
Sitemap: https://www.38north.org/sitemap_index.xml
# END YOAST BLOCK
```
- 전면 허용(워드프레스 Yoast 기본값, 제한 없음).
- RSS 실제 동작 확인: `https://www.38north.org/feed/` → HTTP 200, `application/rss+xml`, 140,305 bytes.
- 기사 1건 열람(`.../several-naval-construction-projects-underway/`, HTTP 200, 81,948 bytes) → `paywall`·`subscribe`·`members only` 류 문자열 0건 검출 → **유료벽 없음(무료)으로 확인**.
- `/about/` 페이지(2026-10-12 WebFetch 확인) 하단에 RSS 링크 존재, 크롤링·재사용을 명시적으로 금지하는 조항은 발견되지 않음(기본 저작권 표시만 있음) — 약관 전문 전체를 열람한 것은 아니므로 **잔여 확인 필요** 남김.

## 9. NK News (nknews.org)
2026-10-12T00:00Z — robots.txt:
```
User-agent: *
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /news_clipping/
Disallow: /aggregator/
Disallow: /*.pdf$
```
- robots.txt만 보면 일반 크롤링이 가능해 보이나(RSS 실제 동작 확인: `https://www.nknews.org/feed/` → HTTP 200, `application/rss+xml`, 360,132 bytes),
- **이용약관(`https://www.nknews.org/terms-and-conditions-nk-news-pro/`, 2026-10-12 WebFetch로 원문 확인)이 robots.txt보다 강한 금지를 명시**: "The Website, its Content, and any data derived therefrom may not be accessed, copied, scraped, indexed, aggregated, analyzed, summarized, transformed, or otherwise processed by: automated systems, bots, crawlers, scrapers, or similar technologies[...]" / AI·자동화 목적은 "a separate, express written license from NK Consulting, Inc." 필요 명시.
- 기사 1건 열람(2026-10-12, HTTP 200) 시 `nk-paywall` 플러그인·"NK Pro" 표기 확인 → **일부/전체 콘텐츠 유료(NK Pro)로 확인**.
- **결론: 약관상 자동 수집 전면 금지 + 유료벽 — robots.txt가 허용으로 보여도 채택 불가.**

## 10. RFA 한국어 (rfa.org/korean)
2026-10-12T00:01Z — robots.txt(발췌):
```
Sitemap: https://rfa.org/arc/outboundfeeds/english/sitemap/ 등
User-agent: *
Disallow: /korean/search/\?query=.* (외 각 언어판 검색 경로)
Disallow: /.*story_archive$
```
- 검색 경로·아카이브 페이지 외 일반 허용.
- 자체 RSS 실제 동작 확인: `https://www.rfa.org/korean/rss2.xml` → HTTP 200, `application/xml`, 263,951 bytes, `<title>RFA 자유아시아방송</title>`.
- 약관(`https://www.rfa.org/about/info/terms-of-use.html`, 2026-10-12 WebFetch 원문 확인):
  - RSS 명시적 허용: "You may display, excerpt from, and link to RSS Feeds solely for the Permitted Purposes, provided that[...]" — 의미 변경 금지, RFA 로고 또는 "RFA News Headlines" 텍스트 표기 조건.
  - 재배포 허용: "You may republish or distribute original RFA content...solely for the Permitted Purposes, on the condition...that you credit RFA" — 표기 문구: `Copyright © 1998-2023, RFA. Used with the permission of Radio Free Asia, 2025 M St. NW, Suite 300, Washington, D.C. 20036.`
  - 일반 자동수집 금지 조항도 별도 존재: "use any robot, script, spider, or other automatic device... to access the Website for any purpose, including monitoring or copying any of the material" — RSS 조항이 더 구체적 예외로 보이나, 두 조항이 같은 문서에 공존하므로 **해석 확인 필요**.
  - "Permitted Purposes" 정의(원문): "personal, non-commercial, general information and educational purposes" — **이 사이트가 '비상업적' 조건을 충족하는지는 사용자 결정 필요**(현재 PRD상 광고·수익화 계획 없음이지만 명시적 확정은 아님).
  - 상업적 사용은 `contentrequests@rfa.org` 별도 요청 필요.

## 11. 북한 관영 매체 — KCNA / KCNA Watch
2026-10-12T00:01Z:
- `kcna.kp`(북한 당국 직접 운영)는 시도하지 않음 — 북한 당국 서버에 직접 접속 시도는 보안·정책상 부적절하다고 판단해 접속하지 않았다(판단 사항, 추측 아님).
- `kcnawatch.org`(제3자 아카이브)는 이 환경에서 **DNS 해석 자체가 실패**(`nslookup`·`curl` 모두 타임아웃, 동일 네트워크에서 다른 도메인은 정상 해석됨 → 이 도메인만 해석 불가). robots.txt·RSS·약관 모두 **직접 확인 불가**.
- 웹검색(2026-10-12)으로는 kcnawatch.org가 실제 운영 중이며 북한 매체를 미러링하는 아카이브라는 설명만 확인됨(RSS 제공 여부는 검색 결과 요약에 간접 언급되었으나 1차 확인은 못 함). **robots.txt·ToS·RSS 정확한 URL 전부 확인 필요**로 남긴다 — 추정 URL을 기획서에 기재하지 않는다.
