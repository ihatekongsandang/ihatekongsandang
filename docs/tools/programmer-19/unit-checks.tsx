/**
 * 프로그래머 19 — 대표 이미지 `kind: open`(A-2 인물 없는 자료사진) 검증·상세 출처 표시·카드/OG/JSON-LD 처리·이미지 크기 읽기 검사.
 *
 * 사용(저장소 루트): npx tsx --tsconfig docs/tools/programmer-19/tsconfig.json docs/tools/programmer-19/unit-checks.tsx
 *   (저장소 tsconfig는 `jsx: preserve`라 컴포넌트를 직접 렌더하려면 이 설정이 필요하다 — programmer-13·15와 같은 방식)
 *
 * 테스트 주소는 예시 도메인(`example.org`·`example.com`)과 creativecommons.org 라이선스 문서 주소만 쓴다.
 * 저작자·기증자·저작물명은 모두 가상 값("예시 작가" 등)이다. 실제 사진·저작자 이름은 없다.
 *
 *  A. 정상: CC BY 2.0/3.0/4.0 · CC0 · PD · 기증(CC BY 4.0 표시)·기증(다른 표시) · workYear 생략 · public workTitle/workYear
 *  B. 거부: 버전 없는 cc-by · BY-SA/NC/ND · 지역판 · public+cc · open+kogl-1 · license 없음 · caption 없음 · images[]에 open ·
 *          사진 유형 게시물 · 필수 필드 누락 · licenseUrl 버전 불일치 · 기증 licenseLabel 없음 · workYear 형식·미래 ·
 *          (유지) news+license · news sources[] 불일치 / public·open은 sources[] 대조 없음
 *  C. 경고: A-2 caption 접두·문구 · 연도 미상 문구 · 10년 이상 · faceNote · 기증 사이트명 · pd 근거 · 무시 필드 · 영어본 문구
 *  D. 상세 표시(react-dom/server): ko·en × 라이선스별 크레딧 줄 글자 그대로 · 링크 href/rel/target · caption이 크레딧 줄 위 ·
 *     creditNotice · public·news 표시 불변
 *  E. 카드·OG·JSON-LD: 카드 HTML에 caption·크레딧 0 · toCardView에 caption 0 · postJsonLd·collectionJsonLd에 이미지 경로·caption 0 ·
 *     next/image: 기증은 unoptimized(원본 경로), 그 밖은 /_next/image
 *  F. 이미지 크기 읽기(JPEG·PNG·WebP 머리)
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { CardMedia } from '../../../src/components/card-media'
import { PostDetail } from '../../../src/components/post-detail'
import { resolveCardMedia, validatePost, type Post } from '../../../src/lib/content/schema'
import { localizePost, validateTranslation } from '../../../src/lib/content/translation'
import { toCardView } from '../../../src/lib/content/view'
import { collectionJsonLd, postJsonLd } from '../../../src/lib/seo'
import { imageSizeFromBuffer } from '../../../scripts/image-size'

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
const CC4 = 'https://creativecommons.org/licenses/by/4.0/'
const CC4_LEGAL = 'https://creativecommons.org/licenses/by/4.0/legalcode.ko'
const CC2 = 'https://creativecommons.org/licenses/by/2.0/'
const CC3 = 'https://creativecommons.org/licenses/by/3.0/deed.ko'
const CC0 = 'https://creativecommons.org/publicdomain/zero/1.0/'
const PD_BASIS = 'https://archive.example.org/pd-basis/1'
const DONATION_GUIDE = 'https://archive.example.org/donation-guide'
const CAPTION = '자료사진: 예시 청사(2019) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.'
const CAPTION_NO_YEAR = '자료사진: 예시 청사(촬영 연도 미상) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.'
const EN_CAPTION = 'Archive photo: the Example Government Complex (2019) — not taken at the time of this event. It may differ from how it looks today.'
const TODAY = '2026-11-11'

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
  licenseUrl: CC4,
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
const NEWS = {
  kind: 'news',
  src: 'https://img.example.org/og/1.jpg',
  alt: '국회 본회의장에서 발언하는 예시 의원',
  caption: '2026년 11월 8일 국회 본회의장에서 예시 의원이 발언하는 모습(원 기사 사진 설명 기준).',
  creditName: '예시일보',
  creditNameEn: 'Example Daily',
  sourcePageUrl: ARTICLE,
  retrievedAt: '2026-11-09',
  faceNote: '공인(현직 국회의원) 공적 활동 — 원 기사 사진 설명 기준',
}
const run = (data: Record<string, unknown>) => validatePost(data, '', FILE, { localImageExists: () => true, today: TODAY })
const open = (patch: Record<string, unknown>, drop: string[] = []) => {
  const image: Record<string, unknown> = { ...OPEN_CC4, ...patch }
  for (const key of drop) delete image[key]
  return image
}
const errorsOf = (image: Record<string, unknown>, extra: Record<string, unknown> = {}) => run(base(image, extra)).errors
const has = (list: string[], needle: string) => list.some((line) => line.includes(needle))

// ─── A. 정상 ───
{
  const r = run(base(OPEN_CC4))
  check('A cc-by-4.0 통과', r.errors.length === 0 && !!r.post, r.errors.join(' | '))
  const img = r.post?.image
  check('A cc-by-4.0 정규화: kind·license·licenseUrl', img?.kind === 'open' && img.license === 'cc-by-4.0' && img.licenseUrl === CC4, JSON.stringify(img))
  check('A cc-by-4.0 정규화: workTitle·workYear(문자열 "2019")·sourceSiteName', img?.workTitle === '예시 청사 전경' && img.workYear === '2019' && img.sourceSiteName === '공유마당', JSON.stringify(img))
  check('A cc-by-4.0: 경고 0', r.notices.length === 0, r.notices.join(' | '))
  check('A licenseUrl legalcode.ko(같은 버전 하위 경로)도 통과', errorsOf(open({ licenseUrl: CC4_LEGAL })).length === 0)
  check('A cc-by-2.0 통과', errorsOf(open({ license: 'cc-by-2.0', licenseUrl: CC2 })).length === 0)
  check('A cc-by-3.0(deed.ko) 통과', errorsOf(open({ license: 'cc-by-3.0', licenseUrl: CC3 })).length === 0)
  check('A workYear 문자열 "2019"도 통과', errorsOf(open({ workYear: '2019' })).length === 0)
  check('A creditNotice 있음 통과·보존', run(base(open({ creditNotice: '© 예시 작가. 무보증.' }))).post?.image?.creditNotice === '© 예시 작가. 무보증.')
}
{
  const r = run(base(open({ license: 'cc0-1.0', licenseUrl: CC0 })))
  check('A cc0-1.0 통과', r.errors.length === 0 && r.post?.image?.license === 'cc0-1.0', r.errors.join(' | '))
}
{
  const r = run(base(open({ license: 'pd', licenseUrl: PD_BASIS, licenseLabel: '저작권 보호기간 만료(1950년 사망)' })))
  check('A pd(근거 문구 있음) 통과', r.errors.length === 0 && r.post?.image?.licenseLabel === '저작권 보호기간 만료(1950년 사망)', r.errors.join(' | '))
  check('A pd licenseUrl은 creativecommons.org가 아니어도 됨', r.post?.image?.licenseUrl === PD_BASIS)
}
{
  const r = run(base(open({ license: 'kcc-donated', licenseUrl: CC4, licenseLabel: 'CC BY 4.0', donorName: '예시 기증자' })))
  check('A kcc-donated(CC BY 4.0 표시) 통과', r.errors.length === 0, r.errors.join(' | '))
  check('A kcc-donated licenseLabel·donorName 보존', r.post?.image?.licenseLabel === 'CC BY 4.0' && r.post?.image?.donorName === '예시 기증자')
  const other = run(base(open({ license: 'kcc-donated', licenseUrl: DONATION_GUIDE, licenseLabel: '기증저작물 자유이용' })))
  check('A kcc-donated(다른 표시 + 기증제도 안내 URL) 통과', other.errors.length === 0, other.errors.join(' | '))
  check('A kcc-donated 표시 "cc by 4.0"(대소문자·공백 차이)도 CC BY 4.0으로 봄 → 기증제도 안내 URL이면 오류', has(errorsOf(open({ license: 'kcc-donated', licenseUrl: DONATION_GUIDE, licenseLabel: 'cc by  4.0' })), 'licenseUrl'))
}
{
  const r = run(base(open({ caption: CAPTION_NO_YEAR }, ['workYear'])))
  check('A workYear 생략 통과', r.errors.length === 0 && r.post?.image?.workYear === undefined, r.errors.join(' | '))
  check('A workYear 생략 + 연도 미상 문구 있음 → 경고 0', r.notices.length === 0, r.notices.join(' | '))
}
{
  const r = run(base({ ...PUBLIC, workTitle: '예시부 청사', workYear: 2024 }))
  check('A public workTitle·workYear 받음', r.errors.length === 0 && r.post?.image?.workTitle === '예시부 청사' && r.post?.image?.workYear === '2024', r.errors.join(' | '))
  check('A public workTitle·workYear 없어도 통과(선택)', run(base(PUBLIC)).errors.length === 0)
  check('A public은 sources[] 대조 없음(sourcePageUrl이 sources에 없어도 통과)', run(base(PUBLIC)).errors.length === 0)
  check('A open도 sources[] 대조 없음', run(base(OPEN_CC4, { sources: [] })).errors.length === 0)
}

// ─── B. 거부 ───
{
  const e = errorsOf(open({ license: 'cc-by' }))
  check('B 버전 없는 cc-by 거부(사유: 버전)', has(e, '버전 없는 CC BY'), e.join(' | '))
  check('B "CC BY"(대문자·공백) 거부', has(errorsOf(open({ license: 'CC BY' })), '버전 없는 CC BY'))
  const sa = errorsOf(open({ license: 'cc-by-sa-4.0' }))
  check('B cc-by-sa-4.0 거부', has(sa, 'BY-SA'), sa.join(' | '))
  check('B cc-by-nc-4.0 거부', has(errorsOf(open({ license: 'cc-by-nc-4.0' })), 'BY-NC'))
  check('B cc-by-nd-4.0 거부', has(errorsOf(open({ license: 'cc-by-nd-4.0' })), 'BY-ND'))
  check('B 지역판 cc-by-2.0-kr 거부', has(errorsOf(open({ license: 'cc-by-2.0-kr' })), '지역판'))
  const ok1 = errorsOf(open({ license: 'kogl-1' }))
  check('B open + kogl-1 거부(→ public)', has(ok1, 'kind `public`'), ok1.join(' | '))
  check('B open license 없음 거부', has(errorsOf(open({}, ['license'])), '.license'))
  check('B open 모르는 값(cc-by-5.0) 거부', has(errorsOf(open({ license: 'cc-by-5.0' })), '.license'))
  const pc = errorsOf({ ...PUBLIC, license: 'cc-by-4.0' })
  check('B public + cc-by-4.0 거부(→ open)', has(pc, 'kind `open`'), pc.join(' | '))
  check('B public + kcc-donated 거부', has(errorsOf({ ...PUBLIC, license: 'kcc-donated' }), 'kind `open`'))
  check('B public + kogl-3 거부(유지)', has(errorsOf({ ...PUBLIC, license: 'kogl-3' }), 'kogl-3'))
  const nc = errorsOf(open({}, ['caption']))
  check('B open caption 없음 거부', has(nc, '.caption'), nc.join(' | '))
  check('B open caption 공백만 거부', has(errorsOf(open({ caption: '   ' })), '.caption'))
  const gallery = run(base(undefined, { sourceType: 'photo', images: [OPEN_CC4], sources: [{ type: '언론', name: '예시일보', url: ARTICLE, date: '2026-11-10' }] }))
  check('B open이 images[]에 들어감 거부', has(gallery.errors, 'images[]') || has(gallery.errors, '대표 이미지(`image`)에만'), gallery.errors.join(' | '))
  const photo = run(base(OPEN_CC4, { sourceType: 'photo', images: [{ src: '/images/sample-post/a.jpg', alt: '예시' }] }))
  check('B open을 사진 유형 게시물 image에 거부', has(photo.errors, 'sourceType `url`'), photo.errors.join(' | '))
  for (const field of ['workTitle', 'sourceSiteName', 'licenseUrl', 'faceNote', 'creditName', 'creditNameEn', 'sourcePageUrl', 'retrievedAt']) {
    check(`B open ${field} 없음 거부`, has(errorsOf(open({}, [field])), `.${field}`))
  }
  check('B open workTitle 빈 문자열 거부', has(errorsOf(open({ workTitle: '' })), '.workTitle'))
  check('B open sourceSiteName 숫자 거부', has(errorsOf(open({ sourceSiteName: 3 })), '.sourceSiteName'))
  check('B licenseUrl http(s) 아님 거부', has(errorsOf(open({ licenseUrl: 'creativecommons.org/licenses/by/4.0/' })), '.licenseUrl'))
  const mismatch = errorsOf(open({ licenseUrl: CC2 }))
  check('B cc-by-4.0인데 licenseUrl이 2.0 문서 거부', has(mismatch, '/licenses/by/4.0/'), mismatch.join(' | '))
  check('B cc-by-4.0인데 licenseUrl이 BY-SA 문서 거부', has(errorsOf(open({ licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' })), '.licenseUrl'))
  check('B cc-by-4.0인데 licenseUrl이 다른 호스트 거부', has(errorsOf(open({ licenseUrl: 'https://cc.example.org/licenses/by/4.0/' })), '.licenseUrl'))
  check('B cc0인데 licenseUrl이 CC BY 문서 거부', has(errorsOf(open({ license: 'cc0-1.0', licenseUrl: CC4 })), '.licenseUrl'))
  check('B kcc-donated licenseLabel 없음 거부', has(errorsOf(open({ license: 'kcc-donated', licenseUrl: CC4 })), '.licenseLabel'))
  check('B kcc-donated CC BY 4.0 표시인데 licenseUrl이 3.0 문서 거부', has(errorsOf(open({ license: 'kcc-donated', licenseUrl: CC3, licenseLabel: 'CC BY 4.0' })), '.licenseUrl'))
  check('B workYear 2자리 거부', has(errorsOf(open({ workYear: 19 })), '.workYear'))
  check('B workYear 날짜(1973-05-19) 거부', has(errorsOf(open({ workYear: '1973-05-19' })), '.workYear'))
  check('B workYear 미래(2027) 거부', has(errorsOf(open({ workYear: 2027 })), '미래 연도'))
  check('B workYear 올해(2026) 통과', errorsOf(open({ workYear: 2026 })).length === 0)
  check('B public workYear 형식 오류도 거부', has(errorsOf({ ...PUBLIC, workYear: 'abc' }), '.workYear'))
  check('B open src가 https 핫링크면 거부(저장소 경로만)', has(errorsOf(open({ src: 'https://img.example.org/a.jpg' })), '.src'))
  check('B open sourcePageUrl 포털 거부', has(errorsOf(open({ sourcePageUrl: 'https://blog.naver.com/x/1' })), '포털'))
  // 유지 규칙
  check('B(유지) news + license 거부', has(errorsOf({ ...NEWS, license: 'kogl-1' }), '.license'))
  check('B(유지) news + cc-by-4.0 거부', has(errorsOf({ ...NEWS, license: 'cc-by-4.0' }), '.license'))
  check('B(유지) news sourcePageUrl이 sources[]와 다르면 거부', has(errorsOf({ ...NEWS, sourcePageUrl: 'https://news.example.org/other' }), 'sources[].url'))
  check('B(유지) news 정상 통과', errorsOf(NEWS).length === 0)
}

// ─── C. 경고 ───
{
  const n1 = run(base(open({ caption: '예시 청사 전경(2019).' }))).notices
  check('C caption 접두·문구 없음 → 경고', has(n1, '자료사진:'), n1.join(' | '))
  const n2 = run(base(open({ caption: '자료사진: 예시 청사 — 이 사건 당시 사진이 아닙니다.' }, ['workYear']))).notices
  check('C workYear 없음 + 연도 미상 문구 없음 → 경고', has(n2, '촬영 연도 미상'), n2.join(' | '))
  const n3 = run(base(open({ caption: '자료사진: 예시 청사(2019) — 이 사건 당시 사진이 아닙니다.' }))).notices
  check('C 2019(7년 전) + 다를 수 있음 문구 없음 → 경고 0', n3.length === 0, n3.join(' | '))
  const n4 = run(base(open({ workYear: 2010, caption: '자료사진: 예시 청사(2010) — 이 사건 당시 사진이 아닙니다.' }))).notices
  check('C 2010(16년 전) + 다를 수 있음 문구 없음 → 경고', has(n4, '10년 이상'), n4.join(' | '))
  const n5 = run(base(open({ faceNote: '원경 인물 있음' }))).notices
  check('C faceNote가 "얼굴 없음"으로 시작 안 함 → 경고', has(n5, 'faceNote'), n5.join(' | '))
  const n6 = run(base(open({ license: 'kcc-donated', licenseUrl: CC4, licenseLabel: 'CC BY 4.0', sourceSiteName: '예시 사이트' }))).notices
  check('C kcc-donated sourceSiteName ≠ 공유마당 → 경고', has(n6, 'sourceSiteName'), n6.join(' | '))
  const n7 = run(base(open({ license: 'pd', licenseUrl: PD_BASIS }))).notices
  check('C pd 근거 문구 없음 → 경고', has(n7, 'licenseLabel'), n7.join(' | '))
  const n8 = run(base(open({ donorName: '예시 기증자', licenseLabel: 'CC BY 4.0' })))
  check('C cc-by에 donorName·licenseLabel → 경고 2·값 버림', has(n8.notices, 'donorName') && has(n8.notices, 'licenseLabel') && !n8.post?.image?.donorName && !n8.post?.image?.licenseLabel, n8.notices.join(' | '))
  const n9 = run(base({ ...PUBLIC, licenseUrl: CC4, sourceSiteName: '예시' })).notices
  check('C public에 open 전용 필드 → 경고(무시)', has(n9, 'licenseUrl') && has(n9, 'sourceSiteName'), n9.join(' | '))
  const n10 = run(base({ ...NEWS, workTitle: '예시' })).notices
  check('C news에 workTitle → 경고(무시)', has(n10, 'workTitle'), n10.join(' | '))
  const n11 = run(base({ src: '/images/sample-post/a.jpg', alt: '예시', licenseUrl: CC4 })).notices
  check('C self에 licenseUrl → 경고(무시)', has(n11, 'licenseUrl'), n11.join(' | '))
}
{
  const ko = run(base(OPEN_CC4)).post as Post
  const t1 = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'A', imageCaption: EN_CAPTION, translatedAt: TODAY }, '', FILE, ko)
  check('C 영어본 Archive photo 문구 → 경고 0', t1.errors.length === 0 && t1.notices.length === 0, [...t1.errors, ...t1.notices].join(' | '))
  const t2 = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'A', imageCaption: 'The building.', translatedAt: TODAY }, '', FILE, ko)
  check('C 영어본 Archive photo 접두 없음 → 경고', t2.errors.length === 0 && has(t2.notices, 'Archive photo:'), t2.notices.join(' | '))
  const t3 = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'A', translatedAt: TODAY }, '', FILE, ko)
  check('C 영어본 imageCaption 없음 → 오류(open도 필수)', has(t3.errors, 'imageCaption'), t3.errors.join(' | '))
  const koNoYear = run(base(open({ caption: CAPTION_NO_YEAR }, ['workYear']))).post as Post
  const t4 = validateTranslation(
    { id: ID, title: 'T', description: 'D', imageAlt: 'A', imageCaption: 'Archive photo: the building (year unknown) — not taken at the time of this event.', translatedAt: TODAY },
    '',
    FILE,
    koNoYear,
  )
  check('C 영어본 연도 미상인데 "It may differ…" 없음 → 경고', has(t4.notices, 'It may differ'), t4.notices.join(' | '))
}

// ─── D. 상세 표시 ───
function detail(post: Post, locale: 'ko' | 'en'): string {
  return renderToStaticMarkup(<PostDetail post={post} body="" locale={locale} />)
}
function figcaption(html: string): string {
  return html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
}
function paragraphs(fig: string): string[] {
  return [...fig.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => m[1] as string)
}
/** 화면 글자(새 창 안내 sr-only 문구는 뺀다). */
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
const EN_INPUT = { id: ID, title: 'T', description: 'D', imageAlt: 'The Example building', imageCaption: EN_CAPTION, translatedAt: TODAY }
function enPost(ko: Post): Post {
  const tr = validateTranslation(EN_INPUT, '', FILE, ko)
  if (!tr.translation) throw new Error(tr.errors.join(' | '))
  return localizePost(ko, tr.translation)
}

interface DisplayCase {
  label: string
  image: Record<string, unknown>
  ko: string
  en: string
  hrefs: string[]
  koLinks: string[]
  enLinks: string[]
}
const CASES: DisplayCase[] = [
  {
    label: 'CC BY 4.0',
    image: OPEN_CC4,
    ko: '사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY 4.0 · 원 페이지 · 라이선스',
    en: 'Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY 4.0 · Original · License',
    hrefs: [ORIGINAL, CC4],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'CC BY 2.0 workYear 생략',
    image: open({ license: 'cc-by-2.0', licenseUrl: CC2, caption: CAPTION_NO_YEAR }, ['workYear']),
    ko: '사진: 예시 작가, 「예시 청사 전경」 · 공유마당 / CC BY 2.0 · 원 페이지 · 라이선스',
    en: 'Photo: Example Author, "예시 청사 전경" · 공유마당 / CC BY 2.0 · Original · License',
    hrefs: [ORIGINAL, CC2],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'CC0',
    image: open({ license: 'cc0-1.0', licenseUrl: CC0 }),
    ko: '사진: 예시 작가(CC0 1.0 — 저작권 포기) · 원 페이지 · 라이선스',
    en: 'Photo: Example Author (CC0 1.0 — public domain dedication) · Original · License',
    hrefs: [ORIGINAL, CC0],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: 'PD 근거 문구 있음',
    image: open({ license: 'pd', licenseUrl: PD_BASIS, licenseLabel: '보호기간 만료' }),
    ko: '사진: 예시 작가(퍼블릭 도메인 — 근거: 보호기간 만료) · 원 페이지 · 근거 페이지',
    en: 'Photo: Example Author (Public domain — basis: 보호기간 만료) · Original · Basis page',
    hrefs: [ORIGINAL, PD_BASIS],
    koLinks: ['원 페이지', '근거 페이지'],
    enLinks: ['Original', 'Basis page'],
  },
  {
    label: 'PD 근거 문구 없음',
    image: open({ license: 'pd', licenseUrl: PD_BASIS }),
    ko: '사진: 예시 작가(퍼블릭 도메인) · 원 페이지 · 근거 페이지',
    en: 'Photo: Example Author (Public domain) · Original · Basis page',
    hrefs: [ORIGINAL, PD_BASIS],
    koLinks: ['원 페이지', '근거 페이지'],
    enLinks: ['Original', 'Basis page'],
  },
  {
    label: '기증 CC BY 4.0 표시 + donorName',
    image: open({ license: 'kcc-donated', licenseUrl: CC4, licenseLabel: 'CC BY 4.0', donorName: '예시 기증자' }),
    ko: '사진: 예시 작가, 「예시 청사 전경」, 기증 예시 기증자, 공유마당 / CC BY 4.0 · 원 페이지 · 라이선스',
    en: 'Photo: Example Author, "예시 청사 전경", donated by 예시 기증자, Gongu Madang / CC BY 4.0 · Original · License',
    hrefs: [ORIGINAL, CC4],
    koLinks: ['원 페이지', '라이선스'],
    enLinks: ['Original', 'License'],
  },
  {
    label: '기증 다른 표시(라이선스 링크 없음) · donorName 없음',
    image: open({ license: 'kcc-donated', licenseUrl: DONATION_GUIDE, licenseLabel: '기증저작물 자유이용' }),
    ko: '사진: 예시 작가, 「예시 청사 전경」, 기증 예시 작가, 공유마당 / 기증저작물 자유이용 · 원 페이지',
    en: 'Photo: Example Author, "예시 청사 전경", donated by Example Author, Gongu Madang / 기증저작물 자유이용 · Original',
    hrefs: [ORIGINAL],
    koLinks: ['원 페이지'],
    enLinks: ['Original'],
  },
]
for (const c of CASES) {
  const r = run(base(c.image))
  if (!r.post) {
    check(`D ${c.label}: 검증 통과`, false, r.errors.join(' | '))
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
    check(`D ${c.label} ${locale}: figcaption 첫 줄 = 사진 설명`, visible(ps[0] ?? '') === captionText, visible(ps[0] ?? ''))
    check(`D ${c.label} ${locale}: 사진 설명 줄 data-image-caption`, /^<p data-image-caption="">/.test(fig))
    check(`D ${c.label} ${locale}: 둘째 줄 = 크레딧(글자 그대로)`, visible(ps[1] ?? '') === expected, `\n   exp=${expected}\n   got=${visible(ps[1] ?? '')}`)
    check(`D ${c.label} ${locale}: 줄 수 2(creditNotice 없음)`, ps.length === 2, String(ps.length))
    const ls = links(ps[1] ?? '')
    check(`D ${c.label} ${locale}: 링크 href`, JSON.stringify(ls.map((l) => l.href)) === JSON.stringify(c.hrefs), JSON.stringify(ls.map((l) => l.href)))
    check(`D ${c.label} ${locale}: 링크 문구`, JSON.stringify(ls.map((l) => l.text)) === JSON.stringify(linkTexts), JSON.stringify(ls.map((l) => l.text)))
    check(`D ${c.label} ${locale}: rel="noopener"·target=_blank(public·news 링크와 같음)`, ls.every((l) => l.rel === 'noopener' && l.target === '_blank'), JSON.stringify(ls))
    check(`D ${c.label} ${locale}: 새 창 안내 sr-only 링크마다`, (ps[1]?.match(/class="sr-only"/g) ?? []).length === c.hrefs.length)
    if (locale === 'en') {
      check(`D ${c.label} en: 한글 값(저작물명·사이트명 등)에 lang="ko"`, !/[가-힣]/.test(visible(ps[1] ?? '')) || /lang="ko"/.test(ps[1] ?? ''))
      check(`D ${c.label} en: 저작자 영어 이름에는 lang 없음`, /<span>Example Author<\/span>/.test(ps[1] ?? ''), ps[1] ?? '')
    } else {
      check(`D ${c.label} ko: lang 속성 없음`, !/lang="/.test(ps[1] ?? ''))
    }
  }
}
{
  const r = run(base(open({ creditNotice: '© 예시 작가. 이 사진은 보증 없이 제공됩니다.' })))
  if (!r.post) check('D creditNotice: 검증 통과', false, r.errors.join(' | '))
  else {
  const ps = paragraphs(figcaption(detail(r.post as Post, 'ko')))
  check('D creditNotice: 셋째 줄에 원문 그대로', ps.length === 3 && visible(ps[2] ?? '') === '© 예시 작가. 이 사진은 보증 없이 제공됩니다.', JSON.stringify(ps.map(visible)))
  const psEn = paragraphs(figcaption(detail(enPost(r.post as Post), 'en')))
  check('D creditNotice en: 셋째 줄 원문 + lang="ko"', psEn.length === 3 && /lang="ko"/.test(psEn[2] ?? ''), psEn[2] ?? '')
  }
}
{
  // public·news 표시는 바뀌지 않았다(프로그래머 15 기대값 그대로)
  const pub = paragraphs(figcaption(detail(run(base(PUBLIC)).post as Post, 'ko'))).map(visible)
  check('D(불변) public ko 크레딧', pub[1] === '사진: 예시부(공공누리 제1유형) · 원문 페이지', pub[1] ?? '')
  check('D(불변) public ko 공식 문구', pub[2] === '본 저작물은 예시부에서 공공누리 제1유형으로 개방한 저작물을 이용하였습니다.', pub[2] ?? '')
  const pubWork = paragraphs(figcaption(detail(run(base({ ...PUBLIC, workTitle: '예시부 청사', workYear: 2024 })).post as Post, 'ko'))).map(visible)
  check('D(불변) public에 workTitle·workYear가 있어도 표시 같음(문안 미확정 — 트리거 확인 필요)', JSON.stringify(pubWork) === JSON.stringify(pub), JSON.stringify(pubWork))
  const news = paragraphs(figcaption(detail(run(base(NEWS)).post as Post, 'ko'))).map(visible)
  check('D(불변) news ko 크레딧', news[1] === '사진: 예시일보 · 기사 원문' && news.length === 2, JSON.stringify(news))
}

// ─── E. 카드·OG·JSON-LD·next/image ───
{
  const variants: [string, Record<string, unknown>, boolean][] = [
    ['cc-by-4.0', OPEN_CC4, false],
    ['cc0', open({ license: 'cc0-1.0', licenseUrl: CC0 }), false],
    ['pd', open({ license: 'pd', licenseUrl: PD_BASIS }), false],
    ['kcc-donated(CC BY 4.0)', open({ license: 'kcc-donated', licenseUrl: CC4, licenseLabel: 'CC BY 4.0' }), true],
    ['kcc-donated(다른 표시)', open({ license: 'kcc-donated', licenseUrl: DONATION_GUIDE, licenseLabel: '기증저작물 자유이용' }), true],
    ['public', PUBLIC, false],
  ]
  for (const [label, image, unopt] of variants) {
    const validated = run(base(image))
    if (!validated.post) {
      check(`E ${label}: 검증 통과`, false, validated.errors.join(' | '))
      continue
    }
    const post = validated.post
    const media = resolveCardMedia(post)
    check(`E ${label}: 카드 media = local`, media.kind === 'local')
    check(`E ${label}: unoptimized ${unopt}`, media.kind === 'local' && (media.unoptimized === true) === unopt, JSON.stringify(media))
    const card = toCardView(post, 'ko', true, TODAY)
    const cardHtml = renderToStaticMarkup(<CardMedia media={card.media} />)
    const caption = image.caption as string
    check(`E ${label}: 카드 HTML에 사진 설명 0`, !cardHtml.includes(caption))
    check(`E ${label}: 카드 HTML에 크레딧·라이선스 글자 0`, !/사진: |CC BY|CC0|퍼블릭 도메인|공공누리|figcaption/.test(cardHtml), cardHtml)
    check(`E ${label}: 카드 데이터(toCardView)에 사진 설명 0`, !JSON.stringify(card).includes(caption))
    if (unopt) {
      check(`E ${label}: 카드 <img> src = 저장 파일 그대로(/_next/image 0)`, /src="\/images\/sample-post\/thumb\.jpg"/.test(cardHtml) && !cardHtml.includes('/_next/image'), cardHtml)
      check(`E ${label}: srcset 없음(리사이즈 변형 0)`, !/srcset=/i.test(cardHtml), cardHtml)
    } else {
      check(`E ${label}: 카드 <img>는 /_next/image(최적화)`, cardHtml.includes('/_next/image?url=%2Fimages%2Fsample-post%2Fthumb.jpg'), cardHtml)
    }
    const figHtml = detail(post, 'ko')
    if (unopt) check(`E ${label}: 상세 사진도 /_next/image 0`, !figHtml.includes('/_next/image'))
    for (const locale of ['ko', 'en'] as const) {
      const json = JSON.stringify(postJsonLd(locale === 'ko' ? post : enPost(post), locale))
      check(`E ${label} ${locale}: postJsonLd에 이미지 경로·사진 설명·저작자 0`, !json.includes('/images/sample-post') && !json.includes(caption) && !json.includes('예시 작가') && !json.includes('Example Author'), json)
    }
    const collection = JSON.stringify(collectionJsonLd({ name: 'n', description: 'd', path: '/', posts: [post] }))
    check(`E ${label}: collectionJsonLd에 이미지 경로·사진 설명 0`, !collection.includes('/images/sample-post') && !collection.includes(caption))
    const head = figHtml.match(/<head[\s\S]*?<\/head>/)?.[0] ?? ''
    check(`E ${label}: 상세 렌더에 og:image 메타 없음(메타는 페이지 generateMetadata — fixture 빌드에서 확인)`, !head.includes('og:image'))
  }
}

// ─── F. 이미지 크기 읽기 ───
{
  const png = Buffer.alloc(33)
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(png, 0)
  png.writeUInt32BE(13, 8)
  png.write('IHDR', 12, 'ascii')
  png.writeUInt32BE(640, 16)
  png.writeUInt32BE(399, 20)
  check('F PNG 640×399', JSON.stringify(imageSizeFromBuffer(png)) === JSON.stringify({ width: 640, height: 399 }), JSON.stringify(imageSizeFromBuffer(png)))
  // JPEG: SOI + APP0(길이 16) + SOF0(높이 370, 너비 600)
  const app0 = Buffer.concat([Buffer.from([0xff, 0xe0, 0x00, 0x10]), Buffer.alloc(14)])
  const sof0 = Buffer.from([0xff, 0xc0, 0x00, 0x11, 0x08, 0x01, 0x72, 0x02, 0x58, 0x03, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const jpeg = Buffer.concat([Buffer.from([0xff, 0xd8]), app0, Buffer.from([0xff, 0xc4, 0x00, 0x04, 0, 0]), sof0])
  check('F JPEG 600×370(APP0·DHT 건너뜀)', JSON.stringify(imageSizeFromBuffer(jpeg)) === JSON.stringify({ height: 370, width: 600 }), JSON.stringify(imageSizeFromBuffer(jpeg)))
  const progressive = Buffer.from(jpeg)
  progressive[2 + app0.length + 6 + 1] = 0xc2
  check('F JPEG progressive(SOF2) 600×370', JSON.stringify(imageSizeFromBuffer(progressive)) === JSON.stringify({ height: 370, width: 600 }))
  const vp8x = Buffer.alloc(30)
  vp8x.write('RIFF', 0, 'ascii')
  vp8x.write('WEBP', 8, 'ascii')
  vp8x.write('VP8X', 12, 'ascii')
  vp8x.writeUIntLE(2551, 24, 3)
  vp8x.writeUIntLE(2046, 27, 3)
  check('F WebP VP8X 2552×2047', JSON.stringify(imageSizeFromBuffer(vp8x)) === JSON.stringify({ width: 2552, height: 2047 }))
  check('F 모르는 형식 → undefined', imageSizeFromBuffer(Buffer.from('GIF89a........................')) === undefined)
}

const total = passed + failures.length
console.log(`케이스 ${total}개 · 통과 ${passed} · 실패 ${failures.length}`)
for (const failure of failures) console.log(`FAIL  ${failure}`)
process.exit(failures.length ? 1 : 0)
