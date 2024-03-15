// -------------------- Packages --------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require("method-override");

require("dotenv").config();
require("./config/database");
require('./config/passport');


// -------------------- Routers ---------------------
var indexRouter = require('./routes/index');
var platformsRouter = require('./routes/platforms');
var favoritesRouter = require('./routes/favorites');
var companiesRouter = require('./routes/companies');
var chatbotsRouter = require('./routes/chatbots');


// ------------- Start as an Express app ------------
var app = express();


// ----------------- Engine Setup -------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ------------------ Middleware --------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

// Mount Session Middleware for OAuth
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// Mount Passport for OAuth
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


// --------------------- Routes ---------------------
app.use('/', indexRouter);
app.use('/platforms', platformsRouter);
app.use('/favorites', favoritesRouter);
app.use('/companies', companiesRouter);
app.use('/chatbots', chatbotsRouter);


// ----------------- Error Handling -----------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


// ------------- Export the Express app -------------
module.exports = app;
