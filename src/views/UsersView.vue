<template>
  <div class="user">
    <div class="user-menu col center-center">
      
      <div class="user-avater row center-center">
        <img v-if="!loading" :src="require('@/assets/images/photo/unknown.jpg')" />
        <h1  v-if="!loading" class="h1">未登入</h1>
        <img v-if="loading" :src="require('@/assets/images/photo/'+ userInfo.avatar)" />
        <h1 class="h1">{{userInfo.username}}</h1>
      </div>

      <ul class="user-menu-list row flex-wrap center-center">
        <li @click="activeMenu(item.name , index)" v-for="(item,index) in menuList.data" :key="index"
        :class='index===menuList.currentIndex?"active-menu-btn noselect":"not-active-menu-btn noselect"'>
          <div class="row center-center">
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="user-content col">
      <router-view v-bind:userInfo="userInfo"></router-view>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default{
  name: "UsersView",
  data(){
    return{
      menuList:{
        currentIndex:0,
        data:[
          {name:'個人檔案'},
          {name:'更改密碼'},
          {name:'交易紀錄'},
          {name:'會員登出'}
        ]
      },
      userInfo:{},
      loading:false,
    }
  },
  methods:{
    activeMenu(menuName, index){
      this.menuList.currentIndex = index;
      if(menuName==='會員登出')
        this.goLogout();
      else if(menuName==='個人檔案'){
        if(this.$route.path === '/users') return;
        this.$router.push('/users');
      }
      else if(menuName==='交易紀錄'){
        if(this.$route.path === '/users/transaction') return;
        this.$router.push({name:'transaction'});
      }
      else
        alert(menuName);
    },
    goLogout(){
      axios.post('/api/logout')
      .then((response)=>{
        alert(response.data.message);
        // 清除sessionStorage
        sessionStorage.removeItem('user-info');
        // 切換路由到首頁
        this.$router.push('/');
      })
    },
    getUserInfo(){
      axios.get('/api/user').then((response)=>{
        if(response.data.isLogin === true){
          this.userInfo = Object.assign({}, response.data);
          /* 避免載入未知資源 */
          this.loading = true;
        }
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
  margin-bottom: 30px;
}
.user-menu img{
  width: 30%;
  border-radius: 50%;
  border:3px rgb(54, 159, 228) dashed;
}
.user-avater{
  gap: 20px;
}
.user-menu-list{
  width: 100%;
  gap: 30px 10%;
}
.user-menu-list li{
  width: 40%;
  line-height: 30px;
}
.user-content{
  padding: 20px;
  gap: 20px;
}

@media (min-width:768px){
    .user{
      display: flex;
    }
    .user-menu{
      width: 20%;
      background-color: white;
      justify-content: flex-start;
    }
    .user-menu .user-menu-list{
      flex-direction: column;    
    }
    .user-menu .user-avater{
      flex-direction: column;
    }
    .user-menu img{
      width: 70%;
    }
    .user-content{
      width: 65%;
      min-height: 65vh;
      height: auto;
      margin-top: 40px;
      background-color: #d8d8d8;
    }
    .user-menu-list li{
      width: 100%;
      line-height: 40px;
    }
}
</style>
