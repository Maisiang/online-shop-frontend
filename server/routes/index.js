var express = require('express');
var router = express.Router();

// 所有路由
const user = require('../controller/user');
const cart = require('../controller/cart');
const product = require('../controller/product');
const transaction = require('../controller/transaction');


// 路由級別中間件 - 處理身分驗證 
router.use(auth = function(request,response,next){
  try{
    console.log('\n');
    // 設定不用身分驗證的路由
    const notAuthRoute=['/logout','/login','/register','/product'];
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
    // 當通過身分驗證
    next();
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
});



// 商品
router.get('/product', product.getProduct); //取得商品

// 購物車 Restful API
router.get('/cart'                , cart.getCart);    // 取得購物車
router.post('/cart/:product_id'   , cart.addCart);    // 新增購物車商品
router.delete('/cart/:product_id' , cart.deleteCart); // 移除購物車商品

// 用戶
router.get('/user'      , user.getUserInfo);  // 取得用戶資訊
router.post('/register' , user.register);     // 新增用戶

// 用戶 - Session
router.post('/login'    , user.login);  // 建立Session
router.post('/logout'   , user.logout); // 移除Session
router.get('/isLogin'   , user.isLogin);// 取得Session

// 交易紀錄 Restful API
router.get('/transaction'  , transaction.getTransaction);  // 取得交易紀錄
router.post('/transaction' , transaction.addTransaction);  // 新增交易紀錄


/* GET index listing. */
router.get('/', function(req, res, next) {
  res.send('API router')
});


module.exports = router;
