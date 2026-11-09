// 스크린샷 여러 장을 한 장으로 나란히 붙인다(비교·검수용). 외부 의존성 없음 — 헤드리스 Chrome으로 HTML을 찍는다.
// 실행: node docs/tools/designer-05/sheet.mjs <spec.json>
// spec: [{ out: 'screens/sheet-x.png', colW: 360, cropH: 740, items: [{ src: 'screens/A1-home-360.png', label: 'A1' }, ...] }, ...]
// 경로는 이 폴더 기준 상대경로. cropH를 주면 각 이미지 위쪽에서 그 높이만 보인다.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { withChrome, delay } from '../programmer-04/cdp.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const specs = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'))
const tmp = path.join(HERE, '.sheet.html')

await withChrome(9413, async (c) => {
  for (const s of specs) {
    const gap = 12
    const cols = s.cols ?? s.items.length
    const width = cols * s.colW + (cols + 1) * gap
    const cells = s.items.map((it) => `<figure><figcaption>${it.label}</figcaption><div class="box" style="${s.cropH ? `height:${s.cropH}px` : ''}"><img src="${pathToFileURL(path.join(HERE, it.src)).href}"></div></figure>`).join('')
    const html = `<!doctype html><meta charset="utf-8"><style>
      body{margin:0;background:#e4e4e7;font:600 15px/1.3 -apple-system,"Apple SD Gothic Neo",sans-serif;color:#18181b}
      .g{display:grid;grid-template-columns:repeat(${cols},${s.colW}px);gap:${gap}px;padding:${gap}px}
      figure{margin:0} figcaption{padding:4px 2px 6px} .box{overflow:hidden;background:#fff;outline:1px solid #a1a1aa}
      img{display:block;width:${s.colW}px}
      ${s.title ? 'h1{margin:0;padding:12px 12px 0;font-size:17px}' : ''}
    </style>${s.title ? `<h1>${s.title}</h1>` : ''}<div class="g">${cells}</div>`
    fs.writeFileSync(tmp, html)
    await c.setViewport(width, 400, false)
    await c.navigate(pathToFileURL(tmp).href)
    await c.evaluate('Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r })))')
    await delay(150)
    const m = await c.send('Page.getLayoutMetrics')
    const h = Math.ceil(m.cssContentSize.height)
    const { data } = await c.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: h, scale: s.scale ?? 1 } })
    const out = path.join(HERE, s.out)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, Buffer.from(data, 'base64'))
    console.log('sheet', s.out, width + 'x' + h)
  }
})
fs.rmSync(tmp, { force: true })
