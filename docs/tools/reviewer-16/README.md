# 리뷰어 16 — 프로그래머 08(태그 칩 상위 12 + `/tags`) 재현 로그

측정 시점: 2026-10-12 18:30~18:55, HEAD `364a2a9` 작업 트리(게시물 184건 · 태그 301개 — 프로그래머 08 측정 시점과 같음). 로컬 프로덕션 빌드.

| 파일 | 내용 |
|---|---|
| `build.log` | `npm run build` — 정적 페이지 723, `/tags` ○ Static |
| `measure-tag-nav.log` | `node docs/tools/programmer-08/measure-tag-nav.mjs --expect-limit 12` 재실행 — ✅ (프로그래머 수치와 동일) |
| `browser-independent-check.log` | 리뷰어 독립 대조(별도 기대값 + 브라우저 DOMParser, 공개 URL 343쪽 + sitemap), 라우팅, 칩 HTML 변경 전후 비교, 대비·키보드·390px 실측 |
| `tagnav-edge-cases.tsx.txt` | `TagNav` 경계값 렌더 스크립트(0개·5개·12개·12위·13위·꼴찌·없는 태그·인코딩·입력 변형). tsconfig가 `**/*.tsx`를 포함하므로 저장소 안에서는 `.txt`로 둔다 |
| `tagnav-edge-cases.log` | 위 스크립트 결과 — 9케이스 전부 기대대로, 입력 배열 변형 없음 |
| `typecheck-lint.log` | typecheck ✅ · lint 오류 0(경고 3 = 기존 `reviewer-04`·`reviewer-10` 파일) |
| `validate-content.log` | 368건 통과 · 오류 0 (🟡 description 길이 권고 22건은 기존 콘텐츠) |
| `clean-clone-gate-worktree.log` | `programmer-07/clean-clone-gate.sh --worktree` ✅ (임시 폴더 경로는 `<mktemp>`로 치환) |

경계값 스크립트 재실행(저장소 루트, 실행 후 임시 파일 삭제):
```bash
cp docs/tools/reviewer-16/tagnav-edge-cases.tsx.txt ./.edge.tsx && npx tsx ./.edge.tsx; rm -f ./.edge.tsx
```
