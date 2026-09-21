# User Tasks — 사용자 직접 처리 필요 항목

> API 키·계정·결제 등 사용자만 처리할 수 있는 외부 의존성을 추적. 완료 시 `[x]` + 완료일.

> 🔴 **계정 분리 원칙 (2026-09-21)**: 기능 계정(Vercel·Supabase·GitHub·R2·Resend)은 **이 프로젝트 전용 계정 `ihatekongsandang`**,
> 통계 계정(GA·GSC·네이버 서치어드바이저)은 기존 통계 계정의 **새 속성**.

## 0. 기능용 신규 계정 준비 (구현 착수 전)
- [x] 2026-09-21 GitHub 계정 `ihatekongsandang` 생성 — Vercel·Supabase도 이 계정으로

## 1. GitHub 저장소 생성 (구현 착수 전)
- [x] 2026-09-21 https://github.com/ihatekongsandang/ihatekongsandang 생성 + fine-grained PAT(Contents RW) 키체인 저장 → 골조 푸시 완료. 2026-09-21 레포 삭제·재생성(서버 잔존 객체 정리) — 재생성 시 PAT Repository access 재선택 필요했음
- ⚠️ GitHub Actions 워크플로우 파일 커밋 시 PAT에 **Workflows: Read and write** 추가 필요

## 2. Vercel 프로젝트 연결 — ✅ 2026-09-21 완료 (슈퍼바이저 브라우저 대행, 새 계정)
- [x] GitHub App(이 레포만) → Import → Hobby 팀 `ihatekongsandang's projects` → 첫 배포 성공
- [x] 배포 URL **https://ihatekongsandang.vercel.app** · `NEXT_PUBLIC_SITE_URL` 설정(Production+Preview)
- [x] 배포 직후 확인(리뷰어 04 §7): 보안 헤더 6/6 · 상세 og:image 절대 URL ✅
- [ ] 도메인 확정 시 `NEXT_PUBLIC_SITE_URL` 교체 + GA 스트림 URL·GSC 속성 추가

## 2-1. Supabase 프로젝트 (v0.3 제보 기능 착수 전) — **새 계정**
- [ ] 새 계정으로 Supabase 프로젝트 생성 → URL·publishable key·secret key → `.env.local`
- ⚠️ 다른 프로젝트 키 재사용 금지

## 2-2. GA4 · 검색엔진 등록 (v0.1.5) — 기존 통계 계정 (authuser=2)
- [x] 2026-09-21 GA4 새 속성 **공산당이싫어요**(뉴스·대한민국·KRW) + 웹 스트림 `공산당이싫어요 웹`(ID 15815211648), 측정 ID `G-ZM1GPRXYZD` → Vercel `NEXT_PUBLIC_GA_ID`(Production만) → 재배포, 배포 HTML에 gtag 반영 확인
- [x] 2026-09-21 Google Search Console URL 접두어 속성 `https://ihatekongsandang.vercel.app/` — HTML 파일 방식 소유권 확인(`public/google327acae7b08ebffd.html`, 삭제 금지) · `sitemap.xml` 제출
  - ⚠️ GA 방식 인증은 실패(gtag가 body에 삽입) → 프로그래머 03: 메타태그 env(`NEXT_PUBLIC_GSC_VERIFICATION`·`NEXT_PUBLIC_NAVER_VERIFICATION`) 지원 추가
- [x] 2026-09-21 **네이버 서치어드바이저** — 사이트 등록 · HTML 파일 소유확인(`public/naver67b2b45ea951e8e891d41348c0878938.html`, 삭제 금지) · robots.txt 검증 통과(16:40 수집) · sitemap.xml 제출 · 웹 페이지 수집요청(/, /about)
- [ ] GA 실데이터 수집 확인(24~48h 후) · 카드 노출/클릭 이벤트 도달 확인 → v0.1.5 DoD

## 3. 도메인 (선택, 출시 전)
- [ ] 미정 — 기획 단계에서 서비스명 확정 후

## 4. 이미지 호스팅 (프로그래머 판단 후) — **새 계정**
- [ ] R2 버킷 신규 생성 여부 (Cloudflare도 새 계정) — 게시물 이미지가 많아질 경우. 초기는 `public/images/`로 시작
