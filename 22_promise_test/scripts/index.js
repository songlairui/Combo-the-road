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


// 浏览器可执行
function play() {
  console.info('将不会停止')
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

function LazyMan(name) {
  if (this instanceof LazyMan) {
    this.id = name
    let task = callback => {
      console.log(`Hi! This is ${name}`)
      callback()
    }
    this.tasks = [task]
      // 处理完this.tasks 之后 再执行 tasks
    Promise.resolve().then(() => {
      // 开始执行 tasks
      this.tasks.reduce((prev, curr) => {
        return prev.then(() => new Promise(curr))
      }, Promise.resolve())
    })
  } else {
    return new LazyMan(name)
  }
}
LazyMan.prototype.eat = function(target) {
  let task = callback => {
    console.log(`Eat ${target}~`)
    callback()
  }
  this.tasks.push(task)
  return this
}

LazyMan.prototype.sleep = function(time) {
  this.tasks.push(sleepFactory(time))
  return this
}
LazyMan.prototype.sleepFirst = function(time) {
  this.tasks.unshift(sleepFactory(time))
  return this
}

function sleepFactory(time) {
  return callback => {
    console.log(`//等待${time}秒..`)
    setTimeout(() => {
      console.log(`Wake up after ${time}s`)
      callback()
    }, time * 1000)
  }
}

var test = [
  () => LazyMan("Hank"),
  () => LazyMan("Hank").sleep(10).eat("dinner"),
  () => LazyMan("Hank").eat("dinner").eat("supper"),
  () => LazyMan("Hank").sleepFirst(5).eat("supper")
]

// 浏览器执行 test[3]()
// 或
// 浏览器执行 LazyMan("Hank").sleepFirst(5).eat("supper")
let played = false
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    if (e.target.matches('button.q1') && !played) {
      console.info('只执行1次 第一题的 play')
      play()
      played = true
    }
    if (e.target.matches('button.q2')) {
      LazyMan("Hank").sleepFirst(5).eat("supper")
    }
  })
})