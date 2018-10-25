
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