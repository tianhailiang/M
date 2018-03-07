/**
 * Created by DXZ-Weijiu.Wang on 2017/8/3.
 */

var moment = require('moment');
var config = require('../config/config');
var common = require('./common');


//demo, only for test.
var cdnhost = config.cdnhost;
var version = config.version;

function strcut(str, count) {
  return str.slice(0, count || 5);
}
function getDefaultFormat (str, count) {
  return moment.unix(str).format(count || 'YYYY-MM-DD');
}

/**
 * 活动url拼装  开发、测试区分
 */
function active_urlgen(){
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
      city = common.getCityEn(cityid);
    }
    if(!cityid && arguments[i] != ''){
      /*过滤默认参数 start*/
      var can_type = arguments[i].split('=')[0];
      var can_val = arguments[i].split('=')[1];
      if (((can_type == 'order') && (can_val == 1 || can_val == 'inputtime' || can_val == 'add_time' ||  can_val == 'inputtime desc' ||  can_val == 'add_time desc')) || ((can_type == 'page') && (can_val == 1)) || ((can_type == 'crowd') && (can_val == 0))  || ((can_type == 'time') && (can_val == 0)) || ((can_type == 'e') && (can_val == 0)) || ((can_type == 'serve') && (can_val == 0)) || ((can_type == 't') && (can_val == 1)) || ((can_type == 'n') && (can_val == 0)) ) {
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

  if (config.version == 'development') { //如果是開發環境
    url = config.wwhost + ':7000' + url;//web
  }
  return url;
}
/**
 * url拼装  开发、测试区分
 */
// function urlgen() {
//   var url = '',chan = '',param = '',nation = '',city = '',nationid='',cityid='';
//   if(arguments.length == 0){
//     return ;
//   }
//   //get chan & subchan
//   for(var i= 0 ; i < arguments.length;i++){
//     if(arguments[i] == '' || arguments[i].split('=').length > 1)
//     {
//       break;
//     }
//     else
//     {
//       chan += '/' + arguments[i];
//     }
//   }
//   // i is hold
//   for(i; i < arguments.length;i++){
//     if (nationid = seo_to_url(arguments[i], 'n')) {
//       nation = common.getCountryEn(nationid);
//     }
//     if (cityid = seo_to_url(arguments[i], 'c')) {
//       if (chan.match(/^\/news(\w*)/) && cityid == 0) { //城市资讯（全国）cityid为0
//         city = 0;
//       }
//       else {
//         city = common.getCityEn(cityid);
//       }
//     }
//     if(!nationid && !cityid && arguments[i] != ''){
//       /*过滤默认参数 start*/
//       var can_type = arguments[i].split('=')[0];
//       var can_val = arguments[i].split('=')[1];
//       if (((can_type == 'order') && (can_val == 1 || can_val == 'inputtime' || can_val == 'add_time' ||  can_val == 'inputtime desc' ||  can_val == 'add_time desc')) || ((can_type == 'page') && (can_val == 1)) || ((can_type == 'crowd') && (can_val == 0))  || ((can_type == 'time') && (can_val == 0)) || ((can_type == 'e') && (can_val == 0)) || ((can_type == 'serve') && (can_val == 0)) || ((can_type == 't') && (can_val == 1)) ) {
//         continue;
//       }
//       /*过滤默认参数 end*/
//       if (param == '') {
//         param += '/' + arguments[i].replace(/=/g, "-");
//       }
//       else {
//         param += '__' + arguments[i].replace(/=/g, "-");
//       }
//     }
//   }
//   if (chan.match(/^(.*)schoollib(.*)$/)) {
//     url += ((nation && nation != 'all')?"/"+nation:"/") + chan.replace(/\//,"") + param + ".html";
//   }
//   else if (chan == '/nationrank') {
//     url += ((nation && nation != 'all')?"/"+nation:"");
//   }
//   else {
//     url += ((city && city != 0)?"/"+city:"") + ((nation && nation != 'all')?"/"+nation:"") + chan + param + ".html";
//   }
//   //url += (city?"/"+city:"") + (nation?"/"+nation:"") + chan + param + ".html";
//   if(url == "/.html"  ||  url=='.html'){
//     url = "/";
//   }
//   if(!exits_static_page(chan + param + ".html")){
//     url = url.replace(/\.html/g, "");
//   }else{
//     if(chan=='/branch_home'){
//       url = url.replace(/branch_home.html/g, "");
//       url = url.replace(/branch_home/g, "");
//     }
//   }
//   //liuxue
//   if (config.version == 'development') { //如果是開發環境
//     url = config.wwhost + ':7000' + url;//web
//   }
//   return url;
// }
function urlgen() {
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
    if (nationid = seo_to_url(arguments[i], 'n')) {
      nation = common.getCountryEn(nationid);
    }
    if (cityid = seo_to_url(arguments[i], 'c')) {
      city = common.getCityEn(cityid);
    }
    if(!cityid && arguments[i] != '') {
      continue;
    }
    if (param == '') {
      param += '/' + arguments[i].replace(/=/g, "-");
    }
    else {
      param += '__' + arguments[i].replace(/=/g, "-");
    }
  }

  url += chan + param;

  if(chan=='/branch_home'){
    url = ((city && city != 0)?"/"+city:"") + (nation?"/"+nation:"") + "/";
  }

  if (config.version == 'development') { //如果是開發環境
    url = config.wwhost + ':7000' + url;//social
  }
  if(url.match(/^(.*)\/article\/(\d+)$/g) || url.match(/^(.*)\/case\/(\d+)$/g)|| url.match(/(culture|events|cooperation|contact|canzan)/)){
    url = url + '.html';
  }
  return url;
}

/**
 * 国家放后面schoolrank
 */
function schoolrankUrlgen() {
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
      nation = common.getCountryEn(nationid);
    }
    if (cityid = seo_to_url(arguments[i], 'c')) {
      if (chan.match(/^\/news(\w*)/) && cityid == 0) { //城市资讯（全国）cityid为0
        city = 0;
      }
      else {
        city = common.getCityEn(cityid);
      }
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
  if (config.version == 'development') { //如果是開發環境
    if( (chan.indexOf('/p/') != -1 || chan.indexOf('/p1/') != -1 || chan.indexOf('/article/') != -1 || chan.indexOf('/case/') != -1 || chan.indexOf('center') != -1 || chan.match(/^\/p$/)) && chan.indexOf('/yimin/')==-1) {
      url = config.wwhost + ':4000' + url;//social
    }
    else {
      url = config.wwhost + ':7000' + url;//web
    }
  }

  return url;
}
/**
 * 国家放后面schoolranknews
 */
function schoolranknewsUrlgen() {
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
      nation = common.getCountryEn(nationid);
    }
    if (cityid = seo_to_url(arguments[i], 'c')) {
      if (chan.match(/^\/news(\w*)/) && cityid == 0) { //城市资讯（全国）cityid为0
        city = 0;
      }
      else {
        city = common.getCityEn(cityid);
      }
    }
    if (detailid = seo_to_url(arguments[i], 'id')) {
      detail = detailid;
    }
    if(!detailid &&!nationid && arguments[i] != ''){
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
  url += chan + param + (detail?"/"+detail:"");
  if (nation && nation != 'all') {
    url = url.replace(/\/news/,'/'+ nation + 'news');
    url = url.replace(/special(?!rank)/,nation + 'special');
  }
  if(detail){
    url += ".html";
  }
  //liuxue
  if (config.version == 'development') { //如果是開發環境
    if( (chan.indexOf('/p/') != -1 || chan.indexOf('/p1/') != -1 || chan.indexOf('/article/') != -1 || chan.indexOf('/case/') != -1 || chan.indexOf('center') != -1 || chan.match(/^\/p$/)) && chan.indexOf('/yimin/')==-1) {
      url = config.wwhost + ':4000' + url;//social
    }
    else {
      url = config.wwhost + ':7000' + url;//web
    }
  }
  return url;
}
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
}

/**
 * 区分静态和伪静态， 伪静态中n变量需要存在不能去掉
 */
function exits_static_page(path) {
  //留学网站伪静态
  //var reg = path.match(/^\/(glue|news|focus|visa|prereq|cost|nation|schoolranknews|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|cases|schoollib|yimin|product|special).html$/g);
  ////栏目页带参数
  //var column_reg = path.match(/^\/(glue|news|focus|visa|prereq|cost|nation|schoolranknews|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|cases|schoollib|yimin|product|special|so_activity|so_case|so_news|so_school|so_advisor)\/(.*).html$/g);

  //栏目列表页带国家的数据
  //var list_reg = path.match(/^\/(\w+)\/(special).html$/g);


  var reg_list = path.match(/^(.*)\/(glue|news|citynews|focus|visa|prereq|cost|nation|schoolranknews|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|cases|schoollib|yimin|product|special|so_activity|so_case|so_news|so_school|so_advisor)(.*).html$/g);
  var reg_detail = path.match(/^(.*)\/(glue|news|citynews|focus|visa|prereq|cost|nation|schoolranknews|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|cases|schoollib|yimin|product|special)\/(\d+).html$/g);

  var rank = path.match(/^(.*)\/(nationrank|schoolrank|specialrank|productrank).html$/g);
  var edu = path.match(/^(.*)\/(under|middle|master|team|canzan|blog).html$/g);
  //社区页面
  //var so_reg = path.match(/^\/(p|p1|case|article)\/(\d+).html$/g);
  var so_reg = path.match(/^\/(p|p1)\/(\d+).html$/g);
  var so_center = path.match(/^\/(advisor_center|canzan_center|user_center|login|register|forget|community_index)(.*).html$/g);//advisor_center
  //移民好文精选
  var yimin_reg = path.match(/^\/(news|case)\/order-hits.html$/g);
  var yimin_list_reg = path.match(/^\/(news|interpret|activity|case).html$/g);

  if(((reg_list && !reg_detail) || so_reg || so_center || yimin_reg || yimin_list_reg || edu) && !rank){
    return false;
  }
  return true;
}

function prefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

/**
 * 用户头像url组装
 * @param uid      用户ID
 * @param size     头像规格（small, middle, big, max） ：max暂未更新，属于顾问专有规格
 * @param status   用户状态，
 * @returns {string}
 */
function avaterimg(uid, size, status, version){
  uid = prefixInteger(uid, 9);
  var dir1 = uid.substr(0, 3);
  var dir2 = uid.substr(3, 2);
  var dir3 = uid.substr(5, 2);
  if(status == 1 || version == 0 || version == null){
    return 'http://images.jjl.cn/avatar/default_avatar_small.jpg'
  }else{
    return config.imageshost + '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substr(-2)+"_avatar_"+size+"_"+ version +".jpg";
  }

}
/*
* 成功案例院校logo
* @param school_id  院校id
* */
function school_logo (school_id) {
  if (school_id == null || school_id == 0 || school_id == undefined || school_id == 'undefined') {
    return config.cdnhost + '/assets/img/default_school_logo.jpg';
  }
  else {
    return config.imageshost + '/content/school/logo_' + school_id + '.jpg';
  }
}

/**
 * 获取页面TDK数据
 * @param page_name   页面标识
 * @param flag        title, keywords, description
 * @returns {*}       string
 */
function pageTDK(flag, tdkParam) {
  //console.log('tdkParam', tdkParam);
  var node_cache = require('memory-cache');
  var tdkData = node_cache.get('pageTDK');
  var tdkDefault = require('../tdk/tdk_conf');
  var tdk_string = '';
  var page_name = tdkParam.pagekey;
  var nationid = tdkParam.nationid;
  var cityid = tdkParam.cityid;
  var title = tdkParam.title;
  var description = tdkParam.description;
  var keywords = tdkParam.keywords;
  var pageNum = tdkParam.pageNum;
  var realname = tdkParam.realname;

  if(!page_name){
    //console.log("page_name is null !");
    tdk_string = tdkDefault.default_tdk[flag];
  }else{
    if(tdkData){
      //console.log("tdkData is not null !");
      if(tdkData[page_name]){
        if(tdkData[page_name][flag]){
          tdk_string = tdkData[page_name][flag];
        }else{
          tdk_string = tdkDefault.default_tdk[flag];
        }
      }else {
        tdk_string = tdkDefault.default_tdk[flag];
      }
    }else {
      //console.log("tdkData is null !");
      tdk_string = tdkDefault.default_tdk[flag];
    }
  }
  var nationName = '', cityName = '';
  if(nationid){
    var nationName = common.getCountryEn(nationid);
  }
  if(cityid){
    var cityName = common.getCityChinese(cityid);
  }
  return tdk_param_replace(tdk_string, nationName, cityName, title, description, keywords, pageNum, realname);
}

function tdk_param_replace(tdk_string, nationName, cityName, title, description, keywords, pageNum, realname) {
  var ret = tdk_string;
  if(nationName){
    ret = ret.replace(/\{nationName\}/g, nationName);
  }else{
    ret = ret.replace(/\{nationName\}/g, "");
  }
  if(cityName){
    ret = ret.replace(/\{cityName\}/g, cityName);
  }else{
    ret = ret.replace(/\{cityName\}/g, "");
  }
  if(title){
    ret = ret.replace(/\{title\}/g, title);
  }else{
    ret = ret.replace(/\{title\}/g, "");
  }
  if(description){
    ret = ret.replace(/\{description\}/g, description);
  }else{
    ret = ret.replace(/\{description\}/g, "");
  }
  if(keywords){
    ret = ret.replace(/\{keywords\}/g, keywords);
  }else{
    ret = ret.replace(/\{keywords\}/g, "");
  }

  //替换字符串中的{realname}
  if(realname){
    ret = ret.replace(/\{realname\}/g, realname);
  }else{
    ret = ret.replace(/\{realname\}/g, "");
  }

  //替换year
  var date=new Date;
  var year=date.getFullYear();
  ret = ret.replace(/\{year\}/g, year);

  if(pageNum){
    if(pageNum > 1){
      ret = ret.replace(/\{pageNum\}/g, pageNum);
    }else{
      ret = ret.replace(/\{pageNum\}/g, "");
    }
  }else{
    ret = ret.replace(/\{pageNum\}/g, "");
  }
  return ret;
}

/**
 * 图片缩略图 拼装
 * @param imageUrl   图片路径
 * @param spec       图片规格
 * @returns {string}
 */
function imageThumb(imageUrl, spec) {
  if(spec){
    return imageUrl + "!" + spec;
  }else {
    return imageUrl;
  }
}

function esiurlformat(args) {
  var chan = '',param = '';
  if(args.length < 2){
    return '';
  }

  //get chan & subchan
  for(var i= 1 ; i < args.length;i++){
    if(args[i].split('=').length > 1)
    {
      chan +=  '?' + args[i];
      break;
    }
    else
    {
      chan += '/' + args[i];
    }
  }

  // i is hold
  for(i+=1; i < args.length;i++){
    param += '&' + args[i];
  }
  return args[0] + '!' + chan + param;
}

function esinclude(){
  return esiurlformat(arguments);
}

function getLink(pageKey) {
  var node_cache = require('memory-cache');
  var tdkLink = node_cache.get('pageLink');
  console.log('友情链接',tdkLink)
  if(tdkLink && tdkLink[pageKey]){
    return tdkLink[pageKey];
  }else{
    return "";
  }
}

module.exports = {
  cut: strcut ,
  getDefault: getDefaultFormat,
  urlgen: urlgen,
  active_urlgen: active_urlgen,
  schoolrankUrlgen: schoolrankUrlgen,
  schoolranknewsUrlgen: schoolranknewsUrlgen,
  avaterimg: avaterimg,
  cdnhost: config.cdnhost,
  version: config.version,
  pageTDK:pageTDK,
  imageThumb:imageThumb,
  include: esinclude,
  school_logo: school_logo,
  getLink: getLink,
  wwhost: config.wwhost
};
