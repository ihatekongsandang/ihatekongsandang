/**
 * 리뷰어 26 — X 제목 자르기 독립 감사. 실행(저장소 루트): npx tsx docs/tools/reviewer-26/x-truncation-audit.ts
 * 대상: content/posts·posts-en 제목 전체. 잘린 제목마다
 *  (1) 남은 부분의 인용부호 짝(" “” ‘’ ')이 맞는지
 *  (2) 잘려 나간 부분에만 있는 인용·전언 표지(reportedly·allegedly·said·claim·according·criticiz·argu·accus 등)가 있는지
 *  (3) 남은 부분에 그런 표지가 하나라도 있는지
 * 를 센다. src/lib/share.ts 의 실제 함수를 그대로 쓴다.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { xShareText, xWeight, X_MAX_WEIGHT, X_URL_WEIGHT } from '../../../src/lib/share'

const MARKERS = /\b(reported(ly)?|alleg(ed|edly|ation)s?|said|says|saying|claim(s|ed|ing)?|according|criticiz\w*|argu\w*|accus\w*|denied|denies|questioned|insist\w*|warn\w*|calls?|called)\b/i
function quoteBalance(s: string) {
  const dq = (s.match(/"/g) ?? []).length
  const open = (s.match(/[“‘]/g) ?? []).length
  const close = (s.match(/[”’]/g) ?? []).length
  // 작은따옴표: 단어 안 아포스트로피(it's, president's)는 빼고 센다
  const sq = (s.match(/(^|[\s(\[—–-])'|'(?=$|[\s,.;:!?)\]…—–-])/g) ?? []).length
  return { ok: dq % 2 === 0 && open === close && sq % 2 === 0, dq, sq, open, close }
}
let total = 0, cut = 0, unbalanced = 0, markerOnlyInCut = 0, noMarkerKept = 0, maxW = 0
const rows: string[] = []
for (const dir of ['content/posts', 'content/posts-en']) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
    const title = String(matter(fs.readFileSync(path.join(dir, f), 'utf8')).data.title)
    total++
    const text = xShareText(title)
    const w = xWeight(text) + 1 + X_URL_WEIGHT
    maxW = Math.max(maxW, w)
    if (text === title) continue
    cut++
    const kept = text.slice(0, -1)
    if (!title.startsWith(kept)) throw new Error(`prefix mismatch ${f}`)
    const removed = title.slice(kept.length)
    const qb = quoteBalance(kept)
    if (!qb.ok) unbalanced++
    const keptHas = MARKERS.test(kept)
    const removedHas = MARKERS.test(removed)
    if (!keptHas) noMarkerKept++
    if (removedHas && !keptHas) markerOnlyInCut++
    rows.push(`${f}\tw=${w}\tquotes=${qb.ok ? 'OK' : `UNBALANCED(dq=${qb.dq},sq=${qb.sq})`}\tkeptMarker=${keptHas}\tremovedMarker=${removedHas}\n  KEPT: ${text}\n  CUT : ${removed}`)
  }
}
console.log(`제목 ${total} · 잘림 ${cut} · X 최대 ${maxW}/${X_MAX_WEIGHT}`)
console.log(`인용부호 짝 안 맞음 ${unbalanced}/${cut} · 남은 부분에 전언 표지 없음 ${noMarkerKept}/${cut} · 전언 표지가 잘린 부분에만 ${markerOnlyInCut}/${cut}`)
console.log(rows.join('\n'))
