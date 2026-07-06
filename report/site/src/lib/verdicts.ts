/** Единая система цветов вердиктов (DESIGN.md) для классов исхода и решений разбора. */

export type Outcome = 'stands' | 'fallen' | 'open' | 'conditional' | 'outside' | 'none'

export const outcomeStyle: Record<Exclude<Outcome, 'none'>, { fill: string; ink: string }> = {
  stands: { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)' },
  fallen: { fill: 'var(--color-v-improbable)', ink: 'var(--color-v-improbable-ink)' },
  open: { fill: 'var(--color-v-open)', ink: 'var(--color-v-open-ink)' },
  conditional: { fill: 'var(--color-v-conditional)', ink: 'var(--color-v-conditional-ink)' },
  outside: { fill: 'var(--color-v-unverifiable)', ink: 'var(--color-v-unverifiable-ink)' },
}

/** Позиция решения на пятиступенчатой шкале (0 — опровергнуто … 4 — надёжно). */
export const rulingStep: Record<string, number> = {
  discredited: 0,
  improbable: 1,
  'genuinely-open': 2,
  probable: 3,
  'well-supported': 4,
}

export const rulingColor: Record<string, { fill: string; ink: string }> = {
  discredited: { fill: 'var(--color-v-discredited)', ink: 'var(--color-v-discredited-ink)' },
  improbable: { fill: 'var(--color-v-improbable)', ink: 'var(--color-v-improbable-ink)' },
  'genuinely-open': { fill: 'var(--color-v-open)', ink: 'var(--color-v-open-ink)' },
  probable: { fill: 'var(--color-v-probable)', ink: 'var(--color-v-probable-ink)' },
  'well-supported': { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)' },
  'out-of-scope': { fill: 'var(--color-v-conditional)', ink: 'var(--color-v-conditional-ink)' },
}

/** Ключ подписи решения в content/*.json (verdicts.*). */
export const rulingLabelKey: Record<string, string> = {
  discredited: 'discredited',
  improbable: 'improbable',
  'genuinely-open': 'open',
  probable: 'probable',
  'well-supported': 'wellSupported',
  'out-of-scope': 'conditional',
}

/** Цвет чипа по labelKey утверждения (chainDetail). */
export const labelKeyColor: Record<string, { fill: string; ink: string }> = {
  supported: { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)' },
  wellSupported: { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)' },
  probable: { fill: 'var(--color-v-probable)', ink: 'var(--color-v-probable-ink)' },
  open: { fill: 'var(--color-v-open)', ink: 'var(--color-v-open-ink)' },
  anachronistic: { fill: 'var(--color-v-anach)', ink: 'var(--color-v-anach-ink)' },
  improbable: { fill: 'var(--color-v-improbable)', ink: 'var(--color-v-improbable-ink)' },
  discredited: { fill: 'var(--color-v-discredited)', ink: 'var(--color-v-discredited-ink)' },
  contradicted: { fill: 'var(--color-v-discredited)', ink: 'var(--color-v-discredited-ink)' },
  conditional: { fill: 'var(--color-v-conditional)', ink: 'var(--color-v-conditional-ink)' },
  unverifiable: { fill: 'var(--color-v-unverifiable)', ink: 'var(--color-v-unverifiable-ink)' },
}
