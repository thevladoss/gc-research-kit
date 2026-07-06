import { stats } from '../data/generated/stats'
import { useI18n } from '../lib/i18n'

/** Полоса направлений решений разбора — свидетельство беспристрастности. */
export function DirectionBar() {
  const { t, fmtInt } = useI18n()
  const d = stats.direction
  const total = d.accusatory + d.genuinely_open + d.favorable + d.conditional_premise
  const parts = [
    { key: 'dirAccusatory', value: d.accusatory, fill: 'var(--color-v-improbable)' },
    { key: 'dirOpen', value: d.genuinely_open, fill: 'var(--color-v-open)' },
    { key: 'dirFavorable', value: d.favorable, fill: 'var(--color-v-supported)' },
    { key: 'dirConditional', value: d.conditional_premise, fill: 'var(--color-v-conditional)' },
  ]
  return (
    <div>
      <div
        className="flex h-9 w-full overflow-hidden rounded-sm"
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
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: p.fill }}
            />
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
