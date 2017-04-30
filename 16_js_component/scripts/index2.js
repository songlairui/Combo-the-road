class Tabs {
    constructor(options) {
        this.el = document.querySelector(options.el)
        this.selectorNav = '[data-role="tabs-nav"]'
        this.selectorPanel = '[data-role="tabs-panel"]'
        // this.navs = this.el.querySelectorAll('[data-role="tabs-nav"]>li')
        // this.panels = this.el.querySelectorAll('[data-role="tabs-panel"]>li')
        this.bindEvent()
    }

    bindEvent() {
        // console.info('here')
        let nav = this.el.querySelector(this.selectorNav)
        let navs = this.el.querySelectorAll(`${this.selectorNav}>li`)
        let panels = this.el.querySelectorAll(`${this.selectorPanel}>li`)
        nav.addEventListener('click', function (e) {
            var target = searchEl('[data-role="tabs-nav"]>li', e.target, e.currentTarget)
            var index = numEl(target)
            // console.info(target, index, that.panels)
            for (var i = 0; i < panels.length; i++) {
                // console.info(that.panels)
                if (index === i) {
                    navs[i].classList.add('active')
                    panels[i].classList.add('active')
                } else {
                    navs[i].classList.remove('active')
                    panels[i].classList.remove('active')
                }
                // console.info(panels[i], panels[i].classList)
            }
        })
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

window.onload = function () {
    new Tabs({
        el: '.tabs',
    })
}
