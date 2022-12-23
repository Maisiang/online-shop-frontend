const transaction = require('../models/transaction');
const product = require('../models/product');
const cart = require('../models/cart');

const { ObjectId } = require('mongodb');

// 取得交易紀錄
exports.getTransaction = async(request,response)=>{
    console.log('查詢交易紀錄 ',request.session.user.username)
    // 搜尋該用戶所有交易紀錄
    let query = await transaction.find({username: request.session.user.username}).sort({orderDate:-1});
    response.json(query);
}

// 新增交易紀錄 -   需驗證表單欄位
exports.addTransaction = async(request,response)=>{
    let message = '已送出訂單！';
    console.log('用戶送出訂單：',request.body)
    // 到資料庫用id尋找price計算總金額
    let query;
    let total = 0;
    for(let i=0 ; i<request.body.productList.length ; i++){
        query = await product.find({ _id:ObjectId(request.body.productList[i]._id )})
        console.log(query)
        total = total + query[0].price * request.body.productList[i].num;
    }
    // 插入訂單資訊到資料庫
    let insertTransaction = new transaction({
        username    : request.session.user.username,
        orderInfo   : request.body.orderInfo,
        productList : request.body.productList,
        total       : total,
        orderDate   : Date(),
        status      : "pending"
    })
    await insertTransaction.save((error,results)=>{
        if(error){
            console.log(error);
            message = 'Server Error 訂單取消';
        }
    })
    // 移除用戶購物車所有商品id
    query = await cart.updateOne(
        {username:request.session.user.username},
        {$set:{product_id:[]}}
    )
    // 結果傳送到客戶端
    console.log('訂單結果： ',message);
    response.send({
        message: message
    });

}

