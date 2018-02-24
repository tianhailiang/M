var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes/router.js');
var customfilters = require('./common/filters');
var helper = require('./common/helper');
var app = express();
var esinc = require('./middleware/esitag')(nunjucks);
var midesi = require('./middleware/midesi');
var config = require('./config/config');
var viewcache = require('./middleware/viewcache');
var url_rewrite = require("./middleware/url_decode");

var tdk_monitor = require('./tdk/tdk_monitor');
var link_monitor = require('./tdk/link_monitor');
app.use(favicon(path.join(__dirname,'favicon.ico')));

var viewspath = 'views';
if(process.env.NODE_ENV == 'production'){
  viewspath = 'dist/views'
}

app.set('views', path.join(__dirname, viewspath));

var env = nunjucks.configure(viewspath, {
  autoescape: true
});

//add esinc new!!
env.addExtension('esinc', new esinc());
app.use(midesi({
  fragserver: 'http://127.0.0.1',
  port:'3500'
}));

url_rewrite(app);
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
app.use('/views', express.static(path.join(__dirname, 'views')));
/*开发环境 ajax允许跨域*/
if (config.version == 'development') {
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
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
    res.render('error');
});


module.exports = app;
