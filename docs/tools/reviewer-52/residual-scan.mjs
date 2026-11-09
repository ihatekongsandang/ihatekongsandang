// 리뷰어 52 C: content/ 밖 추적 파일(git ls-files)에서 지정 인물 이름이 남은 곳을 찾는다(읽기 전용).
// 사용: node docs/tools/reviewer-52/residual-scan.mjs <찾을 낱말 TSV(저장소 밖)> [판정표 TSV(저장소 밖)]
//   찾을 낱말 TSV 열: 묶음표시(예: WB) · 형태(전체/로마자/성만) · 정규식
//   판정표 TSV를 주면 (나) 인물 이름(한글·로마자)도 함께 찾는다(audit-names.mjs와 같은 판정표).
// 출력: 묶음·형태·이니셜·파일:줄만(이름 없음). 이미지·PDF 등 바이너리는 건너뛴다.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const [termsTsv, classTsv] = process.argv.slice(2)
const inRepo = (p) => path.resolve(p).startsWith(process.cwd())
if (!termsTsv || inRepo(termsTsv) || (classTsv && inRepo(classTsv))) {
  console.error('낱말 TSV·판정표는 저장소 밖 경로로 주세요')
  process.exit(1)
}
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const ini = (s) => [...s].filter((c) => c >= '가' && c <= '힣').map((c) => CHO[Math.floor((c.charCodeAt(0) - 0xac00) / 588)]).join('')
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const terms = fs.readFileSync(termsTsv, 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => { const [g, form, re, label] = l.split('\t'); return { g, form, label: label || g, re: new RegExp(re, 'g') } })
if (classTsv) {
  const rows = fs.readFileSync(classTsv, 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#'))
  rows.forEach((l, idx) => {
    const [name, variants = '', cls, tier] = l.split('\t')
    if (cls !== '나' || name.endsWith('#')) return
    // P번호는 audit-names.mjs 출력의 P번호와 같다(판정표의 주석 아닌 줄 순서)
    const label = `P${String(idx + 1).padStart(3, '0')} ${tier} ${ini(name)}`
    terms.push({ g: 'B나', form: '한글', label, re: new RegExp(`(?<![가-힣])${esc(name)}(?=$|[^가-힣]|(?:은|는|이|가|을|를|의|와|과|도|에게|에|씨|측|로|으로|하고|만|이라|라)(?:$|[^가-힣]))`, 'g') })
    for (const r of variants.split('|').filter((v) => /[A-Za-z]/.test(v) && !/\(surname\)/.test(v) && v.length >= 6)) terms.push({ g: 'B나', form: '로마자', label, re: new RegExp(`(?<![\\w-])${esc(r)}(?![\\w-])`, 'g') })
  })
}

const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean)
const outside = tracked.filter((f) => !f.startsWith('content/'))
const BIN = /\.(png|jpe?g|gif|webp|ico|pdf|woff2?|ttf|otf|mp4|zip|gz)$/i
let scanned = 0
const res = new Map() // key g|form|label -> Map(file -> lines)
for (const f of outside) {
  if (BIN.test(f) || !fs.existsSync(f)) continue
  const buf = fs.readFileSync(f)
  if (buf.includes(0)) continue
  scanned++
  const lines = buf.toString('utf8').split('\n')
  lines.forEach((line, i) => {
    for (const t of terms) {
      t.re.lastIndex = 0
      if (t.re.test(line)) {
        const k = `${t.g}|${t.form}|${t.label}`
        if (!res.has(k)) res.set(k, new Map())
        const m = res.get(k)
        if (!m.has(f)) m.set(f, [])
        m.get(f).push(i + 1)
      }
    }
  })
}
console.log(`# 리뷰어 52 C 문서 잔존 검사 (이름 없음)`)
console.log(`추적 파일 ${tracked.length}개 중 content/ 밖 ${outside.length}개 · 텍스트로 검사 ${scanned}개(바이너리 제외)`)
for (const [k, m] of [...res].sort()) {
  const [g, form, label] = k.split('|')
  console.log(`\n## ${g} · ${form} · ${label} — ${m.size}파일 · ${[...m.values()].reduce((a, l) => a + l.length, 0)}줄`)
  for (const [f, ls] of m) console.log(`- ${f}: ${ls.join(', ')}`)
}
