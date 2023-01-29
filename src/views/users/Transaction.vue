<template>
    <div class="transaction">
        <h1 class="h1 text-align-center">交易紀錄</h1>
        <Swiper v-bind:orderList="orderList"></Swiper>
    </div>
</template>

<script>
import Swiper from '@/components/users/Swiper.vue';
import { apiTransaction } from "@/assets/scripts/api";
export default{
    data(){
        return{
            orderList:[]
        }  
    },
    methods:{
        // 取得交易紀錄
        getOrder(){
            apiTransaction().then((response)=>{
                this.orderList = [...response.data]
            })
        }
    },
    mounted(){
        this.getOrder();
    },
    components:{
        Swiper
    }
}
</script>
