var log4js = require('log4js');
// 本地开发时不记录日志，
//just-errors level设置的级别过滤 
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    'just-errors': { 
      type: 'logLevelFilter',
      appender: 'out', 
      level: 'debug' 
    }
  },
  categories: {
    default: { appenders: ['just-errors'], level: 'debug' },
  }
});

module.exports = log4js;