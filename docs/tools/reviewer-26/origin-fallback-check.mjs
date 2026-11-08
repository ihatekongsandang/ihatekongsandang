/**
 * 리뷰어 26 — 공유 URL 대체값(P3-3) 실측. `NEXT_PUBLIC_SITE_URL` 없이 빌드한 서버에서
 * 하이드레이션 뒤 X·스레드 href의 url 파라미터와 클립보드 값이 `location.origin + 경로`인지 본다.
 * 실행(저장소 루트): NEXT_PUBLIC_SITE_URL= npm run build && npx next start -p 3027 &
 *                   node docs/tools/reviewer-26/origin-fallback-check.mjs http://127.0.0.1:3027
 */
import { withChrome } from '../programmer-04/cdp.mjs'
const base = process.argv[2]
let pass = 0, fail = 0
const check = (l, ok, v) => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${l} → ${v}`) }
await withChrome(9346, async (client) => {
  await client.send('Browser.grantPermissions', { origin: new URL(base).origin, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] })
  for (const p of ['/post/2026-10-02-alaska-lng-vs-dmz-mine-response', '/en/post/2026-10-02-alaska-lng-vs-dmz-mine-response']) {
    await client.navigate(`${base}${p}`)
    const r = await client.evaluate(`(() => {
      const s = document.querySelector('section[aria-labelledby="share-heading"]')
      const hrefs = [...s.querySelectorAll('a')].map((a) => new URL(a.href).searchParams.get('url'))
      return { hrefs, canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'), origin: location.origin }
    })()`)
    const expected = `${r.origin}${p}`
    check(`${p} canonical 상대 경로(대체값 상황 재현)`, r.canonical === p, r.canonical)
    check(`${p} X url = origin+경로`, r.hrefs[0] === expected, r.hrefs[0])
    check(`${p} 스레드 url = origin+경로`, r.hrefs[1] === expected, r.hrefs[1])
    // 헤드리스에서 readText는 문서 포커스가 필요해 실패하므로 writeText 인자를 가로채 본다(실제 쓰기도 그대로 호출).
    await client.evaluate(`(() => { const orig = navigator.clipboard.writeText.bind(navigator.clipboard); window.__clip = null;
      navigator.clipboard.writeText = (v) => { window.__clip = v; return orig(v).catch(() => {}) } })()`)
    await client.evaluate(`document.querySelector('section[aria-labelledby="share-heading"] button').click()`)
    await new Promise((res) => setTimeout(res, 300))
    const clip = await client.evaluate(`window.__clip`)
    check(`${p} 클립보드 = origin+경로`, clip === expected, clip)
  }
})
console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
process.exit(fail ? 1 : 0)
