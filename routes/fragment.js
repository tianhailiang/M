/**
 * Created by Winson on 2017/12/1.
 */
var cms = require('../model/cms');
var log4js = require('../log/log');
var log = log4js.getLogger();
var async = require('async');

function  returnData(obj,urlName){
  if(obj.code==0){
    return obj.data;
  }else{
    log.error(urlName,obj);
    return {};
  }
}
function split_array(arr, len) {
  var a_len = arr.length;
  var result = [];
  for (var i = 0; i < a_len; i += len) {
    result.push(arr.slice(i, i + len));
  }
  return result;
}

exports.list_public = function (req, res, next) {
  //预约活动
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  async.parallel({
    //成功案例
    chenggonganli_public: function (callback) {
      cms.channel_list({
        "country_id": 0,
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
        "country": 0,
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
        "country": 0,
        "page": 1,
        "perpage": 5
      }, callback);
    }
  }, function (err, result) {

    data.chenggonganli_public = returnData(result.chenggonganli_public,'chenggonganli_public');
    data.zuixinhuodong_public= returnData(result.zuixinhuodong_public,'zuixinhuodong_public');
    data.schoolpaiming_public = returnData(result.schoolpaiming_public,'schoolpaiming_public');
    res.set('maxAge',1*60*1000);
    res.render('./fragment/list_public', data);

  })
};