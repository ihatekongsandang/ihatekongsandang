# 03 — 소개 페이지: D1 소개 문구 위치 · "연락 창구 준비 중" 표시 (ko/en)

> 대상: `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`, `src/lib/config.ts`(`SITE.description`/`SITE_EN.description`)
> D1 확정 문구(PRD §1, 안 3): "여러 언론 보도를 모아 정리하는 카드형 뉴스 소식지입니다. 직접 취재하지 않고, 언론 보도(신문법 등에 따라 등록된 매체)·수사기관 발표·판결을 출처로 밝혀 정리합니다. 사실 확인 단계는 단정하지 않고 보도 그대로 인용합니다." — **이 문구 자체는 기획자 확정값이라 디자인이 고치지 않는다.** 이 문서는 "어디에 놓을지"만 정한다.

## 1. D1 문구가 들어갈 위치 — 구조 변경 없음, `SITE.description` 교체로 충분

### 1.1 한국어 (`/about`)

현재 `/about` 헤더:

```tsx
<header className="space-y-3">
  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">소개</h1>
  <p className="text-muted-foreground">{SITE.description}</p>
</header>
```

`{SITE.description}`이 이미 소개 문단 자리를 차지하고 있다(`src/lib/config.ts`의 상수를 그대로 출력). **D1 문구를 `SITE.description` 값 자체로 교체**(scope.md 작업 1, 프로그래머 영역)하면, 디자인 쪽에서 새 섹션이나 레이아웃 변경을 할 필요가 없다 — 지금 자리가 곧 D1 문구의 자리다.

- **대안으로 "새 섹션을 만들어 분리한다"를 검토했으나 채택하지 않았다.** 이유: D1 문구는 정의상 "소개 문구"이고, 헤더 바로 아래 한 문단은 이미 그 역할을 하는 자리다. 별도 섹션(`Section id="intro"`)을 또 만들면 "운영 방식" 섹션의 첫 항목("정책 비판·정치인 발언·논평·안보 현안 등…")과 내용이 겹쳐 같은 말을 두 번 하게 된다. `SITE.description` 교체 하나로 끝내는 쪽이 "담백함"에 맞는다.
- 기존 "운영 방식" `Section`의 첫 `<li>`("정책 비판·정치인 발언·논평·안보 현안 등 정치·시사 이슈를…")는 D1 문구와 취지가 겹치므로, **프로그래머가 `SITE.description`을 D1로 바꿀 때 이 `<li>`를 지우거나 D1과 중복되지 않게 줄이는 것을 권장**한다(scope.md 수용 기준에는 없지만, 중복 문장을 그대로 두면 "소개" 페이지 첫 두 문단이 같은 내용을 반복해 담백함을 해친다 — 코드 수정 자체는 프로그래머 영역이라 이 시안은 권고만 남긴다).

### 1.2 영어 (`/en/about`)

현재 `/en/about` 헤더도 같은 구조다(`{SITE_EN.description}`). **같은 원칙 — `SITE_EN.description`을 D1의 영어 번역으로 교체**하면 위치 문제는 끝난다.

> 참고(범위 밖, 기록만): `planning/news-format-v0.2-scope.md` P3-11이 짚었듯 `/en/about`에는 `/about`의 "출처 정책"·"표기 원칙"·"인용·저작권" 같은 절이 없다(헤더 한 줄 + 번역 안내 + 정정 요청만 있음). 이 불균형을 메우는 일은 이번 오더(D1 문구 위치·연락 창구 표시)의 범위가 아니다 — 수용 기준 2.1도 "헤더 설명 갱신"까지만 요구한다. 전체 섹션 보강이 필요하면 별도 오더로 다룰 것을 제안한다.

## 2. "연락 창구 준비 중" 표시 위치 (ko/en) — 기존 정정 요청 섹션의 이메일 박스를 교체

### 2.1 현재 상태 (문제)

`/about`·`/en/about` 둘 다 "정정·삭제 요청" 섹션에 다음과 같은 박스가 있다:

```tsx
<p className="rounded-[var(--radius-card)] border bg-surface p-4 text-sm">
  이메일{' '}
  <a href={`mailto:${SITE.contactEmail}`} className="text-link underline underline-offset-2">
    {SITE.contactEmail}
  </a>
  <br />
  <span className="text-xs text-muted-foreground">
    ※ 연락 채널은 확정 전 임시 주소입니다. 확정되면 이 페이지를 갱신합니다.
  </span>
</p>
```

`contact@example.invalid`는 `.invalid` 예약 도메인이라 메일이 전달되지 않는다(리뷰 24 §7 확인). **이 박스 전체를 교체**한다.

### 2.2 교체안

```tsx
<p className="rounded-[var(--radius-card)] border border-dashed p-4 text-sm">
  연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다.
</p>
```

- **배경을 `bg-surface`(실선 테두리)에서 `border-dashed`(배경 없음)로 바꾼다.** 근거: 실선 + 채워진 배경은 "여기 눌러서 연락하라"는 행동 유도 상자처럼 보이는데, 지금은 누를 것이 없다(mailto 링크 자체가 없음). 점선 테두리는 이 사이트가 이미 "진행 중/임시" 상태를 나타낼 때 쓰는 패턴이다(`post-detail.tsx`의 `postNotice` 박스와 같은 스타일 — 일관성).
- `mailto:` 링크·이메일 문자열을 **완전히 제거**한다(오더 요구 그대로 — "화면에서 없앤다"). 밑에 있던 "접수 후 3영업일 이내 답변" 등 처리 기준 불릿은 **그대로 둔다** — 기준 자체는 유효하고, 채널이 생기는 즉시 적용된다는 사실을 보여준다(약관 페이지와 같은 처리, `02-terms-page.md` §3.1 참조).
- 섹션 제목("정정·삭제 요청")·섹션 위치는 바꾸지 않는다 — `/about` 안에서 이미 자리가 정해져 있고 scope.md도 위치 변경을 요구하지 않는다.

### 2.3 영어판(`/en/about`) 동일 교체

```tsx
<p className="rounded-[var(--radius-card)] border border-dashed p-4 text-sm">
  Contact channel: pending a decision. This page will be updated once it's finalized.
</p>
```

문구는 terms-page-copy.md en §4의 기존 번역("Contact channel: pending a decision.")과 **동일한 표현**을 쓴다 — `/about`·`/terms` 두 페이지에서 같은 상태를 다른 말로 표현하면 사용자가 둘이 다른 상태인가 혼동할 수 있다.

## 3. 이 수정은 지금 바로 반영 가능 (약관 페이지 공개와 무관)

`02-terms-page.md` §6은 약관 페이지 자체의 공개를 연락 경로 확정 때까지 보류하자고 제안했지만, **`/about`·`/en/about`의 이 교체는 다르다** — 지금 라이브에 떠 있는 `contact@example.invalid`는 "작동하지 않는 연락처가 작동하는 것처럼 보이는" 상태라 그 자체로 결함이다(리뷰 24 §7). "연락 창구 준비 중"으로 바꾸는 것은 이 결함을 고치는 일이므로, 연락 경로 사용자 결정을 기다리지 않고 **지금 바로 반영**해도 된다는 점을 슈퍼바이저에게 전달한다.

## 4. 접근성·대비

새 박스(`border-dashed`, 배경 없음, `text-foreground`/`text-sm`)는 기존 `postNotice` 박스와 같은 토큰을 쓰므로 대비는 이미 통과한 조합이다(`--foreground` on `--background` = 17.7:1, `01-share-buttons.md` §5에서 계산한 값과 동일 토큰). 추가 검증 불필요.
