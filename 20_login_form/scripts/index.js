document.addEventListener('DOMContentLoaded', function() {
  let main = document.querySelector('main')
  if (main) {
    let btnSignIn = main.querySelector('[data-target="signin"]')
    let btnSignUp = main.querySelector('[data-target="signup"]')
    main.addEventListener('click', function(e) {
      // 当前激活的状态
      let current = main.dataset.active === 'signup' ? 'signup' : 'signin'
      if (e.target.matches('[data-target]')) {
        console.info('点击到了某个要切换的按钮')
        if (current === e.target.dataset.target) {
          return
        }
        switchMain(e.target.dataset.target, main)
          // 在这儿捕获了行为，后边的不执行了
        return
      }
      // 如果登录或注册面板被点击，则切换其到焦点状态
      let clickedBoard = searchEl('[class^="sign"]', e)
      if (clickedBoard) {
        // 获取目标状态并标准化
        let targetActive = [].filter.call(clickedBoard.classList, v => /^sign.*/.test(v))[0] === 'signup' ? 'signup' : 'signin'
        if (targetActive !== current) {
          // 如果不相等，说明点了后边的页面，那么把页面提上来。
          switchMain(targetActive, main)
          e.preventDefault()
          e.stopPropagation()
        }
        // 在这儿捕获了行为，后边的不执行了
        return
      }

    })
  }
})


function switchMain(className, main) {
  if (!main) return console.info('el 未传入')
  main.setAttribute('data-active', `${className}-end`)
  setTimeout(function() {
    main.setAttribute('data-active', className)
  }, 0)
}

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