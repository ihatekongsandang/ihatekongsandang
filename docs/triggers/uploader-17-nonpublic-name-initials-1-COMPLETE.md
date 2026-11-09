# uploader-17 — 비공인 실명 이니셜 전환 1차(확정분) — COMPLETE

- 담당: 반공-업로더 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/17-nonpublic-name-initials-1.md`(이동)
- 기준: `docs/triggers/reviewer-52-nonpublic-name-audit-COMPLETE.md`(A-5·A-6·B-3·C·부록)
- 선행 문서 직접 읽음: `docs/poster/guide.md` §2·§4·§4-1, `content/README.md` §6-1(절차 1~5·검증 a~h), 선례 `instructions/uploader/processed/02-post1-id-move.md`·`16-sns-image-batch-14.md`, 리뷰어 52 트리거 전체.
- 이 트리거에는 비공인 실명(한글·로마자·성만 쓴 표기)과 옛 id 문자열을 쓰지 않았다. 인물은 P번호·초성으로만 가리킨다. 이름이 든 작업 파일(치환표·이름 목록·grep 결과)은 저장소 밖 임시 폴더에만 있다.
- git add·commit·push 0, 빌드 0, `src/`·설정 수정 0. 파일 이동은 일반 `mv`로만 했다.
- `updatedAt`·`translatedAt`·갱신 이력은 바꾸지 않았다(오더 6항, 묶음 14 선례).

---

## 1. id 이전 (2건)

| 대상 | 새 id | 처리 |
|---|---|---|
| #6 (P046 ㄱㅁㅇ) | `2026-09-12-peoplepower7-civic-group-head-dp-card` | ko·en 옛 파일 → 새 파일 이름, frontmatter `id` 2곳, `retired-ids.txt` 13행·`moved-ids.txt` 6행 추가 |
| P089 ㅊㅅㄱ (id에 성 조각) | `2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard` | 오더 3항 "N1 id에 이름이 있으면 같은 절차". 직함 영문 단어(marine corporal)로 지음. ko·en 이름 변경, `id` 2곳, `retired-ids.txt` 14행·`moved-ids.txt` 7행 추가 |

- `src/lib/content/moved-ids.ts`는 `content/moved-ids.txt`를 읽는 구조인 것을 확인했다(`load.ts`가 `collectMovedIdErrors`·`readMovedIds` 호출). 코드 수정은 필요 없었다.
- 두 게시물 모두 `public/images/<옛 id>/` 폴더가 없다(직접 확인). 게시물 안에 `/images/<옛>/` 참조도 0이다.
- `content/` 안 옛 id 문자열은 두 txt 파일에만 있다. 게시물 파일(ko·en)과 내부 링크에는 0건이다.
- 옛 id 문자열이 `content/`·`src/`·`public/` 밖에 남은 곳: #6은 13파일, P089는 측정 기록·트리거·처리된 오더·번역 id 목록에 있다. 모두 그 시점의 기록(도구 출력·트리거·히스토리·처리된 오더)이고 **링크로 쓰이는 곳은 0**이어서 오더 5항대로 그대로 뒀다.

## 2. #6 문구 (A-5 표 그대로)

- ko 새 파일: 3(title) · 4(description) · 14(sources[0].name) · 36 · 38 · 42 · 43(2곳) · 44 · 50. 이름만 `ㄱ씨`로 바꾸고 가족 관계와 단체명(촛불행동)은 유지했다. 11곳을 바꿨고 성만 쓴 표기를 포함해 0건이다.
- en 새 파일: 3(title) · 13 · 15 · 19 · 20 · 21 · 27. 이름을 `K`로 바꿨다(8곳, 0건). 4행 description은 원래 이름이 없어 그대로 뒀다.
- 원래 있던 he/his 대명사는 A-5에 "선택"으로 적혀 있어 손대지 않았다(리뷰어 판단 대상).
- validate 🟡: ko description이 A-5 문안 그대로 쓰면서 156자에서 **161자**가 됐다(권장 160자, 경고만 있고 빌드는 막지 않음). 줄일지는 리뷰어 판단에 맡긴다.

## 3. N1·N1S 이니셜 전환

| P | 표기 | 바꾼 파일:줄 |
|---|---|---|
| P051 ㅂㅇㅂ (형수) | ko `ㅂ씨` · en `P` | `content/posts/2026-09-13-geonwoo-brother-hospitalization-case.md`:3·4·51·55·56 / en 같은 이름:3·4·16·20·21 |
| P050 ㅇㅈㅅ (친형, 고인) | ko `친형 ㅇ씨` · en `L` | 같은 ko:47·55 / en:12·20 |
| P144 ㅇㄷㄱ | ko `ㅇ씨` · en `Y` | `content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md`:3·4·12(alt)·18·22(sources.name)·31·36·37·38 / en:3·5(imageAlt)·15·20·21·22 |
| P145 ㄴㅇ | ko `ㄴ씨` · en `N` | 같은 두 파일, 위와 같은 줄 |
| P146 ㅂㄱㅎ | ko `ㅂ씨` · en `B` | 같은 두 파일:3·4·12·36·38 / en:3·5·20·22. 채널명(성이 든 이름)도 "유튜브 채널"로만 적었다 |
| P147 ㄱㅇ · P148 ㄱㅁㅂ · P107 ㅈㅈㅅ(녹취 인용) | 녹취 인용은 "이재명 대통령과 다른 세 사람(비공인이라 이름을 적지 않음)이 '다 짜고'" 취지로 바꿨다. P148은 `[대장동 사건 피고인 ㄱ씨]`·en `[K, a Daejang-dong defendant]` | ko:37(file 기준 40·41행 부근) / en:21 |
| P107 ㅈㅈㅅ | ko `전 민주당 정무조정실장 ㅈ씨` · en `J` | `content/posts/2026-09-28-kangyeonjae-chief-justice-audit-witness.md`:42 / en:19 |
| P181 ㅈㅁㄹ | 출처 제목 속 이름 → `ㅈ씨` | `content/posts/2026-08-24-dictatorshipnono-jeju-missing-false-closure.md`:14·18 |
| P055 ㅈㅎㅅ (고인) | ko `고(故) ㅈ씨` · en `the late J` | `content/posts/2026-09-13-geonwoo-jinjoongkwon-2023-remark.md`:33 / en:14 |
| P089 ㅊㅅㄱ | ko는 원래 "성+계급" 수준이라 출처 제목의 전체 이름만 "성 상병"으로. en은 `Cpl. C` | 새 P089 ko:29 / en:3·4·14·22·26. 같은 en 표기가 리뷰어 부록 밖의 한 곳에도 있어 함께 맞췄다: `content/posts-en/2026-07-28-geonwoo-yoon-final-statement-australia.md`:14 (`the Marine Cpl. C case`) |
| P199 ㄷㅇㅂㄷㅇ | ko `전 CXMT CEO ㅇ씨` · en `W` | `content/posts/2026-09-29-shindawit-cxmt-samsung-threat.md`:38 / en:19 |
| P172 ㅇㅅㅁ (중령) | ko `중령 ㅇ씨`(뒤에 성만 쓴 "○ 중령"도 `ㅇ씨`) · en `Lt. Col. Y`, 뒤의 성만 쓴 곳은 `Y` | `content/posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md`:3·4·15(alt)·25(sources.name)·43·44·48 / en:3·4·5(imageAlt)·21·22 |
| P217 ㅅ (N1S) | ko `ㅅ씨` · en `S` | `content/posts/2026-07-05-idontknowpolitics-kctu-appeal.md`:35 · `2026-07-19-amhaengeosa-kctu-itaewon-directive.md`:36·37·38 · `2026-09-24-hagonolza-kctu-itaewon-claim.md`:36·38 · `2026-09-28-firstincome-kctu-spy-case-summary.md`:4·44·47·58 / en 같은 네 파일:13 · 13·14·15 · 13·15 · 4·13·16·27 |
| P218 ㄱㅁ · P219 ㅇㅁ (N1S) | ko `ㄱ씨`·`ㅇ씨` · en `K`·`Y` | firstincome ko:47 / en:16 |

- 리뷰어 부록에는 전체 이름이 있는 줄만 올라 있었다. 그래서 성만 쓴 표기("○ 전 본부장", "○ 변호사", "○씨", "○ 중령", en 성 단독)를 파일마다 따로 찾아 함께 바꿨다. 위 줄 목록에 포함돼 있다.

### 🔴 보류 1건 — P020 ㅇㅎㅇ (손대지 않음)
- 판정표에는 "전 경기도 평화부지사(비공인)"로 올라 있다. 하지만 검색해 보니 이 인물은 **제17대 국회의원**(2004년 당선, 열린우리당·대통합민주신당)으로 보도돼 있다(주간경향 2000년대 기사 제목에 "열린우리당 의원"으로 표기 등 — 이름은 여기 적지 않음). B-2 기준 G1 "국회의원(현·전)"에 해당하면 (가) 공인이다.
- 추측으로 전환하지 않고 보류한다. 해당 위치(ko 2026-08-12-citynewsmeme-…:44, 2026-10-09-gotdemcatch-…:39·62 / en 같은 두 파일:21·25)는 그대로 뒀다. C 목록의 P020 문서 잔존 4곳도 손대지 않았다.
- 슈퍼바이저 결정을 요청한다. (가)로 재판정하고 유지하려면 리뷰어가 출처를 확인한 뒤 본문에 "전 국회의원"을 넣을지 정한다. (나)를 유지하면 2차 오더에서 전환한다.

## 4. D6 계정 표시 이름 (P178·P176·P175 — 32파일)

- attribution 괄호 속 표시 이름을 지우고 핸들만 남겼다.
  - P178: `content/posts/2026-09-10-ansanheart-academy-merger.md`:8, en:6. speaker.name은 `"@ansanheart"`로 바꿨다(10행).
  - P176: geonwoo 6건 × ko·en = 12파일.
  - P175: shindawit ko 11 + en 7 = 18파일(리뷰어 54 P3-1로 정정 — 처음에 en 6·17파일로 잘못 셌다). 파일과 줄은 아래 git status와 같고, 모두 attribution 1줄씩이다.
- P177은 채널명이라 그대로 뒀다(오더 4항).
- 게시물 파일 안에 세 표시 이름(한글)이 남은 곳은 0이다.
- 범위 밖이라 남겨 둔 것: P176 표시 이름이 `docs/handoffs/translator-01-english-batch-1.md`:129와 `docs/supervisor/drafts/2026-09-22-…`:7에 남아 있다. 오더 5항의 범위가 N1·N1S뿐이라 손대지 않았다.

## 5. 문서 잔존 정리

| 대상 | 파일:줄 |
|---|---|
| 공익제보자 | `docs/handoffs/translator-02-english-batch-2-opus.md`:118 (`ㅈ씨 \| C`) · `docs/tools/designer-04-B/data.json`:1292 |
| #6 인물 | `history/2026-10-01.md`:34 · `docs/tools/reviewer-26/x-truncation-audit-output.txt`:10 |
| N1·N1S 인물(C 목록, P020 제외) | `docs/handoffs/translator-01-english-batch-1.md`:110·128·138 · `translator-02…`:25·131·132·133 · `docs/supervisor/drafts/2026-09-28-held-recheck.md`:59·304 · `docs/tools/designer-04-A/content.mjs`:28·43 · `docs/tools/designer-04-B/data.json`:17·1504 · `docs/tools/reviewer-24/forbidden-terms-output.txt`:6·7·8·45·46·47·48·56·58·59·62 · `docs/tools/reviewer-30/gen.py`:96 · `reviewer-30/image-recheck.tsv`:77 · `reviewer-30/post-recheck.tsv`:31 · `docs/triggers/supervisor-2026-10-01-anticom-supervisor-ACK-COMPLETE.md`:22 · `design/v0.3-responsive/{A1,A2,A3,B1,B2,B3,C1,C2,C3,final}/mockup.html` 10파일 (P172, 한글 25곳·로마자 14곳) |

- 수정한 도구 파일이 망가지지 않았는지 확인했다: `data.json`은 JSON으로 읽히고, `content.mjs`는 `node --check`, `gen.py`는 `py_compile`을 통과했다.
- `history/2026-10-01.md`는 이 작업 전부터 다른 세션의 수정이 걸려 있던 파일이다(작업 전 `git status` 기준). 이번에는 34행 이름만 바꿨다. 옛 id 문자열은 기록이라 그대로 뒀다.

## 6. 0건 확인

- 이름 문자열 목록(전환한 인물 18명 + 공익제보자 + #6 인물 + D6 표시 이름 3개, 한글·로마자 30개. 저장소 밖에만 둠)으로 `content/` 전체를 grep했다 → **0건**.
- 성만 쓴 표기 패턴("○모 씨", "○씨", "○ 전 본부장", "○ 변호사", "○ 중령", en 성 단독)으로 `content/posts*`를 grep했다 → 해당 인물 **0건**. 걸린 2건은 공인(국회 위원장·장관)의 이름 일부라 오탐이다.
- 같은 목록으로 `git ls-files` 기준 `content/` 밖 추적 파일 전체를 grep했다. 남은 것은 위 4절의 D6 범위 밖 2줄뿐이고, 그 밖의 결과는 **0건**이다.
- 이 트리거: 비공인 실명 0, 옛 id 문자열 0, 홈 절대경로 0(작성 후 같은 목록으로 grep).

## 7. 남은 확인 사항 (리뷰어·슈퍼바이저)

1. **P020 보류**(3절): 전직 국회의원이면 공인으로 다시 판정해야 한다.
2. **자체 제작 카드 이미지 2장에 이름 글자가 그대로 있다.** `public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg`(P144·P145·P146)와 `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg`(P172)다. alt·imageAlt는 이니셜로 바꿨지만 이미지 속 글자는 바꾸지 못했다(이미지 수정·새 이미지 저장은 범위 밖). 디자이너 재제작이나 `image` 비우기 중 하나를 결정해야 한다. 지금은 alt와 이미지 글자가 다르다.
3. P089 ko 태그는 원래의 "성+계급" 표기 그대로다. guide §4는 태그에 실명을 금지한다. 다만 오더가 ko 수준(성+계급)을 기준으로 삼아 유지했으니 판단을 바란다.
4. #6 ko description 161자 경고(2절)와 en 대명사(선택 사항).

## 8. validate

- `npm run validate:content`: **✅ 검증 통과.** 418건(ko 209·en 209) 모두 통과, 실패 0, 오류 0.
  - 폐기 id 목록 6개, moved-ids 3건, 리다이렉트 규칙 6개, 오류 0.
  - 새로 생긴 경고는 #6 ko description 161자 1건이다. 바꾼 다른 게시물의 description은 길이가 같거나 줄었다(HEAD와 대조).

## 9. `git status --short` (이번 작업으로 바뀐 경로 — 작업 전 상태와 대조해 새로 생긴 줄만)

```
 M content/moved-ids.txt
 M content/retired-ids.txt
 D content/posts/<#6 옛 파일>.md
 D content/posts-en/<#6 옛 파일>.md
 D content/posts/<P089 옛 파일>.md
 D content/posts-en/<P089 옛 파일>.md
?? content/posts/2026-09-12-peoplepower7-civic-group-head-dp-card.md
?? content/posts-en/2026-09-12-peoplepower7-civic-group-head-dp-card.md
?? content/posts/2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard.md
?? content/posts-en/2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard.md
 M content/posts/2026-07-05-idontknowpolitics-kctu-appeal.md
 M content/posts/2026-07-19-amhaengeosa-kctu-itaewon-directive.md
 M content/posts/2026-08-24-dictatorshipnono-jeju-missing-false-closure.md
 M content/posts/2026-09-10-ansanheart-academy-merger.md
 M content/posts/2026-09-10-geonwoo-jeongyulseong-song-contest.md
 M content/posts/2026-09-13-geonwoo-518-list-disclosure-citizen.md
 M content/posts/2026-09-13-geonwoo-brother-hospitalization-case.md
 M content/posts/2026-09-13-geonwoo-jinjoongkwon-2023-remark.md
 M content/posts/2026-09-13-geonwoo-leejinsook-518-merit-disclosure.md
 M content/posts/2026-09-18-shindawit-asiangames-nk-anthem.md
 M content/posts/2026-09-20-shindawit-foreign-unemployment-benefits.md
 M content/posts/2026-09-23-shindawit-army-lecture-trump.md
 M content/posts/2026-09-24-hagonolza-kctu-itaewon-claim.md
 M content/posts/2026-09-27-geonwoo-corporate-card-whistleblower.md
 M content/posts/2026-09-27-shindawit-nisi-mine-summary.md
 M content/posts/2026-09-28-firstincome-kctu-spy-case-summary.md
 M content/posts/2026-09-28-geonwoo-farmland-bank-expansion.md
 M content/posts/2026-09-28-geonwoo-state-system-decade.md
 M content/posts/2026-09-28-kangyeonjae-chief-justice-audit-witness.md
 M content/posts/2026-09-28-shindawit-pla-fighter-wiretap.md
 M content/posts/2026-09-29-shindawit-cxmt-samsung-threat.md
 M content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md
 M content/posts/2026-10-05-shindawit-core-tech-leak-china-92.md
 M content/posts/2026-10-05-shindawit-mdl-south-minefields-20m.md
 M content/posts/2026-10-08-ansanheart-daejangdong-recording-2025.md
 M content/posts/2026-10-08-shindawit-nis-chief-nga-visit-report.md
 M content/posts/2026-10-08-shindawit-us-nis-cyber-group-excluded.md
 M content/posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M content/posts-en/2026-07-05-idontknowpolitics-kctu-appeal.md
 M content/posts-en/2026-07-19-amhaengeosa-kctu-itaewon-directive.md
 M content/posts-en/2026-07-28-geonwoo-yoon-final-statement-australia.md
 M content/posts-en/2026-09-10-ansanheart-academy-merger.md
 M content/posts-en/2026-09-10-geonwoo-jeongyulseong-song-contest.md
 M content/posts-en/2026-09-13-geonwoo-518-list-disclosure-citizen.md
 M content/posts-en/2026-09-13-geonwoo-brother-hospitalization-case.md
 M content/posts-en/2026-09-13-geonwoo-jinjoongkwon-2023-remark.md
 M content/posts-en/2026-09-13-geonwoo-leejinsook-518-merit-disclosure.md
 M content/posts-en/2026-09-18-shindawit-asiangames-nk-anthem.md
 M content/posts-en/2026-09-20-shindawit-foreign-unemployment-benefits.md
 M content/posts-en/2026-09-23-shindawit-army-lecture-trump.md
 M content/posts-en/2026-09-24-hagonolza-kctu-itaewon-claim.md
 M content/posts-en/2026-09-27-geonwoo-corporate-card-whistleblower.md
 M content/posts-en/2026-09-27-shindawit-nisi-mine-summary.md
 M content/posts-en/2026-09-28-firstincome-kctu-spy-case-summary.md
 M content/posts-en/2026-09-28-geonwoo-farmland-bank-expansion.md
 M content/posts-en/2026-09-28-geonwoo-state-system-decade.md
 M content/posts-en/2026-09-28-kangyeonjae-chief-justice-audit-witness.md
 M content/posts-en/2026-09-28-shindawit-pla-fighter-wiretap.md
 M content/posts-en/2026-09-29-shindawit-cxmt-samsung-threat.md
 M content/posts-en/2026-09-30-shindawit-nk-mdl-50-crossings.md
 M content/posts-en/2026-10-08-ansanheart-daejangdong-recording-2025.md
 M content/posts-en/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M design/v0.3-responsive/A1/mockup.html
 M design/v0.3-responsive/A2/mockup.html
 M design/v0.3-responsive/A3/mockup.html
 M design/v0.3-responsive/B1/mockup.html
 M design/v0.3-responsive/B2/mockup.html
 M design/v0.3-responsive/B3/mockup.html
 M design/v0.3-responsive/C1/mockup.html
 M design/v0.3-responsive/C2/mockup.html
 M design/v0.3-responsive/C3/mockup.html
 M design/v0.3-responsive/final/mockup.html
 M docs/handoffs/translator-01-english-batch-1.md
 M docs/handoffs/translator-02-english-batch-2-opus.md
 M docs/supervisor/drafts/2026-09-28-held-recheck.md
 M docs/tools/designer-04-A/content.mjs
 M docs/tools/designer-04-B/data.json
 M docs/tools/reviewer-24/forbidden-terms-output.txt
 M docs/tools/reviewer-26/x-truncation-audit-output.txt
 M docs/tools/reviewer-30/gen.py
 M docs/tools/reviewer-30/image-recheck.tsv
 M docs/tools/reviewer-30/post-recheck.tsv
 M docs/triggers/supervisor-2026-10-01-anticom-supervisor-ACK-COMPLETE.md
```
- 위 목록 외에 이 트리거 추가, 오더 이동(`instructions/uploader/` → `processed/`), `history/2026-11-10.md` 기록 추가가 있다. `history/2026-10-01.md`는 작업 전부터 ` M` 상태였다(34행만 이번에 바꿈).
- 옛 파일 4개는 이동이라 ` D`로 나온다. 옛 id 문자열을 쓰지 않으려고 `<옛 파일>`로 가렸다.
