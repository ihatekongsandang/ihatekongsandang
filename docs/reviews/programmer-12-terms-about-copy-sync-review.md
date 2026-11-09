# 리뷰 28 — 프로그래머 12 · 약관·소개 문구 #1~#9 반영 게이트

**작성일**: 2026-11-09 | **작성 세션**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/processed/28-programmer-12-terms-about-copy-review.md`
> 🔴 저장소 독립 원칙 준수. 경로는 저장소 기준 상대경로다. 대상 수정 없음. git은 `diff`·`status`·`show`(읽기)만 썼다. 빌드·`next start`·설치 없음. 프로그래머가 남긴 `.next`(11:14 일반 빌드)를 읽었다.

## 0. 판정

**승인.** P1 0건 · P2 0건 · P3 3건. 커밋을 막는 결함은 없다.
- 커밋 조건은 하나다. **배포가 2026-11-09(Asia/Seoul) 안에 이뤄져야 한다.** 11/10 이후로 밀리면 `src/lib/config.ts`의 `termsLastUpdated` 한 줄과 두 검증 도구의 기대 날짜를 고친 뒤 커밋한다(기획 §6 #9 "코드 반영 배포일").
- 프로그래머 판단 4건: #5·#6 완화 유지 ✅ · #6 아포스트로피는 **`’`(`&rsquo;`)가 맞다** → P3-1, 커밋은 막지 않는다 · #1·#2 링크 미삽입 ✅ · #9 날짜·`<time>` 일치 ✅, `dateModified` 미추가 ✅.
- planning 불일치(리뷰 27 재현 도구 MISS ko 2·en 2)는 커밋을 막지 않는다. 다음 기획 손질 항목으로 적는다(P3-2).

## 읽은 문서
- 대상: `docs/triggers/programmer-12-terms-about-copy-sync-COMPLETE.md`, `docs/handoffs/programmer-12-terms-about-copy-sync.md`, `docs/tools/programmer-12/` 전부(README·도구 4종·출력 10종·화면 18장 중 `terms-mobile.png`·`en_terms-desktop.png` 직접 열람)
- 오더: `instructions/programmer/processed/12-terms-about-copy-sync.md`
- 기획: `planning/v0.2-post-release-sync.md` §1~§7(§6 표 전문), `planning/terms-page-copy.md` 영어 문안·§C, 리뷰 27 트리거
- 소스: `git diff -- src/`(5 files, +45 −10), `src/lib/i18n.ts` 120~125·188~192행, `src/components/post-detail.tsx` 150~200행
- `git status`: `src/` 변경은 이 5파일뿐이다(추적 안 된 `src/` 파일 0). `scripts/`·`content/`·`public/`·`planning/`·`design/`·`package*.json`·설정 파일 변경 0.

---

## 1. 임무 1 — 문구 대조 재현

| 도구 | 방식 | 결과 |
|---|---|---|
| `docs/tools/programmer-12/copy-exact-check.py` 재실행 | 프로그래머 도구. 기대값은 §6 표, 빌드 HTML 정규식 대조 | **38건 PASS 38 · FAIL 0** (트리거 숫자와 같다) |
| 🆕 `docs/tools/reviewer-28/independent-check.py` | 리뷰어 도구. 기대값은 §6 표를 따로 읽는다. 빌드 HTML은 `html.parser`로 절·li·p·strong·h2·header 순서를 모은다. 소스는 JSX 규칙(줄 앞뒤 공백 제거·`{' '}`·엔티티)으로 풀어 대조한다. 실제 h2·i18n 라벨·aboutIntro와 인용도 맞춰 본다 | **38건 PASS 38 · FAIL 0** → `independent-check-output.txt` |

- `.next` 시각: BUILD_ID 11:14:41, 4개 HTML 11:14:43. 변경 소스 최종 수정 11:10:52, 기획 §6은 10:40:01이다. 그래서 빌드 HTML은 현재 소스에서 나왔다. `.next/server/app`의 `G-TEST000000`은 0건이다(일반 빌드).
- 문구가 가리키는 대상이 실제 화면과 맞는지 따로 확인했다.
  - #1 ‘정정·삭제 요청 방법과 처리 기준’ = 약관 ko h2(6개 중 4번째). #2 = en h2. 두 절 모두 anonymous 절 바로 위에 있어 "위"·"above"가 참이다.
  - #5 ‘원문 미리보기’ = `i18n.ts` ko `sourcePreview`. #6 “Original post preview” = en `sourcePreview`.
  - #7 “신문법 등에 따라 등록된 매체” ⊂ `/about` 빌드 화면. #8 인용 ⊂ `SITE_EN.aboutIntro` 소스와 `/en/about` 빌드 화면.
- 범위·글자: 9건 전부 §6 "최종 문구" 칸과 글자 단위로 같다. 옛 문구 4종은 0건이고, 승인 문구는 각 1회다.

## 2. 임무 2 — 프로그래머 판단 4건

### 2-1. #5·#6 약관 약속 완화 — ✅ 렌더에서도 리뷰 27 판단이 유지된다
- **굵게 범위**: sourcing 절의 `<strong>`은 ko가 [`등록된 신문·인터넷신문`, `운영자가 쓰는 요약과 본문에는 기사 요약이나 본문을 그대로 옮기지 않습니다`], en이 [`registered`, `the summaries and text we write never copy a news article's summary or body text`]다. 새 굵은 구절은 §6 `**` 범위와 같다. 마침표는 `</strong>` 밖에 있고, 그 앞에 공백이 끼지 않았다(li 전문 일치로 확인). 화면 2장에서도 같은 범위가 굵게 보인다.
- **고지 위치**: 약관은 "그 사실을 같은 자리에 밝혀 둡니다 / with a note saying so"라고 약속한다. `post-detail.tsx`는 `og.description`이 있으면 같은 미리보기 상자 안에서 `figcaption`(ko "원문 요약(출처 인용)", en "Original summary (quoted, in Korean)")과 `blockquote`로 보여 준다. 그 바로 아래에 `sourcePreviewNote`를 둔다(193행). 이 안내는 상자가 그려질 때 늘 나온다. 안내 문구는 ko "…운영자가 고쳐 쓰지 않은 원문 그대로입니다", en "…shown exactly as in the original, without edits by the operator"다. 그래서 "인용 표시와 함께"와 "같은 자리 고지"라는 약속이 코드와 맞는다.
- `og.description` 사용은 0/207·0/207이다(재실행). 지금 독자에게 보이는 원문 요약 인용은 없다.

### 2-2. #6 아포스트로피 `’` → `'` — **`’`가 맞다(P3-1, 커밋 비차단)**
근거는 모두 직접 측정했다(`independent-check-output.txt` [C]).
1. §6 머리말이 엔티티 관례를 `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;`로 정해 둔다. 곧은 `'`(`&apos;`)는 관례에 없다.
2. §6 #6 "현행" 칸은 `article's`(곧은 `'`)로 적혀 있다. 하지만 직전 커밋(9d969d8) 소스는 `article&rsquo;s`다. 현행 칸을 `’`→`'`로 바꿔야 직전 소스와 일치한다(PASS). 즉 기획 문서의 곧은 `'`는 마크다운 평문 표기일 뿐이고, 글자를 바꾸라는 뜻이 아니다. `terms-page-copy.md` 영어 본문도 배포 소스의 `’`를 모두 `'`로 적고 있다(예: `Korea's Act`. 소스는 `Korea&rsquo;s`).
3. `/en/terms` 화면에서 단어 속 아포스트로피는 `’` 13개, `'` 2개다. `'` 2개는 #8 인용 속 `Korea's`와 #6 `article's`다. 화면(`en_terms-desktop.png`)에서는 같은 절 안에 `Korea’s`(둘째 li 앞부분)와 `Korea's`(#8 인용)·`article's`(#6)가 섞여 보인다.
4. #8은 예외로 맞다. 인용은 `SITE_EN.aboutIntro`와 글자 단위로 같아야 하는데, aboutIntro의 아포스트로피는 곧은 `'` 1개이고 `’`는 0개다. 그래서 `&apos;`가 필요하다.
- **결론**: #6은 `&rsquo;`로 되돌려야 맞다. 다만 뜻·법적 효과는 없는 표기 차이다. 지금 고치면 §6 원문을 기대값으로 읽는 검증 도구와 충돌하고, 재빌드도 해야 한다. 그래서 커밋은 막지 않는다. 기획이 "표의 곧은 `'`는 `&rsquo;`를 뜻한다(aboutIntro 인용만 예외)"는 규칙을 문서에 적은 뒤, 다음 약관 손질 때 1자를 되돌리기를 권한다(§5 손질 항목 ②·③).

### 2-3. #1·#2 `#correction` 링크 미삽입 — ✅ 승인
- 기획(§3·§6)과 리뷰 27이 모두 "선택"으로 둔 항목이다. 평문으로도 목적은 이뤄진다. 가리키는 절이 바로 위 절이고 절 이름이 h2와 글자째 같아서 독자가 찾을 수 있다.
- 링크를 넣으면 Tab 정지점이 하나 늘어난다. 그러면 기존 e2e와 테스터 03의 Tab 순회 기준이 바뀐다. "기능 변경 없음" 전제를 지킨 판단으로 본다. 링크는 필요할 때 따로 오더로 내면 된다.

### 2-4. #9 날짜 상수·`<time>`·`dateModified` — ✅ 승인(배포일 조건)
- 상수 `SITE.termsLastUpdated = '2026-11-09'` 하나를 ko·en이 함께 쓴다. 빌드 HTML은 두 쪽 모두 header의 h1 바로 다음 요소가 `p.text-xs text-muted-foreground`이고, 그 안에 `<time dateTime="2026-11-09">2026-11-09</time>`이 정확히 1개 있다. 화면 표시 텍스트와 `dateTime` 값이 같다.
- JSON-LD는 약관마다 2블록(`WebPage`·`WebSite`)이다. 중첩까지 훑어도 `date`가 들어간 키는 0개다. 그래서 날짜와 어긋날 값이 없다. 오더 조건은 "있으면 맞춘다"였다. 없는 키를 새로 넣으면 #9 범위 밖 SEO 변경이 되므로 넣지 않은 판단은 맞다. 넣을지는 SEO 손질 때 정하면 된다(권고, 결함 아님).
- 조건: 이 리뷰 작성 시각은 2026-11-09 11시대(KST)다. 같은 날 배포되면 §6 "#9 = 코드 반영 배포일"과 맞는다. 날짜를 넘기면 위 §0 조건대로 처리한다.

## 3. 임무 3 — 범위 이탈 없음 ✅
직전 커밋 대비 단어 단위 diff 조각 전부(18개)를 `independent-check-output.txt` [D]에 출력해 하나씩 분류했다.

| 파일 | 조각 | 내용 |
|---|---|---|
| `src/app/(ko)/terms/page.tsx` | 6 | #9 줄 1 · #7 덧붙임 1 · #5 3(`—{' '}`, 굵은 구절 주어, 뒷문장) · #1 1 |
| `src/app/(en)/en/terms/page.tsx` | 7 | #9 1 · #8 1 · #6 4(`—{' '}`, 굵은 구절 주어, `&rsquo;`→`&apos;`, 뒷문장) · #2 1 |
| `src/app/(ko)/about/page.tsx` | 2 | #3: `<>` 감싸기 + `p.text-xs` 문장 |
| `src/app/(en)/en/about/page.tsx` | 2 | #4: 같은 구조 |
| `src/lib/config.ts` | 1 | #9 상수 + 주석 |

- 18조각이 모두 #1~#9에 속한다. 그 밖의 문구·속성·클래스·import 변경은 0이다. 두 소개 페이지의 `ContactPendingNotice` 문구는 들여쓰기만 바뀌었고 글자는 같다.
- #3·#4는 `contactEmail` null 분기 안에만 있다(두 도구 모두 PASS). 창구가 정해지면 상자와 함께 사라진다.
- 코드 품질: 상수를 한 곳에 두고 주석으로 갱신 규칙을 적었다. 새 의존성·클라이언트 코드·스크립트 변경은 없다. 보안 영향도 없다.

## 4. 임무 4 — 결과 기록 검토

| 항목 | 기록 | 리뷰어 확인 |
|---|---|---|
| 문구 대조 | 38/38 | **재실행 38/38**, 독립 도구 38/38 |
| `og.description` | 0/207 · 0/207 | **재실행** 동일(`rerun-og-description-count.txt`: 파일 207·207, 키 0, 값 0, 줄 grep 0) |
| D6 금지어 9종·저장소 독립 × 5파일 | 0 | **재실행** 50줄 전부 `파일=0`·`diff추가=0`, 프로그래머 12 폴더 합계 0(`rerun-word-grep.txt`) |
| typecheck | exit 0 | **재실행** exit 0 |
| lint | 0 errors / 4 warnings | **재실행** 0 errors / 4 warnings. 경고는 전부 기존 `docs/tools/reviewer-04·10·26` 파일이다 |
| e2e | 184/184, 약관·소개 76 | 재실행 불가(`next start` 금지). 기록을 확인했다. PASS 줄 184·FAIL 0, `/terms`·`/en/terms`·`/about`·`/en/about` 항목 76, 신규 8건(개정일 줄 ko/en × 2폭, 처리 기준 문장 ko/en × 2폭)이 기대 문구·`datetime`과 함께 PASS다. 네 페이지 "본문 글자 대비 4.5 미만 0"도 PASS다 |
| build·게이트 | 801/801, `--worktree` 통과 | 재실행 불가(빌드 금지). `build-output.txt`의 `G-TEST000000` 0건과 `gate-worktree.log` 끝 "✅ 깨끗한 복제본 게이트 통과 (--worktree)"를 확인했다 |

## 5. 임무 5 — planning 불일치: 커밋 비차단

- 재실행 결과(`rerun-reviewer-27-reproduce.txt`)는 ko·en 정방향 29개 중 27개 일치다. MISS 4건은 #5·#1(ko)과 #6·#2(en)의 **옛 문장**이고, 기록과 같다.
- 비차단으로 보는 이유: `terms-page-copy.md` §C가 "반영 배포 전까지 원문이 유효 문안이다. 반영 후에는 이 절을 §A·§B 방식으로 환원한다"라고 스스로 정해 두었다. 그래서 MISS는 예정된 순서대로 생긴 차이다. 화면 문구의 기준은 §6·§C이고, 그 둘과는 38/38로 맞는다.

**다음 기획 손질 항목 (P3-2, 배포 뒤 기획자 오더)**
1. `planning/terms-page-copy.md` 한국어 문안·English copy 본문의 옛 문장 4개(#1·#5 / #2·#6)를 개정 문구로 바꾼다. #7·#8 덧붙임과 #9 개정일 줄도 본문에 넣는다. 그다음 §C를 §A·§B 방식(개정 기록)으로 바꾼다. 리뷰 27 재현 도구가 정방향 29/29(또는 새 문장 수 기준 전부 일치)로 돌아오는지 확인한다.
2. 아포스트로피 표기 규칙을 문서에 적는다. "표의 곧은 `'`는 `&rsquo;`를 뜻한다. 예외는 `SITE_EN.aboutIntro`를 그대로 인용하는 곳뿐이다"(P3-1 근거).
3. (2를 정한 뒤) 다음 약관 문구 손질 오더에 #6 `article&apos;s` → `article&rsquo;s` 1자 되돌리기를 넣는다. 그 오더가 약관 문구를 바꾸면 `termsLastUpdated`도 함께 갱신한다.

## 6. 결함 목록

| 등급 | # | 내용 | 조치 |
|---|---|---|---|
| P1 | — | 없음 | — |
| P2 | — | 없음 | — |
| P3 | 1 | #6 `article’s`가 `article's`로 1자 바뀌어 `/en/terms` 아포스트로피가 섞였다(`’` 13 · `'` 2, 그중 #8 인용은 정당한 예외) | §5 손질 ②·③. 커밋 비차단 |
| P3 | 2 | `terms-page-copy.md` 본문이 개정 전 문장이다(리뷰 27 재현 MISS ko 2·en 2) | §5 손질 ①. 배포 뒤 |
| P3 | 3 | `termsLastUpdated`는 배포일 전제다. 검증 도구 2종(`copy-exact-check.py`, `a11y-e2e.mjs`)에도 `2026-11-09`가 고정값으로 들어 있다 | 배포가 11/10 이후면 상수와 두 도구 기대값을 함께 고친다. 다음 손질 때 도구가 상수를 읽게 바꾸기를 권한다(선택) |

## 7. 커밋 대상 경로 (최종)
- `src/app/(ko)/terms/page.tsx`
- `src/app/(en)/en/terms/page.tsx`
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `src/lib/config.ts`
- `docs/tools/programmer-12/`(README·도구·출력·`screens/` 18장)
- `docs/handoffs/programmer-12-terms-about-copy-sync.md`
- `docs/triggers/programmer-12-terms-about-copy-sync-COMPLETE.md`
- `instructions/programmer/processed/12-terms-about-copy-sync.md`
- `docs/reviews/programmer-12-terms-about-copy-sync-review.md`(이 문서)
- `docs/tools/reviewer-28/`(`independent-check.py`·`-output.txt`, `rerun-*.txt` 5종)
- `docs/triggers/reviewer-28-programmer-12-terms-about-copy-review-COMPLETE.md`
- `instructions/reviewer/processed/28-programmer-12-terms-about-copy-review.md`
- `history/2026-11-09.md`

⚠️ 작업 트리에는 이 묶음과 상관없는 변경도 있다. 수정된 `history/2026-10-01.md`·`history/2026-11-05.md`, 추적 안 된 tester-01·planner-07 산출물, 10~11월 history 여러 파일이다. 이 묶음 커밋에는 넣지 않는다. 경로를 하나씩 지정해 스테이징한다.

## 8. 도구·재현
```bash
python3 docs/tools/programmer-12/copy-exact-check.py      # 38/38
python3 docs/tools/reviewer-28/independent-check.py        # 38/38 + 아포스트로피·JSON-LD·diff 조각 출력
node docs/tools/programmer-12/og-description-count.mjs     # 0/207 · 0/207
sh docs/tools/programmer-12/word-grep.sh                   # 50줄 0
python3 docs/tools/reviewer-27/terms-copy-reproduce.py     # ko 27/29 · en 27/29 (P3-2)
npm run typecheck && npm run lint                          # exit 0 · 0 errors 4 warnings
```
(모두 저장소 루트에서 실행한다. 빌드된 `.next`가 필요하다. 이 리뷰에서는 빌드하지 않았다.)
