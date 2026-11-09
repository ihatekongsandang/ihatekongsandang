import Link from 'next/link'
import { Pagination } from '@/components/pagination'
import { PostGrid } from '@/components/post-grid'
import { TagNav } from '@/components/tag-nav'
import type { TagSummary } from '@/lib/content/load'
import type { PostCardView } from '@/lib/content/view'
import { homePath, t, type Locale } from '@/lib/i18n'

interface FeedViewProps {
  heading: string
  lead?: string
  /** `/`·`/tag/{slug}`·`/en` — 쪽 이동 링크의 기준 경로. */
  basePath: string
  posts: PostCardView[]
  page: number
  totalPages: number
  totalItems: number
  tags: TagSummary[]
  activeTag?: string
  locale?: Locale
  /** 제목을 문자열 대신 직접 그릴 때(영어 사이트명의 한국어 부분에 `lang`을 달기 위해). */
  headingNode?: React.ReactNode
  /** 설명 아래 안내 한 줄(영어 피드의 "Korean only" 안내, 프로그래머 06). */
  notice?: string
}

/**
 * 피드 화면(홈·쪽·태그·영어 홈) — 구현 범위 3·14 · 보강안 A1.
 *
 * 홈 머리: h1 한 줄 + 소개 한 줄 접힘(`<details>`, JS 없음 — 768 이상은 전문) + 태그 레일 한 줄.
 * 소개 문단은 접혀 있어도 DOM에 전문이 있어 스크린리더·검색엔진은 전부 읽는다. "더보기"는 그 문단을 가리킨다(`aria-controls`).
 * 태그 피드(`activeTag`): 이동 경로(홈 › #태그) + h1 + "이 주제로 정리한 게시물 N건" + 현재 칩이 켜진 레일.
 * 태그 설명 문장(`lead`)은 메타 description에는 그대로 쓰고 화면에서는 건수 문장으로 바꾼다(보강안 태그 화면).
 */
export function FeedView({
  heading,
  lead,
  basePath,
  posts,
  page,
  totalPages,
  totalItems,
  tags,
  activeTag,
  locale = 'ko',
  headingNode,
  notice,
}: FeedViewProps) {
  const dict = t(locale)
  const introId = `feed-intro-${locale}`
  const isTag = Boolean(activeTag)

  return (
    <div>
      {/* 이동 경로 간격·터치 상자 방식은 post-detail.tsx 이동 경로 주석과 같다(프로그래머 16 C5). */}
      {isTag ? (
        <nav aria-label={dict.breadcrumbNav} className="flex items-center pt-1 text-sm text-muted-foreground">
          <Link
            href={homePath(locale)}
            className="-mx-[15px] inline-flex min-h-11 min-w-11 items-center px-[15px] text-link underline underline-offset-[3px]"
          >
            {dict.home}
          </Link>
          <span aria-hidden="true" className="pointer-events-none mx-1.5">
            ›
          </span>
          <span>#{activeTag}</span>
        </nav>
      ) : null}

      <div className={isTag ? 'pb-1' : 'pt-2 pb-1 md:pt-4'}>
        <h1 className="text-[22px] leading-7 font-bold tracking-[-0.02em] md:text-[26px] md:leading-8">
          {headingNode ?? heading}
        </h1>
        {isTag ? (
          <p className="mt-1 text-[15px] text-muted-foreground">{dict.tagPostCount(totalItems)}</p>
        ) : lead ? (
          <div className="feed-intro mt-1 md:mt-2">
            <p id={introId} className="text-[15px] leading-[1.5] text-muted-foreground md:max-w-[46em] md:text-base">
              {lead}
            </p>
            <details>
              <summary
                aria-controls={introId}
                className="inline-flex min-h-11 cursor-pointer items-center pr-1 pl-2 text-[15px] font-semibold whitespace-nowrap text-link"
              >
                <span className="intro-more">{dict.introMore}</span>
                <span className="intro-less">{dict.introLess}</span>
              </summary>
            </details>
          </div>
        ) : null}
        {notice ? <p className="my-1 text-sm leading-[1.5] text-muted-foreground">{notice}</p> : null}

        {/* 영어 페이지는 태그 칩을 두지 않는다 — 한국어 태그 페이지로 보내지 않기 위해(프로그래머 05). */}
        {locale === 'ko' ? <TagNav tags={tags} activeTag={activeTag} /> : null}
      </div>

      <div className="mt-1 flex items-baseline justify-between gap-3 py-2">
        <h2 className="text-[15px] font-bold">{isTag ? dict.tagFeedHeading : dict.latestPosts}</h2>
        <p className="text-[13px] text-muted-foreground">{dict.feedCount(totalItems, page, totalPages)}</p>
      </div>

      <PostGrid posts={posts} locale={locale} />
      <Pagination basePath={basePath} page={page} totalPages={totalPages} locale={locale} />
    </div>
  )
}
