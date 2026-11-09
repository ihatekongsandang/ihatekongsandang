# 프로그래머 16 — copy-terms-breadcrumb-moved-ids 완료 트리거

**작성일**: 2026-11-09 22:45 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)
**오더**: `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md` · **핸드오프**: `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md` · **도구**: `docs/tools/programmer-16/`

> git 쓰기 없음(add·commit·push 0). `content/posts*`·`public/images`·planning·guide·design 수정 없음. 빌드는 이 세션만 했다.
> 저장소 독립: 이 트리거·핸드오프·코드·도구에 훅 패턴 0 · 절대/임시 경로 0 · 옛 #1 id 문자열 0 · 이름 로마자 0(`word-grep-output.txt`, 대상 73개 파일).

## 항목별 완료
| # | 항목 | 결과 |
|---|---|---|
| 1 | C3 "주제" 통일(§1 표 8행 + 영어 `Topics`) | ✅ + `/tags` 메타 설명·보조 문장 2곳도(핸드오프 결정 1). URL·frontmatter `tags`·코드 식별자 그대로 |
| 2 | C4 `sourcePreviewNote` 썸네일 삭제 · ko 소개 §2.4 정정 문안 · 영어 "Quotes, images and copyright" 절 · copy-exact 갱신 · 약관 그대로 | ✅ 약관 ko·en 글자 변화 0 |
| 3 | C5 이동 경로 간격(44px 유지) | ✅ ko 37.9→7.9px · en 11.8→6px |
| 4 | `content/moved-ids.txt`(예시 주석, 실제 0) | ✅ |
| 5 | 공유 함수 `src/lib/content/moved-ids.ts` | ✅ next.config·검증 스크립트·로더 공통 |
| 6 | `redirects()` Vercel 조건 밖 · 308 | ✅ VERCEL=1·없음 두 빌드의 규칙 같음 |
| 7 | 영어 분기 번역 맵 기준 | ✅ frontmatter id + 번역 맵 불일치 검사 |
| 8 | 검증 a~h + 옛 이미지 폴더 · `ID_PATTERN` export | ✅ |
| 9 | README moved-ids 절 + id 행 "비공인 실명 금지" | ✅ §6-1·§3.1 id 행·§8 행 |
| 10 | 시험표 1~9 + 음성 대조 · `curl -I` · 끝 슬래시·쿼리 | ✅ 아래 표 |
| 11 | #1 게시물 옮기지 않음 | ✅ content/posts·posts-en·public/images 변경 0 |

## 커밋 단위 A (C3·C4·C5) — 9개 파일
- `src/lib/i18n.ts`
- `src/app/(ko)/tags/page.tsx`
- `src/app/(ko)/tag/[slug]/page.tsx`
- `src/app/(ko)/tag/[slug]/page/[page]/page.tsx`
- `src/app/llms.txt/route.ts`
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `src/components/post-detail.tsx`
- `src/components/feed-view.tsx`

## 커밋 단위 B (C11) — 8개 파일
- `src/lib/content/moved-ids.ts` (신규)
- `content/moved-ids.txt` (신규)
- `next.config.ts`
- `scripts/validate-content.ts`
- `src/lib/content/load.ts`
- `src/lib/content/retired-ids.ts`
- `src/lib/content/schema.ts`
- `content/README.md`

A·B가 겹치는 파일 0. 단위 A만으로 빌드·검증했다(아래 A 수치). 도구·기록(어느 커밋에 넣어도 됨, B 권장): `docs/tools/programmer-16/`(전체), `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md`, 이 트리거, `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`(이동), `history/2026-11-09.md`(append).

## 검증 수치
**단위 A**
- copy-exact 기존 **38/38** · 새 C3·C4 **58/58**(기대값을 기획 문서에서 직접 읽음, 변경 전 빌드 양성 대조 42 FAIL)
- seo-parity 원본 대조 464 같음·338 다름 → C3 치환 뒤 **802/802 같음**(head 메타 23,443 · JSON-LD 2,333 · .body 6). content 원문 오치환 0
- 화면 마크업(C3·C4 안내문·C5 class 치환 뒤): 엄격 769/802 → 글자 구분 주석 무시 **800/802**, 남은 2 = `about.html`·`en/about.html`(C4)
- copy-text-parity: 약관 ko·en 같음, 소개 ko·en 다름(C4)
- 이동 경로 3화면 × 7폭 **21/21**(상자 ≥44×44, 상자 안 9점 모두 링크, 글자·h1 정렬 차 0, 가로 넘침 0)

**단위 B**
- 단위 **46/46** · 돌연변이 **16/16** 검출
- 빌드 실패 **26/26**(13사례 × `npm run build`·`npx next build`)
- 픽스처 시험표 **45/45**(양성 대조: 리다이렉트 0개 서버에서 27 FAIL)
- Vercel 환경 **4/4**
- 단위 A 대 최종 HTML **802/802 같음**, routes-manifest 사용자 리다이렉트 0(실제 목록 0건)

**공통(최종 A+B)**
- typecheck exit 0 · lint **0 errors**(경고 17 = 기존 16 + planner-16 도구 1, 이 폴더 0)
- a11y-e2e(GA 더미) **184/184**, 라벨 184개 프로그래머 15와 같음
- 회귀 단위 117/117 · 104/104 · 64/64 · 53/53 · 35/35 · hotlink 10/10
- `clean-clone-gate.sh --worktree` **통과**
- 최종 **일반 빌드**: 검증 418건 통과 · 정적 804/804 · GA 더미 ID 0 · validate 출력은 요약 1줄 추가뿐

## 시험 1~10 결과 (픽스처: `zz-fixture-old-a`→`zz-fixture-moved-a` 영어본 있음, `zz-fixture-old-b`→`zz-fixture-moved-b` 영어본 없음, 로컬 프로덕션 서버)
| # | 항목 | 결과 |
|---|---|---|
| 1 | `/post/<옛>` | ✅ GET·HEAD 308, `location: /post/<새>` (a·b 둘 다) |
| 2 | `/en/post/<옛>`(영어본 있음) | ✅ 308, `location: /en/post/<새>` |
| 3 | 새 주소 | ✅ `/post/새a`·`/en/post/새a`·`/post/새b` 200 |
| 4 | 사이트맵·llms.txt | ✅ 옛 id 0, 새 id 있음, 사이트맵 `/en/post/새a` 있음·`/en/post/새b` 없음 |
| 5 | canonical·hreflang·og:url | ✅ 3쪽 모두 새 주소, 영어본 없는 b는 en hreflang 없음, 응답 HTML 옛 id 0 |
| 6 | 빌드 산출물 옛 id | ✅ `.next` 파일 전수(cache 제외)에서 페이지·자산 0. 메타데이터 3곳(routes-manifest 8회·required-server-files 4회·types/routes.d.ts 8회)만 — 리다이렉트 규칙 자체 |
| 7 | 검증 a~h(+i) 위반 → 빌드 실패, 정상 → 통과 | ✅ 단위 46/46 · 빌드 26/26 · 돌연변이 16/16 |
| 8 | 영어본 없는 새 id | ✅ `/en/post/<옛b>` → 308 `/post/<새b>`(대조: `/en/post/<새b>` 404) |
| 9 | 쿼리·끝 슬래시 | ✅ 쿼리 보존(`?utm_source=x`, `?utm_source=x&b=2`). 끝 슬래시 `/post/<옛>/` → 308 `/post/<옛>` → 308 `/post/<새>` → 200 (2단, ko·en). 문서 기대값과 같음 |
| 10 | 음성 대조 | ✅ 다른 게시물 ko·en 200, 없는 id ko·en 404, 옛 id 뒤에 글자 붙임·앞부분만·앞에 글자 붙임·하위 경로 모두 404, Location 없음 |

`curl -I` 기록(8개)은 `docs/tools/programmer-16/fixture-build-output.txt`.

## 리뷰어 확인 요청
- 핸드오프 결정 1·4·5·6·7·9, 미해결 1~4.
- 실제 배포 확인(슈퍼바이저): 업로더 02 배포 뒤 #1 옛 주소 ko·en `curl -I` 1~2회.
