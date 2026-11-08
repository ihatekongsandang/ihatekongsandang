# 디자이너 세션 — 02-news-format-v0.2-share-terms 핸드오프
**작성일**: 2026-11-08 23:21 | **작성 세션**: 디자이너 (Sonnet 5)

## 요약 (3줄)
- 공유 버튼(링크 복사·X·스레드)·약관 페이지(`/terms`·`/en/terms`)·소개 페이지 D1 문구 위치·연락 창구 준비 중 표시·푸터 약관 링크·카드 갱신 표시(5a, 7일) 5개 임무를 전부 `design/news-format-v0.2/`에 토큰·클래스·상태 단위로 명세했다. 새 색·새 컴포넌트 variant 없이 기존 `Badge`·`buttonVariants`·`Section` 패턴만 재사용했다.
- 오더 원문의 X·스레드 intent URL(`x.com/intent/post`, `threads.net/intent/post`)을 공식 문서로 직접 확인(WebFetch)한 결과 **둘 다 틀렸다** — 정정된 URL(`x.com/intent/tweet`, `www.threads.com/intent/post`)과 파라미터 전부를 `01-share-buttons.md`에 근거 URL과 함께 적었다.
- 카드 갱신 표시는 `content/README.md`의 `updatedAt`(날짜 전용) 필드로 7일 판정이 **가능**하지만, 이 사이트가 파일 기반 SSG·예약 재배포 없음이라 "7일"이 실제 날짜가 아니라 **마지막 빌드 시점** 기준이 된다는 한계를 발견해 프로그래머 확인 필요로 명시했다.

## 산출물
| 경로 | 설명 |
|---|---|
| `design/news-format-v0.2/README.md` | 색인 + 확인 필요 항목 요약 + 접근성 점검 결과(계산값) |
| `design/news-format-v0.2/01-share-buttons.md` | 공유 버튼 배치·intent URL(정정본)·상태·`i18n` 키·GA4 `share` 이벤트 제안 |
| `design/news-format-v0.2/mockup-share-buttons.html` | 공유 버튼 모바일/데스크톱 목업 + 상태 5종 스와치(단독 HTML) |
| `design/news-format-v0.2/02-terms-page.md` | 약관 페이지 구조·위계·"확인 필요"/"연락 창구 준비 중" 표현 방식 |
| `design/news-format-v0.2/03-about-intro-contact.md` | D1 문구 위치(기존 `SITE.description` 자리 재사용)·연락처 박스 교체안(ko/en) |
| `design/news-format-v0.2/04-footer-terms-link.md` | 푸터 약관 링크 마크업("·"로 기존 소개 링크와 한 줄) |
| `design/news-format-v0.2/05-post-card-renewal-badge.md` | 카드 갱신 배지 위치·크기·색·ko/en 표기·7일 판정 데이터 가능성·빌드 시점 한계 |
| `design/news-format-v0.2/mockup-post-card-renewal.html` | 카드 갱신 배지 4가지 상태 목업(단독 HTML) |
| `docs/triggers/designer-02-news-format-v0.2-share-terms-COMPLETE.md` | 완료 트리거 |

## 주요 결정사항 (자체 판단 + 근거)
1. **X·스레드 아이콘을 쓰지 않고 텍스트 레이블만 쓴다**(`01` §2.0). `lucide-react`(v0.545.0)의 `twitter` 아이콘은 옛 새 로고(리브랜딩 전)이고 `x` 아이콘은 닫기(×) 모양이라 오인 소지가 있다. 스레드 브랜드 아이콘은 lucide에 없다. "담백하게" 톤과도 맞아 텍스트만 쓰는 쪽을 택했다.
2. **공유 버튼 바 위치를 상세 페이지 헤더 바로 다음(원문 미리보기/사진 앞)으로 정했다**(`01` §1). 카드가 "제목+이미지"뿐이라 상세의 제목·요약이 사실상 카드의 연장이고, 독자가 본문·이미지를 다 읽기 전에 공유를 결정하는 경우가 많다고 판단했다. 바닥에도 중복 배치하지 않아 범위를 늘리지 않았다.
3. **공유 버튼은 `h-11`(44px) 인라인 override만 쓰고 `buttonVariants`(cva) 자체는 고치지 않았다**(`01` §2.1) — 전역 컴포넌트 변경은 다른 모든 기존 버튼(원문 기사로 이동 등)에 영향을 줘 이 오더 범위(이 컴포넌트)를 넘는다.
4. **D1 소개 문구는 새 섹션을 만들지 않고 기존 `SITE.description` 자리를 그대로 쓴다**(`03` §1.1). 새 섹션을 또 만들면 "운영 방식" 섹션 첫 항목과 내용이 겹친다.
5. **연락처 박스를 `bg-surface`(실선)에서 `border-dashed`(배경 없음)로 바꾼다**(`03` §2.2). 지금은 누를 mailto가 없으므로 "행동 유도 상자"처럼 보이면 안 된다고 판단했다. 기존 `postNotice`(상세 페이지) 박스와 같은 스타일로 통일했다.
6. **카드 갱신 배지는 새 색·새 variant 없이 기존 `Badge`를 그대로 쓴다**(`05` §2.2). "사건 상태 배지 폐지" 정신(상태를 색으로 과장하지 않는다)을 갱신 표시에도 적용했다 — 갱신은 사실 확인 단계가 아니라 최신성 정보일 뿐이다.
7. **공유 버튼 테두리의 비텍스트 대비(계산값 1.27:1, WCAG 1.4.11 미달)를 고치지 않고 "확인됨/기존 시스템 전역 이슈"로만 기록했다**(`01` §5, `README.md`). 이 사이트의 모든 outline 버튼이 이미 같은 값을 쓰고 있어, 이 컴포넌트만 다르게 만들면 리뷰어 중점 "브랜드 일관성"을 해친다고 판단했다.

## 미해결·이슈 (다음 세션이 알아야 할 것)
- 🔴 **프로그래머 확인 필요 — 카드 갱신 7일 판정의 빌드 시점 한계**(`05` §3). SSG + 예약 재배포 없음이라 "7일"이 실제 달력일이 아니라 마지막 빌드 시점 기준이 된다. 현재 그대로 둘지, Vercel Cron으로 매일 재빌드할지, 클라이언트 측 판정으로 옮길지 프로그래머가 확인·선택해야 한다.
- 🔴 **X·스레드 intent URL 정정 — 오더 원문과 다름**. 오더는 `x.com/intent/post`·`threads.net/intent/post`라고 썼으나 공식 문서(2026-11-08 WebFetch 직접 확인)는 `x.com/intent/tweet`·`www.threads.com/intent/post`다. 구현 시 이 문서가 적은 정정본을 쓸 것.
- 🟡 **PRD §6⑤ "갱신 이력 한 줄"(상세 페이지)이 코드에 없음**(`05` §4, 직접 코드 확인). 카드 배지와 충돌은 없지만(같은 날짜를 가리킴), 갱신 이력 문장 자체의 구현 여부는 이번 오더 범위가 아니라 별도 확인이 필요하다.
- 🟡 **`/en/about`에 "출처 정책"·"표기 원칙"·"인용·저작권" 절이 없음**(`03` §1.2, 기존 scope P3-11 참고). D1 문구 위치에는 영향 없지만, 전체 섹션 보강은 범위 밖으로 남겼다.
- 약관 페이지·푸터 링크는 **연락 경로 사용자 결정 전까지 라우팅을 보류**할 것을 제안했다(`02` §6, `04` §4). `/about`·`/en/about`의 연락처 박스 교체는 이와 무관하게 **지금 반영 가능**(결함 수정이라 선행조건 없음).
- `design/backlog.md`는 아직 존재하지 않는다(이번이 `design/` 최초 사용) — CLAUDE.md 문서 구조상 top-level `design/`을 처음 만들었다. 이전 디자이너 01 산출물은 `docs/design/designer-01/`에 있어 경로 관례가 섞여 있다. 다음 디자이너 세션이 참고할 때 두 위치 모두 확인할 것.

## 다음 세션 가이드 (누가·무엇을·어떻게)
- **프로그래머**: `design/news-format-v0.2/01`~`05` 순서대로 구현. `i18n.ts` Dictionary 키 추가분은 각 문서 표에 ko/en 값 전부 있음. intent URL은 이 문서의 정정본 사용. GA4 `share` 이벤트(`analytics.ts`)와 카드 갱신 7일 판정 방식(위 미해결 1번)을 먼저 확인한 뒤 착수.
- **리뷰어**: `README.md`의 "확인 필요 항목"·"접근성 점검 결과" 표를 먼저 본 뒤 구현 결과 대조. intent URL이 실제 공식 문서와 일치하는지, 클립보드 실패 폴백이 `alert()` 없이 동작하는지, 카드 갱신 배지가 7일 경계에서 어떻게 동작하는지(빌드 시점 기준으로 설계됐음을 알고 판단) 확인.
- **슈퍼바이저**: 연락 경로 사용자 결정이 나오면 `03`·`02`의 "연락 창구 준비 중" 자리를 실제 값으로 교체하는 후속 오더 발주. `/about`·`/en/about` 연락처 박스 교체는 그 결정과 무관하게 바로 진행 가능.

## 참고 링크
- 오더: `instructions/designer/02-news-format-v0.2-share-terms.md` (처리 후 `processed/`로 이동)
- 근거: `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/prd.md`(v0.7), `docs/reviews/planner-09-prd-v0.7-news-format-review.md`(리뷰 24), `content/README.md`
- 공식 문서(intent URL 확인): `https://docs.x.com/x-for-websites/web-intents/overview`, `https://developers.facebook.com/documentation/threads/threads-web-intents`
- GA4 공식 추천 이벤트 확인: `https://developers.google.com/analytics/devguides/collection/ga4/reference/events`
