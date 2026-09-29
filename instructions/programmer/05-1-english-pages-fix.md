# md오더: 프로그래머 (Opus 5) - 05-1-english-pages-fix

**작성일**: 2026-09-30 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 05-1
**세션**: 새 세션 권장 (05 작업 트리 그대로 이어서 수정 — 05 변경분은 아직 미커밋 상태).
**근거**: 리뷰어 10 판정 🟡 조건부 승인 — `docs/reviews/programmer-05-english-pages-review.md`

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 05(영어 페이지) 리뷰 지적사항을 반영한다. 🔴 커밋 금지(리뷰어 재확인 후 슈퍼바이저). 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- `docs/reviews/programmer-05-english-pages-review.md` (§1 D1 · §4 attribution 의견 · §5 P2-1~P2-5 · §7)
- `docs/handoffs/programmer-05-english-pages.md`
- `docs/tools/reviewer-10/patch-proposal/` (D1 수정안 초안 2개 — 문구는 프로그래머 판단)
- `content/README.md` §9

## 임무

### 1. 🔴 D1 (P1, 필수) — 범위 밖 `?page=` 404 회귀
- `/?page=999`·`/tag/{slug}?page=99`·`/en?page=99`가 사이트 404가 아니라 Next 기본 404(헤더·푸터 없음)로 렌더되는 문제.
- `src/app/(ko)/not-found.tsx`(`PageFrame locale="ko"` + 기존 404 문구)와 `src/app/(en)/not-found.tsx`(`PageFrame locale="en"` + 영어 문구) 추가. 리뷰어 초안 참고.
- 확인: 위 3경로 + `/page/999`·`/post/no-such`·`/en/post/no-such` 하이드레이션 후 화면(`docs/tools/reviewer-10/render-404.mjs`로 HEAD↔작업 비교). 상태 코드 404 유지, `/en?page=99`는 `lang="en"`·배너 없음.

### 2. 영어본 `attribution` 선택 필드 (슈퍼바이저 확정)
- 영어 페이지 상세의 "Source 인스타그램 @…"처럼 출처 표기가 한국어로 나오는 문제.
- 영어본 frontmatter에 **선택 필드 `attribution`** 추가. 규칙은 `speakerAffiliation`과 같게: 없으면 원본 값 사용, 괄호 밖 한글은 경고.
- 번역 범위는 **플랫폼명만**(인스타그램→Instagram, 스레드→Threads 등). 계정 핸들·괄호 안 원문 이름은 그대로 둔다(예: `Instagram @im_nowandhere (나우앤히어)`).
- 샘플 영어본에 이 필드 반영, `content/README.md` §9 표에 추가.

### 3. P2 정리 (같이 처리)
- **P2-1**: 전역 404에 WebSite JSON-LD가 빠짐 — 기존과 같게 맞춘다(가능한 범위에서).
- **P2-3**: `src/lib/floating-banner.ts` 6행 주석을 실제 구조(배너 본체는 서버 컴포넌트)에 맞게 고친다.
- **P2-4**: `content/README.md` §9의 "(in Korean)" 안내 보완 — 본문 링크가 가리키는 글에 영어본이 생기면 링크가 영어로 자동 전환되므로, 문구에서 "(in Korean)"을 붙이지 않도록 안내를 바꾸고(링크 문장 밖에 "Other posts on this issue (some in Korean)" 식 표기 권장), 샘플 본문도 그에 맞게 고친다.

### 4. 재실측 (리뷰 §7-2)
- validate · typecheck · lint · build (정적 페이지 수 대조)
- `render-404.mjs` HEAD↔작업 6경로
- `ko-html-diff` 한국어 전수 동일(의도된 추가분 외 0)
- `en-qa checks` 전수
- `static-i18n.mjs` 빌드 HTML 전수
- 독립 grep 0건
- 포커스 가림 전수는 not-found 추가가 정적 HTML을 바꾸지 않으면 생략 가능(수정 전후 정적 HTML 동일성을 숫자로 보고할 것)

## 산출물 · 핸드오프
- 코드: `src/**`, `scripts/validate-content.ts`, `content/README.md`, `content/posts-en/`(샘플)
- 핸드오프: `docs/handoffs/programmer-05-1-english-pages-fix.md` (변경 파일 표 · 재실측 숫자 · 자체 결정 · 미해결)
- 🔴 트리거: `docs/triggers/programmer-05-1-english-pages-fix-COMPLETE.md` (필수)
- 이 오더를 `instructions/programmer/processed/`로 이동 · history 기록
- **커밋 금지**

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 05-1-english-pages-fix
- 변경 파일 · 재실측 숫자 · 자체 결정 · 미해결
```
