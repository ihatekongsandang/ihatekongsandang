# 리뷰어 54 — 업로더 17(비공인 실명 이니셜 전환 1차) 검증

담당: 리뷰어 (Opus, 하위 에이전트) · 빌드 없음(게이트는 슈퍼바이저가 커밋 때 실행) · 문서 리뷰만

## 검증 대상
- 오더 `instructions/uploader/processed/17-nonpublic-name-initials-1.md`, 트리거 `docs/triggers/uploader-17-nonpublic-name-initials-1-COMPLETE.md`
- 기준: `docs/triggers/reviewer-52-nonpublic-name-audit-COMPLETE.md`(A-5 문안, B-3 N1·N1S·D6, C 잔존, 작업 목록), `docs/tools/reviewer-52/judgement-table-masked.tsv`
- 변경 전체: `git status --short`·`git diff` (작업 폴더는 다른 세션과 공유 — 업로더 17 트리거에 적힌 경로만 대상. 그 밖의 변경은 목록만 적고 판정하지 않는다)

## 확인할 것
1. **id 이전 2건**(#6, P089): ko·en 파일 이름·frontmatter id, `content/moved-ids.txt`·`retired-ids.txt` 형식(선례 `instructions/uploader/processed/02-post1-id-move.md`와 같은지), `content/`·`src/`·`public/`에 옛 id 0건, 새 id에 이름 없음. moved-ids가 빌드 때 `next.config.ts` redirects로 이어지는 구조(코드 수정 없이 동작하는지)는 코드를 읽어 확인.
2. **N1 14·N1S 3·D6** 전 위치: 리뷰어 52 부록의 파일:줄 전부가 바뀌었는지(이름 문자열 grep은 `$TMPDIR`에서만 — 리뷰어 52 원본 판정표가 저장소 밖에 없으면 git HEAD에서 이름을 꺼내 변수로 다룬다). 표기 방식이 선례(ko 초성씨, en 영문 이니셜)와 같고 ko·en 이니셜이 서로 맞는지. 문장이 깨지거나 뜻이 바뀐 곳(관계·직함 누락, 남은 조사 "씨씨" 등) 없는지.
3. **P020 보류 판정**: 업로더가 "전직 17대 국회의원으로 보도"를 이유로 보류했다. 정책 §3.1 고위공직자 행(공수처법 제2조 1호 — 재직자 또는 퇴직자)·PRD §6③로 공인인지 판정하고, 그 보도가 `sources[]` 기사에 실제로 있는지 직접 연다. 공인이면 실명 유지가 맞고, 이번 사건(게시물 주제)이 공적 활동 범위인지도 적는다.
4. **D6 32파일**: attribution 괄호 표시 이름 삭제가 리뷰어 52 D6 4건 범위를 넘었는지(32파일이면 같은 계정의 여러 게시물인지), 넘었다면 지워도 되는 것인지(CLAUDE.md "계정명만 표기" 규칙).
5. **문서 정리 22파일**: 공익제보자·#6·N1 이름이 남지 않았는지, 기록 문서의 의미가 깨지지 않았는지, `docs/tools/` 스크립트(gen.py·content.mjs)를 고쳤다면 실행 결과에 영향 없는지. `design/v0.3-responsive/` 시안 10개.
6. **updatedAt 미변경** 원칙 준수.
7. **업로더 보고 2건**: 자체 카드 이미지 2장 안 글자에 이름(대장동 녹취, 이진숙 기자회견 게시물) — 어떤 인물(P번호)인지, 공인이면 문제없음/비공인이면 디자이너 재제작 대상으로 판정. #6 ko description 161자 경고가 기준 위반인지(validate 기준).
8. 트리거·오더·히스토리에 실명·옛 id(두 txt 제외) 0건, 저장소 독립 grep 0건.

## 🔴 금지
- git add·commit·push·rm·checkout 금지. 파일 수정 금지(산출물 제외). 빌드 금지(`npm run validate:content`는 허용).
- 산출물에 비공인 실명·옛 id·다른 서비스명·계정명·홈 디렉터리 절대경로를 쓰지 않는다. 도구는 `.mjs`로 `docs/tools/reviewer-54/`.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-54-uploader-17-review-COMPLETE.md` — 판정, 결함 P1·P2·P3(파일:줄, 고칠 문안), 3·7번 판정, 커밋할 경로 목록(업로더 17 범위 정확히).
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
