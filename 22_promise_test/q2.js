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
  [green, 1000],
  [yellow, 2000]
];
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