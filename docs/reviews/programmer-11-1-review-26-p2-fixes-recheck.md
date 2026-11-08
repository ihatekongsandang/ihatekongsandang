# 리뷰 26-1: 프로그래머 11-1 — 리뷰 26 P2 4건 수정 재확인

**리뷰어**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/processed/26-1-programmer-11-1-recheck.md` | **작성**: 2026-11-09 08:17

**대상**: `src/app/(ko)/about/page.tsx` · `src/lib/share.ts` · `src/lib/config.ts`(소스 직접), 프로그래머 11-1 핸드오프·트리거, `docs/tools/programmer-11-1/` 전부(README·도구 3종·출력 7종·게이트 로그·화면 18장은 문자열 검사만), 기획자 10 트리거·`planning/en-d1-reconfirm.md`, 리뷰 26 본문·트리거
**제약 준수**: 빌드 0 · `next start` 0 · 의존성 설치 0 · git 쓰기 0(`git status`·`git diff`만) · 대상 수정 0. 프로그래머가 남긴 `.next`(BUILD_ID 08:11:52)를 읽기만 했다. `src`·`content`에 그보다 새 파일은 **0개**라 `.next`가 현재 소스의 빌드임을 확인했다.

**측정 도구** (`docs/tools/reviewer-26-1/`, 절대경로 없음, 저장소 루트에서 실행)

| 파일 | 내용 | 결과 |
|---|---|---|
| `share-check-rerun.txt` | `npx tsx docs/tools/programmer-11-1/share-check.ts` 재실행 | exit 0 · FAIL 0, 프로그래머 출력과 **바이트 동일** |
| `copy-exact-check-rerun.txt` | `python3 docs/tools/programmer-11-1/copy-exact-check.py` 재실행(`.next` HTML 읽기만) | 12/12 PASS, 프로그래머 출력과 **바이트 동일** |
| `renewal-check-rerun.txt` | `npx tsx docs/tools/programmer-11/renewal-check.ts` 재실행 | 34/34, 프로그래머 11-1 출력과 **바이트 동일** |
| `recheck.py` → `-output.txt` | 🆕 ① 기대 문장을 **리뷰 26 본문·기획자 10 산출물에서 직접** 읽어 소스와 완전 일치 대조(about `<li>`는 JSX 공백 규칙으로 펼침) ② `.next` 상세 HTML 412개 X·스레드 href 전수 | **15/15 PASS** |
| `x-boundary-check.ts` → `-output.txt` | 🆕 실제 `share.ts` 함수로 256 경계(ASCII 256/257 · 한글 128/129 · 혼합 256/257 · em dash · 이모지 128/129 · 빈 제목)·특수문자 인코딩·스레드 불변 | **33/33 PASS** |
| `old-p11-share-check-now.txt` | 참고: 프로그래머 11 원본 `share-check.ts`를 지금 코드에 돌린 결과 | exit 1(말줄임 기대값이 옛 동작이라 실패 — 예상된 결과, §5 정보) |

## 1. 판정

### ✅ 승인 — 커밋 가능

리뷰 26 배포 차단 P2 4건이 모두 해소됐다. 남은 배포 차단 결함 **0건**. 신규 P2·P3 **0건**. 정보 2건(§5).

| # | 리뷰 26 결함 | 확인 | 판정 |
|---|---|---|---|
| P2-1 | about(ko) 개인정보 단정 | 소스 `<li>` = 리뷰 26 §6 수정 문구 **완전 일치** · 빌드 HTML 일치 · 옛 문구 소스·HTML 0 | ✅ 해소 |
| P2-2 | about(ko) 매체 등록 오기 | 소스 `<li>` = 리뷰 26 §6 수정 문구 **완전 일치** · 빌드 HTML 일치 · 옛 문구 0 | ✅ 해소 |
| P2-3 | X 제목 자르기로 반박 절 소실 | 예산 초과 시 `text` 없이 `?url=`만. 전수·경계·인코딩·스레드 확인(§3) | ✅ 해소 |
| P2-4 | 영어 D1 셋째 문장 의미 변경 | 소스 `aboutIntro` = 기획자 10 최종 문구 **완전 일치**, 의미 동등 승인(§4) | ✅ 해소 |

## 2. P2-1·P2-2·P2-4 글자 대조

기대 문장은 프로그래머 오더가 아니라 **원 출처**에서 읽었다. P2-1·P2-2는 리뷰 26 §6의 `> **수정**:` 두 줄이고, P2-4는 기획자 10 트리거의 코드 블록이다. 기획자 10 트리거 코드 블록과 `planning/en-d1-reconfirm.md` §4 코드 블록이 서로 같은지도 확인했다(aboutIntro·description 둘 다 일치). 기획자 10 aboutIntro의 셋째 문장은 리뷰 26 §5.1 수정 문구 안과 같다.

- **P2-1** `src/app/(ko)/about/page.tsx` 운영 방식 셋째 `<li>`(35~36행): 두 줄로 나뉘어 있다. JSX 규칙으로 펼치면 "별도로 개인정보"처럼 한 칸으로 이어진다. 결과는 기대 문장과 **완전 일치**한다.
- **P2-2** 같은 파일 출처 정책 둘째 `<li>`(48~50행): 세 줄로 나뉘어 있고, 펼친 결과가 **완전 일치**한다. 이 문장은 약관 소스(`src/app/(ko)/terms/page.tsx` 59행)·기획 문안(`planning/terms-page-copy.md` 32행)의 정정본과 같은 취지다.
- **P2-1 출처 대조**: 약관 문안 49행·약관 소스 121행에 "가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계"가 있다. 소개와 약관의 진술이 이제 맞는다.
- **P2-4** `src/lib/config.ts` `SITE_EN.aboutIntro`: 소스 문자열 = 기획자 10 최종 문구, **완전 일치**. `SITE_EN.description` = 기획자 10 description, 157자, 불변.
- 빌드 HTML: `/about`·`/en/about`·`/en` 대조 12/12(재실행, 바이트 동일). 옛 문구 3종은 두 페이지에서 0이다.
- `/en/about`에는 개인정보·매체 나열 문장이 없다(HTML 정규식 0). 그래서 en은 바꿀 대상이 아니라는 핸드오프 결정 1은 맞다.

## 3. P2-3 코드 (`src/lib/share.ts`)

```ts
export function xShareText(title: string): string {
  const budget = X_MAX_WEIGHT - X_URL_WEIGHT - X_SEPARATOR_WEIGHT   // 280 − 23 − 1 = 256
  return xWeight(title) <= budget ? title : ''
}
export function xIntentUrl(title: string, pageUrl: string): string {
  const text = xShareText(title)
  const url = `url=${encodeURIComponent(pageUrl)}`
  return text ? `${X_INTENT}?text=${encodeURIComponent(text)}&${url}` : `${X_INTENT}?${url}`
}
```

- **분기**: 가중치 ≤ 256이면 원제목, 넘으면 `''`이다. `''`이면 `text` 파라미터 자체를 뺀다. 말줄임 로직과 `ELLIPSIS`는 제거됐고, `src` 안에 다른 사용처가 없다(grep). 호출처는 `share-buttons.tsx` 88·93행 2곳이고 시그니처는 바뀌지 않았다.
- **경계(합성, 실제 함수)**: ASCII 256 → text 유지 · 257 → url만. 한글 128자(256) → 유지 · 129자(258) → url만. 한글 127 + ASCII 2(256) → 유지 · +3(257) → url만. em dash 256(가중치 1) → 유지. 이모지 128 → 유지 · 129 → url만. 빈 제목 → url만(키 `url` 하나). 33/33.
- **인코딩**: `& # ? % + " '`·줄바꿈이 섞인 제목도 `text`가 그대로 왕복한다. 생 URL에 `&`는 구분자 1개뿐이고, 인코딩 안 된 `#`·공백은 0이다. `url` 왕복은 전 사례 일치. share-check 412건 인코딩 왕복 FAIL 0.
- **스레드**: `threadsIntentUrl`은 자르기 없이 `text`·`url`을 넣는 3줄 함수다. `share.ts`가 미추적이라 11 원본과 글자 diff는 할 수 없다. 대신 동작이 리뷰 26 때와 같은지 실측으로 확인했다. 400자 합성 제목도 그대로 나가고, 412건 모두 text = 원제목이며, 최대는 404/500이다(리뷰 26 재실측 값과 같다).
- **전수(재실행)**: share-check 412제목에서 url만 ko 0 · en 24이고, 이는 리뷰 25 목록과 일치한다. 원제목 text 388 · X 최대 278/280 · FAIL 0.
- **빌드 HTML 전수(🆕, 서버 없이)**: `.next` 상세 HTML 412개(ko 206 + en 206)에서 X·스레드 href를 하나씩 뽑았다.
  - `text` 없는 X href는 ko 0이다. en은 24이고, 그 id 목록이 share-check url만 목록과 같다.
  - `text` 있는 X href 388개는 모두 그 페이지 h1 제목과 같다. 쿼리 키는 `text,url` 순서이고 말줄임은 0이다.
  - 스레드 href 412개는 `text` = h1, `url` = X의 `url`이다.
- 김민석 게시물(`gotdemcatch-kimminseok-chief-justice-resign`, en 가중치 312)도 url만 24건에 들어 있다. 잘린 문구가 미리 채워지는 경로는 없어졌다.

## 4. P2-4 의미 동등 — ✅ 승인

| ko D1 셋째 문장 | en(최종) |
|---|---|
| 사실 확인 단계는 단정하지 않고 보도 그대로 인용합니다. | We do not make definitive claims about how far the facts have been established; we quote the reports as they are. |

- "단정하지 않고" = "do not make definitive claims". 단정적 주장을 하지 않는다는 뜻이 같다. 옛 "do not state"(밝히지 않는다)의 의미 변경이 해소됐다.
- "사실 확인 단계" = "how far the facts have been established". 확인이 어디까지 됐는지를 가리키는 구조가 같다.
- "보도 그대로 인용합니다" = "we quote the reports as they are". 동등하다.
- 한국어 소개 표기 원칙("사실 확인이 어디까지 된 일인지는 요약 문장과 출처 목록으로 전달")과 충돌하지 않는다. 운영자 자체 판단을 하지 않는다는 뜻이기 때문이다. D6 자칭어도 없다.
- 첫째·둘째 문장은 리뷰 26 §5.1에서 이미 동등 판정했고, 글자도 바뀌지 않았다. 따라서 **aboutIntro 전문의 의미 동등을 승인한다.**

## 5. 범위 이탈 없음 · e2e · 저장소 독립

**범위**
- 리뷰 26 트리거 파일(mtime 07:26)보다 새 파일을 봤다. 대상은 `src`·`content`·`scripts`·`public`·`planning`·`design`·`package*.json`·`tsconfig.json`이다.
- 해당 파일은 `src/lib/share.ts`·`src/lib/config.ts`·`src/app/(ko)/about/page.tsx`·`planning/en-d1-reconfirm.md`(기획자 10) **4개뿐**이다.
- 세 소스 파일 안의 변경 내용은 다음과 같다.
  - about: `<li>` 2개(현 `git diff`의 해당 hunk가 11-1 트리거의 "전" 문장과 일치)
  - config: aboutIntro 셋째 문장 + 주석 1줄
  - share: X 분기 2함수 + 주석
- 미커밋이라 11 원본과 diff로는 구분할 수 없다. 대신 핸드오프 산출물 표, 트리거 전후 문장, 위 mtime 결과가 서로 맞는다. 범위 이탈 근거는 **없음**이다.
- 도구 사본 diff:
  - `programmer-11-1/a11y-e2e.mjs`는 원본과 머리 주석, 화면 경로, alaska 2개 대상의 `xText` 플래그, h1 수집, X 확인 2종만 다르다.
  - `share-check.ts`는 P2-3 기대값 부분만 다르다.

**a11y-e2e (재실행 안 함)**
- `a11y-e2e-output.txt`는 PASS 176 · FAIL 0이다.
- 프로그래머 11 출력(172)과 라벨을 대조했다. 추가는 X href 4줄(ko text = 제목 ×2폭, en text 없음 ×2폭)뿐이다.
- 나머지 172 라벨은 같다. 값만 다른 1줄은 포커스 외곽선 대비 12.2 → 15.86이고, 둘 다 기준 ≥ 3을 넘는 PASS다(리뷰 26에서 본 색 전환 중 표본과 같은 성격).
- **재실행이 필요 없다고 판단한 이유**:
  - 이번 변경은 문장 3개와 정적 href 분기뿐이다. 레이아웃·포커스·ARIA 코드는 바뀌지 않았다.
  - X href는 위 빌드 HTML 412개 전수에서 SSR 값을 이미 확인했다.
  - 클라이언트는 같은 순수 함수로 같은 값을 다시 계산한다(origin 대체만 다르고, 이는 리뷰 26 §4.3에서 8/8 실측).

**보조 기록 확인**
- `typecheck-output.txt` exit 0이다.
- `lint-output.txt`는 0 errors · 4 warnings이고, 경고는 전부 기존 `docs/tools/reviewer-04·10·26` 파일에서 나온다.
- `gate-worktree.log` 끝줄은 "깨끗한 복제본 게이트 통과 (--worktree)"다.
- `build-output.txt` ↔ `-ga-dummy.txt`는 99행 이후가 다른 별개 로그다(cmp 확인).

**저장소 독립**
- 검사 범위는 다음 **47파일**이다.
  - `docs/tools/programmer-11-1/` 전부(PNG 18 포함)
  - `docs/tools/reviewer-26-1/` 전부
  - 11-1 핸드오프·트리거·처리된 오더
  - 기획자 10 트리거·`planning/en-d1-reconfirm.md`·처리된 오더
  - 본 오더
  - 대상 소스 3
- 홈 절대경로·홈 디렉터리명·계정명·다른 서비스명 패턴 → **0건**. 패턴 목록은 그 자체가 위반이 되므로 적지 않는다.

**정보(결함 아님)**
- I-1: 프로그래머 11 원본 `docs/tools/programmer-11/share-check.ts`는 옛 말줄임 동작을 기대값으로 한다. 그래서 지금 코드에 돌리면 exit 1이 난다(`old-p11-share-check-now.txt`). 이 원본은 11 시점 기록으로 두는 것이 맞다. 이후 재검증은 `programmer-11-1/share-check.ts`로 한다.
- I-2: 남아 있는 `.next`의 공유 `url`은 로컬 `.env.local` 값 기준(`http://localhost:3000/...`)이다. 로컬 빌드라서 그렇고, 운영 값은 Vercel 환경변수가 정한다. 배포 후 반영 확인 `curl` 1회로 상세 X href의 origin을 보길 권한다.

## 6. 커밋 대상 경로 최종 목록

리뷰 26 목록에 11-1·26-1·기획자 10 산출물을 더했다. 프로그래머 11-1 수정은 이미 이 목록의 `src` 경로 안에 있다.

```
src/lib/config.ts
src/lib/i18n.ts
src/lib/analytics.ts
src/lib/seo.ts
src/lib/share.ts
src/lib/content/view.ts
src/lib/content/renewal.ts
src/components/share-buttons.tsx
src/components/page-section.tsx
src/components/post-detail.tsx
src/components/post-card.tsx
src/components/site-footer.tsx
src/app/sitemap.ts
src/app/llms.txt/route.ts
src/app/(ko)/about/page.tsx
src/app/(en)/en/about/page.tsx
src/app/(ko)/terms/page.tsx
src/app/(en)/en/terms/page.tsx
# 프로그래머 11
docs/tools/programmer-11/
docs/handoffs/programmer-11-news-format-v0.2-implement.md
docs/triggers/programmer-11-news-format-v0.2-implement-COMPLETE.md
instructions/programmer/processed/11-news-format-v0.2-implement.md
# 리뷰 26
docs/reviews/programmer-11-news-format-v0.2-implement-review.md
docs/tools/reviewer-26/
docs/triggers/reviewer-26-programmer-11-news-format-v0.2-review-COMPLETE.md
instructions/reviewer/processed/26-programmer-11-news-format-v0.2-review.md
# 프로그래머 11-1
docs/tools/programmer-11-1/
docs/handoffs/programmer-11-1-review-26-p2-fixes.md
docs/triggers/programmer-11-1-review-26-p2-fixes-COMPLETE.md
instructions/programmer/processed/11-1-review-26-p2-fixes.md
# 기획자 10 (핸드오프 파일은 없음 — 트리거·산출물·처리된 오더 3개)
planning/en-d1-reconfirm.md
docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md
instructions/planner/processed/10-en-d1-reconfirm.md
# 리뷰 26-1
docs/reviews/programmer-11-1-review-26-p2-fixes-recheck.md
docs/tools/reviewer-26-1/
docs/triggers/reviewer-26-1-programmer-11-1-recheck-COMPLETE.md
instructions/reviewer/processed/26-1-programmer-11-1-recheck.md
history/2026-11-09.md
```

**범위 밖(이번 커밋에 넣지 않음)**: `git status`에 함께 보이는 `docs/user-tasks.md`·`history/2026-10-01.md`·`history/2026-11-05.md` 수정분과 나머지 미추적 history 파일들. 테스터 01 산출물(`docs/handoffs|triggers/tester-01-*`·`docs/qa/tester-01/`·`docs/tools/tester-01/`·`instructions/tester/processed/01-*`)도 넣지 않는다. `docs/tools/planner-07/` 수집 HTML·XML도 마찬가지다. 경로를 지정해 커밋하고, 커밋 전 `clean-clone-gate.sh --staged`를 돌린다(리뷰 26 P3-8).
