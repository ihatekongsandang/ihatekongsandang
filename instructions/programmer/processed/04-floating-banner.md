# md오더: 프로그래머 (Opus 5) - 04-floating-banner

**작성일**: 2026-09-28 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 04
**세션**: 새 세션 권장 (03 이후 컨텍스트 불필요).
**사용자 지시 원문**: "이 링크 우측 플로팅베너로 걸어" — 링크: 재판재개 촉구 국민 서명운동 페이지

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 사이트 전 페이지 우측에 외부 링크 플로팅 배너를 추가한다. 🔴 커밋 금지(리뷰어 판정 후 슈퍼바이저). 대전제 + 저장소 독립 원칙(산출물·커밋에 다른 서비스명·계정·홈 경로 금지).

## 선행 검토 문서 (Required)
- `CLAUDE.md` — 저장소 독립 원칙 · 핵심 축 6(정보 전달형·단정 금지) · 세션 프로토콜
- `src/app/layout.tsx`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/external-link.tsx`, `src/components/analytics/*`, `src/lib/config.ts`, `next.config.*`(CSP)

## 임무

### 1. 배너 사양
- **링크**: `https://signforkorea.com/re` (🔴 https 고정. 사용자가 보낸 원본의 `fbclid` 추적 파라미터는 제거한다.)
- **문구(슈퍼바이저 확정, 임의 변경 금지)**
  - 제목: `이재명 재판재개 촉구 국민 서명운동` (사용자 지정 문구)
  - 보조: `외부 사이트로 이동합니다`
- **설정값화**: `src/lib/config.ts`에 `FLOATING_BANNER = { enabled, href, title, subtitle }`로 둔다. `enabled: false`면 렌더하지 않는다(나중에 내리기 쉽게).
- **위치**
  - 데스크톱(≥1024px): 화면 우측 세로 중앙 고정. 본문 카드 그리드를 가리지 않는 폭.
  - 모바일·태블릿(<1024px): 우측 하단 작은 고정 버튼(본문·페이지네이션·푸터 링크를 가리지 않게 여백 확보, iOS safe-area 반영).
- **닫기(X) 버튼**: 누르면 그 탭 세션 동안 숨김(`sessionStorage`, 🔴 try/catch로 감싸 저장소 차단 시에도 오류 없이 표시).
- **링크 속성**: `target="_blank"` + `rel="noopener nofollow"` (외부 캠페인 링크라 검색엔진 추천 신호를 주지 않는다).
- **이미지 없이 텍스트·CSS만**: 외부 이미지를 불러오지 않는다(CSP 영향 없음).
- **클릭 측정**: GA가 로드된 경우에만 `gtag('event', 'floating_banner_click', { link_url })` 전송(없으면 조용히 무시).
- **접근성**: 링크 `aria-label`에 "새 창" 안내, 닫기 버튼 `aria-label="배너 닫기"`, 키보드 포커스 표시, 명도 대비 4.5:1 이상.
- **톤**: 현재 사이트의 담백한 스타일(v0.2 디자인 전). 번쩍이는 애니메이션·자동 팝업 금지.

### 2. 검증
- `npm run validate:content` · typecheck · lint · build 통과
- 390px / 768px / 1280px 캡처: 홈·게시물 상세·about 각각 (배너가 본문·페이지네이션·푸터를 가리지 않는지)
- 닫기 동작 · `enabled:false` 시 미렌더 · 링크 href에 `fbclid` 없음 · rel 값 확인
- 독립 grep 0건

## 산출물 · 핸드오프
- 코드: `src/**`
- 캡처: `docs/qa/programmer-04/`
- 핸드오프: `docs/handoffs/programmer-04-floating-banner.md` (변경 파일 표 · 캡처 목록 · 검증 숫자 · 자체 결정 · 미해결)
- 🔴 트리거: `docs/triggers/programmer-04-floating-banner-COMPLETE.md` (필수)
- 이 오더를 `instructions/programmer/processed/`로 이동 · history 기록
- **커밋 금지**

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 04-floating-banner
- 변경 파일 · 캡처 N장 · 빌드/검증 결과 · 자체 결정 · 미해결
```
