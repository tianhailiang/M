var rewrite = require('express-urlrewrite');
var URL = require('url');
var config = require('../config/config');

function url_rewrite(app) {
  //yimin url rewrite
  url_yiminrewrite(app);
  url_decode(app);
}

function url_yiminrewrite(app) {
  app.use(function(req, res, next) {
    if(req.hostname == config.yiminhostname){
      var url = req.url;
      req.url = req.originalUrl = '/yimin' + url;
      next('route');
    }
    else
    {
      next();
    }
  });
}

function url_decode(app) {
  app.use(function(req, res, next) {
    var url = req.url;
    req.url = req.originalUrl = url.replace(".html","");
    req.query = URL.parse(req.url, true).query;
    next('route');
  });
}

function replaceChat(source,pos,newChar){
  if(pos<0||pos>=source.length||source.length==0){
    return "invalid parameters...";
  }
  var iBeginPos= 0, iEndPos=source.length;
  var sFrontPart=source.substr(iBeginPos,pos);
  var sTailPart=source.substr(pos+1,source.length);
  var sRet=sFrontPart+newChar+sTailPart;
  return sRet;
}

/**
 * 过滤不需要转换的url
 * @param url
 */
function urlIndexOf(url) {
  if(url.indexOf("=-") < 0 && url.indexOf(".css") < 0 && url.indexOf(".js") < 0 && url.indexOf(".jpg") < 0 && url.indexOf(".png") < 0 && url.indexOf("login?h") < 0 && (url.indexOf("-") >= 0 || url.indexOf("__") >= 0)){
    url = url.replace(/-/g, "=");
    url = url.replace(/__/g, "&");
    var pos = url.lastIndexOf("/");
    url = replaceChat(url, pos, "?");
    url = url.replace(/&\?/,"&");
  }
  return url;
}

module.exports = url_rewrite;
