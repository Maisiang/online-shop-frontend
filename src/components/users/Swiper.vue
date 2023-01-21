<template>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="transaction-swiper flex-row">
        <i class=""></i>
        <button class="swiper-button-prev far fa-arrow-left fa-2x"></button>
        <swiper :modules="modules"
                :slides-per-view="1"
                :speed="300"
                :autoHeight=true
                :pagination="{ clickable: true }"
                :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }">
            <swiper-slide v-for="(item,index) in orderList" :key="index">
                <p class="text-align-center">{{item.orderDate}}</p>
                <div v-for="(product,index) in item.productList" class="flex-row align-items-center">
                    <div class="cart-img flex-row align-items-center">
                        <img :src="require('@/assets/images/products/'+product.imgUrl)">
                    </div>
                    <div class="cart-info flex-col justify-content-around">
                        <p>{{product.name}}</p>
                        <p class="text-red">${{product.price}}</p>
                    </div>
                    <p>{{product.num}}</p>
                </div>
                <div class="flex-row justify-content-around">
                    <p>訂單狀態：{{item.status}}</p>
                    <p>訂單金額: <b class="text-red">${{item.total}}</b></p>
                </div>

                <div class="order-info flex-col">
                    <div class="flex-row justify-content-center">
                        <span class="material-symbols-outlined">star_half</span>
                        <h2 class="h2">收件人資料</h2>
                    </div>
                    <p>姓名：{{item.orderInfo.name}}</p>
                    <p>信箱：{{item.orderInfo.email}}</p>
                    <p>電話：{{item.orderInfo.phoneNum}}</p>
                    <p>地址：{{item.orderInfo.address}}</p>
                    <p>備註：{{item.orderInfo.note}}</p>
                </div>

            </swiper-slide>
        </swiper>
        <button class="swiper-button-next far fa-arrow-right fa-2x"></button>
    </div>
</template>

<script>
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide  } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
    props:['orderList'],
    data(){
        return{
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
    },
}
</script>

<style scoped>
.transaction-swiper {
    margin-top: 10px;
    /* 交易紀錄左右按鈕 */
    align-items: flex-start;
}
.transaction-swiper button{
    background: none;
    border: none
}
.swiper{
    /* 調整分頁器位置 */
    padding-bottom: 50px;
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
.order-info{
    margin: 0 auto;
    width: 80%;
    gap: 10px 5px;
    margin-bottom: 10px;
    margin-top: 30px;
}
</style>