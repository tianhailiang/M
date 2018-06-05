/**
 * Created by DXZ-Shuqin.Wang on 2017/9/21.
 */
;(function (global, document) {
    var fn = global.fn = {
        countryArr: {
            "0": ["全部", "all"],
            "1": ["美国", "usa"],
            "2": ["英国", "gbr"],
            "3": ["加拿大", "can"],
            "4": ["澳大利亚", "aus"],
            "5": ["新西兰", "nzl"],
            "50": ["韩国", "kor"],
            "51": ["日本", "jap"],
            "52": ["新加坡", "sin"],
            "53": ["马来西亚", "mas"],
            "54": ["中国香港", "hkg"],
            "100": ["俄罗斯", "rus"],
            "101": ["乌克兰", "ukr"],
            "102": ["白俄罗斯", "blr"],
            "103": ["德国", "ger"],
            "104": ["法国", "fra"],
            "105": ["挪威", "nor"],
            "106": ["瑞典", "swe"],
            "107": ["芬兰", "fin"],
            "108": ["爱尔兰", "irl"],
            "109": ["荷兰", "ned"],
            "110": ["丹麦", "den"],
            "111": ["意大利", "ita"],
            "112": ["西班牙", "esp"],
            "113": ["瑞士", "sui"],
            "7": ["希腊", "grc"], //移民新增（澳洲用网站的澳大利亚）
            "8": ["马耳他", "mal"],
            "10": ["葡萄牙", "pty"],
            "11": ["塞浦路斯", "cyp"],
            "12": ["安提瓜", "atg"],
            "13": ["多米尼克", "dmn"],
            "14": ["圣基茨", "kit"],
            "15": ["格林纳达", "grd"]
        },
        cityArr: {
            "1": ["北京", "bj"],
            "5": ["成都", "cd"],
            "7": ["重庆", "cq"],
            "19": ["长沙", "cs"],
            "25": ["长春", "cc"],
            "41": ["常州", "cz"],
            "13": ["大连", "dl"],
            "43": ["东莞", "dg"],
            "37": ["佛山", "fs"],
            "39": ["福州", "fz"],
            "3": ["广州", "gz"],
            "35": ["贵阳", "gy"],
            "6": ["杭州", "hz"],
            "22": ["合肥", "hf"],
            "24": ["哈尔滨", "heb"],
            "26": ["呼市", "hs"],
            "32": ["邯郸", "hd"],
            "46": ["海南", "hn"],
            "9": ["济南", "jn"],
            "30": ["吉林", "jl"],
            "21": ["昆明", "km"],
            "27": ["兰州", "lz"],
            "48": ["洛阳", "ly"],
            "16": ["南京", "nj"],
            "29": ["南昌", "nc"],
            "34": ["宁波", "nb"],
            "38": ["南宁", "nn"],
            "10": ["青岛", "qd"],
            "2": ["上海", "sh"],
            "8": ["沈阳", "sy"],
            "12": ["石家庄", "sjz"],
            "20": ["深圳", "shz"],
            "23": ["苏州", "sz"],
            "4": ["天津", "tj"],
            "17": ["太原", "ty"],
            "18": ["唐山", "ts"],
            "14": ["武汉", "wh"],
            "50": ["武昌", "wc"],
            "33": ["无锡", "wx"],
            "42": ["温州", "wz"],
            "15": ["西安", "xa"],
            "28": ["厦门", "xm"],
            "36": ["徐州", "xz"],
            "45": ["西宁", "xn"],
            "47": ["新疆", "xj"],
            "31": ["烟台", "yt"],
            "40": ["银川", "yc"],
            "44": ["宜昌", "ych"],
            "11": ["郑州", "zz"]
        },
        /*
         * 生成符合静态规范的跳转链接
         * */
        active_urlgen:function (){
        var url = '',chan = '',param = '',nation = '',city = '',nationid='',cityid='';
        if(arguments.length == 0){
            return ;
        }
        //get chan & subchan
        for(var i= 0 ; i < arguments.length;i++){
            if(arguments[i] == '' || arguments[i].split('=').length > 1)
            {
                break;
            }
            else
            {
                chan += '/' + arguments[i];
            }
        }
        // i is hold
        for(i; i < arguments.length;i++){
            if (cityid = seo_to_url(arguments[i], 'c')) {
                city = this.getCityEn(cityid);
            }
            if(!cityid && arguments[i] != ''){
                /*过滤默认参数 start*/
                var can_type = arguments[i].split('=')[0];
                var can_val = arguments[i].split('=')[1];
                if (((can_type == 'order') && (can_val == 1 || can_val == 'inputtime' || can_val == 'add_time' ||  can_val == 'inputtime desc' ||  can_val == 'add_time desc')) || ((can_type == 'page') && (can_val == 1)) || ((can_type == 'crowd') && (can_val == 0))  || ((can_type == 'time') && (can_val == 0)) || ((can_type == 'e') && (can_val == 0)) || ((can_type == 'serve') && (can_val == 0)) || ((can_type == 't') && (can_val == 0)) || ((can_type == 'n') && (can_val == 0))  || ((can_type == 'type') && (can_val == "全部")) || ((can_type == 'tag') && (can_val == "全部")) || ((can_type == 'tag') && (can_val == ""))|| ((can_type == 'type') && (can_val == ""))) {
                    continue;
                }
                /*过滤默认参数 end*/
                if (param == '') {
                    param += '/' + arguments[i].replace(/=/g, "-");
                }
                else {
                    param += '__' + arguments[i].replace(/=/g, "-");
                }
            }
        }
        url += ((city && city != 0)?"/"+city:"") + chan + param;

        if (js_api_config.version == 'development') { //如果是開發環境
            url = js_api_config.wwhost + ':7000' + url;//web
        }
        return url;
    },
        urlgen: function () {
            var isyimin = false;
            var url = '',chan = '',param = '',nation = '',city = '',nationid='',cityid='';
            if(arguments.length == 0){
                return ;
            }
            //get chan & subchan
            for(var i= 0 ; i < arguments.length;i++){
                if(i == 0 && arguments[i] == 'yimin'){
                    isyimin = true;
                    continue;
                }
                if(arguments[i].split('=').length > 1)
                {
                    if (nationid = seo_to_url(arguments[i], 'n')) {
                        nation = this.getCountryEn(nationid);
                    }
                    if (cityid = seo_to_url(arguments[i], 'c')) {
                        city = this.getCityEn(cityid);
                    }
                    if(!nationid && !cityid){
                        chan += '/' + arguments[i].replace(/=/g, "-");
                    }
                    break;
                }
                else
                {
                    chan += '/' + arguments[i];
                }
            }
            // i is hold
            for(i+=1; i < arguments.length;i++){
                if (nationid = seo_to_url(arguments[i], 'n')) {
                    nation = this.getCountryEn(nationid);
                }
                if (cityid = seo_to_url(arguments[i], 'c')) {
                    city = this.getCityEn(cityid);
                }
                if(!nationid && !cityid){
                    param += '__' + arguments[i].replace(/=/g, "-");
                }
            }

            if (chan.match(/^(.*)schoollib(.*)$/)) {
                url += ((nation && nation != 'all')?"/"+nation:"/") + chan.replace(/\//,"") + param + ".html";
            }
            else if (chan == '/nationrank') {
                url += ((nation && nation != 'all')?"/"+nation:"");
            }
            else {
                url += ((city && city != 0)?"/"+city:"") + ((nation && nation != 'all')?"/"+nation:"") + chan + param + ".html";
            }

            if(url == "/.html"){
                url = "/";
            }

            if(!exits_static_page(chan + param + ".html")){
                url = url.replace(/\.html/g, "");
            }else{
                if(chan=='/branch_home'){
                    url = url.replace(/branch_home.html/g, "");
                }
            }

            if (!isyimin && js_api_config.version == 'development') { //如果是開發環境
                url = js_api_config.wwhost + ':7000' + url;//web
            }
            return url;
        },
        /*生成栏目页不需要静态化的跳转链接*/
        no_urlgen: function () {
            var url = '',chan = '',param = '',nation = '',city = '',nationid='',cityid='';
            if(arguments.length == 0){
                return ;
            }
            //get chan & subchan
            for(var i= 0 ; i < arguments.length;i++){
                if(arguments[i].split('=').length > 1)
                {
                    break;
                }
                else
                {
                    chan += '/' + arguments[i];
                }
            }

            // i is hold
            for(i; i < arguments.length;i++){
                if (nationid = seo_to_url(arguments[i], 'n')) {
                    nation = this.getCountryEn(nationid);
                }
                if (cityid = seo_to_url(arguments[i], 'c')) {
                    city = this.getCityEn(cityid);
                }
                if(!nationid && !cityid){
                    /*过滤默认参数 start*/
                    var can_type = arguments[i].split('=')[0];
                    var can_val = arguments[i].split('=')[1];
                    if (((can_type == 'order') && (can_val == 1 || can_val == 'inputtime' || can_val == 'add_time' ||  can_val == 'inputtime desc' ||  can_val == 'add_time desc')) || ((can_type == 'page') && (can_val == 1)) || ((can_type == 'crowd') && (can_val == 0))  || ((can_type == 'time') && (can_val == 0)) || ((can_type == 'e') && (can_val == 0)) || ((can_type == 'serve') && (can_val == 0)) || ((can_type == 't') && (can_val == 1)) ) {
                        continue;
                    }
                    /*过滤默认参数 end*/
                    if (param == '') {
                        param += '/' + arguments[i].replace(/=/g, "-");
                    }
                    else {
                        param += '__' + arguments[i].replace(/=/g, "-");
                    }

                }
            }
            url += (city?"/"+city:"") + ((nation && nation != 'all')?"/"+nation:"") + chan + param;
            if (js_api_config.version == 'development') { //??????_?l?h??
                url = js_api_config.wwhost + ':7000' + url;
            }
            return url;
        },
        schoolrankUrlgen: function () {
            var url = '',chan = '',param = '',nation = '',city = '',detail='',nationid='',cityid='',detailid='';
            if(arguments.length == 0){
                return ;
            }
            //get chan & subchan
            for(var i= 0 ; i < arguments.length;i++){
                if(arguments[i] == '' || arguments[i].split('=').length > 1)
                {
                    break;
                }
                else
                {
                    chan += '/' + arguments[i];
                }
            }
            // i is hold
            for(i; i < arguments.length;i++){
                if (nationid = seo_to_url(arguments[i], 'n')) {
                    nation = this.getCountryEn(nationid);
                }
                if (detailid = seo_to_url(arguments[i], 'id')) {
                    detail = detailid;
                }
                if(!nationid && !detailid && arguments[i] != ''){
                    /*过滤默认参数 start*/
                    var can_type = arguments[i].split('=')[0];
                    var can_val = arguments[i].split('=')[1];
                    if (((can_type == 'order') && (can_val == 1 || can_val == 'inputtime' || can_val == 'add_time' ||  can_val == 'inputtime desc' ||  can_val == 'add_time desc')) || ((can_type == 'page') && (can_val == 1)) || ((can_type == 'crowd') && (can_val == 0))  || ((can_type == 'time') && (can_val == 0)) || ((can_type == 'e') && (can_val == 0)) || ((can_type == 'serve') && (can_val == 0)) || ((can_type == 't') && (can_val == 1)) ) {
                        continue;
                    }
                    /*过滤默认参数 end*/
                    if (param == '') {
                        param += '/' + arguments[i].replace(/=/g, "-");
                    }
                    else {
                        param += '__' + arguments[i].replace(/=/g, "-");
                    }
                }
            }
            url += chan + ((nation && nation != 'all')?nation:"") + param;
            if(detail){
                url += '/'+detail + ".html";
            }
            //liuxue
            if (js_api_config.version == 'development') { //如果是開發環境
                if( (chan.indexOf('/p/') != -1 || chan.indexOf('/p1/') != -1 || chan.indexOf('/article/') != -1 || chan.indexOf('/case/') != -1 || chan.indexOf('center') != -1 || chan.match(/^\/p$/)) && chan.indexOf('/yimin/')==-1) {
                    url = js_api_config.wwhost + ':4000' + url;//social
                }
                else {
                    url = js_api_config.wwhost + ':7000' + url;//web
                }
            }

            return url;
        },
        /*
         * param：国家id，
         * return：国家中文
         */
        getCountryChinese: function (id) {
            var obj = normalize(this.countryArr[id],this.countryArr[0]);
            return obj[0];
        },
        /*
         * param：国家id，
         * return：国家英文缩写
         */
        getCountryEn: function (id) {
            var obj = normalize(this.countryArr[id],this.countryArr[0]);
            return obj[1];
        },
        /*
         * param：cityid，
         * return：city中文
         */
        getCityChinese:function (id){
            var obj = normalize(this.cityArr[id],this.cityArr[1]);
            return obj[0];
        },
        /*
         * param：cityid，
         * return：city缩写
         */
        getCityEn: function (id) {
            var obj = normalize(this.cityArr[id],this.cityArr[0]);
            return obj[1];
        },
        /**
         * 用户头像url组装
         * @param uid      用户ID
         * @param size     头像规格（small, middle, big, max） ：max暂未更新，属于顾问专有规格
         * @param status   用户状态，
         * @returns {string}
         */
        avaterimg: function (uid, size, status,version,usertype){
            uid = prefixInteger(uid, 9);
            var dir1 = uid.substr(0, 3);
            var dir2 = uid.substr(3, 2);
            var dir3 = uid.substr(5, 2);
            if(status == 1 || version == 0 || version == null){
                if (usertype == 1) {
                    return 'http://images.jjl.cn/avatar/default_avatar_small.jpg'
                }
                else {
                    return 'http://images.jjl.cn/avatar/default_jjl.png'
                }
            }else{
                if (version == 1) {
                    return ajaxUrlPrefix.imageshost + '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substr(-2)+"_avatar_"+size+".jpg";
                }
                else {
                    return ajaxUrlPrefix.imageshost + '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substr(-2)+"_avatar_"+size+"_"+ version +".jpg";
                }
            }
        },
        //根据id获取学历名
        getEdu: function (id) {
            var education = {
                "0": "全部",
                "1": "本科",
                "2": "研究生",
                "19": "中小学"
            };
            return education[id];
        },
        //获取理想的时间格式
        getFormatDate: function (timestamp,p) {
            timestamp = parseInt(timestamp + '000');
            var newDate = new Date(timestamp);
            Date.prototype.format = function (format) {
                var date = {
                    'M+': this.getMonth() + 1,
                    'd+': this.getDate(),
                    'h+': this.getHours(),
                    'm+': this.getMinutes(),
                    's+': this.getSeconds(),
                    'q+': Math.floor((this.getMonth() + 3) / 3),
                    'S+': this.getMilliseconds()
                };
                if (/(y+)/i.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                    if (new RegExp('(' + k + ')').test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
                    }
                }
                return format;
            }
            // return newDate.format('yyyy-MM-dd h:m');
            if(p==1){
                return newDate.format('yyyy');
            }else if(p==2){
                return newDate.format('MM');
            }else if(p==3){
                return newDate.format('dd');
            }else if(p==4){
                return newDate.format('yyyy-MM');
            }else if(p==6){
                return newDate.format('yyyy.MM.dd');
            }
        },
        //截取字符
        getTimeYMD: function (str, count) {
            if (str) {
                return str.slice(0, count || 5).replace(/\-/g, '.');
            }
        },
        //截取时间
        getTimeYM: function (str) {
            if (str) {
                var year = str.slice(0, 4);
                var month = str.slice(5, 7)*1;
                return year + '年' + month + '月';
            }
        },
        //成功案例院校logo
        getSchool_logo: function (school_id) {
            if (school_id == null || school_id == 0 || school_id == undefined || school_id == 'undefined') {
                return ajaxUrlPrefix.cdnhost + '/assets/img/default_school_logo.jpg';
            }
            else {
                return ajaxUrlPrefix.imageshost + '/content/school/logo_' + school_id + '.jpg';
            }
        },
        sliceShorten: function(str,start, count) {
            if (str) {
                return str.slice(start, count);
            }
        }
};
    //===========================fn用到的基础函数=========================
    /**
     * 转换url中国家及城市字段
     * @param arguments
     */
    function seo_to_url(arguments, agtype) {
        var data = "";
        if(arguments.indexOf("=") >= 0 ){
            //判断是否存在n=?国家数据
            if(agtype == "c"){
                var regData = arguments.match(/c=(\w+)/g);
            }else if(agtype == "n"){
                var regData = arguments.match(/n=(\w+)/g);
            }else if(agtype == "id") {
                var regData = arguments.match(/id=(\w+)/g);
            }
            if(regData){
                var n = regData[0].split("=");
                data = n[1];
                return data;
            }else{
                return "";
            }
        }else{
            return "";
        }
    };
    /**
     * 区分静态和伪静态， 伪静态中n变量需要存在不能去掉
     */
    function exits_static_page(path) {
        var reg_list = path.match(/^(.*)\/(glue|news|citynews|focus|visa|prereq|cost|nation|schoolranknews|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|cases|schoollib|yimin|product|special|so_activity|so_case|so_news|so_school|so_advisor|so_articles)(.*).html$/g);
        var reg_detail = path.match(/^(.*)\/(glue|news|citynews|focus|visa|prereq|cost|nation|schoolranknews|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|cases|schoollib|yimin|product|special)\/(\d+).html$/g);

        var rank = path.match(/^(.*)\/(nationrank|schoolrank|specialrank|productrank).html$/g);

        //社区页面
        //var so_reg = path.match(/^\/(p|p1|case|article)\/(\d+).html$/g);
        var so_reg = path.match(/^\/(p|p1)\/(\d+).html$/g);
        var so_center = path.match(/^\/(advisor_center|canzan_center|user_center|login|register|forget|community_index)(.*).html$/g);//advisor_center
        //移民好文精选
        var yimin_reg = path.match(/^\/(news|case)\/order-hits.html$/g);
        var yimin_list_reg = path.match(/^\/(news|interpret|activity|case).html$/g);

        if(((reg_list && !reg_detail) || so_reg || so_center || yimin_reg || yimin_list_reg) && !rank){
            return false;
        }
        return true;
    };
    function normalize(value, defaultValue) {
        if(value === null || value === undefined || value === false) {
            return defaultValue;
        }
        return value;
    }
    /*
     *  生成头像的uid
     * */
    function prefixInteger (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
})(this, document);




