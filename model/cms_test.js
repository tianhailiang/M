var api = require('../model/apiRequest');

var config = require('../config/config');
var log4js = require('../log/log');
var log = log4js.getLogger();

//签证指南
exports.qianzhengzhinan = function (data, callback) {
  var param = {"country": 1, "organid": data.organid, "order": "id", "page": data.page};
  var url = _api_url_path(param, config.apis.get_qianzhengzhinan);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.zuixinzixun = function (data, callback) {
  var param = {"country": 1, "organid": data.organid, "limit": "5"};
  var url = _api_url_path(param, config.apis.get_zuixinzixun);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.huodongyugao = function (data, callback) {
  // var param = {"country": 1, "organid": data.organid, "limit": "5"};
  var url = _api_url_path(data, config.apis.get_huodongyugao);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.mingxingguwen = function (data, callback) {
  // var param = {"country": 1, "organid": data.organid, "pagesize": "5"};
  var url = _api_path_url(data, config.apis.get_mingxingguwen);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 成功案例 chenggonganli
 */
exports.chenggonganli = function (data, callback) {
  var param = {"country": 1, "type": 1, "per_page": "5"};
  var url = _api_path_url_shequ(param, config.apis.get_chenggonganli);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 专家解读
 * @param data
 * @param callback
 */
exports.zhuanjiajiedu = function (data, callback) {
  var param = {"country": 1, "category_id": 16, "type": 2, "per_page": "5"};
  var url = _api_path_url_shequ(param, config.apis.get_zhuanjiajiedu);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 增值服务
 * @param organid: 机构id;
 * @param type_id: 类型id['1' => '金融与保险', '2' => '生活与服务', '3' => '金融与保险'];
 * @param pagesize: 每个类型所取条数;
 */
exports.zengzhifuwu_list = function (callback) {
  var param = {"pagesize": "18"};
  var url = _api_url_path(param, config.apis.get_zengzhifuwu_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * wecenter 公用接口
 * country_id 国家id, 此参数必须第一个传 ，也必须传
 * edu_id 学历id,
 * type 类型id，必须传，1 案例; 2 专栏
 * category_id 栏目id， type=2时需要传， 留学聚焦-11 申请攻略-12 签证指导-13 申请条件-14 留学费用-15 专家解读-16
 * per_page 分页条数， 默认10条
 * page 页码值，默认1
 * organid
 */
exports.wecenter = function (data, callback) {
  var param = {"country_id": 1, "type": 2, "edu_id": "4", "per_page": "5"};
  var url = _api_path_url_shequ(data, config.apis.get_wecenter);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 大学排名
 * @param organid 机构id
 * @param pagesize 左侧6个大学的数量是定死的不用传, pagezise 是针对右侧条数的
 */
exports.daxuepaiming_list = function (callback) {
  var param = {"pagesize": "16"};
  var url = _api_url_path(param, config.apis.get_daxuepaiming_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 留学社区
 * @param country 国家id, 不传为全部
 * @param organid 机构id|城市id 不传为全部
 * @param order 排序, 默认inputtime DESC
 * @param limit 条数, 默认11
 */
exports.liuxueshequ = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 11};
  var url = _api_url_path(param, config.apis.get_liuxueshequ);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 专题
 * @param organid 机构id
 * @param order 排序.默认inputtime DESC
 * @param limit 条数,默认11
 */
exports.zhuanti = function (callback) {
  var param = {"organid": "1", "pagesize": 11};
  var url = _api_url_path(param, config.apis.get_zhuanti);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//精彩专题
exports.jingcaizhuanti = function (callback) {
  var param = {"country": 1, "organid": "1", "limit": 11};
  var url = _api_url_path(param, config.apis.get_jingcaizhuanti);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//留学专题
exports.liuxuezhuanti = function (data,callback) {
  // var param = {"organid": "1", "pagesize": 11};

  var url = _api_url_path(data, config.apis.get_liuxuezhuanti);
  if (url == null){
    callback('404');
    return;
  }
  log.debug(url)
  api.apiRequest(url ,callback);
}

/**
 * 热门专业 remenzhuanye
 * @param country 国家id, 不传默认全部
 * @param organid 机构id, 不传默认全部
 * @param order 排序, 默认inputtime DESC
 * @param limit 条数, 默认11
 *
 */
exports.remenzhuanye = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 11};
  var url = liuxuezhuanti(param, config.apis.get_remenzhuanye);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 热门院校 remenyuanxiao
 * @param country 国家id 不传获取全部
 * @param organid 机构id 不传获取全部
 * @param order 排序,['1'=>'inputtime DESC', '2'=>'hits DESC']
 * @param pagesize 分页条数, 默认11
 * @param page 分页, 当前分页值默认1
 */
exports.remenyuanxiao = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 11};
  var url = _api_url_path(param, config.apis.get_remenyuanxiao);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 专业推荐 zhuanyetuijian
 * @param country 国家id 不传获取全部
 * @param organid 机构id 不传获取全部
 * @param order 排序,['1'=>'inputtime DESC', '2'=>'hits DESC']
 * @param pagesize 分页条数, 默认11
 * @param page 分页, 当前分页值默认1
 */
exports.zhuanyetuijian_list = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 11};
  var param = {"country": "1", "organid": "1", "pagesize": 12};
  var url = _api_url_path(param, config.apis.get_zhuanyetuijian_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.zhuanyetuijian = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 12};
  var url = _api_url_path(param, config.apis.get_zhuanyetuijian);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 院校推荐 yuanxiaotuijian
 * @param country 国家id, 不传默认全部
 * @param organid 机构id, 不传默认全部
 * @param order 排序, 默认inputtime DESC
 * @param limit 条数, 默认11
 */
exports.yuanxiaotuijian_list = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 11};
  var url = _api_url_path(param, config.apis.get_yuanxiaotuijian_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * liuxuezhuanqu_rec 留学专区推荐推荐位
 * @param service 系统　1:pc
 * @param position 页面　home: 首页/分公司首页
 * @param cityid 机构id
 */
exports.liuxuezhuanqu_rec = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuezhuanqu_rec);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * liuxuezhuanqu_country 留学专区国家推荐位
 * @param service 系统　1:pc
 * @param position 页面　home: 首页/分公司首页
 * @param cityid 机构id
 */
exports.liuxuezhuanqu_country = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuezhuanqu_country);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * daxuepaiming_recommend 留学专区大学排名推荐位
 * @param service 系统　1:pc
 * @param position 页面　home: 首页/分公司首页
 * @param cityid 机构id
 */
exports.daxuepaiming_recommend = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_daxuepaiming_recommend);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 拼接接口参数
 * @param data
 * @param url
 * @returns {*}
 * @private
 */
function _api_url_path(data, url) {

  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }
  url += '?';
  for(var item in data){
    url += '&' + item + '=' + data[item];
  }
  log.debug(url);

  return url;
}
function _api_path_url(data, url) {

  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }

  for(var item in data){
    url += '&' + item + '=' + data[item];
  }
  // log.debug(url);

  return url;
}
function _api_path_url_shequ(data, url) {

  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }

  for(var item in data){
    if (item == 'country_id'){
      url += item + '-' + data[item];
    }else{
      url += '__' + item + '-' + data[item];

    }
  }
  log.debug(url);

  return url;
}