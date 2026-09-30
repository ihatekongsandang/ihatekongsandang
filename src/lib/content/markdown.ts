import rehypeExternalLinks from 'rehype-external-links'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { t, type Locale } from '../i18n'

/**
 * 게시물 본문 마크다운 → 안전한 HTML.
 *
 * 파이프라인 순서에 의미가 있다.
 *  1. `remark-rehype`를 `allowDangerousHtml` 없이 통과시켜 **원본 HTML을 통째로 버린다**.
 *  2. `rehype-sanitize`(GitHub 기본 스키마)로 남은 트리를 한 번 더 걸러낸다.
 *  3. 그 다음에야 `rehype-external-links`로 `target`·`rel`을 붙인다.
 *     sanitize를 뒤에 두면 방금 붙인 속성이 기본 스키마에서 떨어져 나가므로 순서를 바꾸지 않는다.
 *
 * `rel` 값은 편집 정책을 따른다 — 운영자가 큐레이션한 링크이므로 `noopener`만 붙이고
 * `nofollow`·`ugc`·`noreferrer`는 붙이지 않는다(출처에 유입 신호를 돌려준다).
 * rehype-external-links의 기본값은 `nofollow`이므로 반드시 명시적으로 덮어써야 한다.
 * 검수 없이 노출되는 UGC 링크(v0.6 댓글)는 별도 렌더러에서 `nofollow ugc noopener`를 쓴다.
 */

/**
 * 본문에서 이미지를 뺀 sanitize 스키마.
 *
 * 마크다운 `![alt](https://…)`는 기본 스키마를 통과해 `<img src="https://…">`로 렌더된다.
 * 그 경로는 게시물 이미지에 걸어 둔 장치를 전부 우회한다 — `alt` 필수 검증도,
 * `useSourceImage`(원문 썸네일 사용 여부) 판단도, 깨졌을 때 플레이스홀더로 바꾸는 폴백도
 * 거치지 않는다. 게다가 기본 스키마의 `img` 허용 속성에는 `alt`가 아예 없어서
 * 통과시켜도 대체 텍스트 없는 이미지가 된다.
 *
 * 사진은 frontmatter `images[]`로만 넣는 것이 정책이므로 `img` 태그 자체를 허용 목록에서 뺀다.
 * 본문에 마크다운 이미지를 쓰면 렌더에서 사라지고, 빌드 검증이 그 사실을 경고로 알려 준다.
 */
const bodySchema = {
  ...defaultSchema,
  tagNames: (defaultSchema.tagNames ?? []).filter((tagName) => tagName !== 'img'),
}
/** hast 트리의 `<a href>`를 바꾸는 최소 플러그인(추가 의존성 없이 재귀 순회). */
interface HastNode {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

function rehypeRewriteLinks(options: { rewrite: (href: string) => string }) {
  const visit = (node: HastNode) => {
    if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
      node.properties.href = options.rewrite(node.properties.href)
    }
    node.children?.forEach(visit)
  }
  return (tree: HastNode) => {
    visit(tree)
  }
}

function createProcessor(locale: Locale, rewriteHref?: (href: string) => string) {
  const base = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeSanitize, bodySchema)
  const withLinks = rewriteHref ? base.use(rehypeRewriteLinks, { rewrite: rewriteHref }) : base
  return withLinks
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener'],
      protocols: ['http', 'https'],
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['sr-only'] },
        children: [{ type: 'text', value: t(locale).opensInNewTab }],
      },
    })
    .use(rehypeStringify)
}

const koProcessor = createProcessor('ko')

export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await koProcessor.process(markdown)
  return String(file)
}

/**
 * 영어본 본문 렌더. 본문 안의 내부 게시물 링크 `/post/{id}`는 **대상 영어본이 있을 때만**
 * `/en/post/{id}`로 바꾸고, 없으면 한국어 페이지 링크를 그대로 둔다(프로그래머 05 오더 §1).
 * 치환은 sanitize를 통과한 뒤의 `href` 값에만 적용한다 — 경로 형태가 정확히 맞을 때만 바꾸고
 * 쿼리·해시는 보존한다. 외부 링크·다른 내부 경로는 건드리지 않는다.
 */
export async function renderEnglishMarkdown(markdown: string, hasEnglish: (id: string) => boolean): Promise<string> {
  const processor = createProcessor('en', (href) => {
    const match = /^\/post\/([a-z0-9]+(?:-[a-z0-9]+)*)(\/?)([?#].*)?$/.exec(href)
    if (!match) return href
    const [, id, , suffix = ''] = match
    return id && hasEnglish(id) ? `/en/post/${id}${suffix}` : href
  })
  const file = await processor.process(markdown)
  return String(file)
}
