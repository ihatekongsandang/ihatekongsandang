/**
 * 빌드 산출물(.next/server/app/**\/*.html) 전수 정적 검사.
 *   node docs/tools/programmer-04/static-check.mjs <on|off>
 * on  : 모든 HTML에 배너 1개 · href 정확 · rel 정확 · fbclid 0 · 여백 클래스 존재 · 닫기 버튼 0
 * off : (`FLOATING_BANNER.enabled = false` 빌드) 모든 HTML에 배너 0 · 배너 주소 0 · 여백 클래스 0
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const expect = process.argv[2]
if (expect !== 'on' && expect !== 'off') {
  console.error('사용법: node static-check.mjs <on|off>')
  process.exit(1)
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../.next/server/app')
const files = []
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.html')) files.push(full)
  }
}
walk(root)

const ASIDE = /<aside aria-label="외부 링크 안내"/g
const HREF = 'href="https://signforkorea.com/re"'
const REL = 'rel="noopener nofollow"'
const GUTTERS = ['lg:max-[77rem]:pr-14', 'lg:max-[77rem]:pr-10', 'max-lg:pb-[calc(5.5rem+env(safe-area-inset-bottom))]']

let bad = 0
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8')
  const asides = (html.match(ASIDE) ?? []).length
  const problems = []
  if (html.includes('fbclid')) problems.push('fbclid 포함')
  if (expect === 'on') {
    if (asides !== 1) problems.push(`배너 ${asides}개`)
    if (!html.includes(`${HREF} target="_blank" ${REL}`)) problems.push('href/target/rel 불일치')
    for (const g of GUTTERS) if (!html.includes(g)) problems.push(`여백 클래스 없음: ${g}`)
    if (html.includes('배너 닫기')) problems.push('닫기 버튼 잔존')
  } else {
    if (asides !== 0) problems.push(`배너 ${asides}개`)
    if (html.includes('signforkorea.com')) problems.push('배너 주소 잔존')
    for (const g of GUTTERS) if (html.includes(g)) problems.push(`여백 클래스 잔존: ${g}`)
  }
  if (problems.length > 0) {
    bad += 1
    console.log(`FAIL ${path.relative(root, file)}: ${problems.join(', ')}`)
  }
}
console.log(`[${expect}] HTML ${files.length}개 검사 · 통과 ${files.length - bad} · 실패 ${bad}`)
process.exit(bad > 0 ? 1 : 0)
