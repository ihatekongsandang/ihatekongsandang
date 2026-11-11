/**
 * 같은 원본 사진 반복 경고(정책 §4.5-6 · 프로그래머 20 명세 6). `validate-content`가 쓴다 — 경고만이고 빌드를 막지 않는다.
 *
 * - "같은 원본" = `sourcePageUrl`이 같거나 저장 파일 해시가 같은 것(둘 중 하나라도 같으면 한 묶음).
 * - 한도: A-2 자료사진(open 전부 · caption이 `자료사진:`인 public)이 낀 묶음은 **6건**, 그 밖(public 인물·행사 사진)은 3건(guide §4-1 유지).
 *   한도를 넘은 게시물(게시일 오래된 순으로 한도 다음부터)에 경고.
 * - 인접: 메인 피드 정렬(`getAllPosts`와 같은 규칙 — `publishedAtTime` 내림차순, 같은 날은 `id` 오름차순)에서
 *   같은 묶음의 두 게시물 인덱스 차이가 **5 미만**이면 경고(피드 위쪽 = 더 새 게시물에 싣는다).
 *   한계: 메인 피드 순서만 본다 — 태그·검색 페이지에서 연달아 보이는 것은 잡지 못한다.
 */
export const MAX_SAME_SOURCE_ARCHIVE = 6
export const MAX_SAME_SOURCE_OTHER = 3
export const MIN_FEED_GAP = 5

export interface ReuseEntry {
  fileName: string
  id: string
  publishedAtTime: number
  sourcePageUrl: string
  /** 저장 파일 해시(읽지 못하면 없음). */
  fileHash?: string
  /** A-2 자료사진인가. */
  archive: boolean
}

/** `getAllPosts`(load.ts)와 같은 정렬. */
export function feedOrder<T extends { id: string; publishedAtTime: number }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.publishedAtTime - a.publishedAtTime || a.id.localeCompare(b.id))
}

/**
 * @param entries 대표 이미지가 public·open인 게시물
 * @param feed 메인 피드에 나오는 게시물 전체(이미지 없는 글 포함 — 인접 거리는 피드 전체 기준)
 * @returns 파일 이름 → 경고 문장들
 */
export function imageReuseNotices(entries: ReuseEntry[], feed: { id: string; publishedAtTime: number }[]): Map<string, string[]> {
  const result = new Map<string, string[]>()
  const push = (fileName: string, message: string) => {
    const list = result.get(fileName) ?? []
    list.push(message)
    result.set(fileName, list)
  }

  // --- 묶기(union-find: 같은 sourcePageUrl 또는 같은 해시) ---
  const parent = entries.map((_, index) => index)
  const find = (index: number): number => {
    let current = index
    for (let next = parent[current] ?? current; next !== current; next = parent[current] ?? current) current = next
    return current
  }
  const union = (a: number, b: number) => {
    const ra = find(a)
    const rb = find(b)
    if (ra !== rb) parent[rb] = ra
  }
  const firstByKey = new Map<string, number>()
  entries.forEach((entry, index) => {
    for (const key of [`url:${entry.sourcePageUrl}`, ...(entry.fileHash ? [`hash:${entry.fileHash}`] : [])]) {
      const first = firstByKey.get(key)
      if (first === undefined) firstByKey.set(key, index)
      else union(first, index)
    }
  })
  const groups = new Map<number, ReuseEntry[]>()
  entries.forEach((entry, index) => {
    const root = find(index)
    groups.set(root, [...(groups.get(root) ?? []), entry])
  })

  const feedIndex = new Map(feedOrder(feed).map((post, index) => [post.id, index]))

  for (const members of groups.values()) {
    if (members.length < 2) continue
    const archive = members.some((member) => member.archive)
    const limit = archive ? MAX_SAME_SOURCE_ARCHIVE : MAX_SAME_SOURCE_OTHER
    const sources = [...new Set(members.map((member) => member.sourcePageUrl))].join(', ')

    // 한도: 게시일 오래된 순(같은 날은 id 순) — 먼저 쓴 글이 자리를 갖는다.
    const chronological = [...members].sort((a, b) => a.publishedAtTime - b.publishedAtTime || a.id.localeCompare(b.id))
    if (chronological.length > limit) {
      const earlier = chronological.slice(0, limit).map((member) => member.fileName)
      for (const member of chronological.slice(limit)) {
        push(
          member.fileName,
          `image: 같은 원본 사진을 ${chronological.length}건이 씁니다(${archive ? 'A-2 자료사진 ' : ''}${limit}건까지) — ${limit + 1}번째부터는 다른 사진이나 대체 카드를 씁니다(정책 §4.5-6). (원본: ${sources} · 먼저 쓴 글: ${earlier.join(', ')})`,
        )
      }
    }

    // 인접: 메인 피드 인덱스 차이 MIN_FEED_GAP 미만.
    const placed = members
      .filter((member) => feedIndex.has(member.id))
      .map((member) => ({ member, index: feedIndex.get(member.id) as number }))
      .sort((a, b) => a.index - b.index)
    for (const [i, upper] of placed.entries()) {
      for (const lower of placed.slice(i + 1)) {
        const gap = lower.index - upper.index
        if (gap >= MIN_FEED_GAP) break
        push(
          upper.member.fileName,
          `image: 같은 원본 사진을 쓴 ${lower.member.fileName}와 메인 피드에서 ${gap}칸 떨어져 있습니다 — ${MIN_FEED_GAP}칸 이상 떨어뜨립니다(정책 §4.5-6 ②, 메인 피드 순서만 확인 — 태그·검색 페이지 인접은 잡지 못합니다).`,
        )
      }
    }
  }
  return result
}
