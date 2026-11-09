# 리뷰 31-1 — 프로그래머 14-1(리뷰 31 수정) 재확인

**작성일**: 2026-11-09 16:22 | **작성 세션**: 리뷰어 (Opus 5.5 · 모델 ID `claude-opus-5-5`) | **오더**: `instructions/reviewer/processed/31-1-programmer-14-1-recheck.md` | **도구**: `docs/tools/reviewer-31-1/`

## 0. 판정

**승인 — 커밋 조건 1건.** P1 0 · P2 1(커밋 조건, 코드 아님) · P3 1(새 관찰, 차단 아님).
- 🔴 리뷰 31 P1-1은 해소됐다. sticky 제거 판단을 승인한다(§1).
- P3-1·2·3·4·7·9 수정을 확인했다. P3-3을 오류로 처리한 것과 13 핫링크 테스트 도메인 변경도 승인한다(§2).
- 회귀는 0이다(§3).
- **P2-1 (커밋 조건)**: 커밋 대상인 `instructions/programmer/processed/14-1-review-31-fixes.md` 25행에 확장 grep 패턴이 글자 그대로 들어 있다. 그 안에 홈 경로 접두어와 계정명이 있다. pre-commit 훅에는 걸리지 않는다. 그러나 저장소 독립 원칙(홈 디렉터리명 금지) 위반이다. 슈퍼바이저가 그 줄을 패턴 없이 다시 쓴 뒤 커밋해야 한다(슈퍼바이저 영역 파일이다). 나머지 경로는 바로 커밋할 수 있다.

## 1. P1-1 재현 (빌드 없이 기존 `.next` + `next start -p 3932`)

- `.next/BUILD_ID`는 15:58:13에 만들어졌다. 그 뒤 수정된 src·scripts·content·public·package.json·eslint·next.config 파일은 0개다(`find -newer`). 빌드 HTML에 GA 스크립트는 0건이다(일반 빌드). 끝난 뒤 3932 포트 리슨 0, 서버·헤드리스 Chrome 프로세스 0을 확인했다.
- 소스: `post-detail.tsx` aside 클래스에 `sticky`가 없다. src 전체에서 sticky는 `site-header.tsx` 헤더 1곳뿐이다.

| 검사 | 수정 전(리뷰 31) | 재확인 |
|---|---|---|
| `probe-sticky.mjs`(대진연 게시물) 1024×768·1024×600·1280×800·1280×600·1440×900 | 화면 밖 7·8·5·8·0 | **0·0·0·0·0**. 출력이 프로그래머 출력과 글자 단위로 같다 |
| `probe-sticky-longest.mjs`(보조 열 최장 1,672px 게시물) 5개 크기 | — | **0×5** |
| `focus-full.mjs` 9화면 × 5폭 × 앞/뒤 | 90조합·5,402정지점·화면 밖 3 | **90조합·5,402정지점·화면 밖 0**. 완전 가림 90은 모두 건너뛰기 링크다("본문으로 건너뛰기"/"Skip to main content" 2종만, 리뷰 31에서 오탐 확인). 일부 가림 16(AAA 참고). 합계가 프로그래머와 같다 |
| **추가: `aside-focus-all.mjs`(전수)** — ko 207 + en 207 = 414쪽 × 1024×600·1280×600, 보조 열 안 a·button 전부에 focus() | — | **414쪽 × 2크기, 요소 3,234개 × 2 = 6,468건 중 헤더 아래~화면 아래를 벗어난 것 0**. 보조 열 position 비고정(static/relative) 414/414 |
| **추가: 최장 게시물 Tab 완주** | — | `probe-sticky`는 Tab 40회 한도라 보조 열을 끝까지 돈다는 보장이 없다. 그래서 보조 열을 빠져나갈 때까지 Tab을 눌렀다. 5개 크기 모두 **보조 열 요소 17/17 방문, 화면 밖 0** |

**sticky 제거 판단(핸드오프 결정 1) — 승인.**
- 근거 수치를 직접 다시 쟀다. `aside-focus-all`에서 최장 보조 열은 1,672px(1024 ko, `2026-08-29-idontknowpolitics-martial-law-nk-policy`)이다. 프로그래머 `aside-height-all.json`과 같다.
- 리뷰 31 권장안(화면 높이 조건 sticky)의 기준은 1,672 + 헤더 56 + 여백 48 = 1,776px 이상이다. 1024~1439px 폭의 노트북·태블릿 가로 화면 중 이 높이는 사실상 없다. 그러니 조건을 걸어도 거의 켜지지 않는다. 기준을 낮추면 긴 열 게시물이 다시 위반한다. 출처가 늘면 기준도 다시 바뀐다.
- 리뷰 31이 "또는 sticky를 뺀다"로 허용한 대안이다. 콘텐츠가 늘어도 깨지지 않는 유일한 CSS 해법이라는 판단이 맞다.
- 디자인 영향: 1024 이상에서 긴 글을 읽을 때 보조 열 아래가 빈다. 접근성 결함은 아니다. 디자이너 확인 대상으로만 남긴다(차단 아님).

## 2. P3 수정 검증

| # | 확인 | 판정 |
|---|---|---|
| P3-1 | `PORTAL_HOSTS` 13개. `naver.me`·`news.kakao.com`·`news.google.com`·`msn.com`이 들어갔다. `kakao.com`·`google.com` 전체는 막지 않는다. 하위 도메인 판정식은 그대로다 | ✅ |
| P3-2 | `unusableNewsImageReason`: localhost·`.localhost`·`.local`·`.internal`, IPv4 10/8·127/8·0/8·169.254/16·172.16/12·192.168/16, IPv6 `::1`·`::`·fc00::/7·fe80::/10, 문서 확장자 경로를 거부한다. news `src`에만 적용된다. 정규식 경계(fc00::/7은 첫 16비트 `fcXX`/`fdXX`만, `fe8~feb`)를 손으로 확인했다 | ✅ (새 관찰 P3-N1) |
| P3-3 | `retrievedAt > 오늘(서울)`이면 오류다. `ValidateOptions.today`로 고정할 수 있다 | ✅ 아래 판정 |
| P3-4 | `localizePost` JSDoc이 함수 바로 위에 있다. `withoutCaption`은 자기 한 줄 주석을 가진다 | ✅ |
| P3-7 | `pagination.tsx`에 `aria-disabled` 0. 비활성 span의 sr-only "이전/다음 페이지 없음"은 유지된다 | ✅ |
| P3-9 | 13·14 `word-grep.sh`가 패턴을 조합하고 양성 대조 줄을 가진다. 재실행 출력이 저장된 출력과 같다(diff 0). 홈 절대경로 합계 0, 양성 대조 1·1 | ✅ |
| 테스트 | 14-1 단위 **64/64**(종료 0) · 13 단위 **104/104** · 05 **53/53** · 06 **35/35** · 콘텐츠 검증 **207 통과**(self 207·public 0·news 0, 영어본 207/207) | ✅ |

**P3-3 "오류로 막기" — 승인.**
- 리뷰 31은 경고를 권했다. 그러나 오더 문언이 "거부"였다.
- 판정 근거:
  - 확인일은 시간이 지나면 과거가 될 뿐 미래가 되지 않는다. 오늘 통과한 게시물이 나중 빌드에서 깨질 수 없다.
  - 서울 기준(`Intl` Asia/Seoul)이라 UTC 빌드 서버에서도 날짜가 하루 밀리지 않는다.
  - 미래 값은 오타뿐이고, 오류 문구가 고칠 방법을 알려 준다.
  - 그래서 회귀 위험 없이 더 안전하다.

**13 핫링크 테스트 도메인 변경 — 승인.**
- `hotlink-cases.mjs`가 로컬 https 서버를 `img.example.test`(RFC 2606 예약 `.test`)로 가리킨다. `dns-map-test.mjs` 프리로드가 이 이름만 127.0.0.1로 풀고, 다른 이름은 원래 조회로 넘긴다.
- 프리로드는 테스트 자식 프로세스의 `NODE_OPTIONS`에만 붙는다. 운영 `scripts/check-hotlinks.ts`는 14-1에서 바뀌지 않았다.
- P3-2 거부 규칙을 우회하는 것이 아니다. 검증 규칙이 실제 업로드에 적용되는 경로는 그대로다. 테스트만 공인 도메인 형태 이름을 쓴다.
- 재실행 결과 **10/10**, 종료 0이다. 출력에 임시 경로는 0건이다.

## 3. 회귀 (일반 빌드 기준)

| 항목 | 프로그래머 14-1 | 재현 |
|---|---|---|
| 수치 16항목(42조합·리플로우 66) | 미달 0 | **미달 0**. `compare-output.md`가 programmer-14·14-1 출력과 diff 0. 외부 요청 0 |
| a11y-e2e | 184/184(GA 더미 빌드) | **180/184**. FAIL 4는 모두 GA share 이벤트(ko/en × copy_link·x/threads)다. 이 `.next`는 측정 ID 없는 일반 빌드이기 때문이다. PASS·FAIL을 뺀 라벨 184줄이 프로그래머 출력과 같고, PASS/FAIL 포함 줄이 리뷰 31 출력과 같다 |
| GA 4건 | — | 프로그래머 `a11y-e2e-output.txt`에서 4건 모두 PASS인 것을 확인했다(오더 지시대로 기록 확인). 14-1 이후 `share-buttons.tsx`·`analytics.ts`는 바뀌지 않았다(리뷰 31 이후 바뀐 src 4개는 post-detail·pagination·schema·translation) |
| copy-exact | 38/38 | **38/38**, 출력 diff 0 |
| typecheck | 0 | **exit 0** |
| 전체 lint | 0 errors | **0 errors, 16 warnings**(모두 기존 `docs/tools` 도구) |
| 재현하지 않은 것(빌드 필요) | 픽스처 빌드 22·브라우저 52·seo-parity 799·게이트 | 프로그래머 기록만 확인했다 |

## 4. 확장 grep 잔여 판정

저장소 전체(node_modules·.next·.git 제외)에 확장 패턴을 돌렸다. 패턴은 이 문서에 쓰지 않는다. 결과는 5개 파일로, 프로그래머 보고와 같다. 이 리뷰 산출물은 0건으로 정리한 뒤 다시 쟀다(§6).

| 파일 | 걸린 것 | 판정 |
|---|---|---|
| `instructions/programmer/processed/14-1-review-31-fixes.md` 25행 | 확장 grep 패턴 문자열(홈 경로 접두어·계정명·다른 서비스 낱말 포함) | **오탐 아님 → P2-1, 커밋 조건.** 커밋 대상인데 계정명이 글자 그대로 들어 있다. 훅 패턴은 홈 경로와 계정명이 붙은 형태만 잡아서 통과한다. 그래도 원칙상 금지다. 슈퍼바이저가 해당 줄을 "슈퍼바이저 확장 grep 0건" 같은 표현으로 바꾼 뒤 커밋할 것 |
| `content/posts/2026-10-14-gotdemcatch-safety-drill-poster-insignia.md` | 일반 낱말 "홍보(물)" 10곳 | 오탐. 이미 커밋된 파일이고 이번 변경도 없다. 커밋 대상 아님 → 차단 아님 |
| `content/posts/2026-10-01-ntdkorea-jeju-falungong-rally-chinese.md` | "홍보(물)" 1곳 | 같음 |
| `content/posts/2026-09-29-2pro-prosecution-sign-removal-cost.md` | "홍보(물)" 1곳 | 같음 |
| `history/2026-10-15.md` | "홍보(물)" 1곳 | 오탐. 추적되지 않는 파일이고 이번 커밋 대상 아님 → 차단 아님. 나중에 커밋할 때도 오탐이다 |

- 오탐 4건은 모두 바로 앞 글자가 "홍"이었다(전수 확인).
- 권고: 슈퍼바이저 확장 grep에서 "홍"이 바로 앞에 붙은 경우만 빼라(뒤 낱말 단위 예외). 이렇게 하면 다른 서비스명 검출력은 그대로다.

## 5. 결함·관찰

- **P2-1 (커밋 조건)**: §4 첫 행.
- **P3-N1 (새 관찰, 차단 아님)**: P3-2 거부 목록에서 빠진 형태가 있다.
  - IPv4 매핑 IPv6(`[::ffff:7f00:1]` 형태, URL 파서가 이렇게 정규화한다)
  - CGNAT 100.64/10
  - 업로더 실수 방지가 목적이고 최종 확인은 `check:hotlinks`의 content-type 검사가 맡는다. 그래서 차단하지 않는다. 다음 스키마 작업 때 함께 넣을 것을 권한다.
- 도구 메모:
  - `probe-sticky` 계열은 Tab 40회 한도라 보조 열 전 요소 방문이 보장되지 않는다. 이번에는 `aside-focus-all.mjs`로 보완했다.
  - programmer-14·14-1 `compare.mjs`는 아직 커밋되지 않은 `docs/tools/designer-05/measure-output-final.json`을 읽는다. 깨끗한 복제본에서 이 도구를 다시 돌리려면 디자이너 05 산출물도 커밋돼야 한다. 빌드와는 무관하다.
- 범위 밖: 디자이너 03~05·기획자 13·14·리뷰 30·테스터 01 산출물과 `planning/card-image-policy.md`도 아직 커밋되지 않았다. 이번 범위가 아니라서 목록에 넣지 않았다. 슈퍼바이저가 따로 판단할 것.

## 6. 저장소 독립

- 이 리뷰 도구 폴더에서 걸린 2개를 고쳤고, 그 뒤 확장 패턴 0건이다.
  - eslint 출력의 절대경로는 지웠다.
  - focus-full 출력의 게시물 제목 3곳은 리뷰 31과 같은 방식으로 괄호 처리했다.
- 이 리뷰 문서와 트리거도 0건이다(마무리 grep).

## 7. 커밋 대상 경로 최종 목록 (13 + 14 + 14-1 + 리뷰 31·31-1)

전체 목록은 `docs/tools/reviewer-31-1/commit-targets.txt`(50행)에 있다. 존재 확인 결과 누락은 0이다(이 리뷰 산출물 3개는 작성 후 생김).
- **코드**:
  - `src/lib/content/schema.ts` · `src/lib/content/translation.ts` · `src/lib/i18n.ts` · `src/lib/floating-banner.ts` · `src/app/globals.css`
  - `src/components/{site-header,english-site-heading,page-frame,site-footer,floating-banner,feed-view,tag-nav,post-grid,post-card,card-media,pagination,post-detail,share-buttons,source-list}.tsx`
  - `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` · `src/app/(ko)/terms/page.tsx` · `src/app/(en)/en/terms/page.tsx` · `src/app/(ko)/tags/page.tsx`
  - `scripts/check-hotlinks.ts`(신규) · `scripts/validate-content.ts` · `package.json` · `eslint.config.mjs`
- **도구**: `docs/tools/programmer-13/` · `docs/tools/programmer-14/` · `docs/tools/programmer-14-1/` · `docs/tools/reviewer-31/` · `docs/tools/reviewer-31-1/`
- **핸드오프·트리거**:
  - 핸드오프: `docs/handoffs/programmer-02-review-fixes.md`(홈 경로 표기 1줄) · `docs/handoffs/programmer-13-card-image-schema-credit.md` · `docs/handoffs/programmer-14-responsive-redesign-implement.md` · `docs/handoffs/programmer-14-1-review-31-fixes.md`
  - 트리거: `docs/triggers/programmer-13-card-image-schema-credit-COMPLETE.md` · `docs/triggers/programmer-14-responsive-redesign-implement-COMPLETE.md` · `docs/triggers/programmer-14-1-review-31-fixes-COMPLETE.md`
- **오더**:
  - `instructions/programmer/processed/13-card-image-schema-credit.md` · `instructions/programmer/processed/14-responsive-redesign-implement.md`
  - `instructions/programmer/processed/14-1-review-31-fixes.md` — 🔴 P2-1을 고친 뒤에만 커밋
- **리뷰 31**: `docs/reviews/programmer-13-14-image-responsive-review.md` · `docs/triggers/reviewer-31-programmer-13-14-image-responsive-review-COMPLETE.md` · `instructions/reviewer/processed/31-programmer-13-14-image-responsive-review.md`
- **리뷰 31-1**: `docs/reviews/programmer-14-1-review-31-recheck.md` · `docs/triggers/reviewer-31-1-programmer-14-1-recheck-COMPLETE.md` · `instructions/reviewer/processed/31-1-programmer-14-1-recheck.md`
- `history/2026-11-09.md`
- 넣지 않는 것: 수정된 `history/2026-10-01.md`·`history/2026-11-05.md`와 추적되지 않는 다른 history 파일. 13·14 범위가 아니다. 슈퍼바이저 영역이라 따로 판단할 것.

## 8. 사용자 결정 필요
- 없음.
