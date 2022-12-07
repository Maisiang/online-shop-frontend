<template>
  <div class="products col">
    <Header></Header>
    <div class="products-menu col center-center">
      <h1 class="h1 title">分類</h1>
      <ul class="products-menu-list row space-around-center noselect flex-wrap">
        <li :class='index===menuList.currentIndex?"active":"not-active cursor-ptr"' v-for="(item,index) in menuList.data" :key="index"
          @click="getData(index)">{{item.name}}</li>
      </ul>
    </div>
   
    <div class="m-center col align-center">
      <h1 class="h1 title">{{menuList.data[menuList.currentIndex].name}}</h1>
      <section class="products-list row flex-wrap">
        <div class="product row cursor-ptr" v-for="(item,index) in resObj" :key="index">
          <div class="product-img row center-center">
            <img :src="require('@/assets/images/products/'+item.imgUrl)" />
          </div>
          <div class="product-text col flex-wrap space-around-start">
            <p>{{item.name}}</p>
            <div class="w-full row justify-space-between">
              <p class="c-red">${{item.price}}</p>
              <AddToCartBtn v-bind:item="item" class="m-r-l"></AddToCartBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/common/Header.vue';
import AddToCartBtn from '@/components/common/AddToCartBtn.vue';
export default {
  name: "ListView",
  data(){
    return{
      menuList:{
        currentIndex: 0 ,
        data:[
          {name:'全部' , category:''},
          {name:'滑鼠' , category:'滑鼠'},
          {name:'鍵盤' , category:'鍵盤'},
          {name:'耳機' , category:'耳機'},
          {name:'喇叭' , category:'喇叭'},
          {name:'筆電' , category:'筆電'},
        ]
      },
      resObj : {},
    }
  },
  created(){
        this.getData();
    },
    methods:{
        // 搜尋商品
        async getData(index = 0){
          // 儲存目前頁面號碼
          this.menuList.currentIndex = index;
            axios.get('/api/get',{
                // 傳遞給伺服器的搜尋字串
                params:{
                    name: this.menuList.data[index].category,
                    sortStr: '',
                    sortNum: 0,
                }
            // 接收搜尋結果
            }).then((response)=>{
                // 將response內容複製到 resObj
                this.resObj = Object.assign({},response.data);
            })
        },
    },
  components:{
    Header,
    AddToCartBtn
  }
};
</script>

<style scoped>
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
  text-align: center;
}


.products-list{
  /*width:95%;*/
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
/* common */
.title{
  margin-bottom: 20px;
  margin-top: 30px;
}
.active{
  background-color: rgba(50, 150, 255,.5);
}
.not-active:hover{
  background-color: #d5d5d5;
  font-weight: bold;
}


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
