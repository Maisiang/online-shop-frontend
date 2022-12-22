const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/dove';
mongoose.set('strictQuery', true);
// mongoose
exports.mongoose = mongoose

// connect
exports.connect = () => {
	// 連接到資料庫
	mongoose.connect(mongoDB, ()=>{
        console.log("連接到 ",mongoDB);
    });
	return mongoose
}


//const autoIncrement = require('mongoose-auto-increment')

/*
// 檢查是否連接到資料庫
const db = mongoose.connection
db.on('錯誤', console.error.bind(console, 'MongoDB connection error:'))
*/
//mongoose.set('useNewUrlParser', true);
//useCreateIndex: true,


    /*
	// 連接失敗
	mongoose.connection.on('error', error => {
		console.log('資料庫連接失敗!', error)
	})
	// 连接成功
	mongoose.connection.once('open', () => {
		console.log('資料庫連接成功!')
	})
    */
	// 自增 ID 初始化
	//autoIncrement.initialize(mongoose.connection)