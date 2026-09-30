import { hasHangul, langForTranslatable, type Locale } from '@/lib/i18n'

/**
 * 영어 표기 안에 괄호로 병기한 한국어(`Instagram @im_nowandhere (나우앤히어)`)만 `lang="ko"`로 감싼다 (05-1).
 * 괄호 밖에도 한글이 있으면(= 번역되지 않은 한국어 원본 값) 나누지 않는다 — 그때는 감싸는 요소가
 * `langForTranslatable`로 통째로 `lang="ko"`를 받는다. 한국어 페이지에서는 문자열 하나를 그대로 낸다(기존 출력과 같음).
 * `prefix`는 앞에 붙는 구분 문구(` · `)로, 나누지 않을 때 같은 텍스트 노드에 합쳐 낸다.
 */
export function MixedLangText({ text, locale, prefix = '' }: { text: string; locale: Locale; prefix?: string }) {
  if (locale !== 'en' || !hasHangul(text) || langForTranslatable(text, locale)) return <>{`${prefix}${text}`}</>
  const parts = `${prefix}${text}`.split(/(\([^()]*\)|（[^（）]*）)/).filter((part) => part !== '')
  return (
    <>
      {parts.map((part, index) =>
        hasHangul(part) ? (
          <span key={index} lang="ko">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
