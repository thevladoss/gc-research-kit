import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { stats } from '../data/generated/stats'

/**
 * Корпус как фактура: 4443 точки, по одной на утверждение, тонированные
 * шкалой вердиктов, на 6–7% непрозрачности за hero. Раскладка детерминированная
 * (сеяный LCG) — от сборки к сборке картина одна и та же. Канвас не участвует
 * в раскладке страницы и не влияет на LCP; при prefers-reduced-motion
 * появляется без анимации.
 */

// распределение точек по слоям данных (все числа из stats)
function dotPlan(): Array<{ color: string; count: number }> {
  const accus = stats.direction.accusatory // 81 — не в пользу напечатанного
  const open = stats.direction.genuinely_open
  const fav = stats.direction.favorable
  const cond = stats.direction.conditional_premise
  const anach = stats.confirmed_discrepancies - 2 // 63 ошибки эпохи
  const contradicted = 2
  const unverifiable = stats.unverifiable_total
  const supported =
    stats.claims_total - unverifiable - stats.confirmed_discrepancies - stats.disputed_adjudicated
  return [
    { color: '#005e96', count: supported + fav },
    { color: '#a9a395', count: unverifiable },
    { color: '#d9a018', count: anach },
    { color: '#ae4a0c', count: accus },
    { color: '#8a3318', count: contradicted },
    { color: '#6e6a5e', count: open },
    { color: '#a1568a', count: cond },
  ]
}

function lcg(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function CorpusField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const parent = canvas.parentElement!
    const draw = () => {
      const { width, height } = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)
      const rand = lcg(1911)
      ctx.globalAlpha = 0.55 // итоговая видимость задаётся opacity канваса
      for (const { color, count } of dotPlan()) {
        ctx.fillStyle = color
        for (let i = 0; i < count; i++) {
          const x = rand() * width
          const y = rand() * height
          const r = 0.9 + rand() * 0.9
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        opacity: 0.12,
        transition: reduced ? 'none' : 'opacity 1.6s ease',
      }}
    />
  )
}
