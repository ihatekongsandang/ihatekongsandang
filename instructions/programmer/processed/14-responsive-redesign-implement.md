# md오더: 프로그래머 (Opus 5) - 14-responsive-redesign-implement

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 14

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 수행한다. CLAUDE.md §1~§9를 지킨다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다. 빌드·검증은 직접 한다.

## 배경
반응형 디자인 개편 보강안 `design/v0.3-responsive/final/`을 구현한다. 이 안은 A1 기반에 A3 태블릿 그리드와 B1 쪽 번호를 더한 것이다. 디자인 팀장 05가 채점에서 1위로 골랐다. 프로그래머 13의 카드 이미지 스키마(P1~P4)가 끝난 뒤에 이어서 한다. 두 작업이 같은 파일을 건드리므로 같은 세션에서 순서대로 한다.

사용자 결정은 다음과 같다(2026-11-09).
- U1~U5: 배너는 모바일·태블릿에서 이동하되 닫기는 없다. 소개는 접는다. 다크 모드는 넣지 않는다. "링크" 표기는 뺀다. 글꼴은 시스템 폰트를 쓴다.
- D1 휴대폰·태블릿 배너는 하단 전폭 띠 52px로 둔다. 1024 이상은 현행을 유지한다.
- D2 피드 아래는 "다음 페이지 N / M"과 쪽 번호로 하고, 모두 `<a href>`로 만든다.
- D3 영어 부제는 768 미만에서 헤더에서 빼고 제목 아래로 옮긴다.
- D4 카드에는 이미지만 둔다. 사진 출처는 상세 figcaption에만 표시한다.
- D5 같은 주제 글·이전/다음 글은 이번 범위가 아니다.
- D6 영어 월별 목록은 보류한다. 새 라우트는 만들지 않는다.
- D7 "링크" 표기는 카드와 상세 배지 모두에서 뺀다.

## 선행 검토 문서 (Required)
- 🔴 `design/v0.3-responsive/final/`의 `mockup.html`·`tokens.md`·`notes.md`. §5 구현 범위 표 1~16을 본다(17은 제외).
- `design/v0.3-responsive/02-scoring.md`, `00-audit.md`, `01-brief.md`(수치 목표)
- 프로그래머 13 트리거·핸드오프. 스키마 필드는 13의 것을 쓴다.
- `planning/card-image-policy.md`(figcaption 형식), 직전 a11y-e2e(programmer-12/13)

## 임무
1. 구현 범위 표 1~16을 보강안대로 구현한다. 토큰·간격·폭은 `tokens.md` 값을 쓴다.
2. 기존 기능을 모두 유지한다.
   - 공유 버튼·GA 이벤트
   - 갱신 7일 표시
   - 약관·소개 문구(글자 단위로 바뀌면 안 됨)
   - 영어 페이지, "Korean only" 표시
   - 깨진 이미지의 대체 전환
   - 사이트맵·메타·JSON-LD
3. 새 대체 카드를 만든다. 지금의 자체 제작 텍스트 카드 이미지 67건은 콘텐츠가 바뀔 때까지 그대로 보인다. 대체 카드는 이미지가 없거나 깨진 경우에만 쓴다.
4. 측정
   - `docs/tools/designer-05/measure.mjs` 방식을 로컬 `next start`에 맞춰 옮긴다.
   - 360·390·768·834·1024·1280·1440 폭에서 브리프 수치 목표를 잰다. 대상은 첫 화면 카드 수, 첫 카드 y, 원문 이동 y, 44px 터치, 대비, 가로 넘침, 포커스 가림 0이다.
   - 실측값을 final 측정값과 나란히 적는다.
5. 회귀를 확인한다.
   - a11y-e2e를 재실행한다. 항목이 레이아웃 때문에 바뀌면 근거를 적고 갱신한다.
   - copy-exact(programmer-12)를 재실행한다.
   - build·typecheck·lint와 `clean-clone-gate.sh --worktree`를 통과시킨다.
6. 스크린샷 ko/en을 남긴다. 페이지는 홈·상세·태그·소개·약관이고, 폭은 360·768·1024·1280이다.
7. 결과는 `docs/tools/programmer-14/`에 남긴다.

## 산출물 (Required)
- 코드 변경, 검증 기록 `docs/tools/programmer-14/`
- 핸드오프 `docs/handoffs/programmer-14-responsive-redesign-implement.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-14-responsive-redesign-implement-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 구현 범위 표 1~16의 완료 여부
  - 수치 목표 실측 대비표
  - 회귀 숫자
  - 커밋 대상 경로
- 처리 후 본 파일을 `instructions/programmer/processed/`로 옮긴다.

## 제약
- `content/`·`public/images/`·planning·guide·design 수정 금지
- 새 의존성 금지. git 금지. 빌드는 이 세션만 한다.
- 소개·약관 문구 변경 금지. 확정 문구다.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 14-responsive-redesign-implement`
- history에 append한다.
- 완료 시 반공-슈퍼바이저에 SendMessage로 알린다.

## 추가 임무 0 (슈퍼바이저 판단, 프로그래머 13 미해결 1)
- 전체 `npm run lint`와 `clean-clone-gate.sh --worktree`가 `docs/tools/designer-04-A/build.mjs`의 lint 오류 7건 때문에 실패한다(디자이너 측정 도구, 미커밋).
- 해결 방법은 둘 중 하나다. 어느 쪽을 택했는지와 근거는 핸드오프에 적는다.
  - 동작이 바뀌지 않는 최소 수정으로 오류를 없앤다.
  - `docs/tools/**` 측정 도구 전체에 일관된 lint 규칙(무시 범위)을 정한다. 이 경우 다른 `docs/tools` 폴더와 같은 기준이어야 하고, `src/`는 무시 범위에 넣지 않는다.
- 끝나면 전체 lint와 `--worktree` 게이트가 통과해야 한다.
