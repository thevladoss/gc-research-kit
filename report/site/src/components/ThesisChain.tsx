import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { thesisChain, type ChainLink } from '../data/generated/chain'
import { chainStatusStyle } from '../lib/chainStatus'
import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

/**
 * Подпись сайта: несущая цепь книги — 7 кованых звеньев.
 * Статус звена кодируется цветом И характером штриха (разлом, пунктир, точки),
 * чтобы цвет не оставался единственным каналом.
 */

const LINK_W = 170
const LINK_H = 64
const STRIDE = 144 // перекрытие соседних звеньев: 170 − 144 = 26
const PAD = 6
const W = PAD * 2 + STRIDE * 6 + LINK_W
const CY = 62

function strokeProps(kind: 'solid' | 'fractured' | 'dashed' | 'dotted', seed: number) {
  switch (kind) {
    case 'fractured':
      // два разлома в контуре; сдвиг по индексу, чтобы разломы не совпадали
      return {
        strokeDasharray: '20 3.2 40 5 31.8 0',
        strokeDashoffset: 12 + ((seed * 17) % 38),
      }
    case 'dashed':
      return { strokeDasharray: '4 2.6' }
    case 'dotted':
      return { strokeDasharray: '0.4 3.4', strokeLinecap: 'round' as const }
    default:
      return {}
  }
}

function stadiumRect(x: number) {
  return {
    x,
    y: CY - LINK_H / 2,
    width: LINK_W,
    height: LINK_H,
    rx: LINK_H / 2,
  }
}

function StatusChip({ status }: { status: ChainLink['status'] }) {
  const { t } = useI18n()
  const s = chainStatusStyle[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide uppercase"
      style={{ color: s.ink }}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2.5 w-2.5 rounded-full ${status === 'вне проверки' ? 'hatch-unverifiable' : ''}`}
        style={status === 'вне проверки' ? undefined : { background: s.fill }}
      />
      {t(`chainStatus.${status}`)}
    </span>
  )
}

function LinkShape({
  link,
  index,
  active,
  onActivate,
}: {
  link: ChainLink
  index: number
  active: boolean
  onActivate: () => void
}) {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const s = chainStatusStyle[link.status]
  const rect = stadiumRect(PAD + index * STRIDE)
  const label = `${t(`home.chain.links.${link.link}.title`)} — ${t(`chainStatus.${link.status}`)}`
  return (
    <a
      href={href.chain(link.link)}
      aria-label={label}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      style={{ outline: 'none' }}
    >
      <motion.g
        style={{ transformOrigin: `${rect.x + LINK_W / 2}px ${CY}px` }}
        animate={reduced ? undefined : { scale: active ? 1.045 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* невидимая зона наведения по всему звену */}
        <rect {...rect} fill="transparent" stroke="none" />
        <rect
          {...rect}
          fill="none"
          stroke={s.fill}
          strokeWidth={active ? 12 : 10}
          pathLength={100}
          filter="url(#chain-shadow)"
          {...strokeProps(s.stroke, index)}
        />
        <text
          x={rect.x + LINK_W / 2}
          y={CY + 7}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize={26}
          fill={s.ink}
        >
          {link.link}
        </text>
      </motion.g>
    </a>
  )
}

/** Горизонтальная цепь (от md и шире) с панелью итога под ней. */
function ChainWide() {
  const { t } = useI18n()
  const [active, setActive] = useState<number>(3) // по умолчанию — звено 4 (1844): точка перелома книги
  const link = thesisChain[active]
  return (
    <div className="hidden md:block">
      <svg
        viewBox={`0 0 ${W} 124`}
        className="w-full"
        role="list"
        aria-label={t('home.chain.h2')}
      >
        <defs>
          <filter id="chain-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" floodColor="#262a22" floodOpacity="0.22" />
          </filter>
        </defs>
        {/* чётные под, нечётные над — эффект переплетения */}
        {thesisChain.map((l, i) =>
          i % 2 === 0 ? (
            <LinkShape key={l.link} link={l} index={i} active={active === i} onActivate={() => setActive(i)} />
          ) : null,
        )}
        {thesisChain.map((l, i) =>
          i % 2 === 1 ? (
            <LinkShape key={l.link} link={l} index={i} active={active === i} onActivate={() => setActive(i)} />
          ) : null,
        )}
      </svg>
      {/* подписи под звеньями, выровнены по их центрам */}
      <div className="relative mt-1 h-10" aria-hidden="true">
        {thesisChain.map((l, i) => {
          const cx = ((PAD + i * STRIDE + LINK_W / 2) / W) * 100
          return (
            <div
              key={l.link}
              className={`absolute top-0 w-36 -translate-x-1/2 text-center font-mono text-[0.6563rem] leading-tight ${
                active === i ? 'text-ink' : 'text-ink-soft'
              }`}
              style={{ left: `${cx}%` }}
            >
              {t(`home.chain.links.${l.link}.title`)}
            </div>
          )
        })}
      </div>
      {/* панель итога активного звена */}
      <div className="mt-6 border border-line bg-paper-deep px-6 py-5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-display text-xl text-ink">
            {t(`home.chain.links.${link.link}.title`)}
          </h3>
          <span className="font-mono text-[0.6875rem] text-ink-soft">
            {t(`home.chain.links.${link.link}.chapters`)}
          </span>
          <StatusChip status={link.status} />
        </div>
        <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
          {t(`home.chain.plain.${link.link}`)}
        </p>
        <a
          href={href.chain(link.link)}
          className="mt-3 inline-block font-mono text-[0.75rem] text-binding uppercase underline decoration-line underline-offset-4 hover:decoration-binding"
        >
          {t('home.chain.openLink')} →
        </a>
      </div>
      <p className="mt-3 font-mono text-[0.6875rem] text-ink-soft">{t('home.chain.hint')}</p>
    </div>
  )
}

/** Вертикальная цепь (мобильные): звено + текст рядом, вся информация видна сразу. */
function ChainNarrow() {
  const { t } = useI18n()
  return (
    <ol className="md:hidden">
      {thesisChain.map((l, i) => {
        const s = chainStatusStyle[l.status]
        const rect = { x: 10, y: 4, width: 56, height: 118, rx: 28 }
        return (
          <li key={l.link} className={i === 0 ? '' : '-mt-7'}>
            <a
              href={href.chain(l.link)}
              className="flex items-stretch gap-4 no-underline"
              aria-label={`${t(`home.chain.links.${l.link}.title`)} — ${t(`chainStatus.${l.status}`)}`}
            >
              <svg viewBox="0 0 76 126" className="w-16 shrink-0" aria-hidden="true">
                <rect
                  {...rect}
                  fill="none"
                  stroke={s.fill}
                  strokeWidth={9}
                  pathLength={100}
                  {...strokeProps(s.stroke, i)}
                />
                <text
                  x={38}
                  y={70}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize={24}
                  fill={s.ink}
                >
                  {l.link}
                </text>
              </svg>
              <div className="min-w-0 pt-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="font-display text-base leading-snug text-ink">
                    {t(`home.chain.links.${l.link}.title`)}
                  </span>
                  <span className="font-mono text-[0.625rem] text-ink-soft">
                    {t(`home.chain.links.${l.link}.chapters`)}
                  </span>
                </div>
                <div className="mt-1">
                  <StatusChip status={l.status} />
                </div>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
                  {t(`home.chain.plain.${l.link}`)}
                </p>
              </div>
            </a>
          </li>
        )
      })}
    </ol>
  )
}

export function ThesisChain() {
  return (
    <div>
      <ChainWide />
      <ChainNarrow />
    </div>
  )
}
