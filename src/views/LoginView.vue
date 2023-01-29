<template>
  <div class="login">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
        <div class="type-rule text-align-center m-center">
            <p class="text-primary">用戶名、密碼</p>
            <p>請輸入6-12個字元</p>
            <p>大小寫英文和數字</p>
        </div>
        <div class="content text-primary flex-row  flex-wrap  justify-content-around  align-items-center">
            <form class="flex-col  align-items-center" @submit.prevent="login">
                <h1 class="h1">登入會員</h1>
                <input maxlength="12"  placeholder="Username  用戶名" type="text"       ref="loginUsername" :pattern="usernameRule" required>
                <div class="password-field  flex-row  align-items-center">
                    <input maxlength="12" placeholder="Password 密碼" type="password"   ref="loginPassword" :pattern="passwordRule" required>
                    <i v-if="loginEye.status"   @click="changeEye(loginEye, $refs.loginPassword)" class="pws-eye fas fa-eye"></i>
                    <i v-if="!loginEye.status"  @click="changeEye(loginEye, $refs.loginPassword)" class="pws-eye fas fa-eye-slash"></i>
                </div>
                <input class="form-submit" type="submit" value="登入" >
            </form>

            <form class="flex-col  align-items-center" @submit.prevent="register" enctype="multipart/form-data" id="registerForm">
                <h1 class="h1">註冊會員</h1>
                <input type="text"    placeholder="Username 用戶名"   name="username" ref="registerUsername"  :pattern="usernameRule" maxlength="12" required>
                <input type="email"   placeholder="Email 電子郵件"    name="email"    ref="registerEmail" required>
                <div class="password-field  flex-row  align-items-center">
                    <input type="password" placeholder="Password 密碼" name="password" ref="registerPassword" :pattern="passwordRule" maxlength="12" required>
                    <i v-if="registerEye.status"    @click="changeEye(registerEye, $refs.registerPassword)" class="pws-eye fas fa-eye"></i>
                    <i v-if="!registerEye.status"   @click="changeEye(registerEye, $refs.registerPassword)" class="pws-eye fas fa-eye-slash"></i>
                </div>
                <input class="form-submit" type="submit" value="註冊" >
            </form> 
        </div>
  </div>
</template>

<script>
import { apiUserLogin, apiUserRegister } from "@/assets/scripts/api"; 
export default{
  data(){
      return{
        loginEye    : {status: true},
        registerEye : {status:true},
        usernameRule: "^[a-zA-Z0-9]{6,12}$",   // 用戶名規則
        passwordRule: "^[a-zA-Z0-9]{6,12}$",   // 密碼規則
      }
  },
  methods:{
      login(){
        apiUserLogin({
            username: this.$refs.loginUsername.value,
            password: this.$refs.loginPassword.value
        }).then((response)=>{
            alert(response.data.message);
            // 登入成功
            if(response.data.isLogin){
                // 儲存到sessionStorage
                sessionStorage.setItem('user-info',JSON.stringify(response.data.username))
                // 切換路由到首頁
                this.$router.push('/')
            }
        })
      },
      register(){
        //console.log('請求註冊',formData.get('username'),formData.get('email'),formData.get('password'));
        let formData = new FormData(registerForm);
        apiUserRegister(
            formData
        ).then((response)=>{
            alert(response.data.message);
            if(response.data.isRegister)
                this.$router.push('/')
        })
      },
      // 改變密碼欄位顯示星號還是文字
      changeEye(Obj , refs){
          Obj.status = !Obj.status;
          if(Obj.status===false)
              refs.type='text';
          else
              refs.type='password';
      }
  },
};
</script>

<style scoped>

.type-rule{
    padding: 10px;
    width: 80%;
}
.content{
    gap: 70px 0;
    margin-top: 30px;
    margin-bottom: 60px;
}
.content form{
    padding: 50px;
    background-color: #f5f5f5;
    box-shadow: 10px 10px 25px rgba(0,0,0,.5);
}
.content form input{
    background: none;
    margin-top:20px;
    padding: 5px;
}

.content form input[type="text"]:focus,
.content form input[type="password"]:focus,
.content form input[type="email"]:focus
{
    background-color: #ccc;
}
.password-field{
    margin-right: 8px;
}
.pws-eye{
    width: 15px;
    margin-top: 20px;
    margin-left: -23px;
}

</style>
