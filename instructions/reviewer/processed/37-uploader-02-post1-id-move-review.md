# 리뷰어 37 — 업로더 02 #1 주소 이전 커밋 전 게이트

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-09 · 실행: 하위 에이전트(opus)

## 선행 문서
- `docs/triggers/uploader-02-post1-id-move-COMPLETE.md`, 오더 `instructions/uploader/processed/02-post1-id-move.md`
- `content/README.md` §6-1(절차·검증 a~h), `docs/triggers/reviewer-35-uploader-01-portal-source-review-COMPLETE.md` P3-1

## 확인할 것
1. 옛 ko·en 파일 ↔ 새 파일 내용 비교: frontmatter `id` 외 차이는 영어본 직함 2곳뿐인지(`git diff --no-index` 또는 HEAD 파일과 대조).
2. `moved-ids.txt`·`retired-ids.txt` 한 줄씩, 형식·사슬·순환 없음. 옛 id 문자열이 두 txt 밖(content·src·public·트리거·오더)에 0건.
3. `npm run validate:content` 직접 실행(빌드 금지). 단위 수준에서 리다이렉트 규칙 생성 함수가 기대 규칙 2개(`/post/옛`→`/post/새`, `/en/post/옛`→`/en/post/새`)를 내는지 tsx로 확인.
4. 영어본 한 문장에 직함 3회 반복 — 문체 판단(줄일지). 성별 대명사·Mr./Ms. 0. 새 id에 비공인 실명 없음.
5. 저장소 독립 grep(대상: 위 6개 경로 + 트리거·오더).

## 금지
git 쓰기·빌드·npm install·파일 수정 금지(지적만). 옛 id·비공인 실명을 산출물에 쓰지 않는다.

## 🔴 완료 트리거 (필수)
`docs/triggers/reviewer-37-uploader-02-post1-id-move-review-COMPLETE.md`: 실제 모델 ID, 판정, 결함, 수치, 커밋 경로 목록. 도구는 `docs/tools/reviewer-37/`. 오더는 `processed/`로.
