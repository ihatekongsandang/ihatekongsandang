# reviewer-54 — 업로더 17(비공인 실명 이니셜 전환 1차) 검증 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10 · 실행: 하위 에이전트
- 오더: `instructions/reviewer/processed/54-uploader-17-review.md`(이동)
- 선행 문서 직접 읽음: `CLAUDE.md`, 업로더 17 오더·트리거 전체, 리뷰어 52 트리거 전체(A-5·A-6·B-3·C·작업 목록·부록), `docs/tools/reviewer-52/judgement-table-masked.tsv`, `planning/prd.md` §6③(지위 앵커·확정 유죄 예외·본문 실명 예외 4종·공통 제외·id 규칙), `planning/card-image-policy.md` §3.1·§3.7, `content/README.md`(description 160자 = 경고), `next.config.ts`·`src/lib/content/moved-ids.ts`·`load.ts`·`scripts/validate-content.ts`의 moved-ids 경로, 공수처법 제2조(법령 원문 조회, 2026-10-02 시행본).
- 콘텐츠·코드·설정 수정 0, git add·commit·push·rm·checkout 0, 빌드 0(`npm run validate:content`만 실행). 만든 파일: `docs/tools/reviewer-54/` 4개 + 이 트리거 + 오더 이동.
- 이 트리거·도구·도구 출력에는 비공인 실명(한글·로마자·성만 쓴 표기)과 옛 id 문자열을 쓰지 않았다. 이름 패턴 목록·기사 HTML·옛 파일 사본은 저장소 밖 임시 폴더에만 있다.

## 판정: ✅ 통과 — 커밋 가능 (P1 0 · P2 1 · P3 6)

P2 1건(카드 이미지 2장 속 글자)은 이번 변경이 만든 문제가 아니고 이미 배포된 이미지에 원래 있던 것이다. 이번 커밋이 노출을 늘리지 않으므로 커밋을 막지 않는다. 다만 이니셜 전환의 목적이 이미지에서 무너져 있으므로 **디자이너 재제작 오더를 바로 이어서** 내야 한다.

---

## 1. id 이전 2건 — ✅

| 확인 | 결과 |
|---|---|
| ko·en 파일 이름·frontmatter `id` | #6 → `2026-09-12-peoplepower7-civic-group-head-dp-card`, P089 → `2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard`. 4파일 모두 이름 = `id`. 옛 파일 4개는 작업 트리에서 없어짐(` D`) |
| 새 파일 내용 | HEAD 옛 파일과 단어 단위 비교: 바뀐 곳은 `id`와 이름 자리뿐(#6 ko 11곳·en 8곳, P089 ko 1곳·en 5곳). `publishedAt`·`translatedAt`·`updatedAt` 줄은 4파일 모두 HEAD와 같음 |
| `moved-ids.txt`·`retired-ids.txt` | 각 2줄 추가, 파일 끝 줄바꿈 있음. 형식 `옛id 새id`(공백 1개)·`retired`에 옛 id 한 줄 — 선례 02(첫 줄)와 같은 방식·같은 위치(파일 끝 추가) |
| 옛 id 문자열 | `content/`(두 txt 제외)·`src/`·`public/`·`scripts/`·`next.config.ts`·`vercel.json` **0건**. `public/images/`에 옛 id 폴더 0, 새 id 폴더도 없음(두 게시물 모두 `image` 블록 없음 — 원래 없음) |
| 새 id에 이름 | 없음(직함 영문 단어 + 계정 핸들 조각만) |
| 리다이렉트 구조(코드 읽음) | `next.config.ts` `redirects()`가 `readMovedIds(projectRoot)` → `movedIdRedirects(moved, readTranslationIds(...))`를 부른다. 옮긴 건마다 `/post/옛→/post/새`, `/en/post/옛→/en/post/새`(새 id 영어본이 있으면) 308 두 규칙. Vercel 조건 밖이라 배포에도 들어간다. txt만 고치면 코드 수정 없이 동작 — ✅. 형식 위반이면 `readMovedIds`가 던져 빌드가 서므로, 아래 validate(검증 a~i 같은 함수 사용) 통과로 확인 |
| validate | ✅ 418/418 통과, 오류 0. "옮긴 id 3건 · 리다이렉트 규칙 6개 · 오류 0" |

## 2. N1 14·N1S 3·D6 전 위치 — ✅ 전수

- **부록 위치 전수 대조**(`appendix-line-check.mjs`): 리뷰어 52 부록의 N1·N1S·D6 위치 **152개** 중 보류 P020 5개·유지 P177 6개를 뺀 **141개 전부** 처리됨 — 줄 137개는 HEAD와 현재가 다르고, id·파일명 4개는 이전됨. 미변경 0. 바뀐 파일의 줄 수는 HEAD와 모두 같다(줄 번호 밀림 없음).
- **이름 잔존 전수 검사**(`name-residual-scan.mjs`, 이름 패턴은 저장소 밖 TSV): `git` 추적 + 미추적 텍스트 파일 **1,972개**(게시물 418개 포함)에서 전환 대상 17명(N1 14·N1S 3)·D6 3명·공익제보자·#6 인물의 전체 이름(한글·로마자)과, 해당 게시물 안의 성만 쓴 표기("○ 씨"·"○ 중령"·"○ 전 본부장"·"○ 변호사"·en 성 단독)를 찾았다.
  - 게시물 418개: **0줄**(P020 보류 5줄 제외).
  - `content/` 밖: #6 옛 id 문자열(로마자 이름이 든 id) 21줄 = 리뷰어 52 A-6 목록 13파일 + 리뷰어 52 오더 1줄(기록 — 업로더 오더 5항대로 유지, P3-6), D6 P176 표시 이름 2줄(오더 범위 밖, P3-4), P217 성만 쓴 표기 2줄(P3-4). 나머지 0.
  - 오탐으로 걸러낸 것: 국회 위원장(공인) 이름 속 같은 음절 2줄, 다른 사건 외국 인물 1줄(미추적 RSS).
- **표기 방식**: ko 초성씨·en 영문 이니셜, 선례(묶음 14 ㅈ씨↔C, #1 ㄱ씨↔K)와 같다. ko·en 짝 전수 대조 — P046 ㄱ↔K, P050 ㅇ↔L, P051 ㅂ↔P, P055 ㅈ↔J, P089 (ko 성+계급 유지)↔Cpl. C, P107 ㅈ↔J, P199 ㅇ↔W, P144 ㅇ↔Y, P145 ㄴ↔N, P146 ㅂ↔B, P148 ㄱ↔K, P172 ㅇ↔Y, P217 ㅅ↔S, P218 ㄱ↔K, P219 ㅇ↔Y. **모두 맞다.** P147·P107(녹취 인용 속)은 ko·en 모두 "다른 세 사람(비공인이라 이름을 적지 않음)"으로 같게 처리.
- **문장 점검**(바뀐 줄 전부 단어 단위 diff로 읽음): 조사 중복("씨씨"·"씨 씨")·이중 공백·빈 괄호 0. 관계·직함은 모두 남았다 — 형수·친형(고인)·전 비서실장·순직 해병·전 정무조정실장·전 CXMT CEO·전 본부장·변호사·유튜버(전 권리당원)·중령(특전사 대대장)·전 조직쟁의국장·전 조직실장·전 부위원장. 뜻이 바뀐 곳 없음.
  - 대장동 녹취 인용(ko 41행·en 21행)은 직접 인용을 "…다른 세 사람이 '다 짜고' 했다는 취지로"로 바꿨다. 발언 요지(대통령과 여럿이 짰다는 주장)와 화자는 그대로이고, 인용부호는 "다 짜고"에만 남겨 원문 왜곡이 없다. 남은 인용 안의 `[대장동 사건 피고인 ㄱ씨]`는 대괄호 편집 표기라 인용 변조가 아니다. ✅
  - 출처 제목(`sources[].name`) 속 이름은 이름 자리만 바꿨다(#1 선례). P089 출처 제목은 "채○○ 상병" → 성+계급 — ko 본문 수준과 같다.
- **부록 밖 1곳**: P089 en 표기를 `content/posts-en/2026-07-28-geonwoo-yoon-final-statement-australia.md`:14에서도 맞췄다(부록은 전체 이름 줄만 올렸고 이 줄은 성만). P089 en 성 단독 잔존은 이제 게시물 전체 0 — 일관성상 맞는 처리다.

## 3. P020 보류 판정 — **공인(가). 실명 유지가 맞다** (리뷰어 52 판정 정정)

- **법령**: 공수처법 제2조 1호(현행 원문 조회)는 "다음 각 목의 어느 하나의 직에 **재직 중인 사람 또는 그 직에서 퇴직한 사람**"이고 **나목이 "국회의장 및 국회의원"**이다. PRD §6③ 판정 앵커 "고위 공직자 = 공수처법 제2조 1호 목록(퇴직자 포함)"과 정책 §3.1 고위공직자 행("퇴직자 포함")에 그대로 해당한다. 리뷰어 52 B-2도 G1을 "국회의원(현·전)"으로 셌다.
- **경력 확인(기사 직접 열람, 저장소 밖에 받음)**: 경향신문 2019-02-16 인물 기사 본문 "2004년 … 지역구(중랑갑)를 물려받아 **17대 국회의원이 됐다** … 국회 외무통일위 간사", 주간경향 2007-03-27 인터뷰 제목 "… **열린우리당 의원**"(둘 다 HTTP 200). 업로더 보고와 같다.
- **`sources[]` 안에 그 보도가 있는가 — 없다.** 두 게시물의 출처 9건을 모두 열었다(9/9 HTTP 200). 이 인물이 나오는 4건(MBC 2026-04, 법률신문, 연합뉴스 2026-07-14, 동아일보 2026-10-05)은 모두 "전 경기도 평화부지사"로만 적고, "국회의원·17대·열린우리당" 표현은 9건 어디에도 없다. 따라서 업로더 트리거의 "보도돼 있다"는 출처 밖 기사 기준이다(사실은 맞음).
- **덧붙여 확정 유죄 보도**: 동아일보 2026-10-05(`2026-10-09-gotdemcatch-…`의 출처)는 "대법원에서 징역 7년 8개월이 확정"을 보도한다. 이 게시물은 공인이 아니어도 PRD §6③ 확정 유죄 예외에 해당한다.
- **공적 활동 범위**: 두 게시물이 다루는 것은 쌍방울 대북송금 사건(경기도 평화부지사 재직 중 직무 관련 혐의로 기소·확정)과 그 사건 수사 검사의 진술 회유 의혹(국정조사 청문회)이다. 공직 재직 중 행위와 국회 국정조사라 공적 사안이다. 공통 제외(사적 사항·피해자 등)에 걸리지 않는다.
- **결론**: P020은 (가) G1 공인이며 두 게시물 5곳의 실명 유지가 맞다. 업로더가 손대지 않은 것은 결과적으로 옳다. C 목록 P020 문서 잔존 4곳(+ 추가로 찾은 2곳)도 정리 대상이 아니다. 리뷰어 52 판정표의 P020 행(N1)은 오류였다 → P3-5.

## 4. D6 32파일 — ✅ 범위 안

- 부록 D6 위치를 세면 P178 2파일(ko·en) + P176 12파일(6건×ko·en) + P175 18파일(ko 11·en 7) = **32파일**. git diff의 attribution 변경도 정확히 이 32파일(ko 18줄·en 14줄)과 P178 `speaker.name` 1줄뿐이다. **리뷰어 52 D6 4건(P177 제외 3명) 범위를 넘지 않았다** — 32는 같은 계정의 여러 게시물 수다.
- 바뀐 내용은 괄호 속 사람 이름 꼴 표시 이름 삭제뿐이고 핸들은 그대로다. CLAUDE.md "일반인 계정 게시: 계정명만 표기, 실명 추적·기재 금지"에 맞는다. 채널명 꼴 표시 이름(P177, #6·P089 게시물의 매체명 꼴 표시 이름)은 남겼다 — 맞다.
- 업로더 트리거 4절의 "P175 … en 6 = 17파일"은 셈 오류(실제 en 7·18파일, 합계 32는 맞음) → P3-1.

## 5. 문서 정리 22파일 — ✅

- 22파일 = 시안 10 + `docs/handoffs/translator-01…`·`translator-02…` + `docs/supervisor/drafts/2026-09-28-held-recheck.md` + `docs/tools/` 7(designer-04-A `content.mjs`, designer-04-B `data.json`, reviewer-24 출력, reviewer-26 출력, reviewer-30 `gen.py`·`image-recheck.tsv`·`post-recheck.tsv`) + `docs/triggers/supervisor-2026-10-01-anticom-supervisor-ACK-COMPLETE.md` + `history/2026-10-01.md`(34행만). 각 diff를 직접 읽었다.
- 공익제보자·#6 인물·N1(P020 제외)·N1S 이름: 위 2절 전수 검사로 **0**(남은 것은 P3-4·P3-6 항목뿐).
- 기록 의미: 번역 로마자 표 3행(translator-02:131~133)은 이니셜 짝(ㅇ씨|L 등)으로 바뀌어 "이 성씨는 이렇게 옮겼다"는 기록 취지가 남는다. 측정 출력(reviewer-24·26)은 줄 위치·필드가 그대로라 측정 기록으로서 의미가 깨지지 않았다(값이 현재 게시물 문구와 일치하게 됐다).
- 도구 영향: `data.json`은 JSON으로 읽힘, `content.mjs`는 `node --check` 통과, `gen.py`는 구문 분석 통과. `gen.py`의 바뀐 곳은 사람이 쓴 판정 문자열(행 93) 하나라 로직 영향 0이다(스크래치 폴더 인자가 있어야 도는 도구라 재실행은 하지 않았다 — 재실행하면 `article_first_figcaption` 열은 기사에서 다시 읽혀 원래 글자가 돌아온다는 점만 참고). 시안 10개는 한글 25곳·로마자 14곳 모두 같은 제목 치환(카드 링크·제목 속성)이고, 시안을 만드는 두 도구(`content.mjs`·`data.json`)도 같은 값으로 바뀌어 서로 맞다.

## 6. updatedAt 미변경 — ✅
- 바뀐 게시물 56개(ko 28·en 24 수정 + 새 4)의 diff에 `updatedAt`·`translatedAt`·`publishedAt`·갱신 이력 줄 변경 0. 새 4파일은 HEAD 옛 파일과 같은 값.

## 7. 업로더 보고 2건

### 7-a. 자체 카드 이미지 2장 — 🟠 P2-1 (디자이너 재제작 대상)
- 이미지를 직접 열어 봤다(둘 다 1200×675, 자체 제작 표시).
  - `public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg`: 둘째 줄 "유튜버 [P146 전체 이름]씨", 셋째 줄 "[P145]·[P144] 2023년 봄 통화" — **P146·P145·P144, 셋 다 N1 비공인**.
  - `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg`: "[P172 전체 이름] 중령 동석" — **P172 중령, 비공인**(대령 이하 군인).
- 판정: 둘 다 **비공인 → 디자이너 재제작**. 문안은 이미 바뀐 `image.alt`(ko)·`imageAlt`(en)를 그대로 쓰면 된다(ko: "유튜버 ㅂ씨 … / 피고인 ㄴ씨·ㅇ씨 …", "중령 ㅇ씨 동석"). 지금은 alt와 이미지 글자가 달라 스크린리더 사용자와 화면 사용자가 다른 내용을 받는다.
- 같은 묶음에서 자체 카드 이미지가 있는 나머지 5개 게시물(geonwoo 2·shindawit 3)도 열어 봤다 → 전환 대상 이름 0(나오는 이름은 공인·역사 인물뿐). 7/7 확인.
- 이미지 파일명·경로는 그대로 두고 같은 경로에 덮어쓰면 게시물 수정이 필요 없다.

### 7-b. #6 ko description 161자 — 기준 위반 아님 (P3-2)
- `content/README.md`는 description 160자 초과를 **경고(오류 아님, 빌드 진행)** 로 정한다. validate도 🟡 경고로만 낸다. 같은 경고는 다른 게시물에도 이미 있다(예: 170자 1건). 원래 156자가 A-5 문안대로 바뀌며 161자가 됐다.

## 8. 산출물 이름·옛 id·저장소 독립 — ✅
- 업로더 트리거·업로더 오더·`history/2026-11-10.md`·이 리뷰 오더: 비공인 실명 0(2절 전수 검사), 옛 id 문자열 0, 홈 절대경로 0.
- 저장소 독립 grep(로컬 pre-commit 훅의 패턴 그대로): 업로더 17 변경의 추가 줄 전체 + 새 게시물 4 + 업로더 트리거·오더 + 이 도구 폴더 → **0건**.
- 이 트리거와 `docs/tools/reviewer-54/` 4개: 같은 이름 패턴 목록으로 검사 → 비공인 이름 0, 옛 id 0. 출력에 나온 기존 파일 이름 속 인명 조각 1개는 `…`로 가렸다.

---

## 결함·권고 목록

### P1 — 0건

### P2 — 1건
- **P2-1** 자체 카드 이미지 2장 속 비공인 실명(7-a). 대상: `public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg`(P144·P145·P146), `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg`(P172). 고칠 문안 = 각 게시물의 현재 ko `image.alt` 따옴표 안 문구(2·3·4줄). 같은 경로에 덮어쓰기. **디자이너 오더로 이어서 처리**(이번 커밋은 막지 않음).

### P3 — 6건 (모두 선택·후속)
- **P3-1** `docs/triggers/uploader-17-nonpublic-name-initials-1-COMPLETE.md` 4절 "P175: shindawit ko 11 + en 6 = 17파일" → "ko 11 + en 7 = 18파일". 합계 32파일은 맞다.
- **P3-2** #6 ko description 161자(경고만). 줄이려면 `content/posts/2026-09-12-peoplepower7-civic-group-head-dp-card.md`:4 끝의 "카드의 '실형 선고'와 달리 집행유예인 것으로 보도됐습니다." → "카드의 '실형 선고'와 달리 집행유예로 보도됐습니다."(158자, 뜻 같음).
- **P3-3** #6 en 20행 "He was charged with posting …" → "K was charged with posting …"(A-5의 "선택" 항목. 14·26행의 소문자 he는 원래 문장이라 그대로 둬도 됨).
- **P3-4** 오더 범위 밖 잔존(2차 오더 입력): D6 P176 표시 이름 — `docs/handoffs/translator-01-english-batch-1.md`:129, `docs/supervisor/drafts/2026-09-22-geonwoo-…-defense-reform-reel.md`:7 / N1S P217 성만 쓴 표기(한글·로마자) — `docs/handoffs/translator-01-english-batch-1.md`:145, `history/2026-10-25.md`:10(미추적 파일 — 커밋 전에 같이 정리하는 편이 낫다). 참고로 `content/posts/2026-11-01-eodguri-war-term-extension-claim.md`:4·29의 유튜브 채널명(P146 성이 든 채널명)은 출처 채널 표기이고 그 게시물은 출연자 이름을 적지 않았으므로 결함이 아니다.
- **P3-5** P020 판정 정정(3절): `docs/tools/reviewer-52/judgement-table-masked.tsv`의 P020 행을 (가) G1(전직 국회의원 — 공수처법 제2조 1호 나목, 퇴직자 포함)로 고치는 것을 다음 리뷰어·기획 오더에 넣는다. 게시물 쪽은 선택: 직위를 문장에 보이려면 두 게시물의 P020 문장에 "전 국회의원(17대)"을 넣고, 그 경력을 보도한 기사(위 경향신문 2019-02-16 인물 기사)를 `sources[]`에 추가한다 — 지금 출처 9건에는 그 경력이 없다.
- **P3-6** #6 옛 id 안에 로마자 전체 이름이 들어 있어, 기록 문서 14곳(리뷰어 52 A-6 목록 13파일 21줄 + 리뷰어 52 오더 7행)에 이름이 로마자로 남는다. 특히 `history/2026-10-01.md`:34는 같은 줄에서 이름을 ㄱ씨로 바꾸고도 바로 뒤 옛 id에 로마자 이름이 있어 가린 효과가 없다. 오더 5항(기록은 유지)대로라 결함은 아니지만, 슈퍼바이저 판단으로 이 history 줄만이라도 옛 id를 새 id로 바꾸는 것을 권한다(history는 슈퍼바이저 영역). 두 txt의 옛 id는 리다이렉트에 반드시 필요하다.

---

## 커밋할 경로 (업로더 17 범위 정확히)

**게시물·id 목록 (62)**
- `content/moved-ids.txt`, `content/retired-ids.txt`
- 삭제 4: `git status`의 ` D content/posts/…`·` D content/posts-en/…` 4줄(#6·P089 옛 파일 — 옛 id 문자열이라 여기 적지 않음. `git add -A content/posts content/posts-en`이면 함께 잡힌다)
- 새 4: `content/posts/2026-09-12-peoplepower7-civic-group-head-dp-card.md`, `content/posts-en/2026-09-12-peoplepower7-civic-group-head-dp-card.md`, `content/posts/2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard.md`, `content/posts-en/2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard.md`
- 수정 ko 28·en 24: 업로더 트리거 9절 목록과 같다(현재 `git status` 52줄과 줄 단위로 대조해 일치 확인)

**문서 (22)**
- `design/v0.3-responsive/{A1,A2,A3,B1,B2,B3,C1,C2,C3,final}/mockup.html`
- `docs/handoffs/translator-01-english-batch-1.md`, `docs/handoffs/translator-02-english-batch-2-opus.md`
- `docs/supervisor/drafts/2026-09-28-held-recheck.md`
- `docs/tools/designer-04-A/content.mjs`, `docs/tools/designer-04-B/data.json`, `docs/tools/reviewer-24/forbidden-terms-output.txt`, `docs/tools/reviewer-26/x-truncation-audit-output.txt`, `docs/tools/reviewer-30/gen.py`, `docs/tools/reviewer-30/image-recheck.tsv`, `docs/tools/reviewer-30/post-recheck.tsv`
- `docs/triggers/supervisor-2026-10-01-anticom-supervisor-ACK-COMPLETE.md`
- `history/2026-10-01.md` — ⚠️ 이 파일에는 작업 전부터 다른 세션이 덧붙인 67~96행이 함께 걸려 있다. 업로더 17의 변경은 34행뿐이다. 파일째 넣을지(나머지 줄도 같이 커밋) 슈퍼바이저가 정한다

**기록·트리거**
- `docs/triggers/uploader-17-nonpublic-name-initials-1-COMPLETE.md`, `instructions/uploader/processed/17-nonpublic-name-initials-1.md`
- `history/2026-11-10.md`(슈퍼바이저 영역 — 다른 세션 기록도 섞여 있음)
- 리뷰어 54: 이 트리거, `docs/tools/reviewer-54/`(4개), `instructions/reviewer/processed/54-uploader-17-review.md`
- 참고: 업로더 17이 기준으로 삼은 리뷰어 52 산출물(`docs/triggers/reviewer-52-nonpublic-name-audit-COMPLETE.md`, `docs/tools/reviewer-52/`, `instructions/reviewer/processed/52-nonpublic-name-audit.md`)도 아직 미추적이다. 함께 넣을지 슈퍼바이저 판단.

**판정하지 않은 다른 변경(목록만 — 업로더 17 범위 밖)**
- ` M history/2026-11-05.md`, ` M history/2026-11-09.md`
- 미추적: `history/2026-10-02.md` 외 history 28개(합계), `docs/tools/planner-07/` 원문 저장본 21개, `docs/tools/{designer-03,designer-05,programmer-14,reviewer-31}/screens…/`, 테스터 01 산출물(`docs/handoffs/tester-01-…`, `docs/qa/tester-01/`, `docs/tools/tester-01/`, `docs/triggers/tester-01-…`, `instructions/tester/processed/01-…`)

---

## 도구 (`docs/tools/reviewer-54/`, 모두 .mjs — tsc 대상 아님)
| 파일 | 내용 |
|---|---|
| `name-residual-scan.mjs` · `name-residual-scan-output.txt` | 저장소 밖 이름 패턴 TSV(키·정규식·범위)로 추적+미추적 텍스트 파일 전체를 찾아 키·파일:줄만 출력 |
| `appendix-line-check.mjs` · `appendix-line-check-output.txt` | 리뷰어 52 부록 N1·N1S·D6 위치를 읽어 HEAD 줄과 현재 줄이 다른지, id·파일명이 이전됐는지 확인(이름을 읽거나 출력하지 않음) |

## 수치
- 부록 위치 152 → 대상 141 / 처리 141(줄 137 + id 4) / 미처리 0.
- 이름 검사 텍스트 파일 1,972개(게시물 418/418). 게시물 잔존 0(P020 보류분 제외).
- D6 32/32파일, 문서 22/22파일 diff 직접 확인. 바뀐 게시물 56/56 updatedAt 불변.
- 기사 직접 열람: P020 게시물 출처 9/9(HTTP 200) + 경력 확인 기사 2/2. 카드 이미지 7/7 육안 확인.
- validate: ✅ 418/418, 오류 0, 이번 변경으로 새로 생긴 경고 1(#6 ko 161자).

## 한계(정직 표기)
- 성만 쓴 표기 검사는 해당 인물이 나오는 게시물 안에서만 했다(다른 게시물의 같은 성은 다른 사람과 구별할 수 없음). 그 게시물들 밖에서 이 인물들을 성만으로 쓴 줄이 있는지는 전체 이름 검색으로만 확인했다.
- `gen.py`는 저장소 밖 스크래치 폴더가 있어야 도는 도구라 다시 돌리지 않았고 구문 분석과 diff로만 확인했다.
