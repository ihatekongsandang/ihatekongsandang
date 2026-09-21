# 초안 1 — 김은혜 의원 인스타그램 릴스 (리뷰어 06 §4.1 수정 6건 반영 · 라벨 폐지 단일 스키마)

**작성**: 슈퍼바이저 (Opus 5) 2026-09-21 (v2 17:20) | **원문**: https://www.instagram.com/reel/DdiCDc6hRYT/
**상태**: 프로그래머 03(단일 스키마) 완료 → 리뷰어 07 최종 확인 → 게시

## 추출 (인스타그램 OG 비공개 → 페이지 본문, 리뷰어 06 독립 확인 일치)
- 게시자 `kimeunhye_official`(인증) — 국민의힘 성남 분당을 국회의원
- 캡션(원문 그대로): "집값은 못잡고 국민만 잡아요"
- 해시태그: #전세는죄가없다 #전세멸종시대 #전세악마화정부 #부동산정치 #분당을국회의원_김은혜
- 게시일 2026-09-20 · ⚠️ 영상 시청 불가 — 캡션·해시태그 기준(상세에 명시)

## 배경 보도 (이 릴스를 다룬 보도가 아님 — "관련 배경 보도"로 표기)
- 아시아경제 2026-09-09 https://view.asiae.co.kr/article/2026090911281946643 — "정부는 시장을 통제하겠다는 유혹에서 벗어나야 한다"
- 뉴스핌 2026-07-24 https://www.newspim.com/news/view/20260724001133 — "정부가 부동산 정책이 아니라 '부동산 정치'를 하기 때문"
- 삭제: "서울 전세 매물 급감" (두 기사 어디에도 없음 — 리뷰어 06 확인)

## frontmatter (단일 스키마 — 프로그래머 03 필드명에 맞춰 최종 조정)
```yaml
id: 2026-09-20-kimeunhye-jeonse-reel
title: 김은혜 의원 "집값은 못잡고 국민만 잡아요" — 전세·부동산 정책 비판 릴스
description: 국민의힘 김은혜 의원(분당을)이 9월 20일 인스타그램 릴스 캡션 "집값은 못잡고 국민만 잡아요"와 해시태그(#전세는죄가없다·#전세멸종시대 등)로 정부 부동산·전세 정책을 비판함. 캡션 기준으로 정리.
publishedAt: 2026-09-21
sourceType: url
sourceUrl: https://www.instagram.com/reel/DdiCDc6hRYT/
attribution: 인스타그램 @kimeunhye_official
speaker: { name: 김은혜, affiliation: 국민의힘 국회의원(성남 분당을) }
og: { title: "", description: "", image: "", siteName: Instagram }
useSourceImage: false
sources:   # 관련 배경 보도 (릴스 자체를 다룬 보도 아님)
  - { type: 언론, name: 아시아경제, url: https://view.asiae.co.kr/article/2026090911281946643, date: 2026-09-09 }
  - { type: 언론, name: 뉴스핌, url: https://www.newspim.com/news/view/20260724001133, date: 2026-07-24 }
tags: [부동산정책, 전세, 김은혜]
```
상세 본문(마크다운): "이 게시물은 릴스의 캡션·해시태그 기준으로 정리했으며 영상 전체 내용과 다를 수 있습니다." + 관련 배경 보도 2건 요약(인용문 형태).
