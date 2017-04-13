window.onload = function () {
  // 页面载入时，标记时间
  var initTime = new Date()
  var hours, minutes, seconds, ms

  hours = initTime.getHours()
  minutes = initTime.getMinutes()
  seconds = initTime.getSeconds()
  ms = initTime.getMilliseconds()

  var secondDelay, minuteDelay, hourDelay

  secondDelay = -seconds - ms / 1000
  minuteDelay = -minutes * 60 - seconds
  hourDelay = -hours * 3600 - minutes * 60 - seconds

  var styleElem = document.head.appendChild(document.createElement("style"));

  styleElem.innerHTML = `.clock .above .circle1::before {
  animation: spin 30s linear ${secondDelay}s infinite, color 60s step-end ${secondDelay}s infinite;
}
.clock .above .circle2::before {
  animation: spin 1800s linear ${minuteDelay}s infinite, color 3600s step-end ${minuteDelay}s infinite;
}
.clock .above .circle3::before {
  animation: spin 21600s linear ${hourDelay}s infinite, color 43200s step-end ${hourDelay}s infinite;
}
.clock .grooves .circle1 .dot {
  animation: dotSpin 60s linear ${secondDelay}s infinite;
}
.clock .grooves .circle1 .dot .text {
  animation: dotTextSpin 60s linear ${secondDelay}s infinite;
}

.clock .grooves .circle2 .dot {
  animation: dotSpin 3600s linear ${minuteDelay}s infinite;
}
.clock .grooves .circle2 .dot .text {
  animation: dotTextSpin 3600s linear ${minuteDelay}s infinite;
}

.clock .grooves .circle3 .dot {
  animation: dotSpin 43200s linear ${hourDelay}s infinite;
}
.clock .grooves .circle3 .dot .text {
  animation: dotTextSpin 43200s linear ${hourDelay}s infinite;
}
`;

  //  更改数字显示
  var dotSecond, dotMinute, dotHour
  dotSecond = document.querySelector('.grooves .circle1 .text')
  dotMinute = document.querySelector('.grooves .circle2 .text')
  dotHour = document.querySelector('.grooves .circle3 .text')

  function changeText() {
    var timer = setInterval(function () {
      var currTime = new Date()
      var hours, minutes, seconds

      dotSecond.innerHTML = currTime.getSeconds()
      dotMinute.innerHTML = currTime.getMinutes()
      dotHour.innerHTML = currTime.getHours()
    }, 1000)
  }
  initInterval(changeText)
}

// 需要有强迫症吗？开始执行setInterval时，判断毫秒数距离过秒是否小于300ms?
function initInterval(func) {
  var delta = 1000 - new Date().getMilliseconds()
  console.log(delta)
  if (delta < 600) {
    setTimeout(function () {
      initInterval(func)
    }, 200)
  } else {
    func()
  }
}