/**
 * 화면 고정 문구 사전 — 한국어(`ko`)와 영어(`en`).
 *
 * 영어 페이지는 같은 사이트의 `/en/**` 경로로 제공한다(프로그래머 05, 사용자 확정 B안).
 * 헤더·푸터·페이지네이션·상세 라벨처럼 게시물 내용이 아닌 문구는 모두 여기서 꺼내 쓴다.
 * 한국어 값은 기존 화면 문구를 한 글자도 바꾸지 않고 옮긴 것이다 — 한국어 페이지 출력이 달라지면 안 된다.
 * 클라이언트 컴포넌트(카드)도 이 파일을 읽으므로 서버 전용 모듈을 import하지 않는다.
 */

import type { SourceKind, SourceType } from './content/schema'

export const LOCALES = ['ko', 'en'] as const
export type Locale = (typeof LOCALES)[number]

interface Dictionary {
  skipToContent: string
  mainMenu: string
  home: string
  about: string
  languageNav: string
  footerPolicy: string
  footerPolicyLink: string
  /** 푸터의 약관 페이지 링크(프로그래머 11, 시안 04). */
  footerTermsLink: string
  latestPosts: string
  feedCount: (total: number, page: number, totalPages: number) => string
  noPosts: string
  paginationNav: string
  /** 피드 아래 큰 이동 버튼(사용자 결정 D2 — 이전 "더 보기"는 누르면 본 카드가 사라져 이름과 동작이 달랐다, 진단 #10). */
  nextPage: string
  /** 큰 버튼 보조 표기 "2 / 18". */
  nextPageOf: (page: number, totalPages: number) => string
  /** 쪽 번호 링크의 스크린리더 이름. 보이는 글자는 숫자뿐이다. */
  pageNumberSr: (page: number) => string
  currentPageSr: (page: number) => string
  prevPage: string
  noPrevPage: string
  noNextPage: string
  prev: string
  next: string
  pageOf: (page: number, totalPages: number) => string
  /** 홈 소개 한 줄 접힘의 펼치기·접기(구현 범위 3). */
  introMore: string
  introLess: string
  /** 태그 레일(구현 범위 4) — 끝 칩 "전체 주제 N개"와 레일 이름. */
  tagRail: string
  allTopics: (count: number) => string
  /** 태그 피드 머리 건수 문장(구현 범위 14). */
  tagPostCount: (count: number) => string
  tagFeedHeading: string
  pageTitle: (page: number) => string
  opensInNewTab: string
  noImage: string
  noImageLabel: string
  sourcePreviewAlt: (title: string) => string
  sourceTypes: Record<SourceType, string>
  /** 배경 보도 종류 배지. 한국어는 frontmatter 값 그대로. */
  sourceKinds: Record<SourceKind, string>
  breadcrumbNav: string
  breadcrumbPost: string
  speakerSr: string
  submittedBy: (name: string) => string
  published: string
  updated: string
  attribution: string
  postNotice: string
  postNoticeLink: string
  sourcePreview: string
  sourceTitleLabel: string
  sourceDescriptionLabel: string
  sourcePreviewNote: string
  goToSource: string
  /** 상세 보조 열(배경 보도·공유·태그) 이름. */
  relatedAside: string
  /** 상세 대표 이미지 크레딧 머리(프로그래머 13, 정책 P4). ko `사진: {creditName}` / en `Photo: {creditNameEn}`. */
  photoCreditLabel: string
  /** 공공누리 유형 표기 — 크레딧 바로 뒤(괄호 포함, 영어는 앞에 공백). */
  koglType: (type: number) => string
  /** 공공누리 공식 출처 표시 문구의 요지. */
  koglNotice: (name: string, type: number) => string
  /** 크레딧 옆 원 페이지 링크 문구. */
  photoSourceLink: { public: string; news: string }
  /**
   * `kind: open`(A-2 자료사진) 출처 표시의 고정 낱말(프로그래머 19, 정책 §4.5-11). 값(저작자·저작물명·사이트명·이용조건)은
   * 상세가 `lang`을 붙여 끼워 넣는다.
   */
  openCredit: {
    /** 저작물명 앞뒤(ko 「」, en ""). */
    titleOpen: string
    titleClose: string
    /** 창작년도 괄호(ko는 붙여 쓰고 en은 앞에 공백). */
    year: (year: string) => string
    /** 기증저작물: ko `기증 {기증자}` / en `donated by {donor}`. */
    donatedBy: string
    /** 기증저작물 출처 사이트(공유마당 공식 표시예시). */
    gongu: string
    /** CC0 1.0 표기(크레딧 바로 뒤). */
    cc0: string
    /** CC BY-SA·BY-ND 라이선스 이름 뒤에 항상 붙이는 문구(정책 §4.5-11 · 프로그래머 20). */
    unmodified: string
    /** 퍼블릭 도메인 표기 — `pdBasis`별 고정 문구(정책 §4.5-2 PD 표 "화면 표시 문구"). 괄호는 호출하는 쪽이 감싼다. */
    pd: {
      'us-gov': string
      'expired-author-death': (year: string) => string
      'expired-publication': (year: string) => string
      declared: string
    }
    /** pd 문구를 감싸는 괄호(ko·en 모두 앞에 공백 — 정책 §4.5-11 PD 서식 `사진: {저작자 또는 기관} ({pdBasis 문구})`). */
    pdOpen: string
    pdClose: string
    /** 링크 문구: 원 페이지 · 라이선스 · (pd) 근거 페이지. */
    original: string
    license: string
    basis: string
  }
  photos: string
  photosGroup: (count: number) => string
  body: string
  sources: string
  /** 영어 페이지 출처 목록 위 안내. 한국어 페이지에서는 빈 값(표시하지 않음). */
  sourcesInKorean: string
  tags: string
  correctionBefore: string
  correctionLink: string
  correctionAfter: string
  sourceCheck: string
  /** 상대 언어본으로 가는 상세 링크(한국어 상세 → 영어본, 영어 상세 → 한국어 원문). */
  otherLanguageVersion: string
  /** 영어 피드의 영어본 없는 카드 표시. 한국어 페이지에서는 빈 값(표시하지 않음). */
  koreanOnly: string
  /** 영어 피드 상단 안내(슈퍼바이저 확정 문구). 한국어 페이지에서는 빈 값(표시하지 않음). */
  koreanOnlyFeedNotice: string
  /** 상세 공유 버튼(프로그래머 11, 시안 01 §4). 보이는 텍스트가 곧 접근성 이름이다(리뷰 25 P3-1 — `aria-label` 없음). */
  shareHeading: string
  shareCopyLink: string
  shareCopied: string
  shareCopyFailed: string
  shareCopiedAnnounce: string
  shareCopyFailedAnnounce: string
  shareX: string
  shareThreads: string
  /** 카드 갱신 표시(5a)의 스크린리더 문구 — 보이는 축약 표기("11/04 갱신") 대신 읽힌다(리뷰 25 P2-2). */
  renewedSr: (fullDate: string) => string
}

const ko: Dictionary = {
  skipToContent: '본문으로 건너뛰기',
  mainMenu: '주요 메뉴',
  home: '홈',
  about: '소개',
  languageNav: '언어 선택',
  footerPolicy:
    '모든 게시물은 언론 보도·수사기관 발표·판결문 등 공개된 출처에 근거해 정리하며, 원문을 전재하지 않습니다. 제목·요약은 단정하지 않고 보도를 인용하는 형태로 씁니다.',
  footerPolicyLink: '출처·저작권 정책과 정정·삭제 요청 절차',
  footerTermsLink: '이용약관',
  latestPosts: '최신 게시물',
  feedCount: (total, page, totalPages) => `전체 ${total}건 · ${page} / ${totalPages} 페이지`,
  noPosts: '아직 게시물이 없습니다.',
  paginationNav: '피드 페이지 이동',
  nextPage: '다음 페이지',
  nextPageOf: (page, totalPages) => `${page} / ${totalPages}`,
  pageNumberSr: (page) => `${page}페이지`,
  currentPageSr: (page) => `${page}페이지, 현재 페이지`,
  prevPage: '이전 페이지',
  noPrevPage: '이전 페이지 없음',
  noNextPage: '다음 페이지 없음',
  prev: '이전',
  next: '다음',
  pageOf: (page, totalPages) => `${page} / ${totalPages} 페이지`,
  introMore: '더보기',
  introLess: '접기',
  tagRail: '주제',
  allTopics: (count) => `전체 주제 ${count}개`,
  tagPostCount: (count) => `이 주제로 정리한 게시물 ${count}건`,
  tagFeedHeading: '게시물',
  pageTitle: (page) => `${page}페이지`,
  opensInNewTab: ' (새 창에서 열림)',
  noImage: '대표 이미지 없음',
  noImageLabel: '대표 이미지가 없어 대체 표시된 영역',
  sourcePreviewAlt: (title) => `${title} — 원문 미리보기 이미지`,
  sourceTypes: { url: '링크', photo: '사진', photo_text: '사진+글' },
  sourceKinds: { 언론: '언론', 수사기관: '수사기관', 법원: '법원', 기타: '기타' },
  breadcrumbNav: '현재 위치',
  breadcrumbPost: '게시물',
  speakerSr: '발언자: ',
  submittedBy: (name) => `제보: ${name}`,
  published: '게시',
  updated: '갱신',
  attribution: '출처 표기',
  postNotice: '공개된 보도·발표·자료를 정리한 글입니다. 아래 원문과 배경 보도에서 직접 확인할 수 있습니다.',
  postNoticeLink: '출처·표기 원칙 보기',
  sourcePreview: '원문 미리보기',
  sourceTitleLabel: '원문 제목(출처 인용): ',
  sourceDescriptionLabel: '원문 요약(출처 인용)',
  sourcePreviewNote:
    '원문의 메타 정보(제목·요약)만 인용하며 본문은 전재하지 않습니다. 위 제목·요약은 운영자가 고쳐 쓰지 않은 원문 그대로입니다.',
  goToSource: '원문 기사로 이동',
  relatedAside: '보조 정보',
  photoCreditLabel: '사진: ',
  koglType: (type) => `(공공누리 제${type}유형)`,
  koglNotice: (name, type) => `본 저작물은 ${name}에서 공공누리 제${type}유형으로 개방한 저작물을 이용하였습니다.`,
  photoSourceLink: { public: '원문 페이지', news: '기사 원문' },
  openCredit: {
    titleOpen: '「',
    titleClose: '」',
    year: (year) => `(${year})`,
    donatedBy: '기증 ',
    gongu: '공유마당',
    cc0: '(CC0 1.0 — 저작권 포기)',
    unmodified: ' (변경 없음·크기 조정 외)',
    pd: {
      'us-gov': '미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)',
      'expired-author-death': (year) => `퍼블릭 도메인 — 저작자 ${year} 사망, 보호기간 만료`,
      'expired-publication': (year) => `퍼블릭 도메인 — ${year} 공표, 보호기간 만료`,
      declared: '저작자가 퍼블릭 도메인으로 공개함',
    },
    pdOpen: ' (',
    pdClose: ')',
    original: '원 페이지',
    license: '라이선스',
    basis: '근거 페이지',
  },
  photos: '사진',
  photosGroup: (count) => `사진 ${count}장 — 가로로 넘겨 보세요`,
  body: '본문',
  sources: '배경 보도',
  sourcesInKorean: '',
  tags: '주제',
  correctionBefore: '사실과 다른 내용이 있으면 ',
  correctionLink: '정정·삭제 요청 절차',
  correctionAfter: '를 통해 알려주세요. ',
  sourceCheck: '원문 확인: ',
  otherLanguageVersion: 'Read in English',
  koreanOnly: '',
  koreanOnlyFeedNotice: '',
  shareHeading: '공유',
  shareCopyLink: '링크 복사',
  shareCopied: '복사됨',
  shareCopyFailed: '복사 실패',
  shareCopiedAnnounce: '링크가 복사되었습니다.',
  shareCopyFailedAnnounce: '복사에 실패했습니다. 주소창에서 직접 복사해 주세요.',
  shareX: 'X에 공유',
  shareThreads: '스레드에 공유',
  renewedSr: (fullDate) => `최근 갱신: ${fullDate}`,
}


const en: Dictionary = {
  skipToContent: 'Skip to main content',
  mainMenu: 'Main menu',
  home: 'Home',
  about: 'About',
  languageNav: 'Language',
  footerPolicy:
    'Every post is based on public sources such as news reports, announcements by investigative authorities and court rulings, and does not republish the original. Titles and summaries quote the reports rather than stating conclusions.',
  footerPolicyLink: 'About this site and how to request a correction or removal',
  footerTermsLink: 'Terms',
  latestPosts: 'Latest posts',
  feedCount: (total, page, totalPages) => `${total} ${total === 1 ? 'post' : 'posts'} · Page ${page} of ${totalPages}`,
  noPosts: 'No posts yet.',
  paginationNav: 'Feed pages',
  nextPage: 'Next page',
  nextPageOf: (page, totalPages) => `${page} of ${totalPages}`,
  pageNumberSr: (page) => `Page ${page}`,
  currentPageSr: (page) => `Page ${page}, current page`,
  prevPage: 'Previous page',
  noPrevPage: 'No previous page',
  noNextPage: 'No next page',
  prev: 'Previous',
  next: 'Next',
  pageOf: (page, totalPages) => `Page ${page} of ${totalPages}`,
  introMore: 'More',
  introLess: 'Less',
  tagRail: 'Topics',
  allTopics: (count) => `All ${count} topics`,
  tagPostCount: (count) => `${count} ${count === 1 ? 'post' : 'posts'} on this topic`,
  tagFeedHeading: 'Posts',
  pageTitle: (page) => `Page ${page}`,
  opensInNewTab: ' (opens in a new tab)',
  noImage: 'No image',
  noImageLabel: 'Placeholder shown because there is no featured image',
  sourcePreviewAlt: (title) => `${title} — preview image from the original`,
  sourceTypes: { url: 'Link', photo: 'Photo', photo_text: 'Photo + text' },
  sourceKinds: { 언론: 'News', 수사기관: 'Investigators', 법원: 'Court', 기타: 'Other' },
  breadcrumbNav: 'Breadcrumb',
  breadcrumbPost: 'Post',
  speakerSr: 'Speaker: ',
  submittedBy: (name) => `Submitted by: ${name}`,
  published: 'Published',
  updated: 'Updated',
  attribution: 'Source',
  postNotice:
    'This post summarizes published reports, announcements and records. You can check them yourself in the original and the background reports below.',
  postNoticeLink: 'About this site',
  sourcePreview: 'Original post preview',
  sourceTitleLabel: 'Original title (quoted, in Korean): ',
  sourceDescriptionLabel: 'Original summary (quoted, in Korean)',
  sourcePreviewNote:
    'Only the metadata of the original (title and summary) is quoted; the body is not republished. The title and summary above are shown exactly as in the original, without edits by the operator.',
  goToSource: 'Open the original',
  relatedAside: 'Related',
  photoCreditLabel: 'Photo: ',
  koglType: (type) => ` (KOGL Type ${type})`,
  koglNotice: (name, type) => `This work was released by ${name} under KOGL Type ${type} and is used under that license.`,
  photoSourceLink: { public: 'Source page', news: 'Source article' },
  openCredit: {
    titleOpen: '"',
    titleClose: '"',
    year: (year) => ` (${year})`,
    donatedBy: 'donated by ',
    gongu: 'Gongu Madang',
    cc0: ' (CC0 1.0 — public domain dedication)',
    unmodified: ' (unmodified except resizing)',
    pd: {
      'us-gov': 'US federal government work — public domain in the United States (17 U.S.C. § 105)',
      'expired-author-death': (year) => `Public domain — author died in ${year}; the copyright term has expired`,
      'expired-publication': (year) => `Public domain — published in ${year}; the copyright term has expired`,
      declared: 'Dedicated to the public domain by the author',
    },
    pdOpen: ' (',
    pdClose: ')',
    original: 'Original',
    license: 'License',
    basis: 'Basis page',
  },
  photos: 'Photos',
  photosGroup: (count) => `${count} photos — swipe horizontally`,
  body: 'Body',
  sources: 'Background reports',
  sourcesInKorean: 'Sources are in Korean.',
  tags: 'Topics',
  correctionBefore: 'If anything here is inaccurate, please let us know through the ',
  correctionLink: 'correction and removal request process',
  correctionAfter: '. ',
  sourceCheck: 'Original: ',
  otherLanguageVersion: '한국어 원문 보기',
  koreanOnly: 'Korean only',
  koreanOnlyFeedNotice: 'Posts marked "Korean only" have not been translated yet and open in Korean.',
  shareHeading: 'Share',
  shareCopyLink: 'Copy link',
  shareCopied: 'Copied',
  shareCopyFailed: 'Copy failed',
  shareCopiedAnnounce: 'Link copied.',
  shareCopyFailedAnnounce: 'Copy failed. Please copy the address manually.',
  shareX: 'Share on X',
  shareThreads: 'Share on Threads',
  renewedSr: (fullDate) => `Recently updated: ${fullDate}`,
}

export const DICTIONARY: Record<Locale, Dictionary> = { ko, en }

export function t(locale: Locale): Dictionary {
  return DICTIONARY[locale]
}

/** 언어 전환 링크의 표시 이름. 각 언어 자기 이름으로 적는다. */
export const LANGUAGE_NAMES: Record<Locale, string> = { ko: '한국어', en: 'English' }

/** 언어별 경로 접두사. 한국어는 접두사 없이 기존 URL 그대로다. */
export function localePrefix(locale: Locale): string {
  return locale === 'en' ? '/en' : ''
}

/** 언어별 홈 경로. */
export function homePath(locale: Locale): string {
  return locale === 'en' ? '/en' : '/'
}

export function aboutPath(locale: Locale): string {
  return `${localePrefix(locale)}/about`
}

export function postPath(locale: Locale, id: string): string {
  return `${localePrefix(locale)}/post/${id}`
}

/** 이용약관·운영 정책 페이지(프로그래머 11, D2). */
export function termsPath(locale: Locale): string {
  return `${localePrefix(locale)}/terms`
}

const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

/**
 * `2026-09-29` → 한국어 `2026년 9월 29일` · 영어 `Sep 29, 2026`.
 * `Intl`·`Date`를 쓰지 않고 문자열만 나눈다 — 실행 환경의 시간대·로캘 데이터에 따라 날짜가 하루 밀리는 일이 없다.
 */
export function formatDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  if (locale === 'ko') return `${year}년 ${Number(month)}월 ${Number(day)}일`
  const name = EN_MONTHS[Number(month) - 1]
  if (!name) return iso
  return `${name} ${Number(day)}, ${year}`
}

/**
 * 카드 갱신 표시(5a)의 보이는 축약 표기 — `2026-11-04` → 한국어 `11/04 갱신` · 영어 `Updated Nov 4`(시안 05 §2.3).
 * `formatDate`와 같이 문자열만 나눈다(시간대 영향 없음). 표시 여부 판정은 `lib/content/renewal.ts`.
 */
export function formatShortUpdated(iso: string, locale: Locale): string {
  const [, month, day] = iso.split('-')
  if (!month || !day) return iso
  if (locale === 'ko') return `${month}/${day} 갱신`
  const name = EN_MONTHS[Number(month) - 1]
  return name ? `Updated ${name} ${Number(day)}` : iso
}

/** 한글(완성형·자모)이 들어 있는가. 영어 페이지에서 한국어 원문 조각에 `lang="ko"`를 달 때 쓴다. */
export function hasHangul(text: string): boolean {
  return /[ᄀ-ᇿ㄰-㆏가-힣]/.test(text)
}

/** 영어 페이지 안의 한국어 조각이면 `lang="ko"`, 아니면 속성 없음. 한국어 페이지에서는 항상 속성 없음. */
export function langFor(text: string, locale: Locale): 'ko' | undefined {
  return locale === 'en' && hasHangul(text) ? 'ko' : undefined
}

/**
 * 괄호(반각·전각) 안을 걷어낸 나머지. 중첩 괄호도 안쪽부터 반복해서 걷어낸다.
 * 영어 표기 안의 고유명사 병기(`Instagram @im_nowandhere (나우앤히어)`)를 가려내는 데 쓴다.
 */
export function stripParentheses(text: string): string {
  let stripped = text
  for (;;) {
    const next = stripped.replace(/\([^()]*\)/g, ' ').replace(/（[^（）]*）/g, ' ')
    if (next === stripped) return stripped
    stripped = next
  }
}

/**
 * 영어 번역이 가능한 필드(출처 표기·발언자 소속)용 `lang`.
 * 괄호 밖에도 한글이 있으면 한국어 원본 값이므로 요소 전체가 `lang="ko"`, 괄호 안에만 있으면 영어 표기이므로 속성 없음
 * (괄호 안 한국어는 `MixedLangText`가 따로 `lang="ko"`를 단다). 한국어 페이지에서는 항상 속성 없음.
 */
export function langForTranslatable(text: string, locale: Locale): 'ko' | undefined {
  return locale === 'en' && hasHangul(stripParentheses(text)) ? 'ko' : undefined
}
