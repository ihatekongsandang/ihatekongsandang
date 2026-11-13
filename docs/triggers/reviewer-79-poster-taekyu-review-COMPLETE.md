# reviewer-79 — 게시 초안 `2026-11-12-taekyu-defense-minister-fight-north-korea` 검토 — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-13 · 하위 에이전트
- 한 일: 검토만 했다. 파일 수정·git 쓰기·빌드는 하지 않았고 `validate:content`만 실행했다.
- 오더: `instructions/reviewer/processed/79-poster-taekyu-review.md`(이동)
- 기준: `docs/poster/guide.md` 전체, 정책 §3·§4.5(개정 21·21-1 포함), `content/README.md`
- 수정한 파일: 이 트리거뿐. 원문 HTML은 저장소 밖 scratch에서만 받았다.

## 판정: 🟡 **조건부 통과** — P1 0 · P2 1 · P3 4
- 사실 대조, 실명, 이미지, validate는 통과다.
- 커밋 전에 **P2-1(영어 제목이 김 의원을 나 의원과의 설전 당사자로 읽히게 함)**을 고쳐야 한다. 같은 원인인 P3-1(한국어 제목의 모호함)도 함께 고치기를 권한다.

## 1. 사실 대조 (원문 직접 열람·게재일 실측)
| 출처 | 게재(`article:published_time`) | 대조 결과 |
|---|---|---|
| 한국경제 `hankyung.com/article/2026111232447` | 2026-11-12T16:57:59+09:00 ✅ | 아래 표 |
| 프리진뉴스 `freezinenews.com/…idxno=31441` | 2026-11-12T10:34:59+09:00 ✅ | 김 의원 발언 원문 확인 |
| 파이낸셜뉴스 `fnnews.com/news/202611120748304254` | 2026-11-12T08:43:31+09:00 ✅ | '미군 신뢰' 발언·SCM 연기 공방 확인 |
| 인스타그램 원문 `instagram.com/reel/Dfo2VTANC3h/` | og:description "…on November 12, 2026" ✅ | embed는 `CaptionUsername` 0으로 캡션 미수집. 트리거 설명과 같다 |

본문 줄별 대조(`content/posts/2026-11-12-taekyu-defense-minister-fight-north-korea.md`):
- :59 나 의원의 "당나라 군대냐, 우리나라"와 강 장관의 "…공개적으로 의원이 말씀할 부분이 아니다. 말씀 취소해 달라" — 한국경제 본문과 글자가 같다 ✅
  - "11일 국회 예결위 전체회의" ✅
  - "12·3"은 한국경제 첫 문장의 "12·23"이 오기라는 판단이 맞다. 같은 기사 뒷부분이 "12·3"이다 ✅
  - 미군 신뢰·SCM 공방 — 파이낸셜뉴스 ✅
- :60 "자정을 넘겨 차수를 바꾼 회의에서도", "인내 지수가 참 낮다", "그 싸움은 북한하고 하는 것", "국민의 대표인 야당 의원들과 싸우는 것이 아니다" — 한국경제와 글자가 같다 ✅
  - 프리진 인용 "50만 대군을 이끄시는 분이 … 인내 지수가 참 낮으시다", "잘 싸우시는데 그 싸움은 북한에 하는 거다" — 원문과 같다(… 생략 표기 정확) ✅
  - 프리진은 "11일 열린 … 전체회의"라고 적었지만, 게시물은 차수 변경을 적은 한국경제를 따랐다. 제목에는 날짜를 넣지 않아 충돌하지 않는다 ✅
- :61 이기헌 의원 "대한민국의 군은 당나라 군대가 아니다", 이광재 위원장 "냉각기가 필요해 보인다"·정회 — 한국경제 ✅
  - 이 의원의 "내란에 동조한 분" 발언은 빠졌다. 첫 화면 주제와 거리가 있어 빼도 된다.
- :62 12일 강 장관 "저에 대해 지적한 부분은 정말 겸허히 받아들이겠다" ✅
- :51·:66~68 캡션 미수집, 영상 미확인, 다른 질의 제외를 밝혔다 ✅
- 과장·단정 여부:
  - 사실 문장은 모두 "~로 보도됨"·"전했음" 인용형이다.
  - 원문 주장 절은 첫 화면 문구 한 줄뿐이다.
  - 운영자 단정은 0 ✅

## 2. 실명 규칙 (정책 §3.1·guide §2)
- 김태규·나경원·이기헌 의원, 이광재 예결위원장(의원), 강신철 국방부 장관은 모두 선출직이거나 고위공직자로 공인이다 ✅
- 기사 기자 이름, 프리진 사진 출처 채널, 비공인 실명은 본문·영어본·트리거에 없다 ✅
- id와 이미지 폴더에는 계정 약칭 `taekyu`만 들어 있다. 태그 `김태규`는 공인 이름으로 기존 3건에서도 쓴다 ✅

## 3. 이미지 — 국회의사당 A-2 (서울연구데이터서비스 node/48322)
- **라이선스**: 원 페이지를 직접 열었다.
  - 통합코드 05T01004Dc8000, 촬영 2014/10, 촬영장소 금산빌딩 11층 옥상, 대상지 국회의사당이다.
  - 라이선스 링크는 `creativecommons.org/licenses/by/4.0/deed.ko`(버전 위계 ②)다 ✅
  - 페이지의 생성형 AI 키워드·설명은 "참고용" 표기다. 구역 문제는 건물 사진이라 해당하지 않는다.
- **원본 대조**: 저장본 SHA-256이 이미 커밋된 `2026-08-12-citynewsmeme-…`·`2026-09-29-osj17x-…` 저장본과 같다(리뷰 72에서 원본 대조를 마친 파일).
  - 900×601로 짧은 변 601 ≥ 400 ✅. Read로 열어 봤다. 사람은 점 크기뿐이고 얼굴은 0이다 ✅
- **EXIF**: 태그 0, XMP 0, IPTC 0이다. 남은 것은 인코더 주석(COM) 1개뿐이다 ✅
- **caption**: "자료사진: 국회의사당(2014) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다."
  - 기본 형식이고, 2014년은 10년 이상 전이라 끝 문구가 필요하며 있다 ✅
  - en은 133자로 160자 이내다 ✅
- **같은 원본 재사용**: 이번이 3번째로 6건 한도 안이다.
  - 피드 위치(작업 트리 211건, `publishedAt` 내림차순·같은 날 id 오름차순)는 새 글 1 · 83 · 206이다 → 간격 82로 5칸 이상 ✅
- **연작(§4.5-6 ⑤)**: 05T01004 촬영분은 이 원본 하나뿐이고, 06T003xx 묶음과 다른 촬영 시기다.
  - 가장 가까운 국회 사진은 10번째(62584, 06T05004 — 다른 연작)다 ✅
- **대상별 하한(⑥)**: 국회의사당 A-2는 이번 글을 포함해 16건, 서로 다른 원본은 7장이다(48322·62584·62226·62227·62222·62224·62223).
  - max(3, 올림(16÷3)=6) = 6 ≤ 7 ✅. 의원회관 48323 2건을 더해도 18건 대 8장으로 충족한다.
- **§4.5-3·5**:
  - 게시물의 사건 장소는 "국회 예산결산특별위원회 전체회의"다(한국경제 "국회 예결위", 프리진 "11일 국회에서"). 출처가 장소를 적었으므로 3c는 필요 없다.
  - 국회는 회의가 열린 장소이자 업무 무대이므로 §4.5-3 기본 규칙의 같은 장소다 ✅
  - 게시물은 국회를 의혹 대상으로 삼지 않는다(의원과 장관의 설전 전달). §4.5-5 결합 위험은 없다 ✅
  - 정당·인물 발언 게시물이지만 "장소가 보도된 회의 발언"이라 R1(장소 없음)과 다르다. 기획 22 좁은 안(주제 담당 기관)에 기대지 않는다.

## 4. 영어본 (`content/posts-en/2026-11-12-taekyu-defense-minister-fight-north-korea.md`)
- description 146자 ✅, imageCaption 133자 ✅, imageAlt 113자다.
- 인명 `Romanized (한글)` ✅. "reportedly"·"according to reports" 같은 유보 표현을 유지했다 ✅
- 번역 정확성: :20~:23은 한국어 본문과 뜻이 같다.
  - 단 :20 "Kang reportedly replied that it was "not for a lawmaker to say, and publicly at that," that the armed forces were a "Tang dynasty army,""는 어순이 어색하다(P3-2).
- **:3 title "…, he reportedly told Defense Minister Kang … after a clash with Rep. Na Kyung-won over a "Tang dynasty army" remark"** — 주어가 he(김 의원)라서 "김 의원이 나 의원과 설전한 뒤"로 읽힌다 → **P2-1**.
  - 보도된 설전 당사자는 나 의원과 강 장관이다. 같은 당 의원끼리 다툰 것처럼 읽히는 사실 오기다.

## 5. validate
- `npm run validate:content`: **R=0**, 실패 0, 경고 **22건**(직전과 같다)이다.
- 이 id에 대한 경고는 0이다(새 경고 0). 집계는 `public 1 · open 53 · news 33`, 211건이다.

## 6. 저장소 독립·민감정보 grep
- 게시물 ko·en, poster 트리거, 이 오더, 이 트리거에서 다음을 grep했다: 홈·임시 절대경로, 사용자 계정, 기사 기자 이름, 사진 저작자(기관 "서울특별시"만 있음), 다른 서비스명.
- 결과는 0이다. 옛 id도 0이다.

## P 목록
- **P2-1 영어 제목의 설전 당사자 오기**
  - 위치: `content/posts-en/2026-11-12-taekyu-defense-minister-fight-north-korea.md:3`
  - 현재: `… after a clash with Rep. Na Kyung-won over a \"Tang dynasty army\" remark`
  - 수정안: `… after Kang clashed with Rep. Na Kyung-won over a \"Tang dynasty army\" remark`
- **P3-1 한국어 제목의 같은 모호함**
  - 위치: `content/posts/2026-11-12-taekyu-defense-minister-fight-north-korea.md:3`
  - 현재: "…말한 것으로 보도, 나경원 의원과 '당나라 군대' 설전 뒤"는 김 의원과 나 의원의 설전으로도 읽힌다.
  - 수정안: `…말한 것으로 보도 — 강 장관이 나경원 의원과 '당나라 군대' 설전을 벌인 뒤`
- **P3-2 영어 :20 어순**
  - 수정안: `Kang reportedly replied that a lawmaker should not call the Korean armed forces a "Tang dynasty army," "and publicly at that," and asked her to withdraw the remark`
  - 필수는 아니다.
- **P3-3 제목 앞 인용 "싸움은 북한과 하십시오"는 릴스 첫 화면 문구다.** 예결위 발언 원문("그 싸움은 북한하고 하는 것")과 글자가 다르다.
  - 같은 사람의 문구라 오기는 아니다. 다만 예결위에서 그렇게 말한 것처럼 읽힐 수 있다.
  - 선택 수정안: `김태규 릴스 "싸움은 북한과 하십시오" — …`
  - 본문 :55에는 첫 화면 문구라고 이미 밝혀 두었다.
- **P3-4 (기존분·이번 대상 아님) 06T003xx 국회 연작이 정책 §4.5-6 ⑤(개정 21)에 맞지 않음**
  - 사용 11건으로 연작 상한 8건을 넘는다.
  - 피드 108·111·113이 5칸 미만으로 붙어 있다.
  - poster 트리거가 이 연작을 피한 판단은 맞다. 기존 게시물 정리는 별도 업로더 오더로 처리하기를 권한다.

## 직접 연 URL
- `https://www.hankyung.com/article/2026111232447`
- `https://www.freezinenews.com/news/articleView.html?idxno=31441`
- `https://www.fnnews.com/news/202611120748304254`
- `https://www.instagram.com/reel/Dfo2VTANC3h/embed/captioned/`(UA "Mozilla/5.0") 및 `/reel/Dfo2VTANC3h/` og 메타
- `https://data.si.re.kr/node/48322` · `/node/48323`(연작 확인)

## 최종 커밋 경로 (P2-1 처리 뒤)
- `content/posts/2026-11-12-taekyu-defense-minister-fight-north-korea.md`
- `content/posts-en/2026-11-12-taekyu-defense-minister-fight-north-korea.md`
- `public/images/2026-11-12-taekyu-defense-minister-fight-north-korea/thumb.jpg`
- `docs/triggers/poster-2026-11-12-taekyu-defense-minister-fight-north-korea-COMPLETE.md`
- `docs/triggers/reviewer-79-poster-taekyu-review-COMPLETE.md`
- `instructions/reviewer/processed/79-poster-taekyu-review.md`
- 제외:
  - `gotdemcatch`·`attendkdz` 파일과 그 poster 트리거
  - 기획 22·23 문서, tester-01 관련 파일, poster-hold 트리거 2개
  - `docs/supervisor/drafts/…`, `docs/tools/planner-07/…`, `history/*`
