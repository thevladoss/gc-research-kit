import { DirectionBar } from '../components/DirectionBar'
import { Reveal } from '../components/Reveal'
import { dataMeta } from '../data/generated/meta'
import { stats } from '../data/generated/stats'
import { useI18n } from '../lib/i18n'

const REPO = 'https://github.com/thevladoss/gc-research-kit'

function openMail() {
  const user = ['osin', 'vladik', '1'].join('')
  const host = ['gmail', 'com'].join('.')
  window.location.href = `mailto:${user}@${host}`
}

function SectionHead({ id, eyebrow, h2 }: { id?: string; eyebrow: string; h2: string }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-2 font-display text-2xl text-ink md:text-3xl">{h2}</h2>
    </div>
  )
}

/** Конвейер: вертикальный таймлайн из четырёх стадий. */
function PipelineTimeline() {
  const { t, tp, fmtInt } = useI18n()
  const steps = [
    { key: '1', stat: tp('methodPage.pipeline.stat1', { n: fmtInt(stats.claims_total) }) },
    { key: '2', stat: tp('methodPage.pipeline.stat2', { n: fmtInt(stats.checkable_total) }) },
    {
      key: '3',
      stat: tp('methodPage.pipeline.stat3', {
        full: stats.defense.full_reversals,
        down: stats.defense.downgrades,
      }),
    },
    { key: '4', stat: tp('methodPage.pipeline.stat4', { n: stats.disputed_adjudicated }) },
  ] as const
  return (
    <ol className="mt-8 space-y-0 border-l-2 border-brass pl-7">
      {steps.map((s, i) => (
        <Reveal key={s.key} delay={0.08 * i}>
          <li className="relative pb-9">
            <span
              aria-hidden="true"
              className="absolute top-0.5 -left-[38px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-brass bg-paper font-mono text-[0.6875rem] text-binding"
            >
              {s.key}
            </span>
            <h3 className="font-display text-xl text-ink">{t(`home.pipeline.steps.${s.key}.title`)}</h3>
            <p className="measure mt-1.5 text-[0.9075rem] leading-relaxed text-ink-soft">
              {t(`methodPage.pipeline.long${s.key}`)}
            </p>
            <p className="mt-1.5 font-mono text-[0.75rem]" style={{ color: 'var(--color-binding)' }}>
              {s.stat}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}

function Glossary() {
  const { t } = useI18n()
  const rows = Array.from({ length: 18 }, (_, i) => i)
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-brass">
            <th className="py-2 pr-4 font-mono text-[0.6875rem] font-medium tracking-wide text-ink-soft uppercase">
              {t('methodPage.glossary.colTerm')}
            </th>
            <th className="py-2 font-mono text-[0.6875rem] font-medium tracking-wide text-ink-soft uppercase">
              {t('methodPage.glossary.colPlain')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => {
            const term = t(`methodPage.glossary.rows.${i}.term`)
            if (term === `methodPage.glossary.rows.${i}.term`) return null
            return (
              <tr key={i} className="border-b border-line align-top">
                <td className="py-2.5 pr-4 font-mono text-[0.75rem] whitespace-nowrap text-ink">{term}</td>
                <td className="py-2.5 text-[0.875rem] leading-relaxed text-ink-soft">
                  {t(`methodPage.glossary.rows.${i}.plain`)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function MethodPage() {
  const { t, tp } = useI18n()
  const zipMb = (dataMeta.zipBytes / 1024 / 1024).toFixed(1)
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <Reveal>
        <div className="eyebrow">{t('nav.method')}</div>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-[2.6rem]">{t('methodPage.h1')}</h1>
        <p className="measure mt-5 text-[1rem] leading-relaxed text-ink">{t('methodPage.intro')}</p>
      </Reveal>

      {/* конвейер */}
      <section className="mt-14">
        <Reveal>
          <SectionHead id="pipeline" eyebrow={t('methodPage.pipeline.eyebrow')} h2={t('methodPage.pipeline.h2')} />
        </Reveal>
        <PipelineTimeline />
      </section>

      {/* объективность */}
      <section className="mt-14 border border-line bg-paper-warm px-6 py-8 md:px-10">
        <Reveal>
          <SectionHead id="objectivity" eyebrow={t('methodPage.objectivity.eyebrow')} h2={t('methodPage.objectivity.h2')} />
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink">
            {t('methodPage.objectivity.text')}
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-lg text-ink">{t('methodPage.objectivity.defenseTitle')}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {tp('methodPage.objectivity.defenseText', {
                  full: stats.defense.full_reversals,
                  down: stats.defense.downgrades,
                })}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-ink">{t('methodPage.objectivity.directionTitle')}</h3>
              <p className="mt-2 mb-4 text-[0.875rem] leading-relaxed text-ink-soft">
                {t('methodPage.objectivity.directionText')}
              </p>
              <DirectionBar />
            </div>
          </div>
        </Reveal>
      </section>

      {/* хартия и независимые ошибки */}
      <section className="mt-14">
        <Reveal>
          <SectionHead id="charter" eyebrow={t('methodPage.charter.eyebrow')} h2={t('methodPage.charter.h2')} />
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink">{t('methodPage.charter.text')}</p>
          <ul className="mt-5 max-w-3xl space-y-2.5">
            {['1', '2', '3', '4', '5'].map((i) => (
              <li key={i} className="flex gap-3 text-[0.9075rem] leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                {t(`methodPage.charter.rules.${i}`)}
              </li>
            ))}
          </ul>
          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-ink">{t('methodPage.charter.chains')}</p>
        </Reveal>
      </section>

      {/* граница и ограничения */}
      <section className="mt-14 bg-binding px-6 py-8 md:px-10">
        <Reveal>
          <div id="boundary" className="scroll-mt-24">
            <div className="eyebrow" style={{ color: '#cbbd96' }}>
              {t('methodPage.boundary.eyebrow')}
            </div>
            <h2 className="mt-2 font-display text-2xl text-paper md:text-3xl">{t('methodPage.boundary.h2')}</h2>
          </div>
          <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-paper/90">
            {t('methodPage.boundary.text')}
          </p>
          <ul className="mt-5 max-w-3xl space-y-2">
            {['1', '2', '3', '4'].map((i) => (
              <li key={i} className="flex gap-3 text-[0.875rem] leading-relaxed text-paper/80">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#cbbd96' }} />
                {t(`methodPage.boundary.limits.${i}`)}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mt-14">
        <Reveal>
          <SectionHead id="faq" eyebrow={t('methodPage.faq.eyebrow')} h2={t('methodPage.faq.h2')} />
          <div className="mt-6 max-w-3xl space-y-4">
            {['1', '2', '3'].map((i) => (
              <details key={i} className="border border-line bg-paper-deep px-5 py-4">
                <summary className="cursor-pointer font-display text-[1.05rem] text-ink">
                  {t(`methodPage.faq.q${i}`)}
                </summary>
                <p className="mt-3 text-[0.9075rem] leading-relaxed text-ink-soft">{t(`methodPage.faq.a${i}`)}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* инструменты */}
      <section className="mt-14">
        <Reveal>
          <SectionHead id="tools" eyebrow={t('methodPage.tools.eyebrow')} h2={t('methodPage.tools.h2')} />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {['sonnet', 'opus', 'fable'].map((m) => (
              <div key={m} className="border border-line bg-paper-deep px-5 py-4">
                <div className="font-mono text-[0.8125rem] text-binding">{t(`methodPage.tools.${m}Name`)}</div>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{t(`methodPage.tools.${m}Role`)}</p>
              </div>
            ))}
          </div>
          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-ink">{t('methodPage.tools.designed')}</p>
        </Reveal>
      </section>

      {/* данные */}
      <section className="mt-14 border border-line bg-paper-warm px-6 py-8 md:px-10">
        <Reveal>
          <SectionHead id="data" eyebrow={t('methodPage.data.eyebrow')} h2={t('methodPage.data.h2')} />
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink">{t('methodPage.data.text')}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`${import.meta.env.BASE_URL}data/data.zip`}
              download
              className="inline-block rounded-sm bg-binding px-5 py-2.5 font-mono text-[0.8125rem] tracking-wide text-paper uppercase no-underline hover:opacity-90"
            >
              {tp('methodPage.data.download', { size: zipMb })}
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.8125rem] text-binding uppercase underline decoration-line underline-offset-4 hover:decoration-binding"
            >
              {t('methodPage.data.source')} ↗
            </a>
          </div>
          <p className="mt-4 font-mono text-[0.75rem] leading-relaxed text-ink-soft">
            {tp('methodPage.data.provenance', { version: dataMeta.version, date: dataMeta.generated_at })}
          </p>
        </Reveal>
      </section>

      {/* автор */}
      <section className="mt-14">
        <Reveal>
          <SectionHead id="author" eyebrow={t('methodPage.author.eyebrow')} h2={t('methodPage.author.h2')} />
          <p className="measure mt-5 text-[1rem] leading-relaxed text-ink">{t('methodPage.author.text')}</p>
          <button
            type="button"
            onClick={openMail}
            className="mt-5 cursor-pointer rounded-sm border border-line bg-paper-deep px-4 py-2 font-mono text-[0.75rem] tracking-wide text-ink uppercase hover:border-binding hover:text-binding"
          >
            {t('methodPage.author.contact')}
          </button>
        </Reveal>
      </section>

      {/* лицензия */}
      <section className="mt-14">
        <Reveal>
          <SectionHead id="license" eyebrow={t('methodPage.license.eyebrow')} h2={t('methodPage.license.h2')} />
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink">{t('methodPage.license.text')}</p>
          <p className="mt-3 max-w-2xl border-l-2 border-brass pl-4 font-mono text-[0.8125rem] leading-relaxed text-ink-soft">
            {t('methodPage.license.attribution')}
          </p>
        </Reveal>
      </section>

      {/* глоссарий */}
      <section className="mt-14">
        <Reveal>
          <SectionHead id="glossary" eyebrow={t('methodPage.glossary.eyebrow')} h2={t('methodPage.glossary.h2')} />
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{t('methodPage.glossary.intro')}</p>
          <Glossary />
        </Reveal>
      </section>
    </main>
  )
}
