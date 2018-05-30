var api = require('../model/apiRequest');
var config = require('../config/config');
var log4js = require('../log/log');
var log = log4js.getLogger();

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
  for (var item in data) {
    url += '&' + item + '=' + data[item];
  }
  return url;
}

function _api_url_path2(data, url) {

  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }
  for (var item in data) {
    url += '&' + item + '=' + data[item];
  }
  return url;
}
function _api_path_url_shequ(data, url) {

  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }

  for (var item in data) {
    if (item == 'country') {
      url += item + '-' + data[item];
    } else {
      url += '__' + item + '-' + data[item];

    }
  }
  return url;
}


exports.city_list = function (callback) {
  var url = _api_url_path([], config.apis.get_city_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

exports.city_guwen = function (callback) {
  var url = _api_url_path([], config.apis.get_city_guwen);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

exports.hot_search = function (callback) {
  var param = {"catid": "222", "order": "listorder DESC", "limit": "4"};
  var url = _api_url_path(param, config.apis.get_hot_search);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuejiaodian = function (callback) {
  var param = {"catid": "152", "order": "id DESC", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuejiaodian);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

exports.liuxuezhuanqu_recommend_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "limit": "18"}
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_recommend_middle = function (callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_recommend_school_rank = function (callback) {
  var param = {"catid": "76", "order": "inputtime DESC", "limit": "7"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_school_rank);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_recommend_zq_scholarship = function (data, callback) {
  var param = {"catid": "40", "area": 1, "order": "id DESC", "limit": "6"};

  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_zq_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_mg_left = function (data, callback) {
  var param = {
    "catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 1, "limit": "18"
  }
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_mg_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_mg_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 1, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_mg_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_mg_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 1, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_mg_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_yg_left = function (data, callback) {
  var param = {
    "catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 2, "limit": "18"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yg_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_yg_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 2, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yg_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_yg_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 2, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yg_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_jnd_left = function (data, callback) {
  var param = {
    "catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 3, "limit": "18"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_jnd_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_jnd_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 3, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_jnd_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_jnd_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 3, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_jnd_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_az_left = function (data, callback) {
  var param = {
    "catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 4, "limit": "18"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_az_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_az_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 4, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_az_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_az_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 4, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_az_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_xxl_left = function (data, callback) {
  var param = {
    "catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 5, "limit": "18"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_xxl_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_xxl_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 5, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_xxl_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_xxl_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 5, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_xxl_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_yz_left = function (data, callback) {
  var param = {
    "catid": "40", "order": "listorder DESC, inputtime DESC", "where": "countrytype>=8 AND countrytype<=12",
    "area": data.area, "limit": "18"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yz_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_yz_middle = function (data, callback) {
  var param = {
    "catid": "51", "order": "listorder DESC, inputtime DESC", "where": "country>5 AND country<100", "area": data.area,
    "limit": "9"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yz_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_yz_scholarship = function (callback) {
  var param = {
    "catid": "25", "order": "listorder DESC, inputtime DESC", "where": "country>5 AND country<100", "thumb": 1,
    "limit": "6"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yz_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_oz_left = function (data, callback) {
  var param = {
    "catid": "40", "order": "listorder DESC, inputtime DESC", "where": "countrytype>=13 AND countrytype<=26",
    "area": data.area, "limit": "18"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_oz_left);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_oz_middle = function (data, callback) {
  var param = {
    "catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "where": "country>=100", "limit": "9"
  };
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_oz_middle);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuxuezhuanqu_oz_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 5, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_oz_scholarship);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.liuXueGuWen = function (callback) {
  var param = {
    "sql": 'SELECT t1.name, t1.head_pic, t1.head_bigpic, t1.country_id, t1.description, t1.url FROM bc_zixunguwen t1 LEFT JOIN bc_arealist t2 ON t1.area = t2.suoxie WHERE t2.id = 1 AND t1.is_delete = 0 AND t1.recommend IS NOT NULL AND t1. STATUS IN (99, 98) AND (t1.offlinetime >= sysdate() or t1.offlinetime = 0 or t1.offlinetime is NULL) ORDER BY t1.recommend ASC',
    "limit": "11"
  };
  var url = _api_url_path(param, config.apis.get_liuXueGuWen);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.meiTiBaoDao = function (data, callback) {
  var param = {"catid": "37", "order": "inputtime DESC", "area": data.area, "thumb": "1", "limit": "15"};
  var url = _api_url_path(param, config.apis.get_meiTiBaoDao);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

exports.shenqingfangan_recommend = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_recommend);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shenqingfangan_mg = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC", "country": "3379", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_mg);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shenqingfangan_yg = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC", "country": "3386", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_yg);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shenqingfangan_jnd = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC", "country": "3387", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_jnd);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shenqingfangan_az = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC", "country": "3388", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_az);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shenqingfangan_xxl = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC", "where": "country=3443", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_xxl);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shenqingfangan_yz = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC", "country": "3389", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_yz);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shenqingfangan_oz = function (callback) {
  var param = {"catid": "146", "order": "listorder DESC, id DESC", "country": "3390", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_oz);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
// exports.liuxuehuodong = function (data, callback) {
//   var param = {"catid":"156", "area": data.area, "order": "lecture_date DESC"};
//   var url = _api_url_path(param, config.apis.get_liuxuehuodong);
//   if (url == null){
//     callback('404');
//     return;
//   }
//   api.apiRequest(url ,callback);
// }

//最新资讯
exports.zuixinzixun_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_zuixinzixun_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.zuixinzixun = function (data, callback) {


  //var param = {"country": 1, "organid": data.organid, "limit": "5"};

  var url = _api_url_path(data, config.apis.get_zuixinzixun);


  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.huodongyugao = function (data, callback) {
  // var param = {"country": 1, "organid": data.organid, "limit": "5"};
  var url = _api_url_path(data, config.apis.get_huodongyugao);
  if (url == null) {
    callback('404');
    return;
  }

  api.apiRequest(url, callback);
}
exports.mingxingguwen = function (data, callback) {
  // var param = {"country": 1, "organid": data.organid, "pagesize": "5"};
  var url = _api_url_path(data, config.apis.get_mingxingguwen);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.chenggonganli = function (data, callback) {
  //var param = {"country": 1, "type": 1, "per_page": "5"};
  var url = _api_url_path(data, config.apis.get_chenggonganli);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);

}
exports.zhuanjiajiedu = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_zhuanjiajiedu);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shengqinganli_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_shengqinganli_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//栏目列表页---->栏目
exports.channel_list = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_channel_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//栏目综合页---->栏目］留学奖学金
exports.liuxuejiangxuejin_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuejiangxuejin_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//栏目综合页---->留学方案（不带学历）
exports.liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuefangan_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//栏目综合页---->［栏目］媒体播报
exports.meitibobao_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_meitibobao_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//栏目综合页---->［栏目］留学常见问题
exports.lxcjquestion_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_lxcjquestion_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//学历频道页-------留学常见问题
exports.lxcjquestion = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_lxcjquestion);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//产品频道----> 最新留学方案（带学历）
exports.hot_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_hot_liuxuefangan_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//产品频道----> 最新留学方案初始化接口
exports.new_liuxuefangan_init = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_new_liuxuefangan_init);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//栏目综合页---->详情页通用接口
exports.detail = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_detail);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//栏目综合页---->［栏目］国家介绍
exports.country_introduce_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_country_introduce_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//国家频道---->国家介绍
exports.country_introduce = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_country_introduce);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

exports.contact_way_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_contact_way_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

exports.memorabilia_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_memorabilia_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

exports.company_culture_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_company_culture_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.business_cooperation_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_business_cooperation_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * 留学活动列表
 * @param callback
 */
exports.activity_list = function (param, callback) {
  var url = _api_url_path(param, config.apis.get_activity_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * 文案团队列表
 * @param callback
 */
exports.wenantuandui_list = function (param, callback) {
  //var param = {"country":"1", "page":"1", "pagesize":10};
  var url = _api_url_path(param, config.apis.get_wenantuandui_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * 专业推荐 zhuanyetuijian
 * @param country 国家id 不传获取全部
 * @param organid 机构id 不传获取全部
 * @param order 排序,['1'=>'inputtime DESC', '2'=>'hits DESC']
 * @param pagesize 分页条数, 默认11
 * @param page 分页, 当前分页值默认1
 */
exports.zhuanyetuijian_list = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "pagesize": 12};
  var url = _api_url_path(data, config.apis.get_zhuanyetuijian_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};
exports.zhuanyetuijian = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 12};
  var url = _api_url_path(param, config.apis.get_zhuanyetuijian);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * 热门院校 remenyuanxiao
 * @param country 国家id 不传获取全部
 * @param organid 机构id 不传获取全部
 * @param order 排序,['1'=>'inputtime DESC', '2'=>'hits DESC']
 * @param pagesize 分页条数, 默认11
 * @param page 分页, 当前分页值默认1
 */
exports.remenyuanxiao = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "limit": 11};
  var url = _api_url_path(data, config.apis.get_remenyuanxiao);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//国家频道---》留学方案
exports.country_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_country_liuxuefangan_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//学历频道 ---》热门留学方案
exports.hot_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_hot_liuxuefangan_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//产品频道----> 最新留学方案（带学历）
exports.new_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_new_liuxuefangan_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}


//产品频道 ----> 亚洲 欧洲 聚合
exports.countryLiuxuefanganRecommend = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_countryLiuxuefanganRecommend);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//搜索结果（案例）
exports.searchcase = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_search_case);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};
//搜索结果（顾问）
exports.searchadviser = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_search_adviser);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};
//搜索结果（活动）
exports.searchactivity = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_search_activity);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};
//搜索结果（资讯）
exports.searcharticle = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_search_article);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};
//搜索结果（院校）
exports.searchschool = function (data, callback) {
  var url =  _api_url_path(data, config.apis.get_search_school);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};
//顾问聚合页
exports.adviser_list = function (data, callback) {
  var url = _api_url_path2(data, config.apis.get_adviser_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};

exports.zhuanyetuijian = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "limit": 12};
  var url = _api_url_path(data, config.apis.get_zhuanyetuijian);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
/**
 * 大学排名
 * @param organid 机构id
 * @param pagesize 左侧6个大学的数量是定死的不用传, pagezise 是针对右侧条数的
 */
exports.daxuepaiming = function (param, callback) {
  var url = _api_url_path(param, config.apis.get_daxuepaiming);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
/**
 * 院校排名快讯
 */
exports.daxuepaiming_news = function (param, callback) {
  var url = _api_url_path(param, config.apis.get_daxuepaiming_news);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//精彩专题
exports.jingcaizhuanti = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "limit": 11};
  var url = _api_url_path(data, config.apis.get_jingcaizhuanti);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * 增值服务
 * @param organid: 机构id;
 * @param type_id: 类型id['1' => '金融与保险', '2' => '生活与服务', '3' => '金融与保险'];
 * @param pagesize: 每个类型所取条数;
 */
exports.zengzhifuwu_list = function (param, callback) {
  var url = _api_url_path(param, config.apis.get_zengzhifuwu_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/*
 精彩专题频道du
 */
exports.zhuanti = function (param, callback) {
  //var param = {"organid": "1", "pagesize": 6};
  var url = _api_url_path(param, config.apis.get_zhuanti);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}


/*
 * 近期精彩活动列表
 */
exports.new_jingcaihuodong_list = function (data, callback) {

  var url = _api_url_path(data, config.apis.get_new_jingcaihuodong_list);

  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);

}


//顾问文章 
exports.wecenter = function (data, callback) {
  //var param = {"country_id": 1, "type": 2, "edu_id": "4", "per_page": "15"};
  var url = _api_url_path(data, config.apis.get_wecenter);

  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}


/**
 * 大学排名列表
 * @param organid 机构id
 * @param pagesize 左侧6个大学的数量是定死的不用传, pagezise 是针对右侧条数的
 */
exports.daxuepaiming_list = function (param, callback) {
  var url = _api_url_path(param, config.apis.get_daxuepaiming_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}


/*
 * 近期精彩活动列表
 */
var adRedisPool = require('redis-connection-pool')('pageAdvertCache', {
  host: config.redisCache.host,
  port: config.redisCache.port || 6379,
  max_clients: config.redisCache.max || 30,
  perform_checks: false,
  database: 7 // database number to use
});
exports.lunbo_list = function (data, callback) {
  adRedisPool.get('WEB:ADVERT:LUNBO:'+data.cityid+'_'+data.ad_page+'_'+data.ad_seat,function(err, reply) {
    if (reply) {
      var res = JSON.parse(reply);
      callback(null, res);
    }
    else {
      var url = _api_url_path(data, config.apis.get_lunbo_list);
      if (url == null) {
        callback('404');
        return;
      }
      api.apiRequest(url, callback);
    }
  })
}
/*登录*/
exports.login_ss = function (data, callback) {
  log.debug(222);
  var url = config.apis.post_login;
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest_post(url, data, callback);
}

/*绑定手机号*/
exports.bind_phone = function (data, callback) {
  var url = config.apis.bind_phone;
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest_post(url, data, callback);
}

/*注册*/
exports.register_ss = function (data, callback) {
  var url = config.apis.post_register;
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest_post(url, data, callback);
}

/*发送手机验证码*/
exports.sendcode_ss = function (data, callback) {
  var url = _api_url_path(data, config.apis.sendcode);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/*忘记密码*/
exports.forget = function (data, callback) {
  var url = config.apis.forget;
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest_post(url, data, callback);
}

/**
 * 分公司首页--->媒体播报
 * @param data
 * @param callback
 */
exports.meitibobao = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_meitibobao);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};

/**
 * 分公司首页--->增值服务
 * @param data
 * @param callback
 */
exports.zengzhifuwu = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_zengzhifuwu);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};

/**
 * 分公司首页--->留学社区
 * @param data
 * @param callback
 */
exports.liuxueshequ = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_home_liuxueshequ);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};

/**
 * 分公司首页--->留学聚焦
 * @param data
 * @param callback
 */
exports.liuxuejujiao = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_home_liuxuejujiao);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};

/**
 * 文章底页网站--->
 * @param data
 * @param callback
 */
exports.wenzhangdiye = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_wenzhangdiye);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
/**
 * 文章底页社区--->
 * @param data
 * @param callback
 */
exports.shequwenzhang = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_shequwenzhang);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
/**
 * liuxuezhuanqu_rec 留学专区推荐推荐位
 * @param service 系统　1:pc
 * @param position 页面　home: 首页/分公司首页
 * @param cityid 机构id
 */
exports.liuxuezhuanqu_rec = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuezhuanqu_rec);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * liuxuezhuanqu_country 留学专区国家推荐位
 * @param service 系统　1:pc
 * @param position 页面　home: 首页/分公司首页
 * @param cityid 机构id
 */
exports.liuxuezhuanqu_country = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuezhuanqu_country);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * daxuepaiming_recommend 留学专区大学排名推荐位
 * @param service 系统　1:pc
 * @param position 页面　home: 首页/分公司首页
 * @param cityid 机构id
 */
exports.daxuepaiming_recommend = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_daxuepaiming_recommend);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.company_culture_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_company_culture_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
/**
 * 关于我们联系我们--->
 * @param data
 * @param callback
 */
exports.contact = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_contact);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//企业文化--媒体播报
exports.media_broadcast = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_media_broadcast);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//大事记
//get_company_culture_list
exports.memorabilia_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_memorabilia_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//大学排名  新的
exports.schoolnew = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_schoolnew);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//近期活动预告
exports.jinqihuodongyugao = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_jinqihuodongyugao);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//相关推荐方案
exports.xiangguanfangan = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_xiangguanfangan);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//参赞列表
exports.canzanlist = function (data, callback) {
  var url = _api_url_path2(data, config.apis.get_canzanlist);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民案例底页
exports.yiminanlidiye = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminanlidiye);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//移民案例列表
exports.yiminanlist = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminanlist);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}


//移民-国家介绍
exports.yimin_nation_introduce = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_imminationlist);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//移民专家解读
exports.yiminzhuanjiajiedu = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminzhuanjiajiedu);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民专家解读落地页(rongfa)
exports.yimin_zhuanjiajiedu = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminzhuanjiajiedudiye);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民-国家频道-活动预告
exports.yimin_activity_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_immiactivitylist);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民资讯
exports.yiminzixun = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminzixun);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民好文精选
exports.yiminhaowenjingxuan = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminhaowenjingxuan);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民顾问
exports.yiminguwen = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminguwen);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民文章底页
exports.yiminwenzhangdiye = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminwenzhangdiye);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民顾问底页
exports.yiminguwendiye = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminguwendiye);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民--活动底页
exports.yimin_activity_detail= function (data, callback) {
  var url = _api_url_path(data, config.apis.get_activity_detail);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//移民案例搜索
exports.yimin_so_case = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yimin_so_case);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//移民资讯搜索
exports.yimin_so_news = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yimin_so_news);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//移民解读搜索
exports.yimin_so_interpret = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yimin_so_interpret);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//移民项目频道页面
exports.yiminproduct = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminproduct);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//移民国家介绍落地页
exports.yimin_nation_detail = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_yiminnationdetail);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//移民轮播图片
exports.lunbo_list1 = function (data, callback) {
    var url = _api_url_path(data, config.apis.get_lunbo_list1);
    if (url == null) {
        callback('404');
        return;
    }
    api.apiRequest(url, callback);
}

//uc接口代理封装
exports.ucapi_agent = function(data,callback){
  var url = _api_url_path(data, config.apis.get_ucapi_agent);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//uc接口代理封装+index.php
exports.ucapi_agent_common = function(data,callback){
  var url = _api_url_path(data, config.apis.get_ucapi_agent_common);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//获取用户信息（普通用户，顾问，参赞）
 exports.userinfo = function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.get_userinfo);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//参赞专栏
 exports.user_article_list = function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.user_article_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//顾问底页
exports.user_detail = function(data,callback){
  var url = _api_url_path(data, config.apis.get_user_detail);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 第三方登录接口调用封装
 * @param data
 * @param callback
 */
exports.oauth = function (data, callback) {
  var url = _api_url_path(data, config.apis.oauth);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
// 文章详情
exports.article = function(data,callback){
    var url = _api_path_url_shequ(data, config.apis.get_article);
    if (url == null){
        callback('404');
        return;
    }
    api.apiRequest(url ,callback);
};
exports.article = function(data,callback){
    var url = _api_path_url_shequ(data, config.apis.get_article);
    if (url == null){
        callback('404');
        return;
    }
    api.apiRequest(url ,callback);
};
//学历频道页五大攻略
exports.edu_strategy = function (data, callback) {
    var url = _api_url_path(data, config.apis.get_edu);
    if (url == null) {
        callback('404');
        return;
    }
    api.apiRequest(url, callback);
}

var redisPool = require('redis-connection-pool')('home_all_city_id', {
  host: config.redisCache.host,
  port: config.redisCache.port || 6379,
  max_clients: config.redisCache.max || 30,
  perform_checks: false,
  database: 7 // database number to use
});

exports.mShouye = function (data, callback) {
  //redis 缓存文章浏览数````·
  //判断用户访问是否在限制条件内 10min 5
    log.debug('city_id ',data.city_id,'country_id ',data.country_id)
    redisPool.get('home_' + data.city_id+'_'+data.country_id, function(err, reply){
      if(reply){
        callback(null, reply);
      }else{
        callback(null, '暂无数据');
      }
    })
}
exports.mYiminShouye = function (data, callback) {
  //redis 缓存文章浏览数````·
  //判断用户访问是否在限制条件内 10min 5
    redisPool.get('yimin_home_' +data.country_id, function(err, reply){
      if(reply){
        callback(null, reply);
      }else{
        callback(null, '暂无数据');
      }
    })
}

// 顾问主页列表
exports.adviser_main=function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.adviser_main);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//顾问加载更多
exports.loadmore =function(req,res,next){
  var data = req.query;
  cms.adviser_main(data,function(err,result){
     if(err){
       res.send(err);
     }else{
       res.send(result);
     }
   })
}
