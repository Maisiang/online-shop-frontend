const { mongoose } = require('../db/mongodb.js');

const productSchema = new mongoose.Schema(
    {
        name:   { type: String, required: true, default: 'unknown' },
        price:  { type: Number, required: true, default: 0},
        imgUrl: { type: String, required: true, default: 'unknown.png'},
        category:{type: String, required: true, default: 'unknown'}
    },
    {
        // 必須指定集合，否則預設自動在後面加 's'
        collection:'product'
    }
);

module.exports = mongoose.model('product', productSchema);