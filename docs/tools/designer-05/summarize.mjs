// measure-output*.json → 채점 근거 요약표(markdown). 실행: node docs/tools/designer-05/summarize.mjs [json...]
// 출력: docs/tools/designer-05/summary.md (전 시안 공통 식으로 뽑은 수치)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const files = process.argv.slice(2).length ? process.argv.slice(2) : [path.join(HERE, 'measure-output.json')]
const R = {}
for (const f of files) Object.assign(R, JSON.parse(fs.readFileSync(f, 'utf8')))
const ids = Object.keys(R).filter((k) => !k.startsWith('_'))
const W = [360, 390, 768, 834, 1024, 1280, 1440]
const lines = []
const row = (cells) => lines.push('| ' + cells.join(' | ') + ' |')
const g = (id, k) => R[id].m[k] || {}

lines.push('# 통일 재측정 요약 (designer-05)', '', `측정 대상: ${ids.join(', ')} · 폭 ${W.join('·')} · 외부 요청 ${(R._external || []).length}건`, '')

lines.push('## 1. 모바일 홈·상세 (360×740 / 390×844)', '')
row(['시안', '헤더 h', '첫 카드 y', '머리 높이', '360 첫 화면 카드(전부 보임)', '그중 고정 요소에 안 가린 카드', '열', '390 원문 이동 y', '원문 이동 첫 화면·안 가림', '상세 스크롤 중 고정 위/아래(px)'])
row(Array(10).fill('---'))
for (const id of ids) {
  const h = g(id, 'home-360'), p = g(id, 'post-390'), s = R[id].scrolled || {}
  row([id, h.headerH, h.firstTop, h.headH, h.inFold, h.inFoldClear, h.cols, p.ctaY, `${p.ctaInFold ? '예' : '아니오'}·${p.ctaObscured ? '가림' : '안 가림'}`, `${s.stuckTop}/${s.stuckBottom}`])
}

lines.push('', '## 2. 폭별 홈 카드 (열 · 카드 폭 · 첫 화면 안 가린 카드 · 같은 행 높이 편차 · 제목 글자)', '')
row(['시안', ...W.map((w) => String(w))])
row(Array(W.length + 1).fill('---'))
for (const id of ids) row([id, ...W.map((w) => { const m = g(id, `home-${w}`); return `${m.cols}열·${m.cardW}px·${m.inFoldClear}장·편차${m.rowSpread}·${m.titleFs}px` })])

lines.push('', '## 3. 영어 피드', '')
row(['시안', '360 헤더 h', '360 첫 카드 y', '768 열', '1280 열', '1280 제목 줄 수(최대)'])
row(Array(6).fill('---'))
for (const id of ids) { const a = g(id, 'en-360'), b = g(id, 'en-768'), c = g(id, 'en-1280'); row([id, a.headerH, a.firstTop, b.cols, c.cols, c.titleLines ? Math.max(...c.titleLines.filter((x) => x != null)) : '-']) }

lines.push('', '## 4. 읽기(상세 본문, 3줄 이상 문단·목록 항목의 글자 수 ÷ 줄 수 평균)', '')
row(['시안', 'ko 글자/줄 360', 'ko 768', 'ko 1024', 'ko 1280', 'en 768', 'en 1280', '본문 글자', '줄간격', '홈 12px 이하 비율(360)', '상세 12px 이하(360)', '최소 글자(홈)'])
row(Array(12).fill('---'))
for (const id of ids) {
  const en = (w) => (g(id, `postEn-${w}`).bodyEn || g(id, `post-${w}`).bodyEn || {}).cpl
  const b = (w) => (g(id, `post-${w}`).body || {}).cpl
  const p = g(id, 'post-1280').body || {}
  row([id, b(360), b(768), b(1024), b(1280), en(768), en(1280), p.fs, p.lh, g(id, 'home-360').pct12 + '%', g(id, 'post-360').pct12 + '%', g(id, 'home-360').minFs])
}

lines.push('', '## 5. 접근성', '')
row(['시안', '글자 대비 검사 수(전 화면·전 폭)', '4.5:1(큰 글자 3:1) 미달', '최저 대비', '컨트롤 경계 최저', '카드 경계', '44px 미만 터치(문장 속 링크 제외, 전 화면·전 폭 합)', '24px 미만', '가로 넘침(리플로우 폭 전수)', 'Tab 순회 포커스 표시 없음', 'Tab 포커스가 고정 요소에 완전히 가림'])
row(Array(11).fill('---'))
for (const id of ids) {
  const ms = Object.values(R[id].m)
  const checked = ms.reduce((a, m) => a + (m.textChecked || 0), 0)
  const low = ms.reduce((a, m) => a + (m.textLowN || 0), 0)
  const minC = Math.min(...ms.map((m) => m.textMinContrast ?? 99))
  const ctrl = Math.min(...ms.map((m) => m.borderMin ?? 99))
  const cardB = [...new Set(ms.flatMap((m) => Object.entries(m.cardBorders || {}).map(([k, v]) => v.r)))]
  const face = [...new Set(ms.map((m) => m.cardFaceRatio).filter((x) => x != null))]
  const small = ms.reduce((a, m) => a + (m.small44 || 0), 0)
  const u24 = ms.reduce((a, m) => a + (m.under24 || 0), 0)
  const ov = Object.entries(R[id].overflow).filter(([, v]) => v > 0)
  const f = Object.values(R[id].focus)
  const noRing = f.reduce((a, x) => a + x.noRing.length, 0), steps = f.reduce((a, x) => a + x.steps, 0)
  const cov = f.reduce((a, x) => a + x.covered.length, 0)
  row([id, checked, low, minC, ctrl === 99 ? '-' : ctrl, cardB.length ? '테두리 ' + cardB.join('/') : '면 ' + face.join('/'), small, u24, `${ov.length}/${Object.keys(R[id].overflow).length}${ov.length ? ' (' + ov.map(([k, v]) => k + ':' + v).join(', ') + ')' : ''}`, `${noRing}/${steps}`, cov])
}

lines.push('', '## 6. 글자 대비 미달 목록(있을 때만)', '')
for (const id of ids) {
  const items = Object.entries(R[id].m).filter(([, m]) => m.textLowN).map(([k, m]) => `${k}: ${m.textLow.map((x) => `"${x.t}" ${x.fs}px ${x.r}:1`).join(', ')}`)
  if (items.length) lines.push(`- **${id}** — ${items.join(' / ')}`)
}
lines.push('', '## 7. 배너 자리(360 · 768 · 1024 · 1280)', '')
row(['시안', '360', '768', '1024', '1280'])
row(Array(5).fill('---'))
for (const id of ids) row([id, ...[360, 768, 1024, 1280].map((w) => { const b = g(id, `home-${w}`).banner; return b ? `${b.pos} ${b.x},${b.y} ${b.w}×${b.h}` : '없음' })])

fs.writeFileSync(path.join(HERE, 'summary.md'), lines.join('\n') + '\n')
console.log(lines.join('\n'))
