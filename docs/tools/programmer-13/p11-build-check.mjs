/**
 * (프로그래머 14 갱신: 상세 개편으로 figcaption 마크업이 `<figcaption data-credit>`가 되고 링크 문구가 보강안 목업 문구 — 언론 "기사 원문", 공공누리 "원문 페이지"/"Source page" — 로 바뀌어 기대값만 맞췄다. 검사 항목 수는 같다.)
 * 프로그래머 13 — 픽스처 포함 빌드 결과 검사(`p11-build-check.sh`가 부른다).
 * 사용: node p11-build-check.mjs <.next/server/app 경로>
 *
 * 전수: 빌드된 HTML 전부·sitemap.xml·RSC(.rsc) 전부에서 픽스처 이미지 주소(news 핫링크·public 저장 경로)가 나오는 자리를 센다.
 *  - 허용되는 자리: 픽스처 상세(ko·en)와 피드 카드의 <img>/next-image, RSC 데이터(카드 media)
 *  - 금지: 어떤 페이지의 og:image·twitter:image 메타, 어떤 JSON-LD 블록, sitemap.xml
 * 그리고 픽스처 상세에서 figcaption·링크·<img> 직접 참조·referrerpolicy 부재를 확인한다.
 */
import fs from 'node:fs'
import path from 'node:path'

const dir = process.argv[2]
const NEWS_SRC = 'https://img.example.org/og/fixture-news.jpg'
const PUBLIC_SRC = '/images/zz-fixture-public-image/thumb.jpg'
const ARTICLE = 'https://news.example.org/article/fixture'
const SITE = 'https://site.example.com'

let pass = 0
let fail = 0
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

function walk(root) {
  const out = []
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}
const files = walk(dir)
const html = files.filter((f) => f.endsWith('.html'))
const rsc = files.filter((f) => f.endsWith('.rsc'))
const rel = (f) => path.relative(dir, f)
console.log(`검사 대상: HTML ${html.length}개 · RSC ${rsc.length}개 · sitemap ${files.filter((f) => /sitemap\.xml\.body$/.test(f)).length}개`)

const needles = [NEWS_SRC, PUBLIC_SRC, encodeURIComponent(PUBLIC_SRC)]
let metaLeak = 0
let jsonLdLeak = 0
let jsonLdImageKey = 0
let jsonLdBlocks = 0
let ogMetaCount = 0
let ogNotOwn = 0
const pagesWithNews = []
for (const file of html) {
  const text = fs.readFileSync(file, 'utf8')
  for (const meta of text.match(/<meta [^>]*(?:property|name)="(?:og:image|twitter:image)[^"]*"[^>]*>/g) ?? []) {
    ogMetaCount += 1
    if (needles.some((n) => meta.includes(n)) || meta.includes('example.org')) metaLeak += 1
    const content = meta.match(/content="([^"]*)"/)?.[1] ?? ''
    if (/(?:og|twitter):image"/.test(meta) && !content.startsWith(`${SITE}/`)) ogNotOwn += 1
  }
  for (const block of text.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) ?? []) {
    jsonLdBlocks += 1
    if (needles.some((n) => block.includes(n)) || block.includes('img.example.org')) jsonLdLeak += 1
    if (/"image"\s*:/.test(block)) jsonLdImageKey += 1
  }
  if (text.includes(NEWS_SRC)) pagesWithNews.push(rel(file))
}
check(`og:image·twitter:image 메타 ${ogMetaCount}개 중 픽스처 이미지 0`, metaLeak === 0, `${metaLeak}`)
check(`og:image·twitter:image 메타 전부 사이트 자체 주소(${SITE}/…)`, ogNotOwn === 0 && ogMetaCount > 0, `자체 아님 ${ogNotOwn}`)
check(`JSON-LD 블록 ${jsonLdBlocks}개 중 픽스처 이미지 0`, jsonLdLeak === 0, `${jsonLdLeak}`)
check(`JSON-LD 블록 ${jsonLdBlocks}개 중 image 키 0`, jsonLdImageKey === 0, `${jsonLdImageKey}`)

const sitemapFile = files.find((f) => /sitemap\.xml\.body$/.test(f))
const sitemap = sitemapFile ? fs.readFileSync(sitemapFile, 'utf8') : ''
check('sitemap.xml 존재', sitemap.length > 0)
check('sitemap.xml에 픽스처 상세 주소 있음(양성 대조)', sitemap.includes(`${SITE}/post/zz-fixture-news-image`))
check('sitemap.xml에 픽스처 이미지·image:image 0', !needles.some((n) => sitemap.includes(n)) && !sitemap.includes('example.org') && !sitemap.includes('image:image'))

console.log(`news 핫링크 주소가 나오는 HTML ${pagesWithNews.length}개: ${pagesWithNews.join(', ')}`)

function page(p) {
  return fs.readFileSync(path.join(dir, p), 'utf8')
}
function caption(text) {
  return (text.match(/<figcaption data-credit=""[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? '')
}
const strip = (s) => s.replace(/<[^>]+>/g, '')

const koNews = page('post/zz-fixture-news-image.html')
check('상세 ko news: <img src=핫링크> 직접 참조', /<img [^>]*src="https:\/\/img\.example\.org\/og\/fixture-news\.jpg"/.test(koNews))
check('상세 ko news: _next/image 경유 0', !koNews.includes(`/_next/image?url=${encodeURIComponent(NEWS_SRC)}`))
check('상세 ko news: referrerpolicy 속성 0', !/referrerpolicy/i.test(koNews))
check('상세 ko news: figcaption "사진: 예시일보 · 기사 원문"', strip(caption(koNews)).startsWith('사진: 예시일보 · 기사 원문'), strip(caption(koNews)))
check('상세 ko news: 링크 href·target·rel', caption(koNews).includes(`href="${ARTICLE}" target="_blank" rel="noopener"`))
check('상세 ko news: og:image = 자체 이미지', /<meta property="og:image" content="https:\/\/site\.example\.com\/opengraph-image/.test(koNews))
const enNews = page('en/post/zz-fixture-news-image.html')
check('상세 en news: "Photo: Example Daily · Source article"', strip(caption(enNews)).startsWith('Photo: Example Daily · Source article'), strip(caption(enNews)))
check('상세 en news: og:image = 자체 영어 이미지', /<meta property="og:image" content="https:\/\/site\.example\.com\/en\/opengraph-image/.test(enNews))
const koPublic = page('post/zz-fixture-public-image.html')
check('상세 ko public: "사진: 예시부(공공누리 제1유형)" + 공식 문구 요지', strip(caption(koPublic)).startsWith('사진: 예시부(공공누리 제1유형) · 원문 페이지') && strip(caption(koPublic)).includes('공공누리 제1유형으로 개방한 저작물을 이용하였습니다.'), strip(caption(koPublic)))
const enPublic = page('en/post/zz-fixture-public-image.html')
check('상세 en public: "Photo: Ministry of Example (KOGL Type 1)"', strip(caption(enPublic)).startsWith('Photo: Ministry of Example (KOGL Type 1) · Source page'), strip(caption(enPublic)))

// 카드(피드 1페이지 — 픽스처가 가장 최신이라 맨 앞): 이미지는 나오고 크레딧 문구는 없다
const home = page('index.html')
check('피드 ko: 카드에 news 핫링크 <img>', home.includes(`src="${NEWS_SRC}"`))
check('피드 ko: 카드에 크레딧 문구 0(카드 UI 불변)', !home.includes('사진: 예시일보') && !home.includes('기사 원문'))
const enHome = page('en.html')
check('피드 en: 카드에 news 핫링크 <img>', enHome.includes(`src="${NEWS_SRC}"`))
check('피드 en: 카드에 크레딧 문구 0', !enHome.includes('Photo: Example Daily'))

// self 게시물 상세(기존 207건 대표): 크레딧 figcaption 없음
const selfFiles = html.filter((f) => /\/post\/[^/]+\.html$/.test(f) && !f.includes('zz-fixture'))
const selfWithCaption = selfFiles.filter((f) => fs.readFileSync(f, 'utf8').includes('<figcaption data-credit'))
check(`기존 상세 ${selfFiles.length}개(ko+en) 크레딧 figcaption 0`, selfWithCaption.length === 0, selfWithCaption.slice(0, 3).join(','))

console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fail > 0) process.exit(1)
