const createError = require('http-errors');
var session = require("express-session")
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
var passport		=require("passport");
var LocalStrategy	=require("passport-local");
var User 			=require("./models/User");
var Item = require("./models/Item")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemRouter  = require('./routes/items');
const requestRouter  = require('./routes/requests');


const app = express();
app.use(cookieParser());
app.use(session({ secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//'mongodb+srv://nipun:nipun@cluster0.he0ej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://mirameen84:VXIg8sFOpVnhZ4mB@mongouploads.ppu8t.mongodb.net/brendrTesting?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to mongodb!");
}).catch(err => {
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/items',itemRouter);
app.use('/api/requests',requestRouter);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('brendr-react/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'brendr-react', 'build', 'index.html'));
  });
}

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
app.listen(process.env.PORT || 5000, () => {
  console.log('App listening on port 5000!');
});
module.exports = app;
