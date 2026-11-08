# poster-2026-11-08-pivot-4-touchup — COMPLETE

- 판단: 주제 전환 게시물 경미 수정 (반공-슈퍼바이저 점검 결과 반영, 사용자 승인 1a)
- 담당: 반공-업로더 (슈퍼바이저 · Opus 5.5), 2026-11-08
- 기준: docs/poster/guide.md §1-1 (f03ea54)
- 커밋: f96229a (경로 지정 3파일, git add -A 미사용)

## 변경 파일과 변경 전후 문구
1. `content/posts/2026-10-29-khan-nk-srbm-launch-wonsan.md` 첫 문단
   - 전: "같은 계열의 북한 순항미사일 시험발사 게시물: [...]"
   - 후: "앞선 북한 미사일 관련 게시물: [...]"
2. `content/posts-en/2026-10-29-khan-nk-srbm-launch-wonsan.md` 첫 문단 (대응 문장)
   - 전: "A related post on North Korea's submarine-launched cruise missile test (may be available only in Korean): [...]"
   - 후: "An earlier post on North Korean missiles (may be available only in Korean): [...]"
3. `content/posts/2026-10-24-khan-nk-third-company-commanders-conference.md` sources[0].name (sourceUrl은 그대로)
   - 전: "경향신문 — '사망설' 돌자 보란 듯 공개석상 등장한 김정은···군 수뇌부 앞에서 \"최강의 군대 건설\""
   - 후: "경향신문 — 김정은, 제3차 중대장대회서 \"최강의 군대 건설\" 연설(사망설 확산 뒤 공개 활동)"
   - 영어본: `sources` 필드가 없음(README §9 — 배경 보도는 한국어 원본 값을 씀). 수정할 대응 항목 없음.

## 검증
- validate:content R=0, 해당 id 경고 0
- 독립 grep 게이트(홈 경로·다른 서비스명): 스테이징 diff에서 0건
- clean-clone gate (docs/tools/programmer-07/clean-clone-gate.sh --staged): "✅ 깨끗한 복제본 게이트 통과"
- GitHub commit status: success
- 배포 확인(curl): /post/2026-10-29-khan-nk-srbm-launch-wonsan 200 · /en/post/같은 id 200 · /post/2026-10-24-khan-nk-third-company-commanders-conference 200. 예전 문구('같은 계열'·'보란 듯'·'related post on North Korea') 0건, 새 문구 노출 확인

## 지침 수용
- 앞으로 트리거의 §1-1 8칸 자기 점검은 건별 실제 값으로 쓴다. 30일 줄에는 기사 게재일과 경과일, 중립화 줄에는 실제로 바꾼 sources 항목(없으면 "변경 없음")을 적고, 같은 문구를 복붙하지 않는다. 기존 4건 트리거는 소급 수정하지 않음.
