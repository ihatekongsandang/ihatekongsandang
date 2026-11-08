# md오더: 프로그래머 (Opus 5) - 10-instagram-collect-investigation

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 10

---

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 보고서·도구·핸드오프·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반. 근거가 없으면 "확인 필요".

## 배경
- 업로더(게시 세션)는 인스타그램 URL을 `docs/poster/guide.md` §3 명령(`/p/{code}/embed/captioned/` curl, `npm run og:draft`)으로 읽는다. 2026-10-29 무렵부터 내용을 읽지 못해 **수집 실패 보류(캡처 대기)가 18건** 쌓였다(리뷰 18, `docs/tools/reviewer-18/count-output.txt` 54행~). 같은 기간 게시 불가보다 많아 게시량 정체의 가장 큰 원인이다(리뷰 20 P1-4).
- 사용자 결정(2026-11-08, D7 = 7b): 캡처 일괄 수령 전에 **수집 실패 원인 조사를 먼저** 한다.

## 선행 검토 문서 (Required)
- `docs/poster/guide.md` §2·§3, `content/README.md`, og:draft 스크립트 소스(`package.json`의 `og:draft`가 가리키는 파일)
- `docs/tools/reviewer-18/count-output.txt`(실패 코드 18개), `docs/tools/reviewer-18/collect-fail.py`
- `history/2026-10-2*.md`·`2026-11-0*.md`의 "수집 실패" 줄(실패 당시 응답 기록)
- 리뷰 20 `docs/reviews/planner-08-news-format-conversion-spec-review.md` P1-4

## 임무
1. **재현**: 실패 코드 18개 전부와, 대조군으로 10/29 이전에 수집에 성공한 게시물 코드 3개 이상에 대해 guide §3의 현재 명령을 실행한다. HTTP 상태·최종 URL(리다이렉트)·응답 크기·이미지/캡션 마커 유무를 표로 남긴다(전수: 검사 수 = 21 이상).
2. **원인 판정**: 응답을 근거로 원인을 분류한다(로그인 벽 리다이렉트, embed 마크업 변경, 게시물 삭제·비공개, 요청 차단 등). 근거가 없으면 "확인 필요".
3. **대안 시험**: 로그인·인증 없이 쓸 수 있는 공개 경로만 시험한다(예: embed 변형 경로, 공개 OG 메타, 다른 User-Agent). 각 대안을 실패 코드 전부에 실행하고 성공 수를 숫자로 적는다.
   - 🔴 금지: 로그인·쿠키·비밀번호·토큰 사용, 계정 생성, 유료·외부 수집 API, 이용약관 우회 목적의 차단 회피(프록시·대량 요청 등). 요청은 건당 1~2회로 최소화한다.
4. **권고**: (가) 바로 쓸 수 있는 수집 명령(있으면) (나) 공식 경로(예: oEmbed)에 필요한 계정·키 — 사용자 작업으로 분리 (다) 캡처 수령 외 방법이 없음 — 중 결론과 근거. guide §3 개정 문안이 필요하면 **제안 문안**으로만 적는다(guide 직접 수정 금지).

## 산출물 (Required)
- 보고서 `docs/tools/programmer-10/instagram-collect-report.md` (재현 표·원인·대안별 성공 수·권고)
- 실행 스크립트·출력 `docs/tools/programmer-10/` (재실행 가능, 저장소 루트 기준 상대경로)
- 핸드오프 `docs/handoffs/programmer-10-instagram-collect-investigation.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-10-instagram-collect-investigation-COMPLETE.md` **완료 트리거 파일 생성 필수** (검사 수·원인·대안별 성공 수·권고·사용자 작업 필요 여부)
- 처리 후 본 파일 → `instructions/programmer/processed/` 이동

## 결정 사항·제약
- 조사 전용. `src/`·`content/`·`guide`·`package.json` 수정 금지, 의존성 설치 금지. git add·commit·push 금지. 빌드 불필요.
- 수집한 원문(이미지·캡션 원본)은 저장소에 넣지 않는다. 보고서에는 마커 유무·크기 등 측정값만 적는다.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 10-instagram-collect-investigation`
- 재현 요약 · 원인 · 대안별 성공 수 · 권고 · 사용자 작업
- history/{오늘}.md에 `## [HH:MM] 프로그래머 10 — 지시 → 행동 → 결과` append
- 완료 시 반공-슈퍼바이저에 SendMessage로 완료 보고
- 말미: `— 프로그래머 (Opus 5) · 10-instagram-collect-investigation 종료 —`
