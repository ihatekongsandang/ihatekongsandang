// 디자인 팀장 05 — 시안 9개 + 보강안(final) 통일 재측정 도구.
// 실행(저장소 루트): node docs/tools/designer-05/measure.mjs [A1,B2,...|final] [noshot]
// - 헤드리스 Chrome + DevTools 프로토콜(docs/tools/programmer-04/cdp.mjs 재사용), 전용 포트 9411.
// - 목업은 file:// 로 연다. 외부 요청(file:·data: 이외)은 전부 기록한다.
// - 시안마다 화면 전환 방식·클래스 이름이 달라 "어댑터"(열기 방법 + 선택자)만 다르게 두고,
//   측정 식(MEASURE)은 하나로 통일했다. 디자이너 자체 측정값은 쓰지 않는다.
// 출력: docs/tools/designer-05/measure-output.json, screens/*.png
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { withChrome, delay } from '../programmer-04/cdp.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../../..')
const DESIGN = path.join(ROOT, 'design/v0.3-responsive')
const SCREENS = path.join(HERE, 'screens')
fs.mkdirSync(SCREENS, { recursive: true })
const PORT = 9411

const ALL = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
const ids = process.argv[2] ? process.argv[2].split(',') : ALL
const SHOT = process.argv[3] !== 'noshot'

const SIZES = [
  { w: 360, h: 740, m: true }, { w: 390, h: 844, m: true },
  { w: 768, h: 1024, m: true }, { w: 834, h: 1194, m: true }, { w: 1024, h: 768, m: true },
  { w: 1280, h: 800, m: false }, { w: 1440, h: 900, m: false },
]
const SHOT_W = new Set([360, 390, 768, 834, 1024, 1280])
const FULL_W = new Set([360, 768, 1280])
// 리플로우(줌 200% 상당): 640=1280@200%, 512=1024@200%, 384=768@200%, 320=WCAG 1.4.10 기준 폭
const REFLOW_W = [320, 360, 384, 390, 512, 640, 768, 834, 1024, 1280, 1440]

// 어댑터: 화면 이름 → 여는 방법, 선택자
const FAMILY = {
  A: {
    views: { home: 'home', post: 'post', en: 'en', postEn: 'post-en' },
    url: (base, v, n) => `${base}?view=${v}&r=${n}`,
    after: () => '0',
    root: `[...document.querySelectorAll('.view')].find(v => getComputedStyle(v).display !== 'none')`,
    sel: { card: '.feed > li', title: 'h3', cta: '.cta', body: '.post-body', header: '.hdr', banner: '.banner' },
    enBody: { view: 'postEn', sel: '.post-body' },
  },
  B: {
    views: { home: 'home', post: 'post', en: 'en', postEn: 'post-en' },
    url: (base, v, n) => `${base}?r=${n}`,
    after: (v) => `document.body.dataset.only='${v}'; scrollTo(0,0); 0`,
    root: `document.getElementById(document.body.dataset.only)`,
    sel: { card: '.card', title: '.ttl-wrap', cta: '.cta', body: '.post-body', header: '.stack, .hdr', banner: '.bn' },
    enBody: { view: 'postEn', sel: '.post-body' },
  },
  C: {
    views: { home: 'home', post: 'post', en: 'en' },
    url: (base, v, n) => `${base}?r=${n}#${v}`,
    after: (v) => `document.documentElement.setAttribute('data-view','${v}'); scrollTo(0,0); 0`,
    root: `document.getElementById(document.documentElement.getAttribute('data-view'))`,
    sel: { card: '.card', title: '.title', cta: '.cta .btn, .cta a', body: '.post-body:not([lang=en])', header: '.site-header', banner: '.banner' },
    enBody: { view: 'post', sel: '#en-sample' },
  },
  F: {
    views: { home: 'home', post: 'post', en: 'en', postEn: 'post-en', tag: 'tag', about: 'about', states: 'states' },
    url: (base, v, n) => `${base}?view=${v}&r=${n}`,
    after: () => '0',
    root: `document.querySelector('.view[data-v="' + document.documentElement.dataset.view + '"]')`,
    sel: { card: '.feed > li', title: '.ct', cta: '.cta', body: '.post-body', header: '.hdr', banner: '.banner' },
    enBody: { view: 'postEn', sel: '.post-body' },
  },
}
const famOf = (id) => (id === 'final' ? 'F' : id[0])
const fileOf = (id) => path.join(DESIGN, id, 'mockup.html')

const MEASURE = String.raw`((S, kind) => {
  const root = ROOTEXPR
  const vw = innerWidth, vh = innerHeight
  const R = (el) => { const b = el.getBoundingClientRect(); return { x: Math.round(b.left), y: Math.round(b.top + scrollY), w: Math.round(b.width), h: Math.round(b.height), b: Math.round(b.bottom + scrollY), r: Math.round(b.right) } }
  const vis = (el) => { if (!el) return false; const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); return cs.visibility !== 'hidden' && cs.display !== 'none' && b.width > 1 && b.height > 1 }
  const q1 = (s) => { for (const x of s.split(',')) { const e = [...root.querySelectorAll(x.trim())].find(vis); if (e) return e } return null }
  const out = { vw, vh, overflowX: document.documentElement.scrollWidth - vw }
  // 고정 요소(fixed) 목록 — 가림 판정용
  const fixed = [...document.querySelectorAll('body *')].filter((el) => getComputedStyle(el).position === 'fixed' && vis(el))
    .filter((el) => !fixed0(el))
  function fixed0(el) { let p = el.parentElement; while (p) { if (getComputedStyle(p).position === 'fixed') return true; p = p.parentElement } return false }
  const fr = fixed.map((el) => { const b = el.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom, cls: (el.className && el.className.baseVal === undefined ? el.className : '') + '' } })
  out.fixed = fr.map((f) => ({ cls: f.cls.slice(0, 30), x: Math.round(f.l), y: Math.round(f.t), w: Math.round(f.r - f.l), h: Math.round(f.b - f.t) }))
  const hit = (b) => fr.some((f) => f.l < b.right - 1 && f.r > b.left + 1 && f.t < b.bottom - 1 && f.b > b.top + 1)
  const hdr = q1(S.header); out.headerH = hdr ? Math.round(hdr.getBoundingClientRect().height) : null
  const hdrBottom = hdr ? hdr.getBoundingClientRect().bottom : 0
  const bn = document.querySelector(S.banner)
  out.banner = bn && vis(bn) ? (() => { const b = bn.getBoundingClientRect(); return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height), pos: getComputedStyle(bn).position } })() : null
  // 카드
  const cards = [...root.querySelectorAll(S.card)].filter(vis)
  if (cards.length) {
    const rs = cards.map(R)
    out.cards = cards.length
    out.firstTop = rs[0].y
    out.headH = Math.round(rs[0].y - hdrBottom)
    const tops = {}; rs.forEach((r) => { (tops[r.y] ??= []).push(r.h) })
    out.cols = Math.max(...Object.values(tops).map((a) => a.length))
    out.rowSpread = Math.max(...Object.values(tops).map((a) => Math.max(...a) - Math.min(...a)))
    out.cardW = rs[0].w; out.cardH = rs[0].h
    out.cardWs = [...new Set(rs.map((r) => r.w))]
    out.inFold = cards.filter((c) => { const b = c.getBoundingClientRect(); return b.top >= 0 && b.bottom <= vh }).length
    out.inFoldClear = cards.filter((c) => { const b = c.getBoundingClientRect(); return b.top >= hdrBottom - 1 && b.bottom <= vh && !hit(b) }).length
    const img = cards[0].querySelector('img, svg, [class*=thumb], [class*=media], .ph, figure'); if (img) { const b = img.getBoundingClientRect(); out.img0 = Math.round(b.width) + 'x' + Math.round(b.height) }
    out.titleLines = cards.map((c) => { const t = c.querySelector(S.title); if (!t) return null; const lh = parseFloat(getComputedStyle(t).lineHeight) || parseFloat(getComputedStyle(t).fontSize) * 1.4; return Math.round(t.getBoundingClientRect().height / lh) })
    const t0 = cards[0].querySelector(S.title); if (t0) out.titleFs = parseFloat(getComputedStyle(t0).fontSize)
  }
  // 상세
  const cta = q1(S.cta)
  if (cta) { const b = cta.getBoundingClientRect(); out.ctaY = Math.round(b.top + scrollY); out.ctaB = Math.round(b.bottom + scrollY); out.ctaInFold = b.bottom <= vh; out.ctaObscured = hit(b) }
  const lines = (el) => { const r = document.createRange(); r.selectNodeContents(el); const t = new Set([...r.getClientRects()].filter((x) => x.width > 1).map((x) => Math.round(x.top))); return Math.max(1, t.size) }
  const cpl = (container) => {
    const blocks = [...container.querySelectorAll('p, li')].filter(vis).filter((b) => !b.querySelector('p, li'))
    const per = blocks.map((b) => ({ n: lines(b), len: b.textContent.replace(/\s+/g, ' ').trim().length })).filter((x) => x.n >= 3)
    if (!per.length) return null
    const p = blocks[0]
    return { cpl: Math.round(per.reduce((a, x) => a + x.len / x.n, 0) / per.length * 10) / 10, blocks: per.length, fs: parseFloat(getComputedStyle(p).fontSize), lh: Math.round(parseFloat(getComputedStyle(p).lineHeight) / parseFloat(getComputedStyle(p).fontSize) * 100) / 100, colW: Math.round(p.getBoundingClientRect().width) }
  }
  if (kind === 'post' || kind === 'postEn' || kind === 'about') { const body = q1(S.body); if (body) out.body = cpl(body) }
  if (S.enSel) { const e = root.querySelector(S.enSel); if (e && vis(e)) out.bodyEn = cpl(e.matches('p') ? e.parentElement : e) }
  // 터치 대상: 높이 44 미만. 제외 = 카드 제목 링크(카드 전체 덮음), 화면 밖(건너뛰기 링크), 문장 속 링크(같은 문단에 다른 글자가 있는 인라인 링크)
  const inline = (el) => { if (el.tagName !== 'A') return false; const d = getComputedStyle(el).display; if (d !== 'inline') return false; const p = el.closest('p, li, dd, span.t, small'); if (!p) return false; return p.textContent.trim().length > el.textContent.trim().length + 8 }
  const targets = [...root.querySelectorAll('a[href], button, summary, select, input:not([type=hidden])')].filter(vis)
    .filter((el) => !el.closest(S.title)).filter((el) => { const b = el.getBoundingClientRect(); return b.right > 0 && b.left < vw })
  const bnA = bn && vis(bn) ? [...bn.querySelectorAll('a')] : []
  const all = [...targets, ...bnA.filter((a) => !targets.includes(a))]
  const small = all.filter((el) => el.getBoundingClientRect().height < 43.5 && !inline(el))
  out.targets = all.length
  out.small44 = small.length
  out.small44List = small.slice(0, 10).map((el) => ({ t: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 18), w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) }))
  out.inlineExcluded = all.filter(inline).length
  out.under24 = all.filter((el) => { const b = el.getBoundingClientRect(); return (b.height < 24 || b.width < 24) && !inline(el) }).length
  // 글자 크기 분포(보이는 글자) + 글자 대비
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 } }
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b) }
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
  const over = (top, base) => ({ r: top.r * top.a + base.r * (1 - top.a), g: top.g * top.a + base.g * (1 - top.a), b: top.b * top.a + base.b * (1 - top.a), a: 1 })
  // 요소 뒤 실제 배경: 조상 배경색을 쌓는다. 배경 그림(그라데이션 등)을 만나면 흰·검정 두 기준으로 최악값
  const bgOf = (el) => {
    const layers = []; let img = false; let e = el
    while (e && e.nodeType === 1) { const cs = getComputedStyle(e); const c = parse(cs.backgroundColor); if (c && c.a > 0) layers.push(c); if (c && c.a >= 1) break; if (cs.backgroundImage && cs.backgroundImage !== 'none') { img = true; break } e = e.parentElement }
    const bases = img || !layers.length || layers[layers.length - 1].a < 1 ? (img ? [{ r: 255, g: 255, b: 255, a: 1 }, { r: 0, g: 0, b: 0, a: 1 }] : [{ r: 255, g: 255, b: 255, a: 1 }]) : [layers[layers.length - 1]]
    return bases.map((base) => layers.slice().reverse().reduce((acc, l) => over(l, acc), base))
  }
  const hist = {}; let total = 0; const lowC = []; let checked = 0; let minC = 99
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const seen = new Set()
  let n
  while ((n = walk.nextNode())) {
    const tx = n.textContent.replace(/\s+/g, '').trim(); if (!tx) continue
    const el = n.parentElement; if (!el || !vis(el)) continue
    if (el.closest('script, style, .vlabel, .mock-bar, .sr, .sr-only, svg')) continue
    const d = el.closest('details'); if (d && !d.open && !el.closest('summary')) continue
    const cs = getComputedStyle(el)
    const fs = Math.round(parseFloat(cs.fontSize) * 10) / 10
    hist[fs] = (hist[fs] || 0) + tx.length; total += tx.length
    if (seen.has(el)) continue; seen.add(el)
    const fg = parse(cs.color); if (!fg) continue
    const bgs = bgOf(el)
    const r = Math.min(...bgs.map((bg) => ratio(fg.a < 1 ? over(fg, bg) : fg, bg)))
    const large = fs >= 24 || (fs >= 18.6 && +cs.fontWeight >= 700)
    checked++; if (r < minC) minC = r
    if (r < (large ? 3 : 4.5)) lowC.push({ t: tx.slice(0, 16), fs, r: Math.round(r * 100) / 100, fg: cs.color })
  }
  out.sizeHist = hist; out.chars = total
  out.pct12 = total ? Math.round(Object.entries(hist).filter(([k]) => +k <= 12.4).reduce((a, [, v]) => a + v, 0) / total * 1000) / 10 : null
  out.minFs = Math.min(...Object.keys(hist).map(Number))
  out.textChecked = checked; out.textMinContrast = Math.round(minC * 100) / 100; out.textLow = lowC.slice(0, 10); out.textLowN = lowC.length
  // 비텍스트 경계: 보이는 컨트롤·카드의 테두리 색 대비(테두리 있는 것만), 카드 면 대비
  const bd = {}; const bdCard = {}
  for (const el of [...all, ...cards]) {
    const isCard = cards.includes(el); const tgt = isCard ? bdCard : bd
    const cs = getComputedStyle(el)
    for (const side of ['Top', 'Bottom', 'Left']) {
      const w = parseFloat(cs['border' + side + 'Width']); if (!w || cs['border' + side + 'Style'] === 'none') continue
      const c = parse(cs['border' + side + 'Color']); if (!c || c.a === 0) continue
      const bg = bgOf(el.parentElement)[0]; const rr = Math.round(ratio(c.a < 1 ? over(c, bg) : c, bg) * 100) / 100
      const k = cs['border' + side + 'Color'] + ' on ' + 'rgb(' + [bg.r, bg.g, bg.b].map(Math.round).join(',') + ')'
      tgt[k] = { r: rr, n: (tgt[k] ? tgt[k].n : 0) + 1 }; break
    }
  }
  out.borders = bd; out.cardBorders = bdCard
  out.borderMin = Object.values(bd).length ? Math.min(...Object.values(bd).map((x) => x.r)) : null
  if (cards.length) { const c = cards[0]; const cb = bgOf(c)[0]; const pb = bgOf(c.parentElement)[0]; out.cardFaceRatio = Math.round(ratio(cb, pb) * 100) / 100 }
  out.docH = document.documentElement.scrollHeight
  return out
})`

// 키보드 Tab 순회: 포커스 표시 유무·고정 요소에 완전히 가림 여부
const FOCUS_PROBE = String.raw`(() => {
  const el = document.activeElement; if (!el || el === document.body) return null
  const cs = getComputedStyle(el)
  // 포커스 표시: 요소 자신 또는 조상 4단계(:has·:focus-within 링) 의 outline/box-shadow
  const has = (x) => { const s = getComputedStyle(x); return (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== 'none') }
  let ring = has(el); let a = el.parentElement; for (let i = 0; i < 4 && a && !ring; i++) { ring = has(a); a = a.parentElement }
  const b = el.getBoundingClientRect()
  const fixed = [...document.querySelectorAll('body *')].filter((x) => getComputedStyle(x).position === 'fixed' && !x.contains(el) && getComputedStyle(x).display !== 'none').map((x) => x.getBoundingClientRect())
  const covered = fixed.some((f) => f.left <= b.left + 1 && f.right >= b.right - 1 && f.top <= b.top + 1 && f.bottom >= b.bottom - 1)
  return { t: (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 20), ring, covered, y: Math.round(b.top + scrollY) }
})()`

const results = {}
const external = []
let seq = 0

async function open(client, id, viewKey, vp) {
  const F = FAMILY[famOf(id)]
  const base = pathToFileURL(fileOf(id)).href
  await client.setViewport(vp.w, vp.h, vp.m)
  await client.navigate(F.url(base, F.views[viewKey], ++seq))
  await client.evaluate(F.after(F.views[viewKey]))
  await delay(120)
}

function measureExpr(id, viewKey) {
  const F = FAMILY[famOf(id)]
  const S = { ...F.sel }
  if (F.enBody.view === viewKey) S.enSel = F.enBody.sel
  return MEASURE.replace('ROOTEXPR', F.root) + `(${JSON.stringify(S)}, '${viewKey}')`
}

async function shot(client, name, full) {
  if (full) {
    const m = await client.send('Page.getLayoutMetrics')
    const w = Math.ceil(m.cssContentSize.width), h = Math.min(Math.ceil(m.cssContentSize.height), 16000)
    const { data } = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } })
    fs.writeFileSync(path.join(SCREENS, name), Buffer.from(data, 'base64'))
  } else {
    const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync(path.join(SCREENS, name), Buffer.from(data, 'base64'))
  }
}

async function tabWalk(client, id, viewKey, vp, max = 40) {
  await open(client, id, viewKey, vp)
  const seen = []
  for (let i = 0; i < max; i++) {
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await delay(30)
    const p = await client.evaluate(FOCUS_PROBE)
    if (p) seen.push(p)
  }
  return { steps: seen.length, noRing: seen.filter((s) => !s.ring).map((s) => s.t), covered: seen.filter((s) => s.covered).map((s) => s.t) }
}

await withChrome(PORT, async (client) => {
  client.on((msg) => {
    if (msg.method === 'Network.requestWillBeSent') {
      const u = msg.params.request.url
      if (!u.startsWith('file:') && !u.startsWith('data:')) external.push(u)
    }
  })
  for (const id of ids) {
    const F = FAMILY[famOf(id)]
    results[id] = { m: {}, overflow: {}, focus: {} }
    for (const viewKey of Object.keys(F.views)) {
      for (const vp of SIZES) {
        await open(client, id, viewKey, vp)
        const m = await client.evaluate(measureExpr(id, viewKey))
        if (m.vw !== vp.w) console.log('경고: 폭 불일치', id, viewKey, vp.w, m.vw)
        results[id].m[`${viewKey}-${vp.w}`] = m
        if (SHOT && SHOT_W.has(vp.w) && ['home', 'post', 'en', 'tag', 'about', 'postEn', 'states'].includes(viewKey)) {
          if (id !== 'final' && !['home', 'post', 'en'].includes(viewKey)) continue
          await shot(client, `${id}-${viewKey}-${vp.w}.png`, false)
          if (FULL_W.has(vp.w) && (viewKey === 'home' || viewKey === 'post' || id === 'final')) await shot(client, `${id}-${viewKey}-${vp.w}-full.png`, true)
        }
      }
    }
    // 상세 360 스크롤 중간(배너·고정 막대가 본문을 덮는지 확인용)
    await open(client, id, 'post', SIZES[0])
    await client.evaluate('scrollTo(0, 1400); 0'); await delay(250)
    if (SHOT) await shot(client, `${id}-post-360-scrolled.png`, false)
    results[id].scrolled = await client.evaluate(`(() => { const fx = [...document.querySelectorAll('body *')].filter(e => ['fixed','sticky'].includes(getComputedStyle(e).position) && getComputedStyle(e).display !== 'none').map(e => e.getBoundingClientRect()).filter(b => b.width > innerWidth * 0.4 && b.bottom > 0 && b.top < innerHeight); let top = 0, bot = 0; for (const b of fx) { if (b.top < innerHeight / 2) top = Math.max(top, b.bottom); else bot = Math.max(bot, innerHeight - b.top) } return { stuckTop: Math.round(top), stuckBottom: Math.round(bot), vh: innerHeight } })()`)
    // 리플로우(가로 넘침)
    for (const viewKey of Object.keys(F.views)) {
      for (const w of REFLOW_W) {
        await open(client, id, viewKey, { w, h: 800, m: w <= 1024 })
        results[id].overflow[`${viewKey}-${w}`] = await client.evaluate('document.documentElement.scrollWidth - innerWidth')
      }
    }
    // 키보드 순회 (홈·상세, 360·1280)
    for (const viewKey of ['home', 'post']) {
      for (const vp of [SIZES[0], SIZES[5]]) results[id].focus[`${viewKey}-${vp.w}`] = await tabWalk(client, id, viewKey, vp)
    }
    console.log('측정 완료', id)
  }
})
results._external = [...new Set(external)]
const outName = ids.length === ALL.length ? 'measure-output.json' : `measure-output-${ids.join('_')}.json`
fs.writeFileSync(path.join(HERE, outName), JSON.stringify(results, null, 1))
console.log('저장', outName, '외부 요청', results._external.length)
