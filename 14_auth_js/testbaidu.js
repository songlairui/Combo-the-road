obj = new ActiveXObject("InternetExplorer.Application");		//创建一个IE对象
obj.Visible=true 
obj.Navigate("https://passport.baidu.com/?login&tpl=mn");	//打开百度登录页面
while (obj.ReadyState != 4){;}	//等待网页加载完成
obj.document.getElementById("username").value = "ahk_test"	//输入用户名
obj.document.getElementById("normModPsp").value = "qwe123"	//输入密码
obj.document.all(137).click()	//点击登录按钮