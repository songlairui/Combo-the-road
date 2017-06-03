// common.js 包含 DOM操作，动画控制，leancloud api封装


/**
 * leanCloud 初始化 api
 */
function init() {
  return new Promise(function(r, j) {
    if (inited) {
      r('inited already')
    } else {
      let appId = "pknF0GITGKzrcvKxN2xwv7Eb-gzGzoHsz";
      let appKey = "4MCcoKuGaEg8xMbH6BF7HaJw";
      AV.init({ appId, appKey })
      inited = true
      r('just inited')
    }
  }).then(function(msg) {
    console.info('init info:', msg)
    return true
  }).catch(err => {
    console.info('init Err', err)
  })
}

/**
 *  事件委托工具函数
 */
function searchEl(selector, e) {
  let root = e.currentTarget || document.documentElement
  let el = e.target
  if (!el || !selector) { return null }
  while (!el.matches(selector)) {
    if (el === root) {
      el = null
      break
    }
    el = el.parentNode
  }
  return el
}

function findParent(selector, el) {
  let target = el.parentNode
  while (!target.matches(selector)) {
    if (target === document.documentElement) {
      target = null
      break
    }
    target = target.parentNode
  }
  return target
}

// 显示提示信息
function toast(msg, el) {
  console.info('toast:', msg)
  if (el) {
    el.textContent = msg
  }
}


/**
 * 动画
 * 切换 signIn signUp 焦点
 */
function switchMain(className, main) {
  clearFormValid(document.querySelector(`main .boards .${className === 'signin' ? 'signup' : 'signin'} .form`))
  if (progressingList.animating) {
    return console.info('切换间隔要大于100ms')
  }
  progressingList.animating = true
  if (!main) return console.info('el 未传入')
  main.setAttribute('data-active', `${className}-end`)
  setTimeout(function() {
    main.setAttribute('data-active', className)
    progressingList.animating = false
  }, 10)

}


/**
 * 联合缓存变量，获取实例
 */
function getInstance(el) {
  let inputUnit
  if (!validElList.has(el)) {
    let tip = el.parentNode.querySelector('.alert-tip')
    if (!tip) {
      // 没获取到el, 创建一个
      tip = document.createElement('span')
      tip.className = 'alert-tip'
      el.parentNode.insertBefore(tip, el)
    }
    inputUnit = new InputUnit({
      el,
      tip
    })
    validElList.set(el, inputUnit)
    console.info('增加 Map 缓存')
  } else {
    console.info('从缓存中取出实例')
    inputUnit = validElList.get(el)
  }
  return inputUnit
}

/**
 * 根据按钮检查表单数据
 */
function checkFrom(btnEl) {
  let form = findParent('.form', btnEl)
  if (!form) {
    console.info('没找到范围表单，这是个假按钮')
  }
  let inputs = form.querySelectorAll('input')
    // 所有的元素，检查一遍，得到一个结果数组。如果里面没有false，则返回true，即通过。
  return ([].map.call(inputs, input => getInstance(input).check()).indexOf(false) === -1)
}
/**
 * 清空表单的检查状态
 */
function clearFormValid(poolEl) {
  if (poolEl) {;
    [].map.call(poolEl.querySelectorAll('.alert-tip'), v => {
      v.textContent = ''
      v.classList.remove('fail')
      v.classList.remove('pass')
    })
  }
}