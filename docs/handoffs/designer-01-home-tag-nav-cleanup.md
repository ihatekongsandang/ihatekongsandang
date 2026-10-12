# 디자이너 세션 — 01-home-tag-nav-cleanup 핸드오프
**작성일**: 2026-10-12 | **작성 세션**: 디자이너 (Sonnet 5)

## 요약 (3줄)
- 배포본에서 태그 297개(1건 190개·5건 이상 25개·10건 이상 12개) 분포를 직접 재검증했고, 슈퍼바이저 실측과 전 항목 일치했다.
- 메인 태그 영역 높이·첫 카드까지 스크롤량을 두 뷰포트(1920px/585px — 도구 제약으로 1280px·390px 정확 재현 실패)에서 실측하고, 서로 다른 방향의 시안 3개(A: 상위N+/tags 페이지, B: 가로 스크롤+펼치기, C: 접힘+검색)를 단독 HTML 목업으로 만들었다.
- A(상위 12개 + 신규 `/tags` 허브 페이지)를 권고한다 — 서버 컴포넌트 유지·SEO 명확성·구현 범위 최소가 근거.

## 산출물
| 경로 | 설명 |
|---|---|
| `docs/design/designer-01/proposal.md` | 실측표·시안 3개 비교표·권고안·태그 정리 후보 |
| `docs/design/designer-01/current-desktop-1920-home.jpg` | 현상 스크린샷(데스크톱급, 메인) |
| `docs/design/designer-01/current-desktop-1920-tag.jpg` | 현상 스크린샷(데스크톱급, `/tag/이재명`) |
| `docs/design/designer-01/current-narrow-585-home.jpg` | 현상 스크린샷(모바일 분기, 메인) |
| `docs/design/designer-01/current-narrow-585-tag.jpg` | 현상 스크린샷(모바일 분기, `/tag/이재명`) |
| `docs/design/designer-01/mockup-a-top-n-tags-page.html` | 시안 A 단독 목업 |
| `docs/design/designer-01/mockup-b-scroll-chips.html` | 시안 B 단독 목업 |
| `docs/design/designer-01/mockup-c-collapse-search.html` | 시안 C 단독 목업 |

## 주요 결정사항 (자체 판단 + 근거)
- **데스크톱/모바일 실측 뷰포트를 1280px/390px 대신 1920px/585px로 대체**: `resize_window` 툴이 여러 값(1280·1920·2560 등)으로 반복 요청해도 실제 `window.innerWidth`를 바꾸지 못했다(탭별로 585 또는 1920에 고정). 재시도 한계(2~3회)를 넘겨 추가 시도하지 않고, `matchMedia`로 두 값이 각각 Tailwind 전체 브레이크포인트 미만/이상임을 확인해 "모바일 분기/데스크톱 분기" 실측 목적은 달성했다고 판단했다. proposal.md §0에 명시.
- **시안 A 권고**: `feed-view.tsx`의 기존 주석("영어 피드 RSC 트리를 이전과 같게 유지")에서 이 코드베이스가 서버 컴포넌트 유지를 중시한다는 신호를 읽었고, B/C는 `TagNav`를 클라이언트 컴포넌트로 바꿔야 해 이 방향과 어긋난다고 판단했다.
- **태그 정리 후보 3건으로 좁힘**: DOM 전수 비교에서 substring 포함 관계 57쌍이 나왔으나, 대부분(`중국`/`중국공산당`, `북한`/`북한군` 등)은 포함 관계의 서로 다른 구체 주제라 판단해 제외했다. 실제 "같은 대상의 표기 분리"로 보이는 것만 남겼다: `6-25전쟁`/`625전쟁`(오더에는 없던 신규 발견), `지뢰`/`목함지뢰`(오더 예시), 영문 소문자 5개(`dmz` 포함, 오더 예시).

## 미해결·이슈 (다음 세션이 알아야 할 것)
- **확인 필요**: `/tag/[slug]` 상세 페이지의 `TagNav`에도 A안의 12개 상한을 적용할지, 상세 페이지는 전체 노출을 유지할지는 정책 판단 필요 — 사용자 또는 슈퍼바이저 결정 대기.
- **도구 제약**: 이 환경의 `mcp__claude-in-chrome__resize_window`가 사실상 무반응이었다(성공 메시지는 반환하나 `innerWidth` 불변). 다음에 디자이너·테스터가 이 도구로 임의 폭을 실측해야 하는 오더를 받으면 먼저 `matchMedia`로 실제 반영 여부를 확인할 것.
- `6-25전쟁`/`625전쟁` 병합은 상위 태그 순위에 영향을 줄 수 있어(둘 다 상위권은 아니지만 합치면 순위 변동 가능) 콘텐츠 정리 시 재집계 필요.

## 다음 세션 가이드 (누가·무엇을·어떻게)
- **사용자/슈퍼바이저**: 시안 A/B/C 중 확정, `/tag/[slug]` 적용 범위 결정.
- **프로그래머**: A 채택 시 `src/app/(ko)/tags/page.tsx` 신규 + `TagNav` `slice(0, 12)` + "전체 태그 보기" 링크 추가. `/tag/[slug]`도 동일 적용 여부는 위 미해결 사항 확인 후 진행.
- **리뷰어**: 접근성(`aria-current`·`sr-only` 유지 여부), SEO(내부링크 보존), SSG(서버 데이터 의존 없음) 3축 확인.

## 참고 링크
- 오더: `instructions/designer/01-home-tag-nav-cleanup.md` (처리 후 `processed/`로 이동)
- 배포본: https://ihatekongsandang.vercel.app/
