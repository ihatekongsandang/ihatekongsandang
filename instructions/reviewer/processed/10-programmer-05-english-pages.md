# md오더: 리뷰어 (Opus 5.5) - 10-programmer-05-english-pages

**작성일**: 2026-09-30 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 10
**세션**: 새 세션 권장.
**대상**: 프로그래머 05 — 영어 페이지(`/en`) 구조 (미커밋 작업 트리)

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5). 프로그래머 05 변경분을 코드 리뷰하고 직접 재실측해 **승인 / 조건부 승인 / 반려**를 판정한다. 코드를 직접 고치지 않는다(수정 필요 시 지적만). 🔴 커밋 금지. 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- `CLAUDE.md`
- 오더: `instructions/programmer/processed/05-english-pages.md`
- 핸드오프: `docs/handoffs/programmer-05-english-pages.md` (검증 숫자·결정 1~10·미해결 1~5)
- 트리거: `docs/triggers/programmer-05-english-pages-COMPLETE.md`
- 이전 리뷰: `docs/reviews/programmer-04-floating-banner-review.md`, `docs/reviews/programmer-04-1-floating-banner-focus-fix-review.md`
- `content/README.md` §9, `content/posts-en/` 샘플 1건

## 임무

### 1. 재실측 (핸드오프 숫자를 그대로 믿지 말고 직접 실행)
- `npm run validate:content` · typecheck · lint · build — 정적 페이지 수 357→361 대조
- `npx next start -p 3105` 후 `node docs/tools/programmer-05/en-qa.mjs http://localhost:3105 checks` (128건)
- HEAD 스크래치 빌드와 `docs/tools/programmer-05/ko-html-diff.mjs` 전수 비교 (한국어 350/350, 의도된 추가분 외 차이 0)
- `npx tsx docs/tools/programmer-05/unit-checks.ts` (53건)
- 🔴 **플로팅 배너 회귀**: 헤더에 언어 전환 nav가 늘었으므로, 04·04-1 때 쓴 배너 기하·포커스 가림 도구를 `/en/**` 제외하고 다시 돌려 한국어 페이지에서 WCAG 2.4.11 포커스 가림이 새로 생기지 않았는지 확인(핸드오프 미해결 2).
- 커버리지는 숫자로 보고(검사 수 = 전체 규모 대조). 샘플 갈음 금지.

### 2. 코드 리뷰 중점
- 결정 1: 라우트 그룹별 루트 레이아웃 `(ko)`/`(en)` + `experimental.globalNotFound` — 한국어 URL·동작 불변, 전역 404 동작, 실험 플래그 위험도
- 결정 3: 헤더·main·푸터를 `PageFrame`으로 옮긴 구조 — 한국어 DOM 순서·스킵 링크·배너 탭 순서 불변
- 영어본 스키마(`translation.ts`)·로더의 견고성 — 원본 없음·id 불일치·조건부 필수·잘못된 영어본이 빌드를 막는지
- hreflang(양방향·x-default)·canonical·sitemap alternates·robots `Disallow: /en/page/`
- 본문 링크 치환(`/post/{id}` → `/en/post/{id}`, 영어본 없으면 유지)
- 영어 페이지 배너 미표시·여백 없음, 한국어 페이지 배너 그대로
- 독립 grep 0건

### 3. 슈퍼바이저 판단 (리뷰어는 반영 여부만 확인)
- 결정 4(OG 이미지 = 사이트 자체 OG, 원문 썸네일 미사용): **승인** — 기존 정책 유지가 맞다.
- 결정 6(영어 UI 문구 사전 번역): **승인**.
- 참고(수정 요구 아님, 후속 과제로 기록만): 영어 상세 메타의 `Source 인스타그램 @… (…)`처럼 attribution이 한국어로 나온다. 영어본에 `attribution` 번역 필드를 둘지 후속 오더에서 정한다 — 리뷰어 의견 있으면 적어 달라.

## 산출물 · 핸드오프
- 리뷰: `docs/reviews/programmer-05-english-pages-review.md` (판정 · 재실측 숫자 표 · 지적사항(심각도 P0~P2) · 후속 과제)
- 필요 시 도구: `docs/tools/reviewer-10/`
- 🔴 트리거: `docs/triggers/reviewer-10-programmer-05-english-pages-COMPLETE.md` (필수)
- 이 오더를 `instructions/reviewer/processed/`로 이동 · history 기록
- **커밋 금지** — 승인 시 슈퍼바이저가 커밋

## 완료 보고 양식
```
📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 10-programmer-05-english-pages
- 판정 · 재실측 숫자 · 지적사항(P0/P1/P2 건수) · 후속 과제
```
