<template>
    <div class="order flex-col align-items-center">
      <h1 class="h1">訂單資料</h1>
      <form class="order-form flex-row flex-wrap" @submit.prevent="sendOrder">

        <label>電子信箱</label>
        <input type="email" v-model="orderInfo.email" required />

        <div>
          <label>姓名</label>
          <input type="text" v-model="orderInfo.name" maxlength="10" required />
        </div>

        <div>
          <label>電話號碼</label>
          <input type="text" v-model="orderInfo.phoneNum" pattern="^\d{10}$" maxlength="10" required />
        </div>

        <label>收件地址</label>
        <input type="text" v-model="orderInfo.address" maxlength="50" required />

        <label>備註</label>
        <input type="text" v-model="orderInfo.note" maxlength="50" />
        <div class="total flex-row justify-content-between">
          <p class="h2">購物車總計</p>
          <p class="h2 text-red">${{total}}</p>
        </div>
        <input type="submit" class="send-order-btn" value="送出訂單">
        
      </form>
    </div>
</template>

<script>
import { apiTransactionAdd } from "@/assets/scripts/api";
export default{
    props:['total','productList'],
    data(){
        return{
            orderInfo:{
                email:'',
                name:'',
                phoneNum:'',
                address:'',
                note:''
            }
        }
    },
    methods:{
        sendOrder(){
            if(this.productList.length===0){
              alert('購物車無商品...');
              return false;
            }
            apiTransactionAdd({
              orderInfo:      this.orderInfo,
              productList:    this.productList,
            }).then((response)=>{
                alert(response.data.message);
                if(response.data.isSuccess)
                  this.$router.replace({path: '/users/transaction'});
            })
        }
    }
}
</script>

<style scoped>
/* 訂單摘要 */
.order{
  margin: 0 20px 0 20px;
  border: 2px rgb(170, 170, 170) solid;
  border-radius: 12px;
  padding: 20px;
  margin-top:30px;
}
.order-form{
  margin-top: 20px;
  gap: 10px 8%;
}

.order-form div{
  width:45%;
}
.order-form div input{
  margin-top: 10px;
}
.total{
  min-width: 100%;
  font-weight: bold;
  padding-top: 10px;
  margin-top: 20px;
  margin-bottom: 20px;

}
input[type="text"],
input[type="email"]{
  height: 20px;
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
  .order{
    width: 30%;
  }
}
</style>