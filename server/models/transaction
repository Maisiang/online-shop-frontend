const { mongoose } = require('../db/mongodb.js');

const transactionSchema = new mongoose.Schema(
    {
        username:   { type: String  , required: true},
        orderInfo:  {
            email:      { type: String, required: true},
            name:       { type: String, required: true},
            phoneNum:   { type: String, required: true},
            address:    { type: String, required: true},
            note:       { type: String, default:''},
        },
        productList:[
            { type: Object, required: true},
        ],
        total:      { type: Number  , default: 0},
        orderDate:  { type: String  , required: true},
        status:     { type: String  , default: 'pending'}
    },
    {
        // 必須指定集合，否則預設自動在後面加 's'
        collection:'transaction'
    }
);

module.exports = mongoose.model('transaction', transactionSchema);
