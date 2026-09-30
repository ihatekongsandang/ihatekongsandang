/**
 * 프로그래머 06 — 기준 빌드(HEAD)와 작업 빌드의 `.next/server/app/**\/*.html` 전수 비교.
 *
 * 사용: node docs/tools/programmer-06/html-diff.mjs <기준 .next/server/app> <작업 .next/server/app>
 *
 * `programmer-05/ko-html-diff.mjs`는 "기준 빌드에 언어 전환이 없다"(05 이전)를 전제로 작업 쪽만 걷어내는 비대칭 비교라
 * 05가 커밋된 지금의 HEAD와는 맞지 않는다. 여기서는 양쪽에 **같은 정규화**(스크립트·RSC 페이로드·청크 해시·빌드 ID·
 * React 텍스트 구분 주석 제거 — 05 도구와 같은 규칙)만 적용하고, 의도된 추가분을 따로 두지 않는다.
 *
 * - 한국어 HTML(`en/**` 밖, 404 포함): 전부 동일해야 한다(이번 작업은 한국어 출력을 바꾸지 않는다).
 * - 영어 HTML(`en/**`): 파일별로 동일/다름/신규를 나눠 출력한다(영어 피드는 의도된 변경).
 * 한국어 차이가 하나라도 있거나 기준 파일이 사라지면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'

const [baseDir, workDir] = process.argv.slice(2)
if (!baseDir || !workDir) {
  console.error('사용: node html-diff.mjs <기준 app 폴더> <작업 app 폴더>')
  process.exit(2)
}

function listHtml(root) {
  const out = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) out.push(path.relative(root, full))
    }
  }
  walk(root)
  return out.sort()
}

function normalize(html) {
  return html
    .replace(/<!--[^>]*-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/<link rel="(?:preload|stylesheet)"[^>]*>/g, '')
    .replace(/\/_next\/static\/[^"')\s]+/g, '/_next/static/*')
    .replace(/(opengraph-image|icon\.svg)\?[0-9a-f]+/g, '$1?*')
}

const isEnglish = (file) => file === 'en.html' || file.startsWith('en/')
const baseFiles = listHtml(baseDir)
const workFiles = listHtml(workDir)
const workSet = new Set(workFiles)
const baseSet = new Set(baseFiles)
const missing = baseFiles.filter((file) => !workSet.has(file))
const added = workFiles.filter((file) => !baseSet.has(file))

const result = { ko: { same: 0, diff: [] }, en: { same: 0, diff: [] } }
for (const file of baseFiles) {
  if (!workSet.has(file)) continue
  const before = normalize(fs.readFileSync(path.join(baseDir, file), 'utf8'))
  const after = normalize(fs.readFileSync(path.join(workDir, file), 'utf8'))
  const bucket = result[isEnglish(file) ? 'en' : 'ko']
  if (before === after) {
    bucket.same += 1
    continue
  }
  let index = 0
  while (index < before.length && before[index] === after[index]) index += 1
  bucket.diff.push({
    file,
    before: before.slice(Math.max(0, index - 80), index + 200),
    after: after.slice(Math.max(0, index - 80), index + 200),
  })
}

const koBase = baseFiles.filter((file) => !isEnglish(file)).length
const enBase = baseFiles.length - koBase
console.log(`기준 HTML ${baseFiles.length}개(한국어·404 ${koBase} · 영어 ${enBase}) · 작업 HTML ${workFiles.length}개`)
console.log(`기준에 있고 작업에 없는 파일: ${missing.length}개${missing.length ? ` — ${missing.join(', ')}` : ''}`)
console.log(`작업에만 있는 파일: ${added.length}개${added.length ? ` — ${added.join(', ')}` : ''}`)
console.log(`한국어·404 동일: ${result.ko.same} / ${koBase - missing.filter((f) => !isEnglish(f)).length} · 다름 ${result.ko.diff.length}`)
console.log(`영어 동일: ${result.en.same} · 다름 ${result.en.diff.length}${result.en.diff.length ? ` — ${result.en.diff.map((d) => d.file).join(', ')}` : ''}`)
for (const item of [...result.ko.diff.slice(0, 20), ...result.en.diff]) {
  console.log(`\n${isEnglish(item.file) ? '·' : '✗'} ${item.file}\n  기준: …${item.before}…\n  작업: …${item.after}…`)
}
process.exit(missing.length > 0 || result.ko.diff.length > 0 ? 1 : 0)
