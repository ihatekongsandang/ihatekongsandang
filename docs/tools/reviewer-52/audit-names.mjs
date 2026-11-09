// 리뷰어 52: 판정표(저장소 밖 TSV)에 적힌 인물 전부를 content/posts(ko 209)·content/posts-en(en 209) 전 파일에서 찾아
// 파일:줄·필드별로 모은다(읽기 전용).
// 사용: node docs/tools/reviewer-52/audit-names.mjs <판정표 TSV(저장소 밖)> <결과 폴더(저장소 밖)>
//
// 판정표 열(탭 구분, '#' 줄은 주석): 이름(한글) · 다른 표기(로마자 등, '|') · 판정(가/나/다) · 분류 · 근거 · id 조각('|') · 파일별 예외 · ko 정규식 · en 정규식
//   파일별 예외: "파일명조각=판정:분류:근거;…" — 같은 이름의 다른 사람 등
// 이름은 판정표에서만 읽고, 이 파일에는 적지 않는다.
// 결과 폴더: names-full.tsv(이름 포함 — 저장소 밖 전용)
// 표준 출력: 이름 없이 이니셜·파일:줄만. (나)·(다) 인물이 id에 든 파일은 경로의 그 조각을 '…'로 가린다.
import fs from 'node:fs'
import path from 'node:path'

const [tsv, out] = process.argv.slice(2)
const inRepo = (p) => path.resolve(p).startsWith(process.cwd())
if (!tsv || !out || inRepo(tsv) || inRepo(out)) {
  console.error('판정표와 결과 폴더는 저장소 밖 경로로 주세요')
  process.exit(1)
}
fs.mkdirSync(out, { recursive: true })

const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const initials = (s) => {
  const h = [...s.replace(/[#\s]/g, '')].filter((c) => c >= '가' && c <= '힣')
  if (h.length) return h.map((c) => CHO[Math.floor((c.charCodeAt(0) - 0xac00) / 588)]).join('')
  return s.split(/[\s-]+/).map((w) => w[0]).join('.').toUpperCase()
}

const rows = fs.readFileSync(tsv, 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#'))
const people = rows.map((l, i) => {
  const c = l.split('\t')
  const [name, variants = '', cls, tier, note = '', idtok = '', ov = '', koRe = '', enRe = ''] = c
  const overrides = ov ? ov.split(';').map((x) => { const [k, v] = x.split('='); const [oc, ot, ...on] = v.split(':'); return { k, cls: oc, tier: ot, note: on.join(':') } }) : []
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const PART = '(?=$|[^가-힣]|(?:은|는|이|가|을|를|의|와|과|도|에게|에|께|씨|측|로|으로|만|까지|부터|처럼|보다|이라고|라고|이라며|라며|에서|하고|이나|나|이고|이다|이었|이며|이란|란|이) ?)'
  const ko = koRe ? new RegExp(koRe, 'g') : name.endsWith('#') ? null : new RegExp(`(?<![가-힣])${esc(name)}${name.length <= 2 ? '(?=$|[^가-힣]|(?:은|는|이|가|을|를|의|와|과|도|에게|씨|측|하고|만)(?![가-힣]))' : PART}`, 'g')
  const romans = variants.split('|').filter((v) => /[A-Za-z]/.test(v) && !/\(surname\)/.test(v))
  const en = enRe ? new RegExp(enRe, 'g') : romans.length ? new RegExp(romans.map((r) => `(?<![\\w-])${esc(r)}(?![\\w-])`).join('|'), 'g') : null
  const enHan = name.endsWith('#') ? null : new RegExp(`\\(${esc(name)}\\)`, 'g')
  return { key: `P${String(i + 1).padStart(3, '0')}`, name, cls, tier, note, idtok: idtok.split('|').filter(Boolean), overrides, ko, en, enHan, ini: initials(name.endsWith('#') ? name.slice(0, -1) : name) }
})

// 2글자 이름의 흔한 낱말 충돌을 문맥으로 거른다(이름 대신 문맥 낱말만 적는다)
// (낱말과 겹치는 비공인 이름은 판정표의 ko 정규식 열로 문맥을 좁힌다)
const FALSE_CTX = [/서훈(?:에|을\s?받|\s?대상)/, /조현(?:병|상)/]

function fieldMap(lines) {
  const res = []
  let fm = 0
  const stack = []
  for (const line of lines) {
    if (line.trim() === '---' && fm < 2) { fm++; res.push(fm === 1 ? 'fm' : 'fm'); continue }
    if (fm !== 1) { res.push('body'); continue }
    const m = line.match(/^(\s*)(-\s+)?([A-Za-z_][\w.]*):/)
    if (m) {
      const ind = m[1].length + (m[2] ? m[2].length : 0)
      while (stack.length && stack[stack.length - 1].ind >= ind) stack.pop()
      stack.push({ ind, key: m[3] })
    }
    res.push(stack.map((s) => s.key).join('.') || 'fm')
  }
  return res
}

const files = []
for (const [lang, dir] of [['ko', 'content/posts'], ['en', 'content/posts-en']]) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) files.push({ lang, rel: `${dir}/${f}`, id: f.replace(/\.md$/, '') })
}

const hits = [] // {p, cls, tier, note, lang, rel, id, line, field}
for (const f of files) {
  const lines = fs.readFileSync(f.rel, 'utf8').split('\n')
  const fields = fieldMap(lines)
  for (const p of people) {
    const ov = p.overrides.find((o) => f.id.includes(o.k))
    const cls = ov ? ov.cls : p.cls
    const tier = ov ? ov.tier : p.tier
    const note = ov ? ov.note : p.note
    const res = f.lang === 'ko' ? [p.ko] : [p.en, p.enHan]
    lines.forEach((line, i) => {
      let n = 0
      for (const re of res) {
        if (!re) continue
        for (const m of line.matchAll(re)) {
          const ctx = line.slice(Math.max(0, m.index - 2), m.index + m[0].length + 6)
          if (p.name.length <= 2 && FALSE_CTX.some((r) => r.test(ctx))) continue
          n++
        }
      }
      if (n) hits.push({ p, cls, tier, note, lang: f.lang, rel: f.rel, id: f.id, line: i + 1, field: fields[i], n })
    })
    // id·파일명 조각
    const segs = f.id.slice(11).split('-')
    for (const t of p.idtok) {
      for (let a = 0; a < segs.length; a++) for (let b = a + 1; b <= Math.min(segs.length, a + 3); b++) {
        if (segs.slice(a, b).join('') === t) hits.push({ p, cls, tier, note, lang: f.lang, rel: f.rel, id: f.id, line: 0, field: 'id·파일명', n: 1 })
      }
    }
  }
}

// 가림: (나)·(다) 인물의 id 조각이 든 경로
const hideTok = new Set(people.filter((p) => p.cls !== '가').flatMap((p) => p.idtok))
const mask = (rel) => rel.replace(/(\d{4}-\d{2}-\d{2}-)([^/]+?)(\.md)$/, (_, d, rest, ext) => d + rest.split('-').map((s, i, arr) => {
  for (let b = 1; b <= 3; b++) if (hideTok.has(arr.slice(i, i + b).join(''))) return '…'
  return s
}).join('-').replace(/(…-)+…/g, '…') + ext)

fs.writeFileSync(path.join(out, 'names-full.tsv'), ['key\tname\tcls\ttier\tlang\tfile\tline\tfield\tcount\tnote', ...hits.map((h) => [h.p.key, h.p.name, h.cls, h.tier, h.lang, h.rel, h.line, h.field, h.n, h.note].join('\t'))].join('\n'))

const ko = files.filter((f) => f.lang === 'ko').length
const en = files.filter((f) => f.lang === 'en').length
console.log(`# 리뷰어 52 비공인 실명 전수 검사 출력 (이름 없음)`)
console.log(`검사 파일: ko ${ko}/209 · en ${en}/209 · 합 ${files.length}/418`)
console.log(`판정표 인물 ${people.length}명 · 발견 위치(줄) ${hits.length}개`)
const filesWithHit = new Set(hits.map((h) => h.rel))
console.log(`인물 이름이 1건 이상 나온 파일 ${filesWithHit.size}개`)

// (가) 요약
const ga = hits.filter((h) => h.cls === '가')
const gaPeople = new Map()
for (const h of ga) { const k = `${h.p.key}|${h.tier}`; if (!gaPeople.has(k)) gaPeople.set(k, { tier: h.tier, files: new Set(), lines: 0 }); const g = gaPeople.get(k); g.files.add(h.rel); g.lines++ }
const TIERS = { G1: '선출직 — 국회의원(현·전)', G2: '선출직 — 광역·기초 단체장·지방의원', G3: '대통령(현·전, 역사 포함)', G4: '고위공직자 — 총리·장관·차관·안보실·국정원·대통령실·감사원·대사·정무직 위원장', G5: '판사·검사·특별검사(공수처법 파목, 2026-11-10 사용자 결정)', G6: '장성급 장교(기사 본문으로 계급 확인)', G7: '정당 간부 — 대표·최고위원·원내대표', G8: '공공기관장', G9: '대통령 배우자(정책 §3.1 1a)', G10: '북한 지도자(정책 §3.1 1a)', G11: '외국 정상·정부 수반(정책 §3.1 1a)' }
console.log(`\n## (가) 공인 — ${new Set([...gaPeople.keys()].map((k) => k.split('|')[0])).size}명 · ${ga.length}줄`)
for (const t of Object.keys(TIERS)) {
  const ps = [...gaPeople.values()].filter((g) => g.tier === t)
  if (ps.length) console.log(`- ${t} ${TIERS[t]}: ${ps.length}명 · ${ps.reduce((a, g) => a + g.lines, 0)}줄`)
}

for (const cls of ['나', '다']) {
  const hs = hits.filter((h) => h.cls === cls)
  const byP = new Map()
  for (const h of hs) { const k = `${h.p.key}|${h.tier}|${h.note}`; if (!byP.has(k)) byP.set(k, { p: h.p, tier: h.tier, note: h.note, files: new Map() }); const e = byP.get(k); const r = mask(h.rel); if (!e.files.has(r)) e.files.set(r, []); e.files.get(r).push(`${h.line === 0 ? 'id' : h.line}(${h.field})`) }
  console.log(`\n## (${cls}) — ${byP.size}건(인물·판정 단위) · ${hs.length}줄`)
  for (const [, e] of [...byP].sort((a, b) => a[1].tier.localeCompare(b[1].tier))) {
    console.log(`- [${e.tier}] ${e.p.key} ${e.p.ini} — ${e.note}`)
    for (const [r, ls] of e.files) console.log(`    ${r}: ${ls.join(', ')}`)
  }
}
