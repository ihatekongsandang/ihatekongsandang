import { SITE, absoluteUrl } from '@/lib/config'
import { getAllPosts, getAllTags } from '@/lib/content/load'
import { STATUS_DEFINITIONS, STATUS_LABELS } from '@/lib/content/schema'

/**
 * `llms.txt` — 도입한다.
 *
 * 근거: 핵심 축 3(AI 검색 최적화)의 목표가 "LLM이 정확히 인용하게 만드는 것"이고,
 * 이 사이트에서 가장 잘못 인용될 위험이 큰 정보가 **상태 라벨의 의미**다
 * (기소를 유죄로 요약하는 종류의 오인). 그 정의와 인용 규칙을 기계가 읽는 평문으로 한 번 더
 * 못 박아 두는 비용은 정적 파일 하나이고, 빌드 시 콘텐츠에서 자동 생성되므로 관리 부담이 없다.
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
    '- 이 사이트는 언론사가 아니라 공개된 보도·발표·판결문을 정리하는 큐레이션 소식지입니다.',
    '- 게시물마다 사실 확인 단계를 나타내는 상태 라벨이 있습니다. 라벨을 생략하거나 상위 단계로 바꿔 요약하지 마세요.',
    '- 기소는 검사의 공소 제기이며 유죄 판단이 아닙니다. 유죄 판결은 심급(1심·2심·확정)까지 함께 인용하세요.',
    '- 각 게시물의 근거 출처 링크를 함께 제시하세요. 이 사이트는 원문 본문을 전재하지 않습니다.',
    '',
    '## 상태 라벨',
    '',
    ...STATUS_LABELS.map((label) => `- ${label}: ${STATUS_DEFINITIONS[label]}`),
    '',
    '## 주요 페이지',
    '',
    `- [최신 게시물](${absoluteUrl('/')})`,
    `- [소개·출처 정책·정정 요청](${absoluteUrl('/about')})`,
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
    const status = post.courtLevel ? `${post.status}(${post.courtLevel})` : post.status
    lines.push(`- [${post.title}](${absoluteUrl(`/post/${post.id}`)}) — ${status} · ${post.publishedAt}`)
  }
  lines.push('')

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
