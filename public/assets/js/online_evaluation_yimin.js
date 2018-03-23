/**
 * Created by DXZ-Shuqin.Wang on 2018/3/23.
 */
var check_value = {
    phone: function(phone){
        if(!/^1(3|4|5|7|8)\d{9}$/.test(phone)){
            return false;
        }
        return true;
    }
};
$('#name').on('blur', function () {
    checkName();
});
$('#name').on('keyup', function () {
    checkName();
});
$('#phone').on('blur', function () {
    checkPhone();
});
$('#phone').on('keyup', function () {
    checkPhone();
});
$('#code').on('blur', function () {
    checkCodeValue();
});
$('#code').on('keyup', function () {
    checkCodeValue();
});
function checkName () {
    var name = $.trim($('#name').val());
    if (name == '') {
        $('#name').focus().addClass('err');
        return false;
    }
    else {
        $('#name').removeClass('err');
        return true;
    }
}
function checkPhone () {
    var phoneNum = $.trim($('#phone').val());
    if (!check_value.phone(phoneNum)) {
        $('#phone').focus().addClass('err');
        return false;
    }
    else {
        $('#phone').removeClass('err');
        return true;
    }
}
function checkCodeValue () {
    var codeVal = $('#code').val();
    if (codeVal == '' || codeVal.length < 6) {
        $('#code').focus().addClass('err');
        return false;
    }
    else {
        $('#code').removeClass('err');
        return true;
    }
}
var timer;
function countDown() {
    // 60s倒计时
    $("#getcode").unbind("click");
    var countDownTime = 3;
    timer = window.setInterval(function () {
        countDownTime--;
        $("#getcode").html('（'+countDownTime+'）s');
        if (countDownTime == 0) {
            clearInterval(timer);
            $("#getcode").html('重新获取');
            $("#getcode").bind("click",function () {
                getCode();
            });
        }
    }, 1000);
}
//获取验证码
function getCode () {
    if (!checkPhone()) {
        return;
    }
    else {
        countDown();
    }
    $.ajax({
        url: ajaxUrlPrefix.nodeapi+'/ucapi/ucapi_agent',
        type:'get',
        data:{
            m: 'sendcode',
            phone:$("#phone").val()
        },
        dataType:'json',
        success:function(msg){
            if(msg.code === 0){
                //alert('成功');
            } else {
                alert('出错啦');
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
        }
    });
}
var customize = function (name, phone, country, project) {
    //发送定制
    $.ajax({
        url: ajaxUrlPrefix.nodeapi + '/cmsapi/immi_case_plan', //移民方案定制
        type:'POST',
        data:{
            user_name: name,
            phone: phone,
            country: country,
            project: project
        },
        dataType:'json',
        success:function(msg){
            console.log(msg);
            if(msg.code === 0){
                alert('老师将为您做专业评估。');

            } else {
                alert(msg.message);

            };
            clearInterval(timer);
            $("#code").html('获取验证码');
            $("#code").bind("click",function () {
                getCode();
            });

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status);
            console.log(textStatus);
            console.log(errorThrown)
        }
    });
};
var checkCode = function (name,phone,code,country,project) {
    $.ajax({
        url: ajaxUrlPrefix.nodeapi+'/ucapi/ucapi_agent',
        type:'get',
        data:{
            m: 'check_code',
            code: code,
            phone: phone
        },
        dataType:'json',
        success:function(msg){
            console.log(msg);
            if(msg.code === 0){
                customize(name, phone, country, project);
            } else {
                alert(msg.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
        }
    });
};
//获取验证码
$("#getcode").click(function(){
    getCode();
});
//提交表单
$('#evaluationBtn').on('click',function () {
    checkName();
    checkPhone();
    checkCodeValue();
    var name = $('#name').val();
    var phone = $('#phone').val();
    var code = $('#code').val();
    var project = $("#project").val();
    var country = $("#country").val();
    checkCode( name, phone,code, country, project);
});