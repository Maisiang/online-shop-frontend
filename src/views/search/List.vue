<template>
  <div class="search-list">
      <Sort class="search-sort-bar" v-if="!showNotFound" v-on:getDataFromChild="getDataFromChild" :queryKey="queryKey"></Sort>

      <div v-if="showNotFound" class="col center-center">
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
.search-sort-bar{
    background-color: rgb(178, 214, 255);
}

@media (min-width:768px){
  .search-product-list li{
      width: 26%;
  }
}
</style>

