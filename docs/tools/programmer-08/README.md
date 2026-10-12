# 프로그래머 08 — 태그 칩 상위 12 + `/tags` 실측 도구·로그

측정 시점: 2026-10-12 16:00~16:30, HEAD `364a2a9` 작업 트리(게시물 184건 · 태그 301개). 로컬 프로덕션 빌드 기준.

| 파일 | 내용 |
|---|---|
| `measure-tag-nav.mjs` | 빌드 산출물(`.next/server/app`) 전수 대조. 기대값은 `content/posts/*.md` frontmatter를 직접 집계(앱 코드 미사용). `--expect-limit 12`로 판정, 없으면 기준선만 출력 |
| `before-baseline.log` | 변경 전 기준선 — 홈 16쪽·태그 피드 311쪽 모두 칩 301개 |
| `after-full-check.log` | 변경 후 전수 판정 — ✅ 통과 |
| `routing-check.log` | `next start` 실측: `/tags`·`/tags?page=2`·`/tags/`·`/en/tags`·`/tag/*`·robots·sitemap·`/tags` head 메타 |
| `browser-check.log` | 실브라우저(1280px) nav 높이·링크 수 |
| `build-before.log` / `build-after.log` | 정적 페이지 722 → 723 |
| `typecheck-lint.log` · `validate-content.log` | 검사 결과 (lint 경고 3건은 기존 `docs/tools/reviewer-04`·`reviewer-10` 파일, 이번 변경과 무관) |
| `clean-clone-gate-worktree.log` | `programmer-07/clean-clone-gate.sh --worktree` — ✅ 통과 (임시 폴더 경로는 `<mktemp>`로 치환) |

재실행:
```bash
npm run build
node docs/tools/programmer-08/measure-tag-nav.mjs --expect-limit 12
```
