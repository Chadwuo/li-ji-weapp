const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  },
  { threshold: 0.15 },
)

revealItems.forEach(item => revealObserver.observe(item))

const storySequence = document.querySelector('.story-scroll')
const storySteps = document.querySelectorAll('.story-step')

if (storySequence && storySteps.length) {
  const stepObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (activeEntry) {
        storySequence.dataset.step = activeEntry.target.dataset.step || '0'
      }
    },
    {
      threshold: [0.35, 0.5, 0.68],
      rootMargin: '-12% 0px -18% 0px',
    },
  )

  storySteps.forEach(step => stepObserver.observe(step))
}

const shell = document.querySelector('[data-shell]')
const depthItems = document.querySelectorAll('[data-depth]')

if (shell && depthItems.length && window.matchMedia('(pointer: fine)').matches) {
  shell.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2
    const y = (event.clientY / window.innerHeight - 0.5) * 2

    depthItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 0.4)
      item.style.setProperty('--depth-x', `${x * depth * 10}px`)
      item.style.setProperty('--depth-y', `${y * depth * 10}px`)
    })
  })

  shell.addEventListener('pointerleave', () => {
    depthItems.forEach((item) => {
      item.style.setProperty('--depth-x', '0px')
      item.style.setProperty('--depth-y', '0px')
    })
  })
}
