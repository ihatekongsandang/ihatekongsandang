# 업로더 17 — 비공인 실명 이니셜 전환 1차 (확정분)

담당: 반공-업로더 · 빌드 없음(validate만) · 커밋 금지(슈퍼바이저가 리뷰 후 커밋)

## 배경
- 사용자 결정(2026-11-10): #6 인물이 비공인이면 직함+이니셜·id 이전, 공익제보자 실명이 남은 문서 정리, 전체 게시물 비공인 실명 정리.
- 리뷰어 52가 418/418 전수 검사를 했다: `docs/triggers/reviewer-52-nonpublic-name-audit-COMPLETE.md`(이름은 P번호·초성으로만 적힘. 실제 위치는 부록의 파일:줄). 이름을 가린 판정표는 `docs/tools/reviewer-52/judgement-table-masked.tsv`.
- 이번 1차는 **현행 규칙만으로 결론이 나는 것**만 한다. N2·N3·N4·D1~D5는 사용자 결정·추가 확인 뒤 2차 오더로 보낸다(이번에 손대지 않음).

## 선행 문서 (반드시 읽기)
1. `CLAUDE.md`, `docs/poster/guide.md` §2(사적 개인 보호)·§4(id 규칙)·§4-1
2. 리뷰어 52 트리거 전체(특히 A-5 문안표, A-6 새 id·참조 파일, B-3 표, C 잔존, "업로더 수정 오더에 옮길 작업 목록")
3. id 이전 절차: `content/README.md` §6-1, `planning/q1-redirect-q2-sns-image-plan.md` §1, 선례 `instructions/uploader/processed/02-post1-id-move.md`
4. 표기 선례: `instructions/uploader/processed/16-sns-image-batch-14.md`(공익제보자 ㅈ씨 ↔ C)

## 할 일
1. **#6 id 이전**(리뷰어 52 작업 1): 새 id `2026-09-12-peoplepower7-civic-group-head-dp-card`. ko·en 파일 이름·frontmatter `id`, `content/retired-ids.txt`·`content/moved-ids.txt` 한 줄씩, `src/lib/content/moved-ids.ts`가 txt를 읽는 구조인지 확인(선례 02와 같은 방식으로만 — 코드 수정이 필요하면 멈추고 보고), `content/` 전체 옛 id 0건.
2. **#6 문구**(작업 2): A-5 표 ko 9줄·en 7줄 그대로. 가족 관계는 유지, 이름만 직함+이니셜(ko 초성씨, en 영문 이니셜). 단체명은 기사 표현 그대로.
3. **N1 15건·N1S 3건 이니셜 전환**(작업 6): B-3 표 순서(제목·설명에 실명 있는 것 먼저). 출처 `sources[].name`(기사 제목)은 이름 자리만 직함·이니셜로. P089는 en 표기를 ko 수준(ko처럼 계급+성 수준 — en은 계급+성 이니셜)으로. **N1에서 id·파일명에 이름이 들어간 게시물이 있으면** 1번과 같은 절차로 id 이전(새 id는 직함 영문 단어로).
4. **D6 계정 표시 이름 4건**: attribution 괄호 속 사람 이름 꼴 표시 이름을 빼고 핸들만(speaker도 핸들로). P177은 채널명이라 유지.
5. **문서 잔존 정리**(작업 3·11 중 확정분): 공익제보자 `docs/handoffs/translator-02-english-batch-2-opus.md:118`·`docs/tools/designer-04-B/data.json:1292`, #6 인물 `history/2026-10-01.md:34`·`docs/tools/reviewer-26/x-truncation-audit-output.txt:10`, 그리고 C 목록의 N1·N1S 인물 위치 전부(`design/v0.3-responsive/` 시안 포함) → 이니셜로 바꾸거나 이름 문자열만 삭제. #6 옛 id 문자열이 든 13파일 중 기록 문서(트리거·히스토리·도구 출력)는 그대로 두고, `content/`·`src/`·`public/` 밖에서 링크로 쓰이는 곳만 새 id로.
6. **updatedAt·갱신 이력**: 이번 표기 정정은 **updatedAt을 바꾸지 않고 갱신 이력도 넣지 않는다**(묶음 14 공익제보자 선례로 통일 — 슈퍼바이저 결정).
7. **검증**: `npm run validate:content` 통과. 리뷰어 52 부록의 N1·N1S·D6 각 위치가 0건인지 이름 문자열로 다시 grep(이름은 `$TMPDIR`에서만 다룬다). `git status --short`로 바뀐 경로 전체를 트리거에 기록.

## 🔴 금지
- git add·commit·push 금지(파일 이동은 `git mv` 말고 일반 `mv`). 빌드 금지. 코드(`src/`)·설정 수정 금지 — 필요하면 멈추고 보고.
- **트리거·오더·히스토리에 비공인 실명(성만 쓴 표기·로마자 포함)과 옛 id 문자열을 쓰지 않는다**(retired/moved txt 두 파일 제외). P번호·초성으로만 가리킨다.
- 사진 기자 바이라인 금지. 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- N2·N3·N4·D1~D5 대상은 건드리지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/uploader-17-nonpublic-name-initials-1-COMPLETE.md` — 항목별 바꾼 파일:줄(P번호), id 이전 목록(새 id), 0건 확인 결과, `git status --short` 전체, validate 결과.
- 끝나면 이 오더를 `instructions/uploader/processed/`로 옮기고 반공-슈퍼바이저에 한 줄로 알린다.
