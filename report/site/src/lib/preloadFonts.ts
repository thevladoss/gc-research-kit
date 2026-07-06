/**
 * Предзагрузка ключевых начертаний: те же хешированные ассеты, на которые
 * ссылается CSS @fontsource (vite дедуплицирует по содержимому), поэтому
 * preload-ссылки попадают точно в файлы, которые запросит рендер.
 */
import ostCyr400 from '@fontsource/old-standard-tt/files/old-standard-tt-cyrillic-400-normal.woff2?url'
import ostCyr700 from '@fontsource/old-standard-tt/files/old-standard-tt-cyrillic-700-normal.woff2?url'
import plexCyr400 from '@fontsource/ibm-plex-sans/files/ibm-plex-sans-cyrillic-400-normal.woff2?url'

for (const href of [ostCyr400, ostCyr700, plexCyr400]) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.type = 'font/woff2'
  link.crossOrigin = 'anonymous'
  link.href = href
  document.head.appendChild(link)
}
