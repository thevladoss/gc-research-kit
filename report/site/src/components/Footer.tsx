import { useI18n } from '../lib/i18n'
import { href } from '../lib/router'

const REPO = 'https://github.com/thevladoss/gc-research-kit'

/** Адрес собирается только в момент клика — в HTML-исходнике его нет. */
function openMail() {
  const user = ['osin', 'vladik', '1'].join('')
  const host = ['gmail', 'com'].join('.')
  window.location.href = `mailto:${user}@${host}`
}

export function Footer() {
  const { t } = useI18n()
  const sep = <span aria-hidden="true" className="text-line">·</span>
  const linkCls = 'text-ink-soft underline decoration-line underline-offset-4 hover:text-binding'
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-3 gap-y-2 px-5 py-8 font-mono text-[0.75rem] text-ink-soft md:px-8">
        <a href={`${href.method}#author`} className={linkCls}>
          {t('footer.research')}
        </a>
        {sep}
        <a href={`${href.method}#license`} className={linkCls}>
          {t('footer.license')}
        </a>
        {sep}
        <a href={`${href.method}#data`} className={linkCls}>
          {t('footer.data')}
        </a>
        {sep}
        <a href={REPO} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {t('footer.source')}
        </a>
        {sep}
        <button type="button" onClick={openMail} className={`cursor-pointer ${linkCls}`}>
          {t('footer.contact')}
        </button>
        <span className="mt-1 block w-full text-[0.6875rem] leading-relaxed text-ink-soft/80">
          {t('footer.quoteAttribution')}
        </span>
      </div>
    </footer>
  )
}
