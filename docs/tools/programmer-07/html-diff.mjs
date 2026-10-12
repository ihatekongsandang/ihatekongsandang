/**
 * 프로그래머 07 — 기준(HEAD) ↔ 작업 빌드의 `.next/server/app/**\/*.html` 전수 비교. 의도한 두 변경만 걷어 내면 같아야 한다.
 *
 * 사용: node docs/tools/programmer-07/html-diff.mjs <기준 app 폴더> <작업 app 폴더>
 *
 * 정규화(양쪽 같게): 06 `html-diff.mjs` 규칙(주석·청크 해시·preload 링크 제거)과 같되, **JSON-LD `<script type="application/ld+json">`은
 * 남긴다**(06 규칙은 모든 script를 지워 E 변경을 볼 수 없다). 그 밖의 script(RSC 페이로드 포함)는 따로 비교한다(아래 RSC).
 *
 * 작업 쪽에서만 걷어 내는 의도한 변경:
 *   E  WebSite JSON-LD의 `"alternateName":[…],` — 한국어·404는 한국어 값, `en/**`은 영어 값과 **정확히 같은 문자열**만, 파일마다 정확히 1회.
 *   C  영어 피드 카드의 ` aria-describedby="korean-only-{id}"`(링크)와 ` id="korean-only-{id}"`(배지) — `en/**`에서만 허용,
 *      링크·배지가 같은 id로 1:1, id 중복 0. 한국어·404 HTML에서는 0개여야 한다.
 * 걷어 낸 뒤 바이트가 같아야 한다.
 *
 * RSC(`self.__next_f.push`) 페이로드도 파일마다 비교한다: 클라이언트 청크 목록·빌드 ID만 `*`로 바꾸고(06 `rsc-same.mjs` 규칙),
 * E의 JSON 이스케이프 형태만 걷어 낸다. C는 클라이언트 컴포넌트 안에서 계산되므로 RSC에 나타나지 않아야 한다.
 * `.rsc` 파일도 같은 규칙으로, `.body`·`.meta`·`.json`은 바이트 그대로 비교한다.
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'

const [baseDir, workDir] = process.argv.slice(2)
if (!baseDir || !workDir) {
  console.error('사용: node html-diff.mjs <기준 app 폴더> <작업 app 폴더>')
  process.exit(2)
}

const ALT = {
  ko: ['공산당이 싫어요', 'ihatekongsandang'],
  en: ['공산당이싫어요', '공산당이 싫어요', 'Korea Politics & Security Brief', 'ihatekongsandang'],
}
const altHtml = (values) => `"alternateName":${JSON.stringify(values)},`
// RSC 페이로드(푸시 문자열을 풀어 이은 것) 안에서 JSON-LD는 `__html` JSON 문자열 값이라 따옴표가 한 번 이스케이프된다.
const altRsc = (values) => JSON.stringify(altHtml(values)).slice(1, -1)

function listFiles(root, ext) {
  const out = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith(ext)) out.push(path.relative(root, full))
    }
  }
  walk(root)
  return out.sort()
}

function normalizeHtml(html) {
  return html
    .replace(/<!--[^>]*-->/g, '')
    .replace(/<script\b(?![^>]*type="application\/ld\+json")[\s\S]*?<\/script>/g, '')
    .replace(/<link rel="(?:preload|stylesheet)"[^>]*>/g, '')
    .replace(/\/_next\/static\/[^"')\s]+/g, '/_next/static/*')
    .replace(/(opengraph-image|icon\.svg)\?[0-9a-f]+/g, '$1?*')
}

// `self.__next_f.push([1,"…"])`의 문자열을 JSON으로 풀어 이어 붙인다. 푸시를 나누는 경계는 앞부분 길이에 따라 옮겨 가므로
// (alternateName이 늘어 경계가 밀린 파일 6개 실측) 원문 그대로 이으면 내용이 같아도 다르게 보인다.
function rscOf(html) {
  const payload = [...html.matchAll(/self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g)]
    .map((m) => JSON.parse(m[1]))
    .filter((entry) => entry[0] === 1 && typeof entry[1] === 'string')
    .map((entry) => entry[1])
    .join('')
  return normalizeRsc(payload)
}

function normalizeRsc(payload) {
  return payload
    .replace(/\/_next\/static\/[^"\\]+/g, '/_next/static/*')
    .replace(/\[(?:"[0-9]+","static\/chunks\/[^\]]*?)\]/g, '[*]')
    .replace(/"b":"[A-Za-z0-9_-]{10,}"/g, '"b":"*"')
}

const count = (text, needle) => text.split(needle).length - 1
const isEnglish = (file) => /^en(?:\.[a-z]+$|\/)/.test(file)

const baseFiles = listFiles(baseDir, '.html')
const workFiles = listFiles(workDir, '.html')
const workSet = new Set(workFiles)
const baseSet = new Set(baseFiles)
const missing = baseFiles.filter((f) => !workSet.has(f))
const added = workFiles.filter((f) => !baseSet.has(f))

const fails = []
const stat = {
  ko: { files: 0, same: 0, alt: 0, c: 0, rscSame: 0, rscFiles: 0 },
  en: { files: 0, same: 0, alt: 0, c: 0, rscSame: 0, rscFiles: 0 },
}
const firstDiff = (a, b) => {
  let i = 0
  while (i < a.length && a[i] === b[i]) i += 1
  return `기준 …${a.slice(Math.max(0, i - 80), i + 160)}…\n    작업 …${b.slice(Math.max(0, i - 80), i + 160)}…`
}

for (const file of baseFiles) {
  if (!workSet.has(file)) continue
  const lang = isEnglish(file) ? 'en' : 'ko'
  const s = stat[lang]
  s.files += 1
  const rawBase = fs.readFileSync(path.join(baseDir, file), 'utf8')
  const rawWork = fs.readFileSync(path.join(workDir, file), 'utf8')
  const base = normalizeHtml(rawBase)
  let work = normalizeHtml(rawWork)

  // E — 기준에는 없어야 하고, 작업에는 WebSite JSON-LD가 있으면 정확히 1회
  const alt = altHtml(ALT[lang])
  const hasWebsite = base.includes('"@type":"WebSite","name"')
  const altCount = count(work, alt)
  if (count(base, '"alternateName"') !== 0) fails.push(`${file}: 기준에 alternateName이 있다`)
  if (count(work, '"alternateName"') !== altCount) fails.push(`${file}: 기대값과 다른 alternateName이 있다`)
  if (altCount !== (hasWebsite ? 1 : 0)) fails.push(`${file}: alternateName ${altCount}회(WebSite JSON-LD ${hasWebsite ? '있음' : '없음'})`)
  if (altCount === 1 && !work.includes(`"@type":"WebSite","name":`)) fails.push(`${file}: WebSite 블록 확인 실패`)
  if (altCount === 1) {
    // alternateName은 WebSite 블록의 name 바로 다음에 있어야 한다
    const m = work.match(/"@type":"WebSite","name":"[^"]*",("alternateName":\[[^\]]*\],)/)
    if (!m || m[1] !== alt) fails.push(`${file}: alternateName 위치가 WebSite name 다음이 아니다`)
    s.alt += 1
  }
  work = work.split(alt).join('')

  // C — 영어에서만, 링크·배지 1:1
  const described = [...work.matchAll(/ aria-describedby="(korean-only-[a-z0-9-]+)"/g)].map((m) => m[1])
  const ids = [...work.matchAll(/ id="(korean-only-[a-z0-9-]+)"/g)].map((m) => m[1])
  if (lang === 'ko' && (described.length || ids.length)) fails.push(`${file}: 한국어 HTML에 Korean only 속성 ${described.length}/${ids.length}`)
  if (new Set(ids).size !== ids.length) fails.push(`${file}: 배지 id 중복`)
  if (described.length !== ids.length || described.some((d) => !ids.includes(d)))
    fails.push(`${file}: aria-describedby ${described.length} ↔ 배지 id ${ids.length} 불일치`)
  if (count(work, 'aria-describedby') !== described.length) fails.push(`${file}: 다른 aria-describedby가 있다`)
  s.c += described.length
  work = work.replace(/ aria-describedby="korean-only-[a-z0-9-]+"/g, '').replace(/ id="korean-only-[a-z0-9-]+"/g, '')
  // 기준 배지 수 = 작업 배지 수(배지 자체를 더하거나 빼지 않았다)
  if (count(base, '>Korean only<') !== ids.length) fails.push(`${file}: 기준 배지 ${count(base, '>Korean only<')} ↔ 작업 id ${ids.length}`)

  if (base === work) s.same += 1
  else fails.push(`${file}: 의도한 변경을 걷어 낸 뒤에도 다르다\n    ${firstDiff(base, work)}`)

  // RSC
  const rb = rscOf(rawBase)
  let rw = rscOf(rawWork)
  if (rb || rw) {
    s.rscFiles += 1
    rw = rw.split(altRsc(ALT[lang])).join('')
    if (rw.includes('korean-only-')) fails.push(`${file}: RSC에 korean-only id가 있다`)
    if (rb === rw) s.rscSame += 1
    else fails.push(`${file}: RSC가 다르다\n    ${firstDiff(rb, rw)}`)
  }
}

// `.rsc`(클라이언트 이동용 RSC 파일) — HTML 속 페이로드와 같은 규칙. `.body`(sitemap·robots·llms.txt·OG 이미지 등)·`.meta`·`.json`은 바이트 동일.
const other = { rsc: [0, 0], body: [0, 0], meta: [0, 0], json: [0, 0] }
for (const ext of Object.keys(other)) {
  const bases = listFiles(baseDir, `.${ext}`)
  const works = new Set(listFiles(workDir, `.${ext}`))
  for (const file of bases) {
    other[ext][0] += 1
    if (!works.has(file)) {
      fails.push(`${file}: 작업 빌드에 없다`)
      continue
    }
    const a = fs.readFileSync(path.join(baseDir, file))
    const b = fs.readFileSync(path.join(workDir, file))
    let ok
    if (ext === 'rsc') {
      const lang = isEnglish(file) ? 'en' : 'ko'
      const work = normalizeRsc(b.toString('utf8')).split(altRsc(ALT[lang])).join('')
      ok = normalizeRsc(a.toString('utf8')) === work && !work.includes('korean-only-')
    } else ok = a.equals(b)
    if (ok) other[ext][1] += 1
    else fails.push(`${file}: 다르다`)
  }
  if (works.size !== bases.length) fails.push(`.${ext} 파일 수 기준 ${bases.length} ↔ 작업 ${works.size}`)
}

console.log(`기준 HTML ${baseFiles.length}개 · 작업 HTML ${workFiles.length}개 · 누락 ${missing.length} · 추가 ${added.length}`)
for (const lang of ['ko', 'en']) {
  const s = stat[lang]
  console.log(
    `${lang === 'ko' ? '한국어·404' : '영어(en/**)'}: ${s.files}개 · 의도 변경 걷은 뒤 동일 ${s.same}/${s.files} · alternateName 1회 ${s.alt}개 파일 · ` +
      `Korean only 연결 ${s.c}개 · RSC 동일 ${s.rscSame}/${s.rscFiles}`,
  )
}
console.log(Object.entries(other).map(([ext, [n, ok]]) => `.${ext} 동일 ${ok}/${n}`).join(' · '))
for (const f of [...missing.map((m) => `누락 ${m}`), ...added.map((a) => `추가 ${a}`), ...fails].slice(0, 40)) console.log(`FAIL ${f}`)
console.log(`실패 ${missing.length + added.length + fails.length}건`)
process.exit(missing.length + added.length + fails.length ? 1 : 0)
