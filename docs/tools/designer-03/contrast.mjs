// 디자인 팀장 03 — globals.css 현행 토큰 쌍 대비 계산(WCAG 2.x 상대휘도). 실행: node docs/tools/designer-03/contrast.mjs
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
const L = (h) => { const [r, g, b] = hex(h); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return ((x + 0.05) / (y + 0.05)).toFixed(2) }
const T = { background: '#ffffff', foreground: '#18181b', surface: '#fafafa', surfaceStrong: '#f4f4f5', muted: '#52525b', border: '#e4e4e7', link: '#1d4ed8' }
const pairs = [
  ['foreground', 'background', 4.5], ['muted', 'background', 4.5], ['muted', 'surface', 4.5], ['muted', 'surfaceStrong', 4.5],
  ['foreground', 'surfaceStrong', 4.5], ['link', 'background', 4.5], ['link', 'surface', 4.5],
  ['border', 'background', 3], ['border', 'surface', 3], ['surfaceStrong', 'background', 3],
]
for (const [a, b, need] of pairs) { const r = ratio(T[a], T[b]); console.log(`${a} on ${b}: ${r}:1  기준 ${need}:1  ${Number(r) >= need ? 'PASS' : 'FAIL'}`) }
