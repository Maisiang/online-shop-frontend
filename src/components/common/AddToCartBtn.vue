<template>
    <div>
        <button @click="addToCart(item)">加入購物車</button>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    props:['item'],
    methods:{
        // 新增商品到購物車
        addToCart(item){
            axios.post('/api/addToCart',{
                product_id: item._id,
            }).then((response)=>{
                alert(item.name+"\n"+response.data.message);
            })
        }
    }
}
</script>