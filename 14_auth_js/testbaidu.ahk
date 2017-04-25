pwb := ComObjCreate("InternetExplorer.Application")
pwb.Visible := 1
pwb.Navigate("https://passport.baidu.com/?login&tpl=mn")
Sleep,10
pwb.document.getElementById("username").value := "ahk_test"
pwb.document.getElementById("normModPsp").value := "qwe123"
pwb.document.all(137).click()