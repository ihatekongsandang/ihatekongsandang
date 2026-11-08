# poster-2026-11-08-instagram-recollect-24 — COMPLETE

- 담당: 반공-업로더 (슈퍼바이저 · Opus 5.5), 2026-11-08
- 요청: 반공-슈퍼바이저(사용자 D7=7b 후속). 근거는 docs/tools/programmer-10/instagram-collect-report.md, 대상 목록은 codes.txt
- 수집: guide §3 그대로 `curl -sL -A "Mozilla/5.0" …/embed/captioned/`. 23건 모두 `CaptionUsername`=1(캡션·이미지·영상 확인), DfDolMhEoz-는 'may be broken'이라 og:draft로 확인. 재수집 시점에 삭제되거나 바뀐 게시물은 없었음.
- 검사 수: 24/24 (제외 2건 DfFKqzZTmpx·DfFk6b4zmLk는 손대지 않음)
- 커밋: 14cd427 (경로 지정 25파일, clean-clone gate 통과, GitHub status success, 배포 9개 게시물 /post·/en/post 모두 200)

## 코드별 판단
| # | 코드 | 계정 | 판단 | 결과 id / 사유 |
|---|---|---|---|---|
| 1 | Des0mDXEZbq | @monarchreport25 | 게시 | 2026-10-20-monarchreport25-lee-kim-held-back-2025 (2025-10 CNN 발언, 한국일보·경향 2025-10-23) |
| 2 | DfCZVaSBZDU | @eodguri123 | 게시 불가 | 특검 비하 |
| 3 | DfBjtOqTFQb | @recmag.kr | 병합 | 2026-09-10-freedominnovation-nec-bill |
| 4 | DfCyv6jJdot | @junhyeong7919 | 게시 불가 | 선거 부정 암시, 사적 개인 얼굴 |
| 5 | DfDw6Q_jW0i | @sbsnews | 게시 불가 | 선거 부정 주장 발언 보도(§1-1 0항) |
| 6 | DfCTv8Zv2gL | @_1waynews | 게시 불가 | "완벽한 사기" |
| 7 | DfCPqoxmvJ1 | @issue_target | 게시 불가 | '벽돌 투표지' 의혹 |
| 8 | DfDqgBXTEgx | @na86_wbffpro | 게시 불가 | 출처 없는 주장 목록 |
| 9 | DfErj1kgp2O | @knn.news | 게시 불가 | 선거 부정 주장 자체 |
| 10 | DfFwBQ8krKd | @minkyuhantv | 게시 불가 → 주제 전환(갱신) | "찐 간첩" 단정·후원 계좌 / 갱신: 2026-09-28-drumtong119-jinsungjoon-nsl-past |
| 11 | DfFA9pemaCJ | @free.mandoo | 게시 불가 | 투표지 의혹 |
| 12 | DfEVd6AyJHG | @pickd.kr | 게시 불가 | 팔로우 캡처 주장(10/30 선례) |
| 13 | DfMhfgsBhRC | @eodguri123 | 게시 (사용자 지시) | 2026-11-01-eodguri-war-term-extension-claim |
| 14 | DfQtLMShFCw | @happen_bosu | 게시 | 2026-11-03-happenbosu-lee-kimilsung-remark-2024 |
| 15 | DfRPl-wOlhj | @wikipost_mag | 게시 | 2026-11-03-wikipost-marine-officer-kimjongun-photo |
| 16 | DfT6s46iYjy | @jugwan_ilbo | 병합 | 2026-11-04-leejinsook-martial-law-soldiers-presser |
| 17 | DfUDA3zJXBT | @_leejinsook | 게시 | 2026-11-04-leejinsook-martial-law-soldiers-presser |
| 18 | DfWH9UZkceX | @kbsnews | 병합 | 2026-09-10-freedominnovation-nec-bill |
| 19 | DfVcFZ9zmJu | @geonwoo.vibes | 게시 불가 (사실은 #21 갱신 절에 포함) | 썸네일 비하 표현 |
| 20 | DfV6JKfTwum | @_1waynews | 게시 불가 → 주제 전환(갱신) | 비하성 문구 / 갱신: 2026-09-30-hagonolza-lee-case-dismissal-two-routes |
| 21 | DfUnZM_Gfay | @letuknow_12 | 병합 | 2026-10-05-issueradar-nsc-cyber-sanctions-clash |
| 22 | Dfd6jzqD-YD | @five.zzal | 게시 불가 → 주제 전환(갱신) | 부정선거 집회 / 갱신: 2026-09-30-hagonolza-lee-case-dismissal-two-routes |
| 23 | Dfa3L7WAcfH | @picknews_kr | 보류 | 근거 보도 0건, 보도가 나오면 재검토 |
| 24 | DfDolMhEoz- | @politics_crush | 게시 불가 (og 확인) | 부정선거 증거 주장 |

집계: 게시 5 · 병합 4 · 게시 불가 14(이 중 주제 전환 갱신 연결 3) · 보류 1 = 24

## §1-1 8항 자기 점검 — 주제 전환 갱신 2건 (건별 실제 값)
### drumtong119 갱신 (발단 DfFwBQ8krKd)
- [x] 0항: 국회 상임위원장의 공무 비자 문제로, 사적 개인·사생활·선거 부정·재검토 조건 어디에도 해당하지 않음
- [x] sources 추가: 경향신문 2건(언론)
- [x] 포털 주소 없음: khan.co.kr 원 기사 2건
- [x] 발단 계정·코드·해시태그 없음: 갱신 절에 @minkyuhantv·DfFwBQ8krKd·#진성준 없음(grep 0)
- [x] 30일: 2026-10-28(11일 경과), 2026-10-31(8일 경과)
- [x] sourceUrl: 기존 게시물 원문 그대로라 변경 없음
- [x] sources[].name 중립화: 경향 10/31 제목을 "진성준 국방위원장, 비자 거부 사흘 만에 공무비자 발급…예정대로 방미"로 줄였고, 10/28 제목은 "미국, 진성준 국방위원장 비자 발급 거부···진 위원장 \"강력 유감\""로 '이번엔'만 뺌
- [x] 원문 매체: 경향신문(등록 매체). 같은 사실을 조선·동아·한겨레·YTN도 보도(Google News 목록 확인)
### hagonolza 갱신 (발단 Dfd6jzqD-YD·DfV6JKfTwum)
- [x] 0항: 국회 입법 절차라 해당 없음
- [x] sources 추가: 오마이뉴스·파이낸셜뉴스(언론)
- [x] 포털 주소 없음: ohmynews.com·fnnews.com 원 기사
- [x] 발단 계정·코드·해시태그 없음: @five.zzal·@_1waynews·코드 grep 0
- [x] 30일: 2026-11-06(2일 경과), 2026-11-04(4일 경과)
- [x] sourceUrl: 변경 없음
- [x] sources[].name 중립화: 오마이뉴스 제목 "국힘 필버 뚫고 통과한 '조작기소 특검법', 안팎 우려 여전"을 "조작기소 특검법 국회 본회의 통과, 공소취소 권한 삭제 수정안"으로 바꿈. 파이낸셜뉴스는 변경 없음
- [x] 원문 매체: 오마이뉴스·파이낸셜뉴스(등록 매체). 뉴스핌·연합·KBS 등 복수 보도

## 메모
- 사용자 지시 건(DfMhfgsBhRC)은 출연자 이름을 확인하지 못해 '유튜브 백브리핑 영상 출연자'로만 적음. 헌법 제70조·제128조②와 공직선거법 제196조를 법령 원문(국가법령정보센터)으로 대조했고, 욕설과 "손잡고 내려야지" 같은 행동 촉구 문장은 옮기지 않음.
- 대북제재 갱신은 KBS 원 기사 주소를 실측하지 못해 KBS 9시 뉴스 공식 유튜브 영상(2026-11-04)을 출처로 씀. 기사 주소를 확보하면 바꾸는 것이 좋음.
- 이번에 손댄 영어본 중 drumtong119·issueradar·hagonolza에는 기존 문장의 성별 대명사(he/his/him)가 남아 있음. 새로 쓴 문장에는 0건. 전체 정리는 사용자 결정 대기 중인 85파일 일괄 건에 포함.

## 제외 2건 처리 (2026-11-08 사용자 결정 2a, 반공-슈퍼바이저 전달)
| 코드 | 판단 | 사유 |
|---|---|---|
| DfFKqzZTmpx | 게시 불가 — 열람 불가 | embed 'may be broken or removed', og 비어 있음(프로그래머 10 실측). 재검토 조건 없음, 캡처 요청 안 함 |
| DfFk6b4zmLk | 게시 불가 — 열람 불가 | 위와 같음 |

→ codes.txt의 실패·추가 실패 26건 전체 처리 완료(24 + 2). 남은 건 없음.
