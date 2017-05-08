class Slide {
  constructor(options) {
    if (typeof options.el !== 'string') return console.error('wrong params')
    this.target = document.querySelector(options.el)
    this.views = this.target.querySelector('.view')
    this.slides = this.target.querySelectorAll('.slide')
    // console.info(this.slides)
    this.initIndicator().bindEvent()
  }

  initIndicator() {
    // 初始化 控制原点
    var oFram = document.createDocumentFragment()
    var dots = document.createElement('ul')
    // console.info(this.slides)
    dots.classList.add('dots')
    var tmp = [].map.call(this.slides,
      (v, i) => {
        return `<li class='dot'>${i}</li>`
      }
    ).join('')

    dots.innerHTML = tmp
    oFram.appendChild(dots)
    this.target.appendChild(oFram)
    return this
  }
  bindEvent() {
    this.dots = this.target.querySelector('.dots')
    this.dots.addEventListener('click',function(e){

    })
  }
}

new Slide({ el: '.slides' })
