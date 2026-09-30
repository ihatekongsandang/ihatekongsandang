/**
 * 리뷰어 12 — 영어 피드 전 페이지 카드의 접근성 트리(스크린리더가 읽는 순서·이름) 전수 확인.
 *
 * 사용: node docs/tools/reviewer-12/a11y-cards.mjs <baseUrl>   (로컬 프로덕션 서버)
 *
 * 영어 피드 1~마지막 페이지를 390px로 열고 하이드레이션 후 `Accessibility.getFullAXTree`를 받아
 * 카드 목록(listitem)마다 읽기 순서(이미지 → 링크(제목) → 날짜 → 유형 → [Korean only])와 링크 접근성 이름을 본다.
 * 같은 카드의 DOM에서 링크 `lang`·`hreflang`·이미지 `lang`, 배지가 링크 밖(탭 정지점 1개 유지)에 있는지도 본다.
 * `/_next/image` 요청은 막는다(리뷰 10 P2-2 멈춤 회피 — 이미지 요소·alt는 그대로 남는다).
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const [base] = process.argv.slice(2)
if (!base) {
  console.error('사용: node a11y-cards.mjs <baseUrl>')
  process.exit(2)
}
const EN_IDS = new Set(fs.readdirSync('content/posts-en').filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')))
const TOTAL_POSTS = fs.readdirSync('content/posts').filter((f) => f.endsWith('.md')).length
const PAGES = Math.ceil(TOTAL_POSTS / 12)

let pass = 0
let fail = 0
const fails = []
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else {
    fail += 1
    fails.push(`${label}${detail ? ` — ${detail}` : ''}`)
  }
}

let cards = 0
let koreanOnly = 0
let sampleOrder = { ko: null, en: null }

await withChrome(9412, async (client) => {
  await client.send('Accessibility.enable')
  await client.send('Network.setBlockedURLs', { urls: ['*/_next/image*', '*googletagmanager.com*', '*google-analytics.com*'] })
  await client.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  for (let n = 1; n <= PAGES; n += 1) {
    const url = `${base}/en${n > 1 ? `?page=${n}` : ''}`
    await client.send('Page.navigate', { url })
    for (let i = 0; i < 100; i += 1) {
      const { result } = await client.send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true })
      if (result.value === 'complete') break
      await delay(100)
    }
    await delay(600)

    // DOM 쪽 — 카드별 속성
    const { result } = await client.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `[...document.querySelectorAll('ul.grid > li')].map((li) => {
        const a = li.querySelector('h3 a'); const img = li.querySelector('img');
        const badge = [...li.querySelectorAll('span')].find((s) => s.textContent === 'Korean only');
        return { href: a?.getAttribute('href'), lang: a?.getAttribute('lang'), hreflang: a?.getAttribute('hreflang'),
          title: a?.textContent, imgLang: img?.getAttribute('lang') ?? null, badge: !!badge, badgeInLink: !!(badge && a?.contains(badge)),
          focusables: li.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])').length }
      })`,
    })
    const dom = result.value

    // 접근성 트리 — listitem 아래 이름 있는 노드를 문서 순서로
    const { nodes } = await client.send('Accessibility.getFullAXTree')
    const byId = new Map(nodes.map((node) => [node.nodeId, node]))
    const items = nodes.filter((node) => node.role?.value === 'listitem' && !node.ignored)
    const flatten = (node, out = []) => {
      const role = node.role?.value
      const name = node.name?.value
      if (!node.ignored && name && ['image', 'link', 'StaticText', 'time'].includes(role)) out.push(`${role}:${name}`)
      if (role === 'link') return out // 링크 이름 = 자식 텍스트 — 중복 제외
      for (const id of node.childIds ?? []) {
        const child = byId.get(id)
        if (child) flatten(child, out)
      }
      return out
    }
    const axCards = items.map((item) => flatten(item)).filter((seq) => seq.some((s) => s.startsWith('link:')))

    check(`p${n} 카드 수 DOM = AX`, dom.length === axCards.length && dom.length > 0, `${dom.length}/${axCards.length}`)
    dom.forEach((card, i) => {
      cards += 1
      const id = card.href?.replace(/^\/(en\/)?post\//, '')
      const translated = EN_IDS.has(id)
      const seq = axCards[i] ?? []
      const label = `p${n}#${i + 1} ${id}`
      const linkIndex = seq.findIndex((s) => s.startsWith('link:'))
      check(`${label} 링크 이름 = 제목`, seq[linkIndex] === `link:${card.title}`, seq[linkIndex])
      check(`${label} 이미지가 링크보다 먼저 읽힘`, seq.findIndex((s) => s.startsWith('image:')) === linkIndex - 1, seq.join(' | '))
      check(`${label} 카드 안 탭 정지점 1`, card.focusables === 1, String(card.focusables))
      if (translated) {
        check(`${label} 영어 카드 — lang·hreflang 없음·배지 없음`, !card.lang && !card.hreflang && !card.imgLang && !card.badge)
        sampleOrder.en ??= seq
      } else {
        koreanOnly += 1
        check(`${label} Korean only — a lang=ko·hreflang=ko·img lang=ko`, card.lang === 'ko' && card.hreflang === 'ko' && card.imgLang === 'ko')
        check(`${label} 배지 링크 밖·AX 마지막`, card.badge && !card.badgeInLink && seq.at(-1) === 'StaticText:Korean only', seq.at(-1))
        sampleOrder.ko ??= seq
      }
    })
  }
})

console.log(`영어 피드 ${PAGES}페이지 · 카드 ${cards}(게시물 ${TOTAL_POSTS}) · Korean only ${koreanOnly} · 영어본 ${cards - koreanOnly}`)
console.log(`읽기 순서 예 — Korean only: ${sampleOrder.ko?.join(' → ')}`)
console.log(`읽기 순서 예 — 영어 카드: ${sampleOrder.en?.join(' → ')}`)
console.log(`검사 ${pass + fail}개 · 통과 ${pass} · 실패 ${fail}`)
for (const line of fails.slice(0, 30)) console.log(`FAIL ${line}`)
process.exit(fail ? 1 : 0)
