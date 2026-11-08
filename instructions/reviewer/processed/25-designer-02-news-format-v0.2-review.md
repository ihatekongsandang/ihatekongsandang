# md오더: 리뷰어 (Opus 5.5) - 25-designer-02-news-format-v0.2-review

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 25

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지, 근거 없으면 "확인 필요".

## 배경
디자이너 02가 v0.2 뉴스형 전환 시안을 냈다. 대상은 다섯 가지다.
- 공유 버튼: 링크 복사·X·스레드
- 약관 페이지
- 소개 문구 자리
- 푸터 약관 링크
- 카드 갱신 표시: 사용자 5a 확정, 7일

연락처는 사용자 4c 결정에 따라 "연락 창구 준비 중"으로 표시한다.

디자이너가 보고한 주요 사항은 네 가지다.
- 오더에 적힌 intent URL 두 개를 공식 문서로 정정했다. X는 `intent/tweet`, 스레드는 `www.threads.com/intent/post`다.
- 카드의 "7일" 표시는 SSG 빌드 시점 기준이라는 한계가 있다.
- 기존 outline 버튼 테두리 대비가 1.27:1이다(기존 이슈).
- PRD §6⑤의 갱신 이력 한 줄이 상세 페이지에 아직 구현되지 않았다.

## 선행 검토 문서 (Required)
- 대상: `design/news-format-v0.2/` 전부, `docs/handoffs/designer-02-news-format-v0.2-share-terms.md`, `docs/triggers/designer-02-news-format-v0.2-share-terms-COMPLETE.md`
- 오더 `instructions/designer/processed/02-news-format-v0.2-share-terms.md`
- `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/prd.md` v0.7, 리뷰 24
- 관련 코드(읽기): `src/components/post-card.tsx`, `post-detail.tsx`, `site-footer.tsx`, about 페이지 ko/en, `src/lib/config.ts`, Tailwind·UI 토큰, `content/README.md`

## 임무 (CLAUDE.md §5 디자이너 중점: 브랜드 일관성·접근성·모바일/데스크톱 차별화)
1. **scope 수용 기준 충족**: scope의 수용 기준 전부를 시안과 대조한다(전수).
2. **intent URL 정정 검증**: X와 스레드 공식 문서를 직접 확인한다. 쿼리 파라미터 이름과 인코딩도 본다.
3. **접근성**: 대비 계산을 재현한다. 포커스, 레이블, `aria-live`, 터치 영역, 스크린리더 문구(갱신 표시 포함)를 본다. 1.27:1 기존 이슈를 이번 범위 밖으로 둔 판단이 적절한지 판정한다.
4. **갱신 7일 판정 한계**: `updatedAt` 날짜 필드와 SSG·재배포 조건에서 구현할 수 있는지 본다. 프로그래머에게 넘길 선택지(빌드 시점 기준 허용 / 정기 재배포 / 클라이언트 계산)와 각각의 장단점을 정리한다. 사용자 결정이 필요하면 표시한다.
5. **편집 제약 D6**: 시안 UI 문구에 "기자·속보·본지·편집국" 같은 자칭 표현이 없는지 본다. "보도 정리" 성격이 드러나는지 본다.
6. **구현 가능성**: 프로그래머가 시안 그대로 구현할 수 있는지 본다(토큰·클래스·상태가 실재하는지).

## 산출물 (Required)
- 리뷰 `docs/reviews/designer-02-news-format-v0.2-share-terms-review.md` (도구는 `docs/tools/reviewer-25/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-25-designer-02-news-format-v0.2-review-COMPLETE.md` **완료 트리거 파일 생성 필수** (판정·결함·사용자 결정 필요·프로그래머 착수 조건·커밋 대상 경로 목록)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
- 대상 수정 금지. git 금지. 빌드 불필요(목업 HTML은 파일로 열어 봐도 된다).

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 25-designer-02-news-format-v0.2-review`
- history append. 완료 시 반공-슈퍼바이저에 SendMessage
