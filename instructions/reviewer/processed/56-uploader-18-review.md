# 리뷰어 56 — 업로더 18(비공인 실명 2차) + 기획자 17-4 검증

담당: 리뷰어 (Opus, 하위 에이전트 — 리뷰어 54 이어서) · 빌드 없음 · 문서 리뷰만

## 검증 대상
1. 업로더 18: 오더 `instructions/uploader/processed/18-nonpublic-name-2.md`, 트리거 `docs/triggers/uploader-18-nonpublic-name-2-COMPLETE.md`, 변경은 `git status`·`git diff`(HEAD 29aa0e4 이후, 트리거에 적힌 경로만 판정)
2. 기획자 17-4: 오더 `instructions/planner/processed/17-4-existing-id-move.md`, 트리거 `docs/triggers/planner-17-4-existing-id-move-COMPLETE.md`, 변경 `git diff -- planning/` + `docs/poster/guide.md` §4 id 줄(슈퍼바이저 추가 1줄)
- 사용자 결정은 업로더 18 오더 상단과 같다(예외 4종·형사 절차 이니셜·예외 인물 기존 id도 이전·역사 인물 id 제외).

## 확인할 것
1. id 이전 5건: 절차·txt 형식·옛 id 0(content·src·public)·새 id에 이름 없음·리다이렉트 구조.
2. P194·P196 게시물 전체 이니셜(처음부터 끝까지, ko·en 일치), P155·P204·P205 이니셜(P204·P205 출처에 확정 보도가 정말 없는지 직접 열람), P024 직위 보강 문장이 출처와 맞는지.
3. **P087 공인 판정**: 업로더가 전 장관·전 의원으로 판정하고 직위·출처를 보강했다. 기사 직접 열람으로 경력 확인, 공수처법 제2조 1호(퇴직자 포함) 해당, 추가한 출처가 `sources[]` 형식·날짜에 맞는지.
4. **카드 이미지 4장**(오더 2장 + 범위를 넘긴 P194·P196 2장): 직접 열어 글자를 읽는다. 실명 0, alt(ko·en)와 글자 일치, 1200×675, 편집 정책(단정 표현·출처 표기) 위반 없음. 범위를 넘긴 2장은 같은 원칙(비공인 실명 제거)이라 정당한지 판정.
5. 리뷰어 54 P3-1~P3-4 정정 확인.
6. updatedAt 불변, validate 418/418.
7. 범위 밖 잔존 14파일 목록이 맞는지(3차 오더 입력용) — 목록만.
8. 기획자 17-4: (b) 결정이 PRD·정책·guide에 일관, 옛 문구 0.
9. 트리거·오더·히스토리에 실명·옛 id 0(두 txt 제외), 저장소 독립 grep 0.

## 🔴 금지
- git add·commit·push·rm·checkout 금지. 파일 수정 금지(산출물 제외). 빌드 금지(validate:content 허용).
- 산출물에 비공인 실명·옛 id·다른 서비스명·계정명·홈 디렉터리 절대경로 금지. 도구는 `.mjs`로 `docs/tools/reviewer-56/`. 이름이 든 중간 결과는 `$TMPDIR`에만.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-56-uploader-18-review-COMPLETE.md` — 판정, 결함 P1·P2·P3, 3·4번 판정, 커밋할 경로 목록.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
