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
  latestPosts: string
  feedCount: (total: number, page: number, totalPages: number) => string
  noPosts: string
  paginationNav: string
  loadMore: string
  loadMoreSr: (page: number) => string
  prev: string
  next: string
  pageOf: (page: number, totalPages: number) => string
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
  latestPosts: '최신 게시물',
  feedCount: (total, page, totalPages) => `전체 ${total}건 · ${page} / ${totalPages} 페이지`,
  noPosts: '아직 게시물이 없습니다.',
  paginationNav: '피드 페이지 이동',
  loadMore: '더 보기',
  loadMoreSr: (page) => ` — ${page}페이지로 이동`,
  prev: '이전',
  next: '다음',
  pageOf: (page, totalPages) => `${page} / ${totalPages} 페이지`,
  pageTitle: (page) => `${page}페이지`,
  opensInNewTab: ' (새 창에서 열림)',
  noImage: '이미지 없음',
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
    '원문의 메타 정보(제목·요약·썸네일)만 인용하며 본문은 전재하지 않습니다. 위 제목·요약은 운영자가 고쳐 쓰지 않은 원문 그대로입니다.',
  goToSource: '원문 기사로 이동',
  photos: '사진',
  photosGroup: (count) => `사진 ${count}장 — 가로로 넘겨 보세요`,
  body: '본문',
  sources: '배경 보도',
  sourcesInKorean: '',
  tags: '태그',
  correctionBefore: '사실과 다른 내용이 있으면 ',
  correctionLink: '정정·삭제 요청 절차',
  correctionAfter: '를 통해 알려주세요. ',
  sourceCheck: '원문 확인: ',
  otherLanguageVersion: 'Read in English',
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
  latestPosts: 'Latest posts',
  feedCount: (total, page, totalPages) => `${total} ${total === 1 ? 'post' : 'posts'} · Page ${page} of ${totalPages}`,
  noPosts: 'No posts yet.',
  paginationNav: 'Feed pages',
  loadMore: 'Load more',
  loadMoreSr: (page) => ` — go to page ${page}`,
  prev: 'Previous',
  next: 'Next',
  pageOf: (page, totalPages) => `Page ${page} of ${totalPages}`,
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
    'Only the metadata of the original (title, summary, thumbnail) is quoted; the body is not republished. The title and summary above are shown exactly as in the original, without edits by the operator.',
  goToSource: 'Open the original',
  photos: 'Photos',
  photosGroup: (count) => `${count} photos — swipe horizontally`,
  body: 'Body',
  sources: 'Background reports',
  sourcesInKorean: 'Sources are in Korean.',
  tags: 'Tags',
  correctionBefore: 'If anything here is inaccurate, please let us know through the ',
  correctionLink: 'correction and removal request process',
  correctionAfter: '. ',
  sourceCheck: 'Original: ',
  otherLanguageVersion: '한국어 원문 보기',
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
