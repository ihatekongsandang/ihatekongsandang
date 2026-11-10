# 리뷰어 59 — 업로더 20(대체 카드 12건 원경 재검토) 검토

담당: 리뷰어(Opus 5.5) · 빌드 없음(validate만) · 커밋 금지

## 대상
- `docs/triggers/uploader-20-fallback-12-wongyeong-recheck-COMPLETE.md`, 작업 트리 변경(`content/posts*/2026-07-20-yoonsanghyun-special-counsel-filibuster.md` ko·en)
- 기준: `instructions/uploader/processed/20-fallback-12-wongyeong-recheck.md`, guide §4-1, 정책 §3.1·§3.3·§3.4·§3.5·§3.6, 업로더 지침 단계 1~4·2-1

## 확인할 것
1. **② 1건(6-#10)**: og:image를 직접 받아 원본 해상도로 열어 (다) 인물 중 가장 큰 정면 얼굴을 직접 재고(이마~턱, 짧은 변 대비 %), 5% 미만·초점/중심 아님·사진 설명 미언급을 독립 확인. 미성년자·피해자·부상자 없음, 워터마크·로고·4a(사건 당시)·8항(400px)·7항(사용 제한) 없음. 주인공이 §3.1 공인이고 공적 활동인지. `image` 필드(src·creditName·sourcePageUrl·faceNote 원경 형식·caption·alt)·en `imageAlt`·`imageCaption`이 정책 형식과 선례에 맞는지, 비공인 실명·사진 기자 이름 0.
2. **③ 유지 11건**: 각 건의 판정 근거(측정값·다른 사유)가 맞는지 — 최소한 측정값이 5~7%로 경계에 가까운 건(9-#7 6.8%, 13-#8 5.2%, 11-#8 조선일보 5.1%, 2-#8 6.4%~)은 사진을 직접 열어 재측정. 나머지는 기록된 사유를 원문 HTML로 확인(샘플 아님 — 11건 모두 사유 하나 이상 확인).
3. updatedAt 미변경, `npm run validate:content` 통과, 핫링크 200.
4. 산출물에 비공인 실명·사진 기자 이름·옛 id·다른 서비스명·홈 경로 0.

## 🔴 금지
- git 쓰기·빌드·`src/` 수정 금지. 받은 사진은 저장소 밖 임시 폴더에만.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-59-uploader-20-review-COMPLETE.md` — 판정, 직접 잰 값, P1~P3, 커밋 경로 목록.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
