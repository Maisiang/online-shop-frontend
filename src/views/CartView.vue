<template>
  <div class="cart  flex-col">
    <ul class="cart-list  flex-col  align-items-center">
      <h1 class="h1">購物車清單</h1>
      <p v-if="isCartEmpty" class="h2">購物車沒有任何商品...</p>
      <li class="cart-list-item  flex-row  align-items-center" v-for="(item,index) in productList" :key="index">
        <img class="cursor-ptr" src="@/assets/images/delete.png" style="height:30px;" @click="deleteProduct(item)">
        <div class="cart-img  flex-row  justify-content-center  align-items-center">
          <img :src="require('@/assets/images/products/'+item.imgUrl)">
        </div>
        <div class="cart-info  flex-col  justify-content-around">
          <p>{{item.name}}</p>
          <p class="text-red">${{item.price}}</p>
        </div>
        <div class="cart-num  flex-row  justify-content-center">
          <button @click="changeProductNum(index,'-')">-</button>
          <input class="text-align-center" :value="productList[index].num" v-on:input="inputProductNum($event.target.value,index)"
          onkeyup="value=value.replace(/[^\d]/g,'') " maxlength="2">
          <button @click="changeProductNum(index,'+')">+</button>
        </div>
      </li>
    </ul>

    <OrderForm  v-bind:total="total" 
                v-bind:productList="productList">
    </OrderForm>

  </div>
</template>

<script>
import OrderForm from "@/components/cart/OrderForm.vue";
import { apiCart, apiCartRemove } from "@/assets/scripts/api";
export default {
  name: "CartView",
  data(){
    return{
      productList:[],   // 購物車商品列表
      total:0,          // 總金額
      isCartEmpty:true  // 當購物車為空
    }
  },
  methods:{
    // 取得用戶的購物車所有商品
    getCart(){
      apiCart().then((response)=>{
        // 將購物車內容複製到productList
        this.productList = response.data;
        // 購物車設定數量都為1個
        for(let i=0 ; i<this.productList.length ; i++){
          this.productList[i] = {...this.productList[i] , num:1};
        }
        // 購物車無資料
        if(response.data.length===0){
          this.isCartEmpty=true;
          this.total = 0;
        }
        else
          this.isCartEmpty=false;
        // 計算總金額
        this.computeTotal();
      })
    },
    // 移除用戶購物車商品
    deleteProduct(item){
      apiCartRemove(item._id).then((response)=>{
          alert(response.data.message+"\n"+item.name);
          this.getCart();
      })
    },
    // 透過 +和-按鈕控制數量
    changeProductNum(index,opt){
      if(opt==='+')
        this.productList[index].num = ++this.productList[index].num;
      else if(opt==='-'){
        if(this.productList[index].num>1)
          this.productList[index].num = --this.productList[index].num;
      }
      this.computeTotal();
    },
    // 計算總金額
    computeTotal(){
      this.total = 0;
      for(let i=0 ; i<this.productList.length ; i++){
        this.total = this.total + (this.productList[i].price * this.productList[i].num);
      }
    },
    // 用來判斷input輸入的數量
    inputProductNum(value,index){
      // 為NULL 或 空格
      if(value.length===0 || value[0]===' '){
        this.productList[index].num = 1;
        this.computeTotal();
        return false;
      }
      for(let i=0 ; i<value.length ; i++){
        // 開頭為0 或 非數字
        if((i===0 && value[i]==='0')||
          (!(value[i]<='9' && value[i]>='0'))){
          this.productList[index].num = 1;
          this.computeTotal();
          return false;
        }
      }
      // 輸入正確的格式
      this.productList[index].num= parseInt(value);
      this.computeTotal();
    }
  },
  mounted(){
      this.getCart();
  },
  components:{
    OrderForm,
  }
};
</script>

<style scoped>
.cart-list{
  padding: 10px;
  margin-top: 30px;
}
.cart-list-item{
  width:100%;
  gap: 10px;
}

.cart-img{
  width:50%;
  height: 100px;
}

.cart-info{
  width: 50%;
  height: 100px;  
  padding:20px;
}
.cart-num{
  width: 20%;
  height: 40px;
}
.cart-num button,
.cart-num input{
  box-sizing: border-box;
  height: 100%;
  width: 30px;
}
/* 電腦 */
@media (min-width:768px){
  .cart{
    /* 購物車左、訂單右 */
    flex-direction: row;
    justify-content: space-around;
  }
  .cart-img{
    width:30%;
  }
}
</style>
