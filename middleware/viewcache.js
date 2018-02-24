/**
 * Created by Winson on 2017/12/6.
 */
'use strict';

var redisPool = null;

function redispoolinit(config){
  redisPool = require('redis-connection-pool')('fragmentCache', {
    host: config.redis,
    port: config.port || 6379,
    max_clients: config.max || 30,
    perform_checks: false,
    database: 0, // database number to use
    // options: {
    //   auth_pass: 'password'
    // }
  });
}

function viewcache(config) {
  if(config === null || config.redis === null || config.redis === undefined) {
    next();
  }

  if(redisPool === null) redispoolinit(config);

  return (req, res, next) => {
    let urikey = '';
    const prefix = 'view:fragment:';

    //cache use: get and response
    if(req.originalUrl.indexOf('/fragment/') >= 0){
      urikey = prefix + req.originalUrl ;
      const origsend = res.send.bind(res);
      redisPool.get(urikey, (err, reply)=>{
        if(!err && reply !== null) {
          console.log('url cached:',urikey);
          return res.send(reply);
        }

        //in head is mico-second,but redis is second
        res.send = (body) => {
          let expval = res.get('maxAge') || 60000;//ms
          expval = expval / 1000;
          // console.log('url send expval:',expval,urikey);
          redisPool.set(urikey, body, ()=>{
            //default set 60 second, min 10s
            console.log('url cache set ok!');
            redisPool.expire(urikey, expval>10 ?expval:60);
          })
          origsend(body);
          return this;
        }
        //not cache go on.
        next();
      })
    }
    else {
      next();
    }
  }
};

module.exports = viewcache;