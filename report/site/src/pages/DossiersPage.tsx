import { useState } from 'react'
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { FiveStepScale } from '../components/FiveStepScale'
import { Reveal } from '../components/Reveal'
import { dossierCards, type DossierCard as TDossier, type DossierClaim } from '../data/generated/dossiers'
import { stats } from '../data/generated/stats'
import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

const COLLAPSED_ROWS = 5

function ruPlural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

function useClaimCount() {
  const { locale, tp } = useI18n()
  return (n: number) => {
    const form =
      locale === 'ru' ? ruPlural(n, 'one', 'few', 'many') : n === 1 ? 'one' : 'many'
    return tp(`dossiersPage.card.count.${form}`, { n })
  }
}

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

function GapChart() {
  const { t } = useI18n()
  const dist = stats.framing_gap_distribution_97
  const data = [
    ...(['0', '1', '2', '3', '4'] as const).map((g) => ({ gap: g, count: dist[g] })),
    { gap: t('dossiersPage.strip.gapNA'), count: dist.null },
  ]
  return (
    <div>
      <h3 className="font-display text-lg text-ink">{t('dossiersPage.strip.gapTitle')}</h3>
      <p className="mt-1 text-[0.8125rem] leading-snug text-ink-soft">
        {t('dossiersPage.strip.gapSub')}
      </p>
      <div className="mt-4 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 18, right: 4, left: 4, bottom: 0 }}>
            <XAxis
              dataKey="gap"
              tickLine={false}
              axisLine={{ stroke: 'var(--color-line)' }}
              tick={{ fill: 'var(--color-ink-soft)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            />
            <YAxis hide />
            <Bar dataKey="count" fill="var(--color-binding)" radius={[3, 3, 0, 0]} isAnimationActive={false}>
              <LabelList
                dataKey="count"
                position="top"
                style={{ fill: 'var(--color-ink)', fontSize: 12, fontFamily: 'var(--font-mono)' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function DirectionBar() {
  const { t, fmtInt } = useI18n()
  const d = stats.direction
  const total = d.accusatory + d.genuinely_open + d.favorable + d.conditional_premise
  const parts = [
    { key: 'dirAccusatory', value: d.accusatory, fill: 'var(--color-v-improbable)', ink: 'var(--color-v-improbable-ink)' },
    { key: 'dirOpen', value: d.genuinely_open, fill: 'var(--color-v-open)', ink: 'var(--color-v-open-ink)' },
    { key: 'dirFavorable', value: d.favorable, fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)' },
    { key: 'dirConditional', value: d.conditional_premise, fill: 'var(--color-v-conditional)', ink: 'var(--color-v-conditional-ink)' },
  ]
  return (
    <div>
      <h3 className="font-display text-lg text-ink">{t('dossiersPage.strip.dirTitle')}</h3>
      <p className="mt-1 text-[0.8125rem] leading-snug text-ink-soft">
        {t('dossiersPage.strip.dirSub')}
      </p>
      <div
        className="mt-4 flex h-9 w-full overflow-hidden rounded-sm"
        role="img"
        aria-label={parts.map((p) => `${t(`dossiersPage.strip.${p.key}`)}: ${p.value}`).join('; ')}
      >
        {parts.map((p) => (
          <div
            key={p.key}
            style={{ width: `${(p.value / total) * 100}%`, background: p.fill }}
            className="border-r-2 border-paper last:border-r-0"
            title={`${t(`dossiersPage.strip.${p.key}`)}: ${p.value}`}
          />
        ))}
      </div>
      <ul className="mt-3 space-y-1">
        {parts.map((p) => (
          <li key={p.key} className="flex items-baseline gap-2 font-mono text-[0.75rem]">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.fill }} />
            <span className="text-ink tabular-nums">{fmtInt(p.value)}</span>
            <span className="text-ink-soft">{t(`dossiersPage.strip.${p.key}`)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.8125rem] leading-snug text-ink-soft">
        {t('dossiersPage.strip.chainsNote')}
      </p>
      <p className="mt-1.5 text-[0.8125rem] leading-snug" style={{ color: 'var(--color-v-supported-ink)' }}>
        {t('dossiersPage.strip.reversalsNote')}
      </p>
    </div>
  )
}

function ClaimScaleRow({ claim }: { claim: DossierClaim }) {
  const { t, tp } = useI18n()
  return (
    <li className="border-t border-line py-3 first:border-t-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={href.explorer}
          className="w-28 shrink-0 font-mono text-[0.6875rem] text-ink-soft underline decoration-line underline-offset-4 hover:text-binding"
        >
          {claim.id}
        </a>
        <FiveStepScale asWritten={claim.asWritten} weakened={claim.weakened} />
        <span className="flex flex-wrap gap-1.5">
          {claim.kind && (claim.asWritten === 'improbable' || claim.asWritten === 'discredited') && (
            <Chip color={`var(--color-v-${claim.kind === 'fact' ? 'improbable' : claim.kind === 'frame' ? 'anach' : 'conditional'}-ink)`}>
              {t(`dossiersPage.card.kind.${claim.kind}`)}
            </Chip>
          )}
          {claim.loadBearing && <Chip color="var(--color-binding)">{t('chainPage.item.loadBearing')}</Chip>}
          {claim.chainInherited && <Chip>{t('chainPage.item.inherited')}</Chip>}
          {claim.period === 'period-scholarship' && <Chip>{t('chainPage.item.periodScholarship')}</Chip>}
          {claim.period === 'expositor-tradition' && <Chip>{t('chainPage.item.expositorTradition')}</Chip>}
          {claim.confidence && <Chip>{t(`dossiersPage.card.confidence.${claim.confidence}`)}</Chip>}
        </span>
      </div>
      <p lang="en" className="mt-1.5 max-w-3xl font-display text-[0.875rem] leading-relaxed text-ink-soft italic">
        “{claim.quote}” <span className="not-italic font-mono text-[0.6875rem]">({tp('dossiersPage.card.chapter', { ch: claim.chapter })})</span>
      </p>
    </li>
  )
}

function DossierCardView({ d, index }: { d: TDossier; index: number }) {
  const { t, locale } = useI18n()
  const countClaims = useClaimCount()
  const [expanded, setExpanded] = useState(false)
  const rows = expanded ? d.claims : d.claims.slice(0, COLLAPSED_ROWS)
  const narrative = locale === 'ru' ? d.narrative_ru : t(`dossiersPage.narratives.${d.dossier}`)
  return (
    <Reveal delay={Math.min(index * 0.03, 0.15)}>
      <article className="border border-line bg-paper-deep px-6 py-6 md:px-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[0.75rem] text-binding">{d.dossier}</span>
          <span className="font-mono text-[0.6875rem] text-ink-soft">
            {t('dossiersPage.card.chapters')} {d.chapters.join(', ')} · {countClaims(d.claims.length)}
          </span>
        </div>
        <h3 className="mt-2 max-w-3xl font-display text-[1.35rem] leading-snug text-ink">
          {t(`dossiersPage.questions.${d.dossier}`)}
        </h3>
        <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-ink">{narrative}</p>
        <ul className="mt-5">
          {rows.map((c) => (
            <ClaimScaleRow key={c.id} claim={c} />
          ))}
        </ul>
        {d.claims.length > COLLAPSED_ROWS && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 cursor-pointer font-mono text-[0.6875rem] text-binding uppercase underline decoration-line underline-offset-4 hover:decoration-binding"
          >
            {expanded
              ? t('dossiersPage.card.collapse')
              : `${t('dossiersPage.card.showAll')} (${d.claims.length})`}
          </button>
        )}
      </article>
    </Reveal>
  )
}

export function DossiersPage() {
  const { t } = useI18n()
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <Reveal>
        <div className="eyebrow">{t('nav.dossiers')}</div>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-[2.6rem]">
          {t('dossiersPage.h1')}
        </h1>
        <p className="measure mt-5 text-[1rem] leading-relaxed text-ink">{t('dossiersPage.intro')}</p>
      </Reveal>

      {/* сводная полоса: свидетельство беспристрастности */}
      <Reveal>
        <section className="mt-10 grid gap-8 border border-line bg-paper-deep px-6 py-6 md:grid-cols-2 md:px-8">
          <GapChart />
          <DirectionBar />
        </section>
      </Reveal>

      {/* легенда шкалы — один раз для всех карточек */}
      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line py-3">
          <span className="font-mono text-[0.6875rem] text-ink uppercase">
            {t('dossiersPage.scale.title')}
          </span>
          <span className="font-mono text-[0.6875rem] text-ink-soft">
            {t('dossiersPage.scale.steps')}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-soft">
            <svg width="12" height="12" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" fill="var(--color-ink-soft)" />
            </svg>
            {t('dossiersPage.scale.printed')}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-soft">
            <svg width="12" height="12" aria-hidden="true">
              <circle cx="6" cy="6" r="4" fill="var(--color-paper)" stroke="var(--color-ink-soft)" strokeWidth="2" />
            </svg>
            {t('dossiersPage.scale.weakened')}
          </span>
        </div>
      </Reveal>

      <div className="mt-8 space-y-6">
        {dossierCards.map((d, i) => (
          <DossierCardView key={d.dossier} d={d} index={i} />
        ))}
      </div>
    </main>
  )
}
