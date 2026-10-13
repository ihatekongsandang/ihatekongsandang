# md오더: 테스터 (Sonnet 5) - 02-deployed-tag-nav-top12

**작성일**: 2026-10-12 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 02

---

## 자격·역할 (Required)
테스터 (Sonnet 5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 보고서·로그·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반 · 전수 지시는 전수(샘플로 갈음 금지). 못 한 항목은 "확인 필요"로 남기고 이유를 적는다. 요약 수치는 본문 표와 반드시 일치시킨다(테스터 01에서 요약 수치가 표와 맞지 않아 지적받았다).

## 배경
배포 커밋 `c2cde5f`(2026-10-12): 메인·태그 페이지 태그 칩이 상위 12개 + "전체 태그 보기 (N개)" 링크로 바뀌었고 `/tags` 페이지가 새로 생겼다. 현재 태그가 상위 밖이면 그 태그 칩이 맨 앞에 붙어 13개가 된다.
슈퍼바이저 배포 확인: `/` 칩 12 + 전체 보기 링크, `/tags` 링크 301·canonical 배포 도메인, sitemap에 `/tags`, `/en/tags` 404.

## 선행 검토 문서 (Required)
- `CLAUDE.md`, `instructions/README.md`
- `docs/reviews/programmer-08-home-tag-nav-top12-tags-page-review.md` §3·§8 (테스터 범위의 출처)
- `docs/handoffs/programmer-08-home-tag-nav-top12-tags-page.md`, `docs/handoffs/designer-01-home-tag-nav-cleanup.md`("도구 제약" 항목)

## 임무 (배포본 `https://ihatekongsandang.vercel.app` 에서만)
1. **모바일 390px**: `/`, `/tag/dmz`, `/tag/1군단`에서 태그 nav 높이(px)와 첫 게시물 카드 top(px), 가로 넘침 여부를 잰다. 리뷰어 재현값(실기기 아님): nav 130px, 첫 카드 top 638~658px, 뷰포트 844.
   - ⚠️ 디자이너 01에서 `resize_window`가 실제 폭을 바꾸지 못했다. 측정 전에 `window.innerWidth`와 `matchMedia`로 실제 폭을 확인하고 **실제 폭을 기록**한다. 390px을 못 만들면 쓴 방법과 실제 폭을 적고 "확인 필요"로 남긴다.
2. **데스크톱(실제 폭 기록)**: 같은 3개 페이지의 nav 높이·첫 카드 top.
3. **`/tags` 모바일·데스크톱**: 줄바꿈, 가로 넘침 없음, 칩 수 = 전체 태그 수(측정 시점 기준, 전수 카운트).
4. **키보드**: `/`에서 Tab 순서가 칩 → "전체 태그 보기" → 첫 카드인지, 포커스 링이 보이는지, Enter로 `/tags`로 가는지. `/tag/1군단`에서 맨 앞 활성 칩의 포커스. `/tags`에서 Tab으로 마지막 칩까지 순회(전수, 건너뛴 칩 수 0 확인).
5. **스크린리더**: macOS VoiceOver 또는 접근성 트리(`read_page` 등)로 칩 이름("#dmz … 게시물 40건"), 활성 칩 "현재 페이지", `/tags` 목록 항목 수, "전체 태그 보기 (N개)" 이름을 확인한다. 실제 VoiceOver를 못 돌리면 쓴 방법을 명시하고, iOS Safari 실기기는 "확인 필요".
6. **회귀**: `/en`과 `/en/page/2`에 태그 nav가 없는지. 활성 칩 건수 숫자 대비(리뷰 P2-1, 2.29:1)는 "기존 결함"으로만 기록한다.

## 산출물 (Required)
- `docs/qa/tester-02/report.md` — 페이지×뷰포트 실측표, 키보드·스크린리더 결과, 결함 목록(P1/P2/P3), 확인 필요 목록
- `docs/qa/tester-02/` 스크린샷(필요한 만큼), `docs/tools/tester-02/` 측정 스크립트·로그
- 핸드오프 `docs/handoffs/tester-02-deployed-tag-nav-top12.md` (커밋 대상 경로 목록 포함)

## 핸드오프 (Required)
- 🔴 `docs/triggers/tester-02-deployed-tag-nav-top12-COMPLETE.md` **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/tester/processed/` 이동

## 결정 사항·제약
- 🔴 코드·콘텐츠·설정 수정 금지. `npm run build`·`dev` 실행 금지(배포본만). git add·commit·push 금지.
- 브라우저 대화상자를 띄우는 동작 금지. 로그인·인증 입력 금지.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 테스터 (Sonnet 5) · 02-deployed-tag-nav-top12`
- 판정(통과/조건부/실패) · 실측표 요약 · 결함 · 확인 필요 · 산출물 경로
- history/{오늘}.md에 `## [HH:MM] 테스터 02 — 지시 → 행동 → 결과` append
- 말미: `— 테스터 (Sonnet 5) · 02-deployed-tag-nav-top12 종료 —`
