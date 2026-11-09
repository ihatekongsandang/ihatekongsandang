# reviewer-52 — 전체 게시물 비공인 실명 전수 검사 + #6 인물 공인 판정 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10 · 실행: 하위 에이전트
- 오더: `instructions/reviewer/processed/52-nonpublic-name-audit.md`(이동)
- 선행 문서 직접 읽음: `CLAUDE.md`, `planning/prd.md` §6③(지위 앵커·확정 유죄 예외·사진 판정·15-1 명확화), `planning/card-image-policy.md` §3.1 공인 범위표·비공인 표, `docs/poster/guide.md` §2·§4·§4-1(특검 공인 선례 포함), `planning/q1-redirect-q2-sns-image-plan.md` §1(id 이전 절차·검증 a~h), 선례 `instructions/uploader/processed/02-post1-id-move.md`·`instructions/uploader/processed/16-sns-image-batch-14.md`·`docs/triggers/reviewer-51-uploader-16-sns-batch-14-review-COMPLETE.md`, `content/README.md` §3.3·실명 표기. 공수처법 제2조 1호는 법령 원문을 직접 조회했다(2026-10-02 시행본).
- 이 트리거·도구·도구 출력에는 비공인 실명(한글·로마자·성만 쓴 표기)을 쓰지 않았다. 인물은 `P번호 + 초성`, 파일은 경로로만 가리킨다. (나)·(다) 인물 이름이 id에 든 경로는 그 조각을 `…`로 가렸다. 이름이 든 중간 결과(판정표 원본·발견 위치 전체·기사 HTML)는 저장소 밖 임시 폴더에만 있다.
- 콘텐츠·코드·설정 수정 0, git add·commit·push·rm·checkout 0, 빌드 0. 만든 파일은 `docs/tools/reviewer-52/` 8개 + 이 트리거 + 오더 이동뿐이다.

## 한눈에

| 항목 | 결론 |
|---|---|
| **A. #6 인물** | **비공인.** 기사로 확인한 직위는 시민단체 대표(촛불행동)·전 대학 교수·사단법인(백서추진위) 이사장뿐이고 모두 §3.1 비공인 표(교수·시민단체 구성원)다. 공인의 친형이라는 관계는 공인 근거가 아니다. **단 PRD §6③ 확정 유죄 예외 요건(출처가 확정 판결을 보도)은 충족**한다 — 사용자 지시("비공인이면 이니셜")와 맞물리는 판단이라 슈퍼바이저 확인 1건을 남긴다(아래 A-3). id 이전은 어느 쪽이든 필요하다(guide §4는 id·파일명에 예외를 두지 않는다) |
| **B. 전수 검사** | **ko 209/209 · en 209/209 = 418/418 파일 검사.** 인물 219명(판정 단위 221) · 발견 2,697줄 · 이름이 나온 파일 365개. **(가) 131명 · 2,128줄 / (나) 53건 · 311줄 / (다) 37건 · 258줄** |
| **C. 문서 잔존** | 추적 파일 2,480개 중 `content/` 밖 2,058개(텍스트 1,471개 검사). 공익제보자 실명: **전체 한글 2파일·2줄, 로마자 1파일·1줄, 성만 쓴 표기 0**(1건은 다른 사건 인물 — 오탐). #6 인물: 한글 1파일, 로마자 1파일, **#6 id 문자열 13파일·21줄**. B (나) 이름이 남은 추적 파일 전체 목록은 C절 |

---

## A. #6 인물 판정 (`content/posts*/2026-09-12-peoplepower7-…-dp-card.md`, P046 ㄱㅁㅇ)

### A-1. 근거 — `sources[]` 3건을 직접 열람(저장소 밖에 받음, 3/3 HTTP 200)
| 출처 | 본문에 적힌 이 인물의 직위·사실 |
|---|---|
| 뉴시스 2024-10-15 (NISX20241015_0002920560) | 사진 설명 "○○○ 조국백서추진위 이사장", 본문 "○○○ **전 경희대 미래문명원 교수**에게 유죄가 확정됐다", "대법원 3부 … 성폭력처벌법 위반(비밀준수 등) … 징역 1년에 집행유예 2년을 선고한 원심을 확정" |
| 뉴데일리 2025-07-29 | 사진 설명 "○○○ **전국촛불행동 상임대표**", 본문 "김민석 국무총리의 친형 ○○○ **촛불행동 대표**" |
| MBC 2026-08-17 | 이 인물 언급 없음(당 대표 선출 기사) |

### A-2. 판정
- PRD §6③ 지위 앵커(선출직·고위공직자·정당 간부·공공기관장)와 정책 §3.1 공인 범위표 어디에도 해당하지 않는다. 시민단체 대표·교수는 §3.1 비공인 표에 명시돼 있다. 공직 경력은 기사에 없다(추정하지 않음). 공인의 가족이라는 사실만으로는 공인이 아니다(오더 기준, 정책 1a의 '대통령 배우자'처럼 명시된 경우만 예외).
- → **(나) 비공인.**

### A-3. 슈퍼바이저 확인 1건 — PRD 확정 유죄 예외
- PRD §6③ "출처가 유죄 판결의 확정을 보도한 경우에만 실명·얼굴 표기를 예외적으로 허용"에 대해 뉴시스가 확정을 보도했으므로 **본문 실명은 PRD상 허용 범위**다. 다만 ① 사용자 결정 배경은 "비공인이면 직함+이니셜", ② guide §4는 id·파일명에 비공인 실명을 예외 없이 금지, ③ 게시물의 다른 절반(2025년 SNS 반미 발언)은 확정 판결과 무관한 내용이다.
- **리뷰어 권고: 1안(이니셜 + id 이전).** 사용자 지시와 같고 #1·공익제보자 선례와도 같다. 2안(PRD 예외로 본문 실명 유지 + id만 이전)을 택하려면 사용자 확인이 필요하다.

### A-4. 가족 관계 표기가 신원을 특정하는가 — **특정한다**
- "민주당 대표(김민석)의 친형"은 사실상 한 사람을 가리킨다. 당 대표 이름을 빼고 "민주당 대표의 친형"으로 써도, 여기에 "촛불행동 대표"를 더하면 더욱 그렇다. 이니셜은 **형식적 보호**에 그친다.
- 그렇다고 관계를 지우면 게시물의 대상(카드의 주장 "대표 친형 … 이게 민주당 실체")과 팩트체크(실형 아님)가 성립하지 않는다. 관계는 공적 관심사의 핵심이고, 남는 식별 가능성은 위 확정 판결 보도(PRD 예외 근거)로 감당 가능한 수준이라고 본다.
- **권고: 관계는 유지하고 이름만 이니셜.** 단체명(촛불행동)은 기사 표현 그대로 두되, 더 낮추려면 "시민단체 대표"로만 쓰는 선택지가 있다(정보 손실 작음 — 슈퍼바이저 판단).

### A-5. 표기 위치 전체(현재 파일 기준 줄 번호)와 바꿀 문안
**ko** `content/posts/<옛 id>.md`
| 줄 | 필드 | 바꿀 문안(제안) |
|---|---|---|
| 2 | id | `2026-09-12-peoplepower7-civic-group-head-dp-card` |
| 3 | title | `"\"김민석 대표 친형 ㄱ씨, 성범죄 전과자·종북반미…이게 민주당 실체\" 카드 — 확정 판결은 성폭력처벌법상 '피해자 신상 공개'로 징역형 집행유예, '실형'은 아니다"` |
| 4 | description | `인스타그램 @peoplepower_korea7이 김민석 민주당 대표의 친형인 시민단체 대표 ㄱ씨의 이력을 나열하며 민주당을 '반국가세력'이라 비판함. ㄱ씨는 박원순 사건 피해자 신상 공개로 징역 1년·집행유예 2년이 확정됐으며, 카드의 '실형 선고'와 달리 집행유예인 것으로 보도됐습니다.` |
| 14 | sources[0].name | `뉴시스 — '박원순 피해자 신상 공개' 전 교수 ㄱ씨, 대법서 징역형 집유 확정` (#1 선례처럼 출처 제목의 이름 자리만 바꿈) |
| 36 | 본문 | "…친형 ○○○ 씨가" → "…친형 ㄱ씨가" |
| 38 | 본문 | "…이재명 대통령이 ○○○과 연대하는" → "…이재명 대통령이 ㄱ씨와 연대하는" |
| 42 | 본문 | "○○○ 촛불행동 대표는 그의 친형으로" → "촛불행동 대표 ㄱ씨는 그의 친형으로" |
| 43 | 본문 | "기소된 ○○○ 전 교수에게" → "기소된 ㄱ씨(전 교수)에게", 같은 줄 "(성) 씨는 2020년" → "ㄱ씨는 2020년" |
| 44 | 본문 | "(성) 씨는 2025년" → "ㄱ씨는 2025년" |
| 50 | 본문 | "(성) 씨의 발언·이력" → "ㄱ씨의 발언·이력" |
- 바꾸지 않는 곳: 18줄 sources[1].name(뉴데일리 제목 — 공인 이름과 관계만, 이 인물 이름 없음), 22줄(MBC), 27줄 태그 `김민석`(공인). `image` 블록 없음, `public/images/<옛 id>/` 없음(직접 확인 — 묶음 14에서 삭제됨).

**en** `content/posts-en/<옛 id>.md`
| 줄 | 필드 | 바꿀 문안(제안) |
|---|---|---|
| 2 | id | 새 id |
| 3 | title | `"Card: \"DP leader Kim Min-seok's brother K is a sex-crime convict and pro-North, anti-American — this is the Democratic Party's true face\" — his final conviction was a suspended prison sentence for disclosing a victim's identity, not a prison term"` |
| 13 | 본문 | "It says ○○○ (한글), the older brother of …" → "It says K, the older brother of Democratic Party leader Kim Min-seok (김민석), …" |
| 15 | 본문 | "working with (성) proves" → "working with K proves" |
| 19 | 본문 | "and ○○○, head of the civic group Candlelight Action" → "and K, head of the civic group Candlelight Action" |
| 20 | 본문 | "for former professor ○○○ on charges" → "for former professor K on charges" |
| 21 | 본문 | "In July 2025, (성) reportedly" → "In July 2025, K reportedly" |
| 27 | 본문 | "on the basis of (성)'s remarks" → "on the basis of K's remarks" |
- 4줄 description은 이 인물 이름이 없어 그대로(160자 이내 유지). 기존 "He"·"he" 대명사는 원래 있던 문장이라 그대로 둬도 되나, 02 오더 기준(새로 쓰는 문장에 성별 대명사 금지)에 맞추려면 업로더가 함께 정리한다(선택).
- ko 초성 ㄱ ↔ en K는 #1 선례(ㄱ씨 ↔ K)와 같은 원칙.

### A-6. 새 id와 확인 결과
- **제안 id: `2026-09-12-peoplepower7-civic-group-head-dp-card`** (47자, `ID_PATTERN` 만족, `content/posts`·`content/retired-ids.txt`에 같은 id 없음 — 직접 확인). 이름 로마자 대신 기사 직함("시민단체 대표")을 쓴 것(기획 16 §1.1 일반 규칙). 관계 낱말(brother 등)은 id에 넣지 않았다 — 주소창·공유 링크에서 식별 단서를 늘리지 않기 위해서다.
- **이 id를 참조하는 다른 파일**(git 추적, `content/` 밖 — 지난 측정 기록·이력): 13파일·21줄. `docs/tools/planner-16/sns-image-batches.tsv:136` · `docs/tools/programmer-11-1/share-check-output.txt:7` · `docs/tools/programmer-11/share-check-output.txt:7` · `docs/tools/programmer-14-1/aside-height-all.json:269,1925,3581,5237` · `docs/tools/reviewer-25/x-title-length-output.txt:5` · `docs/tools/reviewer-26-1/old-p11-share-check-now.txt:7,33,34` · `docs/tools/reviewer-26-1/share-check-rerun.txt:7` · `docs/tools/reviewer-26/share-check-rerun.txt:7` · `docs/tools/reviewer-26/x-truncation-audit-output.txt:9` · `docs/tools/reviewer-31-1/aside-focus-all-output.json:304,2167,4030,5893` · `docs/triggers/uploader-16-sns-image-batch-14-COMPLETE.md:18` · `history/2026-10-01.md:34` · `instructions/uploader/processed/16-sns-image-batch-14.md:14`. `content/` 안 내부 링크(`/post/<옛 id>`) **0건**, `src/`·`scripts/`·`public/`·`next.config.ts` 0건.
- 처리 권고: 기획 16 §1.8과 같은 기준 — 측정 기록·이력은 그 시점 기록이라 고치지 않는 것을 기본으로 하고, 고칠지 슈퍼바이저 판단. 옛 id 문자열은 `retired-ids.txt`·`moved-ids.txt`에 반드시 남는다(리다이렉트에 필요).

---

## B. 전수 검사 결과

### B-1. 방법(샘플 없음)
- `extract-names.mjs`: 418파일 전 줄에서 후보 25,315건(고유 1,280) — ① en `Romanized (한글)` 쌍 206개 ② ko 직함·호칭 앞뒤 낱말 ③ ②·①의 한글 사전으로 ko 전체 재검색 ④ en 한국식 로마자 이름 ⑤ id 조각 ⑥ attribution 괄호·"○○ 기자". 여기에 ko 3글자 성씨 시작 낱말 전체(성씨 2벌, 1,675 + 1,037개)와 en 대문자 연속어 전체를 눈으로 훑어 외국인·짝 표기 없는 이름을 더했다.
- 판정표 219명(같은 이름 다른 사람·다른 직위 2건은 파일별 예외)을 만들고 `audit-names.mjs`로 418파일 전 줄(frontmatter 전 필드 + 본문)과 id·파일명에서 다시 찾았다. 2글자 이름·낱말과 겹치는 이름은 문맥 정규식으로 좁혔다(오탐 3종 제거 확인).
- 직위는 게시물 문장에 적힌 것을 쓰고, **군인은 계급을 기사로 확인한 경우만 장성급(가)** 으로 했다. `fetch-sources.mjs`·직접 curl로 군·공무원이 나온 게시물 14개의 출처 43건을 저장소 밖에 받아 해당 인물 줄을 읽었다: 전 1공수여단장(준장)·전 방첩수사단장(준장)·전 조사본부장(소장)(주간경향·머니투데이·중앙일보), 합참 차장(중장)·작전부장(소장)(오마이뉴스·경향), 작전1처장(준장)(문화일보), 1군단장(중장)(뉴데일리), 법무장관 직무대행(차관)(근거 기사 본문). 계급이 기사에 없는 4명은 (다).
- 언론사·기자 바이라인: ko·en 본문·출처·이미지 크레딧에 사람 이름 바이라인 **0**(creditName은 모두 매체·기관명). 칼럼 연재명에 든 필자 이름 2건과 논설위원 1건은 (나) N3.
- 계정 핸들(`@…`)은 계정이므로 허용. attribution 괄호의 **표시 이름**이 사람 이름 꼴인 4건은 (다) D6으로 따로 뒀다(공인 계정의 표시 이름은 (가)로 셈).

### B-2. (가) 공인 — 131명 · 2,128줄 (직위 분류만)
| 분류 | 명 | 줄 |
|---|---|---|
| G1 국회의원(현·전) | 57 | 708 |
| G2 광역·기초 단체장·지방의원 | 9 | 63 |
| G3 대통령(현·전, 역사 포함) | 10 | 547 |
| G4 총리·장관·차관·안보실·국정원·대통령실(3급 이상)·감사원·대사·정무직 위원장 | 22 | 304 |
| G5 판사·검사·특별검사 | 7 | 82 |
| G6 장성급(기사로 계급 확인) | 7 | 27 |
| G7 정당 대표·최고위원·원내대표 | 7 | 123 |
| G8 공공기관장 | 1 | 9 |
| G9 대통령 배우자(1a) | 2 | 52 |
| G10 북한 지도자(1a) | 3 | 116 |
| G11 외국 정상·정부 수반(1a) | 6 | 97 |

### B-3. (나) 비공인 53건 · (다) 확인 불가 37건 — 분류와 권장 조치
전 위치(파일:줄·필드)는 맨 아래 **부록**(도구 출력 그대로). 아래는 분류별 요약과 권장 조치다.

| 분류 | 건 | 대상(P번호 초성) | 판정 근거 | 권장 조치 |
|---|---|---|---|---|
| **N1 사건 당사자·피해자·가족·대령 이하 군인** | 15 | P046 ㄱㅁㅇ(=A), P020 ㅇㅎㅇ, P181 ㅈㅁㄹ, P050 ㅇㅈㅅ, P051 ㅂㅇㅂ, P055 ㅈㅎㅅ, P089 ㅊㅅㄱ, P107 ㅈㅈㅅ, P199 ㄷㅇㅂㄷㅇ, P144 ㅇㄷㄱ, P145 ㄴㅇ, P146 ㅂㄱㅎ, P147 ㄱㅇ, P148 ㄱㅁㅂ, P172 ㅇㅅㅁ | 공적 지위 없음(§3.1 비공인 표·PRD 앵커 밖). 부지사(P020)·중령(P172)은 비공인 표 명시. P181은 실종 사건 당사자로 보도된 인물, P089는 순직 해병(사건 피해자) | **직함+이니셜(ko 초성씨·en 영문 이니셜)로 전환.** 제목·설명에 실명이 있는 P051·P144·P145·P146·P172·P046을 먼저. 출처 `name`(기사 제목)의 이름은 #1 선례처럼 이름 자리만 직함·이니셜로. P020은 확정 보도가 있는 게시물(`2026-10-09-gotdemcatch-…`)은 PRD 예외 가능하나 다른 게시물과 표기를 맞추려면 둘 다 이니셜 권고. P089는 ko가 이미 "채상병 사건"(성+계급)으로 쓰므로 en 제목·본문의 전체 이름을 ko와 같은 수준으로 맞추고, id 조각(성)은 슈퍼바이저 판단 |
| **N1S 성만 쓴 표기** | 3 | P217 ㅅ, P218 ㄱㅁ, P219 ㅇㅁ | 간첩 사건 피고인·무죄 확정자(전 노조 간부). "○모 씨"·"○씨" 형태 — 이니셜 규칙과 다름. P217은 희귀 성이라 식별이 쉽다. **P219는 무죄 확정 보도 인물** | 초성씨·영문 이니셜로(P219 우선). P217·P218은 출처가 확정을 보도한 게시물에서만 PRD 예외 가능 — 표기 일관성 위해 이니셜 권고 |
| **N2 공개 활동 비공인**(변호사·교수·작가·목사·유튜버·당 대변인(비의원)·일반직 공무원·활동가·체육단체 임원) | 15 | P034, P054, P057, P084, P087, P111, P204, P205, P130, P132, P133, P155, P156, P168, P013(같은 이름의 다른 사람 — 선수단장) | §3.1 비공인 표(교수·당원·종교인 등) 또는 공수처법 목록 밖 | 현행 규칙대로면 직함+이니셜. 다만 P054·P084는 `speaker`(발언 당사자)이고 **id에 이름이 있는 건 3명 4건**(P054·P084×2·P087)이다. 이 집단은 본인이 실명으로 공개 발언한 인물이 많아 "공개 발언자" 예외를 둘지 **사용자 결정 사항**으로 올리기를 권고. 결정 전 기본값은 이니셜 + id 이전 |
| **N3 작품·저작물 크레딧**(가수·감독·배우·책 저자·칼럼 필자·라디오 진행자) | 9 | P214(id에 활동명), P183, P200, P184, P116, P143, P186, P187, P188 | §3.1 비공인 표(배우·칼럼 필자) | 위험 낮음(공개 저작물 크레딧). 규칙 문언상 비공인이므로 **크레딧 예외 신설 여부를 사용자에게** 올리기를 권고. P214는 id·제목에 있음. 출처 제목 속 연재명(P184·P188)은 연재명 괄호만 빼도 출처 식별에 지장 없음 |
| **N4 외국 공직자(정상 외)·수사 대상 외국 전직** | 11 | P203, P194(id·제목), P202, P195, P198, P201, P207, P197, P196(제목), P169, P170 | 정책 §3.1 비공인 표 "외국 현직 공직자(정상 외)"·"수사 대상 외국 전직 제외" | P194(피고발·출국정지 보도)·P196(간첩 혐의 체포 보도)은 **수사 대상이라 이니셜 권고**(P194는 id 이전 대상). 나머지 9명(미 국무·상무장관, 의원, 사령관, 대만·우크라이나 관료)은 §3.1 표가 사진 판정용으로 쓰인 것인지 본문에도 미치는지 **정책 해석이 필요** — 본문 실명까지 막으면 외교·안보 보도 요약이 성립하지 않는다. 사용자 결정 권고 |
| D1 계급 미확인 군인 | 4 | P033, P077, P123, P135 | 직위만 있고 기사에 계급 없음(guide §4-1: 직위만으로 장성급 인정 보류) | 다른 기사로 계급 확인 → 장성급이면 (가), 아니면 이니셜. P123(합참의장)은 법령상 장성 직위라 정책 보완 대상 |
| D2 후보자·전 후보 | 6 | P026, P052, P062, P069(id), P080(id·speaker), P086 | 인사청문 후보자·선거 후보로만 기재 | 임명·현 직위를 보도로 확인해 문장에 넣으면 (가). 못 넣으면 이니셜 |
| D3 직위 미기재·앵커 경계 | 12 | P215, P216, P182, P039, P075, P091, P105(id·제목), P110, P121, P158, P171, P160 | 당 대변인(의원 여부 미기재), 위원회 위원장, 비대위원장, 해양경찰청장(공수처법 하목 해당 여부), 경찰청장 직무대행(계급 미기재), 표시 이름으로만 나오는 인물 | 보도로 직위 확인 후 문장 보강 → (가) 또는 이니셜 |
| D4 북한 인사(지도자 외) | 5 | P024, P059, P165, P166, P167 | 정책 1a "북한 지도자" 범위 해석 필요 | 범위 결정(사용자) 전 유지 |
| D5 역사 인물·사건명 | 6 | P180, P041(id·제목), P088, P113, P189, P206 | 정책에 본문 기준 없음 | 유지 권고(정책에 '역사 인물 본문 표기' 한 줄 보완) |
| D6 계정 표시 이름(사람 이름 꼴) | 4 | P178(+speaker), P176, P175, P177 | 핸들은 허용 규칙이나 괄호 표시 이름이 실명인지 확인 불가 | attribution 괄호를 빼고 핸들만 두는 것을 권고(speaker도 핸들로). P177은 채널명이라 유지 가능 |

> 판정표 원본(이름 포함)은 저장소 밖에 있다. 이름을 가린 판정표 `docs/tools/reviewer-52/judgement-table-masked.tsv`에 221줄 전부(P번호·초성·판정·분류·근거)를 남겼다.

---

## C. 문서 잔존 (`git ls-files` 기준 `content/` 밖)

**공익제보자(ㅈ ↔ C)**
| 형태 | 위치 |
|---|---|
| 전체(한글) | `docs/handoffs/translator-02-english-batch-2-opus.md:118` · `docs/tools/designer-04-B/data.json:1292` |
| 전체(로마자) | `docs/handoffs/translator-02-english-batch-2-opus.md:118` |
| 성만(한글·로마자) | **0**. (`docs/tools/reviewer-19/gnews-output.txt:4`가 걸렸으나 다른 사건의 다른 제보자 — 오탐) |
| 참고(파일 밖) | git 커밋 제목 1건에 전체 이름(이력 — 파일 수정으로 지울 수 없음) |

**#6 인물(P046)**: 한글 `history/2026-10-01.md:34` · 로마자 `docs/tools/reviewer-26/x-truncation-audit-output.txt:10` · id 문자열 13파일·21줄(A-6 목록). 참고: git 커밋 제목 1건.

**B (나) 인물 이름이 남은 추적 파일**(도구 출력 `residual-scan-output.txt` 전문)
- N1: P020 — `docs/handoffs/translator-02-english-batch-2-opus.md:131` · `docs/supervisor/drafts/2026-09-28-held-recheck.md:406` · `docs/tools/reviewer-30/gen.py:115` · `docs/tools/reviewer-30/image-recheck.tsv:96` / P050 — `translator-02…:131`(로마자 포함) · `docs/supervisor/drafts/2026-09-28-held-recheck.md:59,304` / P051 — `translator-02…:132` · `docs/tools/reviewer-24/forbidden-terms-output.txt:6,7,8` / P055 — `translator-02…:25,133` / P089 — `docs/handoffs/translator-01-english-batch-1.md:110` / P107 — `translator-01…:128` · `docs/triggers/supervisor-2026-10-01-anticom-supervisor-ACK-COMPLETE.md:22` / P199 — `translator-01…:138` / P144 — `docs/tools/reviewer-24/forbidden-terms-output.txt:45,47` / P145 — `reviewer-24/forbidden-terms-output.txt:45,46,47,48` / P146 — `docs/tools/reviewer-30/gen.py:96` · `reviewer-30/image-recheck.tsv:77` · `reviewer-30/post-recheck.tsv:31` / **P172 — `design/v0.3-responsive/{A1,A2,A3,B1,B2,B3,C1,C2,C3,final}/mockup.html` 10파일(한글·로마자) · `docs/tools/designer-04-A/content.mjs:28,43` · `docs/tools/designer-04-B/data.json:17,1504` · `reviewer-24/forbidden-terms-output.txt:56,58,59,62`**
- N2: P034 — `translator-02…:133` / P054 — `translator-02…:25,129` · `designer-04-B/data.json:1320` · `reviewer-24/forbidden-terms-output.txt:67,68` / P057 — `translator-02…:126` / P084 — `translator-02…:26,43` · `docs/supervisor/drafts/2026-09-28-held-recheck.md:544` · `docs/tools/reviewer-48/batch11-check-output.txt:37,38,40,41` · `docs/tools/translator-02/review-notes.tsv:9` / P087 — `designer-04-B/data.json:1184` / P111 — `translator-01…:132` / P132 — `reviewer-30/image-recheck.tsv:44` / P133 — `drafts/2026-09-28-held-recheck.md:144` / P155 — `drafts/2026-09-28-held-recheck.md:341`
- N3: P214 — `translator-02…:136` / P116 — `translator-01…:133`
- N4: P194 — `docs/reviews/card-image-policy-legal-review.md:187` · `reviewer-24/forbidden-terms-output.txt:88,98` · `reviewer-30/gen.py:53` · `reviewer-30/image-recheck.tsv:32` · `reviewer-26/x-truncation-audit-output.txt:25` / P196 — `card-image-policy-legal-review.md:188` · `docs/tools/reviewer-14/results/` 로그 6개 1줄씩(커밋 제목이 찍힌 줄) · `reviewer-30/gen.py:138` · `reviewer-30/image-recheck.tsv:121` · `reviewer-30/post-recheck.tsv:49` / P202 — `reviewer-30/image-recheck.tsv:36` / P169 — `reviewer-30/image-recheck.tsv:131`
- 처리 권고: 오더 지정 2파일(공익제보자)은 지운다. 나머지는 대부분 그 시점의 측정 기록·이력이라, 기획 16 §1.8 기준으로 **콘텐츠 결정(B 이니셜 전환)이 확정된 인물만** 같은 정리 오더에 넣는 것을 권고. `design/v0.3-responsive/` 시안 10개는 실제 게시물 제목을 샘플로 넣은 것이라 P172 이니셜 전환 시 함께 고치는 편이 낫다(시안이 공개 저장소에 그대로 남음).

---

## 업로더 수정 오더에 옮길 작업 목록

**확정 작업(사용자 결정 배경 그대로 — A 1안 기준)**
1. #6 id 이전: `content/README.md` §6-1 절차 1~5. 새 id `2026-09-12-peoplepower7-civic-group-head-dp-card`. ko·en 파일 이름 변경 + frontmatter `id` 2곳, `retired-ids.txt`·`moved-ids.txt` 각 한 줄, `content/` 전체 옛 id 0건 확인(현재 링크 0건), 이미지 폴더 없음(확인됨).
2. #6 문구: A-5 표의 ko 9줄(3·4·14·36·38·42·43·44·50), en 7줄(3·13·15·19·20·21·27) 그대로. `updatedAt`·갱신 이력은 #1 선례(갱신 + "표기 정정" 한 줄)와 묶음 14 공익제보자(둘 다 안 함)가 엇갈리므로 슈퍼바이저가 한쪽으로 정해 오더에 적는다.
3. 공익제보자 실명 삭제: `docs/handoffs/translator-02-english-batch-2-opus.md:118`(한글·로마자), `docs/tools/designer-04-B/data.json:1292` — 이니셜(ㅈ/C)로 바꾸거나 해당 문자열 삭제. 이후 같은 grep 0건 확인.
4. 검증: `npm run validate:content` 통과(빌드는 게이트에서). 바뀐 경로 `git status`로 트리거에 기록. 트리거·오더에 실명·옛 id 문자열을 쓰지 않는다(두 txt 외).

**사용자·슈퍼바이저 결정 후 작업(결정 전에는 손대지 않음)**
5. A 2안 채택 여부(PRD 확정 유죄 예외로 본문 실명 유지) — 채택 시 2번은 생략, 1번만.
6. N1·N1S 이니셜 전환(15+3건, 위 표 순서). 출처 `name` 속 이름은 이름 자리만 바꿈. P089 en 표기를 ko 수준으로.
7. N2 "공개 발언자" 예외 여부 → 아니면 직함+이니셜 + id 이전 3명 4건(P054·P084×2·P087).
8. N3 크레딧 예외 여부(P214 id 포함).
9. N4 외국 공직자 본문 표기 해석 — P194(id 이전)·P196은 해석과 무관하게 이니셜 권고.
10. (다) 37건 직위 확인: D1 계급(기사 추가 열람), D2 임명·현직, D3 의원 여부·앵커 해당 여부 → 확인되면 문장에 직위를 넣어 (가)로, 아니면 이니셜. D4·D5는 정책 보완 후. D6은 attribution 괄호의 사람 이름 꼴 표시 이름 삭제(핸들만).
11. C 잔존 정리(결정된 인물만): 위 C 목록. `design/v0.3-responsive/` 시안 10개는 P172 결정과 같이.

## 도구 (`docs/tools/reviewer-52/`, 모두 .mjs — tsc 대상 아님)
| 파일 | 내용 |
|---|---|
| `extract-names.mjs` · `extract-names-output.txt` | 후보 추출(6가지 방법). 이름 든 결과는 인자로 준 저장소 밖 폴더에만 씀. 출력은 파일 수·건수만 |
| `audit-names.mjs` · `audit-names-output.txt` | 판정표(저장소 밖 TSV)로 418파일 전 줄·id를 다시 찾아 (가) 분류별 건수, (나)·(다) 파일:줄·필드를 이름 없이 출력. (나)·(다) 이름이 든 id 조각은 `…`로 가림 |
| `fetch-sources.mjs` | 게시물 `sources[]` 기사를 저장소 밖에 받고 낱말 주변 글을 표준 출력(저장하지 않음 — 이름이 섞임) |
| `residual-scan.mjs` · `residual-scan-output.txt` | C: `git ls-files`의 `content/` 밖 텍스트 파일에서 낱말 TSV·판정표 (나) 이름을 찾아 P번호·파일:줄만 출력 |
| `judgement-table-masked.tsv` | 판정표 이름 가림본(221줄: P번호·초성·판정·분류·근거) |

## 수치
- 검사 파일 **418/418**(ko 209 · en 209). 후보 발생 25,315건 · 고유 1,280 · en 이름 쌍 206(그중 단체·매체 29 제외 = 인물 177, 모두 판정표에 있음 — 대조 0 누락).
- 판정표 219명 → 발견 2,697줄 · 365파일. (가) 131명 2,128줄 · **(나) 53건 311줄 · (다) 37건 258줄**.
- 기사 직접 열람: #6 3건(3/3 HTTP 200) + 군·공무원 직위 확인용 14개 게시물 출처 43건(인물 줄 확인한 기사만 근거로 씀).
- C: 추적 2,480 · `content/` 밖 2,058 · 텍스트 검사 1,471.
- 산출물 이름 검사: 판정표의 비공인 이름·로마자 전부와 공익제보자 이름으로 이 도구 폴더 8개와 이 트리거를 대조 — **비공인 이름 0**(공인 이름 2개는 오탐 거름 정규식 안에만). 홈 절대경로 0.

## 한계(정직 표기)
- 이름 후보는 6가지 방법의 합집합과 눈 검토로 모았다. **직함 없이 단독으로 나오고, 영어본에도 `Romanized (한글)` 표기가 없는 2글자 이름**은 놓쳤을 수 있다(3글자는 성씨 시작 낱말 전체를 훑었다).
- (가) 판정의 직위는 게시물 문장(기사 요약)을 근거로 했고, 군인 계급만 기사를 따로 열었다. 국회의원 등 문장에 직위가 적힌 인물은 기사 재열람을 하지 않았다.

---

## 부록 — (나)·(다) 전 위치 (`audit-names-output.txt`의 해당 절 그대로)

```
## (나) — 53건(인물·판정 단위) · 311줄
- [N1] P020 ㅇㅎㅇ — 전 경기도 평화부지사(부지사는 비공인 표). 대북송금 사건 피고인 — 대법원 확정 보도가 출처에 있는 게시물은 PRD §6③ 확정 유죄 예외 해당 가능
    content/posts/2026-08-12-citynewsmeme-parksangyong-oath-refusal.md: 44(body)
    content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md: 39(sources.name), 62(body)
    content/posts-en/2026-08-12-citynewsmeme-parksangyong-oath-refusal.md: 21(body)
    content/posts-en/2026-10-09-gotdemcatch-lee-five-trials-suspended.md: 25(body)
- [N1] P181 ㅈㅁㄹ — 실종 사건 당사자(피해자로 보도)로 보이는 인물 — 출처 제목 2건에 실명
    content/posts/2026-08-24-dictatorshipnono-jeju-missing-false-closure.md: 14(sources.name), 18(sources.name)
- [N1] P046 ㄱㅁㅇ — A 판정 참조(시민단체 대표·전 교수 — 비공인, 확정 유죄 보도 있음)
    content/posts/2026-09-12-peoplepower7-…-dp-card.md: 3(title), 4(description), 14(sources.name), 36(body), 38(body), 42(body), 43(body), id(id·파일명)
    content/posts-en/2026-09-12-peoplepower7-…-dp-card.md: 3(title), 13(body), 19(body), 20(body), id(id·파일명)
- [N1] P050 ㅇㅈㅅ — 대통령의 친형(고인) — 공적 지위 없음, 가족
    content/posts/2026-09-13-geonwoo-brother-hospitalization-case.md: 47(body), 55(body)
    content/posts-en/2026-09-13-geonwoo-brother-hospitalization-case.md: 12(body), 20(body)
- [N1] P051 ㅂㅇㅂ — 대통령의 형수 — 공적 지위 없음, 가족. 제목·설명에 실명
    content/posts/2026-09-13-geonwoo-brother-hospitalization-case.md: 3(title), 4(description), 51(body), 55(body), 56(body)
    content/posts-en/2026-09-13-geonwoo-brother-hospitalization-case.md: 3(title), 4(description), 16(body), 20(body), 21(body)
- [N1] P055 ㅈㅎㅅ — 전 도지사 비서실장(고인) — 공수처법 목록 밖
    content/posts/2026-09-13-geonwoo-…-2023-remark.md: 33(body)
    content/posts-en/2026-09-13-geonwoo-…-2023-remark.md: 14(body)
- [N1] P089 ㅊㅅㄱ — 순직 해병(사건 피해자, 대령 이하 군인) — 출처 제목 인용·id 조각(성)
    content/posts/2026-09-26-nonjeomjikjin-dmz-…-standard.md: 29(sources.name), id(id·파일명)
    content/posts-en/2026-09-26-nonjeomjikjin-dmz-…-standard.md: 3(title), 14(body), 22(body), id(id·파일명)
- [N1] P107 ㅈㅈㅅ — 전 정당 정무조정실장(당헌 간부 앵커 밖)·대장동 녹취 속 인물
    content/posts/2026-09-28-…-chief-justice-audit-witness.md: 42(body)
    content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md: 41(body)
    content/posts-en/2026-09-28-…-chief-justice-audit-witness.md: 19(body)
    content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md: 21(body)
- [N1] P199 ㄷㅇㅂㄷㅇ — 외국 기업인 — 진술서 속 행위 주장(의혹) 당사자
    content/posts/2026-09-29-shindawit-cxmt-samsung-threat.md: 38(body)
    content/posts-en/2026-09-29-shindawit-cxmt-samsung-threat.md: 19(body)
- [N1] P144 ㅇㄷㄱ — 전 성남도시개발공사 본부장·대장동 피고인 — 제목·설명에 실명
    content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md: 3(title), 4(description), 12(image.alt), 18(sources.name), 22(sources.name), 35(body), 40(body), 42(body)
    content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md: 3(title), 5(imageAlt), 15(body)
- [N1] P145 ㄴㅇ — 변호사·대장동 피고인 — 제목·설명에 실명
    content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md: 3(title), 4(description), 12(image.alt), 18(sources.name), 22(sources.name), 35(body), 40(body)
    content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md: 3(title), 5(imageAlt), 15(body)
- [N1] P146 ㅂㄱㅎ — 유튜버·전 권리당원(비공인) — 제목·설명에 실명
    content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md: 3(title), 4(description), 12(image.alt), 40(body)
    content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md: 3(title), 5(imageAlt), 20(body)
- [N1] P147 ㄱㅇ — 대장동 녹취 속 인물(직위 본문 미기재)
    content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md: 41(body)
    content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md: 21(body)
- [N1] P148 ㄱㅁㅂ — 대장동 사건 인물(직위 없음)
    content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md: 41(body)
    content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md: 21(body)
- [N1] P172 ㅇㅅㅁ — 중령(대령 이하 군인 — 비공인 표) — 제목·설명·출처 제목에 실명
    content/posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md: 3(title), 4(description), 15(image.alt), 25(sources.name), 43(body)
    content/posts-en/2026-11-04-leejinsook-martial-law-soldiers-presser.md: 3(title), 4(description), 5(imageAlt), 21(body)
- [N1S] P217 ㅅ — 성만 쓴 표기('○모 씨'·'○씨' 형태) — 간첩 사건 피고인(전 노조 간부). 확정 보도 게시물은 PRD 예외 가능
    content/posts/2026-07-05-idontknowpolitics-kctu-appeal.md: 35(body)
    content/posts/2026-07-19-amhaengeosa-kctu-itaewon-directive.md: 36(body), 37(body), 38(body)
    content/posts/2026-09-24-hagonolza-kctu-itaewon-claim.md: 36(body), 38(body)
    content/posts/2026-09-28-firstincome-kctu-spy-case-summary.md: 4(description), 44(body), 47(body), 58(body)
    content/posts-en/2026-07-05-idontknowpolitics-kctu-appeal.md: 13(body)
    content/posts-en/2026-07-19-amhaengeosa-kctu-itaewon-directive.md: 13(body), 14(body), 15(body)
    content/posts-en/2026-09-24-hagonolza-kctu-itaewon-claim.md: 13(body), 15(body)
    content/posts-en/2026-09-28-firstincome-kctu-spy-case-summary.md: 4(description), 13(body), 16(body), 27(body)
- [N1S] P218 ㄱㅁ — 성만 쓴 표기('○모 씨' 형태) — 같은 사건 피고인(징역 3년 확정 보도)
    content/posts/2026-09-28-firstincome-kctu-spy-case-summary.md: 47(body)
    content/posts-en/2026-09-28-firstincome-kctu-spy-case-summary.md: 16(body)
- [N1S] P219 ㅇㅁ — 성만 쓴 표기('○모 씨' 형태) — 같은 사건 무죄 확정 보도 인물
    content/posts/2026-09-28-firstincome-kctu-spy-case-summary.md: 47(body)
    content/posts-en/2026-09-28-firstincome-kctu-spy-case-summary.md: 16(body)
- [N2] P034 ㅊㅇㅈ — 대학 교수(비공인 표)
    content/posts/2026-09-10-ansanheart-academy-merger.md: 44(body)
    content/posts-en/2026-09-10-ansanheart-academy-merger.md: 24(body)
- [N2] P054 ㅈㅈㄱ — 대학 특임교수(비공인 표) — speaker·id에도 있음
    content/posts/2026-09-13-geonwoo-…-2023-remark.md: 3(title), 4(description), 10(speaker.name), 17(sources.name), 21(sources.name), 25(tags), 33(body), id(id·파일명)
    content/posts-en/2026-09-13-geonwoo-…-2023-remark.md: 3(title), 4(description), 14(body), id(id·파일명)
- [N2] P057 ㅇㅁㅎ — 통일부 대변인(공무원 — 정무직 아님, 공수처법 목록 밖)
    content/posts/2026-09-13-idontknowpolitics-kangdong-hospital.md: 49(body)
    content/posts-en/2026-09-13-idontknowpolitics-kangdong-hospital.md: 14(body)
- [N2] P013 ㅇㅅㅎ — 대한체육회 선수단장(체육단체 임원, 공적 지위 없음 — 이름 불필요)
    content/posts/2026-09-18-shindawit-asiangames-nk-anthem.md: 47(body)
    content/posts-en/2026-09-18-shindawit-asiangames-nk-anthem.md: 17(body)
- [N2] P084 ㄱㄱㄹ — 변호사(비공인) — 제목·speaker·id 2건
    content/posts/2026-09-24-hagonolza-…-spy-remark.md: 3(title), 4(description), 10(speaker.name), 17(sources.name), 31(body), id(id·파일명)
    content/posts/2026-09-25-…-nk-pow-ukraine.md: 3(title), 4(description), 8(attribution), id(id·파일명)
    content/posts/2026-09-28-boxplus-2019-forced-repatriation.md: 42(body)
    content/posts/2026-09-30-rekor-foreign-committee-dp-absence.md: 41(body)
    content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md: 35(body)
    content/posts-en/2026-09-24-hagonolza-…-spy-remark.md: 3(title), 4(description), 15(body), id(id·파일명)
    content/posts-en/2026-09-25-…-nk-pow-ukraine.md: 3(title), 4(description), 5(attribution), id(id·파일명)
    content/posts-en/2026-09-28-boxplus-2019-forced-repatriation.md: 11(body)
    content/posts-en/2026-09-30-rekor-foreign-committee-dp-absence.md: 9(body)
    content/posts-en/2026-10-23-eodguri-kimyonghyun-drone-appeal.md: 12(body)
- [N2] P087 ㅇㅅㅁ — 작가(비공인 표) — id에도 있음
    content/posts/2026-09-25-minkyuhan-nsl-security-priority.md: 37(body)
    content/posts/2026-09-26-issue365-lee-nsl-….md: 3(title), 4(description), 24(sources.name), 32(sources.name), 37(tags), 47(body), id(id·파일명)
    content/posts/2026-09-27-geonwoo-nsl-mexico-remark.md: 31(sources.name), 55(body)
    content/posts-en/2026-09-25-minkyuhan-nsl-security-priority.md: 11(body)
    content/posts-en/2026-09-26-issue365-lee-nsl-….md: 3(title), 4(description), 16(body), id(id·파일명)
    content/posts-en/2026-09-27-geonwoo-nsl-mexico-remark.md: 23(body)
- [N2] P111 ㅅㅅㅎ — 대학 교수(비공인 표)
    content/posts/2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs.md: 31(body)
    content/posts-en/2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs.md: 13(body)
- [N2] P204 ㅈㅅㅇㅇ — 홍콩 활동가(비공인) — 징역형 보도
    content/posts/2026-09-28-themove-hongkong-umbrella-12th.md: 3(title), 14(sources.name), 18(sources.name), 22(sources.name), 42(body), 43(body), 44(body)
    content/posts-en/2026-09-28-themove-hongkong-umbrella-12th.md: 3(title), 19(body), 20(body), 21(body)
- [N2] P205 ㅂㄴㅌㅇ — 전 홍콩대 교수·활동가(비공인) — 징역형 보도
    content/posts/2026-09-28-themove-hongkong-umbrella-12th.md: 14(sources.name), 43(body)
    content/posts-en/2026-09-28-themove-hongkong-umbrella-12th.md: 20(body)
- [N2] P130 ㅈㄱㅎ — 목사(종교인, 비공인 표)
    content/posts/2026-10-03-oct3-gwanghwamun-rally-scale.md: 41(body)
    content/posts/2026-10-04-ycherish-oct3-rally-media.md: 50(body)
    content/posts-en/2026-10-03-oct3-gwanghwamun-rally-scale.md: 13(body)
    content/posts-en/2026-10-04-ycherish-oct3-rally-media.md: 20(body)
- [N2] P132 ㄱㅈㅇ — 정당 대변인·변호사(당헌 간부 앵커 밖)
    content/posts/2026-10-04-rnwndhk-panmunjom-usb-lawsuit.md: 49(body)
    content/posts-en/2026-10-04-rnwndhk-panmunjom-usb-lawsuit.md: 20(body)
- [N2] P133 ㅈㅎㄱ — 유튜버(비공인)
    content/posts/2026-10-04-rnwndhk-panmunjom-usb-lawsuit.md: 52(body)
    content/posts-en/2026-10-04-rnwndhk-panmunjom-usb-lawsuit.md: 23(body)
- [N2] P155 ㅇㅈ — 목사(종교인)·집회 주최 관련 입건 이력 보도
    content/posts/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md: 46(body), 56(body)
    content/posts-en/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md: 20(body)
- [N2] P156 ㅇㅇㅌ — 탈북민·방송 대표(비공인)
    content/posts/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md: 47(body)
    content/posts-en/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md: 21(body)
- [N2] P168 ㄱㅎㅊ — 국방부 국방정책실장(일반직 — 정무직 아님, 공수처법 목록 밖)
    content/posts/2026-10-29-khan-nk-srbm-launch-wonsan.md: 34(body)
    content/posts-en/2026-10-29-khan-nk-srbm-launch-wonsan.md: 17(body)
- [N3] P214 ㅇㅎㅇ — 가수(활동명, 비공인 표) — 제목·id
    content/posts/2026-07-24-korealive-…-moreugo.md: 3(title), 4(description), 14(sources.name), 18(sources.name), 26(body), 31(body), 36(body), 37(body), id(id·파일명)
    content/posts-en/2026-07-24-korealive-…-moreugo.md: 3(title), 4(description), 9(body), 14(body), 19(body), 20(body), id(id·파일명)
- [N3] P183 ㅂㅈㅎ — 라디오 진행자(프로그램 이름 '…의 한판승부')
    content/posts/2026-09-13-geonwoo-…-2023-remark.md: 33(body)
    content/posts-en/2026-09-13-geonwoo-…-2023-remark.md: 14(body)
- [N3] P200 ㅂㄹㄷ — 배우(비공인 표) — 공개 발언 인용
    content/posts/2026-09-23-shindawit-army-lecture-trump.md: 32(body), 37(body), 38(body)
    content/posts-en/2026-09-23-shindawit-army-lecture-trump.md: 13(body), 18(body), 19(body)
- [N3] P184 ㅇㅎㅎ — 칼럼 필자(출처 제목의 연재명 '[…의 밀리터리!톡]')
    content/posts/2026-09-27-rekor-former-25div-commander.md: 14(sources.name)
- [N3] P116 ㅎㅈㅎ — 영화감독(작품 크레딧)
    content/posts/2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs.md: 32(body)
    content/posts/2026-10-07-rinha-chosun-column-chongryon-visit.md: 46(body)
    content/posts-en/2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs.md: 14(body)
    content/posts-en/2026-10-07-rinha-chosun-column-chongryon-visit.md: 23(body)
- [N3] P143 ㄱㅌㅎ — 신문 논설위원(칼럼 필자, 비공인 표) — speaker·출처 제목·본문
    content/posts/2026-10-07-rinha-chosun-column-chongryon-visit.md: 4(description), 10(speaker.name), 15(image.alt), 21(sources.name), 45(body)
    content/posts-en/2026-10-07-rinha-chosun-column-chongryon-visit.md: 5(imageAlt), 22(body)
- [N3] P186 ㅂㅊㅇ — 영화감독(출처 제목 속 발언자)
    content/posts/2026-10-07-rinha-chosun-column-chongryon-visit.md: 25(sources.name)
- [N3] P187 ㄱㅊㅅ — 책 저자(인용 크레딧)
    content/posts/2026-10-07-rinha-chosun-column-chongryon-visit.md: 39(body)
    content/posts-en/2026-10-07-rinha-chosun-column-chongryon-visit.md: 16(body)
- [N3] P188 ㄱㅇㅎ — 기자 칼럼 연재명(출처 제목 '[…의 일자리노트]')
    content/posts/2026-10-09-themovemag-chinese-residents-1m.md: 26(sources.name)
- [N4] P203 ㅂㄹㅅ — 주한미군사령관·유엔군사령관(외국 현직 군인)
    content/posts/2026-09-28-ljm-unc-request-refused.md: 38(body)
    content/posts/2026-10-01-hagonolza-opcon-transfer-risks.md: 32(sources.name), 59(body)
    content/posts-en/2026-09-28-ljm-unc-request-refused.md: 14(body)
    content/posts-en/2026-10-01-hagonolza-opcon-transfer-risks.md: 24(body)
- [N4] P194 ㅁㅅㅌ — 외국 전직 대사 — 명예훼손 피고발·출국정지 보도(정책 §3.1: 수사 대상 외국 전직은 제외) — 제목·id
    content/posts/2026-09-30-monarch-…-church-claims.md: 3(title), 4(description), 12(image.alt), 30(sources.name), 39(body), 43(body), id(id·파일명)
    content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md: 27(sources.name), 70(body)
    content/posts-en/2026-09-30-monarch-…-church-claims.md: 3(title), 4(description), 5(imageAlt), 11(body), 15(body), id(id·파일명)
    content/posts-en/2026-10-09-gotdemcatch-lee-five-trials-suspended.md: 33(body)
- [N4] P202 ㄹㅌㄴ — 미 상무장관(외국 현직 공직자)
    content/posts/2026-10-02-alaska-lng-vs-dmz-mine-response.md: 63(body), 65(body)
    content/posts-en/2026-10-02-alaska-lng-vs-dmz-mine-response.md: 15(body), 17(body)
- [N4] P195 ㅁㄹㄴㄹ — 미 하원의원·위원장(외국 현직 공직자)
    content/posts/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 4(description), 12(image.alt), 44(body), 48(body)
    content/posts-en/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 4(description), 5(imageAlt), 16(body), 20(body)
- [N4] P198 ㅅㅌㅇㅌ — 미 전 하원의원(외국 전직 공직자 — 재직 사진 규정만 있음)
    content/posts/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 43(body), 54(body)
    content/posts-en/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 15(body), 26(body)
- [N4] P201 ㅈㅅ — 미 하원의원(외국 현직 공직자)
    content/posts/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 50(body)
    content/posts-en/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 22(body)
- [N4] P207 ㄹㅂㅇ — 미 국무장관(외국 현직 공직자)
    content/posts/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 3(title), 12(image.alt), 44(body), 48(body)
    content/posts/2026-10-08-shindawit-us-nis-cyber-group-excluded.md: 69(body)
    content/posts-en/2026-10-08-monarch-us-congress-ccp-influence-korea.md: 3(title), 4(description), 5(imageAlt), 16(body), 20(body)
    content/posts-en/2026-10-08-shindawit-us-nis-cyber-group-excluded.md: 37(body)
- [N4] P197 ㅂㄹㅅㅇㅋ — 우크라이나 대통령실 보좌관(외국 현직 공직자)
    content/posts/2026-10-08-peoplepower7-ukraine-korea-oil-claim.md: 50(body), 52(body)
    content/posts-en/2026-10-08-peoplepower7-ukraine-korea-oil-claim.md: 20(body), 22(body)
- [N4] P196 ㅎㄴ — 독일 전 정보기관장 — 간첩 혐의 체포 보도(수사 대상 외국 전직 — 제외) — 제목
    content/posts/2026-10-12-minkyuhantv-german-spy-chief.md: 3(title), 4(description), 12(image.alt), 44(body), 50(body)
    content/posts-en/2026-10-12-minkyuhantv-german-spy-chief.md: 3(title), 4(description), 5(imageAlt), 19(body), 25(body)
- [N4] P169 ㅇㅈㅇㅅ — 대만 국가안전회의 비서장(외국 현직 공직자 — 정책 §3.1 비공인 표)
    content/posts/2026-10-29-news1-china-53-vessels-taiwan-warning.md: 4(description), 35(body)
    content/posts-en/2026-10-29-news1-china-53-vessels-taiwan-warning.md: 15(body)
- [N4] P170 ㄱㄹㅅ — 대만 국방부장(외국 현직 공직자)
    content/posts/2026-10-29-news1-china-53-vessels-taiwan-warning.md: 38(body)
    content/posts-en/2026-10-29-news1-china-53-vessels-taiwan-warning.md: 18(body)

## (다) — 37건(인물·판정 단위) · 258줄
- [D1] P033 ㅇㄱㅅ — 전 해군사관학교장 — 계급이 본문·기사(파이낸셜뉴스)에 없음
    content/posts/2026-09-10-ansanheart-academy-merger.md: 43(body), 48(body)
    content/posts-en/2026-09-10-ansanheart-academy-merger.md: 23(body), 28(body)
- [D1] P077 ㅈㄷㅇ — 합참 공보실장 — 계급·직급이 본문·기사(헤럴드경제·통일뉴스 등)에 없음
    content/posts/2026-09-20-nowandhere-mdl-mine-briefing-reel.md: 43(body)
    content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md: 71(body)
    content/posts-en/2026-09-20-nowandhere-mdl-mine-briefing-reel.md: 14(body)
    content/posts-en/2026-09-30-shindawit-nk-mdl-50-crossings.md: 27(body)
- [D1] P123 ㅈㅇㅅ — 합참의장 — 계급이 본문·기사에 없음(guide §4-1: 직위만으로 장성급 인정 보류)
    content/posts/2026-09-29-osj17x-hankiho-president-instruction.md: 44(body)
    content/posts/2026-10-08-shindawit-us-nis-cyber-group-excluded.md: 58(body)
    content/posts-en/2026-09-29-osj17x-hankiho-president-instruction.md: 19(body)
    content/posts-en/2026-10-08-shindawit-us-nis-cyber-group-excluded.md: 26(body)
- [D1] P135 ㄱㅅㅇ — 합참 정보분석처장 — 계급이 본문·기사(경향·천지일보)에 없음
    content/posts/2026-10-05-shindawit-mdl-south-minefields-20m.md: 46(body)
    content/posts-en/2026-10-05-shindawit-mdl-south-minefields-20m.md: 21(body)
- [D2] P026 ㄱㅇㅎ — 노동부 장관 후보자(인사청문 후보자 — 임명 여부 본문 미기재)
    content/posts/2026-08-29-idontknowpolitics-martial-law-nk-policy.md: 15(sources.name), 19(sources.name), 68(body)
    content/posts/2026-09-24-politicscrush-main-enemy-politicians.md: 3(title), 4(description), 23(sources.name), 47(body)
    content/posts-en/2026-08-29-idontknowpolitics-martial-law-nk-policy.md: 19(body)
    content/posts-en/2026-09-24-politicscrush-main-enemy-politicians.md: 3(title), 19(body)
- [D2] P052 ㄱㅇㅎ — 2018년 도지사 후보로만 기재(현 직위 본문 미기재)
    content/posts/2026-09-13-geonwoo-brother-hospitalization-case.md: 31(sources.name), 55(body)
    content/posts-en/2026-09-13-geonwoo-brother-hospitalization-case.md: 20(body)
- [D2] P062 ㄱㅅㅅ — 대법관 후보자(guide §4-1 인사청문 후보자 보수 처리)
    content/posts/2026-09-14-yongkeun-justice-hearing-lee-trial.md: 3(title), 4(description), 17(sources.name), 36(body)
    content/posts/2026-09-27-minjoojuhee-trial-resume-challenge.md: 21(sources.name)
    content/posts-en/2026-09-14-yongkeun-justice-hearing-lee-trial.md: 3(title), 4(description), 16(body)
- [D2] P069 ㄱㅅㅇ — 법무부 장관 후보자(본문에 다른 직위 미기재)
    content/posts/2026-09-15-joojinwoo-…-hearing.md: 3(title), 4(description), 17(sources.name), 21(sources.name), 25(sources.name), 38(body), id(id·파일명)
    content/posts/2026-09-28-kimjanggyeom-hanjunho-kbs-complaint.md: 3(title), 4(description), 17(sources.name), 40(body), 49(body)
    content/posts-en/2026-09-15-joojinwoo-…-hearing.md: 3(title), 4(description), 14(body), id(id·파일명)
    content/posts-en/2026-09-28-kimjanggyeom-hanjunho-kbs-complaint.md: 3(title), 10(body), 19(body)
- [D2] P080 ㄱㅁㅅ — 전 대선 후보로만 기재(그 외 직위 본문 미기재)
    content/posts/2026-09-21-…-prosecution-abolition.md: 3(title), 4(description), 8(attribution), 10(speaker.name), 17(sources.name), 27(tags), 40(body), id(id·파일명)
    content/posts/2026-09-22-ego-police-republic-concern.md: 27(body)
    content/posts/2026-09-29-2pro-prosecution-sign-removal-cost.md: 42(body)
    content/posts/2026-09-30-20hoon-prosecution-abolition-victim-guide.md: 28(body)
    content/posts-en/2026-09-21-…-prosecution-abolition.md: 3(title), 4(description), 6(attribution), 20(body), id(id·파일명)
    content/posts-en/2026-09-22-ego-police-republic-concern.md: 9(body)
    content/posts-en/2026-09-29-2pro-prosecution-sign-removal-cost.md: 11(body)
    content/posts-en/2026-09-30-20hoon-prosecution-abolition-victim-guide.md: 9(body)
- [D2] P086 ㅇㅅㅁ — 2017년 대선 후보로만 기재
    content/posts/2026-09-24-politicscrush-main-enemy-politicians.md: 15(sources.name), 46(body)
    content/posts-en/2026-09-24-politicscrush-main-enemy-politicians.md: 18(body)
- [D3] P215 ㅈㅇㄱ — 당시 원내대변인 — 국회의원 여부 본문 미기재
    content/posts/2026-07-04-idontknowpolitics-2018-freedom-deletion.md: 32(body)
    content/posts-en/2026-07-04-idontknowpolitics-2018-freedom-deletion.md: 14(body)
- [D3] P216 ㅈㅌㅇ — 당시 정당 대변인 — 국회의원 여부 본문 미기재
    content/posts/2026-07-04-idontknowpolitics-2018-freedom-deletion.md: 35(body)
    content/posts-en/2026-07-04-idontknowpolitics-2018-freedom-deletion.md: 17(body)
- [D3] P182 ㅇㄱㅂ — 출처 제목에만 이름 — 직위 본문 미기재
    content/posts/2026-08-29-idontknowpolitics-martial-law-nk-policy.md: 35(sources.name)
- [D3] P039 ㅇㅈㅎ — 원내대변인 — 국회의원 여부 본문 미기재(당 대변인은 당헌 간부 앵커 밖)
    content/posts/2026-09-10-freedominnovation-nec-bill.md: 62(body)
    content/posts-en/2026-09-10-freedominnovation-nec-bill.md: 17(body)
- [D3] P075 ㅂㅁㄱ — 대통령 직속 위원회 위원장·시민운동가 — 정무직 여부 확인 필요
    content/posts/2026-09-17-rekor-light-committee-disclosure.md: 23(sources.name), 54(body)
    content/posts-en/2026-09-17-rekor-light-committee-disclosure.md: 23(body)
- [D3] P091 ㅂㅅㅈ — 당 수석대변인 — 국회의원 여부 본문 미기재
    content/posts/2026-09-26-rekor-dmz-dispute.md: 37(body)
    content/posts/2026-09-28-parkchoongkwon-dp-mine-remarks.md: 3(title), 46(body), 53(body)
    content/posts-en/2026-09-26-rekor-dmz-dispute.md: 18(body)
    content/posts-en/2026-09-28-parkchoongkwon-dp-mine-remarks.md: 3(title), 17(body)
- [D3] P105 ㄱㅇㅈ — 직위 본문 미기재(계정 표시 이름으로만 등장) — 제목·id
    content/posts/2026-09-28-…-chief-justice-audit-witness.md: 3(title), 4(description), 8(attribution), id(id·파일명)
    content/posts-en/2026-09-28-…-chief-justice-audit-witness.md: 3(title), 5(attribution), id(id·파일명)
- [D3] P110 ㅅㅎㅇ — 당 대변인 — 국회의원 여부 본문 미기재
    content/posts/2026-09-28-parkchoongkwon-dp-mine-remarks.md: 3(title), 47(body), 53(body)
    content/posts-en/2026-09-28-parkchoongkwon-dp-mine-remarks.md: 3(title), 18(body)
- [D3] P121 ㄱㅎㅎ — 전 해양경찰청장 — 공수처법 하목('경찰공무원')에 해양경찰이 드는지 확인 필요. 1심 무죄 보도
    content/posts/2026-09-29-momamour-westsea-vs-dmz-comparison.md: 46(body)
    content/posts-en/2026-09-29-momamour-westsea-vs-dmz-comparison.md: 21(body)
- [D3] P158 ㅇㄱㅇ — 정당 비상대책위원장 — 당헌 '대표' 해당 여부 확인 필요
    content/posts/2026-10-12-hagonolza-equal-earth-dokdo.md: 4(description), 10(speaker.name), 15(image.alt), 39(tags), 48(body), 59(body)
    content/posts-en/2026-10-12-hagonolza-equal-earth-dokdo.md: 4(description), 5(imageAlt), 17(body)
- [D3] P160 ㄱㅈㅊ — 경찰청장 직무대행 — 계급 본문·기사 미기재
    content/posts/2026-10-13-yeong573-police-bodycam-china.md: 46(body)
    content/posts-en/2026-10-13-yeong573-police-bodycam-china.md: 23(body)
- [D3] P171 ㄱㅇㄹ — 정당 대변인 — 국회의원 여부 본문 미기재
    content/posts/2026-11-03-happenbosu-lee-kimilsung-remark-2024.md: 44(body)
    content/posts-en/2026-11-03-happenbosu-lee-kimilsung-remark-2024.md: 22(body)
- [D4] P024 ㄹㅎㄴ — 전 주중 북한대사관 참사관·'대남공작원'으로 보도(북한 인사 — 정책 1a는 북한 지도자만)
    content/posts/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md: 33(tags), 40(body), 45(body)
    content/posts-en/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md: 15(body), 20(body)
- [D4] P059 ㄱㅇㅈ — 노동당 부부장·총무부장 — 정책 1a '북한 지도자' 범위 해석 필요
    content/posts/2026-09-13-idontknowpolitics-kangdong-hospital.md: 27(sources.name), 58(body), 60(body), 61(body), 66(body)
    content/posts/2026-09-30-2pro-unc-armistice-violation.md: 12(image.alt), 38(sources.name), 46(tags), 62(body)
    content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md: 3(title), 4(description), 48(tags), 53(body), 57(body), 66(body), 72(body)
    content/posts/2026-10-02-alaska-lng-vs-dmz-mine-response.md: 72(body)
    content/posts/2026-10-08-finf-un-first-committee-mine-clash.md: 36(body), 41(body), 47(body)
    content/posts-en/2026-09-13-idontknowpolitics-kangdong-hospital.md: 23(body), 25(body), 26(body), 31(body)
    content/posts-en/2026-09-30-2pro-unc-armistice-violation.md: 5(imageAlt), 24(body)
    content/posts-en/2026-09-30-shindawit-nk-mdl-50-crossings.md: 3(title), 4(description), 9(body), 13(body), 22(body), 28(body)
    content/posts-en/2026-10-02-alaska-lng-vs-dmz-mine-response.md: 24(body)
    content/posts-en/2026-10-08-finf-un-first-committee-mine-clash.md: 11(body), 16(body), 22(body)
- [D4] P165 ㅂㅈㅊ — 북한 노동당 중앙군사위 부위원장 — 1a 지도자 범위 밖 여부 확인 필요
    content/posts/2026-10-24-khan-nk-third-company-commanders-conference.md: 39(body)
    content/posts-en/2026-10-24-khan-nk-third-company-commanders-conference.md: 16(body)
- [D4] P166 ㄱㅅㄱ — 북한 국방상 — 같은 사유
    content/posts/2026-10-24-khan-nk-third-company-commanders-conference.md: 39(body)
    content/posts-en/2026-10-24-khan-nk-third-company-commanders-conference.md: 16(body)
- [D4] P167 ㄹㅇㄱ — 북한 군 총참모장 — 같은 사유
    content/posts/2026-10-24-khan-nk-third-company-commanders-conference.md: 39(body)
    content/posts-en/2026-10-24-khan-nk-third-company-commanders-conference.md: 16(body)
- [D5] P180 ㄱㅈㅅ — 북한 역사 인물('옛집' 지명)
    content/posts/2026-07-24-firstincome-seoul-edu-unification-textbook.md: 32(body), 38(body)
    content/posts-en/2026-07-24-firstincome-seoul-edu-unification-textbook.md: 13(body), 19(body)
- [D5] P041 ㅈㅇㅅ — 역사 인물(고인, 작곡가) — 정책에 본문 기준 없음
    content/posts/2026-09-10-geonwoo-…-song-contest.md: 3(title), 4(description), 13(image.alt), 19(sources.name), 23(sources.name), 27(sources.name), 31(sources.name), 35(sources.name), 39(sources.name), 47(tags), 53(body), 57(body), 62(body), 63(body), 68(body), 69(body), 70(body), 72(body), id(id·파일명)
    content/posts-en/2026-09-10-geonwoo-…-song-contest.md: 3(title), 4(description), 5(imageAlt), 11(body), 15(body), 20(body), 21(body), 26(body), 27(body), 28(body), 30(body), id(id·파일명)
- [D5] P088 ㅂㅈㅊ — 역사 사건명(○○○ 고문치사 사건 — 고인 피해자 이름이 사건명) — 정책 기준 없음
    content/posts/2026-09-25-peoplepower7-tankday-vs-mine.md: 49(body)
    content/posts-en/2026-09-25-peoplepower7-tankday-vs-mine.md: 20(body)
- [D5] P113 ㅁㅅㄱ — 역사 인물(1974년 사건 범인, 고인)
    content/posts/2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs.md: 31(body), 36(body)
    content/posts/2026-09-29-leejinsook-assassins-film-distortion.md: 44(body), 45(body)
    content/posts/2026-10-07-rinha-chosun-column-chongryon-visit.md: 39(body)
    content/posts-en/2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs.md: 13(body), 18(body)
    content/posts-en/2026-09-29-leejinsook-assassins-film-distortion.md: 19(body)
    content/posts-en/2026-10-07-rinha-chosun-column-chongryon-visit.md: 16(body)
- [D5] P189 ㅎㅈㅇ — 역사 인물(전 북한 노동당 비서, 고인)
    content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md: 40(body), 49(body)
    content/posts-en/2026-10-23-eodguri-kimyonghyun-drone-appeal.md: 17(body), 26(body)
- [D5] P206 ㅍㅍㅌ — 외국 역사 인물
    content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md: 40(body)
    content/posts-en/2026-10-23-eodguri-kimyonghyun-drone-appeal.md: 17(body)
- [D6] P178 ㄱㅇㅇ — 계정 표시 이름 + speaker name(affiliation '인스타그램 이용자')
    content/posts/2026-09-10-ansanheart-academy-merger.md: 8(attribution), 10(speaker.name)
    content/posts-en/2026-09-10-ansanheart-academy-merger.md: 6(attribution)
- [D6] P176 ㅂㄱㅇ — 계정 표시 이름(attribution 괄호)
    content/posts/2026-09-10-geonwoo-…-song-contest.md: 9(attribution)
    content/posts/2026-09-13-geonwoo-518-list-disclosure-citizen.md: 8(attribution)
    content/posts/2026-09-13-geonwoo-leejinsook-518-merit-disclosure.md: 8(attribution)
    content/posts/2026-09-27-geonwoo-corporate-card-whistleblower.md: 8(attribution)
    content/posts/2026-09-28-geonwoo-farmland-bank-expansion.md: 8(attribution)
    content/posts/2026-09-28-geonwoo-state-system-decade.md: 8(attribution)
    content/posts-en/2026-09-10-geonwoo-…-song-contest.md: 7(attribution)
    content/posts-en/2026-09-13-geonwoo-518-list-disclosure-citizen.md: 7(attribution)
    content/posts-en/2026-09-13-geonwoo-leejinsook-518-merit-disclosure.md: 7(attribution)
    content/posts-en/2026-09-27-geonwoo-corporate-card-whistleblower.md: 5(attribution)
    content/posts-en/2026-09-28-geonwoo-farmland-bank-expansion.md: 5(attribution)
    content/posts-en/2026-09-28-geonwoo-state-system-decade.md: 5(attribution)
- [D6] P175 ㅅㄷㅇ — 계정 표시 이름(attribution 괄호) — 사람 이름 형태, 실명 여부 확인 불가
    content/posts/2026-09-18-shindawit-asiangames-nk-anthem.md: 8(attribution)
    content/posts/2026-09-20-shindawit-foreign-unemployment-benefits.md: 9(attribution)
    content/posts/2026-09-23-shindawit-army-lecture-trump.md: 8(attribution)
    content/posts/2026-09-27-shindawit-nisi-mine-summary.md: 8(attribution)
    content/posts/2026-09-28-shindawit-pla-fighter-wiretap.md: 8(attribution)
    content/posts/2026-09-29-shindawit-cxmt-samsung-threat.md: 8(attribution)
    content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md: 9(attribution)
    content/posts/2026-10-05-shindawit-core-tech-leak-china-92.md: 8(attribution)
    content/posts/2026-10-05-shindawit-mdl-south-minefields-20m.md: 8(attribution)
    content/posts/2026-10-08-shindawit-nis-chief-nga-visit-report.md: 9(attribution)
    content/posts/2026-10-08-shindawit-us-nis-cyber-group-excluded.md: 9(attribution)
    content/posts-en/2026-09-18-shindawit-asiangames-nk-anthem.md: 7(attribution)
    content/posts-en/2026-09-20-shindawit-foreign-unemployment-benefits.md: 5(attribution)
    content/posts-en/2026-09-23-shindawit-army-lecture-trump.md: 5(attribution)
    content/posts-en/2026-09-27-shindawit-nisi-mine-summary.md: 5(attribution)
    content/posts-en/2026-09-28-shindawit-pla-fighter-wiretap.md: 5(attribution)
    content/posts-en/2026-09-29-shindawit-cxmt-samsung-threat.md: 5(attribution)
    content/posts-en/2026-09-30-shindawit-nk-mdl-50-crossings.md: 5(attribution)
- [D6] P177 ㅎㅁㄱ — 계정 표시 이름(채널명 '…TV'·'…의 이슈분석')
    content/posts/2026-09-25-minkyuhan-nsl-security-priority.md: 8(attribution)
    content/posts/2026-09-28-minkyuhan-dmz-delay-questions.md: 8(attribution)
    content/posts/2026-09-29-finf-jcs-terrain-change-year.md: 32(body)
    content/posts/2026-10-12-minkyuhantv-german-spy-chief.md: 8(attribution)
    content/posts-en/2026-09-29-finf-jcs-terrain-change-year.md: 9(body)
    content/posts-en/2026-10-12-minkyuhantv-german-spy-chief.md: 7(attribution)
```
