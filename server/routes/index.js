var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
