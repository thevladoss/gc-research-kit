import { useI18n } from '../lib/i18n'
import { rulingColor, rulingLabelKey, rulingStep } from '../lib/verdicts'

/**
 * Пятиступенчатая шкала решения: ● — текст как напечатан, ○ — осторожная версия,
 * стрелка между ними — разрыв. Позиция кодирует решение (слева хуже, справа лучше),
 * цвет дублирует позицию, полные подписи — в title/aria.
 */
export function FiveStepScale({
  asWritten,
  weakened,
  width = 210,
}: {
  asWritten: string
  weakened: string | null
  width?: number
}) {
  const { t } = useI18n()
  const H = 26
  const R = 4.5
  const pad = 8
  const stepX = (i: number) => pad + (i * (width - pad * 2)) / 4
  const cy = H / 2

  const label = (r: string) => t(`verdicts.${rulingLabelKey[r] ?? r}`)

  if (asWritten === 'out-of-scope') {
    return (
      <span
        className="font-mono text-[0.6875rem]"
        style={{ color: 'var(--color-v-conditional-ink)' }}
      >
        {t('dossiersPage.card.outOfScope')}
      </span>
    )
  }

  const a = rulingStep[asWritten]
  const w = weakened && weakened !== 'n/a' ? rulingStep[weakened] : null
  const aC = rulingColor[asWritten]
  const wC = weakened && weakened !== 'n/a' ? rulingColor[weakened] : null

  const title =
    `${t('dossiersPage.scale.printed')}: ${label(asWritten)}` +
    (w != null && weakened
      ? ` → ${t('dossiersPage.scale.weakened')}: ${label(weakened)}`
      : ` · ${t('dossiersPage.card.noWeakened')}`)

  return (
    <span className="inline-flex items-center gap-2">
      <svg width={width} height={H} role="img" aria-label={title}>
        <title>{title}</title>
        {/* базовая линия и ступени */}
        <line x1={stepX(0)} y1={cy} x2={stepX(4)} y2={cy} stroke="var(--color-line)" strokeWidth={1.5} />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={stepX(i)} cy={cy} r={2} fill="var(--color-line)" />
        ))}
        {/* стрелка разрыва */}
        {w != null && w !== a && (
          <g stroke={wC!.fill} strokeWidth={1.8} fill="none">
            <line x1={stepX(a) + (w > a ? R + 2 : -R - 2)} y1={cy} x2={stepX(w) + (w > a ? -R - 3 : R + 3)} y2={cy} />
            <path
              d={
                w > a
                  ? `M ${stepX(w) - R - 7} ${cy - 3.5} L ${stepX(w) - R - 2.5} ${cy} L ${stepX(w) - R - 7} ${cy + 3.5}`
                  : `M ${stepX(w) + R + 7} ${cy - 3.5} L ${stepX(w) + R + 2.5} ${cy} L ${stepX(w) + R + 7} ${cy + 3.5}`
              }
            />
          </g>
        )}
        {/* ○ осторожная версия */}
        {w != null && (
          <circle cx={stepX(w)} cy={cy} r={R} fill="var(--color-paper)" stroke={wC!.fill} strokeWidth={2} />
        )}
        {/* ● как напечатано */}
        <circle cx={stepX(a)} cy={cy} r={w === a ? R - 1.5 : R} fill={aC.fill} />
      </svg>
      {(!weakened || weakened === 'n/a') && (
        <span className="font-mono text-[0.625rem] text-ink-soft">
          {t('dossiersPage.card.noWeakened')}
        </span>
      )}
    </span>
  )
}
