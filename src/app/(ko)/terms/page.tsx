import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { ContactPendingNotice, PageSection as Section } from '@/components/page-section'
import { SITE } from '@/lib/config'
import { aboutPath } from '@/lib/i18n'
import { languageAlternates, termsJsonLd } from '@/lib/seo'

/**
 * 이용약관·운영 정책(D2 "지금 신설", 프로그래머 11). 구조는 시안 02, 문안은 `planning/terms-page-copy.md` 한국어 원문 그대로다.
 * 문안 안의 작성 이력 메모("09-1 수정 — 리뷰 24 …")와 기획 메모(연락 경로 "사용자 결정 필요" 인용 상자)는 화면 문구가 아니라 옮기지 않았다.
 * 연락 창구: 사용자 결정 4c — "준비 중" 상자 + "처리 기준은 연락 창구가 확정된 뒤부터 적용" 문장(시안 02 §3.1, 오더 11 슈퍼바이저 판단 1).
 */
export const metadata: Metadata = {
  title: '이용약관·운영 정책',
  description: `${SITE.name}의 운영 목적, 출처 원칙, 정정·삭제 요청 처리 기준, 익명 운영과 게시물 성격을 안내합니다.`,
  alternates: { canonical: '/terms', languages: languageAlternates('/terms', '/en/terms') },
}

export default function TermsPage() {
  return (
    <PageFrame locale="ko" languageLinks={{ ko: '/terms', en: '/en/terms' }}>
      <div className="reading-page mx-auto w-full space-y-10 pt-5">
        <header className="space-y-3">
          <h1 className="text-[26px] leading-[1.3] font-bold tracking-[-0.02em] md:text-[30px]">이용약관·운영 정책</h1>
          <p className="text-xs text-muted-foreground">
            최종 개정: <time dateTime={SITE.termsLastUpdated}>{SITE.termsLastUpdated}</time>
          </p>
          <p className="text-muted-foreground">
            이 페이지는 이 사이트가 어떻게 운영되는지, 어떤 출처를 쓰는지, 문제가 있을 때 어떻게 연락하는지를 안내합니다.
          </p>
        </header>

        <Section id="purpose" title="운영 목적">
          <p className="text-sm">
            이 사이트는 정책 비판·정치인 발언·논평·안보 현안 등 정치·시사 이슈를 공개된 보도와 자료에서 골라 카드형으로
            정리해 보여주는 소식지입니다. 운영자가 직접 취재하지 않고, 이미 공표된 보도·발표·판결을 모아 정리하는 것이 이
            사이트가 하는 일입니다.
          </p>
        </Section>

        <Section id="no-reporting" title="직접 취재하지 않음">
          <p className="text-sm">
            이 사이트의 모든 게시물은 <strong className="font-semibold">이미 공개된 보도·공식 발표·판결을 출처로</strong>{' '}
            작성합니다. 운영자가 현장을 취재하거나 독자적으로 사실을 확인해 보도를 생산하지 않습니다. 게시물의 요약·제목은
            출처가 보도한 내용을 벗어나지 않도록 작성하며, 출처가 확인해 주지 않은 내용은 요약에 넣지 않습니다.
            정치인·공직자 등의 발언·게시물을 소개하는 경우에는 원문 링크와 함께, 그 내용을 뒷받침하거나 배경이 되는 보도를
            &ldquo;배경 보도&rdquo;로 함께 표시합니다.
          </p>
        </Section>

        <Section id="sourcing" title="출처 원칙">
          <ul className="space-y-2 text-sm">
            <li>
              근거로 삼는 출처는 언론사 보도, 수사기관(검찰·경찰·국가정보원 등)의 공식 발표·보도자료, 공개된 법원
              판결문입니다.
            </li>
            <li>
              언론사는 「신문 등의 진흥에 관한 법률」에 따라{' '}
              <strong className="font-semibold">등록된 신문·인터넷신문</strong>(제2조 1호·2호 정의 충족)을 기준으로 보고,
              뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다. 미등록
              매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다. 소개 문구의 &ldquo;신문법 등에 따라 등록된
              매체&rdquo;는 위 기준 전체를 줄여 부른 표현입니다. 매체 종류에 따라 근거 법령과 절차(등록·허가·승인 등)가
              다르며, 근거 법령은 위에 적은 대로입니다.
            </li>
            <li>
              모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게
              인용합니다 —{' '}
              <strong className="font-semibold">
                운영자가 쓰는 요약과 본문에는 기사 요약이나 본문을 그대로 옮기지 않습니다
              </strong>
              . 다만 상세 페이지의 &lsquo;원문 미리보기&rsquo;에는 원문이 공개한 메타 정보(제목·요약)가 인용 표시와 함께
              고치지 않은 그대로 나올 수 있으며, 그 사실을 같은 자리에 밝혀 둡니다.
            </li>
            <li>
              제목과 요약은 단정하지 않고 인용하는 형태로 씁니다(&ldquo;~로 보도됨&rdquo;·&ldquo;~라는 의혹이
              제기됨&rdquo; 등).
            </li>
          </ul>
        </Section>

        <Section id="correction" title="정정·삭제 요청 방법과 처리 기준">
          <p className="text-sm">
            사실과 다른 내용이 있거나, 원문 이미지 사용 중단, 게시물 삭제를 요청하려면 아래 연락 경로로 알려주시기 바랍니다.
          </p>
          {SITE.contactEmail ? (
            <p className="rounded-[var(--radius-card)] border bg-surface p-4 text-sm">
              이메일{' '}
              <a href={`mailto:${SITE.contactEmail}`} className="text-link underline underline-offset-2">
                {SITE.contactEmail}
              </a>
            </p>
          ) : (
            <>
              <ContactPendingNotice>연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다.</ContactPendingNotice>
              <p className="text-xs text-muted-foreground">아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다.</p>
            </>
          )}
          <p className="text-sm">
            <strong className="font-semibold">처리 기준</strong> (두 기준을 구분해 둡니다):
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong className="font-semibold">서비스 기준</strong>(이 사이트가 스스로 정한 운영 기준): 접수 후{' '}
              <strong className="font-semibold">영업일 3일 이내에 1차 답변</strong>을 드립니다. 법에서 정한 기한이 아니라 이
              사이트가 스스로 정한 기준입니다.
            </li>
            <li>
              <strong className="font-semibold">&ldquo;지체 없이&rdquo; 조치</strong>: 요청 내용을 확인한 뒤에는{' '}
              <strong className="font-semibold">지체 없이</strong> 필요한 조치(게시물 수정, 비공개, 이미지 교체 등)를
              취합니다. 권리 침해 여부 판단이 어렵거나 다툼이 예상되는 경우에는 임시로 접근을 제한하는 조치를 할 수
              있습니다. 이 임시 제한은 <strong className="font-semibold">최대 30일</strong>을 운영 기준으로 두고, 그 안에
              계속 제한할지·조치를 끝낼지를 정합니다.
            </li>
            <li>
              위 절차는 이 사이트가 <strong className="font-semibold">자율적으로 운영하는 정책</strong>입니다. 관련
              법령(정보통신망법 제44조의2 등)이 이 사이트에 적용되는지는 <strong className="font-semibold">확인 필요</strong>{' '}
              상태이며, 적용 여부와 무관하게 이 절차를 운영합니다.{' '}
              <strong className="font-semibold">
                적용되는 것으로 확인되면, 그 법령이 정한 절차(정보통신망법 제44조의2, 해당하는 경우 언론중재법
                제14조·제17조의2)를 따릅니다.
              </strong>
            </li>
          </ul>
        </Section>

        <Section id="anonymous" title="익명 운영과 연락 경로">
          <p className="text-sm">
            이 사이트는 운영자의 실명·소속·직함을 공개하지 않고 <strong className="font-semibold">익명으로 운영</strong>
            합니다. 회원 가입·댓글·후원 기능이 없습니다. 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는
            GA4로 집계되고 정정·삭제 요청 시 보내주신 연락처(이메일 등)는 응답 목적으로만 씁니다. 이 설명이
            개인정보보호법상 요구되는 고지를 전부 충족하는지는 <strong className="font-semibold">확인 필요</strong>입니다.
            운영자와의 연락은 위 &lsquo;정정·삭제 요청 방법과 처리 기준&rsquo; 절의 연락 경로를 통해서만 가능합니다.
          </p>
        </Section>

        <Section id="nature" title="게시물 성격">
          <p className="text-sm">
            이 사이트의 게시물은 <strong className="font-semibold">보도를 모아 정리한 것</strong>입니다. 이 표현은 이
            사이트가 「신문 등의 진흥에 관한 법률」상 인터넷신문·인터넷뉴스서비스 등에 해당하는지와는 무관하며, 운영자가
            자신의 게시물을 어떤 성격으로 규정하는지를 설명하는 것일 뿐 법적 성격을 정하는 것은 아닙니다.
          </p>
        </Section>

        <p className="border-t pt-6 text-sm">
          <Link href={aboutPath('ko')} className="inline-flex min-h-11 items-center text-link underline underline-offset-2">
            소개로 돌아가기
          </Link>
        </p>

        <JsonLd data={termsJsonLd()} />
      </div>
    </PageFrame>
  )
}
