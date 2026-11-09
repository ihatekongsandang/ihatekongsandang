/**
 * 프로그래머 16 사본: 네 번째 인자 `--ignore-text-sep`를 주면 React가 붙인 이웃 글자 구분 주석 `<!-- -->`도 지우고 비교한다
 * (스트리밍 조각 경계가 바뀌면 같은 글자에서도 위치가 달라진다 — 화면 글자에는 영향 없음). 그 밖의 정규화는 원본 그대로.
 *
 * (프로그래머 15 사본: 빌드 ID에 하이픈이 들어가면(`ol20W-320…`) 원본의 `<!--([^-]+)-->`가 ID를 못 읽어 전 파일이 다르게 나온다.
 *  실측: HTML 첫 주석에는 하이픈이 밑줄로 바뀐 값(`ol20W_320…`), RSC `"b"`에는 원래 값이 들어 있다.
 *  → 주석에서 `<!--([^>]+?)-->`로 읽고, 밑줄 자리를 `[-_]`로 맞춰 두 표기를 모두 지운다. 나머지 정규화·출력은 원본과 같다.
 *  세 번째 인자 `--markup-only`: `<script>…</script>`(RSC 페이로드·JSON-LD 포함)를 빼고 화면 마크업만 비교한다.)
 * 프로그래머 13 — 기존 게시물 출력 불변 확인(변경 전 빌드 ↔ 변경 후 빌드).
 * 사용: node html-parity.mjs <변경 전 .next/server/app 사본> <변경 후 .next/server/app 사본>
 *
 * 두 빌드의 모든 .html·.body(sitemap 등) 파일을 짝지어 비교한다. 빌드마다 바뀌는 값만 지운 뒤 글자 단위로 같아야 한다.
 *  - 빌드 ID(`<!--{buildId}-->`, RSC `"b":"{buildId}"`)
 *  - 해시가 붙은 정적 자산 경로(`/_next/static/...`, RSC 안의 `static/chunks/...`): CSS는 새 클래스(상세 figcaption)가,
 *    클라이언트 청크는 i18n 사전(새 문구)이 들어가 해시가 바뀐다 — 내용 비교 대상이 아니다
 *  - 번들러 단위 값: `<script src>` 청크 태그, RSC 모듈 참조 행(`I[번호,[청크…]`)의 번호·청크 목록
 * 다르면 파일명과 첫 차이 주변 120자를 출력하고 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'

const [before, after, mode] = process.argv.slice(2)
const markupOnly = mode === '--markup-only'
const ignoreTextSep = process.argv.includes('--ignore-text-sep')
function walk(root, dir = root) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(root, f))
    else if (/\.(html|body)$/.test(e.name)) out.push(path.relative(root, f))
  }
  return out.sort()
}
const a = walk(before)
const b = walk(after)
const buildIdOf = (text) => text.match(/^<!DOCTYPE html><!--([^>]+?)-->/)?.[1]
function normalize(text, buildId) {
  let t = text
  if (buildId) t = t.replace(new RegExp(buildId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/_/g, '[-_]'), 'g'), '<BUILD_ID>')
  return t
    .replace(/\/_next\/static\/[A-Za-z0-9_\-./()\[\]%]+/g, '/_next/static/<ASSET>')
    .replace(/static\/(?:chunks|css|media)\/[A-Za-z0-9_\-./()\[\]%]+?\.(?:js|css|woff2?|png|svg)/g, 'static/<ASSET>')
    // 번들러 단위 값: 청크를 나누는 방식·청크 번호는 빌드마다 바뀔 수 있다(같은 소스로 두 번 빌드해도 달라짐을 실측).
    // 화면 내용이 아니므로 <script src> 태그 수와 RSC 모듈 참조 행의 청크 목록·모듈 번호만 지운다. 컴포넌트 이름은 남긴다.
    .replace(/<script src="\/_next\/static\/<ASSET>" async=""><\/script>/g, '')
    .replace(/<link rel="preload" as="script" fetchPriority="low" href="\/_next\/static\/<ASSET>"\/>/g, '')
    .replace(/I\[\d+,\[(?:\\*"[^"\\]*\\*",?)*\]/g, 'I[<MODULE>]')
}
const onlyA = a.filter((f) => !b.includes(f))
const onlyB = b.filter((f) => !a.includes(f))
let same = 0
const diffs = []
for (const file of a.filter((f) => b.includes(f))) {
  const ta = fs.readFileSync(path.join(before, file), 'utf8')
  const tb = fs.readFileSync(path.join(after, file), 'utf8')
  const stripScripts = (t) => { const u = markupOnly ? t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '') : t; return ignoreTextSep ? u.replace(/<!-- -->/g, '') : u }
  const na = stripScripts(normalize(ta, buildIdOf(ta)))
  const nb = stripScripts(normalize(tb, buildIdOf(tb)))
  if (na === nb) same += 1
  else {
    let i = 0
    while (i < na.length && na[i] === nb[i]) i += 1
    diffs.push(`${file} @${i}\n   전: ${JSON.stringify(na.slice(Math.max(0, i - 60), i + 60))}\n   후: ${JSON.stringify(nb.slice(Math.max(0, i - 60), i + 60))}`)
  }
}
console.log(`변경 전 ${a.length}개 · 변경 후 ${b.length}개 · 한쪽에만 있음 ${onlyA.length + onlyB.length}개`)
console.log(`짝 ${a.length - onlyA.length}개 중 정규화 후 같음 ${same}개 · 다름 ${diffs.length}개`)
for (const f of [...onlyA, ...onlyB]) console.log(`  한쪽에만: ${f}`)
for (const d of diffs.slice(0, 20)) console.log(`  다름: ${d}`)
if (diffs.length > 0 || onlyA.length + onlyB.length > 0) process.exit(1)
