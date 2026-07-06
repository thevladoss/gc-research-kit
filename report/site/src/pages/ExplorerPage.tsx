import { ChevronRight, ExternalLink, RotateCcw, Search, SearchCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { FiveStepScale } from '../components/FiveStepScale'
import { QuoteText } from '../components/QuoteText'
import { chapterMap } from '../data/generated/chapters'
import {
  arcOf,
  filterGroup,
  finalLabelKey,
  loadBearingOf,
  severityOf,
  type FullClaim,
  type SourceLink,
} from '../lib/claims'
import { useI18n } from '../lib/i18n'
import { href, replaceExplorerParams } from '../lib/router'
import { labelKeyColor } from '../lib/verdicts'

const PAGE = 120

interface Filters {
  q: string
  ch: string
  ruling: string
  arc: string
  kind: string
  period: string
  stage: string
  sev: string
  id: string
}

const EMPTY: Filters = { q: '', ch: '', ruling: '', arc: '', kind: '', period: '', stage: '', sev: '', id: '' }

const RULING_OPTIONS = ['favorable', 'open', 'anachronistic', 'improbable', 'discredited', 'conditional', 'unverifiable', 'supported']
const ARC_OPTIONS = ['reformation', 'pre-reformation', 'millerite', 'doctrinal', 'eschatological', 'frame']

function matches(c: FullClaim, f: Filters): boolean {
  if (f.id && c.id !== f.id) return false
  if (f.ch !== '' && c.chapter !== Number(f.ch)) return false
  if (f.ruling) {
    const g = filterGroup(c)
    if (f.ruling === 'supported' ? g !== 'supported' : f.ruling === 'favorable' ? g !== 'favorable' : g !== f.ruling)
      return false
  }
  if (f.arc && arcOf(c) !== f.arc) return false
  if (f.kind && c.adjudication?.failing_component_kind !== f.kind) return false
  if (f.period && c.adjudication?.period_standard !== f.period) return false
  if (f.stage === 'defense' && !c.defense?.revised_verdict) return false
  if (f.stage === 'adjudicated' && !c.adjudication) return false
  if (f.stage === 'adjudicatedFavorable') {
    const r = c.adjudication?.ruling_as_written
    if (r !== 'well-supported' && r !== 'probable') return false
  }
  if (f.sev) {
    const s = severityOf(c)
    if (s == null || s < Number(f.sev)) return false
  }
  if (f.q) {
    const q = f.q.toLowerCase()
    if (!c.id.toLowerCase().includes(q) && !c.quote.toLowerCase().includes(q) && !c.claim_text.toLowerCase().includes(q))
      return false
  }
  return true
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

function VerdictChip({ labelKey }: { labelKey: string }) {
  const { t } = useI18n()
  const c = labelKeyColor[labelKey]
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide uppercase"
      style={{ color: c.ink }}
    >
      <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.fill }} />
      {t(`verdicts.${labelKey}`)}
    </span>
  )
}

function Sources({ list }: { list: SourceLink[] }) {
  if (!list?.length) return null
  return (
    <ul className="mt-2 space-y-1">
      {list.map((s, i) => (
        <li key={i} className="font-mono text-[0.6875rem] leading-snug">
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-binding underline decoration-line underline-offset-2 hover:decoration-binding"
            >
              {s.title}
              <ExternalLink size={10} strokeWidth={1.75} aria-hidden="true" className="ml-1 inline-block align-[-1px]" />
            </a>
          ) : (
            <span className="text-ink-soft">{s.title}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

/** История вердикта: проверка → защита → разбор спорного. */
function Timeline({ c }: { c: FullClaim }) {
  const { t } = useI18n()
  const v = c.verification
  const stages: { key: string; color: string; body: React.ReactNode }[] = []
  if (v) {
    stages.push({
      key: 'verify',
      color: labelKeyColor[finalLabelKey({ ...c, adjudication: null, defense: null } as FullClaim)]?.fill ?? 'var(--color-ink-soft)',
      body: (
        <>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-[0.6875rem] text-ink uppercase">{t('explorerPage.stageVerify')}</span>
            <VerdictChip
              labelKey={
                {
                  supported: 'supported',
                  anachronistic: 'anachronistic',
                  contradicted: 'contradicted',
                  misquotation: 'discredited',
                  disputed: 'open',
                  unverifiable: 'unverifiable',
                }[v.verdict] ?? 'unverifiable'
              }
            />
            {v.confidence && <Chip>{t(`dossiersPage.card.confidence.${v.confidence}`)}</Chip>}
          </div>
          {v.rationale && <p lang="en" className="mt-1.5 max-w-3xl text-[0.8125rem] leading-relaxed text-ink-soft">{v.rationale}</p>}
          <Sources list={v.sources} />
        </>
      ),
    })
  }
  if (c.defense) {
    const d = c.defense
    const resultKey =
      d.result === 'defense_succeeded' ? 'defenseSucceeded' : d.result === 'verdict_downgraded' ? 'defenseDowngraded' : 'defenseFailed'
    stages.push({
      key: 'defense',
      color: d.revised_verdict ? 'var(--color-v-supported)' : 'var(--color-ink-soft)',
      body: (
        <>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-[0.6875rem] text-ink uppercase">{t('explorerPage.stageDefense')}</span>
            <span className="font-mono text-[0.6875rem] text-ink-soft">{t(`explorerPage.${resultKey}`)}</span>
            {d.revised_verdict && (
              <VerdictChip
                labelKey={
                  { supported: 'supported', anachronistic: 'anachronistic', disputed: 'open', unverifiable: 'unverifiable' }[
                    d.revised_verdict
                  ] ?? 'open'
                }
              />
            )}
          </div>
          {d.argument && <p lang="en" className="mt-1.5 max-w-3xl text-[0.8125rem] leading-relaxed text-ink-soft">{d.argument}</p>}
          <Sources list={d.new_sources} />
        </>
      ),
    })
  }
  if (c.adjudication) {
    const a = c.adjudication
    stages.push({
      key: 'adjudication',
      color: labelKeyColor[finalLabelKey(c)]?.fill ?? 'var(--color-ink-soft)',
      body: (
        <>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-mono text-[0.6875rem] text-ink uppercase">{t('explorerPage.stageAdjudication')}</span>
            <a href={href.dossiers} className="font-mono text-[0.6875rem] text-binding underline decoration-line underline-offset-2">
              {a.dossier}
            </a>
            {a.ruling_as_written !== 'out-of-scope' && (
              <FiveStepScale asWritten={a.ruling_as_written} weakened={a.ruling_weakened} width={190} />
            )}
            {a.failing_component_kind &&
              (a.ruling_as_written === 'improbable' || a.ruling_as_written === 'discredited') && (
                <Chip>{t(`dossiersPage.card.kind.${a.failing_component_kind}`)}</Chip>
              )}
            {a.period_standard === 'period-scholarship' && <Chip>{t('chainPage.item.periodScholarship')}</Chip>}
            {a.period_standard === 'expositor-tradition' && <Chip>{t('chainPage.item.expositorTradition')}</Chip>}
            {a.chain_inherited && <Chip>{t('chainPage.item.inherited')}</Chip>}
            {a.confidence && <Chip>{t(`dossiersPage.card.confidence.${a.confidence}`)}</Chip>}
          </div>
          {a.ruling_as_written === 'out-of-scope' && (
            <p className="mt-1.5 font-mono text-[0.75rem]" style={{ color: 'var(--color-v-conditional-ink)' }}>
              {t('dossiersPage.card.outOfScope')}
            </p>
          )}
          {a.weakened_version && (
            <p className="mt-2 max-w-3xl text-[0.8125rem] leading-relaxed text-ink-soft">
              <span className="font-mono text-[0.6875rem] text-ink uppercase">{t('explorerPage.weakenedVersion')}: </span>
              <span lang="en" className="italic">{a.weakened_version}</span>
            </p>
          )}
          {a.would_change_this && (
            <p className="mt-2 max-w-3xl text-[0.8125rem] leading-relaxed text-ink-soft">
              <span className="font-mono text-[0.6875rem] text-ink uppercase">
                <SearchCheck size={11} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-1.5px]" />
                {t('explorerPage.wouldChange')}:{' '}
              </span>
              <span lang="en">{a.would_change_this}</span>
            </p>
          )}
          {a.sources && a.sources.length > 0 && (
            <ul className="mt-2 space-y-1">
              {a.sources.map((s, i) => (
                <li key={i} lang="en" className="font-mono text-[0.6875rem] leading-snug text-ink-soft">
                  {s.ref}
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    })
  }
  return (
    <ol className="mt-4 space-y-5 border-l-2 border-line pl-5">
      {stages.map((s) => (
        <li key={s.key} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1 -left-[27px] h-3 w-3 rounded-full border-2 border-paper"
            style={{ background: s.color }}
          />
          {s.body}
        </li>
      ))}
    </ol>
  )
}

function Row({ c, ru, expanded, onToggle }: { c: FullClaim; ru: { ru: string; k?: string } | null; expanded: boolean; onToggle: () => void }) {
  const { t, tp, locale } = useI18n()
  const labelKey = finalLabelKey(c)
  const sev = severityOf(c)
  return (
    <li className="border-t border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="grid w-full cursor-pointer grid-cols-[7rem_1fr] items-baseline gap-x-4 gap-y-1 px-1 py-3 text-left hover:bg-paper-deep md:grid-cols-[7rem_11rem_1fr_auto]"
      >
        <span className="font-mono text-[0.6875rem] text-ink-soft">
          <ChevronRight
            size={12}
            strokeWidth={1.75}
            aria-hidden="true"
            className={`mr-1 inline-block align-[-2px] transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
          {c.id}
        </span>
        <span className="hidden md:inline"><VerdictChip labelKey={labelKey} /></span>
        <span
          lang={locale === 'ru' && ru ? 'ru' : 'en'}
          className={`col-span-2 font-display text-[0.9rem] leading-snug text-ink md:col-span-1 ${locale === 'ru' && ru ? '' : 'italic'}`}
        >
          {locale === 'ru' && ru ? (
            <>
              «{ru.ru.length > 180 ? ru.ru.slice(0, 177).trimEnd() + '…' : ru.ru}»
              {ru.k && (
                <span lang="en" className="ml-2 font-mono text-[0.625rem] whitespace-nowrap text-ink-soft italic">
                  “{ru.k}”
                </span>
              )}
            </>
          ) : (
            <>“{c.quote.length > 180 ? c.quote.slice(0, 177).trimEnd() + '…' : c.quote}”</>
          )}
        </span>
        <span className="col-span-2 flex flex-wrap items-center gap-1.5 md:col-span-1 md:justify-end">
          <span className="md:hidden"><VerdictChip labelKey={labelKey} /></span>
          <Chip>{tp('chainPage.item.ref', { ch: c.chapter, p: c.paragraph })}</Chip>
          {loadBearingOf(c) && <Chip color="var(--color-binding)">{t('chainPage.item.loadBearing')}</Chip>}
          {sev != null && <Chip>{tp('explorerPage.sevChip', { n: sev })}</Chip>}
        </span>
      </button>
      {expanded && (
        <div className="px-1 pb-5">
          <QuoteText en={c.quote} ru={ru?.ru ?? null} enKey={ru?.k} className="max-w-3xl text-[0.9rem]" />
          <p className="mt-3 max-w-3xl text-[0.875rem] leading-relaxed text-ink">
            <span className="font-mono text-[0.6875rem] text-ink-soft uppercase">{t('explorerPage.claimText')}: </span>
            <span lang="en">{c.claim_text}</span>
          </p>
          <Timeline c={c} />
        </div>
      )}
    </li>
  )
}

export function ExplorerPage({ initial }: { initial: Record<string, string> }) {
  const { t, tp, fmtInt } = useI18n()
  const [data, setData] = useState<FullClaim[] | null>(null)
  const [ruMap, setRuMap] = useState<Record<string, { ru: string; k?: string }> | null>(null)
  const [error, setError] = useState(false)
  const [filters, setFilters] = useState<Filters>({ ...EMPTY, ...initial })
  const [limit, setLimit] = useState(PAGE)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(initial.id ? [initial.id] : []))

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/claims_full.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setData)
      .catch(() => setError(true))
  }, [])

  // официальный русский перевод цитат — только для русской локали
  const { locale } = useI18n()
  useEffect(() => {
    if (locale !== 'ru' || ruMap) return
    fetch(`${import.meta.env.BASE_URL}ru_quotes.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setRuMap)
      .catch(() => setRuMap({}))
  }, [locale, ruMap])

  const set = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch }
    setFilters(next)
    setLimit(PAGE)
    replaceExplorerParams(next as unknown as Record<string, string>)
  }

  const rows = useMemo(() => (data ? data.filter((c) => matches(c, filters)) : []), [data, filters])

  const selectCls =
    'min-h-11 rounded-sm border border-line bg-paper px-2 py-1.5 font-mono text-[0.75rem] text-ink focus:border-binding'

  return (
    <main className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="eyebrow">{t('nav.explorer')}</div>
      <h1 className="mt-3 font-display text-3xl text-ink md:text-[2.6rem]">{t('explorerPage.h1')}</h1>
      <p className="measure mt-5 text-[1rem] leading-relaxed text-ink">{t('explorerPage.intro')}</p>

      {/* фильтры */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="relative inline-block">
          <Search
            size={13}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-ink-soft"
          />
          <input
            type="search"
            value={filters.q}
            onChange={(e) => set({ q: e.target.value })}
            placeholder={t('explorerPage.searchPlaceholder')}
            aria-label={t('explorerPage.searchPlaceholder')}
            className={`${selectCls} w-56 pl-8`}
          />
        </span>
        <select value={filters.ch} onChange={(e) => set({ ch: e.target.value })} className={selectCls} aria-label={t('explorerPage.fChapter')}>
          <option value="">{t('explorerPage.fChapter')}</option>
          {chapterMap.map((ch) => (
            <option key={ch.chapter} value={ch.chapter}>
              {tp('mapPage.chapterOf', { n: ch.chapter })} · {t(`mapPage.chapterTitles.${ch.chapter}`)}
            </option>
          ))}
        </select>
        <select value={filters.ruling} onChange={(e) => set({ ruling: e.target.value })} className={selectCls} aria-label={t('explorerPage.fRuling')}>
          <option value="">{t('explorerPage.fRuling')}</option>
          {RULING_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {t(`explorerPage.rulingOptions.${r}`)}
            </option>
          ))}
        </select>
        <select value={filters.arc} onChange={(e) => set({ arc: e.target.value })} className={selectCls} aria-label={t('explorerPage.fArc')}>
          <option value="">{t('explorerPage.fArc')}</option>
          {ARC_OPTIONS.map((a) => (
            <option key={a} value={a}>
              {t(`explorerPage.arcOptions.${a}`)}
            </option>
          ))}
        </select>
        <select value={filters.kind} onChange={(e) => set({ kind: e.target.value })} className={selectCls} aria-label={t('explorerPage.fKind')}>
          <option value="">{t('explorerPage.fKind')}</option>
          {(['fact', 'frame', 'motive'] as const).map((k) => (
            <option key={k} value={k}>
              {t(`dossiersPage.card.kind.${k}`)}
            </option>
          ))}
        </select>
        <select value={filters.period} onChange={(e) => set({ period: e.target.value })} className={selectCls} aria-label={t('explorerPage.fPeriod')}>
          <option value="">{t('explorerPage.fPeriod')}</option>
          <option value="period-scholarship">{t('chainPage.item.periodScholarship')}</option>
          <option value="expositor-tradition">{t('chainPage.item.expositorTradition')}</option>
        </select>
        <select value={filters.stage} onChange={(e) => set({ stage: e.target.value })} className={selectCls} aria-label={t('explorerPage.fStage')}>
          <option value="">{t('explorerPage.fStage')}</option>
          <option value="defense">{t('explorerPage.stageOptions.defense')}</option>
          <option value="adjudicated">{t('explorerPage.stageOptions.adjudicated')}</option>
          <option value="adjudicatedFavorable">{t('explorerPage.stageOptions.adjudicatedFavorable')}</option>
        </select>
        <select value={filters.sev} onChange={(e) => set({ sev: e.target.value })} className={selectCls} aria-label={t('explorerPage.fSeverity')}>
          <option value="">{t('explorerPage.fSeverity')}</option>
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              {tp('explorerPage.sevOption', { n: s })}
            </option>
          ))}
        </select>
        {(filters.q || filters.ch || filters.ruling || filters.arc || filters.kind || filters.period || filters.stage || filters.sev || filters.id) && (
          <button
            type="button"
            onClick={() => set({ ...EMPTY })}
            className="cursor-pointer font-mono text-[0.75rem] text-binding uppercase underline decoration-line underline-offset-4"
          >
            <RotateCcw size={12} strokeWidth={1.75} aria-hidden="true" className="mr-1 inline-block align-[-2px]" />
            {t('explorerPage.reset')}
          </button>
        )}
      </div>

      {/* счётчик и таблица */}
      {error && <p className="mt-8 text-[0.9375rem] text-ink-soft">{t('explorerPage.loadError')}</p>}
      {!data && !error && <p className="mt-8 font-mono text-[0.8125rem] text-ink-soft">{t('explorerPage.loading')}</p>}
      {data && (
        <>
          <p className="mt-6 font-mono text-[0.75rem] text-ink-soft">
            {tp('explorerPage.count', { n: fmtInt(rows.length), total: fmtInt(data.length) })}
          </p>
          <ul className="mt-2 border-b border-line">
            {rows.slice(0, limit).map((c) => (
              <Row
                key={c.id}
                c={c}
                ru={ruMap?.[c.id] ?? null}
                expanded={expanded.has(c.id)}
                onToggle={() =>
                  setExpanded((prev) => {
                    const next = new Set(prev)
                    if (next.has(c.id)) next.delete(c.id)
                    else next.add(c.id)
                    return next
                  })
                }
              />
            ))}
          </ul>
          {rows.length > limit && (
            <button
              type="button"
              onClick={() => setLimit(limit + PAGE)}
              className="mt-5 cursor-pointer rounded-sm border border-line bg-paper-deep px-4 py-2 font-mono text-[0.75rem] tracking-wide text-ink uppercase hover:border-binding hover:text-binding"
            >
              {tp('explorerPage.showMore', { n: fmtInt(Math.min(PAGE, rows.length - limit)) })}
            </button>
          )}
        </>
      )}
    </main>
  )
}
