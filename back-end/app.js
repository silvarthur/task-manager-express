var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var flash = require('express.flash');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

mongoose.connect('mongodb://localhost/task_manager_db');
var db = mongoose.connection;

db.once('open', function() {
  console.log('Connected to MongoDB');
});

db.on('error', function(err) {
  console.log(err);
});

var app = express();
var sessionStore = new session.MemoryStore; //???

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//body parser required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*
SOURCE - Flash Messages:

https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423
*/

app.use(cookieParser('secret'));
app.use(session({ 
  cookie: { maxAge:6000 }, 
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));
app.use(flash());

//custom flash middleware
app.use(function(req, res, next) {
  //if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

//route that creates a flash message using the express-flash module
app.all('/express-flash', function(req, res) {
  req.flash('success', 'This a message using the flash-express message');
  res.redirect(301, '/');
});

//route that creates a flash message using custom middleware
app.all('/session-flash', function(req, res) {
  req.session.sessionFlash = {
    type: 'success', 
    message: 'This is a flash message using custom middleware and express-session.'
  }
  res.redirect(301, '/');
});

//route that incorporates flash messages from either req.flash(type) or res.locals.flash
app.get('/', function(req, res) {
  res.render('index', {expressFlash: req.flash('success'), sessionFlash: res.locals.sessionFlash});
});

app.use('/', index);
app.use('/users', users);

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
