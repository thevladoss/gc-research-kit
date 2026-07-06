import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { ChainPassage } from '../data/generated/chainPassages'
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
 * подсвечено итогом, а переключатель плавно гасит то, что не выдержало проверки.
 */
export function SubtractionPassage({ passage }: { passage: ChainPassage }) {
  const { t, tp } = useI18n()
  const reduced = useReducedMotion()
  const [subtracted, setSubtracted] = useState(false)

  return (
    <figure>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PassageLegend />
        <button
          type="button"
          onClick={() => setSubtracted(!subtracted)}
          aria-pressed={subtracted}
          className="cursor-pointer rounded-sm border border-line bg-paper-deep px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-ink uppercase hover:border-binding hover:text-binding"
        >
          {subtracted ? t('chainPage.passage.toggleRestore') : t('chainPage.passage.toggleRemove')}
        </button>
      </div>
      <blockquote
        lang="en"
        className="mt-5 border-l-2 border-brass pl-5 font-display text-[1.075rem] leading-[1.75] text-ink"
      >
        {passage.paras.map((p) => (
          <p key={p.paragraph} className="mt-4 first:mt-0">
            {p.segments.map((seg, i) => {
              if (!seg.outcome || seg.outcome === 'none') return <span key={i}>{seg.text}</span>
              const faded = subtracted && seg.outcome === 'fallen'
              return (
                <motion.span
                  key={i}
                  title={`${seg.id} — ${t(outcomeLabelKey[seg.outcome])}`}
                  style={spanStyle(seg.outcome)}
                  animate={{ opacity: faded ? 0.16 : 1 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.7, ease: 'easeInOut' }}
                >
                  {seg.text}
                </motion.span>
              )
            })}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-3 font-mono text-[0.6875rem] text-ink-soft">
        {tp('chainPage.passage.note', {
          ch: passage.chapter,
          p: passage.paras.map((x) => x.paragraph).join(', '),
        })}
      </figcaption>
    </figure>
  )
}
