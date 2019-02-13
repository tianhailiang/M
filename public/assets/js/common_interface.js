(function () {
    // top
	//getPageRefer();
	var top = true;
	var sUserAgent = navigator.userAgent.toLowerCase();
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) {
		!function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.growingio.com/2.1/gio.js","gio");
		gio('init', 'b5eff012adf61f54', {});
		//custom page code begin here
		//custom page code end here	
		gio('send');
	}
    $("#submitId").click(function () {
        var username = $.trim($("#username").val()); //decodeURI();
        var sex = "";
        var tel = $.trim($("#tel").val());
        var email = $.trim($("#email").val());
        var birthday = $.trim($("#birthday").val());
        if (!document.getElementById('city-bottom')) {
			var city = getCookie('currentarea');
		} else {
			var city = $.trim($("#city-bottom").val());
			if (isNull(city)) {
				alert("请选择您的所在城市，谢谢！");
				return false;
			}
		}
        var shenfen = "";
        var firstCountry = $.trim($("#firstCountry").val());
        var secondCountry = $.trim($("#secondCountry").val());
        var activityTitle = $.trim($("#activityTitle").val());
        var fromUrl = $.cookie('referweb');
		//var fromUrl = jesongGetDomain('https://www.baidu.com/?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E9%87%91%E5%90%89%E5%88%97%E7%95%99%E5%AD%A6&oq=%25E9%2587%2591%25E5%2590%2589%25E5%2588%2597%25E7%2595%2599%25E5%25AD%25A6&rsv_pq=e821f4c90001c3f4&rsv_t=ae1arYVFxmyRRO6JAm9KDc0sm1JNsDp2JX8A%2BahvqdS2l9FGCCPjgajI6vk&rqlang=cn&rsv_enter=1&rsv_sug3=6&rsv_sug1=5&rsv_sug7=100&rsv_sug2=1&prefixsug=%25E9%2587%2591%25E5%2590%2589%25E5%2588%2597%25E7%2595%2599%25E5%25AD%25A6&rsp=0&rsv_sug4=1403&rsv_sug=1');
		//var fromUrl = getPageRefer();
        var company = $.trim($("#company").val());

        var year = $.trim($("#year").val());
        var month = $.trim($("#month").val());
        var days = $.trim($("#days").val());
        var school = $.trim($("#school").val());
        var shenfen = String($.trim($("#specialty").val()));
		var relationId = $.trim($("#relationId").val()); // 获取页面种植的relationId
		var grUserId = getCookie('gr_user_id');
		//var fromUrl = getCookie('referweb'); // 获取来源url

        var sexs = document.getElementsByName("sex");
        for (var i = 0; i < sexs.length; i++) {
            if (sexs[i].checked) {
                sex = String([i].value);
                break;
            }
        }
        var shenfens = document.getElementsByName("shenfen");
        for (var i = 0; i < shenfens.length; i++) {
            if (shenfens[i].checked) {
                shenfen = String(shenfens[i].value);
                break;
            }
        }

        if (isNull(username)) {
            alert("请正确填写您的姓名，谢谢！");
            return false;
        }
        if (!checkInput(username)) {
            alert("姓名不能包含特殊字符，谢谢！");
            return false;
        }
        if (!isTel(tel)) {
            alert("请正确填写您的手机号，谢谢！");
            return false;
        }
        if (isNull(firstCountry)) {
            alert("请选择您感兴趣的国家，谢谢！");
            return false;
        }
		if (isNull(relationId)) {
			alert("请在页面添加relationId标签<input type='hidden' id='relationId' value='18'>value根据不同主题编写，谢谢");
			return false;
		} else {
			relationId = relationId.split('_');
			console.log('relationId', relationId)
		}
        var h = window.location.href;
        // var subData = { grUserId: grUserId,dataType: 7, name: username, sex: sex, phone: tel, email: email, birthday: birthday, city: city, shenfen: shenfen, country: firstCountry, secondCountry: secondCountry, company: company, fromUrl: fromUrl, activityTitle: activityTitle };
        if (/&bd_vid=/.test(fromUrl)) {
            var dataType = 7;
        } else {
            var dataType = 3;
        } 
        if (fromUrl == null || fromUrl == undefined) {
            fromUrl = window.location.href;
            if (fromUrl.match(/[~|《|<|>|'|!|@|#|$|%|^|*|(|)|-|+|:]/)) {
                alert('含有特殊字符')
                return false;
            } else {
                fromUrl = window.location.href + '&wwj=007';
            }
        }
        var subData = { grUserId: grUserId, dataType: dataType,relationId: relationId[0], name: username, phone: tel, city: city, country: firstCountry, source: fromUrl };
        // $.ajax({
        //     type:"get",
        //     data:subData,
        //     url:"http://old.jjl.cn/c/c.php",
        //     dataType:"jsonp",
        //     jsonp: "callbackparam",
        //     jsonpCallback:"jsonpCallback",
        //     success : function(backData){
        //         alert('咨询申请已成功提交，24小时之内留学顾问会与您取得联系！');
        //         $('#username').val('');
        //         $('#tel').val('');
        //         $('#firstCountry').val('');
        //         window._agl && window._agl.push(['track', ['success', {t: 3}]]);
        //     },
        //     error:function(){
        //         alert('咨询申请已成功提交，24小时之内留学顾问会与您取得联系！！');
        //         $('#username').val('');
        //         $('#tel').val('');
        //         $('#firstCountry').val('');
        //     }
        // });
        // gggg
		var dataBaidu = JSON.stringify({
            "token": "M58pIzx05CiFGoGssGKmFrMy5AleGUYh@ZpXrKDzPcF1WPtMsN139UhrcZCBldU5g",
            "conversionTypes": [
                {
                    'logidUrl': fromUrl,
                    'uid': '7229661',
                    'isConvert': '1',
                    'convertType': '3'
                }
            ]
        });
		if (top) {
			top = false;
			$.ajax({
            url: ajaxUrlPrefix.nodeapi + '/cmsapi/assessment',
            type: 'GET',
            dataType: 'json',
            data: subData,
            success: function (msg) {
                // alert('成功'+ msg.code)
                alert('老师将为您做出专业的评估');
				top = true;
                $('#username').val('');
                $('#tel').val('');
                // $('#firstCountry').val('');
                window._agl && window._agl.push(['track', ['success', { t: 3 }]]);
                window.history.back(-1);
            },
            error: function () {
                alert('老师将为您做出专业的评估');
				top = true;
                $('#username').val('');
                $('#tel').val('');
                // $('#firstCountry').val('');
                window.history.back(-1);
            }
			});
			$.ajax({
            url: 'https://fengchao.baidu.com/taurus/open/api/ADD/userconvertinfo',
            type: 'post',
            dataType: 'json',
            data: dataBaidu,
            contentType: 'application/json;charset=UTF-8',
            success: function (msg) {
                console.log('成功')
            },
            error: function () {
                console.log('失败')
            }
			});
		}
        return false;
    });

})();

(function () {
    // bottom
	//getPageRefer();
	var bottom = true;
    $("#submitId-bottom").click(function () {
        var username = $.trim($("#username-bottom").val()); //decodeURI();
        var sex = "";
        var tel = $.trim($("#tel-bottom").val());
        var email = $.trim($("#email-bottom").val());
        var birthday = $.trim($("#birthday-bottom").val());
		if (!document.getElementById('city-bottom')) {
			var city = getCookie('currentarea');
		} else {
			var city = $.trim($("#city-bottom").val());
			if (isNull(city)) {
				alert("请选择您的所在城市，谢谢！");
				return false;
			}
		}
        var shenfen = "";
        var firstCountry = $.trim($("#firstCountry-bottom").val());
        var secondCountry = $.trim($("#secondCountry-bottom").val());
        var activityTitle = $.trim($("#activityTitle-bottom").val());
        var fromUrl = $.cookie('referweb');
		//var fromUrl = jesongGetDomain(window.location.href)
        var company = $.trim($("#company-bottom").val());

        var year = $.trim($("#year-bottom").val());
        var month = $.trim($("#month-bottom").val());
        var days = $.trim($("#days-bottom").val());
        var school = $.trim($("#school-bottom").val());
        var shenfen = String($.trim($("#specialty-bottom").val()));
		var relationId = $.trim($("#relationId").val()); // 获取页面种植的relationId
		var grUserId = getCookie('gr_user_id'); // 获取growingioId
		//var fromUrl = getCookie('referweb'); // 获取来源url

        var sexs = document.getElementsByName("sex-bottom");
        for (var i = 0; i < sexs.length; i++) {
            if (sexs[i].checked) {
                sex = String([i].value);
                break;
            }
        }
        var shenfens = document.getElementsByName("shenfen-bottom");
        for (var i = 0; i < shenfens.length; i++) {
            if (shenfens[i].checked) {
                shenfen = String(shenfens[i].value);
                break;
            }
        }

        if (isNull(username)) {
            alert("请正确填写您的姓名，谢谢！");
            return false;
        }
        if (!checkInput(username)) {
            alert("姓名不能包含特殊字符，谢谢！");
            return false;
        }
        if (!isTel(tel)) {
            alert("请正确填写您的手机号，谢谢！");
            return false;
        }
        if (isNull(firstCountry)) {
            alert("请选择您感兴趣的国家，谢谢！");
            return false;
        }
		if (isNull(relationId)) {
			alert("请在页面添加relationId标签<input type='hidden' id='relationId' value='18'>value根据不同主题编写，谢谢")
			return false;
		} else {
			relationId = relationId.split('_');
			console.log('relationId', relationId)
		}
        if (/&bd_vid=/.test(fromUrl)) {
            var dataType = 7;
        } else {
            var dataType = 3;
        }
		if (fromUrl == null || fromUrl == undefined) {
            fromUrl = window.location.href;
            if (fromUrl.match(/[~|《|<|>|'|!|@|#|$|%|^|*|(|)|-|+|:]/)) {
                alert('含有特殊字符')
                return false;
            } else {
                fromUrl = window.location.href + '&wwj=007';
            }
        }
        var subData = { grUserId: grUserId, dataType: dataType,relationId: relationId[0], name: username, phone: tel, city: city, country: firstCountry, source: fromUrl };
        var dataBaidu = JSON.stringify({
            "token": "M58pIzx05CiFGoGssGKmFrMy5AleGUYh@ZpXrKDzPcF1WPtMsN139UhrcZCBldU5g",
            "conversionTypes": [
                {
                    'logidUrl': fromUrl,
                    'uid': '7229661',
                    'isConvert': '1',
                    'convertType': '3'
                }
            ]
        });
        // $.ajax({
        // 	type:"get",
        // 	data:subData,
        // 	url:"http://old.jjl.cn/c/c.php",
        // 	dataType:"jsonp",
        // 	jsonp: "callbackparam",
        // 	jsonpCallback:"jsonpCallback",
        // 	success : function(backData){
        // 		alert('咨询申请已成功提交，24小时之内留学顾问会与您取得联系！');
        // 		$('#username-bottom').val('');
        // 		$('#tel-bottom').val('');
        // 		$('#firstCountry-bottom').val('');
        // 		window._agl && window._agl.push(['track', ['success', {t: 3}]]);
        // 	},
        // 	error:function(){
        // 		alert('咨询申请已成功提交，24小时之内留学顾问会与您取得联系！！');
        // 		$('#username-bottom').val('');
        // 		$('#tel-bottom').val('');
        // 		$('#firstCountry-bottom').val('');
        // 	}
        // });
		if (bottom) {
			bottom = false;
			$.ajax({
            url: ajaxUrlPrefix.nodeapi + '/cmsapi/assessment',
            type: 'GET',
            dataType: 'json',
            data: subData,
            success: function (msg) {
                // alert('成功'+ msg.code)
                alert('老师将为您做出专业的评估');
				bottom = true;
                $('#username-bottom').val('');
                $('#tel-bottom').val('');
                // $('#firstCountry').val('');
                window._agl && window._agl.push(['track', ['success', { t: 3 }]]);
                window.history.back(-1);
            },
            error: function () {
                alert('老师将为您做出专业的评估');
				bottom = true;
                $('#username-bottom').val('');
                $('#tel-bottom').val('');
                // $('#firstCountry').val('');
                window.history.back(-1);
            }
			});
			$.ajax({
				url: 'https://fengchao.baidu.com/taurus/open/api/ADD/userconvertinfo',
				type: 'post',
				dataType: 'json',
				data: dataBaidu,
				contentType: 'application/json;charset=UTF-8',
				success: function (msg) {
					console.log('成功')
				},
				error: function () {
					console.log('失败')
				}
			});
		}
        
        return false;
    });

})();
  
function isNull(value) {
    if (value == null || value == '') {
        return true;
    } else {
        return false;
    }
}

function isTel(value) {
    var regStr = /^[\+]?((\d){0,3}[-])?(1[345789](\d){9})$/;
    return regStr.test(value);
}

// function isTel(value) {
// 	var regStr = /^[\+]?(\d){0,3}[ ]?[-]?(1[345789](\d){9})$/;;
// 	return regStr.test(value);
// }

function isEmail(value) {
    //  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})$/;
    //   /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var reg = /^([\w]+)([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(value);
}

function checkInput(value) {
    var reg = /^[A-Za-z0-9_\u4e00-\u9fa5]{1,20}$/;
    return reg.test(value);
}
//获取cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
	 var c = ca[i];
	 while (c.charAt(0)==' ') c = c.substring(1);
	 if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	//如果没有获取到城市cookie，默认取1，表示取北京
	if (cname == 'gr_user_id') {
		return null;
	} else if (cname == 'referweb') {
		return null;
	} else {
		return '1';
	}
}
// 写cookie
function setCook(name,value,t){
	if(typeof t =='undefined' ||t==null) t =60*30*24*60*60*1000;  
	var exp  = new Date(); exp.setTime(exp.getTime() + t);
	document.cookie = name + "="+ escape (value)+ ";expires=" + exp.toGMTString();
}
function jesongGetDomain (url){
	var domain = url.match(/(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i);
	if(domain.length>2){
		return domain[2];
	}else{
		return null;
	}
}
function getPageRefer(){
	if (getCookie('referweb') != null) {
		console.log(1111);
		return getCookie('referweb');
	} else {
		console.log(2222);
		if(document.referrer){
			try{
				var refer = document.referrer;
				console.log(3333);
				if(refer){
					var referDomain = jesongGetDomain(refer);
					var currDomain = window.location.host;
					if(referDomain && referDomain == currDomain){
						// 推广来源和页面同源
						refer = "";
					} else {
						// 推广来源首次进入页面写cookie
						if (refer == window.location.href) {
							// refer与url相同
                            setCook('referweb', refer, 1000*60*60);
                            return false;
						} else {
							// refer与url不同，以url为准
                            setCook('referweb', window.location.href, 1000*60*60);
                            return false;
						}
					}
				 } else {
                    console.log('推广来源refer异常,以url为准');
                    setCook('referweb', window.location.href, 1000*60*60);
                    return false;
                 }
				 //if(refer != ""){
					//return refer;
				 //}
			}catch(e){
				console.log('获取refer异常');
			};
		} else {
			console.log('不是推广过来的页面，网站调用')
			var urll = window.location.href;
			var main = urll.match(/(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i);
			console.log('main', main[7])
			//if (main[7] != 'undefined') {
				console.log('refer写入cookie成功')
                setCook('referweb', urll, 1000*60*60);
                return false;
			//} else {
            //    console.log('非法注入');
            //    return false;
			//}
		}
	}
}