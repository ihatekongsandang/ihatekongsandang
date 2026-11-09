// A1~A3 tokens.md·notes.md 생성(측정 JSON·대비 계산 결과를 그대로 인용). 실행: node docs/tools/designer-04-A/gen-docs.mjs (저장소 루트에서)
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
const M = JSON.parse(fs.readFileSync('docs/tools/designer-04-A/measure-output.json', 'utf8'))
const CT = JSON.parse(execFileSync('node', ['docs/tools/designer-04-A/contrast.mjs'], { encoding: 'utf8' }))
const SENT = ['정정·삭제 요청 절차', '인스타그램 @politics_crush (정', 'correction and removal r', 'Instagram @politics_crus']
const VIEWS = ['home', 'post', 'en', 'post-en', 'states']
const WIDTHS = [360, 390, 768, 834, 1024, 1280, 1440]

const V = {
  A1: { fs: 17, lh: 1.75, ko: 36, en: 33, par: '1.1em', h2: 20, card: '가로형 — 썸네일 왼쪽(base·md·lg·xl 모두), md 이상 2열', share: '본문 끝(배경 보도 뒤)', banner: '하단 전폭 띠(<1024), 닫기 없음', thumb: '104 / 136 / 160 / 192px', cols: '1 / 2 / 2 / 2', bannerCell: '하단 전폭 띠 56px(2줄: 제목+부제), 문서 하단 여백 확보' },
  A2: { fs: 18, lh: 1.8, ko: 34, en: 34, par: '1.1em', h2: 21, card: '가로형 — 썸네일 오른쪽, 날짜·출처 표시가 제목 위', share: '제목 아래 작은 줄(3버튼) + 본문 끝 반복', banner: '우하단 소형 한 줄 알약 44px(<1024), 닫기 없음', thumb: '104 / 136 / 160 / 192px', cols: '1 / 2 / 2 / 2', bannerCell: '우하단 알약 44px 한 줄(부제는 시각 비노출·접근성 이름에 유지)' },
  A3: { fs: 16, lh: 1.75, ko: 36, en: 36, par: '1.5em', h2: 19, card: 'base 가로형(썸네일 왼쪽) · md 이상 세로형(이미지 위·제목 아래), md 2열 → lg·xl 3열', share: '모바일·태블릿(<1024) 하단 고정 막대, lg 이상 오른쪽 열', banner: '헤더 아래 한 줄(<1024, 아래로 스크롤하면 숨김·위로 스크롤하면 표시, 소량 JS), 닫기 없음', thumb: '104px(base) / 이미지 전폭 16:9(md 이상)', cols: '1 / 2 / 3 / 3', bannerCell: '헤더 아래 sticky 한 줄 44px(스크롤 방향 숨김)' },
}
const f1 = (x) => (x == null ? '-' : x)
const pass = (b) => (b ? '통과' : '미달')

for (const id of ['A1', 'A2', 'A3']) {
  const v = V[id]; const d = M[id]
  const g = (view, w) => d[`${view}-${w}`]
  // 터치 영역 집계(문장 속 링크는 제외하고 따로 센다)
  let smallAll = 0, smallSentence = 0, narrow = 0, targets = 0, details = []
  for (const view of VIEWS) for (const w of WIDTHS) {
    const m = g(view, w); targets += m.targets; narrow += m.narrow.length
    for (const s of m.small) { if (SENT.some((p) => s.t.startsWith(p))) smallSentence++; else { smallAll++; details.push(`${view}-${w}:${s.t}:${s.h}`) } }
  }
  const ov = d.overflow; const ovFail = ov.filter((x) => x.o)
  const h = g('home', 360), h390 = g('home', 390), en = g('en', 360), p390 = g('post', 390), p360 = g('post', 360)
  const lines = []
  for (const w of WIDTHS) { const m = g('home', w); lines.push(`${w}: 제목 ${Math.min(...m.titleLines)}~${Math.max(...m.titleLines)}줄(상한 3), 같은 행 카드 높이 편차 ${m.rowHeightSpread}px`) }
  const l = (arr) => arr.map((x) => `- ${x}`).join('\n')
  const c = (name) => CT[name]
  const row = (r) => `| ${r.n} | \`${r.a}\` | \`${r.b}\` | ${r.r}:1 | ${r.min ? '≥' + r.min : '참고'} | ${r.ok === null ? '-' : r.ok ? '통과' : '미달'} |`

  const tokens = `# ${id} 토큰 표 (방향 A 읽기 중심 · ${v.card})

> 작성: 디자이너 A (Sonnet 5.5) · md오더 04-A. 목업은 시스템 폰트 스택만 쓴다(U5). 다크 모드는 이번 범위에서 제외(U2)이며 **값만** 아래에 둔다(스크린샷·목업 미구현).
> 대비 계산: \`docs/tools/designer-04-A/contrast.mjs\`(WCAG 2.x 상대 휘도). 아래 수치는 그 출력이다.

## 1. 색 (라이트 필수 / 다크 값 열)

| 토큰 | 라이트 | 다크(미구현) | 용도 |
|---|---|---|---|
| \`--bg\` | #ffffff | #111113 | 바탕 |
| \`--fg\` | #18181b | #f4f4f5 | 본문·제목 |
| \`--muted\` | #52525b | #a1a1aa | 보조 글자 |
| \`--surface\` | #f4f4f5 | #1b1b1f | 푸터·배경 보도 상자·대체 카드 면 |
| \`--line\` | #e4e4e7 | #2e2e33 | 장식 구분선(식별에 쓰지 않음) |
| \`--line-strong\` | #82828a | #7a7a83 | 칩·버튼·안내 상자 경계(비텍스트 3:1) |
| \`--accent\`(강조색 1개) | #1d4ed8 | #93b4ff(링크) · #2f5fe0(버튼 면) | 링크·원문 이동 버튼·포커스 링 |
| \`--ph\` | #d4d4d8 | #3f3f46 | 사진 자리표시 면(목업 전용) |
| 배너 면/글자 | #18181b / #ffffff · 부제 #d4d4d8 | #f4f4f5 / #18181b · 부제 #3f3f46 | 플로팅 배너(현행 색 유지) |

### 대비 계산값 (라이트)

| 쌍 | 전경 | 배경 | 대비 | 기준 | 판정 |
|---|---|---|---|---|---|
${CT.light.map(row).join('\n')}

### 대비 계산값 (다크, 도입 시)

| 쌍 | 전경 | 배경 | 대비 | 기준 | 판정 |
|---|---|---|---|---|---|
${CT.dark.map(row).join('\n')}

장식 구분선(\`--line\` 1.27:1)과 사진 면(\`--ph\` 1.48:1)은 정보를 전달하지 않는다. 카드는 제목 글자로, 사진은 이미지 내용으로 식별한다. 컨트롤 경계(칩·버튼·안내 상자)는 모두 \`--line-strong\`(3.81:1)을 쓴다.

## 2. 글자 크기·줄간격

| 단계 | base | md(768~) | lg(1024~) | xl(1280~) | 용도 |
|---|---|---|---|---|---|
| 홈 h1 | 22/28 | 26/32 | 26/32 | 28/36 | 사이트 이름 한 줄 |
| 카드 제목 | 15/1.38 | 16 | 17 | 18 | 3줄 \`line-clamp\`(전체 문구는 \`title\`·상세) |
| 카드 보조줄 | 13 | 13 | 13 | 13 | 날짜(MM/DD)·사진 출처·갱신 — 12px 글자는 "Korean only" 표시·배경 보도 종류 표지에만 |
| 상세 h1 | 23/1.34 | 28 | 28 | 28 | |
| 상세 요약 | 16/1.7 | 16 | 16 | 16 | |
| **본문** | **${v.fs}/${v.lh}** | 동일 | 동일 | 동일 | 문단 간격 ${v.par} |
| 본문 h2 | ${v.h2}/1.4 | 동일 | 동일 | 동일 | |
| 컬럼 폭 | 화면 폭 | ko ${v.ko}em = ${v.ko * v.fs}px · en ${v.en}em = ${v.en * v.fs}px | 동일 | 동일 | |

## 3. 간격·모서리·터치

| 항목 | 값 |
|---|---|
| 좌우 gutter | 16 (base) / 32 (md) / 40 (lg) / 48 (xl) |
| 세로 리듬 | 4·8·12·16·24·32·40 |
| 모서리 | 썸네일 6, 사진 큰 이미지 8, 버튼·상자 8, 칩 18(알약) |
| 터치 영역 | 헤더·칩·이동 경로·푸터·페이지 이동·공유·배경 보도 링크 모두 높이 ≥44. 칩은 눈에 보이는 알약 36px + 링크 상자 44px |
| 포커스 | 2px \`--accent\` 링, offset 2px. 배너 위는 흰 링 안쪽 |
| 모션 | 없음. A3 배너 숨김 전환 0.2s는 \`prefers-reduced-motion\`에서 0.01ms |

## 4. 브레이크포인트별 규칙

| 구간 | 피드 열 | 썸네일 | gutter | 본문 최대 폭 | 헤더 | 배너 자리 |
|---|---|---|---|---|---|---|
| base 0~639 | 1 | ${v.thumb.split(' / ')[0]} | 16 | 화면 폭 | 한 줄 56px, 홈·소개·English | ${v.bannerCell} |
| sm 640~767 | 1(base 확장) | 동일 | 16 | 화면 폭 | 동일 | 동일 |
| md 768~1023 | ${v.cols.split(' / ')[1]} | ${v.thumb.split(' / ')[1] || '이미지 전폭'} | 32 | 상세 컬럼 ${v.ko}em(ko)·${v.en}em(en), 가운데 | 한 줄 56px + 영어 부제 노출 | 동일(<1024) |
| lg 1024~1279 | ${v.cols.split(' / ')[2]} | ${v.thumb.split(' / ')[2] || '이미지 전폭'} | 40 | 상세 2열: 본문 ${v.ko}em + 오른쪽 16rem 열(배경 보도·공유·태그, sticky) | 동일 | 현행 유지: 오른쪽 세로 탭 3rem, 본문을 3.5rem 안쪽으로 |
| xl 1280~ | ${v.cols.split(' / ')[3]} | ${v.thumb.split(' / ')[3] || '이미지 전폭'} | 48 | 컨테이너 최대 1152(\`max-w-6xl\` 유지), 상세 본문 ${v.ko}em + 18rem 열 | 동일 | 세로 탭 |
`

  const dec = `1. **플로팅 배너 자리·크기(U1 후속 확정 필요).** ${id === 'A1' ? 'A1은 모바일·태블릿에서 하단 전폭 띠(56px)로 바꾼다. 본문이 띠에 가려지지 않게 푸터 여백을 확보하고, 첫 화면 카드 4장은 띠 위에서 센다.' : id === 'A2' ? 'A2는 우하단 위치를 유지하되 한 줄 알약(44px)으로 줄이고, 부제 "외부 사이트로 이동합니다"를 화면에서 빼고 ↗ 아이콘과 접근성 이름(\`aria-label\`)에만 둔다. 부제의 시각 노출 제거는 사용자 확인이 필요하다.' : 'A3는 모바일·태블릿에서 헤더 아래 한 줄로 옮기고, 아래로 스크롤하면 숨기고 위로 스크롤하면 다시 보인다(약 10줄 JS, JS가 없으면 계속 보임). 하단은 공유 막대가 쓰므로 충돌이 없다. "스크롤 중 숨김"이 "닫기 없음" 지시와 맞는지 확인이 필요하다.'} 데스크톱 폭(≥1024)은 현행 세로 탭을 유지한다.
2. **영어 헤더의 사이트명 표기.** 확정 표기 "공산당이싫어요 (Korea Politics & Security Brief)"를 360에서 헤더 한 줄로 담을 수 없어, 헤더에는 "공산당이싫어요"만 두고 영어 부제는 영어 피드 머리(h1 아래 둘째 줄)로 옮겼다. 768 이상에서는 헤더에 그대로 붙는다. 확정 표기를 쪼개 노출하는 것이므로 기획 확인이 필요하다.
3. **피드 "더 보기" 이름.** 실제 동작이 다음 페이지 이동이라 "다음 페이지"(영어 "Next page")로 바꾸고 "1 / 18 페이지"를 함께 보인다. 문구 변경은 기획 범위다.
4. **사진 출처 표시 형식.** 피드 카드는 날짜 줄에 "사진: {출처}", 상세는 사진 바로 아래 캡션 "사진: {출처} · 공공누리"로 둔다(1순위 공공 이미지, 2순위 언론 기사 대표 이미지). "공공누리" 뒤에 유형(제1~4유형)을 붙일지, 언론 이미지의 허용 표기 문구는 기획·저작권 정책 확인이 필요하다. 이번 목업의 출처 이름(대통령실 등)은 자리표시 예시다.`

  const notes = `# ${id} 노트 — 읽기 중심 (${v.card})

> 작성: 디자이너 A (Sonnet 5.5) · md오더 04-A | 방향 A "한 건을 끝까지 읽기 좋게". 정적 목업 \`mockup.html\`(외부 요청 없음, 인라인 CSS·소량 JS). \`src/\` 수정 없음. 보도사진 없음(회색 자리표시).
> 확인법: \`mockup.html?view=home|post|en|post-en|states\` (없으면 전부 세로로). 스크린샷은 헤드리스 Chrome으로 \`file://\`을 열어 \`docs/tools/designer-04-A/measure.mjs\`로 찍고 같은 스크립트가 측정했다(7폭 × 5화면 = 35조합 전수, 가로 넘침은 11폭 × 5화면 = 55조합).

## 1. 변주 축 선택

| 축 | ${id} |
|---|---|
| 피드 카드 형태 | ${v.card} |
| 공유 위치 | ${v.share} |
| 글자 체계 | ${v.fs}px / ${v.lh}, 문단 간격 ${v.par}, ko 컬럼 ${v.ko}em · en ${v.en}em |
| 배너 | ${v.banner} |

공통 결정(U1~U5 반영): 소개 문단(D1 확정문 전문)은 base에서 한 줄 + "더보기"로 접고(\`<details>\`, JS 없음), md 이상에서는 전문을 펼쳐 보인다. 카드의 "링크" 유형 표기를 뺐다. 다크 모드 없음. 웹폰트 없음. 태그 칩은 base에서 가로 스크롤 한 줄(끝 페이드), lg 이상에서도 한 줄 스크롤을 유지한다(키보드로 칩 사이를 Tab 이동). 새 의존성 없음.

## 2. 이미지 결정 반영 (사진 + 출처 표시 + 대체 카드)

- 사진 카드: 피드는 날짜 줄에 "사진: {출처}", 상세는 사진 아래 캡션(\`figcaption\`)에 쓴다. 사진 위에 글자를 얹지 않는다(대비·가림 문제 없음). 화면은 \`?view=states\`.
- 대체 카드(회색 면 + 붉은 줄을 대체): 연한 면(\`--surface\`) + 가는 테두리 + 선 아이콘, 큰 슬롯(230px 이상)에서는 "이미지 없음" 글자를 함께 보인다. 같은 16:9 슬롯이라 레이아웃이 움직이지 않는다. 사진이 깨질 때도 같은 카드로 바뀌는 것을 전제로 한다(\`role="img"\` + 접근성 이름 "대표 이미지가 없어 대체 표시된 영역").

## 3. 진단 번호별 해결

| # | 해결 방법 |
|---|---|
| #1 첫 화면 카드 | 머리 영역을 h1 1줄 + 소개 1줄(접힘) + 태그 한 줄 스크롤로 압축. 360×740에서 첫 카드 y=${f1(h.firstCardTop)}, 머리 높이 ${f1(h.headH)}px, 카드 ${h.cardsFullyVisible}장 |
| #2 배너 | ${v.banner} |
| #3·#14 카드 높이·"링크" 표기 | 제목 3줄 제한(\`line-clamp\`) + 전체 문구는 \`title\`·상세. "링크" 표기 삭제(U4). 카드 폭 268px 4열을 버리고 최대 2~3열로 줄여 이미지·제목이 읽힌다 |
| #4 상세 순서 | 제목 → 요약 → 메타 → 원문 이동 → 안내 상자 → 사진(출처) → 본문 → 원문 미리보기 → 배경 보도 → 공유 → 태그. 390×844에서 "원문 기사로 이동" y=${f1(p390.ctaTop)} |
| #5 줄 길이 | ko ${v.ko}em, en ${v.en}em. 아래 §4 측정값 |
| #6·#7 태블릿·영어 헤더 | md 2열·lg 상세 2열(본문 + sticky 보조 열)·세로/가로 컬럼 폭 다름. 영어 헤더 360에서 ${f1(en.hdrH)}px(한 줄) |
| #8 터치 영역 | 헤더·칩·이동 경로·푸터·페이지 이동·공유·배경 보도 링크를 높이 ≥44로 |
| #9 작은 글자 | 최소 13px(보조줄). 12px는 "Korean only" 표시·종류 표지만 |
| #10 페이지 이동 | 실제 \`<a href>\` 유지, 이름을 "다음 페이지"로(결정 3), 48px 높이 |
| #13 비텍스트 대비 | 컨트롤 경계 \`--line-strong\` 3.81:1(흰 바탕), 3.47:1(\`--surface\`) |
| #11·#12·#15·#16·#17 | 이번 범위 밖(탐색은 B, 브랜드·그리드는 C, 다크는 U2=제외, 미리보기 라벨은 기획 확인). 미리보기 상자는 본문 뒤로 옮기고 라벨 문구는 현행 유지 |

## 4. 수치 목표 자체 측정 (헤드리스 Chrome, \`measure-output.json\`)

| 항목 | 목표 | 측정값 | 판정 |
|---|---|---|---|
| 360×740 첫 화면에 다 보이는 카드(배너 위 기준) | ≥4장, 첫 카드 y ≤300 | ${h.cardsFullyVisible}장, 첫 카드 y=${h.firstCardTop} | ${pass(h.cardsFullyVisible >= 4 && h.firstCardTop <= 300)} |
| 홈 머리 영역 높이 360 (헤더 아래~첫 카드) | ≤240px | ${h.headH}px${id === 'A3' ? '(헤더 아래 배너 44px 포함)' : ''}; 390: ${h390.headH}px | ${pass(h.headH <= 240)} |
| 영어 헤더 높이 360 | ≤64px | ${en.hdrH}px(테두리 1px 포함) | ${pass(en.hdrH <= 64)} |
| 카드 제목 줄 수 편차(같은 행) | 높이 동일 또는 줄 제한 | 전 폭 줄 제한 3줄, 같은 행 높이 편차 ${Math.max(...WIDTHS.map((w) => g('home', w).rowHeightSpread))}px | ${pass(Math.max(...WIDTHS.map((w) => g('home', w).rowHeightSpread)) === 0)} |
| 본문 줄당 글자 ko (768 / 1280) | 32~45 | ${g('post', 768).charsPerLine} / ${g('post', 1280).charsPerLine}(360은 화면 폭 한계로 ${p360.charsPerLine}) | ${pass([768, 1280].every((w) => g('post', w).charsPerLine >= 32 && g('post', w).charsPerLine <= 45))} |
| 본문 줄당 글자 en (768 / 1280) | 60~75 | ${g('post-en', 768).charsPerLine} / ${g('post-en', 1280).charsPerLine} | ${pass([768, 1280].every((w) => g('post-en', w).charsPerLine >= 60 && g('post-en', w).charsPerLine <= 75))} |
| "원문 기사로 이동" 위치 390 | 첫 화면(844) 안 | y=${p390.ctaTop}~${p390.ctaBottom} | ${pass(p390.ctaBottom <= 844)} |
| 높이 44px 미만 터치 대상(전 화면·7폭 전수 ${targets}개) | 헤더·칩·페이지 이동·푸터 0개 | 문장 속 링크 제외 ${smallAll}개${smallAll ? ' (' + details.slice(0, 4).join(', ') + ')' : ''}, 폭 44 미만 ${narrow}개. 제외한 문장 속 링크(정정 안내 문장) ${smallSentence}건 | ${pass(smallAll === 0)} |
| 12px 글자 비율(홈) | ≤10% | 360: ${h.px12}% · 390: ${h390.px12}% · 768: ${g('home', 768).px12}% · 1280: ${g('home', 1280).px12}% (14px 미만 전체 ${h.pxLt14}%, 대부분 13px 보조줄) | ${pass([360, 390, 768, 1280].every((w) => g('home', w).px12 <= 10))} |
| 비텍스트 경계 대비 | ≥3:1 | 3.81:1(흰), 3.47:1(\`--surface\`) | 통과 |
| 가로 넘침(폭 180·195·320·360·390·640·768·834·1024·1280·1440 × 5화면 = ${ov.length}조합, 180·640은 360·1280의 줌 200% 상당) | 0 | ${ovFail.length}건 | ${pass(ovFail.length === 0)} |

측정 한계: 헤드리스 Chrome(macOS 시스템 한글 글꼴) 에뮬레이션이며 실기기 주소창·홈 인디케이터는 측정하지 않았다(확인 필요). 줄당 글자는 문단·목록 항목의 글자 수 ÷ 줄 수 평균(3줄 이상 블록만). "문장 속 링크"는 브리프 §5의 제외 대상이다. 줌 200%는 폭 절반 에뮬레이션으로 갈음했다.

폭별 카드 제목 줄 수(홈):
${l(lines)}

## 5. 사용자 결정 필요

${dec}

## 6. 구현 영향 파일 (수정 금지, 이름만)

\`src/components/site-header.tsx\`(44px 링크·영어 부제 이동), \`feed-view.tsx\`(머리 압축·소개 접힘), \`tag-nav.tsx\`(스크롤 레일·칩 44px), \`post-card.tsx\`·\`post-grid.tsx\`·\`ui/card.tsx\`(카드 형태·열 수·줄 제한), \`card-media.tsx\`(대체 카드·출처 표시), \`post-detail.tsx\`(순서·2열), \`share-buttons.tsx\`${id === 'A3' ? '(하단 막대 배치)' : ''}, \`source-list.tsx\`, \`floating-banner.tsx\`·\`lib/floating-banner.ts\`(배너 자리·여백), \`pagination.tsx\`(이름), \`site-footer.tsx\`, \`app/globals.css\`(토큰·\`.post-body\` 읽기 글자). SSG·\`<a href>\` 규칙은 그대로이며 새 의존성은 없다.

## 7. 산출물

\`mockup.html\`, \`tokens.md\`, \`notes.md\`, 스크린샷 \`${id}-{home|post}-{360|768|1280}-{fold|full}.png\` + \`${id}-en-*\`, \`${id}-post-en-*-full\`, \`${id}-states-*-full\`.
`
  fs.writeFileSync(`design/v0.3-responsive/${id}/tokens.md`, tokens)
  fs.writeFileSync(`design/v0.3-responsive/${id}/notes.md`, notes)
  console.log(id, 'ok')
}
