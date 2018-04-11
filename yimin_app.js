/**
 * Created by DXZ-Shuqin.Wang on 2018/3/12.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes/yimin_router.js');
var customfilters = require('./common/filters');
var helper = require('./common/helper');
var tdk_monitor = require('./tdk/tdk_monitor');
var app = express();

var esinc = require('./middleware/esitag')(nunjucks);
var midesi = require('./middleware/midesi');
var config = require('./config/config');
var viewcache = require('./middleware/viewcache');
var url_rewrite = require("./middleware/url_decode");
var esihelper = require('./middleware/esihelper');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
// view engine setup
var viewspath = 'views';
if(process.env.NODE_ENV == 'production'){
    viewspath = 'dist/views'
}

app.set('views', path.join(__dirname, viewspath));
var env = nunjucks.configure(viewspath, {
    autoescape: true
});
//add esinc
env.addExtension('esinc', new esinc());
app.use(midesi({
    fragserver: 'http://127.0.0.1',
    port:'3500'
}));

app.set('view engine', 'html');
customfilters.load(env);
app.locals.helper = helper;
env.express(app);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,limit:"2048kb" }));
app.use(cookieParser());

if(process.env.NODE_ENV == 'development'){
  app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
  app.use('/dep', express.static(path.join(__dirname, 'public/dep')));
}else if(process.env.NODE_ENV == 'production'){
  app.use('/assets', express.static(path.join(__dirname, 'dist/public/assets')));
  app.use('/dep', express.static(path.join(__dirname, 'dist/public/dep')));
}

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
    var data = [];
    data.esikey = esihelper.esikey();
    data.tdk = {
        pagekey: 'ERROR'
    };
    res.render('error',data);
});

module.exports = app;
