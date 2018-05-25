var log4js = require('log4js');
//生产环境 不打印到控制台 记录到日志文件 日志文件以每天记录到一个文件 
//just-errors level设置的级别过滤 
log4js.configure({
  appenders: {
    task: {
      type: 'dateFile',
      filename: './logdata/community',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    emergencies: { 
      type: 'dateFile',
      filename: './logdata/panic-now.log' 
    },
    'just-errors': { 
      type: 'logLevelFilter',
      appender: 'emergencies', 
      level: 'error' 
    }
  },
  categories: {
    default: { appenders: ['task','just-errors'], level: 'debug' },
  },
  pm2: true,
  disableClustering: true
});

module.exports = log4js;