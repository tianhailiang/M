var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes/fragrouter.js');
var customfilters = require('./common/filters');
var helper = require('./common/helper');
var log4js = require('./log/log');
var app = express();

var config = require('./config/config');
var viewcache = require('./middleware/viewcache');

// if(process.env.NODE_ENV == 'production'){
//   //生产环境时 记录日志
//   app.use(log4js.connectLogger(log4js.getLogger(), { level: log4js.levels.INFO, format:':method :url' }));
// }
var viewspath = 'views';
if(process.env.NODE_ENV == 'production'){
  viewspath = 'dist/views'
}

app.set('views', path.join(__dirname, viewspath));

var env = nunjucks.configure(viewspath, {
  autoescape: true
});

// viewcache
app.use(viewcache({
  redis: config.redisCache.host,
  port:config.redisCache.port,
  max:100 //max connection in redispool
}));

//---
app.set('view engine', 'html');
customfilters.load(env);
app.locals.helper = helper;
env.express(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/dep', express.static(path.join(__dirname, 'public/dep')));


router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
