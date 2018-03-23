
var cms = require('../model/cms');
var async = require('async');
var log4js = require('../log/log');
var log = log4js.getLogger();
var esihelper = require('../middleware/esihelper');
var config = require('../config/config');
var comfunc = require('../common/common');
var helperfunc = require('../common/helper');
function returnData(obj,urlName){
  if(obj.code==0){
    return obj.data;
  }else{
    log.error(urlName,obj);
    return {};
  }
}

exports.home = function(req,res,next){
  log.debug("首页")
  var data = {};
  log.info(req.params);
  var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
  if (req.params[0]) {
    var cityId = comfunc.getCityId(req.params[0]);
    if(!comfunc.cityid_invalidcheck(cityId)){
        next();
        return false;
    }
    area = cityId;
    res.cookie("currentarea", cityId,{expires: new Date(Date.now() + 90000000000)});
    res.cookie("currentareast",comfunc.getCityEn(cityId),{expires: new Date(Date.now() + 90000000000)});
  }
  if(req.params[2]){
    [data.country=1] = [comfunc.getCountryIdParams(req.params[2].replace('/', ''))];
  }else{
    data.country=1;
  }
  // log.info('country  ',data.country)
  async.parallel({
    lunbo_list: function (callback) {
      // 轮播图接口
      cms.lunbo_list({
        "ad_page":"MOBILE_HOME",
        "ad_seat":"SEAT1",
        "cityid":area
      },callback);
    },
    shouye:function(callback) {
        cms.mShouye({
            "city_id": area,
            "country_id":data.country
        }, callback);
    },
  }, function (err, result) {
    data.lunbo_list =returnData(result.lunbo_list,'lunbo_list');
    data.shouye = JSON.parse(result.shouye);
    log.info(data.shouye)
    data.tdk = {
      pagekey: 'HOME',
      cityid: area,
    };
    res.render('index', data);
  });
}

exports.yimin_home =function(req,res,next){
    log.debug('移民首页')
    var data = {};
    log.info(req.params);
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    if (req.params[0]) {
        var cityId = comfunc.getCityId(req.params[0]);
        if(!comfunc.cityid_invalidcheck(cityId)){
            next();
            return false;
        }
        area = cityId;
        res.cookie("currentarea", cityId,{expires: new Date(Date.now() + 90000000000)});
        res.cookie("currentareast",comfunc.getCityEn(cityId),{expires: new Date(Date.now() + 90000000000)});
    }
    if(req.params[2]){
        [data.country=1] = [comfunc.getCountryIdParams(req.params[2].replace('/', ''))];
    }else{
        data.country=1;
    }
  // log.info('country  ',data.country)
    async.parallel({
        lunbo_list: function (callback) {
          // 轮播图接口
            cms.lunbo_list({
                "ad_page":"MOBILE_YIMIN_HOME",
                "ad_seat":"SEAT1",
                "cityid":area
            },callback);
        },
        shouye:function(callback) {
            cms.mYiminShouye({
                "country_id":data.country
            }, callback);
        },
    }, function (err, result) {
        data.lunbo_list =returnData(result.lunbo_list,'lunbo_list');
        data.shouye = JSON.parse(result.shouye);
        log.info(data.shouye)
        log.info(data.shouye.list[0].list[2])
        log.info(data.shouye.list[1].list[2])
        log.info(data.shouye.list[2].list[2])
        // log.info(data.shouye.list[0].list[1])
        data.tdk = {
          pagekey: 'YIMIN_HOME',
          cityid: area,
        };
        res.render('yimin_index', data);
    });

}

// 学历频道页--本科
exports.channel_edu_graduate_under = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    // var nquery = comfunc.getReqQuery(req.params[3]);
    // var start_time = nquery && nquery.time ? nquery.time : 0;
    // var crowd = nquery && nquery.crowd ? nquery.crowd : 0;
    // var page = nquery && nquery.page ? nquery.page : 1;
    async.parallel({
        edu_strategy:function (callback) {
            cms.edu_strategy({
                "eduid": 1
            },callback);
        },
        // lunbo_list: function (callback) {
        //     // 轮播图接口
        //     cms.lunbo_list({"ad_page":"HOME","ad_seat":"SEAT1"},callback);
        // },
        //学历频道---》热门留学方案
        hot_liuxuefangan_list0: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0","country": 0, "eduid": 1,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list1: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 1, "eduid": 1,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list2: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 2, "eduid": 1,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list3: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country":4, "eduid": 1,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list4: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 5, "eduid": 1,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list5: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0",  "country": 201, "eduid": 1,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list6: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0",  "country": 202, "eduid": 1,
                "perpage": 4
            }, callback);
        },
        //留学活动
        liuxuehuodong_list: function (callback) {
            cms.liuxuehuodong_list({
                "country": country, "cityid": area, "start_time": 0, "crowd": 0, "page":1,"perpage": 4
            }, callback);
        },
        //留学攻略
        shenqinggonglue_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 12, "city_id": area, "type": 2, "per_page": 5, "page": 1
            }, callback);
        },
        //最新资讯
        zuixinzixun_list: function (callback) {
            cms.zuixinzixun_list({
                "catid": 45, "country": country, "perpage": 5, "page": 1
            }, callback);
        },
        //成功案例
        chenggonganli_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 17, "city_id": area,"order":"add_time"+" desc", "per_page": 5, "page": 1
            }, callback);
        },
        //留学方案
        liuxuefangan_list: function (callback) {
            cms.liuxuefangan_list({
                "country": country, "catid":47, "city_id": area, "page": 1, "perpage": 5
            }, callback);
        },
        //签证指导
        qianzhengzhidao_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 13, "city_id": area, "per_page": "5", "page": 1
            }, callback);
        },
        //申请条件
        shenqingtiaojian_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 14, "city_id": area, "per_page": 5, "page": 1
            }, callback);
        },
        //留学费用
        liuxuefeiyong_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 15, "city_id": area, "per_page": 5, "page": 1
            }, callback);
        },
        //热门院校
        remenyuanxiao_list: function (callback) {
            cms.remenyuanxiao({"position": "nation", "catid": 43, "country": country, "perpage": 5
            }, callback)
        }
    }, function (err, result) {
        // data.lunbo_list =returnData(result.lunbo_list,'lunbo_list');
        data.edu_strategy =returnData(result.edu_strategy,'edu_strategy');
        data.hot_liuxuefangan_list0 = returnData(result.hot_liuxuefangan_list0,'hot_liuxuefangan_list0');
        data.hot_liuxuefangan_list1 = returnData(result.hot_liuxuefangan_list1,'hot_liuxuefangan_list1');
        data.hot_liuxuefangan_list2 = returnData(result.hot_liuxuefangan_list2,'hot_liuxuefangan_list2');
        data.hot_liuxuefangan_list3 = returnData(result.hot_liuxuefangan_list3,'hot_liuxuefangan_list3');
        data.hot_liuxuefangan_list4 = returnData(result.hot_liuxuefangan_list4,'hot_liuxuefangan_list4');
        data.hot_liuxuefangan_list5 = returnData(result.hot_liuxuefangan_list5,'hot_liuxuefangan_list5');
        data.hot_liuxuefangan_list6 = returnData(result.hot_liuxuefangan_list6,'hot_liuxuefangan_list6');
        data.liuxuehuodong_list = returnData(result.liuxuehuodong_list,'liuxuehuodong_list');
        data.gonglue_list = returnData(result.shenqinggonglue_list,'shenqinggonglue_list');
        data.zuixinzixun_list = returnData(result.zuixinzixun_list,'zuixinzixun_list');
        data.chenggonganli_list = returnData(result.chenggonganli_list,'chenggonganli_list');
        data.liuxuefangan_list = returnData(result.liuxuefangan_list,'liuxuefangan_list');
        data.qianzhengzhidao_list = returnData(result.qianzhengzhidao_list,'qianzhengzhidao_list');
        data.shenqingtiaojian_list = returnData(result.shenqingtiaojian_list,'shenqingtiaojian_list');
        data.liuxuefeiyong_list = returnData(result.liuxuefeiyong_list,'liuxuefeiyong_list');
        data.remenyuanxiao_list = returnData(result.remenyuanxiao_list,'remenyuanxiao_list');
        data.country = country;
        data.edu=1;
        // function split_array(arr, len) {
        //     var a_len = arr.length;
        //     var result = [];
        //     for (var i = 0; i < a_len; i += len) {
        //         result.push(arr.slice(i, i + len));
        //     }
        //     return result;
        // }

        // var new_liuxuefangan_list_new = split_array(data.hot_liuxuefangan_list, 6);
        // data.hotLXFA = new_liuxuefangan_list_new;
        data.tdk = {
            pagekey: 'EDU-UNDER',
            cityid: area, //cityid
            nationid: country//nationi
        };
        log.info(data.edu_strategy)
        res.render('channel_edu_graduate', data);
    });
};
// 学历频道页--中小学
exports.channel_edu_graduate_middle = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    // var nquery = comfunc.getReqQuery(req.params[3]);
    // var start_time = nquery && nquery.time ? nquery.time : 0;
    // var crowd = nquery && nquery.crowd ? nquery.crowd : 0;
    // var page = nquery && nquery.page ? nquery.page : 1;
    async.parallel({
        edu_strategy:function (callback) {
            cms.edu_strategy({
                "eduid": 19
            },callback);
        },
        // lunbo_list: function (callback) {
        //     // 轮播图接口
        //     cms.lunbo_list({"ad_page":"HOME","ad_seat":"SEAT1"},callback);
        // },
        //学历频道---》热门留学方案
        hot_liuxuefangan_list0: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0","country": 0, "eduid": 19,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list1: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 1, "eduid": 19,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list2: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0",  "country": 2, "eduid": 19,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list3: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0",  "country":4, "eduid": 19,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list4: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0",  "country": 5, "eduid": 19,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list5: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0",  "country": 201, "eduid": 19,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list6: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 202, "eduid": 19,
                "perpage": 4
            }, callback);
        },
        //留学活动
        liuxuehuodong_list: function (callback) {
            cms.liuxuehuodong_list({
                "country": country, "cityid": area, "start_time": 0, "crowd": 0, "page":1,"perpage": 4
            }, callback);
        },
        //留学攻略
        shenqinggonglue_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 12, "city_id": area, "type": 2, "per_page": 5, "page": 1
            }, callback);
        },
        //最新资讯
        zuixinzixun_list: function (callback) {
            cms.zuixinzixun_list({
                "catid": 45, "country": country, "perpage": 5, "page": 1
            }, callback);
        },
        //成功案例
        chenggonganli_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 17, "city_id": area,"order":"add_time"+" desc", "per_page": 5, "page": 1
            }, callback);
        },
        //留学方案
        liuxuefangan_list: function (callback) {
            cms.liuxuefangan_list({
                "country": country, "catid":47, "city_id": area, "page": 1, "perpage": 5
            }, callback);
        },
        //签证指导
        qianzhengzhidao_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 13, "city_id": area, "per_page": "5", "page": 1
            }, callback);
        },
        //申请条件
        shenqingtiaojian_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 14, "city_id": area, "per_page": 5, "page": 1
            }, callback);
        },
        //留学费用
        liuxuefeiyong_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 15, "city_id": area, "per_page": 5, "page": 1
            }, callback);
        },
        //热门院校
        remenyuanxiao_list: function (callback) {
            cms.remenyuanxiao({"position": "nation", "catid": 43, "country": country, "perpage": 5
            }, callback)
        }
    }, function (err, result) {
        // data.lunbo_list =returnData(result.lunbo_list,'lunbo_list');
        data.edu_strategy =returnData(result.edu_strategy,'edu_strategy');
        data.hot_liuxuefangan_list0 = returnData(result.hot_liuxuefangan_list0,'hot_liuxuefangan_list0');
        data.hot_liuxuefangan_list1 = returnData(result.hot_liuxuefangan_list1,'hot_liuxuefangan_list1');
        data.hot_liuxuefangan_list2 = returnData(result.hot_liuxuefangan_list2,'hot_liuxuefangan_list2');
        data.hot_liuxuefangan_list3 = returnData(result.hot_liuxuefangan_list3,'hot_liuxuefangan_list3');
        data.hot_liuxuefangan_list4 = returnData(result.hot_liuxuefangan_list4,'hot_liuxuefangan_list4');
        data.hot_liuxuefangan_list5 = returnData(result.hot_liuxuefangan_list5,'hot_liuxuefangan_list5');
        data.hot_liuxuefangan_list6 = returnData(result.hot_liuxuefangan_list6,'hot_liuxuefangan_list6');
        data.liuxuehuodong_list = returnData(result.liuxuehuodong_list,'liuxuehuodong_list');
        data.gonglue_list = returnData(result.shenqinggonglue_list,'shenqinggonglue_list');
        data.zuixinzixun_list = returnData(result.zuixinzixun_list,'zuixinzixun_list');
        data.chenggonganli_list = returnData(result.chenggonganli_list,'chenggonganli_list');
        data.liuxuefangan_list = returnData(result.liuxuefangan_list,'liuxuefangan_list');
        data.qianzhengzhidao_list = returnData(result.qianzhengzhidao_list,'qianzhengzhidao_list');
        data.shenqingtiaojian_list = returnData(result.shenqingtiaojian_list,'shenqingtiaojian_list');
        data.liuxuefeiyong_list = returnData(result.liuxuefeiyong_list,'liuxuefeiyong_list');
        data.remenyuanxiao_list = returnData(result.remenyuanxiao_list,'remenyuanxiao_list');
        data.country = country;
        data.edu=19;
        // function split_array(arr, len) {
        //     var a_len = arr.length;
        //     var result = [];
        //     for (var i = 0; i < a_len; i += len) {
        //         result.push(arr.slice(i, i + len));
        //     }
        //     return result;
        // }

        // var new_liuxuefangan_list_new = split_array(data.hot_liuxuefangan_list, 6);
        // data.hotLXFA = new_liuxuefangan_list_new;
        data.tdk = {
            pagekey: 'EDU-MIDDLE',
            cityid: area, //cityid
            nationid: country//nationi
        };
        // log.info(data.hot_liuxuefangan_list)
        res.render('channel_edu_graduate', data);
    });
};
// 学历频道页--研究生
exports.channel_edu_graduate_master = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    // var nquery = comfunc.getReqQuery(req.params[3]);
    // var start_time = nquery && nquery.time ? nquery.time : 0;
    // var crowd = nquery && nquery.crowd ? nquery.crowd : 0;
    // var page = nquery && nquery.page ? nquery.page : 1;
    async.parallel({
        edu_strategy:function (callback) {
            cms.edu_strategy({
                "eduid": 2
            },callback);
        },
        // lunbo_list: function (callback) {
        //     // 轮播图接口
        //     cms.lunbo_list({"ad_page":"HOME","ad_seat":"SEAT1"},callback);
        // },
        //学历频道---》热门留学方案
        hot_liuxuefangan_list0: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0","country": 0, "eduid": 2,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list1: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 1, "eduid": 2,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list2: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 2, "eduid": 2,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list3: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0","country":4, "eduid": 2,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list4: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 5, "eduid": 2,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list5: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 201, "eduid": 2,
                "perpage": 4
            }, callback);
        },
        hot_liuxuefangan_list6: function (callback) {
            cms.hot_liuxuefangan_list({
                "position": "edu", "catid": "47", "subcatid": "0", "country": 202, "eduid": 2,
                "perpage": 4
            }, callback);
        },
        //留学活动
        liuxuehuodong_list: function (callback) {
            cms.liuxuehuodong_list({
                "country": country, "cityid": area, "start_time": 0, "crowd": 0, "page":1,"perpage": 4
            }, callback);
        },
        //留学攻略
        shenqinggonglue_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 12, "city_id": area, "type": 2, "per_page": 5, "page": 1
            }, callback);
        },
        //最新资讯
        zuixinzixun_list: function (callback) {
            cms.zuixinzixun_list({
                "catid": 45, "country": country, "perpage": 5, "page": 1
            }, callback);
        },
        //成功案例
        chenggonganli_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 17, "city_id": area,"order":"add_time"+" desc", "per_page": 5, "page": 1
            }, callback);
        },
        //留学方案
        liuxuefangan_list: function (callback) {
            cms.liuxuefangan_list({
                "country": country, "catid":47, "city_id": area, "page": 1, "perpage": 5
            }, callback);
        },
        //签证指导
        qianzhengzhidao_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 13, "city_id": area, "per_page": "5", "page": 1
            }, callback);
        },
        //申请条件
        shenqingtiaojian_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 14, "city_id": area, "per_page": 5, "page": 1
            }, callback);
        },
        //留学费用
        liuxuefeiyong_list: function (callback) {
            cms.channel_list({
                "country_id": country, "category_id": 15, "city_id": area, "per_page": 5, "page": 1
            }, callback);
        },
        //热门院校
        remenyuanxiao_list: function (callback) {
            cms.remenyuanxiao({"position": "nation", "catid": 43, "country": country, "perpage": 5
            }, callback)
        }
    }, function (err, result) {
        // data.lunbo_list =returnData(result.lunbo_list,'lunbo_list');
        data.edu_strategy =returnData(result.edu_strategy,'edu_strategy');
        data.hot_liuxuefangan_list0 = returnData(result.hot_liuxuefangan_list0,'hot_liuxuefangan_list0');
        data.hot_liuxuefangan_list1 = returnData(result.hot_liuxuefangan_list1,'hot_liuxuefangan_list1');
        data.hot_liuxuefangan_list2 = returnData(result.hot_liuxuefangan_list2,'hot_liuxuefangan_list2');
        data.hot_liuxuefangan_list3 = returnData(result.hot_liuxuefangan_list3,'hot_liuxuefangan_list3');
        data.hot_liuxuefangan_list4 = returnData(result.hot_liuxuefangan_list4,'hot_liuxuefangan_list4');
        data.hot_liuxuefangan_list5 = returnData(result.hot_liuxuefangan_list5,'hot_liuxuefangan_list5');
        data.hot_liuxuefangan_list6 = returnData(result.hot_liuxuefangan_list6,'hot_liuxuefangan_list6');
        data.liuxuehuodong_list = returnData(result.liuxuehuodong_list,'liuxuehuodong_list');
        data.gonglue_list = returnData(result.shenqinggonglue_list,'shenqinggonglue_list');
        data.zuixinzixun_list = returnData(result.zuixinzixun_list,'zuixinzixun_list');
        data.chenggonganli_list = returnData(result.chenggonganli_list,'chenggonganli_list');
        data.liuxuefangan_list = returnData(result.liuxuefangan_list,'liuxuefangan_list');
        data.qianzhengzhidao_list = returnData(result.qianzhengzhidao_list,'qianzhengzhidao_list');
        data.shenqingtiaojian_list = returnData(result.shenqingtiaojian_list,'shenqingtiaojian_list');
        data.liuxuefeiyong_list = returnData(result.liuxuefeiyong_list,'liuxuefeiyong_list');
        data.remenyuanxiao_list = returnData(result.remenyuanxiao_list,'remenyuanxiao_list');
        data.country = country;
        data.edu=2;
        // function split_array(arr, len) {
        //     var a_len = arr.length;
        //     var result = [];
        //     for (var i = 0; i < a_len; i += len) {
        //         result.push(arr.slice(i, i + len));
        //     }
        //     return result;
        // }

        // var new_liuxuefangan_list_new = split_array(data.hot_liuxuefangan_list, 6);
        // data.hotLXFA = new_liuxuefangan_list_new;
        data.tdk = {
            pagekey: 'EDU-MASTER',
            cityid: area, //cityid
            nationid: country//nationi
        };
        log.info(data.edu_strategy)
        res.render('channel_edu_graduate', data);
    });
};
//国家频道
exports.nationrank = function(req,res,next){
  var data = {};
  var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
  var country = comfunc.getCountryIdParams(req.params[0]);
  data.area = area;
  // data.country = country;
  //var nquery = comfunc.getReqQuery(req.params[3]);
  //var order = nquery && nquery.order ? nquery.order : "add_time";
  async.parallel({
    //留学活动
    liuxuehuodong_list: function (callback) {
      cms.liuxuehuodong_list({
        "country": country, "cityid": area, "page":1,"perpage":3
      }, callback);
    },
    //留学攻略
    shenqinggonglue_list: function (callback) {
      cms.channel_list({
        "country_id": country, "category_id": 12, "city_id": area, "type": 2, "per_page": 5, "page": 1
      }, callback);
    },
    //最新资讯
    zuixinzixun_list: function (callback) {
      cms.zuixinzixun_list({
        "catid": 45, "country": country, "perpage": 5, "page": 1
      }, callback);
    },
    //成功案例
    chenggonganli_list: function (callback) {
      cms.channel_list({
        "country_id": country, "category_id": 17, "city_id": area,"order":"add_time"+" desc", "per_page": 5, "page": 1
      }, callback);
    },
    //留学方案
    liuxuefangan_list: function (callback) {
      cms.liuxuefangan_list({
        "country": country, "catid":47, "city_id": area, "page": 1, "perpage": 5
      }, callback);
    },
    //签证指导
    qianzhengzhidao_list: function (callback) {
      cms.channel_list({
        "country_id": country, "category_id": 13, "city_id": area, "per_page": "5", "page": 1
      }, callback);
    },
    //申请条件
    shenqingtiaojian_list: function (callback) {
      cms.channel_list({
        "country_id": country, "category_id": 14, "city_id": area, "per_page": 5, "page": 1
      }, callback);
    },
    //留学费用
    liuxuefeiyong_list: function (callback) {
      cms.channel_list({
        "country_id": country, "category_id": 15, "city_id": area, "per_page": 5, "page": 1
      }, callback);
    },
    //热门院校
    remenyuanxiao_list: function (callback) {
      cms.remenyuanxiao({"position": "nation", "catid": 43, "country": country, "perpage": 5
      }, callback)
    }
  }, function (err, result) {
    data.liuxuehuodong_list = returnData(result.liuxuehuodong_list,'liuxuehuodong_list');
    data.gonglue_list = returnData(result.shenqinggonglue_list,'shenqinggonglue_list');
    data.zuixinzixun_list = returnData(result.zuixinzixun_list,'zuixinzixun_list');
    data.chenggonganli_list = returnData(result.chenggonganli_list,'chenggonganli_list');
    data.liuxuefangan_list = returnData(result.liuxuefangan_list,'liuxuefangan_list');
    data.qianzhengzhidao_list = returnData(result.qianzhengzhidao_list,'qianzhengzhidao_list');
    data.shenqingtiaojian_list = returnData(result.shenqingtiaojian_list,'shenqingtiaojian_list');
    data.liuxuefeiyong_list = returnData(result.liuxuefeiyong_list,'liuxuefeiyong_list');
    data.remenyuanxiao_list = returnData(result.remenyuanxiao_list,'remenyuanxiao_list');
    // console.log('data.gonglue_list',data.gonglue_list);
    data.country = country;
    data.tdk = {
      pagekey: 'NATIONRANK',
      cityid: area
    };
    res.render('nationrank', data);
  });

};
//search_page
exports.search_page = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    data.tdk = {
        pagekey: '',
        cityid: area //cityid
    };
    res.render('search',data);
};
//search_news
exports.search_news = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var nquery = comfunc.getReqQuery(req.params[1]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var keyword = nquery && nquery.q ? decodeURI(nquery.q) : '';
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        searcharticle: function (callback) { //1月12号产品确认搜索城市资讯
            cms.searcharticle({
                //"country_id": country,
                "city_id": area,
                "key_word": encodeURI(keyword),
                //"order":order,
                "per_page": "7",
                "page": page
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.searcharticle,'searcharticle');
        data.keyword=keyword;
        data.tdk = {
            pagekey: 'SEARCHNEWS', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('so_news', data);
    });
};
//search_advisor
exports.search_advisor = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var nquery = comfunc.getReqQuery(req.params[1]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var keyword = nquery && nquery.q ? decodeURI(nquery.q) : '';
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        searchadviser: function (callback) {
            cms.searchadviser({
                //"country_id": country,
                "city_id": area,
                "key_word":encodeURI(keyword),
                "per_page": "7",
                "page":page
            }, callback);
        }
    }, function (err, result) {
        data.advisor_list = returnData(result.searchadviser,'searchadviser');
        data.keyword=keyword;
        data.tdk = {
            pagekey: 'SEARCHADVISER', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('so_advisor', data);
    });
};
//最新资讯栏目页list
exports.news_list = function (req, res, next) {
  var data = [];
  var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
  var country = comfunc.getCountryIdParams(req.params[1]);
  var nquery = comfunc.getReqQuery(req.params[3]);
  var order = nquery && nquery.order ? nquery.order : 1;
  console.log(country, nquery);
  if(!comfunc.cityid_invalidcheck(area)){
    next();
    return false;
  }
  async.parallel({
    //最新资讯栏目----》列表
    zuixinzixun_list: function (callback) {
      cms.zuixinzixun_list({
        "catid": 45,
        "country": country,
        "orderby": order,
        "perpage": 7,
        "page": 1
      }, callback);
    }
  }, function (err, result) {
    data.channel_list = returnData(result.zuixinzixun_list,'zuixinzixun_list');
    data.country = country;
    data.pageroute="news";
    data.tdk = {
      pagekey: 'NEWS', //key 同意规定，具体找郭亚超
      cityid: area //cityid
    };
    data.esikey = esihelper.esikey();
    res.render('news_list', data);
  });
};
//成功案例列表页
exports.successful_case = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var edu = nquery && nquery.e ? nquery.e : 0;
    var page = nquery && nquery.page ? nquery.page : 1;

    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        //log.debug("login_a-------" + login_a.nickname)
        data.login_nickname = login_a;
    }
    if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
        next();
        return false;
    }
    async.parallel({
        chenggonganli_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 17,
                "city_id": area,
                "edu_id": edu,
                "order":"add_time"+" desc",
                "per_page": "6",
                "page": 1,
            }, callback);
        },

    }, function (err, result) {
        data.chenggonganli = returnData(result.chenggonganli_list,'chenggonganli_list');
        data.country = country;
        data.edu = edu;
        data.path = 'CASE';
        data.pageroute="case";
        data.cur_page = page;
        data.tdk = {
            pagekey: 'CASE', //key
            cityid: area, //cityid
            nationid: country,//nationi
            pageNum: page,
        };
        data.esikey = esihelper.esikey();
        // log.info('成功案例成功案例——————————————————————————');
        // log.info(data.chenggonganli.list);
        res.render('cases_list', data);

    });
};
//留学方案栏目
exports.product = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var serve = nquery && nquery.serve ? nquery.serve : 0;

    if ( req.cookies.login_ss !== undefined) {
        data.login_nickname = JSON.parse(req.cookies.login_ss);
    }
    if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
        next();
        return false;
    }
    async.parallel({
        liuxuefangan_list: function (callback) {
            cms.liuxuefangan_list({
                "country": country,
                "catid":47,
                // "cityid": area,
                "page": page,
                "server_type": serve,
                "perpage": "6"
            }, callback);
        },
    }, function (err, result) {
        data.hot_liuxuefangan_list = returnData(result.liuxuefangan_list,'liuxuefangan_list');
        data.country = country;
        data.cur_page = page;
        data.serve = serve;
        data.pageroute="product";
        // log.debug(data.hot_liuxuefangan_list);
        data.tdk = {
            pagekey: 'PRODUCT', //key
            cityid: area, //cityid
            nationid: country,//nationi
            pageNum: page,
        };
        data.esikey = esihelper.esikey();
        res.render('product', data);

    });
};
//留学费用栏目页list
exports.cost_list = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : 1;
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        liuxuefeiyong_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 15,
                "city_id": area,
                "type": 2,
                "per_page": 7,
                "page": 1,
                "order":order + ' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.liuxuefeiyong_list,'liuxuefeiyong_list');
        // log.info('留学费用');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="cost";
        data.tdk = {
            pagekey: 'COST', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('cost_list', data);
    });
};

//签证指导栏目页list
exports.visa_list = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : 1;
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        qianzhengzhidao_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 13,
                "city_id": area,
                "type": 2,
                "per_page": "7",
                "page": 1,
                "order":order + ' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.qianzhengzhidao_list,'qianzhengzhidao_list');
        // log.info('签证指导');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="visa";
        data.tdk = {
            pagekey: 'VISA', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('visa_list', data);
    });
};

//申请攻略栏目页list
exports.glue_list = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : "add_time";
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        shenqinggonglue_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 12,
                "city_id": area,
                "type": 2,
                "per_page": 7,
                "page": 1,
                "order": order + ' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.shenqinggonglue_list,'shenqinggonglue_list');
        // log.info('申请攻略');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="glue";
        data.tdk = {
            pagekey: 'GLUE', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('glue_list', data);
    });
};

//申请条件栏目页list
exports.prereq_list = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : "add_time";
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        shenqingtiaojian: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 14,
                "city_id": area,
                "type": 2,
                "per_page": 7,
                "page": 1,
                "order":order +' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.shenqingtiaojian,'shenqingtiaojian');
        // log.info('申请条件');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="prereq";
        data.tdk = {
            pagekey: 'PREREQ', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        // log.info(data.channel_list)
        res.render('prereq_list', data);
    });
};

//大学排名栏目页list
exports.school_list = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[0]);
    var nquery = comfunc.getReqQuery(req.params[2]);
    var order = nquery && nquery.order ? nquery.order : 1;
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        schoolpaiming: function (callback) {
            cms.schoolnew({
                "catid": 66,
                "cityid": area,
                "orderby": order,
                "country": country,
                "page": 1,
                "perpage": 7
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.schoolpaiming,'schoolpaiming');
        // log.info('大学排名');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="schoolrank";
        data.tdk = {
            pagekey: 'SCHOOLRANKLIST', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('school_list', data);
    });
};

//明星顾问列表页
exports.advisor_list = function (req, res, next) {
  var data = [];
  var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
  var country = comfunc.getCountryIdParams(req.params[1]);
  var page = req.query.page || 1;
  if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
    next();
    return false;
  }
  async.parallel({//明星顾问列表
    advisor_list: function (callback) {
      cms.adviser_list({"country":country ,"organid":area,"pagesize": "7", "page":page}, callback);
    }
  }, function (err, result) {

    data.advisor_list = returnData(result.advisor_list,'advisor_list');
    console.log('advisor_list', data.advisor_list)
    data.country=country;
    data.area=area;
    data.cur_page = page;
    //log.info(data.search_adviser_simple);
    data.tdk = {
      pagekey: 'ADVISER', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('advisor_list', data);

  });
};
//留学活动栏目页
exports.study_abroad_activity = function (req, res, next) {
  //预约活动
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = comfunc.getCountryIdParams(req.params[1]);
  if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area)){
    next();
    return false;
  }
  async.parallel({
    //成功案例
    /*chenggonganli_public: function (callback) {
      cms.channel_list({
        "country_id": country,
        "city_id": area,
        "category_id": 17,
        "per_page": "5",
        "page": 1,
        "order":'add_time'+' desc'
      }, callback);
    },
    //最新活动
    zuixinhuodong_public: function (callback) {
      cms.liuxuehuodong_list({
        "country": country,
        "cityid": area,
        "page":1,
        "perpage":5
      }, callback);
      },
    //大学排名
    schoolpaiming_public: function (callback) {
      cms.schoolnew({
        "catid": 66,
        "cityid": area,
        "orderby": 1,
        "country": country,
        "page": 1,
        "perpage": 5
      }, callback);
    },*/
    //留学活动
    liuxuehuodong_list: function (callback) {
      cms.liuxuehuodong_list({
        "country": country,"cityid": area, "page":1,"perpage":7
      }, callback);
    }
  }, function (err, result) {

   /* data.chenggonganli_public = returnData(result.chenggonganli_public,'chenggonganli_public');
    data.zuixinhuodong_public= returnData(result.zuixinhuodong_public,'zuixinhuodong_public');
    data.schoolpaiming_public = returnData(result.schoolpaiming_public,'schoolpaiming_public');*/
    data.liuxuehuodong_list = returnData(result.liuxuehuodong_list,'liuxuehuodong_list');
    data.tdk = {
      pagekey: 'ACTIVITY', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('study_abroad_activity', data);

  })
};
//落地页留学活动
exports.study_abroad_activity_detail = function (req, res, next) {
  //预约活动
  var data = [];
  var country = comfunc.getCountryIdParams(req.params[1]);
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var activityId = req.params[1];
  data.route = 'activity';
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    //log.debug("login_a-------" + login_a.nickname)
    data.login_nickname = login_a;
  }
  if(!comfunc.cityid_invalidcheck(area)){
    next();
    return false;
  }

  async.parallel({
    wenzhangdiye: function (callback) {
      cms.wenzhangdiye ({
        "catid":64,
        "id": activityId
      }, callback);
    },
      //留学活动
      liuxuehuodong_list: function (callback) {
          cms.liuxuehuodong_list({
              "country": country, "cityid": area, "page":1,"perpage":5
          }, callback);
      }

  }, function (err, result) {
    data.wenzhangdiye=returnData(result.wenzhangdiye,'wenzhangdiye');
    data.tuijian=returnData(result.liuxuehuodong_list,'liuxuehuodong_list');
    data.tuijian=data.tuijian.list;
    data.pageType="活动";
    if(err || result.wenzhangdiye.code != 0){
      //log.info('mediadetail error ~',err,result.wenzhangdiye.code);
      next();
      return false;
    }
    data.huodongdiye=data.wenzhangdiye.list;
    data.schoollist=data.huodongdiye.school_pic;
    data.canzanlist=data.huodongdiye.lecture_user;
    data.maparr=data.huodongdiye.address_map.split('|');
    data.liuxuehuodong_list = result.liuxuehuodong_list;
    data.pageroute='activity';
    data.tdk = {
      pagekey: 'ACTIVITYDETAIL', //key
      cityid: area, //cityid
      //  nationid: country,  //nationi
      title: data.wenzhangdiye.list.title,
      description: data.wenzhangdiye.list.description,
      keywords: data.wenzhangdiye.list.keywords,
    };
    data.esikey = esihelper.esikey();
    res.render('study_abroad_activity_detail', data);

  })
};
//明星顾问列表加载更多
exports.advisor_list_moer = function (req, res, next) {
  var data = req.query;
  console.log('data', data)
  cms.adviser_list(data, function (err, result) {
    if(err){
      res.send(err);
    }else{
      console.log('result', result)
      res.send(result);
    }
  });
};
/*资讯底页（rongfa）*/
exports.news_detail = function (req, res, next) {
  log.debug( '文章底页', req.params);
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    if(req.cookies.login_ss != undefined){
        data.login_info =JSON.parse(req.cookies.login_ss);
    }else{
        data.login_info ={};
        data.login_info.uid = 0;
    }
    data.article_id = req.params.id; //获取文章id
  async.parallel({
    wenzhangdiye: function (callback) {
      cms.article ({
          "u_id":data.login_info.uid,
          "article_id":data.article_id
      }, callback);
    },
  }, function (err, result){
    if(err || result.wenzhangdiye.code != 0){
      next();
      return false;
    }
    data.wenzhangdiye =returnData(result.wenzhangdiye,'wenzhangdiye');
      async.parallel({
          //获取用户信息（普通用户，顾问，参赞）
          userinfo:function(callback){
              cms.userinfo({
                  "u_id":data.login_info.uid,
                  "to_uid":data.wenzhangdiye.article_info.uid
              },callback);
          }
      },function (err,result) {
          data.userinfo =returnData(result.userinfo,'userinfo');
          data.path = 'NEWSDETAIL';
          data.pageType = '最新资讯';
          data.pageroute="news";
          data.id = data.article_id;
          var pagekey = null;
          if(data.wenzhangdiye.article_info.type == 1){
              pagekey = 'ADVISOR_P_CASE_DETAIL';
          }else if(data.wenzhangdiye.article_info.type == 2){
              pagekey = 'ADVISOR_P_ARTICLE_DETAIL';
          }
          data.tdk = {
              pagekey: pagekey, //key 同意规定，具体找郭亚超
              cityid: area, //cityid
              // nationid: country,//nationi
              title: data.wenzhangdiye.article_info.title,
              // description: data.wenzhangdiye.article_info.description,
              description: helperfunc.cut(data.wenzhangdiye.article_info.message,80),
              keywords: data.wenzhangdiye.article_info.title
          };
          data.esikey = esihelper.esikey();
          res.render('news_detail', data);
      })
  });
};/*资讯底页（rongfa）*/
exports.case_detail = function (req, res, next) {
  log.debug( '案例底页', req.params);
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    if(req.cookies.login_ss != undefined){
        data.login_info =JSON.parse(req.cookies.login_ss);
    }else{
        data.login_info ={};
        data.login_info.uid = 0;
    }
    data.article_id = req.params.id; //获取文章id
  async.parallel({
    wenzhangdiye: function (callback) {
      cms.article ({
          "u_id":data.login_info.uid,
          "article_id":data.article_id
      }, callback);
    },
  }, function (err, result){
    if(err || result.wenzhangdiye.code != 0){
      next();
      return false;
    }
    data.wenzhangdiye =returnData(result.wenzhangdiye,'wenzhangdiye');
      async.parallel({
          //获取用户信息（普通用户，顾问，参赞）
          userinfo:function(callback){
              cms.userinfo({
                  "u_id":data.login_info.uid,
                  "to_uid":data.wenzhangdiye.article_info.uid
              },callback);
          }
      },function (err,result) {
          data.userinfo =returnData(result.userinfo,'userinfo');
          data.path = 'NEWSDETAIL';
          data.pageType = '最新资讯';
          data.pageroute="news";
          data.id = data.article_id;
          var pagekey = null;
          if(data.wenzhangdiye.article_info.type == 1){
              pagekey = 'ADVISOR_P_CASE_DETAIL';
          }else if(data.wenzhangdiye.article_info.type == 2){
              pagekey = 'ADVISOR_P_ARTICLE_DETAIL';
          }
          data.tdk = {
              pagekey: pagekey, //key 同意规定，具体找郭亚超
              cityid: area, //cityid
              // nationid: country,//nationi
              title: data.wenzhangdiye.article_info.title,
              // description: data.wenzhangdiye.article_info.description,
              description: helperfunc.cut(data.wenzhangdiye.article_info.message,80),
              keywords: data.wenzhangdiye.article_info.title
          };
          data.esikey = esihelper.esikey();
          res.render('news_detail', data);
      })
  });
};

//顾问底页(rongfa)
exports.adviser_detail = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    // var country = comfunc.getCountryIdParams(req.params[1]);
    // var nquery = comfunc.getReqQuery(req.params[3]);
    // var edu = nquery && nquery.e ? nquery.e : 0;
    // var page = nquery && nquery.page ? nquery.page : 1;
    var uid = req.params[0];

    if ( req.cookies.login_ss !== undefined) {
        console.log('有cookie')
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
    }
    async.parallel({
        // guwen_list:function (callback){
        //     cms.adviser_main({
        //         "per_page":6, 
        //         "order":"add_time desc", 
        //         "uid": uid
        //     },callback)
        // },
        zhuanlanlist:function(callback){
            cms.adviser_main({
                "type":2,
                "uid":uid,
                "order":encodeURI("add_time desc")
            },callback)
        },
    }, function (err, result) {
        data.zhuanlanlist = returnData(result.zhuanlanlist,'zhuanlanlist');
        async.parallel({
            userinfo:function(callback){
                cms.userinfo({
                    "u_id":uid,
                    "to_uid":uid
                },callback);
            }
        },function(err, result){
            data.userinfo = returnData(result.userinfo,'userinfo');
            data.area=area;
            data.tdk = {
                pagekey: 'ADVISOR_P_ARTICLE', //key
                realname: data.userinfo.realname
            };
            res.render('adviser_detail', data);
        })
    });
};
//顾问底页--案例
exports.adviser_detail_case = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var uid = req.params[0];

    if ( req.cookies.login_ss !== undefined) {
        console.log('有cookie')
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
    }
    async.parallel({
        caselist:function(callback){
            cms.adviser_main({
                "type":1,
                "uid":uid,
                "order":encodeURI("add_time desc"),
                "per_page":6
            },callback)
        },
    }, function (err, result) {
        // data.userinfo = returnData(result.userinfo,'userinfo');
        data.caselist = returnData(result.caselist,'caselist');
        async.parallel({
            userinfo:function(callback){
                cms.userinfo({
                    "u_id":uid,
                    "to_uid":uid
                },callback);
            }
        },function(err, result){
            data.userinfo = returnData(result.userinfo,'userinfo');
            data.area=area;
            data.tdk = {
                pagekey: 'ADVISOR_P_CASE',
                realname: data.userinfo.realname
            };
            res.render('adviser_detail_case', data);
        })
    });
};
//顾问底页--精选
exports.adviser_detail_jinxuan = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var uid = req.params[0];

    if ( req.cookies.login_ss !== undefined) {
        console.log('有cookie')
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
    }
    async.parallel({
        jinxuanlist:function(callback){
            cms.adviser_main({
                "order":encodeURI("views desc"),
                "per_page":5,
                "uid":uid
            },callback)
        },
    }, function (err, result) {
        data.jinxuanlist = returnData(result.jinxuanlist,'jinxuanlist');
        async.parallel({
            userinfo:function(callback){
                cms.userinfo({
                    "u_id":uid,
                    "to_uid":uid
                },callback);
            }
        },function(err, result){
            data.userinfo = returnData(result.userinfo,'userinfo');
            data.area=area;
            data.tdk = {
                pagekey: 'ADVISOR_P_ARTICLE_HOT', //key
                realname: data.userinfo.realname
            };
            res.render('adviser_detail_jinxuan', data);
        })
    });
};
/*参赞底页-*/
exports.canzan_column = function (req, res, next) {
  log.debug(req.params);
  var data = [];
  var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
  var country = req.query.n || 0;
  var to_uid = req.params.id;

  async.parallel({
    userinfo:function(callback){
        cms.userinfo({
            "u_id":0,
            "to_uid":to_uid,
        },callback);
    },
    zhuanlanlist: function (callback) {
      cms.user_article_list({
            "u_id": to_uid,
            "page": 1, 
            "per_page": 7, 
            "type": 2
        }, callback);
    },
    zuixinzixun_list: function (callback) {
        cms.zuixinzixun_list({
          "catid": 45,
          "country": country,
          "orderby": 1,
          "perpage": 5,
          "page": 1
        }, callback);
      }
  }, function (err, result){
    data.canzan_detail = returnData(result.userinfo,'userinfo');
    data.zhuanlanlist = returnData(result.zhuanlanlist,'zhuanlanlist');
    data.tuijian = returnData(result.zuixinzixun_list,'zuixinzixun_list');
    data.tuijian = data.tuijian.list;
    data.country = country;
    data.pageroute="news";
    data.path = 'TEAMDETAIL';
    data.pageType = '资讯';
    data.tdk = {
      pagekey: 'COUNSELLER', //key
      cityid: area, //cityid
    };
    //log.info(data.zhuanlanlist)
    res.render('canzan_column', data);
  });
};
/*参赞列表*/
exports.canzan_list = function (req, res, next) {
  log.debug(req.params);
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var qianzhengzhinan_currentPage=req.query.page || 1;
  var country = req.query.n || 0;
  var articleId = req.params.id;
  var page =req.query.page || 1;
  var order =req.query.article || 1;
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_nickname = login_a;
  }
  async.parallel({
    canzanlist:function (callback) {
      cms.canzanlist({
        "usertype":"3",
        "pagesize":7,
        "page": 1
      },callback);
    },
  }, function (err, result){
    data.canzanlist = returnData(result.canzanlist,'canzanlist');
    data.country=country;
    data.route = 'team';
    data.path = 'TEAMDETAIL';
    data.pageroute='team';
    data.area=area;
    data.tdk = {
      pagekey: 'COUNSELLER', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('canzan_list', data);
  });
};
/*成功案例底页*/
// exports.case_detail = function(req,res,next){
//     log.debug('案例底页（用户视角）~~~thl')
//     var data = {};
//     var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
//     var country = comfunc.getCountryIdParams(req.params[1]);
//     data.article_id = req.params.id;
//     async.parallel({
//         //文章详情
//         article:function(callback){
//             cms.article({
//                 "u_id":"0",
//                 "article_id":data.article_id,
//             },callback);
//         },
//         chenggonganli_list: function (callback) {
//             cms.channel_list({
//                 "country_id": country,
//                 "category_id": 17,
//                 "city_id": area,
//                 // "edu_id": edu,
//                 "order":"add_time"+" desc",
//                 "per_page": "5",
//                 "page": 1,
//             }, callback);
//         },
//     },function(err, result){
//         data.article = returnData(result.article,'article');
//         data.tuijian=returnData(result.chenggonganli_list,'chenggonganli_list');
//         data.tuijian=data.tuijian.list;
//         // log.info(data.article)
//         data.pageType="案例";
//         data.pageroute="case";
//         log.info(data.article)
//         var  pagekey =null;
//         // if(data.userinfo.status == 1){
//         //     pagekey = 'PREAD_CASE_DETAIL';
//         // }else if(data.userinfo.status == 0){
//         //     pagekey = 'ADVISOR_P_CASE_DETAIL';
//         // }
//         data.tdk = {
//             pagekey: pagekey,
//             cityid: area,
//             // realname: data.login_info.realname,
//             // title: data.article.article_info.title,
//             // description: data.article.article_info.description,
//             // keywords: data.article.article_info.keywords,
//         };
//         res.render('case_detail', data);
//     });
// };
//申请攻略落地页 专栏底页
exports.gluedetail= function(req,res,next){
    log.debug('专栏底页 (用户视角)~~~thl');
    var data = {};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    if(req.cookies.login_ss != undefined){
        data.login_info =JSON.parse(req.cookies.login_ss);
    }else{
        data.login_info ={};
        data.login_info.uid = 0;
    }
    data.article_id = req.params[2]; //获取文章id
    async.parallel({
        //文章详情
        article:function(callback){
            cms.article({
                "u_id":data.login_info.uid,
                "article_id":data.article_id
            },callback);
        },
        shenqinggonglue_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 12,
                "city_id": area,
                "type": 2,
                "per_page": 5,
                "page": 1,
                "order": 1 + ' desc'
            }, callback);
        }
    },function(err,result){
        data.article =returnData(result.article,'article');
        data.tuijian =returnData(result.shenqinggonglue_list,'shenqinggonglue_list');
        data.tuijian=data.tuijian.list;
        log.info(data.tuijian)
        if(err || result.article.code != 0){
            //log.info('mediadetail error ~',err,result.wenzhangdiye.code);
            next();
            return false;
        }
        data.memberId = data.article.article_info.uid; //获取顾问id
        data.catid = data.article.catid;
        async.parallel({
            //获取用户信息（普通用户，顾问，参赞）
            userinfo:function(callback){
                cms.userinfo({
                    "u_id":data.login_info.uid,
                    "to_uid":data.memberId
                },callback);
            },
        },function(err,result){
            // data.channel_list =returnData(result.channel_list,'channel_list');
            data.userinfo = returnData(result.userinfo,'userinfo');

            data.country =data.article.country || '1';
            async.parallel({
            },function(err,result){
                data.tdk = {
                    pagekey: 'GLUEDETAIL',
                    cityid: area, //cityid
                    nationid: data.article.article_info.country_id,//nationi
                    title: data.article.article_info.title,
                    description: data.article.article_info.description,
                    keywords: data.article.article_info.keywords,
                };
                data.pageType = '申请攻略';
                data.pageroute="glue";
                data.esikey = esihelper.esikey();
                res.render('cost_detail', data);
            })
        })
    })
}

//签证指导落地页 专栏底页
exports.visadetail= function(req,res,next){
    log.debug('专栏底页 (用户视角)~~~thl');
    var data = {};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    if(req.cookies.login_ss != undefined){
        data.login_info =JSON.parse(req.cookies.login_ss);
    }else{
        data.login_info ={};
        data.login_info.uid = 0;
    }
    data.article_id = req.params[2]; //获取文章id
    async.parallel({
        //文章详情
        article:function(callback){
            cms.article({
                "u_id":data.login_info.uid,
                "article_id":data.article_id
            },callback);
        },
        qianzhengzhidao_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 13,
                "city_id": area,
                "type": 2,
                "per_page": "5",
                "page": 1,
                "order":1 + ' desc'
            }, callback);
        }
    },function(err,result){
        data.article =returnData(result.article,'article');
        data.tuijian =returnData(result.qianzhengzhidao_list,'qianzhengzhidao_list');
        data.tuijian=data.tuijian.list;
        if(err || result.article.code != 0){
            //log.info('mediadetail error ~',err,result.wenzhangdiye.code);
            next();
            return false;
        }
        data.memberId = data.article.article_info.uid; //获取顾问id
        data.catid = data.article.catid;
        async.parallel({
            //获取用户信息（普通用户，顾问，参赞）
            userinfo:function(callback){
                cms.userinfo({
                    "u_id":data.login_info.uid,
                    "to_uid":data.memberId
                },callback);
            }
        },function(err,result){
            // data.channel_list =returnData(result.channel_list,'channel_list');
            data.userinfo = returnData(result.userinfo,'userinfo');
            data.country =data.article.country || '1';
            async.parallel({
            },function(err,result){
                data.tdk = {
                    pagekey: 'VISADETAIL',
                    cityid: area, //cityid
                    nationid: data.article.article_info.country_id,//nationi
                    title: data.article.article_info.title,
                    description: data.article.article_info.description,
                    keywords: data.article.article_info.keywords,
                };
                data.pageType = '签证指导';
                data.pageroute="visa";
                data.esikey = esihelper.esikey();
                res.render('cost_detail', data);
            })
        })
    })
}

//申请条件落地页 专栏底页
exports.prereqdetail= function(req,res,next){
    log.debug('专栏底页 (用户视角)~~~thl');
    var data = {};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    if(req.cookies.login_ss != undefined){
        data.login_info =JSON.parse(req.cookies.login_ss);
    }else{
        data.login_info ={};
        data.login_info.uid = 0;
    }
    data.article_id = req.params[2]; //获取文章id
    async.parallel({
        //文章详情
        article:function(callback){
            cms.article({
                "u_id":data.login_info.uid,
                "article_id":data.article_id
            },callback);
        },
        shenqingtiaojian: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 14,
                "city_id": area,
                "type": 2,
                "per_page": 5,
                "page": 1,
                "order":1 +' desc'
            }, callback);
        }
    },function(err,result){
        data.article =returnData(result.article,'article');
        data.tuijian =returnData(result.shenqingtiaojian,'shenqingtiaojian');
        data.tuijian=data.tuijian.list;
        if(err || result.article.code != 0){
            //log.info('mediadetail error ~',err,result.wenzhangdiye.code);
            next();
            return false;
        }
        data.memberId = data.article.article_info.uid; //获取顾问id
        data.catid = data.article.catid;
        async.parallel({
            //获取用户信息（普通用户，顾问，参赞）
            userinfo:function(callback){
                cms.userinfo({
                    "u_id":data.login_info.uid,
                    "to_uid":data.memberId
                },callback);
            }
        },function(err,result){
            // data.channel_list =returnData(result.channel_list,'channel_list');
            data.userinfo = returnData(result.userinfo,'userinfo');
            data.country =data.article.country || '1';
            async.parallel({
            },function(err,result){
                data.tdk = {
                    pagekey: 'PREREQDETAIL',
                    cityid: area, //cityid
                    nationid: data.country_id,//nationi
                    nationid: data.article.article_info.country_id,//nationi
                    title: data.article.article_info.title,
                    description: data.article.article_info.description,
                    keywords: data.article.article_info.keywords,
                };
                data.pageType = '申请条件';
                data.pageroute="prereq";
                data.esikey = esihelper.esikey();
                // log.info(data.article)
                res.render('cost_detail', data);
            })
        })
    })
}

//留学费用落地页 专栏底页
exports.costdetail= function(req,res,next){
    log.debug('专栏底页 (用户视角)~~~thl');
    var data = {};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    if(req.cookies.login_ss != undefined){
        data.login_info =JSON.parse(req.cookies.login_ss);
    }else{
        data.login_info ={};
        data.login_info.uid = 0;
    }
    data.article_id = req.params[2]; //获取文章id
    async.parallel({
        //文章详情
        article:function(callback){
            cms.article({
                "u_id":data.login_info.uid,
                "article_id":data.article_id
            },callback);
        },
        liuxuefeiyong_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 15,
                "city_id": area,
                "type": 2,
                "per_page": 5,
                "page": 1,
                "order":1 + ' desc'
            }, callback);
        }
    },function(err,result){
        data.article =returnData(result.article,'article');
        data.tuijian = returnData(result.liuxuefeiyong_list,'liuxuefeiyong_list');
        data.tuijian=data.tuijian.list;
        if(err || result.article.code != 0){
            //log.info('mediadetail error ~',err,result.wenzhangdiye.code);
            next();
            return false;
        }
        data.memberId = data.article.article_info.uid; //获取顾问id
        data.catid = data.article.catid;
        async.parallel({
            //获取用户信息（普通用户，顾问，参赞）
            userinfo:function(callback){
                cms.userinfo({
                    "u_id":data.login_info.uid,
                    "to_uid":data.memberId
                },callback);
            }
        },function(err,result){
            // data.channel_list =returnData(result.channel_list,'channel_list');
            data.userinfo = returnData(result.userinfo,'userinfo');
            data.country =data.article.country || '1';
            async.parallel({
            },function(err,result){
                data.tdk = {
                    pagekey: 'COSTDETAIL',
                    cityid: area, //cityid
                    nationid: data.article.article_info.country_id,//nationi
                    title: data.article.article_info.title,
                    description: data.article.article_info.description,
                    keywords: data.article.article_info.keywords,
                };
                data.pageType = '留学费用';
                data.pageroute="cost";
                data.esikey = esihelper.esikey();
                // log.info(data.article.article_info.add_time)
                res.render('cost_detail', data);
            })
        })
    })
}
// 大学排名落地页
exports.schooldetail = function (req, res, next) {
    log.debug(req.params);
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    // var country = req.query.n || 0;
    var country = 0;
    if(req.params[0]){
        var countryId = comfunc.getCountryId(req.params[0]);
        if(countryId && countryId !== comfunc.INVALID_ID) {
            country = countryId;
        }
    }
    var articleId = req.params[1];
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        //log.debug("login_a-------" + login_a.nickname)
        data.login_nickname = login_a;
    }
    if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(articleId)){
        next();
        return false;
    }
    async.parallel({
        //签证指南
        /* qianzhengzhinan: function (callback) {
         cms.qianzhengzhinan({"organid": area,"page":qianzhengzhinan_currentPage}, callback);
         },*/
        //栏目综合页---->［栏目］留学方案（不带学历）
        wenzhangdiye: function (callback) {
            cms.wenzhangdiye ({
                "catid":66,
                "id": articleId
            }, callback);
        },
        schoolpaiming: function (callback) {
            cms.schoolnew({
                "catid": 66,
                "cityid": area,
                "orderby": 1,
                "country": country,
                "page": 1,
                "perpage": 5
            }, callback);
        }
    }, function (err, result){
        data.wenzhangdiye =returnData(result.wenzhangdiye,'wenzhangdiye');
        data.tuijian =returnData(result.schoolpaiming,'schoolpaiming');
        data.tuijian=data.tuijian.list;
        if(err || result.wenzhangdiye.code != 0){
            //log.info('mediadetail error ~',err,result.wenzhangdiye.code);
            next();
            return false;
        }
        data.country=country;
        data.route = 'school';
        data.pageType = '大学排名';
        data.path = 'SCHOOLDETAIL';
        data.pageroute="schoolrank/school";
        data.id = articleId;
        data.catid = data.wenzhangdiye.list.catid;
        data.tdk = {
            pagekey: 'SCHOOLDETAIL', //key
            cityid: area, //cityid
            nationid: country,//nationi
            title: data.wenzhangdiye.list.title,
            description: data.wenzhangdiye.list.description,
            keywords: data.wenzhangdiye.list.keywords,
        };
        data.esikey = esihelper.esikey();
        res.render('news_detail', data);

    });
}
/*
 * uc接口代理封装
 * */
exports.ucapi_agent = function(req,res,next){
  var data = req.query;
  cms.ucapi_agent(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
 * uc接口代理封装+index.php
 * */
exports.ucapi_agent_common = function(req,res,next){
  var data = req.query;
  cms.ucapi_agent_common(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
 * cms接口代理封装 最新资讯 更多
 * */
exports.more_news = function(req,res,next){
  var data = req.query;
  cms.zuixinzixun_list(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
 * cms接口代理封装成功案例更多
 * */
exports.more_case = function(req,res,next){
  var data = req.query;
  cms.channel_list(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
 * cms接口代理封装留学方案更多
 * */
exports.more_product = function(req,res,next){
  var data = req.query;
  cms.liuxuefangan_list(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
 * cms接口代理封装 大学排名 更多
 * */
exports.more_school = function(req,res,next){
    var data = req.query;
    cms.schoolnew(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
/*
 * cms接口代理封装 参赞列表 更多
 * */
exports.more_canzan = function(req,res,next){
  var data = req.query;
  cms.canzanlist(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
 * cms接口代理封装 留学费用\签证指导\申请攻略\申请条件 更多
 * */
exports.more_cost = function(req,res,next){
    var data = req.query;
    cms.channel_list(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
exports.more_activity= function(req,res,next){
  var data = req.query;
  log.info('留学活动参数 ', data);
  cms.liuxuehuodong_list(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
 * cms接口代理封装院校库更多
 * */
exports.more_daxuepaiming = function(req,res,next){
  var data = req.query;
  cms.daxuepaiming_list(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
/*
* more_so_news
* */
exports.more_so_news = function(req,res,next){
    var data = req.query;
    cms.searcharticle(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
/*
* more_so_advisor
* */
exports.more_so_advisor = function(req,res,next){
    var data = req.query;
    cms.searchadviser(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//院校库栏目页list
exports.schoollib = function (req, res, next) {
  var data = [];
  var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
  var country = comfunc.getCountryIdParams(req.params[1]);
  var order = req.query.order || 1;
  var page = req.query.page || 1;
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    //log.debug("login_a-------" + login_a.nickname)
    data.login_nickname = login_a;
  }
  if(!comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
    next();
    return false;
  }
  async.parallel({
    //院校库栏目----》列表
    daxuepaiming_list: function (callback) {
      cms.daxuepaiming_list({
        "country": country,
        "page": page,
        "perpage": "6"
      }, callback);
    },
  }, function (err, result) {
    data.daxuepaiming_list =returnData(result.daxuepaiming_list,'daxuepaiming_list');
    data.country = country;
    // log.info('===================');
    // log.info(data.daxuepaiming_list.list);
    data.pageroute = 'schoollib';
    data.cur_page = page;
    data.tdk = {
      pagekey: 'SCHOOLLIB', //key
      cityid: area, //cityid
      nationid: country,//nationi
      pageNum: page,
    };
    data.esikey = esihelper.esikey();
    res.render('schoollib', data);
  });
};
//落地頁院校库
exports.schoollibdetail = function (req, res, next) {
  log.debug(req.params);
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //var country = req.query.n || 0;
  var country = 0;
  if(req.params[1]){
    var countryId = comfunc.getCountryId(req.params[1]);
    if(countryId && countryId !== comfunc.INVALID_ID) {
      country = countryId;
    }
  }
  var articleId = req.params[2];
  var page =req.query.page || 1;
  var order =req.query.article || 1;
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    //log.debug("login_a-------" + login_a.nickname)
    data.login_nickname = login_a;
  }
  if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
    next();
    return false;
  }
  async.parallel({
    wenzhangdiye: function (callback) {
      cms.wenzhangdiye ({
        "catid":43,
        "id": articleId
      }, callback);
    },
    daxuepaiming_list: function (callback) {
      cms.daxuepaiming_list({
        "country": country,
        "page": page,
        "orderby":order
      }, callback);
    }
  }, function (err, result){
    data.wenzhangdiye =returnData(result.wenzhangdiye,'wenzhangdiye');
    data.daxuepaiming_list =returnData(result.daxuepaiming_list,'daxuepaiming_list');
    if(err || result.wenzhangdiye.code != 0){
      next();
      return false;
    }
    data.country=country;
    data.route = 'schoollib';
    data.path = 'SCHOOLLIBDETAIL';
    data.pageroute="schoollib";
    data.id = articleId;
    data.catid = data.wenzhangdiye.list.catid;
    data.tdk = {
      pagekey: 'SCHOOLLIBDETAIL', //key
      cityid: area, //cityid
      nationid: country,//nationi
      title: data.wenzhangdiye.list.title,
      description: data.wenzhangdiye.list.description,
      keywords: data.wenzhangdiye.list.keywords,
    };
     //log.info(data.daxuepaiming_list)
    data.esikey = esihelper.esikey();
    res.render('schoollibdetail', data);

  });
};

// 留学方案底页
exports.productdetail= function (req, res, next) {
  log.debug('留学方案底页')
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = 0;
  if(req.params[1]){
    var countryId = comfunc.getCountryId(req.params[1]);
    if(countryId && countryId !== comfunc.INVALID_ID) {
      country = countryId;
    }
  }
  var articleId = req.params[2];
  var order = req.query.order || "add_time";
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_nickname = login_a;
  }
  cms.wenzhangdiye ({
    "catid":47,
    "id": articleId
  }, function(err,result){
    if (err || result.code != 0){
      next();
      return false;
    }
    data.wenzhangdiye =returnData(result,'wenzhangdiye');
    data.cityId = data.wenzhangdiye.list.organid;
    data.country = data.wenzhangdiye.list.country;
    data.education = data.wenzhangdiye.list.education;
    async.parallel({
      xiangguanfangan:function(callback){
        cms.xiangguanfangan ({
          "catid":47,
          "id": articleId,
          "cityid":data.cityId,
          "country":data.country
        }, callback);
      },
      liuxuefangan_list: function (callback) {
        cms.liuxuefangan_list({
            "country": country,
            "catid":47,
            // "cityid": area,
            "page": 1,
            "server_type": 0,
            "perpage": "5"
        }, callback);
        }
    }, function (err, result) {
      data.xiangguanfanganlist =returnData(result.xiangguanfangan,'xiangguanfangan');
      data.tuijian =returnData(result.liuxuefangan_list,'liuxuefangan_list');
      data.tuijian=data.tuijian.list
      data.xiangguanfangan=data.xiangguanfanganlist.list;
      data.pageType="方案"
      data.pageroute="product";
      //log.info( data.chenggonganli_list.list[0]);
      data.path = 'PRODUCTDETAIL';
      data.tdk = {
        pagekey: 'PRODUCTDETAIL', //key
        cityid: area, //cityid
        nationid: country,//nationi
        title: data.wenzhangdiye.list.title,
        description: data.wenzhangdiye.list.description,
        keywords: data.wenzhangdiye.list.keywords,

      };
      log.info(data.wenzhangdiye)
      res.render('productdetail', data);

    })
  });
};

/*所有引导页 start*/
exports.info_news = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        zuixinzixun_list: function (callback) {
            cms.zuixinzixun_list({
                "catid": 45,
                "country": country,
                "perpage": 4,
                "page": 1
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.zuixinzixun_list,'zuixinzixun_list');
        data.country = country;
        data.pageroute="news";
        data.tdk = {
            pagekey: 'NEWS', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('info_news', data);
    });
};
//成功案例引导页
exports.info_cases = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var edu = nquery && nquery.e ? nquery.e : 0;
    var page = nquery && nquery.page ? nquery.page : 1;

    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        //log.debug("login_a-------" + login_a.nickname)
        data.login_nickname = login_a;
    }
    if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
        next();
        return false;
    }
    async.parallel({
        chenggonganli_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 17,
                "city_id": area,
                "edu_id": edu,
                "per_page": "4",
                "page": 1,
            }, callback);
        },

    }, function (err, result) {
        data.chenggonganli = returnData(result.chenggonganli_list,'chenggonganli_list');
        data.country = country;
        data.edu = edu;
        data.path = 'CASES';
        data.cur_page = page;
        data.tdk = {
            pagekey: 'CASES', //key
            cityid: area, //cityid
            nationid: country,//nationi
            pageNum: page,
        };
        data.esikey = esihelper.esikey();
        // log.info('成功案例成功案例——————————————————————————');
        // log.info(data.chenggonganli.list);
        res.render('info_cases', data);

    });
};
//留学方案引导页
exports.info_product = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var serve = nquery && nquery.serve ? nquery.serve : 0;

    if ( req.cookies.login_ss !== undefined) {
        data.login_nickname = JSON.parse(req.cookies.login_ss);
    }
    if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
        next();
        return false;
    }
    async.parallel({
        liuxuefangan_list: function (callback) {
            cms.liuxuefangan_list({
                "country": country,
                "catid":47,
                // "cityid": area,
                "page": page,
                "server_type": serve,
                "perpage": "4"
            }, callback);
        },

    }, function (err, result) {
        data.hot_liuxuefangan_list = returnData(result.liuxuefangan_list,'liuxuefangan_list');
        data.country = country;
        data.cur_page = page;
        data.serve = serve;
        log.debug(data.hot_liuxuefangan_list);
        data.tdk = {
            pagekey: 'PRODUCT', //key
            cityid: area, //cityid
            nationid: country,//nationi
            pageNum: page,
        };
        data.esikey = esihelper.esikey();
        res.render('info_product', data);

    });
};
//院校库引导页list
exports.info_schoollib = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = req.query.n || 0;
    var order = req.query.order || 1;
    var page = req.query.page || 1;
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        //log.debug("login_a-------" + login_a.nickname)
        data.login_nickname = login_a;
    }
    if(!comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
        next();
        return false;
    }
    async.parallel({
        //院校库栏目----》列表
        daxuepaiming_list: function (callback) {
            cms.daxuepaiming_list({
                "country": country,
                "page": page,
                "perpage": "4",
                "orderby":order
            }, callback);
        },
    }, function (err, result) {
        data.daxuepaiming_list =returnData(result.daxuepaiming_list,'daxuepaiming_list');
        data.country = country;
        // log.info('===================');
        // log.info(data.daxuepaiming_list.list);
        data.pageroute = 'schoollib';
        data.cur_page = page;
        data.tdk = {
            pagekey: 'SCHOOLLIB', //key
            cityid: area, //cityid
            nationid: country,//nationi
            pageNum: page,
        };
        res.render('info_schoollib', data);
    });
};
//签证指导引导页
exports.info_visa = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : 1;
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        qianzhengzhidao_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 13,
                "city_id": area,
                "type": 2,
                "per_page": "4",
                "page": 1,
                "order":order + ' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.qianzhengzhidao_list,'qianzhengzhidao_list');
        // log.info('签证指导');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="visa";
        data.tdk = {
            pagekey: 'VISA', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('info_visa', data);
    });
};
//留学费用引导页list
exports.info_cost = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : 1;
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        liuxuefeiyong_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 15,
                "city_id": area,
                "type": 2,
                "per_page": 4,
                "page": 1,
                "order":order + ' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.liuxuefeiyong_list,'liuxuefeiyong_list');
        // log.info('留学费用');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="cost";
        data.tdk = {
            pagekey: 'COST', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('info_cost', data);
    });
};
//大学排名引导页list
exports.info_school = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : 1;
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        schoolpaiming: function (callback) {
            cms.schoolnew({
                "catid": 66,
                "cityid": area,
                "orderby": order,
                "country": country,
                "page": 1,
                "perpage": 4
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.schoolpaiming,'schoolpaiming');
        // log.info('大学排名');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="school";
        data.tdk = {
            pagekey: 'SCHOOl', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('info_school', data);
    });
};
//申请攻略引导页list
exports.info_glue = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : "add_time";
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        shenqinggonglue_list: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 12,
                "city_id": area,
                "type": 2,
                "per_page": 4,
                "page": 1,
                "order": order + ' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.shenqinggonglue_list,'shenqinggonglue_list');
        // log.info('申请攻略');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="glue";
        data.tdk = {
            pagekey: 'GLUE', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('info_glue', data);
    });
};
//申请条件引导页list
exports.info_prereq_list = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    var nquery = comfunc.getReqQuery(req.params[3]);
    var order = nquery && nquery.order ? nquery.order : "add_time";
    if(!comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        shenqingtiaojian: function (callback) {
            cms.channel_list({
                "country_id": country,
                "category_id": 14,
                "city_id": area,
                "type": 2,
                "per_page": 4,
                "page": 1,
                "order":order +' desc'
            }, callback);
        }
    }, function (err, result) {
        data.channel_list = returnData(result.shenqingtiaojian,'shenqingtiaojian');
        // log.info('申请条件');
        // log.info(data.channel_list.list);
        data.country = country;
        data.pageroute="prereq";
        data.tdk = {
            pagekey: 'PREREQ', //key 同意规定，具体找郭亚超
            cityid: area //cityid
        };
        data.esikey = esihelper.esikey();
        res.render('info_prereq', data);
});
};
//留学活动引导页
exports.info_study_abroad_activity = function (req, res, next) {
    //预约活动
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = comfunc.getCountryIdParams(req.params[1]);
    if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area)){
        next();
        return false;
    }
    async.parallel({
        // chenggonganli: function (callback) {
        //     cms.chenggonganli({
        //         "position": "cmslist", "catid": 17, "subcatid": 0, "cityid": area, "country": country, "perpage": 5
        //     }, callback);
        // },
        // huodongyugao: function (callback) {
        //     cms.huodongyugao({
        //         "position": "cmslist", "catid": 64, "cityid": area, "country": country, "perpage": 5
        //     }, callback);
        // },
        //留学活动
        liuxuehuodong_list: function (callback) {
            cms.liuxuehuodong_list({
                "country": country, "cityid": area, "page":1,"perpage":4
            }, callback);
        }
    }, function (err, result) {

        // data.chenggonganli = returnData(result.chenggonganli,'chenggonganli');
        // data.huodongyugao= returnData(result.huodongyugao,'huodongyugao');
        data.liuxuehuodong_list = returnData(result.liuxuehuodong_list,'liuxuehuodong_list');
        data.tdk = {
            pagekey: 'ACTIVITY', //key
            cityid: area, //cityid
            nationid: country//nationi
        };
        //data.esikey = esihelper.esikey();
        res.render('info_activity', data);

    })
};
//明星顾问引导页
exports.info_advisor_list = function (req, res, next) {
    var data = [];
    var area = req.cookies['currentarea'] ? req.cookies['currentarea'] : 1;
    var country = req.query.n || 0;
    var page = req.query.page || 1;
    if(!comfunc.country_invalidcheck(country) || !comfunc.cityid_invalidcheck(area) || !comfunc.invalidNumberCheck(page)){
        next();
        return false;
    }
    async.parallel({//明星顾问列表
        advisor_list: function (callback) {
            cms.adviser_list({"country":country ,"organid":area,"pagesize": "4", "page":page}, callback);
        }
    }, function (err, result) {

        data.advisor_list = returnData(result.advisor_list,'advisor_list');
        console.log('advisor_list', data.advisor_list)
        data.country=country;
        data.area=area;
        data.cur_page = page;
        //log.info(data.search_adviser_simple);
        data.tdk = {
            pagekey: 'ADVISER', //key
            cityid: area, //cityid
            nationid: country//nationi
        };
        res.render('info_adviser', data);

    });
};
// 参赞引导页
exports.info_canzan_list = function (req, res, next) {
    log.debug(req.params);
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var qianzhengzhinan_currentPage=req.query.page || 1;
    var country = req.query.n || 0;
    var articleId = req.params.id;
    var page =req.query.page || 1;
    var order =req.query.article || 1;
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        data.login_nickname = login_a;
    }
    async.parallel({
        canzanlist:function (callback) {
            cms.canzanlist({
                "usertype":"3",
                "pagesize":4,
                "page": 1
            },callback);
        },
    }, function (err, result){
        data.canzanlist = returnData(result.canzanlist,'canzanlist');
        data.country=country;
        data.route = 'team';
        data.path = 'TEAMDETAIL';
        data.pageroute='team';
        data.area=area;
        data.tdk = {
            pagekey: 'COUNSELLER', //key
            cityid: area, //cityid
            nationid: country//nationi
        };
        res.render('info_canzan', data);
    });
};
/*所有引导页 end*/

//在线评估
exports.online_evaluation = function (req, res, next) {
    log.debug('在线评估')
    var data ={};
   data.tdk = {
        pagekey: 'ONLINE_EVALUATION'
    };
    res.render('online_evaluation', data);
}

//在线评估--移民
exports.online_evaluation_yimin = function (req, res, next) {
  log.debug('在线评估')
  var data ={};
  data.tdk = {
    pagekey: 'ONLINE_EVALUATION'
  };
  res.render('online_evaluation_yimin', data);
}
//金吉列简介
exports.about = function (req, res, next){
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var qianzhengzhinan_currentPage=req.query.page || 1;
    var country = req.query.n || 0;

    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        //log.debug("login_a-------" + login_a.nickname)
        data.login_nickname = login_a;
    }
    async.parallel({

    }, function (err, result){
        log.info(result)
        data.pageroute="about";
        data.tdk = {
            pagekey: 'PROFILE', //key
            cityid: area, //cityid
            nationid: country//nationi
        };
        res.render('about', data);

    });
}