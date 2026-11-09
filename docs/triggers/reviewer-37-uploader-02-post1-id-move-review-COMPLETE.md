# reviewer-37-uploader-02-post1-id-move-review — COMPLETE

- 담당: 반공-리뷰어 (하위 에이전트) · 모델 ID `claude-opus-5-5` · 2026-11-09
- 오더: `instructions/reviewer/processed/37-uploader-02-post1-id-move-review.md`
- 대상: 업로더 02 (#1 주소 이전 + 영어본 직함 보완), 새 id `2026-08-06-owloffreedom-707-commander-sentencing`
- 옛 id는 이 문서와 도구 출력에 쓰지 않았다(스크립트는 git HEAD 옛 파일명에서 읽어 변수로만 쓰고 출력은 `<OLD>`로 가림).

## 판정: ✅ 통과 (커밋 가능, 막는 결함 없음)

## 확인 결과
1. **내용 비교**(HEAD 옛 파일 ↔ 새 파일, `diff`): ko는 frontmatter `id` 1줄만 다름. en은 `id` 1줄 + "What reports confirm" 둘째 줄 1줄(직함 2곳 추가)만 다름. `updatedAt`·`translatedAt`·갱신 이력 줄 그대로.
2. **txt**: `moved-ids.txt` 비주석 줄 1개(`옛id 새id`, 공백 1개, 끝 줄바꿈 있음), `retired-ids.txt` 옛 id 1줄 추가. 옛 id는 각 파일에 1회. 이동 1건뿐이라 사슬·순환 없음(새 id는 옛 id 목록·retired 목록에 없음).
   - 옛 id 문자열(및 그 안 실명 로마자) grep: `content/`·`src/`·`public/`·업로더 02 트리거·오더·이 오더 → 두 txt 외 **0건**. 새 ko·en 파일 0건. `public/images/`에 #1 폴더 0, 두 게시물 `/images/` 참조 0.
3. **`npm run validate:content`** 직접 실행: exit 0, 418건 통과·실패 0, 옮긴 id 1건·리다이렉트 규칙 2개·오류 0 (`docs/tools/reviewer-37/validate-output.txt`).
   - **tsx 단위 확인**(`docs/tools/reviewer-37/redirect-rules-check.ts` → `redirect-rules-output.txt`): `next.config.ts`와 같은 `readMovedIds`+`readTranslationIds`+`movedIdRedirects` 경로로 규칙 2개 생성, `/post/<OLD>`→`/post/{새}`·`/en/post/<OLD>`→`/en/post/{새}` 모두 `permanent: true` PASS, 새 id 영어본 존재 true, `collectMovedIdErrors` 0 → ALL PASS.
4. **영어본 문체**: 성별 대명사(he/she/him/her/his 등)·Mr./Ms./Mrs. **0건**. 새 id에 비공인 실명 없음(직함·사건어만).
5. **저장소 독립 grep**(지정 패턴, '홍보물' 줄 제외): 대상 6경로 + 업로더 02 트리거·오더 + 이 오더 + 내 도구 3파일 = 11파일 모두 **0건**.

## 결함
- **P3-1 (선택, 문체)** 영어본 둘째 줄에 "the former 707th commander K"가 **4회**(두 문장에 각 2회)다. 업로더 트리거의 "한 문장에 세 번"은 실제와 다르다(기록만). 같은 줄에 다른 이니셜 K(전 정보사 기획처장)가 있어 첫 문장 구분은 필요하지만, 반복은 줄일 수 있다 — 예: 2번째("took … into custody")와 4번째("… appealed")를 "the former commander"로. 사실관계 영향 없음, 다음 #1 편집 때 해도 된다.
- **기록만** 옛 id 문자열이 이미 커밋된 옛 도구 출력·트리거 18개(`docs/tools/planner-14/` 등, `docs/triggers/uploader-01-portal-source-replace-COMPLETE.md`)와 **미추적** `history/2026-10-11.md`에 남아 있다. README §6-1대로 git 이력에는 남는 것이 정상이라 이번 범위 밖. 다만 `history/2026-10-11.md`를 나중에 커밋한다면 옛 id 노출 여부를 슈퍼바이저가 판단할 것.
- 갱신 이력 줄에 주소 이전을 넣지 않은 업로더 판단에 동의(내용 변경 아님, 리다이렉트로 공유 링크 유지).

## 수치
- 검사 418건/실패 0 · moved 1건 · 규칙 2/2 PASS · 옛 id 범위 밖 0건 · 대명사 0 · 저장소 독립 0/11파일

## 커밋 경로 목록
- **A. 콘텐츠 6** (옛 파일 삭제 2 + 새 파일 추가 2를 같은 커밋에 — 이름 변경 인식)
  - `content/posts/` #1 옛 파일 (D)
  - `content/posts-en/` #1 옛 파일 (D)
  - `content/posts/2026-08-06-owloffreedom-707-commander-sentencing.md` (A)
  - `content/posts-en/2026-08-06-owloffreedom-707-commander-sentencing.md` (A)
  - `content/moved-ids.txt` (M)
  - `content/retired-ids.txt` (M)
- **B. 업로더 문서 2**: `docs/triggers/uploader-02-post1-id-move-COMPLETE.md`, `instructions/uploader/processed/02-post1-id-move.md`
- **C. 리뷰어 37**: 이 트리거, `instructions/reviewer/processed/37-uploader-02-post1-id-move-review.md`, `docs/tools/reviewer-37/`(3개: `redirect-rules-check.ts`, `redirect-rules-output.txt`, `validate-output.txt`)
- 제외 권고: `history/*`(다른 세션 변경 섞임, 슈퍼바이저 판단), 그 밖의 `??` 경로 전부.
- 배포 후: `curl -I` 로 옛 `/post/`·`/en/post/` 308 + `Location` 확인(슈퍼바이저).
- 추가: 도구 타입 오류 수정 — `redirect-rules-check.ts` 11행 `names[0]` undefined 가드(TS2532), 커밋 뒤에도 동작하도록 옛 파일명을 git 이력의 삭제 기록에서 읽고 옛 id = 새 id·빈 값이면 중단하게 함. `npx tsc --noEmit` exit 0, 재실행 ALL PASS(출력 변경 없음).
- 추가 2: 도구 lint 오류 수정 — `redirect-rules-check.ts`의 `any` 3곳을 `RedirectRule`(src/lib/content/moved-ids의 export 타입)로 바꿈. `npx tsc --noEmit` exit 0, `npx eslint docs/tools/reviewer-37/` error 0, 재실행 ALL PASS, 출력 파일 옛 id 0건(`<OLD>` 가림 4줄, 커밋본과 차이 없음).
