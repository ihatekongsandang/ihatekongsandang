import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { TagChip } from '@/components/tag-nav'
import { SITE } from '@/lib/config'
import { getAllTags } from '@/lib/content/load'
import { breadcrumbJsonLd } from '@/lib/seo'

/**
 * 전체 태그(프로그래머 08, 디자이너 01 시안 A). 피드 상단 칩은 상위 몇 개만 보이므로 나머지는 여기서 찾는다.
 *
 * 완전 정적 — 빌드 시 `getAllTags()` 순서(건수 내림차순 → 이름순) 그대로 한 목록만 그린다.
 * 가나다 정렬 전환 같은 클라이언트 상태는 두지 않는다(오더 권고: 건수 순 단일 목록).
 * 영어 사이트에는 태그 칩이 없으므로 `/en/tags`는 만들지 않는다 — 언어 전환 링크는 영어 홈으로 보낸다(태그 피드와 같다).
 */
const TITLE = '전체 태그'
const PATH = '/tags'

function description(total: number): string {
  return `${SITE.name}의 태그 ${total}개를 게시물이 많은 순으로 모았습니다. ${SITE.tagline}`
}

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: description(getAllTags().length),
    alternates: { canonical: PATH },
  }
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <PageFrame locale="ko" languageLinks={{ ko: PATH, en: '/en' }}>
      <div className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{TITLE}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
            태그 {tags.length}개 · 게시물이 많은 순
          </p>
        </header>

        {tags.length > 0 ? (
          // Tailwind가 목록 기호를 지우면 Safari VoiceOver가 목록으로 읽지 않으므로 role을 다시 단다.
          <ul role="list" aria-label="태그 목록" className="flex flex-wrap items-center gap-2 border-t pt-6">
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <TagChip tag={tag} count={count} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-t pt-6 text-sm text-muted-foreground">아직 태그가 없습니다.</p>
        )}

        <p className="border-t pt-6 text-sm">
          <Link href="/" className="text-link underline underline-offset-2">
            최신 게시물 보기
          </Link>
        </p>
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: TITLE, path: PATH },
        ])}
      />
    </PageFrame>
  )
}
