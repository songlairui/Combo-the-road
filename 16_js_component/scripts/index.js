
function Tabs(options) {
  this.el = document.querySelector(options.el)
  this.nav = this.el.querySelector('[data-role="tabs-nav"]')
  this.navs = this.el.querySelectorAll('[data-role="tabs-nav"]>li')
  this.panels = this.el.querySelectorAll('[data-role="tabs-panel"]>li')
  var that = this
  this.nav.addEventListener('click', function (e) {
    var target = searchEl('[data-role="tabs-nav"]>li', e.target, e.currentTarget)
    var index = numEl(target, that.el)
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