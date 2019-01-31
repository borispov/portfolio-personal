const animeScrolledTo = () => {
  let elements, winHeight
  const init = () => {
    elements = document.querySelectorAll('.hidden')
    winHeight = window.innerHeight
    window.addEventListener('scroll', checkPos);
    window.addEventListener('resize', init);
    checkPos()
  }
  const checkPos = () => {
    for (var i = 0; i < elements.length; i++) {
      let posFromTop = elements[i].getBoundingClientRect().top
      if (posFromTop - winHeight <= 0) {
        addClass(elements[i], 'fade-in')
        removeClass(elements[i], 'hidden')
      }

    }
  }
  return { init }
}

const smoothScroll = () => {
  
  const aLinks = document.querySelectorAll('.-scroll')

  // assign eventHandler to each of them.
  aLinks.forEach(node => {
    node.addEventListener('click', e => {
      e.preventDefault()

      const targetId =
        e.target.localName === 'button'
          ? node.getAttribute('href').split('#')[1]
          : // e.target.baseURI.split('#')[1]
          e.target.href.split('#')[1]

      const targetNode = document.getElementById(targetId)

      const anim = requestAnimationFrame(timestamp => {
        const stamp = timestamp || new Date().getTime()
        const duration = 1200
        const start = stamp

        const startOffset = window.pageYOffset

        const scrollEndElemTop = targetNode.getBoundingClientRect().top

        scrollToNode(start, stamp, duration, scrollEndElemTop, startOffset)
      })
    })
  })

  // Gurjit's Magic .!.

  const easyInCubic = t => t * t * t
  // Gurjit's Magic function
  const scrollToNode = (startTime, currentTime, dur, targetPos, startPos) => {
    const runtime = currentTime - startTime
    let progress = runtime / dur

    progress = Math.min(progress, 1)

    const ease = easyInCubic(progress)

    window.scroll(0, startPos + targetPos * ease)

    if (runtime < dur) {
      requestAnimationFrame(timestamp => {
        const currentTime = timestamp || new Date().getTime()
        scrollToNode(startTime, currentTime, dur, targetPos, startPos)
      })
    }
  }
}

window.onload = function() {
  animeScrolledTo().init()
  smoothScroll()
  const arrowScroll = document.querySelectorAll('.downarrow')
  for (x of arrowScroll) {
    let xHref = x.parentElement.id === 'home' ? 'portfolio' : 'portfolio2'
    x.firstElementChild.setAttribute('href', `#${xHref}`)
  }
}

const navLink = document.querySelectorAll('.nav__link')

const projSect = document.querySelector('.project-section')
const contSect = document.querySelector('.contact')

document.addEventListener('scroll', function(){
  
  const projectStartY = projSect.offsetTop
  const projectEndY = contSect.offsetTop
  if (window.scrollY > projectStartY && window.scrollY < projectEndY) {
    navLink.forEach(function(item) {
      addClass(item, 'rednav')
      removeClass(item, 'whitenav')
    })
  }
  else {
    navLink.forEach(function(item) {
      addClass(item, 'whitenav')
      removeClass(item, 'rednav')
    }) 
  }
})


function addClass(el, klass) {
  el.classList.add(klass)
}

function removeClass(el, klass){
  el.classList.remove(klass)
}