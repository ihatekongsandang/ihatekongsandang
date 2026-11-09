# 리뷰어 36 — 프로그래머 16 커밋 전 게이트 완료 트리거

**작성일**: 2026-11-09 | **작성 세션**: 리뷰어 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`) · 하위 에이전트
**본문**: `docs/reviews/programmer-16-review.md` · **도구**: `docs/tools/reviewer-36/` · **오더**: `instructions/reviewer/processed/36-programmer-16-review.md`

> git 쓰기 0 · 빌드 0 · 코드·문서 수정 0. `next start -p 3916`(기존 `.next`)은 확인 후 종료(LISTEN 0).

## 판정
**조건부 승인 — P1 0 · P2 1 · P3 5.**
- 커밋 단위 **A 승인**(지금 커밋 가능).
- 커밋 단위 **B는 P2-1 수정 후 커밋 권장**. 목록 0건이라 지금 배포해도 리다이렉트 0개(확인)여서, B를 먼저 커밋하고 16-1에서 고치는 것도 허용한다. **업로더 02(#1 이전)는 P2-1 수정·리뷰 뒤에만** 한다.

## 결함
- **P2-1** 검증 f가 새 id 게시물 존재를 파일명으로도 인정 → 파일명만 새 id·frontmatter id 오타면 오류 0으로 404 리다이렉트 생성(재현 `c11-edge-checks.ts` 5번). f는 frontmatter id 집합만 보도록 + 단위·돌연변이 사례 추가.
- P3-1 `readTranslationIds`가 0건이어도 영어본 209개를 읽고 try/catch 없음(직접 `npx next build` 시 파일명 없는 YAML 오류). 0건이면 바로 빈 집합 권장.
- P3-2 이동 경로 포커스 외곽선 왼쪽 변이 360·390폭에서 화면 밖(나머지 세 변은 보임, AA 충족) — 디자이너 확인.
- P3-3 `docs/tools/programmer-16/word-grep.sh` 2줄이 슈퍼바이저 지정 grep에 걸림(검출용 정규식 글자, 훅에는 안 걸림) — 오탐 처리 여부 결정.
- P3-4 `retired-ids.ts` 빈 줄 2개.
- P3-5 `history/2026-10-01.md`·`2026-11-05.md` 수정은 오더 밖 — A·B에 넣지 말 것.

## 확인한 수치
- C4 소스 대 계획 §2.2 글자 대조 **36/36**(ko 9·en 9 항목, 리뷰 §2.4 12줄, 굵게 7조각, 약관 diff 0) · 양성 대조 3/3
- 사실: 209건 · 대표 이미지 206(self 206 · news 0 · public 0) · "원문" 캡션 139 · 그 밖 67 · 없음 3
- C3: src 비주석 "태그" 2줄(둘 다 HTML 태그 오류 메시지) · `/tags` 화면 "태그" 0
- C11: 단위 재실행 **46/46** · 돌연변이 **16/16** · 가장자리 13/13 + P2-1 재현 · typecheck exit 0 · lint(변경 15 + 도구) 0 errors · validate 418 통과 · moved 0건 · routes-manifest 사용자 리다이렉트 0
- 서버 응답 **19/19**(about·en/about·tags 200, 없는 id ko·en 404, #1 현 주소 ko·en 200)
- 저장소 독립: 대상 112개 · 지정 grep 2줄/1파일(P3-3) · 옛 #1 id 0 · 이름 조각 0

## 커밋 경로
**A — 9개**: `src/lib/i18n.ts` · `src/app/(ko)/tags/page.tsx` · `src/app/(ko)/tag/[slug]/page.tsx` · `src/app/(ko)/tag/[slug]/page/[page]/page.tsx` · `src/app/llms.txt/route.ts` · `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` · `src/components/post-detail.tsx` · `src/components/feed-view.tsx`

**B — 8개**: `src/lib/content/moved-ids.ts`(신규) · `content/moved-ids.txt`(신규) · `next.config.ts` · `scripts/validate-content.ts` · `src/lib/content/load.ts` · `src/lib/content/retired-ids.ts` · `src/lib/content/schema.ts` · `content/README.md`

**기록(B 권장, B를 미루면 A에 넣어도 됨)**: `docs/tools/programmer-16/` · `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md` · `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md` · `instructions/programmer/16-copy-terms-breadcrumb-moved-ids.md`(삭제) + `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md` · `history/2026-11-09.md` · `docs/reviews/programmer-16-review.md` · 이 트리거 · `docs/tools/reviewer-36/` · `instructions/reviewer/processed/36-programmer-16-review.md`
