var express = require('express');
var exphbs  = require('express3-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var mongoose=require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var store = require('./routes/store');
var review = require('./routes/reviews');
var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('hbs', exphbs({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser())
app.use(methodOverride())


app.use('/', index);
app.use('/user', users);
app.use('/store', store);
app.use('/review', review);

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

/* connect mongoose*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data/ratedb');
mongoose.connection.on("error", function (error){
   console.log("database link failed"+error);
});

mongoose.connection.on("open", function (){
	console.log("database link success！！！");
});


module.exports = app;
