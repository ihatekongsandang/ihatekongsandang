/**
 * 리뷰어 31-1 — 상세 보조 열 포커스 화면 밖 **전 게시물** 확인(probe-sticky는 게시물 2개·Tab 40회 한도라 보조 열 전체를 다 돌지 못할 수 있다).
 * 사용(저장소 루트, 로컬 next start 실행 중): node docs/tools/reviewer-31-1/aside-focus-all.mjs <baseUrl>
 * ① 전수: content/posts(ko) + content/posts-en(en) 전체 × 1024×600·1280×600(가장 낮은 높이). 보조 열 안 a·button 각각에 focus()
 *    (브라우저 기본 스크롤 포함)를 주고, 요소가 화면(헤더 아래 ~ 화면 아래) 안에 완전히 들어오는지 본다. 보조 열 높이도 함께 기록.
 * ② Tab: 보조 열이 가장 긴 게시물(①에서 찾음) × 5개 크기, 보조 열을 빠져나갈 때까지 Tab(최대 200회).
 * 출력: docs/tools/reviewer-31-1/aside-focus-all-output.json · 콘솔 요약.
 */
import fs from 'node:fs'
import { withChrome, delay } from '../programmer-04/cdp.mjs'
const base = process.argv[2]
const ko = fs.readdirSync('content/posts').filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3))
const en = fs.readdirSync('content/posts-en').filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3))
const pages = [...ko.map((id) => ['ko', `/post/${id}`, id]), ...en.map((id) => ['en', `/en/post/${id}`, id])]
const CHECK = `(() => {
  const aside = document.querySelector('main aside')
  if (!aside) return { missing: true }
  const hdr = document.querySelector('header')
  const hb = hdr ? hdr.getBoundingClientRect().bottom : 0
  const els = [...aside.querySelectorAll('a[href], button')]
  const off = []
  for (const el of els) {
    window.scrollTo(0, 0)
    el.focus()
    const b = el.getBoundingClientRect()
    if (b.top < hb - 0.5 || b.bottom > innerHeight + 0.5) off.push({ t: el.textContent.trim().slice(0, 14), top: Math.round(b.top), bottom: Math.round(b.bottom) })
  }
  return { h: Math.round(aside.getBoundingClientRect().height), n: els.length, off, pos: getComputedStyle(aside).position }
})()`
const out = { all: [], totals: {}, tab: [] }
await withChrome(9536, async (client) => {
  for (const [w, h] of [[1024, 600], [1280, 600]]) {
    await client.setViewport(w, h, false)
    let n = 0, offN = 0, pages0 = 0, nonStatic = 0
    for (const [lang, path, id] of pages) {
      await client.navigate(`${base}${path}`)
      await delay(60)
      const r = await client.evaluate(CHECK)
      out.all.push({ w, h, lang, id, ...r })
      if (r.missing) continue
      pages0++
      n += r.n
      offN += r.off.length
      if (r.pos !== 'static' && r.pos !== 'relative') nonStatic++
    }
    out.totals[`${w}x${h}`] = { pages: pages0, focusables: n, offscreen: offN, nonStaticAside: nonStatic }
  }
  const longest = out.all.filter((r) => r.w === 1024 && r.lang === 'ko' && !r.missing).reduce((m, r) => (r.h > m.h ? r : m))
  out.longest = { id: longest.id, h: longest.h }
  for (const [w, h] of [[1024, 768], [1024, 600], [1280, 800], [1280, 600], [1440, 900]]) {
    await client.setViewport(w, h, false)
    await client.navigate(`${base}/post/${longest.id}?t=${w}${h}`)
    await delay(250)
    const rows = []
    let entered = false
    for (let i = 0; i < 200; i++) {
      await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
      await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
      await delay(30)
      const p = await client.evaluate(`(() => { const el = document.activeElement; if (!el.closest('main aside')) return null; const hb = document.querySelector('header').getBoundingClientRect().bottom; const b = el.getBoundingClientRect(); return { t: el.textContent.trim().slice(0, 14), top: Math.round(b.top), bottom: Math.round(b.bottom), hb: Math.round(hb), vh: innerHeight } })()`)
      if (p) { rows.push(p); entered = true } else if (entered) break
    }
    const total = await client.evaluate(`document.querySelectorAll('main aside a[href], main aside button').length`)
    const off = rows.filter((r) => r.bottom > r.vh || r.top < r.hb)
    out.tab.push({ size: `${w}x${h}`, asideFocusables: total, visited: rows.length, offscreen: off.length, off })
  }
})
fs.writeFileSync('docs/tools/reviewer-31-1/aside-focus-all-output.json', JSON.stringify(out, null, 1))
console.log('전수', JSON.stringify(out.totals))
console.log('가장 긴 보조 열', JSON.stringify(out.longest))
for (const t of out.tab) console.log('Tab', t.size, '보조 열 요소', t.asideFocusables, '방문', t.visited, '화면 밖', t.offscreen)
