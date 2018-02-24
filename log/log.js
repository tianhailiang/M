
var env = process.env.NODE_ENV || 'development';

if(env == 'production'){
  var log4js = require('./prod.config');
}else{
  var log4js = require('./dev.config');
}

module.exports = log4js;