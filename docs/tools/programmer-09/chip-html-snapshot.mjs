// 프로그래머 09 — 태그 칩 `<a>` HTML 전수 스냅샷·비교 (빌드 산출물 기준).
//
// 사용 (저장소 루트에서, `npm run build` 직후):
//   node docs/tools/programmer-09/chip-html-snapshot.mjs dump <출력.json>
//   node docs/tools/programmer-09/chip-html-snapshot.mjs compare <변경전.json> <변경후.json>
//
// dump: `.next/server/app/` 아래 모든 `.html`에서 태그 칩(`<a href="/tag/…">` 안에 `data-slot="badge"`)을
//       문서 순서대로 전부 뽑는다. 저장소에 남기지 않는 큰 파일이므로 출력 경로는 저장소 밖(임시 폴더)을 권한다.
// compare: 파일·칩 수·순서가 같은지, 각 칩에서 class 속성 값만 지웠을 때 바이트 단위로 같은지 보고,
//          class 차이는 (변경 전 → 변경 후, 활성 여부) 종류별로 묶어 건수를 센다.
import fs from 'node:fs'
import path from 'node:path'

const [mode, a, b] = process.argv.slice(2)
const APP = path.join(process.cwd(), '.next', 'server', 'app')
const CHIP = /<a (?:aria-current="page" )?class="[^"]*" href="\/tag\/[^"]*"><span data-slot="badge"[\s\S]*?<\/span><\/span><\/a>/g

function walk(dir) {
  const out = []
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) out.push(...walk(p))
    else if (ent.name.endsWith('.html')) out.push(p)
  }
  return out
}

if (mode === 'dump') {
  const files = walk(APP).sort()
  const snap = {}
  let total = 0
  for (const f of files) {
    const chips = fs.readFileSync(f, 'utf8').match(CHIP) ?? []
    if (chips.length) snap[path.relative(APP, f)] = chips
    total += chips.length
  }
  fs.writeFileSync(a, JSON.stringify(snap))
  const active = Object.values(snap).flat().filter((h) => h.includes('aria-current="page"')).length
  console.log(`html 파일 ${files.length} · 칩 있는 파일 ${Object.keys(snap).length} · 칩 ${total} · 활성 칩 ${active}`)
} else if (mode === 'compare') {
  const before = JSON.parse(fs.readFileSync(a, 'utf8'))
  const after = JSON.parse(fs.readFileSync(b, 'utf8'))
  const stripClass = (h) => h.replace(/ class="[^"]*"/g, ' class=""')
  const classes = (h) => [...h.matchAll(/ class="([^"]*)"/g)].map((m) => m[1])
  const fileSetSame = JSON.stringify(Object.keys(before).sort()) === JSON.stringify(Object.keys(after).sort())
  let chips = 0
  let nonClassDiff = 0
  let countDiff = 0
  const classDiffKinds = new Map()
  for (const f of Object.keys(before)) {
    const x = before[f]
    const y = after[f] ?? []
    if (x.length !== y.length) {
      countDiff += 1
      continue
    }
    for (let i = 0; i < x.length; i += 1) {
      chips += 1
      if (stripClass(x[i]) !== stripClass(y[i])) nonClassDiff += 1
      const cx = classes(x[i])
      const cy = classes(y[i])
      const isActive = x[i].includes('aria-current="page"')
      for (let j = 0; j < Math.max(cx.length, cy.length); j += 1) {
        if (cx[j] === cy[j]) continue
        const key = `${isActive ? '활성' : '비활성'} | class[${j}] "${cx[j]}" → "${cy[j]}"`
        classDiffKinds.set(key, (classDiffKinds.get(key) ?? 0) + 1)
      }
    }
  }
  console.log(`파일 집합 동일: ${fileSetSame} (변경 전 ${Object.keys(before).length} · 변경 후 ${Object.keys(after).length})`)
  console.log(`칩 수가 다른 파일: ${countDiff}`)
  console.log(`비교한 칩: ${chips}`)
  console.log(`class 외 차이가 있는 칩: ${nonClassDiff}`)
  console.log('class 차이 종류:')
  if (classDiffKinds.size === 0) console.log('  (없음)')
  for (const [k, n] of classDiffKinds) console.log(`  ${n}건 · ${k}`)
  const ok = fileSetSame && countDiff === 0 && nonClassDiff === 0
  console.log(ok ? '✅ class 외 변경 없음' : '❌ class 외 변경 있음')
  process.exitCode = ok ? 0 : 1
} else {
  console.error('사용: dump <출력.json> | compare <변경전.json> <변경후.json>')
  process.exitCode = 64
}
