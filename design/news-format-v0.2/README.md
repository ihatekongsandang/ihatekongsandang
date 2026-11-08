# 뉴스형 전환 v0.2 디자인 시안 — 공유 버튼·약관·소개·푸터·카드 갱신 표시

> 작성: 디자이너 (Sonnet 5) · md오더 02 | 작성일: 2026-11-08
> 🔴 저장소 독립 원칙 준수. 다른 서비스명·계정명·홈 디렉터리 절대경로를 쓰지 않는다.
> 근거: `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/prd.md`(v0.7), `docs/reviews/planner-09-prd-v0.7-news-format-review.md`(리뷰 24)
> `src/`·`content/`·PRD·guide는 읽기만 했다. 수정 없음.

## 이 폴더가 다루는 것

| # | 범위 | 문서 |
|---|---|---|
| 1 | 공유 버튼(링크 복사·X·스레드) | [`01-share-buttons.md`](./01-share-buttons.md) + [`mockup-share-buttons.html`](./mockup-share-buttons.html) |
| 2 | 약관 페이지(`/terms`·`/en/terms`) | [`02-terms-page.md`](./02-terms-page.md) |
| 3 | 소개 페이지 D1 문구·연락 창구 준비 중 표시 (ko/en) | [`03-about-intro-contact.md`](./03-about-intro-contact.md) |
| 4 | 푸터 약관 링크 | [`04-footer-terms-link.md`](./04-footer-terms-link.md) |
| 5 | 카드 "갱신" 표시(5a, 7일) | [`05-post-card-renewal-badge.md`](./05-post-card-renewal-badge.md) + [`mockup-post-card-renewal.html`](./mockup-post-card-renewal.html) |

모든 문서는 "프로그래머가 그대로 구현할 수 있게" 토큰·클래스·상태(기본·hover·focus·복사됨 등)를 구체적으로 적었다. 새 색·새 토큰을 만들지 않고 `src/app/globals.css`의 기존 변수(`--background`·`--foreground`·`--surface`·`--surface-strong`·`--muted-foreground`·`--border`·`--link`·`--ring`·`--radius-card`)와 기존 컴포넌트(`Badge`, `buttonVariants`)만 재사용했다 — 브랜드 일관성 유지, 새 대비 검증 부담 최소화.

## 확인 필요 항목 (요약 — 각 문서 본문에 상세)

| 항목 | 상태 | 상세 |
|---|---|---|
| X 공유 intent URL | 🔴 **오더 원문과 다름 — 직접 확인해 정정** | 오더는 `x.com/intent/post`로 썼으나 **공식 문서는 `https://x.com/intent/tweet`**이다. `01-share-buttons.md` §2 참조, 출처 명시 |
| 스레드 공유 intent URL | 🔴 **오더 원문과 다름 — 직접 확인해 정정** | 오더는 `threads.net/intent/post`로 썼으나 **공식 문서(Meta for Developers)는 `https://www.threads.com/intent/post`**다. `01-share-buttons.md` §2 참조, 출처 명시 |
| 공유 버튼 테두리 비텍스트 대비 | 🟡 확인 필요(기존 시스템 전역 이슈, 이번 범위에서 새로 만든 결함 아님) | `01-share-buttons.md` §5 접근성 — 계산값 1.27:1로 WCAG 1.4.11(3:1) 미달. `buttonVariants` 전역 컴포넌트를 바꾸는 일이라 이 오더 범위 밖. 포커스 링(17.7:1 상당)·레이블·hover로 보완됨을 적어 둔다 |
| 카드 "갱신" 7일 판정의 빌드 시점 한계 | 🔴 **프로그래머 확인 필요** | `05-post-card-renewal-badge.md` §3 — 정적 빌드(SSG)라 "오늘"이 마지막 배포 시점이다. 재배포가 뜸하면 7일이 실제로 지나도 배지가 그대로 남거나, 반대로 배지가 사라져야 할 시점이 다음 배포까지 늦어질 수 있다 |
| PRD §6⑤ "갱신 이력 한 줄"(상세 페이지) | 🟡 참고 — 미구현 상태 확인됨 | `05-post-card-renewal-badge.md` §4 — 현재 `src/components/post-detail.tsx`에는 `updatedAt` 날짜만 `dl`에 표시되고, PRD §6⑤가 말하는 "2026-XX-XX 갱신: … 반영" 문장은 코드에 없다. 이 오더는 **카드만** 다루므로 상세 문장 구현 여부는 범위 밖 — 프로그래머 확인 필요로 남긴다 |
| 약관 페이지 공개 시점 | 참고(판단 아님) | PRD §0.5: 연락 경로가 정해지기 전에는 약관 페이지를 공개하지 않는다. 이 시안은 **구현 준비용**이며, 실제 라우팅 연결·사이트맵 포함은 연락 경로 확정 후 프로그래머가 전환한다 |
| `/about`·`/en/about` 연락처 교체 | 참고 | 이 수정은 약관 페이지 공개와 별개로 **지금 반영 가능**하다(현재 라이브에 작동하지 않는 이메일이 노출돼 있다는 결함을 고치는 일이라 연락 경로 확정을 기다릴 필요 없음). `03-about-intro-contact.md` §2 |

## 접근성(WCAG 2.2 AA) 점검 결과 — 설계 기준

실제 대비 수치는 기존 토큰 값으로 직접 계산했다(상대휘도 공식, sRGB). 포커스 표시·레이블·`aria-live`는 설계로 반영했고, 구현 후 실측(axe·키보드 전수 확인)은 리뷰어·테스터 몫이다.

| 항목 | 결과 |
|---|---|
| 텍스트 대비(버튼·배지 글자, `--foreground` on `--background`) | **17.7:1** — AA(4.5:1) 통과 |
| 보조 텍스트 대비(`--muted-foreground` on `--background`) | **7.75:1** — AA 통과 |
| 링크 색 대비(`--link` on `--background`) | **6.70:1** — AA 통과 |
| 버튼 테두리 비텍스트 대비(`--border` on `--background`) | **1.27:1** — WCAG 1.4.11(3:1) **미달**. 기존 `buttonVariants` outline 전역 스타일이 모든 기존 버튼(예: "원문 기사로 이동")에 이미 같은 값을 쓰고 있어 이번 신설 컴포넌트가 만든 결함이 아니다. 포커스 링(아래)·레이블·hover 배경 변화로 식별성을 보완했다 |
| 포커스 인디케이터(`:focus-visible`, `--ring` 2px) | `--ring`(#1d4ed8) 대비 계산상 6.70:1 상당, 두께 2px+offset 2px — AA(비텍스트 3:1) 통과 |
| 터치 영역 | 공유 버튼 `h-11`(44px) 지정 — WCAG 2.2 AA 2.5.8 권장 44px 충족(최소 24px도 충족) |
| 레이블 | 모든 공유 버튼에 명시적 텍스트 레이블(아이콘 단독 버튼 없음) — 보이는 텍스트=접근성 이름 |
| `aria-live` | 링크 복사 성공/실패 안내를 `role="status" aria-live="polite"`로 설계(`alert()` 미사용) |

## 산출물 목록

| 경로 | 설명 |
|---|---|
| `design/news-format-v0.2/README.md` | 본 문서(색인) |
| `design/news-format-v0.2/01-share-buttons.md` | 공유 버튼 시안·intent URL 근거·상태·GA4 이벤트 제안 |
| `design/news-format-v0.2/mockup-share-buttons.html` | 공유 버튼 단독 HTML 목업(모바일/데스크톱, 상태별) |
| `design/news-format-v0.2/02-terms-page.md` | 약관 페이지(`/terms`·`/en/terms`) 구조·위계 시안 |
| `design/news-format-v0.2/03-about-intro-contact.md` | 소개 페이지 D1 문구 위치·연락 창구 준비 중 표시(ko/en) |
| `design/news-format-v0.2/04-footer-terms-link.md` | 푸터 약관 링크 자리·마크업 |
| `design/news-format-v0.2/05-post-card-renewal-badge.md` | 카드 갱신 표시(5a) 위치·크기·색·대비·ko/en 표기·7일 판정 |
| `design/news-format-v0.2/mockup-post-card-renewal.html` | 카드 갱신 표시 단독 HTML 목업(4가지 상태) |

## 다음 세션 가이드

- **프로그래머**: 5개 문서 순서대로 구현 가능. `01`·`05`는 `src/lib/i18n.ts` Dictionary에 새 키 추가가 필요하다(각 문서 §에 ko/en 값 전부 명시). intent URL은 오더 원문이 아니라 **이 문서가 적은 정정된 URL**을 쓴다.
- **리뷰어**: 위 "확인 필요 항목" 표와 "접근성 점검 결과" 표를 먼저 본 뒤 구현 결과를 대조. X/Threads intent URL이 실제로 공식 문서와 일치하는지, 복사 실패 폴백이 동작하는지, 카드 갱신 배지가 7일 경계에서 정확히 켜지고 꺼지는지(빌드 시점 기준) 확인.
- **슈퍼바이저**: 연락 경로 사용자 결정이 나오면 `03`·`02` 문서의 "연락 창구 준비 중" 자리를 실제 값으로 교체하는 후속 오더 발주. 약관 페이지는 그 결정 전까지 라우팅 연결(사이트맵·푸터 활성화)을 보류.
