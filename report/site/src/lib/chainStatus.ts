import type { ChainBasis, ChainVoice } from '../data/generated/chainAssessment'

/**
 * Единая система цветов вердиктов (DESIGN.md) в применении к двухкомпонентной
 * оценке звеньев: «историческая основа» задаёт цвет и характер контура звена,
 * «подача» — цвет черты под звеном.
 */
export const basisStyle: Record<
  ChainBasis,
  { fill: string; ink: string; stroke: 'solid' | 'nicked' | 'fractured' | 'dashed' | 'dotted'; mixedWith?: string }
> = {
  intact: { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)', stroke: 'solid' },
  // цела, с одним несущим исключением — один короткий разрыв контура
  intactException: {
    fill: 'var(--color-v-supported)',
    ink: 'var(--color-v-supported-ink)',
    stroke: 'nicked',
  },
  destroyed: {
    fill: 'var(--color-v-discredited)',
    ink: 'var(--color-v-discredited-ink)',
    stroke: 'fractured',
  },
  contested: { fill: 'var(--color-v-open)', ink: 'var(--color-v-open-ink)', stroke: 'solid' },
  // смешанная: субботняя непрерывность разрушена | происхождение воскресенья — спор
  mixed: {
    fill: 'var(--color-v-discredited)',
    ink: 'var(--color-v-discredited-ink)',
    stroke: 'fractured',
    mixedWith: 'var(--color-v-open)',
  },
  premise: {
    fill: 'var(--color-v-conditional)',
    ink: 'var(--color-v-conditional-ink)',
    stroke: 'dashed',
  },
  outside: {
    fill: 'var(--color-v-unverifiable)',
    ink: 'var(--color-v-unverifiable-ink)',
    stroke: 'dotted',
  },
}

export const voiceStyle: Record<Exclude<ChainVoice, null>, { fill: string; ink: string }> = {
  accurate: { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)' },
  overstated: { fill: 'var(--color-v-anach)', ink: 'var(--color-v-anach-ink)' },
  refutedAbsolutes: { fill: 'var(--color-v-discredited)', ink: 'var(--color-v-discredited-ink)' },
}
