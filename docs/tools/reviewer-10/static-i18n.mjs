/**
 * 리뷰어 10 — 빌드 산출 HTML 전수 정적 검사(언어·canonical·hreflang 양방향·언어 전환 링크·배너·OG).
 *
 * 사용: node docs/tools/reviewer-10/static-i18n.mjs <.next/server/app> <사이트 URL(NEXT_PUBLIC_SITE_URL)>
 * 영어본 id 목록은 content/posts-en/*.md 파일명에서 읽는다(빌드 로더와 별도 경로로 기대값을 만든다).
 */
import fs from 'node:fs'
import path from 'node:path'

const [appDir, site] = process.argv.slice(2)
const enIds = new Set(fs.readdirSync('content/posts-en').filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')))
const files = []
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) files.push(path.relative(appDir, f)) } }
walk(appDir)
files.sort()

/** 공개 URL 형태: `/page/n` → `/?page=n`, `/tag/x/page/n` → `/tag/x?page=n`, 태그는 퍼센트 인코딩, 홈은 빈 경로. */
const publicPath = (p) => {
  if (p === '/') return ''
  let m = p.match(/^\/page\/(\d+)$/)
  if (m) return `/?page=${m[1]}`
  m = p.match(/^\/tag\/([^/]+)\/page\/(\d+)$/)
  if (m) return `/tag/${encodeURIComponent(m[1])}?page=${m[2]}`
  m = p.match(/^\/tag\/([^/]+)$/)
  if (m) return `/tag/${encodeURIComponent(m[1])}`
  m = p.match(/^\/en\/page\/(\d+)$/)
  if (m) return `/en?page=${m[1]}`
  return p
}
const toPath = (f) => {
  const p = '/' + f.replace(/\.html$/, '').replace(/(^|\/)index$/, '')
  return p === '/index' ? '/' : p
}
let pass = 0, fail = 0
const fails = []
const check = (label, ok, detail = '') => { if (ok) pass++; else { fail++; fails.push(`${label}${detail ? ' — ' + detail : ''}`) } }
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) ?? [])[1]
const pageAlternates = new Map()
const stats = { ko: 0, en: 0, notFound: 0 }

for (const f of files) {
  const html = fs.readFileSync(path.join(appDir, f), 'utf8')
  const p = f === '_not-found.html' ? null : toPath(f)
  const isEn = p !== null && (p === '/en' || p.startsWith('/en/'))
  const locale = isEn ? 'en' : 'ko'
  stats[p === null ? 'notFound' : locale]++
  const head = html.slice(0, html.indexOf('</head>'))
  // 1) <html lang>
  check(`${f} lang`, (html.match(/^<!DOCTYPE html>(?:<!--[^>]*-->)?<html lang="([a-z]+)"/) ?? [])[1] === locale)
  // 2) canonical — 404 제외 모두 1개·자기 자신
  const canon = [...head.matchAll(/<link rel="canonical" href="([^"]*)"\/>/g)].map((m) => m[1])
  if (p !== null) check(`${f} canonical`, canon.length === 1 && canon[0] === site + publicPath(p), JSON.stringify(canon))
  // 3) hreflang 수집
  const alts = Object.fromEntries([...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]*)"\/>/g)].map((m) => [m[1], m[2]]))
  if (p !== null) pageAlternates.set(site + publicPath(p), alts)
  // 4) 기대 짝
  let pair = null
  if (p === '/' || p === '/en') pair = ['/', '/en']
  else if (p === '/about' || p === '/en/about') pair = ['/about', '/en/about']
  else if (p?.startsWith('/post/') && enIds.has(p.slice(6))) pair = [p, '/en' + p]
  else if (p?.startsWith('/en/post/')) pair = [p.slice(3), p]
  if (p !== null) {
    if (pair) {
      check(`${f} hreflang`, alts.ko === site + publicPath(pair[0]) && alts.en === site + pair[1] && alts['x-default'] === alts.ko && Object.keys(alts).length === 3, JSON.stringify(alts))
    } else check(`${f} hreflang 없음`, Object.keys(alts).length === 0, JSON.stringify(alts))
  } else check(`${f} 404 hreflang 없음`, Object.keys(alts).length === 0)
  // 5) 언어 전환 nav — 링크 두 개, 현재 언어 aria-current, 상대 언어 목적지
  const nav = (html.match(/<nav aria-label="(?:언어 선택|Language)"[\s\S]*?<\/nav>/) ?? [])[0]
  check(`${f} 언어 nav`, Boolean(nav))
  if (nav) {
    const links = [...nav.matchAll(/<(?:a|span) [^>]*lang="(?:ko|en)"[^>]*>(?:한국어|English)<\/(?:a|span)>/g)].map((m) => m[0])
    const ko = links.find((l) => />한국어</.test(l)), en = links.find((l) => />English</.test(l))
    let expectKo, expectEn
    if (p === null) { expectKo = '/'; expectEn = '/en' }
    else if (pair) { [expectKo, expectEn] = pair }
    else if (isEn) { expectKo = '/'; expectEn = p } // /en/page/n 등
    else { expectKo = p; expectEn = '/en' }
    if (isEn && p.startsWith('/en/page/')) expectEn = null
    // 현재 언어는 링크가 아닌 aria-current span, 상대 언어는 lang·hrefLang 달린 링크
    const other = locale === 'ko' ? en : ko, self = locale === 'ko' ? ko : en
    const expectOther = locale === 'ko' ? expectEn : expectKo
    check(`${f} 현재 언어 span aria-current`, Boolean(self) && self.startsWith('<span') && /aria-current="true"/.test(self) && attr(self, 'lang') === locale, self)
    check(`${f} 상대 언어 링크`, Boolean(other) && other.startsWith('<a') && attr(other, 'href') === expectOther && attr(other, 'lang') === (locale === 'ko' ? 'en' : 'ko') && attr(other, 'hrefLang') === attr(other, 'lang'), other)
  }
  // 6) 배너
  const banner = (html.match(/<aside aria-label="외부 링크 안내"/g) ?? []).length
  const htmlClass = (html.match(/^<!DOCTYPE html>(?:<!--[^>]*-->)?<html [^>]*?class="([^"]*)"/) ?? [])[1]
  if (isEn) {
    check(`${f} 배너 없음`, banner === 0 && !/signforkorea/.test(html.replace(/<script[\s\S]*?<\/script>/g, '')))
    check(`${f} html class 없음`, htmlClass === undefined, htmlClass)
    check(`${f} 여백 클래스 없음`, !/pb-\[calc\(5\.5rem|pr-14/.test(html.replace(/<script[\s\S]*?<\/script>/g, '')))
  } else {
    check(`${f} 배너 1개`, banner === 1)
    check(`${f} scroll-pb class`, /scroll-pb-\[calc\(5\.5rem\+env\(safe-area-inset-bottom\)\)\]/.test(htmlClass ?? ''), htmlClass)
  }
  // 7) 상세 상대 언어 링크
  if (p?.startsWith('/post/')) {
    const has = /Read in English</.test(html)
    check(`${f} Read in English ${enIds.has(p.slice(6)) ? '있음' : '없음'}`, has === enIds.has(p.slice(6)))
  }
  if (p?.startsWith('/en/post/')) {
    check(`${f} 한국어 원문 보기`, new RegExp(`<a [^>]*href="${p.slice(3)}"[^>]*>한국어 원문 보기`).test(html) || new RegExp(`href="${p.slice(3)}"[^>]*>[^<]*한국어 원문 보기`).test(html))
    check(`${f} og:locale en_US`, /<meta property="og:locale" content="en_US"\/>/.test(head))
    check(`${f} og:image 자체`, /<meta property="og:image" content="[^"]*\/en\/opengraph-image/.test(head), (head.match(/og:image" content="([^"]*)"/) ?? [])[1])
    check(`${f} Translated from the Korean original.`, /Translated from the Korean original\./.test(html))
    check(`${f} Sources are in Korean.`, /Sources are in Korean\./.test(html))
    check(`${f} 태그 칩 없음`, !/href="\/tag\//.test(html.replace(/<script[\s\S]*?<\/script>/g, '')))
  }
}
// 8) hreflang 양방향 — 각 alternates의 대상 페이지가 같은 묶음을 갖는가
let reciprocal = 0
for (const [url, alts] of pageAlternates) {
  if (Object.keys(alts).length === 0) continue
  for (const target of [alts.ko, alts.en]) {
    const back = pageAlternates.get(target)
    check(`양방향 ${url} → ${target}`, back && JSON.stringify(back) === JSON.stringify(alts))
    reciprocal++
  }
}
console.log(`HTML ${files.length}개 (ko ${stats.ko} · en ${stats.en} · 404 ${stats.notFound}) · 영어본 id ${enIds.size}개`)
console.log(`양방향 확인 ${reciprocal}건`)
console.log(`검사 ${pass + fail}개 · 통과 ${pass} · 실패 ${fail}`)
for (const x of fails.slice(0, 40)) console.log('FAIL ' + x)
process.exit(fail ? 1 : 0)
