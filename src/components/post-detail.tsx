import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CardMedia } from '@/components/card-media'
import { ExternalLink } from '@/components/external-link'
import { Gallery } from '@/components/gallery'
import { JsonLd } from '@/components/json-ld'
import { MixedLangText } from '@/components/mixed-lang-text'
import { SourceList } from '@/components/source-list'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { resolveCardMedia, type Post } from '@/lib/content/schema'
import { aboutPath, formatDate, homePath, langFor, langForTranslatable, postPath, t, type Locale } from '@/lib/i18n'
import { breadcrumbJsonLd, postJsonLd } from '@/lib/seo'
import { cn } from '@/lib/utils'

interface PostDetailProps {
  post: Post
  /** 렌더된 본문 HTML(없으면 빈 문자열). */
  body: string
  locale: Locale
  /** 상대 언어본 상세 경로. 한국어 상세는 영어본이 있을 때만, 영어 상세는 항상(한국어 원문). */
  otherLanguageHref?: string
  /** 영어 상세: 번역 날짜. */
  translatedAt?: string
}

/**
 * 게시물 상세 본문 — 한국어(`/post/[id]`)·영어(`/en/post/[id]`) 상세가 함께 쓴다(프로그래머 05).
 * 한국어 출력은 기존 상세 페이지와 같다. 영어에서만 달라지는 것:
 *  - 상단 안내 "Translated from the Korean original." + 한국어 원문 링크, 번역 날짜
 *  - 출처 기사 제목·원문 인용(OG 제목·요약)·발언자 이름은 한국어 그대로 두고 `lang="ko"`
 *  - 출처 표기·발언자 소속은 영어본에 영어 표기가 있으면 그것을 쓰고(05-1), 괄호 안 한국어 병기만 `lang="ko"`
 *  - 태그 칩은 표시하지 않는다(한국어 태그 페이지로 보내지 않기 위해)
 */
export function PostDetail({ post, body, locale, otherLanguageHref, translatedAt }: PostDetailProps) {
  const dict = t(locale)
  const media = resolveCardMedia(post, locale)
  const isUrlPost = post.sourceType === 'url'
  /** 원문에서 인용해 보여 줄 것이 하나라도 있는가(썸네일·원문 제목·원문 요약). */
  const hasPreview =
    media.kind !== 'placeholder' || Boolean(post.og?.title) || Boolean(post.og?.description)
  const isEnglish = locale === 'en'

  return (
    <article className="mx-auto w-full max-w-3xl space-y-8">
      <nav aria-label={dict.breadcrumbNav} className="text-xs text-muted-foreground">
        <Link href={homePath(locale)} className="hover:text-foreground">
          {dict.home}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{dict.breadcrumbPost}</span>
      </nav>

      <header className="space-y-4">
        {isEnglish ? (
          <p className="text-sm text-muted-foreground">
            Translated from the Korean original.{' '}
            {otherLanguageHref ? (
              <Link
                href={otherLanguageHref}
                lang="ko"
                hrefLang="ko"
                className="text-link underline underline-offset-2"
              >
                {dict.otherLanguageVersion}
              </Link>
            ) : null}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <Badge>{dict.sourceTypes[post.sourceType]}</Badge>
          {post.speaker ? (
            <Badge>
              <span className="sr-only">{dict.speakerSr}</span>
              {isEnglish ? (
                <>
                  <span lang={langFor(post.speaker.name, locale)}>{post.speaker.name}</span>
                  {post.speaker.affiliation ? (
                    <span lang={langForTranslatable(post.speaker.affiliation, locale)}>
                      <MixedLangText text={post.speaker.affiliation} locale={locale} prefix=" · " />
                    </span>
                  ) : null}
                </>
              ) : (
                <>
                  {post.speaker.name}
                  {post.speaker.affiliation ? ` · ${post.speaker.affiliation}` : ''}
                </>
              )}
            </Badge>
          ) : null}
          {post.submittedBy ? <Badge>{dict.submittedBy(post.submittedBy)}</Badge> : null}
        </div>

        <h1 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">{post.title}</h1>

        {!isEnglish && otherLanguageHref ? (
          <p className="text-sm">
            <Link
              href={otherLanguageHref}
              lang="en"
              hrefLang="en"
              className="text-link underline underline-offset-2"
            >
              {dict.otherLanguageVersion}
            </Link>
          </p>
        ) : null}

        <p className="text-base text-muted-foreground">{post.description}</p>

        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <div className="flex gap-1">
            <dt>{dict.published}</dt>
            <dd>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
            </dd>
          </div>
          {post.updatedAt ? (
            <div className="flex gap-1">
              <dt>{dict.updated}</dt>
              <dd>
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time>
              </dd>
            </div>
          ) : null}
          {translatedAt ? (
            <div className="flex gap-1">
              <dt>Translated</dt>
              <dd>
                <time dateTime={translatedAt}>{formatDate(translatedAt, locale)}</time>
              </dd>
            </div>
          ) : null}
          <div className="flex gap-1">
            <dt>{dict.attribution}</dt>
            <dd lang={langForTranslatable(post.attribution, locale)}>
              <MixedLangText text={post.attribution} locale={locale} />
            </dd>
          </div>
        </dl>

        <p className="rounded-[var(--radius-card)] border border-dashed p-3 text-xs text-muted-foreground">
          {dict.postNotice}{' '}
          <Link href={aboutPath(locale)} className="text-link underline underline-offset-2">
            {dict.postNoticeLink}
          </Link>
        </p>
      </header>

      {isUrlPost ? (
        <section aria-labelledby="source-preview-heading" className="space-y-4">
          <h2 id="source-preview-heading" className={hasPreview ? 'text-sm font-semibold' : 'sr-only'}>
            {dict.sourcePreview}
          </h2>
          {/*
            인용할 것이 하나도 없으면 미리보기 상자를 아예 그리지 않는다.
            SNS 글은 OG 메타를 비공개로 두는 경우가 많아, 상자를 늘 그리면 상세 화면의
            큰 면적이 빈 플레이스홀더로 채워진다(실측으로 확인). 원문으로 가는 버튼만 남긴다.
          */}
          {hasPreview ? (
          <div className="overflow-hidden rounded-[var(--radius-card)] border">
            {media.kind === 'placeholder' ? null : <CardMedia media={media} priority locale={locale} />}
            <div className="space-y-2 p-4">
              {post.og?.siteName ? (
                <p className="text-xs text-muted-foreground" lang={langFor(post.og.siteName, locale)}>
                  {post.og.siteName}
                </p>
              ) : null}
              {post.og?.title ? (
                <p className="text-sm">
                  <span className="text-muted-foreground">{dict.sourceTitleLabel}</span>
                  {isEnglish ? <span lang={langFor(post.og.title, locale)}>{post.og.title}</span> : post.og.title}
                </p>
              ) : null}
              {post.og?.description ? (
                <figure className="space-y-1">
                  <figcaption className="text-xs text-muted-foreground">{dict.sourceDescriptionLabel}</figcaption>
                  <blockquote
                    className="border-l-2 pl-3 text-sm text-muted-foreground"
                    lang={langFor(post.og.description, locale)}
                  >
                    {post.og.description}
                  </blockquote>
                </figure>
              ) : null}
              <p className="text-xs text-muted-foreground">{dict.sourcePreviewNote}</p>
            </div>
          </div>
          ) : null}

          {post.sourceUrl ? (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener"
              className={cn(buttonVariants(), 'w-full sm:w-auto')}
            >
              {dict.goToSource}
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only">{dict.opensInNewTab}</span>
            </a>
          ) : null}
        </section>
      ) : (
        <section aria-labelledby="photos-heading" className="space-y-3">
          <h2 id="photos-heading" className="text-sm font-semibold">
            {dict.photos}
          </h2>
          <Gallery images={post.images} locale={locale} />
        </section>
      )}

      {body ? (
        <section aria-labelledby="body-heading" className="space-y-3">
          <h2 id="body-heading" className="sr-only">
            {dict.body}
          </h2>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: body }} />
        </section>
      ) : null}

      {post.sources.length > 0 ? <SourceList sources={post.sources} locale={locale} /> : null}

      {!isEnglish && post.tags.length > 0 ? (
        <section aria-labelledby="tags-heading" className="space-y-2">
          <h2 id="tags-heading" className="text-sm font-semibold">
            {dict.tags}
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
        {dict.correctionBefore}
        <Link href={aboutPath(locale)} className="text-link underline underline-offset-2">
          {dict.correctionLink}
        </Link>
        {dict.correctionAfter}
        {post.sourceUrl ? (
          <>
            {dict.sourceCheck}
            <ExternalLink href={post.sourceUrl} locale={locale} lang={langForTranslatable(post.attribution, locale)}>
              <MixedLangText text={post.attribution} locale={locale} />
            </ExternalLink>
          </>
        ) : null}
      </p>

      <JsonLd data={postJsonLd(post, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.home, path: homePath(locale) },
          { name: post.title, path: postPath(locale, post.id) },
        ])}
      />
    </article>
  )
}
