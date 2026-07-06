import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import ru from '../../content/ru.json'
import en from '../../content/en.json'

export type Locale = 'ru' | 'en'

const dicts: Record<Locale, unknown> = { ru, en }
const STORAGE_KEY = 'gc-locale'

interface I18nValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (path: string) => string
  fmtInt: (n: number) => string
  fmtPct: (share: number) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function lookup(dict: unknown, path: string): string | undefined {
  let cur: unknown = dict
  for (const part of path.split('.')) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[part]
  }
  return typeof cur === 'string' ? cur : undefined
}

// dev-проверка паритета ключей двух локалей
function keySet(obj: unknown, prefix = '', out: Set<string> = new Set()): Set<string> {
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const p = prefix ? `${prefix}.${k}` : k
      if (typeof v === 'string') out.add(p)
      else keySet(v, p, out)
    }
  }
  return out
}
if (import.meta.env.DEV) {
  const ruKeys = keySet(ru)
  const enKeys = keySet(en)
  for (const k of ruKeys) if (!enKeys.has(k)) console.warn(`[i18n] en.json: нет ключа ${k}`)
  for (const k of enKeys) if (!ruKeys.has(k)) console.warn(`[i18n] ru.json: нет ключа ${k}`)
}

function initialLocale(): Locale {
  // ?lang=en|ru в URL — для шаринга ссылки на конкретную локаль; сильнее сохранённой
  const q = new URLSearchParams(window.location.search).get('lang')
  if (q === 'ru' || q === 'en') return q
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch {
    /* приватный режим */
  }
  return 'ru'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* приватный режим */
    }
  }

  const value = useMemo<I18nValue>(() => {
    const dict = dicts[locale]
    const t = (path: string) => lookup(dict, path) ?? path
    const intFmt = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US')
    const pctFmt = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
    return {
      locale,
      setLocale,
      t,
      fmtInt: (n) => intFmt.format(n),
      fmtPct: (share) => pctFmt.format(share),
    }
  }, [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = lookup(dicts[locale], 'meta.title') ?? document.title
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n вне I18nProvider')
  return ctx
}
