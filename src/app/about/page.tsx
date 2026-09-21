import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { SITE } from '@/lib/config'
import { aboutJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '소개',
  description: `${SITE.name}의 운영 방식, 출처 정책, 표기 원칙, 정정·삭제 요청 절차를 안내합니다.`,
  alternates: { canonical: '/about' },
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">소개</h1>
        <p className="text-muted-foreground">{SITE.description}</p>
      </header>

      <Section id="operation" title="운영 방식">
        <ul className="space-y-2 text-sm">
          <li>
            이 사이트는 <strong className="font-semibold">익명으로 운영</strong>합니다. 운영자의 실명·소속·직함을
            공개하지 않습니다.
          </li>
          <li>
            정책 비판·정치인 발언·논평·안보 현안 등 정치·시사 이슈를 공개된 보도와 자료에서 골라 카드로 정리합니다.
          </li>
          <li>
            열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 방문자에게서 개인정보를 수집하지
            않습니다.
          </li>
        </ul>
      </Section>

      <Section id="sources" title="출처 정책">
        <ul className="space-y-2 text-sm">
          <li>
            게시물은 <strong className="font-semibold">공개된 출처에 근거해서만</strong> 올립니다. 근거로 삼는 것은
            언론사 보도, 수사기관(검찰·경찰·국가정보원 등)의 공식 발표·보도자료, 공개된 법원 판결문입니다.
          </li>
          <li>
            언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문, 뉴스통신사, 방송사업자를
            기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.
          </li>
          <li>
            발언·게시물을 소개할 때는 원문 링크를 함께 두고, 그 내용을 뒷받침하거나 배경이 되는 보도를{' '}
            <strong className="font-semibold">&lsquo;배경 보도&rsquo;</strong> 목록으로 표시합니다.
          </li>
          <li>검색으로 확인하지 못한 주장은 요약에 넣지 않습니다.</li>
        </ul>
      </Section>

      <Section id="wording" title="표기 원칙">
        <ul className="space-y-2 text-sm">
          <li>
            제목과 요약은 <strong className="font-semibold">단정하지 않고 인용하는 형태</strong>로 씁니다. &ldquo;~로
            보도됨&rdquo;·&ldquo;~라는 의혹이 제기됨&rdquo;·&ldquo;~라고 비판함&rdquo;처럼 적고, &ldquo;~가
            밝혀졌다&rdquo; 같은 단정 서술을 쓰지 않습니다.
          </li>
          <li>
            법원이 확정하지 않은 죄명을 운영자가 스스로 붙이지 않고, 발언자의 의도나 숨은 목적을 단정하지 않습니다.
          </li>
          <li>
            사실 확인이 어디까지 된 일인지는 <strong className="font-semibold">요약 문장과 출처 목록</strong>으로
            전달합니다. 카드에 단계를 나타내는 라벨을 붙이지 않습니다 — 한 단어짜리 라벨은 진행 중인 사안을
            실제보다 확정적으로 읽히게 만들기 때문입니다.
          </li>
        </ul>
      </Section>

      <Section id="copyright" title="인용·저작권">
        <ul className="space-y-2 text-sm">
          <li>
            외부 글은 <strong className="font-semibold">본문을 전재하지 않습니다.</strong> 원문의 메타
            정보(제목·요약·썸네일)만 인용하고 원문 링크를 함께 제공합니다.
          </li>
          <li>원문 썸네일은 원 사이트의 이미지를 그대로 참조(핫링크)하며 이 사이트에 복제해 두지 않습니다.</li>
          <li>
            공유 미리보기 이미지에는 원문 썸네일을 쓰지 않고 이 사이트의 자체 이미지를 씁니다. 인물의 얼굴이
            식별되는 원문 썸네일은 사용하지 않고 대체 이미지로 표시합니다.
          </li>
        </ul>
      </Section>

      <Section id="correction" title="정정·삭제 요청">
        <p className="text-sm">
          사실과 다른 내용, 원문 이미지 사용 중단, 게시물 삭제 요청은 아래로 알려주세요.
        </p>
        <p className="rounded-[var(--radius-card)] border bg-surface p-4 text-sm">
          이메일{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="text-link underline underline-offset-2">
            {SITE.contactEmail}
          </a>
          <br />
          <span className="text-xs text-muted-foreground">
            ※ 연락 채널은 확정 전 임시 주소입니다. 확정되면 이 페이지를 갱신합니다.
          </span>
        </p>
        <ul className="space-y-2 text-sm">
          <li>접수 후 3영업일 이내에 1차 답변을 드립니다(법정 기한이 아닌 자체 기준입니다).</li>
          <li>
            원 출처를 다시 확인한 뒤 게시물 수정·비공개 중 필요한 조치를 취하고, 이미지 사용 중단 요청은 확인 즉시
            대체 이미지로 바꿉니다.
          </li>
        </ul>
      </Section>

      <p className="border-t pt-6 text-sm">
        <Link href="/" className="text-link underline underline-offset-2">
          최신 게시물 보기
        </Link>
      </p>

      <JsonLd data={aboutJsonLd()} />
    </div>
  )
}
