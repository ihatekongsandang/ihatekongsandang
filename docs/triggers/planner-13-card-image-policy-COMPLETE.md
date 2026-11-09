# 기획자 세션 — 13-card-image-policy 완료 트리거
**작성일**: 2026-11-09 | **작성 세션**: 기획자 (Sonnet 5.5)

## 산출물
- `planning/card-image-policy.md` — 규칙·사용자 결정 안·데이터 모델·프로그래머 목록·업로더 절차 초안

## 규칙 요약
- A: 공공누리 제1유형 허용, 제3유형 조건부(무변형 표시 구현 후), 제2·4유형 제외(영리 여부 확인 필요). 개별 이미지에서 마크 직접 확인. 1유형은 `public/images/`에 저장 가능. 미성년자·피해자·비공인·부상 장병·일반 시민 얼굴 제외. 표시 "사진: {기관}(공공누리 제N유형)"+원문 링크(ko/en)
- B: `sources[]` 언론 기사 og:image 핫링크만(재호스팅 금지, 차단 우회 금지). 표시 "사진: {언론사}"+기사 링크. 제외 7항목(텍스트 카드 사유 7종 포함). 깨지면 플레이스홀더, 제거 요청은 이미지 제거/비공개
- 저작권법 제7·24조의2·28·35조의5 원문 확인. B(사진 전체 이용)는 법적 위험 잔존 -> 확인 필요 9건 목록화

## 사용자 결정 안 (얼굴 기준)
1. 현행 전면 금지 유지 / 2. 공인 공적 활동 사진 허용 / 3. 2안 + 의혹·수사 당사자 본인 얼굴 사진 제외 (권장)
추가 결정: B를 연락 창구 확정 전에 시작할지, 제3유형 허용 시점

## 코드 변경 필요 목록 (상세 P1~P12)
- 스키마: image에 kind·creditName(En)·sourcePageUrl·license·retrievedAt·faceNote 추가, news만 https src 허용(현재는 /images/ 경로만)
- 검증: news의 sourcePageUrl이 sources[]에 있는지, 포털 도메인 거부, license 필수
- resolveCardMedia: image.kind=news -> remote, alt는 image.alt
- 상세 figcaption 크레딧·라이선스·링크
- 제3유형 무변형 표시(object-contain, unoptimized)
- 핫링크 점검 비차단 스크립트
- CSP img-src https: 이미 허용(변경 불필요), referrerpolicy 우회 금지
- content/README §3.4, guide §1-1 2항·§2·§4, PRD §5.1·§6③ 후속 정리(이번 오더에서 미수정)

## 커밋 대상 경로
- planning/card-image-policy.md
- docs/triggers/planner-13-card-image-policy-COMPLETE.md
- instructions/planner/processed/13-card-image-policy-public-then-news.md
- history/2026-11-09.md
