# 프로그래머 세션 — 14-responsive-redesign-implement 핸드오프
**작성일**: 2026-11-09 15:10 | **작성 세션**: 프로그래머 (Opus 5.5 — 실행 모델 ID `claude-opus-5-5`. 오더 표기는 Opus 5)

## 요약 (3줄)
1. 보강안 `design/v0.3-responsive/final/` 구현 범위 1~16을 구현했다(16 스키마는 13에서 끝남). 사용자 결정 D1(하단 띠 52px)·D2("다음 페이지 N / M" + 쪽 번호, 전부 `<a href>`)·D3(영어 부제 768 미만 h1 둘째 줄)·D4(카드엔 이미지만)·D7("링크" 표기 전부 제거)과 U2(다크 없음)·U5(시스템 폰트)를 반영했다.
2. 로컬 `next start` 실측이 보강안 측정값과 같거나 목표 안이다 — 판정 16항목 미달 0(360 첫 화면 카드 4장·y=247, 머리 190, 영어 헤더 57, 상세 ko 42.7·en 61.6자/줄, 44px 미만 0, 대비 미달 0/2,569, 리플로우 넘침 0/66, Tab 포커스 표시 없음·가림 0/159).
3. 회귀: a11y-e2e 184/184(위치 검사 1종만 갱신), copy-exact 38/38, 소개·약관 글자 4/4 같음, 메타·JSON-LD·사이트맵 799/799 같음, 13 도구 104·22·52 통과, 전체 lint 0 errors, **clean-clone-gate `--worktree` 통과**(추가 임무 0 처리).

## 산출물
| 경로 | 설명 |
|---|---|
| `src/app/globals.css` | 토큰(`--line-strong` 3.81·`--icon`·`--surface` #f4f4f5·`--header-h`·`--banner-h`·`--measure` 612/561·모서리 8), `keep-all`+`overflow-wrap:anywhere`, 본문 17/1.75, 소개·약관 읽기 체계(`.reading-page`), 홈 소개 접힘(`.feed-intro`), 태그 레일(`.tag-rail`) |
| `src/components/site-header.tsx`·`english-site-heading.tsx` | 한 줄 56px, 링크 44px, 상대 언어 링크 하나, 영어 부제 768 이상만 헤더(D3) / 영어 피드 h1 둘째 줄 |
| `src/components/page-frame.tsx`·`site-footer.tsx` | gutter 16/32/40/48, 푸터 링크 44px 목록(md 가로) |
| `src/components/feed-view.tsx` | h1 한 줄, 소개 `<details>` 한 줄 접힘(md 이상 전문), "최신 게시물" 줄, 태그 피드 머리(이동 경로·건수 문장) |
| `src/components/tag-nav.tsx` | 가로 스크롤 레일·끝 페이드·"전체 주제 N개"·칩 36/44px·현재 칩 검정 면 |
| `src/components/post-grid.tsx`·`post-card.tsx` | base 1열 가로형(112px 썸네일) → md 2열 → lg 3열 세로형, 제목 3줄 제한 + `title`, "링크" 표기 삭제 |
| `src/components/card-media.tsx` | 새 대체 카드(면·장식선·아이콘·200px 이상 글자), 깨짐 시 같은 카드, `thumb`/`figure` 변형 |
| `src/components/pagination.tsx` | "다음 페이지 2 / 18" + 이전·1·2·3·…·끝·다음, `aria-current`, 첫·끝 비활성 표시 |
| `src/components/post-detail.tsx` | 상세 순서 재배치, lg 2열 sticky 보조 열, 사진 1회 + 크레딧 figcaption(`data-credit`), 원문 미리보기 이미지 제거, 원문 이동 파란 버튼 52px |
| `src/components/share-buttons.tsx`·`source-list.tsx` | 보조 열 배치(제목 표시, lg 1열) / 행 높이 44·종류 표지 12px |
| `src/components/floating-banner.tsx`·`src/lib/floating-banner.ts` | <1024 하단 전폭 띠 52px(제목+부제) + 푸터 아래 52px + `scroll-padding-bottom` 68px, 1024~1231 본문 오른쪽 80px |
| `src/app/(ko|en)/about`·`terms`·`(ko)/tags` | 컨테이너·h1 클래스, 맨 아래 단독 링크 44px — **문구 변경 없음** |
| `src/lib/i18n.ts` | 쪽 이동·소개 접힘·레일·태그 머리·보조 열 문구 추가, 대체 카드 "대표 이미지 없음", 크레딧 링크 문구(목업) |
| `eslint.config.mjs` | 추가 임무 0 — `docs/tools/**`에 `react-hooks/rules-of-hooks`만 끔 |
| `docs/tools/programmer-14/` | 측정·대비·화면·회귀 도구와 결과(README) |
| `docs/tools/programmer-13/{unit-checks.tsx,p11-build-check.mjs,figcaption-a11y.mjs}` | 상세 개편으로 바뀐 figcaption 마크업·링크 문구 기대값만 갱신(항목 수 같음), `screens-figcaption/` 재촬영 |

## 주요 결정사항 (자체 판단 + 근거)
1. **추가 임무 0 = 두 번째 방법(일관된 lint 규칙)**. `eslint.config.mjs`에 `files: ['docs/tools/**']`, `react-hooks/rules-of-hooks: 'off'` 하나만 넣었다. 근거: 오류 7건은 디자이너 도구가 SVG `<use>` 문자열을 만드는 함수 이름이 `use()`라 React 훅 규칙이 오인한 것(훅 아님)이다. `docs/tools/**`는 전부 Node 측정·생성 스크립트라 React 훅 규칙이 맞지 않는다. 그래서 이 규칙은 모든 도구 폴더에 같은 기준으로 끄고, 다른 규칙은 도구에도 그대로 건다. `src/`는 범위 밖이다. 첫 번째 방법(도구 함수 이름 바꾸기)은 다른 세션 파일을 고쳐야 하고, 이름에 `use`가 붙은 도구가 또 생기면 같은 일이 반복된다. 결과: 전체 lint 0 errors, `--worktree` 게이트 통과.
2. **카드 날짜는 현행 전체 날짜("2026년 11월 9일")를 유지**했다. 목업은 "11/08" 축약이다. 이 차이는 구현 범위 표에 없고, 연도가 빠지면 옛 게시물 구분이 어렵다. 축약 기준(1년 안 등)은 디자이너 결정 사항으로 남긴다. 전체 날짜로도 360에서 한 줄이고 수치 목표는 모두 통과했다.
3. **헤더 언어 전환은 상대 언어 링크 하나**("English"/"한국어")로 목업을 따랐다. 360에서 링크 44px를 지키며 한 줄 56px에 넣으려면 필요하다. 현재 언어 표시(`aria-current`)는 빠졌다. 지금 언어는 `<html lang>`과 메뉴 언어로 드러난다. 홈·소개 링크의 `aria-current`는 넣지 않았다(PageFrame이 현재 메뉴를 모른다 — 필요하면 별도 작은 오더).
4. **상세 사진 자리**: 사진이 있으면 안내 상자 뒤에 한 번만 보인다. 대표 이미지가 없는(placeholder) 링크형 게시물은 사진 자리를 그리지 않는다(이전 실측 결정 유지 — 큰 빈 상자). 목업 states 화면은 상세에 대체 카드를 그렸지만 캡션은 두지 않는다고만 적었다.
5. **원문 미리보기**: 이미지를 빼고 사이트명·원문 제목·요약 인용과 안내 문구만 남겼다(문구 그대로). 사이트명만 있어도 상자를 그린다(목업 "사이트: Instagram"). 207건 전부 `og.siteName`이 있다.
6. **영어 상세**: 상단 "Translated from the Korean original." 문장은 그대로 두고, 한국어 원문 링크("한국어 원문 보기")는 한국어 상세의 "Read in English"와 같은 자리(원문 이동 버튼 아래)로 옮겼다.
7. **태그 레일 이름·끝 칩**은 목업대로 "주제"·"전체 주제 N개"로 바꿨다. `/tags` 페이지 제목 "전체 태그"는 그대로다. 용어 통일은 기획 확인 대상이다.
8. **태그 피드 머리**: 화면 설명 문장은 건수 문장("이 주제로 정리한 게시물 40건")으로 바꿨다. 메타 description은 그대로다(SEO 비교 799/799 같음).
9. **크레딧 링크 문구는 목업 문구**로 바꿨다: 언론 "기사 원문"/"Source article", 공공누리 "원문 페이지"/"Source page"(13에서 정한 "사진 출처 기사"·"사진 원문 페이지"·"Original page" 대체). 영어 언론 문구는 목업에 없어 "Source article"을 유지했다.
10. **소개·약관 읽기 체계는 CSS(`.reading-page`)로 적용**했다. 문단·목록 마크업과 "준비 중" 상자 클래스는 그대로 뒀다 — copy-exact 도구가 상자 클래스를 글자째 읽기 때문이다. 상자 경계 색은 `.reading-page .border-dashed`로 `--line-strong`을 입혔다.
11. **태그 칩 포커스 링**: 레일이 가로 스크롤 컨테이너라 링크 바깥 링은 위아래가 잘린다. 그래서 링크 상자에 안쪽 링(offset -2px, 알약 모양)을 그린다. 처음에는 안쪽 알약에 그렸는데, 측정 탐침이 "포커스 요소에 링 없음" 35건으로 잡아서 고쳤다(포커스 받은 요소 자체에 링이 보이는 쪽이 맞다).
12. 실측 중 발견해 고친 것: 360에서 레일 칩 안 `sr-only`(position: absolute)가 스크롤 컨테이너를 빠져나가 문서 폭이 1,187px로 늘어나 있었다. 모바일 에뮬레이션에서 화면이 축소되고 배너도 화면 밖으로 밀려났다. 레일에 `relative`를 줘서 고쳤다(리플로우 넘침 0/66).
13. `src/components/ui/card.tsx`는 더 이상 쓰이지 않는다(카드 마크업을 직접 그림, e2e가 읽는 `data-slot="card"`·`"card-footer"`는 유지). 지우지 않았다 — shadcn 패턴 보관용이며 지울지는 리뷰어 판단.

## 회귀 (오더 임무 5)
- a11y-e2e: 공유 section 위치 검사 1종만 바뀌었다("header 바로 뒤" → "보조 열 aside 안, 배경 보도 section 바로 뒤"). 근거는 보강안 상세 순서(공유를 배경 보도 다음 보조 열로)다. Tab 3회 = 공유 3개 검사는 그대로 통과한다(시작점이 배경 보도의 마지막 링크로 바뀜). 나머지 180줄은 13과 라벨이 같다.
- 공유 버튼·GA `share`·카드 `view_card`/`select_card`(코드 변경 없음)·갱신 7일 표시·"Korean only"·깨진 핫링크 대체 전환(13 브라우저 52/52의 "연결 불가 → 플레이스홀더")·사이트맵·메타·JSON-LD는 모두 유지된다.

## 미해결·이슈
1. 실기기(iOS Safari·Android Chrome) 주소창·홈 인디케이터에서 하단 띠 높이(safe-area 포함)는 미측정이다(보강안 notes §6과 같음). 줌 200%는 리플로우 폭으로만 쟀고 스크린리더 낭독은 미확인이다.
2. 결정 2(카드 날짜 축약)·3(메뉴 `aria-current`)·7(주제/태그 용어)은 디자이너·기획 확인 대상이다.
3. 실제 사진이 들어갔을 때 16:9 크롭이 얼굴을 자르는지는 판단할 수 없다(사진 0건). 제3유형 무변형(P5)은 아직 막혀 있다.
4. 13 미해결 4(미리보기 안내문 정확성)는 미리보기에서 이미지를 빼면서 대부분 해소됐다. 다만 안내문의 "썸네일" 낱말은 남아 있다(문구 유지 원칙).
5. 13 미해결 5(깨진 핫링크 뒤 크레딧 줄 남음)는 그대로다. 보강안도 같은 동작이다.

## 다음 세션 가이드
- **리뷰어(Opus 5.5)**: 13·14 묶음 게이트. 중점은 다음과 같다.
  - 추가 임무 0 규칙 범위
  - 결정 2~13
  - 회귀 근거(e2e 위치 검사 변경)
  - 13 도구 기대값 변경
  - 실행 명령은 `docs/tools/programmer-14/README.md`에 있다.
- **슈퍼바이저**: 리뷰 통과 후 트리거의 합본 경로를 커밋한다. 커밋 전 게이트는 지금 통과 상태다.
- **디자이너/기획자**: 미해결 2.

## 참고 링크
- 오더: `instructions/programmer/processed/14-responsive-redesign-implement.md`
- 보강안: `design/v0.3-responsive/final/{notes.md,tokens.md,mockup.html}` · 측정 원본 `docs/tools/designer-05/measure.mjs`
- 13 핸드오프: `docs/handoffs/programmer-13-card-image-schema-credit.md`
