import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { chapterMap, type ChapterMap } from '../data/generated/chapters'
import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

/**
 * Карта книги: 43 главы одной SVG-лентой. Высота столбца — число утверждений,
 * заливка — доли итогов проверки (единая шкала вердиктов), ромб — несущие
 * утверждения. Асимметрия видна сразу: тёплое собирается над вальденсами
 * и хронологией 1844 года, главы Реформации почти целиком синие.
 */

const BAR_W = 18
const PITCH = 24
const PAD = 10
const W = PAD * 2 + PITCH * 42 + BAR_W
const BASE_Y = 168
const MAX_H = 150
const GAP = 1.5 // бумажный зазор между сегментами

// порядок снизу вверх: подтверждённое основание → вне проверки → спорное → тёплое сверху
interface Segment {
  key: keyof ChapterMap['outcomes']
  fill: string
  hatch?: boolean
}
const SEGMENTS: readonly Segment[] = [
  { key: 'supported', fill: 'var(--color-v-supported)' },
  { key: 'unverifiable', fill: 'var(--color-v-unverifiable)', hatch: true },
  { key: 'open', fill: 'var(--color-v-open)' },
  { key: 'conditional', fill: 'var(--color-v-conditional)' },
  { key: 'anachronistic', fill: 'var(--color-v-anach)' },
  { key: 'improbable', fill: 'var(--color-v-improbable)' },
  { key: 'discredited', fill: 'var(--color-v-discredited)' },
]

const maxClaims = Math.max(...chapterMap.map((c) => c.claims))

function Bar({ ch, index, active, onActivate }: { ch: ChapterMap; index: number; active: boolean; onActivate: () => void }) {
  const { t, tp } = useI18n()
  const x = PAD + index * PITCH
  const total = ch.claims
  let y = BASE_Y
  const rects = SEGMENTS.flatMap((s) => {
    const n = ch.outcomes[s.key]
    if (!n) return []
    const h = Math.max((n / maxClaims) * MAX_H - GAP, 1.2)
    y -= h + GAP
    return [{ ...s, n, y: y + GAP, h }]
  })
  const title = t(`mapPage.chapterTitles.${ch.chapter}`)
  return (
    <a
      href={href.explorerWith({ ch: String(ch.chapter) })}
      aria-label={`${tp('mapPage.chapterOf', { n: ch.chapter })} — ${title}, ${total}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      style={{ outline: 'none' }}
    >
      {/* зона наведения на всю колонку */}
      <rect x={x - 3} y={4} width={PITCH} height={BASE_Y + 14} fill="transparent" />
      {active && (
        <rect x={x - 3} y={6} width={PITCH} height={BASE_Y - 2} fill="var(--color-ink)" opacity={0.06} rx={3} />
      )}
      {rects.map((r) => (
        <rect
          key={r.key}
          x={x}
          y={r.y}
          width={BAR_W}
          height={r.h}
          fill={r.hatch ? 'url(#map-hatch)' : r.fill}
        />
      ))}
      {ch.loadBearing > 0 && (
        <path
          d={`M ${x + BAR_W / 2} ${BASE_Y - (ch.claims / maxClaims) * MAX_H - 12} l 4 4 l -4 4 l -4 -4 z`}
          fill="var(--color-binding)"
        />
      )}
      <text
        x={x + BAR_W / 2}
        y={BASE_Y + 12}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={7.5}
        fill={active ? 'var(--color-ink)' : 'var(--color-ink-soft)'}
      >
        {ch.chapter}
      </text>
    </a>
  )
}

function Legend() {
  const { t } = useI18n()
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
      {SEGMENTS.map((s) => (
        <span key={s.key} className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-soft">
          <span
            aria-hidden="true"
            className={`inline-block h-3 w-3 rounded-[2px] ${s.hatch ? 'hatch-unverifiable' : ''}`}
            style={s.hatch ? undefined : { background: s.fill }}
          />
          {t(`mapPage.legend.${s.key}`)}
        </span>
      ))}
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-soft">
        <svg width="12" height="12" aria-hidden="true">
          <path d="M 6 1 l 4 4 l -4 4 l -4 -4 z" fill="var(--color-binding)" />
        </svg>
        {t('mapPage.legend.loadBearing')}
      </span>
    </div>
  )
}

function ChapterPanel({ ch }: { ch: ChapterMap }) {
  const { t, tp, fmtInt } = useI18n()
  const parts = SEGMENTS.filter((s) => ch.outcomes[s.key] > 0)
  return (
    <div className="mt-6 border border-line bg-paper-deep px-6 py-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-display text-xl text-ink">
          {tp('mapPage.chapterOf', { n: ch.chapter })} · {t(`mapPage.chapterTitles.${ch.chapter}`)}
        </h3>
        <span className="font-mono text-[0.6875rem] text-ink-soft">
          {tp('mapPage.claimsCount', { n: fmtInt(ch.claims) })}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {parts.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-ink">
            <span
              aria-hidden="true"
              className={`inline-block h-2.5 w-2.5 rounded-full ${s.hatch ? 'hatch-unverifiable' : ''}`}
              style={s.hatch ? undefined : { background: s.fill }}
            />
            <span className="tabular-nums">{ch.outcomes[s.key]}</span>
            <span className="text-ink-soft">{t(`mapPage.legend.${s.key}`)}</span>
          </span>
        ))}
        {ch.loadBearing > 0 && (
          <span className="font-mono text-[0.75rem]" style={{ color: 'var(--color-binding)' }}>
            {tp('mapPage.loadBearingCount', { n: ch.loadBearing })}
          </span>
        )}
      </div>
      <a
        href={href.explorerWith({ ch: String(ch.chapter) })}
        className="mt-3 inline-block font-mono text-[0.75rem] text-binding uppercase underline decoration-line underline-offset-4 hover:decoration-binding"
      >
        {t('mapPage.openChapter')} →
      </a>
    </div>
  )
}

export function MapPage() {
  const { t } = useI18n()
  const [active, setActive] = useState<number>(4) // гл. 4 — вальденсы: самая показательная
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <Reveal>
        <div className="eyebrow">{t('nav.map')}</div>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-[2.6rem]">{t('mapPage.h1')}</h1>
        <p className="measure mt-5 text-[1rem] leading-relaxed text-ink">{t('mapPage.intro')}</p>
      </Reveal>
      <Reveal>
        <div className="mt-10 overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${BASE_Y + 18}`}
            className="w-full min-w-[860px]"
            role="list"
            aria-label={t('mapPage.h1')}
          >
            <defs>
              <pattern id="map-hatch" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <rect width="5" height="5" fill="var(--color-paper)" />
                <line x1="0" y1="0" x2="0" y2="5" stroke="var(--color-v-unverifiable)" strokeWidth="2.2" />
              </pattern>
            </defs>
            <line x1={PAD - 4} y1={BASE_Y} x2={W - PAD + 4} y2={BASE_Y} stroke="var(--color-line)" strokeWidth="1.5" />
            {chapterMap.map((ch, i) => (
              <Bar key={ch.chapter} ch={ch} index={i} active={active === i} onActivate={() => setActive(i)} />
            ))}
          </svg>
        </div>
        <Legend />
        <ChapterPanel ch={chapterMap[active]} />
        <p className="mt-3 font-mono text-[0.6875rem] text-ink-soft">{t('mapPage.hint')}</p>
      </Reveal>
    </main>
  )
}
