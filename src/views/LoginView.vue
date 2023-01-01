<template>
  <div class="login">
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
        <div class="type-rule text-align-center m-center">
            <p class="c-red">用戶名、密碼</p>
            <p>請輸入6-12個字元</p>
            <p>大小寫英文和數字</p>
        </div>
      <div class="content row flex-wrap space-around-center">
          <form class="col center-center"
          @submit.prevent="login">
              <h1 class="h1">登入會員</h1>
              <input maxlength="12" placeholder="Username 用戶名" type="text" 
              ref="loginUsername" autocomplete="username" pattern="^[a-zA-Z0-9]{6,12}$" required>
              <div class="password-field row center-center">
                  <input maxlength="12" placeholder="Password 密碼" type="password"
                  ref="loginPassword" autocomplete="current-password" pattern="^[a-zA-Z0-9]{6,12}$" required>
                  <i v-if="loginEye.status" @click="changeEye(loginEye , $refs.loginPassword)" class="fas fa-eye pws-eye"></i>
                  <i v-if="!loginEye.status" @click="changeEye(loginEye, $refs.loginPassword)" class="fas fa-eye-slash pws-eye"></i>
              </div>
              <input type="submit" value="登入">
          </form>

          <form class="col center-center" @submit.prevent="register"
          enctype="multipart/form-data" id="registerForm">
              <h1 class="h1">註冊會員</h1>
              <input maxlength="12" placeholder="Username 用戶名" type="text" 
                    ref="registerUsername" name="username" autocomplete="username" pattern="^[a-zA-Z0-9]{6,12}$" required>
              <input type="email" placeholder="Email 電子郵件" name="email" ref="registerEmail"
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$" required>
              <div class="password-field row center-center">
                  <input maxlength="12" placeholder="Password 密碼" type="password" pattern="^[a-zA-Z0-9]{6,12}$" required
                        ref="registerPassword" name="password" autocomplete="current-password">
                  <i v-if="registerEye.status" @click="changeEye(registerEye , $refs.registerPassword)" class="fas fa-eye pws-eye"></i>
                  <i v-if="!registerEye.status" @click="changeEye(registerEye, $refs.registerPassword)" class="fas fa-eye-slash pws-eye"></i>
              </div>

              <input type="submit" value="註冊">
          </form> 
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default{
  data(){
      return{
          loginEye:{status: true},
          registerEye:{status:true}
      }
  },
  methods:{
      login(){
          // 通過前端驗證格式
          if(!this.checkUserFormat('帳號',this.$refs.loginUsername)){
              console.log('驗證失敗');
              return false;
          }
          if(!this.checkUserFormat('密碼',this.$refs.loginPassword)){
              console.log('驗證失敗');
              return false;
          }
          console.log('請求登入',this.$refs.loginUsername.value,this.$refs.loginPassword.value);
          // 發送登入請求
          axios.post('/api/login',{
              username:this.$refs.loginUsername.value,
              password:this.$refs.loginPassword.value
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
          // 通過前端驗證格式
          if(!this.checkUserFormat('帳號',this.$refs.registerUsername)){
              console.log('驗證失敗');
              return false;
          }
          if(!this.checkUserFormat('密碼',this.$refs.registerPassword)){
              console.log('驗證失敗');
              return false;
          }
          let formData = new FormData(registerForm);
          console.log('請求註冊',formData.get('username'),formData.get('email'),formData.get('password'));
          // 發送註冊請求
          axios.post('/api/register', formData, {
              header:{'content-type': 'multipart/form-data'}
          }).then((response)=>{
              alert(response.data.message);
              if(response.data.isRegister){
                this.$router.push('/')
              }
                  
          })
      },
      checkUserFormat(verity , refs){
          console.log('開始驗證'+verity);
          let value = refs.value;
          // 限制只能輸入英文及數字
          for(let i=0 ; i<value.length ; i++){
              if(!((value[i]>='a' && value[i]<='z')||
                  (value[i]>='A' && value[i]<='Z')||
                  (value[i]>='0' && value[i]<='9')))
              {
                  alert(verity+"：請輸入大小寫英文字母或數字!!");
                  refs.focus();
                  return false;
              }
          }
          if(value.length<6 || value.length>12){
              alert(verity+'：請輸入至少6 ~ 12個字元');
              refs.focus();
              return false;
          }
          return true;
      },
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
  min-height: 70vh;
  height: auto;
  gap: 70px 0;
}
.content form{
  color:rgb(50, 150, 255);
  padding: 50px;
  background-color: #f5f5f5;
  box-shadow: 10px 10px 25px rgba(0,0,0,.5);
}
.content form input{
  margin-top:20px;
  background: none;
  padding: 5px;
}
.content form input[type="submit"]{
  width: 50%;
  cursor: pointer;
  border-radius: 12px;
}
.content form input[type="submit"]:hover{
  transition: 1s;
  width: 100%;
  background-color: rgb(50, 150, 255);
  border: 2px rgb(50, 150, 255) solid;
  color:white;
}
.content form input[type="text"]:focus,
.content form input[type="password"]:focus,
.content form input[type="email"]:focus
{
  background-color: #ccc;
}
.password-field{
  margin-right: 4px;
}
.pws-eye{
  margin-top: 20px;
  margin-left: -23px;
}
@media (min-width:768px){
    .content{
        min-height: 60vh;
        height: auto;
    }
    .content form{
        margin-top: -30px;
    }

}
</style>
