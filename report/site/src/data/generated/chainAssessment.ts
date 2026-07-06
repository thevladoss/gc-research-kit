// СГЕНЕРИРОВАНО scripts/build-data.mjs — не редактировать руками.
// Источник: synthesis/aggregate.json + adjudication/*.ruling.json (2026-07-06).
export type ChainBasis = 'intact' | 'intactException' | 'destroyed' | 'contested' | 'mixed' | 'premise' | 'outside'
export type ChainVoice = 'accurate' | 'overstated' | 'refutedAbsolutes' | null
export interface ChainAssessment { link: number; basis: ChainBasis; voice: ChainVoice }
export const chainAssessment: readonly ChainAssessment[] = [
  {
    "link": 1,
    "basis": "intactException",
    "voice": "refutedAbsolutes"
  },
  {
    "link": 2,
    "basis": "destroyed",
    "voice": "overstated"
  },
  {
    "link": 3,
    "basis": "intact",
    "voice": "accurate"
  },
  {
    "link": 4,
    "basis": "contested",
    "voice": "refutedAbsolutes"
  },
  {
    "link": 5,
    "basis": "premise",
    "voice": null
  },
  {
    "link": 6,
    "basis": "mixed",
    "voice": "overstated"
  },
  {
    "link": 7,
    "basis": "outside",
    "voice": null
  }
] as const
