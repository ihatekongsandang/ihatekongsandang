/**
 * 프로그래머 16 — C11 옮긴 id 리다이렉트 시험표 1~10(계획 §1.7)을 픽스처 빌드에 대해 돌린다.
 * 사용: node docs/tools/programmer-16/redirect-check.mjs <baseUrl> <픽스처 사본 루트> <사이트 주소>
 *   fixture-build.sh가 부른다. 픽스처: zz-fixture-old-a → zz-fixture-moved-a(영어본 있음), zz-fixture-old-b → zz-fixture-moved-b(영어본 없음).
 * 요청은 fetch(redirect: 'manual')로 보내 첫 응답의 상태·Location을 그대로 본다. curl -I 기록은 fixture-build.sh가 따로 남긴다.
 */
import fs from 'node:fs'
import path from 'node:path'

const [base, root, site] = process.argv.slice(2)
if (!base || !root || !site) {
  console.error('사용: node redirect-check.mjs <baseUrl> <픽스처 사본 루트> <사이트 주소>')
  process.exit(2)
}
const OLD_A = 'zz-fixture-old-a'
const OLD_B = 'zz-fixture-old-b'
const NEW_A = 'zz-fixture-moved-a'
const NEW_B = 'zz-fixture-moved-b'
let pass = 0
let fail = 0
function check(label, ok, detail = '') {
  if (ok) pass++
  else fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}
async function hit(p, method = 'GET') {
  const res = await fetch(base + p, { redirect: 'manual', method })
  return { status: res.status, location: res.headers.get('location'), text: method === 'GET' ? await res.text() : '' }
}
/** Location을 경로+쿼리로(절대·상대 어느 쪽이든). */
const locPath = (loc) => (loc ? new URL(loc, base).pathname + new URL(loc, base).search : null)

// 1·2·8: 옛 주소 → 308 + Location
for (const [n, from, to] of [
  [1, `/post/${OLD_A}`, `/post/${NEW_A}`],
  [2, `/en/post/${OLD_A}`, `/en/post/${NEW_A}`],
  [8, `/en/post/${OLD_B}`, `/post/${NEW_B}`],
  ['1b', `/post/${OLD_B}`, `/post/${NEW_B}`],
]) {
  for (const method of ['GET', 'HEAD']) {
    const r = await hit(from, method)
    check(`#${n} ${method} ${from} → 308 · Location ${to}`, r.status === 308 && locPath(r.location) === to, `${r.status} ${r.location}`)
  }
}

// 3: 새 주소 200
for (const p of [`/post/${NEW_A}`, `/en/post/${NEW_A}`, `/post/${NEW_B}`]) {
  const r = await hit(p)
  check(`#3 ${p} → 200`, r.status === 200, String(r.status))
}
const enB = await hit(`/en/post/${NEW_B}`)
check(`#8 대조: 영어본 없는 /en/post/${NEW_B} → 404(그래서 한국어로 보낸다)`, enB.status === 404, String(enB.status))

// 4: 사이트맵·llms.txt
for (const p of ['/sitemap.xml', '/llms.txt']) {
  const r = await hit(p)
  check(`#4 ${p} 200`, r.status === 200, String(r.status))
  check(`#4 ${p} 옛 id 0건`, !r.text.includes(OLD_A) && !r.text.includes(OLD_B))
  check(`#4 ${p} 새 id ${NEW_A}·${NEW_B} 있음`, r.text.includes(`/post/${NEW_A}`) && r.text.includes(`/post/${NEW_B}`))
  if (p === '/sitemap.xml') {
    check('#4 sitemap: /en/post/새 a 있음 · /en/post/새 b 없음(영어본 없음)', r.text.includes(`${site}/en/post/${NEW_A}<`) && !r.text.includes(`/en/post/${NEW_B}`))
  }
}

// 5: canonical·hreflang·og:url
for (const [p, canon, hasEn] of [
  [`/post/${NEW_A}`, `${site}/post/${NEW_A}`, true],
  [`/en/post/${NEW_A}`, `${site}/en/post/${NEW_A}`, true],
  [`/post/${NEW_B}`, `${site}/post/${NEW_B}`, false],
]) {
  const html = (await hit(p)).text
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const og = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1]
  const alts = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]}=${m[2]}`)
  check(`#5 ${p} canonical = 새 주소`, canonical === canon, String(canonical))
  check(`#5 ${p} og:url = 새 주소`, og === canon, String(og))
  const want = hasEn ? [`ko=${site}/post/${p.split('/').pop()}`, `en=${site}/en/post/${p.split('/').pop()}`] : []
  check(`#5 ${p} hreflang ${hasEn ? 'ko·en 쌍 = 새 주소' : '없음(영어본 없음)'}`, want.every((w) => alts.includes(w)) && (hasEn || alts.filter((a) => a.startsWith('en=')).length === 0), alts.join(' '))
  check(`#5 ${p} 응답 HTML에 옛 id 0`, !html.includes(OLD_A) && !html.includes(OLD_B))
}

// 6: 빌드 산출물 전수 grep(옛 id) — 라우트 매니페스트(리다이렉트 규칙 자체)만 허용
const hits = []
let scanned = 0
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) {
      if (e.name === 'cache') continue
      walk(f)
    } else {
      scanned++
      const txt = fs.readFileSync(f)
      if (txt.includes(OLD_A) || txt.includes(OLD_B)) hits.push(path.relative(root, f))
    }
  }
}
walk(path.join(root, '.next'))
// 계획 §1.7 6번: "빌드 산출 HTML(페이지 파일)에 옛 id 0건(라우트 매니페스트의 리다이렉트 규칙은 제외)".
// 실측하면 Next가 리다이렉트 규칙을 메타데이터 3곳에 적는다: routes-manifest.json(라우팅), required-server-files.json(설정 사본),
// types/routes.d.ts(경로 타입). 셋 다 응답으로 나가는 파일이 아니다. 페이지·정적 자산(server/app·server/pages·static)은 0이어야 한다.
const META = ['routes-manifest.json', 'required-server-files.json', path.join('types', 'routes.d.ts')].map((f) => path.join('.next', f))
const pageHits = hits.filter((h) => !META.includes(h))
check(`#6 .next 전체 ${scanned}개 파일(cache 제외) 중 페이지·자산 파일의 옛 id 0`, pageHits.length === 0, pageHits.join(', '))
for (const h of hits.filter((x) => META.includes(x))) {
  const txt = fs.readFileSync(path.join(root, h), 'utf8')
  const ctx = [...txt.matchAll(/zz-fixture-old-[ab]/g)].map((m) => txt.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' '))
  console.log(`  (기록) 메타데이터 ${h}: 옛 id ${ctx.length}회 — 예: …${ctx[0]}…`)
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.next', 'routes-manifest.json'), 'utf8'))
const ours = manifest.redirects.filter((r) => !r.internal)
check('#6 routes-manifest: 사용자 리다이렉트 4개(2건 × ko·en), 모두 308', ours.length === 4 && ours.every((r) => r.statusCode === 308), JSON.stringify(ours.map((r) => [r.source, r.destination, r.statusCode])))

// 9: 쿼리·끝 슬래시 — 문서 기대값(쿼리 보존 · 끝 슬래시는 2단 308)과 실측 비교, 결과를 그대로 적는다
{
  const r = await hit(`/post/${OLD_A}?utm_source=x`)
  check(`#9 쿼리: /post/${OLD_A}?utm_source=x → 308 · Location /post/${NEW_A}?utm_source=x (보존)`, r.status === 308 && locPath(r.location) === `/post/${NEW_A}?utm_source=x`, `${r.status} ${r.location}`)
  const r2 = await hit(`/en/post/${OLD_B}?utm_source=x&b=2`)
  check(`#9 쿼리: /en/post/${OLD_B}?utm_source=x&b=2 → /post/${NEW_B}?utm_source=x&b=2`, r2.status === 308 && locPath(r2.location) === `/post/${NEW_B}?utm_source=x&b=2`, `${r2.status} ${r2.location}`)
}
for (const [from, mid, to] of [
  [`/post/${OLD_A}/`, `/post/${OLD_A}`, `/post/${NEW_A}`],
  [`/en/post/${OLD_A}/`, `/en/post/${OLD_A}`, `/en/post/${NEW_A}`],
]) {
  const s1 = await hit(from)
  const s2 = s1.location ? await hit(locPath(s1.location)) : { status: 0 }
  const s3 = s2.location ? await hit(locPath(s2.location)) : { status: 0 }
  check(`#9 끝 슬래시: ${from} → 308 ${mid} → 308 ${to} → 200 (2단)`, s1.status === 308 && locPath(s1.location) === mid && s2.status === 308 && locPath(s2.location) === to && s3.status === 200, `${s1.status} ${s1.location} → ${s2.status} ${s2.location} → ${s3.status}`)
}

// 10: 음성 대조 — 다른 게시물 200, 없는 id·비슷한 id 404(와일드카드처럼 새지 않음)
const realId = fs.readdirSync(path.join(root, 'content', 'posts')).filter((f) => f.endsWith('.md') && !f.startsWith('zz-'))[0].replace(/\.md$/, '')
for (const [p, want] of [
  [`/post/${realId}`, 200],
  [`/en/post/${realId}`, 200],
  ['/post/zz-fixture-nothing', 404],
  ['/en/post/zz-fixture-nothing', 404],
  [`/post/${OLD_A}-extra`, 404],
  ['/post/zz-fixture-old', 404],
  [`/post/x${OLD_A}`, 404],
  [`/post/${OLD_A}/x`, 404],
]) {
  const r = await hit(p)
  check(`#10 ${p === `/post/${realId}` || p === `/en/post/${realId}` ? p.replace(realId, '<다른 게시물>') : p} → ${want} (Location 없음)`, r.status === want && !r.location, `${r.status} ${r.location ?? ''}`)
}

console.log(`합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
process.exit(fail ? 1 : 0)
