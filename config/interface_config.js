/**
 * Created by DXZ-Shuqin.Wang on 2018/4/8.
 */
var redisCache = {
    "host": "jjl-redis.3p6fml.0001.cnn1.cache.amazonaws.com.cn",
    "port":6379
};
var wwhost = 'http://m.jjl.cn';
var yiminhostname = 'yimin.jjl.cn';
var cdnhost = 'http://cdn3.jjl.cn';
var imageshost = 'http://images.jjl.cn';
var prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/cms/api/';
var uc_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/uc/api/';
var shequ_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/so/?/api/';
if (process.env.NODE_ENV == 'development') {
    cdnhost = 'http://m.jjl.cn:7000';
}
else if (process.env.NODE_ENV == 'production') {
    cdnhost = 'http://cdn3.jjl.cn';
}
module.exports = {
    redisCache:redisCache,
    domain:domain,
    wwhost:wwhost,
    yiminhostname:yiminhostname,
    cdnhost:cdnhost,
    prefix:prefix,
    uc_prefix:uc_prefix,
    shequ_prefix:shequ_prefix,
    imageshost:imageshost
}