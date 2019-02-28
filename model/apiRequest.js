var request = require('request');
var apiconfig = require('../config/config');
var RedisCache = require("node-cache-redis");
var cache = new RedisCache(apiconfig.redisCache);
var log4js = require('../log/log');
var log = log4js.getLogger();

//新版本
//request connection pool;
var separateDefPool = {maxSockets: 200};
var httpRequest = function(requrl, callback){

  // if(separateDefPool === undefined || separateDefPool.maxSockets === undefined){
  //   separateDefPool = {maxSockets: 200};
  // }
  request.get({url: requrl, pool: separateDefPool}, function (err, response, receiveData){
    log.info(requrl)
    if (!err && response.statusCode == 200) {
      var res = JSON.parse(receiveData);
      callback(null, res);
    }else if( response !== undefined && response !== null && response.statusCode != 200) {
      var err_msg = "接口地址："+requrl+"，HTTP 请求错误, response状态码："+response.statusCode;
      log.error(err_msg);
      callback(null, []);
    }else if(err){
      var err_msg = "接口地址："+requrl+"，请求异常, 错误提示："+err;
      log.error(err_msg);
      callback(null, []);

    }
  });
}

/**
 * 统一数据请求处理方法
 * @param url
 * @param callback
 * @param cacheKey 缓存键 如果为空默认为不缓存数据(ES6 中函数默认参数特性,可以赋默认值)
 */
var apiRequest = function (url, callback, isCache = 0, cacheKey = "") {
  // log.debug("apiRequest==="+isCache);
  if(isCache === 1 && cacheKey !== ""){
    cache.get(cacheKey).then(function (cacheValue) {
      // log.debug("成功获取缓存数据");
      // log.debug(cacheValue);
      if (cacheValue && cacheValue != null) {
        callback(null, cacheValue);
      } else {
        // log.debug("data===iscache:"+isCache+", cachekey:"+cacheKey);
        httpRequest(url, callback);
      }
    })
  }else{
    httpRequest(url, callback);
  }
}

/**
 * 统一数据请求处理方法
 * @param url  请求url
 * @param callback   回调
 * @param data 请求数据
 */
var apiRequest_post = function (url, data, callback) {
  log.info(url)
  console.log('data+++++++', data)
  request.post({url:url, form:data}, function (err, response, receiveData) {
    if (!err && response.statusCode == 200) {
      callback(null, JSON.parse(receiveData));
    }else if(response !== null && response !== undefined && response.statusCode != 200) {
      var err_msg = "接口地址："+url+"，HTTP 请求错误, response状态码："+response.statusCode;
      log.error(err_msg);
      callback(null, []);
    }else if(err){
      var err_msg = "接口地址："+url+"，请求异常, 错误提示："+err;
      log.error(err_msg);
      callback(null, []);
    }

  });
}

exports.apiRequest = apiRequest;
exports.apiRequest_post = apiRequest_post;
