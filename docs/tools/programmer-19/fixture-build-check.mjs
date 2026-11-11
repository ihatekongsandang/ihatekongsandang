/**
 * 프로그래머 19 — open(A-2) fixture 빌드 결과 전수 검사.
 *
 * 사용: node docs/tools/programmer-19/fixture-build-check.mjs <fixture 사본 루트>
 *   fixture 사본 = 작업 트리 사본(저장소 밖) + `fixture-setup.py`가 만든 임시 게시물 5건(ko)·영어본 2건 + 임시 이미지 5장,
 *   `NEXT_PUBLIC_SITE_URL=https://site.example.com npm run build` 뒤.
 * 확인:
 *  1. 상세 figcaption(ko·en): 첫 줄 = 사진 설명, 둘째 줄 = 정책 §4.5-11 서식 글자 그대로, creditNotice 줄
 *  2. 상세 <head>: og:image·twitter:image가 저장 사진(/images/p19-fx…)이 아님, JSON-LD에 사진 경로·사진 설명·저작자 0
 *  3. sitemap.xml·robots·llms.txt에 /images/ 0
 *  4. 빌드 산출물 .html·.rsc 전수: 사진 설명 글자가 나오는 파일 = 그 게시물 상세(ko·en)뿐, 크레딧 글자도 상세뿐
 *  5. 홈 카드: 기증(kcc-donated)은 <img src="/images/…">(최적화 없음), 그 밖 open은 /_next/image, 카드에 크레딧·설명 0
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.argv[2]
if (!ROOT) {
  console.error('사용: node fixture-build-check.mjs <fixture 루트>')
  process.exit(2)
}
const APP = path.join(ROOT, '.next', 'server', 'app')
let total = 0
let fail = 0
function check(label, ok, detail = '') {
  total += 1
  if (!ok) fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok || !detail ? '' : ` — ${detail}`}`)
}
const read = (rel) => fs.readFileSync(path.join(APP, rel), 'utf8')
const decode = (s) =>
  s
    .replace(/<!-- -->/g, '')
    .replace(/<span class="sr-only">[\s\S]*?<\/span>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')

const CASES = [
  {
    id: 'p19-fx-a-ccby',
    ko: {
      caption: '자료사진: 예시 청사(2019) — 이 사건 당시 사진이 아닙니다.',
      credit: '사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY 4.0 · 원 페이지 · 라이선스',
      notice: '© 예시 작가 — 보증 없이 제공',
    },
    en: {
      caption: 'Archive photo: the Example Government Complex (2019) — not taken at the time of this event.',
      credit: 'Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY 4.0 · Original · License',
      notice: '© 예시 작가 — 보증 없이 제공',
    },
    hrefs: ['https://archive.example.org/photo/view/100', 'https://creativecommons.org/licenses/by/4.0/'],
    unoptimized: false,
  },
  {
    id: 'p19-fx-b-donated',
    ko: {
      caption: '자료사진: 예시 철책(촬영 연도 미상) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.',
      credit: '사진: 예시 기증 작가, 「예시 철책」, 기증 예시 기증자, 공유마당 / CC BY 4.0 · 원 페이지 · 라이선스',
    },
    en: {
      caption: 'Archive photo: an example fence (year unknown) — not taken at the time of this event. It may differ from how it looks today.',
      credit: 'Photo: Example Donor Author, "예시 철책", donated by 예시 기증자, Gongu Madang / CC BY 4.0 · Original · License',
    },
    hrefs: ['https://archive.example.org/photo/view/200', 'https://creativecommons.org/licenses/by/4.0/'],
    unoptimized: true,
  },
  ...['c', 'd', 'e'].map((n) => ({
    id: `p19-fx-${n}-cc0`,
    ko: {
      caption: '자료사진: 예시 건물(2020) — 이 사건 당시 사진이 아닙니다.',
      credit: '사진: 예시 기관(CC0 1.0 — 저작권 포기) · 원 페이지 · 라이선스',
    },
    hrefs: ['https://archive.example.org/photo/view/100', 'https://creativecommons.org/publicdomain/zero/1.0/'],
    unoptimized: false,
  })),
]

// 전수 대상 파일
const allFiles = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(html|rsc|body)$/.test(entry.name)) allFiles.push(full)
  }
})(APP)
console.log(`빌드 산출물 .html·.rsc·.body ${allFiles.length}개`)
const contents = new Map(allFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]))

for (const c of CASES) {
  for (const locale of ['ko', 'en']) {
    const exp = c[locale]
    if (!exp) continue
    const rel = locale === 'ko' ? `post/${c.id}.html` : `en/post/${c.id}.html`
    const html = read(rel)
    const fig = html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
    const ps = [...fig.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => m[1])
    check(`${rel}: figcaption 첫 줄 = 사진 설명`, decode(ps[0] ?? '') === exp.caption, decode(ps[0] ?? ''))
    check(`${rel}: 둘째 줄 = 크레딧 서식 그대로`, decode(ps[1] ?? '') === exp.credit, `\n   exp=${exp.credit}\n   got=${decode(ps[1] ?? '')}`)
    check(`${rel}: creditNotice 줄 ${exp.notice ? '있음' : '없음'}`, exp.notice ? decode(ps[2] ?? '') === exp.notice && ps.length === 3 : ps.length === 2, JSON.stringify(ps.map(decode)))
    const hrefs = [...(ps[1] ?? '').matchAll(/<a [^>]*href="([^"]*)"[^>]*>/g)].map((m) => m[1])
    check(`${rel}: 링크 href`, JSON.stringify(hrefs) === JSON.stringify(c.hrefs), JSON.stringify(hrefs))
    const rels = [...(ps[1] ?? '').matchAll(/<a [^>]*rel="([^"]*)"[^>]*>/g)].map((m) => m[1])
    check(`${rel}: 링크 rel = noopener 전부`, rels.length === c.hrefs.length && rels.every((r) => r === 'noopener'), JSON.stringify(rels))
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0] ?? ''
    const ogImages = [...head.matchAll(/<meta (?:property|name)="(?:og:image|twitter:image)"[^>]*content="([^"]*)"/g)].map((m) => m[1])
    check(`${rel}: og:image·twitter:image 있음, 저장 사진 아님`, ogImages.length > 0 && ogImages.every((u) => !u.includes('/images/')), JSON.stringify(ogImages))
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n')
    check(`${rel}: JSON-LD 있음`, ld.length > 0)
    check(`${rel}: JSON-LD에 사진 경로·사진 설명·저작자 0`, !ld.includes('/images/') && !ld.includes(exp.caption) && !/예시 (기증 )?작가|Example (Donor )?Author|예시 기관/.test(ld), ld.slice(0, 200))
    const imgs = [...html.matchAll(/<img [^>]*>/g)].map((m) => m[0])
    const own = imgs.find((tag) => tag.includes(encodeURIComponent(`/images/${c.id}/`)) || tag.includes(`/images/${c.id}/`))
    check(`${rel}: 상세 사진 ${c.unoptimized ? 'src = 저장 파일 그대로(최적화 없음)' : '/_next/image 최적화'}`, !!own && (c.unoptimized ? /src="\/images\//.test(own) && !own.includes('_next/image') && !/srcset/i.test(own) : own.includes('/_next/image?url=')), own ?? 'img 없음')
  }
  // 전수: 사진 설명·크레딧 글자가 나오는 파일 = 그 게시물 상세뿐.
  // c·d·e는 같은 원본 반복 경고를 재현하려고 사진 설명·크레딧이 같은 fixture라, 같은 글자를 쓰는 fixture의 상세는 서로 허용한다.
  // 홈·태그 등 목록 페이지의 .html·.rsc는 **화면 글자에도 RSC 페이로드에도** 사진 설명이 없어야 한다(아래 5는 크레딧 페이로드를 따로 기록).
  const sameText = CASES.filter((other) => other.ko.caption === c.ko.caption).map((other) => other.id)
  const allowed = new Set(
    sameText.flatMap((id) => [
      path.join(APP, 'post', `${id}.html`),
      path.join(APP, 'post', `${id}.rsc`),
      path.join(APP, 'en', 'post', `${id}.html`),
      path.join(APP, 'en', 'post', `${id}.rsc`),
    ]),
  )
  for (const [label, needle] of [
    ['ko 사진 설명', c.ko.caption],
    ['ko 크레딧 줄(화면 글자)', c.ko.credit.split(' · 원 페이지')[0].replace(/^사진: /, '')],
    ...(c.en ? [['en 사진 설명', c.en.caption]] : []),
  ]) {
    const where = [...contents].filter(([, text]) => decode(text).includes(needle) || text.includes(needle)).map(([file]) => file)
    const outside = where.filter((file) => !allowed.has(file))
    check(`${c.id} ${label}: 나오는 파일 ${where.length}개 — 전부 그 상세(.html·.rsc)`, where.length > 0 && outside.length === 0, outside.map((f) => path.relative(APP, f)).join(', '))
  }
}

// 사이트맵·robots·llms.txt
for (const rel of ['sitemap.xml.body', 'robots.txt.body', 'llms.txt.body']) {
  const file = path.join(APP, rel)
  if (!fs.existsSync(file)) {
    check(`${rel} 있음`, false)
    continue
  }
  const text = fs.readFileSync(file, 'utf8')
  check(`${rel}: /images/ 0`, !text.includes('/images/'), String((text.match(/\/images\//g) ?? []).length))
}
{
  const sitemap = fs.readFileSync(path.join(APP, 'sitemap.xml.body'), 'utf8')
  check('sitemap.xml: fixture 상세 5건 주소는 있음(상세는 정상 등재)', ['a-ccby', 'b-donated', 'c-cc0', 'd-cc0', 'e-cc0'].every((n) => sitemap.includes(`/post/p19-fx-${n}`)))
  check('sitemap.xml: <image:image> 0', !sitemap.includes('image:image'))
}

// 홈 카드
for (const rel of ['index.html', 'en.html']) {
  const html = read(rel)
  for (const c of CASES) {
    const card = [...html.matchAll(/<img [^>]*>/g)].map((m) => m[0]).find((tag) => tag.includes(`/images/${c.id}/`) || tag.includes(encodeURIComponent(`/images/${c.id}/`)))
    check(`${rel} ${c.id}: 카드 이미지 있음`, !!card)
    if (!card) continue
    if (c.unoptimized) check(`${rel} ${c.id}: 카드 src = 저장 파일 그대로, srcset 없음`, /src="\/images\//.test(card) && !card.includes('_next/image') && !/srcset/i.test(card), card)
    else check(`${rel} ${c.id}: 카드 /_next/image`, card.includes('/_next/image?url='), card)
  }
  // 화면 글자(스크립트 제외) 기준. 카드 데이터의 RSC 페이로드에는 media.credit 객체가 실린다 — 프로그래머 13부터 news도 같은
  // 기존 동작이라(실제 빌드 index.html에 news credit 1건) 이번에 바꾸지 않고 개수만 기록한다(트리거 확인 필요).
  const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, ' '))
  check(`${rel}: 카드 화면 글자에 크레딧·라이선스·사진 설명 0`, !/CC BY 4\.0|CC0 1\.0|공유마당|Gongu Madang|예시 (기증 )?작가|Example (Donor )?Author|자료사진:|Archive photo:/.test(text))
  check(`${rel}: 카드 RSC 페이로드에도 사진 설명 0`, !CASES.some((c) => html.includes(c.ko.caption) || (c.en && html.includes(c.en.caption))))
  const payloadCredits = (html.match(/\\"credit\\":\{\\"kind\\":\\"open/g) ?? []).length
  console.log(`INFO  ${rel}: 카드 RSC 페이로드의 open credit 객체 ${payloadCredits}개(화면 비노출 — 기존 news와 같은 동작)`)
}

console.log(`\n${total - fail}/${total} PASS`)
process.exit(fail ? 1 : 0)
