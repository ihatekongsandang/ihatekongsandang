// 측정 결과 빠른 확인용: node docs/tools/designer-05/peek.mjs <json> <id,...>
import fs from 'node:fs'
const r = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
for (const id of process.argv[3].split(',')) {
  const m = r[id].m; const h = m['home-360'], p = m['post-390']
  console.log(id, JSON.stringify({ hdr: h.headerH, first: h.firstTop, head: h.headH, fold: h.inFold, clear: h.inFoldClear, cols: h.cols, small: h.small44, sl: h.small44List, pct12: h.pct12, low: h.textLowN, tl: h.textLow, minC: h.textMinContrast, bmin: h.borderMin, cta: p.ctaY, ctaObs: p.ctaObscured, body: m['post-1280'].body, bodyEn: (m['postEn-1280'] || m['post-1280']).bodyEn, banner: h.banner, fixed: h.fixed, focus: r[id].focus['home-360'], scrolled: r[id].scrolled }, null, 0))
}
console.log('external', r._external)
