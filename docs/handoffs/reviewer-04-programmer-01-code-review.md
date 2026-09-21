# 리뷰어 세션 — 04-programmer-01-code-review 핸드오프
**작성일**: 2026-09-21 13:12 | **작성 세션**: 리뷰어 (Fable 5.1)

## 요약 (3줄)
1. 프로그래머 01 v0.1 프로토타입을 **조건부 승인** — 필수 수정 2건(D1 게시물 상세 `og:image`·`twitter:image` 누락, D2 `engines.node` ↔ `import.meta.dirname` 불일치)을 프로그래머 02가 고친 뒤 슈퍼바이저가 지정 명령으로 확인하고 커밋·푸시한다(리뷰어 재호출 불필요).
2. 프로그래머 숫자를 믿지 않고 전부 재현했다 — `npm ci`→validate/typecheck/lint/build 통과, 라우트 27건, 헤더 6/6, 게이트 오류 케이스 6/6+12, sanitize 12벡터, 페이지네이션(임시 페이지 크기 2), 핫링크 폴백 브라우저 캡처, 키보드 Tab 16회, 색 대비 12/12+6, 독립 grep 텍스트 64/64 0건. 25항 대조 25/25(충족 23·부분 2).
3. `useSourceImage` 기본값은 **`false`로 확정** — 실패 비용 비대칭(옵트아웃 실수 = 얼굴 노출, 옵트인 실수 = 플레이스홀더)과 "매 건 사람 판단" 파이프라인 전제. 기획자 04는 PRD §3.2① `true`→`false` 정정.

## 산출물
| 경로 | 설명 |
|---|---|
| `docs/reviews/programmer-01-v0.1-prototype-review.md` | 판정·재현 숫자·25항 대조표·`useSourceImage` 판정·결함 2+보고 정확도 1·권고 11·프로그래머 02 지시안·배포 직후 확인 2건 |
| `docs/tools/reviewer-04/README.md` | 재현 절차 전체 |
| `docs/tools/reviewer-04/gate-cases.sh` | 게이트 오류 케이스 18건 재현(자동 원복) |
| `docs/tools/reviewer-04/keyboard-tab.mjs` | 헤드리스 Chrome 키보드 탐색·포커스 링 실측 |
| `docs/tools/reviewer-04/fixture-sanitize.md` · `fixture-hotlink-broken.md` | sanitize·핫링크 폴백 검증용 임시 게시물(검증 후 `content/posts/`에서 삭제 필수) |
| `docs/handoffs/reviewer-04-programmer-01-code-review.md` · `docs/triggers/reviewer-04-programmer-01-code-review-COMPLETE.md` | 본 문서·트리거 |

## 주요 결정사항 (자체 판단 + 근거)
- **조건부 승인 + 리뷰어 재호출 없이 커밋**: D1·D2는 각 3줄·1줄 수정이고 확인 명령이 기계적(`grep -c 'property="og:image"'` ≥1, `npm run build` exit 0)이라 슈퍼바이저 검증으로 충분하다. 결함 확정 후 "고친 뒤 커밋" 원칙(CLAUDE.md §5)은 지킨다.
- **D1을 결함(중)으로**: 공유 URL = 게시물 상세가 유일한 유입 경로 표면인데 미리보기 이미지가 없다. §7-10 명시 요건이고 핸드오프 "✅"는 엔드포인트만 확인한 부정확한 보고였다.
- **`useSourceImage=false`**: 보고서 §3. 슈퍼바이저 의견("옵트인 운영이 현실적인가")에 대한 답 — `status`·`sources`가 이미 매 건 수동이므로 현실적이다.
- **무한스크롤 이월 승인, 단 백로그 등록 조건**: 사용자 확정 항목이므로 삭제 불가.
- **npm audit high 1은 배포 차단 아님**: `next` 동봉 postcss, 빌드 시점 한정, 자체 CSS만 처리. 기록만.
- **PRD 대조 기준을 HEAD v0.3로 고정**: 작업트리 prd.md는 기획자 04가 수정 중이라 흔들리는 문서를 판정 근거로 쓰지 않았다.

## 미해결·이슈 (다음 세션이 알아야 할 것)
- 🔴 `content/posts/`에 임시 게시물이 남아 있지 않은지 커밋 직전 `ls content/posts`로 재확인(리뷰어는 삭제·확인 완료: 3건만 존재).
- `planning/prd.md`·`planning/user-questions.md`가 기획자 04에 의해 수정 중(미커밋). 프로그래머 코드 커밋에 섞이지 않게 커밋 단위를 분리할 것.
- `NEXT_PUBLIC_SITE_URL` 미설정 상태로 배포하면 canonical·sitemap·og:url이 상대 경로 → `docs/user-tasks.md` Vercel 항목에 환경 변수 단계 추가 필요(슈퍼바이저).
- R6(README 실명 규칙·종결 사유)은 PRD v0.4 확정 후 프로그래머 02 후속 오더로.
- CSP `report-to` 부재(R3)는 v0.1.5 과제.

## 다음 세션 가이드
| 누가 | 무엇을 | 어떻게 |
|---|---|---|
| 슈퍼바이저 (Opus 5) | 프로그래머 02 오더 발행(보고서 §8 초안) → 수정 후 확인 명령 2개 실행 → 커밋·푸시 → Vercel 연결 → 배포 직후 §7 curl 2회 | 기획자 04에 `useSourceImage` 판정·PRD §3.2① 정정 전달. 무한스크롤 v0.2 백로그 등록 |
| 프로그래머 (Opus 5, 02) | D1·D2 필수 + R1·R2·R3 함께 | 보고서 §5·§6·§8. 읽은/바꾼 파일 수와 산출 명령 병기(D3) |
| 기획자 (Sonnet 5, 04) | PRD §3.2① 기본값 `false` 정정 | 보고서 §3 |
| 테스터 (Sonnet 5) | 배포 후 로컬 프로덕션 재검증 | `docs/tools/reviewer-04/README.md` 절차 + 프로그래머 01 도구 |

## 참고 링크
- 제약 원문: `docs/reviews/planner-02-prd-v0.2-review.md` §7 · `docs/reviews/planner-03-prd-v0.3-review.md` §8
- 프로그래머 핸드오프: `docs/handoffs/programmer-01-v0.1-prototype.md` · `TECH_STACK.md` · `content/README.md`
- md오더: `instructions/reviewer/processed/04-programmer-01-code-review.md`
