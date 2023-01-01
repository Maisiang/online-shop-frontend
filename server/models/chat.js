const { mongoose } = require('../db/mongodb.js');



const DEFAULT_TIME_ZONE = 'Asia/Taipei';

// -1：用戶離開聊天室
//  0：用戶加入聊天室
//  1：訊息(普通字串、超連結)
//  2：取得自己的名稱(訪客或用戶名)

const chatSchema = new mongoose.Schema(
    {
        status:     { type: Number, required: true},
        username:   { type: String, required: true},
        avatar:     { type: String, required: true},
        message:    { type: String, default:''},
        date:       { type: String, required: true},
    },
    {
        // 必須指定集合，否則預設自動在後面加 's'
        collection:'chat'
    }
);
module.exports = mongoose.model('chat', chatSchema);