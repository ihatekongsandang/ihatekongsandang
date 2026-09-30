/**
 * 리뷰어 11 — 프로그래머 05-1 `unit-checks.tsx`(25케이스)가 다루지 않는 `attribution` 모서리를 잰다.
 * 결과는 판정용 관찰값이다(기대값 단언이 아니라 실제 동작을 출력). 
 *   npx tsx --tsconfig docs/tools/reviewer-11/tsconfig.json docs/tools/reviewer-11/attribution-edge.tsx
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { MixedLangText } from '../../../src/components/mixed-lang-text'
import type { Post } from '../../../src/lib/content/schema'
import { localizePost, validateTranslation } from '../../../src/lib/content/translation'
import { langForTranslatable } from '../../../src/lib/i18n'

const ID = 'sample-post'
const FILE = `${ID}.md`
const ORIGINAL = '인스타그램 @im_nowandhere (나우앤히어)'
const original = (attribution = ORIGINAL): Post => ({
  id: ID, title: '원본', description: '요약', publishedAt: '2026-09-29', publishedAtTime: Date.UTC(2026, 8, 29),
  sourceType: 'url', attribution, sources: [], tags: [], images: [], sourceUrl: 'https://example.com/a',
  useSourceImage: false, body: '본문', fileName: FILE,
})
const base = { id: ID, title: 'T', description: 'D', translatedAt: '2026-09-29' }
const run = (label: string, attribution: unknown, orig = original()) => {
  const r = validateTranslation({ ...base, attribution }, 'Body', FILE, orig)
  const used = r.translation ? localizePost(orig, r.translation).attribution : '(translation 없음)'
  console.log(`[${label}] 입력=${JSON.stringify(attribution)} → 오류 ${r.errors.length} · 경고 ${r.notices.length}${r.notices.length ? ' ' + JSON.stringify(r.notices) : ''} · 쓰인 값=${JSON.stringify(used)}`)
}
run('숫자', 123)
run('배열', ['Instagram @im_nowandhere'])
run('객체', { en: 'Instagram' })
run('null', null)
run('핸들 추가', 'Instagram @im_nowandhere @other (나우앤히어)')
run('괄호 밖 한글(홑낫표)', 'Instagram @im_nowandhere 「나우앤히어」')
run('중첩 괄호 안 한글', 'Instagram @im_nowandhere (Now and Here (나우앤히어))')
run('핸들 뒤 마침표 원본', 'Instagram @abc.', original('인스타그램 @abc.'))
run('원본 핸들 2개 중 1개 누락', 'Threads @a', original('스레드 @a · 인스타그램 @b'))

const show = (text: string) => {
  const lang = langForTranslatable(text, 'en')
  console.log(`[render en] ${JSON.stringify(text)} → 감싸는 요소 lang=${lang ?? '(없음)'} · ${renderToStaticMarkup(<MixedLangText text={text} locale="en" />)}`)
}
show('Instagram @im_nowandhere (Now and Here (나우앤히어))')
show('Instagram @im_nowandhere （나우앤히어）')
show('Instagram @a (나우) and Threads @b (앤히어)')
show('Instagram @im_nowandhere (Now and Here)')
