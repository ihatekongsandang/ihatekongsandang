# User Tasks — 사용자 직접 처리 필요 항목

> API 키·계정·결제 등 사용자만 처리할 수 있는 외부 의존성을 추적. 완료 시 `[x]` + 완료일.

> 🔴 **계정 분리 원칙 (2026-09-21)**: 기능 계정(Vercel·Supabase·GitHub·R2·Resend)은 **이 프로젝트 전용 계정 `ihatekongsandang`**,
> 통계 계정(GA·GSC·네이버 서치어드바이저)은 기존 통계 계정의 **새 속성**.

## 0. 기능용 신규 계정 준비 (구현 착수 전)
- [x] 2026-09-21 GitHub 계정 `ihatekongsandang` 생성 — Vercel·Supabase도 이 계정으로

## 1. GitHub 저장소 생성 (구현 착수 전)
- [x] 2026-09-21 https://github.com/ihatekongsandang/ihatekongsandang 생성 + fine-grained PAT(Contents RW) 키체인 저장 → 골조 푸시 완료. 2026-09-21 레포 삭제·재생성(서버 잔존 객체 정리) — 재생성 시 PAT Repository access 재선택 필요했음
- ⚠️ GitHub Actions 워크플로우 파일 커밋 시 PAT에 **Workflows: Read and write** 추가 필요

## 2. Vercel 프로젝트 연결 (🔴 지금 — 코드 첫 커밋 f6217f0 푸시됨) — **새 계정**
- [ ] `ihatekongsandang` 계정으로 Vercel 가입/로그인 → https://vercel.com/new → Import Git Repository → `ihatekongsandang/ihatekongsandang` (GitHub 앱 권한 부여 시 이 레포만)
- [ ] Framework: Next.js 자동 감지 · Root Directory `.` · Build Command 기본(`npm run build` — prebuild 검증 포함) · Node 20.x 이상
- [ ] **Environment Variables**: `NEXT_PUBLIC_SITE_URL` = 배포 URL(임시 `https://<프로젝트>.vercel.app`, 도메인 확정 후 교체). `NEXT_PUBLIC_GA_ID`는 v0.1.5에서
- [ ] Deploy → 배포 URL을 슈퍼바이저에게 전달 (리뷰어 04 §7 `curl` 2회 확인 예정)
- 전용 계정이므로 무료 한도(ISR Reads 등)가 다른 프로젝트와 분리됨

## 2-1. Supabase 프로젝트 (v0.3 제보 기능 착수 전) — **새 계정**
- [ ] 새 계정으로 Supabase 프로젝트 생성 → URL·publishable key·secret key → `.env.local`
- ⚠️ 다른 프로젝트 키 재사용 금지

## 2-2. GA4 속성 · 검색엔진 등록 (v0.1 첫 배포 직후, **디자인 전 필수**) — 기존 통계 계정
- [ ] 같은 GA 계정에 **새 속성** 생성 → 측정 ID → `.env.local` `NEXT_PUBLIC_GA_ID=`
- [ ] Google Search Console · 네이버 서치어드바이저 — 동일 계정에 새 사이트 등록 (도메인 확정 후)

## 3. 도메인 (선택, 출시 전)
- [ ] 미정 — 기획 단계에서 서비스명 확정 후

## 4. 이미지 호스팅 (프로그래머 판단 후) — **새 계정**
- [ ] R2 버킷 신규 생성 여부 (Cloudflare도 새 계정) — 게시물 이미지가 많아질 경우. 초기는 `public/images/`로 시작
