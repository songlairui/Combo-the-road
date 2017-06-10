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
      // console.info(this.inputEl.getAttribute('name'))
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
    // console.info(!withOutRelative, !this.relativeEl.size)
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
    if (style === 'fail') {
      this.tipEl.textContent = msg
    }
  }
}