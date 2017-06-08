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

test[3]()