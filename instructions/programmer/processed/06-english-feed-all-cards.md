# md오더: 프로그래머 (Opus 5) - 06-english-feed-all-cards

**작성일**: 2026-09-30 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 06
**세션**: 새 세션 권장 (05·05-1은 커밋·배포 완료 `853df27`).
**사용자 지시 원문**: "지금 english 버튼 누르면 번역된 카드만 노출되는데, 일단 모든카드 노출하는걸로수정해"

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 영어 피드(`/en`)가 **영어본이 없는 게시물까지 모든 카드를 보여 주도록** 바꾼다. 🔴 커밋 금지(리뷰어 판정 후 슈퍼바이저). 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- `CLAUDE.md`
- `docs/handoffs/programmer-05-english-pages.md`, `docs/handoffs/programmer-05-1-english-pages-fix.md`
- `docs/reviews/programmer-05-1-english-pages-fix-review.md` (§4-1 후속 · §5 P2-A·P2-B·P2-C)
- `src/app/(en)/en/page.tsx`, `src/app/(en)/en/page/[page]/page.tsx`, `src/components/{feed-view,post-grid,post-card,card-media}.tsx`, `src/lib/content/{load,view,translation}.ts`, `src/lib/i18n.ts`
- `content/README.md` §9

## 임무

### 1. 영어 피드 = 전체 게시물 (필수)
- `/en`·`/en?page=n`은 한국어 피드와 **같은 게시물 전체·같은 순서·같은 페이지 크기(12)** 로 보여 준다.
- **영어본 있는 글**: 지금처럼 영어 카드(영어 제목·영어 alt) → `/en/post/{id}`.
- **영어본 없는 글**: 한국어 원본 카드를 그대로 보여 주되
  - 제목 등 한국어 텍스트에 `lang="ko"`
  - 카드에 작은 표시 `Korean only` (영어 UI 사전에 추가, 한국어 페이지에는 나오지 않음)
  - 링크는 한국어 상세 `/post/{id}` (`/en/post/{id}`는 여전히 404 — 영어 상세는 영어본 있는 글만). 링크에 `hrefLang="ko"`.
  - 카드 이미지 alt는 한국어 원본 값 그대로(`lang` 처리 가능 범위에서).
- 영어 피드 상단 안내 한 줄(슈퍼바이저 확정 문구, 임의 변경 금지): `Posts marked "Korean only" have not been translated yet and open in Korean.`
- 영어 피드 h1·메타·canonical·hreflang 규칙은 그대로. sitemap의 `/en/post/…`는 영어본 있는 글만(변경 없음).
- GA 카드 이벤트: 영어 피드에서 한국어 카드 클릭도 `language: 'en'` 파라미터 유지(피드 언어 기준), 필요하면 `translated: true/false` 추가는 프로그래머 판단.

### 2. 리뷰 11 후속 (같이 처리)
- **P2-C**: 그룹 404(`(ko)`·`(en)` `not-found.tsx`)의 robots 메타 중복 — 리뷰어 스크래치 검증안(`docs/tools/reviewer-11/robots-experiment/`) 반영.
- **P2-A**: 영어본 `attribution`·`speakerAffiliation`에 문자열이 아닌 값이면 "문자열이 아니라 무시됨" 경고.
- **P2-B**: `attribution`에 원본에 없는 `@핸들`이 들어가면 경고(누락 경고와 대칭).

### 3. 검증
- validate · typecheck · lint · build (정적 페이지 수 대조 — 영어 피드 페이지 수가 한국어 피드와 같아지는지)
- `/en`·`/en?page=2`·마지막 페이지: 카드 수·순서가 한국어 피드와 일치, 영어본 있는 카드 → `/en/post/…`, 없는 카드 → `/post/…` + `Korean only` 표시 + `lang="ko"`
- 한국어 페이지 HTML 전수: 의도 외 차이 0 (`docs/tools/programmer-05/ko-html-diff.mjs`)
- 영어 페이지 전수(`docs/tools/reviewer-10/static-i18n.mjs` 등) 갱신·통과, `en-qa` 갱신·통과
- 390px / 1280px 캡처: `/en` 첫 화면(영어 카드와 Korean only 카드가 섞인 상태)
- 독립 grep 0건

## 산출물 · 핸드오프
- 코드: `src/**`, `scripts/validate-content.ts`(필요 시), `content/README.md`(필요 시)
- 캡처: `docs/qa/programmer-06/`
- 핸드오프: `docs/handoffs/programmer-06-english-feed-all-cards.md`
- 🔴 트리거: `docs/triggers/programmer-06-english-feed-all-cards-COMPLETE.md` (필수)
- 이 오더를 `instructions/programmer/processed/`로 이동 · history 기록
- **커밋 금지**

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 06-english-feed-all-cards
- 변경 파일 · 캡처 N장 · 빌드/검증 결과 · 자체 결정 · 미해결
```
