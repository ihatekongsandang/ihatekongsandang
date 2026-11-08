# md오더: 리뷰어 (Opus 5.5) - 26-programmer-11-news-format-v0.2-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 26

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지, 근거 없으면 "확인 필요".

## 배경
프로그래머 11이 v0.2 뉴스형 전환을 구현했다. 커밋 전 §5 게이트다. 구현 범위는 다음과 같다.
- 연락처 "준비 중"
- D1 소개 문구
- 공유 버튼(링크 복사·X·스레드)
- `/terms`·`/en/terms`
- 카드 갱신 7일 표시

프로그래머가 보고한 확인 요청은 다음과 같다.
- 영어 D1은 시안에 영어 문구가 없어 프로그래머가 직접 번역했다.
- 약관 문안 밖 문장 4개(핸드오프 결정 3)
- 🟠 소개(ko)와 약관의 문구 불일치 2건. 하나는 개인정보("수집하지 않습니다" vs "GA4 집계"), 다른 하나는 매체 등록(리뷰 24 P3-1이 오기로 정정한 표현이 소개에 남아 있음)이다.
- 약관 "위 4항" 번호가 화면 절 제목과 맞지 않는다.
- X 제목을 자르면 인용부호가 닫히지 않은 채 끝난다.
- 사진형 상세는 실측하지 못했다(해당 게시물 0건).

## 선행 검토 문서 (Required)
- 대상
  - `docs/triggers/programmer-11-news-format-v0.2-implement-COMPLETE.md`
  - `docs/handoffs/programmer-11-news-format-v0.2-implement.md`
  - `docs/tools/programmer-11/` 전부
  - 트리거 "커밋 대상 경로"의 `src/` 파일 전부(`git diff`·신규 파일)
- 오더 `instructions/programmer/processed/11-news-format-v0.2-implement.md`. 슈퍼바이저 판단 1~3이 들어 있다.
- 리뷰 25 `docs/reviews/designer-02-news-format-v0.2-share-terms-review.md`, 리뷰 24
- 시안 `design/news-format-v0.2/`, `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/prd.md` v0.7

## 임무 (CLAUDE.md §5 프로그래머 중점)
1. **scope 수용 기준·리뷰 25 반영표 전수 대조**: 트리거 표의 각 항목을 코드에서 직접 확인한다.
2. **코드 정확성**
   - 갱신 판정: 경계 0·6·7일, Asia/Seoul, 빌드 시점. `renewal-check.ts`를 재실행한다.
   - X 가중치 자르기: `share-check.ts`를 재실행하고, 24건이 리뷰 25 목록과 같은지 본다.
   - URL 인코딩, origin 대체값
   - GA 이벤트: GA ID가 없을 때도 안전한지 본다.
   - `contactEmail: null` 분기가 쓰이는 곳 전부(llms.txt·seo 포함)
   - sitemap·hreflang·canonical
3. **접근성 재실측**: `node docs/tools/programmer-11/a11y-e2e.mjs`를 재실행한다(README 참조). 숫자가 172/172로 같은지 확인한다.
   - 🔴 빌드·`next start`는 이 세션만 한다. 다른 세션과 `.next` 충돌을 피한다.
4. **문구 게이트**
   - 영어 D1이 ko 안 3과 의미가 같은지 본다.
   - 문안 밖 문장 4개를 본다.
   - D6 자칭 금지어 grep 결과를 재현한다.
5. **🟠 배포 차단 여부 판정**: 미해결 1~3 각각에 대해 판정한다.
   - 이번 커밋에서 고쳐야 하는지(차단), 다음 기획 손질로 미뤄도 되는지 정한다.
   - 특히 미해결 1은 약관 신설로 두 페이지가 나란히 공개된다. 이 점을 감안해 판단한다.
   - 차단이면 수정할 정확한 문구 안을 제시한다. 기획자 확정이 필요하면 그렇게 표시한다.
6. **저장소 독립·보안**: diff에 다른 서비스명·계정·홈 절대경로가 없는지 본다. 외부 스크립트·SDK가 0인지, 클라이언트 번들에 비밀값이 없는지 본다.

## 산출물 (Required)
- 리뷰 `docs/reviews/programmer-11-news-format-v0.2-implement-review.md` (도구는 `docs/tools/reviewer-26/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-26-programmer-11-news-format-v0.2-review-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정(승인/조건부/반려)
  - 결함 P1~P3
  - 배포 차단 항목과 수정 문구 안
  - 사용자 결정 필요
  - 커밋 대상 경로 목록(리뷰 산출물 포함)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
- 대상 코드·문서 수정 금지. git 금지. 의존성 설치 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 26-programmer-11-news-format-v0.2-review`
- history append. 완료 시 반공-슈퍼바이저에 SendMessage
