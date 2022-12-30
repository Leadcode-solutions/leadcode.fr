import 'unpoly'
import 'unpoly/unpoly-migrate'

import 'unpoly/unpoly.min.css'

up.fragment.config.mainTargets.push('[layout-root]')
up.fragment.config.mainTargets.push('[layout-body]')
up.fragment.config.mainTargets.push('[layout-main]')
up.fragment.config.mainTargets.push('[layout-navbar]')

up.transition('fade', async (oldElement, newElement, options) => {
  if (oldElement.id !== 'navbar') {
    await Promise.all([
      up.animate(oldElement, 'fade-out', options),
      up.animate(newElement, 'fade-in', options)
    ])
  }
})

up.on('up:fragment:loaded', (event) => {
  let fullReload = event.response.getHeader('X-Full-Reload')

  if (fullReload) {
    // Prevent the fragment update and don't update browser history
    event.preventDefault()

    // Make a full page load for the same request.
    event.request.loadPage()
  }
})

up.on('up:fragment:inserted', () => {

  const navbar = document.querySelector('#navbar')
  if (navbar) {
    let oldScrollY = 0
    navbar.style.transform = 'translateY(0)'

    document.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        console.log("test")
        navbar.className = 'sticky top-0 z-10 transition duration-200 bg-white'
        if (window.scrollY > 400) {
          if (oldScrollY >= window.scrollY) navbar.style.transform = 'translateY(0)'
          else navbar.style.transform = 'translateY(-64px)'
        }

        oldScrollY = window.scrollY
      } else {
        navbar.className = 'sticky top-0 z-10 transition duration-200'
      }
    })
  }
})
