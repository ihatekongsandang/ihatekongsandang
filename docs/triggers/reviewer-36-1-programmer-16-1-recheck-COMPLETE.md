# ✅ 리뷰어 36-1 완료 — 프로그래머 16-1 재확인 (커밋 B 전 게이트)

- **완료**: 2026-11-09
- **실행 세션**: 리뷰어 · 하위 에이전트 · 실제 모델 ID `claude-opus-5-5` (Opus 5.5)
- **오더**: `instructions/reviewer/processed/36-1-programmer-16-1-recheck.md` · **도구**: `docs/tools/reviewer-36-1/`
- git 쓰기 0. 빌드 0(`next build`·`npm run build` 안 함). 코드·문서 수정 0. 쓴 파일은 이 트리거와 `docs/tools/reviewer-36-1/`뿐이고, 오더를 `processed/`로 옮겼다.

## 판정
**승인. P1 0 · P2 0 · P3 0(참고 2).** 커밋 B를 아래 경로 목록으로 커밋해도 된다. 업로더 02(#1 이전)의 선행 조건인 P2-1이 풀렸다.

## 확인 1. 커밋 B 8개 파일 diff(HEAD 6f0f941 대비)
- **P2-1 반영됨.** `MovedIdsContext`에서 `koIds`(frontmatter id)와 `koFileNames`·`enFileNames`(파일명)를 나눴다. f는 `!ctx.koIds.has(to)`만 본다. e는 id 2개·파일명 2개를 모두 본다(결정 8 유지). `collectMovedIdErrors`는 `ko.ids`·`ko.fileNames`를 따로 넘긴다. 파일명만 맞으면 메시지에 "파일은 있지만 frontmatter id가 다르다"는 안내가 붙는다. frontmatter를 못 읽은 파일은 id 집합에 들어가지 않아 f가 실패 쪽으로 막는다(보수적이라 타당).
- **P3-1 반영됨.** `readTranslationIds(root, moved = readMovedIds(root))`는 `moved.size === 0`이면 영어본을 읽지 않는다. YAML 오류는 `content/posts-en/<파일>: …`로 다시 던지고 `cause`를 붙인다. `matter(text, {})`로 캐시를 피한다. 캐시 동작은 직접 재현했다(옵션 없음: 1회째 던짐, 2회째 안 던짐 · `{}`: 두 번 다 던짐, `node_modules/gray-matter/index.js` 35~47행). 기본값 인자는 생략했을 때만 평가된다. 그래서 `next.config`·검증 스크립트·로더가 맵을 넘기면 두 번 읽지 않고, 넘기지 않는 리뷰 36 도구도 그대로 컴파일된다(결정 1 타당). 검증 스크립트의 try/catch는 오류를 moved 오류로 싣고 종료 1까지 간다(결정 3 타당). 직접 빌드는 던진다.
- **P3-3 반영됨.** `docs/tools/programmer-16/word-grep.sh` 5·21~22행은 조각을 이어 검색식을 만든다. 지정 패턴 0줄(아래 확인 5).
- **P3-4 반영됨.** `retired-ids.ts` import 뒤 빈 줄이 1개다.
- **새 회귀 0.** `next.config` redirects는 여전히 Vercel 조건 밖에 있고 `permanent: true`만 쓴다. `schema.ts`·`content/README.md`(§6-1 f 행만 바뀜)·`content/moved-ids.txt`(주석 4줄, 실제 규칙 0)도 확인했다. 바뀐 파일의 lint 경고는 0이다.

## 확인 2. 직접 다시 돌린 수치
| 검사 | 결과 |
|---|---|
| `npx tsc --noEmit` | exit 0 |
| `npx eslint .` | 0 errors · 17 warnings(모두 이 오더와 무관한 옛 도구 10개 파일) |
| `validate:content` | 418건 통과 · 옮긴 id 0건 · 규칙 0개 · 오류 0 |
| 16-1 단위 | **61/61** |
| 16-1 돌연변이 | **25/25 검출** |
| 16 단위 · 16 돌연변이(회귀) | **46/46 · 16/16** |
| 16-1 word-grep | 90개 · 훅 0 · 경로 0 · 옛 id 0 · 로마자 0 · 양성 1·1 |

빌드가 필요한 시험은 출력 파일만 읽었다. 빌드 실패 32/32(P2-1은 npm·직접 모두 `[f]`·종료 1·BUILD_ID 없음, 음성은 둘 다 통과, P3-1은 둘 다 파일 이름 붙은 오류로 멈춤). 그 밖에 픽스처 45/45 · Vercel 4/4 · a11y-e2e 184/184 · 일반 빌드 정적 804/804, 리다이렉트는 Next 내장 1개 · `--worktree` 게이트 통과. 프로그래머 보고 수치와 모두 같다.

## 확인 3. 리뷰 36 재현 시험
`docs/tools/reviewer-36/c11-edge-checks.ts`는 **14/14**다. P2-1 재현(`zz-new.md` + id `zz-new-typo` + `zz-old zz-new`)이 FAIL(오류 0개)에서 PASS(`[f]` 1개)로 바뀌었다. P3-1 NOTE는 "0건인데 던짐 true"에서 false로 바뀌었다. 나머지 13항목의 이름과 결과는 리뷰 36 때와 같다.

## 확인 4. 프로그래머 16 도구 3개 수정
- `unit-checks.ts`·`mutation-check.sh`: PASS/FAIL 이름 목록과 돌연변이 이름·검출 목록이 리뷰 36 재실행 출력과 글자까지 같다(diff 0). e 돌연변이는 지금도 같은 시험("e 옛 id 영어본만 남음")에서 잡힌다. 시험의 뜻은 그대로다.
- `word-grep.sh`: 조각을 이은 검색식은 홈 접두 2종과 임시 경로 2종이다. 다시 돌린 결과도 0이다.
- 참고 1: 16 단위 "f 새 id 게시물 없음"은 `koIds`에서만 지우고 `koFileNames`에는 `new-a`를 남긴다. 그래서 새 구조에서는 사실상 "파일명만 있음" 사례가 됐다. 기대값 `[f]`는 같고 오히려 더 엄격하다. "파일도 없음" 사례는 16-1 단위에 따로 있다. 고칠 것은 없다.

## 확인 5. 저장소 독립 grep
`repo-independence-grep.sh`를 커밋 B 경로 전체(아래 목록, 폴더는 안의 파일 전부)와 36-1 산출물(이 트리거·옮긴 오더 포함)에 돌렸다.
- 대상: **170개** 파일(글자 122 · 그림 등 48). 목록 중 없는 경로 1개(옮기기 전 오더 자리, 정상).
- 지정 패턴('홍보물' 줄 제외): **0줄 / 0개 파일**. 제외한 '홍보물' 줄은 8줄이다(이 트리거·출력 파일의 오탐 설명 글자 포함).
- 옛 #1 id: **0** · 이름 로마자 토큰: **0**. 값은 `content/posts` 파일명에서 읽었다(git 이력 커밋 2개에 있는 같은 파일, frontmatter id 일치 확인). 대조만 했고 어느 파일에도 옮겨 쓰지 않았다. 양성 대조 1·1.
- 처음 돌렸을 때 내 `lint-output.txt`에 저장소 절대 경로가 10줄 있었다. `.`로 바꾼 뒤 다시 돌려 0을 확인했다.

## 참고(결함 아님)
- 참고 1: 위 확인 4.
- 참고 2: 로더(`getAllTranslations`·`getAllPosts`)는 게시물을 옵션 없이 `matter()`로 읽는다. 같은 프로세스에서 같은 깨진 글자를 다시 읽으면 빈 `data`가 나온다. 그래도 id 필수 검증에서 막히므로 실패하는 쪽이다(16-1 미해결 1과 같은 내용). 이번 범위 밖이고, 다음에 로더를 손볼 때 같이 보면 된다.
- 리뷰 36의 P3-2(포커스 외곽선)와 P3-5(`history/2026-10-01.md`·`2026-11-05.md`)는 그대로 남아 있다.

## 커밋 B 경로 확정 목록
**코드·문서 (8)**
- `src/lib/content/moved-ids.ts`(신규) · `content/moved-ids.txt`(신규) · `next.config.ts` · `scripts/validate-content.ts` · `src/lib/content/load.ts` · `src/lib/content/retired-ids.ts` · `src/lib/content/schema.ts` · `content/README.md`

**프로그래머 16**
- `docs/tools/programmer-16/`(전체) · `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md` · `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md`
- `instructions/programmer/16-copy-terms-breadcrumb-moved-ids.md`(삭제) + `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`(신규)

**리뷰 36**
- `docs/reviews/programmer-16-review.md` · `docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md` · `docs/tools/reviewer-36/`(전체) · `instructions/reviewer/processed/36-programmer-16-review.md`(신규)

**프로그래머 16-1**
- `docs/tools/programmer-16-1/`(전체) · `docs/handoffs/programmer-16-1-review-36-fixes.md` · `docs/triggers/programmer-16-1-review-36-fixes-COMPLETE.md` · `instructions/programmer/processed/16-1-review-36-fixes.md`(신규)

**리뷰 36-1**
- `docs/tools/reviewer-36-1/`(전체) · `docs/triggers/reviewer-36-1-programmer-16-1-recheck-COMPLETE.md` · `instructions/reviewer/processed/36-1-programmer-16-1-recheck.md`(신규. 원래 자리는 미추적이라 삭제 항목 없음)

**기록**: `history/2026-11-09.md`

**넣지 않는 것**: `history/2026-10-01.md`·`history/2026-11-05.md`(P3-5), tester-01·designer-03/05·planner-07·programmer-14·reviewer-31 screens 등 이 오더와 무관한 미추적 파일
