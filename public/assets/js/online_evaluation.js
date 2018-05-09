/**
 * Created by DXZ-Hui.Cao on 2017/10/20.
 */
//document.write('<script src="{{helper.cdnhost}}/assets/js/common_dev.js"><\/script>')
$(function(){



  var validate_leyu = {
    //phone
    phone: function(phone){
      if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)){
        return false;
      }
      return true;
    }
  };

  $("#name").on('blur',function(){
    // 姓名输入框 失去焦点事件
    if($(this).val()==''){

      $('#name-num').html("请输入您的称呼");
    }else{

      $('#name-num').html("");
    }
  });

  $("#phone-slide").on("blur",function(){
    //手机号失去焦点事件
    if($(this).val()==''){
      $('#phoneTip').html("请输入您的手机号码");
    }else{
      if(!validate_leyu.phone($(this).val())){
        $('#phoneTip').html("您输入的手机号码不正确");
      }else{
        $('#phoneTip').html("");
      }

    }
  });



  $("#evaluation-btn").on('click',function(){
    if($("#name").val()==''){
      //判断姓名
      $("#name-num").html('请填写您的称呼');
      return false;

    }else{

      $("#name-num").html('');
    };
    if(!validate_leyu.phone($.trim($("#phone-slide").val()))){
      //判断手机号
      $('#phoneTip').html("您输入的手机号不正确");
      return false;
    }else{
      $('#phoneTip').html('');
    };
    //意向国家
    if($("#department").val()==''){
      // 判断国家
      $("#department-num").html("留学意向国家");
      return false;
    }else{
      $("#department-num").html('');
    };
    //所属区域
    if($("#slide-area").val()==''){
      $("#city-num").html("选择所属区域");
      return false;
    }else{
      $("#city-num").html('');
    };

    //留学需求
    if($("#context").val()==''){
      $("#context-num").html("请填写留学需求");
      return false;
    }else{
      $("#context-num").html('');
    };

    $.ajax({
      url: ajaxUrlPrefix.nodeapi + '/cmsapi/assessment',
      type:'POST',
      dataType:'json',
      //jsonpCallback: 'callback',
      data:{
        name: $("#name").val(),
        phone: $("#phone-slide").val(),
        country: $('#department').val(),
        city: $('#slide-area').val(),
        need:$("#context").val()
      },
      success:function(msg){
        console.log(msg);
        if(msg.code === 0){
          alert('老师将为您做专业评估。');
        } else {
          alert(msg.message);

        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });

  });

  $("#reset-btn").on("click",function(){
    $("#name").val("");
    $('#name-num').html("");
    $("#phone-slide").val("");
    $('#phoneTip').html('');
    $("#context").val("")
  })

});
