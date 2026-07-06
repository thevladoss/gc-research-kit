import { CorpusField } from '../components/CorpusField'
import { Counter } from '../components/Counter'
import { Reveal } from '../components/Reveal'
import { ThesisChain } from '../components/ThesisChain'
import { stats } from '../data/generated/stats'
import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

function SectionHead({ eyebrow, h2 }: { eyebrow: string; h2: string }) {
  return (
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">{h2}</h2>
    </div>
  )
}

function Hero() {
  const { t, fmtInt, fmtPct } = useI18n()
  const numbers = [
    { key: 'claims', value: stats.claims_total, fmt: (n: number) => fmtInt(Math.round(n)) },
    {
      key: 'supportedShare',
      value: stats.supported_share_of_checkable,
      fmt: (n: number) => fmtPct(n),
    },
    { key: 'discrepancies', value: stats.confirmed_discrepancies, fmt: (n: number) => fmtInt(Math.round(n)) },
    { key: 'adjudicated', value: stats.disputed_adjudicated, fmt: (n: number) => fmtInt(Math.round(n)) },
  ] as const
  return (
    <section className="relative overflow-hidden">
      <CorpusField />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 md:px-8 md:pt-24">
      <Reveal>
        <div className="eyebrow">{t('home.eyebrow')}</div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.12] text-ink md:text-[3.4rem]">
          {t('home.h1')}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-3xl text-[1.0625rem] leading-relaxed text-ink">{t('home.lede')}</p>
      </Reveal>
      <Reveal delay={0.15}>
        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.key}>
              <dd className="font-display text-5xl text-ink tabular-nums md:text-6xl">
                <Counter value={n.value} format={n.fmt} />
              </dd>
              <dt className="mt-2 max-w-[16rem] text-[0.8125rem] leading-snug text-ink-soft">
                {t(`home.stats.${n.key}`)}
                {n.key === 'discrepancies' && (
                  <span className="mt-1 block text-[0.75rem] text-v-anach-ink">
                    {t('home.stats.discrepanciesNote')}
                  </span>
                )}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
      </div>
    </section>
  )
}

function ChainSection() {
  const { t } = useI18n()
  return (
    <section className="border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionHead eyebrow={t('home.chain.eyebrow')} h2={t('home.chain.h2')} />
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
            {t('home.chain.intro')}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <ThesisChain />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PipelineSection() {
  const { t } = useI18n()
  const steps = ['1', '2', '3', '4'] as const
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionHead eyebrow={t('home.pipeline.eyebrow')} h2={t('home.pipeline.h2')} />
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s} delay={0.06 * i}>
              <div className="border-t-2 border-brass pt-4">
                <div className="font-mono text-[0.75rem] text-binding">0{s}</div>
                <h3 className="mt-1 font-display text-xl text-ink">
                  {t(`home.pipeline.steps.${s}.title`)}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                  {t(`home.pipeline.steps.${s}.text`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <a
            href={href.method}
            className="mt-10 inline-block font-mono text-[0.75rem] text-binding uppercase underline decoration-line underline-offset-4 hover:decoration-binding"
          >
            {t('home.pipeline.link')} →
          </a>
        </Reveal>
      </div>
    </section>
  )
}

// знак карточки: чем закончилась проверка для книги в этой находке
const findingCards = [
  { key: 'quotes', accent: 'var(--color-v-supported)', to: href.explorer },
  { key: 'inherited', accent: 'var(--color-v-anach)', to: href.map },
  { key: 'reformation', accent: 'var(--color-v-supported)', to: href.chain(3) },
  { key: 'waldenses', accent: 'var(--color-v-improbable)', to: href.chain(2) },
  { key: 'absolutes', accent: 'var(--color-v-anach)', to: href.dossiers },
  { key: 'pella', accent: 'var(--color-v-improbable)', to: href.chain(1) },
] as const

function FindingsSection() {
  const { t } = useI18n()
  return (
    <section className="border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionHead eyebrow={t('home.findings.eyebrow')} h2={t('home.findings.h2')} />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {findingCards.map((c, i) => (
            <Reveal key={c.key} delay={0.05 * i}>
              <a
                href={c.to}
                className="group flex h-full flex-col border border-line bg-paper-deep px-6 py-5 no-underline transition-colors hover:border-binding"
                style={{ borderTopWidth: 3, borderTopColor: c.accent }}
              >
                <h3 className="font-display text-xl leading-snug text-ink">
                  {t(`home.findings.cards.${c.key}.title`)}
                </h3>
                <p className="mt-2 grow text-[0.875rem] leading-relaxed text-ink-soft">
                  {t(`home.findings.cards.${c.key}.text`)}
                </p>
                <span className="mt-4 font-mono text-[0.6875rem] text-binding uppercase group-hover:underline">
                  {t(`home.findings.cards.${c.key}.link`)} →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BoundarySection() {
  const { t } = useI18n()
  return (
    <section className="bg-binding">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="eyebrow" style={{ color: '#cbbd96' }}>
            {t('home.boundary.eyebrow')}
          </div>
          <h2 className="mt-2 font-display text-3xl text-paper md:text-4xl">
            {t('home.boundary.h2')}
          </h2>
          <p className="mt-5 max-w-3xl text-[1rem] leading-relaxed text-paper/90">
            {t('home.boundary.text')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <main>
      <Hero />
      <ChainSection />
      <PipelineSection />
      <FindingsSection />
      <BoundarySection />
    </main>
  )
}
