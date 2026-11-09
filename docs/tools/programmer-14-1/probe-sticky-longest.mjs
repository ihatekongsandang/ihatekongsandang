/**
 * 프로그래머 14-1 — 리뷰어 31 `probe-sticky.mjs` 사본(바꾼 것: 게시물을 인자로, 기본은 보조 열이 가장 긴 게시물 · Chrome 포트). 원본 설명: 리뷰어 31 — 상세 보조 열(sticky) 포커스 화면 밖 재현 + 건너뛰기 링크 실제 최상단 요소 확인.
 * 사용: node docs/tools/programmer-14-1/probe-sticky-longest.mjs <baseUrl> [게시물 id]
 */
import { withChrome, delay } from '../programmer-04/cdp.mjs'
const base = process.argv[2]
const POST = process.argv[3] ?? '2026-08-29-idontknowpolitics-martial-law-nk-policy'
await withChrome(9445, async (client) => {
  for (const [w, h] of [[1024, 768], [1024, 600], [1280, 800], [1280, 600], [1440, 900]]) {
    await client.setViewport(w, h, w <= 1024)
    await client.navigate(`${base}/post/${POST}?z=${w}${h}`)
    await delay(250)
    const info = await client.evaluate(`(() => {
      const aside = document.querySelector('aside[aria-label="보조 정보"]')
      const a = aside.getBoundingClientRect()
      const art = document.querySelector('article').getBoundingClientRect()
      const chips = [...aside.querySelectorAll('a')]
      return { asideH: Math.round(a.height), articleH: Math.round(art.height), vh: innerHeight, links: chips.length }
    })()`)
    // Tab 순회하며 aside 안 링크에 포커스됐을 때 화면 위치
    const rows = []
    for (let i = 0; i < 40; i++) {
      await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
      await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
      await delay(40)
      const p = await client.evaluate(`(() => { const el = document.activeElement; if (!el.closest('aside[aria-label="보조 정보"]')) return null; const b = el.getBoundingClientRect(); return { t: el.textContent.trim().slice(0, 14), top: Math.round(b.top), bottom: Math.round(b.bottom), vh: innerHeight, scrollY: Math.round(scrollY), maxY: document.documentElement.scrollHeight - innerHeight } })()`)
      if (p) rows.push(p)
    }
    const off = rows.filter((r) => r.bottom > r.vh || r.top < 0)
    console.log(`${w}x${h}`, JSON.stringify(info), '보조 열 포커스', rows.length, '화면 밖', off.length, JSON.stringify(off.slice(0, 4)))
  }
  // 건너뛰기 링크: 포커스 시 그 중심점의 최상단 요소가 링크 자신인가
  for (const w of [360, 1280]) {
    await client.setViewport(w, 740, w < 1024)
    await client.navigate(`${base}/?s=${w}`)
    await delay(200)
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await delay(50)
    const s = await client.evaluate(`(() => { const el = document.activeElement; const b = el.getBoundingClientRect(); const pts = [[b.left+2,b.top+2],[b.right-2,b.bottom-2],[(b.left+b.right)/2,(b.top+b.bottom)/2]]; return { t: el.textContent.trim(), rect: [Math.round(b.left),Math.round(b.top),Math.round(b.width),Math.round(b.height)], topIsSelf: pts.map(([x,y]) => { const e = document.elementFromPoint(x,y); return !!e && (e === el || el.contains(e)) }), z: getComputedStyle(el).zIndex, pos: getComputedStyle(el).position } })()`)
    console.log('skip', w, JSON.stringify(s))
  }
})
