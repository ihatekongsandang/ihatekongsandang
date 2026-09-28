# ✅ 완료 — 프로그래머 (Opus 5) · 04-floating-banner

**완료 시각**: 2026-09-28 11:15 · **개정** 11:53 (사용자 지시 "베너 닫기 없애" — 닫기 버튼·sessionStorage 로직 제거)
**작성 세션**: 프로그래머 (Opus 5)
**md오더**: `instructions/programmer/processed/04-floating-banner.md`
**핸드오프**: `docs/handoffs/programmer-04-floating-banner.md`

## 상태
- 전 페이지 우측 플로팅 배너 추가 — 데스크톱 세로 중앙 세로 탭(48px) · 모바일 우측 하단 버튼
- `FLOATING_BANNER = { enabled, href, title, subtitle }` (`src/lib/config.ts`) · `enabled:false` 시 배너·여백 미렌더
- 닫기 버튼 없음(사용자 지시로 제거, 항상 표시) · GA 로드 시에만 `floating_banner_click`
- 🔴 **커밋하지 않음** — 리뷰어 판정 후 슈퍼바이저

## 검증 숫자 (최종 빌드, 전부 직접 실측)
- validate 45/45 · typecheck 0 · lint 0 errors(1 warning — 기존 리뷰어 04 도구 파일) · build 정적 142/142
- 정적 HTML 전수 on 135/135 · `enabled:false` 빌드 off 135/135
- 기하 8,079회 실패 0 (대표 6경로 × 320~1440px 1px 간격 + 전 135경로 × 경계 폭 10종 + 낮은 높이 3) · 최소 간격 8.0px
- 동작 31/31 · 콘솔 오류 0 · GA 이벤트 3/3 · 대비 8/8 · 캡처 19장 (`docs/qa/programmer-04/`) — 전부 개정 후 재측정
- href `https://signforkorea.com/re` · `fbclid` 0 · rel `noopener nofollow` · 독립 grep 0건

## 리뷰어 판단 요청
- 닫을 수 없는 모바일 고정 버튼이 스크롤 중 카드를 가리는 것
- 포커스 가림(WCAG 2.4.11) 미실측 — 확인 필요
