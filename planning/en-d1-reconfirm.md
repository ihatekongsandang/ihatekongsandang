# 영어 D1 소개 문구 기획자 재확인 (md오더 10)

> 작성: 기획자 (Sonnet 5.5) | 작성일: 2026-11-09
> 근거: scope 2.1-2("영어 문구는 기획자 재확인 없이 배포하지 않는다"), 리뷰 26 P2-4(`docs/reviews/programmer-11-news-format-v0.2-implement-review.md`)
> 읽은 문서: `planning/prd.md` v0.7 §1 안 3, `planning/news-format-v0.2-scope.md` 2.1-2·2.1-4, `planning/terms-page-copy.md`, `src/lib/config.ts`(읽기만)
> 수정한 파일 없음(src·content·PRD·scope 불변).

## 1. 판정

| 대상 | 판정 |
|---|---|
| `SITE_EN.aboutIntro` (셋째 문장을 리뷰 26 교체 문구로 바꾼 결과) | **확정** — 아래 최종 문구대로 배포해도 된다 |
| `SITE_EN.description` | **확정(현행 유지)** — 157자, 160자 이하 |

기획자 재확인(scope 2.1-2)은 본 문서로 충족한다. 슈퍼바이저 판단에 따라 리뷰어의 의미 동등 승인은 별도로 받는다.

## 2. 문장별 대조 (한국어 확정문: PRD v0.7 §1 안 3)

| # | 한국어 확정문 | 영어(최종) | 판정 |
|---|---|---|---|
| 1 | 여러 언론 보도를 모아 정리하는 카드형 뉴스 소식지입니다. | A card-style news digest that gathers and organizes reporting from multiple news outlets. | 동등 |
| 2 | 직접 취재하지 않고, 언론 보도(신문법 등에 따라 등록된 매체)·수사기관 발표·판결을 출처로 밝혀 정리합니다. | We do not do our own reporting; we organize each story with its sources named: news reports (from outlets registered under Korea's Act on the Promotion of Newspapers and related laws), announcements by investigative authorities, and court rulings. | 동등 |
| 3 | 사실 확인 단계는 단정하지 않고 보도 그대로 인용합니다. | We do not make definitive claims about how far the facts have been established; we quote the reports as they are. | 동등(교체 후) |

### 2.1 셋째 문장
- 한국어 "단정하지 않고"는 "단정적으로 주장하지 않는다"는 뜻이다. 교체 문구 "do not make definitive claims"가 그 뜻과 같다. 교체 전 "do not state"는 "밝히지 않는다"로 읽혀 뜻이 달랐다(리뷰 26 P2-4).
- "사실 확인 단계"는 "how far the facts have been established"로 옮겨졌다. 확인이 어디까지 됐는지를 묻는 구조가 같다. "established"는 "확인됐다고 정립됐다"는 뜻이라 "단정하지 않는다"와 어긋나지 않는다.
- "보도 그대로 인용합니다"는 "we quote the reports as they are"로 동등하다.
- 소개 표기 원칙(사실 확인이 어디까지 된 일인지는 요약 문장과 출처 목록으로 전달)과 충돌하지 않는다. 교체 문구는 운영자 자체 판단을 하지 않는다는 뜻이다.

### 2.2 scope 2.1-4 ("등록된"은 출처 매체에만)
- 둘째 문장에서 "registered"는 괄호 안 "(from outlets registered under …)"에만 있고, 그 괄호는 "news reports"에만 걸린다. 주어인 "we"에는 걸리지 않는다. 충족.
- 한국어 원문의 "신문법 등"은 영어 "the Act on the Promotion of Newspapers and related laws"로 옮겼다. 사용자 확정문이 "등"으로 범위를 열어 둔 것과 같은 구조다. 참고: 약관 문안은 뉴스통신사·방송사업자가 신문법 등록 대상이 아니라고 정정했다(`planning/terms-page-copy.md` §3). D1은 사용자 확정문이라 원문 구조를 따르며, "and related laws" 한 구가 그 여지를 이미 담는다. 영어만 따로 바꾸면 한국어와 어긋나므로 바꾸지 않는다.

### 2.3 D6 (운영자를 언론사·기자로 자칭 금지)
- 첫 문장은 사이트를 "news digest"로 부른다. 소식지 성격이며 언론사·기자 자칭이 아니다.
- "reporting"은 "gathers and organizes reporting"(남의 보도를 모음)과 "We do not do our own reporting"(직접 취재 안 함)에서만 쓰였다. 운영자가 취재·보도한다는 표현이 없다.
- "journalist", "reporter", "newsroom", "press", "editorial staff" 등 자칭 표현 없음(config.ts 두 문구 직접 확인).

## 3. `SITE_EN.description` 점검

현행:
> A card-style news digest that gathers reports from multiple news outlets. We do no reporting of our own and cite reports, official announcements and rulings.

- 글자 수: **157자**(공백 포함, 파이썬 `len` 측정). 160자 이하.
- 첫 문장은 D1 첫 문장과 같은 뜻, 둘째 문장은 D1 둘째 문장을 줄였다. 셋째 문장은 길이 제한으로 빠졌다.
- "official announcements"는 D1의 "announcements by investigative authorities"보다 넓다. meta 요약 한 줄에서는 "공식 발표"로 읽혀도 오인 위험이 낮고 사이트가 실제로 그런 자료를 인용한다(리뷰 26 P3-6이 비차단으로 본 것과 같은 판단). 수사기관으로 좁히면 190자 안팎으로 160자를 넘기므로 현행 유지가 낫다.
- "registered" 없음 → 2.1-4 해당 없음. 자칭 표현 없음 → D6 충족.
- 영어판 meta에서 셋째 문장이 빠지는 점은 D1 전문이 `/en/about`에 그대로 실리므로 허용한다.

## 4. 최종 영어 문구 (배포 확정본)

`SITE_EN.aboutIntro`:
```
A card-style news digest that gathers and organizes reporting from multiple news outlets. We do not do our own reporting; we organize each story with its sources named: news reports (from outlets registered under Korea's Act on the Promotion of Newspapers and related laws), announcements by investigative authorities, and court rulings. We do not make definitive claims about how far the facts have been established; we quote the reports as they are.
```

`SITE_EN.description` (157자):
```
A card-style news digest that gathers reports from multiple news outlets. We do no reporting of our own and cite reports, official announcements and rulings.
```

## 5. 프로그래머에게 전달할 변경점
- `SITE_EN.aboutIntro` 셋째 문장만 교체: `We do not state how far the facts have been confirmed;` → `We do not make definitive claims about how far the facts have been established;` (나머지 문장 불변)
- `SITE_EN.description` 변경 없음.
- 반영 후 영어 D1 글자 비교 스크립트가 있으면 재실행. 기획자 재확인 완료이므로 scope 2.1-2의 배포 조건 중 기획자 항목은 해소됐다.
