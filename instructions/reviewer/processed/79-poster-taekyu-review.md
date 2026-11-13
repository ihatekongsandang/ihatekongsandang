# 리뷰 79 — 게시 초안 1건(2026-11-12-taekyu-defense-minister-fight-north-korea) 검토

담당: 반공-리뷰어 · 빌드 없음(`npm run validate:content`만 허용) · 수정·커밋 금지

## 대상
- `content/posts/2026-11-12-taekyu-defense-minister-fight-north-korea.md`, `content/posts-en/` 같은 id
- `public/images/2026-11-12-taekyu-defense-minister-fight-north-korea/thumb.jpg`
- `docs/triggers/poster-2026-11-12-taekyu-defense-minister-fight-north-korea-COMPLETE.md`
- 기준: `docs/poster/guide.md` 전체, `planning/card-image-policy.md` §3·§4.5, `content/README.md`

## 점검
1. **사실 대조**: 본문 인용과 날짜, 발언자·직함이 트리거에 적힌 언론 출처 원문과 맞는지 직접 열어 확인한다. 원 게시물 캡션은 수집하지 못했다. 그래서 첫 화면 문구 기준으로 쓴 부분이 과장·단정이 없는지 본다.
2. **실명 규칙**: 공인(현직 의원·장관) 실명은 정책 §3.1 범위 안인지 확인한다. 비공인 실명이 없는지도 본다.
3. **이미지**: 국회의사당 A-2 사진의 라이선스 원 페이지, 사람·얼굴, caption 형식, 같은 원본 재사용 횟수(3번째)·피드 인접 5칸·연작 8건 상한·대상별 하한, §4.5-5(정당·인물 발언 게시물에 기관 건물을 써도 되는지 — 국회 예결위 회의 장소로서 같은 장소인지)를 본다. EXIF 개인정보 필드도 확인한다.
4. **영어본**: 번역 정확성, caption 160자.
5. validate R=0·경고 22, 새 경고 0.
6. 저장소 독립·민감정보 grep(트리거 포함).

## 🔴 금지
- 파일 수정, git 쓰기, 빌드. 트리거에 저작자 이름·비공개 실명·옛 id·다른 서비스명·계정·홈 경로를 쓰지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-79-poster-taekyu-review-COMPLETE.md`(판정·P 목록 파일:줄·수정안·최종 커밋 경로). 끝나면 오더를 processed/로 옮긴다.
