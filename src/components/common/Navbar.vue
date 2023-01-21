<template>
    <ul class="navbar text-white noselect
                flex-row align-items-center justify-content-around">
        <li v-for="item in routerList" @click="switchTab(item.path)"
        class="cursor-ptr flex-row align-items-center "
        :class="$route.path.includes(item.path)?'selected':''">
            <img :src="$route.path.includes(item.path)?item.selected:item.active">
            <p class="h2">{{ item.title }}</p>
        </li>
    </ul>

</template>

<script>
export default{
    data(){
        return{
            routerList:[
            {
                    title:'產品列表',
                    path:'/products',
                    active:require('../../assets/images/products.png'),
                    selected:require('../../assets/images/products-selected.png'),
                },
                {
                    title:'聊天室',
                    path:'/chat',
                    active: require('../../assets/images/chat.png'),
                    selected:require('../../assets/images/chat-selected.png'),
                },
                {
                    title:'購物車',
                    path:'/cart',
                    active:require('../../assets/images/cart.png'),
                    selected:require('../../assets/images/cart-selected.png'),
                },
                {
                    title:'會員中心',
                    path:'/users',
                    active:require('../../assets/images/member.png'),
                    selected:require('../../assets/images/member-selected.png'),
                },
            ]
        }
    },
    methods:{
        switchTab(path){
            // 判斷路徑是否同一個
            if(this.$route.path === path) return;
            this.$router.push(path);
        }
    }
}
</script>

<style scoped>
.navbar{
    width:50%;
    color: white;
    gap:10px 10px;
}
.navbar li{
    padding: 10px;
    gap:0 10px;
}
.navbar li p{
    white-space:nowrap;
}

.navbar li:hover{
    font-weight: bold;
}
.navbar li img{
    width:30%;
    display: none;
}
.selected{
    font-weight: bold;
    border-bottom: 5px white solid;
}
/* 手機、平板 */
@media (max-width:768px){
    .navbar li p{
        font-size: medium;
    }
    .navbar li img{
        display: block;
    }
    .selected{
        border: none
    }
}
</style>