import type { ChainBasis, ChainVoice } from '../data/generated/chainAssessment'

/**
 * Составной индекс прочности звена для SVG цепи: одно значение из четырёх,
 * выведенное из двух компонентов по правилу «хуже из двух». Полная
 * двухкомпонентная правда остаётся в панели и на страницах звеньев.
 * Кодирование двойное: цвет + целостность кольца (сплошное / сплошное
 * приглушённое / с видимым разрывом / бледный контур).
 */
export type ChainComposite = 'sound' | 'contested' | 'damaged' | 'outside'

export const compositeOfBasis: Record<ChainBasis, ChainComposite> = {
  intact: 'sound', // зв. 3
  intactException: 'damaged', // зв. 1: несущее исключение + подача в абсолютах → хуже из двух
  destroyed: 'damaged', // зв. 2
  contested: 'contested', // зв. 4
  mixed: 'damaged', // зв. 6: хуже из двух половин
  premise: 'outside', // зв. 5 (в панели — «условная посылка»)
  outside: 'outside', // зв. 7
}

export const compositeStyle: Record<
  ChainComposite,
  { fill: string; ink: string; ring: 'solid' | 'broken' | 'dashed'; width: number }
> = {
  sound: { fill: 'var(--color-v-supported)', ink: 'var(--color-v-supported-ink)', ring: 'solid', width: 10 },
  contested: { fill: 'var(--color-v-open)', ink: 'var(--color-v-open-ink)', ring: 'solid', width: 10 },
  damaged: { fill: 'var(--color-v-improbable)', ink: 'var(--color-v-improbable-ink)', ring: 'broken', width: 10 },
  outside: { fill: 'var(--color-v-unverifiable)', ink: 'var(--color-v-unverifiable-ink)', ring: 'dashed', width: 7 },
}

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
