<template>
  <div class="search-list">
      <Sort class="search-sort-bar" v-show="!showNotFound" v-on:getDataFromChild="getDataFromChild" :queryKey="queryKey"></Sort>

      <div v-if="showNotFound" class="flex-col align-items-center search-alert">
          <h2 class="h2">沒有找到與  {{this.$route.query.key}} 相關的商品</h2>
          <p>請嘗試不同的關鍵字</p>
      </div>


      <ul class="search-product-list flex-row flex-wrap justify-content-between">
          <li class="flex-col align-items-center" v-for="item in resObj">
              <div class="product-pic flex-row justify-content-center align-items-center">
                  <img :src="require('@/assets/images/products/'+item.imgUrl)" />
              </div>

              <div class="flex-col justify-content-between align-items-center flex-one">
                  <h3 class="h3">{{item.name}}</h3>
                  <h3 class="h3 text-red">NT${{item.price}}</h3>
                  <AddToCartBtn v-bind:item="item"></AddToCartBtn>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import AddToCartBtn from '@/components/common/AddToCartBtn.vue';
import Sort from '@/components/common/Sort.vue';
export default {
    data(){
        return{
            queryKey: this.$route.query.key,
            resObj : {},
            showNotFound : false,
        }
    },
    methods:{
        getDataFromChild(data){
            if(data.length===0) this.showNotFound=true;
            else this.showNotFound=false;
            this.resObj = Object.assign([],data);
        }
    },
    components:{
        AddToCartBtn,
        Sort
    },
};
</script>

<style scoped>
.search-product-list{
  width: 90%;
  margin: 0 auto;
  gap: 50px 0;
}
.search-product-list li{
  width: 45%;
  height: 280px;
}
.product-pic{
    padding: 20px;
    width:60%;
    height: 150px;
}
.search-sort-bar{
    background-color: rgb(180, 210, 255);
}
.search-alert{
    padding-top:30px;
    gap: 30px;
}
/* 電腦 */
@media (min-width:768px){
  .search-product-list li{
      width: 26%;
  }
}
</style>

