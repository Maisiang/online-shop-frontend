<template>
    <div class="order col center-center">
      <h1 class="h1">訂單資料</h1>
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
</template>

<script>
export default{
    props:['total']
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
  .order{
    width: 30%;
  }
}
</style>