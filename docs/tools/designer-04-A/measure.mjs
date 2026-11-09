// 시안 A1~A3 스크린샷·수치 측정. 실행: node docs/tools/designer-04-A/measure.mjs (저장소 루트에서)
// 헤드리스 Chrome + DevTools 프로토콜(docs/tools/programmer-04/cdp.mjs 재사용). 목업은 file://로 연다.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { withChrome } from '../programmer-04/cdp.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const OUT = path.join(root, 'docs/tools/designer-04-A')
const ids = (process.argv[2] ? process.argv[2].split(',') : ['A1', 'A2', 'A3'])
const SHOT = process.argv[3] !== 'noshot'

const SIZES = [[360, 740, true], [390, 844, true], [768, 1024, true], [834, 1194, true], [1024, 768, true], [1280, 800, false], [1440, 900, false]]

const PAGE_FN = `(() => {
  const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 1 && r.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('.sr') }
  const view = document.querySelector('.view[style*=block], .view') && [...document.querySelectorAll('.view')].find(v => getComputedStyle(v).display !== 'none')
  const q = (s, r = view) => [...r.querySelectorAll(s)]
  const rect = (el) => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY), left: Math.round(r.left), right: Math.round(r.right), h: Math.round(r.height), w: Math.round(r.width) } }
  const out = { view: view.dataset.v, innerW: innerWidth, scrollW: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth }
  const hdr = view.querySelector('.hdr'); out.hdrH = hdr ? Math.round(hdr.getBoundingClientRect().height) : null
  const ban = view.querySelector('.banner') || document.querySelector('.banner'); const banVisible = ban && getComputedStyle(ban).display !== 'none'
  if (banVisible) { const r = ban.getBoundingClientRect(); out.banner = { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), pos: getComputedStyle(ban).position } }
  const feed = view.querySelector('.feed')
  if (feed) {
    const cards = q('.feed > li'); const r0 = rect(cards[0])
    out.firstCardTop = r0.top; out.headH = r0.top - (out.hdrH || 0)
    const cut = (out.banner && out.banner.pos === 'fixed' && out.banner.y > innerHeight / 2) ? out.banner.y : innerHeight
    out.cardsFullyVisible = cards.filter(c => { const r = c.getBoundingClientRect(); return r.top >= 0 && r.bottom <= cut }).length
    out.cardsFullyVisibleVp = cards.filter(c => { const r = c.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight }).length
    out.cardH = cards.map(c => rect(c).h)
    const lines = cards.map(c => { const h = c.querySelector('h3'); const lh = parseFloat(getComputedStyle(h).lineHeight); return Math.round(h.getBoundingClientRect().height / lh) })
    out.titleLines = lines
    const tops = [...new Set(cards.map(c => rect(c).top))]
    out.cols = cards.filter(c => rect(c).top === tops[0]).length
    out.cardW = rect(cards[0]).w
    const th = cards[0].querySelector('.thumb'); out.thumb = { w: rect(th).w, h: rect(th).h }
    // 같은 행 카드 높이 편차
    const rows = {}; cards.forEach(c => { const r = rect(c); (rows[r.top] ||= []).push(r.h) })
    out.rowHeightSpread = Math.max(...Object.values(rows).map(a => Math.max(...a) - Math.min(...a)))
    const intro = view.querySelector('.intro'); if (intro) out.introH = rect(intro).h
  }
  const h1 = view.querySelector('h1'); if (h1) { out.h1H = rect(h1).h }
  // 상세
  const cta = view.querySelector('.cta'); if (cta) { out.ctaTop = rect(cta).top; out.ctaBottom = rect(cta).bottom }
  const body = view.querySelector('.post-body')
  if (body) {
    const blocks = [...body.querySelectorAll('p, li')]
    const cpl = []
    for (const b of blocks) {
      const lh = parseFloat(getComputedStyle(b).lineHeight); const n = Math.round(b.getBoundingClientRect().height / lh)
      const chars = b.textContent.replace(/\\s+/g, ' ').trim().length
      if (n >= 3) cpl.push(chars / n)
    }
    out.charsPerLine = cpl.length ? Math.round(cpl.reduce((a, b) => a + b) / cpl.length * 10) / 10 : null
    out.charsPerLineMin = cpl.length ? Math.round(Math.min(...cpl)) : null
    out.charsPerLineMax = cpl.length ? Math.round(Math.max(...cpl)) : null
    // 가장 긴 줄(실제 줄 상자 글자 수): 첫 문단 Range로
    const p = body.querySelector('p'); const range = document.createRange(); range.selectNodeContents(p)
    const rects = [...range.getClientRects()]; out.bodyColW = Math.round(p.getBoundingClientRect().width)
    out.bodyFs = parseFloat(getComputedStyle(p).fontSize); out.bodyLh = Math.round(parseFloat(getComputedStyle(p).lineHeight) / out.bodyFs * 100) / 100
  }
  const share = view.querySelector('.sharegrid .btn'); if (share) out.shareTop = rect(share).top
  // 터치 영역 44px 미만(카드 제목 링크 제외: ::after가 카드 전체를 덮음)
  const targets = q('a[href], button, summary').filter(vis).filter(el => !el.closest('.card h3') && !el.closest('.skip') && !el.matches('.skip'))
  const allT = targets
  out.targets = allT.length
  out.small = allT.filter(el => { const r = el.getBoundingClientRect(); return r.height < 43.5 }).map(el => ({ t: (el.textContent || '').trim().slice(0, 24), h: Math.round(el.getBoundingClientRect().height), w: Math.round(el.getBoundingClientRect().width) }))
  out.narrow = allT.filter(el => { const r = el.getBoundingClientRect(); return r.width < 43.5 }).map(el => ({ t: (el.textContent || '').trim().slice(0, 24), w: Math.round(el.getBoundingClientRect().width) }))
  // 글자 크기 분포
  const hist = {}; let total = 0
  const walker = document.createTreeWalker(view, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) { const n = walker.currentNode; const t = n.textContent.replace(/\\s+/g, ''); if (!t) continue; const el = n.parentElement; if (!el || !vis(el)) continue; if (el.closest('.vlabel')) continue; const fs = Math.round(parseFloat(getComputedStyle(el).fontSize)); hist[fs] = (hist[fs] || 0) + t.length; total += t.length }
  out.sizeHist = hist; out.chars = total
  out.px12 = Math.round(((hist[12] || 0) + (hist[11] || 0)) / total * 1000) / 10
  out.pxLt14 = Math.round(Object.entries(hist).filter(([k]) => +k < 14).reduce((a, [, v]) => a + v, 0) / total * 1000) / 10
  out.docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  return out
})()`

async function setView(client, file, view, w, h, mobile) {
  await client.setViewport(w, h, mobile)
  await client.navigate(pathToFileURL(file).href + '?view=' + view)
}

const results = {}
await withChrome(9341, async (client) => {
  for (const id of ids) {
    const dir = path.join(root, 'design/v0.3-responsive', id)
    const file = path.join(dir, 'mockup.html')
    results[id] = {}
    const views = ['home', 'post', 'en', 'post-en', 'states']
    for (const view of views) {
      for (const [w, h, mobile] of SIZES) {
        await setView(client, file, view, w, h, mobile)
        const m = await client.evaluate(PAGE_FN)
        results[id][`${view}-${w}`] = m
        const wantShots = SHOT && [360, 768, 1280].includes(w)
        if (wantShots) {
          const name = `${id}-${view}-${w}`
          if (['home', 'post', 'en'].includes(view)) {
            const s = await client.send('Page.captureScreenshot', { format: 'png' })
            fs.writeFileSync(path.join(dir, `${name}-fold.png`), Buffer.from(s.data, 'base64'))
          }
          const docH = m.docH
          const s2 = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: docH, scale: 1 } })
          fs.writeFileSync(path.join(dir, `${name}-full.png`), Buffer.from(s2.data, 'base64'))
        }
      }
    }
    // 가로 넘침: 폭 전수(줌 200% 상당 = 폭 절반 포함), 5개 화면
    const overflow = []
    for (const view of views) {
      for (const w of [180, 195, 320, 360, 390, 640, 768, 834, 1024, 1280, 1440]) {
        await setView(client, file, view, w, 800, w <= 1024)
        const m = await client.evaluate(`({ o: document.documentElement.scrollWidth > innerWidth, sw: document.documentElement.scrollWidth, iw: innerWidth })`)
        overflow.push({ view, w, ...m })
      }
    }
    results[id].overflow = overflow
  }
})
fs.writeFileSync(path.join(OUT, `measure-output${ids.length === 1 ? '-' + ids[0] : ''}.json`), JSON.stringify(results, null, 1))
console.log('done', ids.join(','))
