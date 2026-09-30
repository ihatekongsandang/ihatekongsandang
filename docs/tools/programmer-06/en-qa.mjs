/**
 * 프로그래머 06 — 영어 페이지 실측 도구(`programmer-05/en-qa.mjs`를 06 기준으로 갱신).
 *
 *   node docs/tools/programmer-06/en-qa.mjs <baseUrl> <checks|capture> [outDir]
 *
 *   checks  : 05의 검사(8경로 × 320·390·1280 — lang·canonical·hreflang·언어 전환 목적지+실제 클릭·배너·여백·가로 넘침·콘솔 오류)
 *             + 영어 피드 2페이지·마지막 페이지 경로 추가
 *             + 피드 전 페이지(1~마지막) 하이드레이션 후 카드 대조: 한국어 피드와 카드 수·id 순서 동일,
 *               영어본 카드 → `/en/post/…`, 없는 카드 → `/post/…` + `lang`·`hrefLang="ko"` + "Korean only" + 이미지 `lang="ko"`
 *             + 영어 피드 안내 문구 · 카드 실제 클릭(영어본 없는 카드 → 한국어 상세 lang=ko, 영어본 카드 → 영어 상세)
 *             + GA 이벤트 payload(dataLayer) — select_card·view_card에 `language: 'en'`·`translated` 값, 한국어 피드는 기존 payload
 *             + HTTP 상태: 영어본 없는 id `/en/post/{id}` 404 · `/en?page=마지막+1` 404
 *   ga      : 카드 클릭 도착 + GA payload만. 측정 ID(`NEXT_PUBLIC_GA_ID`)를 넣어 빌드한 서버에 실행한다
 *             (로컬 `.env.local`은 측정 ID가 비어 있어 `checks`에서는 payload 검사를 건너뛴다).
 *   capture : 390 / 1280 첫 화면 — `/en`(영어 카드와 Korean only 카드가 섞인 상태) + `/en?page=2`
 *
 * 영어본 id는 `content/posts-en/*.md` 파일명에서, 한국어 id는 `content/posts/*.md` 파일명에서 읽는다(빌드 로더와 별도 경로).
 * 로컬 프로덕션 빌드(`npm run build && npx next start`)를 대상으로 돌린다. 외부 요청은 막는다.
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const PORT = 9336
const SAMPLE = '2026-09-29-nowandhere-defense-minister-nk-responsibility'
const EN_IDS = new Set(fs.readdirSync('content/posts-en').filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')))
const KO_IDS = fs.readdirSync('content/posts').filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort()
/**
 * 영어본이 없는 한국어 게시물(404·클릭 확인용). 05 도구의 고정값(sbsnews…)은 그 뒤 영어본이 생겨 더는 쓸 수 없다 —
 * 파일 목록에서 영어본 없는 id 중 마지막(최신 날짜) 것을 고른다.
 */
const UNTRANSLATED = KO_IDS.filter((id) => !EN_IDS.has(id)).at(-1)
const PAGE_SIZE = 12
const LAST_PAGE = Math.ceil(KO_IDS.length / PAGE_SIZE)
const NOTICE = 'Posts marked "Korean only" have not been translated yet and open in Korean.'
const BANNER = 'aside[aria-label="외부 링크 안내"]'

const [baseUrl, mode, outDir] = process.argv.slice(2)
if (!baseUrl || !mode) {
  console.error('사용법: node en-qa.mjs <baseUrl> <checks|capture> [outDir]')
  process.exit(1)
}

let failures = 0
let passes = 0
function check(label, ok, detail = '') {
  if (ok) passes += 1
  else failures += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

const abs = (p) => new URL(p, 'http://localhost:3000').href.replace(/\/$/, '') // NEXT_PUBLIC_SITE_URL(로컬)=http://localhost:3000

/** 경로별 기대값. hreflang이 없어야 하는 페이지는 `alternates: null`. */
const ROUTES = [
  {
    path: '/',
    lang: 'ko',
    canonical: abs('/'),
    alternates: { ko: abs('/'), en: abs('/en'), 'x-default': abs('/') },
    switchTo: { lang: 'en', href: '/en' },
    banner: true,
  },
  {
    path: `/post/${SAMPLE}`,
    lang: 'ko',
    canonical: abs(`/post/${SAMPLE}`),
    alternates: { ko: abs(`/post/${SAMPLE}`), en: abs(`/en/post/${SAMPLE}`), 'x-default': abs(`/post/${SAMPLE}`) },
    switchTo: { lang: 'en', href: `/en/post/${SAMPLE}` },
    detailLink: { text: 'Read in English', href: `/en/post/${SAMPLE}`, lang: 'en' },
    banner: true,
  },
  {
    path: `/post/${UNTRANSLATED}`,
    lang: 'ko',
    canonical: abs(`/post/${UNTRANSLATED}`),
    alternates: null,
    switchTo: { lang: 'en', href: '/en' },
    detailLink: null,
    banner: true,
  },
  {
    path: '/about',
    lang: 'ko',
    canonical: abs('/about'),
    alternates: { ko: abs('/about'), en: abs('/en/about'), 'x-default': abs('/about') },
    switchTo: { lang: 'en', href: '/en/about' },
    banner: true,
  },
  {
    path: '/tag/dmz',
    lang: 'ko',
    canonical: abs('/tag/dmz'),
    alternates: null,
    switchTo: { lang: 'en', href: '/en' },
    banner: true,
  },
  {
    path: '/en',
    lang: 'en',
    canonical: abs('/en'),
    alternates: { ko: abs('/'), en: abs('/en'), 'x-default': abs('/') },
    switchTo: { lang: 'ko', href: '/' },
    banner: false,
  },
  {
    path: '/en?page=2',
    lang: 'en',
    canonical: abs('/en?page=2'),
    alternates: null,
    switchTo: { lang: 'ko', href: '/' },
    banner: false,
  },
  {
    path: `/en?page=${LAST_PAGE}`,
    lang: 'en',
    canonical: abs(`/en?page=${LAST_PAGE}`),
    alternates: null,
    switchTo: { lang: 'ko', href: '/' },
    banner: false,
  },
  {
    path: `/en/post/${SAMPLE}`,
    lang: 'en',
    canonical: abs(`/en/post/${SAMPLE}`),
    alternates: { ko: abs(`/post/${SAMPLE}`), en: abs(`/en/post/${SAMPLE}`), 'x-default': abs(`/post/${SAMPLE}`) },
    switchTo: { lang: 'ko', href: `/post/${SAMPLE}` },
    detailLink: { text: '한국어 원문 보기', href: `/post/${SAMPLE}`, lang: 'ko' },
    banner: false,
  },
  {
    path: '/en/about',
    lang: 'en',
    canonical: abs('/en/about'),
    alternates: { ko: abs('/about'), en: abs('/en/about'), 'x-default': abs('/about') },
    switchTo: { lang: 'ko', href: '/about' },
    banner: false,
  },
]

const INSPECT = `(() => {
  const langNav = document.querySelector('nav[aria-label="언어 선택"], nav[aria-label="Language"]')
  const switchLink = langNav ? langNav.querySelector('a') : null
  const current = langNav ? langNav.querySelector('[aria-current="true"]') : null
  const detail = [...document.querySelectorAll('article header a')].find((a) => /Read in English|한국어 원문 보기/.test(a.textContent))
  return {
    lang: document.documentElement.getAttribute('lang'),
    htmlClass: document.documentElement.getAttribute('class'),
    canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute('href')),
    alternates: Object.fromEntries([...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')])),
    alternateCount: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
    switchHref: switchLink ? switchLink.getAttribute('href') : null,
    switchLang: switchLink ? switchLink.getAttribute('lang') : null,
    switchHreflang: switchLink ? switchLink.getAttribute('hreflang') : null,
    currentText: current ? current.textContent : null,
    detail: detail ? { text: detail.textContent, href: detail.getAttribute('href'), lang: detail.getAttribute('lang') } : null,
    banner: Boolean(document.querySelector('${BANNER}')),
    mainClass: document.querySelector('main')?.getAttribute('class') ?? '',
    footerClass: document.querySelector('footer')?.getAttribute('class') ?? '',
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
    tagLinks: document.querySelectorAll('main a[href^="/tag/"]').length,
    koTagNav: Boolean(document.querySelector('nav[aria-label="태그"]')),
    sourcesNote: [...document.querySelectorAll('#sources-heading ~ p')].map((p) => p.textContent),
  }
})()`


const CARDS = `(() => [...document.querySelectorAll('main ul.grid > li')].map((li) => {
  const a = li.querySelector('h3 a')
  const img = li.querySelector('img')
  return {
    id: (a?.getAttribute('href') ?? '').replace(/^\\/(en\\/)?post\\//, ''),
    href: a?.getAttribute('href'),
    lang: a?.getAttribute('lang'),
    hrefLang: a?.getAttribute('hreflang'),
    title: a?.textContent,
    imgAlt: img?.getAttribute('alt') ?? null,
    imgLang: img?.getAttribute('lang') ?? null,
    badge: [...li.querySelectorAll('span')].filter((el) => el.textContent === 'Korean only').length,
  }
}))()`

/** 피드 전 페이지 — 하이드레이션 후 DOM 기준 한국어·영어 카드 대조. */
async function feedChecks(client) {
  await client.setViewport(390, 844, true)
  let total = 0
  let koreanOnly = 0
  for (let n = 1; n <= LAST_PAGE; n += 1) {
    await client.navigate(`${baseUrl}${n === 1 ? '/' : `/?page=${n}`}`)
    const ko = await client.evaluate(CARDS)
    const koNotice = await client.evaluate(`document.body.innerText.includes(${JSON.stringify(NOTICE)}) || document.body.innerText.includes('Korean only')`)
    await client.navigate(`${baseUrl}${n === 1 ? '/en' : `/en?page=${n}`}`)
    const en = await client.evaluate(CARDS)
    const notice = await client.evaluate(`[...document.querySelectorAll('main p')].filter((p) => p.textContent === ${JSON.stringify(NOTICE)}).length`)
    const tag = `피드 p${n}`
    check(`${tag} 카드 수 동일(${ko.length})`, ko.length === en.length && ko.length > 0, `ko ${ko.length} · en ${en.length}`)
    check(`${tag} id 순서 동일`, JSON.stringify(ko.map((c) => c.id)) === JSON.stringify(en.map((c) => c.id)))
    check(`${tag} 영어 안내 1회`, notice === 1, String(notice))
    check(`${tag} 한국어 페이지 안내·Korean only 없음`, koNotice === false)
    check(`${tag} 한국어 카드 lang·hreflang 없음·/post/`, ko.every((c) => !c.lang && !c.hrefLang && !c.imgLang && c.href === `/post/${c.id}` && c.badge === 0))
    let bad = []
    en.forEach((card, i) => {
      total += 1
      if (EN_IDS.has(card.id)) {
        if (!(card.href === `/en/post/${card.id}` && !card.lang && !card.hrefLang && !card.imgLang && card.badge === 0)) bad.push(card.id)
      } else {
        koreanOnly += 1
        const koCard = ko[i]
        const ok =
          card.href === `/post/${card.id}` && card.lang === 'ko' && card.hrefLang === 'ko' && card.badge === 1 &&
          card.title === koCard.title && card.imgAlt === koCard.imgAlt && (card.imgAlt === null || card.imgLang === 'ko')
        if (!ok) bad.push(card.id)
      }
    })
    check(`${tag} 카드별 링크·lang·표시 ${en.length}장`, bad.length === 0, bad.join(', '))
  }
  console.log(`피드 카드 대조: ${LAST_PAGE}페이지 · 영어 카드 ${total}장(Korean only ${koreanOnly} · 영어본 ${total - koreanOnly}) · 한국어 게시물 ${KO_IDS.length} · 영어본 ${EN_IDS.size}`)
  check('피드 카드 합계 = 한국어 게시물 수', total === KO_IDS.length, `${total} / ${KO_IDS.length}`)
}

const DATA_LAYER_EVENTS = `(window.dataLayer ?? []).filter((a) => a && a[0] === 'event').map((a) => [a[1], a[2]])`

/** 카드 실제 클릭 + GA payload. 클릭 이벤트 처리는 동기라 click() 직후 dataLayer를 읽는다(그다음 이동). */
async function clickChecks(client, requireGa) {
  await client.setViewport(390, 844, true)
  const cases = [
    { from: '/en', pick: 'koreanOnly', expect: { lang: 'ko' }, payload: { language: 'en', translated: false } },
    { from: '/en', pick: 'translated', expect: { lang: 'en' }, payload: { language: 'en', translated: true } },
    { from: '/', pick: 'any', expect: { lang: 'ko' }, payload: null },
  ]
  for (const c of cases) {
    await client.navigate(`${baseUrl}${c.from}`)
    await delay(800) // afterInteractive GA 초기화(window.gtag) 대기
    const picked = await client.evaluate(`(() => {
      const items = [...document.querySelectorAll('main ul.grid > li')]
      const li = items.find((item) => {
        const badge = [...item.querySelectorAll('span')].some((el) => el.textContent === 'Korean only')
        return ${JSON.stringify(c.pick)} === 'any' || (${JSON.stringify(c.pick)} === 'koreanOnly') === badge
      })
      if (!li) return null
      const a = li.querySelector('h3 a')
      const position = items.indexOf(li) + 1
      const before = (window.dataLayer ?? []).length
      a.click()
      const events = (window.dataLayer ?? []).slice(before).filter((x) => x && x[0] === 'event').map((x) => [x[1], x[2]])
      return { href: a.getAttribute('href'), position, events, gtag: typeof window.gtag }
    })()`)
    const label = `클릭 ${c.from} ${c.pick}`
    check(`${label} 카드 있음`, Boolean(picked), JSON.stringify(picked))
    if (!picked) continue
    if (requireGa) {
      check(`${label} gtag 준비`, picked.gtag === 'function', picked.gtag)
      const select = picked.events.find(([name]) => name === 'select_card')
      const id = picked.href.replace(/^\/(en\/)?post\//, '')
      const expectedPayload = { post_id: id, position: picked.position, ...(c.payload ?? {}) }
      check(`${label} select_card payload`, Boolean(select) && JSON.stringify(select[1]) === JSON.stringify(expectedPayload), JSON.stringify(select?.[1]))
    }
    await delay(2000)
    const landed = await client.evaluate('({ path: location.pathname, lang: document.documentElement.lang })')
    check(`${label} 도착 ${picked.href} (lang=${c.expect.lang})`, landed.path === picked.href && landed.lang === c.expect.lang, JSON.stringify(landed))
  }

  if (!requireGa) {
    console.log('SKIP  GA payload 검사 — 이 빌드는 측정 ID가 없어 trackEvent가 no-op이다(`ga` 모드를 측정 ID 넣은 빌드에 따로 실행)')
    return
  }
  // view_card — 영어 피드를 끝까지 내려 카드 노출 이벤트를 모은다.
  for (const [from, isEn] of [['/en', true], ['/', false]]) {
    await client.navigate(`${baseUrl}${from}`)
    await delay(800)
    for (let y = 0; y < 12; y += 1) {
      await client.evaluate(`window.scrollBy(0, 600)`)
      await delay(250)
    }
    const events = (await client.evaluate(DATA_LAYER_EVENTS)).filter(([name]) => name === 'view_card')
    const wrong = events.filter(([, p]) => {
      if (!isEn) return 'language' in p || 'translated' in p
      return p.language !== 'en' || p.translated !== EN_IDS.has(p.post_id)
    })
    check(`view_card ${from} ${events.length}건 payload`, events.length > 0 && wrong.length === 0, JSON.stringify(wrong.slice(0, 3)))
    if (isEn) {
      const kinds = new Set(events.map(([, p]) => p.translated))
      check('view_card /en — translated true·false 둘 다 관측', kinds.has(true) && kinds.has(false), JSON.stringify([...kinds]))
    }
  }
}

async function checks(client) {
  const consoleErrors = []
  client.on((message) => {
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      consoleErrors.push(message.params.args.map((a) => a.value ?? a.description).join(' '))
    }
    if (message.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(message.params.exceptionDetails?.exception?.description ?? 'exception')
    }
  })
  await client.send('Runtime.enable')

  for (const route of ROUTES) {
    for (const [width, height] of [
      [320, 640],
      [390, 844],
      [1280, 900],
    ]) {
      await client.setViewport(width, height, width < 1024)
      const before = consoleErrors.length
      await client.navigate(`${baseUrl}${route.path}`)
      const r = await client.evaluate(INSPECT)
      const tag = `${route.path} @${width}`
      check(`${tag} 가로 넘침 없음`, r.overflowX <= 0, `scrollWidth-innerWidth=${r.overflowX}`)
      check(`${tag} 콘솔 오류 0`, consoleErrors.length === before, consoleErrors.slice(before).join(' | '))
      if (width !== 390) continue

      check(`${route.path} <html lang="${route.lang}">`, r.lang === route.lang, `실제 ${r.lang}`)
      check(`${route.path} canonical 1개 = 자기 자신`, r.canonical.length === 1 && r.canonical[0] === route.canonical, JSON.stringify(r.canonical))
      if (route.alternates) {
        check(
          `${route.path} hreflang ko·en·x-default`,
          r.alternateCount === 3 && JSON.stringify(r.alternates) === JSON.stringify(route.alternates),
          JSON.stringify(r.alternates),
        )
      } else {
        check(`${route.path} hreflang 없음(짝 없음)`, r.alternateCount === 0, JSON.stringify(r.alternates))
      }
      check(
        `${route.path} 헤더 전환 → ${route.switchTo.href}`,
        r.switchHref === route.switchTo.href && r.switchLang === route.switchTo.lang && r.switchHreflang === route.switchTo.lang,
        `${r.switchHref} lang=${r.switchLang} hreflang=${r.switchHreflang}`,
      )
      check(`${route.path} 헤더 현재 언어 표시`, r.currentText === (route.lang === 'ko' ? '한국어' : 'English'), r.currentText)
      if (route.detailLink !== undefined) {
        if (route.detailLink) {
          check(
            `${route.path} 상세 "${route.detailLink.text}" 링크`,
            r.detail?.text === route.detailLink.text && r.detail?.href === route.detailLink.href && r.detail?.lang === route.detailLink.lang,
            JSON.stringify(r.detail),
          )
        } else {
          check(`${route.path} 영어본 없으니 Read in English 없음`, r.detail === null, JSON.stringify(r.detail))
        }
      }
      check(`${route.path} 플로팅 배너 ${route.banner ? '표시' : '미표시'}`, r.banner === route.banner)
      if (route.banner) {
        check(`${route.path} 배너 여백 클래스 유지`, (r.htmlClass ?? '').includes('scroll-pb') && r.mainClass.includes('pr-14') && r.footerClass.includes('pb-['))
      } else {
        check(`${route.path} 배너 여백 없음`, r.htmlClass === null && !r.mainClass.includes('pr-14') && !r.footerClass.includes('pb-['), `${r.htmlClass} / ${r.mainClass} / ${r.footerClass}`)
      }
      if (route.lang === 'en') {
        check(`${route.path} 태그 칩·태그 링크 없음`, r.tagLinks === 0 && !r.koTagNav, `tag links ${r.tagLinks}`)
      }
      if (route.path === `/en/post/${SAMPLE}`) {
        check(`${route.path} "Sources are in Korean." 안내`, r.sourcesNote.includes('Sources are in Korean.'), JSON.stringify(r.sourcesNote))
      }

      // 언어 전환 링크 실제 클릭 → 도착 URL·lang
      await client.evaluate(`(() => { document.querySelector('nav[aria-label="언어 선택"] a, nav[aria-label="Language"] a').click(); return true })()`)
      await delay(1500)
      const landed = await client.evaluate('({ path: location.pathname, lang: document.documentElement.lang })')
      check(
        `${route.path} 전환 클릭 → ${route.switchTo.href} (lang=${route.switchTo.lang})`,
        landed.path === route.switchTo.href && landed.lang === route.switchTo.lang,
        JSON.stringify(landed),
      )
    }
  }

  await feedChecks(client)
  await clickChecks(client, false)

  // HTTP 상태
  for (const [p, expected] of [
    [`/en/post/${UNTRANSLATED}`, 404],
    ['/en/post/no-such-id', 404],
    [`/en/post/${SAMPLE}`, 200],
    ['/en', 200],
    ['/en/about', 200],
    ['/en?page=1', 200],
    [`/en?page=${LAST_PAGE}`, 200],
    [`/en?page=${LAST_PAGE + 1}`, 404],
    [`/post/${UNTRANSLATED}`, 200],
    [`/post/${SAMPLE}`, 200],
  ]) {
    const response = await fetch(`${baseUrl}${p}`)
    const html = await response.text()
    check(`HTTP ${p} → ${expected}`, response.status === expected, `실제 ${response.status}`)
    if (expected === 404 && p.startsWith('/en/post/')) {
      check(`HTTP ${p} 404 문서 lang=ko·안내 문구`, /<html lang="ko"/.test(html) && html.includes('페이지를 찾을 수 없습니다') && html.includes('Go to the English home'))
    }
    if (expected === 404) {
      // 리뷰어 11 P2-C — 모순된 robots(index, follow) 없이 noindex만
      const robots = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1])
      check(`HTTP ${p} robots에 index, follow 없음`, robots.length > 0 && robots.every((r) => r.startsWith('noindex')), JSON.stringify(robots))
    }
  }
}

async function capture(client) {
  if (!outDir) throw new Error('capture 모드는 outDir이 필요합니다.')
  fs.mkdirSync(outDir, { recursive: true })
  for (const [name, route] of [
    ['en-feed', '/en'],
    ['en-feed-page2', '/en?page=2'],
  ]) {
    for (const [label, width, height] of [
      ['390', 390, 844],
      ['1280', 1280, 900],
    ]) {
      await client.setViewport(width, height, width < 1024)
      await client.navigate(`${baseUrl}${route}`)
      await delay(800)
      const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
      const file = path.join(outDir, `${name}--${label}.png`)
      fs.writeFileSync(file, Buffer.from(data, 'base64'))
      const mix = await client.evaluate(`(() => { const cards = [...document.querySelectorAll('main ul.grid > li')].filter((li) => li.getBoundingClientRect().top < innerHeight); return { visible: cards.length, koreanOnly: cards.filter((li) => li.textContent.includes('Korean only')).length } })()`)
      console.log(`${path.basename(file)} — ${fs.statSync(file).size.toLocaleString()} bytes · 첫 화면 카드 ${mix.visible}장(Korean only ${mix.koreanOnly})`)
    }
  }
}

await withChrome(PORT, async (client) => {
  if (mode === 'checks') await checks(client)
  else if (mode === 'ga') await clickChecks(client, true)
  else if (mode === 'capture') await capture(client)
  else throw new Error(`알 수 없는 모드: ${mode}`)
})

if (mode === 'checks' || mode === 'ga') console.log(`\n검사 ${passes + failures}개 · 통과 ${passes} · 실패 ${failures}`)
process.exit(failures > 0 ? 1 : 0)
