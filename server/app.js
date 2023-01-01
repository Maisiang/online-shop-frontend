// Express
var express = require('express');
var app = express();

// 引入相關模組
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 解析 multipart/form-data
let multer = require('multer');
let upload = multer();
app.use(upload.array());

// express-ws 中間件 待刪除
var expressWs = require('express-ws');
expressWs(app);

// 配置session
const session = require('express-session')
const sessionParser = session({
  secret: 'DoveSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'strict',
  }
})
app.use(sessionParser);

// 其餘配置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 所有路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/api', indexRouter);
app.use('/users', usersRouter);

// 連線到資料庫
const mongodb = require('./db/mongodb');
mongodb.connect();


// 捕獲 404 並轉送到 Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  //console.log(err.stack);
  console.log(err.status||500);
  console.log(req.app.get('env') === 'development' ? err : {})
  res.send(err.message);
});


module.exports = {
  app,
  sessionParser
};
