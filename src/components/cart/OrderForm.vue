<template>
    <div class="order col center-center">
      <h1 class="h1">訂單資料</h1>
      <form class="order-info row flex-wrap" @submit.prevent="sendOrder">

        <label>電子信箱</label>
        <input type="email" v-model="orderInfo.email"
                  required />

        <div>
          <label>姓名</label>
          <input type="text" v-model="orderInfo.name"
                  minlength="3" maxlength="3" required />
        </div>

        <div>
          <label>電話號碼</label>
          <input type="text" v-model="orderInfo.phoneNum"
          pattern="^\d{10}$" maxlength="10" required />
        </div>

        <label>收件地址</label>
        <input type="text" v-model="orderInfo.address"
                maxlength="50" required />

        <label>備註</label>
        <input type="text" v-model="orderInfo.note"
                maxlength="50"  />
        <div class="total row space-between-center">
          <p class="h2">購物車總計</p>
          <p class="h2 c-red">${{total}}</p>
        </div>

        <input type="submit" class="send-order-btn" value="送出訂單">
      </form>



    </div>
</template>

<script>
import axios from 'axios';
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
            axios.post('/api/transaction',{
                orderInfo:      this.orderInfo,
                productList:    this.productList,
            }).then((response)=>{
                alert(response.data.message);
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
.order-info{
  margin-top: 20px;
  gap: 10px 8%;
}
.order-info >input{
  width: 100%;
}
.order-info div{
  width:45%;
}
.order-info div input{
  margin-top: 10px;
  width: 100%;
}
.total{
  min-width: 100%;
  font-weight: bold;
  padding-top: 10px;
  margin-top: 20px;
  margin-bottom: 20px;

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