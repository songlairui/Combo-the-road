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
function toast(msg, el, className) {
  console.info('toast:', msg)
  if (el) {
    el.textContent = msg
    if (className) {
      el.classList.remove('fail')
      el.classList.remove('pass')
      el.classList.add(className)
    }
  }
}


/**
 * 动画
 * 切换 signIn signUp 焦点
 */
function switchMain(className, main) {
  let [target, prev] = ['signin', 'signup']
  if (className !== 'signin')[target, prev] = [prev, target]

  if (!main) return console.info('el 未传入')
  clearFormValid(main.querySelector(`.boards .${prev} .form`))
    // if (progressingList.animating) {
    //   return console.info('切换间隔要大于100ms')
    // }
    // progressingList.animating = true
  main.setAttribute('data-active', `${className}-end`)
  void main.offsetWidth
  main.setAttribute('data-active', className)
  checkFrom(main.querySelector(`.${target} button.btn`))
    // setTimeout(function() {
    //   progressingList.animating = false
    // }, 10)

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
function checkFrom(btnEl, type) {
  let form
  if (btnEl.matches('.form')) {
    form = btnEl
  } else {
    form = findParent('.form', btnEl)
  }
  if (!form) {
    console.info('没找到范围表单，这是个假按钮')
  }
  let inputs = form.querySelectorAll('input')

  // 如果不是提交按钮点击的，就忽略检查‘空值’，即空值的表单不取，
  let toValidInputs = [].filter.call(inputs, input => type === 'submit' || input.value !== '')
    // 所有的元素，检查一遍，得到一个结果数组。如果里面没有false，则返回true，即通过。
  return (toValidInputs.map(input => getInstance(input).check()).indexOf(false) === -1)
}
/**
 * 清空表单的检查状态
 */
function clearFormValid(poolEl) {
  if (poolEl) {;
    [].map.call(poolEl.querySelectorAll('.alert-tip'), v => {
      // v.textContent = ''
      v.classList.remove('fail')
      v.classList.remove('pass')
    })
  }
}

/**
 * 切换登录状态
 */
function turnAuthed(main, user) {
  main = main || document.querySelector('main')
  user = user || AV.User.current()
  let signinFrom = main.querySelector('.signin .form')
    // console.info(main, user, signinFrom)
  let title = document.querySelector('section#profile #userName')
  if (user) {
    // console.info('已登录', signinFrom)
    clearFormValid(signinFrom)
    title.textContent = user.get('username')
    void main.offsetWidth
    main.classList.add('authed')
  } else {
    // console.info('未登录', signinFrom)
    checkFrom(signinFrom)
    title.textContent = '{{ -- }}'
    void main.offsetWidth
    main.classList.remove('authed')
  }
}