<template>
  <div class="cart col center-center">
    <Header></Header>
    <ul class="cart-ul col center-center">
      <h1 class="h1">購物車清單</h1>
      <p v-if="isCartEmpty" class="h2">購物車沒有任何商品...</p>
      <li class="cart-list row space-between-center" v-for="(item,index) in productList" :key="index">
        <img class="cart-delete" src="@/assets/images/delete.png" style="height:30px;" @click="deleteProduct(item)">
        <div class="cart-img row center-center">
          <img :src="require('@/assets/images/products/'+item.imgUrl)">
        </div>
        <div class="cart-info col space-around-start">
          <p>{{item.name}}</p>
          <p class="c-red">${{item.price}}</p>
        </div>
        <div class="cart-num row center-center">
          <button @click="changeProductNum(index,'-')">-</button>
          <input type="text-align-center" :value="productNum[index]" v-on:input="inputProductNum($event.target.value,index)"
          onkeyup="value=value.replace(/[^\d]/g,'') " maxlength="2">
          <button @click="changeProductNum(index,'+')">+</button>
        </div>
      </li>
    </ul>

    <div class="order-summary col center-center">
      <h1 class="h1">訂單摘要</h1>
      <form class="receiver-info row flex-wrap">
        <label>電子信箱</label>
        <input type="text">
        <div>
          <label>姓名</label>
          <input type="text">
        </div>
        <div>
          <label>電話號碼</label>
          <input type="text">
        </div>
        <label>收件地址</label>
        <input type="text">
        <label>備註</label>
        <input type="text">
      </form>

      <div class="total row space-between-center">
        <p class="h2">購物車總計</p>
        <p class="h2 c-red">${{total}}</p>
      </div>
      <button class="send-order-btn">送出訂單</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/common/Header.vue'
export default {
  name: "CartView",
  data(){
    return{
      userInfo:{},
      productList:{},
      productNum:[],
      total:0,
      isCartEmpty:true
    }
  },
  methods:{
    // 取得用戶的購物車所有商品
    getCart(){
      axios.get('/api/getCart').then((response)=>{
        console.log(response.data);
        this.productList = Object.assign({},response.data);
        if(response.data.length===0){
          this.isCartEmpty=true;
          this.total = 0;
        }
        else
          this.isCartEmpty=false;

        // 購物車數量都為1個，並計算金額
        for(let i=0 ; i<response.data.length ; i++){
          this.productNum.splice(i, 0, 1);
          this.total = this.total + this.productList[i].price;
        }
      })
    },
    deleteProduct(item){
      axios.post('/api/removeFromCart',{
                product_id: item._id,
            }).then((response)=>{
                alert(response.data.message+"\n"+item.name);
                this.getCart();
      })
    },
    // 透過 +和-按鈕控制數量
    changeProductNum(index,opt){
      if(opt==='+')
        this.productNum.splice(index, 1, ++this.productNum[index]);
      else if(opt==='-'){
        if(this.productNum[index]>1)
          this.productNum.splice(index, 1, --this.productNum[index]);
      }
    },
    // 用來判斷input輸入的數量
    inputProductNum(value,index){
      if(value==='' || value[0]===' '){
        this.productNum.splice(index, 1, 1);
        return false;
      }
      for(let i=0 ; i<value.length ; i++){
        if(i===0 && value[i]==='0'){
          this.productNum.splice(index, 1, 1);
          return false;
        }
        else if(!(value[i]<='9' && value[i]>=0)){
          this.productNum.splice(index, 1, 1);
          return false;
        }
      }
      this.productNum.splice(index,1,parseInt(value));
    }
  },
  mounted(){
    let userInfo = sessionStorage.getItem('user-info');
    if(!userInfo)
    {
      alert('請先登入會員！')
      this.$router.replace('/login');
    }
    else{
      this.userInfo = JSON.parse(userInfo);
      this.getCart();

    }
  },
  // 當數量變更進行總金額計算
  watch:{
    productNum: function(value,oldValue){
      this.total=0;
      for(let i=0 ; i<this.productNum.length ; i++){
        this.total = this.total + (this.productList[i].price * this.productNum[i]);
      }
    }
  },
  components:{
    Header,
  }
};
</script>

<style scoped>
.cart-ul{
  padding: 10px;
  margin-top: 30px;
}
.cart-list{
  gap: 10px;
}
.cart-img{
  width:30%;
  height: 100px;
  padding: 20px;
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
.cart-num input{
  text-align: center;
  width: 40px;
}
.cart-num button{
  width: 25px;
}
.cart-num button,
.cart-num input{
  box-sizing: border-box;
  height: 100%;
}
.cart-delete:hover{
  border-radius: 50%;
  background-color: wheat;
}
/* 訂單摘要 */
.order-summary{
  margin: 0 20px 0 20px;
  border: 2px rgb(170, 170, 170) solid;
  border-radius: 12px;
  padding: 20px;
  margin-top:30px;
}
.receiver-info{
  margin-top: 20px;
  gap: 10px 8%;
}
.receiver-info >input{
  width: 100%;
}
.receiver-info div{
  width:45%;
}
.receiver-info div input{
  margin-top: 10px;
  width: 100%;
}
.total{
  font-weight: bold;
  padding-top: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
}
.send-order-btn{
  border-color: rgb(255, 105, 105);
  color:rgb(255, 105, 105);
  background-color: white;
  padding: 10px;
  font-size: 20px;
  width: 100%;
  font-weight: bold;
}
.send-order-btn:hover{
  transition: .6s;
  color:white;
  background-color: rgb(255, 105, 105);
}
@media (min-width:768px){
  .cart{
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    gap: 30px;
  }
  .cart-list{
    width: 100%;
  }
  .order-summary{
    width: 30%;
  }
}
</style>