# 02 — 약관 페이지 (`/terms` · `/en/terms`)

> 경로는 기획자 제안(`planning/news-format-v0.2-scope.md` §4.1) — **최종 확정은 프로그래머**. 이 문서는 경로가 무엇으로 정해지든 그대로 쓸 수 있는 구조만 다룬다.
> 문안은 `planning/terms-page-copy.md`(09-1 수정 — 리뷰 24 P2·P3 반영 완료본)를 **의역·축약 없이 그대로** 쓴다. 이 문서는 구조·위계·"확인 필요" 표현 방식만 정한다.
> ⚠️ **공개 시점 참고**: PRD §0.5는 "연락 경로가 정해지기 전에는 이용약관 페이지를 공개하지 않는다"고 못 박았다. 이 시안은 **구현 준비용**이다 — 프로그래머가 페이지 자체는 만들어 두고, 실제 라우팅(사이트맵·푸터 활성 링크)은 연락 경로 확정 후 켜는 것을 권장한다(아래 §6).

## 1. `/about`과 같은 톤 — 재사용하는 패턴

기존 `/about`(`src/app/(ko)/about/page.tsx`)이 이미 "담백한" 구조를 쓰고 있다. 약관 페이지도 **같은 `Section` 컴포넌트 패턴**을 그대로 쓴다(새 컴포넌트를 만들지 않는다).

```tsx
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}
```

`/about`과 약관 페이지 양쪽에서 쓰는 컴포넌트이므로, 프로그래머가 `src/components/page-section.tsx`로 뽑아 공유하는 것을 제안한다(현재는 `/about`·`/en/about` 각 파일에 중복 정의돼 있다 — 이번 참에 정리할지는 프로그래머 판단, 이 시안은 구조만 요구한다).

## 2. 페이지 구조 (ko 기준, en은 §4 참조)

```tsx
<PageFrame locale="ko" languageLinks={{ ko: '/terms', en: '/en/terms' }}>
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <header className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">이용약관·운영 정책</h1>
      <p className="text-muted-foreground">
        이 페이지는 이 사이트가 어떻게 운영되는지, 어떤 출처를 쓰는지, 문제가 있을 때 어떻게 연락하는지를 안내합니다.
      </p>
    </header>

    <Section id="purpose" title="운영 목적">…terms-page-copy.md §1 그대로…</Section>
    <Section id="no-reporting" title="직접 취재하지 않음">…§2…</Section>
    <Section id="sourcing" title="출처 원칙">…§3, 글머리 목록…</Section>
    <Section id="correction" title="정정·삭제 요청 방법과 처리 기준">…§4, 아래 §3 참조…</Section>
    <Section id="anonymous" title="익명 운영과 연락 경로">…§5…</Section>
    <Section id="nature" title="게시물 성격">…§6…</Section>

    <p className="border-t pt-6 text-sm">
      <Link href="/about" className="text-link underline underline-offset-2">소개로 돌아가기</Link>
    </p>
  </div>
</PageFrame>
```

- `h1`·`Section` `h2` 위계는 `/about`과 동일(`text-2xl`→`h1`, `text-lg`→`h2`). 새 글자 크기 토큰을 만들지 않는다.
- 각 `Section`의 `id`는 terms-page-copy.md 항목 순서(①~⑥)를 그대로 따른다.
- 맨 아래 "소개로 돌아가기" 링크로 `/about` ↔ `/terms` 상호 참조를 완성한다(수용 기준 2.2 "상호 링크").
- `<JsonLd>`는 `/about`과 같은 수준(canonical·title·description meta) — `aboutJsonLd()`와 같은 패턴의 `termsJsonLd()`를 프로그래머가 추가하거나, `WebPage` 타입으로 충분하면 그걸 쓴다(SEO 구체 스키마는 프로그래머 판단).

## 3. "확인 필요" 표현 방식 — 기존 대시 박스 패턴 재사용

`/about`에 이미 쓰이고 있는 **점선 테두리 박스**(`post-detail.tsx`의 `postNotice`, `/about`의 연락처 안내와 같은 스타일)를 "확인 필요"·"연락 창구 준비 중" 둘 다에 재사용한다. 새 색(경고색 등)을 넣지 않는다 — "법적 효과를 보장하는 표현을 쓰지 않는다"는 문안 원칙과 마찬가지로, 시각적으로도 "위험 경고"처럼 보이면 안 된다(담백한 사실 고지로 읽혀야 한다).

```tsx
<p className="rounded-[var(--radius-card)] border border-dashed p-3 text-xs text-muted-foreground">
  {/* 확인 필요 문장 또는 연락 창구 준비 중 문장 */}
</p>
```

### 3.1 §4 "정정·삭제 요청" 섹션 — 연락 창구 준비 중 상태

terms-page-copy.md §4는 이미 연락 경로를 "사용자 결정 필요"로 비워 뒀다. 화면에는 **이메일 주소를 아예 넣지 않고** 아래 박스만 넣는다(오더 요구 "contact@example.invalid를 화면에서 없앤다"를 그대로 반영):

```tsx
<p className="rounded-[var(--radius-card)] border border-dashed p-3 text-sm">
  연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다.
</p>
```

- 이 상태에서는 "처리 기준"(영업일 3일 이내 1차 답변·지체 없이 조치·임시 제한 30일)을 **보여준다**(terms-page-copy.md 원문 그대로). 다만 그 기준 문장 바로 앞에 아래 한 줄을 추가해, "채널이 없으면 기준도 지킬 수 없다"는 리뷰 24 §7의 사실 기록(라이브 연락 경로가 지금 작동하지 않음)과 화면이 어긋나지 않게 한다:

```tsx
<p className="text-xs text-muted-foreground">
  아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다.
</p>
```

이렇게 하면 "기준을 아예 숨긴다" 대신 "기준은 이미 정해져 있고, 채널 확정과 동시에 바로 작동한다"는 더 정확한 상태를 보여준다(기준 자체는 terms-page-copy.md에서 이미 확정 문안이다).

### 3.2 그 외 "확인 필요" 문장들(§4 법령 적용 여부, §5 개인정보보호법 고지 충족 여부, §6 법적 성격)

terms-page-copy.md 원문 문장 안에 이미 **"확인 필요"라는 단어가 포함된 문장**으로 쓰여 있다(예: "확인 필요 상태이며, 적용 여부와 무관하게…"). 이 경우는 별도 박스로 빼지 않고 **본문 문장 그대로** 둔다 — 모든 문장에 박스를 두르면 페이지 전체가 경고로 덮여 "담백함"을 해친다. 박스는 §3.1(연락 창구)처럼 **화면에서 없앨 값(이메일)을 대체하는 자리**에만 쓴다.

## 4. 영어 페이지(`/en/terms`) — 구조는 ko와 동일

terms-page-copy.md의 "English copy" 절을 그대로 영어 `Section` 6개에 매핑한다(제목: "What this site does"·"We do not do our own reporting"·"Sourcing principles"·"How to request a correction or removal, and how we handle it"·"Anonymous operation and contact"·"What kind of content this is" — 원문 그대로, 재번역하지 않는다).

- `h1`: "Terms and Operating Policy"
- §3.1의 "연락 창구 준비 중" 박스 영어판: "**Contact channel: pending a decision.** This page will be updated once it's finalized."(terms-page-copy.md en §4 문구와 통일)
- `/en/about` ↔ `/en/terms` 상호 링크, 하단 "Back to About" 링크.

## 5. 수용 기준 대조 (`news-format-v0.2-scope.md` §2.2)

| 수용 기준 | 이 시안의 반영 |
|---|---|
| ko/en 존재 + `/about`·`/en/about`에서 상호 링크 | §2·§4, 양쪽에 상호 링크 명시 |
| 6개 항목 모두 포함 | §2 `Section` 6개 = terms-page-copy.md 6개 항목 |
| 연락 경로 임의로 채우지 않음 | §3.1 — 이메일 자체를 아예 없앤다("준비 중" 박스만) |
| "지체 없이"·"영업일 3일" 구분 | terms-page-copy.md 원문 그대로(이미 구분돼 있음), 구조상 별도 불릿으로 유지 |
| 법적 효과 보장 문장 없음 | 문안은 기획자 확정본 그대로, 디자인이 추가·변경하지 않음 |
| meta title·description·canonical | §2 `<head>` 메타(프로그래머가 `/about` 패턴과 동일 수준으로 채움) |

## 6. 공개 시점 메모 (슈퍼바이저 참고)

이 시안대로 페이지를 **만들어 두는 것**과 **공개(링크 연결)하는 것**을 분리해서 진행할 것을 제안한다:
1. 프로그래머가 이 시안대로 `/terms`·`/en/terms` 페이지를 구현(빌드에는 포함되지만 아직 어디서도 링크하지 않음 — `sitemap.xml`도 제외).
2. 사용자가 연락 경로를 정하면, §3.1 박스를 실제 연락처로 교체하고 동시에 ① `/about`·`/en/about` 하단 링크 ② 푸터 링크(`04-footer-terms-link.md`) ③ `sitemap.xml` 포함을 **한 번에** 켠다.

이렇게 하면 "페이지는 있지만 비어 있는 연락처로 공개된" 중간 상태가 생기지 않는다.
