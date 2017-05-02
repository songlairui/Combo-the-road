class TabsC0 {
    constructor(options) {
        this.el = document.querySelector(options.el)
        this.selectorNav = '[data-role="tabs-nav"]'
        this.selectorPanel = '[data-role="tabs-panel"]'
        // this.navs = this.el.querySelectorAll('[data-role="tabs-nav"]>li')
        // this.panels = this.el.querySelectorAll('[data-role="tabs-panel"]>li')
        this.bindEvent().clickDefault()
    }

    bindEvent() {
        // console.info('here')
        let nav = this.el.querySelector(this.selectorNav)
        let navs = this.el.querySelectorAll(`${this.selectorNav}>li`)
        let panels = this.el.querySelectorAll(`${this.selectorPanel}>li`)
        nav.addEventListener('click', function (e) {
            var target = searchEl('[data-role="tabs-nav"]>li', e.target, e.currentTarget)
            var index = numEl(target, e.currentTarget)
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
        return this
    }

    clickDefault() {

    }
}

class TabsC {
    constructor(options) {
        this.el = document.querySelectorAll(options.el)
        this.selectorNav = '[data-role="tabs-nav"]'
        this.selectorPanel = '[data-role="tabs-panel"]'
        // this.navs = this.el.querySelectorAll('[data-role="tabs-nav"]>li')
        // this.panels = this.el.querySelectorAll('[data-role="tabs-panel"]>li')
        this.bindEvent().clickDefault()
    }

    bindEvent() {
        // console.info('here')
        for (var i = 0; i < this.el.length; i++) {
            let nav = this.el[i].querySelector(this.selectorNav)
            let navs = this.el[i].querySelectorAll(`${this.selectorNav}>li`)
            let panels = this.el[i].querySelectorAll(`${this.selectorPanel}>li`)
            nav.addEventListener('click', function (e) {
                var target = searchEl('[data-role="tabs-nav"]>li', e.target, e.currentTarget)
                var index = numEl(target, e.currentTarget)
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
        return this
    }
    clickDefault() {
        // let pool = this.el
        for(var i = 0; i< this.el.length; i++){
            this.el[i].querySelector(`${this.selectorNav}>li`).click()
        }
        return this
    }
}



