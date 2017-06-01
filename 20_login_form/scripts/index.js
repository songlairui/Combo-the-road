let inited = false

let progressingList = {
  signin: false,
  signup: false
}

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
            // 在这儿捕获了行为，后边的不执行了
          return
        }
      }

      // 按钮 行为
      // ? TODO 未来如何优化？
      // Sign In
      if (e.target.matches('.btn-sign-in')) {
        if (progressingList.signin) {
          return console.info('正在等待登陆结果')
        }
        progressingList.signin = true
        let emailEl = main.querySelector('.signin input[name="email"]')
        let passwdEl = main.querySelector('.signin input[name="passwd"]')
        if (!emailEl || !passwdEl) return console.error('未找到表单')
        init().then(function() {
          return AV.User.logIn(emailEl.value, passwdEl.value)
        }).then(function(loginedUser) {
          console.log(loginedUser)
        }, function(error) {
          console.error('没有登陆成功', error.code, error.message)
        }).then(function() {
          // 请求处理完成， 设置 参数为false
          progressingList.signin = false
        })
        return
      }
      // Sign Up
      if (e.target.matches('.btn-sign-up')) {
        if (progressingList.signup) {
          return console.info('正在等待注册结果')
        }
        progressingList.signup = true

        let emailEl = main.querySelector('.signup input[name="email"]')
        let passwdEl = main.querySelector('.signup input[name="passwd"]')
          // TODO 表单验证..
        console.info(emailEl.value, passwdEl.value)
        init()
          .then(function() {
            // 新建 AVUser 对象实例
            var user = new AV.User();
            // 设置用户名， 用户名与邮箱一致
            user.setUsername(emailEl.value);
            // 设置邮箱
            user.setEmail(emailEl.value);
            // 设置密码
            user.setPassword(passwdEl.value);

            return user.signUp()
          })
          .then(function(loginedUser) {
            console.log('注册成功', loginedUser);
          }, function(error) {
            console.error('没有注册成功', error.code, error.message)
          })
          .then(function() {
            progressingList.signup = false
          })
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