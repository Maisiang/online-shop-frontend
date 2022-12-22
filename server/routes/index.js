var express = require('express');
var router = express.Router();


// 配置sessionn
const session = require('express-session')
router.use(session({
  secret: 'DoveSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'strict',
  }
}))

// 資料庫
let client = null;
let {getCollection, searchData, insertData, updateData, closeClient} = require('../db/nosql.js')
let { ObjectId } = require('mongodb');

// 所有路由
const user = require('../controller/user');
const cart = require('../controller/cart');
const product = require('../controller/product');
const transaction = require('../controller/transaction');

// 作用為http請求完成、關閉或錯誤後觸發用戶設置的回調函數

// 路由級別中間件 - 處理身分驗證 
router.use(auth = function(request,response,next){
  try{
    console.log('\n');

    
    // 設定不用身分驗證的路由
    const notAuthRoute=['/logout','/login','/register','/get'];
    if(notAuthRoute.indexOf(request.path)!=-1){
      return next();
    }
    // 其餘頁面要做身分驗證 - 前端頁面還沒加判斷
    console.log('身分驗證',request.session.user);
    if(request.session.user===undefined){
      console.log('請求失敗：',request.method,request.path);
      response.send({
        isLogin:false,
        message:'操作失敗，請先登入會員！'
      });
      return false;
    }
    // 通過驗證
    next();
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
});


// 商品
router.get('/get', product.getProduct);

// 購物車
router.get('/getCart'         , cart.getCart);
router.post('/addToCart'      , cart.addCart);
router.post('/removeFromCart' , cart.deleteCart);

// 用戶
router.get('/getUser'   , user.getUserInfo);
router.post('/register' , user.register);
router.post('/login'    , user.login);
router.post('/logout'   , user.logout);
router.get('/isLogin'   , user.isLogin);

// 訂單
router.post('/addOrder' , transaction.addTransaction);
router.get('/getOrder'  , transaction.getTransaction);


/* GET index listing. */
router.get('/', function(req, res, next) {
  console.log('API')
  res.send('API')
});


module.exports = router;
