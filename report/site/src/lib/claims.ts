/** Типы записей claims_full.json и клиентская логика итогового вердикта. */

export interface SourceLink {
  title: string
  url?: string
  source_class?: string
}

export interface FullClaim {
  id: string
  chapter: number
  chapter_title: string
  paragraph: number
  quote: string
  claim_text: string
  claim_type: string
  entities: string[]
  verification: {
    verdict: string
    confidence: string | null
    rationale: string | null
    modern_consensus: string | null
    period_historiography: string | null
    sources: SourceLink[]
  } | null
  defense: {
    result: string
    revised_verdict: string | null
    argument: string | null
    new_sources: SourceLink[]
  } | null
  impact: {
    severity: number
    centrality: number
    load_bearing: boolean
    impact_score: number
    narrative_arc: string
    reasoning?: string
  } | null
  impact_adjudicated: {
    category: string
    severity?: number
    centrality?: number
    load_bearing?: boolean
    impact_score?: number
    narrative_arc?: string
    framing_gap?: number | null
    failing_component_kind?: string | null
    chain_inherited?: boolean
    reasoning?: string
  } | null
  adjudication: {
    dossier: string
    dossier_slug: string
    chain_inherited: boolean
    period_standard: string | null
    ruling_as_written: string
    ruling_weakened: string | null
    framing_gap: number | null
    failing_component_kind: string | null
    weakened_version?: string
    confidence: string | null
    would_change_this?: string
    minority_engagement?: string
    sources?: { ref: string; tier?: string }[]
  } | null
}

/** Итоговый вердикт первого круга: защита могла пересмотреть вердикт верификатора. */
export const effectiveVerdict = (c: FullClaim) =>
  c.defense?.revised_verdict ?? c.verification?.verdict ?? 'unverifiable'

/** Ключ итоговой подписи (verdicts.* в content) — та же логика, что в build-data. */
export function finalLabelKey(c: FullClaim): string {
  if (c.adjudication) {
    return (
      {
        'well-supported': 'wellSupported',
        probable: 'probable',
        'genuinely-open': 'open',
        improbable: 'improbable',
        discredited: 'discredited',
        'out-of-scope': 'conditional',
      }[c.adjudication.ruling_as_written] ?? 'open'
    )
  }
  return (
    {
      supported: 'supported',
      anachronistic: 'anachronistic',
      contradicted: 'contradicted',
      misquotation: 'discredited',
      disputed: 'open',
      unverifiable: 'unverifiable',
    }[effectiveVerdict(c)] ?? 'unverifiable'
  )
}

/** Группа итога для фильтра карты/таблицы. */
export function filterGroup(c: FullClaim): string {
  const k = finalLabelKey(c)
  if (k === 'wellSupported' || k === 'probable') return 'favorable'
  if (k === 'contradicted') return 'discredited'
  return k
}

export const impactOf = (c: FullClaim) => c.impact_adjudicated ?? c.impact ?? null
export const arcOf = (c: FullClaim) => impactOf(c)?.narrative_arc ?? null
export const severityOf = (c: FullClaim) => impactOf(c)?.severity ?? null
export const loadBearingOf = (c: FullClaim) =>
  Boolean(c.impact_adjudicated?.load_bearing ?? c.impact?.load_bearing)
