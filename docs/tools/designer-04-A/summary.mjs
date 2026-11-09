import fs from 'node:fs'
const id = process.argv[2]
const f = fs.existsSync(`docs/tools/designer-04-A/measure-output-${id}.json`) ? `docs/tools/designer-04-A/measure-output-${id}.json` : 'docs/tools/designer-04-A/measure-output.json'
const a = JSON.parse(fs.readFileSync(f))[id]
for (const k of Object.keys(a)) {
  if (k === 'overflow') continue
  const m = a[k]
  console.log(k.padEnd(13), JSON.stringify({ hdr: m.hdrH, top: m.firstCardTop, head: m.headH, vis: m.cardsFullyVisible, cols: m.cols, cw: m.cardW, thumb: m.thumb && m.thumb.w + 'x' + m.thumb.h, lines: m.titleLines && [Math.min(...m.titleLines), Math.max(...m.titleLines)], spread: m.rowHeightSpread, cta: m.ctaTop, share: m.shareTop, cpl: m.charsPerLine, col: m.bodyColW, fs: m.bodyFs, small: m.small && m.small.map(s => s.t + ':' + s.h).join(','), nw: m.narrow && m.narrow.length, px12: m.px12, lt14: m.pxLt14, ov: m.overflow, ban: m.banner && [m.banner.x, m.banner.y, m.banner.w, m.banner.h].join(',') }))
}
console.log('overflow fails:', JSON.stringify(a.overflow.filter((x) => x.o)))
