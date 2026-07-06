import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

export function Stub({ titleKey }: { titleKey: string }) {
  const { t } = useI18n()
  return (
    <main className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="eyebrow">{t(titleKey)}</div>
      <h1 className="mt-3 font-display text-3xl text-ink">{t('stub.title')}</h1>
      <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{t('stub.text')}</p>
      <a
        href={href.home}
        className="mt-8 inline-block font-mono text-[0.75rem] text-binding uppercase underline decoration-line underline-offset-4 hover:decoration-binding"
      >
        ← {t('stub.back')}
      </a>
    </main>
  )
}

export function NotFound() {
  const { t } = useI18n()
  return (
    <main className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <h1 className="font-display text-3xl text-ink">{t('notFound.title')}</h1>
      <a
        href={href.home}
        className="mt-8 inline-block font-mono text-[0.75rem] text-binding uppercase underline decoration-line underline-offset-4 hover:decoration-binding"
      >
        ← {t('notFound.back')}
      </a>
    </main>
  )
}
