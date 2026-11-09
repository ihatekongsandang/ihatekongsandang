# 리뷰어 52 — 전체 게시물 비공인 실명 전수 검사 + #6 인물 공인 판정

담당: 리뷰어 (Opus, 하위 에이전트) · 빌드 없음 · 파일 수정은 아래 산출물만

## 배경 (사용자 결정 2026-11-10)
- 특별검사·특별검사보는 공인으로 본다(guide §4-1 반영 완료).
- `content/posts*/2026-09-12-peoplepower7-…-dp-card.md`(#6, 현재 id `2026-09-12-peoplepower7-civic-group-head-dp-card`)의 인물(제목·설명·본문·태그·id에 실명)이 공인인지 확인한다. 비공인이면 직함+이니셜로 바꾸고 id를 옮긴다(이번 오더는 판정과 수정안까지, 수정은 업로더).
- 공익제보자 실명이 저장소 문서 2개(`docs/tools/designer-04-B/data.json`, `docs/handoffs/translator-02-english-batch-2-opus.md`)에 남아 있다. 지운다(수정은 업로더). 다른 남은 곳이 있는지도 찾는다.
- 전체 게시물 비공인 실명 전수 검사를 한다.

## 선행 문서 (반드시 읽기)
1. `CLAUDE.md` — 편집 정책·저장소 독립 원칙
2. `planning/prd.md` §6③ — 실명 기준(공인 앵커)
3. `planning/card-image-policy.md` §3.1 공인 범위표·비공인 표
4. `docs/poster/guide.md` §2 "사적 개인·미성년자 보호"·§4-1 판단 선례(특검 공인 포함)
5. `planning/q1-redirect-q2-sns-image-plan.md` — id 이전 절차
6. 선례: `instructions/uploader/processed/02-post1-id-move.md`(#1 ㄱ씨 ↔ K), `instructions/uploader/processed/16-sns-image-batch-14.md`·`docs/triggers/reviewer-51-uploader-16-sns-batch-14-review-COMPLETE.md`(공익제보자 ㅈ씨 ↔ C)

## 할 일
### A. #6 인물 판정
- 그 인물의 직위를 `sources[]` 기사 본문(직접 열람)과 정책 §3.1·PRD §6③으로 판정한다. 직위는 기사로 확인한 것만 인정. 공인 가족이라는 것만으로 공인이 아니다.
- 비공인이면: ko·en 모든 표기 위치(제목·description·본문·태그·sources `name`·image 필드·id·파일명·이미지 폴더)와 바꿀 문안(ko 직함+이니셜, en 이니셜 — 선례와 같은 방식), 새 id 제안, 이 id를 참조하는 다른 파일 목록을 적는다. 가족 관계(공인의 친형) 표기가 결국 신원을 특정하는지도 판단해 문안을 제안한다.

### B. 전수 검사
- `content/posts/` 209개 + `content/posts-en/` 209개 전부. 샘플 갈음 금지. 검사 파일 수를 결과에 적어 209/209로 맞춘다.
- 사람 이름(한글·로마자)이 나오는 곳 모두: id·파일명·title·description·tags·sources `name`·image(alt·caption·creditName·faceNote)·본문.
- 각 이름을 (가) 공인(§3.1·PRD §6③, 근거 직위) (나) 비공인 (다) 확인 불가로 나눈다. 언론사·기자 바이라인(사진 기자 포함)은 비공인.
- 운영자·계정명(SNS 계정 핸들)은 이름이 아니라 계정이면 허용(CLAUDE.md 일반인 계정 규칙).
- 도구는 `.mjs`로 `docs/tools/reviewer-52/`에 둔다(`.ts` 금지 — 게이트가 typecheck함).

### C. 문서 잔존
- 공익제보자 실명(한글 전체·성만 쓴 표기·로마자)이 `content/` 밖 추적 파일 어디에 남았는지 전부 찾는다(`git ls-files` 기준). #6 인물·B에서 나온 비공인 이름도 같이.

## 🔴 금지
- git 명령 중 add·commit·push·rm·checkout 금지. 콘텐츠·코드·설정 수정 금지. 빌드 금지.
- **비공인 실명을 산출물(트리거·핸드오프·저장소 안 도구 출력 파일)에 쓰지 않는다.** 파일:줄과 이니셜로만 가리킨다. 이름이 들어간 중간 결과는 `$TMPDIR` 아래에만 둔다.
- 다른 서비스명·계정명·홈 디렉터리 절대경로를 쓰지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-52-nonpublic-name-audit-COMPLETE.md`
  - A 판정과 근거(기사·조항), 비공인이면 수정 위치 전체·문안·새 id·참조 파일
  - B 결과표: (나)·(다) 전부를 파일:줄·위치·이니셜·판정 근거·권장 조치로. (가)는 건수와 직위 분류만. 검사 수 209/209
  - C 잔존 목록(파일:줄)
  - 업로더 수정 오더에 그대로 옮길 수 있는 작업 목록
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
