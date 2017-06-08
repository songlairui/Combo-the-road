function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}


function play() {
  return new Promise((resolve, reject) => {
    red()
    setTimeout(resolve, 3000)
  }).then(() => new Promise((resolve, reject) => {
    green()
    setTimeout(resolve, 1000)
  })).then(() => new Promise((resolve, reject) => {
    yellow()
    setTimeout(resolve, 2000)
  })).then(play)

}

play()