<template>
    <div class="swiper bg">
        <div class="swiper-wrapper">
            <img class="swiper-slide page1"
            v-for="(item,index) in swiperList" 
            :key="index" :src="item.imgUrl">
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import Swiper , {Autoplay , Pagination} from 'swiper';
import 'swiper/css';
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
    setup(){
        // 使用 Swiper 需要等它的DOM都渲染到網頁上後
        // 才可以取得到它 div.swiper 這個DOM
        // 所以要在 onMounted 的地方 new Swiper。
        onMounted(()=> {
            const swiper = new Swiper(".swiper", {
                modules: [Autoplay , Pagination],
                loop:true,
                autoplay: {
                    delay: 2000,
                },
                speed: 2000,
                pagination:{// bug 版本問題?
                    el:'.swiper-pagination',
                    clickable: true,
                },
                
            });

        });
    },
}
</script>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}
</style>