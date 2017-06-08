function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}

var queue = [
  [red, 3000],
  [green, 2000],
  [yellow, 1000]
]

// var test1 = queue.map(([func, interval]) => new Promise(resolve => {
//   func()
//   setTimeout(resolve, interval)
// }))

;
(function play() {
  return queue.reduce((prev, [func, interval]) => {
      return prev.then(() => new Promise(resolve => {
        setTimeout(() => {
          func()
          resolve()
        }, interval)
      }))
    }, Promise.resolve())
    .then(play)
})()


// 浏览器可执行
function play() {
  return queue.reduce((prev, [func, interval]) => {
      return prev.then(() => new Promise(resolve => {
        setTimeout(() => {
          func()
          resolve()
        }, interval)
      }))
    }, Promise.resolve())
    .then(play)
}
// 浏览器控制台 执行 play()