/** 리뷰어 31 — 1024×768 상세에서 보조 열 태그 칩에 Tab 포커스가 있을 때의 화면. 사용: node docs/tools/reviewer-31/shot-sticky.mjs <baseUrl> */
import fs from 'node:fs'
import { withChrome, delay } from '../programmer-04/cdp.mjs'
const base = process.argv[2]
const POST = '2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019'
await withChrome(9436, async (client) => {
  for (const [w, h] of [[1024, 768], [1280, 800]]) {
    await client.setViewport(w, h, w <= 1024)
    await client.navigate(`${base}/post/${POST}?q=${w}`)
    await delay(250)
    for (let i = 0; i < 60; i++) {
      await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
      await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
      await delay(40)
      const t = await client.evaluate(`document.activeElement.textContent.trim()`)
      if (t.startsWith('#')) break
    }
    await delay(200)
    const info = await client.evaluate(`(() => { const b = document.activeElement.getBoundingClientRect(); return { t: document.activeElement.textContent.trim(), top: Math.round(b.top), bottom: Math.round(b.bottom), vh: innerHeight, scrollY: Math.round(scrollY) } })()`)
    console.log(w, JSON.stringify(info))
    const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync(`docs/tools/reviewer-31/screens/post-${w}x${h}-tag-focus.png`, Buffer.from(data, 'base64'))
  }
})
