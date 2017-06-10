document.addEventListener('DOMContentLoaded', function() {

  document.addEventListener('input', function(e) {
    if (e.target.matches('input')) {
      getInstance(e.target).check()
    }
    //TODO , 是否使用节流函数？
  })

  let main = document.querySelector('main')
  if (main) {
    let btnSignIn = main.querySelector('[data-target="signin"]')
    let btnSignUp = main.querySelector('[data-target="signup"]')
    main.addEventListener('click', function(e) {

      let forgetPanel = main.querySelector('.forget-panel')
        // 如果点击不在忘记密码的元素下，则隐藏这个元素
      if (!searchEl('.forget-panel', e)) {
        if (!forgetPanel) return
          // 忘记密码动作
        if (e.target.matches('.forget')) {
          forgetPanel.classList.add('show')
        } else {
          forgetPanel.classList.remove('show')
          clearFormValid(forgetPanel)
        }
      }
      // 当前激活的状态
      let current = main.dataset.active === 'signup' ? 'signup' : 'signin'
      if (e.target.matches('[data-target]')) {
        console.info('点击到了某个要切换的按钮')
        if (current !== e.target.dataset.target) {
          switchMain(e.target.dataset.target, main)
        }
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

      // if (e.target.matches('[class*="btn-sign"]')) {
      //   // 提交按钮，进行数据检查
      //   if (!checkFrom(e.target)) {
      //     toast('表单验证不通过')
      //     return
      //   }
      // }

      // Sign In
      if (e.target.matches('.btn-sign-in')) {
        let toastEl = e.target.parentNode.querySelector('.alert-tip')
        toast('{{ --- }}', toastEl)
          // 提交按钮，进行数据检查
        if (!checkFrom(e.target, 'submit')) {
          toast('{{ 请重新填写提交 }}', toastEl, 'fail')
          return
        }
        // 阻止频繁点击
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
          // console.log(loginedUser)
          toast('{{ 已登录 }}', toastEl, 'pass')
        }, function(error) {
          // console.error('没有登陆成功', error.code, error.message)
          toast(`{{ 登录失败, ${error.message} }}`, toastEl, 'fail')
        }).then(function() {
          // 请求处理完成， 设置 参数为false
          progressingList.signin = false
        })
        return
      }

      // Sign Up
      if (e.target.matches('.btn-sign-up')) {
        let toastEl = e.target.parentNode.querySelector('.alert-tip')
        toast('{{ --- }}', toastEl)
          // 提交按钮，进行数据检查
        if (!checkFrom(e.target, 'submit')) {
          toast('{{ 请重新填写提交 }}', toastEl, 'fail')
          return
        }
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
            // console.log('注册成功', loginedUser);
            toast(`{{ 注册成功 }}`, toastEl, 'pass')
          }, function(error) {
            // console.error('没有注册成功', error.code, error.message)
            toast(`{{ 注册失败, ${error.message} }}`, toastEl, 'fail')
          })
          .then(function() {
            progressingList.signup = false
          })
        return
      }
      // Reset Btn
      if (e.target.matches('.btn-reset', 'submit')) {
        let toastEl = e.target.parentNode.querySelector('.alert-tip')
        toast('{{ --- }}', toastEl)
          // 提交按钮，进行数据检查
        if (!checkFrom(e.target)) {
          toast('{{ 请重新填写提交 }}', toastEl, 'fail')
          return
        }
        if (progressingList.reset) {
          return console.info('正在等待注册结果')
        }
        progressingList.reset = true
        let emailEl = forgetPanel.querySelector('input[name="email"]')
        window.tmp = emailEl
        init().then(function() {
            return AV.User.requestPasswordReset(emailEl.value)
          }).then(function(success) {
            // console.log('注册成功', loginedUser);
            toast(`{{ 重置成功 ${JSON.stringify(success,4)} }}`, toastEl, 'pass')
          }, function(error) {
            // console.error('没有注册成功', error.code, error.message)
            toast(`{{ 重置失败, ${error.message} }}`, toastEl, 'fail')
          })
          .then(function() {
            progressingList.reset = false
          })
      }


      // console.info(e.target)
    })
  }
})