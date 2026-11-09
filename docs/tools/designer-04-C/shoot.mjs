/**
 * 디자이너 C 04-C — 시안 C1·C2·C3 목업 스크린샷 + 수치 측정.
 *
 * 실행(저장소 루트): node docs/tools/designer-04-C/shoot.mjs
 * - 헤드리스 Chrome(DevTools 프로토콜, docs/tools/programmer-04/cdp.mjs 재사용) 으로 file:// 목업을 연다.
 * - 스크린샷: design/v0.3-responsive/{C1|C2|C3}/{시안}-{home|post|en}-{폭}.png(첫 화면) + ...-full.png(전체)
 * - 수치: docs/tools/designer-04-C/metrics.json, metrics-summary.txt
 * Chrome 은 cdp.mjs 가 끝나면 종료·임시 프로필 삭제한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { withChrome } from '../programmer-04/cdp.mjs'
import { TOKENS, ratio } from './build.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../../..')
const OUT = path.join(ROOT, 'design/v0.3-responsive')

const VARIANTS = ['C1', 'C2', 'C3']
const WIDTHS = [
  { w: 360, h: 740, mobile: true },
  { w: 390, h: 844, mobile: true },
  { w: 768, h: 1024, mobile: true },
  { w: 834, h: 1194, mobile: true },
  { w: 1024, h: 768, mobile: true },
  { w: 1280, h: 800, mobile: false },
  { w: 1440, h: 900, mobile: false },
]
const SHOT_WIDTHS = new Set([360, 768, 1280])
const VIEWS = ['home', 'post', 'en']
const REFLOW = [320, 384, 640] // 360@200%·320 리플로우·768@200%·1280@200%

const MEASURE = String.raw`(() => {
  const view = document.documentElement.getAttribute('data-view')
  const root = document.getElementById(view)
  const vw = innerWidth, vh = innerHeight
  const R = (el) => { const b = el.getBoundingClientRect(); return { x: Math.round(b.left), y: Math.round(b.top + scrollY), w: Math.round(b.width), h: Math.round(b.height), b: Math.round(b.bottom + scrollY) } }
  const out = { view, vw, vh, overflowX: document.documentElement.scrollWidth - vw }
  const header = root.querySelector('.site-header')
  out.headerH = Math.round(header.getBoundingClientRect().height)
  const lines = (el) => {
    const range = document.createRange(); range.selectNodeContents(el)
    const tops = new Set([...range.getClientRects()].filter((x) => x.width > 1).map((x) => Math.round(x.top)))
    return Math.max(1, tops.size)
  }
  const banner = document.querySelector('.banner')
  const bs = getComputedStyle(banner).display === 'none' ? null : R(banner)
  out.banner = bs ? { x: bs.x, y: bs.y - scrollY, w: bs.w, h: bs.h } : null
  if (view === 'home' || view === 'en') {
    const cards = [...root.querySelectorAll('.card')]
    const rects = cards.map(R)
    out.cards = cards.length
    out.cols = new Set(rects.map((r) => r.x)).size
    out.firstTop = rects[0].y
    out.headH = rects[0].y - out.headerH
    out.firstCard = { w: rects[0].w, h: rects[0].h }
    out.fullyVisibleInFold = rects.filter((r) => r.y >= 0 && r.b <= vh).length
    out.fullyVisibleAboveBanner = rects.filter((r) => r.b <= vh - (bs && bs.y - scrollY >= vh / 2 ? bs.h : 0)).length
    const titleLines = cards.map((c) => lines(c.querySelector('.title a')))
    out.titleLinesRendered = cards.map((c) => { const t = c.querySelector('.title'); return Math.round(t.getBoundingClientRect().height / parseFloat(getComputedStyle(t).lineHeight)) })
    out.titleLinesNatural = titleLines
    out.titleClamped = titleLines.map((n, i) => n > out.titleLinesRendered[i])
    // 같은 행(top 같은 값) 카드 높이 동일 여부
    const rows = new Map()
    rects.forEach((r, i) => { const k = r.y; if (!rows.has(k)) rows.set(k, []); rows.get(k).push(r.h) })
    out.rowsMismatch = [...rows.entries()].filter(([, hs]) => new Set(hs).size > 1).length
    out.rowCount = rows.size
    const imgH = rects.map((r, i) => Math.round(cards[i].querySelector('.media').getBoundingClientRect().height))
    out.mediaH = { min: Math.min(...imgH), max: Math.max(...imgH) }
    out.firstCardMedia = Math.round(cards[0].querySelector('.media').getBoundingClientRect().width)
    out.cardWidths = [...new Set(rects.map((r) => r.w))]
    const tag = root.querySelector('.tags'); if (tag) out.tagsH = R(tag).h
    const hh = root.querySelector('.home-head'); out.headBlockH = R(hh).h
  }
  if (view === 'post') {
    const cta = root.querySelector('.cta .btn'); out.ctaY = R(cta).y; out.ctaBottom = R(cta).b
    const sh = root.querySelector('.share .sbtn'); out.shareY = R(sh).y; out.shareH = R(sh).h
    const t = root.querySelector('.ptitle'); out.titleLines = lines(t)
    const first = root.querySelector('.post-body:not([lang=en]) p')
    const hero = root.querySelector('.hero .media'); out.heroW = R(hero).w; out.heroH = R(hero).h
    const bodyEl = root.querySelector('.post-body:not([lang=en])')
    const lis = [...bodyEl.querySelectorAll('p,li')]
    const per = lis.map((el) => { const n = lines(el); const len = el.textContent.trim().length; return { n, len, cpl: len / n } })
    const multi = per.filter((p) => p.n >= 2)
    out.body = { fontSize: parseFloat(getComputedStyle(first).fontSize), lineHeight: getComputedStyle(first).lineHeight, width: Math.round(bodyEl.getBoundingClientRect().width), cplAvg: Math.round(multi.reduce((a, p) => a + p.len, 0) / Math.max(1, multi.reduce((a, p) => a + p.n, 0))), cplFirstP: Math.round(per[0].cpl) }
    const en = root.querySelector('#en-sample p'); out.bodyEn = { cpl: Math.round(en.textContent.trim().length / lines(en)), width: Math.round(en.getBoundingClientRect().width), fontSize: parseFloat(getComputedStyle(en).fontSize) }
  }
  // 터치 대상: 보이는 a·button 중 높이 44 미만(카드 제목 링크는 ::after 로 카드 전체를 덮으므로 제외, 본문·정정 문장 속 링크 제외)
  const small = []
  root.querySelectorAll('a,button').forEach((el) => {
    if (el.closest('.title') || el.closest('.post-body') || el.closest('.corr') || el.closest('.notice')) return
    const b = el.getBoundingClientRect()
    if (b.width === 0 || b.height === 0 || b.right <= 0 || b.left < -100) return
    if (getComputedStyle(el).visibility === 'hidden') return
    if (b.height < 43.5 || b.width < 43.5) small.push({ t: el.textContent.trim().slice(0, 16), w: Math.round(b.width), h: Math.round(b.height) })
  })
  const bb = banner.querySelector('a').getBoundingClientRect()
  out.smallTargets = small
  out.bannerLinkH = Math.round(bb.height)
  // 글자 크기 분포(보이는 글자 수, 뷰 안 + 배너)
  const hist = {}; let total = 0
  const walk = (node) => {
    const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
    let n
    while ((n = w.nextNode())) {
      const el = n.parentElement
      if (!el || el.closest('.sr') || el.closest('script,style')) continue
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue
      // 접힌 소개의 line-clamp 는 전체 글자를 세므로 그대로 둔다
      const len = n.textContent.replace(/\s+/g, ' ').trim().length; if (!len) continue
      const fs = Math.round(parseFloat(cs.fontSize) * 10) / 10
      hist[fs] = (hist[fs] || 0) + len; total += len
    }
  }
  walk(root); if (bs) walk(banner)
  out.sizeHist = hist
  out.charsTotal = total
  out.pct12 = Math.round((Object.entries(hist).filter(([k]) => parseFloat(k) <= 12).reduce((a, [, v]) => a + v, 0) / total) * 1000) / 10
  out.minFont = Math.min(...Object.keys(hist).map(parseFloat))
  return out
})()`

let seq = 0
const results = []
const lines = []

await withChrome(9347, async (client) => {
  for (const v of VARIANTS) {
    const file = path.join(OUT, v, 'mockup.html')
    for (const view of VIEWS) {
      for (const W of WIDTHS) {
        await client.setViewport(W.w, W.h, W.mobile)
        await client.navigate(`${pathToFileURL(file).href}?r=${++seq}#${view}`)
        // 해시만 바뀌었을 때를 대비해 새로고침 효과: data-view 직접 설정
        await client.evaluate(`document.documentElement.setAttribute('data-view','${view}'); 1`)
        await new Promise((r) => setTimeout(r, 150))
        const m = await client.evaluate(MEASURE)
        m.variant = v; m.width = W.w
        results.push(m)
        if (SHOT_WIDTHS.has(W.w)) {
          const base = path.join(OUT, v, `${v}-${view}-${W.w}`)
          const fold = await client.send('Page.captureScreenshot', { format: 'png' })
          fs.writeFileSync(`${base}.png`, Buffer.from(fold.data, 'base64'))
          const full = await client.evaluate('Math.ceil(document.documentElement.scrollHeight)')
          await client.setViewport(W.w, full, W.mobile)
          await new Promise((r) => setTimeout(r, 150))
          const shot = await client.send('Page.captureScreenshot', { format: 'png' })
          fs.writeFileSync(`${base}-full.png`, Buffer.from(shot.data, 'base64'))
          await client.setViewport(W.w, W.h, W.mobile)
        }
      }
      // 리플로우(줌 200% 상당) 가로 넘침
      for (const rw of REFLOW) {
        await client.setViewport(rw, 800, true)
        await client.navigate(`${pathToFileURL(file).href}?r=${++seq}#${view}`)
        await client.evaluate(`document.documentElement.setAttribute('data-view','${view}'); 1`)
        await new Promise((r) => setTimeout(r, 120))
        const o = await client.evaluate('document.documentElement.scrollWidth - innerWidth')
        results.push({ variant: v, view, width: rw, reflow: true, overflowX: o })
      }
    }
  }
})

fs.writeFileSync(path.join(HERE, 'metrics.json'), JSON.stringify(results, null, 1))

for (const m of results) {
  if (m.reflow) { lines.push(`${m.variant} ${m.view} ${m.width}(reflow) overflowX=${m.overflowX}`); continue }
  const common = `${m.variant} ${m.view} ${m.width}: overflowX=${m.overflowX} headerH=${m.headerH} 12px%=${m.pct12} minFont=${m.minFont} smallTargets=${m.smallTargets.length}${m.smallTargets.length ? ' ' + JSON.stringify(m.smallTargets) : ''} banner=${m.banner ? `${m.banner.w}x${m.banner.h}@${m.banner.x},${m.banner.y}` : '-'}`
  if (m.view === 'post') lines.push(`${common} | ctaY=${m.ctaY} titleLines=${m.titleLines} body ${m.body.fontSize}px/${m.body.lineHeight} w=${m.body.width} cpl=${m.body.cplAvg} (p1 ${m.body.cplFirstP}) en cpl=${m.bodyEn.cpl} w=${m.bodyEn.width}`)
  else lines.push(`${common} | cols=${m.cols} cardW=${m.cardWidths.join('/')} firstTop=${m.firstTop} headH=${m.headH} fullyVisible=${m.fullyVisibleInFold} rowsMismatch=${m.rowsMismatch}/${m.rowCount} clamped=${m.titleClamped.filter(Boolean).length}/${m.cards} mediaH=${m.mediaH.min}-${m.mediaH.max}`)
}
fs.writeFileSync(path.join(HERE, 'metrics-summary.txt'), lines.join('\n') + '\n')

// 토큰 대비
const T = TOKENS.light, D = TOKENS.dark
const pairs = (X, name) => [
  [`${name} 본문 fg/bg`, X.fg, X.bg], [`${name} 부가 muted/bg`, X.muted, X.bg], [`${name} 부가 muted/surface`, X.muted, X.surface], [`${name} fg2/bg`, X.fg2, X.bg],
  [`${name} 링크 link/bg`, X.link, X.bg], [`${name} 링크 link/surface`, X.link, X.surface], [`${name} 포커스 ring/bg`, X.ring, X.bg],
  [`${name} 테두리 bd/bg`, X.bd, X.bg], [`${name} 테두리 bd/surface`, X.bd, X.surface],
  [`${name} 면 surface/bg(비텍스트)`, X.surface, X.bg], [`${name} 면 hover/surface`, X.hover, X.surface],
  [`${name} 배너 onBanner/banner`, X.onBanner, X.banner], [`${name} 배너 보조 onBanner2/banner`, X.onBanner2, X.banner],
]
const cl = [...pairs(T, '라이트'), ['라이트 사진 크레딧 흰색/rgba(24,24,27,.82) 흰 사진 위(최악)', '#ffffff', mix('#18181b', '#ffffff', 0.82)], ...pairs(D, '다크(참고)')]
function mix(fg, bg, a) {
  const f = [1, 3, 5].map((i) => parseInt(fg.slice(i, i + 2), 16)), b = [1, 3, 5].map((i) => parseInt(bg.slice(i, i + 2), 16))
  return '#' + f.map((c, i) => Math.round(c * a + b[i] * (1 - a)).toString(16).padStart(2, '0')).join('')
}
const ctext = cl.map(([n, a, b]) => `${n}: ${a} on ${b} = ${ratio(a, b).toFixed(2)}`).join('\n') + '\n'
fs.writeFileSync(path.join(HERE, 'contrast-output.txt'), ctext)
console.log(lines.join('\n'))
console.log(ctext)
