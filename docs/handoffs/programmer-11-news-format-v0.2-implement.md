# 프로그래머 세션 — 11-news-format-v0.2-implement 핸드오프
**작성일**: 2026-11-09 06:50 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
- v0.2 뉴스형 전환 7개 임무를 모두 구현했다: 연락처 "준비 중" 교체, D1 소개 문구, 공유 버튼(링크 복사·X·스레드), `/terms`·`/en/terms`, 카드 갱신 7일 표시, D6 grep, 검증.
- 리뷰 25 P2-1·P2-2(평문·sr-only)를 시안보다 먼저 반영했고, P3-1·2·3·5·6·9·10도 반영했다.
- 결과: build(검증 412건, 정적 페이지 799) · typecheck · lint(0 errors) · 깨끗한 복제본 게이트(--worktree) 통과. 실측 도구 3종: 34/34 · 412제목 FAIL 0 · 172/172.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/lib/config.ts` | `SITE.description` = D1 전문(126자). `SITE_EN.description`(157자) + `SITE_EN.aboutIntro`(D1 영어 전문) 신설. `contactEmail: null` |
| `src/lib/i18n.ts` | 공유 8키·`footerTermsLink`·`renewedSr`, `termsPath()`, `formatShortUpdated()` |
| `src/lib/share.ts` (신규) | X 가중치 계산·제목 자르기, intent URL 2종 |
| `src/lib/content/renewal.ts` (신규) | Asia/Seoul 날짜, 경과일, 0~6일 판정 |
| `src/lib/content/view.ts` | `PostCardView.updatedAt`(표시 대상만), `toCardView(…, today)` |
| `src/components/share-buttons.tsx` (신규) | 공유 버튼 클라이언트 컴포넌트 |
| `src/components/page-section.tsx` (신규) | 소개·약관 공용 `PageSection`, `ContactPendingNotice` |
| `src/components/post-detail.tsx` | header 뒤에 `ShareButtons` |
| `src/components/post-card.tsx` | CardFooter에 갱신 평문 + sr-only |
| `src/components/site-footer.tsx` | "· 이용약관"/"· Terms" 링크 |
| `src/lib/analytics.ts` | `GA_EVENTS.share` |
| `src/lib/seo.ts` | `termsJsonLd()`(WebPage) |
| `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx` | 준비 중 상자, 정정·삭제 절 끝에 약관 링크, 영어 헤더는 `aboutIntro`, 중복 `Section` 정의를 `PageSection`으로 교체 |
| `src/app/(ko)/terms/page.tsx`, `src/app/(en)/en/terms/page.tsx` (신규) | 약관 6절, 메타·canonical·hreflang·JSON-LD |
| `src/app/sitemap.ts` | `/terms`·`/en/terms`(짝 hreflang) |
| `src/app/llms.txt/route.ts` | 주요 페이지 목록에 약관 1줄 |
| `docs/tools/programmer-11/` | 검증 도구·결과·화면 18장·빌드/게이트 로그(README 참조) |

## 주요 결정사항 (자체 판단 + 근거)
1. **영어 D1 문구는 프로그래머가 번역했다.** 오더는 "시안 03 §1.2의 영어 번역"을 쓰라고 했다. 그런데 시안 03 §1.2에는 위치만 있고 영어 문구가 없다(리뷰 25 §2 2.1-2도 "영어 문구 없음"으로 확인). 그래서 scope 2.1-2("디자이너/프로그래머가 한국어 확정문을 직접 번역")에 따라 직접 옮겼다. 의미가 같은지는 리뷰어가 게이트한다.
   - 전문(`aboutIntro`, `/en/about` 헤더): 문장 3개를 모두 옮겼다. "registered"는 출처 매체에만 걸리게 괄호 안에 두었다(scope 2.1-4).
   - 영어 전문은 160자를 넘는다. 그래서 meta용 `SITE_EN.description`은 같은 취지로 줄인 157자 문장을 따로 두었다. 한국어는 D1 전문이 126자라 meta와 본문에 같은 값을 쓴다.
2. **`SITE.description` 교체의 영향 범위.** 이 값은 `/about` 헤더 외에도 홈·피드 머리 문단(`lead`), meta description, OG, WebSite JSON-LD, llms.txt에 쓰인다. 시안 03 §1.1("`SITE.description` 교체로 충분")을 따라 이곳 모두가 D1로 바뀐다.
3. **약관 문안 처리.** `terms-page-copy.md` 원문을 그대로 옮겼다. 다만 작성 이력 메모와 기획 메모는 화면 문구가 아니어서 뺐다.
   - 뺀 것: "(09-1 수정 — 리뷰 24 …)", "(Added/Fixed 09-1 …)", §4의 "🔴 연락 경로: 사용자 결정 필요 (현재 /about 이메일은…)" 인용 상자.
   - §4 자리에는 시안 02 §3.1대로 준비 중 상자와 "아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다."를 넣었다.
   - 문안 밖 문장 4개는 리뷰어 확인이 필요하다: 영어 머리 소개문, 영어 "The handling standards below apply once the contact channel is finalized.", 약관 페이지 한국어 머리 소개문(시안 02 §2), 소개 페이지의 약관 링크 문장(ko/en).
4. **공유 URL.** `NEXT_PUBLIC_SITE_URL`이 있으면 그 절대 URL을 쓴다. 서버 렌더와 같은 값이라 canonical과 일치하고 하이드레이션 불일치가 없다. 값이 없으면 마운트 뒤 `window.location.origin`을 쓴다(P3-3). 실측에서 클립보드 값과 canonical href가 일치했다.
5. **X 제목 자르기(P3-2).** twitter-text 기본 가중치를 쓴다(리뷰 25 도구와 같은 규칙). 제목이 256(= 280 − 공백 1 − t.co 23)을 넘으면 마지막 공백까지 물러나 "…"를 붙인다. 이 규칙은 영어·한국어 공통으로 적용되며, 실제로 잘리는 것은 영어 24건뿐이다. 스레드는 최대 404자라 자르지 않는다(한도 500).
6. **GA 이벤트 이름.** GA4 추천 이벤트 `share`의 `method`·`content_type: 'post'`·`item_id`를 쓴다. 영어 상세는 기존 카드 이벤트처럼 `language: 'en'`을 더한다.
7. **갱신 판정(A안).** `toCardView`가 실행될 때, 즉 정적 생성 시점에 판정한다. Asia/Seoul은 UTC+9 고정 오프셋으로 계산한다(1988년 이후 서머타임 없음). 그래서 빌드 서버의 TZ·ICU와 무관하며, `TZ` 4종에서 실측으로 확인했다. 카드에는 표시 대상일 때만 `updatedAt`을 싣는다(데이터 최소화).
8. **소개 "운영 방식" 첫 `<li>`는 남겼다.** 시안 03은 지우라고 권고했다. 그런데 D1에는 소재(정책 비판·정치인 발언 등)가 없고, 이 항목이 그것을 전하는 유일한 문장이라 중복이 아니라고 판단했다.

## 미해결·이슈
1. 🟠 **소개 페이지와 약관 페이지의 문구가 서로 어긋난다.** 둘 다 공개 상태라 독자에게 그대로 보인다. 문안은 기획 영역이라 이번 오더에서 고치지 않았다.
   - 개인정보: 소개(ko)는 "방문자에게서 개인정보를 수집하지 않습니다"라고 쓴다. 약관 §5는 "방문 통계는 GA4로 집계"라고 쓴다.
   - 매체 등록: 소개(ko) 출처 정책은 "「신문법」에 따라 등록된 신문·인터넷신문, 뉴스통신사, 방송사업자"라고 쓴다. 이는 리뷰 24 P3-1이 오기로 정정한 표현이고, 약관 §3은 정정된 표현을 쓴다.
2. 🟡 약관 §5는 "위 4항의 연락 경로"라고 쓰는데, 화면의 절 제목에는 번호가 없다. 문안을 그대로 옮긴 결과다. 문안이나 화면 중 어느 쪽을 맞출지 기획자·디자이너 판단이 필요하다.
3. 🟡 X 제목을 자르면 인용부호가 닫히지 않은 채 "…"로 끝나는 경우가 있다(예: `'jailed for…`). 작성창에서 사용자가 고칠 수 있고 원문 링크도 함께 간다. 그래도 편집 정책상 괜찮은지 리뷰어 판단이 필요하다. 대안은 해당 24건만 제목 없이 url만 넘기는 것이다.
4. 🟡 사진형 상세는 실측하지 못했다. 현재 photo·photo_text 게시물이 0건이다.
5. 참고: lint 경고 3건은 기존 `docs/tools/reviewer-04`·`reviewer-10` 파일의 것이다(이번 변경과 무관, 0 errors).
6. 참고: 게이트는 `--staged`가 아니라 `--worktree`로 돌렸다(git add 금지). 작업 트리에 있던 다른 세션의 미추적·미스테이징 파일(planner-07·tester-01·history·user-tasks)도 포함한 상태에서 통과했다. 커밋 때는 슈퍼바이저가 `--staged`로 다시 돌려야 한다.
7. 참고: PRD §0.5·§11, scope 2.2-3·2.4·§4의 4c·5a 미반영(리뷰 25 P3-11)은 다음 기획 손질 때 처리한다.

## 다음 세션 가이드
- **리뷰어(Opus 5.5)**: 아래 순서로 확인한다.
  1. 결정 1(영어 D1 의미 동등)과 결정 3의 문안 밖 문장 4개를 게이트한다.
  2. 미해결 1~3을 판정한다.
  3. 리뷰 25 반영 표(트리거)를 대조한다.
  4. `node docs/tools/programmer-11/a11y-e2e.mjs`를 재실행한다(README에 실행법).
- **슈퍼바이저**: 커밋 전 `clean-clone-gate.sh --staged`를 실행한다. 커밋 대상은 트리거의 경로 목록을 따른다. 미해결 1은 기획자 오더로 보낸다.

## 참고 링크
- 오더 `instructions/programmer/processed/11-news-format-v0.2-implement.md`
- 리뷰 25 `docs/reviews/designer-02-news-format-v0.2-share-terms-review.md`, 시안 `design/news-format-v0.2/`
- 검증 `docs/tools/programmer-11/README.md`
