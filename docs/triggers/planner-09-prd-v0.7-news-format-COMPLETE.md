# 🔴 완료 트리거 — 기획자 09-prd-v0.7-news-format

**완료**: 2026-11-08 | **세션**: 기획자 (Sonnet 5)

## PRD 변경 절 목록 (v0.7, `planning/prd.md`)

| 절 | 변경 | D# |
|---|---|---|
| 버전 이력 | v0.7 행 추가 | — |
| §1 서비스 정의 | "소개 문구" 신설(안 3 전문) | D1 |
| §2 남은 질문 | "자동 뉴스 수집기 — 미구현 유지" 신설 | D5 |
| §4.1 사이트맵 | `/terms`(제안) 1화면 추가 | D2 |
| §6④ | 운영 정책 페이지 신설 반영, "지체 없이"·3영업일 기준 구분, 정보통신망법·언론중재법 확인 필요 명시 | D2 |
| §6⑥ (신설) | 뉴스형 편집 제약 (가)(나)(다) + 적용 범위 단서 | D6(나) |
| §7 v0.5 | 공유 수단에 스레드 추가, (가) v0.2 앞당김, 공유수 집계 시작점 | D4 |
| §9 SEO | JSON-LD `Article` 유지 확정 | D3 |
| §11 로드맵 | v0.2 DoD에 뉴스형 전환 항목 추가 | D1·D2·D4 |

## 문안 파일
- `planning/terms-page-copy.md` — ko/en 6개 항목(운영 목적·직접 취재 안 함·출처 원칙·정정·삭제 절차·익명 운영·게시물 성격). 연락 경로 "사용자 결정 필요"로 명시(임의 작성 금지 준수).

## scope 요약
- `planning/news-format-v0.2-scope.md` — 6개 작업(소개문구·약관페이지·공유버튼(가)·갱신표시·GA4·푸터링크) × 화면별 수용 기준. "오늘의 이슈"는 범위 제외 명시.

## 금지 표현 grep 결과

| 표현 | 파일 수 | 건수 | 판정 |
|---|---|---|---|
| 기자 | 26 | 61 | 전부 보도 인용/매체 헤드라인 — 운영자 자칭 0건 |
| 속보 | 20 | 37 | 전부 보도 인용/매체 헤드라인(SNS 자칭을 반박하는 맥락 포함) — 운영자 자칭 0건 |
| 본지 | 0 | 0 | 해당 없음 |
| 편집국 | 0 | 0 | 해당 없음 |
| 바이라인 | 0 | 0 | 해당 없음 |

`src/` 전체 0건(다섯 표현 모두). 수정 없음(조사만, 오더 제약 준수).

## 사용자 결정 필요 항목 (재확인)
1. 🔴 약관 페이지 연락 경로(이메일 등) — 현재 placeholder(`contact@example.invalid`) 유지 중, 사용자가 실제 값 결정 필요.
2. (참고, 결정 아님) 약관 페이지 실제 경로(`/terms` 등)는 프로그래머 확정 사항.

## 재확인(Read) 수행
- `planning/prd.md`: Edit 후 `grep -n 'v0.7\|D1\|D2\|D3\|D4\|D5\|D6'`으로 9곳 전부(버전이력·§1·§2·§4.1·§6④·§6⑥·§7·§9·§11) 반영을 확인했다.
- `planning/terms-page-copy.md`·`planning/news-format-v0.2-scope.md`: `wc -l`로 각 91·114줄 생성 확인(신규 작성이라 Write 결과가 곧 현재 상태).

## 변경 파일
- `planning/prd.md`(v0.7), `planning/terms-page-copy.md`(신규), `planning/news-format-v0.2-scope.md`(신규)
- `docs/handoffs/planner-09-prd-v0.7-news-format.md`(신규)
- `docs/triggers/planner-09-prd-v0.7-news-format-COMPLETE.md`(본 파일, 신규)

## 제약 준수 확인
- 코드·`content/`·`docs/poster/guide.md` 수정: 0건(grep 조사만)
- `git add`·`commit`·`push`: 실행하지 않음
- 빌드: 실행하지 않음
- 저장소 독립: 변경 5파일에 다른 서비스명·계정명·홈 디렉터리 절대경로 없음

## 처리
- `instructions/planner/09-prd-v0.7-news-format.md` → `instructions/planner/processed/`로 이동 완료
- `history/2026-11-08.md`에 기획자 09 항목 append 완료
