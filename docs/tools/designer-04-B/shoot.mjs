// 시안 B 스크린샷 + 수치 측정. 실행: node shoot.mjs [B1 B2 B3]
// 헤드리스 Chrome + DevTools 프로토콜(docs/tools/programmer-04/cdp.mjs 재사용). file:// 목업만 연다(외부 요청 없음).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { withChrome, delay } from '../programmer-04/cdp.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DESIGN = path.join(HERE, '..', '..', '..', 'design', 'v0.3-responsive')
const VARIANTS = process.argv.slice(2).length ? process.argv.slice(2) : ['B1', 'B2', 'B3']
const SHOTS = [{ w: 360, h: 740, mobile: true }, { w: 768, h: 1024, mobile: true }, { w: 1280, h: 800, mobile: false }]
const EXTRA = [{ w: 390, h: 844, mobile: true }, { w: 834, h: 1194, mobile: true }, { w: 1024, h: 768, mobile: true }, { w: 1440, h: 900, mobile: false }]
const OVERFLOW_W = [320, 360, 390, 412, 640, 768, 834, 1024, 1280, 1440]
const SCREENS = [['home', 'home'], ['post', 'post'], ['en', 'en'], ['post-en', 'post-en']]

const MEASURE = String.raw`((screenId) => {
  const root = document.getElementById(screenId)
  const vw = innerWidth, vh = innerHeight
  const R = (el) => { const b = el.getBoundingClientRect(); return { x: Math.round(b.left), y: Math.round(b.top + scrollY), w: Math.round(b.width), h: Math.round(b.height), bottom: Math.round(b.bottom + scrollY) } }
  const vis = (el) => { const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); return cs.visibility !== 'hidden' && cs.display !== 'none' && b.width > 0 && b.height > 0 }
  const out = { vw, vh }
  out.overflowX = document.documentElement.scrollWidth - vw
  const hdr = root.querySelector('.hdr'), stack = root.querySelector('.stack')
  out.header = hdr ? R(hdr) : null
  const stuck = stack || hdr
  out.stackH = stuck ? R(stuck).h : 0
  const bn = root.querySelector('.bn'); out.banner = bn && vis(bn) ? R(bn) : null
  const tabs = root.querySelector('.tabs'); out.tabs = tabs && vis(tabs) ? R(tabs) : null
  // 고정 하단 가림 높이(배너·탭이 화면 아래에 붙은 경우)
  let bottomCover = 0
  for (const el of [bn, tabs]) { if (el && vis(el)) { const b = el.getBoundingClientRect(); if (getComputedStyle(el).position === 'fixed' && b.bottom > vh - 1 && b.width > vw * 0.5) bottomCover += b.height } }
  out.bottomCover = Math.round(bottomCover)
  const cards = [...root.querySelectorAll('.card')].filter(vis)
  out.cardCount = cards.length
  if (cards.length) {
    const c0 = R(cards[0]); out.firstCardTop = c0.y
    out.headRegionHeader = c0.y - (out.header ? out.header.bottom : 0)
    out.headRegionStack = c0.y - (stuck ? R(stuck).bottom : 0)
    const unobscured = vh - bottomCover
    out.fullyVisibleCards = cards.filter((c) => { const b = c.getBoundingClientRect(); return b.top >= 0 && b.bottom <= vh }).length
    out.fullyVisibleUnobscured = cards.filter((c) => { const b = c.getBoundingClientRect(); return b.top >= 0 && b.bottom <= unobscured }).length
    out.firstCardH = c0.h
    out.firstCardBottomVisible = c0.y + c0.h <= vh
    // 같은 행 카드 높이
    const rows = {}
    for (const c of cards) { const b = R(c); (rows[b.y] ??= []).push(b.h) }
    out.rowHeightsEqual = Object.values(rows).every((a) => a.every((h) => h === a[0]))
    out.rows = Object.keys(rows).length
    out.cols = Math.max(...Object.values(rows).map((a) => a.length))
    const t = cards.map((c) => c.querySelector('.ttl-wrap')).map((e) => { const lh = parseFloat(getComputedStyle(e).lineHeight); return Math.round(e.getBoundingClientRect().height / lh) })
    out.titleLines = t
    const imgs = cards.map((c) => R(c.querySelector('.media')))
    out.imageSize = imgs[0].w + 'x' + imgs[0].h
    out.cardSize = c0.w + 'x' + c0.h
  }
  // 터치 영역 44px 미만
  const small = []
  const sel = 'a, button, summary, select, input, [role=button]'
  for (const el of root.querySelectorAll(sel)) {
    if (!vis(el)) continue
    if (el.classList.contains('ttl') || el.classList.contains('skip')) continue
    if (el.closest('.post-body, .fine')) continue
    if (el.closest('.sr-only')) continue
    const b = el.getBoundingClientRect()
    if (b.height < 43.5 || b.width < 43.5) small.push({ t: (el.textContent || '').trim().slice(0, 24), w: Math.round(b.width), h: Math.round(b.height) })
  }
  out.small44 = small.length
  out.small44List = small.slice(0, 12)
  // 글자 크기 분포(보이는 글자 수)
  const hist = {}
  let total = 0
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let n
  while ((n = walker.nextNode())) {
    const tx = n.textContent.replace(/\s+/g, ' ').trim()
    if (!tx) continue
    const p = n.parentElement
    if (!p || p.closest('.sr-only, .mock-bar, .skip, [aria-hidden=true] .sr-only')) continue
    const cs = getComputedStyle(p)
    if (cs.display === 'none' || cs.visibility === 'hidden') continue
    const b = p.getBoundingClientRect(); if (b.width === 0 || b.height === 0) continue
    // 접힌 details 안의 숨김 텍스트는 건너뛴다
    const d = p.closest('details'); if (d && !d.open && !p.closest('summary')) continue
    const sz = Math.round(parseFloat(cs.fontSize) * 10) / 10
    hist[sz] = (hist[sz] ?? 0) + tx.length; total += tx.length
  }
  out.sizeHist = hist; out.chars = total
  out.pct12 = Math.round(((hist['12'] ?? 0) / total) * 1000) / 10
  // 본문 줄당 글자
  const lines = (el) => { const r = document.createRange(); r.selectNodeContents(el); const tops = new Set([...r.getClientRects()].filter((x) => x.width > 1).map((x) => Math.round(x.top))); const nn = Math.max(1, tops.size); const len = el.textContent.trim().length; return { lines: nn, chars: len, perLine: Math.round(len / nn), w: Math.round(el.getBoundingClientRect().width), fs: parseFloat(getComputedStyle(el).fontSize), lh: getComputedStyle(el).lineHeight } }
  const ps = [...root.querySelectorAll('.post-body p')].filter(vis).filter((p) => p.textContent.trim().length > 150)
  if (ps.length) { const all = ps.map(lines); out.bodyPerLine = Math.round(all.reduce((s, x) => s + x.perLine, 0) / all.length); out.bodyDetail = all[0]; out.bodyPerLineList = all.map((x) => x.perLine) }
  const cta = root.querySelector('.cta'); if (cta) { const r = R(cta); out.ctaY = r.y; out.ctaBottom = r.bottom; out.ctaInFold = r.bottom <= vh }
  const sh = root.querySelector('.share'); if (sh) out.shareY = R(sh).y
  out.docH = document.documentElement.scrollHeight
  return out
})`

const out = {}
await withChrome(9387, async (client) => {
  for (const v of VARIANTS) {
    const url = pathToFileURL(path.join(DESIGN, v, 'mockup.html')).href
    out[v] = {}
    const shot = async (name, full) => {
      if (full) {
        const m = await client.send('Page.getLayoutMetrics')
        const w = Math.ceil(m.cssContentSize.width), h = Math.ceil(m.cssContentSize.height)
        const { data } = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } })
        fs.writeFileSync(path.join(DESIGN, v, name), Buffer.from(data, 'base64'))
      } else {
        const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
        fs.writeFileSync(path.join(DESIGN, v, name), Buffer.from(data, 'base64'))
      }
    }
    for (const vp of [...SHOTS, ...EXTRA]) {
      await client.setViewport(vp.w, vp.h, vp.mobile)
      await client.navigate(url)
      for (const [sid, key] of SCREENS) {
        await client.evaluate(`document.body.dataset.only='${sid}'; scrollTo(0,0); 0`)
        await delay(150)
        const m = await client.evaluate(`${MEASURE}('${sid}')`)
        if (m.vw !== vp.w) console.log('경고: 뷰포트 폭 불일치', v, key, vp.w, m.vw)
        out[v][`${key}-${vp.w}`] = m
        const main = SHOTS.some((s) => s.w === vp.w)
        if (main && (key === 'home' || key === 'post')) { await shot(`${v}-${key}-${vp.w}.png`, false); await shot(`${v}-${key}-${vp.w}-full.png`, true) }
        if (main && (key === 'en') && vp.w !== 1280) { await shot(`${v}-en-${vp.w}.png`, false) }
        if (main && key === 'post-en' && vp.w === 360) { await shot(`${v}-post-en-${vp.w}.png`, false) }
      }
    }
    // 열림 상태 보조 캡처
    await client.setViewport(360, 740, true); await client.navigate(url)
    if (v === 'B2') {
      await client.evaluate(`document.body.dataset.only='home'; document.querySelector('#home details.topics').open=true; scrollTo(0,0); 0`); await delay(200)
      await shot('B2-home-360-topics-open.png', false)
    }
    await client.evaluate(`document.body.dataset.only='home'; scrollTo(0,0); document.querySelector('#home details.intro').open=true; 0`); await delay(200)
    await shot(`${v}-home-360-intro-open.png`, false)
    // 줌 200%·400% 가로 넘침(뷰포트 폭 = 1280÷줌 등) 포함 전 폭 넘침
    out[v].overflow = {}
    for (const w of OVERFLOW_W) {
      await client.setViewport(w, 800, false)
      await client.navigate(url)
      for (const [sid] of SCREENS) {
        await client.evaluate(`document.body.dataset.only='${sid}'; 0`)
        out[v].overflow[`${sid}-${w}`] = await client.evaluate('document.documentElement.scrollWidth - innerWidth')
      }
    }
  }
})
fs.writeFileSync(path.join(HERE, 'measure-output.json'), JSON.stringify(out, null, 1))
console.log('done', Object.keys(out))
