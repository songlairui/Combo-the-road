var timer1, timer2

function slideTop() {
  var trys = 10
  var steps = 10
  var start, effration, effend, vheight
  if (timer1 || timer2) {
    clearTimeout(timer1)
    clearTimeout(timer2)
  }
  start = document.body.scrollTop
  vheight = document.body.offsetHeight
  if (start < 1) {
    window.scrollTo(0,.5*vheight)
    return
  }
  trys = Math.floor(start / vheight * 5) + 1
  steps = Math.floor(40/trys) + 5
  console.log(trys,steps)
  effration = Math.pow(1 - 1 / trys, trys)
  effration = effration / (1 - effration)
  effend = -start * effration

  console.log(start, effration, effend)
  var i = 0

  function tryOne() {
    // console.log('tryOne')
    timer1 = null
    var tmpstart = document.body.scrollTop
    var tmpdistance = tmpstart - effend
    var tmpstep = tmpdistance / trys / steps
      // console.log(tmpstart,tmpdistance,i)
    // console.info(tmpdistance,tmpstep)
      // window.scrollBy(0,-tmpdistance/(trys-0))
    var j = 0

    function tryBit() {
      console.info('tryBit')
      window.scrollBy(0, -tmpstep)
      j += 1
      if (j < steps) {
        timer2 = setTimeout(function() {
          timer2 = null
          tryBit(timer2)
        }, 10)
      } else {
        j=0
        i += 1
        if (i < trys) {
          timer1 = setTimeout(tryOne, 2)
        } else {
          i = 0
        }
      }

    }
    tryBit()
  }
  tryOne()
}