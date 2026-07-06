import { Reveal } from '../components/Reveal'
import { FiveStepScale } from '../components/FiveStepScale'
import { QuoteText } from '../components/QuoteText'
import { SubtractionPassage } from '../components/SubtractionPassage'
import { SectionDivider } from '../components/Ornament'
import { AssessmentChips } from '../components/ThesisChain'
import { chainAssessment } from '../data/generated/chainAssessment'
import { chainDetail, type ClaimBrief } from '../data/generated/chainDetail'
import { chainPassages } from '../data/generated/chainPassages'
import { thesisChain } from '../data/generated/chain'
import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'
import { labelKeyColor, outcomeStyle } from '../lib/verdicts'

function Chip({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-block rounded-sm border border-line px-1.5 py-px font-mono text-[0.625rem] tracking-wide"
      style={{ color: color ?? 'var(--color-ink-soft)' }}
    >
      {children}
    </span>
  )
}

function ClaimRow({ claim }: { claim: ClaimBrief }) {
  const { t, tp } = useI18n()
  const c = labelKeyColor[claim.labelKey]
  const note = t(`claimNotes.${claim.id}`)
  return (
    <li className="border-t border-line py-4 first:border-t-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide uppercase"
          style={{ color: c.ink }}
        >
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c.fill }} />
          {t(`verdicts.${claim.labelKey}`)}
        </span>
        {claim.loadBearing && <Chip color="var(--color-binding)">{t('chainPage.item.loadBearing')}</Chip>}
        {claim.chainInherited && <Chip>{t('chainPage.item.inherited')}</Chip>}
        {claim.period === 'period-scholarship' && <Chip>{t('chainPage.item.periodScholarship')}</Chip>}
        {claim.period === 'expositor-tradition' && <Chip>{t('chainPage.item.expositorTradition')}</Chip>}
      </div>
      <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-ink">{note}</p>
      <QuoteText
        en={claim.quote}
        ru={claim.quoteRu}
        enKey={claim.enKey}
        className="measure mt-2 text-[0.9375rem]"
      />
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={href.explorerWith({ id: claim.id })}
          className="font-mono text-[0.6875rem] text-ink-soft underline decoration-line underline-offset-4 hover:text-binding"
        >
          {tp('chainPage.item.ref', { ch: claim.chapter, p: claim.paragraph })} · {claim.id}
        </a>
        {claim.adjudicated && claim.adjudicated.asWritten !== 'out-of-scope' && (
          <FiveStepScale asWritten={claim.adjudicated.asWritten} weakened={claim.adjudicated.weakened} width={190} />
        )}
      </div>
    </li>
  )
}

function Group({
  titleKey,
  claims,
  accent,
}: {
  titleKey: string
  claims: readonly ClaimBrief[]
  accent: string
}) {
  const { t } = useI18n()
  if (!claims.length) return null
  return (
    <Reveal>
      <section className="mt-12">
        <h2
          className="border-t-2 pt-3 font-display text-2xl text-ink"
          style={{ borderTopColor: accent }}
        >
          {t(titleKey)}
        </h2>
        <ul className="mt-4">
          {claims.map((c) => (
            <ClaimRow key={c.id} claim={c} />
          ))}
        </ul>
      </section>
    </Reveal>
  )
}

export function ChainPage({ link }: { link: number }) {
  const { t, tp } = useI18n()
  const assessment = chainAssessment[link - 1]
  const detail = chainDetail[link - 1]
  const passage = chainPassages.find((p) => p.link === link)!
  const prev = link > 1 ? thesisChain[link - 2] : null
  const next = link < 7 ? thesisChain[link] : null

  return (
    <main>
      {/* шапка звена */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="decor-numeral top-[-0.08em] right-[2%] hidden text-[22rem] lg:block"
        >
          {link}
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-10 md:px-8">
      <Reveal>
        <div className="eyebrow">{tp('chainPage.eyebrow', { n: link })}</div>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-display text-3xl text-ink md:text-[2.6rem] md:leading-tight">
            {t(`home.chain.links.${link}.title`)}
          </h1>
          <span className="font-mono text-[0.75rem] text-ink-soft">
            {t(`home.chain.links.${link}.chapters`)}
          </span>
          <AssessmentChips a={assessment} detail />
        </div>
        <p className="drop-cap measure mt-5 text-[1rem] leading-relaxed text-ink">
          {t(`chainPages.${link}.intro`)}
        </p>
      </Reveal>
        </div>
      </section>

      {/* что утверждает книга: пассаж с режимом вычитания */}
      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-2xl text-ink">{t('chainPage.passage.heading')}</h2>
            <div className="mt-5">
              <SubtractionPassage passage={passage} />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
      {/* группы утверждений */}
      <Group titleKey="chainPage.groups.stands" claims={detail.stands} accent={outcomeStyle.stands.fill} />
      <Group titleKey="chainPage.groups.fallen" claims={detail.fallen} accent={outcomeStyle.fallen.fill} />
      <Group titleKey="chainPage.groups.open" claims={detail.open} accent={outcomeStyle.open.fill} />
      <Group
        titleKey="chainPage.groups.conditional"
        claims={detail.conditional}
        accent={outcomeStyle.conditional.fill}
      />

      {/* вычитание: что остаётся */}
      <div className="mt-16">
        <SectionDivider />
      </div>
      <Reveal>
        <section className="mt-8 border border-line bg-paper-deep px-6 py-8 md:px-10">
          <h2 className="font-display text-2xl text-ink">{t('chainPage.subtraction.heading')}</h2>
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink">
            {t(`chainPages.${link}.after`)}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {(['A', 'B'] as const).map((f) => (
              <div key={f} className="border-t-2 border-brass pt-4">
                <div className="eyebrow">{t(`chainPage.subtraction.formula${f}Head`)}</div>
                <p className="mt-3 font-display text-[1.1rem] leading-relaxed text-ink">
                  {t(`chainPage.subtraction.formula${f}`)}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[0.875rem] leading-relaxed text-ink-soft">
            {t('chainPage.subtraction.outro')}
          </p>
        </section>
      </Reveal>

      {/* навигация между звеньями */}
      <nav className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        {prev ? (
          <a href={href.chain(prev.link)} className="group max-w-[45%] no-underline">
            <div className="font-mono text-[0.6875rem] text-ink-soft uppercase">
              ← {t('chainPage.nav.prev')}
            </div>
            <div className="mt-1 font-display text-base text-binding group-hover:underline">
              {t(`home.chain.links.${prev.link}.title`)}
            </div>
          </a>
        ) : (
          <span />
        )}
        <a
          href={href.home}
          className="font-mono text-[0.6875rem] text-ink-soft uppercase underline decoration-line underline-offset-4 hover:text-binding"
        >
          {t('chainPage.nav.all')}
        </a>
        {next ? (
          <a href={href.chain(next.link)} className="group max-w-[45%] text-right no-underline">
            <div className="font-mono text-[0.6875rem] text-ink-soft uppercase">
              {t('chainPage.nav.next')} →
            </div>
            <div className="mt-1 font-display text-base text-binding group-hover:underline">
              {t(`home.chain.links.${next.link}.title`)}
            </div>
          </a>
        ) : (
          <span />
        )}
      </nav>
      </div>
    </main>
  )
}
