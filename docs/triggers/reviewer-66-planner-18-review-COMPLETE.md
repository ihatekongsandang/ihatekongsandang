# reviewer-66 — 기획자 18(자체 카드 0건 문서 정리·선례 4건) + guide §4-1 반영분 검토 — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11 · 하위 에이전트 · 문서만(빌드·git 쓰기·코드 수정 0)
- 오더: `instructions/reviewer/processed/66-planner-18-review.md`(이동)
- 대상: 기획자 18 트리거·오더, `git diff` 기준 `planning/{q1-redirect-q2-sns-image-plan,v0.9-copy-and-code-list,prd,card-image-policy,card-image-uploader-steps}.md`, `content/README.md`, `docs/poster/guide.md` §4-1(슈퍼바이저 반영분)
- 수정한 파일: 이 트리거뿐

## 판정: **조건부 통과** — P1 0 · P2 1 · P3 3
P2-1(항 수 "11항"이 현행 규칙 문서 3곳에 남음)을 고친 뒤 커밋하기를 권한다. 업로더 점검 목록에서 새 12항이 빠질 수 있는 문제라서다. 한 줄씩 바꾸면 되는 수정이다.

## 1. 사실 확인
| 항목 | 결과 |
|---|---|
| 자체 카드 0 | ✅ `content/posts*`의 `/images/` 참조 0, 추적 중인 `public/images`는 `.gitkeep`만, `validate:content` "self 0 · public 0 · news 33"(직접 실행), `kind: news` 33파일 |
| 묶음별 ②/③과 커밋 | ✅ 커밋 제목 그대로: e7ff1cd ②4·③1(남은 62) · 665f66c 3·9(50) · 4e732d3 3·8(39) · 05319ff 0·10(29) · 253bcef 0·29(0) → ② 10 · ③ 57, 합 67 |
| 착수 조건 a~e 근거 | ✅ a 7e8b2fd(기획 v0.9 "기획자 13·15·15-1, 리뷰 32", planning 5파일) · b 0e5fb93(`docs/poster/guide.md` +22 "업로더 guide §4-1 카드 이미지")·c8375de(guide 보강) · c 0e5fb93(`docs/operations/hotlink-check-log.md` 신설, "매주 월요일(KST)") · d 0e5fb93("사진 설명 표시·검증(프로그래머 15)") · e 6f0f941("C3·C4·C5"), 후속 059d5a5(SNS 줄)·f5f2f9e(자체 카드 줄) — `git show --stat`로 모두 확인 |
| `content/README.md` 195행 | ✅ "현재 `self` 이미지는 0건" — 사실과 맞음, diff는 이 줄 1개 |

## 2. 소개 문안 = 화면
- q1 §2.2 ko·v0.9 목록·q1 §2.2 en의 2번 하위 목록은 모두 **3개**다. `docs/tools/programmer-18/copy-exact-about.py`의 기대 문자열(리뷰 65에서 빌드 화면과 31/31 일치 확인, 그 뒤 `src/` 변경 0)과 굵게 표시를 뺀 글자를 비교했고, 세 곳 모두 **완전히 같다**.
- ※ 문단: ko(q1 160행·v0.9 62행)는 앞뒤 빈 줄이 있다 ✅. en(q1 187행)은 `>` 빈 줄로 앞뒤를 갈랐다 ✅ — 리뷰 58-1 P3-1 해소.

## 3. 선례 4건 — 문서 사이 일치
| 선례 | 정책 | 업로더 지침 | guide §4-1 | 같은 뜻 | 판단 표기 |
|---|---|---|---|---|---|
| (a) 명패·현판·간판 | §5.3-12 | 단계 2 5번 "12항" | "명패·현판·간판" 줄 | ✅ (①비공인 실명 ②의혹 대상 비공인 단체·사업장, 원본 해상도, 애매하면 불가, 공인 명패·공적 기관·일반 상호 제외) | 정책 ✅ "슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경" · guide는 "(슈퍼바이저 판단 2026-11-11)"만 → P3-2 |
| (b) 의혹 조직 비공인 | §3.3 (나) 5항 | (단계 2 6번은 §3.3 참조) | 원경 줄 아래 하위 줄 | ✅ | 정책·guide ✅ |
| (c) sources 한정 | (§14 표 ⑤) | 단계 2 1번 | "후보 사진은 … `sources[]`에서만" 줄 | ✅ | 업로더 ✅ · guide 표기 없음 → P3-2 |
| (d) n명 이상 | §3.5 | 단계 2-1 기록 형식 | frontmatter 줄 | ✅ | 정책 "(리뷰 59 P3-1, 슈퍼바이저 판단 2026-11-11)" — "사용자 이의 시 변경" 빠짐 → P3-2 |

## 4. 기존 규칙과 충돌
- (나) 5항은 3b 허용 조건 2항(게시물 당사자 비공인 제외)과 같은 취지를 넓힌 것이라 충돌하지 않는다. (다) 원경 기준으로 넘기는 구조도 §3.3과 맞다.
- 12항 ①은 PRD §6③(비공인 이니셜)·guide §2(사적 개인 보호)와 같은 방향이다. ②는 의혹 대상 단체 이름이 화면에 박히는 결합 위험을 막는 항이라, 11항(자막 단정형)과 겹치지 않는 별개 사유로 적힌 것이 맞다.
- 작은 어긋남: §3.3 표 150행 "(나) 허용 — 아래 1~3 조건"과 153행 "(기존 1~3항 그대로, 4항은 …)"이 새 5항을 가리키지 않는다 → P3-1.

## 5. 문서만·저장소 독립
- ✅ `git status` 기준 `src/`·`content/posts*`·`public/`·`scripts/` 변경 0. 바뀐 것은 planning 5개 · `content/README.md` · `docs/poster/guide.md`와 미추적 트리거·오더뿐이다.
- ✅ 바꾼 7개 문서·기획자 18 트리거·오더: 다른 서비스명·계정·홈·임시 절대경로 grep 0, `moved-ids.txt` 옛 id 0, 추가 줄의 "이름+직함" 패턴 0(선례는 "묶음 N #M"으로만 인용), 사진 기자 이름 0.

## 결함과 고칠 문안
**P1: 0건**
- **P2-1 "제외 11항"이 현행 규칙 문서 3곳에 남음** — 12항이 생겼는데 항 수 표기가 그대로다. 기획자 트리거는 "다른 문서의 '§5.3 11항'은 자막 단정형 항을 가리킨다"고 했지만, 아래 3곳은 항 수(전체 점검)를 뜻한다.
  - `planning/card-image-uploader-steps.md` 227행 "제외 점검 11항 결과(자막 단정형 포함)" → "제외 점검 12항 결과(자막 단정형·명패 포함)"
  - 같은 문서 229행 묶음 게이트 "④ 제외 11항" → "④ 제외 12항"
  - `planning/prd.md` 319행 "제외 기준 11항(… **자막 단정형 화면** 등)" → "제외 기준 12항(… **자막 단정형 화면**·명패·현판·간판의 비공인 이름 등)"
  - 남겨도 되는 곳: 업로더 지침 4행(15-1 이력), 정책 415행(리뷰 30 대응표 이력), guide 100행은 이미 "12항"이다.
- **P3-1 정책 150행·153행**: "허용 — 아래 1~3 조건" → "허용 — 아래 조건(1~3 충족, 4·5 해당 시 불성립)", 153행 머리 → "(3b — 기존 1~3항 그대로, 4항은 (다)·원경 기준으로 바뀜, 🆕 18: 5항 추가)".
- **P3-2 판단 표기 통일**: 선례 4건은 모두 "슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경"을 붙이기로 했다. 다음 세 곳을 맞춘다.
  - guide §4-1 명패 줄 끝 "(슈퍼바이저 판단 2026-11-11)" → "(슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경)"
  - guide sources 줄과 frontmatter 줄의 "n명 이상"에 같은 괄호를 붙인다(guide는 슈퍼바이저 파일)
  - 정책 §3.5 "(리뷰 59 P3-1, 슈퍼바이저 판단 2026-11-11)"에 ", 사용자 이의 시 변경"을 붙인다
- **P3-3 날짜 오기**: q1 160행·187행, v0.9 62행의 ※ 문단에 "프로그래머 18(2026-11-10, 커밋 f5f2f9e)"로 적혀 있다. 그런데 프로그래머 18 트리거는 2026-11-11 08:52, 커밋 f5f2f9e는 2026-11-11 08:56(+0900)이다 → "2026-11-11"로 고친다(en "programmer 18 (2026-11-11, …)").

## 커밋 경로 (이 오더 대상만)
- `planning/q1-redirect-q2-sns-image-plan.md`
- `planning/v0.9-copy-and-code-list.md`
- `planning/prd.md`
- `planning/card-image-policy.md`
- `planning/card-image-uploader-steps.md`
- `content/README.md`(195행 1줄)
- `docs/poster/guide.md`(§4-1 슈퍼바이저 반영분 — P3-2 반영 권장)
- `docs/triggers/planner-18-self-card-zero-docs-and-precedents-COMPLETE.md`
- `instructions/planner/processed/18-self-card-zero-docs-and-precedents.md`
- `docs/triggers/reviewer-66-planner-18-review-COMPLETE.md`
- `instructions/reviewer/processed/66-planner-18-review.md`

(`history/*.md`는 여러 세션 기록이 섞인 슈퍼바이저 파일이라 따로 처리한다. 작업 트리의 다른 미추적 파일 — tester-01·planner-07 등 — 은 이 오더 대상이 아니다.)

## 66-1 (기획자 18-1 + 슈퍼바이저 guide 수정 재확인, 2026-11-11 — 문서만, git 쓰기 0)
**판정: 통과** — P1 0 · P2 0 · P3 0. 리뷰 66의 P2-1·P3-1~3이 모두 해소됐다.

| 항목 | 결과 |
|---|---|
| P2-1 항 수 | ✅ 업로더 지침 227행 "제외 점검 12항 결과(자막 단정형·명패 포함)", 229행 "④ 제외 12항", PRD 319행 "제외 기준 12항(…·명패·현판·간판의 비공인 이름 등)" |
| P3-1 정책 (나) | ✅ 150행 "허용 — 아래 조건(1~3 충족, 4·5 해당 시 불성립)", 153행 "🆕 18: 5항 추가" |
| P3-2 판단 표기 | ✅ 정책 §3.5 188행에 ", 사용자 이의 시 변경" 추가. guide §4-1의 명패(§5.3-12)·sources(단계 2의 1번)·n명 이상(정책 §3.5) 3줄 모두 "(슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경)" |
| P3-3 날짜 | ✅ q1 160·187행, v0.9 62행 모두 "프로그래머 18(2026-11-11, 커밋 f5f2f9e)" / "programmer 18 (2026-11-11, …)" |

**"11항" 잔존 grep** (`planning/*.md`·`docs/poster/guide.md`·`content/README.md` 전체에서 `11항`)
- 4건이 나왔고 모두 제외 대상이다. 그래서 항 수(전체 점검)를 뜻하는 현행 "제외 11항"은 **0건**이다.
  - 정책 294행: 12항 본문 속 "11항의 '자막 단정형'과 별개" — 자막 항을 가리키는 참조
  - 정책 415행: 리뷰 30 대응표 이력
  - 업로더 지침 4행: 15-1 이력
  - PRD 17행: v0.9 버전 이력
- 문서만 바뀌었다(`src/`·`content/posts*`·`public/`·`scripts/` 변경 0). 추가 줄의 저장소 독립 grep도 0이다.

### 최종 커밋 경로
`planning/q1-redirect-q2-sns-image-plan.md` · `planning/v0.9-copy-and-code-list.md` · `planning/prd.md` · `planning/card-image-policy.md` · `planning/card-image-uploader-steps.md` · `content/README.md` · `docs/poster/guide.md` · `docs/triggers/planner-18-self-card-zero-docs-and-precedents-COMPLETE.md` · `instructions/planner/processed/18-self-card-zero-docs-and-precedents.md`(18-1 오더가 따로 있으면 그 processed 파일도) · `docs/triggers/reviewer-66-planner-18-review-COMPLETE.md` · `instructions/reviewer/processed/66-planner-18-review.md`
