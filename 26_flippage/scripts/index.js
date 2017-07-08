function Bookani() {
  this.pages = new Set()
  this.active = new Set()
}
const bookani = new Bookani()
Bookani.prototype.grabOnePage = function() {
  let available = new Set([...this.pages].filter(item => !this.active.has(item)))
  if (available.size) {
    this.active.add([...available][0])
    return [...available][0]
  } else {
    return null
  }
};

let i = 0
let timer

document.addEventListener('DOMContentLoaded', function() {
  bookani.pages = new Set(document.querySelector('.book').querySelectorAll('.flip'))
  document.querySelector('.book').addEventListener('click', flipAniFactory(3,30))
    // bookani.size = bookani.pages.size
})

function flipOne() {
  let el = bookani.grabOnePage()
  if (!el) return console.info('no el can use')

  // 如果之前的动画没有收尾，则无法触发动画的重复播放，
  // 下边这两句黑魔法
  el.classList.remove('active')
  void el.clientWidth

  el.classList.add('active')
  setTimeout(() => {
    el.classList.remove('active')
    bookani.active.delete(el)
  }, 499)
}


function flipAniFactory(count, interval) {
  let timer
  let i = 0
  count = count || 15
  interval = interval || 100
  return function sequence() {
    // console.info(i,count,interval)
    if (timer) return
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = undefined
      console.info('触发一下activeOne')
      flipOne()
      i++
      if (i < count) {
        sequence()
      } else {
        i = 0
      }
    }, interval)
  }
}
