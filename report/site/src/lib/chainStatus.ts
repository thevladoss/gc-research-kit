import type { ChainStatus } from '../data/generated/chain'

/** Единая система цветов вердиктов (DESIGN.md) в применении к статусам звеньев цепи. */
export const chainStatusStyle: Record<
  ChainStatus,
  { fill: string; ink: string; stroke: 'solid' | 'fractured' | 'dashed' | 'dotted' }
> = {
  'цело': { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)', stroke: 'solid' },
  'повреждено': {
    fill: 'var(--color-v-improbable)',
    ink: 'var(--color-v-improbable-ink)',
    stroke: 'fractured',
  },
  'условная посылка': {
    fill: 'var(--color-v-conditional)',
    ink: 'var(--color-v-conditional-ink)',
    stroke: 'dashed',
  },
  'вне проверки': {
    fill: 'var(--color-v-unverifiable)',
    ink: 'var(--color-v-unverifiable-ink)',
    stroke: 'dotted',
  },
}
