# 완료 트리거 — 리뷰어 20 · planner-08-news-format-review

**완료일**: 2026-11-08 | **세션**: 리뷰어 (Opus 5.5)

- 판정: 🔴 **반려 — 수정 후 재검토** (P1 4 · P2 6 · P3 5 · 저장소 독립 위반 0 · 인용 분량 적합)
- 리뷰: `docs/reviews/planner-08-news-format-conversion-spec-review.md`
- 도구: `docs/tools/reviewer-20/law-check-log.md`, `today-issue-empty-days.py`, `today-issue-empty-days-output.txt`

## P1
1. 인터넷신문·인터넷뉴스서비스 해당 여부 미판단 — 원문 대조 결과 **확인 필요**, 게시량 확대(주간 신규)·기사 묶음 노출·NewsArticle 선언이 위험을 키움
2. 정보통신망법 2026.1.6 개정(§44의7② 허위조작정보, §44의10 손해배상, 2026.7.6 시행) 누락 + §44의2 "영리 목적" 요건 미확인
3. §2.2(b) "선거 부정 주장류" 예시가 guide §1-1 0항과 충돌
4. 기준선 구수치(정정치 22·9·6·7) + 인스타그램 수집 실패 18건 누락

## 사용자 결정 필요 (수정본)
D1 소개 문구(선택지 추가) · D2 정정·삭제 절차 자율 명시("법정 의무" 표현 삭제) · D3 **Article 유지 권고** · D4 공유 앞당김 2단계(카카오는 전용 계정·키 필요) · D5 수집기 "구현 착수" 여부 · **D6 신설** 미등록 전제 해당 위험 처리 방식 · **D7 신설** 인스타그램 캡처 18건 일괄 수령 + 수집 조사 오더

## 커밋 대상
- 위 리뷰·도구 4파일 + 본 트리거 + `instructions/reviewer/processed/20-planner-08-news-format-review.md`
- 기획자 08 산출물은 P1 수정 전 커밋 보류 권고

대상 문서·코드·content·PRD 수정 없음. git add·commit·push 없음.
