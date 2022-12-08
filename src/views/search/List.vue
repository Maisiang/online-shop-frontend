<template>
  <div class="search-list">
      <ul v-if="!showNoFound" class="sort-bar row space-around-center">
          <li class='h2 row center-center noselect' v-for="(item,index) in sortList.data" :key="index">
              <div :class='index===sortList.currentIndex?"c-red":""'
              @click="getData(index)">
                  {{item.name}}
              </div>
              <div v-if="item.sortStr!=='' & sortList.currentIndex===index" class="search-filter col">
                  <img v-if="item.sortNum!==1" src="@/assets/images/up-arrow.png">
                  <img v-if="item.sortNum!==-1" src="@/assets/images/up-arrow-click.png">
                  <img v-if="item.sortNum!==-1" src="@/assets/images/down-arrow.png">
                  <img v-if="item.sortNum!==1" src="@/assets/images/down-arrow-click.png">
              </div>
          </li>
      </ul>

      <div v-if="showNoFound" class="col center-center">
          <h2 class="h2 m-t-l">沒有找到與  {{this.$route.query.key}} 相關的商品</h2>
          <p class="m-t-l">請嘗試不同的關鍵字</p>
      </div>


      <ul class="search-product-list row flex-wrap space-between-center">
          <li class="col center-center" v-for="(item,index) in resObj" :key="index">
              <div class="product-pic row center-center">
                  <img :src="require('@/assets/images/products/'+item.imgUrl)" />
              </div>

              <div class="col space-between-center flex-one">
                  <h3 class="h3">{{item.name}}</h3>

                  <h3 class="h3 c-red">NT${{item.price}}</h3>
                  <AddToCartBtn v-bind:item="item"></AddToCartBtn>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios';
import AddToCartBtn from '@/components/common/AddToCartBtn.vue';
export default {
  data(){
      return{
          resObj : {},
          showNoFound : false,
          sortList:{
              currentIndex: 0,
              data:[
                  {name:"綜合" , sortStr:'' , sortNum:0},
                  {name:"價格" , sortStr:'price' , sortNum: -1},
                  {name:"名稱" , sortStr: 'name' , sortNum: -1}
              ]
          }
      }
  },
  created(){
      this.getData();
  },
  methods:{
      // 搜尋商品功能
      async getData(index = 0){
          // 儲存選取的排序索引
          this.sortList.currentIndex = index;
          axios.get('/api/get',{
              // 傳遞給伺服器的搜尋字串
              params:{
                  name:this.$route.query.key,
                  sortStr: this.sortList.data[index].sortStr,
                  sortNum: this.sortList.data[index].sortNum,
              }
          // 接收搜尋結果
          }).then((response)=>{
              // 將response內容複製到 resObj
              this.resObj = Object.assign({},response.data);
              if(response.data.length===0)
                  this.showNoFound = true;
              else this.showNoFound=false;
          }).finally(()=>{
              // 變更排序(遞增,遞減)
              this.sortList.data[index].sortNum = 
              this.sortList.data[index].sortNum * -1;
          })
      },
  },
  watch:{
      // 監聽路由(搜尋參數)改變，重新抓取資料
      $route(){
          this.getData();
      }
  },
  components:{
      AddToCartBtn
  }
};
</script>

<style>
.sort-bar .search-filter img{
  height: 10px;
}
.sort-bar{
  padding: 10px;
  background-color: rgb(178, 214, 255);

}
.search-product-list{
  width: 90%;
  margin: 0 auto;
}
.search-product-list li{
  margin-bottom: 50px;
  box-sizing: border-box;
  width: 45%;
  height: 300px;
}
.product-pic{
  padding: 20px;
  width:60%;
  height: 150px;
}


@media (min-width:768px){
  .search-product-list li{
      width: 26%;
  }
}
</style>

