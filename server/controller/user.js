const user = require('../models/user');
const cart = require('../models/cart');

// 取得用戶資料
exports.getUserInfo = async(request,response)=>{
    // 搜尋用戶名是否存在
    let query = await user.find({ username: request.session.user.username });
    // 發送到客戶端
    console.log('取得用戶資訊：\n',query);
    response.send({
        isLogin : true,
        username: query[0].username,
        email   : query[0].email,
        avatar  : query[0].avatar
    });
}

// 用戶註冊 -   需驗證表單欄位
exports.register = async(request,response)=>{
    console.log('用戶註冊：',request.body)
    // 判斷 username或email 是否有重複的
    let query = await user.find({
        $or:[
            { username: request.body.username },
            { email: request.body.email }
        ]
    })
    // 有重複的欄位
    if(query.length!=0){
        response.send({
            isRegister:false,
            message:'帳號或信箱存在！！'
        });
    }
    // 不存在帳號，新增到資料庫
    else{
        // 在user集合新增帳號
        let addUser = new user({
            username: request.body.username,
            password: request.body.password,
            email   : request.body.email,
            avatar  : 'pigeon1.jpg'
        })
        await addUser.save((error,results)=>{
            if(error) console.log(error);
            console.log('新增用戶',results._id);
        })
        // 在cart集合新增購物車
        let addCart = new cart({
            username: request.body.username,
            product_id:[]
        })
        await addCart.save((error,results)=>{
            if(error) console.log(error);
            console.log('初始化用戶購物車',results._id);
        })
        console.log('帳號註冊成功！');
        // 回傳給客戶端註冊完畢資訊
        response.send({
            isRegister:true,
            message:'帳號註冊成功！'
        });
    }
}

// 用戶登入
exports.login = async(request,response)=>{
    console.log('用戶登入：',request.body);
    // 搜尋用戶名和密碼是否一樣(注意SQLi)
    let query = await user.find({
        username: request.body.username,
        password: request.body.password
    });
    // 用戶不存在
    if(query.length === 0){
        console.log('登入失敗');
        // 傳送資訊到客戶端
        response.send({
          isLogin:false,
          message:'帳號或密碼錯誤！'
        });
    }
    // 用戶存在
    else{
        console.log('登入成功！')
        // Session 儲存用戶資訊和登入狀態
        request.session.user = request.body;
        request.session.islogin = true;
        // 傳送資訊到客戶端
        response.send({
            isLogin:true,
            message:'登入成功！',
            userInfo:{
                username: query[0].username,
                email   : query[0].email,
                avatar  : query[0].avatar
            }
        });
    }
}

// 用戶登出
exports.logout = async(request,response)=>{
    console.log('用戶登出');
    request.session.destroy();
    response.send({
        isLogout:true,
        message:'登出成功！'
    })
}

// 維持用戶登入狀態
exports.isLogin = async(request,response)=>{
    response.send({
        isLogin:true,
        username:request.session.user.username
    });
}