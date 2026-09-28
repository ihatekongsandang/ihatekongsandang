/**
 * 리뷰어 09 — 프로그래머 04-1(배너 서버/클라이언트 분리) 회귀 전수 재실측.
 *
 *   node docs/tools/reviewer-09/hydration-qa.mjs <baseUrl>
 *
 * 빌드된 전 HTML 경로 × 폭 2종(390·1280)마다 실제 브라우저로 열어 확인한다.
 * - 콘솔 오류·예외 0 (하이드레이션 불일치는 운영 빌드에서 console.error "Minified React error #418/#423/#425"로 나온다)
 *   · 없는 경로(/__qa-not-found__)의 문서 404 리소스 오류 1건은 의도된 것이라 제외
 * - 하이드레이션 후 DOM의 배너 링크 속성: href · target · rel · aria-label 이 기대값과 정확히 같음
 * - 배너 링크에 React onClick 핸들러가 붙어 있음(= 클라이언트 컴포넌트가 하이드레이션됨)
 * - <html> scroll-padding-bottom 계산값: <1024px에서 88px(5.5rem, safe-area 0), ≥1024px에서 auto
 *
 * 프로그래머 04 도구의 CDP 클라이언트(docs/tools/programmer-04/cdp.mjs)를 재사용한다. 외부 요청은 그쪽에서 차단한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { withChrome } from '../programmer-04/cdp.mjs'

const PORT = Number(process.env.QA_PORT ?? 9361)
const BANNER = 'aside[aria-label="외부 링크 안내"]'
const EXPECT = {
  href: 'https://signforkorea.com/re',
  target: '_blank',
  rel: 'noopener nofollow',
  label: '이재명 재판재개 촉구 국민 서명운동 — 외부 사이트로 이동합니다 (새 창에서 열림)',
}
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const baseUrl = process.argv[2]
if (!baseUrl) {
  console.error('사용법: node hydration-qa.mjs <baseUrl>')
  process.exit(1)
}

function listBuiltRoutes() {
  const root = path.join(projectRoot, '.next/server/app')
  const routes = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) {
        const rel = path.relative(root, full).replace(/\.html$/, '')
        if (rel === '_not-found') routes.push('/__qa-not-found__')
        else if (rel === 'index') routes.push('/')
        else routes.push(`/${rel.split(path.sep).map(encodeURIComponent).join('/')}`)
      }
    }
  }
  walk(root)
  return routes.sort()
}

const PROBE = `(() => {
  const a = document.querySelector('${BANNER} a')
  if (!a) return { missing: true }
  const propsKey = Object.keys(a).find((k) => k.startsWith('__reactProps'))
  return {
    href: a.getAttribute('href'),
    target: a.getAttribute('target'),
    rel: a.getAttribute('rel'),
    label: a.getAttribute('aria-label'),
    hydrated: !!propsKey,
    onClick: !!(propsKey && typeof a[propsKey].onClick === 'function'),
    scrollPad: getComputedStyle(document.documentElement).scrollPaddingBottom,
  }
})()`

await withChrome(PORT, async (client) => {
  let errors = []
  client.on((message) => {
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description ?? 'exception')
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      errors.push(message.params.args.map((a) => a.value ?? a.description).join(' '))
    }
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') errors.push(message.params.entry.text)
  })

  const routes = listBuiltRoutes()
  const widths = [[390, 844], [1280, 900]]
  let checks = 0
  let failures = 0
  const tally = { attrs: 0, onClick: 0, scrollPad: 0, clean: 0 }
  for (const [width, height] of widths) {
    await client.setViewport(width, height, width < 1024)
    for (const route of routes) {
      errors = []
      await client.navigate(`${baseUrl}${route}`)
      const r = await client.evaluate(PROBE)
      const relevantErrors = errors.filter((e) => !(route === '/__qa-not-found__' && /404/.test(e)))
      const problems = []
      if (r.missing) problems.push('배너 링크 없음')
      else {
        const attrsOk = r.href === EXPECT.href && r.target === EXPECT.target && r.rel === EXPECT.rel && r.label === EXPECT.label
        if (attrsOk) tally.attrs += 1
        else problems.push(`속성 불일치 ${JSON.stringify(r)}`)
        if (r.hydrated && r.onClick) tally.onClick += 1
        else problems.push(`onClick 미부착 (hydrated=${r.hydrated})`)
        const wantPad = width < 1024 ? '88px' : 'auto'
        if (r.scrollPad === wantPad) tally.scrollPad += 1
        else problems.push(`scroll-padding-bottom ${r.scrollPad} (기대 ${wantPad})`)
      }
      if (relevantErrors.length === 0) tally.clean += 1
      else problems.push(`콘솔 오류 ${relevantErrors.length}: ${relevantErrors.slice(0, 2).join(' | ')}`)
      checks += 1
      if (problems.length > 0) {
        failures += 1
        console.log(`FAIL ${decodeURIComponent(route)} @${width}: ${problems.join(' / ')}`)
      }
    }
  }
  console.log(`경로 ${routes.length}개 × 폭 ${widths.length}종 = ${checks}건`)
  console.log(`속성 일치 ${tally.attrs}/${checks} · onClick 부착 ${tally.onClick}/${checks} · scroll-padding 기대값 ${tally.scrollPad}/${checks} · 콘솔 오류 0 ${tally.clean}/${checks}`)
  console.log(`hydration: 실패 ${failures}건`)
  if (failures > 0) process.exitCode = 1
})
