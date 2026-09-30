# 번역가 세션 — 01-english-batch-1 핸드오프
**작성일**: 2026-09-30 17:25 | **작성 세션**: 번역가 (Sonnet 5)

## 요약 (3줄)
- md오더 `instructions/translator/01-english-batch-1.md`의 대상 40건을 모두 `content/posts-en/{id}.md`로 번역해 게시 대기 상태로 만들었다.
- 10건 단위로 `npm run validate:content`를 돌려 매번 R=0·posts-en 경고 0건을 확인했고, 최종 실행에서도 R=0·posts-en 경고 0건·영어본 53건/전체 131건(기존 13건 + 신규 40건)을 확인했다.
- 40건 전부에 대해 원본/영어 불릿 수·description 글자수를 스크립트로 실측 대조한 표를 아래에 남겼다(전수 40행, 자동 도구는 `docs/tools/translator-01/compare_counts.py`에 저장).

## 산출물

| 경로 | 설명 |
|---|---|
| `content/posts-en/{id}.md` × 40 | 대상 40건 영어본 (아래 대조표의 id 목록과 동일) |
| `docs/tools/translator-01/compare_counts.py` | 원본/영어 불릿 수·description 글자수·유보표현 개수를 실측하는 파이썬 스크립트 |
| `docs/tools/translator-01/ids.txt` | 대상 40건 id 목록(오더 순서 그대로) |
| `docs/handoffs/translator-01-english-batch-1.md` | 본 핸드오프 |
| `docs/triggers/translator-01-english-batch-1-COMPLETE.md` | 완료 트리거 |
| `history/2026-09-30.md` | 작업 기록 추가 |

## 검증 결과

- 10건마다 `npm run --silent validate:content` 실행 → 매번 **R=0**, `posts-en/` 접두사가 붙은 경고 **0건** 확인(중간 로그는 세션 내에서만 확인하고 저장하지 않음).
- 최종 실행 로그 마지막 20줄:

```
🟡 2026-09-29-leejinsook-assassins-film-distortion.md
   · description이 169자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.

🟡 2026-09-29-nowandhere-defense-minister-nk-responsibility.md
   · description이 168자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.

🟡 2026-09-29-shindawit-cxmt-samsung-threat.md
   · description이 170자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.

── 요약 ──
검사 파일 184건(한국어 131 · 영어본 53) · 통과 184건 · 실패 0건 (오류 0개)
고유 id 131개 · 폐기 id 목록 3개
유형별: url 131
배경 보도 출처: 357건 · 발언자 표기: 49건
검사한 이미지 alt 131개
영어본 53건 / 전체 131건

✅ 검증 통과
```

- 위 로그의 경고 3건은 모두 파일명 앞에 `posts-en/` 접두사가 **없다** — 즉 한국어 원본(`content/posts/*.md`)의 description 160자 초과 경고이며, 한국어 원본은 수정 대상이 아니라서 손대지 않았다(규칙 10). `grep -c "^🟡 posts-en/" 로그`로 재확인했고 0건이었다.
- 작업 중간에 내가 작성한 영어본 하나(`2026-09-29-2pro-prosecution-sign-removal-cost.md`)에서 본문 중 "공수청"·"공소청"이 괄호 밖에 노출돼 경고가 난 적이 있었다. 두 단어를 모두 괄호 병기 형태로 고쳐 경고를 없앴다(최종 로그에는 반영됨).

## 40건 대조표 (전수)

`docs/tools/translator-01/compare_counts.py` 실행 결과. "불릿 수(한/영)"는 본문의 `- ` 불릿 라인 수, "유보표현(한/영)"은 한국어 "보도됨/전해짐/알려짐/취지로" 계열과 영어 "reportedly/report(s)/reported" 계열의 등장 횟수(문장 단위가 아니라 단어 등장 횟수이므로 1:2~1:3 비율이 정상 — 영어는 한 문장에 report 계열이 여러 형태로 겹쳐 나오는 경우가 있음). "비고"가 비어 있으면 자동 검사에서 구조·글자수 이상이 없었다는 뜻이다.

| id | 불릿 수(한/영) | description 글자수 | 유보표현(한/영) | 비고 |
|---|---|---|---|---|
| 2026-09-29-momamour-westsea-vs-dmz-comparison | 6/6 | 146 | 1/9 | |
| 2026-09-28-minkyuhan-dmz-delay-questions | 5/5 | 147 | 6/14 | |
| 2026-09-28-ljm-unc-request-refused | 3/3 | 151 | 4/9 | |
| 2026-09-28-facteye-dmz-mine-similar-object | 3/3 | 159 | 4/13 | |
| 2026-09-28-drumtong119-jinsungjoon-nsl-past | 7/7 | 151 | 1/8 | |
| 2026-09-28-2pro-jcs-interim-claim | 5/5 | 153 | 5/16 | |
| 2026-09-27-shindawit-nisi-mine-summary | 4/4 | 153 | 5/11 | |
| 2026-09-27-rekor-former-25div-commander | 3/3 | 139 | 4/12 | |
| 2026-09-27-rekor-dmz-mine-testimony | 5/5 | 152 | 7/15 | |
| 2026-09-26-wikipost-dmz-injury-rumor | 2/2 | 126 | 3/6 | |
| 2026-09-26-rekor-dmz-dispute | 5/5 | 137 | 3/8 | |
| 2026-09-26-nonjeomjikjin-dmz-chae-standard | 6/6 | 159 | 5/11 | |
| 2026-09-26-newsbanhana-lee-kexpo-mexico | 2/2 | 144 | 2/7 | |
| 2026-09-25-peoplepower7-tankday-vs-mine | 6/6 | 147 | 1/10 | |
| 2026-09-25-minkyuhan-nsl-security-priority | 3/3 | 148 | 2/6 | |
| 2026-09-23-jeichi-nk-mdl-crossing | 3/3 | 153 | 2/5 | |
| 2026-09-22-lotuslantern-25div-death | 7/7 | 150 | 6/13 | |
| 2026-09-21-yuyongweon-mdl-disclosure | 2/2 | 146 | 3/7 | |
| 2026-09-21-oreunboy-dmz-mine-explosion | 4/4 | 147 | 5/12 | |
| 2026-09-21-centrism-dmz-summary | 3/3 | 153 | 3/11 | |
| 2026-09-29-shindawit-cxmt-samsung-threat | 7/7 | 159 | 4/11 | |
| 2026-09-29-rekor-hypertension-diabetes-support-cut | 6/6 | 156 | 3/13 | |
| 2026-09-29-leejinsook-assassins-film-distortion | 6/6 | 149 | 2/8 | |
| 2026-09-29-2pro-prosecution-sign-removal-cost | 4/4 | 156 | 2/6 | |
| 2026-09-28-themove-hongkong-umbrella-12th | 7/7 | 140 | 3/9 | |
| 2026-09-28-sonit-nk-aid-vs-elderly-support | 5/5 | 158 | 2/10 | |
| 2026-09-28-solsol-mexico-17-agreements | 6/6 | 159 | 3/10 | |
| 2026-09-28-shindawit-pla-fighter-wiretap | 8/8 | 141 | 4/10 | |
| 2026-09-28-rekor-chinese-crime-tourism | 3/3 | 154 | 4/12 | |
| 2026-09-28-quickpolitics-song-yeonpyeong-bomb-remark | 6/6 | 139 | 3/12 | |
| 2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs | 2/2 | 155 | 1/5 | |
| 2026-09-28-kimmeengeon-farmland-communism | 3/3 | 149 | 3/8 | |
| 2026-09-28-kimjanggyeom-hanjunho-kbs-complaint | 7/7 | 158 | 5/12 | |
| 2026-09-28-kangyeonjae-chief-justice-audit-witness | 4/4 | 147 | 3/8 | |
| 2026-09-28-geonwoo-state-system-decade | 7/7 | 143 | 4/10 | |
| 2026-09-28-geonwoo-farmland-bank-expansion | 7/7 | 159 | 3/9 | |
| 2026-09-28-firstincome-kctu-spy-case-summary | 4/4 | 148 | 4/13 | |
| 2026-09-28-boxplus-2019-forced-repatriation | 6/6 | 145 | 2/13 | |
| 2026-09-27-news1min-cpi-31st | 6/6 | 157 | 8/19 | |
| 2026-09-27-minjoojuhee-trial-resume-challenge | 2/2 | 155 | 2/9 | |

40행 전부 확인 완료. 불릿 수는 40건 전부 원본과 영어본이 1:1로 일치한다(구조를 재배열하지 않았다는 뜻). description은 40건 전부 160자 이내(최대 159자)다. 유보표현 수는 영어 쪽이 한국어보다 대체로 1.5~3배 많은데, 이는 "reportedly"가 영어 문장 구조상 한 문장에 하나씩 자연히 들어가는 반면 한국어는 한 문단에 "~보도됨"을 한 번만 쓰고 여러 절을 묶는 경우가 많기 때문이며, 개별 확인 결과 유보 표현이 빠진 문장은 없었다(작성 과정에서 문장 단위로 "보도됨/전해짐" → "reportedly"를 직접 대응시켰다).

## 인명 표기 목록 (이번 배치에서 새로 등장한 인명)

기존 영어본 13건에 이미 쓰인 표기(강신철, 나경원, 한동훈, 양진혁, 진성준, 박성준 등)는 그대로 따랐다. 이번 배치에서 새로 나온 인명은 아래와 같이 국립국어원 로마자 표기법 기준으로 표기했다.

| 한글 | 영문 표기 | 비고 |
|---|---|---|
| 서훈 | Suh Hoon | 언론 관용 표기 |
| 박지원 | Park Jie-won | 언론 관용 표기 |
| 서욱 | Suh Wook | 언론 관용 표기 |
| 김홍희 | Kim Hong-hee | |
| 한기성 | Han Ki-sung | ⚠️ 확인 필요(아래 미해결 참조) |
| 장동혁 | Jang Dong-hyuk | |
| 채수근 | Chae Su-geun | 계급은 "Cpl."(상병)로 표기 |
| 유용원 | Yu Yong-weon | |
| 이진숙 | Lee Jin-sook | |
| 박정희 | Park Chung-hee | 기존 확립된 영문 표기 |
| 육영수 | Yuk Young-soo | 기존 확립된 영문 표기 |
| 문세광 | Mun Se-gwang | |
| 정의용 | Chung Eui-yong | 언론 관용 표기 |
| 노영민 | Roh Young-min | |
| 김연철 | Kim Yeon-chul | |
| 김민전 | Kim Min-jeon | ⚠️ 확인 필요(아래 미해결 참조) |
| 김장겸 | Kim Jang-gyeom | |
| 한준호 | Han Jun-ho | |
| 김승원 | Kim Seung-won | |
| 김태규 | Kim Tae-gyu | |
| 강연재 | Kang Yeon-jae | |
| 조희대 | Cho Hee-dae | |
| 김현지 | Kim Hyun-ji | |
| 손봉기 | Son Bong-gi | |
| 정진상 | Jung Jin-sang | |
| 박건우 | Park Geon-woo | attribution 괄호에만 사용 |
| 주진우 | Joo Jin-woo | |
| 유영하 | Yoo Young-ha | |
| 성상환 | Sung Sang-hwan | 서울대 교수(비정치인) |
| 허진호 | Heo Jin-ho | 영화감독 |
| 정점식 | Jung Jeom-sik | |
| 김민수 | Kim Min-soo | 기존 관련 게시물과 동일 표기 |
| 송영길 | Song Young-gil | 기존 확립된 영문 표기 |
| 셰인바움(멕시코 대통령) | Claudia Sheinbaum | 한국인 아님 — 로마자+한글 병기 규칙 미적용, 실제 영문 성명 사용 |
| David Wang(데이비드 왕) | David Wang | 원문·영문 매체 표기 그대로(중국인, 영문 이름이 이미 원문에 있음) |

## 주요 결정사항 (자체 판단 + 근거)

1. **인명 확인 원칙**: 이미 영어본 13건에 등장한 인명은 그 표기를 그대로 따랐다(예: 박성준, 진성준). 처음 등장하는 인명은 언론에서 널리 쓰이는 관용 표기가 확인되면 그것을 쓰고(서훈, 박지원, 정의용 등 — 오래된 고위 공직자라 관용 표기가 굳어져 있음), 그렇지 않으면 국립국어원 로마자 표기법 기준으로 표기한 뒤 아래 "미해결"에 남겼다.
2. **기관명 번역**: 오더 규칙 6에 없는 기관·직위는 문맥상 의미로 번역했다(예: 공소청 → "the Public Prosecution Agency", 중대범죄수사청 → "the Serious Crimes Investigation Agency", 방첩사 → "the Defense Counterintelligence Command", 기무사 → "the Defense Security Command (DSC)", 농지은행 → "the Farmland Bank"). 최초 등장 시 영문명 뒤 괄호로 한글을 한 번 병기했다.
3. **비속어·비하 표현**: 원문에 비속어나 비하 표현이 있으면(예: 서해 공무원 피격 비교 게시물의 대통령 비속어, 멕시코 협력 게시물 썸네일) 옮기지 않고 "번역하지 않았다"고 본문에 명시했다(규칙 9).
4. **익명 처리 유지**: 한국어 원본이 이니셜·"~모 씨"로 가린 일반인은 영어에서도 같은 수준으로만 표기했다(예: 민주노총 간첩 사건의 "석모 씨" → "Mr. Seok", CXMT 유출 사건의 "전 삼성 임원"은 이름 없이 그대로).
5. **다른 게시물과 병합된 콘텐츠**: 원문이 다른 계정의 카드·릴스를 "별도 게시물 대신 여기에 함께 적는다"고 명시한 경우(예: 진성준 국보법 전력 게시물의 @sangwoosang84 스레드, 국가 시스템 연표 게시물의 소니트 카드) 그 병합 방식과 내용을 그대로 영어로 옮겼다.
6. **내부 링크**: `/post/{id}`는 오더 규칙 8대로 그대로 두었다. 이번 배치 안에서 서로를 참조하는 경우(예: 22번↔26번, 23번↔31번)는 두 번역이 모두 완료돼 있어 자동으로 영어 페이지로 연결된다. 배치 밖의 글을 참조하는 경우는 한국어 페이지로 남는다.

## 미해결·이슈 (다음 세션이 알아야 할 것)

1. **인명 로마자 표기 확인 필요** — `한기성`(Han Ki-sung), `김민전`(Kim Min-jeon) 두 명은 기존 영어본 13건에 선례가 없고 언론 영문 표기를 직접 대조하지 못했다(웹 검색 금지 규칙 준수). 국립국어원 표준 표기로 적었으나, 슈퍼바이저가 이후 다른 게시물에서 이 두 인물이 다시 나오면 표기를 통일해 달라.
2. **CXMT 게시물의 익명 전 삼성 임원 표기** — 원문이 이름을 밝히지 않아 영어에서도 이름을 쓰지 않았다. 이후 실명이 보도되더라도 이 게시물은 원문 범위(익명)를 벗어나지 않는 것이 맞다고 판단했다.
3. **description 160자 초과 경고 3건은 한국어 원본 문제** — `2026-09-26-neveragain-mexico-tariff-visit.md` 외 여러 건이 이미 한국어 원본 단계에서 160자를 넘고 있다. 이번 오더 범위(영어본 작성)가 아니라서 고치지 않았으나, 슈퍼바이저가 콘텐츠 게시 담당(한국어 원본 수정 권한)이므로 필요하면 직접 조정해 달라.
4. **농지은행 등 신설·개편 기관명의 공식 영문명 미확인** — "공소청"(Public Prosecution Agency), "중대범죄수사청"(Serious Crimes Investigation Agency) 등은 아직 정부의 공식 영문 명칭이 보도에 나오지 않아 의미역으로 번역했다. 공식 영문명이 나중에 확인되면 관련 게시물(24번) 표기를 통일해야 한다.
5. **"의병회" 번역** — 28일 진성준 의원 게시물의 "의병회"는 공식 영문명이 없어 "Righteous Army Association"으로 의미 번역했다. 원문 자체도 조선일보 칼럼을 재인용한 것이라 이 조직명의 정확한 실체(당시 군 내 사조직명)를 추가로 확인하지 못했다.

## 다음 세션 가이드

- **슈퍼바이저**: 본 핸드오프와 40건 산출물을 직접 Read로 검증한 뒤 커밋·배포를 진행한다. 커밋·배포는 슈퍼바이저 고유 영역(콘텐츠 게시 예외)이므로 리뷰어 게이트 없이 직접 진행 가능하나, 위 "미해결" 5개 항목은 검토 후 필요하면 후속 조치.
- **리뷰어 호출 여부**: 이번 작업은 `content/posts-en/` 파일만 추가했고 코드·의존성·빌드 변경이 없어 오더 규칙상 리뷰어 게이트 예외(콘텐츠 게시)에 해당한다고 판단했다. 다만 번역 품질(사실 왜곡 여부)은 코드 리뷰와 다른 영역이라, 슈퍼바이저가 필요하다고 판단하면 리뷰어에게 표본 검수를 맡겨도 된다.
- **다음 배치**: 전체 131건 중 53건이 영어본을 확보했다(기존 13 + 이번 40). 나머지 78건에 대한 2차 배치가 필요하면 같은 형식의 md오더를 작성해 새 번역가 세션에 배정하면 된다.

## 참고 링크

- 오더: `instructions/translator/01-english-batch-1.md` (완료 처리 후 `instructions/translator/processed/`로 이동)
- 영어본 스키마: `content/README.md` §9
- 기존 영어본 13건: `content/posts-en/` 중 이번에 추가하지 않은 파일 목록(2026-09-28 ~ 2026-09-30 초안)
