# 05 — 카드 "갱신" 표시 (사용자 결정 5a, 7일)

> 🔴 **사용자 확정 (2026-11-08, "5a")**: 갱신 후 **7일 동안** 카드에 "MM/DD 갱신" 표시. (`planning/news-format-v0.2-scope.md` 배경 §1 작업 4, PRD §0.5 미결 표가 이 결정으로 해소됨)
> 대상: `src/components/post-card.tsx`(카드), `src/components/post-detail.tsx`(상세 — 중복 여부만 점검, 아래 §4)
> "카드 = 제목 + 이미지" 사양(PRD §0.5)에 **요소 하나를 추가**하는 일이라, 기존 디자인 원칙("배지·라벨 없음")의 명시적 예외임을 분명히 한다.

## 1. 데이터 필드 — 가능함 확인

`content/README.md` §3.1: `updatedAt`은 `YYYY-MM-DD` 형식의 날짜 전용 필드다(시각 없음, "내용을 고친 날"). **7일 판정에 쓸 데이터는 이미 존재한다** — 새 필드를 추가할 필요가 없다.

판정 로직(프로그래머 구현): `(오늘 날짜) - (updatedAt)` ≤ 7일이면 배지를 켠다. 날짜 전용 비교이므로 시간대 이슈는 기존 `formatDate`(문자열 분해 방식, `Intl`·`Date` 미사용)와 같은 방식으로 다룰 수 있다 — 단, 날짜 "차이 계산"은 문자열 분해로는 안 되므로 이 부분만 `Date` 비교(UTC 기준 자정)를 쓰는 것을 제안한다(날짜 전용 비교라 시간대로 하루 밀리는 리스크가 `formatDate`의 표시 로직보다는 작지만, 빌드 서버의 타임존 설정에 영향받지 않게 `Date.UTC(...)`로 비교할 것을 권장).

## 2. 위치·크기·색·대비

### 2.1 위치 — `CardFooter`의 날짜·유형 라벨 옆

현재 `post-card.tsx` `CardFooter`:

```tsx
<CardFooter>
  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
  <span aria-hidden="true">·</span>
  <span>{dict.sourceTypes[post.sourceType]}</span>
  {koreanOnly ? <span id={koreanOnlyId} className="ml-auto …">{dict.koreanOnly}</span> : null}
</CardFooter>
```

갱신 표시를 `sourceType` 라벨 다음에 "·"로 이어 붙인다(`koreanOnly` 배지보다 **앞**에 둔다 — `koreanOnly`는 `ml-auto`로 오른쪽 끝에 붙는 별도 역할이라 자리가 겹치지 않는다):

```tsx
<CardFooter>
  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
  <span aria-hidden="true">·</span>
  <span>{dict.sourceTypes[post.sourceType]}</span>
  {showRenewed ? (
    <>
      <span aria-hidden="true">·</span>
      <Badge aria-label={dict.renewedSr(formatDate(post.updatedAt, locale))}>
        <time dateTime={post.updatedAt}>{formatShortUpdated(post.updatedAt, locale)}</time>
      </Badge>
    </>
  ) : null}
  {koreanOnly ? <span id={koreanOnlyId} className="ml-auto …">{dict.koreanOnly}</span> : null}
</CardFooter>
```

**이 위치를 고른 이유**: "카드=제목+이미지" 원칙을 지키려면 새 요소를 이미지 위에 올리는 오버레이(배지가 썸네일을 가림, 포커스 순서도 복잡해짐)보다 **이미 메타데이터 줄로 쓰이고 있는 `CardFooter`**에 넣는 쪽이 기존 설계 의도(제목·이미지는 순수하게 유지, 부가 정보는 footer 한 줄에 모음 — `koreanOnly` 표시가 이미 이 패턴)에 맞는다. 새로운 시각적 층을 만들지 않는다.

### 2.2 크기·색 — 기존 `Badge` 컴포넌트 재사용, 새 variant 없음

```tsx
// src/components/ui/badge.tsx — 수정 없음, 그대로 쓴다
<Badge>{/* "11/04 갱신" */}</Badge>
```

- `Badge`는 이미 `rounded-full border border-border bg-surface-strong px-2 py-0.5 text-xs font-medium text-foreground`다. **새 색(강조색 등)을 넣지 않는다** — "사건 상태 배지 폐지" 정신(상태를 색으로 과장하지 않는다, PRD §6②)을 "갱신" 표시에도 적용한다. 갱신은 "최신성 정보"일 뿐 사실 확인 단계가 아니므로 눈에 띄는 강조색을 쓸 이유가 없다.
- 대비: `--foreground`(#18181b) on `--surface-strong`(#f4f4f5) — 두 색이 이미 사이트 전역에서 `Badge`(출처 유형·태그)에 쓰이고 있어 기존에 통과된 조합이다. 계산상 `--foreground`/`--background` 조합이 17.7:1(`01-share-buttons.md` §5)이고 `--surface-strong`은 `--background`보다 아주 약간 어두울 뿐이라(상대휘도 차이 미미) 17:1대를 유지한다 — AA(4.5:1) 통과.

### 2.3 ko/en 표기

| locale | 표시 문자열 | 함수 제안 |
|---|---|---|
| ko | `11/04 갱신` (월/일 2자리, 0패딩) | `formatShortUpdated('2026-11-04', 'ko')` → `11/04 갱신` |
| en | `Updated Nov 4` (기존 `EN_MONTHS` 짧은 월 이름 재사용, 0패딩 없음) | `formatShortUpdated('2026-11-04', 'en')` → `Updated Nov 4` |

```ts
// src/lib/i18n.ts — EN_MONTHS 기존 배열 재사용
export function formatShortUpdated(iso: string, locale: Locale): string {
  const [, month, day] = iso.split('-')
  if (!month || !day) return iso
  if (locale === 'ko') return `${month}/${day} 갱신`
  const name = EN_MONTHS[Number(month) - 1]
  return name ? `Updated ${name} ${Number(day)}` : iso
}
```

(기존 `formatDate`와 같은 "문자열 분해, `Intl`/`Date` 미사용" 방식을 그대로 따른다 — 표시 로직의 시간대 안전성 패턴을 일관되게 유지. §1의 "7일 판정"은 날짜 차이 **계산**이 필요해 이 방식만으로는 안 되므로 그 부분만 `Date` 비교를 쓴다는 점과 구분한다.)

### 2.4 스크린리더 — 축약 표기를 전체 날짜로 보완

`Badge`에 `aria-label`로 전체 날짜를 준다(시각적으로는 "11/04"처럼 줄이지만, 스크린리더에는 축약하지 않은 날짜를 들려준다 — WCAG 2.2 AA 1.3.1·일반적 접근성 관례):

```ts
renewedSr: (fullDate: string) => `최근 갱신: ${fullDate}`      // ko
renewedSr: (fullDate: string) => `Recently updated: ${fullDate}` // en
```

`fullDate`는 기존 `formatDate(post.updatedAt, locale)` 결과("2026년 11월 4일" / "Nov 4, 2026")를 그대로 넣는다 — 새 날짜 포맷을 또 만들지 않는다.

## 3. 7일 판정의 빌드 시점 한계 — 🔴 프로그래머 확인 필요

이 사이트는 **파일 기반 SSG**다(커밋·푸시 → Vercel 자동 배포, 예약 재배포 없음). "오늘"은 실제 방문 시각이 아니라 **마지막 빌드가 실행된 시각**이다.

- 게시가 뜸하면(예: 2주간 새 글 없음) 갱신 후 7일이 실제로 지나도, 그 사이 재배포가 없으면 배지가 계속 떠 있다.
- 반대로 "7일째 되는 날" 정확히 배지를 끄려면 그날 재배포가 일어나야 한다 — 그렇지 않으면 꺼지는 시점이 실제 날짜보다 늦어진다.

이 한계는 디자인으로 해결할 수 없다(빌드 파이프라인 문제). 프로그래머가 아래 중 하나를 확인·선택해야 한다:
1. **현재 그대로 둔다**(가장 단순) — "약 7일" 정도의 오차를 허용. 이 사이트는 자동 수집기가 없고(D5, 미구현 유지) 콘텐츠가 뜸하면 애초에 "갱신"이 자주 생기지 않으므로 오차의 실제 영향이 크지 않을 수 있다.
2. Vercel Cron(또는 유사 예약 재배포)으로 매일 1회 재빌드해 배지 정확도를 높인다 — 새 계정·비용 문제는 없는지(기능 계정 범위 내) 프로그래머가 확인.
3. 배지 판정을 클라이언트 측(브라우저의 실제 `Date.now()`)으로 옮긴다 — 이 경우 카드가 `'use client'`를 쓰게 되거나(이미 `post-card.tsx`는 `'use client'`다) 하이드레이션 후에만 배지가 나타나 SSR/SSG 시점과 화면이 다르게 보일 수 있다(레이아웃 시프트 우려).

이 시안은 **1안(빌드 시점 기준)을 기본값으로 제안**한다 — `post-card.tsx`가 이미 `'use client'`이지만 배지의 켜짐/꺼짐을 서버에서 계산해 내려주는 것이 가장 단순하고, 2·3안은 추가 인프라·레이아웃 시프트 비용이 있다. 다만 이 판단은 **프로그래머가 최종 확인**해야 한다(오더 지시 그대로).

## 4. 상세 페이지와의 중복·충돌 확인 — 참고(코드 현황)

`src/components/post-detail.tsx`를 직접 읽어 확인한 결과(2026-11-08):

```tsx
{post.updatedAt ? (
  <div className="flex gap-1">
    <dt>{dict.updated}</dt>
    <dd><time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time></dd>
  </div>
) : null}
```

상세 페이지는 **`updatedAt` 날짜만** `dl`에 표시하고 있다. **PRD §6⑤가 말하는 "갱신 이력 한 줄"(예: "2026-XX-XX 갱신: 1심 유죄 판결 보도 반영" — 무엇이 바뀌었는지 설명하는 문장)은 코드에 없다.**

- 카드의 "11/04 갱신" 배지와 상세의 `updated: 2026년 11월 4일` 표시는 **같은 날짜를 가리키므로 충돌하지 않는다**(중복이 아니라 같은 사실을 요약/전개 두 단계로 보여주는 것).
- 다만 PRD §6⑤의 "갱신 이력 문장"이 아직 구현되지 않았다는 사실은 **이번 오더(카드 배지)의 범위가 아니므로 고치지 않는다.** 상세 페이지에 "무엇이 바뀌었는지" 문장을 넣을지는 별도 확인이 필요하다 — `docs/handoffs/designer-02-…`에 프로그래머 확인 필요로 남긴다.
- 정렬 기준은 `publishedAt`을 그대로 쓴다(수용 기준 2.4 — 변경 없음, 이 시안도 건드리지 않음).

## 5. 번역 사전 추가

```ts
renewedSr: (fullDate: string) => string
```

| 키 | ko | en |
|---|---|---|
| `renewedSr('2026년 11월 4일')` | 최근 갱신: 2026년 11월 4일 | — |
| `renewedSr('Nov 4, 2026')` | — | Recently updated: Nov 4, 2026 |

(시각 라벨 "11/04 갱신"/"Updated Nov 4"는 `formatShortUpdated`가 직접 생성하므로 사전에 별도 키를 두지 않는다.)

## 6. 목업

`mockup-post-card-renewal.html` — 카드 4가지 상태(① 갱신 없음 ② 갱신 있음·한국어 피드 ③ 갱신 있음·영어 피드 ④ 영어 피드에서 "한국어만" 배지와 갱신 배지 동시 노출)를 나열했다.
