class Slide {
  constructor(options) {
    if (typeof options.el !== 'string') return console.error('wrong params')
    this.target = document.querySelector(options.el)
    this.views = this.target.querySelector('.view')
    this.slides = this.target.querySelectorAll('.slide')
    this.timer = null
    this.interval = options.interval || 1600
    // console.info(this.slides)
    this.initIndicator().bindEvent().setTimer()
  }

  initIndicator() {
    // 初始化 控制原点
    var oFram = document.createDocumentFragment()
    var dots = document.createElement('ul')
    // console.info(this.slides)
    dots.classList.add('dots')
    var tmp = [].map.call(this.slides,
      (v, i) => {
        return `<li class='dot' data-target='${i}'>${i}</li>`
      }
    ).join('')

    dots.innerHTML = tmp
    oFram.appendChild(dots)
    this.target.appendChild(oFram)
    return this
  }

  bindEvent() {
    // console.info('bind event')
    var dots = this.target.querySelector('.dots')
    var slides = this.slides
    // let timer = this.timer
    let currentIndex = null
    let _self = this
    // console.info(dots, slides)
    dots.addEventListener('click', function (e) {
      // console.info(e)
      if (e.target.matches('.dot')) {
        // console.info('match')
        let target = slides[e.target.dataset.target]
        currentIndex = e.target.dataset.target
        // console.info(slides[targetIndex])
        // console.info(slides[targetIndex].offsetLeft)
        target.parentNode.style.transform = `translateX(-${target.offsetLeft}px)`
      }
    })
    dots.addEventListener('mouseover', function (e) {
      // console.info('mouseover', _self.timer)
      if (e.target.matches('.dot')) {
        e.target.click()
        clearTimeout(_self.timer)
        _self.timer = null
      }
    })
    dots.addEventListener('mouseleave', function (e) {
      _self.setTimer(currentIndex)
    })

    this.views.addEventListener('mouseover', function (e) {
      clearTimeout(_self.timer)
      _self.timer = null
    })
    this.views.addEventListener('mouseleave', function (e) {
      _self.setTimer(currentIndex)
    })
    return this
  }

  setTimer(index) {
    let inst = typeof index !== 'undefined'
    index = index || 0
    let dots = this.target.querySelectorAll('.dots .dot')
    // let timer = this.timer
    let _self = this
    function auto() {
      // console.info('递归auto', _self.timer)
      if (_self.timer) {
        // console.info('timer 重复，返回')
        return
      }
      // console.info('开始设置timer', _self.timer)
      _self.timer = setTimeout(function () {
        // console.info('执行timer', _self.timer, Date())
        _self.timer = null
        // console.info(dots, index)
        index = index >= (dots.length - 1) ? 0 : +index + 1
        dots[index].click()
        auto()
      }, inst ? (inst = false, 300) : _self.interval)
    }
    auto()
    return this
  }
}

var vmSlide = new Slide({
  el: '.slides',
  interval: 1200
})
