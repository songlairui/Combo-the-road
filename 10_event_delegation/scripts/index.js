window.onload = function () {
  var parent1, parent2, child11, child12, child21, child22, child23, parent3
  var tip
  tip = function (str) {
    str = str || '已点击'
    let tip = document.createElement('span')
    tip.classList.add('tip')
    tip.textContent = str
    return tip
  }

  parent1 = document.querySelector('.parent-1')
  child11 = parent1.querySelector('.child-1')
  child12 = parent1.querySelector('.child-2')

  parent2 = document.querySelector('.parent-2')
  child21 = parent2.querySelector('.child-1')
  child22 = parent2.querySelector('.child-2')
  child23 = parent2.querySelector('.child-3')

  parent3 = document.querySelector('.parent-3')

  parent1.addEventListener('click', function (e) {
    console.info('parent1', e)
    // e.currentTarget.insertAdjacentHTML('beforeend',' 已点击')
    e.stopPropagation()
    e.currentTarget.append(tip())
  }, true)
  child11.addEventListener('click', function (e) {
    console.info('child11', e)
    // e.currentTarget.insertAdjacentHTML('beforeend',' 已点击')
    e.currentTarget.append(tip())
  }, true)
  child12.addEventListener('click', function (e) {
    console.info('child21', e)
    // e.currentTarget.insertAdjacentHTML('beforeend',' 已点击')
    e.currentTarget.append(tip())
  }, true)

  parent2.addEventListener('click', function (e) {
    console.info('parent2', e)
    // e.currentTarget.insertAdjacentHTML('beforeend',' 已点击')
    e.currentTarget.append(tip())
  })
  child21.addEventListener('click', function (e) {
    console.info('child21', e)
    // e.currentTarget.insertAdjacentHTML('beforeend',' 已点击')
    e.stopPropagation()
    e.currentTarget.append(tip())
  })
  child22.addEventListener('click', function (e) {
    console.info('child22', e)
    // e.currentTarget.insertAdjacentHTML('beforeend',' 已点击')
    e.currentTarget.append(tip())
  })
  child23.addEventListener('click', function (e) {
    console.info('child23', e)
    e.preventDefault()
    // e.currentTarget.insertAdjacentHTML('beforeend',' 已点击')
    e.currentTarget.append(tip())
  })

  // parent3 进行事件委托

  parent3.addEventListener('click', function(e){
    // console.log(e.target.matches('div'))
    // return
    var result = searchEl('.child-1',e.target,e.currentTarget)
    if(result){
      result.append(tip('child-1点中'))
    }

    var result2 = searchEl('.child-2',e.target,e.currentTarget)
    if(result2){
      result2.append(tip('child-2点中'))
    }
  })

}
  // 查找元素
  function searchEl(Selector,el,parent){
    parent = parent || documen.documentElement
    // console.log(el), 点击parent
    // 这儿一个bug，我想到了逗号运算符。看起来只能使用逗号运算符调试。
    while(/*console.info(el),*/ !el.matches(Selector)){
      if(el === parent){
        el = null
        break
      }
      // 之前的bug是 下边这一个语句，放在了while开始部分
      el = el.parentNode
    } 
    return el
  }