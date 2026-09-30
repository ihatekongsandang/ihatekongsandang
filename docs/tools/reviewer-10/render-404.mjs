/**
 * 리뷰어 10 — 범위 밖 `?page=` 요청이 브라우저에서 실제로 어떻게 보이는지 기준(HEAD)·작업 빌드를 나란히 잰다.
 *   node docs/tools/reviewer-10/render-404.mjs <기준 baseUrl> <작업 baseUrl>
 * 하이드레이션 뒤 `<html lang>`·h1·본문 앞부분·헤더/푸터 유무·콘솔 오류를 출력한다.
 */
import { delay, withChrome } from '../programmer-04/cdp.mjs'
const [baseA, baseB] = process.argv.slice(2)
const paths = ['/?page=999', '/tag/dmz?page=99', '/en?page=99', '/page/999', '/post/no-such', '/en/post/no-such']
await withChrome(9361, async (client) => {
  await client.setViewport(390, 844, true)
  for (const p of paths) {
    for (const [name, base] of [['기준', baseA], ['작업', baseB]]) {
      await client.navigate(base + p)
      await delay(1200)
      const info = await client.evaluate(`(() => ({
        lang: document.documentElement.getAttribute('lang'),
        id: document.documentElement.id,
        h1: document.querySelector('h1')?.textContent ?? null,
        header: !!document.querySelector('header'),
        footer: !!document.querySelector('footer'),
        banner: !!document.querySelector('aside[aria-label="외부 링크 안내"]'),
        text: document.body.innerText.replace(/\\s+/g, ' ').slice(0, 90),
      }))()`)
      console.log(`${p} [${name}] ${JSON.stringify(info)}`)
    }
  }
})
