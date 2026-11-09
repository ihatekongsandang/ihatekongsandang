# 프로그래머 세션 — 14-1-review-31-fixes 핸드오프
**작성일**: 2026-11-09 15:59 | **작성 세션**: 프로그래머 (Opus 5.5 — 실행 모델 ID `claude-opus-5-5`)

## 요약 (3줄)
1. 🔴 P1-1: 상세 보조 열을 sticky로 두지 않게 바꿨다. 보조 열 높이를 828건 전수로 재 보니 최대 1,672px였다. "충분한 화면 높이" 기준(1,776px 이상)은 실제 화면에 거의 없어서 sticky를 빼는 쪽을 택했다. 리뷰어 `probe-sticky`(대진연 게시물 + 가장 긴 게시물) 5개 크기와 `focus-full` 5,402정지점 모두 화면 밖 포커스 0이다.
2. P3-1 포털 4종 추가, P3-2 news `src` 로컬·사설 IP·문서 주소 거부, P3-3 미래 확인일 거부, P3-4 JSDoc 위치, P3-7 `aria-disabled` 제거, P3-9 grep 스크립트 패턴 조합화를 처리했다. 새 규칙 테스트는 64/64이고, 양성 대조로 6건 FAIL을 검출했다.
3. 회귀는 모두 통과했다: 수치 16항목 미달 0(14와 같음), GA 더미 빌드 a11y-e2e 184/184(GA share 4 포함), 13 도구 104·22·52·10, copy-exact 38, 글자 4/4, seo 799/799, 전체 lint 0 errors, `--worktree` 게이트 통과. 마지막 빌드는 일반 빌드다.

## 수정 전 → 후
| # | 파일 | 전 | 후 |
|---|---|---|---|
| P1-1 | `src/components/post-detail.tsx` aside | `lg:sticky lg:top-[calc(var(--header-h)+24px)]` | sticky 제거. 1024 이상에서 오른쪽 열 자리는 그대로이고 문서와 함께 스크롤된다. 주석에 실측 근거 |
| P3-1 | `src/lib/content/schema.ts` `PORTAL_HOSTS` | 9개 | + `naver.me`·`news.kakao.com`·`news.google.com`·`msn.com`(13개). `kakao.com`·`google.com` 전체는 막지 않는다 |
| P3-2 | 같은 파일 `unusableNewsImageReason` 신설 | news `src`에 localhost·사설 IP·`.html` 통과 | 거부: `localhost`·`*.localhost`·`*.local`·`*.internal`, IPv4 10/8·127/8·0/8·169.254/16·172.16/12·192.168/16, IPv6 `::1`·`::`·fc00::/7·fe80::/10, 경로 끝 `.html`·`.htm`·`.php`·`.asp(x)`·`.jsp`. 이미지인지 최종 확인은 `check:hotlinks`의 content-type 검사가 맡는다(이미 있음) |
| P3-3 | 같은 파일 `retrievedAt` | 미래 통과 | 오늘(서울) 이후면 **오류**. `ValidateOptions.today`로 테스트에서 고정 가능 |
| P3-4 | `src/lib/content/translation.ts` | `localizePost` JSDoc이 `withoutCaption` 위 | `localizePost` 바로 위로 |
| P3-7 | `src/components/pagination.tsx` | 비활성 `<span aria-disabled="true">` 2곳 | 속성 제거(sr-only "이전/다음 페이지 없음"은 그대로), 주석 갱신 |
| P3-9 | `docs/tools/programmer-13·14/word-grep.sh` | 홈 경로 패턴 문자열을 직접 씀 | 글자를 나눠 조합(`HOMEPAT`) + 조합 문자열 양성 대조 줄. 함께 `docs/handoffs/programmer-02-review-fixes.md`의 마스킹된 홈 경로 표기 1곳을 `$HOME/…`으로 정리 |
| (도구) | `docs/tools/programmer-13/hotlink-cases.mjs` + 신규 `dns-map-test.mjs` | 로컬 https 서버를 `127.0.0.1` IP로 가리킴 → P3-2 뒤 7/10 FAIL | 예약 테스트 도메인 `img.example.test` + 테스트 실행에만 붙는 DNS 프리로드(`NODE_OPTIONS=--import`)로 127.0.0.1을 가리킴 → 10/10. 운영 스크립트는 그대로 |

## 주요 결정사항
1. **P1-1을 sticky 제거로 고쳤다(리뷰 권장안 대신 대안).** 근거는 `aside-height-all.json`에 있다.
   - 높이: 1024 ko 최대 1,672px, 중앙값 814px, 90% 1,092px, 800px 초과 109/207.
   - 기준값: 권장안의 기준값은 "보조 열 최대 + 헤더 56 + 위 24 + 아래 24" = 1,776px 이상이다. 이 화면 높이는 실제 기기에 거의 없다.
   - 기준을 낮추면: 그보다 긴 열의 게시물(출처가 많은 글)이 다시 위반한다. 새 게시물에 출처가 늘면 또 바뀐다.
   - `max-h`+`overflow-y` 안은 리뷰가 권하지 않았다(중첩 스크롤).
   - 그래서 sticky를 빼는 것이 콘텐츠가 늘어도 깨지지 않는 유일한 CSS 해법이라고 판단했다. 디자인 측면에서 1024 이상 긴 글은 본문 옆 보조 열 아래가 비게 된다. 디자이너 확인 대상이다.
2. **P3-3은 경고가 아니라 오류로 했다.** 오더 문언("거부")을 따랐다. 리뷰는 경고를 권했다. 확인일은 업로더가 오늘 이전 날짜로 적는 값이라 미래 값은 오타뿐이다.
3. **P3-2 사설 IP는 news `src`에만** 적용했다. public은 저장소 경로라 해당이 없다. 공인 IP 주소는 막지 않았다(드물고 막을 근거가 없음).
4. **확장 grep 잔여 5건**: 오더 파일 자체 1건(패턴을 적은 문서)과 일반 낱말 "홍보(물)" 오탐 4건이다(content 3·history 1). content는 수정 금지이고 history는 슈퍼바이저 영역이라 손대지 않았다. 코드·도구·핸드오프는 0이다. 슈퍼바이저 확장 grep에서 이 낱말을 예외 처리할지 정해야 한다.

## 미해결·이슈
- 결정 1의 디자인 영향(긴 글 1024 이상에서 보조 열이 끝까지 따라오지 않음)은 디자이너 확인 대상이다.
- P3-5·6·8(용어·안내문 "썸네일"·이동 경로 간격)은 오더대로 손대지 않았다(기획·디자인).
- 실기기 safe-area와 스크린리더 낭독은 여전히 미측정이다(14와 같음).

## 다음 세션 가이드
- **리뷰어**: P1-1 재확인. `probe-sticky`·`focus-full`은 `.next`가 일반 빌드라 그대로 띄우면 된다. a11y-e2e GA 4건은 GA 더미 빌드가 필요하다(이 세션 결과: 184/184). 결정 1·2·4를 판정한다.
- **슈퍼바이저**: 리뷰 통과 후 트리거의 13+14+14-1 합본 경로를 커밋한다. 확장 grep 오탐(결정 4) 처리를 정한다.

## 참고 링크
- 오더 `instructions/programmer/processed/14-1-review-31-fixes.md`
- 리뷰 `docs/reviews/programmer-13-14-image-responsive-review.md` · 도구 `docs/tools/reviewer-31/`
- 도구 `docs/tools/programmer-14-1/README.md`
