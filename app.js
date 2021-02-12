var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/login');
}


// routes
var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var createAccessoryRouter = require('./routes/createAccessory');
var attachAccessoryRouter = require('./routes/attachAccessory');
var createCubeRouter = require('./routes/create');
var aboutRouter = require('./routes/about');
var detailsRouter = require('./routes/details');
var editRouter = require('./routes/edit');
var deleteRouter = require('./routes/delete');
var cookieRouter = require('./routes/cookie');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

// create a variabe to represent the application and involk Express()
var app = express();

require('dotenv').config()  // hides the Mongo connection variables

// mongodb connection
dbURI = 'mongodb+srv://dbtest:Budda800@cluster0.amkgq.mongodb.net/cubesdb?retryWrites=true&w=majority'
//console.log(process.env);
mongoose.connect(dbURI, { 
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
    .then((res) => console.log('db connected!'))
    .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials('./views/partials');
hbs.registerHelper('isEqual', function(expectedValue, value) {
  return value === expectedValue;
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: process.env.EXP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


// unprotected routes
app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/details', detailsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use(ensureAuthenticated);

//protected routes
app.use('/create', createCubeRouter);
app.use('/accessory/create', createAccessoryRouter);
app.use('/accessory/attach', attachAccessoryRouter);
app.use('/edit', editRouter);
app.use('/delete', deleteRouter);
app.use('/cookie', cookieRouter);
app.use('/about', aboutRouter);

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  res.render('404');
});

module.exports = app;
