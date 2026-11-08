# 04 — 푸터: 약관 링크 자리

> 대상: `src/components/site-footer.tsx`
> 위치는 `planning/news-format-v0.2-scope.md`가 이미 특정했다(09-1 수정 — 리뷰 24 P3-11): `aboutPath(locale)` 링크가 있는 자리(26행 부근)에 나란히 넣는다. 이 문서는 그 결정을 그대로 받아 마크업 수준으로 구체화한다.

## 1. 현재 코드

```tsx
<p>
  <Link href={aboutPath(locale)} className="text-link underline underline-offset-2">
    {dict.footerPolicyLink}
  </Link>
</p>
```

## 2. 교체안 — 같은 줄에 "·"로 이어 붙인다

```tsx
<p>
  <Link href={aboutPath(locale)} className="text-link underline underline-offset-2">
    {dict.footerPolicyLink}
  </Link>
  <span aria-hidden="true"> · </span>
  <Link href={termsPath(locale)} className="text-link underline underline-offset-2">
    {dict.footerTermsLink}
  </Link>
</p>
```

- **같은 줄을 쓴 이유**: 푸터는 이미 2줄(`site.tagline` → `dict.footerPolicy` 설명문 → 이 링크 줄)로 구성돼 있다. 약관 링크를 위해 줄을 하나 더 늘리면 모바일에서 푸터 높이가 불필요하게 커진다. "·" 구분자로 한 줄에 이어 붙이는 것이 기존 리듬을 유지한다.
- **구분자 "·"가 인라인 텍스트 링크 사이에 있어 터치 영역 걱정이 없다** — WCAG 2.2 AA 2.5.8(터치 영역 24px)은 문장 안에 섞인 인라인 링크(inline text link)를 예외로 둔다. 두 링크를 각각 별도 블록 버튼으로 키울 필요가 없다(공유 버튼처럼 독립된 탭 대상이 아니라 각주형 링크이기 때문).
- `termsPath(locale)`: `aboutPath(locale)`와 같은 패턴으로 `src/lib/i18n.ts`에 추가할 헬퍼. 제안:

```ts
export function termsPath(locale: Locale): string {
  return `${localePrefix(locale)}/terms`
}
```

경로 문자열(`/terms`)은 `02-terms-page.md`와 동일 — 최종 확정은 프로그래머(기획자 제안값).

## 3. 번역 사전 추가

| 키 | ko | en |
|---|---|---|
| `footerTermsLink` | 이용약관 | Terms |

`footerPolicyLink`(기존, "출처·저작권 정책과 정정·삭제 요청 절차" / "About this site and how to request a correction or removal")는 그대로 둔다 — 약관 페이지가 따로 생겨도 `/about`은 여전히 출처 정책·표기 원칙을 설명하는 페이지이므로 두 링크의 역할이 다르다(하나는 "운영 방식 설명", 하나는 "약관 전문").

## 4. 공개 시점

`02-terms-page.md` §6과 같은 원칙 — 연락 경로가 확정되기 전에는 이 링크를 **넣지 않는다**(또는 코드는 넣되 feature flag로 숨긴다, 프로그래머 판단). 연락 경로 확정과 동시에 약관 페이지 공개·푸터 링크·사이트맵 포함을 한 번에 켠다.
