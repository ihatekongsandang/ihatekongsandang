/**
 * 프로그래머 07 — 영어 피드 전 페이지의 Korean only 카드 전수: 링크 접근성 설명(accessible description)에 "Korean only"가 들어가는지
 * 접근성(AX) 트리로 실측한다(리뷰 12 P2-1).
 *
 * 사용: node docs/tools/programmer-07/a11y-describedby.mjs <baseUrl> <콘텐츠 폴더>   (로컬 프로덕션 서버, 저장소 루트에서)
 *   <콘텐츠 폴더>: 그 서버를 빌드한 content/ — Korean only 기대 수(= 영어본 없는 한국어 게시물 수)를 여기서 센다.
 *
 * 페이지 1 = `/en`, 2.. = `/en/page/N`(정적 경로). 하이드레이션 뒤 `Accessibility.getFullAXTree`를 받아 카드 목록(listitem)마다:
 *   - Korean only 카드: 링크 AX 이름 = 제목(설명이 이름에 섞이지 않음) · AX 설명 = "Korean only" ·
 *     DOM `aria-describedby` 대상이 문서에 정확히 1개 · 대상이 링크 밖 · 대상의 실효 언어가 영어(lang="ko" 조상 없음) · 카드 탭 정지점 1
 *   - 영어본 카드: 링크 AX 설명 없음 · `aria-describedby` 없음
 *   - 페이지 전체 id 중복 0
 * `/_next/image`·GA 요청은 막는다(리뷰 10 P2-2 멈춤 회피 — 이미지 요소·alt는 그대로). 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const [base, contentDir] = process.argv.slice(2)
if (!base || !contentDir) {
  console.error('사용: node a11y-describedby.mjs <baseUrl> <콘텐츠 폴더>')
  process.exit(2)
}
const mdIds = (dir) =>
  fs
    .readdirSync(path.join(contentDir, dir))
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => f.replace(/\.md$/, ''))
const KO_IDS = mdIds('posts')
const EN_IDS = new Set(mdIds('posts-en'))
const EXPECTED_KO_ONLY = KO_IDS.filter((id) => !EN_IDS.has(id)).length
const PAGES = Math.ceil(KO_IDS.length / 12)

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
let sample = null

await withChrome(9417, async (client) => {
  await client.send('Accessibility.enable')
  await client.send('Network.enable')
  await client.send('Network.setBlockedURLs', { urls: ['*/_next/image*', '*googletagmanager.com*', '*google-analytics.com*'] })
  await client.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  for (let n = 1; n <= PAGES; n += 1) {
    const url = `${base}/en${n > 1 ? `/page/${n}` : ''}`
    await client.send('Page.navigate', { url })
    for (let i = 0; i < 100; i += 1) {
      const { result } = await client.send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true })
      if (result.value === 'complete') break
      await delay(100)
    }
    await delay(600)

    const { result } = await client.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const ids = [...document.querySelectorAll('[id]')].map((el) => el.id)
        const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i)
        const cards = [...document.querySelectorAll('ul.grid > li')].map((li) => {
          const a = li.querySelector('h3 a')
          const ref = a?.getAttribute('aria-describedby') ?? null
          const targets = ref ? document.querySelectorAll('[id="' + ref + '"]') : []
          const target = targets[0] ?? null
          return {
            href: a?.getAttribute('href'), title: a?.textContent, ref, targetCount: targets.length,
            targetText: target?.textContent ?? null, targetInLink: !!(target && a.contains(target)),
            targetInCard: !!(target && li.contains(target)),
            targetLang: target ? (target.closest('[lang]')?.getAttribute('lang') ?? null) : null,
            focusables: li.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])').length,
          }
        })
        return { dupIds, cards }
      })()`,
    })
    const dom = result.value
    check(`p${n} 문서 id 중복 0`, dom.dupIds.length === 0, dom.dupIds.join(','))

    const { nodes } = await client.send('Accessibility.getFullAXTree')
    const byId = new Map(nodes.map((node) => [node.nodeId, node]))
    const items = nodes.filter((node) => node.role?.value === 'listitem' && !node.ignored)
    const findLink = (node) => {
      if (!node) return null
      if (node.role?.value === 'link' && !node.ignored) return node
      for (const id of node.childIds ?? []) {
        const found = findLink(byId.get(id))
        if (found) return found
      }
      return null
    }
    const axLinks = items.map((item) => findLink(item)).filter(Boolean)
    check(`p${n} 카드 수 DOM = AX 링크`, dom.cards.length === axLinks.length && dom.cards.length > 0, `${dom.cards.length}/${axLinks.length}`)

    dom.cards.forEach((card, i) => {
      cards += 1
      const id = card.href?.replace(/^\/(en\/)?post\//, '')
      const ax = axLinks[i]
      const name = ax?.name?.value ?? ''
      const description = ax?.description?.value ?? ''
      const label = `p${n}#${i + 1} ${id}`
      check(`${label} AX 이름 = 제목`, name === card.title, `"${name}"`)
      check(`${label} 탭 정지점 1`, card.focusables === 1, String(card.focusables))
      if (EN_IDS.has(id)) {
        check(`${label} 영어본 카드 — 설명·aria-describedby 없음`, !description && card.ref === null, `"${description}" ${card.ref}`)
      } else {
        koreanOnly += 1
        check(`${label} AX 설명에 "Korean only"`, description.includes('Korean only'), `"${description}"`)
        check(`${label} aria-describedby 대상 1개·카드 안·링크 밖`, card.targetCount === 1 && card.targetInCard && !card.targetInLink, JSON.stringify(card))
        check(`${label} 대상 문구·언어(en)`, card.targetText === 'Korean only' && card.targetLang === 'en', `${card.targetText} / ${card.targetLang}`)
        sample ??= `${label}: link name "${name}" · description "${description}" · aria-describedby="${card.ref}"`
      }
    })
  }
})

console.log(`영어 피드 ${PAGES}페이지 · 카드 ${cards}(한국어 게시물 ${KO_IDS.length}) · Korean only ${koreanOnly}(기대 ${EXPECTED_KO_ONLY}) · 영어본 카드 ${cards - koreanOnly}`)
check('카드 수 = 한국어 게시물 수', cards === KO_IDS.length, `${cards}/${KO_IDS.length}`)
check('Korean only 수 = 영어본 없는 게시물 수', koreanOnly === EXPECTED_KO_ONLY, `${koreanOnly}/${EXPECTED_KO_ONLY}`)
console.log(`예: ${sample ?? '(Korean only 카드 없음)'}`)
console.log(`검사 ${pass + fail}개 · 통과 ${pass} · 실패 ${fail}`)
for (const line of fails.slice(0, 30)) console.log(`FAIL ${line}`)
process.exit(fail ? 1 : 0)
