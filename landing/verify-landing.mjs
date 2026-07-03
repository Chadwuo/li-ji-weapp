import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const read = path => readFileSync(join(root, path), 'utf8')

const html = read('index.html')
const css = read('styles.css')
const js = read('script.js')

const checks = [
  ['hero slogan', html.includes('每一份人情，都值得礼记。')],
  ['paper narrative sections', ['cover', 'origin', 'ledger', 'timeline', 'start'].every(id => html.includes(`id="${id}"`))],
  ['CTA copy', html.includes('翻开礼簿') && html.includes('把下一份心意收好')],
  ['timeline concept', html.includes('二零二六') && html.includes('时光轴')],
  ['SEO remains practical', html.includes('人情记账') && html.includes('份子钱') && html.includes('家人共享')],
  ['paper visual system', css.includes('--paper') && css.includes('.paper-scene') && css.includes('.ledger-scroll')],
  ['mobile strategy exists', css.includes('@media (max-width: 720px)') && css.includes('position: static')],
  ['reduced motion exists', css.includes('prefers-reduced-motion')],
  ['scroll state script', js.includes('data-step') && js.includes('IntersectionObserver')],
  ['nav active script', js.includes('is-active') && js.includes('aria-current')],
]

const failed = checks.filter(([, passed]) => !passed)

if (failed.length) {
  process.stderr.write(`Landing verification failed: ${failed.map(([name]) => name).join(', ')}\n`)
  process.exit(1)
}

process.stdout.write(`Landing verification passed: ${checks.length} checks\n`)
