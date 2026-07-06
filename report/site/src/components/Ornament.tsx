/**
 * Декоративный слой в духе книжной вёрстки XIX века. Всё aria-hidden:
 * смысла не несёт, только связывает вёрстку с предметом — печатной книгой.
 */

/** Типографский разделитель секций: тонкая линия с ромбом-флероном по центру. */
export function SectionDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3 py-1">
      <span className="h-px grow bg-line" />
      <svg width="34" height="10" className="shrink-0">
        <line x1="0" y1="5" x2="10" y2="5" stroke="var(--color-brass)" strokeWidth="1" />
        <rect
          x="14"
          y="1.7"
          width="6.6"
          height="6.6"
          transform="rotate(45 17.3 5)"
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth="1.1"
        />
        <line x1="24" y1="5" x2="34" y2="5" stroke="var(--color-brass)" strokeWidth="1" />
      </svg>
      <span className="h-px grow bg-line" />
    </div>
  )
}

/** Маркер списка «мини-звено цепи»: связка с главной визуализацией. */
export function LinkBullet({ color = 'var(--color-binding)' }: { color?: string }) {
  return (
    <svg width="14" height="9" aria-hidden="true" className="mt-[0.48em] shrink-0">
      <rect x="1" y="1" width="12" height="7" rx="3.5" fill="none" stroke={color} strokeWidth="1.4" />
    </svg>
  )
}

/** Едва заметный типографский уголок для карточек досье. */
export function CornerVignette({ corner }: { corner: 'tl' | 'br' }) {
  const pos = corner === 'tl' ? 'top-2 left-2' : 'right-2 bottom-2 rotate-180'
  return (
    <svg
      aria-hidden="true"
      width="46"
      height="46"
      className={`pointer-events-none absolute ${pos}`}
      style={{ opacity: 0.16, color: 'var(--color-brass)' }}
    >
      <path d="M 1 15 V 1 H 15" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M 5 19 V 5 H 19" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <rect
        x="8.7"
        y="8.7"
        width="4.6"
        height="4.6"
        transform="rotate(45 11 11)"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  )
}
