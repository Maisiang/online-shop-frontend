// Express
var express = require('express');
var app = express();

// 引入相關模組
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 配置multer - 解析 multipart/form-data
/*
const multer = require('multer');
const upload = multer();
app.use(upload.array());
*/


// 設置允許跨域請求
var cors = require('cors');
app.use(cors());

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
var indexRouter = require('./routes/api');
var usersRouter = require('./routes/file');
app.use('/api', indexRouter);
app.use('/file', usersRouter);

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
  sessionParser,
};
