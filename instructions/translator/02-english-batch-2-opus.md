# 번역가 md오더 02 — 영어본 2차 배치 78건 (남은 전량)

**작성**: 2026-09-30 | **작성 세션**: 슈퍼바이저 (Opus 5.5) | **담당**: 번역가 (Opus 5) — 새 세션
**배경**: 1차 배치(Sonnet 5, 40건)는 원본 대조 검토에서 약 25개 파일에 🔴 결함이 나와 전부 재수정했다. 2차부터 Opus 5로 진행한다. 아래 "🔴 1차 결함 체크리스트"를 건마다 적용한다.

## 선행 문서 (작업 전 필수 Read)
1. `CLAUDE.md` — 대전제·편집 정책·저장소 독립 원칙
2. `content/README.md` §5·§9 (§9가 규격 전부)
3. `instructions/translator/processed/01-english-batch-1.md` — 번역 규칙 1~11 (**이 오더에도 그대로 적용**)
4. 수정 완료된 기존 영어본 중 샘플: `content/posts-en/2026-09-30-2pro-unc-armistice-violation.md`, `2026-09-28-drumtong119-jinsungjoon-nsl-past.md`, `2026-09-28-boxplus-2019-forced-repatriation.md`, `2026-09-28-kangyeonjae-chief-justice-audit-witness.md`, `2026-09-26-nonjeomjikjin-dmz-chae-standard.md`
5. 인명 표기 확인용: `grep -rhoE "[A-Z][a-z]+ [A-Z][a-z]+-[a-z]+ \([가-힣]+\)" content/posts-en | sort -u` — 이미 쓰인 표기가 있으면 반드시 그대로 쓴다.

## 🔴 1차 결함 체크리스트 (건마다 전부 확인 — 하나라도 어기면 반려)
1. **유보 표현을 description·title·imageAlt까지 유지**: 원본 description의 "~로 보도됐습니다"·"추정"·"주장"은 영어 description에도 `reportedly`·`presumed`·`claims`로 남긴다. 1차에서 가장 많이 틀린 곳이 **description**이다. 글자 수 줄이려고 유보를 빼지 않는다 — 대신 다른 수식어를 뺀다.
2. **"~한 것으로 보도됨"이 문장 전체에 걸리면 영어도 문장 전체에 건다.** 문장을 둘로 나눌 때 뒷문장에서 출처 표시("According to the column", "reportedly")가 떨어지지 않게 한다.
3. **게시자 주장 vs 보도 vs 사이트 판단을 섞지 않는다.** 게시자가 한 말을 `reportedly`로 쓰지 않는다(보도가 한 말처럼 됨). 보도로 확인한 사실을 게시자가 말한 것처럼 description에 넣지 않는다. 게시자의 가정·경고("~라면 심각")를 주어 없이 쓰면 사이트 판단처럼 읽힌다 → `the poster says …`.
4. **"~는 취지로"는 직접 인용부호로 옮기지 않는다** → `said, in effect, that …` / `testified to the effect that …`.
5. **부상·법률·계급 용어 정확히**: 발목 절단 = `foot amputated at the ankle` / 중사 = `staff sergeant`, 상사 = `sergeant first class`, 하사 = `sergeant` / 선고유예 = `deferred sentencing (선고유예)`, 집행유예 = `suspended sentence`, 구속 = `arrested`(구속기소 `arrested and indicted`), 1심 = `first-instance trial`, 확정 = `finalized` / 편성 ≠ 지출 (`earmarked` vs `spent`) / "의혹" = `suspicions of`·`allegations of` (빼지 않는다).
6. **고유명사·직함 오역 금지**: 모르는 국호·단체명을 아는 것으로 바꾸지 않는다(예: 대한인민공화국 ≠ DPRK → `'Daehan People's Republic' (대한인민공화국)`). "실장"을 chief of staff로 쓰지 않는다(비서실장만 chief of staff). 확인 못 한 언론사 영문명은 `로마자 (한글)`.
7. **원본에 없는 것 추가 금지**: 기지 이름·배경 설명·"somewhat" 같은 완화어·"echoing" 같은 연결어를 넣지 않는다. 잘린 자막·제목은 잘린 채로(`…`) 옮긴다.
8. **인명**: 한국인은 첫 등장 때 `Romanized (한글)` (대통령 Lee Jae-myung만 병기 생략). 국방장관 = `Kang Shin-chul (강신철)`. 같은 글 안에서 표기·직함을 하나로 통일(title·description·body 모두).
9. **"옮기지 않았습니다" = `was not reproduced`** (not translated ✗).
10. **description ≤160자**: python으로 센다(`len()`), 눈대중 금지.

## 절차
- 목록 순서대로 번역. **10건마다** `npm run --silent validate:content > /tmp/v.log 2>&1; echo R=$?` → R=0, `🟡 posts-en` 경고 0 확인.
- **20건마다** 셀프 리뷰: 방금 20건을 원본과 다시 한 줄씩 대조해 체크리스트 1~10 위반을 찾아 고친다. 결과를 핸드오프 대조표에 기록.
- 긴 작업이다. **20건마다 핸드오프 파일에 진행 상황(완료 id 목록)을 저장**해 컨텍스트가 압축돼도 이어서 할 수 있게 한다.
- git add·commit·push 금지. 한국어 원본·이미지·코드 수정 금지(원본 오류 발견 시 핸드오프에 기록).
- 웹 검색·번역기 사용 금지.

## 대상 78건 (이 순서대로)
 1. 2026-09-27-leejinsook-lee-parents-grave-farmland
 2. 2026-09-27-hoon2-jeonhyunhee-land-lease
 3. 2026-09-27-geonwoo-nsl-mexico-remark
 4. 2026-09-27-geonwoo-farmland-survey
 5. 2026-09-27-geonwoo-corporate-card-whistleblower
 6. 2026-09-27-ccpoutkorea-china-threat-survey
 7. 2026-09-26-neveragain-mexico-tariff-visit
 8. 2026-09-26-issue365-lee-nsl-yusimin
 9. 2026-09-25-kimkyelee-nk-pow-ukraine
10. 2026-09-24-politicscrush-main-enemy-politicians
11. 2026-09-24-hagonolza-kimgyeri-spy-remark
12. 2026-09-24-hagonolza-kctu-itaewon-claim
13. 2026-09-23-shindawit-army-lecture-trump
14. 2026-09-22-taekyu-ppp-rally-report
15. 2026-09-22-taekyu-chief-justice-refusal
16. 2026-09-22-peoplepower7-hyegyeonggung-claim
17. 2026-09-22-emong-nk-contact-law
18. 2026-09-22-ego-police-republic-concern
19. 2026-09-21-leeprenotion-assembly-holiday-bonus
20. 2026-09-21-kimmoonsoo-prosecution-abolition
21. 2026-09-21-dotori-nk-medical-equipment
22. 2026-09-20-shindawit-foreign-unemployment-benefits
23. 2026-09-20-nowmagazine-alpha-phone
24. 2026-09-20-nowandhere-mdl-mine-briefing-reel
25. 2026-09-20-kimeunhye-jeonse-reel
26. 2026-09-20-hanmibro-academy-merger-cards
27. 2026-09-20-hagonolza-constitution-amendment-points
28. 2026-09-19-geonwoo-hongdae-march
29. 2026-09-18-shindawit-asiangames-nk-anthem
30. 2026-09-18-dailybite-judicial-independence
31. 2026-09-17-idontknowpolitics-sergeant-leak-china
32. 2026-09-17-hagonolza-changwon-spy-indictment
33. 2026-09-16-sisabriefing-nk-budget
34. 2026-09-16-pickmag-china-visa-free-petition
35. 2026-09-16-idontknowpolitics-2023-warrant-dismissed
36. 2026-09-16-hagonolza-country-insult-bill
37. 2026-09-15-joojinwoo-kimseungwon-hearing
38. 2026-09-15-jindam-choo-resignation-petition
39. 2026-09-15-choice-nk-budget-undecided
40. 2026-09-15-bbang630-518-armored-vehicle-claim
41. 2026-09-14-yongkeun-justice-hearing-lee-trial
42. 2026-09-14-kimminsoo-spy-law-enforcement
43. 2026-09-13-sonit-625-book-ban-claim
44. 2026-09-13-idontknowpolitics-kangdong-hospital
45. 2026-09-13-geonwoo-leejinsook-518-merit-disclosure
46. 2026-09-13-geonwoo-jinjoongkwon-2023-remark
47. 2026-09-13-geonwoo-gwangju-rally
48. 2026-09-13-geonwoo-brother-hospitalization-case
49. 2026-09-13-geonwoo-518-list-disclosure-citizen
50. 2026-09-12-nowmagazine-postpartum-vs-nk-infant
51. 2026-09-11-currentwaves-nk-hr-report-classified
52. 2026-09-10-geonwoo-jeongyulseong-song-contest
53. 2026-09-10-freedominnovation-nec-bill
54. 2026-09-10-currentwaves-pm-amendment-slip
55. 2026-09-10-brieftag-nk-contact-reports-china
56. 2026-09-10-ansanheart-academy-merger
57. 2026-09-08-sonit-criminal-record-card
58. 2026-09-08-kimsohee-ppp-seven-pledges
59. 2026-09-03-taekyu-statistics-audit-probe
60. 2026-08-29-idontknowpolitics-martial-law-nk-policy
61. 2026-08-25-nowandhere-625-constitution-question
62. 2026-08-24-dictatorshipnono-jeju-missing-false-closure
63. 2026-08-12-citynewsmeme-parksangyong-oath-refusal
64. 2026-08-03-pagememo-nk-prosecution-reform-directive
65. 2026-07-28-geonwoo-yoon-final-statement-australia
66. 2026-07-28-geonwoo-ebs-video-removal
67. 2026-07-25-idontknowpolitics-cheongju-spy-directives
68. 2026-07-24-korealive-woohai-moreugo
69. 2026-07-24-firstincome-seoul-edu-unification-textbook
70. 2026-07-22-geonwoo-kimminsoo-defense
71. 2026-07-20-yoonsanghyun-special-counsel-filibuster
72. 2026-07-19-amhaengeosa-kctu-itaewon-directive
73. 2026-07-14-kasamo7-cnn-surprise-attack-article
74. 2026-07-13-idontknowpolitics-yeonpyeong-crab-remark
75. 2026-07-12-judypia-real-estate-supervisory-bill
76. 2026-07-05-idontknowpolitics-kctu-appeal
77. 2026-07-04-idontknowpolitics-2018-freedom-deletion
78. 2026-07-01-amhaengeosa-lee-nk-military-remark

## 완료 산출물
- `content/posts-en/{id}.md` 78개
- 핸드오프 `docs/handoffs/translator-02-english-batch-2-opus.md` — CLAUDE.md 표준 템플릿 + 대조표 78행(id · 불릿 수 원본/영어 · description 글자 수 · 체크리스트 셀프리뷰 결과 · 비고) + 새로 쓴 인명·기관 표기 목록 + 미해결
- 🔴 트리거 `docs/triggers/translator-02-english-batch-2-opus-COMPLETE.md` **생성 필수** (없으면 미완료)
- 오더를 `instructions/translator/processed/`로 이동, `history/2026-09-30.md`(또는 작업 종료일)에 기록
