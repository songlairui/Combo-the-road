window.onload = function () {
  new Tabs({
    el: '.tabs',
  })
}

class Tabs0 {
  contructor(options) {
    let defaultOptions = {

    }
  }
}

function Tabs(options) {
  this.el = document.querySelector(options.el)
  this.nav = this.el.querySelector('[data-role="tabs-nav"]')
  this.navs = this.el.querySelectorAll('[data-role="tabs-nav"]>li')
  this.panels = this.el.querySelectorAll('[data-role="tabs-panel"]>li')
  var that = this
  this.nav.addEventListener('click', function (e) {
    var target = searchEl('[data-role="tabs-nav"]>li', e.target, e.currentTarget)
    var index = numEl(target)
    // console.info(target, index, that.panels)
    for (var i = 0; i < that.panels.length; i++) {
      // console.info(that.panels)
      if (index === i) {
        that.navs[i].classList.add('active')
        that.panels[i].classList.add('active')
      } else {
        that.navs[i].classList.remove('active')
        that.panels[i].classList.remove('active')
      }
      console.info(that.panels[i], that.panels[i].classList)
    }
  })
}

Tabs.prototype.bindEvent = function () {

  var target = searchEl('[data-role="tabs-nav"]>li', e.target, e.currentTarget)

  if (target) {
    target
  }
}

function searchEl(Selector, el, parent) {
  parent = parent || document.documentElement
  // console.info(Selector, el, parent)
  while (!el.matches(Selector)) {
    if (el === parent) {
      el = null
      break
    }
    el = el.parentNode
  }
  // console.info(el)
  return el
}
function numEl(el) {
  let pool = document.querySelectorAll('[data-role="tabs-nav"]>li')
  let index = -1
  for (var i = 0; i < pool.length; i++) {
    // console.info(el, pool[i])
    if (el === pool[i]) {
      index = i
      break
    }
    continue
  }
  return index
}