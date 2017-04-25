var webpage = require('webpage').create();
webpage.viewportSize = { width:1024, height:720 };

webpage
  .open('http://10.125.188.75:9080/ICFS/logon.html') // loads a page
  .then(function(){ // executed after loading
    // store a screenshot of the page
    webpage.render('page.png',
                   {onlyViewport:true});
    
  })
  .then(function(){
    // click somewhere on the second page
    var mainTitle = page.evaluate(function () {
        console.log('message from the web page');
        return document.querySelector("h1").textContent;
    });
    console.log('First title of the page is ' + mainTitle);
    slimer.exit()
  });