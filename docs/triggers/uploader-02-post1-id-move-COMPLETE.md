# uploader-02-post1-id-move — COMPLETE

- 담당: 반공-업로더 · 모델 ID `claude-opus-5-5` · 2026-11-09
- 오더: `instructions/uploader/processed/02-post1-id-move.md`
- 새 id: `2026-08-06-owloffreedom-707-commander-sentencing`

## 바꾼 경로 (`git status` 기준)
| 상태 | 경로 |
|---|---|
| D (옛 파일) | `content/posts/` 의 #1 옛 파일 |
| D (옛 파일) | `content/posts-en/` 의 #1 옛 파일 |
| ?? (새) | `content/posts/2026-08-06-owloffreedom-707-commander-sentencing.md` |
| ?? (새) | `content/posts-en/2026-08-06-owloffreedom-707-commander-sentencing.md` |
| M | `content/retired-ids.txt` (옛 id 한 줄 추가) |
| M | `content/moved-ids.txt` (`옛id 새id` 한 줄 추가) |
- 커밋 시 옛 파일 2개는 삭제로, 새 파일 2개는 추가로 함께 넣어야 git이 이름 변경으로 인식한다.

## README §6-1 절차
1. ko·en 파일 이름 변경(내용 그대로 mv) + frontmatter `id` 두 곳 새 id로 변경 — 완료.
2. 이미지: `public/images/` 에 #1 옛·새 폴더 모두 없음(업로더 01에서 삭제·커밋됨), 게시물에 `image` 블록·`/images/` 참조 없음 — 확인.
3. `content/` 전체 옛 id 링크: 0건(아래 grep).
4. `retired-ids.txt`·`moved-ids.txt` 각 한 줄 — 완료. 사슬 없음(새 id가 다른 줄의 옛 id 아님, 목록에 기존 이동 0건).
- `updatedAt`(2026-11-09)·`translatedAt`(2026-11-09)·갱신 이력 줄은 바꾸지 않음(오더 2항). 갱신 이력 문구에 주소 이전 언급을 넣을지는 리뷰어 판단으로 남김 — 현재 이력 줄은 "실명 → 직함·이니셜" 설명이며 주소 이전은 내용 변경이 아니라 넣지 않았다.

## 영어본 직함 보완 (리뷰 35 P3-1)
- "What reports confirm" 둘째 줄: "took K into custody" → "took the former 707th commander K into custody", "; K appealed" → "; the former 707th commander K appealed".
- 같은 문장 앞쪽에 이미 "sentenced the former 707th commander K"가 있어 직함이 한 문장에 세 번 나온다(오더 문구대로 둠). 줄이려면 리뷰어 판단 — 예: 첫 번째만 남기고 뒤 둘을 "the former commander"로.
- 성별 대명사·Mr./Ms. 없음.

## 검증
- `npm run validate:content`: ✅ 검증 통과, R=0, #1 id 경고 0 (moved-ids 규칙 a~h·이미지 폴더 규칙 포함).
- 옛 id grep(`content/`·`public/`·`src/`): `moved-ids.txt`·`retired-ids.txt` 외 0건.
- 빌드·git add·commit·push 하지 않음.
- 배포 후 확인할 것: `curl -I /post/{옛 id}`·`/en/post/{옛 id}` → 308, Location `/post/2026-08-06-owloffreedom-707-commander-sentencing`·`/en/post/…`.
