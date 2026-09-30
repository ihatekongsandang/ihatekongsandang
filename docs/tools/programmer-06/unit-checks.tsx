/**
 * 프로그래머 06 — 영어 피드 카드·영어본 경고 보강 케이스 검사.
 *
 * 사용: npx tsx --tsconfig docs/tools/programmer-06/tsconfig.json docs/tools/programmer-06/unit-checks.tsx
 *   (저장소 tsconfig는 `jsx: preserve`라 컴포넌트를 직접 렌더하려면 이 설정이 필요하다)
 *
 * - toCardView: 한국어 카드 데이터 불변(koreanOnly 없음) · 영어 피드 영어본 없는 글 → koreanOnly·한국어 alt
 * - englishFeedPostHref: 영어본 있으면 /en/post, 없으면 /post
 * - CardMedia 렌더: 로컬·원문 썸네일 이미지에 altLang → img `lang="ko"` · 플레이스홀더는 영어 UI 문구·lang 없음 ·
 *   altLang 없으면 lang 속성 없음(한국어 출력 불변)
 * - collectionJsonLd: postHref 없으면 기존과 같은 URL, 있으면 그 경로
 * - validateTranslation: attribution·speakerAffiliation 비문자열 경고(P2-A) · 원본에 없는 핸들 경고(P2-B) ·
 *   기존 누락 경고·정상 표기 경고 0 유지
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { CardMedia } from '../../../src/components/card-media'
import type { Post } from '../../../src/lib/content/schema'
import { validateTranslation } from '../../../src/lib/content/translation'
import { englishFeedPostHref, toCardView } from '../../../src/lib/content/view'
import { t } from '../../../src/lib/i18n'
import { collectionJsonLd } from '../../../src/lib/seo'

let passed = 0
const failures: string[] = []

function check(name: string, condition: boolean, detail = ''): void {
  if (condition) passed += 1
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
}

const ID = 'sample-post'
const FILE = `${ID}.md`
const ORIGINAL_ATTRIBUTION = '인스타그램 @im_nowandhere (나우앤히어)'

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    id: ID,
    title: '원본 제목',
    description: '원본 요약',
    publishedAt: '2026-09-29',
    publishedAtTime: Date.UTC(2026, 8, 29),
    sourceType: 'url',
    attribution: ORIGINAL_ATTRIBUTION,
    sources: [],
    tags: ['태그'],
    images: [],
    sourceUrl: 'https://example.com/a',
    useSourceImage: false,
    body: '본문',
    fileName: FILE,
    ...overrides,
  }
}

const withLocal = makePost({ image: { src: '/images/x/thumb.jpg', alt: '한국어 대체 텍스트' } })
const withRemote = makePost({ useSourceImage: true, og: { image: 'https://example.com/og.jpg', title: 'OG' } })
const noImage = makePost()

// --- toCardView ---
{
  const ko = toCardView(withLocal)
  check('한국어 카드 — koreanOnly 키 없음', !('koreanOnly' in ko), JSON.stringify(ko))
  check('한국어 카드 — 기존 키 5개 그대로', JSON.stringify(Object.keys(ko)) === JSON.stringify(['id', 'title', 'publishedAt', 'sourceType', 'media']))
  const enTranslated = toCardView(withLocal, 'en', true)
  check('영어 피드 영어본 카드 — koreanOnly 없음', !('koreanOnly' in enTranslated))
  const enDefault = toCardView(withLocal, 'en')
  check('toCardView(post, "en") 기본값 = 영어본 카드(기존 호출 호환)', !('koreanOnly' in enDefault))
  const koOnly = toCardView(withLocal, 'en', false)
  check('영어 피드 영어본 없는 카드 — koreanOnly true', koOnly.koreanOnly === true)
  check('영어본 없는 카드 — 로컬 alt 원본 그대로', koOnly.media.kind === 'local' && koOnly.media.alt === '한국어 대체 텍스트')
  const koOnlyRemote = toCardView(withRemote, 'en', false)
  check(
    '영어본 없는 카드 — 원문 썸네일 alt 한국어 문구(원본 제목 기준)',
    koOnlyRemote.media.kind === 'remote' && koOnlyRemote.media.alt === t('ko').sourcePreviewAlt('원본 제목'),
    JSON.stringify(koOnlyRemote.media),
  )
  const translatedRemote = toCardView(withRemote, 'en', true)
  check(
    '영어본 카드 — 원문 썸네일 alt 영어 문구(기존과 같음)',
    translatedRemote.media.kind === 'remote' && translatedRemote.media.alt === t('en').sourcePreviewAlt('원본 제목'),
  )
  const koFalse = toCardView(withLocal, 'ko', false)
  check('한국어 로캘에서는 translated=false여도 koreanOnly 없음', !('koreanOnly' in koFalse))
}

// --- englishFeedPostHref ---
{
  const a = makePost({ id: 'a' })
  const b = makePost({ id: 'b' })
  const href = englishFeedPostHref([
    { post: a, translated: true },
    { post: b, translated: false },
  ])
  check('englishFeedPostHref 영어본 → /en/post', href(a) === '/en/post/a')
  check('englishFeedPostHref 영어본 없음 → /post', href(b) === '/post/b')
}

// --- CardMedia 렌더 ---
{
  const local = renderToStaticMarkup(<CardMedia media={toCardView(withLocal, 'en', false).media} locale="en" altLang="ko" />)
  check('CardMedia 로컬 + altLang → img lang="ko"', /<img [^>]*lang="ko"/.test(local), local.slice(0, 200))
  const remote = renderToStaticMarkup(<CardMedia media={toCardView(withRemote, 'en', false).media} locale="en" altLang="ko" />)
  check('CardMedia 원문 썸네일 + altLang → img lang="ko"', /<img [^>]*lang="ko"/.test(remote), remote)
  const placeholder = renderToStaticMarkup(<CardMedia media={toCardView(noImage, 'en', false).media} locale="en" altLang="ko" />)
  check(
    'CardMedia 플레이스홀더 — 영어 UI 문구·lang 없음',
    placeholder.includes('No image') && placeholder.includes(t('en').noImageLabel) && !placeholder.includes('lang='),
    placeholder,
  )
  const koLocal = renderToStaticMarkup(<CardMedia media={toCardView(withLocal).media} />)
  check('CardMedia 한국어(altLang 없음) — lang 속성 없음', !/lang=/.test(koLocal), koLocal.slice(0, 200))
  const koRemote = renderToStaticMarkup(<CardMedia media={toCardView(withRemote).media} />)
  check('CardMedia 한국어 원문 썸네일 — lang 속성 없음', !/lang=/.test(koRemote), koRemote)
}

// --- collectionJsonLd ---
{
  const a = makePost({ id: 'a' })
  const b = makePost({ id: 'b' })
  const koLd = collectionJsonLd({ name: 'n', description: 'd', path: '/', posts: [a, b] })
  check('JSON-LD 한국어 기본 URL /post', JSON.stringify(koLd.mainEntity.itemListElement.map((item) => item.url.replace(/^https?:\/\/[^/]+/, ''))) === JSON.stringify(['/post/a', '/post/b']))
  const enDefault = collectionJsonLd({ name: 'n', description: 'd', path: '/en', posts: [a], locale: 'en' })
  check('JSON-LD 영어 postHref 없음 → /en/post(기존 동작)', (enDefault.mainEntity.itemListElement[0]?.url ?? '').endsWith('/en/post/a'))
  const enMixed = collectionJsonLd({
    name: 'n',
    description: 'd',
    path: '/en',
    posts: [a, b],
    locale: 'en',
    postHref: englishFeedPostHref([
      { post: a, translated: true },
      { post: b, translated: false },
    ]),
  })
  const urls = enMixed.mainEntity.itemListElement.map((item) => item.url.replace(/^https?:\/\/[^/]+/, ''))
  check('JSON-LD 영어 피드 혼합 → /en/post·/post', JSON.stringify(urls) === JSON.stringify(['/en/post/a', '/post/b']), JSON.stringify(urls))
}

// --- validateTranslation 경고 보강 ---
const base = { id: ID, title: 'English title', description: 'English description', translatedAt: '2026-09-29' }
const speakerPost = makePost({ speaker: { name: '홍길동', affiliation: '국회의원' } })
{
  const r = validateTranslation({ ...base, attribution: 'Instagram @im_nowandhere (나우앤히어)' }, 'Body', FILE, makePost())
  check('정상 attribution — 경고 0(기존 유지)', r.errors.length === 0 && r.notices.length === 0, r.notices.join(' / '))
}
for (const [label, value, word] of [
  ['숫자', 123, '숫자'],
  ['목록', ['Instagram @im_nowandhere'], '목록'],
  ['객체', { a: 1 }, '객체'],
  ['참/거짓', true, '참/거짓'],
] as const) {
  const r = validateTranslation({ ...base, attribution: value }, 'Body', FILE, makePost())
  check(
    `P2-A attribution ${label} → 경고 1·오류 0`,
    r.errors.length === 0 && r.notices.filter((n) => n.startsWith('attribution: 문자열이 아니라 무시됩니다') && n.includes(word)).length === 1,
    r.notices.join(' / '),
  )
  const s = validateTranslation({ ...base, speakerAffiliation: value }, 'Body', FILE, speakerPost)
  check(
    `P2-A speakerAffiliation ${label} → 경고 1·오류 0`,
    s.errors.length === 0 && s.notices.filter((n) => n.startsWith('speakerAffiliation: 문자열이 아니라 무시됩니다')).length === 1,
    s.notices.join(' / '),
  )
}
{
  const r = validateTranslation({ ...base, attribution: null }, 'Body', FILE, makePost())
  check('P2-A attribution null(빈 값) → 경고 0', r.errors.length === 0 && r.notices.length === 0, r.notices.join(' / '))
  const s = validateTranslation({ ...base, speakerAffiliation: 'Member of the National Assembly' }, 'Body', FILE, speakerPost)
  check('speakerAffiliation 문자열 → 경고 0', s.errors.length === 0 && s.notices.length === 0, s.notices.join(' / '))
}
{
  const r = validateTranslation({ ...base, attribution: 'Instagram @im_nowandhere @someone_else (나우앤히어)' }, 'Body', FILE, makePost())
  const added = r.notices.filter((n) => n.includes('원본에 없는 계정 핸들'))
  check('P2-B 원본에 없는 핸들 → 경고 1(해당 핸들 지목)', added.length === 1 && (added[0] ?? '').includes('@someone_else') && !(added[0] ?? '').includes('@im_nowandhere'), r.notices.join(' / '))
  check('P2-B 핸들 추가만 — 누락 경고 없음', !r.notices.some((n) => n.includes('영어 표기에 없습니다')))
}
{
  const r = validateTranslation({ ...base, attribution: 'Instagram @IM_NOWANDHERE (나우앤히어)' }, 'Body', FILE, makePost())
  check('대소문자 바뀐 핸들 → 누락 1 + 추가 1', r.notices.filter((n) => n.includes('영어 표기에 없습니다')).length === 1 && r.notices.filter((n) => n.includes('원본에 없는 계정 핸들')).length === 1, r.notices.join(' / '))
}
{
  const r = validateTranslation({ ...base, attribution: 'Instagram @dup @dup @im_nowandhere' }, 'Body', FILE, makePost())
  const added = r.notices.filter((n) => n.includes('원본에 없는 계정 핸들'))
  check('P2-B 같은 핸들 두 번 → 한 번만 지목', added.length === 1 && (added[0] ?? '').split('@dup').length - 1 === 1, added.join(' / '))
}
{
  const press = makePost({ attribution: '연합뉴스' })
  const r = validateTranslation({ ...base, attribution: 'Yonhap @yonhap' }, 'Body', FILE, press)
  check('P2-B 핸들 없는 원본에 핸들 추가 → 경고', r.notices.some((n) => n.includes('원본에 없는 계정 핸들 @yonhap')), r.notices.join(' / '))
}

console.log(`검사 ${passed + failures.length}개 · 통과 ${passed} · 실패 ${failures.length}`)
for (const failure of failures) console.log(`FAIL ${failure}`)
process.exit(failures.length > 0 ? 1 : 0)
