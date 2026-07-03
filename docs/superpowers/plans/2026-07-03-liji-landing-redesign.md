# Liji Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static `landing/` page into the approved paper-ledger brand narrative with the slogan “每一份人情，都值得礼记。”

**Architecture:** Keep the page as static HTML/CSS/JS. Use semantic sections for 封面、起笔、入册、成册、翻开, CSS-rendered paper/ledger visuals, and small native JavaScript for reveal effects, scroll story state, nav highlighting, and pointer depth.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js verification script, browser visual QA.

---

### Task 1: Add Static Landing Verification

**Files:**
- Create: `landing/verify-landing.mjs`

- [ ] **Step 1: Write the failing verification script**

Create `landing/verify-landing.mjs` with Node built-ins. It should read `index.html`, `styles.css`, and `script.js`, then assert:

```js
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
```

- [ ] **Step 2: Run the script and verify RED**

Run: `node landing/verify-landing.mjs`

Expected: exit code `1`, with failures including `hero slogan`, `paper narrative sections`, and `paper visual system`.

### Task 2: Rebuild HTML Structure and Copy

**Files:**
- Modify: `landing/index.html`

- [ ] **Step 1: Replace visible page structure**

Rewrite `index.html` as a semantic static landing page with:

- Header navigation labels: `封面`, `起笔`, `入册`, `成册`, `翻开`
- Sections with ids: `cover`, `origin`, `ledger`, `timeline`, `start`
- Hero H1: `每一份人情，都值得礼记。`
- Hero subcopy: `把来往的心意、年月里的祝福，妥帖收进一册。`
- CTA copy: `翻开礼簿` and `把下一份心意收好`
- Preserved assets: `assets/logo.webp`, `assets/code.jpg`
- Preserved external analytics script and ICP link

- [ ] **Step 2: Run verification and confirm HTML gaps shrink**

Run: `node landing/verify-landing.mjs`

Expected: failures remain for CSS and JS checks, while content checks pass.

### Task 3: Rebuild CSS Paper-Ledger Visual System

**Files:**
- Modify: `landing/styles.css`

- [ ] **Step 1: Replace the existing visual system**

Rebuild CSS around these required selectors and responsibilities:

- `:root`: define paper palette variables including `--paper`, `--paper-deep`, `--ink`, `--cinnabar`, `--old-gold`, `--green`.
- `.paper-scene`: hero visual with layered paper sheets, invitation, ledger, stamp, and idealized phone UI.
- `.origin-section`: quiet scene section using paper texture, short copy, and three scene fragments.
- `.ledger-scroll`, `.ledger-sticky`, `.field-slip`, `.timeline-phone`: desktop sticky scroll story.
- `.year-spread`: “成册” year index.
- `.opening-book`: final ritual CTA with QR card.
- Mobile media query at `max-width: 720px` that turns sticky story into static reading flow.
- `prefers-reduced-motion` block that removes long transitions.

- [ ] **Step 2: Run verification and confirm CSS checks pass**

Run: `node landing/verify-landing.mjs`

Expected: failures remain only for JavaScript behavior if JS has not been updated yet.

### Task 4: Rebuild Vanilla JS Interactions

**Files:**
- Modify: `landing/script.js`

- [ ] **Step 1: Replace interaction script**

Implement:

- Reveal observer for `[data-reveal]`
- Ledger scroll observer that writes the active step to `.ledger-scroll.dataset.step`
- Reading-line navigation updater that toggles `.topnav a.is-active` and `aria-current="page"`
- Pointer depth update for `[data-depth]` only on fine pointer devices
- Reduced-motion guard that avoids extra pointer motion when requested

- [ ] **Step 2: Run verification and confirm GREEN**

Run: `node landing/verify-landing.mjs`

Expected: `Landing verification passed: 10 checks`

### Task 5: Browser and Project Verification

**Files:**
- No required source changes unless verification finds issues.

- [ ] **Step 1: Run repository lint**

Run: `pnpm lint`

Expected: exit code `0`

- [ ] **Step 2: Serve landing page locally**

Run from `landing/`: `python -m http.server 4174`

Expected: local URL `http://127.0.0.1:4174/` serves the page.

- [ ] **Step 3: Verify desktop browser rendering**

Open `http://127.0.0.1:4174/` at desktop width. Confirm:

- Hero slogan is visible in first viewport.
- Paper scene is nonblank and includes phone, invitation, ledger, stamp, and logo.
- Long scroll changes the ledger state from `0` through `3`.
- CTA QR card is visible at the end.

- [ ] **Step 4: Verify mobile browser rendering**

Open the same URL at mobile width. Confirm:

- No horizontal overflow.
- Hero text, buttons, paper scene, and QR code do not overlap.
- Sticky ledger section becomes readable static flow.

- [ ] **Step 5: Commit implementation**

Commit only the landing redesign files and verification script:

```bash
git add landing/index.html landing/styles.css landing/script.js landing/verify-landing.mjs docs/superpowers/plans/2026-07-03-liji-landing-redesign.md
git commit -m "feat(landing): rebuild paper ledger landing page"
```
