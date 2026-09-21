import fs from 'node:fs'
import path from 'node:path'

const RETIRED_IDS_FILE = path.join(process.cwd(), 'content', 'retired-ids.txt')

/**
 * 삭제·비공개 처리된 게시물의 id 목록.
 *
 * 안정 ID 원칙 3번(재사용 금지)의 집행 수단이다. 게시물을 내릴 때 파일을 지우고
 * 이 목록에 id를 한 줄 추가하면, 같은 id를 쓴 새 게시물이 빌드에서 막힌다.
 *
 * 검증 스크립트와 빌드 시 로더가 **같은 함수를 쓴다** — 한쪽에만 있으면
 * `npx next build`를 직접 쳤을 때 폐기 ID가 그대로 통과한다.
 */
export function readRetiredIds(): Set<string> {
  if (!fs.existsSync(RETIRED_IDS_FILE)) return new Set()
  const lines = fs
    .readFileSync(RETIRED_IDS_FILE, 'utf8')
    .split('\n')
    .map((line) => line.replace(/#.*$/, '').trim())
    .filter((line) => line.length > 0)
  return new Set(lines)
}

export function retiredIdMessage(id: string): string {
  return `id \`${id}\`는 content/retired-ids.txt에 등록된 폐기 ID입니다. 재사용하면 과거 반응·댓글 데이터가 잘못 연결됩니다.`
}
