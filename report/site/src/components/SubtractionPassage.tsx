import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { ChainPassage, PassageSegment } from '../data/generated/chainPassages'
import { useI18n } from '../lib/i18n'
import { outcomeStyle, type Outcome } from '../lib/verdicts'

const outcomeLabelKey: Record<Exclude<Outcome, 'none'>, string> = {
  stands: 'chainPage.legend.stands',
  fallen: 'chainPage.legend.fallen',
  open: 'chainPage.legend.open',
  conditional: 'chainPage.legend.conditional',
  outside: 'chainPage.legend.outside',
}

function spanStyle(outcome: Exclude<Outcome, 'none'>): React.CSSProperties {
  const s = outcomeStyle[outcome]
  switch (outcome) {
    case 'outside':
      return {
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        textDecorationColor: s.fill,
        textUnderlineOffset: '4px',
      }
    case 'conditional':
      return {
        background: `color-mix(in oklab, ${s.fill} 14%, transparent)`,
        textDecorationLine: 'underline',
        textDecorationStyle: 'dashed',
        textDecorationColor: s.fill,
        textUnderlineOffset: '4px',
      }
    default:
      return {
        background: `color-mix(in oklab, ${s.fill} ${outcome === 'open' ? 16 : 14}%, transparent)`,
        boxShadow: `inset 0 -2px 0 ${s.fill}`,
      }
  }
}

export function PassageLegend() {
  const { t } = useI18n()
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1.5">
      {(Object.keys(outcomeLabelKey) as Array<Exclude<Outcome, 'none'>>).map((o) => (
        <span key={o} className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-soft">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-[2px]"
            style={
              o === 'outside'
                ? { border: `1.5px dotted ${outcomeStyle[o].fill}` }
                : o === 'conditional'
                  ? { border: `1.5px dashed ${outcomeStyle[o].fill}` }
                  : { background: outcomeStyle[o].fill }
            }
          />
          {t(outcomeLabelKey[o])}
        </span>
      ))}
    </div>
  )
}

/**
 * Подпись страниц цепи: отрывок книги, где каждое проверенное утверждение
 * подсвечено итогом, а переключатель плавно гасит не выдержавшее проверки.
 * В RU-локали отрывок даётся по официальному русскому переводу (с атрибуцией),
 * разметка исходов та же — по номерам записей.
 */
export function SubtractionPassage({ passage }: { passage: ChainPassage }) {
  const { t, tp, locale } = useI18n()
  const reduced = useReducedMotion()
  const [subtracted, setSubtracted] = useState(false)

  // итог проверки по номеру записи — из сгенерированной разметки оригинала
  const outcomeById = useMemo(() => {
    const m = new Map<string, Exclude<Outcome, 'none'>>()
    for (const p of passage.paras)
      for (const s of p.segments)
        if (s.id && s.outcome && s.outcome !== 'none') m.set(s.id, s.outcome)
    return m
  }, [passage])

  const useRu = locale === 'ru' && passage.paras.every((p) => p.ruSegments)

  const renderSegments = (segments: readonly PassageSegment[]) =>
    segments.map((seg, i) => {
      const outcome = seg.id ? outcomeById.get(seg.id) : undefined
      if (!outcome) return <span key={i}>{seg.text}</span>
      const faded = subtracted && outcome === 'fallen'
      return (
        <motion.span
          key={i}
          title={`${seg.id} — ${t(outcomeLabelKey[outcome])}`}
          style={spanStyle(outcome)}
          animate={{ opacity: faded ? 0.16 : 1 }}
          transition={reduced ? { duration: 0 } : { duration: 0.7, ease: 'easeInOut' }}
        >
          {seg.text}
          {seg.enKey && (
            <span lang="en" className="mx-1 font-mono text-[0.65em] whitespace-nowrap text-ink-soft italic">
              “{seg.enKey}”
            </span>
          )}
        </motion.span>
      )
    })

  return (
    <figure>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PassageLegend />
        <button
          type="button"
          onClick={() => setSubtracted(!subtracted)}
          aria-pressed={subtracted}
          className="min-h-11 cursor-pointer rounded-sm border border-line bg-paper-deep px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-ink uppercase hover:border-binding hover:text-binding"
        >
          {subtracted ? t('chainPage.passage.toggleRestore') : t('chainPage.passage.toggleRemove')}
        </button>
      </div>
      <blockquote
        lang={useRu ? 'ru' : 'en'}
        className="mt-5 border-l-2 border-brass pl-5 font-display text-[1.075rem] leading-[1.75] text-ink"
      >
        {passage.paras.map((p) => (
          <p key={p.paragraph} className="mt-4 first:mt-0">
            {renderSegments(useRu ? p.ruSegments! : p.segments)}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-3 max-w-3xl font-mono text-[0.6875rem] leading-relaxed text-ink-soft">
        {tp('chainPage.passage.note', {
          ch: passage.chapter,
          p: passage.paras.map((x) => x.paragraph).join(', '),
        })}
        {useRu && <span className="mt-1 block">{t('chainPage.passage.attribution')}</span>}
      </figcaption>
    </figure>
  )
}
