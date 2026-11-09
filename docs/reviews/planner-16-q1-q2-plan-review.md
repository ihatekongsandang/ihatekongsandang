# 리뷰 — 기획자 16 Q1 주소 이전·Q2 소개 문구·SNS 저장본 정리 계획 (리뷰어 34)

**작성일**: 2026-11-09 | **작성 세션**: 리뷰어 (Opus 5.5, 모델 ID claude-opus-5-5) | **오더**: `instructions/reviewer/processed/34-planner-16-q1-q2-plan-review.md`
**대상**(커밋 전): `planning/q1-redirect-q2-sns-image-plan.md`(신규), `planning/v0.9-copy-and-code-list.md`(diff), `docs/poster/guide.md`(diff, 슈퍼바이저 2줄), `docs/tools/planner-16/`, 트리거 `docs/triggers/planner-16-q1-q2-plan-COMPLETE.md`
**기준**: 사용자 결정 Q1=b·Q2=b, 오더 배경의 슈퍼바이저 판단 4건, 리뷰 30·32, 현행 코드(`next.config.ts`·`src/middleware.ts`·`src/lib/content/`·`src/app/sitemap.ts`·`src/app/llms.txt/route.ts`·`scripts/validate-content.ts`), Next.js 15·Vercel 공식 문서(§1.1에 직접 확인한 내용)
**도구**: `docs/tools/reviewer-34/` — `recount-sns-images.mjs`(+`recount-output.txt`), `worktree-vs-head-output.txt`, `news-host-posts.mjs`(+출력), `selfmade-vs-r30.mjs`(+출력), `tier3-annotated.sh`(+출력)

> 저장소 독립 원칙: 이 문서와 도구에는 다른 서비스명·계정·홈 경로를 쓰지 않았다. 비공인 인물의 실명은 쓰지 않고, 옛 id는 `<옛 id>`로 적는다. `content/`·대상 문서는 수정하지 않았고, git 쓰기와 빌드는 하지 않았다. 임시 사본(HEAD 스냅숏·핫링크 재시험 파일)은 저장소 밖 임시 폴더에만 두었다.

---

## 0. 판정

**조건부 승인 — P1 0 · P2 4 · P3 11.**
- P2-1~P2-3은 프로그래머 16을 시작하기 전에 고친다. 문서 정정은 기획자 16-1이 하거나, 슈퍼바이저가 프로그래머 16 오더에 이 리뷰의 정정 문안(§2.4)을 그대로 넣는다. 고친 뒤 계획 문서를 커밋한다.
- P2-4는 SNS 정리 묶음 1을 시작하기 전까지 고친다. 프로그래머 16과는 상관없다.

| 임무 | 결과 |
|---|---|
| 1 리다이렉트 사양 | 방식(`next.config.ts` `redirects()`)과 308·처리 순서·쿼리 전달·끝 슬래시를 공식 문서로 확인했다. 맞다. `src/` import는 Next 소스 코드로 보면 가능하다(실측은 프로그래머). Vercel 한도는 **2,048개**로 확인했다. 결함: 예시 줄이 검증 규칙과 충돌한다(**P2-1**). 시험표 보강 P3 |
| 2 C4 문안 | 139건 저장, "상당수", 권리 문장, D6(나), 저작권 표현은 맞다. 다만 **언론 이미지 줄이 현재형인데 지금 쓰는 글이 0건**이다. 사이트 제작 이미지 68건은 설명에서 빠졌다(**P2-2**). 영어 절은 한국어보다 약속이 엄격하고 면책 문장이 빠졌다(**P2-3**) |
| 3 139건 재현 | **A 139 + B 68 + 미분류 0 = 207**. 독립 규칙으로 재현했다. TSV는 139행, 고유 139, 중복 0이고, A 집합과 정확히 같다. 묶음 합은 139다. 업로더 작업 중간 상태 때문에 생긴 차이는 §3.2에 따로 적었다 |
| 4 핫링크 판정 | **"① 채택 불가" 결론은 근거와 맞다.** 리뷰어가 1건을 재시험했다. 만료 표식이 같았고, 서명을 바꾸면 **403**이 나왔다. "며칠 뒤 모두 깨진다"는 단정은 실측이 아니다(P3-9) |
| 5 guide 2줄 | 정책·사용자 결정과 맞다. 같은 절의 옛 문구 1곳이 남았다(P3-7) |
| 6 프로그래머 16 범위 | C3·C4·C5·C11 묶음과 2커밋 분할 권고가 타당하다. 최종 범위는 §6 |
| 7 독립·실명 grep | 대상과 리뷰 산출물 모두 **0건**(§7) |

---

## 1. 리다이렉트 사양 (임무 1)

### 1.1 공식 문서 대조 (2026-11-09 직접 확인)
| 항목 | 공식 문서 내용 | 사양과 대조 |
|---|---|---|
| 308 | Next 15 `redirects`: "`permanent` `true` … will use the 308 status code". `statusCode`를 `permanent` 대신 쓸 수 있다(둘 다는 불가) | 맞음 |
| 처리 순서 | Next 15 middleware 문서 "Execution order": 1 `headers` → 2 `redirects` → 3 Middleware → 4 `beforeFiles` → 5 Filesystem → … → 7 Dynamic Routes | 맞음. 옛 주소는 `dynamicParams = false`의 404보다 먼저 처리된다. 현행 middleware matcher(`/`·`/tag/:slug`·`/en`)는 `/post/…`와 겹치지 않는다(직접 확인) |
| 쿼리 | Next: "any query values provided in the request will be passed through to the redirect destination". Vercel Configuration Redirects: "The request's query string passes through to the destination" | 문서상 **보존된다**. 사양은 "미실측"으로 두었는데, 기대값을 "보존"으로 적고 실측하면 된다(P3-4) |
| 끝 슬래시 | Next `trailingSlash`: "By default Next.js will redirect URLs with trailing slashes to their counterpart without a trailing slash" | `/post/<옛 id>/` → `/post/<옛 id>` → `/post/<새 id>`의 **2단 이동**이 예상된다. 사양의 "중간 이동 1회까지 허용"과 맞다. 실측으로 확정한다 |
| 정적 배포 | Next 15 Static Exports 문서의 Unsupported Features에 **Redirects**가 있다(`output: 'export'`) | 현행 `next.config.ts`에는 `output`이 없어 해당하지 않는다. 사양의 "정적 배포(SSG)"는 export와 다르다는 점을 코드 주석으로 남긴다(P3-3) |
| Vercel 처리 | Vercel Configuration Redirects: "routing rules that Vercel evaluates at build time"이고 Next.js는 `next.config.js` 사용을 안내한다. "deployed to every region in Vercel's CDN"이다 | 맞음(서버 함수 호출 없음) |
| **Vercel 한도** | 같은 문서 Limits: "Number of redirects in the array **2,048**", "String length for source and destination **4,096**" | 사양 §1.4·§5-2의 "확인 필요"가 **해소**됐다. 옮긴 건 하나에 규칙 2개(ko·en)라 약 1,000건까지 여유가 있다. Next 자체 규칙(끝 슬래시)이 이 수에 포함되는지는 확인 필요 |
| 검색엔진 | Google Search Central: 308 "Equivalent to 301" | 구글은 맞다. **네이버·다음의 308 처리는 공식 문서를 확인하지 못했다**(네이버 서치어드바이저 페이지 접근 불가). P3-2 |

### 1.2 `next.config.ts`에서 `src/` 파일 import
- 공식 문서(Next 15 TypeScript): "Module resolution in `next.config.ts` is currently limited to `CommonJS`." 상대 경로 TS 파일 import를 금지한다는 문장은 없다.
- 설치된 Next 15.5.25 소스(`node_modules/next/dist/build/next-config-ts/transpile-config.js`·`require-hook.js`)를 직접 읽었다. 설정 파일을 SWC로 CommonJS로 바꾼 뒤 코드에 `require(`가 있으면 `.ts`·`.cts`·`.mts` 확장자의 require 훅을 등록한다. 그래서 `./src/lib/content/moved-ids`처럼 상대 경로로 부른 TS 파일도 같은 SWC 설정으로 변환되어 로드된다. tsconfig `paths`·`baseUrl`도 SWC에 넘어간다.
- **판정: 코드 근거로는 가능하다. 단 실측은 아니다.** 프로그래머 16이 로컬 프로덕션 빌드로 확정한다. 별칭(`@/`)보다 상대 경로를 권한다. 공유 함수가 `node:fs`와 `process.cwd()`(현행 `retired-ids.ts`와 같음)를 쓰는 것은 문제없다. 설정 로드 시 cwd는 프로젝트 루트다(`next start`도 마찬가지). 대안(설정 안 중복 구현 + 동등성 단위 테스트)도 사양에 있어 어느 쪽이든 막히지 않는다.

### 1.3 사양 결함
**P2-1 (`moved-ids.txt` 예시 줄)**: §1.3 파일 사양의 예시 `example-old-id example-new-id`가 **주석이 아니다**. 이 줄이 실제 파일에 들어가면 §1.5 규칙에 걸린다. d(옛 id가 `retired-ids.txt`에 없음)와 f(새 id 게시물 없음)를 어기므로 **빌드가 실패한다**. 검증을 우회하면 `/post/example-old-id` → 404 이동 규칙이 실제로 생긴다. §4 "빌드 영향"의 "비어 있으면 동작 변화 없음"과도 어긋난다. `retired-ids.txt`는 예시 id 3줄이 실제 줄이어도 문제가 없지만, `moved-ids.txt`는 다르다. **고침**: 예시를 `# 예: example-old-id example-new-id`처럼 주석으로 둔다. C11의 첫 배포 파일은 주석만 있는 상태로 한다.

### 1.4 검증 8가지(a~h)와 시험표 9항은 충분한가
- a~h는 형식·자기 이동·재사용·가림·404 이동·사슬·내부 링크를 덮는다. 빠진 것은 없다고 판정한다. 보강 권고(P3-5):
  - h는 `content/posts-en/` 본문도 대상이라고 명시한다. 사이트 자기 도메인의 절대 주소(`https://…/post/<옛 id>`)도 잡는다. 현재 `content/`의 절대 자기 링크는 0건이고, 직접 grep했다.
  - §1.4에 있는 "`public/images/<옛 id>/` 0개" 시험이 §1.7 표에는 없다. 표나 검증에 넣는다.
  - `ID_PATTERN`은 `schema.ts`에서 export되지 않은 const다(229행). 규칙 b에 쓰려면 export가 필요하다. 프로그래머가 참고할 사항이다.
- 시험표 보강(P3-4):
  - (10) **음성 대조**: 다른 게시물 `/post/<다른 id>`는 200, 없는 id는 404. 와일드카드가 새지 않는지 본다.
  - (9)의 기대값을 문서 기준 "쿼리 보존, 끝 슬래시는 2단 308"로 적고 실측과 비교한다.
  - 배포 후 `curl -I`는 CLAUDE.md §9 한도(1~2회) 안에서 #1·#2로 고정한다.
- 영어 분기(P3-6): 사양은 "영어본 유무 = `content/posts-en/<새 id>.md` 파일 존재"로 판단한다. 로더(`getAllTranslations`)는 frontmatter `id`로 영어본을 맞춘다. 판단 기준을 로더와 같게(번역 맵 기준) 하면 두 곳이 어긋날 일이 없다.

### 1.5 나머지 사양 항목
- 새 id `2026-08-06-owloffreedom-707-commander-sentencing`은 48자로 확인했다(최장 58자). `ID_PATTERN`을 통과하고, `content/posts`·`posts-en`에 같은 id는 0건이다. 이름 로마자는 없다.
- 옛 id 문자열이 든 파일 **19개**를 재현했다: content 2, `history/2026-10-11.md` 1, `docs/tools/` 16(planner-14 4·reviewer-26 3·reviewer-26-1 2·programmer-11·11-1·14-1·15·reviewer-25·30·31-1 각 1). 내부 링크는 0건이다. 옛 이미지 폴더는 1개 있고, #1 이미지 삭제 때 사라진다.
- 사이트맵·`llms.txt`는 `getAllPosts()` 기반이다(`src/app/sitemap.ts` 28행, `llms.txt/route.ts` 15·54행). 옛 id가 자동으로 빠진다는 서술은 맞다. ko·en 상세 모두 `dynamicParams = false`다.
- **P3-3**: 현행 `next.config.ts`는 `headers`를 `runningOnVercel`이 아닐 때만 붙인다. `redirects`는 그 조건 **밖**에 두어야 Vercel에서도 동작한다. 사양에 이 한 줄과 "`output: 'export'`로 바꾸면 redirects가 사라진다"는 주석을 넣을 것을 권한다.

---

## 2. C4 문안 (임무 2)

### 2.1 사실 대조 (직접 셈)
| 문안 | 사실 | 판정 |
|---|---|---|
| SNS 글 "상당수"가 원 게시물 이미지를 저장 | SNS 호스트 게시물 202건(instagram 178·threads.com 19·threads.net 5) 중 저장본 138건(+언론 주소 글 1건). 약 68% | **맞음**(과장 아님) |
| "권리는 원 게시자 또는 이미지의 권리자에게" | 저장 139건 모두 `public/images/{id}/`에 있고 원 게시물에서 온 것 | 맞음. 권리 귀속을 일반적으로 말한 것이고, 적법성 주장은 없다 |
| "정리 중이며 … 순차적으로 바꾸고 있습니다" | C4 배포 시점에는 교체 0건일 수 있다(§3.4 선행 조건이 C4 배포 → 67건 시범 → 묶음 1) | 결정과 계획이 있으므로 거짓은 아니다. 다만 현재진행형보다 "차례로 바꿉니다"가 정확하다(P3-1) |
| **"언론 기사를 근거로 든 글은 … 원 매체 주소에서 그대로 불러와 보여 줍니다"** | `image.kind: news` **0건**. sourceUrl이 언론인 글 5건의 현재 방식은 자체 제작 카드 4, 스레드 사진 저장본 1이다(`news-host-posts-output.txt`) | **현재 사실과 다르다**(P2-2) |
| (빠진 것) 사이트가 만든 이미지 | 68건(자체 제작 카드 67 + 요약 이미지 1). 리뷰 30의 67건과 집합이 같다(`selfmade-vs-r30-output.txt`) | 2번이 "글의 근거에 따라 다릅니다"로 종류를 나열하는데 이 68건이 어디에도 없다(P2-2) |
| D6(나) | "기자·편집국·본지·속보·바이라인" 자칭 없음. 3번의 "기자회견"은 행사 종류를 서술한 것이라 대상이 아니다(PRD §6⑥(나) 적용 범위) | 맞음 |
| 저작권 표현 | "전재하지 않습니다", "복제해 두지 않고", 권리 귀속. "공정 이용"이나 "적법" 같은 단정은 없다 | 맞음 |
| 3번(얼굴 기준) 대상 | 언론·공공 사진만 대상이고, SNS 저장본에는 약속하지 않는다 | 맞음. 사실을 정직하게 처리했다(리뷰 32 지적 반영) |

**P2-2 (C4 ko 2번)**: 첫 줄은 지금 아무 글도 쓰지 않는 방식을 현재 사실처럼 적었다. 공공누리 줄에는 "(현재 쓰는 사진은 없습니다)"가 붙어 있는데 언론 줄에는 없어서 서로 맞지도 않는다. C4는 언론 사진 첫 묶음보다 **먼저** 배포되도록 정해져 있으므로, 배포 시점에 이 줄은 0건을 설명하게 된다. 사이트 제작 이미지 68건도 빠졌다. 정정 문안은 §2.4에 있다.

### 2.2 영어 "Images on cards" 의미 동등성
| ko | en | 판정 |
|---|---|---|
| 1 전재 안 함·메타 인용·링크 | 같음 | 같다 |
| 2 언론 핫링크, 사진 아래 출처(사진 권리자 또는 매체)·원문 링크 | "credited and linked … On the post page" | 대체로 같다(권리자/매체 구분은 빠짐) |
| 2 SNS 저장·권리·정리 중 | 같은 뜻 | 같다. 영어 표현은 다듬기 권고(P3-8) |
| 2 **공공누리 줄** | **없음** | 빠졌다. 그런데 3번 영어에 "public sources"가 나와 정의 없이 쓰인다 |
| 2 대체 이미지 | 같음 | 같다 |
| 3 공인 공적 활동 한정 | 같음 | 같다 |
| 3 **수행원·통역·배석자가 나올 수 있음** | **없음** | **영어가 더 엄격하다.** 영어는 "private individuals … can be recognized" 사진을 쓰지 않는다고만 해서, 통역이 나오는 공식 일정 사진을 처음 올리는 순간 영어 문장이 거짓이 된다. 리뷰 32가 지적한 "얼굴 문장" 문제와 같은 종류다 |
| 3 같은 사건 당시 사진만, **사진은 내용의 근거가 아님**, 의혹 사안 사진 설명 | **없음** | 2b 완화책(리뷰 30)의 공개 고지가 영어에서 빠졌다 |
| 4 공유 미리보기 | 같음 | 같다 |

**P2-3**: 영어 문안에 빠진 3문장(수행원 예외·같은 사건 사진과 근거 아님·의혹 사안 사진 설명)과 공공누리 줄을 넣는다(§2.4).

### 2.3 그대로 둘 것
약관과 "정정·삭제 요청" 문구를 그대로 두는 판단에 동의한다(요청 시 대체 카드로 바꾸는 절차가 SNS 저장본에도 적용된다).

### 2.4 정정 문안 (권고 — 채택은 슈퍼바이저·기획자)
**ko 2번** (나머지 1·3·4번은 16 재정정본 그대로)
> 2. 카드의 대표 이미지는 글에 따라 다릅니다.
>    - **언론 기사의 사진을 쓰는 글**은 그 사진을 이 사이트에 복제해 두지 않고 원 매체 주소에서 그대로 불러와 보여 줍니다. 사진 아래에 출처(사진 권리자 또는 매체)와 원문 링크를 적습니다.
>    - **SNS 게시물을 다룬 글 중 상당수**는 원 게시물의 이미지(썸네일)를 이 사이트에 **저장해** 보여 줍니다. 이 이미지는 원 게시물에서 가져온 것이고, 권리는 원 게시자 또는 이미지의 권리자에게 있습니다. 이 방식은 **정리하기로 했으며**, 근거 언론 기사의 사진 또는 대체 이미지로 차례로 바꿉니다.
>    - 일부 글은 이 사이트가 게시물 요지를 정리해 만든 카드 이미지를 씁니다. 이 이미지도 차례로 바꿉니다.
>    - 공공누리로 개방된 공공 사진을 쓸 때는 사진 아래에 공공누리 유형을 적습니다(현재 쓰는 사진은 없습니다).
>    - 사진이 없거나 불러오지 못하면 대체 이미지를 보여 줍니다.

**en** (추가·교체 줄만)
> - A card's main image depends on the post.
>   - When a post uses a photo from a news article, the photo is loaded directly from the news outlet's address rather than copied to this site. Below the photo, we credit the rights holder or outlet and link to the original.
>   - Many posts about social media posts show the original post's image, stored on this site. These images come from the original posts, and the rights belong to the original poster or the image's rights holder. We have decided to phase this out and will replace them step by step with a photo from the news article or a replacement image.
>   - Some posts use a card image this site made to summarize the post. These will also be replaced step by step.
>   - When we use public photos released under the Korea Open Government License (KOGL), the license type is shown below the photo (none are in use now).
> - Photos from news articles and public sources show people only in the public activities of public figures (for example, parliamentary or government events, press conferences, diplomatic events). Photos of official events may also show staff, interpreters or attendees performing official duties. We do not use photos in which other private individuals, minors, victims, or injured people can be recognized. We use only photos taken at the event the post covers, and a photo is not evidence for what the post says. Photos on posts about allegations, investigations or trials carry a caption saying who took them, when and where.

절 제목은 "Quotes, images and copyright"를 권한다(1번이 글 인용이라 "Images on cards"보다 범위가 맞다, P3-8).

---

## 3. 139건 집계 재현 (임무 3)

### 3.1 독립 재현 (`recount-sns-images.mjs` — 기획자 도구를 쓰지 않음)
분류 규칙: B = caption에 "자체 제작" 또는 "직접 만든"이 있는 글. A = B가 아니면서 caption이 "원문"이나 "스레드 "로 시작하는 글. 나머지는 미분류.

| 항목 | 결과 |
|---|---|
| 전체 | 207 (갤러리 0, 대표 이미지 파일 없음 0, `kind` 전부 생략 = self) |
| **A + B + 미분류** | **139 + 68 + 0 = 207** ✔ |
| A의 호스트 | instagram 124 · threads.com 11 · threads.net 3 · munhwa.com 1 (기획자 기록과 같음) |
| A의 파일 위치 | 139건 모두 `/images/{id}/` |
| B와 리뷰 30의 67건 | 자체 제작 67건 집합이 리뷰 30 `post-recheck.tsv`와 **정확히 같다**(양쪽 차집합 0) + 요약 이미지 1 = 68 |
| TSV | 139행 · 고유 id 139 · 중복 0 · **TSV에만 0 / A에만 0** |
| 묶음별 | 9·9·10×11·11 → **합 139** ✔ · Tier T1 18 · T2 7 · T3 114 · 묶음 4~14 최신순 역전 0 |

### 3.2 업로더 작업 중간 상태 때문에 생긴 차이 (원인 구분)
- 첫 측정(18:28)은 `content/`가 HEAD와 같은 상태에서 했다. 스냅숏 sha256은 `b42219c6…`이고 HEAD 아카이브와 같다. 18:32에는 반공-업로더(업로더 01)가 **45개 파일**을 고치고 있었다.
- 작업 트리에서 다시 셌을 때 **A 139 · B 68 · TSV 일치는 변함없다.** 업로더 01은 출처만 고치고 이미지는 건드리지 않는다.
- **달라진 것은 기획자 `count-news-sources.mjs`의 출처 수치다.** HEAD에서는 원 매체 134 · 2곳 이상 116(기획자 기록과 일치)이고, 작업 트리에서는 원 매체 135 · 2곳 이상 125다. 원인은 업로더 01의 포털 출처 교체다. 계획 문서는 이 수치를 "포털 교체 전 수치"라고 이미 밝혀 두었으므로 결함이 아니다. 기록: `worktree-vs-head-output.txt`.

### 3.3 묶음 배정의 위험 순서 (P2-4)
Tier는 caption 문구로만 나뉘었는데, **편집정책상 위험 표기가 있는 11건이 Tier 3(일반)에 들어가 묶음 4·7·9·11·12·14로 밀렸다**(`tier3-annotated-output.txt`).
- 자막·문구가 보도와 다르거나 단정적인 것: "자막 문구는 보도된 발언과 다름", "자막 '맞았다'는 발표 내용보다 단정적", "문구가 보도 내용과 다름", "문구 '통째로 폐지'는 보도된 발언과 다름", "인용 문구는 총리의 실제 발언이 아닌 요약". 정책 §5.3-11 "자막 단정형 화면"(리뷰 30 L10 필수 완화책)과 같은 위험이다. 저장본에는 그 기준이 적용되지 않았을 뿐이다.
- 다른 시점 장면이나 뉴스 표기: "'긴급속보' 표기와 달리 2023년 발언", "2019년 8월 31일 … 장면으로 소개됨"(다른 사건 사진, 정책 4a와 같은 위험), "다시보는 과거 뉴스 시리즈"(기획자 자신의 T1 기준인 '뉴스 화면'에 해당할 수 있음).
- 제3자 글 캡처: "스레드 글 캡처", "SNS 게시글 캡처"(기획자 T1 기준인 '다른 계정 제작'과 같은 성격).
- 기획자의 Tier 근거는 저작권 위험(보도사진 재호스팅)뿐이다. 그러나 사진·자막이 의혹 제목과 결합해 단정처럼 읽히는 위험은 명예훼손 쪽이고 더 크다. 이 11건(적어도 앞의 8건)은 **묶음 1·2 범위**로 올린다. T1이 29건이 되므로 묶음 크기 규칙(`make-batches.mjs`의 18건 고정 검사)도 함께 바꾼다. 담당은 기획자 16-1(도구 재생성) 또는 슈퍼바이저의 묶음 오더다.

---

## 4. 핫링크 시험 판정 (임무 4)

### 4.1 리뷰어 재시험 (1건, 요청 3회, 2초 간격, UA `Mozilla/5.0`, 파일은 저장소 밖)
| 항목 | 결과 |
|---|---|
| 표본 #4 임베드 페이지 | HTTP 200 (248,576 byte) |
| 이미지 주소 | 호스트 `scontent-icn2-1.cdninstagram.com`, `oh`·`oe` 매개변수 있음 |
| `oe` 만료 표식 | **2026-11-13T20:33:28Z**. 기획자 기록 #4와 같다(새로 발급해도 연장되지 않음을 재확인) |
| 외부 Referer 요청 | 200 `image/jpeg` 120,245 byte(기획자 기록과 같은 크기) |
| **`oh`(서명) 값을 바꾼 주소** | **HTTP 403**. 서명을 검사한다. 게시물 주소로부터 이미지 주소를 만들 수 없다 |

### 4.2 판정
- **"① 현 구조에서 채택 불가"는 근거와 맞다.** 근거는 네 가지다.
  - 주소가 서명된 임시 주소다(서명 검사를 실측했다).
  - 임베드 페이지를 매번 읽어야만 주소를 얻는다.
  - 만료 표식이 발급 후 연장되지 않는다.
  - 스레드 표본은 `<img>`로 쓸 이미지 주소가 없다.
  - 덧붙임(P3-10): "빌드 때마다 새 주소를 받아 넣는" 변형도 안 된다. 만료 표식(약 4일)보다 자주 다시 빌드해야 하고, 임베드 페이지를 자동으로 긁는 것이 되기 때문이다. 이 변형은 계획에 없으니 한 줄 넣을 것을 권한다.
- **P3-9 (단정 표현)**: §3.2 해석의 "주소를 `content/`에 적어 두면 며칠 뒤 모두 깨진다"는 **실측이 아니다.** `oe`가 지난 뒤 실제로 거부되는지는 시험하지 않았다. 같은 문서의 "만료 후 동작: 시험하지 못했다"와도 맞지 않는다. "만료 표식이 있어 며칠 뒤 깨질 수 있다(11-14 이후 재시험으로 확인)"로 고친다. 결론은 바뀌지 않는다(서명 주소를 정적 파일에 박는 것 자체가 안정된 핫링크가 아니다). 재시험은 2026-11-14 이후에 같은 주소로 1회 하면 된다.

---

## 5. guide 슈퍼바이저 추가 2줄 (임무 5)
| 줄 | 판정 |
|---|---|
| 새 SNS 게시물은 원 게시물 이미지를 저장하지 않는다. §4-1 순서(A → B → 비움)만 쓴다 | 사용자 Q2=b(저장본 정리)의 취지와 맞고 더 보수적인 쪽이다. 정책 §1.1(재호스팅 금지)과 §4-1 순서와도 맞다. 기획자가 "사용자 확인이 있으면 가장 안전"하다고 적었으므로 **사용자에게 결과를 보고**하기를 권한다(결정 요청이 아니라 정보 제공) |
| id·파일명·태그·이미지 폴더에 비공인 실명(로마자 포함) 금지, 이미 쓴 경우 이전 절차 | §6③ 비공인 규칙, Q1=b와 맞다. "태그"는 기획자 규칙(id·파일명·폴더)보다 넓지만, 태그도 공개 주소(`/tag/…`)라 타당하다. 기존 태그 전수 점검은 이번 범위 밖이다(확인 필요) |

**P3-7**: 같은 절 86행 "이미지 `public/images/{id}/thumb.jpg`(self·public만 …)"이 남아 있다. 새 자체 카드 금지와 새 SNS 저장 금지가 들어간 뒤로 새 `self` 사용은 0이므로, "public만"으로 고치는 것이 일관된다(슈퍼바이저 영역).

---

## 6. 프로그래머 16 최종 범위 (임무 6)
| # | 최종 범위 |
|---|---|
| **C3** | 용어 "주제" 통일(v0.9 §1 8행 + 영어 `Topics`) + `copy-exact` 갱신. 변경 없음 |
| **C4** | ① `sourcePreviewNote` ko/en에서 "썸네일" 삭제. ② `/about` "인용·저작권"을 16 재정정본에 **이 리뷰 P2-2를 반영한 2번**으로 교체. ③ 영어 소개에 절 추가(슈퍼바이저가 추가로 결정함). 문안은 16 문안에 **P2-3 반영**, 제목은 권고안. `copy-exact` 기대값 갱신 |
| **C5** | 이동 경로 간격(v0.9 §2.3), 44px 유지, 360·1280 육안 + 터치 측정. 변경 없음 |
| **C11** | `content/moved-ids.txt`(**예시는 주석만, P2-1**) · `src/lib/content/moved-ids.ts` 공유 함수 · `next.config.ts` `redirects()`(**Vercel 조건 밖**, P3-3) · 영어 분기는 번역 맵 기준(P3-6) · 검증 a~h(+옛 이미지 폴더, h는 ko·en 본문과 자기 도메인 절대 주소) · `ID_PATTERN` export · `content/README.md`의 moved-ids 절과 id 행 "비공인 이름 금지" · 시험 §1.7 1~9 + 음성 대조(10). #1은 옮기지 않는다 |
| 상태 코드 | 308(사양) 유지가 기본이다. 네이버·다음의 308 처리는 확인 필요(P3-2)이므로, 슈퍼바이저가 원하면 `statusCode: 301`로 바꿀 수 있다. GET만 쓰는 주소라 기능 차이는 없다 |
| 커밋 분할 | **타당.** 커밋 1 = C3·C4·C5(C4는 공인 얼굴 사진 첫 묶음보다 먼저 나가야 함), 커밋 2 = C11. 리뷰어 게이트는 두 커밋 묶음을 한 번에 봐도 된다 |
| 순서 | 업로더 01 종료 → 프로그래머 16. 이유: 빌드의 `validate:content`가 `content/`를 읽으므로, 업로더가 고치는 중간 상태가 빌드 결과를 흔들 수 있다(P3-11). 이후 업로더 02(#1 이전)는 C11 배포 뒤 또는 같은 묶음으로 한다 |

---

## 7. 저장소 독립·비공인 실명 grep (임무 7)
- 패턴: pre-commit 훅과 같은 패턴 + 홈 디렉터리명 + 옛 id 문자열(변수로 넣고 출력하지 않음).
- 대상: 계획 문서, v0.9 목록(작업 트리), guide(작업 트리), `docs/tools/planner-16/` 전체, 트리거 16, 이 리뷰, `docs/tools/reviewer-34/` 전체, 트리거 34. **모두 0건**(결과는 트리거 34에 적음).
- 참고: 옛 id 문자열은 HEAD에 커밋된 v0.9 목록에 이미 있다. 작업 트리 diff가 그것을 지운다. 이 diff가 커밋되어도 git 이력에는 남는다(계획 §1.8과 같은 사실).

---

## 8. 결함 표
| 등급 | # | 위치 | 내용 | 고침 |
|---|---|---|---|---|
| P2 | 1 | 계획 §1.3 | `moved-ids.txt` 예시 줄이 주석이 아니어서 검증 d·f에 걸리거나 404 이동이 생긴다 | 예시를 주석으로 |
| P2 | 2 | 계획 §2.2 ko 2번 · v0.9 §2.2 | 언론 이미지 줄이 현재형인데 사용 0건(언론 근거 글 5건 모두 다른 방식). 사이트 제작 이미지 68건이 설명에 없다 | §2.4 정정 문안 |
| P2 | 3 | 계획 §2.2 en | 영어가 한국어보다 엄격(수행원 예외 없음)해 첫 공식 일정 사진에서 거짓이 된다. 같은 사건·근거 아님·사진 설명 고지, 공공누리 줄이 빠졌다 | §2.4 영어 문안 |
| P2 | 4 | `sns-image-batches.tsv` · 계획 §3.4 | 자막·문구 불일치·다른 시점·제3자 캡처 표기 11건이 Tier 3 뒤 묶음에 있다 | 묶음 1·2 범위로 재배정, 묶음 크기 규칙 갱신(SNS 묶음 1 전까지) |
| P3 | 1 | 계획 §2.2 | "바꾸고 있습니다"(배포 시점 0건 가능) | "차례로 바꿉니다" |
| P3 | 2 | 계획 §1.4 | 네이버·다음의 308 처리는 미확인(구글만 확인) | 확인 필요로 표기, 301 선택지 병기 |
| P3 | 3 | 계획 §1.2·1.4 | `redirects`를 Vercel 조건 밖에 둘 것, export 모드면 redirects 불가 | 사양·주석 한 줄 |
| P3 | 4 | 계획 §1.7 | 음성 대조 없음, 쿼리·끝 슬래시 기대값을 문서 기준으로 미기재, 배포 curl 대상 미지정 | (10) 추가, 기대값 기재, #1·#2 고정 |
| P3 | 5 | 계획 §1.5 | h의 범위(en 본문·절대 주소), 옛 이미지 폴더 검사 | 명시 |
| P3 | 6 | 계획 §1.4 | 영어본 유무를 파일 존재로 판단 | 번역 맵(id) 기준 |
| P3 | 7 | guide §4 86행 | "self·public만"이 새 규칙과 어긋난다 | "public만" |
| P3 | 8 | 계획 §2.2 en | "For many posts about social media posts" 어색, 제목 범위 | §2.4 권고 |
| P3 | 9 | 계획 §3.2 해석 | 만료 후 "모두 깨진다"는 단정(미실측) | 가능성 표현 + 11-14 이후 재시험 |
| P3 | 10 | 계획 §3.2·3.3 | 빌드 때 주소 재발급 변형이 검토에 없음 | 불가 사유 한 줄 |
| P3 | 11 | 계획 §4 순서 | 프로그래머 빌드와 업로더 작업 중간 상태가 겹칠 위험 | 업로더 01 종료 후 착수 명시 |

(범위 밖 관찰) v0.9 목록 C1 행의 "self 이미지 206건·'원문 게시물 썸네일' 139"는 옛 수치다(현재 self 207, 해당 caption 65). C11 행이 C10 행 앞에 있다. 정리 오더 때 함께 고치면 된다.

## 9. 사용자 확인 필요 (슈퍼바이저 경유)
1. 핫링크는 쓸 수 없다. 그래서 언론 사진(②)이 안 되는 저장본은 **대체 카드(③)로 내린다**는 데 동의하는지(계획 §3.5). 규모는 묶음 1·2 결과로 확인한다.
2. (알림) 이전 후에도 옛 id 문자열은 공개 저장소에 남는다. 목록 파일 2개(`moved-ids`·`retired-ids`), git 이력, 측정 기록 17개 파일(content 2개는 이전 때 바뀜)이다. 측정 기록은 고치지 않기로 했다(슈퍼바이저 판단).
3. (알림) 새 SNS 게시물은 원 이미지를 저장하지 않는다(슈퍼바이저 판단, Q2=b 취지).

## 10. 참고 (직접 확인한 공식 문서)
- Next.js 15 redirects: https://nextjs.org/docs/15/app/api-reference/config/next-config-js/redirects
- Next.js 15 middleware(Execution order): https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware
- Next.js 15 trailingSlash: https://nextjs.org/docs/15/app/api-reference/config/next-config-js/trailingSlash
- Next.js 15 Static Exports(Unsupported Features): https://nextjs.org/docs/15/app/guides/static-exports
- Next.js 15 TypeScript(`next.config.ts`): https://nextjs.org/docs/15/app/api-reference/config/typescript
- Vercel Redirects: https://vercel.com/docs/routing/redirects · Configuration Redirects(Limits): https://vercel.com/docs/routing/redirects/configuration-redirects
- Google Search Central HTTP 상태 코드: https://developers.google.com/search/docs/crawling-indexing/http-network-errors
- 네이버 서치어드바이저의 308 처리: **확인 필요**(문서 접근 불가, 검색에서도 공식 근거 없음)
