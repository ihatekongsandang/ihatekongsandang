/**
 * 리뷰어 14 — 영어 피드 Korean only 카드의 링크 접근성 설명 독립 실측(프로그래머 07 C, 리뷰 12 P2-1).
 * 프로그래머 07 `a11y-describedby.mjs`와 다른 방식: 카드 링크 DOM 노드마다 `Accessibility.getPartialAXTree`로
 * 그 노드의 AX 이름·설명을 직접 받는다(목록 순서로 짝짓지 않는다). Chrome 실행 헬퍼만 `programmer-04/cdp.mjs`를 쓴다.
 *
 * 사용: node docs/tools/reviewer-14/a11y-korean-only.mjs <baseUrl> <콘텐츠 폴더>   (로컬 프로덕션 서버)
 *
 * 페이지: `/en`, `/en/page/2..N` (N = ceil(한국어 게시물 수 / 12)). 카드 = `h3 a[href*="/post/"]`.
 *   Korean only 카드(영어본 없음): AX 설명 = "Korean only" · AX 이름에 "Korean only" 없음 · href가 한국어 상세(`/post/{id}`)
 *   영어본 카드: AX 설명 없음 · `aria-describedby` 없음
 *   페이지마다 id 중복 0 · 모든 `aria-describedby`가 가리키는 id가 문서에 정확히 1개
 * 전체: 본 카드 수 = 한국어 게시물 수 · Korean only 본 수 = 영어본 없는 게시물 수 · 각 게시물이 정확히 한 번 나옴.
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const [base, contentDir] = process.argv.slice(2)
if (!base || !contentDir) {
  console.error('사용: node a11y-korean-only.mjs <baseUrl> <콘텐츠 폴더>')
  process.exit(2)
}
const ids = (dir) =>
  fs.readdirSync(path.join(contentDir, dir)).filter((f) => f.endsWith('.md') && f !== 'README.md').map((f) => f.slice(0, -3))
const KO = ids('posts')
const EN = new Set(ids('posts-en'))
const KO_ONLY = new Set(KO.filter((id) => !EN.has(id)))
const PAGES = Math.ceil(KO.length / 12)

let pass = 0
const fails = []
const check = (label, ok, detail = '') => (ok ? (pass += 1) : fails.push(`${label}${detail ? ` — ${detail}` : ''}`))
const seen = new Map()
let koOnlySeen = 0
let sample = ''

await withChrome(9431, async (c) => {
  await c.send('DOM.enable')
  await c.send('Accessibility.enable')
  await c.send('Network.setBlockedURLs', { urls: ['*/_next/image*', '*googletagmanager.com*', '*google-analytics.com*'] })
  for (let n = 1; n <= PAGES; n += 1) {
    const url = `${base}/en${n > 1 ? `/page/${n}` : ''}`
    await c.navigate(url)
    const { root } = await c.send('DOM.getDocument', { depth: 0 })
    const dom = await c.evaluate(`(() => {
      const all = [...document.querySelectorAll('[id]')].map((e) => e.id)
      const dup = all.filter((v, i) => all.indexOf(v) !== i)
      const refs = [...document.querySelectorAll('[aria-describedby]')].map((e) => e.getAttribute('aria-describedby'))
      const badRefs = refs.filter((r) => r.split(/\\s+/).some((id) => document.querySelectorAll('[id="' + id + '"]').length !== 1))
      return { dup, refs: refs.length, badRefs }
    })()`)
    check(`p${n} id 중복 0`, dom.dup.length === 0, dom.dup.join(','))
    check(`p${n} aria-describedby 대상 각 1개`, dom.badRefs.length === 0, dom.badRefs.join(','))
    const { nodeIds } = await c.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: 'h3 a[href*="/post/"]' })
    check(`p${n} 카드 있음`, nodeIds.length > 0)
    let pageKoOnly = 0
    for (const nodeId of nodeIds) {
      const { attributes } = await c.send('DOM.getAttributes', { nodeId })
      const attr = Object.fromEntries(attributes.reduce((acc, v, i) => (i % 2 ? acc : [...acc, [v, attributes[i + 1]]]), []))
      const href = attr.href
      const id = href.replace(/^\/(en\/)?post\//, '')
      seen.set(id, (seen.get(id) ?? 0) + 1)
      const { nodes } = await c.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false })
      const ax = nodes.find((x) => !x.ignored && x.role?.value === 'link')
      const name = ax?.name?.value ?? ''
      const desc = ax?.description?.value ?? ''
      const label = `p${n} ${id}`
      check(`${label} AX 링크 노드`, !!ax)
      check(`${label} AX 이름에 Korean only 없음`, !name.includes('Korean only'), name)
      if (KO_ONLY.has(id)) {
        koOnlySeen += 1
        pageKoOnly += 1
        check(`${label} Korean only — AX 설명`, desc === 'Korean only', `"${desc}"`)
        check(`${label} Korean only — 한국어 상세로 감`, href === `/post/${id}` && attr.hreflang === 'ko' && attr.lang === 'ko', JSON.stringify(attr))
        if (!sample) sample = `${label}: name="${name}" description="${desc}" aria-describedby="${attr['aria-describedby']}"`
      } else {
        check(`${label} 영어본 — 설명·속성 없음`, desc === '' && !('aria-describedby' in attr), `"${desc}" ${attr['aria-describedby'] ?? ''}`)
      }
    }
    console.log(`p${n}: 카드 ${nodeIds.length} · Korean only ${pageKoOnly} · aria-describedby ${dom.refs}`)
    await delay(50)
  }
})

const total = [...seen.values()].reduce((a, b) => a + b, 0)
check('본 카드 수 = 한국어 게시물 수', total === KO.length, `${total}/${KO.length}`)
check('모든 게시물 정확히 1회', KO.every((id) => seen.get(id) === 1), KO.filter((id) => seen.get(id) !== 1).join(','))
check('Korean only 본 수 = 영어본 없는 게시물 수', koOnlySeen === KO_ONLY.size, `${koOnlySeen}/${KO_ONLY.size}`)
console.log(`영어 피드 ${PAGES}페이지 · 카드 ${total} · Korean only ${koOnlySeen}(기대 ${KO_ONLY.size})`)
console.log(`예: ${sample || '(Korean only 카드 없음)'}`)
console.log(`검사 ${pass + fails.length} · 통과 ${pass} · 실패 ${fails.length}`)
for (const f of fails.slice(0, 30)) console.log('FAIL ' + f)
process.exit(fails.length ? 1 : 0)
