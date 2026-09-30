/**
 * 프로그래머 06 — 영어 피드 ↔ 한국어 피드 정적 HTML 전수 대조.
 *
 * 사용: node docs/tools/programmer-06/feed-parity.mjs <.next/server/app> <사이트 URL(NEXT_PUBLIC_SITE_URL)>
 *
 * 기대값은 빌드 로더와 별도 경로로 만든다 — 영어본 id·제목은 `content/posts-en/*.md`를 gray-matter로 직접 읽는다.
 * 피드 페이지마다(한국어 `index.html`·`page/n.html` ↔ 영어 `en.html`·`en/page/n.html`):
 *   - 페이지 수 동일, 마지막 다음 페이지 파일 없음
 *   - 카드 수·id 순서 동일
 *   - 영어본 있는 카드: href `/en/post/{id}` · 제목 = 영어본 title · a/img에 lang 없음 · "Korean only" 없음
 *   - 영어본 없는 카드: href `/post/{id}` · a `lang="ko"`·`hrefLang="ko"` · 제목·이미지 alt = 한국어 카드와 같은 값 ·
 *     img `lang="ko"`(이미지 있을 때) · 플레이스홀더면 영어 UI 문구 · "Korean only" 표시 1개
 *   - 영어 피드 상단 안내(확정 문구) 1회 · 한국어 페이지 HTML 전체에 "Korean only" 0회
 *   - 건수 표시 · "Load more" 링크 · 목록 JSON-LD(ItemList url·name = 카드 href·제목)
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const [appDir, site] = process.argv.slice(2)
if (!appDir || !site) {
  console.error('사용: node feed-parity.mjs <.next/server/app> <사이트 URL>')
  process.exit(2)
}

const NOTICE = 'Posts marked &quot;Korean only&quot; have not been translated yet and open in Korean.'
const enTitles = new Map(
  fs
    .readdirSync('content/posts-en')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join('content/posts-en', f), 'utf8'))
      return [f.replace(/\.md$/, ''), String(data.title).trim()]
    }),
)

let pass = 0
let fail = 0
const fails = []
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else {
    fail += 1
    fails.push(`${label}${detail ? ` — ${detail}` : ''}`)
  }
}
const decode = (s) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) ?? [])[1]
const stripScripts = (html) => html.replace(/<script\b[\s\S]*?<\/script>/g, '')

function readCards(html) {
  const body = stripScripts(html)
  const grid = (body.match(/<ul class="grid[^"]*">([\s\S]*?)<\/ul>/) ?? [])[1] ?? ''
  return [...grid.matchAll(/<li class="flex">([\s\S]*?)<\/li>/g)].map(([, li]) => {
    const aTag = (li.match(/<a [^>]*>/) ?? [''])[0]
    const title = (li.match(/<a [^>]*>([\s\S]*?)<\/a>/) ?? [])[1]
    const imgTag = (li.match(/<img [^>]*>/) ?? [])[0]
    const placeholder = (li.match(/<div class="flex aspect-\[16\/9\][^"]*" role="img" aria-label="([^"]*)">[\s\S]*?<span[^>]*>([^<]*)<\/span>/) ?? []).slice(1)
    const href = attr(aTag, 'href')
    return {
      id: href?.replace(/^\/(en\/)?post\//, ''),
      href,
      aLang: attr(aTag, 'lang'),
      aHrefLang: attr(aTag, 'hrefLang'),
      title,
      img: imgTag ? { alt: attr(imgTag, 'alt'), lang: attr(imgTag, 'lang') } : null,
      placeholder: placeholder.length ? { label: placeholder[0], text: placeholder[1] } : null,
      badges: (li.match(/>Korean only</g) ?? []).length,
    }
  })
}

function itemList(html) {
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(json)
    if (data['@type'] === 'CollectionPage') return data.mainEntity.itemListElement
  }
  return null
}

const koPages = []
for (let n = 1; ; n += 1) {
  const file = n === 1 ? 'index.html' : `page/${n}.html`
  if (!fs.existsSync(path.join(appDir, file))) break
  koPages.push(file)
}
const enPages = []
for (let n = 1; ; n += 1) {
  const file = n === 1 ? 'en.html' : `en/page/${n}.html`
  if (!fs.existsSync(path.join(appDir, file))) break
  enPages.push(file)
}
const total = koPages.length
check('피드 페이지 수 한국어 = 영어', enPages.length === total, `ko ${total} · en ${enPages.length}`)
check('영어 마지막+1 페이지 파일 없음', !fs.existsSync(path.join(appDir, `en/page/${total + 1}.html`)))

let cardCount = 0
let translatedCount = 0
let koreanOnlyCount = 0
let koTotal = 0
for (let index = 0; index < total; index += 1) {
  const n = index + 1
  const koHtml = fs.readFileSync(path.join(appDir, koPages[index]), 'utf8')
  const enFile = enPages[index]
  if (!enFile) continue
  const enHtml = fs.readFileSync(path.join(appDir, enFile), 'utf8')
  const ko = readCards(koHtml)
  const en = readCards(enHtml)
  koTotal += ko.length
  const tag = `p${n}`

  check(`${tag} 카드 수 동일`, ko.length === en.length && ko.length > 0, `ko ${ko.length} · en ${en.length}`)
  check(`${tag} id 순서 동일`, JSON.stringify(ko.map((c) => c.id)) === JSON.stringify(en.map((c) => c.id)))
  check(`${tag} 한국어 페이지 HTML에 "Korean only" 0`, !/Korean only/.test(koHtml))
  check(`${tag} 한국어 카드 속성 불변(lang·hrefLang 없음, /post/)`, ko.every((c) => !c.aLang && !c.aHrefLang && c.href === `/post/${c.id}` && (!c.img || !c.img.lang)))
  check(`${tag} 영어 안내 1회`, stripScripts(enHtml).split(NOTICE).length - 1 === 1)
  check(`${tag} 한국어 안내 없음`, !koHtml.includes('have not been translated yet'))

  const koCount = (koHtml.match(/전체 (\d+)건 · (\d+) \/ (\d+) 페이지/) ?? []).slice(1).map(Number)
  const enCount = (enHtml.match(/(\d+) posts? · Page (\d+) of (\d+)/) ?? []).slice(1).map(Number)
  check(`${tag} 건수 표시 일치`, koCount.length === 3 && JSON.stringify(koCount) === JSON.stringify(enCount), `${koCount} / ${enCount}`)

  const loadMore = (stripScripts(enHtml).match(/<a [^>]*href="(\/en\?page=\d+)"[^>]*>Load more/) ?? [])[1]
  check(`${tag} Load more`, n < total ? loadMore === `/en?page=${n + 1}` : loadMore === undefined, String(loadMore))

  en.forEach((card, i) => {
    cardCount += 1
    const koCard = ko[i]
    const label = `${tag}#${i + 1} ${card.id}`
    if (enTitles.has(card.id)) {
      translatedCount += 1
      check(`${label} 영어 카드 href`, card.href === `/en/post/${card.id}`, card.href)
      check(`${label} 영어 카드 lang 없음`, !card.aLang && !card.aHrefLang && (!card.img || !card.img.lang))
      check(`${label} 영어 제목 = 영어본`, decode(card.title ?? '') === enTitles.get(card.id), card.title)
      check(`${label} Korean only 없음`, card.badges === 0)
    } else {
      koreanOnlyCount += 1
      check(`${label} href /post/`, card.href === `/post/${card.id}`, card.href)
      check(`${label} a lang=ko hrefLang=ko`, card.aLang === 'ko' && card.aHrefLang === 'ko', `${card.aLang}/${card.aHrefLang}`)
      check(`${label} 제목 = 한국어 카드`, card.title === koCard?.title)
      check(`${label} Korean only 1개`, card.badges === 1)
      if (card.img) {
        check(`${label} img alt = 한국어 카드 · lang=ko`, card.img.alt === koCard?.img?.alt && card.img.lang === 'ko', `${card.img.lang}`)
      } else {
        check(`${label} 플레이스홀더 영어 UI 문구`, card.placeholder?.text === 'No image' && koCard?.placeholder?.text === '이미지 없음', JSON.stringify(card.placeholder))
      }
    }
  })

  const items = itemList(enHtml)
  check(
    `${tag} JSON-LD ItemList = 카드 href·제목`,
    Array.isArray(items) &&
      items.length === en.length &&
      items.every((item, i) => item.url === site + en[i].href && item.name === decode(en[i].title ?? '') && item.position === i + 1),
  )
  const koItems = itemList(koHtml)
  check(`${tag} 한국어 JSON-LD ItemList = /post/`, Array.isArray(koItems) && koItems.every((item, i) => item.url === `${site}/post/${ko[i].id}`))
}

const enPostFiles = fs.existsSync(path.join(appDir, 'en/post'))
  ? fs.readdirSync(path.join(appDir, 'en/post')).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, ''))
  : []
check('영어 상세 HTML = 영어본 id', JSON.stringify(enPostFiles.sort()) === JSON.stringify([...enTitles.keys()].sort()), `${enPostFiles.length} / ${enTitles.size}`)

console.log(`피드 페이지 ko ${koPages.length} · en ${enPages.length} · 한국어 카드 ${koTotal} · 영어 카드 ${cardCount}(영어본 ${translatedCount} · Korean only ${koreanOnlyCount}) · 영어본 id ${enTitles.size}`)
console.log(`검사 ${pass + fail}개 · 통과 ${pass} · 실패 ${fail}`)
for (const line of fails.slice(0, 40)) console.log(`FAIL ${line}`)
process.exit(fail ? 1 : 0)
