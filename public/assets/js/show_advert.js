/**
 * Created by DXZ-Libo.Sun on 2017/9/14.
 */
var IMG_URL = '';
var IMG_RQ_URL = ajaxUrlPrefix.nodeapi + "/cmsapi/advert";
$(function(){
    show_advert();
    window.setInterval(show_advert, 3000000);
});

var AD_PAGE_NAME = $("#pagekey").val();
var AD_CITY_ID = $("#page_cityid").val();
function show_advert() {
    //加载广告位图片
    $.getJSON(IMG_RQ_URL, {ad_page:AD_PAGE_NAME,cityid:AD_CITY_ID}, function (ret) {
        if(ret.code == 0){
            var val = ret.data;
            for(var i in val){
                var imageSetting = val[i].setting;
                var html = "";
                if(val[i].type == 'imagechange'){
                    var firstLi = '';
                    var lastLi = '';
                    for(var j in imageSetting) {
                        if(imageSetting[j].imageurl == undefined){continue;}
                        var liHtml = '<li>';
                        liHtml += '<a rel="nofollow" data-pid="'+imageSetting[j].pid+'" href="'+imageSetting[j].linkurl+'" target="_blank">';
                        liHtml += '<img src="'+IMG_URL+imageSetting[j].imageurl+'" alt="'+imageSetting[j].alt+'" style="width:'+ val[i].width +'px;height:'+ val[i].height +'px;display:block;overflow:hidden;"/>';
                        liHtml += '</a>';
                        liHtml += '</li>';

                        html += liHtml;
                        if(j == 0){
                            lastLi = liHtml;
                        }
                        if(j == imageSetting.length-1){
                            firstLi = liHtml;
                        }
                    }
                    html = firstLi+html+lastLi;
                }else{
                    for(var j in imageSetting){
                        if(imageSetting[j].imageurl == undefined){continue;}
                        html += '<a rel="nofollow" data-pid="'+imageSetting[j].pid+'" href="'+imageSetting[j].linkurl+'" target="_blank">';
                        if(AD_PAGE_NAME == 'PROFILE' && val[i].ad_seat == 'SEAT1'){
                            html += "<img src='"+IMG_URL+imageSetting[j].imageurl+"' alt='"+imageSetting[j].alt+"' style='display:block;overflow:hidden;'/>";
                        }else{
                            html += "<img src='"+IMG_URL+imageSetting[j].imageurl+"' alt='"+imageSetting[j].alt+"' style='width:"+ val[i].width +"px;height:"+ val[i].height +"px;display:block;overflow:hidden;'/>";
                        }

                        html += '</a>';
                    }
                }
                // console.log(html);
                $("#AD_"+AD_PAGE_NAME+"_"+val[i].ad_seat).html(html);
            }
        }
    });
    // /*点击广告位进行统计*/
    $("[id^='AD_']").click('a', function (e) {
        e.preventDefault();
        var pid = $(this).find('a').attr("data-pid");
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
        var url = $(this).find("a").attr('href');
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
}
