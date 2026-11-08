/**
 * 프로그래머 11-1 — 공유 intent 전수 검증(리뷰 26 P2-3 반영본; 원본 `docs/tools/programmer-11/share-check.ts`).
 * 실행(저장소 루트): npx tsx docs/tools/programmer-11-1/share-check.ts
 * 대상: 한국어 게시물 전체 + 영어본 전체(빌드와 같은 로더 `getAllPosts`·`getEnglishPostById`).
 * 기대값: 제목 가중치 + 1 + 23 > 280인 제목은 X `text` 없이 `?url=`만(= 리뷰 25 측정 영어 24건), 나머지는 `text` = 제목 그대로.
 * 확인: ① text가 있으면 제목과 완전히 같고 가중치 + 1 + 23 ≤ 280 ② url만 목록 = 리뷰 25 측정 24건(그 제목은 원 가중치 > 280)
 *       ③ url만 건은 intent URL에 `text` 파라미터 자체가 없고 쿼리가 `url=` 하나뿐 ④ 인코딩 왕복 ⑤ "…" 말줄임 0
 *       ⑥ 스레드 text = 원 제목, text+url 길이 ≤ 500 ⑦ 엔드포인트 2종.
 */
import { readFileSync } from 'node:fs'
import { getAllPosts, getAllTranslations, getEnglishPostById } from '../../../src/lib/content/load'
import { postPath } from '../../../src/lib/i18n'
import { THREADS_INTENT, X_INTENT, X_MAX_WEIGHT, X_URL_WEIGHT, threadsIntentUrl, xIntentUrl, xShareText, xWeight } from '../../../src/lib/share'

const ORIGIN = 'https://example.invalid' // 길이 검증용 가짜 origin(운영 URL은 쓰지 않는다)
let fail = 0
const problems: string[] = []
function bad(msg: string) {
  fail++
  problems.push(msg)
}

const rows: { locale: 'ko' | 'en'; id: string; title: string }[] = []
for (const post of getAllPosts()) rows.push({ locale: 'ko', id: post.id, title: post.title })
for (const id of getAllTranslations().keys()) {
  const post = getEnglishPostById(id)
  if (post) rows.push({ locale: 'en', id, title: post.title })
}

const urlOnly: Record<'ko' | 'en', string[]> = { ko: [], en: [] }
let withText = 0
let maxX = 0
let maxThreads = 0
for (const row of rows) {
  const pageUrl = `${ORIGIN}${postPath(row.locale, row.id)}`
  const text = xShareText(row.title)
  const fullWeight = xWeight(row.title) + 1 + X_URL_WEIGHT
  const x = new URL(xIntentUrl(row.title, pageUrl))
  if (`${x.origin}${x.pathname}` !== X_INTENT) bad(`X 엔드포인트: ${row.id}`)
  if (x.searchParams.get('url') !== pageUrl) bad(`X url 왕복: ${row.id}`)
  if (text === '') {
    urlOnly[row.locale].push(row.id)
    if (fullWeight <= X_MAX_WEIGHT) bad(`예산 안인데 url만: ${row.locale}/${row.id} (${fullWeight})`)
    if (x.searchParams.has('text')) bad(`url만인데 text 파라미터 있음: ${row.locale}/${row.id}`)
    if ([...x.searchParams.keys()].join(',') !== 'url') bad(`url만 쿼리 키 이상: ${row.locale}/${row.id} ${[...x.searchParams.keys()]}`)
  } else {
    withText++
    if (text !== row.title) bad(`text가 원제목과 다름: ${row.locale}/${row.id}`)
    if (fullWeight > X_MAX_WEIGHT) bad(`X 초과 ${fullWeight}: ${row.locale}/${row.id}`)
    maxX = Math.max(maxX, fullWeight)
    if (x.searchParams.get('text') !== row.title) bad(`X text 왕복: ${row.id}`)
  }
  if (text.includes('…') && !row.title.includes('…')) bad(`말줄임 생성: ${row.id}`)
  const th = new URL(threadsIntentUrl(row.title, pageUrl))
  if (`${th.origin}${th.pathname}` !== THREADS_INTENT) bad(`스레드 엔드포인트: ${row.id}`)
  if (th.searchParams.get('text') !== row.title || th.searchParams.get('url') !== pageUrl) bad(`스레드 인코딩 왕복: ${row.id}`)
  const threadsLen = [...row.title].length + 1 + [...pageUrl].length
  maxThreads = Math.max(maxThreads, threadsLen)
  if (threadsLen > 500) bad(`스레드 500자 초과 ${threadsLen}: ${row.id}`)
}

// 리뷰 25 측정 결과(영어 24건)와 대조
const reviewer = readFileSync('docs/tools/reviewer-25/x-title-length-output.txt', 'utf-8')
const reviewerIds = [...reviewer.matchAll(/content\/posts-en\/(.+)\.md/g)].map((m) => m[1] as string)
const reviewerSet = new Set(reviewerIds)
const mineSet = new Set(urlOnly.en)
const onlyReviewer = reviewerIds.filter((id) => !mineSet.has(id))
const onlyMine = urlOnly.en.filter((id) => !reviewerSet.has(id))
if (onlyReviewer.length || onlyMine.length) bad(`리뷰 25 목록 불일치: 리뷰만 ${onlyReviewer.join(',')} / 이쪽만 ${onlyMine.join(',')}`)

const ko = rows.filter((r) => r.locale === 'ko').length
const en = rows.filter((r) => r.locale === 'en').length
const totalUrlOnly = urlOnly.ko.length + urlOnly.en.length
if (urlOnly.ko.length !== 0) bad(`ko url만 ${urlOnly.ko.length}건(기대 0)`)
if (urlOnly.en.length !== 24) bad(`en url만 ${urlOnly.en.length}건(기대 24)`)
if (withText !== rows.length - 24) bad(`원제목 text ${withText}건(기대 ${rows.length - 24})`)
console.log(`검사 제목: ko ${ko} · en ${en} · 합계 ${rows.length}`)
console.log(`X url만(text 없음): ko ${urlOnly.ko.length} · en ${urlOnly.en.length} · 합계 ${totalUrlOnly} (리뷰 25 영어 초과 ${reviewerIds.length}건과 일치 ${onlyReviewer.length === 0 && onlyMine.length === 0 ? '✅' : '❌'})`)
console.log(`X text = 원제목: ${withText}건 · 최대 가중치(공백·URL 포함) ${maxX} / ${X_MAX_WEIGHT}`)
console.log(`스레드: 최대 길이(text+공백+url, 코드 포인트) ${maxThreads} / 500`)
for (const id of urlOnly.en) {
  const title = getEnglishPostById(id)!.title
  console.log(`  ${xWeight(title) + 24}\t${id}\t${xIntentUrl(title, `${ORIGIN}${postPath('en', id)}`).replace(ORIGIN, '<origin>')}`)
}
console.log(problems.length ? problems.map((p) => `FAIL ${p}`).join('\n') : 'FAIL 0')
process.exit(fail === 0 ? 0 : 1)
