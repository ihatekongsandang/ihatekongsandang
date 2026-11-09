# 완료 트리거 — designer-05-responsive-select-valueup

**완료**: 2026-11-09 14:15 | **작성 세션**: 디자인 팀장 (Opus 5.5, claude-opus-5-5) | **상태**: COMPLETE

## 순위표 (브리프 §7, 100점 · 통일 재측정 기준)
| 순위 | 시안 | 점수 | 비고 |
|---|---|---|---|
| 1 | A1 | 92 | 모바일 카드 4장·원문 이동 y=427·접근성 결함 0 |
| 2 | A2 | 87.5 | 알약 배너가 360 카드 글자 가림 |
| 3 | A3 | 83.5 | 상세 고정 요소 165px, 스크롤 숨김 배너 |
| 4 | B1 | 80 | 탐색 최고, 포커스 가림 2 |
| 5 | C1 | 79 | ko 46.9자/줄, 포커스 가림 1 |
| 6 | C3 | 75.5 | |
| 7 | C2 | 73.5 | |
| 8 | B3 | 72 | 포커스 가림 6, 새 컴포넌트 최다 |
| 탈락 | B2 | (67) | 현재 쪽 번호 글자 1:1, 14건 |

## 보강안 요약 (`design/v0.3-responsive/final/`)
A1 + A3의 md 이상 세로형 그리드(2/3/3열) + B1의 번호형 쪽 이동. 상세 사진 캡션에 출처·공공누리 유형·원 페이지 링크, 카드엔 이미지만. 새 대체 카드(연한 면+아이콘, 깨짐도 같은 카드). 하단 띠 배너 52px(부제 보임·숨김 없음). 홈·상세 ko/en·영어 피드·태그·소개·이미지 상태, 360·768·1024·1280 스크린샷.
재측정: 360 카드 4장(y=247)·390 원문 이동 y=457·ko 42.7/en 61.6자·대비 미달 0/2,612·44 미만 0·넘침 0/77·포커스 문제 0/159·외부 요청 0.

## 사용자 결정 목록 (⭐ 권장)
- D1 모바일 배너: ⭐하단 띠 / 알약 / 헤더 아래+스크롤 숨김
- D2 피드 버튼: ⭐"다음 페이지"+쪽 번호 / "더 보기" 이어 붙이기+번호 / 현행
- D3 영어 사이트명: ⭐작은 화면 헤더는 한국어 이름만, 부제는 h1 / 현행
- D4 카드 사진 출처 글자: ⭐카드엔 이미지만 / 날짜 줄에 한 줄
- D5 상세 끝 같은 주제·이전/다음: 이번에 / ⭐별도 작은 오더
- D6 영어 월별 목록(새 라우트): ⭐보류 / 추가
- D7 "링크" 표기: ⭐카드·상세 모두 제거 / 카드만

## 구현 범위 요약 (`final/notes.md` §5)
18행: 하 7 · 중 9 · 상 2(`post-detail.tsx` 재배치+캡션, 선택 D6 월별 목록). 새 라우트는 D6을 고를 때만. 정책 겹침: `card-media.tsx`(P3·P8), `post-detail.tsx`(P4·P10·P11), 스키마(P1·P2), 소개 문장(P12). 새 의존성 없음.

## 커밋 대상 경로
- design/v0.3-responsive/02-scoring.md
- design/v0.3-responsive/compare.md, design/v0.3-responsive/compare/
- design/v0.3-responsive/final/
- docs/tools/designer-05/
- docs/handoffs/designer-05-responsive-select-valueup.md
- docs/triggers/designer-05-responsive-select-valueup-COMPLETE.md
- instructions/designer/processed/05-responsive-select-valueup.md
- history/2026-11-09.md
