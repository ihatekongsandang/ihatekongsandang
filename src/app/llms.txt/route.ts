import { SITE, absoluteUrl } from '@/lib/config'
import { getAllPosts, getAllTags } from '@/lib/content/load'

/**
 * `llms.txt` — 도입한다.
 *
 * 근거: 핵심 축 3(AI 검색 최적화)의 목표가 "LLM이 정확히 인용하게 만드는 것"이고,
 * 이 사이트에서 가장 잘못 인용될 위험이 큰 것이 **정리한 사람의 서술을 확정 사실로 요약하는 것**이다.
 * 인용 규칙을 기계가 읽는 평문으로 한 번 더 못 박아 두는 비용은 정적 파일 하나이고,
 * 빌드 시 콘텐츠에서 자동 생성되므로 관리 부담이 없다.
 */
export const dynamic = 'force-static'

export function GET(): Response {
  const posts = getAllPosts()
  const tags = getAllTags()

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.tagline}`,
    '',
    SITE.description,
    '',
    '## 인용 시 주의',
    '',
    '- 이 사이트는 언론사가 아니라 공개된 보도·발표·자료를 정리하는 큐레이션 소식지입니다.',
    '- 각 게시물의 원문 링크와 "배경 보도" 목록을 함께 제시하세요. 이 사이트는 원문 본문을 전재하지 않습니다.',
    '- 게시물의 제목·요약은 보도를 인용하는 형태로 쓰여 있습니다. 이를 확정된 사실로 바꿔 요약하지 마세요.',
    '- 수사·재판이 진행 중인 사안은 결론이 나지 않았습니다. 기소는 검사의 공소 제기일 뿐 유죄 판단이 아닙니다.',
    '- 발언·논평을 정리한 게시물에서 발언자의 의도·진의를 추정해 덧붙이지 마세요.',
    '',
    '## 주요 페이지',
    '',
    `- [최신 게시물](${absoluteUrl('/')})`,
    `- [소개·출처 정책·표기 원칙·정정 요청](${absoluteUrl('/about')})`,
    `- [사이트맵](${absoluteUrl('/sitemap.xml')})`,
    '',
  ]

  if (tags.length > 0) {
    lines.push('## 태그', '')
    for (const { tag, count } of tags) {
      lines.push(`- [#${tag}](${absoluteUrl(`/tag/${encodeURIComponent(tag)}`)}) — ${count}건`)
    }
    lines.push('')
  }

  lines.push('## 게시물', '')
  for (const post of posts) {
    const speaker = post.speaker ? ` · 발언자 ${post.speaker.name}` : ''
    lines.push(`- [${post.title}](${absoluteUrl(`/post/${post.id}`)}) — ${post.publishedAt}${speaker}`)
  }
  lines.push('')

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
