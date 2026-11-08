# ✅ COMPLETE — 리뷰어 (Opus 5.5) · 26-programmer-11-news-format-v0.2-review
**완료**: 2026-11-09 07:35 | 리뷰: `docs/reviews/programmer-11-news-format-v0.2-implement-review.md` | 도구: `docs/tools/reviewer-26/`
대상 코드·문서 수정 0 · git 쓰기 0 · 의존성 설치 0. 빌드·`next start`는 이 세션만 했고, 끝에 기본 빌드(799/799)로 `.next`를 되돌렸다. 서버 잔존 0.

## 판정
🟠 **조건부 승인** — P2 4건(전부 배포 차단)을 고친 뒤 커밋한다. 셋은 문구 교체, 하나는 함수 분기 변경이다.

## 재실측 숫자
- `renewal-check.ts` 34/34(출력 바이트 동일) · `share-check.ts` FAIL 0, 잘림 en 24 = 리뷰 25 목록(id·가중치 일치)
- `a11y-e2e.mjs` **172/172**(172개 라벨 전부 일치) · 🆕 대체값(`NEXT_PUBLIC_SITE_URL` 없음) 8/8
- build 검증 412 · 정적 799/799 · D6 9종 0 · 저장소 독립 위반 0

## 결함
### 🟠 P2 — 배포 차단
| # | 위치 | 내용 |
|---|---|---|
| P2-1 | `src/app/(ko)/about/page.tsx` 운영 방식 셋째 항목 | "방문자에게서 개인정보를 수집하지 않습니다" ↔ 라이브 GA 작동(curl 확인)·약관 §5 "GA4로 집계" |
| P2-2 | 같은 파일 출처 정책 둘째 항목 | 리뷰 24 P3-1이 오기로 정정한 매체 등록 표현 그대로 ↔ 약관 §3 정정본 |
| P2-3 | `src/lib/share.ts` | X 제목 자르기가 제목 끝 반박·단서 절을 잘라 뜻이 뒤집힘. 예: 김민석 게시물은 "were not his words"가 잘려 본인 발언 목록처럼 남음. 그 밖에 "were not confirmed"·"differ from the ruling"·"has not been established" 소실 |
| P2-4 | `src/lib/config.ts` `SITE_EN.aboutIntro` | D1 셋째 문장 "단정하지 않고" → "We do not state" (의미 변경) |

### 🟡 P3 — 비차단 8건
P3-1 `today` 카드마다 재계산 · P3-2 영어 카드가 한국어 `updatedAt` 사용(번역 미갱신 시) · P3-3 about 3영업일 약속에 "확정 뒤 적용" 단서 없음 · P3-4 "위 4항" · P3-5 약관 "요약 그대로 옮기지 않음" ↔ `og.description` 원문 블록 기능(현재 0건) · P3-6 en meta 축약 · P3-7 사진형 미실측(0건 확인) · P3-8 `--staged` 게이트 재실행

## 배포 차단 항목 수정 문구 안
- **P2-1** (기획자 약관 §5 원문 차용):
  `열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다.`
- **P2-2** (기획자 약관 §3 원문 차용):
  `언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문을 기준으로 보고, 뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.`
- **P2-3** (코드): 제목 가중치가 256을 넘으면 `xShareText`가 빈 문자열을 돌려준다. `xIntentUrl`은 `text` 없이 `?url=`만 만든다(해당 en 24건). `share-check.ts` 기대값을 "url만 24 · 나머지 388 원제목"으로 갱신한다. e2e에 X href `text` 부재 확인 1줄 추가를 권장한다. 스레드는 변경 없음.
- **P2-4** (셋째 문장만 교체):
  `We do not make definitive claims about how far the facts have been established; we quote the reports as they are.`

## 미해결 1~3 판정
- 1-a 개인정보: 차단(P2-1)
- 1-b 매체 등록: 차단(P2-2)
- 2 "위 4항": 비차단(P3-4)
- 3 X 말줄임: 차단(P2-3). 인용부호 짝 깨짐은 4/24이고, 더 큰 문제는 반박 절 소실이다.

## 사용자 결정 필요
- **신규 없음.** 기존 미결(연락 창구 확정 4c)은 유지한다.

## 슈퍼바이저 판단 필요
1. scope 2.1-2 "영어 문구는 기획자 재확인 없이 배포하지 않는다"와 오더 11 판단 3(리뷰어 게이트)의 관계를 정한다. 리뷰어 게이트로 대체한다면 history에 남긴다. 리뷰어는 P2-4 수정본 기준으로 의미 동등을 승인한다.
2. P2-1·P2-2 문구는 기획자 약관 문안을 그대로 옮긴 것이다. 슈퍼바이저 채택으로 프로그래머 수정 오더에 넣는 것을 권장한다.

## 커밋 순서
프로그래머 11-1(P2 4건 + 검증 재실행) → 리뷰어 26-1 짧은 재확인(문구 4곳 diff·share-check·e2e 숫자) → 슈퍼바이저 `clean-clone-gate.sh --staged` → 경로 지정 커밋

## 커밋 대상 경로
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
docs/tools/programmer-11/
docs/handoffs/programmer-11-news-format-v0.2-implement.md
docs/triggers/programmer-11-news-format-v0.2-implement-COMPLETE.md
instructions/programmer/processed/11-news-format-v0.2-implement.md
docs/reviews/programmer-11-news-format-v0.2-implement-review.md
docs/tools/reviewer-26/
docs/triggers/reviewer-26-programmer-11-news-format-v0.2-review-COMPLETE.md
instructions/reviewer/processed/26-programmer-11-news-format-v0.2-review.md   (이동)
history/2026-11-09.md   (append분)
```
(+ 프로그래머 11-1 수정분은 같은 경로 안이다. 다른 미추적·수정 파일은 범위 밖이므로 경로를 지정해 커밋한다.)
