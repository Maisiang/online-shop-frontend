<template>
    <div class="swiper">
        <swiper :modules="modules"
                :slides-per-view="1"      
                :loop=true
                :autoplay="{ delay: 1000}"
                :speed="2000"
                :pagination="{ clickable: true }">
            <swiper-slide v-for="(item,index) in swiperList" :key="index">
                <img :src="item.imgUrl">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
    data(){
        return{
            swiperList:[
                {imgUrl:require('@/assets/images/swiper/swiper1.jpg')},
                {imgUrl:require('@/assets/images/swiper/swiper3.jpg')},
                {imgUrl:require('@/assets/images/swiper/swiper2.jpg')},
            ],
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination],
      };
    },
}
</script>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}
</style>