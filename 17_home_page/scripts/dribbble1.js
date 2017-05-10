document.body.addEventListener('wheel', function (e) {
  // console.info(e)
  // e.preventDefault()
  tmpvp[0] === tmpvp[1] ? null : (e.preventDefault(), slideMe(e.deltaY > 0))
  //  goNext(e) : goPrev(e)
})

/**
 * @param  {Boolean} direction - 滚动的方向，ture 为向下滚动一节，false为向上滚动
 */
function slideMe(direction) {
  // 如果没有初始化页面参数，或者正在滚动过程中，不执行动作
  if (!params || params.animating) return null
  // 设置 正在滚动标识
  params.animating = true

  direction = typeof direction === 'undefined' ? fasle : direction
  let dest = 0
  dest = direction ? params.boundary[tmpvp[1]][0] - window.scrollY : params.boundary[tmpvp[0]][1] - window.innerHeight - window.scrollY
  Jump(dest, {
    callback: () => {
      params.animating = false
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  console.info('DOMContentLoaded')
  window.params = initPage()
  window.tmpvp = [-1, -1]
  document.addEventListener('scroll', snapViewStatus)
})

/**
 * 初始化页面参数，
 * params.doms 为页面 section
 * params.boundary 为每个section 的边界
 * @returns {}
 */
function initPage() {
  let params = {
    doms: [],
    boundary: [],
    // currentIndex: 0,
    animating: false
  }
  params.doms.push(document.querySelector('header'))
  params.doms.push(...document.querySelectorAll('section'))
  params.doms.push(document.querySelector('footer'))
  params.boundary = params.doms.map(function (el) {
    return [el.offsetTop, el.offsetTop + el.clientHeight]
  })
  return params
}
/**
 * 抓取当前viewPort状态
 * 直接操作全局变量，没有返回值
 * 写成方法，等待使用节流函数
 */
function snapViewStatus ()  {
  let tmp = [window.scrollY + window.innerHeight * .2, window.scrollY + window.innerHeight * .8]
  // console.info(tmp)
  tmpvp = tmp.map(v0 =>
    params.boundary.findIndex(v1 =>
      v0 >= v1[0] && v0 <= v1[1]
    )
  )
  // console.info(tmpvp)
}
