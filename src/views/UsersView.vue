<template>
  <div class="user">
    <div class="user-menu  flex-col">

      <!-- 用戶頭像 -->
      <div class="user-avater  flex-row  justify-content-center  align-items-center">
        <img :src="userInfo.avatar"/>
        <h1 class="h1">{{userInfo.username}}</h1>
      </div>
      <!-- 用戶選單 -->
      <ul class="user-menu-list  flex-row  flex-wrap  justify-content-center">
        <li v-for="(item,index) in menuList.data" :key="index" @click="activeMenu(index)"
        class="noselect  flex-row  justify-content-center" 
        :class='index===menuList.currentIndex?"active-menu-btn":"not-active-menu-btn"'>
            {{item.name}}
        </li>
      </ul>
    </div>
  
    <div class="user-content">
      <router-view v-bind:userInfo="userInfo"></router-view>
    </div>

  </div>
</template>

<script>
import { apiUserLogout, apiUserInfo } from "@/assets/scripts/api"; 
export default{
  name: "UsersView",
  data(){
    return{
      menuList:{
        currentIndex:0,
        data:[
          {
            name: '個人檔案',
            path: '/users'
          },
          {
            name: '更改密碼',
            path: '/users/updatepwd'
          },
          {
            name: '交易紀錄',
            path: '/users/transaction'
          },
          {
            name: '會員登出',
            path: '/logout'
          }
        ]
      },
      userInfo:{},
    }
  },
  methods:{
    // 當點擊選單按鈕，切換頁面
    activeMenu(index){
      // 儲存目前為哪個頁面
      this.menuList.currentIndex = index;
      // 將路徑push到路由
      if(this.menuList.data[index].path==='/logout') this.logout();
      else{
        if(this.$route.path === this.menuList.data[index].path) return;
        this.$router.push(this.menuList.data[index].path);
      }
    },
    // 用戶登出
    logout(){
      apiUserLogout().then((response)=>{
        alert(response.data.message);
        // 清除sessionStorage並切換到首頁
        sessionStorage.removeItem('user-info');
        this.$router.push('/');
      })
    },
    // 取得用戶資訊
    getUserInfo(){
      apiUserInfo().then((response)=>{
          this.userInfo = Object.assign({}, response.data);
      })
    }
  },
  mounted(){
    this.getUserInfo();
  },
};
</script>

<style scoped>
.user-menu{
  color: rgb(30, 100, 130);
  background-color: #d8d8d8;
  gap:30px 0;
  padding: 30px;
}
.user-menu img{
  width: 30%;
  border-radius: 50%;
  border:3px rgb(50, 150, 230) dashed;
}
.user-avater{
  gap: 20px;
}
.user-menu-list{
  gap: 30px 10%;
}
.user-menu-list li{
  width: 40%;
  line-height: 30px;
}
.user-content{
  padding: 20px;
}

@media (min-width:768px){
    .user{
      display: flex;
    }
    .user-menu{
      background-color: white;
      width: 20%;
    }
    .user-menu-list li{
      width: 100%;
      line-height: 40px;
    }
    .user-menu .user-avater{
      flex-direction: column;
    }
    .user-menu img{
      width: 70%;
    }
    .user-content{
      margin-top: 35px;
      width: 65%;
    }
}
</style>
