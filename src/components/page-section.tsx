/**
 * 소개·약관 페이지의 절(`h2` + 내용). `/about`·`/en/about`에 각각 있던 같은 정의를 약관 페이지와 함께 쓰려고 뽑았다
 * (프로그래머 11, 시안 02 §1 제안). 마크업·클래스는 종전과 같다.
 */
export function PageSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

/**
 * "연락 창구 준비 중" 상자(사용자 결정 4c). 점선 테두리·배경 없음 — 누를 것이 없는 상태 고지다(시안 02 §3.1·03 §2.2).
 * 실제 연락처가 정해지면(`SITE.contactEmail`) 이 상자 대신 연락처를 그린다.
 */
export function ContactPendingNotice({ children }: { children: React.ReactNode }) {
  return <p className="rounded-[var(--radius-card)] border border-dashed p-4 text-sm">{children}</p>
}
