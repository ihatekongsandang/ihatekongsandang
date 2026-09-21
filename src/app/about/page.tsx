import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { Badge } from '@/components/ui/badge'
import { SITE } from '@/lib/config'
import { STATUS_DEFINITIONS, STATUS_LABELS } from '@/lib/content/schema'
import { aboutJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '소개',
  description: `${SITE.name}의 운영 방식, 출처·저작권 정책, 상태 라벨 정의, 정정·삭제 요청 절차를 안내합니다.`,
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
          <li>게시물은 언론 보도·수사기관 발표·법원 판결문 등 공개된 출처를 정리한 것입니다.</li>
          <li>
            열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 방문자에게서 개인정보를 수집하지
            않습니다.
          </li>
        </ul>
      </Section>

      <Section id="status-labels" title="상태 라벨 정의">
        <p className="text-sm text-muted-foreground">
          모든 게시물은 사실 확인이 어느 단계까지 이루어졌는지 라벨로 표기합니다. 기소는 검사의 공소 제기이며 유죄
          판단이 아닙니다. 헌법과 형사소송법은 유죄 판결이 확정될 때까지 무죄로 추정한다고 정하고 있으므로, 이
          사이트는 기소 단계를 &lsquo;확정&rsquo;이라고 표기하지 않습니다.
        </p>
        <dl className="space-y-3">
          {STATUS_LABELS.map((label) => (
            <div key={label} className="flex flex-col gap-1.5 border-t pt-3 sm:flex-row sm:gap-4">
              <dt className="sm:w-28 sm:shrink-0">
                <Badge
                  tone={
                    label === '의혹'
                      ? 'doubt'
                      : label === '수사중'
                        ? 'investigating'
                        : label === '기소'
                          ? 'indicted'
                          : label === '유죄판결'
                            ? 'convicted'
                            : 'closed'
                  }
                >
                  {label}
                </Badge>
              </dt>
              <dd className="text-sm text-muted-foreground">{STATUS_DEFINITIONS[label]}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-muted-foreground">
          사건이 진행되면 새 게시물을 만들지 않고 같은 게시물의 라벨을 갱신하며, 상세 페이지에 갱신 이력을 남깁니다.
          무혐의·불기소·무죄 등으로 끝난 사건도 게시물을 지우지 않고 <strong className="font-semibold">종결</strong>{' '}
          라벨로 갱신해 결과가 함께 보이도록 합니다.
        </p>
      </Section>

      <Section id="sources" title="출처·저작권 정책">
        <ul className="space-y-2 text-sm">
          <li>게시물마다 근거가 된 출처를 최소 1건 이상 링크로 표기합니다. 출처 없는 게시물은 올리지 않습니다.</li>
          <li>
            외부 기사는 <strong className="font-semibold">본문을 전재하지 않습니다.</strong> 원문의 메타 정보(제목·요약·
            썸네일)만 인용하고, 원문 링크를 함께 제공합니다.
          </li>
          <li>원문 썸네일은 원 사이트의 이미지를 그대로 참조(핫링크)하며 이 사이트에 복제해 두지 않습니다.</li>
          <li>
            공유 미리보기 이미지에는 원문 썸네일을 쓰지 않고 이 사이트의 자체 이미지를 씁니다. 인물의 얼굴이 식별되는
            원문 썸네일은 사용하지 않고 대체 이미지로 표시합니다.
          </li>
          <li>운영자가 제목·요약을 직접 쓸 때는 단정 표현을 쓰지 않고 보도·발표를 인용하는 형태로 적습니다.</li>
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
            원 출처를 다시 확인한 뒤 상태 라벨 갱신·게시물 수정·비공개 중 필요한 조치를 취하고, 이미지 사용 중단
            요청은 확인 즉시 대체 이미지로 바꿉니다.
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
