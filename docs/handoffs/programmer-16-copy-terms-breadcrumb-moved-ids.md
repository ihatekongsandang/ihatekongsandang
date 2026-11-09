# 프로그래머 세션 — 16-copy-terms-breadcrumb-moved-ids 핸드오프
**작성일**: 2026-11-09 22:40 | **작성 세션**: 프로그래머 (Opus 5.5 — 실행 모델 ID `claude-opus-5-5`. CLAUDE.md §6은 프로그래머를 Opus 5로 적고 있으나 실제 모델을 그대로 적는다)

## 요약 (3줄)
1. 커밋 단위 A: C3 화면·메타 낱말을 "주제"로(영어 사전 `Topics`), C4 안내문에서 "썸네일" 삭제 + 한국어 소개 "인용·저작권"을 리뷰 34 §2.4 정정 문안으로 + 영어 소개에 "Quotes, images and copyright" 절 추가(계획 §2.2 en 글자 그대로), C5 이동 경로 간격 ko 37.9→7.9px·en 11.8→6px(44×44 상자 유지).
2. 커밋 단위 B: `content/moved-ids.txt`(주석뿐, 실제 줄 0) + 공유 함수 `src/lib/content/moved-ids.ts` + `next.config.ts` `redirects()`(Vercel 조건 밖, 308, 영어 분기는 번역 맵 기준) + 검증 a~h·옛 이미지 폴더(검증 스크립트·로더 공통) + `ID_PATTERN` export + README §6-1·id 행. #1은 옮기지 않았다.
3. 검증: copy-exact 38/38 + 새 문구 58/58 · seo-parity C3 치환 뒤 802/802 · 화면 마크업 차이 = 소개 2쪽뿐 · 이동 경로 21/21 · 단위 46/46(돌연변이 16/16) · 빌드 실패 26/26 · 픽스처 시험표 45/45 · Vercel 환경 4/4 · A 대 B HTML 802/802 · a11y-e2e 184/184 · typecheck 0 · lint 0 errors · `--worktree` 게이트 통과 · 최종 일반 빌드.

## 산출물
| 경로 | 단위 | 설명 |
|---|---|---|
| `src/lib/i18n.ts` | A | ko `tags: '주제'`, en `tags: 'Topics'`, `sourcePreviewNote` ko·en에서 썸네일 삭제(v0.9 §2.1 확정 문구) |
| `src/app/(ko)/tags/page.tsx` | A | 제목 "전체 주제", 메타 설명 "주제 N개를", 보조 문장 "주제 N개 · …", `aria-label="주제 목록"`, 빈 상태 |
| `src/app/(ko)/tag/[slug]/page.tsx`·`page/[page]/page.tsx` | A | "주제로 묶인 게시물입니다." · "주제 게시물 N페이지"(메타·JSON-LD) |
| `src/app/llms.txt/route.ts` | A | `## 주제` |
| `src/app/(ko)/about/page.tsx` | A | "인용·저작권" 절 = 계획 §2.2 ko 1~4(2번은 하위 목록 5개, 굵게 범위 그대로) |
| `src/app/(en)/en/about/page.tsx` | A | 새 절 `id="copyright"` "Quotes, images and copyright"(English versions 다음, Corrections 앞) |
| `src/components/post-detail.tsx`·`feed-view.tsx` | A | 이동 경로 홈 링크 `-mx-[15px] px-[15px]`(min-w·h 44 유지), 구분자 `pointer-events-none` |
| `src/lib/content/moved-ids.ts` | B | 신규: 파싱(a·b·c·g)·대조(d·e·f·h·i)·디스크 수집·리다이렉트 규칙·영어본 id(frontmatter)·번역 맵 불일치 |
| `content/moved-ids.txt` | B | 신규, 주석 4줄(예시도 주석) |
| `next.config.ts` | B | `redirects()` — Vercel 조건 밖, 상대 경로 import, export 모드 주석 |
| `scripts/validate-content.ts`·`src/lib/content/load.ts` | B | 같은 함수로 검증. 요약 줄 1개 추가 |
| `src/lib/content/retired-ids.ts` | B | `readRetiredIds(root = process.cwd())`(동작 같음) |
| `src/lib/content/schema.ts` | B | `export const ID_PATTERN` |
| `content/README.md` | B | id 행에 "비공인 실명 금지" 한 줄, §6-1 옮길 때 절차·규칙 표, §8 행 |
| `docs/tools/programmer-16/` | — | 검증 도구·출력·화면(`README.md`) |

## 주요 결정사항 (자체 판단 + 근거)
1. **C3 범위**: §1 표 8행에 더해 `/tags`의 메타 설명("…의 태그 N개를…")과 보조 문장("태그 N개 · 게시물이 많은 순")도 바꿨다. §1 원칙이 "화면·메타는 통일"이고, 두 문장이 바뀐 h1("전체 주제") 바로 옆에 있어 남기면 한 화면에 두 낱말이 섞인다. 빌드 HTML 796개 전수에서 content 원문(해시태그·계정 이름) 밖의 "태그" 0.
2. **영어 `Topics`는 화면 변화가 없다**: 영어 상세는 태그 절을 그리지 않는다(`!isEnglish`, 기존 설계). 사전 값만 바꿨고 영어 빌드에서 그 절은 0쪽이다.
3. **C4 영어 아포스트로피**: 기획 문안이 곧은 따옴표(`'`)라 `&apos;`로 적었다(굽은 ’ 0 확인). 기존 영어 소개의 다른 문장(`it’s`)은 그대로다.
4. **C5 방식**: 링크 상자에 좌우 padding 15px + 같은 크기 음수 margin. 글자는 제자리(h1과 정렬 차 0), 상자는 44 이상, 구분자는 상자 오른쪽 여백 위에 겹치므로 `pointer-events-none`으로 누름을 링크에 넘긴다(상자 9점 모두 링크). 언어마다 글자 폭이 달라도 같은 식으로 동작한다(ko 44×44, en 68.3×44).
5. **C11 영어 분기**: `next.config`가 마크다운 처리기를 불러오지 않도록 로더 대신 frontmatter `id`를 직접 읽는다(`readTranslationIds`). 로더 번역 맵도 같은 `id` 기준이고, 검증 스크립트·로더가 옮긴 새 id에 대해 두 기준이 같은지 다시 확인한다(`translationMismatchErrors`).
6. **검증 위치**: 형식(a·b·c·g)은 `next.config`에서도 던져 빌드 시작 전에 멈춘다. d·e·f·h·i는 검증 스크립트와 로더(`getAllPosts`)가 막는다. 직접 `npx next build`로도 13사례가 모두 멈춘다.
7. **h 범위**: 게시물 파일 전체(frontmatter 포함, ko·en)에서 `/post/<옛>`을 찾는다. 상대·`/en/`·절대 주소(호스트 무관)를 모두 잡고, 뒤는 id 경계로 끊어 더 긴 id는 잡지 않는다. **i(옛 이미지 폴더)**: 폴더 존재 + `/images/<옛>/` 참조 둘 다 막는다.
8. **e는 파일명도 본다**: frontmatter `id`만 바꾸고 파일명을 옛 id로 둔 경우도 잡는다.
9. **시험표 6번 실측**: 리다이렉트 규칙은 Next가 메타데이터 3곳(`routes-manifest.json`·`required-server-files.json`·`types/routes.d.ts`)에 적는다. 응답으로 나가는 파일이 아니어서 허용 대상에 넣고 내용을 기록했다. 페이지·정적 자산의 옛 id는 0.

## 미해결·이슈
1. **네이버·다음의 308 처리**는 공식 확인을 못 했다(리뷰 34 P3-2). 오더대로 308을 유지했다. 바꾸려면 `movedIdRedirects`의 `permanent: true`를 `statusCode: 301`로 바꾸면 된다(단위 시험 기대값도 같이 고친다).
2. **영어 상세 31쪽의 `<!-- -->` 위치 차이**: 안내문이 짧아져 스트리밍 조각 경계가 옮겨 간 것이다. 이 주석을 빼면 화면 마크업이 같다. 화면 글자 영향은 없다.
3. **이동 경로 상자가 왼쪽 여백 안쪽으로 15px 나온다**(360폭에서 상자 왼쪽 x=1). 포커스 외곽선도 그 상자를 따른다. a11y-e2e 포커스 검사는 통과했다. 디자이너 확인 대상이다(`screens/`).
4. 소개 ko 2번의 하위 목록은 `list-disc pl-5`로 그렸다. 시안에 이 모양이 없어 디자이너 확인 대상이다.
5. 옛 id 문자열은 업로더 02 이후 `moved-ids.txt`·`retired-ids.txt`·빌드 메타데이터 3곳에 남는다(리다이렉트 동작에 필요, 리뷰 34 알림 2와 같다).
6. `validate:content` 출력에 요약 줄 1개("옮긴 id 목록 …")가 늘었다. 이 출력을 글자 단위로 비교하는 도구가 있으면 그 줄을 감안해야 한다.
7. lint 경고 17 중 1개는 `planner-16/count-self-images.mjs`(이 오더 밖)다.

## 다음 세션 가이드
- **리뷰어(Opus 5.5)**: 코드 게이트. 중점은 결정 1(C3 범위 2문장 추가)·4(C5 음수 margin + pointer-events)·5(frontmatter id 기준 + 불일치 검사)·6·7(h 정규식)·9(메타데이터 3곳 허용). `.next`는 일반 빌드라 그대로 띄워도 된다. 리다이렉트 실측은 `bash docs/tools/programmer-16/fixture-build.sh`(저장소 밖 사본, `.next`를 건드리지 않는다).
- **슈퍼바이저**: 리뷰 통과 시 트리거의 커밋 단위 A를 먼저, B를 다음에 커밋한다(파일이 겹치지 않는다). 배포 후 C4 반영 확인은 `/about`·`/en/about` curl 1회. 업로더 02(#1 이전)는 B 배포 뒤 README §6-1 절차로 한다. 배포 후 `curl -I`는 #1 옛 주소 ko·en으로 1~2회.
- **디자이너**: 미해결 3·4.

## 참고 링크
- 오더 `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`
- 리뷰 34 `docs/reviews/planner-16-q1-q2-plan-review.md` §1·§2.4 · 트리거 `docs/triggers/reviewer-34-1-planner-16-1-recheck-COMPLETE.md`
- 계획 `planning/q1-redirect-q2-sns-image-plan.md` §1·§2.2 · `planning/v0.9-copy-and-code-list.md` §1·§2.1·§2.3
- 도구 `docs/tools/programmer-16/README.md`
