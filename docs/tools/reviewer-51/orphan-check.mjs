// 리뷰어 51: 계획 §3.4 완료 조건 ② 재현 — public/images 안 모든 파일을 나열하고, 각 파일의 공개 경로(/images/…)를
// 저장소 안 글(content·src·scripts·public, 빌드 산출물·node_modules 제외)에서 글자 그대로 찾는다(읽기 전용). 출력은 상대경로만.
// 사용: 저장소 루트에서 `node docs/tools/reviewer-51/orphan-check.mjs`
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = []
const dirs = []
const walk = (d, acc, exts) => {
  for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) { if (acc === files) dirs.push(p); walk(p, acc, exts) }
    else if (!exts || exts.test(e.name)) acc.push(p)
  }
}
walk('public/images', files)
const scan = []
for (const d of ['content', 'src', 'scripts', 'public']) if (fs.existsSync(path.join(root, d))) walk(d, scan, /\.(md|mdx|ts|tsx|js|mjs|json|txt|html|css|xml)$/)
const texts = scan.map((f) => fs.readFileSync(path.join(root, f), 'utf8'))
let orphan = 0
const byKind = {}
for (const f of files) {
  const web = '/' + f.split(path.sep).slice(1).join('/') // public/images/x/thumb.jpg → /images/x/thumb.jpg
  const n = texts.filter((t) => t.includes(web)).length
  const k = path.basename(f)
  byKind[k] = (byKind[k] ?? 0) + 1
  if (n === 0) { orphan++; console.log(`참조 없음: ${f} (${fs.statSync(path.join(root, f)).size}바이트)`) }
}
const empty = dirs.filter((d) => fs.readdirSync(path.join(root, d)).length === 0)
console.log(`public/images 파일 ${files.length}개 · 폴더 ${dirs.length}개 · 빈 폴더 ${empty.length}개 · 파일 이름별 ${JSON.stringify(byKind)}`)
console.log(`참조 없는 파일 ${orphan}개`)
