/**
 * 리뷰어 10 — 리뷰어 08 review-qa.mjs 사본. 달라진 점: 경로 목록에서 영어 페이지(`/en`, `/en/**`)를 뺀다
 * (영어 페이지는 배너가 없는 것이 정상 — 프로그래머 05). 그 밖의 측정 로직은 원본과 같다.
 * 추가(리뷰어 10): focus 모드에서 `/_next/image` 요청을 막는다. 로컬 `next start`의 이미지 최적화 응답이 간헐적으로
 * 끝나지 않아 load 이벤트가 오지 않는 일이 있었다(원인 확인 필요 — 리뷰 보고서 참조). 카드·상세 이미지는
 * `aspect-[16/9]` 고정 상자에 `fill`로 들어가므로 이미지 로드 여부가 레이아웃·포커스 위치를 바꾸지 않는다.
 *
 * (원본 설명) 리뷰어 08 — 프로그래머 04 플로팅 배너 독립 재실측 도구.
 *
 *   node docs/tools/reviewer-08/review-qa.mjs <baseUrl> <mode> [--scroll-padding=<css 길이>]
 *
 *   mode
 *   - focus : 🔴 포커스 가림(WCAG 2.4.11 AA / 2.4.12 AAA). 빌드된 전 HTML 경로 × 폭마다 실제 Tab 키로
 *             모든 탭 정지점을 앞으로 순회하고, 포커스된 요소가 배너 상자에 얼마나 덮이는지 잰다.
 *             - 완전 가림(덮인 면적 100%) = 2.4.11 위반
 *             - 일부 가림(0% 초과 100% 미만) = 2.4.11 통과 · 2.4.12(AAA) 기준 미달
 *             `--scroll-padding=...`을 주면 <html>에 scroll-padding-bottom을 주입해 보완안 효과를 잰다.
 *   - cls   : 대표 경로 × 경계 폭 10종에서 로드 후 layout-shift 합계와 배너가 원인인 이동 수.
 *   - ax    : 접근성 트리 — 보조 랜드마크(complementary) 이름·최상위 여부, 링크 이름(2.5.3), 탭 순서상 위치.
 *   - text  : 텍스트 간격(1.4.12) 강제 시 배너 문구 잘림 여부 + 데스크톱 세로 탭 높이.
 *
 * 로컬 프로덕션 빌드(`npm run build && npx next start`)를 대상으로 한다. 외부 요청은 cdp.mjs가 차단한다.
 * 프로그래머 04 도구의 CDP 클라이언트(docs/tools/programmer-04/cdp.mjs)를 재사용하고 포트만 달리한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const PORT = Number(process.env.QA_PORT ?? 9345)
const BANNER = 'aside[aria-label="외부 링크 안내"]'
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const args = process.argv.slice(2)
const [baseUrl, mode] = args
const scrollPadding = args.find((a) => a.startsWith('--scroll-padding='))?.split('=')[1] ?? ''
if (!baseUrl || !mode) {
  console.error('사용법: node review-qa.mjs <baseUrl> <focus|cls|ax|text> [--scroll-padding=<길이>]')
  process.exit(1)
}

let failures = 0
function check(label, ok, detail = '') {
  if (!ok) failures += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
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
  return routes.filter((r) => r !== "/en" && !r.startsWith("/en/")).sort()
}

async function pressTab(client) {
  const key = { key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 }
  await client.send('Input.dispatchKeyEvent', { type: 'keyDown', ...key })
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', ...key })
}

/* ───────────────────────── focus ───────────────────────── */

/** 포커스된 요소와 배너·고정 헤더의 겹침 비율. 요소가 여러 줄이면 줄 상자(getClientRects) 합으로 잰다. */
const FOCUS_PROBE = `(() => {
  const el = document.activeElement
  if (!el || el === document.body) return { none: true }
  const banner = document.querySelector('${BANNER}')
  const inBanner = !!(banner && banner.contains(el))
  const vh = window.innerHeight
  const vw = document.documentElement.clientWidth
  const rects = [...el.getClientRects()].filter((r) => r.width > 0 && r.height > 0)
  const overlap = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
  // 화면에 보이는 부분(뷰포트와의 교집합)만 분모로 쓴다.
  const view = { left: 0, top: 0, right: vw, bottom: vh }
  let visible = 0
  let underBanner = 0
  let underHeader = 0
  const b = banner ? banner.getBoundingClientRect() : null
  const headerEl = document.querySelector('header')
  const h = headerEl.getBoundingClientRect()
  // 헤더 자신의 링크(로고·메뉴)나 헤더 위에 뜨는 건너뛰기 링크는 헤더 가림 대상이 아니다.
  const skipHeader = headerEl.contains(el) || el.getAttribute('href') === '#main'
  for (const r of rects) {
    const v = { left: Math.max(r.left, 0), top: Math.max(r.top, 0), right: Math.min(r.right, vw), bottom: Math.min(r.bottom, vh) }
    if (v.right <= v.left || v.bottom <= v.top) continue
    visible += (v.right - v.left) * (v.bottom - v.top)
    if (b) underBanner += overlap(v, b)
    if (!skipHeader) underHeader += overlap(v, h)
  }
  const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 40)
  return {
    inBanner, tag: el.tagName, label, visible,
    bannerRatio: visible > 0 ? underBanner / visible : 0,
    headerRatio: visible > 0 ? underHeader / visible : 0,
    offscreen: visible === 0,
    top: rects[0]?.top ?? null, bottom: rects.at(-1)?.bottom ?? null,
  }
})()`

async function focus(client) {
  await client.send('Network.setBlockedURLs', {
    urls: ['*signforkorea.com*', '*googletagmanager.com*', '*google-analytics.com*', '*/_next/image*'],
  })
  const routes = listBuiltRoutes()
  const widths = [[320, 640], [360, 740], [390, 844], [768, 1024], [1023, 768], [1024, 768], [1280, 900]]
  console.log(`경로 ${routes.length}개 × 폭 ${widths.length}종${scrollPadding ? ` · 주입 scroll-padding-bottom: ${scrollPadding}` : ''}`)
  let stops = 0
  let full = 0
  let partial = 0
  let headerPartial = 0
  let headerFull = 0
  let reachedBanner = 0
  let pages = 0
  const fullSamples = []
  const partialSamples = []
  const perWidth = new Map()

  for (const route of routes) {
    for (const [width, height] of widths) {
      const mobile = width < 1024
      await client.setViewport(width, height, mobile)
      await client.navigate(`${baseUrl}${route}`)
      if (scrollPadding) {
        await client.evaluate(`document.documentElement.style.scrollPaddingBottom = ${JSON.stringify(scrollPadding)}`)
      }
      pages += 1
      const key = `${width}x${height}`
      const stat = perWidth.get(key) ?? { stops: 0, full: 0, partial: 0 }
      let bannerHit = false
      for (let i = 0; i < 400; i += 1) {
        await pressTab(client)
        const info = await client.evaluate(FOCUS_PROBE)
        if (info.none) break
        if (info.inBanner) {
          bannerHit = true
          break // 배너 자신은 가림 대상이 아니다. 배너가 마지막 탭 정지점이다(순서는 ax 모드에서 확인).
        }
        stops += 1
        stat.stops += 1
        const where = `${decodeURIComponent(route)} @${key} ${info.tag} "${info.label}"`
        if (info.bannerRatio >= 0.999) {
          full += 1
          stat.full += 1
          if (fullSamples.length < 15) fullSamples.push(where)
        } else if (info.bannerRatio > 0) {
          partial += 1
          stat.partial += 1
          if (partialSamples.length < 15) partialSamples.push(`${where} ${(info.bannerRatio * 100).toFixed(0)}%`)
        }
        if (info.headerRatio >= 0.999) headerFull += 1
        else if (info.headerRatio > 0) headerPartial += 1
      }
      if (bannerHit) reachedBanner += 1
      perWidth.set(key, stat)
    }
  }

  console.log('\n폭별 (탭 정지점 · 배너에 완전 가림 · 일부 가림)')
  for (const [key, s] of perWidth) console.log(`  ${key.padEnd(9)} ${String(s.stops).padStart(6)} · ${s.full} · ${s.partial}`)
  if (fullSamples.length) console.log('\n완전 가림 예:\n  ' + fullSamples.join('\n  '))
  if (partialSamples.length) console.log('\n일부 가림 예:\n  ' + partialSamples.join('\n  '))
  console.log(`\n페이지×폭 ${pages}건 · 탭 정지점 ${stops.toLocaleString()}개 · 배너까지 도달 ${reachedBanner}/${pages}`)
  console.log(`배너 — 완전 가림 ${full} · 일부 가림 ${partial}`)
  console.log(`(참고·기존 요소) 고정 헤더 — 완전 가림 ${headerFull} · 일부 가림 ${headerPartial}`)
  check('모든 페이지×폭에서 Tab 순회가 배너 링크에 도달', reachedBanner === pages, `${reachedBanner}/${pages}`)
  check('WCAG 2.4.11 — 배너에 완전히 가려지는 포커스 0', full === 0, `${full}건`)
  console.log(`INFO  WCAG 2.4.12(AAA) — 배너에 일부 가려지는 포커스 ${partial}건`)
}

/* ───────────────────────── cls ───────────────────────── */

async function cls(client) {
  const routes = ['/', '/?page=4', '/post/2026-09-27-rekor-dmz-mine-testimony', '/about', `/tag/${encodeURIComponent('이재명')}`, '/__qa-not-found__']
  const widths = [320, 390, 768, 1023, 1024, 1100, 1231, 1232, 1280, 1440]
  let worst = 0
  let bannerShifts = 0
  let runs = 0
  for (const route of routes) {
    for (const width of widths) {
      const h = width < 1024 ? 844 : 900
      await client.setViewport(width, h, width < 1024)
      await client.navigate(`${baseUrl}${route}`)
      await delay(400)
      const r = await client.evaluate(`new Promise((resolve) => {
        let total = 0; let fromBanner = 0
        const banner = document.querySelector('${BANNER}')
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) {
            if (e.hadRecentInput) continue
            total += e.value
            if (banner && e.sources.some((s) => s.node && (banner.contains(s.node) || s.node === banner))) fromBanner += 1
          }
        }).observe({ type: 'layout-shift', buffered: true })
        setTimeout(() => resolve({ total, fromBanner }), 300)
      })`)
      runs += 1
      worst = Math.max(worst, r.total)
      bannerShifts += r.fromBanner
      if (r.total > 0) console.log(`  ${decodeURIComponent(route)} @${width}px CLS ${r.total.toFixed(4)} (배너 원인 ${r.fromBanner})`)
    }
  }
  console.log(`측정 ${runs}회 · 최대 CLS ${worst.toFixed(4)} · 배너가 원인인 이동 ${bannerShifts}건`)
  check('배너가 원인인 layout-shift 0', bannerShifts === 0)
  check('CLS 0.1 미만(Good)', worst < 0.1, worst.toFixed(4))
}

/* ───────────────────────── ax ───────────────────────── */

async function ax(client) {
  await client.send('Accessibility.enable')
  for (const [width, height] of [[390, 844], [1280, 900]]) {
    await client.setViewport(width, height, width < 1024)
    await client.navigate(`${baseUrl}/`)
    const { nodes } = await client.send('Accessibility.getFullAXTree')
    const byId = new Map(nodes.map((n) => [n.nodeId, n]))
    const landmarks = nodes.filter((n) => n.role?.value === 'complementary')
    const banner = landmarks.find((n) => n.name?.value === '외부 링크 안내')
    check(`${width}px — complementary 랜드마크 "외부 링크 안내" 존재`, !!banner, `complementary ${landmarks.length}개`)
    // 최상위 여부: 조상 중 다른 랜드마크가 없어야 한다.
    const landmarkRoles = new Set(['banner', 'main', 'contentinfo', 'navigation', 'complementary', 'region', 'form', 'search'])
    let parent = banner && byId.get(banner.parentId)
    let nested = ''
    while (parent) {
      if (landmarkRoles.has(parent.role?.value)) nested = parent.role.value
      parent = byId.get(parent.parentId)
    }
    check(`${width}px — 배너 랜드마크가 다른 랜드마크 안에 있지 않음`, !!banner && !nested, nested || '최상위')
    const link = banner && nodes.find((n) => n.role?.value === 'link' && banner.childIds?.includes(n.nodeId))
    const name = link?.name?.value ?? ''
    check(`${width}px — 링크 접근 이름이 표시 문구로 시작(2.5.3)`, name.startsWith('이재명 재판재개 촉구 국민 서명운동'), name)
    check(`${width}px — 링크 이름에 새 창 안내`, name.includes('새 창'))
    const order = await client.evaluate(`(() => {
      const f = [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
        .filter((el) => el.tabIndex >= 0 && el.getClientRects().length > 0)
      const i = f.findIndex((el) => el.closest('${BANNER}'))
      return { total: f.length, index: i, prev: f[i - 1]?.textContent.trim().slice(0, 30), positive: f.filter((el) => el.tabIndex > 0).length }
    })()`)
    check(`${width}px — 배너 링크가 문서 순서상 마지막 탭 정지점`, order.index === order.total - 1, `${order.index + 1}/${order.total}, 직전 "${order.prev}"`)
    check(`${width}px — 양수 tabindex 0개`, order.positive === 0)
  }
}

/* ───────────────────────── text ───────────────────────── */

async function text(client) {
  const SPACING = `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }`
  for (const [width, height] of [[320, 640], [390, 844], [768, 1024], [1024, 600], [1024, 768], [1280, 900], [1440, 900]]) {
    await client.setViewport(width, height, width < 1024)
    await client.navigate(`${baseUrl}/`)
    const measure = () => client.evaluate(`(() => {
      const aside = document.querySelector('${BANNER}')
      const a = aside.querySelector('a')
      const r = aside.getBoundingClientRect()
      const clipped = [aside, a, ...a.children].some((el) => el.scrollWidth > el.clientWidth + 0.5 || el.scrollHeight > el.clientHeight + 0.5)
      return { w: r.width, h: r.height, top: r.top, bottom: r.bottom, left: r.left, clipped, headerBottom: document.querySelector('header').getBoundingClientRect().bottom, vw: document.documentElement.clientWidth }
    })()`)
    const before = await measure()
    await client.evaluate(`(() => { const s = document.createElement('style'); s.textContent = ${JSON.stringify(SPACING)}; document.head.append(s) })()`)
    await delay(200)
    const after = await measure()
    console.log(`  ${width}x${height} 기본 ${before.w.toFixed(0)}×${before.h.toFixed(0)} (top ${before.top.toFixed(0)}) → 간격 강제 ${after.w.toFixed(0)}×${after.h.toFixed(0)} (top ${after.top.toFixed(0)}, 헤더 bottom ${after.headerBottom.toFixed(0)})`)
    check(`${width}x${height} — 기본 상태 문구 잘림 없음`, !before.clipped)
    check(`${width}x${height} — 텍스트 간격(1.4.12) 강제 시 문구 잘림 없음`, !after.clipped)
    check(`${width}x${height} — 배너가 뷰포트 안(가로)`, after.left >= 0 && after.left + after.w <= after.vw + 0.5)
  }
}

/* ───────────────────────── main ───────────────────────── */

const modes = { focus, cls, ax, text }
if (!modes[mode]) {
  console.error(`알 수 없는 모드: ${mode}`)
  process.exit(1)
}
await withChrome(PORT, modes[mode])
console.log(`\n${mode}: 실패 ${failures}건`)
process.exit(failures > 0 ? 1 : 0)
