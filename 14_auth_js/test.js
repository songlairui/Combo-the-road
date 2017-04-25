var page=require('webpage').create();
page.viewportSize={width:1366,height:768};
var url='http://10.125.188.75:9080/ICFS/logon.html'

page.open(url, function () {
  ret = page.evaluate(function() {
    var inputs = document.getElementsByClassName('input_class')
    var submit = document.getElementsByClassName('button_submit')[0]
    inputs[0].value='000055'
    inputs[1].value='000000als6'
    submit.click()
  })
  
  setTimeout('print_cookies()',2000)
})

function print_cookies(){
  console.info(JSON.stringify(page.cookies,undefined,4))
  //page.render('result.png');
  phantom.exit()
}