/**
 * 플로팅 배너 색 대비 실측 (WCAG 2.2 상대휘도 공식).
 *   node docs/tools/programmer-04/contrast-check.mjs
 * 색값은 src/components/floating-banner.tsx 의 클래스(#18181b·#27272a·#d4d4d8·white)와 1:1로 유지한다.
 * 텍스트는 4.5:1(1.4.3), 포커스 표시·배너 경계 같은 비텍스트는 3:1(1.4.11) 기준.
 */
const PAIRS = [
  ['제목 / 배너 면', '#FFFFFF', '#18181B', 4.5],
  ['보조 문구 / 배너 면', '#D4D4D8', '#18181B', 4.5],
  ['제목 / 호버 면', '#FFFFFF', '#27272A', 4.5],
  ['보조 문구 / 호버 면', '#D4D4D8', '#27272A', 4.5],
  ['포커스 링(흰) / 배너 면', '#FFFFFF', '#18181B', 3],
  ['포커스 링(흰) / 호버 면', '#FFFFFF', '#27272A', 3],
  ['배너 면 / 페이지 배경', '#18181B', '#FFFFFF', 3],
  ['배너 면 / 푸터 배경', '#18181B', '#FAFAFA', 3],
]

function channel(value) {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const n = hex.replace('#', '')
  return (
    0.2126 * channel(parseInt(n.slice(0, 2), 16)) +
    0.7152 * channel(parseInt(n.slice(2, 4), 16)) +
    0.0722 * channel(parseInt(n.slice(4, 6), 16))
  )
}

function ratio(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

let fail = 0
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg)
  const pass = r >= min
  if (!pass) fail += 1
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label.padEnd(26)} ${fg} ${bg}  ${r.toFixed(2)}:1 (기준 ${min}:1)`)
}
console.log(`\n검사 ${PAIRS.length}쌍 · 통과 ${PAIRS.length - fail} · 실패 ${fail}`)
process.exit(fail > 0 ? 1 : 0)
