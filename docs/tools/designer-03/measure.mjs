/**
 * 디자인 팀장 03 — 배포 사이트 반응형 현황 실측(스크린샷 + 레이아웃 수치).
 *
 * 실행: node docs/tools/designer-03/measure.mjs
 * - 대상: 배포 프로덕션(아래 BASE). 로컬 빌드·next start를 하지 않는다(다른 세션과 .next 충돌 방지).
 * - 헤드리스 Chrome + DevTools 프로토콜(docs/tools/programmer-04/cdp.mjs 재사용, 추가 의존성 없음).
 *   cdp.mjs가 GA·캠페인 사이트 요청을 막는다(운영 통계 오염 방지).
 * - 폭 7종 × 페이지 8종 = 56 조합. 조합마다 첫 화면(fold) PNG 1장 + 전체 길이(full) PNG 1장 + 수치 1행.
 * - 다크 모드: prefers-color-scheme: dark 에뮬레이션으로 390·1280 홈 첫 화면 2장 + 배경색 수치.
 * - 출력: screens/*.png, metrics.json, metrics-summary.txt (모두 이 폴더 기준 상대경로).
 * 끝나면 Chrome 프로세스와 임시 프로필을 cdp.mjs가 정리한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withChrome, delay } from '../programmer-04/cdp.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(HERE, 'screens')
fs.mkdirSync(OUT, { recursive: true })

const BASE = 'https://ihatekongsandang.vercel.app'
const POST_ID = '2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019'

const WIDTHS = [
  { w: 360, h: 740, mobile: true, label: 'mobile-s' },
  { w: 390, h: 844, mobile: true, label: 'mobile' },
  { w: 768, h: 1024, mobile: true, label: 'tablet-portrait' },
  { w: 834, h: 1194, mobile: true, label: 'tablet-portrait-l' },
  { w: 1024, h: 768, mobile: true, label: 'tablet-landscape' },
  { w: 1280, h: 800, mobile: false, label: 'desktop' },
  { w: 1440, h: 900, mobile: false, label: 'desktop-wide' },
]

const PAGES = [
  { key: 'home-ko', path: '/' },
  { key: 'home-en', path: '/en' },
  { key: 'tag-ko', path: '/tag/dmz' },
  { key: 'tags-ko', path: '/tags' },
  { key: 'post-ko', path: `/post/${POST_ID}` },
  { key: 'post-en', path: `/en/post/${POST_ID}` },
  { key: 'about-ko', path: '/about' },
  { key: 'terms-ko', path: '/terms' },
]

/** 페이지 안에서 실행하는 측정 식. 값만 돌려준다. */
const MEASURE = String.raw`(() => {
  const vw = window.innerWidth, vh = window.innerHeight
  const de = document.documentElement
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.left), y: Math.round(b.top + scrollY), w: Math.round(b.width), h: Math.round(b.height) } }
  const fs = (el) => el ? parseFloat(getComputedStyle(el).fontSize) : null
  const lh = (el) => el ? getComputedStyle(el).lineHeight : null
  /** 텍스트 블록의 줄 수와 줄당 평균 글자 수(공백 제외 아님 — 표시 글자 그대로). */
  const lines = (el) => {
    if (!el) return null
    const range = document.createRange(); range.selectNodeContents(el)
    const tops = new Set([...range.getClientRects()].filter(x => x.width > 1).map(x => Math.round(x.top)))
    const n = Math.max(1, tops.size); const len = el.textContent.trim().length
    return { lines: n, chars: len, charsPerLine: Math.round(len / n), width: Math.round(el.getBoundingClientRect().width), fontSize: fs(el), lineHeight: lh(el) }
  }
  const visible = (el) => { const b = el.getBoundingClientRect(); const s = getComputedStyle(el); return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('.sr-only') }

  const header = document.querySelector('header')
  const main = document.querySelector('main')
  const footer = document.querySelector('footer')
  const h1 = document.querySelector('main h1')
  const lead = document.querySelector('main h1 + p') || document.querySelector('main header p.text-muted-foreground, main header p')

  // 그리드
  const grid = document.querySelector('main ul.grid')
  let gridInfo = null
  if (grid) {
    const items = [...grid.children]
    const cols = new Set(items.map(li => Math.round(li.getBoundingClientRect().left))).size
    const first = items[0]
    const img = first && first.querySelector('img, [role=img]')
    const title = first && first.querySelector('h3')
    const foldCards = items.filter(li => li.getBoundingClientRect().top + scrollY < vh).length
    const foldCardsFull = items.filter(li => li.getBoundingClientRect().bottom + scrollY <= vh).length
    gridInfo = { items: items.length, cols, gap: getComputedStyle(grid).columnGap, firstTop: first ? Math.round(first.getBoundingClientRect().top + scrollY) : null,
      card: r(first), image: r(img), titleFont: fs(title), titleLines: lines(title), foldCardsStarted: foldCards, foldCardsComplete: foldCardsFull,
      titleLinesAll: items.map(li => lines(li.querySelector('h3'))?.lines) }
  }

  // 태그 내비
  const tagNav = document.querySelector('nav[aria-label="태그"]')
  const tagInfo = tagNav ? { box: r(tagNav), chips: tagNav.querySelectorAll('a').length, rows: new Set([...tagNav.querySelectorAll('a')].map(a => Math.round(a.getBoundingClientRect().top))).size, chipH: Math.round(tagNav.querySelector('a')?.getBoundingClientRect().height ?? 0) } : null

  // 상세
  const article = document.querySelector('main article')
  const share = document.querySelector('section[aria-labelledby="share-heading"]')
  const shareBtns = share ? [...share.querySelectorAll('a,button')].map(r) : null
  const bodyP = document.querySelector('.post-body p')
  const desc = article ? article.querySelector('header > p.text-base') : null
  const cta = article ? [...article.querySelectorAll('a')].find(a => a.textContent.includes('원문') || a.textContent.toLowerCase().includes('original')) : null
  const sources = document.querySelector('section[aria-labelledby="sources-heading"]')
  const detail = article ? { article: r(article), titleFont: fs(article.querySelector('h1')), titleLines: lines(article.querySelector('h1')), desc: lines(desc), bodyP: lines(bodyP),
    share: r(share), shareBtns, shareInFold: share ? share.getBoundingClientRect().top + scrollY < vh : null, cta: r(cta), sources: r(sources) } : null

  // 소개·약관 본문 목록 글자
  const proseLi = document.querySelector('main section ul li')
  const prose = proseLi ? lines(proseLi) : null

  // 글자 크기 분포(보이는 텍스트 노드의 글자 수 기준)
  const sizeHist = {}
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node
  while ((node = walker.nextNode())) {
    const t = node.textContent.trim(); if (!t) continue
    const el = node.parentElement; if (!el || !visible(el)) continue
    if (el.closest('script,style,noscript')) continue
    const k = Math.round(fs(el)); sizeHist[k] = (sizeHist[k] || 0) + t.length
  }

  // 터치 영역(보이는 a·button 전부). WCAG 2.5.8 최소 24, 권장(2.5.5 AAA·플랫폼 가이드) 44.
  const targets = [...document.querySelectorAll('a[href],button')].filter(visible).map(el => {
    const b = el.getBoundingClientRect(); return { text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24), w: Math.round(b.width), h: Math.round(b.height), inHeader: !!el.closest('header'), inFooter: !!el.closest('footer') }
  })
  const under24 = targets.filter(t => t.h < 24 || t.w < 24)
  const under44 = targets.filter(t => t.h < 44)

  const banner = document.querySelector('aside[aria-label="외부 링크 안내"]')
  const bannerBox = banner ? (() => { const b = banner.getBoundingClientRect(); return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height), fixed: getComputedStyle(banner).position } })() : null

  // 헤더 줄바꿈(로고·내비가 한 줄인가)
  const headerLinks = header ? [...header.querySelectorAll('a,span[aria-current]')].map(el => Math.round(el.getBoundingClientRect().top)) : []

  return {
    vw, vh, scrollWidth: de.scrollWidth, overflowX: de.scrollWidth > vw, docHeight: de.scrollHeight,
    bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color, colorScheme: getComputedStyle(de).colorScheme,
    header: r(header), headerRows: new Set(headerLinks).size, main: r(main), mainPadL: main ? getComputedStyle(main).paddingLeft : null, footer: r(footer),
    contentLeft: main ? Math.round(main.getBoundingClientRect().left + parseFloat(getComputedStyle(main).paddingLeft)) : null,
    contentWidth: main ? Math.round(main.clientWidth - parseFloat(getComputedStyle(main).paddingLeft) - parseFloat(getComputedStyle(main).paddingRight)) : null,
    h1: { font: fs(h1), lines: lines(h1)?.lines, box: r(h1) }, lead: lines(lead),
    grid: gridInfo, tagNav: tagInfo, detail, prose,
    sizeHist, targets: targets.length, under24: under24.length, under24List: under24.slice(0, 12), under44: under44.length, under44Sample: under44.slice(0, 12),
    banner: bannerBox,
  }
})()`

async function scrollThrough(client) {
  // 지연 로딩 이미지를 띄우기 위해 끝까지 내렸다가 맨 위로 돌아온다.
  const height = await client.evaluate('document.documentElement.scrollHeight')
  const vh = await client.evaluate('innerHeight')
  for (let y = 0; y < height; y += Math.max(300, vh - 100)) {
    await client.evaluate(`scrollTo(0, ${y})`)
    await delay(120)
  }
  await client.evaluate('scrollTo(0, 0)')
  await delay(500)
}

async function shot(client, file, full) {
  let params = { format: 'png' }
  if (full) {
    const { cssContentSize } = await client.send('Page.getLayoutMetrics')
    params = { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: cssContentSize.width, height: Math.min(cssContentSize.height, 16000), scale: 1 } }
  }
  const { data } = await client.send('Page.captureScreenshot', params)
  fs.writeFileSync(path.join(OUT, file), Buffer.from(data, 'base64'))
}

const results = []
await withChrome(9347, async (client) => {
  for (const vp of WIDTHS) {
    await client.setViewport(vp.w, vp.h, vp.mobile)
    await client.send('Emulation.setTouchEmulationEnabled', { enabled: vp.mobile })
    for (const page of PAGES) {
      await client.navigate(BASE + page.path)
      await scrollThrough(client)
      const metrics = await client.evaluate(MEASURE)
      const base = `${page.key}-${vp.w}`
      await shot(client, `${base}-fold.png`, false)
      await shot(client, `${base}-full.png`, true)
      // full 캡처가 뷰포트 크기를 바꿀 수 있어 원복
      await client.setViewport(vp.w, vp.h, vp.mobile)
      results.push({ page: page.key, path: page.path, width: vp.w, height: vp.h, label: vp.label, ...metrics })
      console.log(`✓ ${base}  overflowX=${metrics.overflowX} cols=${metrics.grid?.cols ?? '-'} under24=${metrics.under24} under44=${metrics.under44}/${metrics.targets}`)
    }
  }
  // 다크 모드 선호 사용자 화면
  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] })
  for (const w of [390, 1280]) {
    const vp = WIDTHS.find((x) => x.w === w)
    await client.setViewport(vp.w, vp.h, vp.mobile)
    for (const page of [PAGES[0], PAGES[4]]) {
      await client.navigate(BASE + page.path)
      await delay(400)
      const m = await client.evaluate('({ bodyBg: getComputedStyle(document.body).backgroundColor, scheme: getComputedStyle(document.documentElement).colorScheme, mq: matchMedia("(prefers-color-scheme: dark)").matches })')
      await shot(client, `dark-${page.key}-${w}-fold.png`, false)
      results.push({ page: `dark-${page.key}`, width: w, dark: m })
      console.log(`✓ dark ${page.key} ${w}`, JSON.stringify(m))
    }
  }
})

fs.writeFileSync(path.join(HERE, 'metrics.json'), JSON.stringify(results, null, 2))

// 사람이 읽는 요약
const lines = []
for (const m of results) {
  if (m.dark) { lines.push(`[dark] ${m.page} @${m.width}: bodyBg=${m.dark.bodyBg} scheme=${m.dark.scheme} prefersDark=${m.dark.mq}`); continue }
  const small = Object.entries(m.sizeHist).filter(([k]) => Number(k) < 14).reduce((s, [, v]) => s + v, 0)
  const total = Object.values(m.sizeHist).reduce((s, v) => s + v, 0)
  const parts = [
    `${m.page} @${m.width}`,
    `overflowX=${m.overflowX}`,
    `content=${m.contentLeft}+${m.contentWidth}/${m.vw}`,
    `header=${m.header?.h}px rows=${m.headerRows}`,
    `h1=${m.h1.font}px×${m.h1.lines}줄`,
    m.lead ? `lead=${m.lead.fontSize}px ${m.lead.charsPerLine}자/줄` : null,
    m.grid ? `grid cols=${m.grid.cols} card=${m.grid.card?.w}×${m.grid.card?.h} img=${m.grid.image?.h} title=${m.grid.titleFont}px firstTop=${m.grid.firstTop} fold=${m.grid.foldCardsComplete}완/${m.grid.foldCardsStarted}시작 titleLines=[${m.grid.titleLinesAll.join(',')}]` : null,
    m.tagNav ? `tags chips=${m.tagNav.chips} rows=${m.tagNav.rows} h=${m.tagNav.box.h} chipH=${m.tagNav.chipH}` : null,
    m.detail ? `article w=${m.detail.article.w} title=${m.detail.titleFont}px×${m.detail.titleLines?.lines} desc=${m.detail.desc?.fontSize}px ${m.detail.desc?.charsPerLine}자/줄 body=${m.detail.bodyP?.fontSize}px ${m.detail.bodyP?.charsPerLine}자/줄 shareY=${m.detail.share?.y} shareInFold=${m.detail.shareInFold} shareBtn=${m.detail.shareBtns?.map(b => `${b.w}×${b.h}`).join('/')} ctaY=${m.detail.cta?.y}` : null,
    m.prose ? `prose li=${m.prose.fontSize}px ${m.prose.charsPerLine}자/줄 lh=${m.prose.lineHeight}` : null,
    `<14px 글자 ${small}/${total} (${total ? Math.round((small / total) * 100) : 0}%)`,
    `targets=${m.targets} <24=${m.under24} <44h=${m.under44}`,
    m.banner ? `banner=${m.banner.x},${m.banner.y} ${m.banner.w}×${m.banner.h}` : 'banner=없음',
    `docH=${m.docHeight}`,
  ].filter(Boolean)
  lines.push(parts.join(' | '))
}
fs.writeFileSync(path.join(HERE, 'metrics-summary.txt'), lines.join('\n') + '\n')
console.log(`\n총 ${results.length}행 기록 (기대: ${WIDTHS.length * PAGES.length} + 다크 4)`)
