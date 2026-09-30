# 번역가 md오더 01 — 영어본 1차 배치 40건

**작성**: 2026-09-30 | **작성 세션**: 슈퍼바이저 (Opus 5.5) | **담당**: 번역가 (Sonnet 5) — 새 세션

## 목표
한국어 게시물 40건(아래 목록)의 영어본을 `content/posts-en/{id}.md`로 작성한다. 목록 순서대로 진행한다(DMZ 사안 20건 → 최신 게시물 20건).

## 선행 문서 (작업 전 필수 Read)
1. `CLAUDE.md` — 특히 대전제·편집 정책(§5대 축 6)·저장소 독립 원칙
2. `content/README.md` §5(제목·요약 규칙)·§9(영어본 스키마) — **§9가 이 작업의 규격 전부**
3. 기존 영어본 13건 전부(`content/posts-en/*.md`) — 문체·용어·구성의 기준 샘플. 특히
   `2026-09-30-2pro-unc-armistice-violation.md`, `2026-09-29-rightmeet-mine-word-press-guideline.md`, `2026-09-28-pagememo-jcs-interim-result.md`

## 번역 규칙 (위반 시 반려)
1. **원본 범위 안에서만 번역.** 원본에 없는 정보·단정·해석·배경 설명을 더하지 않는다. 원본의 유보 표현("~로 보도됨", "확인되지 않았다")은 **반드시** 살린다 → "reportedly", "reports do not confirm", "could not be verified".
   원본이 "보도됨"으로 쓴 문장을 영어에서 단정문으로 바꾸면 결함이다.
2. **웹 검색·외부 번역 API·브라우저 번역 사용 금지.** 직접 번역만 한다. 사실 확인이 필요해 보이는 곳이 있으면 번역하지 말고 핸드오프 "미해결"에 적는다.
3. **frontmatter는 §9 필드만**: `id`·`title`·`description`·`imageAlt`·`imageCaption`·(원본에 speaker.affiliation 있으면) `speakerAffiliation`·`attribution`·`translatedAt: 2026-09-30`. 날짜·원문 링크·sources·tags·image 경로 등은 쓰지 않는다.
   - 따옴표가 들어간 값은 `"..."`로 감싸고 내부 `"`는 `\"`로 이스케이프.
4. **description ≤ 160자 (영문 글자 수).** 작성 직후 직접 세어 확인한다. 검증 경고 0이 목표.
5. **attribution**: 플랫폼명만 번역(인스타그램→Instagram, 스레드→Threads, 유튜브→YouTube, 페이스북→Facebook, X는 그대로). 핸들·괄호 안 원문 이름은 원본 그대로. 원본 attribution이 언론사명 등 플랫폼 형식이 아니면 필드를 쓰지 않는다.
6. **인명**: 로마자 + 괄호 한글 병기, 한 글에서 첫 등장 때만. 예 `Jin Sung-joon (진성준)`. 대통령은 `President Lee Jae-myung`. 기존 영어본 13건의 표기와 반드시 일치시킨다(강신철 → Kang Shin-chul, 나경원 → Na Kyung-won, 한동훈 → Han Dong-hoon, 양진혁 → Yang Jin-hyeok 등). 표기가 불확실하면 국립국어원 로마자 표기법(성은 Kim·Lee·Park·Choi·Jung 같은 관용 표기)으로 쓰고 핸드오프에 목록으로 남긴다. 기관: 합참 → the Joint Chiefs of Staff (JCS), 유엔사 → the UN Command (UNC), 국방위 → the National Assembly Defense Committee, 국민의힘 → the People Power Party, 민주당 → the Democratic Party, 국정원 → the National Intelligence Service (NIS), 선관위 → the National Election Commission.
7. **본문 섹션 제목** (원본 섹션에 대응):
   - 원문 주장 / 원문 주장 (게시자 의견) / 원문이 전한 내용 → `## What the original post claims (the poster's opinion)` (전언형이면 `## What the original post reports (the poster's account)`)
   - 보도로 확인된 내용 → `## What reports confirm`
   - 요약에 넣지 않은 내용 → `## What we left out of the summary`
   - 이후 경과·추가 → `## Later developments`
   - 정정 박스(> 🔁 정정)는 `> 🔁 **Correction (YYYY-MM-DD)**: ...`로 그대로 옮긴다.
   - 그 밖의 섹션은 의미대로 번역.
8. **내부 링크**: `/post/{id}` 경로는 그대로 둔다(자동 변환됨). 링크 뒤에 "(in Korean)"을 붙이지 않는다. 링크 묶음 앞에 한 번만 `(some may be available only in Korean)`. `/tag/…` 링크는 영어본에서 문장째 빼지 말고 링크만 풀어 일반 텍스트로. 외부 링크 URL은 그대로.
9. **민감 규칙**: 원본이 가린 것(일반인 실명·미성년자·욕설·후원 계좌·이메일)을 절대 되살리지 않는다. 원본이 인용한 비속어·혐오 표현은 원본이 인용한 수준 이상으로 옮기지 않는다.
10. 한국어 원본(`content/posts/`)·이미지·코드는 **수정 금지.** 원본에서 오타·사실 오류를 발견하면 고치지 말고 핸드오프에 적는다.
11. **git add·commit·push 금지.** 커밋·배포는 슈퍼바이저가 전수 검토 후 한다.

## 검증 (필수)
- 10건마다 `npm run --silent validate:content > /tmp/v.log 2>&1; echo R=$?` 실행 → **R=0**, `🟡 posts-en` 경고 0건을 확인하고 다음으로.
- 마지막에 한 번 더 실행해 요약 줄 `영어본 53건 / 전체 131건`(게시물이 늘었으면 그 수) 확인. 결과 로그 마지막 20줄을 핸드오프에 붙인다.
- 자체 점검: 40건 각각에 대해 원본 문장 수와 영어 문장(불릿) 수가 대응하는지, "reportedly" 등 유보 표현이 빠진 곳이 없는지 대조한 표를 핸드오프에 남긴다(건별 1행: id · 불릿 수 원본/영어 · description 글자 수 · 비고). **40행 전부.**

## 대상 40건 (이 순서대로)
 1. 2026-09-29-momamour-westsea-vs-dmz-comparison
 2. 2026-09-28-minkyuhan-dmz-delay-questions
 3. 2026-09-28-ljm-unc-request-refused
 4. 2026-09-28-facteye-dmz-mine-similar-object
 5. 2026-09-28-drumtong119-jinsungjoon-nsl-past
 6. 2026-09-28-2pro-jcs-interim-claim
 7. 2026-09-27-shindawit-nisi-mine-summary
 8. 2026-09-27-rekor-former-25div-commander
 9. 2026-09-27-rekor-dmz-mine-testimony
10. 2026-09-26-wikipost-dmz-injury-rumor
11. 2026-09-26-rekor-dmz-dispute
12. 2026-09-26-nonjeomjikjin-dmz-chae-standard
13. 2026-09-26-newsbanhana-lee-kexpo-mexico
14. 2026-09-25-peoplepower7-tankday-vs-mine
15. 2026-09-25-minkyuhan-nsl-security-priority
16. 2026-09-23-jeichi-nk-mdl-crossing
17. 2026-09-22-lotuslantern-25div-death
18. 2026-09-21-yuyongweon-mdl-disclosure
19. 2026-09-21-oreunboy-dmz-mine-explosion
20. 2026-09-21-centrism-dmz-summary
21. 2026-09-29-shindawit-cxmt-samsung-threat
22. 2026-09-29-rekor-hypertension-diabetes-support-cut
23. 2026-09-29-leejinsook-assassins-film-distortion
24. 2026-09-29-2pro-prosecution-sign-removal-cost
25. 2026-09-28-themove-hongkong-umbrella-12th
26. 2026-09-28-sonit-nk-aid-vs-elderly-support
27. 2026-09-28-solsol-mexico-17-agreements
28. 2026-09-28-shindawit-pla-fighter-wiretap
29. 2026-09-28-rekor-chinese-crime-tourism
30. 2026-09-28-quickpolitics-song-yeonpyeong-bomb-remark
31. 2026-09-28-peoplepower7-yuk-youngsoo-east-german-docs
32. 2026-09-28-kimmeengeon-farmland-communism
33. 2026-09-28-kimjanggyeom-hanjunho-kbs-complaint
34. 2026-09-28-kangyeonjae-chief-justice-audit-witness
35. 2026-09-28-geonwoo-state-system-decade
36. 2026-09-28-geonwoo-farmland-bank-expansion
37. 2026-09-28-firstincome-kctu-spy-case-summary
38. 2026-09-28-boxplus-2019-forced-repatriation
39. 2026-09-27-news1min-cpi-31st
40. 2026-09-27-minjoojuhee-trial-resume-challenge

## 완료 산출물
- `content/posts-en/{id}.md` 40개
- 핸드오프 `docs/handoffs/translator-01-english-batch-1.md` (CLAUDE.md 표준 템플릿 + 위 대조표 40행 + 인명 표기 목록 + 미해결)
- 🔴 트리거 `docs/triggers/translator-01-english-batch-1-COMPLETE.md` **생성 필수** (없으면 미완료로 간주)
- 본 오더를 `instructions/translator/processed/`로 이동
- `history/2026-09-30.md`에 `## [HH:MM] 번역가 01 …` 기록 추가
