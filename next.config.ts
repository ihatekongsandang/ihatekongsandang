import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

// 상위 디렉터리에 다른 lockfile이 있어도 이 폴더를 워크스페이스 루트로 고정한다.
// 경로를 문자열로 박지 않고 이 파일 위치에서 계산한다.
// `import.meta.dirname`을 쓰지 않는 이유: 그 프로퍼티는 Node 20.11.0에서 추가되어
// package.json이 선언한 하한(20.9.0)에서는 undefined가 되고, path.join(undefined, …)이
// TypeError로 빌드 시작 자체를 세운다. fileURLToPath는 버전 제약이 없다.
const projectRoot = fileURLToPath(new URL('.', import.meta.url))

interface HeaderRule {
  source: string
  headers: { key: string; value: string }[]
}

/**
 * 보안 헤더의 선언은 `vercel.json` 한 곳에만 둔다(플랫폼이 정적 자산까지 포함해 적용하는 곳).
 *
 * 다만 `next start`로 도는 로컬 프로덕션 빌드에는 그 플랫폼이 없어서 헤더가 붙지 않고,
 * 그러면 헤더를 실제로 확인할 방법이 사라진다. 그래서 Vercel이 아닌 환경에서만 같은 선언을
 * Next가 읽어 적용한다 — 선언은 한 벌이고(드리프트 없음), 로컬에서 응답 헤더를 실측할 수 있다.
 * Vercel에서는 플랫폼이 적용하므로 중복해서 붙이지 않는다.
 */
function localHeaderRules(): HeaderRule[] {
  const raw = readFileSync(path.join(projectRoot, 'vercel.json'), 'utf8')
  const parsed = JSON.parse(raw) as { headers?: HeaderRule[] }
  return parsed.headers ?? []
}

const runningOnVercel = process.env.VERCEL === '1'

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,

  // 이미지 최적화는 저장소 내 자체 이미지(`public/images/**`)에만 적용한다.
  // 외부(핫링크) OG 썸네일은 `remotePatterns`로 열지 않는다 — 임의 호스트를 허용하면
  // 이미지 최적화 엔드포인트가 제3자에게 열린 프록시가 되기 때문이다.
  // 핫링크 썸네일은 최적화를 거치지 않는 <img>로 렌더하고 실패 시 플레이스홀더로 전환한다.
  images: {
    remotePatterns: [],
  },
  poweredByHeader: false,
  reactStrictMode: true,

  ...(runningOnVercel ? {} : { headers: async () => localHeaderRules() }),
}

export default nextConfig
