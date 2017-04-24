window.onload = function () {
  // step 1 
  var step1, x, y, elW, elH, vX, vY, other

  step1 = document.querySelector('.step-1')
  x = step1.querySelector('.x')
  y = step1.querySelector('.y')
  elW = step1.querySelector('.el-w')
  elH = step1.querySelector('.el-h')
  vX = step1.querySelector('.v-x')
  vY = step1.querySelector('.v-y')
  other = step1.querySelector('.other')

  // step 2
  var step2,tTarget

  step2 =document.querySelector('.step-2')
  tTarget =step2.querySelector('.t-target')

  // 设定变形原点
  Array.from(tTarget.querySelectorAll('.b4 [class^=b]')).forEach(function(node){
      var tox = - node.offsetLeft
      var toy = step2.getBoundingClientRect().height/2 - node.offsetTop
      node.insertAdjacentText('beforeend',tox+'-'+toy)
      node.style.transformOrigin=tox + 'px ' + toy + 'px ' + '10px'
      // console.info(tox, toy)
    })

  step2.addEventListener('mouseenter',function(e){
    console.info('鼠标进入')
  })
  step2.addEventListener('mousemove', function (e) {
    // other.innerHTML = e.target
    var w,h,ex,ey,_x,_y,ox,oy
    elW.textContent = w = step2.getBoundingClientRect().width
    elH.textContent = h = step2.getBoundingClientRect().height
    vX.textContent = ox = step2.offsetLeft
    vY.textContent = oy = step2.offsetTop
    x.textContent = ex = e.clientX + window.scrollX - step2.offsetLeft
    y.textContent = ey = e.clientY + window.scrollY - step2.offsetTop

    _x =  1 -  2 * ex / w
    _y =  1 -  2 * ey / h

    dx = Math.floor( 1000 * Math.pow((Math.sign(_x) * _x),1/2) * Math.sign(_x) ) / 100
    dy = Math.floor( 1000 * Math.pow((Math.sign(_y) * _y),1/2) * Math.sign(_y) ) / 100

    rx = Math.floor( 1000 * _y ) / 100
    ry = - Math.floor( 1000 * _x ) / 100
    // console.info(_x, dx)

    tTarget.style.transform=`translateZ(-100px) translateX(${dx}px) translateY(${dy}px) rotateX(${rx}deg) rotateY(${ry}deg)`
    Array.from(tTarget.querySelectorAll('.b4 [class^=b]')).forEach(function(node){
      node.style.transform=`translateZ(50px) translateX(${dx}px) translateY(${dy}px) rotateX(${rx}deg) rotateY(${ry}deg)`
    })
  })

  step2.addEventListener('mouseleave',function(e){
    console.info('鼠标移出')
    tTarget.style.transform=`translateZ(-100px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)`
    Array.from(tTarget.querySelectorAll('.b4 [class^=b]')).forEach(function(node){
      node.style.transform=`translateZ(50px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)`
    })
    // tTarget.style.animation=`reset 1s linear 0s infinite alternate;`
  })
}