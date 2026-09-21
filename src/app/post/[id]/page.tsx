import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { ExternalLink } from '@/components/external-link'
import { Gallery } from '@/components/gallery'
import { JsonLd } from '@/components/json-ld'
import { SourceList } from '@/components/source-list'
import { StatusBadge } from '@/components/status-badge'
import { StatusHistory } from '@/components/status-history'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CardMedia } from '@/components/card-media'
import { getAllPosts, getPostById } from '@/lib/content/load'
import { renderMarkdown } from '@/lib/content/markdown'
import { STATUS_DEFINITIONS, resolveCardMedia } from '@/lib/content/schema'
import { SOURCE_TYPE_LABELS } from '@/lib/content/view'
import { breadcrumbJsonLd, postJsonLd } from '@/lib/seo'
import { cn, formatKoreanDate } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ id: post.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params
  const post = getPostById(id)
  if (!post) return {}

  /*
   * Next는 `openGraph`를 깊은 병합하지 않는다. 여기서 객체를 새로 돌려주는 순간
   * 루트 `opengraph-image.tsx`가 만든 이미지가 이 경로에서 떨어져 나가고,
   * `twitter:image`는 `openGraph.images`에서 파생되므로 함께 사라진다.
   * 공유되는 URL이 바로 이 게시물 상세라 미리보기 이미지가 비면 안 된다.
   * 상위 메타데이터에서 이미지를 받아 명시적으로 다시 얹는다.
   * 원문 썸네일은 여기에 절대 쓰지 않는다 — 자체 OG 이미지만 쓴다(인용 범위·초상권).
   */
  const parentImages = (await parent).openGraph?.images ?? []

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/post/${post.id}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/post/${post.id}`,
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      images: parentImages,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) notFound()

  const body = post.body.trim().length > 0 ? await renderMarkdown(post.body) : ''
  const media = resolveCardMedia(post)
  const isUrlPost = post.sourceType === 'url'

  return (
    <article className="mx-auto w-full max-w-3xl space-y-8">
      <nav aria-label="현재 위치" className="text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <span aria-hidden="true"> / </span>
        <span>게시물</span>
      </nav>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={post.status} courtLevel={post.courtLevel} />
          <Badge>{SOURCE_TYPE_LABELS[post.sourceType]}</Badge>
          {post.submittedBy ? <Badge>제보: {post.submittedBy}</Badge> : null}
        </div>

        <h1 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">{post.title}</h1>

        <p className="text-base text-muted-foreground">{post.description}</p>

        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <div className="flex gap-1">
            <dt>게시</dt>
            <dd>
              <time dateTime={post.publishedAt}>{formatKoreanDate(post.publishedAt)}</time>
            </dd>
          </div>
          {post.updatedAt ? (
            <div className="flex gap-1">
              <dt>갱신</dt>
              <dd>
                <time dateTime={post.updatedAt}>{formatKoreanDate(post.updatedAt)}</time>
              </dd>
            </div>
          ) : null}
          <div className="flex gap-1">
            <dt>출처 표기</dt>
            <dd>{post.attribution}</dd>
          </div>
        </dl>

        <p className="rounded-[var(--radius-card)] border border-dashed p-3 text-xs text-muted-foreground">
          <strong className="font-semibold text-foreground">{post.status}</strong> — {STATUS_DEFINITIONS[post.status]}{' '}
          <Link href="/about" className="text-link underline underline-offset-2">
            상태 라벨 정의 전체 보기
          </Link>
        </p>
      </header>

      {isUrlPost ? (
        <section aria-labelledby="source-preview-heading" className="space-y-4">
          <h2 id="source-preview-heading" className="text-sm font-semibold">
            원문 미리보기
          </h2>
          <div className="overflow-hidden rounded-[var(--radius-card)] border">
            <CardMedia media={media} priority />
            <div className="space-y-2 p-4">
              {post.og?.siteName ? (
                <p className="text-xs text-muted-foreground">{post.og.siteName}</p>
              ) : null}
              {post.og?.title ? (
                <p className="text-sm">
                  <span className="text-muted-foreground">원문 제목(출처 인용): </span>
                  {post.og.title}
                </p>
              ) : null}
              {post.og?.description ? (
                <figure className="space-y-1">
                  <figcaption className="text-xs text-muted-foreground">원문 요약(출처 인용)</figcaption>
                  <blockquote className="border-l-2 pl-3 text-sm text-muted-foreground">
                    {post.og.description}
                  </blockquote>
                </figure>
              ) : null}
              <p className="text-xs text-muted-foreground">
                원문의 메타 정보(제목·요약·썸네일)만 인용하며 본문은 전재하지 않습니다. 위 제목·요약은 운영자가 고쳐
                쓰지 않은 원문 그대로입니다.
              </p>
            </div>
          </div>

          {post.sourceUrl ? (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener"
              className={cn(buttonVariants(), 'w-full sm:w-auto')}
            >
              원문 기사로 이동
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only"> (새 창에서 열림)</span>
            </a>
          ) : null}
        </section>
      ) : (
        <section aria-labelledby="photos-heading" className="space-y-3">
          <h2 id="photos-heading" className="text-sm font-semibold">
            사진
          </h2>
          <Gallery images={post.images} />
        </section>
      )}

      {body ? (
        <section aria-labelledby="body-heading" className="space-y-3">
          <h2 id="body-heading" className="sr-only">
            본문
          </h2>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: body }} />
        </section>
      ) : null}

      <SourceList sources={post.sources} />
      <StatusHistory history={post.statusHistory} />

      {post.tags.length > 0 ? (
        <section aria-labelledby="tags-heading" className="space-y-2">
          <h2 id="tags-heading" className="text-sm font-semibold">
            태그
          </h2>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                >
                  <Badge className="hover:border-foreground/40">#{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="border-t pt-6 text-xs text-muted-foreground">
        사실과 다른 내용이 있으면{' '}
        <Link href="/about" className="text-link underline underline-offset-2">
          정정·삭제 요청 절차
        </Link>
        를 통해 알려주세요.{' '}
        {post.sourceUrl ? (
          <>
            원문 확인: <ExternalLink href={post.sourceUrl}>{post.attribution}</ExternalLink>
          </>
        ) : null}
      </p>

      <JsonLd data={postJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: post.title, path: `/post/${post.id}` },
        ])}
      />
    </article>
  )
}
