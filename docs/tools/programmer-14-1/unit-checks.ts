/**
 * 프로그래머 14-1 — 리뷰 31 P3-1·P3-2·P3-3 검증 규칙의 통과·거부 사례.
 * 사용(저장소 루트): npx tsx docs/tools/programmer-14-1/unit-checks.ts
 * 픽스처 주소는 예시 도메인만 쓴다. 포털 판정용 포털 호스트에는 실제 기사가 아닌 경로(`/x`)만 붙인다.
 * 실패가 하나라도 있으면 종료 코드 1.
 * (프로그래머 15 갱신: C2로 public·news `caption`이 필수가 되어 NEWS·PUBLIC 픽스처에 caption만 넣었다. 검사 항목 수·기대값은 같다.)
 */
import { isPortalUrl, unusableNewsImageReason, validatePost } from '../../../src/lib/content/schema'

let passed = 0
const failures: string[] = []
function check(name: string, ok: boolean, detail = ''): void {
  if (ok) passed += 1
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
}

const ARTICLE = 'https://news.example.org/article/1'
const NEWS = {
  kind: 'news',
  src: 'https://img.example.org/og/1.jpg',
  alt: '예시 사진 설명',
  caption: '2026년 11월 예시 건물 외관(원 기사 사진 설명 기준).',
  creditName: '예시일보',
  creditNameEn: 'Example Daily',
  sourcePageUrl: ARTICLE,
  retrievedAt: '2026-11-09',
  faceNote: '얼굴 없음(건물)',
}
const PUBLIC = {
  kind: 'public',
  src: '/images/sample-post/thumb.jpg',
  alt: '예시 청사',
  caption: '2026년 11월 예시부 청사 전경(원 기사 사진 설명 기준).',
  creditName: '예시부',
  creditNameEn: 'Ministry of Example',
  sourcePageUrl: 'https://www.example.com/kogl/1',
  license: 'kogl-1',
  retrievedAt: '2026-11-09',
  faceNote: '얼굴 없음(건물)',
}
function post(image: Record<string, unknown>, extraSources: unknown[] = []) {
  return {
    id: 'sample-post',
    title: '예시',
    description: '예시 요약',
    publishedAt: '2026-11-09',
    sourceType: 'url',
    sourceUrl: 'https://www.example.com/p/1',
    attribution: '예시',
    sources: [{ type: '언론', name: '예시일보', url: ARTICLE, date: '2026-11-08' }, ...extraSources],
    image,
  }
}
const run = (data: Record<string, unknown>, today = '2026-11-09') =>
  validatePost(data, '', 'sample-post.md', { localImageExists: () => true, today })

// ── P3-1 포털 목록 보강 ──
for (const url of ['https://naver.me/x', 'https://news.kakao.com/x', 'https://news.google.com/x', 'https://www.msn.com/x', 'https://msn.com/x']) {
  check(`P3-1 포털 참: ${url}`, isPortalUrl(url))
}
for (const url of ['https://www.kakao.com/x', 'https://www.google.com/x', 'https://naver.me.example.org/x', 'https://notmsn.com/x', 'https://example.org/news.google.com']) {
  check(`P3-1 포털 거짓(뉴스 호스트만 막음): ${url}`, !isPortalUrl(url))
}
{
  const portal = 'https://naver.me/x'
  const r = run(post({ ...NEWS, sourcePageUrl: portal }, [{ type: '언론', name: '단축', url: portal, date: '2026-11-08' }]))
  check('P3-1 거부: news sourcePageUrl 단축 주소(naver.me)', !r.post && r.errors.some((e) => /포털 전재 주소/.test(e)), JSON.stringify(r.errors))
  const r2 = run(post({ ...NEWS, src: 'https://news.google.com/x.jpg' }))
  check('P3-1 거부: news src 집계 서비스(news.google.com)', !r2.post && r2.errors.some((e) => /포털 도메인 이미지/.test(e)), JSON.stringify(r2.errors))
}

// ── P3-2 news src 로컬·사설·문서 주소 ──
const BAD = [
  ['https://localhost/a.jpg', '로컬 주소'],
  ['https://cdn.localhost/a.jpg', '로컬 주소'],
  ['https://printer.local/a.jpg', '로컬 주소'],
  ['https://img.corp.internal/a.jpg', '로컬 주소'],
  ['https://127.0.0.1/a.jpg', '사설'],
  ['https://10.1.2.3/a.jpg', '사설'],
  ['https://172.16.0.1/a.jpg', '사설'],
  ['https://172.31.255.1/a.jpg', '사설'],
  ['https://192.168.0.10/a.jpg', '사설'],
  ['https://169.254.1.1/a.jpg', '사설'],
  ['https://0.0.0.0/a.jpg', '사설'],
  ['https://[::1]/a.jpg', '사설'],
  ['https://[fd12:3456::1]/a.jpg', '사설'],
  ['https://[fe80::1]/a.jpg', '사설'],
  ['https://img.example.org/article.html', '문서'],
  ['https://img.example.org/view.htm', '문서'],
  ['https://img.example.org/view.php', '문서'],
  ['https://img.example.org/view.ASPX', '문서'],
  ['https://img.example.org/page.jsp', '문서'],
] as const
for (const [src, kind] of BAD) {
  check(`P3-2 판정: ${src} → ${kind}`, (unusableNewsImageReason(src) ?? '').includes(kind), String(unusableNewsImageReason(src)))
  const r = run(post({ ...NEWS, src }))
  check(`P3-2 거부(검증): ${src}`, !r.post && r.errors.some((e) => /image\.src: .*쓸 수 없습니다/.test(e)), JSON.stringify(r.errors))
}
const GOOD = [
  'https://img.example.org/og/1.jpg',
  'https://img.example.org/og/1.webp?w=1200',
  'https://img.example.org/resize/1200x630/photo',
  'https://172.32.0.1/a.jpg', // 172.16/12 밖
  'https://192.169.0.1/a.jpg',
  'https://img.example.org/html/photo.jpg', // 경로 중간 html은 문서 아님
]
for (const src of GOOD) {
  check(`P3-2 통과: ${src}`, unusableNewsImageReason(src) === undefined && Boolean(run(post({ ...NEWS, src })).post), String(unusableNewsImageReason(src)))
}
{
  const r = run(post({ ...PUBLIC }))
  check('P3-2 범위: public(저장소 경로)에는 적용 안 함 — 통과', Boolean(r.post), JSON.stringify(r.errors))
}

// ── P3-3 미래 retrievedAt ──
{
  check('P3-3 통과: 확인일 = 오늘', Boolean(run(post({ ...NEWS, retrievedAt: '2026-11-09' })).post))
  check('P3-3 통과: 확인일 < 오늘', Boolean(run(post({ ...NEWS, retrievedAt: '2026-10-01' })).post))
  const r = run(post({ ...NEWS, retrievedAt: '2026-11-10' }))
  check('P3-3 거부(news): 확인일 = 내일', !r.post && r.errors.some((e) => /retrievedAt: 미래 날짜/.test(e) && e.includes('오늘 2026-11-09')), JSON.stringify(r.errors))
  const r2 = run(post({ ...PUBLIC, retrievedAt: '2027-01-01' }))
  check('P3-3 거부(public): 확인일 = 내년', !r2.post && r2.errors.some((e) => /retrievedAt: 미래 날짜/.test(e)), JSON.stringify(r2.errors))
  const r3 = run(post({ ...NEWS, retrievedAt: new Date('2026-11-12T00:00:00Z') }))
  check('P3-3 거부: YAML Date 미래', !r3.post && r3.errors.some((e) => /미래 날짜/.test(e)), JSON.stringify(r3.errors))
  // today 미지정 → 실행 시점 서울 날짜 사용: 아주 먼 미래는 거부, 과거는 통과
  const far = validatePost(post({ ...NEWS, retrievedAt: '2999-01-01' }), '', 'sample-post.md', { localImageExists: () => true })
  check('P3-3 기본값(실행 시점): 2999-01-01 거부', !far.post && far.errors.some((e) => /미래 날짜/.test(e)), JSON.stringify(far.errors))
  const past = validatePost(post({ ...NEWS, retrievedAt: '2020-01-01' }), '', 'sample-post.md', { localImageExists: () => true })
  check('P3-3 기본값(실행 시점): 2020-01-01 통과', Boolean(past.post), JSON.stringify(past.errors))
}

console.log(`케이스 ${passed + failures.length}개 · 통과 ${passed} · 실패 ${failures.length}`)
for (const f of failures) console.log(`FAIL  ${f}`)
if (failures.length) process.exit(1)
