/**
 * 프로그래머 14 — 반응형 개편 화면 기록(헤드리스 Chrome + CDP, docs/tools/programmer-04/cdp.mjs 재사용, 추가 의존성 없음).
 * 사용(저장소 루트, 로컬 프로덕션 서버 실행 중): node docs/tools/programmer-14/shots.mjs <baseUrl> [화면 폴더]
 * ko/en × 홈·상세·태그·소개·약관 × 360·768·1024·1280 — 첫 화면(`{page}-{w}.png`) + 전체(`{page}-{w}-full.png`).
 * 영어에는 태그 페이지가 없다(영어 사이트는 태그 칩을 두지 않는다, 프로그래머 05) → 영어 "태그" 칸은 없음으로 기록.
 */
import fs from 'node:fs'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const base = process.argv[2]
const SHOTS = process.argv[3] ?? 'docs/tools/programmer-14/screens'
fs.mkdirSync(SHOTS, { recursive: true })
export const PAGES = [
  ['ko-home', '/'],
  ['ko-post', '/post/2026-10-02-alaska-lng-vs-dmz-mine-response'],
  ['ko-tag', '/tag/dmz'],
  ['ko-about', '/about'],
  ['ko-terms', '/terms'],
  ['en-home', '/en'],
  ['en-post', '/en/post/2026-10-02-alaska-lng-vs-dmz-mine-response'],
  ['en-about', '/en/about'],
  ['en-terms', '/en/terms'],
]
const WIDTHS = [
  [360, 740],
  [768, 1024],
  [1024, 768],
  [1280, 800],
]
let count = 0
await withChrome(9431, async (client) => {
  for (const [w, h] of WIDTHS) {
    await client.setViewport(w, h, w < 1280)
    for (const [name, path] of PAGES) {
      await client.navigate(`${base}${path}`)
      await delay(400)
      const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
      fs.writeFileSync(`${SHOTS}/${name}-${w}.png`, Buffer.from(data, 'base64'))
      const m = await client.send('Page.getLayoutMetrics')
      const fh = Math.min(Math.ceil(m.cssContentSize.height), 16000)
      const full = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: fh, scale: 1 } })
      fs.writeFileSync(`${SHOTS}/${name}-${w}-full.png`, Buffer.from(full.data, 'base64'))
      count += 2
    }
  }
})
console.log(`화면 ${count}장 저장 → ${SHOTS}`)
