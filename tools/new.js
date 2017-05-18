var foldername = process.argv[2]
if (!foldername) return console.info('non folderName')

var exec = require('child_process').exec
var fs = require('fs')
var dirpool
console.info('当前目录', process.cwd())
fs.readdir(process.cwd(), function (error, files) {
  if (error) {
    return console.error(error)
  }
  files = files.filter(filename => {
    return /\d+_\S+/.test(filename)
  })
    // .reduce((prev,curr) => {
    //   let fileindex = curr.split('_')[0]
    //   Object.assign(prev,{[fileindex]:curr})
    //   return prev
    // },{})
    .map(filename => {
      let fileindex = filename.split('_')[0]
      return {
        fileindex, filename
      }
    })
  let last = Math.max(...files.map(v => v.fileindex))
  dirpool = {
    files,
    last
  }
  // console.log(dirpool)
  let target_id = dirpool.last + 1
  let target_name = target_id + '_' + foldername
  console.info(target_name)
  copyDir('./0_template', './' + target_name)
})
// linux 平台
function copyDir(src, dist) {
  // console.info('linux平台适用，未做判断')
  var terminal = exec(`cp -r "${src}" "${dist}"`)
  terminal.stdout.on('data', function (data) {
    console.log('标准输出：' + data);
  });
  terminal.on('exit', function (code) {
    console.log('子进程已关闭，代码：' + code);
  });
}