/**
 * 프로그래머 07 — WebSite JSON-LD `alternateName` 실측.
 *
 * 사용: node docs/tools/programmer-07/jsonld-website.mjs <작업 app 폴더>
 *
 * 1. 한국어 메인(`index.html`)·영어 메인(`en.html`)의 WebSite JSON-LD를 파싱해 그대로 출력하고 기대값과 비교한다.
 * 2. 빌드 HTML 전수: `<script type="application/ld+json">` 블록이 모두 JSON으로 파싱되는지, 최상위 WebSite 블록이 파일마다 1개이고
 *    `alternateName`이 그 언어 기대값과 같은지(한국어·404 ↔ 영어 `en/**`). 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'

const [dir] = process.argv.slice(2)
if (!dir) {
  console.error('사용: node jsonld-website.mjs <app 폴더>')
  process.exit(2)
}
const EXPECTED = {
  ko: { name: '공산당이싫어요', alternateName: ['공산당이 싫어요', 'ihatekongsandang'] },
  en: {
    name: '공산당이싫어요 (Korea Politics & Security Brief)',
    alternateName: ['공산당이싫어요', '공산당이 싫어요', 'Korea Politics & Security Brief', 'ihatekongsandang'],
  },
}
const isEnglish = (file) => /^en(?:\.html$|\/)/.test(file)
const files = []
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f)
    else if (e.name.endsWith('.html')) files.push(path.relative(dir, f))
  }
}
walk(dir)
files.sort()

const fails = []
let blocks = 0
const websiteOf = (file) => {
  const html = fs.readFileSync(path.join(dir, file), 'utf8')
  const parsed = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    blocks += 1
    try {
      return JSON.parse(m[1])
    } catch (error) {
      fails.push(`${file}: JSON-LD 파싱 실패 ${error.message}`)
      return null
    }
  })
  return parsed.filter((block) => block && block['@type'] === 'WebSite')
}

for (const main of ['index.html', 'en.html']) {
  const lang = main === 'en.html' ? 'en' : 'ko'
  const [site] = websiteOf(main)
  console.log(`[${main}] ${JSON.stringify(site, null, 2)}`)
  if (!site || site.name !== EXPECTED[lang].name || JSON.stringify(site.alternateName) !== JSON.stringify(EXPECTED[lang].alternateName))
    fails.push(`${main}: 기대값과 다르다`)
}

const counts = { ko: 0, en: 0 }
blocks = 0
for (const file of files) {
  const lang = isEnglish(file) ? 'en' : 'ko'
  const sites = websiteOf(file)
  if (sites.length !== 1) {
    fails.push(`${file}: 최상위 WebSite 블록 ${sites.length}개`)
    continue
  }
  if (JSON.stringify(sites[0].alternateName) !== JSON.stringify(EXPECTED[lang].alternateName)) fails.push(`${file}: alternateName 다름`)
  else counts[lang] += 1
}
console.log(`HTML ${files.length}개 · JSON-LD 블록 ${blocks}개 파싱 · WebSite alternateName 일치 — 한국어·404 ${counts.ko} · 영어 ${counts.en}`)
for (const f of fails.slice(0, 30)) console.log(`FAIL ${f}`)
console.log(`실패 ${fails.length}건`)
process.exit(fails.length ? 1 : 0)
