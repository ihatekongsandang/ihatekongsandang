/**
 * 프로그래머 14 — 실측(`measure-output.json`)과 보강안 측정값(`docs/tools/designer-05/measure-output-final.json`)을 나란히 적는다.
 * 사용: node docs/tools/programmer-14/compare.mjs > docs/tools/programmer-14/compare-output.md
 * 목표 기준은 `design/v0.3-responsive/01-brief.md` §5 · 보강안 notes §3 표와 같은 항목·같은 식.
 */
import fs from 'node:fs'
const real = JSON.parse(fs.readFileSync('docs/tools/programmer-14/measure-output.json', 'utf8'))
const fin = JSON.parse(fs.readFileSync('docs/tools/designer-05/measure-output-final.json', 'utf8')).final
const W = [360, 390, 768, 834, 1024, 1280, 1440]
const VIEWS = ['home', 'post', 'en', 'postEn', 'tag', 'about']
const get = (o, k) => o?.m?.[k]
const rows = []
const row = (label, target, f, r, ok) => rows.push(`| ${label} | ${target} | ${f} | ${r} | ${ok === undefined ? '—' : ok ? '✅' : '🔴'} |`)
let fails = 0
const judge = (ok) => { if (ok === false) fails += 1; return ok }

const h360 = get(real, 'home-360'), f360 = get(fin, 'home-360')
row('360×740 첫 화면 카드(고정 요소에 안 가림)', '≥4, 첫 카드 y ≤300', `${f360.inFoldClear}장, y=${f360.firstTop}`, `${h360.inFoldClear}장, y=${h360.firstTop}`, judge(h360.inFoldClear >= 4 && h360.firstTop <= 300))
row('홈 머리 높이 360', '≤240', f360.headH, h360.headH, judge(h360.headH <= 240))
const e360 = get(real, 'en-360'), fe360 = get(fin, 'en-360')
row('영어 헤더 360', '≤64', fe360.headerH, e360.headerH, judge(e360.headerH <= 64))
const spread = (o) => Math.max(...W.flatMap((w) => VIEWS.filter((v) => ['home', 'en', 'tag'].includes(v)).map((v) => get(o, `${v}-${w}`)?.rowSpread ?? 0)))
row('같은 행 카드 높이 편차(홈·영어·태그 × 7폭 최대)', '0 또는 줄 제한', `${spread(fin)}px`, `${spread(real)}px`, judge(spread(real) === 0))
const cpl = (o, v, ws) => ws.map((w) => get(o, `${v}-${w}`)?.body?.cpl ?? '—').join(' · ')
const cplOk = (o, v, ws, lo, hi) => ws.every((w) => { const c = get(o, `${v}-${w}`)?.body?.cpl; return c >= lo && c <= hi })
row('상세 ko 글자/줄 768·1024·1280', '32~45', cpl(fin, 'post', [768, 1024, 1280]), cpl(real, 'post', [768, 1024, 1280]), judge(cplOk(real, 'post', [768, 1024, 1280], 32, 45)))
row('상세 en 글자/줄 768·1280', '60~75', cpl(fin, 'postEn', [768, 1280]), cpl(real, 'postEn', [768, 1280]), judge(cplOk(real, 'postEn', [768, 1280], 60, 75)))
row('소개 ko 글자/줄 768·1280', '32~45', cpl(fin, 'about', [768, 1280]), cpl(real, 'about', [768, 1280]), judge(cplOk(real, 'about', [768, 1280], 32, 45)))
row('상세 ko 글자/줄 360(참고)', '—(9개 시안 공통 한계)', cpl(fin, 'post', [360]), cpl(real, 'post', [360]))
const p390 = get(real, 'post-390'), fp390 = get(fin, 'post-390')
row('390×844 "원문 기사로 이동"', '844 안, 안 가림', `y=${fp390.ctaY}, ${fp390.ctaObscured ? '가림' : '안 가림'}`, `y=${p390.ctaY}~${p390.ctaB}, ${p390.ctaObscured ? '가림' : '안 가림'}`, judge(p390.ctaInFold && !p390.ctaObscured))
const keysAll = (o) => Object.keys(o.m)
const small = (o, views) => keysAll(o).filter((k) => views.includes(k.split('-')[0])).reduce((a, k) => a + (o.m[k].small44 ?? 0), 0)
const smallList = keysAll(real).filter((k) => real.m[k].small44 > 0).map((k) => `${k}: ${real.m[k].small44List.map((x) => `${x.t}(${x.h})`).join(', ')}`)
row(`44px 미만 터치(문장 속 링크 제외) — ${VIEWS.length}화면 × 7폭`, '0', small(fin, VIEWS), small(real, VIEWS), judge(small(real, VIEWS) === 0))
row('12px 이하 글자 비율 홈 360', '≤10%', `${f360.pct12}%`, `${h360.pct12}%`, judge(h360.pct12 <= 10))
row('12px 이하 글자 비율 상세 360', '(참고)', `${get(fin, 'post-360').pct12}%`, `${get(real, 'post-360').pct12}%`)
const low = (o, views) => keysAll(o).filter((k) => views.includes(k.split('-')[0])).reduce((a, k) => a + (o.m[k].textLowN ?? 0), 0)
const checked = (o, views) => keysAll(o).filter((k) => views.includes(k.split('-')[0])).reduce((a, k) => a + (o.m[k].textChecked ?? 0), 0)
const lowList = keysAll(real).filter((k) => real.m[k].textLowN > 0).map((k) => `${k}: ${JSON.stringify(real.m[k].textLow.slice(0, 3))}`)
row('글자 대비 4.5:1 미달', '0', `${low(fin, VIEWS)} / ${checked(fin, VIEWS)}`, `${low(real, VIEWS)} / ${checked(real, VIEWS)}`, judge(low(real, VIEWS) === 0))
const bmin = (o) => Math.min(...keysAll(o).map((k) => o.m[k].borderMin ?? 99))
row('컨트롤 경계 대비 최소', '≥3:1', bmin(fin), bmin(real), judge(bmin(real) >= 3))
const ov = (o) => Object.values(o.overflow).filter((v) => v > 0).length
row(`가로 넘침(320~1440 리플로우 ${Object.keys(real.overflow).length}조합)`, '0', `${ov(fin)} / ${Object.keys(fin.overflow).length}`, `${ov(real)} / ${Object.keys(real.overflow).length}`, judge(ov(real) === 0))
const fsum = (o) => { const v = Object.values(o.focus); return { steps: v.reduce((a, x) => a + x.steps, 0), noRing: v.reduce((a, x) => a + x.noRing.length, 0), covered: v.reduce((a, x) => a + x.covered.length, 0) } }
const ff = fsum(fin), fr = fsum(real)
row('Tab 포커스 표시 없음 / 고정 요소에 완전히 가림', '0 · 0', `${ff.noRing}/${ff.steps} · ${ff.covered}`, `${fr.noRing}/${fr.steps} · ${fr.covered}`, judge(fr.noRing === 0 && fr.covered === 0))
row('외부 요청', '0', fin._external?.length ?? '—', real._external.length, judge(real._external.length === 0))
const cols = (o) => [768, 834, 1024, 1280, 1440].map((w) => `${get(o, `home-${w}`).cols}(${get(o, `home-${w}`).cardW}px)`).join(' · ')
row('폭별 열 768·834·1024·1280·1440(카드 폭)', '2·2·3·3·3', cols(fin), cols(real), judge([768, 834, 1024, 1280, 1440].map((w) => get(real, `home-${w}`).cols).join('') === '22333'))
const t360 = get(real, 'tag-360'), ft360 = get(fin, 'tag-360')
row('태그 페이지 360 첫 화면 카드', '(참고)', `${ft360.inFoldClear}장(y=${ft360.firstTop})`, `${t360.inFoldClear}장(y=${t360.firstTop})`)
row('상세 스크롤 중 고정 위/아래 360', '(참고)', `${fin.scrolled.stuckTop}/${fin.scrolled.stuckBottom}`, `${real.scrolled.stuckTop}/${real.scrolled.stuckBottom}`)

console.log('| 항목 | 목표 | 보강안(목업 측정) | 실제 구현(로컬 next start) | 판정 |')
console.log('|---|---|---|---|---|')
for (const r of rows) console.log(r)
console.log(`\n판정 대상 ${rows.filter((r) => /✅|🔴/.test(r)).length}항목 · 미달 ${fails}`)
if (smallList.length) console.log(`\n44px 미만 상세:\n- ${smallList.join('\n- ')}`)
if (lowList.length) console.log(`\n대비 미달 상세:\n- ${lowList.join('\n- ')}`)
if (fr.noRing || fr.covered) console.log('\n포커스 상세:', JSON.stringify(real.focus))
