(function () {
  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')
  canvas.setAttribute('width', '480')
  canvas.setAttribute('height', '360')

  // ctx.drawWindow(window, 0, 0, 100, 200, "rgb(255,255,255)")

  // ctx.fillStyle = 'rgb(200,100,180)'
  // ctx.fillRect(10, 10, 55, 50)

  ctx.fillStyle = 'rgba(0,0,200,.5)'
  ctx.fillRect(30, 30, 55, 50)

  // ctx.moveTo(350,355)
  ctx.beginPath()
  ctx.moveTo(480,360)
  ctx.lineTo(240,180)
  ctx.bezierCurveTo(60,70,160,70,70,150)
  ctx.lineTo(130,230)
  ctx.fill()
})()
