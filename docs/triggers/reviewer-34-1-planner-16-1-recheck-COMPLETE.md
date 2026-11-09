# 리뷰어 34-1 — 기획자 16-1 재확인 (커밋 전 게이트) 완료 트리거

**작성일**: 2026-11-09 | **작성 세션**: 리뷰어 하위 에이전트 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)
**오더**: `instructions/reviewer/processed/34-1-planner-16-1-recheck.md`
**대상**: 트리거 `docs/triggers/planner-16-1-review-34-fixes-q3a-COMPLETE.md`, `planning/q1-redirect-q2-sns-image-plan.md`, `planning/v0.9-copy-and-code-list.md`(작업 트리 diff), `docs/tools/planner-16/`(TSV·`make-batches.mjs`·`batches-output.txt`)
**기준**: `docs/reviews/planner-16-q1-q2-plan-review.md`(§2.4·§3.3·§8)
**도구**: `docs/tools/reviewer-34-1/` — `compare-24-text.mjs`·`contiguity-and-items.mjs`·`recheck-batches.mjs`(+ 각 `-output.txt`). 하위 요약은 쓰지 않고 모두 직접 실행했다.

> 저장소 독립: 이 트리거와 도구에는 다른 서비스명·계정·홈 경로를 쓰지 않았고, 금지 패턴 문자열·옛 #1 id 문자열도 쓰지 않았다(건수만 적음). git 쓰기·빌드·npm 없음. 대상 문서는 고치지 않았다. 스냅숏·재생성 사본은 저장소 밖 임시 폴더에만 두었다.

---

## 판정: **승인 — P1 0 · P2 0 · P3 5**
P2-1~P2-4는 모두 반영됐고 수치를 직접 재현했다. 남은 것은 문서 안의 낡은 문장·표기(P3)뿐이라 커밋을 막지 않는다. P3는 다음 기획 정리 때 함께 고치면 된다.

## 확인한 사실

| # | 항목 | 결과 |
|---|---|---|
| 1 | P2-1 moved-ids 예시 | 계획 §1.3 코드 블록 4줄 중 주석 4줄(`# 예: …` 포함). 두 문서·`planner-16/`에 주석이 아닌 예시 줄 0. §1.3 설명·§4 C11 행에 "첫 배포 파일은 주석만" 명시 ✔ |
| 2 | P2-2 ko 2번 | 리뷰 §2.4 ko 6줄 → 계획 §2.2 **6/6 글자 그대로**(152행부터 연속·같은 순서), v0.9 §2.2 **6/6**(57행부터 연속). 1·3·4번은 계획 = v0.9 작업 트리 = v0.9 HEAD(15-1본) 3/3 ✔ |
| 3 | P2-3 en | 리뷰 §2.4 en 6줄 → 계획 §2.2 en **6/6 글자 그대로**, 순서 유지(178~182·184행). 제목 줄 `Quotes, images and copyright` 있음. 남긴 3줄(메타데이터만 인용·사진 없음 시 대체 이미지·공유 미리보기)은 ko 1·2번 끝 줄·4번과 같은 뜻이고 사실과 어긋나지 않는다 ✔ |
| 4 | P2-4 11건 | 리뷰 34 `tier3-annotated-output.txt`의 11건(날짜+caption)을 새 TSV에서 찾음: **11/11 묶음 1·2**(묶음 1에 10, 묶음 2에 1), 못 찾음 0, 중복 일치 0. 옛 묶음 4·7·9·9·9·11·12·14·14·14·14 → 트리거 기록과 같다 |
| 5 | TSV 수치 | 행 **139** · 고유 id **139** · 중복 0 · 묶음 14개 10·10·9·10×11 → 합 **139**. Tier T1 29 · T2 7 · T3 103. 묶음/Tier: 1~3 = T1(10·10·9), 4 = T2 7 + T3 3, 5~14 = T3. T3 최신순 역전 0. TSV caption ≠ 게시물 caption 0 |
| 6 | 옛 TSV와 id 집합 | 옛 TSV는 HEAD에 없다. 리뷰 34가 스냅숏 sha256 `b42219c6a17987b9`에서 "옛 TSV = A 집합(차집합 0)"을 기록했다. 커밋 `0e5fb93`의 `content/posts` 사본이 **같은 sha256 `b42219c6a17987b9`** 이고, 그 A 집합과 새 TSV의 차집합이 **양쪽 0**이다 → 새 TSV id 집합 = 옛 TSV id 집합. HEAD(`c8375de`)·작업 트리에서도 차집합 0 |
| 7 | 재현성 | `count-self-images.mjs`→`make-batches.mjs`를 저장소 밖 사본에서 실행한 결과 TSV가 저장소 TSV와 **바이트 동일**, 출력 2줄이 `batches-output.txt`와 같다 |
| 8 | Q3=a | 계획 5행·§0(22·24행)·§3.3 ③행·§3.4 교체 방법·§3.5 확정, v0.9 §2.2 근거·§3.4 업로더 행에 반영. Q3에 대해 "사용자 확인 필요"로 남은 곳 0. 저장본 유지 선택지는 "쓰지 않는다"로 일관 ✔ (단 §2.3 별건 잔존 문장은 P3-2) |
| 9 | 저장소 독립 grep | 대상 **19개 파일**(계획 1 · v0.9 1 · `planner-16/` 9 · 트리거 16-1 · `reviewer-34-1/` 6 · 이 트리거)에 대해: 오더 지정 패턴(홍보물 제외) **0** · pre-commit 훅 패턴 **0** · 옛 #1 id **0** · 이름 로마자 토큰 **0**(홍보물 오탐도 0). 양성 대조: HEAD의 v0.9에서 옛 id 1건 검출(작업 트리 v0.9는 0) → 검색식이 동작함 |

## 결함 (P3 5 — 커밋 차단 아님)

| # | 위치 | 내용 | 고침 |
|---|---|---|---|
| P3-1 | 계획 173행(§2.2 en 제목 "슈퍼바이저 판단 필요")·296행(§4 C4 ③ "**Images on cards** 절 추가는 슈퍼바이저 결정 후") · v0.9 68행·163행("결정 후") | 영어 절 추가는 슈퍼바이저가 이미 정했다(history 11-09 18:27, 프로그래머 16 오더 31행 "추가한다"). 296행은 옛 절 제목도 남았다 | "추가 확정(슈퍼바이저)"로, 296행 제목을 "Quotes, images and copyright"로 |
| P3-2 | 계획 §2.3 191행 | 제목은 "사용자 알림 확인 완료 — guide §4 반영됨"인데 본문 끝에 "슈퍼바이저 오더가 필요하다", "사용자 확인이 있으면 가장 안전하다(…기획자의 해석이다)"가 남았다 | 완료 사실로 바꾸거나 해당 두 문장 삭제 |
| P3-3 | 계획 187행 | "범위 밖의 **두 줄**은 …: 첫 줄, 마지막 줄, 그리고 … 줄" — 세 줄을 나열 | "세 줄" |
| P3-4 | 계획 6행 · §4 커밋 대상 경로 | 16-1 "바뀐 곳" 목록에 §2.3(제목)·§3.1(206행)·§4(C11 행)이 빠졌다. 커밋 대상 목록에 16-1 트리거·리뷰 34 산출물이 없다(슈퍼바이저가 커밋 때 보충하면 됨) | 목록 보충 |
| P3-5 | 계획 88행·§5 2행 / §2.1·§3.1·v0.9 54행 | ① Vercel 리다이렉트 한도가 "확인 필요"로 남았는데 리뷰 34 §1.1에서 2,048개로 확인됐다. ② (16-1 범위 밖 이월 사실) HEAD `c8375de`에서 #1 대표 이미지가 지워져 B는 **67**, 대표 이미지 없음 1(작업 트리는 새 게시물 2건 포함 209건, 이미지 없음 3). 문서의 "68"·"207건 모두 self"는 `0e5fb93` 시점 수치다. A 139와 C4 문안의 사실성에는 영향 없다 | ①은 "2,048개(리뷰 34 확인)"로. ②는 측정 시점을 밝히거나 다음 정리 때 갱신 |

**범위 밖 관찰(슈퍼바이저)**: 프로그래머 16 오더 31행은 영어 절을 "Images on cards"라고 부른다. §2.4는 제목을 "Quotes, images and copyright"로 권하고, 계획 §2.2 en 문안에는 이 제목이 들어 있다. 프로그래머가 어느 제목을 쓸지 오더에서 한 번 더 못 박는 것이 안전하다.

## 커밋 대상 경로 (이 게이트 대상 + 이 리뷰)
- `planning/q1-redirect-q2-sns-image-plan.md` (신규)
- `planning/v0.9-copy-and-code-list.md` (diff)
- `docs/tools/planner-16/` (전체)
- `docs/triggers/planner-16-q1-q2-plan-COMPLETE.md`, `docs/triggers/planner-16-1-review-34-fixes-q3a-COMPLETE.md`
- `docs/reviews/planner-16-q1-q2-plan-review.md`, `docs/tools/reviewer-34/`, `docs/triggers/reviewer-34-planner-16-q1-q2-plan-review-COMPLETE.md`
- `docs/tools/reviewer-34-1/`, `docs/triggers/reviewer-34-1-planner-16-1-recheck-COMPLETE.md`(이 파일)
- `instructions/planner/processed/16-*.md`·`16-1-*.md`, `instructions/reviewer/processed/34-*.md`·`34-1-planner-16-1-recheck.md`
