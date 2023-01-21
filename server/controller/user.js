const user = require('../models/user');
const cart = require('../models/cart');

const fs = require('fs');

// 取得用戶資料
exports.getUserInfo = async(request,response)=>{
    // 搜尋用戶名是否存在
    let query = await user.find({ username: request.session.user.username });
    console.log('取得用戶資訊：\n',query);
    // 頭像路徑
    let filePath = './upload/' + request.session.user.username + '.jpg';
    // 傳送檔案給用戶
    fs.readFile(filePath, (error, file) => {
        if (error) throw error;
        // 發送到客戶端
        response.send({
            isLogin : true,
            username: query[0].username,
            email   : query[0].email,
            avatar  : 'data:image/jpeg;base64,' + file.toString('base64'),
            registrationDate: query[0].registrationDate
        });
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
        const date = new Date().toISOString().slice(0,10);
        // 在user集合新增帳號
        let addUser = new user({
            username: request.body.username,
            password: request.body.password,
            email   : request.body.email,
            avatar  : 'pigeon1.jpg',
            registrationDate: date
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

// 用戶更新密碼
exports.updatePassword = async(request,response)=>{
    console.log(request.session.user.username ,'用戶更新密碼\n',request.body.passwordList)
    // 當舊密碼正確、新密碼兩次輸入一致
    if((request.session.user.password === request.body.passwordList.oldPwd)&&
       (request.body.passwordList.newPwd === request.body.passwordList.reNewPwd)){
        await user.updateOne(
            { username: request.session.user.username },
            { $set: { password: request.body.passwordList.newPwd } }
        );
        response.send({
            isLogin: true,
            message:'密碼變更成功！'
        });
    }
    else{
        response.send({
            isLogin: true,
            message:'輸入的密碼有誤，請重新輸入...'
        });
    }
}

// 用戶更新頭像
exports.updateAvatar = async(request,response)=>{
    console.log(request.session.user.username,' 用戶更新頭像' , request.file);
    // 更改檔案名稱
    let filePath = './upload/' + request.session.user.username + '.jpg';
    fs.renameSync(request.file.path, filePath)
    // 更新資料庫的avatar
    await user.updateOne(
        { username: request.session.user.username },
        { $set: { avatar: request.session.user.username+'.jpg' } }
    );
    response.send({
        message:'頭像更新成功'
    })
}


/* Session */

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
        // Session 儲存用戶資訊
        request.session.user = query[0];
        // 傳送資訊到客戶端 (不包含密碼)
        response.send({
            isLogin:true,
            message: '登入成功！',
            username: query[0].username,
        });
    }
}

// 用戶登出
exports.logout = async(request,response)=>{
    console.log('用戶登出');
    request.session.destroy();
    response.send({
        message:'登出成功！'
    })
}

// 維持用戶登入狀態
exports.isLogin = async(request,response)=>{
    response.send({
        isLogin:true,
        userInfo: {
            username:request.session.user.username,
            email:request.session.user.email,
            avatar: request.session.user.avatar
        },
        
    });
}