/**
 * (프로그래머 14 갱신: 상세 개편으로 figcaption 마크업이 `<figcaption data-credit>`가 되고 링크 문구가 보강안 목업 문구 — 언론 "기사 원문", 공공누리 "원문 페이지"/"Source page" — 로 바뀌어 기대값만 맞췄다. 검사 항목 수는 같다.)
 * 프로그래머 13 — 카드 이미지 스키마·크레딧(P1~P4·P11) 통과·거부 케이스 검사.
 *
 * 사용(저장소 루트): npx tsx --tsconfig docs/tools/programmer-13/tsconfig.json docs/tools/programmer-13/unit-checks.tsx
 *   (저장소 tsconfig는 `jsx: preserve`라 컴포넌트를 직접 렌더하려면 이 설정이 필요하다 — programmer-06과 같은 방식)
 *
 * 픽스처 주소는 예시 도메인(`example.org`·`example.com`)만 쓴다. 포털 거부 확인에 쓰는 포털 호스트는
 * 실제 기사·이미지 주소가 아닌 경로(`/x.jpg`)만 붙인 문자열이다.
 *
 *  A. validatePost 통과: kind 생략(기존 207건 형태)·self 명시·news·public kogl-1·YAML Date 확인일·self 크레딧 필드 경고
 *  B. validatePost 거부: kind 값·news src(http·상대경로·포털 CDN·포털 하위 도메인)·sourcePageUrl(없음·sources 불일치·포털·언론 아닌 출처)·
 *     필수 필드 누락(creditName·creditNameEn·retrievedAt·faceNote)·확인일 형식·news license·public(kogl-3·라이선스 누락·kogl-2·외부 src·faceNote)·
 *     images[]의 public/news·사진 유형 게시물의 대표 이미지 public/news
 *  C. isPortalUrl: 포털·하위 도메인 참, 비슷한 이름·예시 도메인 거짓
 *  D. resolveCardMedia: news → remote·alt=image.alt·credit / public → local·credit / self → credit 없음(이전 모양)
 *  E. localizePost: 영어본이 kind·크레딧을 잃지 않음 → 영어 카드도 remote
 *  F. 렌더: 상세 figcaption ko/en/public, 링크 rel·target·새 창 안내, <img> 직접 참조·referrerpolicy 없음, self 상세 figcaption 없음,
 *     카드(CardMedia)에는 크레딧 없음
 *  G. P11: postJsonLd·collectionJsonLd에 이미지 주소·image 키 없음
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { CardMedia } from '../../../src/components/card-media'
import { PostDetail } from '../../../src/components/post-detail'
import { isPortalUrl, resolveCardMedia, validatePost, type Post } from '../../../src/lib/content/schema'
import { localizePost, validateTranslation } from '../../../src/lib/content/translation'
import { toCardView } from '../../../src/lib/content/view'
import { collectionJsonLd, postJsonLd } from '../../../src/lib/seo'

let passed = 0
const failures: string[] = []
function check(name: string, condition: boolean, detail = ''): void {
  if (condition) passed += 1
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
}

const ID = 'sample-post'
const FILE = `${ID}.md`
const ARTICLE = 'https://news.example.org/article/1'
const NEWS_SRC = 'https://img.example.org/og/1.jpg'
const PUBLIC_PAGE = 'https://www.example.com/kogl/photo/1'

/** 기존 207건과 같은 형태(sourceType url + 자체 텍스트 카드 image). */
function base(image?: Record<string, unknown>, extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: ID,
    title: '예시 제목',
    description: '예시 요약',
    publishedAt: '2026-11-09',
    sourceType: 'url',
    sourceUrl: 'https://www.example.com/post/1',
    attribution: '예시 출처',
    sources: [
      { type: '언론', name: '예시일보', url: ARTICLE, date: '2026-11-08' },
      { type: '기타', name: '예시 블로그', url: 'https://blog.example.com/1', date: '2026-11-08' },
    ],
    tags: ['예시'],
    ...(image ? { image } : {}),
    ...extra,
  }
}
const SELF = { src: '/images/sample-post/card.png', alt: '예시 카드 이미지' }
const NEWS = {
  kind: 'news',
  src: NEWS_SRC,
  alt: '국회 본회의장에서 발언하는 예시 의원',
  creditName: '예시일보',
  creditNameEn: 'Example Daily',
  sourcePageUrl: ARTICLE,
  retrievedAt: '2026-11-09',
  faceNote: '공인(현직 국회의원) 공적 활동 — 원 기사 사진 설명 기준',
}
const PUBLIC = {
  kind: 'public',
  src: '/images/sample-post/thumb.jpg',
  alt: '예시 기관 청사 전경',
  creditName: '예시부',
  creditNameEn: 'Ministry of Example',
  sourcePageUrl: PUBLIC_PAGE,
  license: 'kogl-1',
  retrievedAt: '2026-11-09',
  faceNote: '얼굴 없음(건물)',
}
const exists = () => true
const run = (data: Record<string, unknown>, body = '') => validatePost(data, body, FILE, { localImageExists: exists })
const hasError = (result: ReturnType<typeof run>, pattern: RegExp) => result.errors.some((error) => pattern.test(error))

function expectReject(name: string, data: Record<string, unknown>, pattern: RegExp): void {
  const result = run(data)
  check(`거부: ${name}`, !result.post && hasError(result, pattern), JSON.stringify(result.errors))
}

// ---------- A. 통과 ----------
{
  const r = run(base(SELF))
  check('통과: kind 생략(기존 형태) → self', Boolean(r.post) && r.post?.image?.kind === 'self', JSON.stringify(r.errors))
  check('통과: kind 생략 → 크레딧 필드 없음', r.post?.image ? Object.keys(r.post.image).sort().join(',') === 'alt,kind,src' : false, JSON.stringify(r.post?.image))
  check('통과: kind 생략 → 경고 0', r.notices.length === 0, JSON.stringify(r.notices))
}
{
  const r = run(base({ ...SELF, kind: 'self' }))
  check('통과: kind self 명시', r.post?.image?.kind === 'self', JSON.stringify(r.errors))
}
{
  const r = run(base(NEWS))
  check('통과: news', Boolean(r.post), JSON.stringify(r.errors))
  const image = r.post?.image
  check('통과: news 필드 보존', image?.kind === 'news' && image.src === NEWS_SRC && image.creditName === '예시일보' &&
    image.creditNameEn === 'Example Daily' && image.sourcePageUrl === ARTICLE && image.retrievedAt === '2026-11-09' &&
    image.faceNote === NEWS.faceNote && image.license === undefined, JSON.stringify(image))
}
{
  const r = run(base(PUBLIC))
  check('통과: public kogl-1', r.post?.image?.kind === 'public' && r.post.image.license === 'kogl-1', JSON.stringify(r.errors))
}
{
  const r = run(base({ ...NEWS, retrievedAt: new Date('2026-11-09T00:00:00Z') }))
  check('통과: YAML Date 확인일 → YYYY-MM-DD', r.post?.image?.retrievedAt === '2026-11-09', JSON.stringify(r.errors))
}
{
  const r = run(base({ ...SELF, creditName: '예시' }))
  check('통과+경고: self에 creditName → 무시 경고', Boolean(r.post) && r.notices.some((n) => /image\.creditName/.test(n)) && r.post?.image?.creditName === undefined, JSON.stringify(r.notices))
}
{
  const r = run(base({ ...NEWS, src: `  ${NEWS_SRC}  `, sourcePageUrl: `  ${ARTICLE} ` }))
  check('통과: 앞뒤 공백은 지우고 비교', r.post?.image?.src === NEWS_SRC && r.post.image.sourcePageUrl === ARTICLE, JSON.stringify(r.errors))
}

// ---------- B. 거부 ----------
expectReject('kind 값(stock)', base({ ...NEWS, kind: 'stock' }), /image\.kind: self \/ public \/ news/)
expectReject('news src http', base({ ...NEWS, src: 'http://img.example.org/og/1.jpg' }), /image\.src: kind `news`는 .*https/)
expectReject('news src 저장소 경로', base({ ...NEWS, src: '/images/sample-post/og.jpg' }), /image\.src: kind `news`는 .*https/)
for (const portal of [
  'https://imgnews.pstatic.net/x.jpg',
  'https://t1.daumcdn.net/x.jpg',
  'https://thumbnews.nateimg.co.kr/x.jpg',
  'https://n.news.naver.com/x.jpg',
  'https://v.daum.net/x.jpg',
  'https://m.news.nate.com/x.jpg',
]) {
  expectReject(`news src 포털(${new URL(portal).hostname})`, base({ ...NEWS, src: portal }), /image\.src: 포털 도메인/)
}
expectReject('news sourcePageUrl 없음', base({ ...NEWS, sourcePageUrl: undefined }), /image\.sourcePageUrl: kind `news`이면 필수/)
expectReject('news sourcePageUrl ∉ sources', base({ ...NEWS, sourcePageUrl: 'https://news.example.org/article/2' }), /sources\[\]\.url` 중 하나/)
expectReject('news sourcePageUrl 쿼리만 다른 주소(글자 그대로 비교)', base({ ...NEWS, sourcePageUrl: `${ARTICLE}?ref=x` }), /sources\[\]\.url` 중 하나/)
{
  const portalArticle = 'https://v.daum.net/v/0000'
  const data = base({ ...NEWS, sourcePageUrl: portalArticle })
  ;(data.sources as unknown[]).push({ type: '언론', name: '포털 전재', url: portalArticle, date: '2026-11-08' })
  expectReject('news sourcePageUrl 포털(sources에 있어도)', data, /image\.sourcePageUrl: 포털 전재 주소/)
}
expectReject('news sourcePageUrl = 언론 아닌 출처', base({ ...NEWS, sourcePageUrl: 'https://blog.example.com/1' }), /type `언론`인 출처/)
for (const field of ['creditName', 'creditNameEn', 'retrievedAt', 'faceNote'] as const) {
  expectReject(`news ${field} 누락`, base({ ...NEWS, [field]: undefined }), new RegExp(`image\\.${field}: kind \`news\`이면 필수`))
  expectReject(`public ${field} 누락`, base({ ...PUBLIC, [field]: undefined }), new RegExp(`image\\.${field}: kind \`public\`이면 필수`))
}
expectReject('news faceNote 빈 문자열', base({ ...NEWS, faceNote: '   ' }), /image\.faceNote/)
expectReject('news retrievedAt 형식', base({ ...NEWS, retrievedAt: '2026/11/09' }), /image\.retrievedAt/)
expectReject('news에 license', base({ ...NEWS, license: 'kogl-1' }), /image\.license: 공공누리 유형은 kind `public`에만/)
expectReject('public kogl-3(P5 미구현)', base({ ...PUBLIC, license: 'kogl-3' }), /kogl-3.*P5 미구현/)
expectReject('public license 누락', base({ ...PUBLIC, license: undefined }), /image\.license: kind `public`이면 필수/)
expectReject('public license kogl-2', base({ ...PUBLIC, license: 'kogl-2' }), /image\.license: kind `public`이면 필수/)
expectReject('public 외부 https src', base({ ...PUBLIC, src: NEWS_SRC }), /image\.src: `\/images\/`로 시작/)
expectReject('public sourcePageUrl 없음', base({ ...PUBLIC, sourcePageUrl: undefined }), /image\.sourcePageUrl: kind `public`이면 필수/)
expectReject('public sourcePageUrl 포털', base({ ...PUBLIC, sourcePageUrl: 'https://blog.naver.com/x' }), /포털 전재 주소/)
{
  const photo = (extra: Record<string, unknown>) =>
    base(undefined, { sourceType: 'photo', sourceUrl: undefined, images: [{ src: '/images/sample-post/1.jpg', alt: '사진' }], ...extra })
  expectReject('images[]에 news', photo({ images: [NEWS] }), /images\[0\]\.kind: `news`는 대표 이미지/)
  expectReject('images[]에 public', photo({ images: [PUBLIC] }), /images\[0\]\.kind: `public`는 대표 이미지/)
  expectReject('사진 유형 대표 이미지 news', photo({ image: NEWS }), /image\.kind: `news`는 sourceType `url`/)
  expectReject('사진 유형 대표 이미지 public', photo({ image: PUBLIC }), /image\.kind: `public`는 sourceType `url`/)
  const ok = run(photo({}))
  check('통과: 사진 유형 images[] self(기존)', Boolean(ok.post) && ok.post?.images[0]?.kind === 'self', JSON.stringify(ok.errors))
}

// ---------- C. isPortalUrl ----------
for (const url of ['https://naver.com/', 'https://news.naver.com/a', 'https://imgnews.pstatic.net/a', 'https://news.daum.net/a', 'https://img1.daumcdn.net/a', 'https://news.nate.com/a', 'https://news.zum.com/a', 'https://NEWS.NAVER.COM./a']) {
  check(`포털 참: ${url}`, isPortalUrl(url))
}
for (const url of ['https://notnaver.com/a', 'https://naver.com.example.org/a', 'https://daum.net.example.com/a', 'https://example.org/naver.com', 'not a url']) {
  check(`포털 거짓: ${url}`, !isPortalUrl(url))
}

// ---------- D. resolveCardMedia ----------
const newsPost = run(base(NEWS)).post as Post
const publicPost = run(base(PUBLIC)).post as Post
const selfPost = run(base(SELF)).post as Post
{
  const media = resolveCardMedia(newsPost)
  check('카드: news → remote', media.kind === 'remote' && media.src === NEWS_SRC, JSON.stringify(media))
  check('카드: news alt = image.alt(일반 문구 아님)', media.kind === 'remote' && media.alt === NEWS.alt, JSON.stringify(media))
  check('카드: news credit', media.kind === 'remote' && media.credit?.kind === 'news' && media.credit.creditName === '예시일보' &&
    media.credit.creditNameEn === 'Example Daily' && media.credit.sourcePageUrl === ARTICLE && media.credit.license === undefined, JSON.stringify(media))
  const en = resolveCardMedia(newsPost, 'en')
  check('카드: news en도 image.alt', en.kind === 'remote' && en.alt === NEWS.alt)
}
{
  const media = resolveCardMedia(publicPost)
  check('카드: public → local + credit(license)', media.kind === 'local' && media.credit?.kind === 'public' && media.credit.license === 'kogl-1', JSON.stringify(media))
}
{
  const media = resolveCardMedia(selfPost)
  check('카드: self → 이전과 같은 모양(kind·src·alt)', JSON.stringify(media) === JSON.stringify({ kind: 'local', src: SELF.src, alt: SELF.alt }), JSON.stringify(media))
}
{
  const legacyUseSource = { ...selfPost, image: undefined, useSourceImage: true, og: { image: 'https://www.example.com/og.jpg' } } as Post
  const media = resolveCardMedia(legacyUseSource)
  check('카드: useSourceImage 경로 불변(credit 없음·일반 alt)', media.kind === 'remote' && !('credit' in media) && media.alt.endsWith('원문 미리보기 이미지'), JSON.stringify(media))
}

// ---------- E. 영어본 ----------
{
  const tr = validateTranslation(
    { id: ID, title: 'Sample title', description: 'Sample summary', imageAlt: 'A sample lawmaker speaking in the plenary hall', translatedAt: '2026-11-09' },
    'Body',
    FILE,
    newsPost,
  )
  check('영어본: 검증 통과', Boolean(tr.translation), JSON.stringify(tr.errors))
  if (tr.translation) {
    const enPost = localizePost(newsPost, tr.translation)
    const image = enPost.image
    check('영어본: kind·크레딧·확인일·faceNote 유지', image?.kind === 'news' && image.creditNameEn === 'Example Daily' &&
      image.sourcePageUrl === ARTICLE && image.retrievedAt === '2026-11-09' && image.faceNote === NEWS.faceNote, JSON.stringify(image))
    check('영어본: alt만 영어', image?.alt === 'A sample lawmaker speaking in the plenary hall')
    const media = resolveCardMedia(enPost, 'en')
    check('영어본: 카드 remote', media.kind === 'remote' && media.src === NEWS_SRC)
  }
  const selfTr = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'Sample card image', translatedAt: '2026-11-09' }, 'Body', FILE, selfPost)
  if (selfTr.translation) {
    const enSelf = localizePost(selfPost, selfTr.translation)
    check('영어본: self 이미지 캡션 없음 유지(이전 동작)', enSelf.image !== undefined && !('caption' in enSelf.image))
  }
  const captioned = run(base({ ...SELF, caption: '한국어 캡션' })).post as Post
  const capTr = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'A', imageCaption: 'English caption', translatedAt: '2026-11-09' }, 'B', FILE, captioned)
  if (capTr.translation) check('영어본: 캡션은 영어 캡션으로', localizePost(captioned, capTr.translation).image?.caption === 'English caption')
}

// ---------- F. 렌더 ----------
function detail(post: Post, locale: 'ko' | 'en' = 'ko'): string {
  return renderToStaticMarkup(<PostDetail post={post} body="" locale={locale} />)
}
{
  const html = detail(newsPost)
  const fig = html.match(/<figcaption data-credit=""[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
  check('상세 ko news: figcaption 있음', fig.length > 0, html.slice(0, 200))
  check('상세 ko news: "사진: 예시일보"', fig.replace(/<[^>]+>/g, '').startsWith('사진: 예시일보'), fig)
  check('상세 ko news: 링크 href = sourcePageUrl', fig.includes(`href="${ARTICLE}"`))
  check('상세 ko news: rel="noopener" target="_blank"', /target="_blank" rel="noopener"/.test(fig))
  check('상세 ko news: 새 창 sr-only 안내', fig.includes('<span class="sr-only"> (새 창에서 열림)</span>'))
  check('상세 ko news: 링크 문구 "기사 원문"', fig.includes('기사 원문'))
  check('상세 ko news: 공공누리 문구 없음', !fig.includes('공공누리'))
  check('상세 ko news: figure 안에 <img src=핫링크>', /<figure[^>]*><div[^>]*><img [^>]*src="https:\/\/img\.example\.org\/og\/1\.jpg"/.test(html))
  check('상세 ko news: next/image 미경유(_next/image 0)', !html.includes('/_next/image'))
  check('상세 ko news: referrerpolicy 속성 없음', !/referrerpolicy/i.test(html))
  check('상세 ko news: alt = image.alt', html.includes(`alt="${NEWS.alt}"`))
}
{
  const tr = validateTranslation({ id: ID, title: 'Sample title', description: 'Sample summary', imageAlt: 'English alt', translatedAt: '2026-11-09' }, 'Body', FILE, newsPost)
  const html = detail(localizePost(newsPost, tr.translation!), 'en')
  const fig = html.match(/<figcaption data-credit=""[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
  check('상세 en news: "Photo: Example Daily"', fig.replace(/<[^>]+>/g, '').startsWith('Photo: Example Daily'), fig)
  check('상세 en news: "Source article" + 새 창 안내', fig.includes('Source article') && fig.includes('(opens in a new tab)'))
  check('상세 en news: 한국어 크레딧 미노출', !fig.includes('예시일보'))
}
{
  const html = detail(publicPost)
  const text = (html.match(/<figcaption data-credit=""[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? '').replace(/<[^>]+>/g, '')
  check('상세 ko public: "사진: 예시부(공공누리 제1유형)"', text.startsWith('사진: 예시부(공공누리 제1유형)'), text)
  check('상세 ko public: 공식 문구 요지', text.includes('본 저작물은 예시부에서 공공누리 제1유형으로 개방한 저작물을 이용하였습니다.'), text)
  check('상세 ko public: 링크 문구 "원문 페이지"', text.includes('원문 페이지'))
  const enTr = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'Building', translatedAt: '2026-11-09' }, 'B', FILE, publicPost)
  const enText = (detail(localizePost(publicPost, enTr.translation!), 'en').match(/<figcaption data-credit=""[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? '').replace(/<[^>]+>/g, '')
  check('상세 en public: "Photo: Ministry of Example (KOGL Type 1)"', enText.startsWith('Photo: Ministry of Example (KOGL Type 1)'), enText)
  check('상세 en public: KOGL 문구', enText.includes('This work was released by Ministry of Example under KOGL Type 1'), enText)
}
{
  const html = detail(selfPost)
  check('상세 self: 크레딧 figcaption 없음', !html.includes('<figcaption data-credit') && !html.includes('사진: '))
}
{
  const card = toCardView(newsPost, 'ko', true, '2026-11-09')
  const html = renderToStaticMarkup(<CardMedia media={card.media} />)
  check('카드 CardMedia: 크레딧 문구 없음(카드 UI 불변)', !html.includes('예시일보') && !html.includes('figcaption'), html)
  check('카드 CardMedia: <img> 직접 참조·referrerpolicy 없음', html.includes(`src="${NEWS_SRC}"`) && !/referrerpolicy/i.test(html), html)
}

// ---------- G. P11 구조화 데이터 ----------
for (const [label, post] of [['news', newsPost], ['public', publicPost]] as const) {
  for (const locale of ['ko', 'en'] as const) {
    const json = JSON.stringify(postJsonLd(post, locale))
    check(`P11 postJsonLd ${label} ${locale}: 이미지 주소 없음`, !json.includes(post.image!.src), json)
    check(`P11 postJsonLd ${label} ${locale}: image 키 없음`, !/"image"\s*:/.test(json))
  }
  const collection = JSON.stringify(collectionJsonLd({ name: 'n', description: 'd', path: '/', posts: [post] }))
  check(`P11 collectionJsonLd ${label}: 이미지 주소·image 키 없음`, !collection.includes(post.image!.src) && !/"image"\s*:/.test(collection), collection)
}

console.log(`케이스 ${passed + failures.length}개 · 통과 ${passed} · 실패 ${failures.length}`)
for (const failure of failures) console.log(`FAIL  ${failure}`)
if (failures.length > 0) process.exit(1)
