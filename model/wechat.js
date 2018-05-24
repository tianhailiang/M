const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 3600, checkperiod: 3600});//3600秒后过过期
const request = require('request');
var log4js = require('../log/log');
var log = log4js.getLogger();
/*
 * 获取access_token Promise
 */
exports.get_access_token =function(grant_type, appid, secret){
	return new Promise((resolve, reject) => {
		cache.get('access_token', function(err, data){
		  	if(!err && data){
		  		log.debug('从缓存中读取access_token: ',data)
		  		resolve(data);
		  	}else{
		  		request('https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grant_type + '&appid=' + appid + '&secret=' + secret, (err, response, body) => {
			      let access_token = JSON.parse(body).access_token;
			      log.debug('从服务器中读取access_token: ' + access_token);
			      if(access_token){
			        cache.set('access_token', access_token, (err, success) => {
			        });
			        resolve(access_token);
			      }else{
			      	reject(err);
			      }
			    });
		  	}
		});
		
	})
}

/*
 * 获取jsapi_ticket
 */
exports.get_jsapi_ticket = function(access_token){
 	return new Promise((resolve, reject) => {
	 	//读取缓存
		cache.get('jsapi_ticket', function(err, data){
			if(!err && data){
				log.debug('从缓存中读取jsapi_ticket: ',data)
		  		resolve(data);
	  		}else{
		  		request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ access_token +'&type=jsapi', (err, response, body) => {
			        let jsapi_ticket = JSON.parse(body).ticket;
			        log.debug('从服务器中读取jsapi_ticket: ' + jsapi_ticket);
			        if(jsapi_ticket){
				        cache.set('jsapi_ticket', jsapi_ticket, (err, success) => {
			        	});
			        	resolve(jsapi_ticket);
			      	}else{
			      		reject(err);
			      	}
			    });
	  		}
	  	});
 	});
}