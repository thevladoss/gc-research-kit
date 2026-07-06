import { ChevronDown, ChevronUp, CircleHelp, FileText, Frame, History, Ruler, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { DirectionBar } from '../components/DirectionBar'
import { CornerVignette, SectionDivider } from '../components/Ornament'
import { FiveStepScale } from '../components/FiveStepScale'
import { QuoteText } from '../components/QuoteText'
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

function DirectionBlock() {
  const { t } = useI18n()
  return (
    <div>
      <h3 className="font-display text-lg text-ink">{t('dossiersPage.strip.dirTitle')}</h3>
      <p className="mt-1 mb-4 text-[0.8125rem] leading-snug text-ink-soft">
        {t('dossiersPage.strip.dirSub')}
      </p>
      <DirectionBar />
    </div>
  )
}

function ClaimScaleRow({ claim }: { claim: DossierClaim }) {
  const { t, tp } = useI18n()
  return (
    <li className="border-t border-line py-3 first:border-t-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={href.explorerWith({ id: claim.id })}
          className="w-28 shrink-0 font-mono text-[0.6875rem] text-ink-soft underline decoration-line underline-offset-4 hover:text-binding"
        >
          {claim.id}
        </a>
        <FiveStepScale asWritten={claim.asWritten} weakened={claim.weakened} />
        <span className="flex flex-wrap gap-1.5">
          {claim.kind && (claim.asWritten === 'improbable' || claim.asWritten === 'discredited') && (
            <Chip color={`var(--color-v-${claim.kind === 'fact' ? 'improbable' : claim.kind === 'frame' ? 'anach' : 'conditional'}-ink)`}>
              {claim.kind === 'fact' ? (
                <FileText size={10} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-1px]" />
              ) : claim.kind === 'frame' ? (
                <Frame size={10} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-1px]" />
              ) : (
                <Target size={10} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-1px]" />
              )}
              {t(`dossiersPage.card.kind.${claim.kind}`)}
            </Chip>
          )}
          {claim.loadBearing && <Chip color="var(--color-binding)">{t('chainPage.item.loadBearing')}</Chip>}
          {claim.chainInherited && <Chip>{t('chainPage.item.inherited')}</Chip>}
          {claim.period === 'period-scholarship' && <Chip>
              <History size={10} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-1px]" />
              {t('chainPage.item.periodScholarship')}
            </Chip>}
          {claim.period === 'expositor-tradition' && <Chip>
              <History size={10} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-1px]" />
              {t('chainPage.item.expositorTradition')}
            </Chip>}
          {claim.confidence && <Chip>{t(`dossiersPage.card.confidence.${claim.confidence}`)}</Chip>}
        </span>
      </div>
      <div className="mt-1.5 flex max-w-3xl flex-wrap items-baseline gap-x-2">
        <QuoteText en={claim.quote} ru={claim.quoteRu} enKey={claim.enKey} className="min-w-0 grow text-[0.875rem]" />
        <span className="font-mono text-[0.6875rem] text-ink-soft">
          ({tp('dossiersPage.card.chapter', { ch: claim.chapter })})
        </span>
      </div>
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
      <article
        id={`dossier-${d.dossier}`}
        className="relative scroll-mt-24 overflow-hidden border border-line bg-paper-deep px-6 py-6 md:px-8"
      >
        <CornerVignette corner="tl" />
        <CornerVignette corner="br" />
        {d.dossier === 'D01' && (
          <div
            aria-hidden="true"
            className="decor-numeral top-[-0.06em] right-[-0.04em] hidden text-[11rem] md:block"
          >
            1844
          </div>
        )}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[0.75rem] text-binding">{d.dossier}</span>
          <span className="font-mono text-[0.6875rem] text-ink-soft">
            {t('dossiersPage.card.chapters')} {d.chapters.join(', ')} · {countClaims(d.claims.length)}
          </span>
        </div>
        <h3 className="mt-2 flex max-w-3xl items-start gap-2 font-display text-[1.35rem] leading-snug text-ink">
          <CircleHelp size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1.5 shrink-0 text-binding" />
          <span>{t(`dossiersPage.questions.${d.dossier}`)}</span>
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
            {expanded ? (
              <>
                <ChevronUp size={12} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-2px]" />
                {t('dossiersPage.card.collapse')}
              </>
            ) : (
              <>
                <ChevronDown size={12} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-2px]" />
                {`${t('dossiersPage.card.showAll')} (${d.claims.length})`}
              </>
            )}
          </button>
        )}
      </article>
    </Reveal>
  )
}

export function DossiersPage({ anchor }: { anchor?: string }) {
  const { t } = useI18n()
  // прямой вход по ссылке с якорем (напр. #/dossiers#dossier-D07): доводим до карточки
  // после того как ленивый чанк смонтировался
  useEffect(() => {
    if (!anchor) return
    requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
    })
  }, [anchor])
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
          <DirectionBlock />
        </section>
      </Reveal>

      {/* легенда шкалы — один раз для всех карточек */}
      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line py-3">
          <span className="font-mono text-[0.6875rem] text-ink uppercase">
            <Ruler size={12} strokeWidth={1.75} aria-hidden="true" className="mr-1.5 inline-block align-[-2px]" />
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

      <div className="mt-10">
        <SectionDivider />
      </div>
      <div className="mt-8 space-y-6">
        {dossierCards.map((d, i) => (
          <DossierCardView key={d.dossier} d={d} index={i} />
        ))}
      </div>
    </main>
  )
}
