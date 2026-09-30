/**
 * 리뷰어 11 — 빌드 HTML 전 경로를 두 서버(A·B)에서 헤드리스 Chrome으로 열어 **하이드레이션 후** DOM과 탭 정지점을 비교한다.
 * 포커스 가림 전수(리뷰어 10 2-5)를 재실행하지 않는 근거 확인용 — 탭 정지점 순서·대상과 보이는 DOM이 같으면 가림 결과도 같다.
 *   node docs/tools/reviewer-11/hydrated-dom-same.mjs <A app 폴더> <A baseUrl> <B baseUrl> [폭=390]
 * - 경로: A 빌드의 `.html` 전부(`index.html`→`/`, `_not-found.html`→`/no-such-path-r11`)
 * - 비교: body의 outerHTML(스크립트·route announcer 제거, 빌드 ID·청크 해시 정규화) · 탭 정지점 목록(태그·href·텍스트 앞 40자)
 * - 기록: 콘솔 error·페이지 예외 수(두 서버 각각)
 * `/_next/image`·외부 요청은 막는다(리뷰어 10 P2-2 — 로컬 이미지 최적화 응답 멈춤 회피. 이미지는 고정 비율 상자라 레이아웃 무관).
 */
import fs from 'node:fs'
import path from 'node:path'
import { withChrome } from '../programmer-04/cdp.mjs'

const [appDir, baseA, baseB, widthArg] = process.argv.slice(2)
const width = Number(widthArg ?? 390)
const files = []
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) files.push(path.relative(appDir, f)) } }
walk(appDir)
files.sort()
const routeOf = (f) => (f === 'index.html' ? '/' : f === '_not-found.html' ? '/no-such-path-r11' : '/' + f.replace(/\.html$/, '').split('/').map(encodeURIComponent).join('/'))

const SNAP = `(() => {
  const body = document.body.cloneNode(true)
  body.querySelectorAll('script, next-route-announcer').forEach((n) => n.remove())
  const html = body.outerHTML.replace(/\\/_next\\/static\\/[^"')\\s]+/g, '*').replace(/(opengraph-image|icon\\.svg)\\?[0-9a-f]+/g, '$1?*')
  const sel = 'a[href], button:not([disabled]), input:not([disabled]):not([type=hidden]), select, textarea, summary, [tabindex]:not([tabindex="-1"])'
  const tabs = [...document.querySelectorAll(sel)].filter((el) => el.getClientRects().length > 0 || el.closest('details'))
    .map((el) => el.tagName + '|' + (el.getAttribute('href') ?? '') + '|' + (el.textContent ?? '').replace(/\\s+/g, ' ').trim().slice(0, 40))
  return { lang: document.documentElement.lang, html, tabs }
})()`

async function snapshotAll(client, base, errors) {
  const out = new Map()
  for (const f of files) {
    errors.current = 0
    await client.navigate(base + routeOf(f))
    const snap = await client.evaluate(SNAP)
    out.set(f, { ...snap, errors: errors.current })
  }
  return out
}

const result = {}
for (const [name, base, port] of [['A', baseA, 9381], ['B', baseB, 9382]]) {
  await withChrome(port, async (client) => {
    await client.send('Network.setBlockedURLs', { urls: ['*signforkorea.com*', '*googletagmanager.com*', '*google-analytics.com*', '*/_next/image*'] })
    await client.setViewport(width, 844, width < 1024)
    const errors = { current: 0 }
    client.on((m) => {
      if (m.method === 'Runtime.exceptionThrown') errors.current++
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
        const text = m.params.args.map((a) => a.value ?? a.description ?? '').join(' ')
        if (!/Failed to load resource|404/.test(text)) errors.current++
      }
    })
    result[name] = await snapshotAll(client, base, errors)
  })
}
let domSame = 0, tabSame = 0, tabStops = 0, errA = 0, errB = 0
const domDiff = [], tabDiff = []
for (const f of files) {
  const a = result.A.get(f), b = result.B.get(f)
  errA += a.errors; errB += b.errors
  tabStops += b.tabs.length
  if (a.html === b.html) domSame++; else domDiff.push(f)
  if (JSON.stringify(a.tabs) === JSON.stringify(b.tabs)) tabSame++; else tabDiff.push(`${f}(${a.tabs.length}→${b.tabs.length})`)
}
console.log(`폭 ${width} · 경로 ${files.length}개`)
console.log(`하이드레이션 후 DOM 동일 ${domSame}/${files.length} · 차이 ${domDiff.length}${domDiff.length ? ': ' + domDiff.slice(0, 20).join(', ') : ''}`)
console.log(`탭 정지점 목록 동일 ${tabSame}/${files.length} (B 정지점 합계 ${tabStops}) · 차이 ${tabDiff.length}${tabDiff.length ? ': ' + tabDiff.slice(0, 20).join(', ') : ''}`)
console.log(`콘솔 오류·예외 A ${errA} · B ${errB}`)
