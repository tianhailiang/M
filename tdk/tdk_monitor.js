var redis = require("redis");
var node_cache = require('memory-cache');
var config = require('../config/config');

var client = redis.createClient(config.redisCache.port, config.redisCache.host);
var client1 = redis.createClient(config.redisCache.port, config.redisCache.host);

getRedisData();
put_cache();

function put_cache() {
  //订阅前要先从redis获取最后更新数据
  client1.select('2', function(error){
    client1.get('WEB:TDK:tdk', function(error, res){
      if(error){
        console.log(error);
      }else{
        //更新node cache 缓存
        //console.log(JSON.parse(res));
        node_cache.put('pageTDK', JSON.parse(res));
      }
    });
  });
}

function getRedisData() {
  //客户端连接redis成功后执行回调
  client.on("ready", function () {
    //订阅消息
    client.subscribe("WEB:TDK:tdk_message");
    //client.subscribe("chat1");
    console.log("订阅成功。。。");
  });

  client.on("error", function (error) {
    console.log("Redis Error " + error);
  });

  //监听订阅成功事件
  client.on("subscribe", function (channel, count) {
    console.log("client subscribed to " + channel + "," + count + "total subscriptions");
  });

  //收到消息后执行回调，message是redis发布的消息
  client.on("message", function (channel, message) {
    console.log("我接收到信息了" + message);
    //dealWithMsg(message);
    //更新node cache 缓存
    node_cache.put('pageTDK', JSON.parse(message));
  });

  //监听取消订阅事件
  client.on("unsubscribe", function (channel, count) {
    console.log("client unsubscribed from" + channel + ", " + count + " total subscriptions")
  });
}

function dealWithMsg(message) {
  //按照message查询内容
  client1.zscore("z", message, function (err, reply) {
    console.log(message + "的内容是：" + reply);
  });
}

exports.tdk_data = getRedisData;
