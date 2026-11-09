/**
 * 프로그래머 15 — C1(상세 사진 설명 표시) · C2(caption 필수·160자 경고) · C7(깨짐 시 설명 줄 숨김의 서버 HTML 쪽) · P3-N1(IPv4 매핑 IPv6·CGNAT) 검사.
 *
 * 사용(저장소 루트): npx tsx --tsconfig docs/tools/programmer-15/tsconfig.json docs/tools/programmer-15/unit-checks.tsx
 *   (저장소 tsconfig는 `jsx: preserve`라 컴포넌트를 직접 렌더하려면 이 설정이 필요하다 — programmer-13과 같은 방식)
 *
 * 테스트 주소는 예시 도메인(`example.org`·`example.com`)과 문서·예약용 IP 표기만 쓴다. 실제 언론 이미지 주소는 없다.
 *
 *  A. C2 검증: public·news caption 누락·빈 문자열·공백·문자열 아님 → 오류 / 160자 경고 경계 / self는 caption 선택(경고 없음)
 *  B. C2 영어본: public·news 원본이면 imageCaption 필수(빈 값 불가), 있으면 영어 caption으로 바뀜
 *  C. C1 렌더(react-dom/server): ko/en × news/public 사진 설명 표시·순서(크레딧 줄 위)·언어, self caption 미표시, 카드에 caption 없음,
 *     카드 데이터(toCardView)·JSON-LD에 caption 없음
 *  D. C7 서버 HTML: MediaFigure가 figure 안에 이미지 + figcaption을 그리고, 실패 표시(data-media-failed)는 없다(실패는 브라우저에서만 — caption-browser.mjs)
 *  E. P3-N1: unusableNewsImageReason·validatePost 거부/통과 경계
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { CardMedia, MediaFigure } from '../../../src/components/card-media'
import { PostDetail } from '../../../src/components/post-detail'
import { resolveCardMedia, unusableNewsImageReason, validatePost, type Post } from '../../../src/lib/content/schema'
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
const NEWS_CAPTION = '2026년 11월 8일 국회 본회의장에서 예시 의원이 발언하는 모습(원 기사 사진 설명 기준). 사진 속 인물이 이 게시물이 다루는 의혹의 당사자임을 뜻하지 않습니다.'
const PUBLIC_CAPTION = '2026년 11월 예시부 청사 전경(원 기사 사진 설명 기준).'
const SELF_CAPTION = '원문 게시물 썸네일'
const EN_NEWS_CAPTION = 'A sample lawmaker speaking in the plenary hall on Nov. 8, 2026 (per the original photo caption).'
const EN_PUBLIC_CAPTION = 'The Ministry of Example building, November 2026 (per the original photo caption).'

function base(image?: Record<string, unknown>): Record<string, unknown> {
  return {
    id: ID,
    title: '예시 제목',
    description: '예시 요약',
    publishedAt: '2026-11-09',
    sourceType: 'url',
    sourceUrl: 'https://www.example.com/post/1',
    attribution: '예시 출처',
    sources: [{ type: '언론', name: '예시일보', url: ARTICLE, date: '2026-11-08' }],
    tags: ['예시'],
    ...(image ? { image } : {}),
  }
}
const NEWS = {
  kind: 'news',
  src: NEWS_SRC,
  alt: '국회 본회의장에서 발언하는 예시 의원',
  caption: NEWS_CAPTION,
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
  caption: PUBLIC_CAPTION,
  creditName: '예시부',
  creditNameEn: 'Ministry of Example',
  sourcePageUrl: 'https://www.example.com/kogl/photo/1',
  license: 'kogl-1',
  retrievedAt: '2026-11-09',
  faceNote: '얼굴 없음(건물)',
}
const SELF = { src: '/images/sample-post/card.png', alt: '예시 카드 이미지', caption: SELF_CAPTION }
const run = (data: Record<string, unknown>) => validatePost(data, '', FILE, { localImageExists: () => true, today: '2026-11-09' })
const captionError = (r: ReturnType<typeof run>, kind: string) =>
  r.errors.some((e) => e.startsWith(`image.caption: kind \`${kind}\`이면 필수입니다`))

// ---------- A. C2 검증 ----------
for (const [label, image] of [['news', NEWS], ['public', PUBLIC]] as const) {
  for (const [what, value] of [['없음', undefined], ['빈 문자열', ''], ['공백만', '   \n '], ['null', null], ['숫자', 123], ['목록', ['설명']]] as const) {
    const r = run(base({ ...image, caption: value }))
    check(`C2 거부: ${label} caption ${what} → 빌드 중단 오류`, !r.post && captionError(r, label), JSON.stringify(r.errors))
  }
  const ok = run(base(image))
  check(`C2 통과: ${label} caption 있음`, Boolean(ok.post) && ok.post?.image?.caption === image.caption, JSON.stringify(ok.errors))
  check(`C2 통과: ${label} 160자 이하 → caption 경고 없음`, !ok.notices.some((n) => n.startsWith('image.caption')), JSON.stringify(ok.notices))
  const exact = run(base({ ...image, caption: '가'.repeat(160) }))
  check(`C2 경계: ${label} 정확히 160자 → 경고 없음`, Boolean(exact.post) && !exact.notices.some((n) => n.startsWith('image.caption')), JSON.stringify(exact.notices))
  const over = run(base({ ...image, caption: '가'.repeat(161) }))
  check(`C2 경계: ${label} 161자 → 경고(빌드는 진행)`, Boolean(over.post) && over.notices.some((n) => n === 'image.caption이 161자입니다 — 160자 이내를 권합니다(정책 §3.6).'), JSON.stringify(over.notices))
  const trimmed = run(base({ ...image, caption: `  ${'가'.repeat(160)}  ` }))
  check(`C2 경계: ${label} 앞뒤 공백은 길이에서 뺀다(160자 + 공백 → 경고 없음)`, Boolean(trimmed.post) && trimmed.post?.image?.caption === '가'.repeat(160) && !trimmed.notices.some((n) => n.startsWith('image.caption')), JSON.stringify(trimmed.notices))
}
{
  const noCaption = run(base({ src: SELF.src, alt: SELF.alt }))
  check('C2 범위: self caption 없음 → 통과(선택 유지)', Boolean(noCaption.post) && noCaption.errors.length === 0, JSON.stringify(noCaption.errors))
  const longSelf = run(base({ ...SELF, caption: '가'.repeat(300) }))
  check('C2 범위: self caption 300자 → 경고 없음(self는 화면에 안 나와 길이 기준 미적용)', Boolean(longSelf.post) && !longSelf.notices.some((n) => n.includes('caption')), JSON.stringify(longSelf.notices))
}
{
  // 오류 메시지가 사진 설명 형식을 안내하는지(업로더용)
  const r = run(base({ ...NEWS, caption: undefined }))
  check('C2 메시지: 정책 §3.6 형식 안내 포함', r.errors.some((e) => e.includes('정책 §3.6')), JSON.stringify(r.errors))
}

// ---------- B. C2 영어본 ----------
const newsPost = run(base(NEWS)).post as Post
const publicPost = run(base(PUBLIC)).post as Post
const selfPost = run(base(SELF)).post as Post
const tr = (post: Post, extra: Record<string, unknown>) =>
  validateTranslation({ id: ID, title: 'Sample title', description: 'Sample summary', imageAlt: 'English alt', translatedAt: '2026-11-09', ...extra }, 'Body', FILE, post)
for (const [label, post, enCaption] of [['news', newsPost, EN_NEWS_CAPTION], ['public', publicPost, EN_PUBLIC_CAPTION]] as const) {
  const missing = tr(post, {})
  check(`C2 영어본 거부: ${label} imageCaption 없음`, !missing.translation && missing.errors.some((e) => e.startsWith('imageCaption: 한국어 원본에 image.caption이 있으므로 필수')), JSON.stringify(missing.errors))
  const empty = tr(post, { imageCaption: '  ' })
  check(`C2 영어본 거부: ${label} imageCaption 공백만`, !empty.translation && empty.errors.some((e) => e.startsWith('imageCaption:')), JSON.stringify(empty.errors))
  const ok = tr(post, { imageCaption: enCaption })
  check(`C2 영어본 통과: ${label} imageCaption 있음`, Boolean(ok.translation), JSON.stringify(ok.errors))
  if (ok.translation) {
    const en = localizePost(post, ok.translation)
    check(`C2 영어본: ${label} 영어 상세 caption = imageCaption`, en.image?.caption === enCaption, JSON.stringify(en.image))
  }
}

// ---------- C. C1 렌더 ----------
function detail(post: Post, locale: 'ko' | 'en' = 'ko'): string {
  return renderToStaticMarkup(<PostDetail post={post} body="" locale={locale} />)
}
const figcaptionOf = (html: string) => html.match(/<figcaption data-credit=""[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
const paragraphs = (fig: string) => [...fig.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => (m[1] ?? '').replace(/<[^>]+>/g, ''))
const enOf = (post: Post, caption: string) => localizePost(post, tr(post, { imageCaption: caption }).translation!)

{
  const fig = figcaptionOf(detail(newsPost))
  const ps = paragraphs(fig)
  check('C1 ko news: figcaption 안에 사진 설명 줄', fig.includes(`<p data-image-caption="">${NEWS_CAPTION}</p>`), fig)
  check('C1 ko news: 사진 설명이 첫 줄, 크레딧 줄이 다음', ps[0] === NEWS_CAPTION && (ps[1] ?? '').startsWith('사진: 예시일보 · 기사 원문'), JSON.stringify(ps))
  check('C1 ko news: 줄 수 2(설명·크레딧)', ps.length === 2, JSON.stringify(ps))
}
{
  const html = detail(enOf(newsPost, EN_NEWS_CAPTION), 'en')
  const ps = paragraphs(figcaptionOf(html))
  check('C1 en news: 영어 사진 설명이 첫 줄', ps[0] === EN_NEWS_CAPTION, JSON.stringify(ps))
  check('C1 en news: 크레딧 줄 "Photo: Example Daily · Source article"', (ps[1] ?? '').startsWith('Photo: Example Daily · Source article'), JSON.stringify(ps))
  check('C1 en news: 한국어 사진 설명이 영어 페이지 어디에도 없음', !html.includes(NEWS_CAPTION))
}
{
  const ps = paragraphs(figcaptionOf(detail(publicPost)))
  check('C1 ko public: 사진 설명 → 크레딧(공공누리) → 공식 문구 요지 순서', ps[0] === PUBLIC_CAPTION && (ps[1] ?? '').startsWith('사진: 예시부(공공누리 제1유형) · 원문 페이지') &&
    (ps[2] ?? '').startsWith('본 저작물은 예시부에서'), JSON.stringify(ps))
  const enHtml = detail(enOf(publicPost, EN_PUBLIC_CAPTION), 'en')
  const enPs = paragraphs(figcaptionOf(enHtml))
  check('C1 en public: 영어 사진 설명 → Photo 줄 → KOGL 문구', enPs[0] === EN_PUBLIC_CAPTION && (enPs[1] ?? '').startsWith('Photo: Ministry of Example (KOGL Type 1)') &&
    (enPs[2] ?? '').startsWith('This work was released by'), JSON.stringify(enPs))
  check('C1 en public: 한국어 사진 설명 없음', !enHtml.includes(PUBLIC_CAPTION))
}
{
  const html = detail(selfPost)
  check('C1 회귀 ko self: caption 글자 미표시', !html.includes(SELF_CAPTION), html.slice(0, 120))
  check('C1 회귀 ko self: figcaption·사진 설명 줄 없음', !html.includes('<figcaption') && !html.includes('data-image-caption'))
  const selfTr = validateTranslation({ id: ID, title: 'T', description: 'D', imageAlt: 'Sample card image', imageCaption: 'Original post thumbnail', translatedAt: '2026-11-09' }, 'Body', FILE, selfPost)
  const enHtml = detail(localizePost(selfPost, selfTr.translation!), 'en')
  check('C1 회귀 en self: 영어 caption·한국어 caption 모두 미표시', !enHtml.includes('Original post thumbnail') && !enHtml.includes(SELF_CAPTION) && !enHtml.includes('<figcaption'))
}
{
  // 카드에는 사진 설명·크레딧이 나오지 않는다(카드 UI 불변). 카드 데이터에도 caption이 들어가지 않는다(클라이언트 전달 데이터 불변).
  for (const [label, post] of [['news', newsPost], ['public', publicPost], ['self', selfPost]] as const) {
    const card = toCardView(post, 'ko', true, '2026-11-09')
    const html = renderToStaticMarkup(<CardMedia media={card.media} />)
    const caption = post.image?.caption as string
    check(`C1 카드 ${label}: 카드 HTML에 사진 설명 없음`, !html.includes(caption) && !html.includes('figcaption'), html)
    check(`C1 카드 ${label}: 카드 데이터(toCardView)에 사진 설명 없음`, !JSON.stringify(card).includes(caption), JSON.stringify(card))
    check(`C1 카드 ${label}: resolveCardMedia 결과에 caption 없음`, !JSON.stringify(resolveCardMedia(post)).includes(caption))
  }
}
for (const [label, post] of [['news', newsPost], ['public', publicPost]] as const) {
  for (const locale of ['ko', 'en'] as const) {
    const json = JSON.stringify(postJsonLd(post, locale))
    check(`C1 JSON-LD ${label} ${locale}: 사진 설명 없음`, !json.includes(post.image!.caption as string), json)
  }
  const collection = JSON.stringify(collectionJsonLd({ name: 'n', description: 'd', path: '/', posts: [post] }))
  check(`C1 collectionJsonLd ${label}: 사진 설명 없음`, !collection.includes(post.image!.caption as string))
}

// ---------- D. C7 서버 HTML ----------
{
  const html = detail(newsPost)
  const figure = html.match(/<figure class="mt-5"[^>]*>([\s\S]*?)<\/figure>/)
  check('C7 SSR news: <figure class="mt-5"> 안에 <img>와 figcaption이 함께', Boolean(figure) && /<img [^>]*src="https:\/\/img\.example\.org\/og\/1\.jpg"/.test(figure?.[1] ?? '') && (figure?.[1] ?? '').includes('<figcaption data-credit'), html.slice(0, 300))
  check('C7 SSR news: 실패 표시 없음(data-media-failed 0)', !html.includes('data-media-failed'))
  const direct = renderToStaticMarkup(
    <MediaFigure media={resolveCardMedia(newsPost)} className="x">
      <figcaption>설명</figcaption>
    </MediaFigure>,
  )
  check('C7 SSR MediaFigure: children(설명 줄)을 그린다', direct.includes('<figure class="x"><div') && direct.includes('<figcaption>설명</figcaption></figure>'), direct)
  const placeholder = renderToStaticMarkup(
    <MediaFigure media={{ kind: 'placeholder' }}>
      <figcaption>설명</figcaption>
    </MediaFigure>,
  )
  check('C7 SSR MediaFigure: 대체 카드 media에도 설명 줄은 그대로(실패 상태가 아니면 숨기지 않는다 — 상세는 placeholder면 figure 자체를 안 그린다)', placeholder.includes('role="img"') && placeholder.includes('<figcaption>설명</figcaption>'), placeholder)
  const noImage = detail({ ...newsPost, image: undefined } as Post)
  check('C7 SSR: 이미지 없는 url 게시물 상세 → figure 없음(이전 동작)', !noImage.includes('<figure class="mt-5"'))
}

// ---------- E. P3-N1 ----------
const rejects = [
  'https://[::ffff:127.0.0.1]/a.jpg',
  'https://[::ffff:7f00:1]/a.jpg',
  'https://[::FFFF:7F00:1]/a.jpg',
  'https://[0:0:0:0:0:ffff:7f00:1]/a.jpg',
  'https://[0000:0000:0000:0000:0000:ffff:127.0.0.1]/a.jpg',
  'https://[::ffff:10.1.2.3]/a.jpg',
  'https://[::ffff:172.16.0.1]/a.jpg',
  'https://[::ffff:172.31.255.255]/a.jpg',
  'https://[::ffff:192.168.0.1]/a.jpg',
  'https://[::ffff:169.254.169.254]/a.jpg',
  'https://[::ffff:0.0.0.0]/a.jpg',
  'https://[::ffff:100.64.0.1]/a.jpg',
  'https://[::ffff:6440:1]/a.jpg',
  'https://100.64.0.0/a.jpg',
  'https://100.64.0.1/a.jpg',
  'https://100.100.100.100/a.jpg',
  'https://100.127.255.255/a.jpg',
  'https://100.0x40.0.1/a.jpg',
]
const passes = [
  'https://100.63.255.255/a.jpg',
  'https://100.128.0.0/a.jpg',
  'https://100.1.2.3/a.jpg',
  'https://[::ffff:100.63.255.255]/a.jpg',
  'https://[::ffff:100.128.0.1]/a.jpg',
  'https://[::ffff:172.32.0.1]/a.jpg',
  'https://[::ffff:203.0.113.10]/a.jpg',
  'https://[2001:db8::1]/a.jpg',
  'https://[64:ff9b::a00:1]/a.jpg',
  NEWS_SRC,
]
for (const url of rejects) {
  check(`P3-N1 거부: ${url}`, unusableNewsImageReason(url) === '사설·루프백 IP 주소', String(unusableNewsImageReason(url)))
  const r = run(base({ ...NEWS, src: url }))
  check(`P3-N1 검증 오류: ${url}`, !r.post && r.errors.some((e) => e.startsWith('image.src: 사설·루프백 IP 주소는 쓸 수 없습니다')), JSON.stringify(r.errors))
}
for (const url of passes) {
  check(`P3-N1 통과: ${url}`, unusableNewsImageReason(url) === undefined, String(unusableNewsImageReason(url)))
}
{
  // 기존 규칙(14-1) 회귀 대표값
  for (const url of ['https://127.0.0.1/a.jpg', 'https://10.0.0.1/a.jpg', 'https://[::1]/a.jpg', 'https://[fe80::1]/a.jpg', 'https://[fd00::1]/a.jpg']) {
    check(`P3-2 회귀 거부: ${url}`, unusableNewsImageReason(url) === '사설·루프백 IP 주소')
  }
  check('P3-2 회귀: public(저장소 경로)에는 적용 안 함', Boolean(run(base(PUBLIC)).post))
}

console.log(`케이스 ${passed + failures.length}개 · 통과 ${passed} · 실패 ${failures.length}`)
for (const failure of failures) console.log(`FAIL  ${failure}`)
if (failures.length > 0) process.exit(1)
