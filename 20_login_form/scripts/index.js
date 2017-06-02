let inited = false

let progressingList = {
    signin: false,
    signup: false,
    animating: false,
    timer: {}
  }
  // 表单校验使用的缓存变量
let validElList = new Map()

// 表单校验使用的策略
var strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') {
      return '\u00d7 ' + errorMsg;
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return '\u00d7 ' + errorMsg;
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return '\u00d7 ' + errorMsg;
    }
  },
  isEmail: function(value, errorMsg) {
    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
      return '\u00d7 ' + errorMsg;
    }
  },
  isEqual: function(valueArray, errorMsg) {
    // console.info('equal 校验')
    if (valueArray[0] === '' || valueArray.length === 1 || (new Set(valueArray).size) !== 1) {
      return errorMsg
    }
  },
  default: function(value) {
    return '\u00d7 ' + `没有找到校验规则，随便你输入什么，过得去算我输`
  }
};
// 每种表单的验证
let validDict = {
  'username': function(el, length) {
    let value = el.value
    length = length || 4
    let errorMsg = `用户名长度不能小于 ${length} 位`
    let result = strategies.minLength(value, length, errorMsg)
    return { err: !!result, msg: result || ' \u221a' }
  },
  'email': function(el) {
    let value = el.value
    let errorMsg = `邮箱格式不正确`
    let result = strategies.isEmail(value, errorMsg)
      // console.info('判断结果', result)
    return { err: !!result, msg: result || ' \u221a' }
  },
  'passwd': function(el, length) {
    let value = el.value
    length = length || 4
    let errorMsg = `密码长度不能小于 ${length} 位`
    let result = strategies.minLength(value, length, errorMsg)
    return { err: !!result, msg: result || ' \u221a' }
  },
  'passwdConfirm': function(el) {
    // console.info(el)
    let form = findParent('.form', el)
    if (!form) {
      console.info('没找到范围表单，这是个假按钮')
      return { err: !!1, msg: ' \u00d7 没找到范围表单，这是个假按钮' }
    }
    let valueArray = [].map.call(form.querySelectorAll('[name^="passwd"]'), v => v.value)
      // console.info('value Array', valueArray)
    let errorMsg = `确认密码应与密码一致有效`
    let result = strategies.isEqual(valueArray, errorMsg)
    return { err: !!result, msg: result || ' \u221a' }
  },
  'default': function(el) {
    let value = el.value
    let result = strategies.default(value)
    return { err: !!result, msg: result || ' \u221a' }
  }
}




document.addEventListener('DOMContentLoaded', function() {


  document.addEventListener('input', function(e) {
    if (e.target.matches('input')) {
      let inputUnit = getInstance(e.target)
      inputUnit.check()
    }
    // console.info('表单校验', e.target)
  })

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
        if (!checkFrom(e.target)) {
          toast('{{ 请重新填写提交 }}', toastEl)
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
          console.log(loginedUser)
          toast('{{ 已登录 }}', toastEl)
        }, function(error) {
          console.error('没有登陆成功', error.code, error.message)
          toast(`{{ 登录失败, ${error.message} }}`, toastEl)
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
        if (!checkFrom(e.target)) {
          toast('{{ 请重新填写提交 }}', toastEl)
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
            console.log('注册成功', loginedUser);
            toast(`{{ 注册成功 }}`, toastEl)
          }, function(error) {
            console.error('没有注册成功', error.code, error.message)
            toast(`{{ 注册失败, ${error.message} }}`, toastEl)
          })
          .then(function() {
            progressingList.signup = false
          })
        return
      }

    })
  }
})

/**
 * 切换 signIn signUp 焦点
 *
 */
function switchMain(className, main) {
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
 * 创建表单验证实例，每次验证到，如果缓存对象里没有，新建类，并置入缓存对象
 * 类需要匹配到错误提示框
 */
class InputUnit {
  constructor(options) {
    this.inputEl = options.el
    this.tipEl = options.tip
    let form = findParent('.form', this.inputEl)
    if (form) {
      console.info(this.inputEl.getAttribute('name'))
      this.relativeEl = new Set(Array.from(form.querySelectorAll(`[name^=${this.inputEl.getAttribute('name')}]`)))
      this.relativeEl.delete(this.inputEl)
    } else {
      this.relativeEl = new Set()
    }
    // console.info(this.relativeEl)
    // 从 strategries 中简易模糊匹配判断类别
    this.type = Object.keys(validDict).filter(key => (new RegExp(this.inputEl.getAttribute('name'))).test(key))[0] || 'default'
      // console.info('初始化实例,类型是', this.type)
      // this.timer = null
  }
  check(withOutRelative) {
    console.info(!withOutRelative, !this.relativeEl.size)
    if (!withOutRelative && this.relativeEl.size) {
      // console.info('here1')
      Array.from(this.relativeEl).map(item => {
          //这儿只是检查，不会返回值。 表单校验时，会校验两遍，但是返回值只接受一次
          getInstance(item).check('only')
        })
        // 取到的相关元素不包含自身，取消下边这行return
        // return
    }
    // console.info('here2')
    let { err, msg } = validDict[this.type](this.inputEl)
    this.setTip({ style: err ? 'fail' : 'pass', msg })
    return !err
  }
  setTip({ style, msg }) {
    let rmStyle = style === 'fail' ? 'pass' : 'fail'
    this.tipEl.classList.add(style)
    this.tipEl.classList.remove(rmStyle)
    this.tipEl.textContent = msg
  }
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

function toast(msg, el) {
  console.info('toast:', msg)
  if (el) {
    el.textContent = msg
  }
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