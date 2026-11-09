# 완료 트리거 — 기획자 (Sonnet 5.5) · 11-v0.2-decisions-sync

**완료일**: 2026-11-09 10:31
**산출물 요약 문서**: `planning/v0.2-post-release-sync.md`

## 변경 파일 목록
- 수정: `planning/prd.md`(v0.7 → v0.8), `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`
- 신규: `planning/v0.2-post-release-sync.md`, 본 트리거
- 이동: `instructions/planner/11-v0.2-decisions-sync.md` → `instructions/planner/processed/`
- `src/`·`content/`·`design/`·`docs/poster/guide.md` 수정 없음. git·빌드 사용 안 함.

## 임무별 결과
1. **P3-11**: PRD v0.8 — 4c·5a 확정 행, 슈퍼바이저 판단 표(약관 공개·갱신 판정·X 256·영어 D1), §4.1·§6④⑤·§7·§11 반영. 신규 미결은 "연락 창구 확정(사용자)"만 남김. scope 2.2-3·2.4·§4 동기화.
2. **P3-8**: 약관 문안 ko 29/29·en 29/29 문장이 배포 소스와 일치(누락·불일치 0). 문안 밖 추가 문장 6개(원문·작성자·확정 근거)와 배포 차이 10건을 `terms-page-copy.md` §A·§B에 기록. 개정 대기 3건은 §C.
3. **P3-4**: "위 4항"을 「정정·삭제 요청 방법과 처리 기준」 절 이름으로 부르는 문구 안(ko·en, `#correction` 링크는 선택).
4. **P3-3**: about "3영업일" 약속에 단서 **필요** — 약관과 같은 문장을 `contactEmail`이 `null`일 때 준비 중 상자 아래에 둔다. **P3-5**: 약관 "요약 그대로 옮기지 않음"과 `og.description` 원문 인용 블록은 **문언상 충돌**(사용 0/207). 약관 문구를 "운영자가 쓰는 요약·본문"으로 한정하고 원문 미리보기 예외를 적는 안 채택 권장.
5. **D1**: 한국어 D1 변경 없음. 모순은 아니나 "등록된"이 세 종류 매체에 일괄로 읽히는 긴장이 있음 → 약관 §3에 풀이 한 문장 추가(권장안 1). D1 문구 수정은 사용자 결정 사항이며 권장하지 않음. 뉴스통신사·방송사업자 지위(등록·허가·승인)는 리뷰 27 §4로 해소 — 뉴스통신사는 등록(뉴스통신법 제2조3호·제8조①), 방송사업자는 지상파·종합유선·위성·공동체라디오 허가, 방송채널사용사업자 등록·신고·승인(방송법 제9조).
6. **코드 반영 필요 목록**: `planning/v0.2-post-release-sync.md` §6.

## 코드 반영 필요 건수
**8건**(파일 4개): 약관 ko·en 각 3건(P3-4, P3-5, D1 풀이), about ko·en 각 1건(P3-3 단서). 문구만 변경, 기능 변경 없음.

## 사용자 결정 필요 항목
- 🔴 연락 창구 확정(기존 미결, `docs/user-tasks.md` §5). 신규 필수 결정 없음.
- (조건부) D1 문구 수정 — 권장하지 않음.
- 슈퍼바이저 확인 권장: P3-5 권장안(약관 약속 일부 완화) 채택 여부, 리뷰어 게이트 대상.

## 커밋 대상 경로 목록
- `planning/prd.md`
- `planning/news-format-v0.2-scope.md`
- `planning/terms-page-copy.md`
- `planning/v0.2-post-release-sync.md`
- `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md`
- `instructions/planner/processed/11-v0.2-decisions-sync.md`(오더 이동)
- `history/2026-11-09.md`
