/**
 * 프로그래머 04 — 플로팅 배너 실측 도구.
 *
 *   node docs/tools/programmer-04/banner-qa.mjs <baseUrl> <mode> [outDir]
 *
 *   mode
 *   - capture  : 홈·게시물 상세·about × 390/768/1280 × (첫 화면·맨 아래) 캡처 18장 + 보조 1장 → outDir
 *   - geometry : 배너가 본문·페이지네이션·푸터·헤더를 가리는지 기하 검사
 *                ① 대표 6개 경로 × 폭 320~1440px 전 구간(1px 간격)
 *                ② 빌드된 전 HTML 경로 × 경계 폭 10종
 *   - behavior : 속성·닫기 버튼 없음·항상 표시·키보드 포커스·콘솔 오류
 *   - ga       : GA 측정 ID를 넣은 빌드에서 클릭 이벤트가 dataLayer에 쌓이는지 확인
 *
 * 로컬 프로덕션 빌드(`npm run build && npx next start`)를 대상으로 돌린다. 외부 요청(캠페인 사이트·GA)은 차단한다.
 * 모든 검사는 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { delay, withChrome } from './cdp.mjs'

const PORT = 9334
const EXPECTED_HREF = 'https://signforkorea.com/re'
const BANNER = 'aside[aria-label="외부 링크 안내"]'
const POST = '/post/2026-09-27-rekor-dmz-mine-testimony'
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const [baseUrl, mode, outDir] = process.argv.slice(2)
if (!baseUrl || !mode) {
  console.error('사용법: node banner-qa.mjs <baseUrl> <capture|geometry|behavior|ga> [outDir]')
  process.exit(1)
}

let failures = 0
function check(label, ok, detail = '') {
  if (!ok) failures += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

const isMobileWidth = (width) => width < 1024

/* ───────────────────────── capture ───────────────────────── */

async function capture(client) {
  if (!outDir) throw new Error('capture 모드는 outDir이 필요합니다.')
  fs.mkdirSync(outDir, { recursive: true })
  const pages = [
    ['home', '/'],
    ['post', POST],
    ['about', '/about'],
  ]
  const viewports = [
    ['390', 390, 844],
    ['768', 768, 1024],
    ['1280', 1280, 900],
  ]
  let count = 0
  async function shot(name, width, height) {
    // clip을 주지 않는다 — clip 좌표는 문서 기준이라 스크롤한 화면을 찍지 못한다(현재 뷰포트를 그대로 찍는다).
    const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
    const file = path.join(outDir, `${name}.png`)
    fs.writeFileSync(file, Buffer.from(data, 'base64'))
    console.log(`${path.basename(file)} — ${fs.statSync(file).size.toLocaleString()} bytes (${width}x${height})`)
    count += 1
  }

  for (const [pageName, route] of pages) {
    for (const [label, width, height] of viewports) {
      await client.setViewport(width, height, isMobileWidth(width))
      await client.navigate(`${baseUrl}${route}`)
      await shot(`${pageName}--${label}--top`, width, height)
      await client.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)')
      await delay(300)
      await shot(`${pageName}--${label}--bottom`, width, height)
    }
  }

  // 보조: 여백 예약 구간(1024~1231px)의 대표 폭.
  await client.setViewport(1100, 800, false)
  await client.navigate(`${baseUrl}/`)
  await shot('home--1100--top', 1100, 800)

  console.log(`\n캡처 ${count}장 → ${outDir}`)
}

/* ───────────────────────── geometry ───────────────────────── */

/**
 * 페이지 안에서 실행하는 측정 함수.
 * - 데스크톱: 배너는 세로 중앙 고정이라 스크롤하면 본문 전체가 그 높이를 지나간다.
 *   그러므로 "가리지 않음" = 본문·푸터의 어떤 요소도 배너 왼쪽 끝을 넘지 않음(가로 비겹침).
 *   헤더와는 세로로 겹치지 않아야 한다.
 * - 모바일: 맨 아래까지 스크롤한 상태에서 배너와 겹치는 본문·푸터 요소가 0개여야 한다
 *   (중간 스크롤에서 잠시 겹치는 것은 플로팅 버튼의 본질이라 검사하지 않는다).
 * sr-only(시각적으로 숨긴) 요소는 제외한다.
 * 모바일 겹침 판정은 테두리 상자 기준(더 엄격)이다.
 */
const MEASURE = `(() => {
  const banner = document.querySelector('${BANNER}')
  const vw = document.documentElement.clientWidth
  const overflowX = document.documentElement.scrollWidth - vw
  if (!banner) return { banner: false, overflowX }
  const b = banner.getBoundingClientRect()
  const mobile = window.matchMedia('(max-width: 1023.98px)').matches
  if (mobile) window.scrollTo(0, document.documentElement.scrollHeight)
  const b2 = banner.getBoundingClientRect()
  const nodes = [...document.querySelectorAll('main *, footer *')]
  let maxRight = 0
  let worst = ''
  const hits = []
  const describe = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + ' "' + (el.textContent || '').trim().slice(0, 30) + '"'
  for (const el of nodes) {
    if (el.closest('.sr-only')) continue
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') continue
    // 배경·테두리·그림자가 보이는 요소는 테두리 상자, 투명한 레이아웃 컨테이너는 내용 상자(padding 제외)로 잰다.
    // 투명 컨테이너의 padding 영역은 화면에 아무것도 그리지 않으므로 배너가 그 위에 있어도 가리는 것이 없다.
    const painted = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none' ||
      parseFloat(cs.borderRightWidth) > 0 || cs.boxShadow !== 'none' || el.tagName === 'IMG' || el.tagName === 'svg'
    const right = painted ? r.right : r.right - parseFloat(cs.paddingRight) - parseFloat(cs.borderRightWidth)
    if (right > maxRight) { maxRight = right; worst = describe(el) + (painted ? ' [테두리 상자]' : ' [내용 상자]') }
    if (mobile) {
      const inter = r.left < b2.right && r.right > b2.left && r.top < b2.bottom && r.bottom > b2.top
      if (inter) hits.push(describe(el))
    }
  }
  const header = document.querySelector('header').getBoundingClientRect()
  window.scrollTo(0, 0)
  return {
    banner: true, mobile, vw, overflowX,
    rect: { left: b2.left, right: b2.right, top: b2.top, bottom: b2.bottom, width: b2.width, height: b2.height },
    maxRight, worst, hits, headerBottom: header.bottom, topAtLoad: b.top,
  }
})()`

function judge(result, width, height) {
  const problems = []
  if (!result.banner) return ['배너 없음']
  if (result.overflowX > 0) problems.push(`가로 스크롤 ${result.overflowX}px`)
  if (result.rect.left < 0 || result.rect.right > width) problems.push('배너가 뷰포트 밖으로 나감')
  if (result.mobile) {
    if (result.hits.length > 0) problems.push(`맨 아래에서 겹침 ${result.hits.length}개: ${result.hits.slice(0, 3).join(' | ')}`)
  } else {
    const gap = result.rect.left - result.maxRight
    if (gap < 0) problems.push(`가로 겹침 ${(-gap).toFixed(1)}px (${result.worst})`)
    if (result.rect.top < result.headerBottom) problems.push(`헤더와 세로 겹침 (배너 top ${result.rect.top}, 헤더 bottom ${result.headerBottom})`)
    if (result.rect.bottom > height) problems.push('배너 아래쪽이 화면 밖')
  }
  return problems
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

async function geometry(client) {
  const representative = ['/', '/?page=4', POST, '/about', `/tag/${encodeURIComponent('이재명')}`, '/__qa-not-found__']
  let evaluations = 0
  let minDesktopGap = Number.POSITIVE_INFINITY
  let minDesktopGapAt = ''

  const record = (result, route, width, height) => {
    evaluations += 1
    const problems = judge(result, width, height)
    if (result.banner && !result.mobile) {
      const gap = result.rect.left - result.maxRight
      if (gap < minDesktopGap) {
        minDesktopGap = gap
        minDesktopGapAt = `${route} @${width}px`
      }
    }
    return problems
  }

  // ① 대표 경로 × 320~1440 전 폭
  console.log('① 대표 경로 × 폭 320~1440px (1px 간격)')
  for (const route of representative) {
    let routeFailures = 0
    await client.setViewport(1280, 900, false)
    await client.navigate(`${baseUrl}${route}`)
    for (let width = 320; width <= 1440; width += 1) {
      const h = width < 1024 ? 844 : 900
      await client.setViewport(width, h, width < 1024)
      const result = await client.evaluate(MEASURE)
      const problems = record(result, route, width, h)
      if (problems.length > 0) {
        routeFailures += 1
        if (routeFailures <= 5) console.log(`  FAIL ${route} @${width}px: ${problems.join(' / ')}`)
      }
    }
    check(`${decodeURIComponent(route)} — 1,121개 폭`, routeFailures === 0, routeFailures ? `실패 폭 ${routeFailures}개` : '')
  }

  // 낮은 데스크톱 화면 높이에서 헤더와 겹치지 않는지
  for (const [width, height] of [[1024, 600], [1280, 640], [1440, 700]]) {
    await client.setViewport(width, height, false)
    await client.navigate(`${baseUrl}/`)
    const result = await client.evaluate(MEASURE)
    const problems = record(result, '/', width, height)
    check(`낮은 화면 ${width}x${height} — 헤더·화면 경계`, problems.length === 0, problems.join(' / ') || `배너 ${Math.round(result.rect.top)}~${Math.round(result.rect.bottom)}px, 헤더 bottom ${result.headerBottom}px`)
  }

  // ② 빌드된 전 경로 × 경계 폭
  const routes = listBuiltRoutes()
  const widths = [320, 390, 768, 1023, 1024, 1100, 1231, 1232, 1280, 1440]
  console.log(`\n② 빌드된 전 HTML 경로 ${routes.length}개 × 경계 폭 ${widths.length}종`)
  let allFailures = 0
  let pagesWithBanner = 0
  for (const route of routes) {
    await client.setViewport(1280, 900, false)
    await client.navigate(`${baseUrl}${route}`)
    let hasBanner = true
    for (const width of widths) {
      const h = width < 1024 ? 844 : 900
      await client.setViewport(width, h, width < 1024)
      const result = await client.evaluate(MEASURE)
      if (!result.banner) hasBanner = false
      const problems = record(result, route, width, h)
      if (problems.length > 0) {
        allFailures += 1
        if (allFailures <= 10) console.log(`  FAIL ${decodeURIComponent(route)} @${width}px: ${problems.join(' / ')}`)
      }
    }
    if (hasBanner) pagesWithBanner += 1
  }
  check(`전 경로 배너 렌더`, pagesWithBanner === routes.length, `${pagesWithBanner}/${routes.length}`)
  check(`전 경로 × 경계 폭 겹침 0`, allFailures === 0, `검사 ${routes.length * widths.length}건 · 실패 ${allFailures}`)

  console.log(`\n측정 총 ${evaluations.toLocaleString()}회 · 데스크톱 최소 가로 간격 ${minDesktopGap.toFixed(1)}px (${minDesktopGapAt})`)
}

/* ───────────────────────── behavior ───────────────────────── */

async function mouseClick(client, selector) {
  const center = await client.evaluate(`(() => {
    const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  })()`)
  for (const type of ['mousePressed', 'mouseReleased']) {
    await client.send('Input.dispatchMouseEvent', { type, x: center.x, y: center.y, button: 'left', clickCount: 1 })
  }
  await delay(300)
}

async function pressTab(client) {
  const key = { key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 }
  await client.send('Input.dispatchKeyEvent', { type: 'keyDown', ...key })
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', ...key })
}

async function behavior(client) {
  const errors = []
  client.on((message) => {
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description ?? 'exception')
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      errors.push(message.params.args.map((a) => a.value ?? a.description).join(' '))
    }
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') errors.push(message.params.entry.text)
  })
  const present = () => client.evaluate(`!!document.querySelector('${BANNER}')`)

  for (const [width, height] of [[390, 844], [1280, 900]]) {
    console.log(`\n── ${width}px ──`)
    await client.setViewport(width, height, width < 1024)
    await client.navigate(`${baseUrl}/`)

    // 속성
    const attrs = await client.evaluate(`(() => {
      const a = document.querySelector('${BANNER} a')
      return {
        href: a.getAttribute('href'), target: a.target, rel: a.rel,
        aria: a.getAttribute('aria-label'), text: a.textContent,
        buttons: document.querySelectorAll('${BANNER} button').length,
        focusables: document.querySelectorAll('${BANNER} a, ${BANNER} button, ${BANNER} [tabindex]').length,
        imgs: document.querySelectorAll('${BANNER} img').length,
        bannerFbclid: document.querySelector('${BANNER}').outerHTML.includes('fbclid'),
        docFbclid: document.documentElement.outerHTML.includes('fbclid'),
      }
    })()`)
    check('href = https://signforkorea.com/re', attrs.href === EXPECTED_HREF, attrs.href)
    check('href에 fbclid 없음(배너·문서 전체)', !attrs.bannerFbclid && !attrs.docFbclid)
    check('target=_blank', attrs.target === '_blank')
    check('rel = "noopener nofollow"', attrs.rel === 'noopener nofollow', attrs.rel)
    check('문구(제목+보조) 일치', attrs.text === '이재명 재판재개 촉구 국민 서명운동외부 사이트로 이동합니다', attrs.text)
    check('링크 aria-label에 표시 문구 + "새 창"', attrs.aria.startsWith('이재명 재판재개 촉구 국민 서명운동') && attrs.aria.includes('새 창'), attrs.aria)
    check('닫기 버튼 없음(button 0개 · 포커스 가능 요소는 링크 1개)', attrs.buttons === 0 && attrs.focusables === 1, `button ${attrs.buttons} · 포커스 가능 ${attrs.focusables}`)
    check('배너 안 이미지 0개', attrs.imgs === 0)

    // 링크 클릭(새 창 열림은 막고 클릭 처리만 확인) — GA 없는 빌드에서 오류가 없어야 한다.
    await client.evaluate(`window.addEventListener('click', (e) => e.preventDefault(), { once: true })`)
    const beforeErrors = errors.length
    await mouseClick(client, `${BANNER} a`)
    check('GA 미로드 상태 링크 클릭 — 오류 없음', errors.length === beforeErrors)
    check('링크 클릭 후에도 배너 유지', await present())

    // 내부 이동·새로 고침 후에도 항상 표시
    await mouseClick(client, 'header a[href="/about"]')
    await delay(500)
    const path1 = await client.evaluate('location.pathname')
    check('내부 링크 이동 후에도 표시', path1 === '/about' && (await present()), path1)
    await client.navigate(`${baseUrl}${POST}`)
    check('직접 진입·새로 고침 후에도 표시', await present())
  }

  // 키보드 포커스
  console.log('\n── 키보드 ──')
  for (const [width, height] of [[390, 844], [1280, 900]]) {
    await client.setViewport(width, height, width < 1024)
    await client.navigate(`${baseUrl}/about`)
    let previous = null
    let reached = null
    let tabs = 0
    for (; tabs < 200; tabs += 1) {
      await pressTab(client)
      const info = await client.evaluate(`(() => {
        const el = document.activeElement
        const cs = getComputedStyle(el)
        return {
          inBanner: !!el.closest('${BANNER}'), tag: el.tagName, label: el.getAttribute('aria-label') || el.textContent.trim().slice(0, 40),
          outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, offset: cs.outlineOffset,
        }
      })()`)
      if (info.inBanner) {
        reached = info
        break
      }
      previous = info
    }
    check(`${width}px — Tab으로 배너 링크 도달`, reached?.tag === 'A', `${tabs + 1}번째 Tab, 직전 요소: ${previous?.tag} "${previous?.label}"`)
    check(`${width}px — 배너 링크 포커스 표시(흰 2px 실선)`, reached?.outline === 'solid 2px rgb(255, 255, 255)', `${reached?.outline} offset ${reached?.offset}`)
    await pressTab(client)
    const next = await client.evaluate(`!!document.activeElement.closest('${BANNER}')`)
    check(`${width}px — 다음 Tab은 배너 밖으로 나감(배너 안 탭 정지점 1개)`, !next)
  }

  check('behavior 전 과정 콘솔 오류·예외 0건', errors.length === 0, errors.slice(0, 5).join(' | '))
}

/* ───────────────────────── ga ───────────────────────── */

async function ga(client) {
  await client.setViewport(1280, 900, false)
  await client.navigate(`${baseUrl}/`)
  const hasGtag = await client.evaluate(`typeof window.gtag === 'function'`)
  check('GA 빌드 — window.gtag 정의됨(인라인 초기화 스크립트)', hasGtag)
  await client.evaluate(`window.addEventListener('click', (e) => e.preventDefault(), { once: true })`)
  await mouseClick(client, `${BANNER} a`)
  const events = await client.evaluate(`(window.dataLayer || []).map((entry) => Array.from(entry)).filter((args) => args[0] === 'event')`)
  const hit = events.find((args) => args[1] === 'floating_banner_click')
  check('dataLayer에 floating_banner_click 1건', events.filter((args) => args[1] === 'floating_banner_click').length === 1, JSON.stringify(hit))
  check('이벤트 파라미터 link_url = 배너 주소', hit?.[2]?.link_url === EXPECTED_HREF)
}

/* ───────────────────────── main ───────────────────────── */

const modes = { capture, geometry, behavior, ga }
if (!modes[mode]) {
  console.error(`알 수 없는 모드: ${mode}`)
  process.exit(1)
}
await withChrome(PORT, modes[mode])
console.log(`\n${mode}: 실패 ${failures}건`)
process.exit(failures > 0 ? 1 : 0)
