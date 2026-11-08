# 리뷰: 프로그래머 10 — 인스타그램 수집 실패 조사 + guide §3 변경

**리뷰어**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/22-programmer-10-instagram-collect-review.md` | **작성**: 2026-11-08 22:00

**대상**: `docs/tools/programmer-10/`(instagram-collect-report.md·codes.txt·reproduce.py·reproduce-output.tsv·uploader-attempts.py·uploader-attempts-output.tsv), `docs/handoffs/programmer-10-instagram-collect-investigation.md`, `docs/triggers/programmer-10-instagram-collect-investigation-COMPLETE.md`, `git diff -- docs/poster/guide.md`(작업 트리)

**선행 검토**: 오더 `instructions/programmer/processed/10-instagram-collect-investigation.md`, guide §2·§3, history 10-11~10-29·11-08(업로더 수집 기록, 재처리 21:48), 재처리 트리거 `poster-2026-11-08-instagram-recollect-24-COMPLETE.md`, `.git/hooks/pre-commit` PATTERN

---

## 1. 판정

### ✅ 승인 (P1 0 · P2 0 · P3 7 — 커밋 전 수정 권장, 차단 사유 아님)

결론(가)와 원인 판정은 출력으로 뒷받침된다. 보고서 재현 표 31행은 `reproduce-output.tsv`와 **31/31, 14개 측정 열 + 판정 2열 전부 일치**한다. 집계(18건 중 A 16·B 16, 추가 8건 중 A 7·B 8, 대조 5/5)도 tsv로 다시 계산한 값과 같다. 리뷰어가 guide 명령으로 표본 2건을 다시 요청해도 같은 결과가 나왔다. 업로더가 21:48에 재처리한 24건(23건 `CaptionUsername`=1, 1건 og)이 권고대로 수집된 것도 별도 확인이다.

오더 금지 항목 위반, 원문 저장, 저장소 독립 위반은 없다. guide §3 변경은 제안 문안과 뜻이 같고 업로더가 따를 수 있다. 다만 실패 유형 하나(마커 0인데 "may be broken" 문구도 없음)의 처리가 빠졌다(P3-7).

| 구분 | 결과 |
|---|---|
| 보고서 표 ↔ `reproduce-output.tsv` | 31/31 행, 불일치 0 (스크립트 대조 — `docs/tools/reviewer-22/crosscheck.py`) |
| 집계 재계산 | fail18 16/16/16 · fail-extra 7/8/8 · control 5/5/5 — 보고서와 일치 |
| 당시 UA 집계(`uploader-attempts-output.tsv` 126행) | plain 99(마지막 10/29 03:38Z) · chrome130-full 25(10/29 03:52Z~11/08 12:18Z) · other 2 — 보고서 서술과 일치 |
| Chrome UA 응답 크기 | 25건 499,901~512,880B — 일치 |
| 마커 출력이 남은 Chrome UA 기록 | 18건, 전부 0 — 일치 |
| 리뷰어 재요청(guide 명령, 2건) | 성공 표본·차단 표본 모두 보고서와 같음(§2.3) |
| 금지 항목·원문·독립 grep | 위반 0 |

---

## 2. 결론 검증 (임무 1)

### 2.1 원인 판정 — 타당
- 근거 3개가 서로 맞물린다. ① 10/01~10/29 03:38Z plain UA 99회 사이에는 연속 실패가 없다. ② 03:52Z부터 Chrome/130 UA 25회는 전부 약 50만B 응답에 마커 0이다. ③ 같은 25개 코드 가운데 삭제·차단 3건을 뺀 22건이 지금 plain UA로 221,853~315,050B 응답을 받고 마커가 있다.
- 남은 공백: 지금 Chrome UA로 다시 요청해 보는 대조(C)는 하지 못했다. 그래서 "Chrome UA면 JS 전용 페이지가 온다"는 기전은 당시 기록으로만 뒷받침된다. 보고서가 이를 숨기지 않고 적었다. 프로그래머 세션에서 권한 분류기가 거부한 요청이므로 **리뷰어도 대신 실행하지 않았다.** 기전 확인이 꼭 필요하면 사용자가 권한을 판단할 일이다. 판정("주원인 — 실측 근거 있음")의 강도는 적절하다.
- history 10/29 12:52 기록("다른 User…")은 업로더가 "새 형식"으로 오인한 뒤 UA를 바꿔 본 흐름과 맞는다. 전환 사유를 "확인 필요"로 둔 것도 맞다.

### 2.2 성공 판정 기준 — 타당
- A: `EmbeddedMediaImage` src가 cdninstagram/fbcdn이고 `CaptionUsername`이 있음. B: og:title이 일반 문구 "Instagram"이 아니고 description·image가 비어 있지 않음. 두 기준 모두 내용 확보 여부를 직접 재고, 일반 제목 "Instagram"을 실패로 거른 것도 맞다(`reproduce.py` 52행).
- B 성공은 캡션이 잘릴 수 있고 첫 이미지만 준다는 한계를 보고서가 적었다(§4·§5-2).

### 2.3 리뷰어 재요청 (guide §3 명령 그대로, 2건, 요청 사이 4초, 원문은 세션 scratchpad에만)
| 코드 | 보고서(A) | 리뷰어 21:56 KST |
|---|---|---|
| `DfCZVaSBZDU` | 200 · 227,937B · 이미지 ✅ · 계정명 ✅ | 200 · 228,046B · `CaptionUsername` 1 · cdn 이미지 1 · "may be broken" 0 |
| `DfFKqzZTmpx` | 200 · 180,382B · ❌ · "may be broken" ⚠️ | 200 · 180,492B · `CaptionUsername` 0 · cdn 이미지 0 · "may be broken" 1 |

---

## 3. 오더 제약 준수 (임무 2)
- 로그인·쿠키·토큰·계정 생성·유료 API: 스크립트에 `token`·`cookie`·`sessionid`·`password`·`-b` 0건. 크롤러 UA 위장은 시험하지 않았고, 공식 oEmbed는 요청하지 않았다.
- 요청량: 31코드 × (A 1 + B 1) = 62회, 요청 사이 4초. "건당 1~2회" 안이다.
- 원문 비저장: `docs/tools/programmer-10/` 6파일은 전부 텍스트 측정값이다(`file` 확인 — HTML·이미지 0). tsv에는 코드·불리언·숫자만 있고 캡션 글은 없다(글자 수만).
- 업로더 세션 기록 추출값: `uploader-attempts-output.tsv`는 시각·UA 분류·코드·크기·마커 수뿐이다. 인스타그램 계정명(`@…`) 0건, 세션 파일 경로 0건.
- 저장소 독립: 대상 9파일(도구 6 + 핸드오프·트리거 + guide diff 추가 줄)에 대해 pre-commit PATTERN + 홈 절대경로 + 세션 기록 경로 패턴 grep → 0건.

## 4. 도구 (임무 3)
- `reproduce.py`: `codes.txt`를 저장소 루트 기준 상대경로로 읽는다. `--measure-only`로 요청 없이 다시 잴 수 있다. 원문은 인자로 받은 폴더에만 쓴다 → 재실행 가능. 다만 그 폴더가 저장소 안이어도 막지 않는다(P3-6).
- `uploader-attempts.py`: 요청 없이 세션 기록에서 측정값만 뽑는다. 입력 경로는 인자로만 받고 출력에 경로를 남기지 않는다. 다만 세션 기록은 저장소 밖 로컬 파일이라 다른 환경에서는 재실행할 수 없다. 이 한계는 보고서 §6에 암묵적으로만 드러나 있다(차단 사유 아님).

## 5. guide §3 변경 (임무 4)
| 제안 문안(보고서 §5-4) | guide 작업 트리 | 판정 |
|---|---|---|
| UA 고정 + "브라우저 전체 UA(Chrome/… 등)로 바꾸면 JS 전용 페이지(약 50만 바이트)" + 원인 기간·건수 | 같은 뜻, 🔴 표시와 보고서 경로 추가 | ✅ |
| curl 명령 | 기존 줄 그대로(변경 없음) | ✅ |
| 성공 확인 `grep -c 'class="CaptionUsername"'` → 1 | 같음 | ✅ |
| "may be broken" → og:draft → 비면 캡처 | 같음("0이면 다음 순서로") | ✅ — 단 P3-7 |
- 업로더가 이 순서를 그대로 따라 24건을 처리했다(재처리 트리거: 23건 `CaptionUsername`=1, `DfDolMhEoz-`는 'may be broken'이라 og:draft). → **따를 수 있음.**

---

## 6. 결함 (전부 🟡 P3 — 보고서·도구 정정, 결론 영향 없음)

| # | 위치 | 내용 | 수정 지시 |
|---|---|---|---|
| P3-1 | 보고서 §2 표 1행 `Des0mDXEZbq` "10/21 plain·378943B", §3 ② "당시 plain UA 요청도 378,943B" | `uploader-attempts-output.tsv` 93·94행에는 이 코드가 plain 1회 + other 1회로 있고 **크기 열이 비어 있다.** 378,943은 저장소 어디에도 출처가 없다(`grep` 보고서 1곳뿐). 리뷰어가 같은 세션 기록을 같은 방식으로 읽어 보니, 10/20 23:21Z에 plain 명령(크기 출력 없음)과 **iPhone UA 명령(출력 377,814·379,165)**이 있었다 | 1행을 tsv에 맞춰 "plain 1·기타 UA 1, 크기는 출력 미기록"으로 고친다. 378,943 근거를 밝히지 못하면 지운다. ② 결론(원인 확인 필요)은 유지 |
| P3-2 | §3 ① "같은 코드에 지금 guide 명령을 쓰면 **23건**이 221,853~315,050B" | Chrome UA 25건 − 삭제·차단 3건 = **22건**(tsv 재계산). 23은 `Des0mDXEZbq`(plain 시기)를 더한 재수집 가능 수다 | "22건"으로 고치거나 "재수집 가능 23건(Chrome 22 + 10/21 1)"으로 분리 |
| P3-3 | §2 표 아래 "26번 `Dfa3L7WAcfH`" | 표에서는 31번 행이다 | "31번" |
| P3-4 | §3 ① "plain UA 99회 가운데 history에 embed 실패로 남은 것은 … 2건" | history에 plain 시기 embed 차단이 더 있다: `DeYbd6oxCmZ`(10/13 "embed 차단으로 og 캡션·썸네일 확인"), `Deb42URAdkO`(10/14 "embed 차단·캡션 없음, og로 첫 장"). 최소 4건이다. 모두 1회성 ④ 유형이라 결론은 같다 | "4건(10/13·10/14·10/20 embed 차단 ④ 유형 3 + 10/21 ②)"으로 고친다 |
| P3-5 | `uploader-attempts-output.tsv` 머리글 "small_counts(… — 11/04 이후 명령만)" | 마커 수는 10/29 04:55Z `DfCPqoxmvJ1`부터 찍혀 있다(18건). 머리글 설명이 실제 범위와 다르다 | 스크립트 주석·머리글을 "마커 수를 출력한 명령만"으로 |
| P3-6 | `reproduce.py` 8~10행 | 원문 폴더가 저장소 안이어도 그대로 쓴다. 실수로 `docs/tools/…`를 넘기면 원문 HTML이 저장소에 들어간다 | `git rev-parse --show-toplevel` 아래면 중단하는 가드 1줄 |
| P3-7 | guide §3 추가 줄 "0이면 다음 순서로: 'may be broken' 문구 있음 → …" | `CaptionUsername` 0인데 "may be broken" 문구도 **없는** 경우를 다루지 않는다. 이번 실패 25건(Chrome UA JS 페이지)과 10/21 건이 바로 이 유형이다 | "문구가 없으면 → 먼저 명령·UA가 위 줄 그대로인지 확인 후 1회 재요청 → 그래도 0이면 og:draft → 캡처" 한 줄 추가(슈퍼바이저 고유 영역 문서) |

---

## 7. 커밋 대상
- 프로그래머 10 산출물: `docs/tools/programmer-10/` 6파일, 핸드오프, 트리거, `instructions/programmer/processed/10-instagram-collect-investigation.md` — **승인**. P3-1~P3-6은 다음 프로그래머 작업 때 함께 고쳐도 되고, 지금 고치면 리뷰어 재확인은 필요 없다(측정값을 바꾸는 수정이 아님).
- `docs/poster/guide.md` §3 변경 — **승인**(P3-7 한 줄은 커밋 전 추가 권장).
- 리뷰어 산출물: 본 리뷰, `docs/tools/reviewer-22/crosscheck.py`·`crosscheck-output.txt`, 트리거 `docs/triggers/reviewer-22-programmer-10-instagram-collect-review-COMPLETE.md`, `instructions/reviewer/processed/22-programmer-10-instagram-collect-review.md`(이동).
- 참고: `git status`상 `history/2026-10-01.md`·`2026-11-05.md`도 수정돼 있다. 이번 범위 밖이라 내용은 보지 않았다. 커밋 시 경로 지정 권장.
