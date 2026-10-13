# 테스터 02 — 배포본 실측 원본 로그

측정 도구: Claude in Chrome(claude-in-chrome) 확장 — `javascript_tool`(DOM `getBoundingClientRect`/`matchMedia`/`window.innerWidth` 직접 조회), `computer`(실제 키보드 `Tab`/`Enter` 이벤트 + 스크린샷), `read_page`(접근성 트리).
대상: `https://ihatekongsandang.vercel.app` (배포 프로덕션 도메인). 측정 시점 게시물 184건 · 태그 301개(독립 재집계, 아래 §0).

---

## §0. 독립 전수 집계 (frontmatter 직접 파싱, 앱 로직 미사용)

```
$ node -e "... content/posts/*.md frontmatter.tags 직접 집계 ..."
{"postCount":184,"tagCount":301}
```

프로그래머 08·리뷰어 16 측정(184건·301개)과 **일치** — 측정 시점까지 게시물·태그 변동 없음.

---

## §1. 뷰포트 확보 — 도구 한계 재확인

### 1-1. `resize_window` 무반응 (디자이너 01·테스터 01과 동일 결함 재현)
- 탭 A(1136228564)에서 `resize_window(390,844)` 호출 → `window.innerWidth` **599**(불변). 같은 탭에 `resize_window(800,600)` 재호출해도 역시 **599**(불변).
- 새 탭 생성 시마다 각기 다른 고정폭(599 / 800×423 / 613×667)을 가졌고, 이후 `resize_window`로 어떤 값을 넣어도(390, 800, 1920 등) 전혀 반영되지 않음 — **탭 생성 시점에 고정된 뷰포트를 바꿀 수 없는 도구 결함**으로 재확인.
- 탭을 새로 여러 번 생성하자 폭이 599 → 800 → 613 → (window 상태 변화 후) 1920으로 바뀌었다 — Chrome 창 자체의 크기가 바뀔 때만 새 탭이 그 크기를 물려받는 것으로 보이며, `resize_window` 도구 자체는 세션 내내 0% 반영.

### 1-2. iframe 기법도 차단됨 (신규 시도, 이번 세션에서 처음 시도)
- 배포본을 `<iframe style="width:390px;height:844px">`로 감싸 "진짜" 390px 브라우징 컨텍스트를 만드는 방법을 시도(윈도 크기와 무관하게 iframe의 콘텐츠 박스가 곧 그 안의 뷰포트가 되는 표준 동작 이용).
- `getBoundingClientRect()` 확인 결과 iframe 자체는 정확히 390×844로 렌더링됐으나, 내부 페이지는 **빈 깨진-이미지 아이콘만 표시**됨.
- 원인 확인: `curl -sI https://ihatekongsandang.vercel.app/` → `x-frame-options: DENY` (+ CSP `frame-ancestors 'none'`). 사이트 자체가 자기 자신을 포함한 모든 프레이밍을 보안상 차단 — **의도된 보안 설정이므로 우회 시도하지 않고 포기**.

### 1-3. 결론 — 실제 사용 폭
정확한 390px·1280px는 이 세션에서 만들 수 없었다(확인 필요, 사유 §1-1·§1-2). 대신 **세션 내 실제로 관찰된 고정폭 중 가장 좁은 599px**을 "모바일 대역"으로, **1920px**(Chrome 창이 전체화면급으로 커진 뒤 새 탭들이 물려받은 폭)을 "데스크톱"으로 써서 전 항목을 실측했다. `TagNav`는 `flex flex-wrap`으로 Tailwind 브레이크포인트가 아니라 **컨테이너 실폭에 반응**하므로(컴포넌트 코드 `src/components/tag-nav.tsx` 확인), 599px·1920px 수치도 유효한 실측값이다 — 다만 리�이어 재현값(390px 기준 nav 130px·카드 top 638~658px)과는 폭이 달라 **직접 비교는 불가**하다.

```json
// tab 1136228564 (home 599px)
{"innerWidth":599,"innerHeight":723,"outerWidth":0,"outerHeight":0,"devicePixelRatio":2,"matchMobile":true,"matchDesktop":false}
// tab 1136228571 (desktop 1920px)
{"innerWidth":1920,"innerHeight":878}
```

---

## §2. 페이지×뷰포트 실측 (임무 1·2) — DOM `getBoundingClientRect()` 직접 측정

측정 함수(각 페이지에서 동일 실행):
```js
function measure(){
  const nav=document.querySelector('nav[aria-label="태그"]');
  const navRect=nav?nav.getBoundingClientRect():null;
  const main=document.querySelector('main');
  const firstCard=main.querySelector('a[href^="/post/"]');
  const cardRect=firstCard?firstCard.getBoundingClientRect():null;
  return {innerWidth:window.innerWidth, navHeight:navRect?.height, navTop:navRect?navRect.top+scrollY:null,
    cardTop:cardRect?cardRect.top+scrollY:null, scrollWidth:document.documentElement.scrollWidth,
    clientWidth:document.documentElement.clientWidth, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth};
}
```

| 페이지 | 폭(px) | navHeight(px) | cardTop(px) | scrollWidth=clientWidth | 가로 넘침 |
|---|---|---|---|---|---|
| `/` | 599 | 95.195 | 721.508 | 599=599 | 없음 |
| `/tag/dmz` | 599 | 95.195 | 701.508 | 599=599 | 없음 |
| `/tag/1군단` | 599 | 95.195 | 701.508 | 599=599 | 없음 |
| `/` | 1920 | 60.797 | 530.922 | 1920=1920 | 없음 |
| `/tag/dmz` | 1920 | 60.797 | 506.922 | 1920=1920 | 없음 |
| `/tag/1군단` | 1920 | 60.797 | 506.922 | 1920=1920 | 없음 |

`/tag/dmz`(상위 12 안, 칩 12개)와 `/tag/1군단`(상위 밖, 활성 칩 맨 앞 붙어 칩 13개)의 nav 높이가 599px·1920px 모두에서 **동일** — 599px 폭에서 이미 두 줄로 감싸지므로 12개든 13개든 줄 수가 같다(13번째 칩이 둘째 줄에 들어갈 자리가 있었음). 1920px는 한 줄.

---

## §3. `/tags` 실측 (임무 3)

| 폭(px) | `<li>` 수 | 기대값(§0) | 일치 | ul 높이(px) | 가로 넘침 |
|---|---|---|---|---|---|
| 599 | 301 | 301 | ✅ | 1599.328 | 없음 |
| 1920 | 301 | 301 | ✅ | 808.164 | 없음 |

---

## §4. 키보드 (임무 4)

### 4-0. 도구 거동 메모 (중요 — 재현 조건)
`computer key` 액션으로 보내는 `Tab`은 **그 직전에 `computer screenshot` 액션이 없으면 포커스를 이동시키지 않는다**(페이지에 키 이벤트가 전달되지 않는 것으로 보임). 같은 배치(`browser_batch`) 안에서 `screenshot` → `key Tab`(`repeat` 가능) 순서로 보내면 매번 정확히 반영됨(아래 수치로 검증). 이 패턴을 지키지 않은 첫 시도들은 포커스가 전혀 움직이지 않아 폐기했다 — 다음 세션도 같은 패턴을 권장.

### 4-1. `/` 탭 순서
- 초기: `nav` 첫 칩(`#dmz`)에 `.focus()` (프로그래매틱, 링 없음 확인용 기준점).
- `Tab`×12 → `href="/tags"`, 텍스트 "전체 태그 보기 (301개)→" — **정확히 칩 12개를 지나 "전체 태그 보기"에 도달**, 포커스 링 육안 확인(스크린샷 `keyboard-home-viewall-focus.jpg`).
- `Tab`×1 추가 → `href="/post/2026-10-12-hagonolza-equal-earth-dokdo"` = 첫 카드 href와 일치(`matchesFirstCard:true`).
- **순서 확인: 칩(12) → 전체 태그 보기 → 첫 카드.** 오더 기대와 일치.
- `Enter`(Return) on "전체 태그 보기" → `location.href`가 `/tags`로 이동 확인(두 번째 시도에서 반영 — 역시 직전 `screenshot` 필요).

### 4-2. `/tag/1군단` 맨 앞 활성 칩
- nav 첫 `<a>`의 `href="/tag/1군단"(encoded)`, `aria-current="page"`, 텍스트 "#1군단 게시물 1건" — **맨 앞 칩 = 활성 칩** 확인(DOM).
- `.focus()`로 포커스 이동 후 `shift+Tab`→`Tab`(원위치, 키보드 경유) → 포커스 링 육안 확인(스크린샷 `keyboard-tag1gundan-active-chip-focus.jpg`).

### 4-3. `/tags` 전수 Tab 순회 (301개, 스킵 0)
- 기준 배열 `window.__chipHrefs`(301개, DOM 순서) 확보 → 첫 `<li><a>`에 `.focus()`.
- **1차 방법(체크포인트식)**: `Tab`×1, ×5, ×43, ×50, ×50, ×50, ×50, ×51(합계 300회) — 중간 체크포인트(idx 1,6,49,99,149,199,249,300)마다 `window.__chipHrefs.indexOf(activeElement.href)`로 대조, **전부 기대 인덱스와 정확히 일치**(스킵 0).
- **2차 방법(재확인, 독립 시행)**: 페이지 새로고침 후 다시 첫 `<a>`에 `.focus()` → `Tab`×100 세 번 연속(합계 300회, 중간 체크 없이) → 최종 `idx:300`(마지막 `#kbs`) — **1차와 동일 결과**, 교차검증 완료.
- 마지막 칩(`#kbs`)에서 포커스 링 육안 확인, 자동 스크롤로 뷰포트 안에 들어옴(스크린샷 `keyboard-tags-last-chip-kbs-focus.jpg`).
- **결론: 301개 전수 Tab 순회, 건너뛴 칩 0건(두 가지 독립 방법 모두 일치).**

---

## §5. 접근성 트리 (임무 5, `read_page` 대체 확인)

- `/`: `nav[aria-label="태그"]` 하위 13개 link(12칩+전체보기), 각 접근 이름 "#dmz" + "게시물 40건" 형태로 결합(스크린리더가 "#dmz, 게시물 40건, 링크"로 이어 읽을 것으로 기대되는 구조) — sr-only span이 트리에 그대로 노출.
- `/tag/1군단`: 첫 link가 "#1군단" + "게시물 1건", DOM `aria-current="page"` 속성 보유(접근성 트리 텍스트 렌더에는 상태값이 별도 줄로 안 나오지만 속성 자체는 DOM에서 확인 — VoiceOver는 표준적으로 이 속성을 "현재 페이지"로 안내함. **실제 음성 청취는 도구 한계로 확인 필요**, 아래 §6).
- `/tags`: `find` 도구가 `ul[aria-label="태그 목록"]`를 `role=list`로 인식("list \"태그 목록\" (ul)") — VoiceOver가 "목록, 301개 항목"으로 안내할 조건(role=list + li 301개, DOM에서 재확인) 충족. 실제 음성 미청취.
- "전체 태그 보기 (301개)" 접근 이름에 화살표(`→`, `aria-hidden`) 미포함 확인 — 접근성 트리에 텍스트만 노출.

## §6. VoiceOver — 확인 필요 (재확인, 테스터 01·디자이너 01과 동일 한계)
claude-in-chrome에는 실제 음성 재생 기능이 없어 macOS/iOS VoiceOver 청취 자체가 불가능하다. §5의 접근성 트리·DOM 속성으로 "그런 안내가 나올 조건은 갖췄다"까지만 간접 확인했고, 실제 음성 문구(예: "#dmz, 게시물 40건, 링크" vs 다른 낭독 순서)는 **확인 필요**로 남긴다. iOS Safari 실기기 검증도 환경에 없어 **확인 필요**.

## §7. 회귀 (임무 6)

```json
// /en
{"navCount":0,"url":"https://ihatekongsandang.vercel.app/en"}
// /en/page/2
{"navCount":0,"url":"https://ihatekongsandang.vercel.app/en/page/2","status":"Page 2 · 공산당이싫어요 (Korea Politics & Security Brief)"}
```
두 페이지 모두 `nav[aria-label="태그"]` 0개 — 회귀 없음.
활성 칩 건수 숫자 대비(2.29:1)는 오더 지시대로 재측정하지 않고 "기존 결함"으로만 기록한다.
