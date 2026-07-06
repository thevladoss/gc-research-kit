import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * Счётчик заголовочного числа: анимирует от 0 до value при появлении в кадре.
 * format получает промежуточное значение и возвращает строку локали.
 */
export function Counter({
  value,
  format,
  duration = 1.4,
}: {
  value: number
  format: (n: number) => string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const reduced = useReducedMotion()
  const [text, setText] = useState(() => format(reduced ? value : 0))

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setText(format(value))
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(format(v)),
      onComplete: () => setText(format(value)),
    })
    return () => controls.stop()
    // format пересоздаётся при смене локали — перезапуск уместен
  }, [inView, value, reduced, duration, format])

  return <span ref={ref}>{text}</span>
}
