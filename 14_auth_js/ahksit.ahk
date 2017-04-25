objIE := ComObjCreate("InternetExplorer.Application") ; 创建 IE 对象
objIE.Visible := true 
objIE.Navigate("http://10.125.188.75:9080/ICFS/logon.html") 
while, objIE.ReadyState <> 4 
{}

objIE.document.getElementsByClassName("input_class")[0].value := "000055" 
objIE.document.getElementsByClassName("input_class")[1].value := "000000als6"