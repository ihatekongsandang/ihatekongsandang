# 테스터 세션 — 03-deployed-news-format-v0.2 핸드오프
**작성일**: 2026-11-09 08:52 | **작성 세션**: 테스터 (Sonnet 5)

## 요약 (3줄)
- 배포 사이트(`https://ihatekongsandang.vercel.app`, 커밋 ba699e3)에서 오더 03의 임무 1~6을 전수 실측했다 — 공유 버튼(ko/en 실제 클릭)·약관·소개·카드 갱신 표시(ko·en 각 207건 전체 피드 전수 순회)·키보드 전수 Tab 순회·회귀.
- claude-in-chrome 확장이 이 세션에서 연결되지 않아(`list_connected_browsers` = `[]`) 헤드리스 Chrome+CDP(`docs/tools/programmer-04/cdp.mjs` 재사용)로 실제 Chrome에서 대체 실측했다(programmer-11·tester-02의 같은 선례).
- 결과: **209건 · PASS 209 · FAIL 0**. 신규 결함 0건. 코드·content·문서 수정 없음, git·빌드 없음(배포 사이트만 봄).

## 산출물
| 경로 | 설명 |
|---|---|
| `docs/qa/tester-03/report.md` | 전수 결과표·독립 재계산 근거 |
| `docs/qa/tester-03/*.png`(3장) | 공유 버튼 ko/en 모바일, 홈 피드 회귀 화면 |
| `docs/tools/tester-03/e2e-deployed.mjs` | 검증 스크립트(헤드리스 Chrome+CDP, 저장소에 추가 의존성 없음) |
| `docs/tools/tester-03/e2e-deployed-output.txt` | 전체 실행 로그(209건) |
| `docs/tools/tester-03/README.md` | 방법론·대체 사유·GA 확인 방식·발견한 테스트 함정 |
| `docs/tools/tester-03/screens/*.png`(3장) | 위와 같은 화면의 원본 |

## 주요 결정사항 (자체 판단 + 근거)
1. **헤드리스 Chrome+CDP로 claude-in-chrome을 대체했다.** `tabs_context_mcp`·`list_connected_browsers`를 호출했으나 연결된 브라우저가 0개였다(재시도 2회 동일). programmer-11·tester-02가 같은 상황(확장 무응답)에서 이미 쓴 방법이라 그대로 따랐다 — 실제 Chrome 바이너리가 실제로 렌더링·클릭·Tab 이벤트를 처리하므로 "실제 브라우저로 검증"의 취지를 벗어나지 않는다고 판단했다. GUI가 없다는 점만 다르다.
2. **GA 이벤트는 실제 네트워크 전송 대신 `dataLayer` push로 확인했다.** 이 사이트는 운영 중인 실제 GA4 속성을 쓴다. 테스트 클릭으로 `google-analytics.com/g/collect`에 실제 요청을 보내면 운영 통계가 오염된다. 그래서 그 도메인과 `googletagmanager.com`을 CDP로 차단하고, 인라인 `gtag` 스텁(외부 스크립트가 아니라 페이지에 직접 심어지는 코드라 차단 영향을 받지 않음)이 `dataLayer`에 실제로 이벤트를 쌍는지로 "코드가 전송을 시도했다"를 검증했다. 네트워크 패널에서 실제 `collect` 요청 자체는 보지 않았다 — 운영 데이터 보호가 우선이라고 판단했다.
3. **카드 갱신 표시는 태그 페이지를 추가로 순회하지 않고 전체 피드 순회로 전수를 대신했다.** `toCardView()`가 게시물 데이터(`updatedAt`)와 빌드 시점만의 순수 함수라(코드 확인) 어떤 목록에 나오든 같은 카드는 같은 상태로 그려진다. 피드 페이지네이션(ko·en 각 18페이지)을 1페이지부터 끝까지 순회하면 이미 전체 카드 모집단(207+207)을 한 번씩 다 덮으므로, 태그 페이지에서 같은 카드를 또 보는 것은 중복 확인이라 범위에서 뺐다. (🔴 샘플 갈음이 아니라 — 모집단을 다른 경로로 전수 덮는 선택이다. 검사 수=전체 규모 원칙에 맞게 ko·en 각각 "207건 중 몇 건" 형태로 report.md에 숫자를 남겼다.)
4. **"오늘" 기준은 시스템 시계(2026-11-09, Asia/Seoul)로 독립 재계산했다.** 배포 빌드가 정확히 언제 "오늘"로 고정했는지는 알 수 없지만(빌드 서버 로그 접근 없음), 리뷰어 26-1 승인이 같은 날 08:18이고 승인 즉시 배포됐다는 오더 배경과, 실측 결과가 이 가정과 **완전히 일치**했다는 점(5건·id·날짜 전부 맞음)으로 가정이 맞았음을 사후에 교차 확인했다. 어긋났다면 "확인 필요"로 남겼을 것이다.
5. **상세 페이지의 전수 Tab 순회는 복사·X·스레드 실클릭 테스트 직후가 아니라 페이지를 다시 불러온 뒤에 했다.** 처음에는 클릭 테스트 직후 `document.body.focus(); activeElement.blur()`로 포커스를 리셋하고 바로 돌렸는데 ko 35개는 개수는 맞지만 순서가 돌려 있었고 en 28개는 17개에서 멈췄다. 독립된 새 페이지 로드로 똑같이 재현해 보니(디버그 스크립트로 확인, 이후 삭제) **완전히 깨끗했다** — 브라우저가 `blur()` 후에도 "마지막 Tab 정지점"을 기억해 다음 Tab이 문서 맨 앞이 아니라 그 다음 요소부터 시작되는 사양 동작이었다(사이트 결함 아님). 그래서 상세 페이지만 전수 순회 바로 전에 같은 URL을 다시 불러와 깨끗한 포커스 상태를 만들었다. 약관·소개는 클릭 상호작용이 없어 이 문제가 없었다.
6. **클릭 상호작용 테스트(복사·X·스레드)는 375px 1회만 하고 1280px에서는 href·구조만 다시 확인했다.** JS 동작 자체(클릭 처리·GA·클립보드)가 뷰포트 폭에 의존하지 않기 때문이다. 두 폭 전부에서 한 것은 href/text 파라미터·메타·대비·전수 Tab 순회처럼 레이아웃이나 중복 실행 비용이 낮은 항목들이다.

## 미해결·이슈
없음. 이번 오더 범위 전 항목 PASS, 신규 결함 0건.

## 다음 세션 가이드
- 슈퍼바이저: 본 결과를 확인 후 배포 상태를 그대로 유지하면 된다 — 추가 수정·커밋 대상 없음(리뷰어 26-1이 이미 승인·커밋 대상을 확정했고, 이번 테스트는 그 배포 결과를 검증한 것).
- "확인 필요"로 남긴 항목(§7 report.md: VoiceOver 실제 음성·iOS 실기기·GA 실제 네트워크 수신)은 이 환경의 구조적 한계다 — 해소하려면 실기기나 claude-in-chrome 연결이 되는 세션이 필요하다.
- claude-in-chrome이 이후 세션에서 연결되면, 이번에 헤드리스로 대체한 항목(특히 VoiceOver 음성)을 다시 확인해도 된다. 급하지 않다 — 코드 결함이 의심되는 상황이 아니라 환경 제약이었다.

## 참고 링크
- 오더 `instructions/tester/processed/03-deployed-news-format-v0.2.md`
- `docs/triggers/reviewer-26-1-programmer-11-1-recheck-COMPLETE.md`, `docs/handoffs/programmer-11-news-format-v0.2-implement.md`, `docs/tools/programmer-11-1/README.md`
- `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`
- 테스트 도구 `docs/tools/tester-03/`
