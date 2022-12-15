var express = require('express');
var router = express.Router();
// 資料庫
let {client, getCollection, searchData, insertData, updateData} = require('../db/nosql.js')
const { ObjectId } = require('mongodb');
// 配置sessionn
const session = require('express-session')
router.use(session({
  secret: 'DoveSecret',
  resave: false,
  saveUninitialized: true
}))
// for parsing multipart/form-data
let multer = require('multer');
let upload = multer();
router.use(upload.array());

// 查詢商品資料API
router.get('/api/get' ,async (request,response)=>{
  try{
    // 連線到資料庫的商品集合
    await getCollection();
    // 顯示客戶端傳遞的內容
    console.log("搜尋：",request.query.name);
    // 搜尋物件
    let searchObj = { name:{$regex: request.query.name} };
    let resultObj = await searchData(searchObj , request.query.sortStr , request.query.sortNum);
    // 查詢完成
    console.log("查詢結果：\n",resultObj);
    response.json(resultObj);
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
  finally{
    // 結束資料庫連線
    if(client != null) client.close();
    response.end();
  }
});

// 用戶登入API
router.post('/api/login',async (request,response)=>{
  try{
        // 連線到資料庫的users集合
        await getCollection('dove','users');
        // 搜尋物件
        searchObj = { 
          username: request.body.username,
          password: request.body.password
        };
        let resultObj = await searchData(searchObj);
        console.log("查詢結果：\n",resultObj);
        // 用戶不存在
        if(resultObj.length===0)
          response.send({
              isLogin:false,
              message:'帳號或密碼錯誤！'
          });
        // 用戶存在
        else
        {
          // 儲存用戶資訊和登入狀態
          request.session.user = request.body;
          request.session.islogin = true;
          console.log('session id',request.sessionID);
          // 發送登入成功響應
          response.send({
            isLogin:true,
            message:'登入成功！',
            userInfo:{
              username: resultObj[0].username,
              email: resultObj[0].email,
              avatar: resultObj[0].avatar
            }
          });
        }
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
  finally{
    // 結束資料庫連線
    if(client != null) client.close();
    response.end();
  }
});

// 用戶註冊API
router.post('/api/register', async (request,response)=>{
  try{
    // 連線到資料庫的users集合
    await getCollection('dove','users');
    // 搜尋帳號是否存在
    searchObj = {username: request.body.username};
    let resultObj = await searchData(searchObj);
    // 搜尋Email是否存在
    searchObj = {email: request.body.email};
    resultObj_email = await searchData(searchObj);
    // 當用戶存在
    if(resultObj.length!=0){
      response.send({
        isRegister:false,
        message:'帳號已經存在！'
      });
    }
    // 當Email存在
    else if(resultObj_email.length!=0){
      response.send({
        isRegister:false,
        message:'Email已經存在！'
      });
    }
    // 都不存在，則在資料庫新增帳號
    else{
      // 新增 dove - users 資料
      insertObj = {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        avatar: 'pigeon1.jpg'
      };
      await insertData(insertObj);
      // 新增 dove - cart 資料
      await getCollection('dove','cart');
      insertObj = {
        username: request.body.username,
        product_id:[]
      };
      await insertData(insertObj);

      // 回傳給客戶端註冊完畢資訊
      console.log('帳號註冊成功！');
      response.send({
        isRegister:true,
        message:'帳號註冊成功！'
      });
      
    }
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
  finally{
    // 結束資料庫連線
    if(client != null) client.close();
    response.end();
  }
});

// 用戶登出API
router.post('/api/logout', (request,response)=>{
  request.session.destroy();
  response.send({
    isLogout:true,
    message:'登出成功！'
  })
});

// 查詢用戶購物車API
router.get('/api/getCart' ,async (request,response)=>{
  try{
    // 連線到資料庫的購物車集合
    await getCollection('dove','cart');
    // 搜尋購物車的商品id
    let searchObj = {username:request.session.user.username};
    let resultObj = await searchData(searchObj);
    console.log("商品id查詢結果：\n",resultObj[0].product_id);
    // 連線到資料庫的商品集合
    await getCollection('dove','product');
    // 透過id搜尋商品集合
    searchObj = {
      "_id" : {
        "$in" : resultObj[0].product_id
    }}
    resultObj = await searchData(searchObj);
    console.log("商品查詢結果：\n",resultObj);
    response.json(resultObj);
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
  finally{
    // 結束資料庫連線
    if(client != null) client.close();
    response.end();
  }
});

// 添加商品到用戶購物車API
router.post('/api/addToCart', async(request,response)=>{
  // 後端添加判斷：
  // 1. 確認商品是否存在

  try{
    await getCollection('dove' , 'cart');
    let searchObj = {username:request.session.user.username};
    let insertObj = {$addToSet: {product_id: ObjectId(request.body.product_id)}};
    resultObj = await updateData(searchObj,insertObj);
    // 回傳新增商品到購物車的結果
    if(resultObj.length!=0){
      console.log('購物車新增成功！');
      response.send({
        message:'已將商品加到購物車！'
      });
    }
  }
  catch(error){
    // 沒找到對應session
    console.log("錯誤："+ error.message);
    console.log('購物車新增失敗...');
    response.send({
      message:'商品加到購物車失敗...\n請先登入會員！'
    });
  }
  finally{
    // 結束資料庫連線
    if(client != null) client.close();
    response.end();
  }
});

// 移除商品從用戶購物車API
router.post('/api/removeFromCart', async(request,response)=>{
  // 後端判斷：
  /* 因透過session.username去移除商品，所以不判斷session */
  try{
    await getCollection('dove' , 'cart');
    let searchObj = {username :request.session.user.username};
    let insertObj = {$pull    :{product_id: ObjectId(request.body.product_id)}};
    resultObj = await updateData(searchObj,insertObj);
    // 回傳移除商品結果
    if(resultObj.length!=0){
      console.log('購物車刪除商品成功！');
      response.send({
        message:'已將商品從購物車移除！'
      });
    }
    else{
      console.log('購物車刪除商品失敗...');
      response.send({
        message:'購物車刪除商品失敗...'
      });   
    }
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
  finally{
    // 結束資料庫連線
    if(client != null) client.close();
    response.end();
  }
});

// 新增訂單API
// 需添加後端驗證 不能信任前端傳來的price 需要到資料庫用id尋找price計算總金額
router.post('/api/addOrder', async(request,response)=>{
  try{
    await getCollection('dove' , 'transaction');
    console.log('order\n',request.body.orderInfo);
    console.log('prdocu\n',request.body.productList);
    // 插入訂單資訊到資料庫
    let insertObj = {
      username: request.session.user.username,
      orderInfo:request.body.orderInfo,
      productList:request.body.productList,
      orderDate:Date(),
      status:"pending"
    };
    let resultObj = await insertData(insertObj);
    // 移除購物車內容
    await getCollection('dove' , 'cart');
    let searchObj = {username:request.session.user.username};
    resultObj = await updateData(searchObj,{$set:{product_id:[]}});
    // 訂單資訊儲存完畢
    if(resultObj.length!=0){
      console.log('交易成功！');
      response.send({
        message:'交易成功！'
      });
    }
  }
  catch(error){
    console.log("錯誤："+ error.message);
  }
  finally{
    // 結束資料庫連線
    if(client != null) client.close();
    response.end();
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
