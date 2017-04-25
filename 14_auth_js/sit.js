
var loginedurl 
slimer.outputEncoding='System'

var sys = require("system"),
    page = require("webpage").create(),
    logResources = false

page.viewportSize = { width:1024, height:720 };

if (sys.args.length > 1 && sys.args[1] === "-v") {
    logResources = true;
}

function printArgs() {
    var i, ilen;
    for (i = 0, ilen = arguments.length; i < ilen; ++i) {
        console.log("    arguments[" + i + "] = " + JSON.stringify(arguments[i]));
    }
    console.log("");
}

page.onClosing = function() {
    console.log("page.onClosing");
    printArgs.apply(this, arguments);
};

// window.console.log(msg);
page.onConsoleMessage = function() {
    console.log("page.onConsoleMessage");
    printArgs.apply(this, arguments);
};

// window.alert(msg);
page.onAlert = function() {
    console.log("page.onAlert");
    printArgs.apply(this, arguments);
};


page
  .open('http://10.125.188.75:9080/ICFS/logon.html')
  .then(function(status){  				
  	if(status == 'success'){
  		console.log('connected')
  		page.evaluate(function(){
  			var inputs = document.querySelectorAll('.input_class')
  			var submit_btn = document.querySelector('.button_submit')
  			inputs[0].value='000055'
  			inputs[1].value='000000als6'
  			submit_btn.click()
  		})
  	} else {
  		console.log('unable to load')
  		slimer.exit()
  	}
  })

setTimeout(function() {
    console.log("");
    console.log("### STEP 2: get logined url");
    loginedurl = page.evaluate(function() {
        return window.location.href
    });
    console.log(loginedurl)
}, 2000);

setTimeout(function() {
    console.log("");
    console.log("### STEP 3: click Menu");
    page.evaluate(function() {
    	// 点击业务申请菜单
		document.querySelectorAll('.menu_bar')[0].querySelectorAll('ul')[2].querySelectorAll('.subMenuItem')[0].click()
    });
}, 4000);

setTimeout(function() {
    console.log("");
    console.log("### STEP 4: new Apply");
    page.evaluate(function() {
    	// 点击新增申请按钮
		document.querySelector('#frame1').contentWindow.document.querySelectorAll('iframe')[2].contentWindow.document.querySelectorAll('iframe')[2].contentWindow.document.querySelectorAll('.btn_box')[0].click()
    });
    console.log(loginedurl)
}, 6000);