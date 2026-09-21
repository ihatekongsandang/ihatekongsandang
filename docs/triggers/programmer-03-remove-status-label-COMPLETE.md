# ✅ 완료 — 프로그래머 (Opus 5) · 03-remove-status-label

**완료 시각**: 2026-09-21 18:10
**작성 세션**: 프로그래머 (Opus 5)
**md오더**: `instructions/programmer/processed/03-statement-kind.md` (개정본 03-remove-status-label)
**핸드오프**: `docs/handoffs/programmer-03-remove-status-label.md`

## 상태
- 사건 상태 라벨·파생 필드·배지 전부 제거 → **단일 게시물 스키마** 완료
- 소재 확장 문구 · 검색엔진 검증 메타태그 env · 폐기 ID 검사 공유(R4) 반영
- 초안 2건을 새 스키마로 변환해 빌드·렌더 실측 후 제거 (변환 frontmatter 전문은 핸드오프에 있음)
- 🔴 **커밋하지 않음** — 리뷰어 07 판정 후 슈퍼바이저

## 검증 숫자 (전부 직접 실측)
- validate 3/3 · typecheck 0 · lint 0 errors(1 warning — 리뷰어 04 도구 파일) · build 경고 0 · 정적 17/17
- 게이트 오류 케이스 **7/7 차단** (status 잔존 / kind·statementType 잔존 / photo에 sources 0 / 필수 누락 / id 중복 / alt 누락 / 폐기 ID 재사용은 `npx next build` 직행에서도 차단)
- 통과 케이스 확인: `url` 유형 `sources` 0건 → 통과
- 초안 2건 투입 시: validate 5/5 · 정적 25/25 · 상세 2건 200 · 캡처 8장
- 검증 메타태그: 값 있을 때 2개 출력 / 없을 때 0개. 🔴 `public/google*.html`·`naver*.html` **삭제하지 않음**(200 응답 확인)
- 라우트 회귀 16/16 · og:image 1·twitter:image 2 유지 · 보안 헤더 6/6 유지
- 렌더 HTML에 상태 라벨 문자열 잔존 **0건** (`/`·`/about`·상세·`llms.txt`)
- 저장소 독립 grep **0건** (41파일)

## 슈퍼바이저가 알아야 할 것
1. **첫 게시는 핸드오프 §초안 2건의 frontmatter를 그대로 복사**하면 된다 — 이미 검증·빌드·렌더를 통과한 내용이다. 초안 원문의 `kind`·`statementType`은 제거했다(그대로 두면 빌드가 막힌다).
2. 초안 2번(`@hanmibro`)의 **게시 가능 여부(정책 판단)는 하지 않았다** — 스키마 변환·렌더 검증만 했다.
3. PRD는 아직 v0.5(상태 라벨 기준) — 기획자 06이 정리할 범위.

## 리뷰어 07 판단 항목
1. 카드에 날짜·유형 푸터를 남긴 판단 (오더 "제목+이미지만" 해석)
2. `url` 유형 `sources` 0건 허용이 편집 정책상 안전한지
3. 폐지 필드를 **오류**로 막는 범위(`kind`·`statementType` 포함)
4. `/about`·`llms.txt` 새 문구가 소재 확장·단정 금지 원칙에 맞는지

## 다음
슈퍼바이저 → 리뷰어 07 (Fable 5.1) 호출
