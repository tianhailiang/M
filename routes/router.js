/**
 * Created by Winson on 17/7/4.
 */
var controller = require('./controller.js');
exports = module.exports = function (app) {// routes
  //首页 home 
  app.get('/',controller.home);
  app.get(/^\/(bj|cd|cq|cs|cc|cz|dl|dg|fs|fz|gz|gy|hz|hf|heb|hs|hd|hn|jn|jl|km|lz|ly|nj|nc|nb|nn|qd|shz|sh|sy|sjz|sz|tj|ty|ts|hk|wh|wx|wz|xa|xm|xz|xn|xj|yt|ych|yc|zz)(\/*)((?!activity)[a-z]*)(\/*)$/, controller.home);
  //移民首页
  app.get(/^\/yimin(\/*)(.*)(\/*)/,controller.yimin_home);
  //城市切换页
  app.get('/city',controller.city);
  //国家频道页 nationrank
  app.get(/^\/((?!yimin)usa|uk|canada|australia|newzealand|korea|japan|singapore|malaysia|hongkong|russion|ukraine|belarus|germany|france|norway|sweden|finland|ireland|netherlands|denmark|italy|spain|switzerland|greece|malta|portugal|cyprus|antigua|dominica|saintkitts|grenada)(\/*)$/, controller.nationrank);
  //搜索页
  app.get(/^\/so_activity(\/*)((?![0-9])[0-9A-Za-z\-_%~'!@#$^&*()-+=:]*)$/,controller.so_activity);//搜索页面
  app.get(/^\/so_news(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/,controller.search_news);//搜索结果资讯
  app.get(/^\/so_adviser(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/,controller.search_advisor);//搜索结果顾问
  //app.get('/so_advisor',controller.search_advisor);//顾问搜索结果
  //学历频道页
  app.get(/^(\/!*)([a-z]*)\/under$/, controller.channel_edu_graduate_under);//学历频道页--本科
  app.get(/^(\/!*)([a-z]*)\/middle$/, controller.channel_edu_graduate_middle);//学历频道页--中小学
  app.get(/^(\/!*)([a-z]*)\/master$/, controller.channel_edu_graduate_master);//学历频道页--研究生
  /*所有引导页路由 start===========================================================================*/
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_news(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_news);  //最新资讯引导页
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_cases(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_cases);//成功案例引导页
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_product(\/*)((?!rank)(?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_product);//留学方案引导页
  app.get(/^(\/*)([a-z]*)\/info_schoollib(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_schoollib);//院校list院校库列表引导页
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_visa(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_visa);//签证指导引导页
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_cost(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_cost);//留学费用引导页
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_school(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_school);//大学排名引导页
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_glue(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_glue);//申请攻略
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_prereq(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_prereq_list); //申请条件
  app.get(/^(\/*)((?!yimin)[a-z]*)\/info_activity(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.info_study_abroad_activity); //留学活动
  app.get('/info_adviser', controller.info_advisor_list);//明星顾问列表页
  app.get('/info_canzan', controller.info_canzan_list);//参赞列表
  /*所有引导页路由 end*/


  /*所有栏目页路由 start===========================================================================*/
  app.get(/^(\/*)([a-z]*)\/adviser(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.advisor_list);//明星顾问列表页
  app.get('/canzan', controller.canzan_list);//参赞列表
  //最新资讯
  app.get(/^(\/*)((?!yimin)[a-z]*)\/news(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.news_list);
  //留学费用
  app.get(/^(\/*)([a-z]*)\/cost(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.cost_list);
  //签证指导
  app.get(/^(\/*)([a-z]*)\/visa(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.visa_list);
  //申请攻略
  app.get(/^(\/*)([a-z]*)\/glue(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.glue_list);
  //申请条件
  app.get(/^(\/*)([a-z]*)\/prereq(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.prereq_list);
  //大学排名
  app.get(/^\/schoolrank\/school([a-z]*)(\/*)((?!lib)(?![0-9])[0-9A-Za-z\-_]*)$/, controller.school_list);//大学排名list
  app.get(/^(\/*)([a-z]*)\/schoollib(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.schoollib);//院校list院校库列表
  //留学活动
  app.get(/^\/(bj|cd|cq|cs|cc|cz|dl|dg|fs|fz|gz|gy|hz|hf|hd|heb|hs|hn|jn|jl|km|lz|ly|nj|nc|nb|nn|qd|sh|sy|sjz|shz|sz|tj|ty|ts|wh|wx|wz|xa|xm|xz|xn|xj|yt|yc|ych|zz)\/activity(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/, controller.study_abroad_activity);
  app.get(/^(\/*)([a-z]*)\/case(\/*)((?![0-9])[0-9A-Za-z\-_]*)$/, controller.successful_case);//成功案例
  app.get(/^(\/*)((?!yimin)[a-z]*)\/product(\/*)((?!rank)(?![0-9])[0-9A-Za-z\-_]*)$/, controller.product);//留学方案栏目
  /*所有栏目页路由 end*/

  /*所有底页路由 start===========================================================================*/
  app.get(/^\/(\d+)(\/*)$/, controller.adviser_detail);
  app.get(/^\/(\d+)\/case/, controller.adviser_detail_case);
  app.get(/^\/(\d+)\/hot/, controller.adviser_detail_jinxuan);

  app.get('/article/:id', controller.news_detail);//文章底页
  app.get('/case/:id', controller.case_detail);//案例底页
  // app.get(/^(\/*)([a-z]*)\/news\/(\d+)/, controller.news_detail);//最新资讯底页
  app.get(/^(\/*)([a-z]*)\/glue\/(\d+)/,controller.gluedetail); //申请攻略落地页
  app.get(/^(\/*)([a-z]*)\/visa\/(\d+)/, controller.visadetail); //签证指导落地页
  app.get(/^(\/*)([a-z]*)\/prereq\/(\d+)/, controller.prereqdetail); //申请条件落地页
  app.get(/^(\/*)([a-z]*)\/cost\/(\d+)/, controller.costdetail); //留学费用落地页
  app.get(/^\/schoolrank\/school([a-z]*)\/(\d+)/, controller.schooldetail);//落地頁大学排名
  app.get('/canzan/:id', controller.canzan_column);//参赞底页（专栏）
  app.get(/^(\/*)([a-z]*)schoollib\/(\d+)/, controller.schoollibdetail);//院校文章底页
  app.get(/^(\/*)([a-z]*)\/product\/(\d+)/,controller.productdetail);//落地页留学方案
  /*所有底页路由 end*/
  app.get('/online_evaluation',controller.online_evaluation);
  app.get('/online_evaluation_yimin',controller.online_evaluation_yimin);
  /*
   *  uc接口封装 index.php
   */
  app.get('/ucapi/ucapi_agent', controller.ucapi_agent);
  app.get('/ucapi/ucapi_agent_common', controller.ucapi_agent_common);
  //浏览量接口
  app.get('/cmsapi/article_count', controller.article_count);
  /* 
   * cms 资讯列表 接口封装
   */
  app.get('/cmsapi/more_news', controller.more_news);//最新资讯更多
  app.get('/cmsapi/more_school', controller.more_school);//大学排名更多
  app.get('/cmsapi/more_cost', controller.more_cost);//留学费用更多
  app.get('/more/adviser', controller.advisor_list_moer);//明星顾问列表加载更多
  app.get('/cmsapi/more_daxuepaiming', controller.more_daxuepaiming);//院校库加载更多
  app.get('/cmsapi/more_activity', controller.more_activity);//活动加载更多
  app.get('/cmsapi/more_case', controller.more_case);//成功案例更多
  app.get('/cmsapi/more_product', controller.more_product);//留学方案更多
  app.get('/cmsapi/more_so_news', controller.more_so_news);//搜索资讯更多
  app.get('/cmsapi/more_so_advisor', controller.more_so_advisor);//搜索顾问更多
  app.get('/about', controller.about);//金吉列简介
  app.get('/act_form', controller.act_form);//活动表单
  app.get('/soapi/loadmore',controller.loadmore); //顾问加载更多
  //微信token 认证
  app.post('/wxJssdk/getJssdk',controller.wxtoken);
  app.get(/^\/(bj|cd|cq|cs|cc|cz|dl|dg|fs|fz|gz|gy|hz|hf|hd|heb|hs|hn|jn|jl|km|lz|ly|nj|nc|nb|nn|qd|sh|sy|sjz|shz|sz|tj|ty|ts|wh|wx|wz|xa|xm|xz|xn|xj|yt|yc|ych|zz)\/activity\/(\d+)/,controller.activity_detail);
  app.get('/search_activity',controller.search_activity)
};


