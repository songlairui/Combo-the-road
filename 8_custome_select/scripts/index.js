window.onload = function () {
  // 多选框，打开
  var timer1
  var oSelect = document.querySelector('#rebuild')
  var rSelect = document.querySelector('.reSelect')
  rSelect.addEventListener('click', function toggleClass() {

    if (rSelect.classList.contains('focus')) {
      if (timer1) {
        clearTimeout(timer1)
      }
      timer1 = setTimeout(function () {
        timer1 = null
        rSelect.classList.remove('focus')
      }, 550)
    } else {
      rSelect.classList.add('focus')
    }
  })
  // 多选框选项
  var rOptionPool = rSelect.querySelector('ul')

  var rOptions = rSelect.querySelectorAll('li')
  for (var i = 0, l = rOptions.length; i < l; i++) {
    ; (function (i) {
      console.log(rOptions[i].dataset.value)
      var _this = rOptions[i]
      rOptions[i].addEventListener('click', function select() {
        if (rSelect.classList.contains('focus')) {
          console.log(_this.dataset.value)
          rOptionPool.style.marginTop = '-' + (_this.offsetTop) + 'px'
          oSelect.value = _this.dataset.value
        } else {
          console.info('还没有打开选择框')
        }
      })
    })(i)
  }
}