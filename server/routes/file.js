let express = require('express');
let router = express.Router();

const fs = require('fs')

// 取得avatar - 添加檔名判斷(避免../)
router.get('/avatar/:imageUrl', (request, response)=> {
  let imagePath = 'upload/'+ request.params.imageUrl;     // 檔案路徑 upload/xxx.jpg
  let mime = imagePath.split(".").pop();                  // 取得副檔名 jpg
  let image = fs.readFileSync(imagePath); 
  // 設定響應類型
  response.contentType('image/'+mime);  
  response.send(image);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Nothing');
});

module.exports = router;
