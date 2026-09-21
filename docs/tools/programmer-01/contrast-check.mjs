/**
 * 색 대비 실측 도구 (WCAG 2.2 상대휘도 공식).
 * 사용: node docs/tools/programmer-01/contrast-check.mjs
 * 대상 색값은 src/app/globals.css의 토큰과 1:1로 유지한다.
 */
const PAIRS = [
  ['본문 텍스트 / 배경', '#18181B', '#FFFFFF'],
  ['보조 텍스트 / 배경', '#52525B', '#FFFFFF'],
  ['보조 텍스트 / 카드 표면', '#52525B', '#FAFAFA'],
  ['링크 / 배경', '#1D4ED8', '#FFFFFF'],
  ['푸터 텍스트 / 푸터 배경', '#3F3F46', '#FAFAFA'],
  ['배지 의혹', '#713F12', '#FEF3C7'],
  ['배지 수사중', '#1E3A8A', '#DBEAFE'],
  ['배지 기소', '#4C1D95', '#EDE9FE'],
  ['배지 유죄판결', '#7F1D1D', '#FEE2E2'],
  ['배지 종결', '#3F3F46', '#F4F4F5'],
  ['플레이스홀더 문구 / 플레이스홀더 배경', '#52525B', '#F4F4F5'],
  ['포커스 링 / 배경', '#1D4ED8', '#FFFFFF'],
]

function channel(value) {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const n = hex.replace('#', '')
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function ratio(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

let fail = 0
console.log('항목'.padEnd(38), '전경', '배경', '대비', '판정(AA 본문 4.5:1)')
for (const [label, fg, bg] of PAIRS) {
  const r = ratio(fg, bg)
  const pass = r >= 4.5
  if (!pass) fail += 1
  console.log(label.padEnd(36), fg, bg, `${r.toFixed(2)}:1`, pass ? 'PASS' : 'FAIL')
}
console.log(`\n검사 ${PAIRS.length}쌍 · 통과 ${PAIRS.length - fail} · 실패 ${fail}`)
process.exit(fail > 0 ? 1 : 0)
