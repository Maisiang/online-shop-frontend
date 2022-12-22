const { mongoose } = require('../db/mongodb.js');
const { ObjectId } = require('mongodb');

const cartSchema = new mongoose.Schema(
    {
        username:   { type: String, required: true},
        product_id:[
            { type: ObjectId }
        ]
    },
    {
        // 必須指定集合，否則預設自動在後面加 's'
        collection:'cart'
    }
);
module.exports = mongoose.model('cart', cartSchema);