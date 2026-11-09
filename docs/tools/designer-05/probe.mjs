// 단건 확인용: node docs/tools/designer-05/probe.mjs <file(저장소 상대)> <쿼리·해시 접미사> <폭> <JS식> [png이름]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { withChrome, delay } from '../programmer-04/cdp.mjs'
const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../../..')
const [file, suffix, w, expr, png] = process.argv.slice(2)
await withChrome(9412, async (c) => {
  await c.setViewport(+w, +w < 600 ? 740 : 900, +w <= 1024)
  await c.navigate(pathToFileURL(path.join(ROOT, file)).href + suffix)
  await delay(200)
  console.log(JSON.stringify(await c.evaluate(expr), null, 1))
  if (png) { const { data } = await c.send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(HERE, 'screens', png), Buffer.from(data, 'base64')) }
})
