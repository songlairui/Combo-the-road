var target = process.argv[2]
if (!target) return console.info('non target')
var conf = './gulpfile.js'

var exec = require('child_process').exec
var fs = require('fs')

// console.info('当前目录', process.cwd())
fs.readdir(process.cwd(), function (error, files) {
  if (error) {
    return console.error(error)
  }
  files = files.filter(filename => {
    return /\d+_\S+/.test(filename)
  })
    .reduce((prev, curr) => {
      let fileindex = curr.split('_')[0]
      Object.assign(prev, { [fileindex]: curr })
      return prev
    }, {})
  // console.log(files[target])
  reconf(conf,null,files[target])
})

function reconf(conf, variable, value) {
  fs.readFile(conf, 'utf8', function (err, data) {
    if (err) return console.log(err)
    var result = data.replace(/working_target\s=\s\'.*\'/, `working_target = '${value}'`)
    // console.log(result)
    fs.writeFile(conf, result, 'utf8', function(err){
      if(err) return console.log(err)
      console.info(`已切换到:`,value)
    })
  })
}