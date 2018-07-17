/**
 * Created by DXZ-Libo.Sun on 2017/9/14.
 */
  function show_guanggao(){
    var IMG_URL = '';
    var IMG_RQ_URL = ajaxUrlPrefix.nodeapi + "/cmsapi/advert";
    var AD_PAGE_NAME = $("#pagekey").val();
    var AD_CITY_ID = $("#page_cityid").val();
    show_advert();
    window.setInterval(show_advert, 3000000);
    function show_advert() {
        //加载广告位图片
        $.getJSON(IMG_RQ_URL, {ad_page:AD_PAGE_NAME,cityid:AD_CITY_ID}, function (ret) {
            if(ret.code == 0){
                var val = ret.data;
                for(var i in val){
                    var imageSetting = val[i].setting;
                    var html = "";
                    if(homeAdvert(AD_PAGE_NAME, val[i].ad_seat)){
                        // console.log(imageSetting);
                        for(var j in imageSetting){
                            if(imageSetting[j].imageurl == undefined){continue;}
                            html += '<a rel="nofollow" data-pid="'+imageSetting[j].pid+'" href="'+imageSetting[j].linkurl+'" target="_blank">';
                            html += "<img src='"+IMG_URL+imageSetting[j].imageurl+"' alt='"+imageSetting[j].alt+"' style='width:"+ val[i].width +"px;height:"+ val[i].height +"px;display:block;overflow:hidden;'/>";
                            html += '</a>';

                            if(j == 2){
                                break;
                            }
                        }
                    }else{
                        for(var j in imageSetting){
                            if(imageSetting[j].imageurl == undefined){continue;}
                            html += '<a rel="nofollow" data-pid="'+imageSetting[j].pid+'" href="'+imageSetting[j].linkurl+'" target="_blank">';
                            html += "<img src='"+IMG_URL+imageSetting[j].imageurl+"' alt='"+imageSetting[j].alt+"' style='width:"+ val[i].width +"px;height:"+ val[i].height +"px;display:block;overflow:hidden;'/>";
                            html += '</a>';
                        }
                    }
                    // console.log(html);
                    $("#XC_"+AD_PAGE_NAME+"_"+val[i].ad_seat).html(html);
                }
            }
        });
        // /*点击广告位进行统计*/
        $("[id^='XC_']").click('a', function (e) {
            e.preventDefault();
            var targetA = $(e.srcElement ? e.srcElement : e.target).parent('a');
            var pid = targetA.attr("data-pid");
            if(pid){
                $.ajax({
                    url: ajaxUrlPrefix.nodeapi + '/cmsapi/advert_clicknum',
                    type: 'GET',
                    data:{
                        pid: pid
                    },
                    datatype: 'json',
                    success: function (res) {
                        //console.log('统计成功！')
                    }
                })
            }
            var url = targetA.attr('href');
            if(url){
                window.open(url);
            }
        });
        $(".slider-img-ul li").click("a", function(e){
            var pid = $(this).find('a').attr("data-pid");
            if(pid){
                e.preventDefault();
                $.ajax({
                    url: ajaxUrlPrefix.nodeapi + '/cmsapi/advert_clicknum',
                    type: 'GET',
                    data:{
                        pid: pid
                    },
                    datatype: 'json',
                    success: function (res) {
                        //console.log('统计成功！')
                    }
                })
                var url = $(this).find("a").attr('href');
                if(url){
                    window.open(url);
                }
            }
        });
        $(".swiper-slide").click("a", function(e){
            var pid = $(this).find('a').attr("data-pid");
            if(pid){
                e.preventDefault();
                $.ajax({
                    url: ajaxUrlPrefix.nodeapi + '/cmsapi/advert_clicknum',
                    type: 'GET',
                    data:{
                        pid: pid
                    },
                    datatype: 'json',
                    success: function (res) {
                        // console.log('统计成功！')
                    }
                })
                var url = $(this).find("a").attr('href');
                if(url){
                    window.open(url);
                }
            }
        });
    }



    function homeAdvert(ad_page, ad_seat){
        if(ad_page == 'HOME' && ad_seat!=10){
            return true;
        }
        return false;
    }

}

