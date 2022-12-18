<template>
  <div class="search-home h-full">
    <div class="search-history">
          <div class="history-title row space-between-center">
              <div class="row">
                  <img src="@/assets/images/search-history.png">
                  <h2 class="h2">歷史搜索</h2>
              </div>
              <h2 class="h2 noselect cursor-ptr c-ptr-hover" @click="clearSearchList">清空搜索紀錄</h2>
          </div>
          <ul class="row flex-wrap">
              <li class="cursor-ptr c-ptr-hover" v-for="(item,index) in searchArr"
              :key="index" @click="historyBtnSearch(item)">{{item}}</li>

          </ul>
          <h3 class="h3 m-t-l" v-if="searchArr.length==0">暫無搜索紀錄</h3>
      </div>
  </div>
</template>

<script>

export default{
  data(){
      return{
          searchArr:[],
      }
  },
  methods:{
      // 清空搜索紀錄
      clearSearchList(){
          localStorage.setItem('searchList','[]');
          this.searchArr='';
      },
      historyBtnSearch(itemName){
          this.$router.push({
              name:'search-list',
              query:{
                  key:itemName
              }
          });
      }
  },
  created(){
      // 判斷local storage有沒有搜索紀錄，有就存到searchArr
      if(localStorage.getItem('searchList'))
          this.searchArr=JSON.parse(localStorage.getItem('searchList'));
  },
}
</script>

<style scoped>
.search-home{
  background-color: #f5f5f5;
}
.search-history{
  padding: 20px;
  border-bottom: 2px #ccc solid;
}
.history-title img{
  height: 20px;
  margin-right: 10px;
}
.search-history ul li{
  margin-top: 20px;
  margin-right: 30px;
  border: 2px #ccc solid;
  padding: 5px;
}
</style>