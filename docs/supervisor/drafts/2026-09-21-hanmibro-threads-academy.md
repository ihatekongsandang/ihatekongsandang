# 초안 — 발언·논평 게시물 (스키마 확정 전 보관, 게시 X)

**작성**: 슈퍼바이저 (Opus 5) 2026-09-21 | **사용자 전달 원문**: https://www.threads.com/share/BAXQCT4yuH/
**상태**: 프로그래머 03 `kind: statement` 스키마 반영 후 `content/posts/`로 이동

## 추출 (Threads OG 메타 없음 → 페이지 본문)
- 게시자: `@hanmibro` (비공인 개인 계정 — 실명 미상, 계정명만 표기)
- 본문: "역대 참모총장 46명이 한꺼번에 반대 입장문을 냈어. 창군 이래 처음이래. 7월 국방부 통합 기본계획과 8월 대통령의 쿠데타 발언부터 여론 58% 반대, 9월 19일 총궐기대회까지 카드로 정리했어. 너는 어떻게 생각해? 출처: 머니투데이·연합·시사IN 외 (9/20) · 공개 보도 정리, 의견 포함 사관학교통합"
- 첨부: 카드형 인포그래픽 이미지 9장 (내용은 미확인 — 이미지 본문 추출 불가)
- 게시일: 2026-09-20 (추정 — "17시간 전" 기준)

## 검색·검증 (2026-09-21)
| 원문 주장 | 검증 | 출처 |
|---|---|---|
| 역대 참모총장 46명 반대 입장문 | ✅ 2026-08-06 — 육 18·해 13·공 15명, "진단과 처방 어긋나" | 연합뉴스(다음·네이트 전재) https://v.daum.net/v/5wveKmsAun · https://news.nate.com/view/20260806n31935 |
| 여론 58% 반대 | ✅ 한국갤럽 8/25~27, 1,001명, 통합 반대 58% | 한국경제TV https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=A202608280464 · 네이트(연합) https://m.news.nate.com/view/20260828n17998 |
| 9월 19일 총궐기대회 | ✅ 경복궁역 인근, "사관학교 폐교 저지 범국민 총궐기대회" | 뉴스핌 https://www.newspim.com/news/view/20260919000121 |
| "창군 이래 처음" | ⚠️ 미확인 — 출처 기사에서 확인 못 함 → 요약에 넣지 않음 |
| "8월 대통령의 쿠데타 발언" | ⚠️ 미확인 — 검색으로 확인 못 함 → 요약에 넣지 않음 |
| 7월 국방부 통합 기본계획 | ⚠️ 미확인 → 요약에 넣지 않음 |

## ⚠️ 정책 확인 필요
- PRD v0.5 §3.4 기본값 제안: "비공인 개인의 사적 SNS 발언은 원칙적으로 게시하지 않음". 이 게시물은 사적 발언이 아니라 **공개 보도 정리+의견**이라 게시 가능으로 보나, 리뷰어 06 판정 대상. 발언자는 계정명만 표기(실명 미상).
- 원문이 스스로 "의견 포함"이라 밝힘 → `statementType: 논평`.

## 초안 frontmatter (가칭)
```yaml
id: 2026-09-20-hanmibro-academy-merger-cards
kind: statement
statementType: 논평
title: 사관학교 통합 논란 — 역대 참모총장 46명 반대 입장문·여론 58% 반대·9·19 총궐기까지 카드 정리 (스레드 @hanmibro)
description: 스레드 이용자 @hanmibro가 육·해·공군 사관학교 통합 논란을 카드 9장으로 정리한 게시물. 역대 참모총장 46명의 반대 입장문(8월 6일, 연합뉴스), 한국갤럽 통합 반대 58%(8월 28일), 9월 19일 총궐기대회(뉴스핌)는 보도로 확인됨. 원문은 의견 포함.
publishedAt: 2026-09-21
sourceType: url
sourceUrl: https://www.threads.com/share/BAXQCT4yuH/
speaker: { name: "@hanmibro", affiliation: 스레드 이용자, publicFigure: false }
og: { title: "", description: "", image: "", siteName: Threads }
useSourceImage: false
sources:
  - { type: 언론, name: 연합뉴스(다음 전재), url: https://v.daum.net/v/5wveKmsAun, date: 2026-08-06 }
  - { type: 언론, name: 한국경제TV, url: https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=A202608280464, date: 2026-08-28 }
  - { type: 언론, name: 뉴스핌, url: https://www.newspim.com/news/view/20260919000121, date: 2026-09-19 }
tags: [사관학교통합, 국방, 여론조사]
```
