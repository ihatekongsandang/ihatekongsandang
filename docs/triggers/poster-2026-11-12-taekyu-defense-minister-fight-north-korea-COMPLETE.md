# 🔴 COMPLETE — 게시 2026-11-12-taekyu-defense-minister-fight-north-korea
**작성일**: 2026-11-13 10:31 | **작성 세션**: 반공-업로더 (Opus 5.5) — 사용자가 이 세션에 URL을 직접 전달

## 판단: 게시
- 원문: https://www.instagram.com/reel/Dfo2VTANC3h/ (인스타그램 @taekyuster, OG 기준 2026-11-12 게시)
- 원문 수집:
  - embed/captioned를 UA "Mozilla/5.0"로 2회(/reel/·/p/) 요청했다. 둘 다 약 26만 바이트 JS 페이지가 왔고, `CaptionUsername`은 0, "may be broken"도 0이었다.
  - og:draft의 og:description에는 좋아요·댓글 수만 있다.
  - 그래서 **캡션은 수집하지 못했다.**
  - 첫 화면 이미지(embed의 EmbeddedMediaImage)는 작업 폴더 밖에서 열어 봤다. 문구는 "싸움은 북한과 하십시오"이고 국회 회의장 인물 사진이 함께 있다. 저장하지 않았다.
  - 본문 서두에 "릴스 첫 화면 기준·캡션 미수집"이라고 적었다.
- 같은 사안의 기존 게시물: 없음(`당나라`·`강신철`·`나경원` grep). 김 의원 관련 게시물 `2026-11-05-dduddd-kimtaekyu-expulsion-resolution`에는 내부 링크만 걸었다.

## 대조한 보도 (게재일 실측: article:published_time)
| 매체 | 게재 | 확인한 내용 |
|---|---|---|
| 한국경제 https://www.hankyung.com/article/2026111232447 | 2026-11-12T16:57 | 김태규 "인내 지수가 참 낮다", "그 싸움은 북한하고 하는 것", "국민의 대표인 야당 의원들과 싸우는 것이 아니다" · 나경원 "당나라 군대냐" · 강 장관 "말씀 취소해 달라" · 자정 넘겨 차수 변경 · 이기헌 반박 · 이광재 위원장 정회 · 12일 강 장관 "겸허히 받아들이겠다" |
| 프리진뉴스 https://www.freezinenews.com/news/articleView.html?idxno=31441 | 2026-11-12 10:34(페이지 표기) | 김 의원 발언 상세("50만 대군을 이끄시는 분이 … 인내 지수가 참 낮으시다", "잘 싸우시는데 그 싸움은 북한에 하는 거다") |
| 파이낸셜뉴스 https://www.fnnews.com/news/202611120748304254 | 2026-11-12T08:43 | 나경원·강신철 '미군 신뢰' 발언·SCM 연기 공방 |

- 한국경제 첫 문장의 "12·23 비상계엄"은 같은 기사 뒷부분과 다른 매체 표기("12·3")로 보아 오기로 판단했다. 게시물에는 "12·3"으로 적었다.

## 원문과 보도가 다른 점
- 첫 화면 "싸움은 북한과 하십시오"는 보도된 발언("그 싸움은 북한하고 하는 것")을 줄인 문구다. 뜻은 다르지 않다.
- 캡션·영상을 확인하지 못해 원문의 다른 주장은 다루지 않았다(요약에 넣지 않은 내용에 명시).

## 이미지 — A-2 open (서울연구데이터서비스 node/48322)
- A(공공누리 제1유형 당일 사진): 해당 일정의 공식 사진을 찾지 못했다.
- B(출처 og:image):
  - 한국경제: "예결위 나온 강신철 국방장관 / 사진 = 연합뉴스". 촬영일이 없어 불가(가이드 §4-1 "캡션·촬영 시점 정보가 없는 인물 사진 불가").
  - 파이낸셜뉴스: 강신철·나경원 두 사람의 합성 사진이라 불가.
  - 신아일보(참고 후보, 출처 미포함): 나경원 의원 12일 사진이다. 게시물 주인공이 아니다.
- A-2(국회의사당):
  - 원 페이지 curl로 다시 확인했다. 촬영 2014/10, 대상지 국회의사당, 라이선스 링크는 creativecommons.org/licenses/by/4.0/deed.ko. 이미 리뷰를 거친 저장본(osj17x)과 바이트가 같은 파일을 복사했다. 사람은 0명이다.
  - 같은 원본 사용은 이번이 **3번째**다(피드 83·206 → 새 글 1). 6건 한도 안이고 5칸 간격도 지킨다.
  - 연작: 서울시 06T003xx 촬영 묶음(62222~62227)은 이미 11건 쓰여 연작 8건 한도를 넘었으므로 피했다. 05T01004 원본은 그 묶음 밖이다.
  - 대상별 하한: 국회 A-2는 16건이고 서로 다른 원본 7장으로 max(3, 6) 이상이다. 사진을 새로 찾지는 않았다.
  - caption: 기본 형식 + 10년 이상 전 사진 문구.

## 변경 파일
- `content/posts/2026-11-12-taekyu-defense-minister-fight-north-korea.md` (신규)
- `content/posts-en/2026-11-12-taekyu-defense-minister-fight-north-korea.md` (신규)
- `public/images/2026-11-12-taekyu-defense-minister-fight-north-korea/thumb.jpg` (신규, 기존 자료사진 복사)
- 이 트리거 · `history/2026-11-13.md` 해당 항목

## 검증
- `npm run validate:content` R=0. 이 id에 대한 경고는 0이다. 영어 description이 처음에 166자로 경고가 나서 줄였다.
- 전체 경고는 22건으로 직전(업로더 32)과 같다.
- 실명: 김태규·나경원·이기헌(의원), 강신철(장관), 이광재(예결위원장)는 모두 선출직이거나 고위공직자다. id에는 계정 약칭 `taekyu`만 쓴다. 태그 `김태규`는 공인 이름으로, 기존 태그(3건)를 재사용했다.

## 리뷰 79 반영 (2026-11-13 10:35)
| 항목 | 반영 |
|---|---|
| P2-1 en 제목 설전 당사자 | `after a clash with Rep. Na…` → `after Kang clashed with Rep. Na Kyung-won…` ✅ |
| P3-1 ko 제목 | `…말한 것으로 보도, 나경원 의원과 '당나라 군대' 설전 뒤` → `…말한 것으로 보도 — 강 장관이 나경원 의원과 '당나라 군대' 설전을 벌인 뒤` ✅ |
| P3-2 en 본문 :20 어순 | 리뷰 수정안 그대로: `Kang reportedly replied that a lawmaker should not call the Korean armed forces a "Tang dynasty army," "and publicly at that," and asked her to withdraw the remark` ✅ |
| P3-3 첫 화면 문구 표시 | ko `김태규 릴스 "싸움은 북한과 하십시오" — …` · en `Kim Tae-kyu's reel: "Fight North Korea instead" — …` ✅ |
- validate: R=0. 이 id에 대한 경고는 0이고, 전체 경고는 22건으로 직전과 같다(새 경고 0).
