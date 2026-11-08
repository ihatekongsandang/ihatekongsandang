# md오더: 프로그래머 (Opus 5) - 11-news-format-v0.2-implement

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 11

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙(코드·주석·핸드오프·트리거에 다른 서비스명·계정명·홈 절대경로 금지). 추측 금지 · 빌드·검증 직접 수행.

## 배경
v0.2 뉴스형 전환을 구현한다. 근거 문서는 다음과 같다.
- PRD v0.7(커밋 25e2d5a)
- 시안 `design/news-format-v0.2/`(커밋 fbf7af5)
- 리뷰 25 조건부 승인

사용자 결정은 다음과 같다.
- D1 소개 문구 안 3
- D2 약관 신설
- D4 (가) 링크 복사·X·스레드
- D6 자칭 금지
- 4c 연락 창구 준비 중
- 5a 카드 갱신 7일 표시

### 슈퍼바이저 판단 (리뷰 25 §9 질의에 대한 결정)
1. **약관 페이지는 지금 공개한다.** 사용자 4c 문언("`/about`·`/terms`에 '연락 창구 준비 중' 표시")을 따른다.
   - 연락 창구 자리에 "준비 중"을 표시한다.
   - "처리 기준은 연락 창구가 마련된 뒤부터 적용된다"는 문장을 둔다. 디자이너가 추가한 문장이며, 슈퍼바이저가 채택했다.
   - 처리 기준을 지킬 경로가 아직 없다는 사실을 숨기지 않기 위해서다.
   - 사이트맵·푸터 링크·about→terms 링크도 함께 켠다.
2. **갱신 7일 판정은 A안(빌드 시점 기준)** 으로 한다.
   - 기준 시간대는 Asia/Seoul이다.
   - 갱신일 당일을 1일째로 센다. 경과일이 0~6이면 표시한다. 경계를 정확히 이렇게 구현하고 테스트한다.
   - 표시에는 날짜를 넣는다("11/04 갱신").
   - 정기 재배포(B)·ISR(D)은 쓰지 않는다.
3. **영어 D1 문구**: 시안 03 §1.2의 영어 번역을 쓴다. 의미가 같은지는 리뷰어가 게이트한다.

## 선행 검토 문서 (Required)
- 🔴 리뷰 25 `docs/reviews/designer-02-news-format-v0.2-share-terms-review.md`
  - P2-1·P2-2는 **시안보다 우선**한다.
  - P3-1·2·3·5·6·9·10을 반영한다.
- 시안 `design/news-format-v0.2/` 전부(README·01~05·목업)
- `planning/news-format-v0.2-scope.md`(수용 기준), `planning/terms-page-copy.md`, `planning/prd.md` v0.7
- `content/README.md`(`updatedAt`), `src/lib/config.ts`, `src/lib/view.ts`, `src/components/post-card.tsx`·`post-detail.tsx`·`site-footer.tsx`, about 페이지 ko/en, sitemap, i18n, GA 헬퍼
- 직전 프로그래머 핸드오프, `docs/tools/programmer-07/clean-clone-gate.sh`

## 임무
1. **연락처 박스 교체**(라이브 결함 수정)
   - `/about`·`/en/about`의 `contact@example.invalid` 노출을 모두 없앤다. "연락 창구 준비 중"(ko/en)으로 바꾼다.
   - `config.ts`의 `contactEmail`은 빈 값 또는 `null`로 바꾼다. 쓰는 곳은 모두 "준비 중" 분기로 처리한다.
2. **소개 문구(D1)**
   - ko/en about 본문에 PRD §1 안 3 전문을 넣는다.
   - `SITE.description`·`SITE_EN.description`도 바꾼다. 160자 이하를 확인한다.
3. **공유 버튼 (가)**: 상세 페이지 ko/en에 둔다.
   - 링크 복사: 클립보드에 복사한다. 피드백은 `aria-live`로 준다. `alert`은 쓰지 않는다. `aria-label`은 빼서 보이는 텍스트가 곧 이름이 되게 한다(P3-1).
   - X: `https://x.com/intent/tweet`, `text`·`url`을 인코딩한다. 영어 제목은 가중치 280자를 넘지 않게 자른다(P3-2). `docs/tools/reviewer-25/x-title-length-output.txt`의 24건으로 검증한다.
   - 스레드: `https://www.threads.com/intent/post`.
   - `absoluteUrl` 대체값으로 `window.location.origin`을 쓴다(P3-3).
   - 새 창 안내는 sr-only로 넣는다(P3-10).
   - 외부 SDK·스크립트는 쓰지 않는다. 카카오톡은 제외한다.
   - GA4에 공유 클릭 이벤트(수단별)를 넣는다. 기존 GA 헬퍼를 쓴다.
4. **약관 페이지** `/terms`·`/en/terms`
   - 시안 02와 `terms-page-copy.md`대로 만든다.
   - 메타 title·description·canonical·hreflang을 설정하고 사이트맵에 넣는다.
   - 푸터 링크를 넣는다(시안 04).
   - about→terms 링크는 정정·삭제 요청 절의 끝에 둔다(P3-9).
5. **카드 갱신 표시(5a)**
   - `PostCardView`에 `updatedAt`을 추가한다(P3-6).
   - **Badge를 쓰지 않는다.** CardFooter에 평문 span으로 둔다(P2-1).
   - `aria-label` 대신 sr-only 텍스트를 쓴다(P2-2).
   - 판정은 위 슈퍼바이저 판단 2를 따른다. 단위 테스트(또는 검증 스크립트)로 경계값 0·6·7일과 시간대를 확인한다.
6. **D6 자칭 금지**: 새로 넣는 UI 문구에 "기자·속보·본지·편집국·바이라인"이 없는지 grep으로 확인한다.
7. **검증**
   - `npm run build`(validate 포함), 타입체크, 린트를 통과한다.
   - 로컬 프로덕션 서버(`npx next start`)로 대상 페이지 ko/en을 직접 확인한다.
   - 접근성을 직접 확인한다: 포커스 이동, 대비, 스크린리더 이름. 결과는 `docs/tools/programmer-11/`에 남긴다.
   - `docs/tools/programmer-07/clean-clone-gate.sh --staged`에 해당하는 검증을 할 수 있으면 미리 실행해 둔다(커밋은 슈퍼바이저).

## 산출물 (Required)
- 코드 변경
- 검증 기록 `docs/tools/programmer-11/`
- 핸드오프 `docs/handoffs/programmer-11-news-format-v0.2-implement.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-11-news-format-v0.2-implement-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 변경 파일 목록
  - 임무별 완료 여부
  - 빌드·검증 결과(숫자)
  - 리뷰 25 반영 표
  - 커밋 대상 경로 목록
- 처리 후 본 파일 → `instructions/programmer/processed/` 이동

## 제약
- `content/`·PRD·guide·시안 수정 금지.
- 새 의존성 설치 금지. 필요하면 멈추고 보고한다.
- git add·commit·push 금지. 커밋은 리뷰 후 슈퍼바이저가 한다.
- 🔴 빌드는 이 세션만 한다. 다른 세션과 `.next` 충돌을 피한다.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 11-news-format-v0.2-implement`
- history append
- 완료 시 반공-슈퍼바이저에 SendMessage
