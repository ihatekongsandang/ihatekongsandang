// 프로그래머 20 — 실제 빌드 산출물(.next/server/app) 전수 회귀 검사(명세 12 ⑨·⑩).
// 실행(저장소 루트, `npm run build` 뒤): node docs/tools/programmer-20/build-artifact-check.mjs [server/app 경로]
//  ⑩ sitemap.xml·robots.txt·llms.txt에 `/images/` 0 · 모든 .html의 og:image·twitter:image에 `/images/` 0 ·
//     모든 .html의 JSON-LD(<script type="application/ld+json">)에 `/images/` 0
//  ⑨ 상세(`post/…`, `en/post/…`)가 아닌 모든 페이지(.html·.rsc — 홈·목록·태그 카드)에 사진 크레딧 필드 이름 0
//     (`creditName`·`creditNameEn`·`sourcePageUrl`·`licenseUrl`·`creditNotice`·`"credit":`)
//  참고: 상세 페이지는 크레딧을 화면에 그리므로 검사 대상이 아니다. 상세에 크레딧이 실제로 나오는지는 표본 수로 기록한다.
import fs from 'node:fs'
import path from 'node:path'

const APP = process.argv[2] ?? '.next/server/app'
const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else files.push(full)
  }
}
walk(APP)

let checks = 0
const failures = []
const check = (name, ok) => {
  checks += 1
  if (!ok) failures.push(name)
}
const rel = (file) => path.relative(APP, file)
const isDetail = (file) => /^(\(ko\)\/|\(en\)\/)?(en\/)?post\//.test(rel(file))

const htmlFiles = files.filter((file) => file.endsWith('.html'))
const rscFiles = files.filter((file) => file.endsWith('.rsc'))
const textBodies = files.filter((file) => /(sitemap\.xml|robots\.txt|llms\.txt)\.body$/.test(file))

for (const file of textBodies) check(`⑩ ${rel(file)}: /images/ 0`, !fs.readFileSync(file, 'utf8').includes('/images/'))

let ogTags = 0
let jsonLdBlocks = 0
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  const metas = [...html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)[^"]*"[^>]*>/g)].map((m) => m[0])
  ogTags += metas.length
  check(`⑩ ${rel(file)}: og:image·twitter:image에 /images/ 0`, metas.every((tag) => !tag.includes('/images/')))
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  jsonLdBlocks += blocks.length
  check(`⑩ ${rel(file)}: JSON-LD에 /images/ 0`, blocks.every((block) => !block.includes('/images/')))
}

const CREDIT_KEYS = ['creditName', 'creditNameEn', 'sourcePageUrl', 'licenseUrl', 'creditNotice', '"credit":', '\\"credit\\":']
let cardPages = 0
for (const file of [...htmlFiles, ...rscFiles]) {
  if (isDetail(file)) continue
  cardPages += 1
  const text = fs.readFileSync(file, 'utf8')
  for (const key of CREDIT_KEYS) check(`⑨ ${rel(file)}: 카드 데이터에 ${key} 0`, !text.includes(key))
}

let detailWithCredit = 0
let detailFiles = 0
for (const file of htmlFiles.filter(isDetail)) {
  detailFiles += 1
  if (fs.readFileSync(file, 'utf8').includes('data-credit=""')) detailWithCredit += 1
}

console.log(`산출물 파일 ${files.length}개(.html ${htmlFiles.length} · .rsc ${rscFiles.length}) · og/twitter:image 태그 ${ogTags}개 · JSON-LD ${jsonLdBlocks}개`)
console.log(`카드 페이지(상세 제외 .html·.rsc) ${cardPages}개 · 상세 .html ${detailFiles}개 중 크레딧 figcaption 있음 ${detailWithCredit}개`)
console.log(`검사 ${checks}개 · 통과 ${checks - failures.length} · 실패 ${failures.length}`)
for (const failure of failures) console.log(`FAIL  ${failure}`)
process.exit(failures.length ? 1 : 0)
