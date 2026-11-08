# md오더: 디자이너 (Sonnet 5) - 02-news-format-v0.2-share-terms

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 02

## 자격·역할 (Required)
디자이너 (Sonnet 5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙(다른 서비스명·계정명·홈 절대경로 금지). 추측 금지.

## 배경
사용자가 뉴스형 전환 D1~D6을 확정했다(PRD v0.7, 커밋 25e2d5a). v0.2 구현 범위는 `planning/news-format-v0.2-scope.md`에 있다. 이번 디자인 대상은 아래 셋이다.
- **공유 버튼 (가)**: 링크 복사·X·스레드. 카카오톡은 제외한다.
- **약관 페이지** `/terms`·`/en/terms`: 문안은 `planning/terms-page-copy.md`에 있다.
- **소개 페이지 문구 교체 자리**와 **푸터 약관 링크**.

연락 창구는 사용자 결정 2026-11-08 "4c"에 따른다.
- 전용 창구가 생기기 전까지 `/about`·`/terms`에는 **"연락 창구 준비 중"**으로 표시한다.
- 지금 노출된 `contact@example.invalid`는 메일이 전달되지 않는 주소이므로 화면에서 없앤다.

**카드 "갱신" 표시**는 사용자가 2026-11-08 **"5a"로 확정**했다. 기존 게시물에 새 보도가 추가되면 갱신 후 **7일 동안** 카드에 작은 "MM/DD 갱신" 글자를 표시한다. 이 결정으로 카드 사양 "제목 + 이미지"에 요소가 하나 추가된다(근거 `planning/news-format-conversion.md` §3.3, scope 작업 4).

## 선행 검토 문서 (Required)
- `planning/news-format-v0.2-scope.md`(수용 기준), `planning/terms-page-copy.md`, `planning/prd.md` v0.7(§1·§6⑥·§7)
- 리뷰 24 `docs/reviews/planner-09-prd-v0.7-news-format-review.md`
- `design/` 기존 시안·`design/backlog.md`, 직전 디자이너 핸드오프(`docs/handoffs/designer-01-*`)
- 현재 코드(읽기만): `src/app/(ko)/post/`, `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`, `src/components/site-footer.tsx`, `src/lib/config.ts`, Tailwind 토큰

## 임무
1. **공유 버튼 시안**: 상세 페이지 안 위치, 모바일·데스크톱 배치, 아이콘과 텍스트 레이블을 정한다. 링크 복사 성공 피드백은 alert를 쓰지 않는다.
   - 접근성(WCAG 2.2 AA): 대비, 포커스 표시, 레이블, 터치 영역 24px 이상(권장 44px), `aria-live` 피드백.
   - 외부 SDK·외부 스크립트를 쓰지 않는다. 공유는 web intent URL로만 한다(X: `https://x.com/intent/post?...`, 스레드: `https://www.threads.net/intent/post?...`).
   - 이 intent URL 형식은 공식 문서로 확인하고, 근거 URL을 적는다. 확인하지 못하면 "확인 필요"로 둔다.
2. **약관 페이지 시안**: 기존 `/about`과 같은 톤("담백하게")으로 만든다. 6개 항목의 구조, 제목 위계, "확인 필요" 문구의 표현 방식을 정한다. "연락 창구 준비 중" 표시 방식도 정한다.
3. **소개 페이지**: D1 안 3 문구가 들어갈 위치와 "연락 창구 준비 중" 표시 위치를 정한다(ko/en).
4. **푸터**: 약관 링크를 넣을 자리를 정한다.
4-1. **카드 갱신 표시(5a)**: `src/components/post-card.tsx`에서 표시 위치, 크기, 색, 대비를 정한다. 카드가 제목과 이미지 중심이라는 점은 유지한다. 7일 판정 기준(어느 날짜 필드, 빌드 시각인지 날짜 단위인지)이 데이터상 가능한지 `content/README.md`와 갱신 이력 형식에서 확인하고, 불가능하면 "프로그래머 확인 필요"로 적는다. ko/en 표기(예: "11/04 갱신" / "Updated Nov 4")와 스크린리더용 문구도 정한다.
5. 프로그래머가 그대로 구현할 수 있게 만든다. 토큰, 클래스, 상태(기본·hover·focus·복사됨)를 구체적으로 적는다.

## 산출물 (Required)
- 시안 `design/news-format-v0.2/`(마크다운 사양과 필요하면 HTML 목업)
- 핸드오프 `docs/handoffs/designer-02-news-format-v0.2-share-terms.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/designer-02-news-format-v0.2-share-terms-COMPLETE.md` **완료 트리거 파일 생성 필수** (산출물 목록·접근성 점검 결과·확인 필요 항목)
- 처리 후 본 파일 → `instructions/designer/processed/` 이동

## 제약
- `src/`·`content/`·PRD·guide 수정 금지. 의존성 설치 금지. git 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 디자이너 (Sonnet 5) · 02-news-format-v0.2-share-terms`
- history/{오늘}.md append. 완료 시 반공-슈퍼바이저에 SendMessage
