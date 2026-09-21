/**
 * 게시물 frontmatter 스키마 — 단일 원천(single source of truth).
 *
 * 이 파일 하나가 세 곳에서 함께 쓰인다.
 *  1. `scripts/validate-content.ts` (빌드 전 게이트, `npm run prebuild`)
 *  2. `src/lib/content/load.ts` (빌드 시 게시물 로딩)
 *  3. 화면 컴포넌트의 타입
 * 규칙을 바꿀 때는 `content/README.md`의 필드 표도 함께 갱신한다.
 */

/**
 * 🔴 사건 상태 라벨 폐지 (2026-09-21 사용자 지시).
 *
 * `status`(의혹/수사중/기소/유죄판결/종결)·`courtLevel`·`statusHistory[]`는 스키마에서 사라졌다.
 * 사실 확인이 어느 단계인지는 **요약 문장과 출처 목록으로만** 전달한다.
 * 게시물 종류 구분(형사 사건/발언·논평)도 두지 않는다 — 단일 스키마다.
 *
 * 옛 게시 파일이 남아 있으면 조용히 무시되지 않도록 아래 필드는 **오류**로 막는다.
 */
const REMOVED_FIELDS: Record<string, string> = {
  status: '사건 상태 라벨은 폐지되었습니다. 이 줄을 지우고, 사실 확인 단계는 description 문장과 sources[]로 전달하세요.',
  courtLevel: '심급 필드는 폐지되었습니다(상태 라벨과 함께 제거). 필요하면 description에 인용문 형태로 적으세요.',
  statusHistory: '상태 갱신 이력 필드는 폐지되었습니다. 경과는 description 또는 본문에 적고 근거는 sources[]에 넣으세요.',
  kind: '게시물 종류 구분(형사 사건/발언·논평)은 두지 않습니다 — 단일 스키마입니다. 이 줄을 지우세요.',
  statementType: '발언/논평 구분 필드는 두지 않습니다. 이 줄을 지우세요.',
}

/** 게시물 유형 — 카드·상세 렌더링 분기 기준. */
export const SOURCE_TYPES = ['url', 'photo', 'photo_text'] as const
export type SourceType = (typeof SOURCE_TYPES)[number]

/** 근거 출처의 종류. 미등록 매체·1인 미디어·SNS 단독은 `기타`로도 허용하지 않는다(운영 규칙). */
export const SOURCE_KINDS = ['언론', '수사기관', '법원', '기타'] as const
export type SourceKind = (typeof SOURCE_KINDS)[number]

export interface PostSource {
  type: SourceKind
  name: string
  url: string
  date: string
}

export interface PostImage {
  src: string
  alt: string
  caption?: string
}

/** 발언·논평을 정리한 게시물에서 누구의 말인지 표기한다(선택). */
export interface PostSpeaker {
  name: string
  affiliation?: string
}

export interface PostOg {
  title?: string
  description?: string
  image?: string
  siteName?: string
}

export interface Post {
  /** 안정 ID. 변경·재사용 금지. `/post/[id]` 경로와 이후 반응·댓글의 외래키. */
  id: string
  /** 화면에 표시하는 제목 (`titleOverride`가 있으면 그 값). */
  title: string
  /** 운영자가 수동으로 대체한 제목이 있으면 그 원문 값. */
  titleOverride?: string
  /** 화면에 표시하는 요약 (`descriptionOverride`가 있으면 그 값). */
  description: string
  descriptionOverride?: string
  publishedAt: string
  publishedAtTime: number
  updatedAt?: string
  sourceType: SourceType
  /** 출처 표기 — URL 유형은 원문 출처명, 사진 유형은 촬영자·제공처. */
  attribution: string
  /**
   * 배경 보도 — 이 게시물의 서술을 뒷받침하는 공개 보도·발표·판결문.
   * `photo`·`photo_text`는 최소 1건 필수(원문 링크가 없어 유일한 근거다).
   * `url` 유형은 `sourceUrl` 자체가 원문이므로 0건도 허용한다.
   */
  sources: PostSource[]
  tags: string[]
  /** 발언·논평을 정리한 게시물의 발언자(선택). */
  speaker?: PostSpeaker
  /** v0.3 제보 대비 — 제보 경유 게시물 표기용(선택). */
  submittedBy?: string
  /** 대표 이미지(저장소 보유). 없으면 유형별 규칙으로 결정한다. */
  image?: PostImage
  images: PostImage[]
  /** URL 유형: 원문 URL. */
  sourceUrl?: string
  /** 원문 썸네일을 카드 미리보기로 쓸지 여부. 기본 false(얼굴 식별 리스크 회피). */
  useSourceImage: boolean
  og?: PostOg
  /** 마크다운 본문 원문. */
  body: string
  /** 진단용 — 이 게시물이 온 파일명. */
  fileName: string
}

export interface ValidationResult {
  errors: string[]
  notices: string[]
  post?: Post
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const TAG_PATTERN = /^[0-9a-z가-힣]+(?:-[0-9a-z가-힣]+)*$/

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/** YAML은 `2026-09-21`을 Date로 파싱한다. 문자열·Date 모두 받아 `YYYY-MM-DD`로 정규화한다. */
export function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined
    return value.toISOString().slice(0, 10)
  }
  const raw = asTrimmedString(value)
  if (!raw) return undefined
  if (!/^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/.test(raw)) return undefined
  const parsed = new Date(raw.length === 10 ? `${raw}T00:00:00Z` : raw)
  if (Number.isNaN(parsed.getTime())) return undefined
  return raw.slice(0, 10)
}

function isHttpUrl(value: unknown): value is string {
  const raw = asTrimmedString(value)
  if (!raw) return false
  try {
    const url = new URL(raw)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isHttpsUrl(value: unknown): value is string {
  const raw = asTrimmedString(value)
  if (!raw) return false
  try {
    return new URL(raw).protocol === 'https:'
  } catch {
    return false
  }
}

/** 저장소 내 이미지 경로만 허용한다(`public/images/**`). */
function isLocalImagePath(value: unknown): value is string {
  const raw = asTrimmedString(value)
  return Boolean(raw && raw.startsWith('/images/') && !raw.includes('..'))
}

interface ValidateOptions {
  /** `/images/...` 경로의 실제 파일 존재 여부. 스크립트는 파일시스템 검사를 넘긴다. */
  localImageExists?: (src: string) => boolean
}

function validateImageEntry(
  raw: unknown,
  label: string,
  errors: string[],
  options: ValidateOptions,
): PostImage | undefined {
  if (!isPlainObject(raw)) {
    errors.push(`${label}: 객체여야 합니다(src·alt 필드).`)
    return undefined
  }
  const src = raw.src
  const alt = asTrimmedString(raw.alt)
  let ok = true
  if (!isLocalImagePath(src)) {
    errors.push(`${label}.src: \`/images/\`로 시작하는 저장소 내 경로여야 합니다. (받은 값: ${String(src)})`)
    ok = false
  } else if (options.localImageExists && !options.localImageExists(src)) {
    errors.push(`${label}.src: 파일이 없습니다 — \`public${src}\`를 먼저 넣으세요.`)
    ok = false
  }
  if (!alt) {
    errors.push(`${label}.alt: 필수입니다(WCAG 2.2 AA 1.1.1). 이미지를 설명하는 문장을 쓰세요.`)
    ok = false
  }
  if (!ok) return undefined
  const caption = asTrimmedString(raw.caption)
  return {
    src: (src as string).trim(),
    alt: alt as string,
    ...(caption ? { caption } : {}),
  }
}

/**
 * frontmatter 한 건을 검증하고 정규화한다.
 * `errors`가 비어 있을 때만 `post`가 채워진다.
 */
export function validatePost(
  data: unknown,
  body: string,
  fileName: string,
  options: ValidateOptions = {},
): ValidationResult {
  const errors: string[] = []
  const notices: string[] = []

  if (!isPlainObject(data)) {
    return { errors: ['frontmatter(YAML)가 없거나 객체가 아닙니다.'], notices }
  }

  // --- id (안정 ID 원칙) ---
  const id = asTrimmedString(data.id)
  if (!id) {
    errors.push('id: 필수입니다. 파일명에서 자동 유추하지 않으므로 frontmatter에 반드시 적으세요.')
  } else if (!ID_PATTERN.test(id)) {
    errors.push(`id: 소문자 영숫자와 하이픈만 쓸 수 있습니다(예: example-case-a). 받은 값: ${id}`)
  }
  if (id) {
    const base = fileName.replace(/\.md$/, '')
    if (base !== id) {
      notices.push(`${fileName}: 파일명(${base})과 id(${id})가 다릅니다 — 오류는 아니지만 같게 두면 찾기 쉽습니다.`)
    }
  }

  // --- 제목·요약 ---
  const title = asTrimmedString(data.title)
  if (!title) errors.push('title: 필수입니다.')
  const description = asTrimmedString(data.description)
  if (!description) {
    errors.push('description: 필수입니다(메타 description·AI 인용에 쓰입니다).')
  } else if (description.length > 160) {
    notices.push(`description이 ${description.length}자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.`)
  }
  const titleOverride = asTrimmedString(data.titleOverride)
  const descriptionOverride = asTrimmedString(data.descriptionOverride)

  // --- 날짜 ---
  const publishedAt = toIsoDate(data.publishedAt)
  if (!publishedAt) {
    errors.push(`publishedAt: 필수이며 \`YYYY-MM-DD\` 형식이어야 합니다. (받은 값: ${String(data.publishedAt)})`)
  }
  const updatedAt = data.updatedAt === undefined || data.updatedAt === null ? undefined : toIsoDate(data.updatedAt)
  if (data.updatedAt !== undefined && data.updatedAt !== null && !updatedAt) {
    errors.push(`updatedAt: \`YYYY-MM-DD\` 형식이어야 합니다. (받은 값: ${String(data.updatedAt)})`)
  }

  // --- 폐지된 필드가 남아 있으면 막는다 ---
  for (const [field, guidance] of Object.entries(REMOVED_FIELDS)) {
    if (data[field] !== undefined) errors.push(`${field}: ${guidance}`)
  }

  // --- 유형 ---
  const sourceTypeRaw = asTrimmedString(data.sourceType)
  const sourceType = SOURCE_TYPES.find((type) => type === sourceTypeRaw)
  if (!sourceType) {
    errors.push(`sourceType: ${SOURCE_TYPES.join(' / ')} 중 하나여야 합니다. (받은 값: ${String(data.sourceType)})`)
  }

  // --- 출처 표기 ---
  const attribution = asTrimmedString(data.attribution)
  if (!attribution) {
    errors.push('attribution: 필수입니다(URL 유형은 원문 출처명, 사진 유형은 촬영자·제공처).')
  }

  // --- 배경 보도 sources[] ---
  // 사진 게시물은 원문 링크가 없어 출처가 유일한 근거이므로 최소 1건을 강제한다.
  // URL 게시물은 `sourceUrl` 자체가 원문이므로 0건도 허용한다(배경 보도가 늘 있는 것은 아니다).
  const sources: PostSource[] = []
  const sourcesRequired = sourceTypeRaw === 'photo' || sourceTypeRaw === 'photo_text'
  if (data.sources !== undefined && data.sources !== null && !Array.isArray(data.sources)) {
    errors.push('sources: 배열이어야 합니다.')
  } else if (!Array.isArray(data.sources) || data.sources.length === 0) {
    if (sourcesRequired) {
      errors.push(
        `sources: sourceType이 \`${String(sourceTypeRaw)}\`이면 최소 1건 필요합니다 — 원문 링크가 없으므로 출처가 유일한 근거입니다.`,
      )
    }
  } else {
    data.sources.forEach((entry, index) => {
      const label = `sources[${index}]`
      if (!isPlainObject(entry)) {
        errors.push(`${label}: 객체여야 합니다(type·name·url·date).`)
        return
      }
      const kindRaw = asTrimmedString(entry.type)
      const kind = SOURCE_KINDS.find((value) => value === kindRaw)
      const name = asTrimmedString(entry.name)
      const date = toIsoDate(entry.date)
      let ok = true
      if (!kind) {
        errors.push(`${label}.type: ${SOURCE_KINDS.join(' / ')} 중 하나여야 합니다. (받은 값: ${String(entry.type)})`)
        ok = false
      }
      if (!name) {
        errors.push(`${label}.name: 필수입니다(출처 명칭).`)
        ok = false
      }
      if (!isHttpUrl(entry.url)) {
        errors.push(`${label}.url: http(s) URL이어야 합니다. (받은 값: ${String(entry.url)})`)
        ok = false
      }
      if (!date) {
        errors.push(`${label}.date: \`YYYY-MM-DD\` 형식이어야 합니다. (받은 값: ${String(entry.date)})`)
        ok = false
      }
      if (ok && kind && name && date) {
        sources.push({ type: kind, name, url: (entry.url as string).trim(), date })
      }
    })
  }

  // --- 태그 ---
  const tags: string[] = []
  if (data.tags !== undefined && data.tags !== null) {
    if (!Array.isArray(data.tags)) {
      errors.push('tags: 문자열 배열이어야 합니다.')
    } else {
      data.tags.forEach((tag, index) => {
        const value = asTrimmedString(tag)
        if (!value) {
          errors.push(`tags[${index}]: 빈 값은 쓸 수 없습니다.`)
          return
        }
        if (!TAG_PATTERN.test(value)) {
          errors.push(`tags[${index}]: 한글·소문자 영숫자·하이픈만 쓸 수 있습니다. (받은 값: ${value})`)
          return
        }
        if (tags.includes(value)) {
          notices.push(`tags에 \`${value}\`가 중복되어 한 번만 반영했습니다.`)
          return
        }
        tags.push(value)
      })
    }
  }

  // --- 발언자 ---
  let speaker: PostSpeaker | undefined
  if (data.speaker !== undefined && data.speaker !== null) {
    if (!isPlainObject(data.speaker)) {
      errors.push('speaker: 객체여야 합니다(name·affiliation).')
    } else {
      const name = asTrimmedString(data.speaker.name)
      if (!name) {
        errors.push('speaker.name: 발언자를 적을 때는 이름(또는 계정명)이 필요합니다.')
      } else {
        const affiliation = asTrimmedString(data.speaker.affiliation)
        speaker = { name, ...(affiliation ? { affiliation } : {}) }
      }
      for (const key of Object.keys(data.speaker)) {
        if (key !== 'name' && key !== 'affiliation') {
          notices.push(`speaker.${key}는 쓰이지 않습니다 — name·affiliation만 화면에 나옵니다.`)
        }
      }
    }
  }

  // --- 이미지 ---
  const image = data.image === undefined || data.image === null
    ? undefined
    : validateImageEntry(data.image, 'image', errors, options)
  const images: PostImage[] = []
  if (data.images !== undefined && data.images !== null) {
    if (!Array.isArray(data.images)) {
      errors.push('images: 배열이어야 합니다.')
    } else {
      data.images.forEach((entry, index) => {
        const parsed = validateImageEntry(entry, `images[${index}]`, errors, options)
        if (parsed) images.push(parsed)
      })
    }
  }

  // --- 유형별 추가 규칙 ---
  const useSourceImageRaw = data.useSourceImage
  if (useSourceImageRaw !== undefined && useSourceImageRaw !== null && typeof useSourceImageRaw !== 'boolean') {
    errors.push(`useSourceImage: true 또는 false여야 합니다. (받은 값: ${String(useSourceImageRaw)})`)
  }
  const useSourceImage = useSourceImageRaw === true

  let og: PostOg | undefined
  if (data.og !== undefined && data.og !== null) {
    if (!isPlainObject(data.og)) {
      errors.push('og: 객체여야 합니다(title·description·image·siteName).')
    } else {
      // 빈 문자열은 "추출하지 못했다"는 뜻이므로 없는 것으로 본다(초안 생성기가 빈 값을 남긴다).
      // 값이 실제로 들어 있을 때만 https인지 따진다.
      const ogImageRaw = asTrimmedString(data.og.image)
      if (ogImageRaw && !isHttpsUrl(ogImageRaw)) {
        errors.push(`og.image: https URL이어야 합니다(핫링크). (받은 값: ${ogImageRaw})`)
      }
      og = {
        ...(asTrimmedString(data.og.title) ? { title: asTrimmedString(data.og.title) } : {}),
        ...(asTrimmedString(data.og.description) ? { description: asTrimmedString(data.og.description) } : {}),
        ...(isHttpsUrl(data.og.image) ? { image: (data.og.image as string).trim() } : {}),
        ...(asTrimmedString(data.og.siteName) ? { siteName: asTrimmedString(data.og.siteName) } : {}),
      }
    }
  }

  const sourceUrlRaw = data.sourceUrl
  if (sourceType === 'url') {
    if (!isHttpUrl(sourceUrlRaw)) {
      errors.push(`sourceUrl: sourceType이 \`url\`이면 필수이며 http(s) URL이어야 합니다. (받은 값: ${String(sourceUrlRaw)})`)
    }
    if (useSourceImage && !og?.image) {
      errors.push('useSourceImage: true로 두려면 og.image(원문 썸네일 URL)가 있어야 합니다.')
    }
  } else {
    if (sourceUrlRaw !== undefined && sourceUrlRaw !== null) {
      notices.push('sourceUrl은 URL 유형에서만 쓰입니다 — 사진 유형에서는 무시됩니다.')
    }
    if (images.length === 0) {
      errors.push(`images: sourceType이 \`${String(sourceTypeRaw)}\`이면 최소 1장 필요합니다(각 이미지에 alt 필수).`)
    }
  }
  if (sourceType === 'photo_text' && body.trim().length === 0) {
    errors.push('본문: sourceType이 `photo_text`이면 frontmatter 아래에 마크다운 본문이 있어야 합니다.')
  }
  if (/<\s*(script|iframe|object|embed)\b/i.test(body)) {
    errors.push('본문에 스크립트·프레임 태그를 넣을 수 없습니다(XSS 방지 — 원본 HTML 삽입 금지).')
  }
  // 본문 마크다운 이미지는 렌더 단계에서 제거된다. 조용히 사라지면 원인을 알 수 없으므로 알려 준다.
  if (/!\[[^\]]*\]\([^)]*\)/.test(body)) {
    notices.push(
      '본문의 마크다운 이미지(`![설명](주소)`)는 화면에 나오지 않습니다 — 사진은 frontmatter `images[]`로 넣으세요(alt 검증·대체 이미지 전환이 거기에만 걸립니다).',
    )
  }

  const submittedBy = asTrimmedString(data.submittedBy)

  const known = new Set([
    'id', 'title', 'titleOverride', 'description', 'descriptionOverride', 'publishedAt', 'updatedAt',
    'sourceType', 'attribution', 'sources', 'tags', 'speaker',
    'submittedBy', 'image', 'images', 'sourceUrl', 'useSourceImage', 'og',
  ])
  for (const key of Object.keys(data)) {
    // 폐지된 필드는 위에서 이미 오류로 잡았으므로 여기서 다시 알리지 않는다.
    if (!known.has(key) && !(key in REMOVED_FIELDS)) {
      notices.push(`알 수 없는 필드 \`${key}\`는 무시됩니다 — 오타가 아닌지 확인하세요.`)
    }
  }

  if (errors.length > 0) return { errors, notices }

  const post: Post = {
    id: id as string,
    title: titleOverride ?? (title as string),
    ...(titleOverride ? { titleOverride } : {}),
    description: descriptionOverride ?? (description as string),
    ...(descriptionOverride ? { descriptionOverride } : {}),
    publishedAt: publishedAt as string,
    publishedAtTime: new Date(`${publishedAt}T00:00:00Z`).getTime(),
    ...(updatedAt ? { updatedAt } : {}),
    sourceType: sourceType as SourceType,
    attribution: attribution as string,
    sources,
    tags,
    ...(speaker ? { speaker } : {}),
    ...(submittedBy ? { submittedBy } : {}),
    ...(image ? { image } : {}),
    images,
    ...(sourceType === 'url' ? { sourceUrl: (sourceUrlRaw as string).trim() } : {}),
    useSourceImage,
    ...(og && Object.keys(og).length > 0 ? { og } : {}),
    body,
    fileName,
  }

  return { errors, notices, post }
}

/** 카드·상세에서 쓸 대표 이미지 결정 규칙. */
export type CardMedia =
  | { kind: 'local'; src: string; alt: string }
  | { kind: 'remote'; src: string; alt: string }
  | { kind: 'placeholder' }

export function resolveCardMedia(post: Post): CardMedia {
  if (post.image) return { kind: 'local', src: post.image.src, alt: post.image.alt }
  const first = post.images[0]
  if (first) return { kind: 'local', src: first.src, alt: first.alt }
  if (post.sourceType === 'url' && post.useSourceImage && post.og?.image) {
    return { kind: 'remote', src: post.og.image, alt: `${post.title} — 원문 미리보기 이미지` }
  }
  return { kind: 'placeholder' }
}
