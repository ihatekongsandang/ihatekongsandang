# 핫링크 시험 기록 (기획자 16, 2026-11-09)

사실만 적는다. 받은 파일은 저장소 밖에만 두었고(서명된 임시 주소·이미지 바이트는 저장소에 옮기지 않음), 데이터로만 다뤘다.
요청 사이 간격 2초 이상, UA `Mozilla/5.0`(guide §3), 표본 5건(인스타그램 4 + 스레드 1). 시각은 UTC.

## 표본
| # | 서비스 | 게시물 코드 | 게시물(id 일부) |
|---|---|---|---|
| 1 | 인스타그램 | DaPvmqDxEKf | 2026-07-01-…-lee-nk-military-remark (가장 오래됨) |
| 2 | 인스타그램 | DdTSOszCAPk | 2026-09-15-…-nk-budget-undecided |
| 3 | 인스타그램 | DdviIs7J-XK | 2026-09-26-…-dmz-chae-standard |
| 4 | 인스타그램 | DeNdoOkEoML | 2026-10-08-…-us-nis-cyber-group-excluded (가장 최근) |
| 5 | 스레드 | DayNAMlj9ip | 2026-07-14-kasamo7-cnn-surprise-attack-article |

## 1단계 — 임베드 페이지 (09:17:05 전후)
| # | 요청 | HTTP | 크기(byte) | 이미지 태그 |
|---|---|---|---|---|
| 1 | `instagram.com/p/{코드}/embed/captioned/` | 200 | 228,759 | 있음 |
| 2 | 같음 | 200 | 201,838 | 있음 |
| 3 | 같음 | 200 | 203,549 | 있음 |
| 4 | 같음 | 200 | 248,415 | 있음 |
| 5 | `threads.com/@kasamo7/post/{코드}/embed` | 200 | 52,967 | **없음**(응답에 프로필 사진 150×150과 영상 .mp4 주소만 있고 포스터 주소 없음) |

## 2단계 — 이미지 주소의 모양
- 4건 모두 호스트 `scontent-icn2-1.cdninstagram.com`, 매개변수 `stp, _nc_cat, ig_cache_key, ccb, _nc_sid, efg, _nc_ohc, _nc_oc, _nc_zt, _nc_ht, _nc_gid, _nc_ss, oh, oe`.
- `oe`(16진 유닉스 시간)를 해석한 만료 시각: #1 2026-11-13 21:08:35 · #2 11-13 19:31:58 · #3 11-13 18:21:25 · #4 11-13 20:33:28. 시험 시각 09:17 기준 약 4일 8시간~4일 12시간 뒤.

## 3단계 — 외부 Referer 요청 (09:17:20~09:17:34)
| # | `Referer: https://example.org/` | Referer 없음 |
|---|---|---|
| 1 | 200 image/jpeg 80,477 byte | 200 80,477 |
| 2 | 200 image/jpeg 169,202 | 200 169,202 |
| 3 | 200 image/jpeg 187,358 | 200 187,358 |
| 4 | 200 image/jpeg 120,245 | 200 120,245 |
| 5 (영상 1KB 범위) | 206 video/mp4 1,024 | — |

응답 헤더(#1): `cross-origin-resource-policy: cross-origin`, `access-control-allow-origin: *`, `timing-allow-origin: *`, `cache-control: max-age=1209600, no-transform`, `last-modified: Mon, 31 Aug 2026 19:39:54 GMT`.

## 4단계 — 시간이 지난 뒤 재요청 (09:23:26 전후, 약 6분 뒤)
- 같은 주소로 4건 모두 HTTP 200, `image/jpeg`, 크기 처음과 같음(80,477 · 169,202 · 187,358 · 120,245). 4건 모두 내용(바이트)이 처음 받은 파일과 같다(`cmp`).
- #1 게시물의 임베드 페이지를 다시 받아(200, 228,759 byte) 이미지 주소를 비교: 경로는 같고 `oh`·`_nc_gid` 두 값이 **다르다**, `oe`는 **같다**.

## 시험하지 못한 것
- 만료 시각(2026-11-13) 이후의 응답: 시험일로부터 4일 뒤라 이 오더 안에서 확인 불가.
- 스레드에서 이미지(비영상) 게시물의 주소: 표본 1건은 영상 게시물이다.
- 요청 수: 임베드 5 + 이미지 8 + 영상 범위 1 + 재요청 4 + 새 임베드 1 = 19회.
