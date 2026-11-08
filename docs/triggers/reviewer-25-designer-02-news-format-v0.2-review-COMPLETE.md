# 🟠 완료 트리거 — 리뷰어 25-designer-02-news-format-v0.2-review

**완료**: 2026-11-08 23:30 | **세션**: 리뷰어 (Opus 5.5)
**리뷰**: `docs/reviews/designer-02-news-format-v0.2-share-terms-review.md`

## 판정
🟠 **조건부 승인** — P1 0 · P2 2 · P3 11. 01·03·04 착수 가능, 05는 P2 2건 반영 후, 02는 공개 방식 결정 후.

## 핵심 확인
- scope 수용 기준 23개: ✅ 17 · 🟡 4 · ❌ 1(2.4-1 갱신 표시 "배지 아님") · 해당 없음 1
- intent URL: X `https://x.com/intent/tweet`(text·url URL-encoded, 280자) ✅ / 스레드 `https://www.threads.com/intent/post`(퍼센트 인코딩) ✅ — 공식 문서 WebFetch 확인, 오더 원문 두 개는 오류
- 대비 재계산 일치(17.72·7.73·6.70·1.27·16.12·6.10). 1.27:1은 텍스트 버튼이라 WCAG 1.4.11 요구 대상 아님(W3C Understanding) → 범위 밖 판단 적절, "미달" 표기는 정정
- D6 자칭 표현 시안 grep 0, 외부 스크립트 0
- 구현 가능: 토큰·클래스·lucide 아이콘(Link2·Check·CopyX, 0.545.0)·i18n 헬퍼·GA 헬퍼 실재. `PostCardView.updatedAt`만 추가 필요

## 결함
| # | 등급 | 요지 |
|---|---|---|
| P2-1 | 🟠 | 카드 갱신 표시에 `Badge`(알약) 사용 — scope 2.4-1·기획서 §3.3·오더 "글자"와 반대 → 평문 span |
| P2-2 | 🟠 | `<span>`(generic)에 `aria-label` — ARIA 1.2 금지, 스크린리더 미전달 가능 → sr-only 텍스트 |
| P3-1~11 | 🟡 | 복사 버튼 이름·표시 불일치(2.5.3) · 영어 제목 24/206개가 X 280 가중치 초과 · absoluteUrl 상대경로 대체값 · "1.4.11 미달"·"17.7:1 상당" 표기 · 7일 경계·Asia/Seoul · PostCardView.updatedAt · Cron은 Deploy Hook 필요·ISR안 누락 · 디자이너가 더한 문안 3문장·영어 D1 담당 · about→terms 링크 마크업 없음 · 새 창 안내 · PRD §0.5·§11·scope가 4c·5a 미반영 |

## 갱신 7일 판정 선택지
A 빌드 시점(기본, 켜짐 정확·꺼짐 지연, 날짜 표기로 오해 적음) / B Deploy Hook 매일 재배포 / C 클라이언트 useEffect 계산 / D ISR revalidate 86400. A·C는 사용자 결정 불필요, B·D는 비용·한도 확인 필요 시 사용자 확인.

## 사용자 결정 필요 / 슈퍼바이저 판단
1. 약관 페이지 공개 방식 — 4c 문언("/about·/terms에 준비 중 표시")과 PRD §0.5·시안 02 §6("확정까지 공개 보류") 충돌. 슈퍼바이저가 정하고 필요하면 사용자 확인
2. 갱신 판정 방식 B·D를 고를 때만 비용 확인

## 프로그래머 착수 조건
- 지금: 01 공유 버튼(P3-1·2·3 반영) · 03 /about·/en/about 연락처 박스 교체(example.invalid 제거) · 한국어 D1 → SITE.description · 04 푸터 코드 준비(노출은 결정 1 따름)
- P2 반영 후: 05 카드 갱신(평문 + sr-only, 방식 A로 시작)
- 결정 후: 02 약관 라우팅·사이트맵·about→terms 링크 / 영어 D1(번역 담당 지정 후)

## 커밋 대상 경로
- `design/news-format-v0.2/README.md`
- `design/news-format-v0.2/01-share-buttons.md`
- `design/news-format-v0.2/02-terms-page.md`
- `design/news-format-v0.2/03-about-intro-contact.md`
- `design/news-format-v0.2/04-footer-terms-link.md`
- `design/news-format-v0.2/05-post-card-renewal-badge.md`
- `design/news-format-v0.2/mockup-share-buttons.html`
- `design/news-format-v0.2/mockup-post-card-renewal.html`
- `docs/handoffs/designer-02-news-format-v0.2-share-terms.md`
- `docs/triggers/designer-02-news-format-v0.2-share-terms-COMPLETE.md`
- `instructions/designer/processed/02-news-format-v0.2-share-terms.md`
- `docs/reviews/designer-02-news-format-v0.2-share-terms-review.md`
- `docs/tools/reviewer-25/contrast.py`
- `docs/tools/reviewer-25/contrast-output.txt`
- `docs/tools/reviewer-25/x-title-length.py`
- `docs/tools/reviewer-25/x-title-length-output.txt`
- `docs/triggers/reviewer-25-designer-02-news-format-v0.2-review-COMPLETE.md`
- `instructions/reviewer/processed/25-designer-02-news-format-v0.2-review.md`
(시안 P2를 원본에서 고치지 않고 커밋하면 프로그래머 오더에 "리뷰 25 P2-1·P2-2 우선" 명시)

## 제약 준수
대상 수정 0 · git 0 · 빌드 0 · 외부 요청: WebFetch 5(X 2·Threads 1·W3C 1·GA4 1) + 라이브 /about curl 1 · 저장소 독립 grep 0
