import Link from 'next/link'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { CardMedia } from '@/components/card-media'
import { ExternalLink } from '@/components/external-link'
import { Gallery } from '@/components/gallery'
import { JsonLd } from '@/components/json-ld'
import { MixedLangText } from '@/components/mixed-lang-text'
import { ShareButtons } from '@/components/share-buttons'
import { SourceList } from '@/components/source-list'
import { Badge } from '@/components/ui/badge'
import { CHIP_LINK, chipFace } from '@/components/tag-nav'
import { resolveCardMedia, type ImageCredit, type Post } from '@/lib/content/schema'
import { aboutPath, formatDate, homePath, langFor, langForTranslatable, postPath, t, type Locale } from '@/lib/i18n'
import { breadcrumbJsonLd, postJsonLd } from '@/lib/seo'
import { cn } from '@/lib/utils'

/** `kogl-1` → 1. */
function koglTypeNumber(license: ImageCredit['license']): number | undefined {
  const match = license?.match(/^kogl-(\d)$/)
  return match ? Number(match[1]) : undefined
}

/**
 * 대표 이미지 크레딧(프로그래머 13, 정책 P4) — public·news 이미지에만 붙는다. 카드에는 쓰지 않는다.
 * ko `사진: {creditName}` / en `Photo: {creditNameEn}` + 원 페이지 링크(ExternalLink: `rel="noopener"`, 새 창 sr-only 안내, 높이 44px).
 * 링크 문구는 보강안 목업 그대로(공공누리 "원문 페이지"/"Source page", 언론 "기사 원문"/"Source article").
 * public은 공공누리 유형과 공식 출처 표시 문구의 요지를 함께 적는다.
 */
function ImageCreditCaption({ credit, locale }: { credit: ImageCredit; locale: Locale }) {
  const dict = t(locale)
  const name = locale === 'en' ? credit.creditNameEn : credit.creditName
  const type = credit.kind === 'public' ? koglTypeNumber(credit.license) : undefined
  return (
    <figcaption data-credit="" className="mt-1.5 text-[13px] leading-[1.55] text-muted-foreground">
      <p>
        {dict.photoCreditLabel}
        <span lang={langFor(name, locale)}>{name}</span>
        {type ? dict.koglType(type) : null}
        {' · '}
        <ExternalLink href={credit.sourcePageUrl} locale={locale} className="min-h-11 items-center">
          {dict.photoSourceLink[credit.kind]}
        </ExternalLink>
      </p>
      {type ? <p>{dict.koglNotice(name, type)}</p> : null}
    </figcaption>
  )
}

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
 *
 * v0.3 반응형 개편(프로그래머 14, 구현 범위 9 · 보강안 A1) 순서:
 *   이동 경로 → (발언자·제보 배지) → 제목 → 요약 → 메타 → **원문 기사로 이동** → 상대 언어 보기 → 안내 상자
 *   → 사진 1회(+ public·news 크레딧 figcaption) 또는 사진 게시물 갤러리 → 본문 → 원문 미리보기(이미지 없이 메타 인용만)
 *   → [배경 보도 · 공유 · 태그] → 정정 안내.
 *   1024 이상은 [배경 보도 · 공유 · 태그]를 오른쪽 보조 열(16rem, 1280 이상 18rem)에 둔다. DOM 순서는 위와 같다.
 *   보조 열은 sticky로 붙이지 않는다(프로그래머 14-1, 리뷰 31 P1-1): 열이 화면보다 길면 sticky 열 아래쪽의 공유·태그에
 *   Tab 포커스가 가도 화면 밖에 남는다(WCAG 2.4.7·2.4.11). 207건 × ko/en × 1024·1280 전수 실측에서 열 높이가 최대 1,672px
 *   (중앙값 814px)라, "화면 높이가 충분할 때만 sticky"의 기준 높이는 1,776px 이상이 되어 실제 화면에서는 거의 켜지지 않고,
 *   낮추면 긴 열의 게시물이 다시 위반한다. 그래서 sticky를 뺐다(`docs/tools/programmer-14-1/aside-height-all.json`).
 * - "링크" 유형 배지는 뺐다(사용자 결정 D7). 대표 이미지는 위 사진 자리에 한 번만 나온다(예전에는 원문 미리보기 상자 안).
 * - 원문 미리보기 상자는 이미지 없이 원문 메타(사이트명·제목·요약)만 인용한다 — 문구는 그대로.
 * - 영어 상세: 상단 "Translated from the Korean original." 문장은 그대로 두고, 한국어 원문 링크는 한국어 상세의
 *   "Read in English"와 같은 자리(원문 이동 버튼 아래)로 옮겼다. 출처 기사 제목·원문 인용·발언자 이름은 한국어 그대로 `lang="ko"`,
 *   태그 칩은 표시하지 않는다(한국어 태그 페이지로 보내지 않기 위해).
 * - 공유 버튼(프로그래머 11): 기능·문구·GA 이벤트는 그대로이고 자리만 보조 열로 옮겼다. 공유 URL은 지금 페이지 언어의 상세 주소다.
 */
export function PostDetail({ post, body, locale, otherLanguageHref, translatedAt }: PostDetailProps) {
  const dict = t(locale)
  const media = resolveCardMedia(post, locale)
  const isUrlPost = post.sourceType === 'url'
  /** 원문에서 인용해 보여 줄 메타가 하나라도 있는가(사이트명·원문 제목·원문 요약). 이미지는 위 사진 자리에서 따로 보여 준다. */
  const hasPreview = Boolean(post.og?.siteName) || Boolean(post.og?.title) || Boolean(post.og?.description)
  const isEnglish = locale === 'en'
  const hasBadges = Boolean(post.speaker) || Boolean(post.submittedBy)

  return (
    <div
      className={cn(
        'mx-auto w-full md:max-w-[var(--measure)] lg:grid lg:max-w-none lg:items-start lg:justify-center lg:gap-x-12 xl:gap-x-16',
        isEnglish
          ? 'md:max-w-[var(--measure-en)] lg:grid-cols-[minmax(0,var(--measure-en))_minmax(0,16rem)] xl:grid-cols-[minmax(0,var(--measure-en))_minmax(0,18rem)]'
          : 'lg:grid-cols-[minmax(0,var(--measure))_minmax(0,16rem)] xl:grid-cols-[minmax(0,var(--measure))_minmax(0,18rem)]',
      )}
    >
      <article className="min-w-0 lg:col-start-1">
        <nav aria-label={dict.breadcrumbNav} className="flex items-center pt-1 text-sm text-muted-foreground">
          <Link
            href={homePath(locale)}
            className="inline-flex min-h-11 min-w-11 items-center text-link underline underline-offset-[3px]"
          >
            {dict.home}
          </Link>
          <span aria-hidden="true" className="mx-1.5">
            ›
          </span>
          <span>{dict.breadcrumbPost}</span>
        </nav>

        <header>
          {isEnglish ? <p className="text-sm text-muted-foreground">Translated from the Korean original.</p> : null}

          {hasBadges ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
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
          ) : null}

          <h1 className="mt-1 mb-3 text-[23px] leading-[1.36] font-bold tracking-[-0.02em] text-balance md:text-[28px]">
            {post.title}
          </h1>

          <p className="mb-3.5 text-base leading-[1.7] text-muted-foreground">{post.description}</p>

          <dl className="mb-4 grid gap-0.5 text-sm leading-[1.55] text-muted-foreground">
            <div className="flex flex-wrap gap-x-2">
              <dt className="min-w-[4.6em]">{dict.published}</dt>
              <dd className="text-foreground">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              </dd>
            </div>
            {post.updatedAt ? (
              <div className="flex flex-wrap gap-x-2">
                <dt className="min-w-[4.6em]">{dict.updated}</dt>
                <dd className="text-foreground">
                  <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time>
                </dd>
              </div>
            ) : null}
            {translatedAt ? (
              <div className="flex flex-wrap gap-x-2">
                <dt className="min-w-[4.6em]">Translated</dt>
                <dd className="text-foreground">
                  <time dateTime={translatedAt}>{formatDate(translatedAt, locale)}</time>
                </dd>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-x-2">
              <dt className="min-w-[4.6em]">{dict.attribution}</dt>
              <dd className="text-foreground" lang={langForTranslatable(post.attribution, locale)}>
                <MixedLangText text={post.attribution} locale={locale} />
              </dd>
            </div>
          </dl>

          {isUrlPost && post.sourceUrl ? (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener"
              data-cta=""
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-card)] bg-link px-6 text-base font-bold text-white md:w-auto md:min-w-[280px] md:inline-flex lg:flex lg:w-full lg:min-w-0"
            >
              {dict.goToSource}
              <ExternalLinkIcon aria-hidden="true" className="size-[18px]" />
              <span className="sr-only">{dict.opensInNewTab}</span>
            </a>
          ) : null}

          {otherLanguageHref ? (
            <p>
              <Link
                href={otherLanguageHref}
                lang={isEnglish ? 'ko' : 'en'}
                hrefLang={isEnglish ? 'ko' : 'en'}
                className="inline-flex min-h-11 items-center text-sm text-link underline underline-offset-[3px]"
              >
                {dict.otherLanguageVersion}
              </Link>
            </p>
          ) : null}

          <p className="mt-2 rounded-[var(--radius-card)] border border-dashed border-line-strong px-3.5 pt-3 pb-1 text-sm leading-[1.6] text-muted-foreground">
            {dict.postNotice}{' '}
            <Link
              href={aboutPath(locale)}
              className="flex min-h-11 items-center text-link underline underline-offset-[3px]"
            >
              {dict.postNoticeLink}
            </Link>
          </p>
        </header>

        {isUrlPost ? (
          media.kind === 'placeholder' ? null : (
            <figure className="mt-5">
              <CardMedia media={media} priority locale={locale} variant="figure" />
              {media.credit ? <ImageCreditCaption credit={media.credit} locale={locale} /> : null}
            </figure>
          )
        ) : (
          <section aria-labelledby="photos-heading" className="mt-5 space-y-3">
            <h2 id="photos-heading" className="text-base font-bold">
              {dict.photos}
            </h2>
            <Gallery images={post.images} locale={locale} />
          </section>
        )}

        {body ? (
          <section aria-labelledby="body-heading" className="mt-6">
            <h2 id="body-heading" className="sr-only">
              {dict.body}
            </h2>
            <div className="post-body" dangerouslySetInnerHTML={{ __html: body }} />
          </section>
        ) : null}

        {isUrlPost && hasPreview ? (
          <section
            aria-labelledby="source-preview-heading"
            className="mt-6 space-y-1 rounded-[var(--radius-card)] border border-line-strong p-3.5 text-sm leading-[1.6] text-muted-foreground"
          >
            <h2 id="source-preview-heading" className="mb-1.5 text-[15px] font-bold text-foreground">
              {dict.sourcePreview}
            </h2>
            {post.og?.siteName ? <p lang={langFor(post.og.siteName, locale)}>{post.og.siteName}</p> : null}
            {post.og?.title ? (
              <p>
                <span>{dict.sourceTitleLabel}</span>
                {isEnglish ? <span lang={langFor(post.og.title, locale)}>{post.og.title}</span> : post.og.title}
              </p>
            ) : null}
            {post.og?.description ? (
              <figure className="space-y-1">
                <figcaption>{dict.sourceDescriptionLabel}</figcaption>
                <blockquote className="border-l-2 pl-3" lang={langFor(post.og.description, locale)}>
                  {post.og.description}
                </blockquote>
              </figure>
            ) : null}
            <p>{dict.sourcePreviewNote}</p>
          </section>
        ) : null}
      </article>

      <aside
        aria-label={dict.relatedAside}
        className="mt-7 space-y-7 lg:col-start-2 lg:row-start-1 lg:mt-12"
      >
        {post.sources.length > 0 ? <SourceList sources={post.sources} locale={locale} /> : null}

        <ShareButtons id={post.id} title={post.title} locale={locale} />

        {!isEnglish && post.tags.length > 0 ? (
          <section aria-labelledby="tags-heading">
            <h2 id="tags-heading" className="mb-2 text-base font-bold">
              {dict.tags}
            </h2>
            <ul className="flex flex-wrap gap-x-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/tag/${encodeURIComponent(tag)}`} className={CHIP_LINK}>
                    <span className={chipFace()}>#{tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      <div className="lg:col-start-1">
        <p className="mt-8 border-t pt-4 text-sm leading-[1.7] text-muted-foreground">
          {dict.correctionBefore}
          <Link href={aboutPath(locale)} className="text-link underline underline-offset-[3px]">
            {dict.correctionLink}
          </Link>
          {dict.correctionAfter}
          {post.sourceUrl ? (
            <>
              {dict.sourceCheck}
              {/* 문장 속 링크 — 줄 안에 그대로 흐르게 inline으로 둔다(터치 44px 예외 대상, 보강안 측정 기준과 같다). */}
              <ExternalLink
                href={post.sourceUrl}
                locale={locale}
                lang={langForTranslatable(post.attribution, locale)}
                className="inline"
              >
                <MixedLangText text={post.attribution} locale={locale} />
              </ExternalLink>
            </>
          ) : null}
        </p>
      </div>

      <JsonLd data={postJsonLd(post, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.home, path: homePath(locale) },
          { name: post.title, path: postPath(locale, post.id) },
        ])}
      />
    </div>
  )
}
