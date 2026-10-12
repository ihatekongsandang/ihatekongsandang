# md오더: 리뷰어 (Opus 5.5) - 15-planner-07-security-feed-collector-spec

**작성일**: 2026-10-12 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 15

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·로그·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지(상대경로 또는 `$HOME/ihatekongsandang/...`).
- **대전제**: 추측 금지 · 실측 기반 · 전수 지시는 전수. 기획서의 확인 결과를 그대로 믿지 말고 핵심 항목은 직접 다시 확인한다. 확인 못 하면 "확인 필요".

## 선행 검토 문서 (Required)
- `CLAUDE.md`, `instructions/README.md`, `planning/prd.md` §5·§6(①②③)
- 오더: `instructions/planner/processed/07-security-feed-collector-spec.md`
- 산출물: `planning/security-feed-collector.md`, `docs/tools/planner-07/check-log.md`, `docs/tools/planner-07/*`(원본 응답 파일)
- 핸드오프·트리거: `docs/handoffs/planner-07-security-feed-collector-spec.md`, `docs/triggers/planner-07-security-feed-collector-spec-COMPLETE.md`
- `docs/handoffs/supervisor-2026-10-01-session-handoff.md` "세션 역할 분담"

## 임무 — 기획서 검증 (사용자 지시 6개 축 + 슈퍼바이저 추가 관찰)

### 1. 허용 출처 정합성 (PRD §6①)
- §1 (가)/(나) 분류가 PRD §6① 문언과 맞는지 출처별로 판정. "사용자 결정 필요"로 분류한 3건이 실제로 기획자가 정하면 안 되는 성격인지, 거꾸로 사용자 결정이 필요한데 기획자가 정해 버린 항목은 없는지(예: KCNA "명백" 판단, AI 요약 미사용 기본값, 로컬 전용 저장).
- 참고 실측(슈퍼바이저, 2026-10-12): 현재 게시물 181건의 본문에 `mnd.go.kr`·`jcs.mil.kr`·`unikorea.go.kr`·`nis.go.kr`·`defense.gov`·`war.gov`·`usfk.mil`·`38north.org`·`rfa.org`·`nknews.org`·`yna.co.kr`가 들어간 게시물은 0건, `korea.kr`은 1건. 재현하고 판단 근거로 쓸 것.

### 2. 약관·robots 위반 가능성
- §1 표의 robots·약관 판정을 **출처별로 직접 재확인**(조회는 출처당 몇 회 이내). 특히 연합뉴스 저작권 고지("AI 활용 금지" 등), RFA "Permitted Purposes", NK News 제외 근거, 통일부 Crawl-delay, 미 국방부 RSS를 "조건부"로 둔 판단.
- §2 요청 간격·하루 상한·재시도·자동 비활성화 규칙이 robots(Crawl-delay 등)와 충돌하지 않는지.

### 3. 저작권 (원문 복제 여부)
- §4 후보 형식에 원문 전문·발췌가 없는지. 매칭에 쓰는 RSS description을 저장하지 않는 설계인지(메모리에서만 쓰는지) 명확한지.
- 🔴 **슈퍼바이저 관찰**: `docs/tools/planner-07/`에 제3자 사이트의 원본 응답(전체 RSS·기사 HTML·검색 결과 페이지, 합계 약 2.9MB — 예: `nknews_rss.xml`, `nknews_article.html`, `rfa_rss.xml`, `datago_*.html`)이 저장돼 있다. 공개 레포에 커밋하면 제3자 저작물 재배포가 되고, NK News는 약관상 자동 수집·복제를 금지한다. **커밋 대상에서 무엇을 빼고 무엇을 남길지**(예: `check-log.md`의 확인 요약만 커밋, 원본 응답은 삭제 또는 로컬 보관) 판정하고 커밋 대상 목록에 반영할 것.

### 4. 날조 방지 장치
- AI 요약 미사용 기본값의 타당성. 쓰게 될 경우의 규칙(원문에 없는 내용 금지·URL 없거나 안 열리면 제외·사실/주장 구분·북한 측 주장 표기)이 구현 가능한 수준으로 구체적인지.
- 후보 → 게시 흐름(§8)에서 후보가 허용 출처 확인 없이 게시로 넘어갈 수 있는 틈이 없는지. 북한 관영 매체 표기 규칙이 PRD §6②와 맞는지.

### 5. 저장소 독립 원칙
- 기획서·로그·원본 응답 파일 전수 grep(홈 디렉터리명·다른 서비스명·계정). User-Agent 문자열, 환경변수 이름 설계 포함.
- 🔴 **슈퍼바이저 관찰**: §7 "실패 알림"이 예약 실행 스크립트가 `docs/triggers/`(git 추적 폴더)에 파일을 만드는 방식을 예로 든다. 업로더·슈퍼바이저가 같은 작업 폴더와 git 인덱스를 쓰는 환경에서 무인 스크립트가 추적 폴더에 쓰면 커밋 섞임이 생길 수 있다. 데이터·로그·알림 파일을 전부 `.gitignore` 대상 경로로 모아야 하는지 판정.

### 6. 실명·얼굴 규칙(PRD §6③) 영향
- 후보 제목(RSS 원문 그대로)에 비공인 실명이 들어가는 경우의 처리(비공개 로컬 보관이라 문제없는지, 보고 단계·초안 단계에서 §6③을 어디서 적용하는지).

### 7. 기타 설계 검토
- 선별 규칙(키워드·제외어·단어 경계·한국어 부분 문자열 매칭)의 오탐·누락 위험, 클러스터(바이그램 자카드 0.5)·우선순위 식의 계산 가능성.
- 채택 출처 4곳 중 (가)는 연합뉴스 1곳뿐이라는 점에서 수집기의 실효성 평가(정보 제공 — 사용자 결정 재료).
- launchd 예약 실행·Python 표준 라이브러리 구성이 "가벼운 단일 스크립트" 요구에 맞는지, 프로그래머에게 넘길 때 모호한 항목 목록.

## 산출물 (Required)
- `docs/reviews/planner-07-security-feed-collector-spec-review.md` — 판정(승인/조건부/반려) · 결함(P1/P2/P3) · 사용자 결정 필요 항목 최종 목록(기획서 3건 ± 리뷰어 추가) · **프로그래머 오더에 넣을 확정 조건** · 커밋 대상 최종 목록(포함/제외/삭제 권고)
- `docs/tools/reviewer-15/` — 재확인 명령·응답 요약 로그(🔴 제3자 원문 전체를 저장하지 말 것 — 상태 코드·해당 조항 인용·바이트 수 등 요약만)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-15-planner-07-security-feed-collector-spec-COMPLETE.md` **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 🔴 기획서·코드 수정, git add·commit·push 금지. 판정과 수정 지시만 리뷰에 적는다.
- 출처 재확인은 소량 조회만. 로그인·유료 가입·인증 입력 금지.
- `content/`·`public/`·`src/` 건드리지 않는다. 업로더가 같은 폴더에서 동시 작업 중이다.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 15-planner-07-security-feed-collector-spec`
- 판정 · 리뷰 경로 · 요약 3줄 · 출처 재확인 수(확인 N / 확인 필요 N) · 사용자 결정 필요 목록 · 프로그래머 확정 조건 · 커밋 대상
- 말미: `— 리뷰어 (Opus 5.5) · 15-planner-07-security-feed-collector-spec 종료 —`
