// 토큰 색 쌍 대비 계산(WCAG 2.x 상대 휘도). 실행: node docs/tools/designer-04-A/contrast.mjs
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] }
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
const L = { bg: '#ffffff', fg: '#18181b', muted: '#52525b', surface: '#f4f4f5', line: '#e4e4e7', ls: '#82828a', acc: '#1d4ed8', ph: '#d4d4d8', ban: '#18181b', banSub: '#d4d4d8', icon: '#71717a' }
const D = { bg: '#111113', fg: '#f4f4f5', muted: '#a1a1aa', surface: '#1b1b1f', line: '#2e2e33', ls: '#7a7a83', acc: '#93b4ff', accBtn: '#2f5fe0', ph: '#3f3f46', ban: '#f4f4f5', banSub: '#3f3f46', icon: '#8d8d96' }
const pairs = (T, dark) => [
  ['본문 글자 fg/bg', T.fg, T.bg, 4.5], ['보조 글자 muted/bg', T.muted, T.bg, 4.5], ['보조 글자 muted/surface', T.muted, T.surface, 4.5],
  ['링크 acc/bg', T.acc, T.bg, 4.5], ['링크 acc/surface', T.acc, T.surface, 4.5],
  ['CTA 흰 글자/버튼', '#ffffff', dark ? T.accBtn : T.acc, 4.5],
  ['배너 글자/배너', dark ? '#18181b' : '#ffffff', T.ban, 4.5], ['배너 부제/배너', dark ? '#3f3f46' : T.banSub, T.ban, 4.5],
  ['경계 line-strong/bg (비텍스트)', T.ls, T.bg, 3], ['경계 line-strong/surface (비텍스트)', T.ls, T.surface, 3],
  ['대체 카드 아이콘/surface (비텍스트)', T.icon, T.surface, 3], ['포커스 링 acc/bg (비텍스트)', T.acc, T.bg, 3],
  ['(참고) 장식 구분선 line/bg', T.line, T.bg, 0], ['(참고) 사진 자리표시 ph/bg', T.ph, T.bg, 0],
]
const out = {}
for (const [name, T, dark] of [['light', L, false], ['dark', D, true]]) {
  out[name] = pairs(T, dark).map(([n, a, b, min]) => ({ n, a, b, r: Math.round(ratio(a, b) * 100) / 100, min, ok: min === 0 ? null : ratio(a, b) >= min }))
}
console.log(JSON.stringify(out, null, 1))
