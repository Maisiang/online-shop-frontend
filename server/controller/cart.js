//const mongoose = require('mongoose');
const cart = require('../models/cart');
const product = require('../models/product');
const { ObjectId } = require('mongodb');
// 取得購物車
exports.getCart = async(request,response)=>{
    console.log("搜尋用戶購物車：",request.session.user.username);
    // 搜尋用戶購物車的所有商品ID
    let query = await cart.find({ username:request.session.user.username });
    // 透過商品ID取得商品資訊
    query = await product.find({
        "_id": {
            "$in": query[0].product_id
        }
    });
    // 發送到客戶端
    response.json(query);
}

// 新增商品
exports.addCart = async(request,response)=>{
    console.log('添加商品到購物車',request.body)
    await cart.updateOne(
        { username:request.session.user.username },
        { $addToSet: {product_id: ObjectId(request.body.product_id)} }
    );
    console.log('購物車新增成功！');
    response.send({
      message:'已將商品加到購物車！'
    });
}
// 移除商品
exports.deleteCart = async(request,response)=>{
    console.log('移除購物車商品：',request.body)
    await cart.updateOne(
        { username:request.session.user.username },
        { $pull    :{product_id: ObjectId(request.body.product_id)} }
    );
    console.log('購物車刪除商品成功！');
    response.send({
      message:'已將商品從購物車移除！'
    });
    /*
          console.log('購物車刪除商品失敗...');
      response.send({
        message:'購物車刪除商品失敗...'
      });   
      */
}