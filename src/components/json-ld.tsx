/**
 * 구조화 데이터 삽입.
 * 값은 전부 빌드 시점의 자체 콘텐츠이고 JSON.stringify를 거치지만,
 * `</script>` 시퀀스만은 문자열 안에 들어와도 스크립트를 닫지 못하게 이스케이프한다.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
