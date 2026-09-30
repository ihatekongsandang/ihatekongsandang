/**
 * 프로그래머 05 — 영어 페이지(`/en/**`) 실측 도구.
 *
 *   node docs/tools/programmer-05/en-qa.mjs <baseUrl> <checks|capture> [outDir]
 *
 *   checks  : 대상 경로마다 실제 브라우저로 열어
 *             `<html lang>` · canonical · hreflang(ko·en·x-default) · 헤더 언어 전환 링크 목적지 ·
 *             상세의 Read in English / 한국어 원문 보기 링크 · 플로팅 배너 유무·배너 여백 클래스 ·
 *             가로 넘침(320·390·1280) · 콘솔 오류, 그리고 언어 전환 링크를 **실제로 클릭**해 도착 URL·lang 확인.
 *             추가로 HTTP 상태: 영어본 없는 id `/en/post/{id}` → 404.
 *   capture : 390 / 1280 캡처 — `/en`, `/en/post/{샘플}`, 한국어 상세(전환 링크 보이는 상태) + 영어 상세 전체 길이.
 *
 * 로컬 프로덕션 빌드(`npm run build && npx next start`)를 대상으로 돌린다. 외부 요청은 막는다.
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const PORT = 9335
const SAMPLE = '2026-09-29-nowandhere-defense-minister-nk-responsibility'
/** 영어본이 없는 한국어 게시물(404 확인용) — 샘플 본문이 링크하는 글. */
const UNTRANSLATED = '2026-09-29-sbsnews-lee-mine-conspiracy-remark'
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

  // HTTP 상태
  for (const [p, expected] of [
    [`/en/post/${UNTRANSLATED}`, 404],
    ['/en/post/no-such-id', 404],
    [`/en/post/${SAMPLE}`, 200],
    ['/en', 200],
    ['/en/about', 200],
    ['/en?page=1', 200],
    [`/post/${SAMPLE}`, 200],
  ]) {
    const response = await fetch(`${baseUrl}${p}`)
    const html = await response.text()
    check(`HTTP ${p} → ${expected}`, response.status === expected, `실제 ${response.status}`)
    if (expected === 404) {
      check(`HTTP ${p} 404 문서 lang=ko·안내 문구`, /<html lang="ko"/.test(html) && html.includes('페이지를 찾을 수 없습니다') && html.includes('Go to the English home'))
    }
  }
}

async function capture(client) {
  if (!outDir) throw new Error('capture 모드는 outDir이 필요합니다.')
  fs.mkdirSync(outDir, { recursive: true })
  const shots = [
    ['en-home', '/en'],
    ['en-post', `/en/post/${SAMPLE}`],
    ['ko-post', `/post/${SAMPLE}`],
  ]
  for (const [name, route] of shots) {
    for (const [label, width, height] of [
      ['390', 390, 844],
      ['1280', 1280, 900],
    ]) {
      await client.setViewport(width, height, width < 1024)
      await client.navigate(`${baseUrl}${route}`)
      const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
      const file = path.join(outDir, `${name}--${label}.png`)
      fs.writeFileSync(file, Buffer.from(data, 'base64'))
      console.log(`${path.basename(file)} — ${fs.statSync(file).size.toLocaleString()} bytes`)
    }
  }
  // 영어 상세 전체 길이(본문·배경 보도·"Sources are in Korean" 안내·하단까지)
  for (const [label, width, height] of [
    ['390', 390, 844],
    ['1280', 1280, 900],
  ]) {
    await client.setViewport(width, height, width < 1024)
    await client.navigate(`${baseUrl}/en/post/${SAMPLE}`)
    const docHeight = await client.evaluate('document.documentElement.scrollHeight')
    const { data } = await client.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height: docHeight, scale: 1 },
    })
    const file = path.join(outDir, `en-post--${label}--full.png`)
    fs.writeFileSync(file, Buffer.from(data, 'base64'))
    console.log(`${path.basename(file)} — ${fs.statSync(file).size.toLocaleString()} bytes (높이 ${docHeight}px)`)
  }
}

await withChrome(PORT, async (client) => {
  if (mode === 'checks') await checks(client)
  else if (mode === 'capture') await capture(client)
  else throw new Error(`알 수 없는 모드: ${mode}`)
})

if (mode === 'checks') console.log(`\n검사 ${passes + failures}개 · 통과 ${passes} · 실패 ${failures}`)
process.exit(failures > 0 ? 1 : 0)
