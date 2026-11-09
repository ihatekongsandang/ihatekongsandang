/**
 * 프로그래머 16 — C5 이동 경로("홈 › 게시물", "홈 › #태그") 간격·터치 상자 실측.
 * 사용(저장소 루트, 로컬 프로덕션 서버 실행 중): node docs/tools/programmer-16/breadcrumb-measure.mjs <baseUrl> <라벨> [screens 폴더]
 *   라벨은 출력 구분용(before·after). screens 폴더를 주면 360·1280 이동 경로 부분 화면을 PNG로 남긴다.
 *
 * 측정(화면 3종 × 7폭): 홈 링크 상자 폭·높이, 링크 글자 끝 → 구분자 글자 시작 간격(px), 링크 글자 왼쪽 = h1 왼쪽(정렬),
 * 링크 상자 안 9점(모서리 안쪽 1px·변 중앙·가운데)의 elementFromPoint가 모두 그 링크인지(구분자에 가려지지 않는지),
 * 문서 가로 스크롤 없음. 기준: 높이 ≥ 44, 폭 ≥ 44, 9점 모두 링크, 정렬 차 ≤ 0.5px, 가로 넘침 0.
 */
import fs from 'node:fs'
import path from 'node:path'
import { withChrome, delay } from '../programmer-04/cdp.mjs'

const [base, label = 'run', shotDir] = process.argv.slice(2)
if (!base) {
  console.error('사용: node breadcrumb-measure.mjs <baseUrl> <라벨> [screens 폴더]')
  process.exit(2)
}
const POST = '2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019'
const VIEWS = { post: `/post/${POST}`, postEn: `/en/post/${POST}`, tag: '/tag/dmz' }
const WIDTHS = [360, 390, 768, 834, 1024, 1280, 1440]

const PROBE = `(() => {
  const navs = [...document.querySelectorAll('nav')].filter((n) => n.querySelector('a') && n.textContent.includes('›'));
  const crumb = navs[0];
  if (!crumb) return { error: 'no crumb' };
  const a = crumb.querySelector('a');
  const sep = [...crumb.querySelectorAll('span')].find((s) => s.textContent.trim() === '›');
  const r = a.getBoundingClientRect();
  const range = document.createRange(); range.selectNodeContents(a); const tr = range.getBoundingClientRect();
  const sr = document.createRange(); sr.selectNodeContents(sep); const st = sr.getBoundingClientRect();
  const h1 = document.querySelector('h1').getBoundingClientRect();
  const pts = [];
  for (const fx of [0, 0.5, 1]) for (const fy of [0, 0.5, 1]) {
    const x = r.left + 1 + fx * (r.width - 2), y = r.top + 1 + fy * (r.height - 2);
    const el = document.elementFromPoint(x, y);
    pts.push(Boolean(el && (el === a || a.contains(el))));
  }
  return {
    w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10,
    gap: Math.round((st.left - tr.right) * 10) / 10,
    textLeft: Math.round(tr.left * 10) / 10, h1Left: Math.round(h1.left * 10) / 10,
    boxLeft: Math.round(r.left * 10) / 10,
    hits: pts.filter(Boolean).length,
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    sepPointer: getComputedStyle(sep).pointerEvents,
    crumbTop: crumb.getBoundingClientRect().top, crumbBottom: crumb.getBoundingClientRect().bottom,
  };
})()`

let pass = 0
let fail = 0
const rows = []
await withChrome(9416, async (client) => {
  await client.send('Page.enable')
  for (const [name, p] of Object.entries(VIEWS)) {
    for (const w of WIDTHS) {
      await client.setViewport(w, w < 1024 ? 800 : 900, w < 1024)
      await client.navigate(base + p)
      await delay(200)
      const m = await client.evaluate(PROBE)
      const ok = m.h >= 44 && m.w >= 44 && m.hits === 9 && Math.abs(m.textLeft - m.h1Left) <= 0.5 && !m.overflowX
      if (ok) pass++
      else fail++
      rows.push(`${ok ? 'PASS' : 'FAIL'}  ${label} ${name} ${w}: 상자 ${m.w}×${m.h} · 글자→구분자 ${m.gap}px · 글자 왼쪽 ${m.textLeft} / h1 왼쪽 ${m.h1Left} (상자 왼쪽 ${m.boxLeft}) · 9점 중 링크 ${m.hits} · 구분자 pointer-events ${m.sepPointer} · 가로 넘침 ${m.overflowX ? '있음' : '없음'}`)
      if (shotDir && (w === 360 || w === 1280)) {
        fs.mkdirSync(shotDir, { recursive: true })
        const clip = { x: 0, y: Math.max(0, m.crumbTop - 8), width: Math.min(w, 520), height: m.crumbBottom - m.crumbTop + 60, scale: 2 }
        const shot = await client.send('Page.captureScreenshot', { format: 'png', clip })
        fs.writeFileSync(path.join(shotDir, `${label}-${name}-${w}.png`), Buffer.from(shot.data, 'base64'))
      }
    }
  }
})
console.log(rows.join('\n'))
console.log(`합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
process.exit(fail ? 1 : 0)
