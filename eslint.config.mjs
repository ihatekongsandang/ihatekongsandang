import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
})

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  /*
   * 측정·생성 도구(`docs/tools/**`)는 Node에서 도는 스크립트라 React 훅 규칙이 맞지 않는다 — 프로그래머 14 추가 임무 0.
   * 예: 디자이너 도구가 SVG `<use>` 문자열을 만드는 함수를 `use()`라 불러 `react-hooks/rules-of-hooks` 오류 7건이 났다
   * (훅이 아니다). 그 규칙 하나만 이 범위에서 끈다. 나머지 규칙은 도구에도 그대로 걸리고, `src/`는 이 범위에 넣지 않는다.
   */
  {
    files: ['docs/tools/**'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
]

export default config
