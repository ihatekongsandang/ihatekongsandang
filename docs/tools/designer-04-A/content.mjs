// 디자이너 A 시안 공통 문구·데이터. 실제 게시물 제목·UI 문구를 그대로 가져온다(보도사진은 쓰지 않는다).
export const SITE = '공산당이싫어요'
export const SITE_SUB = '(Korea Politics & Security Brief)'
export const INTRO_KO =
  '여러 언론 보도를 모아 정리하는 카드형 뉴스 소식지입니다. 직접 취재하지 않고, 언론 보도(신문법 등에 따라 등록된 매체)·수사기관 발표·판결을 출처로 밝혀 정리합니다. 사실 확인 단계는 단정하지 않고 보도 그대로 인용합니다.'
export const INTRO_EN =
  'A card-style news digest that gathers reports from multiple news outlets. We do no reporting of our own and cite reports, official announcements and rulings.'
export const EN_NOTICE = 'Posts marked "Korean only" have not been translated yet and open in Korean.'
export const BANNER = { title: '이재명 재판재개 촉구 국민 서명운동', sub: '외부 사이트로 이동합니다' }
export const FOOT_KO = {
  tag: '정치·시사 이슈를 출처와 원문 링크로 정리하는 카드형 소식지',
  policy:
    '모든 게시물은 언론 보도·수사기관 발표·판결문 등 공개된 출처에 근거해 정리하며, 원문을 전재하지 않습니다. 제목·요약은 단정하지 않고 보도를 인용하는 형태로 씁니다.',
  link: '출처·저작권 정책과 정정·삭제 요청 절차',
  terms: '이용약관',
}
export const FOOT_EN = {
  tag: 'Korean politics and security issues, summarized with sources and links to the originals',
  policy:
    'Every post is based on public sources such as news reports, announcements by investigative authorities and court rulings, and does not republish the original. Titles and summaries quote the reports rather than stating conclusions.',
  link: 'About this site and how to request a correction or removal',
  terms: 'Terms of use',
}
// k: photo(사진·출처 표시) | none(대체 카드). 크레딧 이름은 자리표시 예시다.
export const CARDS = [
  { d: '11-08', k: 'photo', c: '대통령실', t: `인스타그램 "대진연의 과거" — 2019년 2월 광화문 '김정은 방남 환영' 회견, 참석자 상당수가 대진연 회원이었다고 보도됨` },
  { d: '11-05', k: 'none', t: `스레드 "[속보]" — "민주당 주도로 김태규 의원 제명 촉구 결의안 가결", 찬성 166표·국민의힘 표결 불참(보도)`, up: '11-09' },
  { d: '11-04', k: 'photo', c: '국회', t: `이진숙 의원 "12·3 계엄 때 상관 명령 따른 군인들에 내란범 낙인·중징계" — 중령 ㅇ씨와 국회 기자회견` },
  { d: '11-03', k: 'photo', c: '연합뉴스', t: `"북한 비판했다고 처벌 논란?" — 해병대 "훈련장 사진 군사보안 문제로 삭제 권고, 북한 비방 이유 징계 없다"` },
  { d: '11-03', k: 'none', t: `"우리 북한의 김정일, 또 김일성 주석의 노력이 폄훼되지 않도록" — 2024년 1월 당시 이재명 민주당 대표 발언 재조명` },
  { d: '11-01', k: 'photo', c: '조선일보', t: `"전쟁 나면 임기 연장…이재명은 염두에 두고 있다"? — 유튜브 영상 출연자의 개인 추론, 본인도 "추론이고 예상"` },
  { d: '10-29', k: 'photo', c: '국방부', t: `대만 "중국 함정 53척, 일본 남부~대만·필리핀 외해서 활동…명백한 위협" — 국가안전회의 비서장, 위치 지도 공개` },
  { d: '10-29', k: 'photo', c: '합동참모본부', t: `합참 "북한, 원산 일대서 동해상으로 단거리 탄도미사일 등 10여 발 발사" — 군사회담 제안 6일 만` },
  { d: '10-28', k: 'none', t: `"북한, 남포 등서 잠수정·공작모선으로 대남 해상 침투 훈련 정황" — 동아일보 단독 보도` },
  { d: '10-24', k: 'photo', c: '경향신문', t: `북한, 평양서 조선인민군 제3차 중대장대회 — 김정은 "최강의 중대 육성으로 최강의 군대 건설"` },
  { d: '10-23', k: 'photo', c: '대통령실', t: `"대한민국이 공산화되면 킬링필드" — 원문이 김용현 전 장관 최후진술로 전한 발언과 '평양 무인기' 일반이적 항소심 결심(징역 30년 구형)` },
  { d: '10-20', k: 'none', t: `이재명 대통령 "김정은, 미사일 시험발사 했지만 아주 오랫동안 잘 참았던 것 같다" — 2025년 10월 CNN 인터뷰 발언 재소개` },
]
export const LONGEST = `"젤렌스키 폭로, 이재명 정부가 러시아 연료 운송 지원" — 보도상 비판은 우크라이나 대통령실 제재 담당 보좌관이 가디언 보도를 인용한 것, '젤렌스키 "한국은 공산당"'·'정부가 운송 지원'은 확인 안 돼`
export const CARDS_EN = [
  { d: 'Nov 8', k: 'photo', c: 'Presidential Office', t: `Instagram post on "Daejinyeon's past": many attendees at a February 2019 Gwanghwamun event welcoming a Kim Jong Un visit to Seoul were members of the group, reports said` },
  { d: 'Nov 5', k: 'none', t: `Threads post labeled "[Breaking]": "Resolution urging expulsion of lawmaker Kim Tae-kyu passes, led by the Democratic Party," with 166 in favor as the People Power Party boycotts the vote (reports)` },
  { d: 'Nov 4', k: 'photo', c: 'National Assembly', t: `Rep. Lee Jin-sook: "Soldiers who followed superiors' orders during the Dec. 3 martial law branded insurrectionists and heavily disciplined" — National Assembly press conference with Lt. Col. Y` },
  { d: 'Nov 1', k: 'photo', c: 'Chosun Ilbo', ko: true, t: `"전쟁 나면 임기 연장…이재명은 염두에 두고 있다"? — 유튜브 영상 출연자의 개인 추론, 본인도 "추론이고 예상"` },
]
export const TAGS = [['dmz', 40], ['이재명', 29], ['중국', 20], ['북한', 18], ['25사단', 17], ['합참', 17], ['목함지뢰', 16], ['국민의힘', 15], ['국가보안법', 14], ['더불어민주당', 12], ['통일부', 11], ['지뢰', 11], ['집회', 10], ['간첩', 8]]
export const TAG_TOTAL = 325
// 상세(실제 게시물과 같은 구성: 요약·메타·안내 상자·공유·미리보기·원문 이동·본문 h2 4개·배경 보도 3건·태그)
export const POST_KO = {
  title: `인스타그램 "대진연의 과거" — 2019년 2월 광화문 '김정은 방남 환영' 회견, 참석자 상당수가 대진연 회원이었다고 보도됨`,
  desc: `인스타그램 @politics_crush가 대진연의 과거 활동을 다룸. 사진 속 회견은 2019년 2월 14일 광화문 '예술인 모임' 회견으로, 참석자 상당수가 대진연 회원이었다고 보도됐습니다. 2018년 고발 사건의 처분 결과 보도는 찾지 못했습니다.`,
  date: '2026년 11월 9일',
  attr: '인스타그램 @politics_crush (정치크러쉬)',
  site: 'Instagram',
  credit: '사진: 대통령실 · 공공누리',
  lead: `이 게시물은 원문 캡션과 첫 장 이미지(영상 화면 1장)를 기준으로 정리했으며, 영상과 나머지 장은 확인하지 않았습니다. 원문은 2026년 11월 8일 게시됐지만 사진 속 장면은 <strong>2019년 2월 14일</strong> 서울 광화문광장 기자회견으로, 펼침막 문구("김정은 국무위원장님, 서울방문 환영 예술공연을 꼭 보여드리고 싶습니다")가 당시 보도 내용과 일치합니다. 참석자 얼굴이 식별되는 원문 이미지 대신 자체 제작 카드를 썼습니다.`,
  sections: [
    { h: '원문 주장 (게시자 의견)', ul: [`"김정은 국무위원장님 사랑해요?"라는 제목으로 '대진연의 과거'를 소개함.`, `캡션에서 "이러고 안잡혔나요?"라고 물음.`] },
    { h: '보도로 확인된 내용', ul: [
      `2019년 2월 14일 오전 광화문광장 세종대왕상 앞에서 '김정은 국무위원장님 서울방문 환영공연을 준비하는 (남측) 예술인 모임'이 김 위원장의 서울 방문을 환영하는 기자회견을 열었고, 참석자들은 "사랑합니다 김정은 위원장님"을 연호한 것으로 보도됨(데일리안, 조선일보).`,
      `조선일보는 이 모임의 참석자 상당수가 한국대학생진보연합(대진연) 소속 회원이었고, 대진연이 이날 연극·노래 공연을 했다고 보도함.`,
      `같은 기사는 대진연이 2018년 11월 '백두칭송위원회' 등 김정은 환영 단체 결성에 주도적으로 참여했고, 보수단체로부터 국가보안법 위반 혐의로 고발됐다고 전함.`] },
    { h: `"안 잡혔나"에 대해 확인된 범위`, ul: [
      `2018년 11월 보수 성향 단체가 백두칭송위 관계자들을 국가보안법 위반 혐의로 고발했고, 검찰은 같은 해 12월 서울경찰청에 수사를 지휘한 것으로 보도됨.`,
      `2020년 10월 서울경찰청 보안수사대는 찬양·고무 혐의로 불구속 입건된 대진연 전 공동대표 등 백두칭송위 관계자들에게 출석을 요구했다고 밝혔고, "수사는 연말까지 마무리할 계획"이라고 말한 것으로 보도됨(조선일보). 고발 약 2년 만의 첫 출석 조사여서 '늑장 수사'라는 지적이 나왔다고 같은 기사는 전함.`,
      `이후 송치·기소 등 처분 결과를 다룬 보도는 이번에 찾지 못했습니다. 따라서 처벌 여부는 적지 않았습니다.`] },
    { h: '요약에 넣지 않은 내용', ul: [`원문 캡션의 "미친 거 아닙니까?"는 게시자 의견이어서 요약에 옮기지 않았습니다. 사진 속 참석자 개인의 신원은 다루지 않았습니다.`] },
  ],
  sources: [
    ['언론', `조선일보 — '예술인이라더니' 親北 대학생 단체… 서울 한복판서 "김정은 사랑해요"`, '2019년 2월 14일'],
    ['언론', `데일리안 — "김정은 위원장님 사랑합니다!"…그가 온다, 갈등과 함께`, '2019년 2월 14일'],
    ['언론', `조선일보 — 경찰, '김정은 찬양' 백두칭송위에 고발 2년 만에 출석 요구`, '2020년 10월 30일'],
  ],
  tags: ['북한', '국가보안법', '경찰'],
}
export const POST_EN = {
  title: CARDS_EN[0].t,
  desc: `Instagram @politics_crush revisits Daejinyeon's past. Many at the pictured Feb. 14, 2019 event were its members, reports said; no outcome report was found.`,
  date: 'Nov 9, 2026', tr: 'Nov 9, 2026',
  attr: 'Instagram @politics_crush (정치크러쉬)',
  credit: 'Photo: Presidential Office · Korea Open Government License',
  lead: `This post is based on the original caption and the first image (one video frame); the video and the remaining slides were not reviewed. The original was posted on Nov. 8, 2026, but the scene it shows is a press event at Gwanghwamun Square in Seoul on <strong>Feb. 14, 2019</strong>; the banner ("Chairman Kim Jong Un, we truly want to show you a performance welcoming your visit to Seoul") matches reports from that time. Because attendees' faces are identifiable, we used a card made by this site instead of the original image.`,
  sections: [
    { h: `What the original post claims (the poster's opinion)`, ul: [`Under the heading "Do you love Chairman Kim Jong Un?", it presents "Daejinyeon's past."`, `The caption asks, "They did this and weren't caught?"`] },
    { h: 'What reports confirm', ul: [
      `On the morning of Feb. 14, 2019, a group calling itself the "(South Korean) artists' group preparing a performance to welcome Chairman Kim Jong Un's visit to Seoul" held a press event in front of the King Sejong statue at Gwanghwamun Square, and attendees chanted "We love you, Chairman Kim Jong Un," according to reports (Dailian, Chosun Ilbo).`,
      `Chosun Ilbo reported that many of the attendees were members of the Korean University Students' Progressive Alliance (<span lang="ko">한국대학생진보연합</span>, Daejinyeon), and that Daejinyeon staged a play and songs at the event.`,
      `The same article said Daejinyeon played a leading role in forming Kim Jong Un welcome groups such as the "Baekdu Praise Committee" (<span lang="ko">백두칭송위원회</span>) in November 2018, and that conservative groups filed complaints against it for alleged violations of the National Security Act.`] },
    { h: `What is confirmed about "weren't caught"`, ul: [
      `In November 2018, a conservative group filed a complaint against Baekdu Praise Committee figures for alleged National Security Act violations, and prosecutors directed the Seoul Metropolitan Police Agency to investigate in December that year, according to reports.`,
      `In October 2020, the agency's security investigation unit said it had summoned figures of the committee, including a former co-chair of Daejinyeon booked without detention on charges of praising and encouraging an anti-state organization, and said it planned to wrap up the investigation by year-end, Chosun Ilbo reported. The same article noted criticism of a "slow investigation," as this was the first questioning about two years after the complaint.`,
      `We did not find any report on what happened afterward, such as a referral to prosecutors or an indictment, so we do not state whether anyone was punished.`] },
    { h: 'What we left out of the summary', ul: [`The caption line "Isn't this insane?" is the poster's opinion and is not included in the summary. We do not address the identities of individual attendees in the photo.`] },
  ],
  sources: POST_KO.sources.map(([a, b, c]) => ['News', b, c.replace('2019년 2월 14일', 'Feb 14, 2019').replace('2020년 10월 30일', 'Oct 30, 2020')]),
}
