/**
 * 프로그래머 11 — 공유 intent 전수 검증. 실행(저장소 루트): npx tsx docs/tools/programmer-11/share-check.ts
 * 대상: 한국어 게시물 전체 + 영어본 전체(빌드와 같은 로더 `getAllPosts`·`getEnglishPostById`).
 * 확인: ① X text 가중치 + 1 + 23 ≤ 280 ② 자른 경우 "…"로 끝나고 원 제목의 앞부분 ③ 리뷰 25 측정 24건과 잘린 목록 일치
 *       ④ intent URL을 다시 풀면 text·url이 원값과 같다(인코딩 왕복) ⑤ 스레드 text+url 길이 ≤ 500 ⑥ 엔드포인트 2종.
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

const truncated: Record<'ko' | 'en', string[]> = { ko: [], en: [] }
let maxX = 0
let maxThreads = 0
for (const row of rows) {
  const pageUrl = `${ORIGIN}${postPath(row.locale, row.id)}`
  const text = xShareText(row.title)
  const total = xWeight(text) + 1 + X_URL_WEIGHT
  maxX = Math.max(maxX, total)
  if (total > X_MAX_WEIGHT) bad(`X 초과 ${total}: ${row.locale}/${row.id}`)
  if (text !== row.title) {
    truncated[row.locale].push(row.id)
    if (!text.endsWith('…')) bad(`말줄임 없음: ${row.id}`)
    if (!row.title.startsWith(text.slice(0, -1))) bad(`앞부분 불일치: ${row.id}`)
  }
  const x = new URL(xIntentUrl(row.title, pageUrl))
  if (`${x.origin}${x.pathname}` !== X_INTENT) bad(`X 엔드포인트: ${row.id}`)
  if (x.searchParams.get('text') !== text || x.searchParams.get('url') !== pageUrl) bad(`X 인코딩 왕복: ${row.id}`)
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
const mineSet = new Set(truncated.en)
const onlyReviewer = reviewerIds.filter((id) => !mineSet.has(id))
const onlyMine = truncated.en.filter((id) => !reviewerSet.has(id))
if (onlyReviewer.length || onlyMine.length) bad(`리뷰 25 목록 불일치: 리뷰만 ${onlyReviewer.join(',')} / 이쪽만 ${onlyMine.join(',')}`)

const ko = rows.filter((r) => r.locale === 'ko').length
const en = rows.filter((r) => r.locale === 'en').length
console.log(`검사 제목: ko ${ko} · en ${en} · 합계 ${rows.length}`)
console.log(`X: 최대 가중치(자른 뒤, 공백·URL 포함) ${maxX} / ${X_MAX_WEIGHT}`)
console.log(`잘린 제목: ko ${truncated.ko.length} · en ${truncated.en.length} (리뷰 25 영어 초과 ${reviewerIds.length}건과 일치 ${onlyReviewer.length === 0 && onlyMine.length === 0 ? '✅' : '❌'})`)
console.log(`스레드: 최대 길이(text+공백+url, 코드 포인트) ${maxThreads} / 500`)
for (const id of truncated.en) {
  const title = getEnglishPostById(id)!.title
  const text = xShareText(title)
  console.log(`  ${xWeight(title) + 24}→${xWeight(text) + 24}\t${id}\t${text.slice(-40)}`)
}
console.log(problems.length ? problems.map((p) => `FAIL ${p}`).join('\n') : 'FAIL 0')
process.exit(fail === 0 ? 0 : 1)
