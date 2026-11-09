# 프로그래머 세션 — 16-1-review-36-fixes 핸드오프
**작성일**: 2026-11-09 23:45 | **작성 세션**: 프로그래머 (Opus 5.5 — 실행 모델 ID `claude-opus-5-5`. CLAUDE.md §6은 프로그래머를 Opus 5로 적고 있으나 실제 모델을 그대로 적는다)

## 요약 (3줄)
1. **P2-1**: 검증 f(새 id 게시물이 있다)는 이제 **frontmatter `id`만** 본다. 맥락의 id 집합과 파일명 집합을 나눴고, 파일명은 e에만 쓴다. 파일 `zz-new.md` + id `zz-new-typo` + 목록 `zz-old zz-new`는 `[f]`로 막힌다. 오류 메시지는 "파일은 있지만 frontmatter id가 다르다"고 알려 준다.
2. **P3-1**: `readTranslationIds`는 옮긴 id가 0건이면 영어본을 읽지 않는다. YAML 오류는 파일 이름을 붙여 다시 던진다(`cause` 유지). 실측 중 gray-matter의 캐시 함정을 찾아 피했다(결정 2). **P3-3**: `word-grep.sh`의 홈·임시 경로 글자를 조각으로 이어 붙여 만든다. **P3-4**: 빈 줄 1개. P3-2는 손대지 않았다.
3. 검증(최종 코드 기준): 단위 61/61 · 돌연변이 25/25 · 빌드 실패 32/32 · 픽스처 45/45 · Vercel 4/4 · 회귀(16 단위 46/46 · 16 돌연변이 16/16 · 리뷰어 36 엣지 14/14) · typecheck 0 · lint 0 errors · a11y-e2e 184/184 · 최종 일반 빌드 804/804 · `--worktree` 게이트 통과 · 저장소 독립 grep 0.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/lib/content/moved-ids.ts` | `MovedIdsContext`에 `koFileNames`·`enFileNames`를 추가했다. e는 id와 파일명을 모두 보고, f는 `koIds`(frontmatter id)만 본다. `idsAndFiles`는 두 집합을 따로 돌려준다. `readTranslationIds(root, moved = readMovedIds(root))`: 0건이면 빈 집합을 돌려주고, YAML 오류는 파일 이름을 붙여 던지며, gray-matter에 옵션 객체를 넘긴다 |
| `next.config.ts` | `redirects`가 `readMovedIds`를 한 번 읽어 `readTranslationIds(projectRoot, moved)`에 넘긴다 |
| `scripts/validate-content.ts` | `readTranslationIds(ROOT, movedMap)`. 던진 오류를 받아 moved 오류 목록에 싣는다(전체 보고서를 찍고 멈추게) |
| `src/lib/content/load.ts` | `readTranslationIds(process.cwd(), moved)`(옮긴 id 맵을 한 번만 읽는다) |
| `src/lib/content/retired-ids.ts` | import 뒤 빈 줄 2→1 |
| `content/README.md` | §6-1 검증 표 f 행: "frontmatter `id`로 쓰는 게시물, 파일명만 새 id는 인정하지 않음" |
| `docs/tools/programmer-16/word-grep.sh` | P3-3: 5행 주석을 다시 썼다. 20행 검색식은 `ABS` 변수에서 조각을 이어 만든다(조립 결과가 원래 정규식과 같음을 확인했다) |
| `docs/tools/programmer-16/unit-checks.ts` · `mutation-check.sh` | typecheck가 `docs/tools`도 검사하므로 맥락 필드 2개를 채우고, e 돌연변이 치환 글자를 새 조건식에 맞췄다. 시험의 뜻은 그대로다 |
| `docs/tools/programmer-16-1/` | 검증 도구·출력(`README.md`) |

## 주요 결정사항 (자체 판단 + 근거)
1. **`readTranslationIds` 시그니처는 `(root, moved = readMovedIds(root))`**: 오더는 "0건이면 영어본을 읽지 않는다"만 정했다. 처음에는 `(moved, root)`로 바꿨는데, `npm run typecheck`가 `docs/tools/**`도 검사해서 리뷰어 36 도구(`c11-edge-checks.ts`, 다른 역할의 산출물)가 깨졌다. root를 앞에 두고 moved를 기본값 인자로 두면 기존 호출이 그대로 컴파일되고 동작도 오더와 맞는다(인자를 생략하면 디스크 목록을 읽는다). 리뷰어 도구는 손대지 않았고 14/14 통과한다.
2. **gray-matter 캐시 우회(`matter(text, {})`)**: gray-matter는 옵션 없이 부르면 입력 글자를 **파싱 전에** `matter.cache`에 넣는다. 그래서 같은 프로세스에서 같은 깨진 글자를 두 번째로 읽으면 오류 없이 `data: {}`를 돌려준다(`node`로 직접 재현: 옵션 없음 1회째 던짐 · 2회째 안 던짐, 옵션 `{}`는 두 번 다 던짐). 검증 스크립트는 영어본을 먼저 옵션 없이 읽는다. 따라서 그대로 두면 P3-1의 "파일 이름 붙여 던짐"이 검증 스크립트 안에서는 조용히 사라진다. 옵션 객체를 넘기면 캐시를 쓰지 않는다. 돌연변이 시험에 이 항목을 넣었다.
3. **검증 스크립트는 받아서 싣는다**: 위 2를 고치자 `npm run build`에서 검증 스크립트가 전체 보고서를 찍기 전에 던져 멈췄다(빌드 실패 시험 1회차에서 확인). 어느 파일이 깨졌는지는 보였지만, 같은 실행의 다른 오류 보고가 사라진다. 그래서 검증 스크립트에서만 try/catch로 받아 moved 오류로 싣는다. 직접 빌드(`next.config`·로더)는 그대로 던진다. 2회차에서 P3-1 npm 사례가 요약 줄까지 찍는 것을 확인했다(`요약 줄 1회`).
4. **e는 그대로, f만 좁혔다**: e(옛 id가 남아 있는지)는 파일명도 보는 것이 맞다(프로그래머 16 결정 8). 그래서 두 집합을 나눴고 각 검사가 자기 집합을 고른다. f 메시지에는 "파일은 있지만 id가 다르다"를 덧붙여 업로더 02의 오타를 바로 찾게 했다.
5. **frontmatter 파싱 실패 파일**: `idsAndFiles`는 그 파일의 id를 넣지 않는다(파일명만 넣는다). 그 파일이 새 id의 게시물이면 f가 실패한다. 게시물 검증도 따로 막으므로 보수적으로 실패하는 쪽이 맞다.

## 미해결·이슈
1. **gray-matter 캐시는 저장소 다른 곳에도 있다**: 검증 스크립트·로더는 게시물 파일을 옵션 없이 읽는다. 같은 프로세스에서 같은 글자를 두 번 읽는 경로는 이번 오더 밖이라 전수로 따지지 않았다(확인 필요). 지금 확인된 영향은 위 결정 2뿐이고, 고쳤다.
2. P3-2(이동 경로 포커스 외곽선 왼쪽 변이 360·390폭에서 화면 밖)는 오더대로 손대지 않았다. 디자이너 확인 대상이다.
3. P3-5: `history/2026-10-01.md`·`2026-11-05.md`의 작업 트리 수정은 이 세션과 무관하다. 손대지 않았다.
4. 프로그래머 16 도구 3개(`word-grep.sh`·`unit-checks.ts`·`mutation-check.sh`)를 이번에 고쳤다. 16 폴더의 옛 출력 파일(`unit-checks-output.txt` 46/46 등)은 당시 기록이다. 새 코드 기준 재실행 값은 16-1의 `regression-*`에 있다.
5. 바꾼 파일 중 `content/README.md`는 빌드·검증이 읽지 않는 문서다. 이 파일만 게이트·최종 빌드 뒤에 고쳤다.

## 다음 세션 가이드
- **리뷰어(Opus 5.5)**: 리뷰 36 재확인. 중점은 P2-1(f가 `koIds`만 보는지, e는 그대로인지), 결정 1(시그니처 하위 호환), 결정 2·3(gray-matter 캐시, 검증 스크립트 try/catch), 프로그래머 16 도구 3개 수정이 시험의 뜻을 바꾸지 않았는지. `bash docs/tools/programmer-16-1/mutation-check.sh`는 빌드 없이 수 분이면 끝난다.
- **슈퍼바이저**: 재리뷰 통과 시 트리거의 "커밋 B 최종 경로" 목록으로 커밋한다. `history/2026-10-01.md`·`2026-11-05.md`는 넣지 않는다. 업로더 02(#1 이전)는 B 배포 뒤 README §6-1 절차를 따른다.
- **디자이너**: P3-2(프로그래머 16 미해결 3·4와 같다).

## 참고 링크
- 오더 `instructions/programmer/processed/16-1-review-36-fixes.md`
- 리뷰 `docs/reviews/programmer-16-review.md` · `docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md`
- 앞 단계 `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md`
- 도구 `docs/tools/programmer-16-1/README.md`
