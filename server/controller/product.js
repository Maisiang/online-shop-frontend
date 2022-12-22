//const mongoose = require('mongoose');
const product = require('../models/product');

exports.getProduct = async(request,response)=>{
    console.log("搜尋商品：",request.query.name);
    // 找到跟關鍵字相關的產品
    let query;
    // 判斷需不需要排序
    if(request.query.sortStr.length===0 || request.query.sortNum === '0')
        query = await product.find({ name:{$regex: request.query.name} });
    else if(request.query.sortNum === '1' || request.query.sortNum ==='-1')
        query = await product.find({ name:{$regex: request.query.name} }).sort({[request.query.sortStr]:request.query.sortNum});
    // 發送到客戶端
    response.json(query);
}



