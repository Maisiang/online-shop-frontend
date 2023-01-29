<template>
  <div class="products flex-col">
    <div class="products-menu  flex-col  justify-content-center  align-items-center">
      <h1 class="h1 title">分類</h1>
      <ul class="products-menu-list  flex-row  flex-wrap">
        <li :class='index===menuList.currentIndex?"active-menu-btn":"not-active-menu-btn"'
            class="text-align-center" 
            v-for="(item,index) in menuList.data" :key="index"
            @click="changeMenuNum(index)">{{item.name}}</li>
      </ul>
    </div>

    <div class="product-content m-center flex-col align-items-center">
      <h1 class="h1 title">{{menuList.data[menuList.currentIndex].name}}</h1>
      <section class="products-list flex-row flex-wrap">
        <Sort v-show="!showNotFound" v-on:getDataFromChild="getDataFromChild" :queryKey="menuList.data[menuList.currentIndex].category" :key="menuList.currentIndex"></Sort>
        <div class="product  flex-row  cursor-ptr" v-for="(item,index) in resObj" :key="index">
          <div class="product-img  flex-row  justify-content-center  align-items-center">
            <img :src="require('@/assets/images/products/'+item.imgUrl)" />
          </div>
          <div class="product-text  flex-col  flex-wrap justify-content-around">
            <p>{{item.name}}</p>
            <div class="flex-row  justify-content-around">
              <p class="text-red">${{item.price}}</p>
              <AddToCartBtn v-bind:item="item"></AddToCartBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AddToCartBtn from '@/components/common/AddToCartBtn.vue';
import Sort from '@/components/common/Sort.vue';
export default {
  name: "ListView",
  data(){
    return{
      resObj : {},
      showNotFound: false,
      menuList:{
        currentIndex: 0 ,
        data:[
          {name:'全部' , category:''},
          {name:'滑鼠' , category:'mouse'},
          {name:'鍵盤' , category:'keyboard'},
          {name:'喇叭' , category:'speaker'},
          {name:'筆電' , category:'laptop'},
          {name:'耳機' , category:'earphone'},
        ]
      },
    }
  },
    methods:{
        // 儲存目前頁面號碼
        async changeMenuNum(index = 0){
          this.menuList.currentIndex = index;
        },
        // 取得分類的商品
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
/* 分類選單 */
.products{
  padding: 20px;
}
.products-menu-list{
  width:100%;
  gap: 10px 0px;
}
.products-menu-list li{
  box-sizing: border-box;
  padding: 10px;
  width:33%;
}
/* 產品列表 */
.product-content{
  width:100%;
}
.products-list{
  gap: 20px 1%;
}
.product{
  /* 因img關係 讓每個product對齊*/
  width: 100%;
  height: 150px;
  border: 2px #d5d5d5 solid;
  border-radius: 30px;
}
.product:hover{
  background-color: #d5d5d5;
  font-weight: bold;
  color: black;
}

.product-img{
  /* 讓img 寬高一致 */
  width: 30%;
  background-color: #d5d5d5;
  border-radius: 30px;
  padding: 10px;
}
.product-text{
  width: 70%;
  margin-left: 15px;
}
.title{
  margin-bottom: 20px;
  margin-top: 20px;
}
/* 電腦 */
@media (min-width:768px){
  .products{
    flex-direction: row;
  }
  .products-menu{
    flex-direction: column;
    justify-content: flex-start;
    min-width:15%;
  }
  .products-menu-list{
    flex-direction: column;
  }
  .products-menu-list li{
    width:100%;
  }
  .products-list{
    width:85%;
  }
  .product-img{
    width: 40%;
  }
  .product{
    width: 48%;
  }
}

</style>
