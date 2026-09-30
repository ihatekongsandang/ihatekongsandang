/**
 * 영어본 frontmatter 스키마 — `content/posts-en/{id}.md` (프로그래머 05).
 *
 * 영어본은 한국어 원본에 "덧붙는" 파일이다. **번역이 필요한 필드만** 갖고, 나머지
 * (publishedAt·sourceUrl·speaker.name·image.src·sources·tags·og)는 한국어 원본에서 가져온다.
 * `attribution`·`speakerAffiliation`은 선택 — 없으면 원본 값을 쓴다.
 * 그래서 이 파일은 원본(`Post`)을 받아야 검증할 수 있다 — 원본 없는 영어본은 오류다.
 *
 * 검증 스크립트(`scripts/validate-content.ts`)와 빌드 로더(`load.ts`)가 이 함수 하나를 함께 쓴다.
 * 필드 규칙을 바꾸면 `content/README.md`의 영어본 절도 함께 고친다.
 */
import { hasHangul, stripParentheses } from '../i18n'
import { toIsoDate, type Post, type PostImage } from './schema'

export interface PostTranslation {
  /** 한국어 원본과 같은 안정 ID. 파일명도 같다. */
  id: string
  title: string
  description: string
  /** 원본 `image`가 있을 때 그 이미지의 영어 대체 텍스트. */
  imageAlt?: string
  /** 원본 `image.caption`이 있을 때 영어 캡션. */
  imageCaption?: string
  /** 원본 `images[]`(사진 유형)가 있을 때 같은 순서·같은 개수의 영어 alt·caption. */
  images?: { alt: string; caption?: string }[]
  /** 원본 `speaker`가 있을 때 소속의 영어 표기(선택 — 없으면 원본 값 그대로). */
  speakerAffiliation?: string
  /**
   * 출처 표기의 영어 표기(선택 — 없으면 원본 값 그대로, 05-1).
   * 플랫폼명만 영어로 바꾸고 계정 핸들·괄호 안 원문 이름은 원본 그대로 둔다(예: `Instagram @im_nowandhere (나우앤히어)`).
   */
  attribution?: string
  translatedAt: string
  /** 영어 본문(마크다운). */
  body: string
  fileName: string
}

export interface TranslationValidationResult {
  errors: string[]
  notices: string[]
  translation?: PostTranslation
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/**
 * 괄호 안을 뺀 나머지에 한글이 있는가.
 * 고유명사 병기(`Chung Dong-young (정동영)`)는 허용해야 하므로 괄호(반각·전각) 안은 검사하지 않는다.
 * 중첩 괄호도 안쪽부터 반복해서 걷어낸다. 마크다운 링크 주소 `(/post/…)`도 괄호라 함께 빠진다.
 */
export function hangulOutsideParentheses(text: string): string[] {
  const stripped = stripParentheses(text)
  if (!hasHangul(stripped)) return []
  const found = stripped.match(/[^\s]*[ᄀ-ᇿ㄰-㆏가-힣][^\s]*/g) ?? []
  return [...new Set(found)].slice(0, 5)
}

const TRANSLATION_FIELDS = new Set([
  'id', 'title', 'description', 'imageAlt', 'imageCaption', 'images', 'speakerAffiliation', 'attribution', 'translatedAt',
])

/** 한국어 원본에서 가져오는 필드 — 영어본에 적어도 쓰이지 않는다. */
const INHERITED_FIELDS = new Set([
  'publishedAt', 'updatedAt', 'sourceType', 'sourceUrl', 'speaker', 'image', 'sources', 'tags',
  'og', 'useSourceImage', 'titleOverride', 'descriptionOverride', 'submittedBy',
])

/**
 * 영어본 한 건을 검증한다. `original`은 같은 id의 한국어 원본(검증 통과본)이다.
 * `errors`가 비어 있을 때만 `translation`이 채워진다.
 */
export function validateTranslation(
  data: unknown,
  body: string,
  fileName: string,
  original: Post | undefined,
): TranslationValidationResult {
  const errors: string[] = []
  const notices: string[] = []

  if (!isPlainObject(data)) {
    return { errors: ['frontmatter(YAML)가 없거나 객체가 아닙니다.'], notices }
  }

  // --- id — 파일명·한국어 원본과 같아야 한다 ---
  const id = asTrimmedString(data.id)
  const base = fileName.replace(/\.md$/, '')
  if (!id) {
    errors.push('id: 필수입니다. 한국어 원본과 같은 id를 적으세요.')
  } else if (id !== base) {
    errors.push(`id(${id})가 파일명(${base})과 다릅니다 — 영어본은 파일명·id 모두 한국어 원본과 같아야 합니다.`)
  }
  if (id && !original) {
    errors.push(`한국어 원본이 없습니다 — content/posts/${id}.md가 없거나 검증을 통과하지 못했습니다. 원본 없는 영어본은 둘 수 없습니다.`)
  }

  // --- 제목·요약 ---
  const title = asTrimmedString(data.title)
  if (!title) errors.push('title: 필수입니다(영어 제목).')
  const description = asTrimmedString(data.description)
  if (!description) {
    errors.push('description: 필수입니다(영어 요약 — meta description·AI 인용에 쓰입니다).')
  } else if (description.length > 160) {
    notices.push(`description이 ${description.length}자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.`)
  }

  // --- 번역 날짜 ---
  const translatedAt = toIsoDate(data.translatedAt)
  if (!translatedAt) {
    errors.push(`translatedAt: 필수이며 \`YYYY-MM-DD\` 형식이어야 합니다. (받은 값: ${String(data.translatedAt)})`)
  }

  // --- 원본 이미지·캡션·발언자에 따른 조건부 필드 ---
  const imageAlt = asTrimmedString(data.imageAlt)
  const imageCaption = asTrimmedString(data.imageCaption)
  const speakerAffiliation = asTrimmedString(data.speakerAffiliation)
  const attribution = asTrimmedString(data.attribution)
  let images: PostTranslation['images']

  if (original) {
    if (original.image) {
      if (!imageAlt) errors.push('imageAlt: 한국어 원본에 image가 있으므로 필수입니다(영어 대체 텍스트, WCAG 1.1.1).')
      if (original.image.caption && !imageCaption) {
        errors.push('imageCaption: 한국어 원본에 image.caption이 있으므로 필수입니다(영어 캡션).')
      }
      if (!original.image.caption && imageCaption) {
        notices.push('imageCaption: 한국어 원본에 캡션이 없어 쓰이지 않습니다.')
      }
    } else {
      if (imageAlt) notices.push('imageAlt: 한국어 원본에 image가 없어 쓰이지 않습니다.')
      if (imageCaption) notices.push('imageCaption: 한국어 원본에 image가 없어 쓰이지 않습니다.')
    }

    if (!original.speaker && speakerAffiliation) {
      notices.push('speakerAffiliation: 한국어 원본에 speaker가 없어 쓰이지 않습니다.')
    } else if (original.speaker && !original.speaker.affiliation && speakerAffiliation) {
      notices.push('speakerAffiliation: 한국어 원본에 소속(affiliation)이 없어 쓰이지 않습니다 — 원본에 없는 정보를 영어본에서 더하지 않습니다.')
    }

    if (attribution) {
      // 출처 표기는 저작권 표시 성격이라 원본의 계정 핸들이 빠지거나 바뀌면 안 된다 — 번역은 플랫폼명까지만.
      const missing = handlesIn(original.attribution).filter((handle) => !handlesIn(attribution).includes(handle))
      if (missing.length > 0) {
        notices.push(
          `attribution: 한국어 원본의 계정 핸들 ${missing.join(', ')}이(가) 영어 표기에 없습니다 — 핸들은 원본 그대로 두고 플랫폼명만 바꾸세요.`,
        )
      }
    }

    images = validateImages(data.images, original.images, errors, notices)

    if (original.updatedAt && translatedAt && translatedAt < original.updatedAt) {
      notices.push(
        `한국어 원본이 번역(${translatedAt}) 이후 갱신됐습니다(${original.updatedAt}) — 영어본도 고쳐야 하는지 확인하세요.`,
      )
    }
  }

  if (/<\s*(script|iframe|object|embed)\b/i.test(body)) {
    errors.push('본문에 스크립트·프레임 태그를 넣을 수 없습니다(XSS 방지 — 원본 HTML 삽입 금지).')
  }
  if (/!\[[^\]]*\]\([^)]*\)/.test(body)) {
    notices.push('본문의 마크다운 이미지(`![설명](주소)`)는 화면에 나오지 않습니다 — 사진은 한국어 원본의 frontmatter로만 넣습니다.')
  }

  // --- 한글 섞임 경고(괄호 안 병기는 허용) ---
  const hangulChecks: [string, string | undefined][] = [
    ['title', title],
    ['description', description],
    ['imageAlt', imageAlt],
    ['imageCaption', imageCaption],
    ['speakerAffiliation', speakerAffiliation],
    ['attribution', attribution],
    ['본문', body],
  ]
  for (const [label, value] of hangulChecks) {
    if (!value) continue
    const found = hangulOutsideParentheses(value)
    if (found.length > 0) {
      notices.push(`${label}에 한글이 섞여 있습니다(괄호 안 병기 제외): ${found.join(', ')}`)
    }
  }

  for (const key of Object.keys(data)) {
    if (TRANSLATION_FIELDS.has(key)) continue
    if (INHERITED_FIELDS.has(key)) {
      notices.push(`\`${key}\`는 한국어 원본 값을 씁니다 — 영어본에 적은 값은 무시됩니다.`)
    } else {
      notices.push(`알 수 없는 필드 \`${key}\`는 무시됩니다 — 오타가 아닌지 확인하세요.`)
    }
  }

  if (errors.length > 0) return { errors, notices }

  const useCaption = Boolean(original?.image?.caption)
  const useAffiliation = Boolean(original?.speaker?.affiliation)
  const translation: PostTranslation = {
    id: id as string,
    title: title as string,
    description: description as string,
    ...(original?.image && imageAlt ? { imageAlt } : {}),
    ...(useCaption && imageCaption ? { imageCaption } : {}),
    ...(images ? { images } : {}),
    ...(useAffiliation && speakerAffiliation ? { speakerAffiliation } : {}),
    ...(attribution ? { attribution } : {}),
    translatedAt: translatedAt as string,
    body,
    fileName,
  }
  return { errors, notices, translation }
}

/** 출처 표기 속 계정 핸들(`@im_nowandhere`). 대소문자까지 원본과 같아야 같은 핸들로 본다. */
function handlesIn(text: string): string[] {
  return text.match(/@[A-Za-z0-9._]+/g) ?? []
}

/**
 * 사진 유형 원본(`images[]`)의 영어 alt·caption. 원본에 사진이 있으면 같은 개수로 필수다 —
 * 없으면 영어 페이지 갤러리에 한국어 대체 텍스트가 그대로 나가기 때문이다.
 */
function validateImages(
  raw: unknown,
  originalImages: PostImage[],
  errors: string[],
  notices: string[],
): PostTranslation['images'] {
  if (originalImages.length === 0) {
    if (raw !== undefined && raw !== null) notices.push('images: 한국어 원본에 images가 없어 쓰이지 않습니다.')
    return undefined
  }
  if (!Array.isArray(raw)) {
    errors.push(
      `images: 한국어 원본에 사진 ${originalImages.length}장이 있으므로 같은 순서로 ${originalImages.length}개의 {alt, caption} 목록이 필요합니다.`,
    )
    return undefined
  }
  if (raw.length !== originalImages.length) {
    errors.push(`images: 한국어 원본 사진은 ${originalImages.length}장인데 영어본 항목은 ${raw.length}개입니다.`)
    return undefined
  }
  const result: { alt: string; caption?: string }[] = []
  raw.forEach((entry, index) => {
    const label = `images[${index}]`
    if (!isPlainObject(entry)) {
      errors.push(`${label}: 객체여야 합니다(alt·caption).`)
      return
    }
    const alt = asTrimmedString(entry.alt)
    const caption = asTrimmedString(entry.caption)
    if (!alt) errors.push(`${label}.alt: 필수입니다(영어 대체 텍스트).`)
    if (originalImages[index]?.caption && !caption) errors.push(`${label}.caption: 한국어 원본 사진에 캡션이 있으므로 필수입니다.`)
    if (alt) result.push({ alt, ...(caption && originalImages[index]?.caption ? { caption } : {}) })
  })
  return result.length === originalImages.length ? result : undefined
}

/**
 * 한국어 원본 + 영어본 → 영어 페이지가 그릴 게시물.
 * 번역 필드만 갈아 끼우고 나머지(날짜·배경 보도·원문 링크·이미지 경로·태그)는 원본 그대로 둔다.
 * `titleOverride`·`descriptionOverride`는 원본의 화면 값 결정용이라 영어본에서는 지운다.
 */
export function localizePost(original: Post, translation: PostTranslation): Post {
  const rest: Post = { ...original }
  delete rest.titleOverride
  delete rest.descriptionOverride
  return {
    ...rest,
    title: translation.title,
    description: translation.description,
    ...(original.image
      ? {
          image: {
            src: original.image.src,
            alt: translation.imageAlt ?? original.image.alt,
            ...(original.image.caption && translation.imageCaption ? { caption: translation.imageCaption } : {}),
          },
        }
      : {}),
    images: original.images.map((image, index) => {
      const localized = translation.images?.[index]
      return {
        src: image.src,
        alt: localized?.alt ?? image.alt,
        ...(image.caption && localized?.caption ? { caption: localized.caption } : {}),
      }
    }),
    ...(original.speaker
      ? {
          speaker: {
            name: original.speaker.name,
            ...(original.speaker.affiliation
              ? { affiliation: translation.speakerAffiliation ?? original.speaker.affiliation }
              : {}),
          },
        }
      : {}),
    attribution: translation.attribution ?? original.attribution,
    body: translation.body,
    fileName: translation.fileName,
  }
}
