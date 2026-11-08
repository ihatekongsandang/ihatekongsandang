# md오더: 테스터 (Sonnet 5) - 03-deployed-news-format-v0.2

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 03

## 자격·역할 (Required)
테스터 (Sonnet 5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지. 🔴 샘플로 갈음 금지 — 전수 항목은 전수로 확인하고, 검사 수와 전체 규모를 함께 적는다.

## 배경
v0.2 뉴스형 전환이 배포됐다(커밋 ba699e3, Vercel success). 대상 주소는 https://ihatekongsandang.vercel.app 이다. 배포된 사이트를 실제 브라우저로 확인한다.

## 선행 검토 문서 (Required)
- `docs/triggers/reviewer-26-1-programmer-11-1-recheck-COMPLETE.md`
- `docs/triggers/programmer-11-1-review-26-p2-fixes-COMPLETE.md`
- `docs/handoffs/programmer-11-news-format-v0.2-implement.md`
- `docs/tools/programmer-11-1/README.md`
- `planning/news-format-v0.2-scope.md` 수용 기준
- 직전 테스터 기록 `docs/qa/tester-02/`

## 임무 (배포 사이트, 375px·1280px 두 폭)
1. **공유 버튼**: 상세 페이지 ko/en 각각에서 링크 복사·X·스레드를 실제로 누른다.
   - 링크 복사는 클립보드 내용과 상태 문구 변화를 확인한다.
   - X·스레드는 새 창 URL의 `text`·`url` 파라미터를 확인한다. 영어 긴 제목 1건은 `text`가 없어야 한다(리뷰 25 목록 24건 중 하나).
   - GA 이벤트 전송(`share`, 수단별)을 네트워크 요청에서 확인한다.
2. **약관 `/terms`·`/en/terms`**
   - 본문이 `planning/terms-page-copy.md`와 맞는지 본다.
   - "연락 창구 준비 중" 표시, 푸터 링크, about↔terms 상호 링크를 본다.
   - 메타 title·canonical·hreflang을 본다.
3. **소개 `/about`·`/en/about`**
   - 고친 문장 3곳(개인정보·매체 등록·영어 셋째 문장)을 본다.
   - 연락처가 "준비 중"인지, `example.invalid`·`mailto`가 0인지 본다.
4. **카드 갱신 표시**: 피드·태그 페이지에서 갱신 표시가 붙은 카드를 **전수** 센다.
   - 기대 수는 프로그래머 11 기록이다. 빌드일이 달라졌으면 기준일을 적는다.
   - 스크린리더 이름(sr-only 전체 날짜)과 대비를 본다.
5. **키보드·접근성**: Tab 순서, 포커스 표시, axe(또는 Lighthouse 접근성)를 본다. 대상은 상세·약관·소개 ko/en이다.
6. **회귀**: 홈 피드·태그 내비·영어 피드·이미지 로딩이 이전과 같은지 본다(tester-01·02 항목 중 핵심).

## 산출물 (Required)
- 테스트 기록 `docs/qa/tester-03/`(결과표·스크린샷)
- 핸드오프 `docs/handoffs/tester-03-deployed-news-format-v0.2.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/tester-03-deployed-news-format-v0.2-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 항목별 PASS/FAIL(검사 수/전체)
  - 결함과 재현 절차
  - 커밋 대상 경로 목록
- 처리 후 본 파일 → `instructions/tester/processed/` 이동

## 제약
- 코드·content·문서 수정 금지. git 금지. 빌드 금지(배포 사이트만 본다).
- 크롬 탭은 작업 후 하나씩 닫는다. 병렬 일괄 닫기는 금지하고, 사용자 탭 그룹은 건드리지 않는다.
- 비밀번호·인증 입력 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 테스터 (Sonnet 5) · 03-deployed-news-format-v0.2`
- history append
- 완료 시 반공-슈퍼바이저에 SendMessage
