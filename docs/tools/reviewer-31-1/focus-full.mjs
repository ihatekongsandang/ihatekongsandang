/**
 * 리뷰어 31 — 포커스 가림 전수(WCAG 2.4.11 AA / 2.4.12 AAA 참고).
 * 사용(저장소 루트, 로컬 next start 실행 중): node docs/tools/reviewer-31-1/focus-full.mjs <baseUrl>
 *
 * programmer-14 measure.mjs의 Tab 탐침은 40단계·fixed 요소만 본다(sticky 헤더 제외, 페이지 끝까지 가지 않음).
 * 이 도구는 페이지의 모든 Tab 정지점을 처음부터 끝까지(문서 밖으로 나갈 때까지) 앞으로 + 뒤로(Shift+Tab) 돌며
 * 포커스 요소 상자를 고정 요소(fixed 배너·sticky 헤더)와 대조한다.
 *   fullyHidden: 고정 요소 하나가 요소 상자를 완전히 덮음(2.4.11 위반)
 *   partly: 일부만 덮음(2.4.12 AAA 참고값)
 *   offscreen: 포커스 요소가 뷰포트 밖에 있음
 * 또한 DOM 순서상 랜드마크·제목 목록과 화면 y 좌표를 함께 기록한다(읽기 순서 대조용).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withChrome, delay } from '../programmer-04/cdp.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const base = process.argv[2]
if (!base) {
  console.error('사용: node focus-full.mjs <baseUrl>')
  process.exit(2)
}
const POST = '2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019'
const VIEWS = {
  home: '/',
  page2: '/page/2',
  post: `/post/${POST}`,
  tag: '/tag/dmz',
  tags: '/tags',
  about: '/about',
  terms: '/terms',
  en: '/en',
  postEn: `/en/post/${POST}`,
}
const SIZES = [
  { w: 320, h: 640, m: true },
  { w: 360, h: 740, m: true },
  { w: 768, h: 1024, m: true },
  { w: 1024, h: 768, m: true },
  { w: 1280, h: 800, m: false },
]

const PROBE = String.raw`(() => {
  const el = document.activeElement
  if (!el || el === document.body || el === document.documentElement) return null
  const b = el.getBoundingClientRect()
  const stuck = [...document.querySelectorAll('body *')].filter((x) => {
    const p = getComputedStyle(x).position
    return (p === 'fixed' || p === 'sticky') && !x.contains(el) && getComputedStyle(x).display !== 'none'
  }).map((x) => ({ name: x.tagName.toLowerCase() + (x.getAttribute('aria-label') ? '[' + x.getAttribute('aria-label') + ']' : ''), r: x.getBoundingClientRect() }))
  // sticky는 실제로 붙어 있을 때만(뷰포트 위·아래 끝에 닿아 있을 때) 가림 대상
  let full = null, part = null
  for (const s of stuck) {
    const f = s.r
    if (f.width < 1 || f.height < 1) continue
    const ix = Math.max(0, Math.min(f.right, b.right) - Math.max(f.left, b.left))
    const iy = Math.max(0, Math.min(f.bottom, b.bottom) - Math.max(f.top, b.top))
    if (ix * iy <= 0) continue
    if (f.left <= b.left + 1 && f.right >= b.right - 1 && f.top <= b.top + 1 && f.bottom >= b.bottom - 1) full = s.name
    else part = s.name
  }
  const off = b.bottom < 0 || b.top > innerHeight
  const t = (el.getAttribute('aria-label') || el.textContent || el.tagName).replace(/\s+/g, ' ').trim().slice(0, 24)
  return { key: el.tagName + '|' + (el.getAttribute('href') || '') + '|' + t + '|' + Math.round(b.top + scrollY) + '|' + Math.round(b.left), t, full, part, off, h: Math.round(b.height), y: Math.round(b.top) }
})()`

const ORDER = String.raw`(() => {
  const sel = 'header, nav, main, aside, footer, section, h1, h2, h3, figure, [data-cta]'
  return [...document.querySelectorAll(sel)].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 1 && b.height > 1 }).slice(0, 80).map((e) => {
    const b = e.getBoundingClientRect()
    const label = e.getAttribute('aria-label') || (e.matches('h1,h2,h3') ? e.textContent.trim().slice(0, 20) : '')
    return e.tagName.toLowerCase() + (label ? '「' + label + '」' : '') + '@' + Math.round(b.top + scrollY) + ',' + Math.round(b.left)
  })
})()`

async function tab(client, shift) {
  const mod = shift ? 8 : 0
  await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, modifiers: mod })
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, modifiers: mod })
  await delay(25)
}

const out = { runs: {}, order: {}, totals: { stops: 0, fullyHidden: 0, partly: 0, offscreen: 0 } }
let seq = 0
await withChrome(9531, async (client) => {
  for (const [key, url] of Object.entries(VIEWS)) {
    for (const vp of SIZES) {
      for (const dir of ['fwd', 'back']) {
        await client.setViewport(vp.w, vp.h, vp.m)
        await client.navigate(`${base}${url}?r=${++seq}`)
        await delay(200)
        if (dir === 'back') {
          await client.evaluate('scrollTo(0, document.documentElement.scrollHeight); document.activeElement && document.activeElement.blur(); 0')
          await delay(100)
        }
        const seen = new Set()
        const rec = []
        let firstKey = null
        for (let i = 0; i < 600; i++) {
          await tab(client, dir === 'back')
          const p = await client.evaluate(PROBE)
          if (!p) { if (rec.length) break; else continue }
          if (p.key === firstKey) break
          if (!firstKey) firstKey = p.key
          if (seen.has(p.key)) break
          seen.add(p.key)
          rec.push(p)
        }
        const fully = rec.filter((s) => s.full)
        const partly = rec.filter((s) => !s.full && s.part)
        const offs = rec.filter((s) => s.off)
        out.runs[`${key}-${vp.w}-${dir}`] = {
          stops: rec.length,
          fullyHidden: fully.map((s) => `${s.t} ← ${s.full}`),
          partly: partly.map((s) => `${s.t} ← ${s.part} (y=${s.y}, h=${s.h})`),
          offscreen: offs.map((s) => `${s.t} (y=${s.y})`),
        }
        out.totals.stops += rec.length
        out.totals.fullyHidden += fully.length
        out.totals.partly += partly.length
        out.totals.offscreen += offs.length
      }
      if (vp.w === 360 || vp.w === 1280) out.order[`${key}-${vp.w}`] = await client.evaluate(ORDER)
    }
  }
})
fs.writeFileSync(path.join(HERE, 'focus-full-output.json'), JSON.stringify(out, null, 1))
console.log('조합', Object.keys(out.runs).length, '· 정지점', out.totals.stops, '· 완전 가림', out.totals.fullyHidden, '· 일부 가림', out.totals.partly, '· 화면 밖', out.totals.offscreen)
