function normalize(value, defaultValue) {
  if(value === null || value === undefined || value === false) {
    return defaultValue;
  }
  return value;
}

function invalidDataCheck(value) {
  if(value === null || value === undefined || value === false) {
    return false;
  }
  return true;
}

const INVALID_ID = 99900000000;

function invalidNumberCheck(value) {
  if(value === null || value === undefined || value >= INVALID_ID || value < 0) {
    return false;
  }
  return true;
}

var __countryArr_ = {
    "0": ["全部", "all"],
    "1": ["美国", "usa"],
    "2": ["英国", "uk"],
    "3": ["加拿大", "canada"],
    "4": ["澳大利亚", "australia"],
    "5": ["新西兰", "newzealand"],
    "50": ["韩国", "korea"],
    "51": ["日本", "japan"],
    "52": ["新加坡", "singapore"],
    "53": ["马来西亚", "malaysia"],
    "54": ["中国香港", "hongkong"],
    "100": ["俄罗斯", "russion"],
    "101": ["乌克兰", "ukraine"],
    "102": ["白俄罗斯", "belarus"],
    "103": ["德国", "germany"],
    "104": ["法国", "france"],
    "105": ["挪威", "norway"],
    "106": ["瑞典", "sweden"],
    "107": ["芬兰", "finland"],
    "108": ["爱尔兰", "ireland"],
    "109": ["荷兰", "netherlands"],
    "110": ["丹麦", "denmark"],
    "111": ["意大利", "italy"],
    "112": ["西班牙", "spain"],
    "113": ["瑞士", "switzerland"],
    "7": ["希腊", "greece"],
    //移民新增（澳洲用网站的澳大利亚）
    "8": ["马耳他", "malta"],
    "10": ["葡萄牙", "portugal"],
    "11": ["塞浦路斯", "cyprus"],
    "12": ["安提瓜", "antigua"],
    "13": ["多米尼克", "dominica"],
    "14": ["圣基茨", "saintkitts"],
    "15": ["格林纳达", "grenada"]
    //移民新增国家end
};

/*
 * param：国家id，
 * return：国家中文
 */
function getCountryChinese(id) {
  var obj = normalize(__countryArr_[id],__countryArr_[0]);
  return obj[0];
}

/*
 * param：国家id，
 * return：国家英文缩写
 */
function getCountryEn(id) {
  var obj = normalize(__countryArr_[id],__countryArr_[0]);
  return obj[1];
}

/*
 * param：国家英文缩写
 * return：国家id
 * INvalid: -1
 */
function getCountryId(name) {
  for (var key in __countryArr_) {
    if(__countryArr_[key][1] == name || __countryArr_[key][0] == name){
      return key;
    }
  }
  //invalid,default:??? -1
  return INVALID_ID;
}

var __cityArr_ = {
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
};

/*
 * param：cityid，
 * return：city中文
 */
function getCityChinese(id){
  var obj = normalize(__cityArr_[id],__cityArr_[1]);
  return obj[0];
}

/*
 * param：cityid，
 * return：city缩写
 */
function getCityEn(id){
  var obj = normalize(__cityArr_[id],__cityArr_[1]);
  return obj[1];
}

/*
 * param：city name，
 * return：cityid
 */
function getCityId(name) {
  for (var key in __cityArr_) {
    if(__cityArr_[key][1] == name || __cityArr_[key][0] == name){
      return key;
    }
  }
  //invalid,default:???
  return INVALID_ID;
}

var __education_ = {
  "0": "全部",
  "1": "本科",
  "2": "研究生",
  "19": "中小学",
  "4": "预科"
};
//根据id获取学历名
function getEduName(id) {
  return normalize(__education_[id],__education_[0]);
}

var __crowd_ = {
  "0": "全部",
  "1": "中小学",
  "2": "本科",
  "3": "研究生",
  "4": "硕博"
};
//根据id获取学历名
function getCrowdName(id) {
  return normalize(__crowd_[id],__crowd_[0]);
}

var __yimin_project_ = {
  "1":"投资移民",
  "2":"创业移民",
  "3":"技术移民",
  "4":"留学移民",
  "5":"杰出人才移民",
  "6":"团聚移民",
  "7":"购房移民",
  "8":"国债移民",
  "9":"护照项目"
};

function getProjectName(id) {
  return normalize(__yimin_project_[id],__yimin_project_[0]);
}

/*
 * 国家和学历对应关系
 * */
var __country_edu_ = {
  "1":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "2":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "3":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "4":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "5":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "50":{
    "1":"本科",
    "2":"研究生"
  },
  "51":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "52":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "53":{
    "1":"本科",
    "2":"研究生"
  },
  "54":{
    "1":"本科",
    "2":"研究生",
    "4":"预科"
  },
  "100":{
    "1":"本科",
    "19":"中小学",
    "4":"预科"
  },
  "101":{
    "1":"本科",
    "4":"预科"
  },
  "102":{
    "1":"本科",
    "4":"预科"
  },
  "103":{
    "1":"本科",
    "2":"研究生",
    "19":"中小学",
    "4":"预科"
  },
  "104":{
    "1":"本科",
    "2":"研究生",
    "4":"预科"
  },
  "105":{
    "1":"本科",
    "2":"研究生"
  },
  "106":{
    "1":"本科",
    "2":"研究生"
  },
  "107":{
    "1":"本科",
    "2":"研究生"
  },
  "108":{
    "1":"本科",
    "2":"研究生"
  },
  "109":{
    "1":"本科",
    "2":"研究生"
  },
  "110":{
    "1":"本科",
    "2":"研究生"
  },
  "111":{
    "1":"本科",
    "2":"研究生"
  },
  "112":{
    "1":"本科",
    "2":"研究生"
  },
  "113":{
    "1":"本科",
    "2":"研究生"
  }
};

function getCountryEdu (countryId, eduId) {
  if (__country_edu_[countryId][eduId]) {
    return true;
  }
  else {
    return false;
  }
}
/*
 * ok: true
 * */
function cityid_invalidcheck(id) {
  return invalidDataCheck(__cityArr_[id]);
}

function country_invalidcheck(id) {
  console.log('country_invalidcheck:  ' + id);
  return invalidDataCheck(__countryArr_[id]);
}

function edu_invalidcheck(id) {
  return invalidDataCheck(__education_[id]);
}

function ymproject_invalidcheck(id) {
  return invalidDataCheck(__yimin_project_[id]);
}

/**
 * 处理国家英文转换ID
 * @param countryParams
 * @returns {number}
 */
function getCountryIdParams(countryParams) {
  var country = 0;
  if(countryParams){
    var countryId = getCountryId(countryParams);
    if(countryId && countryId !== INVALID_ID) {
      country = countryId;
    }
  }
  return country;
}

/**
 * 处理栏目列表参数
 * @param req_query order-views__page-1
 * @returns {Array}
 */
function getReqQuery(req_query) {
  //参数处理
  //var req_query = req.params[3];
  var nquery = [];
  if(req_query !== ""){
    console.log("query", req_query);
    //order-views
    var req_query = req_query.split("__");
    for(var i in req_query){
      var arr = req_query[i].split("-");
      nquery[arr[0]] = arr[1];
    }
  }
  return nquery;
}

/*
 * api 接口返回数据格式化
 * @param code
 * @param message
 * @param data
 */
function api_return(code, message, data){
  return {'code':code, 'message':message, 'data':data};
}

module.exports = {
  getCountryChinese: getCountryChinese ,
  getCountryId: getCountryId,
  getCountryEn: getCountryEn,
  getCityChinese: getCityChinese,
  getCityId: getCityId,
  getCityEn:getCityEn,
  getEduName: getEduName,
  getCrowdName: getCrowdName,
  getCountryEdu: getCountryEdu,
  getProjectName:getProjectName,
  cityid_invalidcheck:cityid_invalidcheck,
  country_invalidcheck: country_invalidcheck,
  edu_invalidcheck: edu_invalidcheck,
  ymproject_invalidcheck: ymproject_invalidcheck,
  invalidNumberCheck: invalidNumberCheck,
  INVALID_ID: INVALID_ID,
  getCountryIdParams: getCountryIdParams,
  getReqQuery: getReqQuery,
  api_return: api_return
};
