import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { thesisChain } from '../data/generated/chain'
import { chainAssessment, type ChainAssessment } from '../data/generated/chainAssessment'
import {
  basisStyle,
  compositeOfBasis,
  compositeStyle,
  voiceStyle,
  type ChainComposite,
} from '../lib/chainStatus'
import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

/**
 * Подпись сайта: несущая цепь книги — 7 кованых звеньев.
 * Цепь отвечает на ОДИН вопрос — прочность звена как опоры — составным
 * индексом из четырёх ступеней; кодирование двойное: цвет + целостность
 * кольца. Двухкомпонентная оценка (основа/подача) живёт в панели под цепью.
 */

const LINK_W = 170
const LINK_H = 64
const STRIDE = 144 // перекрытие соседних звеньев: 170 − 144 = 26
const PAD = 6
const W = PAD * 2 + STRIDE * 6 + LINK_W
const CY = 62

function ringProps(composite: ChainComposite, seed: number) {
  const s = compositeStyle[composite]
  if (s.ring === 'broken') {
    // один видимый разрыв контура; сдвиг по индексу, чтобы разрывы не совпадали
    return { strokeDasharray: '61 6 33 0', strokeDashoffset: 10 + ((seed * 19) % 42) }
  }
  return {}
}

function stadiumRect(x: number) {
  return { x, y: CY - LINK_H / 2, width: LINK_W, height: LINK_H, rx: LINK_H / 2 }
}

/** Мини-кольцо для легенды. */
function LegendRing({ composite }: { composite: ChainComposite }) {
  const s = compositeStyle[composite]
  return (
    <svg width="20" height="14" aria-hidden="true">
      <rect
        x="2"
        y="2.5"
        width="16"
        height="9"
        rx="4.5"
        fill="none"
        stroke={s.fill}
        strokeWidth={s.ring === 'faint' ? 1.4 : 2.4}
        pathLength={100}
        {...(s.ring === 'broken' ? { strokeDasharray: '58 14 28 0' } : {})}
      />
    </svg>
  )
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
  onSelect,
}: {
  index: number
  active: boolean
  onActivate: () => void
  onSelect?: (e: React.MouseEvent) => void
}) {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const link = thesisChain[index]
  const composite = compositeOfBasis[chainAssessment[index].basis]
  const s = compositeStyle[composite]
  const rect = stadiumRect(PAD + index * STRIDE)
  const label = `${t(`home.chain.links.${link.link}.title`)} — ${t(`chainComposite.${composite}`)}`
  return (
    <a
      href={href.chain(link.link)}
      aria-label={label}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onSelect}
      style={{ outline: 'none' }}
    >
      <motion.g
        style={{ transformOrigin: `${rect.x + LINK_W / 2}px ${CY}px` }}
        animate={reduced ? undefined : { scale: active ? 1.04 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* невидимая зона наведения по всему звену */}
        <rect {...rect} y={rect.y - 10} height={rect.height + 20} fill="transparent" stroke="none" />
        <rect
          {...rect}
          fill="none"
          stroke={s.fill}
          strokeWidth={s.width + (active ? 1.5 : 0)}
          opacity={s.ring === 'faint' ? 0.85 : 1}
          pathLength={100}
          filter={s.ring === 'faint' ? undefined : 'url(#chain-shadow)'}
          {...ringProps(composite, index)}
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

const LEGEND: ChainComposite[] = ['sound', 'contested', 'damaged', 'outside']

/** Панель итога активного звена — единственный носитель двухкомпонентной оценки. */
function DetailPanel({ index }: { index: number }) {
  const { t } = useI18n()
  const link = thesisChain[index]
  const a = chainAssessment[index]
  return (
    <div className="mt-6 border border-line bg-paper-deep px-6 py-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-display text-xl text-ink">{t(`home.chain.links.${link.link}.title`)}</h3>
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
  )
}

/** Горизонтальная цепь (от md и шире): ховер выбирает, клик открывает разбор. */
function ChainWide() {
  const { t } = useI18n()
  const [active, setActive] = useState<number>(1) // по умолчанию — звено 2: главная находка проверки
  return (
    <div className="hidden md:block">
      <svg viewBox={`0 0 ${W} 124`} className="w-full" role="list" aria-label={t('home.chain.h2')}>
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
      {/* легенда составного индекса — одна строка из четырёх пунктов */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {LEGEND.map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem]" style={{ color: compositeStyle[c].ink }}>
            <LegendRing composite={c} />
            {t(`chainComposite.${c}`)}
          </span>
        ))}
      </div>
      <DetailPanel index={active} />
      <p className="mt-3 font-mono text-[0.6875rem] text-ink-soft">{t('home.chain.hint')}</p>
    </div>
  )
}

/** Вертикальная цепь (мобильные): касание выбирает звено и подводит к панели. */
function ChainNarrow() {
  const { t } = useI18n()
  const [active, setActive] = useState<number>(1)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const select = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActive(i)
    panelRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' })
  }
  return (
    <div className="md:hidden">
      <ol className="flex flex-col items-start">
        {thesisChain.map((l, i) => {
          const composite = compositeOfBasis[chainAssessment[i].basis]
          const s = compositeStyle[composite]
          const rect = { x: 10, y: 4, width: 56, height: 96, rx: 28 }
          return (
            <li key={l.link} className={i === 0 ? '' : '-mt-6'}>
              <a
                href={href.chain(l.link)}
                onClick={select(i)}
                aria-label={`${t(`home.chain.links.${l.link}.title`)} — ${t(`chainComposite.${composite}`)}`}
                className="flex items-center gap-4 no-underline"
              >
                <svg viewBox="0 0 76 104" className="w-14 shrink-0" aria-hidden="true">
                  <rect
                    {...rect}
                    fill="none"
                    stroke={s.fill}
                    strokeWidth={s.width * 0.9 + (active === i ? 1.5 : 0)}
                    opacity={s.ring === 'faint' ? 0.85 : 1}
                    pathLength={100}
                    {...ringProps(composite, i)}
                  />
                  <text
                    x={38}
                    y={60}
                    textAnchor="middle"
                    fontFamily="var(--font-display)"
                    fontSize={22}
                    fill={s.ink}
                  >
                    {l.link}
                  </text>
                </svg>
                <span
                  className={`pt-4 font-mono text-[0.75rem] leading-snug ${active === i ? 'text-ink' : 'text-ink-soft'}`}
                >
                  {t(`home.chain.links.${l.link}.title`)}
                  <span className="mt-0.5 block text-[0.625rem]" style={{ color: compositeStyle[composite].ink }}>
                    {t(`chainComposite.${composite}`)}
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>
      <div ref={panelRef}>
        <DetailPanel index={active} />
      </div>
    </div>
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
