/**
 * 영어본 규칙 케이스 검사 (프로그래머 05).
 *
 * 사용: npx tsx docs/tools/programmer-05/unit-checks.ts
 *
 * - validateTranslation: 필수·조건부 필수·id/파일명·원본 부재·날짜 형식·상속 필드·한글 섞임 경고
 * - hangulOutsideParentheses: 괄호 안 병기 허용
 * - renderEnglishMarkdown: `/post/{id}` → 영어본 있으면 `/en/post/{id}`, 없으면 그대로, 외부 링크·다른 경로 불변
 * - formatDate: 한국어·영어 날짜 표기
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { formatDate } from '../../../src/lib/i18n'
import { renderEnglishMarkdown, renderMarkdown } from '../../../src/lib/content/markdown'
import type { Post } from '../../../src/lib/content/schema'
import { hangulOutsideParentheses, localizePost, validateTranslation } from '../../../src/lib/content/translation'

let passed = 0
const failures: string[] = []

function check(name: string, condition: boolean, detail = ''): void {
  if (condition) passed += 1
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
}

const ID = 'sample-post'
const FILE = `${ID}.md`

function makeOriginal(overrides: Partial<Post> = {}): Post {
  return {
    id: ID,
    title: '원본 제목',
    description: '원본 요약',
    publishedAt: '2026-09-29',
    publishedAtTime: Date.UTC(2026, 8, 29),
    sourceType: 'url',
    attribution: '원문 매체',
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

const base = { id: ID, title: 'English title', description: 'English description', translatedAt: '2026-09-29' }

// --- validateTranslation ---
{
  const r = validateTranslation(base, 'Body', FILE, makeOriginal())
  check('최소 필드 통과', r.errors.length === 0 && Boolean(r.translation), r.errors.join(' / '))
  check('최소 필드 경고 0', r.notices.length === 0, r.notices.join(' / '))
}
{
  const r = validateTranslation(base, 'Body', FILE, undefined)
  check('원본 없음 → 오류', r.errors.some((e) => e.includes('한국어 원본이 없습니다')), r.errors.join(' / '))
}
{
  const r = validateTranslation({ ...base, id: 'other-id' }, 'Body', FILE, makeOriginal())
  check('id·파일명 불일치 → 오류', r.errors.some((e) => e.includes('파일명')), r.errors.join(' / '))
}
{
  const r = validateTranslation({ ...base, id: undefined }, 'Body', FILE, makeOriginal())
  check('id 누락 → 오류', r.errors.some((e) => e.startsWith('id:')), r.errors.join(' / '))
}
for (const field of ['title', 'description'] as const) {
  const r = validateTranslation({ ...base, [field]: '  ' }, 'Body', FILE, makeOriginal())
  check(`${field} 누락 → 오류`, r.errors.some((e) => e.startsWith(`${field}:`)), r.errors.join(' / '))
}
for (const value of [undefined, '2026-9-29', '29-09-2026', 'yesterday', '2026-13-45']) {
  const r = validateTranslation({ ...base, translatedAt: value }, 'Body', FILE, makeOriginal())
  check(`translatedAt ${String(value)} → 오류`, r.errors.some((e) => e.startsWith('translatedAt:')), r.errors.join(' / '))
}
{
  // YAML은 날짜를 Date로 파싱한다 — Date 값도 받아야 한다.
  const r = validateTranslation({ ...base, translatedAt: new Date('2026-09-29T00:00:00Z') }, 'Body', FILE, makeOriginal())
  check('translatedAt Date 값 통과', r.errors.length === 0 && r.translation?.translatedAt === '2026-09-29', r.errors.join(' / '))
}
{
  const withImage = makeOriginal({ image: { src: '/images/x.jpg', alt: '한국어 대체 텍스트' } })
  const r = validateTranslation(base, 'Body', FILE, withImage)
  check('원본 image 있음 + imageAlt 없음 → 오류', r.errors.some((e) => e.startsWith('imageAlt:')), r.errors.join(' / '))
  const ok = validateTranslation({ ...base, imageAlt: 'English alt' }, 'Body', FILE, withImage)
  check('원본 image(캡션 없음) + imageAlt → 통과', ok.errors.length === 0, ok.errors.join(' / '))
  const extra = validateTranslation({ ...base, imageAlt: 'English alt', imageCaption: 'Cap' }, 'Body', FILE, withImage)
  check('원본 캡션 없음 + imageCaption → 경고', extra.notices.some((n) => n.startsWith('imageCaption:')))
}
{
  const withCaption = makeOriginal({ image: { src: '/images/x.jpg', alt: '대체', caption: '캡션' } })
  const r = validateTranslation({ ...base, imageAlt: 'English alt' }, 'Body', FILE, withCaption)
  check('원본 caption 있음 + imageCaption 없음 → 오류', r.errors.some((e) => e.startsWith('imageCaption:')), r.errors.join(' / '))
  const ok = validateTranslation({ ...base, imageAlt: 'Alt', imageCaption: 'Caption' }, 'Body', FILE, withCaption)
  check('원본 caption + imageCaption → 통과', ok.errors.length === 0, ok.errors.join(' / '))
}
{
  const r = validateTranslation({ ...base, imageAlt: 'Alt' }, 'Body', FILE, makeOriginal())
  check('원본 image 없음 + imageAlt → 경고', r.errors.length === 0 && r.notices.some((n) => n.startsWith('imageAlt:')))
}
{
  const noSpeaker = validateTranslation({ ...base, speakerAffiliation: 'Lawmaker' }, 'Body', FILE, makeOriginal())
  check('원본 speaker 없음 + speakerAffiliation → 경고', noSpeaker.notices.some((n) => n.startsWith('speakerAffiliation:')))
  const nameOnly = makeOriginal({ speaker: { name: '홍길동' } })
  const r = validateTranslation({ ...base, speakerAffiliation: 'Lawmaker' }, 'Body', FILE, nameOnly)
  check('원본 소속 없음 + speakerAffiliation → 경고·미반영', r.notices.some((n) => n.startsWith('speakerAffiliation:')) && !r.translation?.speakerAffiliation)
  const withAff = makeOriginal({ speaker: { name: '홍길동', affiliation: '○○당 국회의원' } })
  const none = validateTranslation(base, 'Body', FILE, withAff)
  check('원본 speaker 있음 + speakerAffiliation 없음 → 통과(선택)', none.errors.length === 0)
  const localized = localizePost(withAff, none.translation!)
  check('speakerAffiliation 없으면 원본 소속 그대로', localized.speaker?.affiliation === '○○당 국회의원' && localized.speaker?.name === '홍길동')
  const given = validateTranslation({ ...base, speakerAffiliation: 'Lawmaker (○○당)' }, 'Body', FILE, withAff)
  check('speakerAffiliation 반영', localizePost(withAff, given.translation!).speaker?.affiliation === 'Lawmaker (○○당)')
}
{
  const photo = makeOriginal({
    sourceType: 'photo',
    sourceUrl: undefined,
    images: [
      { src: '/images/a.jpg', alt: '가', caption: '캡션' },
      { src: '/images/b.jpg', alt: '나' },
    ],
  })
  const missing = validateTranslation(base, 'Body', FILE, photo)
  check('사진 원본 + images 없음 → 오류', missing.errors.some((e) => e.startsWith('images:')))
  const wrongCount = validateTranslation({ ...base, images: [{ alt: 'A', caption: 'C' }] }, 'Body', FILE, photo)
  check('사진 개수 불일치 → 오류', wrongCount.errors.some((e) => e.startsWith('images:')))
  const noCaption = validateTranslation({ ...base, images: [{ alt: 'A' }, { alt: 'B' }] }, 'Body', FILE, photo)
  check('원본 사진 캡션 있는데 영어 캡션 없음 → 오류', noCaption.errors.some((e) => e.startsWith('images[0].caption')))
  const ok = validateTranslation({ ...base, images: [{ alt: 'A', caption: 'C' }, { alt: 'B' }] }, 'Body', FILE, photo)
  check('사진 alt·caption 전부 → 통과', ok.errors.length === 0, ok.errors.join(' / '))
  const localized = localizePost(photo, ok.translation!)
  check('사진 alt·caption 치환·src 유지', localized.images[0]?.alt === 'A' && localized.images[0]?.caption === 'C' && localized.images[1]?.src === '/images/b.jpg' && !localized.images[1]?.caption)
}
{
  const r = validateTranslation({ ...base, publishedAt: '2026-01-01', tags: ['x'], typo: 1 }, 'Body', FILE, makeOriginal())
  check('상속 필드 → 경고(무시)', r.errors.length === 0 && r.notices.some((n) => n.includes('`publishedAt`는 한국어 원본')) && r.notices.some((n) => n.includes('`tags`는 한국어 원본')))
  check('알 수 없는 필드 → 경고', r.notices.some((n) => n.includes('알 수 없는 필드 `typo`')))
}
{
  const r = validateTranslation({ ...base, description: 'x'.repeat(161) }, 'Body', FILE, makeOriginal())
  check('description 161자 → 경고', r.errors.length === 0 && r.notices.some((n) => n.startsWith('description이 161자')))
  const ok = validateTranslation({ ...base, description: 'x'.repeat(160) }, 'Body', FILE, makeOriginal())
  check('description 160자 → 경고 없음', ok.notices.length === 0)
}
{
  const r = validateTranslation(base, '<script>alert(1)</script>', FILE, makeOriginal())
  check('본문 script → 오류', r.errors.some((e) => e.includes('스크립트')))
}
{
  const updated = makeOriginal({ updatedAt: '2026-10-02' })
  const r = validateTranslation(base, 'Body', FILE, updated)
  check('원본이 번역 뒤 갱신 → 경고', r.errors.length === 0 && r.notices.some((n) => n.includes('번역(2026-09-29) 이후 갱신')))
}
{
  const r = validateTranslation({ ...base, title: '정동영 says' }, '국회 said (정동영) fine', FILE, makeOriginal())
  check('title 한글 → 경고', r.notices.some((n) => n.startsWith('title에 한글')))
  check('본문 괄호 밖 한글 → 경고', r.notices.some((n) => n.startsWith('본문에 한글') && n.includes('국회') && !n.includes('정동영')))
}
{
  const r = validateTranslation(
    { ...base, title: 'Chung Dong-young (정동영) says', description: 'Minister Kang Sin-cheol (강신철)' },
    'See [a post](/post/abc) by Chun Ha-ram (천하람) and （전각 괄호） text.',
    FILE,
    makeOriginal(),
  )
  check('괄호 안 병기만 → 한글 경고 없음', !r.notices.some((n) => n.includes('한글')), r.notices.join(' / '))
}

// --- hangulOutsideParentheses ---
check('중첩 괄호', hangulOutsideParentheses('A (B (한글) C) D').length === 0)
check('괄호 밖 한글 검출', hangulOutsideParentheses('Hello 세계 (괄호)').join() === '세계')
check('한글 없음', hangulOutsideParentheses('plain English').length === 0)

// --- renderEnglishMarkdown ---
async function markdownChecks(): Promise<void> {
  const has = (id: string) => id === 'translated-post'
  const html = await renderEnglishMarkdown(
    [
      '[t](/post/translated-post)',
      '[t2](/post/translated-post#heading)',
      '[u](/post/untranslated-post)',
      '[ext](https://example.com/post/translated-post)',
      '[tag](/tag/dmz)',
      '[about](/about)',
      '[nested](/post/translated-post/extra)',
    ].join(' · '),
    has,
  )
  check('영어본 있음 → /en/post', html.includes('href="/en/post/translated-post"'), html)
  check('해시 보존', html.includes('href="/en/post/translated-post#heading"'), html)
  check('영어본 없음 → 한국어 링크 유지', html.includes('href="/post/untranslated-post"'), html)
  check('외부 링크 불변 + 새 창 영어 안내', html.includes('href="https://example.com/post/translated-post"') && html.includes('(opens in a new tab)'), html)
  check('다른 내부 경로 불변', html.includes('href="/tag/dmz"') && html.includes('href="/about"'), html)
  check('형태가 다른 경로 불변', html.includes('href="/post/translated-post/extra"'), html)

  const ko = await renderMarkdown('[t](/post/translated-post) [ext](https://example.com)')
  check('한국어 렌더 — 치환 없음·새 창 한국어 안내', ko.includes('href="/post/translated-post"') && ko.includes('(새 창에서 열림)'), ko)

  const xss = await renderEnglishMarkdown('[x](javascript:alert(1)) <img src=x onerror=alert(1)>', has)
  check('javascript: 링크·HTML 제거', !xss.includes('javascript:') && !xss.includes('onerror'), xss)
}

// --- formatDate ---
check('영어 날짜', formatDate('2026-09-29', 'en') === 'Sep 29, 2026')
check('영어 날짜 1월 한 자리', formatDate('2026-01-05', 'en') === 'Jan 5, 2026')
check('영어 날짜 12월', formatDate('2026-12-31', 'en') === 'Dec 31, 2026')
check('한국어 날짜(기존 표기)', formatDate('2026-09-21', 'ko') === '2026년 9월 21일')

markdownChecks().then(() => {
  console.log(`케이스 ${passed + failures.length}개 · 통과 ${passed} · 실패 ${failures.length}`)
  for (const failure of failures) console.log(`✗ ${failure}`)
  process.exit(failures.length > 0 ? 1 : 0)
})
