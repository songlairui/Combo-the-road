window.onload = function () {
  // 页面载入时，标记时间
  var initTime = new Date()
  var hours, minutes, seconds, ms

  hours = initTime.getHours()
  minutes = initTime.getMinutes()
  seconds = initTime.getSeconds()
  ms = initTime.getMilliseconds()

  var secondDelay, minuteDelay, hourDelay

  secondDelay = - seconds - ms/1000
  minuteDelay = - minutes * 60 - seconds
  hourDelay = - hours * 3600 - minutes * 60 - seconds

  var styleElem = document.head.appendChild(document.createElement("style"));

  styleElem.innerHTML = `.clock .above .circle1::before {
  animation: spin 30s linear ${secondDelay}s infinite, color 60s step-end ${secondDelay}s infinite;
}
.clock .above .circle2::before {
  animation: spin 1800s linear ${minuteDelay}s infinite, color 3600s step-end ${minuteDelay}s infinite;
}
.clock .above .circle3::before {
  animation: spin 21600s linear ${hourDelay}s infinite, color 43200s step-end ${hourDelay}s infinite;
}`;
}