(function () {
  return undefined
})()

window.onload = function () {
  var output = document.querySelector('.output')
  //var img1 = document.querySelector('img')
  var imgs = document.getElementsByTagName('img')

  printlog('事件信息如下：', output)

  // var mc = new Hammer(img1)
  // mc.on('swipeleft swiperight tap press', function(ev){
  //   console.info(ev.type)
  //   printlog(ev.type, output)
  // })

  for (var i = 0, length = imgs.length; i < length; i++) {
    console.log(i)
 ;     (function () {
        var mc = new Hammer(imgs[i])
        mc.on('swipeleft', function (ev) {
          console.log('swipeleft', 'do thing 1')
        })
        mc.on('swiperight', function (ev) {
          console.log('swiperight', 'do thing 2')
        })
      })()
  }
}

function printlog(msg, target) {
  target.insertAdjacentHTML('beforeend', msg + '\n')
}