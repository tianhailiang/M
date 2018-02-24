/**
 * Created by DXZ-Shuqin.Wang on 2018/2/6.
 */
$(function(){
    var $content = $('#search-content');
    var so_type = 'news';
    $("#so-box").height($(window).height()-81);
    /*tab 切换*/
    $('#so-tab').on('click', 'span', function () {
        var index = $(this).index();
        $('#so-box').find('.so-tab-item').removeClass('active').eq(index).addClass('active');
        $('#so-box').find('.so-box-content .so-box-item').removeClass('active').eq(index).addClass('active');
        if (index == 0) {
            so_type = 'news';
        }
        else if (index == 1) {
            so_type = 'adviser'
        }
    })
    /*取消*/
    $('#cancel-btn').on('click',function () {
        $content.val('');
    })
    /*热门签儿*/
    $('#so-box-content').on('click', 'span', function () {
        var so_keyword = $(this).text();
        console.log(fn.no_urlgen('so_'+so_type, 'q=' + so_keyword));
        window.location.href = fn.no_urlgen('so_'+so_type, 'q=' + so_keyword);
    })
    /*搜索按钮*/
    $('#search-btn').on('click', function () {
        var so_keyword = $('#search-content').val();
        if (so_keyword == '') {
            $content.focus();
        }
        else {
            console.log(fn.no_urlgen('so_'+so_type, 'q=' + so_keyword));
            window.location.href = fn.no_urlgen('so_'+so_type, 'q=' + so_keyword);
        }
    })
});