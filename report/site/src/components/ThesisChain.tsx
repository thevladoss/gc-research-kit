import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { thesisChain } from '../data/generated/chain'
import { chainAssessment, type ChainAssessment } from '../data/generated/chainAssessment'
import { basisStyle, voiceStyle } from '../lib/chainStatus'
import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

/**
 * Подпись сайта: несущая цепь книги — 7 кованых звеньев.
 * Цвет и характер контура кодируют состояние исторической основы,
 * черта под звеном — подачу; цвет нигде не остаётся единственным каналом.
 */

const LINK_W = 170
const LINK_H = 64
const STRIDE = 144 // перекрытие соседних звеньев: 170 − 144 = 26
const PAD = 6
const W = PAD * 2 + STRIDE * 6 + LINK_W
const CY = 62

function strokeProps(kind: 'solid' | 'nicked' | 'fractured' | 'dashed' | 'dotted', seed: number) {
  switch (kind) {
    case 'nicked':
      // один короткий разрыв — «цела, с одним несущим исключением»
      return { strokeDasharray: '63 4 33 0', strokeDashoffset: 18 }
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

export function AssessmentChips({ a, detail }: { a: ChainAssessment; detail?: boolean }) {
  const { t } = useI18n()
  const b = basisStyle[a.basis]
  return (
    <span className="inline-flex flex-wrap items-center gap-x-4 gap-y-1">
      <span
        className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide uppercase"
        style={{ color: b.ink }}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-2.5 w-2.5 rounded-full ${a.basis === 'outside' ? 'hatch-unverifiable' : ''}`}
          style={
            a.basis === 'outside'
              ? undefined
              : a.basis === 'mixed'
                ? { background: `linear-gradient(90deg, ${b.fill} 50%, ${b.mixedWith} 50%)` }
                : { background: b.fill }
          }
        />
        {t('chainAssess.basisLabel')}: {t(`chainAssess.basis.${a.basis}`)}
      </span>
      {a.voice && (
        <span
          className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide uppercase"
          style={{ color: voiceStyle[a.voice].ink }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-[3px] w-4"
            style={{ background: voiceStyle[a.voice].fill }}
          />
          {t('chainAssess.voiceLabel')}: {t(`chainAssess.voice.${a.voice}`)}
        </span>
      )}
      {detail && a.basis === 'mixed' && (
        <span className="font-mono text-[0.6875rem] text-ink-soft">
          {t('chainAssess.mixedDetail6')}
        </span>
      )}
    </span>
  )
}

function LinkShape({
  index,
  active,
  onActivate,
}: {
  index: number
  active: boolean
  onActivate: () => void
}) {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const link = thesisChain[index]
  const a = chainAssessment[index]
  const b = basisStyle[a.basis]
  const rect = stadiumRect(PAD + index * STRIDE)
  const strokeColor = a.basis === 'mixed' ? `url(#mixed-${link.link})` : b.fill
  const label = `${t(`home.chain.links.${link.link}.title`)} — ${t('chainAssess.basisLabel')}: ${t(`chainAssess.basis.${a.basis}`)}${a.voice ? `; ${t('chainAssess.voiceLabel')}: ${t(`chainAssess.voice.${a.voice}`)}` : ''}`
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
        <rect {...rect} y={rect.y - 8} height={rect.height + 26} fill="transparent" stroke="none" />
        {a.basis === 'mixed' && (
          <defs>
            <linearGradient id={`mixed-${link.link}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0.5" stopColor={b.fill} />
              <stop offset="0.5" stopColor={b.mixedWith} />
            </linearGradient>
          </defs>
        )}
        <rect
          {...rect}
          fill="none"
          stroke={strokeColor}
          strokeWidth={active ? 12 : 10}
          pathLength={100}
          filter="url(#chain-shadow)"
          {...strokeProps(b.stroke, index)}
        />
        {/* черта подачи под звеном */}
        {a.voice && (
          <rect
            x={rect.x + LINK_W / 2 - 14}
            y={rect.y + rect.height + 9}
            width={28}
            height={3.5}
            rx={1.75}
            fill={voiceStyle[a.voice].fill}
          />
        )}
        <text
          x={rect.x + LINK_W / 2}
          y={CY + 7}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize={26}
          fill={b.ink}
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
  const a = chainAssessment[active]
  return (
    <div className="hidden md:block">
      <div className="mb-2 font-mono text-[0.6875rem] text-ink-soft">{t('chainAssess.svgLegend')}</div>
      <svg viewBox={`0 0 ${W} 132`} className="w-full" role="list" aria-label={t('home.chain.h2')}>
        <defs>
          <filter id="chain-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" floodColor="#262a22" floodOpacity="0.22" />
          </filter>
        </defs>
        {/* чётные под, нечётные над — эффект переплетения */}
        {thesisChain.map((l, i) =>
          i % 2 === 0 ? (
            <LinkShape key={l.link} index={i} active={active === i} onActivate={() => setActive(i)} />
          ) : null,
        )}
        {thesisChain.map((l, i) =>
          i % 2 === 1 ? (
            <LinkShape key={l.link} index={i} active={active === i} onActivate={() => setActive(i)} />
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
          <AssessmentChips a={a} detail />
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
        const a = chainAssessment[i]
        const b = basisStyle[a.basis]
        const rect = { x: 10, y: 4, width: 56, height: 118, rx: 28 }
        const strokeColor = a.basis === 'mixed' ? `url(#mixed-m-${l.link})` : b.fill
        return (
          <li key={l.link} className={i === 0 ? '' : '-mt-7'}>
            <a
              href={href.chain(l.link)}
              className="flex items-stretch gap-4 no-underline"
              aria-label={`${t(`home.chain.links.${l.link}.title`)} — ${t(`chainAssess.basis.${a.basis}`)}`}
            >
              <svg viewBox="0 0 76 126" className="w-16 shrink-0" aria-hidden="true">
                {a.basis === 'mixed' && (
                  <defs>
                    <linearGradient id={`mixed-m-${l.link}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0.5" stopColor={b.fill} />
                      <stop offset="0.5" stopColor={b.mixedWith} />
                    </linearGradient>
                  </defs>
                )}
                <rect
                  {...rect}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={9}
                  pathLength={100}
                  {...strokeProps(b.stroke, i)}
                />
                <text
                  x={38}
                  y={70}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize={24}
                  fill={b.ink}
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
                  <AssessmentChips a={a} />
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
