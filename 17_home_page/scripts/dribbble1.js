document.addEventListener('DOMContentLoaded', function() {
  console.info('DOMContentLoaded')
  window.params = initPage()
  window.params.tmpvp = [-1, -1]
  window.addEventListener('scroll', snapViewStatus)
  window.addEventListener('resize', function() {
    window.params.boundary = snapBoundary(params)
  })



  document.body.addEventListener('wheel', function(e) {
    // e.preventDefault()
    // console.info(tmpvp)
    console.info(params.wheeling ? "wheeling" : '正在一整次的滚动')
    params.wheelStatus(e)
    console.info('tmpvp', params.tmpvp, 'dest', params.dest)
    params.tmpvp[0] === params.tmpvp[1] ? null : (e.preventDefault(), !params.normalScroll && slideMe(e.deltaY > 0))
      // 为每个当前一次的wheeling 计算滚动的终点

    //  goNext(e) : goPrev(e)
  })
})

/**
 * @param  {Boolean} direction - 滚动的方向，ture 为向下滚动一节，false为向上滚动
 */
function slideMe(direction) {
  // 如果没有初始化页面参数，或者正在滚动过程中，不执行动作
  if (!params || params.animating) return null
    // 设置 正在滚动标识
  params.animating = true
  params.slideable = false

  // tmpvp[1] === '-1' 说明滚到最后了。不需要继续向下滚了。
  if (direction && params.tmpvp[1] === '-1') return null
    // console.info(`dest`, dest)
  Jump(params.dest, {
    duration: 600,
    callback: () => {
      params.animating = false
    }
  })
}


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
    animating: false,
    wheeling: false,
    slideable: true, // 每开始一次 wheel 行为，启用一次 slideable
    normalScroll: false // 如果页面起点和终点在一个区块内，则是正常滚动，否则是全页滚动
  }
  params.doms.push(document.querySelector('header'))
  params.doms.push(...document.querySelectorAll('section'))
  params.doms.push(document.querySelector('footer'))
  params.boundary = snapBoundary(params)
  params.wheelStatus = judgeWheel(params)
  return params
}
/**
 * 设置params的boundary属性
 * 初始化的时候，window.resize的时候
 * @param  {} obj - 传入一个对象
 * @return [] - 返回一个数组
 */
function snapBoundary(obj) {
  return obj.doms.map(function(el) {
    return [el.offsetTop, el.offsetTop + el.clientHeight]
  })
}
/**
 * 抓取当前viewPort状态
 * 直接操作全局变量，没有返回值
 * 写成方法，等待使用节流函数
 */
function snapViewStatus() {
  let tmp = [window.scrollY + window.innerHeight * .1, window.scrollY + window.innerHeight * .9]
    // console.info(tmp)
  params.tmpvp = tmp.map(v0 =>
      params.boundary.findIndex(v1 =>
        v0 >= v1[0] && v0 < v1[1]
      )
    )
    // console.info(tmpvp)
}
/**
 * @param  {Array|Number} idxArr - 设置对应idx的section为appear状态
 */
function setAppear(idxArr) {
  // new Set() 去重，如果需要
  if (typeof + idxArr === 'number') {
    idxArr = [+idxArr]
  }
  params.doms.map((dom, idx) => {
    if (idxArr.indexOf(idx) !== -1) {
      dom.classList.add('appear')
    } else {
      dom.classList.remove('appear')
    }
  })
}


/**
 * 判断此次 wheel 事件是否结束
 * 一次wheel连续过程中，计算一次参数
 */
function judgeWheel(options) {
  let firstInit = true
  let timer
  let interval = 50
  let initParam = function(e) {
    let direction = e.deltaY > 0
    setAppear(params.tmpvp[direction ? 1 : 0])
    snapViewStatus()
    firstInit = false
    options.wheeling = true
    options.dest = direction ? options.boundary[params.tmpvp[1]][0] - window.scrollY : options.boundary[params.tmpvp[0]][1] - window.innerHeight - window.scrollY
    options.normalScroll = params.tmpvp[0] === params.tmpvp[1]
    console.info('current Param', options)
  }
  let closeWheeling = function wheeling() {
    console.info('wheel状态改变')
    options.wheeling = false
    options.slideable = true
    firstInit = true
  }

  return function(e) {
    if (firstInit) {
      initParam(e)
    }
    if (timer) {
      // 如果正在滚动， 又进行了滚动，则disable wheeling status的fn停止
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      clearTimeout(timer)
      timer = null
      closeWheeling()
    }, interval || 50)
  }
}