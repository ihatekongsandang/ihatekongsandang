/**
 * 리뷰어 08 — 보조 실측.
 *
 *   node docs/tools/reviewer-08/extra-qa.mjs <baseUrl> net
 *     홈·about·상세 × 390/1280에서 로드·맨 아래 스크롤까지 나간 요청 중 외부(다른 호스트) 요청 수와 배너 주소 요청 수.
 *   node docs/tools/reviewer-08/extra-qa.mjs <baseUrl> enter
 *     (GA 측정 ID 넣은 빌드에서) 배너 링크에 포커스 후 Enter 키로 활성화했을 때 floating_banner_click 건수.
 *   node docs/tools/reviewer-08/extra-qa.mjs <baseUrl> shot <out.png> [scroll-padding-bottom 값]
 *     320×640 홈에서 Tab으로 "#알파폰" 태그까지 이동한 화면 캡처(포커스 가림 증거 / 보완안 비교).
 *
 * CDP 클라이언트는 docs/tools/programmer-04/cdp.mjs 재사용(외부 요청 차단 포함).
 */
import fs from 'node:fs'
import process from 'node:process'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const BANNER = 'aside[aria-label="외부 링크 안내"]'
const [baseUrl, mode, ...rest] = process.argv.slice(2)
const TAB = { key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 }
const press = async (c, key) => {
  await c.send('Input.dispatchKeyEvent', { type: 'keyDown', ...key })
  await c.send('Input.dispatchKeyEvent', { type: 'keyUp', ...key })
}

async function net(c) {
  const host = new URL(baseUrl).host
  const urls = []
  c.on((m) => {
    if (m.method === 'Network.requestWillBeSent') urls.push(m.params.request.url)
  })
  for (const [w, h] of [[390, 844], [1280, 900]]) {
    for (const r of ['/', '/about', '/post/2026-09-27-rekor-dmz-mine-testimony']) {
      await c.setViewport(w, h, w < 1024)
      await c.navigate(baseUrl + r)
      await delay(800)
      await c.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)')
      await delay(800)
    }
  }
  const ext = urls.filter((u) => /^https?:/.test(u) && new URL(u).host !== host)
  console.log(`요청 총 ${urls.length} · 외부 ${ext.length} · 배너 주소 요청 ${urls.filter((u) => u.includes('signforkorea')).length}`)
}

async function enter(c) {
  await c.setViewport(390, 844, true)
  await c.navigate(`${baseUrl}/about`)
  await c.evaluate(`window.addEventListener('click', (e) => e.preventDefault(), { once: true }); document.querySelector('${BANNER} a').focus()`)
  await press(c, { key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: '\r' })
  await delay(300)
  const ev = await c.evaluate(`(window.dataLayer || []).map((e) => Array.from(e)).filter((a) => a[0] === 'event' && a[1] === 'floating_banner_click')`)
  console.log(`Enter 키 floating_banner_click ${ev.length}건 ${JSON.stringify(ev)}`)
}

async function shot(c) {
  const [out, pad] = rest
  await c.setViewport(320, 640, true)
  await c.navigate(`${baseUrl}/`)
  if (pad) await c.evaluate(`document.documentElement.style.scrollPaddingBottom = ${JSON.stringify(pad)}`)
  for (let i = 0; i < 200; i += 1) {
    await press(c, TAB)
    if ((await c.evaluate('document.activeElement.textContent.trim()')).startsWith('#알파폰')) break
  }
  await delay(300)
  const r = await c.evaluate(`(() => {
    const a = document.activeElement.getBoundingClientRect()
    const b = document.querySelector('${BANNER}').getBoundingClientRect()
    return { focused: [a.left, a.top, a.right, a.bottom].map(Math.round), banner: [b.left, b.top, b.right, b.bottom].map(Math.round) }
  })()`)
  console.log(JSON.stringify(r))
  const { data } = await c.send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(out, Buffer.from(data, 'base64'))
}

const modes = { net, enter, shot }
if (!baseUrl || !modes[mode]) {
  console.error('사용법: node extra-qa.mjs <baseUrl> <net|enter|shot> [...]')
  process.exit(1)
}
await withChrome(Number(process.env.QA_PORT ?? 9349), modes[mode])
