<template>
  <div class="search-home">
    <div class="search-history">
          <div class="history-title flex-row justify-content-between">
              <div class="flex-row">
                  <img src="@/assets/images/search-history.png" style="height:25px">
                  <h2 class="h2">歷史搜索</h2>
              </div>
              <h2 class="h2 noselect cursor-ptr c-ptr-hover" @click="clearSearchList">清空紀錄</h2>
          </div>
          <ul class="flex-row flex-wrap">
              <li class="cursor-ptr c-ptr-hover" v-for="item in searchList" @click="historyBtnSearch(item)">
                {{item}}
              </li>
          </ul>
          <h3 class="h3" v-if="searchList.length==0">暫無搜索紀錄</h3>
      </div>
  </div>
</template>

<script>
export default{
  data(){
      return{
        searchList:[],
      }
  },
  methods:{
      // 清空搜索紀錄
      clearSearchList(){
          localStorage.setItem('searchList','[]');
          this.searchList='';
      },
      // 透過歷史紀錄搜尋商品
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
      // 判斷local storage有沒有搜索紀錄，有就存到searchList
      if(localStorage.getItem('searchList'))
          this.searchList=JSON.parse(localStorage.getItem('searchList'));
  },
}
</script>

<style scoped>

.search-history{
  box-sizing: border-box;
  padding: 20px;
  width: 60%;
  margin: 0 auto;
}
.history-title{
  margin-bottom:20px;
}

.search-history ul li{
  margin-right: 30px;
  border: 2px #ccc solid;
  padding: 5px;
}
/* 手機、平板 */
@media (max-width:768px){
  .search-history{
    width: 100%;
  }
}
</style>