/**
 *
 * @type {{host: string, port: number}}
 */
'use strict';

const redisCache = {
  "host": "jjl-redis.3p6fml.0001.cnn1.cache.amazonaws.com.cn",
  "port": 6379
};

var wwhost = 'http://mm.jjlvip.cn';
var yiminhostname = 'yimin.jjlvip.cn';
// var cdnhost = 'http://192.168.100.84:7000';
var cdnhost = 'http://mm.jjlvip.cn:7000';
var imageshost = 'http://images.jjl.cn';
var prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/cms/api/';//'http://cmsapi.jjlvip.cn/api/';
var uc_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/uc/api/';
var shequ_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/so/?/api/';//http://soapi.jjlvip.cn/?/api/';

var apis = {
  "oauth": uc_prefix + 'index.php',
  "bind_phone": uc_prefix + 'index.php?m=bind_phone',// 绑定手机号
  "forget": uc_prefix + 'index.php?m=forgetpassword',//忘记密码
  "sendcode": uc_prefix + 'index.php',//发送手机验证码
  "post_login": uc_prefix + 'index.php?m=login',//登录
  "post_register": uc_prefix + 'index.php?m=register',//注册
  "lists": prefix + 'lists',
  "get_city_list": prefix + 'city_list',
  "get_city_guwen": prefix + 'city_guwen',
  "get_liuxuejiaodian": prefix + 'lists',
  "get_hot_search": prefix + 'lists',
  "get_liuxuezhuanqu_recommend_left": prefix + 'lists',
  "get_liuxuezhuanqu_recommend_middle": prefix + 'zhuanqu_content',
  "get_liuxuezhuanqu_recommend_school_rank": prefix + 'lists',
  "get_liuxuezhuanqu_recommend_zq_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_mg_left": prefix + 'lists',
  "get_liuxuezhuanqu_mg_middle": prefix + 'lists',
  "get_liuxuezhuanqu_mg_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_yg_left" : prefix + 'lists',
  "get_liuxuezhuanqu_yg_middle": prefix + 'lists',
  "get_liuxuezhuanqu_yg_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_jnd_left" : prefix + 'lists',
  "get_liuxuezhuanqu_jnd_middle": prefix + 'lists',
  "get_liuxuezhuanqu_jnd_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_az_left" : prefix + 'lists',
  "get_liuxuezhuanqu_az_middle": prefix + 'lists',
  "get_liuxuezhuanqu_az_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_xxl_left" : prefix + 'lists',
  "get_liuxuezhuanqu_xxl_middle": prefix + 'lists',
  "get_liuxuezhuanqu_xxl_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_yz_left" : prefix + 'lists',
  "get_liuxuezhuanqu_yz_middle": prefix + 'lists',
  "get_liuxuezhuanqu_yz_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_oz_left" : prefix + 'lists',
  "get_liuxuezhuanqu_oz_middle": prefix + 'lists',
  "get_liuxuezhuanqu_oz_scholarship": prefix + 'lists',
  "get_liuXueGuWen": prefix + 'sql',
  "get_meiTiBaoDao": prefix + 'lists',
  "get_shenqingfangan_recommend": prefix + 'fangan_recommend',
  "get_shenqingfangan_mg": prefix + 'fangan_country',
  "get_shenqingfangan_yg": prefix + 'fangan_country',
  "get_shenqingfangan_jnd": prefix + 'fangan_country',
  "get_shenqingfangan_az": prefix + 'fangan_country',
  "get_shenqingfangan_xxl": prefix + 'fangan_country',
  "get_shenqingfangan_yz": prefix + 'fangan_country',
  "get_shenqingfangan_oz": prefix + 'fangan_country',
  //"get_liuxuehuodong": prefix + 'liuxuehuodong',

  //最新资讯栏目页
  "get_zuixinzixun_list": prefix + 'zuixinzixun_list',
  //最新咨询侧边推荐
  "get_zuixinzixun": prefix + 'common_recommend',
  //活动预告
  "get_huodongyugao": prefix + 'common_recommend',
  //明星顾问
  "get_mingxingguwen": prefix + 'common_recommend',
  //栏目列表
  "get_channel_list": shequ_prefix + 'article/list/',
  //成功案例侧栏
  "get_chenggonganli": prefix + 'common_recommend',
  //专家解读
  "get_zhuanjiajiedu": prefix + 'common_recommend',
  //金牌顾问
  "get_wecenter":prefix + 'common_recommend',
  //增值服务
  "get_zengzhifuwu_list": prefix + 'zengzhifuwu_list',
  //大学排名
  "get_daxuepaiming": prefix + 'common_recommend',
  //院校排名快讯栏目
  "get_daxuepaiming_news": prefix + 'paiming_news_list',
  //大学排名列表
  "get_daxuepaiming_list": prefix + 'daxuepaiming_list',
  //留学社区
  "get_liuxueshequ": prefix + 'liuxueshequ',
  //留学聚焦
  "get_liuxuejujiao": prefix + 'common_recommend',
  //专题
  "get_zhuanti": prefix + 'common_recommend',
  //留学专题
  "get_liuxuezhuanti": prefix + 'liuxuezhuanti',
  //精彩专题
  "get_jingcaizhuanti": prefix + 'jingcaizhuanti',
  //热门专业
  "get_remenzhuanye": prefix + 'remenzhuanye',
  //专业推荐
  "get_zhuanyetuijian_list": prefix + 'zhuanyetuijian_list',
  "get_zhuanyetuijian": prefix + 'common_recommend',
  //热门院校
  "get_remenyuanxiao": prefix + 'common_recommend',
  //院校推荐
  "get_yuanxiaotuijian_list": prefix + 'yuanxiaotuijian_list',
  //首页---->申请案例
  "get_shengqinganli_list": prefix + 'shengqinganli_list',
  //栏目综合页---->栏目］留学奖学金
  "get_liuxuejiangxuejin_list": prefix + 'liuxuejiangxuejin_list',
  //栏目综合页---->留学方案（不带学历）
  "get_liuxuefangan_list": prefix + 'liuxuefangan_list',
  //栏目综合页---->［栏目］媒体播报
  "get_meitibobao_list": prefix + 'meitibobao_list',
  //栏目综合页---->［栏目］留学常见问题
  "get_lxcjquestion_list": prefix + 'lxcjquestion_list',
  //学历频道页---->留学常见问题
  "get_lxcjquestion": prefix + 'common_recommend',
  //产品频道----> 最新留学方案初始化接口
  "get_new_liuxuefangan_init": prefix + 'new_liuxuefangan_init',
  //栏目综合页---->详情页通用接口
  "get_detail": prefix + 'detail',
  //栏目综合页---->［栏目］国家介绍
  "get_country_introduce_list": prefix + 'country_introduce_list',
  //国家频道---->国家介绍
  //"get_country_introduce": prefix + 'country_introduce',
  "get_country_introduce": prefix + 'common_recommend',
  "get_contact_way_list": prefix + 'contact_way_list',
  //大事记
  "get_memorabilia_list": prefix + 'memorabilia_list',
  "get_company_culture_list": prefix + 'company_culture_list',
  //企业文化--媒体播报
  "get_media_broadcast": prefix + 'common_recommend',
  "get_business_cooperation_list": prefix + 'business_cooperation_list',
  //留学活动列表
  "get_liuxuehuodong_list": prefix + 'liuxuehuodong_list',
  //文案团队
  "get_wenantuandui_list": prefix + 'wenantuandui_list',
  //国家频道---》留学方案
  //"get_country_liuxuefangan_list": prefix + 'country_liuxuefangan_list',
  "get_country_liuxuefangan_list": prefix + 'common_recommend',
  //学历频道 ---》热门留学方案
  "get_hot_liuxuefangan_list": prefix + 'common_recommend',
  //产品频道----> 最新留学方案（带学历）
  "get_new_liuxuefangan_list": prefix + 'new_liuxuefangan_list',
  //产品频道----> 亚洲 欧洲 聚合
  "get_countryLiuxuefanganRecommend":prefix + 'countryLiuxuefanganRecommend',
  //近期精彩活动
  "get_new_jingcaihuodong_list":prefix + "newshuodong",
  //活动预告
  "huodongyugao": prefix + 'huodongyugao',
  //页面轮播图
  "get_lunbo_list": prefix + 'lunbo_list',
  //分公司首页----》媒体播报
  "get_meitibobao": prefix + 'common_recommend',
  //分公司首页----》增值服务
  "get_zengzhifuwu": prefix + 'common_recommend',
  //分公司首页----》留学社区
  "get_home_liuxueshequ": prefix + 'liuxueshequ',
  //分公司首页----》留学聚焦
  "get_home_liuxuejujiao": prefix + 'common_recommend',
  //发布文章
  "post_publish_article": shequ_prefix + 'publish/publish_article/',
  //首页留学专区推荐
  "get_liuxuezhuanqu_rec": prefix + 'liuxuezhuanqu_rec',
  //首页留学专区推荐位
  "get_liuxuezhuanqu_country": prefix + 'liuxuezhuanqu_country',
  //首页推荐位－>l大学排名推荐位
  "get_daxuepaiming_recommend": prefix + 'daxuepaiming_recommend',
  //文章底页
  "get_wenzhangdiye": prefix + 'detail',
  //社区文章底页
  "get_shequwenzhang": "http://test.wecenter.com/?/api/article/",

  //搜索结果页（案例）
  "get_search_case": shequ_prefix + 'search/search_case/',
  //搜索结果页（顾问）
  "get_search_adviser": shequ_prefix + 'search/search_adviser/',
  //搜索结果页（活动）
  "get_search_activity": shequ_prefix + 'search/search_activity/',
  //搜索结果页（资讯）
  "get_search_article": shequ_prefix + 'search/search_article/',
  //搜索结果页（院校）
  "get_search_school": prefix + 'yuanxkList',
  //顾问聚合页
 // "get_search_adviser_simple": shequ_prefix + 'search/search_adviser_simple/',换接口
  "get_adviser_list":uc_prefix+'index.php?m=getguwenlist',

  //关于我们(联系我们)
  "get_contact": prefix + 'contact_way_list',
  //商务合作
  "get_cooperations": prefix + 'sign_up_way',
  //大学排名 新的
  "get_schoolnew": prefix + 'daxuepaiming_new',
  //近期活动预告
  "get_jinqihuodongyugao": prefix + 'huodongyugao',
  //相关方案推荐
  "get_xiangguanfangan": prefix + 'relevantFangan',
  //参赞列表
  "get_canzanlist":uc_prefix+'index.php?m=userlist',
  //移民案例接口
  "get_yiminanlist": prefix + 'immi_case_list',
 //移民-国家介绍
  "get_imminationlist": prefix + 'immi_nation_list',
  //移民-国家频道-活动预告
  "get_immiactivitylist": prefix + 'immi_activity_list',
  //移民案例底页接口
  "get_yiminanlidiye": prefix + 'immi_case_detail',
    //移民案例底页接口
  "get_yiminguwendiye": prefix + 'immi_adviser_detail',
  //移民专家解读
  "get_yiminzhuanjiajiedu": prefix + 'immi_interpret_list',
  //移民资讯
  "get_yiminzixun": prefix + 'immi_news_list',
  //移民好文精选
  "get_yiminhaowenjingxuan": prefix + 'immi_choice_list',
  //移民顾问
  "get_yiminguwen": prefix + 'immi_adviser_list',
  //移民文章底页
  "get_yiminwenzhangdiye": prefix + 'immi_news_detail',
  //移民--活动底页
  "get_activity_detail":prefix+'immi_activity_detail',
  //移民案例搜索结果
  "get_yimin_so_case": prefix + 'immi_search_case',
  //移民资讯搜索结果
  "get_yimin_so_news": prefix + 'immi_search_news',
  //移民资讯搜索结果
  "get_yimin_so_interpret": prefix + 'immi_search_interpret',
  //移民项目频道页
  "get_yiminproduct": prefix + 'immi_project_detail',
  "get_yiminnationdetail":prefix+'immi_nation_detail',
  //移民专家解读底页
  "get_yiminzhuanjiajiedudiye": prefix + 'immi_interpret_detail',
  //移民轮播接口
  "get_lunbo_list1": prefix + 'immi_poster',
  //uc接口封装
  "get_ucapi_agent": uc_prefix,
  //uc接口封装+index.php
  "get_ucapi_agent_common": uc_prefix + 'index.php',
  // 获取用户信息（普通用户，顾问，参赞）
  "get_userinfo": shequ_prefix + 'account/info/' ,
  // 获取用户信息（普通用户，顾问，参赞）
  "get_user_detail": uc_prefix + 'index.php',
  //文章详情
  "get_article":shequ_prefix + 'article/',
  //参赞专栏
  "user_article_list": shequ_prefix + 'account/user_article_list/',
  //学历频道页五大攻略
  "get_edu":prefix + 'common_sense',
};
module.exports = {
  redisCache: redisCache,
  apis : apis,
  wwhost: wwhost,
  cdnhost: cdnhost,
  yiminhostname: yiminhostname,
  imageshost: imageshost
};
