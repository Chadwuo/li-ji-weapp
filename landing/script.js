const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const desktopMotion = window.matchMedia('(min-width: 721px)').matches
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
    { threshold: 0.16 },
  )

  revealItems.forEach(item => revealObserver.observe(item))
}
else {
  revealItems.forEach(item => item.classList.add('is-visible'))
}

const navLinks = [...document.querySelectorAll('.topnav a[href^="#"]')]
const sections = [...document.querySelectorAll('[data-section][data-scene]')]

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
    const readingLine = Math.min(window.innerHeight * 0.44, 360)
    const activeSection = sections.find((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= readingLine && rect.bottom > readingLine
    }) || sections[0]

    document.body.dataset.scene = activeSection.dataset.scene || activeSection.id
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

const hasGsap = Boolean(window.gsap && window.ScrollTrigger)

if (hasGsap && desktopMotion && !prefersReducedMotion) {
  const { gsap, ScrollTrigger } = window
  gsap.registerPlugin(ScrollTrigger)

  const cinema = document.querySelector('.product-cinema')
  const pin = document.querySelector('.cinema-pin')

  if (cinema && pin) {
    gsap.set('.field-pill', { autoAlpha: 0, scale: 0.86, y: 22 })
    gsap.set('.ui-layer', { autoAlpha: 0, scale: 0.78, y: 36, rotateX: 10 })
    gsap.set('.iphone-stage', { scale: 0.78, rotateY: -8, rotateX: 4, xPercent: -34 })
    gsap.set('.record-stack .record-card', { y: 28, autoAlpha: 0.34 })
    gsap.set('.timeline-rail article', { x: 32, autoAlpha: 0.2 })

    const productTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: cinema,
        start: 'top top',
        end: '+=620%',
        scrub: 1,
        pin,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (self.progress < 0.18) {
            cinema.dataset.scene = 'invitation'
          }
          else if (self.progress < 0.38) {
            cinema.dataset.scene = 'fields'
          }
          else if (self.progress < 0.62) {
            cinema.dataset.scene = 'phone'
          }
          else if (self.progress < 0.84) {
            cinema.dataset.scene = 'layers'
          }
          else {
            cinema.dataset.scene = 'timeline'
          }
        },
      },
    })

    productTimeline
      .to('.cinema-copy', { autoAlpha: 0, y: -42, duration: 0.7 }, 0.04)
      .to('[data-morph-card]', { scale: 1.28, x: 160, y: 20, rotate: 0, duration: 0.9 }, 0.02)
      .to('.field-pill', { autoAlpha: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.5 }, 0.18)
      .to('[data-morph-card]', { autoAlpha: 0.22, scale: 0.74, x: 310, y: 78, duration: 0.75 }, 0.35)
      .to('.iphone-stage', { scale: 1.02, xPercent: -50, rotateY: 0, rotateX: 0, duration: 1 }, 0.28)
      .to('.field-name', { x: '32vw', y: '5svh', scale: 0.82, duration: 0.9 }, 0.42)
      .to('.field-date', { x: '37vw', y: '-5svh', scale: 0.78, duration: 0.9 }, 0.44)
      .to('.field-event', { x: '36vw', y: '-20svh', scale: 0.78, duration: 0.9 }, 0.46)
      .to('.field-amount', { x: '26vw', y: '-14svh', scale: 0.82, duration: 0.9 }, 0.48)
      .to('.field-pill', { autoAlpha: 0, duration: 0.35 }, 0.68)
      .to('.record-stack .record-card', { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.56 }, 0.6)
      .to('.iphone-stage', { scale: 1.08, xPercent: -52, duration: 0.75 }, 0.64)
      .to('.ui-layer', { autoAlpha: 1, scale: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.62 }, 0.74)
      .to('.iphone-stage', { rotateY: 8, rotateX: -4, duration: 0.78 }, 0.78)
      .to('.ui-layer', { z: 120, duration: 0.62 }, 0.8)
      .to('.summary-panel', { y: -16, scale: 0.96, duration: 0.58 }, 0.82)
      .to('.record-stack', { y: -20, scale: 0.97, duration: 0.58 }, 0.84)
      .to('.timeline-rail article', { autoAlpha: 1, x: 0, stagger: 0.08, duration: 0.56 }, 0.9)
      .to('.ui-layer', { autoAlpha: 0, scale: 0.86, y: -24, stagger: 0.04, duration: 0.42 }, 1.04)
      .to('.iphone-stage', { scale: 0.92, xPercent: -44, rotateY: 0, rotateX: 0, duration: 0.62 }, 1.08)
  }
}
else {
  document.documentElement.classList.add('no-gsap')
}
