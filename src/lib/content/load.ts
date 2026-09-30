import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { readRetiredIds, retiredIdMessage } from './retired-ids'
import { validatePost, type Post } from './schema'
import { localizePost, validateTranslation, type PostTranslation } from './translation'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
/** 영어본 폴더(프로그래머 05). 파일명·id는 한국어 원본과 같다. */
const POSTS_EN_DIR = path.join(process.cwd(), 'content', 'posts-en')
const PUBLIC_DIR = path.join(process.cwd(), 'public')

function localImageExists(src: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, src.replace(/^\//, '')))
}

export function listPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith('.md'))
    .sort()
}

export function readPostFile(fileName: string): { data: unknown; body: string } {
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8')
  const parsed = matter(raw)
  return { data: parsed.data, body: parsed.content }
}

let cache: Post[] | undefined

/**
 * 게시물 전건을 최신순으로 반환한다.
 * 잘못된 게시물이 하나라도 있으면 빌드를 세운다 — 게이트는 `npm run validate:content`이고
 * 여기서 한 번 더 막아 검증을 건너뛴 빌드가 통과하지 못하게 한다.
 */
export function getAllPosts(): Post[] {
  if (cache) return cache

  const posts: Post[] = []
  const seen = new Map<string, string>()
  const failures: string[] = []
  const retired = readRetiredIds()

  for (const fileName of listPostFiles()) {
    const { data, body } = readPostFile(fileName)
    const result = validatePost(data, body, fileName, { localImageExists })
    if (!result.post) {
      failures.push(`${fileName}\n  - ${result.errors.join('\n  - ')}`)
      continue
    }
    const duplicate = seen.get(result.post.id)
    if (duplicate) {
      failures.push(`${fileName}\n  - id \`${result.post.id}\`가 ${duplicate}와 중복됩니다.`)
      continue
    }
    if (retired.has(result.post.id)) {
      failures.push(`${fileName}\n  - ${retiredIdMessage(result.post.id)}`)
      continue
    }
    seen.set(result.post.id, fileName)
    posts.push(result.post)
  }

  if (failures.length > 0) {
    throw new Error(
      `콘텐츠 검증 실패 ${failures.length}건 — \`npm run validate:content\`로 자세히 확인하세요.\n${failures.join('\n')}`,
    )
  }

  posts.sort((a, b) => b.publishedAtTime - a.publishedAtTime || a.id.localeCompare(b.id))
  cache = posts
  return posts
}

export function getPostById(id: string): Post | undefined {
  return getAllPosts().find((post) => post.id === id)
}

export interface TagSummary {
  tag: string
  count: number
}

/** 게시물 수 많은 순 → 같으면 이름순. */
export function getAllTags(): TagSummary[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ko'))
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export interface Paginated<T> {
  items: T[]
  page: number
  totalPages: number
  totalItems: number
}

export function paginate<T>(items: T[], page: number, pageSize: number): Paginated<T> {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    totalItems,
  }
}

let translationCache: Map<string, PostTranslation> | undefined

/**
 * 영어본 전건(id → 영어본). 폴더가 없거나 비어 있으면 빈 맵이다(부분 번역 허용).
 * 한국어 로더와 같이 잘못된 영어본이 하나라도 있으면 빌드를 세운다 — 검증을 건너뛴 빌드도 통과하지 못하게.
 */
export function getAllTranslations(): Map<string, PostTranslation> {
  if (translationCache) return translationCache

  const byId = new Map(getAllPosts().map((post) => [post.id, post]))
  const translations = new Map<string, PostTranslation>()
  const failures: string[] = []
  const fileNames = fs.existsSync(POSTS_EN_DIR)
    ? fs.readdirSync(POSTS_EN_DIR).filter((name) => name.endsWith('.md')).sort()
    : []

  for (const fileName of fileNames) {
    const parsed = matter(fs.readFileSync(path.join(POSTS_EN_DIR, fileName), 'utf8'))
    const rawId = typeof parsed.data?.id === 'string' ? parsed.data.id.trim() : undefined
    const result = validateTranslation(parsed.data, parsed.content, fileName, rawId ? byId.get(rawId) : undefined)
    if (!result.translation) {
      failures.push(`posts-en/${fileName}\n  - ${result.errors.join('\n  - ')}`)
      continue
    }
    translations.set(result.translation.id, result.translation)
  }

  if (failures.length > 0) {
    throw new Error(
      `영어본 검증 실패 ${failures.length}건 — \`npm run validate:content\`로 자세히 확인하세요.\n${failures.join('\n')}`,
    )
  }

  translationCache = translations
  return translations
}

export function hasTranslation(id: string): boolean {
  return getAllTranslations().has(id)
}

export interface EnglishFeedEntry {
  post: Post
  /** 영어본이 있으면 `post`는 영어 필드로 갈아 끼운 값, 없으면 한국어 원본 그대로다. */
  translated: boolean
}

/**
 * 영어 피드(`/en`) — 한국어 피드와 같은 게시물 전체·같은 순서(최신순) (프로그래머 06).
 * 영어본이 있는 글은 영어 필드로, 없는 글은 한국어 원본 그대로 넘긴다(카드에 "Korean only" 표시·한국어 상세로 링크).
 */
export function getEnglishFeedPosts(): EnglishFeedEntry[] {
  const translations = getAllTranslations()
  return getAllPosts().map((post) => {
    const translation = translations.get(post.id)
    return translation ? { post: localizePost(post, translation), translated: true } : { post, translated: false }
  })
}

export function getEnglishPostById(id: string): Post | undefined {
  const translation = getAllTranslations().get(id)
  const original = getPostById(id)
  if (!translation || !original) return undefined
  return localizePost(original, translation)
}
