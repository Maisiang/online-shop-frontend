<template>
    <button @click="addToCart(item)">加入購物車</button>
</template>

<script>
import { apiCartAdd } from "@/assets/scripts/api";
export default{
    props:['item'],
    methods:{
        // 新增商品到購物車
        addToCart(item){
            apiCartAdd(item._id).then((response)=>{
                alert(item.name+"\n"+response.data.message);
            })
        }
    },
}
</script>