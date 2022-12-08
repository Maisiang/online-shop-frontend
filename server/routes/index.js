var express = require('express');
var router = express.Router();
// 資料庫
let {client, getCollection, searchData, insertData, updateData} = require('../db/nosql.js')
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
