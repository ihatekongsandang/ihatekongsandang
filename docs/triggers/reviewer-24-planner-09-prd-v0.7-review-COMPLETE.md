# 🟠 완료 트리거 — 리뷰어 24-planner-09-prd-v0.7-review

**완료**: 2026-11-08 22:52 | **세션**: 리뷰어 (Opus 5.5)
**리뷰**: `docs/reviews/planner-09-prd-v0.7-news-format-review.md`

## 판정
🟠 **조건부 승인** — P1 0 · P2 3 · P3 12. P2 3건 문서 수정 후 커밋. 사용자 결정 2건.

## 핵심 확인
- D1~D5 PRD 반영 ✅, D6 (가)~(다)·(라) ✅ / **(마) 누락**
- 약관 문안: 법적 효과 보장·"법정 의무" 표현 0, 3영업일·"지체 없이" 구분 ✅, 익명 원칙 충돌 없음, ko/en 같은 뜻
- 금지 표현 재측정: 기자 26파일/61건 · 속보 20파일/37건 · 본지·편집국·바이라인 0 · src 0 — **기획자 수치와 일치**
- 라이브 사실: `/about`·`/en/about` 둘 다 200, `contact@example.invalid` 각 4회 노출. `.invalid` 예약 도메인이라 정정·삭제 요청 경로가 현재 작동하지 않음

## 결함
| # | 등급 | 요지 |
|---|---|---|
| P2-1 | 🟠 | D6(나)(마)(게시 빈도 목표 시 법적 쟁점 병기) PRD 누락 — §6⑥이 가리키는 §10에 내용 없음 |
| P2-2 | 🟠 | 카드 "갱신" 텍스트를 "기존 PRD §6⑤·변경 없음"으로 표기 — 실제는 기획서 §3.3 제안, 사용자 미결정, 확정 카드 사양(제목+이미지) 변경 |
| P2-3 | 🟠 | "운영자 자칭 0건" 예외: `2026-11-05-dduddd-kimtaekyu-expulsion-resolution` ko·en 제목 맨 앞 인용부호 밖 "[속보]"/"[Breaking]". 영어 breaking 14파일/24건·reporter 4파일/11건 미보고. §6⑥(나) 단서에 인용 표시 규칙 필요 |
| P3-1~12 | 🟡 | 약관: 뉴스통신·방송을 신문법 등록으로 오기(라이브 /about도 같음) · 법령 적용 시 법정 절차 준수 문장 없음 · 임시 제한 기간 상한 없음 · "개인정보 수집 안 함" vs GA4·이메일(확인 필요) · SNS 원문+배경 보도 구조 누락 · "요약만 인용" 부정확 · "신문법상 언론"·영문 법령명 / PRD: §0.5 트래커·§9 요약 미갱신 · §7 "(선택) X" / scope: "7일" 테스트 불가 · 카드·푸터 대상 파일 오기(post-card.tsx·site-footer.tsx 존재) · posts-en 기자 오기 |

## 사용자 결정 필요
1. 🔴 연락 경로(최우선) — 라이브 정정·삭제 요청 경로 부재. 전용 기능 계정으로. 확정 전 약관 페이지 공개 보류
2. 카드 "갱신" 텍스트 추가 여부 + 기준 일수

## 커밋 대상 경로 (P2 3건 수정 후 — 슈퍼바이저 지정 위치 Read 확인)
- `planning/prd.md`
- `planning/terms-page-copy.md`
- `planning/news-format-v0.2-scope.md`
- `docs/handoffs/planner-09-prd-v0.7-news-format.md`
- `docs/triggers/planner-09-prd-v0.7-news-format-COMPLETE.md`
- `instructions/planner/processed/09-prd-v0.7-news-format.md`
- `docs/reviews/planner-09-prd-v0.7-news-format-review.md`
- `docs/tools/reviewer-24/forbidden-terms.py`
- `docs/tools/reviewer-24/forbidden-terms-output.txt`
- `docs/tools/reviewer-24/live-contact-check.md`
- `docs/triggers/reviewer-24-planner-09-prd-v0.7-review-COMPLETE.md`
- `instructions/reviewer/processed/24-planner-09-prd-v0.7-review.md`
- 별도: 김태규 게시물 ko·en 제목 수정은 슈퍼바이저 content 작업

## 제약 준수
대상 수정 0 · git 0 · 빌드 0 · 외부 요청 2회(라이브 /about·/en/about curl) · 저장소 독립 grep 0
