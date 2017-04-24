window.onload = function () {
  // step 2
  var step2, tTarget, step3, eyes

  step2 = document.querySelector('.step-2')
  step3 = document.querySelector('.step-3')

  tTarget = step2.querySelector('.t-target')
  step2.addEventListener('mousemove', function (e) {
    // other.innerHTML = e.target
    var w, h, ex, ey, _x, _y, ox, oy
    w = step2.getBoundingClientRect().width
    h = step2.getBoundingClientRect().height
    ox = step2.offsetLeft
    oy = step2.offsetTop
    ex = e.clientX + window.scrollX - step2.offsetLeft
    ey = e.clientY + window.scrollY - step2.offsetTop

    _x = 1 - 2 * ex / w
    _y = 1 - 2 * ey / h
    // console.info(e,e.clientY,step2.offsetTop,ey,h)

    dx = Math.floor(1000 * Math.pow((Math.sign(_x) * _x), 1 / 2) * Math.sign(_x)) / 100
    dy = Math.floor(1000 * Math.pow((Math.sign(_y) * _y), 1 / 2) * Math.sign(_y)) / 100

    rx = Math.floor(1000 * _y) / 100
    ry = -Math.floor(1000 * _x) / 100
    // console.info(_x, dx)

    tTarget.style.transform = `translateZ(-100px) translateX(${dx}px) translateY(${dy}px) rotateX(${rx}deg) rotateY(${ry}deg)`
    Array.from(tTarget.querySelectorAll('.b4 [class^=b]')).forEach(function (node) {
      node.style.transform = `translateZ(50px) translateX(${dx}px) translateY(${dy}px) rotateX(${rx}deg) rotateY(${ry}deg)`
    })
  })

  step2.addEventListener('mouseleave', function (e) {
    console.info('鼠标移出')
    tTarget.style.transform = `translateZ(-100px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)`
    Array.from(tTarget.querySelectorAll('.b4 [class^=b]')).forEach(function (node) {
      node.style.transform = `translateZ(50px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)`
    })
    // tTarget.style.animation=`reset 1s linear 0s infinite alternate;`
  })

  step3.addEventListener('mousemove', function (e) {
    // console.info(ey)
    Array.from(step3.querySelectorAll('.eye')).forEach(function (node) {
      var w, h, _left, _top, center, rx, ry
      w = node.parentNode.getBoundingClientRect().width
      h = node.parentNode.getBoundingClientRect().height
      _left = node.parentNode.offsetLeft
      _top = node.parentNode.offsetTop

      rx = -(e.clientY + window.scrollY  - h / 2 - _top) / h * 80
      ry = (e.clientX + window.scrollX - w / 2 - _left) / w * 30
      // center = [w/2 + _left, h/2 + _top]
      // console.log(center)
      // console.log(w,h,_left,_top,node)
      // console.log(h,_top,rx)
      node.style.transform = `translateZ(50px) translateX(0px) translateY(0px) rotateX(${rx}deg) rotateY(${ry}deg)`
    })

  })
}