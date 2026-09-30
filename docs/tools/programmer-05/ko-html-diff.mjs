/**
 * 한국어 페이지 회귀 전수 비교 — 기준 빌드(HEAD)와 작업 빌드의 `.next/server/app/**\/*.html`.
 *
 * 사용: node docs/tools/programmer-05/ko-html-diff.mjs <기준 .next/server/app> <작업 .next/server/app>
 *
 * 1) 기준 빌드의 HTML 파일이 작업 빌드에 전부 있는지(한국어 페이지 수가 줄지 않았는지).
 * 2) 파일마다 빌드마다 달라지는 값(스크립트·RSC 페이로드·청크 해시·빌드 ID·React 텍스트 구분 주석)을 걷어낸
 *    "보이는 문서"를 비교한다.
 * 3) 이번 작업의 의도된 추가분 — 헤더 언어 전환(`<nav aria-label="언어 선택">`와 그 감싸는 div),
 *    hreflang `<link rel="alternate">`, 한국어 상세의 "Read in English" 문단 — 을 따로 세고,
 *    그것까지 걷어낸 뒤에도 남는 차이는 "의도하지 않은 변경"으로 파일명과 첫 차이 위치를 출력한다.
 */
import fs from 'node:fs'
import path from 'node:path'

const [baseDir, workDir] = process.argv.slice(2)
if (!baseDir || !workDir) {
  console.error('사용: node ko-html-diff.mjs <기준 app 폴더> <작업 app 폴더>')
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

const INTENDED = [
  ['lang-nav', /<nav aria-label="언어 선택"[\s\S]*?<\/nav>/g],
  ['hreflang', /<link rel="alternate" hrefLang="[^"]+" href="[^"]*"\/>/g],
  ['read-in-english', /<p class="text-sm"><a lang="en" hrefLang="en"[^>]*>Read in English<\/a><\/p>/g],
  // 404(global-not-found): 기준 빌드는 Next 자동 noindex와 루트 레이아웃의 "index, follow"가 함께 나갔다(모순).
  // 이제 한 줄 "noindex, follow"만 나간다. 비교 시 기준 쪽 "index, follow" 한 줄과 맞바꿔 본다.
  ['404-robots', /<meta name="robots" content="noindex, follow"\/>/g],
  // 404 본문 아래 영어 안내 한 줄(정적 404는 요청 경로를 몰라 영어 방문자용 안내를 함께 둔다).
  ['404-english-line', /<p lang="en" class="pt-4 text-sm text-muted-foreground">[\s\S]*?<\/p>/g],
]

/** 헤더 오른쪽 묶음 div(주요 메뉴 nav + 언어 nav)를 기준 빌드 구조(주요 메뉴 nav 하나)로 되돌린다. */
function unwrapHeaderGroup(html) {
  return html
    .replace(
      /<div class="flex shrink-0 items-center gap-4 text-sm"><nav aria-label="주요 메뉴" class="flex items-center gap-4">([\s\S]*?)<\/nav><\/div>/g,
      '<nav aria-label="주요 메뉴" class="flex items-center gap-4 text-sm">$1</nav>',
    )
    .replace(
      '<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 h-14">',
      '<div class="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4">',
    )
}

const baseFiles = listHtml(baseDir)
const workFiles = new Set(listHtml(workDir))
const missing = baseFiles.filter((file) => !workFiles.has(file))
const added = [...workFiles].filter((file) => !baseFiles.includes(file))

const counts = Object.fromEntries(INTENDED.map(([name]) => [name, 0]))
let identicalRaw = 0
let notFoundOgImageTags = 0
let identicalAfterIntended = 0
const unexpected = []

for (const file of baseFiles) {
  if (!workFiles.has(file)) continue
  let before = normalize(fs.readFileSync(path.join(baseDir, file), 'utf8'))
  if (file === '_not-found.html') {
    before = before.replace('<meta name="robots" content="index, follow"/>', '')
    // global-not-found에는 app 루트 `opengraph-image`가 붙지 않는다(색인 제외 404라 공유 미리보기 불필요).
    // 이 차이는 세어서 따로 보고하고, 나머지가 같은지 본다.
    const ogImageTags = /<meta (?:property="og:image[^"]*"|name="twitter:image[^"]*")[^>]*\/>/g
    notFoundOgImageTags = (before.match(ogImageTags) ?? []).length
    before = before.replace(ogImageTags, '')
  }
  let after = normalize(fs.readFileSync(path.join(workDir, file), 'utf8'))
  if (before === after) identicalRaw += 1
  for (const [name, pattern] of INTENDED) {
    const matches = after.match(pattern)
    if (matches) counts[name] += matches.length
    after = after.replace(pattern, '')
  }
  after = unwrapHeaderGroup(after)
  if (before === after) {
    identicalAfterIntended += 1
  } else {
    let index = 0
    while (index < before.length && before[index] === after[index]) index += 1
    unexpected.push({
      file,
      before: before.slice(Math.max(0, index - 80), index + 160),
      after: after.slice(Math.max(0, index - 80), index + 160),
    })
  }
}

console.log(`기준 HTML ${baseFiles.length}개 · 작업 HTML ${workFiles.size}개`)
console.log(`기준에 있고 작업에 없는 파일: ${missing.length}개${missing.length ? ` — ${missing.join(', ')}` : ''}`)
console.log(`작업에만 있는 파일: ${added.length}개${added.length ? ` — ${added.join(', ')}` : ''}`)
console.log(`정규화 후 완전 동일(의도 변경 제거 전): ${identicalRaw}개`)
console.log(`의도된 추가분: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(' · ')}`)
console.log(`의도된 추가분 제거 후 동일: ${identicalAfterIntended} / ${baseFiles.length - missing.length}`)
console.log(`404에서 빠진 OG·트위터 이미지 메타: ${notFoundOgImageTags}개(의도 — 색인 제외 페이지)`)
console.log(`의도하지 않은 차이: ${unexpected.length}개`)
for (const item of unexpected.slice(0, 20)) {
  console.log(`\n✗ ${item.file}\n  기준: …${item.before}…\n  작업: …${item.after}…`)
}
process.exit(missing.length > 0 || unexpected.length > 0 ? 1 : 0)
