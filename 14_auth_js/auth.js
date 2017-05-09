
var page = require('webpage').create(),
    server = 'http://www.baidu.com',
    pageurl,
    authedurl = 'http://172.16.255.3/smp/commonauth'

var accraw0 = `SY01887 NRtve6ej
SY01841 LrBCebWf
SY01636 dk4U6aer
SY01555 DVnkNeNG
SY01486 QHkMevtW
SY01424 v6BEpaqc
SY00681 7LNN6YDr
SY00066 LHfXCanN
SY01483 uJnCkRLd
SY00766 8qpLTfhf
SY00156 7tqRCPX4
SY00074 xE6S5reG
SY01962 T6Cvwhfv
SY01861 jCeqHxdX
SY01757 s3jxEJKV
SY01633 TavECQU3
SY01561 FDFdXNF7
SY01472 hEA7HHGY
SY01204 XDwgUCKR
SY00936 PAPrvXSa
SY00833 AVhDjW3d
SY00603 ngJd3bG3
SY00483 yLEwRHXS
SY00325 gKcSNYnH
SY00084 sk2AmWEP`
var accraw = `SY01498 VTqbsCTy
SY01992 CDXKkqLp
SY01971 QDA3J43S
SY01942 Ghb6FQet
SY01922 YfpH78xK
SY01884 XWsyRJjT
SY01845 Ma2bVpUN
SY01842 5sUfdArF
SY01798 qfAWKQnA
SY01797 C4xjyP4k
SY01772 UqV2kFL4
SY01770 SsrSVmW6
SY01668 B4cTghKp
SY01654 beTAdE3P
SY01615 sUXA3sNn
SY01597 pBj2vSXL
SY01588 dPvjQdL3
SY01484 RQsfS4nG
SY01460 JaSHgYGf
SY01388 U4b8wSn2
SY01375 UHvQeRhx
SY01362 V6Qh2NXQ
SY01303 avJppPpq
SY01271 tfwgEU6x
SY01209 MWvFbqKc
SY01165 HhLpAhQW
SY01164 Tyyn2nWE
SY01155 2ua5eHgg
SY01148 3DhCCAYE
SY01133 wYWhaDuP
SY01118 nBYNCPWA
SY01110 WvAnr5te
SY01100 VgbUPSrP
SY01046 x5pSJTGW
SY00981 nqVuYcdv
SY00944 Pujne4UC
SY00929 qCWtpvAt
SY00926 7mXCm6kG
SY00851 6YWU2tQv
SY00847 DA5MjHq6
SY00807 DfURBnWB
SY00793 gb3Efsvt
SY00765 j377Pddu
SY00764 BGLTujUt
SY00747 K6A6Ljcg
SY00745 xycAELJd
SY00741 t4CLp8en
SY00723 SFXsVymV
SY00717 ausgEt6W
SY00707 P6QfWRxC
SY00610 FtbwK25W
SY00603 ngJd3bG3
SY00586 uaj2bGYF
SY00585 CeG287DB
SY00470 EsBfTUFJ
SY00431 JKPQQdcb
SY00420 EWmFfUuV
SY00306 WHU36jUP
SY00201 K7d4TRnD
SY00072 6PAFpc5M
SY00035 S7XqTWwV`

var accpool = accraw.split('\n').map(v=>v.split(' '))
// console.log(accpool)

page.viewportSize = { width:1024, height:720 };
// =====================================

function urldomain(str){
	return str.split('//').pop().split('/')[0]
}

// =====================================

var step2 = function (i){
    i = i || 0

    page.open(server, function (status) {
    	if (status === 'success') {
    		console.info('opened')
    	} else {
            console.log('unable to load')
    		phantom.exit()
    	}   // phantom.exit();
    });

    setTimeout(function() {
        console.log("");
        console.log("### STEP 1: page is login page?");
        pageurl = page.evaluate(function() {
            return window.location.href
        });
        console.log(urldomain(pageurl))
        if('www.baidu.com' === urldomain(pageurl)){
        	console.log('network authed')
        	phantom.exit()
        }
    }, 600);



    setTimeout(function() {
        console.log("");
        console.log("### STEP 2 i: fill the form");
        console.info(accpool[i][0],accpool[i][1])
        page.evaluate(function(usr,pwd) {
        	$('userId').value=usr
        	$('password').value=pwd
        	login()
        },accpool[i][0],accpool[i][1]);
    }, 1000);

    setTimeout(function() {
        console.log("");
        console.log("### STEP 3 i: check the result");
        var result = page.evaluate(function() {
            var a = document.querySelector('div[class^="failure_icon"]')
            var b = document.querySelector('div[class^="success_icon"]')
            var result = a ? 'failure' : b? 'success' : 'Exception'
            return result
        });
        console.log(result)
        if(result === 'success'){
          return
        } else if(result === 'failure'){
            step2(i + 1)
        } else {
            console.log(result)
            return
            // phantom.exit()
        }
    }, 1200);

}

step2()
