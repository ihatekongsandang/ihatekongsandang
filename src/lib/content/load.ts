import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { validatePost, type Post } from './schema'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
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
