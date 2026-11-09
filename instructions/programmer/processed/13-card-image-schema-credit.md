# md오더: 프로그래머 (Opus 5) - 13-card-image-schema-credit

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 13

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 수행한다. CLAUDE.md §1~§9를 지킨다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다. 빌드와 검증은 직접 한다.

## 배경
사용자 결정(2026-11-09):
- 자체 제작 텍스트 카드를 실제 사진으로 바꾼다. 순서는 A 공공누리, 그다음 B 근거 언론 기사 `og:image` 핫링크다.
- 공인의 공적 활동 사진은 허용한다.

리뷰 30은 정책을 조건부로 승인했다. 프로그래머 착수 조건은 "지금 착수 가능, P1~P4·P6·P7·P9·P11 먼저"다. 이번 오더는 그 범위만 다룬다. 게시물 데이터(`content/`)는 바꾸지 않는다. 데이터는 업로더가 나중에 넣는다.

## 선행 검토 문서 (Required)
- 🔴 `planning/card-image-policy.md` §5 P1~P12
- 🔴 리뷰 30 `docs/reviews/card-image-policy-legal-review.md`와 트리거 `docs/triggers/reviewer-30-card-image-policy-legal-review-COMPLETE.md`: 착수 조건 2의 완화책
- `content/README.md` §3, `src/lib/content/` 스키마·validate, `card-media`·`post-card`·`post-detail` 컴포넌트, `next.config`·헤더·CSP
- 디자인 개편이 진행 중이다(`design/v0.3-responsive/`, 아직 미확정). 카드 UI는 지금 바꾸지 않는다. 상세 figcaption만 최소한으로 넣는다.

## 임무
1. **P1·P2 스키마·검증**
   - `PostImage`에 다음 필드를 추가한다: `kind`(self/public/news), `creditName`, `creditNameEn`, `sourcePageUrl`, `license`, `retrievedAt`, `faceNote`.
   - `kind: news`일 때만 https `src`를 허용한다. 포털 도메인(다음·네이트·네이버 뉴스 등)은 거부한다. `sourcePageUrl`은 `sources[].url` 중 하나여야 한다.
   - `kind: public`은 `license`(`kogl-1`만 허용, `kogl-3`은 오류. P5 미구현)와 크레딧을 필수로 한다.
   - `kind: news`와 `kind: public`은 `faceNote`를 필수로 한다.
   - 기존 207건은 `kind`가 없어도 통과해야 한다(기본값 self).
2. **P3 `resolveCardMedia`**: `kind: news`이면 remote를 반환하고, alt는 `image.alt`를 쓴다. 크레딧을 `CardMedia`에 싣는다.
3. **P4 상세 figcaption**
   - ko: `사진: {creditName}`. en: `Photo: {creditNameEn}`.
   - `sourcePageUrl` 링크를 단다(`rel="noopener"`, 새 창 sr-only 안내).
   - public이면 공공누리 유형 문구를 함께 넣는다.
   - 카드에는 손대지 않는다.
4. **P6**
   - `<img>` 직접 참조를 유지한다.
   - 차단을 우회하는 `referrerpolicy` 변경은 금지한다.
   - 사이트 `Referrer-Policy` 헤더 현황을 보고한다.
5. **P7**: CSP `img-src https:`를 확인한다. 바꾸지 않는다.
6. **P9 핫링크 점검 스크립트**
   - 빌드와 분리한 비차단 스크립트로 만든다(`npm run check:hotlinks` 등).
   - 네트워크 실패가 빌드를 실패시키지 않게 한다.
7. **P11**
   - JSON-LD·사이트맵·공유 OG에 A·B 이미지가 들어가지 않는지 테스트한다.
   - 공유 OG는 자체 이미지를 유지한다.
8. **테스트 픽스처**
   - 검증 규칙의 통과·거부 사례를 각각 단위 테스트로 확인한다. 스크립트도 된다.
   - 실제 언론 이미지 URL을 커밋하지 않는다. `example.org` 같은 예시 도메인을 쓴다.
9. **검증**
   - build·typecheck·lint를 통과시킨다.
   - 기존 a11y-e2e(programmer-12 사본)를 재실행한다. 기존 수치와 같아야 한다.
   - `clean-clone-gate.sh --worktree`를 돌린다.
   - 결과는 `docs/tools/programmer-13/`에 남긴다.

## 산출물 (Required)
- 코드 변경
- 검증 기록 `docs/tools/programmer-13/`
- 핸드오프 `docs/handoffs/programmer-13-card-image-schema-credit.md`
  - `content/README.md` 갱신 문안(P12)은 핸드오프에 초안으로만 둔다.

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-13-card-image-schema-credit-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - P별 완료 여부
  - 검증 숫자
  - Referrer-Policy 현황
  - 커밋 대상 경로
- 처리를 마치면 본 파일을 `instructions/programmer/processed/`로 옮긴다.

## 제약
- 다음은 수정하지 않는다: `content/`·`public/images/`·planning·guide·design, 카드 UI.
- P5·P8·P10·P12는 이번 범위 밖이다.
- 새 의존성 금지. git 금지. 빌드는 이 세션만 한다.

## 완료 보고
- 서두는 `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 13-card-image-schema-credit`으로 쓴다.
- history에 append한다.
- 완료 시 반공-슈퍼바이저에 SendMessage로 알린다.
