/**
 * 프로그래머 15 — html-parity(전체 비교)에서 다르게 나온 파일이 모두 C7 구조 변경(상세 figure → MediaFigure) 한 종류인지 전수 분류.
 * 사용: node docs/tools/programmer-15/rsc-diff-classify.mjs <변경 전 server/app> <변경 후 server/app>
 *
 * 파일마다(.html·.rsc·.body) html-parity와 같은 정규화를 한 뒤, 다르면 변경 후 쪽의 MediaFigure 자리를
 * 변경 전 모양(서버 <figure> + CardMedia 클라이언트 참조)으로 되돌리는 치환을 하고, 그 결과가 변경 전과 글자 그대로 같은지 본다.
 *   후: ["$","$Lxx",null,{"media":M,"locale":L,"className":"mt-5","children":C}]
 *   전: ["$","figure",null,{"className":"mt-5","children":[["$","$Lxx",null,{"media":M,"priority":true,"locale":L,"variant":"figure"}],C]}]
 *   그리고 클라이언트 참조 이름 "MediaFigure" → "CardMedia".
 * 치환 뒤에도 다른 파일이 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'

const [before, after] = process.argv.slice(2)
function walk(root, dir = root) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => {
      const f = path.join(dir, e.name)
      if (e.isDirectory()) return walk(root, f)
      return /\.(html|body|rsc)$/.test(e.name) ? [path.relative(root, f)] : []
    })
    .sort()
}
const idOf = (t) => t.match(/^<!DOCTYPE html><!--([^>]+?)-->/)?.[1]
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
function normalize(text, buildId) {
  let t = text
  if (buildId) t = t.replace(new RegExp(escapeRe(buildId).replace(/_/g, '[-_]'), 'g'), '<BUILD_ID>')
  return t
    .replace(/\/_next\/static\/[A-Za-z0-9_\-./()\[\]%]+/g, '/_next/static/<ASSET>')
    .replace(/static\/(?:chunks|css|media)\/[A-Za-z0-9_\-./()\[\]%]+?\.(?:js|css|woff2?|png|svg)/g, 'static/<ASSET>')
    .replace(/<script src="\/_next\/static\/<ASSET>" async=""><\/script>/g, '')
    .replace(/<link rel="preload" as="script" fetchPriority="low" href="\/_next\/static\/<ASSET>"\/>/g, '')
    .replace(/I\[\d+,\[(?:\\*"[^"\\]*\\*",?)*\]/g, 'I[<MODULE>]')
    // RSC 페이로드 전송 조각 경계: 페이로드 길이가 바뀌면 같은 내용이 다른 자리에서 다음 <script>로 나뉜다(실측 71개 파일).
    // 조각을 이어 붙여 한 문자열로 본다 — 내용이 아니라 전송 단위다.
    .split('"])</script><script>self.__next_f.push([1,"')
    .join('')
}
/** .rsc에는 빌드 ID 주석이 없다 → 같은 경로의 .html 주석에서 읽는다. */
function buildIdFor(dir, file) {
  const html = path.join(dir, file.replace(/\.rsc$/, '.html'))
  return fs.existsSync(html) ? idOf(fs.readFileSync(html, 'utf8')) : undefined
}

/** q: 따옴표 표기(.html 안 RSC 문자열은 `\\\"` 꼴, .rsc는 `"`). */
function revert(text, q) {
  const Q = escapeRe(q)
  const head = new RegExp(
    `\\[${Q}\\$${Q},${Q}(\\$L[0-9a-z]+)${Q},null,\\{${Q}media${Q}:(\\{.*?\\}),${Q}locale${Q}:${Q}(ko|en)${Q},${Q}className${Q}:${Q}mt-5${Q},${Q}children${Q}:null\\}\\]`,
    'g',
  )
  const out = text.replace(
    head,
    (_, ref, media, locale) =>
      `[${q}$${q},${q}figure${q},null,{${q}className${q}:${q}mt-5${q},${q}children${q}:[[${q}$${q},${q}${ref}${q},null,{${q}media${q}:${media},${q}priority${q}:true,${q}locale${q}:${q}${locale}${q},${q}variant${q}:${q}figure${q}}],null]}]`,
  )
  return out.split(`${q}MediaFigure${q}`).join(`${q}CardMedia${q}`)
}

const files = walk(before).filter((f) => fs.existsSync(path.join(after, f)))
let same = 0
let reverted = 0
const bad = []
const spread = {}
for (const f of files) {
  const ta = normalize(fs.readFileSync(path.join(before, f), 'utf8'), buildIdFor(before, f))
  const tb = normalize(fs.readFileSync(path.join(after, f), 'utf8'), buildIdFor(after, f))
  if (ta === tb) {
    same += 1
    continue
  }
  const key = `${f.startsWith('en/') ? 'en/' : ''}${/(^|\/)post\//.test(f) ? 'post/*' : f}.${f.split('.').pop()}`
  spread[key] = (spread[key] ?? 0) + 1
  const q = f.endsWith('.rsc') ? '"' : '\\"'
  if (revert(tb, q) === ta) reverted += 1
  else bad.push(f)
}
console.log(`비교 파일 ${files.length}개(.html·.rsc·.body, 변경 전 ${walk(before).length} · 변경 후 ${walk(after).length})`)
console.log(`그대로 같음 ${same} · MediaFigure 되돌림 치환으로 같아짐 ${reverted} · 설명 안 되는 차이 ${bad.length}`)
console.log(`차이 파일 분포: ${JSON.stringify(spread)}`)
for (const f of bad.slice(0, 10)) console.log(`  설명 안 됨: ${f}`)
if (bad.length > 0) process.exit(1)
