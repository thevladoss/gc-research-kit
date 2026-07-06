#!/usr/bin/env node
/**
 * Единый источник данных сайта и публичного датасета.
 *
 * Читает реальные файлы пайплайна GCHAR:
 *   synthesis/aggregate.json          — итоговые метрики, статусы цепи тезиса, адъюдикационный слой
 *   adjudication/DNN_*.ruling.json    — 23 досье с решениями по хартии
 *   impact/gc_chNN.impact.json        — полная история утверждений (extraction+verification+impact[+impact_adjudicated])
 *   adversarial/gc_chNN.defended.json — объекты защиты (defense)
 *   ADJUDICATION_CHARTER.md           — хартия (в датасет как есть)
 *
 * Пишет:
 *   src/data/generated/*.ts           — типизированные модули; каждая цифра на сайте берётся отсюда
 *   public/data/claims_full.json      — одна запись на ID с полной историей вердиктов
 *   public/data/dossiers.json         — 23 досье целиком (санитизированы)
 *   public/data/aggregate.json        — санитизированная копия aggregate
 *   public/data/ADJUDICATION_CHARTER.md
 *   public/data/DATA_README.md        — RU+EN описание датасета
 *   public/data/data.zip              — всё вышеперечисленное одним архивом
 *
 * Санитизация: удаляются внутренние заметки о бюджете поиска/повторных запусках
 * (top-level `notes` стадийных файлов и досье). Все rationale, источники и аргументы
 * сохраняются нетронутыми.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE = path.resolve(__dirname, '..')
const ROOT = path.resolve(SITE, '..', '..')

const DATA_VERSION = '1.0'

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

// ---------- входы ----------
const aggregate = readJson(path.join(ROOT, 'synthesis', 'aggregate.json'))
const charterMd = readFileSync(path.join(ROOT, 'ADJUDICATION_CHARTER.md'), 'utf8')

const adjDir = path.join(ROOT, 'adjudication')
const rulingFiles = readdirSync(adjDir).filter((f) => f.endsWith('.ruling.json')).sort()
if (rulingFiles.length !== 23) {
  throw new Error(`ожидалось 23 ruling-файла, найдено ${rulingFiles.length}`)
}
const dossiers = rulingFiles.map((f) => readJson(path.join(adjDir, f)))

const impactDir = path.join(ROOT, 'impact')
const impactFiles = readdirSync(impactDir).filter((f) => /^gc_ch\d{2}\.impact\.json$/.test(f)).sort()
if (impactFiles.length !== 43) {
  throw new Error(`ожидалось 43 impact-файла, найдено ${impactFiles.length}`)
}

const defendedByCh = new Map()
for (const f of readdirSync(path.join(ROOT, 'adversarial'))) {
  const m = f.match(/^gc_ch(\d{2})\.defended\.json$/)
  if (m) defendedByCh.set(Number(m[1]), readJson(path.join(ROOT, 'adversarial', f)))
}

// ---------- индексы ----------
// решение адъюдикации на каждый из 97 бывших disputed
const rulingByClaim = new Map()
for (const d of dossiers) {
  for (const r of d.rulings) {
    rulingByClaim.set(r.id, { dossier: d.dossier, slug: d.slug, ruling: r })
  }
}

// адъюдикационный слой aggregate (re-score, цепочки, period_standard)
const adjLayer = aggregate.adjudication_layer
const adjClaimById = new Map(adjLayer.claims.map((c) => [c.id, c]))

// ---------- claims_full.json ----------
const claimsFull = []
const chapterSummaries = []
for (const f of impactFiles) {
  const ch = readJson(path.join(impactDir, f))
  const chNum = ch.chapter
  const defended = defendedByCh.get(chNum)
  const defenseById = new Map()
  if (defended) {
    for (const c of defended.claims) if (c.defense) defenseById.set(c.id, c.defense)
  }

  const perVerdict = {}
  for (const c of ch.claims) {
    const defense = defenseById.get(c.id) ?? null
    const adj = rulingByClaim.get(c.id) ?? null

    // финальный вердикт первого круга: защита могла пересмотреть вердикт верификатора
    const v = c.verification ?? null
    const finalVerdict = defense?.revised_verdict ?? v?.verdict ?? null
    perVerdict[finalVerdict ?? 'none'] = (perVerdict[finalVerdict ?? 'none'] ?? 0) + 1

    const rec = {
      id: c.id,
      chapter: chNum,
      chapter_title: ch.chapter_title,
      paragraph: c.paragraph,
      quote: c.quote,
      claim_text: c.claim_text,
      claim_type: c.claim_type,
      entities: c.entities ?? [],
      verification: v
        ? {
            verdict: v.verdict,
            confidence: v.confidence ?? null,
            rationale: v.rationale ?? null,
            modern_consensus: v.modern_consensus ?? null,
            period_historiography: v.period_historiography ?? null,
            sources: v.sources ?? [],
          }
        : null,
      defense: defense
        ? {
            result: defense.result,
            revised_verdict: defense.revised_verdict ?? null,
            argument: defense.argument ?? null,
            new_sources: defense.new_sources ?? [],
          }
        : null,
      impact: c.impact ?? null,
      impact_adjudicated: c.impact_adjudicated ?? null,
      adjudication: adj
        ? {
            dossier: adj.dossier,
            dossier_slug: adj.slug,
            // флаги слоя синтеза (chain_map + period_standard из aggregate)
            chain_inherited: adjClaimById.get(c.id)?.chain_inherited ?? false,
            period_standard: adjClaimById.get(c.id)?.period_standard ?? null,
            ...adj.ruling,
          }
        : null,
    }
    claimsFull.push(rec)
  }
  chapterSummaries.push({
    chapter: chNum,
    title: ch.chapter_title,
    claims: ch.claims.length,
    verdicts: perVerdict,
  })
}

if (claimsFull.length !== aggregate.corpus_totals.claims_extracted) {
  throw new Error(
    `claims_full: ${claimsFull.length} записей, ожидалось ${aggregate.corpus_totals.claims_extracted}`,
  )
}
// каждое из 97 решений адъюдикации должно найти свою запись
const claimIds = new Set(claimsFull.map((c) => c.id))
for (const id of rulingByClaim.keys()) {
  if (!claimIds.has(id)) throw new Error(`решение адъюдикации без утверждения: ${id}`)
}

// ---------- санитизация ----------
const stripKeysDeep = (obj, keys) => {
  if (Array.isArray(obj)) return obj.map((x) => stripKeysDeep(x, keys))
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      if (keys.has(k)) continue
      out[k] = stripKeysDeep(v, keys)
    }
    return out
  }
  return obj
}

// у досье убираем top-level notes (учёт поисков/бюджета); per-claim поля сохраняются
const dossiersPublic = dossiers.map((d) => {
  const { notes: _notes, ...rest } = d
  return rest
})

// в aggregate: method_notes содержит только методологию — оставляем; ничего служебного нет,
// но перестрахуемся от путей файлов в свободном тексте не пытаемся — их там нет по построению.
const aggregatePublic = stripKeysDeep(aggregate, new Set())

// ---------- метрики для сайта ----------
const km = aggregate.key_metrics
const ct = aggregate.corpus_totals
const stats = {
  claims_total: ct.claims_extracted,
  chapters: ct.chapters,
  checkable_total: km.empirically_checkable_final,
  supported_share_of_checkable: km.supported_share_of_checkable,
  confirmed_discrepancies: km.confirmed_discrepancies_total,
  anachronistic_share_of_confirmed: km.anachronistic_share_of_confirmed,
  surviving_contradicted: km.confirmed_by_verdict.contradicted,
  surviving_misquotations: km.surviving_misquotations,
  attributed_quotes_total: ct.claim_type_distribution_manifest.attributed_quote,
  unverifiable_total: ct.verdicts_final.unverifiable,
  disputed_adjudicated: adjLayer.claims_adjudicated,
  dossiers: adjLayer.dossiers,
  rulings_as_written: adjLayer.rulings_as_written,
  rulings_weakened: adjLayer.rulings_weakened,
  accusatory_total: 81,
  weakened_recovered: 73,
  weakened_not_recovered: 8,
  framing_gap_distribution_97: adjLayer.framing_gap_distribution_97,
  failing_component_kind: {
    fact: adjLayer.failing_component_kind_81.fact,
    frame: adjLayer.failing_component_kind_81.frame,
    motive: adjLayer.failing_component_kind_81.motive,
  },
  chains: {
    chain_inherited: adjLayer.chains.chain_inherited,
    independent_failure_points: adjLayer.chains.independent_failure_points,
  },
  direction: {
    accusatory: adjLayer.direction_distribution.accusatory_as_written,
    genuinely_open: adjLayer.direction_distribution.genuinely_open,
    favorable: adjLayer.direction_distribution.favorable_as_written,
    conditional_premise: adjLayer.direction_distribution.out_of_scope_conditional_premise,
    verifier_reversals_in_favor: adjLayer.direction_distribution.verifier_reversals_in_favor_of_book.length,
  },
  period_standard: {
    total: adjLayer.period_standard.counts.total_tagged,
    period_scholarship: adjLayer.period_standard.counts['period-scholarship'],
    expositor_tradition: adjLayer.period_standard.counts['expositor-tradition'],
  },
  genuinely_open_ids: adjLayer.direction_distribution.genuinely_open_ids,
  defense: {
    full_reversals: ct.defense_adjustments.defense_succeeded_full_reversals,
    downgrades: ct.defense_adjustments.verdict_downgraded,
  },
  load_bearing_rescore: adjLayer.rescore.load_bearing,
  generated_at: aggregate.generated_at,
  data_version: DATA_VERSION,
}

// ---------- цепь тезиса ----------
const chain = aggregate.thesis_chain_status.map((l) => ({
  link: l.link,
  title_ru: l.title_ru,
  status: l.status,
  basis: l.basis,
  commentary_ru: l.commentary_ru,
}))

// ---------- выходы ----------
const genDir = path.join(SITE, 'src', 'data', 'generated')
const pubDir = path.join(SITE, 'public', 'data')
for (const d of [genDir, pubDir]) if (!existsSync(d)) mkdirSync(d, { recursive: true })

const banner = `// СГЕНЕРИРОВАНО scripts/build-data.mjs — не редактировать руками.\n// Источник: synthesis/aggregate.json + adjudication/*.ruling.json (${aggregate.generated_at}).\n`

writeFileSync(
  path.join(genDir, 'stats.ts'),
  banner + `export const stats = ${JSON.stringify(stats, null, 2)} as const\n`,
)
writeFileSync(
  path.join(genDir, 'chain.ts'),
  banner +
    `export type ChainStatus = 'цело' | 'повреждено' | 'условная посылка' | 'вне проверки'\n` +
    `export interface ChainLink { link: number; title_ru: string; status: ChainStatus; basis: readonly string[]; commentary_ru: string }\n` +
    `export const thesisChain: readonly ChainLink[] = ${JSON.stringify(chain, null, 2)} as const\n`,
)
// chapters.ts пишется ниже (нужен labelKeyOf из секции этапа 2)

// ---------- официальный русский перевод цитат ----------
// content/ru_quotes.json создаёт scripts/build_ru_quotes.py из source/gc_ru_official.pdf
// (PDF в git не входит; карта цитат — входит, датасет data.zip её НЕ содержит).
const ruQuotesPath = path.join(SITE, 'content', 'ru_quotes.json')
const ruQuotes = existsSync(ruQuotesPath) ? JSON.parse(readFileSync(ruQuotesPath, 'utf8')) : {}
const ruPassagesPath = path.join(SITE, 'content', 'ru_passages.json')
const ruPassageTexts = existsSync(ruPassagesPath) ? JSON.parse(readFileSync(ruPassagesPath, 'utf8')) : {}
if (!Object.keys(ruQuotes).length) {
  console.warn('! content/ru_quotes.json не найден — русская локаль покажет английские цитаты')
}
const ruQuoteOf = (id) => (id.startsWith('_') ? null : (ruQuotes[id]?.ru ?? null))

// content/ru_reasoning.json создаёт scripts/build_ru_reasoning.py: переводы
// аналитических текстов конвейера (ключ "id|field" → русский текст). Для читаемости;
// авторитетная версия — английская. В data.zip НЕ входит (public-копия ниже).
const ruReasoningPath = path.join(SITE, 'content', 'ru_reasoning.json')
const ruReasoning = existsSync(ruReasoningPath) ? JSON.parse(readFileSync(ruReasoningPath, 'utf8')) : {}
if (!Object.keys(ruReasoning).filter((k) => !k.startsWith('_')).length) {
  console.warn('! content/ru_reasoning.json пуст — русская локаль покажет английские обоснования')
}

// английская ключевая формулировка для чувствительных утверждений:
// опровергнутые абсолюты и большие разрывы формулировка↔суть (вердикты выносились
// по напечатанному английскому тексту — перевод мог его смягчить)
const enKeyOf = (id) => {
  const adj = rulingByClaim.get(id)
  if (!adj) return null
  const r = adj.ruling
  const accusatory = r.ruling_as_written === 'discredited' || r.ruling_as_written === 'improbable'
  if (!accusatory || (r.ruling_as_written !== 'discredited' && (r.framing_gap ?? 0) < 3)) return null
  const audit = r.quantifier_audit?.[0]
  if (!audit) return null
  const phrase = audit.split(' (')[0].replace(/^["'«]|["'»]$/g, '').trim()
  return phrase && phrase.length <= 70 ? phrase : null
}

// ---------- этап 2: детали звеньев цепи, пассажи вычитания, досье ----------

// итоговый вердикт первого круга: защита могла пересмотреть вердикт верификатора
const effectiveVerdict = (c) => c.defense?.revised_verdict ?? c.verification?.verdict

// итоговый класс исхода для каждого утверждения (единая логика сайта)
const outcomeOf = (c) => {
  const adj = rulingByClaim.get(c.id)
  if (adj) {
    return {
      'well-supported': 'stands',
      probable: 'stands',
      'genuinely-open': 'open',
      improbable: 'fallen',
      discredited: 'fallen',
      'out-of-scope': 'conditional',
    }[adj.ruling.ruling_as_written]
  }
  const v = effectiveVerdict(c)
  return (
    {
      supported: 'stands',
      anachronistic: 'fallen',
      contradicted: 'fallen',
      misquotation: 'fallen',
      disputed: 'open',
      unverifiable: 'outside',
    }[v] ?? 'none'
  )
}

// ключ подписи вердикта в content/*.json → verdicts.*
const labelKeyOf = (c) => {
  const adj = rulingByClaim.get(c.id)
  if (adj) {
    return {
      'well-supported': 'wellSupported',
      probable: 'probable',
      'genuinely-open': 'open',
      improbable: 'improbable',
      discredited: 'discredited',
      'out-of-scope': 'conditional',
    }[adj.ruling.ruling_as_written]
  }
  return {
    supported: 'supported',
    anachronistic: 'anachronistic',
    contradicted: 'contradicted',
    misquotation: 'discredited',
    disputed: 'open',
    unverifiable: 'unverifiable',
  }[effectiveVerdict(c)]
}

const claimById = new Map(claimsFull.map((c) => [c.id, c]))
const loadBearingOf = (c) => Boolean(c.impact_adjudicated?.load_bearing ?? c.impact?.load_bearing)
const impactScoreOf = (c) => c.impact_adjudicated?.impact_score ?? c.impact?.impact_score ?? 0

const claimBrief = (id) => {
  const c = claimById.get(id)
  if (!c) throw new Error(`chainDetail: нет утверждения ${id}`)
  const adjMeta = adjClaimById.get(id)
  const adj = rulingByClaim.get(id)
  return {
    id,
    chapter: c.chapter,
    paragraph: c.paragraph,
    quote: c.quote.length > 230 ? c.quote.slice(0, 227).trimEnd() + '…' : c.quote,
    quoteRu: ruQuoteOf(id),
    enKey: enKeyOf(id),
    outcome: outcomeOf(c),
    labelKey: labelKeyOf(c),
    loadBearing: loadBearingOf(c),
    adjudicated: adj
      ? {
          asWritten: adj.ruling.ruling_as_written,
          weakened: adj.ruling.ruling_weakened ?? null,
          gap: adj.ruling.framing_gap ?? null,
          kind: adj.ruling.failing_component_kind ?? null,
          confidence: adj.ruling.confidence ?? null,
        }
      : null,
    chainInherited: adjMeta?.chain_inherited ?? false,
    period: adjMeta?.period_standard ?? null,
  }
}

// карта книги: пер-главные счётчики итоговых классов + несущие утверждения.
// Классы для карты: favorable = supported + оправданные разбором (WS/probable).
const MAP_CLASS = {
  supported: 'supported',
  wellSupported: 'supported',
  probable: 'supported',
  open: 'open',
  anachronistic: 'anachronistic',
  improbable: 'improbable',
  discredited: 'discredited',
  contradicted: 'discredited',
  conditional: 'conditional',
  unverifiable: 'unverifiable',
}
const chapterMap = chapterSummaries.map((ch) => {
  const claims = claimsFull.filter((c) => c.chapter === ch.chapter)
  const outcomes = {
    supported: 0,
    open: 0,
    anachronistic: 0,
    improbable: 0,
    discredited: 0,
    conditional: 0,
    unverifiable: 0,
  }
  let loadBearing = 0
  for (const c of claims) {
    outcomes[MAP_CLASS[labelKeyOf(c)]]++
    if (loadBearingOf(c)) loadBearing++
  }
  return { chapter: ch.chapter, title: ch.title, claims: claims.length, outcomes, loadBearing }
})
writeFileSync(
  path.join(genDir, 'chapters.ts'),
  banner +
    `export interface ChapterMap { chapter: number; title: string; claims: number; outcomes: { supported: number; open: number; anachronistic: number; improbable: number; discredited: number; conditional: number; unverifiable: number }; loadBearing: number }\n` +
    `export const chapterMap: readonly ChapterMap[] = ${JSON.stringify(chapterMap, null, 2)} as const\n`,
)

// статистика звеньев: главы каждого звена (по thesis_chain_status aggregate,
// «гл. …» в title_ru) и реальные итоги проверки по этим главам — для честных
// строк-контекстов: списки на страницах звеньев кураторские, не полный реестр.
const CHAIN_CHAPTERS = {
  1: [1, 2, 3],
  2: [4, 13],
  3: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  4: [17, 18, 19, 20, 21, 22],
  5: [23, 24, 28],
  6: [25, 26, 33, 35, 36],
  7: [36, 37, 38, 39, 40, 41, 42],
}
const GROUP_OF_LABEL = {
  supported: 'supported', wellSupported: 'supported', probable: 'supported',
  open: 'open', anachronistic: 'fallen', improbable: 'fallen',
  discredited: 'fallen', contradicted: 'fallen',
  conditional: 'conditional', unverifiable: 'unverifiable',
}
// детали звеньев: basis-утверждения синтеза, сгруппированные по исходу.
// Звену 3 (цело) добавлены три утверждения, оправданных защитой в его главах:
// соответствие целого звена — полноценный результат, «что выстояло» не должно пустовать.
const CHAIN_EXTRA_STANDS = { 3: ['GC-05-075', 'GC-12-027', 'GC-14-032'] }

const chainDetail = aggregate.thesis_chain_status.map((l) => {
  const extra = (CHAIN_EXTRA_STANDS[l.link] ?? []).map(claimBrief)
  for (const e of extra) {
    if (e.outcome !== 'stands') throw new Error(`extra-stands ${e.id}: исход ${e.outcome}, не stands`)
  }
  const briefs = [...l.basis.map(claimBrief), ...extra]
  const order = (a, b) =>
    Number(b.loadBearing) - Number(a.loadBearing) ||
    impactScoreOf(claimById.get(b.id)) - impactScoreOf(claimById.get(a.id)) ||
    a.id.localeCompare(b.id)
  const group = (o) => briefs.filter((x) => x.outcome === o).sort(order)
  return {
    link: l.link,
    stands: group('stands'),
    fallen: group('fallen'),
    open: group('open'),
    conditional: group('conditional'),
  }
})

const chainStats = aggregate.thesis_chain_status.map((l, i) => {
  const chapters = CHAIN_CHAPTERS[l.link]
  const chSet = new Set(chapters)
  const totals = { claims: 0, supported: 0, fallen: 0, open: 0, conditional: 0, unverifiable: 0 }
  for (const c of claimsFull) {
    if (!chSet.has(c.chapter)) continue
    totals.claims++
    totals[GROUP_OF_LABEL[labelKeyOf(c)]]++
  }
  const d = chainDetail[i]
  const shown = d.stands.length + d.fallen.length + d.open.length + d.conditional.length
  return { link: l.link, chapters, shown, totals }
})

// пассажи «режима вычитания»: выбранные абзацы, размеченные исходами утверждений
const CHAIN_PASSAGES = {
  1: { chapter: 1, paragraphs: [34] },
  2: { chapter: 4, paragraphs: [8, 9] },
  3: { chapter: 7, paragraphs: [16] },
  4: { chapter: 18, paragraphs: [29] },
  5: { chapter: 23, paragraphs: [3] },
  6: { chapter: 26, paragraphs: [3] },
  7: { chapter: 36, paragraphs: [11] },
}

const norm = (s) => s.replace(/\s+/g, ' ').trim()
// для поиска: унификация апострофов/кавычек (замены той же длины — индексы сохраняются)
const matchable = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"')
const chapterParas = (ch) => {
  const txt = readFileSync(
    path.join(ROOT, 'source', 'chapters', `gc_ch${String(ch).padStart(2, '0')}.txt`),
    'utf8',
  )
  const out = new Map()
  for (const m of txt.matchAll(/\[¶(\d+)\]\s*([\s\S]*?)(?=\n\[¶|$)/g)) {
    out.set(Number(m[1]), norm(m[2]))
  }
  return out
}

// сегментация абзаца по цитатам утверждений (общая для EN и RU текстов)
const segmentBy = (text, marks) => {
  marks.sort((a, b) => a.start - b.start || b.end - a.end)
  const flat = []
  let cursor = 0
  for (const m of marks) {
    if (m.start < cursor) continue
    flat.push(m)
    cursor = m.end
  }
  const segments = []
  let pos = 0
  for (const m of flat) {
    if (m.start > pos) segments.push({ text: text.slice(pos, m.start) })
    const seg = { text: text.slice(m.start, m.end), id: m.id, outcome: m.outcome }
    if (m.enKey) seg.enKey = m.enKey
    segments.push(seg)
    pos = m.end
  }
  if (pos < text.length) segments.push({ text: text.slice(pos) })
  return segments
}

const chainPassages = Object.entries(CHAIN_PASSAGES).map(([link, cfg]) => {
  const paras = chapterParas(cfg.chapter)
  const passageParas = cfg.paragraphs.map((p) => {
    const text = paras.get(p)
    if (!text) throw new Error(`пассаж: нет ¶${p} в гл. ${cfg.chapter}`)
    const marks = []
    for (const c of claimsFull) {
      if (c.chapter !== cfg.chapter || c.paragraph !== p) continue
      const q = norm(c.quote)
      const start = matchable(text).indexOf(matchable(q))
      if (start === -1) {
        console.warn(`! пассаж зв.${link}: цитата ${c.id} не найдена в ¶${p}`)
        continue
      }
      marks.push({ start, end: start + q.length, id: c.id, outcome: outcomeOf(c) })
    }
    const segments = segmentBy(text, marks)

    // русский текст того же абзаца по официальному переводу
    const ruText = ruPassageTexts[String(cfg.chapter)]?.[String(p)] ?? null
    let ruSegments = null
    if (ruText) {
      const ruMarks = []
      for (const m of marks) {
        const rq = ruQuoteOf(m.id)
        if (!rq) continue
        const start = ruText.indexOf(rq)
        if (start === -1) {
          console.warn(`! RU-пассаж зв.${link}: цитата ${m.id} не найдена в русском ¶${p}`)
          continue
        }
        ruMarks.push({ start, end: start + rq.length, id: m.id, outcome: m.outcome, enKey: enKeyOf(m.id) })
      }
      ruSegments = segmentBy(ruText, ruMarks)
    }
    return { paragraph: p, segments, ruSegments }
  })
  return { link: Number(link), chapter: cfg.chapter, paras: passageParas }
})

// досье для /dossiers
const dossierCards = dossiers.map((d) => {
  const chapters = [...new Set(d.rulings.map((r) => Number(r.id.split('-')[1])))].sort((a, b) => a - b)
  return {
    dossier: d.dossier,
    slug: d.slug,
    chapters,
    narrative_ru: d.narrative_ru,
    claims: d.rulings.map((r) => {
      const c = claimById.get(r.id)
      const adjMeta = adjClaimById.get(r.id)
      return {
        id: r.id,
        chapter: c.chapter,
        quote: c.quote.length > 150 ? c.quote.slice(0, 147).trimEnd() + '…' : c.quote,
        quoteRu: ruQuoteOf(r.id),
        enKey: enKeyOf(r.id),
        asWritten: r.ruling_as_written,
        weakened: r.ruling_weakened ?? null,
        gap: r.framing_gap ?? null,
        kind: r.failing_component_kind ?? null,
        confidence: r.confidence ?? null,
        loadBearing: loadBearingOf(c),
        chainInherited: adjMeta?.chain_inherited ?? false,
        period: adjMeta?.period_standard ?? null,
      }
    }),
  }
})

writeFileSync(
  path.join(genDir, 'chainStats.ts'),
  banner +
    `export interface ChainLinkStats { link: number; chapters: number[]; shown: number; totals: { claims: number; supported: number; fallen: number; open: number; conditional: number; unverifiable: number } }\n` +
    `export const chainStats: readonly ChainLinkStats[] = ${JSON.stringify(chainStats, null, 2)} as const\n`,
)
writeFileSync(
  path.join(genDir, 'chainDetail.ts'),
  banner +
    `export interface ClaimBrief { id: string; chapter: number; paragraph: number; quote: string; quoteRu: string | null; enKey: string | null; outcome: 'stands' | 'fallen' | 'open' | 'conditional' | 'outside'; labelKey: string; loadBearing: boolean; adjudicated: { asWritten: string; weakened: string | null; gap: number | null; kind: string | null; confidence: string | null } | null; chainInherited: boolean; period: string | null }\n` +
    `export interface ChainLinkDetail { link: number; stands: ClaimBrief[]; fallen: ClaimBrief[]; open: ClaimBrief[]; conditional: ClaimBrief[] }\n` +
    `export const chainDetail: readonly ChainLinkDetail[] = ${JSON.stringify(chainDetail, null, 2)} as const\n`,
)
writeFileSync(
  path.join(genDir, 'chainPassages.ts'),
  banner +
    `export interface PassageSegment { text: string; id?: string; outcome?: 'stands' | 'fallen' | 'open' | 'conditional' | 'outside' | 'none'; enKey?: string }\n` +
    `export interface ChainPassage { link: number; chapter: number; paras: { paragraph: number; segments: PassageSegment[]; ruSegments: PassageSegment[] | null }[] }\n` +
    `export const chainPassages: readonly ChainPassage[] = ${JSON.stringify(chainPassages, null, 2)} as const\n`,
)
writeFileSync(
  path.join(genDir, 'dossiers.ts'),
  banner +
    `export interface DossierClaim { id: string; chapter: number; quote: string; quoteRu: string | null; enKey: string | null; asWritten: string; weakened: string | null; gap: number | null; kind: string | null; confidence: string | null; loadBearing: boolean; chainInherited: boolean; period: string | null }\n` +
    `export interface DossierCard { dossier: string; slug: string; chapters: number[]; narrative_ru: string; claims: DossierClaim[] }\n` +
    `export const dossierCards: readonly DossierCard[] = ${JSON.stringify(dossierCards, null, 2)} as const\n`,
)

// Двухкомпонентная оценка звеньев: «историческая основа» и «подача».
// Присвоения выведены из адъюдикационного слоя и basis-списков synthesis/aggregate.json;
// одиночный ярлык «повреждено» смешивал разные диагнозы, здесь они разведены.
const CHAIN_ASSESSMENT = [
  // 1. Основа цела с одним несущим исключением: GC-01-079 («ни один не погиб») невосстановим
  //    даже в осторожной версии; событийная основа подтверждена или честно открыта
  //    (GC-02-050, GC-02-038, GC-02-008 probable; GC-01-084 genuinely-open).
  //    Подача опровергнута в абсолютах: GC-02-018, GC-02-053, GC-03-032 — discredited.
  { link: 1, basis: 'intactException', voice: 'refutedAbsolutes' },
  // 2. Основа разрушена: GC-04-001/034/046 + GC-26-032 — разрыв в тысячелетие (Ball 1994);
  //    подача преувеличена: романтический слой GC-04-069/082/113, GC-15-043 — improbable.
  { link: 2, basis: 'destroyed', voice: 'overstated' },
  // 3. Основа цела (ни одного несущего повреждения; GC-05-075, GC-12-027, GC-14-032
  //    оправданы защитой); подача точна: не подтвердился только орнамент без нагрузки
  //    (GC-06-027…032, GC-07-036, абсолюты GC-05-107, GC-10-066).
  { link: 3, basis: 'intact', voice: 'accurate' },
  // 4. Основа держится на спорном: якорь GC-18-060 improbable, GC-18-071 исключён астрономией,
  //    ослабленный слой цепочки probable/well-supported (GC-18-081 weakened WS).
  //    Подача опровергнута в абсолютах: GC-18-078, GC-26-069 — оба discredited, класс frame.
  { link: 4, basis: 'contested', voice: 'refutedAbsolutes' },
  // 5. Целиком на непроверяемой посылке: GC-18-058 out-of-scope (условная посылка);
  //    эмпирические входы — повторы якоря (GC-23-008…012, chain-inherited).
  { link: 5, basis: 'premise', voice: null },
  // 6. Основа смешанная: субботняя непрерывность разрушена (GC-03-032 discredited,
  //    GC-26-032 — тысячелетний разрыв), происхождение воскресенья — предмет спора
  //    (GC-35-057 improbable/probable weakened, GC-03-050 genuinely-open).
  //    Подача преувеличена: GC-26-014/025, GC-25-051 — improbable при probable/WS weakened.
  { link: 6, basis: 'mixed', voice: 'overstated' },
  // 7. Вне исторической проверки: самостоятельной эмпирической опоры нет,
  //    периферия GC-42-032 genuinely-open, GC-36-044/GC-37-029 improbable.
  { link: 7, basis: 'outside', voice: null },
]
writeFileSync(
  path.join(genDir, 'chainAssessment.ts'),
  banner +
    `export type ChainBasis = 'intact' | 'intactException' | 'destroyed' | 'contested' | 'mixed' | 'premise' | 'outside'\n` +
    `export type ChainVoice = 'accurate' | 'overstated' | 'refutedAbsolutes' | null\n` +
    `export interface ChainAssessment { link: number; basis: ChainBasis; voice: ChainVoice }\n` +
    `export const chainAssessment: readonly ChainAssessment[] = ${JSON.stringify(CHAIN_ASSESSMENT, null, 2)} as const\n`,
)

// контроль: RU-текст досье в content/ru.json обязан совпадать с данными (единый источник)
{
  const ruPath = path.join(SITE, 'content', 'ru.json')
  if (existsSync(ruPath)) {
    const ruContent = JSON.parse(readFileSync(ruPath, 'utf8'))
    const narratives = ruContent?.dossiersPage?.narratives
    if (narratives) {
      for (const d of dossiers) {
        const inContent = narratives[d.dossier]
        if (inContent !== undefined && norm(inContent) !== norm(d.narrative_ru)) {
          throw new Error(`content/ru.json: narrative ${d.dossier} разошёлся с ruling-файлом`)
        }
      }
    }
  }
}

// ---------- DATA_README ----------
const dataReadme = `# GCHAR — открытый датасет / open dataset

«Историческая проверка "Великой борьбы"» / "A historical audit of *The Great Controversy*"

Версия данных: ${DATA_VERSION}
Дата сборки / build date: ${aggregate.generated_at}

## Что это / What this is

RU. Полные данные систематической проверки исторических утверждений книги Эллен Уайт
«Великая борьба» (издание 1911 года, английский текст, общественное достояние).
Из книги выписаны все проверяемые утверждения (${ct.claims_extracted}), каждое сверено с работами
историков, каждое обвинение прошло проверку «адвокатом книги», а ${adjLayer.claims_adjudicated} спорных
вопросов разобраны по заранее принятым и замороженным правилам (см. ADJUDICATION_CHARTER.md).
Датасет собран тем же скриптом, что и цифры на сайте: расхождений между ними нет по построению.

EN. The complete data of a systematic audit of the historical claims in Ellen G. White's
*The Great Controversy* (1911 edition, English text, public domain). Every checkable claim
was extracted (${ct.claims_extracted}), each checked against historians' work, every accusation passed
through a "defense attorney" stage, and ${adjLayer.claims_adjudicated} disputed questions were resolved under
rules fixed and frozen in advance (see ADJUDICATION_CHARTER.md). The dataset is assembled
by the same script that produces the site's numbers: they cannot diverge.

## Честное примечание / Honesty note

RU. Исследование выполнено с помощью ИИ: методологию и конвейер проверки спроектировал
автор, исполнение — модели Claude (извлечение и оценка веса — Claude Sonnet 4.6, проверка
и защита — Claude Opus 4.8, арбитраж и синтез — Claude Fable 5). Полное описание конвейера —
на странице «Как проверяли» сайта (/method). Все первичные данные открыты в этом архиве.

EN. This is an AI-assisted study: the author designed the methodology and the verification
pipeline; execution was carried out by Claude models (extraction and impact scoring —
Claude Sonnet 4.6; verification and adversarial defense — Claude Opus 4.8; adjudication and
synthesis — Claude Fable 5). The full pipeline is documented on the site's /method page.
All primary data is open in this archive.

## Файлы / Files

- \`claims_full.json\` — одна запись на утверждение (${ct.claims_extracted} записей) с полной историей:
  извлечение (цитата, текст утверждения, тип, глава/абзац) → проверка (вердикт, обоснование,
  источники) → защита (результат, аргумент) → разбор спорного (решение, где было).
  One record per claim with the full history: extraction → verification (verdict, rationale,
  sources) → defense (result, argument) → adjudication ruling where present.
- \`dossiers.json\` — все 23 досье разбора спорных вопросов целиком: обзор доказательств,
  решения по каждому утверждению, русские резюме. All 23 adjudication dossiers in full.
- \`aggregate.json\` — сводные метрики синтеза, статусы 7 звеньев несущей цепи книги,
  адъюдикационный слой. Synthesis aggregate: metrics, thesis-chain statuses, adjudication layer.
- \`ADJUDICATION_CHARTER.md\` — правила разбора спорных вопросов, замороженные до его начала
  (v1.1-frozen). The frozen adjudication charter.
- \`DATA_README.md\` — этот файл. This file.

## Схема claims_full.json / Schema

Каждая запись / each record:

| Поле / field | Значение / meaning |
|---|---|
| id | \`GC-{глава}-{номер}\`, неизменен на всех стадиях / immutable claim ID |
| chapter, paragraph | глава и абзац издания 1911 г. / chapter and paragraph of the 1911 edition |
| quote | точная цитата из книги (EN) / exact quotation from the book |
| claim_text | формулировка проверяемого утверждения / the checkable claim |
| claim_type | event, date, attributed_quote, statistic, causal, biographical, interpretive, theological, geographical |
| verification | вердикт первого круга + обоснование + источники / first-round verdict, rationale, sources |
| defense | результат защиты: подтверждена, смягчена или отклонена / defense outcome |
| impact | вес ошибки по слою Фазы 1 (если оценивался) / Phase-1 impact scores |
| impact_adjudicated | вес после разбора спорного (если пересчитывался) / post-adjudication impact |
| adjudication | решение разбора: по напечатанному и по осторожной версии, разрыв, класс провала, источники / dual ruling, gap, failing class, sources |

## Вердикты и решения / Verdicts and rulings

Первый круг / first round: supported (подтверждено), contradicted (противоречит данным
историков), anachronistic (ошибка эпохи — повторяет источники XIX века), disputed (наука
спорит; ушло на разбор), misquotation (искажённая цитата; после защиты таких не осталось),
unverifiable (вне исторической проверки).

Разбор спорного / adjudication scale: well-supported (надёжно подтверждено), probable
(скорее верно), genuinely-open (наука всерьёз спорит), improbable (скорее неверно),
discredited (опровергнуто документами); out-of-scope = условная посылка (держится на
посылке, которую история не проверяет). Каждое решение двойное: по формулировке как
напечатано и по осторожной версии без абсолютов; разрыв между ними (framing gap 0–4)
записан отдельно. Each ruling is dual: as printed and for a careful weakened version;
the gap between them is recorded.

## Методология кратко / Method in brief

RU. Четыре стадии на каждую главу: извлечение → проверка по источникам → состязательная
защита → оценка веса; затем разбор 97 спорных вопросов по замороженной хартии и пересчёт
веса; каждый обвинительный вывод обязан пережить защиту; правила и все решения открыты.
EN. Four stages per chapter: extraction → verification → adversarial defense → impact
scoring; then adjudication of the 97 disputed questions under a frozen charter with impact
re-scoring; every accusatory conclusion had to survive the defense stage; the rules and
every ruling are open.

## Издание / Edition

Текст книги: The Great Controversy, издание 1911 года (Project Gutenberg #25833),
общественное достояние / public domain.

Примечание о русских отрывках / note on Russian excerpts: на страницах цепи сайта
русская локаль приводит семь коротких отрывков по официальному русскому переводу
«Великой борьбы» (© Ellen G. White Estate); они цитируются в исследовательских целях
(ст. 1274 ГК РФ) и в настоящий архив НЕ включены. On the site's chain pages the RU
locale quotes seven short excerpts from the official Russian translation
(© Ellen G. White Estate); they are quoted for research purposes and are NOT included
in this archive.

Русская локаль сайта приводит цитаты книги по официальному русскому переводу
(© Ellen G. White Estate / издательство «Источник жизни»; цитирование
в исследовательских целях); прежние рабочие переводы проекта заменены официальным
переводом. Русский текст перевода в настоящий архив НЕ входит: датасет — это
английский оригинал 1911 года плюс анализ проекта. The site's Russian locale quotes
the book from the official Russian translation (© Ellen G. White Estate / Istochnik
Zhizni publishing house; quoted for research purposes); the project's earlier working
translations have been replaced by the official translation. The Russian translation
text is NOT included in this archive: the dataset is the 1911 English original plus
the project's analysis.

Примечание о переводах анализа / note on the analysis translations: русская локаль
сайта показывает переводы аналитических текстов конвейера (формулировки утверждений,
обоснования проверки, аргументы защиты, осторожные версии, «что изменило бы вывод»).
Эти переводы выполнены ДЛЯ ЧИТАЕМОСТИ; авторитетная версия анализа — английская,
и в датасет входит именно она. Where a translation is missing, the site shows the
English original marked «(англ.)». The RU locale renders translations of the pipeline's
analytical texts (claim statements, verification rationales, defense arguments, weakened
versions, would-change notes) FOR READABILITY; the authoritative version of the analysis
is the English one, and it is the one included in the dataset.

## Авторство, лицензия, контакт / Authorship, license, contact

Исследование: Владислав Осин / Research: Vladislav Osin.
Данные исследования и тексты сайта: CC BY 4.0 © 2026 Vladislav Osin.
Research data and site texts: CC BY 4.0 © 2026 Vladislav Osin.
Текст «Великой борьбы» 1911 г. — общественное достояние / the GC 1911 text is public domain.

Пример атрибуции / attribution example:
«Осин В., Историческая проверка "Великой борьбы", 2026, https://thevladoss.github.io/gc-research-kit/» /
"Osin V., A Historical Audit of The Great Controversy, 2026, https://thevladoss.github.io/gc-research-kit/".

Исходный код / source code: https://github.com/thevladoss/gc-research-kit
Контакт / contact: osinvladik1 (at) gmail (dot) com

## Журнал изменений / Changelog

- ${DATA_VERSION} (${aggregate.generated_at}) — первая публикация / first release.
`

// ---------- запись public/data ----------
const pubFiles = {
  'claims_full.json': JSON.stringify(claimsFull),
  'dossiers.json': JSON.stringify(dossiersPublic),
  'aggregate.json': JSON.stringify(aggregatePublic),
  'ADJUDICATION_CHARTER.md': charterMd,
  'DATA_README.md': dataReadme,
}
for (const [name, content] of Object.entries(pubFiles)) {
  writeFileSync(path.join(pubDir, name), content)
}

// data.zip — тем же скриптом; zip есть на macOS/Linux, на CI ставится пакетом zip.
// mtime файлов фиксируется, чтобы архив был байт-детерминированным между сборками.
try {
  execFileSync('touch', ['-t', '202601010000', ...Object.keys(pubFiles)], { cwd: pubDir })
  execFileSync('zip', ['-q', '-X', '-j', 'data.zip', ...Object.keys(pubFiles)], { cwd: pubDir })
} catch {
  console.warn('! zip недоступен — data.zip не собран (установите zip и перезапустите)')
}

// карта русских цитат для таблицы утверждений: public/, вне data.zip
const ruQuotesPublic = { _license: ruQuotes._license ?? null }
for (const [cid, v] of Object.entries(ruQuotes)) {
  if (cid.startsWith('_')) continue
  const k = enKeyOf(cid)
  ruQuotesPublic[cid] = k ? { ru: v.ru, k } : { ru: v.ru }
}
writeFileSync(path.join(SITE, 'public', 'ru_quotes.json'), JSON.stringify(ruQuotesPublic))

// карта переводов аналитических текстов: public/, вне data.zip (датасет — английский первоисточник)
writeFileSync(path.join(SITE, 'public', 'ru_reasoning.json'), JSON.stringify(ruReasoning))

// метаданные для сайта: версия, дата, размер архива
const zipPath = path.join(pubDir, 'data.zip')
const zipBytes = existsSync(zipPath) ? statSync(zipPath).size : 0
writeFileSync(
  path.join(genDir, 'meta.ts'),
  banner +
    `export const dataMeta = ${JSON.stringify(
      { version: DATA_VERSION, generated_at: aggregate.generated_at, zipBytes },
      null,
      2,
    )} as const\n`,
)

// ---------- отчёт ----------
const sizes = Object.fromEntries(
  readdirSync(pubDir).map((f) => [f, `${(statSync(path.join(pubDir, f)).size / 1024 / 1024).toFixed(2)} MB`]),
)
console.log('claims_full:', claimsFull.length, 'записей;', 'досье:', dossiersPublic.length)
console.log('public/data:', sizes)
console.log('src/data/generated: stats.ts, chain.ts, chapters.ts')
