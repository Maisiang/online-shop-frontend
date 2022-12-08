<template>
  <div class="user">
    <div class="user-menu col center-center">
      <div class="user-avater row center-center">
        <img v-if="loading" :src="require('@/assets/images/photo/'+ userInfo.avatar)" />
        <h1 class="h1">{{userInfo.username}}</h1>
      </div>

      <ul class="user-menu-list row flex-wrap center-center">
        <li @click="activeMenu(item.name)" class="cursor-ptr noselect" v-for="(item,index) in menuList" :key="index">
          {{item.name}}
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
  name: "User",
  //props: ['postTitle'],
  data(){
    return{
      menuList:[
        {name:'個人檔案'},
        {name:'更改密碼'},
        {name:'交易紀錄'},
        {name:'會員登出'}
      ],
      userInfo:{},
      loading:false
    }
  },
  methods:{
    activeMenu(menuName){
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
        if(response.data.isLogout)
          this.$router.push('/');
      })
    }
  },
  mounted(){
    let userInfo = sessionStorage.getItem('user-info');
    // 未登入
    if(!userInfo)
    {
      alert('請先登入會員！')
      this.$router.replace('/login');
    }
    else{
      this.userInfo = JSON.parse(userInfo);
      this.loading = true;
    }
  },
};
</script>

<style>
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
  gap: 40px 50%;
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
}
</style>
