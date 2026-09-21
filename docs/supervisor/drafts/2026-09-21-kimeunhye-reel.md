# 초안 — 발언·논평 게시물 (스키마 확정 전 보관, 게시 X)

**작성**: 슈퍼바이저 (Opus 5) 2026-09-21 | **사용자 전달 원문**: https://www.instagram.com/reel/DdiCDc6hRYT/
**상태**: PRD v0.5(발언·논평 유형) + 프로그래머 03 스키마 반영 후 `content/posts/`로 이동

## 추출 (인스타그램 OG 메타 비공개 → 페이지 본문)
- 게시자: `kimeunhye_official` (인증 계정 — 국민의힘 김은혜 의원, 분당을)
- 캡션: "집값은 못잡고 국민만 잡아요"
- 해시태그: #전세는죄가없다 #전세멸종시대 #전세악마화정부 #부동산정치 #분당을국회의원_김은혜
- 게시일: 2026-09-20
- ⚠️ 릴스 영상 내용은 시청 불가 — 캡션·해시태그 기준

## 검색 (2026-09-21)
- 검색어: "김은혜 의원 전세 정부 부동산 정책 비판 2026년 9월"
- 채택 출처 2: 아시아경제 2026-09-09 https://view.asiae.co.kr/article/2026090911281946643 (주택정책 토론회, "시장 통제 유혹 버려야") · 뉴스핌 2026-07-24 https://www.newspim.com/news/view/20260724001133 ("부동산 정책 아니라 '부동산 정치'")
- 보류 1: 네이트뉴스 2026-02-20 (포털 전재 — 원 매체 확인 필요)
- 제외: 브런치·서브스택(개인 블로그, 허용 출처 아님)

## 초안 frontmatter (가칭 필드 — 프로그래머 03 스키마에 맞춰 조정)
```yaml
id: 2026-09-20-kimeunhye-jeonse-reel
kind: statement            # 발언·논평 (상태 라벨 없음)
statementType: 발언
title: 김은혜 의원 "집값은 못 잡고 국민만 잡아요" — 전세 시장 비판 릴스
description: 국민의힘 김은혜 의원이 9월 20일 인스타그램 릴스에서 정부 부동산 정책이 전세 시장을 무너뜨렸다고 비판함. 서울 전세 매물 급감을 근거로 "부동산 정치"라고 지적해 온 연장선(아시아경제·뉴스핌 보도).
publishedAt: 2026-09-21
sourceType: url
sourceUrl: https://www.instagram.com/reel/DdiCDc6hRYT/
speaker: { name: 김은혜, affiliation: 국민의힘 국회의원(분당을), publicFigure: true }
og: { title: "", description: "", image: "", siteName: Instagram }   # 추출 불가
useSourceImage: false
sources:
  - { type: 언론, name: 아시아경제, url: https://view.asiae.co.kr/article/2026090911281946643, date: 2026-09-09 }
  - { type: 언론, name: 뉴스핌, url: https://www.newspim.com/news/view/20260724001133, date: 2026-07-24 }
tags: [부동산정책, 전세, 김은혜]
```
