# 리뷰 — 프로그래머 09 · active-tag-chip-contrast + 테스터 02 · deployed-tag-nav-top12
**작성일**: 2026-10-13 12:20 | **작성 세션**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/processed/17-programmer-09-contrast-tester-02.md`

## 판정 요약

| 묶음 | 판정 | P1 | P2 | P3 |
|---|---|---|---|---|
| **A. 프로그래머 09** — 활성 칩 건수 숫자 대비 | ✅ **승인** (커밋 가능) | 0 | 0 | 1 (커밋 목록) |
| **B. 테스터 02** — 배포본 QA | ✅ **승인** (커밋 가능, 문서 정정 P3는 후속) | 0 | 0 | 6 (서술 정확도) |

- A: 주장 수치 전부 독립 재현됨. 리뷰 16 P2-1(2.29:1) **해소**.
- B: 요약↔본문↔로그 수치 **전 항목 일치**(§5). 결함은 모두 도구 메모·서술 표현 수준이며 판정·수치에는 영향 없다.
- 근거 로그: `docs/tools/reviewer-17/README.md`

---

## 1. A — 코드 리뷰 (임무 1)

`git diff -- src` = `src/components/tag-nav.tsx` 1파일, +2 −1줄(주석 1 + span className 1).

| 점검 | 결과 |
|---|---|
| 범위 | `TagChip` 건수 `<span>` class만. 비활성 쪽 문자열 `'text-muted-foreground'`는 이전과 동일, 칩 문구·`/tags` 모양 불변 ✅ |
| 삼항 vs `cn` | 두 값이 배타라 병합할 것 없음 — 타당. 부모 `Badge`의 `cn`(twMerge)과 무관한 자식 요소라 충돌 없음 ✅ |
| 토큰 | 새 토큰·`globals.css` 변경 없음. `--background` #ffffff 의 70% — 리뷰 16 §6 예시안 그대로 ✅ |
| 주석 | 이유(1.4.3·실측 출처) 1줄, 주변 주석 밀도와 맞음 ✅ |
| 다른 활성 표시 | `aria-current` 사용처 전수: `pagination.tsx:49`(배경 없음 span), `site-header.tsx:45`(`text-foreground`) — 같은 유형(검정 배경 + muted 글자) 없음 ✅ |

## 2. A — 재현 (임무 1)

| 항목 | 프로그래머 09 | 리뷰어 재현 | 방법 |
|---|---|---|---|
| 칩 HTML 전후 비교 | 4514칩 · class 외 차이 0 · class 차이 311(활성) | **동일** | 프로그래머 도구 재실행(변경 전·후를 `git archive` 복사본 2개로 분리 빌드) |
| 사이트 전 페이지 DOM 비교 | — | 715쪽 · 요소 **95,544** · class 외 차이 **0** · class 차이 **311건 1종** | 독립 도구 `dom-compare.py`(HTML 파서) |
| 활성 숫자 대비 전 | 2.29:1 (311) | **2.292** (311) | 독립 브라우저 스크립트(알파 합성 직접 계산), 328쪽 전수 |
| 활성 숫자 대비 후 | 9.14:1 (311) | **9.061** (311) · 수학 정확값 **9.105** | 〃 (차이는 캔버스 8비트 알파 양자화, README §3) |
| 비활성 숫자 대비 전·후 | 7.03 불변 (4203) | **7.032 불변** (4203) | 〃 |
| 칩 총수 | 4514 | **4514** = 311 + 4203 | 〃 |
| `color-mix` 미지원 경로 | 대체값 `var(--background)` → 17.72(이론) | **빌드 CSS 규칙 전문 확인** — `@supports` 밖 `color:var(--background)`, 안쪽만 `color-mix` → 미지원 시 #fff/#18181b = 17.72:1(계산) | `.next/static/css/*.css` |
| typecheck·lint·validate·build | ✅ · 경고 3(기존) · ✅ · 723쪽 | **동일** | `repo-checks.log` |
| `measure-tag-nav --expect-limit 12` | ✅ | **✅ 같은 수치** | 〃 |
| `clean-clone-gate.sh --worktree` | ✅ | **✅** (HEAD 545a720) | `clean-clone-gate-worktree.log` |

- 측정 사이 HEAD가 `02f51bc` → `545a720`로 바뀌었으나 `docs/supervisor/drafts/` 1파일뿐(`content/`·`src/` 변경 0) — 측정 영향 없음.
- `color-mix` 미지원 브라우저의 **실제 렌더**는 리뷰어도 하지 않았다 → **확인 필요**로 유지(위험 낮음: 캐스케이드상 결정적이고 대비는 오히려 17.72로 올라감. 그 경로에서는 숫자·태그명 위계만 사라진다).

## 3. A — 도구 파일 (임무 2)

| 파일 | lint·typecheck·빌드 영향 | 커밋 적합성 |
|---|---|---|
| `chip-html-snapshot.mjs` | lint 대상이지만 경고·오류 0(저장소 lint 출력에 없음). tsconfig 대상 아님(`.mjs`). 빌드 무관 | ✅ 읽기 전용(`.next` 읽고 지정 경로에 JSON 쓰기) |
| `contrast-measure.browser.js.txt` | `.txt`라 lint·typecheck 제외 | ✅ |
| `serve-url-list.mjs` | lint 경고·오류 0 | ✅ 비밀값 없음. 지정 JSON 1개를 CORS `*`로 3110 포트에 내주는 수동 실행 도구. 참고: `listen(3110)`은 모든 인터페이스에 열린다 — 쓸 때만 잠깐 띄우는 도구라 결함으로 보지 않음(다음에 손댈 일 있으면 `'127.0.0.1'` 지정 권장) |
| `*.log` | — | ✅ 홈 경로는 `$HOME`, 임시 폴더는 `<mktemp>` 치환 확인 |
| `*.png` 2장 | — | ✅ 청크 IHDR·iCCP(이름 `_`)·IDAT·IEND만, 텍스트 메타 없음 |

`docs/tools/` 안 `.ts`·`.tsx` 0개 확인(프로그래머 09·리뷰어 17 폴더).

## 4. A — 결함

| 등급 | 내용 | 조치 |
|---|---|---|
| **P3-A1** | 핸드오프 "커밋 대상 경로 목록" 마지막 줄에 `history/2026-10-13.md` 포함 — 리뷰 오더 임무 5("`history/*`는 넣지 않는다")·슈퍼바이저 11:43 기록과 어긋남 | 커밋 시 제외(아래 §8 최종 목록에 반영 완료). 핸드오프 수정은 불필요 |

---

## 5. B — 보고서 수치 대조 (임무 3)

요약(§0) ↔ 본문(§1~§9) ↔ 로그(`measure-log.md`) ↔ 핸드오프·트리거·history를 **전 항목** 대조했다.

| 대조 항목 | 요약 | 본문 | 로그 | 일치 |
|---|---|---|---|---|
| 게시물·태그 | 184 · 301 | §3 184 · 301 | §0 `{"postCount":184,"tagCount":301}` | ✅ |
| 리뷰어 16 시각 | 2026-10-12 18:53 | — | — | ✅ 리뷰 16 머리말과 같음 |
| §2 실측 6행 × (폭·nav·카드 top·넘침) = 24값 | 599/1920, 결함 0 | 95.20·721.51/701.51/701.51 · 60.80·530.92/506.92/506.92 | 95.195·721.508/701.508/701.508 · 60.797·530.922/506.922/506.922 · scrollWidth=clientWidth | ✅ 24/24 (소수 둘째 자리 반올림) |
| `/tags` 2행 × (폭·li·기대·넘침) = 8값 | 301 = 301 두 폭 | 599·1920 / 301 / 301 / 없음 | 동일 + ul 높이 | ✅ 8/8 |
| 가로 넘침 조합 수 | 8개 | §2 6 + §3 2 = 8 | 8 | ✅ |
| Tab 순회 | 300회 이동 · 301개 · 스킵 0 | 마지막 `#kbs` idx 300 | 1+5+43+50+50+50+50+51 = **300**, 체크포인트 1·6·49·99·149·199·249·300 = 누적합과 일치 / 100×3 = 300 | ✅ |
| `/` 탭 순서 | 칩→전체보기→첫 카드 | 동일 | 첫 칩 focus 후 Tab×12 → 전체보기(칩 11개 + 1), +1 → 첫 카드 | ✅ 산술 맞음 |
| 회귀 | `/en`·`/en/page/2` 0 | 0 · 0 | JSON 2건 | ✅ |
| 스크린샷 | — | 8장 | — | ✅ 파일 8개, 트리거 "8장" |
| 판정 | 조건부 통과 · 신규 결함 0 | §8 0건 | — | ✅ 핸드오프·트리거·history 동일 |

**배포본 소량 재확인**(12:09:39, 요청 3회): `/tags` li **301**·첫 `dmz`·마지막 `kbs` · `/` 칩 **12**·"전체 태그 보기 (**301**개)"·`#dmz` 40/"게시물 40건" · `/en` nav **0** · `x-frame-options: DENY` — 보고서 값과 전부 일치. (리뷰어 자기 기록: CLAUDE.md §9 "배포 도메인 `curl` 1~2회"보다 1회 많은 3회 요청 — 페이지 3개를 한 번씩 받았다.)

**"확인 필요" 범위**: 390px·1280px 정확 폭 · 실제 VoiceOver 음성 · iOS Safari 실기기 4건 — 모두 실제로 수행하지 못한 항목이며 대체 조치와 사유가 붙어 있다. 수행한 항목을 "확인 필요"로 미룬 것은 없다. (1280px는 오더 임무 2가 "실제 폭 기록"만 요구해 엄밀히는 미요구 항목이지만, 디자이너 01 맥락을 이어받은 표기이고 보고서가 스스로 "수치는 유효"라고 밝혀 과장 아님.)

**결론 과장 여부**: "조건부 통과"는 390px 미재현을 반영한 적절한 수위. VoiceOver는 "조건 충족"까지만 쓰고 음성 단정을 피했다 ✅. 예외 1건은 P3-B6.

## 6. B — 도구 메모 사실성 (임무 4)

| 메모 | 리뷰어 확인 | 평가 |
|---|---|---|
| `resize_window` 무반응 | 1회 재현: 도구는 "Successfully resized … 390x844" 반환, `innerWidth` 1920 불변 | 관찰 사실 ✅. 다만 로그 §1-1 "탭 생성 시점에 고정된 뷰포트를 바꿀 수 없는 **도구 결함**"은 원인 단정 → P3-B3 |
| `X-Frame-Options: DENY` | curl 헤더로 확인 ✅ | 사실. 단 함께 적은 "CSP `frame-ancestors 'none'`"은 실제로 **`content-security-policy-report-only`** 헤더(강제 아님) → P3-B2 |
| "screenshot 선행 시에만 key 전달" | 1회씩 재현: ① 스크린샷 없이 Tab → 안 움직임(직전 `document.hasFocus()` false) ② screenshot → Tab → 이동 ③ **스크린샷 없이 Tab → 이동** | ①②는 테스터 관찰과 같지만 ③이 일반 규칙("직전 screenshot 없으면 전달 안 됨", 핸드오프 "매번")과 어긋남. 관찰 가능한 사실은 "페이지가 포커스 없는 상태의 첫 키가 소비됐다"까지 → P3-B1 |

## 7. B — 결함 (모두 P3, 커밋 비차단)

| 등급 | 위치 | 내용 | 정정 지시 |
|---|---|---|---|
| **P3-B1** | `measure-log.md` §4-0, `report.md` §4 ⚠️, 핸드오프 미해결 3번째 | "직전 `screenshot` 없으면 Tab이 전달되지 않는다 / screenshot → key면 매번 반영"은 리뷰어 재현 ③(스크린샷 없이 Tab 정상 이동)과 맞지 않는 일반화. 시행 횟수도 기록 없음 | "포커스 없는 페이지에서 첫 키가 소비된 사례 n회 관찰, screenshot 후 반영. 원인 확인 필요"로 관찰 범위·횟수만 적는다 |
| **P3-B2** | `measure-log.md` §1-2 | 차단 원인에 "CSP `frame-ancestors 'none'`" 병기 — 해당 CSP는 Report-Only라 차단하지 않는다. 실제 차단은 `X-Frame-Options: DENY` | "(CSP는 Report-Only로 `frame-ancestors 'none'` 보고만)"으로 정정 |
| **P3-B3** | `measure-log.md` §1-1 | "탭 생성 시점에 고정된 뷰포트를 바꿀 수 없는 도구 결함으로 재확인" — 메커니즘 단정. 관찰 사실은 "호출 성공 응답에도 `innerWidth` 불변" | 관찰 사실만 남기고 원인은 "확인 필요" |
| **P3-B4** | `measure-log.md` 32행(§1-3) | "리�이어" — U+FFFD 깨진 문자(파일 자체는 유효 UTF-8) | "리뷰어"로 정정 |
| **P3-B5** | 핸드오프 "다음 세션 가이드 — 슈퍼바이저" | "리뷰어 게이트 없이도 … 바로 커밋할 수 있다" — CLAUDE.md §5(묶음 완료 시 무조건 리뷰어 게이트, 예외는 리뷰어 산출물·`content/posts/`뿐)와 충돌하는 안내. 실제로는 슈퍼바이저가 게이트를 거쳐 피해 없음 | 해당 문장 삭제. 테스터 오더·템플릿에 "커밋 경로 판단은 슈퍼바이저 몫"을 명시 권장 |
| **P3-B6** | `report.md` §4 표 4행 | "`/tag/1군단` 맨 앞 활성 칩이 **첫 탭 정지점**" — 근거(로그 §4-2)는 nav 안 DOM 순서와 `.focus()`이며 페이지 첫 Tab 정지점(헤더 링크가 앞)을 잰 것이 아님 | "nav 안 첫 탭 정지점(DOM 순서)"으로 범위 한정 |

정정은 보고서 수정 권한이 있는 테스터 후속 오더로(다음 테스터 오더에 묶어도 됨). 본 리뷰가 커밋에 함께 들어가면 정정 기록 역할을 한다.

---

## 8. 커밋 대상 최종 목록 (임무 5)

**저장소 독립 grep**: A·B 후보 32파일(이미지 10장 포함, `grep -a`) 0건 · 리뷰어 17 산출물 0건. 이미지 메타: JPEG 8장 JFIF·DQT·SOF0·DHT만(EXIF·XMP·COM 없음), PNG 2장 텍스트 청크 없음. 상세 `docs/tools/reviewer-17/README.md` §8.

```
# A. 프로그래머 09
src/components/tag-nav.tsx
docs/tools/programmer-09/README.md
docs/tools/programmer-09/chip-html-snapshot.mjs
docs/tools/programmer-09/contrast-measure.browser.js.txt
docs/tools/programmer-09/serve-url-list.mjs
docs/tools/programmer-09/build-before.log
docs/tools/programmer-09/build-after.log
docs/tools/programmer-09/chip-snapshot-before.log
docs/tools/programmer-09/chip-snapshot-after.log
docs/tools/programmer-09/chip-html-compare.log
docs/tools/programmer-09/measure-tag-nav.log
docs/tools/programmer-09/typecheck-lint.log
docs/tools/programmer-09/validate-content.log
docs/tools/programmer-09/clean-clone-gate-worktree.log
docs/tools/programmer-09/before-tag-1gundan-chips.png
docs/tools/programmer-09/after-tag-1gundan-chips.png
docs/handoffs/programmer-09-active-tag-chip-contrast.md
docs/triggers/programmer-09-active-tag-chip-contrast-COMPLETE.md
instructions/programmer/processed/09-active-tag-chip-contrast.md

# B. 테스터 02
docs/qa/tester-02/report.md
docs/qa/tester-02/mobile599-home.jpg
docs/qa/tester-02/mobile599-tag-1gundan.jpg
docs/qa/tester-02/mobile599-tags.jpg
docs/qa/tester-02/desktop1920-home.jpg
docs/qa/tester-02/desktop1920-tags.jpg
docs/qa/tester-02/keyboard-home-viewall-focus.jpg
docs/qa/tester-02/keyboard-tag1gundan-active-chip-focus.jpg
docs/qa/tester-02/keyboard-tags-last-chip-kbs-focus.jpg
docs/tools/tester-02/measure-log.md
docs/handoffs/tester-02-deployed-tag-nav-top12.md
docs/triggers/tester-02-deployed-tag-nav-top12-COMPLETE.md
instructions/tester/processed/02-deployed-tag-nav-top12.md

# 리뷰어 17 (CLAUDE.md §5 — 슈퍼바이저 직접 Read 후)
docs/reviews/programmer-09-contrast-tester-02-review.md
docs/tools/reviewer-17/README.md
docs/tools/reviewer-17/dom-compare.py
docs/tools/reviewer-17/contrast-sweep.browser.js.txt
docs/tools/reviewer-17/chip-compare.log
docs/tools/reviewer-17/repo-checks.log
docs/tools/reviewer-17/clean-clone-gate-worktree.log
docs/triggers/reviewer-17-programmer-09-contrast-tester-02-COMPLETE.md
instructions/reviewer/processed/17-programmer-09-contrast-tester-02.md
```
합계 41파일 (A 19 · B 13 · 리뷰어 9).

**넣지 않는 것**: `history/*`(2026-10-01 수정분·10-02~10-13 미추적 포함, 슈퍼바이저 별도 판단), 프로그래머 09 핸드오프 목록의 `history/2026-10-13.md`(P3-A1), 범위 밖 미추적 — `docs/qa/tester-01/`·`docs/tools/tester-01/`·테스터 01 핸드오프·트리거·오더(리뷰 14 대상, 이번 묶음 아님), `docs/tools/planner-07/*.html·*.xml`(수집 원문 덤프, 리뷰 15 범위).

**커밋 절차 권고**: 위 41개만 `git add` → `bash docs/tools/programmer-07/clean-clone-gate.sh --staged` ✅ → pre-commit 훅 통과 → 커밋·푸시 → Vercel status success 확인 후 배포본 `/tag/1군단` 활성 칩 숫자 class `text-background/70` 반영 `curl` 1회.

## 9. 다음 세션 가이드
- **슈퍼바이저**: §8 목록으로 커밋. P3-B1~B6 정정은 다음 테스터 오더에 묶어 발행(긴급 아님).
- **테스터(다음)**: claude-in-chrome 키보드 테스트 시 키 전송 전 `document.hasFocus()`를 기록하고, 첫 키 소비 여부를 횟수와 함께 남긴다(P3-B1).
- **확인 필요(이월)**: `color-mix` 미지원 브라우저 실렌더 · 390px 정확 폭 · 실제 VoiceOver · iOS Safari 실기기.
