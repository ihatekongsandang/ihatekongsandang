/**
 * 리뷰어 12 — 두 빌드의 HTML 전수에서 JSON-LD 블록과 `<head>`를 **대칭**으로 비교한다.
 *
 * 사용: node docs/tools/reviewer-12/jsonld-head-same.mjs <기준 .next/server/app> <작업 .next/server/app>
 *
 * `programmer-06/html-diff.mjs`는 `<script>`를 모두 지우고 비교하므로 JSON-LD(`application/ld+json`)가 빠진다.
 * `reviewer-10/jsonld-diff.mjs`는 "기준에 언어 전환이 없다"(05 이전 HEAD)를 전제로 해 지금 HEAD에는 맞지 않는다.
 * 여기서는 양쪽에 같은 정규화만 한다:
 *   - JSON-LD: 파일마다 블록 목록(JSON.parse 후 다시 직렬화)을 순서대로 비교
 *   - `<head>`: `<script>`·preload/stylesheet `<link>` 제거, `/_next/static/…`·이미지 쿼리 해시만 `*`
 * 한국어·404(`en/**` 밖)에서 차이가 하나라도 있으면 종료 코드 1. 영어는 파일별로 결과만 출력한다.
 */
import fs from 'node:fs'
import path from 'node:path'

const [baseDir, workDir] = process.argv.slice(2)
if (!baseDir || !workDir) {
  console.error('사용: node jsonld-head-same.mjs <기준 app> <작업 app>')
  process.exit(2)
}

const list = (root) => {
  const out = []
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name)
      if (e.isDirectory()) walk(f)
      else if (e.name.endsWith('.html')) out.push(path.relative(root, f))
    }
  }
  walk(root)
  return out.sort()
}
const jsonld = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.stringify(JSON.parse(m[1])))
const head = (html) =>
  ((html.match(/<head>([\s\S]*?)<\/head>/) ?? [])[1] ?? '')
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/<link rel="(?:preload|stylesheet)"[^>]*>/g, '')
    .replace(/\/_next\/static\/[^"')\s]+/g, '/_next/static/*')
    .replace(/(opengraph-image|icon\.svg)\?[0-9a-f]+/g, '$1?*')
const isEn = (f) => f === 'en.html' || f.startsWith('en/')

const base = list(baseDir)
const workSet = new Set(list(workDir))
const r = { ko: { files: 0, blocks: 0, ldSame: 0, headSame: 0, diff: [] }, en: { files: 0, blocks: 0, ldSame: 0, headSame: 0, diff: [] } }
for (const f of base) {
  if (!workSet.has(f)) continue
  const a = fs.readFileSync(path.join(baseDir, f), 'utf8')
  const b = fs.readFileSync(path.join(workDir, f), 'utf8')
  const bucket = r[isEn(f) ? 'en' : 'ko']
  bucket.files += 1
  const la = jsonld(a)
  const lb = jsonld(b)
  bucket.blocks += la.length
  const ldOk = JSON.stringify(la) === JSON.stringify(lb)
  const headOk = head(a) === head(b)
  if (ldOk) bucket.ldSame += 1
  if (headOk) bucket.headSame += 1
  if (!ldOk || !headOk) bucket.diff.push(`${f}${ldOk ? '' : ' [JSON-LD]'}${headOk ? '' : ' [head]'}`)
}
for (const [k, v] of Object.entries(r)) {
  console.log(`${k === 'ko' ? '한국어·404' : '영어'}: 파일 ${v.files} · 기준 JSON-LD 블록 ${v.blocks} · JSON-LD 동일 ${v.ldSame}/${v.files} · head 동일 ${v.headSame}/${v.files}${v.diff.length ? ` · 차이 ${v.diff.join(', ')}` : ''}`)
}
process.exit(r.ko.diff.length ? 1 : 0)
