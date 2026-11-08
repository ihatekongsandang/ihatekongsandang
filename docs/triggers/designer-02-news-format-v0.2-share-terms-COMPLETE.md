# COMPLETE — 디자이너 02: news-format-v0.2-share-terms

**완료 시각**: 2026-11-08 23:21 | **담당**: 디자이너 (Sonnet 5)

## 산출물 목록
- `design/news-format-v0.2/README.md`
- `design/news-format-v0.2/01-share-buttons.md`
- `design/news-format-v0.2/mockup-share-buttons.html`
- `design/news-format-v0.2/02-terms-page.md`
- `design/news-format-v0.2/03-about-intro-contact.md`
- `design/news-format-v0.2/04-footer-terms-link.md`
- `design/news-format-v0.2/05-post-card-renewal-badge.md`
- `design/news-format-v0.2/mockup-post-card-renewal.html`
- `docs/handoffs/designer-02-news-format-v0.2-share-terms.md`

## 접근성 점검 결과 (요약 — 전체는 README.md)
| 항목 | 결과 |
|---|---|
| 텍스트 대비(`--foreground` on `--background`) | 17.7:1 — AA(4.5:1) 통과 |
| 보조 텍스트 대비(`--muted-foreground` on `--background`) | 7.75:1 — 통과 |
| 링크 색 대비(`--link` on `--background`) | 6.70:1 — 통과 |
| 버튼 테두리 비텍스트 대비(`--border` on `--background`) | 1.27:1 — WCAG 1.4.11(3:1) **미달**. 기존 전역 outline 버튼 시스템과 동일한 값(이번 신설 결함 아님). 포커스 링·레이블·hover로 보완 |
| 포커스 인디케이터(`--ring` 2px, offset 2px) | 대비 6.70:1 — 통과 |
| 터치 영역(공유 버튼 `h-11`) | 44px — 권장 기준 충족 |
| `aria-live` 피드백 | 복사 성공/실패를 `role="status" aria-live="polite"`로 설계, `alert()` 미사용 |

전부 **설계 기준 계산값**(상대휘도 공식 직접 계산, sRGB)이며, 구현 후 실측(axe·키보드 전수 확인)은 리뷰어·테스터 몫이다.

## 확인 필요 항목
1. 🔴 X 공유 intent URL — 오더 원문(`x.com/intent/post`)이 아니라 **공식 문서 확인 결과 `x.com/intent/tweet`**(2026-11-08 WebFetch, `docs.x.com/x-for-websites/web-intents/overview`).
2. 🔴 스레드 공유 intent URL — 오더 원문(`threads.net/intent/post`)이 아니라 **공식 문서 확인 결과 `www.threads.com/intent/post`**(2026-11-08 WebFetch, `developers.facebook.com/documentation/threads/threads-web-intents`).
3. 🔴 카드 갱신 7일 판정 — 데이터 필드(`updatedAt`)는 가능하나, SSG+예약 재배포 없음이라 "7일"이 마지막 빌드 시점 기준이 된다. 프로그래머가 방식 확인·선택 필요(`05-post-card-renewal-badge.md` §3).
4. 🟡 공유 버튼 테두리 비텍스트 대비 1.27:1(WCAG 1.4.11 미달) — 기존 전역 버튼 시스템 이슈, 이번 범위 밖으로 기록만.
5. 🟡 PRD §6⑤ "갱신 이력 한 줄"(상세 페이지) 미구현 확인됨 — 이번 오더(카드 배지) 범위 밖, 별도 확인 필요.
6. 참고(결정 아님) — 약관 페이지·푸터 링크 라우팅은 연락 경로 사용자 결정 전까지 보류 제안. `/about`·`/en/about` 연락처 박스 교체는 그와 무관하게 즉시 반영 가능.

## 처리
- 오더 `instructions/designer/02-news-format-v0.2-share-terms.md` → `instructions/designer/processed/`로 이동 완료.
- `history/2026-11-08.md`에 기록 완료.
