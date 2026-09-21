import { absoluteUrl } from '@/lib/config'

/**
 * canonical 링크를 직접 넣는다.
 *
 * 왜 `metadata.alternates.canonical`을 쓰지 않는가: Next의 메타데이터 해석기는 pathname이 `/`인
 * URL을 오리진으로 정규화하면서 쿼리스트링을 떨어뜨린다. 그래서 홈 피드 2페이지의 공개 URL인
 * `/?page=2`가 canonical에서는 `/`로 나가 1페이지와 같은 주소를 가리키게 된다(중복 정본 선언).
 * 페이지네이션 경로는 쿼리가 곧 정본이므로 이 컴포넌트로 직접 내보낸다.
 * React가 `<link>`를 문서 head로 올려 준다.
 */
export function CanonicalLink({ path }: { path: string }) {
  return <link rel="canonical" href={absoluteUrl(path)} />
}
