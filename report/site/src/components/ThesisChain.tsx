import { useReducedMotion } from 'framer-motion'
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
 * Подпись сайта: несущая цепь книги — 7 кованых звеньев, ПЕРЕПЛЕТЁННЫХ как
 * настоящая цепь: в каждом стыке звено проходит над соседним в верхней точке
 * пересечения и под ним в нижней. Техника: звенья рисуются слева направо
 * (правое перекрывает левое), затем в верхней половине каждого стыка кусочек
 * левого звена перерисовывается поверх через clip-путь.
 *
 * Цепь отвечает на ОДИН вопрос — прочность звена как опоры — составным
 * индексом из четырёх ступеней; кодирование двойное: цвет + целостность
 * кольца. Двухкомпонентная оценка (основа/подача) живёт в панели под цепью.
 * Ховер не двигает геометрию: меняется только толщина штриха.
 */

const LINK_W = 170
const LINK_H = 64
const STRIDE = 144 // перекрытие соседних звеньев: 170 − 144 = 26
const PAD = 6
const W = PAD * 2 + STRIDE * 6 + LINK_W
const CY = 62
const SVG_H = 124

function ringProps(composite: ChainComposite, seed: number) {
  const s = compositeStyle[composite]
  if (s.ring === 'broken') {
    // один видимый разрыв контура; сдвиг по индексу, чтобы разрывы не совпадали
    return { strokeDasharray: '61 6 33 0', strokeDashoffset: 10 + ((seed * 19) % 42) }
  }
  if (s.ring === 'dashed') {
    // «вне эмпирической проверки»: кольцо есть, но не сплошная опора
    return { strokeDasharray: '3.2 2.6' }
  }
  return {}
}

const xOf = (i: number) => PAD + i * STRIDE

function stadiumRect(i: number, vertical = false) {
  return vertical
    ? { x: 10, y: 4 + i * 72, width: 56, height: 96, rx: 28 }
    : { x: xOf(i), y: CY - LINK_H / 2, width: LINK_W, height: LINK_H, rx: LINK_H / 2 }
}

/** Кольцо звена: сам штрих, без обвязки. */
function Ring({
  index,
  active,
  vertical = false,
  withShadow = true,
}: {
  index: number
  active: boolean
  vertical?: boolean
  withShadow?: boolean
}) {
  const composite = compositeOfBasis[chainAssessment[index].basis]
  const s = compositeStyle[composite]
  const rect = stadiumRect(index, vertical)
  const width = (vertical ? s.width * 0.9 : s.width) + (active ? 1.5 : 0)
  return (
    <rect
      {...rect}
      fill="none"
      stroke={s.fill}
      strokeWidth={width}
      opacity={s.ring === 'dashed' ? 0.9 : 1}
      pathLength={100}
      filter={withShadow && s.ring !== 'dashed' ? 'url(#chain-shadow)' : undefined}
      style={{ transition: 'stroke-width 0.2s ease' }}
      {...ringProps(composite, index)}
    />
  )
}

/**
 * Заплатка переплетения: в верхней половине стыка i↔i+1 перерисовывает
 * кусочек ЛЕВОГО звена поверх правого. Чисто визуальный слой.
 */
function WeavePatch({
  junction,
  active,
  vertical = false,
}: {
  junction: number
  active: boolean
  vertical?: boolean
}) {
  const id = `weave-${vertical ? 'v' : 'h'}-${junction}`
  // окно стыка: зона перекрытия колец с запасом на толщину штриха
  const clipRect = vertical
    ? { x: 0, y: 4 + (junction + 1) * 72 - 8, width: 38, height: 96 - 72 + 16 }
    : { x: xOf(junction + 1) - 8, y: 0, width: LINK_W - STRIDE + 16, height: CY }
  return (
    <g clipPath={`url(#${id})`} pointerEvents="none" aria-hidden="true">
      <clipPath id={id}>
        <rect {...clipRect} />
      </clipPath>
      <Ring index={junction} active={active} vertical={vertical} />
    </g>
  )
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
        strokeWidth={s.ring === 'dashed' ? 1.8 : 2.4}
        pathLength={100}
        {...(s.ring === 'broken'
          ? { strokeDasharray: '58 14 28 0' }
          : s.ring === 'dashed'
            ? { strokeDasharray: '8 6' }
            : {})}
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
      <p className="sr-only">
        {thesisChain
          .map(
            (l, i) =>
              `${l.link}. ${t(`home.chain.links.${l.link}.title`)} — ${t(`chainComposite.${compositeOfBasis[chainAssessment[i].basis]}`)}`,
          )
          .join('; ')}
      </p>
      <svg viewBox={`0 0 ${W} ${SVG_H}`} className="w-full" aria-label={t('home.chain.h2')}>
        <defs>
          <filter id="chain-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" floodColor="#262a22" floodOpacity="0.22" />
          </filter>
        </defs>
        {/* звенья слева направо: правое перекрывает левое */}
        {thesisChain.map((l, i) => {
          const composite = compositeOfBasis[chainAssessment[i].basis]
          const rect = stadiumRect(i)
          return (
            <a
              key={l.link}
              href={href.chain(l.link)}
              aria-label={`${t(`home.chain.links.${l.link}.title`)} — ${t(`chainComposite.${composite}`)}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{ outline: 'none' }}
            >
              <rect
                x={rect.x}
                y={rect.y - 10}
                width={rect.width}
                height={rect.height + 20}
                fill="transparent"
                stroke="none"
              />
              <Ring index={i} active={active === i} />
              <text
                x={rect.x + LINK_W / 2}
                y={CY + 7}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize={26}
                fill={compositeStyle[composite].ink}
              >
                {l.link}
              </text>
            </a>
          )
        })}
        {/* переплетение: в верхней точке каждого стыка левое звено проходит над правым */}
        {Array.from({ length: 6 }, (_, j) => (
          <WeavePatch key={j} junction={j} active={active === j} />
        ))}
      </svg>
      {/* подписи под звеньями, выровнены по их центрам */}
      <div className="relative mt-1 h-10" aria-hidden="true">
        {thesisChain.map((l, i) => {
          const cx = ((xOf(i) + LINK_W / 2) / W) * 100
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
          <span
            key={c}
            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem]"
            style={{ color: compositeStyle[c].ink }}
          >
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

/** Вертикальная цепь (мобильные): один SVG-рельс с переплетением, касание выбирает звено. */
function ChainNarrow() {
  const { t } = useI18n()
  const [active, setActive] = useState<number>(1)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const railH = 4 + 6 * 72 + 96 + 4
  const select = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActive(i)
    panelRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' })
  }
  return (
    <div className="md:hidden">
      <div className="flex gap-4">
        <svg
          viewBox={`0 0 76 ${railH}`}
          className="w-[76px] shrink-0"
          aria-label={t('home.chain.h2')}
        >
          {thesisChain.map((l, i) => {
            const composite = compositeOfBasis[chainAssessment[i].basis]
            const rect = stadiumRect(i, true)
            return (
              <a
                key={l.link}
                href={href.chain(l.link)}
                aria-label={`${t(`home.chain.links.${l.link}.title`)} — ${t(`chainComposite.${composite}`)}`}
                onClick={select(i)}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault()
                    select(i)(e as unknown as React.MouseEvent)
                  }
                }}
              >
                <rect
                  x={0}
                  y={rect.y}
                  width={76}
                  height={rect.height}
                  fill="transparent"
                  stroke="none"
                />
                <Ring index={i} active={active === i} vertical withShadow={false} />
                <text
                  x={38}
                  y={rect.y + rect.height / 2 + 7}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize={22}
                  fill={compositeStyle[composite].ink}
                >
                  {l.link}
                </text>
              </a>
            )
          })}
          {Array.from({ length: 6 }, (_, j) => (
            <WeavePatch key={j} junction={j} active={active === j} vertical />
          ))}
        </svg>
        {/* подписи напротив звеньев */}
        <div className="relative grow" style={{ height: `${railH}px` }} aria-hidden="true">
          {thesisChain.map((l, i) => {
            const composite = compositeOfBasis[chainAssessment[i].basis]
            const cy = ((4 + i * 72 + 48) / railH) * 100
            return (
              <div
                key={l.link}
                onClick={select(i)}
                className={`absolute -translate-y-1/2 cursor-pointer font-mono text-[0.75rem] leading-snug ${
                  active === i ? 'text-ink' : 'text-ink-soft'
                }`}
                style={{ top: `${cy}%` }}
              >
                {t(`home.chain.links.${l.link}.title`)}
                <span
                  className="mt-0.5 block text-[0.625rem]"
                  style={{ color: compositeStyle[composite].ink }}
                >
                  {t(`chainComposite.${composite}`)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
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
