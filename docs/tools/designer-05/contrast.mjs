// 보강안 토큰 대비 계산(WCAG 2.x 상대 휘도). 실행: node docs/tools/designer-05/contrast.mjs
const hex = (h) => { h = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) }
const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => { const x = lum(hex(a)), y = lum(hex(b)); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
const P = [
  ['본문 글자 fg/bg', '#18181b', '#ffffff', 4.5], ['보조 글자 muted/bg', '#52525b', '#ffffff', 4.5], ['보조 글자 muted/surface', '#52525b', '#f4f4f5', 4.5],
  ['링크 accent/bg', '#1d4ed8', '#ffffff', 4.5], ['링크 accent/surface', '#1d4ed8', '#f4f4f5', 4.5], ['원문 이동 흰 글자/accent', '#ffffff', '#1d4ed8', 4.5],
  ['다음 페이지·현재 쪽·선택 칩 흰 글자/fg', '#ffffff', '#18181b', 4.5], ['다음 페이지 보조·배너 부제 #d4d4d8/fg', '#d4d4d8', '#18181b', 4.5], ['선택 칩 건수 #e4e4e7/fg', '#e4e4e7', '#18181b', 4.5],
  ['배너 글자 흰/banner', '#ffffff', '#18181b', 4.5],
  ['(비텍스트) 컨트롤 경계 line-strong/bg', '#82828a', '#ffffff', 3], ['(비텍스트) 컨트롤 경계 line-strong/surface', '#82828a', '#f4f4f5', 3],
  ['(비텍스트) 대체 카드 아이콘 icon/surface', '#71717a', '#f4f4f5', 3], ['(비텍스트) 포커스 링 ring/bg', '#1d4ed8', '#ffffff', 3], ['(비텍스트) 배너 위 흰 포커스 링', '#ffffff', '#18181b', 3],
  ['(참고·장식) 구분선 line/bg', '#e4e4e7', '#ffffff', 0], ['(참고·장식) 사진 자리표시 ph/bg', '#d4d4d8', '#ffffff', 0], ['(참고·비활성 예외) 이전 없음 #a1a1aa/bg', '#a1a1aa', '#ffffff', 0],
]
console.log('| 쌍 | 전경 | 배경 | 대비 | 기준 | 판정 |\n|---|---|---|---|---|---|')
for (const [n, f, b, t] of P) { const r = Math.round(ratio(f, b) * 100) / 100; console.log(`| ${n} | \`${f}\` | \`${b}\` | ${r}:1 | ${t ? '≥' + t : '참고'} | ${t ? (r >= t ? '통과' : '미달') : '-'} |`) }
