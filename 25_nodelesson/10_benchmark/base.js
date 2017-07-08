const suite = new (require('benchmark').Suite)
console.info(suite)
suite.add('正则表达式测试',function(){
    /i/.test('songlairui')
  })
  .add('字符串',function(){
    'songlairui'.indexOf('i') > -1
  })
  .on('cycle',function(event){
    console.info(String(event.target))
  })
  .on('complete',function(){
    console.info('Fastest is '+ this.filter('fastest').map('name'))
  })
  .run({'async':true})


