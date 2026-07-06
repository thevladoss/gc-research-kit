import { useState } from 'react'
import { useI18n } from '../lib/i18n'

/**
 * Цитата книги. В русской локали основной текст — официальный русский перевод;
 * английский оригинал открывается в один клик. Для чувствительных к формулировке
 * утверждений рядом с русской цитатой мелко сохраняется английская ключевая фраза:
 * вердикты выносились по напечатанному английскому тексту.
 */
export function QuoteText({
  en,
  ru,
  enKey,
  className = '',
}: {
  en: string
  ru: string | null
  enKey?: string | null
  className?: string
}) {
  const { t, locale } = useI18n()
  const [showOriginal, setShowOriginal] = useState(false)
  if (locale !== 'ru' || !ru) {
    return (
      <p lang="en" className={`font-display leading-relaxed text-ink-soft italic ${className}`}>
        “{en}”
      </p>
    )
  }
  return (
    <div className={className}>
      <p className="font-display leading-relaxed text-ink-soft">
        «{ru}»
        {enKey && (
          <span lang="en" className="ml-2 font-mono text-[0.6875rem] whitespace-nowrap text-ink-soft italic">
            “{enKey}”
          </span>
        )}
      </p>
      <button
        type="button"
        onClick={() => setShowOriginal(!showOriginal)}
        aria-expanded={showOriginal}
        className="mt-1 cursor-pointer font-mono text-[0.625rem] tracking-wide text-ink-soft uppercase underline decoration-line underline-offset-2 hover:text-binding"
      >
        {showOriginal ? t('quotes.hideOriginal') : t('quotes.showOriginal')}
      </button>
      {showOriginal && (
        <p lang="en" className="mt-1.5 border-l-2 border-line pl-3 font-display text-[0.9em] leading-relaxed text-ink-soft italic">
          “{en}”
        </p>
      )}
    </div>
  )
}
