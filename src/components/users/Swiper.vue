<template>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="swiper row">
        <i class=""></i>
        <button class="swiper-button-prev far fa-arrow-left fa-2x"></button>
        <swiper :modules="modules"
                :slides-per-view="1"
                :speed="1000"
                :pagination="{ clickable: true }"
                :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }"
                >
            <swiper-slide v-for="(item,index) in orderList" :key="index">
                <p class="text-align-center">{{item.orderDate}}</p>
                <div v-for="(product,index) in item.productList" class="row space-between-center">
                    <div class="cart-img row center-center">
                        <img :src="require('@/assets/images/products/'+product.imgUrl)">
                    </div>
                    <div class="cart-info col space-around-start">
                        <p>{{product.name}}</p>
                        <p class="c-red">${{product.price}}</p>
                    </div>
                    <p>{{product.num}}</p>
                </div>
                <div class="row space-around-center">
                    <p>訂單狀態：{{item.status}}</p>
                    <p>訂單金額: <b>$1000</b></p>
                </div>

                <div class="order-info col">
                    <div class="row center-center">
                        <span class="material-symbols-outlined">star_half</span>
                        <h2 class="h2">收件人資料</h2>
                    </div>
                    <p>{{item.orderInfo.name}}</p>
                    <p>{{item.orderInfo.email}}</p>
                    <p>{{item.orderInfo.phoneNum}}</p>
                    <p>{{item.orderInfo.address}}</p>
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
.swiper {
    margin-top: 10px;
    position: relative;
    /*min-height: 100%;*/
    height:auto;
    padding-bottom: 40px;
    /* 交易紀錄左右按鈕 */
    align-items: flex-start;
}
.swiper button{
    background: none;
    border: none
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
@media (min-width:768px){
    /* 調整分頁器位置 */
    .swiper {
        padding-bottom: 0px;
    }
}
</style>