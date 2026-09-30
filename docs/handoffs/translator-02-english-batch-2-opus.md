# 번역가 세션 — 02-english-batch-2-opus 핸드오프
**작성일**: 2026-09-30 20:05 | **작성 세션**: 번역가 (Opus 5)

## 요약 (3줄)
- 오더 대상 78건 전부를 목록 순서대로 `content/posts-en/{id}.md`로 번역했다. 영어본은 133건, 전체도 133건이다.
- 1차 번역 규칙 1~11과 🔴 1차 결함 체크리스트 1~10을 건마다 적용했다. 20건마다 원본과 다시 대조했다(4회, 78건 전수). 대조표의 🔧 23건은 작성 직후 점검에서 고친 16건과 20건 단위 셀프 리뷰에서 찾아 고친 7건이다.
- `validate:content`는 10건마다 실행했고 매번 R=0이었다. 최종 posts-en 경고는 0건이고 description은 78건 모두 160자 이하(최대 160)다. git add·commit·push는 하지 않았고 한국어 원본·코드는 수정하지 않았다.

## 산출물
| 경로 | 설명 |
|---|---|
| `content/posts-en/*.md` 78개 | 오더 대상 78건 영어본(대조표 id 참조) |
| `docs/tools/translator-02/check_all.py` | 78건 전수 구조 검사(존재·id·translatedAt·description ≤160·(in Korean)·/tag/·필수 필드·핸들·불릿 수) — 최종 결과 `issues: []` |
| `docs/tools/translator-02/check_desc.py` | 건별 description `len()`·불릿 수·유보 표현 확인 |
| `docs/tools/translator-02/check_hedge.py` | 원본 "보도됨/전해짐" 불릿 ↔ 영어 report 계열 대응 검사(게시자 전언 "전함"은 오탐 — 수동 확인함) |
| `docs/tools/translator-02/make_table.py` · `review-notes.tsv` · `ids.txt` | 아래 대조표 생성기·셀프리뷰 기록·오더 id 목록(오더 목록과 diff 동일 확인) |
| 본 핸드오프 · `docs/triggers/translator-02-english-batch-2-opus-COMPLETE.md` | 핸드오프·완료 트리거 |

## 주요 결정사항 (자체 판단 + 근거)
1. **유보 표현의 범위(체크 2)**: 원본이 "A했고, B한 것으로 보도됨"처럼 문장 전체를 보도로 묶은 경우, 영어도 "Reports say (that) A, and that B"나 "It was reported that …"으로 문장 전체를 묶었다. 원본이 앞 문장만 "보도됨"이고 뒷 문장은 단정(예: "~비판함", "~규정하고 있음")인 경우는 원본대로 뒷 문장을 단정으로 두었다.
2. **description**: 160자 제한 때문에 원본 description의 부가 정보(날짜, 두 번째 사실 등)를 뺀 경우는 있다. 유보 표현(reportedly·reports say·claims·presumed·alleged·suspicions)은 모두 남겼다. 원본 description이 사이트 판단으로 단정한 문장(예: "~로 확인됩니다", "~와 다름")은 영어에서도 단정으로 옮겼다.
3. **게시자/보도/사이트 구분(체크 3)**: 게시자의 말은 "It says / It relays / It claims / the poster"로 옮겼다. 보도는 "reportedly", 사이트의 확인·판단은 주어 없이 썼다. 원본 섹션이 "원문이 전한 내용 (게시자 전언)"이면 "What the original post reports (the poster's account)"로 옮겼다.
4. **취지(체크 4)**: 인용부호를 쓰지 않고 "said, in effect, that …" / "to the effect of …" / "taken to mean …" / "in substance"로 옮겼다(issue365·nowandhere-625·yoon-final·amhaengeosa-lee·cheongju·kctu-appeal·geonwoo-nsl-mexico·hagonolza-country-insult).
5. **계급·법률 용어(체크 5)**: 구속 = arrested, 구속기소 = arrested and indicted, 1심 = first-instance, 확정 = finalized, 편성 = earmarked, 의혹 = allegations/suspicions로 옮겼다. 병장은 체크리스트 계급표의 하사(= sergeant)와 겹치지 않게 **"enlisted sergeant (병장)"**으로, 일병은 Pfc., 경장은 "rank of senior officer"로 옮겼다.
6. **직함(체크 6)**: 실장은 비서실장만 chief of staff로 옮겼다(진중권 게시물의 전형수 씨). 합참 공보실장은 "director of public affairs", 청와대 제1부속실장은 "director of the First Attached Office at Cheong Wa Dae (제1부속실장)"로 옮겼다. 대한인민공화국은 체크리스트 예시대로 `'Daehan People's Republic' (대한인민공화국)`으로 옮겼다. 공식 영문명을 확인하지 못한 언론사는 `로마자 (한글)`로 적었다(아래 표).
7. **인명(체크 8)**: 한국인 인명은 본문 첫 등장 때 `Romanized (한글)`로 병기했다. 본문에 이름이 나오지 않는 2건(김계리·김소희)은 title에 병기했다. 기존 영어본에 있는 표기(Kang Shin-chul·Kim Kye-ri·Jin Sung-joon·Chung Dong-young·Kim Min-soo·Jung Jeom-sik·Park Choong-kwon·Kim Hyun-ji 등)는 그대로 썼다. 같은 글 안에서는 title·description·speakerAffiliation의 직함을 하나로 맞췄다(예: 김태규 = Rep. + "People Power Party lawmaker and chief floor spokesperson").
8. **"옮기지 않았습니다"(체크 9)**: 모두 "was/were not reproduced"로 옮겼다. `not translated`는 78건에서 0건이다.
9. **원본에 없는 것 추가 금지(체크 7)**: 배경 설명이나 완화어는 넣지 않았다. "somewhat unexpected"(혜경궁 게시물)는 경찰 입장문 "다소 의외"를 직접 인용한 것이라 유지했다. kasamo7 제목의 "allegedly"는 원본 alt에 있는 CNN 영어 원제("FBI arrests man allegedly helping …")에 맞춘 것이다.
10. **attribution**: 플랫폼명만 영어로 옮겼다. 핸들과 괄호 안 이름은 원본 값을 그대로 썼다(원본에 괄호 이름이 없으면 영어에도 넣지 않았다. 예: firstincome-seoul-edu는 "Instagram @firstincome_now"). 같은 계정의 괄호 이름이 원본마다 다른 경우(@idontknowpolitics의 "나정치몰라"/"나정치")도 원본별 값을 따랐다.
11. **내부 링크**: `/post/{id}`는 그대로 두었다. 링크 묶음 앞에 한 번만 "(some may be available only in Korean)" 또는 "(may be available only in Korean)"를 붙였다. 이번 배치 안에서 서로 참조하는 링크는 이제 영어본이 있어 자동으로 영어 페이지로 연결된다.

## 대조표 (78행 — 불릿 수는 원본/영어 실측, description은 python `len()`)
| # | id | 불릿 원본/영어 | description 글자 수 | 체크리스트 셀프리뷰 | 비고 |
|---|---|---|---|---|---|
| 1 | `2026-09-27-leejinsook-lee-parents-grave-farmland` | 4/4 | 158 | ✅ 1~10 준수 | description에 claims 유지, 2023 보도 확인 문장 유지 |
| 2 | `2026-09-27-hoon2-jeonhyunhee-land-lease` | 3/3 | 157 | ✅ 1~10 준수 | 욕설 "was not reproduced" |
| 3 | `2026-09-27-geonwoo-nsl-mexico-remark` | 6/6 | 152 | ✅ 1~10 준수 | 취지 → "reportedly taken to mean" |
| 4 | `2026-09-27-geonwoo-farmland-survey` | 8/8 | 158 | 🔧 수정 후 ✅ | 셀프리뷰: description 뒷절(284만 필지)에 유보 누락 → "reports say …" 문장 전체로 수정(체크 2) |
| 5 | `2026-09-27-geonwoo-corporate-card-whistleblower` | 7/7 | 156 | 🔧 수정 후 ✅ | 셀프리뷰: title·description에서 "의혹" 누락 → "allegations"/"alleged" 복원(체크 5) |
| 6 | `2026-09-27-ccpoutkorea-china-threat-survey` | 5/5 | 149 | ✅ 1~10 준수 |  |
| 7 | `2026-09-26-neveragain-mexico-tariff-visit` | 7/7 | 160 | ✅ 1~10 준수 | 욕설·비하 "were not reproduced" |
| 8 | `2026-09-26-issue365-lee-nsl-yusimin` | 3/3 | 159 | ✅ 1~10 준수 | 취지 → "said, in effect" |
| 9 | `2026-09-25-kimkyelee-nk-pow-ukraine` | 7/7 | 159 | ✅ 1~10 준수 | 김계리 본문 언급 없어 title에 한글 병기 |
| 10 | `2026-09-24-politicscrush-main-enemy-politicians` | 5/5 | 160 | ✅ 1~10 준수 | 발목 절단 → "feet amputated at the ankle"; 김영훈 "이에 동의한다고 했다가"의 지시 대상이 원문에서 모호해 "agreed with this"로 모호성 유지 |
| 11 | `2026-09-24-hagonolza-kimgyeri-spy-remark` | 3/3 | 158 | 🔧 수정 후 ✅ | 셀프리뷰: '평양 무인기 의혹' 사건의 "의혹" 누락 → "Pyongyang drone allegations" case(체크 5) |
| 12 | `2026-09-24-hagonolza-kctu-itaewon-claim` | 3/3 | 159 | 🔧 수정 후 ✅ | 작성 중: 기소·확정 문장 보도 범위를 문장 전체로 확장(체크 2) |
| 13 | `2026-09-23-shindawit-army-lecture-trump` | 6/6 | 153 | ✅ 1~10 준수 |  |
| 14 | `2026-09-22-taekyu-ppp-rally-report` | 4/4 | 158 | ✅ 1~10 준수 |  |
| 15 | `2026-09-22-taekyu-chief-justice-refusal` | 3/3 | 145 | ✅ 1~10 준수 | description 직함 통일(Rep. Kim Tae-gyu) |
| 16 | `2026-09-22-peoplepower7-hyegyeonggung-claim` | 4/4 | 152 | ✅ 1~10 준수 | 트위터 글 문장 "were not reproduced"; "다소 의외"는 경찰 입장문 직접 인용이라 "somewhat unexpected" 유지 |
| 17 | `2026-09-22-emong-nk-contact-law` | 5/5 | 155 | ✅ 1~10 준수 | 자체 제작 카드 alt의 "보도됨" → reportedly 유지 |
| 18 | `2026-09-22-ego-police-republic-concern` | 4/4 | 154 | 🔧 수정 후 ✅ | 작성 중: 형소법 통과 문장 보도 범위 확장(체크 2) |
| 19 | `2026-09-21-leeprenotion-assembly-holiday-bonus` | 3/3 | 160 | ✅ 1~10 준수 |  |
| 20 | `2026-09-21-kimmoonsoo-prosecution-abolition` | 5/5 | 153 | 🔧 수정 후 ✅ | description 162자 → 153자 |
| 21 | `2026-09-21-dotori-nk-medical-equipment` | 3/3 | 157 | ✅ 1~10 준수 | description에 presumed 유지; "원문 (그대로)" 인용 번역 |
| 22 | `2026-09-20-shindawit-foreign-unemployment-benefits` | 4/4 | 158 | ✅ 1~10 준수 | 중국동포 → ethnic Korean Chinese |
| 23 | `2026-09-20-nowmagazine-alpha-phone` | 5/5 | 160 | ✅ 1~10 준수 |  |
| 24 | `2026-09-20-nowandhere-mdl-mine-briefing-reel` | 6/6 | 152 | ✅ 1~10 준수 | 공보실장 → director of public affairs(chief of staff 미사용). 원문 description의 "마지막 문단은 게시자 논평"은 160자 제한으로 description에서 빠지고 본문 첫 문단에 유지 |
| 25 | `2026-09-20-kimeunhye-jeonse-reel` | 2/2 | 152 | ✅ 1~10 준수 | 해시태그 영문 번역(본문에 "hashtags also translated" 명시) |
| 26 | `2026-09-20-hanmibro-academy-merger-cards` | 3/3 | 154 | ✅ 1~10 준수 | 한국경제TV 영문명 미확인 → Hankook Kyungje TV (한국경제TV) |
| 27 | `2026-09-20-hagonolza-constitution-amendment-points` | 4/4 | 157 | ✅ 1~10 준수 | 불성립 → "declared void for lack of a quorum" |
| 28 | `2026-09-19-geonwoo-hongdae-march` | 3/3 | 159 | ✅ 1~10 준수 | 전언형 섹션 → "What the original post reports (the poster's account)" |
| 29 | `2026-09-18-shindawit-asiangames-nk-anthem` | 4/4 | 159 | ✅ 1~10 준수 |  |
| 30 | `2026-09-18-dailybite-judicial-independence` | 3/3 | 160 | 🔧 수정 후 ✅ | description 166자 → 160자 |
| 31 | `2026-09-17-idontknowpolitics-sergeant-leak-china` | 5/5 | 158 | 🔧 수정 후 ✅ | 셀프리뷰: description "upheld" → "finalized"(체크 5 확정). 병장은 체크리스트 계급표(하사=sergeant)와 겹치지 않게 "enlisted sergeant (병장)" |
| 32 | `2026-09-17-hagonolza-changwon-spy-indictment` | 4/4 | 159 | ✅ 1~10 준수 | 구속기소 → arrested and indicted; 재판 진행 중·무죄 추정 문구 유지 |
| 33 | `2026-09-16-sisabriefing-nk-budget` | 4/4 | 158 | ✅ 1~10 준수 | 편성 → earmarked (집행과 구분) |
| 34 | `2026-09-16-pickmag-china-visa-free-petition` | 3/3 | 158 | 🔧 수정 후 ✅ | 작성 중: 외국인 피의자 수 문장 보도 범위 확장(체크 2) |
| 35 | `2026-09-16-idontknowpolitics-2023-warrant-dismissed` | 3/3 | 159 | 🔧 수정 후 ✅ | 작성 중: 체포동의안 가결·영장 기각 문장 전체에 "Reports say"(체크 2) |
| 36 | `2026-09-16-hagonolza-country-insult-bill` | 5/5 | 159 | ✅ 1~10 준수 | 취지 → "writes, in effect"; 발의 사실은 원문도 단정(의안 정보)이라 그대로 |
| 37 | `2026-09-15-joojinwoo-kimseungwon-hearing` | 5/5 | 159 | 🔧 수정 후 ✅ | 작성 중: 청문회 고성·메모 촬영 문장 보도 범위 확장(체크 2); 제1부속실장 → director of the First Attached Office (제1부속실장) |
| 38 | `2026-09-15-jindam-choo-resignation-petition` | 4/4 | 157 | ✅ 1~10 준수 |  |
| 39 | `2026-09-15-choice-nk-budget-undecided` | 4/4 | 152 | ✅ 1~10 준수 | 편성 → earmarked |
| 40 | `2026-09-15-bbang630-518-armored-vehicle-claim` | 5/5 | 156 | ✅ 1~10 준수 | 일병 → Pfc.; 자체 제작 카드 캡션 "made by this site" |
| 41 | `2026-09-14-yongkeun-justice-hearing-lee-trial` | 4/4 | 151 | ✅ 1~10 준수 | 같은 질의의 다른 릴스 병합 문단 유지; 파기환송 → reverse and remand |
| 42 | `2026-09-14-kimminsoo-spy-law-enforcement` | 6/6 | 158 | ✅ 1~10 준수 | 국군정보사령부 → Defense Intelligence Command |
| 43 | `2026-09-13-sonit-625-book-ban-claim` | 6/6 | 155 | ✅ 1~10 준수 | "빨갱이" → "commie"(원문 인용 수준 유지); 진중문고 → barracks library |
| 44 | `2026-09-13-idontknowpolitics-kangdong-hospital` | 4/4 | 154 | ✅ 1~10 준수 |  |
| 45 | `2026-09-13-geonwoo-leejinsook-518-merit-disclosure` | 8/8 | 158 | ✅ 1~10 준수 |  |
| 46 | `2026-09-13-geonwoo-jinjoongkwon-2023-remark` | 2/2 | 160 | 🔧 수정 후 ✅ | 셀프리뷰: description "ex-aide" → "ex-chief of staff"(원문 비서실장, 본문과 통일, 체크 8) |
| 47 | `2026-09-13-geonwoo-gwangju-rally` | 4/4 | 159 | ✅ 1~10 준수 | 전언형 섹션 제목 사용 |
| 48 | `2026-09-13-geonwoo-brother-hospitalization-case` | 4/4 | 159 | 🔧 수정 후 ✅ | 작성 중: 기소·선고 경과 문장 전체에 "It was reported that"(체크 2); 일반인 딸 실명 미기재 유지 |
| 49 | `2026-09-13-geonwoo-518-list-disclosure-citizen` | 5/5 | 158 | ✅ 1~10 준수 | 일반인 성별 불명 → they; 자체 제작 카드 캡션 번역 |
| 50 | `2026-09-12-nowmagazine-postpartum-vs-nk-infant` | 5/5 | 159 | ✅ 1~10 준수 | 위키포스트 릴스 병합 문단 유지; 편성 → earmarked |
| 51 | `2026-09-11-currentwaves-nk-hr-report-classified` | 3/3 | 156 | ✅ 1~10 준수 |  |
| 52 | `2026-09-10-geonwoo-jeongyulseong-song-contest` | 6/6 | 156 | 🔧 수정 후 ✅ | 작성 중: 정율성·지정곡·2018 대회 문장 보도 범위 확장(체크 2), 한글 병기를 본문 첫 등장으로 이동(체크 8) |
| 53 | `2026-09-10-freedominnovation-nec-bill` | 2/2 | 160 | ✅ 1~10 준수 | 원문 섹션 "원문 이후의 경과 (중요)" → Later developments (important) |
| 54 | `2026-09-10-currentwaves-pm-amendment-slip` | 4/4 | 157 | ✅ 1~10 준수 |  |
| 55 | `2026-09-10-brieftag-nk-contact-reports-china` | 6/6 | 155 | 🔧 수정 후 ✅ | 작성 중: 신고 건수 문장 "Reports say that, according to…"로 보도 범위 확장(체크 2) |
| 56 | `2026-09-10-ansanheart-academy-merger` | 8/8 | 159 | ✅ 1~10 준수 | "4조2000억원" 추정 → "an estimate … relayed as 'there is even talk of'" |
| 57 | `2026-09-08-sonit-criminal-record-card` | 4/4 | 157 | 🔧 수정 후 ✅ | 작성 중: 전과 공개 문장 보도 범위 확장(체크 2); 대한인민공화국 → 'Daehan People's Republic' (대한인민공화국)(체크 6) |
| 58 | `2026-09-08-kimsohee-ppp-seven-pledges` | 6/6 | 156 | ✅ 1~10 준수 | 김소희 본문 언급 없어 title에 한글 병기; 암장의 시대 → "era of secret burial" |
| 59 | `2026-09-03-taekyu-statistics-audit-probe` | 4/4 | 158 | ✅ 1~10 준수 | speakerAffiliation 15번과 동일 표기 |
| 60 | `2026-08-29-idontknowpolitics-martial-law-nk-policy` | 9/9 | 159 | 🔧 수정 후 ✅ | 작성 중: 확성기·방첩사, 삼단봉, 의료장비 문장 보도 범위 확장(체크 2); description 175자 → 159자 |
| 61 | `2026-08-25-nowandhere-625-constitution-question` | 6/6 | 154 | 🔧 수정 후 ✅ | 작성 중: 개헌안 제출 문장 보도 범위 확장(체크 2); 취지 → "asked, in effect"(체크 4) |
| 62 | `2026-08-24-dictatorshipnono-jeju-missing-false-closure` | 4/4 | 159 | 🔧 수정 후 ✅ | 작성 중: 석방·영장 발부 문장 전체에 "Reports say"(체크 2); 구속 → arrested(체크 5); 실종자 실명 미기재 유지 |
| 63 | `2026-08-12-citynewsmeme-parksangyong-oath-refusal` | 7/7 | 146 | 🔧 수정 후 ✅ | 작성 중: 의혹·직무정지 연장 문장 보도 범위 확장(체크 2); "의혹" → allegations 유지 |
| 64 | `2026-08-03-pagememo-nk-prosecution-reform-directive` | 6/6 | 158 | ✅ 1~10 준수 | 형소법 통과 문장 "Reports say"; 공소장 기반 보도임을 유지 |
| 65 | `2026-07-28-geonwoo-yoon-final-statement-australia` | 4/4 | 159 | 🔧 수정 후 ✅ | 셀프리뷰: description에 원문 "의혹" 반영(envoy allegations)(체크 5); 취지 → "asked, in effect" |
| 66 | `2026-07-28-geonwoo-ebs-video-removal` | 5/5 | 153 | ✅ 1~10 준수 | 의혹 제기 → "raises suspicions" |
| 67 | `2026-07-25-idontknowpolitics-cheongju-spy-directives` | 8/8 | 157 | ✅ 1~10 준수 | 기소·특보단 이력 문장 "Reports say"(체크 2); 취지 → "to the effect of"; 공소장 릴스 병합 문단 유지 |
| 68 | `2026-07-24-korealive-woohai-moreugo` | 5/5 | 157 | ✅ 1~10 준수 | "개돼지"는 썸네일 인용 수준 그대로 "dogs and pigs"; 음원 링크 URL 원본 유지 |
| 69 | `2026-07-24-firstincome-seoul-edu-unification-textbook` | 6/6 | 156 | ✅ 1~10 준수 | 원본 attribution에 괄호 이름이 없어 "Instagram @firstincome_now"만 사용 |
| 70 | `2026-07-22-geonwoo-kimminsoo-defense` | 3/3 | 150 | ✅ 1~10 준수 | 국제뉴스·더퍼블릭 영문명 미확인 → 로마자(한글) |
| 71 | `2026-07-20-yoonsanghyun-special-counsel-filibuster` | 4/4 | 160 | ✅ 1~10 준수 |  |
| 72 | `2026-07-19-amhaengeosa-kctu-itaewon-directive` | 4/4 | 156 | 🔧 수정 후 ✅ | 작성 중: 구속기소·1심 문장 "Reports say"(체크 2); 구속기소 → arrested and indicted; 지령 인용문을 12번과 같은 번역으로 통일 |
| 73 | `2026-07-14-kasamo7-cnn-surprise-attack-article` | 5/5 | 154 | ✅ 1~10 준수 | CNN 제목은 원 기사 영어 제목(allegedly 포함)에 맞춤 — 원본 alt에 영어 원제가 있음 |
| 74 | `2026-07-13-idontknowpolitics-yeonpyeong-crab-remark` | 3/3 | 160 | ✅ 1~10 준수 | "맥락이었다고 전해짐" → "reportedly … in the context of" |
| 75 | `2026-07-12-judypia-real-estate-supervisory-bill` | 6/6 | 160 | ✅ 1~10 준수 | 조사-수사 분리 → "separating inquiries from criminal investigations" |
| 76 | `2026-07-05-idontknowpolitics-kctu-appeal` | 3/3 | 160 | ✅ 1~10 준수 | 기소·1심/항소심 문장 "Reports say"; "취지입니다" → "in substance" |
| 77 | `2026-07-04-idontknowpolitics-2018-freedom-deletion` | 6/6 | 159 | ✅ 1~10 준수 | 자유민주적 기본질서 → "free democratic basic order", '자유' → 'free' |
| 78 | `2026-07-01-amhaengeosa-lee-nk-military-remark` | 5/5 | 157 | 🔧 수정 후 ✅ | 셀프리뷰: description 인용문을 본문 인용과 같은 문구로 통일(체크 8 취지); 취지 → "said, in effect" |

## 새로 쓴 인명·기관 표기 (이번 배치에서 처음 쓴 것 — 웹 검색 금지로 언론 영문 표기 대조 불가)
| 한글 | 영문 표기 | 근거·비고 |
|---|---|---|
| 전현희 | Jeon Hyun-hee | 관용 표기로 판단 — ⚠️ 확인 필요 |
| 조명현 | Cho Myung-hyun | 성 Cho 관용(조희대=Cho와 통일) — ⚠️ 확인 필요 |
| 김혜경 | Kim Hye-kyung | 관용 |
| 송미령 | Song Mi-ryung | ⚠️ 확인 필요 |
| 유승민 · 정동영(기존) · 김영훈 | Yoo Seung-min · Chung Dong-young · Kim Young-hoon | 김영훈 ⚠️ 확인 필요 |
| 윤석열 · 박근혜 · 안철수 · 추미애 | Yoon Suk Yeol · Park Geun-hye · Ahn Cheol-soo · Choo Mi-ae | 관용 |
| 장동혁(기존) · 박성훈 · 고동진 | Jang Dong-hyuk · Park Sung-hoon · Ko Dong-jin | 고동진은 Koh로 쓰는 경우도 있어 ⚠️ 확인 필요 |
| 김준형 · 김용민 · 김영호 · 김현정 · 김동아 · 전용기 | Kim Joon-hyung · Kim Yong-min · Kim Young-ho · Kim Hyun-jung · Kim Dong-a · Jeon Yong-gi | 국어원 표기+관용 성 — ⚠️ 확인 필요 |
| 김미애 · 김은혜 · 김소희 · 김성수 · 김영환 | Kim Mi-ae · Kim Eun-hye · Kim So-hee · Kim Sung-soo · Kim Young-hwan | ⚠️ 확인 필요 |
| 윤용근 · 윤상현 · 윤재옥 · 윤민호 | Yoon Yong-geun · Yoon Sang-hyun · Yoon Jae-ok · Yoon Min-ho | 윤 = Yoon 관용 |
| 양부남 | Yang Bu-nam | 국어원 표기(Yang Boo-nam 가능성) — ⚠️ 확인 필요 |
| 한성숙 | Han Sung-sook | ⚠️ 확인 필요 |
| 진중권 | Chin Jung-kwon | 관용으로 판단 — ⚠️ 확인 필요 |
| 최재해 · 유병호 | Choe Jae-hae · Yoo Byung-ho | ⚠️ 확인 필요 |
| 이종섭 · 이화영 · 이기식 · 이상현 · 이재선 · 이주희 | Lee Jong-sup · Lee Hwa-young · Lee Ki-sik · Lee Sang-hyun · Lee Jae-sun · Lee Ju-hee | 이 = Lee 관용 |
| 박인복 · 박상용 · 배준영 · 서영교 · 신상진 | Park In-bok · Park Sang-yong · Bae Jun-young · Seo Young-kyo · Shin Sang-jin | ⚠️ 확인 필요 |
| 장도영 · 정지웅 · 정태옥 · 제윤경 · 전형수 · 유창훈 · 최영진 | Jang Do-young · Jung Ji-woong · Jeong Tae-ok · Je Yoon-kyung · Jeon Hyeong-su · Yoo Chang-hoon · Choi Young-jin | ⚠️ 확인 필요(정 = Jung/Jeong 혼재 — 기존 영어본 정점식=Jung, 이번 정태옥=Jeong. 통일 여부 슈퍼바이저 판단) |
| 정율성 | Jeong Yul-seong | 중국명 Zheng Lücheng은 넣지 않음(원본에 없음) |
| 안규백 | Ahn Gyu-back | 썸네일 자막 alt에만 등장 |
| 우하이 (가수) · 「모르고」 | Woohai · "Moreugo" | 아티스트 공식 영문명 미확인 — ⚠️ 확인 필요 |
| 뉴데일리 · 국제뉴스 · 더퍼블릭 · 통일뉴스 · 아시아경제 · 한국경제TV | NewDaily (뉴데일리) · Gukje News (국제뉴스) · The Public (더퍼블릭) · Tongil News (통일뉴스) · Asia Kyungjae (아시아경제) · Hankook Kyungje TV (한국경제TV) | 공식 영문명 미확인 → 로마자(한글) |
| 충북동지회 · 자통 | Chungbuk Comrades Association · "Independent Unification People's Vanguard" (자주통일 민중전위, Jatong) | 의미역 |
| 기관 | Defense Intelligence Command(국군정보사령부) · Center for North Korean Human Rights Records(북한인권기록센터) · Cultural Exchange Bureau(문화교류국) · Korean Sport & Olympic Committee(대한체육회) · National Office of Investigation(국가수사본부) · Patriots and Veterans Affairs agency (보훈처) | 의미역·관용 |

## 미해결·이슈 (다음 세션이 알아야 할 것)
1. **인명 로마자 표기 확인**: 위 표에서 ⚠️로 표시한 인명은 웹 검색 금지 규칙 때문에 언론 영문 표기와 대조하지 못했다. 특히 **정(Jung/Jeong) 표기가 기존 영어본과 섞여 있다**(정점식=Jung, 정지웅=Jung, 정태옥=Jeong, 정율성=Jeong). 통일할지는 슈퍼바이저가 판단해야 한다.
2. **원본 쪽 관찰(수정하지 않음)**:
   - `2026-08-25-nowandhere-625-constitution-question`: 게시일은 8월 25일인데 본문은 "KNN이 **8월 26일** 예결위 장면을 보도"라고 한다(KNN 출처 날짜 2026-08-26). 질의 날짜와 보도 날짜가 섞였을 수 있다. 영어본은 원본대로 옮겼다.
   - 같은 계정 @idontknowpolitics의 attribution 괄호 이름이 원본마다 "나정치몰라"/"나정치"로 다르다. 영어본은 원본별 값을 따랐다.
   - `2026-07-24-firstincome-seoul-edu-unification-textbook` 원본 attribution에만 "(퍼스트인컴)"이 없다(다른 원본에는 있다).
   - 한국어 원본 description의 160자 초과 경고 22건은 원본 쪽 문제라 이 오더 범위 밖이다(검증 로그 참고).
3. **병장 번역**: 체크리스트 계급표에 병장 항목이 없다. "enlisted sergeant (병장)"으로 옮겼으니 표준 표기가 필요하면 체크리스트에 추가해 주길 바란다.
4. **정정되지 않은 사실 판단 없음**: 모든 번역은 원본 범위 안에서만 했다. 사실 확인이 필요해 보였지만 번역을 보류한 문장은 없다.

## 다음 세션 가이드
- **슈퍼바이저 (Opus 5.5)**: 본 핸드오프와 78건 산출물을 직접 Read로 검증한 뒤 커밋·배포한다. 검증 도구는 `python3 docs/tools/translator-02/check_all.py`(전수 구조 검사)와 `check_hedge.py 2026-09-27-leejinsook-lee-parents-grave-farmland
2026-09-27-hoon2-jeonhyunhee-land-lease
2026-09-27-geonwoo-nsl-mexico-remark
2026-09-27-geonwoo-farmland-survey
2026-09-27-geonwoo-corporate-card-whistleblower
2026-09-27-ccpoutkorea-china-threat-survey
2026-09-26-neveragain-mexico-tariff-visit
2026-09-26-issue365-lee-nsl-yusimin
2026-09-25-kimkyelee-nk-pow-ukraine
2026-09-24-politicscrush-main-enemy-politicians
2026-09-24-hagonolza-kimgyeri-spy-remark
2026-09-24-hagonolza-kctu-itaewon-claim
2026-09-23-shindawit-army-lecture-trump
2026-09-22-taekyu-ppp-rally-report
2026-09-22-taekyu-chief-justice-refusal
2026-09-22-peoplepower7-hyegyeonggung-claim
2026-09-22-emong-nk-contact-law
2026-09-22-ego-police-republic-concern
2026-09-21-leeprenotion-assembly-holiday-bonus
2026-09-21-kimmoonsoo-prosecution-abolition
2026-09-21-dotori-nk-medical-equipment
2026-09-20-shindawit-foreign-unemployment-benefits
2026-09-20-nowmagazine-alpha-phone
2026-09-20-nowandhere-mdl-mine-briefing-reel
2026-09-20-kimeunhye-jeonse-reel
2026-09-20-hanmibro-academy-merger-cards
2026-09-20-hagonolza-constitution-amendment-points
2026-09-19-geonwoo-hongdae-march
2026-09-18-shindawit-asiangames-nk-anthem
2026-09-18-dailybite-judicial-independence
2026-09-17-idontknowpolitics-sergeant-leak-china
2026-09-17-hagonolza-changwon-spy-indictment
2026-09-16-sisabriefing-nk-budget
2026-09-16-pickmag-china-visa-free-petition
2026-09-16-idontknowpolitics-2023-warrant-dismissed
2026-09-16-hagonolza-country-insult-bill
2026-09-15-joojinwoo-kimseungwon-hearing
2026-09-15-jindam-choo-resignation-petition
2026-09-15-choice-nk-budget-undecided
2026-09-15-bbang630-518-armored-vehicle-claim
2026-09-14-yongkeun-justice-hearing-lee-trial
2026-09-14-kimminsoo-spy-law-enforcement
2026-09-13-sonit-625-book-ban-claim
2026-09-13-idontknowpolitics-kangdong-hospital
2026-09-13-geonwoo-leejinsook-518-merit-disclosure
2026-09-13-geonwoo-jinjoongkwon-2023-remark
2026-09-13-geonwoo-gwangju-rally
2026-09-13-geonwoo-brother-hospitalization-case
2026-09-13-geonwoo-518-list-disclosure-citizen
2026-09-12-nowmagazine-postpartum-vs-nk-infant
2026-09-11-currentwaves-nk-hr-report-classified
2026-09-10-geonwoo-jeongyulseong-song-contest
2026-09-10-freedominnovation-nec-bill
2026-09-10-currentwaves-pm-amendment-slip
2026-09-10-brieftag-nk-contact-reports-china
2026-09-10-ansanheart-academy-merger
2026-09-08-sonit-criminal-record-card
2026-09-08-kimsohee-ppp-seven-pledges
2026-09-03-taekyu-statistics-audit-probe
2026-08-29-idontknowpolitics-martial-law-nk-policy
2026-08-25-nowandhere-625-constitution-question
2026-08-24-dictatorshipnono-jeju-missing-false-closure
2026-08-12-citynewsmeme-parksangyong-oath-refusal
2026-08-03-pagememo-nk-prosecution-reform-directive
2026-07-28-geonwoo-yoon-final-statement-australia
2026-07-28-geonwoo-ebs-video-removal
2026-07-25-idontknowpolitics-cheongju-spy-directives
2026-07-24-korealive-woohai-moreugo
2026-07-24-firstincome-seoul-edu-unification-textbook
2026-07-22-geonwoo-kimminsoo-defense
2026-07-20-yoonsanghyun-special-counsel-filibuster
2026-07-19-amhaengeosa-kctu-itaewon-directive
2026-07-14-kasamo7-cnn-surprise-attack-article
2026-07-13-idontknowpolitics-yeonpyeong-crab-remark
2026-07-12-judypia-real-estate-supervisory-bill
2026-07-05-idontknowpolitics-kctu-appeal
2026-07-04-idontknowpolitics-2018-freedom-deletion
2026-07-01-amhaengeosa-lee-nk-military-remark`(유보 표현 대응 — 출력 7건은 모두 오탐으로 수동 확인함: 원본 "~전함"(게시자 전언 → "It relays") 5건, 원본 게시자 주장 속 "언론에 … 보도되지 않는다" 2건)다. 미해결 1(인명 표기)과 2(원본 관찰)는 필요하면 후속 조치한다.

## 최종 검증 로그 (`npm run --silent validate:content` 마지막 20줄, R=0)
```
   · description이 174자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.

🟡 2026-09-29-leejinsook-assassins-film-distortion.md
   · description이 169자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.

🟡 2026-09-29-nowandhere-defense-minister-nk-responsibility.md
   · description이 168자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.

🟡 2026-09-29-shindawit-cxmt-samsung-threat.md
   · description이 170자입니다 — 검색 결과에서 잘릴 수 있어 160자 이내를 권합니다.

── 요약 ──
검사 파일 266건(한국어 133 · 영어본 133) · 통과 266건 · 실패 0건 (오류 0개)
고유 id 133개 · 폐기 id 목록 3개
유형별: url 133
배경 보도 출처: 367건 · 발언자 표기: 50건
검사한 이미지 alt 133개
영어본 133건 / 전체 133건

✅ 검증 통과
```
(🟡 22건은 모두 한국어 원본 description 경고이며, `🟡 posts-en` 경고는 0건이다.)

## 참고 링크
- 오더: `instructions/translator/processed/02-english-batch-2-opus.md`
- 1차 오더(규칙 1~11): `instructions/translator/processed/01-english-batch-1.md`
- 스키마: `content/README.md` §5·§9
