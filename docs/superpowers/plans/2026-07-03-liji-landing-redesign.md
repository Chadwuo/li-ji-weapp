# Liji Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stiff paper-ledger landing page with an Apple-style product morph page centered on a giant iOS-like phone UI and pinned GSAP scroll.

**Architecture:** Keep `landing/` as a static page. Use HTML/CSS for the high-fidelity phone UI and layered interface objects, local GSAP + ScrollTrigger files under `landing/vendor/` for desktop pinned scroll, and vanilla JS fallbacks for navigation, reveal, and reduced-motion cases.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, vendored GSAP, vendored ScrollTrigger, Node static verification, browser visual QA.

---

### Task 1: Verification Red-Green

**Files:**
- Modify: `landing/verify-landing.mjs`

- [x] **Step 1: Write failing checks for the new Apple-style direction**

Checks must require:

- `gsap.min.js`
- `ScrollTrigger.min.js`
- `.product-cinema`
- `.iphone-stage`
- `.ui-layer`
- `data-ui-layer`
- `record-stack`
- `timeline-rail`
- `gsap.registerPlugin`
- `ScrollTrigger`
- `scrub`
- `opening-ledger`

- [x] **Step 2: Run RED**

Run: `node landing/verify-landing.mjs`

Expected: Fail on the existing paper-ledger implementation.

### Task 2: Documentation Update

**Files:**
- Modify: `landing/DESIGN_SPEC.md`
- Modify: `docs/superpowers/plans/2026-07-03-liji-landing-redesign.md`

- [ ] **Step 1: Update spec**

Document the new direction: Apple-style product morph, phone as protagonist, iOS UI, GSAP pinned scroll, UI exploded layers, and quiet ledger CTA.

- [ ] **Step 2: Self-check docs**

Check the design and plan for unresolved placeholders or stale references to the previous paper-card implementation.

Expected: no stale placeholder or old implementation language.

### Task 3: HTML Rebuild

**Files:**
- Modify: `landing/index.html`

- [ ] **Step 1: Replace structure**

Use four sections:

- `cover`: slogan and cinematic invitation opener.
- `morph`: pinned product cinema with invitation fields, giant phone, record stack, timeline rail, and UI layers.
- `timeline`: short aftermath section showing the formed time axis.
- `start`: quiet paper ledger CTA with QR code.

- [ ] **Step 2: Run verification**

Run: `node landing/verify-landing.mjs`

Expected: still fail until CSS and JS are rebuilt.

### Task 4: CSS Rebuild

**Files:**
- Modify: `landing/styles.css`

- [ ] **Step 1: Build polished visual system**

Required visual units:

- `.hero-invitation`: refined paper opener.
- `.product-cinema`: pinned scroll canvas.
- `.iphone-stage`: large phone stage with iOS-style shell.
- `.record-stack`: precise record cards.
- `.timeline-rail`: vertical time axis.
- `.ui-layer`: exploded UI objects with depth and shadows.
- `.opening-ledger`: final paper ledger QR CTA.

- [ ] **Step 2: Run verification**

Run: `node landing/verify-landing.mjs`

Expected: JS checks still fail until GSAP script is rebuilt.

### Task 5: GSAP Interaction

**Files:**
- Modify: `landing/script.js`

- [ ] **Step 1: Rebuild interaction layer**

Implement:

- `data-scene` navigation state.
- reveal observer.
- nav active updater.
- GSAP registration and ScrollTrigger timeline.
- graceful static fallback if GSAP or ScrollTrigger is unavailable.
- reduced-motion guard.

- [ ] **Step 2: Run verification**

Run: `node landing/verify-landing.mjs`

Expected: pass all checks.

### Task 6: Browser Verification

**Files:**
- No source changes unless browser QA finds defects.

- [ ] **Step 1: Static/lint verification**

Run:

```bash
node landing/verify-landing.mjs
.\node_modules\.bin\eslint.cmd landing\index.html landing\styles.css landing\script.js landing\verify-landing.mjs docs\superpowers\plans\2026-07-03-liji-landing-redesign.md
```

- [ ] **Step 2: Browser verification**

Serve `landing/` locally and check:

- Desktop first viewport has slogan and refined invitation opener.
- Pinned product section shows a giant phone as the protagonist.
- UI layers move through ScrollTrigger without console errors.
- Timeline and CTA are readable.
- Mobile has no horizontal overflow and keeps CTA visible.
