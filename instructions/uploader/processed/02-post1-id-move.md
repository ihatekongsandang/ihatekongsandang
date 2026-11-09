# 업로더 02 — #1 게시물 주소(id) 이전 + 영어본 직함 보완

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-09 · 실행: 반공-업로더 창
**사용자 결정**: Q1 = b(#1 주소의 비공인 실명을 없애고 옛 주소는 새 주소로 308 이동). 장치는 커밋 `4c10ca9`로 배포됨(현재 목록 0건).

## 선행 문서
- `content/README.md` §6-1(절차 1~5와 검증 a~h — 이대로 한다), §3.1 id 행
- `planning/q1-redirect-q2-sns-image-plan.md` §1.6
- `docs/triggers/reviewer-35-uploader-01-portal-source-review-COMPLETE.md` P3-1

## 대상
- 현재 #1 게시물: `content/posts/` 와 `content/posts-en/` 에서 파일명이 `2026-08-06-owloffreedom-` 로 시작하는 1건(ko·en 각 1개).
- **새 id: `2026-08-06-owloffreedom-707-commander-sentencing`** (슈퍼바이저 결정).

## 할 일
1. README §6-1 절차 1~4를 그대로 한다: ko·en 파일 이름 변경 + frontmatter `id` 두 곳, 이미지 폴더는 이미 삭제됨(있으면 확인), `content/` 전체 옛 id 링크 0, `retired-ids.txt`·`moved-ids.txt` 각 한 줄.
2. `updatedAt`과 갱신 이력은 바꾸지 않는다(주소만 옮긴 것이라 내용 변경 아님). 이력 줄이 이미 형식상 필요하면 리뷰어에게 판단을 남긴다.
3. 영어본 "What reports confirm" 둘째 줄: "took K into custody"·"; K appealed" 두 곳에 "the former 707th commander"를 붙인다(리뷰 35 P3-1). 성별 대명사·Mr./Ms. 쓰지 않는다.
4. `npm run validate:content` 통과(빌드는 하지 않는다 — 리뷰어·슈퍼바이저 게이트에서 한다).
5. `git status`로 바뀐 경로를 확인해 트리거에 적는다.

## 금지
git add·commit·push 금지(슈퍼바이저가 리뷰어 게이트 뒤 커밋). 다른 게시물 수정 금지. `next build`·`npm run build` 금지. 오더·트리거·커밋 대상 파일에 비공인 실명(한글·로마자) 새로 쓰지 않는다 — 옛 id 문자열은 `moved-ids.txt`·`retired-ids.txt` 두 파일에만. 다른 서비스명·계정명·홈 절대경로 금지.

## 🔴 완료 트리거 (필수)
`docs/triggers/uploader-02-post1-id-move-COMPLETE.md`: 실제 모델 ID, 바꾼 경로 목록(이동은 옛→새를 "옛 파일"로만 표기, 옛 id 문자열 쓰지 말 것), validate 결과, 옛 id grep 결과(두 txt 외 0건). 오더는 `instructions/uploader/processed/`로. 완료 시 반공-슈퍼바이저에 SendMessage.
