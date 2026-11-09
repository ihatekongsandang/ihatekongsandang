/**
 * 프로그래머 14 — 디자인 팀장 05 측정 도구(`docs/tools/designer-05/measure.mjs`)를 로컬 `next start`에 맞춰 옮긴 것.
 * 사용(저장소 루트, 로컬 프로덕션 서버 실행 중): node docs/tools/programmer-14/measure.mjs <baseUrl>
 *
 * - 측정 식(MEASURE)·Tab 탐침(FOCUS_PROBE)·폭(SIZES·REFLOW_W)·Tab 순회 40단계는 원본을 **글자 그대로** 가져왔다(아래 두 블록).
 * - 바꾼 것은 "어댑터"뿐: 목업의 `?view=` 대신 실제 경로를 열고, 선택자를 실제 마크업에 맞췄다.
 *   root = document.body(목업의 보기 하나 = 헤더~푸터 한 화면과 같은 범위) · 카드 = 피드 목록 항목 · 원문 이동 = `[data-cta]`
 *   · 본문 = `.post-body`(소개는 `.reading-page`) · 헤더 = `body > header` · 배너 = 배너 `<aside>`.
 * - 상세는 목업과 같은 게시물(대진연 회견, ko·en)을 쓴다. 목업 `states`(이미지 상태 모음) 화면은 실제 사이트에 없어 뺐다.
 * - 외부 요청: 같은 출처(127.0.0.1)·data: 이외의 요청을 전부 기록한다(실제 사이트는 GA가 측정 ID 없이 꺼져 있어야 0).
 * 출력: docs/tools/programmer-14/measure-output.json · 화면은 shots.mjs가 따로 찍는다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withChrome, delay } from '../programmer-04/cdp.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const base = process.argv[2]
if (!base) {
  console.error('사용: node measure.mjs <baseUrl>')
  process.exit(2)
}
const PORT = 9431
const POST = '2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019'
const VIEWS = {
  home: '/',
  post: `/post/${POST}`,
  en: '/en',
  postEn: `/en/post/${POST}`,
  tag: '/tag/dmz',
  about: '/about',
}

const SIZES = [
  { w: 360, h: 740, m: true }, { w: 390, h: 844, m: true },
  { w: 768, h: 1024, m: true }, { w: 834, h: 1194, m: true }, { w: 1024, h: 768, m: true },
  { w: 1280, h: 800, m: false }, { w: 1440, h: 900, m: false },
]
const REFLOW_W = [320, 360, 384, 390, 512, 640, 768, 834, 1024, 1280, 1440]
const SEL = {
  card: 'main ul > li:has([data-slot=card])',
  title: 'h3',
  cta: '[data-cta]',
  body: '.post-body, .reading-page',
  header: 'body > header',
  banner: 'aside[aria-label="외부 링크 안내"]',
}
const ROOT = 'document.body'

// ── 원본 그대로(designer-05/measure.mjs) ──
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

// ── 원본 그대로 끝 ──

const results = { m: {}, overflow: {}, focus: {} }
const external = []
const origin = new URL(base).origin
let seq = 0

async function open(client, viewKey, vp) {
  await client.setViewport(vp.w, vp.h, vp.m)
  await client.navigate(`${base}${VIEWS[viewKey]}${VIEWS[viewKey].includes('?') ? '&' : '?'}r=${++seq}`)
  await delay(150)
}
function measureExpr(viewKey) {
  const S = { ...SEL }
  // 원본 어댑터: 영어 상세는 enSel로 본문을 한 번 더 잰다(목업 F 계열과 같음)
  if (viewKey === 'postEn') S.enSel = '.post-body'
  if (viewKey === 'about') S.body = '.reading-page'
  return MEASURE.replace('ROOTEXPR', ROOT) + `(${JSON.stringify(S)}, '${viewKey}')`
}
async function tabWalk(client, viewKey, vp, max = 40) {
  await open(client, viewKey, vp)
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
  await client.send('Network.enable')
  client.on((msg) => {
    if (msg.method === 'Network.requestWillBeSent') {
      const u = msg.params.request.url
      if (!u.startsWith(origin) && !u.startsWith('data:')) external.push(u)
    }
  })
  for (const viewKey of Object.keys(VIEWS)) {
    for (const vp of SIZES) {
      await open(client, viewKey, vp)
      const m = await client.evaluate(measureExpr(viewKey))
      if (m.vw !== vp.w) console.log('경고: 폭 불일치', viewKey, vp.w, m.vw)
      results.m[`${viewKey}-${vp.w}`] = m
    }
  }
  await open(client, 'post', SIZES[0])
  await client.evaluate('scrollTo(0, 1400); 0'); await delay(250)
  results.scrolled = await client.evaluate(`(() => { const fx = [...document.querySelectorAll('body *')].filter(e => ['fixed','sticky'].includes(getComputedStyle(e).position) && getComputedStyle(e).display !== 'none').map(e => e.getBoundingClientRect()).filter(b => b.width > innerWidth * 0.4 && b.bottom > 0 && b.top < innerHeight); let top = 0, bot = 0; for (const b of fx) { if (b.top < innerHeight / 2) top = Math.max(top, b.bottom); else bot = Math.max(bot, innerHeight - b.top) } return { stuckTop: Math.round(top), stuckBottom: Math.round(bot), vh: innerHeight } })()`)
  for (const viewKey of Object.keys(VIEWS)) {
    for (const w of REFLOW_W) {
      await open(client, viewKey, { w, h: 800, m: w <= 1024 })
      results.overflow[`${viewKey}-${w}`] = await client.evaluate('document.documentElement.scrollWidth - innerWidth')
    }
  }
  for (const viewKey of ['home', 'post']) {
    for (const vp of [SIZES[0], SIZES[5]]) results.focus[`${viewKey}-${vp.w}`] = await tabWalk(client, viewKey, vp)
  }
})
results._external = [...new Set(external)]
fs.writeFileSync(path.join(HERE, 'measure-output.json'), JSON.stringify(results, null, 1))
console.log('저장 measure-output.json · 조합', Object.keys(results.m).length, '· 리플로우', Object.keys(results.overflow).length, '· 외부 요청', results._external.length)
