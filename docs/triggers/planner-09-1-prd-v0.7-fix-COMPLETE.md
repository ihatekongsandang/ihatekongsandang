# 🔴 완료 트리거 — 기획자 09-1-prd-v0.7-fix

**완료**: 2026-11-08 | **세션**: 기획자 (Sonnet 5)

## 지시별 반영 표 (P2 3 + P3 12 = 15/15)

| # | 반영 여부 | 변경 위치 |
|---|---|---|
| P2-1 (D6(마) 누락) | ✅ | `prd.md` §6⑥에 "(마) 게시 빈도 목표의 법적 쟁점 병기" 본문 신설, §10에 참조 한 줄 |
| P2-2 ("갱신 표시" 오표기) | ✅ | `prd.md` §11·§0.5, `scope.md` §1·§2.4·§4 — "뉴스형 기획서 §3.3 제안, 사용자 확인 필요"로 전환, §11 "(확인 후)" |
| P2-3 (금지표현 분류·영어 미보고) | ✅ | `prd.md` §6⑥(나) 인용표시 단서 추가, `scope.md` §3.2·3.3 — "자칭 0건, 라벨 1건(ko·en) 수정대상", breaking 14/24·reporter 4/11 추가 |
| P3-1 (뉴스통신·방송 오기) | ✅ | `terms-page-copy.md` ko/en §3 |
| P3-2 (법령 적용 시 절차) | ✅ | `terms-page-copy.md` ko/en §4 |
| P3-3 (임시제한 상한) | ✅ | `terms-page-copy.md` ko/en §4 — 30일 |
| P3-4 (개인정보 확인필요) | ✅ | `terms-page-copy.md` ko/en §5 |
| P3-5 (배경보도 표시) | ✅ | `terms-page-copy.md` ko/en §2 |
| P3-6 ("요약만 인용" 모호) | ✅ | `terms-page-copy.md` ko/en §3 |
| P3-7 (신문법 "언론" 오기) | ✅ | `terms-page-copy.md` ko/en §6 |
| P3-8 (§0.5·§9 누락) | ✅ | `prd.md` §0.5(D1~D6 확정표 신설), §9(⑥ 참조 추가) |
| P3-9 ("(선택) X" 오표기) | ✅ | `prd.md` §7 |
| P3-10 (scope "7일" 테스트불가) | ✅ | `scope.md` §2.4 — 기준값 미정으로 수정 |
| P3-11 (대상파일 불명확) | ✅ | `scope.md` §1·§2.1·§2.6 — `post-card.tsx`·`site-footer.tsx` 명시 |
| P3-12 (posts-en 오기) | ✅ | `scope.md` §3.2 — "기자" posts-en 0건으로 정정 |

**검산**: P2 3 + P3 12 = 15/15 반영.

## 변경 위치 상세
- `planning/prd.md`: §0.5(신설 표 2개), §6⑥(마 신설·나 단서 보강), §7("(선택)" 삭제), §9(⑥ 참조), §10(참조 한 줄), §11(DoD "확인 후")
- `planning/terms-page-copy.md`: ko §2·§3·§4·§5·§6 / en §2·§3·§4·§5·§6 전부 수정
- `planning/news-format-v0.2-scope.md`: §1(작업4·6 대상파일), §2.1(en/about 정정), §2.4(전면 재작성 — 확인 전 보류), §2.6(site-footer 명시), §3.1(영어 grep 명령 추가), §3.2(표 재작성 — breaking/reporter 추가), §3.3(분류 재작성 — 예외 1건 명시), §3.4(수정 방향 기록), §4(결정 항목 추가)

## 재확인(Read) 수행
- `planning/prd.md`: `grep -c "09-1"` → 6건 확인(§0.5·§6⑥·§7·§9·§10·§11).
- `planning/terms-page-copy.md`: `grep -c "09-1"` → 14건 확인(ko/en 각 P3-1~7).
- `planning/news-format-v0.2-scope.md`: `grep -c "09-1"` → 14건 확인.
- 세 파일 모두 Edit 직후 grep/Read로 실제 반영을 확인했다(보고와 파일 불일치 재발 방지).

## 변경 파일
- `planning/prd.md`, `planning/terms-page-copy.md`, `planning/news-format-v0.2-scope.md`
- `docs/handoffs/planner-09-1-prd-v0.7-fix.md`(신규), `docs/triggers/planner-09-1-prd-v0.7-fix-COMPLETE.md`(본 파일, 신규)

## 제약 준수 확인
- 코드·`content/`·`docs/poster/guide.md` 수정: 0건(게시물 제목 수정은 슈퍼바이저 content 작업으로 명시, 손대지 않음)
- `git add`·`commit`·`push`: 실행하지 않음
- 빌드: 실행하지 않음
- 저장소 독립: 변경 5파일에 다른 서비스명·계정명·홈 디렉터리 절대경로 없음
- 연락 경로: "사용자 결정 필요" 유지(임의 작성 안 함)

## 처리
- `history/2026-11-08.md`에 기획자 09-1 항목 append 완료
