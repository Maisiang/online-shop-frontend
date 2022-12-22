const { mongoose } = require('../db/mongodb.js');

const userSchema = new mongoose.Schema(
    {
        username:   { type: String, required: true},
        password:   { type: String, required: true},
        email:      { type: String, required: true},
        avatar:     { type: String, default: 'pigeon1.jpg'}
    },
    {
        // 必須指定集合，否則預設自動在後面加 's'
        collection:'user'
    }
);

module.exports = mongoose.model('user', userSchema);