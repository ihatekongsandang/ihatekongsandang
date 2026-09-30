/**
 * 영어본 `attribution` 선택 필드·혼합 언어 표기 케이스 검사 (프로그래머 05-1).
 *
 * 사용: npx tsx --tsconfig docs/tools/programmer-05-1/tsconfig.json docs/tools/programmer-05-1/unit-checks.tsx
 *   (저장소 tsconfig는 `jsx: preserve`라 컴포넌트를 직접 렌더하려면 이 설정이 필요하다)
 *
 * - validateTranslation: attribution 선택·한글 섞임 경고·핸들 누락 경고·상속 필드 경고에서 빠짐
 * - localizePost: attribution 있으면 영어 표기, 없으면 원본 값
 * - langForTranslatable·stripParentheses: 괄호 안 병기만 있는 영어 표기는 요소 전체 lang 없음
 * - MixedLangText: 한국어 페이지 출력은 문자열 그대로, 영어 표기는 괄호 안 한국어만 `lang="ko"`
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { MixedLangText } from '../../../src/components/mixed-lang-text'
import type { Post } from '../../../src/lib/content/schema'
import { localizePost, validateTranslation } from '../../../src/lib/content/translation'
import { langFor, langForTranslatable, stripParentheses } from '../../../src/lib/i18n'

let passed = 0
const failures: string[] = []

function check(name: string, condition: boolean, detail = ''): void {
  if (condition) passed += 1
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
}

const ID = 'sample-post'
const FILE = `${ID}.md`
const ORIGINAL_ATTRIBUTION = '인스타그램 @im_nowandhere (나우앤히어)'

function makeOriginal(overrides: Partial<Post> = {}): Post {
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

const base = { id: ID, title: 'English title', description: 'English description', translatedAt: '2026-09-29' }

// --- validateTranslation · localizePost ---
{
  const r = validateTranslation(base, 'Body', FILE, makeOriginal())
  check('attribution 없음 → 통과·경고 0(선택 필드)', r.errors.length === 0 && r.notices.length === 0, r.notices.join(' / '))
  check('attribution 없음 → 원본 값', localizePost(makeOriginal(), r.translation!).attribution === ORIGINAL_ATTRIBUTION)
}
{
  const given = 'Instagram @im_nowandhere (나우앤히어)'
  const r = validateTranslation({ ...base, attribution: given }, 'Body', FILE, makeOriginal())
  check('attribution 영어 표기 → 통과·경고 0', r.errors.length === 0 && r.notices.length === 0, r.notices.join(' / '))
  check('attribution 반영', localizePost(makeOriginal(), r.translation!).attribution === given)
  check('상속 필드 경고에 attribution 없음', !r.notices.some((n) => n.includes('`attribution`는 한국어 원본 값')))
}
{
  const r = validateTranslation({ ...base, attribution: '  ' }, 'Body', FILE, makeOriginal())
  check('attribution 공백 → 원본 값', r.errors.length === 0 && localizePost(makeOriginal(), r.translation!).attribution === ORIGINAL_ATTRIBUTION)
}
{
  const r = validateTranslation({ ...base, attribution: '인스타그램 @im_nowandhere' }, 'Body', FILE, makeOriginal())
  check('attribution 괄호 밖 한글 → 경고', r.notices.some((n) => n.startsWith('attribution에 한글이 섞여')), r.notices.join(' / '))
  check('attribution 한글 경고는 빌드를 막지 않음', r.errors.length === 0)
}
{
  const r = validateTranslation({ ...base, attribution: 'Instagram (나우앤히어)' }, 'Body', FILE, makeOriginal())
  check('원본 핸들 누락 → 경고', r.notices.some((n) => n.startsWith('attribution: 한국어 원본의 계정 핸들 @im_nowandhere')), r.notices.join(' / '))
}
{
  const r = validateTranslation({ ...base, attribution: 'Instagram @IM_NOWANDHERE (나우앤히어)' }, 'Body', FILE, makeOriginal())
  check('핸들 표기 변경(대소문자) → 경고', r.notices.some((n) => n.startsWith('attribution: 한국어 원본의 계정 핸들')))
}
{
  const original = makeOriginal({ attribution: '예시신문' })
  const r = validateTranslation({ ...base, attribution: 'Example Daily' }, 'Body', FILE, original)
  check('핸들 없는 원본 → 핸들 경고 없음', r.errors.length === 0 && r.notices.length === 0, r.notices.join(' / '))
}

// --- stripParentheses · langForTranslatable ---
check('중첩 괄호 제거', !/[가-힣]/.test(stripParentheses('A (B (한글) C) D')))
check('전각 괄호 제거', !/[가-힣]/.test(stripParentheses('A （한글） B')))
check('영어 표기 + 괄호 병기 → lang 없음', langForTranslatable('Instagram @im_nowandhere (나우앤히어)', 'en') === undefined)
check('원본 한국어 값 → lang="ko"', langForTranslatable(ORIGINAL_ATTRIBUTION, 'en') === 'ko')
check('한국어 페이지 → 항상 lang 없음', langForTranslatable(ORIGINAL_ATTRIBUTION, 'ko') === undefined)
check('영어만 → lang 없음', langForTranslatable('Instagram', 'en') === undefined)
check('langFor 기존 동작 유지', langFor(ORIGINAL_ATTRIBUTION, 'en') === 'ko' && langFor(ORIGINAL_ATTRIBUTION, 'ko') === undefined)

// --- MixedLangText ---
const html = (node: React.ReactElement) => renderToStaticMarkup(node)
check('한국어 페이지 출력 = 문자열 그대로', html(<MixedLangText text={ORIGINAL_ATTRIBUTION} locale="ko" />) === ORIGINAL_ATTRIBUTION)
check('영어 페이지 · 원본 한국어 값 → 나누지 않음', html(<MixedLangText text={ORIGINAL_ATTRIBUTION} locale="en" />) === ORIGINAL_ATTRIBUTION)
{
  const out = html(<MixedLangText text="Instagram @im_nowandhere (나우앤히어)" locale="en" />)
  check('영어 표기 → 괄호 안만 lang="ko"', out === 'Instagram @im_nowandhere <span lang="ko">(나우앤히어)</span>', out)
}
check('영어만 → 그대로', html(<MixedLangText text="Instagram" locale="en" />) === 'Instagram')
{
  const out = html(<MixedLangText text="Lawmaker (○○당)" locale="en" prefix=" · " />)
  check('prefix + 괄호 병기', out === ' · Lawmaker <span lang="ko">(○○당)</span>', out)
}
check('prefix + 한국어 값 → 한 덩어리', html(<MixedLangText text="○○당 국회의원" locale="en" prefix=" · " />) === ' · ○○당 국회의원')
check('prefix + 한국어 페이지 → 한 덩어리', html(<MixedLangText text="○○당 국회의원" locale="ko" prefix=" · " />) === ' · ○○당 국회의원')

console.log(`케이스 ${passed + failures.length}개 · 통과 ${passed} · 실패 ${failures.length}`)
for (const failure of failures) console.log(`✗ ${failure}`)
process.exit(failures.length > 0 ? 1 : 0)
