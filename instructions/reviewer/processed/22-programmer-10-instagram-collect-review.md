# md오더: 리뷰어 (Opus 5.5) - 22-programmer-10-instagram-collect-review

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 22

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·도구·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반. 근거가 없으면 "확인 필요".

## 배경
- 프로그래머 10이 인스타그램 수집 실패 원인을 조사했다: 10/29부터 업로더가 guide §3과 다른 브라우저 전체 UA로 요청해 JS 전용 페이지를 받은 것이 실패 25건의 원인, guide 명령 그대로면 26건 중 23건 재수집 가능, 캡처 필요 2건.
- 슈퍼바이저가 보고서 §5-4 제안을 받아 `docs/poster/guide.md` §3 인스타그램 줄에 UA 고정·성공 확인 문구를 추가했다(작업 트리, 미커밋).
- 업로더가 24건 재처리를 진행 중이다(콘텐츠는 리뷰 예외 — 이번 범위 아님).

## 선행 검토 문서 (Required)
- `docs/tools/programmer-10/` 전부(instagram-collect-report.md, codes.txt, reproduce.py·-output.tsv, uploader-attempts.py·-output.tsv)
- `docs/handoffs/programmer-10-instagram-collect-investigation.md`, `docs/triggers/programmer-10-instagram-collect-investigation-COMPLETE.md`
- 오더 `instructions/programmer/processed/10-instagram-collect-investigation.md`
- `git diff -- docs/poster/guide.md`

## 임무
1. **결론 검증**: 보고서 표와 출력 tsv가 일치하는지, 원인 판정(UA 전환 시점·25건 귀속)이 출력으로 뒷받침되는지, 성공 판정 기준이 타당한지 본다. 필요하면 대표 코드 몇 건을 guide 명령으로 직접 재요청해 확인한다(요청 최소화, 로그인·우회 금지).
2. **오더 제약 준수**: 금지 항목(로그인·토큰·차단 회피·대량 요청) 위반이 없는지, 원문(캡션·이미지)이 저장소에 들어가지 않았는지, 업로더 세션 기록에서 추출한 값에 계정명·홈 경로 등 독립 원칙 위반이 없는지 전수 grep.
3. **도구**: 스크립트가 상대경로·재실행 가능한지, 저장소 안에 원문을 쓰지 않는지.
4. **guide §3 변경**: 제안 문안과 일치하는지, 업로더가 그대로 따를 수 있는지.

## 산출물 (Required)
- 리뷰 `docs/reviews/programmer-10-instagram-collect-investigation-review.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-22-programmer-10-instagram-collect-review-COMPLETE.md` **완료 트리거 파일 생성 필수** (판정·결함 수·커밋 대상)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 대상 파일 수정 금지. git add·commit·push 금지. 빌드 불필요.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 22-programmer-10-instagram-collect-review`
- history/{오늘}.md에 `## [HH:MM] 리뷰어 22 — 지시 → 행동 → 결과` append
- 완료 시 반공-슈퍼바이저에 SendMessage로 완료 보고
- 말미: `— 리뷰어 (Opus 5.5) · 22-programmer-10-instagram-collect-review 종료 —`
