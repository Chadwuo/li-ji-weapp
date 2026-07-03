const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canObserve = 'IntersectionObserver' in window

const revealItems = document.querySelectorAll('[data-reveal]')

if (canObserve) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18 },
  )

  revealItems.forEach(item => revealObserver.observe(item))
}
else {
  revealItems.forEach(item => item.classList.add('is-visible'))
}

const ledgerScroll = document.querySelector('.ledger-scroll')
const ledgerSteps = document.querySelectorAll('.ledger-step[data-step]')

if (canObserve && ledgerScroll && ledgerSteps.length) {
  const setLedgerStep = (step) => {
    ledgerScroll.dataset.step = step
  }

  const stepObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (activeEntry) {
        setLedgerStep(activeEntry.target.dataset.step || '0')
      }
    },
    {
      threshold: [0.32, 0.5, 0.68],
      rootMargin: '-18% 0px -20% 0px',
    },
  )

  ledgerSteps.forEach(step => stepObserver.observe(step))
}

const navLinks = [...document.querySelectorAll('.topnav a[href^="#"]')]
const sections = [...document.querySelectorAll('[data-section]')]

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`
    link.classList.toggle('is-active', isActive)

    if (isActive) {
      link.setAttribute('aria-current', 'page')
    }
    else {
      link.removeAttribute('aria-current')
    }
  })
}

if (navLinks.length && sections.length) {
  let navTicking = false

  const updateActiveNav = () => {
    const readingLine = Math.min(window.innerHeight * 0.42, 340)
    const activeSection = sections.find((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= readingLine && rect.bottom > readingLine
    }) || sections[0]

    setActiveNav(activeSection.id)
    navTicking = false
  }

  const requestActiveNavUpdate = () => {
    if (navTicking) {
      return
    }

    navTicking = true
    window.requestAnimationFrame(updateActiveNav)
  }

  window.addEventListener('scroll', requestActiveNavUpdate, { passive: true })
  window.addEventListener('resize', requestActiveNavUpdate)
  updateActiveNav()
}

const shell = document.querySelector('[data-shell]')
const depthItems = document.querySelectorAll('[data-depth]')
const finePointer = window.matchMedia('(pointer: fine)').matches

if (shell && depthItems.length && finePointer && !prefersReducedMotion) {
  shell.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2
    const y = (event.clientY / window.innerHeight - 0.5) * 2

    depthItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 0.28)
      item.style.setProperty('--depth-x', `${x * depth * 12}px`)
      item.style.setProperty('--depth-y', `${y * depth * 12}px`)
    })
  })

  shell.addEventListener('pointerleave', () => {
    depthItems.forEach((item) => {
      item.style.setProperty('--depth-x', '0px')
      item.style.setProperty('--depth-y', '0px')
    })
  })
}
