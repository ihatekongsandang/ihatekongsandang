# reviewer-58 — 프로그래머 17(소개 SNS 줄 삭제) + 기획자 17-5 검토 — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10 · 하위 에이전트
- 오더: `instructions/reviewer/processed/58-programmer-17-planner-17-5-review.md`(이동)
- 빌드 1회(`npm run build`, 시작 전 `next build/start/dev` 프로세스 0 확인), `next start -p 3158` 렌더 확인 후 종료. git 쓰기·src·설정 수정 0. 업로더 19 변경(리뷰어 57 대상)은 판정하지 않았다.
- 수정한 파일: 이 트리거뿐(도구 출력은 scratch에만 두었다).

## 판정: **조건부 통과** — P1 0 · P2 1 · P3 1
**src 변경(소개 ko·en SNS 줄 삭제)은 그대로 커밋해도 된다.** 남은 P2는 기획 문서의 표기 방식 때문에 회귀 도구가 깨지는 문제로, 화면에는 영향이 없다.

## 확인 결과
| # | 항목 | 결과 |
|---|---|---|
| 1 | src diff | ✅ `git diff -- src/` = hunk 2개(ko `@@ -90,13 +90,6 @@`, en `@@ -49,12 +49,6 @@`). 둘 다 `<li>…</li>` 한 덩어리 삭제만 있고 추가 줄 0, 다른 글자 변화 0. 앞 `</li>`와 뒤 `<li>`가 바로 이어져 목록·JSX 구조가 정상이다(typecheck·build 통과) |
| 2 | 저장본 0건 | ✅ `content/posts*`의 `/images/…` 참조 67건. caption은 "게시물 요지를 정리한 카드" 62 · "보도 내용을 정리한 카드" 4 · "원문이 텍스트 게시물이라 사이트에서 직접 만든 요약 이미지" 1이다. SNS 원 게시물 저장 이미지는 **0**. `images[]` 갤러리 0. `public/images` 파일 67 = 참조 67. 본문의 "원문 썸네일" 26회는 모두 "쓰지 않고 자체 카드를 썼다"는 설명이다 |
| 3 | §2.2 = 화면 | ✅ 화면은 HEAD의 §2.2 문안에서 SNS 줄만 뺀 것과 글자 단위로 같다(아래 도구 44/44). ⚠️ 17-5가 삭제 기록 줄을 **목록 항목으로** 넣어 지금 §2.2 목록은 하위 5개다 → P2-1. §3.4 ③(✅ 실행, 커밋 대기)은 사실과 맞다. `content/README.md` 195행 "self = 운영자 제작 카드 이미지, SNS 저장본 0건"은 위 2번과 맞다(요약 이미지 1건도 운영자 제작이다) |
| 4 | 방문자에게 보이는 다른 곳 | ✅ 빌드 HTML 전체에서 "저장해 보여"·"stored on this site" 0. `/terms`·`/en/terms`의 저장 취지 문구 0. `llms.txt`의 "썸네일" 2회는 게시물 제목 속 낱말이다. `src`의 "저장" 낱말은 `schema.ts` 48행 주석(공공누리 저장)뿐이다 |
| 5 | 검증 | 아래 표 |
| 6 | 저장소 독립·실명·옛 id | ✅ 프로그래머 17 트리거·핸드오프·도구, 기획자 17-5 트리거, 바뀐 기획 문서 2개, README, 두 오더 파일에서 다른 서비스명·계정·홈·임시 절대경로 grep 0, `moved-ids.txt`(HEAD)의 옛 id 8개 grep 0, 비공인 실명 0 |

## 검증 (이 리뷰에서 직접 실행)
| 명령 | 결과 |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 · 0 errors · 경고 21(모두 `docs/tools/*`, `src` 0) — 프로그래머 기록과 같음 |
| `npm run build` | exit 0 · 정적 796/796 (prebuild 검증 통과) |
| 렌더 `/about`·`/en/about` | 둘 다 HTTP 200. 옛 문구 6종("저장해"·"정리하기로"·"상당수"·"stored on this site"·"phase this out"·"Many posts about social media") 각 0회 |
| `copy-exact-about.py`(현재 작업 트리 기획 문서 기준) | **37/46 — FAIL 9**. 원인: §2.2에서 SNS 줄을 이미 지웠고 삭제 기록 줄이 5번째 하위 항목으로 들어가 있어, 도구가 "SNS 줄 1개를 찾아 빼면 하위 4개"를 만들지 못한다(P2-1). 화면 결함 아님 |
| 같은 도구, 기획 문서를 HEAD 판으로 둔 임시 루트(`python3 -I`)에서 실행 | **44/44 PASS** — 화면 = 16 재정정본 − SNS 줄 하나, 하위 목록 4개 |
| `programmer-12/copy-exact-check.py` | 38/38 |
| `programmer-16/copy-exact-c3-c4.py` | 53/58(옛 시점 증거 도구, SNS 줄 기대 — 실패가 정상) |

## 결함
- **P2-1 기획 §2.2의 삭제 기록 줄이 목록 항목으로 들어감** — `planning/q1-redirect-q2-sns-image-plan.md` §2.2 ko 하위 목록 끝 `- (프로그래머 17(2026-11-10)로 삭제 …)`, en 인용 블록 `>   - (Removed by programmer 17 …)`, 그리고 같은 방식의 `planning/v0.9-copy-and-code-list.md` 59행.
  - 문서는 "아래 목록은 현재 화면과 글자 그대로 같다"고 하지만, 실제 목록은 하위 5개이고 화면은 4개다. 기대값을 이 절에서 읽는 회귀 도구 `copy-exact-about.py`가 37/46으로 깨진다.
  - 고칠 문안(기획자): 두 기록 줄을 목록 밖으로 옮긴다. 하위 목록 바로 아래에 들여쓰기 없는 일반 문단으로 "※ 17-5: 이 목록의 둘째 줄이던 SNS 저장 줄은 프로그래머 17(2026-11-10)이 삭제했다 — 저장본 0건. 위 목록은 현재 화면과 같다." 영어도 같은 방식으로 쓰고, v0.9 59행은 그 줄을 지운 뒤 목록 아래에 같은 한 줄을 둔다.
  - 도구(프로그래머, 커밋 전 짧은 후속 또는 다음 오더): `copy-exact-about.py`가 §2.2에 SNS 줄이 **없으면** 그대로 하위 4개를 기대하도록 고친다. 그때까지 회귀 증거는 이 리뷰의 HEAD 판 실행 44/44다.
- **P3-1** q1 §2.2 ko 기록 줄의 "아래 목록은"은 줄 위치(목록 끝)와 맞지 않는다. P2-1에서 옮길 때 "위 목록은"으로 쓴다. 영어 줄은 "The list above"라 맞다.

## 커밋 경로 목록 (이 오더 대상만 — 업로더 19의 `content/posts*`·`public/images`·`content/moved-ids.txt`·`content/retired-ids.txt` 변경은 넣지 않는다)
**프로그래머 17**
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `docs/tools/programmer-17/`(폴더 전체, 미추적)
- `docs/handoffs/programmer-17-about-sns-stored-line-remove.md`
- `docs/triggers/programmer-17-about-sns-stored-line-remove-COMPLETE.md`
- `instructions/programmer/processed/17-about-sns-stored-line-remove.md`

**기획자 17-5** (P2-1을 고친 판으로)
- `planning/q1-redirect-q2-sns-image-plan.md`
- `planning/v0.9-copy-and-code-list.md`
- `content/README.md` (diff는 195행 1줄뿐임을 확인 — 업로더 19 변경 섞이지 않음)
- `docs/triggers/planner-17-5-c4-followup-docs-COMPLETE.md`
- `instructions/planner/processed/17-5-c4-followup-docs.md`

**리뷰어 58**
- `docs/triggers/reviewer-58-programmer-17-review-COMPLETE.md`
- `instructions/reviewer/processed/58-programmer-17-planner-17-5-review.md`

**주의**: `history/2026-11-10.md`는 여러 세션 기록이 섞인 슈퍼바이저 파일이라 이 목록에서 뺐다(슈퍼바이저 판단으로 따로 커밋). 이 목록만 스테이징한 뒤 `clean-clone-gate.sh --staged`로 확인하기를 권한다.

## 58-1 (기획자 17-5-1 재확인, 2026-11-10 — 빌드 없음, 직전 빌드 결과물 `.next/server/app` 사용)
**판정: 통과** — P1 0 · P2 0 · P3 1(차단 아님). 리뷰 58의 P2-1·P3-1은 해소됐다.

| 확인 | 결과 |
|---|---|
| q1 §2.2 ko 하위 목록 | **4개**. 기록 줄은 목록 밖 `※ 17-5 …` 문단이고 "위 목록은"으로 고쳐졌다 |
| q1 §2.2 en 하위 목록 | **4개**. `> ※ 17-5 …`가 목록 밖에 있고 "The list above"로 적혔다 |
| v0.9 59행 부근 | 하위 4개 + 목록 밖 ※ 한 줄. 글자는 q1 ko와 같다 |
| 문서 = 화면(글자 단위) | HEAD §2.2에서 SNS 줄만 뺀 것과 지금 §2.2에서 ※ 줄만 뺀 것을 diff했다. ko 블록은 머리 설명 줄(17-5 표시) 말고 **같고**, en 블록은 **완전히 같다**. HEAD 판 기준 도구 44/44(리뷰 58)와 합치면 문서 = 화면이다 |
| `copy-exact-about.py`(현재 작업 트리 기준) | **41/44**. 화면과 맞추는 비교 41개(목록 4개·하위 4개·각 줄 글자·옛 문구 0·절 순서)는 모두 PASS. FAIL 3건은 모두 도구의 전제 검사다("계획 §2.2에서 SNS 줄 1개를 찾아 뺌" ko·en, "빠진 굵게 3개 = SNS 줄의 것"). §2.2에 SNS 줄이 이제 없으니 생기는 **도구 구조 문제**이고, 문서·화면 결함은 아니다. 프로그래머 후속으로 "SNS 줄이 없으면 전제 검사를 건너뛰고 하위 4개를 바로 기대"하도록 고치기를 권한다(커밋 차단 아님) |

- **P3-1(신규)**: q1 ko의 `※` 줄과 en의 `> ※` 줄 앞뒤에 빈 줄이 없다. 마크다운 렌더러에서는 바로 위 목록 항목("사진이 없거나 …")의 이어지는 문장으로 붙어 보이고, ko는 뒤 `3.`부터 번호 목록이 새로 시작된다. 문서를 원문으로만 읽으면 문제가 없고 도구 판정에도 영향이 없다. 다음에 고칠 때 앞뒤에 빈 줄을 한 줄씩 넣는다. v0.9도 같다.

### 최종 커밋 경로 (업로더 19는 fd1c81c로 이미 커밋됨 — 아래만 스테이징)
`src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` · `docs/tools/programmer-17/` · `docs/handoffs/programmer-17-about-sns-stored-line-remove.md` · `docs/triggers/programmer-17-about-sns-stored-line-remove-COMPLETE.md` · `instructions/programmer/processed/17-about-sns-stored-line-remove.md` · `planning/q1-redirect-q2-sns-image-plan.md` · `planning/v0.9-copy-and-code-list.md` · `content/README.md`(diff 1줄 확인) · `docs/triggers/planner-17-5-c4-followup-docs-COMPLETE.md` · `instructions/planner/processed/17-5-c4-followup-docs.md` · `docs/triggers/reviewer-58-programmer-17-review-COMPLETE.md` · `instructions/reviewer/processed/58-programmer-17-planner-17-5-review.md`
(`history/2026-11-10.md`는 슈퍼바이저 판단. 스테이징한 뒤 `clean-clone-gate.sh --staged`를 권장)
