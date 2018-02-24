var apiconfig = require('../config/config');

var prefix = apiconfig.UrlPath.prefix;
var format = apiconfig.UrlPath.format;

//lists 通用接口
exports.lists = prefix + '/api/lists' + format;
exports.sql = prefix + '/api/sql' + format;
exports.zhuanquLists = prefix + '/api/zhuanquLists' + format;