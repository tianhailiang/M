/**
 *
 * @type {{host: string, port: number}}
 */
'use strict';

const redisCache = {
  "host": "localhost",
  "port":6379
};

var prefix = 'http://i.php_node_js.com:3000/mock/api/';

var apis = {
  "lists": prefix + 'lists.json',
  "get_city_list": prefix + 'city_list.json',
  "get_city_guwen": prefix + 'city_guwen.json',
  "get_liuxuejiaodian": prefix + 'liuxuejiaodian.json',
  "get_hot_search": prefix + 'hot_search.json',
  "get_liuxuezhuanqu_recommend_left": prefix + 'liuxuezhuanqu_recommend_left.json',
  "get_liuxuezhuanqu_recommend_middle": prefix + 'liuxuezhuanqu_recommend_middle.json',
  "get_liuxuezhuanqu_recommend_school_rank": prefix + 'liuxuezhuanqu_recommend_school_rank.json',
  "get_liuxuezhuanqu_recommend_zq_scholarship": prefix + 'liuxuezhuanqu_recommend_zq_scholarship.json',
  "get_liuxuezhuanqu_mg_left": prefix + 'liuxuezhuanqu_mg_left.json',
  "get_liuxuezhuanqu_mg_middle": prefix + 'liuxuezhuanqu_mg_middle.json',
  "get_liuxuezhuanqu_mg_scholarship": prefix + 'liuxuezhuanqu_mg_scholarship.json',
  "get_liuxuezhuanqu_yg_left" : prefix + 'liuxuezhuanqu_yg_left.json',
  "get_liuxuezhuanqu_yg_middle": prefix + 'liuxuezhuanqu_yg_middle.json',
  "get_liuxuezhuanqu_yg_scholarship": prefix + 'liuxuezhuanqu_yg_scholarship.json',
  "get_liuxuezhuanqu_jnd_left" : prefix + 'liuxuezhuanqu_jnd_left.json',
  "get_liuxuezhuanqu_jnd_middle": prefix + 'liuxuezhuanqu_jnd_middle.json',
  "get_liuxuezhuanqu_jnd_scholarship": prefix + 'liuxuezhuanqu_jnd_scholarship.json',
  "get_liuxuezhuanqu_az_left" : prefix + 'liuxuezhuanqu_az_left.json',
  "get_liuxuezhuanqu_az_middle": prefix + 'liuxuezhuanqu_az_middle.json',
  "get_liuxuezhuanqu_az_scholarship": prefix + 'liuxuezhuanqu_az_scholarship.json',
  "get_liuxuezhuanqu_xxl_left" : prefix + 'liuxuezhuanqu_xxl_left.json',
  "get_liuxuezhuanqu_xxl_middle": prefix + 'lists.json',
  "get_liuxuezhuanqu_xxl_scholarship": prefix + 'liuxuezhuanqu_xxl_scholarship.json',
  "get_liuxuezhuanqu_yz_left" : prefix + 'liuxuezhuanqu_yz_left.json',
  "get_liuxuezhuanqu_yz_middle": prefix + 'liuxuezhuanqu_yz_middle.json',
  "get_liuxuezhuanqu_yz_scholarship": prefix + 'liuxuezhuanqu_yz_scholarship.json',
  "get_liuxuezhuanqu_oz_left" : prefix + 'liuxuezhuanqu_oz_left.json',
  "get_liuxuezhuanqu_oz_middle": prefix + 'liuxuezhuanqu_oz_middle.json',
  "get_liuxuezhuanqu_oz_scholarship": prefix + 'liuxuezhuanqu_oz_scholarship.json',
  "get_liuXueGuWen": prefix + 'liuXueGuWen.json',
  "get_meiTiBaoDao": prefix + 'meiTiBaoDao.json',
  "get_shenqingfangan_recommend": prefix + 'shenqingfangan_recommend.json',
  "get_shenqingfangan_mg": prefix + 'shenqingfangan_mg.json',
  "get_shenqingfangan_yg": prefix + 'shenqingfangan_yg.json',
  "get_shenqingfangan_jnd": prefix + 'shenqingfangan_jnd.json',
  "get_shenqingfangan_az": prefix + 'shenqingfangan_az.json',
  "get_shenqingfangan_xxl": prefix + 'shenqingfangan_xxl.json',
  "get_shenqingfangan_yz": prefix + 'shenqingfangan_yz.json',
  "get_shenqingfangan_oz": prefix + 'shenqingfangan_oz.json',
  "get_liuxuehuodong": prefix + 'liuxuehuodong.json',


};
module.exports = {
  redisCache: redisCache,
  apis : apis,
};