/**
 * 프로그래머 20 — 대표 이미지 라이선스 확대(CC BY-SA·BY-ND·한국판 2.0 KR·PD 근거) 검증·표시·카드 검사.
 * 기획 20-1 §2 명세 12 테스트 항목 ①~⑪ 전부(⑪ copy-exact는 `copy-exact-about.py`, ⑩은 이 파일 + `build-artifact-check.mjs`).
 *
 * 사용(저장소 루트): npx tsx --tsconfig docs/tools/programmer-20/tsconfig.json docs/tools/programmer-20/unit-checks.tsx
 *
 * 테스트 주소는 예시 도메인(`example.org`·`example.com`)과 creativecommons.org 라이선스 문서·위키미디어 호스트 이름만 쓴다.
 * 저작자·저작물명은 모두 가상 값("예시 작가" 등)이다. 실제 사진·저작자 이름은 없다.
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { CardMedia } from '../../../src/components/card-media'
import { PostDetail } from '../../../src/components/post-detail'
import {
  OPEN_LICENSES,
  IMAGE_LICENSES,
  pdExpiredMaxYear,
  resolveCardMedia,
  validatePost,
  type Post,
} from '../../../src/lib/content/schema'
import { localizePost, validateTranslation } from '../../../src/lib/content/translation'
import { toCardView } from '../../../src/lib/content/view'
import { collectionJsonLd, postJsonLd } from '../../../src/lib/seo'
import { feedOrder, imageReuseNotices, type ReuseEntry } from '../../../scripts/image-reuse'

let passed = 0
const failures: string[] = []
function check(name: string, condition: boolean, detail = ''): void {
  if (condition) passed += 1
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
}

const ID = 'sample-post'
const FILE = `${ID}.md`
const ARTICLE = 'https://news.example.org/article/1'
const ORIGINAL = 'https://archive.example.org/photo/view/1'
const CC = (path: string) => `https://creativecommons.org${path}`
const PD_BASIS = 'https://archive.example.org/pd-basis/1'
const CAPTION = '자료사진: 예시 청사(2019) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.'
const EN_CAPTION = 'Archive photo: the Example Government Complex (2019) — not taken at the time of this event. It may differ from how it looks today.'
const TODAY = '2026-11-12'

function base(image?: Record<string, unknown>, extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: ID,
    title: '예시 제목',
    description: '예시 요약',
    publishedAt: '2026-11-11',
    sourceType: 'url',
    sourceUrl: 'https://www.example.com/post/1',
    attribution: '예시 출처',
    sources: [{ type: '언론', name: '예시일보', url: ARTICLE, date: '2026-11-10' }],
    tags: ['예시'],
    ...(image ? { image } : {}),
    ...extra,
  }
}
const OPEN_CC4 = {
  kind: 'open',
  src: '/images/sample-post/thumb.jpg',
  alt: '예시 청사 건물 정면',
  caption: CAPTION,
  creditName: '예시 작가',
  creditNameEn: 'Example Author',
  sourcePageUrl: ORIGINAL,
  license: 'cc-by-4.0',
  licenseUrl: CC('/licenses/by/4.0/'),
  workTitle: '예시 청사 전경',
  workYear: 2019,
  sourceSiteName: '공유마당',
  retrievedAt: '2026-11-11',
  faceNote: '얼굴 없음(자료사진·건물)',
}
const PUBLIC = {
  kind: 'public',
  src: '/images/sample-post/thumb.jpg',
  alt: '예시 기관 청사 전경',
  caption: '2026년 11월 예시부 청사 전경(원 페이지 설명 기준).',
  creditName: '예시부',
  creditNameEn: 'Ministry of Example',
  sourcePageUrl: 'https://www.example.com/kogl/photo/1',
  license: 'kogl-1',
  retrievedAt: '2026-11-09',
  faceNote: '얼굴 없음(건물)',
}
const run = (data: Record<string, unknown>, today = TODAY) => validatePost(data, '', FILE, { localImageExists: () => true, today })
const open = (patch: Record<string, unknown>, drop: string[] = []) => {
  const image: Record<string, unknown> = { ...OPEN_CC4, ...patch }
  for (const key of drop) delete image[key]
  return image
}
const errorsOf = (image: Record<string, unknown>, today = TODAY) => run(base(image), today).errors
const noticesOf = (image: Record<string, unknown>, today = TODAY) => run(base(image), today).notices
const has = (list: string[], needle: string) => list.some((line) => line.includes(needle))
const PD = (basis: string | undefined, year?: string | number, extra: Record<string, unknown> = {}) =>
  open({ license: 'pd', licenseUrl: PD_BASIS, ...(basis ? { pdBasis: basis } : {}), ...(year !== undefined ? { pdBasisYear: year } : {}), ...extra })

// 새 license 값 8개와 각 경로 머리
const NEW_VALUES: [string, string][] = [
  ['cc-by-sa-2.0', '/licenses/by-sa/2.0/'],
  ['cc-by-sa-3.0', '/licenses/by-sa/3.0/'],
  ['cc-by-sa-4.0', '/licenses/by-sa/4.0/'],
  ['cc-by-nd-2.0', '/licenses/by-nd/2.0/'],
  ['cc-by-nd-3.0', '/licenses/by-nd/3.0/'],
  ['cc-by-nd-4.0', '/licenses/by-nd/4.0/'],
  ['cc-by-2.0-kr', '/licenses/by/2.0/kr/'],
  ['cc-by-sa-2.0-kr', '/licenses/by-sa/2.0/kr/'],
]

// ─── ① 새 license 값 8개 통과 + 종류·버전 불일치 거부 ───
{
  check('① OPEN_LICENSES 14개', OPEN_LICENSES.length === 14, String(OPEN_LICENSES.length))
  check('① IMAGE_LICENSES 15개(kogl-1 포함)', IMAGE_LICENSES.length === 15, String(IMAGE_LICENSES.length))
  for (const [value, head] of NEW_VALUES) {
    check(`① ${value} 목록에 있음`, (OPEN_LICENSES as readonly string[]).includes(value))
    const r = run(base(open({ license: value, licenseUrl: CC(head) })))
    check(`① ${value} 통과`, r.errors.length === 0 && r.post?.image?.license === value, r.errors.join(' | '))
    check(`① ${value} 경고 0`, r.notices.length === 0, r.notices.join(' | '))
  }
  check('① 한국판 ND 값 없음', !(OPEN_LICENSES as readonly string[]).includes('cc-by-nd-2.0-kr'))
  const mismatches: [string, string][] = [
    ['cc-by-sa-4.0', '/licenses/by/4.0/'],
    ['cc-by-sa-4.0', '/licenses/by-sa/3.0/'],
    ['cc-by-nd-4.0', '/licenses/by-sa/4.0/'],
    ['cc-by-nd-3.0', '/licenses/by-nd/4.0/'],
    ['cc-by-4.0', '/licenses/by-sa/4.0/'],
    ['cc-by-4.0', '/licenses/by-nd/4.0/'],
    ['cc-by-sa-2.0', '/licenses/by/2.0/'],
    ['cc-by-2.0-kr', '/licenses/by-sa/2.0/kr/'],
    ['cc-by-sa-2.0-kr', '/licenses/by/2.0/kr/'],
  ]
  for (const [value, path] of mismatches) {
    const errors = errorsOf(open({ license: value, licenseUrl: CC(path) }))
    check(`① ${value} + ${path} 거부(licenseUrl)`, has(errors, 'licenseUrl'), errors.join(' | '))
  }
  check('① cc-by-sa-4.0 + 다른 호스트 거부', has(errorsOf(open({ license: 'cc-by-sa-4.0', licenseUrl: 'https://example.org/licenses/by-sa/4.0/' })), 'licenseUrl'))
}

// ─── ② deed·legalcode·언어 접미·끝 / 통과, kr/·igo/·us/ 거부, 한국판 값의 국제판 URL 거부 ───
{
  const tails = ['', 'deed', 'deed/', 'deed.ko', 'deed.en', 'legalcode', 'legalcode/', 'legalcode.ko', 'deed.zh-hant']
  for (const [value, head] of [['cc-by-4.0', '/licenses/by/4.0/'], ['cc-by-sa-3.0', '/licenses/by-sa/3.0/'], ['cc-by-nd-2.0', '/licenses/by-nd/2.0/'], ['cc-by-2.0-kr', '/licenses/by/2.0/kr/'], ['cc-by-sa-2.0-kr', '/licenses/by-sa/2.0/kr/'], ['cc0-1.0', '/publicdomain/zero/1.0/']] as const) {
    for (const tail of tails) {
      const errors = errorsOf(open({ license: value, licenseUrl: CC(head + tail) }))
      check(`② ${value} ${head}${tail} 통과`, errors.length === 0, errors.join(' | '))
    }
  }
  check('② www.creativecommons.org도 통과', errorsOf(open({ licenseUrl: 'https://www.creativecommons.org/licenses/by/4.0/deed.ko' })).length === 0)
  check('② 머리 끝 / 없이(…/by/4.0) 거부(경로 머리 불일치)', has(errorsOf(open({ licenseUrl: CC('/licenses/by/4.0') })), 'licenseUrl'))
  const rejects: [string, string][] = [
    ['cc-by-2.0', '/licenses/by/2.0/kr/'],
    ['cc-by-2.0', '/licenses/by/2.0/kr/deed.ko'],
    ['cc-by-3.0', '/licenses/by/3.0/igo/'],
    ['cc-by-3.0', '/licenses/by/3.0/us/'],
    ['cc-by-sa-2.0', '/licenses/by-sa/2.0/kr/'],
    ['cc-by-sa-3.0', '/licenses/by-sa/3.0/igo/'],
    ['cc-by-nd-3.0', '/licenses/by-nd/3.0/us/'],
    ['cc-by-4.0', '/licenses/by/4.0/deed.ko/extra'],
    ['cc-by-4.0', '/licenses/by/4.0/legalcode.txt'],
    ['cc-by-4.0', '/licenses/by/4.0/foo'],
    ['cc-by-2.0-kr', '/licenses/by/2.0/'],
    ['cc-by-2.0-kr', '/licenses/by/2.0/deed.ko'],
    ['cc-by-sa-2.0-kr', '/licenses/by-sa/2.0/'],
    ['cc-by-sa-2.0-kr', '/licenses/by-sa/2.0/legalcode'],
    ['cc-by-2.0-kr', '/licenses/by/2.0/kr/igo/'],
  ]
  for (const [value, path] of rejects) {
    const errors = errorsOf(open({ license: value, licenseUrl: CC(path) }))
    check(`② ${value} + ${path} 거부`, has(errors, 'licenseUrl'), errors.join(' | '))
  }
  // 기증 CC BY 4.0 표시도 같은 규칙
  check('② 기증(CC BY 4.0 표시) + …/by/4.0/legalcode.ko 통과', errorsOf(open({ license: 'kcc-donated', licenseLabel: 'CC BY 4.0', licenseUrl: CC('/licenses/by/4.0/legalcode.ko') })).length === 0)
  check('② 기증(CC BY 4.0 표시) + …/by/4.0/igo/ 거부', has(errorsOf(open({ license: 'kcc-donated', licenseLabel: 'CC BY 4.0', licenseUrl: CC('/licenses/by/4.0/igo/') })), 'licenseUrl'))
}

// ─── ③ 거부 값과 메시지 ───
{
  const reject = (value: string) => errorsOf(open({ license: value })).find((line) => line.includes('.license:')) ?? ''
  const cases: [string, string][] = [
    ['cc-by-nc-4.0', '허용 라이선스가 아닙니다(상업 이용 금지)'],
    ['cc-by-nc-sa-4.0', '허용 라이선스가 아닙니다(상업 이용 금지)'],
    ['cc-by-nc-nd-3.0', '허용 라이선스가 아닙니다(상업 이용 금지)'],
    ['cc-by-2.0-de', 'CC 지역판은 한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용합니다(그 밖은 조문 확인 전)'],
    ['cc-by-sa-3.0-de', 'CC 지역판은 한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용합니다(그 밖은 조문 확인 전)'],
    ['cc-by-nd-2.0-kr', 'CC 지역판은 한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용합니다(그 밖은 조문 확인 전)'],
    ['cc-by-3.0-kr', 'CC 지역판은 한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용합니다(그 밖은 조문 확인 전)'],
    ['cc-by-sa', '버전을 적으세요'],
    ['cc-by-nd', '버전을 적으세요'],
    ['cc-by', '버전을 적으세요'],
    ['CC BY-SA', '버전을 적으세요'],
    ['kogl-1', '공공누리는 kind `public`에 씁니다'],
    ['cc-by-5.0', '허용 라이선스가 아닙니다'],
  ]
  for (const [value, message] of cases) {
    const line = reject(value)
    check(`③ ${value} 거부 + "${message}"`, line.includes(message), line)
  }
  check('③ BY-SA 메시지에 "BY-SA·BY-NC·BY-ND는 허용 라이선스가 아닙니다"(옛 문구) 0', !reject('cc-by-sa').includes('BY-SA·BY-NC·BY-ND'))
  check('③ cc-by-nc-4.0 메시지에 지역판 문구 0', !reject('cc-by-nc-4.0').includes('지역판'))
}

// ─── ④ pd: pdBasis·pdBasisYear·licenseLabel·us-gov 경고 ───
{
  const maxYear = pdExpiredMaxYear(2026)
  check('④ max(1962, 2026−71) = 1962', maxYear === 1962, String(maxYear))
  check('④ max(1962, 2034−71) = 1963', pdExpiredMaxYear(2034) === 1963)
  check('④ max(1962, 2040−71) = 1969', pdExpiredMaxYear(2040) === 1969)

  for (const basis of ['us-gov', 'declared']) {
    const r = run(base(PD(basis, undefined, basis === 'us-gov' ? { creditNotice: '기관의 보증을 뜻하지 않습니다.' } : {})))
    check(`④ pd ${basis} 통과`, r.errors.length === 0 && r.post?.image?.pdBasis === basis, r.errors.join(' | '))
  }
  for (const basis of ['expired-author-death', 'expired-publication']) {
    const r = run(base(PD(basis, 1962)))
    check(`④ pd ${basis} 1962(양성) 통과`, r.errors.length === 0 && r.post?.image?.pdBasisYear === '1962', r.errors.join(' | '))
    check(`④ pd ${basis} "1950" 문자열 통과`, errorsOf(PD(basis, '1950')).length === 0)
    const r63 = errorsOf(PD(basis, 1963))
    check(`④ pd ${basis} 1963(경계 음성) 거부`, has(r63, 'pdBasisYear') && has(r63, '1962년 이전'), r63.join(' | '))
    check(`④ pd ${basis} 2034년 기준 1963 통과(context.today 주입)`, errorsOf(PD(basis, 1963), '2034-01-01').length === 0, errorsOf(PD(basis, 1963), '2034-01-01').join(' | '))
    check(`④ pd ${basis} 2034년 기준 1964 거부`, has(errorsOf(PD(basis, 1964), '2034-01-01'), 'pdBasisYear'))
    const missing = errorsOf(PD(basis))
    check(`④ pd ${basis} pdBasisYear 없음 거부`, has(missing, 'pdBasisYear') && has(missing, '필수'), missing.join(' | '))
    check(`④ pd ${basis} pdBasisYear 형식 오류(195) 거부`, has(errorsOf(PD(basis, '195')), '4자리'))
  }
  const noBasis = errorsOf(PD(undefined))
  check('④ pd pdBasis 없음 거부', has(noBasis, 'pdBasis') && has(noBasis, '필수'), noBasis.join(' | '))
  check('④ pd pdBasis 값 오류 거부', has(errorsOf(PD('pd-old-assumed')), 'pdBasis'))
  check('④ pd licenseUrl 없음 거부', has(errorsOf(PD('declared', undefined, { licenseUrl: undefined })), 'licenseUrl'))
  const label = errorsOf(PD('declared', undefined, { licenseLabel: '보호기간 만료' }))
  check('④ pd licenseLabel 사용 오류', has(label, 'licenseLabel') && has(label, 'pd'), label.join(' | '))
  check('④ kcc-donated licenseLabel은 그대로 허용', errorsOf(open({ license: 'kcc-donated', licenseLabel: 'CC BY 4.0' })).length === 0)
  check('④ pd us-gov에 pdBasisYear → 무시 알림', has(noticesOf(PD('us-gov', 1950, { creditNotice: 'x' })), 'pdBasisYear는'))
  check('④ cc-by-4.0에 pdBasis → 알림(무시)', has(noticesOf(open({ pdBasis: 'us-gov' })), 'pdBasis는 `license: pd`에서만'))
  check('④ cc-by-4.0에 pdBasis → 오류 아님', errorsOf(open({ pdBasis: 'us-gov' })).length === 0)
  check('④ cc-by-4.0에 pdBasisYear → 알림', has(noticesOf(open({ pdBasisYear: 1950 })), 'pdBasisYear는 `license: pd`에서만'))
  // us-gov 경고
  for (const host of ['https://commons.wikimedia.org/wiki/File:Example.jpg', 'https://upload.wikimedia.org/x.jpg', 'https://en.wikipedia.org/wiki/File:Example.jpg']) {
    check(`④ us-gov 위키미디어 호스트 경고 ${new URL(host).hostname}`, has(noticesOf(PD('us-gov', undefined, { licenseUrl: host, creditNotice: 'x' })), '원 기관 페이지'))
  }
  check('④ us-gov 기관 페이지면 호스트 경고 0', !has(noticesOf(PD('us-gov', undefined, { creditNotice: 'x' })), '원 기관 페이지'))
  check('④ us-gov creditNotice 공란 경고', has(noticesOf(PD('us-gov')), '보증 부인 문구'))
  check('④ us-gov creditNotice 있으면 경고 0', !has(noticesOf(PD('us-gov', undefined, { creditNotice: '기관의 보증을 뜻하지 않습니다.' })), '보증 부인 문구'))
  check('④ declared는 creditNotice 공란 경고 0', !has(noticesOf(PD('declared')), '보증 부인 문구'))
  check('④ 정규화: pd 결과에 licenseLabel 없음', run(base(PD('declared'))).post?.image?.licenseLabel === undefined)
}

// ─── 공통 렌더 도우미 ───
function detail(post: Post, locale: 'ko' | 'en'): string {
  return renderToStaticMarkup(<PostDetail post={post} body="" locale={locale} />)
}
function figcaption(html: string): string {
  return html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
}
function paragraphs(fig: string): string[] {
  return [...fig.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => m[1] as string)
}
function visible(fragment: string): string {
  return fragment
    .replace(/<span class="sr-only">[\s\S]*?<\/span>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
}
function links(fragment: string): { href: string; rel: string; target: string; text: string }[] {
  return [...fragment.matchAll(/<a ([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: m[1]?.match(/href="([^"]*)"/)?.[1] ?? '',
    rel: m[1]?.match(/rel="([^"]*)"/)?.[1] ?? '',
    target: m[1]?.match(/target="([^"]*)"/)?.[1] ?? '',
    text: visible(m[2] as string).trim(),
  }))
}
function enPost(ko: Post, caption = EN_CAPTION): Post {
  const tr = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'The Example building', imageCaption: caption, translatedAt: TODAY }, '', FILE, ko)
  if (!tr.translation) throw new Error(tr.errors.join(' | '))
  return localizePost(ko, tr.translation)
}

// ─── ⑤ 렌더: BY-SA·BY-ND·한국판·pd 4종 ko·en + open caption ───
interface DisplayCase {
  label: string
  image: Record<string, unknown>
  ko: string
  en: string
  hrefs: string[]
  koLinks: string[]
  enLinks: string[]
  notice?: string
}
const SUFFIX_KO = ' (변경 없음·크기 조정 외)'
const SUFFIX_EN = ' (unmodified except resizing)'
const CASES: DisplayCase[] = [
  ...(['2.0', '3.0', '4.0'] as const).flatMap((version) =>
    (['sa', 'nd'] as const).map((kind) => ({
      label: `CC BY-${kind.toUpperCase()} ${version}`,
      image: open({ license: `cc-by-${kind}-${version}`, licenseUrl: CC(`/licenses/by-${kind}/${version}/`) }),
      ko: `사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY-${kind.toUpperCase()} ${version}${SUFFIX_KO} · 원 페이지 · 라이선스`,
      en: `Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY-${kind.toUpperCase()} ${version}${SUFFIX_EN} · Original · License`,
      hrefs: [ORIGINAL, CC(`/licenses/by-${kind}/${version}/`)],
      koLinks: ['원 페이지', '라이선스'],
      enLinks: ['Original', 'License'],
    })),
  ),
  {
    label: 'CC BY 2.0 KR',
    image: open({ license: 'cc-by-2.0-kr', licenseUrl: CC('/licenses/by/2.0/kr/') }),
    ko: '사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY 2.0 KR · 원 페이지 · 라이선스',
    en: 'Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY 2.0 KR · Original · License',
    hrefs: [ORIGINAL, CC('/licenses/by/2.0/kr/')],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'CC BY-SA 2.0 KR',
    image: open({ license: 'cc-by-sa-2.0-kr', licenseUrl: CC('/licenses/by-sa/2.0/kr/deed.ko') }),
    ko: `사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY-SA 2.0 KR${SUFFIX_KO} · 원 페이지 · 라이선스`,
    en: `Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY-SA 2.0 KR${SUFFIX_EN} · Original · License`,
    hrefs: [ORIGINAL, CC('/licenses/by-sa/2.0/kr/deed.ko')],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'CC BY-SA 4.0 workYear 생략',
    image: open(
      { license: 'cc-by-sa-4.0', licenseUrl: CC('/licenses/by-sa/4.0/'), caption: '자료사진: 예시 청사(촬영 연도 미상) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.' },
      ['workYear'],
    ),
    ko: `사진: 예시 작가, 「예시 청사 전경」 · 공유마당 / CC BY-SA 4.0${SUFFIX_KO} · 원 페이지 · 라이선스`,
    en: `Photo: Example Author, "예시 청사 전경" · 공유마당 / CC BY-SA 4.0${SUFFIX_EN} · Original · License`,
    hrefs: [ORIGINAL, CC('/licenses/by-sa/4.0/')],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'CC BY 4.0(불변 — 접미 없음)',
    image: OPEN_CC4,
    ko: '사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY 4.0 · 원 페이지 · 라이선스',
    en: 'Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY 4.0 · Original · License',
    hrefs: [ORIGINAL, CC('/licenses/by/4.0/')],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'CC0(불변)',
    image: open({ license: 'cc0-1.0', licenseUrl: CC('/publicdomain/zero/1.0/') }),
    ko: '사진: 예시 작가(CC0 1.0 — 저작권 포기) · 원 페이지 · 라이선스',
    en: 'Photo: Example Author (CC0 1.0 — public domain dedication) · Original · License',
    hrefs: [ORIGINAL, CC('/publicdomain/zero/1.0/')],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'pd us-gov',
    image: PD('us-gov', undefined, { creditName: '예시 기관', creditNameEn: 'Example Agency', creditNotice: 'Appearance does not imply endorsement.' }),
    ko: '사진: 예시 기관 (미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)) · 원 페이지 · 근거 페이지',
    en: 'Photo: Example Agency (US federal government work — public domain in the United States (17 U.S.C. § 105)) · Original · Basis page',
    hrefs: [ORIGINAL, PD_BASIS],
    koLinks: ['원 페이지', '근거 페이지'],
    enLinks: ['Original', 'Basis page'],
    notice: 'Appearance does not imply endorsement.',
  },
  {
    label: 'pd expired-author-death',
    image: PD('expired-author-death', 1950),
    ko: '사진: 예시 작가 (퍼블릭 도메인 — 저작자 1950 사망, 보호기간 만료) · 원 페이지 · 근거 페이지',
    en: 'Photo: Example Author (Public domain — author died in 1950; the copyright term has expired) · Original · Basis page',
    hrefs: [ORIGINAL, PD_BASIS],
    koLinks: ['원 페이지', '근거 페이지'],
    enLinks: ['Original', 'Basis page'],
  },
  {
    label: 'pd expired-publication',
    image: PD('expired-publication', 1955),
    ko: '사진: 예시 작가 (퍼블릭 도메인 — 1955 공표, 보호기간 만료) · 원 페이지 · 근거 페이지',
    en: 'Photo: Example Author (Public domain — published in 1955; the copyright term has expired) · Original · Basis page',
    hrefs: [ORIGINAL, PD_BASIS],
    koLinks: ['원 페이지', '근거 페이지'],
    enLinks: ['Original', 'Basis page'],
  },
  {
    label: 'pd declared',
    image: PD('declared'),
    ko: '사진: 예시 작가 (저작자가 퍼블릭 도메인으로 공개함) · 원 페이지 · 근거 페이지',
    en: 'Photo: Example Author (Dedicated to the public domain by the author) · Original · Basis page',
    hrefs: [ORIGINAL, PD_BASIS],
    koLinks: ['원 페이지', '근거 페이지'],
    enLinks: ['Original', 'Basis page'],
  },
]
for (const c of CASES) {
  const r = run(base(c.image))
  if (!r.post) {
    check(`⑤ ${c.label}: 검증 통과`, false, r.errors.join(' | '))
    continue
  }
  const variants: ['ko' | 'en', Post, string, string[]][] = [
    ['ko', r.post, c.ko, c.koLinks],
    ['en', enPost(r.post), c.en, c.enLinks],
  ]
  for (const [locale, post, expected, linkTexts] of variants) {
    const fig = figcaption(detail(post, locale))
    const ps = paragraphs(fig)
    const captionText = locale === 'ko' ? (c.image.caption as string) : EN_CAPTION
    check(`⑤ ${c.label} ${locale}: figcaption 첫 줄 = open caption`, visible(ps[0] ?? '') === captionText, visible(ps[0] ?? ''))
    check(`⑤ ${c.label} ${locale}: 둘째 줄 크레딧 글자 그대로`, visible(ps[1] ?? '') === expected, `\n   exp=${expected}\n   got=${visible(ps[1] ?? '')}`)
    check(`⑤ ${c.label} ${locale}: 줄 수`, ps.length === (c.notice ? 3 : 2), String(ps.length))
    if (c.notice) check(`⑤ ${c.label} ${locale}: 셋째 줄 creditNotice(보증 부인 문구)`, visible(ps[2] ?? '') === c.notice, visible(ps[2] ?? ''))
    const ls = links(ps[1] ?? '')
    check(`⑤ ${c.label} ${locale}: 두 링크 href`, JSON.stringify(ls.map((l) => l.href)) === JSON.stringify(c.hrefs), JSON.stringify(ls.map((l) => l.href)))
    check(`⑤ ${c.label} ${locale}: 링크 문구`, JSON.stringify(ls.map((l) => l.text)) === JSON.stringify(linkTexts), JSON.stringify(ls.map((l) => l.text)))
    check(`⑤ ${c.label} ${locale}: rel·target`, ls.every((l) => l.rel === 'noopener' && l.target === '_blank'))
  }
}
{
  // us-gov 문구는 "미국에서" 한정 — 단정형 "퍼블릭 도메인 — 미국 연방정부 직원" 옛 문구 0
  const r = run(base(PD('us-gov', undefined, { creditNotice: 'x' })))
  if (!r.post) check('⑤ us-gov: 검증 통과', false, r.errors.join(' | '))
  else {
  const ko = visible(paragraphs(figcaption(detail(r.post as Post, 'ko')))[1] ?? '')
  check('⑤ us-gov ko "미국에서 퍼블릭 도메인" 포함', ko.includes('미국에서 퍼블릭 도메인'), ko)
  check('⑤ us-gov ko 옛 문구 "연방정부 직원이 직무로" 0', !ko.includes('직원이 직무로'), ko)
  const en = visible(paragraphs(figcaption(detail(enPost(r.post as Post), 'en')))[1] ?? '')
  check('⑤ us-gov en "public domain in the United States" 포함', en.includes('public domain in the United States'), en)
  }
}

// ─── ⑥ A-2 caption 3형식 ko·en, 접두 없는 caption, 연도 미상 ───
{
  const A2_NOTICE = 'A-2 자료사진은'
  const koForms = [
    '자료사진: 예시 청사(2021) — 이 사건 당시 사진이 아닙니다.',
    '자료사진: 예시 광역 일반 풍경(2021) — 이 사건 지점·당시 사진이 아닙니다.',
    '자료사진: 예시 기종(2021) — 이 사건의 장비가 아닙니다.',
  ]
  for (const caption of koForms) {
    const notices = noticesOf(open({ caption, workYear: 2021 }))
    check(`⑥ ko 형식 통과: ${caption}`, notices.length === 0, notices.join(' | '))
  }
  check('⑥ ko 접두 없는 caption 경고(open)', has(noticesOf(open({ caption: '예시 청사(2021) — 이 사건 당시 사진이 아닙니다.', workYear: 2021 })), A2_NOTICE))
  check('⑥ ko 끝 문구 없는 caption 경고', has(noticesOf(open({ caption: '자료사진: 예시 청사(2021).', workYear: 2021 })), A2_NOTICE))
  check('⑥ ko 연도 미상(workYear 없음) + 현재 모습 문구 없음 → 경고', has(noticesOf(open({ caption: '자료사진: 예시 청사(촬영 연도 미상) — 이 사건 당시 사진이 아닙니다.' }, ['workYear'])), '현재 모습과 다를 수 있습니다'))
  check('⑥ ko 3a 연도 미상 + 문구 없음 → 경고', has(noticesOf(open({ caption: '자료사진: 예시 광역 일반 풍경(촬영 연도 미상) — 이 사건 지점·당시 사진이 아닙니다.' }, ['workYear'])), '현재 모습과 다를 수 있습니다'))
  check('⑥ ko 3a 연도 미상 + 문구 있음 → 경고 0', noticesOf(open({ caption: '자료사진: 예시 광역 일반 풍경(촬영 연도 미상) — 이 사건 지점·당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.' }, ['workYear'])).length === 0)
  check('⑥ ko 3b 장비 연도 미상 — 현재 모습 문구 요구 0', noticesOf(open({ caption: '자료사진: 예시 기종(촬영 연도 미상) — 이 사건의 장비가 아닙니다.' }, ['workYear'])).length === 0, noticesOf(open({ caption: '자료사진: 예시 기종(촬영 연도 미상) — 이 사건의 장비가 아닙니다.' }, ['workYear'])).join(' | '))
  check('⑥ ko 3b 장비 10년 이상 전 — 현재 모습 문구 요구 0', noticesOf(open({ caption: '자료사진: 예시 기종(2001) — 이 사건의 장비가 아닙니다.', workYear: 2001 })).length === 0)
  check('⑥ ko 10년 이상 전(2016) 문구 없음 → 경고', has(noticesOf(open({ caption: '자료사진: 예시 청사(2016) — 이 사건 당시 사진이 아닙니다.', workYear: 2016 })), '10년 이상 전'))
  check('⑥ ko workYear 없음 + 연도 미상 글자 없음 → 경고', has(noticesOf(open({ caption: '자료사진: 예시 청사 — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.' }, ['workYear'])), "'촬영 연도 미상'"))
  // public A-2(caption 접두 판정)
  check('⑥ public 일반 caption(자료사진 접두 없음) → A-2 경고 0', noticesOf(PUBLIC).length === 0, noticesOf(PUBLIC).join(' | '))
  check('⑥ public A-2 정상 caption → 경고 0', noticesOf({ ...PUBLIC, caption: '자료사진: 예시부 청사(2021) — 이 사건 당시 사진이 아닙니다.', workYear: 2021, faceNote: '얼굴 없음(자료사진·건물)' }).length === 0)
  check('⑥ public A-2 형식 틀림 → 경고', has(noticesOf({ ...PUBLIC, caption: '자료사진: 예시부 청사(2021).', workYear: 2021 }), A2_NOTICE))
  check('⑥ public A-2 10년 이상 전 문구 없음 → 경고', has(noticesOf({ ...PUBLIC, caption: '자료사진: 예시부 청사(2010) — 이 사건 당시 사진이 아닙니다.', workYear: 2010 }), '10년 이상 전'))
  check('⑥ public A-2 연도 미상 문구 없음 → 경고', has(noticesOf({ ...PUBLIC, caption: '자료사진: 예시부 청사(촬영 연도 미상) — 이 사건 당시 사진이 아닙니다.' }), '현재 모습과 다를 수 있습니다'))
  check('⑥ public A-2 workYear 없음은 연도 미상 글자 요구 0(public은 workYear 선택)', !has(noticesOf({ ...PUBLIC, caption: '자료사진: 예시부 청사(2021) — 이 사건 당시 사진이 아닙니다.' }), "'촬영 연도 미상'"))
  check('⑥ public A-2 faceNote 얼굴 있음 → 경고', has(noticesOf({ ...PUBLIC, caption: '자료사진: 예시부 청사(2021) — 이 사건 당시 사진이 아닙니다.', workYear: 2021, faceNote: '공인 1명' }), 'faceNote'))
  check('⑥ public 비 A-2 faceNote "공인" → 경고 0', !has(noticesOf({ ...PUBLIC, faceNote: '공인(현직 장관) 공적 활동' }), 'faceNote'))
  // en
  const enNotices = (image: Record<string, unknown>, caption: string) => {
    const ko = run(base(image)).post
    if (!ko) return ['(원본 검증 실패)']
    return validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'A', imageCaption: caption, translatedAt: TODAY }, '', FILE, ko).notices
  }
  const enForms = [
    'Archive photo: the Example building (2021) — not taken at the time of this event.',
    'Archive photo: general view of the Example area (2021) — not the location or time of this event.',
    'Archive photo: the Example model (2021) — not the equipment involved in this event.',
  ]
  for (const caption of enForms) {
    const notices = enNotices(open({ caption: '자료사진: 예시 청사(2021) — 이 사건 당시 사진이 아닙니다.', workYear: 2021 }), caption)
    check(`⑥ en 형식 통과: ${caption}`, notices.length === 0, notices.join(' | '))
  }
  const okKo = open({ caption: '자료사진: 예시 청사(2021) — 이 사건 당시 사진이 아닙니다.', workYear: 2021 })
  check('⑥ en 접두 없음 → 경고', has(enNotices(okKo, 'The Example building (2021) — not taken at the time of this event.'), 'A-2 자료사진 영어 설명'))
  check('⑥ en 3a인데 "general view of" 없음 → 경고', has(enNotices(okKo, 'Archive photo: the Example area (2021) — not the location or time of this event.'), 'A-2 자료사진 영어 설명'))
  check('⑥ en 끝 문구 뒤 마침표 대신 다른 말 → 경고', has(enNotices(okKo, 'Archive photo: the Example building (2021) — not taken at the time of this event, nor the site.'), 'A-2 자료사진 영어 설명'))
  const unknownKo = open({ caption: '자료사진: 예시 청사(촬영 연도 미상) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.' }, ['workYear'])
  check('⑥ en 연도 미상 + 문구 없음 → 경고', has(enNotices(unknownKo, 'Archive photo: the Example building (year unknown) — not taken at the time of this event.'), 'It may differ'))
  check('⑥ en 연도 미상 + 문구 있음 → 경고 0', enNotices(unknownKo, 'Archive photo: the Example building (year unknown) — not taken at the time of this event. It may differ from how it looks today.').length === 0)
  const unknownEquip = open({ caption: '자료사진: 예시 기종(촬영 연도 미상) — 이 사건의 장비가 아닙니다.' }, ['workYear'])
  check('⑥ en 장비 연도 미상 — 문구 요구 0', enNotices(unknownEquip, 'Archive photo: the Example model (year unknown) — not the equipment involved in this event.').length === 0)
  const publicA2 = { ...PUBLIC, caption: '자료사진: 예시부 청사(2021) — 이 사건 당시 사진이 아닙니다.', workYear: 2021, faceNote: '얼굴 없음(자료사진·건물)' }
  check('⑥ en public A-2 형식 틀림 → 경고', has(enNotices(publicA2, 'The Example ministry building in 2021.'), 'A-2 자료사진 영어 설명'))
  check('⑥ en public 비 A-2 → 경고 0', enNotices(PUBLIC, 'The Example ministry building in November 2026.').length === 0)
}

// ─── ⑦ 재사용 6건 초과·인접(같은 날 id 순서 포함) ───
{
  const day = (d: number) => Date.UTC(2026, 0, d)
  const entry = (id: string, d: number, url = 'https://archive.example.org/photo/1', extra: Partial<ReuseEntry> = {}): ReuseEntry => ({
    fileName: `${id}.md`,
    id,
    publishedAtTime: day(d),
    sourcePageUrl: url,
    archive: true,
    ...extra,
  })
  // 피드: 매일 1건(a01..a40), 같은 원본은 6일 간격
  const feed = Array.from({ length: 40 }, (_, i) => ({ id: `a${String(i + 1).padStart(2, '0')}`, publishedAtTime: day(i + 1) }))
  const spaced = (n: number) => Array.from({ length: n }, (_, i) => entry(`a${String(i * 6 + 1).padStart(2, '0')}`, i * 6 + 1))
  const six = imageReuseNotices(spaced(6), feed)
  check('⑦ A-2 같은 원본 6건(간격 6) → 경고 0', six.size === 0, JSON.stringify([...six]))
  const seven = imageReuseNotices(spaced(7), feed)
  check('⑦ A-2 같은 원본 7건 → 7번째(가장 늦은 글)만 경고', seven.size === 1 && (seven.get('a37.md')?.[0] ?? '').includes('7건이 씁니다'), JSON.stringify([...seven]))
  const otherFour = imageReuseNotices(spaced(4).map((e) => ({ ...e, archive: false })), feed)
  check('⑦ 비 A-2 public 4건 → 4번째 경고(3건 유지)', otherFour.size === 1 && otherFour.has('a19.md'), JSON.stringify([...otherFour]))
  // 해시로 묶기
  const hashed = imageReuseNotices([entry('a01', 1, 'https://x.example.org/1', { fileHash: 'h1' }), entry('a03', 3, 'https://x.example.org/2', { fileHash: 'h1' })], feed)
  check('⑦ 주소 달라도 파일 해시 같으면 같은 원본(인접 2칸 경고)', hashed.size === 1 && (hashed.get('a03.md')?.[0] ?? '').includes('2칸'), JSON.stringify([...hashed]))
  const differ = imageReuseNotices([entry('a01', 1, 'https://x.example.org/1', { fileHash: 'h1' }), entry('a03', 3, 'https://x.example.org/2', { fileHash: 'h2' })], feed)
  check('⑦ 주소·해시 모두 다르면 경고 0', differ.size === 0)
  // 인접 경계: 피드 인덱스 차이 4 → 경고, 5 → 경고 0
  const gap4 = imageReuseNotices([entry('a10', 10), entry('a14', 14)], feed)
  check('⑦ 인접 차이 4 → 경고(피드 위쪽=새 글에)', gap4.size === 1 && gap4.has('a14.md'), JSON.stringify([...gap4]))
  const gap5 = imageReuseNotices([entry('a10', 10), entry('a15', 15)], feed)
  check('⑦ 인접 차이 5 → 경고 0', gap5.size === 0, JSON.stringify([...gap5]))
  // 같은 날 id 순서(getAllPosts와 같은 규칙)
  const sameDayFeed = [
    { id: 'b', publishedAtTime: day(5) },
    { id: 'a', publishedAtTime: day(5) },
    { id: 'c', publishedAtTime: day(5) },
    ...['d', 'e', 'f', 'g', 'h'].map((id) => ({ id, publishedAtTime: day(4) })),
  ]
  check('⑦ feedOrder: 같은 날 id 오름차순', feedOrder(sameDayFeed).map((p) => p.id).join('') === 'abcdefgh', feedOrder(sameDayFeed).map((p) => p.id).join(''))
  const sameDay = imageReuseNotices([entry('a', 5), entry('c', 5)], sameDayFeed)
  check('⑦ 같은 날 a·c(피드 0·2) → 2칸 경고는 a에', sameDay.size === 1 && (sameDay.get('a.md')?.[0] ?? '').includes('2칸'), JSON.stringify([...sameDay]))
  const sameDayFar = imageReuseNotices([entry('a', 5), entry('f', 4)], sameDayFeed)
  check('⑦ a(0)·f(5) → 경고 0', sameDayFar.size === 0, JSON.stringify([...sameDayFar]))
  const sameDayNear = imageReuseNotices([entry('a', 5), entry('e', 4)], sameDayFeed)
  check('⑦ a(0)·e(4) → 경고', sameDayNear.size === 1)
  // 메시지에 메인 피드 한계 명시
  check('⑦ 인접 경고에 "메인 피드 순서만" 한계 문구', (gap4.get('a14.md')?.[0] ?? '').includes('메인 피드 순서만'))
}

// ─── ⑧ ND 카드 object-contain · CC BY는 object-cover 유지 · ⑨ 카드 payload credit 없음 ───
{
  const variants: [string, Record<string, unknown>, boolean][] = [
    ['cc-by-nd-2.0', open({ license: 'cc-by-nd-2.0', licenseUrl: CC('/licenses/by-nd/2.0/') }), true],
    ['cc-by-nd-3.0', open({ license: 'cc-by-nd-3.0', licenseUrl: CC('/licenses/by-nd/3.0/') }), true],
    ['cc-by-nd-4.0', open({ license: 'cc-by-nd-4.0', licenseUrl: CC('/licenses/by-nd/4.0/') }), true],
    ['cc-by-4.0', OPEN_CC4, false],
    ['cc-by-sa-4.0', open({ license: 'cc-by-sa-4.0', licenseUrl: CC('/licenses/by-sa/4.0/') }), false],
    ['cc-by-2.0-kr', open({ license: 'cc-by-2.0-kr', licenseUrl: CC('/licenses/by/2.0/kr/') }), false],
    ['pd', PD('declared'), false],
    ['kcc-donated', open({ license: 'kcc-donated', licenseLabel: 'CC BY 4.0' }), false],
    ['public', PUBLIC, false],
  ]
  for (const [label, image, contain] of variants) {
    const r = run(base(image))
    if (!r.post) {
      check(`⑧ ${label}: 검증 통과`, false, r.errors.join(' | '))
      continue
    }
    const media = resolveCardMedia(r.post)
    check(`⑧ ${label}: media.contain ${contain}`, media.kind === 'local' && (media.contain === true) === contain, JSON.stringify(media))
    for (const locale of ['ko', 'en'] as const) {
      const card = toCardView(r.post, locale, true, TODAY)
      const html = renderToStaticMarkup(<CardMedia media={card.media} />)
      check(`⑧ ${label} ${locale}: 카드 <img> ${contain ? 'object-contain' : 'object-cover'}`, html.includes(contain ? 'object-contain' : 'object-cover') && !html.includes(contain ? 'object-cover' : 'object-contain'), html)
      check(`⑧ ${label} ${locale}: 카드 슬롯 배경 bg-surface`, /class="relative aspect-\[16\/9\][^"]*bg-surface/.test(html))
      check(`⑨ ${label} ${locale}: 카드 payload에 credit 없음`, !('credit' in card.media), JSON.stringify(card.media))
      const json = JSON.stringify(card)
      check(`⑨ ${label} ${locale}: 카드 payload에 저작자·출처·라이선스 주소 0`, !json.includes('예시 작가') && !json.includes('Example Author') && !json.includes('예시부') && !json.includes(ORIGINAL) && !json.includes('creativecommons.org') && !json.includes('sourcePageUrl'), json)
    }
    const detailHtml = detail(r.post, 'ko')
    const fig = detailHtml.match(/<figure[\s\S]*?<\/figure>/)?.[0] ?? ''
    check(`⑧ ${label}: 상세 사진 ${contain ? 'object-contain(원본 전체)' : 'object-cover(기존)'}`, fig.includes(contain ? 'object-contain' : 'object-cover') && !fig.includes(contain ? 'object-cover' : 'object-contain'), fig.slice(0, 300))
    check(`⑧ ${label}: 상세에는 credit 그대로(figcaption 있음)`, /<figcaption/.test(fig))
    check(`⑩ ${label}: next/image 최적화 ${label === 'kcc-donated' ? '제외' : '사용'}`, label === 'kcc-donated' ? !fig.includes('/_next/image') : fig.includes('/_next/image?url=%2Fimages%2Fsample-post%2Fthumb.jpg'), fig.slice(0, 300))
  }
  // news 카드도 credit 제거
  const news = run(
    base({
      kind: 'news',
      src: 'https://img.example.org/og/1.jpg',
      alt: '예시',
      caption: '2026년 11월 8일 예시 장면(원 기사 사진 설명 기준).',
      creditName: '예시일보',
      creditNameEn: 'Example Daily',
      sourcePageUrl: ARTICLE,
      retrievedAt: '2026-11-09',
      faceNote: '얼굴 없음',
    }),
  )
  if (!news.post) throw new Error(news.errors.join(' | '))
  const newsCard = toCardView(news.post, 'ko', true, TODAY)
  check('⑨ news 카드 payload에 credit 없음', newsCard.media.kind === 'remote' && !('credit' in newsCard.media) && !JSON.stringify(newsCard).includes('예시일보'), JSON.stringify(newsCard.media))
  check('⑨ news 상세는 credit 유지', resolveCardMedia(news.post as Post).kind === 'remote' && 'credit' in resolveCardMedia(news.post as Post))
}

// ─── ⑩ OG·JSON-LD 미사용 회귀(사이트맵·og:image는 build-artifact-check.mjs) ───
{
  const images: [string, Record<string, unknown>][] = [
    ['cc-by-sa-4.0', open({ license: 'cc-by-sa-4.0', licenseUrl: CC('/licenses/by-sa/4.0/') })],
    ['cc-by-nd-4.0', open({ license: 'cc-by-nd-4.0', licenseUrl: CC('/licenses/by-nd/4.0/') })],
    ['cc-by-sa-2.0-kr', open({ license: 'cc-by-sa-2.0-kr', licenseUrl: CC('/licenses/by-sa/2.0/kr/') })],
    ['pd us-gov', PD('us-gov', undefined, { creditNotice: 'x' })],
    ['public A-2', { ...PUBLIC, caption: '자료사진: 예시부 청사(2021) — 이 사건 당시 사진이 아닙니다.', workYear: 2021 }],
  ]
  for (const [label, image] of images) {
    const validated = run(base(image))
    if (!validated.post) {
      check(`⑩ ${label}: 검증 통과`, false, validated.errors.join(' | '))
      continue
    }
    const post = validated.post
    for (const locale of ['ko', 'en'] as const) {
      const json = JSON.stringify(postJsonLd(locale === 'ko' ? post : enPost(post), locale))
      check(`⑩ ${label} ${locale}: postJsonLd에 이미지 경로·caption·저작자 0`, !json.includes('/images/sample-post') && !json.includes(image.caption as string) && !json.includes('예시 작가') && !json.includes('Example Author') && !json.includes('예시부'), json)
    }
    const collection = JSON.stringify(collectionJsonLd({ name: 'n', description: 'd', path: '/', posts: [post] }))
    check(`⑩ ${label}: collectionJsonLd에 이미지 경로 0`, !collection.includes('/images/sample-post'))
  }
}

const total = passed + failures.length
console.log(`케이스 ${total}개 · 통과 ${passed} · 실패 ${failures.length}`)
for (const failure of failures) console.log(`FAIL  ${failure}`)
process.exit(failures.length ? 1 : 0)
